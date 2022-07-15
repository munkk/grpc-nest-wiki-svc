import { INestMicroservice, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { protobufPackage } from './wiki/wiki.pb';

async function bootstrap() {
  const app: INestMicroservice = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50055',
      package: protobufPackage,
      protoPath: join('node_modules/grpc-nest-proto/proto/wiki.proto'),
      loader: { keepCase: true },
    },
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen();
}

bootstrap();