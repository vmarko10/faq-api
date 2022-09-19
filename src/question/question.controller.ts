import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { AnswerService } from '../answer/answer.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateAnswerDto } from '../answer/dto/create-answer.dto';

@Controller('question')
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    private readonly answerService: AnswerService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('answer')
  answerQuestion(@Request() req, @Body() createAnswerDto: CreateAnswerDto) {
    return this.answerService.create(req.user, createAnswerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Request() req, @Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(req.user, createQuestionDto);
  }

  @Get('byCategoryID/:id')
  findByCategoryID(@Param('id') id: number) {
    return this.questionService.findByCategoryID(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const question = await this.questionService.findOne(+id);
    question['answers'] = await this.answerService.findByQuestionID(id);

    return question;
  }
}
