import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProjectAssignmentsService } from './project_assignments.service';
import { CreateProjectAssignmentDto } from './dto/create-project_assignment.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('project-assignments')
export class ProjectAssignmentsController {
  constructor(private readonly projectAssignmentsService: ProjectAssignmentsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createProjectAssignmentDto: CreateProjectAssignmentDto){

    return this.projectAssignmentsService.create(createProjectAssignmentDto) ;
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getById(@Param('id') id: string){
    return this.projectAssignmentsService.getById(+id)
  }
}
