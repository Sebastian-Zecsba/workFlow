import { Organization } from "src/organizations/entities/organization.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Invitation {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 255})
    email: string

    @Column({type: 'varchar', length: 255})
    invite_code: string

    @Column({type: 'varchar', length: 55})
    role: string

    @Column({ default: false })
    used: boolean;
    
    @ManyToOne(() => Organization, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'organization_id'})
    organization: Organization;
}
