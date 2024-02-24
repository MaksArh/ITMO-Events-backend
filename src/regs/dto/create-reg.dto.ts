import {ApiProperty} from "@nestjs/swagger";

export class CreateRegDto {
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор события' })
    readonly eventId: number;
}
