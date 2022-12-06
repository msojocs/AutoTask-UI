<template>
  <el-container class="layout">
    <div style="background-color:#545c64" class="sidebar-container">
      <SideBar />
    </div>

    <el-container>
      <el-header style="padding: 0;" :height="'100px'">
        <Header />
        <Tab />
      </el-header>

      <!-- 路由出口 -->
      <el-main>
        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view v-if="!$route.meta.isKeepAlive" v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
        <router-view v-if="$route.meta.isKeepAlive" v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
import Tab from './components/Tab.vue'
import SideBar from './components/SideBar.vue'
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setups

onActivated(() => {

})
onDeactivated(() => {

})
</script>

<style scoped>
.layout {
  /* display: flex; */
  height: 100vh;
}

.right-area {
  width: 100%;
}

.navbar {
  background-color: #fffefe;
  width: 100%;
  height: 50px;
  display: flex;
  box-shadow: #eee 0px 4px 5px;
  align-items: center;
  z-index: 5;
}

.router-v {
  padding: 1rem;
}

.sidebar-container{
  transition: width .28s;
}

</style>
