import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Tag} from '@libs/db/entity/tag.entity';
import {TagInterface} from './interface/tag.interface';
import {CustomException} from '@common/common/common/http.decoration';

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>,
    ) {}

    async addTag(params): Promise<any> {
        const newTag = new Tag();
        newTag.authorId = params.authorId;
        newTag.tagdesc = params.tagdesc;
        newTag.tagname = params.tagname;
        return await this.tagRepository.save(newTag).then(() => {
            return '操作成功';
        }).catch( (err) => {
            console.log('addTag-err=', err);
            throw new CustomException('操作失败');
        });
    }

    async getAllTag(params): Promise<TagInterface[]> {
        const tagAll = await this.tagRepository.createQueryBuilder('tag')
            .getMany();
        return  tagAll;
    }

    async getTagList(params): Promise<TagInterface[]> {
        const tagList = await this.tagRepository.query(`
            select T.id,
            T.tagname,
            T.tagdesc,
            T.status,
            ( SELECT COUNT(*) FROM article where FIND_IN_SET(T.id, tag) ) as artNum,
            T.cdate
            from tag as T
            where T.authorId = ${params.authorId}
            ORDER BY T.cdate desc
            limit ${(params.currentPage - 1) * params.limit}, ${params.limit};
        `);
        return  tagList;
    }
    async getTagCount(): Promise<number> {
        const tagCount = await this.tagRepository.createQueryBuilder().getCount();

        return tagCount;
    }

    async editTag(params): Promise<any> {
        return await this.tagRepository.update(params.id, {
            tagname: params.tagname,
            tagdesc: params.tagdesc,
        }).then(() => {
            return '操作成功';
        }).catch( (err) => {
            console.log('editTag-err=', err);
            throw new CustomException('操作失败');
        });
    }
    async delTag(params): Promise<any> {
        return await this.tagRepository.update(params.id, {
            status: params.status,
        }).then(() => {
            return '操作成功';
        }).catch( (err) => {
            console.log('delTag-err=', err);
            throw new CustomException('操作失败');
        });
    }
}
