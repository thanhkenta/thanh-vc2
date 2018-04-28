<template>
  <div class="step-content">
    <el-row :gutter="20">
      <!-- List máy lẻ -->
      <list-ext
        :totalExt="totalExt"
        :extList="extList"
        @showCreateForm="showCreateForm"
        @showEditExtModal="handleShowEditExt"
        @fetchExtList="$emit('fetchExtList')"
        @listExtPageChange="handleListExtPageChange"
      >
      </list-ext>

        <el-row type="flex" justify="center" v-if="showCreate">
          <el-col :sm="24" :md="20">
            <el-card>
              <div slot="header" class="clearfix">
                <span style="font-weight: bold; font-size: 20px">Tạo đối tượng liên hệ</span>
                <el-button style="float: right;" @click="closeCreate">Đóng</el-button>
              </div>
              <p class="notice">
                * Lưu ý tạo ít nhất một đối tượng giữ vai trò lễ tân/trực ban để nhận cuộc gọi vào tổng đài
              </p>

              <el-form ref="form" :model="form" :rules="formRules" label-width="160px" style="max-width: 700px; margin: auto" v-if="numberType === 'Máy lẻ'">
                <el-form-item>
                  <el-radio-group v-model="numberType">
                    <el-radio-button label="Máy lẻ"></el-radio-button>
                    <el-radio-button label="Di động"></el-radio-button>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="Số máy lẻ" prop="number">
                  <el-input v-model="form.number"></el-input>
                </el-form-item>

                <el-form-item label="Mô tả" prop="userFullName">
                  <el-input v-model="form.userFullName" type="textarea" :rows="3"></el-input>
                </el-form-item>

                <el-form-item label="Quyền gọi" prop="callPermission">
                  <el-select v-model="form.callPermission" placeholder="Chọn quyền gọi" multiple>
                    <el-option
                      v-for="item in callPermissionOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="Thiết bị" prop="device">
                  <el-row>
                    <el-col :span="16">
                      <el-input disabled v-model="form.device"></el-input>
                    </el-col>
                    <el-col :span="8">
                      <el-button @click="handleShowDeviceModal" style="margin-left: 1em; width: calc(100% - 10px)" type="primary">Chọn</el-button>
                    </el-col>
                  </el-row>
                </el-form-item>
                <p style="font-size: 12px; padding-left: 158px;">
                  <i style="color: #eb9e05" class="fas fa-exclamation-triangle"></i> Bạn muốn dùng thiết bị của bạn?
                  <a style="color: #1dae94" @click="showResgister = true">Đăng kí ngay!</a>
                </p>

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

              <el-form ref="form" :model="formMobile" label-width="160px" style="max-width: 700px; margin: auto" v-if="numberType === 'Di động'">
                <el-form-item>
                  <el-radio-group v-model="numberType">
                    <el-radio-button label="Máy lẻ"></el-radio-button>
                    <el-radio-button label="Di động"></el-radio-button>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="Số máy lẻ" prop="number">
                  <el-input v-model="formMobile.number"></el-input>
                </el-form-item>

                <el-form-item label="Mô tả" prop="number">
                  <el-input v-model="formMobile.des" type="textarea" :rows="3"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="createExt">Tạo máy lẻ</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
        </el-row>
    </el-row>
    <!-- Thông tin máy lẻ mới tạo-->
    <recent-ext
      :showRecenExt="showRecenExt"
      :newExt="newExt"
      @closeRecenExt="closeRecenExt"
    >
    </recent-ext>

    <show-device
      :showInfoDevice="showInfoDevice"
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
    >
    </update-ext>
  </div>
</template>

