import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { EducationEntity } from '../education/education.entity';
import { BaseEntity } from '../../../../shared/base.entity';
import { PositionEntity } from '../position/position.entity';

@Entity('Employees')
export class EmployeeEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  positionId: number;

  @ManyToOne(() => PositionEntity, (position) => position.employees)
  @JoinColumn({ name: 'positionId' })
  position: PositionEntity;

  @Column()
  educationId: number;

  @ManyToOne(() => EducationEntity, (education) => education.employees)
  @JoinColumn({ name: 'educationId' })
  education: EducationEntity;
}
