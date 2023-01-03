<script>
	import {currentPage} from '~/api/store'
	import {sleep} from '~/api/util'
	import {saveMovieProgress, logout} from '~/api/firebase'
	import { baseUrl, apiKey } from '~/api/fetchTMDB'
	import Svelecte from 'svelecte';
	import {getCurrentTabUrl} from '~/api/browser-access'

	let saveButton = 'Save'
	let saveButtonDisabled = false

	let mediaLink = ''
	let value = null

	const handleLogout = () => {
		logout();
		currentPage.set('LOGIN')
	}

	const handleSave = async () => {
		console.log("Value: ", value)
		if(value.id==undefined || mediaLink=='') {
			console.log('Enter valid values')
			return
		}

		saveButton = 'Saving...'
		saveButtonDisabled = true

		await saveMovieProgress(value.id, value.title, mediaLink);

		saveButton = 'Saved!'
		value = null
		mediaLink = ''
		await sleep(500)
		saveButton = 'Save'
		saveButtonDisabled = false
	}

	const handleAutofill = async () => {
		mediaLink = await getCurrentTabUrl()
	}

	const handleMediaSearchResults = (response) => {
		return response.results.map(({id, title}) => ({ id, title	}));
	}
</script>

<div class="main-view">
	<button type="button" on:click={handleLogout}>Logout</button>
	<h2>Save your progress</h2>
	<div class="form-container">
		<div class="svelecte-container">
			<!-- <input type="text" bind:value={mediaName} name="media-name" placeholder="Enter name here..."/> -->
			<Svelecte
				bind:value
				inputId="media-input"
				minQuery={2}
				valueAsObject
				fetch={`${baseUrl}/search/movie?api_key=${apiKey}&language=en-US&query=[query]&include_adult=false`}
				fetchCallback={handleMediaSearchResults}
				placeholder="Enter name here..."
			/>
		</div>
		<div>
			<input
				type="text"
				class="media-link"
				bind:value={mediaLink}
				name="media-link"
				placeholder="Enter link here..."
			/>
			<button type="button" on:click={handleAutofill} class="link autofill"
				>Autofill</button
			>
		</div>
	</div>
	<button type="button" disabled={saveButtonDisabled} on:click={handleSave}
		>{saveButton}</button
	>
</div>

<style>
	.main-view {
		position: relative;
	}

	button:first-child {
		position: absolute;
		top: -50px;
		right: -200px;
	}

	h2 {
		margin-bottom: 2rem;
	}

	.form-container {
		display: flex;
		flex-direction: column;

		max-width: 300px;
	}

	button {
		margin-top: 1rem;
	}

	.autofill {
		position: fixed;
		left: 480px;
		top: 143px;

		background-color: transparent;
		text-decoration: none;

		border: none;
	}

	.autofill:hover {
		border: none;
		text-decoration: underline;
	}

	.autofill:active {
		color: rgba(116, 123, 255, 1);
	}

	input.media-link {
		width: 100%;
	}
</style>
