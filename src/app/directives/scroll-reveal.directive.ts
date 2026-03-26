import { Directive, ElementRef, HostBinding, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit {
  @HostBinding('class.reveal-on-scroll') revealBase = true;
  @HostBinding('class.visible') isVisible = false;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.isVisible = true;
              observer.unobserve(this.el.nativeElement);
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(this.el.nativeElement);
    } else {
      // Fallback for SSR if needed
      this.isVisible = true;
    }
  }
}
