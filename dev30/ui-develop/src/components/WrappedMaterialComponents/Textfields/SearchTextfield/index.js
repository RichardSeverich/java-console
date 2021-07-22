import React, { useState } from 'react';
import propTypes from 'prop-types';
import Spinner from 'app/components/WrappedMaterialComponents/Spinner';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import debounce from 'app/helpers/debounce';
/**
 * Material UI wrapped element for a simple text field
 * @param  {string} id component identifier name
 * @param  {string} label the label on the textfield
 * @param  {object} result the result of the search
 * @param  {object} inputProps object with the props for the input TextField
 * @param  {object} listProps object with the props for the result list
 * @param  {object} rowProps object with the props for the each result in the list
 * @param  {function} onSearch calls the action that will perform the search
 */
function SearchTextField({
  id,
  label,
  result,
  inputProps,
  listProps,
  rowProps,
  onSearch,
}) {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const DEBOUNCE_TIME = 1000;

  function searchCandidate(value) {
    setLoading(true);
    debounce(() => {
      onSearch(value);
      setLoading(false);
    }, DEBOUNCE_TIME);
  }

  function handleChange(event) {
    setValue(event.target.value);
    searchCandidate(event.target.value);
  }

  return (
    <>
      <TextField
        id={id}
        variant="outlined"
        label={label}
        value={value}
        {...inputProps}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {loading && <Spinner id="spinnerSearch" size={25} />}
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <ul {...listProps}>
        {result.map((item) => (
          <li
            key={item.id}
            {...{
              ...rowProps,
              onClick: () => {
                rowProps.onClick(item.id);
              },
            }}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </>
  );
}

SearchTextField.prototype = {
  id: propTypes.string,
  label: propTypes.string,
  result: propTypes.array,
  inputProps: propTypes.array,
  listProps: propTypes.array,
  rowProps: propTypes.array,
  onSearch: propTypes.func,
};

SearchTextField.propDefaults = {
  id: '',
  label: '',
  result: [],
  inputProps: [],
  listProps: [],
  rowProps: [],
  onSearch: () => {},
};

export default SearchTextField;
