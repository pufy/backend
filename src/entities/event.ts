import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {place} from "./place";


@Entity("event",{schema:"public"})
export class event {

    @PrimaryGeneratedColumn({
        type:"bigint", 
        name:"id"
        })
    id:string;
        

   
    @ManyToOne(type=>place, place=>place.events,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'fk_place'})
    fk_place:place | null;


    @Column("character varying",{ 
        nullable:false,
        length:40,
        name:"name"
        })
    name:string;
        

    @Column("character varying",{ 
        nullable:true,
        length:255,
        name:"photo"
        })
    photo:string | null;
        

    @Column("timestamp without time zone",{ 
        nullable:true,
        name:"date_init"
        })
    date_init:Date | null;
        

    @Column("numeric",{ 
        nullable:true,
        precision:255,
        scale:0,
        name:"cover"
        })
    cover:string | null;
        
}
