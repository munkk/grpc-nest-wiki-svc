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

export interface GetParentRequest {
  id: string;
}

export interface GetParentResponse {
  data: WikiPage | undefined;
  status: number;
  error: string[];
}

export interface GetPageRequest {
  id: string;
}

export interface GetPageResponse {
  data: WikiPage | undefined;
  status: number;
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

  getParent(request: GetParentRequest): Observable<GetParentResponse>;

  getPage(request: GetPageRequest): Observable<GetPageResponse>;

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

  getParent(
    request: GetParentRequest,
  ):
    | Promise<GetParentResponse>
    | Observable<GetParentResponse>
    | GetParentResponse;

  getPage(
    request: GetPageRequest,
  ): Promise<GetPageResponse> | Observable<GetPageResponse> | GetPageResponse;

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
      'getParent',
      'getPage',
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
