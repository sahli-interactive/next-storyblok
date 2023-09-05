import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { getStoryblokApi } from '@storyblok/react/rsc'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')

  // Check the secret and next parameters
  // This secret should only be known to this route handler and the CMS
  if (secret !== process.env.SECRET || !slug) {
    return new Response('Invalid token', { status: 401 })
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  const { data } = await getStoryblokApi().get(`cdn/stories/${slug}`, {
    version: 'draft',
    excluding_fields: 'header,body,seo',
  })

  // If the slug doesn't exist prevent draft mode from being enabled
  if (!data?.story) {
    return new Response('Invalid slug', { status: 401 })
  }

  // Enable Draft Mode by setting the cookie
  draftMode().enable()

  // Redirect to the path from the fetched post
  // We don't redirect to searchParams.slug as that might lead to open redirect vulnerabilities
  redirect(data.story.full_slug)
}
