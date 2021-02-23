export default {
	'post|/api/teacherstudio/teacher_studio/pass': op => {
		console.log(op);

		return { code: 1, msg: '操作成功', data: '' };
	},
};
