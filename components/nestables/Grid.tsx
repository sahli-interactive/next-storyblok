import { storyblokEditable, StoryblokComponent, SbBlokData } from '@storyblok/react/rsc'
import { GridStoryblok } from '../../types/component-types-sb'

type GridProps = {
  blok: GridStoryblok
}

const Grid = ({ blok }: GridProps) => {
  return (
    <ul className="flex py-8" {...storyblokEditable(blok as SbBlokData)}>
      {blok.columns?.map(nestedBlok => (
        <li key={nestedBlok._uid} className="flex-auto px-6">
          <StoryblokComponent blok={nestedBlok} />
        </li>
      ))}
    </ul>
  )
}

export default Grid
