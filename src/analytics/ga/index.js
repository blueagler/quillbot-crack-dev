import { initialize, pageview } from 'react-ga';

export async function init() {
  initialize('G-H635ES4QGW');
  pageview(window.location.pathname + window.location.search);
}