import { isPlatformBrowser } from '@angular/common';
import { Component, HostBinding, PLATFORM_ID, inject } from '@angular/core';
import BorderComponent from '@components/icons/border.component';

interface Project {
  title: string;
  image: string;
  description: string;
  previewLink?: string;
  sourceCode?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  imports: [BorderComponent],
})
export default class ProjectsComponent {
  @HostBinding('class')
  readonly class = 'wrapper';

  private platformId = inject(PLATFORM_ID);

  get isBrowser() {
    return isPlatformBrowser(this.platformId);
  }

  projects: Project[] = [
    {
      title: 'Pet market',
      image:
        'https://media.licdn.com/dms/image/D4D2DAQGAZsentLjSyg/profile-treasury-image-shrink_160_160/0/1707660438057?e=1710180000&v=beta&t=M35nJg9Ypj4SW3Qf45i15LGF-xE2mmx_6rM5WwhP6oo',
      description:
        'A safe website for pet advertisement with authentication. The backend api is written in Java with Springboot and the website with Angular.',
      previewLink: 'https://pet-market.fabricioflores.se/',
      sourceCode: 'https://github.com/rfabricioflores/pet-market',
    },
    {
      title: 'Pet market',
      image:
        'https://media.licdn.com/dms/image/D4D2DAQGAZsentLjSyg/profile-treasury-image-shrink_160_160/0/1707660438057?e=1710180000&v=beta&t=M35nJg9Ypj4SW3Qf45i15LGF-xE2mmx_6rM5WwhP6oo',
      description:
        'A safe website for pet advertisement with authentication. The backend api is written in Java with Springboot and the website with Angular.',
      previewLink: 'https://pet-market.fabricioflores.se/',
      sourceCode: 'https://github.com/rfabricioflores/pet-market',
    },
    {
      title: 'Pet market',
      image:
        'https://media.licdn.com/dms/image/D4D2DAQGAZsentLjSyg/profile-treasury-image-shrink_160_160/0/1707660438057?e=1710180000&v=beta&t=M35nJg9Ypj4SW3Qf45i15LGF-xE2mmx_6rM5WwhP6oo',
      description:
        'A safe website for pet advertisement with authentication. The backend api is written in Java with Springboot and the website with Angular.',
      previewLink: 'https://pet-market.fabricioflores.se/',
      sourceCode: 'https://github.com/rfabricioflores/pet-market',
    },
  ];
}
