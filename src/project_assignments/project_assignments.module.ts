import { Module } from '@nestjs/common';
import { ProjectAssignmentsService } from './project_assignments.service';
import { ProjectAssignmentsController } from './project_assignments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from '../auth/entities/auth.entity';
import { Project } from '../projects/entities/project.entity';
import { Role } from '../role/entities/role.entity';
import { ProjectAssignment } from './entities/project_assignment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Auth, Project, Role, ProjectAssignment])],
  controllers: [ProjectAssignmentsController],
  providers: [ProjectAssignmentsService],
})
export class ProjectAssignmentsModule {}
