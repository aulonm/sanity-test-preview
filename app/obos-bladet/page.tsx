import { sanityFetch } from 'lib/sanity.fetch'
import { draftMode } from 'next/headers'
import { groq } from 'next-sanity'
import { LiveQuery } from 'next-sanity/preview/live-query'

import { OBOSNewspaper as IOBOSNewspaper } from '../../components/pages/obos/OBOSNewspaper'
import OBOSNewspaper from '../../components/pages/obos/OBOSNewspaper'
import PreviewOBOSNewspaper from '../../components/pages/obos/PreviewOBOSNewspaper'

const query = groq`
  *[_type == "home"][0]{
    _id,
    _type,
    _updatedAt,
    _createdAt,
    hero,
  }`

export default async function ObosBladet() {
  const { isEnabled: previewMode } = draftMode()
  const data = await sanityFetch<IOBOSNewspaper>({
    query,
  })

  console.log(data)

  return (
    <LiveQuery
      enabled={previewMode}
      query={query}
      initialData={data}
      as={PreviewOBOSNewspaper}
    >
      <OBOSNewspaper data={data} />
    </LiveQuery>
  )
}
