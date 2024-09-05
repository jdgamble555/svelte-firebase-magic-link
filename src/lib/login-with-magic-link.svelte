<script lang="ts">
	import { onMount } from 'svelte';
	import { getEmail } from './tools';
	import { detectMagicLink, isMagicLinkURL, sendMagicLink, signInWithMagic } from './use-user';

	let emailSent = false;

	const isConfirmPage = isMagicLinkURL();

	onMount(detectMagicLink);

	const confirmMagicLink = async (event: SubmitEvent) => {
		const email = getEmail(event);
		await signInWithMagic(email);
	};

	const sendLink = async (event: SubmitEvent) => {
		const email = getEmail(event);

		await sendMagicLink(email);

		emailSent = true;

		setTimeout(() => (emailSent = false), 5000);
	};
</script>

<main class="mt-10 flex flex-col items-center justify-center gap-5">
	<form on:submit|preventDefault={isConfirmPage ? confirmMagicLink : sendLink}>
		<div class="flex min-w-72 flex-col gap-5 rounded border p-5">
			<h1 class="text-3xl">Login with Magic Link</h1>
			{#if isConfirmPage}
				<p class="my-5">Please confirm your email address to login!</p>
			{:else}
				<p class="my-5">Enter your email address to receive a magic link to login!</p>
			{/if}
			<div>
				<label for="email" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
					Email Address
				</label>
				<input
					type="email"
					id="email"
					name="email"
					class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
				/>
			</div>
			<button
				type="submit"
				class="rounded-lg bg-stone-600 p-5 font-semibold text-white hover:opacity-75"
			>
				{isConfirmPage ? 'Login' : 'Send Link'}
			</button>
		</div>
	</form>
	{#if emailSent}
		<p class="text-red-600">
			Email Sent! Check your mailbox. If you don't see it look under junk or spam!
		</p>
	{/if}
</main>
