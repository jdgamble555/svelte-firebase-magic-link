<script lang="ts">
	import Logout from '$lib/logout.svelte';
	import Profile from '$lib/profile.svelte';
	import { useUser } from '$lib/use-user';

	const user = useUser();
</script>

<div class="flex flex-col items-center gap-5">
	{#if !$user}
		<a class="mt-10 rounded-lg border bg-emerald-600 p-3 font-semibold text-white" href="/login">Login to the Site</a>
	{:else}
		<Profile user={$user} />
		<Logout />
	{/if}
</div>
