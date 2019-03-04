import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("playlist_defect",{schema:"public"})
export class playlist_defect {

    @Column("character varying",{ 
        nullable:false,
        length:100,
        name:"name"
        })
    name:string;
        

    @Column("character varying",{ 
        nullable:false,
        length:255,
        name:"id_playlist"
        })
    id_playlist:string;
        

    @PrimaryGeneratedColumn({
        type:"smallint", 
        name:"id"
        })
    id:number;
        
}
