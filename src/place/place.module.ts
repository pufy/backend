import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { place } from '../entities/place';
import { place_filter } from '../entities/place_filter';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([place, place_filter])
  ],
  controllers: [PlaceController],
  providers: [PlaceService],
})
export class PlaceModule {}
