import { Injectable } from '@nestjs/common';
import { CreateProjectAssignmentDto } from './dto/create-project_assignment.dto';
import { UpdateProjectAssignmentDto } from './dto/update-project_assignment.dto';

@Injectable()
export class ProjectAssignmentsService {
  create(createProjectAssignmentDto: CreateProjectAssignmentDto) {
    return 'This action adds a new projectAssignment';
  }

  findAll() {
    return `This action returns all projectAssignments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} projectAssignment`;
  }

  update(id: number, updateProjectAssignmentDto: UpdateProjectAssignmentDto) {
    return `This action updates a #${id} projectAssignment`;
  }

  remove(id: number) {
    return `This action removes a #${id} projectAssignment`;
  }
}
