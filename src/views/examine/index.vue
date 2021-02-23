<template>
	<el-tabs type="border-card" @tab-click="handleClick">
		<el-tab-pane label="成员名单">
			<el-collapse v-model="activeName">
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
								<el-tag :type="scope.row.type === 0 ? 'primary' : 'success'" disable-transitions>{{ scope.row.type == 0 ? "学生" : "教师" }}</el-tag>
							</template>
						</el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button type="danger" @click="removeMember(scope.row, i, scope.$index)" :loading="scope.row.removeLoading">移除</el-button>
							</template>
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
					<el-button type="danger" class="refuseAll" @click="refuseAll(item.studio_scode)">拒绝剩余未审批用户</el-button>
					<el-table :data="item.data" style="width: 100%">
						<el-table-column label="学号" prop="user_id"></el-table-column>
						<el-table-column label="姓名" prop="user_name"></el-table-column>
						<el-table-column label="性别" prop="sexuality"></el-table-column>
						<el-table-column label="专业名称" prop="major_name"></el-table-column>
						<el-table-column label="学生年级" prop="grade"></el-table-column>
						<el-table-column label="学生自荐">
							<template slot-scope="scope">
								<el-button class="intrBtn" @click="introduce(scope.row.introduce)" type="success" v-if="scope.row.type == 0 && scope.row.introduce != 'null' && scope.row.introduce">查看自荐</el-button>
								<el-button class="intrBtn" @click="introduce(scope.row.introduce)" type="info" v-else-if="scope.row.introduce == '' || scope.row.introduce == 'null' || scope.row.introduce == null" disabled>无自荐</el-button>
							</template>
						</el-table-column>
						<el-table-column label="类型">
							<template slot-scope="scope">
								<el-tag :type="scope.row.type === 0 ? 'primary' : 'success'" disable-transitions>{{ scope.row.type == 0 ? "学生" : "教师" }}</el-tag>
							</template>
						</el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<div class="operation">
									<el-button size="mini" type="primary" @click="handleEdit(scope.row.record_id, scope.row)" style="min-width:40px;margin-right:10px;" :loading="scope.row.sendMsgLoading">通过</el-button>
									<el-button size="mini" type="danger" @click="handleDelete(scope.row.record_id, scope.row)" style="min-width:40px;" :loading="scope.row.sendrefuseLoading">拒绝</el-button>
								</div>
							</template>
						</el-table-column>
					</el-table>
				</el-collapse-item>
			</el-collapse>
		</el-tab-pane>
		<el-tab-pane label="工作室日志">
			<joumal :member="member" />
		</el-tab-pane>
		<!-- <el-tab-pane label="工作室变更申请">
			<studio-chage :member="member" />
		</el-tab-pane> -->
		<!-- <el-tab-pane label="工作室教师成员变更申请"> -->
		<!-- <studio-chage /> -->
		<!-- 等数据 -->
		<!-- </el-tab-pane> -->
		<el-tab-pane label="工作室注册申请">
			<register-form :partyUnitData="this.partyUnitData" />
		</el-tab-pane>
		<!-- <el-tab-pane label="置换方案申请">
			<el-col :span="4">
				<el-menu default-active="1" class="el-menu-vertical-demo" @select="handleOpen" style="width:200px;">
					<el-menu-item index="1">
						<span slot="title">课程置换方案</span>
					</el-menu-item>
					<el-menu-item index="2">
						<span slot="title">学分置换方案</span>
					</el-menu-item>
					<el-menu-item index="3">
						<span slot="title">实习毕业论文(设计)方案</span>
					</el-menu-item>
				</el-menu>
			</el-col>
			<el-col :span="20">
				<curriculum-replacement v-show="key == '1'" />
				<credit-replacement v-show="key == '2'" />
				<dissertation-replacement v-show="key == '3'" />
			</el-col>
		</el-tab-pane>
		<el-tab-pane label="置换申请">
			<el-col :span="4">
				<el-menu default-active="1" class="el-menu-vertical-demo" @select="handleOpen" style="width:200px;">
					<el-menu-item index="1">
						<span slot="title">课程置换</span>
					</el-menu-item>
					<el-menu-item index="2">
						<span slot="title">学分置换</span>
					</el-menu-item>
					<el-menu-item index="3">
						<span slot="title">实习</span>
					</el-menu-item>
					<el-menu-item index="4">
						<span slot="title">毕业论文(设计)</span>
					</el-menu-item>
				</el-menu>
			</el-col>
			<el-col :span="20">
				<curriculum v-show="key == '1'" />
				<credit v-show="key == '2'" />
				<internship v-show="key == '3'" />
				<bishe v-show="key == '4'" />
			</el-col>
		</el-tab-pane> -->
		<el-tab-pane label="课程置换方案申请">
			<curriculum-replacement :member="member" :partyUnitData="this.partyUnitData" />
		</el-tab-pane>
		<el-tab-pane label="学分置换方案申请">
			<credit-replacement :member="member" :partyUnitData="this.partyUnitData" />
		</el-tab-pane>
		<el-tab-pane label="承担实习毕业论文（设计）方案申请">
			<dissertation-replacement :member="member" :partyUnitData="this.partyUnitData" />
		</el-tab-pane>
		<el-tab-pane label="课程置换申请">
			<curriculum :member="member" :partyUnitData="this.partyUnitData" />
		</el-tab-pane>
		<el-tab-pane label="学分置换申请">
			<credit :member="member" :partyUnitData="this.partyUnitData" />
		</el-tab-pane>
		<el-tab-pane label="承担实习申请">
			<internship :member="member" :partyUnitData="this.partyUnitData" />
		</el-tab-pane>
		<el-tab-pane label="承担毕业论文（设计）申请">
			<bishe :member="member" :partyUnitData="this.partyUnitData" />
		</el-tab-pane>
	</el-tabs>
