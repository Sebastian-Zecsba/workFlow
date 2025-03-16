import { Auth } from 'src/auth/entities/auth.entity';
import { Invitation } from 'src/invitations/entities/invitation.entity';
import { Plan } from 'src/plan/entities/plan.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 55 })
  name: string;

  @ManyToOne(() => Plan, (plan) => plan.organizations, {eager: true})
  @JoinColumn({name: 'plan_id'})
  plan: Plan;

  @Column({ type: 'varchar', length: 55, nullable: true, default: 'activo' })
  subscription_status: string;

  @Column({ type: 'timestamp', nullable: true })
  billing_cycle_start?: Date;

  @Column({ type: 'timestamp', nullable: true })
  billing_cycle_end?: Date;

  @Column({ type: 'int', default: 10 })
  max_projects: number;

  @Column({ type: 'int', default: 5 })
  max_users: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => Auth, user => user.organization)
  users: Auth[]

  @OneToMany(() => Invitation, invitation => invitation.organization)
  invitations: Invitation[];
}
