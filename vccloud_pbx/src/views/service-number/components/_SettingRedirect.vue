<template>
  <el-dialog
    title="Cấu hình chuyển tiếp cuộc gọi"
    :visible.sync="redirectCallFormVisible"
    width="600px"
    :before-close="handleClose"
  >
    <el-form label-width="200px" label-position="top">
      <el-form-item label="Chọn người chuyển tiếp">
        <el-select v-model="selectedRedirectPerson" placeholder="Chọn người chuyển tiếp" multiple>
          <el-option
            :label="option.label"
            :value="option.value"
            v-for="option in redirectPersonOptions"
            :key="option.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Chế độ đổ chuông">
        <el-select v-model="selectedRedirectMode" placeholder="Chọn chế độ">
          <el-option
            :label="option.label"
            :value="option.value"
            v-for="option in redirectModeOptions"
            :key="option.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Mô tả">
        <el-input
          type="textarea"
          :rows="3"
          v-model="description">
        </el-input>
      </el-form-item>

      <el-tabs v-model="activeName" class="heading-tab">
        <el-tab-pane label="Thêm người chuyển tiếp" name="first">
          <el-form-item label="Tên người nhận chuyển tiếp">
            <el-input
              v-model="nameRedirect"
            >
            </el-input>
          </el-form-item>

          <el-form-item label="Số di động">
            <el-input
              v-model="phone"
            >
            </el-input>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose" size="small">Đóng</el-button>
      <el-button type="primary" @click="" size="small">Thêm</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    props: ['redirectCallFormVisible'],
    data() {
      return {
        activeName: 'first',
        selectedRedirectPerson: [],
        redirectPersonOptions: [
          { value: 'Nguyễn Văn A', label: 'Nguyễn Văn A' },
          { value: 'Nguyễn Thị C', label: 'Nguyễn Thị C' },
          { value: 'Trần Như Nhộng', label: 'Trần Như Nhộng' },
          { value: 'Nguyễn Văn Tèo', label: 'Nguyễn Văn Tèo' }
        ],
        selectedRedirectMode: 1,
        redirectModeOptions: [
          { value: 1, label: 'Tuần tự' },
          { value: 2, label: 'Ngẫu nhiên' },
          { value: 3, label: 'Chọn máy rảnh nhất' }
        ],
        description: '',
        nameRedirect: '',
        phone: ''
      }
    },
    methods: {
      handleClose() {
        this.$emit('closeRedirectCallModal')
      }
    }
  }
</script>
