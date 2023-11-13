import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { debounce } from '@mui/material/utils';
import axios from 'axios';
import { Company } from '../app/types';

interface IProps {
  company: Company | null
  setCompany: (company: Company | null) => void
}

export default function CompanySelect({ company, setCompany }: IProps) {
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<Company[]>([]);

  const loadOptions = React.useCallback(
    (inputValue: string) => {
      axios
        .get(`${process.env.NEXT_PUBLIC_BITRIX_WEBHOOK_URL}/crm.api.entity.search?searchQuery=${inputValue}&options[types][0]=COMPANY&options[categoryId]=0&&options[scope]=index`)
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
      id="company-autocomplete"
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.title
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={company}
      noOptionsText="No locations"
      onChange={(event: any, newValue: Company | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setCompany(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Выбрать компанию" fullWidth />
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