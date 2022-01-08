import { sentEvent } from "analytics/sentry";
import { dialog, notify } from 'utils';
import { message } from 'message';

export const requestHookList = [
  {
    match: /rest.quillbot.com\/api/,
    overrideFunc(config) {

      config.withCredentials = true;

      return config
    }
  },
  {
    match: /api\/utils\/sentence-spiltter/,
    async captureFunc(config) {
      sentEvent('paraphrase', config.body);
    }
  },
  {
    match: /api\/utils\/grammar-check/,
    async captureFunc(config) {
      sentEvent('grammar-check', config.body);
    }
  },
  {
    match: /api\/summarizer\/summarize-para\/abs/,
    async captureFunc(config) {
      sentEvent('summarize-paragraph', config.body);
    }
  },
  {
    match: /api\/summarizer\/summarize-para\/ext/,
    async captureFunc(config) {
      sentEvent('summarize-key-sentences', config.body);
    }
  },
  {
    match: /api\/utils\/bib-search/,
    async captureFunc(config) {
      sentEvent('bib-search', config.body);
    }
  },
  {
    match: /api\/write-assist\/create-project/,
    async captureFunc(config) {
      sentEvent('create-project', config.body);
    }
  },
];

export const responseHookList = [
  {
    match: /get-account-details/,
    overrideFunc(r) {
      r = JSON.parse(r);

      r.data.profile.premium = true;

      notify(message.hookPremium.success, 'success');
      return JSON.stringify(r)
    }
  },
  {
    match: /api\/(utils\/(sentence-spiltter|grammar-check|bib-search)|summarizer\/summarize-para\/(abs|ext)|paraphraser\/(single-(paraphrase|flip)|segment)|write-assist\/list-projects)/,
    async captureFunc(r) {
      const rr = JSON.parse(r);
      if (rr.code === "SESSION_FAILED") {
        dialog({
          content: message.sessionExpired.content,
          actions: [
            {
              label: message.sessionExpired.no,
              onClick: () => { },
            },
            {
              label: message.sessionExpired.yes,
              onClick: () => {
                indexedDB.databases()
                  .then(dbs => dbs.filter(db => db.name.startsWith('firebase')).forEach(db => indexedDB.deleteDatabase(db.name)))
                  .then(() => window.location.href = `/login?returnUrl=${window.location.pathname}`)
                  .catch(() => notify(message.error.logOut), 'error');
              },
            }
          ]
        })
      };

    }
  },
  {
    match: /api\/write-assist\/list-projects/,
    async captureFunc(r) {
      const rr = JSON.parse(r);

      if (rr.code === "COM_OK") {
        sentEvent('list-projects', { ...rr.data })
      }

    }
  },
  {
    match: /api\/write-assist\/restore-project/,
    async captureFunc(r) {
      const rr = JSON.parse(r);

      if (rr.code === "COM_OK") {
        sentEvent('restore-projects', rr.data)
      }

    }
  },
];
