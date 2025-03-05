import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../config/typeorm.config';
import { SeederService } from './seeder.service';
import { Role } from '../role/entities/role.entity';

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true
      }),
      TypeOrmModule.forRootAsync({
        useFactory: typeOrmConfig,
        inject: [ConfigService]
      }),
      TypeOrmModule.forFeature([Role])
    ],
    providers: [SeederService]
})
export class SeederModule {}
