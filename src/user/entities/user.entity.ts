import { Entity,Column,PrimaryGeneratedColumn,Generated,CreateDateColumn } from "typeorm";
export class User {
    @PrimaryGeneratedColumn()
    id:number

    

    @Column()
    username :string

    @Column()
    password :string

    // @Generated('uuid')
    // uuid:string

    // @CreateDateColumn({type:"timestamp"})
    // createTime:Date
}
