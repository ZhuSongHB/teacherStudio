export default {
	'post|/api/teacherstudio/teacher_studio/getUserStudioList': () => {
		return {
			code: 1,
			msg: '',
			data: [
				{
					studio_scode: 10001,
					studio_name: '工作室名称1',
					data: [
						{
							user_id: 1927309133,
							user_name: '学生姓名1',
							type: 0,
						},
						{
							user_id: 1927309134,
							user_name: '学生姓名2',
							type: 0,
						},
						{
							user_id: 1501,
							user_name: '教师姓名1',
							type: 1,
						},
					],
				},
				{
					studio_scode: 10002,
					studio_name: '工作室名称2',
					data: [
						{
							user_id: 2027309133,
							user_name: '学生姓名3',
							type: 0,
						},
						{
							user_id: 2027309134,
							user_name: '学生姓名4',
							type: 0,
						},
						{
							user_id: 1601,
							user_name: '教师姓名2',
							type: 1,
						},
					],
				},
			],
		};
	},
};
