<template>
  <div class="exception-page">
    <div class="img">
      <img :src="config[type].img" />
    </div>
    <div class="content">
      <h1>{{config[type].title}}</h1>
      <div class="desc">{{config[type].desc}}</div>
      <div class="action">
        <el-button type="primary" size="large" @click="backHome">返回首页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Config from './typeConfig.js';

export default {
  name: 'ExceptionPage',
  props: ['type'],
  setup(ctx) {
    function backHome() {
      ctx.$router.push('/');
    }
    return {
      config: Config,
      backHome: backHome,
    }
  },
};
</script>

<style lang="postcss" scoped>
.exception-page {
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  .img {
    padding-right: 52px;
    zoom: 1;
    img {
      max-width: 430px;
    }
  }
  .content {
    h1 {
      color: #434e59;
      font-size: 72px;
      font-weight: 600;
      line-height: 72px;
      margin-bottom: 24px;
    }
    .desc {
      font-size: 20px;
      line-height: 28px;
      margin-bottom: 16px;
    }
  }
}
</style>
