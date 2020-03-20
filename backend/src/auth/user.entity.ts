import * as bcrypt from 'bcrypt';

import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Role } from './roles.enum';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 36 })
  username: string;

  @Column()
  displayName: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({ nullable: true })
  role: Role;

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
