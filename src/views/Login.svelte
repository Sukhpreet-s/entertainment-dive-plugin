<script>
import {currentPage, user, showNotification} from '~/api/store'
import {login} from '~/api/firebase'
import Input from '~/components/Input.svelte';

let buttonText = 'Login'

let formValidity = {
	email: {
		value: '',
		isValid: false,
		errorMsg: 'Requires a valid email address!',
		regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
	},
	password: {
		value: '',
		isValid: false,
		// Password regex: alphanumeric/1 number/1 special/atleast 6 characters.
		errorMsg: 'Requires atleast 6 characters, 1 number and 1 special character!',
		regex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^\)\(])[A-Za-z\d@$!%*#?&^\)\(]{6,}$/g,
	},
}

$: buttonDisabled = !formValidity.email.isValid || !formValidity.password.isValid

const handleClick = async () => {
	
	if (formValidity.email.isValid===false || formValidity.password.isValid===false) {
		console.log('Enter valid credentials')
		return;
	}

	try {
		const loginUser = await login(formValidity.email.value, formValidity.password.value);
		user.set(loginUser);

		// if login sucessful, navigate to main page
		currentPage.set('MAIN')

	} catch(error) {

		showNotification(error)

		// console.error(error)
		return;
	}
	

	// otherwise, navigate to error page.
}
</script>

<div class="login-view">
	<h2>Login to track media</h2>
	<form>
		<div>
			<Input
				type="email"
				bind:value={formValidity.email.value}
				bind:isValid={formValidity.email.isValid}
				validateRegex={formValidity.email.regex}
				errorMsg={formValidity.email.errorMsg}
				placeholder="Enter email here..."
			/>
		</div>
		<div>
			<Input
				type="password"
				bind:value={formValidity.password.value}
				bind:isValid={formValidity.password.isValid}
				validateRegex={formValidity.password.regex}
				errorMsg={formValidity.password.errorMsg}
				placeholder="Enter password here..."
			/>
		</div>
		<button type="button" disabled={buttonDisabled} on:click={handleClick}
			>{buttonText}</button
		>
	</form>
</div>
