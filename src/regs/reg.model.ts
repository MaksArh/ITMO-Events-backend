import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Event } from 'events/event.model';

interface RegCreationAttrs {
    eventId: number
    regList: object[]
}
@Table({ tableName: 'regs' })
export class Reg extends Model<Reg, RegCreationAttrs> {
    @ForeignKey(() => Event)
    @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, allowNull: false })
        eventId: number;

    @Column({ type: DataType.ARRAY(DataType.JSON), allowNull: true })
        regList: object[];
}
