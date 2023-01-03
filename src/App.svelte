<script>
	import Login from '~/views/Login.svelte'
	import Main from '~/views/Main.svelte'
	import Error from '~/views/Error.svelte'
	import {currentPage, notification} from '~/api/store'
    import { sleep } from './api/util';

	const components = { 
		'LOGIN': Login, 
		'MAIN': Main,
		'ERROR': Error,	 
	}

</script>

<main>
	<svelte:component this={components[$currentPage]} />
	<div class="notify-container" style="display: {$notification.display};">
		<h2><i class="bi bi-exclamation-circle"></i></h2>
		<p>{$notification.message}</p>
	</div>
</main>

<style>
	.notify-container {
		position:absolute;
		top: 0;
		right: 0;
		transform: translate(-10px, 10px);

		width: 200px;
		padding: 5px 0;
		border-radius: 5px;

		outline: 2px solid var(--danger-color);
	}

	.notify-container h2 {
		margin: 0;
		color: var(--danger-color);	
	}

	.notify-container p {
		margin: 0;
	}
</style>