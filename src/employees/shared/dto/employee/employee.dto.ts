import { IsNumber, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class EmployeeDto {
  @Length(1, 50)
  @Transform(({ value }) => value?.trim())
  @IsString()
  name: string;
  @IsNumber()
  positionId: number;
  @IsNumber()
  educationId: number;
}
