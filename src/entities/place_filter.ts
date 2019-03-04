import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {genre} from "./genre";
import {place} from "./place";


@Entity("place_filter",{schema:"public"})
export class place_filter {

   
    @ManyToOne(type=>genre, genre=>genre.place_filters,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'fk_filter'})
    fk_filter:genre | null;


    @PrimaryGeneratedColumn({
        type:"bigint", 
        name:"id"
        })
    id:string;
        

   
    @ManyToOne(type=>place, place=>place.place_filters,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'fk_place'})
    fk_place:place | null;

}
