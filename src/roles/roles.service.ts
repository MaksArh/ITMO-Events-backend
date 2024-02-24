import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Role} from './role.model';
import {CreateRoleDto} from "roles/dto/create-role.dto";

@Injectable()
export class RolesService {
    constructor (@InjectModel(Role) private readonly roleRepository: typeof Role) {}

    async createRole(dto: CreateRoleDto): Promise<Role> {
        const existingRole = await this.roleRepository.findOne({ where: { value: dto.value } });
        if (existingRole) {
            throw new NotFoundException(`Role with value ${dto.value} already exists.`);
        }

        return this.roleRepository.create(dto);
    }

    async getRoleByValue(value: string): Promise<Role> {
        const role = await this.roleRepository.findOne({ where: { value } });
        if (!role) {
            throw new NotFoundException(`Role with value ${value} not found.`);
        }

        return role;
    }
}
