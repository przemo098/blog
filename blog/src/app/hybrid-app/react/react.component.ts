import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-react",
  templateUrl: "./react.component.html",
  styleUrls: ["./react.component.scss"]
})
export class ReactComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.loadAPI = new Promise(() => {
      this.loadScript();
    });
  }

  loadAPI: Promise<any>;

  public loadScript() {
    const url = "./js/app.react-bundle.js";
    console.log("preparing to load...");
    let node = document.createElement("script");
    node.src = url;
    node.type = "text/javascript";
    node.async = true;
    node.charset = "utf-8";
    document.getElementsByTagName("head")[0].appendChild(node);
  }
}
