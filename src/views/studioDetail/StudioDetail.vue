<template>
	<div class="main" v-loading="loading">
		<div class="showStudio">
			<div class="content">
				<img src="../../assets/tupian.png" alt="" />
				<div style="width:100%;position: relative;">
					<div class="studio">{{ content.name }}</div>
					<div class="teacher">
						<span>指导老师：</span>
						<span v-for="(item, i) in content.teachers" :key="i">{{ item }}</span>
					</div>
					<!-- v-if="!isSignUp" -->
					<el-button type="text" @click="open" style="background:#ff6d43;color:white;" v-loading="SignUploading">点击报名</el-button>
					<!-- <el-button v-else type="text" @click="open" style="background:#ff6d43;color:white;" disabled>审核中...</el-button> -->
					<div class="max_numberm">招收人数：{{ content.student_num }}/{{ content.max_student }}人</div>
				</div>
			</div>
		</div>
		<el-tabs type="border-card">
			<el-tab-pane label="工作室简介">
				<div>
					{{ content.introduce }}
				</div>
				<!-- <el-button type="warning" plain>点击报名</el-button> -->
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
	// import topNav from '../header/topNav';

	import { getStudioDetail } from '../../network/api';
	import { signUp } from '../../network/api';
	export default {
		name: 'StudioDetail',
		data() {
			return {
				// isSignUp: false,
				content: [],
				// 界面状态
				loading: true,
				// 报名按钮状态
				SignUploading: false,
			};
		},
		methods: {
			open() {
				//判断是否登录
				if (sessionStorage.getItem('id')) {
					this.$prompt('个人自荐', '自荐', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						inputType: 'textarea',
					}).then(val => {
						// 获取学生id
						const studentId = sessionStorage.getItem('id');
						//工作室ID
						const studioId = this.$route.params.id;
						const token = sessionStorage.getItem('token');
						// 自荐
						const introduce = val;
						const type = sessionStorage.getItem('type');

						this.SignUploading = true;
						// console.log(studioId);
						// console.log(val);
						// console.log(token);

						signUp(studentId, studioId, type, introduce.value, token)
							.then(res => {
								res = res.data;
								if (res.code == 1) {
									this.$message({
										type: 'success',
										message: res.msg,
									});
								} else if (res.code == 0) {
									this.$message.error('报名失败，已报名别的工作室或已加入一个工作室');
								}
								this.SignUploading = false;
							})
							.catch(() => {
								console.log(1);
								this.SignUploading = false;
							});
					});

					// this.$confirm('是否向"' + this.content.name + '"报名？', '确认信息', {
					// 	distinguishCancelAndClose: true,
					// 	confirmButtonText: '确认',
					// 	cancelButtonText: '离开',
					// }).then(() => {
					// 	// 获取学生id
					// 	let studentId = sessionStorage.getItem('id');
					// 	//工作室ID
					// 	let studioId = this.$route.params.id;
					// 	// console.log(studioId);
					// 	signUp(studentId, studioId).then(res => {
					// 		res = res.data;
					// 		if (res.result) {
					// 			this.$message({
					// 				type: 'success',
					// 				message: res.msg,
					// 			});
					// 		} else {
					// 			this.$message.error(res.msg);
					// 		}
					// 	});
					// });
				} else {
					this.$confirm('请先登录认证在报名', '未登录', {
						distinguishCancelAndClose: true,
						confirmButtonText: '确认',
						cancelButtonText: '取消',
					}).then(() => {
						this.$router.push('/register');
					});
				}
			},
		},
		created() {
			let id = this.$route.params.id;
			getStudioDetail(id)
				.then(res => {
					this.content = res.data.data;
					this.loading = false;
				})
				.catch(err => {
					console.log(err);
				});
		},
	};
</script>
<style scoped>
	.main {
		margin-top: -20px;
	}
	.studio {
		/* float: left; */
		text-align: left;
		font-size: 30px;
		color: white;
		margin: 10px 0px 0px 20px;
	}
	.teacher {
		position: absolute;
		left: 0;
		top: 60px;
		color: white;
		margin: 20px 0px 0px 20px;
	}
	.teacher span {
		color: white;
		padding-right: 10px;
	}
	.max_numberm,
	.number {
		color: white;
		text-align: right;
	}
	.max_numberm {
		margin-top: 30px;
	}
	.el-tabs {
		text-align: left;
		width: 100%;
		min-height: 200px;
		margin: 0 auto;
		background: transparent;
	}
	.el-tabs div {
		text-indent: 2em;
		font-size: 19px;
		color: #3c3c3c;
	}

	.showStudio {
		overflow: hidden;
		height: 220px;
		background: url('~assets/bg.png');
		background-size: 100% 100%;
	}
	/* .el-button {
		height: 60px;
		width: 100%;
		margin: 20px auto;
	} */
	.el-button {
		position: absolute;
		right: 0%;
		top: 20px;
		width: 190px;
		font-size: 18px;
		margin-bottom: 20px;
	}
	.number::before {
		content: '';
		display: block;
		clear: both;
	}
	.content {
		display: flex;
		width: 90%;
		margin: 20px auto;
	}

	img {
		width: 17%;
		height: 17%;
	}
	/* .el-message-box__input {
		padding: 0;
	} */
</style>
