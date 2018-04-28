<template>
  <div class="step-content">
    <el-tabs type="border-card">
      <el-tab-pane label="Isidra">
        <!-- Thời gian làm việc -->
        <el-row class="panel-header">
          <el-col :sm="24" :md="12">
            <p class="heading">Thời gian làm việc</p>
          </el-col>
          <el-col :sm="24" :md="12">
            <div style="padding: 18px 0; text-align: right;">
              <el-button plain round type="warning" style="margin-right: 20px;" @click="showGreeting">Lời chào</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row class="panel-content">
          <el-table
            :data="wokingTimeSettingRecords"
            style="width: 100%">
            <el-table-column
              label="Thứ 2"
              min-width="100">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.mon"></el-checkbox>
              </template>
            </el-table-column>

            <el-table-column
              label="Thứ 3"
              min-width="100">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.tue"></el-checkbox>
              </template>
            </el-table-column>

            <el-table-column
              label="Thứ 4"
              min-width="100">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.wed"></el-checkbox>
              </template>
            </el-table-column>

            <el-table-column
              label="Thứ 5"
              min-width="100">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.thu"></el-checkbox>
              </template>
            </el-table-column>

            <el-table-column
              label="Thứ 6"
              min-width="100">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.fri"></el-checkbox>
              </template>
            </el-table-column>

            <el-table-column
              label="Thứ 7"
              min-width="100">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.sat"></el-checkbox>
              </template>
            </el-table-column>

            <el-table-column
              label="CN"
              min-width="100">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.sun"></el-checkbox>
              </template>
            </el-table-column>

            <el-table-column
              label="Nhóm trực"
              min-width="150">
              <template slot-scope="scope">
                <el-select v-model="scope.row.team" size="mini">
                  <el-option
                    :label="option.label"
                    :value="option.value"
                    v-for="option in teamOptions"
                    :key="option.value"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>

            <el-table-column label="Thời gian trực" min-width="320px">
              <template slot-scope="scope">
                <el-time-picker
                  class="input-inline"
                  is-range
                  size="mini"
                  v-model="scope.row.time"
                  range-separator="-"
                  start-placeholder="Từ lúc"
                  end-placeholder="Đến lúc">
                </el-time-picker>
              </template>
            </el-table-column>

            <el-table-column label="Công cụ" min-width="150">
              <template slot-scope="scope">
                <el-button plain round type="danger" size="mini"><i class="el-icon-delete"></i></el-button>
                <el-button @click="showGreeting" plain round type="primary" size="mini"><i class="far fa-bell"></i></el-button>
              </template>
            </el-table-column>
          </el-table>

          <p>
            <el-button size="small" round type="success" @click="addWokingTimeSettingRecords">
              Thêm thời gian <i class="el-icon-circle-plus-outline"></i>
            </el-button>
          </p>
        </el-row>

        <!-- Ngoài giờ làm việc -->
        <el-row class="panel-header">
          <el-col :sm="24" :md="12">
            <p class="heading">Ngoài giờ làm việc</p>
          </el-col>
          <el-col :sm="24" :md="12">
            <div style="padding: 18px 0; text-align: right;">
              <el-button plain round type="warning" style="margin-left: 20px;" @click="showGreeting">Lời chào</el-button>
              <el-button @click="redirectCall" plain round type="success">Chuyển tiếp cuộc gọi</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row class="panel-content">
          <el-table
            :data="notWokingTimeSettingRecords"
            style="width: 100%">
            <el-table-column
              label="Thứ 2"
              min-width="100">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.mon"></el-checkbox>
              </template>
            </el-table-column>

            <el-table-column
              label="Thứ 3"
              min-width="100">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.tue"></el-checkbox>
              </template>
            </el-table-column>

            <el-table-column
              label="Thứ 4"
              min-width="100">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.wed"></el-checkbox>
              </template>
            </el-table-column>

            <el-table-column
              label="Thứ 5"
              min-width="100">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.thu"></el-checkbox>
              </template>
            </el-table-column>

            <el-table-column
              label="Thứ 6"
              min-width="100">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.fri"></el-checkbox>
              </template>
            </el-table-column>

            <el-table-column
              label="Thứ 7"
              min-width="100">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.sat"></el-checkbox>
              </template>
            </el-table-column>

            <el-table-column
              label="CN"
              min-width="100">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.sun"></el-checkbox>
              </template>
            </el-table-column>

            <el-table-column
              label="Nhóm trực"
              min-width="150">
              <template slot-scope="scope">
                <el-select v-model="scope.row.team" size="mini">
                  <el-option
                    :label="option.label"
                    :value="option.value"
                    v-for="option in teamOptions"
                    :key="option.value"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>

            <el-table-column label="Thời gian trực" min-width="320px">
              <template slot-scope="scope">
                <el-time-picker
                  class="input-inline"
                  is-range
                  size="mini"
                  v-model="scope.row.time"
                  range-separator="-"
                  start-placeholder="Từ lúc"
                  end-placeholder="Đến lúc">
                </el-time-picker>
              </template>
            </el-table-column>

            <el-table-column label="Công cụ" min-width="150">
              <template slot-scope="scope">
                <el-button plain round type="danger" size="mini"><i class="el-icon-delete"></i></el-button>
                <el-button @click="redirectCall" plain round type="success" size="mini"><i class="fas fa-reply"></i></el-button>
                <el-button @click="showGreeting" plain round type="primary" size="mini"><i class="far fa-bell"></i></el-button>
              </template>
            </el-table-column>
          </el-table>

          <p>
            <el-button size="small" round type="success" @click="addNotWokingTimeSettingRecords">
              Thêm thời gian <i class="el-icon-circle-plus-outline"></i>
            </el-button>
          </p>
        </el-row>

        <!-- Ngày nghỉ lễ -->
        <el-row class="panel-header">
          <el-col :sm="24" :md="12">
            <p class="heading">Ngày nghỉ lễ</p>
          </el-col>
          <el-col :sm="24" :md="12">
            <div style="padding: 18px 0; text-align: right;">
              <el-button plain round type="warning" style="margin-left: 20px;" @click="showGreeting">Lời chào</el-button>
              <el-button plain round type="primary" style="margin-left: 20px;" @click="showAddHoliday">Thêm ngày nghỉ</el-button>
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
            </div>

            <div class="input-inline">
              <el-date-picker
                v-model="datetimeRange"
                type="datetimerange"
                align="right"
                start-placeholder="Thời gian bắt đầu"
                end-placeholder="Thời gian kết thúc"
                value-format="dd-MM-yyyy HH-mm-ss"
                :default-value="new Date()"
                :default-time="['08:00:00', '17:30:00']">
              </el-date-picker>
            </div>

            <div class="input-inline">
              <el-button round size="mini" type="success" plain @click="redirectCall"><i class="fas fa-reply"></i></el-button>
              <el-button round size="mini" type="danger" plain><i class="el-icon-delete"></i></el-button>
              <el-button round size="mini" type="primary" plain @click="showGreeting"><i class="far fa-bell"></i></el-button>
            </div>

          </div>

          <p>
            <el-button size="small" round type="success" @click="addOffdayRecord">
              Thêm thời gian <i class="el-icon-circle-plus-outline"></i>
            </el-button>
          </p>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Thync">

      </el-tab-pane>
      <el-tab-pane label="Myth">

      </el-tab-pane>
    </el-tabs>

    <setting-redirect
      :redirectCallFormVisible="redirectCallFormVisible"
      @closeRedirectCallModal="redirectCallFormVisible = false"
    >
    </setting-redirect>

    <greeting-modal
      :greetingFormVisible="greetingFormVisible"
      @closeGreeting="greetingFormVisible = false"
    >
    </greeting-modal>

    <add-holiday-modal
      :addHolidayFormVisible="addHolidayFormVisible"
      @closeAddHolidayModal="addHolidayFormVisible = false"
    >
    </add-holiday-modal>
  </div>
