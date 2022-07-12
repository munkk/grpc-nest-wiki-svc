import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({name: 'pages'})
export class WikiPage extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({nullable: true})
  public isRoot: boolean;

  @Column({ type: 'varchar', nullable: true })
  public name: string;

  @Column({ type: 'simple-json', nullable: true })
  public html: string;

  @Column({ type: 'varchar', nullable: true })
  public ownerId: string;

  @ManyToOne(() => WikiPage, page => page.children)
  public parent: WikiPage;

  @OneToMany(() => WikiPage, (page) => page.parent)
  public children: WikiPage[];

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public update_at: Date;
}
