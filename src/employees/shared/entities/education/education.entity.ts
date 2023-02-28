import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EmployeeEntity } from '../employee/employee.entity';

@Entity('Educations')
export class EducationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @OneToMany(() => EmployeeEntity, (employee) => employee.education)
  employees: EmployeeEntity[];
}
