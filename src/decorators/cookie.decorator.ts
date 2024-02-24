import {createParamDecorator, type ExecutionContext, UnauthorizedException} from '@nestjs/common';
import { type FastifyRequest } from 'fastify';

export const Cookies = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest<FastifyRequest>();
        const cookie = (data !== '') ? request.cookies[data] : request.cookies;

        if (data !== '' && !cookie) {
            throw new UnauthorizedException(`Cookie ${data} is missing`);
        }

        return cookie;
    }
);
