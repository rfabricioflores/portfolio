import { Component } from '@angular/core';
import HeaderComponent from '../components/common/header/header.component';
import { AboutComponent } from '@components/common/about/about.component';
import ProjectsComponent from '@components/common/projects/projects.component';
import { RouteMeta } from '@analogjs/router';
import ExperienceComponent from '@components/common/experience/experience.component';
import ContactComponent from '@components/common/contact/contact.component';

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
  styleUrl: './index.page.scss',
})
export default class HomeComponent {}
