import React from 'react';
import ReactDOM from 'react-dom';
import Tabs from 'popup/views/Tabs';
import Message from 'common/Message';
import TabsAction from 'popup/actions/Tabs';
import './entry.less';

ReactDOM.render(<Tabs/>, document.querySelector('.app'));
Message.send('getOpenTabs', tabs => { TabsAction.setTabs(tabs); });
