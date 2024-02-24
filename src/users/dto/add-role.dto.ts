import {IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class AddRoleDto {
    @ApiProperty({ example: 'ADMIN', description: 'Роль' })
    @IsString()
    readonly value: string;

    @ApiProperty({ example: '330330', description: 'isu ID' })
    @IsNumber()
    readonly userId: number;
}