</template>

<script>
	import { getApplyList, pass, refuse, refuseAll, getUserStudioList, kick, partyUnitGetList } from "../../network/api";

	import registerForm from "./registerForm/index";
	import curriculumReplacement from "./curriculumReplacement/index";
	import curriculum from "./curriculum/index";
	import creditReplacement from "./creditReplacement/index";
	import credit from "./credit/index";
	import dissertationReplacement from "./dissertationReplacement/index";
	import internship from "./internship/index";
	import bishe from "./bishe/index";
	// import studioChage from "./studioChange/index";
	import joumal from "./journal/index";

	export default {
		data() {
			return {
				// 成员数据
				member: [],
				// 审核数据
				examine: [],
				// 表头
				chengyuan: "成员名单",
				activeTabName: "first",
				// 展示判断
				search: "",
				activeName: 0,
				removeLoading: false,
				key: "1",
				// 学校单位数据
				partyUnitData: [],
				// 提示开关
				msgKey: false,
			};
		},
		// studioChage
		components: { registerForm, curriculumReplacement, curriculum, creditReplacement, credit, dissertationReplacement, internship, bishe, joumal },
		methods: {
			// 通过
			handleEdit(record_id, row) {
				let user_id = sessionStorage.getItem("id");
				let token = localStorage.getItem("token");
				let teacher_id = sessionStorage.getItem("id");
				this.$set(row, "sendMsgLoading", true);
				pass(user_id, record_id, token)
					.then(res => {
						this.$set(row, "sendMsgLoading", false);
						res = res.data;
						if (res.code == 1) {
							this.$message({
								type: "success",
								message: res.msg,
							});
							getApplyList(teacher_id).then(res => {
								res = res.data;
								this.examine = res.data;
							});
						} else {
							this.$message({
								type: "info",
								message: res.msg,
							});
						}
					})
					.catch(() => {
						this.$set(row, "sendMsgLoading", false);
						this.$message({
							message: "网络出现错误!",
							type: "warning",
						});
					});
				// })
			},
			// 不通过
			handleDelete(record_id, row) {
				let user_id = sessionStorage.getItem("id");
				let token = localStorage.getItem("token");
				let teacher_id = sessionStorage.getItem("id");
				this.$set(row, "sendrefuseLoading", true);
				this.$confirm("是否拒绝?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
					customClass: "min-message",
				})
					.then(() => {
						refuse(user_id, record_id, token)
							.then(res => {
								this.$set(row, "sendMsgLoading", false);
								res = res.data;
								if (res.code == 1) {
									this.$message({
										type: "success",
										message: res.msg,
									});
									getApplyList(teacher_id, token).then(res => {
										res = res.data;
										this.examine = res.data;
									});
								} else {
									this.$message({
										type: "info",
										message: res.msg,
									});
								}
							})
							.catch(() => {
								this.$set(row, "sendrefuseLoading", false);
								this.$message({
									message: "网络出现错误!",
									type: "warning",
								});
							});
					})
					.catch(() => {
						this.$set(row, "sendrefuseLoading", false);
					});
			},
			handleOpen(key) {
				this.key = key;
			},
			// 成员移除事件
			// handleMemberDelete(index, row, i) {
			// 	console.log(index, row, i);
			// 	this.member[i].students.splice(index, 1);
			// },
			// 点击成员刷新页面
			handleClick(tab) {
				if (tab.index >= 4) {
					if (!this.msgKey) {
						this.$message({
							message: "请查看填写说明后在填写申请表！",
							type: "warning",
							duration: 4000,
							onClose: () => {
								this.msgKey = false;
							},
						});
					}
					this.msgKey = true;
				}

				let teacher_id = sessionStorage.getItem("id");
				let token = localStorage.getItem("token");
				if (tab.index == "1") {
					getApplyList(teacher_id, token).then(res => {
						res = res.data;
						this.examine = res.data;
						// this.examine = res.arr.data;
					});
				} else if (tab.index == "0") {
					getUserStudioList(teacher_id, token).then(res => {
						res = res.data;
						this.member = res.data;
					});
				}
			},
			refuseAll(studio_scode) {
				let token = localStorage.getItem("token");
				let teacher_id = sessionStorage.getItem("id");
				this.$confirm("是否拒绝剩余未审批学生？", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
					customClass: "min-message",
				}).then(() => {
					refuseAll(teacher_id, studio_scode, token)
						.then(res => {
							res = res.data;
							if (res.code == 1) {
								this.$message({
									type: "success",
									message: res.msg,
								});
								getApplyList(teacher_id, token).then(res => {
									res = res.data;
									this.examine = res.data;
								});
							} else {
								this.$message({
									type: "info",
									message: res.msg,
								});
							}
						})
						.catch(() => {
							this.$message({
								message: "网络出现错误!",
								type: "warning",
							});
						});
				});
			},
			introduce(introduce) {
				this.$alert(introduce, "个人自荐", {
					confirmButtonText: "确定",
					customClass: "min-message",
				});
			},
			// 移除
			removeMember(s, i, index) {
				this.$set(s, "removeLoading", true);
				const user_id = sessionStorage.getItem("id");

				this.$confirm("移除该学生, 是否继续?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				})
					.then(() => {
						kick(user_id, s.user_id, this.member[i].studio_scode)
							.then(res => {
								res = res.data;
								if (res.code === 1) {
									this.removeLoading = false;
									this.$message({
										message: "移除成功！",
										type: "success",
									});
									this.member[i].data.splice(index, index == 0 ? index + 1 : index);
									this.$set(s, "removeLoading", false);
								} else {
									this.$message.error("操作失败！");
									let teacher_id = sessionStorage.getItem("id");
									let token = localStorage.getItem("token");
									getUserStudioList(teacher_id, token).then(res => {
										res = res.data;
										this.member = res.data;
									});
								}
							})
							.catch(() => {
								this.$message.error("网络错误！请重新操作！");
							});
					})
					.catch(() => {
						this.$set(s, "removeLoading", false);
					});
			},
		},
		created() {
			document.title = "名师工作室-审核中心";
			let teacher_id = sessionStorage.getItem("id");
			let token = localStorage.getItem("token");
			getUserStudioList(teacher_id, token).then(res => {
				res = res.data;
				this.member = res.data;
			});
			partyUnitGetList().then(res => {
				this.partyUnitData = res.data.data;
			});
		},
	};
</script>

<style scoped lang="less">
	.type {
		font-size: 36px;
	}
	.el-tabs {
		min-height: 350px;
	}
	.operation .el-button {
		min-width: 80px;
		padding: 7px 7px;
		margin-left: -7px;
	}
	.intrBtn {
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

	@media screen and (max-width: 656px) {
		.el-tabs {
			margin-top: 10px;
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
