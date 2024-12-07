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
    {
      name: 'description',
      content:
        'A skilled developer with a passion for creating visually appealing and user-friendly websites. Expert in various programming languages and technologies to bring ideas to life.',
    },
    {
      property: 'og:title',
      content: 'Fabricio Flores - Full Stack Developer',
    },
    {
      property: 'og:description',
      content:
        'A skilled developer with a passion for creating visually appealing and user-friendly websites. Expert in various programming languages and technologies to bring ideas to life.',
    },
    {
      property: 'og:image',
      content: 'https://fabricioflores.se/og-image.png',
    },
    {
      property: 'og:image:width',
      content: '1200',
    },
    {
      property: 'og:image:height',
      content: '630',
    },
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
