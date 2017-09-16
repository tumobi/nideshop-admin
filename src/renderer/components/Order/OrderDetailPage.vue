<template>
    <div class="content-page">
        <div class="content-nav">
            <div class="breadcrumb">
                订单详情
            </div>
            <div class="operation-nav">
                <el-button type="primary" @click="goBackPage" size="small" icon="arrow-left">返回列表</el-button>
            </div>
        </div>
        <div class="content-main">
            <div class="form-table-box" v-loading="pageLoading" element-loading-text="拼命加载中">
               
            </div>
        </div>
    </div>
</template>

<script>
import {brandInfo} from '@/config/api'
    export default {
        data() {
            return {
                pageLoading: false,
                infoForm: {
                    id: 0,
                }
            }
        },
        methods: {
            goBackPage() {
                this.$router.go(-1);
            },
            getInfo() {
                if (this.infoForm.id <= 0) {
                    return false
                }

                //加载品牌详情
                let that = this
                brandInfo({
                        id: that.infoForm.id
                    }).then((response) => {
                    console.log(response);
                    let resInfo = response.data;
                    that.infoForm = resInfo;
                    this.pageLoading = false;
                })
            }

        },
        components: {},
        mounted() {
            console.log(this.$route.query)
            this.infoForm.id = this.$route.query.id || 0;
            this.getInfo();
        }
    }

</script>

<style>
   
</style>
