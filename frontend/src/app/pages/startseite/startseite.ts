import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-startseite',
  imports: [RouterLink, CommonModule],
  templateUrl: './startseite.html',
  styleUrl: './startseite.scss',
})
export class Startseite {

}