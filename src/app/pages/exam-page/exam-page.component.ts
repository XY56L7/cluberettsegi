import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ExamService } from '../../services/exam.service';
import {
  SUBJECTS,
  findSubjectBySlug,
  isLevelSlug,
  type LevelId,
  type SubjectId,
} from '../../models/subject';
import { DIGITAL_CULTURE_COLUMNS, DIGITAL_CULTURE_COLUMNS_KOZEP, INFORMATIKA_COLUMNS_KOZEP } from '../../models/exam';

@Component({
  selector: 'app-exam-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './exam-page.component.html',
})
export class ExamPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly examService = inject(ExamService);
  private readonly paramMap = toSignal(this.route.paramMap);

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

  constructor() {
    effect(() => {
      const params = this.paramMap();
      if (!params) return;
      const subjectSlug = params.get('subjectSlug') ?? '';
      const levelSlug = params.get('levelSlug') ?? '';
      const subject = findSubjectBySlug(subjectSlug);
      if (!subject || !isLevelSlug(levelSlug) || !subject.levels.some(l => l.id === levelSlug)) {
        void this.router.navigate(['/']);
        return;
      }
      this.selectedSubject.set(subject.id);
      this.selectedLevel.set(levelSlug);
    });
  }

  setSubject(id: SubjectId): void {
    const sub = SUBJECTS.find(s => s.id === id);
    if (!sub) return;
    void this.router.navigate(['/', sub.slug, this.selectedLevel()]);
  }

  setLevel(id: LevelId): void {
    const sub = SUBJECTS.find(s => s.id === this.selectedSubject());
    if (!sub) return;
    void this.router.navigate(['/', sub.slug, id]);
  }
}
