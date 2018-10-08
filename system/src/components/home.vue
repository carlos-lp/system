<template>

  <el-container>

    <el-header style="height:100px;" class="head">
      <h1>后台管理系统</h1>
      <div class="head_r">
        <p>欢迎登陆我们的系统<span @click="out" class="out">退出</span></p>
      </div>
    </el-header>

    <el-container>

      <el-aside style="width:201px;">
        <el-collapse v-model="activeName" accordion class="nav">
          
          <el-collapse-item title="商品管理" name="2" class="item">
           <div class="iteml">
            
             <button class="btn" @click="togoodslist">商品分类</button>
            
           </div>
           <div class="iteml">
            
             <button class="btn" @click="toclassify">商品列表</button>
            </div>
          </el-collapse-item>
          <el-collapse-item title="用户管理" name="3" class="item">
           <div class="iteml"  @click="tousers">管理用户</div>
           <div class="iteml"  @click="tochangepsd">修改密码</div>
           <div class="iteml"  @click="tochangemsg">修改资料</div>
          </el-collapse-item>
          
        </el-collapse>
      </el-aside>


      <el-main>
        <router-view /> 
        
      </el-main>

    </el-container>

  </el-container>

</template>

<script>
    import Vue from 'vue';
    import ElementUI from 'element-ui';
    Vue.use(ElementUI);
     // 单独引入样式
    import 'element-ui/lib/theme-chalk/index.css';
    import '@/sass/base.scss';
    import axios from 'axios';
    Vue.use(axios);
    Vue.prototype.$axios = axios;
    

    export default {
      name: 'App',
      data(){
          return {
            activeName: '1'
          }
      },
      components:{
        
      },
      methods:{
        out(){
          var newcommit = { usn:'' , psd:'' }
          sessionStorage.setItem('token',JSON.stringify(newcommit));
          this.$router.push({name:'login',params:{usn:'',psd:''}})
        },
        tochangemsg(){
          //跳转到修改信息路由   
          //向其他子路由传递数据,跳转页面
          this.$router.push({name:'changeMsg',params:{result:this.status}})


        },
        tochangepsd(){
          //跳转到修改密码路由
          this.$router.push({name:'changePsd',params:{result:this.status}})
        },
        togoodslist(){
          this.$router.push({name:'goodslist',params:{result:this.status}})
        },
        toclassify(){
          this.$router.push({name:'classify',params:{result:this.status}})
        },
        tousers(){
          this.$router.push({name:'users',params:{result:this.status}})
        }
        
      },
      created(){
        this.$axios.post('/api/login',{username:JSON.parse(sessionStorage.token).usn,password:JSON.parse(sessionStorage.token).psd}).then((res)=>{
            this.status = res.data
          })
      }
    };


</script>

<style lang="scss">

  .head{
    border-bottom:1px solid #ccc;
    h1{
      float:left;
      padding:0;
      margin:0;
      line-height:100px;
    }
  }
  
  .head_r{
    float:right;
    margin-top:45px;

    p{
      span{
        color:#169BD5;
        margin-left:100px;

      }
    }
  }
  .nav{
    border-right:1px solid #ebeef5;
    height:600px;
    width:200px;
    overflow:hidden;
    .item{
      text-align:center;
      div{
      
      }
      div.iteml{
        margin-bottom:10px;
        margin-top:5px;
        cursor: pointer;
      }
    }
  }
  .el-collapse-item__content{
    padding-bottom:5px;
  }
  
  .btn{
    border: 0 none;
    background-color: #fff;
    cursor: pointer;
  }
  .out{
    cursor: pointer;
  }
</style>
