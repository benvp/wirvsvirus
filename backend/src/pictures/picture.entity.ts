import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Picture extends BaseEntity {
  @PrimaryColumn({ length: 36 })
  id: string;

  @Column()
  filename: string;
}
