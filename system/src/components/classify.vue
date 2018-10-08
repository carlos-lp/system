<template>
    <div class="classify">
        <div class="bread">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item >主页</el-breadcrumb-item>
              <el-breadcrumb-item>商品管理</el-breadcrumb-item>
              <el-breadcrumb-item>商品分类</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <button class="btn" @click="show=!show">添加分类</button>
        <div v-show="show" class="add">
          <!-- ID:<input type="text" v-model="contentId" /> -->
        分类名:<input type="text" v-model="contentName" />
        <!-- <button @click="sure">确认添加</button> -->
        
          <el-button type="text" @click="open">确认添加</el-button>
        
        </div>
        
        <template>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="" width="180">
              <template slot-scope="scope">
                
                <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
                
              </template>
            </el-table-column>

            <el-table-column label="ID" width="180" >
              <template slot-scope="scope" >
               
                  
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.id }}</el-tag>
                  </div>
                
              </template>
            </el-table-column>

            <el-table-column label="分类名" width="180">
              <template slot-scope="scope">
                <el-popover placement="top">
                  
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.name }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button :plain="true" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>

                <!-- 弹出提示框 -->
                 <!-- <el-button :plain="true" @click="openVn">删除</el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </template>
    </div>
</template>
<script>
    import Vue from 'vue';
    import ElementUI from 'element-ui';
    Vue.use(ElementUI);

    export default {
        
        data(){
            return {
              tableData: [],
              contentId:'',
              contentName:'',
              show:false,
              sorts:true
            }
            
        },
        created(){
          this.$axios.post('/api/goodsclass').then(res=>{
              this.tableData = res.data;
              console.log(this.tableData);
              this.tableData.sort(function(id1,id2){
                var a=id1.id;
                var b=id2.id;
                return a-b
              })
            }
              
          );
          this.$axios.post('/api/login',{username:JSON.parse(sessionStorage.token).usn,password:JSON.parse(sessionStorage.token).psd}).then((res)=>{
            this.status = res.data
          })
        },
        methods:{
            handleEdit(index, row) {
              // console.log(index, row);
            },
            handleDelete(index, row) {
              this.$message('删除成功');
              this.tableData.splice(index,1);
              // console.log(row);
              this.$axios.post('/api/delclass',{delclass:row.name}).then(res=>{
                  // this.tableData = res.data;
                  

                });
            },

            //弹出框
            open() {
              this.$alert('添加成功', '', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$axios.post('/api/addclass',{goodsclass:this.contentName}).then(res=>{
                      this.tableData = res.data
                    });
                  
                }
              });
            },
             openVn() {
              this.$message('这是一条消息提示');
            }

        }
    }
</script>
<style scoped lang="scss">
    .btn{
      background-color: #58bc58;
      border:0 none;
      border-radius: 5px;
      padding:8px 15px;
      color:#fff;
      margin-top: 20px;
      cursor: pointer;
    }
    .add{
      margin-top:10px;
    }
    input{
      width:100px;
      height:20px;
      border-radius: 3px;
      border:1px solid #ccc;
      margin-left: 8px;
    }
    .add input:nth-child(1){
      width:100px;
     
    }
    .add input:nth-child(2){
      width:200px;
    }
    .add button{
      width:100px;
      height:25px;
      border:1px solid #fff;
      background-color: #58bc58;
      color:#fff;
      border-radius: 3px;
      vertical-align: bottom;
    }
    .el-button--text{
      

      padding:0;
      
    }
</style>