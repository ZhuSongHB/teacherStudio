let arr = {
	code: 1,
	msg: "",
	data: [
		{
			studio_scode: 10001,
			studio_name: "工作室名称1",
			message: [
				{
					time: "2020-10-29 01:03:43",
					message: "张三加入工作室",
				},
				{
					time: "2020-10-28 09:33:06",
					message: "李四退出工作室",
				},
				{
					time: "2020-10-23 12:10:52",
					message: "王五被移出工作室",
				},
			],
		},
		{
			studio_scode: 10002,
			studio_name: "工作室名称2",
			message: [
				{
					time: "2020-10-29 01:03:43",
					message: "张三加入工作室",
				},
				{
					time: "2020-10-28 09:33:06",
					message: "李退出工作室",
				},
				{
					time: "2020-10-23 12:10:52",
					message: "王五被移出工作室",
				},
			],
		},
	],
};
export default {
	"post|/api/teacherstudio/teacher_studio/getStudioMessage": () => {
		return { ...arr };
	},
};
