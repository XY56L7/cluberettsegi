import { Injectable } from '@angular/core';
import type { SubjectId, LevelId } from '../models/subject';
import type { ExamEntry } from '../models/exam';
import type { DigitalCultureRow } from '../models/exam';
import { DIGITALIS_KULTURA_ROWS, INFORMATIKA_ROWS } from '../data/informatika-portal.data';
import { DIGITALIS_KULTURA_KOZEP_ROWS, INFORMATIKA_KOZEP_ROWS } from '../data/informatika-kozep.data';

@Injectable({ providedIn: 'root' })
export class ExamService {
  private readonly exams = this.getMockData();

  getExams(subject: SubjectId, level: LevelId): ExamEntry[] {
    const key = `${subject}-${level}`;
    return this.exams[key] ?? [];
  }

  getDigitálisKultúraRows(level: LevelId): DigitalCultureRow[] {
    return level === 'kozep' ? DIGITALIS_KULTURA_KOZEP_ROWS : DIGITALIS_KULTURA_ROWS;
  }

  getInformatikaRows(level: LevelId): DigitalCultureRow[] {
    return level === 'kozep' ? INFORMATIKA_KOZEP_ROWS : INFORMATIKA_ROWS;
  }

  private getMockData(): Record<string, ExamEntry[]> {
    const base: ExamEntry[] = [
      { period: '2025 május', title: 'Példa feladat 1', pdfUrl: '#', sourceUrl: '#', sourceLabel: 'forras.zip' },
      { period: '2025 május (idegen)', title: 'Példa feladat 2', pdfUrl: '#', sourceUrl: '#', sourceLabel: 'forras.zip' },
      { period: '2024 október', title: 'Példa feladat 3', pdfUrl: '#', sourceLabel: '(nincsen forrás)' },
      { period: '2024 május', title: 'Példa feladat 4', pdfUrl: '#', sourceUrl: '#', sourceLabel: 'forras.zip' },
      { period: '2023 október', title: 'Példa feladat 5', pdfUrl: '#', sourceUrl: '#', sourceLabel: 'valaszok.txt' },
    ];
    const keys = ['matek-kozep', 'matek-emelt', 'fizika-kozep', 'fizika-emelt', 'informatika-kozep', 'informatika-emelt', 'agazati-informatika-kozep', 'agazati-informatika-emelt'];
    const out: Record<string, ExamEntry[]> = {};
    keys.forEach(k => (out[k] = [...base]));
    return out;
  }
}
