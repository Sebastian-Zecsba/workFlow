import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from './dto/login-auth-dto';
import { RegisterAuthDTO } from './dto/register-auth-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { Organization } from 'src/organizations/entities/organization.entity';
import { Plan } from 'src/plan/entities/plan.entity';
import { Invitation } from 'src/invitations/entities/invitation.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private readonly authRepository: Repository<Auth>,
    @InjectRepository(Organization) private readonly organizationRepository: Repository<Organization>,
    @InjectRepository(Plan) private readonly planRepository: Repository<Plan>,
    @InjectRepository(Invitation) private readonly invitationsRepository: Repository<Invitation>,
    private readonly jwtService: JwtService

  ){}

  async login(loginDto: LoginDTO) {
    const { username, password } = loginDto;

    const user = await this.authRepository.findOne({
      where: { username},
      relations: {
        organization: true
      }
     });
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: user.id, orgId: user.organization.id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  async register(registerDTO: RegisterAuthDTO) {
    const { email, username, password, planName, organizationName, orgId, inviteCode, ...props } = registerDTO;
  
    const existingEmail = await this.authRepository.findOne({ where: { email } });
    if (existingEmail) {
      throw new BadRequestException('Correo ya existe');
    }
    const existingUsername = await this.authRepository.findOne({ where: { username } });
    if (existingUsername) {
      throw new BadRequestException('Usuario ya existe');
    }
  
    let organization: Organization;
    let role = 'member';
  
    if (inviteCode) {
      const invitation = await this.invitationsRepository.findOne({
        where: { invite_code: inviteCode },
        relations: ['organization'],
      });
      if (!invitation) {
        throw new NotFoundException('Invitación no válida o expirada');
      }
      if (invitation.email !== email) {
        throw new BadRequestException(`Esta invitación es para el correo ${invitation.email}, no para ${email}`);
      }
      organization = invitation.organization;
      role = invitation.role;
      invitation.used = true;
      await this.invitationsRepository.save(invitation);
  
    } else if (!orgId) {
      const plan = await this.buscarPlanOThrow(planName);
      organization = this.organizationRepository.create({
        name: organizationName || `${username} Org`,
        plan,
        subscription_status: 'active',
      });
      organization = await this.organizationRepository.save(organization);
      role = 'owner';
  
    } else {
      const foundOrg = await this.organizationRepository.findOne({ where: { id: orgId } });
      if (!foundOrg) {
        throw new NotFoundException('Organización no encontrada');
      }
      organization = foundOrg;
      role = 'member';
    }
  
    const passwordHashed = await bcrypt.hash(password, 10);
    const newUser = this.authRepository.create({
      email,
      username,
      password: passwordHashed,
      organization,
      role,
      ...props,
    });
    return this.authRepository.save(newUser);
  }

  async getProfile(userId: number) {
    const user = await this.authRepository.findOne({ 
      where: {id: userId}, 
      relations: {
        organization: true
      } 
    });

    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }

    const { password, ...userData } = user;
    return userData;
  }

  private async buscarPlanOThrow(planName?: string): Promise<Plan> {
    if (planName) {
      const foundPlan = await this.planRepository.findOne({ where: { name: planName } });
      if (!foundPlan) {
        throw new NotFoundException(`El plan "${planName}" no existe`);
      }
      return foundPlan;
    } else {
      const basicPlan = await this.planRepository.findOne({ where: { name: 'basic' } });
      if (!basicPlan) {
        throw new NotFoundException('No se encontró el plan básico');
      }
      return basicPlan;
    }
  }
}