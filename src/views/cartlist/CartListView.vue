<template>
  <div class="header">
    <span class="header__title">我的全部购物车</span>
  </div>
  <div class="wrapper">
    <template v-for="(item, index) in shopProductList" :key="index">
      <OrderProductPart :orderProductList="item.productList" :getShopTypeNum="item.productList.getShopTypeNum"
        :shopName="item.shopname" />
    </template>
  </div>
  <DockerPart :currentIndex="1" />
</template>

<script>
import OrderProductPart from "../shoporder/OrderProductPart.vue";
import DockerPart from "../../components/DockerPart.vue";

export default {
  name: "CartListView",
  components: { DockerPart, OrderProductPart },
  setup() {
    const shopCartList = localStorage.shopCartList

    if (!shopCartList) return
    
    const shopProductList = JSON.parse(shopCartList);

    // 获取购物车的商品种类
    for (let i in shopProductList) {
      let productListType = [];
      const productList = shopProductList[i].productList;
      for (let j in productList) {
        if (productList[j].count > 0) {
          productListType.push(productList[j]);
        }
      }
      productList.productListType = productListType;
      productList.getShopTypeNum = productListType.length;
    }

    return { shopProductList };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/mixins.scss";

.wrapper {
  position: absolute;
  top: 0.44rem;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  padding: 0.16rem 0.18rem 0 0.18rem;
  background: rgb(248, 248, 248) 50% 15%;
  background-image: url(../images/empty.svg);
  background-repeat: no-repeat;
  overflow-y: auto;
  touch-action: none;
}

.header {
  height: 0.44rem;
  text-align: center;
  margin: 0.11rem 0 0.11rem;
  overflow: hidden;

  &__title {
    display: inline-block;
    font-size: 0.16rem;
  }
}

.cartlist {
  padding: 0.16rem 0.18rem;
  background: #ffffff;
  border-radius: 0.04rem;

  &__title {
    font-size: 0.16rem;
    color: #333333;
    padding-bottom: 0.16rem;
  }

  &__wrapper1 {
    height: 0.62rem;
  }

  &__wrapper2 {
    height: 1.24rem;
  }

  &__item {
    position: relative;
    display: flex;
    padding-bottom: 0.16rem;

    &__img {
      width: 0.46rem;
      height: 0.46rem;
    }

    &__info {
      overflow: hidden;
      padding-left: 0.18rem;
      flex: 1;

      &__title {
        font-size: 0.14rem;
        line-height: 0.2rem;
        color: #333333;
        margin-bottom: 0.05rem;
        @include ellipsis;
      }

      &__price {
        display: flex;
        justify-content: space-between;
        font-size: 0.14rem;
        color: #e93b3b;
        line-height: 0.2rem;

        span:last-child {
          margin-left: 0.12rem;
          font-size: 0.14rem;
          color: #000000;
        }
      }
    }
  }

  &__showmore {
    height: 0.28rem;
    background: #f5f5f5;
    font-size: 0.14rem;
    color: #999999;
    text-align: center;
    line-height: 0.28rem;

    .iconfont {
      position: absolute;
    }
  }
}
</style>