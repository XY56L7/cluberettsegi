import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SUBJECTS } from '../../models/subject';

@Component({
  selector: 'app-landing',
  imports: [RouterLink],
  templateUrl: './landing.component.html',
})
export class LandingComponent {
  readonly subjects = SUBJECTS;
}
