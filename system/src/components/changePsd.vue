<template>
	<div class="changepsd">
		<h3>修改密码</h3>
		<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
		 
		 <el-form-item label="原始密码" prop="orginPass">
		    <el-input type="password" v-model="ruleForm2.orginPass" autocomplete="off"></el-input>
		  </el-form-item>
		  <el-form-item label="密码" prop="pass">
		    <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
		  </el-form-item>
		  <el-form-item label="确认密码" prop="checkPass">
		    <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
		    <el-button @click="resetForm('ruleForm2')">重置</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>

<script>
  export default {
    data() {
      var validateoriginPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
      	}else{
      		if(value === JSON.parse(sessionStorage.token).psd){
      			callback();
      			//判断如果跟存储的账号密码相同可以进行修改
      			
      		}else{
      		callback(new Error('原始密码有误'));
      		}
      		
      	}
      }
    
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          pass: '',
          checkPass: '',
          orginPass: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          orginPass: [
          	{ validator: validateoriginPass, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	this.$axios.post('/api/changepsd',{username:JSON.parse(sessionStorage.token).usn,password:this.ruleForm2.pass}).then((res)=>{
          		this.open2()
	            //成功时的操作
	            //修改sess的值
	            var newcommit = { usn:JSON.parse(sessionStorage.token).usn , psd:this.ruleForm2.pass ,checked:JSON.parse(sessionStorage.token).checked}
	            sessionStorage.setItem('token',JSON.stringify(newcommit));
	            
		        //返回登陆页面
		        this.$router.push({path:'/login',params:{}})
          	})

          } else {
			open8()
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      open8() {
        this.$message({
          showClose: true,
          message: '信息有误',
          type: 'error'
        });
      },
       open2() {
        this.$message({
          message: '修改密码成功',
          type: 'success'
        });
       }
    },
    created(){
    	console.log(JSON.parse(sessionStorage.token).psd)
    }
  }
</script>

<style>

	.changepsd{
		width: 400px;
	}
</style>