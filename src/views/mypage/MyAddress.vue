<template>
  <div class="header">
    <span class="header__back iconfont" @click="handleBack"> &#xe677; </span>
    <span class="header__title">管理收货地址</span>
    <router-link :to="{ name: 'BuildNewAddress' }">
      <span class="header__new">新建</span>
    </router-link>
  </div>
  <div class="wrapper">
    <div class="myaddress">我的收货地址</div>
    <div class="address" v-for="item in addressList" :key="item.name">
      <div class="address__info">
        <span class="name">{{ item.name }}</span>
        <span class="phone">{{ item.phone }}</span>
      </div>
      <div class="address__name">
        <span class="adress__name__text">
          {{ item.city + item.community + item.floor }}
        </span>
        <span class="iconfont" @click="handleClickEditorAddress(item)"
          >&#xe788;</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

const addressList = [
  {
    name: "小慕",
    phone: "1891102426",
    city: "北京市 海淀区 西三环北路 2号院",
    community: "北京理工大学 国防科技园",
    floor: "2号楼 13层",
  },
  {
    name: "小红",
    phone: "1891102410",
    city: "北京市 海淀区 西三环北路 2号院",
    community: "北京理工大学 国防科技园",
    floor: "2号楼 13层",
  },
  {
    name: "小明",
    phone: "1891102394",
    city: "北京市 海淀区 西三环北路 2号院",
    community: "北京理工大学 国防科技园",
    floor: "2号楼 13层",
  },
];

export default {
  name: "MyAddress",
  setup() {
    const router = useRouter();

    const handleBack = () => router.back();
    
    // 点击跳转到 EditorAddress 页面，并将当前的地址信息传过去
    const handleClickEditorAddress = (item) => {
      const addressList = JSON.stringify(item);
      router.push({ name: "EditorAddress", params: { addressList } });
    };

    return { handleBack, addressList, handleClickEditorAddress };
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
  a {
    color: #333333;
    -webkit-tap-highlight-color: transparent;
  }
  &__back {
    font-size: 0.2rem;
  }
  &__title {
    font-size: 0.16rem;
  }
  &__new {
    font-size: 0.14rem;
  }
}
.wrapper {
  position: absolute;
  top: 0.64rem;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.16rem 0.18rem 0 0.18rem;
  background-color: rgb(248, 248, 248);
}
.myaddress {
  font-size: 0.14rem;
  color: #333333;
  margin-bottom: 0.12rem;
}
.address {
  height: 1.04rem;
  background: #ffffff;
  border-radius: 0.04rem;
  padding: 0.18rem 0.16rem;
  color: #333333;
  box-sizing: border-box;
  margin-bottom: 0.16rem;
  &__info {
    font-size: 0.14rem;
    color: #999999;
    margin-bottom: 0.08rem;
    .phone {
      margin-left: 0.66rem;
    }
  }
  &__title {
    margin-bottom: 0.14rem;
    font-size: 0.16rem;
  }
  &__name {
    display: flex;
    justify-content: space-between;
    line-height: 0.23rem;
    margin-bottom: 0.06rem;
    font-size: 0.14rem;
    .iconfont {
      display: inline-block;
      width: 0.63rem;
      text-align: right;
      color: #999999;
    }
  }
}
</style>