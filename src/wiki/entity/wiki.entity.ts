import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'pages'})
export class WikiPage extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @Column({nullable: true})
  public level!: number;

  @Column({ type: 'varchar', nullable: true })
  public name!: string;

  @Column({ type: 'varchar', nullable: true })
  public ownerId!: string;

  @ManyToOne(() => WikiPage, page => page.children)
  public parent!: WikiPage;

  @OneToMany(() => WikiPage, (page) => page.parent)
  public children: WikiPage[];
}