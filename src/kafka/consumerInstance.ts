import {Consumer} from "kafkajs"
import KafkaConsumer from "./kafkaConsumer"

export default interface ConsumerInstance {
  readonly consumer: Consumer
  readonly kafkaConsumer: KafkaConsumer
}
