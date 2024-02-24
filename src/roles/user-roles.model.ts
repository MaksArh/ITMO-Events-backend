import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'users/user.model';
import { Role } from './role.model';

@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор связи пользователя и роли' })
    @Column({ type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement: true })
        id: number;

    @ApiProperty({ example: 123, description: 'Идентификатор пользователя' })
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
        userId: number;

    @ApiProperty({ example: 456, description: 'Идентификатор роли' })
    @ForeignKey(() => Role)
    @Column({ type: DataType.INTEGER })
        roleId: number;

    @ApiProperty({ example: null, description: 'Дополнительные данные связи (если применимо)', nullable: true })
    @Column({ type: DataType.INTEGER, allowNull: true })
        data: number;
}
