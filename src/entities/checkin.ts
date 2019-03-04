import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {member} from "./member";


@Entity("checkin",{schema:"public"})
export class checkin {

    @Column("timestamp without time zone",{ 
        nullable:false,
        name:"date"
        })
    date:Date;
        

    @PrimaryGeneratedColumn({
        type:"bigint", 
        name:"id"
        })
    id:string;
        

   
    @ManyToOne(type=>member, member=>member.checkins,{  nullable:false, })
    @JoinColumn({ name:'fk_member'})
    fk_member:member | null;

}
