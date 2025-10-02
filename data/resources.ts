import type { TranslationKeys } from "../i18n/locales";

export type ResourceType = 'article' | 'video' | 'podcast';

export interface Resource {
  id: string;
  type: ResourceType;
  titleKey: TranslationKeys;
  descriptionKey: TranslationKeys;
  imageUrl: string;
  contentUrl: string; // Link to the actual resource
}

export const RESOURCES_DATA: Resource[] = [
  {
    id: 'article-cbt',
    type: 'article',
    titleKey: 'resource_article_cbt_title',
    descriptionKey: 'resource_article_cbt_desc',
    imageUrl: 'https://images.unsplash.com/photo-1583461637651-13116848243a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    contentUrl: 'https://www.apa.org/ptsd-guideline/patients-and-families/cognitive-behavioral',
  },
  {
    id: 'video-mindfulness',
    type: 'video',
    titleKey: 'resource_video_mindfulness_title',
    descriptionKey: 'resource_video_mindfulness_desc',
    imageUrl: 'https://images.unsplash.com/photo-1597855059803-01c0c3a64739?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    contentUrl: 'https://www.youtube.com/watch?v=o-kMJBWk9E0',
  },
  {
    id: 'podcast-stigma',
    type: 'podcast',
    titleKey: 'resource_podcast_stigma_title',
    descriptionKey: 'resource_podcast_stigma_desc',
    imageUrl: 'https://images.unsplash.com/photo-1590602847991-f93539f8606c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    contentUrl: 'https://open.spotify.com/show/22xodssSg1ge4umAl1Qk8M', // Example: The Hilarious World of Depression
  },
  {
    id: 'article-sleep',
    type: 'article',
    titleKey: 'resource_article_sleep_title',
    descriptionKey: 'resource_article_sleep_desc',
    imageUrl: 'https://images.unsplash.com/photo-1495197359438-283e588f234b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80',
    contentUrl: 'https://www.sleepfoundation.org/sleep-hygiene',
  },
];
