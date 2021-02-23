export default {
	"post|/api/teacherstudio/assume_thesis_apply/get_table": () => {
		let arr = [
			{
				student_id: 1927309100,
				student_name: "学生姓名",
				teacher_name: "指导老师姓名",
				task_title: "工作情况说明内容",
			},
			{
				student_id: 1927309100,
				student_name: "学生姓名",
				teacher_name: "指导老师姓名",
				task_title: "课题名称",
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
				studio_name: "工作室名称1",
				project_code: "置换方案编号1",
				unit_id: 1401,
				unit_title: "受理单位名称",
				reason: "申请理由",
				apply_time: "2020-12-24 10:26:41",
				teacher_id: 100366,
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
// project_code	字符串	承担方案编号
// studio_scode	整型	工作室id
// studio_name	字符串	工作室名称
// teacher_id	整型	负责人id
// teacher_name	字符串	负责人姓名
// grade	整型	工作室等级，0为C级，1为B级，2为A级
// unit_id	整型	受理单位id
// unit_title	字符串	受理单位名称
// job_content	字符串	工作室的工作内容
// material	字符串	抵换课程所提供的证明材料
// apply_time	字符串	申请时间
// management_unit_feedback	整型	直接管理单位审批状态，0审批中，1同意，2不同意
// management_unit_feedback_content	字符串	直接管理单位意见内容
// management_unit_signer	字符串	直接管理单位审批人
// management_unit_feedback_time	字符串	直接管理单位审批时间
// regulatory_unit_feedback	整型	监管单位审批状态，-1待审批，0审批中，1同意，2不同意
// regulatory_unit_feedback_content	字符串	监管单位意见内容
// regulatory_unit_signer	字符串	监管单位审批人
// regulatory_unit_feedback_time	字符串	监管单位审批时间
// unit_feedback	整型	受理单位审批状态，-1待审批，0审批中，1同意，2不同意
// unit_feedback_content	字符串	受理单位意见内容
// unit_signer	字符串	受理单位审批人
// unit_feedback_time	字符串	受理单位审批时间
// academic_office_feedback	字符串	教务处审批状态，-1待审批，0审批中，1同意，2不同意
// academic_office_feedback_content	字符串	教务处意见内容
// academic_office_signer	字符串	教务处审批人
// academic_office_feedback_time	字符串	教务处审批时间
// scheme	json数组	申请内容
