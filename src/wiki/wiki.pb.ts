/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import * as Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';

export const protobufPackage = 'wiki';

export interface AddOneRequest {
  parentId: string;
  name: string;
}

export interface AddOneResponse {
  status: number;
  error: string[];
  id: string;
}

export const WIKI_PACKAGE_NAME = 'wiki';

export interface WikiServiceClient {
  addOne(request: AddOneRequest): Observable<AddOneResponse>;
}

export interface WikiServiceController {
  addOne(
    request: AddOneRequest,
  ): Promise<AddOneResponse> | Observable<AddOneResponse> | AddOneResponse;
}

export function WikiServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['addOne'];
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
