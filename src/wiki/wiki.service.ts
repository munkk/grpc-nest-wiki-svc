import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  EntityManager,
  Repository,
  TreeRepository,
} from 'typeorm';

import { WikiPage } from './entity/wiki.entity';
import {
  AddPageRequest,
  AddPageResponse,
  GetChildrenRequest,
  GetChildrenResponse,
  GetPageRequest,
  GetPageResponse,
  GetParentRequest,
  GetParentResponse,
  GetRootsRequest,
  GetRootsResponse,
  RemovePageRequest,
  RemovePageResponse,
} from './wiki.pb';

@Injectable()
export class WikiService {
  @InjectRepository(WikiPage)
  private readonly repository: Repository<WikiPage>;

  @InjectEntityManager()
  private readonly manager: EntityManager;
  

  public async getRoots(payload: GetRootsRequest): Promise<GetRootsResponse> {
    const treeRepository = this.manager.getTreeRepository(WikiPage);
    try {
      const rootPages = await treeRepository.findTrees({ depth: 0 });
      return { data: rootPages, error: null, status: HttpStatus.OK };
    } catch (err) {
      return { data: null, error: err.detail, status: HttpStatus.OK };
    }
  }

  
  public async getChildren(
    query: GetChildrenRequest,
  ): Promise<GetChildrenResponse> {
    const treeRepository = this.manager.getTreeRepository(WikiPage);
    try {
      const entity = await treeRepository.findOneBy({
        id: query.id,
      });
      const tree = await treeRepository.findDescendantsTree(entity, {depth: 1});
      return { data: tree.children, error: null, status: HttpStatus.OK };
    } catch (err) {
      return { data: null, error: err, status: HttpStatus.OK };
    }
  }

  public async getParent(
    query: GetParentRequest,
  ): Promise<GetParentResponse> {
    const treeRepository = this.manager.getTreeRepository(WikiPage);
    try {
      const entity = await treeRepository.findOneBy({
        id: query.id,
      });
      const tree = await treeRepository.findAncestorsTree(entity, {relations: ["parent"] });
      return { data: tree.parent, error: null, status: HttpStatus.OK };
    } catch (err) {
      return { data: null, error: err.detail, status: HttpStatus.OK };
    }
  }

  public async getPage(
    query: GetPageRequest,
  ): Promise<GetPageResponse> {
    const treeRepository = this.manager.getTreeRepository(WikiPage);
    try {
      const entity = await treeRepository.findOneBy({
        id: query.id,
      });
      return { data: entity, error: null, status: HttpStatus.OK };
    } catch (err) {
      return { data: null, error: err.detail, status: HttpStatus.OK };
    }
  }

  public async addPage(payload: AddPageRequest): Promise<AddPageResponse> {
    let parent: WikiPage = null;
    if (payload.parentId) {
      parent = await this.repository.findOneBy({
        id: payload.parentId,
      });
      parent.childrenCount++;
      parent.save();
    }

    const newPage = await this.repository.create({
      ...payload,
      isRoot: !Boolean(parent),
      parent: parent,
    });
    await this.repository.save(newPage);

    return { id: newPage.id, error: null, status: HttpStatus.OK };
  }

  public async removePage(
    payload: RemovePageRequest,
  ): Promise<RemovePageResponse> {
    try {
      await this.repository.delete(payload.id);
      return { error: null, status: HttpStatus.OK };
    } catch (err) {
      return { error: err.detail, status: HttpStatus.OK };
    }
  }
}
