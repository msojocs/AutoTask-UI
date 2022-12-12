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
        <el-tabs active-name="body">
          <el-tab-pane label="Params" name="params">
            <ParamForm />
          </el-tab-pane>
          <el-tab-pane label="Authorization" name="authorization">
            <AuthForm />
          </el-tab-pane>
          <el-tab-pane label="Headers" name="headers">
            <HeaderForm />
          </el-tab-pane>
          <el-tab-pane label="Body" name="body">
            <BodyForm />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AuthForm from './AuthForm.vue'
import BodyForm from './BodyForm.vue'
import HeaderForm from './HeaderForm.vue'
import ParamForm from './ParamForm.vue'
</script>

<style scoped>

</style>
