<template>
  <div class="step-content">

    <el-row class="panel-header">
      <el-col :lg="18" :md="16" :sm="12" :xs="12">
        <h3 style="font-size: 16px; color: #313131;">DANH SÁCH PHÒNG BAN</h3>
        <p style="color: #8d9ea7; font-size: 14px">Sau khi thêm phòng ban , Nhóm trực và số máy lẻ cho mỗi team . Bạn sẽ chọn cấu hình Thời gian cho từng Nhóm trực</p>
      </el-col>
      <el-col :lg="3" :md="3" :sm="1" :xs="1" style="margin-top: 24px">
        <el-button size="medium" type="primary" @click="showAddDepartment" plain>
          <i class="el-icon-circle-plus fa-fw"></i> Thêm phòng ban
        </el-button>
      </el-col>
    </el-row>

    <el-row class="panel-content" v-loading="loading">
      <el-table :data="departmentsFake" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">

            <el-row>
              <el-col>
                <el-button type="success" size="mini" @click="handleAddTeamFake(props.row.list_team)">Thêm nhóm</el-button>
              </el-col>
            </el-row>

            <el-table
              :data="props.row.list_team"
              style="width: 100%">
              <el-table-column
                label="Tên nhóm trực"
                min-width="180">
                <template slot-scope="scope">
                  <div v-if="scope.row.edit">
                    <el-input v-model="scope.row.team_name" size="mini" placeholder="Tên nhóm trực"></el-input>
                  </div>
                  <div v-else>
                    {{ scope.row.team_name }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="Chế độ đổ chuông"
                min-width="180">
                <template slot-scope="scope">
                  <el-select
                    v-if="scope.row.edit"
                    size="mini"
                    v-model="scope.row.team_strategy"
                    placeholder="Chọn chế độ"
                  >
                    <el-option
                      :label="option.label"
                      :value="option.value"
                      v-for="option in ringingModeOptions"
                      :key="option.value"
                    ></el-option>
                  </el-select>
                  <div v-else>
                    {{ scope.row.team_strategy }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="Số máy lẻ"
                min-width="180"
              >
                <template slot-scope="scope">
                  <el-select
                    v-if="scope.row.edit"
                    size="mini"
                    v-model="scope.row.list_ext"
                    multiple placeholder="Chọn số"
                  >
                    <el-option-group label="Số máy lẻ">
                      <el-option
                        v-for="item in props.row.list_ext"
                        :key="item.id"
                        :label="item.extension_number"
                        :value="item.id">
                      </el-option>
                    </el-option-group>
                  </el-select>
                  <div v-else>
                    <el-tag
                      v-for="ext in scope.row.list_ext"
                      :key="ext.id"
                    >{{ ext.extension_number }}</el-tag>
                  </div>
                </template>
              </el-table-column>

              <el-table-column
                label="Công cụ"
                min-width="140"
              >
                <template slot-scope="scope">
                  <el-button v-if="scope.row.edit" type="success" plain size="mini" @click="handleSave(scope.row)"><i class="el-icon-check"></i></el-button>
                  <el-button v-if="!scope.row.edit" type="success" plain size="mini" @click="handleEdit(scope.row, props.row.list_team)">Sửa</el-button>
                  <el-button v-if="scope.row.edit" type="success" plain size="mini" @click="handleCancelEdit(scope.row)">Hủy</el-button>
                  <el-button type="danger" size="mini" @click="handleDeleteTeamFake(props.row.list_team, scope.row.id)"><i class="el-icon-delete"></i></el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>

        <el-table-column
          label="Phòng ban"
          min-width="180"
          prop="department_name"
        >
        </el-table-column>

        <el-table-column
          label="Mô tả"
          min-width="180"
          prop="description"
        >
        </el-table-column>

        <el-table-column
          label="Phím tắt"
          min-width="180"
        >
          <template slot-scope="scope">
            <el-tag
              v-for="number in scope.row.shortcut"
              :key="number.id"
            >
              {{ number.number }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column
          label="Hành động"
          min-width="180"
        >
          <template slot-scope="scope">
            <!--<el-button type="primary" size="small" plain @click="handleOpenAddTeam(scope.row)"><i class="el-icon-plus"></i></el-button>-->
            <el-button type="warning" size="small" plain @click="handleEditDepartment(scope.row)"><i class="el-icon-edit"></i></el-button>
            <el-button type="danger" size="small" plain @click="handleDeleteDepartment(scope.row)"><i class="el-icon-delete"></i></el-button>
            <el-button type="success" size="small" @click="showSettingTimeDepartment(scope.row)"><i class="el-icon-setting"></i></el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-row>

    <!-- Thêm phòng ban -->
    <add-department-modal
      :addDepartmentFormVisible="addDepartmentFormVisible"
      :extList="extList"
      :selectedNumber="selectedNumber"
      :teamList="teamList"
      @closeModal="closeAddDepartmentForm"
      @openAddTeamModal="handleAddTeam"
      @fetchTeamList="fetchTeamList"
      @fetchDepartmentList="fetchDepartment"
    >
    </add-department-modal>

    <!-- Cấu hình thời gian phòng ban -->
    <setting-time-department-modal
      :settingTimeDepartmentVisible="settingTimeDepartmentVisible"
      :wokingTimeSettingRecords="wokingTimeSettingRecords"
      :selectedDepartment="selectedDepartment"
      :settingTimeDepartmentLoading="settingTimeDepartmentLoading"
      @showSettingRedirect="showSettingRedirectTime"
      @closeModal="closeSettingTimeDepartmentForm"
      @redirectCall="showRedirectCall"
      @showAddSettingTime="handleShowAddSettingTime"
      @fetchTimeSettings="fetchTimeSettingsList"
      @showEditSettingTime="showEditSettingTime"
      @selectedTime="handleTimeSelected"
      @showAdvanceSetting="showAdvancedHolidaySetting = true"
      @handleShowGreetingList="handleShowGreeting('department')"
      @handleShowGreetingListTime="handleShowGreeting('time')"
    >
    </setting-time-department-modal>

    <!-- Cấu hình chuyển tiếp cuộc gọi -->
    <setting-redirect
      :extList="extList"
      :selectedDepartment="selectedDepartment"
      :selectedTeam="selectedTeam"
      :redirectCallFormVisible="redirectCallFormVisible"
      :selectedSound="selectedSound"
      :selectedRedirectNumber="selectedRedirectNumber"
      :greetingType="greetingType"
      :selectedTimeId="selectedTimeId"
      @closeRedirectCallModal="redirectCallFormVisible = false"
      @updateTimeRedirectCall="updateTimeRedirectCall"
      @handleShowRidirectList="showRedirectList = true"
      @handleShowGreetingList="handleShowGreeting"
      @handleShowTeamList="handleOpenListTeam"
    >
    </setting-redirect>

    <!-- Cài đặt lời chào -->
    <greeting-modal
      :greetingFormVisible="greetingFormVisible"
      :soundOptions="soundOptions"
      :greetingType="greetingType"
      :selectedDepartment="selectedDepartment"
      :totalSound="totalSound"
      @closeGreeting="greetingFormVisible = false"
      @greetingUploaded="fetchGreeting"
      @changePage="handleChangePageSound"
      @bindGreeting="handleBindGreeting"
      @deleteSound="handleDeleteSound"
    >
    </greeting-modal>

    <add-holiday-modal
      :addHolidayFormVisible="addHolidayFormVisible"
      @closeAddHolidayModal="addHolidayFormVisible = false"
    >
    </add-holiday-modal>

    <!-- Thêm nhóm trực -->
    <add-team-modal
      :addTeamFormVisible="addTeamFormVisible"
      :selectedDepartment="addTeamData"
      @closeAddTeam="addTeamFormVisible = false"
      @fetchTeamList="fetchTeamList"
      @fetchDepartment="fetchDepartment"
    >
    </add-team-modal>

    <!-- Chỉnh sửa phòng ban -->
    <edit-department
      :editDepartmentFormVisible="editDepartmentFormVisible"
      :selectedNumber="selectedNumber"
      :selectedDepartment="selectedDepartment"
      :extList="extList"
      @closeEditDepartment="editDepartmentFormVisible = false"
      @departmentUpdated="handleDepartmentUpdated"
    >
    </edit-department>

    <!-- Thêm cấu hình thời gian -->
    <add-setting-time
      :greetingFormVisible="greetingFormVisible"
      :addSettingTimeFormVisible="addSettingTimeFormVisible"
      :selectedTeam="selectedTeam"
      :selectedDepartmentId="selectedDepartment.id"
      @closeSettingTimeModal="addSettingTimeFormVisible = false"
      @settingTimeAdded="handleSettingTimeUpdated"
      @openListTeam="handleOpenListTeam"
    >
    </add-setting-time>

    <!-- Chỉnh sửa cấu hình thời gian -->
    <edit-setting-time
      :editSettingTimeFormVisible="editSettingTimeFormVisible"
      :selectedTeam="selectedTeam"
      :selectedTimeSetting="selectedTimeSetting"
      @closeEditSettingTimeModal="editSettingTimeFormVisible = false"
      @settingTimeUpdated="handleSettingTimeUpdated"
      @openListTeam="handleOpenListTeam"
    >
    </edit-setting-time>

    <!-- Danh sách nhóm trực -->
    <list-team-modal
      :listTeamModalVisible="listTeamModalVisible"
      :teamList="teamList"
      @closeListTeam="listTeamModalVisible = false"
      @selectTeam="handleSelectTeam"
    >
    </list-team-modal>

    <!-- Cập nhật cấu hình chuyển tiếp cuộc gọi -->
    <update-setting-redirect
      :extList="extList"
      :selectedDepartment="selectedDepartment"
      :selectedTeam="selectedTeam"
      :settingRedirectCallFormVisible="settingRedirectCallFormVisible"
      :selectedSound="selectedSound"
      :selectedRedirectNumber="selectedRedirectNumber"
      :greetingType="greetingType"
      :selectedRedirectCallSetting="selectedRedirectCallSetting"
      @handleClose="settingRedirectCallFormVisible = false"
      @handleShowRidirectList="showRedirectList = true"
      @handleShowGreetingList="handleShowGreeting('department')"
      @handleShowTeamList="handleOpenListTeam"
    >
    </update-setting-redirect>

    <!-- Danh sách chuyển tiếp (mobile) -->
    <redirect-list
      :showRedirectList="showRedirectList"
      :extList="selectedDepartment.list_ext"
      @selectNumber="handleSelectRedirectNumber"
      @handleClose="showRedirectList= false"
    >
    </redirect-list>

    <advanced-holiday-setting
      :showAdvancedHolidaySetting="showAdvancedHolidaySetting"
      @showSettingRedirect="showSettingRedirectTime"
      @handleClose="showAdvancedHolidaySetting = false"
    >
    </advanced-holiday-setting>
  </div>
</template>

<script>
  import RedirectList from '@/components/SettingRedirect/RedirectList'
  import AddDepartmentModal from '@/components/Department/AddDepartmentModal'
  import AddHolidayModal from './AddHolidayModal'
  import SettingTimeDepartmentModal from '@/components/SettingTime/SettingTimeDepartment'
  import SettingRedirect from '@/components/SettingRedirect/index'
  import UpdateSettingRedirect from '@/components/SettingRedirect/update'
  import GreetingModal from '@/components/Greeting/index'
  import AddTeamModal from '@/components/Team/AddTeamModal'
  import EditDepartment from '@/components/Department/EditDepartmentModal'
  import AddSettingTime from '@/components/SettingTime/AddSettingTime'
  import EditSettingTime from '@/components/SettingTime/EditSettingTime'
  import AdvancedHolidaySetting from '@/components/SettingTime/AdvancedHolidaySetting'
  import ListTeamModal from '@/components/Team/ListTeam'

  import * as teamServices from '@/api/team'
  import { fetchDepartment, deleteDepartment } from '@/api/department'
  import * as soundServices from '@/api/sound'
  import { fetchTimeSettings } from '@/api/time'
  import { fetchForward } from '@/api/forward'

  export default {
    components: {
      RedirectList,
      ListTeamModal,
      AddDepartmentModal,
      SettingTimeDepartmentModal,
      SettingRedirect,
      UpdateSettingRedirect,
      GreetingModal,
      AddHolidayModal,
      AddTeamModal,
      EditDepartment,
      AddSettingTime,
      EditSettingTime,
      AdvancedHolidaySetting
    },
    props: ['extList', 'selectedNumber'],
    data() {
      return {
        tempValue: {},
        showAdvancedHolidaySetting: false,
        showExtList: false,
        showRedirectList: false,
        listTeamModalVisible: false,
        greetingType: 'default',
        addSettingTimeFormVisible: false,
        editSettingTimeFormVisible: false,
        editDepartmentFormVisible: false,
        addTeamFormVisible: false,
        greetingFormVisible: false,
        redirectCallFormVisible: false,
        settingRedirectCallFormVisible: false,
        addDepartmentFormVisible: false,
        settingTimeDepartmentVisible: false,
        addHolidayFormVisible: false,
        loading: true,
        settingTimeDepartmentLoading: false,
        teamList: [],
        addTeamData: {
          id: '',
          extList: []
        },
        departments: [],
        departmentsFake: [
          {
            id: 1,
            department_name: 'Phòng Support',
            list_team: [
              {
                id: 1,
                team_name: 'nhóm sp 1',
                team_strategy: 'Tuần tự',
                list_ext: [
                  {
                    id: 1,
                    extension_number: '0199999999'
                  },
                  {
                    id: 2,
                    extension_number: '0188888888'
                  }
                ],
                edit: false
              },
              {
                id: 2,
                team_name: 'nhóm sp 2',
                team_strategy: 'Ngẫu nhiên',
                list_ext: [
                  {
                    id: 1,
                    extension_number: '0199999999'
                  },
                  {
                    id: 2,
                    extension_number: '0188888888'
                  }
                ],
                edit: false
              },
              {
                id: 3,
                team_name: 'nhóm sp 3',
                team_strategy: 'Chọn máy rảnh nhất',
                list_ext: [
                  {
                    id: 1,
                    extension_number: '0199999999'
                  },
                  {
                    id: 2,
                    extension_number: '0188888888'
                  }
                ],
                edit: false
              }
            ],
            description: 'Mô tả cho phòng Support',
            shortcut: [
              {
                id: 1,
                number: 1
              }
            ],
            list_ext: [
              {
                id: 1,
                extension_number: '0199999999'
              },
              {
                id: 2,
                extension_number: '0188888888'
              },
              {
                id: 3,
                extension_number: '0177777777'
              }
            ]
          },
          {
            id: 2,
            department_name: 'Phòng Sale',
            list_team: [
              {
                id: 1,
                team_name: 'nhóm sale 1',
                team_strategy: 'Tuần tự',
                list_ext: [
                  {
                    id: 1,
                    extension_number: '0199999999'
                  },
                  {
                    id: 2,
                    extension_number: '0188888888'
                  }
                ],
                edit: false
              },
              {
                id: 2,
                team_name: 'nhóm sale 2',
                team_strategy: 'Ngẫu nhiên',
                list_ext: [
                  {
                    id: 1,
                    extension_number: '0199999999'
                  },
                  {
                    id: 2,
                    extension_number: '0188888888'
                  }
                ],
                edit: false
              },
              {
                id: 3,
                team_name: 'nhóm sale 3',
                team_strategy: 'Chọn máy rảnh nhất',
                list_ext: [
                  {
                    id: 1,
                    extension_number: '0199999999'
                  },
                  {
                    id: 2,
                    extension_number: '0188888888'
                  }
                ],
                edit: false
              }
            ],
            description: 'Mô tả cho phòng Support',
            shortcut: [
              {
                id: 2,
                number: 2
              }
            ],
            list_ext: [
              {
                id: 1,
                extension_number: '0199999999'
              },
              {
                id: 2,
                extension_number: '0188888888'
              },
              {
                id: 3,
                extension_number: '0177777777'
              }
            ]
          }
        ],
        wokingTimeSettingRecords: [],
        ringingModeOptions: [
          { value: 'flow', label: 'Tuần tự' },
          { value: 'random', label: 'Ngẫu nhiên' },
          { value: 'free', label: 'Chọn máy rảnh nhất' }
        ],
        selectedDepartment: {
          department_name: '',
          extList: [],
          description: '',
          list_team: []
        },
        soundOptions: [],
        totalSound: 0,
        selectedSound: {},
        selectedTeam: {},
        selectedTimeSetting: {},
        selectedTimeId: '',
        selectedRedirectNumber: {
          name: '',
          phoneNumber: ''
        },
        redirectCallType: 'bind',
        selectedRedirectCallSetting: {}
      }
    },
    watch: {
      extList(newVal) {
        this.fetchDepartment()
      }
    },
    methods: {
      handleSave(selectedTeam) {
        this.$notify({
          title: 'Thành công',
          message: 'Cập nhập nhóm trực thành công!',
          type: 'success'
        })
        selectedTeam.edit = false
      },
      handleCancelEdit(selectedTeam) {
        selectedTeam.id = this.tempValue.id
        selectedTeam.team_name = this.tempValue.team_name
        selectedTeam.team_strategy = this.tempValue.team_strategy
        selectedTeam.list_ext = this.tempValue.list_ext
        selectedTeam.edit = false
      },
      handleEdit(selectedTeam, teams) {
        this.tempValue = Object.assign({}, selectedTeam)
        selectedTeam.edit = true
        for (let i = 0; i < teams.length; i = i + 1) {
          if (teams[i].id !== selectedTeam.id) {
            teams[i].edit = false
          }
        }
        console.log(selectedTeam, teams)
      },
      handleAddTeamFake(team) {
        team.unshift({
          id: new Date().getTime(),
          team_name: '',
          team_strategy: '',
          list_ext: [],
          edit: true
        })
      },
      handleDeleteTeamFake(team, id) {
        for (let i = 0; i < team.length; i = i + 1) {
          console.log(id)
          if (team[i].id === id) {
            team.splice(i, 1)
          }
        }
      },
      updateTimeRedirectCall() {
        this.fetchTimeSettingsList()
        this.redirectCallFormVisible = false
      },
      showDefaultGreeting() {
        this.greetingType = 'default'
        this.handleShowGreeting()
      },
      fetchForward(type = 'department') {
        const params = {}
        type === 'department' ? params['id_department'] = this.selectedDepartment.id : params['id_time'] = this.selectedTimeId
        return new Promise((resolve, reject) => {
          fetchForward(params)
            .then(res => {
              resolve(res.data)
            })
            .catch(err => {
              console.log(err)
              reject(err)
            })
        })
      },
      handleSelectRedirectNumber(data) {
        this.showRedirectList = false
        this.selectedRedirectNumber = Object.assign({}, data)
      },
      showSettingRedirectTime(id) {
        this.selectedTimeId = id
        this.showRedirectCall('time')
      },
      showRedirectCall(type = 'department') {
        this.settingTimeDepartmentLoading = true
        this.greetingType = type
        this.fetchForward(type).then(res => {
          if (!res.status && res.error === 'Foward ID not found') {
            this.redirectCallType = 'bind'
            this.selectedSound = {}
            this.selectedTeam = {}
            this.selectedRedirectNumber = {
              name: '',
              phoneNumber: ''
            }
          } else {
            this.selectedRedirectCallSetting = Object.assign({}, res.data)
            if (res.data.mode === 'mobile') {
              this.selectedRedirectNumber = {
                name: '',
                phoneNumber: res.data.value
              }
            } else {
              this.selectedRedirectNumber = {
                name: '',
                phoneNumber: ''
              }
            }
            this.redirectCallType = 'update'
          }
          this.fetchGreeting().then(_ => {
            for (const sound of this.soundOptions) {
              if (sound.status === 'Active') {
                this.selectedSound = Object.assign({}, sound)
              }
            }
            this.settingTimeDepartmentLoading = false
            if (this.redirectCallType === 'bind') {
              this.redirectCallFormVisible = true
            } else {
              this.settingRedirectCallFormVisible = true
            }
          })
        })
      },
      OpenGreetingSettingDepartment() {
        this.fetchGreeting()
        this.greetingFormVisible = true
      },
      handleShowGreetingList() {
        this.fetchGreeting()
        this.greetingFormVisible = true
      },
      handleDeleteSound(id) {
        soundServices.deleteSound({ id: id })
          .then(res => {
            if (res.data.status) {
              this.fetchGreeting()
              this.$notify({
                title: 'Thành công',
                message: 'Xóa lời chào thành công!',
                type: 'success'
              })
            } else {
              this.$notify({
                title: 'Thất bại',
                message: 'Xóa lời chào thất bại, hãy thử lại sau!',
                type: 'error'
              })
            }
          })
          .catch(err => {
            console.log(err)
            this.$notify({
              title: 'Thất bại',
              message: 'Xóa lời chào thất bại, hãy thử lại sau!',
              type: 'error'
            })
          })
      },
      handleTimeSelected(id) {
        this.selectedTimeId = id
      },
      handleChangePageSound(page) {
        this.fetchGreeting(page)
      },
      showEditSettingTime(selectedSetting) {
        this.selectedTimeSetting = Object.assign({}, selectedSetting)
        this.editSettingTimeFormVisible = true
      },
      handleShowAddSettingTime() {
        this.selectedTeam = {}
        this.addSettingTimeFormVisible = true
      },
      handleSelectTeam(team) {
        this.selectedTeam = Object.assign({}, team)
        this.listTeamModalVisible = false
      },
      handleOpenListTeam() {
        this.fetchTeamList(this.selectedDepartment.id)
          .then(res => {
            this.listTeamModalVisible = true
          })
      },
      showSettingTimeDepartment(selectedDepartment) {
        this.selectedDepartment = selectedDepartment
        this.loading = true
        this.fetchTimeSettingsList().then(_ => {
          this.loading = false
          this.settingTimeDepartmentVisible = true
        })
      },
      handleBindGreeting(selectedSound, page) {
        this.selectedSound = Object.assign({}, selectedSound)
        const data = {
          id_sound: selectedSound.sound_id,
          id_hotline: this.selectedNumber.id
        }
        if (this.greetingType === 'department') data['id_department'] = this.selectedDepartment.id
        else if (this.greetingType === 'time') data['id_time'] = this.selectedTimeId
        soundServices.bindGreetingToHotline(data)
          .then(res => {
            if (res.data.status) {
              // success
              if (this.greetingType === 'department' || this.greetingType === 'time') {
                this.selectedSound = Object.assign({}, selectedSound)
                this.greetingFormVisible = false
              }
              this.fetchGreeting(page)
              this.$notify({
                title: 'Thành công',
                message: 'Cài đặt lời chào thành công!',
                type: 'success'
              })
            } else {
              this.$notify({
                title: 'Thất bại',
                message: 'Cài đặt lời chào thất bại, hãy thử lại sau!',
                type: 'warning'
              })
            }
          })
          .catch()
      },
      fetchGreeting(page = 1) {
        const params = {
          id_hotline: this.selectedNumber.id,
          offset: page,
          limit: 5
        }
        if (this.greetingType === 'time') {
          params['id_time'] = this.selectedTimeId
        } else if (this.greetingType === 'department') {
          params['id_department'] = this.selectedDepartment.id
        }
        return new Promise((resolve, reject) => {
          soundServices.fetchSound(params)
            .then(res => {
              this.soundOptions = res.data.data
              this.totalSound = res.data.total
              resolve()
            })
            .catch(err => reject(err))
        })
      },
      handleShowGreeting(type = 'default') {
        // Gán trạng thái để xác định modal thêm lời chào
        // là default của hotline, của từng phòng ban hay gán cho time setting
        this.greetingType = type
        // Fetch lại danh sách lời chào
        this.fetchGreeting().then(res => {
          this.greetingFormVisible = true
        })
      },
      handleSettingTimeUpdated() {
        this.fetchTimeSettingsList().then(res => {
          this.addSettingTimeFormVisible = false
          this.editSettingTimeFormVisible = false
        })
      },
      handleDeleteTeam(selectedTeamId) {
        this.$confirm('Bạn chắc chắn muốn xóa nhóm trực này?', 'Chú ý', {
          confirmButtonText: 'Xác nhận',
          cancelButtonText: 'Hủy bỏ',
          type: 'warning'
        }).then(() => {
          const params = {
            id: selectedTeamId
          }
          return new Promise((resolve, reject) => {
            teamServices.deleteTeam(params)
              .then(res => {
                this.$notify({
                  title: 'Thành công',
                  message: 'Xóa nhóm trực thành công',
                  type: 'success'
                })
                // Refresh department list
                this.fetchDepartment()
                resolve()
              })
              .catch(err => {
                reject(err)
              })
          })
        }).catch(() => {})
      },
      handleUpdateTeam(selectedTeam) {
        const data = {
          team_name: selectedTeam.team_name,
          list_id_ext: selectedTeam.list_id_ext,
          team_strategy: selectedTeam.team_strategy,
          id: selectedTeam.id,
          department_id: selectedTeam.department_id
        }
        return new Promise((resolve, reject) => {
          teamServices.createOrUpdateTeam(data)
            .then(res => {
              if (res.data.status) {
                this.$notify({
                  title: 'Thành công',
                  message: 'Cập nhật thông tin nhóm thành công',
                  type: 'success'
                })
              } else {
                this.$notify({
                  title: 'Cập nhật thất bại',
                  message: 'Tên nhóm bị trùng',
                  type: 'error'
                })
              }
              resolve()
            })
            .catch(err => reject(err))
        })
      },
      handleDepartmentUpdated() {
        this.editDepartmentFormVisible = false
        this.fetchDepartment()
      },
      handleEditDepartment(selectedDepartment) {
        this.selectedDepartment = Object.assign({}, selectedDepartment)
        this.editDepartmentFormVisible = true
        // console.log(this.selectedDepartment)
      },
      handleDeleteDepartment(selectedDepartment) {
        const params = { id: selectedDepartment.id }
        this.$confirm(`Bạn chắc chắn muốn xóa phòng/ban <b style="color:#cc2020;">${selectedDepartment.department_name}</b>?`, 'Warning', {
          confirmButtonText: 'Xác nhận',
          dangerouslyUseHTMLString: true,
          cancelButtonText: 'Hủy',
          type: 'warning'
        }).then(() => {
          deleteDepartment(params)
            .then(res => {
              this.$notify({
                title: 'Success',
                message: 'Xóa thành công',
                type: 'success'
              })
              // Update list
              this.fetchDepartment()
            })
            .catch(err => {
              console.log(err)
            })
        }).catch(() => {})
      },
      handleClose() {},
      handleOpenAddTeam(data) {
        const payload = {
          id: data.id,
          name: data.department_name,
          extList: data.list_ext
        }
        this.handleAddTeam(payload)
      },
      handleAddTeam(payload) {
        this.addTeamData = payload
        this.addTeamFormVisible = true
      },
      showAddDepartment() {
        this.addDepartmentFormVisible = true
      },
      closeAddDepartmentForm() {
        this.addDepartmentFormVisible = false
      },
      closeSettingTimeDepartmentForm() {
        this.settingTimeDepartmentVisible = false
      },
      fetchTeamList(id) {
        const params = { department_id: id }
        return new Promise((resolve, reject) => {
          teamServices.fetchTeam(params)
            .then(res => {
              this.teamList = res.data.data
              resolve()
            })
            .catch(err => reject(err))
        })
      },
      fetchDepartment() {
        this.teamList = []
        const params = { id_hotline: this.selectedNumber.id }
        return new Promise((resolve, reject) => {
          fetchDepartment(params)
            .then(res => {
              this.departments = res.data.data
              this.loading = false
              resolve()
            })
            .catch(err => {
              this.loading = false
              reject(err)
            })
        })
      },
      fetchTimeSettingsList() {
        const params = {
          id_department: this.selectedDepartment.id
        }
        return new Promise((resolve, reject) => {
          fetchTimeSettings(params)
            .then(res => {
              this.wokingTimeSettingRecords = res.data.data
              console.log(res)
              resolve()
            })
            .catch(err => {
              console.log(err)
              reject(err)
            })
        })
      }
    },
    beforeMount() {
      this.fetchDepartment()
    }
  }
</script>
