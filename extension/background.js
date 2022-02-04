chrome.webNavigation.onCommitted.addListener(function ({ tabId }) {

  const scriptUrl = 'https://script.blueagle.top/chrome_extension/quillbot.js';

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