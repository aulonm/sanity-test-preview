export function resolveHref(
  documentType?: string,
  slug?: string,
): string | undefined {
  switch (documentType) {
    case 'home':
      return '/obos-bladet'
    case 'page':
      return slug ? `/${slug}` : undefined
    case 'project':
      return slug ? `/projects/${slug}` : undefined

    case 'obosNewspaper':
      return '/obos-bladet'
    default:
      console.warn('Invalid document type:', documentType)
      return undefined
  }
}
