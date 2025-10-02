import type { TranslationKeys } from "../i18n/locales";

export interface Meditation {
  id: string;
  titleKey: TranslationKeys;
  descriptionKey: TranslationKeys;
  categoryKey: TranslationKeys;
  durationMinutes: number;
  imageUrl: string;
  audioUrl: string;
}

export const MEDITATIONS_DATA: Meditation[] = [
  {
    id: 'anxiety-1',
    titleKey: 'meditation_title_calm_anxiety',
    descriptionKey: 'meditation_desc_calm_anxiety',
    categoryKey: 'meditation_category_anxiety',
    durationMinutes: 5,
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1380&q=80',
    audioUrl: 'https://archive.org/download/ambient-music-collection/Kevin-MacLeod-Almost-in-F-Tranquility.mp3',
  },
  {
    id: 'sleep-1',
    titleKey: 'meditation_title_deep_sleep',
    descriptionKey: 'meditation_desc_deep_sleep',
    categoryKey: 'meditation_category_sleep',
    durationMinutes: 10,
    imageUrl: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    audioUrl: 'https://archive.org/download/ambient-music-collection/Kevin-MacLeod-Deep-Relaxation.mp3',
  },
  {
    id: 'gratitude-1',
    titleKey: 'meditation_title_morning_gratitude',
    descriptionKey: 'meditation_desc_morning_gratitude',
    categoryKey: 'meditation_category_gratitude',
    durationMinutes: 3,
    imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    audioUrl: 'https://archive.org/download/ambient-music-collection/Kevin-MacLeod-Relaxing-Piano-Music.mp3',
  },
    {
    id: 'focus-1',
    titleKey: 'meditation_title_focus_breath',
    descriptionKey: 'meditation_desc_focus_breath',
    categoryKey: 'meditation_category_focus',
    durationMinutes: 7,
    imageUrl: 'https://images.unsplash.com/photo-1544203526-247c1a85375f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    audioUrl: 'https://archive.org/download/ambient-music-collection/Kevin-MacLeod-Water-Lily.mp3',
  },
];