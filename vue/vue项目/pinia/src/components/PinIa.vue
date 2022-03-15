<template>
  <el-form ref="formRef" :model="dynamicValidateForm" label-width="120px" class="demo-dynamic">
    <el-form-item
      v-for="(domain, index) in dynamicValidateForm.domains"
      :key="domain.key"
      :label="'Domain' + index"
      :prop="'domains.' + index + '.value'"
      :rules="{
        required: true,
        message: 'domain can not be null',
        trigger: 'blur',
      }"
    >
      <el-input v-model="domain.value"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(formRef)">Submit</el-button>
      <el-button @click="resetForm(formRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { onActivated, onDeactivated, reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'
import { useUserStore } from '../stores/PinIa'
type FormInstance = InstanceType<typeof ElForm>
const formRef = ref<FormInstance>()
const dynamicValidateForm = reactive<{
  domains: DomainItem[]
}>({
  domains: [{
    key: 1,
    value: '',
  },
  {
    key: 2,
    value: '',
  }]
})

interface DomainItem {
  key: number
  value: string
}
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
const userInfo = useUserStore()
console.log(userInfo);

onActivated(() => {
  console.log('我是 keep-alive 存在的2')
})
onDeactivated(() => {
  console.log('离开触发我是 keep-alive 存在的2')
})
</script>
