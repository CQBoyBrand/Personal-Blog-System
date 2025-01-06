<template>
  <list :articleList="articleList"></list>
</template>

<script setup>
import { getArtByType, setVisitInfo } from '~/api/service';
import list from '../components/articleList'
const route = useRoute()
  const page = route.query.page;
const {data: articleList} = await getArtByType({
      currentPage: page || 1,
      artType: 'life',
      limit: 10
    });
    setVisitInfo()
</script>

<style lang="">

</style>
