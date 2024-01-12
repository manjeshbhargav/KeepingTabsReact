import { CSSProperties, createContext } from 'react';

export const StylesContext = createContext<
  Record<string, CSSProperties>
>(null);

export function StylesProvider({ children }) {
  return (
    <StylesContext.Provider value={{
      avatar: {
        height: 24,
        width: 24,
      },
      highlight: {
        backgroundColor: 'rgb(100, 100, 100)',
        borderRadius: 3,
        paddingLeft: 2,
        paddingRight: 2,
      },
      list: {
        maxHeight: 500,
        overflowY: 'auto',
        overflowX: 'hidden',
      },
      textField: {
        width: '100%',
      },
    }}>
      {children}
    </StylesContext.Provider>
  );
}
