<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import LoginForm from '$lib/login-form.svelte';
	import { getEmail } from '$lib/tools';
	import { signInWithMagic } from '$lib/use-user';
	import { onMount } from 'svelte';
	import Loading from '$lib/loading.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let loading = true;

	onMount(() => {
		const email = data.email;
		if (!email) {
			loading = false;
			return;
		}
		confirmMagicLink(email);
	});

	let errorMessage: string | null = null;

	const confirmForm = async (event: SubmitEvent) => {
		const email = getEmail(event);
		await confirmMagicLink(email);
	};

	const confirmMagicLink = async (email: string) => {
		const urlString = $page.url.toString();
		const signInError = await signInWithMagic(email, urlString);
		if (signInError) {
			errorMessage = signInError.message;
			return;
		}
		localStorage.removeItem('emailForSignIn');
		goto('/');
	};
</script>

{#if loading}
	<Loading />
	<p class="my-5 text-center text-xl font-bold">Logging you in...</p>
{:else}
	<main class="mt-10 flex flex-col items-center justify-center gap-5">
		<LoginForm isConfirmPage={true} on:submit={confirmForm} />
		{#if errorMessage}
			<p class="text-red-600">
				{errorMessage}
			</p>
		{/if}
	</main>
{/if}
