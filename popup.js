document.getElementById('checkUrls').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;
      chrome.runtime.sendMessage({ action: 'getAndValidateUrls', tabId }, (response) => {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';
        if (response.validUrls.length === 0) {
          resultsDiv.textContent = 'No valid URLs found.';
        } else {
          response.validUrls.forEach(url => {
            const p = document.createElement('p');
            p.textContent = url;
            p.classList.add('valid-url');
            resultsDiv.appendChild(p);
          });
        }
      });
    });
  });
  