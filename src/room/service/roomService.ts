import {Repository} from "typeorm"
import {RoomEntity} from "../entity/roomEntity"

export default class RoomService {
  constructor(private readonly roomRepository: Repository<RoomEntity>) {}

  public async saveRoom(roomEntity: RoomEntity) {
    return this.roomRepository.save(roomEntity)
  }
}
