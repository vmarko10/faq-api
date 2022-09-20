import * as dotenv from 'dotenv'
dotenv.config();

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { AnswerModule } from './answer/answer.module';
import { QuestionModule } from './question/question.module';
import { LikeModule } from './like/like.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    AuthModule,
    UsersModule,
    CategoryModule,
    AnswerModule,
    QuestionModule,
    LikeModule,
  ],
  controllers: [AppController],
})
export class AppModule { }
