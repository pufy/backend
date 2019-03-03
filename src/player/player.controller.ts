import { Controller, Get, Param, UseGuards, Req, HttpStatus, Res, Body, Post } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import Response from '../common/response';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { PlayerService } from './player.service';
import { QueueAddTrackDto } from './dto/queue-add-track.dto';

@ApiUseTags('Reproductor')
@Controller('player')
export class PlayerController {
  constructor(
    private readonly playerService: PlayerService) {}

  @Get('queue/all')
  async getQueueByPlace(){
    let placeId = 2;
    return Response.status({ success: 'OK' }).payload(await this.playerService.getQueueByPlace(placeId));
  }

  @Post('queue/add')
  async queueAdd(@Body('track') track: QueueAddTrackDto) {
    let placeId = 2;
    let response = await this.playerService.queueAdd(placeId, track);
    if(response > 0) return Response.status({ success: 'OK' }).payload();
    else return Response.status({ error: 'ERROR_REDIS' }).payload();
  }
}

