<script>
	import { page } from '$app/stores';
</script>

<div class="mt-10 flex justify-center">
	<p class="text-center text-xl">There was a problem... {$page.error?.message}. Try going home!</p>
</div>
