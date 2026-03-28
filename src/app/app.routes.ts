import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { ExamPageComponent } from './pages/exam-page/exam-page.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: ':subjectSlug/:levelSlug', component: ExamPageComponent },
  { path: '**', redirectTo: '' },
];
