import { ProjectAssignment } from "../../project_assignments/entities/project_assignment.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @OneToMany(() => ProjectAssignment, assignment => assignment.role)
    assignments: ProjectAssignment[];
}
