<template>
  <div>
    <h1>请求编辑器</h1>
    <br>
    <div class="m-5">
      <div>
        <el-input>
          <template #prepend>
            <el-select>
              <el-option value="GET" label="GET" />
              <el-option value="POST" label="POST" />
            </el-select>
          </template>
        </el-input>
      </div>
      <div>
        <el-tabs active-name="params">
          <el-tab-pane label="Params" name="params">
            <ParamForm ></ParamForm>
          </el-tab-pane>
          <el-tab-pane label="Authorization" name="authorization">
            Authorization
          </el-tab-pane>
          <el-tab-pane label="Headers" name="headers">
            Headers
          </el-tab-pane>
          <el-tab-pane label="Body" name="body">
            Body
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ParamForm from './ParamForm.vue'
</script>

<style scoped>

</style>
