import { init as SentryInit } from "@sentry/react";
import { captureMessage, Severity } from "@sentry/react";
import config from "./config";

export async function init() {
  SentryInit(config);
}
export async function sentEvent(name, data) {
  captureMessage(name, {
    contexts: {
      body: { ...(data instanceof Object ? data : JSON.parse(data)) },
    },
    level: Severity.Info,
  });
}