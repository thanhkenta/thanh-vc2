<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-card class="el-card">
          <el-col :span="24">
            <el-form label-position="top" :model="value6" label-width="150px" class="demo-ruleForm">
              <el-col :span="8">
                <el-form-item label="Hotline">
                  <el-select filterable no-match-text="Số không có sẵn" size="small">
                    <el-option></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="Lọc theo máy lẻ">
                  <el-select no-match-text="Số không có sẵn" filterable size="small">
                    <el-option value="1">410116</el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Thời gian từ">
                  <el-date-picker
                    style="width: 100%"
                    size="small"
                    class="chon"
                    v-model="value6"
                    type="daterange"
                    start-placeholder="Từ ngày"
                    end-placeholder="Đến ngày">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="Khoảng thời gian">
                  <el-select size="small">
                    <el-option value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Trạng thái cuộc gọi">
                  <el-select size="small">
                    <el-option value="1">Cuộc gọi 1</el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="Hướng cuộc gọi">
                  <el-select size="small">
                    <el-option value="1"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button style="float: right" type="success">Lọc báo cáo</el-button>
                </el-form-item>
              </el-col>
            </el-form>
          </el-col>
      </el-card>
      <el-card class="report-table">
        <el-col :span="24">
          <div>
            <h5>Tổng cộng: 8 cuộc gọi</h5>
            <el-button type="primary">Xuất báo cáo ra file exel</el-button>
          </div>

          <div style="margin: 10px 0 20px">
            <el-table
              :data="tableData"
              stripe
              style="width: 100%">
              <el-table-column
                prop="idcuocgoi"
                label="ID cuộc gọi"
                min-width="70">
              </el-table-column>
              <el-table-column
                prop="hcuocgoi"
                label="Hướng cuộc gọi"
                min-width="70">
              </el-table-column>
              <el-table-column
                prop="sogoiden"
                label="Số gọi đến"
                min-width="90">
              </el-table-column>
              <el-table-column
                prop="sonhancuocgoi"
                label="Số nhận cuộc gọi"
                min-width="110"
              ></el-table-column>
              <el-table-column
                prop="ttcuocgoi"
                label="Trạng thái cuộc gọi"
                min-width="100"
              ></el-table-column>
              <el-table-column
                prop="batdau"
                label="Thời gian cuộc gọi bắt đầu"
                min-width="110"
              ></el-table-column>
              <el-table-column
                prop="ketthuc"
                label="Thời gian cuộc gọi kết thúc"
                min-width="110"
              ></el-table-column>
              <el-table-column
                prop="ghiam"
                label="File ghi âm"
                min-width="70"
              ></el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-card>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value6: '',
        value7: '',
        tableData: [
          {
            idcuocgoi: 'SBF0125',
            hcuocgoi: 'Gọi ra',
            sogoiden: '516518448',
            sonhancuocgoi: '098761350',
            ttcuocgoi: 'Thành công',
            batdau: '03/06/2018 10:30:41',
            ketthuc: '03/06/2018 10:50:05',
            ghiam: 'abc.mp3'
          },
          {
            idcuocgoi: 'SBF0125',
            hcuocgoi: 'Gọi ra',
            sogoiden: '516518448',
            sonhancuocgoi: '098761350',
            ttcuocgoi: 'Thành công',
            batdau: '03/06/2018 10:30:41',
            ketthuc: '03/06/2018 10:50:05',
            ghiam: 'abc.mp3'
          },
          {
            idcuocgoi: 'SBF0125',
            hcuocgoi: 'Gọi ra',
            sogoiden: '516518448',
            sonhancuocgoi: '098761350',
            ttcuocgoi: 'Thành công',
            batdau: '03/06/2018 10:30:41',
            ketthuc: '03/06/2018 10:50:05',
            ghiam: 'abc.mp3'
          },
          {
            idcuocgoi: 'SBF0125',
            hcuocgoi: 'Gọi ra',
            sogoiden: '516518448',
            sonhancuocgoi: '098761350',
            ttcuocgoi: 'Thành công',
            batdau: '03/06/2018 10:30:41',
            ketthuc: '03/06/2018 10:50:05',
            ghiam: 'abc.mp3'
          },
          {
            idcuocgoi: 'SBF0125',
            hcuocgoi: 'Gọi ra',
            sogoiden: '516518448',
            sonhancuocgoi: '098761350',
            ttcuocgoi: 'Thành công',
            batdau: '03/06/2018 10:30:41',
            ketthuc: '03/06/2018 10:50:05',
            ghiam: 'abc.mp3'
          },
          {
            idcuocgoi: 'SBF0125',
            hcuocgoi: 'Gọi ra',
            sogoiden: '516518448',
            sonhancuocgoi: '098761350',
            ttcuocgoi: 'Thành công',
            batdau: '03/06/2018 10:30:41',
            ketthuc: '03/06/2018 10:50:05',
            ghiam: 'abc.mp3'
          }
        ]
      }
    }
  }
</script>

<style>
  .el-card{
    padding: 0;
  }
  .table{
    margin-top: 1em;
    padding-bottom: 1em;
  }
  .report-table{
    padding-top: 0;
  }
</style>

