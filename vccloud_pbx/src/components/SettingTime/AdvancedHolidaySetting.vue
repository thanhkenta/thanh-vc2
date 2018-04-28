<template>
  <el-dialog
    title="Cài đặt chi tiết ngày nghỉ lễ"
    :visible.sync="showAdvancedHolidaySetting"
    width="80%"
    :before-close="handleClose"
  >
    <el-row>
      <el-col style="margin-bottom: 15px;">
        <el-button size="small" type="success" @click="addSetting">Thêm cài đặt</el-button>
      </el-col>
    </el-row>

    <el-table
      :data="advancedSettings"
      :show-header="false"
      style="width: 100%"
    >

      <el-table-column min-width="250">
        <template slot-scope="scope">
          <el-date-picker
            v-model="scope.row.dayRange"
            size="mini"
            type="daterange"
            range-separator="-"
            start-placeholder="Ngày bắt đầu"
            end-placeholder="Ngày kết thúc"
            format="dd/MM/yyyy"
            value-format="dd-MM-yyyy"
            style="width: 100%;"
          >
          </el-date-picker>
        </template>
      </el-table-column>

      <el-table-column min-width="200">
        <template slot-scope="scope">
          <el-time-picker
            is-range
            v-model="scope.row.timeRange"
            range-separator="-"
            start-placeholder="Từ lúc"
            end-placeholder="Đến lúc"
            format="HH:mm"
            value-format="HH:mm"
            style="width: 80%;"
            size="mini"
          >
          </el-time-picker>
        </template>
      </el-table-column>

      <el-table-column label="Chế độ chuyển tiếp" min-width="120px">
        <template slot-scope="scope">
          <el-select v-model="scope.row.redirectType" placeholder="Chọn chế độ" size="mini">
            <el-option
              v-for="item in redirectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          <el-select v-model="scope.row.mobile" placeholder="Chọn số di động" size="mini" filterable v-if="scope.row.redirectType === 'mobile'">
            <el-option
              v-for="item in mobileOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          <el-select v-model="scope.row.team" placeholder="Chọn team" size="mini" filterable v-if="scope.row.redirectType === 'team'">
            <el-option
              v-for="item in teamOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          <el-select v-model="scope.row.ext" placeholder="Chọn số máy lẻ" size="mini" filterable v-if="scope.row.redirectType === 'ext'">
            <el-option
              v-for="item in teamOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-table-column>

      <el-table-column label="Công cụ" width="150px" fixed="right">
        <template slot-scope="scope">
          <el-button plain size="mini" type="primary" @click="showSettingRedirect(scope.row.id)"><i class="el-icon-phone-outline"></i></el-button>
          <el-button plain type="danger" size="mini" @click="deleteSetting(scope.row.id)"><i class="el-icon-delete"></i></el-button>
        </template>
      </el-table-column>

    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose" size="small" :disabled="loading">Đóng</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: 'advanced-holiday-setting',
    props: ['showAdvancedHolidaySetting'],
    data() {
      return {
        advancedSettings: [
          {
            id: 1,
            dateRange: '',
            timeRange: '',
            redirectType: 'sound',
            team: '',
            ext: '',
            mobile: ''
          }
        ],
        redirectOptions: [
          { value: 'none', label: 'Gác máy' },
          { value: 'sound', label: 'Bật lời chào / Gác máy' },
          { value: 'team', label: 'Nhóm trực' },
          { value: 'mobile', label: 'Mobile' },
          { value: 'ext', label: 'Máy lẻ' }
        ],
        mobileOptions: [
          { value: '01645062976', label: '01645062976' },
          { value: '01234567890', label: '01234567890' }
        ],
        extOptions: [
          { value: '113', label: '113' },
          { value: '114', label: '114' },
          { value: '115', label: '115' }
        ],
        teamOptions: [
          { value: 'Nhóm 1', label: 'Nhóm 1' },
          { value: 'Nhóm 2', label: 'Nhóm 2' },
          { value: 'Nhóm 3', label: 'Nhóm 3' }
        ]
      }
    },
    methods: {
      handleClose() {
        this.$emit('handleClose')
      },
      showSettingRedirect(id) {
        this.$emit('showSettingRedirect', id)
      },
      addSetting() {
        this.advancedSettings.unshift({
          id: new Date().getTime(),
          dateRange: '',
          timeRange: '',
          redirectType: 'sound',
          team: '',
          ext: '',
          mobile: ''
        })
      },
      deleteSetting(id) {
        this.$confirm('Bạn chắc chắn muốn xóa cài đặt này?', 'Chú ý', {
          confirmButtonText: 'Xác nhận',
          cancelButtonText: 'Hủy bỏ',
          type: 'warning'
        }).then(() => {
          for (let i = 0; i < this.advancedSettings.length; i++) {
            if (this.advancedSettings[i].id === id) {
              this.advancedSettings.splice(i, 1)
              this.$notify({
                title: 'Thành công',
                message: 'Xóa cài đặt thành công!',
                type: 'success'
              })
              break
            }
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>

</style>
