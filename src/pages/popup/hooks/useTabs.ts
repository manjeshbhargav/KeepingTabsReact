import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { msg } from '@root/src/shared/msg';

export function useTabs(): [
  chrome.tabs.Tab[],
  string,
  Dispatch<SetStateAction<string>>,
] {
  const [tabs, setTabs] = useState<chrome.tabs.Tab[]>([]);
  const [filteredTabs, setFilteredTabs] = useState<chrome.tabs.Tab[]>([]);
  const [filterKeyword, setFilterKeyword] = useState<string>('');

  useEffect(() => {
    setFilteredTabs(tabs.filter(({ title, url }) => {
      const regExp = new RegExp(filterKeyword, 'gi');
      return regExp.test(title) || regExp.test(url);
    }));
  }, [filterKeyword, tabs]);

  useEffect(() => {
    msg.send('getopentabs', null, setTabs);
  }, []);

  return [filteredTabs, filterKeyword, setFilterKeyword];
}
