import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLikeDto } from './dto/create-like.dto';
import { Likes } from './entities/like.entity';
import { Repository } from 'typeorm';
import { AnswerService } from '../answer/answer.service';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Likes)
    private likeRepository: Repository<Likes>,

    private answerService: AnswerService
  ) {}

  // register a like/dislike in like table
  async create(userData: any, createLikeDto: CreateLikeDto) {
    try {
      await this.likeRepository.insert({
        author_id: userData.userId,
        answer_id: createLikeDto.answer_id,
        islike: createLikeDto.isLike
      });

      // increment the like_count/dislike_count column of the answer
      if (createLikeDto.isLike)
        this.answerService.incrementLike(createLikeDto.answer_id)
      else
        this.answerService.incrementDislike(createLikeDto.answer_id)

      return {msg: `${createLikeDto.isLike ? 'Like' : 'Dislike'} was uploaded successfully!`};

    } catch (error) {

      console.log(error.code);

      return {
        msg: {
          23505: "Error! You already liked/disliked this answer!",
          23503: "Error! The answer you want to like does not exist;"
        }[error.code]
      }
    }

  }

}
