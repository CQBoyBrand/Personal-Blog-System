<template>
  <div class="article_id clearfix">
    <div class="left-content" v-if="articleDetail.artTitle">
      <h2 class="article-title">{{articleDetail.artTitle}}</h2>
      <p class="article-info"><span>发布于：{{articleDetail.cdate.split(" ")[0]}}</span><span>{{articleDetail.pv}} 次浏览</span><span>{{commentsList.total}} 条评论</span>
      </p>
      <div class="article-content" id="r-md-preview">
        <div v-html="htmlData">

        </div>
      </div>
      <div class="article-type">
        <p>文章归类于：
          <span :to="`/category/${articleDetail.category}`" class="category">{{articleDetail.category}}</span>
        </p>
        <p class="art_tag">文章标签：
          <span :to="`/tag/${item}`" v-for="(item,index) in tagList" :key="index" class="tags">#{{item}}</span>
        </p>
        <p class="art_tag">版权声明：
          <a href="https://creativecommons.org/licenses/by-nc/3.0/cn/deed.zh" target="_blank"> 自由转载-署名-非商用</a>
        </p>
      </div>
    </div>
    <div v-else class="left-content not-found">
      咦，你要找的东西好像不见了
    </div>


    <!--评论-->
    <!-- <comment :artDiscuss="articleDetail.artDiscuss" :commentsList="commentsList" :commentId="{id:articleDetail.id}"></comment> -->
  </div>
</template>

<script setup>
  import { getArtDetail, getComment } from "~/api/service";
  import { mdRender } from "../../utils/utils"
  let tagList = [];
  const { params } = useRoute()
  const articleId = params.id;
  const {data: articleDetail} = await getArtDetail({
      id: articleId
    });
  const {data: commentsList} = await getComment({
      artId: params.id,
      currentPage: 1,
      limit: 10
    });
  tagList = articleDetail.tag.split(",");
  const htmlData = ref("");
  htmlData.value = await mdRender(articleDetail.content)
  useHead({
    title: articleDetail.artTitle,
    meta: [
      { name: 'keywords', content: articleDetail.abstract },
      { name: 'description', content: articleDetail.abstract }
    ]
  })
</script>

<style lang="scss">
  .el-message {
    top: 65px!important;
  }

  .article_id {
    background-color: #fff;
    padding: 15px;
    .article-title {
      text-align: center;
      font-size: 20px;
      color: #666;
      margin: 16px 0;
    }

    .article-info {
      text-align: center;
      font-size: 12px;
      color: #999;
      padding-bottom: 15px;

      span {
        padding: 0 6px;
      }
    }

    .article-content {
      img{
        border-radius: 8px;
      }
    }
    #r-md-preview{
      @media screen and (max-width: 920px) {
        padding-left: 0;
        padding-right: 0;
      }
    }

    .article-type {
      /*border-top: 2px solid #ccc;*/
      border-left: 2px solid #ccc;
      background-color: #f6f8fa;
      margin-top: 30px;
      margin-bottom: 15px;
      padding: 15px 0 15px 15px;
      font-size: 14px;

      p {
        padding-bottom: 5px;
      }

      .category, .tags ,a {
        color: #409EFF;
        text-decoration: underline;
        font-weight: bold;
      }
    }

    .art_tag {
      .tags ,a {
        padding: 0 6px;
      }
    }

    .not-found{
      text-align: center;
    }
  }
</style>
