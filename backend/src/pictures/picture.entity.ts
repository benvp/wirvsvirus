import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Picture extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  filename: string;
}
