!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){e.exports=React},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=n(2),i=n(3),u=n(5);o.render(r.createElement(i.default,null),document.getElementById("root")),u.unregister()},function(e,t){e.exports=ReactDOM},function(e,t,n){"use strict";var r,o=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0});var i,u=n(0),c=n(0),s=n(4),a=function(e){function t(t){var n=e.call(this,t)||this;return n.inputElement=u.createRef(),n.handleInput=function(e){var t={text:e.target.value,key:Date.now()};n.setState({currentItem:t})},n.state={items:[],currentItem:{text:"",key:Date.now()}},n.serviceBus=new s.default,n.serviceBus.subcribeTo(i.AddItem,function(){return n.addItem()}),n.serviceBus.subcribeTo(i.DeleteItem,function(e){return n.deleteItem(e.detail)}),n}return o(t,e),t.prototype.addItem=function(){var e=this.state.currentItem;if(""!==e.text){var t=this.state.items.concat([e]);this.setState({items:t,currentItem:{text:"",key:Date.now()}})}},t.prototype.deleteItem=function(e){console.log(e);var t=this.state.items.filter(function(t){return t.key!==e.key});this.setState({items:t})},t.prototype.render=function(){return console.log("trololo"),u.createElement("div",null,"dupa")},t}(c.Component);t.default=a,function(e){e[e.AddItem=0]="AddItem",e[e.DeleteItem=1]="DeleteItem"}(i=t.TodoEventEnum||(t.TodoEventEnum={}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=function(){function e(){if(this.serviceBusDomId="serviceBus",this.serviceBusDomElement=document.getElementById(this.serviceBusDomId),!this.serviceBusDomElement){var e=document.createElement(this.serviceBusDomId);e.setAttribute("id",this.serviceBusDomId),this.serviceBusDomElement=document.body.appendChild(e)}}return e.prototype.subcribeTo=function(e,t){this.serviceBusDomElement.addEventListener(r[e],t)},e.prototype.dispatchEvent=function(e,t){var n=new CustomEvent(r[e],{detail:t,bubbles:!1});this.serviceBusDomElement.dispatchEvent(n)},e}();t.default=o,function(e){e[e.AddItem=0]="AddItem",e[e.DeleteItem=1]="DeleteItem"}(r=t.TodoEventEnum||(t.TodoEventEnum={}))},function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function r(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}t.register=function(t){if("serviceWorker"in navigator){if(new URL(e.env.PUBLIC_URL,window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var o=e.env.PUBLIC_URL+"/service-worker.js";n?(function(e,t){fetch(e).then(function(n){var o=n.headers.get("content-type");404===n.status||null!=o&&-1===o.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):r(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(o,t),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):r(o,t)})}},t.unregister=function(){"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}}).call(this,n(6))},function(e,t){var n,r,o=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function u(){throw new Error("clearTimeout has not been defined")}function c(e){if(n===setTimeout)return setTimeout(e,0);if((n===i||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:i}catch(e){n=i}try{r="function"==typeof clearTimeout?clearTimeout:u}catch(e){r=u}}();var s,a=[],l=!1,f=-1;function d(){l&&s&&(l=!1,s.length?a=s.concat(a):f=-1,a.length&&v())}function v(){if(!l){var e=c(d);l=!0;for(var t=a.length;t;){for(s=a,a=[];++f<t;)s&&s[f].run();f=-1,t=a.length}s=null,l=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===u||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function m(e,t){this.fun=e,this.array=t}function p(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];a.push(new m(e,t)),1!==a.length||l||c(v)},m.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=p,o.addListener=p,o.once=p,o.off=p,o.removeListener=p,o.removeAllListeners=p,o.emit=p,o.prependListener=p,o.prependOnceListener=p,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}}]);
//# sourceMappingURL=bundle.js.map