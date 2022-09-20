import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) { }

  // return the entire  category table
  findAll() {
    return this.categoryRepository.find();
  }
}
