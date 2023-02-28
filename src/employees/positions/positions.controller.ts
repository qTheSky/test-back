import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PositionsService } from './positions.service';
import { PositionEntity } from '../shared/entities/position/position.entity';
import { PositionDto } from '../shared/dto/position/position.dto';

@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Post()
  createPosition(@Body() dto: PositionDto): Promise<PositionEntity> {
    return this.positionsService.create(dto.title);
  }

  @Delete(':id')
  deletePosition(@Param('id') id: string): Promise<void> {
    return this.positionsService.delete(+id);
  }

  @Put(':id')
  updatePosition(
    @Param('id') id: string,
    @Body() dto: PositionDto,
  ): Promise<PositionEntity> {
    return this.positionsService.update(+id, dto.title);
  }

  @Get()
  findAllPositions(): Promise<PositionEntity[]> {
    return this.positionsService.findAll();
  }
}
