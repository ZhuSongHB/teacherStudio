<template>
	<div>
		<div class="explain">
			<el-button type="text" class="expBtn" @click="exp = true">填写说明</el-button>
			<el-dialog title="操作说明" :visible.sync="exp" width="60%">
				<div class="expText">流程演示：</div>
				<p>负责人提交申请，经过各部门审核后，由教务处最终决定！</p>
				<el-steps :active="1" align-center>
					<el-step title="提交申请"></el-step>
					<el-step title="直接管理单位审核"></el-step>
					<el-step title="监管单位审核"></el-step>
					<el-step title="受理单位审核"></el-step>
					<el-step title="教务处审核"></el-step>
				</el-steps>
				<div class="expText">填写说明：</div>
				<div class="expContent">
					<!-- 因为工作室可能会涉及申请不同
					<span class="inp">受理单位</span>
					的审核（课程或者学分所在的受理单位)，所以在申请时，请负责人务必了解申请内容所在的受理单位，
					<span class="inp">按不同的受理单位进行提交申请！</span> -->
					置换的内容若涉及
					<span class="inp">多个受理单位</span>
					，请分多次进行提交（即每个受理单位提交一次）。请负责人务必了解申请内容所在的受理单位。
				</div>
				<div class="expText">上传附件:</div>
				<div class="expContent">
					证明材料若需上传附件，请将所有材料打包为一份zip/rar/7z格式压缩包后进行上传。
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="exp = false">取 消</el-button>
					<el-button type="primary" @click="exp = false">确 定</el-button>
				</span>
			</el-dialog>
		</div>
		<el-collapse v-model="activeName" id="cur" accordion @change="change">
			<el-collapse-item v-for="(item, i) in member" :key="i" :name="i" :title="item.studio_name">
				<template slot="title">
					<div class="title">
						{{ item.studio_name }}
					</div>
				</template>
				<el-form ref="curriculum" :model="curriculum" label-width="170px" :rules="rules">
					<!-- <el-form-item label="工作室等级" prop="name">
					<el-input v-model="registerForm.studioName" style="width:200px;"></el-input>
				</el-form-item> -->
					<div>
						<el-form-item label="受理单位" class="desc" prop="unit_id">
							<el-select v-model="curriculum.unit_id" placeholder="选择受理单位">
								<el-option v-for="item in partyUnitData" :key="item.unit_id" :label="item.unit_title" :value="item.unit_id"></el-option>
							</el-select>

							<div style="color:#9c9c9c">----- 若涉及不同受理单位，按受理单位进行提交 -----</div>
						</el-form-item>
						<el-form-item label="工作室的工作内容" class="desc" prop="job_content">
							<el-input type="textarea" v-model="curriculum.job_content" placeholder="工作室的工作内容" class="textarea"></el-input>
						</el-form-item>
					</div>
					<div class="test">
						<el-divider>毕设方案录入</el-divider>
						<div class="add">
							<!-- <el-input placeholder="承担内容的类型" v-model.trim="tcrData.type"></el-input> -->
							<el-select v-model.trim="tcrData.type" placeholder="承担内容的类型">
								<el-option v-for="item in options1" :label="item.type" :value="item.id" :key="item.id"></el-option>
							</el-select>
							<el-input placeholder="专业" v-model.trim="tcrData.major"></el-input>
							<el-input placeholder="所能承担的学生数" v-model.trim="tcrData.student_num"></el-input>
							<el-button icon="el-icon-circle-plus" type="primary" @click="addTableData">添加</el-button>
						</div>
						<el-table :data="tableData" stripe style="width: 600px">
							<el-table-column label="承担内容的类型">
								<template slot-scope="scope">
									{{ options1[scope.row.type - 1].type }}
								</template>
							</el-table-column>
							<el-table-column prop="major" label="专业"></el-table-column>
							<el-table-column prop="student_num" label="所能承担的学生数"></el-table-column>
							<el-table-column label="操作">
								<template slot-scope="scope">
									<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
									<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</el-form>
				<!-- 提交 -->
				<div class="btn_sub"><el-button type="primary" @click="registerFormSubmit(item)">立即申请</el-button></div>
			</el-collapse-item>
			<!-- 修改提示框 -->
			<el-dialog title="修改" :visible.sync="dialogVisible" width="30%">
				<div>承担内容的类型</div>
				<el-select v-model.trim="changeData.type" placeholder="承担内容的类型">
					<el-option v-for="item in options1" :label="item.type" :value="item.id" :key="item.id"></el-option>
				</el-select>
				<div>专业</div>
				<el-input placeholder="专业" v-model.trim="changeData.major"></el-input>
				<div>所能承担的学生数</div>
				<el-input placeholder="所能承担的学生数" v-model.trim="changeData.student_num"></el-input>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="edit">确 定</el-button>
				</span>
			</el-dialog>
		</el-collapse>
	</div>
</template>

