import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { WikiPage } from './entity/wiki.entity';
import { AddPageRequest, AddPageResponse, GetRootsRequest, GetRootsResponse, RemovePageRequest, RemovePageResponse } from './wiki.pb';


@Injectable()
export class WikiService {
  @InjectRepository(WikiPage)
  private readonly repository: Repository<WikiPage>;

  public async getRoots(payload: GetRootsRequest): Promise<GetRootsResponse> {
    try {
      const pages = await this.repository.find({
        where: { 
          isRoot: true 
        }
      })
      return { data: pages, error: null, status: HttpStatus.OK };
    } catch (err) {
      return { data: null, error: err.detail, status: HttpStatus.OK  };
    }
  } 

  public async addPage(payload: AddPageRequest): Promise<AddPageResponse> {
    let parent: WikiPage = null;  
    if (payload.parentId) {
        parent = await this.repository.findOneBy({
            id: payload.parentId
        })
    }

    const newPage = await this.repository.create({
      ...payload,
      isRoot: !Boolean(parent),
      parent: parent
    });
    await this.repository.save(newPage);

    return { id: newPage.id, error: null, status: HttpStatus.OK };
  }

  public async removePage(payload: RemovePageRequest): Promise<RemovePageResponse> {
    try {
      await this.repository.delete(payload.id);
      return { error: null, status: HttpStatus.OK };
    } catch (err) {
      return { error: err.detail, status: HttpStatus.OK  };
    }
  }
}