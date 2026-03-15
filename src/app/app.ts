import { Component, signal, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ExamService } from './services/exam.service';
import { SUBJECTS, type SubjectId, type LevelId } from './models/subject';
import { DIGITAL_CULTURE_COLUMNS, DIGITAL_CULTURE_COLUMNS_KOZEP, INFORMATIKA_COLUMNS_KOZEP } from './models/exam';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly subjects = SUBJECTS;

  readonly selectedSubject = signal<SubjectId>('matek');
  readonly selectedLevel = signal<LevelId>('emelt');

  readonly selectedSubjectLabel = computed(() => {
    const id = this.selectedSubject();
    return SUBJECTS.find(s => s.id === id)?.label ?? '';
  });

  readonly currentLevels = computed(() => {
    const sid = this.selectedSubject();
    return SUBJECTS.find(s => s.id === sid)?.levels ?? [];
  });

  readonly selectedLevelLabel = computed(() => {
    const lid = this.selectedLevel();
    return this.currentLevels().find(l => l.id === lid)?.label ?? '';
  });

  readonly pageTitle = computed(() => {
    const sub = this.selectedSubjectLabel();
    const lvl = this.selectedLevelLabel();
    return lvl ? `${sub} – ${lvl}` : sub;
  });

  readonly examList = computed(() => {
    return this.examService.getExams(this.selectedSubject(), this.selectedLevel());
  });

  readonly isInformatika = computed(() => this.selectedSubject() === 'informatika');

  readonly showUnderDevelopment = computed(() => {
    const s = this.selectedSubject();
    const level = this.selectedLevel();
    return (
      s === 'matek' ||
      s === 'fizika' ||
      s === 'agazati-informatika' ||
      (s === 'informatika' && level === 'kozep')
    );
  });

  readonly isKozep = computed(() => this.selectedLevel() === 'kozep');

  readonly digitalCultureColumns = computed(() =>
    this.isKozep() ? DIGITAL_CULTURE_COLUMNS_KOZEP : DIGITAL_CULTURE_COLUMNS
  );

  readonly informatikaColumns = computed(() =>
    this.isKozep() ? INFORMATIKA_COLUMNS_KOZEP : DIGITAL_CULTURE_COLUMNS
  );

  readonly digitalCultureRows = computed(() => {
    if (!this.isInformatika()) return [];
    return this.examService.getDigitálisKultúraRows(this.selectedLevel());
  });

  readonly informatikaRows = computed(() => {
    if (!this.isInformatika()) return [];
    return this.examService.getInformatikaRows(this.selectedLevel());
  });

  constructor(private readonly examService: ExamService) {}

  setSubject(id: SubjectId): void {
    this.selectedSubject.set(id);
  }

  setLevel(id: LevelId): void {
    this.selectedLevel.set(id);
  }
}

