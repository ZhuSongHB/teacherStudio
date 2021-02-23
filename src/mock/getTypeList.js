export default {
	"get|/api/teacherstudio/practice_thesis_scheme_apply/get_type_list": () => {
		return {
			code: 1,
			msg: "",
			data: [
				{ id: 1, type: "认识实习" },
				{ id: 2, type: "专业实习" },
				{ id: 3, type: "毕业实习" },
				{ id: 4, type: "毕业论文（设计）" },
			],
		};
	},
};
