import { Injectable, Inject } from '@nestjs/common';
import * as SpotifyWebApi from "spotify-web-api-node";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { session_spotify } from '../entities/session_spotify';

@Injectable()
export class SpotifyService {

  constructor(
    @InjectRepository(session_spotify) private readonly sessionSpotifyRepository: Repository<session_spotify>,
    @Inject('ConfigService') private readonly config
    ){
  }
  
  public async init(placeId){
    let session: any = await this.sessionSpotifyRepository
    .createQueryBuilder("session_spotify")
    .where("fk_place = :placeId", { placeId: placeId })
    .getOne();
    
    if(session){
      let spotify = new SpotifyWebApi()
      spotify.setClientId(this.config.spotify.client_id);
      spotify.setClientSecret(this.config.spotify.client_secret);
      spotify.setRedirectURI(this.config.spotify.callback_url);
      spotify.setAccessToken(session.token);
      spotify.setRefreshToken(session.refresh_token);
      return spotify;
    } 
    return "SESSION_NOT_EXIST"
  }

}