</template>

<script>
  import AddHolidayModal from './AddHolidayModal'
  import SettingRedirect from './_SettingRedirect'
  import GreetingModal from '@/components/Greeting/index'
  export default {
    components: { SettingRedirect, GreetingModal, AddHolidayModal },
    data() {
      return {
        greetingFormVisible: false,
        redirectCallFormVisible: false,
        addHolidayFormVisible: false,
        teamOptions: [
          { label: 'Moderator', value: 'Moderator' },
          { label: 'Administrator', value: 'Administrator' },
          { label: 'Subscriber', value: 'Subscriber' },
          { label: 'Ext', value: 'Ext' }
        ],
        wokingTimeSettingRecords: [
          {
            id: new Date().getTime(),
            team: 'Administrator',
            time: '',
            mon: true,
            tue: true,
            wed: true,
            thu: true,
            fri: true,
            sat: true,
            sun: false
          }
        ],
        notWokingTimeSettingRecords: [
          {
            id: new Date().getTime(),
            team: 'Administrator',
            time: '',
            mon: true,
            tue: true,
            wed: true,
            thu: true,
            fri: true,
            sat: false,
            sun: false
          }
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
        ],
        holidayList: [
          {
            id: new Date().getTime(),
            name: 'Tết Nguyên Đán',
            duration: ['14/02/2018', '20/02/2018']
          }
        ],
        datetimeRange: []
      }
    },
    methods: {
      addWokingTimeSettingRecords() {
        this.wokingTimeSettingRecords.push({
          id: new Date().getTime(),
          team: 'Moderator',
          time: '',
          mon: true,
          tue: true,
          wed: true,
          thu: true,
          fri: true,
          sat: false,
          sun: false
        })
      },
      addNotWokingTimeSettingRecords() {
        this.notWokingTimeSettingRecords.push({
          id: new Date().getTime(),
          team: 'Moderator',
          time: '',
          mon: false,
          tue: false,
          wed: false,
          thu: false,
          fri: false,
          sat: false,
          sun: false
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
      },
      showAddHoliday() {
        this.addHolidayFormVisible = true
      },
      redirectCall() {
        this.redirectCallFormVisible = true
      },
      closeSettingTimeDepartmentForm() {
        this.settingTimeDepartmentVisible = false
      }
    }
  }
</script>
