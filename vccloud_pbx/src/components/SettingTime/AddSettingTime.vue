<template>
  <el-dialog
    title="Thêm cấu hình thời gian"
    :visible.sync="addSettingTimeFormVisible"
    width="500px"
    :before-close="handleClose"
  >
    <el-form label-width="200px" label-position="top" :model="form" :rules="formRules" ref="addSettingTimeForm" v-loading="loading">
      <el-form-item>
        <el-switch
          v-model="form.advancedSetting"
          active-color="#13ce66"
          active-text="Cài đặt nâng cao"
        >
        </el-switch>
      </el-form-item>

      <el-form-item label="Chọn ngày" prop="days">
        <el-select v-model="form.days" multiple placeholder="Chọn ngày">
          <el-option
            v-for="item in dayOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Chọn khoảng thời gian (ngày)" v-if="form.advancedSetting"  prop="dateRange">
        <el-date-picker
          v-model="form.dateRange"
          type="daterange"
          range-separator="-"
          start-placeholder="Ngày bắt đầu"
          end-placeholder="Ngày kết thúc"
          format="dd/MM/yyyy"
          value-format="dd-MM-yyyy"
          style="width: 100%;"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item label="Chọn khoảng thời gian (giờ : phút)"  prop="timeRange">
        <el-time-picker
          is-range
          v-model="form.timeRange"
          range-separator="-"
          start-placeholder="Từ lúc"
          end-placeholder="Đến lúc"
          format="HH:mm"
          value-format="HH:mm"
          style="width: 100%;"
        >
        </el-time-picker>
      </el-form-item>

    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose" size="small" :disabled="loading">Đóng</el-button>
      <el-button type="primary" size="small" @click="handleAdd" :disabled="loading">Thêm</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { createOrUpdateTimeSetting } from '@/api/time'
  import { handleErrorSettingTime } from '@/utils'

  export default {
    props: ['addSettingTimeFormVisible', 'selectedDepartmentId'],
    data() {
      // const today = new Date()
      // let tomorrow = new Date()
      // tomorrow = new Date(tomorrow.setDate(tomorrow.getDate() + 1))
      return {
        loading: false,
        step: 0,
        form: {
          advancedSetting: false,
          days: [],
          dateRange: '',
          timeRange: ''
        },
        formRules: {
          days: [{ required: true, trigger: 'blur, change', message: 'Hãy chọn ít nhất một ngày' }],
          dateRange: [{ required: true, trigger: 'blur, change', message: 'Hãy chọn khoảng thời gian' }],
          timeRange: [{ required: true, trigger: 'blur, change', message: 'Hãy chọn khoảng thời gian' }],
          teamName: [{ required: true, trigger: 'blur, change', message: 'Hãy chọn nhóm trực' }]
        },
        dayOptions: [
          { value: '2', label: 'Thứ 2' },
          { value: '3', label: 'Thứ 3' },
          { value: '4', label: 'Thứ 4' },
          { value: '5', label: 'Thứ 5' },
          { value: '6', label: 'Thứ 6' },
          { value: '7', label: 'Thứ 7' },
          { value: '8', label: 'Chủ nhật' }
        ]
      }
    },
    watch: {},
    methods: {
      handleClose() {
        this.$emit('closeSettingTimeModal')
      },
      handleAdd() {
        this.$refs.addSettingTimeForm.validate(valid => {
          if (valid) {
            const params = {
              id_department: this.selectedDepartmentId,
              time_from: this.form.timeRange[0],
              time_to: this.form.timeRange[1],
              day: this.form.days
            }
            if (this.form.advancedSetting) {
              params['from_date'] = this.form.dateRange[0]
              params['to_date'] = this.form.dateRange[1]
            }
            this.loading = true
            createOrUpdateTimeSetting(params)
              .then(res => {
                this.loading = false
                if (res.data.status) {
                  this.$notify({
                    title: 'Thành công',
                    message: 'Thêm cài đặt thời gian thành công!',
                    type: 'success'
                  })
                  this.$refs.addSettingTimeForm.clearValidate()
                  this.form = {
                    advancedSetting: false,
                    days: [],
                    dateRange: '',
                    timeRange: '',
                    teamName: ''
                  }
                  this.$emit('settingTimeAdded')
                } else {
                  this.$notify({
                    dangerouslyUseHTMLString: true,
                    title: 'Thêm cài đặt thất bại',
                    message: `Thời gian bị trùng với cài đặt: <strong style="color:#cc2020;">${handleErrorSettingTime(res.data.date_duplicate)}</strong>`,
                    type: 'error'
                  })
                }
              })
              .catch(err => {
                console.log(err)
                this.loading = false
              })
          }
        })
      }
    }
  }
</script>

<style>
  .el-date-editor--datetimerange {
    width: 100%!important;
  }
</style>
