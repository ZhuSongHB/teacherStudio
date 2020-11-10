<template>
	<div id="app">
		<router-view />
	</div>
</template>
<script>
	export default {
		created() {
			document.title = '阳光学院-名师工作室';
		},

		// mounted() {
		// 	document.title = '阳光学院-名师工作室';
		// },
	};
</script>
<style>
	* {
		margin: 0;
		padding: 0;
	}
</style>
