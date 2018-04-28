<template>
  <div>
    <el-row class="page-title">
      <h4 style="float: left">Cài đặt tổng đài: <span style="color: #409eff;">{{selectedNumber.number}}</span></h4>
      <el-button style="float: right; margin-top: 9px" size="medium" type="warning" @click="handleShowGreetingList">
        Lời chào
      </el-button>
    </el-row>

    <div class="app-container" v-loading="loading">
      <el-card class="tab-panel">
        <el-steps :active="step" finish-status="success" align-center>
          <el-step title="Bước 1" description="Thêm số máy lẻ"></el-step>
          <el-step title="Bước 2" description="Thêm phòng ban"></el-step>
          <el-step title="Bước 3" description="Cài đặt thời gian hoạt động"></el-step>
          <el-step title="Bước 4" description="Kịch bản tổng đài"></el-step>
        </el-steps>

        <step1
          :extList="extList"
          :totalExt="totalExt"
          :selectedHotlineId="selectedNumber.id"
          v-show="step === 0"
          @listExtPageChange="listExtPageChange"
          @fetchExtList="fetchExtList"
        >
        </step1>
        <step2
          v-show="step === 1"
          :extList="extList"
          :selectedNumber="selectedNumber"
        ></step2>
        <step3 v-show="step === 2"></step3>
        <step4 v-show="step === 3"></step4>

        <div class="step-controller">
          <el-button plain round size="small" type="primary" @click="prevStep" :disabled="step <= 0">
            Bước trước
          </el-button>
          <el-button plain round size="small" type="primary" v-if="step < 3" :disabled="!canNext" @click="nextStep">
            Bước tiếp theo
          </el-button>
          <el-button plain round size="small" type="primary" v-if="step === 3" @click="">
            Hoàn thành
          </el-button>
        </div>
      </el-card>
    </div>
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
  </div>
</template>

<script>
  // import { mapGetters } from 'vuex'
  import Step1 from './components/Step1'
  import Step2 from './components/Step2'
  import Step3 from './components/Step3'
  import Step4 from './components/Step4'
  import { fetchExtByHotline } from '@/api/extensionNumber'
  import GreetingModal from '@/components/Greeting/index'
  import * as soundServices from '@/api/sound'

  export default {
    name: 'setting',
    components: { Step1, Step2, Step3, Step4, GreetingModal },
    data() {
      return {
        greetingFormVisible: false,
        soundOptions: [],
        selectedDepartment: {},
        greetingType: 'default',
        totalSound: 0,
        loading: false,
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
      },
      $route(newRoute) {
        this.step = 0
        this.selectedNumber.id = newRoute.params.id
        this.selectedNumber.number = newRoute.params.number
        this.fetchExtList()
      }
    },
    methods: {
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
      handleChangePageSound(page) {
        this.fetchGreeting(page)
      },
      //click lời chào để hiển thị
      handleShowGreetingList() {
        this.fetchGreeting()
        this.greetingFormVisible = true
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
