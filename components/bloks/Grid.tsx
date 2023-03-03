import { FC } from 'react';
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { GridStoryblok } from '../../types/component-types-sb';

interface GridProps {
  blok: GridStoryblok
}

export const Grid: FC<GridProps> = ({blok}) => {
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
