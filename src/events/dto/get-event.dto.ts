import {ApiProperty} from "@nestjs/swagger";
import {IsNumber} from "class-validator";

export class GetEventDto{
    @ApiProperty({ example: '3324', description: 'ID мероприятия' })
    @IsNumber()
    readonly id:number;
}