<template>
  <list :articleList="articleList"></list>
</template>

<script setup>
import list from '../components/articleList'
const route = useRoute()
  const page = route.query.page;
const {data: lifeArticle, error} = await useFetch('http://localhost:3002/article/getArtByType', {
    method: "POST",
    body: JSON.stringify({
      currentPage: page || 1,
      artType: 'life',
      limit: 10
    })
  });
  const articleList = lifeArticle.value.data;
</script>

<style lang="">

</style>
