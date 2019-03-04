import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {place} from "./place";
import {genre} from "./genre";


@Entity("place_filter",{schema:"public"})
export class place_filter {

    @PrimaryGeneratedColumn({
        type:"bigint", 
        name:"id"
        })
    id:string;
        

   
    @ManyToOne(type=>place, place=>place.place_filters,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'fk_place'})
    fk_place:place | null;


   
    @ManyToOne(type=>genre, filter=>filter.place_filters,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'fk_filter'})
    fk_filter:genre | null;

}
