import KafkaConsumer from "../../kafka/kafkaConsumer"
import {Topic} from "../../kafka/topic"
import RoomService from "../service/roomService"
import roomMapper from "../mapper/roomMapper"

export default class RoomCreateConsumer implements KafkaConsumer {
  constructor(private readonly roomService: RoomService) {}

  public getTopic(): Topic {
    return Topic.RoomCreate
  }

  public async consume({ message }: any): Promise<void> {
    const data = JSON.parse(message.value.toString())
    const roomEntity = roomMapper(data)
    await this.roomService.saveRoom(roomEntity)
  }
}
