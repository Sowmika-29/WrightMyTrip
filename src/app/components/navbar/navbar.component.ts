import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isMenuOpen = false;
  activeSection = 'home';
  isCustomizeActive = false;
  isVisaActive = false;
  private isBrowser: boolean;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    // Update active section on route change (e.g., when navigating back to home)
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const fragment = this.router.parseUrl(this.router.url).fragment;
      if (fragment) {
        this.activeSection = fragment === 'trips' ? 'trips' : fragment;
      }
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!this.isBrowser) return;

    const sections = ['home', 'trips', 'contact'];
    const scrollPosition = window.pageYOffset + 150; // Offset for navbar height

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const offsetTop = element.offsetTop;
        const height = element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
          if (this.activeSection !== sectionId) {
            this.activeSection = sectionId;
            if (sectionId !== 'trips') {
              this.isCustomizeActive = false;
            }
            if (sectionId !== 'contact') {
              this.isVisaActive = false;
            }
          }
        }
      }
    }
  }

  scrollToSection(sectionId: string) {
    this.isMenuOpen = false; // Close mobile menu

    if (this.router.url.split('#')[0] !== '/' && this.router.url.split('#')[0] !== '/home') {
      // If not on home page, navigate to home with fragment
      this.router.navigate(['/home'], { fragment: sectionId });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      this.activeSection = sectionId;
    }
  }
}
