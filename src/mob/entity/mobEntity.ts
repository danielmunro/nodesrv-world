import {Column, Entity, Generated, ManyToOne, PrimaryGeneratedColumn} from "typeorm"
import * as v4 from "uuid"
import {RoomEntity} from "../../room/entity/roomEntity"

@Entity()
export class MobEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  @Generated("uuid")
  public uuid: string = v4()

  @ManyToOne(() => RoomEntity)
  public room: RoomEntity
}
