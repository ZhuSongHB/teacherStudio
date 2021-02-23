export default {
	"post|/api/teacherstudio/course_replace_scheme_apply/get_list": () => {
		return {
			code: 1,
			msg: "",
			data: [
				{
					studio_scode: 100001,
					studio_name: "工作室名称1",
					record_list: [
						{
							id: 1,
							apply_time: "2020-12-24 21:50:12",
							state: "审批中",
						},
						{
							id: 2,
							apply_time: "2020-12-24 21:50:12",
							state: "拒绝",
						},
						{
							id: 4,
							apply_time: "2020-12-24 21:50:12",
							state: "通过",
						},
					],
				},
				{
					studio_scode: 100002,
					studio_name: "工作室名称2",
					record_list: [
						{
							id: 3,
							apply_time: "2020-12-24 21:50:12",
							state: "审批中",
						},
					],
				},
			],
		};
	},
};
