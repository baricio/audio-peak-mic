var webAudioPeakMeter=function(e){"use strict";const t={vertical:!1,borderSize:2,fontSize:9,backgroundColor:"black",tickColor:"#ddd",labelColor:"#ddd",gradient:["red 1%","#ff0 16%","lime 45%","#080 100%"],dbRangeMin:-48,dbRangeMax:0,dbTickSize:6,maskTransition:"0.1s",audioMeterStandard:"peak-sample",peakHoldDuration:0};function s(e){return 20*(t=10,s=e,Math.log(s)/Math.log(t));var t,s}const i=1.5;function n(e,t){const{dbRangeMin:s,dbRangeMax:n,dbTickSize:o,fontSize:a,borderSize:r,tickColor:l,vertical:h}=t,c=function(e,t,s){const i=[];for(let n=Math.floor(e)+1;n<=t;n+=1)n%s==0&&i.push(n);return i}(s,n,o),p=document.createElement("div");p.style.position="relative",h?(p.style.height=`calc(100% - ${a*i}px)`,p.style.width=2*a+"px",p.style.marginTop=a*i+"px"):(p.style.height=1.5*a+"px",p.style.width=`calc(100% - ${3*a}px)`,p.style.marginRight=3*a+"px"),e.appendChild(p);return c.map((e=>{const t=document.createElement("div");p.appendChild(t),t.style.position="absolute",t.style.color=l,t.style.fontSize=`${a}px`,t.textContent=e.toString();const i=(n-e)/(n-s)*100;return h?(t.style.top=`calc(${i}% - ${a/2}px)`,t.style.right=`${r}px`,t.style.textAlign="right"):(t.style.right=`${i}%`,t.style.transform="translateX(50%)"),t}))}return e.WebAudioPeakMeter=class{constructor(e,s,o={}){this.srcNode=e,this.config=Object.assign(Object.assign({},t),o),this.channelCount=e.channelCount,this.tempPeaks=new Array(this.channelCount).fill(0),this.heldPeaks=new Array(this.channelCount).fill(0),this.peakHoldTimeouts=new Array(this.channelCount).fill(0),s&&(this.parent=function(e,t){const{backgroundColor:s,borderSize:i,vertical:n}=t,o=document.createElement("div");return o.style.backgroundColor=s,o.style.boxSizing="border-box",o.style.height="100%",o.style.padding=`${i}px`,n&&(o.style.display="flex",o.style.flexDirection="row-reverse"),e.appendChild(o),o}(s,this.config),this.channelElements=function(e,t,s){const{fontSize:i,vertical:n,borderSize:o}=t,a=document.createElement("div");a.style.display="flex",a.style.justifyContent="space-between",n?(a.style.height="100%",a.style.width=`calc(100% - ${2*i}px)`):(a.style.height=`calc(100% - ${1.5*i}px)`,a.style.width="100%",a.style.flexDirection="column"),e.appendChild(a);const r=(s-1)*o;return Array.from(Array(s).keys()).map((()=>{const e=document.createElement("div");return n?(e.style.height="100%",e.style.width=`calc((100% - ${r}px) / ${s})`):(e.style.display="flex",e.style.height=`calc((100% - ${r}px) / ${s})`,e.style.width="100%",e.style.flexDirection="row-reverse"),a.appendChild(e),e}))}(this.parent,this.config,this.channelCount),this.peakLabels=function(e,t){const{labelColor:s,fontSize:n,vertical:o}=t;return e.map((e=>{const t=document.createElement("div");return t.style.color=s,t.style.fontSize=`${n}px`,t.textContent="-∞",o?(t.style.height=n*i+"px",t.style.width="100%",t.style.textAlign="center"):(t.style.width=3*n+"px",t.style.display="flex",t.style.justifyContent="center",t.style.alignItems="center"),e.appendChild(t),t}))}(this.channelElements,this.config),this.bars=function(e,t){const{gradient:s,vertical:n,fontSize:o,maskTransition:a}=t;return e.map((e=>{const t=document.createElement("div");return t.style.transition=`clip-path ${a}`,n?(t.style.height=`calc(100% - ${o*i}px)`,t.style.width="100%",t.style.backgroundImage=`linear-gradient(to bottom, ${s.join(", ")})`):(t.style.height="100%",t.style.width=`calc(100% - ${3*o}px)`,t.style.backgroundImage=`linear-gradient(to left, ${s.join(", ")})`),e.appendChild(t),t}))}(this.channelElements,this.config),this.ticks=n(this.parent,this.config),this.parent.addEventListener("click",this.clearPeaks.bind(this)),this.paintMeter()),this.initNode()}async initNode(){const{audioMeterStandard:e}=this.config;try{this.node=new AudioWorkletNode(this.srcNode.context,`${e}-processor`,{parameterData:{}})}catch(t){const s=new Blob(["true-peak"===e?'function s(s,t,e){const o=[];for(let r=0;r<e;r+=1){let i=0,n=0;for(let o=r;o<t.length;o+=e)n+=t[o]*s[s.length-1-i],i+=1;o.push(n)}return o}class t extends AudioWorkletProcessor{constructor(){super(),this.numCoefficients=33,this.sampleRate=sampleRate,this.upsampleFactor=this.sampleRate>8e4?2:4,this.lpfCoefficients=function(s,t){const e=[],o=1/(4*t),r=1-Math.ceil(s/2),i=Math.floor(s/2);for(let n=r;n<=i;n++){const r=.54+.46*Math.cos(2*Math.PI*n/s);let i=0;i=0==n?2*o:Math.sin(2*Math.PI*o*n)/(Math.PI*n),i=r*i*t,e.push(i)}return e}(this.numCoefficients,this.upsampleFactor),this.lpfBuffers=[],this.port.postMessage({type:"message",message:`true peak inited? ${this.sampleRate}`}),this.processCount=0}process(t){const e=t[0];if(e.length>this.lpfBuffers.length)for(let s=1;s<=e.length;s+=1)s>this.lpfBuffers.length&&this.lpfBuffers.push(new Array(this.numCoefficients).fill(0));const o=function(t,e,o,r){return t.map(((t,i)=>{const n=e[i];let h=0;for(let e=0;e<t.length;e++){const i=t[e];n.push(i),n.shift();const a=s(n,o,r);for(let s=0;s<a.length;s++){const t=Math.abs(a[s]);t>h&&(h=t)}}return h}))}(e,this.lpfBuffers,this.lpfCoefficients,this.upsampleFactor);return this.port.postMessage({type:"peaks",peaks:o}),this.processCount%100==0&&this.port.postMessage({type:"message",message:this.lpfBuffers}),this.processCount+=1,!0}}try{registerProcessor("true-peak-processor",t)}catch(s){console.info("Failed to register true-peak-processor. This probably means it was already registered.")}\n':'class e extends AudioWorkletProcessor{process(e){const s=function(e){return e.map((e=>{let s=0;for(let r=0;r<e.length;r++){const t=Math.abs(e[r]);t>s&&(s=t)}return s}))}(e[0]);return this.port.postMessage({type:"peaks",peaks:s}),!0}}try{registerProcessor("peak-sample-processor",e)}catch(e){console.info("Failed to register peak-sample-processor. This probably means it was already registered.")}\n'],{type:"application/javascript"}),i=URL.createObjectURL(s);await this.srcNode.context.audioWorklet.addModule(i),this.node=new AudioWorkletNode(this.srcNode.context,`${e}-processor`,{parameterData:{}})}this.node.port.onmessage=e=>this.handleNodePortMessage(e),this.srcNode.connect(this.node).connect(this.srcNode.context.destination)}handleNodePortMessage(e){if("message"===e.data.type&&console.log(e.data.message),"peaks"===e.data.type){const{peaks:t}=e.data;for(let e=0;e<this.tempPeaks.length;e+=1)t.length>e?this.tempPeaks[e]=t[e]:this.tempPeaks[e]=0;t.length<this.channelCount&&this.tempPeaks.fill(0,t.length);for(let e=0;e<t.length;e+=1)t[e]>this.heldPeaks[e]&&(this.heldPeaks[e]=t[e],this.peakHoldTimeouts[e]&&clearTimeout(this.peakHoldTimeouts[e]),this.config.peakHoldDuration&&(this.peakHoldTimeouts[e]=window.setTimeout((()=>{this.clearPeak(e)}),this.config.peakHoldDuration)))}}paintMeter(){const{dbRangeMin:e,dbRangeMax:t,vertical:i}=this.config;this.bars&&this.bars.forEach(((n,o)=>{const a=function(e,t,s,i){let n=Math.floor(100*(s-e)/(s-t));return n>100&&(n=100),n<0&&(n=0),i?`inset(${n}% 0 0)`:`inset(0 ${n}% 0 0)`}(s(this.tempPeaks[o]),e,t,i);n.style.clipPath=a})),this.peakLabels&&this.peakLabels.forEach(((e,t)=>{if(0===this.heldPeaks[t])e.textContent="-∞";else{const i=s(this.heldPeaks[t]);e.textContent=i.toFixed(1)}})),this.animationRequestId=window.requestAnimationFrame(this.paintMeter.bind(this))}clearPeak(e){this.heldPeaks[e]=this.tempPeaks[e]}clearPeaks(){for(let e=0;e<this.heldPeaks.length;e+=1)this.clearPeak(e)}getPeaks(){return{current:this.tempPeaks,maxes:this.heldPeaks,currentDB:this.tempPeaks.map(s),maxesDB:this.heldPeaks.map(s)}}cleanup(){this.node&&this.node.disconnect(),this.parent&&(this.parent.removeEventListener("click",this.clearPeaks.bind(this)),void 0!==this.animationRequestId&&window.cancelAnimationFrame(this.animationRequestId),this.parent.remove())}},Object.defineProperty(e,"__esModule",{value:!0}),e}({});
//# sourceMappingURL=peak-meter.js.map