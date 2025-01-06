<template>
  <article class="archives">
    <section class="archive-title">
      <p class="archive-desc">那些年，那些人，那些事</p>
      <p class="archive-tips">这里共有<span>{{archiveData.total}}</span>条线索</p>
    </section>
    <section class="time-list-wrap clearfix" v-if="archiveData.total > 0">
      <div class="art-list">
        <div v-for="(item,index) in returnDateArr(archiveData.list)" :key="index">
          <a :id="`#${item}`" class="times">YEAR-{{item}}({{returnArtList(archiveData.list,item).length}})</a>
          <ul class="art-list-detail">
            <li class="art-detail-item" v-for="(list,listIndex) in returnArtList(archiveData.list,item)" :key="listIndex">
              <span class="date">{{list.cdate}}</span><NuxtLink :to="`/article/${list.id}`"
                                                                :title="list.artTitle">{{list
              .artTitle}}</NuxtLink><span class="views">{{list.pv}}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section v-else class="no-data">
      咦，这里的线索不见了～
    </section>
  </article>
</template>

<script setup>
import { getArchive, setVisitInfo } from '~/api/service';

  useHead({
    title: '归档 | Archives',
    meta: [
      { name: 'keywords', content: '归档,Archives' },
      { name: 'description', content: '重庆崽儿Brand的个人博客,归档 | Archives' }
    ]
  })
  const {data: archiveData} = await getArchive(); 
  let actived = ref(0)
    const changeActived = (index) => {
      actived = index
    }
    const returnDateArr = (obj) => {
      let dateArr =[]
      for (let dates in obj){
        dateArr.push(dates)
      }
      return dateArr.reverse()
    }
    const returnArtList = (obj,date) => {
      return obj[date]
    }
    setVisitInfo()
</script>

<style lang="scss">
  .archives {
    background-color: #fff;
    .no-data{
      text-align: center;
      font-size: 13px;
      line-height: 60px;
    }
    .archive-title {
      text-align: center;
      padding: 15px 0;

      // .archive-desc {
      // }

      .archive-tips {
        padding-top: 8px;
        font-size: 16px;
        color: #999;

        span {
          padding: 0 8px;
          color: orange;
          font-weight: bold;
          font-style: italic;
        }
      }
    }

    .time-list-wrap {
      .art-list {
        padding:0 15px;
        font-size: 13px;
        .times {
          display: block;
          text-align: center;
          padding: 20px 0;
          font-size: 20px;
          font-weight: bold;
        }

        .art-list-detail {
          display: flex;
          flex-direction: column;
          justify-content: center;
          .art-detail-item {
            line-height: 30px;
            list-style: none;
            display: flex;
            align-items: center;
            .date {
              padding-right: 10px;
              display: inline-block;
              width: 88px;
            }
            .views{
              margin-left: auto;
              display: flex;
              align-items: center;
              .svg-icon{
                width: 16px;
                height: 16px;
                margin-right: 3px;
              }
            }

            a {
              flex: 1;
              text-decoration: underline;
              transition:all 0.5s;
              &:hover{
                color: #409eff;
                font-weight: bold;
                padding-left: 5px;
              }
            }
          }
        }

        a:target {
          padding-top: 70px;
          margin-top: -60px;
        }
      }

      @media screen and (max-width: 769px) {
        .art-list {
          margin: 0 auto;
          a{
            max-width: 500px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
      @media screen and (max-width: 768px) {
        .art-list-detail{
          a{
            display: inline-block;
            width: calc(100% - 96px);
          }
        }
      }
    }
  }
</style>
