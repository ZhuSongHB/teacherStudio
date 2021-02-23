export default {
	"get|/api/teacherstudio/teacher_type/get_list": () => {
		return {
			code: 1,
			msg: "",
			data: [
				{ id: 1, type: "专职教师" },
				{ id: 2, type: "行业教师" },
			],
		};
	},
};
