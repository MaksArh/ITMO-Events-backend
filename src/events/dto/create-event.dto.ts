import {ApiProperty} from '@nestjs/swagger';
import {IsInt, IsString} from 'class-validator';

export class CreateEventDto {
    @ApiProperty({ description: 'Название события', example: 'Название мероприятия' })
    @IsString()
    readonly title: string;

    @ApiProperty({ description: 'Описание события', example: 'Описание мероприятия' })
    @IsString()
    readonly description: string;

    @ApiProperty({ description: 'URL изображения события', example: 'http://example.com/image.jpg' })
    @IsString()
    readonly imageUrl: string;

    @ApiProperty({ description: 'ID пользователя', example: 123 })
    @IsInt()
    readonly userId: number;

    @ApiProperty({ description: 'ID формы', example: 10 })
    @IsInt()
    readonly formId: number;
}
