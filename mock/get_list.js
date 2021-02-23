export default {
	"post|/api/teacherstudio/studio_register/get_list": op => {
		console.log(op);

		return {
			code: 1,
			msg: "",
			data: [
				{
					id: 1,
					studio_name: "工作室名称1",
					apply_time: "2020-12-24 21:50:12",
					state: "审批中",
				},
				{
					id: 2,
					studio_name: "工作室名称2",
					apply_time: "2020-12-24 21:50:02",
					state: "拒绝",
				},
				{
					id: 3,
					studio_name: "工作室名称3",
					apply_time: "2020-12-24 21:50:12",
					state: "通过",
				},
			],
		};
	},
};
