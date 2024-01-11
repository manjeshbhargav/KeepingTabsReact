import { CSSProperties, createContext } from 'react';

export const StylesContext = createContext<
  Record<string, CSSProperties>
>(null);

export function StylesProvider({ children }) {
  return (
    <StylesContext.Provider value={{
      avatar: { height: 24, width: 24 },
      list: { maxHeight: 500, overflowY: 'auto', overflowX: 'hidden' },
      textField: { width: '100%' },
    }}>
      {children}
    </StylesContext.Provider>
  );
}
