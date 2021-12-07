const errorHandler: PagesFunction = async ({ next }) => {
  try {
    return await next()
  } catch (err: any) {
    return new Response(`${err.message}\n${err.stack}`, { status: 500 })
  }
}

class AttributeRewriter {
  private readonly attributeName: string
  private readonly replaceText: string
  constructor(attributeName: string, replaceText: string) {
    this.attributeName = attributeName
    this.replaceText = replaceText
  }

  element(element: Element) {
    const attribute = element.getAttribute(this.attributeName)
    if (attribute) {
      element.setAttribute(this.attributeName, this.replaceText)
    }
  }
}

export const replace: PagesFunction<{ IOT_STONE: KVNamespace }> = async ({
  next,
  env,
}) => {
  const remaining = await env.IOT_STONE.get('remaining')
  const response = await next()

  const contentType = response.headers.get('Content-Type')

  if (!contentType?.startsWith('text/html')) return response

  const rewriter = new HTMLRewriter().on(
    'meta[name="description"]',
    new AttributeRewriter('content', remaining || '')
  )

  return rewriter.transform(response)
}

export const onRequest = [errorHandler, replace]
