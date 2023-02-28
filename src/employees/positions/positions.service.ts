import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PositionEntity } from '../shared/entities/position/position.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PositionsService {
  constructor(
    @InjectRepository(PositionEntity)
    private readonly repo: Repository<PositionEntity>,
  ) {}

  async create(title: string): Promise<PositionEntity> {
    const newPosition = new PositionEntity();
    newPosition.title = title;
    return await this.repo.save(newPosition);
  }

  async findByIdOrThrow(id: number): Promise<PositionEntity> {
    const position = await this.repo.findOne({
      where: { id },
    });
    if (!position) {
      throw new NotFoundException(`Position with id ${id} wasn't found`);
    }
    return position;
  }

  async delete(id: number): Promise<void> {
    const position = await this.findByIdOrThrow(id);
    await this.repo.delete({ id: position.id });
  }

  async update(id: number, newTitle: string): Promise<PositionEntity> {
    const position = await this.findByIdOrThrow(id);
    position.title = newTitle;
    return await this.repo.save(position);
  }

  async findAll(): Promise<PositionEntity[]> {
    return this.repo.find({
      order: { id: 'desc' },
    });
  }
}
