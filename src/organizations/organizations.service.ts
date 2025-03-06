import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizationsService {

  constructor(
    @InjectRepository(Organization) private readonly organizationRepository : Repository<Organization>
  ){}

  create(createOrganizationDto: CreateOrganizationDto) {
    return this.organizationRepository.save(createOrganizationDto)
  }

  findAll() {
    return this.organizationRepository.find();
  }

  async findOne(id: number) {

    const organization = await this.organizationRepository.findOneBy({id})
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
