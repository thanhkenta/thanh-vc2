<template>
  <div class="login-container">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <div class="title-container">
        <h3 class="title">Login</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <i class="fas fa-user fa-fw"></i>
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username" />  <!-- autoComplete 1 trường tự động điền vào là on or off cho những lần tiếp -->
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <i class="fas fa-key fa-fw"></i>
        </span>
        <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="password" />+
        <!-- autoComplete="on" lắng nghe sự kiện và lấy phần tử gốc làm thành phần -->

        <span class="show-pwd" @click="showPwd">
          <i class="fas fa-eye fa-fw"></i>
        </span>
      </el-form-item>

      <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleLogin">{{$t('login.logIn')}}</el-button>
      <!-- @click.native.prevent ngăn chặn phần tử gốc của thành phần-->
    </el-form>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'

export default {
  name: 'login',
  data() {
    //kiểm tra user -> in ra lỗi
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {                              //validate user phải tồn tại admin or editor  (lấy hàm từ utils/validate)
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    //kiểm tra pass -> in ra lỗi
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {                                   //pass >=6 kí tự
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      // tạo để lấy v-model
      loginForm: {
        username: 'admin',
        password: '1111111'
      },
      // tạo props với mỗi trường nhập vào(theo el-form  :rules="loginRules")   điều kiện xác thực như “required”(Không bỏ trống)
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',  //type cho nhập pass
      loading: false,           //nhập đúng thì load = true ( k thì mặc định là false)
      showDialog: false 
    }
  },
  methods: {
    //click hidden pass
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },

    // click chuyển router
    handleLogin() {
            // tham chiếu tới ref
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername') // dispatch action cho vuex sử lý
          setTimeout(_ => {
            this.loading = false
            this.$router.push({ path: '/' })
          }, 1000)
          // this.loading = true
          // this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
          //   this.loading = false
          //   this.$router.push({ path: '/' })
          // }).catch(() => {
          //   this.loading = false
          // })
        } else {
          return false
        }
      })
    }
  },
  created() {},
  destroyed() {}
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button { 
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
</style>
