import { Injectable, Inject } from '@nestjs/common';

import { QueueAddTrackDto } from './dto/queue-add-track.dto';

@Injectable()
export class QueueService {

  constructor(
    @Inject('RedisProvider') private readonly redis
    ){
  }

  public async getQueueByPlace(placeId) {
    return await this.redis.lrangeAsync(`queue:${placeId}`, 0, -1)
    .then(queque => queque.map(item => JSON.parse(item)))
  }

  async queueAdd(placeId, track: QueueAddTrackDto) {
    return await this.redis.rpushAsync(`queue:${placeId}`, JSON.stringify(track));
  }
}
