import * as express from 'express'
import * as cors from 'cors'
import {createConnection, getConnection} from "typeorm"
import {MobEntity} from "../src/mob/entity/mobEntity"
import {RoomEntity} from "../src/room/entity/roomEntity"
import {Request} from "express"
import * as bodyParser from "body-parser"
const app = express()
const port = 8081

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

createConnection().then(async () => {
  const connection = getConnection()
  const mobRepository = connection.getRepository(MobEntity)
  const roomRepository = connection.getRepository(RoomEntity)

  app.get('/', (_, res) => {
    return res.send('ok!')
  })

  app.get('/mob/:uuid', async (req, res) => {
    const mob = await mobRepository.findOne({ uuid: req.query.uuid })
    if (!mob) {
      return res.status(404).send('not found')
    }
    return res.send(mob)
  })

  app.patch('/mob/:uuid', async (req: Request, res) => {
    const mob = await mobRepository.findOne({ uuid: req.params.uuid })
    if (!mob) {
      return res.status(404).send('mob not found')
    }
    const room = await roomRepository.findOne({ uuid: req.body.room })
    if (!room) {
      return res.status(404).send('room not found')
    }
    mob.room = room
    await mobRepository.save(mob)
    return res.sendStatus(200)
  })

  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
})
