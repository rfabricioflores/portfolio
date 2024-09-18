import { Component } from '@angular/core';
import { RouteMeta } from '@analogjs/router';
import {
  HeaderComponent,
  AboutComponent,
  ProjectsComponent,
  ExperienceComponent,
  ContactComponent,
} from '@components/common';

export const routeMeta: RouteMeta = {
  meta: [
    { name: 'title', content: 'Fabricio Flores' },
    { name: 'description', content: 'Fabricio Flores - Full Stack Developer' },
  ],
};

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <app-header />
    <app-about />
    <app-projects />
    <app-experience />
    <app-contact />
  `,
  imports: [
    HeaderComponent,
    AboutComponent,
    ProjectsComponent,
    ExperienceComponent,
    ContactComponent,
  ],
})
export default class HomeComponent {}
