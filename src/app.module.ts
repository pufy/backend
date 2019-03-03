import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PlayerModule } from './player/player.module';
import { PlaceModule } from './place/place.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PlaceModule,
    PlayerModule,
    CommonModule,
    TypeOrmModule.forRootAsync({
      useFactory: async (config) => (config.orm_config),
      inject: ['ConfigService']
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
