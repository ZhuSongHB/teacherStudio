<template>
	<div class="box">
		<el-form ref="registerForm" :model="registerForm" label-width="120px" :rules="rules">
			<el-form-item label="工作室名称" prop="studio_name">
				<el-input v-model.trim="registerForm.studio_name"></el-input>
			</el-form-item>
			<el-form-item label="负责人姓名">
				<el-input v-model.trim="registerForm.teacher_name" disabled=""></el-input>
			</el-form-item>
			<el-form-item label="负责人电话" prop="phone">
				<el-input v-model.trim="registerForm.phone"></el-input>
			</el-form-item>
			<el-form-item label="负责人邮箱" prop="email">
				<el-input v-model.trim="registerForm.email"></el-input>
			</el-form-item>

			<el-form-item label="直接管理单位" prop="management_unit_id">
				<el-select v-model="registerForm.management_unit_id" placeholder="选择直接管理单位">
					<el-option v-for="item in partyUnitData" :key="item.value" :label="item.unit_title" :value="item.unit_id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="监管单位" prop="regulatory_unit_id" label-width="100px">
				<el-select v-model="registerForm.regulatory_unit_id" placeholder="选择监管单位">
					<el-option v-for="item in partyUnitData" :key="item.value" :label="item.unit_title" :value="item.unit_id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="工作室类型" prop="studio_type" label-width="120px">
				<el-select v-model.trim="registerForm.studio_type" placeholder="请选择工作室类型">
					<el-option v-for="item in options" :key="item.id" :label="item.type" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="注册学期" prop="semester" label-width="100px">
				<el-select v-model.trim="registerForm.semester" placeholder="请选择申请注册学期">
					<el-option :label="firstSem" :value="firstSem"></el-option>
					<el-option :label="secondSem" :value="secondSem"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="工作室简介" class="desc" prop="introduce">
				<el-input type="textarea" v-model="registerForm.introduce" placeholder="介绍工作室具体活动内容，常规教学工作室写明所承担的课程或课程组" class="textarea"></el-input>
			</el-form-item>
			<el-divider>教师信息录入(含负责人)</el-divider>
			<div class="addTeacher">
				<div class="add">
					<el-input placeholder="教师工号" v-model.trim="tcrData.teacher_id"></el-input>
					<el-input placeholder="教师姓名" v-model.trim="tcrData.teacher_name"></el-input>
					<el-input placeholder="所属部门" v-model.trim="tcrData.department"></el-input>
					<el-select v-model.trim="tcrData.type" placeholder="人员类别">
						<el-option v-for="item in options1" :label="item.type" :value="item.id" :key="item.id"></el-option>
					</el-select>
					<el-input placeholder="职称/职务" v-model.trim="tcrData.duty"></el-input>
					<el-input placeholder="专业" v-model.trim="tcrData.major"></el-input>
					<el-button type="primary" icon="el-icon-circle-plus" @click="addTable" class="teacher_add">添加</el-button>
					<el-table :data="teacher" style="width: 100%">
						<el-table-column prop="teacher_id" label="教师工号"></el-table-column>
						<el-table-column prop="teacher_name" label="教师姓名"></el-table-column>
						<el-table-column prop="department" label="所属部门"></el-table-column>
						<el-table-column label="人员类别">
							<template slot-scope="scope">
								{{ options1[scope.row.type - 1].type }}
							</template>
						</el-table-column>
						<el-table-column prop="duty" label="职称/职务"></el-table-column>
						<el-table-column prop="major" label="专业"></el-table-column>
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
				<el-button type="primary" @click="registerFormSubmit">立即申请</el-button>
			</el-form-item>
		</el-form>
		<!-- 编辑提示框 -->
		<el-dialog title="修改信息" :visible.sync="editDialogVisible" width="30%">
			<el-form ref="registerForm" :model="registerForm" label-width="100px">
				<el-form-item label="教师工号">
					<el-input v-model.trim="personal.teacher_id"></el-input>
				</el-form-item>
				<el-form-item label="教师姓名">
					<el-input v-model.trim="personal.teacher_name"></el-input>
				</el-form-item>
				<el-form-item label="所属部门">
					<el-input v-model.trim="personal.department"></el-input>
				</el-form-item>
				<el-form-item label="人员类别">
					<el-select v-model.trim="personal.type" placeholder="人员类别">
						<el-option v-for="item in options1" :label="item.type" :value="item.id" :key="item.id"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="职称/职务">
					<el-input v-model.trim="personal.duty"></el-input>
				</el-form-item>
				<el-form-item label="专业">
					<el-input v-model.trim="personal.major"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleDete">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import { studioSubmit, teacher_type, getStudioTypeList } from "../../../network/api";

	export default {
		props: ["partyUnitData"],
		data() {
			// 邮箱规则
			var emailRule = (rule, value, callback) => {
				if (!value) {
					return callback(new Error("请输入负责人邮箱"));
				}
				var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
				if (reg.test(value)) {
					return;
				} else {
					callback("邮箱格式不正确");
				}
			};

			return {
				// 注册申请表
				registerForm: {
					studio_name: "",
					teacher_name: "",
					//  0 常规 1非常规
					studio_type: "",
					phone: "",
					email: "",
					semester: "",
					management_unit_id: "",
					regulatory_unit_id: "",
					introduce: "",
				},
				// 当前学期
				nowYear: null,
				nextYear: null,
				drawer: false,
				input: "",
				// 添加信息
				tcrData: { teacher_id: "", teacher_name: "", department: "", type: "", duty: "", major: "" },
				// 整体信息
				teacher: [],
				// 修改信息
				personal: { teacher_id: "", teacher_name: "", department: "", type: "", duty: "", major: "" },
				editDialogVisible: false,
				index: -1,
				// 工作室多选框
				options: [],
				// 人员多选框
				options1: [],
				// 规则
				rules: {
					studio_name: [{ required: true, message: "请输入工作室名称", trigger: "blur" }],
					email: [{ validator: emailRule, trigger: "blur", required: true }],
					phone: [
						{ required: true, message: "请输入负责人电话号码", trigger: "blur" },
						{ min: 11, max: 11, message: "请输入正确的电话号码", trigger: "blur" },
					],
					management_unit_id: [{ required: true }],
					regulatory_unit_id: [{ required: true }],
					studio_type: [{ required: true }],
					semester: [{ required: true }],
					introduce: [{ required: true, message: "请输入工作室简介", trigger: "blur" }],
				},
				rules2: {},
			};
		},
		computed: {
			firstSem: function() {
				return this.nowYear + "1";
			},
			secondSem: function() {
				return this.nowYear + "2";
			},
		},
		created() {
			this.nowYear = new Date().getFullYear();
			this.nextYear = new Date().getFullYear() + 1;
			this.registerForm.teacher_name = sessionStorage.getItem("name");
			teacher_type().then(res => {
				this.options1 = res.data.data;
			});
			getStudioTypeList().then(res => {
				this.options = res.data.data;
			});
		},
		methods: {
			// 表单
			registerFormSubmit() {
				const directorName = sessionStorage.getItem("name");
				if (directorName !== this.registerForm.teacher_name) {
					return;
				}
				const teacher_id = +sessionStorage.getItem("id");
				const teacher = this.teacher;

				const obj = {
					...this.registerForm,
					phone: parseInt(this.registerForm.phone),
					teacher_id,
					teacher,
				};
				// 判断填写是否完成
				let isOver = true;
				for (const iterator in obj) {
					if (!obj[iterator]) {
						isOver = false;
					}
				}
				if (!isOver) {
					this.$message({
						type: "warning",
						message: "工作室基础信息填写不完整!",
					});
					return;
				}

				// 提交
				this.$confirm("确认申请工作室吗?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				}).then(() => {
					studioSubmit(obj)
						.then(res => {
							res = res.data;
							if (res.code === 1) {
								this.$message({
									type: "success",
									message: "申请成功!",
								});
							} else {
								this.$message({
									type: "warning",
									message: "出现不明错误，请联系管理人员。",
								});
							}
						})
						.catch(() => {
							this.$message.error("网络出现错误");
						});
				});
			},
			addTable() {
				if (this.tcrData.teacher_name != "" && this.tcrData.department != "" && this.tcrData.type != "" && this.tcrData.duty != "" && this.tcrData.major != "") {
					this.teacher.push(this.tcrData);
					this.tcrData = {
						teacher_name: "",
						department: "",
						type: "",
						duty: "",
						major: "",
					};
				} else {
					this.$message({
						message: "教师信息填写不完全！",
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
					this.teacher.splice(index, 1);
					this.$message({
						type: "success",
						message: "删除成功!",
					});
				});
			},
			// 确定
			handleDete() {
				if (this.personal.teacher_name != "" && this.personal.department != "" && this.personal.type != "" && this.personal.duty != "" && this.personal.major != "") {
					this.teacher.splice(this.index, 1, this.personal);
					this.editDialogVisible = false;
				} else {
					this.$message({
						message: "信息填写不完全！",
						type: "warning",
					});
				}
			},
		},
	};
</script>

<style scoped lang="less">
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
				justify-content: center;
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
