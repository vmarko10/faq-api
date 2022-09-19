import { Controller, Post, Body, Request, Param, Delete, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createLikeDto: CreateLikeDto) {
    return this.likeService.create(req.user, createLikeDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.likeService.remove(+id);
  }
}
