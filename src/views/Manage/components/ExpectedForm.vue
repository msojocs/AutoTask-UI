<template>
  <div>
    <el-button type="primary" @click="addExpectedData">
      <el-icon>
        <Plus />
      </el-icon>
      添加
    </el-button>
    <el-collapse accordion class="expected-list">
      <template v-for="(item, index) in expectedData" :key="index">
        <el-collapse-item :name="index">
          <template #title>
            {{ item.name }}
            <el-switch v-model="item.enable" />
          </template>
          <div class="line">
            <div class="label">
              <span>断言名称</span>
            </div>
            <div class="data">
              <el-input v-model="item.name" />
            </div>
          </div>
          <div class="line">
            <div class="label">
              <span>断言对象</span>
            </div>
            <div class="data">
              <el-select v-model="item.target">
                <el-option value="textBody" label="Response Text" />
                <el-option value="jsonBody" label="Response JSON" />
                <!-- <el-option value="xmlBody" label="Response XML" /> -->
                <el-option value="header" label="Response Header" />
                <el-option value="status" label="Response Status" />
                <!-- <el-option value="cookie" label="Response Cookie" /> -->
              </el-select>
            </div>
          </div>
          <div v-if="pathMap[item.target]" class="line">
            <div class="label">
              <span>{{ pathMap[item.target].text }}</span>
            </div>
            <div class="data">
              <el-input v-model="item.path" />
            </div>
          </div>
          <div class="line">
            <div class="label">
              <span>断言</span>
            </div>
            <div class="data">
              <el-select
                v-model="item.exp"
                :class="{
                  'check-type': !item.exp.includes('empty') && !item.exp.includes('exist'),
                }"
              >
                <el-option value="=" label="等于" />
                <el-option value="!=" label="不等于" />
                <el-option value="<" label="小于" />
                <el-option value="<=" label="小于或等于" />
                <el-option value=">" label="大于" />
                <el-option value=">=" label="大于或等于" />
                <el-option value="regex" label="正则匹配" />
                <el-option value="contains" label="包含" />
                <el-option value="!contains" label="不包含" />
                <el-option value="exist" label="存在" />
                <el-option value="!exist" label="不存在" />
                <el-option value="empty" label="为空" />
                <el-option value="!empty" label="不为空" />
              </el-select>
              <el-input v-if="!item.exp.includes('empty') && !item.exp.includes('exist')" v-model="item.value" class="check-value" />
            </div>
          </div>
        </el-collapse-item>
      </template>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import type { ExpectedType } from './types'

const props = defineProps<{
  expected?: ExpectedType[]
}>()

const emits = defineEmits(['update:expected'])

const expectedData = computed<ExpectedType[]>({
  get () {
    if (props.expected === undefined) {
      const v: ExpectedType[] = []
      emits('update:expected', v)
      return v
    }
    return props.expected
  },
  set(v: ExpectedType[]) {
    emits('update:expected', v)
  },
})

const pathMap: any = {
  jsonBody: {
    text: 'JSONPath 表达式',
  },
  header: {
    text: 'Header 名',
  },
}

const addExpectedData = () => {
  expectedData.value.push({
    name: '',
    enable: false,
    target: '',
    value: '',
    exp: '',
  })
}
</script>

<style lang="less">
.expected-list {
  .line {
    display: flex;
    width: 100%;
    >.label {
      width: 40%;
      display: flex;
      justify-content: right;
      padding: 10px;
      align-items: center;
    }
    >.data {
      display: flex;
      align-items: center;
      width: 50%;
      >.check-value {
        --el-input-border-radius: 0px 4px 4px 0px;
      }
      >.check-type{
        .el-input__wrapper {
          --el-input-border-radius: 4px 0px 0px 4px;
        }
      }
    }
  }
}
</style>
