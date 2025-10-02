import type { TranslationKeys } from "./i18n/locales";

export interface BreathingPattern {
  nameKey: TranslationKeys;
  duration: number;
}
export interface BreathingExercise {
  id: string;
  titleKey: TranslationKeys;
  descriptionKey: TranslationKeys;
  pattern: BreathingPattern[];
  totalDurationMinutes: number;
  imageUrl: string;
}

export const BREATHING_EXERCISES_DATA: BreathingExercise[] = [
  {
    id: 'box-breathing',
    titleKey: 'breathing_title_box',
    descriptionKey: 'breathing_desc_box',
    pattern: [
        { nameKey: 'breathing_instruction_in', duration: 4 },
        { nameKey: 'breathing_instruction_hold', duration: 4 },
        { nameKey: 'breathing_instruction_out', duration: 4 },
        { nameKey: 'breathing_instruction_hold', duration: 4 },
    ],
    totalDurationMinutes: 3,
    imageUrl: 'https://images.unsplash.com/photo-1597855059803-01c0c3a64739?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: '4-7-8',
    titleKey: 'breathing_title_478',
    descriptionKey: 'breathing_desc_478',
    pattern: [
        { nameKey: 'breathing_instruction_in', duration: 4 },
        { nameKey: 'breathing_instruction_hold', duration: 7 },
        { nameKey: 'breathing_instruction_out', duration: 8 },
    ],
    totalDurationMinutes: 4,
    imageUrl: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 'resonant-breathing',
    titleKey: 'breathing_title_resonant',
    descriptionKey: 'breathing_desc_resonant',
    pattern: [
        { nameKey: 'breathing_instruction_in', duration: 5 },
        { nameKey: 'breathing_instruction_out', duration: 5 },
    ],
    totalDurationMinutes: 5,
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1380&q=80',
  },
];
