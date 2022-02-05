import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Page {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 300 })
  body!: string;

  @CreateDateColumn()
  createdAt!: string;

  @CreateDateColumn()
  updatedAt!: string;
}
