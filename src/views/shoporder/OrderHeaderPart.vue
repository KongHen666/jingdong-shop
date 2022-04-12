<template>
  <!-- 提交订单页头部 -->
  <div class="header">
    <div class="header__top">
      <span class="header__top__back iconfont" @click="handleBack">
        &#xe677;
      </span>
      <span class="header__top__title">确认订单</span>
    </div>
    <div class="header__address">
      <h3 class="header__address__title">收货地址</h3>
      <p class="header__address__name">
        北京理工大学国防科技园
        <span class="iconfont">&#xe788;</span>
      </p>
      <p class="header__address__info">
        <span class="name">瑶妹（先生）</span>
        <span class="phone">1891102426</span>
      </p>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "OrderHeaderPart",
  setup() {
    const router = useRouter();
    const handleBack = () => {
      router.back();
    };
    return { handleBack };
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 1.97rem;
  &__top {
    position: relative;
    color: #ffffff;
    text-align: center;
    line-height: 0.2rem;
    padding: 0.22rem 0;
    &__back {
      position: absolute;
      left: 0;
      font-size: 0.2rem;
    }
    &__title {
      font-size: 0.16rem;
    }
  }
  &__address {
    height: 1.1rem;
    background: #ffffff;
    border-radius: 0.04rem;
    padding: 0.16rem;
    box-sizing: border-box;
    color: #333333;
    &__title {
      margin-bottom: 0.14rem;
      font-size: 0.16rem;
    }
    &__name {
      position: relative;
      margin-bottom: 0.06rem;
      font-size: 0.14rem;
      .iconfont {
        position: absolute;
        right: 0;
      }
    }
    &__info {
      font-size: 0.12rem;
      color: #666666;
    }
  }
}
</style>