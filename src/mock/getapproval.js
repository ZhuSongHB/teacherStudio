let arr = [
	{
		studio_id: '10001',
		studio_name: '大数据工作室',
		students: [
			{
				id: '1927309132',
				name: '张三',
			},
			{
				id: '1927309133',
				name: '王五',
			},
			{
				id: '1927309126',
				name: '陈雷',
			},
		],
	},
	{
		studio_id: '10002',
		studio_name: '人工智能工作室',
		students: [
			{
				id: '1927309162',
				name: '林北',
			},
			{
				id: '1927309163',
				name: '李雷',
			},
			{
				id: '1927309166',
				name: '韩梅',
			},
		],
	},
];

export default {
	'get|/api/teacherstudio/api/getapproval': () => {
		return { arr };
	},
};
