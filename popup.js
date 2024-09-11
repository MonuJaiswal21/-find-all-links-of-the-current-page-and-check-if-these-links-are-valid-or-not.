document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get('linkResults', ({ linkResults }) => {
      const resultsDiv = document.getElementById('results');
      if (linkResults) {
        resultsDiv.innerHTML = '';
        linkResults.forEach(({ link, valid }) => {
          const linkElement = document.createElement('div');
          linkElement.className = 'link';
          linkElement.innerHTML = `
            <a href="${link}" target="_blank">${link}</a> - <span class="${valid ? 'valid' : 'invalid'}">${valid ? 'Valid' : 'Invalid'}</span>
          `;
          resultsDiv.appendChild(linkElement);
        });
      } else {
        resultsDiv.textContent = 'No links found.';
      }
    });
  });
  