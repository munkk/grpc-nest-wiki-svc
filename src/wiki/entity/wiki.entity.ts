import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent, UpdateDateColumn } from 'typeorm';
import { Timestamp } from '../google/protobuf/timestamp.pb';

@Entity({name: 'pages'})
@Tree("closure-table")
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

  @TreeParent({ onDelete: 'CASCADE' })
  public parent: WikiPage;

  @TreeChildren()
  public children: WikiPage[];

  @Column({ type: 'int', nullable: true, default: 0 })
  public childrenCount: number;

  @CreateDateColumn()
  public createdAt: Timestamp;

  @UpdateDateColumn()
  public updatedAt: Timestamp;
}
