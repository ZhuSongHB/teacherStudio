<template>
	<div class="login">
		<login-item></login-item>
	</div>
</template>
<script>
	import LoginItem from './childComponents/LoginItem';
	export default {
		name: 'Login',
		components: {
			LoginItem,
		},
	};
</script>
