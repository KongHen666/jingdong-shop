import { createStore } from 'vuex'

//定义函数，将添加进购物车的商品存放在localStorage中
const setLocalShopCartList = (state) => {
  const { shopCartList } = state
  const shopCartListString = JSON.stringify(shopCartList)
  localStorage.shopCartList = shopCartListString;
}

//定义函数，获取添加进localStorage中的商品数据
const getLocalShopCartList = () => {
  //购物车存储的数据结构如下
  // 商店id
  // 1: {
  // 商店名称
  // shopname: "沃尔玛",
  // 商品列表
  // productList: {
  // 商品id
  //     1: {
  //       "_id": "1",
  //       "name": "番茄 250g / 份",
  //       "imgUrl": "http://www.dell-lee.com/imgs/vue3/tomato.png",
  //       "sales": 10,
  //       "price": 33.6,
  //       "oldPrice": 39.6,
  //       "count": 1,
  //     }
  //   }
  // }
  try {
    return JSON.parse(localStorage.shopCartList)
  } catch (error) {
    return {}
  }
}


export default createStore({
  state: {
    shopCartList: getLocalShopCartList()
  },
  getters: {
  },
  mutations: {
    //添加商品进购物车
    changeShopItemToCart(state, payload) {
      const { shopId, shopName, productId, product } = payload
      let shopCartId = state.shopCartList[shopId] || { shopname: shopName, productList: {} }
      let shopCartProductId = shopCartId.productList[productId]
      if (!shopCartProductId) {
        shopCartProductId = product
        shopCartProductId.count = 0
        shopCartProductId.select = true
      }
      shopCartProductId.count += payload.num;
      if (shopCartProductId.count < 0) {
        shopCartProductId.count = 0
      }
      shopCartId.productList[productId] = shopCartProductId
      state.shopCartList[shopId] = shopCartId
      setLocalShopCartList(state)
    },

    //改变当前商品的选中状态
    changeCurrentProductSelected(state, payload) {
      const { shopId, productId } = payload
      const product = state.shopCartList[shopId].productList[productId]
      product.select = !product.select;
      setLocalShopCartList(state)
    },

    //全选、全不选
    changeAllProductSelected(state, payload) {
      const { shopId, yes, no } = payload
      const productList = state.shopCartList[shopId]?.productList
      for (let i in productList) {
        if (productList[i].select) {
          productList[i].select = no
        } else {
          productList[i].select = yes
        }
      }
      setLocalShopCartList(state)
    },

    //清除购物车全部商品
    clearAllShopCart(state, payload) {
      const { shopId } = payload
      state.shopCartList[shopId].productList = {}
      setLocalShopCartList(state)
    },

    //提交订单后清除购物车中的已下单商品
    subOrderClearCurrentProduct(state, payload) {
      const { shopId, productId } = payload
      const productList = state.shopCartList[shopId]?.productList
      productList[productId].count = 0;
      setLocalShopCartList(state)
    },
  },
  actions: {
  },
  modules: {
  }
})
