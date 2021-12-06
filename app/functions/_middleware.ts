const errorHandler: PagesFunction = async ({ next }) => {
  try {
    return await next()
  } catch (err: any) {
    return new Response(`${err.message}\n${err.stack}`, { status: 500 })
  }
}

export const replace: PagesFunction = async ({ next }) => {
  const remaining = await iot_stone.get('remaining')
  const response = await next()
  let html = await response.text()

  html = html.replace('content="REPLACE_DESCRIPTION"', `content="${remaining}"`)

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
    status: 200,
  })
}

export const onRequest = [errorHandler, replace]
