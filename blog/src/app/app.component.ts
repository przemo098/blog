import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "app";
  isNavMenu: boolean = true;
  navWidth = "250px";

  public isSideMenu: boolean = true;

  /**
   *
   */
  constructor() {
  }

  toggleNav() {
    this.isNavMenu = !this.isNavMenu;

    if (this.isNavMenu) {
      this.navWidth = "250px";
    } else {
      this.navWidth = "0px";
    }
  }

  ngOnInit() {
   
  }
}
