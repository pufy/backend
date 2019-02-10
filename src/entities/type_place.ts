import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {place} from "./place";


@Entity("type_place",{schema:"public"})
export class type_place {

    @PrimaryGeneratedColumn({
        type:"integer", 
        name:"id"
        })
    id:number;
        

    @Column("character varying",{ 
        nullable:false,
        length:40,
        name:"type"
        })
    type:string;
        

    @Column("character varying",{ 
        nullable:true,
        length:255,
        name:"icon"
        })
    icon:string | null;
        

   
    @OneToMany(type=>place, place=>place.fk_type,{ onDelete: 'CASCADE' ,onUpdate: 'CASCADE' })
    places:place[];
    
}
