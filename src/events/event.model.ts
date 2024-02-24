import {BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table} from 'sequelize-typescript';
import {Form} from 'forms/form.model';
import {Reg} from 'regs/reg.model';
import {ApiProperty} from '@nestjs/swagger';

interface EventsCreationAttrs {
    title: string
    description: string
    userId: number
    imageUrl: string
    formId: number
}

@Table({ tableName: 'events', createdAt: false, updatedAt: false })
export class Event extends Model<Event, EventsCreationAttrs> {
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор события' })
    @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true, allowNull: false })
        id: number;

    @ApiProperty({ example: 'Название события', description: 'Название события' })
    @Column({ type: DataType.STRING, allowNull: false })
        title: string;

    @ApiProperty({ example: 'Описание события', description: 'Подробное описание события' })
    @Column({ type: DataType.STRING, allowNull: false })
        description: string;

    @ApiProperty({ example: 'http://example.com/image.jpg', description: 'URL изображения события' })
    @Column({ type: DataType.STRING, allowNull: true })
        imageUrl: string;

    @ApiProperty({ example: 'http://example.com/album.jpg', description: 'URL альбома события' })
    @Column({ type: DataType.STRING, allowNull: true })
        albumUrl: string;

    @ApiProperty({ example: 123, description: 'Идентификатор пользователя, создавшего событие' })
    @Column({ type: DataType.INTEGER, allowNull: false })
        userId: number;

    @ApiProperty({ example: '2023-01-01T00:00:00.000Z', description: 'Дата и время начала события' })
    @Column({ type: DataType.DATE, allowNull: false })
        eventStartDate: Date;

    @ApiProperty({ example: '2023-01-02T00:00:00.000Z', description: 'Дата и время окончания события' })
    @Column({ type: DataType.DATE, allowNull: false })
        eventExpirationDate: Date;

    @ApiProperty({ example: '2022-12-25T00:00:00.000Z', description: 'Дата и время начала регистрации на событие' })
    @Column({ type: DataType.DATE, allowNull: false })
        regStartDate: Date;

    @ApiProperty({ example: '2022-12-31T00:00:00.000Z', description: 'Дата и время окончания регистрации на событие' })
    @Column({ type: DataType.DATE, allowNull: false })
        regExpirationDate: Date;

    @ApiProperty({ example: 48, description: 'Продолжительность события в часах' })
    @Column({ type: DataType.INTEGER, allowNull: false })
        duration: number;

    @ApiProperty({ example: 100, description: 'Количество участников события' })
    @Column({ type: DataType.INTEGER, defaultValue: 0 })
        memberAmount: number;

    @ApiProperty({ example: 150, description: 'Количество посетителей события' })
    @Column({ type: DataType.INTEGER, defaultValue: 0 })
        visitors: number;

    @HasOne(() => Reg)
        reg: Reg;

    @ForeignKey(() => Form)
    @ApiProperty({ example: 2, description: 'Идентификатор формы для регистрации на событие' })
    @Column({ type: DataType.INTEGER, allowNull: true })
        formId: number;

    @BelongsTo(() => Form)
        form: Form;
}
