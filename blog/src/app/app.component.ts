import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "app";
  isNavMenu: boolean = true;
  navMinWidth: string;
  navWidth: string;

  normalWidth = "200px";
  noWidth = "0px";

  public isSideMenu: boolean = true;

  /**
   *
   */
  constructor() {
    this.navMinWidth = this.normalWidth;
    this.navWidth = this.normalWidth;
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
