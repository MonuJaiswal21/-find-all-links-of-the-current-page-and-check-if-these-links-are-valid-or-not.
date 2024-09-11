chrome.action.onClicked.addListener(async (tab) => {
    // Inject content script into the current active tab
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
      });
    } catch (error) {
      console.error(`Error injecting script: ${error}`);
    }
  });
  