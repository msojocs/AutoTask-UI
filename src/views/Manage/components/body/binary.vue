<template>
  <div class="binary-form">
    <!-- <h2>binary</h2> -->
    <div class="select-binary">
      <label class="text" for="binary_file">Selecte file</label>
      <input id="binary_file" type="file" style="opacity: 0;">
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="less" scoped>
.binary-form{
  margin: 10px;
  .select-binary{
    .text{
      color: #808080;
      border-radius: 4px;
      background-color: #eeeeee99;
      padding: 2px 10px;
      cursor: pointer;
      &:hover {
        color: #000;
        background-color: #e0e0e0;
      }
    }
  }
}
</style>
