import { Project } from "../../projects/entities/project.entity";
import { ProjectAssignment } from "../../project_assignments/entities/project_assignment.entity";
import { BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @BeforeUpdate()
    updateTimestamp() {
        this.updated_at = new Date();
    }

    @OneToMany(() => Project, (project) => project.created_by)
    projects: Project[];

    @OneToMany(() => ProjectAssignment, (assignment) => assignment.user)
    assignments: ProjectAssignment[];
}