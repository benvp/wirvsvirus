import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Tag } from '../tags/tag.entity';
import { User } from '../auth/user.entity';

@Entity()
export class Training extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  date: Date;

  @Column()
  createdDate: Date;

  @Column({ nullable: true })
  videoLink: string;

  @ManyToOne(type => User, x => x.trainings, { eager: false })
  user: User;

  @ManyToMany(type => Tag, { nullable: true })
  @JoinTable()
  tags: Tag[];
}
