import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { debounce } from '@mui/material/utils';
import axios from 'axios';
import { Contact } from '../app/types';

interface IProps {
  contact: Contact | null
  setContact: (contact: Contact | null) => void
}

export default function ContactsSelect({ contact, setContact }: IProps) {
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<Contact[]>([]);

  const loadOptions = React.useCallback(
    (inputValue: string) => {
      axios
        .get(`${process.env.NEXT_PUBLIC_BITRIX_WEBHOOK_URL}/crm.api.entity.search?searchQuery=${inputValue}&options[types][0]=CONTACT`)
        .then(({ data: { result: { items } }}) => setOptions(items))
    }, []
  )
  const searchDelayed = React.useMemo(
    () => debounce(loadOptions, 150),
    [loadOptions]
  )
  
  React.useEffect(() => {
    searchDelayed(inputValue)
  }, [searchDelayed, inputValue]);

  return (
    <Autocomplete
      id="contacts-autocomplete"
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.title
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={contact}
      noOptionsText="No locations"
      onChange={(event: any, newValue: Contact | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setContact(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Выбрать контактное лицо" fullWidth />
      )}
      renderOption={(props, option) => {
        return (
          <li {...props}>
            {option.title}
          </li>
        );
      }}
    />
  );
}