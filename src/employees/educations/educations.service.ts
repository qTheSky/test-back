import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EducationEntity } from '../shared/entities/education/education.entity';

@Injectable()
export class EducationsService {
  constructor(
    @InjectRepository(EducationEntity)
    private readonly repo: Repository<EducationEntity>,
  ) {}

  async create(title: string): Promise<EducationEntity> {
    const newEducation = new EducationEntity();
    newEducation.title = title;
    return await this.repo.save(newEducation);
  }

  async findByIdOrThrow(id: number): Promise<EducationEntity> {
    const education = await this.repo.findOneBy({ id });
    if (!education) {
      throw new NotFoundException(`Education with id ${id} wasn't found`);
    }
    return education;
  }

  async delete(id: number): Promise<void> {
    const education = await this.findByIdOrThrow(id);
    await this.repo.delete({ id: education.id });
  }

  async update(id: number, newTitle: string): Promise<EducationEntity> {
    const education = await this.findByIdOrThrow(id);
    education.title = newTitle;
    return await this.repo.save(education);
  }

  async findAll(): Promise<EducationEntity[]> {
    return this.repo.find({
      order: { id: 'desc' },
    });
  }
}
