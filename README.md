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
SECRET=<your-token-or-password>
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

To enable preview mode you have to add two preview URLs in Storyblok:

**Preview**
`https://<my-url>/api/draft?secret=<your-preview-password-or-token>&slug=`

**Exit Preview**
`https://<my-url>/api/exit-preview?slug=`

Don't forget to add the secret as env-variable.
It might be helpful for the end user to set the preview URL as default.

### 6. Webhook for revalidation

To revalidate pages after publishing in Storyblok, you have to set up the following Webhook URL:
`https://<my-url>/api/story-published?secret=<your-preview-paswsword-or-token>`

Don't forger to add the secret token as env-variable.

### 7. Update Storyblok TypeScript types

First, make sure you have the [Storyblok CLI](https://github.com/storyblok/storyblok-cli) installed and set up with your account. Second, replace `[SPACE_ID]` in your `package.json` with your space ID e.g. 123456.

Whenever your component definitions have changes, you can update your types:

```sh
# get current component definition
$ yarn pull components
# generate types from component definition
$ yarn generate-sb-types
```

## Resources

- [Next.js docs](https://nextjs.org/docs/#setup)
- [Storyblok Tutorial](https://www.storyblok.com/tp/add-a-headless-cms-to-next-js-in-5-minutes)
- [Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode)


