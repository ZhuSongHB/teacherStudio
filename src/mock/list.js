let arr = [
	{
		scode: 10001,
		name: '信息化工作室',
		teacher_name: '工作室负责人姓名',
		studio_type: '社会实践',
		student_num: 10,
		max_student: 50,
	},
	{
		scode: 10002,
		name: '大数据工作室',
		teacher_name: '工作室负责人姓名',
		studio_type: '社会实践',
		student_num: 7,
		max_student: 60,
	},
];
for (let i = 10003; i < 10099; i++) {
	arr.push({
		scode: i,
		name: '大数据工作室',
		teacher_name: '工作室负责人姓名',
		studio_type: '社会实践',
		student_num: 7,
		max_student: 60,
	});
}
export default {
	'get|/api/teacherstudio/studio': () => {
		return {
			code: 1,
			msg: '',
			data: {
				num: 160,
				studios: arr,
			},
		};
	},
};
