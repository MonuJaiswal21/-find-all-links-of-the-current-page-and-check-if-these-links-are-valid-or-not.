async function checkLink(url) {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
}

async function findAndCheckLinks() {
  const links = Array.from(document.querySelectorAll('a')).map(a => a.href);
  const results = await Promise.all(links.map(async (link) => {
    const valid = await checkLink(link);
    return { link, valid };
  }));

  // Send results to background script
  chrome.storage.local.set({ linkResults: results });
}

findAndCheckLinks();

  