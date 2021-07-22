/**
 * Function that verifies if file has files
 * @param {File} file file to verify
 */
function hasFiles(file) {
  return file.files.length;
}
/**
 * Function that returns the data of the selected file
 * @param {Number} id id of the input to get the file
 * @return {Object} returns a FormData if file contains files
 * or null if the file is empty
 */
export default function getFormDataFromId(id) {
  const file = document.querySelector(`#${id}`);
  if (hasFiles(file)) {
    const data = new FormData();
    const [fileToUpload] = file.files;
    data.append('file', fileToUpload);
    return data;
  }
  return null;
}
