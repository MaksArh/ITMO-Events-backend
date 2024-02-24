import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {RolesService} from './roles.service';
import {ApiOperation, ApiParam, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Role} from 'roles/role.model';
import {Roles} from 'decorators/roles.decorator';
import {JwtAuthGuard} from 'auth/jwt-auth.guard';
import {RoleGuard} from 'auth/role.guard';
import {CreateRoleDto} from "roles/dto/create-role.dto";

@ApiTags('Роли')
@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('roles')
export class RolesController {
    constructor (private readonly roleService: RolesService) {
    }

    @ApiOperation({ summary: 'Создание новой роли' })
    @ApiResponse({ status: 201, description: 'Роль успешно создана', type: Role })
    @ApiResponse({ status: 400, description: 'Ошибка при создании роли' })
    @Roles('ADMIN')
    @Post()
    async create (@Body() dto: CreateRoleDto): Promise<Role> {
        return await this.roleService.createRole(dto);
    }

    @ApiOperation({ summary: 'Получение роли по значению' })
    @ApiResponse({ status: 200, description: 'Роль найдена', type: Role })
    @ApiResponse({ status: 404, description: 'Роль не найдена' })
    @ApiParam({ name: 'value', type: 'string', description: 'Значение роли' })
    @Roles('ADMIN')
    @Get('/:value')
    async getByValue (@Param('value') value: string): Promise<Role> {
        return await this.roleService.getRoleByValue(value);
    }
}
