<template>
  <el-dialog
    width="800px"
    title="Thông tin các thiết bị"
    :visible.sync="showInfoDevice"
    :before-close="handleClose"
  >
    <span>
      <el-button size='small' type="success" @click="addModel">Thêm thiết bị</el-button>
    </span>
    <el-table :data="devices" style="width: 100%">
      <el-table-column prop="model" label="Model thiết bị" width="180">
        <template slot-scope="scope">
          <div v-if="scope.row.edit">
            <el-select v-model="scope.row.modelId">
              <el-option
                v-for="model in modelOptions"
                :key="model.id"
                :value="model.id"
                :label="model.name"
              >
              </el-option>
            </el-select>
          </div>
          <div v-else>
            {{ showModelName(scope.row.modelId) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="vendor" label="Nhà cung cấp thiết bị" width="180">
        <template slot-scope="scope">
          <div v-if="scope.row.edit">
            <el-input placeholder="Please input" v-model="scope.row.vendor"/>
          </div>
          <div v-else>
            {{scope.row.vendor}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="mac" label="Địa chỉ mac">
        <template slot-scope="scope">
          <div v-if="scope.row.edit">
            <el-input placeholder="Please input" v-model="scope.row.mac"/>
          </div>
          <div v-else>
            {{scope.row.mac}}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Công cụ" min-width="200px">
        <template slot-scope="scope">
          <el-button size='small' type="success" plain @click="scope.row.edit = false" v-if="scope.row.edit">Lưu</el-button>
          <el-button size='small' @click="stopEdit(scope.row)" v-if="scope.row.edit">Hủy</el-button>
          <el-button @click="handleSelect(scope.row)" type="primary" plain size="small">Chọn</el-button>
          <el-button size='small' @click="handleEdit(scope.row)" v-if="!scope.row.edit"><i class="el-icon-edit"></i></el-button>
          <el-button @click="handleDelete(scope.row)" type="danger" size="small" plain><i class="el-icon-delete"></i></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose" size="small">Đóng</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: 'ListDevice',
    props: ['showInfoDevice'],
    data() {
      return {
        tempData: {},
        devices: [
          {
            id: 1,
            modelId: 1,
            vendor: 'ATT',
            mac: 'mac_1',
            edit: false
          }, {
            id: 2,
            modelId: 2,
            vendor: 'ATX',
            mac: 'mac_2',
            edit: false
          }, {
            id: 3,
            modelId: 3,
            vendor: 'ATC',
            mac: 'mac_3',
            edit: false
          }
        ],
        modelOptions: [
          {
            id: 1,
            name: 'TX102'
          },
          {
            id: 2,
            name: 'TX105'
          },
          {
            id: 3,
            name: 'TX123'
          }
        ]
      }
    },
    methods: {
      showModelName(id) {
        for (let i = 0; i < this.modelOptions.length; i++) {
          if (this.modelOptions[i].id === id) {
            return this.modelOptions[i].name
          }
        }
      },
      handleEdit(row) {
        this.tempData = Object.assign({}, row)
        row.edit = true
        for (let i = 0; i < this.tableData.length; i = i + 1) {
          if (this.tableData[i].id !== row.id) {
            this.tableData[i].edit = false
          }
        }
      },
      stopEdit(row) {
        row.edit = false
        row.model = this.tempData.model
        row.vendor = this.tempData.vendor
        row.mac = this.tempData.mac
      },
      handleDelete(data) {
        for (let i = 0; i < this.devices.length; i = i + 1) {
          if (this.devices[i].id === data.id) {
            this.devices.splice(i, 1)
          }
        }
      },
      addModel() {
        this.devices.unshift({
          model: '',
          vendor: '',
          mac: '',
          edit: true
        })
      },
      handleClose() {
        this.$emit('closeInfoDevice')
      },
      handleSelect(data) {
        this.$emit('selectDevice', data)
        console.log(data)
      }
    },
    watch: {
      listDevice(newList) {
        if (newList) {
          this.list = newList
        }
      }
    }
  }
</script>
