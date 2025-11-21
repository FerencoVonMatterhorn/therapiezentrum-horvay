import { Component, inject } from '@angular/core';
import { Layout } from './components/layout/layout';
import { MetaService } from './services/meta.service';

@Component({
  selector: 'app-root',
  imports: [Layout],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private metaService = inject(MetaService);
  
  constructor() {
    // Service is initialized via injection, which triggers route listening
  }
}
