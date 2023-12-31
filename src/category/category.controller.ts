import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';
import { User } from '../schemas/user.entity';

@Controller('category')
@UseGuards(AuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getCategories(@Req() { user }: Request & { user: User }) {
    const { id } = user as User;
    return this.categoryService.getUserCategories(id);
  }

  @Post()
  createCategory(
    @Body() dto: CategoryDto,
    @Req() { user }: Request & { user: User }
  ) {
    const { id } = user as User;
    return this.categoryService.createCategory(dto, id);
  }

  @Patch(':categoryId')
  updateCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body() dto: CategoryDto
  ) {
    return this.categoryService.updateCategoryName(categoryId, dto);
  }

  @Delete(':categoryId')
  removeCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.categoryService.removeCategory(categoryId);
  }
}
