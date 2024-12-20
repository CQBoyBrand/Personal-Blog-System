<template>
  <article class="categoryname">
    <section class="artList-by-type">
      <p class="type-title">归类在<span>{{categoryName}}</span>下的文章</p>
      <p class="type-total">共有<span>{{articleList.total || 0}}</span>篇</p>
    </section>
    <list :articleList="articleList"></list>
  </article>
</template>

<script setup>
  import { getArtByCategory, getFontCategoryList } from '~/api/service';
  import list from '../components/articleList'
  import { useRoute } from 'vue-router';
  const { params } = useRoute()
  const route = useRoute()
  const page = route.query.page;
  const categoryid = params.categoryid;
  const {data: articleList} = await getArtByCategory({
    limit: 10,
    currentPage: page || 1,
    categoryid: categoryid
  });
  const {data: categoryList} = await getFontCategoryList();

  let categoryName = ref("");
  categoryList.map(item => {
    if (Number(item.id) === Number(categoryid)){
      categoryName.value = item.categoryname;
    }
  })
</script>

<style lang="scss">
.categoryname{
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
