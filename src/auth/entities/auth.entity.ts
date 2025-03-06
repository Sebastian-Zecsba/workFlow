import { Organization } from "src/organizations/entities/organization.entity";
import { BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Auth {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 60, unique: true, nullable: false })
    username: string;

    @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
    email: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    password: string;

    @Column({ type: 'varchar', length: 60, nullable: false })
    first_name: string;

    @Column({ type: 'varchar', length: 60, nullable: false })
    last_name: string;

    @Column({ type: 'varchar', length: 60, nullable: true })
    organizationName?: string;

    @Column({ type: 'int', nullable: true })
    orgId?: number;

    @Column({ type: 'varchar', length: 60, nullable: true })
    inviteCode?: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @BeforeUpdate()
    updateTimestamp() {
        this.updated_at = new Date();
    }

    @ManyToOne(() => Organization, organization => organization.users)
    @JoinColumn({name: 'organization_id'})
    organization: Organization;
}