<template>
	<!-- <div class="box">
		<el-form ref="form" :model="form" label-width="80px" :rules="loginFormRules">
			<el-form-item label="学号" prop="id">
				<el-input v-model="form.id" placeholder="请输入学号" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
			</el-form-item>
			<el-form-item label="姓名" prop="name">
				<el-input v-model="form.name" placeholder="请输入姓名" @input="isOver"></el-input>
			</el-form-item>

			<el-form-item label="身份证" prop="IDcard">
				<el-input v-model="form.IDcard" placeholder="请输入身份证" @input="isOver"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input v-model="form.password" placeholder="请输入密码" show-password @input="isOver"></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="rePassword">
				<el-input v-model="form.rePassword" placeholder="再次输入密码" show-password @input="isOver"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="dialogVisible = true" :disabled="key">立即注册</el-button>
				<el-dialog title="信息确认" :visible.sync="dialogVisible" width="30%">
					<div>学号：{{ this.form.id }}</div>
					<div>姓名：{{ this.form.name }}</div>
					<div>请检查信息是否准确，一旦注册密码无法修改。</div>
					<span slot="footer" class="dialog-footer">
						<el-button @click="dialogVisible = false">取 消</el-button>
						<el-button type="primary" @click="queren">确 定</el-button>
					</span>
				</el-dialog>
				<el-button @click="reset" style="margin-left:40px;">重置</el-button>
			</el-form-item>
		</el-form>
	</div> -->

	<div class="register">
		<div class="radio">
			<el-radio v-model="change" label="0">学生认证</el-radio>
			<el-radio v-model="change" label="1">老师认证</el-radio>
		</div>
		<student-register :change="change" v-if="change == '0'" />
		<teacher-register :change="change" v-else />
	</div>
</template>

<script>
	// import { register } from '../../network/api';
	// export default {
	// 	data() {
	// 		// 两次密码验证
	// 		var validatePass2 = (rule, value, callback) => {
	// 			if (value === '') {
	// 				callback(new Error('请再次输入密码'));
	// 			} else if (value !== this.form.password) {
	// 				callback(new Error('两次输入密码不一致!'));
	// 			} else {
	// 				callback();
	// 			}
	// 		};
	// 		return {
	// 			dialogVisible: false,
	// 			form: {
	// 				id: null,
	// 				name: '',
	// 				password: '',
	// 				rePassword: '',
	// 				IDcard: '',
	// 			},
	// 			// 按钮开关
	// 			key: true,
	// 			// 表单验证规则
	// 			loginFormRules: {
	// 				id: [
	// 					{ required: true, message: '请输入学号', trigger: 'blur' },
	// 					{
	// 						min: 8,
	// 						max: 10,
	// 						message: '请输入8-10位学号',
	// 						trigger: 'blur',
	// 					},
	// 				],
	// 				name: [
	// 					{ required: true, message: '请输入姓名', trigger: 'blur' },
	// 					{
	// 						trigger: 'blur',
	// 					},
	// 				],
	// 				password: [
	// 					{ required: true, message: '请输入密码', trigger: 'blur' },
	// 					{
	// 						min: 6,
	// 						max: 15,
	// 						message: '密码长度在 6 到 15 个字符',
	// 						trigger: 'blur',
	// 					},
	// 				],
	// 				IDcard: [
	// 					{ required: true, message: '请输入身份证', trigger: 'blur' },
	// 					{
	// 						min: 18,
	// 						max: 18,
	// 						message: '输入正确的身份证',
	// 						trigger: 'blur',
	// 					},
	// 				],
	// 				// college: [{ required: true, message: '请输入学院', trigger: 'blur' }],
	// 				// major: [{ required: true, message: '请输入专业', trigger: 'blur' }],
	// 				// class: [{ required: true, message: '请输入班级', trigger: 'blur' }],
	// 				// 密码验证
	// 				rePassword: [{ validator: validatePass2, trigger: 'blur', required: true }],
	// 			},
	// 		};
	// 	},
	// 	methods: {
	// 		// 提交信息
	// 		queren() {
	// 			this.dialogVisible = false;
	// 			console.log(this.form);

	// 			// post请求
	// 			register(this.form).then(res => {
	// 				res = res.data;
	// 				console.log(res);
	// 				// 判断是否注册成功 (等待后端传送)
	// 				if (res.result == true) {
	// 					this.$message({
	// 						message: '注册成功',
	// 						type: 'success',
	// 					});
	// 					this.$router.push('/login');
	// 				} else {
	// 					this.$message({
	// 						message: '注册失败，账号已存在',
	// 						type: 'warning',
	// 					});
	// 				}
	// 			});

	// 			console.log(this.form);
	// 		},
	// 		// 重置信息
	// 		reset() {
	// 			this.form.id = '';
	// 			this.form.name = '';
	// 			this.form.password = '';
	// 			this.form.rePassword = '';
	// 			this.form.IDcard = '';
	// 		},
	// 		// 是否打开按钮 判断填写完成
	// 		isOver() {
	// 			if (this.form.id && this.form.password && this.form.rePassword && this.form.name) {
	// 				if (this.form.password.length >= 6 && this.form.password.length <= 15) {
	// 					if (this.form.password == this.form.rePassword) {
	// 						this.key = false;
	// 						return;
	// 					} else {
	// 						this.key = true;
	// 					}
	// 				}
	// 			}
	// 		},
	// 		isNumber() {
	// 			console.log(this.form.id);
	// 		},
	// 	},
	// };
	import studentRegister from './childComponents/student.vue';
	import teacherRegister from './childComponents/teacher.vue';
	export default {
		name: 'register',
		data() {
			return {
				//切换 0是学生，1是老师
				change: '0',
			};
		},
		components: {
			studentRegister,
			teacherRegister,
		},
	};
</script>
<style scoped>
	.register {
		width: 450px;
		margin: 50px auto;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		padding-bottom: 300px;
	}
	.radio {
		margin-bottom: 50px;
		display: flex;
	}
	.el-input {
		width: 217px;
	}
	label {
		width: 100px;
	}
</style>
