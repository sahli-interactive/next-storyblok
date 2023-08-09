import { ISbStoriesParams, getStoryblokApi } from '@storyblok/react/rsc'
import StoryblokStory from '@storyblok/react/story'
import Logo from '../../components/layout/Logo'
import { draftMode } from 'next/headers'
import { Metadata } from 'next'

export const revalidate = 3600 // revalidate every hour

async function fetchData(slug: string) {
  const preview = process.env.NODE_ENV === 'development' || draftMode().isEnabled
  const sbParams: ISbStoriesParams = {
    version: preview ? 'draft' : 'published',
    resolve_links: 'url',
  }

  const storyblokApi = getStoryblokApi()

  return storyblokApi.get(`cdn/stories/${slug}`, sbParams)
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const storyblokApi = getStoryblokApi()
  const { data } = await storyblokApi.get('cdn/links/')

  const paths: { slug: string[] }[] = []
  // create a route for every link
  Object.keys(data.links).forEach(linkKey => {
    // do not create a route for folders and home
    if (data.links[linkKey].is_folder || data.links[linkKey].slug === 'home') {
      return
    }

    // get array for slug because of catch all
    const slug = data.links[linkKey].slug
    let splittedSlug = slug.split('/')

    // creates all the routes
    paths.push({ slug: splittedSlug })
  })

  return paths
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params?.slug ? params.slug.join('/') : 'home'
  const { data } = await fetchData(slug)
  const story = data.story
  const title = story.content?.seo?.title || story.name
  const description = story.content?.seo?.description
  return {
    title: `${title} · Your Brand`,
    description: description,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: title,
      description: description,
      url: `https://your-brand.ch/${story.slug}`,
    },
    twitter: {
      card: 'summary',
      title: title,
      description: description,
    },
  }
}

type Props = {
  params: { slug: string[] }
}

export default async function Home({ params }: Props) {
  const slug = params?.slug ? params.slug.join('/') : 'home'
  const { data } = await fetchData(slug)
  return (
    <>
      <nav className="container w-full mx-auto p-4">
        <div className="flex justify-center">
          <Logo />
        </div>
      </nav>

      <StoryblokStory story={data.story} />

      <footer className="p-4">Your Footer</footer>
    </>
  )
}
