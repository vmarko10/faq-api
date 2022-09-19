import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { AnswerModule } from './answer/answer.module';
import { QuestionModule } from './question/question.module';
import { LikeModule } from './like/like.module';

@Module({
  imports: [AuthModule, UsersModule, TypeOrmModule.forRoot(config), CategoryModule, AnswerModule, QuestionModule, LikeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
