let login = [
	{
		id: '1927309137',
		name: '张三',
		password: '123456',
		type: 0,
	},
	{
		id: 'admin',
		password: '123456',
		name: '管理员',
		type: 1,
	},
];

export default {
	'post|/api/register': option => {
		let key = true;
		let data = JSON.parse(option.body);
		login.forEach(val => {
			if (val.id == data.id) {
				key = false;
			}
		});

		if (key) {
			login.push({
				id: data.id,
				password: data.password,
				name: data.name,
			});
			console.log(login);
			return {
				result: true,
				msg: '注册成功',
			};
		} else {
			return {
				result: false,
				msg: '已被注册',
			};
		}
	},
};
