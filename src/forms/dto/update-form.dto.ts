import {ApiProperty} from "@nestjs/swagger";

export class UpdateFormDto{
    @ApiProperty({ example: 'Выезд в ягодное 2007', description: 'Название формы' })
    readonly title?: string;

    @ApiProperty({ example: 'Выезд для больших выездов магистров', description: 'Описание формы' })
    readonly description?: string;

    @ApiProperty({ example: '{...}', description: 'Наполнение формы полями' })
    readonly fields?: object[];
}