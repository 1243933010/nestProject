import { Entity,Column,PrimaryGeneratedColumn,Generated,CreateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number

    

    @Column()
    username :string

    @Column()
    password :string

    @Column()
    role:string

    @Column()
    avatar:string
    
    // @Generated('uuid')
    // uuid:string

    // @CreateDateColumn({type:"timestamp"})
    // createTime:Date
}
