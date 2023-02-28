import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { PositionsController } from './positions/positions.controller';
import { EducationsController } from './educations/educations.controller';
import { EducationsService } from './educations/educations.service';
import { PositionsService } from './positions/positions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from './shared/entities/employee/employee.entity';
import { EducationEntity } from './shared/entities/education/education.entity';
import { PositionEntity } from './shared/entities/position/position.entity';
import { ViewModelMapper } from '../shared/viewModelMapper';

@Module({
  controllers: [EmployeesController, PositionsController, EducationsController],
  providers: [
    EmployeesService,
    EducationsService,
    PositionsService,
    ViewModelMapper,
  ],
  imports: [
    TypeOrmModule.forFeature([EmployeeEntity, EducationEntity, PositionEntity]),
  ],
})
export class EmployeesModule {}
