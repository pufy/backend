import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { QueueAddTrackDto } from './dto/queue-add-track.dto';
import { place } from '../entities/place';
import { session_spotify } from '../entities/session_spotify';
import { SpotifyService } from './spotify.service';
import { PlaceService } from '../place/place.service';

@Injectable()
export class PlayerService {

  constructor(
    @InjectRepository(place) private readonly placeRepository: Repository<place>,
    @InjectRepository(session_spotify) private readonly sessionSpotifyRepository: Repository<session_spotify>,
    @Inject('RedisProvider') private readonly redis,
    @Inject('ConfigService') private readonly config,
    private readonly spotifyService: SpotifyService,
    private readonly placeService: PlaceService
    ){
  }

  async searchTrackByPlace(placeId, track){
    let spotify = await this.spotifyService.init(placeId);
    //let genres = await this.placeService.getGenres(placeId);
    
    if(spotify != 'SESSION_NOT_EXIST'){
      return spotify.searchTracks(`${track}`)
      .then((data) => {
        return data.body.tracks.items.map(item => {
          return {
            'id': item.id,
            'name': item.name,
            'artist': item.artists.map(a => a.name),
            'album': item.album.name + ' - ' + item.album.release_date.split("-")[0],
            'duration_ms': item.duration_ms,
            'image': item.album.images.map(a => a.url)
          }
        })
      }, (err) => { 
        if(err.statusCode == 400) return 'IS_NOT_FOUND'
        else return 'ERROR_SPOTIFY_CLOSED';
      });
    }
    else return 'SESSION_NOT_EXIST'; 
  }

}
