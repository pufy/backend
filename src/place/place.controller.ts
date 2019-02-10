import { Controller, Get } from '@nestjs/common';
import { PlaceService } from './place.service';

@Controller('place')
export class PlaceController {
  constructor(
    private readonly placeService: PlaceService) {}

  @Get()
  async getHello(): Promise<Object> {
    return await this.placeService.findAll();
  }
}
