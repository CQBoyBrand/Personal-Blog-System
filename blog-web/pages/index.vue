<template>
  <list :articleList="articleList" ></list>
</template>

<script setup>
  import { getArtAll } from '~/api/service';
  import list from '../components/articleList'
  const route = useRoute()
  const page = route.query.page;
  const {data: articleList} = await getArtAll({
      currentPage: page || 1,
      artType: 'code',
      limit: 10
    });
</script>

<style lang="">

</style>
