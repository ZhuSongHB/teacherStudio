export default {
	"post|/api/teacherstudio/practice_thesis_scheme_apply/get_table": () => {
		let arr = [
			{
				type: "专业实习",
				major: "软件设计模式",
				student_num: 5,
			},
			{
				type: "专业实习",
				major: "PHP程序设计",
				student_num: 3,
			},
		];
		const scheme = [];
		for (const item of arr) {
			scheme.push(JSON.stringify(item));
		}
		return {
			code: 1,
			msg: "",
			data: {
				id: 1,
				project_code: "方案编号1",
				studio_scode: 162586,
				studio_name: "工作室名称1",
				techer_id: 110111,
				teacher_name: "负责人姓名",
				grade: 1,
				unit_id: 1401,
				job_content: "工作室内容",
				unit_title: "受理单位名称",
				reason: "申请理由",
				apply_time: "2020-12-24 10:26:41",
				management_unit_feedback: 1,
				management_unit_feedback_content: "",
				management_unit_signer: "直接管理单位审批人",
				management_unit_feedback_time: "2020-12-24 11:00:40",
				regulatory_unit_feedback: 1,
				regulatory_unit_feedback_content: "监管单位审批人",
				regulatory_unit_signer: "",
				regulatory_unit_feedback_time: "2020-12-24 12:00:40",
				unit_feedback: 1,
				unit_feedback_content: "",
				unit_signer: "受理单位审批人",
				unit_feedback_time: "2020-12-24 13:00:40",
				academic_office_feedback: 0,
				academic_office_feedback_content: "",
				academic_office_signer: "",
				academic_office_feedback_time: "",
				apply_content: scheme,
			},
		};
	},
};
