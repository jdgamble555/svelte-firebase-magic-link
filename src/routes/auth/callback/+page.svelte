<script lang="ts">
	import { error } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import LoginForm from '$lib/login-form.svelte';
	import { getEmail } from '$lib/tools';
	import { signInWithMagic } from '$lib/use-user';
	import Loading from '$lib/loading.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const confirmMagicLink = async (event: SubmitEvent) => {
		const email = getEmail(event);
		const urlString = $page.url.toString();
		const signInError = await signInWithMagic(email, urlString);
		if (signInError) {
			error(500, signInError.message);
		}
		localStorage.removeItem('emailForSignIn');
		goto('/');
	};
</script>

{#if data.loading}
	<Loading />
	<p class="my-5 text-center text-xl font-bold">Logging you in...</p>
{:else}
	<main class="mt-10 flex flex-col items-center justify-center gap-5">
		<LoginForm isConfirmPage={true} on:submit={confirmMagicLink} />
	</main>
{/if}
