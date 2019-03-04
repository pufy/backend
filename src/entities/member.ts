import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {user} from "./user";
import {place} from "./place";
import {checkin} from "./checkin";


@Entity("member",{schema:"public"})
export class member {

    @PrimaryGeneratedColumn({
        type:"bigint", 
        name:"id"
        })
    id:string;
        

   
    @ManyToOne(type=>user, user=>user.members,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'fk_user'})
    fk_user:user | null;


    @Column("timestamp without time zone",{ 
        nullable:false,
        name:"date_register"
        })
    date_register:Date;
        

   
    @ManyToOne(type=>place, place=>place.members,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'fk_place'})
    fk_place:place | null;


    @Column("boolean",{ 
        nullable:true,
        name:"notify"
        })
    notify:boolean | null;
        

   
    @OneToMany(type=>checkin, checkin=>checkin.fk_member)
    checkins:checkin[];
    
}
