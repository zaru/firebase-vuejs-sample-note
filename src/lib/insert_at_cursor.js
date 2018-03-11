const breakline = (field, pos) => {
  if (field.value.substring(pos - 1, pos) !== '\n') {
    return '\n'
  }
  return ''
}

export default (field, value) => {
  let newValue = ''
  value += '\n'
  if (field.selectionStart || field.selectionStart === 0) {
    const startPos = field.selectionStart
    const endPos = field.selectionEnd
    newValue = field.value.substring(0, startPos) + breakline(field, startPos) + value + field.value.substring(endPos, field.value.length)
  } else {
    newValue = field.value + value
  }
  return newValue
}
