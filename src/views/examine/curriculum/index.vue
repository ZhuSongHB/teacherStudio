<template>
	<div>
		<div class="explain">
			<el-button type="text" class="expBtn" @click="exp = true">填写说明</el-button>
			<el-dialog title="操作说明" :visible.sync="exp" width="60%">
				<div class="expText">流程演示：</div>
				<p>负责人提交申请，经过各部门审核后，由教务处最终决定！</p>
				<el-steps :active="1" align-center>
					<el-step title="提交申请"></el-step>
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
		<el-collapse v-model="activeName" id="cur" accordion @change="change(activeName)" v-loading="uploadLoading" element-loading-text="上传附件中......">
			<el-collapse-item v-for="(item, i) in member" :key="i" :name="i" :title="item.studio_name">
				<template slot="title">
					<div class="title">
						{{ item.studio_name }}
					</div>
				</template>
				<el-form ref="sub_data" :model="sub_data" label-width="160px" :rules="rules">
					<el-form-item label="置换方案编号" prop="project_code">
						<!-- <el-input v-model="project_code" style="width:20%;"></el-input> -->
						<el-select v-model="project_code" placeholder="选择置换方案编号">
							<el-option v-for="item in projectCodeArr" :key="item" :label="item" :value="item"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="受理单位" class="desc" prop="unit_id">
						<el-select v-model="sub_data.unit_id" style="width:330px;" placeholder="受理单位请选择置换的课程所在的开课单位">
							<el-option v-for="item in partyUnitData" :key="item.unit_id" :label="item.unit_title" :value="item.unit_id"></el-option>
						</el-select>

						<div style="color:#9c9c9c">----- 若涉及不同受理单位，按受理单位进行提交 -----</div>
					</el-form-item>
					<el-form-item label="申请理由" prop="reason">
						<el-input v-model="sub_data.reason" type="textarea" placeholder="介绍学生在工作室中的工作成果，抵换课程或课程组的方式，材料提交方式，成绩认定方式等" style="width:80%;"></el-input>
					</el-form-item>
					<el-form-item label="上传附件 (可选)">
						<!-- 上传 -->
						<el-upload
							class="upload-demo"
							ref="upload"
							action="/api/teacherstudio/upload"
							:on-error="uploadError"
							:on-success="handleAvatarSuccess"
							:limit="1"
							accept=".zip,.rar,.7z"
							:data="FromData"
							:file-list="fileList"
							:auto-upload="false"
							:on-exceed="handlExceed"
						>
							<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
							<span slot="tip" class="el-upload__tip">仅支持上传 zip/rar/7z 文件</span>
						</el-upload>
					</el-form-item>
					<el-divider>学生名单录入</el-divider>
					<div class="add">
						<el-input placeholder="学生姓名" v-model.trim="tcrData.student_name"></el-input>
						<el-input placeholder="学生学号" v-model.trim="tcrData.student_id"></el-input>
						<el-input placeholder="课程名称" v-model.trim="tcrData.course"></el-input>
						<el-input placeholder="课程成绩" v-model.trim="tcrData.mark"></el-input>
						<el-input placeholder="学生工作情况说明" type="textarea" v-model="tcrData.explain"></el-input>
						<el-button icon="el-icon-circle-plus" type="primary" @click="addTableData">添加</el-button>
					</div>
					<el-table :data="tableData" stripe style="width: 80%">
						<el-table-column prop="student_name" label="学生姓名"></el-table-column>
						<el-table-column prop="student_id" label="学生学号"></el-table-column>
						<el-table-column prop="course" label="课程名称"></el-table-column>
						<el-table-column prop="mark" label="成绩"></el-table-column>
						<el-table-column prop="explain" label="学生工作情况说明">
							<template slot-scope="scope">
								<el-button class="intrBtn" @click="seeExplain(scope.row)" type="success">工作情况说明</el-button>
							</template>
						</el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
								<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-form>
				<!-- 提交 -->
				<div class="btn_sub"><el-button type="primary" @click="btn_sub(item, i)">立即申请</el-button></div>
			</el-collapse-item>
			<!-- 修改提示框 -->
			<el-dialog title="修改" :visible.sync="dialogVisible" width="30%">
				<div>学生姓名</div>
				<el-input placeholder="学生姓名" v-model.trim="changeData.student_name"></el-input>
				<div>学生学号</div>
				<el-input placeholder="学生学号" v-model.trim="changeData.student_id"></el-input>
				<div>课程名称</div>
				<el-input placeholder="课程名称" v-model.trim="changeData.course"></el-input>
				<div>课程成绩</div>
				<el-input placeholder="课程成绩" v-model.trim="changeData.mark"></el-input>
				<div>学生工作情况说明</div>
				<el-input placeholder="学生工作情况说明" v-model="changeData.explain" type="textarea"></el-input>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="edit">确 定</el-button>
				</span>
			</el-dialog>
		</el-collapse>
	</div>
</template>

