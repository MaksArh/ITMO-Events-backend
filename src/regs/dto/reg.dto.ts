import {ApiProperty} from "@nestjs/swagger";

type RegState = 'approved' | 'declined' | 'awaiting' | 'worker' | '';

export class RegDto {
    @ApiProperty({ example: '{обьект с формой}', description: 'Заполненная форма регистрации' })
    readonly data: object;
    @ApiProperty({ example: 'Одобрен', description: 'Состояние пользователя в заявке' })
    readonly state: RegState = '';
    @ApiProperty({ example: 'Этого не брать, сломал диван', description: 'Комментарий к карточке пользователя' })
    readonly comment: string = '';
}
