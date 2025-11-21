import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  { path: '', component: StartseiteComponent },
  { path: 'ueber-uns', component: UeberUnsComponent },
  { path: 'ergotherapie', component: ErgotherapieComponent },
  { path: 'feinmotoriktherapie', component: FeinmotoriktherapieComponent },
  { path: 'neurologie', component: NeurologieComponent },
  { path: 'kindertherapie', component: KindertherapieComponent },
  { path: 'standorte-kontakt', component: StandorteKontaktComponent },
  { path: 'jobs', component: JobsComponent },
  { path: 'impressum', component: ImpressumComponent },
  { path: 'datenschutz', component: DatenschutzComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
