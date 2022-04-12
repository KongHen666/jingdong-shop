<template>
  <!-- 订单页中间购物车的商品列表 -->
  <div class="cartlist" v-if="getShopTypeNum > 0">
    <h3 class="cartlist__title">{{ shopName }}</h3>
    <div :class="showMore ? ((getShopTypeNum === 1) ? 'cartlist__wrapper1' : 'cartlist__wrapper2'):''">
      <template
        v-for="item in orderProductList"
        :key="item._id"
      >
        <div class="cartlist__item" v-if="item.count > 0">
          <img class="cartlist__item__img" :src="item.imgUrl" />
          <div class="cartlist__item__info">
            <h4 class="cartlist__item__info__title">{{ item.name }}</h4>
            <p class="cartlist__item__info__price">
              <span>&yen;{{ item.price }} x {{ item.count }}</span>
              <!-- 计算单件商品的总价并保留小数点后两位，不四舍五入 -->
              <span
                >&yen;{{
                  String(item.price * item.count).substring(
                    0,
                    String(item.price * item.count).indexOf(".") + 3
                  )
                }}</span
              >
            </p>
          </div>
        </div>
      </template>
    </div>
    <div
      class="cartlist__showmore"
      v-show="showMore && getShopTypeNum > 2"
      @click="handleClickShowMore"
    >
      共计{{ getShopTypeNum }}件商品/1.4kg&nbsp;&nbsp;<span class="iconfont"
        >&#xe789;</span
      >
      <!-- <div bgcolor="yellow">yellow</div> -->
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

//封装的购物车点击显示与隐藏
const toggleShowMore = () => {
  const showMore = ref(true);
  const handleClickShowMore = () => {
    showMore.value = !showMore.value;
  };
  return { showMore, handleClickShowMore };
};

export default {
  name: "OrderProductPart",
  props:["orderProductList","getShopTypeNum","shopName"],
  setup() {
    const { showMore, handleClickShowMore } = toggleShowMore();

    return { showMore, handleClickShowMore };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/mixins.scss";
.cartlist {
  padding: 0.16rem 0.18rem;
  background: #ffffff;
  border-radius: 0.04rem;
  margin-bottom: .16rem;
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
    overflow-y: auto;
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