import { Component } from "@angular/core";
import { MenuItem } from "primeng/api";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "app";
  isNavMenu: boolean = true;
  navWidth = "250px";

  public items: MenuItem[];
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
    this.items = [
      {
        label: "File",
        items: [
          { label: "New", icon: "fa fa-plus" },
          { label: "Open", icon: "fa fa-download" }
        ]
      },
      {
        label: "Edit",
        items: [
          { label: "Undo", icon: "fa fa-refresh" },
          { label: "Redo", icon: "fa fa-repeat" }
        ]
      }
    ];
  }
}
