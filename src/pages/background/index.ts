import { msg } from '@root/src/shared/msg';

msg.addEventListener('getopentabs', ({ callback }) =>
  chrome.tabs.query({}, (tabs) =>
    callback(tabs.map(({ active, favIconUrl, id, title, url, windowId }) =>
      ({ active, favIconUrl, id, title, url, windowId })))));

msg.addEventListener('focustab', ({ data: { tab: { id, windowId } } }) => {
  chrome.windows.update(windowId, { focused: true });
  chrome.tabs.update(id, { active: true });
});
