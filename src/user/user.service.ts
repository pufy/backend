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
    let response = await this.userRepository
    .createQueryBuilder("user")
    .select("user.id", "id")
    .addSelect("user.names", "names")
    .addSelect("user.lastnames", "lastnames")
    .addSelect("user.email", "email")
    .where("user.id = :user_id", { user_id: jwtPayload.id })
    .groupBy("user.id")
    .execute();
    
    if(response.length > 0){
      //jwtPayload.roles = response[0].roles;
      return jwtPayload;
    }
    return false;
  }
}
