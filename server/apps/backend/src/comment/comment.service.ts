import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Comment} from '@libs/db/entity/comment.entity';
import {Repository} from 'typeorm';
import {CommentInterface} from '../comment/interface/comment.interface';
import {CustomException} from '@common/common/common/http.decoration';
import {sendToObserver} from '@common/common/common/sendEmail';
import {FilterContent} from '@common/common/common/utils.common';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
    ) {
    }

    async getCommentsCount(params?): Promise<number> {
        if (params) {
            return await this.commentRepository.createQueryBuilder('comment').where('comment.isChecked= :isChecked', {isChecked: params.type}).getCount();
        } else {
            return await this.commentRepository.createQueryBuilder('comment').getCount();
        }
    }

    async getCommentsList(params): Promise<CommentInterface[]> {
        const commentsList = await this.commentRepository.query(`
            select
            C.id, C.artId, C.content, C.from_uname,
            (SELECT artTitle FROM article where FIND_IN_SET(C.artId, id) ) as artTitle,
            C.from_uemail, C.from_uavatar,
            C.from_uweb,
            C.cdate,
            C.to_uname ,
            C.to_uemail ,
            C.to_uweb ,
            C.oldContent ,
            C.oldCdate ,
            C.isChecked ,
            C.to_uavatar
            from comment as C
            WHERE C.isChecked = ${params.type}
            ORDER BY C.cdate desc
            limit ${(params.currentPage - 1) * params.limit}, ${params.limit};
        `);
        return commentsList;
    }

    async getCommentById(id): Promise<any> {
        const affectedData = await this.commentRepository.
        createQueryBuilder('comment').
        where('comment.id= :id', {id}).getOne();
        return affectedData;
    }
    async updateComment(params): Promise<any> {
        return await this.commentRepository.update(params.id, {
            isChecked: params.isChecked,
        }).then(async (res) => {
            if (params.isChecked === 1) {
                const affectedData = await this.commentRepository.
                createQueryBuilder('comment').
                where('comment.id= :id', {id: params.id}).getOne();

                const emailParams = {
                    nickname: FilterContent(affectedData.from_uname),
                    from_uavatar: FilterContent(affectedData.from_uavatar),
                    touemail: FilterContent(affectedData.to_uemail),
                    cdate: affectedData.cdate,
                    content: FilterContent(affectedData.content),
                    toURL: FilterContent(affectedData.artURL),
                    subject: '博客留言回复提醒',
                };
                if (affectedData.to_uemail !== process.env.EMAIL_AUTHOR) {
                    emailParams.subject = 'Hello,你在重庆崽儿Brand博客的留言有新回复了,点击查看详情';
                    sendToObserver(emailParams);
                }
            }
            return '操作成功';
        }).catch((err) => {
            throw new CustomException('操作失败');
        });
    }

    // async deleteComment(params): Promise<any> {
    //     return await this.commentRepository.update(params.id, {
    //         status: params.status,
    //     }).then(() => {
    //         return '操作成功';
    //     }).catch( (err) => {
    //         throw new CustomException('操作失败');
    //     });
    // }

}
