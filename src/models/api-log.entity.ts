import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class ApiLog extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  data!: string;

  @Column()
  ip!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
