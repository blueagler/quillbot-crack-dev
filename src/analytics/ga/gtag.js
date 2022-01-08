export const install = (trackingId, additionalConfigInfo = {}) => {
  const scriptId = 'quillbot-crack--ga';

  if (document.getElementById(scriptId)) return;

  const script = document.createElement('script');
  script.id = scriptId;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];

  gtag('js', new Date());
  gtag('config', trackingId, additionalConfigInfo);
};

export const gtag = function () {
  window.dataLayer.push(arguments);
};