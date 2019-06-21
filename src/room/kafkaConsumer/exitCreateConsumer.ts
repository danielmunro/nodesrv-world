import KafkaConsumer from "../../kafka/kafkaConsumer"
import {Topic} from "../../kafka/topic"
import {RoomEntity} from "../entity/roomEntity"
import {Repository} from "typeorm"
import ExitMapper from "../mapper/exitMapper"
import {ExitEntity} from "../entity/exitEntity"

export default class ExitCreateConsumer implements KafkaConsumer {
  private exitMapper: ExitMapper

  constructor(
    private readonly exitRepository: Repository<ExitEntity>,
    roomRepository: Repository<RoomEntity>) {
    this.exitMapper = new ExitMapper(roomRepository)
  }

  public getTopic(): Topic {
    return Topic.ExitCreate
  }

  public async consume({ message }: any): Promise<void> {
    const data = JSON.parse(message.value.toString())
    const exitEntity = await this.exitMapper.map(data)
    await this.exitRepository.save(exitEntity)
  }
}
