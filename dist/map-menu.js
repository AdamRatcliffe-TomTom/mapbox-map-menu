!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.mapmenu=t():e.mapmenu=t()}(self,(()=>(()=>{"use strict";var e={d:(t,i)=>{for(var n in i)e.o(i,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:i[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{Menu:()=>n,MenuItem:()=>i});const i=class{constructor({label:e,onClick:t}){this.label=e,this.onClick=t,this.element=document.createElement("div"),this.element.classList.add("map-menu-item"),this.element.textContent=e,"function"==typeof this.onClick&&this.element.addEventListener("click",t)}remove(){this.element&&this.element.parentElement&&this.element.parentElement.removeChild(this.element)}},n=class{constructor({title:e="",width:t=240}={}){this.width=t,this.title=e,this.items=[],this.render()}render(){this.container=document.createElement("div"),this.container.style.width=`${this.width}px`,this.container.className="mapboxgl-ctrl map-menu",this.title&&this.renderTitle(),this.itemContainer=document.createElement("div"),this.itemContainer.className="mapbox-map-menu-items",this.container.appendChild(this.itemContainer)}renderTitle(){const e=document.createElement("div");e.textContent=this.title,e.classList.add("map-menu-title"),this.container.appendChild(e)}addItem(e){e instanceof i&&(this.items.push(e),this.itemContainer.appendChild(e.element))}getItems(){return this.items}onAdd(e){return this.map=e,this.container}onRemove(){this.container.parentNode.removeChild(this.container),this.map=void 0}getDefaultPosition(){return"top-right"}};return t})()));