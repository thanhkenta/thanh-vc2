<template>
  <div>
    <!-- showAddUser = true khi bấm vào nút thêm mới(từ index.vue-mange-user) -->
    <!-- showAddUser = false khi bấm handleClose(đóng) -->
    <!-- showAddUser = false khi bấm xác nhận. chuyển về step 0 -->
    <el-dialog
      max-width="90%"
      width="500px"
      top="45px"
      title="Thêm tài khoản"
      :visible.sync="showAddUser"
      :before-close="handleClose">
      <el-steps :space="350" align-center :active="step" finish-status="success">
        <el-step title="Bước 1" description="Thông tin tài khoản"></el-step>
        <el-step title="Bước 2" description="Phân quyền"></el-step>
      </el-steps>

      <div v-if="step === 0"> <!-- mặc định step = 0 -->
        <el-form :model="dataForm" :rules="dataCheck" label-width="145px" label-position="top" ref="infoUserForm">
          <el-form-item prop="username" label="Tài khoản">
            <el-input v-model="dataForm.username"></el-input>
          </el-form-item>

          <el-form-item prop="password" label="Mật khẩu">
            <el-input v-model="dataForm.password" type="password"></el-input>
          </el-form-item>

          <el-form-item prop="checkpass" label="Nhập lại mật khẩu">
            <el-input v-model="dataForm.checkpass" type="password"></el-input>
          </el-form-item>

          <el-form-item prop="fullname" label="Họ tên">
            <el-input v-model=dataForm.fullname></el-input>
          </el-form-item>

          <el-form-item prop="role" label="Chức vụ">
            <el-select
              v-model="dataForm.roleSelect"
              filterable
              allow-create
              default-first-option
              placeholder="chọn chức vụ"
            >
              <el-option
                v-for="item in dataForm.role"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="phone" label="Số điện thoại">
            <el-input v-model=dataForm.phone></el-input>
          </el-form-item>

          <el-form-item prop="email" label="Email">
            <el-input v-model=dataForm.email></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div v-if="step === 1">
        <el-form :model="dataForm2" label-width="145px" label-position="top">
          <el-form-item label="Hotline">
            <el-select
              v-model="dataForm.hotlineSelect"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="chọn số">
              <el-option
                v-for="item in dataForm.hotline"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Thêm máy lẻ">
            <el-select
              v-model="dataForm.mayledcchon"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="chọn máy lẻ">
              <el-option
                v-for="item in dataForm.mayle"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Chèn cuộc gọi" prop="record">
            <el-switch v-model="dataForm.fake" active-color="#13ce66"></el-switch>
          </el-form-item>
          <el-form-item label="Nghe ghi âm" prop="record">
            <el-switch v-model="dataForm.fake1" active-color="#13ce66"></el-switch>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <!-- khi bấm thì chuyển đổi các step 0 sang 1.  1 sang 0 -->
        <el-button @click="handleClose">Đóng</el-button>
        <el-button type="primary" @click="next" v-if="step === 0">Tiếp tục</el-button>        <!-- click để tăng step = 1(chuyển sang step1) -->
        <el-button @click="step--"  v-if="step === 1">Quay lại</el-button>
        <el-button @click="handleSubmit" v-if="step === 1" type="primary">Xác nhận</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'showAddUser',
    props: ['showAddUser'],
    data() {
      var validatePass = (rule, value, callback) => {
        console.log(value, this.dataForm.password)
        if (value !== this.dataForm.password) {
          callback(new Error('Mật khẩu không khớp'))
        } else {
          callback()
        }
      }
      return {
        dataForm: {
          username: '',
          password: '',
          checkpass: '',
          fullname: '',
          role: [{
            value: 'Lễ tân',
            label: 'Lễ tân'
          }, {
            value: 'Nhân viên',
            label: 'Nhân viên'
          }, {
            value: 'Quản lý',
            label: 'Quản lý'
          }],
          roleSelect: [],
          phone: '',
          email: ''
        },
        dataForm2: {
          hotline: [{
            value: '19001005',
            label: '19001005'
          }, {
            value: '18001205',
            label: '18001205'
          }, {
            value: '17001406',
            label: '17001406'
          }],
          hotlineSelect: [],
          mayle: [{
            value: '123',
            label: '123'
          }, {
            value: '456',
            label: '456'
          }, {
            value: '789',
            label: '789'
          }],
          mayledcchon: [],
          fake: true,
          fake1: false
        },
        dataCheck: {
          username: [
            { required: true, message: 'Không để trống', trigger: 'blur' },
            { min: 6, max: 18, message: 'Tên tài khoản phải dài từ 6 -18 kí tự', trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'Không để trống', trigger: 'blur' },
            { min: 8, message: 'Mật khẩu dài ít nhất 8 kí tự', trigger: 'blur' }
          ],
          checkpass: [
            { required: true, message: 'Không để trống', trigger: 'blur, change' },
            { validator: validatePass, trigger: 'blur, change' }
          ],
          fullname: [
            { required: true, message: 'Không để trống', trigger: 'blur, change' }
          ],
          role: [
            { required: true, message: 'Không để trống', trigger: 'blur, change' }
          ],
          phone: [
            { required: true, message: 'Không để trống', trigger: 'blur, change' },
            { min: 10, max: 11, message: 'Số điện thoại dài từ 10 - 11 số', trigger: 'blur, change' }
          ],
          email: [
            { required: true, message: 'Không để trống', trigger: 'blur, change' }
          ]
        },
        step: 0
      }
    },
    methods: {
      handleClose() {
        this.$emit('closeAddUser')
      },
      handleSubmit() {
        this.$emit('handleSubmit')
        this.step = 0
      },
      next() {
        console.log('asdasd')
        this.$refs.infoUserForm.validate(valid => {
          console.log(valid)
          if (valid) {
            this.$refs.infoUserForm.clearValidate()
            this.step++
          }
        })
      }
    }
  }
</script>

<style>
  .step-content{
    margin-top: 25px;
  }
</style>
