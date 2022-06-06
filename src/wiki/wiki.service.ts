import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { WikiPage } from './entity/wiki.entity';
import { AddOneRequest, AddOneResponse } from './wiki.pb';


@Injectable()
export class WikiService {
  @InjectRepository(WikiPage)
  private readonly repository: Repository<WikiPage>;


  public async addOne(payload: AddOneRequest): Promise<AddOneResponse> {
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
}