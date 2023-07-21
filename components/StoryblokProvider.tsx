'use client'
import { storyblokInit, apiPlugin } from '@storyblok/react/rsc'
import { ReactElement } from 'react'

import feature from '../components/bloks/Feature'
import teaser from '../components/bloks/Teaser'
import page from '../components/bloks/Page'
import grid from '../components/bloks/Grid'

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
