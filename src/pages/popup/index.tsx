import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { createRoot } from 'react-dom/client';
import { Popup } from './Popup';
import { StylesProvider } from './StylesProvider';
import { TabsProvider } from './TabsProvider';

(() => {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  const root = createRoot(appContainer);
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  root.render(
    <ThemeProvider theme={theme}>
      <StylesProvider>
        <TabsProvider>
          <CssBaseline enableColorScheme />
          <Popup />
        </TabsProvider>
      </StylesProvider>
    </ThemeProvider>
  );
})();
