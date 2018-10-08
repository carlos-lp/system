<template>
	<div class="user">
	<!--<!--<insertuser></insertuser>-->	
	<el-form :inline="true" :model="formInline" class="demo-form-inline insert">
	  <el-form-item label="登陆名">
	    <el-input v-model="formInline.username" placeholder="登陆名"></el-input>
	  </el-form-item class="input">
	  <el-form-item label="手机">
	    <el-input v-model="formInline.phone" placeholder="手机" ></el-input>
	  </el-form-item class="input">
	  <el-form-item label="邮箱" >
	    <el-input v-model="formInline.email" placeholder="邮箱"></el-input>
	  </el-form-item>
	  <el-form-item label="角色" >
	    <el-select v-model="formInline.identity" placeholder="管理员">
	      <el-option label="管理员" value="管理员"></el-option>
	      <el-option label="超级管理员" value="超级管理员"></el-option>
	    </el-select>
	  </el-form-item>
	  <el-form-item class="btn">
	    <el-button type="primary" @click="onSubmit">查询</el-button>
	  </el-form-item>
	</el-form>
	
	
	<!--弹出框 添加用户-->
	<el-button type="primary" class="btn1" @click="dialogFormVisible = true">添加</el-button>
	<el-dialog title="添加用户" :visible.sync="dialogFormVisible" class="dailog">
	  <el-form :model="form1">
	    <el-form-item label="用户名" :label-width="formLabelWidth">
	      <el-input v-model="form1.username" autocomplete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="密码" :label-width="formLabelWidth">
	      <el-input v-model="form1.password" autocomplete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="手机" :label-width="formLabelWidth">
	      <el-input v-model="form1.phone" autocomplete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="邮箱" :label-width="formLabelWidth">
	      <el-input v-model="form1.email" autocomplete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="角色" :label-width="formLabelWidth">
	      <el-select v-model="form1.identity" placeholder="管理员">
	        <el-option label="管理员" value="管理员"></el-option>
	        <el-option label="超级管理员" value="超级管理员"></el-option>
	      </el-select>
	    </el-form-item>
	    <el-form-item label="发布状态" :label-width="formLabelWidth">
	      <el-select v-model="form1.publish" placeholder="未发布">
	        <el-option label="未审核" value="未审核"></el-option>
	        <el-option label="已审核" value="已审核"></el-option>
	      </el-select>
	    </el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="dialogFormVisible = false">取 消</el-button>
	    <el-button type="primary" @click="adduser">确 定</el-button>
	  </div>
	</el-dialog>
	
	<!-- 删除用户-->
	<el-button type="primary" class="btn1" @click=delusers>删除</el-button>	

	
	
	

	<br /><br /><br />
	<el-table
	    ref="multipleTable"
	    :data="tableData"
	    tooltip-effect="dark"
	    style="width: 100%"
	    @selection-change="handleSelectionChange">
	    
	    <!--表格的表头-->
	    <el-table-column
	      type="selection"
	      width="40"
	      class="juzhong">
	    </el-table-column>
	    <el-table-column
	      prop="id"
	      label="ID"
	      width="80"
	      class="juzhong">
	    </el-table-column>
	    <el-table-column
	      prop="username"
	      label="用户名"
	      width="80"
	      class="juzhong">
	    </el-table-column>
	    <el-table-column
	      prop="phone"
	      label="手机"
	      width="120"
	      class="juzhong">
	    </el-table-column>
	    <el-table-column
	      prop="email"
	      label="邮箱"
	      width="200"
	      class="juzhong">
	    </el-table-column>
	    <el-table-column
	      prop="identity"
	      label="角色"
	      width="80"
	      class="juzhong">
	    </el-table-column>
	    <el-table-column
	      prop="time"
	      label="时间"
	      width="260"
	      class="juzhong">
	    </el-table-column>
	    <el-table-column
	      prop="status"
	      label="发布状态"
	      width="100"
	      class="juzhong">
	    </el-table-column>
	    <el-table-column
	      fixed="right"
	      label="操作"
	      width="100"
	      class="juzhong">
	      <template slot-scope="scope">
	        <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
	        <el-button type="text" size="small">编辑</el-button>
	      </template>
	    </el-table-column>
	</el-table>
	</div>
</template>

