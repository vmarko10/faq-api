import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { QuestionCategory } from './entities/questionCategory.entity';
import { AnswerModule } from '../answer/answer.module';

@Module({
  imports: [AnswerModule, TypeOrmModule.forFeature([Question, QuestionCategory])],
  controllers: [QuestionController],
  providers: [QuestionService]
})
export class QuestionModule {}
