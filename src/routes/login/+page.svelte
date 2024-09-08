<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import LoginForm from '$lib/login-form.svelte';
	import { getEmail } from '$lib/tools';
	import { sendMagicLink, useUser } from '$lib/use-user';
	import { onMount } from 'svelte';

	const user = useUser();

	onMount(() => {
		if ($user) {
			goto('/');
		}
	});

	let emailSent = false;
	let errorMessage: string | null = null;

	const sendLink = async (event: SubmitEvent) => {
		const email = getEmail(event);
		const originURL = $page.url.origin;
		await sendMagicLink(email, originURL);
		localStorage.setItem('emailForSignIn', email);
		emailSent = true;
		setTimeout(() => (emailSent = false), 5000);
	};
</script>

{#if !$user}
	<main class="mt-10 flex flex-col items-center justify-center gap-5">
		<LoginForm isConfirmPage={false} on:submit={sendLink} />
		{#if emailSent}
			<p class="text-blue-500">
				Email Sent! Check your mailbox. If you don't see it look under junk or spam!
			</p>
		{/if}
		{#if errorMessage}
			<p class="text-red-600">
				{errorMessage}
			</p>
		{/if}
	</main>
{/if}
