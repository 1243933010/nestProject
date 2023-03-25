import { Entity,Column,PrimaryGeneratedColumn,Generated,CreateDateColumn,OneToMany,UpdateDateColumn } from "typeorm";
@Entity()
export class Invitation {
    @PrimaryGeneratedColumn()
    id:number

    @Generated('uuid')
    uuid:number

    @Column()
    userId:number

    @Column()
    title:string

    @Column()
    content:string
    
    @CreateDateColumn()
    createTime:string

    @UpdateDateColumn()
    updateTime:string

}
