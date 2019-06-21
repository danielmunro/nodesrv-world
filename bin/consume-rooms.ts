import {Kafka} from "kafkajs"
import {createConnection, getConnection} from "typeorm"
import ConsumerInstance from "../src/kafka/consumerInstance"
import KafkaConsumer from "../src/kafka/kafkaConsumer"
import {RoomEntity} from "../src/room/entity/roomEntity"
import RoomCreateConsumer from "../src/room/kafkaConsumer/roomCreateConsumer"
import RoomService from "../src/room/service/roomService"
import ExitCreateConsumer from "../src/room/kafkaConsumer/exitCreateConsumer"
import {ExitEntity} from "../src/room/entity/exitEntity"

const kafka = new Kafka({
  clientId: "app",
  brokers: ["localhost:9092"],
})

async function createConsumerInstance(kafkaConsumer: KafkaConsumer): Promise<ConsumerInstance> {
  const consumer = kafka.consumer({groupId: kafkaConsumer.getTopic()})
  await consumer.connect()
  await consumer.subscribe({topic: kafkaConsumer.getTopic(), fromBeginning: true})
  return { consumer, kafkaConsumer }
}

async function run() {
  await createConnection()
  const connection = await getConnection()
  const roomRepository = connection.getRepository(RoomEntity)
  const roomService = new RoomService(roomRepository)
  const exitRepository = connection.getRepository(ExitEntity)

  const consumerInstances = [
    await createConsumerInstance(new RoomCreateConsumer(roomService)),
    await createConsumerInstance(new ExitCreateConsumer(exitRepository, roomRepository)),
  ]

  await Promise.all(consumerInstances.map(async consumerInstance => consumerInstance.consumer.run({
    eachMessage: async message => {
      try {
        await consumerInstance.kafkaConsumer.consume(message)
      } catch (error) {
        // eh
      }
    },
  })))
}

run().catch(console.error)
