// This file contains all the utility functions.

export const sleep = (seconds) => {
	return new Promise(resolve => { setTimeout(resolve, seconds*1000) })
}

export async function login(email, password) {
	return sleep(1000)
}
export async function logout() {
	return sleep(1000)
}
export async function saveProgress() {
	return sleep(1000)
}