<script lang="ts">
	import { page } from '$app/stores';
	import LoginForm from '$lib/login-form.svelte';
	import { getEmail } from '$lib/tools';
	import { sendMagicLink } from '$lib/use-user';
	import { error } from '@sveltejs/kit';
	import type { PageData } from './$types';
	import Loading from '$lib/loading.svelte';

	export let data: PageData;

	let emailSent = false;

	const sendLink = async (event: SubmitEvent) => {
		const email = getEmail(event);
		const originURL = $page.url.origin;
		const sendError = await sendMagicLink(email, originURL);
		if (sendError) {
			error(500, sendError.message);
		}
		localStorage.setItem('emailForSignIn', email);
		emailSent = true;
		setTimeout(() => (emailSent = false), 5000);
	};
</script>

{#if data.loading}
	<Loading />
	<p class="my-5 text-center text-xl font-bold">Loading...</p>
{:else}
	<main class="mt-10 flex flex-col items-center justify-center gap-5">
		<LoginForm isConfirmPage={false} on:submit={sendLink} />
		{#if emailSent}
			<p class="text-blue-500">
				Email Sent! Check your mailbox. If you don't see it look under junk or spam!
			</p>
		{/if}
	</main>
{/if}
