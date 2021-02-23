export default {
	"get|/api/teacherstudio/party_unit/get_list": () => {
		return {
			code: 1,
			msg: "",
			data: [
				{ unit_id: 148556, unit_title: "单位名称1" },
				{ unit_id: 148557, unit_title: "单位名称2" },
				{ unit_id: 149957, unit_title: "单位名称3" },
				{ unit_id: 146657, unit_title: "单位名称4" },
			],
		};
	},
};
