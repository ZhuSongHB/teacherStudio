<template>
	<div class="noticeDetail">
		<div class="Breadcrumb">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/notice' }">公告通知</el-breadcrumb-item>
				<el-breadcrumb-item>公告详情</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="content">
			<div class="title">标题</div>
			<div class="time">年/月/日</div>
			<div class="text">
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque itaque quam delectus in asperiores tempora amet quae aut neque totam possimus aliquid autem laboriosam, commodi porro deleniti soluta consequatur? Et. Eaque
				necessitatibus natus alias numquam at iusto ex quasi officia nobis corrupti recusandae fuga enim, dicta consequuntur voluptatem repellat nostrum perferendis soluta deleniti, quas temporibus autem dolorem! Deserunt, ab ducimus. Ipsa,
				ullam recusandae eius consectetur alias sapiente deserunt. Blanditiis corporis sint at, eos deserunt quia soluta! Facilis provident non tempore obcaecati voluptas at veritatis sint dolorem ipsam fugiat. Eaque, quasi? Magnam, fuga hic.
				Voluptates incidunt fugit nulla tempora adipisci consectetur soluta corrupti pariatur, laudantium voluptatem! Excepturi esse velit doloremque nisi? Minima animi esse quisquam placeat ad minus vero, ullam architecto? Deleniti
				doloremque iste ut velit, architecto ea?
				<div>
					Qui voluptate molestiae, totam exercitationem facilis necessitatibus labore dolorem, quod cupiditate ducimus illum, rem sapiente expedita quidem. Sunt quos iusto asperiores excepturi explicabo! Quo atque adipisci quasi beatae
					voluptatibus ipsa provident? Minima sapiente rerum magni quidem doloremque eligendi maxime, amet, debitis corporis porro temporibus voluptatibus libero sequi! Magni ipsa minus quis nostrum dicta! Sunt consectetur dignissimos quod
					facilis totam harum, quis ex maiores, libero sit odit corrupti ipsa aliquam ullam voluptate?
				</div>
				<div>
					Incidunt ex esse aliquid voluptates, maxime eos quae placeat quas aperiam deleniti. Repellat nobis blanditiis nesciunt neque quo necessitatibus voluptatum eligendi, vitae eaque suscipit architecto sit, unde quisquam ipsum beatae
					non provident atque rem? Quod minima, architecto porro culpa veritatis expedita reiciendis! Enim nobis laborum voluptas in vero ipsa corporis accusantium est dolores accusamus debitis harum consequatur sed ratione eius ullam
					explicabo quibusdam, dicta esse natus corrupti distinctio voluptatum. Explicabo, eos tempora! Repellat beatae assumenda natus dolorem officia expedita vel sunt, reprehenderit neque enim ipsam quia esse facere ad dignissimos aut
					nostrum debitis ipsa consequuntur. Non saepe aliquam odio modi dolor error. Accusamus quae velit autem sapiente aperiam, saepe odio soluta reiciendis animi ad atque quasi, facilis iste vel nam architecto eos dolorum modi possimus
					repudiandae? Aut magni optio consectetur minus eum! Dolore voluptatibus consequuntur officia quas, enim dolorem eligendi ab non doloremque dicta obcaecati possimus repellendus quos reiciendis. Architecto in fugiat odio alias
					earum? Perspiciatis natus exercitationem numquam dicta quasi sunt! Dignissimos qui cumque placeat delectus beatae recusandae nihil deserunt consectetur hic, excepturi rerum eum. Aliquam, a fuga quod corporis sunt maxime commodi
					non nostrum voluptatem doloribus ratione asperiores, eveniet quo? Molestiae, eveniet sapiente aliquid distinctio ad ducimus impedit consequuntur magnam commodi voluptates delectus maiores fugiat aspernatur enim nostrum. Soluta
					sint ipsum id sit vitae eum explicabo ex hic maxime architecto. Laboriosam, consequuntur ab hic iusto mollitia provident. Delectus, nulla adipisci. Exercitationem, quod sed. Sed quos, eveniet adipisci, earum maxime vero expedita
					possimus aperiam repellendus doloremque architecto facere iure neque explicabo. Expedita maiores eveniet cumque perspiciatis consequuntur in placeat voluptatibus voluptatem! Repudiandae dolorum, iste quam pariatur repellat dolor
					aspernatur deserunt inventore alias labore? Esse officiis nam molestiae ea cum nisi qui? Consectetur esse veritatis nihil doloremque culpa eaque voluptates dolor natus, ad ab aut veniam assumenda cupiditate corporis provident
					error quod! Odio minus dolores asperiores molestiae! Fuga cum rem at ab! Iusto, voluptatum blanditiis nihil quisquam sapiente ut itaque praesentium hic dolorem, ad quasi assumenda ipsa harum est dolorum quaerat. Culpa veniam in
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: "NoticeDetail",
	};
</script>
<style scoped>
	.el-breadcrumb {
		display: flex;
		justify-content: flex-end;
		padding-bottom: 20px;
		border-bottom: 1px solid black;
	}
	.content {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
	.content .title {
		font-size: 55px;
		width: 160px;
		margin-bottom: 20px;
		margin-top: 20px;
	}
	.content .time {
		align-self: center;
		color: #6c6c6c;
		width: 70px;
	}
	.content .text {
		text-indent: 2em;
	}
</style>
