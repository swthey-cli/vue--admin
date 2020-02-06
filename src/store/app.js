const app = {
    state: {
        isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false
    },
    getters: {
        isCollapse: state => state.isCollapse
    },
    mutations: {  //同步 没有回调处理事情
        setCollapse(state) {
            state.isCollapse = !state.isCollapse;
            //Cookie.set("isCollapse",JSON.stringify(state.isCollapse));
            sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
        }
    },
    actions: { //可以回调处理事情
        login(content, requestData) {
            return new Promise((resolve, reject) => {
                Login(requestData).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        }
    },
}
export default app;