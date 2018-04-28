<template>
  <el-dialog
    :title="`Cấu hình thời gian cho ${selectedDepartment.department_name}`"
    :visible.sync="settingTimeDepartmentVisible"
    width="90%"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-row class="panel-header">
      <el-col :sm="24" :md="12">
        <p class="heading">Thời gian làm việc & ngoài giờ làm việc</p>
      </el-col>
      <el-col :sm="24" :md="12">
        <div style="padding: 18px 0; text-align: right;">
          <el-button @click="redirectCall" plain round type="success" :disabled="settingTimeDepartmentLoading">Điều hướng cuộc gọi</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row class="panel-content" v-loading="settingTimeDepartmentLoading">
      <el-table
        :data="wokingTimeSettingRecords"
        style="width: 100%">
        <el-table-column
          label="Ngày"
          min-width="250">
          <template slot-scope="scope">
            <el-tag
              v-for="day in scope.row.day"
              :key="day"
              :type="day === '8' ? 'danger' : (day === '7' ? 'warning' : '')"
              style="margin: 3px"
            >
              {{ day === '8' ? 'CN' : 'Thứ ' + day }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column
          label="Điều hướng cuộc gọi"
          min-width="300">
          <template slot-scope="scope">
            <div v-if="!scope.row.info_foward">
              Chưa cấu hình điều hướng cuộc gọi
            </div>
            <div v-else>
              <div v-if="scope.row.info_foward.mode === 'mobile'">
                <el-tag type="success">{{ scope.row.info_foward.value }}</el-tag> (Di động)
              </div>
              <div v-if="scope.row.info_foward.mode === 'team'">
                <el-tag type="success">{{ scope.row.info_foward.value.name }}</el-tag> (Nhóm - {{ scope.row.info_foward.value.strategy }})
              </div>
              <div v-if="scope.row.info_foward.mode === 'ext'">
                <el-tag type="success">{{ scope.row.info_foward.value.number }}</el-tag> (Máy lẻ - {{ scope.row.info_foward.value.fullname }})
              </div>
              <div v-if="scope.row.info_foward.mode === 'none'">
                Gác máy
              </div>
              <div v-if="scope.row.info_foward.mode === 'sound'">
                Có lời chào rồi gác máy
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="Thời gian trực" min-width="320px">
          <template slot-scope="scope">
            <div v-if="scope.row.from_date">
              {{ scope.row.from_date + ' - ' + scope.row.to_date + ' (' + scope.row.time_from + ' - ' + scope.row.time_to + ')' }}
            </div>
            <div v-else>
              {{ scope.row.time_from + ' - ' + scope.row.time_to }}
            </div>
          </template>
        </el-table-column>

        <el-table-column label="Công cụ" min-width="180px">
          <template slot-scope="scope">
            <el-button plain size="small" type="primary" @click="showSettingRedirect(scope.row.id)"><i class="el-icon-phone-outline"></i></el-button>
            <el-button plain size="small" @click="updateSetting(scope.row)"><i class="el-icon-edit"></i></el-button>
            <el-button plain type="danger" size="small" @click="deleteSetting(scope.row.id)"><i class="el-icon-delete"></i></el-button>
          </template>
        </el-table-column>

      </el-table>

      <p>
        <el-button size="small" round type="success" @click="addWokingTimeSettingRecords">
          Thêm thời gian <i class="el-icon-circle-plus-outline"></i>
        </el-button>
      </p>
    </el-row>

    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose" size="small">Đóng</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { deleteTimeSetting } from '@/api/time'

  export default {
    props: ['settingTimeDepartmentVisible', 'wokingTimeSettingRecords', 'selectedDepartment', 'wokingTimeSettingRecords', 'settingTimeDepartmentLoading'],
    data() {
      return {
        settingType: 'basic',
        advanceSettingRange: '',
        datetimeRange: []
      }
    },
    methods: {
      addWokingTimeSettingRecords() {
        this.$emit('showAddSettingTime')
      },
      addOffdayRecord() {
        this.offdaySettingRecords.push({
          id: new Date().getTime(),
          selectedDay: 1,
          days: 3,
          date: ''
        })
      },
      updateSetting(setting) {
        this.$emit('showEditSettingTime', setting)
      },
      deleteSetting(settingId) {
        this.$confirm('Bạn chắc chắn muốn xóa cài đặt này?', 'Chú ý', {
          confirmButtonText: 'Xác nhận',
          cancelButtonText: 'Hủy bỏ',
          type: 'warning'
        }).then(() => {
          deleteTimeSetting({ id: settingId })
            .then(res => {
              if (res.data.status) {
                this.$notify({
                  title: 'Thành công',
                  message: 'Xóa cài đặt thành công!',
                  type: 'success'
                })
                this.$emit('fetchTimeSettings')
              } else {
                this.$notify({
                  title: 'Thất bại',
                  message: 'Xóa cài đặt thất bại, hãy thử lại!',
                  type: 'error'
                })
              }
            })
        }).catch((err) => {
          console.log(err)
        })
      },
      showSettingRedirect(id) {
        this.$emit('showSettingRedirect', id)
      },
      handleClose() {
        this.$emit('closeModal')
      },
      redirectCall() {
        this.$emit('redirectCall')
      }
    }
  }
</script>

<style></style>
