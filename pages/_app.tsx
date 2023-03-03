import '../styles/globals.css'
import { storyblokInit, apiPlugin } from '@storyblok/react'
import { Feature } from '../components/bloks/Feature'
import { Teaser } from '../components/bloks/Teaser'
import { Page } from '../components/bloks/Page'
import { Grid } from '../components/bloks/Grid'
import { ComponentType, FC } from 'react'

storyblokInit({
  accessToken: process.env.STORYBLOK_TOKEN,
  // bridge: true,
  use: [apiPlugin],
  components: {
    page: Page,
    teaser: Teaser,
    feature: Feature,
    grid: Grid,
  },
})

interface AppProps {
  Component: ComponentType
  pageProps: any
}

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default MyApp
