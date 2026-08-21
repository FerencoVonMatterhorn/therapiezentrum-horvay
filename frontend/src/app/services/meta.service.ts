import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private baseUrl = 'https://therapiezentrum-horvay.de';
  private defaultTitle = 'Ergotherapie Aschersleben & Staßfurt | Therapiezentrum Horvay';
  private defaultDescription =
    'Ergotherapie in Aschersleben und Staßfurt: Feinmotoriktherapie, Neurologie und Kindertherapie im Therapiezentrum Horvay.';
  private defaultImage = `${this.baseUrl}/images/hero-placeholder.png`;

  private document = inject(DOCUMENT);

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

    const title = route.snapshot.routeConfig?.['title']?.toString() ?? this.defaultTitle;
    const description = route.snapshot.data['description'] || this.defaultDescription;
    const image = route.snapshot.data['image'] || this.defaultImage;
    const noindex = route.snapshot.data['noindex'] === true;

    this.updateMetaTags(title, description, image, this.canonicalUrl(), noindex);
  }

  /** Canonical URL without query string or fragment, and without a trailing slash. */
  private canonicalUrl(): string {
    const path = this.router.url.split(/[?#]/)[0];
    return path === '/' ? `${this.baseUrl}/` : `${this.baseUrl}${path.replace(/\/$/, '')}`;
  }

  private updateMetaTags(
    title: string,
    description: string,
    image: string,
    url: string,
    noindex: boolean
  ): void {
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

    // Keep error pages out of the index, everything else indexable
    if (noindex) {
      this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });
    } else {
      this.meta.removeTag("name='robots'");
    }

    this.updateCanonical(url);
  }

  private updateCanonical(url: string): void {
    const head = this.document.head;
    let link = head.querySelector<HTMLLinkElement>("link[rel='canonical']");

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }

    link.setAttribute('href', url);
  }
}
