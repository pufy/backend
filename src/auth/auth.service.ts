import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { user } from "../entities/user";
import { session_spotify } from "../entities/session_spotify";
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
    @InjectRepository(session_spotify)
    private readonly sessionSpotifyRepository: Repository<session_spotify>,
    @InjectRepository(user)
    private readonly userRepository: Repository<user>
    ){}
  
  async login(auth: LoginDto) {
    return await this.userRepository
    .createQueryBuilder("user")
    .select("user.id", "id")
    .addSelect("user.email", "email")
    .addSelect("user.names", "names")
    .addSelect("user.lastnames", "lastnames")
    .where("email = :email and password = :password", { email: auth.correo, password: auth.contrasena })
    .execute();
    
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

  async createSessionSpotify(access_token, refresh_token, fk_place, fk_account_spotify){
    let session = await this.sessionSpotifyRepository.find({ where: { fk_place: fk_place } });
    if(session.length > 0){
      return await this.sessionSpotifyRepository  
      .createQueryBuilder()
      .update()
      .set({ token: access_token, refresh_token: refresh_token, date_register: new Date(),  })
      .where("fk_place = :id", { id: fk_place })
      .execute();
    } else {
      return await this.sessionSpotifyRepository.save({
        date_register: new Date(),
        token: access_token,
        refresh_token: refresh_token,
        fk_place: fk_place,
        fk_account_spotify: fk_account_spotify
      });
    }
    
  }

  async validateUser(token: string): Promise<any> {
    let payload = this.jwtService.decode(token);
    if(payload)
      return await this.userService.validUser(payload);
    return false;
  }
}
