import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {session_spotify} from "./session_spotify";


@Entity("account_spotify",{schema:"public"})
export class account_spotify {

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
        nullable:false,
        length:255,
        name:"password"
        })
    password:string;
        

    @Column("timestamp without time zone",{ 
        nullable:false,
        name:"date_register"
        })
    date_register:Date;
        

   
    @OneToMany(type=>session_spotify, session_spotify=>session_spotify.fk_account_spotify,{ onDelete: 'CASCADE' ,onUpdate: 'CASCADE' })
    session_spotifys:session_spotify[];
    
}
