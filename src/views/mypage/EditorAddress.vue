<template>
  <div class="header">
    <span class="header__back iconfont" @click="handleBack"> &#xe677; </span>
    <span class="header__title">编辑收货地址</span>
    <span class="header__save">保存</span>
  </div>
  <div class="wrapper">
    <div class="address">
      <ul class="address__info">
        <li>
          所在城市：
          <input type="text" placeholder="如北京市" :value="item.city" />
        </li>
        <li>
          小区/大厦/学校：
          <input type="text" placeholder="如理工大学国防科技园" :value="item.community" />
        </li>
        <li>
          楼号-门牌号：
          <input type="text" placeholder="A号楼B层" :value="item.floor" />
        </li>
        <li>
          收货人：
          <input type="text" placeholder="请填写收货人的姓名" :value="item.name" />
        </li>
        <li>
          联系电话：
          <input type="text" placeholder="请填写收货人手机号" :value="item.phone" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useRouter, useRoute } from "vue-router";

export default {
  name: "EditorAddress",
  setup() {
    const router = useRouter();
    const route = useRoute();

    // 接收传入的地址信息，并将其展示在 input 输入框的 value 上
    let item = JSON.parse(route.params.addressList);
    const handleBack = () => router.back();

    return { handleBack, item};
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 0.64rem;
  display: flex;
  justify-content: space-between;
  line-height: 0.2rem;
  padding: 0.22rem 0.18rem 0.11rem 0.18rem;
  color: #333333;
  box-sizing: border-box;
  &__back {
    font-size: 0.2rem;
  }
  &__title {
    font-size: 0.16rem;
  }
  &__save {
    font-size: 0.14rem;
  }
}
.wrapper {
  position: absolute;
  top: 0.64rem;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: 0.16rem;
  background-color: rgb(248, 248, 248);
}
.address {
  height: 2.24rem;
  background: #ffffff;
  border-radius: 0.04rem;
  padding: 0 0.18rem;
  color: #333333;
  box-sizing: border-box;
  margin-bottom: 0.16rem;
  &__info {
    display: flex;
    flex-direction: column;
    font-size: 0.14rem;
    color: #666666;
    margin-bottom: 0.08rem;
    li {
      height: 0.44rem;
      padding: 0.12rem 0;
      box-sizing: border-box;
      border-bottom: 0.01rem solid #f1f1f1;
      input {
        border: none;
        outline: none;
        font-size: 0.14rem;
        color: #333333;
        line-height: 20px;
      }
    }
    li:last-child {
      border-bottom: none;
    }
  }
}
</style>