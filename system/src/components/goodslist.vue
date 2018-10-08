<template>
    <div class="classify">

      <search @sq="search"></search>

      <button class="btn" @click="cut">删除</button>

      <button class="btn" @click="show=!show">添加</button>
      <div v-show="show" class="add">
        <!-- 分类:<input type="option" v-model="contentName" /> -->

        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="商品分类">
            <el-select v-model="formInline.region" placeholder="请选择分类">
              <el-option :label="item" :value="item" v-for="item in classdata"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <label class="label">商品名称:<input type="text" v-model="name" class="two" /></label>
        <label class="label">价格:<input type="number" v-model="price"></label>
        <!-- <button @click="sure">确认添加</button> -->
        <el-button type="text" @click="open">确认添加</el-button>
      </div>

      
      <div class="list">
        <table class="table">
          <thead>
            <tr>
              <th class="number"><input type="checkbox" v-model="checkAll"></th>
              <th @click="sortid" class="sortid">ID</th>
              <th>商品分类</th>
              <th class="name">商品名称</th>
              <th>价格</th>
              <th @click="sorttime" class="sortid">上传时间</th>
              <th>发布状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(goods,idx) in goodslist" @click="checkRow(goods.id)">
              <td><input type="checkbox" :value="goods.id" v-model="checks"></td>
              <td>{{goods.id}}</td>
              <td>{{goods.search}}</td>
              <td>{{goods.name}}</td>
              <td>￥{{goods.price}}</td>
              <td>{{goods.time |formatDate}}</td>
              <td class="state"><span>{{goods.publish}}</span></td>
              <td>
                <button class="change">编辑</button>
                <button class="del" @click="remove(goods,idx)">删除</button>
              </td>

            </tr>
          </tbody>
        </table>
      </div>
      
      
      <page v-bind:len="this.len" @pc="pagechange"></page>
    </div>
