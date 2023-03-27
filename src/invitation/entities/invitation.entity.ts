import { Entity,Column,PrimaryGeneratedColumn,Generated,CreateDateColumn,OneToMany } from "typeorm";
@Entity()
export class Invitation {
    @PrimaryGeneratedColumn()
    id:number

    @Generated('uuid')
    uuid:string

    @Column()
    userId:number

    @Column()
    title:string

    @Column()
    content:string

}
