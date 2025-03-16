import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationsController } from './organizations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';
import { Plan } from 'src/plan/entities/plan.entity';
import { Invitation } from 'src/invitations/entities/invitation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Organization, Plan, Invitation])],
  controllers: [OrganizationsController],
  providers: [OrganizationsService],
})
export class OrganizationsModule {}
