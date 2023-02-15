import { Category } from 'src/app/categories/entities/category.entity';
import { Entity, Column, DeleteDateColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column("varchar", { length: 200, unique: true })
    name: string;

    @Column("decimal", { precision: 6, scale: 2 })
    price: number;
    
    @Column("text")
    description: string;

    @Column({ unsigned: true })
    category_id: number;

    @ManyToOne(() => Category, category => category.id)
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at?: Date;
}
