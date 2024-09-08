<script>
	import { useUser } from '$lib/use-user';
	import '../app.css';

	const user = useUser();
</script>

<slot />

<nav class="mt-5 flex justify-center gap-3">
	<a href="/">Home</a>
	{#if !$user}
		<a href="/login">Login</a>
	{/if}
</nav>
