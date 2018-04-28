<template>
  <div>
    <el-dialog
      :title="`Cập nhật thông tin Ext (${extInfo.extension_number})`"
      :visible.sync="editExtModalVisible"
      width="500px"
      top="30px"
      :before-close="handleClose"
      class="update-ext-form"
    >
      <el-form ref="selectedExt" :model="selectedExt" :rules="formRules" label-width="158px" label-position="top">
        <el-form-item label="Số máy lẻ" prop="extension_number">
          <el-input v-model="selectedExt.extension_number"></el-input>
        </el-form-item>

        <el-form-item label="Số máy di động" prop="extension_mobile">
          <el-select
            v-model="selectedExt.extension_mobile"
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

        <el-form-item label="Tên người dùng" prop="extension_user_fullname">
          <el-input v-model="selectedExt.extension_user_fullname"></el-input>
        </el-form-item>

        <el-form-item label="Tài khoản" prop="extension_account">
          <el-input v-model="selectedExt.extension_account" disabled></el-input>
        </el-form-item>

        <el-form-item label="Mật khẩu" prop="extension_password" class="ext-password-input">
          <el-input v-model="selectedExt.extension_password" :type="!showPass ? 'password' : 'text'"></el-input>
          <span class="inspect-password" @click="showPass = false" v-show="showPass">
            <i class="fas fa-eye"></i>
          </span>
          <span class="inspect-password" @click="showPass = true" v-show="!showPass">
            <i class="fas fa-eye-slash"></i>
          </span>
        </el-form-item>

        <el-form-item label="Vai trò sử dụng số lẻ" prop="extension_role">
          <el-select v-model="selectedExt.extension_role" placeholder="Chọn vai trò sử dụng số lẻ">
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Quyền gọi" prop="extension_call_permit">
          <el-select v-model="selectedExt.extension_call_permit" placeholder="Chọn quyền gọi">
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
              <el-input disabled v-model="selectedExt.device_info.mac"></el-input>
            </el-col>
            <el-col :span="8">
              <el-button @click="handleShowDeviceModal" style="margin-left: 10px; width: calc(100% - 10px)" type="primary">Chọn</el-button>
            </el-col>
          </el-row>
          <p style="font-size: 12px"><i style="color: #eb9e05" class="fas fa-exclamation-triangle"></i> Bạn muốn dùng thiết bị của bạn? <a style="color: #1dae94" @click="showResgister = true">Đăng kí ngay!</a></p>
        </el-form-item>

        <el-form-item label="Giới hạn thời gian gọi" prop="record">
          <el-switch v-model="selectedExt.settingQuota" active-color="#13ce66"></el-switch>
        </el-form-item>


        <el-form-item label="Thời gian" prop="extension_call_quota" v-if="selectedExt.settingQuota">
          <el-input v-model="selectedExt.extension_call_quota" placeholder="Nhập thời gian (phút)"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="small">Đóng</el-button>
        <el-button type="primary" size="small" @click="handleUpdate">Cập nhật</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { createOrUpdateExt } from '@/api/extensionNumber'
  export default {
    name: 'update-Ext',
    props: ['editExtModalVisible', 'extInfo', 'deviceInfo', 'selectedHotlineId'],
    data() {
      return {
        showInfoDevice: false,
        defaultDevice: [],
        showPass: false,
        device_id: '',
        selectedExt: {
          id: '',
          device_info: {
            id: '',
            model: '',
            mac: ''
          },
          extension_account: '',
          extension_call_permit: '',
          extension_mobile: '',
          optionNumber: [],
          extension_number: '',
          extension_password: '',
          extension_role: '',
          extension_user_fullname: '',
          extension_call_quota: '',
          settingQuota: false
        },
        formRules: {
          extension_number: [{ required: true, message: 'Số lẻ không được bỏ trống', trigger: 'blur,change' }],
          extension_mobile: [{ required: true, message: 'Số đi động không được bỏ trống', trigger: 'blur,change' }],
          extension_password: [{ required: true, message: 'Mật khẩu không được bỏ trống', trigger: 'blur,change' }],
          extension_user_fullname: [{ required: true, message: 'Tên người dùng không được bỏ trống', trigger: 'blur,change' }],
          extension_role: [{ required: true, message: 'Hãy chọn vai trò sử dụng số lẻ', trigger: 'blur,change' }],
          extension_call_permit: [{ required: true, message: 'Hãy chọn quyền gọi', trigger: 'blur,change' }],
          extension_call_quota: [{ required: true, message: 'Vui lòng nhập thời gian gọi', trigger: 'blur,change' }],
          model: [{ required: true, message: 'Hãy chọn thiết bị', trigger: 'blur,change' }]
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
    watch: {
      extInfo(newInfo) {
        console.log(newInfo)
        this.selectedExt = Object.assign({}, newInfo)
      },
      deviceInfo(newInfo) {
        console.log(newInfo)
        this.selectedExt.device_info = Object.assign({}, newInfo)
      }
    },
    methods: {
      handleShowDeviceModal() {
        this.$emit('closeRecenExt')
      },
      handleUpdate() {
        this.$refs.selectedExt.validate(valid => {
          if (valid) {
            this.$confirm(`Bạn muốn cập nhật này chứ?`, 'Chú ý', {
              confirmButtonText: 'OK',
              cancelButtonText: 'Cancel',
              type: 'warning'
            }).then(() => {
              return new Promise((resolve, reject) => {
                const data = {
                  id: this.selectedExt.id,
                  extension_number: this.selectedExt.extension_number,
                  extension_user_fullname: this.selectedExt.extension_user_fullname,
                  id_hotline: this.selectedHotlineId,
                  extension_role: this.selectedExt.extension_role,
                  extension_call_permit: this.selectedExt.extension_call_permit,
                  extension_mobile: this.selectedExt.extension_mobile,
                  device_id: this.selectedExt.device_info.id,
                  extension_password: this.selectedExt.extension_password,
                  settingQuota: this.selectedExt.settingQuota
                }
                if (this.selectedExt.settingQuota) {
                  data['extension_call_quota'] = this.selectedExt.extension_call_quota
                }
                createOrUpdateExt(data)
                  .then(res => {
                    if (res.data.status) {
                      this.$notify.success({
                        title: 'Thành công',
                        dangerouslyUseHTMLString: true,
                        message: `Cập nhật thành công`
                      })
                      this.showPass = false
                      this.$refs.selectedExt.resetFields()
                      this.$emit('closeEditExtModal')
                      this.$emit('resetField')
                      // Load new list
                      this.$emit('fetchExtList')
                    } else {
                      this.$notify.error({
                        title: 'Cập nhật thất bại',
                        dangerouslyUseHTMLString: true,
                        message: `Cập nhật thất bại`
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
      handleClose() {
        this.$emit('closeEditExtModal')
      }
    }
  }
</script>

<style>
  .update-ext-form .el-form-item {
    margin-bottom: 10px !important;
  }
  .inspect-password {
    position: absolute !important;
    right: 12px !important;
    top: 0 !important;
    cursor: pointer;
  }
  .ext-password-input .el-form-item__content .el-input input {
    padding-right: 32px !important;
  }
</style>
