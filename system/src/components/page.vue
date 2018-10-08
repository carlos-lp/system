<template>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.currentPage"
        :page-sizes="[10, 15, 20, 25]"
        
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.len">
      </el-pagination>
  </div>
</template>
<script>
    import Vue from 'vue';
    import ElementUI from 'element-ui';
    Vue.use(ElementUI);

    export default {
        props:['len'],
        data(){
            return {
              currentPage: 1,
              pageto:{
                n:10,
                c:1
              },
              total:this.len
            }
        },

        methods:{

          handleSizeChange(val) {
            // console.log(this.len)
            // console.log(`每页 ${val} 条`);
            this.pageto.n=val
            this.$emit('pc',this.pageto)
          },
          handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.pageto.c=val;
            this.currentPage=val;
            // console.log(this.pageto.c);
            this.$emit('pc',this.pageto)
          },
          }
        
    }
</script>
<style scoped>
    
</style>