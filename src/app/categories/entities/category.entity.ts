import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 200 })
    name: string;
    
    @Column("text")
    description: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;
}
