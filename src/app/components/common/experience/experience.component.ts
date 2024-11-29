import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-experience',
  standalone: true,
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
  imports: [],
  host: { class: 'wrapper' },
})
export default class ExperienceComponent {
  public _state = signal(false);

  public experiences = [
    {
      title: 'Developer - Consultant in e-commerce',
      description: `
        • Development
        • NextJS
        • API development
        • SEO, CRO, WCAG
        • A/B testing
      `,
      company: 'Türnpuu Consulting AB',
      date: '',
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
      date: '',
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
      date: '',
    },
    {
      title: 'Technician / Salesperson',
      description: `
      • Electronics repair
      • Customer service and sales
      • Inventory and other administrative tasks
      `,
      company: 'PHONEIX',
      date: '',
    },
    {
      title: 'CMS Developer & Technician',
      description: `
      • Website management
      • Customer service
      • Electronics repair
      `,
      company: 'Mimmi Electronics',
      date: '',
    },
  ];
}
