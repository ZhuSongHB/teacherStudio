export default {
	'get|/api/teacherstudio/stu': () => {
		return {
			code: 1,
			msg: '',
			data: {
				scode: '10001',
				name: '信息化工作室',
				introduce: '这里是简介',
				teachers: ['教师姓名1', '教师姓名2', '教师姓名3'],
				student_num: 10,
				max_student: 50,
				type: '社会实践',
			},
		};
	},
};
