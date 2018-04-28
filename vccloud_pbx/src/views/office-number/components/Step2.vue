<template>
  <div class="step-content">
    <el-row class="panel-header">
      <el-col :sm="24" :md="12">
        <p class="heading">Thời gian làm việc</p>
      </el-col>
      <el-col :sm="24" :md="12">
        <div style="padding: 18px 0; text-align: right;">
          <el-radio-group v-model="settingType">
            <el-radio label="basic">Cài đặt hàng tuần</el-radio>
            <el-radio label="advanced">Cài đặt nâng cao</el-radio>
          </el-radio-group>
          <el-button plain round type="warning" style="margin-left: 20px;" @click="showGreeting">Lời chào</el-button>
        </div>
      </el-col>
    </el-row>

    <el-row class="panel-content">
      <div v-if="settingType === 'advanced'" style="margin-bottom: 25px;">
        <p style="font-size: 15px">Áp dụng cấu hình cho khoảng thời gian</p>
        <el-date-picker
          v-model="advanceSettingRange"
          align="center"
          type="daterange"
          range-separator="-"
          start-placeholder="Ngày bắt đầu"
          end-placeholder="Ngày kết thúc">
        </el-date-picker>
      </div>

      <div v-for="record in timeSettingRecords" :key="record.id" class="time-setting-record">
        <el-checkbox-group v-model="record.checkedDay" size="mini" fill="#FFFFFF" class="input-inline">
          <el-checkbox
            v-for="option in dayOptions"
            :label="option.label"
            :key="option.label"
            border
          >
            {{option.name}}
          </el-checkbox>
        </el-checkbox-group>
        <el-time-picker
          class="input-inline"
          is-range
          size="mini"
          v-model="record.time"
          range-separator="-"
          start-placeholder="Thời gian bắt đầu"
          end-placeholder="Thời gian kết thúc">
        </el-time-picker>

        <div class="input-inline">
          <el-button round size="mini" type="danger" plain><i class="el-icon-delete"></i></el-button>
          <el-button round size="mini" type="primary" plain @click="showGreeting"><i class="el-icon-phone-outline"></i></el-button>
        </div>

      </div>

      <p>
        <el-button size="small" round type="success" @click="addTimeSettingRecord">
          Thêm thời gian <i class="el-icon-circle-plus-outline"></i>
        </el-button>
      </p>
    </el-row>

    <el-row class="panel-header">
      <el-col :sm="24" :md="12">
        <p class="heading">Ngoài giờ làm việc</p>
      </el-col>
      <el-col :sm="24" :md="12">
        <div style="padding: 18px 0; text-align: right;">
          <el-button @click="redirectCallFormVisible = true" plain round type="success">Chuyển tiếp cuộc gọi</el-button>
          <el-button plain round type="warning" style="margin-left: 20px;" @click="showGreeting">Lời chào</el-button>
        </div>
      </el-col>
    </el-row>

    <el-row class="panel-header">
      <el-col :sm="24" :md="12">
        <p class="heading">Ngày nghỉ lễ</p>
      </el-col>
      <el-col :sm="24" :md="12">
        <div style="padding: 18px 0; text-align: right;">
          <el-button plain round type="warning" style="margin-left: 20px;" @click="showGreeting">Lời chào</el-button>
        </div>
      </el-col>
    </el-row>

    <el-row class="panel-content">
      <div v-for="record in offdaySettingRecords" :key="record.id" class="time-setting-record">

        <div class="input-inline">
          <el-select v-model="record.selectedDay" placeholder="Chọn ngày nghỉ lễ" style="width: 300px">
            <el-option
              v-for="option in seletedDayOptions"
              :label="option.label"
              :value="option.value"
              :key="option.value"
            ></el-option>
          </el-select>

          <el-button type="primary">Thêm</el-button>
        </div>

        <div class="input-inline">
          <el-input-number v-model="record.days" :min="1" :max="10"></el-input-number>
        </div>

        <div class="input-inline">
          <el-date-picker
            v-model="record.date"
            type="date"
            placeholder="Chọn ngày">
          </el-date-picker>
        </div>

        <div class="input-inline">
          <el-button round size="mini" type="success" plain @click="redirectCall"><i class="fas fa-reply"></i></el-button>
          <el-button round size="mini" type="danger" plain><i class="el-icon-delete"></i></el-button>
          <el-button round size="mini" type="primary" plain @click="showGreeting"><i class="el-icon-phone-outline"></i></el-button>
        </div>

      </div>

      <p>
        <el-button size="small" round type="success" @click="addOffdayRecord">
          Thêm ngày nghỉ <i class="el-icon-circle-plus-outline"></i>
        </el-button>
      </p>
    </el-row>

    <el-dialog
      title="Lời chào"
      :visible.sync="greetingFormVisible"
      width="400px"
      :before-close="handleClose"
    >
      <el-form label-width="100px" label-position="top">
        <el-form-item label="Danh sách">
          <el-select v-model="selectedGreeting" placeholder="Danh sách lời chào">
            <el-option
              :label="option.label"
              :value="option.value"
              v-for="option in greetingOptions"
              :key="option.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">Tải lên</el-button>
          <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">upload to server</el-button>-->
        </el-upload>
      </span>
    </el-dialog>

    <el-dialog
      title="Chuyển tiếp cuộc gọi"
      :visible.sync="redirectCallFormVisible"
      width="400px"
      :before-close="handleClose"
    >
      <el-form label-width="150px" label-position="top">
        <el-form-item label="Danh sách">
          <el-select v-model="selectedRedirectCall" placeholder="Chuyển tiếp cuộc gọi">
            <el-option
              :label="option.label"
              :value="option.value"
              v-for="option in redirectCallOptions"
              :key="option.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="" size="small">Thêm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        settingType: 'basic',
        advanceSettingRange: '',
        timeSettingRecords: [
          {
            id: new Date().getTime(),
            checkedDay: ['mon', 'tue', 'wed', 'thu', 'fri'],
            time: ''
          }
        ],
        dayOptions: [
          { label: 'mon', name: 'Thứ 2' },
          { label: 'tue', name: 'Thứ 3' },
          { label: 'wed', name: 'Thứ 4' },
          { label: 'thu', name: 'Thứ 5' },
          { label: 'fri', name: 'Thứ 6' },
          { label: 'sat', name: 'Thứ 7' },
          { label: 'sun', name: 'Chủ nhật' }
        ],
        greetingFormVisible: false,
        selectedGreeting: 1,
        greetingOptions: [
          { value: 1, label: 'loichao1.wav' },
          { value: 2, label: 'loichao4.wav' },
          { value: 3, label: 'loichao3.wav' },
          { value: 4, label: 'loichao2.wav' }
        ],
        redirectCallFormVisible: false,
        selectedRedirectCall: 1,
        redirectCallOptions: [
          { value: 1, label: 'Lorem isump' },
          { value: 2, label: 'Lorem isump 2' },
          { value: 3, label: 'Lorem isump 3' },
          { value: 4, label: 'Lorem isump 4' }
        ],
        offdaySettingRecords: [
          {
            id: new Date().getTime(),
            selectedDay: 1,
            days: 3,
            date: ''
          }
        ],
        seletedDayOptions: [
          { value: 1, label: 'Tết Dương Lịch' },
          { value: 2, label: 'Giải phóng Miền Nam' },
          { value: 3, label: 'Ngày Quốc khánh' },
          { value: 4, label: 'Ngày Quốc tế lao động' }
        ]
      }
    },
    methods: {
      redirectCall() {},
      handleClose() {},
      addTimeSettingRecord() {
        this.timeSettingRecords.push({
          id: new Date().getTime(),
          checkedDay: ['mon', 'tue', 'wed', 'thu', 'fri'],
          time: ''
        })
      },
      addOffdayRecord() {
        this.offdaySettingRecords.push({
          id: new Date().getTime(),
          selectedDay: 1,
          days: 3,
          date: ''
        })
      },
      showGreeting() {
        this.greetingFormVisible = true
      }
    }
  }
</script>
