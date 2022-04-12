<template>
  <div class="content">
    <div class="category">
      <div
        v-for="(item, index) in categoryList"
        @click="handleTabClick(item.tab)"
        :class="{category__item: true,'category__item--active': currentTab === item.tab }"
        :key="index"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="products">
      <template v-for="item in shopContentList" :key="item._id">
        <ProductsPart :item="item" :hideSale="true" :hidecheck="true" :shopName="shopName"/>
      </template>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import ProductsPart from "./ProductsPart.vue";
import { get } from "../../utils/axios_post_get";

const categoryList = [
  { name: "全部商品", tab: "all" },
  { name: "秒杀", tab: "seckill" },
  { name: "新鲜水果", tab: "friut" },
  { name: "休闲食品", tab: "xiuxian" },
  { name: "时令蔬菜", tab: "vegetable" },
  { name: "肉蛋家禽", tab: "meat" },
];

//封装的获取当前tab属性功能
const useCurrentTabEffect = () => {
  const currentTab = ref(categoryList[0].tab);
  const handleTabClick = (tab) => {
    currentTab.value = tab;
  };
  return { currentTab, handleTabClick };
};

//封装的获取当前商品列表功能
const useCurrentShopListEffect = (currentTab, shopId) => {
  const data = reactive({ shopContentList: [] });
  const getContentData = async () => {
    const result = await get(`/api/shop/${shopId}/products`, {
      tab: currentTab.value,
    });
    if (result?.errno === 0 && result?.data?.length) {
      data.shopContentList = result.data;
    }
  };
  watchEffect(() => {
    getContentData();
  });
  const { shopContentList } = toRefs(data);
  return { shopContentList, getContentData };
};

export default {
  name: "ContentPart",
  props:["shopName"],
  components: { ProductsPart },
  setup() {
    const router = useRoute();
    const shopId = router.params.id;

    const { currentTab, handleTabClick } = useCurrentTabEffect();

    const { shopContentList } = useCurrentShopListEffect(currentTab, shopId);

    return { shopContentList, currentTab, categoryList, shopId, handleTabClick };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/mixins.scss";
.content {
  display: flex;
  position: absolute;
  top: 1.5rem;
  left: 0;
  right: 0;
  bottom: 0;
}
.category {
  width: 0.76rem;
  height: 100%;
  background: #f5f5f5;
  overflow-y: auto;
  &__item {
    text-align: center;
    line-height: 0.4rem;
    font-size: .14rem;
    color: #333333;
    &--active {
      background: #ffffff;
    }
  }
}
.products {
  overflow-y: auto;
  flex: 1;
}
</style>