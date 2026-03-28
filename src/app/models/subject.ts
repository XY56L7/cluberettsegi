export type SubjectId = 'matek' | 'fizika' | 'informatika' | 'agazati-informatika';

export type LevelId = 'kozep' | 'emelt';

export interface SubjectOption {
  id: SubjectId;
  label: string;
  /** URL szegmens, pl. /digitaliskultura/emelt */
  slug: string;
  levels: { id: LevelId; label: string }[];
}

export const SUBJECTS: SubjectOption[] = [
  {
    id: 'matek',
    label: 'Matematika',
    slug: 'matematika',
    levels: [{ id: 'kozep', label: 'Középszint' }, { id: 'emelt', label: 'Emelt szint' }],
  },
  {
    id: 'fizika',
    label: 'Fizika',
    slug: 'fizika',
    levels: [{ id: 'kozep', label: 'Középszint' }, { id: 'emelt', label: 'Emelt szint' }],
  },
  {
    id: 'informatika',
    label: 'Digitális kultúra',
    slug: 'digitaliskultura',
    levels: [{ id: 'kozep', label: 'Középszint' }, { id: 'emelt', label: 'Emelt szint' }],
  },
  {
    id: 'agazati-informatika',
    label: 'Ágazati informatika',
    slug: 'agazati-informatika',
    levels: [{ id: 'kozep', label: 'Középszint' }, { id: 'emelt', label: 'Emelt szint' }],
  },
];

export function findSubjectBySlug(slug: string): SubjectOption | undefined {
  return SUBJECTS.find(s => s.slug === slug);
}

export function isLevelSlug(value: string): value is LevelId {
  return value === 'kozep' || value === 'emelt';
}
