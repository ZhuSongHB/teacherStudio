<template>
	<div class="studio">
		<div class="studioList" v-loading="loading">
			<div v-for="item in showList" :key="item.id">
				<el-card :body-style="{ padding: '0px' }" shadow="always">
					<div @click="itemClick(item.scode)">
						<img src="../../assets/tupian.png" class="image" />
						<div style="padding: 14px">
							<div class="studioName">{{ item.name }}</div>
							<div class="info">
								<div>负责人：{{ item.teacher_name }}</div>
								<div>招收人数：{{ item.student_num }}/{{ item.max_student }}</div>
							</div>
						</div>
					</div>
				</el-card>
			</div>
		</div>
		<!--分页组件 total总条数，size一页数量，pager-count第几个开始出现“...” -->
		<div class="pagination">
			<el-pagination layout="prev, pager, next, jumper" :total="countNum" :page-size="12" :pager-count="13" prev-text="上一页" next-text="下一页" v-show="display" @current-change="handleCurrentChange"></el-pagination>
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
				// this.$router.push('/studioDetail/' + String(id));
				let routerJump = this.$router.resolve({ path: '/studioDetail/' + id });
				window.open(routerJump.href, '_blank');
			},
			// 分页
			handleCurrentChange(val) {
				console.log(val);

				// val: 需要的页数
				this.page = val - 1;
				this.showList = this.list.slice(this.page * 12, this.page * 12 + 12);
				// 返回头部;
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
<style scoped lang="less">
	.studio {
		display: flex;
		flex-wrap: wrap;
		.studioList {
			display: flex;
			margin: 0px auto;
			width: 1300px;
			/* min-height: 550px; */
			/* overflow: hidden;   */
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;
			.el-card {
				width: 400px;
				margin-top: 20px;
				margin-left: 20px;
				cursor: pointer;
				.image {
					width: 100%;
					display: block;
					div {
						padding-top: 5px;
					}
				}

				.studioName {
					width: 100%;
					font-size: 24px;
					font-weight: bold;
				}
				.info {
					margin-top: 10px;
					font-size: 13px;
					color: #999;
				}
			}
		}
		.pagination {
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			flex-basis: 100%;
			.el-pagination {
				/* display: flex; */
				height: 30px;
				margin: 0 auto;
				margin-top: 40px;
				/* flex-basis: 500px; */
			}
		}
	}
</style>
