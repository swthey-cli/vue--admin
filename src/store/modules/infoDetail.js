const state = {
    id: "" || sessionStorage.getItem("info_id"),
    title: "" || sessionStorage.getItem("info_title")
};
const getters = {
    //获取值
    info_id: state => state.id,
    info_title: state => state.title
};
const mutations = {
    UPDATE_STATE_VALUE(state,params){
        for(let key in params){
            state[key] =params[key].value;
            if(params[key].session){
                sessionStorage.setItem(params[key].sessionKey,params[key].value);
            }
        }
    }
};
const actions = {
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};