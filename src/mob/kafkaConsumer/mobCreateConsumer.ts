import KafkaConsumer from "../../kafka/kafkaConsumer"
import {Topic} from "../../kafka/topic"
import MobService from "../service/mobService"
import MobMapper from "../mapper/mobMapper"

export default class MobCreateConsumer implements KafkaConsumer {
  constructor(private readonly mobService: MobService, private readonly mobMapper: MobMapper) {}

  public getTopic(): Topic {
    return Topic.MobCreate
  }

  public async consume({ message }: any): Promise<void> {
    const data = JSON.parse(message.value.toString())
    const mobEntity = await this.mobMapper.map(data)
    await this.mobService.saveMob(mobEntity)
  }
}
