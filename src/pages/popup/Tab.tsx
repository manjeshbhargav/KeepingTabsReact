import { Fragment, useContext } from 'react';
import { msg } from '@root/src/shared/msg';
import { Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { StylesContext } from './StylesProvider';
import { TabsContext } from './TabsProvider';

const DEFAULT_FAVICON_URL = '../../../icon-16.png';

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

export function Tab({
  active,
  favIconUrl = DEFAULT_FAVICON_URL,
  id,
  windowId,
  title,
  url,
}: chrome.tabs.Tab) {
  const { avatar } = useContext(StylesContext);
  const { filterKeyword } = useContext(TabsContext);

  return (
    <ListItem
      disablePadding
      key={id}>
      <ListItemButton
        onClick={() => {
          msg.send('focustab', {
            tab: {
              id,
              windowId,
            }
          });
        }}
        disabled={active}>
        <ListItemAvatar>
          <Avatar
            src={favIconUrl}
            sx={avatar}>
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={highlight(title, filterKeyword)}
          secondary={highlight(url, filterKeyword)}>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
}
