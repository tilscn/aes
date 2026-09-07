<script setup>
import { UploadFilled } from '@element-plus/icons-vue'
import { ref } from 'vue'
import AES from './utils/aes.js'
import { ElMessage } from 'element-plus'

const secret = ref('')
const password = ref('')
const plain = ref('')
const upload = ref(null)

const onFileChange = (file) => {
  if (file.raw.type !== 'text/plain') {
    ElMessage.error('仅支持文本文件')
    return upload.value.clearFiles()
  }
  const reader = new FileReader()
  reader.onload = (e) => {
    secret.value = e.target.result
    decrypt()
  }
  reader.readAsText(file.raw)
}

const decrypt = () => {
  if (!secret.value) return
  const result = AES.decrypt(secret.value, password.value)
  plain.value = result
}

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    alert('已复制到剪贴板')
  })
}
</script>

<template>
  <div class="header">文本解密助手</div>
  <div class="wrap">
    <el-upload ref="upload" class="upload-demo" drag :auto-upload="false" :on-change="onFileChange"
      :disabled="!!secret">
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        将文件拖到这里，或 <em>点击选择</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          仅支持 <b>文本</b> 文件
        </div>
      </template>
    </el-upload>
    <el-input @input="decrypt" v-model="password" type="password" placeholder="请输入密码" show-password
      class="password-input" />
    <div style="margin-top: 16px">
      <el-input @click="copyToClipboard(plain)" v-model="plain" type="textarea"  :autosize="{ minRows: 8 }" readonly />
    </div>
  </div>
</template>

<style scoped>
.password-input {
  width: 240px;
  margin-top: 16px;
}

.wrap {
  width: 80%;
  margin: 0 auto;
}

.header {
  margin-top: 32px;
  color: #409EFF;
  font-size: 20px;
  text-align: center;
  height: 64px;
  line-height: 64px;
}
</style>
