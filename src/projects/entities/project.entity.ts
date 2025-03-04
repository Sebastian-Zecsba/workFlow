import { Auth } from "src/auth/entities/auth.entity";
import { ProjectAssignment } from "src/project_assignments/entities/project_assignment.entity";
import { BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn } from "typeorm";

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'date', nullable: false })
    start_date: Date;

    @Column({ type: 'date', nullable: true })
    end_date: Date;

    @ManyToOne(() => Auth, (auth) => auth.projects)
    @JoinColumn({ name: 'created_by' })
    created_by: Auth;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @BeforeUpdate()
    updateTimestamp() {
        this.updated_at = new Date();
    }

    @OneToMany(() => ProjectAssignment, (assignment) => assignment.project)
    assignments: ProjectAssignment[];
}