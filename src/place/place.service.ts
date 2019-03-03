import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { place } from "../entities/place";

@Injectable()
export class PlaceService {

  constructor(
    @InjectRepository(place)
    private readonly placeRepository: Repository<place>
    ){
  }

  async getPlacesAround(lat, long, range) {
    return await this.placeRepository
    .createQueryBuilder("place")
    .where("earth_box( ll_to_earth(:lat, :long), :range) @> ll_to_earth(place.latitude, place.longitude)", 
    { lat: lat, long: long, range: range })
    .orderBy('earth_distance(ll_to_earth(latitude, longitude), ll_to_earth('+lat+', '+long+'))')
    .execute();
  }
}
