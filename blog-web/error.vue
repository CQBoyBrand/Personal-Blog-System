<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})
// console.log("err=", props.error)
</script>

<template>
  <div class="wrap">
      <div class="logo">
          <h1>{{props.error?.statusCode}}</h1>
          <p>{{ props.error?.statusMessage }}</p>
          <div class="sub">
              <p><NuxtLink to="/">Go back home</NuxtLink></p>
          </div>
      </div>
  </div>
</template>
<style scoped>
body {
    background: #f3f3e1;
}
.wrap {
    margin: 0 auto;
    width: 1000px;
}
.logo {
    margin-top: 50px;
}
.logo h1 {
    font-size: 200px;
    color: #8F8E8C;
    text-align: center;
    margin-bottom: 1px;
    text-shadow: 1px 1px 6px #fff;
}
.logo p {
    color: rgb(228, 146, 162);
    font-size: 20px;
    margin-top: 1px;
    text-align: center;
}
.logo p span {
    color: lightgreen;
}
.sub {
  margin-top: 15px;
}
.sub a {
  display: inline-block;
    color: white;
    background: #0c9eed;
    text-decoration: none;
    padding: 7px 120px;
    font-size: 16px;
    line-height: 30px;
    font-family: arial, serif;
    font-weight: bold;
    -webkit-border-radius: 3em;
    -moz-border-radius: .1em;
    -border-radius: .1em;
}
</style>
