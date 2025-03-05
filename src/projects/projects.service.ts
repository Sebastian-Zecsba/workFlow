import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from '../auth/entities/auth.entity';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Auth) private readonly userRepository: Repository<Auth>,
    @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto, userId: number): Promise<Project> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('Usuario no existe');
    }

    const project = this.projectRepository.create({
      ...createProjectDto,
      created_by: user,
    });

    return this.projectRepository.save(project);
  }

  async findAll(userId: number): Promise<Project[]> {
    return this.projectRepository.find({
      where: { created_by: { id: userId } },
      relations: ['created_by'],
    });
  }

  async findOne(id: number, userId: number): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id, created_by: { id: userId } },
      relations: ['created_by'],
    });

    if (!project) {
      throw new NotFoundException('Proyecto no encontrado o no autorizado');
    }

    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto, userId: number): Promise<Project> {
    const project = await this.findOne(id, userId);
    Object.assign(project, updateProjectDto);
    return this.projectRepository.save(project);
  }

  async remove(id: number, userId: number): Promise<void> {
    const project = await this.findOne(id, userId);
    await this.projectRepository.remove(project);
  }
}