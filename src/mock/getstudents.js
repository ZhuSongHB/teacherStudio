let arr = {
	code: 1,
	msg: '',
	data: [
		{
			studio_scode: 10001,
			studio_name: '信息化工作室',
			data: [
				{
					user_id: 1927309133,
					user_name: '学生姓名',
					sexuality: '男',
					major_name: '专业名称',
					grade: 2019,
					introduce: '学生自荐',
					type: 0,
				},
				{
					user_id: 1927309134,
					user_name: '学生姓名2',
					sexuality: '女',
					major_name: '专业名称',
					grade: 2019,
					introduce: '学生自荐',
					type: 0,
				},
				{
					user_id: 1501,
					user_name: '教师姓名1',
					type: 1,
				},
			],
		},
	],
};
export default {
	'post|/api/teacherstudio/teacher_studio/getApplyList': () => {
		return { arr };
	},
};
