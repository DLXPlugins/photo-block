(self.webpackChunkphoto_block=self.webpackChunkphoto_block||[]).push([[70],{7030:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return j}});var o=n(9307),r=n(5609),a=n(5736),i=n(2175),c=n(3742),l=n(6472);const h=(0,l.Z)("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]),s=(0,l.Z)("RotateCcw",[["path",{d:"M3 2v6h6",key:"18ldww"}],["path",{d:"M3 13a9 9 0 1 0 3-7.7L3 8",key:"aahkch"}]]),u=(0,l.Z)("RotateCw",[["path",{d:"M21 2v6h-6",key:"1lwg0q"}],["path",{d:"M21 13a9 9 0 1 1-3-7.7L21 8",key:"vix499"}]]);var d=n(3217),p=n(3696),g=n(1352),m=n(6120),f=n.n(m),w=n(4184),y=n.n(w),v=n(4797),b=n(9196),x=n.n(b),R=n(802),C=function(){return x().createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:24,height:24,fillRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2,clipRule:"evenodd",viewBox:"0 0 100 100"},x().createElement("path",{d:"M90.734 21.888a9.376 9.376 0 0 0-9.375-9.375h-62.81a9.374 9.374 0 0 0-9.375 9.375v56.148a9.376 9.376 0 0 0 9.375 9.375h62.81a9.378 9.378 0 0 0 9.375-9.375V21.888zm-6.25 0v56.148a3.126 3.126 0 0 1-3.125 3.125h-62.81a3.126 3.126 0 0 1-3.125-3.125V21.888a3.125 3.125 0 0 1 3.125-3.125h62.81a3.125 3.125 0 0 1 3.125 3.125z"}),x().createElement("path",{d:"M45.313 24.854H31.104a9.376 9.376 0 0 0-9.375 9.375v14.209a3.125 3.125 0 0 0 6.25 0V34.229a3.126 3.126 0 0 1 3.125-3.125h14.208a3.126 3.126 0 0 0 .001-6.25zM54.542 75H68.75a9.376 9.376 0 0 0 9.375-9.375V51.417a3.126 3.126 0 0 0-6.25 0v14.208a3.125 3.125 0 0 1-3.125 3.125H54.542a3.126 3.126 0 0 0 0 6.25z"}))},_=n(7536),E=function(t,e){console.log(t,e);var n=function t(e,n){return 0===n?e:t(n,e%n)}(t,e);return{width:t/n,height:e/n}},k=function(){return x().createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 192 512",width:24,height:24},x().createElement("path",{fill:"currentColor",d:"M96 192a64 64 0 1 0 0-128 64 64 0 1 0 0 128zm0 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128z"}))};function D(t){return D="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},D(t)}function S(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function M(t,e,n){return(e=function(t){var e=function(t,e){if("object"!==D(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var o=n.call(t,"string");if("object"!==D(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===D(e)?e:String(e)}(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var P=(0,o.forwardRef)((function(t,e){var n=t.attributes,o=t.setAttributes,i=(0,_.cI)({defaultValues:{aspectRatioWidth:n.aspectRatioWidth,aspectRatioHeight:n.aspectRatioHeight,aspectRatioWidthPixels:n.aspectRatioWidthPixels,aspectRatioHeightPixels:n.aspectRatioHeightPixels,aspectRatioUnit:n.aspectRatioUnit}}),c=i.control,l=i.handleSubmit,h=i.setValue,s=i.getValues;return(0,_.cl)({control:c}).isDirty,(0,_.qo)({control:c}),React.createElement(React.Fragment,null,React.createElement("form",{onSubmit:l((function(e){t.onChange(function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?S(Object(n),!0).forEach((function(e){M(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):S(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({},e))}))},React.createElement("div",{className:y()("dlx-photo-block__component-aspect-ratio",{"dlx-photo-block__component-aspect-ratio--active":"ratio"===s("aspectRatioUnit"),"dlx-photo-block__component-pixels--active":"pixels"===s("aspectRatioUnit")})},"ratio"===s("aspectRatioUnit")&&React.createElement(React.Fragment,null,React.createElement(_.Qr,{name:"aspectRatioWidth",control:c,render:function(t){var e=t.field,n=e.onChange,o=e.value;return React.createElement(r.TextControl,{label:(0,a.__)("Aspect Ratio Width","photo-block"),value:o,onChange:function(t){n(t)},type:"number",placeholder:16})}}),React.createElement("span",{className:"dlx-photo-block__component-aspect-ratio-splitter"},React.createElement(r.Button,{variant:"secondary",className:"dlx-photo-block__component-aspect-ratio-splitter-button",label:(0,a.__)("Change between aspect ratio and pixels","photo-block"),onClick:function(){"pixels"===s("aspectRatioUnit")?(h("aspectRatioUnit","ratio"),o({aspectRatioUnit:"ratio"})):(h("aspectRatioUnit","pixels"),o({aspectRatioUnit:"pixels"}))},icon:"pixels"===s("aspectRatioUnit")?React.createElement(g.Z,null):React.createElement(k,null)})),React.createElement(_.Qr,{name:"aspectRatioHeight",control:c,render:function(t){var e=t.field,n=e.onChange,o=e.value;return React.createElement(r.TextControl,{label:(0,a.__)("Aspect Ratio Height","photo-block"),value:o,onChange:function(t){n(t)},type:"number",placeholder:9})}})),"pixels"===s("aspectRatioUnit")&&React.createElement(React.Fragment,null,React.createElement(_.Qr,{name:"aspectRatioWidthPixels",control:c,render:function(t){var e=t.field,n=e.onChange,o=e.value;return React.createElement(r.TextControl,{label:(0,a.__)("Pixel Width","photo-block"),value:o,onChange:function(t){n(t)},type:"number",placeholder:16})}}),React.createElement("span",{className:"dlx-photo-block__component-aspect-ratio-splitter"},React.createElement(r.Button,{variant:"secondary",className:"dlx-photo-block__component-aspect-ratio-splitter-button",label:(0,a.__)("Change between aspect ratio and pixels","photo-block"),onClick:function(){"pixels"===s("aspectRatioUnit")?(h("aspectRatioUnit","ratio"),o({aspectRatioUnit:"ratio"})):(h("aspectRatioUnit","pixels"),o({aspectRatioUnit:"pixels"}))},icon:"pixels"===s("aspectRatioUnit")?React.createElement(g.Z,{width:16,height:16}):React.createElement(k,{width:16,height:16})})),React.createElement(_.Qr,{name:"aspectRatioHeightPixels",control:c,render:function(t){var e=t.field,n=e.onChange,o=e.value;return React.createElement(r.TextControl,{label:(0,a.__)("Pixel Height","photo-block"),value:o,onChange:function(t){n(t)},type:"number",placeholder:9})}})),React.createElement(r.Button,{variant:"primary",type:"submit",className:"dlx-photo-block__component-aspect-ratio-apply",label:(0,a.__)("Apply the Aspect Ratio","photo-block"),tooltip:(0,a.__)("Switch modes from Aspect Ratio to Width and Height (pixels)","photo-block")},(0,a.__)("Apply","photo-block")))))})),O=P;function H(t){return H="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},H(t)}function L(){L=function(){return t};var t={},e=Object.prototype,n=e.hasOwnProperty,o=Object.defineProperty||function(t,e,n){t[e]=n.value},r="function"==typeof Symbol?Symbol:{},a=r.iterator||"@@iterator",i=r.asyncIterator||"@@asyncIterator",c=r.toStringTag||"@@toStringTag";function l(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(t){l=function(t,e,n){return t[e]=n}}function h(t,e,n,r){var a=e&&e.prototype instanceof d?e:d,i=Object.create(a.prototype),c=new E(r||[]);return o(i,"_invoke",{value:x(t,n,c)}),i}function s(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}t.wrap=h;var u={};function d(){}function p(){}function g(){}var m={};l(m,a,(function(){return this}));var f=Object.getPrototypeOf,w=f&&f(f(k([])));w&&w!==e&&n.call(w,a)&&(m=w);var y=g.prototype=d.prototype=Object.create(m);function v(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function b(t,e){function r(o,a,i,c){var l=s(t[o],t,a);if("throw"!==l.type){var h=l.arg,u=h.value;return u&&"object"==H(u)&&n.call(u,"__await")?e.resolve(u.__await).then((function(t){r("next",t,i,c)}),(function(t){r("throw",t,i,c)})):e.resolve(u).then((function(t){h.value=t,i(h)}),(function(t){return r("throw",t,i,c)}))}c(l.arg)}var a;o(this,"_invoke",{value:function(t,n){function o(){return new e((function(e,o){r(t,n,e,o)}))}return a=a?a.then(o,o):o()}})}function x(t,e,n){var o="suspendedStart";return function(r,a){if("executing"===o)throw new Error("Generator is already running");if("completed"===o){if("throw"===r)throw a;return{value:void 0,done:!0}}for(n.method=r,n.arg=a;;){var i=n.delegate;if(i){var c=R(i,n);if(c){if(c===u)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===o)throw o="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o="executing";var l=s(t,e,n);if("normal"===l.type){if(o=n.done?"completed":"suspendedYield",l.arg===u)continue;return{value:l.arg,done:n.done}}"throw"===l.type&&(o="completed",n.method="throw",n.arg=l.arg)}}}function R(t,e){var n=e.method,o=t.iterator[n];if(void 0===o)return e.delegate=null,"throw"===n&&t.iterator.return&&(e.method="return",e.arg=void 0,R(t,e),"throw"===e.method)||"return"!==n&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+n+"' method")),u;var r=s(o,t.iterator,e.arg);if("throw"===r.type)return e.method="throw",e.arg=r.arg,e.delegate=null,u;var a=r.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,u):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,u)}function C(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function _(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function E(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(C,this),this.reset(!0)}function k(t){if(t){var e=t[a];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,r=function e(){for(;++o<t.length;)if(n.call(t,o))return e.value=t[o],e.done=!1,e;return e.value=void 0,e.done=!0,e};return r.next=r}}return{next:D}}function D(){return{value:void 0,done:!0}}return p.prototype=g,o(y,"constructor",{value:g,configurable:!0}),o(g,"constructor",{value:p,configurable:!0}),p.displayName=l(g,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===p||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,l(t,c,"GeneratorFunction")),t.prototype=Object.create(y),t},t.awrap=function(t){return{__await:t}},v(b.prototype),l(b.prototype,i,(function(){return this})),t.AsyncIterator=b,t.async=function(e,n,o,r,a){void 0===a&&(a=Promise);var i=new b(h(e,n,o,r),a);return t.isGeneratorFunction(n)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},v(y),l(y,c,"Generator"),l(y,a,(function(){return this})),l(y,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),n=[];for(var o in e)n.push(o);return n.reverse(),function t(){for(;n.length;){var o=n.pop();if(o in e)return t.value=o,t.done=!1,t}return t.done=!0,t}},t.values=k,E.prototype={constructor:E,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(_),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function o(n,o){return i.type="throw",i.arg=t,e.next=n,o&&(e.method="next",e.arg=void 0),!!o}for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r],i=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var c=n.call(a,"catchLoc"),l=n.call(a,"finallyLoc");if(c&&l){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var o=this.tryEntries.length-1;o>=0;--o){var r=this.tryEntries[o];if(r.tryLoc<=this.prev&&n.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var a=r;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,u):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),u},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),_(n),u}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var o=n.completion;if("throw"===o.type){var r=o.arg;_(n)}return r}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:k(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),u}},t}function I(t,e,n,o,r,a,i){try{var c=t[a](i),l=c.value}catch(t){return void n(t)}c.done?e(l):Promise.resolve(l).then(o,r)}function A(t){return function(){var e=this,n=arguments;return new Promise((function(o,r){var a=t.apply(e,n);function i(t){I(a,o,r,i,c,"next",t)}function c(t){I(a,o,r,i,c,"throw",t)}i(void 0)}))}}function N(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var o,r,_x,a,i=[],_n=!0,c=!1;try{if(_x=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;_n=!1}else for(;!(_n=(o=_x.call(n)).done)&&(i.push(o.value),i.length!==e);_n=!0);}catch(t){c=!0,r=t}finally{try{if(!_n&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(c)throw r}}return i}}(t,e)||function(t,e){if(t){if("string"==typeof t)return U(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?U(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function U(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}var j=function(t){var e,n=(0,o.useContext)(v.Z),l=(n.screen,n.imageFile,n.setScreen),m=n.setImageFile,w=t.attributes,x=t.setAttributes,_=N((0,o.useState)(!0),2),k=_[0],D=_[1],S=N((0,o.useState)(!0),2),M=S[0],P=(S[1],N((0,o.useState)({}),2)),H=P[0],I=P[1],U=N((0,o.useState)(null),2),j=(U[0],U[1]),B=N((0,o.useState)(0),2),W=B[0],Y=B[1],T=N((0,o.useState)(null),2),X=T[0],K=T[1],Z=N((0,o.useState)(!0),2),z=Z[0],F=Z[1],G=N((0,o.useState)(!1),2),q=G[0],V=G[1],$=N((0,o.useState)(void 0),2),Q=$[0],J=$[1],tt=N((0,o.useState)(null),2),et=tt[0],nt=tt[1],ot=N((0,o.useState)(null),2),rt=ot[0],at=ot[1],it=N((0,o.useState)(null),2),ct=it[0],lt=it[1],ht=w.photo,st=(w.uniqueId,w.aspectRatio),ut=w.aspectRatioUnit,dt=w.aspectRatioWidth,pt=w.aspectRatioHeight,gt=w.aspectRatioWidthPixels,mt=w.aspectRatioHeightPixels,ft=(ht.url,ht.id,ht.width),wt=ht.height,yt=function(t,e){return new Promise((function(n,o){var r=document.createElement("canvas"),a=r.getContext("2d"),i=new Image;i.crossOrigin="anonymous",i.src=t,i.onload=function(){var t=e*Math.PI/180,o=Math.sin(t),c=Math.cos(t),l=Math.abs(i.width*c)+Math.abs(i.height*o),h=Math.abs(i.width*o)+Math.abs(i.height*c);r.width=l,r.height=h,a.translate(r.width/2,r.height/2),a.rotate(e*Math.PI/180),a.drawImage(i,-i.width/2,-i.height/2),r.toBlob((function(t){var e=URL.createObjectURL(t);n({url:e,width:r.width,height:r.height})}),"image/png")},i.onerror=function(t){o(t)}}))},vt=function(t){var e=W+t;return 360===e||-360===e?0:e},bt=function(){var t=A(L().mark((function t(e,n,o){var r,a,i,c,l,h,s,u,d,p;return L().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=ct.offsetWidth,a=ct.offsetHeight,i=ct.naturalWidth,c=ct.naturalHeight,l=i/r,h=c/a,s=e.x*l,u=e.y*h,d=e.width*l,p=e.height*h,t.next=12,(0,R.Z)(photoBlock.restNonce,{cropX:s,cropY:u,cropWidth:d,cropHeight:p,imageId:n,rotateDegrees:o},"".concat(photoBlock.restUrl+"/image/crop"),"POST");case 12:return t.abrupt("return",t.sent);case 13:case"end":return t.stop()}}),t)})));return function(e,n,o){return t.apply(this,arguments)}}(),xt=function(t,e,n){var o,r,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,c=1*Math.min(t,e);t<e?r=(o=c)/n:o=(r=c)*n,a&&i&&(o=a,r=i),o>t&&(r=(o=t)/n),r>e&&(o=(r=e)*n);var l={aspect:o/r,unit:"px",x:Math.max((t-o)/2,0),y:Math.max((e-r)/2,0),width:o,height:r};a&&i&&(l.maxWidth=a,l.maxHeight=i),K(l)};(0,b.useEffect)((function(){function t(){return(t=A(L().mark((function t(){var e,n,o,r;return L().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,R.Z)(photoBlock.restNonce,{},"".concat(photoBlock.restUrl+"/get-image","/id=").concat(ht.id),"GET");case 2:e=t.sent,n=e.data,I(n),o=dt/pt,"pixels"===ut&&(r=E(gt,mt),o=r.width/r.height),D(!1),J(o);case 9:case"end":return t.stop()}}),t)})))).apply(this,arguments)}!function(){t.apply(this,arguments)}()}),[M]),(0,b.useEffect)((function(){ct&&xt(ct.offsetWidth,ct.offsetHeight,Q)}),[ct]);var Rt=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,r=t/e;null!==n&&null!==o?(r=n/o,nt(n),at(o)):(nt(null),at(null)),J(r),xt(ct.offsetWidth,null==ct?void 0:ct.offsetHeight,r,n,o)},Ct=React.createElement(i.InspectorControls,null,React.createElement(r.PanelBody,{title:(0,a.__)("Crop Settings","photo-block")},React.createElement(r.PanelRow,null,"Crop options here"))),_t=React.createElement(i.BlockControls,null,React.createElement(r.ToolbarGroup,null,React.createElement(r.ToolbarDropdownMenu,{icon:React.createElement(C,null),label:(0,a.__)("Aspect Ratio","photo-block")},(function(t){var e=t.onClose;return React.createElement(React.Fragment,null,React.createElement(r.MenuGroup,{className:"dlx-photo-block__aspect-ratio-group"},React.createElement(r.MenuItem,{icon:"original"===st?React.createElement(c.Z,null):null,isSelected:"original"===st,onClick:function(){x({aspectRatio:"original"}),Rt(null==H?void 0:H.width,null==H?void 0:H.height),e()}},(0,a.__)("Original","photo-block")),React.createElement(r.MenuItem,{icon:"square"===st?React.createElement(c.Z,null):null,isSelected:"square"===st,onClick:function(){x({aspectRatio:"square"}),Rt(1,1),e()}},(0,a.__)("Square","photo-block")),React.createElement(r.MenuItem,{icon:"custom"===st?React.createElement(c.Z,null):null,isSelected:"custom"===st,onClick:function(){x({aspectRatio:"custom"}),e()}},(0,a.__)("Custom","photo-block"))),React.createElement(r.MenuGroup,{label:(0,a.__)("Landscape","photo-block"),className:"dlx-photo-block__aspect-ratio-group"},React.createElement(r.MenuItem,{icon:"16:10"===st?React.createElement(c.Z,null):null,isSelected:"16:10"===st,onClick:function(){x({aspectRatio:"16:10"}),Rt(16,10),e()}},(0,a.__)("16:10","photo-block")),React.createElement(r.MenuItem,{icon:"16:9"===st?React.createElement(c.Z,null):null,isSelected:"16:9"===st,onClick:function(){x({aspectRatio:"16:9"}),Rt(16,9),e()}},(0,a.__)("16:9","photo-block")),React.createElement(r.MenuItem,{icon:"4:3"===st?React.createElement(c.Z,null):null,isSelected:"4:3"===st,onClick:function(){x({aspectRatio:"4:3"}),Rt(4,3),e()}},(0,a.__)("4:3","photo-block")),React.createElement(r.MenuItem,{icon:"3:2"===st?React.createElement(c.Z,null):null,isSelected:"3:2"===st,onClick:function(){x({aspectRatio:"3:2"}),Rt(3,2),e()}},(0,a.__)("3:2","photo-block"))),React.createElement(r.MenuGroup,{label:(0,a.__)("Portrait","photo-block"),className:"dlx-photo-block__aspect-ratio-group"},React.createElement(r.MenuItem,{icon:"10:16"===st?React.createElement(c.Z,null):null,isSelected:"10:16"===st,onClick:function(){x({aspectRatio:"10:16"}),Rt(10,16),e()}},(0,a.__)("10:16","photo-block")),React.createElement(r.MenuItem,{icon:"9:16"===st?React.createElement(c.Z,null):null,isSelected:"9:16"===st,onClick:function(){x({aspectRatio:"9:16"}),Rt(9,16),e()}},(0,a.__)("9:16","photo-block")),React.createElement(r.MenuItem,{icon:"3:4"===st?React.createElement(c.Z,null):null,isSelected:"3:4"===st,onClick:function(){x({aspectRatio:"3:4"}),Rt(3,4),e()}},(0,a.__)("3:4","photo-block")),React.createElement(r.MenuItem,{icon:"2:3"===st?React.createElement(c.Z,null):null,isSelected:"2:3"===st,onClick:function(){x({aspectRatio:"2:3"}),Rt(2,3),e()}},(0,a.__)("2:3","photo-block"))))})),React.createElement(r.ToolbarButton,{className:"dlx-photo-block__lock-crop-button",icon:React.createElement(h,null),label:z?(0,a.__)("UnLock Aspect Ratio","photo-block"):(0,a.__)("Lock Aspect Ratio","photo-block"),isActive:z,onClick:function(){F(!z)}}),React.createElement(r.ToolbarButton,{icon:React.createElement(s,null),label:(0,a.__)("Rotate Left","photo-block"),onClick:function(){var t=vt(-90);Y(t),yt(ht.url,t).then((function(t){I(t),j(t)}))}}),React.createElement(r.ToolbarButton,{icon:React.createElement(u,null),label:(0,a.__)("Rotate Right","photo-block"),onClick:function(){var t=vt(90);Y(t),yt(ht.url,t).then((function(t){I(t),j(t)}))}})),"custom"===st&&React.createElement(r.ToolbarGroup,null,React.createElement(r.ToolbarItem,{as:(0,o.forwardRef)((function(t,e){return React.createElement(O,{attributes:w,setAttributes:x,forwardRef:e,onChange:function(t){if(x({aspectRatioWidthPixels:t.aspectRatioWidthPixels,aspectRatioHeightPixels:t.aspectRatioHeightPixels}),"pixels"===t.aspectRatioUnit){var e=E(t.aspectRatioWidthPixels,t.aspectRatioHeightPixels);x({aspectRatioWidth:e.width,aspectRatioHeight:e.height}),Rt(e.width,e.height,t.aspectRatioWidthPixels,t.aspectRatioHeightPixels)}else x({aspectRatioWidth:t.aspectRatioWidth,aspectRatioHeight:t.aspectRatioHeight}),Rt(t.aspectRatioWidth,t.aspectRatioHeight)}})}))})),React.createElement(r.ToolbarGroup,null,React.createElement(r.ToolbarButton,{icon:q?React.createElement(d.Z,null):React.createElement(p.Z,null),className:y()("dlx-photo-block__save-button",{"is-saving":q}),label:(0,a.__)("Save Changes","photo-block"),onClick:function(){q||(V(!0),bt(X,ht.id,W).then((function(t){var e=t.data;e.success&&(m(e.data.attachment),x({photo:e.data.attachment,imageDimensions:{width:e.data.width,height:e.data.height}}),l("edit"))})).catch((function(t){console.log(t)})).then((function(){V(!1)})))}},q?(0,a.__)("Saving…","photo-block"):(0,a.__)("Save Changes","photo-block")),React.createElement(r.ToolbarButton,{icon:React.createElement(g.Z,null),label:(0,a.__)("Cancel","photo-block"),onClick:function(){l("edit")},disabled:q},(0,a.__)("Cancel","photo-block"))));return React.createElement(React.Fragment,null,Ct,_t,React.createElement("div",{className:"dlx-photo-block__screen-edit"},k&&React.createElement("div",{className:"dlx-photo-block__screen-edit-spinner",style:{minWidth:ft,minHeight:wt,maxWidth:"100%",maxHeight:"100%"}},React.createElement("h3",null,(0,a.__)("Loading Full Size Image","photo-block")),React.createElement(r.Spinner,null)),!k&&React.createElement(React.Fragment,null,React.createElement(f(),{aspect:z?Q:null,crop:X,onChange:function(t){K(t)},ruleOfThirds:!0,maxWidth:null!=et?et:void 0,maxHeight:null!=rt?rt:void 0},React.createElement("img",{src:null!==(e=null==H?void 0:H.url)&&void 0!==e?e:"",width:null==H?void 0:H.width,height:null==H?void 0:H.height,style:{maxWidth:"100%",height:"auto"},alt:"",ref:lt})))))}},3696:function(t,e,n){"use strict";n.d(e,{Z:function(){return o}});const o=(0,n(6472).Z)("Save",[["path",{d:"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z",key:"1owoqh"}],["polyline",{points:"17 21 17 13 7 13 7 21",key:"1md35c"}],["polyline",{points:"7 3 7 8 15 8",key:"8nz8an"}]])},6120:function(t,e,n){var o;o=t=>(()=>{"use strict";var e={899:e=>{e.exports=t}},n={};function o(t){var r=n[t];if(void 0!==r)return r.exports;var a=n[t]={exports:{}};return e[t](a,a.exports,o),a.exports}o.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return o.d(e,{a:e}),e},o.d=(t,e)=>{for(var n in e)o.o(e,n)&&!o.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},o.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),o.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var r={};return(()=>{o.r(r),o.d(r,{Component:()=>m,areCropsEqual:()=>c,centerCrop:()=>h,clamp:()=>i,containCrop:()=>d,convertToPercentCrop:()=>s,convertToPixelCrop:()=>u,default:()=>m,defaultCrop:()=>a,makeAspectCrop:()=>l,nudgeCrop:()=>p});var t=o(899),e=o.n(t);function n(t){var e,o,r="";if("string"==typeof t||"number"==typeof t)r+=t;else if("object"==typeof t)if(Array.isArray(t))for(e=0;e<t.length;e++)t[e]&&(o=n(t[e]))&&(r&&(r+=" "),r+=o);else for(e in t)t[e]&&(r&&(r+=" "),r+=e);return r}const a={x:0,y:0,width:0,height:0,unit:"px"};function i(t,e,n){return Math.min(Math.max(t,e),n)}function c(t,e){return t.width===e.width&&t.height===e.height&&t.x===e.x&&t.y===e.y&&t.unit===e.unit}function l(t,e,n,o){const r=u(t,n,o);return t.width&&(r.height=r.width/e),t.height&&(r.width=r.height*e),r.y+r.height>o&&(r.height=o-r.y,r.width=r.height*e),r.x+r.width>n&&(r.width=n-r.x,r.height=r.width/e),"%"===t.unit?s(r,n,o):r}function h(t,e,n){const o=u(t,e,n);return o.x=(e-o.width)/2,o.y=(n-o.height)/2,"%"===t.unit?s(o,e,n):o}function s(t,e,n){return"%"===t.unit?{...a,...t,unit:"%"}:{unit:"%",x:t.x?t.x/e*100:0,y:t.y?t.y/n*100:0,width:t.width?t.width/e*100:0,height:t.height?t.height/n*100:0}}function u(t,e,n){return t.unit?"px"===t.unit?{...a,...t,unit:"px"}:{unit:"px",x:t.x?t.x*e/100:0,y:t.y?t.y*n/100:0,width:t.width?t.width*e/100:0,height:t.height?t.height*n/100:0}:{...a,...t,unit:"px"}}function d(t,e,n,o,r,a=0,i=0,c=o,l=r){const h={...t};let s=Math.min(a,o),u=Math.min(i,r),d=Math.min(c,o),p=Math.min(l,r);e&&(e>1?(s=i?i*e:s,u=s/e,d=c*e):(u=a?a/e:u,s=u*e,p=l/e)),h.y<0&&(h.height=Math.max(h.height+h.y,u),h.y=0),h.x<0&&(h.width=Math.max(h.width+h.x,s),h.x=0);const g=o-(h.x+h.width);g<0&&(h.x=Math.min(h.x,o-s),h.width+=g);const m=r-(h.y+h.height);if(m<0&&(h.y=Math.min(h.y,r-u),h.height+=m),h.width<s&&("sw"!==n&&"nw"!=n||(h.x-=s-h.width),h.width=s),h.height<u&&("nw"!==n&&"ne"!=n||(h.y-=u-h.height),h.height=u),h.width>d&&("sw"!==n&&"nw"!=n||(h.x-=d-h.width),h.width=d),h.height>p&&("nw"!==n&&"ne"!=n||(h.y-=p-h.height),h.height=p),e){const t=h.width/h.height;if(t<e){const t=Math.max(h.width/e,u);"nw"!==n&&"ne"!=n||(h.y-=t-h.height),h.height=t}else if(t>e){const t=Math.max(h.height*e,s);"sw"!==n&&"nw"!=n||(h.x-=t-h.width),h.width=t}}return h}function p(t,e,n,o){const r={...t};return"ArrowLeft"===e?"nw"===o?(r.x-=n,r.y-=n,r.width+=n,r.height+=n):"w"===o?(r.x-=n,r.width+=n):"sw"===o?(r.x-=n,r.width+=n,r.height+=n):"ne"===o?(r.y+=n,r.width-=n,r.height-=n):"e"===o?r.width-=n:"se"===o&&(r.width-=n,r.height-=n):"ArrowRight"===e&&("nw"===o?(r.x+=n,r.y+=n,r.width-=n,r.height-=n):"w"===o?(r.x+=n,r.width-=n):"sw"===o?(r.x+=n,r.width-=n,r.height-=n):"ne"===o?(r.y-=n,r.width+=n,r.height+=n):"e"===o?r.width+=n:"se"===o&&(r.width+=n,r.height+=n)),"ArrowUp"===e?"nw"===o?(r.x-=n,r.y-=n,r.width+=n,r.height+=n):"n"===o?(r.y-=n,r.height+=n):"ne"===o?(r.y-=n,r.width+=n,r.height+=n):"sw"===o?(r.x+=n,r.width-=n,r.height-=n):"s"===o?r.height-=n:"se"===o&&(r.width-=n,r.height-=n):"ArrowDown"===e&&("nw"===o?(r.x+=n,r.y+=n,r.width-=n,r.height-=n):"n"===o?(r.y+=n,r.height-=n):"ne"===o?(r.y+=n,r.width-=n,r.height-=n):"sw"===o?(r.x-=n,r.width+=n,r.height+=n):"s"===o?r.height+=n:"se"===o&&(r.width+=n,r.height+=n)),r}const g={capture:!0,passive:!1};class m extends t.PureComponent{constructor(){super(...arguments),this.docMoveBound=!1,this.mouseDownOnCrop=!1,this.dragStarted=!1,this.evData={startClientX:0,startClientY:0,startCropX:0,startCropY:0,clientX:0,clientY:0,isResize:!0},this.componentRef=(0,t.createRef)(),this.mediaRef=(0,t.createRef)(),this.initChangeCalled=!1,this.state={cropIsActive:!1,newCropIsBeingDrawn:!1},this.onCropPointerDown=t=>{const{crop:e,disabled:n}=this.props,o=this.getBox();if(!e)return;const r=u(e,o.width,o.height);if(n)return;t.cancelable&&t.preventDefault(),this.bindDocMove(),this.componentRef.current.focus({preventScroll:!0});const a=t.target.dataset.ord,i=Boolean(a);let c=t.clientX,l=t.clientY,h=r.x,s=r.y;if(a){const e=t.clientX-o.x,n=t.clientY-o.y;let i=0,u=0;"ne"===a||"e"==a?(i=e-(r.x+r.width),u=n-r.y,h=r.x,s=r.y+r.height):"se"===a||"s"===a?(i=e-(r.x+r.width),u=n-(r.y+r.height),h=r.x,s=r.y):"sw"===a||"w"==a?(i=e-r.x,u=n-(r.y+r.height),h=r.x+r.width,s=r.y):"nw"!==a&&"n"!=a||(i=e-r.x,u=n-r.y,h=r.x+r.width,s=r.y+r.height),c=h+o.x+i,l=s+o.y+u}this.evData={startClientX:c,startClientY:l,startCropX:h,startCropY:s,clientX:t.clientX,clientY:t.clientY,isResize:i,ord:a},this.mouseDownOnCrop=!0,this.setState({cropIsActive:!0})},this.onComponentPointerDown=t=>{const{crop:e,disabled:n,locked:o,keepSelection:r,onChange:a}=this.props,i=this.getBox();if(n||o||r&&e)return;t.cancelable&&t.preventDefault(),this.bindDocMove(),this.componentRef.current.focus({preventScroll:!0});const c=t.clientX-i.x,l=t.clientY-i.y,h={unit:"px",x:c,y:l,width:0,height:0};this.evData={startClientX:t.clientX,startClientY:t.clientY,startCropX:c,startCropY:l,clientX:t.clientX,clientY:t.clientY,isResize:!0},this.mouseDownOnCrop=!0,a(u(h,i.width,i.height),s(h,i.width,i.height)),this.setState({cropIsActive:!0,newCropIsBeingDrawn:!0})},this.onDocPointerMove=t=>{const{crop:e,disabled:n,onChange:o,onDragStart:r}=this.props,a=this.getBox();if(n||!e||!this.mouseDownOnCrop)return;t.cancelable&&t.preventDefault(),this.dragStarted||(this.dragStarted=!0,r&&r(t));const{evData:i}=this;let l;i.clientX=t.clientX,i.clientY=t.clientY,l=i.isResize?this.resizeCrop():this.dragCrop(),c(e,l)||o(u(l,a.width,a.height),s(l,a.width,a.height))},this.onComponentKeyDown=t=>{const{crop:e,disabled:n,onChange:o,onComplete:r}=this.props,a=this.getBox();if(n)return;const c=t.key;let l=!1;if(!e)return;const h=this.makePixelCrop(),d=(navigator.platform.match("Mac")?t.metaKey:t.ctrlKey)?m.nudgeStepLarge:t.shiftKey?m.nudgeStepMedium:m.nudgeStep;if("ArrowLeft"===c?(h.x-=d,l=!0):"ArrowRight"===c?(h.x+=d,l=!0):"ArrowUp"===c?(h.y-=d,l=!0):"ArrowDown"===c&&(h.y+=d,l=!0),l){t.cancelable&&t.preventDefault(),h.x=i(h.x,0,a.width-h.width),h.y=i(h.y,0,a.height-h.height);const e=u(h,a.width,a.height),n=s(h,a.width,a.height);o(e,n),r&&r(e,n)}},this.onHandlerKeyDown=(t,e)=>{const{aspect:n=0,crop:o,disabled:r,minWidth:a=0,minHeight:i=0,maxWidth:l,maxHeight:h,onChange:g,onComplete:f}=this.props,w=this.getBox();if(r||!o)return;if("ArrowUp"!==t.key&&"ArrowDown"!==t.key&&"ArrowLeft"!==t.key&&"ArrowRight"!==t.key)return;t.stopPropagation(),t.preventDefault();const y=(navigator.platform.match("Mac")?t.metaKey:t.ctrlKey)?m.nudgeStepLarge:t.shiftKey?m.nudgeStepMedium:m.nudgeStep,v=d(p(u(o,w.width,w.height),t.key,y,e),n,e,w.width,w.height,a,i,l,h);if(!c(o,v)){const t=s(v,w.width,w.height);g(v,t),f&&f(v,t)}},this.onDocPointerDone=t=>{const{crop:e,disabled:n,onComplete:o,onDragEnd:r}=this.props,a=this.getBox();this.unbindDocMove(),!n&&e&&this.mouseDownOnCrop&&(this.mouseDownOnCrop=!1,this.dragStarted=!1,r&&r(t),o&&o(u(e,a.width,a.height),s(e,a.width,a.height)),this.setState({cropIsActive:!1,newCropIsBeingDrawn:!1}))},this.onDragFocus=t=>{var e;null===(e=this.componentRef.current)||void 0===e||e.scrollTo(0,0)}}get document(){return document}getBox(){const t=this.mediaRef.current;if(!t)return{x:0,y:0,width:0,height:0};const{x:e,y:n,width:o,height:r}=t.getBoundingClientRect();return{x:e,y:n,width:o,height:r}}componentDidUpdate(t){const{crop:e,onComplete:n}=this.props;if(n&&!t.crop&&e){const{width:t,height:o}=this.getBox();t&&o&&n(u(e,t,o),s(e,t,o))}}componentWillUnmount(){this.resizeObserver&&this.resizeObserver.disconnect()}bindDocMove(){this.docMoveBound||(this.document.addEventListener("pointermove",this.onDocPointerMove,g),this.document.addEventListener("pointerup",this.onDocPointerDone,g),this.document.addEventListener("pointercancel",this.onDocPointerDone,g),this.docMoveBound=!0)}unbindDocMove(){this.docMoveBound&&(this.document.removeEventListener("pointermove",this.onDocPointerMove,g),this.document.removeEventListener("pointerup",this.onDocPointerDone,g),this.document.removeEventListener("pointercancel",this.onDocPointerDone,g),this.docMoveBound=!1)}getCropStyle(){const{crop:t}=this.props;if(t)return{top:`${t.y}${t.unit}`,left:`${t.x}${t.unit}`,width:`${t.width}${t.unit}`,height:`${t.height}${t.unit}`}}dragCrop(){const{evData:t}=this,e=this.getBox(),n=this.makePixelCrop(),o=t.clientX-t.startClientX,r=t.clientY-t.startClientY;return n.x=i(t.startCropX+o,0,e.width-n.width),n.y=i(t.startCropY+r,0,e.height-n.height),n}getPointRegion(t){const{evData:e}=this,n=e.clientX-t.x,o=e.clientY-t.y<e.startCropY;return n<e.startCropX?o?"nw":"sw":o?"ne":"se"}resizeCrop(){const{evData:t}=this,e=this.getBox(),{aspect:n=0,minWidth:o=0,minHeight:r=0,maxWidth:a,maxHeight:i}=this.props,c=this.getPointRegion(e),l=this.makePixelCrop(),h=t.ord?t.ord:c,s=t.clientX-t.startClientX,u=t.clientY-t.startClientY,p={unit:"px",x:0,y:0,width:0,height:0};"ne"===c?(p.x=t.startCropX,p.width=s,n?(p.height=p.width/n,p.y=t.startCropY-p.height):(p.height=Math.abs(u),p.y=t.startCropY-p.height)):"se"===c?(p.x=t.startCropX,p.y=t.startCropY,p.width=s,p.height=n?p.width/n:u):"sw"===c?(p.x=t.startCropX+s,p.y=t.startCropY,p.width=Math.abs(s),p.height=n?p.width/n:u):"nw"===c&&(p.x=t.startCropX+s,p.width=Math.abs(s),n?(p.height=p.width/n,p.y=t.startCropY-p.height):(p.height=Math.abs(u),p.y=t.startCropY+u));const g=d(p,n,c,e.width,e.height,o,r,a,i);return n||m.xyOrds.indexOf(h)>-1?(l.x=g.x,l.y=g.y,l.width=g.width,l.height=g.height):m.xOrds.indexOf(h)>-1?(l.x=g.x,l.width=g.width):m.yOrds.indexOf(h)>-1&&(l.y=g.y,l.height=g.height),l}createCropSelection(){const{ariaLabels:t=m.defaultProps.ariaLabels,disabled:n,locked:o,renderSelectionAddon:r,ruleOfThirds:a,crop:i}=this.props,c=this.getCropStyle();if(i)return e().createElement("div",{style:c,className:"ReactCrop__crop-selection",onPointerDown:this.onCropPointerDown,"aria-label":t.cropArea,tabIndex:0,onKeyDown:this.onComponentKeyDown,role:"group"},!n&&!o&&e().createElement("div",{className:"ReactCrop__drag-elements",onFocus:this.onDragFocus},e().createElement("div",{className:"ReactCrop__drag-bar ord-n","data-ord":"n"}),e().createElement("div",{className:"ReactCrop__drag-bar ord-e","data-ord":"e"}),e().createElement("div",{className:"ReactCrop__drag-bar ord-s","data-ord":"s"}),e().createElement("div",{className:"ReactCrop__drag-bar ord-w","data-ord":"w"}),e().createElement("div",{className:"ReactCrop__drag-handle ord-nw","data-ord":"nw",tabIndex:0,"aria-label":t.nwDragHandle,onKeyDown:t=>this.onHandlerKeyDown(t,"nw"),role:"button"}),e().createElement("div",{className:"ReactCrop__drag-handle ord-n","data-ord":"n",tabIndex:0,"aria-label":t.nDragHandle,onKeyDown:t=>this.onHandlerKeyDown(t,"n"),role:"button"}),e().createElement("div",{className:"ReactCrop__drag-handle ord-ne","data-ord":"ne",tabIndex:0,"aria-label":t.neDragHandle,onKeyDown:t=>this.onHandlerKeyDown(t,"ne"),role:"button"}),e().createElement("div",{className:"ReactCrop__drag-handle ord-e","data-ord":"e",tabIndex:0,"aria-label":t.eDragHandle,onKeyDown:t=>this.onHandlerKeyDown(t,"e"),role:"button"}),e().createElement("div",{className:"ReactCrop__drag-handle ord-se","data-ord":"se",tabIndex:0,"aria-label":t.seDragHandle,onKeyDown:t=>this.onHandlerKeyDown(t,"se"),role:"button"}),e().createElement("div",{className:"ReactCrop__drag-handle ord-s","data-ord":"s",tabIndex:0,"aria-label":t.sDragHandle,onKeyDown:t=>this.onHandlerKeyDown(t,"s"),role:"button"}),e().createElement("div",{className:"ReactCrop__drag-handle ord-sw","data-ord":"sw",tabIndex:0,"aria-label":t.swDragHandle,onKeyDown:t=>this.onHandlerKeyDown(t,"sw"),role:"button"}),e().createElement("div",{className:"ReactCrop__drag-handle ord-w","data-ord":"w",tabIndex:0,"aria-label":t.wDragHandle,onKeyDown:t=>this.onHandlerKeyDown(t,"w"),role:"button"})),r&&e().createElement("div",{className:"ReactCrop__selection-addon",onMouseDown:t=>t.stopPropagation()},r(this.state)),a&&e().createElement(e().Fragment,null,e().createElement("div",{className:"ReactCrop__rule-of-thirds-hz"}),e().createElement("div",{className:"ReactCrop__rule-of-thirds-vt"})))}makePixelCrop(){const t={...a,...this.props.crop||{}},e=this.getBox();return u(t,e.width,e.height)}render(){const{aspect:t,children:o,circularCrop:r,className:a,crop:i,disabled:c,locked:l,style:h,ruleOfThirds:s}=this.props,{cropIsActive:u,newCropIsBeingDrawn:d}=this.state,p=i?this.createCropSelection():null,g=function(){for(var t,e,o=0,r="";o<arguments.length;)(t=arguments[o++])&&(e=n(t))&&(r&&(r+=" "),r+=e);return r}("ReactCrop",a,{"ReactCrop--active":u,"ReactCrop--disabled":c,"ReactCrop--locked":l,"ReactCrop--new-crop":d,"ReactCrop--fixed-aspect":i&&t,"ReactCrop--circular-crop":i&&r,"ReactCrop--rule-of-thirds":i&&s,"ReactCrop--invisible-crop":!this.dragStarted&&i&&!i.width&&!i.height});return e().createElement("div",{ref:this.componentRef,className:g,style:h},e().createElement("div",{ref:this.mediaRef,className:"ReactCrop__child-wrapper",onPointerDown:this.onComponentPointerDown},o),p)}}m.xOrds=["e","w"],m.yOrds=["n","s"],m.xyOrds=["nw","ne","se","sw"],m.nudgeStep=1,m.nudgeStepMedium=10,m.nudgeStepLarge=100,m.defaultProps={ariaLabels:{cropArea:"Use the arrow keys to move the crop selection area",nwDragHandle:"Use the arrow keys to move the north west drag handle to change the crop selection area",nDragHandle:"Use the up and down arrow keys to move the north drag handle to change the crop selection area",neDragHandle:"Use the arrow keys to move the north east drag handle to change the crop selection area",eDragHandle:"Use the up and down arrow keys to move the east drag handle to change the crop selection area",seDragHandle:"Use the arrow keys to move the south east drag handle to change the crop selection area",sDragHandle:"Use the up and down arrow keys to move the south drag handle to change the crop selection area",swDragHandle:"Use the arrow keys to move the south west drag handle to change the crop selection area",wDragHandle:"Use the up and down arrow keys to move the west drag handle to change the crop selection area"}}})(),r})(),t.exports=o(n(9196))}}]);
//# sourceMappingURL=CropScreen.0.0.2.js.map