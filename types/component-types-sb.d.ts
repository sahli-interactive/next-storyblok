import {StoryblokStory} from 'storyblok-generate-ts'

export interface RichtextStoryblok {
  type: string;
  content?: RichtextStoryblok[];
  marks?: RichtextStoryblok[];
  attrs?: any;
  text?: string;
}

export interface FeatureStoryblok {
  headline?: string;
  text?: RichtextStoryblok;
  _uid: string;
  component: "feature";
}

export interface GridStoryblok {
  columns?: FeatureStoryblok[];
  _uid: string;
  component: "grid";
}

export interface PageStoryblok {
  body?: (GridStoryblok | TeaserStoryblok)[];
  seo?: {
    _uid?: string;
    title?: string;
    plugin?: string;
    description?: string;
  };
  _uid: string;
  component: "page";
  uuid?: string;
}

export interface TeaserStoryblok {
  headline?: string;
  _uid: string;
  component: "teaser";
}
