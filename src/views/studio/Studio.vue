<template>
	<div>
		<ul class="fixedtool">
			<li>
				<el-button @click.native="backTop">
					<i class="el-icon-arrow-up"></i>
					<div></div>
					Top
				</el-button>
			</li>
			<li>
				<el-button @click="boxShow">
					<i class="el-icon-search"></i>
					搜索
				</el-button>
			</li>
		</ul>
		<div class="studio">
			<div class="studioList" v-loading="loading">
				<div v-for="item in showList" :key="item.id">
					<el-card :body-style="{ padding: '0px' }" shadow="always">
						<div @click="itemClick(item.scode)">
							<img src="../../assets/tupian.jpg" class="image" />
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
			<div class="min-pagination">
				<el-pagination small layout="prev, pager, next" :total="countNum" :page-size="12" :pager-count="13" prev-text="上一页" next-text="下一页" v-show="display" @current-change="handleCurrentChange"></el-pagination>
			</div>
			<!-- fixed -->

			<el-drawer title="搜索" :visible.sync="drawer" :direction="direction">
				<el-input v-model.trim="SearchInput" placeholder="请输入内容" @keyup.enter.native="SearchEnter">
					<i slot="suffix" class="el-icon-search" @click="SearchEnter"></i>
				</el-input>
				<div class="btnBox">
					<el-radio v-model="radio" label="1">工作室搜索</el-radio>
					<el-radio v-model="radio" label="2">负责人搜索</el-radio>
				</div>
				<!-- 搜索内容 -->
				<el-table :data="SearchArray" style="width: 100%">
					<el-table-column label="工作室">
						<template slot-scope="scope">
							<i class="el-icon-coordinate cp" @click="go(scope.$index, scope.row)"></i>
							<span style="margin-left: 10p" class="cp" @click="go(scope.$index, scope.row)">{{ scope.row.name }}</span>
						</template>
					</el-table-column>
					<el-table-column label="负责人">
						<template slot-scope="scope">
							<span style="margin-left: 10px" @click="go(scope.$index, scope.row)" class="cp">{{ scope.row.teacher_name }}</span>
						</template>
					</el-table-column>
					<el-table-column label="人数">
						<template slot-scope="scope">
							<span style="margin-left: 10px" @click="go(scope.$index, scope.row)" class="cp">{{ scope.row.student_num }}/{{ scope.row.max_student }}</span>
						</template>
					</el-table-column>
				</el-table>
			</el-drawer>
		</div>
	</div>
</template>
<script>
	import { getStudios } from '../../network/api';
	import { signUp } from '../../network/api';
	export default {
		name: 'Studio',
		created() {
			document.title = '阳光学院-名师工作室';
			this.getStudios();
		},
		data() {
			return {
				src: './assets/logo.png',
				//总工作室数据
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
				// 搜索框控制
				drawer: false,
				SearchInput: null,
				SearchArray: [],
				direction: 'rtl',
				radio: '1',
				isFixed: false,
			};
		},
		mounted() {
			window.addEventListener('scroll', this.handleScroll);
		},
		destroyed() {
			window.removeEventListener('scroll', this.handleScroll);
		},
		methods: {
			getStudios() {
				// console.log(this.showList);
				getStudios()
					.then(res => {
						this.list = res.data.data.studios;
						// 赛选非常规工作室
						this.list = this.fullStudio(this.list);

						this.countNum = this.list.length;
						// 存放工作室未满的数组
						const NotFullStudio = [];
						// 存放工作室已满的数组
						const FullStudio = [];
						this.list.forEach(element => {
							if (element.max_student == element.student_num) {
								FullStudio.push(element);
							} else {
								NotFullStudio.push(element);
							}
						});
						// 拼接 把满的工作室放最后
						this.studio = NotFullStudio.concat(FullStudio);
						this.showList = this.studio.slice(0, 12);
						this.display = true;
						this.loading = false;
					})
					.catch(err => {
						console.log(err);
						this.$message({
							message: '网络出现错误!',
							type: 'warning',
						});
					});
			},
			//赛选非常规工作室
			fullStudio(arr) {
				// 非常规工作室
				const fullInfo = [
					'创新创业',
					'横向项目',
					'考研辅导',
					'科研',
					'科研项目',
					'课程思政',
					'社会服务',
					'社会实践',
					'社会实践（思政）',
					'社会实践（思政相关类）',
					'社会实践（校内服务）',
					'学科竞赛',
					'职业证书培训',
					'职业证书培训（教学培训）',
					'科研项目（横向项目）',
					'科研（横向项目）',
				];
				let newArr = arr.filter(item => {
					return fullInfo.indexOf(item.studio_type) > -1;
				});

				return newArr;
			},
			itemClick(id) {
				// this.$router.push('/studioDetail/' + String(id));
				let routerJump = this.$router.resolve({ path: '/studioDetail/' + id });
				window.open(routerJump.href, '_blank');
			},
			// 分页
			handleCurrentChange(val) {
				// val: 需要的页数
				this.page = val - 1;
				this.showList = this.studio.slice(this.page * 12, this.page * 12 + 12);
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
			// 工具框位置
			handleScroll() {
				// let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop; // 滚动条偏移量
				// let offsetTop = document.querySelector('.fixedtool').parentNode.parentNode.offsetTop; // 要滚动到顶部吸附的元素的偏移量
				// if (scrollTop > offsetTop) {
				// 	this.isFixed = true;
				// } else {
				// 	this.isFixed = false;
				// }
			},
			// 搜索
			SearchEnter() {
				if (this.radio == '1') {
					// 工作室搜索
					this.SearchStudio();
				} else if (this.radio == '2') {
					// 负责人搜索
					this.SearchTeacher();
				}
			},

			SearchStudio() {
				//拿到输入的值
				if (this.SearchInput) {
					let value = this.SearchInput;
					this.SearchArray = this.list.filter(item => item.name.indexOf(value) != -1);
				} else {
					let value = null;
					this.SearchArray = this.list.filter(item => item.name.indexOf(value) != -1);
				}
			},
			SearchTeacher() {
				if (this.SearchInput) {
					let value = this.SearchInput;
					this.SearchArray = this.list.filter(item => item.teacher_name.indexOf(value) != -1);
				} else {
					let value = null;
					this.SearchArray = this.list.filter(item => item.teacher_name.indexOf(value) != -1);
				}
			},
			boxShow() {
				this.drawer = true;
				this.direction = document.body.clientWidth <= 600 ? 'ttb' : 'rtl';
			},
			// 搜索报名
			handleEdit(index, row) {
				if (sessionStorage.getItem('id')) {
					this.$prompt('个人自荐', '自荐', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						inputType: 'textarea',
						customClass: 'min-message',
					}).then(val => {
						// 获取学生id
						const studentId = sessionStorage.getItem('id');
						//工作室ID
						const studioId = row.scode;
						const token = sessionStorage.getItem('token');
						// 自荐
						const introduce = val;
						const type = sessionStorage.getItem('type');
						this.SignUploading = true;

						signUp(studentId, studioId, type, introduce.value, token)
							.then(res => {
								res = res.data;
								if (res.code == 1) {
									this.$message({
										type: 'success',
										message: res.msg,
									});
								} else if (res.code == 0) {
									this.$message.error('报名失败，已报名别的工作室或已加入一个工作室');
								}
								this.SignUploading = false;
							})
							.catch(err => {
								console.log(err);
								this.$message({
									message: '网络出现错误!',
									type: 'warning',
								});
								this.SignUploading = false;
							});
					});
				} else {
					this.$confirm('请先登录认证在报名', '未登录', {
						distinguishCancelAndClose: true,
						confirmButtonText: '确认',
						cancelButtonText: '取消',
					}).then(() => {
						this.$router.push('/login');
					});
				}
			},
			//跳转详情页
			go(index, row) {
				let routerJump = this.$router.resolve({ path: '/studioDetail/' + row.scode });
				window.open(routerJump.href, '_blank');
			},
			backTop() {
				document.body.scrollTop = 0;
				document.documentElement.scrollTop = 0;
			},
		},
	};
