import React from 'react';
import { createRoot } from 'react-dom/client';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import { Popup } from './Popup';
import { StylesProvider } from './StylesProvider';
import { TabsProvider } from './TabsProvider';

refreshOnUpdate('pages/popup');

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  const root = createRoot(appContainer);
  root.render(
    <StylesProvider>
      <TabsProvider>
        <Popup />
      </TabsProvider>
    </StylesProvider>
  );
}

init();
