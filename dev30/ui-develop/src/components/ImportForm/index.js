import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InputFile from 'app/components/WrappedMaterialComponents/Textfields/InputFile';
import Button from 'app/components/WrappedMaterialComponents/Buttons/CustomButton';
import Alert from '@material-ui/lab/Alert';
import style from './style.module.css';

/**
 * Form import view, where the user load their file
 * @param  {string} id id for the upload field
 * @param  {string} resultSaved object that represents result of de successful import
 * @param  {string} resultRejected object that represents result of de successful import
 * @param  {function} handleImport function that consumes the import service
 * @param  {string} typeFile type of file to be import
 * @param  {string} errorMessage Message of the error to be show
 */
function ImportForm({
  id,
  handleImport,
  resultSaved,
  resultRejected,
  typeFile,
  errorMessage,
}) {
  const [file, setFile] = useState(null);
  function importFile() {
    handleImport();
    setFile(null);
  }

  return (
    <div className={style.container}>
      <div className={style.border}>
        <form className={style.form} autoComplete="off">
          <div className={style.warningMessage}>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          </div>
          <div className={style.rowImport}>
            <InputFile
              id={id}
              className={style.inputUpload}
              type="file"
              typeAccept={typeFile}
              name="uploadFile"
              required={true}
              onChange={setFile}
            />
            <Button
              id="buttonImport"
              className={style.buttonImport}
              label="Import"
              onClick={importFile}
              disabled={!file}
            />
          </div>
          <div className={style.confirmationMessage}>
            {resultSaved && resultRejected && (
              <>
                <span className={style.saved}>
                  {resultSaved} new records were imported
                </span>
                <span className={style.rejected}>
                  {resultRejected} records was rejected
                </span>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

ImportForm.propTypes = {
  id: PropTypes.string,
  handleImport: PropTypes.func,
  resultSaved: PropTypes.string,
  resultRejected: PropTypes.string,
  typeFile: PropTypes.string,
  errorMessage: PropTypes.string,
};

ImportForm.propDefaults = {
  id: '',
  handleImport: () => {},
  resultSaved: '',
  resultRejected: '',
  typeFile: '',
  errorMessage: '',
};

export default ImportForm;
