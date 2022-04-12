<template>
  <div class="nearby">
    <h2>附近店铺</h2>
    <router-link v-for="item in nearbyList.value" :key="item._id" :to="`/shop/${item._id}`">
      <ShopInfoPart :item="item" />
    </router-link>
  </div>
</template>

<script>
import { reactive } from "vue";
import { get } from "../../utils/axios_post_get";
import ShopInfoPart from "../../components/ShopInfoPart.vue";

// 封装的登录逻辑实现
const useNearbyListEffect = () => {
  const nearbyList = reactive([]);
  const getNearbyList = async () => {
    const result = await get("/api/shop/hot-list");
    if (result?.errno === 0 && result?.data?.length) {
      nearbyList.value = result.data;
    }
  };
  return { nearbyList, getNearbyList };
};

export default {
  name: "NearByPart",
  components: { ShopInfoPart },
  setup() {
    const { nearbyList, getNearbyList } = useNearbyListEffect();
    getNearbyList();
    return { nearbyList };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
.nearby {
  h2 {
    padding: 0.16rem 0 0.14rem 0;
    font-size: 0.18rem;
    color: $content-fontcolor;
  }
  a{
    -webkit-tap-highlight-color: transparent;
  }
}
</style>