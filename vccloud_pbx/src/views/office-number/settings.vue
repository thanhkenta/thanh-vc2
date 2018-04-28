<template>
  <div>
    <el-row class="page-title">
      <h4>Cài đặt tổng đài: <span style="color: #409eff;">{{selectedNumber.number}}</span></h4>
    </el-row>

    <div class="app-container">
      <el-card class="tab-panel">
        <el-steps :active="step" finish-status="success" align-center>
          <el-step title="Bước 1" description="Thêm số máy lẻ"></el-step>
          <el-step title="Bước 2" description="Cài đặt thời gian hoạt động"></el-step>
          <el-step title="Bước 3" description="Kịch bản tổng đài"></el-step>
        </el-steps>

        <step1
           :extList="extList"
           :totalExt="totalExt"
           :selectedHotlineId="selectedNumber.id"
           v-show="step === 0"
           @fetchExtList="fetchExtList"
           @listExtPageChange="listExtPageChange"
        ></step1>
        <step2 v-show="step === 1"></step2>
        <step3 v-show="step === 2"></step3>

        <div class="step-controller">
          <el-button plain round size="small" type="primary" @click="prevStep" :disabled="step <= 0">
            Bước trước
          </el-button>
          <el-button plain round size="small" type="primary" v-if="step < 2" :disabled="!canNext" @click="nextStep">
            Bước tiếp theo
          </el-button>
          <el-button plain round size="small" type="primary" v-if="step === 2" @click="">
            Hoàn thành
          </el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  // import { mapGetters } from 'vuex'
  import Step1 from './components/Step1'
  import Step2 from './components/Step2'
  import Step3 from './components/Step3'
  import { fetchExtByHotline } from '@/api/extensionNumber'

  export default {
    name: 'permission',
    components: { Step1, Step2, Step3 },
    data() {
      return {
        selectedNumber: {
          id: '',
          number: ''
        },
        step: 0,
        canNext: false,
        extList: [],
        totalExt: 0
      }
    },
    computed: {},
    watch: {
      extList(newVal) {
        if (newVal.length === 0) this.canNext = false
        else this.canNext = true
      }
    },
    methods: {
      listExtPageChange(page) {
        this.fetchExtList(page)
      },
      fetchExtList(page = 1) {
        this.loading = true
        const params = {
          id_hotline: this.selectedNumber.id,
          offset: page,
          limit: 10
        }
        return new Promise((resolve, reject) => {
          fetchExtByHotline(params)
            .then(res => {
              this.totalExt = res.data.total
              this.extList = res.data.data
              this.loading = false
              resolve()
            })
            .catch(err => {
              reject(err)
            })
        })
      },
      nextStep() {
        if (this.canNext) this.step++
      },
      prevStep() {
        this.step--
      }
    },
    beforeMount() {
      this.selectedNumber.id = this.$route.params.id
      this.selectedNumber.number = this.$route.params.number
      this.fetchExtList()
    }
  }
</script>

<style>
  .step-controller, .step-content {
    margin-top: 20px;
  }
</style>
