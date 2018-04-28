<template>
  <div class="step-content">
    <el-row :gutter="20">
      <el-col :sm="24" :md="14">
        <el-card>
          <div slot="header" class="clearfix">
            <span style="font-weight: bold; font-size: 20px">Tạo máy lẻ mới</span>
          </div>
          <p class="notice">
            * Lưu ý tạo ít nhất một máy lẻ giữ vai trò lễ tân/trực ban để nhận cuộc gọi vào tổng đài.
          </p>

          <el-form ref="form" :model="form" :rules="formRules" label-width="158px" style="max-width: 700px; margin: auto">
            <el-form-item :xs="24" :sm="24" label="Số máy lẻ" prop="number">
              <el-input :xs="20" v-model="form.number"></el-input>
            </el-form-item>

            <el-form-item label="Số máy di động" prop="tel">
              <el-select
                v-model="form.tel"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="Nhập số"
                no-data-text="Nhập số + Enter để nhập nhiều số"
              >
                <el-option
                  v-for="item in optionNumber"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <p style="font-size: 12px; padding-left: 158px;">
              Ví dụ : 09xxxxxx, 01234xxxx, 0968xxxxxx
            </p>

            <el-form-item label="Tên người dùng" prop="userFullName">
              <el-input v-model="form.userFullName"></el-input>
            </el-form-item>

            <el-form-item label="Vai trò sử dụng" prop="role">
              <el-select v-model="form.role" placeholder="Chọn vai trò sử dụng số lẻ">
                <el-option
                  v-for="item in roleOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="Quyền gọi" prop="callPermission">
              <el-select v-model="form.callPermission" placeholder="Chọn quyền gọi">
                <el-option
                  v-for="item in callPermissionOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="Thiết bị">
              <el-row>
                <el-col :span="16">
                  <el-input disabled v-model="form.selectedDevice.model"></el-input>
                </el-col>
                <el-col :span="8">
                  <el-button @click="handleShowDeviceModal" style="margin-left: 10px; width: calc(100% - 10px)" type="primary">Chọn</el-button>
                </el-col>
              </el-row>
              <p style="font-size: 12px"><i style="color: #eb9e05" class="fas fa-exclamation-triangle"></i> Bạn muốn dùng thiết bị của bạn? <a style="color: #1dae94" @click="showResgister = true">Đăng kí ngay!</a></p>
            </el-form-item>

            <el-form-item label="Giới hạn thời gian gọi" prop="record">
              <el-switch v-model="form.settingQuota" active-color="#13ce66"></el-switch>
            </el-form-item>


            <el-form-item label="Thời gian" prop="quota" v-if="form.settingQuota">
              <el-input v-model="form.quota" placeholder="Nhập thời gian (phút)"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="createExt">Tạo máy lẻ</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>

      <!-- Máy lẻ vừa tạo -->
      <recent-ext :newExt="newExt"></recent-ext>

      <!-- List máy lẻ -->
      <list-ext
        :totalExt="totalExt"
        :extList="extList"
        @showEditExtModal="handleShowEditExt"
        @fetchExtList="$emit('fetchExtList')"
        @listExtPageChange="handleListExtPageChange"
      >
      </list-ext>
    </el-row>

    <show-device
      :showInfoDevice="showInfoDevice"
      :listDevice="defaultDevice"
      @closeInfoDevice="showInfoDevice = false"
      @selectDevice="handleSelectModel"
    >
    </show-device>

    <update-ext
      :editExtModalVisible="editExtModalVisible"
      :extInfo="selectedExt"
      :deviceInfo="selectedExt.device_info"
      :selectedHotlineId="this.selectedHotlineId"
      @fetchExtList="$emit('fetchExtList')"
      @closeEditExtModal="editExtModalVisible = false"
      @handleShowDeviceModal="handleShowDeviceModal"
      @resetField="resetField"
    >
    </update-ext>
  </div>
</template>

