import { Controller, Get, Query, Post, Param, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import Response from '../common/response';
import { PlaceService } from './place.service';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('place')
export class PlaceController {
  constructor(
    private readonly placeService: PlaceService) {}

  @Get()
  async getPlacesAround(@Query('lat') lat, @Query('long') long, @Query('range') range): Promise<Object> {
    if(!range) range = '3000';
    return await this.placeService.getPlacesAround(lat, long, range);
  }

  @Post(':place_id/checkin')
  @UseGuards(AuthGuard('bearer'), RolesGuard)
  async checkin(@Req() request, @Param('place_id') placeId){
    let response = await this.placeService.checkin(placeId, request.user.id);
    if(response == 'OK')
      return Response.status({ success: 'OK' }).payload();
    return Response.status({ error: response }).payload();
  }
}
