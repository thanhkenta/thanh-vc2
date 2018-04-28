<template>
  <div>
    <el-row class="page-title">
      <h4>ĐĂNG KÝ TỔNG ĐÀI {{form.centerType === 'CSKH' ? 'CSKH' : 'VĂN PHÒNG'}}</h4>
    </el-row>

    <div class="app-container">
      <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="12">
          <el-card class="tab-panel" v-loading="loading">
            <el-form ref="form" :model="form" :rules="formRules" label-width="140px" style="max-width: 700px; margin: auto">
              <el-form-item label="Số điện thoại" prop="hotline">
                <el-row>
                  <el-col :span="18" style="position: relative">
                    <el-input disabled v-model="form.hotline"></el-input>
                  </el-col>
                  <el-col :span="6">
                    <el-button style="margin-left: 1em; width: calc(100% - 10px)" @click="getDefaultHotlines" type="primary">Chọn số</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
              <div style="margin-left: 140px; padding-bottom: 20px">
                <p style="font-size: 12px"><i style="color: #eb9e05" class="fas fa-exclamation-triangle"></i> Bạn muốn dùng số khác? <a style="color: #1dae94" @click="showResgister = true">Đăng kí ngay!</a></p>
              </div>
              <el-form-item label="Số lượng máy lẻ" prop="deviceCount">
                <el-select v-model="form.deviceCount" placeholder="Số điện thoại">
                  <el-option
                    v-for="item in selectOptions.deviceCount"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="Chọn kiểu tổng đài" prop="centerType">
                <el-select v-model="form.centerType" placeholder="Số điện thoại">
                  <el-option
                    v-for="item in selectOptions.centerType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="Ghi âm cuộc gọi" prop="record">
                <el-switch v-model="form.record" active-color="#13ce66"></el-switch>
              </el-form-item>

              <el-form-item label="Thời gian lưu trữ file ghi âm" v-if="form.record">
                <el-radio-group v-model="form.recordSavedIn">
                  <el-radio-button
                    v-for="item in selectOptions.recordSavedIn"
                    :label="item.value"
                    :key="item.value"
                  >
                    {{item.label}}
                  </el-radio-button>
                </el-radio-group>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="handleSubmit">Đăng ký</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
        <!--<el-col :span="12">-->
          <!--<el-card class="hotline-info">-->
            <!--<div slot="header" class="clearfix">-->
              <!--<span style="font-weight: bold; font-size: 20px">Thông tin cước phí</span>-->
            <!--</div>-->
            <!--<el-row :gutter="30" class="text item">-->
              <!--<el-col :xs="24" :sm="12" style="">-->
                <!--<strong>Cước đăng ký hotline:</strong>-->
              <!--</el-col>-->
              <!--<el-col :xs="24" :sm="12">-->
                <!--990.000 VNĐ-->
              <!--</el-col>-->
            <!--</el-row>-->
            <!--<el-row :gutter="30" class="text item">-->
              <!--<el-col :xs="24" :sm="12" style="">-->
                <!--<strong>Cước duy trì hotline (tháng):</strong>-->
              <!--</el-col>-->
              <!--<el-col :xs="24" :sm="12">-->
                <!--990.000 VNĐ-->
              <!--</el-col>-->
            <!--</el-row>-->
            <!--<el-row style="border: none" :gutter="30" class="text item">-->
              <!--<el-col :xs="24" :sm="12" style="">-->
                <!--<strong>Gói sử dụng (tháng):</strong>-->
              <!--</el-col>-->
              <!--<el-col :xs="24" :sm="12">-->
                <!--990.000 VNĐ-->
              <!--</el-col>-->
            <!--</el-row>-->
          <!--</el-card>-->
        <!--</el-col>-->
      </el-row>
    </div>
    <resgister-number
      :showResgister="showResgister"
      @closeResgister="showResgister = false"
    >
    </resgister-number>
    <info-number
      :showInfoNumber="showInfoNumber"
      :listNumbers="defaultHotlines"
      :allPage="AllHotlines"
      @closeInfoNumber="showInfoNumber = false"
      @selectNumber="handleSelectNumber"
      @selectPage="handleSelectPage"
    ></info-number>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { createHotline, fetchDefaultHotlines } from '@/api/hotlines'
  import ResgisterNumber from './components/ResgisterNumber'
  import InfoNumber from '@/components/Hotline/InfoNumber'

  export default{
    name: 'permission',
    components: { InfoNumber, ResgisterNumber },
    data() {
      return {
        currentPage: 1,
        AllHotlines: [],
        showInfoNumber: false,
        showResgister: false,
        defaultHotlines: [],
        loading: false,
        form: {
          hotline: '',
          deviceCount: 10,
          centerType: 'office',
          record: false,
          recordSavedIn: 1
        },
        formRules: {
          hotline: [{ required: true, message: 'Không được bỏ trống', trigger: 'blur,change' }]
        },
        selectOptions: {
          deviceCount: [
            { value: 10, label: '1-10' },
            { value: 20, label: '10-20' },
            { value: 30, label: '20-30' },
            { value: 50, label: '30-50' },
            { value: 70, label: '50-70' },
            { value: 100, label: '70-100' },
            { value: 150, label: '100-150' },
            { value: 200, label: '150-200' },
            { value: 300, label: 'Nhiều hơn 200' }
          ],
          centerType: [
            { value: 'office', label: 'Tổng đài văn phòng' },
            { value: 'CSKH', label: 'Tổng đài CSKH' }
          ],
          recordSavedIn: [
            { value: 1, label: '1 tháng' },
            { value: 3, label: '3 tháng' },
            { value: 6, label: '6 tháng' },
            { value: 12, label: '1 năm' }
          ]
        }
      }
    },
    computed: {
      ...mapGetters([
        'roles',
        'asyncRoutes'
      ])
    },
    watch: {
      switchRoles(val) {
        this.$store.dispatch('ChangeRoles', val).then(() => {
          this.$router.push({ path: '/permission/index?' + +new Date() })
        })
      }
    },
    methods: {
      handleSelectNumber(number) {
        this.form.hotline = number
        this.showInfoNumber = false
      },
      handleSelectPage(number) {
        this.currentPage = number
        this.getDefaultHotlines()
      },
      getAllHotline() {
        const params = {
          type: 'default'
        }
        fetchDefaultHotlines(params)
          .then(res => {
            const data = res.data.data
            this.AllHotlines = data
          })
          .catch(_ => {})
      },
      getDefaultHotlines() {
        this.loading = true
        const params = {
          type: 'default',
          limit: '10',
          offset: this.currentPage
        }
        fetchDefaultHotlines(params)
          .then(res => {
            this.loading = false
            const data = res.data.data
            this.defaultHotlines = data
            this.showInfoNumber = true
          })
          .catch(_ => {})
      },
      handleSubmit() {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.$confirm(`Bạn chắc chắn muốn đăng ký đầu số tổng đài ${this.form.hotline} chứ?`, 'Chú ý', {
              confirmButtonText: 'Xác nhận',
              cancelButtonText: 'Hủy bỏ',
              type: 'warning'
            }).then(_ => {
              this.loading = true
              const data = {
                hotline_number: this.form.hotline,
                type: this.form.centerType,
                quantity: this.form.deviceCount,
                audio: this.form.record,
                audio_time: this.form.recordSavedIn
              }
              const hotline = this.form.hotline
              const currentTypePath = this.form.centerType === 'CSKH' ? '/tong-dai-cskh' : '/tong-dai-van-phong'

              return new Promise((resolve, reject) => {
                createHotline(data).then(res => {
                  if (res.data.status) {
                    this.$notify({
                      title: 'Success',
                      dangerouslyUseHTMLString: true,
                      message: `Khai báo đăng ký tổng đài <strong style="color:#cc2020;">${hotline}</strong> thành công. Trong vòng 48h bộ phận kỹ thuật sẽ tiến hành thủ tục đăng ký đầu số tổng đài cho quý khách!`,
                      type: 'success'
                    })

                    // Update routers
                    const routes = this.asyncRoutes
                    for (let i = 0; i < routes.length; i = i + 1) {
                      if (routes[i].path === currentTypePath) {
                        routes[i].listNumber.push({
                          id: res.data.id,
                          status: 'pending',
                          name: `tong-dai-${res.data.id}`,
                          redirect: `${currentTypePath}/cau-hinh/${this.form.hotline}`,
                          meta: { title: hotline }
                        })
                      }
                    }
                    // reset form
                    this.$refs.form.resetFields()
                  } else {
                    this.$notify({
                      title: 'Error',
                      message: 'Đăng ký thất bại. Số tổng đài này đã tồn tại trong hệ thống!',
                      type: 'error'
                    })
                  }
                  this.loading = false
                  resolve()
                }).catch(err => {
                  this.$notify({
                    title: 'Error',
                    message: 'Đăng ký thất bại. Xin vui lòng thử lại!',
                    type: 'error'
                  })
                  this.loading = false
                  reject(err)
                })
              })
            })
          }
        })
      }
    },
    beforeMount() {},
    mounted() {
      this.getAllHotline()
    }
  }
</script>
<style>
  .hotline-info .el-card__body {
    padding-top: 0;
    padding-bottom: 0
  }
  .item{
    /*margin-top: 1.5em;*/
    padding: 1.2em 0 1em 0;
    border-bottom: 1px solid #f4f4f5;
  }
</style>
