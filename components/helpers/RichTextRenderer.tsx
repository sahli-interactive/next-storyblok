import { render } from 'storyblok-rich-text-react-renderer-ts'
import { StoryblokComponent } from '@storyblok/react'

type RichTextRendererProps = {
  text: any
}

const RichTextRenderer = ({ text }: RichTextRendererProps) => {
  return (
    <>
      {render(text, {
        defaultBlokResolver: (name, props) => (
          <StoryblokComponent blok={{ component: name, ...props }} />
        ),
      })}
    </>
  )
}

export default RichTextRenderer
