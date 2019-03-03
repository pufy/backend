import { Controller, Get, Query } from '@nestjs/common';
import { PlaceService } from './place.service';

@Controller('place')
export class PlaceController {
  constructor(
    private readonly placeService: PlaceService) {}

  @Get()
  async getPlacesAround(@Query('lat') lat, @Query('long') long, @Query('range') range): Promise<Object> {
    if(!range) range = '3000';
    return await this.placeService.getPlacesAround(lat, long, range);
  }
}
