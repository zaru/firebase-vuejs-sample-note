import marked from 'marked'

const renderer = new marked.Renderer()

renderer.heading = (text, level, raw) => {
  console.log(text)
  console.log(level)
  if (raw.match(/^\s?giphy: https:.+\.mp4$/)) {
    return `<video loop muted autoplay width="150">
              <source src="${raw.replace('giphy: ', '')}" type="video/mp4">
            </video>\n`
  }
  return `<h${level} id="${raw.toLowerCase().replace(/[^\w]+/g, '-')}">
            ${text}
          </h${level}>\n`
}

export default renderer
