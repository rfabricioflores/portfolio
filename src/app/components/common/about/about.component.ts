import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { BorderComponent } from '@components/icons';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [BorderComponent, NgOptimizedImage],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  host: { class: 'wrapper' },
})
export default class AboutComponent {}
