import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeeDto } from './shared/dto/employee/employee.dto';
import { ViewModelMapper } from '../shared/viewModelMapper';
import { EmployeeViewModel } from './shared/models/EmployeeViewModel';

@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
    private viewModelMapper: ViewModelMapper,
  ) {}

  @Get()
  async findAllEmployees(): Promise<EmployeeViewModel[]> {
    const employees = await this.employeesService.findAll();
    return employees.map(this.viewModelMapper.getEmployeeViewModel);
  }

  @Post()
  async createEmployee(@Body() dto: EmployeeDto): Promise<EmployeeViewModel> {
    const newEmployee = await this.employeesService.create(dto);
    return this.viewModelMapper.getEmployeeViewModel(newEmployee);
  }

  @Put(':id')
  async updateEmployee(
    @Param('id') id: string,
    @Body() dto: EmployeeDto,
  ): Promise<EmployeeViewModel> {
    const updatedEmployee = await this.employeesService.update(+id, dto);
    return this.viewModelMapper.getEmployeeViewModel(updatedEmployee);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteEmployee(@Param('id') id: string): Promise<void> {
    return this.employeesService.delete(+id);
  }
}
