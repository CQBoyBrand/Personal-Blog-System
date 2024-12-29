/**
 * Author：Brand
 * Email：brandhuang@qq.com
 * CreateTime: 2020/2/18 14:06
 * Description:
 */
export interface ArticleInterface {
    id: number;
    authorId: number;
    artTitle: string;
    abstract: string;
    category: string;
    tag: string;
    thumbnail: string;
    content: string;
    cdate: number;
    editdate: number;
    pv: number;
    discuss: number;
    status: number;
}
