import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { StartseiteComponent } from './pages/startseite/startseite.component';
import { UeberUnsComponent } from './pages/ueber-uns/ueber-uns.component';
import { ErgotherapieComponent } from './pages/ergotherapie/ergotherapie.component';
import { FeinmotoriktherapieComponent } from './pages/feinmotoriktherapie/feinmotoriktherapie.component';
import { NeurologieComponent } from './pages/neurologie/neurologie.component';
import { KindertherapieComponent } from './pages/kindertherapie/kindertherapie.component';
import { StandorteKontaktComponent } from './pages/standorte-kontakt/standorte-kontakt.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { ImpressumComponent } from './pages/impressum/impressum.component';
import { DatenschutzComponent } from './pages/datenschutz/datenschutz.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    StartseiteComponent,
    UeberUnsComponent,
    ErgotherapieComponent,
    FeinmotoriktherapieComponent,
    NeurologieComponent,
    KindertherapieComponent,
    StandorteKontaktComponent,
    JobsComponent,
    ImpressumComponent,
    DatenschutzComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
