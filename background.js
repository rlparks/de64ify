browser.contextMenus.create(
    {
        id: "decode-copy",
        title: "Decode Base64",
        contexts: ["selection"],
    },
    () => void browser.runtime.lastError
);

browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "decode-copy") {
        try {
            const decodedText = atob(info.selectionText);
            navigator.clipboard.writeText(decodedText);
            if (decodedText.substring(0, 4) === "http") {
                browser.tabs.create({ url: decodedText });
            }
        } catch (err) {
            browser.notifications.create({
                type: "basic",
                message: "Selection is not Base 64 encoded",
                title: "de64ify",
            });
        }
    }
});
