import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';

import { user } from "../entities/user";
import { member } from "../entities/member";
import { checkin } from "../entities/checkin";
import { place } from "../entities/place";
import { place_filter } from "../entities/place_filter";

@Injectable()
export class PlaceService {

  constructor(
    @InjectRepository(user) private readonly userRepository: Repository<user>,
    @InjectRepository(place) private readonly placeRepository: Repository<place>,
    @InjectRepository(member) private readonly memberRepository: Repository<member>,
    @InjectRepository(place_filter) private readonly placeFilterRepository: Repository<place_filter>
    ){
  }

  async checkin(place_id,  user_id){
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();

    let userFind = await this.userRepository.findOne({ id: user_id });
    let placeFind = await this.placeRepository.findOne({ id: place_id });

    let new_member = new member();
    new_member.fk_user = userFind;
    new_member.date_register = new Date();
    new_member.fk_place = placeFind;
    new_member.notify = false;

    let new_checkin = new checkin();
    new_checkin.date = new Date();
    new_checkin.fk_member = new_member;
    
    let memberFind = await this.memberRepository.findOne({ fk_user: user_id, fk_place: place_id });
    
    if(!memberFind){
      await queryRunner.startTransaction();
      try {
        await queryRunner.manager.save(new_member);
        await queryRunner.manager.save(new_checkin);
        await queryRunner.commitTransaction();
        return "OK";
      } catch (err) {
        await queryRunner.rollbackTransaction();
        return "ERROR_TRANSACTION";
      } finally {
        await queryRunner.release();
      }
    } else {
      new_member.id = memberFind.id;
      await queryRunner.manager.save(new_checkin);
      return "OK";
    }
  }

  async getPlacesAround(lat, long, range) {
    return await this.placeRepository
    .createQueryBuilder("place")
    .select("place.id", "id")
    .addSelect("place.name", "name")
    .addSelect("place.color", "color")
    .addSelect("place.photo", "photo")
    .addSelect("place.latitude", "latitude")
    .addSelect("place.longitude", "longitude")
    .addSelect("type_place.type", "type_name")
    .addSelect("type_place.icon", "type_icon")
    .innerJoin("place.fk_type", "type_place")
    .where("earth_box( ll_to_earth(:lat, :long), :range) @> ll_to_earth(place.latitude, place.longitude)", 
    { lat: lat, long: long, range: range })
    .orderBy('earth_distance(ll_to_earth(latitude, longitude), ll_to_earth('+lat+', '+long+'))')
    .execute();
  }

  async getGenres(placeId){
    return await this.placeFilterRepository
    .createQueryBuilder("place_filter")
    .innerJoinAndSelect("place_filter.fk_filter", "filter")
    .where("fk_place = :placeId", { placeId: placeId })
    .execute();
  }
}
