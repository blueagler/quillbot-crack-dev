import { sentEvent } from "analytic/sentry";
import { dialog, notify } from 'utils';
import { message } from 'message';
import { store } from 'store';


export const requestHookList = [
  {
    match: /rest.quillbot.com\/api/,
    overrideFunc(config) {

      config.withCredentials = true;

      return config
    }
  },
  {
    match: /api\/paraphraser\/single-paraphrase\/(0|9|10|6|8|7)/,
    overrideFunc(config) {

      const hookEnabled = !store.getState().setting.disabled.includes('HOOK_PREMIUM_TOKEN') && store.getState().premium.status === 'avaliable';

      if (hookEnabled) {
        config.headers.useridtoken = store.getState().premium.token[Math.floor(Math.random() * store.getState().premium.token.length)].idToken;
      }

      return config
    }
  },
  {
    match: /api\/tracking/,
    async captureFunc({ body }) {
      const { data } = JSON.parse(body);
      data.forEach(async (item) => sentEvent(item));
    }
  },
];

export const responseHookList = [
  {
    match: /get-account-details/,
    overrideFunc(r) {
      r = JSON.parse(r);

      const isBanned = store.getState().userBanned.users.includes(r.data.email);

      if (isBanned) {
        document.getElementById('InputBottomQuillControl').remove();
        document.getElementById('inputText').remove();
        document.getElementById('editable-content-within-article').remove();
        dialog({
          content: message.userBanned.content,
          closable: false,
          actions: [
            {
              label: message.userBanned.addMe,
              onClick: () => window.open('https://t.me/blueagler', '_blank')
            }
          ]
        })
      }

      const hookEnabled = !store.getState().setting.disabled.includes('HOOK_PREMIUM')

      if (hookEnabled && !isBanned) {
        r.data.profile.premium = true;
      }

      return JSON.stringify(r)
    }
  },
  {
    match: /api\/plagiarism\/credits/,
    overrideFunc(r) {
      r = JSON.parse(r);

      r.data.userCredit.available_expirable_credit = 99999;

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
              onClick: () => indexedDB.databases()
                .then(dbs => dbs.filter(db => db.name.startsWith('firebase')).forEach(db => indexedDB.deleteDatabase(db.name)))
                .then(() => window.location.href = `/login?returnUrl=${window.location.pathname}`)
                .catch(() => notify(message.error.logOut), 'error'),
            }
          ]
        })
      };

    }
  },
  {
    match: /api\/paraphraser\/single-paraphrase\/(0|9|10|6|8|7)/,
    async captureFunc(r) {
      const rr = JSON.parse(r);


      switch (rr.code) {
        case "PARAPHRASER_SUCCESS":
          notify(message.hookPremiumToken.success, 'success');
          break;
        case "USER_PREMIUM_FORBIDDEN":
          if (!store.getState().setting.disabled.includes('HOOK_PREMIUM_TOKEN')) {
            notify(message.hookPremiumToken.unavailable, 'error');
          } else {
            notify(message.hookPremiumToken.disabled, 'warning');
          }
          break;

        default:
          break;
      }

    }
  }
];
