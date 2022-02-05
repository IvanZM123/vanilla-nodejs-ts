import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "../books/book.model";

@Entity()
export class Page {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ length: 300 })
  body!: string;

  @ManyToOne(() => Book, book => book.pages)
  book!: Book;

  @CreateDateColumn()
  createdAt!: string;

  @CreateDateColumn()
  updatedAt!: string;
}
