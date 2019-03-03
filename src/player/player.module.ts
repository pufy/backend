import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//import { user } from '../entities/';
import { CommonModule } from '../common/common.module';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';

@Module({
  imports: [
    //TypeOrmModule.forFeature([user, rol])
    CommonModule
  ],
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class PlayerModule {}
