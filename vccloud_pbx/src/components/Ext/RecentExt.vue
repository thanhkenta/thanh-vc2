<template>
  <el-dialog
    title="Số máy lẻ vừa tạo"
    :visible.sync="showRecenExt"
    width="600px"
    :before-close="handleClose">
    <el-row :gutter="30" class="text item">
      <el-col :xs="24" :sm="12" style="">
        <strong>Tài khoản:</strong>
      </el-col>
      <el-col :xs="24" :sm="12">
        {{ newExt.extension_account }}
      </el-col>
    </el-row>

    <el-row :gutter="30" class="text item">
      <el-col :xs="24" :sm="12" style="">
        <strong>Mật khẩu:</strong>
      </el-col>
      <el-col :xs="24" :sm="12">
        {{ newExt.extension_password }}
      </el-col>
    </el-row>

    <el-row :gutter="30" class="text item">
      <el-col :xs="24" :sm="12" style="">
        <strong>Máy lẻ di động:</strong>
      </el-col>
      <el-col :xs="24" :sm="12">
        <el-tag v-for="mobile in newExt.extension_mobile" :key="mobile">
          {{ mobile }}
        </el-tag>
      </el-col>
    </el-row>
    <el-row :gutter="30" class="text item">
      <el-col :xs="24" :sm="12" style="">
        <strong>Quyền gọi:</strong>
      </el-col>
      <el-col :xs="24" :sm="12">
        {{ newExt.extension_call_permit }}
      </el-col>
    </el-row>

    <el-row :gutter="30" class="text item">
      <el-col :xs="24" :sm="12" style="">
        <strong>MAC thiết bị:</strong>
      </el-col>
      <el-col :xs="24" :sm="12">
        {{ newExt.device_info.mac }}
      </el-col>
    </el-row>

    <el-row :gutter="30" class="text item" style="border: none">
      <el-col :xs="24" :sm="12">
        <strong>Vai trò:</strong>
      </el-col>
      <el-col :xs="24" :sm="12">
        {{ newExt.extension_role }}
      </el-col>
    </el-row>

    <span slot="footer" class="dialog-footer">
      <el-button type="default" size="small" @click="handleClose()">Đóng</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: 'recent-ext',
    props: ['newExt', 'showRecenExt'],
    methods: {
      handleClose() {
        this.$emit('closeRecenExt')
      }
    }
  }
</script>

<style scoped>

</style>
