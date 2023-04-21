import { storyblokEditable, StoryblokComponent } from '@storyblok/react'
import { GridStoryblok } from '../../types/component-types-sb'

type GridProps = {
  blok: GridStoryblok
}

const Grid = ({ blok }: GridProps) => {
  return (
    <ul className="flex py-8" {...storyblokEditable(blok)}>
      {blok.columns?.map(blok => (
        <li key={blok._uid} className="flex-auto px-6">
          <StoryblokComponent blok={blok} />
        </li>
      ))}
    </ul>
  )
}

export default Grid
