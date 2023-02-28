import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EmployeeEntity } from '../employee/employee.entity';

@Entity('Positions')
export class PositionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @OneToMany(() => EmployeeEntity, (employee) => employee.education)
  employees: EmployeeEntity[];
}
