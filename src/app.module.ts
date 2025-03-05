import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { ProjectAssignmentsModule } from './project_assignments/project_assignments.module';
import { RoleModule } from './role/role.module';
import { SeederModule } from './seeder/seeder.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),
  TypeOrmModule.forRootAsync({
    useFactory: typeOrmConfig,
    inject: [ConfigService]
  }),
  AuthModule,
  ProjectsModule,
  ProjectAssignmentsModule,
  RoleModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
