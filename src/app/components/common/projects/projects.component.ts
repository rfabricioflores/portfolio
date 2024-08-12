import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, HostBinding, PLATFORM_ID, inject } from '@angular/core';
import { BorderComponent } from '@components/icons';
import { SlickCarouselModule } from 'ngx-slick-carousel';

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
  imports: [BorderComponent, SlickCarouselModule],
})
export default class ProjectsComponent {
  @HostBinding('class')
  readonly class = 'wrapper';

  private platformId = inject(PLATFORM_ID);

  get isBrowser() {
    return isPlatformBrowser(this.platformId);
  }

  get isServer() {
    return isPlatformServer(this.platformId);
  }

  readonly slideConfig = {
    slidesToShow: 2.5,
    slidesToScroll: 2,
    infinite: false,
    isServer: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 1,
        },
      },
    ],
    prevArrow: `
        <svg
        style="position: absolute; left: 0; top: 50%; transform: translateY(-50%); z-index: 1; cursor: pointer;"
      width="36"
      height="35"
      viewBox="0 0 36 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="36"
        height="35"
        rx="17.5"
        fill="url(#paint0_linear_65_206)"
      />
      <path
        d="M23 23L21.5 24.5L10 18V17L21.5 10.5L23 12L20 17.5L23 23Z"
        fill="#FDFDFD"
      />
      <defs>
        <linearGradient
          id="paint0_linear_65_206"
          x1="18"
          y1="0"
          x2="18"
          y2="35"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#B786F5" />
          <stop offset="1" stop-color="#76DFF7" />
        </linearGradient>
      </defs>
    </svg>
    `,
    nextArrow: `
        <svg
        style="position: absolute; right: 0; top: 50%; transform: translateY(-50%); z-index: 1; cursor: pointer;"
      width="36"
      height="35"
      viewBox="0 0 36 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="36.0007"
        y="34.9993"
        width="36"
        height="35"
        rx="17.5"
        transform="rotate(179.998 36.0007 34.9993)"
        fill="url(#paint0_linear_65_207)"
      />
      <path
        d="M12.9998 12.0002L14.4997 10.5001L26 16.9996L26 17.9996L14.5003 24.5001L13.0002 23.0002L16 17.5L12.9998 12.0002Z"
        fill="#FDFDFD"
      />
      <defs>
        <linearGradient
          id="paint0_linear_65_207"
          x1="54.0007"
          y1="34.9993"
          x2="54.0007"
          y2="69.9993"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#B786F5" />
          <stop offset="1" stop-color="#76DFF7" />
        </linearGradient>
      </defs>
    </svg>
    `,
    swipeToSlide: true,
    touchMove: true,
  };

  projects: Project[] = [
    {
      title: 'Turnpuu Consulting Website',
      image: '/projects/turnpuu.webp',
      description:
        'Designed and fully programmed the company website using Next.js <br/>Integrated design creativity with technical expertise to optimize user experience.',
      previewLink: 'https://turnpuu.se',
    },
    {
      title: 'Sparent Webshop',
      image: '/projects/sparent.webp',
      description:
        'Developed a feature-rich webshop for pool products. Implemented search functionality and product filtering for enhanced user experience.',
      previewLink: 'https://sparent.se',
    },
    {
      title: 'Pet Market',
      image: '/projects/pet-market.webp',
      description:
        'Developed a fullstack web application using Spring Boot for the backend and Angular for the frontend, aimed at facilitating the buying and selling of pets and pet-related products.',
      sourceCode: 'https://github.com/rfabricioflores/pet-market',
    },
    {
      title: 'Worlde Game',
      image: '/projects/wordle.webp',
      description:
        'A React app featuring a game and information page. The Express.js backend serves the React app and provides API routes for game logic and a server-side rendered highscore page using EJS.',
      sourceCode:
        'https://github.com/rfabricioflores/wordle-game-fullstack-app',
    },
    {
      title: 'Cinema Booking Website',
      image: '/projects/lulea-bio.webp',
      description:
        'A cinema booking website. Users can browse and book movies, with authentication to view their booking history. This app includes REST API, SSR, and E2E tests.',
      previewLink: 'https://nextjs-bio.fabricioflores.se/',
      sourceCode: 'https://github.com/rfabricioflores/nextjs-bio-clone',
    },
    {
      title: 'ESC - Hacker Escape Rooms',
      image: '/projects/esc-hacker.webp',
      description:
        'A static website built with HTML, CSS, and JS, closely following a provided design. The project emphasizes design accuracy, best practices, and a well-structured codebase for maintainability and performance.',
      previewLink: 'https://esc.fabricioflores.se/',
      sourceCode: 'https://github.com/rfabricioflores/esc',
    },
  ];
}
