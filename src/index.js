import { render } from "preact";
import Main from './main';

const injectDomContainer = document.createElement('div');
render(<Main />, injectDomContainer);
if (document.body) {
  document.body.appendChild(injectDomContainer);
} else {
  window.addEventListener('DOMContentLoaded', () => document.body.appendChild(injectDomContainer));
}