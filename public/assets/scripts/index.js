(()=>{var t={351:()=>{class t{constructor(t,n,a){this.url=t,this.img=new Image(e.сanvasElement.width,e.сanvasElement.height),this.img.src=t,this.x=n,this.y=a,e.objectsForDrawing.push(this)}}var e={maxLineWidth:19,templatesBlock:document.getElementById("templates"),fileInput:document.getElementById("files"),topTextField:document.getElementById("text1"),bottomTextField:document.getElementById("text2"),сanvasElement:document.getElementById("canvas"),context:document.getElementById("canvas").getContext("2d"),objectsForDrawing:[],uploadFile:function(n){const a=n.target.files[0];let o=new FileReader;o.onload=()=>{new t(o.result,0,0),e.drawScene()},o.readAsDataURL(a)},updateCaptionsFontSize:function(t){this.context.font=48-6*t.length+"px ImpactRegular",this.maxLineWidth=18+6*t.length},drawCaptions:function(t,n){const a={x:e.сanvasElement.width/2,y:60},o={x:e.сanvasElement.width/2,y:e.сanvasElement.height-30},i=t=>{this.context.strokeText(t,0,0),this.context.fillText(t,0,0)},s=t=>{let n=[""],a=0;return t.forEach((t=>{(n[a]+t).length<e.maxLineWidth?n[a]+=` ${t}`:(n.push(t),a++)})),n},l=t.split(" "),r=n.split(" ");let c=s(l),d=s(r);const h=60-6*c.length;this.context.save(),this.context.translate(a.x,a.y),c.forEach((t=>{t&&(i(t),this.context.translate(0,h))})),this.context.restore(),this.context.save(),this.context.translate(o.x,o.y-d.length*h+h),d.forEach((t=>{t&&(i(t),this.context.translate(0,h))})),this.context.restore(),this.updateCaptionsFontSize(c)},drawScene:function(){this.context.clearRect(0,0,this.сanvasElement.width,this.сanvasElement.height),this.objectsForDrawing.forEach((t=>{this.context.drawImage(t.img,t.x,t.y,500,500)})),e.drawCaptions(e.topTextField.value.toUpperCase(),e.bottomTextField.value.toUpperCase())}};e.context.fillStyle="#fff",e.context.lineWidth=10,e.context.lineJoin="round",e.context.strokeStyle="#000",e.context.textAlign="center",e.context.save(),new t("https://placehold.jp/500x500.png",0,0),Array.prototype.slice.call(e.templatesBlock.getElementsByTagName("img")).forEach((n=>{n.addEventListener("click",(()=>{new t(n.src,0,0),e.drawScene()}),!0)})),e.fileInput.addEventListener("change",e.uploadFile,!1),e.topTextField.addEventListener("input",(()=>e.drawScene()),!1),e.bottomTextField.addEventListener("input",(()=>e.drawScene()),!1)}},e={};function n(a){var o=e[a];if(void 0!==o)return o.exports;var i=e[a]={exports:{}};return t[a](i,i.exports,n),i.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var a in e)n.o(e,a)&&!n.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";n(351)})()})();