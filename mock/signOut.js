export default {
	'post|/api/teacherstudio/student_studio/sign_out': op => {
		console.log(op);

		return { code: 1, msg: '操作成功', data: '' };
	},
};
