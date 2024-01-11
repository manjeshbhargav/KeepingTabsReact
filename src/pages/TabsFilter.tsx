import { useContext } from 'react';
import { TextField } from '@mui/material';
import { StylesContext } from './popup/StylesProvider';
import { TabsContext } from './popup/TabsProvider';

export function TabsFilter() {
  const { setFilterKeyword } = useContext(TabsContext);
  const { textField } = useContext(StylesContext);

  return (
    <TextField
      onChange={({ target: { value } }) => {
        setFilterKeyword(value);
      }}
      label={'Search open tabs'}
      style={textField}
      variant={'filled'}>
    </TextField>
  );
}
