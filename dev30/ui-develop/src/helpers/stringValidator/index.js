function validateJalaFoundationEmail(email) {
  return (
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) &&
    email.indexOf(
      '@fundacion-jala.org',
      email.length - '@fundacion-jala.org'.length
    ) !== -1
  );
}

function isEmpty(string) {
  return string === '' || string === undefined;
}

function requestFormat(string) {
  return string.replace(/ /g, '+');
}

function getStringWidth(text, font) {
  const temp = document.createElement('span');
  document.body.appendChild(temp);
  temp.style.height = 'auto';
  temp.style.width = 'auto';
  temp.style.position = 'absolute';
  temp.style.whiteSpace = 'no-wrap';
  temp.innerHTML = text;
  const width = Math.ceil(temp.clientWidth);
  temp.remove();
  return width + 5;
}

export default {
  validateJalaFoundationEmail,
  isEmpty,
  requestFormat,
  getStringWidth,
};
