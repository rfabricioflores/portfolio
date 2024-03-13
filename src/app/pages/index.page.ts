import { Component, HostBinding } from '@angular/core';
import HeaderComponent from '../components/common/header/header.component';
import { AboutComponent } from '@components/common/about/about.component';
import ProjectsComponent from '@components/common/projects/projects.component';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <app-header />
    <app-about />
    <app-projects />
  `,
  imports: [HeaderComponent, AboutComponent, ProjectsComponent],
  styleUrl: './index.page.scss',
})
export default class HomeComponent {}
