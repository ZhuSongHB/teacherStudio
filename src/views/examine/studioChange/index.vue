<template>
	<el-collapse v-model="activeName" id="cur" accordion @change="change">
		<el-collapse-item v-for="(item, i) in member" :key="i" :name="i" :title="item.studio_name">
			<template slot="title">
				<div class="title">
					{{ item.studio_name }}
				</div>
			</template>
			<el-form ref="registerForm" :model="registerForm" label-width="100px">
				<el-form-item label="工作室名称">
					<el-input v-model.trim="registerForm.studioName"></el-input>
				</el-form-item>
				<el-form-item label="负责人姓名">
					<el-input v-model.trim="registerForm.name"></el-input>
				</el-form-item>
				<el-form-item label="负责人电话">
					<el-input v-model.trim="registerForm.telephone"></el-input>
				</el-form-item>
				<el-form-item label="负责人邮箱">
					<el-input v-model.trim="registerForm.email"></el-input>
				</el-form-item>

				<el-form-item label="直接管理单位">
					<el-input v-model.trim="registerForm.direct"></el-input>
				</el-form-item>
				<el-form-item label="监管单位">
					<el-input v-model.trim="registerForm.supervise"></el-input>
				</el-form-item>
				<el-form-item label="工作室类型">
					<el-select v-model.trim="registerForm.studioType" placeholder="请选择工作室类型">
						<!-- <el-option label="常规工作室" value="0"></el-option>
					<el-option label="非常规工作室" value="1"></el-option> -->
						<el-option-group v-for="group in options" :key="group.label" :label="group.label">
							<el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-option-group>
					</el-select>
				</el-form-item>
				<el-form-item label="注册学期">
					<el-select v-model.trim="registerForm.sem" placeholder="请选择申请注册学期">
						<el-option :label="firstSem" :value="firstSem"></el-option>
						<el-option :label="secondSem" :value="secondSem"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="工作室简介" class="desc">
					<el-input type="textarea" v-model.trim="registerForm.desc" placeholder="介绍工作室具体活动内容，常规教学工作室写明所承担的课程或课程组" class="textarea"></el-input>
				</el-form-item>
				<el-divider>教师信息录入</el-divider>
				<div class="addTeacher">
					<div class="add">
						<el-input placeholder="教师姓名" v-model.trim="tcrData.tcrName"></el-input>
						<el-input placeholder="所属部门" v-model.trim="tcrData.tcrDep"></el-input>
						<el-select v-model.trim="tcrData.tcrPer" placeholder="人员类别">
							<el-option v-for="item in options1" :label="item" :value="item" :key="item"></el-option>
						</el-select>
						<el-input placeholder="职称/职务" v-model.trim="tcrData.tcrPost"></el-input>
						<el-input placeholder="专业" v-model.trim="tcrData.tcrMajor"></el-input>
						<el-button type="primary" icon="el-icon-circle-plus" @click="addTable">添加</el-button>
						<el-table :data="teacherData" style="width: 100%">
							<el-table-column prop="tcrName" label="教师姓名"></el-table-column>
							<el-table-column prop="tcrDep" label="所属部门"></el-table-column>
							<el-table-column prop="tcrPer" label="人员类别"></el-table-column>
							<el-table-column prop="tcrPost" label="职称/职务"></el-table-column>
							<el-table-column prop="tcrMajor" label="专业"></el-table-column>
							<el-table-column label="操作">
								<template slot-scope="scope">
									<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
									<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</div>
				<el-form-item class="sub_btn">
					<el-button type="primary" @click="registerFormSubmit" disabled title="该功能未开放">立即申请</el-button>
				</el-form-item>
			</el-form>
		</el-collapse-item>
		<el-dialog title="修改信息" :visible.sync="editDialogVisible" width="30%">
			<el-form ref="registerForm" :model="registerForm" label-width="100px">
				<el-form-item label="教师姓名" prop="name">
					<el-input v-model.trim="personal.tcrName"></el-input>
				</el-form-item>
				<el-form-item label="所属部门">
					<el-input v-model.trim="personal.tcrDep"></el-input>
				</el-form-item>
				<el-form-item label="所属部门">
					<el-select v-model.trim="personal.tcrPer" placeholder="人员类别">
						<el-option v-for="item in options1" :label="item" :value="item" :key="item"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="职称/职务">
					<el-input v-model.trim="personal.tcrPost"></el-input>
				</el-form-item>
				<el-form-item label="专业">
					<el-input v-model.trim="personal.tcrMajor"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleDete">确 定</el-button>
			</span>
		</el-dialog>
	</el-collapse>
</template>

