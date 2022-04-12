<template>
  <div class="wrapper">
    <OrderHeaderPart />
      <OrderProductPart
        :orderProductList="orderProductList"
        :getShopTypeNum="getShopTypeNum"
        :shopName="shopName"
      />
  </div>
  <OrderPayBarPart />
</template>

<script>
import OrderHeaderPart from "./OrderHeaderPart.vue";
import OrderProductPart from "./OrderProductPart.vue";
import OrderPayBarPart from "./OrderPayBarPart.vue";
import { computeShopNumAndPrice } from "../../utils/useCartEffect";

export default {
  name: "ShopOrderView",
  components: { OrderHeaderPart, OrderProductPart, OrderPayBarPart },
  setup() {
    const { shopName, cartProductList } = computeShopNumAndPrice();

    //将 cartProductList 中 orderProductList 对象重新赋值给新变量
    const orderProductList = cartProductList.value.orderProductList;

    //获取订单商品种类，由此判断页面该展示多少件
    const getShopTypeNum = Object.keys(cartProductList.value.orderProductList).length;

    return { shopName, getShopTypeNum, orderProductList };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  padding: 0 0.18rem;
  background-color: rgb(248, 248, 248);
  background-size: 100% 1.6rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, #0091ff 50%);
  background-repeat: no-repeat;
  overflow-y: auto;
}
</style>