import { DatePipe, NgOptimizedImage } from '@angular/common';
import { Component, signal } from '@angular/core';
import ExpandableText from '../expandable-text/expandable-text.component';

@Component({
  selector: 'app-experience',
  standalone: true,
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
  imports: [DatePipe, NgOptimizedImage, ExpandableText],
  host: { class: 'wrapper' },
})
export default class ExperienceComponent {
  public _state = signal(false);

  public experiences = [
    {
      title: 'Fullstack Developer',
      description: `
        • Angular
        • Spring Boot
        • SQL
        • Digital design
      `,
      company: 'Sverok Admin AB',
      startDate: new Date('2025-02-17'),
      image: '/companies/sverokadmin.png',
    },
    {
      title: 'E-commerce Dev Consultant',
      description: `
      • Development
      • NextJS
      • API development
      • SEO, CRO, WCAG
      • A/B testing
      `,
      company: 'Türnpuu Consulting AB',
      startDate: new Date('2024-08-01'),
      image: '/companies/turnpuu.png',
    },
    {
      title: 'System Developer',
      description: `
      • Web development
      • Web design
      • API development
      • Testing
      • A/B testing
      `,
      company: 'Türnpuu Consulting AB',
      startDate: new Date('2024-01-01'),
      image: '/companies/turnpuu.png',
    },
    {
      title: 'Technician / Salesperson',
      description: `
      • Electronics repair and software solutions
      • Inventory and other administrative tasks
      • Customer service and sales
      • Mentored new hires, providing guidance & support
      `,
      company: 'Fix My Phone',
      startDate: new Date('2021-12-01'),
      image: '/companies/fixmyphone.png',
    },
    {
      title: 'Technician / Salesperson',
      description: `
      • Electronics repair
      • Customer service and sales
      • Inventory and other administrative tasks
      `,
      company: 'PHONEIX',
      startDate: new Date('2021-06-01'),
      image: '/companies/phoneix.png',
    },
    {
      title: 'CMS Developer & Technician',
      description: `
      • Website management
      • Customer service
      • Electronics repair
      `,
      company: 'Mimmi Electronics',
      startDate: new Date('2020-01-01'),
      image: '/companies/mimmi.png',
    },
  ];
}
