import {RoomEntity} from "../entity/roomEntity"
import {RegionEntity} from "../entity/regionEntity"

export default function(data: any): RoomEntity {
  const room = new RoomEntity()
  room.uuid = data.uuid
  room.canonicalId = data.id
  room.name = data.name
  room.description = data.description
  room.area = data.area
  room.region = new RegionEntity()
  room.region.terrain = data.region.terrain

  return room
}
