/**
 * Author：Brand
 * Email：brandhuang@qq.com
 * CreateTime: 2020/2/11 18:36
 * Description:
 */
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Category {
    @PrimaryGeneratedColumn({
        type: 'int',
        comment: 'id',
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
        comment: '分类名称',
        nullable: false,
    })
    categoryname: string;

    @Column({
        type: 'text',
        comment: '分类描述',
        nullable: false,
    })
    categorydesc: string;

    @Column({
        type: 'text',
        comment: '分类所属板块：code or life',
        nullable: false,
    })
    categorytype: string;

    @Column({
        type: 'int',
        comment: '分类状态, 1-可用，0-不可用',
        nullable: false,
        default: 0,
    })
    status: number;

    @Column({
        type: 'bigint',
        comment: '创建时间',
        nullable: false,
        default: new Date().getTime(),
    })
    cdate: number;
}
