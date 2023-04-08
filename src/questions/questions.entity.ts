import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

import { Difficulty } from '../enums/difficulty';
import { Status } from './../enums/status';

// Never instantiated and only used by TypeORM
@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    type: 'text',
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  date: string;

  @Column({
    type: 'longtext',
  })
  description: string;

  @Column({
    type: 'enum',
    enum: Difficulty,
    default: Difficulty.easy,
  })
  difficulty: Difficulty;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.todo,
  })
  status: Status;
}