<script>
  import { fetchDevice } from '@/api/device'
  import { createOrUpdateExt } from '@/api/extensionNumber'
  import ShowDevice from '@/components/Device/ShowDevice'
  import RecentExt from '@/components/Ext/RecentExt'
  import ListExt from '@/components/Ext/ListExt'
  import UpdateExt from '@/components/Ext/UpdateExt'

  export default {
    name: 'step-1',
    components: { ShowDevice, RecentExt, ListExt, UpdateExt },
    props: ['extList', 'selectedHotlineId', 'totalExt'],
    data() {
      return {
        editExtModalVisible: false,
        selectedExt: {
          extension_number: '123',
          device_info: {
            id: '',
            model: '',
            mac: ''
          }
        },
        showInfoDevice: false,
        defaultDevice: [],
        form: {
          number: '',
          tel: '',
          optionNumber: [],
          userFullName: '',
          role: '',
          callPermission: '',
          settingQuota: false,
          quota: '',
          selectedDevice: {
            id: '',
            model: '',
            mac: ''
          }
        },
        newExt: {},
        formRules: {
          number: [{ required: true, message: 'Không được bỏ trống', trigger: 'blur,change' }],
          tel: [{ required: true, message: 'Không được bỏ trống', trigger: 'blur,change' }],
          userFullName: [{ required: true, message: 'Không được bỏ trống', trigger: 'blur,change' }],
          role: [{ required: true, message: 'Không được bỏ trống', trigger: 'blur,change' }],
          callPermission: [{ required: true, message: 'Không được bỏ trống', trigger: 'blur,change' }],
          quota: [{ required: true, message: 'Không được bỏ trống', trigger: 'blur,change' }]
        },
        roleOptions: [
          { value: 'Trực ban', label: 'Lễ tân/trực ban' },
          { value: 'Nhân viên', label: 'Nhân viên' },
          { value: 'Quản lý', label: 'Quản lý' }
        ],
        callPermissionOptions: [
          { value: 'local', label: 'Gọi nội bộ' },
          { value: 'phone', label: 'Gọi cố định' },
          { value: 'mobile', label: 'Gọi di động' },
          { value: 'wine', label: 'Gọi quốc tế' }
        ],
        table: [
          {
            number: '12345',
            account: 'anhnn',
            team: 'dev',
            role: 'Nhân viên'
          },
          {
            number: '12345678',
            account: 'anhnn2',
            team: 'support',
            role: 'Nhân viên'
          },
          {
            number: '111111',
            account: 'anhnn222',
            team: 'support',
            role: 'Lễ tân/trực ban'
          }
        ]
      }
    },
    methods: {
      handleListExtPageChange(page) {
        this.$emit('listExtPageChange', page)
      },
      handleShowEditExt(selectedExt) {
        this.selectedExt = Object.assign({}, selectedExt)
        this.editExtModalVisible = true
      },
      resetField() {
        this.form.selectedDevice = ''
      },
      createExt() {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.$confirm(`Bạn muốn tạo số ${this.form.number} này chứ?`, 'Chú ý', {
              confirmButtonText: 'OK',
              cancelButtonText: 'Cancel',
              type: 'warning'
            }).then(() => {
              return new Promise((resolve, reject) => {
                const data = {
                  id_hotline: this.selectedHotlineId,
                  extension_number: this.form.number,
                  extension_user_fullname: this.form.userFullName,
                  extension_role: this.form.role,
                  extension_call_permit: this.form.callPermission,
                  extension_mobile: this.form.tel,
                  device_id: this.form.selectedDevice.id,
                  settingQuota: this.form.settingQuota
                }
                if (this.form.settingQuota) {
                  data['extension_call_quota'] = this.form.quota
                }
                createOrUpdateExt(data)
                  .then(res => {
                    if (res.data.status) {
                      this.$notify.success({
                        title: 'Thành công',
                        dangerouslyUseHTMLString: true,
                        message: `Tạo số máy lẻ <strong style="color:#cc2020;">${this.form.number}</strong> thành công`
                      })
                      this.$refs.form.resetFields()
                      // Load new list
                      this.$emit('fetchExtList')
                    } else {
                      this.$notify.error({
                        title: 'Tạo thất bại',
                        dangerouslyUseHTMLString: true,
                        message: `Số máy lẻ <strong style="color:#cc2020;">${this.form.number}</strong> đã tồn tại!`
                      })
                    }
                    resolve()
                  })
                  .catch(err => {
                    reject(err)
                  })
              })
            }).catch(() => {})
          }
        })
      },
      handleSelectModel(deviceInfo) {
        this.form.selectedDevice = deviceInfo
        this.selectedExt.device_info = Object.assign({}, deviceInfo)
        this.showInfoDevice = false
      },
      handleShowDeviceModal() {
        this.getDefaultDevice()
          .then(_ => {
            this.showInfoDevice = true
          })
      },
      getDefaultDevice() {
        const params = {
          type: 'default'
        }
        return new Promise((resolve, reject) => {
          fetchDevice(params)
            .then(res => {
              const data = res.data.data
              this.defaultDevice = data
              resolve()
            })
            .catch(err => {
              reject(err)
            })
        })
      }
    },
    watch: {
      extList(newList) {
        if (newList.length > 0) {
          this.newExt = newList[newList.length - 1]
        } else {
          this.newExt = {
            device_info: '',
            extension_account: '',
            extension_call_permit: '',
            extension_mobile: '',
            extension_number: '',
            extension_password: '',
            extension_role: '',
            extension_user_fullname: ''
          }
        }
      },
      $route(newRoute) {
        // this.step = 0
        // this.selectedNumber.id = newRoute.params.id
        // this.selectedNumber.number = newRoute.params.number
        // this.fetchExtList()
      }
    },
    beforeMount() {}
  }
</script>

<style>
  .step-content .notice {
    color: #8d9ea7;
    font-size: 14px;
  }

  .item {
    padding: 1.2em 0 1em 0;
    border-bottom: 1px solid #f4f4f5;
  }
</style>
