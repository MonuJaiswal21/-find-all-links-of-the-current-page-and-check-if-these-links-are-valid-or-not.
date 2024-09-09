// // content.js

// Function to collect all links on the page
function collectLinks() {
    const links = Array.from(document.querySelectorAll('a'));
    const linkDetails = links.map(link => ({
        href: link.href,
        text: link.innerText
    }));
    return linkDetails;
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'analyzeLinks') {
        const linkDetails = collectLinks();
       //const isTextValid = text.length > 0;
        if(linkDetails) {
        console.log(linkDetails);
        }else{
            console.log('is not valid');
        }
    }
   });
