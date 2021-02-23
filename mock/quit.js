export default {
	'post|/api/teacherstudio/user_studio/quit': op => {
		console.log(op);

		return { code: 1, msg: '操作成功', data: '' };
	},
};
