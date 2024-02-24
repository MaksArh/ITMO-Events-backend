import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {Role} from "roles/role.model";

export class UserData {
    @ApiProperty({ example: 123456, description: 'ISU пользователя' })
    readonly isu: number;

    @ApiProperty({ example: 'male', description: 'Пол пользователя' })
    readonly gender: string;

    @ApiProperty({ example: 'Иванов Иван Иванович', description: 'Полное имя пользователя' })
    readonly name: string;

    @ApiProperty({ example: 'Иванов', description: 'Фамилия пользователя' })
    readonly family_name: string;

    @ApiProperty({ example: 'Иван', description: 'Имя пользователя' })
    readonly given_name: string;

    @ApiPropertyOptional({ example: 'Иванович', description: 'Отчество пользователя' })
    readonly middle_name: string;

    @ApiProperty({ example: 'http://example.com/picture.jpg', description: 'Ссылка на фотографию пользователя' })
    readonly picture: string;

    @ApiProperty({ example: 'user@example.com', description: 'Email пользователя' })
    readonly email: string;

    @ApiProperty({ example: true, description: 'Email подтвержден' })
    readonly email_verified: boolean;

    @ApiProperty({ example: true, description: 'Является ли пользователь студентом' })
    readonly is_student: boolean;

    @ApiProperty({ example: 'student@example.com', description: 'Корпоративный email пользователя' })
    readonly corp_email: string;

    @ApiPropertyOptional({ type: [Role], description: 'Список ролей пользователя' })
    readonly roles?: Role[];
}


export class UserRO {
    @ApiProperty({ type: UserData, description: 'Данные пользователя' })
    readonly user: UserData;
}