<script>
  import { fetchDevice } from '@/api/device'
  // import { createOrUpdateExt } from '@/api/extensionNumber'
  import ShowDevice from '@/components/Device/ShowDevice'
  import UpdateExt from '@/components/Ext/UpdateExt'
  import RecentExt from '@/components/Ext/RecentExt'
  import ListExt from '@/components/Ext/ListExt'

  export default {
    name: 'step-1',
    components: { ShowDevice, UpdateExt, RecentExt, ListExt },
    props: ['extList', 'selectedHotlineId', 'totalExt'],
    data() {
      return {
        numberType: 'Máy lẻ',
        showCreate: false,
        showRecenExt: false,
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
        formMobile: {
          number: '',
          des: ''
        },
        form: {
          number: '',
          tel: '',
          optionNumber: [],
          inputVisible: false,
          userFullName: '',
          role: '',
          callPermission: '',
          settingQuota: false,
          quota: '',
          selectedDevice: {
            id: '',
            model: '',
            mac: '',
            desc: ''
          },
          device: ''
        },
        newExt: {},
        formRules: {
          number: [{ required: true, message: 'Không được bỏ trống', trigger: 'blur,change' }],
          tel: [{ required: true, message: 'Không được bỏ trống', trigger: 'blur,change' }],
          userFullName: [{ required: true, message: 'Không được bỏ trống', trigger: 'blur,change' }],
          role: [{ required: true, message: 'Không được bỏ trống', trigger: 'blur,change' }],
          callPermission: [{ required: true, message: 'Không được bỏ trống', trigger: 'blur,change' }],
          quota: [{ required: true, message: 'Không được bỏ trống', trigger: 'blur,change' }],
          device: [{ required: true, message: 'Hãy chọn thiết bị', trigger: 'blur,change' }]
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
        ]
      }
    },
    computed: {},
    methods: {
      closeCreate() {
        this.showCreate = false
        setTimeout(() => {
          window.scrollBy({
            top: -100,
            left: 0,
            behavior: 'smooth'
          })
        }, 100)
      },
      showCreateForm() {
        this.showCreate = true
        setTimeout(() => {
          window.scrollBy({
            top: 1000,
            left: 0,
            behavior: 'smooth'
          })
        }, 100)
      },
      handleShowEditExt(selectedExt) {
        this.selectedExt = Object.assign({}, selectedExt)
        this.editExtModalVisible = true
      },
      handleListExtPageChange(page) {
        this.$emit('listExtPageChange', page)
      },
      createExt() {
        this.$notify.success({
          title: 'Thành công',
          dangerouslyUseHTMLString: true,
          message: `Tạo số máy lẻ <strong style="color:#cc2020;">${this.form.number}</strong> thành công`
        })
        this.$refs.form.resetFields()
        // Load new list
        this.$emit('fetchExtList')
        this.showRecent()
        // this.$refs.form.validate(valid => {
        //   if (valid) {
        //     this.$confirm(`Bạn muốn tạo số ${this.form.number} này chứ?`, 'Chú ý', {
        //       confirmButtonText: 'OK',
        //       cancelButtonText: 'Cancel',
        //       type: 'warning'
        //     }).then(() => {
        //       return new Promise((resolve, reject) => {
        //         const data = {
        //           id_hotline: this.selectedHotlineId,
        //           extension_number: this.form.number,
        //           extension_user_fullname: this.form.userFullName,
        //           extension_role: this.form.role,
        //           extension_call_permit: this.form.callPermission,
        //           extension_mobile: this.form.tel,
        //           device_id: this.form.selectedDevice.id,
        //           settingQuota: this.form.settingQuota
        //         }
        //         if (this.form.settingQuota) {
        //           data['extension_call_quota'] = this.form.quota
        //         }
        //         createOrUpdateExt(data)
        //           .then(res => {
        //             if (res.data.status) {
        //               this.$notify.success({
        //                 title: 'Thành công',
        //                 dangerouslyUseHTMLString: true,
        //                 message: `Tạo số máy lẻ <strong style="color:#cc2020;">${this.form.number}</strong> thành công`
        //               })
        //               this.$refs.form.resetFields()
        //               // Load new list
        //               this.$emit('fetchExtList')
        //               this.showRecent()
        //             } else {
        //               this.$notify.error({
        //                 title: 'Tạo thất bại',
        //                 dangerouslyUseHTMLString: true,
        //                 message: `Số máy lẻ <strong style="color:#cc2020;">${this.form.number}</strong> đã tồn tại!`
        //               })
        //             }
        //             resolve()
        //           })
        //           .catch(err => {
        //             reject(err)
        //           })
        //       })
        //     }).catch(() => {})
        //   }
        // })
      },
      showRecent() {
        this.showRecenExt = true
      },
      closeRecenExt() {
        this.showRecenExt = false
      },
      handleSelectModel(deviceInfo) {
        this.form.selectedDevice = Object.assign({}, deviceInfo)
        this.form.device = deviceInfo.desc
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
      }
    },
    mounted() {}
  }
</script>

<style>
  .step-content .notice {
    color: #8d9ea7;
    font-size: 14px;
  }
  .item{
    padding: 1.2em 0 1em 0;
    border-bottom: 1px solid #f4f4f5;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
