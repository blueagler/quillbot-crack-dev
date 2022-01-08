import { init as SentryInit } from "./sentry";
import { init as GaInit } from "./ga";

export async function init() {
  GaInit();

  SentryInit();

}