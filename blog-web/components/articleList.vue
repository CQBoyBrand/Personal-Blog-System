<template>
  <article class="articleList">
    <section v-if="total > 0 && articleList.length > 0" class="article-item" v-for="(item, index ) in articleList" :key="index">
      <NuxtLink :to="`/article/${item.id}`">
        <h3 class="article-title">{{item.artTitle}}</h3>
        <div class="article-info-container">
          <div class="article-thumbnail" v-if="!isMobile && item.thumbnail">
            <img :src="item.thumbnail" alt="">
          </div>
          <div class="article-content-wrap" :class="showImage && (item.thumbnail != '') && !isMobile ? 'fl' : ''">
            <div class="article-abstract">
              {{item.abstract}}
            </div>
            <div class="article-statistics">
              <span>{{item.cdate.split(" ")[0]}}</span>·<span>{{item
              .pv}}</span>·
              <span>{{item.discuss}}</span>·<span>{{item.category}}</span>
            </div>
          </div>
        </div>
      </NuxtLink>
    </section>
    <div v-if="total > 0 && articleList.length > 0" class="page-nav">
      <div class="prevBtn page-change-btn" @click="prevPage">上一页</div>
      <div><span>{{currentPage}}</span>/<span>{{ Math.ceil(total / limit) }}</span></div>
      <div class="nextBtn page-change-btn" @click="nextPage">下一页</div>
    </div>
    <section v-else class="no-content">
      <p>暂无内容</p>
    </section>
  </article>
</template>

<script setup>
const props = defineProps({
  articleList: Object,
  total: Number,
})
const isMobile = ref(false);
const showImage = ref(false);
const { data: articleList, total, currentPage, limit} = props.articleList;
const router = useRouter()
const prevPage = () => {
  if (Number(currentPage) === 1) {
    return false;
  }
  router.push({ query: { page: Number(currentPage) - 1 } })
  window.scrollTo(0, 0)
}
const nextPage = () => {
  if (currentPage >= Math.ceil(total / limit)) {
    return false;
  }
  router.push({ query: { page: Number(currentPage) + 1} })
  window.scrollTo(0, 0)
}
</script>

<style lang="scss">
  .articleList {
    background-color: #fff;
    padding: 15px;
    min-height: 100px;
    height: 100%;
    position: relative;
    @media screen and (max-width: 768px) {
    .article-thumbnail {
      display: none;
    }
  }
    .article-item {
      padding-bottom: 15px;
      border-bottom: 2px dotted #eee;
      .article-title {
        padding: 10px 0;
        width: 100%;
        color: #000;
        // white-space: nowrap;
        // overflow: hidden;
        // text-overflow: ellipsis;
        transition: padding-left 0.5s;
        &:hover {
          text-decoration: underline;
          color: #409eff;
          padding-left: 6px;
        }

        .article-type {
          font-style: italic;
          span {
            padding: 0 3px;
          }
        }

        .original {
          color: #005cc5;
          font-weight: normal;
          padding-right: 3px;
        }
      }

      .article-info-container{
        display: flex;
        .article-thumbnail{
          width: 200px;
          height: 100px;
          border: 1px solid #eee;
          margin-right: 15px;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
            transition: all 0.6s;
            &:hover{
              transform: scale(1.4);
            }
          }
        }
        .article-content-wrap{
          flex: 1;
          display: flex;
          flex-direction: column;
          font-size: 16px;
          .article-abstract{
            flex: 1;
            line-height: 24px;
            min-height: 60px;
          }
          .article-statistics{
            height: 20px;
            font-size: 13px;
            line-height: 20px;
            display: flex;
            align-items: center;
            span{
              padding: 0 5px;
              display: flex;
              align-items: center;
              &:first-child{
                padding-left: 0;
              }
              .svg-icon{
                width: 16px;
                height: 16px;
                margin-right: 3px;
              }
            }
          }
        }
      }

    }

    .article-item + .article-item {
      padding-top: 15px;
    }
    .page-nav {
      display: flex;
      width: 100%;
      justify-content: space-between;
      margin-top: 15px;
      font-size: 14px;
      .page-change-btn {
        cursor: pointer;
      }
    }
    .no-content{
      height: 100%;
      // position: relative;
      p{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
      }
    }
  }
</style>
