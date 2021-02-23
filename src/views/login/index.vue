<template>
	<div class="register">
		<div class="radio">
			<el-radio v-model="change" label="0">学生认证</el-radio>
			<el-radio v-model="change" label="1">老师认证</el-radio>
		</div>
		<student-register :change="change" v-if="change == '0'" />
		<teacher-register :change="change" v-else />
	</div>
</template>

<script>
	import studentRegister from './childComponents/student.vue';
	import teacherRegister from './childComponents/teacher.vue';
	export default {
		name: 'register',
		data() {
			return {
				//切换 0是学生，1是老师
				change: '0',
			};
		},
		components: {
			studentRegister,
			teacherRegister,
		},
	};
</script>
<style scoped>
	.register {
		width: 450px;
		margin: 50px auto;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		padding-bottom: 300px;
	}
	.radio {
		margin-bottom: 50px;
		display: flex;
	}
	.el-input {
		width: 217px;
	}
	label {
		width: 100px;
	}
	@media screen and (max-width: 656px) {
		.register {
			width: 350px;
			margin: 50px auto 0;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			padding-bottom: 180px;
		}
		.radio {
			margin-bottom: 50px;
			display: flex;
		}
		.el-input {
			width: 217px;
		}
		label {
			width: 100px;
		}
	}
</style>
