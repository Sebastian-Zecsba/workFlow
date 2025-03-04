import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectAssignmentsService } from './project_assignments.service';
import { CreateProjectAssignmentDto } from './dto/create-project_assignment.dto';
import { UpdateProjectAssignmentDto } from './dto/update-project_assignment.dto';

@Controller('project-assignments')
export class ProjectAssignmentsController {
  constructor(private readonly projectAssignmentsService: ProjectAssignmentsService) {}

  @Post()
  create(@Body() createProjectAssignmentDto: CreateProjectAssignmentDto) {
    return this.projectAssignmentsService.create(createProjectAssignmentDto);
  }

  @Get()
  findAll() {
    return this.projectAssignmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectAssignmentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectAssignmentDto: UpdateProjectAssignmentDto) {
    return this.projectAssignmentsService.update(+id, updateProjectAssignmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectAssignmentsService.remove(+id);
  }
}
