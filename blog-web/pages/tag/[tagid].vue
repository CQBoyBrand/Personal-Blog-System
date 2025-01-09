<template>
  <article class="tagname">
    <section class="artList-by-type">
      <p class="type-title">与<span>{{tagName}}</span>标签相关的文章</p>
      <p class="type-total">共找到<span>{{articleList.total || 0}}</span>篇</p>
    </section>
    <list :articleList="articleList"></list>
  </article>
</template>

<script setup>
  import { getArticleListByTag, getFontTagList, setVisitInfo } from '~/api/service';
import list from '../../components/articleList'
  import { useRoute } from 'vue-router';
  const { params } = useRoute()
  const tagid = params.tagid;
  const route = useRoute()
  const page = route.query.page;
  const { data: articleList } = await getArticleListByTag({
    limit: 10,
    currentPage: page || 1,
    tagid: tagid
  })
  const {data: tagList} = await getFontTagList();
  let tagName = ref("");
  tagList.map(item => {
    if (Number(item.id) === Number(tagid)){
      tagName.value = item.tagname;
    }
  })
  setVisitInfo()
  useHead({
    title: '标签 | Tag - 重庆崽儿Brand的网络世界',
  })
</script>

<style  lang="scss">
.tagname{
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
