<template>
  <div class="article_id clearfix">
    <div class="left-content" v-if="articleDetail.artTitle">
      <h2 class="article-title">{{articleDetail.artTitle}}</h2>
      <p class="article-info"><span>发布于：{{articleDetail.cdate.split(" ")[0]}}</span><span>{{articleDetail.pv}} 次浏览</span><span>{{commentsList.total}} 条评论</span>
      </p>
      <div v-if="articleDetail.id" class="article-copy">
        <div>作者：重庆崽儿Brand</div>
        <div>
          From: <a :href="artUrl">{{ artUrl }}</a>
        </div>
      </div>
      <div class="article-content" id="r-md-preview">
        <div v-html="htmlData">

        </div>
      </div>
      <!-- <div>
        <UnionAd id="u6997881"></UnionAd>
      </div> -->
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

    <div id="lightbox" class="lightbox">
        <img id="lightboxImg" src="" alt="preview">
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
    const artUrl = `https://www.brandhuang.com/article/${ articleDetail.id}` || "";
  const {data: commentsList} = await getComment({
      artId: params.id,
      currentPage: 1,
      limit: 10
    });
  tagList = articleDetail?.tag.split(",");
  const htmlData = ref("");
  htmlData.value = await mdRender(articleDetail.content)
  onMounted(() => {
    const preview = document.getElementById("r-md-preview");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
   // 绑定图片点击事件（放大）
    function bindImageClickEvent() {
      const images = preview.querySelectorAll("img");
      images.forEach(img => {
          img.style.cursor = "pointer"; // 让鼠标变成手型，提示可点击
          img.addEventListener("click", () => {
              lightboxImg.src = img.src;
              lightbox.style.display = "flex";
          });
      });
    }

    // 关闭放大图片
    lightbox.addEventListener("click", () => {
        lightbox.style.display = "none";
    });
    bindImageClickEvent()
  })
  useHead({
    title: articleDetail.artTitle + " - 重庆崽儿Brand的网络世界",
    meta: [
      { name: 'keywords', content: tagList.join(",") + ", " + articleDetail.abstract },
      { name: 'description', content: tagList.join(",") + ", "  + articleDetail.abstract }
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
    .article-copy {
      font-size: 12px;
      color: #999;
      padding: 0 15px;
      box-sizing: border-box;
      a {
        color: #409EFF;
      }
    }
    .article-title {
      text-align: center;
      font-size: 24px;
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
    /* 图片放大样式 */
    .lightbox {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;z-index: 99999;
            background: rgba(0, 0, 0, 0.8); display: flex;
            justify-content: center; align-items: center;
            display: none; /* 默认隐藏 */
        }
        .lightbox img {
            max-width: 90vw; max-height: 90vh;
            border-radius: 10px; box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
        }
  }
</style>
