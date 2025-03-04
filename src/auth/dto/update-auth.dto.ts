import { PartialType } from '@nestjs/mapped-types';
import { LoginDTO } from './login-auth-dto';

export class UpdateAuthDto extends PartialType(LoginDTO) {}
