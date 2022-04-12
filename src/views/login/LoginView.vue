<template>
  <div class="wrapper">
    <div class="login__img">
      <img src="http://www.dell-lee.com/imgs/vue3/user.png" />
    </div>
    <div class="login__input">
      <input type="text" v-model="username" placeholder="请输入用户名" />
    </div>
    <div class="login__input">
      <input type="password" v-model="password" placeholder="请输入密码" />
    </div>
    <div class="login__btn" @click="handleLogin">登录</div>
    <div class="login__link">
      <router-link to="/register">立即注册</router-link>
      &nbsp;&nbsp; | &nbsp;&nbsp;
      <router-link to="/">忘记密码</router-link>
      <router-view />
    </div>
  </div>
  <ToastBlock v-if="toastshow" :message="message" />
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import ToastBlock, { useToastEffect } from "../../components/ToastBlock.vue";
import { post } from "../../utils/axios_post_get";

// 封装的登录逻辑实现
const useLoginEffect = (showToast) => {
  const router = useRouter();
  const data = reactive({ username: "", password: "" });
  const handleLogin = async () => {
    if ((data.username && data.password) === "") {
      showToast("请输入用户名与密码");
    } else {
      try {
        const result = await post("/api/user/login", {
          username: data.username,
          password: data.password,
        });
        if (result?.errno === 0) {
          localStorage.isLogin = true;
          router.push({ name: "HomeView" });
        } else {
          showToast("登录失败");
        }
      } catch (error) {
        showToast("请求失败");
      }
    }
  };
  //解构data赋值给username、password
  const { username, password } = toRefs(data);
  return { username, password, handleLogin };
};

export default {
  name: "LoginView",
  components: { ToastBlock },
  setup() {
    //引入弹出层组件
    const { toastshow, message, showToast } = useToastEffect();
    //引入登录逻辑
    const { username, password, handleLogin } = useLoginEffect(showToast);
    return { username, password, toastshow, message, handleLogin };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  .login__img {
    width: 0.66rem;
    height: 0.66rem;
    margin: 0 auto 0.4rem;
    img {
      width: 100%;
    }
  }
  .login__input {
    width: 2.95rem;
    line-height: 0.48rem;
    background: #f9f9f9;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    margin: 0 auto 0.16rem;
    input {
      color: rgba(0, 0, 0, 0.5);
      border: none;
      outline: none;
      background: none;
      width: 100%;
      font-size: 0.16rem;
      padding: 0.12rem 0.1rem 0.12rem 0.16rem;
    }
  }
  .login__btn {
    margin: 0 auto 0.16rem;
    background: #0091ff;
    box-shadow: 0 4px 8px 0 rgba(0, 145, 255, 0.32);
    border-radius: 4px;
    width: 2.95rem;
    line-height: 0.48rem;
    text-align: center;
    font-size: 0.16rem;
    color: #ffffff;
  }
  .login__link {
    font-size: 0.14rem;
    text-align: center;
    color: rgba(0, 0, 0, 0.5);
    a {
      color: rgba(0, 0, 0, 0.5);
      -webkit-tap-highlight-color: transparent;
    }
  }
}
</style>