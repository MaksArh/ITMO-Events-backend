import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from '@nestjs/swagger';
import {FormsService} from 'forms/forms.service';
import {CreateFormDto} from 'forms/dto/create-form.dto';
import {UpdateFormDto} from 'forms/dto/update-form.dto';
import {Roles} from 'decorators/roles.decorator';
import {JwtAuthGuard} from 'auth/jwt-auth.guard';
import {RoleGuard} from 'auth/role.guard';
import { FormRO} from "forms/dto/forms.ro";

@ApiTags('Формы')
@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('forms')
export class FormsController {
    constructor(private readonly formService: FormsService) {}

    @ApiOperation({ summary: 'Получение всех форм' })
    @ApiResponse({ status: 200, description: 'Возвращает список форм', type: [FormRO] })
    @Roles('EVENTADMIN', 'ADMIN')
    @Get()
    async fetchForms(): Promise<FormRO[]> {
        return await this.formService.fetch();
    }

    @ApiOperation({ summary: 'Получение формы по ID' })
    @ApiResponse({ status: 200, description: 'Возвращает форму', type: FormRO })
    @ApiResponse({ status: 404, description: 'Форма не найдена' })
    @ApiParam({ name: 'id', type: 'number', description: 'ID формы' })
    @Roles('EVENTADMIN', 'ADMIN')
    @Get(':id')
    async getForm(@Param('id') id: number): Promise<FormRO> {
        return await this.formService.getFormById(id);
    }

    @ApiOperation({ summary: 'Создание новой формы' })
    @ApiResponse({ status: 201, description: 'Форма успешно создана', type: FormRO })
    @ApiBody({ type: CreateFormDto })
    @Roles('EVENTADMIN', 'ADMIN')
    @Post()
    async createForm(@Body() createFormDto: CreateFormDto): Promise<FormRO> {
        return await this.formService.create(createFormDto);
    }

    @ApiOperation({ summary: 'Обновление формы' })
    @ApiResponse({ status: 200, description: 'Форма успешно обновлена', type: FormRO })
    @ApiResponse({ status: 404, description: 'Форма не найдена' })
    @ApiBody({ type: UpdateFormDto })
    @Roles('EVENTADMIN', 'ADMIN')
    @Put(':id')
    async updateForm(@Param('id') id: number, @Body() updateFormDto: UpdateFormDto): Promise<FormRO> {
        return await this.formService.update(id, updateFormDto);
    }

    @ApiOperation({ summary: 'Удаление формы по ID' })
    @ApiResponse({ status: 200, description: 'Форма успешно удалена' })
    @ApiResponse({ status: 404, description: 'Форма не найдена' })
    @ApiParam({ name: 'id', type: 'number', description: 'ID формы для удаления' })
    @Roles('EVENTADMIN', 'ADMIN')
    @Delete(':id')
    async deleteForm(@Param('id') id: number): Promise<void> {
        await this.formService.delete(id);
    }
}
