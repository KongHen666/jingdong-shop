<template>
  <!-- 确认支付弹框 -->
  <div class="mask" v-if="showConfirm" @click="handleClickConfirmWarn">
    <div class="mask__box">
      <div class="mask__box__title">确认要离开收银台？</div>
      <div class="mask__box__warn">请尽快完成支付，否则将被取消</div>
      <div class="mask__box__btn">
        <span class="mask__box__btn__cancel" @click="handleClickConfirmOrder(false)">取消订单</span>
        <span class="mask__box__btn__confirm" @click="handleClickConfirmOrder(true)">确认支付</span>
      </div>
    </div>
  </div>

  <!-- 支付成功弹窗组件 -->
  <PaySuccessMaskPart v-if="showMask" />

  <!-- warnning提示组件 -->
  <ToastBlock v-if="toastshow" :message="message" :bgc="true" />

  <!-- 提交订单的功能条 -->
  <div class="suborderbar">
    <div class="suborderbar__price">
      实付金额：<span>&yen;&nbsp;{{ calculation.totalPrice }}</span>
    </div>
    <div class="suborderbar__subbtn" @click="handleClickConfirmWarn">
      提交订单
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { post } from "../../utils/axios_post_get";
import { computeShopNumAndPrice } from "../../utils/useCartEffect";
import ToastBlock, { useToastEffect } from "../../components/ToastBlock.vue";
import PaySuccessMaskPart, { useSuccessEffect } from "./PaySuccessMaskPart.vue";

//封装的提交订单确认的弹出层显示与隐藏
const toggleShowConfirmWarn = () => {
  const showConfirm = ref(false);
  const handleClickConfirmWarn = () => {
    showConfirm.value = !showConfirm.value;
  };
  return { showConfirm, handleClickConfirmWarn };
};

//封装的发送订单详情到接口功能
const useSubOrderConfirmEffect = ( store, shopId, orderProductList, shopName, showToast, handleClickShowMask ) => {
  const router = useRouter();
  const handleClickConfirmOrder = async (isCanceled) => {
    const products = [];
    for (let i in orderProductList) {
      const product = orderProductList[i];
      if (product.select) {
        products.push({
          orderSales: product.count,
          product: {
            name: product.name,
            img: product.imgUrl,
            price: product.price,
            sales: product.sales,
          },
        });
      }
    }
    try {
      const result = await post("/api/order", { addressId: 1, shopId, shopName: shopName.value, isCanceled, products });
      if (result?.errno === 0) {
        //点击取消订单跳回ShopView页面
        if (!isCanceled) {
          router.push({ name: "ShopView" });
          return;
        }
        let productId = 0;
        for (let i in orderProductList) {
          if (orderProductList[i].select) {
            productId = orderProductList[i]._id;
            store.commit("subOrderClearCurrentProduct", { shopId, productId });
          }
        }
        //支付成功后弹出支付成功弹窗提示组件
        handleClickShowMask()
      } else {
        showToast("支付失败");
      }
    } catch (error) {
      showToast("请求失败");
    }
  };

  return { handleClickConfirmOrder };
};

export default {
  name: "OrderProductPart",
  components: { ToastBlock, PaySuccessMaskPart },
  setup() {
    const { store, shopId, shopName, calculation, cartProductList, setProductSelected } = computeShopNumAndPrice();

    //引入弹出层组件
    const { toastshow, message, showToast } = useToastEffect();

    //引入支付成功弹窗组件
    const { showMask, handleClickShowMask } = useSuccessEffect();

    //将 cartProductList 中 orderProductList 对象重新赋值给新变量
    const orderProductList = cartProductList.value.orderProductList;
    
    //引入发送订单详情到接口的功能模块
    const { handleClickConfirmOrder } = useSubOrderConfirmEffect( store, shopId, orderProductList, shopName, showToast,  handleClickShowMask );

    //引入提交订单确认的弹出层显示与隐藏功能模块
    const { showConfirm, handleClickConfirmWarn } = toggleShowConfirmWarn();

    return {shopId, message, shopName, showMask, toastshow, calculation, showConfirm, orderProductList, setProductSelected, handleClickConfirmOrder, handleClickConfirmWarn };
  },
};
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  &__box {
    width: 3rem;
    height: 1.6rem;
    background: #ffffff;
    border-radius: 0.04rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0.24rem 0.52rem;
    box-sizing: border-box;
    text-align: center;
    &__title {
      font-size: 0.18rem;
      color: #333333;
    }
    &__warn {
      font-size: 0.14rem;
      color: #666666;
      margin: 0.08rem 0 0.24rem 0;
    }
    &__btn {
      &__cancel,
      &__confirm {
        display: block;
        width: 0.8rem;
        height: 0.32rem;
        line-height: 0.32rem;
        float: left;
        border: 0.01rem solid #4fb0f9;
        border-radius: 0.16rem;
      }
      &__cancel {
        color: #0091ff;
        margin-right: 0.24rem;
      }
      &__confirm {
        color: #ffffff;
        background: #4fb0f9;
      }
    }
  }
}
.suborderbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 0.5rem;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding-left: 0.24rem;
  &__price {
    font-size: 0.16rem;
    color: #333333;
    text-align: right;
  }
  &__subbtn {
    width: 0.98rem;
    height: 0.5rem;
    background: #4fb0f9;
    font-size: 0.14rem;
    color: #ffffff;
    text-align: center;
    line-height: 0.5rem;
  }
}
</style>