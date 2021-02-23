export default {
	'post|/api/teacherstudio/user_studio/getStudio': op => {
		console.log(op);

		return {
			code: 1,
			msg: '',
			data: [
				{
					studio_scode: 10001,
					studio_name: '信息化工作室',
				},
			],
		};
	},
};
