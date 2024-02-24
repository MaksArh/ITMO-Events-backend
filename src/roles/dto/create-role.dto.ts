import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateRoleDto {
    @ApiProperty({ example: 'ADMIN', description: 'Название роли' })
    @IsString()
    readonly value: string;
    @ApiProperty({ example: 'Роль Администратора, дает доступ ко всем роута', description: 'Описание роли' })
    @IsString()
    readonly description: string;
}
