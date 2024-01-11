import { useContext } from 'react';
import { List } from '@mui/material';
import { Tab } from './Tab';
import { TabsContext } from './TabsProvider';
import { StylesContext } from './StylesProvider';

export function Tabs() {
  const { list } = useContext(StylesContext);
  const { tabs } = useContext(TabsContext);

  return (
    <List style={list}>
      {tabs.map((tab) => <Tab {...tab} key={tab.id} />)}
    </List>
  );
}
