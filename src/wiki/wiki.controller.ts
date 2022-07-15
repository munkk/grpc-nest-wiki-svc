import { Controller, Inject, Param, Query, Req } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { WikiService } from './wiki.service';
import { AddPageRequest, AddPageResponse, GetChildrenRequest, GetChildrenResponse, GetRootsRequest, GetRootsResponse, RemovePageRequest, RemovePageResponse, WIKI_SERVICE_NAME } from './wiki.pb';

@Controller('wiki')
export class WikiController {
  @Inject(WikiService)
  private readonly service: WikiService;

  @GrpcMethod(WIKI_SERVICE_NAME, 'GetRoots')
  private async getRoots(data: GetRootsRequest): Promise<GetRootsResponse> {
    return this.service.getRoots(data);
  }

  @GrpcMethod(WIKI_SERVICE_NAME, 'GetChildren')
  private async getChildren(data: GetChildrenRequest): Promise<GetChildrenResponse> {
    return this.service.getChildren(data);
  }

  @GrpcMethod(WIKI_SERVICE_NAME, 'AddPage')
  private async addPage(data: AddPageRequest): Promise<AddPageResponse> {
    return this.service.addPage(data);
  }

  @GrpcMethod(WIKI_SERVICE_NAME, 'RemovePage')
  private async removePage(data: RemovePageRequest): Promise<RemovePageResponse> {
    return this.service.removePage(data);
  }
}