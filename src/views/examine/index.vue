<template>
	<el-tabs type="border-card" @tab-click="handleClick">
		<el-tab-pane label="成员名单">
			<el-collapse v-model="activeName" accordion>
				<el-collapse-item v-for="(item, i) in member" :title="item.studio_name" :name="i" :key="item.studio_id">
					<template slot="title">
						<div class="header">
							{{ item.studio_name }}
						</div>
					</template>
					<el-table :data="item.data" style="width: 100%">
						<el-table-column label="学号" prop="user_id"></el-table-column>
						<el-table-column label="姓名" prop="user_name"></el-table-column>
						<el-table-column label="类型">
							<template slot-scope="scope">
								<el-tag :type="scope.row.type === 0 ? 'primary' : 'success'" disable-transitions>{{ scope.row.type == 0 ? '学生' : '教师' }}</el-tag>
							</template>
						</el-table-column>
						<el-table-column align="right">
							<!-- <template slot-scope="scope">
								<el-button size="mini" type="danger" @click="handleMemberDelete(scope.$index, scope.row, i)">移除</el-button>
							</template> -->
						</el-table-column>
					</el-table>
				</el-collapse-item>
			</el-collapse>
		</el-tab-pane>
		<el-tab-pane label="审核名单">
			<el-collapse v-model="activeName" accordion>
				<el-collapse-item v-for="(item, i) in examine" :title="item.studio_name" :name="i" :key="item.studio_id">
					<template slot="title">
						<div class="header">
							{{ item.studio_name }}
						</div>
					</template>
					<el-button type="danger" class="refuseAll" @click="refuseAll(item.studio_scode)" style="width:140px;">拒绝剩余未审批用户</el-button>
					<el-table :data="item.data" style="width: 100%">
						<el-table-column label="学号" prop="user_id"></el-table-column>
						<el-table-column label="姓名" prop="user_name"></el-table-column>
						<el-table-column label="性别" prop="sexuality"></el-table-column>
						<el-table-column label="专业名称" prop="major_name"></el-table-column>
						<el-table-column label="学生年级" prop="grade"></el-table-column>
						<el-table-column label="学生自荐">
							<template slot-scope="scope">
								<el-button @click="introduce(scope.row.introduce)" type="success" v-if="scope.row.type == 0 && scope.row.introduce">查看自荐</el-button>
								<el-button @click="introduce(scope.row.introduce)" type="info" v-else-if="scope.row.introduce == ''" disabled>无自荐</el-button>
							</template>
						</el-table-column>
						<el-table-column label="类型">
							<template slot-scope="scope">
								<el-tag :type="scope.row.type === 0 ? 'primary' : 'success'" disable-transitions>{{ scope.row.type == 0 ? '学生' : '教师' }}</el-tag>
							</template>
						</el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<div class="operation">
									<el-button size="mini" type="primary" @click="handleEdit(scope.row.record_id)" style="min-width:40px;margin-right:10px;">通过</el-button>
									<el-button size="mini" type="danger" @click="handleDelete(scope.row.record_id)" style="min-width:40px;">拒绝</el-button>
								</div>
							</template>
						</el-table-column>
					</el-table>
				</el-collapse-item>
			</el-collapse>
		</el-tab-pane>
	</el-tabs>
</template>

<script>
	import { getApplyList } from '../../network/api';
	import { pass } from '../../network/api';
	import { refuse } from '../../network/api';
	import { refuseAll } from '../../network/api';
	import { getUserStudioList } from '../../network/api';
	export default {
		data() {
			return {
				// 成员数据
				member: [],
				// 审核数据
				examine: [],
				// 表头
				chengyuan: '成员名单',
				activeTabName: 'first',
				// 展示判断
				search: '',
				activeName: 0,
			};
		},
		methods: {
			// 通过
			handleEdit(record_id) {
				let user_id = sessionStorage.getItem('id');
				let token = localStorage.getItem('token');
				let teacher_id = sessionStorage.getItem('id');
				// this.$confirm('是否通过?', '提示', {
				// 	confirmButtonText: '确定',
				// 	cancelButtonText: '取消',
				// 	type: 'warning',
				// })
				// 	.then(() => {
				pass(user_id, record_id, token).then(res => {
					res = res.data;
					if (res.code == 1) {
						this.$message({
							type: 'success',
							message: res.msg,
						});

						getApplyList(teacher_id).then(res => {
							res = res.data;
							this.examine = res.data;
						});
					} else {
						this.$message({
							type: 'info',
							message: res.msg,
						});
					}
				});
				// })
				// .catch(() => {});
			},
			// 不通过
			handleDelete(record_id) {
				let user_id = sessionStorage.getItem('id');
				let token = localStorage.getItem('token');
				let teacher_id = sessionStorage.getItem('id');
				this.$confirm('是否拒绝?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				})
					.then(() => {
						refuse(user_id, record_id, token).then(res => {
							res = res.data;
							if (res.code == 1) {
								this.$message({
									type: 'success',
									message: res.msg,
								});
								getApplyList(teacher_id, token).then(res => {
									res = res.data;
									this.examine = res.data;
								});
							} else {
								this.$message({
									type: 'info',
									message: res.msg,
								});
							}
						});
					})
					.catch(() => {});
			},
			// 成员移除事件
			// handleMemberDelete(index, row, i) {
			// 	console.log(index, row, i);
			// 	this.member[i].students.splice(index, 1);
			// },
			// 点击成员刷新页面
			handleClick(tab) {
				let teacher_id = sessionStorage.getItem('id');
				let token = localStorage.getItem('token');
				if (tab.index == '1') {
					getApplyList(teacher_id, token).then(res => {
						res = res.data;
						this.examine = res.data;
						// this.examine = res.arr.data;
					});
				} else if (tab.index == '0') {
					getUserStudioList(teacher_id, token).then(res => {
						res = res.data;
						this.member = res.data;
					});
				}
			},
			refuseAll(studio_scode) {
				let token = localStorage.getItem('token');
				let teacher_id = sessionStorage.getItem('id');
				this.$confirm('是否全部拒绝?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				})
					.then(() => {
						refuseAll(teacher_id, studio_scode, token).then(res => {
							res = res.data;
							if (res.code == 1) {
								this.$message({
									type: 'success',
									message: res.msg,
								});
								getApplyList(teacher_id, token).then(res => {
									res = res.data;
									this.examine = res.data;
								});
							} else {
								this.$message({
									type: 'info',
									message: res.msg,
								});
							}
						});
					})
					.catch(() => {});
			},
			introduce(introduce) {
				this.$alert(introduce, '个人自荐', {
					confirmButtonText: '确定',
				});
			},
		},
		created() {
			let teacher_id = sessionStorage.getItem('id');
			let token = localStorage.getItem('token');
			getUserStudioList(teacher_id, token).then(res => {
				res = res.data;
				this.member = res.data;
			});
		},
	};
</script>

<style scoped>
	.type {
		font-size: 36px;
	}
	.el-tabs {
		min-height: 350px;
	}
	.el-button {
		min-width: 80px;
		padding: 7px 7px;
		margin-left: -7px;
	}
	.refuseAll {
		margin-right: 13px;
		float: right;
	}
	.header {
		font-size: 24px;
		font-weight: bold;
	}
</style>
