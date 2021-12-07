const errorHandler: PagesFunction = async ({ next }) => {
  try {
    return await next()
  } catch (err: any) {
    return new Response(`${err.message}\n${err.stack}`, { status: 500 })
  }
}

export const replace: PagesFunction<{ IOT_STONE: KVNamespace }> = async ({
  next,
  env,
}) => {
  const remaining = await env.IOT_STONE.get('remaining')
  const response = await next()
  let html = await response.text()

  const replaceText = `content="${remaining}"`
  html = html.replace('content="REPLACE_DESCRIPTION"', replaceText)

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
    status: 200,
  })
}

export const onRequest = [errorHandler, replace]
