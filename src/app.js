import hook from "hook";
import check from 'check';
import inject from 'inject';
import { init as initAnalytics } from 'analytics';
import globalStyle from './globalStyle';

check();
initAnalytics();
hook();
inject();
globalStyle();