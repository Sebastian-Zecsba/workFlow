import { Auth } from "src/auth/entities/auth.entity";
import { Project } from "src/projects/entities/project.entity";
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from "typeorm";

@Entity()
export class ProjectAssignment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Project, (project) => project.assignments)
    @JoinColumn({ name: 'project_id' })
    project: Project;

    @ManyToOne(() => Auth, (auth) => auth.assignments)
    @JoinColumn({ name: 'user_id' })
    user: Auth;

    @Column({ type: 'varchar', length: 50 })
    role: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}