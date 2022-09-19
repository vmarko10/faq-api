import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Likes } from './entities/like.entity';
import { AnswerModule } from '../answer/answer.module';

@Module({
  imports: [AnswerModule ,TypeOrmModule.forFeature([Likes])],
  controllers: [LikeController],
  providers: [LikeService]
})
export class LikeModule {}
