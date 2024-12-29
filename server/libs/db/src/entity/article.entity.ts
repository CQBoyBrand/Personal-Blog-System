/**
 * Author：Brand
 * Email：brandhuang@qq.com
 * CreateTime: 2020/2/7 10:42
 */

import {Column, Entity, PrimaryColumn} from 'typeorm';

@Entity()
export class Article {
    @PrimaryColumn({
        type: 'bigint',
        comment: '文章id',
        nullable: false,
    })
    id: number;

    @Column({
        type: 'int',
        comment: '作者',
        nullable: false,
    })
    authorId: number;
    
    @Column({
        type: 'text',
        comment: '文章标题',
        nullable: false,
    })
    artTitle: string;

    @Column({
        type: 'text',
        comment: '文章所属板块：code or life',
        nullable: false,
    })
    artType: string;

    @Column({
        type: 'text',
        comment: '文章摘要',
        nullable: false,
    })
    abstract: string;

    @Column({
        type: 'text',
        comment: '文章分类',
        nullable: false,
    })
    category: string;

    @Column({
        type: 'text',
        comment: '文章标签',
        nullable: false,
    })
    tag: string;

    @Column({
        type: 'text',
        comment: '文章缩略图',
        nullable: true,
    })
    thumbnail: string;

    @Column({
        type: 'text',
        comment: '文章内容',
        nullable: false,
    })
    content: string;

    @Column({
        type: 'bigint',
        comment: '文章发布时间',
        nullable: false,
    })
    cdate: number;

    @Column({
        type: 'bigint',
        comment: '文章修改时间',
        nullable: false,
    })
    editdate: number;

    @Column({
        type: 'int',
        comment: '文章浏览量',
        nullable: false,
        default: 0,
    })
    pv: number;

    @Column({
        type: 'int',
        comment: '文章留言数',
        nullable: false,
        default: 0,
    })
    discuss: number;

    @Column({
        type: 'int',
        comment: '文章状态：1-公开；0-未公开',
        nullable: false,
        default: 0,
    })
    status: number;
    @Column({
        type: 'int',
        comment: '文章是否允许评论：1-允许；0-不允许',
        nullable: false,
        default: 1,
    })
    artDiscuss: number;

}
