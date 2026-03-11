export interface ExamEntry {
  period: string;
  title: string;
  pdfUrl?: string;
  sourceUrl?: string;
  sourceLabel?: string;
}

/** One cell in the Digitális kultúra / Informatika table (title + optional file link(s)) */
export interface DigitalCultureCell {
  title: string;
  fileUrl?: string;
  fileLabel?: string;
  fileUrl2?: string;
  fileLabel2?: string;
}

/** One row: period + columns Szöveg, Prezentáció/grafika, Weblap, Táblázat, Adatbázis, Programozás */
export interface DigitalCultureRow {
  period: string;
  szoveg?: DigitalCultureCell;
  prezentacioGrafika?: DigitalCultureCell;
  weblap?: DigitalCultureCell;
  tablazat?: DigitalCultureCell;
  adatbazis?: DigitalCultureCell;
  programozas?: DigitalCultureCell;
}

export const DIGITAL_CULTURE_COLUMNS = [
  { key: 'szoveg', label: 'Szöveg' },
  { key: 'prezentacioGrafika', label: 'Prezentáció, grafika' },
  { key: 'weblap', label: 'Weblap' },
  { key: 'tablazat', label: 'Táblázat' },
  { key: 'adatbazis', label: 'Adatbázis' },
  { key: 'programozas', label: 'Programozás' },
] as const;

/** Középszint: Digitális kultúra – nincs Weblap oszlop */
export const DIGITAL_CULTURE_COLUMNS_KOZEP = [
  { key: 'szoveg', label: 'Szöveg' },
  { key: 'prezentacioGrafika', label: 'Prezentáció, grafika' },
  { key: 'tablazat', label: 'Táblázat' },
  { key: 'adatbazis', label: 'Adatbázis' },
  { key: 'programozas', label: 'Programozás' },
] as const;

/** Középszint: Informatika – nincs Programozás oszlop */
export const INFORMATIKA_COLUMNS_KOZEP = [
  { key: 'szoveg', label: 'Szöveg' },
  { key: 'prezentacioGrafika', label: 'Prezentáció' },
  { key: 'weblap', label: 'Weblap' },
  { key: 'tablazat', label: 'Táblázat' },
  { key: 'adatbazis', label: 'Adatbázis' },
] as const;