<script>
	import { courseReplaceApplySubmit, getCourseProjectCode } from "../../../network/api";
	export default {
		props: ["member", "partyUnitData"],
		data() {
			return {
				fileList: [],
				FromData: {
					record_id: "",
					type: "",
				},
				// 规则
				rules: {
					unit_id: [{ required: true, message: "请选择选择受理单位", trigger: "blur" }],
					project_code: [{ required: true, message: "请输入工作室的工作内容", trigger: "blur" }],
					reason: [{ required: true, message: "请输入申请理由", trigger: "blur" }],
				},
				activeName: [0],
				// 置换方案id
				project_code: "",
				projectCodeArr: [],
				// 头部信息
				sub_data: {
					unit_id: "",
					unit_title: "",
					reason: "",
				},
				uploadLoading: false,
				// 添加一条数据
				tcrData: {
					student_name: "",
					student_id: "",
					course: "",
					mark: "",
					explain: "",
				},
				// 表格里的数据
				tableData: [],
				dialogVisible: false,
				// 修改置换方案的数据
				changeData: {},
				// 操作使用的下标
				index: -1,
				// 操作说明
				exp: false,
			};
		},
		methods: {
			// 上传
			handlExceed() {
				this.$message({
					type: "warning",
					message: "仅支持上传一个附件，如需更换文件请删除列表里文件！",
				});
			},
			handleAvatarSuccess() {
				// 提交后
				this.uploadLoading = false;
				this.$message({
					type: "success",
					message: "申请成功!",
				});
			},
			uploadError() {
				// 提交失败
				this.uploadLoading = false;
				this.$message.error("提交附件失败！");
			},
			// 提交
			btn_sub(i, index) {
				// studio_scode	整型	√	工作室id
				// project_code	字符串	√	置换方案编号
				// unit_id	整型	√	受理单位id
				// unit_title	字符串	√	受理单位名称
				// reason	字符串	√	申请理由
				// teacher_id	整型	√	负责人id
				// teacher_name	字符串	√	负责人姓名
				// student	json数组	√	学生列表
				// student_id	整型	√	学生学号
				// student_name	字符串	√	学生姓名
				// course	字符串	√	课程名称
				// type	整型	√	人员类别
				// mark	字符串	√	成绩
				// explain	字符串	√	学生工作情况说明

				for (const item of this.partyUnitData) {
					if (item.unit_id == this.sub_data.unit_id) {
						this.sub_data.unit_title = item.unit_title;
					}
				}
				const student = this.tableData;
				const obj = {
					studio_scode: i.studio_scode,
					project_code: this.project_code,
					teacher_id: +sessionStorage.getItem("id"),
					teacher_name: sessionStorage.getItem("name"),
					...this.sub_data,
					student,
				};

				let key = true;
				for (const iterator in obj) {
					if (!obj[iterator]) {
						key = false;
					}
				}
				if (!key) {
					this.$message({
						type: "warning",
						message: "课程置换基础信息填写不完整!",
					});
					return;
				}

				this.$confirm("确认提交课程置换申请吗?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				}).then(() => {
					courseReplaceApplySubmit(obj)
						.then(res => {
							res = res.data;
							if (res.code === 1) {
								// 提交文件
								if (this.$refs.upload[index].uploadFiles.length > 0) {
									this.FromData.record_id = res.data.record_id;
									this.FromData.type = 1;
									this.uploadLoading = true;
									this.$refs.upload[index].submit();
								} else {
									// 提交后
									this.$message({
										type: "success",
										message: "申请成功!",
									});
								}
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
				if (this.tcrData.student_name != "" && this.tcrData.student_id != "" && this.tcrData.course != "" && this.tcrData.mark != "" && this.tcrData.explain != "") {
					this.tableData.push(this.tcrData);
					this.tcrData = {
						student_name: "",
						student_id: "",
						course: "",
						mark: "",
						explain: "",
					};
				} else {
					this.$message({
						message: "信息填写不完整！",
						type: "warning",
					});
				}
			},
			// 切换工作室，清空数据
			change(i) {
				this.sub_data = {
					unit_id: "",
					unit_title: "",
					reason: "",
				};
				this.tcrData = {
					student_name: "",
					student_id: "",
					course: "",
					mark: "",
					explain: "",
				};
				this.project_code = "";
				this.tableData = [];
				if (this.member[i]) {
					getCourseProjectCode({ studio_scode: this.member[i].studio_scode }).then(res => {
						this.projectCodeArr = res.data.data;
					});
				}
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
				this.$confirm("删除学生数据, 是否继续?", "提示", {
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
			// 查看工作情况说明
			seeExplain(i) {
				this.$alert(i.explain, "工作情况说明", {
					confirmButtonText: "确定",
				});
			},
		},
		watch: {
			member() {
				getCourseProjectCode({ studio_scode: this.member[0].studio_scode }).then(res => {
					this.projectCodeArr = res.data.data;
				});
			},
		},
		created() {},
	};
</script>

<style scoped lang="less">
	.title {
		font-size: 24px;
		font-weight: bold;
	}
	.el-form {
		margin-top: 10px;
		.textarea {
			width: 500px;
		}
		.el-table {
			margin: 0 auto;
		}
	}
	.add {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		transform: translateX(10%);
		.el-input {
			flex-basis: 20%;
			margin-right: 10px;
		}
		.el-textarea {
			flex-basis: 30%;
			margin-top: 10px;
			margin-right: 10px;
		}
		.el-button {
			margin-right: 10px;
			height: 40px;
			margin-top: 25px;
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
	}
	.intrBtn {
		padding: 10px;
	}
	.upload-demo {
		width: 580px;
		span {
			margin-left: 10px;
			margin-bottom: 20px;
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
