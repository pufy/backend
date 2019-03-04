import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { place } from '../entities/place';
import { session_spotify } from '../entities/session_spotify';
import { place_filter } from '../entities/place_filter';
import { CommonModule } from '../common/common.module';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { QueueService } from './queue.service';
import { SpotifyService } from './spotify.service';
import { PlaceService } from '../place/place.service';
import { QueueGateway } from './gateways/queue.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([place, session_spotify, place_filter]),
    CommonModule
  ],
  controllers: [PlayerController],
  providers: [
    PlayerService, 
    QueueService, 
    SpotifyService, 
    PlaceService, 
    QueueGateway,
  ],
})
export class PlayerModule {}
