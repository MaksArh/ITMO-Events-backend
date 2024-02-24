import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface NewsCreationAttrs {
    title: string;
    content: string;
}

@Table({ tableName: 'news' })
export class News extends Model<News, NewsCreationAttrs> {
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор новости' })
    @Column({ type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement: true })
        id: number;

    @ApiProperty({ example: 'Заголовок новости', description: 'Заголовок новости' })
    @Column({ type: DataType.STRING, allowNull: false })
        title: string;

    @ApiProperty({ example: 'Содержание новости', description: 'Текст новости' })
    @Column({ type: DataType.STRING, allowNull: false })
        content: string;

    @ApiProperty({ example: 'http://example.com/news_image.jpg', description: 'URL изображения новости', required: false })
    @Column({ type: DataType.STRING, allowNull: true })
        imageURL: string;
}
