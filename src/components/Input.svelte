<script>
	export let type = 'text'
	export let value = ''
	export let placeholder = ''
	export let validateRegex = null
	export let errorMsg = null
	export let isValid = true

	const handleInput = (e) => {
		value = e.target.value

		if(validateRegex !== null)
			validateRegexHandler(e.target.value)
	}

	const validateRegexHandler = (input) => {
		isValid = (input.match(validateRegex) == null) ? false : true
	}

</script>

<div class="input-container">
	<input
		{value}
		{type}
		on:input={handleInput}
		{placeholder}
		class:input-isInvalid={!isValid && value.length > 0}
	/>
	<i
		class="bi bi-exclamation-circle"
		class:icon-isInvalid={!isValid && value.length > 0}
	/>
	<div class="error-message" class:error-isInvalid={!isValid && value.length > 0}>{errorMsg}</div>
</div>

<style>
	.input-container {
		margin-bottom: 10px;
	}

	input {
		background-color: rgba(63, 63, 63, 1);
		outline: none;
		border: none;

		width: 200px;
		padding: 0 8px;
		padding-right: 25px;
		line-height: 2rem;

		font-size: 1em;

		margin-bottom: 0;

		border-radius: 6px;
	}

	input:focus {
		outline: 1px solid rgba(116, 123, 255, 1);
	}

	input::placeholder {
		color: rgba(255, 255, 255, 0.87);
	}

	.input-isInvalid {
		outline: 1px solid rgb(255, 116, 116) !important;
	}

	i {
		color: rgb(255, 116, 116);
		position: absolute;
		/* Transform values found by trial and error */
		transform: translate(-25px, 3px);

		visibility: hidden;
		background-color: rgba(63, 63, 63, 1);
		padding-left: 5px;
		padding-right: 5px;
	}

	.icon-isInvalid {
		visibility: visible;
	}

	.error-message {
		display: none;
		margin: 0;
		padding: 0;
		/* margin-bottom: 10px; */

		color: rgb(255, 116, 116);
	}

	.error-isInvalid {
		display: block;
	}
</style>
