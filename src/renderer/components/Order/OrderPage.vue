<template>
    <div class="content-page">
        <div class="content-nav">
            <el-breadcrumb class="breadcrumb" separator="/">
                <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>订单中心</el-breadcrumb-item>
                <el-breadcrumb-item>订单列表</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="operation-nav">
                <router-link to="/dashboard/order/add">
                    <el-button type="primary" icon="plus">添加订单</el-button>
                </router-link>
            </div>
        </div>
        <div class="content-main">
            <div class="filter-box">
                <el-form :inline="true" :model="filterForm" class="demo-form-inline">
                    <el-form-item label="订单号">
                        <el-input v-model="filterForm.order_sn" placeholder="请输入订单号"></el-input>
                    </el-form-item>
                    <el-form-item label="收货人">
                        <el-input v-model="filterForm.consignee" placeholder="请输入收货人"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmitFilter">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="form-table-box">
                <el-table :data="tableData" style="width: 100%" border stripe>
                    <el-table-column prop="id" label="ID" width="100">
                    </el-table-column>
                    <el-table-column prop="order_sn" label="订单号">
                    </el-table-column>
                    <el-table-column prop="add_time" label="下单时间">
                    </el-table-column>
                    <el-table-column prop="consignee" label="收货人">
                    </el-table-column>
                    <el-table-column prop="actual_price" label="订单金额">
                    </el-table-column>
                    <el-table-column prop="order_status_text" label="订单状态">
                    </el-table-column>
                    <el-table-column label="操作" width="140">
                        <template scope="scope">
                            <el-button size="small" @click="handleRowEdit(scope.$index, scope.row)">查看</el-button>
                            <el-button size="small" type="danger" @click="handleRowDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="page-box">
                <el-pagination @current-change="handlePageChange" :current-page="page" :page-size="10" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>

  export default {
    data() {
      return {
        page: 1,
        total: 0,
        filterForm: {
          name: ''
        },
        tableData: []
      }
    },
    methods: {
      handlePageChange(val) {
        this.page = val;
        //保存到localStorage
        localStorage.setItem('orderPage', this.page)
        localStorage.setItem('orderFilterForm', JSON.stringify(this.filterForm));
        this.getList()
      },
      handleRowEdit(index, row) {
        this.$router.push({ name: 'order_add', query: { id: row.id } })
      },
      handleRowDelete(index, row) {

        this.$confirm('确定要删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          this.axios.post('order/destory', { id: row.id }).then((response) => {
            console.log(response.data)
            if (response.data.errno === 0) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });

              this.getList();
            }
          })


        });
      },
      onSubmitFilter() {
        this.page = 1
        this.getList()
      },
      getList() {
        this.axios.get('order', {
          params: {
            page: this.page,
            orderSn: this.filterForm.order_sn,
            consignee: this.filterForm.consignee,
          }
        }).then((response) => {
          this.tableData = response.data.data.data
          this.page = response.data.data.currentPage
          this.total = response.data.data.count
        })
      }
    },
    components: {

    },
    mounted() {
      this.getList();
    }
  }

</script>

<style scoped>

</style>
