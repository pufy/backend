import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {catalog} from "./catalog";


@Entity("catalog_category",{schema:"public"})
export class catalog_category {

    @PrimaryGeneratedColumn({
        type:"smallint", 
        name:"id"
        })
    id:number;
        

    @Column("character varying",{ 
        nullable:false,
        length:40,
        name:"name"
        })
    name:string;
        

   
    @OneToMany(type=>catalog, catalog=>catalog.fk_category,{ onDelete: 'CASCADE' ,onUpdate: 'CASCADE' })
    catalogs:catalog[];
    
}
