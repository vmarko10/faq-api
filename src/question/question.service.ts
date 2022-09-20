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

  // insert a question into question table
  async create(userData: any, createQuestionDto: CreateQuestionDto) {
    try {

      const questionResult = await this.questionRepository.insert({
        author_id: userData.userId,
        question_body: createQuestionDto.question_body,
        question_title: createQuestionDto.question_title,
      });

      // insert the category of the question into question category
      await this.questionCategoryRepository.insert({
        category_id: createQuestionDto.category_id,
        question_id: questionResult.identifiers[0].id,
      });

      return { msg: 'Question was uploaded successfully!' };
    } catch (error) {
      console.log(error);
      return { msg: 'Unexpected error!' }
    }
  }

  // find all question by category id
  async findByCategoryID(id: number) {

    // get all question id by category_id column
    const question_id_arr = await this.questionCategoryRepository.find({
      where: {
        category_id: id
      }
    })
    .then(result => result.map(row => row.question_id));

    // return all question from `question_id_arr`
    return this.questionRepository.find({
      where: {
        id: In(question_id_arr)
      },
    });
  }

  // return one question by id column
  async findOne(id: number) {
    const question = await this.questionRepository.findOne({ where: { id: id } });

    return question;
  }

}
