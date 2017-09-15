<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item :to="{ name: 'dashboard' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{infoForm.id ? '编辑商品' : '添加商品'}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="operation-nav">
        <el-button type="primary" @click="goBackPage" icon="arrow-left">返回列表</el-button>
      </div>
    </div>
    <div class="content-main">
      <div class="form-table-box">
        <el-form ref="infoForm" :rules="infoRules" :model="infoForm" label-width="120px">
          <el-form-item label="所属分类">
            <el-cascader :options="options" placeholder="请选择分类" v-model="selectedOptions" @change="handleChange">
            </el-cascader>
          </el-form-item>
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="infoForm.name"></el-input>
          </el-form-item>
          <el-form-item label="所属品牌">
            <el-select v-model="infoForm.region" placeholder="请选择商品">
              <el-option label="长城" value="shanghai"></el-option>
              <el-option label="宝马" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品简介" prop="simple_desc">
            <el-input type="textarea" v-model="infoForm.simple_desc" :rows="3"></el-input>
            <div class="form-tip"></div>
          </el-form-item>
          <el-form-item label="商品图片" prop="list_pic_url">
            <el-upload class="image-uploader" name="brand_pic"
                       action="http://127.0.0.1:8360/admin/upload/brandPic" :show-file-list="true"
                       :on-success="handleUploadImageSuccess" :headers="uploaderHeader">
              <img v-if="infoForm.list_pic_url" :src="infoForm.list_pic_url" class="image-show">
              <i v-else class="el-icon-plus image-uploader-icon"></i>
            </el-upload>
            <div class="form-tip">图片尺寸：750*420</div>
          </el-form-item>
          <el-form-item label="规格/库存" prop="simple_desc">

          </el-form-item>
          <el-form-item label="推荐类型">
            <el-checkbox-group v-model="infoForm.type">
              <el-checkbox label="新品" name="type"></el-checkbox>
              <el-checkbox label="人气" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="上架">
            <el-switch on-text="" off-text="" v-model="infoForm.status"></el-switch>
          </el-form-item>
          <el-form-item label="排序">
            <el-input-number v-model="infoForm.sort_order" :min="1" :max="1000"></el-input-number>
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
        infoForm: {
          id: 0,
          name: "",
          list_pic_url: '',
          simple_desc: '',
          pic_url: '',
          sort_order: 100,
          is_show: true,
          floor_price: 0,
          app_list_pic_url: '',
          is_new: false,
          new_pic_url: "",
          new_sort_order: 10
        },
        infoRules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
          ],
          simple_desc: [
            { required: true, message: '请输入简介', trigger: 'blur' },
          ],
          list_pic_url: [
            { required: true, message: '请选择商品图片', trigger: 'blur' },
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
            this.axios.post('brand/store', this.infoForm).then((response) => {
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
            //商品图片
            case 'brand_pic':
              this.$set('infoForm.list_pic_url', res.data.fileUrl);
              break;
            case 'brand_new_pic':
              this.$set('infoForm.new_pic_url', res.data.fileUrl);
              break;
          }
        }
      },
      getInfo() {
        if (this.infoForm.id <= 0) {
          return false
        }

        //加载商品详情
        let that = this
        this.axios.get('brand/info', {
          params: {
            id: that.infoForm.id
          }
        }).then((response) => {
          let resInfo = response.data.data;
          resInfo.is_new = resInfo.is_new ? true : false;
          resInfo.is_show = resInfo.is_show ? true : false;
          that.infoForm = resInfo;
        })
      }

    },
    components: {},
    mounted() {
      this.infoForm.id = this.$route.query.id || 0;
      this.getInfo();
      console.log(api)
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
    width: 187px;
    height: 105px;
    line-height: 105px;
    text-align: center;
  }

  .image-uploader .image-show {
    width: 187px;
    height: 105px;
    display: block;
  }

  .image-uploader.new-image-uploader {
    font-size: 28px;
    color: #8c939d;
    width: 165px;
    height: 105px;
    line-height: 105px;
    text-align: center;
  }

  .image-uploader.new-image-uploader .image-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 165px;
    height: 105px;
    line-height: 105px;
    text-align: center;
  }

  .image-uploader.new-image-uploader .image-show {
    width: 165px;
    height: 105px;
    display: block;
  }
</style>
