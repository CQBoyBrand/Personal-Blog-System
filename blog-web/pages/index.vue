<template>
  <list :articleList="articleList" ></list>
</template>

<script setup>
  import { getArtByType, setVisitInfo } from '~/api/service';
  import list from '../components/articleList'
  const route = useRoute()
  const page = route.query.page;
  const {data: articleList} = await getArtByType({
      currentPage: page || 1,
      artType: 'code',
      limit: 10
    });
    setVisitInfo()
    useHead({
      title: '首页 | Code - 重庆崽儿Brand的网络世界',
    })
</script>

<style lang="">

</style>
