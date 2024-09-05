<script lang="ts">
	import LoginWithMagicLink from '$lib/login-with-magic-link.svelte';
	import Logout from '$lib/logout.svelte';
	import Profile from '$lib/profile.svelte';
	import { useUser } from '$lib/use-user';

	const user = useUser();
</script>

{#if !$user}
	<LoginWithMagicLink />
{:else}
	<div class="flex flex-col items-center gap-5">
		<Profile user={$user} />
		<Logout />
	</div>
{/if}
