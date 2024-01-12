import {
  CSSProperties,
  Fragment,
  useContext,
} from 'react';

import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';

import { msg } from '@root/src/shared/msg';
import { StylesContext } from './StylesProvider';
import { TabsContext } from './TabsProvider';

const DEFAULT_FAVICON_URL = '../../../icon-16.png';

function highlightKeyword(
  text: string,
  keyword: string,
  style: CSSProperties
) {
  const regExp = new RegExp(keyword, 'gi');
  if (keyword === '' || !regExp.test(text)) {
    return text;
  }

  const unhighlighted = text.split(regExp).map(
    (unmatched) => <span>{unmatched}</span>,
  );
  const highlighted = text.match(regExp).map(
    (matched) => <strong style={style}>{matched}</strong>,
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
  const { avatar, highlight } = useContext(StylesContext);
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
          primary={highlightKeyword(
            title,
            filterKeyword,
            highlight,
          )}
          secondary={highlightKeyword(
            url,
            filterKeyword,
            highlight,
          )}>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
}
