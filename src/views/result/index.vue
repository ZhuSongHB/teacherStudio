<template>
	<el-tabs type="border-card" @tab-click="handleClick">
		<el-tab-pane label="注册工作室进度">
			<register-studio />
		</el-tab-pane>
		<el-tab-pane label="课程置换方案申请进度">
			<course-scheme />
		</el-tab-pane>
		<el-tab-pane label="学分置换方案申请进度">
			<credit-scheme />
		</el-tab-pane>
		<el-tab-pane label="工作室承担实习毕业论文（设计）方案申请进度">
			<practice-scheme />
		</el-tab-pane>
		<el-tab-pane label="课程置换申请进度">
			<course />
		</el-tab-pane>
		<el-tab-pane label="学分置换申请进度">
			<credit />
		</el-tab-pane>
		<el-tab-pane label="承担实习进度">
			<internship />
		</el-tab-pane>
		<el-tab-pane label="承担毕业论文（设计）进度">
			<bishe />
		</el-tab-pane>
	</el-tabs>
</template>

<script>
	import registerStudio from "./registerStudio/index";
	import courseScheme from "./courseScheme/index";
	import course from "./course/index";
	import creditScheme from "./creditScheme/index";
	import credit from "./credit/index";
	import practiceScheme from "./practiceScheme/index";
	import internship from "./internship/index";
	import bishe from "./bishe/index";
	export default {
		data() {
			return {};
		},
		components: { bishe, internship, registerStudio, courseScheme, creditScheme, practiceScheme, course, credit },
		methods: {
			handleClick() {},
		},
	};
</script>

<style scoped lang="less">
	.type {
		font-size: 36px;
	}
	.el-tabs {
		min-height: 350px;
	}
	.el-card {
		width: 150px;
		cursor: pointer;
		.image {
			width: 100%;
		}
	}
</style>
