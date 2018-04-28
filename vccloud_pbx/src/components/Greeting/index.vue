<template>
  <el-dialog
    :title="greetingType === 'department' ? `Lời chào (mặc định của ${selectedDepartment.department_name})` : greetingType === 'time' ? 'Lời chào (theo khoảng thời gian)' : 'Lời chào (mặc định của hotline)' "
    :visible.sync="greetingFormVisible"
    width="750px"
    max-width="90%"
    :before-close="handleClose"
  >
  <!-- visible.sync true thì mới hiển thị -->
    <el-form label-width="200px" label-position="top" :model="form" ref="form">
        <el-upload
          class="upload-demo"
          :action="fileUploadSettings.action"
          :headers="fileUploadSettings.headers"
          name="intro"
          :auto-upload="false"
          :on-change="handleUploadFile"
        >
          <el-button size="small" type="success" :disabled="uploading">Upload file ghi âm <i class="el-icon-upload2"></i></el-button>
          <!--<div slot="tip" class="el-upload__tip">File .mp3 kích thước không quá 5mb</div>-->
        </el-upload>
    </el-form>

    <h3>Danh sách file ghi âm</h3>
    <div style="width: 100%;">
      <el-table
        v-loading="uploading"
        :data="soundOptions"
        fit
      >
        <el-table-column
          label="Tên file"
          prop="sound_name"
          min-width="180px"
        >
        </el-table-column>

        <el-table-column
          min-width="265px"
        >
          <template slot-scope="scope">
            <audio controls>
              <source :src="baseUrl + scope.row.url" type="audio/mpeg">
              Your browser does not support the audio element.
            </audio>
          </template>
        </el-table-column>

        <el-table-column
          label="Trạng thái"
          min-width="100px"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 'Active'" type="success">Active</el-tag>
            <el-tag v-else type="info">Inactive</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          label="Hành động"
          min-width="160px"
        >
          <template slot-scope="scope">
            <el-button @click="handleSelect(scope.row)" type="default" size="small" :disabled="scope.row.status === 'Active'">Chọn</el-button> <!-- bấm chọn để chuyển sang active -->
            <el-button @click="handleDelete(scope.row)" type="danger" size="small"><i class="el-icon-delete"></i></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- pagination -->
    <div style="margin-top: 10px; text-align: right;">
      <el-pagination
        layout="total, prev, pager, next"
        :total="totalSound"
        :page-size="5"
        @current-change="handlePageChange"
        :current-page.sync="currentPage"
      >
      </el-pagination>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose" size="small" :disabled="uploading">Đóng</el-button>
      <!--<el-button type="primary" size="small" @click="handleSubmit">Thêm</el-button>-->
    </span>
  </el-dialog>
</template>

<script>
  import axios from 'axios'

  export default {
    props: ['greetingFormVisible', 'soundOptions', 'greetingType', 'selectedDepartment', 'totalSound'],
    data() {
      return {
        currentPage: 1,
        baseUrl: process.env.BASE_API.replace('v1', ''),
        uploading: false,
        activeName: 'first',
        form: {
          selectedGreeting: ''
        },
        description: '',
        fileUploadSettings: {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': '3475c9a0-4690-46df-bc00-6897e82f1f60'
          },
          action: process.env.BASE_API + '/sound/upload'
        }
      }
    },
    methods: {
      //xóa lời chào
      handleDelete(selectedSound) {
        this.$confirm(`Bạn chắc chắn muốn xóa file <b style="color:#cc2020;">${selectedSound.sound_name}</b>?`, 'Warning', {
          confirmButtonText: 'Xác nhận',
          dangerouslyUseHTMLString: true,
          cancelButtonText: 'Hủy',
          type: 'warning'
        }).then(() => {
          this.currentPage = 1
          this.$emit('deleteSound', selectedSound.sound_id)
        }).catch(() => {})
      },
      //chia page với handleChangePageSound()
      handlePageChange(page) {
        this.$emit('changePage', page)
      },
      handleSelect(selectedSound) {
        this.$emit('bindGreeting', selectedSound, this.currentPage)
      },

      //up load file
      handleUploadFile(file) {
        this.uploading = true
        const formData = new FormData()
        formData.append('intro', file.raw)
        // Kiểm tra form hiện tại upload lời chào default hay cho phòng ban
        // từ đó post dữ liệu lên tương ứng
        if (this.greetingType === 'default') {
          formData.append('id_hotline', this.$route.params.id)
        } else if (this.greetingType === 'department') {
          formData.append('id_department', this.selectedDepartment.id)
        }
        axios({
          method: 'post',
          url: this.fileUploadSettings.action,
          headers: this.fileUploadSettings.headers,
          data: formData
        })
          .then(res => {
            this.uploading = false
            if (res.data.status) {
              this.$emit('greetingUploaded')
              this.$notify({
                title: 'Thành công',
                message: 'Tải lên file ghi âm thành công!',
                type: 'success'
              })
            } else {
              this.$notify({
                title: 'Tải lên thất bại',
                message: 'Định dạng file không đúng hoặc thích thước file quá lớn!',
                type: 'error'
              })
            }
          })
          .catch(_ => {
            this.uploading = false
            this.$notify({
              title: 'Tải lên thất bại',
              message: 'Định dạng file không đúng hoặc thích thước file quá lớn!',
              type: 'error'
            })
          })
      },
      //đóng lại lời chào
      handleClose() {
        this.$emit('closeGreeting')
      }
    }
  }
</script>

<style>
  .el-upload-dragger {
    width: 460px!important;
  }
  .el-upload-list {
    display: none;
  }

  audio {
    width: 100%;
  }

  audio::-webkit-media-controls-mute-button,
  audio::-webkit-media-controls-volume-slider {
    display: none;
  }
</style>
