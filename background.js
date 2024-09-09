// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getAndValidateUrls') {
      chrome.scripting.executeScript(
        {
          target: { tabId: message.tabId },
          function: getAllUrlsFromPage
        },
        (results) => {
          const urls = results[0].result;
          validateUrls(urls).then(validUrls => {
            sendResponse({ validUrls });
          });
        }
      );
      // Indicate that we will send a response asynchronously
      return true;
    }
  });
  
  // Function to get all URLs from the page
  function getAllUrlsFromPage() {
    const urls = Array.from(document.querySelectorAll('a')).map(a => a.href);
    return urls;
  }
  
  // Function to check if a URL is valid
  async function validateUrls(urls) {
    const results = await Promise.all(urls.map(async (url) => {
      try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok ? url : null;
      } catch {
        return null;
      }
    }));
    return results.filter(url => url !== null);
  }
  