import { derived, Readable, Writable, writable } from 'svelte/store';
import storage from '~/api/storage'
import views from '~/api/views'

interface Notification {
	display: 'none'|'block',
	message: string,
}


const user: Writable<string> = writable(null);
const currentPage: Writable<string> = writable(views.LOGIN);

const _notification: Writable<Notification> = writable({display: 'none', message: ''});

const notification: Readable<any> = derived(_notification, ($_notification, set) => {
	const TIMEOUT = 1000;

	set($_notification)

	if ($_notification.display === 'block') {
		const timer = setTimeout(() => {
			set({display: 'none', message: ''})
		}, TIMEOUT)

		return () => {
			clearTimeout(timer)
		}
	}
});

const showNotification = (message: string) => {
	_notification.set({display: 'block', message})
}

(async function () {
	const userId: string = await storage.getItem('user')
	user.set(userId !== null ? userId : null)

	user.subscribe(value => {
		if(value !== null) {
			currentPage.set(views.MAIN)
		} else {
			currentPage.set(views.LOGIN)
		}
	})

})()

export {
	user, currentPage, notification, showNotification
}