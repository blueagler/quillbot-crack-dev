chrome.webNavigation.onCommitted.addListener(async function ({ tabId }) {

  const scriptUrl = await chrome.runtime.getURL('quillbot.js');

  function inject(url) {
    const script = document.createElement('script');
    script.src = url;
    document.head.prepend(script);
  }

  chrome.scripting.executeScript({
    target: { tabId },
    func: inject,
    args: [scriptUrl]
  });

}, {
  url: [{ hostSuffix: 'quillbot.com' }]
});