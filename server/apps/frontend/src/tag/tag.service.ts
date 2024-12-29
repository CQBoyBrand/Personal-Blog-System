import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Tag} from '@libs/db/entity/tag.entity';
import {Repository} from 'typeorm';
import {TagInterface} from './interface/tag.interface';

@Injectable()
export class TagService {
    constructor(
       @InjectRepository(Tag)
       private readonly tagRepo: Repository<Tag>,
    ) {}

    async getAllTag(): Promise<TagInterface[]> {
        return await this.tagRepo.query(`
            select
            id, tagname,
            (SELECT COUNT(*) as total FROM article where status = 1 and FIND_IN_SET(T.id, tag) ) as total
            from tag AS T
            where T.status = 1 and T.authorId = 0;
        `);
    }
}
