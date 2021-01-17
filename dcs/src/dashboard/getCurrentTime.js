export function getCurrentTime() {
  let today = new Date()
  let minutes = (String(today.getMinutes()).length < 2) ? "0" + today.getMinutes() : today.getMinutes()
  let seconds = (String(today.getSeconds()).length < 2) ? "0" + today.getSeconds() : today.getSeconds()
  let time = today.getHours() + ':' + minutes + ':' + seconds
  return `${time}`
}