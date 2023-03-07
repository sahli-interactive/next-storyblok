import { FC } from 'react';
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { PageStoryblok } from '../../types/component-types-sb';

interface PageProps {
  blok: PageStoryblok
}

const Page: FC<PageProps> = ({ blok }) => (
  <main className="p-6" {...storyblokEditable(blok)}>
    {blok.body ?
      blok.body.map(blok => (
        <StoryblokComponent blok={blok} key={blok._uid} />
      )) :
      null}
  </main>
)

export default Page