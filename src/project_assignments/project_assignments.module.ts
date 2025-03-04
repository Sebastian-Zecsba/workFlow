import { Module } from '@nestjs/common';
import { ProjectAssignmentsService } from './project_assignments.service';
import { ProjectAssignmentsController } from './project_assignments.controller';

@Module({
  controllers: [ProjectAssignmentsController],
  providers: [ProjectAssignmentsService],
})
export class ProjectAssignmentsModule {}
