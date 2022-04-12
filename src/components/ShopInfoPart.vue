<template>
  <!-- 商品详情组件 -->
  <div class="shop__info">
    <img :src="item.imgUrl" />
    <!-- 绑定clss，根据接收的hideBorder参数判断是否添加下边框样式 -->
    <div :class="{'shop__info__content':true,'shop__info__content--border':hideBorder?false:true}">
      <h3>{{ item.name }}</h3>
      <div class="shop__info__tags">
        <span>月售:{{ item.sales }}</span>
        <span>起送:￥{{ item.expressLimit }}</span>
        <span>基础运费:￥{{ item.expressPrice }}</span>
      </div>
      <div class="shop__info__highlight">{{ item.slogan }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShopInfoPart",
  //接收 item、hideBorder参数
  props:["item","hideBorder"],
};
</script>

<style lang="scss" scoped>
@import "../style/viriables.scss";
.shop__info {
  display: flex;
  flex: 1;
  margin-bottom: 0.12rem;
  img {
    margin-right: 0.16rem;
    width: 0.56rem;
    height: 0.56rem;
  }
  &__content {
    width: 2.67rem;
    padding-bottom: 0.12rem;
    &--border{
        border-bottom: .01rem solid $content-bgcolor;
    }
    h3 {
      font-weight: normal;
      font-size: 0.16rem;
      color: $content-fontcolor;
    }
  }
  &__tags {
    margin-top: 0.08rem;
    span {
      font-size: .13rem;
      color: $content-fontcolor;
      padding-right: 0.16rem;
    }
  }
  &__highlight {
    margin-top: 0.08rem;
    font-size: .13rem;
    color: #e93b3b;
  }
}
</style>