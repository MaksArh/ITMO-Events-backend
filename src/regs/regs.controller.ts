import {Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiParam, ApiResponse, ApiTags} from '@nestjs/swagger';
import {RegsService} from 'regs/regs.service';
import {Reg} from 'regs/reg.model';
import {Cookies} from 'decorators/cookie.decorator';
import {RegDto} from 'regs/dto/reg.dto';
import {UsersService} from 'users/users.service';
import {Roles} from 'decorators/roles.decorator';
import {JwtAuthGuard} from 'auth/jwt-auth.guard';
import {RoleGuard} from 'auth/role.guard';

@ApiTags('Заявки')
@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('regs')
export class RegsController {
    constructor (private readonly regService: RegsService, private readonly usersService: UsersService) {}

    @ApiOperation({ summary: 'Получение всех заявок' })
    @ApiResponse({ status: 200, description: 'Список всех заявок', type: [Reg] })
    @Roles('USER')
    @Get('fetch')
    async fetchAll (): Promise<Reg[]> {
        return await this.regService.fetchAll();
    }

    @ApiOperation({ summary: 'Обновление заявки пользователя' })
    @ApiResponse({ status: 200, description: 'Заявка обновлена' })
    @ApiResponse({ status: 404, description: 'Заявка не найдена' })
    @ApiParam({ name: 'id', type: 'number', description: 'ID заявки' })
    @Roles('EVENTADMIN', 'EVENTMANAGER')
    @Patch(':id')
    async updateUserRegistration (@Param() params, @Body() body: { userId: number, dto: Omit<RegDto, 'data'> }): Promise<boolean> {
        await this.regService.updateUserState(params.id, body.userId, body.dto);
        return true;

    }

    @ApiOperation({ summary: 'Добавление заявки пользователем' })
    @ApiResponse({ status: 201, description: 'Заявка добавлена' })
    @ApiParam({ name: 'id', type: 'number', description: 'ID мероприятия для регистрации' })
    @Roles('USER')
    @Post(':id')
    async addUserRegistration (@Param() params, @Cookies('id_token') idToken: string, @Body() userData: RegDto): Promise<boolean> {
        const isu = (this.usersService.decodeUser(idToken).isu);
        await this.regService.registerUser(params.id, isu, userData);
        return true;
    }

    @ApiOperation({ summary: 'Получение заявки по ID' })
    @ApiResponse({ status: 200, description: 'Заявка найдена', type: Reg })
    @ApiResponse({ status: 404, description: 'Заявка не найдена' })
    @ApiParam({ name: 'id', type: 'number', description: 'ID заявки' })
    @Roles('EVENTADMIN', 'EVENTMANAGER')
    @Get(':id')
    async getReg (@Param() id: number): Promise<Reg> {
        const reg = await this.regService.getRegById(id);
        if (reg) return reg;

        throw new HttpException({message:'Reg not found'}, HttpStatus.BAD_REQUEST);
    }
}
