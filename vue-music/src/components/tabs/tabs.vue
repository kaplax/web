<template>
  <nav class="fmd-tabs">
      <router-link to="/recommend" class="fmd-tab"><div class="tab-text">推荐</div></router-link>
      <router-link to="/songMenu" class="fmd-tab"><div class="tab-text">歌单</div></router-link>
      <router-link to="/singer" class="fmd-tab"><div class="tab-text">歌手</div></router-link>
      <router-link to="/rank" class="fmd-tab"><div class="tab-text">排行</div></router-link>
      <router-link to="/mine" class="fmd-tab"><div class="tab-text">我的</div></router-link>
      <router-link to="/search" class="fmd-tab"><div class="tab-text">搜索</div></router-link>
  </nav>
</template>
<script>
export default {
  
}
</script>
<style lang="less" scoped>
@import "~@/common/less/variable";
.md-theme-default a:not(.md-button):hover{
  color:@color-text-active !important;
}
.fmd-tabs {
  z-index:999;
  font-size: @font-size-medium-x;
  height: 48px;
  min-height: 48px;
  position: relative;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2), 0 3px 4px rgba(0, 0, 0, 0.14),
    0 3px 3px -2px rgba(0, 0, 0, 0.12);
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
  .fmd-tab {
    font-size: @font-size-medium-x;
    color: @color-text-d;
    height: inherit;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    width: 70px;
    position: relative;
  }
  .router-link-active {
    color: @color-text-active !important;
    .tab-text::after{
        display: block;
        position: absolute;
        bottom: 0;
        width: 20px;
        height: 0;
        content: "";
        border-bottom: 2px solid #333;
        left: 50%;
        margin-left: -10px;
    }
  }
}
</style>
