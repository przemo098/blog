import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

declare var particlesJS: any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',

  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  name:string;
  video: any = {id: 'wzrnuUOoFNM'};
  baseUrl:string = 'https://www.youtube.com/embed/';
  url: SafeUrl;

  ngOnInit(): void {
    particlesJS.load('particles-js', 
    'assets/data/particles.json');


    this.url = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/watch?v=QH2-TGUlwu4");     
  }

  constructor(private sanitizer: DomSanitizer) {
   }
}

