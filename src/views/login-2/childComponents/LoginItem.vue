<template>
	<div class="login_container">
		<div class="login_box">
			<!-- 头像 -->
			<router-link to="/index">
				<div class="avatar_box">
					<img src="~assets/login_logo.png" alt />
				</div>
			</router-link>
			<!-- 登录 -->
			<el-form label-width="0px" class="login_form" :model="loginForm" :rules="loginFormRules" ref="loginFormRef" @submit.native.prevent>
				<!-- id -->
				<el-form-item prop="id">
					<!-- 前置图标 -->
					<el-input prefix-icon="el-icon-user" v-model="loginForm.id"></el-input>
				</el-form-item>
				<!-- password -->
				<el-form-item prop="password">
					<!-- 前置图标 -->
					<el-input prefix-icon="el-icon-lock" v-model="loginForm.password" type="password"></el-input>
				</el-form-item>
				<!--  button -->
				<el-form-item class="login_btns">
					<el-button type="primary" @click="go">返回首页</el-button>
					<el-button type="primary" @click="login" :loading="loading" native-type="“submit”">登录</el-button>
					<el-button type="info" @click="login_register">注册</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	// import { loginRequest } from 'network/login';
	import { login } from '../../../network/api';
	import { mapMutations } from 'vuex';
	export default {
		name: 'LoginItem',
		data() {
			return {
				loginForm: {
					id: '',
					password: '',
				},
				// 表单验证规则对象
				loginFormRules: {
					id: [
						{ required: true, message: '请输入登录账号', trigger: 'blur' },
						{
							min: 3,
							max: 10,
							message: '用户名长度在 3 到 10 个字符',
							trigger: 'blur',
						},
					],
					password: [
						{ required: true, message: '请输入登录密码', trigger: 'blur' },
						{
							min: 6,
							max: 145,
							message: '密码长度在 6 到 15 个字符',
							trigger: 'blur',
						},
					],
				},
				// 登录中....
				loading: false,
			};
		},
		methods: {
			...mapMutations(['changeLogin']),
			login_register() {
				//resetFields()  element的重置方法
				// this.$refs.loginFormRef.resetFields();
				this.$router.push('/register');
			},
			login() {
				//请求方法
				let _this = this;

				login(this.loginForm).then(res => {
					this.loading = true;
					res = res.data;
					if (res.code == 1) {
						// 登录成功提示的信息
						this.$message({
							message: res.msg,
							type: 'success',
						});
						window.sessionStorage.clear();
						window.sessionStorage.setItem('type', res.data.type);
						window.sessionStorage.setItem('name', res.data.name);
						//token
						_this.userToken = 'Bearer ' + res.data.token;
						// 将用户token保存到vuex中
						_this.changeLogin({ Authorization: _this.userToken });
						window.localStorage.setItem('token', res.data.token);
						window.sessionStorage.setItem('id', this.loginForm.id);
						this.$router.push('/studio');
					} else {
						this.loading = false;
						this.loginForm.password = '';
						this.$message({
							message: res.msg,
							type: 'warning',
						});
						localStorage.removeItem('Authorization');
					}
				});
				// validate()表单的预验证
				// this.$refs.loginFormRef.validate(valid => {
				// 	console.log(valid);
				// 	if (!valid) return;
				// 	// loginRequest(this.loginForm.id, this.loginForm.password).then(
				// 	//   res => {
				// 	//     // message是E-UI的组件
				// 	//     if (res.meta.status != 200) return this.$message.error('登录失败')
				// 	//     this.$message.success('登录成功')
				// 	//     // 登录成功之后，把用户的token，保存到sessionStorage中
				// 	//     console.log(res)
				// 	//     window.sessionStorage.setItem('token', res.data.token)
				// 	//     this.$router.push('/home')
				// 	//   }
				// 	// )
				// 	// this.$router.push('/home');
				// });
			},
			go() {
				this.$router.push('/studio');
			},
			handleSubmit() {
				console.log(1);
			},
		},
	};
</script>

<style lang="less" scoped>
	.login_container {
		height: 100vh;
		background: url('../../../assets/login-bg.jpg') no-repeat;
		background-size: 100% 100%;
	}
	.login_box {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 450px;
		height: 300px;
		background-color: #fff;
		border-radius: 3px;
		opacity: 0.93;
		// box-shadow: 0px 0px 30px #ddd;
		.avatar_box {
			// margin: 0 auto;
			position: absolute;
			left: 50%;
			padding: 10px;
			height: 130px;
			width: 130px;
			transform: translate(-50%, -50%);
			border: 1px solid #eee;
			border-radius: 50%;
			box-shadow: 0 -5px 10px #ddd;
			background-color: #fff;
			img {
				width: 100%;
				height: 100%;
				border-radius: 50%;
				background-color: #eee;
			}
		}
	}
	.login_form {
		position: absolute;
		padding: 0 10px;
		bottom: 0;
		width: 100%;
		// 因为加入padding表单会超出box
		box-sizing: border-box;
	}
	.login_btns {
		display: flex;
		justify-content: flex-end;
	}
</style>
