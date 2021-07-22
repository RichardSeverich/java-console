import React from 'react';
import SearchTextField from 'app/components/WrappedMaterialComponents/Textfields/SearchTextfield';
import Message from 'components/Message';
import propTypes from 'prop-types';
import style from './style.module.css';
/**
 * Search Candidates view, where the user enters a keyword to make a search
 * @param {Function} getCandidates function for search candidates
 * @param {Function} selectCandidate function to get a selected candidate
 * @param {object} resultSearch object with all the candidates found
 * @param {string} candidate name of candidate to display
 * @param {object} notFoundError when candidate not found object is code:204 message:"not found candidate"
 * * @param {string} notFoundError.code is the string identifier code
 * * @param {string} notFoundError.message is the message when not found candidate
 */
function SearchCandidates({
  getCandidates,
  selectCandidate,
  resultSearch,
  candidate,
  notFoundError,
}) {
  return (
    <div className={style.sideBar}>
      <SearchTextField
        id="SearchCandidates"
        label="Search..."
        result={resultSearch}
        inputProps={{ className: style.searchBox }}
        listProps={{ className: `${style.searchResults} scrollbar` }}
        rowProps={{ className: style.result, onClick: selectCandidate }}
        onSearch={getCandidates}
      />
      {Boolean(notFoundError.message) && (
        <Message text={notFoundError.message} />
      )}
    </div>
  );
}

SearchCandidates.propTypes = {
  getCandidates: propTypes.func,
  selectCandidate: propTypes.func,
  resultSearch: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number,
      name: propTypes.string,
    })
  ),
  candidate: propTypes.string,
  notFoundError: propTypes.shape({
    code: propTypes.string,
    message: propTypes.string,
  }),
};

SearchCandidates.propDefaults = {
  getCandidates: () => {},
  selectCandidate: () => {},
  resultSearch: [],
  candidate: '',
  notFoundError: {},
};

export default SearchCandidates;
