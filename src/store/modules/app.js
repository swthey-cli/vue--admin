import { Login } from "@/api/login";
import { setToken, setUserName, getUserName } from "@/utils/app";
const state = {
    isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,
    to_ken: '',
    username: getUserName() || ''
};
const getters = {
    isCollapse: state => state.isCollapse
};
const mutations = {
    SET_COLLAPSE(state) {//setCollapse
        state.isCollapse = !state.isCollapse;
        //Cookie.set("isCollapse",JSON.stringify(state.isCollapse));
        sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
    },
    SET_TOKEN(state, value) {
        state.to_ken = value;
    },
    SET_USERNAME(state, value) {
        state.username = value;
    }
};
const actions = {
    Login(content, requestData) {
        return new Promise((resolve, reject) => {
            Login(requestData).then(response => {
                //存token username
                let data = response.data.data;
                content.commit('SET_TOKEN', data.token);
                content.commit('SET_USERNAME', data.username);
                setToken(data.token);
                setUserName(data.username);
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};