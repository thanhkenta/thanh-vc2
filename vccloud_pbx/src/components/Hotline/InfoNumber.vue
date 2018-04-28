<template>
    <el-dialog
      title="Thông tin các tổng đài"
      :visible.sync="showInfoNumber"
      :before-close="handleClose"
      top = "40px"
    >
      <el-table
        style="width: 100%"
        :data="list"
      >
        <el-table-column
          label="Hotline"
          min-width="180"
          prop="hotline_number"
        >
        </el-table-column>
        <el-table-column
          label="Loại số"
          width="180"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.kind === 'VIP' ? 'VIP' : 'Thường' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="registration_fee"
          label="Cước phí">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleSelect(scope.row)">Chọn số</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="margin-top: 10px; text-align: right;">
        <el-pagination
          @current-change="handleCurrentChange"
          layout="total, prev, pager, next"
          :total="allPage.length">
        </el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">Đóng</el-button>
      </div>
    </el-dialog>


</template>

<script>
  export default {
    name: 'showInfoNumber',
    props: ['showInfoNumber', 'listNumbers', 'allPage'],
    data() {
      return {
        list: []
      }
    },
    methods: {
      handleClose() {
        this.$emit('closeInfoNumber')
      },
      handleSelect(data) {
        // console.log(data.hotline_number)
        this.$emit('selectNumber', data.hotline_number)
      },
      handleCurrentChange(val) {
        // console.log(`current page: ${val}`)
        this.$emit('selectPage', val)
      }
    },
    watch: {
      listNumbers(newList) {
        if (newList) {
          this.list = newList
        }
      }
    }
  }
</script>


