import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import 'webextension-polyfill';
import { msg } from '@root/src/shared/msg';

reloadOnUpdate('pages/background');

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate('pages/content/style.scss');

msg.addEventListener('getopentabs', ({ callback }) =>
  chrome.tabs.query({}, (tabs) =>
    callback(tabs.map(({ active, favIconUrl, id, title, url, windowId }) =>
      ({ active, favIconUrl, id, title, url, windowId })))));

msg.addEventListener('focustab', ({ data: { tab: { id, windowId } } }) => {
  chrome.windows.update(windowId, { focused: true });
  chrome.tabs.update(id, { active: true });
});
