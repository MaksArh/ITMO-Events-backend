import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Event } from 'events/event.model';

interface RegCreationAttrs {
    eventId: number;
}

@Table({ tableName: 'regs', createdAt: false, updatedAt: false })
export class Reg extends Model<Reg, RegCreationAttrs> {
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор события' })
    @ForeignKey(() => Event)
    @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, allowNull: false })
        eventId: number;

    @ApiProperty({
        example: {
            1: { data: { someData: 'value' }, state: 'registered', comment: 'First comment' },
            2: { data: { someOtherData: 'value' }, state: 'waiting', comment: 'Second comment' }
        },
        description: 'Список регистраций на событие, где ключ - это ID пользователя, а значение - данные регистрации пользователя',
        type: 'object'
    })
    @Column({ type: DataType.JSONB, defaultValue: {} })
        regList: Record<number, { data: object, state: string, comment: string }>;
}
