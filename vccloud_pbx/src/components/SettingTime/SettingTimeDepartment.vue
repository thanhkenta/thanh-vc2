<template>
  <el-dialog
    :title="`Cấu hình thời gian cho ${selectedDepartment.department_name}`"
    :visible.sync="settingTimeDepartmentVisible"
    width="90%"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    top="30px"
  >
    <!--Cấu hình mặc định-->
    <el-row class="panel-header">
      <el-col :sm="24" :md="12">
        <p class="heading">Cấu hình mặc định</p>
      </el-col>
      <el-col :sm="24" :md="12">
        <div style="padding: 18px 0; text-align: right;">
          <el-button size="mini" @click="handleShowGreetingList" plain type="warning" :disabled="settingTimeDepartmentLoading">Lời chào</el-button>
          <el-button size="mini" plain type="primary" :disabled="settingTimeDepartmentLoading">Cấu hình mặc định</el-button>
        </div>
      </el-col>
    </el-row>
    <!--Giờ làm việc-->
    <el-row class="panel-header">
      <el-col :sm="24" :md="12">
        <p class="heading">Thời gian làm việc</p>
      </el-col>
      <el-col :sm="24" :md="12">
        <div style="padding: 18px 0; text-align: right;">
          <el-button size="mini" @click="handleShowGreetingList" plain type="warning" :disabled="settingTimeDepartmentLoading">Lời chào</el-button>
          <el-button size="mini" @click="addTimeSetting" plain type="success" :disabled="settingTimeDepartmentLoading">Thêm thời gian</el-button>
          <el-button size="mini" plain type="primary" :disabled="settingTimeDepartmentLoading">Điều hướng cuộc gọi</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row class="panel-content" v-loading="settingTimeDepartmentLoading">
      <el-table
        :data="dataTable"
        :show-header="false"
        style="width: 100%">
        <el-table-column min-width="340">
          <template slot-scope="scope">
            <el-checkbox-group v-model="scope.row.selectedDays" size="mini">
              <el-checkbox-button v-for="day in dayOptions" :label="day" :key="day">{{day}}</el-checkbox-button>
            </el-checkbox-group>
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

            <el-button style="float: right; width: 18%;" size="mini" type="primary" plain @click="scope.row.advancedTime = !scope.row.advancedTime">
              <i class="el-icon-date"></i>
            </el-button>

            <el-date-picker
              v-if="scope.row.advancedTime"
              v-model="scope.row.dateRange"
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

        <el-table-column min-width="120px">
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

        <el-table-column width="180px" fixed="right">
          <template slot-scope="scope">
            <el-button plain size="mini" type="primary" @click="handleShowGreetingListTime(scope.row.id)"><i class="el-icon-phone-outline"></i></el-button>
            <el-button plain type="success" size="mini" @click="updateSetting(scope.row)"><i class="el-icon-check"></i></el-button>
            <el-button plain type="danger" size="mini" @click="deleteSetting(scope.row.id)"><i class="el-icon-delete"></i></el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-row>

    <!--Ngày nghỉ lễ-->
    <el-row class="panel-header">
      <el-col :xs="24" :md="12">
        <p class="heading">Ngày nghỉ lễ</p>
      </el-col>
      <el-col :xs="24" :md="12">
        <div style="padding: 18px 0; text-align: right;">
          <el-button style="margin-top: 7px" size="mini" @click="handleShowGreetingList" plain type="warning" :disabled="settingTimeDepartmentLoading">Lời chào</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row class="panel-content" v-loading="settingTimeDepartmentLoading">
      <!--Ngày nghỉ cố định-->
      <el-col :xs="24" :md="12">
        <h4 class="heading">Cố định</h4>
      </el-col>
      <el-col :xs="24" :md="12">
        <div style="padding: 18px 0; text-align: right;">
          <el-button @click="addStaticHoliday" plain size="mini" type="success" :disabled="settingTimeDepartmentLoading">Thêm ngày</el-button>
        </div>
      </el-col>
      <el-table
        :data="staticHolidays"
        :show-header="false"
        style="width: 100%">
        <el-table-column min-width="140">
          <template slot-scope="scope">
            <el-select v-model="scope.row.name" placeholder="Chọn ngày lễ" size="mini">
              <el-option
                v-for="item in staticHolidayOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>

        <el-table-column min-width="80">
          <template slot-scope="scope">
            <el-select v-model="scope.row.days" placeholder="Số ngày nghỉ" size="mini">
              <el-option
                v-for="number in dayNumberOptions"
                :key="number"
                :label="number + ' ngày'"
                :value="number">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column min-width="150">
          <template slot-scope="scope">
            <el-date-picker
              v-if="scope.row.days > 1"
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

            <el-date-picker
              v-else
              v-model="scope.row.selectedDay"
              type="date"
              size="mini"
              format="dd/MM/yyyy"
              value-format="dd-MM-yyyy"
              placeholder="Chọn ngày"
            >
            </el-date-picker>
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

        <el-table-column label="Công cụ" width="240px" fixed="right">
          <template slot-scope="scope">
            <el-button plain size="mini" type="primary" @click="handleShowGreetingListTime(scope.row.id)"><i class="el-icon-phone-outline"></i></el-button>
            <el-button plain type="success" size="mini" @click="updateSetting(scope.row)"><i class="el-icon-check"></i></el-button>
            <el-button plain size="mini" @click="showAdvanceSetting(scope.row)"><i class="el-icon-setting"></i></el-button>
            <el-button plain type="danger" size="mini" @click="deleteStaticHolidaySetting(scope.row.id)"><i class="el-icon-delete"></i></el-button>
          </template>
        </el-table-column>

      </el-table>

      <!--Ngày nghỉ tùy biến-->
      <el-col :xs="24" :md="12">
        <h4 class="heading">Tùy biến</h4>
      </el-col>
      <el-col :xs="24" :md="12">
        <div style="padding: 18px 0; text-align: right;">
          <el-button @click="addCustomHoliday" plain size="mini" type="success" :disabled="settingTimeDepartmentLoading">Thêm ngày</el-button>
        </div>
      </el-col>
      <el-table
        :data="customHolidays"
        :show-header="false"
        style="width: 100%">
        <el-table-column min-width="140">
          <template slot-scope="scope">
            <el-select v-model="scope.row.name" placeholder="Chọn ngày lễ" size="mini">
              <el-option
                v-for="item in customHolidayOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>

        <el-table-column min-width="80">
          <template slot-scope="scope">
            <el-select v-model="scope.row.days" placeholder="Số ngày nghỉ" size="mini">
              <el-option
                v-for="number in dayNumberOptions"
                :key="number"
                :label="number + ' ngày'"
                :value="number">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column min-width="150">
          <template slot-scope="scope">
            <el-date-picker
              v-if="scope.row.days > 1"
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

            <el-date-picker
              v-else
              v-model="scope.row.selectedDay"
              type="date"
              size="mini"
              format="dd/MM/yyyy"
              value-format="dd-MM-yyyy"
              placeholder="Chọn ngày"
            >
            </el-date-picker>
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

        <el-table-column label="Công cụ" width="240px" fixed="right">
          <template slot-scope="scope">
            <el-button plain size="mini" type="primary" @click="handleShowGreetingListTime(scope.row.id)"><i class="el-icon-phone-outline"></i></el-button>
            <el-button plain type="success" size="mini" @click="updateSetting(scope.row)"><i class="el-icon-check"></i></el-button>
            <el-button plain size="mini" @click="showAdvanceSetting(scope.row)"><i class="el-icon-setting"></i></el-button>
            <el-button plain type="danger" size="mini" @click="deleteCustomHolidaySetting(scope.row.id)"><i class="el-icon-delete"></i></el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose" size="small">Đóng</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    props: ['settingTimeDepartmentVisible', 'wokingTimeSettingRecords', 'selectedDepartment', 'wokingTimeSettingRecords', 'settingTimeDepartmentLoading'],
    data() {
      return {
        settingType: 'basic',
        advanceSettingRange: '',
        datetimeRange: [],
        dataTable: [
          {
            id: 1,
            selectedDays: ['T2', 'T3', 'T4', 'T5', 'T6'],
            timeRange: ['08:00', '17:00'],
            advancedTime: false,
            dayRange: '',
            redirectType: 'sound',
            team: '',
            ext: '',
            mobile: ''
          }
        ],
        dayNumberOptions: [1, 2, 3, 4, 5, 6, 7],
        dayOptions: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
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
        ],
        //
        staticHolidayOptions: [
          { value: 'Tết dương lịch', label: 'Tết dương lịch' },
          { value: 'Quốc khánh', label: 'Quốc khánh' },
          { value: 'Giải phóng miền Nam', label: 'Giải phóng miền Nam' },
          { value: 'Quốc tế lao động', label: 'Quốc tế lao động' }
        ],
        customHolidayOptions: [
          { value: 'Nghỉ Tết âm lịch', label: 'Nghỉ Tết âm lịch' },
          { value: 'Nghỉ Giỗ tổ', label: 'Nghỉ Giỗ tổ' }
        ],
        customHolidays: [
          {
            id: 1,
            name: 'Nghỉ Giỗ tổ',
            days: 1,
            dayRange: '',
            selectedDay: '10/03/2017',
            redirectType: 'sound',
            team: '',
            ext: '',
            mobile: ''
          }
        ],
        staticHolidays: [
          {
            id: 1,
            name: 'Nghỉ Tết âm lịch',
            days: 5,
            dayRange: ['05/02/2017', '10/02/2017'],
            selectedDay: '',
            redirectType: 'sound',
            team: '',
            ext: '',
            mobile: ''
          },
          {
            id: 2,
            name: 'Giải phóng miền Nam',
            days: 1,
            dayRange: '',
            selectedDay: '30/04/2017',
            redirectType: 'sound',
            team: '',
            ext: '',
            mobile: ''
          },
          {
            id: 3,
            name: 'Quốc tế lao động',
            days: 1,
            dayRange: '',
            selectedDay: '01/05/2017',
            redirectType: 'sound',
            team: '',
            ext: '',
            mobile: ''
          }
        ]
      }
    },
    methods: {
      showAdvanceSetting() {
        this.$emit('showAdvanceSetting')
      },
      addStaticHoliday() {
        this.staticHolidays.unshift({
          id: new Date().getTime(),
          name: '',
          days: '',
          dayRange: '',
          selectedDay: '',
          redirectType: '',
          team: '',
          ext: '',
          mobile: ''
        })
      },
      addCustomHoliday() {
        this.customHolidays.unshift({
          id: new Date().getTime(),
          name: '',
          days: '',
          dayRange: '',
          selectedDay: '',
          redirectType: '',
          team: '',
          ext: '',
          mobile: ''
        })
      },
      deleteCustomHolidaySetting(id) {
        this.$confirm('Bạn chắc chắn muốn xóa cài đặt này?', 'Chú ý', {
          confirmButtonText: 'Xác nhận',
          cancelButtonText: 'Hủy bỏ',
          type: 'warning'
        }).then(() => {
          for (let i = 0; i < this.customHolidays.length; i++) {
            if (this.customHolidays[i].id === id) {
              this.customHolidays.splice(i, 1)
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
      },
      deleteStaticHolidaySetting(id) {
        this.$confirm('Bạn chắc chắn muốn xóa cài đặt này?', 'Chú ý', {
          confirmButtonText: 'Xác nhận',
          cancelButtonText: 'Hủy bỏ',
          type: 'warning'
        }).then(() => {
          for (let i = 0; i < this.staticHolidays.length; i++) {
            if (this.staticHolidays[i].id === id) {
              this.staticHolidays.splice(i, 1)
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
      },
      addWokingTimeSettingRecords() {
        this.$emit('showAddSettingTime')
      },
      addTimeSetting() {
        this.dataTable.unshift({
          id: new Date().getTime(),
          selectedDays: ['T2', 'T3', 'T4', 'T5', 'T6'],
          timeRange: '',
          advancedTime: false,
          dayRange: '',
          redirectType: '',
          redirectValue: ''
        })
      },
      updateSetting(setting) {
        this.$notify({
          title: 'Thành công',
          message: 'Cập nhật cài đặt thành công!',
          type: 'success'
        })
      },
      deleteSetting(settingId) {
        this.$confirm('Bạn chắc chắn muốn xóa cài đặt này?', 'Chú ý', {
          confirmButtonText: 'Xác nhận',
          cancelButtonText: 'Hủy bỏ',
          type: 'warning'
        }).then(() => {
          for (let i = 0; i < this.dataTable.length; i++) {
            if (this.dataTable[i].id === settingId) {
              this.dataTable.splice(i, 1)
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
      },
      showSettingRedirect(id) {
        this.$emit('showSettingRedirect', id)
      },
      handleClose() {
        this.$emit('closeModal')
      },
      redirectCall() {
        this.$emit('redirectCall')
      },
      handleShowGreetingList() {
        this.$emit('handleShowGreetingList')
      },
      handleShowGreetingListTime() {
        this.$emit('handleShowGreetingListTime')
      }
    }
  }
</script>

<style></style>
