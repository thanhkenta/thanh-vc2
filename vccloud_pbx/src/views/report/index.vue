<template>
  <div>
    <el-row class="page-title">
      <h4>
        THÔNG TIN TỔNG ĐÀI <span style="color: #409eff">{{ selectedNumber.hotline_number }}</span>

        <span v-if="selectedNumber.status" style="float: right; color: #67c23a">Đang hoạt động</span>
        <span v-else style="float: right; color: #f56c6c">Không hoạt động</span>
      </h4>
    </el-row>
    <div class="app-container" v-loading="loading">
      <el-row :gutter="18">
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-card class="hotline-info">
            <div slot="header" class="clearfix">
              <span style="font-weight: bold; font-size: 20px">Thông tin tổng đài</span>
            </div>
            <el-row :gutter="30" class="text item">
              <el-col :xs="24" :sm="12" style="">
                <strong>Mục đích sử dụng:</strong>
              </el-col>
              <el-col :xs="24" :sm="12">
                {{selectedNumber.type === 'office' ? 'Tổng đài văn phòng' : 'Chăm sóc khách hàng'}}
              </el-col>
            </el-row>

            <el-row :gutter="30" class="text item">
              <el-col :xs="24" :sm="12" style="">
                <strong>Số lượng máy lẻ đăng:</strong>
              </el-col>
              <el-col :xs="24" :sm="12">
                {{ selectedNumber.quantity }}
              </el-col>
            </el-row>

            <el-row :gutter="30" class="text item">
              <el-col :xs="24" :sm="12" style="">
                <strong>Lưu trữ file ghi âm:</strong>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-tag type="success" v-if="selectedNumber.audio">Bật</el-tag>
                <el-tag type="info" v-else>Tắt</el-tag>
              </el-col>
            </el-row>

            <el-row :gutter="30" class="text item">
              <el-col :xs="24" :sm="12" style="">
                <strong>Thời gian lưu trữ:</strong>
              </el-col>
              <el-col :xs="24" :sm="12">
                {{ selectedNumber.audio_time }}
              </el-col>
            </el-row>

            <el-row :gutter="30" class="text item">
              <el-col :xs="24" :sm="12" style="">
                <strong>Ip Server tổng đài:</strong>
              </el-col>
              <el-col :xs="24" :sm="12">
                {{ selectedNumber.server_ip }}
              </el-col>
            </el-row>

            <el-row style="border: none" :gutter="30" class="text item">
              <el-col :xs="24" :sm="12" style="">
                <strong>Ip server nhà cung cấp:</strong>
              </el-col>
              <el-col :xs="24" :sm="12">
                {{ selectedNumber.service_provider_ip }}
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-card class="hotline-info">
            <div slot="header" class="clearfix">
              <span style="font-weight: bold; font-size: 20px">Thông tin cước phí</span>
            </div>
            <el-row :gutter="30" class="text item">
              <el-col :xs="24" :sm="12" style="">
                <strong>Loại số:</strong>
              </el-col>
              <el-col :xs="24" :sm="12"></el-col>
            </el-row>
            <el-row style="border: none" :gutter="30" class="text item">
              <el-col :xs="24" :sm="12" style="">
                <strong>Cước phí (tháng):</strong>
              </el-col>
              <el-col :xs="24" :sm="12"></el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import { fetchHotlineByNumber } from '@/api/hotlines'
  export default {
    data() {
      return {
        selectedNumber: {},
        loading: false
      }
    },
    watch: {
      $route(newVal) {
        this.fetchHotline(newVal.params.hotline)
      }
    },
    methods: {
      fetchHotline(hotline) {
        this.loading = true
        const params = {
          hotline_number: hotline
        }
        return new Promise((resolve, reject) => {
          fetchHotlineByNumber(params)
            .then(res => {
              this.selectedNumber = Object.assign({}, res.data.data[0])
              this.loading = false
              resolve()
            })
            .catch(err => {
              reject(err)
            })
        })
      }
    },
    beforeMount() {
      this.fetchHotline(this.$route.params.hotline)
    }
  }
</script>

<style>
  .status{
    float: right;
  }
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
