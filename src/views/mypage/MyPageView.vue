<template>
  <div class="wrapper">
    <div class="header__bgcolor">
      <div class="header__tag iconfont">&#xe6e2;</div>
      <div class="header">
        <img class="header__img" src="../images/avatar.jpg" />
        <div class="header__title">
          热心市民李先生
          <div class="header__title__tag">
            <span class="img__box">
              <img src="../images/star.png" />
            </span>
            <span class="text">16</span>
          </div>
        </div>
        <div class="header__id">ID: 1069643013</div>
        <div class="header__line" />
        <ul class="header__item">
          <li v-for="(item, index) in itemList" :key="index">
            <div class="header__item__title">{{ item.title }}</div>
            <div class="header__item__number">{{ item.number }}</div>
          </li>
        </ul>
      </div>
      <div class="middle">
        <div class="middle__info">
          <div class="middle__info__img1">
            <img src="../images/money.png" />
          </div>
          <span class="middle__info__text">我的钱包</span>
          <span class="iconfont">&#xe788;</span>
        </div>
        <router-link :to="{ name: 'MyAddress' }">
          <div class="middle__info">
            <div class="middle__info__img2">
              <img src="../images/address.png" />
            </div>
            <span class="middle__info__text">我的地址</span>
            <span class="iconfont">&#xe788;</span>
          </div>
        </router-link>
        <div class="middle__info">
          <div class="middle__info__img3">
            <img src="../images/help.png" />
          </div>
          <span class="middle__info__text">客服与帮助</span>
          <span class="iconfont">&#xe788;</span>
        </div>
      </div>
    </div>
  </div>
  <DockerPart :currentIndex="3" />
</template>

<script>
import DockerPart from "../../components/DockerPart.vue";

const itemList = [
  { title: "红包", number: "218" },
  { title: "优惠券", number: "12张" },
  { title: "鲜豆", number: "88" },
  { title: "白条", number: "1000" },
];

export default {
  name: "MyPageView",
  components: { DockerPart },
  setup() {
    return { itemList };
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
  overflow-y: auto;
  touch-action: none;
  background-color: rgb(248, 248, 248);
}
.header__bgcolor {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2.5rem;
  border-bottom-left-radius: 90% 40%;
  border-bottom-right-radius: 90% 40%;
  background: repeating-linear-gradient(239deg, #3a6ff3 0%, #50c7fb 100%);
}
.header__tag {
  position: absolute;
  top: 0.405rem;
  right: 0.21rem;
  font-size: 0.24rem;
  color: #ffffff;
}
.header {
  position: relative;
  width: 3.39rem;
  height: 2.03rem;
  margin: 0.915rem auto 0.12rem;
  background: #ffffff;
  box-shadow: 0 0.08rem 0.16rem 0 rgba(0, 0, 0, 0.08);
  border-radius: 0.08rem;
  padding-top: 0.6rem;
  box-sizing: border-box;
  text-align: center;
  &__img {
    width: 0.94rem;
    height: 0.94rem;
    border-radius: 50%;
    position: absolute;
    top: -50%;
    left: 50%;
    transform: translate(-50%, 50%);
  }
  &__title {
    font-size: 0.24rem;
    letter-spacing: 0.019rem;
    line-height: 0.36rem;
    color: #262628;
    &__tag {
      position: absolute;
      top: 36%;
      right: 0.37rem;
      width: 0.35rem;
      height: 0.15rem;
      border-radius: 1rem;
      line-height: 0.36rem;
      padding: 0.02rem 0 0.02rem 0.02rem;
      box-sizing: border-box;
      background-image: linear-gradient(180deg, #bee700 0%, #8aca00 100%);
      .img__box {
        position: relative;
        display: block;
        width: 0.11rem;
        height: 0.11rem;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.2);
        img {
          width: 0.07rem;
          height: 0.07rem;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .text {
        position: absolute;
        top: 0.025rem;
        right: 0;
        display: block;
        color: #ffffff;
        font-size: 0.2rem;
        line-height: 0.2rem;
        letter-spacing: -0.0036rem;
        transform: scale(0.5, 0.5);
        transform-origin: center top;
      }
    }
  }
  &__id {
    font-size: 0.14rem;
    color: #c1c0c9;
    margin: 0.05rem auto 0.12rem;
  }
  &__line {
    border-bottom: 0.01rem solid #f1f1f1;
  }
  &__item {
    display: flex;
    justify-content: space-around;
    &__title {
      font-size: 0.12rem;
      color: #c1c0c9;
      text-align: center;
      margin: 0.12rem 0 0.1rem;
    }
    &__number {
      font-size: 0.2rem;
      color: #262628;
      text-align: center;
    }
  }
}
.middle {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  width: 3.39rem;
  height: 2.03rem;
  margin: auto;
  background: #ffffff;
  box-shadow: 0 0.08rem 0.16rem 0 rgba(0, 0, 0, 0.08);
  border-radius: 0.08rem;
  padding: 0.16rem;
  box-sizing: border-box;
  &__info {
    display: flex;
    justify-content: space-between;
    &__img1,
    &__img2,
    &__img3 {
      position: relative;
      width: 0.22rem;
      height: 0.22rem;
      border-radius: 8px;
      img {
        width: 0.12rem;
        height: 0.13rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    &__img1 {
      background: #ed4a47;
    }
    &__img2 {
      background: #32c5ff;
    }
    &__img3 {
      background: rgba(144, 19, 254, 0.92);
    }
    &__text {
      flex: 1;
      color: #262626;
      text-align: left;
      font-size: 0.14rem;
      line-height: 0.22rem;
      padding-left: 0.12rem;
    }
    .iconfont {
      text-align: right;
    }
  }
}
</style>