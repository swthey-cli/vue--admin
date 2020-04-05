import router from "./index";
import { getToken, removeToken, removeUserName } from "@/utils/app";
import store from "@/store/index";
const whilteRouter = ['/login'];
//路由守卫 防止非法跳转进入
router.beforeEach((to, from, next) => {
    console.log(to);
    if (getToken()) {
        if (to.path === "/login") {
            removeToken();
            removeUserName();
            store.commit("app/SET_TOKEN",'');
            store.commit("app/SET_TOKEN",'');
        }
        next();
    } else {
        console.log("不存在token");
        if (whilteRouter.indexOf(to.path) !== -1) {
            next(); 
        } else {
            next('/login');
        }
    }
});