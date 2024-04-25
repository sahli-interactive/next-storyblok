import { SbBlokData, storyblokEditable } from '@storyblok/react/rsc'
import { FeatureStoryblok } from '../../types/component-types-sb'
import RichTextRenderer from '../helpers/RichTextRenderer'

type FeatureProps = {
  blok: FeatureStoryblok
}

const Feature = ({ blok }: FeatureProps) => (
  <div className="p-6 bg-gray-100" {...storyblokEditable(blok as SbBlokData)}>
    <h2 className="font-medium text-2xl mb-4">{blok.headline}</h2>
    {blok.text && <RichTextRenderer text={blok.text} />}
  </div>
)

export default Feature
