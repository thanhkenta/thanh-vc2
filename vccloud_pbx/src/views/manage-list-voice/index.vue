<template>
  <div>
    <el-row class="page-title">
      <h4>Tổng quan</h4>
    </el-row>

    <div class="app-container">
      <el-card class="tab-panel">
        <el-table
          :data="numberList"
          style="width: 100%"
          highlight-current-row
          sortable
        >
          <el-table-column
            prop="number"
            label="Số tổng đài"
            min-width="180">
          </el-table-column>
          <el-table-column
            prop="url"
            label="URL kết nối"
            min-width="180">
            <template slot-scope="scope">
              {{scope.row.url ? scope.row.url : 'Chưa hoàn thành đăng ký'}}
            </template>
          </el-table-column>
          <el-table-column
            prop="deviceCount"
            label="Số lượng máy lẻ"
            min-width="180"
          >
          </el-table-column>
          <el-table-column
            prop="type"
            label="Kiểu tổng đài"
            min-width="180"
          >
          </el-table-column>
          <el-table-column
            prop="record"
            label="Ghi âm"
            min-width="180"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.record ? 'success' : 'danger'"
                close-transition
              >
                {{scope.row.record ? 'Yes' : 'No'}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="recordSavedIn"
            label="Lưu trữ ghi âm"
            min-width="180"
          >
            <template slot-scope="scope">
              {{scope.row.recordSavedIn}} ngày
            </template>
          </el-table-column>
          <el-table-column
            label="Action"
            min-width="80"
          >
            <template slot-scope="scope">
              <el-button>✕</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="block" style="margin-top: 10px; text-align: right;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
          </el-pagination>
        </div>

        <el-button type="primary" round style="margin-top: 20px;">Đăng ký đầu số</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default{
    name: 'permission',
    data() {
      return {
        numberList: [
          {
            number: '01234771233',
            url: '',
            deviceCount: 10,
            type: 'Tổng đài CSKH',
            record: false,
            recordSavedIn: 3
          },
          {
            number: '32434343',
            url: '',
            deviceCount: 10,
            type: 'Tổng đài văn phòng',
            record: true,
            recordSavedIn: 3
          },
          {
            number: '123165465',
            url: '',
            deviceCount: 20,
            type: 'Tổng đài văn phòng',
            record: false,
            recordSavedIn: 0
          },
          {
            number: '01234771233',
            url: '',
            deviceCount: 10,
            type: 'Tổng đài CSKH',
            record: false,
            recordSavedIn: 3
          },
          {
            number: '32434343',
            url: '',
            deviceCount: 10,
            type: 'Tổng đài văn phòng',
            record: true,
            recordSavedIn: 3
          },
          {
            number: '123165465',
            url: '',
            deviceCount: 20,
            type: 'Tổng đài văn phòng',
            record: false,
            recordSavedIn: 0
          },
          {
            number: '123165465',
            url: '',
            deviceCount: 20,
            type: 'Tổng đài văn phòng',
            record: false,
            recordSavedIn: 0
          }
        ]
      }
    },
    computed: {
      ...mapGetters([
        'roles'
      ])
    },
    watch: {  
      switchRoles(val) {
        this.$store.dispatch('ChangeRoles', val).then(() => {
          this.$router.push({ path: '/permission/index?' + +new Date() })
        })
      }
    }
  }
</script>
