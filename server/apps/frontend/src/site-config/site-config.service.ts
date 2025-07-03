import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Config} from '@libs/db/entity/config.entity';
import {Repository} from 'typeorm';
import { Article } from '@libs/db/entity/article.entity';

@Injectable()
export class SiteConfigService {
    constructor(
        @InjectRepository(Config)
        private readonly configRepo: Repository<Config>,
        @InjectRepository(Article)
        private readonly articleRepo: Repository<Article>,
    ) {}

    async getConfig(): Promise<any> {
        const config = await this.configRepo.query(` select * from config`);
        return config[0];
    }
    async generateRSS(): Promise<any> {
      const artList = await this.articleRepo.createQueryBuilder('article')
        .where('article.status = :status', {status: 1})
        .take(10)
        .orderBy('article.cdate', 'DESC')
        .getMany();
      const items = artList.map(post => `
      <item>
        <title><![CDATA[${post.artTitle}]]></title>
        <link>https://www.brandhuang.com/article/${post.id}</link>
        <guid>https://www.brandhuang.com/article/${post.id}</guid>
        <pubDate>${new Date(Number(post.cdate)).toUTCString()}</pubDate>
        <description><![CDATA[${post.abstract || ''}]]></description>
      </item>
    `).join('');
        return`<?xml version="1.0" encoding="UTF-8" ?>
      <rss version="2.0">
        <channel>
          <title>重庆崽儿Brand的网络世界</title>
          <link>https://www.brandhuang.com</link>
          <language>zh-CN</language>
          <description>重庆崽儿Brand的个人博客, 记录和分享生活成长、代码、诗与远方</description>
          ${items}
        </channel>
      </rss>`;
    }
    async generateSitemap(): Promise<any> {
      const articles = await this.articleRepo.find({
        where: { status: 1 },
        order: { cdate: 'DESC' }
      })
      const urls = articles.map(article => `
        <url>
          <loc>https://www.brandhuang.com/article/${article.id}</loc>
          <lastmod>${new Date(Number(article.cdate)).toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `).join('');
      return `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>https://www.brandhuang.com/</loc>
          <changefreq>daily</changefreq>
          <priority>1.0</priority>
        </url>
        ${urls}
      </urlset>`
    }
}
