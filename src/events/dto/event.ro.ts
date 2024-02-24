
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsDateString, IsInt, IsOptional, IsString, Min} from "class-validator";
import {NewsData} from "news/dto/news.ro";
export class EventData {
    @ApiProperty({ example: '12', description: 'ID' })
    readonly id:number;
    @ApiProperty({ description: 'ID пользователя', example: 339116 })
    @IsInt()
    readonly userId: number;

    @ApiPropertyOptional({ description: 'Название события' })
    @IsString()
    @IsOptional()
    readonly title?: string;

    @ApiPropertyOptional({ description: 'Описание события' })
    @IsString()
    @IsOptional()
    readonly description?: string;

    @ApiPropertyOptional({ description: 'URL изображения события' })
    @IsString()
    @IsOptional()
    readonly imageUrl?: string;

    @ApiPropertyOptional({ description: 'URL альбома события' })
    @IsString()
    @IsOptional()
    readonly albumUrl?: string;

    @ApiPropertyOptional({ description: 'Дата начала события', type: 'string', format: 'date-time' })
    @IsDateString()
    @IsOptional()
    readonly eventStartDate?: Date;

    @ApiPropertyOptional({ description: 'Дата окончания события', type: 'string', format: 'date-time' })
    @IsDateString()
    @IsOptional()
    readonly eventExpirationDate?: Date;

    @ApiPropertyOptional({ description: 'Дата начала регистрации', type: 'string', format: 'date-time' })
    @IsDateString()
    @IsOptional()
    readonly regStartDate?: Date;

    @ApiPropertyOptional({ description: 'Дата окончания регистрации', type: 'string', format: 'date-time' })
    @IsDateString()
    @IsOptional()
    readonly regExpirationDate?: Date;

    @ApiPropertyOptional({ description: 'Продолжительность события в мс' })
    @IsInt()
    @Min(0)
    @IsOptional()
    readonly duration?: number;

    @ApiPropertyOptional({ description: 'Ожидаемое количество участников' })
    @IsInt()
    @Min(0)
    @IsOptional()
    readonly memberAmount?: number;

    @ApiPropertyOptional({ description: 'Количество посетителей' })
    @IsInt()
    @Min(0)
    @IsOptional()
    readonly visitors?: number;

    @ApiProperty({ description: 'ID формы', example: 10 })
    @IsInt()
    readonly formId: number;
}

export class EventRO {
    @ApiProperty({ type: NewsData, description: 'Данные мероприятия' })
    readonly event: EventData;
}
