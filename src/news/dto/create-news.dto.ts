import {ApiProperty} from "@nestjs/swagger";

export class CreateNewsDto {
    @ApiProperty({ example: 'Зубры в Ягодном!', description: 'Заголовок новости' })
    readonly title: string;
    @ApiProperty({ example: 'Вчера в ягодном гуляли зубры, без происшествий, ушли спокойно', description: 'Текст поста новости' })
    readonly content: string;
    @ApiProperty({ example: 'imageUrl', description: 'URL картинки' })
    readonly imageURL?: string;
}
