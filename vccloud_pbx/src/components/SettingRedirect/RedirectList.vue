<template>
  <el-dialog
    title="Thêm thông tin chuyển tiếp cá nhân"
    :visible.sync="showRedirectList"
    max-width="90%"
    width="500px"
    :before-close="handleClose"
  >
    <el-input
      placeholder="Nhập tên người cần tìm..."
      prefix-icon="el-icon-search"
      v-model="keywords">
    </el-input>
    <el-table
      :data="phoneNumberList"
      style="width: 100%; margin-top: 15px"
    >
      <el-table-column
        label="Tên"
        prop="name"
        min-width="120"
      >
      </el-table-column>

      <el-table-column
        label="Số di động"
        prop="phoneNumber"
        min-width="120"
      >
      </el-table-column>

      <el-table-column
        min-width="80"
      >
        <template slot-scope="scope">
          <el-button plain size="small" @click="selectNumber(scope.row)">Chọn</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 15px; text-align: right;">
      <el-pagination
        layout="total, prev, pager, next"
        :total="total"
        :current-page.sync="page"
        :page-size="5"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose" size="small">Đóng</el-button>
  </span>
  </el-dialog>
</template>

<script>
    export default {
      props: ['showRedirectList', 'extList'],
      data() {
        return {
          keywords: '',
          total: 0,
          page: 1
        }
      },
      computed: {
        phoneNumberList() {
          let list = []
          const size = 5
          for (let i = 0; i < this.extList.length; i = i + 1) {
            for (let j = 0; j < this.extList[i].extension_mobile.length; j = j + 1) {
              list.push({
                name: this.extList[i].extension_user_fullname,
                phoneNumber: this.extList[i].extension_mobile[j]
              })
            }
          }
          list = list.filter(info => {
            return info.name.toLowerCase().indexOf(this.keywords.toLowerCase()) >= 0
          })
          this.total = list.length
          const start = ((this.page - 1) * size)
          const end = this.page * size > this.total ? this.total : this.page * size
          return list.slice(start, end)
        }
      },
      methods: {
        handleClose() {
          this.$emit('handleClose')
        },
        selectNumber(data) {
          this.page = 1
          this.$emit('selectNumber', data)
        },
        handleCurrentChange(page) {
          this.page = page
        }
      }
    }
</script>

<style scoped>

</style>
