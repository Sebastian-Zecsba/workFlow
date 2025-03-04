import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from './dto/login-auth-dto';
import { RegisterAuthDTO } from './dto/register-auth-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private readonly authRepository: Repository<Auth>,
    private readonly jwtService: JwtService

  ){}

  async login(loginDto: LoginDTO) {
    const { username, password } = loginDto;

    const user = await this.authRepository.findOneBy({ username });
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  async register(registerDTO: RegisterAuthDTO) {
    const { email, username, password, ...props } = registerDTO;
  
    const findEmail = await this.authRepository.findBy({ email: email });
    if (findEmail.length > 0) {
      throw new BadRequestException('Correo ya existe');
    }
  
    const findUsername = await this.authRepository.findBy({ username: username });
    if (findUsername.length > 0) {
      throw new BadRequestException('Usuario ya existe');
    }
    
    const passwordHashed = await bcrypt.hash(password, 10)
    const newUser = this.authRepository.create({
      email,
      username,
      password: passwordHashed,
      ...props,
    });
  
    return await this.authRepository.save(newUser);;
  }

  async getProfile(userId: number) {
    const user = await this.authRepository.findOneBy({ id: userId });
    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }
    // Elimina el password antes de devolverlo
    const { password, ...userData } = user;
    return userData;
  }
}
