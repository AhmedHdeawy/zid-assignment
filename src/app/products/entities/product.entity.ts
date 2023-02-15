import { Entity, Column, Unique, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 200, unique: true })
    name: string;
    
    @Column("text")
    description: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
