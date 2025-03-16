import { Organization } from "src/organizations/entities/organization.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Plan {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true })
    name: string;
  
    @Column()
    max_projects: number;
  
    @Column()
    max_users: number;


    @OneToMany(() => Organization, (org) => org.plan)
    organizations: Organization[]
}
