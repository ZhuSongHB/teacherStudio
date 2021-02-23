<template>
	<div>
		<el-collapse v-model="activeNames" class="elc">
			<el-collapse-item v-for="(item, index) in tableData" :key="item.studio_name" :name="index">
				<template slot="title">
					<div class="title">
						{{ item.studio_name }}
					</div>
				</template>
				<el-table :data="item.record_list" style="width: 100%" v-loading="loading">
					<el-table-column prop="id" label="记录编号"></el-table-column>
					<el-table-column prop="apply_time" label="日期"></el-table-column>
					<el-table-column prop="state" label="状态"></el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button size="mini" @click="handleEdit(scope.row)">查看</el-button>
							<el-button v-if="scope.row.state == '审批中'" size="mini" type="danger" @click="handleDelete(scope.row)">撤销</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-collapse-item>
		</el-collapse>

		<el-dialog :title="studioData.studio_name" :visible.sync="dialogVisible" width="60%" class="box">
			<el-form ref="studioData" :model="studioData" label-width="150px">
				<el-form-item label="工作室名称">
					<el-input v-model.trim="studioData.studio_name" disabled></el-input>
				</el-form-item>
				<el-form-item label="负责人姓名">
					<el-input v-model.trim="studioData.teacher_name" disabled></el-input>
				</el-form-item>
				<el-form-item label="受理单位名称">
					<el-input v-model.trim="studioData.unit_title" disabled></el-input>
				</el-form-item>
				<el-form-item label="申请理由" class="desc">
					<el-input v-model.trim="studioData.reason" disabled type="textarea"></el-input>
				</el-form-item>
				<el-divider>信息列表</el-divider>
				<div class="addTeacher">
					<el-table :data="student" style="width: 100%">
						<el-table-column prop="student_id" label="学生学号"></el-table-column>
						<el-table-column prop="student_name" label="学生姓名"></el-table-column>
						<el-table-column prop="type" label="实习类型"></el-table-column>
						<el-table-column prop="teacher_name" label="指导老师姓名"></el-table-column>
						<el-table-column prop="explain" label="学生工作情况说明">
							<template slot-scope="scope">
								<el-button type="primary" style="width:80%;" @click="handleLook(scope.row.explain)">查看</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<el-divider>受理单位</el-divider>
				<el-tag size="medium" :type="studioData.unit_feedback == 0 ? '' : studioData.unit_feedback == 1 ? 'success' : studioData.unit_feedback == -1 ? 'info' : 'danger'">
					{{ studioData.unit_feedback == 0 ? "审批中" : studioData.unit_feedback == 1 ? "同意" : studioData.unit_feedback == -1 ? "待审批" : "不同意" }}
				</el-tag>
				<template v-if="studioData.unit_feedback !== 0 || studioData.unit_feedback !== -1">
					<div class="opinion">
						<p>受理单位：{{ studioData.unit_title }}</p>
						<span>受理单位意见：</span>
						<div>
							{{ studioData.unit_feedback_content }}
						</div>
						<p>审批人：{{ studioData.unit_signer }}</p>
						<p>审批时间：{{ studioData.unit_feedback_time }}</p>
					</div>
				</template>
				<el-divider>教务处</el-divider>
				<el-tag size="medium" :type="studioData.academic_office_feedback == 0 ? '' : studioData.academic_office_feedback == 1 ? 'success' : studioData.academic_office_feedback == -1 ? 'info' : 'danger'">
					{{ studioData.academic_office_feedback == 0 ? "审批中" : studioData.academic_office_feedback == 1 ? "同意" : studioData.academic_office_feedback == -1 ? "待审批" : "不同意" }}
				</el-tag>
				<template v-if="studioData.academic_office_feedback !== 0 || studioData.academic_office_feedback !== -1">
					<div class="opinion">
						<span>教务处意见：</span>
						<div>
							{{ studioData.academic_office_feedback_content }}
						</div>
						<p>审批人：{{ studioData.academic_office_signer }}</p>
						<p>审批时间：{{ studioData.academic_office_feedback_time }}</p>
					</div>
				</template>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import { assumePracticeApplyGetList, assumePracticeApplyTable, assumePracticeApplyCancel } from "../../../network/api";

	export default {
		data() {
			return {
				tableData: [],
				loading: true,
				dialogVisible: false,
				// 查看工作室数据
				studioData: {},
				student: [],
				// 折叠卡
				activeNames: [0],
			};
		},
		methods: {
			// 查看
			handleEdit(tableData) {
				assumePracticeApplyTable({ record_id: tableData.id }).then(res => {
					this.studioData = res.data.data;
					this.dialogVisible = true;
					const student = [];
					for (const item of res.data.data.student) {
						student.push(item);
					}
					this.student = student;
					// this.scheme
				});
			},
			// 撤销
			handleDelete(tableData) {
				// 提交
				this.$confirm("确认承担实习申请吗?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				}).then(() => {
					assumePracticeApplyCancel({ record_id: tableData.id })
						.then(res => {
							this.loading = true;
							if (res.data.code == 1) {
								const teacher_id = sessionStorage.getItem("id");
								assumePracticeApplyGetList({ teacher_id: teacher_id }).then(res => {
									this.loading = false;
									this.tableData = res.data.data;
								});
								this.$message({
									type: "success",
									message: "撤销申请成功!",
								});
							} else {
								this.$message({
									type: "warning",
									message: "该申请审批已结束，无法撤销!",
								});
							}
						})
						.catch(() => {
							this.$message.error("网络出现错误");
						});
				});
			},
			// 查看工作情况说明
			handleLook(i) {
				this.$alert(i, "学生工作情况说明", {
					confirmButtonText: "确定",
				});
			},
		},
		created() {
			const teacher_id = sessionStorage.getItem("id");
			assumePracticeApplyGetList({ teacher_id: teacher_id }).then(res => {
				this.loading = false;
				this.tableData = res.data.data;
			});
		},
	};
</script>

<style lang="less" scoped>
	.box {
		.el-form {
			display: flex;
			flex-wrap: wrap;
			.desc {
				flex-basis: 60%;
			}
			.addTeacher {
				flex-basis: 100%;
			}
		}
		.opinion {
			flex-basis: 100%;
			padding-top: 10px;
			p {
				padding-bottom: 10px;
			}
			div {
				padding-top: 10px;
				text-indent: 2em;
			}
		}
	}
	.title {
		font-size: 24px;
		font-weight: bold;
	}
</style>
