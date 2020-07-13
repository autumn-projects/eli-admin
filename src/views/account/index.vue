<template>
  <div class="app-container">
    <el-table
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="类型" class-name="status-col">
        <template slot-scope="scope">
          <el-tag type="success">{{ getAccountDiscribe(scope.row.type) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="用户名" prop="id" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="密码" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.password }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            {{ $t('table.edit') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="修改" :visible.sync="dialogUpdateVisible">
      <el-form ref="dataForm" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="用户名" prop="timestamp">
          <el-input v-model="dialogInfo.username" />
        </el-form-item>
        <el-form-item label="密码" prop="timestamp">
          <el-input v-model="dialogInfo.password" />
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
import { getAccountList, updateAccount } from '@/api/account'

export default {
  data() {
    return {
      list: null,
      dialogUpdateVisible: false,
      dialogInfo: {
        type: '',
        username: '',
        password: ''
      }
    }
  },
  created() {
    this.getAccountList()
  },
  methods: {
    getAccountList() {
      getAccountList().then(response => {
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
      this.dialogInfo = row
      this.dialogUpdateVisible = true
    },
    updateData() {
      var rq = {}
      rq.type = this.dialogInfo.type
      rq.username = this.dialogInfo.username
      rq.password = this.dialogInfo.password
      updateAccount(rq).then(response => {
        this.dialogUpdateVisible = false
        if (response.code === 1) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.getAccountList()
        }
      })
    }
  }
}
</script>
