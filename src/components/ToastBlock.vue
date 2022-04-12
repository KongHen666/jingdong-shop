<template>
  <div :class="bgc ? 'toast1' : 'toast2'">{{ message }}</div>
</template>

<script>
import { reactive, toRefs } from "vue";

export const useToastEffect = () => {
  const toastData = reactive({
    toastshow: false,
    message: "",
  });
  const showToast = (message) => {
    toastData.toastshow = true;
    toastData.message = message;
    setTimeout(() => {
      toastData.toastshow = false;
      toastData.message = "";
    }, 2000);
  };
  const { toastshow, message } = toRefs(toastData);
  return { toastshow, message, showToast };
};

export default {
  name: "ToastBlock",
  props: { message: String, bgc: Boolean },
};
</script>

<style lang="scss" scoped>
.toast1,
.toast2 {
  line-height: 0.3rem;
  position: fixed;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.14rem;
  padding: 0.01rem 0.06rem;
  border-radius: 0.03rem;
  text-align: center;
  z-index: 9;
}
.toast1 {
  background: rgba(255, 255, 255);
  color: rgb(87, 87, 87);
}
.toast2 {
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
}
</style>
