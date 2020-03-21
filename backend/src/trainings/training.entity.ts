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
  createdDate: Date;

  @Column({ nullable: true })
  modifiedDate: Date;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  pictureLink: string;

  @Column()
  date: Date;

  @Column()
  conferenceLink: string;

  @Column({ nullable: true })
  youtubeVideo: string;

  @ManyToMany(type => Tag, { nullable: true, eager: true })
  @JoinTable()
  tags: Tag[];

  @Column()
  professional: boolean;

  @ManyToOne(type => User, x => x.hostTrainings, { eager: true })
  host: User;

  @ManyToMany(type => User, { nullable: true, eager: true })
  @JoinTable()
  attendees: User[];
}
