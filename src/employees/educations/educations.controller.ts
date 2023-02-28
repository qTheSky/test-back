import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EducationsService } from './educations.service';
import { PositionEntity } from '../shared/entities/position/position.entity';
import { EducationDto } from '../shared/dto/education/education.dto';

@Controller('educations')
export class EducationsController {
  constructor(private readonly educationsService: EducationsService) {}

  @Post()
  createEducation(@Body() dto: EducationDto): Promise<PositionEntity> {
    return this.educationsService.create(dto.title);
  }

  @Delete(':id')
  deleteEducation(@Param('id') id: string): Promise<void> {
    return this.educationsService.delete(+id);
  }

  @Put(':id')
  updateEducation(
    @Param('id') id: string,
    @Body() dto: EducationDto,
  ): Promise<PositionEntity> {
    return this.educationsService.update(+id, dto.title);
  }

  @Get()
  findAllEducations(): Promise<PositionEntity[]> {
    return this.educationsService.findAll();
  }
}
