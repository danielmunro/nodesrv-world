import {ExitEntity} from "../entity/exitEntity"
import {Repository} from "typeorm"
import {RoomEntity} from "../entity/roomEntity"

export default class ExitMapper {
  constructor(private readonly roomRepository: Repository<RoomEntity>) {}

  public async map(data: any) {
    const exit = new ExitEntity()
    exit.direction = data.direction
    const source = await this.roomRepository.findOne({ uuid: data.source.uuid }) as RoomEntity
    const destination = await this.roomRepository.findOne({ uuid: data.destination.uuid }) as RoomEntity
    exit.source = source
    exit.destination = destination

    return exit
  }
}
