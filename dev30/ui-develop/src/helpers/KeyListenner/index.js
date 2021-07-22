export default function EnterKeyListenner(event, functionToCall) {
  if (event.which === 13) {
    functionToCall();
  }
}
