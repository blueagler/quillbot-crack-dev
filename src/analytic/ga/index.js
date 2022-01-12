import ReactGA from "react-ga4";

export async function init() {
  ReactGA.initialize('G-H635ES4QGW');
  ReactGA.send("pageview");
}