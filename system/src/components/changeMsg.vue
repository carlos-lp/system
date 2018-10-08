<template>
	<el-form ref="form" label-width="100px" class="changeMsg">
	  <h3>修改资料</h3>
	  <el-form-item label="我的角色">
	      <el-select v-model="value" placeholder="请选择" disabled class="insert">
		    <el-option
		      v-for="item in options"
		      :key="item.value"
		      :label="item.label"
		      :value="item.value">
		    </el-option>
		  </el-select>
		  <span class="beizhu">当前角色不可切换为其他角色</span>
	  </el-form-item>
	  
	  <el-form-item label="用户名">
		<el-input v-model="username" class="insert" :disabled="true"></el-input>
		<span class="beizhu">不可修改一般用作后台登录名</span>
	  </el-form-item>
	  
	  <el-form-item label="昵称">
		<el-input v-model="nickname"  class="insert" ></el-input>
	  </el-form-item>
	  
	  <el-form-item label="性别">
		  <el-radio v-model="radio" label="男">男</el-radio>
 		  <el-radio v-model="radio" label="女">女</el-radio>
	  </el-form-item>
	  
	  <el-form-item label="头像">
		<el-input v-model="imageUrl"  class="insert" ></el-input>
		<el-upload
		  class="avatar-uploader"
		  action="https://jsonplaceholder.typicode.com/posts/"
		  :show-file-list="false"
		  :on-success="handleAvatarSuccess"
		  :before-upload="beforeAvatarUpload">
		  <img v-if="imageUrl" :src="imageUrl" class="avatar">
		  <i v-else class="el-icon-plus avatar-uploader-icon">上传图片</i>
		</el-upload>
		<div class="check">查看图片</div>
	  </el-form-item>	  
	  
	  <el-form-item label="手机">
		<el-input v-model="phone"  class="insert" ></el-input>
	  </el-form-item>
	  
	  <el-form-item label="邮箱">
		<el-input v-model="mail"  class="insert" ></el-input>
	  </el-form-item>
	  
	  <el-form-item label="备注">
		<el-input
		  type="textarea"
		  placeholder="请输入内容"
		  rows="6"
		  v-model="textarea" class="textarea">
		</el-input>
	  </el-form-item>
	  
	  <el-form-item size="large">
	    <el-button type="primary" @click="onSubmit">确认修改</el-button>
	    <el-button @click="clear">重新填写</el-button>
	  </el-form-item>
	</el-form>
</template>

<script>
	export default {
	    data() {
	      return {
	        options: [{
	          value: '超级管理员',
	          label: '超级管理员'
	        }, {
	          value: '管理员',
	          label: '管理员'
	        }],
	        value: '管理员',
	        username: JSON.parse(sessionStorage.token).usn,
	        nickname:'',
        	radio: '男',
        	imageUrl: '',
        	phone:'',
        	mail:'',
        	textarea:''
        	
	      };
	    },
	    methods: {
	      onSubmit() {
	        console.log('submit!');
	        //定义一个对象,将对象里面的值直接传到后端
	        var changemsg = {
	        	nickname:this.nickname,
		    	radio:this.radio ,
		    	imageUrl:this.imageUrl,
		    	phone:this.phone,
		    	mail:this.mail,
		    	textarea:this.textarea,
		    	username:this.username
	        }
	        console.log(changemsg)
	        
	        //符合要求时提交数据
			if(!/^1[3-9]\d{9}$/.test(this.phone)){
  				this.$message.error('手机号不合法');
				return false;
			}else{
				if(!/^[a-z0-9][\w\-\.]{2,29}@[a-z0-9\-]{2,67}(\.[a-z\u2E80-\u9FFF]{2,6})+$/.test(this.mail)){
  					this.$message.error('邮箱格式不合法');
					return false;
				}else{
			        this.$axios.post('/api/changemsg',{changemsg:changemsg}).then((res)=>{
			        	console.log(res.data)
			        })
					this.$message({message: '添加用户成功',type: 'success'});
		      		this.dialogFormVisible = false;
		      		
				}
			}
	        

	      },
	      handleAvatarSuccess(res, file) {
	        this.imageUrl = URL.createObjectURL(file.raw);
	      },
	      beforeAvatarUpload(file) {
	        const isJPG = file.type === 'image/jpeg';
	        const isLt2M = file.size / 1024 / 1024 < 2;
	
	        if (!isJPG) {
	          this.$message.error('上传头像图片只能是 JPG 格式!');
	        }
	        if (!isLt2M) {
	          this.$message.error('上传头像图片大小不能超过 2MB!');
	        }
	        return isJPG && isLt2M;
	      },
	      clear(){
	      	this.value='选项1',
	      	this.nickname='',
        	this.radio= '1',
        	this.imageUrl= '',
        	this.phone='',
        	this.mail='',
        	this.textarea=''
	      }
	    },
	    created(){
	    	this.$axios.post('/api/curruser',{username:JSON.parse(sessionStorage.token).usn}).then((res)=>{
	    		console.log(res.data.id);
	    		this.value = res.data.map((item)=>{
	    			return item.identity
	    		})
	    	})
	    }
  	};
</script>

<style lang="scss">
	.el-form-item{
		.el-form-item__content{
			text-align: left;
				.insert{
				width: 200px;
			}
				.beizhu{
				font-size: 14px;
				color: #777;
				margin-left: 30px;
			}
	  	}
	}
	  .avatar-uploader{
	  	display: inline-block;
	  	width: 120px;
	  	border:1px solid #ddd;
	  	border-radius: 6%;
	  	.avatar-uploader-icon{
	  		width: 120px;
	  	}
	  }
	  	.check{
	  		display: inline-block;
	  		width: 120px;
	  		line-height: 40px;
	  		text-align: center;
	  		border:1px solid #ddd;
	  		border-radius: 6%;
	  	}
	  .changeMsg{
	  	width: 600px;
	  }


</style>