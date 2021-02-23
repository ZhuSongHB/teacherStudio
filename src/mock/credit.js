export default {
	"post|/api/teacherstudio/credit_replace_apply/get_table": () => {
		let arr = [
			{
				student_id: 1927309100,
				student_name: "学生姓名",
				credit_type: "认识实习",
				credit: 5,
				explain: "工作情认识实习况说明内容",
			},
			{
				student_id: 1927309102,
				student_name: "学生姓名",
				credit_type: "专业实习",
				credit: 10,
				explain: "专业实习",
			},
		];
		const student = [];
		for (const item of arr) {
			student.push(JSON.stringify(item));
		}
		return {
			code: 1,
			msg: "",
			data: {
				id: 1,
				studio_scode: 162586,
				studio_name: "学分置换工作室",
				project_code: "置换方案编号1",
				unit_id: 1401,
				unit_title: "受理单位名称",
				reason: "申请理由",
				apply_time: "2020-12-24 10:26:41",
				teacher_id: 147888,
				teacher_name: "教师姓名",
				unit_feedback: 1,
				unit_feedback_content: "",
				unit_signer: "受理单位审批人",
				unit_feedback_time: "2020-12-24 13:00:40",
				academic_office_feedback: 0,
				academic_office_feedback_content: "",
				academic_office_signer: "",
				academic_office_feedback_time: "",
				student,
			},
		};
	},
};
// id	整型	记录id
// studio_scode	整型	工作室id
// studio_name	字符串	工作室名称
// project_code	字符串	置换方案编号
// unit_id	整型	受理单位id
// unit_title	字符串	受理单位名称
// reason	字符串	申请理由
// apply_time	字符串	申请时间
// teacher_id	整型	√
// teacher_name	字符串	√
// unit_feedback	整型	受理单位审批状态，0审批中，1同意，2不同意
// unit_feedback_content	字符串	受理单位意见内容
// unit_signer	字符串	受理单位审批人
// unit_feedback_time	字符串	受理单位审批时间
// academic_office_feedback	整型	教务处审批状态，-1待审批，0审批中，1同意，2不同意
// academic_office_feedback_content	字符串	教务处意见内容
// academic_office_signer	字符串	教务处审批人
// academic_office_feedback_time	字符串	教务处审批时间
// academic_office_feedback_time	字符串	教务处审批时间
// student	json数组	学生成绩列表
// student数组：

// 参数名	类型	备注
// student_id	整型	学生学号
// student_name	字符串	学生姓名
// credit_type	字符串	学分类型
// credit	整型	学分数
// explain	字符串	学生工作情况说明
