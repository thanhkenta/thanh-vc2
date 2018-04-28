<template>
  <el-dialog
    width="700px"
    title="Danh sách các nhóm trực"
    :visible.sync="listTeamModalVisible"
    :before-close="handleClose"
    >
    <el-table
      :data="teamList"
      style="width: 100%"
      fit
    >
      <el-table-column
        label="Tên nhóm"
        prop="team_name"
        min-width="160px"
      >
      </el-table-column>

      <el-table-column
        label="Máy lẻ"
        min-width="230px"
      >
        <template slot-scope="scope">
          <el-tag
            v-for="ext in scope.row.list_ext"
            :key="ext.id"
            type="info"
          >
            {{ ext.extension_number }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="Chế độ đổ chuông"
        min-width="170px"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.team_strategy === 'free'">Máy rảnh</el-tag>
          <el-tag v-if="scope.row.team_strategy === 'random'" type="success">Ngẫu nhiên</el-tag>
          <el-tag v-if="scope.row.team_strategy === 'flow'" type="warning">Tuần tự</el-tag>
        </template>
      </el-table-column>

      <el-table-column min-width="100px">
        <template slot-scope="scope">
          <el-button @click="handleSelect(scope.row)" type="default" size="small">Chọn</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">Hủy</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: 'list-team',
    props: ['listTeamModalVisible', 'teamList'],
    data() {
      return {}
    },
    methods: {
      handleClose() {
        this.$emit('closeListTeam')
      },
      handleSelect(data) {
        this.$emit('selectTeam', data)
      }
    }
  }
</script>
