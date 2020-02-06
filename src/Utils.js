import TextContent from './Data/TextContent.json'

export const translate = slug => {
  if (TextContent[slug]) return TextContent[slug]
  console.warn(`No translation for ${slug}`)
  return slug
}