import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {CreateEventDto} from 'events/dto/create-event.dto';
import {EventsService} from 'events/events.service';
import {Cookies} from 'decorators/cookie.decorator';
import {Event} from 'events/event.model';
import {UsersService} from 'users/users.service';
import {RegsService} from 'regs/regs.service';
import {FormsService} from 'forms/forms.service';
import {Roles} from 'decorators/roles.decorator';
import {JwtAuthGuard} from 'auth/jwt-auth.guard';
import {RoleGuard} from 'auth/role.guard';
import {EventRO} from "events/dto/event.ro";
import {UpdateEventDto} from "events/dto/update-event.dto";
import {GetEventDto} from "events/dto/get-event.dto";
import {FormRO} from "forms/dto/forms.ro";

@ApiTags('Мероприятия')
@UseGuards(JwtAuthGuard)
@UseGuards(RoleGuard)
@Controller('events')
export class EventsController {
    constructor (
        private readonly eventsService: EventsService,
        private readonly userService: UsersService,
        private readonly regService: RegsService,
        private readonly formsService: FormsService) {}

    @ApiOperation({ summary: 'Получение всех мероприятий' })
    @ApiResponse({ status: 200, type: [EventRO] })
    @Roles('USER')
    @Get('fetch')
    async fetchEvents (): Promise<EventRO[]> {
        /* TODO:
        сделать возвращение 3 разных массивов учитывая роли пользователя,
        массив всех мероприятий ( только на которые он может зарегистрироваться),
        массив мероприятий на которые он зарегистрировался ( не админит)
        массив мероприятий которые он администрирует ( если администрирует)

        все эти 3 массива не должны пересекаться
        */
        return await this.eventsService.fetchEvents();
    }

    @ApiBody({ type: CreateEventDto, description: 'authorId сам подтягивается системой, передавать не надо' })
    @ApiOperation({ summary: 'Создание мероприятия' })
    @ApiResponse({ status: 200, type: EventRO })
    @Roles('EVENTADMIN')
    @Post('create')
    async createEvent (@Body() data: Omit<CreateEventDto, 'userId'>, @Cookies('id_token') idToken: string): Promise<EventRO> {
        const isu = (this.userService.decodeUser(idToken)).isu;
        const eventDto: CreateEventDto = { ...data, userId: isu };
        return await this.eventsService.createEvent(eventDto);
    }

    @ApiOperation({ summary: 'Получение мероприятия по id' })
    @ApiResponse({ status: 200, type: EventRO })
    @Roles('ADMIN')
    @Get(':id')
    async getEvent (@Param() params: GetEventDto): Promise<EventRO> {
        return await this.eventsService.getEvent(params.id);
    }

    @ApiOperation({ summary: 'Получение формы мероприятия если пользователь может зарегистрирваться' })
    @ApiResponse({ status: 200, type: FormRO})
    @Roles('USER')
    @Get('register/:id')
    async getTicket (@Param() params: GetEventDto, @Cookies('id_token') idToken: string): Promise<FormRO> {
        const event = (await this.eventsService.getEvent(params.id)).event;
        if (event) {
            const userId = this.userService.decodeUser(idToken).isu;
            const canRegister = await this.regService.canRegister(params.id, userId);
            if (canRegister) return await this.formsService.getFormById(event.formId);
        }
        throw new HttpException({message:'User cant register'}, HttpStatus.BAD_REQUEST);
    }


    @Roles('EVENTADMIN', 'ADMIN')
    @Patch(':id')
    async editEvent (@Body() data: UpdateEventDto): Promise<EventRO> {
        await this.eventsService.editEvent(data);
        await this.regService.clearRegList(data.id);
        return this.eventsService.buildEventRO(data.event as Event);
    }

    @Roles('EVENTADMIN', 'ADMIN')
    @Delete('delete')
    async deleteEvent (@Cookies('id_token') idToken: string, @Body() id: number): Promise<void> {
        const isu = (this.userService.decodeUser(idToken)).isu;
        const event = (await this.eventsService.getEvent(id)).event;
        if (event && event.userId === isu) {
            await this.eventsService.deleteEvent(id);
            await this.regService.deleteReg(id);
        }
    }
}