<script>
	export default {
		props: ["member"],
		data() {
			return {
				activeName: 0,
				// 注册申请表
				registerForm: {
					studioName: "",
					name: "",
					//  0 常规 1非常规
					studioType: "",
					telephone: "",
					email: "",
					sem: "",
					direct: "",
					supervise: "",
					desc: "",
				},
				// 当前学期
				nowYear: null,
				nextYear: null,
				drawer: false,
				input: "",
				// 添加信息
				tcrData: {
					tcrName: "",
					tcrDep: "",
					tcrPer: "",
					tcrPost: "",
					tcrMajor: "",
				},
				// 整体信息
				teacherData: [],
				// 修改信息
				personal: {
					tcrName: "",
					tcrDep: "",
					tcrPer: "",
					tcrPost: "",
					tcrMajor: "",
				},
				editDialogVisible: false,
				index: -1,
				// 工作室多选框
				options: [
					{
						label: "常规工作室",
						options: [
							{
								value: "常规教学",
								label: "常规教学",
							},
							{
								value: "考研辅导",
								label: "考研辅导",
							},
							{
								value: "职业证书培训",
								label: "职业证书培训",
							},
						],
					},
					{
						label: "非常规工作室",
						options: [
							{
								value: "科研",
								label: "科研",
							},
							{
								value: "学科竞赛",
								label: "学科竞赛",
							},
							{
								value: "社会实践",
								label: "社会实践",
							},
							{
								value: "创新创业",
								label: "创新创业",
							},
							{
								value: "校内服务",
								label: "校内服务",
							},
							{
								value: "社会服务",
								label: "社会服务",
							},
							{
								value: "横向项目",
								label: "横向项目",
							},
						],
					},
				],
				// 人员多选框
				options1: {
					fullTimeTeacher: "专职教师",
					professionalTeachers: "行业教师",
					invitedExperts: "特邀专家",
					supportStaff: "教辅人员",
					instructor: "辅导员",
					administrativeStaff: "行政人员",
					externalTeachers: "外聘教师",
				},
			};
		},
		computed: {
			firstSem: function() {
				return this.nowYear + "-" + this.nextYear + "-" + 1;
			},
			secondSem: function() {
				return this.nowYear + "-" + this.nextYear + "-" + 2;
			},
		},
		methods: {
			// 表单
			registerFormSubmit() {
				const directorName = sessionStorage.getItem("name");
				if (directorName !== this.registerForm.name) {
					return;
				}
			},
			addTable() {
				if (this.tcrData.tcrName != "" && this.tcrData.tcrDep != "" && this.tcrData.tcrPer != "" && this.tcrData.tcrPost != "" && this.tcrData.tcrMajor != "") {
					this.teacherData.push(this.tcrData);
					this.tcrData = {
						tcrName: "",
						tcrDep: "",
						tcrPer: "",
						tcrPost: "",
						tcrMajor: "",
					};
				} else {
					this.$message({
						message: "信息填写不完全！",
						type: "warning",
					});
				}
			},
			// 修改
			handleEdit(index, row) {
				this.editDialogVisible = true;
				this.personal = { ...row };
				this.index = index;
			},
			// 删除
			handleDelete(index) {
				this.$confirm("删除该老师信息, 是否继续?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				}).then(() => {
					this.teacherData.splice(index, 1);
					this.$message({
						type: "success",
						message: "删除成功!",
					});
				});
			},
			// 确定
			handleDete() {
				if (this.personal.tcrName != "" && this.personal.tcrDep != "" && this.personal.tcrPer != "" && this.personal.tcrPost != "" && this.personal.tcrMajor != "") {
					this.teacherData.splice(this.index, 1, this.personal);
					this.editDialogVisible = false;
				} else {
					this.$message({
						message: "信息填写不完全！",
						type: "warning",
					});
				}
			},
			change() {
				this.registerForm = {
					studioName: "",
					name: "",
					//  0 常规 1非常规
					studioType: "",
					telephone: "",
					email: "",
					sem: "",
					direct: "",
					supervise: "",
					desc: "",
				};
				this.teacherData = [];
				this.personal = {
					tcrName: "",
					tcrDep: "",
					tcrPer: "",
					tcrPost: "",
					tcrMajor: "",
				};
			},
		},
		created() {
			this.nowYear = new Date().getFullYear();
			this.nextYear = new Date().getFullYear() + 1;
		},
	};
</script>

<style scoped lang="less">
	.title {
		font-size: 24px;
		font-weight: bold;
	}
	.box {
		min-width: 60%;
		margin: 30px auto;
		overflow: auto;
	}
	.el-form {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		.el-form-item {
			margin-left: 20px;
		}
		.sub_btn {
			margin: 20px auto;
			.el-button {
				transform: translateX(-50%);
			}
		}
		.desc {
			min-width: 50%;
		}
		.addTeacher {
			// border: 1px solid black;
			padding: 0;
			margin-left: 10px;
			flex-basis: 100%;
			display: flex;
			justify-content: center;
			.add {
				max-width: 1000px;
				padding: 20px;
				display: flex;
				flex-wrap: wrap;
				align-content: flex-start;
				justify-content: flex-start;
				.el-input {
					padding: 10px 10px 0 0;
					flex-basis: 30%;
				}
				.el-select {
					padding: 10px 10px 0 0;
					flex-basis: 30%;
				}
				.el-button {
					margin-top: 10px;
					height: 40px;
					flex-basis: 30%;
				}
				.el-table {
					flex-basis: 100%;
				}
			}
		}
	}
</style>
