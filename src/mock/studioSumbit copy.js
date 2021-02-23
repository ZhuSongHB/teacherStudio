export default {
	"get|/api/teacherstudio/type_studio/get_list": () => {
		return {
			code: 1,
			msg: "",
			data: [
				{ id: 1, type: "社会实践" },
				{ id: 2, type: "学科竞赛" },
			],
		};
	},
};
