chrome.contextMenus.create({
    id: "closeTabsToTheLeft",
    title: "Close Tabs to the Left",
    contexts: ["page_action", "page"],

});

async function closeLeftTabs(tab) {
    let currentTabIndex = tab.index;
    let tabs = await chrome.tabs.query({ currentWindow: true }) // gets all tabs in current window
    let tabsToTheLeft = await tabs.filter((tab) => tab.index < currentTabIndex);
    await chrome.tabs.remove(tabsToTheLeft.map((tab) => tab.id));
}

chrome.action.onClicked.addListener(closeLeftTabs);

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === "closeTabsToTheLeft") await closeLeftTabs(tab)
});

chrome.commands.onCommand.addListener(async command => {
    let tab = await chrome.tabs.query({ active: true, currentWindow: true })
    console.log(tab, await chrome.tabs.query({ currentWindow: true }))
    if (command === "closeTabsToTheLeftCommand") await closeLeftTabs(tab[0])
})
