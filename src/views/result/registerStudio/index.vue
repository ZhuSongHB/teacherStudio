<template>
	<div>
		<el-table :data="tableData" style="width: 100%" v-loading="loading">
			<el-table-column prop="apply_time" label="日期"></el-table-column>
			<el-table-column prop="studio_name" label="工作室名称"></el-table-column>
			<el-table-column prop="state" label="状态"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.row)">查看</el-button>
					<el-button v-if="scope.row.state == '审批中'" size="mini" type="danger" @click="handleDelete(scope.row)">撤销</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog :title="studioData.studio_name" :visible.sync="dialogVisible" width="60%" class="box">
			<el-form ref="studioData" :model="studioData" label-width="100px">
				<el-form-item label="工作室名称">
					<el-input v-model.trim="studioData.studio_name" disabled></el-input>
				</el-form-item>
				<el-form-item label="负责人姓名">
					<el-input v-model.trim="studioData.teacher_name" disabled></el-input>
				</el-form-item>
				<el-form-item label="负责人电话">
					<el-input v-model.trim="studioData.phone" disabled></el-input>
				</el-form-item>
				<el-form-item label="负责人邮箱">
					<el-input v-model.trim="studioData.email" disabled></el-input>
				</el-form-item>
				<el-form-item label="工作室类型">
					<el-input v-model.trim="studioData.studio_type" disabled></el-input>
				</el-form-item>
				<el-form-item label="注册学期">
					<el-input v-model.trim="studioData.semester" disabled></el-input>
				</el-form-item>
				<el-form-item label="直接管理单位">
					<el-input v-model.trim="studioData.management_unit_name" disabled></el-input>
				</el-form-item>
				<el-form-item label="监管单位">
					<el-input v-model.trim="studioData.regulatory_unit_name" disabled></el-input>
				</el-form-item>
				<el-form-item label="工作室简介" class="desc">
					<el-input type="textarea" class="textarea" disabled v-model.trim="studioData.introduce"></el-input>
				</el-form-item>
				<el-divider>教师信息</el-divider>
				<div class="addTeacher">
					<el-table :data="teacher" style="width: 100%">
						<el-table-column prop="teacher_id" label="教师工号"></el-table-column>
						<el-table-column prop="teacher_name" label="教师姓名"></el-table-column>
						<el-table-column prop="department" label="所属部门"></el-table-column>
						<el-table-column prop="type" label="人员类别"></el-table-column>
						<el-table-column prop="duty" label="职称/职务"></el-table-column>
						<el-table-column prop="major" label="专业"></el-table-column>
					</el-table>
				</div>
				<el-divider>直接管理单位</el-divider>
				<el-tag size="medium" :type="studioData.management_unit_feedback == 0 ? '' : studioData.management_unit_feedback == 1 ? 'success' : 'danger'">
					{{ studioData.management_unit_feedback == 0 ? "审批中" : studioData.management_unit_feedback == 1 ? "同意" : "不同意" }}
				</el-tag>

				<template v-if="studioData.management_unit_feedback !== 0 || studioData.management_unit_feedback !== -1">
					<div class="opinion">
						<p>直接管理单位：{{ studioData.management_unit_name }}</p>
						<span>直接管理单位意见：</span>
						<div>
							{{ studioData.management_unit_feedback_content }}
						</div>
						<p>审批人：{{ studioData.management_unit_signer }}</p>
						<p>审批时间：{{ studioData.management_unit_feedback_time }}</p>
					</div>
				</template>
				<el-divider>监管单位</el-divider>
				<el-tag size="medium" :type="studioData.regulatory_unit_feedback == 0 ? '' : studioData.regulatory_unit_feedback == 1 ? 'success' : studioData.regulatory_unit_feedback == -1 ? 'info' : 'danger'">
					{{ studioData.regulatory_unit_feedback == 0 ? "审批中" : studioData.regulatory_unit_feedback == 1 ? "同意" : studioData.regulatory_unit_feedback == -1 ? "待审批" : "不同意" }}
				</el-tag>
				<template v-if="studioData.regulatory_unit_feedback !== 0 || studioData.regulatory_unit_feedback !== -1">
					<div class="opinion">
						<p>监管单位：{{ studioData.regulatory_unit_name }}</p>
						<span>监管单位意见：</span>
						<div>
							{{ studioData.regulatory_unit_feedback_content }}
						</div>
						<p>审批人：{{ studioData.regulatory_unit_signer }}</p>
						<p>审批时间：{{ studioData.regulatory_unit_feedback_time }}</p>
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
	import { teacherGetRegisterLister, teacherRsegisterCancel, teacherGetRsegisterLook } from "../../../network/api";

	export default {
		data() {
			return {
				tableData: [],
				loading: true,
				dialogVisible: false,
				// 查看工作室数据
				studioData: {},
				teacher: [],
			};
		},
		methods: {
			// 查看
			handleEdit(tableData) {
				teacherGetRsegisterLook({ record_id: tableData.id }).then(res => {
					this.dialogVisible = true;
					this.studioData = res.data.data;
					let teacher = [];
					for (const item of res.data.data.teacher) {
						teacher.push(item);
					}
					this.teacher = teacher;
				});
			},
			// 撤销
			handleDelete(tableData) {
				// 提交
				this.$confirm("确认撤销申请工作室吗?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				}).then(() => {
					teacherRsegisterCancel({ record_id: tableData.id })
						.then(res => {
							this.loading = true;
							if (res.data.code == 1) {
								const teacher_id = sessionStorage.getItem("id");
								teacherGetRegisterLister({ teacher_id: teacher_id }).then(res => {
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
		},
		created() {
			const teacher_id = sessionStorage.getItem("id");
			teacherGetRegisterLister({ teacher_id: teacher_id }).then(res => {
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
				padding-bottom: 20px;
			}
		}
	}
</style>
