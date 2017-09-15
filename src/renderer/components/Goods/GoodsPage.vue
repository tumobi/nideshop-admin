<template>
    <div class="content-page">
        <div class="content-nav">
            <el-breadcrumb class="breadcrumb" separator="/">
                <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                <el-breadcrumb-item>商品列表</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="operation-nav">
                <router-link to="/dashboard/goods/add">
                    <el-button type="primary" icon="plus">添加商品</el-button>
                </router-link>
            </div>
        </div>
        <div class="content-main">
            <div class="filter-box">
                <el-form :inline="true" :model="filterForm" class="demo-form-inline">
                    <el-form-item label="商品名称">
                        <el-input v-model="filterForm.name" placeholder="商品名称"></el-input>
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
                    <el-table-column prop="name" label="商品名称">
                    </el-table-column>
                    <el-table-column prop="retail_price" label="售价" width="120">
                    </el-table-column>
                    <el-table-column prop="goods_number" label="库存" width="120">
                    </el-table-column>
                    <el-table-column prop="is_new" label="新品" width="80">
                        <template scope="scope">
                            {{ scope.row.is_new == 1 ? '是' : '否' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="is_new" label="人气" width="80">
                        <template scope="scope">
                            {{ scope.row.is_hot == 1 ? '是' : '否' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="is_show" label="上架" width="80">
                        <template scope="scope">
                            {{ scope.row.is_on_sale == 1 ? '是' : '否' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="sort_order" label="排序" width="80">
                    </el-table-column>
                    <el-table-column label="操作" width="140">
                        <template scope="scope">
                            <el-button size="small" @click="handleRowEdit(scope.$index, scope.row)">编辑</el-button>
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
        localStorage.setItem('goodsPage', this.page)
        localStorage.setItem('goodsFilterForm', JSON.stringify(this.filterForm));
        this.getList()
      },
      handleRowEdit(index, row) {
        this.$router.push({ name: 'goods_add', query: { id: row.id } })
      },
      handleRowDelete(index, row) {

        this.$confirm('确定要删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          this.axios.post('商品/destory', { id: row.id }).then((response) => {
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
        this.axios.get('goods', {
          params: {
            page: this.page,
            name: this.filterForm.name
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
