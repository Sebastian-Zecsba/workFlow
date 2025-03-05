import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "../role/entities/role.entity";
import { Repository } from "typeorm";
import { roles } from "./data/roles";

@Injectable()
export class SeederService{

    constructor(
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>
    ){}

    async seed(){
        await this.roleRepository.save(roles)
    }
}