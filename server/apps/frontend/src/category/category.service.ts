import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Category} from '@libs/db/entity/category.entity';
import {Repository} from 'typeorm';
import {CategoryInterface} from './interface/category.interface';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepo: Repository<Category>,
    ) {}

    async getCategoryList(): Promise<CategoryInterface[]> {
        const categoryList = await this.categoryRepo.query(`
            select
            id, categoryname,
            (SELECT COUNT(*) as total FROM article where status = 1 and FIND_IN_SET(C.id, category) ) as total
            from category  AS C
            where C.status = 1 and C.authorId = 0;
        `);
        return categoryList;
    }
}
