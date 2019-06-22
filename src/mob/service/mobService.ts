import {Repository} from "typeorm"
import {MobEntity} from "../entity/mobEntity"

export default class MobService {
  constructor(private readonly mobRepository: Repository<MobEntity>) {}

  public async saveMob(mobEntity: MobEntity) {
    return this.mobRepository.save(mobEntity)
  }
}
