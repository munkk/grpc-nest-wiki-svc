import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { WikiPage } from './entity/wiki.entity';
import { WikiController } from './wiki.controller';
import { WikiService } from './wiki.service';

@Module({
  imports: [TypeOrmModule.forFeature([WikiPage])],
  controllers: [WikiController],
  providers: [WikiService],
})
export class WikiModule {}