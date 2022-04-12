import { toRefs, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";


//封装的添加到购物车功能
export const useShopCartEffect = () => {
    const store = useStore();
    const { clearShop, shopCartList } = toRefs(store.state);
    const changeShopItemToCart = (shopId, shopName, productId, product, num) => {
        store.commit("changeShopItemToCart", { shopId, shopName, productId, product, num });
    };
    return { clearShop, shopCartList, changeShopItemToCart };
};

//封装的计算添加进购物车的商品数量、价格、选中状态
export const computeShopNumAndPrice = () => {
    const router = useRoute();
    const shopId = router.params.id;
    const store = useStore();

    const calculation = computed(() => {
        // 计算商品数量、总价格、选中状态
        const result = { cartShopSum: 0, totalPrice: 0, allSelect: true }
        const productId = store.state.shopCartList[shopId]?.productList;
        if (productId) {
            for (let i in productId) {
                const count = productId[i].count;
                const price = productId[i].price;
                result.cartShopSum += count;
                // 如果商品被选中，就计算其总价
                if (productId[i].select) {
                    result.totalPrice += count * price;
                }
                const productInfo = productId[i];
                // 如果商品的数量大于0，且未被选中，则全选的状态为false
                if (productInfo.count > 0 && !productInfo.select) {
                    result.allSelect = false;
                }
            }
        }
        // 保留到小数后两位，不进行四舍五入
        if (String(result.totalPrice).includes(".")) {
            const point = String(result.totalPrice).indexOf(".") + 3;
            const shop_price = String(result.totalPrice).substring(0, point);
            result.totalPrice = Number(shop_price)
            return result;
        } else {
            return result;
        }
    });

    // 获取商品所属的店铺名称
    const shopName = computed(() => {
        const product = store.state.shopCartList[shopId] || {};
        const shopName = product.shopname;
        return shopName
    })

    // 提交订单时，获取数量不为空的商品，以及选中状态的商品
    const cartProductList = computed(() => {
        const productList = store.state.shopCartList[shopId]?.productList || {};
        const totalProductList = { notEmptyProductList: {}, orderProductList: {} }
        for (const i in productList) {
            if (productList[i].count > 0) {
                totalProductList.notEmptyProductList[i] = productList[i];
                if (productList[i].select) {
                    totalProductList.orderProductList[i] = productList[i];
                }
            }
        }
        return totalProductList
    })

    // 为当前商品添加选中状态
    const handleClickSelect = (shopId, productId) => {
        store.commit("changeCurrentProductSelected", { shopId, productId });
    };

    // 为全部商品添加选中状态
    const changeAllProductSelected = (shopId, yes, no) => {
        store.commit("changeAllProductSelected", { shopId, yes, no });
    };

    return { store, shopId, shopName, calculation, cartProductList, handleClickSelect, changeAllProductSelected };
};


