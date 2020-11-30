<template>
	<el-container id="header">
		<el-header style="width: 100% ; padding: 0 0">
			<!-- 顶部 -->
			<div class="title_bg">
				<router-link to="/studio">
					<img class="logo" alt="logo" src="~assets/logo.png" />
				</router-link>

				<div class="title_name">
					<router-link to="/studio">
						名师工作室
					</router-link>
				</div>
				<!-- 用type判断是否登录 0是学生 1是老师 2是未登录 -->
				<div class="title_search" v-if="!type">
					<!-- 登录 -->
					<!-- <router-link to="/login" style="color:white;">登录</router-link> -->
					<router-link to="/login" style="color:white;" class="mr20">登录认证</router-link>
				</div>
				<div class="title_search" v-else>
					<!-- 登录后 -->
					<div v-if="type == 0">
						<router-link to="/" style="color:white;" class="mr20">{{ name }}</router-link>
						<router-link to="/personal" style="color:white;white-space:nowrap;" class="mr20">个人中心</router-link>
						<router-link to="/" style="color:white;white-space:nowrap;" class="mr20">
							<span @click="exit">退出</span>
						</router-link>
					</div>
					<div v-else-if="type == 1">
						<router-link to="/" style="color:white;" class="mr20">{{ name }}</router-link>
						<router-link to="/examine" style="color:white;white-space:nowrap;" class="mr20">审核中心</router-link>
						<router-link to="/" style="color:white;white-space:nowrap;" class="mr20"><span @click="exit">退出</span></router-link>
					</div>
				</div>

				<div class="min_title_search">
					<!-- 手机适配 -->
					<!-- 未登录 -->
					<el-dropdown trigger="click" v-if="!type">
						<span class="el-dropdown-link">
							<i class="el-icon-more el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<router-link to="/login">
								<el-dropdown-item icon="el-icon-user-solid">登录认证</el-dropdown-item>
							</router-link>
						</el-dropdown-menu>
					</el-dropdown>
					<!-- 登录类型判断  -->
					<!-- 学生 -->
					<el-dropdown trigger="click" v-if="type == 0">
						<span class="el-dropdown-link">
							<i class="el-icon-more el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<router-link to="/">
								<el-dropdown-item icon="el-icon-user-solid">{{ name }}</el-dropdown-item>
							</router-link>
							<router-link to="/personal">
								<el-dropdown-item icon="el-icon-s-home">个人中心</el-dropdown-item>
							</router-link>
							<router-link to="/">
								<el-dropdown-item icon="el-icon-minus"><span @click="exit">退出</span></el-dropdown-item>
							</router-link>
						</el-dropdown-menu>
					</el-dropdown>
					<!-- 老师 -->
					<el-dropdown trigger="click" v-if="type == 1">
						<span class="el-dropdown-link">
							<i class="el-icon-more el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<router-link to="/">
								<el-dropdown-item icon="el-icon-user-solid">{{ name }}</el-dropdown-item>
							</router-link>
							<router-link to="/examine">
								<el-dropdown-item icon="el-icon-s-home">审核中心</el-dropdown-item>
							</router-link>
							<router-link to="/">
								<el-dropdown-item icon="el-icon-minus"><span @click="exit">退出</span></el-dropdown-item>
							</router-link>
						</el-dropdown-menu>
					</el-dropdown>
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
				数据来源：教务处 联系人：林锋
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

<style scoped lang="less">
	.el-container {
		position: relative;
	}
	a {
		text-decoration: none;
	}
	.el-header {
		height: 200px !important;
	}
	.el-main {
		margin: 0 auto;
		width: 90%;
		min-height: 750px;
	}
	.title_bg {
		display: flex;
		height: 105px;
		padding: 20px 0 20px 0;
		background: url('~assets/top-bg.jpg');
		align-items: center;
		.logo {
			flex-grow: 1;
			margin-left: 130px;
			cursor: pointer;
		}
		.title_name {
			flex-grow: 10;
			margin-left: 20px;
			font-size: 30px;
			font-weight: 400;
			color: white;
			a {
				color: white;
			}
		}
		.title_search,
		.min_title_search {
			/* position: absolute; */
			/* right: 120px; */
			flex-grow: 1;
		}
		.min_title_search {
			display: none;
			i {
				font-size: 24px;
				color: white;
			}
		}
		@media screen and (max-width: 814px) {
			.logo {
				display: none;
			}
			.title_name {
				margin-left: 120px;
			}

			.title_search {
				/* position: absolute; */
				/* right: 120px; */
				flex-grow: 1;
				margin-left: 100px;
				font-size: 16px;
			}
		}
		@media screen and (max-width: 656px) {
			.title_name {
				display: block;
				margin-left: 20px;
				font-size: 24px;
				flex-grow: 1;
			}
			.logo {
				display: none;
			}
			.title_search {
				/* position: absolute; */
				/* right: 120px; */
				display: none;
			}
			.min_title_search {
				flex-grow: 1;
				margin-left: 120px;
				display: block;
			}
		}
	}
	@media screen and (max-width: 656px) {
		.title_bg {
			height: 60px;
		}
		.el-header {
			height: 160px !important;
		}
		.el-main {
			margin: 0 auto;
			min-height: 550px;
			padding: 0;
		}
	}
	// .el-link {
	// 	margin-left: 20px;
	// }

	.nav .el-menu-demo {
		display: flex;
		/* margin-left: 100px; */
		justify-content: space-evenly;
	}

	// .text {
	// 	font-size: 14px;
	// }

	.item {
		margin-bottom: 18px;
	}

	.mr20 {
		margin-right: 20px;
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
