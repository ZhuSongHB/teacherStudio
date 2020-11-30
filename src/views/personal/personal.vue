<template>
	<div>
		<el-card class="box-card">
			<el-col :span="4">
				<el-menu default-active="1" class="el-menu-vertical-demo">
					<el-menu-item index="1" @click="handleSignUp">
						<span slot="title">我的报名</span>
					</el-menu-item>
					<el-menu-item index="2" @click="handleStudio">
						<span slot="title">我的工作室</span>
					</el-menu-item>
				</el-menu>
			</el-col>
			<el-col :span="20" class="show">
				<!-- 我的报名 -->
				<el-table :data="tableData" stripe style="width: 100%" v-if="key == 1" v-loading="loading">
					<el-table-column prop="studio_name" label="申请工作室"></el-table-column>
					<el-table-column prop="state" label="审核状态"></el-table-column>
					<el-table-column label="操作" prop="change_time">
						<template slot-scope="scope">
							<el-button type="danger" v-if="scope.row.state == '未审批' || scope.row.state == '待审批'" @click="signOut(scope.row.record_id)">取消报名</el-button>
						</template>
					</el-table-column>
				</el-table>
				<!-- 我的工作室 -->
				<el-table :data="tableData2" stripe style="width: 100%" v-else-if="key == 2">
					<el-table-column prop="studio_name" label="工作室"></el-table-column>
					<el-table-column prop="active_time" label="加入时间"></el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button type="danger" style="padding: 10px;width: 100px;" @click="quit(scope.row.studio_scode)">
								退出工作室
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
		</el-card>
		<el-card class="min-box-card">
			<!--  -->
			<el-row>
				<el-menu default-active="1" class="el-menu-demo" mode="horizontal">
					<el-menu-item index="1" @click="handleSignUp">
						<span slot="title">我的报名</span>
					</el-menu-item>
					<el-menu-item index="2" @click="handleStudio">
						<span slot="title">我的工作室</span>
					</el-menu-item>
				</el-menu>
			</el-row>
			<!--  -->
			<el-row class="show">
				<!-- 我的报名 -->
				<el-table :data="tableData" stripe style="width: 100%" v-if="key == 1" v-loading="loading">
					<el-table-column prop="studio_name" label="申请工作室"></el-table-column>
					<el-table-column prop="state" label="审核状态"></el-table-column>
					<el-table-column label="操作" prop="change_time">
						<template slot-scope="scope">
							<el-button type="danger" v-if="scope.row.state == '未审批' || scope.row.state == '待审批'" @click="signOut(scope.row.record_id)">取消报名</el-button>
						</template>
					</el-table-column>
				</el-table>
				<!-- 我的工作室 -->
				<el-table :data="tableData2" stripe style="width: 100%" v-else-if="key == 2">
					<el-table-column prop="studio_name" label="工作室"></el-table-column>
					<el-table-column prop="active_time" label="加入时间"></el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button type="danger" @click="quit(scope.row.studio_scode)">
								退出工作室
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-row>
		</el-card>
	</div>
</template>

<script>
	import { getApply } from '../../network/api';
	import { signOut } from '../../network/api';
	import { quit } from '../../network/api';
	import { stuGetStudio } from '../../network/api';
	export default {
		data() {
			return {
				tableData: null,
				tableData2: null,
				//展示哪一个  1为我的报名，2为我的工作室
				key: 1,
				loading: true,
			};
		},
		methods: {
			handleSignUp() {
				this.key = 1;
			},
			handleStudio() {
				this.key = 2;
			},
			// 取消报名
			signOut(recordId) {
				const student_id = sessionStorage.getItem('id');
				const record_id = recordId;
				const token = sessionStorage.getItem('token');
				this.$confirm('是否取消报名?', '确认', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					customClass: 'min-message',
				})
					.then(() => {
						signOut(student_id, record_id, token).then(res => {
							if (res.data.code == 1) {
								this.$message({
									message: res.data.msg,
									type: 'success',
								});
								//重新请求
								getApply(student_id, token).then(res => {
									this.tableData = res.data.data;
									// this.tableData.forEach(element => {
									// 	if (element.state == 1) {
									// 		element.state = '通过';
									// 	} else if (element.state == 0) {
									// 		element.state = '待审批';
									// 	} else if (element.state == 2) {
									// 		element.state = '审批拒绝';
									// 	} else if (element.state == 3) {
									// 		element.state = '退出工作室';
									// 	}
									// });
								});
							} else if (res.data.code == 0) {
								this.$message.error(res.data.msg);
							}
						});
					})
					.catch(() => {
						this.$message({
							message: '网络出现错误!',
							type: 'warning',
						});
					});
			},
			// 退出工作室
			quit(studioScode) {
				const student_id = sessionStorage.getItem('id');
				const studio_id = studioScode;
				const token = sessionStorage.getItem('token');
				this.$confirm('是否退出工作室?', '确认', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					customClass: 'min-message',
				})
					.then(() => {
						quit(student_id, studio_id, token).then(res => {
							if (res.data.code == 1) {
								this.$message({
									message: res.data.msg,
									type: 'success',
								});
								//重新请求
								stuGetStudio(student_id, token).then(res => {
									this.tableData2 = res.data.data;
								});
							} else if (res.data.code == 0) {
								this.$message.error(res.data.msg);
							}
						});
					})
					.catch(() => {
						this.$message({
							message: '网络出现错误!',
							type: 'warning',
						});
					});
			},
		},
		created() {
			document.title = '名师工作室-个人中心';
			const student_id = sessionStorage.getItem('id');
			const token = sessionStorage.getItem('token');
			getApply(student_id, token).then(res => {
				this.tableData = res.data.data;
				// this.tableData.forEach(element => {
				// 	if (element.state == 1) {
				// 		element.state = '通过';
				// 	} else if (element.state == 0) {
				// 		element.state = '待审批';
				// 	} else if (element.state == 2) {
				// 		element.state = '审批拒绝';
				// 	} else if (element.state == 3) {
				// 		element.state = '退出工作室';
				// 	}
				// });
				this.loading = false;
			});
			stuGetStudio(student_id, token).then(res => {
				this.tableData2 = res.data.data;
			});
		},
	};
</script>
<style scoped lang="less">
	.show {
		padding: 10px 60px;
		/* border: 1px solid black; */
		height: 100%;
	}
	.box-card {
		width: 100%;
		min-height: 600px;
	}
	.el-col {
		min-height: 600px;
	}
	.el-menu {
		min-height: 600px;
	}
	.el-button {
		padding: 10px;
		width: 80px;
	}
	.min-box-card {
		display: none;
	}
	@media screen and (max-width: 656px) {
		.el-menu {
			min-height: 0;
		}
		.box-card {
			display: none;
		}
		.show {
			/* border: 1px solid black; */
			padding: 0;
			height: 100%;
			width: 100%;
		}
		.min-box-card {
			display: block;
			min-height: 600px;
			margin: 10px 0;
		}
		.el-button {
			margin-left: -10px;
			padding: 10px 0px;
			width: 80px;
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
