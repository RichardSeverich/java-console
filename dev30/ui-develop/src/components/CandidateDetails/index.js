import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import DefaultCheckbox from 'app/components/WrappedMaterialComponents/Checkboxes/DefaultCheckbox';
import { DEFAULT_IMG } from 'app/constant/Images';
import style from './style.module.css';

/**
 * Table reusable component for displaying
 * @param {string} firstNames is the first name of the candidate
 * @param {string} lastNames is the last name of the candidate
 * @param {string} email is the email of the candidate
 * @param {string} city is the city that the candidate belongs to
 * @param {string} cellphone is the phone number of the candidate
 * @param {string} birthDate is the date that was born the candidate
 * @param {string} university is the university that the candidate studied or is studying
 * @param {string} career is the career that the candidate has studied
 * @param {string} semester is the current semester that the candidate is in
 * @param {string} fullName is the full name of the candidate
 */
function CandidateDetails({
  firstNames,
  lastNames,
  email,
  city,
  cellphone,
  birthDate,
  university,
  career,
  semester,
  fullName,
}) {
  return (
    <div className={style.candidateDetails}>
      <div className={style.candidateImageContainer}>
        <div className={style.candidateBasicDetails}>
          <div className={style.candidateName}>{fullName}</div>
          <div className={style.candidateImage}>
            <img
              className={style.imageProfile}
              src={DEFAULT_IMG}
              alt="Resoft org. Default"
            />
          </div>
        </div>
      </div>
      <div className={style.candidateFormInfo}>
        <div className={style.candidateInfo}>
          <TextField
            disabled
            label="First Names"
            value={firstNames}
            variant="outlined"
          />
          <TextField disabled label="City" value={city} variant="outlined" />
          <TextField disabled label="Email" value={email} variant="outlined" />
          <TextField
            disabled
            label="University"
            value={university}
            variant="outlined"
          />
          <TextField
            disabled
            label="Semester"
            value={semester}
            variant="outlined"
          />
          <DefaultCheckbox disabled label="Work experience" />
          <DefaultCheckbox disabled label="Auto didact" />
        </div>
        <div className={style.candidateInfo}>
          <TextField
            disabled
            label="Last Names"
            value={lastNames}
            variant="outlined"
          />
          <TextField
            disabled
            label="Cellphone"
            value={cellphone}
            variant="outlined"
          />
          <TextField
            disabled
            label="Birthdate"
            type="date"
            value={birthDate}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            disabled
            label="Career"
            value={career}
            variant="outlined"
          />
          <div className={style.lastCandidateCheckBox}>
            <DefaultCheckbox disabled label="Extended" />
          </div>
        </div>
      </div>
    </div>
  );
}

CandidateDetails.propTypes = {
  firstNames: PropTypes.string,
  lastNames: PropTypes.string,
  email: PropTypes.string,
  city: PropTypes.string,
  cellphone: PropTypes.string,
  birthDate: PropTypes.string,
  university: PropTypes.string,
  career: PropTypes.string,
  semester: PropTypes.string,
  fullName: PropTypes.string,
};

CandidateDetails.defaultProps = {
  firstNames: '',
  lastNames: '',
  email: '',
  city: '',
  cellphone: '',
  birthDate: '',
  university: '',
  career: '',
  semester: '',
  fullName: '',
};

export default CandidateDetails;
