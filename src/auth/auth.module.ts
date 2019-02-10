import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';

import { user } from '../entities/user';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { HttpStrategy } from '../common/http.strategy';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([user]),
    JwtModule.register({ secretOrPrivateKey: process.env.JWT_KEY }),
  ],
  controllers: [AuthController],
  providers: [AuthService, HttpStrategy, UserService],
})
export class AuthModule {}
