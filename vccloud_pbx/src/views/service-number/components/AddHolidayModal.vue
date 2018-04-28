<template>
  <el-dialog
    title="Thêm ngày nghỉ lễ"
    :visible.sync="addHolidayFormVisible"
    width="500px"
    :before-close="handleClose"
  >
    <el-form label-width="200px" label-position="top">
      <!--<el-form-item label="Chọn ngày nghỉ lễ cố định">-->
        <!--<el-select v-model="selectedHoliday" placeholder="Chọn ngày nghỉ lễ cố định">-->
          <!--<el-option-->
            <!--:label="option.label"-->
            <!--:value="option.value"-->
            <!--v-for="option in holidayOptions"-->
            <!--:key="option.value"-->
          <!--&gt;</el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->

      <el-form-item label="Tên ngày lễ">
        <el-input
          v-model="holidayName">
        </el-input>
      </el-form-item>

      <el-form-item label="Chọn thời gian nghỉ lễ">
        <el-date-picker
          v-model="datetimeRange"
          type="datetimerange"
          align="right"
          start-placeholder="Thời gian bắt đầu"
          end-placeholder="Thời gian kết thúc"
          value-format="dd-MM-yyyy HH-mm-ss"
          :default-value="new Date()"
          :default-time="['08:00:00', '17:30:00']">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="Mô tả ngắn">
        <el-input
          type="textarea"
          v-model="description">
        </el-input>
      </el-form-item>

    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose" size="small">Đóng</el-button>
      <el-button type="primary" size="small">Thêm</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    props: ['addHolidayFormVisible'],
    data() {
      // const today = new Date()
      // let tomorrow = new Date()
      // tomorrow = new Date(tomorrow.setDate(tomorrow.getDate() + 1))
      return {
        fileList: [],
        activeName: 'first',
        datetimeRange: [],
        holidayName: '',
        selectedHoliday: 'Tùy biến',
        holidayOptions: [
          { value: 1, label: 'Tùy biến' },
          { value: 2, label: 'Tết Dương Lịch' },
          { value: 3, label: 'Tết Nguyên Đán' },
          { value: 4, label: 'Quốc Khánh' }
        ],
        description: ''
      }
    },
    methods: {
      handleClose() {
        this.$emit('closeAddHolidayModal')
      }
    }
  }
</script>

<style>
  .el-date-editor--datetimerange {
    width: 100%!important;
  }
</style>
