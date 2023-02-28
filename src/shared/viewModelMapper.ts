import { EmployeeEntity } from '../employees/shared/entities/employee/employee.entity';
import { EmployeeViewModel } from '../employees/shared/models/EmployeeViewModel';

export class ViewModelMapper {
  getEmployeeViewModel(employee: EmployeeEntity): EmployeeViewModel {
    return {
      id: employee.id,
      name: employee.name,
      info: {
        education: {
          title: employee.education.title,
          id: employee.educationId,
        },
        position: { title: employee.position.title, id: employee.positionId },
      },
    };
  }
}
