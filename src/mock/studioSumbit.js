export default {
	"post|/api/teacherstudio/studio_register/submit": op => {
		console.log(op);
		return { code: 1, msg: "操作成功", data: "" };
	},
};
