<template>
  <el-dialog
    title="Thêm Phòng/Ban"
    :visible.sync="addDepartmentFormVisible"
    width="800px"
    :before-close="handleClose"
    lock-scroll
    :close-on-press-escape="false"
    :close-on-click-modal="false"
  >
    <el-steps :active="step" finish-status="success" align-center>
      <el-step title="Tạo phòng/ban"></el-step>
      <el-step title="Thêm nhóm trực"></el-step>
    </el-steps>
    <!--Tạo phòng ban-->
    <el-form ref="form" :model="form" label-width="150px" label-position="top" v-if="step === 0" style="margin-top: 20px;" :rules="formRules">
        <el-form-item label="Tên Phòng/Ban" prop="departmentName">
          <el-input v-model="form.departmentName" placeholder="Nhập tên phòng/ban"></el-input>
        </el-form-item>

        <el-form-item label="Số máy lẻ của phòng/ban" prop="selectedExtList">
          <el-select multiple v-model="form.selectedExtList" filterable placeholder="Chọn hoặc gõ để tìm số máy lẻ">
            <el-option
              v-for="item in extList"
              :key="item.id"
              :label="item.extension_number"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Phím tắt" prop="hotKey">
          <el-input v-model="form.hotKey" type="text" placeholder="Nhập phím tắt (0-9)"></el-input>
        </el-form-item>

        <el-form-item label="Mô tả ngắn" prop="description">
          <el-input type="textarea" v-model="form.description" placeholder="Nhập mô tả của phòng/ban"></el-input>
        </el-form-item>
    </el-form>

    <!--Thêm nhóm trực-->
    <el-tabs v-model="activeName" class="heading-tab" v-if="step === 1">
      <el-tab-pane label="Nhóm trực" name="first">
        <el-button @click="openAddTeamForm" type="success">Thêm nhóm trực</el-button>
        <el-form ref="addTeamForm" :model="teamForm">
          <el-table
            :data="teamList"
            style="width: 100%">
            <el-table-column
              label="Tên nhóm trực"
              min-width="180"
              prop="team_name"
            >
            </el-table-column>

            <el-table-column
              label="Chế độ đổ chuông"
              min-width="180"
              prop="ringingMode"
            >
              <template slot-scope="scope">
                <el-tag v-if="scope.row.team_strategy === 'free'">Máy rảnh</el-tag>
                <el-tag v-if="scope.row.team_strategy === 'random'" type="success">Ngẫu nhiên</el-tag>
                <el-tag v-if="scope.row.team_strategy === 'flow'" type="warning">Tuần tự</el-tag>
              </template>
            </el-table-column>

            <el-table-column
              label="Số máy lẻ"
              min-width="180"
            >
              <template slot-scope="scope">
                <el-tag
                  type="info"
                  v-for="ext in scope.row.list_ext"
                  :key="ext.id"
                >
                  {{ ext.extension_number }}
                </el-tag>
              </template>
            </el-table-column>

            <el-table-column min-width="50">
              <template slot-scope="scope">
                <el-form-item>
                  <el-button
                    type="danger"
                    size="small"
                    @click="handleDeleteTeam(scope.row.id)"
                  >
                    <i class="el-icon-delete"></i>
                  </el-button>
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </el-tab-pane>
    </el-tabs>

    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose" size="small">Đóng</el-button>
      <el-button type="primary" @click="addDepartment" size="small" v-if="step === 0" :disabled="form.selectedExtList.length < 1 || form.departmentName === ''">Xác nhận</el-button>
      <!--<el-button type="primary" @click="step++" size="small" v-if="step === 0 && selectedExtList.length > 0"></el-button>-->
    </span>
  </el-dialog>
</template>

<script>
  import { createOrEditDepartment } from '@/api/department'
  import { deleteTeam } from '@/api/team'
  export default {
    props: ['addDepartmentFormVisible', 'extList', 'selectedNumber', 'teamList'],
    data() {
      return {
        step: 0,
        activeName: 'first',
        form: {
          departmentName: '',
          selectedExtList: [],
          hotKey: '',
          description: ''
        },
        teamForm: {
          id: '',
          name: '',
          ringingMode: 'flow',
          numbers: []
        },
        formRules: {
          departmentName: [
            { required: true, trigger: 'blur, change', message: 'Không được để trống' }
          ],
          selectedExtList: [
            { required: true, trigger: 'blur, change', message: 'Phải chọn ít nhất một số máy lẻ' }
          ]
        },
        selectedDepartment: {
          id: '',
          name: '',
          extList: []
        }
      }
    },
    computed: {
      currentDepartmentExtList() {
        return this.extList.filter(ext => {
          if (this.form.selectedExtList.indexOf(ext.id) > -1) return ext
        })
      }
    },
    methods: {
      handleDeleteTeam(id) {
        this.$confirm('Bạn chắc chắn muốn xóa nhóm trực này?', 'Chú ý', {
          confirmButtonText: 'Xác nhận',
          cancelButtonText: 'Hủy bỏ',
          type: 'warning'
        }).then(() => {
          const params = {
            id: id
          }
          return new Promise((resolve, reject) => {
            deleteTeam(params)
              .then(res => {
                this.$notify({
                  title: 'Thành công',
                  message: 'Xóa nhóm trực thành công',
                  type: 'success'
                })
                this.$emit('fetchTeamList', this.selectedDepartment.id)
                resolve()
              })
              .catch(err => {
                reject(err)
              })
          })
        }).catch(() => {})
      },
      openAddTeamForm() {
        this.$emit('openAddTeamModal', this.selectedDepartment)
      },
      handleClose() {
        this.$emit('closeModal')
        this.step = 0
      },
      addDepartment() {
        const data = {
          department_name: this.form.departmentName,
          id_hotline: this.selectedNumber.id,
          list_id_ext: this.form.selectedExtList
        }
        if (this.form.description) {
          data['short_desc'] = this.form.description
        }
        this.$confirm('Bạn chắc chắn tạo phòng ban này chứ?', 'Chú ý', {
          confirmButtonText: 'Xác nhận',
          cancelButtonText: 'Hủy',
          type: 'warning'
        }).then(() => {
          return new Promise((resolve, reject) => {
            createOrEditDepartment(data)
              .then(res => {
                if (res.data.status) {
                  // console.log(res)
                  this.$notify({
                    title: 'Thành công',
                    message: 'Thêm phòng ban thành công!',
                    type: 'success'
                  })
                  // Set Selected Department data
                  this.selectedDepartment.id = res.data.id
                  this.selectedDepartment.name = this.form.departmentName
                  this.selectedDepartment.extList = this.currentDepartmentExtList
                  // Reset form
                  this.$refs.form.resetFields()
                  // Increase step
                  this.step++
                  // Update Deparment list
                  this.$emit('fetchDepartmentList')
                } else {
                  this.$notify({
                    title: 'Thêm thất bại',
                    message: 'Phòng ban đã tồn tại!',
                    type: 'error'
                  })
                }
                resolve()
              })
              .catch(err => {
                this.$notify({
                  title: 'Thất bại',
                  message: 'Thêm phòng ban thất bại!',
                  type: 'error'
                })
                reject(err)
              })
          })
        }).catch(() => {})
      }
    }
  }
</script>

<style>
  .cell .el-tag {
    margin-right: 2px !important;
  }
</style>
