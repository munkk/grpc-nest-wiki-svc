import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'pages'})
export class WikiPage extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @Column({ type: 'varchar' })
  public name!: string;

  @ManyToOne(() => WikiPage, page => page.children)
  public parent!: WikiPage;

  @OneToMany(() => WikiPage, (page) => page.parent)
  public children: WikiPage[];
}