import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv'
import { SeederModule } from './seeder/seeder.module';
import { SeederService } from './seeder/seeder.service';
dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(SeederModule);
    const seeder = app.get(SeederService)
    await seeder.seed()
    await app.close();
}
bootstrap();
