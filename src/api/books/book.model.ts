import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Page } from "../pages/page.model";

@Entity()
export class Book {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ length: 50 })
  title!: string;

  @Column({ length: 25 })
  author!: string;

  @Column({ length: 25 })
  category!: string;

  @OneToMany(() => Page, page => page.book)
  pages!: Page[];

  @CreateDateColumn()
  createdAt!: string;

  @CreateDateColumn()
  updatedAt!: string;
}
