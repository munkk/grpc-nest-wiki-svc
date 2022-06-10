import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { WikiPage } from './entity/wiki.entity';
import { AddPageRequest, AddPageResponse, GetRootsRequest, GetRootsResponse, RemovePageRequest, RemovePageResponse } from './wiki.pb';


@Injectable()
export class WikiService {
  @InjectRepository(WikiPage)
  private readonly repository: Repository<WikiPage>;

  public async addPage(payload: AddPageRequest): Promise<AddPageResponse> {
    let parent = null;  
    if (payload.parentId) {
        parent = await this.repository.findOneBy({
            id: payload.parentId
        })
    }

    const product: WikiPage = new WikiPage();
    product.parent = parent;
    product.name = payload.name;

    await this.repository.save(product);

    return { id: product.id, error: null, status: HttpStatus.OK };
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