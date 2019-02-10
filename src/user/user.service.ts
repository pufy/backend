import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { user } from "../entities/user";

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(user)
    private readonly userRepository: Repository<user>,
    private readonly connection: Connection
    ){
  }

  async findAll(): Promise<user[]> {
    return await this.userRepository.find();
  }

  async validUser(jwtPayload: any){
    let responseQuery = await this.connection.query(`
      select
        array_to_json(ARRAY_AGG(r.nombre)) as roles
      from usuario u
      inner join usuario_rol ur on ur.fk_usuario = u.id
      inner join rol r on r.id = ur.fk_rol
      where u.id = ${ jwtPayload.id }
      group by u.id;
    `);
    
    if(responseQuery.length > 0){
      jwtPayload.roles = responseQuery[0].roles;
      return jwtPayload;
    }
    return false;
  }
}
