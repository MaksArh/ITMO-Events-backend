import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {User} from './user.model';
import {type CreateUserDto} from './dto/create-user.dto';
import {RolesService} from 'roles/roles.service';
import * as jwt from 'jsonwebtoken';
import {type UserData, type UserRO} from 'users/dto/users.ro';
import {type AddRoleDto} from 'users/dto/add-role.dto';
import {UpdateUserDto} from "users/dto/update-user.dto";

@Injectable()
export class UsersService {
    constructor (
        @InjectModel(User) private readonly userRepository: typeof User,
        private readonly roleService: RolesService) {}

    async createUser(dto: CreateUserDto): Promise<UserRO> {
        const candidate = await this.userRepository.findOne({ where: { email: dto.email }});
        if (candidate) {
            throw new BadRequestException('User already exists');
        }

        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue('USER');
        if (!role) {
            throw new NotFoundException('Role not found');
        }
        await user.$set('roles', [role.id]);
        return this.buildUserRO(user);
    }

    decodeUser (idToken: string): UserData {
        return jwt.decode(idToken) as UserData;
    }

    async updateUser(isu: number, dto: UpdateUserDto): Promise<UserRO> {
        const user = await this.userRepository.findOne({ where: { isu } });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        await user.update(dto);
        return this.buildUserRO(user);
    }

    async addRole(dto: AddRoleDto): Promise<UserRO> {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);

        if (!role || !user) {
            throw new NotFoundException('User or Role not found');
        }

        await user.$add('role', role.id);
        return this.buildUserRO(user);
    }

    async getUser(isu: number): Promise<UserRO> {
        const user = await this.userRepository.findOne({ where: { isu }});
        if (!user) {
            throw new NotFoundException('User not found');
        }

        return this.buildUserRO(user);
    }

    private buildUserRO(user: User): UserRO{
        const userData: UserData = {
            isu:            user.isu,
            gender:         user.gender,
            name:           user.name,
            family_name:    user.family_name,
            given_name:     user.given_name,
            middle_name:    user.middle_name,
            picture:        user.picture,
            email:          user.email,
            email_verified: user.email_verified,
            is_student:     user.is_student,
            corp_email:     user.corp_email,
            roles:          user.dataValues.roles,
        };
        return {user: userData} as UserRO;
    }
}
