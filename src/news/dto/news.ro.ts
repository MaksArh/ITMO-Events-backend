import {ApiProperty} from "@nestjs/swagger";

export class NewsData{
    @ApiProperty({ example: '12', description: 'ID' })
    readonly id:number;
    @ApiProperty({ example: 'Зубры в Ягодном!', description: 'Заголовок новости' })
    readonly title: string;
    @ApiProperty({ example: 'Вчера в ягодном гуляли зубры, без происшествий, ушли спокойно', description: 'Текст поста новости' })
    readonly content: string;
    @ApiProperty({ example: 'imageUrl', description: 'URL картинки' })
    readonly imageURL?: string;
}

export class NewsRO{
    @ApiProperty({ type: NewsData, description: 'Данные поста' })
    readonly news: NewsData;
}