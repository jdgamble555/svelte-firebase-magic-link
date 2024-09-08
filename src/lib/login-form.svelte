<script lang="ts">
	export let isConfirmPage: boolean;
</script>

<form on:submit>
	<div class="flex min-w-72 flex-col gap-5 rounded border p-5">
		<h1 class="text-3xl">Login with Magic Link</h1>
		<p class="my-5">
			{#if isConfirmPage}
				Please confirm your email address to login!
			{:else}
				Enter your email address to receive a magic link to login!
			{/if}
		</p>
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
