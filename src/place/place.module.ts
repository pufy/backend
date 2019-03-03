import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { place } from '../entities/place';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([place])
  ],
  controllers: [PlaceController],
  providers: [PlaceService],
})
export class PlaceModule {}
