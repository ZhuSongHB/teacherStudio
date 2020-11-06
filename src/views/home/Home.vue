<template>
	<el-container>
		<el-header style="width: 100% ; height: 200px ; padding: 0 0">
			<!-- 顶部 -->
			<div class="title_bg">
				<img class="logo" alt="logo" src="~assets/logo.png" />
				<div class="title_name">名师工作室</div>
				<!-- 用type判断是否登录 0是学生 1是老师 2是未登录 -->
				<div class="title_search" v-if="!type">
					<!-- 登录 -->
					<!-- <router-link to="/login" style="color:white;">登录</router-link> -->
					<router-link to="/register" style="color:white;" class="ml20">登录认证</router-link>
				</div>
				<div class="title_search" v-else>
					<!-- 登录后 -->
					<div v-if="type == 0">
						<router-link to="/" style="color:white;">{{ name }}</router-link>
						<router-link to="/personal" style="color:white;" class="ml20">个人中心</router-link>
						<router-link to="/" style="color:white;" class="ml20">
							<span @click="exit">退出</span>
						</router-link>
					</div>
					<div v-else-if="type == 1">
						<router-link to="/" style="color:white;">{{ name }}</router-link>
						<router-link to="/examine" style="color:white;" class="ml20">审核中心</router-link>
						<router-link to="/" style="color:white;" class="ml20"><span @click="exit">退出</span></router-link>
					</div>
				</div>
			</div>
			<!-- 导航 -->
			<div class="nav">
				<div class="line"></div>
				<el-menu class="el-menu-demo" mode="horizontal" background-color="#001c8c" text-color="#fff" active-text-color="#ffd04b" router>
					<!-- <el-menu-item index="/index">首页</el-menu-item> -->
					<el-menu-item index="/studio">工作室列表</el-menu-item>
					<!-- <el-menu-item index="/new">新闻动态</el-menu-item> -->
					<!-- <el-menu-item index="/notice">公告通知</el-menu-item> -->
					<!-- <el-menu-item index="/rules">规章制度</el-menu-item> -->
					<!-- <el-menu-item index="/load">下载专区</el-menu-item> -->
				</el-menu>
			</div>
		</el-header>
		<el-main>
			<router-view></router-view>
		</el-main>
		<!-- footer部分 -->
		<el-footer style="height: 130px;">
			<div>网站开发者</div>
			<div>
				指导老师： 池灵达（教务处） 陈贵星（教务处） 钱庭霖
				<!-- <span class="fontColor">钱庭霖</span> -->
			</div>
			<div>
				开发者：朱颂（19级软工专本） 许心昊（19级软工专本）
				<!-- <span class="fontColor">池灵达</span> -->
			</div>
			<!-- <div>Copyright 2020 19软工专升本：许心昊，朱颂. All rights reserved.</div> -->
			<div>
				数据来源：教务处 联系人：林峰
			</div>
		</el-footer>
	</el-container>
</template>

<script>
	export default {
		name: 'Home',
		data() {
			return {
				type: null,
				name: '',
			};
		},
		created() {
			// 0是学生，1是老师
			this.type = sessionStorage.getItem('type');
			this.name = sessionStorage.getItem('name');
			// console.log(this.type);
		},
		methods: {
			studio() {
				this.$router.push('/studio');
			},
			exit() {
				this.type = null;
				window.localStorage.clear();
				window.sessionStorage.clear();
			},
		},
		updated() {
			this.type = sessionStorage.getItem('type');
			this.name = sessionStorage.getItem('name');
		},
	};
</script>

<style scoped>
	.el-container {
		height: 100%;
	}
	.el-main {
		margin: 0 auto;
		width: 90%;
		min-height: 750px;
	}
	.title_bg {
		display: flex;
		padding: 20px 0 20px 0;
		background: url('~assets/top-bg.jpg');
		align-items: center;
	}
	.el-link {
		margin-left: 20px;
	}
	.logo {
		flex-grow: 0;
		margin-left: 130px;
	}
	.title_name {
		flex-grow: 10;
		margin-left: 20px;
		font-size: 30px;
		font-weight: 400;
		color: white;
	}
	.nav .el-menu-demo {
		display: flex;
		/* margin-left: 100px; */
		justify-content: space-evenly;
	}
	.title_search {
		/* position: absolute; */
		/* right: 120px; */
		flex-grow: 1;
		width: 200px;
	}

	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: '';
	}
	.clearfix:after {
		clear: both;
	}
	.ml20 {
		margin-left: 20px;
	}
	@keyframes textColor {
		0% {
			color: white;
			/* background: cyan; */
		}
		10% {
			color: cyan;
			/* background: red; */
		}
		20% {
			color: red;
			/* background: orange; */
		}
		30% {
			color: orange;
			/* background: yellow; */
		}
		40% {
			color: yellow;
			/* background: limegreen; */
		}
		50% {
			color: limegreen;
			/* background: cyan; */
		}
		60% {
			color: cyan;
			/* background: lightskyblue; */
		}
		70% {
			color: lightskyblue;
			/* background: purple; */
		}
		80% {
			color: purple;
			/* background: pink; */
		}
		90% {
			color: pink;
			/* background: aquamarine; */
		}
		100% {
			color: aquamarine;
			/* background: white; */
		}
	}
	/* .fontColor {
		animation-name: textColor;
		animation-duration: 5s;
		animation-timing-function: linear;
		animation-delay: 0.5s;
		animation-iteration-count: infinite;
		animation-direction: alternate;
		animation-play-state: running;
	} */
	.el-footer {
		/* position: absolute; */
		/* bottom: 0px; */
		width: 100%;
		font-size: 14px;
		font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
		padding: 10px 0;
		background: #333333;
		/* font-weight: bold; */
		color: white;
		text-align: center;
		line-height: 28px;
	}
</style>
