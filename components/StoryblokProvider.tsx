'use client'
import { storyblokInit, apiPlugin } from '@storyblok/react/rsc'
import { ReactElement } from 'react'

import page from './content_types/Page'
import feature from './nestables/Feature'
import teaser from './nestables/Teaser'
import grid from './nestables/Grid'

storyblokInit({
  accessToken: process.env.STORYBLOK_TOKEN,
  use: [apiPlugin],
  components: {
    page,
    teaser,
    feature,
    grid,
  },
})

type StoryblokProviderProps = {
  children: ReactElement
}

export default function StoryblokProvider({ children }: StoryblokProviderProps) {
  return children
}
