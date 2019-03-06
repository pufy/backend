import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {catalog_category} from "./catalog_category";
import {place} from "./place";


@Entity("catalog",{schema:"public"})
export class catalog {

    @PrimaryGeneratedColumn({
        type:"bigint", 
        name:"id"
        })
    id:string;
        

    @Column("character varying",{ 
        nullable:true,
        length:100,
        name:"description"
        })
    description:string | null;
        

   
    @ManyToOne(type=>catalog_category, catalog_category=>catalog_category.catalogs,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'fk_category'})
    fk_category:catalog_category | null;


    @Column("character varying",{ 
        nullable:true,
        length:255,
        name:"photo"
        })
    photo:string | null;
        

   
    @ManyToOne(type=>place, place=>place.catalogs,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'fk_place'})
    fk_place:place | null;


    @Column("timestamp without time zone",{ 
        nullable:false,
        name:"date_register"
        })
    date_register:Date;
        

    @Column("numeric",{ 
        nullable:true,
        precision:10,
        scale:2,
        name:"price"
        })
    price:string | null;
        

    @Column("character varying",{ 
        nullable:false,
        length:60,
        name:"name"
        })
    name:string;
        
}
