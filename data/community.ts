import type { TranslationKeys } from "../i18n/locales";

export interface CommunityPost {
  id: string;
  categoryKey: TranslationKeys;
  titleKey: TranslationKeys;
  contentSnippetKey: TranslationKeys;
  authorName: string; // Anonymous names
  likes: number;
  comments: number;
}

export const COMMUNITY_POSTS_DATA: CommunityPost[] = [
  {
    id: 'victory-1',
    categoryKey: 'community_category_victories',
    titleKey: 'community_post_victory1_title',
    contentSnippetKey: 'community_post_victory1_snippet',
    authorName: 'Brave Lion',
    likes: 12,
    comments: 4,
  },
  {
    id: 'anxiety-1',
    categoryKey: 'community_category_anxiety',
    titleKey: 'community_post_anxiety1_title',
    contentSnippetKey: 'community_post_anxiety1_snippet',
    authorName: 'Hopeful Hummingbird',
    likes: 25,
    comments: 18,
  },
  {
    id: 'relationships-1',
    categoryKey: 'community_category_relationships',
    titleKey: 'community_post_relationships1_title',
    contentSnippetKey: 'community_post_relationships1_snippet',
    authorName: 'Calm River',
    likes: 31,
    comments: 22,
  },
];