<script>
	// import insertuser from '@/components/insertuser'
    import Vue from 'vue';
	Vue.filter('formatDate', function (value) {
      let date = new Date(value);
      return date.toLocaleDateString();
    });
    export default {
	    data() {
	      return {
	        tableData: [],
	        multipleSelection: [],
	       	formInline: {
	        username: '',
	        phone:'',
	        email:'',
	        identity: '',
	        },
	        dialogFormVisible: false,      
	        form1: {
	          username: '',
	          phone: '',
	          email: '',
	          identity: '管理员',
	          publish: '未审核',
	          password:'',
	          time:new Date().toLocaleDateString()
	        },
	        formLabelWidth: '120px'
	      }
	    },
	
	    methods: {
	        toggleSelection(rows) {
	        if (rows) {
		          rows.forEach(row => {
		            this.$refs.multipleTable.toggleRowSelection(row);
		          });
		        } else {
		          this.$refs.multipleTable.clearSelection();
		        }
		      },
	        handleSelectionChange(val) {
		        this.multipleSelection = val;
		        console.log(this.multipleSelection)
		        //包含单条数据的一个数组

		        
		      },
		    handleClick(row) {
		        console.log(row.id);
//				删除该条数据
				this.$axios.post('/api/deluser',{id:row.id}).then((res)=>{
					if(res.data=='success'){
        				this.$message({message: '删除用户成功',type: 'success'});
        				//重新获取数据
				    	this.$axios.post('/api/getuser').then((res)=>{
				    		console.log(res.data)
				    		this.tableData = res.data	
				    	})
					}
				})
		      },
	        onSubmit() {
	        this.$axios.post('/api/searchuser',{searchuser:this.formInline}).then((res)=>{
					let data = res.data;
					if(data=='error'){
						alert('没搜索到相关数据')	
					}else{
						this.tableData = data					
					}

		        })
	      	},
	      	adduser(){
	      		//复制对象方法
	      		let insertuser = {}
	      		for ( var attr in this.form1){
	      			insertuser[attr] = this.form1[attr]
	      		}
	      		//添加判断
	      		if(insertuser.username){
	      			if(insertuser.password){
	      				if(!/^\S{6,20}$/.test(insertuser.password)){
			      			this.$message.error('密码格式6-20位且不能使用空格');
			      			return false;
						}else{
							if(!/^1[3-9]\d{9}$/.test(insertuser.phone)){
			      				this.$message.error('手机号不合法');
								return false;
							}else{
								if(!/^[a-z0-9][\w\-\.]{2,29}@[a-z0-9\-]{2,67}(\.[a-z\u2E80-\u9FFF]{2,6})+$/.test(insertuser.email)){
			      					this.$message.error('邮箱格式不合法');
									return false;
								}else{
						      		this.$axios.post('/api/insertuser',{insertuser:insertuser}).then((res)=>{
						      			if(res.data=='success'){
						      				    this.$axios.post('/api/getuser').then((res)=>{
									    		this.tableData = res.data	
									    	})
						      			}
						      		})
        							this.$message({message: '添加用户成功',type: 'success'});
			        				//重新获取数据
							    	this.$axios.post('/api/getuser').then((res)=>{
							    		console.log(res.data)
							    		this.tableData = res.data	
							    	})
						      		this.dialogFormVisible = false;
								}
							}
						}
	      			}else{
		      			this.$message.error('请输入正确的密码格式');
		      			return false;
	      			}
	      		}else{
	      			this.$message.error('请输入正确的用户名');
	      			return false;
	      		}
	      		
	      	},
	      	delusers(){
		        var delusers = this.multipleSelection.map(item=>{
		        	return item.id
		        })
		        this.$axios.post('/api/delusers',{id:delusers}).then(res=>{
		        	if(res.data=='success'){
						this.$message({message: '删除成功',type: 'success'});
        				//重新获取数据
				    	this.$axios.post('/api/getuser').then((res)=>{
				    		console.log(res.data)
				    		this.tableData = res.data	
				    	})
			      		this.dialogFormVisible = false;
		        	}else{
		        		 this.$message.error('删除失败');
		        	}
		        })
	      	}
	  },
    created(){
    	this.$axios.post('/api/getuser').then((res)=>{
    		console.log(res.data)
    		let datalist = res.data

			this.tableData = datalist
    	})
    },
    
  }
    



</script>

<style>
	.user .insert .el-table th div, .el-table th>.cell{
		text-align: center;
	}
	.user{
		width: 90%;
	}
	.user .insert .el-form-item__content{
		width: 60%;
	}
	.user .insert .el-form-item{
		width: 18%;
	}
	.user .btn1{
		float: left;
		margin-left: 40px;
	}
	.user .dailog .el-input{
		width: 260px;
	}

</style>