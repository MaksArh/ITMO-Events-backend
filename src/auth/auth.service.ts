import { Injectable } from '@nestjs/common';
import * as cookie from 'cookie';
import * as jwt from 'jsonwebtoken';
import { UsersService } from 'users/users.service';
import { SsoService } from 'auth/sso.service';
import * as jwkToPem from 'jwk-to-pem';
import { type CreateUserDto } from 'users/dto/create-user.dto';
import { type FastifyReply } from 'fastify';

@Injectable()
export class AuthService {
    constructor (private readonly userRepository: UsersService, private readonly ssoService: SsoService) {
    }

    async updateTokensFromRefresh (refreshToken: string): Promise<any> {
        // new tokens getting from refresh (idToken accessToken refreshToken) with new expiration
        return await this.ssoService.refreshAccess(refreshToken);
    }

    async validateToken (token: string): Promise<boolean> {
        try {
            const keys = await this.ssoService.getPublicKeys();
            const publicKey = keys[0];
            const publicKeyPem = jwkToPem(publicKey);
            jwt.verify(token, publicKeyPem, { algorithms: ['RS256'] });
            return true;
        } catch (e) {
            console.log(`validateToken service ERR: ${e.message as string}`);
            return false;
        }
    }

    async importUser (idToken: string): Promise<void> {
        try {
            const userDto = jwt.decode(idToken) as CreateUserDto;
            const candidate = await this.userRepository.getUser(userDto.isu);
            if (candidate === null) {
                await this.userRepository.createUser(userDto);
            }
        } catch (e) {
            console.log(`importUser service ERR: ${e.message as string}`);
        }
    }

    setCookies (reply: FastifyReply, tokenData: Record<string, any>): void {
        const cookies = [
            ['access_token', tokenData.access_token, tokenData.expires_in],
            ['id_token', tokenData.id_token],
            ['refresh_token', tokenData.refresh_token, tokenData.refresh_expires_in],
            ['token_type', tokenData.token_type],
            ['session_state', tokenData.session_state],
            ['scope', tokenData.scope]
        ];

        cookies.forEach(cookieConfig => {
            const [name, value, maxAge] = cookieConfig;

            if (maxAge !== undefined) {
                void reply.setCookie(name, value.toString(), {
                    httpOnly: true,
                    maxAge,
                    sameSite: 'strict',
                    path: '/'
                });
            } else {
                void reply.setCookie(name, value.toString(), {
                    httpOnly: true,
                    sameSite: 'strict',
                    path: '/'
                });
            }
        });
    }
}
