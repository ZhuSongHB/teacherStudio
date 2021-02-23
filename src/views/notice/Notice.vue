<template>
	<div>
		<!-- 图片 -->
		<div>
			<!-- <el-carousel indicator-position="outside" height="400px"> -->
			<!-- <el-carousel-item v-for="item in imgList" :key="item"> -->
			<!-- <h3>{{ item }}</h3> -->
			<!-- <img :src="item" class="carousel_img" /> -->
			<!-- </el-carousel-item> -->
			<!-- </el-carousel> -->
		</div>
		<notice-content :title="title" />
	</div>
</template>

<script>
	import noticeContent from "./Component/noticeList";
	export default {
		name: "Notice",
		data() {
			return {
				title: "公告通知",
				imgList: ["http://zsb.ygu.edu.cn/img/2.jpg", "http://zsb.ygu.edu.cn/img/3.jpg", "http://zsb.ygu.edu.cn/img/1.jpg"],
			};
		},
		components: {
			noticeContent,
		},
	};
</script>

<style scoped>
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
