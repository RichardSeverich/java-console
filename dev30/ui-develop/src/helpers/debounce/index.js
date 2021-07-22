let timeout;

export default function debounce(callback, time) {
  clearTimeout(timeout);
  timeout = setTimeout(callback, time);
}
