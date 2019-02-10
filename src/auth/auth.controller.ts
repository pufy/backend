import { Controller, Get, Post, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import Response from '../common/response';
import { SignupDto } from './dto/signup.dto';
const uniqid = require('uniqid');

@ApiUseTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService) {
    }

  @Post()
  async login(@Body() auth: LoginDto) {
    let response = await this.authService.login(auth)
    
    if(response.length > 0) 
      return Response
      .status({ success: 'OK' })
      .payload(this.jwtService.sign(response[0]))
    else
      return Response
      .status({ error: 'USER_INVALID' })
      .message(`Correo electrónico o contraseña invalida`)
      .payload();
  }

  @Post('signup')
  async signup(@Body() signup: SignupDto) {
    let code_confirm = uniqid();
    let response = await this.authService.signup(signup, code_confirm)
    
    if(response == 'OK'){
      return Response.status({ success: response }).payload();
    } else
      return Response.status({ error: response })
        .message((response == 'DUPLICATE_EMAIL')? 'Este correo ya existe' : `La transacción fallo`)
        .payload();
  }
}
