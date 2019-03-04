import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {place} from "./place";


@Entity("playlist",{schema:"public"})
export class playlist {

    @Column("timestamp without time zone",{ 
        nullable:false,
        name:"date_register"
        })
    date_register:Date;
        

   
    @ManyToOne(type=>place, place=>place.playlists,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'fk_place'})
    fk_place:place | null;


    @Column("character varying",{ 
        nullable:false,
        length:255,
        name:"id_playlist"
        })
    id_playlist:string;
        

    @PrimaryGeneratedColumn({
        type:"integer", 
        name:"id"
        })
    id:number;
        
}
