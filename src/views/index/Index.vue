<template>
	<div>
		<!-- 轮播图 -->
		<div>
			<el-carousel indicator-position="outside" height="400px">
				<el-carousel-item v-for="item in imgList" :key="item">
					<!-- <h3>{{ item }}</h3> -->
					<img :src="item" class="carousel_img" />
				</el-carousel-item>
			</el-carousel>
		</div>
		<!-- 卡片 -->
		<div class="card">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>公告通知</span>
					<el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
				</div>
				<div v-for="o in 4" :key="o" class="text item">
					{{ '列表内容 ' + o }}
				</div>
			</el-card>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>新闻动态</span>
					<el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
				</div>
				<div v-for="o in 4" :key="o" class="text item">
					{{ '列表内容 ' + o }}
				</div>
			</el-card>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>规章制度</span>
					<el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
				</div>
				<div v-for="o in 4" :key="o" class="text item">
					{{ '列表内容 ' + o }}
				</div>
			</el-card>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>下载专区</span>
					<el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
				</div>
				<div v-for="o in 4" :key="o" class="text item">
					{{ '列表内容 ' + o }}
				</div>
			</el-card>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Index',
		data() {
			return {
				imgList: ['http://zsb.ygu.edu.cn/img/2.jpg', 'http://zsb.ygu.edu.cn/img/3.jpg', 'http://zsb.ygu.edu.cn/img/1.jpg'],
			};
		},
	};
</script>

<style scoped>
	/* .el-carousel__item {
  height: 500px;
} */
	.el-carousel {
		max-width: 1580px;
		margin: 0 auto;
	}
	.el-carousel__item h3 {
		color: #475669;
		font-size: 18px;
		opacity: 0.75;
		line-height: 300px;
		margin: 0;
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n + 1) {
		background-color: #d3dce6;
	}
	.el-carousel-item .carousel_img {
		width: 100%;
	}

	.carousel_img {
		object-fit: fill;
	}
	.box-card {
		width: 320px;
	}
	.card {
		display: flex;
		max-width: 1580px;
		margin: 0 auto;
		justify-content: space-between;
	}
</style>
