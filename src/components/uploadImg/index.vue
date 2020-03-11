<template>
  <el-upload
    class="avatar-uploader"
    action="http://up-z1.qiniup.com"
    :data="data.uploadKey"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="data.images" :src="data.images" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>
<script>
import { reactive, onMounted, watch } from "@vue/composition-api";
import { QiniuToken } from "@/api/common";
export default {
  name: "uploadImg",
  props: {
    imgurl: {
      type: String,
      default: ""
    }
  },
  setup (props, { root, emit }) {
    const data = reactive({
      images: "",
      actions: "",
      uploadKey: {
        token: "",
        key: ""
      }
    });
    //获取七牛云token
    const getQiniuToken = () => {
      QiniuToken({
        accesskey: root.$store.getters["common/accesskey"],
        secretkey: root.$store.getters["common/secretkey"],
        buckety: root.$store.getters["common/buckety"]
      })
        .then(response => {
          data.uploadKey.token = response.data.data.token;
        })
        .catch();
    };
    //上传操作 返回图片地址
    const handleAvatarSuccess = res => {
      data.images = `${root.$store.getters["common/qiniuUrl"]}${res.key}`;
      //子组件向父组件回传值
      emit("update:imgurl", data.images);
    };
    //上传图片验证
    const beforeAvatarUpload = file => {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        root.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        root.$message.error("上传头像图片大小不能超过 2MB!");
      }
      //文件转码
      let suffix = file.name;
      let key = encodeURI(`${suffix}`);
      data.uploadKey.key = key;
      return isJPG && isLt2M;
    };
    watch(
      () => props.imgurl,
      value => {
        data.images = value;
      }
    );
    onMounted(() => {
      data.actions = root.$store.getters["common/actions"];
      getQiniuToken();
    });

    return {
      data,
      handleAvatarSuccess,
      beforeAvatarUpload,
      getQiniuToken
    };
  }
};
</script>
<style lang="scss" scoped>
.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
