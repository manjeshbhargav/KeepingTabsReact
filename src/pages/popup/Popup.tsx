import React, { CSSProperties, Fragment } from 'react';
import { msg } from '@root/src/shared/msg';
import { useFilteredTabs } from './hooks/useFilteredTabs';

import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
} from '@mui/material';

function highlight(text: string, keyword: string) {
  const regExp = new RegExp(keyword, 'gi');
  if (keyword === '' || !regExp.test(text)) {
    return text;
  }

  const unhighlighted = text.split(regExp).map(
    (unmatched) => <span>{unmatched}</span>,
  );
  const highlighted = text.match(regExp).map(
    (matched) => <strong>{matched}</strong>,
  );
  const iterator = '0'.repeat(
    unhighlighted.length + highlighted.length,
  ).split('');

  return (
    <Fragment>
      {iterator.map((zero, i) => i % 2 === 0
        ? unhighlighted[i >> 1]
        : highlighted[i >> 1])}
    </Fragment>
  );
}

export default function Popup() {
  const [
    filteredTabs,
    filterKeyword,
    setFilterKeyword,
  ] = useFilteredTabs();

  const updateFilterKeyword = ({ target: { value } }) =>
    setFilterKeyword(value);

  const createFocusTabCallback = (id: number, windowId: number) =>
    () => msg.send('focustab', { tab: { id, windowId } });

  const styles: Record<string, CSSProperties> = {
    avatar: { height: 24, width: 24 },
    list: { maxHeight: 500, overflowY: 'auto', overflowX: 'hidden' },
    textField: { width: '100%' },
  };

  return (
    <>
      <TextField
        label={'Search open tabs'}
        onChange={updateFilterKeyword}
        style={styles.textField}
        variant={'filled'}>
      </TextField>
      <List style={styles.list}>
        {filteredTabs.map(({ favIconUrl, id, windowId, title, url }) =>
          <ListItem
            disablePadding
            key={id}>
            <ListItemButton
              onClick={createFocusTabCallback(id, windowId)}>
              <ListItemAvatar>
                <Avatar
                  src={favIconUrl || '../../../icon-16.png'}
                  sx={styles.avatar}>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={highlight(title, filterKeyword)}
                secondary={highlight(url, filterKeyword)}>
              </ListItemText>
            </ListItemButton>
          </ListItem>)}
      </List>
    </>
  );
};
