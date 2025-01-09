<template>
  <article class="keywords">
    <section class="artList-by-type">
      <p class="type-title">搜索<span>{{keywords}}</span>相关的文章</p>
      <p class="type-total">共找到<span>{{articleList.total || 0}}</span>篇</p>
    </section>
    <list :articleList="articleList"></list>
  </article>
</template>

<script setup>
  import { getArtByKeyword, setVisitInfo } from '~/api/service';
import list from '../../components/articleList'
  const { params } = useRoute()
  const keywords = params.keywords;
  const route = useRoute()
  const page = route.query.page;
  const {data: articleList} = await getArtByKeyword({
    keyword: keywords,
    currentPage: page || 1,
    limit: 10
  })
  setVisitInfo()
  useHead({
    title: '搜索 | Search - 重庆崽儿Brand的网络世界',
  })
</script>

<style  lang="scss">
.keywords{
  display: flex;
  flex-direction: column;
  .artList-by-type{
    background-color: #fff;
    padding: 15px;
    margin-bottom: 15px;
    text-align: center;
    font-size: 16px;
    .type-title{
      padding-bottom: 10px;
      span{
        color: orange;
        font-weight: bold;
        border-radius: 4px;
        padding: 5px;
        margin: 0 5px;
      }
    }
    .type-total{
      span{
        margin: 0 5px;
        color: orange;
        font-weight: bold;
      }
    }
  }
}
</style>
