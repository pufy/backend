import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { user } from '../entities/user';
import { member } from '../entities/member';
import { checkin } from '../entities/checkin';
import { place } from '../entities/place';
import { place_filter } from '../entities/place_filter';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([place, place_filter, user, member, checkin])
  ],
  controllers: [PlaceController],
  providers: [PlaceService],
})
export class PlaceModule {}
