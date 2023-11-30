import { Hero, HeroContent } from '@obosbbl/grunnmuren-react'

export interface OBOSNewspaper {
  hero: {
    _type: string
    title: string
    ingress: string
    cta: Array<{
      text: string
      url: string
    }>
  }
}

export default function OBOSNewspaper({ data }: { data: OBOSNewspaper }) {
  const { hero } = data ?? {}

  return (
    <>
      <div className="container mb-16 flex flex-col gap-20 md:gap-36 max-md:p-0">
        {hero && (
          <Hero>
            <HeroContent heading={hero.title} description={hero.ingress} />
          </Hero>
        )}
      </div>
    </>
  )
}
