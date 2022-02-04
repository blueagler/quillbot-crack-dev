import { responseHookList, requestHookList } from "./rules";
import { proxy as p, unProxy as u } from "ajax-hook";

export function proxy() {
  p({
    onRequest: (config, handler) => {
      const matchedRules = requestHookList.filter(({ match }) => match.test(config.url));
      if (matchedRules) {
        matchedRules.forEach((rule) => {
          if (rule.overrideFunc) {
            config = rule.overrideFunc(config);
          }
          if (rule.captureFunc) {
            rule.captureFunc(config);
          }
        })
      }
      handler.next(config);
    },
    onResponse: (response, handler) => {
      const matchedRules = responseHookList.filter(({ match }) => match.test(response.config.url));
      if (matchedRules) {
        matchedRules.forEach((rule) => {
          if (rule.overrideFunc) {
            response.response = rule.overrideFunc(response.response);
          }
          if (rule.captureFunc) {
            rule.captureFunc(response.response);
          }
        })
      }
      handler.next(response);
    }
  })
}
export function unproxy() {
  u();
}