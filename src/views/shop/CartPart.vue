<template>
  <div class="mask" v-show="showcart" @click="showCart" />
  <div class="shopcart">
    <div class="shopcartinfo" v-show="showcart">
      <div class="shopcartinfo__box">
        <div class="shopcartinfo__box__all">
          <span
            class="iconfont"
            @click="changeAllProductSelected(shopId, true, false)"
            v-html="calculation.allSelect ? '&#xe637;' : '&#xe614;'"
          ></span>
          <span>全选</span>
        </div>
        <span
          class="shopcartinfo__box__clear"
          @click="handleClickCartClear(shopId)"
          >清空购物车</span
        >
      </div>
      <div class="shopcartinfo__product">
        <template v-for="item in cartProductList.notEmptyProductList" :key="item._id">
          <ProductsPart
            :item="item"
            :hideSale="false"
            :imgScale="true"
            :countMiddle="true"
          />
        </template>
      </div>
    </div>
    <div class="shopcartbar">
      <div class="shopcartbar__icon" @click="calculation.cartShopSum && showCart()">
        <img src="http://www.dell-lee.com/imgs/vue3/basket.png" />
        <span class="shopcartbar__icon__sum" v-show="calculation.cartShopSum">
          {{calculation.cartShopSum}}</span>
      </div>
      <div class="shopcartbar__totalprice" v-if="calculation.cartShopSum">
        总价：<span>&yen;&nbsp;{{ calculation.totalPrice }}</span>
      </div>
      <div class="shopcartbar__totalprice" v-else>购物车是空的</div>
      <div class="shopcartbar__countbtn" @click="handleClickPay">去结算</div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ProductsPart from "./ProductsPart.vue";
import { computeShopNumAndPrice } from "../../utils/useCartEffect";

//封装的购物车点击显示与隐藏
const toggleShowCart = () => {
  const showcart = ref(false);
  const showCart = () => {
    showcart.value = !showcart.value;
  };
  return { showcart, showCart };
};

//封装的清除购物车全部商品
const clearShopCartEffect = (showCart) => {
  const store = useStore();
  const handleClickCartClear = (shopId) => {
    showCart();
    store.commit("clearAllShopCart", { shopId });
  };
  return { handleClickCartClear };
};

//封装的跳转到订单页面
const useToPayEffect = (calculation) => {
  const router = useRouter();
  const handleClickPay = () => {
    const shopCartList = localStorage.shopCartList;
    if (shopCartList && calculation.value.totalPrice > 0) {
      router.push({ name: "ShopOrderView" });
    }
  };
  return { handleClickPay };
};

export default {
  name: "CartPart",
  components: { ProductsPart },
  setup() {
    //点击显示、隐藏购物车
    const { showcart, showCart } = toggleShowCart();

    //清除购物车全部商品
    const { handleClickCartClear } = clearShopCartEffect(showCart);

    //引用useCartEffect.js文件中的方法计算添加进购物车的商品数量，总价，全选
    const { shopId, calculation, cartProductList, changeAllProductSelected } = computeShopNumAndPrice();

    //通过判断来点击跳转，true => shoporder.vue，false => 当前页面
    const { handleClickPay } = useToPayEffect(calculation);

    return { shopId, calculation, cartProductList, showcart, showCart, handleClickPay, changeAllProductSelected, handleClickCartClear };
  },
};
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0.51rem;
  background: rgba(0, 0, 0, 0.5);
}
.shopcart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
.shopcartinfo {
  &__box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 0.52rem;
    padding: 0 0.18rem;
    background: #fff;
    font-size: 0.14rem;
    color: #333333;
    border-bottom: 0.01rem solid #f1f1f1;
    &__all {
      .iconfont {
        font-size: 0.18rem;
        margin-right: 0.16rem;
        color: #0091ff;
      }
    }
  }
  &__product {
    background: #ffffff;
  }
}
.shopcartbar {
  display: flex;
  align-items: center;
  height: 0.5rem;
  box-shadow: 0 -0.01rem 0.01rem 0 #f1f1f1;
  background: #ffffff;
  &__icon {
    display: inline-block;
    padding: 0 0.32rem 0 0.24rem;
    position: relative;
    img {
      width: 0.28rem;
      height: 0.26rem;
    }
    span {
      width: 0.3rem;
      line-height: 0.3rem;
      text-align: center;
      font-size: 0.16rem;
      color: #ffffff;
      position: absolute;
      top: -0.15rem;
      right: 0.16rem;
      border-radius: 50%;
      transform: scale(0.5);
      background: #e93b3b;
    }
  }
  &__totalprice {
    flex: 1;
    font-size: 0.12rem;
    color: #333333;
    span {
      font-size: 0.18rem;
      color: #e93b3b;
    }
  }
  &__countbtn {
    width: 0.98rem;
    line-height: 0.5rem;
    color: #ffffff;
    font-size: 0.14rem;
    text-align: center;
    background: #4fb0f9;
  }
}
</style>