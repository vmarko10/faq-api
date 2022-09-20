import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { Answer } from './entities/answer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>
  ) {}

  // increment like_count column of an answer
  async incrementLike(id: number) {
    return this.answerRepository.increment({id: id}, 'like_count', 1);
  }

  // increment dislike_count column of an answer
  async incrementDislike(id: number) {
    return this.answerRepository.increment({id: id}, 'dislike_count', 1);
  }

  // insert an inswer into answer table
  async create(userData, createAnswerDto: CreateAnswerDto) {
    
    try {
      await this.answerRepository.insert({
        author_id: userData.userId,
        question_id: createAnswerDto.question_id,
        answer_body: createAnswerDto.answer_body,
        like_count: 0,
        dislike_count: 0
      });

      return { msg: 'Answer was uploaded successfully!' };
    } catch (error) {
      console.log(error);
      return { msg: 'Unexpected error!' }
    }
  }

  // find all answer related to a question by id
  findByQuestionID(id: number) {
    return this.answerRepository.find({
      where: {
        question_id: id
      },
      order: {
        id: "ASC"
      }
    })
  }

}
