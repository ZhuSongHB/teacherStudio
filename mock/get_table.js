export default {
	"post|/api/teacherstudio/studio_register/get_table": op => {
		console.log(op);
		let obj = {
			id: 1,
			studio_name: "工作室名称1",
			teacher_id: 110111,
			teacher_name: "教师姓名",
			studio_type: "工作室类型",
			phone: "130xxxx1234",
			email: "xxx@xx.com",
			semester: 20201,
			management_unit_id: 1401,
			management_unit_name: "直接管理单位名称",
			regulatory_unit_id: 1403,
			regulatory_unit_name: "监管单位名称",
			introduce: "工作室简介内容很多很多很多很工作室简介内容很多很多很多很工作室简介内容很多很多很多很工作室简介内容很多很多很多很",
			apply_time: "2020-12-24 10:26:41",
			management_unit_feedback: 1,
			management_unit_feedback_content: "直接管理意见具体内容",
			management_unit_signer: "直接管理单位审批人",
			management_unit_feedback_time: "2020-12-24 13:00:40",
			regulatory_unit_feedback: 0,
			regulatory_unit_feedback_content: "监管单位",
			regulatory_unit_signer: "监管单位",
			regulatory_unit_feedback_time: "监管单位",
			academic_office_feedback: -1,
			academic_office_feedback_content: "教务处",
			academic_office_signer: "教务处",
			academic_office_feedback_time: "教务处",
		};
		let arr = [
			{
				teacher_id: 265969,
				teacher_name: "负责人姓名",
				department: "所属部门名称",
				type: "人员类别",
				duty: "职称职务",
				major: "专业名称",
			},
			{
				teacher_id: 265970,
				teacher_name: "教师姓名1",
				department: "所属部门名称",
				type: "人员类别",
				duty: "职称职务",
				major: "专业名称",
			},
		];
		let teacher = [];
		for (const item of arr) {
			teacher.push(JSON.stringify(item));
		}

		obj = { ...obj, teacher };

		return {
			code: 1,
			msg: "",
			data: { ...obj },
		};
	},
};
