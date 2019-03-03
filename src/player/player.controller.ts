import { Controller, Get, Param, UseGuards, Req, HttpStatus, Query, Body, Post } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import Response from '../common/response';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { PlayerService } from './player.service';
import { QueueService } from './queue.service';
import { QueueAddTrackDto } from './dto/queue-add-track.dto';

@ApiUseTags('Reproductor')
@Controller('player')
export class PlayerController {
  constructor(
    private readonly playerService: PlayerService,
    private readonly queueService: QueueService) {}

  @Get('queue')
  async getQueueByPlace(){
    let placeId = 2;
    return Response.status({ success: 'OK' }).payload(await this.queueService.getQueueByPlace(placeId));
  }

  @Post('queue')
  async queueAdd(@Body('track') track: QueueAddTrackDto) {
    let placeId = 2;
    let response = await this.queueService.queueAdd(placeId, track);
    if(response > 0) return Response.status({ success: 'OK' }).payload();
    else return Response.status({ error: 'ERROR_REDIS' }).payload();
  }

  @Get('place/:id/search/track')
  async searchTrackByPlace(@Param('id') placeId, @Query('track') track){
    let response = await this.playerService.searchTrackByPlace(placeId, track);
    
    if(Array.isArray(response)){
      return Response.status({ success: 'OK' }).payload(response);
    } 
    return Response.status({ error: response }).payload();
  }
}

