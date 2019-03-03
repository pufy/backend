import { Injectable, Inject } from '@nestjs/common';
import * as SpotifyWebApi from "spotify-web-api-node";
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { user } from "../entities/user";
import { QueueAddTrackDto } from './dto/queue-add-track.dto';

@Injectable()
export class PlayerService {

  spotify;

  constructor(
    /*@InjectRepository(user)
    private readonly userRepository: Repository<user>,*/
		private readonly connection: Connection,
    @Inject('RedisProvider') private readonly redis,
    @Inject('ConfigService') private readonly config
    ){
  }

  public async getQueueByPlace(placeId) {
    return await this.redis.lrangeAsync(`queue:${placeId}`, 0, -1)
    .then(queque => queque.map(item => JSON.parse(item)))
  }

  async queueAdd(placeId, track: QueueAddTrackDto) {
    return await this.redis.rpushAsync(`queue:${placeId}`, JSON.stringify(track));
  }
  
  public init(accessToken, refreshToken){
    this.spotify = new SpotifyWebApi()
    this.spotify.setClientId(this.config.spotify.client_id);
    this.spotify.setClientSecret(this.config.spotify.client_secret);
    this.spotify.setRedirectURI(this.config.spotify.callback_url);
    this.spotify.setAccessToken(accessToken);
    this.spotify.setRefreshToken(refreshToken);
  }

}
