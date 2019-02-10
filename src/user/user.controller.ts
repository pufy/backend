import { Controller, Get, Param, UseGuards, Req, HttpStatus, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags } from '@nestjs/swagger';

import Response from '../common/response';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { UserService } from './user.service';

@ApiUseTags('Usuarios')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService) {}

  @Get('all')
  async getAll(@Req() request) {
    return await this.userService.findAll();
  }
}

