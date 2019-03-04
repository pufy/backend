import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {user} from "./user";
import {place} from "./place";


@Entity("reservation",{schema:"public"})
export class reservation {

   
    @ManyToOne(type=>user, user=>user.reservations,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'fk_user'})
    fk_user:user | null;


   
    @ManyToOne(type=>place, place=>place.reservations,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'fk_place'})
    fk_place:place | null;


    @Column("character varying",{ 
        nullable:true,
        length:80,
        name:"message_user"
        })
    message_user:string | null;
        

    @PrimaryGeneratedColumn({
        type:"bigint", 
        name:"id"
        })
    id:string;
        

    @Column("character varying",{ 
        nullable:true,
        length:80,
        name:"message_place"
        })
    message_place:string | null;
        

    @Column("smallint",{ 
        nullable:true,
        name:"total_person"
        })
    total_person:number | null;
        

    @Column("smallint",{ 
        nullable:true,
        name:"state"
        })
    state:number | null;
        
}
