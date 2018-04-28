<template>
  <el-dialog
    :title="`Chỉnh sửa phòng/ban (${selectedDepartment.department_name})`"
    :visible.sync="editDepartmentFormVisible"
    width="500px"
    :before-close="handleClose"
  >
    <el-form ref="form" :model="form" label-width="150px" label-position="top" style="margin-top: 20px;" :rules="formRules">
      <el-form-item label="Tên Phòng/Ban" prop="departmentName">
        <el-input v-model="form.departmentName" placeholder="Nhập tên phòng/ban"></el-input>
      </el-form-item>

      <el-form-item label="Số máy lẻ của phòng/ban" prop="selectedExtList">
        <el-select
          v-model="form.selectedExtList"
          filterable
          multiple
          placeholder="Chọn hoặc gõ để tìm số máy lẻ">
          <el-option-group label="Số máy lẻ">
            <el-option
              v-for="item in extList"
              :key="item.id"
              :label="item.extension_number"
              :value="item.id">
            </el-option>
          </el-option-group>
        </el-select>
      </el-form-item>

      <el-form-item label="Mô tả ngắn" prop="description">
        <el-input type="textarea" v-model="form.description" placeholder="Nhập mô tả của phòng/ban"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose" size="small">Đóng</el-button>
      <el-button type="primary" size="small" @click="handleEditDepartment" :loading="loading">Lưu</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { createOrEditDepartment } from '@/api/department'

  export default {
    props: ['editDepartmentFormVisible', 'selectedDepartment', 'extList', 'selectedNumber'],
    data() {
      return {
        loading: false,
        form: {
          id: '',
          departmentName: '',
          selectedExtList: [],
          description: ''
        },
        formRules: {
          departmentName: [
            { required: true, trigger: 'blur, change', message: 'Không được để trống' }
          ],
          selectedExtList: [
            { required: true, trigger: 'blur, change', message: 'Phải chọn ít nhất một số máy lẻ' }
          ]
        }
      }
    },
    watch: {
      selectedDepartment(newVal) {
        this.form.selectedExtList = []
        this.form.departmentName = newVal.department_name
        for (let i = 0; i < newVal.list_ext.length; i = i + 1) {
          this.form.selectedExtList.push(newVal.list_ext[i].id)
        }
        this.form.description = newVal.short_desc
        this.form.id = newVal.id
        // console.log(newVal)
      }
    },
    methods: {
      handleClose() {
        this.$emit('closeEditDepartment')
      },
      handleEditDepartment() {
        const data = {
          department_name: this.form.departmentName,
          id_hotline: this.selectedNumber.id,
          list_id_ext: this.form.selectedExtList,
          short_desc: this.form.description,
          id: this.form.id
        }
        this.$confirm('Bạn chắc chắn muốn cập nhật thông tin phòng ban?', 'Chú ý', {
          confirmButtonText: 'Xác nhận',
          cancelButtonText: 'Hủy bỏ',
          type: 'warning'
        }).then(() => {
          return new Promise((resolve, reject) => {
            createOrEditDepartment(data)
              .then(res => {
                // console.log(res)
                if (res.data.status) {
                  this.$notify({
                    title: 'Thành công',
                    message: 'Cập nhật thông tin phòng ban thành công!',
                    type: 'success'
                  })
                  // Đóng modal, cập nhật dữ liệu
                  this.$emit('departmentUpdated')
                }
                resolve()
              })
              .catch(err => reject(err))
          })
        }).catch(() => {})
      }
    },
    mounted() {}
  }
</script>

<style>
</style>
