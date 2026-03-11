export type SubjectId = 'matek' | 'fizika' | 'informatika' | 'agazati-informatika';

export type LevelId = 'kozep' | 'emelt';

export interface SubjectOption {
  id: SubjectId;
  label: string;
  levels: { id: LevelId; label: string }[];
}

export const SUBJECTS: SubjectOption[] = [
  { id: 'matek', label: 'Matematika', levels: [{ id: 'kozep', label: 'Középszint' }, { id: 'emelt', label: 'Emelt szint' }] },
  { id: 'fizika', label: 'Fizika', levels: [{ id: 'kozep', label: 'Középszint' }, { id: 'emelt', label: 'Emelt szint' }] },
  { id: 'informatika', label: 'Informatika', levels: [{ id: 'kozep', label: 'Középszint' }, { id: 'emelt', label: 'Emelt szint' }] },
  { id: 'agazati-informatika', label: 'Ágazati informatika', levels: [{ id: 'kozep', label: 'Középszint' }, { id: 'emelt', label: 'Emelt szint' }] },
];
