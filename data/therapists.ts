import type { TranslationKeys } from "../i18n/locales";

export interface Therapist {
  id: string;
  name: string;
  imageUrl: string;
  specializations: string[];
  bioKey: TranslationKeys;
  languages: string[];
}

// This is mock data. In a real application, this would come from a database.
export const THERAPISTS_DATA: Therapist[] = [
  {
    id: '1',
    name: 'Dr. Ananya Sharma',
    imageUrl: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    specializations: ['Anxiety', 'Depression', 'CBT'],
    bioKey: 'therapist_ananya_bio',
    languages: ['English', 'Hindi'],
  },
  {
    id: '2',
    name: 'Mr. Rohan Desai',
    imageUrl: 'https://images.pexels.com/photos/5327653/pexels-photo-5327653.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    specializations: ['Relationships', 'Stress Management'],
    bioKey: 'therapist_rohan_bio',
    languages: ['English', 'Tamil'],
  },
   {
    id: '3',
    name: 'Ms. Priya Kumar',
    imageUrl: 'https://images.pexels.com/photos/7620223/pexels-photo-7620223.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    specializations: ['Grief', 'Trauma', 'Mindfulness'],
    bioKey: 'therapist_priya_bio',
    languages: ['English'],
  },
];