</template>
<script>
    import Vue from 'vue';
    import ElementUI from 'element-ui';
    Vue.use(ElementUI);
    import Router from 'vue-router';
    import Search from '@/components/search';
    import Page from '@/components/page'
    export default {
        
        data(){
            return {
                goodslist:[],//商品数据
                checks:[],
                contentId:'',
                contentName:'',
                name:'',
                price:'',
                show:false,
                sorts:true,
                sorttimes:true,
                formInline: {
                  region: []
                },
                classdata:[],
                allgoods:[],
                len:0,
                pages:{
                  currentpage:1,
                  pagesize:10
                }
            }
        },
        created(){
          this.$axios.post('/api/goodslist').then(res=>{
              let data = res.data;
              // console.log(data);

              //判断是否已发布
              this.goodslist=data.map(item=>{
                if(item.publish==="true"){
                  item.publish='已发布'
                }else if(item.publish==="false"){
                  item.publish='待修改'
                }
                return item
              });
              //先升序排序 再渲染到页面上
              this.goodslist.sort(function(id1,id2){
                var a=id1.id;
                var b=id2.id;
                return a-b
              });

              // this.allgoods=this.goodslist;//pages是排序好的数据
              for(var i=0;i<this.goodslist.length;i++){
                this.allgoods.push(this.goodslist[i])
              }
              this.len=this.allgoods.length;
              this.goodslist=this.goodslist.splice(0,10);
            }
          );

          //获取添加时商品的分类
          this.$axios.post('/api/goodsclass').then(res=>{
              res.data.map(item=>{
                this.classdata.push(item.name);
              })
            });
          this.$axios.post('/api/login',{username:JSON.parse(sessionStorage.token).usn,password:JSON.parse(sessionStorage.token).psd}).then((res)=>{
            this.status = res.data
          })

        },

        components:{
          search:Search,
          page:Page
        },
        computed:{
          checkAll:{
            get(){
              return this.goodslist.every(item=>this.checks.indexOf(item.id)>=0);
            },

            set(val){
              if(val){
                this.checks = this.goodslist.map(item=>item.id);
                
              }else{
                this.checks = []
              }
            }
          },

        },
        methods:{
          //查询
          search(val){
            console.log(val);
            // this.goodslist=[]
            this.$axios.post('/api/goodsearch',{val:val}).then(
                 res=>{
                  console.log(res.data);
                  this.goodslist=[];
                  
                  if(res.data!='error'){
                    
                    for(var i=0;i<res.data.length;i++){
                      this.goodslist.push(res.data[i])
                    }
                    this.len=this.goodslist.length;
                    this.goodslist= this.goodslist.splice(0,10)
                    //判断是否已发布
                    this.goodslist=this.goodslist.map(item=>{
                      if(item.publish==="true"){
                        item.publish='已发布'
                      }else if(item.publish==="false"){
                        item.publish='待修改'
                      }
                      return item
                    });
                  }else{
                    alert("未查询到相关信息")
                  }
                 }
                )

          },
          //分页
          pagechange(val){
            console.log(val.c,val.n);
            this.pages.currentpage=val.c;
            this.pages.pagesize=val.n;
            this.goodslist=[];
            // this.goodslist=this.allgoods;
            for(var i=0;i<this.allgoods.length;i++){
                this.goodslist.push(this.allgoods[i])
              }
            // this.goodslist= this.goodslist.splice((val.c-1)*val.n,val.n);

            if(val.c!=Math.ceil(this.len/val.n)){
                this.goodslist= this.goodslist.splice((val.c-1)*val.n,val.n)
              }else{
                this.goodslist = this.goodslist.splice((val.c-1)*val.n,this.len-(val.c-1)*val.n);
              }
          },

          //删除单个商品
          remove(goods,idx){
            this.$message('删除成功');
            this.goodslist.splice(idx,1);
            console.log(goods.id)
            this.$axios.post('/api/delgoods',{id:[goods.id]}).then(res=>{
                  console.log(res.data)
                });
          },

          //当前行是否被勾选
          checkRow(id){
            let idx = this.checks.indexOf(id);
            if(idx>=0){
              this.checks.splice(idx,1);

            }else{
              this.checks.push(id);
            }
          },

          //添加商品
          open() {
            
              this.$alert('添加成功', '', {
                confirmButtonText: '确定',
                callback: action => {
                  if(this.formInline.region!=''&&this.name!=''&&this.price!=''){
                      var date=new Date();
                      var year = date.getFullYear();
                      var month = date.getMonth() + 1;
                      var day = date.getDate();
                      if (month < 10) {
                          month = "0" + month;
                      }
                      if (day < 10) {
                          day = "0" + day;
                      }
                      var nowdate = year + "-" + month + "-" + day;
                      let goods={
                          search:this.formInline.region,
                          name:this.name,
                          price:this.price,
                          publish:"false",
                          nowtime:nowdate
                      };

                      this.$axios.post('/api/addgoods',{addgoods:goods}).then(
                         res=>{
                          
                          
                          this.goodslist=res.data;
                          // console.log(res.data);
                          // for(var i=0;i<res.data.length;i++){
                          //   this.goodslist.push(res.data[i])
                          // }
                          this.goodslist=this.goodslist.map(item=>{
                            if(item.publish==="true"){
                              item.publish='已发布'
                            }else if(item.publish==="false"){
                              item.publish='待修改'
                            }
                            return item
                          });

                          //先升序排序 再渲染到页面上
                          this.goodslist.sort(function(id1,id2){
                            var a=id1.id;
                            var b=id2.id;
                            return a-b
                          });

                          // this.allgoods=this.goodslist;//allgoods是排序好的数据
                          for(var i=0;i<this.goodslist.length;i++){
                            this.allgoods.push(this.goodslist[i])
                          }
                          this.goodslist=this.goodslist.splice(0,10);

                         }
                        )
                      
                      
                    }
                  
                }
              });
            },
          
          //删除多个商品
          cut(){
            // console.log(this.checks.toString());
            this.$axios.post('/api/delgoods',{id:(this.checks)}).then(res=>{
              console.log(res.data);
              // goodslist=res.data;
            })
          },

          //排序
          sortid(){
            if(this.sorts==true){
              // console.log(this.goodslist);
              // this.goodslist=this.allgoods;
              
              this.allgoods.sort(function(id1,id2){
                var a=id1.id;
                var b=id2.id;
                return b-a
              });
              this.goodslist=[];
              for(var i=0;i<this.allgoods.length;i++){
                this.goodslist.push(this.allgoods[i])
              }
              // this.pages.currentpage=val.c;
              // this.pages.pagesize=val.n;
              // this.goodslist = this.goodslist.splice(this.pages.currentpage*this.pages.pagesize,10);
              if(this.pages.currentpage!=Math.ceil(this.len/this.pages.pagesize)){
                this.goodslist = this.goodslist.splice((this.pages.currentpage-1)*this.pages.pagesize,10);
              }else{
                this.goodslist = this.goodslist.splice((this.pages.currentpage-1)*this.pages.pagesize,this.len-(this.pages.currentpage-1)*this.pages.pagesize);
              }
              this.sorts=!this.sorts;
            }else if(this.sorts==false){
              // console.log(this.goodslist);
              // this.goodslist=this.allgoods;
              
              this.allgoods.sort(function(id1,id2){
                var a=id1.id;
                var b=id2.id;
                return a-b
              });
              this.goodslist=[];
              for(var i=0;i<this.allgoods.length;i++){
                this.goodslist.push(this.allgoods[i])
              }
              // this.goodslist = this.goodslist.splice(this.pages.currentpage*this.pages.pagesize,10);
              if(this.pages.currentpage!=Math.ceil(this.len/this.pages.pagesize)){
                this.goodslist = this.goodslist.splice((this.pages.currentpage-1)*this.pages.pagesize,10);
              }else{
                this.goodslist = this.goodslist.splice((this.pages.currentpage-1)*this.pages.pagesize,this.len-(this.pages.currentpage-1)*this.pages.pagesize);
              }
              this.sorts=!this.sorts;
            }

          },
          sorttime(){
            if(this.sorttimes==true){
              // console.log(this.goodslist);
              // this.goodslist=this.allgoods;
              
              this.allgoods.sort(function(time1,time2){
                var a=Date.parse(time1.time);
                var b=Date.parse(time2.time);
                return b-a
              });
              this.goodslist=[];
              for(var i=0;i<this.allgoods.length;i++){
                this.goodslist.push(this.allgoods[i])
              }
              // this.pages.currentpage=val.c;
              // this.pages.pagesize=val.n;
              //判断是否为最后一页
              if(this.pages.currentpage!=Math.ceil(this.len/this.pages.pagesize)){
                this.goodslist = this.goodslist.splice((this.pages.currentpage-1)*this.pages.pagesize,10);
              }else{
                this.goodslist = this.goodslist.splice((this.pages.currentpage-1)*this.pages.pagesize,this.len%(this.pages.currentpage - 1));
              }
              
              
              this.sorttimes=!this.sorttimes;
            }else if(this.sorttimes==false){
              // console.log(this.goodslist);
              // this.goodslist=this.allgoods;
              
              this.allgoods.sort(function(time1,time2){
                var a=Date.parse(time1.time);
                var b=Date.parse(time2.time);
                return a-b
              });
              this.goodslist=[];
              for(var i=0;i<this.allgoods.length;i++){
                this.goodslist.push(this.allgoods[i])
              }
              if(this.pages.currentpage!=Math.ceil(this.len/this.pages.pagesize)){
                this.goodslist = this.goodslist.splice((this.pages.currentpage-1)*this.pages.pagesize,10);
              }else{
                this.goodslist = this.goodslist.splice((this.pages.currentpage-1)*this.pages.pagesize,this.len%(this.pages.currentpage-1));
              }
              this.sorttimes=!this.sorttimes;
            }
          }
            
        }
    }
    //时间格式化
    Vue.filter('formatDate', function (value) {
      let date = new Date(value);
      return date.toLocaleDateString();
    });
