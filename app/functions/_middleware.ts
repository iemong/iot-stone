export const onRequest: PagesFunction = async ({ next }) => {
  // @ts-ignore
  const remaining = await IOT_STONE.get('remaining')
  const response = await next()
  let html = await response.text()

  html = html.replace('content="REPLACE_DESCRIPTION"', `content="${remaining}"`)

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
    status: 200,
  })
}
