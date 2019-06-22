import {MobEntity} from "../entity/mobEntity"
import {Repository} from "typeorm"
import {RoomEntity} from "../../room/entity/roomEntity"

export default class MobMapper {
  constructor(private readonly roomRepository: Repository<RoomEntity>) {}

  public async map(data: any): Promise<MobEntity> {
    const mobEntity = new MobEntity()
    mobEntity.uuid = data.mob.uuid
    const roomEntity = await this.roomRepository.findOne({uuid: data.room.uuid})
    if (!roomEntity) {
      throw new Error("room does not exist")
    }
    mobEntity.room = roomEntity
    return mobEntity
  }
}
