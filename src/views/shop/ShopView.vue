<template>
  <div class="wrapper">
    <div class="shop">
      <div class="shop__back">
        <span class="iconfont" @click="handleClickBack">&#xe677;</span>
      </div>
      <div class="shop__search">
        <span class="iconfont">&#xe752;</span>
        <input type="text" placeholder="请输入商品名称搜索" />
      </div>
    </div>
    <ShopInfoPart :item="item" :hideBorder="true" v-if="item.imgUrl" />
    <ContentPart :shopName="item.name" />
  </div>
  <CartPart />
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
import { get } from "../../utils/axios_post_get";
import CartPart from "./CartPart.vue";
import ContentPart from "./ContentPart.vue";
import ShopInfoPart from "../../components/ShopInfoPart.vue";

//封装的商品详情页get请求数据
const useShopInfoEffect = () => {
  const route = useRoute();
  const data = reactive({ item: {} });
  const getItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`);
    if (result?.errno === 0 && result?.data) {
      data.item = result.data;
    }
  };
  const { item } = toRefs(data);
  return { item, getItemData };
};

//封装的点击返回功能
const clickBackHomeEffect = () => {
  const router = useRouter();
  const handleClickBack = () => {
    router.back();
  };
  return { handleClickBack };
};

export default {
  name: "ShopView",
  components: { ShopInfoPart, ContentPart, CartPart },
  setup() {
    const { handleClickBack } = clickBackHomeEffect();

    const { item, getItemData } = useShopInfoEffect();
    getItemData();

    return { item, handleClickBack };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  padding: 0 0.18rem;
  overflow-y: auto;
  touch-action: none;
}

.shop {
  position: relative;
  padding-left: 0.3rem;
  &__back {
    position: absolute;
    top: 50%;
    left: 0.005rem;
    margin-top: -0.107rem;
    .iconfont {
      font-size: 0.20rem;
      color: #b6b6b6;
    }
  }
  &__search {
    position: relative;
    margin: 0.14rem 0 0.16rem;
    background: #f5f5f5;
    border-radius: .16rem;
    line-height: 0.32rem;
    color: #b7b7b7;
    .iconfont {
      position: absolute;
      left: 0.16rem;
    }
    input {
      box-sizing: border-box;
      border: none;
      outline: none;
      background: none;
      width: 2.9rem;
      font-size: 0.14rem;
      padding: 0 0.1rem 0 0.44rem;
      &::placeholder {
        font-size: .14rem;
        color: $content-fontcolor;
        line-height: .16rem;
      }
    }
  }
}
</style>