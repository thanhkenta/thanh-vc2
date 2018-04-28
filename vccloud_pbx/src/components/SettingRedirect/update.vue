<template>
  <el-dialog
    :title="`Cập nhật cấu hình điều hướng cuộc gọi (${greetingType === 'department' ? selectedDepartment.department_name : 'khoảng thời gian'})`"
    :visible.sync="settingRedirectCallFormVisible"
    width="600px"
    :before-close="handleClose"
  >
    <el-form :model="form" label-width="200px" label-position="top">

      <el-form-item>
        <el-row>
          <el-col style="margin-bottom: 10px" :span="6">
            <el-button @click="handleShowGreetingList" type="primary" plain>Chọn lời chào</el-button>
          </el-col>
          <el-col :span="24" style="position: relative">
            <div v-if="!selectedSound.sound_name">Hãy chọn lời chào</div>
            <div style="margin-top: 10px" v-else>
              <el-col :span="9" v-text="selectedSound.sound_name"></el-col>
              <el-col :span="15">
                <audio controls>
                  <source :src="baseUrl + selectedSound.url" type="audio/mpeg">
                  Your browser does not support the audio element.
                </audio>
              </el-col>
            </div>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="Chế độ điều hướng">
        <el-select v-model="form.selectedRedirectMode" placeholder="Chọn chế độ">
          <el-option
            :label="option.label"
            :value="option.value"
            v-for="option in redirectModeOptions"
            :key="option.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <div style="padding-bottom: 20px" >
        <span style="font-size: 12px"><i style="color: #eb9e05" class="fas fa-exclamation-triangle"></i> Lưu ý: Nếu điều hướng qua số di động , cuộc gọi sẽ được tính cước</span>
      </div>

      <el-form-item v-if="form.selectedRedirectMode === 'mobile'" label="Chọn số di động chuyển tiếp">
        <el-row>
          <el-col :span="18" style="position: relative">
            <el-input
              disabled
              v-model="selectedPhone"
            >
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-button @click="handleShowRidirectList" style="margin-left: 1em; width: calc(100% - 10px)" type="primary" plain>Chọn</el-button>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item v-if="form.selectedRedirectMode === 'team'" label="Chọn team">
        <el-row>
          <el-col :span="18" style="position: relative">
            <el-input disabled v-model="form.team.name"></el-input>
          </el-col>
          <el-col :span="6">
            <el-button @click="handleShowTeamList" style="margin-left: 1em; width: calc(100% - 10px)" type="primary" plain>Chọn</el-button>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item v-if="form.selectedRedirectMode === 'ext'" label="Chọn số máy lẻ (Ext)" prop="selectedExtList">
        <el-row>
          <el-col :span="24" style="position: relative">
            <el-select
              filterable
              v-model="form.selectedExt"
              placeholder="Chọn số"
            >
              <el-option
                v-for="item in extList"
                :key="item.id"
                :label="item.extension_number"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose" size="small">Đóng</el-button>
      <el-button type="primary" @click="handleSubmit" size="small">Lưu cài đặt</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { bindOrUpdateForward } from '@/api/forward'

  export default {
    props: [
      'settingRedirectCallFormVisible',
      'selectedTeam',
      'extList',
      'selectedDepartment',
      'selectedSound',
      'selectedTimeId',
      'greetingType',
      'selectedRedirectNumber',
      'selectedRedirectCallSetting'
    ],
    data() {
      return {
        baseUrl: process.env.BASE_API.replace('v1', ''),
        redirectModeOptions: [
          { value: 'none', label: 'Gác máy' },
          { value: 'sound', label: 'Có lời chào rồi gác máy' },
          { value: 'mobile', label: 'Cá nhân (di động)' },
          { value: 'team', label: 'Team' },
          { value: 'ext', label: 'Ext' }
        ],
        form: {
          team: {
            id: '',
            name: ''
          },
          selectedRedirectMode: 'mobile',
          selectedExt: ''
        },
        settings: {}
      }
    },
    computed: {
      selectedPhone() {
        let phone = ''
        phone = this.selectedRedirectNumber.phoneNumber ? this.selectedRedirectNumber.phoneNumber : ''
        phone += this.selectedRedirectNumber.name ? ` (${this.selectedRedirectNumber.name})` : ''
        return phone
      }
    },
    watch: {
      selectedTeam(team) {
        this.form.team.id = team.id
        this.form.team.name = team.team_name
      },
      selectedRedirectCallSetting(newSettings) {
        this.settings = Object.assign({}, newSettings)
        this.form.selectedRedirectMode = this.settings.mode
        if (this.settings.mode === 'team') {
          this.form.team.id = this.settings.value.id
          this.form.team.name = this.settings.value.name
        } else if (this.settings.mode === 'ext') {
          this.form.selectedExt = this.settings.value.id
        }
      }
    },
    methods: {
      handleSubmit() {
        this.$confirm('Bạn chắc chắn muốn lưu cài đặt này?', 'Chú ý', {
          confirmButtonText: 'Xác nhận',
          cancelButtonText: 'Hủy bỏ',
          type: 'warning'
        }).then(() => {
          const data = {
            id: this.settings.id,
            mode: this.form.selectedRedirectMode,
            id_sound: this.selectedSound.sound_id
          }
          if (this.greetingType === 'department') data['id_department'] = this.selectedDepartment.id
          else if (this.greetingType === 'time') data['id_time'] = this.selectedTimeId

          switch (this.form.selectedRedirectMode) {
            case 'mobile':
              data['value'] = this.selectedRedirectNumber.phoneNumber
              break
            case 'sound':
              data['value'] = this.selectedSound.sound_id
              break
            case 'team':
              data['value'] = this.selectedTeam.id
              break
            case 'ext':
              data['value'] = this.form.selectedExt
              break
            default:
              data['value'] = 'none'
          }
          bindOrUpdateForward(data)
            .then(res => {
              if (res.data.status) {
                this.$notify({
                  title: 'Thành công',
                  message: 'Cập nhật cài đặt chuyển tiếp cuộc gọi thành công!',
                  type: 'success'
                })
                this.handleClose()
              } else {
                this.$notify({
                  title: 'Thất bại',
                  message: 'Cập nhật cài đặt chuyển tiếp cuộc gọi thất bại!',
                  type: 'error'
                })
              }
            })
            .catch(err => {
              console.log(err)
            })
        }).catch(() => {})
      },
      handleShowRidirectList() {
        this.$emit('handleShowRidirectList')
      },
      handleShowGreetingList() {
        this.$emit('handleShowGreetingList')
      },
      handleShowTeamList() {
        this.$emit('handleShowTeamList')
      },
      handleClose() {
        // Reset form
        this.form = {
          team: {
            id: '',
            name: ''
          },
          selectedRedirectMode: 'mobile',
          selectedExt: ''
        }
        this.$emit('handleClose')
      }
    }
  }
</script>
