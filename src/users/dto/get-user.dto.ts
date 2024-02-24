import {IsNumber} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class GetUserDto{
    @ApiProperty({ example: '330330', description: 'isu ID' })
    @IsNumber()
    readonly isu:number;
}