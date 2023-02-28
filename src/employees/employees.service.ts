import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeEntity } from './shared/entities/employee/employee.entity';
import { EducationsService } from './educations/educations.service';
import { PositionsService } from './positions/positions.service';
import { EmployeeDto } from './shared/dto/employee/employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly repo: Repository<EmployeeEntity>,
    private educationsService: EducationsService,
    private positionsService: PositionsService,
  ) {}

  async create(dto: EmployeeDto): Promise<EmployeeEntity> {
    const newEmployee = new EmployeeEntity();
    const education = await this.educationsService.findByIdOrThrow(
      dto.educationId,
    );
    const position = await this.positionsService.findByIdOrThrow(
      dto.positionId,
    );
    newEmployee.name = dto.name;
    newEmployee.education = education;
    newEmployee.position = position;
    return this.repo.save(newEmployee);
  }

  async update(id: number, dto: EmployeeDto): Promise<EmployeeEntity> {
    const employee = await this.findByIdOrThrow(id);
    const education = await this.educationsService.findByIdOrThrow(
      dto.educationId,
    );
    const position = await this.positionsService.findByIdOrThrow(
      dto.positionId,
    );
    employee.name = dto.name;
    employee.education = education;
    employee.position = position;
    return this.repo.save(employee);
  }

  async delete(id: number): Promise<void> {
    const employee = await this.findByIdOrThrow(id);
    await this.repo.delete({ id: employee.id });
  }

  async findAll(): Promise<EmployeeEntity[]> {
    return this.repo.find({
      relations: { position: true, education: true },
      order: { createdAt: 'desc' },
    });
  }

  async findByIdOrThrow(id: number): Promise<EmployeeEntity> {
    const employee = await this.repo.findOneBy({ id });
    if (!employee) throw new NotFoundException(`Employee with ${id} not found`);
    return employee;
  }
}
