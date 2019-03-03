import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';

import { user } from '../entities/user';
import { session_spotify } from '../entities/session_spotify';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { SpotifyStrategy } from './strategies/spotify.strategy';
import { HttpStrategy } from '../common/http.strategy';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([user, session_spotify]),
    JwtModule.register({ secretOrPrivateKey: process.env.JWT_KEY }),
  ],
  controllers: [AuthController],
  providers: [AuthService, HttpStrategy, UserService, SpotifyStrategy],
})
export class AuthModule {}
