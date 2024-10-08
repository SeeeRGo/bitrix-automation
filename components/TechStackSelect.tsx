import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { debounce } from '@mui/material/utils';
import axios from 'axios';
import { TechStack } from '../app/types';
import { TextField } from '@mui/material';
import { useSearchParams } from 'next/navigation';

interface IProps {
  techStack: TechStack | null
  setTechStack: (techStack: TechStack | null) => void
  error?: string
}

export default function TechStackSelect({ techStack, setTechStack, error }: IProps) {
  const [inputValue, setInputValue] = React.useState('');
  const searchParams = useSearchParams()
  const activeRequestName = searchParams.get('active_request_name')
  const [options, setOptions] = React.useState<TechStack[]>([]);
  
  const loadOptions = React.useCallback(
    (requestName: string | null) => {
      axios
        .get(`/techstack${requestName ? '?is_quote=true' : ''}`)
        .then(({ data: { result: { LIST } }}) => {
          console.log('list', LIST);
          
          return setOptions(LIST);
        })
    }, []
  )  
  const searchDelayed = React.useMemo(
    () => debounce(loadOptions, 150),
    [loadOptions]
  )
  
  React.useEffect(() => {
    searchDelayed(activeRequestName)
  }, [searchDelayed, activeRequestName]);

  return (
    <Autocomplete
      id="techStack-autocomplete"
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.VALUE
      }
      filterOptions={(x) => x}
      options={options.filter(option => (option.VALUE.toLocaleLowerCase()).includes(inputValue.toLocaleLowerCase()))}
      autoComplete
      includeInputInList
      value={techStack}
      noOptionsText="Нет подходящих вариантов"
      onChange={(event: any, newValue: TechStack | null) => {
        setOptions(newValue ? [newValue, ...options.filter(({ ID }) => ID !== newValue.ID)] : options);
        setTechStack(newValue);
      }}
      onInputChange={(event, newInputValue) => {        
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} required label="Выбрать направление" fullWidth error={!!error} helperText={error} />
      )}
      renderOption={(props, option) => {
        return (
          <li {...props}>
            {option.VALUE}
          </li>
        );
      }}
    />
  );
}