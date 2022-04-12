<template>
  <div class="products__item">
    <span
      :class="hidecheck ? 'spanone' : 'iconfont'"
      v-html="item.select ? '&#xe637;' : '&#xe614;'"
      @click="handleClickSelect(shopId, item._id)"
    ></span>
    <img
      :class="imgScale ? 'products__item__img--scale' : 'products__item__img'"
      :src="item.imgUrl"
    />
    <div class="products__item__info">
      <h4 class="products__item__info__title">{{ item.name }}</h4>
      <p class="products__item__info__sales" v-show="hideSale">
        月售{{ item.sales }}件
      </p>
      <p class="products__item__info__price">
        <span>&yen;{{ item.price }}</span>
        <span>&yen;{{ item.oldPrice }}</span>
      </p>
    </div>
    <div :class="countMiddle ? 'products__count--middle' : 'products__count'">
      <span
        class="products__count__minus"
        @click="changeShopItemToCart(shopId, shopName, item._id, item, -1)"
        >-</span
      >
      {{ shopCartList?.[shopId]?.productList?.[item._id]?.count || 0 }}
      <span
        class="products__count__add"
        @click="changeShopItemToCart(shopId, shopName, item._id, item, 1)"
        >+</span
      >
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { useShopCartEffect, computeShopNumAndPrice } from "../../utils/useCartEffect";

export default {
  name: "ProductsPart",
  props: [ "item", "hideSale", "imgScale", "countMiddle", "hidecheck", "shopName" ],
  setup() {
    const router = useRoute();
    const shopId = router.params.id;

    // 获取 useShopCartEffect 中的添加进购物车功能
    const { shopCartList, changeShopItemToCart } = useShopCartEffect();

    // 获取 computeShopNumAndPrice 中的为当前商品添加选中状态
    const { handleClickSelect } = computeShopNumAndPrice();

    return { shopId, shopCartList, changeShopItemToCart, handleClickSelect };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/mixins.scss";
.products__item {
  position: relative;
  display: flex;
  padding: 0.12rem 0;
  margin: 0 0.16rem;
  border-bottom: 0.01rem solid #f1f1f1;
  .spanone {
    display: none;
  }
  .iconfont {
    padding: 0 0.16rem 0 0.02rem;
    display: flex;
    align-items: center;
    font-size: 0.18rem;
    color: #0091ff;
  }

  &__img {
    width: 0.68rem;
    height: 0.68rem;
    &--scale {
      width: 0.46rem;
      height: 0.46rem;
    }
  }
  &__info {
    overflow: hidden;
    padding-left: 0.16rem;
    &__title {
      font-size: 0.14rem;
      line-height: 0.2rem;
      color: #333333;
      margin-bottom: 0.05rem;
      @include ellipsis;
    }
    &__sales {
      margin: 0.06rem 0;
      font-size: 0.14rem;
      color: #333333;
      line-height: 0.16rem;
    }
    &__price {
      font-size: 0.14rem;
      color: #e93b3b;
      line-height: 0.2rem;
      span:last-child {
        margin-left: 0.12rem;
        font-size: 0.12rem;
        color: #999999;
        text-decoration: line-through;
      }
    }
  }
}
.products__count {
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  bottom: 0.12rem;
  &--middle {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0;
    top: 38%;
  }
  &__minus,
  &__add {
    display: inline-block;
    width: 0.2rem;
    height: 0.2rem;
    font-size: 0.2rem;
    text-align: center;
    line-height: 0.2rem;
    border-radius: 50%;
  }
  &__minus {
    margin-right: 0.1rem;
    border: 0.01rem solid #666666;
  }
  &__add {
    margin-left: 0.1rem;
    color: #ffffff;
    background: #0091ff;
    border: 0.01rem solid #0091ff;
  }
}
</style>