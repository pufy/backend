import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { place } from "../entities/place";
import { place_filter } from "../entities/place_filter";

@Injectable()
export class PlaceService {

  constructor(
    @InjectRepository(place) private readonly placeRepository: Repository<place>,
    @InjectRepository(place_filter) private readonly placeFilterRepository: Repository<place_filter>
    ){
  }

  async getPlacesAround(lat, long, range) {
    return await this.placeRepository
    .createQueryBuilder("place")
    .select("place.id", "id")
    .addSelect("place.name", "name")
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
