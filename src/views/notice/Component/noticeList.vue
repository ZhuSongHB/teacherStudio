<template>
	<el-row :gutter="20">
		<el-col :span="4">
			<div class="grid-content bg-purple">
				<div class="imgBox">
					<div class="topImg">{{ title }}</div>
					<div class="topSanJiao"></div>
					<img src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1602070189&di=129fadf04a6a387728e05c839d571a41&src=http://pic.68ps.com/down/UploadFile/20140720/sc140720_1a.jpg" alt="" />
				</div>
			</div>
		</el-col>
		<el-col :span="20">
			<div class="grid-content bg-purple">
				<div class="topHeader">
					<span class="gonggao">{{ title }}</span>
					<div class="block"></div>
					<el-breadcrumb separator="/">
						<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
						<el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
					</el-breadcrumb>
				</div>
				<div class="content">
					<div v-for="(item, index) in textList" :key="index" class="contentBox">
						<div @click="goDetail(item.id)">
							<span class="data">{{ item.data }}</span>
						</div>
						<span class="time">{{ item.time }}</span>
					</div>
				</div>
			</div>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		name: "Notice",
		props: ["title"],
		data() {
			return {
				textList: [
					{ data: 111111, time: "2020-07-26", id: 111111 },
					{ data: 2222222222222, time: "2020-07-26", id: 2222222222222 },
					{ data: 33333, time: "2020-07-26", id: 33333 },
					{ data: 2222222222222, time: "2020-07-26", id: 2222222222222 },
				],
			};
		},
		methods: {
			goDetail(id) {
				let routerJump = this.$router.resolve({ path: "/noticeDetail/" + id });
				this.$router.push(routerJump.location.path + routerJump.location.params.id);
			},
		},
	};
</script>

<style scoped>
	.el-row {
		margin-bottom: 20px;
	}
	.el-col {
		border-radius: 4px;
	}
	.el-col img {
		width: 200px;
		height: 200px;
		margin: 0 auto;
	}
	.bg-purple-dark {
		background: #99a9bf;
	}
	.bg-purple {
		/* background: #d3dce6; */
	}
	.bg-purple-light {
		background: #e5e9f2;
	}
	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}
	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}
	.gonggao {
		font-weight: bold;
		font-size: 24px;
	}
	.topHeader {
		position: relative;
		padding-bottom: 10px;
		border-bottom: 2px solid black;
	}
	.block {
		position: absolute;
		width: 110px;
		height: 5px;
		bottom: -3px;
		background: #0066cb;
	}
	.el-breadcrumb {
		position: absolute;
		right: 0;
		top: 15px;
	}
	.imgBox {
		position: relative;
	}
	.imgBox .topImg {
		position: absolute;
		top: 10px;
		left: -40px;
		width: 180px;
		height: 40px;
		background: #409eff;
		color: white;
		line-height: 40px;
		text-align: center;
		font-size: 24px;
		box-shadow: 0px 2px 5px #53a8ff;
	}
	.topSanJiao {
		position: absolute;
		width: 0px;
		height: 0px;
		top: 50px;
		left: -20px;
		border: 10px solid transparent;
		border-top: 10px solid #409eff;
		border-right: 10px solid #409eff;
	}
	.content {
		margin-top: 15px;
	}
	.content .contentBox {
		position: relative;
		justify-content: inherit;
		margin-bottom: 10px;
		border-bottom: 1px solid #acacac;
	}
	.content .contentBox .time {
		position: absolute;
		right: 0;
		color: #6c6c6c;
	}
	a {
		text-decoration: none;
		color: black;
	}
</style>
