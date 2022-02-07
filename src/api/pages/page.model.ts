import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Book } from '../books/book.model'

@Entity()
export class Page {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'integer' })
  pageNumber!: number;

  @Column({ length: 300 })
  body!: string;

  @ManyToOne(() => Book, book => book.pages)
  book!: Book;

  @CreateDateColumn()
  createdAt!: string;

  @CreateDateColumn()
  updatedAt!: string;
}
