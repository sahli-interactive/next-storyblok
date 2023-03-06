import { FC } from 'react';
import { storyblokEditable } from "@storyblok/react";
import { FeatureStoryblok } from '../../types/component-types-sb';

interface FeatureProps {
  blok: FeatureStoryblok
}

const Feature: FC<FeatureProps> = ({ blok }) => (
  <div className="py-2 bg-gray-100" {...storyblokEditable(blok)}>
    <h1 className="uppercase font-medium text-2xl py-8 text-center">
      {blok.name}
    </h1>
  </div>
)

export default Feature