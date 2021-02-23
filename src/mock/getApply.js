export default {
	'post|/api/teacherstudio/apply_studio/getApply': () => {
		return {
			code: 1,
			msg: '',
			data: [
				{
					id: 1,
					studio_scode: 10001,
					studio_name: '信息化工作室',
					apply_time: '2020-10-28 23:22:22',
					state: '待审批',
					approval_time: null,
				},
			],
		};
	},
};
