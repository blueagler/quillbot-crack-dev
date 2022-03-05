import { init as SentryInit } from "@sentry/react";
import { captureMessage, Severity } from "@sentry/react";
import config from "./config";

export async function init() {
  SentryInit(config);
}
export async function sentEvent(data) {
  captureMessage(data.action, {
    contexts: {
      body: data.value
    },
    level: Severity.Info,
  });
}