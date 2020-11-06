<template>
	<div class="box">
		<el-form ref="form" :model="form" label-width="80px" :rules="loginFormRules">
			<el-form-item label="学号" prop="id">
				<el-input v-model="form.id" placeholder="请输入学号" oninput="value=value.replace(/[^\d]/g,'')" @blur="isOver"></el-input>
			</el-form-item>
			<el-form-item label="姓名" prop="name">
				<el-input v-model="form.name" placeholder="请输入姓名" @input="isOver" @blur="isOver"></el-input>
			</el-form-item>

			<el-form-item label="身份证" prop="idcard">
				<el-input v-model="form.idcard" placeholder="请输入身份证" @input="isOver" @blur="isOver" oninput="value=value.replace(/[^\dxX]/g,'')"></el-input>
			</el-form-item>
			<!-- <el-form-item label="密码" prop="password">
				<el-input v-model="form.password" placeholder="请输入密码" show-password @input="isOver"></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="rePassword">
				<el-input v-model="form.rePassword" placeholder="再次输入密码" show-password @input="isOver"></el-input>
			</el-form-item> -->
			<el-form-item class="button">
				<el-button type="primary" @click="queren" :disabled="key" native-type="“submit”">登录认证</el-button>
				<!-- <el-dialog title="信息确认" :visible.sync="dialogVisible" width="30%">
					<div>学号：{{ this.form.id }}</div>
					<div>姓名：{{ this.form.name }}</div>
					<div>请检查信息是否准确，一旦注册密码无法修改。</div>
					<span slot="footer" class="dialog-footer">
						<el-button @click="dialogVisible = false">取 消</el-button>
						<el-button type="primary" @click="queren">确 定</el-button>
					</span>
				</el-dialog> -->
				<el-button @click="reset" style="margin-left:30px;">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import { studentLogin } from '../../../network/api';

	import { mapMutations } from 'vuex';
	export default {
		//接收父组件参数
		props: ['change'],
		data() {
			// 两次密码验证
			// var validatePass2 = (rule, value, callback) => {
			// 	if (value === '') {
			// 		callback(new Error('请再次输入密码'));
			// 	} else if (value !== this.form.password) {
			// 		callback(new Error('两次输入密码不一致!'));
			// 	} else {
			// 		callback();
			// 	}
			// };
			return {
				// dialogVisible: false,
				form: {
					id: null,
					name: '',
					// password: '',
					// rePassword: '',
					idcard: '',
				},
				// 按钮开关
				key: true,
				// 表单验证规则
				loginFormRules: {
					id: [
						{ required: true, message: '请输入学号', trigger: 'blur' },
						{
							min: 8,
							max: 10,
							message: '请输入8-10位学号',
							trigger: 'blur',
						},
					],
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' },
						{ min: 2, max: 5, message: '请输入正确姓名', trigger: 'blur' },
					],
					// password: [
					// 	{ required: true, message: '请输入密码', trigger: 'blur' },
					// 	{
					// 		min: 6,
					// 		max: 15,
					// 		message: '密码长度在 6 到 15 个字符',
					// 		trigger: 'blur',
					// 	},
					// ],
					idcard: [
						{ required: true, message: '请输入身份证', trigger: 'blur' },
						{
							min: 18,
							max: 18,
							message: '输入正确的身份证',
							trigger: 'blur',
						},
					],
					// college: [{ required: true, message: '请输入学院', trigger: 'blur' }],
					// major: [{ required: true, message: '请输入专业', trigger: 'blur' }],
					// class: [{ required: true, message: '请输入班级', trigger: 'blur' }],
					// 密码验证
					// rePassword: [{ validator: validatePass2, trigger: 'blur', required: true }],
				},
			};
		},
		methods: {
			...mapMutations(['changeLogin']),
			// 提交信息
			queren() {
				// this.dialogVisible = false;
				let _this = this;
				// post请求
				this.form.idcard = this.form.idcard.toUpperCase();
				studentLogin(this.form).then(res => {
					res = res.data;
					// 判断是否注册成功
					if (res.code == 1) {
						this.$message({
							message: res.msg,
							type: 'success',
						});
						window.sessionStorage.clear();
						window.localStorage.clear();
						window.sessionStorage.setItem('type', 0);
						window.sessionStorage.setItem('name', this.form.name);
						//token
						_this.userToken = res.data.token;
						// 将用户token保存到vuex中
						_this.changeLogin({ Authorization: _this.userToken });
						window.sessionStorage.setItem('token', res.data.token);
						window.sessionStorage.setItem('id', this.form.id);
						history.go(-1);
					} else {
						this.$message({
							message: '账户验证错误',
							type: 'warning',
						});
					}
				});
			},
			// 重置信息
			reset() {
				this.form.id = '';
				this.form.name = '';
				// this.form.password = '';
				// this.form.rePassword = '';
				this.form.idcard = '';
			},
			// 是否打开按钮 判断填写完成
			isOver() {
				if (this.form.id && this.form.idcard && this.form.name) {
					if (this.form.name.length >= 2 && this.form.name.length <= 5) {
						if (this.form.idcard.length == 18) {
							this.key = false;
						} else {
							this.key = true;
						}
					} else {
						this.key = true;
					}
					// }
				} else {
					this.key = true;
				}
			},
			// isNumber() {
			// 	console.log(this.form.id);
			// },
		},
		created() {
			// console.log(change);
		},
	};
</script>

<style scoped>
	.box {
		/* width: 450px; */
		margin-left: -70px;
	}
	.el-input {
		width: 217px;
	}
	label {
		width: 100px;
	}
	.button {
		display: flex;
		justify-content: center;
	}
</style>
