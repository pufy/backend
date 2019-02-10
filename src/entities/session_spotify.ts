import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {place} from "./place";
import {account_spotify} from "./account_spotify";


@Entity("session_spotify",{schema:"public"})
export class session_spotify {

    @PrimaryGeneratedColumn({
        type:"bigint", 
        name:"id"
        })
    id:string;
        

   
    @ManyToOne(type=>place, place=>place.session_spotifys,{ primary:true, nullable:false,onDelete: 'CASCADE',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'fk_place'})
    fk_place:place | null;


   
    @ManyToOne(type=>account_spotify, account_spotify=>account_spotify.session_spotifys,{ primary:true, nullable:false,onDelete: 'CASCADE',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'fk_account_spotify'})
    fk_account_spotify:account_spotify | null;


    @Column("timestamp without time zone",{ 
        nullable:true,
        name:"date_register"
        })
    date_register:Date | null;
        

    @Column("character varying",{ 
        nullable:true,
        length:255,
        name:"token"
        })
    token:string | null;
        

    @Column("character varying",{ 
        nullable:true,
        length:255,
        name:"refresh_token"
        })
    refresh_token:string | null;
        
}
