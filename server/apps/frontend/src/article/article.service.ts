import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Article} from '@libs/db/entity/article.entity';
import {Repository} from 'typeorm';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private readonly articleRepo: Repository<Article>,
    ) {
    }

    async getArticleDetail(params): Promise<any> {
        const sqlQuery = await this.articleRepo.query(`
            select A.id, A.artTitle, A.abstract, A.artDiscuss,A.artType,
            (SELECT categoryname FROM category where status = 1 and FIND_IN_SET(A.category, id) ) as category,
            GROUP_CONCAT(T.tagname) as tag,
            A.thumbnail, A.pv,
            (SELECT COUNT(*) FROM comment where artId = A.id and isChecked = 1 ) as discuss,
             A.content,
            FROM_UNIXTIME(A.cdate/1000,'%Y-%m-%d %H:%i') as cdate
            from article as A
            left join tag as T
            on FIND_IN_SET(T.id , A.tag)
            where A.status = 1 and A.id = ${params.id}
             group by A.id
        `);
        const articleDetail = sqlQuery[0];
        if (articleDetail.pv >= 0) {
            const newPv = articleDetail.pv + 1;
            articleDetail.pv = newPv;
            return await this.articleRepo.update(articleDetail.id, {
                pv: newPv,
            }).then( (res) => {
                return articleDetail;
            }).catch( err => {
            });
        }

    }

    async getHotArticleList(): Promise<any> {
        const artList = await this.articleRepo.createQueryBuilder('article')
            .where('article.status = :status', {status: 1})
            .take(10)
            .orderBy('article.pv', 'DESC')
            .getMany();
        return artList;
    }

    async getArchive(): Promise<any> {
        const archiveList = await this.articleRepo.query(`
            select A.id, A.artTitle, A.abstract,
            (SELECT categoryname FROM category where status = 1 and FIND_IN_SET(A.category, id) ) as category,
            GROUP_CONCAT(T.tagname) as tag,
             A.thumbnail,
             A.pv,
            (SELECT COUNT(*) FROM comment where artId = A.id and isChecked = 1 ) as discuss,
             A.content,
            FROM_UNIXTIME(A.cdate/1000,'%Y-%m-%d') as cdate
            FROM article as A
            left join tag as T
            on FIND_IN_SET(T.id , A.tag)
            WHERE A.status = 1
            group by A.id
            ORDER BY A.cdate DESC;
        `);
        const archiveCount = await this.articleRepo.createQueryBuilder('article')
            .where('article.status = :status', {status: 1})
            .getCount();

        function getDateArr(arr) {
            const yearObj = {};
            const monthObj = {};
            for (let i = 0, len = arr.length; i < len; i++) {
                const YearIndex = arr[i].cdate.indexOf('-');
                const yearDate = arr[i].cdate.substr(0, YearIndex);
                if (!yearObj[yearDate]) {
                    yearObj[yearDate] = [];
                    yearObj[yearDate].push(arr[i]);
                } else {
                    yearObj[yearDate].push(arr[i]);
                }

            }
            return yearObj;
        }

        const result = {
            list: getDateArr(archiveList),
            total: archiveCount,
        };
        return result;
    }

    async getArticleListAll(params): Promise<any> {
       
        const artList = await this.articleRepo.query(`
            select
            A.id, A.artTitle, A.abstract,A.artType,
            (SELECT categoryname FROM category where status = 1 and FIND_IN_SET(A.category, id) ) as category,
            GROUP_CONCAT(T.tagname) as tag,
            A.thumbnail, A.pv,
            (SELECT COUNT(*) FROM comment where artId = A.id and isChecked = 1) as discuss,
            A.content,
            FROM_UNIXTIME(A.cdate/1000,'%Y-%m-%d %H:%i') as cdate
            from article as A
            left join tag as T
            on FIND_IN_SET(T.id , A.tag)
            where A.status = 1
            group by A.id
            ORDER BY A.cdate desc
            limit ${(params.currentPage - 1) * params.limit}, ${params.limit};
        `);
        const artCount = await this.articleRepo.createQueryBuilder('article')
            .where('article.status = :status', {status: 1})
            .getCount();

        const result = {
            list: artList,
            total: artCount,
        };
        return result;
    }

    async getArtListByTag(params): Promise<any> {
        const artListByTag = await this.articleRepo.query(`
            select
            A.id, A.artTitle,
            (SELECT categoryname FROM category where status = 1 and FIND_IN_SET(A.category, id) ) as category,
            GROUP_CONCAT(T.tagname) as tag,
            FROM_UNIXTIME(A.cdate/1000, '%Y-%m-%d %H:%i') as cdate,
            A.abstract, A.thumbnail,
            (SELECT COUNT(*) FROM comment where artId = A.id and isChecked = 1 ) as discuss,
            A.pv
            from article as A
            left join tag as T
            on FIND_IN_SET(T.id, A.tag)
            where A.status = 1
            AND FIND_IN_SET('${params.tagid}', A.tag)
            group by A.id
            ORDER BY A.cdate DESC
            limit ${(params.currentPage - 1) * params.limit}, ${params.limit};
        `);
        const artCount = await this.articleRepo.query(`
            SELECT COUNT(*) as total FROM article where status = 1 and FIND_IN_SET('${params.tagid}', tag);

        `);
        const result = {
            list: artListByTag,
            total: Number(artCount[0].total),
        };
        return result;
    }

    async getArtListByCategory(params): Promise<any> {
        const artListByCategory = await this.articleRepo.query(`
            select
            A.id, A.artTitle,
            (SELECT categoryname FROM category where status = 1 and FIND_IN_SET(A.category, id) ) as category,
            GROUP_CONCAT(T.tagname) as tag,
            FROM_UNIXTIME(A.cdate/1000, '%Y-%m-%d %H:%i') as cdate,
            A.abstract, A.thumbnail, A.pv,
            (SELECT COUNT(*) FROM comment where artId = A.id and isChecked = 1) as discuss
            from article as A
            left join tag as T
            on FIND_IN_SET(T.id, A.tag)
            where A.status = 1
            AND FIND_IN_SET('${params.categoryid}', A.category)
            group by A.id
            ORDER BY A.cdate DESC
            limit ${(params.currentPage - 1) * params.limit}, ${params.limit};
        `);
        const artCount = await this.articleRepo.query(`
            SELECT COUNT(*) as total FROM article where status = 1 and FIND_IN_SET('${params.categoryid}', category);

        `);
        const result = {
            list: artListByCategory,
            total: Number(artCount[0].total),
        };
        return result;
    }

    async getArtListByType(params): Promise<any> {
        const artListByType = await this.articleRepo.query(`
            select
            A.id, A.artTitle,
            (SELECT categoryname FROM category where status = 1 and FIND_IN_SET(A.category, id) ) as category,
            GROUP_CONCAT(T.tagname) as tag,
            FROM_UNIXTIME(A.cdate/1000, '%Y-%m-%d %H:%i') as cdate,
            A.abstract, A.thumbnail, A.pv,
            (SELECT COUNT(*) FROM comment where artId = A.id and isChecked = 1) as discuss
            from article as A
            left join tag as T
            on FIND_IN_SET(T.id, A.tag)
            where A.artType = "${params.artType}"
            AND A.status = 1
            group by A.id
            ORDER BY A.cdate DESC
            limit ${(params.currentPage - 1) * params.limit}, ${params.limit};
        `);
        const artCount = await this.articleRepo.query(`
            SELECT COUNT(*) as total FROM article where status = 1 and artType = "${params.artType}";

        `);
        const result = {
            list: artListByType,
            total: Number(artCount[0].total),
        };
        return result;
    }

    async getArtListByKeywords(params): Promise<any> {
        const artListByCategory = await this.articleRepo.query(`
            select
            A.id, A.artTitle,
            (SELECT categoryname FROM category where status = 1 and FIND_IN_SET(A.category, id) ) as category,
            GROUP_CONCAT(T.tagname) as tag,
            FROM_UNIXTIME(A.cdate/1000, '%Y-%m-%d %H:%i') as cdate,
            A.abstract, A.thumbnail, A.pv,
            (SELECT COUNT(*) FROM comment where artId = A.id and isChecked = 1) as discuss
            from article as A
            left join tag as T
            on FIND_IN_SET(T.id, A.tag)
            where (
                A.artTitle like "%${params.keyword}%"
                or
                A.abstract like "%${params.keyword}%"
            )
            AND A.status = 1
            group by A.id
            ORDER BY A.cdate DESC
            limit ${(params.currentPage - 1) * params.limit}, ${params.limit};
        `);
        const artCount = await this.articleRepo.query(`
            SELECT COUNT(*) as total FROM article where
            (
                artTitle like "%${params.keyword}%"
                or
                abstract like "%${params.keyword}%"
            )
            and status = 1 ;

        `);
        const result = {
            list: artListByCategory,
            total: Number(artCount[0].total),
        };
        return result;
    }
}
