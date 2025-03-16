import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { PlanModule } from './plan/plan.module';
import { InvitationsModule } from './invitations/invitations.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),
  TypeOrmModule.forRootAsync({
    useFactory: typeOrmConfig,
    inject: [ConfigService]
  }),
  AuthModule,
  OrganizationsModule,
  PlanModule,
  InvitationsModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
