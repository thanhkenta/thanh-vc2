<template>
  <div>
    <el-row class="page-title">
      <h4>Quản lý user</h4>
    </el-row>
    <div class="app-container">
      <el-card class="el-card">
        <h4>Danh sách user</h4>
        <el-row class="panel-header" style="margin: 0">
          <el-col :sm="24" :md="12">
            <div style="padding: 18px 0">
              <el-button @click="showAddUser = true" type="success">Thêm mới</el-button>
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
        <el-row class="panel-content">
          <el-table
            :data="listUsers"
            style="width: 100%"
            highlight-current-row
            sortable
          >
            <el-table-column
              prop="username"
              label="Tài khoản"
              min-width="180">
            </el-table-column>

            <el-table-column
              prop="password"
              label="Mật khẩu"
              min-width="180">
            </el-table-column>

            <el-table-column
              prop="fullname"
              label="Họ tên"
              min-width="180">
            </el-table-column>

            <el-table-column
              prop="role"
              label="Chức vụ"
              min-width="180">
            </el-table-column>

            <el-table-column
              prop="phone"
              label="Số điện thoại"
              min-width="180">
            </el-table-column>

            <el-table-column
              prop="email"
              label="Email"
              min-width="180">
            </el-table-column>

            <el-table-column
              min-width="180"
            >
              <template slot-scope="scope">
                <el-button size="small" type="default"><i class="el-icon-edit"></i></el-button>
                <el-button size="small" type="danger"><i class="el-icon-delete"></i></el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block" style="margin-top: 10px; text-align: right;">
            <el-pagination

              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
            </el-pagination>
          </div>
        </el-row>
      </el-card>
    </div>
    <add-user
      :showAddUser="showAddUser"
      @closeAddUser="showAddUser = false"
      @handleSubmit="showAddUser = false"
    ></add-user>
  </div>
</template>

<script>
  import AddUser from './components/AddUser'

  export default {
    components: { AddUser },
    data() {
      return {
        showAddUser: false,
        listUsers: [
          {
            username: 'Viktor',
            password: 'KM#$@4841',
            fullname: 'Đinh Hoàng Chiêu',
            role: 'Quản lý',
            phone: '0181654',
            email: 'hoangchieu@gmail.com'
          },
          {
            username: 'Lex',
            password: 'KM#$@4841',
            fullname: 'Alexander Lex',
            role: 'Nhân viên',
            phone: '2523',
            email: 'lex@gmail.com'
          },
          {
            username: 'Meave',
            password: 'KM#$@4841',
            fullname: 'Meave',
            role: 'Nhân viên',
            phone: '05315',
            email: 'meave@gmail.com'
          }
        ]
      }
    }
  }
</script>

<style>
  .el-card{
    padding: 0;
  }
  .el-card .el-card__body{
    padding-top: 5px;
  }
</style>
