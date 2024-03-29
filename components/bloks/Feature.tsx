import { storyblokEditable } from '@storyblok/react/rsc'
import { FeatureStoryblok } from '../../types/component-types-sb'

type FeatureProps = {
  blok: FeatureStoryblok
}

const Feature = ({ blok }: FeatureProps) => (
  <div className="py-2 bg-gray-100" {...storyblokEditable(blok)}>
    <h1 className="uppercase font-medium text-2xl py-8 text-center">{blok.name}</h1>
  </div>
)

export default Feature
