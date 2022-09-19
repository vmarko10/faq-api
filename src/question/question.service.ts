import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './entities/question.entity';
import { QuestionCategory } from './entities/questionCategory.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,

    @InjectRepository(QuestionCategory)
    private questionCategoryRepository: Repository<QuestionCategory>,

  ) { }

  async create(userData: any, createQuestionDto: CreateQuestionDto) {
    try {

      await this.questionRepository.insert({
        author_id: userData.userId,
        question_body: createQuestionDto.question_body,
        question_title: createQuestionDto.question_title,
      });

      return { msg: 'Question was uploaded!' };
    } catch (error) {
      console.log(error);
      return { msg: 'Unexpected error!' }
    }
  }

  async findByCategoryID(id: number) {

    const question_id_arr = await this.questionCategoryRepository.find({
      where: {
        category_id: id
      }
    })
      .then(result => result.map(row => row.question_id));

    return this.questionRepository.find({
      where: {
        id: In(question_id_arr)
      }
    });
  }

  async findOne(id: number) {
    const question = await this.questionRepository.findOne({ where: { id: id } });

    return question;
  }

}
