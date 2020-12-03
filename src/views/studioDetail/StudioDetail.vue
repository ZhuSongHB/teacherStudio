<template>
	<div class="main" v-loading="loading">
		<div class="showStudio">
			<div class="content">
				<img src="../../assets/tupian.jpg" alt="" />
				<div style="width: 100%; position: relative">
					<div class="studio">{{ content.name }}</div>
					<div class="teacher">
						<span>指导老师：</span>
						<span v-for="(item, i) in content.teachers" :key="i">{{ item }}</span>
					</div>
					<!-- v-if="!isSignUp" -->
					<el-button type="text" @click="open" style="background: #ff6d43; color: white" v-loading="SignUploading">点击报名</el-button>
					<!-- <el-button v-else type="text" @click="open" style="background:#ff6d43;color:white;" disabled>审核中...</el-button> -->
					<div class="max_numberm">人数：{{ content.student_num }}/{{ content.max_student }}人</div>
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
				if (this.getDate()) {
					if (sessionStorage.getItem('id')) {
						this.$prompt('个人自荐', '自荐', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							inputType: 'textarea',
							customClass: 'min-message',
						})
							.then(val => {
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
										console.log(res);
										if (res.code == 1) {
											this.$message({
												type: 'success',
												message: res.msg,
											});
										} else if (res.code == 0) {
											this.$notify.error({
												title: '报名失败',
												dangerouslyUseHTMLString: true,
												message: '<p> 1.学生只能报名、加入一个工作室 </p> <p>  2.加入的工作室已满员</p> ',
												duration: 4000,
											});
										}
										this.SignUploading = false;
									})
									.catch(err => {
										console.log(err);
										this.$message({
											message: '网络出现错误!',
											type: 'warning',
										});
										this.SignUploading = false;
									});
							})
							.catch(() => {});
					} else {
						this.$confirm('请先登录认证在报名', '未登录', {
							distinguishCancelAndClose: true,
							confirmButtonText: '确认',
							cancelButtonText: '取消',
						}).then(() => {
							this.$router.push('/login');
						});
					}
				} else {
					this.$message({
						message: '超出报名时间！！',
						type: 'warning',
					});
				}
			},
			/**
			 *  返回Boolen值，判断是否超过2020-12-3中午12点
			 */
			getDate() {
				// 获取2020-12-3中午12点的时间戳
				const date = new Date('2020-12-3-12:00');
				// 获取当前时间
				const nowDate = new Date();
				return date.getTime() > nowDate.getTime();
			},
		},
		created() {
			let id = this.$route.params.id;
			getStudioDetail(id)
				.then(res => {
					this.content = res.data.data;
					this.loading = false;
					document.title = this.content.name ? this.content.name : '错误';
				})
				.catch(err => {
					console.log(err);
					this.$message({
						message: '网络出现错误!',
						type: 'warning',
					});
				});
		},
	};
</script>
<style scoped lang="less">
	.main {
		margin-top: -20px;
		.showStudio {
			overflow: hidden;
			height: 220px;
			background: url('~assets/bg.png');
			background-size: 100% 100%;
			.content {
				display: flex;
				width: 90%;
				margin: 20px auto;
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
					width: 500px;
					word-break: break-all;
					text-overflow: ellipsis;
					overflow: hidden;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					span {
						color: white;
						padding-right: 10px;
					}
				}
				.max_numberm {
					color: white;
					text-align: right;
					margin-top: 30px;
					// width: 20px;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.el-button {
					position: absolute;
					right: 0%;
					top: 20px;
					width: 190px;
					font-size: 18px;
					margin-bottom: 20px;
				}
				img {
					margin-top: 10px;
					margin-left: -40px;
					width: 17%;
					height: 17%;
				}
			}
		}
		.el-tabs {
			text-align: left;
			width: 100%;
			min-height: 200px;
			margin: 0 auto;
			background: transparent;
			div {
				text-indent: 2em;
				font-size: 19px;
				color: #3c3c3c;
			}
		}
	}
	@media screen and (max-width: 656px) {
		.main {
			margin-top: -20px;
			.showStudio {
				overflow: hidden;
				height: 160px;
				background: url('~assets/bg.png');
				background-size: 100% 100%;
				.content {
					display: flex;
					width: 90%;
					margin: 20px auto;

					.studio {
						/* float: left; */
						text-align: left;
						font-size: 24px;
						color: white;
						margin: 10px 0px 0px 20px;
					}
					.teacher {
						position: absolute;
						left: 0;
						top: 30px;
						color: white;
						font-size: 14px;
						margin: 20px 0px 0px 20px;
						width: 160px;
						height: 60px;
						word-break: break-all;
						text-overflow: ellipsis;
						overflow: hidden;
						display: -webkit-box;
						-webkit-line-clamp: 3;
						-webkit-box-orient: vertical;
						span {
							color: white;
							padding-right: 10px;
						}
					}
					.max_numberm {
						font-size: 14px;
						color: white;
						text-align: right;
						margin-top: 30px;
					}
					.el-button {
						position: absolute;
						right: 0%;
						top: 20px;
						width: 100px;
						padding: 9px 5px;
						font-size: 18px;
						margin-bottom: 20px;
					}
					img {
						display: none;
					}
				}
			}
			.el-tabs {
				text-align: left;
				width: 99%;
				min-height: 300px;
				background: transparent;
				div {
					text-indent: 2em;
					font-size: 14px;
					color: black;
				}
			}
		}
	}
	@media screen and (max-width: 814px) {
		.main {
			margin-top: -20px;
			.showStudio {
				overflow: hidden;
				height: 160px;
				background: url('~assets/bg.png');
				background-size: 100% 100%;
				.content {
					display: flex;
					width: 90%;
					margin: 20px auto;

					.studio {
						/* float: left; */
						text-align: left;
						font-size: 24px;
						color: white;
						margin: 10px 0px 0px 20px;
					}
					.teacher {
						position: absolute;
						left: 0;
						top: 20px;
						color: white;
						font-size: 14px;
						margin: 20px 0px 0px 20px;
						width: 160px;
						height: 60px;
						word-break: break-all;
						text-overflow: ellipsis;
						overflow: hidden;
						display: -webkit-box;
						-webkit-line-clamp: 3;
						-webkit-box-orient: vertical;
						span {
							color: white;
							padding-right: 10px;
						}
					}
					.max_numberm {
						font-size: 14px;
						color: white;
						text-align: right;
						margin-top: 30px;
					}
					.el-button {
						position: absolute;
						right: 0%;
						top: 20px;
						width: 100px;
						padding: 9px 5px;
						font-size: 18px;
						margin-bottom: 20px;
					}
					img {
						display: none;
					}
				}
			}
			.el-tabs {
				text-align: left;
				width: 99%;
				min-height: 300px;
				background: transparent;
				div {
					text-indent: 2em;
					font-size: 14px;
					color: black;
				}
			}
		}
	}
</style>
<style>
	@media screen and (max-width: 656px) {
		.min-message {
			width: 250px !important;
		}
	}
</style>
