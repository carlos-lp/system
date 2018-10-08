<template>
    <div class="bread">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item >主页</el-breadcrumb-item>
          <el-breadcrumb-item>商品管理</el-breadcrumb-item>
          <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<script>
    import Vue from 'vue';
    import ElementUI from 'element-ui';
    Vue.use(ElementUI);

    export default {
        
        data(){
            return {
                
            }
        },

        methods:{
        }
    }
</script>
<style scoped>
    
</style>