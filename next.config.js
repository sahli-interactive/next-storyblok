module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['img.storyblok.com', 'a.storyblok.com']
  },
  env: {
    STORYBLOK_TOKEN: process.env.STORYBLOK_TOKEN,
    SECRET: process.env.SECRET,
    NEXT_PUBLIC_SECRET: process.env.SECRET
  }
}
