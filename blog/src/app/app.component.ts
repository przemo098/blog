import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "app";
  isNavMenu: boolean = false;
  navMinWidth: string;
  navWidth: string;

  normalWidth = "200px";
  noWidth = "0px";
  /**
   *
   */
  constructor() {
    if(window.innerWidth < 600){
      this.navMinWidth = this.noWidth;
      this.isNavMenu = true;
    }else{
      this.navMinWidth = this.normalWidth;
    }

    this.navWidth = this.normalWidth;
    this.setSideMenu();

    window.onresize= () => {
      this.setSideMenu();
    };
  }

  setSideMenu(){
    if(window.innerWidth < 600 && this.isNavMenu){
      this.toggleNav();
    }else if(!this.isNavMenu && window.innerWidth > 600){
      this.toggleNav();
    }
  }

  toggleNav() {
    this.isNavMenu = !this.isNavMenu;

    if (this.isNavMenu) {
      this.navMinWidth = this.normalWidth;
      this.navWidth = this.normalWidth;
    } else {
      this.navMinWidth = this.noWidth;
      this.navWidth = this.noWidth;
    }
  }

  ngOnInit() {
   
  }
}
