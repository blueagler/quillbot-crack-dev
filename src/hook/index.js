import { responseHookList, requestHookList } from "./rules";
import { proxy } from "ajax-hook";

export default function async() {
  proxy({
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