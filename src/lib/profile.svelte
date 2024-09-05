<script lang="ts">
	export let user: UserType;
</script>

<div class="flex flex-col items-center justify-center gap-3">
	<h3 class="text-2xl font-bold">Hi {user.displayName}!</h3>

	{#if user.photoURL}
		<img src={user.photoURL} height="100" width="100" alt="user avatar" />
	{/if}
	<p>Your userID is <b>{user.uid}</b></p>
</div>
