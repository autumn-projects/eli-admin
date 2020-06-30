<template>
  <div class="app-container">
    <el-table
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="编号" prop="id" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" class-name="status-col">
        <template slot-scope="scope">
          <el-tag type="success">{{ getAccountDiscribe(scope.row.type) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="CPU" prop="cpu" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cpuId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="MAC" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.macAddress }}</span>
        </template>
      </el-table-column>
      <el-table-column label="DISKID" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.diskId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          <span>{{ strToDate(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center">
        <template slot-scope="scope">
          <span>{{ strToDate(scope.row.endTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            {{ $t('table.edit') }}
          </el-button>
          <el-button type="danger" size="mini" @click="deleteData(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="修改" :visible.sync="dialogUpdateVisible">
      <el-form ref="dataForm" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="编号" prop="userId">
          <el-input v-model="dialogInfo.userId" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="dialogInfo.remark" />
        </el-form-item>
        <el-form-item label="结束时间" prop="endDate">
          <el-date-picker v-model="dialogInfo.endDate" type="datetime" placeholder="Please pick a date" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateData()">
          {{ $t('table.confirm') }}
        </el-button>
        <el-button @click="dialogUpdateVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, updateSysUser, deleteUser } from '@/api/user'

export default {
  data() {
    return {
      list: null,
      dialogUpdateVisible: false,
      dialogInfo: {
        userId: '',
        remark: '',
        endDate: ''
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    getUserList() {
      getUserList().then(response => {
        this.list = response.data
        console.log(response)
      })
    },
    getAccountDiscribe(type) {
      if (type === 1) return '大众'
      if (type === 2) return '奥迪'
      if (type === 3) return '斯柯达'
    },
    handleUpdate(row) {
      this.dialogInfo.userId = row.id
      this.dialogInfo.remark = row.remark
      this.dialogInfo.endDate = row.endTime
      this.dialogUpdateVisible = true
    },
    updateData() {
      this.dialogInfo.endDate = this.dateFtt('yyyy-MM-dd hh:mm:ss', new Date(this.dialogInfo.endDate))
      updateSysUser(this.dialogInfo).then(response => {
        this.dialogUpdateVisible = false
        if (response.code === 1) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.getUserList()
        }
      })
    },
    deleteData(row) {
      deleteUser(row.id).then(response => {
        if (response.code === 1) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.getUserList()
        }
      })
    },
    strToDate(date) {
      if (date === null) {
        return null
      } else {
        return this.dateFtt('yyyy-MM-dd hh:mm:ss', new Date(date))
      }
    },
    dateFtt(fmt, date) {
      var o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S': date.getMilliseconds()
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
      return fmt
    }
  }
}
</script>
