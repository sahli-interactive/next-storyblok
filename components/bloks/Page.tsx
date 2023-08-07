import { storyblokEditable, StoryblokComponent } from '@storyblok/react/rsc'
import { PageStoryblok } from '../../types/component-types-sb'

type PageProps = {
  blok: PageStoryblok
}

const Page = ({ blok }: PageProps) => (
  <main className="p-6" {...storyblokEditable(blok)}>
    {blok.body &&
      blok.body.map(nestedBlok => <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />)}
  </main>
)

export default Page
