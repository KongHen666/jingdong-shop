<template>
  <div class="header">
    <span class="header__title">我的订单</span>
  </div>
  <div class="wrapper">
    <div class="cartlist" v-for="item in products" :key="item.shopId">
      <h3 class="cartlist__title">
        {{ item.shopName }}
        <span>{{ item.isCanceled ? "已取消" : "已支付" }}</span>
      </h3>
      <div>
        <div class="cartlist__item">
          <div class="cartlist__item__img">
            <template v-for="(itemimg, index) in item.products" :key="index">
              <img :src="itemimg.product.img" />
            </template>
          </div>
          <div class="cartlist__item__info">
            <span class="cartlist__item__price"
              >&yen;{{ item.totalPrice }}</span
            >
            <span class="cartlist__item__count"
              >共{{ item.totalNumber }}件</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  <DockerPart :currentIndex="2" />
</template>

<script>
import { get } from "../../utils/axios_post_get";
import DockerPart from "../../components/DockerPart.vue";
import { reactive, toRefs } from "vue";

//封装的获取订单列表功能
const getOrderListEffect = () => {
  const data = reactive({ products: [] });
  const getOrderList = async () => {
    const result = await get("/api/order");
    //判断是否能成功获取订单数据
    if (result?.errno === 0 && result?.data?.length) {
      const orderList = result.data;
      orderList.forEach((order) => {
        const products = order.products || [];
        let totalPrice = 0;
        let totalNumber = 0;
        products.forEach((productsItem) => {
          totalPrice += productsItem?.orderSales * productsItem?.product?.price || 0;
          totalNumber += productsItem?.orderSales || 0;
        });
        order.totalPrice = totalPrice;
        order.totalNumber = totalNumber;
      });
      data.products = orderList;
    }
  };
  const { products } = toRefs(data);
  return { products, getOrderList };
};

export default {
  name: "OrderListView",
  components: { DockerPart },
  setup() {
    const { products, getOrderList } = getOrderListEffect();
    getOrderList();

    return { products, getOrderList };
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 0.44rem;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  padding: 0.16rem 0.18rem 0 0.18rem;
  background: rgb(248, 248, 248);
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
  margin-bottom: 0.16rem;
  &__title {
    display: flex;
    justify-content: space-between;
    font-size: 0.16rem;
    color: #333333;
    padding-bottom: 0.16rem;
    span {
      font-size: 0.14rem;
      color: #999999;
    }
  }
  &__item {
    position: relative;
    display: flex;
    justify-content: space-between;
    &__img {
      flex: 1;
      img {
        width: 0.4rem;
        height: 0.4rem;
        margin-right: 0.12rem;
      }
    }
    &__info {
      display: flex;
      flex-direction: column;
      text-align: right;
      margin-left: 0.18rem;
    }
    &__price {
      font-size: 0.14rem;
      color: #e93b3b;
      padding-bottom: 0.04rem;
    }
    &__count {
      font-size: 0.12rem;
      color: #333333;
    }
  }
}
</style>