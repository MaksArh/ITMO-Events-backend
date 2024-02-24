import {Event} from "events/event.model";
import {ApiProperty} from "@nestjs/swagger";

export class FormData {
    @ApiProperty({ example: '12', description: 'ID' })
    readonly id:number;
    @ApiProperty({ example: '330330', description: 'isu ID создателя' })
    readonly userId: number;
    @ApiProperty({ example: 'Выезд в ягодное 2007', description: 'Название формы' })
    readonly title: string;
    @ApiProperty({ example: 'Выезд для больших выездов магистров', description: 'Описание формы' })
    readonly description: string;
    @ApiProperty({ example: '{...}', description: 'Наполнение формы полями' })
    readonly fields: object[];
    @ApiProperty({ description: 'Наполнение формы полями', type: [Event] })
    readonly events?: Event[];
}

export class FormRO {
    @ApiProperty({ type: FormData, description: 'Данные формы' })
    readonly form: FormData;
}