<script>
	import { practiceSchemeGetTypeList, practiceSchemeGetSubmit } from "../../../network/api";
	export default {
		props: ["member", "partyUnitData"],
		created() {
			practiceSchemeGetTypeList().then(res => {
				this.options1 = res.data.data;
			});
		},
		data() {
			return {
				// 规则：
				rules: {
					unit_id: [{ required: true, message: "请选择选择受理单位", trigger: "blur" }],
					job_content: [{ required: true, message: "请输入工作室的工作内容", trigger: "blur" }],
				},
				activeName: [0],
				// 工作室的基本数据
				curriculum: { unit_id: "", job_content: "" },
				// 添加一条数据
				tcrData: {
					type: "",
					student_num: "",
					major: "",
				},
				// 表格里的数据
				tableData: [],
				dialogVisible: false,
				// 修改置换方案的数据
				changeData: {
					type: "",
					major: "",
					student_num: "",
				},
				options1: {},
				// 操作使用的下标
				index: -1,
				options: [],
				// 操作说明
				exp: false,
			};
		},
		methods: {
			// 提交
			registerFormSubmit(i) {
				let key = true;
				for (const iterator in this.curriculum) {
					if (!this.curriculum[iterator]) {
						key = false;
					}
				}
				if (!key) {
					this.$message({
						type: "warning",
						message: "承担实习毕业论文（设计）方案基础信息填写不完整!",
					});
					return;
				}

				// studio_scode	整型	√	工作室id
				// teacher_id	整型	√	负责人id
				// teacher_name	字符串	√	负责人姓名
				// unit_id	整型	√	受理单位id
				// unit_title	字符串	√	受理单位名称
				// job_content	字符串	√	工作室工作内容
				// apply_content	json数组	√	申请内容
				// type	整型	√	承担内容的类型
				// major	字符串	√	专业
				// student_num	整型	√	所承担的学生数
				let unit_title = "";
				for (const item of this.partyUnitData) {
					if (item.unit_id == this.curriculum.unit_id) {
						unit_title = item.unit_title;
					}
				}

				const apply_content = this.tableData;

				const obj = {
					studio_scode: i.studio_scode,
					teacher_id: +sessionStorage.getItem("id"),
					teacher_name: sessionStorage.getItem("name"),
					unit_id: this.curriculum.unit_id,
					unit_title,
					job_content: this.curriculum.job_content,
					apply_content,
				};

				this.$confirm("确认提交实习毕业论文（设计）方案申请吗?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				}).then(() => {
					practiceSchemeGetSubmit(obj)
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
									message: "申请失败！",
								});
							}
						})
						.catch(() => {
							this.$message.error("网络出现错误");
						});
				});
			},
			// 添加到下列表格中
			addTableData() {
				if (this.tcrData.type != "" && this.tcrData.student_num != "" && this.tcrData.major != "") {
					this.tableData.push(this.tcrData);
					this.tcrData = {
						type: "",
						student_num: "",
						major: "",
					};
				} else {
					this.$message({
						message: "信息填写不完整！",
						type: "warning",
					});
				}
			},
			// 切换工作室，清空数据
			change() {
				this.curriculum = {
					job_content: "",
				};
				this.tcrData = {
					major: "",
					student_num: "",
					type: "",
				};
				this.tableData = [];
			},
			// 修改 删除
			handleEdit(i, row) {
				this.dialogVisible = true;
				this.changeData = { ...row };
				this.index = i;
			},
			edit() {
				this.dialogVisible = false;
				this.tableData.splice(this.index, 1, this.changeData);
			},
			handleDelete(i) {
				this.$confirm("删除该置换方案, 是否继续?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				})
					.then(() => {
						this.tableData.splice(i, 1);
						this.$message({
							type: "success",
							message: "删除成功!",
						});
					})
					.catch(() => {});
			},
		},
	};
</script>

<style scoped lang="less">
	.title {
		font-size: 24px;
		font-weight: bold;
	}
	.el-form {
		margin-top: 20px;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		.textarea {
			width: 500px;
		}
		.el-table {
			margin: 10px auto;
		}
		.test {
			flex-basis: 80%;
			.add {
				display: flex;
				justify-content: center;
				flex-wrap: wrap;
				.el-input {
					flex-basis: 30%;
					margin-right: 10px;
				}
				.el-select {
					flex-basis: 30%;
					margin-right: 10px;
				}
				.el-button {
					margin-top: 10px;
				}
			}
		}
	}

	.btn_sub {
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}
	.el-dialog {
		div {
			margin-top: 10px;
		}
		.el-input {
			margin-top: 10px;
		}
		.el-select {
			width: 100%;
		}
	}
	.explain {
		text-align: center;
		.expText {
			text-align: left;
			font-size: 24px;
			font-weight: bold;
		}
		p {
			color: red;
			font-size: 20px;
			margin-bottom: 10px;
		}
		.expBtn {
			font-size: 24px;
		}
		.expContent {
			text-indent: 2em;
			text-align: left;
			font-size: 20px;
			.inp {
				color: red;
				vertical-align: text-bottom;
			}
		}
	}
</style>
