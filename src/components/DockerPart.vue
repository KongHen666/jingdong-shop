<template>
<!-- Docker组件 -->
  <div class="docker">
    <div
      v-for="(item, index) in dockerList"
      :key="item.iconName"
      :class="{
        docker__item: true,
        'docker__item--active': index === currentIndex,
      }"
    >
      <router-link :to="item.to">
        <div class="iconfont" v-html="item.iconName" />
        <div class="docker__text">{{ item.text }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "DockerPart",
  props: ["currentIndex"],
  setup() {
    const dockerList = [
      { iconName: "&#xe638;", text: "首页", to: { name: "HomeView" } },
      { iconName: "&#xe61d;", text: "购物车", to: { name: "CartListView" } },
      { iconName: "&#xe787;", text: "订单", to: { name: "OrderListView" } },
      { iconName: "&#xe604;", text: "我的", to: { name: "MyPageView" } },
    ];
    return { dockerList };
  },
};
</script>

<style lang="scss" scoped>
@import "../style/viriables.scss";
.docker {
  display: flex;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  box-shadow: 0 -1px 1px 0 $content-bgcolor;
  touch-action: none;
  &__item {
    flex: 1;
    text-align: center;
    a {
      color: black;
      -webkit-tap-highlight-color: transparent;
    }
    .iconfont {
      margin-top: 0.07rem;
      margin-bottom: 0.02rem;
      font-size: 0.2rem;
    }
    &--active {
      a {
        color: #1fa4fc;
      }
    }
  }
  &__text {
    font-size: 0.2rem;
    transform: scale(0.5, 0.5);
    transform-origin: center top;
  }
}
</style>