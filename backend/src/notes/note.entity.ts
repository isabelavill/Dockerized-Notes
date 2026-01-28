import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity('notes')
export class Note{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column({type: 'text'})
    content: string

    @CreateDateColumn()
    createdAt: Date
}