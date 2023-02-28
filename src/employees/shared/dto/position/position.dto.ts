import { IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class PositionDto {
  @Length(3, 100)
  @Transform(({ value }) => value?.trim())
  @IsString()
  title: string;
}
