export default {
  dsn: "https://85e360c77e454ef4b90fc2ee8a6e5fc7@o1050901.ingest.sentry.io/6066382",
  tracesSampleRate: 0,
  beforeSend(event) {
    event.user = window.__NEXT_REDUX_WRAPPER_STORE__ ? window.__NEXT_REDUX_WRAPPER_STORE__.getState().user : 'Don\'t know';
    return event;
  },
}