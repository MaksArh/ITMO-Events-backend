import {Body, Controller, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {UsersService} from './users.service';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Cookies} from 'decorators/cookie.decorator';
import {Roles} from 'decorators/roles.decorator';
import {RoleGuard} from 'auth/role.guard';
import {UserRO} from 'users/dto/users.ro';
import {AddRoleDto} from 'users/dto/add-role.dto';
import {JwtAuthGuard} from 'auth/jwt-auth.guard';
import {UpdateUserDto} from "users/dto/update-user.dto";
import {GetUserDto} from "users/dto/get-user.dto";

@ApiTags('Пользователи')
@UseGuards(JwtAuthGuard)
@UseGuards(RoleGuard)
@Controller('users')
export class UsersController {
    constructor (private readonly usersService: UsersService) { }

    @ApiOperation({ summary: 'Получение пользователя' })
    @ApiResponse({ status: 200, type: UserRO })
    @Roles('USER')
    @Get('me')
    async getMe (@Cookies('id_token') idToken: string): Promise<UserRO> {
        const isu = (this.usersService.decodeUser(idToken).isu);
        return await this.usersService.getUser(isu);
    }

    @ApiOperation({ summary: 'Добавление роли пользователю' })
    @ApiResponse({ status: 200, type: UserRO })
    @Roles('USER')
    @Post('role')
    async addRole (@Body() dto: AddRoleDto): Promise<UserRO> {
        return await this.usersService.addRole(dto);
    }

    @ApiOperation({ summary: 'Получение пользователя по isu' })
    @ApiResponse({ status: 200, type: UserRO })
    @Roles('ADMIN')
    @Get(':isu')
    async getUser (@Param() params: GetUserDto): Promise<UserRO> {
        return await this.usersService.getUser(params.isu);
    }

    @ApiOperation({ summary: 'Обновление данных пользователя' })
    @ApiResponse({ status: 200, type: UserRO })
    @Roles('USER')
    @UseGuards(RoleGuard)
    @Put('')
    async updateUser (@Body() updates: UpdateUserDto, @Cookies('id_token') idToken: string): Promise<UserRO> {
        const isu = (this.usersService.decodeUser(idToken).isu);
        return await this.usersService.updateUser(isu, updates);
    }
}
