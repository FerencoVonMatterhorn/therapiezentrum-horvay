import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface Stellenangebot {
  titel: string;
  untertitel: string;
  standorte: string;
  anstellungsart: string;
  umfang: string;
  beginn: string;
  offeneStellen: string;
  beschreibung: string[];
  anforderungen: string[];
  wirBieten: string[];
}

@Component({
  selector: 'app-stellenangebote',
  imports: [CommonModule, RouterLink],
  templateUrl: './stellenangebote.html',
  styleUrl: './stellenangebote.scss',
})
export class Stellenangebote {
  stellenangebote: Stellenangebot[] = [
    {
      titel: 'Ergotherapeut/in (m/w/d)',
      untertitel: 'Festanstellung in Vollzeit oder Teilzeit',
      standorte: 'Aschersleben und Staßfurt',
      anstellungsart: 'Unbefristet, sozialversicherungspflichtig',
      umfang: '30 bis 40 Wochenstunden wären wünschenswert',
      beginn: 'Ab sofort',
      offeneStellen: '2 (je eine Stelle pro Standort)',
      beschreibung: [
        'Sie behandeln Patientinnen und Patienten aller Altersgruppen – von der Kindertherapie über die Feinmotorik bis zur neurologischen Rehabilitation.',
        'Neben der Behandlung in der Praxis gehören auch Hausbesuche zu Ihrem Arbeitsalltag.'
      ],
      anforderungen: [
        'Berufsabschluss als Ergotherapeut/in',
        'Berufserfahrung ist wünschenswert – Berufsanfänger sind ausdrücklich willkommen',
        'Fahrerlaubnis Klasse B (zwingend erforderlich, ein eigenes Fahrzeug ist nicht notwendig)',
        'Selbständiges Arbeiten, Zuverlässigkeit und Organisationsfähigkeit',
        'Eigeninitiative und Freude an der Arbeit im Team'
      ],
      wirBieten: [
        'Frei gestaltbare Arbeitszeit',
        'Fahrtzeit ist Arbeitszeit',
        'Zusätzliche Zeiten für Dokumentation und Berichteschreiben',
        'Zusätzliche Zeit für das Anfahren von Hausbesuchen',
        'Weiterbildungen werden unterstützt bzw. voll gefördert – inklusive Freistellung',
        'Betriebswagen wird gestellt',
        'Terminplanung und Abrechnung übernimmt die Empfangskraft',
        'Angebot Jobbike',
        'Teammeeting jeden Montag mit kostenfreiem Mittagessen'
      ]
    }
  ];

  /** mailto-Link mit vorausgefülltem Betreff für die jeweilige Stelle. */
  bewerbungsMailto(stelle: Stellenangebot): string {
    return `mailto:info@ergotherapie-horvay.de?subject=${encodeURIComponent('Bewerbung: ' + stelle.titel)}`;
  }
}
