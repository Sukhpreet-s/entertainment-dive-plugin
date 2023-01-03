import browser from 'webextension-polyfill';

async function setItem(key: string, value: any): Promise<void> {

	try {
		await browser.storage.local.set({[key]: JSON.stringify(value)})
	} catch (error) {
		console.log("Ahhhhhh! Error caught: ", error);
	}
}

async function getItem(key: string): Promise<any> {
	try {
		const value: Record<string, any> = await browser.storage.local.get(key)

		if (value['user'] === undefined) {
			console.log('no user found!')
			return null
		}
		
		console.log(`Yey value retrieved!! ${key}`, JSON.parse(value['user']))
		return value['user']
	} catch (error) {
		console.log("Ahhhhhh! Error caught: ", error);
		return null
	}
}

function removeItem(key: string): void {
	browser.storage.local.remove(key)
}

export default {
	setItem,
	getItem,
	removeItem
}