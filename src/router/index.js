import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../views/home/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/shop/:id',
    name: 'ShopView',
    component: () => import(/* webpackChunkName: "ShopView" */ '../views/shop/ShopView.vue')
  },
  {
    path: '/shop/:id/shoporder',
    name: 'ShopOrderView',
    component: () => import(/* webpackChunkName: "ShopOrderView" */ '../views/shoporder/ShopOrderView.vue')
  },
  {
    path: '/cartlist',
    name: 'CartListView',
    component: () => import(/* webpackChunkName: "CartListView" */ '../views/cartlist/CartListView.vue')
  },
  {
    path: '/order',
    name: 'OrderListView',
    component: () => import(/* webpackChunkName: "OrderListView" */ '../views/orderlist/OrderListView.vue')
  },
  {
    path: '/user',
    name: 'MyPageView',
    component: () => import(/* webpackChunkName: "MyPageView" */ '../views/mypage/MyPageView.vue')
  },
  {
    path: '/user/address',
    name: 'MyAddress',
    component: () => import(/* webpackChunkName: "MyAddress" */ '../views/mypage/MyAddress.vue')
  },
  {
    path: '/user/address',
    name: 'BuildNewAddress',
    component: () => import(/* webpackChunkName: "BuildNewAddress" */ '../views/mypage/BuildNewAddress.vue')
  },
  {
    path: '/user/address',
    name: 'EditorAddress',
    component: () => import(/* webpackChunkName: "EditorAddress" */ '../views/mypage/EditorAddress.vue')
  },
  {
    path: '/login',
    name: 'LoginView',
    component: () => import(/* webpackChunkName: "LoginView" */ '../views/login/LoginView.vue'),
    beforeEnter: (to, from, next) => {
      const { isLogin } = localStorage;
      if (isLogin) {
        next({ name: "HomeView" })
      } else {
        next()
      }
    }
  },
  {
    path: '/register',
    name: 'RegisterView',
    component: () => import(/* webpackChunkName: "RegisterView" */ '../views/register/RegisterView.vue'),
    beforeEnter: (to, from, next) => {
      const { isLogin } = localStorage;
      if (isLogin) {
        next({ name: "HomeView" })
      } else {
        next()
      }
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage;
  const { name } = to;
  if (!isLogin && (name !== "LoginView" && name !== "RegisterView")) {
    next({ name: 'LoginView' })
  } else {
    next()
  }
})

export default router
