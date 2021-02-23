<template>
	<el-collapse v-model="activeName" id="cur">
		<el-collapse-item v-for="(item, i) in member" :key="i" :name="i" :title="item.studio_name">
			<template slot="title">
				<div class="title">
					{{ item.studio_name }}
				</div>
			</template>
			<el-table :data="item.message" stripe style="width: 100%">
				<el-table-column prop="time" label="时间" width="180"></el-table-column>
				<el-table-column prop="message" label="信息"></el-table-column>
			</el-table>
		</el-collapse-item>
	</el-collapse>
</template>

<script>
	import { getStudioMessage } from "../../../network/api";
	export default {
		data() {
			return {
				activeName: [0],
				member: [],
			};
		},
		created() {
			let teacher_id = sessionStorage.getItem("id");
			let token = sessionStorage.getItem("token");

			getStudioMessage(teacher_id, token).then(res => {
				res = res.data;
				this.member = res.data;
			});
		},
	};
</script>

<style scoped lang="less">
	.title {
		font-size: 24px;
		font-weight: bold;
	}
	.el-form {
		margin-top: 10px;
		.textarea {
			width: 500px;
		}
		.el-table {
			margin: 0 auto;
		}
	}
	.add {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		transform: translateX(10%);
		.el-input {
			flex-basis: 20%;
			margin-right: 10px;
		}
		.el-textarea {
			flex-basis: 30%;
			margin-top: 10px;
			margin-right: 10px;
		}
		.el-button {
			margin-right: 10px;
			height: 40px;
			margin-top: 25px;
		}
	}
	.btn_sub {
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}
	.el-dialog {
		div {
			margin-top: 10px;
		}
		.el-input {
			margin-top: 10px;
		}
	}
	.intrBtn {
		padding: 10px;
	}
</style>
