import { GetCategory } from "@/api/news";
const state = {
  //图片访问域名前缀
  qiniuUrl: "http://q70pgjtz0.bkt.clouddn.com/",
  //图片上传服务器地址
  qiniuAction: "http://up-z1.qiniup.com",
  //七牛云秘钥
  accesskey: "J9dMVSKPnTTNJICnkofQG6qgSgaaAsbNPXE_0Dgz",
  //七牛云私钥
  secretkey: "66HUy2fgOCcY83rcjYfkESsepaobejDT9U_cCLUW",
  //七牛云存储空间名
  buckety: "swthey"
};
const getters = {
  qiniuUrl: state => state.qiniuUrl,
  qiniuAction: state => state.qiniuAction,
  accesskey: state => state.accesskey,
  secretkey: state => state.secretkey,
  buckety: state => state.buckety
};
const actions = {
  getInfoCategory () {
    return new Promise((resolve, reject) => {
      GetCategory({})
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions
};
