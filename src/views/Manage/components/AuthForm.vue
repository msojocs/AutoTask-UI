<template>
  <div class="auth-form">
    <!-- 左边 -->
    <div class="type">
      <!-- 类型 -->
      <el-scrollbar>
        <div class="select">
          <span>Type</span>
          <el-select v-model="authType">
            <el-option label="Inherit auth from parent" value="inherit" />
            <el-option label="No Auth" value="noauth" />
            <el-option label="API Key" value="api" />
            <el-option label="Bearer Token" value="bearer" />
          </el-select>
        </div>
        <div class="desc">
          {{ description[authType] || '' }}
        </div>
      </el-scrollbar>
    </div>
    <!-- 右边 -->
    <div class="config">
      <!-- 选项 -->
      <el-scrollbar>
        配置
        <br>
        <br>
        <br>
        配置
        <br>
        <br>
        <br>
        配置
        <br>
        <br>
        <br>
        配置
        <br>
        <br>
        <br>
        配置
        <br>
        <br>
        <br>
        配置
        <br>
        <br>
        <br>
        配置
        <br>
        <br>
        <br>
        配置
        <br>
        <br>
        <br>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">

const authType = ref('noauth')
const description: Record<string, string> = {
  noauth: '不使用认证',
}
</script>

<style lang="less" scoped>
.auth-form {
  display: flex;
  width: 100%;
  height: 300px;
  >*{
    padding: 10px;
    border-top: 1px solid #eee;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    // overflow-y: scroll;
  }
  >.type {
    border-left: 1px solid #eee;
    width: 30%;
    .select {
      display: flex;
      >*{
        width: 50%
      }
    }
    .desc {
      margin-top: 10px;
      font-size: small;
      color: gray;
    }
  }
  >.config {
    width: 70%;
  }

}
</style>
