import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {place_filter} from "./place_filter";


@Entity("filter",{schema:"public"})
export class filter {

    @PrimaryGeneratedColumn({
        type:"smallint", 
        name:"id"
        })
    id:number;
        

    @Column("character varying",{ 
        nullable:false,
        length:50,
        name:"name"
        })
    name:string;
        

   
    @OneToMany(type=>place_filter, place_filter=>place_filter.fk_filter,{ onDelete: 'CASCADE' ,onUpdate: 'CASCADE' })
    place_filters:place_filter[];
    
}
