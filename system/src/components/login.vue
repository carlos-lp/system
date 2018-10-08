<template>
	<div id="login">
		<div class="container">
			<img src=""/><br />
			<h1>用户管理系统</h1>

			<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
			  
			  <el-form-item label="用户名" prop="name">
			    <el-input type="text" v-model="ruleForm2.name" autocomplete="off"></el-input>
			  </el-form-item>
			  
			 <el-form-item label="密码" prop="pass">
			    <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
			  </el-form-item>
			  <el-checkbox v-model="checked" class="choose">记住密码</el-checkbox>
			  <a href="" class="forgetps">忘记密码</a>
			  <br /><br /><br />
<!--			  <el-button :plain="true" @click="open1"></el-button>-->
			  <el-form-item>
			    <el-button type="primary" @click="submit()">登陆</el-button>
			    <el-button @click=clear()>重置</el-button>
			  </el-form-item>
			</el-form>
		</div>
	</div>
	
</template>

<script>
  export default {
    data() {
	  var username = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        }else{
        	callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }else{
        	callback();
        }
      };
      return {
        ruleForm2: {
          pass: '',
          name: '',
        },
		checked: false,
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          name: [
            { validator: username, trigger: 'blur' }
          ],
        },
        labelPosition: 'right',
      };
    },
    methods: {
		clear(){
			this.ruleForm2.pass='';
			this.ruleForm2.name='';
			this.checked=false;
		},
		submit(){
			//对输入框的文本进行判定
			if(!this.ruleForm2.name || !this.ruleForm2.pass ){
				this.open1()
				return false;
			};
			if(!/^[0-9a-z][\w\-]{5,19}$/.test(this.ruleForm2.name)){
				this.open2();
				this.ruleForm2.pass='';
				this.ruleForm2.name='';
				return false;
			};
			if(!/^\S{6,20}$/.test(this.ruleForm2.pass)){
				this.open2();
				this.ruleForm2.pass='';
				this.ruleForm2.name='';
				return false;
			}
			
			//设置localStorage储存在本地
			//讲用户名和密码写成一个对象
			var newcommit = { usn : this.ruleForm2.name , psd : this.ruleForm2.pass ,checked : this.checked}
			
			//写入localStorage和sessionStorage,lo用作存储密码,se用作登陆
			//console.log(newcommit)
			localStorage.setItem('token',JSON.stringify(newcommit));
			sessionStorage.setItem('token',JSON.stringify(newcommit));
			
			
			
			

			//上传数据并且进行判断
			this.$axios.post('/api/login',{username:this.ruleForm2.name,password:this.ruleForm2.pass}).then((res)=>{
				console.log(res.data)
				//向其他子路由传递数据,跳转页面
				this.$router.push({name:'home',params:{result:res.data}})
			})
			
			
			
		},
		open1() {
        	this.$message({
          	showClose: true,
          	message: '必须输入合法的用户名及密码',
          	type: 'error'
          });
       	},
        open2() {
        	this.$message({
          	showClose: true,
          	message: '您输入的用户名或密码不合法',
          	type: 'error'
	      });
	    },

      
    },
    beforeMount(){
    	this.checked = JSON.parse(localStorage.token).checked 
    	if(this.checked){
    		this.ruleForm2.name = JSON.parse(localStorage.token).usn
        	this.ruleForm2.pass = JSON.parse(localStorage.token).psd
       	 }
    }


  }
</script>

<style>
	#login{
		position:absolute;left:50%;top:50%;
		transform:translate(-50%,-50%);
	}
	.container{
		width: 600px;
	}
	.choose{
		float: left;
		margin-left: 120px;
	}
	.forgetps{
		float: right;
		margin-right: 120px;
		text-decoration: none;
	}
    h1{text-align: center;}
</style>