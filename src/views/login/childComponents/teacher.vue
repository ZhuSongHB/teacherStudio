<template>
	<div class="box">
		<el-form ref="form" :model="form" label-width="80px" :rules="loginFormRules">
			<el-form-item label="账号" prop="id">
				<el-input v-model.trim="form.id" placeholder="请输入教务系统账号" @input="isOver"></el-input>
			</el-form-item>
			<el-form-item label="姓名" prop="name">
				<el-input v-model.trim="form.name" placeholder="请输入姓名" @input="isOver"></el-input>
			</el-form-item>

			<el-form-item label="身份证" prop="idcard">
				<el-input v-model.trim="form.idcard" placeholder="请输入身份证后六位" @input="isOver"></el-input>
			</el-form-item>
			<el-form-item class="button">
				<el-button type="primary" @click.prevent="queren" :disabled="key" native-type="“submit”">登录认证</el-button>
				<el-button @click.prevent="reset" style="margin-left:30px;">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import { teacherLogin } from '../../../network/api';
	import { mapMutations } from 'vuex';
	export default {
		//接收父组件参数
		props: ['change'],
		data() {
			return {
				form: {
					id: null,
					name: '',
					idcard: null,
				},
				// 按钮开关
				key: true,
				// 表单验证规则
				loginFormRules: {
					id: [
						{ required: true, message: '请输入教务系统账号', trigger: 'blur' },
						{
							min: 1,
							message: '请输入正确教务系统账号',
							trigger: 'blur',
						},
					],
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' },
						{
							min: 2,
							message: '请输入姓名',
							trigger: 'blur',
						},
					],
					idcard: [
						{ required: true, message: '输入身份证后六位', trigger: 'blur' },
						{
							min: 6,
							max: 6,
							message: '输入身份证后六位验证',
							trigger: 'blur',
						},
					],
				},
			};
		},
		methods: {
			...mapMutations(['changeLogin']),
			// 提交信息
			queren() {
				let _this = this;
				// post请求
				this.form.idcard = this.form.idcard.toUpperCase();
				this.form.id = Number(this.form.id);
				teacherLogin(this.form)
					.then(res => {
						res = res.data;
						// 判断是否注册成功 (等待后端传送)
						if (res.code == 1) {
							this.$message({
								message: res.msg,
								type: 'success',
							});
							window.sessionStorage.clear();
							window.localStorage.clear();
							window.sessionStorage.setItem('type', 1);
							window.sessionStorage.setItem('name', this.form.name);
							//token
							_this.userToken = res.data.token;
							// 将用户token保存到vuex中
							_this.changeLogin({ Authorization: _this.userToken });
							window.sessionStorage.setItem('token', res.data.token);
							window.sessionStorage.setItem('id', this.form.id);

							this.$router.push('/studio');
							// this.$router.push('/examine');
						} else {
							this.$message({
								message: '账户验证错误',
								type: 'warning',
							});
						}
					})
					.catch(err => {
						console.log(err);

						this.$message({
							message: '网络出现错误，请重新认证!',
							type: 'warning',
						});
					});
			},
			// 重置信息
			reset() {
				this.form.id = '';
				this.form.name = '';
				this.form.idcard = '';
			},
			// 是否打开按钮 判断填写完成
			isOver() {
				if (this.form.id && this.form.idcard && this.form.name) {
					if (this.form.name.length >= 2) {
						if (this.form.idcard.length == 6) {
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
		},
		created() {},
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
	.el-form-item__label {
		width: 400px;
	}
	.button {
		display: flex;
		justify-content: center;
	}
</style>