</script>
<style scoped lang="scss">
    .checked{
      background-color: #eee;
    }
    .btn{
      background-color: #58bc58;
      border:0 none;
      border-radius: 5px;
      padding:8px 15px;
      color:#fff;
      cursor: pointer;
      margin-bottom: 20px;
    }
    .table{
        border-collapse: collapse;
        cellspacing:0;
        margin-bottom:10px;
        font-size: 14px;
        thead{
          background-color: #eee;
          th{
            border:1px solid #ccc;
            font-weight: normal;
            width:150px;
            height:35px;
          }
          th.number{
            width: 50px;
          }
          th.name{
            width:200px;
          }
        }
        tbody{
          tr{
            td{
              border:1px solid #ccc;
              height:35px;
              text-align:center;
              .change{
                background-color: #fff;
                border: 1px solid #ccc;
                color:#666;
                border-radius:2px;
                padding:3px 5px;
              }
              .del{
                background-color: #f56c6c;
                border: 1px solid #f56c6c;
                border: 0 none;
                color:#fff;
                border-radius:2px;
                padding:3px 5px;
              }
            }
            td.state{
              span{
                background-color: #58bc58;
                color:#fff;
                border-radius: 2px;
                padding:2px 5px;
              }
            }
            
          }
        }
    }
    .add{

      input{
        width:100px;
        border-radius: 5px;
        border:1px solid #ccc;
        margin-left: 8px;
        height:36px;
      }
      input.two{
        width:200px;
      }
      button{
        width:80px;
        height:40px;
        border:1px solid #fff;
        background-color: #58bc58;
        color:#fff;
        border-radius: 3px;
        height:40px;
      }
    }


    .el-form{
      display:inline-block;
      margin:10px;
    }
    .el-form-item{
      margin:0;
      margin-top:-7px;
    }
    .label{
      height:40px;
      display:inline-block;
      text-align:center;
      line-height: 40px;
      vertical:bottom;
      
    }
    .sortid{
      cursor: pointer;
    }
</style>