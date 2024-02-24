import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';
import {EventData} from "events/dto/event.ro";

export class UpdateEventDto {
    @ApiProperty({ description: 'ID события', example: 1 })
    @IsInt()
    readonly id: number;

    @ApiProperty({ description: 'Обновленный поля мероприятия', type: EventData })
    readonly event: EventData;
}
