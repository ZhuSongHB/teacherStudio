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
					<span>工作室风采</span>
				</div>
				<el-carousel indicator-position="outside">
					<el-carousel-item v-for="item in imgList" :key="item">
						<!-- <h3>{{ item }}</h3> -->
						<img :src="item" class="carousel_img" />
					</el-carousel-item>
				</el-carousel>
			</el-card>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>工作室动态列表</span>
					<el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
				</div>
				<div v-for="o in 4" :key="o" class="text item">
					{{ "列表内容 " + o }}
				</div>
			</el-card>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>通知公告列表</span>
					<el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
				</div>
				<div v-for="o in 4" :key="o" class="text item">
					{{ "列表内容 " + o }}
				</div>
			</el-card>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>下载专区</span>
					<el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
				</div>
				<div v-for="o in 4" :key="o" class="text item">
					{{ "列表内容 " + o }}
				</div>
			</el-card>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Index",
		data() {
			return {
				imgList: ["http://zsb.ygu.edu.cn/img/2.jpg", "http://zsb.ygu.edu.cn/img/3.jpg", "http://zsb.ygu.edu.cn/img/1.jpg"],
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
		object-fit: fill;
	}
	.box-card {
		width: 320px;
	}
	.card {
		display: flex;
		max-width: 1580px;
		margin: 20px auto;
		justify-content: space-around;
		flex-wrap: wrap;
	}
	.el-card {
		width: 700px;
		margin-top: 20px;
	}
</style>
