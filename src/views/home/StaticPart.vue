<template>
     <div class="position">
      <span class="iconfont position__icon">&#xe681;</span>
      北京理工大学国防科技园2号楼10层
      <span class="iconfont position__notice">&#xe606;</span>
    </div>
    <div class="search">
      <span class="iconfont">&#xe752;</span>
      <input type="text" placeholder="山姆会员商店优惠商品" />
    </div>
    <div class="banner">
      <img
        class="banner__img"
        src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
      />
    </div>
    <div class="icons">
      <ul class="icons__item">
        <li v-for="item in iconsList" :key="item.desc">
          <img :src="`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`" />
          <p>{{item.desc}}</p>
        </li>
      </ul>
    </div>
    <div class="gap"></div>
</template>

<script>
export default {
  name: "StaticPart",
  setup() {
    const iconsList = [
      {imgName:"超市",desc:"超市便利"},
      {imgName:"菜市场",desc:"菜市场"},
      {imgName:"水果店",desc:"水果店"},
      {imgName:"鲜花",desc:"鲜花绿植"},
      {imgName:"医药健康",desc:"医药健康"},
      {imgName:"家居",desc:"家居时尚"},
      {imgName:"蛋糕",desc:"烘焙蛋糕"},
      {imgName:"签到",desc:"签到"},
      {imgName:"大牌免运",desc:"大牌免运"},
      {imgName:"红包",desc:"红包套餐"},
    ];
    return { iconsList }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  padding: 0 0.18rem;
  overflow-y: auto;
}
.position {
  @include ellipsis;
  position: relative;
  padding: 0.16rem 0.18rem 0.16rem 0;
  line-height: 0.16rem;
  font-size: 0.16rem;
  .position__icon {
    position: relative;
    top: 0.01rem;
    font-size: 0.2rem;
  }
  .position__notice {
    position: absolute;
    top: 0.17rem;
    right: 0;
    font-size: 0.2rem;
  }
}
.search {
  position: relative;
  margin-bottom: 0.12rem;
  background: #f5f5f5;
  border-radius: 16px;
  line-height: 0.32rem;
  color: #b7b7b7;
  span {
    position: absolute;
    left: 0.16rem;
  }
  input {
    box-sizing: border-box;
    border: none;
    outline: none;
    background: none;
    width: 3.39rem;
    font-size: 0.14rem;
    padding: 0 0.1rem 0 0.44rem;
  }
}
.banner {
  height: 0;
  overflow: hidden;
  padding-bottom: 25.37%;
  &__img {
    width: 100%;
  }
}

//gird布局icons区域

// .icons {
//   margin-top: 0.16rem;
//   &__item {
//     display: grid;
//     grid-template-rows: repeat(2,.63rem);
//     grid-template-columns: repeat(5,20%);
//     row-gap: .16rem;
//     list-style: none;
//       img {
//         display: block;
//         width: 0.4rem;
//         height: 0.4rem;
//         margin: 0 auto;
//       }
//       p {
//         font-size: .12rem;
//         color: $content-fontcolor;
//         text-align: center;
//         padding-top: .06rem;
//       }
//   }
// }

.icons {
  margin-top: 0.16rem;
  &__item {
    display: flex;
    flex-flow: wrap;
    justify-content: space-around;
    li {
      width: 20%;
      height: 0.63rem;
      padding-bottom: 0.16rem;
      img {
        display: block;
        width: 0.4rem;
        height: 0.4rem;
        margin: 0 auto;
      }
      p {
        font-size: 0.12rem;
        color: $content-fontcolor;
        text-align: center;
        padding-top: 0.06rem;
      }
    }
  }
}

.gap {
  height: 0.1rem;
  margin: 0 -0.18rem;
  background: $content-bgcolor;
}
</style>