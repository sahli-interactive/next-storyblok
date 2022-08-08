# Next.js Storyblok Boilerplate

This repository is a Next.js [Storyblok](https://www.storyblok.com) starter template.

## Requirements

To use this project you have to have a Storyblok account. If you don't have one yet you can register at [Storyblok](https://www.storyblok.com), it's free.

## How to get started?

Read the [Next.js tutorial](https://www.storyblok.com/tp/add-a-headless-cms-to-next-js-in-5-minutes) about connecting Storyblok and Next.js

### 1. Clone the repo

```sh
  $ git clone https://github.com/sahli-interactive/next-storyblok.git
```

### 2. Install all dependencies

```sh
$  yarn # or npm install
```

### 3. Adding the Access token

Create a new empty space and copy the Preview Token.  Create your ```.env.local``` from  ```.env.example```:
```sh
$ mv .env.example .env.local
```
Add the token from Storyblok and a password/any string for the preview-mode (and the webhook):
```
STORYBLOK_TOKEN=<your-new-token>
PREVIEW_TOKEN=<your-token-or-password>
```

### 4. Run your project

Set the preview domain in <strong>Storyblok</strong> to `http://localhost:3000/`

```sh
# to run in developer mode
$ yarn dev # or npm run dev
```

```sh
# to build your project
$ yarn build # or npm run build
```

### 5. Setup preview mode

To enable preview mode you have to add two preview URLs in storyblok:

**Preview**
`https://<my-netlify-or-prod-url>/api/preview?secret=<your-preview-paswsword-or-token>&slug=`

**Exit Preview**
`https://<my-netlify-or-prod-url>/api/exit-preview?slug=`

Don't forget to add the preview token as env-variable in netlify as well.
It might be helpful for the end user to set the preview URL as default.

### 6. Webhook for revalidation

To revalidate pages after publishing in Storyblok, you have to setup the following Webhook URL:
`https://<my-netlify-or-prod-url>/api/story-published?secret=<your-preview-paswsword-or-token>`

Don't forger to add the secret-token/password in Netlify as well.

## Resources

- [Next.js docs](https://nextjs.org/docs/#setup)
- [Storyblok Tutorial](https://www.storyblok.com/tp/add-a-headless-cms-to-next-js-in-5-minutes)
- [Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode)


