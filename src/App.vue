<template>
  <n-config-provider :theme-overrides="themeOverrides">
  <n-layout>
    <n-layout-header class="mb-5">
      AppVue <MenuHeader />
    </n-layout-header>
  </n-layout>
  <n-space justify="center">
    <n-layout has-sider>
      <n-layout-sider>
        <MenuSidebar />
      </n-layout-sider>
      <n-layout>
        <n-layout-header>Titulo</n-layout-header>
        <n-layout-content class="p-2">
          <router-view></router-view>
        </n-layout-content>
        <n-layout-footer>
          Pie de página
        </n-layout-footer>
        
      </n-layout>
    </n-layout>
  </n-space>
</n-config-provider>
</template>

<script>
  import MenuSidebar from "@/components/MenuSidebar.vue"
  import MenuHeader from "@/components/MenuHeader.vue"
  import { NConfigProvider } from 'naive-ui'

  export default {
    components:{
      MenuSidebar,
      MenuHeader,
      NConfigProvider
    },
    data(){
      return {
        themeOverrides: {
          common: {
            
          },
          Table: {
            tdColor:"#aaa"
          }
        }
      }
      
    }
  }
 
</script>

<style scoped>
.n-layout-header,
.n-layout-footer {
  background: rgba(128, 128, 128, 0.2);
  padding: 24px;
}

.n-layout-sider {
  background: rgba(128, 128, 128, 0.3);
}

.n-layout-content {
  background: rgba(128, 128, 128, 0.4);
}

</style>