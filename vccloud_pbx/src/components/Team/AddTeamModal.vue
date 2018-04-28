<template>
  <el-dialog
    :title="`Thêm nhóm trực vào phòng/ban (${selectedDepartment.name})`"
    :visible.sync="addTeamFormVisible"
    width="500px"
    :before-close="handleClose"
  >
    <el-form ref="addTeamForm" :model="addTeamForm" :rules="teamRules" label-position="top">
      <el-form-item prop="name" label="Tên nhóm">
        <el-input v-model="addTeamForm.name" placeholder="Nhập tên nhóm trực"></el-input>
      </el-form-item>

      <el-form-item prop="ringingMode" label="Chế độ đổ chuông">
        <el-select v-model="addTeamForm.ringingMode">
          <el-option
            :label="option.label"
            :value="option.value"
            v-for="option in ringingModeOptions"
            :key="option.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="numbers" label="Số máy lẻ">
        <el-select v-model="addTeamForm.numbers" multiple placeholder="Chọn số">
          <el-option-group label="Số máy lẻ">
            <!-- Sửa lại  currentDepartmentExtList sau -->
            <el-option
              v-for="item in selectedDepartment.extList"
              :key="item.id"
              :label="item.extension_number"
              :value="item.id">
            </el-option>
          </el-option-group>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose" size="small">Đóng</el-button>
      <el-button type="primary" size="small" @click="handleAddTeam" :loading="loading">Thêm</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { createOrUpdateTeam } from '@/api/team'
  export default {
    props: ['addTeamFormVisible', 'selectedDepartment'],
    data() {
      return {
        loading: false,
        addTeamForm: {
          id: '',
          name: '',
          ringingMode: 'flow',
          numbers: []
        },
        teamRules: {
          name: [
            { required: true, trigger: 'blur, change', message: 'Không được để trống' }
          ],
          ringingMode: [
            { required: true, trigger: 'blur, change', message: 'Không được để trống' }
          ],
          numbers: [
            { required: true, trigger: 'blur, change', message: 'Phải chọn ít nhất một số máy lẻ' }
          ]
        },
        ringingModeOptions: [
          { value: 'flow', label: 'Tuần tự' },
          { value: 'random', label: 'Ngẫu nhiên' },
          { value: 'free', label: 'Chọn máy rảnh nhất' }
        ]
      }
    },
    methods: {
      handleClose() {
        this.$emit('closeAddTeam')
      },
      handleAddTeam() {
        const data = {
          team_name: this.addTeamForm.name,
          list_id_ext: this.addTeamForm.numbers,
          team_strategy: this.addTeamForm.ringingMode,
          department_id: this.selectedDepartment.id
        }
        this.$refs.addTeamForm.validate(valid => {
          if (valid) {
            // console.log(this.addTeamForm)
            this.$confirm('Bạn chắc chắn muốn thêm nhóm trực này chứ?', 'Chú ý', {
              confirmButtonText: 'Xác nhận',
              cancelButtonText: 'Hủy bỏ',
              type: 'warning'
            }).then(() => {
              this.loading = true
              return new Promise((resolve, reject) => {
                createOrUpdateTeam(data)
                  .then(res => {
                    this.loading = false
                    if (res.data.status) {
                      this.$notify({
                        title: 'Thành công',
                        message: 'Thêm nhóm trực thành công!',
                        type: 'success'
                      })
                      // Reset form
                      this.$refs.addTeamForm.resetFields()
                      // Fetch list team
                      this.$emit('fetchTeamList', this.selectedDepartment.id)
                      // Re-fetch department
                      this.$emit('fetchDepartment')
                      // Close modal
                      this.handleClose()
                    } else {
                      this.$notify({
                        title: 'Thêm thất bại',
                        message: 'Nhóm trực này đã tồn tại!',
                        type: 'error'
                      })
                    }
                  })
                  .catch(err => {
                    this.loading = false
                    reject(err)
                  })
              })
            }).catch(() => {})
          }
        })
      }
    }
  }
</script>

<style>
  .el-upload-dragger {
    width: 460px!important;
  }
</style>
