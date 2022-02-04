import { sentEvent } from "analytic/sentry";
import { dialog, notify } from 'utils';
import { message } from 'message';
import { getStorageEnable } from 'utils/localStorage';
import store from 'store';


export const requestHookList = [
  {
    match: /rest.quillbot.com\/api/,
    overrideFunc(config) {

      config.withCredentials = true;

      return config
    }
  },
  {
    match: /rest.quillbot.com\/api\/paraphraser\/(single-paraphrase|freeze-words)/,
    overrideFunc(config) {

      const hookEnabled = getStorageEnable('hook-premium-token') && store.getState().remoteConfig.premium.enabled;

      notify(message.hookPremiumToken.success, 'info');

      if (hookEnabled) {

        config.withCredentials = false;
        config.headers.useridtoken = store.getState().remoteConfig.premium.firebase.access_token;

      }

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
];

export const responseHookList = [
  {
    match: /get-account-details/,
    overrideFunc(r) {
      r = JSON.parse(r);

      const hookEnabled = getStorageEnable('hook-premium');

      if (!r.data.profile.premium) {
        notify(hookEnabled ? message.hookPremium.success : message.hookPremium.disabled, hookEnabled ? 'success' : 'warning');
      }

      if (hookEnabled) {
        r.data.profile.premium = true;
      }

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

      if (rr.code === "USER_PREMIUM_FORBIDDEN") {
        if (getStorageEnable('hook-premium-token') && store.getState().remoteConfig.premium.enabled) {
          notify(message.hookPremiumToken.unavailable, 'error');
        } else {
          notify(message.hookPremiumToken.disabled, 'warning');
        }
      }

    }
  }
];
