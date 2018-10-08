<template>
    <div class="search">
       <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="关键字">
            <el-input v-model="formInline.user" placeholder="请输入商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-select v-model="formInline.region" placeholder="请选择分类">
              
              <el-option :label="item" :value="item" v-for="item in classdata"></el-option>

            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import Vue from 'vue';
    import ElementUI from 'element-ui';
    Vue.use(ElementUI);

    export default {
        
        data(){
            return {
              formInline: {
                user: '',
                region: []
              },
              classdata:[]
            }
        },
        created(){
          //分类
          this.$axios.post('/api/goodsclass').then(res=>{
              
              res.data.map(item=>{
                this.classdata.push(item.name);
              })
              
              // console.log(this.classdata);
            })
        },
        methods:{
          onSubmit() {
            // console.log(this.formInline.region,this.formInline.user);
            let a={
              name:this.formInline.user,
              search:this.formInline.region
            }
            this.$emit('sq',a)
          }
        }
    }
</script>
<style scoped>
    
</style>