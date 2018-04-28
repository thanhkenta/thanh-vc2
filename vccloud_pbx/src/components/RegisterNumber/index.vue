<template>
  <el-dialog
    title="Đăng kí tổng đài với số khác"
    :visible.sync="showResgister"
    width="25%"
    :before-close="handleClose">
    <el-form style="padding-bottom: 0.1em">
      <el-form-item>
        <el-input placeholder="Nhập số"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="selected" name="" id="" filterable placeholder="Chọn nhà mạng">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="Ip nhà mạng"></el-input>
      </el-form-item>
      <!--<el-form-item>-->
        <!--<el-button type="primary" @click="handleClose">Xác nhận</el-button>-->
        <!--<el-button @click="handleClose">Đóng</el-button>-->
      <!--</el-form-item>-->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleClose">Xác nhận</el-button>
        <el-button @click="handleClose">Đóng</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: 'showResgister',
    props: ['showResgister'],
    data() {
      return {
        options: [
          { value: 'Viettel' },
          { value: 'Vina Phone' },
          { value: 'Mobi Phone' },
          { value: 'Vietnam Mobie' }
        ],
        selected: ''
      }
    },
    methods: {
      handleClose() {
        this.$emit('closeResgister')
      }
    }
  }
</script>
