<template>
  <article class="friends">
    <section class="firends-container">
      <div class="friends-title">换个友链？</div>
      <!--          <div class="friends-big-image"><img src="@/assets/images/friends.gif" alt=""></div>-->
      <div class="friends-title">注意事项：</div>
      <ol class="friends-attention">
        <li><span>先友后链</span>，重要的事情只说一遍！</li>
        <li><span>连续三天</span> 不可访问将单向删除！</li>
        <li>站点涉及 <span>敏感内容</span>永拒！！</li>
        <li>其他待定</li>
      </ol>
      <div class="friends-title">申请方式：</div>
      <div class="apply-format">
        <div class="apply-tips">请复制如下格式在评论区留言，或者给我 <a href="mailto:brandhuang@qq.com">发邮件</a></div>
        <div class="format-code">
          <p>[必填]站点名称：重庆崽儿Brand</p>
          <p>[必填]站点链接：[http://www.brandhaung.com](http://www.brandhaung.com)</p>
          <p>[选填]站点介绍：工作、生活、诗与远方</p>
          <p>[选填]站点头像：https://s.gravatar.com/avatar/d8065bea49aa2877ce13686772727711?s=80</p>
        </div>
      </div>
      <ul class="friends-box clearfix">
        <li v-for="(link, i) in linkList" :key="i">
          <a :href="link.siteUrl" target="_blank" ref="nofollow">{{link.siteName}}</a>
        </li>
      </ul>
    </section>
    <section>
      <!--评论-->
      <!-- <comment :artDiscuss="1" :commentsList="commentsList" :commentId="{id: 0}"></comment> -->
    </section>
  </article>
</template>

<script setup>
import { getlinkList, setVisitInfo } from '~/api/service';
// const linkList = [];
  const {data: linkList} = await getlinkList();
  setVisitInfo()
  useHead({
    title: '友链 | Friends - 重庆崽儿Brand的网络世界',
  })
  // const {data: commentsListData} = await useFetch('http://localhost:3002/link/getlinkList', {
  //   method: "POST",
  // });
  // const commentsList = commentsListData.value.data;
</script>

<style lang="scss">
  .friends {
    background-color: #fff;
    padding: 20px 10px;

    .firends-container {
      max-width: 800px;
      margin: 0 auto;

      .friends-big-image {
        width: 280px;
        height: 280px;
        margin: 0 auto;

        img {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }

      .friends-title {
        font-weight: bold;
        color: #333;
        padding: 15px 0;
        font-size: 16px;
      }

      .friends-attention {
        padding: 0 22px;
        font-size: 13px;
        line-height: 24px;

        li {
          font-weight: bold;

          span {
            color: orangered;
          }
        }
      }

      .apply-format {
        .format-code {
          background-color: #f6f8fa;
          color: #333;
          padding: 10px;
          font-size: 13px;
          line-height: 20px;
          word-break: break-all;
          margin-top: 10px;
        }
        .apply-tips{
          font-size: 12px;
          a{
            color: #409EFF;
          }
        }
      }

      .friends-box {
        display: flex;
        flex-wrap: wrap;
        padding: 10px 0;

        li {
          list-style: none;
          float: left;
          width: 33%;
          text-align: center;
          margin-bottom: 15px;

          a {
            background-color: #2b2b2b;
            color: #fff;
            display: inline-block;
            width: 80%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 0 auto;
            padding: 15px 10px;
          }
        }
      }
    }
  }
</style>
