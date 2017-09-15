<template>
    <div class="content-page">
        <div class="content-nav">
            <el-breadcrumb class="breadcrumb" separator="/">
                <el-breadcrumb-item :to="{ name: 'dashboard' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                <el-breadcrumb-item>{{infoForm.id ? '编辑分类' : '添加分类'}}</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="operation-nav">
                <el-button type="primary" @click="goBackPage" icon="arrow-left">返回列表</el-button>
            </div>
        </div>
        <div class="content-main">
            <div class="form-table-box">
                <el-form ref="infoForm" :rules="infoRules" :model="infoForm" label-width="120px">
                    <el-form-item label="上级分类" prop="name">
                        <el-select v-model="infoForm.parent_id" placeholder="请选择上级分类">
                            <el-option v-for="item in parentCategory" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="分类名称" prop="name">
                        <el-input v-model="infoForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="简短介绍" prop="front_name">
                        <el-input type="textarea" v-model="infoForm.front_name" :rows="1"></el-input>
                        <div class="form-tip"></div>
                    </el-form-item>
                    <el-form-item label="图标" prop="wap_banner_url">
                        <el-upload class="image-uploader" name="wap_banner_pic"
                                   action="http://127.0.0.1:8360/admin/upload/categoryWapBannerPic" :show-file-list="false"
                                   :on-success="handleUploadImageSuccess" :headers="uploaderHeader">
                            <img v-if="infoForm.wap_banner_url" :src="infoForm.wap_banner_url" class="image-show">
                            <i v-else class="el-icon-plus image-uploader-icon"></i>
                        </el-upload>
                        <div class="form-tip">图片尺寸：顶级分类为750*246，二级分类为250*250</div>
                    </el-form-item>
                    <el-form-item label="排序">
                        <el-input-number v-model="infoForm.sort_order" :min="1" :max="1000"></el-input-number>
                    </el-form-item>
                    <el-form-item label="启用">
                        <el-switch v-model="infoForm.is_show"></el-switch>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmitInfo">确定保存</el-button>
                        <el-button @click="goBackPage">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
  import api from '@/config/api';
  export default {
    data() {
      return {
        uploaderHeader: {
          'X-Nideshop-Token': localStorage.getItem('token') || '',
        },
        parentCategory: [
          {
            id: 0,
            name: '顶级分类'
          }
        ],
        infoForm: {
          id: 0,
          name: "",
          parent_id: 0,
          front_name: '',
          wap_banner_url: '',
          sort_order: 100,
          is_show: true,
        },
        infoRules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
          ],
          front_name: [
            { required: true, message: '请输入简介', trigger: 'blur' },
          ],
          wap_banner_url: [
            { required: true, message: '请选择分类图片', trigger: 'blur' },
          ],
        },
      }
    },
    methods: {
      goBackPage() {
        this.$router.go(-1);
      },
      onSubmitInfo() {
        this.$refs['infoForm'].validate((valid) => {
          if (valid) {
            this.axios.post('category/store', this.infoForm).then((response) => {
              if (response.data.errno === 0) {
                this.$message({
                  type: 'success',
                  message: '保存成功'
                });
                this.$router.go(-1)
              } else {
                this.$message({
                  type: 'error',
                  message: '保存失败'
                })
              }
            })
          } else {
            return false;
          }
        });
      },
      handleUploadImageSuccess(res, file) {
        if (res.errno === 0) {
          switch (res.data.name) {
            //分类图片
            case 'wap_banner_url':
//              this.$set('infoForm.wap_banner_url', res.data.fileUrl);
              this.infoForm.wap_banner_url = res.data.fileUrl;
              break;
          }
        }
      },
      getTopCategory() {
        this.axios.get('category/topCategory').then((response) => {
          this.parentCategory = this.parentCategory.concat(response.data.data);
        })
      },
      getInfo() {
        if (this.infoForm.id <= 0) {
          return false
        }

        //加载分类详情
        let that = this
        this.axios.get('category/info', {
          params: {
            id: that.infoForm.id
          }
        }).then((response) => {
          let resInfo = response.data.data;
          resInfo.is_show = resInfo.is_show ? true : false;
          that.infoForm = resInfo;
        })
      }

    },
    components: {},
    mounted() {
      this.getTopCategory();
      this.infoForm.id = this.$route.query.id || 0;
      this.getInfo();
    }
  }

</script>

<style>
    .image-uploader{
        height: 105px;
    }
    .image-uploader .el-upload {
        border: 1px solid #d9d9d9;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .image-uploader .el-upload:hover {
        border-color: #20a0ff;
    }

    .image-uploader .image-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        min-width: 105px;
        height: 105px;
        line-height: 105px;
        text-align: center;
    }

    .image-uploader .image-show {
        min-width: 105px;
        height: 105px;
        display: block;
    }

</style>
