<template>
	<div class="studio">
		<!-- <el-aside style="width: 200px">
			<el-menu class="el-menu-demo" mode="horizontal" background-color="#0066cb" text-color="#fff" active-text-color="#ffd04b">
				<el-menu-item index="/">分类1</el-menu-item>
				<el-menu-item index="/studio">分类2</el-menu-item>
				<el-menu-item index="/new">分类3</el-menu-item>
				<el-menu-item index="/notice">分类4</el-menu-item>
			</el-menu>
		</el-aside> -->
		<div class="studioList" v-loading="loading">
			<div v-for="item in showList" :key="item.id">
				<el-card :body-style="{ padding: '0px' }" shadow="hover">
					<div @click="itemClick(item.scode)">
						<img src="../../assets/tupian.png" class="image" />
						<div style="padding: 14px">
							<div class="studioName">{{ item.name }}</div>
							<div class="time">
								<div>老师：{{ item.teacher_name }}</div>
								<div>招收人数：{{ item.student_num }}/{{ item.max_student }}</div>
							</div>
						</div>
					</div>
				</el-card>
			</div>
		</div>
		<!--分页组件 total总条数，size一页数量，pager-count第几个开始出现“...” -->
		<div class="pagination">
			<el-pagination layout="prev, pager, next, jumper" :total="countNum" :page-size="12" :pager-count="7" prev-text="上一页" next-text="下一页" v-show="display" @current-change="handleCurrentChange"></el-pagination>
		</div>
	</div>
</template>
<script>
	import { getStudios } from '../../network/api';
	export default {
		name: 'Studio',
		created() {
			this.getStudios();
		},
		data() {
			return {
				src: './assets/logo.png',
				//总工作室数据，经过计算属性渲染
				list: [],
				//展示工作室
				showList: [],
				//总工作室数量
				countNum: null,
				//分页
				page: 0,
				display: false,
				// 头部位置
				scrollTop: 0,
				loading: true,
			};
		},
		//计算页数需要展示的数量
		// computed: {
		// 	showList: {
		// 		get() {
		// 			console.log('获取到了');
		// 		},
		// 		set(val) {
		// 			console.log('修改了' + val);
		// 			return val;
		// 		},
		// 	},
		// },

		mounted() {
			window.addEventListener('scroll', this.scrollToTop);
		},
		destroyed() {
			window.removeEventListener('scroll', this.scrollToTop);
		},

		methods: {
			getStudios() {
				// console.log(this.showList);
				getStudios()
					.then(res => {
						this.list = res.data.data.studios;
						this.countNum = res.data.data.num;
						this.showList = this.list.slice(0, 12);
						this.display = true;
						this.loading = false;
					})
					.catch(err => {
						console.log(err);
					});
			},
			itemClick(id) {
				// console.log(id);
				this.$router.push('/studioDetail/' + String(id));
			},
			// 分页
			handleCurrentChange(val) {
				// val: 需要的页数
				this.page = val - 1;
				this.showList = this.list.slice(this.page * 12, this.page * 12 + 12);
				// 返回头部
				const that = this;
				let timer = setInterval(() => {
					let ispeed = Math.floor(-that.scrollTop / 5);
					document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed;
					if (that.scrollTop === 0) {
						clearInterval(timer);
					}
				}, 16);
			},
		},
	};
</script>
<style scoped>
	.studio {
		/* display: flex; */
	}
	.el-menu-demo {
		display: flex;
		width: 200px;
		margin-top: 15px;
		flex-wrap: wrap;
	}
	.el-menu-item {
		width: 200px;
		text-align: center;
	}
	.studioList {
		display: flex;
		margin: 0px auto;
		width: 1300px;
		min-height: 550px;
		/* overflow: hidden;   */
		justify-content: left;
		/* align-items: center; */
		flex-wrap: wrap;
	}
	.el-card {
		width: 400px;
		margin-top: 20px;
		margin-left: 20px;
		cursor: pointer;
	}

	.time {
		margin-top: 10px;
		font-size: 13px;
		color: #999;
	}

	.bottom {
		margin-top: 13px;
		line-height: 12px;
	}
	.studioName {
		width: 100%;
		/* text-align: center; */
		font-size: 24px;
		font-weight: bold;
	}
	.button {
		padding: 10px 10px;
		float: right;
		margin: 10px 0;
	}

	.image {
		width: 100%;
		display: block;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: '';
	}

	.clearfix:after {
		clear: both;
	}
	.el-link {
		padding: 8px;
		/* border: 1px solid black; */
		font-size: 16px;
		background: #409eff;
	}
	.textLeft {
		font-size: 12px;
		float: left;
	}
	.textRight {
		font-size: 12px;
		float: right;
	}
	.pagination {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		flex-basis: 100%;
	}
	.el-pagination {
		/* display: flex; */
		height: 30px;
		margin: 0 auto;
		margin-top: 20px;
		/* flex-basis: 500px; */
	}
	.time div {
		padding-top: 5px;
	}
	.box-enter-active,
	.box-leave-active {
		transition: opacity 0.5s;
	}
	.box-enter, .box-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
	}
</style>
