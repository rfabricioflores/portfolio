import { Component, HostBinding } from '@angular/core';
import HeaderComponent from '../components/common/header/header.component';
import { AboutComponent } from '@components/common/about/about.component';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <app-header />
    <app-about />
  `,
  imports: [HeaderComponent, AboutComponent],
  styleUrl: './index.page.scss',
})
export default class HomeComponent {}
