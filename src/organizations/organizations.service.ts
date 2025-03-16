import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';
import { Repository } from 'typeorm';
import { Plan } from 'src/plan/entities/plan.entity';
import { InvitationDTO } from './dto/create-invitation.dto';
import { Invitation } from 'src/invitations/entities/invitation.entity';

@Injectable()
export class OrganizationsService {

  constructor(
    @InjectRepository(Organization) private readonly organizationRepository : Repository<Organization>,
    @InjectRepository(Plan) private readonly planRepository : Repository<Plan>,
    @InjectRepository(Invitation) private readonly invitationRepository : Repository<Invitation>
  ){}

  async create(createOrganizationDto: CreateOrganizationDto) {
    const plan = await this.planRepository.findOne({ where: { name: createOrganizationDto.plan } });
    if (!plan) {
      throw new NotFoundException(`El plan "${createOrganizationDto.plan}" no existe`);
    }
  
    const organization = this.organizationRepository.create({
      name: createOrganizationDto.name,
      plan: plan,
      subscription_status: 'active',
    });
  
    return this.organizationRepository.save(organization);
  }

  async invitation(orgId: number, invitation: InvitationDTO){

    const org = await this.organizationRepository.findOne({
      where: {id: orgId},
      relations: {
        users: true,
        plan: true,
        invitations: true
      }
    })
    if(!org){
      throw new NotFoundException('Organizacion no encontrada')
    }

    const existingUser = org.users.find(user => user.email === invitation.email)
    if(existingUser){
      throw new Error(`Ya existe un usuario con el correo ${invitation.email} en esta organización.`);
    }

    const userCount = org.users.length;
    const invitationCount = org.invitations.filter(invitation => invitation.used === false).length;
    const totalSlotsUsed = userCount + invitationCount
    
    if(totalSlotsUsed >= org.plan.max_users){
      throw new Error(
        `Se alcanzó el límite de usuarios (${org.plan.max_users}) para el plan "${org.plan.name}"`
      );
    }

    const inviteCode = Math.floor(100000 + Math.random() * 90000)

    const invitationObj = this.invitationRepository.create({
      email: invitation.email,
      role: invitation.role,
      invite_code: inviteCode.toString(),
      organization: org
    })

    await this.invitationRepository.save(invitationObj)

    return {
      message: `Invitacion creada para ${invitation.email}`,
      invite_code: inviteCode,
      role: invitation.role
    }
  }

  findAll() {
    return this.organizationRepository.find({
      relations: {users: true}
    });
  }

  async findOne(id: number) {

    const organization = await this.organizationRepository.find({
      relations: { users: true},
      where: {id}
    })
    if(!organization){
      throw new NotFoundException({message: "Nombre de la empresa/organización no se encuentra"})
    }

    return organization;
  }

  async update(id: number, updateOrganizationDto: UpdateOrganizationDto) {

    const organization = await this.findOne(id)
    Object.assign(organization, updateOrganizationDto)

    return this.organizationRepository.save(organization);
  }

  async remove(id: number) {
    const organization = await this.findOne(id)
    await this.organizationRepository.remove(organization)

    return {
      message: "Se elimino esta empresa",
      organization: organization
    };
  }
}
