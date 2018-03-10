export default (field, value) => {
  let newValue = ''
  if (field.selectionStart || field.selectionStart === 0) {
    const startPos = field.selectionStart
    const endPos = field.selectionEnd
    newValue = field.value.substring(0, startPos) + value + field.value.substring(endPos, field.value.length)
  } else {
    newValue = field.value + value
  }
  return newValue
}
