import { Component, OnInit } from '@angular/core';

declare var particlesJS: any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',

  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  ngOnInit(): void {
    particlesJS.load('particles-js', 
    'assets/data/particles.json', 
    function() { console.log('callback - particles.js config loaded'); });
  }

  constructor() {
   }
}

