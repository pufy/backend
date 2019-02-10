import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {user} from "./user";


@Entity("rol",{schema:"public"})
export class rol {

    @PrimaryGeneratedColumn({
        type:"smallint", 
        name:"id"
        })
    id:number;
        

    @Column("character varying",{ 
        nullable:false,
        length:20,
        name:"name"
        })
    name:string;
        

   
    @OneToMany(type=>user, user=>user.fk_rol,{ onDelete: 'CASCADE' ,onUpdate: 'CASCADE' })
    users:user[];
    
}
