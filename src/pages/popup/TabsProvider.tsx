import { createContext, Dispatch, SetStateAction } from 'react';
import { useTabs } from './hooks/useTabs';

interface ITabsContext {
  filterKeyword: string,
  setFilterKeyword: Dispatch<SetStateAction<string>>,
  tabs: chrome.tabs.Tab[],
}

export const TabsContext = createContext<ITabsContext>(null);


export function TabsProvider({ children }) {
  const [
    tabs,
    filterKeyword,
    setFilterKeyword,
  ] = useTabs();

  return (
    <TabsContext.Provider value={{
      filterKeyword,
      setFilterKeyword,
      tabs,
    }}>
      {children}
    </TabsContext.Provider>
  );
}