</script>
<style scoped lang="less">
	.studio {
		position: relative;
		display: flex;
		flex-wrap: wrap;
		.studioList {
			display: flex;
			margin: 0px auto;
			width: 1300px;
			/* min-height: 550px; */
			/* overflow: hidden;   */
			justify-content: flex-start;
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
		.min-pagination {
			display: none;
		}
	}
	.fixedtool {
		position: fixed;
		right: 50px;
		bottom: 20px;
		list-style: none;
		z-index: 1000;
		li {
			width: 60px;
			height: 60px;
			a {
				text-decoration: none;
				color: black;
				text-align: center;
			}
			.el-button {
				font-size: 14px;
				width: 100%;
				height: 100%;
				padding-left: 0 !important;
				padding-right: 0 !important;
				i {
					display: block;
					padding-bottom: 5px;
				}
			}
		}
	}
	@media screen and (max-width: 656px) {
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
					width: 130px;
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
						font-size: 16px;
						font-weight: bold;
					}
					.info {
						margin-top: 10px;
						font-size: 12px;
						color: #999;
					}
				}
			}
			.pagination {
				display: none;
			}
			.min-pagination {
				display: block;
				margin: 20px 0;
			}
			.fixedtool {
				position: absolute;
				left: 10px;
				top: -10px;
				.el-button {
					// width: 70px;
					padding: 10px 25px 3px;
				}
			}
		}
	}
</style>
<style lang="less">
	.el-drawer__wrapper {
		.rtl {
			overflow: auto;
			padding: 10px 30px;
			.el-drawer__body {
				min-height: 300px;
				.el-input {
					width: 90%;
				}
				.btnBox {
					margin-top: 10px;
				}
				.el-button {
					margin-right: 10px;
				}
				.el-card {
					margin-top: 10px;
				}
			}
			.el-drawer__header {
				font-size: 36px;
			}
		}
	}
	.ttb {
		overflow: auto;
	}
	.el-drawer__container ::-webkit-scrollbar {
		display: none;
	}
	.el-drawer__header span:focus {
		outline: 0;
	}
	.cp {
		cursor: pointer;
	}
	.el-input__suffix-inner {
		line-height: 40px;
		cursor: pointer;
	}
	.el-table_1_column_1 {
		span {
			cursor: pointer;
		}
		i {
			cursor: pointer;
		}
	}
	@media screen and (max-width: 656px) {
		.el-drawer__wrapper {
			.ttb {
				padding: 10px 30px;
				.el-drawer__body {
					min-height: 300px;
					.el-input {
						width: 70%;
					}
					.el-button {
						margin-left: 10px;
					}
					.el-card {
						margin-top: 10px;
					}
				}
				.el-drawer__header {
					font-size: 36px;
				}
			}
		}
		.min-message {
			width: 250px !important;
		}
	}
</style>
