import { Controller, Get, Param, UseGuards, Req, HttpStatus, Query, Body, Post } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { InjectEventEmitter } from 'nest-emitter';

import Response from '../common/response';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { PlayerService } from './player.service';
import { QueueService } from './queue.service';
import { QueueAddTrackDto } from './dto/queue-add-track.dto';
import { QueueEmitter } from './events/queue.event';

@ApiUseTags('Reproductor')
@Controller('player')
export class PlayerController {
  constructor(
    @InjectEventEmitter() private readonly queueEmitter: QueueEmitter,
    private readonly playerService: PlayerService,
    private readonly queueService: QueueService) {}

  @Post('place/:id/queue')
  async queueAdd(@Body('track') track: QueueAddTrackDto, @Param('id') placeId) {
    let response = await this.queueService.queueAdd(placeId, track);
    if(response > 0) {
      this.queueEmitter.emit("queue_add", { placeId: placeId, track: track});
      return Response.status({ success: 'OK' }).payload();
    }
    return Response.status({ error: 'ERROR_REDIS' }).payload();
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

