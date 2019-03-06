import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {rol} from "./rol";
import {member} from "./member";
import {place} from "./place";
import {reservation} from "./reservation";


@Entity("user",{schema:"public"})
export class user {

    @Column("character varying",{ 
        nullable:true,
        length:15,
        name:"telephone"
        })
    telephone:string | null;
        

    @Column("character varying",{ 
        nullable:false,
        length:60,
        name:"names"
        })
    names:string;
        

    @Column("character varying",{ 
        nullable:true,
        length:100,
        name:"password"
        })
    password:string | null;
        

   
    @ManyToOne(type=>rol, rol=>rol.users,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'fk_rol'})
    fk_rol:rol | null;


    @Column("character varying",{ 
        nullable:false,
        length:60,
        name:"lastnames"
        })
    lastnames:string;
        

    @PrimaryGeneratedColumn({
        type:"bigint", 
        name:"id"
        })
    id:string;
        

    @Column("character varying",{ 
        nullable:false,
        length:255,
        name:"email"
        })
    email:string;
        

    @Column("character varying",{ 
        nullable:true,
        length:255,
        name:"code_confirm"
        })
    code_confirm:string | null;
        

    @Column("timestamp without time zone",{ 
        nullable:false,
        name:"date_register"
        })
    date_register:Date;
        

   
    @OneToMany(type=>member, member=>member.fk_user,{ onDelete: 'CASCADE' ,onUpdate: 'CASCADE' })
    members:member[];
    

   
    @OneToMany(type=>place, place=>place.fk_representative,{ onDelete: 'CASCADE' ,onUpdate: 'CASCADE' })
    places:place[];
    

   
    @OneToMany(type=>reservation, reservation=>reservation.fk_user,{ onDelete: 'CASCADE' ,onUpdate: 'CASCADE' })
    reservations:reservation[];
    
}
