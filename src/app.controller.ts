import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Connection } from 'typeorm';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly connection: Connection) {}

  @Get()
  async getHello(): Promise<Object> {
    const rawData = await this.connection.query(`select version()`);
		rawData[0].hello = this.appService.getHello() + " postgres";
    return rawData; 
  }
}
