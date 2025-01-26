<template>
  <list :articleList="articleList"></list>
</template>

<script setup>
import { getArtByType } from '~/api/service';
import list from '../components/articleList'
const route = useRoute()
  const page = route.query.page;
const {data: articleList} = await getArtByType({
      currentPage: page || 1,
      artType: 'life',
      limit: 10
    });
    useHead({
      title: '生活随笔 | Life - 重庆崽儿Brand的网络世界',
    })
</script>

<style lang="">

</style>
