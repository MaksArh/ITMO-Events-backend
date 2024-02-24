import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateUserDto {
    @ApiPropertyOptional({ example: 'https://vk.com/username', description: 'Ссылка на профиль VK пользователя' })
    @IsOptional()
    @IsString()
    @Matches(/^https:\/\/vk\.com\/[\w._]+$/, {
        message: 'vk must be a valid VK URL in the format https://vk.com/username',
    })
    readonly vk: string;

    @ApiPropertyOptional({ example: '@username', description: 'Имя пользователя в Telegram' })
    @IsOptional()
    @IsString()
    @Matches(/^@[\w._]+$/, {
        message: 'tg must be a valid Telegram username starting with @',
    })
    readonly tg: string;

    @ApiPropertyOptional({ example: '+7 912 345 6789', description: 'Номер телефона пользователя' })
    @IsOptional()
    @IsString()
    @Matches(/^(\+7|8)\s?\d{3}\s?\d{3}\s?\d{4}$/, {
        message: 'phone must be a valid Russian phone number',
    })
    @Transform(({ value }) => value.replace(/^8/, '+7'))
    readonly phone: string;

    @ApiPropertyOptional({ example: 'user@example.com', description: 'Электронная почта пользователя' })
    @IsOptional()
    @IsEmail({}, {
        message: 'email must be a valid email address',
    })
    readonly email: string;
}
