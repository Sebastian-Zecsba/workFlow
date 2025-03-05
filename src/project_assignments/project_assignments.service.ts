import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectAssignmentDto } from './dto/create-project_assignment.dto';
import { UpdateProjectAssignmentDto } from './dto/update-project_assignment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from '../auth/entities/auth.entity';
import { Repository } from 'typeorm';
import { Project } from '../projects/entities/project.entity';
import { Role } from '../role/entities/role.entity';
import { ProjectAssignment } from './entities/project_assignment.entity';

@Injectable()
export class ProjectAssignmentsService {

  constructor(
    @InjectRepository(Auth) private readonly userRepository : Repository<Auth>,
    @InjectRepository(Project) private readonly projectRepository : Repository<Project>,
    @InjectRepository(Role) private readonly roleRepository : Repository<Role>,
    @InjectRepository(ProjectAssignment) private readonly assigmentRepository : Repository<ProjectAssignment>,
  ){}

  async create(createProjectAssignmentDto: CreateProjectAssignmentDto) {
    const { project: projectId, user: userId, role: roleId } = createProjectAssignmentDto

    const user = await this.userRepository.findOneBy({id: userId})
    if(!user){
      throw new NotFoundException({message: 'Usuario no encontrado'})
    }

    const project = await this.projectRepository.findOneBy({id: projectId})
    if(!project){
      throw new NotFoundException({message: 'Proyecto no encontrado'})
    }

    const role = await this.roleRepository.findOneBy({id: roleId})
    if(!role){
      throw new NotFoundException({message: 'Role no encontrado'})
    }

    const assignment = this.assigmentRepository.create({
      project: project,
      user: user,
      role: role
    })

    const savedAssignment = await this.assigmentRepository.save(assignment);

    return savedAssignment; 
  }

  async getById(id: number) {
    const project = await this.projectRepository.findOne({
      where: { id },
    });
  
    if (!project) {
      throw new NotFoundException({ message: 'Proyecto no encontrado' });
    }
  
    const assignments = await this.assigmentRepository.find({
      where: { project: { id } },
      relations: ['user', 'role'],
    });
  
    if (!assignments || assignments.length === 0) {
      throw new NotFoundException({ message: 'No se encontraron asignaciones para este proyecto' });
    }

    const assignmentsDetails = assignments.map(assignment => ({
      user: {
        id: assignment.user.id,
        username: assignment.user.username,
        email: assignment.user.email,
        first_name: assignment.user.first_name,
        last_name: assignment.user.last_name,
        created_at: assignment.user.created_at,
        updated_at: assignment.user.updated_at,
      },
      role: {
        id: assignment.role.id,
        name: assignment.role.name,
      },
    }));
  
    return {
      project: {
        id: project.id,
        name: project.name,
        description: project.description,
        start_date: project.start_date,
        end_date: project.end_date,
        created_by: project.created_by,
        created_at: project.created_at,
        updated_at: project.updated_at,
      },
      assignments: assignmentsDetails,
    };
  }
}
