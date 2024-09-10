var u=(t,i,e)=>{if(!i.has(t))throw TypeError("Cannot "+e)};var n=(t,i,e)=>(u(t,i,"read from private field"),e?e.call(t):i.get(t)),m=(t,i,e)=>{if(i.has(t))throw TypeError("Cannot add the same private member more than once");i instanceof WeakSet?i.add(t):i.set(t,e)},r=(t,i,e,c)=>(u(t,i,"write to private field"),c?c.call(t,e):i.set(t,e),e);var f=(t,i,e)=>(u(t,i,"access private method"),e);import{B as y}from"./Base.LSgLRpFA.js";import{h as A}from"./handleDefaultAttrIsTrue.C-TnTdkH.js";const v=`
.ea-timeline-item_wrap {
  position: relative;
  padding-bottom: 20px;
  padding-left: 28px;
  list-style: none;
}
.ea-timeline-item_wrap .ea-timeline-item_circle {
  position: absolute;
  left: 0;
  z-index: 1;
  display: block;
  width: 12px;
  height: 12px;
  font-size: 12px;
  border-radius: 50%;
  background-color: #e4e7ed;
}
.ea-timeline-item_wrap .ea-timeline-item_circle.ea-timeline-item--primary {
  background-color: #409eff;
  color: #409eff;
}
.ea-timeline-item_wrap .ea-timeline-item_circle.ea-timeline-item--success {
  background-color: #67c23a;
  color: #67c23a;
}
.ea-timeline-item_wrap .ea-timeline-item_circle.ea-timeline-item--warning {
  background-color: #e6a23c;
  color: #e6a23c;
}
.ea-timeline-item_wrap .ea-timeline-item_circle.ea-timeline-item--danger {
  background-color: #f56c6c;
  color: #f56c6c;
}
.ea-timeline-item_wrap .ea-timeline-item_circle.ea-timeline-item--info {
  background-color: #e4e7ed;
  color: #e4e7ed;
}
.ea-timeline-item_wrap .ea-timeline-item_tail {
  z-index: 0;
  position: absolute;
  left: 0.3281rem;
  height: 100%;
  border-left: 2px solid #e4e7ed;
}
.ea-timeline-item_wrap .ea-timeline-item_container {
  position: relative;
  top: -4px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
}
.ea-timeline-item_wrap .ea-timeline-item_container .ea-timeline-item_timestamp {
  color: #909399;
  line-height: 1;
  margin-top: 8px;
}
.ea-timeline-item_wrap .ea-timeline-item_container .ea-timeline-item_content {
  color: #303133;
}
.ea-timeline-item_wrap .ea-timeline-item_container.ea-timeline-item_timestamp--top {
  flex-direction: column-reverse;
}
.ea-timeline-item_wrap .ea-timeline-item_container.ea-timeline-item_timestamp--top .ea-timeline-item_timestamp {
  margin-top: 0;
  margin-bottom: 8px;
}
.ea-timeline-item_wrap .ea-timeline-item_container.ea-timeline-item_timestamp--bottom {
  flex-direction: column;
}
.ea-timeline-item_wrap.ea-timeline-item_circle--large .ea-timeline-item_circle {
  width: 14px;
  height: 14px;
}
.ea-timeline-item_wrap.ea-timeline-item_circle--large .ea-timeline-item_tail {
  left: 0.3906rem;
}
.ea-timeline-item_wrap.ea-timeline-item_circle--large .ea-timeline-item_container {
  font-size: 16px;
}
`;var l,s,a,o;class z extends y{constructor(){super();m(this,l,void 0);m(this,s,void 0);m(this,a,void 0);m(this,o,void 0);const e=this.attachShadow({mode:"open"});e.innerHTML=`
            <div class='ea-timeline-item_wrap' part='container'>
                <div class='ea-timeline-item_circle' part='circle'></div>
                <div class='ea-timeline-item_tail' part='tail'></div>
                <div class='ea-timeline-item_container' part='body'>
                    <div class='ea-timeline-item_content' part='content'>
                        <slot></slot>
                    </div>
                    <div class='ea-timeline-item_timestamp' part='timestamp'></div>
                </div>
            </div>
        `,r(this,l,e.querySelector(".ea-timeline-item_wrap")),r(this,s,e.querySelector(".ea-timeline-item_timestamp")),r(this,a,e.querySelector(".ea-timeline-item_circle")),r(this,o,e.querySelector(".ea-timeline-item_timestamp")),this.build(e,v)}get time(){return this.getAttribute("time")||""}set time(e){e&&(this.setAttribute("time",e),n(this,o).innerText=e)}get typeList(){return["primary","success","warning","danger","info"]}get type(){const e=this.getAttribute("type");return this.typeList.includes(e)?e:"info"}set type(e){this.setAttribute("type",e),n(this,a).classList.add(`ea-timeline-item--${e}`)}get color(){return this.getAttribute("color")||""}set color(e){if(!e)return;this.setAttribute("color",e),(new Option().style.color=e)!==""&&(n(this,a).style.backgroundColor=e)}get sizeList(){return["normal","large"]}get size(){const e=this.getAttribute("size");return this.sizeList.includes(e)?e:"normal"}set size(e){this.setAttribute("size",e),n(this,l).classList.add(`ea-timeline-item_circle--${e}`)}get placementList(){return["top","bottom"]}get placement(){const e=this.getAttribute("placement");return this.placementList.includes(e)?e:"bottom"}set placement(e){this.setAttribute("placement",e),n(this,s).classList.add(`ea-timeline-item_timestamp--${e}`)}connectedCallback(){this.time=this.time,this.type=this.type,this.color=this.color,this.size=this.size,this.placement=this.placement}}l=new WeakMap,s=new WeakMap,a=new WeakMap,o=new WeakMap;customElements.get("ea-timeline-item")||customElements.define("ea-timeline-item",z);const L=`

`;var p,d,h,x;class k extends y{constructor(){super();m(this,h);m(this,p,void 0);m(this,d,void 0);const e=this.attachShadow({mode:"open"});e.innerHTML=`
      <div class='ea-timeline_wrap' part='container'>
        <ul class='ea-timeline-item_container' part='list-wrap'>
          <slot></slot>
        </ul>
      </div>
    `,r(this,p,e.querySelector(".ea-timeline_wrap")),r(this,d,e.querySelector(".ea-timeline-item_container")),this.build(e,L)}get reverse(){const e=this.getAttribute("reverse");return A(e)}set reverse(e){this.setAttribute("reverse",e),f(this,h,x).call(this,e)}connectedCallback(){this.reverse=this.reverse}}p=new WeakMap,d=new WeakMap,h=new WeakSet,x=function(e){e=e==="true"||e===!0,Array.from(this.querySelectorAll("ea-timeline-item")).sort((_,g)=>{const b=new Date(_.time),w=new Date(g.time);return e?w-b:b-w}).forEach((_,g)=>{this.appendChild(_)})};customElements.get("ea-timeline")||customElements.define("ea-timeline",k);export{k as EaTimeline};
