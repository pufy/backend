import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly connection: Connection,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    ){
  }
  
  async login(auth: LoginDto) {
    return await this.connection.query(`
      select 
        us.id,
        us.correo,
        p.id as persona_id,
        p.genero,
        p.nombres,
        p.apellidos,
        p.foto
      from usuario us
      inner join persona p on p.id = us.fk_persona
      inner join usuario_rol ur on ur.fk_usuario = us.id
      inner join rol r on r.id = ur.fk_rol
      where us.correo = '${auth.correo}' and us.contrasena = '${auth.contrasena}' and us.estado = 1
      GROUP BY us.id, p.id
    `);	
  }

  async signup(user: SignupDto, code_confirm: string){
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {

        await queryRunner.query(`
          INSERT INTO persona 
            (nombres, apellidos, genero, fk_nacionalidad, celular, fecha_nacimiento)
          VALUES 
            ('${user.nombres}', '${user.apellidos}', '${user.genero}', ${user.fk_nacionalidad}, '${user.celular}', '${user.fecha_nacimiento}')
        `);
        
        let newPersonId = await queryRunner.query(`SELECT currval(pg_get_serial_sequence('persona','id')) as id;`);

        await queryRunner.commitTransaction();
        return "OK";
    } catch (err) {
      await queryRunner.rollbackTransaction();
      if(err.routine == "_bt_check_unique")
        return "DUPLICATE_EMAIL";
      else
        return "FAILED_TRANSACTION"
    } finally {
        await queryRunner.release();
    }    
  }

  async validateUser(token: string): Promise<any> {
    let payload = this.jwtService.decode(token);
    if(payload)
      return await this.userService.validUser(payload);
    return false;
  }
}
