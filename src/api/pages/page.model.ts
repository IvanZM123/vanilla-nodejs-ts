import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "../books/book.model";

@Entity()
export class Page {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 300 })
  body!: string;

  @OneToMany(type => Book, book => book.id)
  bookId!: string;

  @CreateDateColumn()
  createdAt!: string;

  @CreateDateColumn()
  updatedAt!: string;
}
