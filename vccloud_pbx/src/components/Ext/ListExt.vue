<template>
  <div>
    <div class="app-container">
      <el-card class="el-card">
        <el-row class="panel-header" style="margin: 0">
          <el-col :sm="24" :md="12">
            <div style="padding: 18px 0">
              <el-button type="success" @click="handleAddNew">Thêm mới</el-button>
            </div>
          </el-col>
          <el-col :sm="24" :md="12">
            <div style="padding: 18px 0; text-align: right;">
              <el-input
                style="width: 300px"
                placeholder="Tìm kiếm..."
                prefix-icon="el-icon-search">
              </el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-table
            :data="listContact"
            style="width: 100%"
          >
            <el-table-column
              type="index"
              min-width="50px"
            >
            </el-table-column>

            <el-table-column
              prop="extension_number"
              min-width="90"
              label="Số máy lẻ"
            >
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input v-model="scope.row.extension_number"></el-input>
                </div>
                <div v-else>{{ scope.row.extension_number }}</div>
              </template>
            </el-table-column>

            <el-table-column
              prop="extension_user_fullname"
              min-width="100"
              label="Người dùng"
            >
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input v-model="scope.row.extension_user_fullname"></el-input>
                </div>
                <div v-else>{{ scope.row.extension_user_fullname }}</div>
              </template>
            </el-table-column>

            <el-table-column
              prop="phone_number"
              min-width="130"
              label="Máy lẻ di động"
            >
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input v-model="scope.row.phone_number"></el-input>
                </div>
                <div v-else>{{ scope.row.phone_number }}</div>
              </template>
            </el-table-column>

            <el-table-column
              prop="info_mac"
              min-width="100"
              label="Mac thiết bị"
            >
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input v-model="scope.row.info_mac"></el-input>
                </div>
                <div v-else>{{ scope.row.info_mac }}</div>
              </template>
            </el-table-column>

            <el-table-column label="Công cụ" min-width="130px">
              <template slot-scope="scope">
                <el-button size="small" @click="handleEdit(scope.row)" v-if="!scope.row.edit"><i class="el-icon-edit"></i></el-button>
                <el-button type="success" size="small" @click="scope.row.edit = false" v-if="scope.row.edit" plain>Lưu</el-button>
                <el-button size="small" @click="handleCancelEdit(scope.row)" v-if="scope.row.edit">Hủy</el-button>
                <el-button size="small" type="danger" plain @click="handleDeleteExt(scope.row.id)"><i class="el-icon-delete"></i></el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block pagination">
            <el-pagination
              @current-change="handleCurrentChange"
              :page-size="5"
              layout="total, prev, pager, next"
              :total="totalExt">
            </el-pagination>
          </div>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
  // import { deleteExt } from '@/api/extensionNumber'

  export default {
    name: 'list-ext',
    props: ['extList', 'totalExt'],
    data() {
      return {
        tempValue: {},
        listContact: [
          {
            id: 1,
            extension_number: '1351320',
            extension_user_fullname: 'Viktor',
            phone_number: '0164871681',
            info_mac: 'Mac 1',
            edit: false
          },
          {
            id: 2,
            extension_number: '123456',
            extension_user_fullname: 'Zhin',
            phone_number: '097822465',
            info_mac: 'Mac 2',
            edit: false
          },
          {
            id: 3,
            extension_number: '9876542',
            extension_user_fullname: 'Makoa',
            phone_number: '0164855554',
            info_mac: 'Mac 3',
            edit: false
          },
          {
            id: 4,
            extension_number: '9876542',
            extension_user_fullname: 'Makoa',
            phone_number: '0164855554',
            info_mac: 'Mac 3',
            edit: false
          },
          {
            id: 5,
            extension_number: '9876542',
            extension_user_fullname: 'Makoa',
            phone_number: '0164855554',
            info_mac: 'Mac 3',
            edit: false
          },
          {
            id: 6,
            extension_number: '9876542',
            extension_user_fullname: 'Makoa',
            phone_number: '0164855554',
            info_mac: 'Mac 3',
            edit: false
          },
          {
            id: 7,
            extension_number: '9876542',
            extension_user_fullname: 'Makoa',
            phone_number: '0164855554',
            info_mac: 'Mac 3',
            edit: false
          },
          {
            id: 8,
            extension_number: '9876542',
            extension_user_fullname: 'Makoa',
            phone_number: '0164855554',
            info_mac: 'Mac 3',
            edit: false
          },
          {
            id: 9,
            extension_number: '9876542',
            extension_user_fullname: 'Makoa',
            phone_number: '0164855554',
            info_mac: 'Mac 3',
            edit: false
          },
          {
            id: 10,
            extension_number: '9876542',
            extension_user_fullname: 'Makoa',
            phone_number: '0164855554',
            info_mac: 'Mac 3',
            edit: false
          }
        ]
      }
    },
    methods: {
      handleAddNew() {
        this.$emit('showCreateForm')
      },
      handleCancelEdit(selectedContact) {
        selectedContact.id = this.tempValue.id
        selectedContact.info_mac = this.tempValue.info_mac
        selectedContact.phone_number = this.tempValue.phone_number
        selectedContact.extension_number = this.tempValue.extension_number
        selectedContact.extension_user_fullname = this.tempValue.extension_user_fullname
        selectedContact.edit = false
      },
      handleEdit(selectedContact) {
        this.tempValue = Object.assign({}, selectedContact)
        selectedContact.edit = true
        for (let i = 0; i < this.listContact.length; i = i + 1) {
          if (this.listContact[i].id !== selectedContact.id) {
            this.listContact[i].edit = false
          }
        }
      },
      handleCurrentChange(page) {
        this.$emit('listExtPageChange', page)
      },
      handleDeleteExt(id) {
        this.$confirm(`Bạn chắc chắn muốn xóa đối tượng liên lạc này?`, 'Chú ý', {
          confirmButtonText: 'Xác nhận',
          cancelButtonText: 'Hủy',
          type: 'warning'
        }).then(() => {
          for (let i = 0; i < this.listContact.length; i = i + 1) {
            if (this.listContact[i].id === id) {
              this.listContact.splice(i, 1)
              this.$notify({
                title: 'Thành công',
                message: 'Xóa đối tượng liên lạc thành công!',
                type: 'success'
              })
              break
            }
          }
        }).catch(_ => {})
        // this.$confirm(`Bạn chắc chắn muốn xóa máy lẻ ${selectedExt.extension_number}?`, 'Chú ý', {
        //   confirmButtonText: 'Xác nhận',
        //   cancelButtonText: 'Hủy',
        //   type: 'warning'
        // }).then(() => {
        //   const params = { id: selectedExt.id }
        //   deleteExt(params).then(res => {
        //     if (res.data.status) {
        //       this.$emit('fetchExtList')
        //       this.$notify({
        //         title: 'Thành công',
        //         message: 'Xóa máy lẻ thành công!',
        //         type: 'success'
        //       })
        //     } else {
        //       this.$notify({
        //         title: 'Thất bại',
        //         message: 'Xóa máy lẻ thất bại, hãy thử lại sau!',
        //         type: 'error'
        //       })
        //     }
        //   }).catch(_ => {
        //     this.$notify({
        //       title: 'Thất bại',
        //       message: 'Xóa máy lẻ thất bại, hãy thử lại sau!',
        //       type: 'error'
        //     })
        //   })
        // }).catch(_ => {})
      },
      handleEditExt(selectedExt) {
        this.$emit('showEditExtModal', selectedExt)
      }
    }
  }
</script>

<style scoped>
  .pagination{
    margin-top: 20px;
    float: right;
  }
</style>
