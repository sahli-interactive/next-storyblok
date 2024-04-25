import { render } from 'storyblok-rich-text-react-renderer-ts'
import { StoryblokComponent } from '@storyblok/react/rsc'
import { RichtextStoryblok } from '../../types/component-types-sb'

type RichTextRendererProps = {
  text: RichtextStoryblok
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
