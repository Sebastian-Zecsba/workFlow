import { Auth } from "../../auth/entities/auth.entity";
import { Project } from "../../projects/entities/project.entity";
import { Role } from "../../role/entities/role.entity";
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

    @ManyToOne(() => Role, (role) => role.assignments)
    @JoinColumn({name: 'role_id'})
    role: Role;
}