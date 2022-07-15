/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import * as Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';
import { Timestamp } from './google/protobuf/timestamp.pb';

export const protobufPackage = 'wiki';

/** GET */
export interface GetRootsRequest {}

export interface GetRootsResponse {
  data: WikiPage[];
  status: number;
  error: string[];
}

export interface GetChildrenRequest {
  id: string;
}

export interface GetChildrenResponse {
  data: WikiPage[];
  status: number;
  error: string[];
}

export interface GetByIdRequest {
  id: string;
}

export interface GetByIdResponse {
  status: number;
  id: string;
  name: string;
  children: WikiPage[];
  error: string[];
}

/** ADD */
export interface AddPageRequest {
  name: string;
  parentId: string;
  html: string;
}

export interface AddPageResponse {
  status: number;
  error: string[];
  id: string;
}

/** REMOVE */
export interface RemovePageRequest {
  id: string;
}

export interface RemovePageResponse {
  status: number;
  error: string[];
}

/** Entities */
export interface WikiPage {
  id: string;
  isRoot: boolean;
  parent: WikiPage | undefined;
  name: string;
  html: string;
  children: WikiPage[];
  childrenCount: number;
  createdAt: Timestamp | undefined;
  updatedAt: Timestamp | undefined;
}

export const WIKI_PACKAGE_NAME = 'wiki';

export interface WikiServiceClient {
  getRoots(request: GetRootsRequest): Observable<GetRootsResponse>;

  getChildren(request: GetChildrenRequest): Observable<GetChildrenResponse>;

  getById(request: GetByIdRequest): Observable<GetByIdResponse>;

  addPage(request: AddPageRequest): Observable<AddPageResponse>;

  removePage(request: RemovePageRequest): Observable<RemovePageResponse>;
}

export interface WikiServiceController {
  getRoots(
    request: GetRootsRequest,
  ):
    | Promise<GetRootsResponse>
    | Observable<GetRootsResponse>
    | GetRootsResponse;

  getChildren(
    request: GetChildrenRequest,
  ):
    | Promise<GetChildrenResponse>
    | Observable<GetChildrenResponse>
    | GetChildrenResponse;

  getById(
    request: GetByIdRequest,
  ): Promise<GetByIdResponse> | Observable<GetByIdResponse> | GetByIdResponse;

  addPage(
    request: AddPageRequest,
  ): Promise<AddPageResponse> | Observable<AddPageResponse> | AddPageResponse;

  removePage(
    request: RemovePageRequest,
  ):
    | Promise<RemovePageResponse>
    | Observable<RemovePageResponse>
    | RemovePageResponse;
}

export function WikiServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'getRoots',
      'getChildren',
      'getById',
      'addPage',
      'removePage',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('WikiService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('WikiService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const WIKI_SERVICE_NAME = 'WikiService';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
