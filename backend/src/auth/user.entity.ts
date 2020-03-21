import * as bcrypt from 'bcrypt';

import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Role } from './roles.enum';
import { Training } from '../trainings/training.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 36 })
  username: string;

  @Column()
  displayName: string;

  @Column({ select: false })
  password: string;

  @Column({ select: false })
  salt: string;

  @Column({ nullable: true })
  role: Role;

  @Column()
  profilePicture: string;

  @OneToMany(type => Training, x => x.host, { eager: false })
  hostTrainings: Training[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}

export interface BaseUser {
  username: string;
  id: string;
  role: Role;
  displayName: string;
}
