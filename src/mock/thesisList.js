export default {
	"post|/api/teacherstudio/assume_thesis_apply/get_list": () => {
		return {
			code: 1,
			msg: "",
			data: [
				{
					studio_scode: 100001,
					studio_name: "毕设",
					record_list: [
						{
							id: 1,
							project_code: "置换方案编号1",
							apply_time: "2020-12-24 21:50:12",
							state: "审批中",
						},
					],
				},
				{
					studio_scode: 100002,
					studio_name: "工作室名称2",
					record_list: [
						{
							id: 3,
							project_code: "置换方案编号3",
							apply_time: "2020-12-24 21:50:12",
							state: "审批中",
						},
					],
				},
			],
		};
	},
};
