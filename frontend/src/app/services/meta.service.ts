import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private baseUrl = 'https://therapiezentrum-horvay.de';
  private defaultDescription = 'Professionelle therapeutische Behandlungen für Ihre Gesundheit und Ihr Wohlbefinden.';
  private defaultImage = `${this.baseUrl}/images/hero-placeholder.png`;

  constructor(
    private title: Title,
    private meta: Meta,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.init();
  }

  private init(): void {
    // Handle initial route
    this.updateCurrentRoute();

    // Handle route changes
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.updateCurrentRoute();
      });
  }

  private updateCurrentRoute(): void {
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }

    const title = route.snapshot.data['title'] || route.snapshot.routeConfig?.['title'] || 'Therapiezentrum Horvay';
    const description = route.snapshot.data['description'] || this.defaultDescription;
    const image = route.snapshot.data['image'] || this.defaultImage;
    const url = `${this.baseUrl}${this.router.url}`;

    this.updateMetaTags(title, description, image, url);
  }

  private updateMetaTags(title: string, description: string, image: string, url: string): void {
    // Update title
    this.title.setTitle(title);

    // Update primary meta tags
    this.meta.updateTag({ name: 'title', content: title });
    this.meta.updateTag({ name: 'description', content: description });

    // Update Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:url', content: url });

    // Update Twitter tags
    this.meta.updateTag({ property: 'twitter:title', content: title });
    this.meta.updateTag({ property: 'twitter:description', content: description });
    this.meta.updateTag({ property: 'twitter:image', content: image });
    this.meta.updateTag({ property: 'twitter:url', content: url });
  }
}

