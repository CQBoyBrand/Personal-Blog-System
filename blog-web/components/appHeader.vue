<template>
  <header class="app-header">
    <nav class="nav_wrap clearfix" v-if="!isMobile">
      <h2 class="logo"><a href="/" title="重庆崽儿Brand">重庆崽儿Brand</a></h2>
      <div class="nav_box transition-box" v-show="isShow">
        <NuxtLink class="linkItem" to="/" >代码</NuxtLink>
        <NuxtLink class="linkItem" to="/life">生活</NuxtLink>
        <NuxtLink class="linkItem" to="/archives">归档</NuxtLink>
        <NuxtLink class="linkItem" to="/friends">友链</NuxtLink>
        <NuxtLink class="linkItem" to="/about">关于我</NuxtLink>
        <span class="linkItem">
          <form autocomplete="off" @submit.prevent="searchHandle">
            <div class="search_container">
              <input
                class="search_input"
                type="text" v-model="searchval" placeholder="输入文章关键词">
              <span class="search_btn" @click="searchHandle">
                <img :src="searchSvg" alt="">
              </span>
            </div>
          </form>
        </span>
      </div>
    </nav>
    <nav class="nav_wrap clearfix" v-else>
      <h1 class="logo">重庆崽儿Brand</h1>
      <div class="menu_icon">
        <img @click="showMenu($event)" src="@/assets/images/menu.svg" alt="">
      </div>
        <ul class="nav_box transition-box" v-show="isShow">
          <nuxt-link to="/" tag="li" @click.native="menuToggle">代码</nuxt-link>
          <nuxt-link to="/life" tag="li" @click.native="menuToggle">生活</nuxt-link>
          <nuxt-link to="/archives" tag="li" @click.native="menuToggle">归档</nuxt-link>
          <nuxt-link to="/friends" tag="li" @click.native="menuToggle">友链</nuxt-link>
          <nuxt-link to="/about" tag="li" @click.native="menuToggle">关于我</nuxt-link>
          <a>
            <form autocomplete="off" @submit.prevent="searchHandleMob" style="width: 96%;">
              <div class="search_container">
                <input
                  class="search_input"
                  @focus="isFocus=true"
                  @blur="isFocus=false"
                  type="text" v-model="searchval" placeholder="输入文章关键词">
                <span class="search_btn" @click="searchHandle">
                  <img :src="searchSvg" alt="">
                </span>
              </div>
            </form>
          </a>
        </ul>
    </nav>
  </header>
</template>

<script setup>
  import * as htmlparser from 'htmlparser2'
  import searchSvg from "@/assets/images/search.svg";
  let isMobile = ref(false);
  let isShow = ref(false);
  let isFocus = ref(false);
  let searchval = ref("");
  let router = useRouter()
  const searchHandle = () => {
     let result = ''
    let parser = new htmlparser.Parser({
          onopentag: function (name, attribs) {
            if (name === "script" || name === 'style' || name === "img" || name === 'frame' || name === 'iframe' ||
              name === "link") {
              // alert('小朋友不乖哟，不要乱输入！')
            }
          },
          ontext: function (text) {
            result += text
          },
          onclosetag: function (tagname) {
            if (tagname === "script" || tagname === "style" || tagname === "frame" || tagname === "iframe") {

            }
          }
        }, {decodeEntities: true})
        parser.write(searchval.value)
        parser.end()
        searchval.value = result;
      if (searchval.value.trim() === "") {
        return;
      }
      router.push({
        name: "search-keywords",
        params:{
          keywords: searchval.value
        },
      })

      searchval.value = ''
      return false
  }
  const menuToggle = () => {
    isShow.value = !isShow.value;
  }
  const showMenu = (event) => {
    event.stopPropagation()
        isShow.value = !isShow.value
  }

  onMounted(() => {
    if (document.body.clientWidth < 769) {
        isShow.value = false
        isFocus.value = false
        isMobile.value = true
      } else {
        isShow.value = true
        isMobile.value = false
      }
      document.onclick = function () {
        if (isMobile.value && !isFocus.value) {
          isShow.value = false
        }

      }
      window.addEventListener('resize', function () {
        if (document.body.clientWidth < 769) {
          isShow.value = false
          isMobile.value = true
        } else {
          isShow.value = true
          isMobile.value = false
        }
      }, false)
  })
</script>

<style lang="scss">
  .app-header {
    background-color: #fff;
    height: 60px;
    width: 100%;
    line-height: 60px;
    position: fixed;
    top: 0;
    z-index: 9999;
    min-width: 320px;
    box-shadow: 0 0px 1px #eee;

    .nuxt-link-exact-active {
      color: #000 !important;
      font-weight: bold;
    }

    .menu_icon {
      display: none;
    }

    .nav_wrap {
      max-width: 1140px;
      margin: 0 auto;
      position: relative;
      z-index: 9999;
      padding: 0 15px;
      box-sizing: border-box;

      .logo {
        float: left;
        padding-left: 20px;
        font-style: oblique;
      }

      .nav_box {

        .linkItem {
          float: left;
          padding: 0 15px;
          list-style: none;
          cursor: pointer;
          font-size: 13px;
          color: #000;

          &:hover {
            color: #000;
            font-weight: bold;
          }
        }
      }

      .search_container {
        position: relative;
        height: auto;
        width: 187px;
        margin: 0 auto;
        &:hover {
          color: #666;
          font-weight: normal;
        }
        input {
          outline: none;
          border: 1px solid #ccc;
          border-radius: 5px;
          line-height: 30px;
          padding: 0 38px 0 8px;
          box-sizing: border-box;
        }
        .search_btn {
          position: absolute;
          right: 0;
          top: 15px;
          width: 30px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border-left: 1px solid #ccc;
          cursor: pointer;
          img {
            width: 20px;
            height: 20px;
            margin-top: 5px;
          }
        }
      }

      
    }
    @media screen and (min-width: 768px) {
      .nav_box {
        display: flex;
        float: left;
      }
      
    }
    @media screen and (max-width: 768px) {
      .menu_icon {
        display: block;
        float: right;
        width: 30px;
        height: 30px;
        margin-top: 8px;
        img {
          display: inline-block;
          width: 100%;
        }
      }
      .logo {
        font-size: 18px;
      }
      .nav_box {
        position: absolute;
        top: 60px;
        left: 0;
        right: 0;
        width: 100%;
        background-color: #fff;
        padding: 0;
        text-align: center;
        box-shadow: 0 5px 5px #eee;

        a {
          float: none !important;
          width: 100%;
          display: block;
          color: #000;
        }

        a + a {
          border-top: 1px solid #eee;
        }
      }
    }
  }
</style>
