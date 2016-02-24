import React from 'react';
import ReactDOM from 'react-dom';
import Tabs from 'popup/views/Tabs';
import { Message } from 'common/Message';
import './entry.less';

Message.send('getOpenTabs', tabs => {
  ReactDOM.render(<Tabs data={tabs}/>, document.querySelector('.app'));
});
