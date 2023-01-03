import browser from "webextension-polyfill";

export async function getCurrentTabUrl(): Promise<string> {

	const queryObj: browser.Tabs.QueryQueryInfoType = {
		'active': true,
	}

	const activeTab: browser.Tabs.Tab = (await browser.tabs.query(queryObj))[0]


	return (activeTab === undefined) || (activeTab.url === undefined) ? '' : activeTab.url
} 