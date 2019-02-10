import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { user } from '../entities/user';
import { rol } from '../entities/rol';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([user, rol])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
