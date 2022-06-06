import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { WikiService } from './wiki.service';
import { AddOneRequest, AddOneResponse, WIKI_SERVICE_NAME } from './wiki.pb';

@Controller('wiki')
export class WikiController {
  @Inject(WikiService)
  private readonly service: WikiService;

  @GrpcMethod(WIKI_SERVICE_NAME, 'AddOne')
  private async addOne(data: AddOneRequest): Promise<AddOneResponse> {
    return this.service.addOne(data);
  }
}