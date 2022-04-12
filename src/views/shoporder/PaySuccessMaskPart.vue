<template>
  <!-- 支付成功弹窗 -->
  <div class="success">
    <div class="success__box">
      <div class="success__box__close iconfont" @click="handleClickClose">
        &#xeb6a;
      </div>
      <div class="success__box__warn iconfont">&#xe63c;</div>
      <div class="success__box__text">支付成功，等待配送</div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

//导出支付成功的弹窗显示，若弹出后未点击关闭，在3s后自动跳转到首页
export const useSuccessEffect = () => {
  const router = useRouter();
  const showMask = ref(false);
  const handleClickShowMask = () => {
    showMask.value = true;
    setTimeout(() => {
      showMask.value = false;
      router.push({ name: "HomeView" });
    }, 3000);
  };
  return { showMask, handleClickShowMask };
};

export default {
  name: "PaySuccessMaskPart",
  setup() {
    const router = useRouter();
    const showMask = ref(true);
    //点击关闭并跳转到首页
    const handleClickClose = () => {
      showMask.value = false;
      router.push({ name: "HomeView" });
    };
    return { showMask, handleClickClose };
  },
};
</script>

<style lang="scss" scoped>
.success {
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
    padding: 0.12rem;
    box-sizing: border-box;
    text-align: center;
    &__close {
      font-size: 0.18rem;
      color: #666666;
      text-align: right;
    }
    &__warn {
      font-size: 0.5rem;
      margin-bottom: 0.12rem;
    }
    &__text {
      font-size: 0.16rem;
      color: #333333;
      margin-bottom: 0.2rem;
    }
  }
}
</style>