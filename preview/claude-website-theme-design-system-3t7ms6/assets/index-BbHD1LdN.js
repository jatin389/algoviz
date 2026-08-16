var jc=Object.defineProperty;var Ic=(t,e,n)=>e in t?jc(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var Zt=(t,e,n)=>Ic(t,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(o){if(o.ep)return;o.ep=!0;const a=n(o);fetch(o.href,a)}})();/**
* @vue/shared v3.5.40
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function lr(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const Ae={},ss=[],Wt=()=>{},gl=()=>!1,Lo=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),No=t=>t.startsWith("onUpdate:"),et=Object.assign,ur=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},Dc=Object.prototype.hasOwnProperty,_e=(t,e)=>Dc.call(t,e),ge=Array.isArray,os=t=>Gs(t)==="[object Map]",Po=t=>Gs(t)==="[object Set]",Fr=t=>Gs(t)==="[object Date]",xe=t=>typeof t=="function",He=t=>typeof t=="string",Lt=t=>typeof t=="symbol",je=t=>t!==null&&typeof t=="object",bl=t=>(je(t)||xe(t))&&xe(t.then)&&xe(t.catch),vl=Object.prototype.toString,Gs=t=>vl.call(t),Lc=t=>Gs(t).slice(8,-1),yl=t=>Gs(t)==="[object Object]",cr=t=>He(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,Ts=lr(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Bo=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},Nc=/-\w/g,Ot=Bo(t=>t.replace(Nc,e=>e.slice(1).toUpperCase())),Pc=/\B([A-Z])/g,gn=Bo(t=>t.replace(Pc,"-$1").toLowerCase()),wl=Bo(t=>t.charAt(0).toUpperCase()+t.slice(1)),ra=Bo(t=>t?`on${wl(t)}`:""),st=(t,e)=>!Object.is(t,e),ho=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},xl=(t,e,n,s=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:s,value:n})},Fo=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let Hr;const Ho=()=>Hr||(Hr=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function cn(t){if(ge(t)){const e={};for(let n=0;n<t.length;n++){const s=t[n],o=He(s)?Vc(s):cn(s);if(o)for(const a in o)e[a]=o[a]}return e}else if(He(t)||je(t))return t}const Bc=/;(?![^(]*\))/g,Fc=/:([^]+)/,Hc=/\/\*[^]*?\*\//g;function Vc(t){const e={};return t.replace(Hc,"").split(Bc).forEach(n=>{if(n){const s=n.split(Fc);s.length>1&&(e[s[0].trim()]=s[1].trim())}}),e}function ve(t){let e="";if(He(t))e=t;else if(ge(t))for(let n=0;n<t.length;n++){const s=ve(t[n]);s&&(e+=s+" ")}else if(je(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const Uc="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",zc=lr(Uc);function kl(t){return!!t||t===""}function qc(t,e){if(t.length!==e.length)return!1;let n=!0;for(let s=0;n&&s<t.length;s++)n=Ws(t[s],e[s]);return n}function Ws(t,e){if(t===e)return!0;let n=Fr(t),s=Fr(e);if(n||s)return n&&s?t.getTime()===e.getTime():!1;if(n=Lt(t),s=Lt(e),n||s)return t===e;if(n=ge(t),s=ge(e),n||s)return n&&s?qc(t,e):!1;if(n=je(t),s=je(e),n||s){if(!n||!s)return!1;const o=Object.keys(t).length,a=Object.keys(e).length;if(o!==a)return!1;for(const r in t){const i=t.hasOwnProperty(r),l=e.hasOwnProperty(r);if(i&&!l||!i&&l||!Ws(t[r],e[r]))return!1}}return String(t)===String(e)}function Kc(t,e){return t.findIndex(n=>Ws(n,e))}const Sl=t=>!!(t&&t.__v_isRef===!0),R=t=>He(t)?t:t==null?"":ge(t)||je(t)&&(t.toString===vl||!xe(t.toString))?Sl(t)?R(t.value):JSON.stringify(t,$l,2):String(t),$l=(t,e)=>Sl(e)?$l(t,e.value):os(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[s,o],a)=>(n[ia(s,a)+" =>"]=o,n),{})}:Po(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>ia(n))}:Lt(e)?ia(e):je(e)&&!ge(e)&&!yl(e)?String(e):e,ia=(t,e="")=>{var n;return Lt(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.5.40
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Ge;class Gc{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!e&&Ge&&(Ge.active?(this.parent=Ge,this.index=(Ge.scopes||(Ge.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes){const s=this.scopes.slice();for(e=0,n=s.length;e<n;e++)s[e].pause()}for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes){const o=this.scopes.slice();for(e=0,n=o.length;e<n;e++)o[e].resume()}const s=this.effects.slice();for(e=0,n=s.length;e<n;e++)s[e].resume()}}run(e){if(this._active){const n=Ge;try{return Ge=this,e()}finally{Ge=n}}}on(){++this._on===1&&(this.prevScope=Ge,Ge=this)}off(){if(this._on>0&&--this._on===0){if(Ge===this)Ge=this.prevScope;else{let e=Ge;for(;e;){if(e.prevScope===this){e.prevScope=this.prevScope;break}e=e.prevScope}}this.prevScope=void 0}}stop(e){if(this._active){this._active=!1;let n,s;for(n=0,s=this.effects.length;n<s;n++)this.effects[n].stop();for(this.effects.length=0,n=0,s=this.cleanups.length;n<s;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){const o=this.scopes.slice();for(n=0,s=o.length;n<s;n++)o[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const o=this.parent.scopes.pop();o&&o!==this&&(this.parent.scopes[this.index]=o,o.index=this.index)}this.parent=void 0}}}function Wc(){return Ge}function Vo(t,e=!1){Ge&&Ge.cleanups.push(t)}let Le;const la=new WeakSet;class El{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Ge&&(Ge.active?Ge.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,la.has(this)&&(la.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Al(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Vr(this),Tl(this);const e=Le,n=jt;Le=this,jt=!0;try{return this.fn()}finally{Ol(this),Le=e,jt=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)fr(e);this.deps=this.depsTail=void 0,Vr(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?la.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){_a(this)&&this.run()}get dirty(){return _a(this)}}let Cl=0,Os,Ms;function Al(t,e=!1){if(t.flags|=8,e){t.next=Ms,Ms=t;return}t.next=Os,Os=t}function dr(){Cl++}function pr(){if(--Cl>0)return;if(Ms){let e=Ms;for(Ms=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;Os;){let e=Os;for(Os=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(s){t||(t=s)}e=n}}if(t)throw t}function Tl(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function Ol(t){let e,n=t.depsTail,s=n;for(;s;){const o=s.prevDep;s.version===-1?(s===n&&(n=o),fr(s),Yc(s)):e=s,s.dep.activeLink=s.prevActiveLink,s.prevActiveLink=void 0,s=o}t.deps=e,t.depsTail=n}function _a(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(Ml(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function Ml(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===Ns)||(t.globalVersion=Ns,!t.isSSR&&t.flags&128&&(!t.deps&&!t._dirty||!_a(t))))return;t.flags|=2;const e=t.dep,n=Le,s=jt;Le=t,jt=!0;try{Tl(t);const o=t.fn(t._value);(e.version===0||st(o,t._value))&&(t.flags|=128,t._value=o,e.version++)}catch(o){throw e.version++,o}finally{Le=n,jt=s,Ol(t),t.flags&=-3}}function fr(t,e=!1){const{dep:n,prevSub:s,nextSub:o}=t;if(s&&(s.nextSub=o,t.prevSub=void 0),o&&(o.prevSub=s,t.nextSub=void 0),n.subs===t&&(n.subs=s,!s&&n.computed)){n.computed.flags&=-5;for(let a=n.computed.deps;a;a=a.nextDep)fr(a,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function Yc(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let jt=!0;const _l=[];function dn(){_l.push(jt),jt=!1}function pn(){const t=_l.pop();jt=t===void 0?!0:t}function Vr(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=Le;Le=void 0;try{e()}finally{Le=n}}}let Ns=0;class Xc{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Uo{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!Le||!jt||Le===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==Le)n=this.activeLink=new Xc(Le,this),Le.deps?(n.prevDep=Le.depsTail,Le.depsTail.nextDep=n,Le.depsTail=n):Le.deps=Le.depsTail=n,Rl(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const s=n.nextDep;s.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=s),n.prevDep=Le.depsTail,n.nextDep=void 0,Le.depsTail.nextDep=n,Le.depsTail=n,Le.deps===n&&(Le.deps=s)}return n}trigger(e){this.version++,Ns++,this.notify(e)}notify(e){dr();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{pr()}}}function Rl(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let s=e.deps;s;s=s.nextDep)Rl(s)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const Ra=new WeakMap,Hn=Symbol(""),ja=Symbol(""),Ps=Symbol("");function it(t,e,n){if(jt&&Le){let s=Ra.get(t);s||Ra.set(t,s=new Map);let o=s.get(n);o||(s.set(n,o=new Uo),o.map=s,o.key=n),o.track()}}function rn(t,e,n,s,o,a){const r=Ra.get(t);if(!r){Ns++;return}const i=l=>{l&&l.trigger()};if(dr(),e==="clear")r.forEach(i);else{const l=ge(t),u=l&&cr(n);if(l&&n==="length"){const c=Number(s);r.forEach((d,p)=>{(p==="length"||p===Ps||!Lt(p)&&p>=c)&&i(d)})}else switch((n!==void 0||r.has(void 0))&&i(r.get(n)),u&&i(r.get(Ps)),e){case"add":l?u&&i(r.get("length")):(i(r.get(Hn)),os(t)&&i(r.get(ja)));break;case"delete":l||(i(r.get(Hn)),os(t)&&i(r.get(ja)));break;case"set":os(t)&&i(r.get(Hn));break}}pr()}function Xn(t){const e=Me(t);return e===t?e:(it(e,"iterate",Ps),Mt(t)?e:e.map(Nt))}function zo(t){return it(t=Me(t),"iterate",Ps),t}function qt(t,e){return fn(t)?cs(Vn(t)?Nt(e):e):Nt(e)}const Jc={__proto__:null,[Symbol.iterator](){return ua(this,Symbol.iterator,t=>qt(this,t))},concat(...t){return Xn(this).concat(...t.map(e=>ge(e)?Xn(e):e))},entries(){return ua(this,"entries",t=>(t[1]=qt(this,t[1]),t))},every(t,e){return en(this,"every",t,e,void 0,arguments)},filter(t,e){return en(this,"filter",t,e,n=>n.map(s=>qt(this,s)),arguments)},find(t,e){return en(this,"find",t,e,n=>qt(this,n),arguments)},findIndex(t,e){return en(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return en(this,"findLast",t,e,n=>qt(this,n),arguments)},findLastIndex(t,e){return en(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return en(this,"forEach",t,e,void 0,arguments)},includes(...t){return ca(this,"includes",t)},indexOf(...t){return ca(this,"indexOf",t)},join(t){return Xn(this).join(t)},lastIndexOf(...t){return ca(this,"lastIndexOf",t)},map(t,e){return en(this,"map",t,e,void 0,arguments)},pop(){return ws(this,"pop")},push(...t){return ws(this,"push",t)},reduce(t,...e){return Ur(this,"reduce",t,e)},reduceRight(t,...e){return Ur(this,"reduceRight",t,e)},shift(){return ws(this,"shift")},some(t,e){return en(this,"some",t,e,void 0,arguments)},splice(...t){return ws(this,"splice",t)},toReversed(){return Xn(this).toReversed()},toSorted(t){return Xn(this).toSorted(t)},toSpliced(...t){return Xn(this).toSpliced(...t)},unshift(...t){return ws(this,"unshift",t)},values(){return ua(this,"values",t=>qt(this,t))}};function ua(t,e,n){const s=zo(t),o=s[e]();return s!==t&&!Mt(t)&&(o._next=o.next,o.next=()=>{const a=o._next();return a.done||(a.value=n(a.value)),a}),o}const Qc=Array.prototype;function en(t,e,n,s,o,a){const r=zo(t),i=r!==t&&!Mt(t),l=r[e];if(l!==Qc[e]){const d=l.apply(t,a);return i?Nt(d):d}let u=n;r!==t&&(i?u=function(d,p){return n.call(this,qt(t,d),p,t)}:n.length>2&&(u=function(d,p){return n.call(this,d,p,t)}));const c=l.call(r,u,s);return i&&o?o(c):c}function Ur(t,e,n,s){const o=zo(t),a=o!==t&&!Mt(t);let r=n,i=!1;o!==t&&(a?(i=s.length===0,r=function(u,c,d){return i&&(i=!1,u=qt(t,u)),n.call(this,u,qt(t,c),d,t)}):n.length>3&&(r=function(u,c,d){return n.call(this,u,c,d,t)}));const l=o[e](r,...s);return i?qt(t,l):l}function ca(t,e,n){const s=Me(t);it(s,"iterate",Ps);const o=s[e](...n);return(o===-1||o===!1)&&gr(n[0])?(n[0]=Me(n[0]),s[e](...n)):o}function ws(t,e,n=[]){dn(),dr();const s=Me(t)[e].apply(t,n);return pr(),pn(),s}const Zc=lr("__proto__,__v_isRef,__isVue"),jl=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(Lt));function ed(t){Lt(t)||(t=String(t));const e=Me(this);return it(e,"has",t),e.hasOwnProperty(t)}class Il{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,s){if(n==="__v_skip")return e.__v_skip;const o=this._isReadonly,a=this._isShallow;if(n==="__v_isReactive")return!o;if(n==="__v_isReadonly")return o;if(n==="__v_isShallow")return a;if(n==="__v_raw")return s===(o?a?cd:Pl:a?Nl:Ll).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(s)?e:void 0;const r=ge(e);if(!o){let l;if(r&&(l=Jc[n]))return l;if(n==="hasOwnProperty")return ed}const i=Reflect.get(e,n,dt(e)?e:s);if((Lt(n)?jl.has(n):Zc(n))||(o||it(e,"get",n),a))return i;if(dt(i)){const l=r&&cr(n)?i:i.value;return o&&je(l)?Da(l):l}return je(i)?o?Da(i):Ne(i):i}}class Dl extends Il{constructor(e=!1){super(!1,e)}set(e,n,s,o){let a=e[n];const r=ge(e)&&cr(n);if(!this._isShallow){const u=fn(a);if(!Mt(s)&&!fn(s)&&(a=Me(a),s=Me(s)),!r&&dt(a)&&!dt(s))return u||(a.value=s),!0}const i=r?Number(n)<e.length:_e(e,n),l=Reflect.set(e,n,s,dt(e)?e:o);return e===Me(o)&&l&&(i?st(s,a)&&rn(e,"set",n,s):rn(e,"add",n,s)),l}deleteProperty(e,n){const s=_e(e,n);e[n];const o=Reflect.deleteProperty(e,n);return o&&s&&rn(e,"delete",n,void 0),o}has(e,n){const s=Reflect.has(e,n);return(!Lt(n)||!jl.has(n))&&it(e,"has",n),s}ownKeys(e){return it(e,"iterate",ge(e)?"length":Hn),Reflect.ownKeys(e)}}class td extends Il{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const nd=new Dl,sd=new td,od=new Dl(!0);const Ia=t=>t,eo=t=>Reflect.getPrototypeOf(t);function ad(t,e,n){return function(...s){const o=this.__v_raw,a=Me(o),r=os(a),i=t==="entries"||t===Symbol.iterator&&r,l=t==="keys"&&r,u=o[t](...s),c=n?Ia:e?cs:Nt;return!e&&it(a,"iterate",l?ja:Hn),et(Object.create(u),{next(){const{value:d,done:p}=u.next();return p?{value:d,done:p}:{value:i?[c(d[0]),c(d[1])]:c(d),done:p}}})}}function to(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function rd(t,e){const n={get(o){const a=this.__v_raw,r=Me(a),i=Me(o);t||(st(o,i)&&it(r,"get",o),it(r,"get",i));const{has:l}=eo(r),u=e?Ia:t?cs:Nt;if(l.call(r,o))return u(a.get(o));if(l.call(r,i))return u(a.get(i));a!==r&&a.get(o)},get size(){const o=this.__v_raw;return!t&&it(Me(o),"iterate",Hn),o.size},has(o){const a=this.__v_raw,r=Me(a),i=Me(o);return t||(st(o,i)&&it(r,"has",o),it(r,"has",i)),o===i?a.has(o):a.has(o)||a.has(i)},forEach(o,a){const r=this,i=r.__v_raw,l=Me(i),u=e?Ia:t?cs:Nt;return!t&&it(l,"iterate",Hn),i.forEach((c,d)=>o.call(a,u(c),u(d),r))}};return et(n,t?{add:to("add"),set:to("set"),delete:to("delete"),clear:to("clear")}:{add(o){const a=Me(this),r=eo(a),i=Me(o),l=!e&&!Mt(o)&&!fn(o)?i:o;return r.has.call(a,l)||st(o,l)&&r.has.call(a,o)||st(i,l)&&r.has.call(a,i)||(a.add(l),rn(a,"add",l,l)),this},set(o,a){!e&&!Mt(a)&&!fn(a)&&(a=Me(a));const r=Me(this),{has:i,get:l}=eo(r);let u=i.call(r,o);u||(o=Me(o),u=i.call(r,o));const c=l.call(r,o);return r.set(o,a),u?st(a,c)&&rn(r,"set",o,a):rn(r,"add",o,a),this},delete(o){const a=Me(this),{has:r,get:i}=eo(a);let l=r.call(a,o);l||(o=Me(o),l=r.call(a,o)),i&&i.call(a,o);const u=a.delete(o);return l&&rn(a,"delete",o,void 0),u},clear(){const o=Me(this),a=o.size!==0,r=o.clear();return a&&rn(o,"clear",void 0,void 0),r}}),["keys","values","entries",Symbol.iterator].forEach(o=>{n[o]=ad(o,t,e)}),n}function hr(t,e){const n=rd(t,e);return(s,o,a)=>o==="__v_isReactive"?!t:o==="__v_isReadonly"?t:o==="__v_raw"?s:Reflect.get(_e(n,o)&&o in s?n:s,o,a)}const id={get:hr(!1,!1)},ld={get:hr(!1,!0)},ud={get:hr(!0,!1)};const Ll=new WeakMap,Nl=new WeakMap,Pl=new WeakMap,cd=new WeakMap;function dd(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Ne(t){return fn(t)?t:mr(t,!1,nd,id,Ll)}function Bl(t){return mr(t,!1,od,ld,Nl)}function Da(t){return mr(t,!0,sd,ud,Pl)}function mr(t,e,n,s,o){if(!je(t)||t.__v_raw&&!(e&&t.__v_isReactive)||t.__v_skip||!Object.isExtensible(t))return t;const a=o.get(t);if(a)return a;const r=dd(Lc(t));if(r===0)return t;const i=new Proxy(t,r===2?s:n);return o.set(t,i),i}function Vn(t){return fn(t)?Vn(t.__v_raw):!!(t&&t.__v_isReactive)}function fn(t){return!!(t&&t.__v_isReadonly)}function Mt(t){return!!(t&&t.__v_isShallow)}function gr(t){return t?!!t.__v_raw:!1}function Me(t){const e=t&&t.__v_raw;return e?Me(e):t}function pd(t){return!_e(t,"__v_skip")&&Object.isExtensible(t)&&xl(t,"__v_skip",!0),t}const Nt=t=>je(t)?Ne(t):t,cs=t=>je(t)?Da(t):t;function dt(t){return t?t.__v_isRef===!0:!1}function B(t){return Fl(t,!1)}function br(t){return Fl(t,!0)}function Fl(t,e){return dt(t)?t:new fd(t,e)}class fd{constructor(e,n){this.dep=new Uo,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:Me(e),this._value=n?e:Nt(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,s=this.__v_isShallow||Mt(e)||fn(e);e=s?e:Me(e),st(e,n)&&(this._rawValue=e,this._value=s?e:Nt(e),this.dep.trigger())}}function f(t){return dt(t)?t.value:t}const hd={get:(t,e,n)=>e==="__v_raw"?t:f(Reflect.get(t,e,n)),set:(t,e,n,s)=>{const o=t[e];return dt(o)&&!dt(n)?(o.value=n,!0):Reflect.set(t,e,n,s)}};function Hl(t){return Vn(t)?t:new Proxy(t,hd)}class md{constructor(e){this.__v_isRef=!0,this._value=void 0;const n=this.dep=new Uo,{get:s,set:o}=e(n.track.bind(n),n.trigger.bind(n));this._get=s,this._set=o}get value(){return this._value=this._get()}set value(e){this._set(e)}}function gd(t){return new md(t)}class bd{constructor(e,n,s){this.fn=e,this.setter=n,this._value=void 0,this.dep=new Uo(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Ns-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=s}notify(){if(this.flags|=16,!(this.flags&8)&&Le!==this)return Al(this,!0),!0}get value(){const e=this.dep.track();return Ml(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function vd(t,e,n=!1){let s,o;return xe(t)?s=t:(s=t.get,o=t.set),new bd(s,o,n)}const no={},yo=new WeakMap;let In;function yd(t,e=!1,n=In){if(n){let s=yo.get(n);s||yo.set(n,s=[]),s.push(t)}}function wd(t,e,n=Ae){const{immediate:s,deep:o,once:a,scheduler:r,augmentJob:i,call:l}=n,u=$=>o?$:Mt($)||o===!1||o===0?ln($,1):ln($);let c,d,p,m,y=!1,g=!1;if(dt(t)?(d=()=>t.value,y=Mt(t)):Vn(t)?(d=()=>u(t),y=!0):ge(t)?(g=!0,y=t.some($=>Vn($)||Mt($)),d=()=>t.map($=>{if(dt($))return $.value;if(Vn($))return u($);if(xe($))return l?l($,2):$()})):xe(t)?e?d=l?()=>l(t,2):t:d=()=>{if(p){dn();try{p()}finally{pn()}}const $=In;In=c;try{return l?l(t,3,[m]):t(m)}finally{In=$}}:d=Wt,e&&o){const $=d,_=o===!0?1/0:o;d=()=>ln($(),_)}const v=Wc(),b=()=>{c.stop(),v&&v.active&&ur(v.effects,c)};if(a&&e){const $=e;e=(..._)=>{const P=$(..._);return b(),P}}let w=g?new Array(t.length).fill(no):no;const S=$=>{if(!(!(c.flags&1)||!c.dirty&&!$))if(e){const _=c.run();if($||o||y||(g?_.some((P,K)=>st(P,w[K])):st(_,w))){p&&p();const P=In;In=c;try{const K=[_,w===no?void 0:g&&w[0]===no?[]:w,m];w=_,l?l(e,3,K):e(...K)}finally{In=P}}}else c.run()};return i&&i(S),c=new El(d),c.scheduler=r?()=>r(S,!1):S,m=$=>yd($,!1,c),p=c.onStop=()=>{const $=yo.get(c);if($){if(l)l($,4);else for(const _ of $)_();yo.delete(c)}},e?s?S(!0):w=c.run():r?r(S.bind(null,!0),!0):c.run(),b.pause=c.pause.bind(c),b.resume=c.resume.bind(c),b.stop=b,b}function ln(t,e=1/0,n){if(e<=0||!je(t)||t.__v_skip||(n=n||new Map,(n.get(t)||0)>=e))return t;if(n.set(t,e),e--,dt(t))ln(t.value,e,n);else if(ge(t))for(let s=0;s<t.length;s++)ln(t[s],e,n);else if(Po(t)||os(t))t.forEach(s=>{ln(s,e,n)});else if(yl(t)){for(const s in t)ln(t[s],e,n);for(const s of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,s)&&ln(t[s],e,n)}return t}/**
* @vue/runtime-core v3.5.40
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Ys(t,e,n,s){try{return s?t(...s):t()}catch(o){qo(o,e,n)}}function Pt(t,e,n,s){if(xe(t)){const o=Ys(t,e,n,s);return o&&bl(o)&&o.catch(a=>{qo(a,e,n)}),o}if(ge(t)){const o=[];for(let a=0;a<t.length;a++)o.push(Pt(t[a],e,n,s));return o}}function qo(t,e,n,s=!0){const o=e?e.vnode:null,{errorHandler:a,throwUnhandledErrorInProduction:r}=e&&e.appContext.config||Ae;if(e){let i=e.parent;const l=e.proxy,u=`https://vuejs.org/error-reference/#runtime-${n}`;for(;i;){const c=i.ec;if(c){for(let d=0;d<c.length;d++)if(c[d](t,l,u)===!1)return}i=i.parent}if(a){dn(),Ys(a,null,10,[t,l,u]),pn();return}}xd(t,n,o,s,r)}function xd(t,e,n,s=!0,o=!1){if(o)throw t;console.error(t)}const mt=[];let zt=-1;const as=[];let Cn=null,Qn=0;const Vl=Promise.resolve();let wo=null;function hs(t){const e=wo||Vl;return t?e.then(this?t.bind(this):t):e}function kd(t){let e=zt+1,n=mt.length;for(;e<n;){const s=e+n>>>1,o=mt[s],a=Bs(o);a<t||a===t&&o.flags&2?e=s+1:n=s}return e}function vr(t){if(!(t.flags&1)){const e=Bs(t),n=mt[mt.length-1];!n||!(t.flags&2)&&e>=Bs(n)?mt.push(t):mt.splice(kd(e),0,t),t.flags|=1,Ul()}}function Ul(){wo||(wo=Vl.then(ql))}function Sd(t){ge(t)?as.push(...t):Cn&&t.id===-1?Cn.splice(Qn+1,0,t):t.flags&1||(as.push(t),t.flags|=1),Ul()}function zr(t,e,n=zt+1){for(;n<mt.length;n++){const s=mt[n];if(s&&s.flags&2){if(t&&s.id!==t.uid)continue;mt.splice(n,1),n--,s.flags&4&&(s.flags&=-2),s(),s.flags&4||(s.flags&=-2)}}}function zl(t){if(as.length){const e=[...new Set(as)].sort((n,s)=>Bs(n)-Bs(s));if(as.length=0,Cn){Cn.push(...e);return}for(Cn=e,Qn=0;Qn<Cn.length;Qn++){const n=Cn[Qn];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}Cn=null,Qn=0}}const Bs=t=>t.id==null?t.flags&2?-1:1/0:t.id;function ql(t){try{for(zt=0;zt<mt.length;zt++){const e=mt[zt];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Ys(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;zt<mt.length;zt++){const e=mt[zt];e&&(e.flags&=-2)}zt=-1,mt.length=0,zl(),wo=null,(mt.length||as.length)&&ql()}}let lt=null,Kl=null;function xo(t){const e=lt;return lt=t,Kl=t&&t.type.__scopeId||null,e}function D(t,e=lt,n){if(!e||t._n)return t;const s=(...o)=>{s._d&&Co(-1);const a=xo(e),r=un.length;let i;try{i=t(...o)}finally{for(let l=un.length;l>r;l--)Er();xo(a),s._d&&Co(1)}return i};return s._n=!0,s._c=!0,s._d=!0,s}function _s(t,e){if(lt===null)return t;const n=Yo(lt),s=t.dirs||(t.dirs=[]);for(let o=0;o<e.length;o++){let[a,r,i,l=Ae]=e[o];a&&(xe(a)&&(a={mounted:a,updated:a}),a.deep&&ln(r),s.push({dir:a,instance:n,value:r,oldValue:void 0,arg:i,modifiers:l}))}return t}function Rn(t,e,n,s){const o=t.dirs,a=e&&e.dirs;for(let r=0;r<o.length;r++){const i=o[r];a&&(i.oldValue=a[r].value);let l=i.dir[s];l&&(dn(),Pt(l,n,8,[t.el,i,t,e]),pn())}}function mo(t,e){if(gt){let n=gt.provides;const s=gt.parent&&gt.parent.provides;s===n&&(n=gt.provides=Object.create(s)),n[t]=e}}function Yt(t,e,n=!1){const s=yu();if(s||is){let o=is?is._context.provides:s?s.parent==null||s.ce?s.vnode.appContext&&s.vnode.appContext.provides:s.parent.provides:void 0;if(o&&t in o)return o[t];if(arguments.length>1)return n&&xe(e)?e.call(s&&s.proxy):e}}const $d=Symbol.for("v-scx"),Ed=()=>Yt($d);function Cd(t,e){return yr(t,null,{flush:"sync"})}function Re(t,e,n){return yr(t,e,n)}function yr(t,e,n=Ae){const{immediate:s,deep:o,flush:a,once:r}=n,i=et({},n),l=e&&s||!e&&a!=="post";let u;if(Vs){if(a==="sync"){const m=Ed();u=m.__watcherHandles||(m.__watcherHandles=[])}else if(!l){const m=()=>{};return m.stop=Wt,m.resume=Wt,m.pause=Wt,m}}const c=gt;i.call=(m,y,g)=>Pt(m,c,y,g);let d=!1;a==="post"?i.scheduler=m=>{bt(m,c&&c.suspense)}:a!=="sync"&&(d=!0,i.scheduler=(m,y)=>{y?m():vr(m)}),i.augmentJob=m=>{e&&(m.flags|=4),d&&(m.flags|=2,c&&(m.id=c.uid,m.i=c))};const p=wd(t,e,i);return Vs&&(u?u.push(p):l&&p()),p}function Ad(t,e,n){const s=this.proxy,o=He(t)?t.includes(".")?Gl(s,t):()=>s[t]:t.bind(s,s);let a;xe(e)?a=e:(a=e.handler,n=e);const r=Xs(this),i=yr(o,a.bind(s),n);return r(),i}function Gl(t,e){const n=e.split(".");return()=>{let s=t;for(let o=0;o<n.length&&s;o++)s=s[n[o]];return s}}const Td=Symbol("_vte"),Od=t=>t.__isTeleport,da=Symbol("_leaveCb");function wr(t,e){t.shapeFlag&6&&t.component?(t.transition=e,wr(t.component.subTree,e)):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}function se(t,e){return xe(t)?et({name:t.name},e,{setup:t}):t}function Wl(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}function qr(t,e){let n;return!!((n=Object.getOwnPropertyDescriptor(t,e))&&!n.configurable)}const ko=new WeakMap;function Rs(t,e,n,s,o=!1){if(ge(t)){t.forEach((g,v)=>Rs(g,e&&(ge(e)?e[v]:e),n,s,o));return}if(rs(s)&&!o){s.shapeFlag&512&&s.type.__asyncResolved&&s.component.subTree.component&&Rs(t,e,n,s.component.subTree);return}const a=s.shapeFlag&4?Yo(s.component):s.el,r=o?null:a,{i,r:l}=t,u=e&&e.r,c=i.refs===Ae?i.refs={}:i.refs,d=i.setupState,p=Me(d),m=d===Ae?gl:g=>qr(c,g)?!1:_e(p,g),y=(g,v)=>!(v&&qr(c,v));if(u!=null&&u!==l){if(Kr(e),He(u))c[u]=null,m(u)&&(d[u]=null);else if(dt(u)){const g=e;y(u,g.k)&&(u.value=null),g.k&&(c[g.k]=null)}}if(xe(l))Ys(l,i,12,[r,c]);else{const g=He(l),v=dt(l);if(g||v){const b=()=>{if(t.f){const w=g?m(l)?d[l]:c[l]:y()||!t.k?l.value:c[t.k];if(o)ge(w)&&ur(w,a);else if(ge(w))w.includes(a)||w.push(a);else if(g)c[l]=[a],m(l)&&(d[l]=c[l]);else{const S=[a];y(l,t.k)&&(l.value=S),t.k&&(c[t.k]=S)}}else g?(c[l]=r,m(l)&&(d[l]=r)):v&&(y(l,t.k)&&(l.value=r),t.k&&(c[t.k]=r))};if(r){const w=()=>{b(),ko.delete(t)};w.id=-1,ko.set(t,w),bt(w,n)}else Kr(t),b()}}}function Kr(t){const e=ko.get(t);e&&(e.flags|=8,ko.delete(t))}Ho().requestIdleCallback;Ho().cancelIdleCallback;const rs=t=>!!t.type.__asyncLoader,Yl=t=>t.type.__isKeepAlive;function Md(t,e){Xl(t,"a",e)}function _d(t,e){Xl(t,"da",e)}function Xl(t,e,n=gt){const s=t.__wdc||(t.__wdc=()=>{let o=n;for(;o;){if(o.isDeactivated)return;o=o.parent}return t()});if(Ko(e,s,n),n){let o=n.parent;for(;o&&o.parent;)Yl(o.parent.vnode)&&Rd(s,e,n,o),o=o.parent}}function Rd(t,e,n,s){const o=Ko(e,t,s,!0);kr(()=>{ur(s[e],o)},n)}function Ko(t,e,n=gt,s=!1){if(n){const o=n[t]||(n[t]=[]),a=e.__weh||(e.__weh=(...r)=>{dn();const i=Xs(n),l=Pt(e,n,t,r);return i(),pn(),l});return s?o.unshift(a):o.push(a),a}}const bn=t=>(e,n=gt)=>{(!Vs||t==="sp")&&Ko(t,(...s)=>e(...s),n)},jd=bn("bm"),xr=bn("m"),Id=bn("bu"),Dd=bn("u"),Jl=bn("bum"),kr=bn("um"),Ld=bn("sp"),Nd=bn("rtg"),Pd=bn("rtc");function Bd(t,e=gt){Ko("ec",t,e)}const Fd=Symbol.for("v-ndc");function de(t,e,n,s){let o;const a=n,r=ge(t);if(r||He(t)){const i=r&&Vn(t);let l=!1,u=!1;i&&(l=!Mt(t),u=fn(t),t=zo(t)),o=new Array(t.length);for(let c=0,d=t.length;c<d;c++)o[c]=e(l?u?cs(Nt(t[c])):Nt(t[c]):t[c],c,void 0,a)}else if(typeof t=="number"){o=new Array(t);for(let i=0;i<t;i++)o[i]=e(i+1,i,void 0,a)}else if(je(t))if(t[Symbol.iterator])o=Array.from(t,(i,l)=>e(i,l,void 0,a));else{const i=Object.keys(t);o=new Array(i.length);for(let l=0,u=i.length;l<u;l++){const c=i[l];o[l]=e(t[c],c,l,a)}}else o=[];return o}function So(t,e,n={},s,o,a){if(lt.ce||lt.parent&&rs(lt.parent)&&lt.parent.ce){const u=n,c=Object.keys(u).length>0;return e!=="default"&&(u.name=e),x(),Y(te,null,[A("slot",u,s)],c?-2:64)}let r=t[e];r&&r._c&&(r._d=!1);const i=un.length;x();let l;try{const u=r&&Ql(r(n)),c=n.key||a||u&&u.key;l=Y(te,{key:(c&&!Lt(c)?c:`_${e}`)+(!u&&s?"_fb":"")},u||(s?s():[]),u&&t._===1?64:-2)}catch(u){for(let c=un.length;c>i;c--)Er();throw u}finally{r&&r._c&&(r._d=!0)}return l.scopeId&&(l.slotScopeIds=[l.scopeId+"-s"]),l}function Ql(t){return t.some(e=>Hs(e)?!(e.type===hn||e.type===te&&!Ql(e.children)):!0)?t:null}const La=t=>t?wu(t)?Yo(t):La(t.parent):null,js=et(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>La(t.parent),$root:t=>La(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>eu(t),$forceUpdate:t=>t.f||(t.f=()=>{vr(t.update)}),$nextTick:t=>t.n||(t.n=hs.bind(t.proxy)),$watch:t=>Ad.bind(t)}),pa=(t,e)=>t!==Ae&&!t.__isScriptSetup&&_e(t,e),Hd={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:s,data:o,props:a,accessCache:r,type:i,appContext:l}=t;if(e[0]!=="$"){const p=r[e];if(p!==void 0)switch(p){case 1:return s[e];case 2:return o[e];case 4:return n[e];case 3:return a[e]}else{if(pa(s,e))return r[e]=1,s[e];if(o!==Ae&&_e(o,e))return r[e]=2,o[e];if(_e(a,e))return r[e]=3,a[e];if(n!==Ae&&_e(n,e))return r[e]=4,n[e];Na&&(r[e]=0)}}const u=js[e];let c,d;if(u)return e==="$attrs"&&it(t.attrs,"get",""),u(t);if((c=i.__cssModules)&&(c=c[e]))return c;if(n!==Ae&&_e(n,e))return r[e]=4,n[e];if(d=l.config.globalProperties,_e(d,e))return d[e]},set({_:t},e,n){const{data:s,setupState:o,ctx:a}=t;return pa(o,e)?(o[e]=n,!0):s!==Ae&&_e(s,e)?(s[e]=n,!0):_e(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(a[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:s,appContext:o,props:a,type:r}},i){let l;return!!(n[i]||t!==Ae&&i[0]!=="$"&&_e(t,i)||pa(e,i)||_e(a,i)||_e(s,i)||_e(js,i)||_e(o.config.globalProperties,i)||(l=r.__cssModules)&&l[i])},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:_e(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function $o(t){return ge(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}function qn(t,e){return!t||!e?t||e:ge(t)&&ge(e)?t.concat(e):et({},$o(t),$o(e))}let Na=!0;function Vd(t){const e=eu(t),n=t.proxy,s=t.ctx;Na=!1,e.beforeCreate&&Gr(e.beforeCreate,t,"bc");const{data:o,computed:a,methods:r,watch:i,provide:l,inject:u,created:c,beforeMount:d,mounted:p,beforeUpdate:m,updated:y,activated:g,deactivated:v,beforeDestroy:b,beforeUnmount:w,destroyed:S,unmounted:$,render:_,renderTracked:P,renderTriggered:K,errorCaptured:I,serverPrefetch:N,expose:j,inheritAttrs:he,components:Se,directives:z,filters:ae}=e;if(u&&Ud(u,s,null),r)for(const le in r){const G=r[le];xe(G)&&(s[le]=G.bind(n))}if(o){const le=o.call(n,n);je(le)&&(t.data=Ne(le))}if(Na=!0,a)for(const le in a){const G=a[le],re=xe(G)?G.bind(n,n):xe(G.get)?G.get.bind(n,n):Wt,$e=!xe(G)&&xe(G.set)?G.set.bind(n):Wt,tt=C({get:re,set:$e});Object.defineProperty(s,le,{enumerable:!0,configurable:!0,get:()=>tt.value,set:W=>tt.value=W})}if(i)for(const le in i)Zl(i[le],s,n,le);if(l){const le=xe(l)?l.call(n):l;Reflect.ownKeys(le).forEach(G=>{mo(G,le[G])})}c&&Gr(c,t,"c");function J(le,G){ge(G)?G.forEach(re=>le(re.bind(n))):G&&le(G.bind(n))}if(J(jd,d),J(xr,p),J(Id,m),J(Dd,y),J(Md,g),J(_d,v),J(Bd,I),J(Pd,P),J(Nd,K),J(Jl,w),J(kr,$),J(Ld,N),ge(j))if(j.length){const le=t.exposed||(t.exposed={});j.forEach(G=>{Object.defineProperty(le,G,{get:()=>n[G],set:re=>n[G]=re,enumerable:!0})})}else t.exposed||(t.exposed={});_&&t.render===Wt&&(t.render=_),he!=null&&(t.inheritAttrs=he),Se&&(t.components=Se),z&&(t.directives=z),N&&Wl(t)}function Ud(t,e,n=Wt){ge(t)&&(t=Pa(t));for(const s in t){const o=t[s];let a;je(o)?"default"in o?a=Yt(o.from||s,o.default,!0):a=Yt(o.from||s):a=Yt(o),dt(a)?Object.defineProperty(e,s,{enumerable:!0,configurable:!0,get:()=>a.value,set:r=>a.value=r}):e[s]=a}}function Gr(t,e,n){Pt(ge(t)?t.map(s=>s.bind(e.proxy)):t.bind(e.proxy),e,n)}function Zl(t,e,n,s){let o=s.includes(".")?Gl(n,s):()=>n[s];if(He(t)){const a=e[t];xe(a)&&Re(o,a)}else if(xe(t))Re(o,t.bind(n));else if(je(t))if(ge(t))t.forEach(a=>Zl(a,e,n,s));else{const a=xe(t.handler)?t.handler.bind(n):e[t.handler];xe(a)&&Re(o,a,t)}}function eu(t){const e=t.type,{mixins:n,extends:s}=e,{mixins:o,optionsCache:a,config:{optionMergeStrategies:r}}=t.appContext,i=a.get(e);let l;return i?l=i:!o.length&&!n&&!s?l=e:(l={},o.length&&o.forEach(u=>Eo(l,u,r,!0)),Eo(l,e,r)),je(e)&&a.set(e,l),l}function Eo(t,e,n,s=!1){const{mixins:o,extends:a}=e;a&&Eo(t,a,n,!0),o&&o.forEach(r=>Eo(t,r,n,!0));for(const r in e)if(!(s&&r==="expose")){const i=zd[r]||n&&n[r];t[r]=i?i(t[r],e[r]):e[r]}return t}const zd={data:Wr,props:Yr,emits:Yr,methods:Es,computed:Es,beforeCreate:pt,created:pt,beforeMount:pt,mounted:pt,beforeUpdate:pt,updated:pt,beforeDestroy:pt,beforeUnmount:pt,destroyed:pt,unmounted:pt,activated:pt,deactivated:pt,errorCaptured:pt,serverPrefetch:pt,components:Es,directives:Es,watch:Kd,provide:Wr,inject:qd};function Wr(t,e){return e?t?function(){return et(xe(t)?t.call(this,this):t,xe(e)?e.call(this,this):e)}:e:t}function qd(t,e){return Es(Pa(t),Pa(e))}function Pa(t){if(ge(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function pt(t,e){return t?[...new Set([].concat(t,e))]:e}function Es(t,e){return t?et(Object.create(null),t,e):e}function Yr(t,e){return t?ge(t)&&ge(e)?[...new Set([...t,...e])]:et(Object.create(null),$o(t),$o(e??{})):e}function Kd(t,e){if(!t)return e;if(!e)return t;const n=et(Object.create(null),t);for(const s in e)n[s]=pt(t[s],e[s]);return n}function tu(){return{app:null,config:{isNativeTag:gl,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Gd=0;function Wd(t,e){return function(s,o=null){xe(s)||(s=et({},s)),o!=null&&!je(o)&&(o=null);const a=tu(),r=new WeakSet,i=[];let l=!1;const u=a.app={_uid:Gd++,_component:s,_props:o,_container:null,_context:a,_instance:null,version:Sp,get config(){return a.config},set config(c){},use(c,...d){return r.has(c)||(c&&xe(c.install)?(r.add(c),c.install(u,...d)):xe(c)&&(r.add(c),c(u,...d))),u},mixin(c){return a.mixins.includes(c)||a.mixins.push(c),u},component(c,d){return d?(a.components[c]=d,u):a.components[c]},directive(c,d){return d?(a.directives[c]=d,u):a.directives[c]},mount(c,d,p){if(!l){const m=u._ceVNode||A(s,o);return m.appContext=a,p===!0?p="svg":p===!1&&(p=void 0),t(m,c,p),l=!0,u._container=c,c.__vue_app__=u,Yo(m.component)}},onUnmount(c){i.push(c)},unmount(){l&&(Pt(i,u._instance,16),t(null,u._container),delete u._container.__vue_app__)},provide(c,d){return a.provides[c]=d,u},runWithContext(c){const d=is;is=u;try{return c()}finally{is=d}}};return u}}let is=null;function Kn(t,e,n=Ae){const s=yu(),o=Ot(e),a=gn(e),r=nu(t,o),i=gd((l,u)=>{let c,d=Ae,p;return Cd(()=>{const m=t[o];st(c,m)&&(c=m,u())}),{get(){return l(),n.get?n.get(c):c},set(m){const y=n.set?n.set(m):m;if(!st(y,c)&&!(d!==Ae&&st(m,d)))return;const g=s.vnode.props,v=!!(g&&(e in g||o in g||a in g)&&(`onUpdate:${e}`in g||`onUpdate:${o}`in g||`onUpdate:${a}`in g));v||(c=m,u()),s.emit(`update:${e}`,y),st(m,d)&&(st(m,y)&&!st(y,p)||v&&d!==Ae&&!st(y,c))&&u(),d=m,p=y}}});return i[Symbol.iterator]=()=>{let l=0;return{next(){return l<2?{value:l++?r||Ae:i,done:!1}:{done:!0}}}},i}const nu=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${Ot(e)}Modifiers`]||t[`${gn(e)}Modifiers`];function Yd(t,e,...n){if(t.isUnmounted)return;const s=t.vnode.props||Ae;let o=n;const a=e.startsWith("update:"),r=a&&nu(s,e.slice(7));r&&(r.trim&&(o=n.map(c=>He(c)?c.trim():c)),r.number&&(o=n.map(Fo)));let i,l=s[i=ra(e)]||s[i=ra(Ot(e))];!l&&a&&(l=s[i=ra(gn(e))]),l&&Pt(l,t,6,o);const u=s[i+"Once"];if(u){if(!t.emitted)t.emitted={};else if(t.emitted[i])return;t.emitted[i]=!0,Pt(u,t,6,o)}}const Xd=new WeakMap;function su(t,e,n=!1){const s=n?Xd:e.emitsCache,o=s.get(t);if(o!==void 0)return o;const a=t.emits;let r={},i=!1;if(!xe(t)){const l=u=>{const c=su(u,e,!0);c&&(i=!0,et(r,c))};!n&&e.mixins.length&&e.mixins.forEach(l),t.extends&&l(t.extends),t.mixins&&t.mixins.forEach(l)}return!a&&!i?(je(t)&&s.set(t,null),null):(ge(a)?a.forEach(l=>r[l]=null):et(r,a),je(t)&&s.set(t,r),r)}function Go(t,e){return!t||!Lo(e)?!1:(e=e.slice(2),e=e==="Once"?e:e.replace(/Once$/,""),_e(t,e[0].toLowerCase()+e.slice(1))||_e(t,gn(e))||_e(t,e))}function Xr(t){const{type:e,vnode:n,proxy:s,withProxy:o,propsOptions:[a],slots:r,attrs:i,emit:l,render:u,renderCache:c,props:d,data:p,setupState:m,ctx:y,inheritAttrs:g}=t,v=xo(t);let b,w;try{if(n.shapeFlag&4){const $=o||s,_=$;b=Kt(u.call(_,$,c,d,m,p,y)),w=i}else{const $=e;b=Kt($.length>1?$(d,{attrs:i,slots:r,emit:l}):$(d,null)),w=e.props?i:Jd(i)}}catch($){un.length=0,qo($,t,1),b=A(hn)}let S=b;if(w&&g!==!1){const $=Object.keys(w),{shapeFlag:_}=S;$.length&&_&7&&(a&&$.some(No)&&(w=Qd(w,a)),S=ds(S,w,!1,!0))}return n.dirs&&(S=ds(S,null,!1,!0),S.dirs=S.dirs?S.dirs.concat(n.dirs):n.dirs),n.transition&&wr(S,n.transition),b=S,xo(v),b}const Jd=t=>{let e;for(const n in t)(n==="class"||n==="style"||Lo(n))&&((e||(e={}))[n]=t[n]);return e},Qd=(t,e)=>{const n={};for(const s in t)(!No(s)||!(s.slice(9)in e))&&(n[s]=t[s]);return n};function Zd(t,e,n){const{props:s,children:o,component:a}=t,{props:r,children:i,patchFlag:l}=e,u=a.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return s?Jr(s,r,u):!!r;if(l&8){const c=e.dynamicProps;for(let d=0;d<c.length;d++){const p=c[d];if(ou(r,s,p)&&!Go(u,p))return!0}}}else return(o||i)&&(!i||!i.$stable)?!0:s===r?!1:s?r?Jr(s,r,u):!0:!!r;return!1}function Jr(t,e,n){const s=Object.keys(e);if(s.length!==Object.keys(t).length)return!0;for(let o=0;o<s.length;o++){const a=s[o];if(ou(e,t,a)&&!Go(n,a))return!0}return!1}function ou(t,e,n){const s=t[n],o=e[n];return n==="style"&&je(s)&&je(o)?!Ws(s,o):s!==o}function ep({vnode:t,parent:e,suspense:n},s){for(;e;){const o=e.subTree;if(o.suspense&&o.suspense.activeBranch===t&&(o.suspense.vnode.el=o.el=s,t=o),o===t)(t=e.vnode).el=s,e=e.parent;else break}n&&n.activeBranch===t&&(n.vnode.el=s)}const au={},ru=()=>Object.create(au),iu=t=>Object.getPrototypeOf(t)===au;function tp(t,e,n,s=!1){const o={},a=ru();t.propsDefaults=Object.create(null),lu(t,e,o,a);for(const r in t.propsOptions[0])r in o||(o[r]=void 0);n?t.props=s?o:Bl(o):t.type.props?t.props=o:t.props=a,t.attrs=a}function np(t,e,n,s){const{props:o,attrs:a,vnode:{patchFlag:r}}=t,i=Me(o),[l]=t.propsOptions;let u=!1;if((s||r>0)&&!(r&16)){if(r&8){const c=t.vnode.dynamicProps;for(let d=0;d<c.length;d++){let p=c[d];if(Go(t.emitsOptions,p))continue;const m=e[p];if(l)if(_e(a,p))m!==a[p]&&(a[p]=m,u=!0);else{const y=Ot(p);o[y]=Ba(l,i,y,m,t,!1)}else m!==a[p]&&(a[p]=m,u=!0)}}}else{lu(t,e,o,a)&&(u=!0);let c;for(const d in i)(!e||!_e(e,d)&&((c=gn(d))===d||!_e(e,c)))&&(l?n&&(n[d]!==void 0||n[c]!==void 0)&&(o[d]=Ba(l,i,d,void 0,t,!0)):delete o[d]);if(a!==i)for(const d in a)(!e||!_e(e,d))&&(delete a[d],u=!0)}u&&rn(t.attrs,"set","")}function lu(t,e,n,s){const[o,a]=t.propsOptions;let r=!1,i;if(e)for(let l in e){if(Ts(l))continue;const u=e[l];let c;o&&_e(o,c=Ot(l))?!a||!a.includes(c)?n[c]=u:(i||(i={}))[c]=u:Go(t.emitsOptions,l)||(!(l in s)||u!==s[l])&&(s[l]=u,r=!0)}if(a){const l=Me(n),u=i||Ae;for(let c=0;c<a.length;c++){const d=a[c];n[d]=Ba(o,l,d,u[d],t,!_e(u,d))}}return r}function Ba(t,e,n,s,o,a){const r=t[n];if(r!=null){const i=_e(r,"default");if(i&&s===void 0){const l=r.default;if(r.type!==Function&&!r.skipFactory&&xe(l)){const{propsDefaults:u}=o;if(n in u)s=u[n];else{const c=Xs(o);s=u[n]=l.call(null,e),c()}}else s=l;o.ce&&o.ce._setProp(n,s)}r[0]&&(a&&!i?s=!1:r[1]&&(s===""||s===gn(n))&&(s=!0))}return s}const sp=new WeakMap;function uu(t,e,n=!1){const s=n?sp:e.propsCache,o=s.get(t);if(o)return o;const a=t.props,r={},i=[];let l=!1;if(!xe(t)){const c=d=>{l=!0;const[p,m]=uu(d,e,!0);et(r,p),m&&i.push(...m)};!n&&e.mixins.length&&e.mixins.forEach(c),t.extends&&c(t.extends),t.mixins&&t.mixins.forEach(c)}if(!a&&!l)return je(t)&&s.set(t,ss),ss;if(ge(a))for(let c=0;c<a.length;c++){const d=Ot(a[c]);Qr(d)&&(r[d]=Ae)}else if(a)for(const c in a){const d=Ot(c);if(Qr(d)){const p=a[c],m=r[d]=ge(p)||xe(p)?{type:p}:et({},p),y=m.type;let g=!1,v=!0;if(ge(y))for(let b=0;b<y.length;++b){const w=y[b],S=xe(w)&&w.name;if(S==="Boolean"){g=!0;break}else S==="String"&&(v=!1)}else g=xe(y)&&y.name==="Boolean";m[0]=g,m[1]=v,(g||_e(m,"default"))&&i.push(d)}}const u=[r,i];return je(t)&&s.set(t,u),u}function Qr(t){return t[0]!=="$"&&!Ts(t)}const Sr=t=>t==="_"||t==="_ctx"||t==="$stable",$r=t=>ge(t)?t.map(Kt):[Kt(t)],op=(t,e,n)=>{if(e._n)return e;const s=D((...o)=>$r(e(...o)),n);return s._c=!1,s},cu=(t,e,n)=>{const s=t._ctx;for(const o in t){if(Sr(o))continue;const a=t[o];if(xe(a))e[o]=op(o,a,s);else if(a!=null){const r=$r(a);e[o]=()=>r}}},du=(t,e)=>{const n=$r(e);t.slots.default=()=>n},pu=(t,e,n)=>{for(const s in e)(n||!Sr(s))&&(t[s]=e[s])},ap=(t,e,n)=>{const s=t.slots=ru();if(t.vnode.shapeFlag&32){const o=e._;o?(pu(s,e,n),n&&xl(s,"_",o,!0)):cu(e,s)}else e&&du(t,e)},rp=(t,e,n)=>{const{vnode:s,slots:o}=t;let a=!0,r=Ae;if(s.shapeFlag&32){const i=e._;i?n&&i===1?a=!1:pu(o,e,n):(a=!e.$stable,cu(e,o)),r=e}else e&&(du(t,e),r={default:1});if(a)for(const i in o)!Sr(i)&&r[i]==null&&delete o[i]},bt=dp;function ip(t){return lp(t)}function lp(t,e){const n=Ho();n.__VUE__=!0;const{insert:s,remove:o,patchProp:a,createElement:r,createText:i,createComment:l,setText:u,setElementText:c,parentNode:d,nextSibling:p,setScopeId:m=Wt,insertStaticContent:y}=t,g=(k,E,O,H=null,U=null,F=null,ee=void 0,Q=null,X=!!E.dynamicChildren)=>{if(k===E)return;k&&!xs(k,E)&&(H=V(k),W(k,U,F,!0),k=null),E.patchFlag===-2&&(X=!1,E.dynamicChildren=null);const{type:q,ref:fe,shapeFlag:oe}=E;switch(q){case Wo:v(k,E,O,H);break;case hn:b(k,E,O,H);break;case ha:k==null&&w(E,O,H,ee);break;case te:Se(k,E,O,H,U,F,ee,Q,X);break;default:oe&1?_(k,E,O,H,U,F,ee,Q,X):oe&6?z(k,E,O,H,U,F,ee,Q,X):(oe&64||oe&128)&&q.process(k,E,O,H,U,F,ee,Q,X,ue)}fe!=null&&U?Rs(fe,k&&k.ref,F,E||k,!E):fe==null&&k&&k.ref!=null&&Rs(k.ref,null,F,k,!0)},v=(k,E,O,H)=>{if(k==null)s(E.el=i(E.children),O,H);else{const U=E.el=k.el;E.children!==k.children&&u(U,E.children)}},b=(k,E,O,H)=>{k==null?s(E.el=l(E.children||""),O,H):E.el=k.el},w=(k,E,O,H)=>{[k.el,k.anchor]=y(k.children,E,O,H,k.el,k.anchor)},S=({el:k,anchor:E},O,H)=>{let U;for(;k&&k!==E;)U=p(k),s(k,O,H),k=U;s(E,O,H)},$=({el:k,anchor:E})=>{let O;for(;k&&k!==E;)O=p(k),o(k),k=O;o(E)},_=(k,E,O,H,U,F,ee,Q,X)=>{if(E.type==="svg"?ee="svg":E.type==="math"&&(ee="mathml"),k==null)P(E,O,H,U,F,ee,Q,X);else{const q=k.el&&k.el._isVueCE?k.el:null;try{q&&q._beginPatch(),N(k,E,U,F,ee,Q,X)}finally{q&&q._endPatch()}}},P=(k,E,O,H,U,F,ee,Q)=>{let X,q;const{props:fe,shapeFlag:oe,transition:ce,dirs:be}=k;if(X=k.el=r(k.type,F,fe&&fe.is,fe),oe&8?c(X,k.children):oe&16&&I(k.children,X,null,H,U,fa(k,F),ee,Q),be&&Rn(k,null,H,"created"),K(X,k,k.scopeId,ee,H),fe){for(const De in fe)De!=="value"&&!Ts(De)&&a(X,De,null,fe[De],F,H);"value"in fe&&a(X,"value",null,fe.value,F),(q=fe.onVnodeBeforeMount)&&Ut(q,H,k)}be&&Rn(k,null,H,"beforeMount");const Ee=up(U,ce);Ee&&ce.beforeEnter(X),s(X,E,O),((q=fe&&fe.onVnodeMounted)||Ee||be)&&bt(()=>{try{q&&Ut(q,H,k),Ee&&ce.enter(X),be&&Rn(k,null,H,"mounted")}finally{}},U)},K=(k,E,O,H,U)=>{if(O&&m(k,O),H)for(let F=0;F<H.length;F++)m(k,H[F]);if(U){let F=U.subTree;if(E===F||gu(F.type)&&(F.ssContent===E||F.ssFallback===E)){const ee=U.vnode;K(k,ee,ee.scopeId,ee.slotScopeIds,U.parent)}}},I=(k,E,O,H,U,F,ee,Q,X=0)=>{for(let q=X;q<k.length;q++){const fe=k[q]=Q?an(k[q]):Kt(k[q]);g(null,fe,E,O,H,U,F,ee,Q)}},N=(k,E,O,H,U,F,ee)=>{const Q=E.el=k.el;let{patchFlag:X,dynamicChildren:q,dirs:fe}=E;X|=k.patchFlag&16;const oe=k.props||Ae,ce=E.props||Ae;let be;if(O&&jn(O,!1),(be=ce.onVnodeBeforeUpdate)&&Ut(be,O,E,k),fe&&Rn(E,k,O,"beforeUpdate"),O&&jn(O,!0),q&&(!k.dynamicChildren||k.dynamicChildren.length!==q.length)&&(X=0,ee=!1,q=null),(oe.innerHTML&&ce.innerHTML==null||oe.textContent&&ce.textContent==null)&&c(Q,""),q?j(k.dynamicChildren,q,Q,O,H,fa(E,U),F):ee||G(k,E,Q,null,O,H,fa(E,U),F,!1),X>0){if(X&16)he(Q,oe,ce,O,U);else if(X&2&&oe.class!==ce.class&&a(Q,"class",null,ce.class,U),X&4&&a(Q,"style",oe.style,ce.style,U),X&8){const Ee=E.dynamicProps;for(let De=0;De<Ee.length;De++){const Ie=Ee[De],Ue=oe[Ie],nt=ce[Ie];(nt!==Ue||Ie==="value")&&a(Q,Ie,Ue,nt,U,O)}}X&1&&k.children!==E.children&&c(Q,E.children)}else!ee&&q==null&&he(Q,oe,ce,O,U);((be=ce.onVnodeUpdated)||fe)&&bt(()=>{be&&Ut(be,O,E,k),fe&&Rn(E,k,O,"updated")},H)},j=(k,E,O,H,U,F,ee)=>{for(let Q=0;Q<E.length;Q++){const X=k[Q],q=E[Q],fe=X.el&&(X.type===te||!xs(X,q)||X.shapeFlag&198)?d(X.el):O;g(X,q,fe,null,H,U,F,ee,!0)}},he=(k,E,O,H,U)=>{if(E!==O){if(E!==Ae)for(const F in E)!Ts(F)&&!(F in O)&&a(k,F,E[F],null,U,H);for(const F in O){if(Ts(F))continue;const ee=O[F],Q=E[F];ee!==Q&&F!=="value"&&a(k,F,Q,ee,U,H)}"value"in O&&a(k,"value",E.value,O.value,U)}},Se=(k,E,O,H,U,F,ee,Q,X)=>{const q=E.el=k?k.el:i(""),fe=E.anchor=k?k.anchor:i("");let{patchFlag:oe,dynamicChildren:ce,slotScopeIds:be}=E;be&&(Q=Q?Q.concat(be):be),k==null?(s(q,O,H),s(fe,O,H),I(E.children||[],O,fe,U,F,ee,Q,X)):oe>0&&oe&64&&ce&&k.dynamicChildren&&k.dynamicChildren.length===ce.length?(j(k.dynamicChildren,ce,O,U,F,ee,Q),(E.key!=null||U&&E===U.subTree)&&fu(k,E,!0)):G(k,E,O,fe,U,F,ee,Q,X)},z=(k,E,O,H,U,F,ee,Q,X)=>{E.slotScopeIds=Q,k==null?E.shapeFlag&512?U.ctx.activate(E,O,H,ee,X):ae(E,O,H,U,F,ee,X):L(k,E,X)},ae=(k,E,O,H,U,F,ee)=>{const Q=k.component=bp(k,H,U);if(Yl(k)&&(Q.ctx.renderer=ue),vp(Q,!1,ee),Q.asyncDep){if(U&&U.registerDep(Q,J,ee),!k.el){const X=Q.subTree=A(hn);b(null,X,E,O),k.placeholder=X.el}}else J(Q,k,E,O,U,F,ee)},L=(k,E,O)=>{const H=E.component=k.component;if(Zd(k,E,O))if(H.asyncDep&&!H.asyncResolved){le(H,E,O);return}else H.next=E,H.update();else E.el=k.el,H.vnode=E},J=(k,E,O,H,U,F,ee)=>{const Q=()=>{if(k.isMounted){let{next:oe,bu:ce,u:be,parent:Ee,vnode:De}=k;{const Ht=hu(k);if(Ht){oe&&(oe.el=De.el,le(k,oe,ee)),Ht.asyncDep.then(()=>{bt(()=>{k.isUnmounted||q()},U)});return}}let Ie=oe,Ue;jn(k,!1),oe?(oe.el=De.el,le(k,oe,ee)):oe=De,ce&&ho(ce),(Ue=oe.props&&oe.props.onVnodeBeforeUpdate)&&Ut(Ue,Ee,oe,De),jn(k,!0);const nt=Xr(k),Ft=k.subTree;k.subTree=nt,g(Ft,nt,d(Ft.el),V(Ft),k,U,F),oe.el=nt.el,Ie===null&&ep(k,nt.el),be&&bt(be,U),(Ue=oe.props&&oe.props.onVnodeUpdated)&&bt(()=>Ut(Ue,Ee,oe,De),U)}else{let oe;const{el:ce,props:be}=E,{bm:Ee,m:De,parent:Ie,root:Ue,type:nt}=k,Ft=rs(E);jn(k,!1),Ee&&ho(Ee),!Ft&&(oe=be&&be.onVnodeBeforeMount)&&Ut(oe,Ie,E),jn(k,!0);{Ue.ce&&Ue.ce._hasShadowRoot()&&Ue.ce._injectChildStyle(nt,k.parent?k.parent.type:void 0);const Ht=k.subTree=Xr(k);g(null,Ht,O,H,k,U,F),E.el=Ht.el}if(De&&bt(De,U),!Ft&&(oe=be&&be.onVnodeMounted)){const Ht=E;bt(()=>Ut(oe,Ie,Ht),U)}(E.shapeFlag&256||Ie&&rs(Ie.vnode)&&Ie.vnode.shapeFlag&256)&&k.a&&bt(k.a,U),k.isMounted=!0,E=O=H=null}};k.scope.on();const X=k.effect=new El(Q);k.scope.off();const q=k.update=X.run.bind(X),fe=k.job=X.runIfDirty.bind(X);fe.i=k,fe.id=k.uid,X.scheduler=()=>vr(fe),jn(k,!0),q()},le=(k,E,O)=>{E.component=k;const H=k.vnode.props;k.vnode=E,k.next=null,np(k,E.props,H,O),rp(k,E.children,O),dn(),zr(k),pn()},G=(k,E,O,H,U,F,ee,Q,X=!1)=>{const q=k&&k.children,fe=k?k.shapeFlag:0,oe=E.children,{patchFlag:ce,shapeFlag:be}=E;if(ce>0){if(ce&128){$e(q,oe,O,H,U,F,ee,Q,X);return}else if(ce&256){re(q,oe,O,H,U,F,ee,Q,X);return}}be&8?(fe&16&&rt(q,U,F),oe!==q&&c(O,oe)):fe&16?be&16?$e(q,oe,O,H,U,F,ee,Q,X):rt(q,U,F,!0):(fe&8&&c(O,""),be&16&&I(oe,O,H,U,F,ee,Q,X))},re=(k,E,O,H,U,F,ee,Q,X)=>{k=k||ss,E=E||ss;const q=k.length,fe=E.length,oe=Math.min(q,fe);let ce;for(ce=0;ce<oe;ce++){const be=E[ce]=X?an(E[ce]):Kt(E[ce]);g(k[ce],be,O,null,U,F,ee,Q,X)}q>fe?rt(k,U,F,!0,!1,oe):I(E,O,H,U,F,ee,Q,X,oe)},$e=(k,E,O,H,U,F,ee,Q,X)=>{let q=0;const fe=E.length;let oe=k.length-1,ce=fe-1;for(;q<=oe&&q<=ce;){const be=k[q],Ee=E[q]=X?an(E[q]):Kt(E[q]);if(xs(be,Ee))g(be,Ee,O,null,U,F,ee,Q,X);else break;q++}for(;q<=oe&&q<=ce;){const be=k[oe],Ee=E[ce]=X?an(E[ce]):Kt(E[ce]);if(xs(be,Ee))g(be,Ee,O,null,U,F,ee,Q,X);else break;oe--,ce--}if(q>oe){if(q<=ce){const be=ce+1,Ee=be<fe?E[be].el:H;for(;q<=ce;)g(null,E[q]=X?an(E[q]):Kt(E[q]),O,Ee,U,F,ee,Q,X),q++}}else if(q>ce)for(;q<=oe;)W(k[q],U,F,!0),q++;else{const be=q,Ee=q,De=new Map;for(q=Ee;q<=ce;q++){const xt=E[q]=X?an(E[q]):Kt(E[q]);xt.key!=null&&De.set(xt.key,q)}let Ie,Ue=0;const nt=ce-Ee+1;let Ft=!1,Ht=0;const ys=new Array(nt);for(q=0;q<nt;q++)ys[q]=0;for(q=be;q<=oe;q++){const xt=k[q];if(Ue>=nt){W(xt,U,F,!0);continue}let Vt;if(xt.key!=null)Vt=De.get(xt.key);else for(Ie=Ee;Ie<=ce;Ie++)if(ys[Ie-Ee]===0&&xs(xt,E[Ie])){Vt=Ie;break}Vt===void 0?W(xt,U,F,!0):(ys[Vt-Ee]=q+1,Vt>=Ht?Ht=Vt:Ft=!0,g(xt,E[Vt],O,null,U,F,ee,Q,X),Ue++)}const Nr=Ft?cp(ys):ss;for(Ie=Nr.length-1,q=nt-1;q>=0;q--){const xt=Ee+q,Vt=E[xt],Pr=E[xt+1],Br=xt+1<fe?Pr.el||mu(Pr):H;ys[q]===0?g(null,Vt,O,Br,U,F,ee,Q,X):Ft&&(Ie<0||q!==Nr[Ie]?tt(Vt,O,Br,2):Ie--)}}},tt=(k,E,O,H,U=null)=>{const{el:F,type:ee,transition:Q,children:X,shapeFlag:q}=k;if(q&6){tt(k.component.subTree,E,O,H);return}if(q&128){k.suspense.move(E,O,H);return}if(q&64){ee.move(k,E,O,ue);return}if(ee===te){s(F,E,O);for(let oe=0;oe<X.length;oe++)tt(X[oe],E,O,H);s(k.anchor,E,O);return}if(ee===ha){S(k,E,O);return}if(H!==2&&q&1&&Q)if(H===0)Q.persisted&&!F[da]?s(F,E,O):(Q.beforeEnter(F),s(F,E,O),bt(()=>Q.enter(F),U));else{const{leave:oe,delayLeave:ce,afterLeave:be}=Q,Ee=()=>{k.ctx.isUnmounted?o(F):s(F,E,O)},De=()=>{const Ie=F._isLeaving||!!F[da];F._isLeaving&&F[da](!0),Q.persisted&&!Ie?Ee():oe(F,()=>{Ee(),be&&be()})};ce?ce(F,Ee,De):De()}else s(F,E,O)},W=(k,E,O,H=!1,U=!1)=>{const{type:F,props:ee,ref:Q,children:X,dynamicChildren:q,shapeFlag:fe,patchFlag:oe,dirs:ce,cacheIndex:be,memo:Ee}=k;if(oe===-2&&(U=!1),Q!=null&&(dn(),Rs(Q,null,O,k,!0),pn()),be!=null&&(E.renderCache[be]=void 0),fe&256){E.ctx.deactivate(k);return}const De=fe&1&&ce,Ie=!rs(k);let Ue;if(Ie&&(Ue=ee&&ee.onVnodeBeforeUnmount)&&Ut(Ue,E,k),fe&6)qe(k.component,O,H);else{if(fe&128){k.suspense.unmount(O,H);return}De&&Rn(k,null,E,"beforeUnmount"),fe&64?k.type.remove(k,E,O,ue,H):q&&!q.hasOnce&&(F!==te||oe>0&&oe&64)?rt(q,E,O,!1,!0):(F===te&&oe&384||!U&&fe&16)&&rt(X,E,O),H&&me(k)}const nt=Ee!=null&&be==null;(Ie&&(Ue=ee&&ee.onVnodeUnmounted)||De||nt)&&bt(()=>{Ue&&Ut(Ue,E,k),De&&Rn(k,null,E,"unmounted"),nt&&(k.el=null)},O)},me=k=>{const{type:E,el:O,anchor:H,transition:U}=k;if(E===te){Te(O,H);return}if(E===ha){$(k);return}const F=()=>{o(O),U&&!U.persisted&&U.afterLeave&&U.afterLeave()};if(k.shapeFlag&1&&U&&!U.persisted){const{leave:ee,delayLeave:Q}=U,X=()=>ee(O,F);Q?Q(k.el,F,X):X()}else F()},Te=(k,E)=>{let O;for(;k!==E;)O=p(k),o(k),k=O;o(E)},qe=(k,E,O)=>{const{bum:H,scope:U,job:F,subTree:ee,um:Q,m:X,a:q}=k;Zr(X),Zr(q),H&&ho(H),U.stop(),F&&(F.flags|=8,W(ee,k,E,O)),Q&&bt(Q,E),bt(()=>{k.isUnmounted=!0},E)},rt=(k,E,O,H=!1,U=!1,F=0)=>{for(let ee=F;ee<k.length;ee++)W(k[ee],E,O,H,U)},V=k=>{if(k.shapeFlag&6)return V(k.component.subTree);if(k.shapeFlag&128)return k.suspense.next();const E=p(k.anchor||k.el),O=E&&E[Td];return O?p(O):E};let ie=!1;const ne=(k,E,O)=>{let H;k==null?E._vnode&&(W(E._vnode,null,null,!0),H=E._vnode.component):g(E._vnode||null,k,E,null,null,null,O),E._vnode=k,ie||(ie=!0,zr(H),zl(),ie=!1)},ue={p:g,um:W,m:tt,r:me,mt:ae,mc:I,pc:G,pbc:j,n:V,o:t};return{render:ne,hydrate:void 0,createApp:Wd(ne)}}function fa({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function jn({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function up(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function fu(t,e,n=!1){const s=t.children,o=e.children;if(ge(s)&&ge(o))for(let a=0;a<s.length;a++){const r=s[a];let i=o[a];i.shapeFlag&1&&!i.dynamicChildren&&((i.patchFlag<=0||i.patchFlag===32)&&(i=o[a]=an(o[a]),i.el=r.el),!n&&i.patchFlag!==-2&&fu(r,i)),i.type===Wo&&(i.patchFlag===-1&&(i=o[a]=an(i)),i.el=r.el),i.type===hn&&!i.el&&(i.el=r.el)}}function cp(t){const e=t.slice(),n=[0];let s,o,a,r,i;const l=t.length;for(s=0;s<l;s++){const u=t[s];if(u!==0){if(o=n[n.length-1],t[o]<u){e[s]=o,n.push(s);continue}for(a=0,r=n.length-1;a<r;)i=a+r>>1,t[n[i]]<u?a=i+1:r=i;u<t[n[a]]&&(a>0&&(e[s]=n[a-1]),n[a]=s)}}for(a=n.length,r=n[a-1];a-- >0;)n[a]=r,r=e[r];return n}function hu(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:hu(e)}function Zr(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}function mu(t){if(t.placeholder)return t.placeholder;const e=t.component;return e?mu(e.subTree):null}const gu=t=>t.__isSuspense;function dp(t,e){e&&e.pendingBranch?ge(t)?e.effects.push(...t):e.effects.push(t):Sd(t)}const te=Symbol.for("v-fgt"),Wo=Symbol.for("v-txt"),hn=Symbol.for("v-cmt"),ha=Symbol.for("v-stc"),un=[];let $t=null;function x(t=!1){un.push($t=t?null:[])}function Er(){un.pop(),$t=un[un.length-1]||null}let Fs=1;function Co(t,e=!1){Fs+=t,t<0&&$t&&e&&($t.hasOnce=!0)}function bu(t){return t.dynamicChildren=Fs>0?$t||ss:null,Er(),Fs>0&&$t&&$t.push(t),t}function T(t,e,n,s,o,a){return bu(h(t,e,n,s,o,a,!0))}function Y(t,e,n,s,o){return bu(A(t,e,n,s,o,!0))}function Hs(t){return t?t.__v_isVNode===!0:!1}function xs(t,e){return t.type===e.type&&t.key===e.key}const vu=({key:t})=>t??null,go=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?He(t)||dt(t)||xe(t)?{i:lt,r:t,k:e,f:!!n}:t:null);function h(t,e=null,n=null,s=0,o=null,a=t===te?0:1,r=!1,i=!1){const l={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&vu(e),ref:e&&go(e),scopeId:Kl,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:a,patchFlag:s,dynamicProps:o,dynamicChildren:null,appContext:null,ctx:lt};return i?(Ao(l,n),a&128&&t.normalize(l)):n&&(l.shapeFlag|=He(n)?8:16),Fs>0&&!r&&$t&&(l.patchFlag>0||a&6)&&l.patchFlag!==32&&$t.push(l),l}const A=pp;function pp(t,e=null,n=null,s=0,o=null,a=!1){if((!t||t===Fd)&&(t=hn),Hs(t)){const i=ds(t,e,!0);return n&&Ao(i,n),Fs>0&&!a&&$t&&(i.shapeFlag&6?$t[$t.indexOf(t)]=i:$t.push(i)),i.patchFlag=-2,i}if(kp(t)&&(t=t.__vccOpts),e){e=fp(e);let{class:i,style:l}=e;i&&!He(i)&&(e.class=ve(i)),je(l)&&(gr(l)&&!ge(l)&&(l=et({},l)),e.style=cn(l))}const r=He(t)?1:gu(t)?128:Od(t)?64:je(t)?4:xe(t)?2:0;return h(t,e,n,s,o,r,a,!0)}function fp(t){return t?gr(t)||iu(t)?et({},t):t:null}function ds(t,e,n=!1,s=!1){const{props:o,ref:a,patchFlag:r,children:i,transition:l}=t,u=e?hp(o||{},e):o,c={__v_isVNode:!0,__v_skip:!0,type:t.type,props:u,key:u&&vu(u),ref:e&&e.ref?n&&a?ge(a)?a.concat(go(e)):[a,go(e)]:go(e):a,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:i,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==te?r===-1?16:r|16:r,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:l,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&ds(t.ssContent),ssFallback:t.ssFallback&&ds(t.ssFallback),placeholder:t.placeholder,el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce};return l&&s&&wr(c,l.clone(c)),c}function M(t=" ",e=0){return A(Wo,null,t,e)}function pe(t="",e=!1){return e?(x(),Y(hn,null,t)):A(hn,null,t)}function Kt(t){return t==null||typeof t=="boolean"?A(hn):ge(t)?A(te,null,t.slice()):Hs(t)?an(t):A(Wo,null,String(t))}function an(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:ds(t)}function Ao(t,e){let n=0;const{shapeFlag:s}=t;if(e==null)e=null;else if(ge(e))n=16;else if(typeof e=="object")if(s&65){const o=e.default;o&&(o._c&&(o._d=!1),Ao(t,o()),o._c&&(o._d=!0));return}else{n=32;const o=e._;!o&&!iu(e)?e._ctx=lt:o===3&&lt&&(lt.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else if(xe(e)){if(s&65){Ao(t,{default:e});return}e={default:e,_ctx:lt},n=32}else e=String(e),s&64?(n=16,e=[M(e)]):n=8;t.children=e,t.shapeFlag|=n}function hp(...t){const e={};for(let n=0;n<t.length;n++){const s=t[n];for(const o in s)if(o==="class")e.class!==s.class&&(e.class=ve([e.class,s.class]));else if(o==="style")e.style=cn([e.style,s.style]);else if(Lo(o)){const a=e[o],r=s[o];r&&a!==r&&!(ge(a)&&a.includes(r))?e[o]=a?[].concat(a,r):r:r==null&&a==null&&!No(o)&&(e[o]=r)}else o!==""&&(e[o]=s[o])}return e}function Ut(t,e,n,s=null){Pt(t,e,7,[n,s])}const mp=tu();let gp=0;function bp(t,e,n){const s=t.type,o=(e?e.appContext:t.appContext)||mp,a={uid:gp++,vnode:t,type:s,parent:e,appContext:o,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Gc(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(o.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:uu(s,o),emitsOptions:su(s,o),emit:null,emitted:null,propsDefaults:Ae,inheritAttrs:s.inheritAttrs,ctx:Ae,data:Ae,props:Ae,attrs:Ae,slots:Ae,refs:Ae,setupState:Ae,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return a.ctx={_:a},a.root=e?e.root:a,a.emit=Yd.bind(null,a),t.ce&&t.ce(a),a}let gt=null;const yu=()=>gt||lt;let To,Fa;{const t=Ho(),e=(n,s)=>{let o;return(o=t[n])||(o=t[n]=[]),o.push(s),a=>{o.length>1?o.forEach(r=>r(a)):o[0](a)}};To=e("__VUE_INSTANCE_SETTERS__",n=>gt=n),Fa=e("__VUE_SSR_SETTERS__",n=>Vs=n)}const Xs=t=>{const e=gt;return To(t),t.scope.on(),()=>{t.scope.off(),To(e)}},ei=()=>{gt&&gt.scope.off(),To(null)};function wu(t){return t.vnode.shapeFlag&4}let Vs=!1;function vp(t,e=!1,n=!1){e&&Fa(e);const{props:s,children:o}=t.vnode,a=wu(t);tp(t,s,a,e),ap(t,o,n||e);const r=a?yp(t,e):void 0;return e&&Fa(!1),r}function yp(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,Hd);const{setup:s}=n;if(s){dn();const o=t.setupContext=s.length>1?xp(t):null,a=Xs(t),r=Ys(s,t,0,[t.props,o]),i=bl(r);if(pn(),a(),(i||t.sp)&&!rs(t)&&Wl(t),i){if(r.then(ei,ei),e)return r.then(l=>{ti(t,l)}).catch(l=>{qo(l,t,0)});t.asyncDep=r}else ti(t,r)}else xu(t)}function ti(t,e,n){xe(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:je(e)&&(t.setupState=Hl(e)),xu(t)}function xu(t,e,n){const s=t.type;t.render||(t.render=s.render||Wt);{const o=Xs(t);dn();try{Vd(t)}finally{pn(),o()}}}const wp={get(t,e){return it(t,"get",""),t[e]}};function xp(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,wp),slots:t.slots,emit:t.emit,expose:e}}function Yo(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(Hl(pd(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in js)return js[n](t)},has(e,n){return n in e||n in js}})):t.proxy}function kp(t){return xe(t)&&"__vccOpts"in t}const C=(t,e)=>vd(t,e,Vs);function ku(t,e,n){try{Co(-1);const s=arguments.length;return s===2?je(e)&&!ge(e)?Hs(e)?A(t,null,[e]):A(t,e):A(t,null,e):(s>3?n=Array.prototype.slice.call(arguments,2):s===3&&Hs(n)&&(n=[n]),A(t,e,n))}finally{Co(1)}}const Sp="3.5.40";/**
* @vue/runtime-dom v3.5.40
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Ha;const ni=typeof window<"u"&&window.trustedTypes;if(ni)try{Ha=ni.createPolicy("vue",{createHTML:t=>t})}catch{}const Su=Ha?t=>Ha.createHTML(t):t=>t,$p="http://www.w3.org/2000/svg",Ep="http://www.w3.org/1998/Math/MathML",on=typeof document<"u"?document:null,si=on&&on.createElement("template"),Cp={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,s)=>{const o=e==="svg"?on.createElementNS($p,t):e==="mathml"?on.createElementNS(Ep,t):n?on.createElement(t,{is:n}):on.createElement(t);return t==="select"&&s&&s.multiple!=null&&o.setAttribute("multiple",s.multiple),o},createText:t=>on.createTextNode(t),createComment:t=>on.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>on.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,s,o,a){const r=n?n.previousSibling:e.lastChild;if(o&&(o===a||o.nextSibling))for(;e.insertBefore(o.cloneNode(!0),n),!(o===a||!(o=o.nextSibling)););else{si.innerHTML=Su(s==="svg"?`<svg>${t}</svg>`:s==="mathml"?`<math>${t}</math>`:t);const i=si.content;if(s==="svg"||s==="mathml"){const l=i.firstChild;for(;l.firstChild;)i.appendChild(l.firstChild);i.removeChild(l)}e.insertBefore(i,n)}return[r?r.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},Ap=Symbol("_vtc");function Tp(t,e,n){const s=t[Ap];s&&(e=(e?[e,...s]:[...s]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const oi=Symbol("_vod"),Op=Symbol("_vsh"),Mp=Symbol(""),_p=/(?:^|;)\s*display\s*:/;function Rp(t,e,n){const s=t.style,o=He(n);let a=!1;if(n&&!o){if(e)if(He(e))for(const r of e.split(";")){const i=r.slice(0,r.indexOf(":")).trim();n[i]==null&&Cs(s,i,"")}else for(const r in e)n[r]==null&&Cs(s,r,"");for(const r in n){r==="display"&&(a=!0);const i=n[r];i!=null?Ip(t,r,!He(e)&&e?e[r]:void 0,i)||Cs(s,r,i):Cs(s,r,"")}}else if(o){if(e!==n){const r=s[Mp];r&&(n+=";"+r),s.cssText=n,a=_p.test(n)}}else e&&t.removeAttribute("style");oi in t&&(t[oi]=a?s.display:"",t[Op]&&(s.display="none"))}const ai=/\s*!important$/;function Cs(t,e,n){if(ge(n))n.forEach(s=>Cs(t,e,s));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const s=jp(t,e);ai.test(n)?t.setProperty(gn(s),n.replace(ai,""),"important"):t[s]=n}}const ri=["Webkit","Moz","ms"],ma={};function jp(t,e){const n=ma[e];if(n)return n;let s=Ot(e);if(s!=="filter"&&s in t)return ma[e]=s;s=wl(s);for(let o=0;o<ri.length;o++){const a=ri[o]+s;if(a in t)return ma[e]=a}return e}function Ip(t,e,n,s){return t.tagName==="TEXTAREA"&&(e==="width"||e==="height")&&He(s)&&n===s}const ii="http://www.w3.org/1999/xlink";function li(t,e,n,s,o,a=zc(e)){s&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(ii,e.slice(6,e.length)):t.setAttributeNS(ii,e,n):n==null||a&&!kl(n)?t.removeAttribute(e):t.setAttribute(e,a?"":Lt(n)?String(n):n)}function ui(t,e,n,s,o){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?Su(n):n);return}const a=t.tagName;if(e==="value"&&a!=="PROGRESS"&&!a.includes("-")){const i=a==="OPTION"?t.getAttribute("value")||"":t.value,l=n==null?t.type==="checkbox"?"on":"":String(n);(i!==l||!("_value"in t))&&(t.value=l),n==null&&t.removeAttribute(e),t._value=n;return}let r=!1;if(n===""||n==null){const i=typeof t[e];i==="boolean"?n=kl(n):n==null&&i==="string"?(n="",r=!0):i==="number"&&(n=0,r=!0)}try{t[e]=n}catch{}r&&t.removeAttribute(o||e)}function Dn(t,e,n,s){t.addEventListener(e,n,s)}function Dp(t,e,n,s){t.removeEventListener(e,n,s)}const ci=Symbol("_vei");function Lp(t,e,n,s,o=null){const a=t[ci]||(t[ci]={}),r=a[e];if(s&&r)r.value=s;else{const[i,l]=Bp(e);if(s){const u=a[e]=Vp(s,o);Dn(t,i,u,l)}else r&&(Dp(t,i,r,l),a[e]=void 0)}}const Np=/(Once|Passive|Capture)$/,Pp=/^on:?(?:Once|Passive|Capture)$/;function Bp(t){let e,n;for(;(n=t.match(Np))&&!Pp.test(t);)e||(e={}),t=t.slice(0,t.length-n[1].length),e[n[1].toLowerCase()]=!0;return[t[2]===":"?t.slice(3):gn(t.slice(2)),e]}let ga=0;const Fp=Promise.resolve(),Hp=()=>ga||(Fp.then(()=>ga=0),ga=Date.now());function Vp(t,e){const n=s=>{if(!s._vts)s._vts=Date.now();else if(s._vts<=n.attached)return;const o=n.value;if(ge(o)){const a=s.stopImmediatePropagation;s.stopImmediatePropagation=()=>{a.call(s),s._stopped=!0};const r=o.slice(),i=[s];for(let l=0;l<r.length&&!s._stopped;l++){const u=r[l];u&&Pt(u,e,5,i)}}else Pt(o,e,5,[s])};return n.value=t,n.attached=Hp(),n}const di=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,Up=(t,e,n,s,o,a)=>{const r=o==="svg";e==="class"?Tp(t,s,r):e==="style"?Rp(t,n,s):Lo(e)?No(e)||Lp(t,e,n,s,a):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):zp(t,e,s,r))?(ui(t,e,s),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&li(t,e,s,r,a,e!=="value")):t._isVueCE&&(qp(t,e)||t._def.__asyncLoader&&(/[A-Z]/.test(e)||!He(s)))?ui(t,Ot(e),s,a,e):(e==="true-value"?t._trueValue=s:e==="false-value"&&(t._falseValue=s),li(t,e,s,r))};function zp(t,e,n,s){if(s)return!!(e==="innerHTML"||e==="textContent"||e in t&&di(e)&&xe(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="sandbox"&&t.tagName==="IFRAME"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const o=t.tagName;if(o==="IMG"||o==="VIDEO"||o==="CANVAS"||o==="SOURCE")return!1}return di(e)&&He(n)?!1:e in t}function qp(t,e){const n=t._def.props;if(!n)return!1;const s=Ot(e);return Array.isArray(n)?n.some(o=>Ot(o)===s):Object.keys(n).some(o=>Ot(o)===s)}const Oo=t=>{const e=t.props["onUpdate:modelValue"]||!1;return ge(e)?n=>ho(e,n):e};function Kp(t){t.target.composing=!0}function pi(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const ls=Symbol("_assign");function fi(t,e,n){return e&&(t=t.trim()),n&&(t=Fo(t)),t}const Mo={created(t,{modifiers:{lazy:e,trim:n,number:s}},o){t[ls]=Oo(o);const a=s||o.props&&o.props.type==="number";Dn(t,e?"change":"input",r=>{r.target.composing||t[ls](fi(t.value,n,a))}),(n||a)&&Dn(t,"change",()=>{t.value=fi(t.value,n,a)}),e||(Dn(t,"compositionstart",Kp),Dn(t,"compositionend",pi),Dn(t,"change",pi))},mounted(t,{value:e}){t.value=e??""},beforeUpdate(t,{value:e,oldValue:n,modifiers:{lazy:s,trim:o,number:a}},r){if(t[ls]=Oo(r),t.composing)return;const i=(a||t.type==="number")&&!/^0\d/.test(t.value)?Fo(t.value):t.value,l=e??"";if(i===l)return;const u=t.getRootNode();(u instanceof Document||u instanceof ShadowRoot)&&u.activeElement===t&&t.type!=="range"&&(s&&e===n||o&&t.value.trim()===l)||(t.value=l)}},Gp={deep:!0,created(t,{value:e,modifiers:{number:n}},s){t._modelValue=e,Dn(t,"change",()=>{const o=Array.prototype.filter.call(t.options,a=>a.selected).map(a=>n?Fo(_o(a)):_o(a));t[ls](t.multiple?Po(t._modelValue)?new Set(o):o:o[0]),t._assigning=!0,hs(()=>{t._assigning=!1})}),t[ls]=Oo(s)},mounted(t,{value:e}){hi(t,e)},beforeUpdate(t,{value:e},n){t._modelValue=e,t[ls]=Oo(n)},updated(t,{value:e}){t._assigning||hi(t,e)}};function hi(t,e){const n=t.multiple,s=ge(e);if(!(n&&!s&&!Po(e))){for(let o=0,a=t.options.length;o<a;o++){const r=t.options[o],i=_o(r);if(n)if(s){const l=typeof i;l==="string"||l==="number"?r.selected=e.some(u=>String(u)===String(i)):r.selected=Kc(e,i)>-1}else r.selected=e.has(i);else if(Ws(_o(r),e)){t.selectedIndex!==o&&(t.selectedIndex=o);return}}!n&&t.selectedIndex!==-1&&(t.selectedIndex=-1)}}function _o(t){return"_value"in t?t._value:t.value}const Wp=["ctrl","shift","alt","meta"],Yp={stop:t=>t.stopPropagation(),prevent:t=>t.preventDefault(),self:t=>t.target!==t.currentTarget,ctrl:t=>!t.ctrlKey,shift:t=>!t.shiftKey,alt:t=>!t.altKey,meta:t=>!t.metaKey,left:t=>"button"in t&&t.button!==0,middle:t=>"button"in t&&t.button!==1,right:t=>"button"in t&&t.button!==2,exact:(t,e)=>Wp.some(n=>t[`${n}Key`]&&!e.includes(n))},tn=(t,e)=>{if(!t)return t;const n=t._withMods||(t._withMods={}),s=e.join(".");return n[s]||(n[s]=(o,...a)=>{for(let r=0;r<e.length;r++){const i=Yp[e[r]];if(i&&i(o,e))return}return t(o,...a)})},Xp={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},Rt=(t,e)=>{const n=t._withKeys||(t._withKeys={}),s=e.join(".");return n[s]||(n[s]=o=>{if(!("key"in o))return;const a=gn(o.key);if(e.some(r=>r===a||Xp[r]===a))return t(o)})},Jp=et({patchProp:Up},Cp);let mi;function Qp(){return mi||(mi=ip(Jp))}const Zp=(...t)=>{const e=Qp().createApp(...t),{mount:n}=e;return e.mount=s=>{const o=tf(s);if(!o)return;const a=e._component;!xe(a)&&!a.render&&!a.template&&(a.template=o.innerHTML),o.nodeType===1&&(o.textContent="");const r=n(o,!1,ef(o));return o instanceof Element&&(o.removeAttribute("v-cloak"),o.setAttribute("data-v-app","")),r},e};function ef(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function tf(t){return He(t)?document.querySelector(t):t}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const Zn=typeof document<"u";function $u(t){return typeof t=="object"||"displayName"in t||"props"in t||"__vccOpts"in t}function nf(t){return t.__esModule||t[Symbol.toStringTag]==="Module"||t.default&&$u(t.default)}const Oe=Object.assign;function ba(t,e){const n={};for(const s in e){const o=e[s];n[s]=Bt(o)?o.map(t):t(o)}return n}const Is=()=>{},Bt=Array.isArray;function gi(t,e){const n={};for(const s in t)n[s]=s in e?e[s]:t[s];return n}const Eu=/#/g,sf=/&/g,of=/\//g,af=/=/g,rf=/\?/g,Cu=/\+/g,lf=/%5B/g,uf=/%5D/g,Au=/%5E/g,cf=/%60/g,Tu=/%7B/g,df=/%7C/g,Ou=/%7D/g,pf=/%20/g;function Cr(t){return t==null?"":encodeURI(""+t).replace(df,"|").replace(lf,"[").replace(uf,"]")}function ff(t){return Cr(t).replace(Tu,"{").replace(Ou,"}").replace(Au,"^")}function Va(t){return Cr(t).replace(Cu,"%2B").replace(pf,"+").replace(Eu,"%23").replace(sf,"%26").replace(cf,"`").replace(Tu,"{").replace(Ou,"}").replace(Au,"^")}function hf(t){return Va(t).replace(af,"%3D")}function mf(t){return Cr(t).replace(Eu,"%23").replace(rf,"%3F")}function gf(t){return mf(t).replace(of,"%2F")}function Us(t){if(t==null)return null;try{return decodeURIComponent(""+t)}catch{}return""+t}const bf=/\/$/,vf=t=>t.replace(bf,"");function va(t,e,n="/"){let s,o={},a="",r="";const i=e.indexOf("#");let l=e.indexOf("?");return l=i>=0&&l>i?-1:l,l>=0&&(s=e.slice(0,l),a=e.slice(l,i>0?i:e.length),o=t(a.slice(1))),i>=0&&(s=s||e.slice(0,i),r=e.slice(i,e.length)),s=kf(s??e,n),{fullPath:s+a+r,path:s,query:o,hash:Us(r)}}function yf(t,e){const n=e.query?t(e.query):"";return e.path+(n&&"?")+n+(e.hash||"")}function bi(t,e){return!e||!t.toLowerCase().startsWith(e.toLowerCase())?t:t.slice(e.length)||"/"}function wf(t,e,n){const s=e.matched.length-1,o=n.matched.length-1;return s>-1&&s===o&&ps(e.matched[s],n.matched[o])&&Mu(e.params,n.params)&&t(e.query)===t(n.query)&&e.hash===n.hash}function ps(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function Mu(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(var n in t)if(!xf(t[n],e[n]))return!1;return!0}function xf(t,e){return Bt(t)?vi(t,e):Bt(e)?vi(e,t):(t==null?void 0:t.valueOf())===(e==null?void 0:e.valueOf())}function vi(t,e){return Bt(e)?t.length===e.length&&t.every((n,s)=>n===e[s]):t.length===1&&t[0]===e}function kf(t,e){if(t.startsWith("/"))return t;if(!t)return e;const n=e.split("/"),s=t.split("/"),o=s[s.length-1];(o===".."||o===".")&&s.push("");let a=n.length-1,r,i;for(r=0;r<s.length;r++)if(i=s[r],i!==".")if(i==="..")a>1&&a--;else break;return n.slice(0,a).join("/")+"/"+s.slice(r).join("/")}const $n={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let Ua=function(t){return t.pop="pop",t.push="push",t}({}),ya=function(t){return t.back="back",t.forward="forward",t.unknown="",t}({});function Sf(t){if(!t)if(Zn){const e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^\w+:\/\/[^\/]+/,"")}else t="/";return t[0]!=="/"&&t[0]!=="#"&&(t="/"+t),vf(t)}const $f=/^[^#]+#/;function Ef(t,e){return t.replace($f,"#")+e}function Cf(t,e){const n=document.documentElement.getBoundingClientRect(),s=t.getBoundingClientRect();return{behavior:e.behavior,left:s.left-n.left-(e.left||0),top:s.top-n.top-(e.top||0)}}const Xo=()=>({left:window.scrollX,top:window.scrollY});function Af(t){let e;if("el"in t){const n=t.el,s=typeof n=="string"&&n.startsWith("#"),o=typeof n=="string"?s?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!o)return;e=Cf(o,t)}else e=t;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function yi(t,e){return(history.state?history.state.position-e:-1)+t}const za=new Map;function Tf(t,e){za.set(t,e)}function Of(t){const e=za.get(t);return za.delete(t),e}function Mf(t){return typeof t=="string"||t&&typeof t=="object"}function _u(t){return typeof t=="string"||typeof t=="symbol"}let Fe=function(t){return t[t.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",t[t.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",t[t.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",t[t.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",t[t.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",t}({});const Ru=Symbol("");Fe.MATCHER_NOT_FOUND+"",Fe.NAVIGATION_GUARD_REDIRECT+"",Fe.NAVIGATION_ABORTED+"",Fe.NAVIGATION_CANCELLED+"",Fe.NAVIGATION_DUPLICATED+"";function fs(t,e){return Oe(new Error,{type:t,[Ru]:!0},e)}function nn(t,e){return t instanceof Error&&Ru in t&&(e==null||!!(t.type&e))}const _f=["params","query","hash"];function Rf(t){if(typeof t=="string")return t;if(t.path!=null)return t.path;const e={};for(const n of _f)n in t&&(e[n]=t[n]);return JSON.stringify(e,null,2)}function jf(t){const e={};if(t===""||t==="?")return e;const n=(t[0]==="?"?t.slice(1):t).split("&");for(let s=0;s<n.length;++s){const o=n[s].replace(Cu," "),a=o.indexOf("="),r=Us(a<0?o:o.slice(0,a)),i=a<0?null:Us(o.slice(a+1));if(r in e){let l=e[r];Bt(l)||(l=e[r]=[l]),l.push(i)}else e[r]=i}return e}function wi(t){let e="";for(let n in t){const s=t[n];if(n=hf(n),s==null){s!==void 0&&(e+=(e.length?"&":"")+n);continue}(Bt(s)?s.map(o=>o&&Va(o)):[s&&Va(s)]).forEach(o=>{o!==void 0&&(e+=(e.length?"&":"")+n,o!=null&&(e+="="+o))})}return e}function If(t){const e={};for(const n in t){const s=t[n];s!==void 0&&(e[n]=Bt(s)?s.map(o=>o==null?null:""+o):s==null?s:""+s)}return e}const Df=Symbol(""),xi=Symbol(""),Jo=Symbol(""),ju=Symbol(""),qa=Symbol("");function ks(){let t=[];function e(s){return t.push(s),()=>{const o=t.indexOf(s);o>-1&&t.splice(o,1)}}function n(){t=[]}return{add:e,list:()=>t.slice(),reset:n}}function An(t,e,n,s,o,a=r=>r()){const r=s&&(s.enterCallbacks[o]=s.enterCallbacks[o]||[]);return()=>new Promise((i,l)=>{const u=p=>{p===!1?l(fs(Fe.NAVIGATION_ABORTED,{from:n,to:e})):p instanceof Error?l(p):Mf(p)?l(fs(Fe.NAVIGATION_GUARD_REDIRECT,{from:e,to:p})):(r&&s.enterCallbacks[o]===r&&typeof p=="function"&&r.push(p),i())},c=a(()=>t.call(s&&s.instances[o],e,n,u));let d=Promise.resolve(c);t.length<3&&(d=d.then(u)),d.catch(p=>l(p))})}function wa(t,e,n,s,o=a=>a()){const a=[];for(const r of t)for(const i in r.components){let l=r.components[i];if(!(e!=="beforeRouteEnter"&&!r.instances[i]))if($u(l)){const u=(l.__vccOpts||l)[e];u&&a.push(An(u,n,s,r,i,o))}else{let u=l();a.push(()=>u.then(c=>{if(!c)throw new Error(`Couldn't resolve component "${i}" at "${r.path}"`);const d=nf(c)?c.default:c;r.mods[i]=c,r.components[i]=d;const p=(d.__vccOpts||d)[e];return p&&An(p,n,s,r,i,o)()}))}}return a}function Lf(t,e){const n=[],s=[],o=[],a=Math.max(e.matched.length,t.matched.length);for(let r=0;r<a;r++){const i=e.matched[r];i&&(t.matched.find(u=>ps(u,i))?s.push(i):n.push(i));const l=t.matched[r];l&&(e.matched.find(u=>ps(u,l))||o.push(l))}return[n,s,o]}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let Nf=()=>location.protocol+"//"+location.host;function Iu(t,e){const{pathname:n,search:s,hash:o}=e,a=t.indexOf("#");if(a>-1){let r=o.includes(t.slice(a))?t.slice(a).length:1,i=o.slice(r);return i[0]!=="/"&&(i="/"+i),bi(i,"")}return bi(n,t)+s+o}function Pf(t,e,n,s){let o=[],a=[],r=null;const i=({state:p})=>{const m=Iu(t,location),y=n.value,g=e.value;let v=0;if(p){if(n.value=m,e.value=p,r&&r===y){r=null;return}v=g?p.position-g.position:0}else s(m);o.forEach(b=>{b(n.value,y,{delta:v,type:Ua.pop,direction:v?v>0?ya.forward:ya.back:ya.unknown})})};function l(){r=n.value}function u(p){o.push(p);const m=()=>{const y=o.indexOf(p);y>-1&&o.splice(y,1)};return a.push(m),m}function c(){if(document.visibilityState==="hidden"){const{history:p}=window;if(!p.state)return;p.replaceState(Oe({},p.state,{scroll:Xo()}),"")}}function d(){for(const p of a)p();a=[],window.removeEventListener("popstate",i),window.removeEventListener("pagehide",c),document.removeEventListener("visibilitychange",c)}return window.addEventListener("popstate",i),window.addEventListener("pagehide",c),document.addEventListener("visibilitychange",c),{pauseListeners:l,listen:u,destroy:d}}function ki(t,e,n,s=!1,o=!1){return{back:t,current:e,forward:n,replaced:s,position:window.history.length,scroll:o?Xo():null}}function Bf(t){const{history:e,location:n}=window,s={value:Iu(t,n)},o={value:e.state};o.value||a(s.value,{back:null,current:s.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function a(l,u,c){const d=t.indexOf("#"),p=d>-1?(n.host&&document.querySelector("base")?t:t.slice(d))+l:Nf()+t+l;try{e[c?"replaceState":"pushState"](u,"",p),o.value=u}catch(m){console.error(m),n[c?"replace":"assign"](p)}}function r(l,u){a(l,Oe({},e.state,ki(o.value.back,l,o.value.forward,!0),u,{position:o.value.position}),!0),s.value=l}function i(l,u){const c=Oe({},o.value,e.state,{forward:l,scroll:Xo()});a(c.current,c,!0),a(l,Oe({},ki(s.value,l,null),{position:c.position+1},u),!1),s.value=l}return{location:s,state:o,push:i,replace:r}}function Ff(t){t=Sf(t);const e=Bf(t),n=Pf(t,e.state,e.location,e.replace);function s(a,r=!0){r||n.pauseListeners(),history.go(a)}const o=Oe({location:"",base:t,go:s,createHref:Ef.bind(null,t)},e,n);return Object.defineProperty(o,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(o,"state",{enumerable:!0,get:()=>e.state.value}),o}function Hf(t){return t=location.host?t||location.pathname+location.search:"",t.includes("#")||(t+="#"),Ff(t)}let Nn=function(t){return t[t.Static=0]="Static",t[t.Param=1]="Param",t[t.Group=2]="Group",t}({});var Ke=function(t){return t[t.Static=0]="Static",t[t.Param=1]="Param",t[t.ParamRegExp=2]="ParamRegExp",t[t.ParamRegExpEnd=3]="ParamRegExpEnd",t[t.EscapeNext=4]="EscapeNext",t}(Ke||{});const Vf={type:Nn.Static,value:""},Uf=/[a-zA-Z0-9_]/;function zf(t){if(!t)return[[]];if(t==="/")return[[Vf]];if(!t.startsWith("/"))throw new Error(`Invalid path "${t}"`);function e(m){throw new Error(`ERR (${n})/"${u}": ${m}`)}let n=Ke.Static,s=n;const o=[];let a;function r(){a&&o.push(a),a=[]}let i=0,l,u="",c="";function d(){u&&(n===Ke.Static?a.push({type:Nn.Static,value:u}):n===Ke.Param||n===Ke.ParamRegExp||n===Ke.ParamRegExpEnd?(a.length>1&&(l==="*"||l==="+")&&e(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`),a.push({type:Nn.Param,value:u,regexp:c,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):e("Invalid state to consume buffer"),u="")}function p(){u+=l}for(;i<t.length;){if(l=t[i++],l==="\\"&&n!==Ke.ParamRegExp){s=n,n=Ke.EscapeNext;continue}switch(n){case Ke.Static:l==="/"?(u&&d(),r()):l===":"?(d(),n=Ke.Param):p();break;case Ke.EscapeNext:p(),n=s;break;case Ke.Param:l==="("?n=Ke.ParamRegExp:Uf.test(l)?p():(d(),n=Ke.Static,l!=="*"&&l!=="?"&&l!=="+"&&i--);break;case Ke.ParamRegExp:l===")"?c[c.length-1]=="\\"?c=c.slice(0,-1)+l:n=Ke.ParamRegExpEnd:c+=l;break;case Ke.ParamRegExpEnd:d(),n=Ke.Static,l!=="*"&&l!=="?"&&l!=="+"&&i--,c="";break;default:e("Unknown state");break}}return n===Ke.ParamRegExp&&e(`Unfinished custom RegExp for param "${u}"`),d(),r(),o}const Si="[^/]+?",qf={sensitive:!1,strict:!1,start:!0,end:!0};var ft=function(t){return t[t._multiplier=10]="_multiplier",t[t.Root=90]="Root",t[t.Segment=40]="Segment",t[t.SubSegment=30]="SubSegment",t[t.Static=40]="Static",t[t.Dynamic=20]="Dynamic",t[t.BonusCustomRegExp=10]="BonusCustomRegExp",t[t.BonusWildcard=-50]="BonusWildcard",t[t.BonusRepeatable=-20]="BonusRepeatable",t[t.BonusOptional=-8]="BonusOptional",t[t.BonusStrict=.7000000000000001]="BonusStrict",t[t.BonusCaseSensitive=.25]="BonusCaseSensitive",t}(ft||{});const Kf=/[.+*?^${}()[\]/\\]/g;function Gf(t,e){const n=Oe({},qf,e),s=[];let o=n.start?"^":"";const a=[];for(const u of t){const c=u.length?[]:[ft.Root];n.strict&&!u.length&&(o+="/");for(let d=0;d<u.length;d++){const p=u[d];let m=ft.Segment+(n.sensitive?ft.BonusCaseSensitive:0);if(p.type===Nn.Static)d||(o+="/"),o+=p.value.replace(Kf,"\\$&"),m+=ft.Static;else if(p.type===Nn.Param){const{value:y,repeatable:g,optional:v,regexp:b}=p;a.push({name:y,repeatable:g,optional:v});const w=b||Si;if(w!==Si){m+=ft.BonusCustomRegExp;try{`${w}`}catch($){throw new Error(`Invalid custom RegExp for param "${y}" (${w}): `+$.message)}}let S=g?`((?:${w})(?:/(?:${w}))*)`:`(${w})`;d||(S=v&&u.length<2?`(?:/${S})`:"/"+S),v&&(S+="?"),o+=S,m+=ft.Dynamic,v&&(m+=ft.BonusOptional),g&&(m+=ft.BonusRepeatable),w===".*"&&(m+=ft.BonusWildcard)}c.push(m)}s.push(c)}if(n.strict&&n.end){const u=s.length-1;s[u][s[u].length-1]+=ft.BonusStrict}n.strict||(o+="/?"),n.end?o+="$":n.strict&&!o.endsWith("/")&&(o+="(?:/|$)");const r=new RegExp(o,n.sensitive?"":"i");function i(u){const c=u.match(r),d={};if(!c)return null;for(let p=1;p<c.length;p++){const m=c[p]||"",y=a[p-1];d[y.name]=m&&y.repeatable?m.split("/"):m}return d}function l(u){let c="",d=!1;for(const p of t){(!d||!c.endsWith("/"))&&(c+="/"),d=!1;for(const m of p)if(m.type===Nn.Static)c+=m.value;else if(m.type===Nn.Param){const{value:y,repeatable:g,optional:v}=m,b=y in u?u[y]:"";if(Bt(b)&&!g)throw new Error(`Provided param "${y}" is an array but it is not repeatable (* or + modifiers)`);const w=Bt(b)?b.join("/"):b;if(!w)if(v)p.length<2&&(c.endsWith("/")?c=c.slice(0,-1):d=!0);else throw new Error(`Missing required param "${y}"`);c+=w}}return c||"/"}return{re:r,score:s,keys:a,parse:i,stringify:l}}function Wf(t,e){let n=0;for(;n<t.length&&n<e.length;){const s=e[n]-t[n];if(s)return s;n++}return t.length<e.length?t.length===1&&t[0]===ft.Static+ft.Segment?-1:1:t.length>e.length?e.length===1&&e[0]===ft.Static+ft.Segment?1:-1:0}function Du(t,e){let n=0;const s=t.score,o=e.score;for(;n<s.length&&n<o.length;){const a=Wf(s[n],o[n]);if(a)return a;n++}if(Math.abs(o.length-s.length)===1){if($i(s))return 1;if($i(o))return-1}return o.length-s.length}function $i(t){const e=t[t.length-1];return t.length>0&&e[e.length-1]<0}const Yf={strict:!1,end:!0,sensitive:!1};function Xf(t,e,n){const s=Gf(zf(t.path),n),o=Oe(s,{record:t,parent:e,children:[],alias:[]});return e&&!o.record.aliasOf==!e.record.aliasOf&&e.children.push(o),o}function Jf(t,e){const n=[],s=new Map;e=gi(Yf,e);function o(d){return s.get(d)}function a(d,p,m){const y=!m,g=Ci(d);g.aliasOf=m&&m.record;const v=gi(e,d),b=[g];if("alias"in d){const $=typeof d.alias=="string"?[d.alias]:d.alias;for(const _ of $)b.push(Ci(Oe({},g,{components:m?m.record.components:g.components,path:_,aliasOf:m?m.record:g})))}let w,S;for(const $ of b){const{path:_}=$;if(p&&_[0]!=="/"){const P=p.record.path,K=P[P.length-1]==="/"?"":"/";$.path=p.record.path+(_&&K+_)}if(w=Xf($,p,v),m?m.alias.push(w):(S=S||w,S!==w&&S.alias.push(w),y&&d.name&&!Ai(w)&&r(d.name)),Lu(w)&&l(w),g.children){const P=g.children;for(let K=0;K<P.length;K++)a(P[K],w,m&&m.children[K])}m=m||w}return S?()=>{r(S)}:Is}function r(d){if(_u(d)){const p=s.get(d);p&&(s.delete(d),n.splice(n.indexOf(p),1),p.children.forEach(r),p.alias.forEach(r))}else{const p=n.indexOf(d);p>-1&&(n.splice(p,1),d.record.name&&s.delete(d.record.name),d.children.forEach(r),d.alias.forEach(r))}}function i(){return n}function l(d){const p=eh(d,n);n.splice(p,0,d),d.record.name&&!Ai(d)&&s.set(d.record.name,d)}function u(d,p){let m,y={},g,v;if("name"in d&&d.name){if(m=s.get(d.name),!m)throw fs(Fe.MATCHER_NOT_FOUND,{location:d});v=m.record.name,y=Oe(Ei(p.params,m.keys.filter(S=>!S.optional).concat(m.parent?m.parent.keys.filter(S=>S.optional):[]).map(S=>S.name)),d.params&&Ei(d.params,m.keys.map(S=>S.name))),g=m.stringify(y)}else if(d.path!=null)g=d.path,m=n.find(S=>S.re.test(g)),m&&(y=m.parse(g),v=m.record.name);else{if(m=p.name?s.get(p.name):n.find(S=>S.re.test(p.path)),!m)throw fs(Fe.MATCHER_NOT_FOUND,{location:d,currentLocation:p});v=m.record.name,y=Oe({},p.params,d.params),g=m.stringify(y)}const b=[];let w=m;for(;w;)b.unshift(w.record),w=w.parent;return{name:v,path:g,params:y,matched:b,meta:Zf(b)}}t.forEach(d=>a(d));function c(){n.length=0,s.clear()}return{addRoute:a,resolve:u,removeRoute:r,clearRoutes:c,getRoutes:i,getRecordMatcher:o}}function Ei(t,e){const n={};for(const s of e)s in t&&(n[s]=t[s]);return n}function Ci(t){const e={path:t.path,redirect:t.redirect,name:t.name,meta:t.meta||{},aliasOf:t.aliasOf,beforeEnter:t.beforeEnter,props:Qf(t),children:t.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in t?t.components||null:t.component&&{default:t.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function Qf(t){const e={},n=t.props||!1;if("component"in t)e.default=n;else for(const s in t.components)e[s]=typeof n=="object"?n[s]:n;return e}function Ai(t){for(;t;){if(t.record.aliasOf)return!0;t=t.parent}return!1}function Zf(t){return t.reduce((e,n)=>Oe(e,n.meta),{})}function eh(t,e){let n=0,s=e.length;for(;n!==s;){const a=n+s>>1;Du(t,e[a])<0?s=a:n=a+1}const o=th(t);return o&&(s=e.lastIndexOf(o,s-1)),s}function th(t){let e=t;for(;e=e.parent;)if(Lu(e)&&Du(t,e)===0)return e}function Lu({record:t}){return!!(t.name||t.components&&Object.keys(t.components).length||t.redirect)}function Ti(t){const e=Yt(Jo),n=Yt(ju),s=C(()=>{const l=f(t.to);return e.resolve(l)}),o=C(()=>{const{matched:l}=s.value,{length:u}=l,c=l[u-1],d=n.matched;if(!c||!d.length)return-1;const p=d.findIndex(ps.bind(null,c));if(p>-1)return p;const m=Oi(l[u-2]);return u>1&&Oi(c)===m&&d[d.length-1].path!==m?d.findIndex(ps.bind(null,l[u-2])):p}),a=C(()=>o.value>-1&&ah(n.params,s.value.params)),r=C(()=>o.value>-1&&o.value===n.matched.length-1&&Mu(n.params,s.value.params));function i(l={}){if(oh(l)){const u=e[f(t.replace)?"replace":"push"](f(t.to)).catch(Is);return t.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>u),u}return Promise.resolve()}return{route:s,href:C(()=>s.value.href),isActive:a,isExactActive:r,navigate:i}}function nh(t){return t.length===1?t[0]:t}const sh=se({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:Ti,setup(t,{slots:e}){const n=Ne(Ti(t)),{options:s}=Yt(Jo),o=C(()=>({[Mi(t.activeClass,s.linkActiveClass,"router-link-active")]:n.isActive,[Mi(t.exactActiveClass,s.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const a=e.default&&nh(e.default(n));return t.custom?a:ku("a",{"aria-current":n.isExactActive?t.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:o.value},a)}}}),zs=sh;function oh(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){const e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function ah(t,e){for(const n in e){const s=e[n],o=t[n];if(typeof s=="string"){if(s!==o)return!1}else if(!Bt(o)||o.length!==s.length||s.some((a,r)=>a.valueOf()!==o[r].valueOf()))return!1}return!0}function Oi(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}const Mi=(t,e,n)=>t??e??n,rh=se({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(t,{attrs:e,slots:n}){const s=Yt(qa),o=C(()=>t.route||s.value),a=Yt(xi,0),r=C(()=>{let u=f(a);const{matched:c}=o.value;let d;for(;(d=c[u])&&!d.components;)u++;return u}),i=C(()=>o.value.matched[r.value]);mo(xi,C(()=>r.value+1)),mo(Df,i),mo(qa,o);const l=B();return Re(()=>[l.value,i.value,t.name],([u,c,d],[p,m,y])=>{c&&(c.instances[d]=u,m&&m!==c&&u&&u===p&&(c.leaveGuards.size||(c.leaveGuards=m.leaveGuards),c.updateGuards.size||(c.updateGuards=m.updateGuards))),u&&c&&(!m||!ps(c,m)||!p)&&(c.enterCallbacks[d]||[]).forEach(g=>g(u))},{flush:"post"}),()=>{const u=o.value,c=t.name,d=i.value,p=d&&d.components[c];if(!p)return _i(n.default,{Component:p,route:u});const m=d.props[c],y=m?m===!0?u.params:typeof m=="function"?m(u):m:null,v=ku(p,Oe({},y,e,{onVnodeUnmounted:b=>{b.component.isUnmounted&&(d.instances[c]=null)},ref:l}));return _i(n.default,{Component:v,route:u})||v}}});function _i(t,e){if(!t)return null;const n=t(e);return n.length===1?n[0]:n}const Nu=rh;function ih(t){const e=Jf(t.routes,t),n=t.parseQuery||jf,s=t.stringifyQuery||wi,o=t.history,a=ks(),r=ks(),i=ks(),l=br($n);let u=$n;Zn&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const c=ba.bind(null,V=>""+V),d=ba.bind(null,gf),p=ba.bind(null,Us);function m(V,ie){let ne,ue;return _u(V)?(ne=e.getRecordMatcher(V),ue=ie):ue=V,e.addRoute(ue,ne)}function y(V){const ie=e.getRecordMatcher(V);ie&&e.removeRoute(ie)}function g(){return e.getRoutes().map(V=>V.record)}function v(V){return!!e.getRecordMatcher(V)}function b(V,ie){if(ie=Oe({},ie||l.value),typeof V=="string"){const O=va(n,V,ie.path),H=e.resolve({path:O.path},ie),U=o.createHref(O.fullPath);return Oe(O,H,{params:p(H.params),hash:Us(O.hash),redirectedFrom:void 0,href:U})}let ne;if(V.path!=null)ne=Oe({},V,{path:va(n,V.path,ie.path).path});else{const O=Oe({},V.params);for(const H in O)O[H]==null&&delete O[H];ne=Oe({},V,{params:d(O)}),ie.params=d(ie.params)}const ue=e.resolve(ne,ie),ke=V.hash||"";ue.params=c(p(ue.params));const k=yf(s,Oe({},V,{hash:ff(ke),path:ue.path})),E=o.createHref(k);return Oe({fullPath:k,hash:ke,query:s===wi?If(V.query):V.query||{}},ue,{redirectedFrom:void 0,href:E})}function w(V){return typeof V=="string"?va(n,V,l.value.path):Oe({},V)}function S(V,ie){if(u!==V)return fs(Fe.NAVIGATION_CANCELLED,{from:ie,to:V})}function $(V){return K(V)}function _(V){return $(Oe(w(V),{replace:!0}))}function P(V,ie){const ne=V.matched[V.matched.length-1];if(ne&&ne.redirect){const{redirect:ue}=ne;let ke=typeof ue=="function"?ue(V,ie):ue;return typeof ke=="string"&&(ke=ke.includes("?")||ke.includes("#")?ke=w(ke):{path:ke},ke.params={}),Oe({query:V.query,hash:V.hash,params:ke.path!=null?{}:V.params},ke)}}function K(V,ie){const ne=u=b(V),ue=l.value,ke=V.state,k=V.force,E=V.replace===!0,O=P(ne,ue);if(O)return K(Oe(w(O),{state:typeof O=="object"?Oe({},ke,O.state):ke,force:k,replace:E}),ie||ne);const H=ne;H.redirectedFrom=ie;let U;return!k&&wf(s,ue,ne)&&(U=fs(Fe.NAVIGATION_DUPLICATED,{to:H,from:ue}),tt(ue,ue,!0,!1)),(U?Promise.resolve(U):j(H,ue)).catch(F=>nn(F)?nn(F,Fe.NAVIGATION_GUARD_REDIRECT)?F:$e(F):G(F,H,ue)).then(F=>{if(F){if(nn(F,Fe.NAVIGATION_GUARD_REDIRECT))return K(Oe({replace:E},w(F.to),{state:typeof F.to=="object"?Oe({},ke,F.to.state):ke,force:k}),ie||H)}else F=Se(H,ue,!0,E,ke);return he(H,ue,F),F})}function I(V,ie){const ne=S(V,ie);return ne?Promise.reject(ne):Promise.resolve()}function N(V){const ie=Te.values().next().value;return ie&&typeof ie.runWithContext=="function"?ie.runWithContext(V):V()}function j(V,ie){let ne;const[ue,ke,k]=Lf(V,ie);ne=wa(ue.reverse(),"beforeRouteLeave",V,ie);for(const O of ue)O.leaveGuards.forEach(H=>{ne.push(An(H,V,ie))});const E=I.bind(null,V,ie);return ne.push(E),rt(ne).then(()=>{ne=[];for(const O of a.list())ne.push(An(O,V,ie));return ne.push(E),rt(ne)}).then(()=>{ne=wa(ke,"beforeRouteUpdate",V,ie);for(const O of ke)O.updateGuards.forEach(H=>{ne.push(An(H,V,ie))});return ne.push(E),rt(ne)}).then(()=>{ne=[];for(const O of k)if(O.beforeEnter)if(Bt(O.beforeEnter))for(const H of O.beforeEnter)ne.push(An(H,V,ie));else ne.push(An(O.beforeEnter,V,ie));return ne.push(E),rt(ne)}).then(()=>(V.matched.forEach(O=>O.enterCallbacks={}),ne=wa(k,"beforeRouteEnter",V,ie,N),ne.push(E),rt(ne))).then(()=>{ne=[];for(const O of r.list())ne.push(An(O,V,ie));return ne.push(E),rt(ne)}).catch(O=>nn(O,Fe.NAVIGATION_CANCELLED)?O:Promise.reject(O))}function he(V,ie,ne){i.list().forEach(ue=>N(()=>ue(V,ie,ne)))}function Se(V,ie,ne,ue,ke){const k=S(V,ie);if(k)return k;const E=ie===$n,O=Zn?history.state:{};ne&&(ue||E?o.replace(V.fullPath,Oe({scroll:E&&O&&O.scroll},ke)):o.push(V.fullPath,ke)),l.value=V,tt(V,ie,ne,E),$e()}let z;function ae(){z||(z=o.listen((V,ie,ne)=>{if(!qe.listening)return;const ue=b(V),ke=P(ue,qe.currentRoute.value);if(ke){K(Oe(ke,{replace:!0,force:!0}),ue).catch(Is);return}u=ue;const k=l.value;Zn&&Tf(yi(k.fullPath,ne.delta),Xo()),j(ue,k).catch(E=>nn(E,Fe.NAVIGATION_ABORTED|Fe.NAVIGATION_CANCELLED)?E:nn(E,Fe.NAVIGATION_GUARD_REDIRECT)?(K(Oe(w(E.to),{force:!0}),ue).then(O=>{nn(O,Fe.NAVIGATION_ABORTED|Fe.NAVIGATION_DUPLICATED)&&!ne.delta&&ne.type===Ua.pop&&o.go(-1,!1)}).catch(Is),Promise.reject()):(ne.delta&&o.go(-ne.delta,!1),G(E,ue,k))).then(E=>{E=E||Se(ue,k,!1),E&&(ne.delta&&!nn(E,Fe.NAVIGATION_CANCELLED)?o.go(-ne.delta,!1):ne.type===Ua.pop&&nn(E,Fe.NAVIGATION_ABORTED|Fe.NAVIGATION_DUPLICATED)&&o.go(-1,!1)),he(ue,k,E)}).catch(Is)}))}let L=ks(),J=ks(),le;function G(V,ie,ne){$e(V);const ue=J.list();return ue.length?ue.forEach(ke=>ke(V,ie,ne)):console.error(V),Promise.reject(V)}function re(){return le&&l.value!==$n?Promise.resolve():new Promise((V,ie)=>{L.add([V,ie])})}function $e(V){return le||(le=!V,ae(),L.list().forEach(([ie,ne])=>V?ne(V):ie()),L.reset()),V}function tt(V,ie,ne,ue){const{scrollBehavior:ke}=t;if(!Zn||!ke)return Promise.resolve();const k=!ne&&Of(yi(V.fullPath,0))||(ue||!ne)&&history.state&&history.state.scroll||null;return hs().then(()=>ke(V,ie,k)).then(E=>E&&Af(E)).catch(E=>G(E,V,ie))}const W=V=>o.go(V);let me;const Te=new Set,qe={currentRoute:l,listening:!0,addRoute:m,removeRoute:y,clearRoutes:e.clearRoutes,hasRoute:v,getRoutes:g,resolve:b,options:t,push:$,replace:_,go:W,back:()=>W(-1),forward:()=>W(1),beforeEach:a.add,beforeResolve:r.add,afterEach:i.add,onError:J.add,isReady:re,install(V){V.component("RouterLink",zs),V.component("RouterView",Nu),V.config.globalProperties.$router=qe,Object.defineProperty(V.config.globalProperties,"$route",{enumerable:!0,get:()=>f(l)}),Zn&&!me&&l.value===$n&&(me=!0,$(o.location).catch(ue=>{}));const ie={};for(const ue in $n)Object.defineProperty(ie,ue,{get:()=>l.value[ue],enumerable:!0});V.provide(Jo,qe),V.provide(ju,Bl(ie)),V.provide(qa,l);const ne=V.unmount;Te.add(V),V.unmount=function(){Te.delete(V),Te.size<1&&(u=$n,z&&z(),z=null,l.value=$n,me=!1,le=!1),ne()}}};function rt(V){return V.reduce((ie,ne)=>ie.then(()=>N(ne)),Promise.resolve())}return qe}function lh(){return Yt(Jo)}const Be=(t,e,n,s,o,a,r)=>({array:[...t],comparing:e,swapping:n,sorted:[...s],comparisons:o,swaps:a,done:!1,line:r}),_t=(t,e,n,s)=>({array:[...t],comparing:[],swapping:[],sorted:t.map((o,a)=>a),comparisons:e,swaps:n,done:!0,line:s});function*uh(t){const e=[...t],n=e.length,s=new Set;let o=0,a=0;for(let r=0;r<n-1;r++){for(let i=0;i<n-1-r;i++)o++,yield Be(e,[i,i+1],[],s,o,a,2),e[i]>e[i+1]&&([e[i],e[i+1]]=[e[i+1],e[i]],a++,yield Be(e,[],[i,i+1],s,o,a,3));s.add(n-1-r)}s.add(0),yield _t(e,o,a,5)}function*ch(t){const e=[...t],n=e.length,s=new Set;let o=0,a=0;for(let r=0;r<n;r++){let i=r;for(let l=r+1;l<n;l++)o++,yield Be(e,[i,l],[],s,o,a,3),e[l]<e[i]&&(i=l);i!==r&&([e[r],e[i]]=[e[i],e[r]],a++,yield Be(e,[],[r,i],s,o,a,5)),s.add(r)}yield _t(e,o,a,7)}function*dh(t){const e=[...t],n=e.length,s=new Set;let o=0,a=0;for(let r=1;r<n;r++){let i=r;for(;i>0&&(o++,yield Be(e,[i-1,i],[],s,o,a,2),e[i-1]>e[i]);)[e[i-1],e[i]]=[e[i],e[i-1]],a++,yield Be(e,[],[i-1,i],s,o,a,3),i--}yield _t(e,o,a,5)}function*ph(t){const e=[...t],n=new Set;let s=0,o=0;function*a(r,i){if(i-r<=1)return;const l=r+i>>1;yield*a(r,l),yield*a(l,i);const u=[];let c=r,d=l;for(;c<l&&d<i;)s++,yield Be(e,[c,d],[],n,s,o,5),e[c]<=e[d]?u.push(e[c++]):u.push(e[d++]);for(;c<l;)u.push(e[c++]);for(;d<i;)u.push(e[d++]);for(let p=0;p<u.length;p++)e[r+p]=u[p],o++,yield Be(e,[],[r+p],n,s,o,7)}yield*a(0,e.length),yield _t(e,s,o,8)}function*fh(t){const e=[...t],n=new Set;let s=0,o=0;function*a(r,i){if(r>i)return;if(r===i){n.add(r);return}const l=e[i];let u=r;for(let c=r;c<i;c++)s++,yield Be(e,[c,i],[],n,s,o,4),e[c]<l&&(u!==c&&([e[u],e[c]]=[e[c],e[u]],o++,yield Be(e,[],[u,c],n,s,o,5)),u++);u!==i&&([e[u],e[i]]=[e[i],e[u]],o++,yield Be(e,[],[u,i],n,s,o,6)),n.add(u),yield*a(r,u-1),yield*a(u+1,i)}yield*a(0,e.length-1),yield _t(e,s,o,8)}function*hh(t){const e=[...t],n=e.length,s=new Set;let o=0,a=0;function*r(i,l){for(;2*i+1<=l;){let u=2*i+1;if(u+1<=l&&(o++,yield Be(e,[u,u+1],[],s,o,a,2),e[u]<e[u+1]&&u++),o++,yield Be(e,[i,u],[],s,o,a,3),e[i]<e[u])[e[i],e[u]]=[e[u],e[i]],a++,yield Be(e,[],[i,u],s,o,a,4),i=u;else return}}for(let i=(n>>1)-1;i>=0;i--)yield*r(i,n-1);for(let i=n-1;i>0;i--)[e[0],e[i]]=[e[i],e[0]],a++,yield Be(e,[],[0,i],s,o,a,8),s.add(i),yield*r(0,i-1);s.add(0),yield _t(e,o,a,10)}function*mh(t){const e=[...t],n=e.length,s=new Set;let o=0,a=0;for(let r=Math.floor(n/2);r>0;r=Math.floor(r/2))for(let i=r;i<n;i++){let l=i;for(;l>=r&&(o++,yield Be(e,[l-r,l],[],s,o,a,3),e[l-r]>e[l]);)[e[l-r],e[l]]=[e[l],e[l-r]],a++,yield Be(e,[],[l-r,l],s,o,a,4),l-=r}yield _t(e,o,a,6)}const gh=1.3;function*bh(t){const e=[...t],n=e.length,s=new Set;let o=0,a=0,r=n,i=!0;for(;r>1||i;){r=Math.floor(r/gh),r<1&&(r=1),i=!1;for(let l=0;l+r<n;l++)o++,yield Be(e,[l,l+r],[],s,o,a,5),e[l]>e[l+r]&&([e[l],e[l+r]]=[e[l+r],e[l]],a++,i=!0,yield Be(e,[],[l,l+r],s,o,a,6))}yield _t(e,o,a,7)}function*vh(t){const e=[...t],n=e.length,s=new Set,o=0;let a=0;if(n===0){yield _t(e,o,a,8);return}const r=Math.max(...e),i=new Array(r+1).fill(0);for(let u=0;u<n;u++)yield Be(e,[u],[],s,o,a,2),i[e[u]]++;for(let u=1;u<=r;u++)i[u]+=i[u-1];const l=new Array(n).fill(0);for(let u=n-1;u>=0;u--){const c=e[u],d=--i[c];l[d]=c,a++,yield Be(l,[],[d],s,o,a,7)}yield _t(l,o,a,8)}const so=10;function*yh(t){let e=[...t];const n=e.length,s=new Set,o=0;let a=0;if(n===0){yield _t(e,o,a,11);return}const r=Math.max(...e);for(let i=1;Math.floor(r/i)>0;i*=so){const l=d=>Math.floor(d/i)%so,u=new Array(so).fill(0);for(let d=0;d<n;d++)yield Be(e,[d],[],s,o,a,4),u[l(e[d])]++;for(let d=1;d<so;d++)u[d]+=u[d-1];const c=new Array(n).fill(0);for(let d=n-1;d>=0;d--){const p=--u[l(e[d])];c[p]=e[d],a++,yield Be(c,[],[p],s,o,a,9)}e=c}yield _t(e,o,a,11)}const us={bubble:{name:"Bubble Sort",generator:uh,description:"Repeatedly compares adjacent elements and swaps them if out of order, letting the largest values bubble to the end each pass.",complexity:{best:"O(n)",average:"O(n²)",worst:"O(n²)",space:"O(1)"},stable:!0},selection:{name:"Selection Sort",generator:ch,description:"Scans the unsorted region for the minimum element and swaps it into place, growing a sorted prefix from the front.",complexity:{best:"O(n²)",average:"O(n²)",worst:"O(n²)",space:"O(1)"},stable:!1},insertion:{name:"Insertion Sort",generator:dh,description:"Builds the sorted array one item at a time by shifting each new element left until it sits in the correct spot.",complexity:{best:"O(n)",average:"O(n²)",worst:"O(n²)",space:"O(1)"},stable:!0},merge:{name:"Merge Sort",generator:ph,description:"Divides the array in half recursively, sorts each half, then merges the sorted halves back together. Consistent O(n log n).",complexity:{best:"O(n log n)",average:"O(n log n)",worst:"O(n log n)",space:"O(n)"},stable:!0},quick:{name:"Quick Sort",generator:fh,description:"Partitions the array around a pivot so smaller values sit left and larger right, then recurses into each side. Fast in practice.",complexity:{best:"O(n log n)",average:"O(n log n)",worst:"O(n²)",space:"O(log n)"},stable:!1},heap:{name:"Heap Sort",generator:hh,description:"Builds a max-heap, then repeatedly moves the largest element to the end and re-heapifies the shrinking heap.",complexity:{best:"O(n log n)",average:"O(n log n)",worst:"O(n log n)",space:"O(1)"},stable:!1},shell:{name:"Shell Sort",generator:mh,description:"Generalizes insertion sort by comparing and swapping elements far apart first, shrinking the gap each pass until a final gap-1 pass leaves the array sorted.",complexity:{best:"O(n log n)",average:"O(n^1.5)",worst:"O(n²)",space:"O(1)"},stable:!1},comb:{name:"Comb Sort",generator:bh,description:"Improves bubble sort by comparing elements separated by a shrinking gap (÷1.3 each pass) instead of only adjacent ones, clearing small trailing values much faster.",complexity:{best:"O(n log n)",average:"O(n²/2ᵖ)",worst:"O(n²)",space:"O(1)"},stable:!1},counting:{name:"Counting Sort",generator:vh,description:"Counts how many times each value occurs, turns those counts into placement offsets, and drops every element straight into its final slot — no comparisons needed.",complexity:{best:"O(n + k)",average:"O(n + k)",worst:"O(n + k)",space:"O(n + k)"},stable:!0},radix:{name:"Radix Sort",generator:yh,description:"Sorts integers one decimal digit at a time, least significant first, using a stable counting sort per digit until every digit position has been processed.",complexity:{best:"O(d·(n + b))",average:"O(d·(n + b))",worst:"O(d·(n + b))",space:"O(n + b)"},stable:!0}},Gn=(t,e,n,s,o,a,r)=>({array:[...t],low:e,high:n,mid:s,checking:o,target:a,foundIndex:null,comparisons:r,done:!1}),Et=(t,e,n,s)=>({array:[...t],low:null,high:null,mid:null,checking:null,target:e,foundIndex:n,comparisons:s,done:!0});function*wh(t,e){const n=[...t],s=n.length;let o=0;for(let a=0;a<s;a++)if(o++,yield Gn(n,0,s-1,null,a,e,o),n[a]===e){yield Et(n,e,a,o);return}yield Et(n,e,null,o)}function*xh(t,e){const n=[...t];let s=0,o=n.length-1,a=0;for(;s<=o;){const r=Math.floor((s+o)/2);if(a++,yield Gn(n,s,o,r,r,e,a),n[r]===e){yield Et(n,e,r,a);return}n[r]<e?s=r+1:o=r-1}yield Et(n,e,null,a)}function*kh(t,e){const n=[...t],s=n.length;let o=0;if(s===0){yield Et(n,e,null,o);return}const a=Math.max(1,Math.floor(Math.sqrt(s)));let r=0,i=Math.min(a,s)-1;for(;;){if(o++,yield Gn(n,r,i,null,i,e,o),n[i]===e){yield Et(n,e,i,o);return}if(n[i]>e||i===s-1)break;r=i+1,i=Math.min(i+a,s-1)}for(let l=r;l<i;l++)if(o++,yield Gn(n,r,i,null,l,e,o),n[l]===e){yield Et(n,e,l,o);return}yield Et(n,e,null,o)}function*Sh(t,e){const n=[...t];let s=0,o=n.length-1,a=0;for(;s<=o&&e>=n[s]&&e<=n[o];){let r;if(n[s]===n[o]?r=s:r=s+Math.floor((e-n[s])*(o-s)/(n[o]-n[s])),a++,yield Gn(n,s,o,r,r,e,a),n[r]===e){yield Et(n,e,r,a);return}n[r]<e?s=r+1:o=r-1}yield Et(n,e,null,a)}function*$h(t,e){const n=[...t],s=n.length;let o=0,a=0,r=1;for(;r<s;){if(o++,yield Gn(n,a,r,null,r,e,o),n[r]===e){yield Et(n,e,r,o);return}if(n[r]>e)break;a=r,r*=2}let i=Math.min(r,s-1);for(;a<=i;){const l=Math.floor((a+i)/2);if(o++,yield Gn(n,a,i,l,l,e,o),n[l]===e){yield Et(n,e,l,o);return}n[l]<e?a=l+1:i=l-1}yield Et(n,e,null,o)}const Qo={linear:{name:"Linear Search",generator:wh,description:"Scans the array from left to right, comparing each element to the target until a match is found or every element has been checked.",complexity:{best:"O(1)",average:"O(n)",worst:"O(n)",space:"O(1)"}},binary:{name:"Binary Search",generator:xh,description:"Repeatedly compares the target to the middle element of a sorted array and discards the half that cannot contain it, halving the search range each step.",complexity:{best:"O(1)",average:"O(log n)",worst:"O(log n)",space:"O(1)"}},jump:{name:"Jump Search",generator:kh,description:"Advances through a sorted array in fixed-size blocks of about √n, testing only the last element of each block, then falls back to a linear scan of the block where the target must lie.",complexity:{best:"O(1)",average:"O(√n)",worst:"O(√n)",space:"O(1)"}},interpolation:{name:"Interpolation Search",generator:Sh,description:"Estimates where the target should be by linearly interpolating between the values at the low and high ends of the search range, rather than always probing the midpoint like binary search.",complexity:{best:"O(1)",average:"O(log log n)",worst:"O(n)",space:"O(1)"}},exponential:{name:"Exponential Search",generator:$h,description:"Doubles a bound (1, 2, 4, 8, ...) until it overshoots the target, then binary searches within the range that doubling identified.",complexity:{best:"O(1)",average:"O(log n)",worst:"O(log n)",space:"O(1)"}}},ms=(t,e,n)=>({visited:[...t],frontier:[...e],current:n,path:[],done:!1}),Ye=(t,e)=>({visited:[...t],frontier:[],current:null,path:[...e],done:!0}),gs=[[-1,0],[1,0],[0,-1],[0,1]],Je=(t,e)=>`${t},${e}`;function bs(t){const e=t.length,n=e>0?t[0].length:0,s=(a,r)=>a>=0&&a<e&&r>=0&&r<n;return{rows:e,cols:n,inBounds:s,isOpen:(a,r)=>s(a,r)&&t[a][r]===0}}function Js(t,e){const n=[e];let s=Je(e.row,e.col);for(;t.has(s);){const o=t.get(s);n.push(o),s=Je(o.row,o.col)}return n.reverse()}function*Eh(t,e,n){const{isOpen:s}=bs(t);if(!s(e.row,e.col)||!s(n.row,n.col)){yield Ye([],[]);return}const o=new Map,a=new Set([Je(e.row,e.col)]),r=[],i=[e];for(;i.length>0;){const l=i.shift();if(r.push(l),yield ms(r,i,l),l.row===n.row&&l.col===n.col){yield Ye(r,Js(o,n));return}for(const[u,c]of gs){const d=l.row+u,p=l.col+c;if(!s(d,p))continue;const m=Je(d,p);a.has(m)||(a.add(m),o.set(m,l),i.push({row:d,col:p}))}}yield Ye(r,[])}function*Ch(t,e,n){const{isOpen:s}=bs(t);if(!s(e.row,e.col)||!s(n.row,n.col)){yield Ye([],[]);return}const o=new Map,a=new Set([Je(e.row,e.col)]),r=[],i=[e];for(;i.length>0;){const l=i.pop();if(r.push(l),yield ms(r,i,l),l.row===n.row&&l.col===n.col){yield Ye(r,Js(o,n));return}for(const[u,c]of gs){const d=l.row+u,p=l.col+c;if(!s(d,p))continue;const m=Je(d,p);a.has(m)||(a.add(m),o.set(m,l),i.push({row:d,col:p}))}}yield Ye(r,[])}function*Ah(t,e,n){const{isOpen:s}=bs(t);if(!s(e.row,e.col)||!s(n.row,n.col)){yield Ye([],[]);return}const o=Je(e.row,e.col),a=new Map([[o,0]]),r=new Map,i=new Set,l=new Map([[o,e]]),u=[];for(;l.size>0;){let c=null,d=null,p=1/0;for(const[m,y]of l){const g=a.get(m);g<p&&(p=g,c=m,d=y)}if(l.delete(c),i.add(c),u.push(d),yield ms(u,[...l.values()],d),d.row===n.row&&d.col===n.col){yield Ye(u,Js(r,n));return}for(const[m,y]of gs){const g=d.row+m,v=d.col+y;if(!s(g,v))continue;const b=Je(g,v);if(i.has(b))continue;const w=p+1;w<(a.get(b)??1/0)&&(a.set(b,w),r.set(b,d),l.set(b,{row:g,col:v}))}}yield Ye(u,[])}function Ri(t,e,n){return Math.abs(t-n.row)+Math.abs(e-n.col)}function*Th(t,e,n){const{isOpen:s}=bs(t);if(!s(e.row,e.col)||!s(n.row,n.col)){yield Ye([],[]);return}const o=Je(e.row,e.col),a=new Map([[o,0]]),r=new Map([[o,Ri(e.row,e.col,n)]]),i=new Map,l=new Set,u=new Map([[o,e]]),c=[];for(;u.size>0;){let d=null,p=null,m=1/0;for(const[g,v]of u){const b=r.get(g)??1/0;b<m&&(m=b,d=g,p=v)}if(u.delete(d),l.add(d),c.push(p),yield ms(c,[...u.values()],p),p.row===n.row&&p.col===n.col){yield Ye(c,Js(i,n));return}const y=a.get(d);for(const[g,v]of gs){const b=p.row+g,w=p.col+v;if(!s(b,w))continue;const S=Je(b,w);if(l.has(S))continue;const $=y+1;$<(a.get(S)??1/0)&&(a.set(S,$),r.set(S,$+Ri(b,w,n)),i.set(S,p),u.set(S,{row:b,col:w}))}}yield Ye(c,[])}function*Oh(t,e,n){const{rows:s,cols:o,isOpen:a}=bs(t);if(!a(e.row,e.col)||!a(n.row,n.col)){yield Ye([],[]);return}const r=[];for(let c=0;c<s;c++)for(let d=0;d<o;d++)a(c,d)&&r.push({row:c,col:d});const i=new Map([[Je(e.row,e.col),0]]),l=new Map,u=[e];for(let c=0;c<r.length-1;c++){const d=[];for(const p of r){const m=i.get(Je(p.row,p.col));if(m!==void 0)for(const[y,g]of gs){const v=p.row+y,b=p.col+g;if(!a(v,b))continue;const w=Je(v,b),S=m+1,$=i.get(w);$!==void 0&&S>=$||($===void 0&&u.push({row:v,col:b}),i.set(w,S),l.set(w,p),d.push({row:v,col:b}),yield ms(u,d,{row:v,col:b}))}}if(d.length===0)break}if(!i.has(Je(n.row,n.col))){yield Ye(u,[]);return}yield Ye(u,Js(l,n))}const Mh=600;function*_h(t,e,n){const{rows:s,cols:o,isOpen:a}=bs(t);if(!a(e.row,e.col)||!a(n.row,n.col)){yield Ye([],[]);return}const r=[],i=new Map;for(let v=0;v<s;v++)for(let b=0;b<o;b++)a(v,b)&&(i.set(Je(v,b),r.length),r.push({row:v,col:b}));const l=r.length;if(l>Mh){yield Ye([],[]);return}const u=new Float64Array(l*l).fill(1/0),c=new Int32Array(l*l).fill(-1);for(let v=0;v<l;v++){u[v*l+v]=0,c[v*l+v]=v;const{row:b,col:w}=r[v];for(const[S,$]of gs){const _=i.get(Je(b+S,w+$));_!==void 0&&(u[v*l+_]=1,c[v*l+_]=_)}}const d=i.get(Je(e.row,e.col)),p=i.get(Je(n.row,n.col)),m=()=>{const v=[];for(let b=0;b<l;b++)u[d*l+b]!==1/0&&v.push(r[b]);return v};for(let v=0;v<l;v++){const b=v*l,w=[];for(let S=0;S<l;S++){const $=S*l,_=u[$+v];if(_!==1/0)for(let P=0;P<l;P++){const K=_+u[b+P];K>=u[$+P]||(u[$+P]=K,c[$+P]=c[$+v],S===d&&w.push(r[P]))}}yield ms(m(),[r[v],...w],r[v])}if(c[d*l+p]===-1){yield Ye(m(),[]);return}const y=[r[d]];let g=d;for(;g!==p;)g=c[g*l+p],y.push(r[g]);yield Ye(m(),y)}const Zo={bfs:{name:"BFS",generator:Eh,description:"Explores the grid ring by ring using a FIFO queue. Guarantees the shortest path on this unweighted grid, since every step costs the same.",complexity:{best:"O(rows×cols)",average:"O(rows×cols)",worst:"O(rows×cols)",space:"O(rows×cols)"}},dfs:{name:"DFS",generator:Ch,description:"Dives down one path as far as possible before backtracking. Finds *a* connected path to the goal but does NOT guarantee the shortest one.",complexity:{best:"O(rows×cols)",average:"O(rows×cols)",worst:"O(rows×cols)",space:"O(rows×cols)"}},dijkstra:{name:"Dijkstra",generator:Ah,description:"Settles the unvisited cell with the smallest known distance each round (uniform edge weight of 1). This implementation selects that cell with a plain array scan rather than a binary heap, so it is honestly O((rows×cols)²) worst case, not the idealized heap-backed O(E log V).",complexity:{best:"O((rows×cols)²)",average:"O((rows×cols)²)",worst:"O((rows×cols)²)",space:"O(rows×cols)"}},astar:{name:"A*",generator:Th,description:"Like Dijkstra, but prioritizes cells by distance-so-far plus a Manhattan-distance estimate to the goal, so it usually expands far fewer cells. Still selects the next cell via a plain array scan, so the worst case remains O((rows×cols)²), same as this Dijkstra implementation — the heuristic helps in practice, not in the asymptotic bound.",complexity:{best:"O(rows×cols)",average:"O((rows×cols)²)",worst:"O((rows×cols)²)",space:"O(rows×cols)"}},bellmanFord:{name:"Bellman-Ford",generator:Oh,description:"Sweeps the entire edge list over and over, letting better distances trickle one hop further per pass, until a whole pass changes nothing. It reaches the same answer as Dijkstra far more slowly and with no priority queue at all — watch the frontier collapse and rebuild to see where one pass ends and the next begins. Unlike the four searches above it never stops early at the goal: it has no way to know a distance is final until the sweeps settle, so it always solves for every reachable cell.",complexity:{best:"O(rows×cols)",average:"O((rows+cols)×rows×cols)",worst:"O((rows×cols)²)",space:"O(rows×cols)"}},floydWarshall:{name:"Floyd-Warshall",generator:_h,description:"The all-pairs algorithm: instead of searching, it fills a full every-cell-to-every-cell distance table by letting each cell in turn act as an intermediate stop. The single amber cell marching through the grid is that pivot; the answer to this particular query is one row of the table, read out at the end. Genuinely cubic — it does roughly 30 million relaxations on this grid to answer a question BFS answers in 375 — and it is here to show that shape, not to compete.",complexity:{best:"O((rows×cols)³)",average:"O((rows×cols)³)",worst:"O((rows×cols)³)",space:"O((rows×cols)²)"}}};function*Rh(t,e){const n=[],s=new Set,o=[];if(!t.has(e)){yield{visited:n,frontier:[],current:null,done:!0};return}for(o.push(e),s.add(e);o.length>0;){const a=o.shift();n.push(a);for(const r of t.get(a)??[])s.has(r)||(s.add(r),o.push(r));yield{visited:[...n],frontier:[...o],current:a,done:!1}}yield{visited:[...n],frontier:[],current:null,done:!0}}function*jh(t,e){const n=[],s=new Set,o=[];if(!t.has(e)){yield{visited:n,frontier:[],current:null,done:!0};return}for(o.push(e);o.length>0;){const a=o.pop();if(s.has(a))continue;s.add(a),n.push(a);const r=t.get(a)??[];for(let i=r.length-1;i>=0;i--){const l=r[i];s.has(l)||o.push(l)}yield{visited:[...n],frontier:[...o],current:a,done:!1}}yield{visited:[...n],frontier:[],current:null,done:!0}}function*Ih(t,e){const n=[],s=new Set;if(!t.has(e)){yield{visited:n,frontier:[],current:null,done:!0};return}const o=[e,...[...t.keys()].filter(a=>a!==e)];for(const a of o){if(s.has(a))continue;const r=[[a,null]];for(;r.length>0;){const[i,l]=r.pop();if(s.has(i))continue;s.add(i),n.push(i);const u=t.get(i)??[];let c=!1;for(let d=u.length-1;d>=0;d--){const p=u[d];if(!c&&p===l){c=!0;continue}if(s.has(p)){yield{visited:[...n],frontier:[],current:p,done:!0};return}r.push([p,i])}yield{visited:[...n],frontier:r.map(([d])=>d),current:i,done:!1}}}yield{visited:[...n],frontier:[],current:null,done:!0}}function*Dh(t,e){const n=[],s=new Set,o=new Map;if(!t.has(e)){yield{visited:n,frontier:[],current:null,done:!0};return}const a=[e,...[...t.keys()].filter(r=>r!==e)];for(const r of a){if(s.has(r))continue;const i=[r];for(s.add(r),o.set(r,0);i.length>0;){const l=i.shift();n.push(l);const u=o.get(l),c=u===0?1:0;for(const d of t.get(l)??[])if(!s.has(d))s.add(d),o.set(d,c),i.push(d);else if(o.get(d)===u){yield{visited:[...n],frontier:[...i],current:d,done:!0};return}yield{visited:[...n],frontier:[...i],current:l,done:!1}}}yield{visited:[...n],frontier:[],current:null,done:!0}}const ea={bfs:{name:"BFS Traversal",generator:Rh,description:"Explores the graph level by level from the start node, visiting every neighbor of the current node before moving deeper, using a queue to track the frontier.",complexity:{time:"O(V + E)",space:"O(V)"}},dfs:{name:"DFS Traversal",generator:jh,description:"Explores as far as possible down one branch from the start node before backtracking, using a stack to track nodes still waiting to be explored.",complexity:{time:"O(V + E)",space:"O(V)"}},"cycle-detection":{name:"Cycle Detection",generator:Ih,description:"Walks the graph depth-first looking for an edge back to an already-visited node other than the one just arrived from — undirected only, and sweeps every component, not just the one the start node reaches, since a cycle elsewhere still counts.",complexity:{time:"O(V + E)",space:"O(V)"}},"bipartite-check":{name:"Bipartite Check",generator:Dh,description:"Attempts to 2-colour the graph breadth-first, alternating colour with every hop; finds no valid colouring exists the moment an edge connects two same-coloured nodes. Checks every component, since one component alone being bipartite says nothing about the rest.",complexity:{time:"O(V + E)",space:"O(V)"}}},Un=1/0,Ka=900,Lh=2e3;function Ro(t,e){const n=t;if(n.kind!==e.kind)return`This algorithm needs a ${n.kind} input.`;const s=n.validate(e);if(s)return s;const{rows:o,cols:a}=n.dims(e),r=o*a;return r>Ka?`That table would be ${o} x ${a} = ${r} cells; the limit is ${Ka}.`:null}function Pu(t,e){const n=t,s=e.kind===n.kind?e:n.defaults;return{input:s,recurrence:n.recurrence,axes:n.axes(s),dims:n.dims(s),naiveCalls:n.naiveCalls(s),depsOf:(o,a,r)=>n.depsOf(s,o,a,r),generator:()=>n.generator(s)}}function On(t,e){return{table:Array.from({length:t},()=>new Array(e).fill(null)),path:[],cellsFilled:0}}function yt(t,e,n,s){t.table[e][n]===null&&(t.cellsFilled+=1),t.table[e][n]=s}function At(t,e){t.path.push({row:e.row,col:e.col})}function Yn(t){return{row:t.row,col:t.col}}function Bu(t){return t.map(e=>[...e])}function Ce(t,e,n,s,o,a){return{table:Bu(t.table),cursor:e,deps:n,chosen:s,explain:o,path:[...t.path],result:null,cellsFilled:t.cellsFilled,done:!1,line:a}}function Mn(t,e,n,s){return{table:Bu(t.table),cursor:null,deps:[],chosen:null,explain:n,path:[...t.path],result:e,cellsFilled:t.cellsFilled,done:!0,line:s}}function We(t,e,n,s){return{row:e,col:n,label:s,value:t[e][n]}}function wt(t,e){let n=null;for(const s of t)(n===null||(e==="max"?s.score>n.score:s.score<n.score))&&(n=s);return n}function Wn(t){return t===null?"·":t===Un?"∞":String(t)}function Xe(t){return`dp[${t}]`}function ye(t,e){return`dp[${t}][${e}]`}function vs(t,e){return`${t}(${e.map(n=>n.text).join(", ")})`}function It(t,e,n){return`${t} = ${e} = ${Wn(n)}`}function mn(t,e,n){return`${t} = ${Wn(e)}  (${n})`}const Ga=Number.MAX_SAFE_INTEGER;function ut(t,e){const n=t+e;return n>=Ga?Ga:n}function Fu(t){return t>=Ga}function ji(t){return Fu(t)?"> 9.0e15":t<1e6?t.toLocaleString():t.toExponential(1)}function Nh(t){if(t<0)return 0;const e=[1,1];for(let n=2;n<=t;n++)e[n]=ut(1,ut(e[n-1],e[n-2]));return e[Math.min(t,e.length-1)]}function Ph(t,e){if(e<0)return 0;const n=new Array(e+1).fill(0);n[0]=1;for(let s=1;s<=e;s++){let o=1;for(const a of t)a>0&&a<=s&&(o=ut(o,n[s-a]));n[s]=o}return n[e]}function Bh(t){const e=t.length,n=new Array(e).fill(1);let s=0;for(let o=0;o<e;o++){let a=1;for(let r=0;r<o;r++)t[r]<t[o]&&(a=ut(a,n[r]));n[o]=a,s=ut(s,a)}return s}function Hu(t,e){if(e<0)return 0;let n=new Array(e+1).fill(1);for(const s of t){const o=new Array(e+1).fill(0);for(let a=0;a<=e;a++){let r=ut(1,n[a]);s>=0&&s<=a&&(r=ut(r,n[a-s])),o[a]=r}n=o}return n[e]}function Fh(t,e){const n=t.length,s=e.length;let o=new Array(s+1).fill(1);for(let a=1;a<=n;a++){const r=new Array(s+1).fill(1);for(let i=1;i<=s;i++)r[i]=t[a-1]===e[i-1]?ut(1,o[i-1]):ut(1,ut(o[i],r[i-1]));o=r}return o[s]}function Hh(t,e){const n=t.length,s=e.length;let o=new Array(s+1).fill(1);for(let a=1;a<=n;a++){const r=new Array(s+1).fill(1);for(let i=1;i<=s;i++)t[a-1]===e[i-1]?r[i]=ut(1,o[i-1]):r[i]=ut(1,ut(o[i-1],ut(o[i],r[i-1])));o=r}return o[s]}function Vh(t){if(t<=0)return 0;const e=Array.from({length:t},()=>new Array(t).fill(1));for(let n=2;n<=t;n++)for(let s=0;s+n-1<t;s++){const o=s+n-1;let a=1;for(let r=s;r<o;r++)a=ut(a,ut(e[s][r],e[r+1][o]));e[s][o]=a}return e[0][t-1]}function Vu(t,e){if(t<2)return[];const n=We(e,0,t-1,"f(k-1)"),s=We(e,0,t-2,"f(k-2)");return[{deps:[n],score:n.value??0,text:`${Xe(t-1)}=${n.value??0}`},{deps:[s],score:s.value??0,text:`${Xe(t-2)}=${s.value??0}`}]}function Uh(t,e,n,s){return Vu(n,s).flatMap(o=>o.deps)}function*zh(t){const e=t.n,n=On(1,e+1);for(let a=0;a<=e;a++){if(a<2){yt(n,0,a,a);const d={row:0,col:a},p=mn(Xe(a),a,"base case");yield Ce(n,d,[],null,p,0);continue}const r=Vu(a,n.table),i=r.flatMap(d=>d.deps),l=r[0].score+r[1].score;yt(n,0,a,l);const u={row:0,col:a},c=It(Xe(a),r.map(d=>d.text).join(" + "),l);yield Ce(n,u,i,null,c,1)}for(let a=e;a>=0;a--){At(n,{row:0,col:a});const r=`${Xe(a)} = ${n.table[0][a]} contributed to every later cell`;yield Ce(n,null,[],null,r,2)}const s=n.table[0][e]??0,o=`fib(${e}) = ${s}`;yield Mn(n,o,`${Xe(e)} = ${s}`,3)}const qh={kind:"scalar",defaults:{kind:"scalar",n:12},recurrence:"dp[k] = dp[k-1] + dp[k-2]",axes:t=>({rowHeaders:["fib(k)"],colHeaders:Array.from({length:t.n+1},(e,n)=>String(n)),rowTitle:"",colTitle:"k"}),dims:t=>({rows:1,cols:t.n+1,fillable:t.n+1}),validate:t=>Number.isInteger(t.n)&&t.n>=0&&t.n<=40?null:"n must be a whole number from 0 to 40.",depsOf:Uh,generator:zh,naiveCalls:t=>Nh(t.n)};function Wa(t,e,n){if(e===0)return[];const s=[];for(const o of t.coins){if(o>e)continue;const a=We(n,0,e-o,`coin ${o}`),r=a.value??Un,i=r===Un?Un:r+1;s.push({deps:[a],score:i,text:`1+${Xe(e-o)}=${Wn(i)}`})}return s}function Kh(t,e,n,s){return Wa(t,n,s).flatMap(o=>o.deps)}function*Gh(t){const{amount:e}=t,n=On(1,e+1);yt(n,0,0,0),yield Ce(n,{row:0,col:0},[],null,mn(Xe(0),0,"zero coins make 0"),0);for(let l=1;l<=e;l++){const u=Wa(t,l,n.table),c=u.flatMap(v=>v.deps),d=wt(u,"min"),p=d===null?Un:d.score;yt(n,0,l,p);const m={row:0,col:l},y=d!==null&&p!==Un?Yn(d.deps[0]):null,g=u.length===0?mn(Xe(l),p,"no coin is small enough"):It(Xe(l),vs("min",u),p);yield Ce(n,m,c,y,g,2)}const s=[];let o=e;const a=n.table[0][e]!==Un;if(a){At(n,{row:0,col:o});const l=`start at ${Xe(o)} = ${Wn(n.table[0][o])}`;for(yield Ce(n,null,[],null,l,3);o>0;){const u=wt(Wa(t,o,n.table),"min");if(u===null)break;const c=u.deps[0].col,d=o-c;s.push(d),o=c,At(n,{row:0,col:o});const p=`take coin ${d} — ${Xe(o+d)} came from ${Xe(o)}`;yield Ce(n,null,[],null,p,3)}}const r=n.table[0][e],i=a?`${s.join(" + ")} = ${e}  (${s.length} coin${s.length===1?"":"s"})`:`no combination of {${t.coins.join(", ")}} makes ${e}`;yield Mn(n,i,`${Xe(e)} = ${Wn(r)}`,4)}const Wh={kind:"coins",defaults:{kind:"coins",coins:[1,3,4],amount:11},recurrence:"dp[a] = 1 + min(dp[a - c]) over coins c <= a",axes:t=>({rowHeaders:["min coins"],colHeaders:Array.from({length:t.amount+1},(e,n)=>String(n)),rowTitle:"",colTitle:"amount"}),dims:t=>({rows:1,cols:t.amount+1,fillable:t.amount+1}),validate:t=>t.coins.length===0?"Enter at least one coin.":t.coins.some(e=>!Number.isInteger(e)||e<1)?"Coin values must be whole numbers of at least 1.":new Set(t.coins).size!==t.coins.length?"Coin values must be distinct.":!Number.isInteger(t.amount)||t.amount<0?"Amount must be 0 or more.":null,depsOf:Kh,generator:Gh,naiveCalls:t=>Ph(t.coins,t.amount)};function Ya(t,e,n){const s=t.values,o=[];for(let a=0;a<e;a++){if(s[a]>=s[e])continue;const r=We(n,0,a,`a[${a}]=${s[a]}`);o.push({deps:[r],score:(r.value??0)+1,text:`${Xe(a)}=${r.value??0}`})}return o}function Yh(t,e,n,s){return Ya(t,n,s).flatMap(o=>o.deps)}function*Xh(t){const e=t.values,n=e.length,s=On(1,n);for(let c=0;c<n;c++){const d=Ya(t,c,s.table),p=d.flatMap(v=>v.deps),m=wt(d,"max"),y=m===null?1:m.score;yt(s,0,c,y);const g={row:0,col:c};if(m===null){const v=mn(Xe(c),1,`nothing to the left is smaller than ${e[c]}`);yield Ce(s,g,p,null,v,0)}else{const v=`1 + ${vs("max",d)}`,b=It(Xe(c),v,y);yield Ce(s,g,p,Yn(m.deps[0]),b,2)}}let o=-1;for(let c=0;c<n;c++)(o===-1||(s.table[0][c]??0)>(s.table[0][o]??0))&&(o=c);const a=[];let r=o;for(;r>=0;){a.push(r),At(s,{row:0,col:r});const c=`a[${r}]=${e[r]} is in the subsequence (${Xe(r)}=${s.table[0][r]})`;yield Ce(s,null,[],null,c,3);const d=wt(Ya(t,r,s.table),"max");r=d===null?-1:d.deps[0].col}a.reverse();const i=o===-1?0:s.table[0][o]??0,l=a.map(c=>e[c]).join(", "),u=o===-1?"the sequence is empty":`[${l}]  (length ${i})`;yield Mn(s,u,`longest increasing subsequence has length ${i}`,4)}const Jh={kind:"sequence",defaults:{kind:"sequence",values:[3,10,2,1,20,4,6,21,5]},recurrence:"dp[i] = 1 + max(dp[j]) over j < i with a[j] < a[i]",axes:t=>({rowHeaders:["LIS ending here"],colHeaders:t.values.map(String),rowTitle:"",colTitle:"a[i]"}),dims:t=>({rows:1,cols:t.values.length,fillable:t.values.length}),validate:t=>t.values.length===0?"Enter at least one number.":t.values.length>40?"Enter at most 40 numbers.":null,depsOf:Yh,generator:Xh,naiveCalls:t=>Bh(t.values)};function Xa(t,e,n,s){if(e===0)return[];const o=t.items[e-1],a=We(s,e-1,n,"skip"),r=[{deps:[a],score:a.value??0,text:`${ye(e-1,n)}=${a.value??0}`}];if(o.weight<=n){const i=We(s,e-1,n-o.weight,"take"),l=(i.value??0)+o.value,u=ye(e-1,n-o.weight);r.push({deps:[i],score:l,text:`${o.value}+${u}=${l}`})}return r}function Qh(t,e,n,s){return Xa(t,e,n,s).flatMap(o=>o.deps)}function*Zh(t){const{items:e,capacity:n}=t,s=e.length+1,o=On(s,n+1);for(let p=0;p<=n;p++){yt(o,0,p,0);const m={row:0,col:p},y=mn(ye(0,p),0,"no items to choose from");yield Ce(o,m,[],null,y,0)}for(let p=1;p<s;p++)for(let m=0;m<=n;m++){const y=Xa(t,p,m,o.table),g=y.flatMap(_=>_.deps),v=wt(y,"max"),b=v===null?0:v.score;yt(o,p,m,b);const w={row:p,col:m},S=v===null?null:Yn(v.deps[0]),$=It(ye(p,m),vs("max",y),b);yield Ce(o,w,g,S,$,4)}const a=[];let r=s-1,i=n;for(At(o,{row:r,col:i}),yield Ce(o,null,[],null,`start at ${ye(r,i)} = ${o.table[r][i]}`,5);r>0;){const p=wt(Xa(t,r,i,o.table),"max");if(p===null)break;const m=p.deps[0],y=m.label==="take";y&&a.push(r);const g=e[r-1],v=y?`take item #${r} (w=${g.weight}, v=${g.value}) — drop to ${ye(m.row,m.col)}`:`skip item #${r} — ${ye(r,i)} equals ${ye(m.row,m.col)}`;r=m.row,i=m.col,At(o,{row:r,col:i}),yield Ce(o,null,[],null,v,5)}a.reverse();const l=a.reduce((p,m)=>p+e[m-1].weight,0),u=o.table[s-1][n]??0,c=a.map(p=>`#${p}`).join(", "),d=a.length?`take {${c}} — weight ${l}/${n}, value ${u}`:`take nothing — no item fits in ${n}`;yield Mn(o,d,`${ye(s-1,n)} = ${u}`,6)}const em={kind:"items",defaults:{kind:"items",items:[{weight:2,value:3},{weight:3,value:4},{weight:4,value:5},{weight:5,value:8}],capacity:9},recurrence:"dp[i][c] = max(dp[i-1][c], v_i + dp[i-1][c - w_i])",axes:t=>({rowHeaders:["—",...t.items.map((e,n)=>`#${n+1} w${e.weight} v${e.value}`)],colHeaders:Array.from({length:t.capacity+1},(e,n)=>String(n)),rowTitle:"items",colTitle:"capacity"}),dims:t=>{const e=t.items.length+1,n=t.capacity+1;return{rows:e,cols:n,fillable:e*n}},validate:t=>Uu(t,"capacity"),depsOf:Qh,generator:Zh,naiveCalls:t=>Hu(t.items.map(e=>e.weight),t.capacity)};function Uu(t,e){return t.items.length===0?"Enter at least one item.":t.items.some(n=>!Number.isInteger(n.weight)||n.weight<1)?"Item weights must be whole numbers of at least 1.":t.items.some(n=>!Number.isInteger(n.value)||n.value<0)?"Item values must be whole numbers of 0 or more.":!Number.isInteger(t.capacity)||t.capacity<0?`The ${e} must be 0 or more.`:null}function Ja(t,e,n,s){if(e===0)return[];const o=t.items[e-1],a=We(s,e-1,n,"skip"),r=[{deps:[a],score:a.value??0,text:`${ye(e-1,n)}=${a.value??0}`}];if(o.weight<=n){const i=We(s,e-1,n-o.weight,"take"),l=i.value??0;r.push({deps:[i],score:l,text:`${ye(e-1,n-o.weight)}=${l}`})}return r}function tm(t,e,n,s){return Ja(t,e,n,s).flatMap(o=>o.deps)}function*nm(t){const{items:e,capacity:n}=t,s=e.length+1,o=On(s,n+1);for(let d=0;d<=n;d++){const p=d===0?1:0;yt(o,0,d,p);const m={row:0,col:d},y=mn(ye(0,d),p,d===0?"the empty set sums to 0":"no items yet");yield Ce(o,m,[],null,y,0)}for(let d=1;d<s;d++)for(let p=0;p<=n;p++){const m=Ja(t,d,p,o.table),y=m.flatMap(_=>_.deps),g=wt(m,"max"),v=g===null?0:g.score;yt(o,d,p,v);const b={row:d,col:p},w=v===1&&g!==null?Yn(g.deps[0]):null,S=m.map(_=>_.text).join(" or "),$=It(ye(d,p),S,v);yield Ce(o,b,y,w,$,4)}const a=o.table[s-1][n]===1,r=[];let i=s-1,l=n;if(a)for(At(o,{row:i,col:l}),yield Ce(o,null,[],null,`start at ${ye(i,l)} = 1`,5);i>0;){const d=wt(Ja(t,i,l,o.table),"max");if(d===null||d.score!==1)break;const p=d.deps[0],m=p.label==="take";m&&r.push(i);const y=e[i-1],g=m?`take item #${i} (w=${y.weight}) — drop to ${ye(p.row,p.col)}`:`skip item #${i} — ${ye(p.row,p.col)} is already 1`;i=p.row,l=p.col,At(o,{row:i,col:l}),yield Ce(o,null,[],null,g,5)}r.reverse();const u=r.map(d=>e[d-1].weight),c=a?`{${u.join(", ")}} sums to ${n}`:`no subset of {${e.map(d=>d.weight).join(", ")}} sums to ${n}`;yield Mn(o,c,`${ye(s-1,n)} = ${a?1:0}`,6)}const sm={kind:"items",defaults:{kind:"items",items:[{weight:3,value:0},{weight:34,value:0},{weight:4,value:0},{weight:12,value:0},{weight:5,value:0},{weight:2,value:0}],capacity:9},recurrence:"dp[i][t] = dp[i-1][t] OR dp[i-1][t - w_i]",axes:t=>({rowHeaders:["—",...t.items.map((e,n)=>`#${n+1} w${e.weight}`)],colHeaders:Array.from({length:t.capacity+1},(e,n)=>String(n)),rowTitle:"items",colTitle:"target"}),dims:t=>{const e=t.items.length+1,n=t.capacity+1;return{rows:e,cols:n,fillable:e*n}},validate:t=>Uu(t,"target"),depsOf:tm,generator:nm,naiveCalls:t=>Hu(t.items.map(e=>e.weight),t.capacity)};function Qa(t,e,n,s){if(e===0||n===0)return[];if(t.a[e-1]===t.b[n-1]){const r=We(s,e-1,n-1,"match"),i=(r.value??0)+1;return[{deps:[r],score:i,text:`1+${ye(e-1,n-1)}=${i}`}]}const o=We(s,e-1,n,"drop from a"),a=We(s,e,n-1,"drop from b");return[{deps:[o],score:o.value??0,text:`${ye(e-1,n)}=${o.value??0}`},{deps:[a],score:a.value??0,text:`${ye(e,n-1)}=${a.value??0}`}]}function om(t,e,n,s){return Qa(t,e,n,s).flatMap(o=>o.deps)}function*am(t){const{a:e,b:n}=t,s=e.length+1,o=n.length+1,a=On(s,o);for(let p=0;p<s;p++)for(let m=0;m<o;m++){if(p===0||m===0){yt(a,p,m,0);const $={row:p,col:m},_=mn(ye(p,m),0,"one side is empty");yield Ce(a,$,[],null,_,0);continue}const y=Qa(t,p,m,a.table),g=y.flatMap($=>$.deps),v=wt(y,"max"),b=v===null?0:v.score;yt(a,p,m,b);const w={row:p,col:m},S=v===null?null:Yn(v.deps[0]);if(e[p-1]===n[m-1]){const $=It(ye(p,m),y[0].text,b);yield Ce(a,w,g,S,$,2)}else{const $=It(ye(p,m),vs("max",y),b);yield Ce(a,w,g,S,$,3)}}const r=[];let i=s-1,l=o-1;for(At(a,{row:i,col:l}),yield Ce(a,null,[],null,`start at ${ye(i,l)} = ${a.table[i][l]}`,4);i>0&&l>0;){const p=wt(Qa(t,i,l,a.table),"max");if(p===null)break;const m=p.deps[0],y=m.label==="match";y&&r.push(e[i-1]);const g=y?`'${e[i-1]}' matches — take it and step diagonally to ${ye(m.row,m.col)}`:`${m.label} — ${ye(i,l)} inherits ${ye(m.row,m.col)}`;i=m.row,l=m.col,At(a,{row:i,col:l}),yield Ce(a,null,[],null,g,4)}r.reverse();const u=a.table[s-1][o-1]??0,c=r.join(""),d=u===0?"no common subsequence":`"${c}"  (length ${u})`;yield Mn(a,d,`${ye(s-1,o-1)} = ${u}`,5)}function zu(t){return t.a.length===0||t.b.length===0?"Both strings need at least one character.":t.a.length>28||t.b.length>28?"Each string may be at most 28 characters.":/\s/.test(t.a)||/\s/.test(t.b)?"Whitespace is not allowed.":null}const rm={kind:"strings2",defaults:{kind:"strings2",a:"AGGTAB",b:"GXTXAYB"},recurrence:"dp[i][j] = match ? 1 + dp[i-1][j-1] : max(dp[i-1][j], dp[i][j-1])",axes:t=>({rowHeaders:["ε",...t.a.split("")],colHeaders:["ε",...t.b.split("")],rowTitle:"a",colTitle:"b"}),dims:t=>{const e=t.a.length+1,n=t.b.length+1;return{rows:e,cols:n,fillable:e*n}},validate:zu,depsOf:om,generator:am,naiveCalls:t=>Fh(t.a,t.b)};function Za(t,e,n,s){if(e===0&&n===0)return[];if(n===0){const i=We(s,e-1,0,"delete"),l=(i.value??0)+1;return[{deps:[i],score:l,text:`1+${ye(e-1,0)}=${l}`}]}if(e===0){const i=We(s,0,n-1,"insert"),l=(i.value??0)+1;return[{deps:[i],score:l,text:`1+${ye(0,n-1)}=${l}`}]}if(t.a[e-1]===t.b[n-1]){const i=We(s,e-1,n-1,"match"),l=i.value??0;return[{deps:[i],score:l,text:`${ye(e-1,n-1)}=${l}`}]}const o=We(s,e-1,n-1,"substitute"),a=We(s,e-1,n,"delete"),r=We(s,e,n-1,"insert");return[{deps:[o],score:(o.value??0)+1,text:`1+${ye(e-1,n-1)}=${(o.value??0)+1}`},{deps:[a],score:(a.value??0)+1,text:`1+${ye(e-1,n)}=${(a.value??0)+1}`},{deps:[r],score:(r.value??0)+1,text:`1+${ye(e,n-1)}=${(r.value??0)+1}`}]}function im(t,e,n,s){return Za(t,e,n,s).flatMap(o=>o.deps)}function lm(t,e,n){return t==="match"?`keep '${e}'`:t==="substitute"?`sub '${e}'→'${n}'`:t==="delete"?`del '${e}'`:`ins '${n}'`}function*um(t){const{a:e,b:n}=t,s=e.length+1,o=n.length+1,a=On(s,o);for(let p=0;p<s;p++)for(let m=0;m<o;m++){const y=Za(t,p,m,a.table),g=y.flatMap($=>$.deps),v=wt(y,"min"),b=v===null?0:v.score;yt(a,p,m,b);const w={row:p,col:m},S=v===null?null:Yn(v.deps[0]);if(p===0&&m===0){const $=mn(ye(0,0),0,"both prefixes are empty");yield Ce(a,w,g,null,$,0)}else if(p===0||m===0){const $=p===0?"insertions":"deletions",_=It(ye(p,m),`${y[0].text}`,b)+`  (${$} only)`;yield Ce(a,w,g,S,_,0)}else if(e[p-1]===n[m-1]){const $=It(ye(p,m),y[0].text,b)+`  ('${e[p-1]}' matches)`;yield Ce(a,w,g,S,$,2)}else{const $=It(ye(p,m),vs("min",y),b);yield Ce(a,w,g,S,$,3)}}const r=[];let i=s-1,l=o-1;for(At(a,{row:i,col:l}),yield Ce(a,null,[],null,`start at ${ye(i,l)} = ${a.table[i][l]}`,4);i>0||l>0;){const p=wt(Za(t,i,l,a.table),"min");if(p===null)break;const m=p.deps[0],y=i>0?e[i-1]:"",g=l>0?n[l-1]:"",v=lm(m.label,y,g);r.push(v),i=m.row,l=m.col,At(a,{row:i,col:l}),yield Ce(a,null,[],null,`${v} — step to ${ye(i,l)}`,4)}r.reverse();const u=a.table[s-1][o-1]??0,c=r.filter(p=>!p.startsWith("keep")),d=u===0?"already identical — 0 edits":`${c.join(", ")}  (${u} edits)`;yield Mn(a,d,`${ye(s-1,o-1)} = ${u}`,5)}const cm={kind:"strings2",defaults:{kind:"strings2",a:"kitten",b:"sitting"},recurrence:"dp[i][j] = match ? dp[i-1][j-1] : 1 + min(sub, del, ins)",axes:t=>({rowHeaders:["ε",...t.a.split("")],colHeaders:["ε",...t.b.split("")],rowTitle:"a",colTitle:"b"}),dims:t=>{const e=t.a.length+1,n=t.b.length+1;return{rows:e,cols:n,fillable:e*n}},validate:zu,depsOf:im,generator:um,naiveCalls:t=>Hh(t.a,t.b)};function Ar(t,e,n,s){if(e>=n)return[];const o=t.dims,a=[];for(let r=e;r<n;r++){const i=We(s,e,r,`split at k=${r}`),l=We(s,r+1,n,`split at k=${r}`),u=o[e]*o[r+1]*o[n+1],c=(i.value??0)+(l.value??0)+u;a.push({deps:[i,l],score:c,text:`k=${r}:${c}`})}return a}function dm(t,e,n,s){return Ar(t,e,n,s).flatMap(o=>o.deps)}function*er(t,e,n,s){if(At(e,{row:n,col:s}),n===s){const u=`A${n+1}`;return yield Ce(e,null,[],null,`${u} on its own costs nothing`,4),u}const o=wt(Ar(t,n,s,e.table),"min");if(o===null)return`A${n+1}..A${s+1}`;const a=o.deps[0].col,r=`split A${n+1}..A${s+1} after A${a+1} — cost ${o.score}`;yield Ce(e,null,[],null,r,4);const i=yield*er(t,e,n,a),l=yield*er(t,e,a+1,s);return`(${i}${l})`}function*pm(t){const n=t.dims.length-1,s=On(n,n);for(let i=0;i<n;i++){yt(s,i,i,0);const l={row:i,col:i},u=mn(ye(i,i),0,`A${i+1} alone needs no multiplication`);yield Ce(s,l,[],null,u,0)}for(let i=2;i<=n;i++)for(let l=0;l+i-1<n;l++){const u=l+i-1,c=Ar(t,l,u,s.table),d=c.flatMap(b=>b.deps),p=wt(c,"min"),m=p===null?0:p.score;yt(s,l,u,m);const y={row:l,col:u},g=p===null?null:Yn(p.deps[0]),v=It(ye(l,u),vs("min",c),m);yield Ce(s,y,d,g,v,2)}const o=yield*er(t,s,0,n-1),a=s.table[0][n-1]??0,r=`${o} — ${a.toLocaleString()} scalar multiplications`;yield Mn(s,r,`${ye(0,n-1)} = ${a}`,5)}const fm={kind:"chain",defaults:{kind:"chain",dims:[40,20,30,10,30]},recurrence:"dp[i][j] = min over k of dp[i][k] + dp[k+1][j] + d[i]*d[k+1]*d[j+1]",axes:t=>{const e=Math.max(0,t.dims.length-1),n=Array.from({length:e},(s,o)=>`A${o+1}`);return{rowHeaders:n,colHeaders:n,rowTitle:"i",colTitle:"j"}},dims:t=>{const e=Math.max(0,t.dims.length-1);return{rows:e,cols:e,fillable:e*(e+1)/2}},validate:t=>t.dims.length<2?"Enter at least two dimensions (one matrix).":t.dims.some(e=>!Number.isInteger(e)||e<1)?"Dimensions must be whole numbers of at least 1.":t.dims.length>31?"Enter at most 31 dimensions (30 matrices).":null,depsOf:dm,generator:pm,naiveCalls:t=>Vh(Math.max(0,t.dims.length-1))},Gt={fib:{...qh,name:"Fibonacci",description:"Fills one row left to right, each cell the sum of the two before it. The smallest example of the whole idea: 40 cells replace 331 million recursive calls.",complexity:{time:"O(n)",space:"O(n)"}},"coin-change":{...Wh,name:"Coin Change",description:"Fewest coins that make each amount from 0 upwards, each cell taking the best of one more coin on top of a smaller amount. Amounts no combination can reach stay at infinity.",complexity:{time:"O(amount × coins)",space:"O(amount)"}},lis:{...Jh,name:"Longest Increasing Subsequence",description:"Each cell holds the longest increasing run ending at that element, extending the best smaller element to its left. The answer is the largest cell, not the last one.",complexity:{time:"O(n²)",space:"O(n)"}},knapsack:{...em,name:"0/1 Knapsack",description:"One row per item, one column per capacity. Each cell chooses between skipping the item and taking it, and the traceback reads those choices straight back out of the table.",complexity:{time:"O(n × capacity)",space:"O(n × capacity)"}},"subset-sum":{...sm,name:"Subset Sum",description:"Knapsack’s table answering a yes/no question instead: can any subset hit the target exactly? Same shape, same traversal, OR in place of max.",complexity:{time:"O(n × target)",space:"O(n × target)"}},lcs:{...rm,name:"Longest Common Subsequence",description:"A grid of two strings. Matching characters extend the diagonal by one; mismatches take the better of dropping a character from either side.",complexity:{time:"O(m × n)",space:"O(m × n)"}},"edit-distance":{...cm,name:"Edit Distance",description:"Fewest insert/delete/substitute operations turning one string into the other. Same grid as LCS, but a mismatch forks three ways instead of two.",complexity:{time:"O(m × n)",space:"O(m × n)"}},"matrix-chain":{...fm,name:"Matrix Chain",description:"Where to put the parentheses so a chain of matrix products costs the least. Fills along diagonals rather than row by row, because a cell needs every shorter sub-chain first.",complexity:{time:"O(n³)",space:"O(n²)"}}};class Tr{constructor(e){Zt(this,"n");Zt(this,"parents");Zt(this,"ranks");Zt(this,"sizes");Zt(this,"findCount",0);Zt(this,"unionCount",0);Zt(this,"compressionCount",0);Zt(this,"componentCount");this.n=Math.max(0,Math.floor(e)),this.parents=Array.from({length:this.n},(n,s)=>s),this.ranks=new Array(this.n).fill(0),this.sizes=new Array(this.n).fill(1),this.componentCount=this.n}get components(){return this.componentCount}get finds(){return this.findCount}get unions(){return this.unionCount}get compressions(){return this.compressionCount}isRoot(e){return this.parents[e]===e}rankOf(e){return this.ranks[e]}sizeOf(e){return this.sizes[e]}pathTo(e){const n=[e];let s=e;for(;this.parents[s]!==s;)s=this.parents[s],n.push(s);return n}completeFind(e){if(this.findCount+=1,e.length===0)return[];const n=e[e.length-1],s=[];for(const o of e)o!==n&&this.parents[o]!==n&&(this.parents[o]=n,s.push(o));return this.compressionCount+=s.length,s}find(e){const n=this.pathTo(e);return this.completeFind(n),n[n.length-1]}rootOf(e){let n=e;for(;this.parents[n]!==n;)n=this.parents[n];return n}link(e,n){if(e===n)return!1;let s=e,o=n;return this.ranks[s]<this.ranks[o]&&([s,o]=[o,s]),this.parents[o]=s,this.sizes[s]+=this.sizes[o],this.ranks[s]===this.ranks[o]&&(this.ranks[s]+=1),this.unionCount+=1,this.componentCount-=1,!0}union(e,n){return this.link(this.find(e),this.find(n))}connected(e,n){return this.find(e)===this.find(n)}isConnected(e,n){return this.rootOf(e)===this.rootOf(n)}maxDepth(){const e=new Array(this.n).fill(-1);let n=0;for(let s=0;s<this.n;s++){const o=[];let a=s;for(;e[a]===-1&&this.parents[a]!==a;)o.push(a),a=this.parents[a];e[a]===-1&&(e[a]=0);let r=e[a];for(;o.length>0;)r+=1,e[o.pop()]=r;r>n&&(n=r)}return n}snapshot(e=[],n=[]){return{parent:[...this.parents],rank:[...this.ranks],setSize:[...this.sizes],findPath:[...e],compressed:[...n],finds:this.findCount,unions:this.unionCount,compressions:this.compressionCount,maxDepth:this.maxDepth()}}}const hm=1;function jo(t){return t.weight??hm}function tr(t,e){const n=jo(t)-jo(e);return n!==0?n:t.id.localeCompare(e.id)}function qu(t){return new Map(t.map((e,n)=>[e.id,n]))}function Ku(t){return t.map(e=>e.label)}function mm(t,e,n){return t===n?e:t}const Pe=Object.freeze([]),sn=(t,e,n,s,o,a,r)=>({kind:"dsu",forest:t.snapshot(o,a),op:e,active:n,explain:s,done:!1,line:r}),gm=(t,e,n)=>({kind:"dsu",forest:t.snapshot(),op:null,active:null,explain:e,done:!0,line:n});function Gu(t){return{dsu:t,considering:null,acceptedEdges:[],rejectedEdges:[],queue:[],totalWeight:0}}const Tt=(t,e,n,s)=>({kind:"mst",forest:t.dsu.snapshot(n),consideringEdge:t.considering,acceptedEdges:[...t.acceptedEdges],rejectedEdges:[...t.rejectedEdges],queue:[...t.queue],totalWeight:t.totalWeight,components:t.dsu.components,explain:e,done:!1,line:s}),nr=(t,e,n)=>({kind:"mst",forest:t.dsu.snapshot(),consideringEdge:null,acceptedEdges:[...t.acceptedEdges],rejectedEdges:[...t.rejectedEdges],queue:[],totalWeight:t.totalWeight,components:t.dsu.components,explain:e,done:!0,line:n});function sr(t,e,n){const s=t.acceptedEdges.length,o=t.dsu.components,a=t.totalWeight;return e===0?`${n} finished: the graph has no nodes.`:o===1?`${n} finished: spanning tree with ${s} edges (V - 1 = ${e-1}), total weight ${a}.`:`${n} finished: the graph is disconnected, so this is a spanning forest — ${o} components, ${s} edges (V - components = ${e} - ${o}), total weight ${a}. No spanning tree exists.`}function Wu(t,e,n){return`${t[e]??e} — ${t[n]??n}`}function*bm(t,e){const n=Math.max(0,Math.floor(t)),s=new Tr(n),o=p=>p!==void 0&&p>=0&&p<n,a=e.filter(p=>p.kind==="union"?o(p.a)&&o(p.b):o(p.a)),r=e.length-a.length,i=r>0?` (${r} operation(s) skipped: node out of range)`:"",l=`${n} singleton sets — every node is its own parent, every rank 0${i}.`;yield sn(s,null,null,l,Pe,Pe,0);function*u(p,m){const y=s.pathTo(m),g=`find(${m}): walking up from ${m} to its root.`;yield sn(s,p,m,g,[m],Pe,1);for(let S=1;S<y.length;S++){const $=y[S],_=y.slice(0,S+1),K=S===y.length-1?`${$} is its own parent — that is the root of ${m}'s set.`:`parent[${y[S-1]}] = ${$}, still not a root — keep walking.`;yield sn(s,p,$,K,_,Pe,2)}const v=y[y.length-1],b=s.completeFind(y),w=b.length===0?`Nothing to compress: ${m} already pointed straight at root ${v}.`:`Path compression: ${b.join(", ")} now point straight at root ${v}.`;return yield sn(s,p,v,w,y,b,3),v}for(const p of a){if(p.kind==="find"){yield*u(p,p.a);continue}const m=p.a,y=p.b,g=`union(${m}, ${y}): find both roots first.`;yield sn(s,p,m,g,Pe,Pe,4);const v=yield*u(p,m),b=yield*u(p,y),w=`Roots are ${v} and ${b}.`;if(yield sn(s,p,b,w,Pe,Pe,5),v===b){const N=`${m} and ${y} are already in the same set — union does nothing.`;yield sn(s,p,v,N,Pe,Pe,6);continue}const S=s.rankOf(v),$=s.rankOf(b),_=S===$;s.link(v,b);const P=S>=$?v:b,I=`rank[${v}]=${S}, rank[${b}]=${$} — hang ${P===v?b:v} under ${P}.`;if(yield sn(s,p,P,I,Pe,Pe,7),_){const N=`Ranks were equal, so rank[${P}] goes up to ${S+1}.`;yield sn(s,p,P,N,Pe,Pe,8)}}const d=`Script finished: ${s.components===1?"1 set":`${s.components} sets`} remain, deepest tree is ${s.maxDepth()} level(s).`;yield gm(s,d,9)}function*vm(t){const e=t.nodes,n=e.length,s=qu(e),o=Ku(e),a=new Tr(n),r=Gu(a),i=[...t.edges].sort(tr);r.queue=i.map(c=>c.id);const l=`Sorted ${i.length} edges by weight, lightest first.`;yield Tt(r,l,Pe,0);const u=`${n} singleton components — no node is connected to any other yet.`;yield Tt(r,u,Pe,1);for(let c=0;c<i.length;c++){const d=i[c],p=s.get(d.from),m=s.get(d.to);if(p===void 0||m===void 0)continue;const y=jo(d);r.considering=d.id,r.queue=i.slice(c+1).map(S=>S.id);const g=[...a.pathTo(p),...a.pathTo(m)],v=`Considering ${Wu(o,p,m)} (weight ${y}) — same set?`;yield Tt(r,v,g,2);const b=a.find(p),w=a.find(m);if(b===w){r.rejectedEdges.push(d.id);const S=`Both ends are in set ${b} already — this edge would close a cycle. Reject.`;yield Tt(r,S,g,3)}else{a.link(b,w),r.acceptedEdges.push(d.id),r.totalWeight+=y;const S=`Sets ${b} and ${w} were separate — accept, and merge them. Total ${r.totalWeight}.`;yield Tt(r,S,g,4)}if(r.acceptedEdges.length===n-1){r.considering=null,r.queue=[];const S=`${n-1} edges accepted — every node is connected, so the rest cannot help.`;yield Tt(r,S,Pe,5);break}}r.considering=null,r.queue=[],yield nr(r,sr(r,n,"Kruskal"),6)}function*ym(t,e){const n=t.nodes,s=n.length,o=qu(n),a=Ku(n),r=new Tr(s),i=Gu(r);if(s===0){yield nr(i,sr(i,s,"Prim"),6);return}const l=Array.from({length:s},()=>[]),u=new Map;for(const b of t.edges){const w=o.get(b.from),S=o.get(b.to);w===void 0||S===void 0||w===S||(l[w].push(b),l[S].push(b),u.set(b.id,[w,S]))}const c=new Array(s).fill(!1),d=[];function p(b){c[b]=!0;for(const w of l[b]){const[S,$]=u.get(w.id);c[mm(S,$,b)]||d.push(w)}}function m(){return[...d].sort(tr).map(b=>b.id)}const y=e!==void 0&&o.has(e)?o.get(e):0;p(y),i.queue=m();const g=`Starting from ${a[y]??y}; the tree is that node alone.`;yield Tt(i,g,Pe,0);const v=`${d.length} edge(s) leave the tree — these are the candidates.`;for(yield Tt(i,v,Pe,1);;){if(d.length===0){const N=c.indexOf(!1);if(N===-1)break;i.considering=null;const j=`No candidate crosses the cut, but ${a[N]??N} is still unreached — that component is done. Restarting there.`;yield Tt(i,j,Pe,5),p(N),i.queue=m();continue}let b=0;for(let N=1;N<d.length;N++)tr(d[N],d[b])<0&&(b=N);const w=d[b];d.splice(b,1);const[S,$]=u.get(w.id),_=jo(w);i.considering=w.id,i.queue=m();const P=`Lightest candidate is ${Wu(a,S,$)} (weight ${_}).`;yield Tt(i,P,Pe,2);const K=c[S]?$:S;if(c[S]&&c[$]){i.rejectedEdges.push(w.id),yield Tt(i,"Both ends joined the tree by other routes — it no longer crosses the cut, so taking it would close a cycle. Reject.",Pe,3);continue}r.link(r.find(S),r.find($)),i.acceptedEdges.push(w.id),i.totalWeight+=_,p(K),i.queue=m();const I=`Accept: ${a[K]??K} joins the tree and offers its own edges. Total ${i.totalWeight}.`;yield Tt(i,I,Pe,4)}i.considering=null,i.queue=[],yield nr(i,sr(i,s,"Prim"),6)}const ta={dsu:{name:"Union-Find",mode:"dsu",generator:bm,description:"The disjoint-set forest on its own: compose a script of union and find operations and watch the trees merge. Each find walks to its root and then re-hangs the whole walk onto it — path compression — while union always hangs the shallower tree under the deeper, which is what keeps the forest from degenerating into a linked list.",complexity:{time:"O(α(n)) amortized per op",space:"O(n)"}},kruskal:{name:"Kruskal's MST",mode:"mst",generator:vm,description:'Sorts every edge by weight and walks that list once, accepting an edge whenever its endpoints are still in different components and rejecting it when they are not. The "still different?" question is answered by the disjoint set, which is the only reason the greedy rule is affordable.',complexity:{time:"O(E log E)",space:"O(V + E)"}},prim:{name:"Prim's MST",mode:"mst",generator:ym,description:"Grows a single tree from a root, repeatedly taking the cheapest edge that crosses from the tree to a node outside it. Reaches the same total weight as Kruskal on any connected graph, by a completely different route — one growing tree instead of many merging ones.",complexity:{time:"O(V · E)",space:"O(V + E)"}}},wm=2654435761;function xm(t){let e=5381;for(let n=0;n<t.length;n++)e=(Math.imul(e,33)^t.charCodeAt(n))>>>0;return e>>>0}function km(t){let e=0;for(let n=0;n<t.length;n++)e=Math.imul(e,31)+t.charCodeAt(n)|0;return Math.imul(e,wm)>>>8}function Sm(t){let e=0;for(let n=0;n<t.length;n++)e+=t.charCodeAt(n);return e}function $m(t){return t.length===0?0:t.charCodeAt(0)}const zn={djb2:{name:"djb2",description:"Classic string hash — mixes every character, spreads keys evenly.",hash:xm},knuth:{name:"Knuth",description:"Multiplicative hash against 2^32/φ; well-spread, cheap to compute.",hash:km},mod:{name:"Sum + mod",description:"Adds the character codes. Simple, but every anagram collides.",hash:Sm},weak:{name:"Weak (first char)",description:"First character only. Awful on purpose — collisions on demand.",hash:$m}},Yu="djb2",xa=4;function na(t){const e=Math.max(xa,Math.floor(t)||xa);let n=xa;for(;n<e;)n*=2;return n}function Em(t,e){return(Math.imul(t^t>>>15,739982445)>>>0)%e|1}function Or(t,e){return t%e}const Cm=.25,Am=.9,Tm=4096;function Xu(t,e){const n=Math.max(Cm,e);return t==="chaining"?n:Math.min(Am,n)}function Om(){return{entries:[],state:"empty"}}function Ju(t){const e=t.strategy,n=t.hashFnKey,s=na(t.capacity),o=Xu(e,t.threshold),a=zn[n].hash,r=t.counters??{probes:0,collisions:0,resizes:0},i=t.arrivals??{next:1},l=Array.from({length:s},Om),u=e==="chaining";let c=0,d=0;function p(z){return Or(z,s)}function m(z){return e==="double"?Em(z,s):1}function y(z,ae){switch(e){case"quadratic":return z*(z+1)/2;case"double":return z*ae;case"linear":return z;default:return 0}}function g(z,ae){const L=p(z);return u?{index:L,chainPos:ae}:{index:(L+y(ae,m(z)))%s,chainPos:0}}function v(z){return u?l[z].entries.length+1:s}function b(z){return l[z.index].entries[z.chainPos]??null}function w(z,ae){const L=l[z.index];if(u){const J=L.entries[z.chainPos];return J?J.key===ae?"match":"occupied":"free"}return L.state==="empty"?"free":L.state==="tombstone"?"tombstone":L.entries[0].key===ae?"match":"occupied"}function S(z,ae){const L={key:ae,value:i.next++},J=l[z.index];return u?(J.entries.push(L),J.state="occupied"):(J.state==="tombstone"&&(d-=1),J.entries=[L],J.state="occupied"),c+=1,L}function $(z){const ae=l[z.index].entries[z.chainPos];return ae.value=i.next++,ae}function _(z){const ae=l[z.index];u?(ae.entries.splice(z.chainPos,1),ae.entries.length===0&&(ae.state="empty")):(ae.entries=[],ae.state="tombstone",d+=1),c-=1}function P(){const z=[];for(const ae of l)z.push(...ae.entries);return z}function K(){return l.map(z=>({entries:z.entries.map(ae=>({...ae})),state:z.state}))}function I(){return c+d}function N(){return I()/s>o}function j(){return s*2<=Tm}function he(){return r.resizes+=1,Ju({strategy:e,hashFnKey:n,capacity:s*2,threshold:o,counters:r,arrivals:i})}function Se(z){const ae=a(z.key),L=p(ae),J=m(ae),le=v(L);for(let G=0;G<le;G++){const re=u?{index:L,chainPos:l[L].entries.length}:{index:(L+y(G,J))%s};if(r.probes+=1,u||l[re.index].state==="empty")return l[re.index].entries=u?[...l[re.index].entries,z]:[z],l[re.index].state="occupied",c+=1,{hash:ae,home:L,index:re.index,probes:G+1}}return{hash:ae,home:L,index:-1,probes:le}}return{strategy:e,hashFnKey:n,capacity:s,threshold:o,counters:r,size:()=>c,tombstones:()=>d,fill:I,loadFactor:()=>c/s,hash:a,home:p,stride:m,offset:y,cursor:g,maxProbes:v,classify:w,entryAt:b,stateAt:z=>l[z].state,chainLength:z=>l[z].entries.length,place:S,overwrite:$,remove:_,entries:P,snapshot:K,overThreshold:N,canGrow:j,growEmpty:he,insertDirect:Se}}function Ii(){return{op:null,key:null,hash:null,homeIndex:null,probeIndex:null,probeSeq:[],phase:"idle",explain:null}}const ct=(t,e,n)=>({buckets:t.snapshot(),capacity:t.capacity,size:t.size(),loadFactor:t.loadFactor(),op:e.op,key:e.key,hash:e.hash,homeIndex:e.homeIndex,probeIndex:e.probeIndex,probeSeq:[...e.probeSeq],probes:t.counters.probes,collisions:t.counters.collisions,resizes:t.counters.resizes,phase:e.phase,explain:e.explain,done:!1,line:n}),Mm=(t,e,n)=>({...ct(t,e,n),done:!0});function _m(t,e,n,s){return`h("${t}") = ${e} → ${e} mod ${n} = ${s}`}function Pn(t,e){return`${t} ${e}${t===1?"":"s"}`}function Mr(t,e,n,s,o,a){const r=n+1;if(t.strategy==="chaining")return a?`probe ${r}: bucket ${e}, end of chain`:`probe ${r}: bucket ${e}, link ${r}`;if(n===0)return`probe 1: slot ${e} (home)`;const i=t.capacity;if(t.strategy==="double")return`probe ${r}: (${e} + ${n}×${s}) mod ${i} = ${o}`;const l=t.offset(n,s);return t.strategy==="quadratic"?`probe ${r}: (${e} + ${l}) mod ${i} = ${o}  [k(k+1)/2, k=${n}]`:`probe ${r}: (${e} + ${l}) mod ${i} = ${o}`}function*Rm(t,e,n,s,o,a){var l;let r=null;const i=t.maxProbes(o);for(let u=0;u<i;u++){const c=t.cursor(s,u),d=t.classify(c,n),p=Mr(t,o,u,a,c.index,d==="free");if(t.counters.probes+=1,e.probeSeq.push(c.index),e.probeIndex=c.index,d==="match"){const g=t.overwrite(c);e.phase="updated",e.explain=`${p} — "${n}" is already here → overwrite (now #${g.value})`,yield ct(t,e,3);break}if(d==="occupied"){t.counters.collisions+=1;const g=((l=t.entryAt(c))==null?void 0:l.key)??"?";e.phase="probing",e.explain=`${p} — taken by "${g}" → collision, keep walking`,yield ct(t,e,5);continue}if(d==="tombstone"){r===null&&(r=c),e.phase="probing",e.explain=`${p} — tombstone; remember it, but keep looking for "${n}"`,yield ct(t,e,2);continue}const m=r??c,y=t.place(m,n);e.probeIndex=m.index,e.phase="inserted",e.explain=jm(t,p,n,y.value,m,r!==null),yield ct(t,e,4);break}return t.overThreshold()&&t.canGrow()?yield*Nm(t,e):t}function jm(t,e,n,s,o,a){if(t.strategy==="chaining"){const r=Pn(t.chainLength(o.index),"link");return`${e} → append "${n}" (#${s}); the chain is now ${r}`}return a?`${e} — free, but slot ${o.index} was a tombstone → reuse it for "${n}"`:`${e} — empty → insert "${n}" (#${s})`}function*Im(t,e,n,s,o,a){var i;const r=t.maxProbes(o);for(let l=0;l<r;l++){const u=t.cursor(s,l),c=t.classify(u,n),d=Mr(t,o,l,a,u.index,c==="free");if(t.counters.probes+=1,e.probeSeq.push(u.index),e.probeIndex=u.index,c==="match"){const p=t.entryAt(u);e.phase="found",e.explain=`${d} — found "${n}" (inserted #${p==null?void 0:p.value})`,yield ct(t,e,8);return}if(c==="free"){e.phase="not-found",e.explain=`${d} — ${Qu(t)} → "${n}" is not in the table`,yield ct(t,e,9);return}e.phase="probing",e.explain=c==="tombstone"?`${d} — tombstone; a deleted slot never ends a search → keep walking`:`${d} — holds "${(i=t.entryAt(u))==null?void 0:i.key}", not "${n}" → keep walking`,yield ct(t,e,7)}e.phase="not-found",e.explain=`walked all ${r} probes without finding "${n}"`,yield ct(t,e,9)}function*Dm(t,e,n,s,o,a){const r=t.maxProbes(o);for(let i=0;i<r;i++){const l=t.cursor(s,i),u=t.classify(l,n),c=Mr(t,o,i,a,l.index,u==="free");if(t.counters.probes+=1,e.probeSeq.push(l.index),e.probeIndex=l.index,u==="match"){t.remove(l),e.phase="deleted",e.explain=Lm(t,c,n,l.index),yield ct(t,e,11);return}if(u==="free"){e.phase="not-found",e.explain=`${c} — ${Qu(t)} → nothing to delete`,yield ct(t,e,9);return}e.phase="probing",e.explain=`${c} — not "${n}" → keep walking`,yield ct(t,e,10)}e.phase="not-found",e.explain=`walked all ${r} probes without finding "${n}"`,yield ct(t,e,9)}function Qu(t){return t.strategy==="chaining"?"chain ends here":"slot is EMPTY"}function Lm(t,e,n,s){if(t.strategy==="chaining"){const o=Pn(t.chainLength(s),"link");return`${e} — unlink "${n}"; bucket ${s}'s chain is now ${o}`}return`${e} — remove "${n}" and leave a TOMBSTONE, so probes still walk past slot ${s}`}function*Nm(t,e){const n=t.entries(),s=t.fill(),o=(s/t.capacity).toFixed(2),a=t.threshold.toFixed(2),r=t.strategy==="chaining"?`load factor ${s}/${t.capacity} = ${o}`:`slots used ${s}/${t.capacity} = ${o} (${t.size()} keys${t.tombstones()>0?` + ${t.tombstones()} tombstones`:""})`;e.phase="resizing",e.probeIndex=null,e.probeSeq=[],e.explain=`${r} > ${a} → grow to ${t.capacity*2} slots and rehash ${Pn(n.length,"key")}`,yield ct(t,e,6);const i=t.growEmpty();for(const l of n){const u=i.insertDirect(l);e.key=l.key,e.hash=u.hash,e.homeIndex=u.home,e.probeIndex=u.index,e.probeSeq=[u.index],e.phase="rehashed",e.explain=`rehash "${l.key}": ${u.hash} mod ${i.capacity} = ${u.home}`+(u.index===u.home?` → slot ${u.index}`:` → slot ${u.home} taken, landed in ${u.index}`),yield ct(i,e,6)}return i}function*Pm(t,e,n){let s=Ju({strategy:n,...e});const o=Ii();for(const u of t){const c=s.hash(u.key),d=s.home(c),p=s.stride(c);o.op=u.kind,o.key=u.key,o.hash=c,o.homeIndex=d,o.probeIndex=d,o.probeSeq=[],o.phase="hashing",o.explain=_m(u.key,c,s.capacity,d),yield ct(s,o,1),u.kind==="insert"?s=yield*Rm(s,o,u.key,c,d,p):u.kind==="search"?yield*Im(s,o,u.key,c,d,p):yield*Dm(s,o,u.key,c,d,p)}const{probes:a,collisions:r,resizes:i}=s.counters,l=Ii();l.explain=`script complete — ${Pn(t.length,"operation")}, ${Pn(a,"probe")}, ${Pn(r,"collision")}, ${Pn(i,"resize")}`,yield Mm(s,l,12)}function oo(t){return(e,n)=>Pm(e,n,t)}const sa={chaining:{name:"Separate Chaining",generator:oo("chaining"),description:"Every bucket holds a list. Colliding keys are appended to the list at their home bucket, so a lookup hashes once and then walks a chain whose length is the load factor on average.",complexity:{best:"O(1)",average:"O(1 + α)",worst:"O(n)",space:"O(n + m)"}},linear:{name:"Linear Probing",generator:oo("linear"),description:"On a collision, try the very next slot, and the next. Cache-friendly and trivial to implement, but colliding keys pile into contiguous runs — primary clustering — and each run makes itself more likely to grow.",complexity:{best:"O(1)",average:"O(1 / (1 - α))",worst:"O(n)",space:"O(m)"}},quadratic:{name:"Quadratic Probing",generator:oo("quadratic"),description:"Jump k(k+1)/2 slots away on the k-th probe, so colliding keys scatter instead of forming runs. Two keys sharing a home slot still share the entire jump sequence, which is secondary clustering.",complexity:{best:"O(1)",average:"O(1 / (1 - α))",worst:"O(n)",space:"O(m)"}},double:{name:"Double Hashing",generator:oo("double"),description:"A second hash of the key decides the stride, so two keys that collide at their home slot almost never collide again. The closest of the three to the uniform-hashing ideal, at the cost of a second hash per key.",complexity:{best:"O(1)",average:"O(1 / (1 - α))",worst:"O(n)",space:"O(m)"}}},Zu="chaining",Bm={key:"racy-counter",name:"Racy counter",description:"Two threads each run counter = counter + 1, one machine step at a time.",bug:"If both threads read before either writes, both compute the same value and one increment is lost.",threads:[{name:"T0",instructions:[{label:"local = counter",exec:(t,e)=>{t.threads[e].locals.local=t.shared.counter}},{label:"local = local + 1",exec:(t,e)=>{t.threads[e].locals.local+=1}},{label:"counter = local",exec:(t,e)=>{t.shared.counter=t.threads[e].locals.local}}]},{name:"T1",instructions:[{label:"local = counter",exec:(t,e)=>{t.threads[e].locals.local=t.shared.counter}},{label:"local = local + 1",exec:(t,e)=>{t.threads[e].locals.local+=1}},{label:"counter = local",exec:(t,e)=>{t.shared.counter=t.threads[e].locals.local}}]}],invariant:{label:"counter === 2 once both threads finish",holds:(t,e)=>!e||t.shared.counter===2},createState:()=>({shared:{counter:0},locks:{},threads:[{id:0,pc:0,status:"ready",locals:{local:0}},{id:1,pc:0,status:"ready",locals:{local:0}}]})},Fm={key:"mutex-violation",name:"Mutex violation",description:"Two threads guard a critical section with a check-then-acquire lock.",bug:"Checking the lock and taking it are separate steps, so both threads can see it free and both enter.",threads:[0,1].map((t,e)=>({name:`T${e}`,instructions:[{label:"saw = (lock == free)",exec:(n,s)=>{n.threads[s].locals.saw=n.locks.L===null?1:0}},{label:"if saw: take lock",exec:(n,s)=>{n.threads[s].locals.saw===1&&(n.locks.L=s,n.threads[s].status="critical")}},{label:"critical section",exec:(n,s)=>{n.shared.entered+=1}},{label:"release lock",exec:(n,s)=>{n.threads[s].status==="critical"&&(n.threads[s].status="ready",n.locks.L===s&&(n.locks.L=null))}}]})),invariant:{label:"at most one thread in the critical section",holds:t=>t.threads.filter(e=>e.status==="critical").length<=1},createState:()=>({shared:{entered:0},locks:{L:null},threads:[{id:0,pc:0,status:"ready",locals:{saw:0}},{id:1,pc:0,status:"ready",locals:{saw:0}}]})},qs={"racy-counter":Bm,"mutex-violation":Fm},ec="racy-counter",tc="algoviz-last-visited";function Hm(){try{return localStorage.getItem(tc)||null}catch{return null}}const Di=B(Hm());function Vm(t){try{localStorage.setItem(tc,t)}catch{}}function nc(){function t(n){Di.value=n,Vm(n)}function e(n,s){n.afterEach(o=>{const a=typeof o.name=="string"?o.name:null;a&&s(a)&&t(a)})}return{lastVisited:Di,record:t,trackLastVisited:e}}const Um={class:"space-y-12"},zm={class:"max-w-3xl"},qm={class:"mt-7 flex flex-wrap gap-x-8 gap-y-3"},Km={class:"nums font-mono text-xl font-semibold text-ink"},Gm={class:"nums font-mono text-xl font-semibold text-ink"},Wm={key:0},Ym={class:"mt-1 block font-semibold text-ink"},Xm={class:"grid gap-3 sm:grid-cols-2 lg:grid-cols-3"},Jm={class:"flex items-baseline justify-between gap-2"},Qm={class:"font-display font-bold text-ink"},Zm={key:0,class:"nums shrink-0 font-mono text-2xs text-ink-faint"},eg={class:"mt-2 text-sm text-ink-muted"},tg=se({__name:"LandingView",setup(t){const{lastVisited:e}=nc(),n=C(()=>e.value?Fn.find(o=>o.name===e.value):void 0),s=C(()=>Fn.reduce((o,a)=>{var r;return o+(((r=a.meta)==null?void 0:r.count)??0)},0));return(o,a)=>(x(),T("div",Um,[h("section",zm,[a[3]||(a[3]=h("p",{class:"text-2xs font-semibold uppercase text-accent"},"Algorithm Visualizer",-1)),a[4]||(a[4]=h("h2",{class:"mt-3 font-display text-d-1 font-extrabold text-ink sm:text-d-2"}," See how algorithms actually run. ",-1)),a[5]||(a[5]=h("p",{class:"mt-4 max-w-2xl text-base text-ink-muted"}," Every algorithm here is a generator that yields a snapshot after each meaningful step. Nothing is pre-rendered or faked — play, pause and scrub through the real sequence of comparisons, swaps and visits, one step at a time. ",-1)),h("dl",qm,[h("div",null,[a[0]||(a[0]=h("dt",{class:"text-2xs uppercase text-ink-faint"},"Categories",-1)),h("dd",Km,R(f(Fn).length),1)]),h("div",null,[a[1]||(a[1]=h("dt",{class:"text-2xs uppercase text-ink-faint"},"Algorithms",-1)),h("dd",Gm,R(s.value),1)]),a[2]||(a[2]=h("div",null,[h("dt",{class:"text-2xs uppercase text-ink-faint"},"Themes"),h("dd",{class:"nums font-mono text-xl font-semibold text-ink"},"8")],-1))])]),n.value?(x(),T("section",Wm,[A(f(zs),{to:n.value.path,class:"group flex items-center justify-between gap-4 rounded-xl border border-accent/40 bg-accent-soft px-5 py-4 transition-colors hover:border-accent"},{default:D(()=>{var r;return[h("span",null,[a[6]||(a[6]=h("span",{class:"block text-2xs font-semibold uppercase text-accent"}," Continue where you left off ",-1)),h("span",Ym,R((r=n.value.meta)==null?void 0:r.label),1)]),a[7]||(a[7]=h("span",{"aria-hidden":"true",class:"text-xl text-accent transition-transform group-hover:translate-x-1"},"→",-1))]}),_:1},8,["to"])])):pe("",!0),h("section",null,[a[8]||(a[8]=h("h3",{class:"mb-4 text-2xs font-semibold uppercase text-ink-faint"},"Categories",-1)),h("ul",Xm,[(x(!0),T(te,null,de(f(Fn),r=>(x(),T("li",{key:r.path},[A(f(zs),{to:r.path,class:"flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent/50 hover:bg-surface-alt"},{default:D(()=>{var i,l,u;return[h("span",Jm,[h("span",Qm,R((i=r.meta)==null?void 0:i.label),1),(l=r.meta)!=null&&l.count?(x(),T("span",Zm,R(r.meta.count),1)):pe("",!0)]),h("span",eg,R((u=r.meta)==null?void 0:u.pitch),1)]}),_:2},1032,["to"])]))),128))])])]))}}),ng=/^\s*yield\s+(?:snap|done)\(.*?,\s*(\d+)\s*\)\s*;?\s*$/;function sg(t){const e=new Map;return t.split(`
`).forEach((n,s)=>{const o=ng.exec(n);if(!o)return;const a=Number(o[1]);e.set(a,[...e.get(a)??[],s])}),e}function oa(t){const e=new Map;return n=>{let s=e.get(n);return s||(s=sg(t[n].text),e.set(n,s)),s}}const og=`import type { SortStep } from '@/types';
import { snap, done } from './_utils';

/**
 * Bubble Sort — repeatedly step through the list, comparing adjacent pairs and
 * swapping them if they are out of order. After each outer pass the largest
 * remaining element "bubbles" to its final position at the tail.
 *
 * @yields snapshot objects (see _utils.ts)
 */
export function* bubbleSort(input: number[]): Generator<SortStep, void, undefined> {
  const a = [...input];
  const n = a.length;
  const sorted = new Set<number>();
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      comparisons++;
      yield snap(a, [j, j + 1], [], sorted, comparisons, swaps, 2);

      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swaps++;
        yield snap(a, [], [j, j + 1], sorted, comparisons, swaps, 3);
      }
    }
    // The tail element for this pass is now in its final position.
    sorted.add(n - 1 - i);
  }
  sorted.add(0);

  yield done(a, comparisons, swaps, 5);
}
`,ag=`import type { SortStep } from '@/types';
import { snap, done } from './_utils';

/**
 * Selection Sort — for each position, scan the unsorted remainder to find the
 * minimum element, then swap it into place. The sorted region grows from the
 * head of the array.
 *
 * @yields snapshot objects (see _utils.ts)
 */
export function* selectionSort(input: number[]): Generator<SortStep, void, undefined> {
  const a = [...input];
  const n = a.length;
  const sorted = new Set<number>();
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < n; i++) {
    let min = i;
    for (let j = i + 1; j < n; j++) {
      comparisons++;
      yield snap(a, [min, j], [], sorted, comparisons, swaps, 3);
      if (a[j] < a[min]) min = j;
    }

    if (min !== i) {
      [a[i], a[min]] = [a[min], a[i]];
      swaps++;
      yield snap(a, [], [i, min], sorted, comparisons, swaps, 5);
    }
    // Position i now holds its final value.
    sorted.add(i);
  }

  yield done(a, comparisons, swaps, 7);
}
`,rg=`import type { SortStep } from '@/types';
import { snap, done } from './_utils';

/**
 * Insertion Sort — grow a sorted prefix one element at a time by shifting the
 * incoming element left past every larger neighbour until it lands in order.
 *
 * Note: the sorted prefix is only sorted *relative to itself* mid-run — elements
 * are not yet in their global final positions — so we intentionally do not mark
 * any index green until the terminal snapshot.
 *
 * @yields snapshot objects (see _utils.ts)
 */
export function* insertionSort(input: number[]): Generator<SortStep, void, undefined> {
  const a = [...input];
  const n = a.length;
  const sorted = new Set<number>();
  let comparisons = 0;
  let swaps = 0;

  for (let i = 1; i < n; i++) {
    let j = i;
    while (j > 0) {
      comparisons++;
      yield snap(a, [j - 1, j], [], sorted, comparisons, swaps, 2);
      if (a[j - 1] > a[j]) {
        [a[j - 1], a[j]] = [a[j], a[j - 1]];
        swaps++;
        yield snap(a, [], [j - 1, j], sorted, comparisons, swaps, 3);
        j--;
      } else {
        break;
      }
    }
  }

  yield done(a, comparisons, swaps, 5);
}
`,ig=`import type { SortStep } from '@/types';
import { snap, done } from './_utils';

/**
 * Merge Sort — recursively split the array in half, sort each half, then merge
 * the two sorted halves back together. Stable and O(n log n) in all cases.
 *
 * Merge sort does not "swap" in the classic sense; instead it overwrites
 * positions while merging. We count each write into the array as a swap so the
 * stats panel still reflects data movement.
 *
 * @yields snapshot objects (see _utils.ts)
 */
export function* mergeSort(input: number[]): Generator<SortStep, void, undefined> {
  const a = [...input];
  const sorted = new Set<number>();
  let comparisons = 0;
  let swaps = 0;

  function* msort(lo: number, hi: number): Generator<SortStep, void, undefined> {
    if (hi - lo <= 1) return;
    const mid = (lo + hi) >> 1;
    yield* msort(lo, mid);
    yield* msort(mid, hi);

    // Merge a[lo..mid) and a[mid..hi) into a temporary buffer.
    const merged: number[] = [];
    let i = lo;
    let j = mid;
    while (i < mid && j < hi) {
      comparisons++;
      yield snap(a, [i, j], [], sorted, comparisons, swaps, 5);
      if (a[i] <= a[j]) merged.push(a[i++]);
      else merged.push(a[j++]);
    }
    while (i < mid) merged.push(a[i++]);
    while (j < hi) merged.push(a[j++]);

    // Write the merged run back into the array, highlighting each write.
    for (let k = 0; k < merged.length; k++) {
      a[lo + k] = merged[k];
      swaps++;
      yield snap(a, [], [lo + k], sorted, comparisons, swaps, 7);
    }
  }

  yield* msort(0, a.length);
  yield done(a, comparisons, swaps, 8);
}
`,lg=`import type { SortStep } from '@/types';
import { snap, done } from './_utils';

/**
 * Quick Sort (Lomuto partition scheme) — pick the last element as the pivot,
 * partition the range so smaller elements sit left of the pivot and larger to
 * the right, then recurse into each side. The pivot lands in its final position
 * after every partition.
 *
 * @yields snapshot objects (see _utils.ts)
 */
export function* quickSort(input: number[]): Generator<SortStep, void, undefined> {
  const a = [...input];
  const sorted = new Set<number>();
  let comparisons = 0;
  let swaps = 0;

  function* qsort(lo: number, hi: number): Generator<SortStep, void, undefined> {
    if (lo > hi) return;
    if (lo === hi) {
      sorted.add(lo);
      return;
    }

    const pivot = a[hi]; // pivot value
    let i = lo;
    for (let j = lo; j < hi; j++) {
      comparisons++;
      // hi is the pivot index — highlight it alongside the scanned element.
      yield snap(a, [j, hi], [], sorted, comparisons, swaps, 4);
      if (a[j] < pivot) {
        if (i !== j) {
          [a[i], a[j]] = [a[j], a[i]];
          swaps++;
          yield snap(a, [], [i, j], sorted, comparisons, swaps, 5);
        }
        i++;
      }
    }

    if (i !== hi) {
      [a[i], a[hi]] = [a[hi], a[i]];
      swaps++;
      yield snap(a, [], [i, hi], sorted, comparisons, swaps, 6);
    }
    // Pivot is now in its final resting position.
    sorted.add(i);

    yield* qsort(lo, i - 1);
    yield* qsort(i + 1, hi);
  }

  yield* qsort(0, a.length - 1);
  yield done(a, comparisons, swaps, 8);
}
`,ug=`import type { SortStep } from '@/types';
import { snap, done } from './_utils';

/**
 * Heap Sort — build a max-heap in place, then repeatedly swap the root (largest
 * remaining element) to the end of the heap and sift the new root back down.
 * The sorted region grows from the tail.
 *
 * @yields snapshot objects (see _utils.ts)
 */
export function* heapSort(input: number[]): Generator<SortStep, void, undefined> {
  const a = [...input];
  const n = a.length;
  const sorted = new Set<number>();
  let comparisons = 0;
  let swaps = 0;

  // Sift a[root] down until the subtree rooted at \`root\` satisfies the max-heap
  // property. \`hi\` is the last valid index still inside the heap.
  function* siftDown(root: number, hi: number): Generator<SortStep, void, undefined> {
    while (2 * root + 1 <= hi) {
      let child = 2 * root + 1;
      // Pick the larger of the two children.
      if (child + 1 <= hi) {
        comparisons++;
        yield snap(a, [child, child + 1], [], sorted, comparisons, swaps, 2);
        if (a[child] < a[child + 1]) child++;
      }

      comparisons++;
      yield snap(a, [root, child], [], sorted, comparisons, swaps, 3);
      if (a[root] < a[child]) {
        [a[root], a[child]] = [a[child], a[root]];
        swaps++;
        yield snap(a, [], [root, child], sorted, comparisons, swaps, 4);
        root = child;
      } else {
        return;
      }
    }
  }

  // Phase 1: heapify.
  for (let i = (n >> 1) - 1; i >= 0; i--) {
    yield* siftDown(i, n - 1);
  }

  // Phase 2: extract max repeatedly.
  for (let end = n - 1; end > 0; end--) {
    [a[0], a[end]] = [a[end], a[0]];
    swaps++;
    yield snap(a, [], [0, end], sorted, comparisons, swaps, 8);
    sorted.add(end);
    yield* siftDown(0, end - 1);
  }
  sorted.add(0);

  yield done(a, comparisons, swaps, 10);
}
`,cg=`import type { SortStep } from '@/types';
import { snap, done } from './_utils';

/**
 * Shell Sort — a generalization of insertion sort that first compares and
 * swaps elements far apart (using a shrinking gap sequence: n/2, n/4, ..., 1),
 * moving out-of-order values closer to their final position early. The final
 * gap-1 pass is an ordinary insertion sort over an already mostly-sorted array.
 *
 * As with insertion sort, elements are not in a globally final position until
 * the whole run completes, so no index is marked sorted mid-run.
 *
 * @yields snapshot objects (see _utils.ts)
 */
export function* shellSort(input: number[]): Generator<SortStep, void, undefined> {
  const a = [...input];
  const n = a.length;
  const sorted = new Set<number>();
  let comparisons = 0;
  let swaps = 0;

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      let j = i;
      while (j >= gap) {
        comparisons++;
        yield snap(a, [j - gap, j], [], sorted, comparisons, swaps, 3);

        if (a[j - gap] > a[j]) {
          [a[j - gap], a[j]] = [a[j], a[j - gap]];
          swaps++;
          yield snap(a, [], [j - gap, j], sorted, comparisons, swaps, 4);
          j -= gap;
        } else {
          break;
        }
      }
    }
  }

  yield done(a, comparisons, swaps, 6);
}
`,dg=`import type { SortStep } from '@/types';
import { snap, done } from './_utils';

// Standard shrink factor from the original Comb Sort paper (Box & Lacey, 1980).
const SHRINK_FACTOR = 1.3;

/**
 * Comb Sort — improves on bubble sort by comparing elements separated by a
 * gap that shrinks each pass (starting at the array length, dividing by
 * ~1.3, flooring to a minimum of 1) instead of only ever-adjacent elements.
 * This clears small values stuck near the tail ("turtles") far faster than
 * plain bubble sort. Once the gap reaches 1 it behaves like bubble sort and
 * stops as soon as a full pass makes no swaps.
 *
 * The shrinking gap means no index can be considered in its final position
 * until the terminal snapshot.
 *
 * @yields snapshot objects (see _utils.ts)
 */
export function* combSort(input: number[]): Generator<SortStep, void, undefined> {
  const a = [...input];
  const n = a.length;
  const sorted = new Set<number>();
  let comparisons = 0;
  let swaps = 0;

  let gap = n;
  let swappedLastPass = true;

  while (gap > 1 || swappedLastPass) {
    gap = Math.floor(gap / SHRINK_FACTOR);
    if (gap < 1) gap = 1;
    swappedLastPass = false;

    for (let i = 0; i + gap < n; i++) {
      comparisons++;
      yield snap(a, [i, i + gap], [], sorted, comparisons, swaps, 5);

      if (a[i] > a[i + gap]) {
        [a[i], a[i + gap]] = [a[i + gap], a[i]];
        swaps++;
        swappedLastPass = true;
        yield snap(a, [], [i, i + gap], sorted, comparisons, swaps, 6);
      }
    }
  }

  yield done(a, comparisons, swaps, 7);
}
`,pg=`import type { SortStep } from '@/types';
import { snap, done } from './_utils';

/**
 * Counting Sort — tallies how many times each value occurs, converts those
 * tallies into destination offsets via a prefix sum, then places every
 * element directly into its final slot. No two elements are ever compared
 * against each other, so the comparison counter stays at zero throughout —
 * that absence is itself the point this algorithm demonstrates. The swap
 * counter instead tracks each write into the output array.
 *
 * Assumes non-negative integer input, which holds for every array this app
 * generates.
 *
 * @yields snapshot objects (see _utils.ts)
 */
export function* countingSort(input: number[]): Generator<SortStep, void, undefined> {
  const a = [...input];
  const n = a.length;
  const sorted = new Set<number>();
  const comparisons = 0; // never incremented — this sort makes no comparisons
  let swaps = 0;

  if (n === 0) {
    // Tagged with the same final pseudocode line as the ordinary exit below.
    // The empty-array path is a second terminal yield, and the code panel would
    // otherwise clear its highlight on the one step it is guaranteed to show.
    yield done(a, comparisons, swaps, 8);
    return;
  }

  const max = Math.max(...a);
  const count = new Array(max + 1).fill(0);

  // Phase 1: tally how many times each value occurs.
  for (let i = 0; i < n; i++) {
    yield snap(a, [i], [], sorted, comparisons, swaps, 2);
    count[a[i]]++;
  }

  // Phase 2: turn counts into prefix sums — count[v] now holds the index just
  // past where the LAST occurrence of value v belongs in the output.
  //
  // Deliberately yields nothing, so the pseudocode lines for this phase are
  // never highlighted: the snapshot shape can only describe the array, and this
  // phase touches the tally table alone. Emitting a step per iteration would
  // stall the visualization on frames where every bar is visibly identical.
  for (let v = 1; v <= max; v++) {
    count[v] += count[v - 1];
  }

  // Phase 3: walk the input backwards (preserves relative order of equal
  // values, keeping the sort stable) and drop each element into its final
  // slot. The output starts zero-filled so every bar has a defined height
  // before it's placed.
  const output = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    const value = a[i];
    const destination = --count[value];
    output[destination] = value;
    swaps++;
    yield snap(output, [], [destination], sorted, comparisons, swaps, 7);
  }

  yield done(output, comparisons, swaps, 8);
}
`,fg=`import type { SortStep } from '@/types';
import { snap, done } from './_utils';

const BASE = 10; // decimal digits

/**
 * Radix Sort (LSD, base 10) — repeatedly buckets the array by one decimal
 * digit at a time, from least to most significant, using a stable counting
 * sort for each digit pass. Once every digit position up to the largest
 * number's has been processed, the array is fully ordered.
 *
 * Like Counting Sort, no two elements are ever compared directly, so the
 * comparison counter stays at zero; the swap counter tracks writes into each
 * pass's output array.
 *
 * Assumes non-negative integer input, which holds for every array this app
 * generates.
 *
 * @yields snapshot objects (see _utils.ts)
 */
export function* radixSort(input: number[]): Generator<SortStep, void, undefined> {
  let a = [...input];
  const n = a.length;
  const sorted = new Set<number>();
  const comparisons = 0; // never incremented — this sort makes no comparisons
  let swaps = 0;

  if (n === 0) {
    // Tagged with the same final pseudocode line as the ordinary exit below.
    // The empty-array path is a second terminal yield, and the code panel would
    // otherwise clear its highlight on the one step it is guaranteed to show.
    yield done(a, comparisons, swaps, 11);
    return;
  }

  const max = Math.max(...a);

  // exp = 1, 10, 100, ... selects the ones, tens, hundreds, ... digit.
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= BASE) {
    const digitOf = (value: number) => Math.floor(value / exp) % BASE;
    const count = new Array(BASE).fill(0);

    // Tally occurrences of the current digit across the array.
    for (let i = 0; i < n; i++) {
      yield snap(a, [i], [], sorted, comparisons, swaps, 4);
      count[digitOf(a[i])]++;
    }

    // Prefix-sum the digit counts into destination offsets. As in counting
    // sort, this phase yields nothing — it rearranges only the tally table, so
    // its pseudocode lines never light up.
    for (let d = 1; d < BASE; d++) {
      count[d] += count[d - 1];
    }

    // Place elements into this pass's output, walking backwards so elements
    // sharing a digit keep the relative order they had entering the pass —
    // the stability every earlier pass's ordering depends on.
    const output = new Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
      const destination = --count[digitOf(a[i])];
      output[destination] = a[i];
      swaps++;
      yield snap(output, [], [destination], sorted, comparisons, swaps, 9);
    }

    a = output;
  }

  yield done(a, comparisons, swaps, 11);
}
`,sc={bubble:{file:"bubbleSort.ts",text:og},selection:{file:"selectionSort.ts",text:ag},insertion:{file:"insertionSort.ts",text:rg},merge:{file:"mergeSort.ts",text:ig},quick:{file:"quickSort.ts",text:lg},heap:{file:"heapSort.ts",text:ug},shell:{file:"shellSort.ts",text:cg},comb:{file:"combSort.ts",text:dg},counting:{file:"countingSort.ts",text:pg},radix:{file:"radixSort.ts",text:fg}},hg=oa(sc),mg={compare:{wave:"sine",freq:330,durationMs:18,gain:.25},swap:{wave:"triangle",freq:660,durationMs:28,gain:.4},hit:{wave:"triangle",freq:495,durationMs:26,gain:.35},miss:{wave:"sine",freq:220,durationMs:22,gain:.22}},Xt=Object.freeze([]),ao=t=>t.comparing.length>0?["compare"]:t.swapping.length>0?["swap"]:Xt,ro={bubble:ao,insertion:ao,quick:ao,merge:ao};function ot(t){let e=t>>>0;function n(){e=e+1831565813|0;let a=e;return a=Math.imul(a^a>>>15,a|1),a^=a+Math.imul(a^a>>>7,a|61),((a^a>>>14)>>>0)/4294967296}function s(a,r){return r<a?a:a+Math.floor(n()*(r-a+1))}function o(a){if(a.length!==0)return a[s(0,a.length-1)]}return{next:n,int:s,pick:o}}function ze(){return Math.floor(Math.random()*4294967296)>>>0}function gg(t){if(t==null)return null;const e=t.trim();if(e==="")return null;const n=Number(e);return!Number.isFinite(n)||!Number.isInteger(n)?null:n>>>0}function _r(t){return C(()=>Math.max(4,Math.round(204-t.value*2)))}const bg=5e4,vg=2e3;function vn(t){const e=t.maxSteps??bg,n=B("idle"),s=B(-1),o=B(0),a=B(!1),r=B(!1),i=B(0);let l=[],u=null,c=null,d=0,p=null;const m=_r(t.speed),y=C(()=>n.value==="running"),g=C(()=>n.value==="paused"),v=C(()=>n.value==="done"),b=C(()=>n.value==="idle"||n.value==="done"),w=C(()=>s.value+1),S=C(()=>s.value>=0?l[s.value]:null),$=C(()=>s.value>=0),_=C(()=>n.value==="idle"||s.value<o.value-1||!a.value);function P(){c!==null&&(clearTimeout(c),c=null)}function K(){p=Date.now()}function I(){p!==null&&(d+=Date.now()-p,p=null),i.value=d}function N(){i.value=d+(p===null?0:Date.now()-p)}function j(){if(!u)return null;if(l.length>=e)return r.value=!0,a.value=!0,u=null,null;const{value:W,done:me}=u.next();return me||!W?(a.value=!0,u=null,null):(l.push(W),o.value=l.length,W.done&&(a.value=!0,u=null),W)}function he(W){if(s.value=W,W<0){t.clearStep();return}t.applyStep(l[W],W)}function Se(){return P(),l=[],o.value=0,s.value=-1,a.value=!1,r.value=!1,d=0,p=null,i.value=0,u=t.createGenerator(),u!==null}function z(){P(),I(),n.value="done"}function ae(){var me;if(n.value!=="running")return;let W;if(s.value<l.length-1)W=l[s.value+1],he(s.value+1);else{if(W=j(),W===null){z();return}he(l.length-1)}if((me=t.onAdvance)==null||me.call(t,W,s.value),N(),W.done){z();return}c=setTimeout(ae,m.value)}function L(){if(n.value!=="running"){if(n.value==="paused"){n.value="running",K(),ae();return}Se()&&(n.value="running",K(),ae())}}function J(){n.value==="running"&&(P(),I(),n.value="paused")}function le(){P(),u=null,l=[],o.value=0,s.value=-1,a.value=!1,r.value=!1,d=0,p=null,i.value=0,t.clearStep(),n.value="idle"}function G(W){n.value==="running"&&J();let me=Math.max(-1,W),Te=0;for(;me>=l.length&&u!==null&&Te<vg&&j()!==null;)Te+=1;me=Math.min(me,l.length-1),he(me),me>=0&&l[me].done?n.value="done":me<0&&l.length===0?n.value="idle":n.value="paused"}function re(){var me;if(n.value==="idle"&&!Se())return;const W=s.value;G(s.value+1),s.value>W&&((me=t.onAdvance)==null||me.call(t,l[s.value],s.value))}function $e(){G(s.value-1)}function tt(){if(!(n.value==="idle"&&!Se())){for(n.value==="running"&&J();u!==null&&j()!==null;);he(l.length-1),I(),n.value=l.length>0?"done":"idle"}}return Vo(P),{status:n,isRunning:y,isPaused:g,isDone:v,canEdit:b,delayMs:m,elapsedMs:i,cursor:s,stepCount:w,bufferedCount:o,fullyBuffered:a,truncated:r,current:S,canStepBack:$,canStepForward:_,run:L,pause:J,reset:le,stepForward:re,stepBack:$e,seek:G,skipToEnd:tt}}const yg=45,wg=.0015,Li=1e-4,xg=.5;function kg(){try{const t=window,e=window.AudioContext??t.webkitAudioContext;return e?new e:null}catch{return null}}function Ni(t){Promise.resolve(t).catch(()=>{})}function Sg(t={}){const e=t.createContext??kg,n=t.minIntervalMs??yg,s=t.now??(()=>performance.now());let o=null,a=null,r=!1,i=1,l={};const u=()=>xg*i*i;function c(){if(o)return!0;if(r)return!1;let g=null;try{g=e()}catch{g=null}return g?(o=g,a=o.createGain(),a.gain.value=u(),a.connect(o.destination),!0):(r=!0,!1)}function d(g){i=Math.min(1,Math.max(0,g)),a&&(a.gain.value=u())}function p(){!c()||!o||o.state==="suspended"&&Ni(o.resume())}function m(g,v){const b=s(),w=l[v];if(w!==void 0&&b-w<n||!c()||!o||!a)return!1;try{const S=o.currentTime,$=S+g.durationMs/1e3,_=o.createOscillator(),P=o.createGain();_.type=g.wave,_.frequency.value=g.freq,P.gain.setValueAtTime(Li,S),P.gain.linearRampToValueAtTime(g.gain,Math.min(S+wg,$)),P.gain.exponentialRampToValueAtTime(Li,$),_.connect(P),P.connect(a),_.onended=()=>{_.disconnect(),P.disconnect()},_.start(S),_.stop($+.01)}catch{return!1}return l[v]=b,!0}function y(){const g=o;o=null,a=null,l={},g&&Ni(g.close())}return{get available(){return!r},setVolume:d,unlock:p,play:m,dispose:y}}const oc="algoviz-audio-enabled",ac="algoviz-audio-volume",ka=.4;function $g(){try{return localStorage.getItem(oc)==="1"}catch{return!1}}function Eg(){try{const t=localStorage.getItem(ac);if(t===null||t==="")return ka;const e=Number(t);return Number.isFinite(e)&&e>=0&&e<=1?e:ka}catch{return ka}}const es=B($g()),Ds=B(Eg());let ns=null;function Pi(){try{localStorage.setItem(oc,es.value?"1":"0"),localStorage.setItem(ac,String(Ds.value))}catch{}}function Bi(){const t=ns??Sg();return ns=t,t.setVolume(Ds.value),t.unlock(),t}function Qs(){function t(){es.value=!es.value,Pi(),es.value&&Bi()}function e(s){Ds.value=Math.min(1,Math.max(0,s)),Pi(),ns==null||ns.setVolume(Ds.value)}function n(s){if(!es.value||s.length===0||document.hidden)return;const o=ns??Bi();for(const a of s)o.play(mg[a],a)}return{enabled:es,volume:Ds,toggle:t,setVolume:e,play:n}}function Cg(t,e){const n=t[e],s=Array.isArray(n)?n[0]:n;return typeof s=="string"?s:void 0}function Qt(t){const e=lh(),n=Object.keys(t),s=new Set,o=e.currentRoute.value.query;for(const l of n){const u=Cg(o,l);if(u===void 0)continue;const c=t[l].decode(u);c!==void 0&&(t[l].ref.value=c,s.add(l))}let a=null;function r(){const l=e.currentRoute.value.query,u={...l};for(const d of n){const p=t[d].encode(t[d].ref.value);p===null?delete u[d]:u[d]=p}(n.some(d=>u[d]!==l[d])||Object.keys(u).length!==Object.keys(l).length)&&e.replace({query:u}).catch(()=>{})}const i=Math.max(0,...n.map(l=>t[l].debounceMs??0));return Re(n.map(l=>t[l].ref),()=>{if(i===0){r();return}a!==null&&clearTimeout(a),a=setTimeout(r,i)},{flush:"post"}),Vo(()=>{a!==null&&clearTimeout(a)}),{hydrated:s}}const Ag=1,Tg=999,Og=200;function Ln(t,e){const n=(e==null?void 0:e.min)??Ag,s=(e==null?void 0:e.max)??Tg,o=(e==null?void 0:e.maxLength)??Og,a=t.trim().split(/[\s,]+/).filter(Boolean);if(a.length===0)return{values:[],error:"Enter at least one number."};if(a.length>o)return{values:[],error:`Enter at most ${o} numbers.`};const r=[];for(const i of a){const l=Number(i);if(!Number.isFinite(l)||!Number.isInteger(l))return{values:[],error:`"${i}" is not a whole number.`};r.push(Math.min(s,Math.max(n,l)))}return{values:r,error:null}}function Ze(t,e,n){if(t.trim()==="")return;const s=Number(t);if(!(!Number.isFinite(s)||!Number.isInteger(s)))return Math.min(n,Math.max(e,s))}function Jt(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return e}function Fi(t){return`${t.row},${t.col}`}function Hi(t,e,n){const s=t.split(",");if(s.length!==2)return;const[o,a]=s;if(o.trim()===""||a.trim()==="")return;const r=Number(o),i=Number(a);if(!(!Number.isFinite(r)||!Number.isInteger(r))&&!(!Number.isFinite(i)||!Number.isInteger(i))&&!(r<0||r>=e||i<0||i>=n))return{row:r,col:i}}const rc="-",Mg=64;function Io(t,e){return t.map(e.encodeOp).join(rc)}function ic(t,e){const n=t.trim();if(n==="")return[];const s=n.split(rc);if(s.length>(e.maxOps??Mg))return;const o=[];for(const a of s){const r=e.decodeOp(a);if(r===void 0)return;o.push(r)}return o}const En=t=>t.cursor!==null?["compare"]:t.path.length>0?["hit"]:Xt,io={fib:En,"coin-change":En,lis:En,knapsack:En,"subset-sum":En,lcs:En,"edit-distance":En,"matrix-chain":En},_g={fib:["dp[0] = 0; dp[1] = 1","for k = 2 to n:  dp[k] = dp[k - 1] + dp[k - 2]","traceback: every dp[k] fed the two cells after it","done — fib(n) = dp[n]"],"coin-change":["dp[0] = 0   // zero coins make zero","for a = 1 to amount","  dp[a] = 1 + min(dp[a - c]) over coins c <= a","traceback: subtract the winning coin, repeat","done — dp[amount] is the fewest coins"],lis:["dp[i] = 1   // a[i] on its own is a subsequence","for i = 0 to n - 1","  dp[i] = 1 + max(dp[j]) over j < i with a[j] < a[i]","traceback: from argmax dp, hop to the predecessor that won","done — the answer is max(dp), not dp[n - 1]"],knapsack:["dp[0][c] = 0 for every c   // no items, no value","for i = 1 to n","  for c = 0 to capacity","    skip = dp[i-1][c];  take = v_i + dp[i-1][c - w_i] if w_i <= c","    dp[i][c] = max(skip, take)","traceback: dp[i][c] != dp[i-1][c] means item i was taken","done — dp[n][capacity] is the best value"],"subset-sum":["dp[0][0] = 1; dp[0][t] = 0 for t > 0","for i = 1 to n","  for t = 0 to target","    skip = dp[i-1][t];  take = dp[i-1][t - w_i] if w_i <= t","    dp[i][t] = skip OR take","traceback: follow whichever branch held 1","done — dp[n][target] = 1 means the target is reachable"],lcs:["dp[i][0] = dp[0][j] = 0","for i = 1 to m, for j = 1 to n","  if a[i-1] == b[j-1]:  dp[i][j] = 1 + dp[i-1][j-1]","  else:                 dp[i][j] = max(dp[i-1][j], dp[i][j-1])","traceback: on a match take the character and step diagonally","done — dp[m][n] is the LCS length"],"edit-distance":["dp[i][0] = i   // delete everything","dp[0][j] = j   // insert everything","  if a[i-1] == b[j-1]:  dp[i][j] = dp[i-1][j-1]","  else:  dp[i][j] = 1 + min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1])","traceback: read the edit script off the winning branches","done — dp[m][n] is the edit distance"],"matrix-chain":["dp[i][i] = 0   // one matrix needs no multiplication","for len = 2 to n:  for each i, with j = i + len - 1","  dp[i][j] = min over k in [i, j) of","             dp[i][k] + dp[k+1][j] + d[i]*d[k+1]*d[j+1]","traceback: descend into the winning split on both sides","done — dp[0][n-1] is the fewest scalar multiplications"]},Rg=`import type { DpDep, DpStep, StepGenerator } from '@/types';
import type { DpBranch, DpTableData, ScalarInput } from './types';
import { baseCase, board, cell1, dep, done, formula, snap, walk, write } from './_utils';
import { naiveFibCalls } from './naiveCount';

/**
 * Fibonacci — the smallest honest example of the whole idea.
 *
 * The table is one row, \`dp[k] = fib(k)\`, filled left to right. There is no
 * choice to make at any cell, which is exactly why it goes first: every other
 * algorithm here adds a decision on top of the same machinery, and having seen
 * the machinery without one makes the decision visible when it appears.
 *
 * Pseudocode lines this generator tags (see \`pseudocode.ts\`):
 *   0  dp[0] = 0; dp[1] = 1
 *   1  for k = 2 to n: dp[k] = dp[k - 1] + dp[k - 2]
 *   2  traceback: every dp[k] fed dp[k + 1] and dp[k + 2]
 *   3  done
 */

/**
 * Both branches are always taken — this is a sum, not a choice — so \`score\`
 * carries each addend's contribution and no caller ever runs \`best\` over them.
 * \`DpStep.chosen\` is correspondingly null for every Fibonacci step, which is
 * the honest answer to "which branch was selected": none, both were.
 */
function branchesOf(col: number, table: DpTableData): DpBranch[] {
  if (col < 2) return [];
  const a = dep(table, 0, col - 1, 'f(k-1)');
  const b = dep(table, 0, col - 2, 'f(k-2)');
  return [
    { deps: [a], score: a.value ?? 0, text: \`\${cell1(col - 1)}=\${a.value ?? 0}\` },
    { deps: [b], score: b.value ?? 0, text: \`\${cell1(col - 2)}=\${b.value ?? 0}\` },
  ];
}

export function depsOf(
  _input: ScalarInput,
  _row: number,
  col: number,
  table: DpTableData,
): DpDep[] {
  return branchesOf(col, table).flatMap((b) => b.deps);
}

export function* fib(input: ScalarInput): StepGenerator<DpStep> {
  const n = input.n;
  const b = board(1, n + 1);

  for (let k = 0; k <= n; k++) {
    if (k < 2) {
      write(b, 0, k, k);
      const cur = { row: 0, col: k };
      const why = baseCase(cell1(k), k, 'base case');
      yield snap(b, cur, [], null, why, 0);
      continue;
    }

    const branches = branchesOf(k, b.table);
    const deps = branches.flatMap((x) => x.deps);
    const value = branches[0].score + branches[1].score;
    write(b, 0, k, value);
    const cur = { row: 0, col: k };
    const why = formula(cell1(k), branches.map((x) => x.text).join(' + '), value);
    yield snap(b, cur, deps, null, why, 1);
  }

  // Fibonacci's "traceback" is degenerate and deliberately still shown: because
  // every cell feeds the two after it, the set of cells that contributed to
  // dp[n] is the entire row. Walking it right-to-left is what makes that fact
  // visible rather than merely true — the other seven algorithms light up a
  // thin path through a large table, and seeing this one light up everything
  // is the contrast that explains why memoization pays here at all.
  for (let k = n; k >= 0; k--) {
    walk(b, { row: 0, col: k });
    const why = \`\${cell1(k)} = \${b.table[0][k]} contributed to every later cell\`;
    yield snap(b, null, [], null, why, 2);
  }

  const answer = b.table[0][n] ?? 0;
  const result = \`fib(\${n}) = \${answer}\`;
  yield done(b, result, \`\${cell1(n)} = \${answer}\`, 3);
}

export const spec = {
  kind: 'scalar' as const,
  defaults: { kind: 'scalar' as const, n: 12 },
  recurrence: 'dp[k] = dp[k-1] + dp[k-2]',

  axes: (input: ScalarInput) => ({
    rowHeaders: ['fib(k)'],
    colHeaders: Array.from({ length: input.n + 1 }, (_, k) => String(k)),
    rowTitle: '',
    colTitle: 'k',
  }),

  dims: (input: ScalarInput) => ({ rows: 1, cols: input.n + 1, fillable: input.n + 1 }),

  // 40 rather than the 899 the cell budget would allow: fib(79) is the first
  // value past Number.MAX_SAFE_INTEGER, so a larger table would start showing
  // rounded results in a visualizer whose entire claim is that the cells are
  // the exact answers. 40 also keeps the naive call count (331,160,281) large
  // enough to make the point and small enough to print in full.
  validate: (input: ScalarInput) =>
    Number.isInteger(input.n) && input.n >= 0 && input.n <= 40
      ? null
      : 'n must be a whole number from 0 to 40.',

  depsOf,
  generator: fib,
  naiveCalls: (input: ScalarInput) => naiveFibCalls(input.n),
};
`,jg=`import type { DpDep, DpStep, StepGenerator } from '@/types';
import type { CoinsInput, DpBranch, DpTableData } from './types';
import { UNREACHABLE } from './types';
import {
  baseCase,
  best,
  board,
  cell1,
  cellOf,
  dep,
  done,
  fmt,
  formula,
  opCall,
  snap,
  walk,
  write,
} from './_utils';
import { naiveCoinCalls } from './naiveCount';

/**
 * Coin Change (fewest coins) — one row, \`dp[a]\` = the fewest coins that make
 * amount \`a\`, filled left to right.
 *
 * This is the first algorithm in the set with a real decision at every cell,
 * and the first where a cell can legitimately have no answer at all: with coins
 * {4, 6} no combination makes 5. Unreachable amounts hold \`Infinity\` rather
 * than a sentinel like -1, so \`1 + min(...)\` keeps working unmodified and the
 * table renders them as \`∞\` — see UNREACHABLE in \`types.ts\`.
 *
 * Pseudocode lines this generator tags (see \`pseudocode.ts\`):
 *   0  dp[0] = 0
 *   1  for a = 1 to amount
 *   2    dp[a] = 1 + min over coins c <= a of dp[a - c]
 *   3  traceback: subtract the winning coin and repeat
 *   4  done
 */

/**
 * One branch per usable coin. \`score\` is \`1 + dp[a-c]\` — the cost of taking
 * that coin — while the dep's own \`value\` stays \`dp[a-c]\`, per DpDep's
 * contract that it carries the dependency's contents rather than the branch's
 * result. Ordered by the coin list, so ties go to the earliest coin.
 */
function branchesOf(input: CoinsInput, col: number, table: DpTableData): DpBranch[] {
  if (col === 0) return [];

  const branches: DpBranch[] = [];
  for (const coin of input.coins) {
    if (coin > col) continue;
    const d = dep(table, 0, col - coin, \`coin \${coin}\`);
    const below = d.value ?? UNREACHABLE;
    const score = below === UNREACHABLE ? UNREACHABLE : below + 1;
    branches.push({ deps: [d], score, text: \`1+\${cell1(col - coin)}=\${fmt(score)}\` });
  }
  return branches;
}

export function depsOf(input: CoinsInput, _row: number, col: number, table: DpTableData): DpDep[] {
  return branchesOf(input, col, table).flatMap((b) => b.deps);
}

export function* coinChange(input: CoinsInput): StepGenerator<DpStep> {
  const { amount } = input;
  const b = board(1, amount + 1);

  write(b, 0, 0, 0);
  yield snap(b, { row: 0, col: 0 }, [], null, baseCase(cell1(0), 0, 'zero coins make 0'), 0);

  for (let a = 1; a <= amount; a++) {
    const branches = branchesOf(input, a, b.table);
    const deps = branches.flatMap((x) => x.deps);
    const winner = best(branches, 'min');
    const value = winner === null ? UNREACHABLE : winner.score;
    write(b, 0, a, value);

    const cur = { row: 0, col: a };
    // A winner whose score is still Infinity means every coin led somewhere
    // unreachable, so there *is* no chosen branch — null rather than pointing
    // at an arbitrary dead end, which would draw a confident arrow at a lie.
    const picked = winner !== null && value !== UNREACHABLE ? cellOf(winner.deps[0]) : null;
    const why =
      branches.length === 0
        ? baseCase(cell1(a), value, 'no coin is small enough')
        : formula(cell1(a), opCall('min', branches), value);
    yield snap(b, cur, deps, picked, why, 2);
  }

  // Traceback. Re-derives the winning coin at each hop with the same
  // \`branchesOf\` + \`best\` the fill used, rather than reading a side table of
  // choices recorded during the fill: two sources for one decision is two
  // things to keep in agreement, and \`best\`'s documented first-wins tie-break
  // is what makes the re-derivation give the identical answer.
  const used: number[] = [];
  let at = amount;
  const reachable = b.table[0][amount] !== UNREACHABLE;

  if (reachable) {
    walk(b, { row: 0, col: at });
    const start = \`start at \${cell1(at)} = \${fmt(b.table[0][at])}\`;
    yield snap(b, null, [], null, start, 3);

    while (at > 0) {
      const winner = best(branchesOf(input, at, b.table), 'min');
      if (winner === null) break;
      const next = winner.deps[0].col;
      const coin = at - next;
      used.push(coin);
      at = next;
      walk(b, { row: 0, col: at });
      const why = \`take coin \${coin} — \${cell1(at + coin)} came from \${cell1(at)}\`;
      yield snap(b, null, [], null, why, 3);
    }
  }

  const total = b.table[0][amount];
  const result = reachable
    ? \`\${used.join(' + ')} = \${amount}  (\${used.length} coin\${used.length === 1 ? '' : 's'})\`
    : \`no combination of {\${input.coins.join(', ')}} makes \${amount}\`;
  yield done(b, result, \`\${cell1(amount)} = \${fmt(total)}\`, 4);
}

export const spec = {
  kind: 'coins' as const,
  defaults: { kind: 'coins' as const, coins: [1, 3, 4], amount: 11 },
  recurrence: 'dp[a] = 1 + min(dp[a - c]) over coins c <= a',

  axes: (input: CoinsInput) => ({
    rowHeaders: ['min coins'],
    colHeaders: Array.from({ length: input.amount + 1 }, (_, a) => String(a)),
    rowTitle: '',
    colTitle: 'amount',
  }),

  dims: (input: CoinsInput) => ({ rows: 1, cols: input.amount + 1, fillable: input.amount + 1 }),

  validate: (input: CoinsInput) => {
    if (input.coins.length === 0) return 'Enter at least one coin.';
    if (input.coins.some((c) => !Number.isInteger(c) || c < 1)) {
      return 'Coin values must be whole numbers of at least 1.';
    }
    // Duplicates are not wrong — the recurrence handles them — but they add a
    // second identical branch to every cell, so the arrows double up and the
    // explain string repeats itself. Rejecting is kinder than rendering that.
    if (new Set(input.coins).size !== input.coins.length) return 'Coin values must be distinct.';
    if (!Number.isInteger(input.amount) || input.amount < 0) return 'Amount must be 0 or more.';
    return null;
  },

  depsOf,
  generator: coinChange,
  naiveCalls: (input: CoinsInput) => naiveCoinCalls(input.coins, input.amount),
};
`,Ig=`import type { DpDep, DpStep, StepGenerator } from '@/types';
import type { DpBranch, DpTableData, SequenceInput } from './types';
import {
  baseCase,
  best,
  board,
  cell1,
  cellOf,
  dep,
  done,
  formula,
  opCall,
  snap,
  walk,
  write,
} from './_utils';
import { naiveLisCalls } from './naiveCount';

/**
 * Longest Increasing Subsequence — one row, \`dp[i]\` = the length of the longest
 * increasing subsequence *ending at* i.
 *
 * "Ending at i" rather than "within a[0..i]" is the whole trick, and it is worth
 * spelling out because the other formulation looks more natural and does not
 * work: knowing the best answer over a prefix tells you nothing about whether
 * the next element can extend it, whereas knowing the best answer *ending at*
 * each earlier index does. That is also why the answer is \`max(dp)\` rather than
 * \`dp[n-1]\`, and why this is the one algorithm here whose traceback has to
 * search for its own starting cell.
 *
 * The O(n log n) patience-sorting variant is deliberately not what is shown:
 * it is faster and it is not a table, and this category is about tables.
 *
 * Pseudocode lines this generator tags (see \`pseudocode.ts\`):
 *   0  dp[i] = 1 for every i
 *   1  for i = 0 to n - 1
 *   2    dp[i] = 1 + max(dp[j]) over j < i with a[j] < a[i]
 *   3  traceback: from argmax dp, hop to the predecessor that won
 *   4  done
 */

function branchesOf(input: SequenceInput, col: number, table: DpTableData): DpBranch[] {
  const values = input.values;
  const branches: DpBranch[] = [];
  for (let j = 0; j < col; j++) {
    if (values[j] >= values[col]) continue;
    const d = dep(table, 0, j, \`a[\${j}]=\${values[j]}\`);
    branches.push({ deps: [d], score: (d.value ?? 0) + 1, text: \`\${cell1(j)}=\${d.value ?? 0}\` });
  }
  return branches;
}

export function depsOf(
  input: SequenceInput,
  _row: number,
  col: number,
  table: DpTableData,
): DpDep[] {
  return branchesOf(input, col, table).flatMap((b) => b.deps);
}

export function* lis(input: SequenceInput): StepGenerator<DpStep> {
  const values = input.values;
  const n = values.length;
  const b = board(1, n);

  for (let i = 0; i < n; i++) {
    const branches = branchesOf(input, i, b.table);
    const deps = branches.flatMap((x) => x.deps);
    const winner = best(branches, 'max');
    const value = winner === null ? 1 : winner.score;
    write(b, 0, i, value);

    const cur = { row: 0, col: i };
    // Two yields rather than one with a conditional tag: \`sourceMap.ts\` reads
    // the tag off the source text with a regex that demands a literal integer
    // as the last argument, so \`winner === null ? 0 : 2\` would parse as an
    // untagged yield and silently drop this line out of the Source view.
    if (winner === null) {
      const why = baseCase(cell1(i), 1, \`nothing to the left is smaller than \${values[i]}\`);
      yield snap(b, cur, deps, null, why, 0);
    } else {
      const body = \`1 + \${opCall('max', branches)}\`;
      const why = formula(cell1(i), body, value);
      yield snap(b, cur, deps, cellOf(winner.deps[0]), why, 2);
    }
  }

  // The answer lives at whichever index holds the largest dp value, not at the
  // last one — see the header. First-wins on ties, matching \`best\`, so the
  // reconstructed subsequence is the earliest-ending longest one.
  let endAt = -1;
  for (let i = 0; i < n; i++) {
    if (endAt === -1 || (b.table[0][i] ?? 0) > (b.table[0][endAt] ?? 0)) endAt = i;
  }

  const picked: number[] = [];
  let at = endAt;
  while (at >= 0) {
    picked.push(at);
    walk(b, { row: 0, col: at });
    const why = \`a[\${at}]=\${values[at]} is in the subsequence (\${cell1(at)}=\${b.table[0][at]})\`;
    yield snap(b, null, [], null, why, 3);

    const winner = best(branchesOf(input, at, b.table), 'max');
    at = winner === null ? -1 : winner.deps[0].col;
  }

  picked.reverse();
  const length = endAt === -1 ? 0 : (b.table[0][endAt] ?? 0);
  const seq = picked.map((i) => values[i]).join(', ');
  const result = endAt === -1 ? 'the sequence is empty' : \`[\${seq}]  (length \${length})\`;
  yield done(b, result, \`longest increasing subsequence has length \${length}\`, 4);
}

export const spec = {
  kind: 'sequence' as const,
  defaults: { kind: 'sequence' as const, values: [3, 10, 2, 1, 20, 4, 6, 21, 5] },
  recurrence: 'dp[i] = 1 + max(dp[j]) over j < i with a[j] < a[i]',

  axes: (input: SequenceInput) => ({
    rowHeaders: ['LIS ending here'],
    colHeaders: input.values.map(String),
    rowTitle: '',
    colTitle: 'a[i]',
  }),

  dims: (input: SequenceInput) => ({
    rows: 1,
    cols: input.values.length,
    fillable: input.values.length,
  }),

  validate: (input: SequenceInput) => {
    if (input.values.length === 0) return 'Enter at least one number.';
    // Quadratic in n *per cell* for the naive counter and for \`branchesOf\`, and
    // a one-row table wider than this stops fitting any sane scroll. The cell
    // budget alone would allow 900, which would make \`naiveLisCalls\` do 405k
    // additions every time the input panel re-validates a keystroke.
    if (input.values.length > 40) return 'Enter at most 40 numbers.';
    return null;
  },

  depsOf,
  generator: lis,
  naiveCalls: (input: SequenceInput) => naiveLisCalls(input.values),
};
`,Dg=`import type { DpDep, DpStep, StepGenerator } from '@/types';
import type { DpBranch, DpTableData, ItemsInput } from './types';
import {
  baseCase,
  best,
  board,
  cell2,
  cellOf,
  dep,
  done,
  formula,
  opCall,
  snap,
  walk,
  write,
} from './_utils';
import { naiveItemCalls } from './naiveCount';

/**
 * 0/1 Knapsack — \`dp[i][c]\` = the best value obtainable from the first \`i\`
 * items within capacity \`c\`. Row 0 is the empty knapsack, so it is all zeros.
 *
 * The canonical two-branch recurrence, and the reason this is the example most
 * DP courses reach for: every cell is one genuine either/or, and the traceback
 * reads the decision straight back out of the table without needing anything
 * recorded alongside it — \`dp[i][c] != dp[i-1][c]\` means item i was taken.
 *
 * "0/1" is the constraint that each item is available once; the unbounded
 * variant (each item reusable) is a one-character change to the recurrence
 * (\`dp[i]\` instead of \`dp[i-1]\` on the take branch) and is deliberately not
 * offered here — coin change already *is* the unbounded case, so shipping both
 * would show the same recurrence twice under two names.
 *
 * Pseudocode lines this generator tags (see \`pseudocode.ts\`):
 *   0  dp[0][c] = 0 for every c
 *   4  dp[i][c] = max(skip, take)
 *   5  traceback
 *   6  done
 */

/**
 * Skip is listed first, and \`best\`'s first-wins tie-break makes that load
 * bearing: when taking an item gains nothing, the traceback below reads a
 * value equal to \`dp[i-1][c]\` as "skipped", so the fill must have drawn its
 * chosen-arrow at the skip branch too or the arrows and the reconstruction
 * would disagree on exactly the ties.
 */
function branchesOf(input: ItemsInput, row: number, col: number, table: DpTableData): DpBranch[] {
  if (row === 0) return [];

  const item = input.items[row - 1];
  const skip = dep(table, row - 1, col, 'skip');
  const branches: DpBranch[] = [
    { deps: [skip], score: skip.value ?? 0, text: \`\${cell2(row - 1, col)}=\${skip.value ?? 0}\` },
  ];

  if (item.weight <= col) {
    const take = dep(table, row - 1, col - item.weight, 'take');
    const score = (take.value ?? 0) + item.value;
    const cellText = cell2(row - 1, col - item.weight);
    branches.push({ deps: [take], score, text: \`\${item.value}+\${cellText}=\${score}\` });
  }
  return branches;
}

export function depsOf(input: ItemsInput, row: number, col: number, table: DpTableData): DpDep[] {
  return branchesOf(input, row, col, table).flatMap((b) => b.deps);
}

export function* knapsack(input: ItemsInput): StepGenerator<DpStep> {
  const { items, capacity } = input;
  const rows = items.length + 1;
  const b = board(rows, capacity + 1);

  for (let c = 0; c <= capacity; c++) {
    write(b, 0, c, 0);
    const cur = { row: 0, col: c };
    const why = baseCase(cell2(0, c), 0, 'no items to choose from');
    yield snap(b, cur, [], null, why, 0);
  }

  for (let i = 1; i < rows; i++) {
    for (let c = 0; c <= capacity; c++) {
      const branches = branchesOf(input, i, c, b.table);
      const deps = branches.flatMap((x) => x.deps);
      const winner = best(branches, 'max');
      const value = winner === null ? 0 : winner.score;
      write(b, i, c, value);

      const cur = { row: i, col: c };
      const picked = winner === null ? null : cellOf(winner.deps[0]);
      const why = formula(cell2(i, c), opCall('max', branches), value);
      yield snap(b, cur, deps, picked, why, 4);
    }
  }

  // Traceback. Re-derives each decision from the table with the same
  // \`branchesOf\` + \`best\` the fill used — see coinChange.ts for why a side
  // table of recorded choices was rejected.
  const taken: number[] = [];
  let row = rows - 1;
  let col = capacity;
  walk(b, { row, col });
  yield snap(b, null, [], null, \`start at \${cell2(row, col)} = \${b.table[row][col]}\`, 5);

  while (row > 0) {
    const winner = best(branchesOf(input, row, col, b.table), 'max');
    if (winner === null) break;
    const next = winner.deps[0];
    const took = next.label === 'take';
    if (took) taken.push(row);
    const item = items[row - 1];
    const why = took
      ? \`take item #\${row} (w=\${item.weight}, v=\${item.value}) — drop to \${cell2(next.row, next.col)}\`
      : \`skip item #\${row} — \${cell2(row, col)} equals \${cell2(next.row, next.col)}\`;
    row = next.row;
    col = next.col;
    walk(b, { row, col });
    yield snap(b, null, [], null, why, 5);
  }

  taken.reverse();
  const weight = taken.reduce((sum, i) => sum + items[i - 1].weight, 0);
  const value = b.table[rows - 1][capacity] ?? 0;
  const names = taken.map((i) => \`#\${i}\`).join(', ');
  const result = taken.length
    ? \`take {\${names}} — weight \${weight}/\${capacity}, value \${value}\`
    : \`take nothing — no item fits in \${capacity}\`;
  yield done(b, result, \`\${cell2(rows - 1, capacity)} = \${value}\`, 6);
}

export const spec = {
  kind: 'items' as const,
  defaults: {
    kind: 'items' as const,
    items: [
      { weight: 2, value: 3 },
      { weight: 3, value: 4 },
      { weight: 4, value: 5 },
      { weight: 5, value: 8 },
    ],
    capacity: 9,
  },
  recurrence: 'dp[i][c] = max(dp[i-1][c], v_i + dp[i-1][c - w_i])',

  axes: (input: ItemsInput) => ({
    rowHeaders: ['—', ...input.items.map((it, i) => \`#\${i + 1} w\${it.weight} v\${it.value}\`)],
    colHeaders: Array.from({ length: input.capacity + 1 }, (_, c) => String(c)),
    rowTitle: 'items',
    colTitle: 'capacity',
  }),

  dims: (input: ItemsInput) => {
    const rows = input.items.length + 1;
    const cols = input.capacity + 1;
    return { rows, cols, fillable: rows * cols };
  },

  validate: (input: ItemsInput) => validateItems(input, 'capacity'),

  depsOf,
  generator: knapsack,
  naiveCalls: (input: ItemsInput) =>
    naiveItemCalls(
      input.items.map((it) => it.weight),
      input.capacity,
    ),
};

/**
 * Shared with subset-sum, which uses the same editor and the same table shape
 * and differs only in what the second axis is called. Exported from here rather
 * than from \`_utils.ts\` because it is knowledge about the \`items\` input kind,
 * not about DP snapshots.
 */
export function validateItems(input: ItemsInput, capacityWord: string): string | null {
  if (input.items.length === 0) return 'Enter at least one item.';
  if (input.items.some((it) => !Number.isInteger(it.weight) || it.weight < 1)) {
    return 'Item weights must be whole numbers of at least 1.';
  }
  if (input.items.some((it) => !Number.isInteger(it.value) || it.value < 0)) {
    return 'Item values must be whole numbers of 0 or more.';
  }
  if (!Number.isInteger(input.capacity) || input.capacity < 0) {
    return \`The \${capacityWord} must be 0 or more.\`;
  }
  return null;
}
`,Lg=`import type { DpDep, DpStep, StepGenerator } from '@/types';
import type { DpBranch, DpTableData, ItemsInput } from './types';
import {
  baseCase,
  best,
  board,
  cell2,
  cellOf,
  dep,
  done,
  formula,
  snap,
  walk,
  write,
} from './_utils';
import { validateItems } from './knapsack';
import { naiveItemCalls } from './naiveCount';

/**
 * Subset Sum — \`dp[i][t]\` = 1 if some subset of the first \`i\` items sums to
 * exactly \`t\`, 0 if none does.
 *
 * It shares knapsack's table shape, its editor and its naive-call recurrence,
 * and that is the point of shipping both: side by side they show that the
 * *structure* of a DP is not about what it computes. Swap \`max\` for \`or\` and
 * drop the values, and the identical table answers a decision problem instead
 * of an optimisation one.
 *
 * Booleans are stored as 1/0 rather than as a separate cell type because
 * \`DpStep.table\` is \`(number | null)[][]\` for every algorithm in the category,
 * and a boolean variant would have rippled into the renderer, the hover
 * overlay and the snapshot type for one algorithm's benefit. The row headers
 * and the recurrence text carry the "this is a yes/no" reading instead.
 *
 * Pseudocode lines this generator tags (see \`pseudocode.ts\`):
 *   0  dp[0][0] = 1; dp[0][t] = 0 for t > 0
 *   4  dp[i][t] = skip OR take
 *   5  traceback
 *   6  done
 */

/** Skip first, for the same tie-break reason knapsack lists it first. */
function branchesOf(input: ItemsInput, row: number, col: number, table: DpTableData): DpBranch[] {
  if (row === 0) return [];

  const item = input.items[row - 1];
  const skip = dep(table, row - 1, col, 'skip');
  const branches: DpBranch[] = [
    { deps: [skip], score: skip.value ?? 0, text: \`\${cell2(row - 1, col)}=\${skip.value ?? 0}\` },
  ];

  if (item.weight <= col) {
    const take = dep(table, row - 1, col - item.weight, 'take');
    const score = take.value ?? 0;
    branches.push({ deps: [take], score, text: \`\${cell2(row - 1, col - item.weight)}=\${score}\` });
  }
  return branches;
}

export function depsOf(input: ItemsInput, row: number, col: number, table: DpTableData): DpDep[] {
  return branchesOf(input, row, col, table).flatMap((b) => b.deps);
}

export function* subsetSum(input: ItemsInput): StepGenerator<DpStep> {
  const { items, capacity: target } = input;
  const rows = items.length + 1;
  const b = board(rows, target + 1);

  for (let t = 0; t <= target; t++) {
    const value = t === 0 ? 1 : 0;
    write(b, 0, t, value);
    const cur = { row: 0, col: t };
    const why = baseCase(cell2(0, t), value, t === 0 ? 'the empty set sums to 0' : 'no items yet');
    yield snap(b, cur, [], null, why, 0);
  }

  for (let i = 1; i < rows; i++) {
    for (let t = 0; t <= target; t++) {
      const branches = branchesOf(input, i, t, b.table);
      const deps = branches.flatMap((x) => x.deps);
      const winner = best(branches, 'max');
      const value = winner === null ? 0 : winner.score;
      write(b, i, t, value);

      const cur = { row: i, col: t };
      // No arrow when the cell is 0: \`chosen\` means "the branch this cell's
      // value came from", and an unreachable cell did not come from anywhere.
      // Pointing at the first branch anyway would draw a confident arrow at a
      // dead end, which is the one thing the provenance arrows must never do.
      const picked = value === 1 && winner !== null ? cellOf(winner.deps[0]) : null;
      const body = branches.map((x) => x.text).join(' or ');
      const why = formula(cell2(i, t), body, value);
      yield snap(b, cur, deps, picked, why, 4);
    }
  }

  const reachable = b.table[rows - 1][target] === 1;
  const chosenItems: number[] = [];
  let row = rows - 1;
  let col = target;

  if (reachable) {
    walk(b, { row, col });
    yield snap(b, null, [], null, \`start at \${cell2(row, col)} = 1\`, 5);

    while (row > 0) {
      const winner = best(branchesOf(input, row, col, b.table), 'max');
      if (winner === null || winner.score !== 1) break;
      const next = winner.deps[0];
      const took = next.label === 'take';
      if (took) chosenItems.push(row);
      const item = items[row - 1];
      const why = took
        ? \`take item #\${row} (w=\${item.weight}) — drop to \${cell2(next.row, next.col)}\`
        : \`skip item #\${row} — \${cell2(next.row, next.col)} is already 1\`;
      row = next.row;
      col = next.col;
      walk(b, { row, col });
      yield snap(b, null, [], null, why, 5);
    }
  }

  chosenItems.reverse();
  const weights = chosenItems.map((i) => items[i - 1].weight);
  const result = reachable
    ? \`{\${weights.join(', ')}} sums to \${target}\`
    : \`no subset of {\${items.map((it) => it.weight).join(', ')}} sums to \${target}\`;
  yield done(b, result, \`\${cell2(rows - 1, target)} = \${reachable ? 1 : 0}\`, 6);
}

export const spec = {
  kind: 'items' as const,
  defaults: {
    kind: 'items' as const,
    items: [
      { weight: 3, value: 0 },
      { weight: 34, value: 0 },
      { weight: 4, value: 0 },
      { weight: 12, value: 0 },
      { weight: 5, value: 0 },
      { weight: 2, value: 0 },
    ],
    capacity: 9,
  },
  recurrence: 'dp[i][t] = dp[i-1][t] OR dp[i-1][t - w_i]',

  axes: (input: ItemsInput) => ({
    rowHeaders: ['—', ...input.items.map((it, i) => \`#\${i + 1} w\${it.weight}\`)],
    colHeaders: Array.from({ length: input.capacity + 1 }, (_, t) => String(t)),
    rowTitle: 'items',
    colTitle: 'target',
  }),

  dims: (input: ItemsInput) => {
    const rows = input.items.length + 1;
    const cols = input.capacity + 1;
    return { rows, cols, fillable: rows * cols };
  },

  validate: (input: ItemsInput) => validateItems(input, 'target'),

  depsOf,
  generator: subsetSum,
  naiveCalls: (input: ItemsInput) =>
    naiveItemCalls(
      input.items.map((it) => it.weight),
      input.capacity,
    ),
};
`,Ng=`import type { DpDep, DpStep, StepGenerator } from '@/types';
import type { DpBranch, DpTableData, Strings2Input } from './types';
import {
  baseCase,
  best,
  board,
  cell2,
  cellOf,
  dep,
  done,
  formula,
  opCall,
  snap,
  walk,
  write,
} from './_utils';
import { naiveLcsCalls } from './naiveCount';

/**
 * Longest Common Subsequence — \`dp[i][j]\` = the length of the LCS of the first
 * \`i\` characters of \`a\` and the first \`j\` of \`b\`.
 *
 * The first algorithm here whose cell has a *different shape* of recurrence
 * depending on the data: on a matching pair there is exactly one branch and no
 * decision at all, on a mismatch there are two and a choice. That is visible in
 * the arrows — a diagonal run of single arrows through the matches, forks
 * everywhere else — and it is why LCS and edit distance are worth having
 * side by side: same table, same traversal, and edit distance turns the match
 * case into a *third* branch rather than a shortcut.
 *
 * Pseudocode lines this generator tags (see \`pseudocode.ts\`):
 *   0  dp[i][0] = dp[0][j] = 0
 *   2  match:    dp[i][j] = 1 + dp[i-1][j-1]
 *   3  mismatch: dp[i][j] = max(dp[i-1][j], dp[i][j-1])
 *   4  traceback
 *   5  done
 */

/**
 * The "drop from a" branch is listed first so \`best\`'s first-wins tie-break
 * resolves an equal-length choice upwards, and the traceback re-deriving the
 * same choice lands on the same cell. Which way ties break changes *which*
 * longest common subsequence is reported when several exist, so it has to be
 * pinned somewhere; pinning it in the branch order pins it for both phases at
 * once.
 */
function branchesOf(
  input: Strings2Input,
  row: number,
  col: number,
  table: DpTableData,
): DpBranch[] {
  if (row === 0 || col === 0) return [];

  if (input.a[row - 1] === input.b[col - 1]) {
    const diag = dep(table, row - 1, col - 1, 'match');
    const score = (diag.value ?? 0) + 1;
    return [{ deps: [diag], score, text: \`1+\${cell2(row - 1, col - 1)}=\${score}\` }];
  }

  const up = dep(table, row - 1, col, 'drop from a');
  const left = dep(table, row, col - 1, 'drop from b');
  return [
    { deps: [up], score: up.value ?? 0, text: \`\${cell2(row - 1, col)}=\${up.value ?? 0}\` },
    { deps: [left], score: left.value ?? 0, text: \`\${cell2(row, col - 1)}=\${left.value ?? 0}\` },
  ];
}

export function depsOf(
  input: Strings2Input,
  row: number,
  col: number,
  table: DpTableData,
): DpDep[] {
  return branchesOf(input, row, col, table).flatMap((b) => b.deps);
}

export function* lcs(input: Strings2Input): StepGenerator<DpStep> {
  const { a, b: bStr } = input;
  const rows = a.length + 1;
  const cols = bStr.length + 1;
  const b = board(rows, cols);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (i === 0 || j === 0) {
        write(b, i, j, 0);
        const cur = { row: i, col: j };
        const why = baseCase(cell2(i, j), 0, 'one side is empty');
        yield snap(b, cur, [], null, why, 0);
        continue;
      }

      const branches = branchesOf(input, i, j, b.table);
      const deps = branches.flatMap((x) => x.deps);
      const winner = best(branches, 'max');
      const value = winner === null ? 0 : winner.score;
      write(b, i, j, value);
      const cur = { row: i, col: j };
      const picked = winner === null ? null : cellOf(winner.deps[0]);

      // Separate yields per case: the two branches of the recurrence are
      // different pseudocode lines, and the tag has to be a literal integer
      // for \`sourceMap.ts\` to see it at all.
      if (a[i - 1] === bStr[j - 1]) {
        const why = formula(cell2(i, j), branches[0].text, value);
        yield snap(b, cur, deps, picked, why, 2);
      } else {
        const why = formula(cell2(i, j), opCall('max', branches), value);
        yield snap(b, cur, deps, picked, why, 3);
      }
    }
  }

  // Traceback: walk back from the bottom-right corner, collecting a character
  // every time the winning branch was a match.
  const chars: string[] = [];
  let row = rows - 1;
  let col = cols - 1;
  walk(b, { row, col });
  yield snap(b, null, [], null, \`start at \${cell2(row, col)} = \${b.table[row][col]}\`, 4);

  while (row > 0 && col > 0) {
    const winner = best(branchesOf(input, row, col, b.table), 'max');
    if (winner === null) break;
    const next = winner.deps[0];
    const matched = next.label === 'match';
    if (matched) chars.push(a[row - 1]);
    const why = matched
      ? \`'\${a[row - 1]}' matches — take it and step diagonally to \${cell2(next.row, next.col)}\`
      : \`\${next.label} — \${cell2(row, col)} inherits \${cell2(next.row, next.col)}\`;
    row = next.row;
    col = next.col;
    walk(b, { row, col });
    yield snap(b, null, [], null, why, 4);
  }

  chars.reverse();
  const length = b.table[rows - 1][cols - 1] ?? 0;
  const text = chars.join('');
  const result = length === 0 ? 'no common subsequence' : \`"\${text}"  (length \${length})\`;
  yield done(b, result, \`\${cell2(rows - 1, cols - 1)} = \${length}\`, 5);
}

/**
 * Shared with edit distance, which takes the same two strings and the same
 * table shape. The 28-character ceiling is per string: the shared cell budget
 * would allow a 1x899 pair, but a table that long in one dimension is
 * unreadable, and 29x29 = 841 is the largest square that fits under it.
 */
export function validateStrings2(input: Strings2Input): string | null {
  if (input.a.length === 0 || input.b.length === 0)
    return 'Both strings need at least one character.';
  if (input.a.length > 28 || input.b.length > 28)
    return 'Each string may be at most 28 characters.';
  if (/\\s/.test(input.a) || /\\s/.test(input.b)) return 'Whitespace is not allowed.';
  return null;
}

export const spec = {
  kind: 'strings2' as const,
  defaults: { kind: 'strings2' as const, a: 'AGGTAB', b: 'GXTXAYB' },
  recurrence: 'dp[i][j] = match ? 1 + dp[i-1][j-1] : max(dp[i-1][j], dp[i][j-1])',

  axes: (input: Strings2Input) => ({
    rowHeaders: ['ε', ...input.a.split('')],
    colHeaders: ['ε', ...input.b.split('')],
    rowTitle: 'a',
    colTitle: 'b',
  }),

  dims: (input: Strings2Input) => {
    const rows = input.a.length + 1;
    const cols = input.b.length + 1;
    return { rows, cols, fillable: rows * cols };
  },

  validate: validateStrings2,

  depsOf,
  generator: lcs,
  naiveCalls: (input: Strings2Input) => naiveLcsCalls(input.a, input.b),
};
`,Pg=`import type { DpDep, DpStep, StepGenerator } from '@/types';
import type { DpBranch, DpTableData, Strings2Input } from './types';
import {
  baseCase,
  best,
  board,
  cell2,
  cellOf,
  dep,
  done,
  formula,
  opCall,
  snap,
  walk,
  write,
} from './_utils';
import { validateStrings2 } from './lcs';
import { naiveEditCalls } from './naiveCount';

/**
 * Edit Distance (Levenshtein) — \`dp[i][j]\` = the fewest single-character edits
 * that turn the first \`i\` characters of \`a\` into the first \`j\` of \`b\`.
 *
 * Unlike every other algorithm here, its base row and column are *not* a
 * degenerate case to be filled with zeros and forgotten: \`dp[i][0] = i\` because
 * turning a prefix into the empty string means deleting all of it. Those cells
 * get real dependencies (each base cell reads the one before it) rather than an
 * empty \`deps\` list, which is what lets the traceback keep walking all the way
 * to \`dp[0][0]\` and produce a complete edit script instead of stopping at the
 * table's edge with characters unaccounted for.
 *
 * Pseudocode lines this generator tags (see \`pseudocode.ts\`):
 *   0  dp[i][0] = i; dp[0][j] = j
 *   2  match:    dp[i][j] = dp[i-1][j-1]
 *   3  mismatch: dp[i][j] = 1 + min(substitute, delete, insert)
 *   4  traceback
 *   5  done
 */

/**
 * Substitute is listed first, then delete, then insert, and \`best\`'s first-wins
 * tie-break turns that order into the reported edit script's personality:
 * where several minimal scripts exist, this one prefers substituting over
 * deleting and deleting over inserting. Any order is correct; this one is
 * pinned so the fill's arrows and the traceback's re-derivation agree.
 */
function branchesOf(
  input: Strings2Input,
  row: number,
  col: number,
  table: DpTableData,
): DpBranch[] {
  if (row === 0 && col === 0) return [];

  // Base row / column: one forced branch each, which is the recurrence rather
  // than a special case — \`dp[i][0]\` really is "delete one more character than
  // dp[i-1][0] needed".
  if (col === 0) {
    const up = dep(table, row - 1, 0, 'delete');
    const score = (up.value ?? 0) + 1;
    return [{ deps: [up], score, text: \`1+\${cell2(row - 1, 0)}=\${score}\` }];
  }
  if (row === 0) {
    const left = dep(table, 0, col - 1, 'insert');
    const score = (left.value ?? 0) + 1;
    return [{ deps: [left], score, text: \`1+\${cell2(0, col - 1)}=\${score}\` }];
  }

  if (input.a[row - 1] === input.b[col - 1]) {
    const diag = dep(table, row - 1, col - 1, 'match');
    const score = diag.value ?? 0;
    return [{ deps: [diag], score, text: \`\${cell2(row - 1, col - 1)}=\${score}\` }];
  }

  const diag = dep(table, row - 1, col - 1, 'substitute');
  const up = dep(table, row - 1, col, 'delete');
  const left = dep(table, row, col - 1, 'insert');
  return [
    {
      deps: [diag],
      score: (diag.value ?? 0) + 1,
      text: \`1+\${cell2(row - 1, col - 1)}=\${(diag.value ?? 0) + 1}\`,
    },
    {
      deps: [up],
      score: (up.value ?? 0) + 1,
      text: \`1+\${cell2(row - 1, col)}=\${(up.value ?? 0) + 1}\`,
    },
    {
      deps: [left],
      score: (left.value ?? 0) + 1,
      text: \`1+\${cell2(row, col - 1)}=\${(left.value ?? 0) + 1}\`,
    },
  ];
}

export function depsOf(
  input: Strings2Input,
  row: number,
  col: number,
  table: DpTableData,
): DpDep[] {
  return branchesOf(input, row, col, table).flatMap((b) => b.deps);
}

/** One traceback hop, rendered the way an edit script reads. */
function opText(label: string, from: string, to: string): string {
  if (label === 'match') return \`keep '\${from}'\`;
  if (label === 'substitute') return \`sub '\${from}'→'\${to}'\`;
  if (label === 'delete') return \`del '\${from}'\`;
  return \`ins '\${to}'\`;
}

export function* editDistance(input: Strings2Input): StepGenerator<DpStep> {
  const { a, b: bStr } = input;
  const rows = a.length + 1;
  const cols = bStr.length + 1;
  const b = board(rows, cols);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const branches = branchesOf(input, i, j, b.table);
      const deps = branches.flatMap((x) => x.deps);
      const winner = best(branches, 'min');
      const value = winner === null ? 0 : winner.score;
      write(b, i, j, value);
      const cur = { row: i, col: j };
      const picked = winner === null ? null : cellOf(winner.deps[0]);

      if (i === 0 && j === 0) {
        const why = baseCase(cell2(0, 0), 0, 'both prefixes are empty');
        yield snap(b, cur, deps, null, why, 0);
      } else if (i === 0 || j === 0) {
        const word = i === 0 ? 'insertions' : 'deletions';
        const why = formula(cell2(i, j), \`\${branches[0].text}\`, value) + \`  (\${word} only)\`;
        yield snap(b, cur, deps, picked, why, 0);
      } else if (a[i - 1] === bStr[j - 1]) {
        const why = formula(cell2(i, j), branches[0].text, value) + \`  ('\${a[i - 1]}' matches)\`;
        yield snap(b, cur, deps, picked, why, 2);
      } else {
        const why = formula(cell2(i, j), opCall('min', branches), value);
        yield snap(b, cur, deps, picked, why, 3);
      }
    }
  }

  // Traceback runs all the way to dp[0][0], so every character of both strings
  // is accounted for by exactly one operation.
  const script: string[] = [];
  let row = rows - 1;
  let col = cols - 1;
  walk(b, { row, col });
  yield snap(b, null, [], null, \`start at \${cell2(row, col)} = \${b.table[row][col]}\`, 4);

  while (row > 0 || col > 0) {
    const winner = best(branchesOf(input, row, col, b.table), 'min');
    if (winner === null) break;
    const next = winner.deps[0];
    const from = row > 0 ? a[row - 1] : '';
    const to = col > 0 ? bStr[col - 1] : '';
    const op = opText(next.label, from, to);
    script.push(op);
    row = next.row;
    col = next.col;
    walk(b, { row, col });
    yield snap(b, null, [], null, \`\${op} — step to \${cell2(row, col)}\`, 4);
  }

  script.reverse();
  const distance = b.table[rows - 1][cols - 1] ?? 0;
  // Keeps are not edits, so the script shown is the operations that actually
  // cost something; the count beside it is the table's own answer, which is a
  // check that the reconstruction is consistent with the fill.
  const edits = script.filter((op) => !op.startsWith('keep'));
  const result =
    distance === 0 ? 'already identical — 0 edits' : \`\${edits.join(', ')}  (\${distance} edits)\`;
  yield done(b, result, \`\${cell2(rows - 1, cols - 1)} = \${distance}\`, 5);
}

export const spec = {
  kind: 'strings2' as const,
  defaults: { kind: 'strings2' as const, a: 'kitten', b: 'sitting' },
  recurrence: 'dp[i][j] = match ? dp[i-1][j-1] : 1 + min(sub, del, ins)',

  axes: (input: Strings2Input) => ({
    rowHeaders: ['ε', ...input.a.split('')],
    colHeaders: ['ε', ...input.b.split('')],
    rowTitle: 'a',
    colTitle: 'b',
  }),

  dims: (input: Strings2Input) => {
    const rows = input.a.length + 1;
    const cols = input.b.length + 1;
    return { rows, cols, fillable: rows * cols };
  },

  validate: validateStrings2,

  depsOf,
  generator: editDistance,
  naiveCalls: (input: Strings2Input) => naiveEditCalls(input.a, input.b),
};
`,Bg=`import type { DpBoard } from './_utils';
import type { DpDep, DpStep, StepGenerator } from '@/types';
import type { ChainInput, DpBranch, DpTableData } from './types';
import {
  baseCase,
  best,
  board,
  cell2,
  cellOf,
  dep,
  done,
  formula,
  opCall,
  snap,
  walk,
  write,
} from './_utils';
import { naiveChainCalls } from './naiveCount';

/**
 * Matrix Chain Multiplication — \`dp[i][j]\` = the fewest scalar multiplications
 * needed to compute the product \`A_i ... A_j\`.
 *
 * This one is in the set specifically because it does *not* fill row by row.
 * A cell depends on shorter sub-chains, which lie along the diagonals below and
 * to the left of it, so the fill order is by chain length: the main diagonal
 * first, then the one above it, and so on to the single cell in the top-right
 * corner. Flattening it to a row-major sweep would read cells that have not
 * been computed yet, and the animation would show a table filling in an order
 * that could not possibly be correct — which is exactly the misconception
 * ("DP means nested for-loops top to bottom") this algorithm exists to break.
 *
 * It is also the only algorithm here whose traceback is a *tree* rather than a
 * path: the optimal split at (i, j) creates two independent sub-problems, both
 * of which must be decoded to write the parenthesisation. The path therefore
 * grows by a pre-order descent rather than by walking backwards.
 *
 * Pseudocode lines this generator tags (see \`pseudocode.ts\`):
 *   0  dp[i][i] = 0
 *   2  dp[i][j] = min over k of dp[i][k] + dp[k+1][j] + d[i]*d[k+1]*d[j+1]
 *   4  traceback
 *   5  done
 */

/**
 * One branch per split point k. Each reads TWO cells — the left sub-chain and
 * the right one — which is why \`DpBranch.deps\` is a list rather than a single
 * dep. \`deps[0]\` (the left half, \`dp[i][k]\`) is the branch's representative and
 * becomes \`DpStep.chosen\`; the right half is still drawn as a dependency arrow
 * but not as the emphasised one. That is an acknowledged compromise of the
 * single-cell \`DpStep.chosen\` field, and the \`explain\` text names k explicitly
 * so the split is unambiguous even where the arrows under-state it.
 *
 * Branch text is deliberately terse (\`k=2:8000\`): a 30-matrix chain gives the
 * corner cell 29 branches, and spelling each one out as
 * \`dp[0][2]=4500+dp[3][7]=1200+40*20*10\` would produce a 900-character explain
 * string that no inspector panel can usefully render.
 */
function branchesOf(input: ChainInput, row: number, col: number, table: DpTableData): DpBranch[] {
  if (row >= col) return [];

  const d = input.dims;
  const branches: DpBranch[] = [];
  for (let k = row; k < col; k++) {
    const left = dep(table, row, k, \`split at k=\${k}\`);
    const right = dep(table, k + 1, col, \`split at k=\${k}\`);
    const cost = d[row] * d[k + 1] * d[col + 1];
    const score = (left.value ?? 0) + (right.value ?? 0) + cost;
    branches.push({ deps: [left, right], score, text: \`k=\${k}:\${score}\` });
  }
  return branches;
}

export function depsOf(input: ChainInput, row: number, col: number, table: DpTableData): DpDep[] {
  return branchesOf(input, row, col, table).flatMap((b) => b.deps);
}

/**
 * Pre-order descent through the optimal splits, yielding one step per
 * sub-problem visited and returning that sub-chain's parenthesisation.
 *
 * Written as a recursive generator (\`yield*\` forwards the inner steps and hands
 * back its return value) rather than an explicit stack, because the shape being
 * decoded genuinely is a binary tree and an explicit stack would obscure that
 * for no gain — the depth is bounded by the number of matrices.
 */
function* descend(
  input: ChainInput,
  b: DpBoard,
  row: number,
  col: number,
): Generator<DpStep, string, undefined> {
  walk(b, { row, col });

  if (row === col) {
    const name = \`A\${row + 1}\`;
    yield snap(b, null, [], null, \`\${name} on its own costs nothing\`, 4);
    return name;
  }

  const winner = best(branchesOf(input, row, col, b.table), 'min');
  if (winner === null) return \`A\${row + 1}..A\${col + 1}\`;

  const k = winner.deps[0].col;
  const why = \`split A\${row + 1}..A\${col + 1} after A\${k + 1} — cost \${winner.score}\`;
  yield snap(b, null, [], null, why, 4);

  const left = yield* descend(input, b, row, k);
  const right = yield* descend(input, b, k + 1, col);
  return \`(\${left}\${right})\`;
}

export function* matrixChain(input: ChainInput): StepGenerator<DpStep> {
  const d = input.dims;
  const n = d.length - 1;
  const b = board(n, n);

  for (let i = 0; i < n; i++) {
    write(b, i, i, 0);
    const cur = { row: i, col: i };
    const why = baseCase(cell2(i, i), 0, \`A\${i + 1} alone needs no multiplication\`);
    yield snap(b, cur, [], null, why, 0);
  }

  // Diagonal fill: chains of length 2 first, then 3, ... See the header — this
  // ordering is the whole reason the algorithm is in the set.
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i + len - 1 < n; i++) {
      const j = i + len - 1;
      const branches = branchesOf(input, i, j, b.table);
      const deps = branches.flatMap((x) => x.deps);
      const winner = best(branches, 'min');
      const value = winner === null ? 0 : winner.score;
      write(b, i, j, value);

      const cur = { row: i, col: j };
      const picked = winner === null ? null : cellOf(winner.deps[0]);
      const why = formula(cell2(i, j), opCall('min', branches), value);
      yield snap(b, cur, deps, picked, why, 2);
    }
  }

  const parens = yield* descend(input, b, 0, n - 1);
  const total = b.table[0][n - 1] ?? 0;
  const result = \`\${parens} — \${total.toLocaleString()} scalar multiplications\`;
  yield done(b, result, \`\${cell2(0, n - 1)} = \${total}\`, 5);
}

export const spec = {
  kind: 'chain' as const,
  defaults: { kind: 'chain' as const, dims: [40, 20, 30, 10, 30] },
  recurrence: 'dp[i][j] = min over k of dp[i][k] + dp[k+1][j] + d[i]*d[k+1]*d[j+1]',

  axes: (input: ChainInput) => {
    const n = Math.max(0, input.dims.length - 1);
    const labels = Array.from({ length: n }, (_, i) => \`A\${i + 1}\`);
    return { rowHeaders: labels, colHeaders: labels, rowTitle: 'i', colTitle: 'j' };
  },

  dims: (input: ChainInput) => {
    const n = Math.max(0, input.dims.length - 1);
    // Only the upper triangle including the diagonal is ever written; see
    // DpDims.fillable for why the distinction is carried rather than inferred.
    return { rows: n, cols: n, fillable: (n * (n + 1)) / 2 };
  },

  validate: (input: ChainInput) => {
    if (input.dims.length < 2) return 'Enter at least two dimensions (one matrix).';
    if (input.dims.some((v) => !Number.isInteger(v) || v < 1)) {
      return 'Dimensions must be whole numbers of at least 1.';
    }
    if (input.dims.length > 31) return 'Enter at most 31 dimensions (30 matrices).';
    return null;
  },

  depsOf,
  generator: matrixChain,
  naiveCalls: (input: ChainInput) => naiveChainCalls(Math.max(0, input.dims.length - 1)),
};
`,lc={fib:{file:"fib.ts",text:Rg},"coin-change":{file:"coinChange.ts",text:jg},lis:{file:"lis.ts",text:Ig},knapsack:{file:"knapsack.ts",text:Dg},"subset-sum":{file:"subsetSum.ts",text:Lg},lcs:{file:"lcs.ts",text:Ng},"edit-distance":{file:"editDistance.ts",text:Pg},"matrix-chain":{file:"matrixChain.ts",text:Bg}},Fg=oa(lc),Vi="fib";function Ls(t){switch(t.kind){case"scalar":return`scalar:${t.n}`;case"coins":return`coins:${t.coins.join(",")}:${t.amount}`;case"sequence":return`sequence:${t.values.join(",")}`;case"items":return`items:${t.items.map(e=>`${e.weight}/${e.value}`).join(",")}:${t.capacity}`;case"strings2":return`strings2:${t.a}:${t.b}`;case"chain":return`chain:${t.dims.join(",")}`}}const Ui="ABCDEF";function zi(t,e,n){const s=t.int(e,n);return Array.from({length:s},()=>Ui[t.int(0,Ui.length-1)]).join("")}function Hg(t,e){switch(t){case"scalar":return{kind:"scalar",n:e.int(10,22)};case"coins":{const n=[];let s=1;for(let o=0;o<3;o++)n.push(s),s+=e.int(1,4);return{kind:"coins",coins:n,amount:e.int(9,18)}}case"sequence":return{kind:"sequence",values:Array.from({length:e.int(7,10)},()=>e.int(1,30))};case"items":{const n=e.int(3,6);return{kind:"items",items:Array.from({length:n},()=>({weight:e.int(1,7),value:e.int(1,12)})),capacity:e.int(7,14)}}case"strings2":return{kind:"strings2",a:zi(e,5,7),b:zi(e,5,7)};case"chain":return{kind:"chain",dims:Array.from({length:e.int(4,6)},()=>e.int(1,8)*5)}}}function Vg(t,e){return Array.from({length:t},()=>new Array(e).fill(null))}function Ug(t={}){const{audio:e=!0}=t,n=Qs(),s=B(Vi),o=B(Gt[Vi].defaults),a=B(60),r=B(ze()),i=B([]),l=Ne({cursor:null,deps:[],chosen:null,path:[],explain:null,result:null,cellsFilled:0}),u=B(null),c=C(()=>Gt[s.value]),d=C(()=>Pu(c.value,o.value)),p=C(()=>d.value.axes),m=C(()=>d.value.dims),y=C(()=>d.value.recurrence),g=C(()=>d.value.naiveCalls),v=C(()=>Ro(c.value,o.value)),b=C(()=>v.value===null),w=C(()=>{var re;const L=u.value;if(L===null)return[];const{rows:J,cols:le}=m.value,G=i.value;return G.length!==J||(((re=G[0])==null?void 0:re.length)??0)!==le?[]:L.row<0||L.row>=J||L.col<0||L.col>=le?[]:d.value.depsOf(L.row,L.col,G)}),S=C(()=>({cellsFilled:l.cellsFilled,fillable:m.value.fillable,rows:m.value.rows,cols:m.value.cols,naiveCalls:g.value,speedup:m.value.fillable>0?g.value/m.value.fillable:0}));function $(){i.value=Vg(m.value.rows,m.value.cols),l.cursor=null,l.deps=[],l.chosen=null,l.path=[],l.explain=null,l.result=null,l.cellsFilled=0}const _=vn({speed:a,createGenerator:()=>($(),b.value?d.value.generator():null),applyStep:L=>{i.value=L.table,l.cursor=L.cursor,l.deps=L.deps,l.chosen=L.chosen,l.path=L.path,l.explain=L.explain,l.result=L.result,l.cellsFilled=L.cellsFilled},clearStep:$,onAdvance:e?L=>{var J;return n.play(((J=io[s.value])==null?void 0:J.call(io,L))??Xt)}:void 0,maxSteps:Lh});function P(L){_.canEdit.value&&(o.value=L,_.reset())}function K(){P(Hg(c.value.kind,ot(r.value)))}function I(){r.value=ze(),K()}function N(L){u.value=L}Re(s,L=>{Gt[L].kind!==o.value.kind&&(o.value=Gt[L].defaults),_.reset()});const j=C(()=>{var L;return((L=_.current.value)==null?void 0:L.line)??null}),he=C(()=>_g[s.value]),Se=C(()=>lc[s.value]),z=C(()=>{var J;const L=(J=_.current.value)==null?void 0:J.line;return L===void 0?[]:Fg(s.value).get(L)??[]}),ae=C(()=>s.value in io);return Qt(Ib({algoKey:s,input:o,speed:a,seed:r})),$(),{algoKey:s,input:o,speed:a,seed:r,currentAlgo:c,axes:p,dims:m,recurrence:y,naiveCalls:g,inputError:v,canRun:b,table:i,view:l,hoverCell:u,hoverDeps:w,stats:S,activeLine:j,pseudocodeLines:he,sourceCode:Se,activeSourceLines:z,hasSoundCues:ae,status:_.status,isRunning:_.isRunning,isPaused:_.isPaused,isDone:_.isDone,canEdit:_.canEdit,delayMs:_.delayMs,elapsedMs:_.elapsedMs,stepCount:_.stepCount,cursor:_.cursor,bufferedCount:_.bufferedCount,fullyBuffered:_.fullyBuffered,truncated:_.truncated,current:_.current,canStepBack:_.canStepBack,canStepForward:_.canStepForward,setInput:P,randomizeInput:K,randomizeSeed:I,setHoverCell:N,run:_.run,pause:_.pause,reset:_.reset,stepForward:_.stepForward,stepBack:_.stepBack,seek:_.seek,skipToEnd:_.skipToEnd}}const zg=`import type { DsuOp, DsuStep } from '@/types';
import { DisjointSet } from './disjointSet';
import { dsuSnap as snap, dsuDone as done, NO_WALK } from './_utils';

/**
 * Union-Find as a standalone visualization: run a user-composed *script* of
 * operations (\`union 3 4\`, \`find 7\`, ...) one observable step at a time.
 *
 * WHY A SCRIPT, AND NOT A COMMAND BUTTON. The two neighbouring data-structure
 * views — \`useBST\` and \`useHeap\` — take the other approach: each user command
 * animates once, immediately, through a small bespoke driver. That is the
 * right shape there, because a BST insert is a single self-contained gesture
 * with an obvious beginning and end. It is the wrong shape here, and the
 * reason is that the interesting property of a disjoint set is not what one
 * operation does — it is what a *sequence* of operations does to the tree
 * height. "Union by rank keeps the forest shallow" and "path compression
 * flattens what the unions built" are both claims about history, and you
 * cannot see either of them if each command replaces the last.
 *
 * Composing the script first and then pressing Run makes the whole history one
 * generator, which buys, for free and with no code:
 *
 *   - scrubbing and stepping *backwards* through the run (useStepPlayer keeps
 *     the snapshot tape; a command-at-a-time driver has nothing to rewind to),
 *   - a URL that reproduces the exact run rather than "whatever you clicked",
 *   - the same playback controls, speed slider and code panel every other
 *     continuous category already has.
 *
 * The cost is one extra interaction — you compose, then you run — and that is
 * a deliberate trade, not an oversight. This is a departure from the BST/Heap
 * pattern next door and it should stay one.
 *
 * The walk to the root is animated node by node before the compression is
 * applied, because those two states of the parent array *are* the lesson; see
 * the header of \`disjointSet.ts\` for why \`find\` is decomposed to allow it.
 *
 * Time: O(m · α(n)) for m operations. Space: O(n).
 */
export function* dsuScript(
  nodeCount: number,
  ops: readonly DsuOp[],
): Generator<DsuStep, void, undefined> {
  const n = Math.max(0, Math.floor(nodeCount));
  const dsu = new DisjointSet(n);

  // Out-of-range operations are dropped rather than clamped. Clamping would
  // silently rewrite \`union 9 12\` into \`union 9 7\` on a 8-node forest and then
  // animate a merge the user never asked for, which is worse than doing
  // nothing; the count is surfaced in the opening explain so the drop is not
  // silent either. \`DsuOpBuilder.vue\` rejects them at entry, so in the app this
  // only fires for a hand-edited URL.
  const inRange = (i: number | undefined) => i !== undefined && i >= 0 && i < n;
  const runnable = ops.filter((op) =>
    op.kind === 'union' ? inRange(op.a) && inRange(op.b) : inRange(op.a),
  );
  const dropped = ops.length - runnable.length;

  const skipped = dropped > 0 ? \` (\${dropped} operation(s) skipped: node out of range)\` : '';
  const intro = \`\${n} singleton sets — every node is its own parent, every rank 0\${skipped}.\`;
  yield snap(dsu, null, null, intro, NO_WALK, NO_WALK, 0);

  /**
   * One find, animated: a step per node on the way up, then a step for the
   * re-hang. Yields from a helper generator via \`yield*\` so both \`find\` and
   * the two finds inside a \`union\` share exactly one implementation — the
   * alternative, inlining the walk three times, is how the union path ends up
   * quietly animating differently from the standalone one.
   */
  function* animateFind(op: DsuOp, x: number): Generator<DsuStep, number, undefined> {
    const path = dsu.pathTo(x);

    const opening = \`find(\${x}): walking up from \${x} to its root.\`;
    yield snap(dsu, op, x, opening, [x], NO_WALK, 1);

    // Prefixes of the walk, so \`findPath\` grows one pointer at a time and the
    // forest highlights exactly how far up the walk has got.
    for (let i = 1; i < path.length; i++) {
      const node = path[i];
      const walked = path.slice(0, i + 1);
      const atRoot = i === path.length - 1;
      const why = atRoot
        ? \`\${node} is its own parent — that is the root of \${x}'s set.\`
        : \`parent[\${path[i - 1]}] = \${node}, still not a root — keep walking.\`;
      yield snap(dsu, op, node, why, walked, NO_WALK, 2);
    }

    const root = path[path.length - 1];
    const compressed = dsu.completeFind(path);

    const flattened =
      compressed.length === 0
        ? \`Nothing to compress: \${x} already pointed straight at root \${root}.\`
        : \`Path compression: \${compressed.join(', ')} now point straight at root \${root}.\`;
    yield snap(dsu, op, root, flattened, path, compressed, 3);

    return root;
  }

  for (const op of runnable) {
    if (op.kind === 'find') {
      yield* animateFind(op, op.a);
      continue;
    }

    const a = op.a;
    const b = op.b as number; // \`runnable\` already rejected a union without \`b\`.

    const opening = \`union(\${a}, \${b}): find both roots first.\`;
    yield snap(dsu, op, a, opening, NO_WALK, NO_WALK, 4);

    const rootA = yield* animateFind(op, a);
    const rootB = yield* animateFind(op, b);

    const found = \`Roots are \${rootA} and \${rootB}.\`;
    yield snap(dsu, op, rootB, found, NO_WALK, NO_WALK, 5);

    if (rootA === rootB) {
      const same = \`\${a} and \${b} are already in the same set — union does nothing.\`;
      yield snap(dsu, op, rootA, same, NO_WALK, NO_WALK, 6);
      continue;
    }

    // Read the ranks before linking: \`link\` may bump the survivor's, and the
    // explain string is describing the decision, not its aftermath.
    const rankA = dsu.rankOf(rootA);
    const rankB = dsu.rankOf(rootB);
    const tied = rankA === rankB;
    dsu.link(rootA, rootB);

    const winner = rankA >= rankB ? rootA : rootB;
    const loser = winner === rootA ? rootB : rootA;
    const merged = \`rank[\${rootA}]=\${rankA}, rank[\${rootB}]=\${rankB} — hang \${loser} under \${winner}.\`;
    yield snap(dsu, op, winner, merged, NO_WALK, NO_WALK, 7);

    if (tied) {
      const bumped = \`Ranks were equal, so rank[\${winner}] goes up to \${rankA + 1}.\`;
      yield snap(dsu, op, winner, bumped, NO_WALK, NO_WALK, 8);
    }
  }

  const sets = dsu.components === 1 ? '1 set' : \`\${dsu.components} sets\`;
  const closing = \`Script finished: \${sets} remain, deepest tree is \${dsu.maxDepth()} level(s).\`;
  yield done(dsu, closing, 9);
}
`,qg=`import type { GraphModel, MstStep } from '@/types';
import { DisjointSet } from './disjointSet';
import {
  byWeightThenId,
  createMstRun,
  describeEdge,
  edgeWeight,
  indexNodes,
  mstSnap as snap,
  mstDone as done,
  nodeLabels,
  NO_WALK,
  terminalExplain,
} from './_utils';

/**
 * Kruskal's algorithm — sort every edge by weight, then walk that list once,
 * accepting an edge whenever its two endpoints are still in different
 * components and rejecting it when they are not.
 *
 * This is the algorithm the whole category exists for. The greedy rule is
 * trivial to state and completely useless without an answer to "are these two
 * nodes already connected?", asked once per edge, on a structure that is
 * changing underneath the question. A disjoint set answers it in effectively
 * constant time; the obvious alternatives are all dramatically worse — a BFS
 * per edge is O(V·E), and maintaining an explicit component-id array means
 * relabelling half the nodes on every merge. So the visualization deliberately
 * renders the forest *alongside* the graph rather than only the finished tree:
 * watching two DSU trees merge at the instant an edge turns green is the point
 * being made, not a decoration on it.
 *
 * DISCONNECTED GRAPHS. Nothing here assumes the graph is connected, and the
 * loop is not allowed to pretend otherwise. When it isn't, the result is a
 * spanning *forest*: fewer than V-1 edges are accepted, \`components\` never
 * reaches 1, and the terminal snapshot says so in as many words (see
 * \`terminalExplain\`). \`generateGraph\` always lays a ring first so the app's own
 * graphs are connected, which is exactly why this case needs a test rather
 * than a demo — it would otherwise never be exercised until someone pasted in
 * their own graph.
 *
 * Time: O(E log E) — dominated by the sort, since the E find/union operations
 * are O(E · α(V)). Space: O(V + E).
 */
export function* kruskal(graph: GraphModel): Generator<MstStep, void, undefined> {
  const nodes = graph.nodes;
  const n = nodes.length;
  const slot = indexNodes(nodes);
  const labels = nodeLabels(nodes);

  const dsu = new DisjointSet(n);
  const run = createMstRun(dsu);

  // Copy before sorting: \`graph.edges\` belongs to the caller and is rendered
  // by the canvas in its own order, so sorting it in place would visibly
  // reshuffle the diagram the moment a run started.
  const ordered = [...graph.edges].sort(byWeightThenId);
  run.queue = ordered.map((edge) => edge.id);

  const sorted = \`Sorted \${ordered.length} edges by weight, lightest first.\`;
  yield snap(run, sorted, NO_WALK, 0);

  const singletons = \`\${n} singleton components — no node is connected to any other yet.\`;
  yield snap(run, singletons, NO_WALK, 1);

  for (let i = 0; i < ordered.length; i++) {
    const edge = ordered[i];
    const u = slot.get(edge.from);
    const v = slot.get(edge.to);
    // An edge naming a node the model does not contain is malformed input, not
    // a case to interpret; skipping it keeps the run going rather than
    // throwing inside a generator the player has already started.
    if (u === undefined || v === undefined) continue;

    const weight = edgeWeight(edge);
    run.considering = edge.id;
    run.queue = ordered.slice(i + 1).map((rest) => rest.id);

    // The two walks are captured *before* either find compresses anything, so
    // the forest panel highlights the pointers as they stood when this edge
    // came up — the same "walk first, flatten after" ordering the standalone
    // DSU view animates explicitly.
    const walk = [...dsu.pathTo(u), ...dsu.pathTo(v)];
    const looking = \`Considering \${describeEdge(labels, u, v)} (weight \${weight}) — same set?\`;
    yield snap(run, looking, walk, 2);

    const rootU = dsu.find(u);
    const rootV = dsu.find(v);

    if (rootU === rootV) {
      run.rejectedEdges.push(edge.id);
      const why = \`Both ends are in set \${rootU} already — this edge would close a cycle. Reject.\`;
      yield snap(run, why, walk, 3);
    } else {
      dsu.link(rootU, rootV);
      run.acceptedEdges.push(edge.id);
      run.totalWeight += weight;
      const why = \`Sets \${rootU} and \${rootV} were separate — accept, and merge them. Total \${run.totalWeight}.\`;
      yield snap(run, why, walk, 4);
    }

    // A spanning tree of a connected graph has exactly V-1 edges, so once that
    // many are accepted every remaining edge is guaranteed to be rejected.
    // Stopping is an optimisation, not a shortcut in the result.
    if (run.acceptedEdges.length === n - 1) {
      run.considering = null;
      run.queue = [];
      const early = \`\${n - 1} edges accepted — every node is connected, so the rest cannot help.\`;
      yield snap(run, early, NO_WALK, 5);
      break;
    }
  }

  run.considering = null;
  run.queue = [];
  yield done(run, terminalExplain(run, n, 'Kruskal'), 6);
}
`,Kg=`import type { GraphEdge, GraphModel, MstStep } from '@/types';
import { DisjointSet } from './disjointSet';
import {
  byWeightThenId,
  createMstRun,
  describeEdge,
  edgeWeight,
  indexNodes,
  mstSnap as snap,
  mstDone as done,
  nodeLabels,
  NO_WALK,
  otherEnd,
  terminalExplain,
} from './_utils';

/**
 * Prim's algorithm — grow one tree outward from a root, repeatedly taking the
 * cheapest edge that crosses from the tree to a node outside it.
 *
 * WHAT \`MstStep.forest\` MEANS HERE, AND WHY IT IS NOT A LIE. \`MstStep\` carries
 * a \`DsuSnapshot\` because Kruskal is *driven* by a disjoint set. Prim is not:
 * it decides with an in-tree flag and a candidate list, and it would be
 * perfectly correct with no disjoint set anywhere. So the field could have
 * been made optional, or filled with a fake.
 *
 * It is neither. This generator keeps a real \`DisjointSet\` and calls a real
 * \`link\` on it every single time it accepts an edge — the same structure, the
 * same operation, maintained honestly. That is well-defined because Prim only
 * ever accepts an edge whose far endpoint is outside the tree, so every one of
 * those unions genuinely merges two different sets. The resulting forest is
 * therefore exactly true: the grown tree is one set, every not-yet-reached
 * node is still a singleton, and \`components\` counts down to 1 precisely when
 * (and only when) the graph turns out to be connected — the same meaning the
 * number has under Kruskal.
 *
 * The honest caveat, and the reason this comment exists: the counters describe
 * work Prim *does*, not work Prim *needs*. \`unions\` is the accepted-edge count
 * and is real. \`finds\` and \`compressions\` are non-zero only because \`link\` is
 * reached through the set's own \`find\`, which Prim would not otherwise perform
 * — they measure the bookkeeping, not a decision. That is why Kruskal's find
 * count is the interesting one and Prim's is not, and the stats panel should
 * be read with that in mind. Filling the field with zeros or with a fabricated
 * "one big set" array would have been the lie; running the structure for real
 * and being clear about which numbers carry meaning is not.
 *
 * The frontier is kept as a plain candidate array with a linear scan for the
 * minimum, rather than a binary heap. A heap would take this from O(V·E) to
 * O(E log V), and it is the wrong trade here twice over: the candidate list is
 * exactly what the edge panel draws, so it wants to be an inspectable list of
 * crossing edges rather than an array-encoded heap whose order means nothing
 * on screen; and the node counts this view generates (single digits to low
 * tens) make the difference unmeasurable. Swap in a heap the day this runs on
 * a graph large enough to notice — not before.
 *
 * "Lazy" deletion, also on purpose: an edge whose far endpoint joins the tree
 * by some other route is not removed eagerly, it is left in the list and
 * *rejected* when it comes up. That gives rejection the same visible meaning
 * it has in Kruskal — "this edge would close a cycle" — instead of having
 * edges silently vanish.
 *
 * DISCONNECTED GRAPHS. When the candidate list empties with nodes still
 * unreached, the tree cannot grow any further, so the run restarts from the
 * lowest-numbered unreached node and keeps going. The result is a spanning
 * forest, \`components\` settles above 1, and the terminal snapshot says so —
 * identical handling and identical wording to Kruskal, which is what makes
 * "Kruskal's total weight equals Prim's" hold on disconnected inputs too.
 *
 * Time: O(V · E) as written. Space: O(V + E).
 */
export function* prim(graph: GraphModel, rootId?: number): Generator<MstStep, void, undefined> {
  const nodes = graph.nodes;
  const n = nodes.length;
  const slot = indexNodes(nodes);
  const labels = nodeLabels(nodes);

  const dsu = new DisjointSet(n);
  const run = createMstRun(dsu);

  if (n === 0) {
    yield done(run, terminalExplain(run, n, 'Prim'), 6);
    return;
  }

  // Incident edges per DSU slot, carrying the edge object itself (weight and
  // id included) — \`graph.adjacency\` only holds neighbour ids, which is not
  // enough to decide anything or to name an edge in a snapshot.
  const incident: GraphEdge[][] = Array.from({ length: n }, () => []);
  const ends = new Map<string, [number, number]>();
  for (const edge of graph.edges) {
    const u = slot.get(edge.from);
    const v = slot.get(edge.to);
    if (u === undefined || v === undefined || u === v) continue;
    incident[u].push(edge);
    incident[v].push(edge);
    ends.set(edge.id, [u, v]);
  }

  const inTree = new Array<boolean>(n).fill(false);
  const candidates: GraphEdge[] = [];

  /** Bring \`i\` into the tree and offer every edge that now leaves it. */
  function join(i: number) {
    inTree[i] = true;
    for (const edge of incident[i]) {
      const [u, v] = ends.get(edge.id)!;
      if (!inTree[otherEnd(u, v, i)]) candidates.push(edge);
    }
  }

  /** Candidate ids in weight order — display only; the scan below finds its own min. */
  function queueIds(): string[] {
    return [...candidates].sort(byWeightThenId).map((edge) => edge.id);
  }

  const startSlot = rootId !== undefined && slot.has(rootId) ? slot.get(rootId)! : 0;
  join(startSlot);
  run.queue = queueIds();

  const opening = \`Starting from \${labels[startSlot] ?? startSlot}; the tree is that node alone.\`;
  yield snap(run, opening, NO_WALK, 0);

  const offered = \`\${candidates.length} edge(s) leave the tree — these are the candidates.\`;
  yield snap(run, offered, NO_WALK, 1);

  while (true) {
    if (candidates.length === 0) {
      const unreached = inTree.indexOf(false);
      if (unreached === -1) break;

      // No edge crosses the cut but nodes remain: this component is finished
      // and the rest of the graph is unreachable from it.
      run.considering = null;
      const stranded = \`No candidate crosses the cut, but \${labels[unreached] ?? unreached} is still unreached — that component is done. Restarting there.\`;
      yield snap(run, stranded, NO_WALK, 5);

      join(unreached);
      run.queue = queueIds();
      continue;
    }

    // Lightest candidate, breaking ties by edge id so the run is deterministic.
    let pick = 0;
    for (let k = 1; k < candidates.length; k++) {
      if (byWeightThenId(candidates[k], candidates[pick]) < 0) pick = k;
    }
    const edge = candidates[pick];
    candidates.splice(pick, 1);

    const [u, v] = ends.get(edge.id)!;
    const weight = edgeWeight(edge);
    run.considering = edge.id;
    run.queue = queueIds();

    const looking = \`Lightest candidate is \${describeEdge(labels, u, v)} (weight \${weight}).\`;
    yield snap(run, looking, NO_WALK, 2);

    // \`considering\` deliberately stays set through the decision step, exactly
    // as it does in Kruskal: the edge being painted green or red is the same
    // edge that was just under the cursor, and clearing it first would drop
    // the highlight a frame before the verdict is shown.
    const far = inTree[u] ? v : u;
    if (inTree[u] && inTree[v]) {
      run.rejectedEdges.push(edge.id);
      const why = \`Both ends joined the tree by other routes — it no longer crosses the cut, so taking it would close a cycle. Reject.\`;
      yield snap(run, why, NO_WALK, 3);
      continue;
    }

    dsu.link(dsu.find(u), dsu.find(v));
    run.acceptedEdges.push(edge.id);
    run.totalWeight += weight;
    join(far);
    run.queue = queueIds();

    const why = \`Accept: \${labels[far] ?? far} joins the tree and offers its own edges. Total \${run.totalWeight}.\`;
    yield snap(run, why, NO_WALK, 4);
  }

  run.considering = null;
  run.queue = [];
  yield done(run, terminalExplain(run, n, 'Prim'), 6);
}
`,uc={dsu:{file:"dsuOps.ts",text:zg},kruskal:{file:"kruskal.ts",text:qg},prim:{file:"prim.ts",text:Kg}},Gg=oa(uc),Wg={dsu:["parent[i] = i, rank[i] = 0        // n singleton sets","find(x):","  walk parent pointers up to the root","  re-hang every node walked onto the root   // path compression","union(a, b):","  ra = find(a); rb = find(b)","  if ra == rb: already one set — nothing to do","  hang the lower-rank root under the higher   // union by rank","  on a tie, the surviving root’s rank goes up by 1","done — every operation in the script has run"],kruskal:["sort every edge by weight, lightest first","parent[i] = i        // every node starts as its own component","for each edge (u, v) in that order","  if find(u) == find(v): reject — u and v are already connected","  else accept (u, v) and union(u, v)","  stop early once V - 1 edges have been accepted","done — spanning tree, or a spanning forest if the graph was disconnected"],prim:["pick a start node; the tree holds just that node","offer every edge leaving the tree as a candidate","take the lightest candidate","  if both its ends are already in the tree, drop it   // it would close a cycle","  otherwise accept it: its far end joins the tree and offers its own edges","no candidate left but nodes remain — restart from an unreached node","done — spanning tree, or a spanning forest if the graph was disconnected"]},qi=t=>{if(t.kind!=="mst")return Xt;const e=t.consideringEdge;return e===null?Xt:t.acceptedEdges.includes(e)?["hit"]:t.rejectedEdges.includes(e)?["miss"]:["compare"]},Yg=7,Xg=6,Jg=2,Qg=t=>t.kind!=="dsu"?Xt:t.line===Yg?["hit"]:t.line===Xg?["miss"]:t.line===Jg?["compare"]:Xt,lo={dsu:Qg,kruskal:qi,prim:qi},Ki=400,Zg=.42,eb=.35,tb=20;function cc(t=10,e=ot(ze()),n){const s=Math.max(1,Math.floor(t)),o=Ki/2,a=Ki*Zg,r=(n==null?void 0:n.weighted)??!1,i=(n==null?void 0:n.maxWeight)??tb,l=Array.from({length:s},(y,g)=>{const v=2*Math.PI*g/s-Math.PI/2;return{id:g,label:`N${g}`,x:o+a*Math.cos(v),y:o+a*Math.sin(v)}}),u=new Set,c=[];function d(y,g){if(y===g)return;const v=y<g?`${y}-${g}`:`${g}-${y}`;if(u.has(v))return;u.add(v);const b=r?e.int(1,i):void 0;c.push(b===void 0?{id:v,from:y,to:g}:{id:v,from:y,to:g,weight:b})}for(let y=0;y<s;y++)d(y,(y+1)%s);const p=s>2?Math.max(1,Math.round(s*eb)):0;for(let y=0;y<p;y++){const g=e.int(0,s-1),v=e.int(0,s-1);d(g,v)}const m=new Map(l.map(y=>[y.id,[]]));for(const y of c)m.get(y.from).push(y.to),m.get(y.to).push(y.from);return{nodes:l,edges:c,adjacency:m}}const Sa=8,dc=3,pc=14,nb=20;function Gi(t){return{parent:Array.from({length:t},(e,n)=>n),rank:new Array(t).fill(0),setSize:new Array(t).fill(1),findPath:[],compressed:[],finds:0,unions:0,compressions:0,maxDepth:0}}function or(t,e){const n=ot(e),s=Math.max(2,t),o=[];for(let a=0;a<Math.min(6,s-1);a++)o.push({kind:"union",a:n.int(0,s-1),b:n.int(0,s-1)});for(let a=0;a<3;a++)o.push({kind:"find",a:n.int(0,s-1)});return o}function sb(t={}){const{audio:e=!0}=t,n=Qs(),s=B("kruskal"),o=B(Sa),a=B(60),r=B(ze()),i=B([]),l=B(null),u=B({nodes:[],edges:[],adjacency:new Map}),c=B(Gi(Sa)),d=Ne({consideringEdge:null,acceptedEdges:[],rejectedEdges:[],queue:[],totalWeight:0,components:Sa}),p=B(null),m=B(null),y=B(null),g=C(()=>ta[s.value]),v=C(()=>g.value.mode==="dsu"),b=C(()=>[...u.value.edges].sort((W,me)=>{const Te=(W.weight??1)-(me.weight??1);return Te!==0?Te:W.id.localeCompare(me.id)}));function w(W,me){let Te=me;for(let qe=0;qe<W.length&&W[Te]!==Te;qe++)Te=W[Te];return Te}const S=C(()=>new Map(u.value.nodes.map((W,me)=>[W.id,me]))),$=C(()=>{const W=new Map;for(const me of d.rejectedEdges)W.set(me,"rejected");for(const me of d.acceptedEdges)W.set(me,"accepted");return d.consideringEdge!==null&&!W.has(d.consideringEdge)&&W.set(d.consideringEdge,"considering"),W}),_=C(()=>{const W=new Map,me=new Set(d.acceptedEdges);for(const qe of u.value.edges)me.has(qe.id)&&(W.set(qe.from,"accepted"),W.set(qe.to,"accepted"));const Te=u.value.edges.find(qe=>qe.id===d.consideringEdge);return Te&&(W.set(Te.from,"considering"),W.set(Te.to,"considering")),W}),P=C(()=>{var Te;const W=new Map;if(v.value)return W;const me=c.value.parent;for(const qe of u.value.nodes){const rt=S.value.get(qe.id);if(rt===void 0||rt>=me.length)continue;const V=w(me,rt);W.set(qe.id,`set ${((Te=u.value.nodes[V])==null?void 0:Te.label)??V}`)}return W}),K=C(()=>({finds:c.value.finds,unions:c.value.unions,compressions:c.value.compressions,maxDepth:c.value.maxDepth,totalWeight:d.totalWeight,components:d.components}));function I(){d.consideringEdge=null,d.acceptedEdges=[],d.rejectedEdges=[],d.queue=[],d.totalWeight=0,d.components=v.value?o.value:u.value.nodes.length}function N(){c.value=Gi(v.value?o.value:u.value.nodes.length),p.value=null,m.value=null,y.value=null,I()}const j=vn({speed:a,createGenerator:()=>{N();const W=g.value;if(W.mode==="dsu")return W.generator(o.value,[...i.value]);if(u.value.nodes.length===0)return null;const me=typeof l.value=="number"?l.value:u.value.nodes[0].id;return W.generator(u.value,me)},applyStep:W=>{if(c.value=W.forest,y.value=W.explain,W.kind==="dsu"){p.value=W.op,m.value=W.active,d.consideringEdge=null,d.acceptedEdges=[],d.rejectedEdges=[],d.queue=[],d.totalWeight=0,d.components=W.forest.parent.filter((me,Te)=>me===Te).length;return}p.value=null,m.value=null,d.consideringEdge=W.consideringEdge,d.acceptedEdges=W.acceptedEdges,d.rejectedEdges=W.rejectedEdges,d.queue=W.queue,d.totalWeight=W.totalWeight,d.components=W.components},clearStep:N,onAdvance:e?W=>{var me;return n.play(((me=lo[s.value])==null?void 0:me.call(lo,W))??Xt)}:void 0});function he(W=!1){var Te;u.value=cc(o.value,ot(r.value),{weighted:!0,maxWeight:nb}),W&&l.value!==null&&u.value.adjacency.has(l.value)||(l.value=((Te=u.value.nodes[0])==null?void 0:Te.id)??null),j.reset()}function Se(W){j.canEdit.value&&(i.value=[...W],j.reset())}function z(){Se(or(o.value,r.value))}function ae(W){j.canEdit.value&&u.value.adjacency.has(W)&&(l.value=W)}function L(){r.value=ze(),he(),z()}const J=C(()=>{var W;return((W=j.current.value)==null?void 0:W.line)??null}),le=C(()=>Wg[s.value]??[]),G=C(()=>uc[s.value]),re=C(()=>{var me;const W=(me=j.current.value)==null?void 0:me.line;return W===void 0?[]:Gg(s.value).get(W)??[]}),$e=C(()=>s.value in lo),{hydrated:tt}=Qt(Db({algoKey:s,nodeCount:o,speed:a,seed:r,startId:l,opScript:i}));return he(tt.has("start")),tt.has("ops")||(i.value=or(o.value,r.value)),{algoKey:s,nodeCount:o,speed:a,seed:r,opScript:i,startId:l,graph:u,sortedEdges:b,forest:c,highlights:d,activeOp:p,activeNode:m,explain:y,stats:K,nodeTone:_,edgeTone:$,nodeBadge:P,currentAlgo:g,isDsuMode:v,activeLine:J,pseudocodeLines:le,sourceCode:G,activeSourceLines:re,hasSoundCues:$e,status:j.status,isRunning:j.isRunning,isPaused:j.isPaused,isDone:j.isDone,canEdit:j.canEdit,delayMs:j.delayMs,elapsedMs:j.elapsedMs,stepCount:j.stepCount,cursor:j.cursor,bufferedCount:j.bufferedCount,fullyBuffered:j.fullyBuffered,current:j.current,canStepBack:j.canStepBack,canStepForward:j.canStepForward,generate:he,setOpScript:Se,randomizeOpScript:z,randomizeSeed:L,setStart:ae,run:j.run,pause:j.pause,reset:j.reset,stepForward:j.stepForward,stepBack:j.stepBack,seek:j.seek,skipToEnd:j.skipToEnd}}const fc="abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",ob=3;function*hc(){const t=[...fc],e=t.length;for(let n=1;n<=ob;n++){const s=e**n;for(let o=0;o<s;o++){let a="",r=o;for(let i=0;i<n;i++)a=t[r%e]+a,r=Math.floor(r/e);yield a}}}function ab(t,e,n){const s=na(n.capacity),o=zn[n.hashFnKey].hash,a=n.exclude??new Set,r=(t%s+s)%s,i=[];for(const l of hc())if(!a.has(l)&&Or(o(l),s)===r&&(i.push(l),i.length>=e))break;return i}function rb(t,e,n){const s=na(e.capacity),o=zn[e.hashFnKey].hash,a=e.exclude??new Set;if(n!==void 0){const l=ab(n,t,e),u=(n%s+s)%s;if(l.length===t)return{bucket:u,keys:l}}const r=new Map;for(const l of hc()){if(a.has(l))continue;const u=Or(o(l),s),c=r.get(u)??[];if(c.push(l),r.set(u,c),c.length>=t)return{bucket:u,keys:c}}let i={bucket:0,keys:[]};for(const[l,u]of r)u.length>i.keys.length&&(i={bucket:l,keys:u});return i}function mc(t,e,n){const s=new Set(n??[]),o=[];for(let a=0;a<e*50&&o.length<e;a++){const r=t.int(2,3);let i="";for(let l=0;l<r;l++)i+=fc[t.int(0,25)];s.has(i)||(s.add(i),o.push(i))}return o}const ib={chaining:["insert(key):","  h = hash(key);  home = h mod capacity","  walk bucket[home]’s chain, link by link","    key already in the chain -> overwrite its value","    end of the chain reached -> append the key","    a different key here -> collision; the chain just gets longer","  if size / capacity > threshold: grow, then rehash every key","search(key): walk the same chain from the front","  key found -> report the bucket holding it","  end of chain -> the key is not in the table","delete(key): walk the chain to find the key","  unlink it; the chain simply gets shorter","done — every operation in the script has run"],linear:["insert(key):","  h = hash(key);  home = h mod capacity","  probe (home + k) mod capacity for k = 0, 1, 2, ...","    key already in this slot -> overwrite its value","    slot empty (or a reusable tombstone) -> put the key here","    a different key here -> collision; probe the next slot","  if slots used / capacity > threshold: grow, then rehash every key","search(key): walk the same probe sequence from home","  key found -> report the slot holding it","  first EMPTY slot -> the key is not in the table","delete(key): walk the sequence to find the key","  leave a TOMBSTONE behind, never an empty slot","done — every operation in the script has run"],quadratic:["insert(key):","  h = hash(key);  home = h mod capacity","  probe (home + k(k+1)/2) mod capacity for k = 0, 1, 2, ...","    key already in this slot -> overwrite its value","    slot empty (or a reusable tombstone) -> put the key here","    a different key here -> collision; widen the jump and probe again","  if slots used / capacity > threshold: grow, then rehash every key","search(key): walk the same probe sequence from home","  key found -> report the slot holding it","  first EMPTY slot -> the key is not in the table","delete(key): walk the sequence to find the key","  leave a TOMBSTONE behind, never an empty slot","done — every operation in the script has run"],double:["insert(key):","  h = hash(key);  home = h mod capacity;  step = h2(h) | 1","  probe (home + k * step) mod capacity for k = 0, 1, 2, ...","    key already in this slot -> overwrite its value","    slot empty (or a reusable tombstone) -> put the key here","    a different key here -> collision; jump another step","  if slots used / capacity > threshold: grow, then rehash every key","search(key): walk the same probe sequence from home","  key found -> report the slot holding it","  first EMPTY slot -> the key is not in the table","delete(key): walk the sequence to find the key","  leave a TOMBSTONE behind, never an empty slot","done — every operation in the script has run"]},uo=`// The generators that turn a script of hash-table operations into watchable
// steps. One step per probe — that granularity is the whole point, because a
// hash table's cost story *is* its probe sequence, and an implementation that
// reports only "inserted" hides the exact thing worth teaching.
//
// ONE probe loop covers all four strategies. \`table.ts\` exposes a \`ProbeCursor\`
// that means "slot index + chain position", so open addressing advances the
// index with the chain position pinned at 0, and chaining pins the index and
// advances the chain position. Writing two loops was the obvious alternative
// and it was tried on paper first: it duplicates every outcome branch, and —
// worse — it doubles every \`yield ... , N)\` tag site, which makes the source map
// highlight two unrelated lines for one step (see \`sourceMap.ts\`, which keys a
// tag to *every* line carrying it).
//
// TAGS: the trailing integer on each \`yield snap(...)\` / \`yield done(...)\` is a
// 0-based index into this strategy's entry in \`pseudocode.ts\`. \`buildSourceMap\`
// finds them with a regex that requires the number to be the LAST argument of a
// single-line call, so keep these yields short and on one line — a Prettier wrap
// would silently break the source-view highlight without breaking a test.

import type { HashOp, HashOpKind, HashPhase, HashStep } from '@/types';
import type { HashFnKey } from './hashFns';
import { createHashTable } from './table';
import type { CollisionStrategy, HashTable, ProbeCursor } from './table';

/** Everything a run needs beyond the script itself. Strategy comes from the registry key. */
export interface HashRunConfig {
  hashFnKey: HashFnKey;
  /** Rounded up to a power of two by the table. */
  capacity: number;
  /** Requested load-factor ceiling; floored and capped per strategy. */
  threshold: number;
}

/**
 * The per-step display fields, carried in one mutable object and copied into
 * every snapshot.
 *
 * Mutable on purpose: an operation is a walk, and each probe changes two or
 * three of these while leaving the rest alone. Rebuilding a full literal at
 * every yield would have meant restating \`op\`, \`key\`, \`hash\` and \`homeIndex\`
 * fifteen times in this file, which is exactly the sort of repetition that
 * eventually disagrees with itself. Nothing escapes: \`snap\` copies.
 */
interface Frame {
  op: HashOpKind | null;
  key: string | null;
  hash: number | null;
  homeIndex: number | null;
  probeIndex: number | null;
  probeSeq: number[];
  phase: HashPhase;
  explain: string | null;
}

function emptyFrame(): Frame {
  return {
    op: null,
    key: null,
    hash: null,
    homeIndex: null,
    probeIndex: null,
    probeSeq: [],
    phase: 'idle',
    explain: null,
  };
}

/**
 * Build an intermediate snapshot. \`buckets\` is deep-copied by the table and
 * \`probeSeq\` is copied here, so a consumer may hold a step indefinitely without
 * it changing underneath them.
 */
const snap = (table: HashTable, frame: Frame, line: number): HashStep => ({
  buckets: table.snapshot(),
  capacity: table.capacity,
  size: table.size(),
  loadFactor: table.loadFactor(),
  op: frame.op,
  key: frame.key,
  hash: frame.hash,
  homeIndex: frame.homeIndex,
  probeIndex: frame.probeIndex,
  probeSeq: [...frame.probeSeq],
  probes: table.counters.probes,
  collisions: table.counters.collisions,
  resizes: table.counters.resizes,
  phase: frame.phase,
  explain: frame.explain,
  done: false,
  line,
});

/** The terminal snapshot. Nothing is under the cursor once the script is spent. */
const done = (table: HashTable, frame: Frame, line: number): HashStep => ({
  ...snap(table, frame, line),
  done: true,
});

// ---- explain strings --------------------------------------------------------
//
// These are the teaching payload of the whole category, so they spell the
// arithmetic out with this step's real numbers rather than describing it. A
// viewer should be able to check every one of them by hand.

function hashLine(key: string, hash: number, capacity: number, home: number): string {
  return \`h("\${key}") = \${hash} → \${hash} mod \${capacity} = \${home}\`;
}

/** "1 key" / "3 keys". Pluralization is cheap; "1 collisions" in a teaching string is not. */
function plural(count: number, noun: string): string {
  return \`\${count} \${noun}\${count === 1 ? '' : 's'}\`;
}

/**
 * The left half of a probe's explain string — the arithmetic that produced the
 * index being examined. The outcome is appended by the caller.
 *
 * Probes are numbered from 1 with the home slot as probe 1, and probe 1 is
 * written as "slot 3 (home)" rather than "(3 + 0) mod 8 = 3". Stating the
 * degenerate arithmetic would be consistent, but it reads as noise at exactly
 * the moment the reader is still working out what "home" means.
 */
function probeLabel(
  table: HashTable,
  home: number,
  k: number,
  stride: number,
  index: number,
  atEnd: boolean,
): string {
  const n = k + 1;
  if (table.strategy === 'chaining') {
    return atEnd
      ? \`probe \${n}: bucket \${home}, end of chain\`
      : \`probe \${n}: bucket \${home}, link \${n}\`;
  }
  if (k === 0) return \`probe 1: slot \${home} (home)\`;

  const capacity = table.capacity;
  if (table.strategy === 'double') {
    return \`probe \${n}: (\${home} + \${k}×\${stride}) mod \${capacity} = \${index}\`;
  }
  const offset = table.offset(k, stride);
  if (table.strategy === 'quadratic') {
    return \`probe \${n}: (\${home} + \${offset}) mod \${capacity} = \${index}  [k(k+1)/2, k=\${k}]\`;
  }
  return \`probe \${n}: (\${home} + \${offset}) mod \${capacity} = \${index}\`;
}

// ---- the operations ---------------------------------------------------------

/**
 * Walk the probe sequence looking for somewhere to put \`key\`.
 *
 * Returns the table to carry on with, which is not always the one it was given:
 * an insert that pushes the table past its threshold ends by growing, and
 * growth produces a new instance rather than mutating capacity in place.
 */
function* runInsert(
  table: HashTable,
  frame: Frame,
  key: string,
  hash: number,
  home: number,
  stride: number,
): Generator<HashStep, HashTable, undefined> {
  // The first tombstone seen, if any. An insert may reuse it — but only after
  // the walk proves the key is not stored further along its own probe
  // sequence, because stopping at the tombstone would happily store a second
  // copy of a key the table already holds.
  let reusable: ProbeCursor | null = null;
  const limit = table.maxProbes(home);

  for (let k = 0; k < limit; k++) {
    const cursor = table.cursor(hash, k);
    const outcome = table.classify(cursor, key);
    const label = probeLabel(table, home, k, stride, cursor.index, outcome === 'free');

    table.counters.probes += 1;
    // Under chaining every entry here is the home bucket, so \`probeSeq.length\`
    // doubles as "how far down the chain we are" — which is what the bucket
    // view reads to highlight the link under the cursor.
    frame.probeSeq.push(cursor.index);
    frame.probeIndex = cursor.index;

    if (outcome === 'match') {
      const entry = table.overwrite(cursor);
      frame.phase = 'updated';
      frame.explain = \`\${label} — "\${key}" is already here → overwrite (now #\${entry.value})\`;
      yield snap(table, frame, 3);
      break;
    }

    if (outcome === 'occupied') {
      // Collisions are counted where they actually happen — at placement time.
      // A search walking past someone else's key is paying for a collision, not
      // causing one, and counting both would double the headline number.
      table.counters.collisions += 1;
      const other = table.entryAt(cursor)?.key ?? '?';
      frame.phase = 'probing';
      frame.explain = \`\${label} — taken by "\${other}" → collision, keep walking\`;
      yield snap(table, frame, 5);
      continue;
    }

    if (outcome === 'tombstone') {
      if (reusable === null) reusable = cursor;
      frame.phase = 'probing';
      frame.explain = \`\${label} — tombstone; remember it, but keep looking for "\${key}"\`;
      yield snap(table, frame, 2);
      continue;
    }

    const target = reusable ?? cursor;
    const entry = table.place(target, key);
    frame.probeIndex = target.index;
    frame.phase = 'inserted';
    frame.explain = placeExplain(table, label, key, entry.value, target, reusable !== null);
    yield snap(table, frame, 4);
    break;
  }

  if (table.overThreshold() && table.canGrow()) return yield* growAndRehash(table, frame);
  return table;
}

function placeExplain(
  table: HashTable,
  label: string,
  key: string,
  value: number,
  target: ProbeCursor,
  reused: boolean,
): string {
  if (table.strategy === 'chaining') {
    const length = plural(table.chainLength(target.index), 'link');
    return \`\${label} → append "\${key}" (#\${value}); the chain is now \${length}\`;
  }
  if (reused) {
    return \`\${label} — free, but slot \${target.index} was a tombstone → reuse it for "\${key}"\`;
  }
  return \`\${label} — empty → insert "\${key}" (#\${value})\`;
}

function* runSearch(
  table: HashTable,
  frame: Frame,
  key: string,
  hash: number,
  home: number,
  stride: number,
): Generator<HashStep, void, undefined> {
  const limit = table.maxProbes(home);

  for (let k = 0; k < limit; k++) {
    const cursor = table.cursor(hash, k);
    const outcome = table.classify(cursor, key);
    const label = probeLabel(table, home, k, stride, cursor.index, outcome === 'free');

    table.counters.probes += 1;
    frame.probeSeq.push(cursor.index);
    frame.probeIndex = cursor.index;

    if (outcome === 'match') {
      const entry = table.entryAt(cursor);
      frame.phase = 'found';
      frame.explain = \`\${label} — found "\${key}" (inserted #\${entry?.value})\`;
      yield snap(table, frame, 8);
      return;
    }

    if (outcome === 'free') {
      frame.phase = 'not-found';
      frame.explain = \`\${label} — \${missWord(table)} → "\${key}" is not in the table\`;
      yield snap(table, frame, 9);
      return;
    }

    frame.phase = 'probing';
    frame.explain =
      outcome === 'tombstone'
        ? \`\${label} — tombstone; a deleted slot never ends a search → keep walking\`
        : \`\${label} — holds "\${table.entryAt(cursor)?.key}", not "\${key}" → keep walking\`;
    yield snap(table, frame, 7);
  }

  // Only reachable if the probe sequence somehow failed to cover the table; the
  // threshold floor and the coprime stride are both there to make it impossible.
  frame.phase = 'not-found';
  frame.explain = \`walked all \${limit} probes without finding "\${key}"\`;
  yield snap(table, frame, 9);
}

function* runDelete(
  table: HashTable,
  frame: Frame,
  key: string,
  hash: number,
  home: number,
  stride: number,
): Generator<HashStep, void, undefined> {
  const limit = table.maxProbes(home);

  for (let k = 0; k < limit; k++) {
    const cursor = table.cursor(hash, k);
    const outcome = table.classify(cursor, key);
    const label = probeLabel(table, home, k, stride, cursor.index, outcome === 'free');

    table.counters.probes += 1;
    frame.probeSeq.push(cursor.index);
    frame.probeIndex = cursor.index;

    if (outcome === 'match') {
      table.remove(cursor);
      frame.phase = 'deleted';
      frame.explain = removeExplain(table, label, key, cursor.index);
      yield snap(table, frame, 11);
      return;
    }

    if (outcome === 'free') {
      frame.phase = 'not-found';
      frame.explain = \`\${label} — \${missWord(table)} → nothing to delete\`;
      yield snap(table, frame, 9);
      return;
    }

    frame.phase = 'probing';
    frame.explain = \`\${label} — not "\${key}" → keep walking\`;
    yield snap(table, frame, 10);
  }

  frame.phase = 'not-found';
  frame.explain = \`walked all \${limit} probes without finding "\${key}"\`;
  yield snap(table, frame, 9);
}

function missWord(table: HashTable): string {
  return table.strategy === 'chaining' ? 'chain ends here' : 'slot is EMPTY';
}

function removeExplain(table: HashTable, label: string, key: string, index: number): string {
  if (table.strategy === 'chaining') {
    const length = plural(table.chainLength(index), 'link');
    return \`\${label} — unlink "\${key}"; bucket \${index}'s chain is now \${length}\`;
  }
  return \`\${label} — remove "\${key}" and leave a TOMBSTONE, so probes still walk past slot \${index}\`;
}

/**
 * Double the capacity and move every key into it, one visible step at a time.
 *
 * The animation is the reason this category exists. A rehash done in a single
 * frame reads as "the table changed"; done key by key it reads as "every key
 * had to be re-hashed against the NEW capacity, and most of them moved" — which
 * is the fact that makes the amortized-cost argument land.
 *
 * The individual probes of each rehashed insert are not narrated: a 64-slot
 * regrow would spend a hundred steps on arithmetic the viewer has already
 * watched in detail during the ordinary inserts. They are still counted.
 */
function* growAndRehash(table: HashTable, frame: Frame): Generator<HashStep, HashTable, undefined> {
  const carried = table.entries();
  const used = table.fill();
  const ratio = (used / table.capacity).toFixed(2);
  const limit = table.threshold.toFixed(2);
  // Under chaining \`fill\` is just the key count, so calling it "slots used"
  // would be a small lie — a chaining bucket holds as many keys as it likes.
  // Open addressing names the tombstones explicitly, because a table growing
  // while its load factor looks comfortable is otherwise inexplicable.
  const measure =
    table.strategy === 'chaining'
      ? \`load factor \${used}/\${table.capacity} = \${ratio}\`
      : \`slots used \${used}/\${table.capacity} = \${ratio} (\${table.size()} keys\` +
        \`\${table.tombstones() > 0 ? \` + \${table.tombstones()} tombstones\` : ''})\`;

  frame.phase = 'resizing';
  frame.probeIndex = null;
  frame.probeSeq = [];
  frame.explain =
    \`\${measure} > \${limit} → grow to \${table.capacity * 2} slots \` +
    \`and rehash \${plural(carried.length, 'key')}\`;
  yield snap(table, frame, 6);

  const grown = table.growEmpty();
  for (const entry of carried) {
    const landed = grown.insertDirect(entry);
    frame.key = entry.key;
    frame.hash = landed.hash;
    frame.homeIndex = landed.home;
    frame.probeIndex = landed.index;
    frame.probeSeq = [landed.index];
    frame.phase = 'rehashed';
    frame.explain =
      \`rehash "\${entry.key}": \${landed.hash} mod \${grown.capacity} = \${landed.home}\` +
      (landed.index === landed.home
        ? \` → slot \${landed.index}\`
        : \` → slot \${landed.home} taken, landed in \${landed.index}\`);
    yield snap(grown, frame, 6);
  }

  return grown;
}

// ---- the runner -------------------------------------------------------------

/**
 * Execute a whole script, yielding a step per probe.
 *
 * A *script* rather than a single operation, for the same reason the
 * concurrency view replays a schedule: a hash table only becomes interesting
 * once it has a history — collisions need neighbours, tombstones need a prior
 * delete, and a resize needs enough inserts to earn one.
 */
export function* runHashScript(
  ops: readonly HashOp[],
  config: HashRunConfig,
  strategy: CollisionStrategy,
): Generator<HashStep, void, undefined> {
  let table = createHashTable({ strategy, ...config });
  const frame = emptyFrame();

  for (const op of ops) {
    const hash = table.hash(op.key);
    const home = table.home(hash);
    const stride = table.stride(hash);

    frame.op = op.kind;
    frame.key = op.key;
    frame.hash = hash;
    frame.homeIndex = home;
    frame.probeIndex = home;
    frame.probeSeq = [];
    frame.phase = 'hashing';
    frame.explain = hashLine(op.key, hash, table.capacity, home);
    yield snap(table, frame, 1);

    if (op.kind === 'insert') {
      table = yield* runInsert(table, frame, op.key, hash, home, stride);
    } else if (op.kind === 'search') {
      yield* runSearch(table, frame, op.key, hash, home, stride);
    } else {
      yield* runDelete(table, frame, op.key, hash, home, stride);
    }
  }

  const { probes, collisions, resizes } = table.counters;
  const reset = emptyFrame();
  reset.explain =
    \`script complete — \${plural(ops.length, 'operation')}, \${plural(probes, 'probe')}, \` +
    \`\${plural(collisions, 'collision')}, \${plural(resizes, 'resize')}\`;
  yield done(table, reset, 12);
}

/** Bind a strategy to the runner. One of these becomes each registry entry. */
export function hashRunner(strategy: CollisionStrategy) {
  return (ops: readonly HashOp[], config: HashRunConfig) => runHashScript(ops, config, strategy);
}
`,gc={chaining:{file:"hashtable/ops.ts",text:uo},linear:{file:"hashtable/ops.ts",text:uo},quadratic:{file:"hashtable/ops.ts",text:uo},double:{file:"hashtable/ops.ts",text:uo}},lb=oa(gc),Wi=Object.freeze(["compare"]),ub=Object.freeze(["hit"]),Yi=Object.freeze(["miss"]),cb=Object.freeze(["swap"]);function db(t){if(t.probeIndex===null||t.key===null)return!1;const e=t.buckets[t.probeIndex];if(!e||e.state!=="occupied")return!1;const n=e.entries[t.probeSeq.length-1]??e.entries[0];return n!==void 0&&n.key!==t.key}const pb=t=>{switch(t.phase){case"probing":return db(t)?Yi:Wi;case"hashing":return Wi;case"inserted":case"updated":case"found":case"deleted":return ub;case"not-found":return Yi;case"resizing":return cb;default:return Xt}},fb=new Set(["inserted","updated","found","not-found","deleted"]),bc=8,hb=3;function Xi(t){return Array.from({length:t},()=>({entries:[],state:"empty"}))}function vc(t,e=bc){const n=mc(ot(t),e),s=n.map(o=>({kind:"insert",key:o}));return n.length===0||(s.push({kind:"search",key:n[Math.floor(n.length/2)]}),s.push({kind:"delete",key:n[0]})),s}function mb(t={}){const{audio:e=!0}=t,n=Qs(),s=B(Zu),o=B(Yu),a=B(8),r=B(.75),i=B(60),l=B(ze()),u=B([]),c=C(()=>na(a.value)),d=C(()=>Xu(s.value,r.value)),p=C(()=>sa[s.value]),{hydrated:m}=Qt(Hb({strategyKey:s,hashFnKey:o,capacity:a,threshold:r,speed:i,seed:l,script:u}));m.has("ops")||(u.value=vc(l.value));const y=B(Xi(c.value)),g=Ne({capacity:c.value,size:0,loadFactor:0,op:null,key:null,hash:null,homeIndex:null,probeIndex:null,probeSeq:[],phase:"idle",explain:null}),v=Ne({probes:0,collisions:0,resizes:0,opsDone:0});let b=[];function*w(G){let re=0;for(const $e of G)fb.has($e.phase)&&(re+=1),b.push(re),yield $e}function S(){y.value=Xi(c.value),g.capacity=c.value,g.size=0,g.loadFactor=0,g.op=null,g.key=null,g.hash=null,g.homeIndex=null,g.probeIndex=null,g.probeSeq=[],g.phase="idle",g.explain=null,v.probes=0,v.collisions=0,v.resizes=0,v.opsDone=0}const $=vn({speed:i,createGenerator:()=>{S(),b=[];const G=u.value.map(re=>({...re}));return w(p.value.generator(G,{hashFnKey:o.value,capacity:a.value,threshold:r.value}))},applyStep:(G,re)=>{y.value=G.buckets,g.capacity=G.capacity,g.size=G.size,g.loadFactor=G.loadFactor,g.op=G.op,g.key=G.key,g.hash=G.hash,g.homeIndex=G.homeIndex,g.probeIndex=G.probeIndex,g.probeSeq=G.probeSeq,g.phase=G.phase,g.explain=G.explain,v.probes=G.probes,v.collisions=G.collisions,v.resizes=G.resizes,v.opsDone=b[re]??0},clearStep:S,onAdvance:e?G=>n.play(pb(G)):void 0}),_=C(()=>v.opsDone===0?0:v.probes/v.opsDone);function P(){return new Set(u.value.map(G=>G.key))}function K(G){u.value=G.map(re=>({...re})),$.reset()}function I(G,re){re!==""&&(u.value=[...u.value,{kind:G,key:re}],$.reset())}function N(G){u.value=u.value.filter((re,$e)=>$e!==G),$.reset()}function j(){u.value=[],$.reset()}function he(G=bc){const re=mc(ot(l.value),G,P());u.value=[...u.value,...re.map($e=>({kind:"insert",key:$e}))],$.reset()}function Se(G=hb,re){const $e=rb(G,{hashFnKey:o.value,capacity:a.value,exclude:P()},re);return u.value=[...u.value,...$e.keys.map(tt=>({kind:"insert",key:tt}))],$.reset(),$e.bucket}function z(){l.value=ze()}Re([s,o,a,r],()=>$.reset());const ae=C(()=>{var G;return((G=$.current.value)==null?void 0:G.line)??null}),L=C(()=>ib[s.value]),J=C(()=>gc[s.value]),le=C(()=>{var re;const G=(re=$.current.value)==null?void 0:re.line;return G===void 0?[]:lb(s.value).get(G)??[]});return{strategyKey:s,hashFnKey:o,capacity:a,threshold:r,speed:i,seed:l,script:u,startCapacity:c,activeThreshold:d,currentAlgo:p,buckets:y,view:g,stats:v,avgProbes:_,activeLine:ae,pseudocodeLines:L,sourceCode:J,activeSourceLines:le,status:$.status,isRunning:$.isRunning,isPaused:$.isPaused,isDone:$.isDone,canEdit:$.canEdit,delayMs:$.delayMs,elapsedMs:$.elapsedMs,stepCount:$.stepCount,cursor:$.cursor,bufferedCount:$.bufferedCount,fullyBuffered:$.fullyBuffered,current:$.current,canStepBack:$.canStepBack,canStepForward:$.canStepForward,setScript:K,addOp:I,removeOp:N,clearScript:j,bulkLoad:he,forceCollision:Se,randomizeSeed:z,run:$.run,pause:$.pause,reset:$.reset,stepForward:$.stepForward,stepBack:$.stepBack,seek:$.seek,skipToEnd:$.skipToEnd}}function Rr(t){return t.threads.map(e=>e.instructions.length)}function gb(t){return t.map(e=>({id:e.id,pc:e.pc,status:e.status,locals:{...e.locals}}))}function bb(t,e){return t.threads.every((n,s)=>n.pc>=e[s])}function ar(t,e){const n=Rr(t),s=n.map(()=>0);for(const o of e)if(!Number.isInteger(o)||o<0||o>=n.length||(s[o]+=1,s[o]>n[o]))return!1;return s.every((o,a)=>o===n[a])}function*yc(t,e){const n=Rr(t),s=t.createState();for(let o=0;o<e.length;o++){const a=e[o],r=s.threads[a],i=t.threads[a].instructions[r.pc];if(!i)continue;i.exec(s,a),r.pc+=1,r.pc>=n[a]&&(r.status="done");const l=bb(s,n);yield{threads:gb(s.threads),sharedMem:{...s.shared},lockOwners:{...s.locks},lastAction:{threadId:a,instruction:i.label},violated:!t.invariant.holds(s,l),done:l}}}function vb(t,e){let n=-1,s=0;for(const o of yc(t,e))o.violated&&n===-1&&(n=s),s+=1;return{schedule:[...e],violates:n!==-1,firstViolationIndex:n}}const wc=6e3;function yb(t){let e="";for(const n of t)e+=String.fromCharCode(n);return btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function wb(t){const e=t.replace(/-/g,"+").replace(/_/g,"/");try{const n=atob(e),s=new Uint8Array(n.length);for(let o=0;o<n.length;o++)s[o]=n.charCodeAt(o);return s}catch{return}}function xb(t){return t.length>wc?null:yb(new TextEncoder().encode(t))}function kb(t){const e=wb(t);if(e!==void 0)try{const n=new TextDecoder("utf-8",{fatal:!0}).decode(e);return n.length>wc?void 0:n}catch{return}}const jr=2e4,Sb=3e3,$b=5e3,Eb=250,Ks=500,xc=5,Ir=60,kc=22,Sc=60,rr=`// Write any sorting algorithm you like.
// Yield a snapshot whenever you want a frame drawn.
//
//   array       the values, as they stand right now
//   comparing   indices being compared  (amber)
//   swapping    indices being written   (rose)
//   sorted      indices in final place  (emerald)
//   done        true on the very last snapshot

function* run(input) {
  const array = [...input];
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      comparisons++;
      yield {
        array: [...array],
        comparing: [j, j + 1],
        swapping: [],
        sorted: sortedTail(array.length, i),
        comparisons,
        swaps,
        done: false,
      };

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swaps++;
        yield {
          array: [...array],
          comparing: [],
          swapping: [j, j + 1],
          sorted: sortedTail(array.length, i),
          comparisons,
          swaps,
          done: false,
        };
      }
    }
  }

  yield {
    array: [...array],
    comparing: [],
    swapping: [],
    sorted: array.map((_, i) => i),
    comparisons,
    swaps,
    done: true,
  };
}

// Indices already parked at the end of the array after \`passes\` passes.
function sortedTail(length, passes) {
  const out = [];
  for (let i = length - passes; i < length; i++) out.push(i);
  return out;
}
`;function yn(t){return String(t)}function wn(t){const e=gg(t);return e===null?void 0:e}function ts(t){if(t.trim()==="")return;const e=Number(t);return Number.isInteger(e)?e:void 0}function $a(t){const e=[];for(const n of t.split(",")){const s=ts(n);if(s===void 0)return;e.push(s)}return e}const Ea={algo:"bubble",size:45,speed:60};function Cb(t){return{algo:{ref:t.algoKey,encode:e=>e===Ea.algo?null:e,decode:e=>Jt(us,e)},size:{ref:t.size,encode:e=>e===Ea.size?null:String(e),decode:e=>Ze(e,10,100),debounceMs:250},speed:{ref:t.speed,encode:e=>e===Ea.speed?null:String(e),decode:e=>Ze(e,1,100),debounceMs:250},seed:{ref:t.seed,encode:yn,decode:wn}}}const co={algo:"binary",size:20,speed:60,target:0};function Ab(t){return{algo:{ref:t.algoKey,encode:e=>e===co.algo?null:e,decode:e=>Jt(Qo,e)},size:{ref:t.size,encode:e=>e===co.size?null:String(e),decode:e=>Ze(e,10,50),debounceMs:250},speed:{ref:t.speed,encode:e=>e===co.speed?null:String(e),decode:e=>Ze(e,1,100),debounceMs:250},seed:{ref:t.seed,encode:yn,decode:wn},target:{ref:t.target,encode:e=>e===co.target?null:String(e),decode:e=>Ze(e,0,99)}}}function Tb(t,e){const n="bfs",o={row:Math.floor(e.rows/2),col:0},a={row:Math.floor(e.rows/2),col:e.cols-1},r=(i,l)=>i.row===l.row&&i.col===l.col;return{algo:{ref:t.algoKey,encode:i=>i===n?null:i,decode:i=>Jt(Zo,i)},speed:{ref:t.speed,encode:i=>i===60?null:String(i),decode:i=>Ze(i,1,100),debounceMs:250},seed:{ref:t.seed,encode:yn,decode:wn},start:{ref:t.start,encode:i=>r(i,o)?null:Fi(i),decode:i=>Hi(i,e.rows,e.cols)},end:{ref:t.end,encode:i=>r(i,a)?null:Fi(i),decode:i=>Hi(i,e.rows,e.cols)}}}function Ji(t){return C({get:()=>({row:t.row,col:t.col}),set:e=>{t.row=e.row,t.col=e.col}})}const Qi={algo:"bfs",speed:60};function Ob(t){return{algo:{ref:t.algoKey,encode:e=>e===Qi.algo?null:e,decode:e=>Jt(ea,e)},speed:{ref:t.speed,encode:e=>e===Qi.speed?null:String(e),decode:e=>Ze(e,1,100),debounceMs:250},seed:{ref:t.seed,encode:yn,decode:wn},start:{ref:t.startId,encode:e=>e===null?null:String(e),decode:e=>Ze(e,0,9999)}}}const Zi={size:kc,speed:Sc};function Mb(t){return{src:{ref:t.source,encode:e=>e===rr?null:xb(e),decode:kb,debounceMs:400},size:{ref:t.size,encode:e=>e===Zi.size?null:String(e),decode:e=>Ze(e,xc,Ir),debounceMs:250},speed:{ref:t.speed,encode:e=>e===Zi.speed?null:String(e),decode:e=>Ze(e,1,100),debounceMs:250},seed:{ref:t.seed,encode:yn,decode:wn}}}const el={scenario:ec,speed:60};function _b(t,e){return{scenario:{ref:t.scenarioKey,encode:n=>n===el.scenario?null:n,decode:n=>Jt(qs,n)},speed:{ref:t.speed,encode:n=>n===el.speed?null:String(n),decode:n=>Ze(n,1,100),debounceMs:250},seed:{ref:t.seed,encode:yn,decode:wn},sched:{ref:C({get:()=>t.schedule.value.join(""),set:n=>{t.schedule.value=[...n].map(Number)}}),encode:n=>n===""?null:n,decode:n=>{if(/^[0-9]+$/.test(n))return ar(e(),[...n].map(Number))?n:void 0}}}}const tl={algo:"fib",speed:60};function Rb(t,e){switch(t){case"scalar":{const n=ts(e);return n===void 0?void 0:{kind:"scalar",n}}case"coins":{const n=e.split(":");if(n.length!==2)return;const s=$a(n[0]),o=ts(n[1]);return s===void 0||o===void 0?void 0:{kind:"coins",coins:s,amount:o}}case"sequence":{const n=$a(e);return n===void 0?void 0:{kind:"sequence",values:n}}case"items":{const n=e.split(":");if(n.length!==2)return;const s=ts(n[1]);if(s===void 0)return;const o=[];for(const a of n[0].split(",")){const r=a.split("/");if(r.length!==2)return;const i=ts(r[0]),l=ts(r[1]);if(i===void 0||l===void 0)return;o.push({weight:i,value:l})}return{kind:"items",items:o,capacity:s}}case"strings2":{const n=e.split(":");return n.length!==2?void 0:{kind:"strings2",a:n[0],b:n[1]}}case"chain":{const n=$a(e);return n===void 0?void 0:{kind:"chain",dims:n}}}}function jb(t,e){const n=t.indexOf(":"),s=n===-1?t:t.slice(0,n),o=n===-1?"":t.slice(n+1);if(s!==e.kind)return;const a=Rb(e.kind,o);if(a!==void 0)return Ro(e,a)===null?a:void 0}function Ib(t){return{algo:{ref:t.algoKey,encode:e=>e===tl.algo?null:e,decode:e=>Jt(Gt,e)},speed:{ref:t.speed,encode:e=>e===tl.speed?null:String(e),decode:e=>Ze(e,1,100),debounceMs:250},seed:{ref:t.seed,encode:yn,decode:wn},in:{ref:t.input,encode:e=>{const n=Ls(e),s=Ls(Gt[t.algoKey.value].defaults);return n===s?null:n},decode:e=>jb(e,Gt[t.algoKey.value])}}}const Ca={algo:"kruskal",n:8,speed:60};function nl(t){const e=n=>n>=0&&n<t;return{encodeOp:n=>n.kind==="union"?`u${n.a}.${n.b??n.a}`:`f${n.a}`,decodeOp:n=>{const s=/^([uf])(\d+)(?:\.(\d+))?$/.exec(n);if(s===null)return;const o=Number(s[2]);if(!e(o))return;if(s[1]==="f")return s[3]===void 0?{kind:"find",a:o}:void 0;if(s[3]===void 0)return;const a=Number(s[3]);return e(a)?{kind:"union",a:o,b:a}:void 0}}}function Db(t){return{algo:{ref:t.algoKey,encode:e=>e===Ca.algo?null:e,decode:e=>Jt(ta,e)},n:{ref:t.nodeCount,encode:e=>e===Ca.n?null:String(e),decode:e=>Ze(e,dc,pc),debounceMs:250},speed:{ref:t.speed,encode:e=>e===Ca.speed?null:String(e),decode:e=>Ze(e,1,100),debounceMs:250},seed:{ref:t.seed,encode:yn,decode:wn},start:{ref:t.startId,encode:e=>e===null?null:String(e),decode:e=>Ze(e,0,9999)},ops:{ref:t.opScript,encode:e=>{const n=nl(t.nodeCount.value),s=Io(e,n),o=or(t.nodeCount.value,t.seed.value);return s===Io(o,n)?null:s},decode:e=>ic(e,nl(t.nodeCount.value))}}}const Ss={strategy:Zu,fn:Yu,capacity:8,threshold:.75,speed:60},Lb=25,Nb=150,Aa=t=>Math.round(t*100),Pb={insert:"i",search:"s",delete:"d"},Bb={i:"insert",s:"search",d:"delete"},Fb=/^([isd])([A-Za-z0-9]{1,12})$/,Ta={encodeOp:t=>`${Pb[t.kind]}${t.key}`,decodeOp:t=>{const e=Fb.exec(t);if(e!==null)return{kind:Bb[e[1]],key:e[2]}}};function Hb(t){return{strategy:{ref:t.strategyKey,encode:e=>e===Ss.strategy?null:e,decode:e=>Jt(sa,e)},fn:{ref:t.hashFnKey,encode:e=>e===Ss.fn?null:e,decode:e=>Jt(zn,e)},cap:{ref:t.capacity,encode:e=>e===Ss.capacity?null:String(e),decode:e=>Ze(e,4,64),debounceMs:250},thr:{ref:t.threshold,encode:e=>Aa(e)===Aa(Ss.threshold)?null:String(Aa(e)),decode:e=>{const n=Ze(e,Lb,Nb);return n===void 0?void 0:n/100},debounceMs:250},speed:{ref:t.speed,encode:e=>e===Ss.speed?null:String(e),decode:e=>Ze(e,1,100),debounceMs:250},seed:{ref:t.seed,encode:yn,decode:wn},ops:{ref:t.script,encode:e=>{const n=Io(e,Ta),s=vc(t.seed.value);return n===Io(s,Ta)?null:n},decode:e=>ic(e,Ta)}}}function sl(t={}){const{syncUrl:e=!0,audio:n=!0}=t,s=Qs(),o=B(45),a=B(60),r=B("bubble"),i=B(ze()),l=B([]),u=Ne({comparing:[],swapping:[],sorted:[]}),c=Ne({comparisons:0,swaps:0}),d=B([]),p=C(()=>us[r.value]),m=B(1);function y(N){const j=ot(i.value);return Array.from({length:N},()=>j.int(1,99))}function g(){u.comparing=[],u.swapping=[],u.sorted=[]}function v(){c.comparisons=0,c.swaps=0}const b=vn({speed:a,createGenerator:()=>(l.value=[...d.value],g(),v(),p.value.generator([...d.value])),applyStep:N=>{l.value=N.array,u.comparing=N.comparing,u.swapping=N.swapping,u.sorted=N.sorted,c.comparisons=N.comparisons,c.swaps=N.swaps},clearStep:()=>{l.value=[...d.value],g(),v()},onAdvance:n?N=>{var j;return s.play(((j=ro[r.value])==null?void 0:j.call(ro,N))??Xt)}:void 0});function w(){d.value=y(o.value),m.value=Math.max(...d.value,1),b.reset()}function S(N){N.length!==0&&(d.value=[...N],o.value=N.length,m.value=Math.max(...N,1),b.reset())}const $=C(()=>{var N;return((N=b.current.value)==null?void 0:N.line)??null}),_=C(()=>sc[r.value]),P=C(()=>{var j;const N=(j=b.current.value)==null?void 0:j.line;return N===void 0?[]:hg(r.value).get(N)??[]}),K=C(()=>r.value in ro);function I(){i.value=ze(),w()}return e&&Qt(Cb({algoKey:r,size:o,speed:a,seed:i})),w(),{size:o,speed:a,algoKey:r,seed:i,array:l,baseArray:d,highlights:u,stats:c,maxValue:m,currentAlgo:p,status:b.status,isRunning:b.isRunning,isPaused:b.isPaused,isDone:b.isDone,canEdit:b.canEdit,delayMs:b.delayMs,elapsedMs:b.elapsedMs,stepCount:b.stepCount,cursor:b.cursor,bufferedCount:b.bufferedCount,fullyBuffered:b.fullyBuffered,current:b.current,activeLine:$,sourceCode:_,activeSourceLines:P,hasSoundCues:K,canStepBack:b.canStepBack,canStepForward:b.canStepForward,generate:w,randomizeSeed:I,setArray:S,run:b.run,pause:b.pause,reset:b.reset,stepForward:b.stepForward,stepBack:b.stepBack,seek:b.seek,skipToEnd:b.skipToEnd}}const Vb={bubble:["for i = 0 to n - 2","  for j = 0 to n - 2 - i","    if a[j] > a[j + 1]","      swap a[j] and a[j + 1]","  a[n - 1 - i] is now in its final position","done — array is sorted"],selection:["for i = 0 to n - 1","  min = i","  for j = i + 1 to n - 1","    if a[j] < a[min]: min = j","  if min != i","    swap a[i] and a[min]","  a[i] is now in its final position","done — array is sorted"],insertion:["for i = 1 to n - 1","  j = i","  while j > 0 and a[j - 1] > a[j]","    swap a[j - 1] and a[j]","    j = j - 1","done — array is sorted"],merge:["mergesort(lo, hi):","  if hi - lo <= 1: return","  mid = (lo + hi) / 2","  mergesort(lo, mid); mergesort(mid, hi)","  while both halves still have items","    compare a[i] and a[j]; move the smaller into buffer","  append whatever remains of either half","  copy the buffer back into a[lo..hi)","done — array is sorted"],quick:["quicksort(lo, hi):","  if lo >= hi: return","  pivot = a[hi]; i = lo","  for j = lo to hi - 1","    if a[j] < pivot","      swap a[i] and a[j]; i = i + 1","  swap a[i] and a[hi]   // pivot into its final position","  quicksort(lo, i - 1); quicksort(i + 1, hi)","done — array is sorted"],heap:["siftDown(root, hi):","  while root still has a child at or before hi","    child = the larger child of root","    if a[root] >= a[child]: stop","    swap a[root] and a[child]; root = child","build the max-heap: for i = n/2 - 1 down to 0","  siftDown(i, n - 1)","for end = n - 1 down to 1","  swap a[0] and a[end]   // the max lands in its final slot","  siftDown(0, end - 1)","done — array is sorted"],shell:["for gap = n/2; gap > 0; gap = gap/2","  for i = gap to n - 1","    j = i","    while j >= gap and a[j - gap] > a[j]","      swap a[j - gap] and a[j]","      j = j - gap","done — array is sorted"],comb:["gap = n; swapped = true","while gap > 1 or swapped","  gap = max(1, floor(gap / 1.3))","  swapped = false","  for i = 0 while i + gap < n","    if a[i] > a[i + gap]","      swap a[i] and a[i + gap]; swapped = true","done — array is sorted"],counting:["count = zeros, sized max(a) + 1","for i = 0 to n - 1","  count[a[i]] = count[a[i]] + 1","for v = 1 to max","  count[v] = count[v] + count[v - 1]   // where each value ends","for i = n - 1 down to 0   // backwards keeps equal values in order","  d = count[a[i]] - 1; count[a[i]] = d","  output[d] = a[i]","done — array is sorted"],radix:["for exp = 1, 10, 100, ... while max / exp > 0","  digit(v) = (v / exp) mod 10","  count = ten zeros","  for i = 0 to n - 1","    count[digit(a[i])] = count[digit(a[i])] + 1","  for d = 1 to 9","    count[d] = count[d] + count[d - 1]   // where each digit ends","  for i = n - 1 down to 0   // backwards keeps the pass stable","    k = count[digit(a[i])] - 1; count[digit(a[i])] = k","    output[k] = a[i]","  a = output   // now ordered by every digit up to exp","done — array is sorted"]},Ub={class:"av-card p-4 sm:p-5"},zb={key:0,class:"mb-3 flex items-center justify-between"},qb={class:"text-xs font-semibold uppercase tracking-wider text-ink-faint"},Kb={key:1,class:"mb-3 text-xs font-semibold uppercase tracking-wider text-ink-faint"},we=se({__name:"AvPanel",props:{title:{}},setup(t){return(e,n)=>(x(),T("div",Ub,[e.$slots.header?(x(),T("div",zb,[h("h2",qb,R(t.title),1),So(e.$slots,"header")])):t.title?(x(),T("h2",Kb,R(t.title),1)):pe("",!0),So(e.$slots,"default")]))}}),Gb=["disabled","aria-pressed"],Wb="flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none",Yb="rounded-xl bg-surface-alt px-3 py-2 text-xs font-semibold text-ink-muted transition-all hover:bg-surface-raised hover:text-ink disabled:cursor-not-allowed disabled:opacity-50",Z=se({__name:"AvButton",props:{variant:{default:"neutral"},active:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1}},setup(t){const e=t,n={primary:"bg-ok text-ink-inverse shadow-md shadow-ok/30 hover:bg-ok/90",warning:"bg-warn text-ink-inverse shadow-md shadow-warn/30 hover:bg-warn/90",danger:"bg-danger text-ink-inverse shadow-md shadow-danger/30 hover:bg-danger/90",neutral:"bg-surface-alt text-ink hover:bg-surface-raised"},s={primary:"hover:shadow-lg",warning:"hover:shadow-lg",danger:"hover:shadow-lg",neutral:""},o={selector:{base:"rounded-xl px-3 py-2 text-sm font-medium transition-all disabled:cursor-not-allowed",on:"bg-accent text-accent-ink shadow-md shadow-accent/30",off:"bg-surface-alt text-ink-muted hover:bg-surface-raised hover:text-ink disabled:opacity-50"},toggle:{base:"rounded-lg px-3 py-1.5 text-xs font-semibold transition-all disabled:cursor-not-allowed",on:"bg-accent text-accent-ink shadow-sm",off:"text-ink-muted hover:bg-surface-raised hover:text-ink"}},a=C(()=>e.variant==="selector"||e.variant==="toggle"),r=C(()=>{const l=e.variant;if(l==="selector"||l==="toggle"){const u=o[l];return[u.base,e.active?u.on:u.off]}return l==="quiet"?Yb:[Wb,n[l],s[l]]}),i=C(()=>a.value?e.active:void 0);return(l,u)=>(x(),T("button",{type:"button",class:ve(r.value),disabled:t.disabled,"aria-pressed":i.value},[So(l.$slots,"default")],10,Gb))}}),Xb={key:0,class:"mt-4 rounded-xl bg-surface-alt p-4"},Jb={class:"text-sm leading-relaxed text-ink-muted"},Qb={class:"mt-3 flex flex-wrap gap-2"},Zb={class:"uppercase tracking-wide text-[10px] text-ink-faint"},ev={class:"font-mono font-semibold text-accent"},Tn=se({__name:"AvAlgorithmSelector",props:qn({algorithms:{},title:{default:"Algorithm"},disabled:{type:Boolean,default:!1},columns:{default:2}},{modelValue:{required:!0},modelModifiers:{}}),emits:["update:modelValue"],setup(t){const e=t,n=Kn(t,"modelValue"),s=C(()=>Object.keys(e.algorithms)),o=C(()=>e.algorithms[n.value]),a=C(()=>o.value?Object.entries(o.value.complexity):[]),r={2:"grid grid-cols-2 gap-2",3:"grid grid-cols-2 gap-2 sm:grid-cols-3",4:"grid grid-cols-2 gap-2 sm:grid-cols-4"},i=C(()=>r[e.columns]);function l(u){e.disabled||(n.value=u)}return(u,c)=>(x(),Y(we,{title:t.title},{default:D(()=>[h("div",{class:ve(i.value)},[(x(!0),T(te,null,de(s.value,d=>(x(),Y(Z,{key:d,variant:"selector",active:d===n.value,disabled:t.disabled,onClick:p=>l(d)},{default:D(()=>[M(R(t.algorithms[d].name),1)]),_:2},1032,["active","disabled","onClick"]))),128))],2),o.value?(x(),T("div",Xb,[h("p",Jb,R(o.value.description),1),h("div",Qb,[(x(!0),T(te,null,de(a.value,([d,p])=>(x(),T("span",{key:d,class:"inline-flex items-center gap-1 rounded-lg bg-surface-raised px-2.5 py-1 text-xs font-medium text-ink-muted shadow-sm"},[h("span",Zb,R(d),1),h("span",ev,R(p),1)]))),128)),o.value.stable!==void 0?(x(),T("span",{key:0,class:ve(["inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium shadow-sm",o.value.stable?"bg-ok-soft text-ok-ink":"bg-warn-soft text-warn-ink"])},R(o.value.stable?"Stable":"Unstable"),3)):pe("",!0)])])):pe("",!0)]),_:1},8,["title"]))}}),tv={class:"block"},nv={class:"mb-1.5 flex items-center justify-between text-sm"},sv={class:"font-medium text-ink-muted"},ov={class:"font-mono text-accent"},av=["min","max","step","value","disabled","aria-valuetext"],Ve=se({__name:"AvSlider",props:qn({label:{},min:{},max:{},step:{default:1},suffix:{default:""},disabled:{type:Boolean,default:!1}},{modelValue:{required:!0},modelModifiers:{}}),emits:["update:modelValue"],setup(t){const e=t,n=Kn(t,"modelValue"),s=C(()=>`${n.value}${e.suffix}`);function o(a){n.value=Number(a.target.value)}return(a,r)=>(x(),T("label",tv,[h("div",nv,[h("span",sv,R(t.label),1),h("span",ov,R(s.value),1)]),h("input",{type:"range",min:t.min,max:t.max,step:t.step,value:n.value,disabled:t.disabled,"aria-valuetext":s.value,class:"w-full",onInput:o},null,40,av)]))}}),rv={class:"space-y-4"},iv={key:1,class:"mt-2 text-center text-xs text-ink-faint"},lv={class:"mt-2 grid grid-cols-2 gap-2"},uv=se({__name:"ControlsPanel",props:{size:{},speed:{},status:{},canEdit:{type:Boolean},isRunning:{type:Boolean},isPaused:{type:Boolean},compare:{type:Boolean,default:!1},sound:{type:Boolean,default:!1},volume:{default:.4},hasSoundCues:{type:Boolean,default:!0}},emits:["update:size","update:speed","update:compare","update:sound","update:volume","generate","run","runBoth","pause","reset"],setup(t,{emit:e}){const n=t,s=e;function o(){n.compare?s("runBoth"):s("run")}return(a,r)=>(x(),Y(we,{title:"Controls"},{default:D(()=>[h("div",rv,[A(Ve,{label:"Array size","model-value":t.size,min:10,max:100,disabled:!t.canEdit,"onUpdate:modelValue":r[0]||(r[0]=i=>s("update:size",i))},null,8,["model-value","disabled"]),A(Ve,{label:"Speed","model-value":t.speed,min:1,max:100,suffix:"%","onUpdate:modelValue":r[1]||(r[1]=i=>s("update:speed",i))},null,8,["model-value"])]),A(Z,{variant:"toggle",class:"mt-5 w-full",active:t.compare,disabled:!t.canEdit,onClick:r[2]||(r[2]=i=>s("update:compare",!t.compare))},{default:D(()=>[...r[8]||(r[8]=[M(" Compare two algorithms ",-1)])]),_:1},8,["active","disabled"]),A(Z,{variant:"toggle",class:"mt-2 w-full",active:t.sound,onClick:r[3]||(r[3]=i=>s("update:sound",!t.sound))},{default:D(()=>[...r[9]||(r[9]=[M(" Sound cues ",-1)])]),_:1},8,["active"]),t.sound?(x(),Y(Ve,{key:0,label:"Volume",class:"mt-3","model-value":Math.round(t.volume*100),min:0,max:100,suffix:"%","onUpdate:modelValue":r[4]||(r[4]=i=>s("update:volume",i/100))},null,8,["model-value"])):pe("",!0),t.sound&&!t.hasSoundCues?(x(),T("p",iv," Sound cues aren't mapped for this algorithm yet. ")):pe("",!0),h("div",lv,[t.isRunning?(x(),Y(Z,{key:1,variant:"warning",class:"col-span-2",onClick:r[5]||(r[5]=i=>s("pause"))},{default:D(()=>[...r[11]||(r[11]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M6 4h4v16H6zM14 4h4v16h-4z"})],-1),M(" Pause ",-1)])]),_:1})):(x(),Y(Z,{key:0,variant:"primary",class:"col-span-2",onClick:o},{default:D(()=>[r[10]||(r[10]=h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M8 5v14l11-7z"})],-1)),M(" "+R(t.isPaused?"Resume":"Run"),1)]),_:1})),A(Z,{variant:"neutral",onClick:r[6]||(r[6]=i=>s("reset"))},{default:D(()=>[...r[12]||(r[12]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.36 2.64L3 8"}),h("path",{d:"M3 3v5h5"})],-1),M(" Reset ",-1)])]),_:1}),A(Z,{variant:"neutral",disabled:!t.canEdit,onClick:r[7]||(r[7]=i=>s("generate"))},{default:D(()=>[...r[13]||(r[13]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"})],-1),M(" Shuffle ",-1)])]),_:1},8,["disabled"])]),r[14]||(r[14]=h("p",{class:"mt-3 text-center text-xs text-ink-faint"}," Size & algorithm lock while a sort is running. ",-1))]),_:1}))}}),cv={key:1,class:"text-sm text-ink-faint"},dv={class:"mt-3 grid grid-cols-3 gap-2"},xn=se({__name:"PlaybackScrubber",props:{cursor:{},bufferedCount:{},fullyBuffered:{type:Boolean},canStepBack:{type:Boolean},canStepForward:{type:Boolean}},emits:["seek","step-back","step-forward","skip-to-end"],setup(t,{emit:e}){const n=e;return(s,o)=>(x(),Y(we,{title:"History"},{default:D(()=>[t.bufferedCount>0?(x(),Y(Ve,{key:0,label:"Step",min:0,max:Math.max(0,t.bufferedCount-1),suffix:` / ${Math.max(0,t.bufferedCount-1)}`,"model-value":t.cursor,"onUpdate:modelValue":o[0]||(o[0]=a=>n("seek",a))},null,8,["max","suffix","model-value"])):(x(),T("p",cv,"Press Run or Step to begin.")),h("div",dv,[A(Z,{variant:"quiet",disabled:!t.canStepBack,onClick:o[1]||(o[1]=a=>n("step-back"))},{default:D(()=>[...o[4]||(o[4]=[M(" ◀ Step ",-1)])]),_:1},8,["disabled"]),A(Z,{variant:"quiet",disabled:!t.canStepForward,onClick:o[2]||(o[2]=a=>n("step-forward"))},{default:D(()=>[...o[5]||(o[5]=[M(" Step ▶ ",-1)])]),_:1},8,["disabled"]),A(Z,{variant:"quiet",disabled:t.fullyBuffered&&t.cursor===t.bufferedCount-1,onClick:o[3]||(o[3]=a=>n("skip-to-end"))},{default:D(()=>[...o[6]||(o[6]=[M(" Skip to end ",-1)])]),_:1},8,["disabled"])])]),_:1}))}}),pv={class:"flex gap-1 rounded-xl bg-surface-alt p-1"},fv={key:0,class:"mb-2 font-mono text-[0.65rem] uppercase tracking-wider text-ink-faint"},hv={key:1,class:"text-xs text-ink-faint"},mv=["data-active"],gv={class:"whitespace-pre font-mono"},aa=se({__name:"CodePanel",props:{lines:{},source:{},sourceFile:{default:""},activeLine:{default:null},activeSourceLines:{default:()=>[]},title:{default:"Code"}},setup(t){const e=t,n=B("pseudo"),s=C(()=>e.source.split(`
`)),o=C(()=>n.value==="source"?s.value:e.lines);function a(c){return n.value==="source"?e.activeSourceLines.includes(c):c===e.activeLine}const r=/^\s*(\/\/|\/\*|\*)/;function i(c){return n.value==="source"&&r.test(c)}const l=C(()=>n.value==="source"?e.activeSourceLines[0]??null:e.activeLine),u=B(null);return Re([l,n],async()=>{var d,p;if(l.value===null)return;await hs();const c=(d=u.value)==null?void 0:d.querySelector('[data-active="true"]');(p=c==null?void 0:c.scrollIntoView)==null||p.call(c,{block:"nearest"})}),(c,d)=>(x(),Y(we,{title:t.title,class:"max-h-96 overflow-y-auto"},{header:D(()=>[h("div",pv,[A(Z,{variant:"toggle",active:n.value==="pseudo",onClick:d[0]||(d[0]=p=>n.value="pseudo")},{default:D(()=>[...d[2]||(d[2]=[M(" Pseudocode ",-1)])]),_:1},8,["active"]),A(Z,{variant:"toggle",active:n.value==="source",onClick:d[1]||(d[1]=p=>n.value="source")},{default:D(()=>[...d[3]||(d[3]=[M(" Source ",-1)])]),_:1},8,["active"])])]),default:D(()=>[n.value==="source"&&t.sourceFile?(x(),T("p",fv,R(t.sourceFile),1)):pe("",!0),o.value.length===0?(x(),T("p",hv," Pseudocode isn't written for this algorithm yet — switch to Source to watch the generator itself. ")):(x(),T("ol",{key:2,ref_key:"list",ref:u,class:"space-y-0.5 text-xs"},[(x(!0),T(te,null,de(o.value,(p,m)=>(x(),T("li",{key:m,"data-active":a(m),class:ve(["flex gap-3 rounded px-1.5 py-0.5 transition-colors",a(m)?"bg-tone-probe/20 text-tone-probe-ink":i(p)?"text-ink-faint":"text-ink-muted"])},[h("span",{class:ve(["nums w-5 flex-none text-right",a(m)?"font-semibold text-tone-probe-ink":"text-ink-faint"])},R(m+1),3),h("span",gv,R(p),1)],10,mv))),128))],512))]),_:1},8,["title"]))}}),bv={class:"block"},vv={class:"mb-1.5 flex items-center justify-between text-sm"},yv={class:"font-medium text-ink-muted"},wv=["value","placeholder","disabled","aria-invalid"],xv={key:0,class:"mt-1.5 text-xs text-danger-ink"},kt=se({__name:"AvTextField",props:qn({label:{},placeholder:{default:""},error:{default:null},disabled:{type:Boolean,default:!1},monospace:{type:Boolean,default:!1}},{modelValue:{required:!0},modelModifiers:{}}),emits:["update:modelValue"],setup(t){const e=Kn(t,"modelValue");function n(s){e.value=s.target.value}return(s,o)=>(x(),T("label",bv,[h("div",vv,[h("span",yv,R(t.label),1)]),h("input",{type:"text",value:e.value,placeholder:t.placeholder,disabled:t.disabled,"aria-invalid":!!t.error,class:ve(["w-full rounded-xl border bg-surface-raised px-3 py-2 text-sm text-ink transition-colors disabled:cursor-not-allowed disabled:opacity-50",[t.monospace?"font-mono":"",t.error?"border-danger ring-1 ring-danger":"border-line"]]),onInput:n},null,42,wv),t.error?(x(),T("p",xv,R(t.error),1)):pe("",!0)]))}}),kv={class:"space-y-4"},Sv={class:"mt-4 grid grid-cols-2 gap-2"},$c=se({__name:"DatasetPanel",props:{seed:{},custom:{},error:{},canEdit:{type:Boolean}},emits:["update:seed","update:custom","apply","randomize"],setup(t,{emit:e}){const n=e;function s(o){const a=Number(o);Number.isInteger(a)&&n("update:seed",a)}return(o,a)=>(x(),Y(we,{title:"Dataset"},{default:D(()=>[h("div",kv,[A(kt,{label:"Seed",monospace:"","model-value":String(t.seed),disabled:!t.canEdit,"onUpdate:modelValue":s},null,8,["model-value","disabled"]),A(kt,{label:"Custom array",monospace:"",placeholder:"e.g. 5, 3, 9, 1","model-value":t.custom,error:t.error,disabled:!t.canEdit,"onUpdate:modelValue":a[0]||(a[0]=r=>n("update:custom",r))},null,8,["model-value","error","disabled"])]),h("div",Sv,[A(Z,{variant:"quiet",disabled:!t.canEdit,onClick:a[1]||(a[1]=r=>n("apply"))},{default:D(()=>[...a[3]||(a[3]=[M("Apply",-1)])]),_:1},8,["disabled"]),A(Z,{variant:"quiet",disabled:!t.canEdit,onClick:a[2]||(a[2]=r=>n("randomize"))},{default:D(()=>[...a[4]||(a[4]=[M("New seed",-1)])]),_:1},8,["disabled"])]),a[5]||(a[5]=h("p",{class:"mt-3 text-xs text-ink-faint"},"The same seed always reproduces the same data.",-1))]),_:1}))}}),Ct={idle:"bg-tone-idle-soft",probe:"bg-tone-probe-soft",active:"bg-tone-active-soft",settled:"bg-tone-settled-soft",rejected:"bg-tone-rejected-soft",blocked:"bg-tone-blocked-soft"},Bn={idle:"text-tone-idle-ink",probe:"text-tone-probe-ink",active:"text-tone-active-ink",settled:"text-tone-settled-ink",rejected:"text-tone-rejected-ink",trace:"text-tone-trace-ink",blocked:"text-tone-blocked-ink"},Qe={idle:"border-tone-idle/60",probe:"border-tone-probe/60",active:"border-tone-active/60",settled:"border-tone-settled/60",rejected:"border-tone-rejected/60",trace:"border-tone-trace/60",blocked:"border-tone-blocked/60"},ht={idle:"fill-tone-idle",probe:"fill-tone-probe",active:"fill-tone-active",settled:"fill-tone-settled",rejected:"fill-tone-rejected"},vt={idle:"stroke-tone-idle",probe:"stroke-tone-probe",active:"stroke-tone-active",settled:"stroke-tone-settled",rejected:"stroke-tone-rejected",trace:"stroke-tone-trace",blocked:"stroke-tone-blocked"},at={idle:"viz-mark bg-tone-idle [--tone-pat:var(--av-tone-idle-pat)]",probe:"viz-mark bg-tone-probe [--tone-pat:var(--av-tone-probe-pat)]",active:"viz-mark bg-tone-active [--tone-pat:var(--av-tone-active-pat)]",settled:"viz-mark bg-tone-settled [--tone-pat:var(--av-tone-settled-pat)]",rejected:"viz-mark bg-tone-rejected [--tone-pat:var(--av-tone-rejected-pat)]",trace:"viz-mark bg-tone-trace [--tone-pat:var(--av-tone-trace-pat)]",blocked:"viz-mark bg-tone-blocked [--tone-pat:var(--av-tone-blocked-pat)]"},$v={idle:"Untouched",probe:"Comparing",active:"Current",settled:"Settled",rejected:"Rejected",trace:"Path",blocked:"Blocked"};function kn(t){return t.map(e=>typeof e=="string"?{tone:e,label:$v[e]}:e)}const Ev={class:"flex flex-wrap items-center gap-3 text-xs text-ink-muted"},_n=se({__name:"AvLegend",props:{items:{}},setup(t){return(e,n)=>(x(),T("div",Ev,[(x(!0),T(te,null,de(t.items,s=>(x(),T("span",{key:s.label,class:"flex items-center gap-1.5"},[h("i",{class:ve(["h-3 w-3 rounded-mark",f(at)[s.tone]])},null,2),M(R(s.label),1)]))),128))]))}}),Cv={key:0,class:"mt-1 select-none","aria-hidden":"true"},Av={class:"flex items-start gap-[2px] sm:gap-1"},Tv={key:0,class:"nums mt-0.5 font-mono text-[9px] leading-none text-ink-faint"},Ov=se({__name:"AvRulerRail",props:{length:{},step:{default:5},minLength:{default:12}},setup(t){const e=t,n=C(()=>e.length>=e.minLength),s=C(()=>{const a=Math.ceil(e.length/12);return Math.max(e.step,Math.ceil(a/e.step)*e.step)}),o=C(()=>Array.from({length:e.length},(a,r)=>({index:r,major:r%s.value===0})));return(a,r)=>n.value?(x(),T("div",Cv,[h("div",Av,[(x(!0),T(te,null,de(o.value,i=>(x(),T("div",{key:i.index,class:"flex flex-1 flex-col items-center"},[h("span",{class:ve(["w-px bg-line-strong",i.major?"h-1.5 opacity-100":"h-1 opacity-40"])},null,2),i.major?(x(),T("span",Tv,R(i.index),1)):pe("",!0)]))),128))])])):pe("",!0)}}),Mv={class:"mb-3 flex flex-wrap items-center gap-x-4 gap-y-2"},_v={class:"text-xs font-semibold uppercase tracking-wider text-ink-faint"},Rv={class:"flex min-h-[280px] flex-1 items-end gap-[2px] rounded-xl bg-surface-alt p-3 sm:gap-1"},jv={key:0,class:"nums mb-1 text-[10px] font-medium text-ink-faint sm:text-xs"},bo=se({__name:"BarChart",props:{array:{},comparing:{default:()=>[]},swapping:{default:()=>[]},sorted:{default:()=>[]},maxValue:{default:1},title:{default:"Visualization"},showLegend:{type:Boolean,default:!0}},setup(t){const e=t,n=C(()=>new Set(e.comparing)),s=C(()=>new Set(e.swapping)),o=C(()=>new Set(e.sorted)),a=C(()=>e.array.length<=25);function r(u){return s.value.has(u)?at.active:n.value.has(u)?at.probe:o.value.has(u)?at.settled:at.idle}const i=kn([{tone:"idle",label:"Unsorted"},{tone:"probe",label:"Comparing"},{tone:"active",label:"Swapping"},{tone:"settled",label:"Sorted"}]);function l(u){return`${u/e.maxValue*98+2}%`}return(u,c)=>(x(),Y(we,{class:"flex h-full flex-col"},{default:D(()=>[h("div",Mv,[h("h2",_v,R(t.title),1),t.showLegend?(x(),Y(_n,{key:0,items:f(i)},null,8,["items"])):pe("",!0)]),h("div",Rv,[(x(!0),T(te,null,de(t.array,(d,p)=>(x(),T("div",{key:p,class:"flex flex-1 flex-col items-center justify-end",style:{height:"100%"}},[a.value?(x(),T("span",jv,R(d),1)):pe("",!0),h("div",{class:ve(["w-full rounded-t-mark transition-[height,background-color] duration-150 ease-out",r(p)]),style:cn({height:l(d)})},null,6)]))),128))]),A(Ov,{length:t.array.length},null,8,["length"])]),_:1}))}}),Iv={class:"rounded-xl bg-surface-alt p-3 text-center"},Dv={class:"nums font-mono text-xl font-bold text-ink sm:text-2xl"},Lv={class:"mt-0.5 text-[11px] font-medium uppercase tracking-wide text-ink-faint"},Dt=se({__name:"AvStatCell",props:{label:{},value:{}},setup(t){return(e,n)=>(x(),T("div",Iv,[h("div",Dv,R(t.value),1),h("div",Lv,R(t.label),1)]))}}),Sn=se({__name:"AvStatusPill",props:{status:{},label:{default:""}},setup(t){const e=t,n={idle:"bg-surface-alt text-ink-muted",running:"bg-ok-soft text-ok-ink",paused:"bg-warn-soft text-warn-ink",done:"bg-accent-soft text-accent",error:"bg-danger-soft text-danger-ink"},s={idle:"Idle",running:"Running",paused:"Paused",done:"Done",error:"Error"},o=C(()=>n[e.status]),a=C(()=>e.label||s[e.status]);return(r,i)=>(x(),T("span",{class:ve(["rounded-full px-2.5 py-1 text-xs font-semibold",o.value])},R(a.value),3))}}),Nv={class:"grid grid-cols-2 gap-2 sm:grid-cols-4"},vo=se({__name:"StatsDisplay",props:{comparisons:{},swaps:{},steps:{},elapsedMs:{},status:{}},setup(t){const e=t,n=C(()=>`${(e.elapsedMs/1e3).toFixed(2)}s`),s=C(()=>e.status==="done"?"Sorted":void 0),o=C(()=>[{label:"Comparisons",value:e.comparisons.toLocaleString()},{label:"Swaps",value:e.swaps.toLocaleString()},{label:"Steps",value:e.steps.toLocaleString()},{label:"Elapsed",value:n.value}]);return(a,r)=>(x(),Y(we,{title:"Stats"},{header:D(()=>[A(Sn,{status:t.status,label:s.value},null,8,["status","label"])]),default:D(()=>[h("div",Nv,[(x(!0),T(te,null,de(o.value,i=>(x(),Y(Dt,{key:i.label,label:i.label,value:i.value},null,8,["label","value"]))),128))])]),_:1}))}}),Pv={class:"grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]"},Bv={class:"flex flex-col gap-4"},Fv={key:0,class:"grid gap-4 lg:grid-cols-2"},Hv={class:"flex flex-col gap-4"},Vv={class:"flex flex-col gap-4"},Uv={key:1,class:"flex flex-col gap-4"},zv=se({__name:"SortingView",setup(t){const e=sl(),n=Qs(),s=sl({syncUrl:!1,audio:!1}),o=B(!1);Qt({cmp:{ref:o,encode:u=>u?"1":null,decode:u=>u==="1"},algo2:{ref:s.algoKey,encode:u=>u,decode:u=>Jt(us,u)}}),Re([e.baseArray,o],()=>{o.value&&s.setArray([...e.baseArray.value])},{immediate:!0}),Re(e.speed,u=>s.speed.value=u,{immediate:!0}),Re(o,u=>{u||s.reset()});function a(){e.run(),s.run()}const r=B(""),i=B(null);function l(){const{values:u,error:c}=Ln(r.value);i.value=c,c||e.setArray(u)}return Re(e.size,()=>{e.canEdit.value&&e.generate()}),Re(e.seed,()=>{e.canEdit.value&&e.generate()}),Re(e.algoKey,()=>{e.isDone.value&&e.reset()}),(u,c)=>(x(),T("div",Pv,[h("div",Bv,[A(Tn,{modelValue:f(e).algoKey.value,"onUpdate:modelValue":c[0]||(c[0]=d=>f(e).algoKey.value=d),algorithms:f(us),columns:3,disabled:!f(e).canEdit.value},null,8,["modelValue","algorithms","disabled"]),o.value?(x(),Y(Tn,{key:0,modelValue:f(s).algoKey.value,"onUpdate:modelValue":c[1]||(c[1]=d=>f(s).algoKey.value=d),title:"Compare against",algorithms:f(us),columns:3,disabled:!f(e).canEdit.value},null,8,["modelValue","algorithms","disabled"])):pe("",!0),A(uv,{size:f(e).size.value,"onUpdate:size":c[2]||(c[2]=d=>f(e).size.value=d),speed:f(e).speed.value,"onUpdate:speed":c[3]||(c[3]=d=>f(e).speed.value=d),compare:o.value,"onUpdate:compare":c[4]||(c[4]=d=>o.value=d),status:f(e).status.value,"can-edit":f(e).canEdit.value,"is-running":f(e).isRunning.value,"is-paused":f(e).isPaused.value,sound:f(n).enabled.value,volume:f(n).volume.value,"has-sound-cues":f(e).hasSoundCues.value,onGenerate:c[5]||(c[5]=d=>f(e).generate()),onRun:c[6]||(c[6]=d=>f(e).run()),onRunBoth:c[7]||(c[7]=d=>a()),onPause:c[8]||(c[8]=d=>{f(e).pause(),f(s).pause()}),onReset:c[9]||(c[9]=d=>{f(e).reset(),f(s).reset()}),"onUpdate:sound":c[10]||(c[10]=d=>f(n).toggle()),"onUpdate:volume":c[11]||(c[11]=d=>f(n).setVolume(d))},null,8,["size","speed","compare","status","can-edit","is-running","is-paused","sound","volume","has-sound-cues"]),A($c,{custom:r.value,"onUpdate:custom":c[12]||(c[12]=d=>r.value=d),seed:f(e).seed.value,error:i.value,"can-edit":f(e).canEdit.value,"onUpdate:seed":c[13]||(c[13]=d=>f(e).seed.value=d),onApply:c[14]||(c[14]=d=>l()),onRandomize:c[15]||(c[15]=d=>f(e).randomizeSeed())},null,8,["custom","seed","error","can-edit"]),A(xn,{cursor:f(e).cursor.value,"buffered-count":f(e).bufferedCount.value,"fully-buffered":f(e).fullyBuffered.value,"can-step-back":f(e).canStepBack.value,"can-step-forward":f(e).canStepForward.value,onSeek:c[16]||(c[16]=d=>f(e).seek(d)),onStepBack:c[17]||(c[17]=d=>f(e).stepBack()),onStepForward:c[18]||(c[18]=d=>f(e).stepForward()),onSkipToEnd:c[19]||(c[19]=d=>f(e).skipToEnd())},null,8,["cursor","buffered-count","fully-buffered","can-step-back","can-step-forward"]),A(aa,{lines:f(Vb)[f(e).algoKey.value]??[],"active-line":f(e).activeLine.value,source:f(e).sourceCode.value.text,"source-file":f(e).sourceCode.value.file,"active-source-lines":f(e).activeSourceLines.value},null,8,["lines","active-line","source","source-file","active-source-lines"])]),o.value?(x(),T("div",Fv,[h("div",Hv,[A(vo,{comparisons:f(e).stats.comparisons,swaps:f(e).stats.swaps,steps:f(e).stepCount.value,"elapsed-ms":f(e).elapsedMs.value,status:f(e).status.value},null,8,["comparisons","swaps","steps","elapsed-ms","status"]),A(bo,{class:"flex-1",title:f(e).currentAlgo.value.name,array:f(e).array.value,comparing:f(e).highlights.comparing,swapping:f(e).highlights.swapping,sorted:f(e).highlights.sorted,"max-value":f(e).maxValue.value},null,8,["title","array","comparing","swapping","sorted","max-value"])]),h("div",Vv,[A(vo,{comparisons:f(s).stats.comparisons,swaps:f(s).stats.swaps,steps:f(s).stepCount.value,"elapsed-ms":f(s).elapsedMs.value,status:f(s).status.value},null,8,["comparisons","swaps","steps","elapsed-ms","status"]),A(bo,{class:"flex-1",title:f(s).currentAlgo.value.name,"show-legend":!1,array:f(s).array.value,comparing:f(s).highlights.comparing,swapping:f(s).highlights.swapping,sorted:f(s).highlights.sorted,"max-value":f(s).maxValue.value},null,8,["title","array","comparing","swapping","sorted","max-value"])])])):(x(),T("div",Uv,[A(vo,{comparisons:f(e).stats.comparisons,swaps:f(e).stats.swaps,steps:f(e).stepCount.value,"elapsed-ms":f(e).elapsedMs.value,status:f(e).status.value},null,8,["comparisons","swaps","steps","elapsed-ms","status"]),A(bo,{class:"flex-1",array:f(e).array.value,comparing:f(e).highlights.comparing,swapping:f(e).highlights.swapping,sorted:f(e).highlights.sorted,"max-value":f(e).maxValue.value},null,8,["array","comparing","swapping","sorted","max-value"])]))]))}});function qv(){const t=B(20),e=B(60),n=B("binary"),s=B(ze()),o=B(0),a=B([]),r=Ne({low:null,high:null,mid:null,checking:null}),i=B(null),l=Ne({comparisons:0});let u=[];const c=C(()=>Qo[n.value]),d=B(1);function p(P){const K=ot(s.value);return Array.from({length:P},()=>K.int(1,99)).sort((I,N)=>I-N)}function m(){r.low=null,r.high=null,r.mid=null,r.checking=null}function y(){l.comparisons=0}function g(P=ot(ze())){u.length!==0&&(o.value=u[P.int(0,u.length-1)])}function v(){const P=new Set(u);for(let K=0;K<=100;K++)if(!P.has(K)){o.value=K;return}o.value=-1}const b=vn({speed:e,createGenerator:()=>(a.value=[...u],m(),y(),i.value=null,c.value.generator([...u],o.value)),applyStep:P=>{a.value=P.array,r.low=P.low,r.high=P.high,r.mid=P.mid,r.checking=P.checking,i.value=P.foundIndex,l.comparisons=P.comparisons},clearStep:()=>{a.value=[...u],m(),y(),i.value=null}});function w(P=!1){u=p(t.value),a.value=[...u],d.value=Math.max(...u,1),b.reset(),P||g(ot(s.value))}function S(P){P.length!==0&&(u=[...P].sort((K,I)=>K-I),a.value=[...u],t.value=u.length,d.value=Math.max(...u,1),b.reset(),g(ot(s.value)))}function $(){s.value=ze(),w()}const{hydrated:_}=Qt(Ab({algoKey:n,size:t,speed:e,seed:s,target:o}));return w(_.has("target")),{size:t,speed:e,algoKey:n,seed:s,target:o,array:a,highlights:r,foundIndex:i,stats:l,maxValue:d,currentAlgo:c,status:b.status,isRunning:b.isRunning,isPaused:b.isPaused,isDone:b.isDone,canEdit:b.canEdit,delayMs:b.delayMs,elapsedMs:b.elapsedMs,stepCount:b.stepCount,cursor:b.cursor,bufferedCount:b.bufferedCount,fullyBuffered:b.fullyBuffered,current:b.current,canStepBack:b.canStepBack,canStepForward:b.canStepForward,generate:w,randomizeSeed:$,setArray:S,pickPresentTarget:g,pickMissingTarget:v,run:b.run,pause:b.pause,reset:b.reset,stepForward:b.stepForward,stepBack:b.stepBack,seek:b.seek,skipToEnd:b.skipToEnd}}const Kv={class:"space-y-4"},Gv={class:"block"},Wv=["value","disabled"],Yv={class:"mt-3 grid grid-cols-2 gap-2"},Xv={class:"mt-5 grid grid-cols-2 gap-2"},Jv=se({__name:"SearchControls",props:{size:{},speed:{},target:{},status:{},canEdit:{type:Boolean},isRunning:{type:Boolean},isPaused:{type:Boolean}},emits:["update:size","update:speed","update:target","pick-present-target","pick-missing-target","generate","run","pause","reset"],setup(t,{emit:e}){const n=e,s=o=>n("update:target",Number(o.target.value));return(o,a)=>(x(),Y(we,{title:"Controls"},{default:D(()=>[h("div",Kv,[A(Ve,{label:"Array size","model-value":t.size,min:10,max:50,disabled:!t.canEdit,"onUpdate:modelValue":a[0]||(a[0]=r=>n("update:size",r))},null,8,["model-value","disabled"]),A(Ve,{label:"Speed","model-value":t.speed,min:1,max:100,suffix:"%","onUpdate:modelValue":a[1]||(a[1]=r=>n("update:speed",r))},null,8,["model-value"]),h("label",Gv,[a[8]||(a[8]=h("div",{class:"mb-1.5 flex items-center justify-between text-sm"},[h("span",{class:"font-medium text-ink-muted"},"Target")],-1)),h("input",{type:"number",value:t.target,disabled:!t.canEdit,class:"nums w-full rounded-xl border border-line bg-surface-raised px-3 py-2 text-sm text-ink disabled:cursor-not-allowed disabled:opacity-50",onInput:s},null,40,Wv)])]),h("div",Yv,[A(Z,{variant:"quiet",disabled:!t.canEdit,onClick:a[2]||(a[2]=r=>n("pick-present-target"))},{default:D(()=>[...a[9]||(a[9]=[M(" Random present target ",-1)])]),_:1},8,["disabled"]),A(Z,{variant:"quiet",disabled:!t.canEdit,onClick:a[3]||(a[3]=r=>n("pick-missing-target"))},{default:D(()=>[...a[10]||(a[10]=[M(" Random missing target ",-1)])]),_:1},8,["disabled"])]),h("div",Xv,[t.isRunning?(x(),Y(Z,{key:1,variant:"warning",class:"col-span-2",onClick:a[5]||(a[5]=r=>n("pause"))},{default:D(()=>[...a[12]||(a[12]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M6 4h4v16H6zM14 4h4v16h-4z"})],-1),M(" Pause ",-1)])]),_:1})):(x(),Y(Z,{key:0,variant:"primary",class:"col-span-2",onClick:a[4]||(a[4]=r=>n("run"))},{default:D(()=>[a[11]||(a[11]=h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M8 5v14l11-7z"})],-1)),M(" "+R(t.isPaused?"Resume":"Run"),1)]),_:1})),A(Z,{variant:"neutral",onClick:a[6]||(a[6]=r=>n("reset"))},{default:D(()=>[...a[13]||(a[13]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.36 2.64L3 8"}),h("path",{d:"M3 3v5h5"})],-1),M(" Reset ",-1)])]),_:1}),A(Z,{variant:"neutral",disabled:!t.canEdit,onClick:a[7]||(a[7]=r=>n("generate"))},{default:D(()=>[...a[14]||(a[14]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"})],-1),M(" Shuffle ",-1)])]),_:1},8,["disabled"])]),a[15]||(a[15]=h("p",{class:"mt-3 text-center text-xs text-ink-faint"}," Size, algorithm & target lock while a search is running. ",-1))]),_:1}))}}),Qv={class:"mb-3 flex flex-wrap items-center gap-x-4 gap-y-2"},Zv={class:"flex min-h-[280px] flex-1 items-end gap-[2px] rounded-xl bg-surface-alt p-3 sm:gap-1"},ey={key:0,class:"mb-1 text-[10px] font-medium text-ink-faint sm:text-xs"},ty=se({__name:"SearchBarChart",props:{array:{},low:{default:null},high:{default:null},checking:{default:null},foundIndex:{default:null},maxValue:{default:1}},setup(t){const e=t,n=C(()=>e.array.length<=25),s=C(()=>e.low!==null&&e.high!==null&&!(e.low===0&&e.high===e.array.length-1)),o=kn([{tone:"idle",label:"Default"},{tone:"trace",label:"Active range"},{tone:"probe",label:"Checking"},{tone:"settled",label:"Found"}]);function a(i){return e.foundIndex!==null&&i===e.foundIndex?at.settled:e.checking!==null&&i===e.checking?at.probe:s.value&&i>=e.low&&i<=e.high?at.trace:at.idle}function r(i){return`${i/e.maxValue*98+2}%`}return(i,l)=>(x(),Y(we,{class:"flex h-full flex-col"},{default:D(()=>[h("div",Qv,[l[0]||(l[0]=h("h2",{class:"text-xs font-semibold uppercase tracking-wider text-ink-faint"},"Visualization",-1)),A(_n,{items:f(o)},null,8,["items"])]),h("div",Zv,[(x(!0),T(te,null,de(t.array,(u,c)=>(x(),T("div",{key:c,class:"flex flex-1 flex-col items-center justify-end",style:{height:"100%"}},[n.value?(x(),T("span",ey,R(u),1)):pe("",!0),h("div",{class:ve(["w-full rounded-t-mark transition-[height,background-color] duration-150 ease-out",a(c)]),style:cn({height:r(u)})},null,6)]))),128))])]),_:1}))}}),ny={class:"grid grid-cols-3 gap-2"},sy=se({__name:"SearchStats",props:{comparisons:{},steps:{},elapsedMs:{},status:{},foundIndex:{default:null}},setup(t){const e=t,n=C(()=>`${(e.elapsedMs/1e3).toFixed(2)}s`),s=C(()=>[{label:"Comparisons",value:e.comparisons.toLocaleString()},{label:"Steps",value:e.steps.toLocaleString()},{label:"Elapsed",value:n.value}]),o=C(()=>e.status==="done"),a=C(()=>e.foundIndex!==null);return(r,i)=>(x(),Y(we,{title:"Stats"},{header:D(()=>[A(Sn,{status:t.status},null,8,["status"])]),default:D(()=>[o.value?(x(),T("div",{key:0,class:ve(["mb-3 rounded-xl p-3 text-center text-sm font-semibold",a.value?"bg-ok-soft text-ok-ink":"bg-warn-soft text-warn-ink"])},R(a.value?`Found at index ${t.foundIndex}`:"Not found"),3)):pe("",!0),h("div",ny,[(x(!0),T(te,null,de(s.value,l=>(x(),Y(Dt,{key:l.label,label:l.label,value:l.value},null,8,["label","value"]))),128))])]),_:1}))}}),oy={class:"grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]"},ay={class:"flex flex-col gap-4"},ry={class:"flex flex-col gap-4"},iy=se({__name:"SearchView",setup(t){const e=qv(),n=B(""),s=B(null);function o(){const{values:a,error:r}=Ln(n.value);s.value=r,r||e.setArray(a)}return Re(e.size,()=>{e.canEdit.value&&e.generate()}),Re(e.seed,()=>{e.canEdit.value&&e.generate()}),Re(e.algoKey,()=>{e.isDone.value&&e.reset()}),(a,r)=>(x(),T("div",oy,[h("div",ay,[A(Tn,{modelValue:f(e).algoKey.value,"onUpdate:modelValue":r[0]||(r[0]=i=>f(e).algoKey.value=i),algorithms:f(Qo),columns:3,disabled:!f(e).canEdit.value},null,8,["modelValue","algorithms","disabled"]),A(Jv,{size:f(e).size.value,"onUpdate:size":r[1]||(r[1]=i=>f(e).size.value=i),speed:f(e).speed.value,"onUpdate:speed":r[2]||(r[2]=i=>f(e).speed.value=i),target:f(e).target.value,"onUpdate:target":r[3]||(r[3]=i=>f(e).target.value=i),status:f(e).status.value,"can-edit":f(e).canEdit.value,"is-running":f(e).isRunning.value,"is-paused":f(e).isPaused.value,onPickPresentTarget:r[4]||(r[4]=i=>f(e).pickPresentTarget()),onPickMissingTarget:r[5]||(r[5]=i=>f(e).pickMissingTarget()),onGenerate:r[6]||(r[6]=i=>f(e).generate()),onRun:r[7]||(r[7]=i=>f(e).run()),onPause:r[8]||(r[8]=i=>f(e).pause()),onReset:r[9]||(r[9]=i=>f(e).reset())},null,8,["size","speed","target","status","can-edit","is-running","is-paused"]),A($c,{custom:n.value,"onUpdate:custom":r[10]||(r[10]=i=>n.value=i),seed:f(e).seed.value,error:s.value,"can-edit":f(e).canEdit.value,"onUpdate:seed":r[11]||(r[11]=i=>f(e).seed.value=i),onApply:r[12]||(r[12]=i=>o()),onRandomize:r[13]||(r[13]=i=>f(e).randomizeSeed())},null,8,["custom","seed","error","can-edit"]),A(xn,{cursor:f(e).cursor.value,"buffered-count":f(e).bufferedCount.value,"fully-buffered":f(e).fullyBuffered.value,"can-step-back":f(e).canStepBack.value,"can-step-forward":f(e).canStepForward.value,onSeek:r[14]||(r[14]=i=>f(e).seek(i)),onStepBack:r[15]||(r[15]=i=>f(e).stepBack()),onStepForward:r[16]||(r[16]=i=>f(e).stepForward()),onSkipToEnd:r[17]||(r[17]=i=>f(e).skipToEnd())},null,8,["cursor","buffered-count","fully-buffered","can-step-back","can-step-forward"])]),h("div",ry,[A(sy,{comparisons:f(e).stats.comparisons,steps:f(e).stepCount.value,"elapsed-ms":f(e).elapsedMs.value,status:f(e).status.value,"found-index":f(e).foundIndex.value},null,8,["comparisons","steps","elapsed-ms","status","found-index"]),A(ty,{class:"flex-1",array:f(e).array.value,low:f(e).highlights.low,high:f(e).highlights.high,checking:f(e).highlights.checking,"found-index":f(e).foundIndex.value,"max-value":f(e).maxValue.value},null,8,["array","low","high","checking","found-index","max-value"])])]))}}),Jn=15,$s=25,po=(t,e)=>`${t},${e}`;function ly(){const t=B(60),e=B("bfs"),n=Ne(new Set),s=Ne({row:Math.floor(Jn/2),col:0}),o=Ne({row:Math.floor(Jn/2),col:$s-1}),a=B(ze());Qt(Tb({algoKey:e,speed:t,seed:a,start:Ji(s),end:Ji(o)},{rows:Jn,cols:$s}));const r=B([]),i=B([]),l=B([]),u=Ne({visitedCount:0,pathLength:0}),c=C(()=>Zo[e.value]);function d(P,K){return s.row===P&&s.col===K}function p(P,K){return o.row===P&&o.col===K}function m(){const P=Array.from({length:Jn},()=>Array($s).fill(0));for(const K of n){const[I,N]=K.split(",").map(Number);P[I][N]=1}return P}function y(){r.value=[],i.value=[],l.value=[]}function g(){u.visitedCount=0,u.pathLength=0}const v=vn({speed:t,createGenerator:()=>(y(),g(),c.value.generator(m(),{...s},{...o})),applyStep:P=>{r.value=P.visited,i.value=P.frontier,l.value=P.path,u.visitedCount=P.visited.length,u.pathLength=P.path.length},clearStep:()=>{y(),g()}});function b(P,K){if(!v.canEdit.value||d(P,K)||p(P,K))return;const I=po(P,K);n.has(I)?n.delete(I):n.add(I),v.isDone.value&&v.reset()}function w(){v.canEdit.value&&(n.clear(),v.reset())}function S(P,K){v.canEdit.value&&(p(P,K)||n.has(po(P,K))||(s.row=P,s.col=K,v.reset()))}function $(P,K){v.canEdit.value&&(d(P,K)||n.has(po(P,K))||(o.row=P,o.col=K,v.reset()))}function _(P=.25){if(!v.canEdit.value)return;const K=ot(a.value);n.clear();for(let I=0;I<Jn;I++)for(let N=0;N<$s;N++)d(I,N)||p(I,N)||K.next()<P&&n.add(po(I,N));v.reset()}return{rows:Jn,cols:$s,speed:t,algoKey:e,walls:n,start:s,end:o,seed:a,visited:r,frontier:i,path:l,stats:u,currentAlgo:c,status:v.status,isRunning:v.isRunning,isPaused:v.isPaused,isDone:v.isDone,canEdit:v.canEdit,delayMs:v.delayMs,elapsedMs:v.elapsedMs,stepCount:v.stepCount,cursor:v.cursor,bufferedCount:v.bufferedCount,fullyBuffered:v.fullyBuffered,current:v.current,canStepBack:v.canStepBack,canStepForward:v.canStepForward,toggleWall:b,clearWalls:w,placeStart:S,placeEnd:$,randomizeWalls:_,run:v.run,pause:v.pause,reset:v.reset,stepForward:v.stepForward,stepBack:v.stepBack,seek:v.seek,skipToEnd:v.skipToEnd}}const uy={class:"mt-5 grid grid-cols-2 gap-2"},cy=se({__name:"PathfindingControls",props:{speed:{},status:{},canEdit:{type:Boolean},isRunning:{type:Boolean},isPaused:{type:Boolean}},emits:["update:speed","run","pause","reset","clear-walls","randomize-walls"],setup(t,{emit:e}){const n=e;return(s,o)=>(x(),Y(we,{title:"Controls"},{default:D(()=>[A(Ve,{label:"Speed","model-value":t.speed,min:1,max:100,suffix:"%","onUpdate:modelValue":o[0]||(o[0]=a=>n("update:speed",a))},null,8,["model-value"]),h("div",uy,[t.isRunning?(x(),Y(Z,{key:1,variant:"warning",class:"col-span-2",onClick:o[2]||(o[2]=a=>n("pause"))},{default:D(()=>[...o[7]||(o[7]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M6 4h4v16H6zM14 4h4v16h-4z"})],-1),M(" Pause ",-1)])]),_:1})):(x(),Y(Z,{key:0,variant:"primary",class:"col-span-2",onClick:o[1]||(o[1]=a=>n("run"))},{default:D(()=>[o[6]||(o[6]=h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M8 5v14l11-7z"})],-1)),M(" "+R(t.isPaused?"Resume":"Run"),1)]),_:1})),A(Z,{variant:"neutral",onClick:o[3]||(o[3]=a=>n("reset"))},{default:D(()=>[...o[8]||(o[8]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.36 2.64L3 8"}),h("path",{d:"M3 3v5h5"})],-1),M(" Reset ",-1)])]),_:1}),A(Z,{variant:"neutral",disabled:!t.canEdit,onClick:o[4]||(o[4]=a=>n("clear-walls"))},{default:D(()=>[...o[9]||(o[9]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m2 0-1 14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1L5 6"})],-1),M(" Clear Walls ",-1)])]),_:1},8,["disabled"]),A(Z,{variant:"neutral",disabled:!t.canEdit,class:"col-span-2",onClick:o[5]||(o[5]=a=>n("randomize-walls"))},{default:D(()=>[...o[10]||(o[10]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"})],-1),M(" Random Walls ",-1)])]),_:1},8,["disabled"])]),o[11]||(o[11]=h("p",{class:"mt-3 text-center text-xs text-ink-faint"}," Walls, start, and end lock while a search is running. ",-1))]),_:1}))}}),dy={class:"mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2"},py={class:"mb-3 grid grid-cols-3 gap-2"},fy=["aria-label"],hy=["data-key","tabindex","aria-label","onPointerdown","onPointerenter","onKeydown"],my={key:0,class:"flex h-[70%] w-[70%] items-center justify-center rounded-full bg-ok text-[8px] font-bold text-ink-inverse shadow"},gy={key:1,class:"flex h-[70%] w-[70%] items-center justify-center rounded-full bg-danger text-[8px] font-bold text-ink-inverse shadow"},by=se({__name:"GridCanvas",props:{rows:{},cols:{},walls:{},start:{},end:{},visited:{default:()=>[]},frontier:{default:()=>[]},path:{default:()=>[]},canEdit:{type:Boolean}},emits:["toggle-wall","place-start","place-end"],setup(t,{emit:e}){const n=t,s=e,o=(L,J)=>`${L},${J}`,a=B("wall"),r={wall:"Draw Walls",start:"Move Start",end:"Move End"},i=Object.entries(r),l=C(()=>new Set(n.visited.map(L=>o(L.row,L.col)))),u=C(()=>new Set(n.frontier.map(L=>o(L.row,L.col)))),c=C(()=>new Set(n.path.map(L=>o(L.row,L.col)))),d=C(()=>{const L=[];for(let J=0;J<n.rows;J++){const le=[];for(let G=0;G<n.cols;G++)le.push({row:J,col:G,key:o(J,G)});L.push(le)}return L});function p(L,J){return n.start.row===L&&n.start.col===J}function m(L,J){return n.end.row===L&&n.end.col===J}const y=kn([{tone:"blocked",label:"Wall"},{tone:"probe",label:"Frontier"},{tone:"settled",label:"Visited"},{tone:"trace",label:"Path"}]);function g(L){const J=L.key;return n.walls.has(J)?at.blocked:c.value.has(J)?at.trace:u.value.has(J)?at.probe:l.value.has(J)?at.settled:"bg-surface-alt"}function v(L){return p(L.row,L.col)?"start":m(L.row,L.col)?"end":n.walls.has(L.key)?"wall":c.value.has(L.key)?"path":u.value.has(L.key)?"frontier":l.value.has(L.key)?"visited":"empty"}function b(L){return`Row ${L.row+1}, column ${L.col+1}, ${v(L)}`}const w=C(()=>`Pathfinding grid, ${r[a.value]} mode`),S=B(!1);let $=!0;function _(){S.value=!1}xr(()=>{window.addEventListener("pointerup",_),window.addEventListener("pointercancel",_)}),kr(()=>{window.removeEventListener("pointerup",_),window.removeEventListener("pointercancel",_)});const P=B({row:0,col:0}),K=B(null),I=(L,J)=>Math.min(Math.max(L,0),J-1);function N(L,J){var le,G;P.value={row:L,col:J},(G=(le=K.value)==null?void 0:le.querySelector(`[data-key="${L},${J}"]`))==null||G.focus()}function j(L,J,le){N(I(L.row+J,n.rows),I(L.col+le,n.cols))}function he(L){if(n.canEdit){if(P.value={row:L.row,col:L.col},a.value==="start"){s("place-start",{row:L.row,col:L.col});return}if(a.value==="end"){s("place-end",{row:L.row,col:L.col});return}p(L.row,L.col)||m(L.row,L.col)||($=!n.walls.has(L.key),s("toggle-wall",{row:L.row,col:L.col}),S.value=!0)}}function Se(L,J){var le,G;(G=(le=L.currentTarget).releasePointerCapture)==null||G.call(le,L.pointerId),he(J)}function z(L){he(L),S.value=!1}function ae(L){if(!n.canEdit||a.value!=="wall"||!S.value||p(L.row,L.col)||m(L.row,L.col))return;n.walls.has(L.key)!==$&&s("toggle-wall",{row:L.row,col:L.col})}return(L,J)=>(x(),Y(we,{class:"flex h-full flex-col"},{default:D(()=>[h("div",dy,[J[1]||(J[1]=h("h2",{class:"text-xs font-semibold uppercase tracking-wider text-ink-faint"},"Grid",-1)),A(_n,{items:f(y)},null,8,["items"])]),h("div",py,[(x(!0),T(te,null,de(f(i),([le,G])=>(x(),Y(Z,{key:le,variant:"toggle",active:a.value===le,disabled:!t.canEdit,onClick:re=>a.value=le},{default:D(()=>[M(R(G),1)]),_:2},1032,["active","disabled","onClick"]))),128))]),h("div",{ref_key:"gridEl",ref:K,role:"grid","aria-label":w.value,"aria-describedby":"grid-help",class:ve(["grid flex-1 select-none gap-px rounded-xl bg-line p-1",t.canEdit?"touch-none":""]),style:cn({gridTemplateColumns:`repeat(${t.cols}, minmax(0, 1fr))`,gridTemplateRows:`repeat(${t.rows}, minmax(0, 1fr))`,aspectRatio:`${t.cols} / ${t.rows}`}),onDragstart:J[0]||(J[0]=tn(()=>{},["prevent"]))},[(x(!0),T(te,null,de(d.value,(le,G)=>(x(),T("div",{key:G,role:"row",class:"contents"},[(x(!0),T(te,null,de(le,re=>(x(),T("div",{key:re.key,role:"gridcell","data-key":re.key,tabindex:P.value.row===re.row&&P.value.col===re.col?0:-1,"aria-label":b(re),class:ve(["relative flex items-center justify-center rounded-mark transition-colors duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent",[g(re),t.canEdit?"cursor-pointer":"cursor-default"]]),onPointerdown:tn($e=>Se($e,re),["prevent"]),onPointerenter:$e=>ae(re),onKeydown:[Rt(tn($e=>j(re,-1,0),["prevent"]),["up"]),Rt(tn($e=>j(re,1,0),["prevent"]),["down"]),Rt(tn($e=>j(re,0,-1),["prevent"]),["left"]),Rt(tn($e=>j(re,0,1),["prevent"]),["right"]),Rt(tn($e=>N(re.row,0),["prevent"]),["home"]),Rt(tn($e=>N(re.row,t.cols-1),["prevent"]),["end"]),Rt(tn($e=>z(re),["prevent"]),["space"]),Rt($e=>z(re),["enter"])]},[p(re.row,re.col)?(x(),T("span",my,"S")):m(re.row,re.col)?(x(),T("span",gy,"E")):pe("",!0)],42,hy))),128))]))),128))],46,fy),J[2]||(J[2]=h("p",{id:"grid-help",class:"mt-3 text-center text-xs text-ink-faint"}," Drag or press Space to draw walls. Arrow keys move, Enter places. Switch mode to relocate start/end. ",-1))]),_:1}))}}),vy={class:"grid grid-cols-3 gap-2"},yy={key:0,class:"mt-3 rounded-xl bg-ok-soft px-3 py-2 text-center text-sm font-semibold text-ok-ink"},wy={key:1,class:"mt-3 rounded-xl bg-warn-soft px-3 py-2 text-center text-sm font-semibold text-warn-ink"},xy=se({__name:"PathfindingStats",props:{visitedCount:{},pathLength:{},elapsedMs:{},status:{}},setup(t){const e=t,n=C(()=>`${(e.elapsedMs/1e3).toFixed(2)}s`),s=C(()=>e.status==="done"?"Finished":void 0),o=C(()=>[{label:"Visited",value:e.visitedCount.toLocaleString()},{label:"Path Length",value:e.pathLength.toLocaleString()},{label:"Elapsed",value:n.value}]),a=C(()=>e.status==="done"&&e.pathLength>0),r=C(()=>e.status==="done"&&e.pathLength===0),i=C(()=>Math.max(e.pathLength-1,0));return(l,u)=>(x(),Y(we,{title:"Stats"},{header:D(()=>[A(Sn,{status:t.status,label:s.value},null,8,["status","label"])]),default:D(()=>[h("div",vy,[(x(!0),T(te,null,de(o.value,c=>(x(),Y(Dt,{key:c.label,label:c.label,value:c.value},null,8,["label","value"]))),128))]),a.value?(x(),T("div",yy," Path found ("+R(i.value)+" steps) ",1)):r.value?(x(),T("div",wy," No path exists ")):pe("",!0)]),_:1}))}}),ky={class:"grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]"},Sy={class:"flex flex-col gap-4"},$y={class:"flex flex-col gap-4"},Ey=se({__name:"PathfindingView",setup(t){const e=ly();return Re(e.algoKey,()=>{e.isDone.value&&e.reset()}),(n,s)=>(x(),T("div",ky,[h("div",Sy,[A(Tn,{modelValue:f(e).algoKey.value,"onUpdate:modelValue":s[0]||(s[0]=o=>f(e).algoKey.value=o),algorithms:f(Zo),columns:3,disabled:!f(e).canEdit.value},null,8,["modelValue","algorithms","disabled"]),A(cy,{speed:f(e).speed.value,"onUpdate:speed":s[1]||(s[1]=o=>f(e).speed.value=o),status:f(e).status.value,"can-edit":f(e).canEdit.value,"is-running":f(e).isRunning.value,"is-paused":f(e).isPaused.value,onRun:s[2]||(s[2]=o=>f(e).run()),onPause:s[3]||(s[3]=o=>f(e).pause()),onReset:s[4]||(s[4]=o=>f(e).reset()),onClearWalls:s[5]||(s[5]=o=>f(e).clearWalls()),onRandomizeWalls:s[6]||(s[6]=o=>f(e).randomizeWalls())},null,8,["speed","status","can-edit","is-running","is-paused"]),A(xn,{cursor:f(e).cursor.value,"buffered-count":f(e).bufferedCount.value,"fully-buffered":f(e).fullyBuffered.value,"can-step-back":f(e).canStepBack.value,"can-step-forward":f(e).canStepForward.value,onSeek:s[7]||(s[7]=o=>f(e).seek(o)),onStepBack:s[8]||(s[8]=o=>f(e).stepBack()),onStepForward:s[9]||(s[9]=o=>f(e).stepForward()),onSkipToEnd:s[10]||(s[10]=o=>f(e).skipToEnd())},null,8,["cursor","buffered-count","fully-buffered","can-step-back","can-step-forward"])]),h("div",$y,[A(xy,{"visited-count":f(e).stats.visitedCount,"path-length":f(e).stats.pathLength,"elapsed-ms":f(e).elapsedMs.value,status:f(e).status.value},null,8,["visited-count","path-length","elapsed-ms","status"]),A(by,{class:"flex-1",rows:f(e).rows,cols:f(e).cols,walls:f(e).walls,start:f(e).start,end:f(e).end,visited:f(e).visited.value,frontier:f(e).frontier.value,path:f(e).path.value,"can-edit":f(e).canEdit.value,onToggleWall:s[11]||(s[11]=o=>f(e).toggleWall(o.row,o.col)),onPlaceStart:s[12]||(s[12]=o=>f(e).placeStart(o.row,o.col)),onPlaceEnd:s[13]||(s[13]=o=>f(e).placeEnd(o.row,o.col))},null,8,["rows","cols","walls","start","end","visited","frontier","path","can-edit"])])]))}});let Cy=1;function Oa(t){return{id:Cy++,value:t,left:null,right:null}}function St(t){return t?{id:t.id,value:t.value,left:St(t.left),right:St(t.right)}:null}function*ol(t,e){const n=St(t);if(!n){const o=Oa(e);yield{tree:St(o),visiting:o.id,phase:"inserted",done:!0};return}let s=n;for(;;)if(yield{tree:St(n),visiting:s.id,phase:"searching",done:!1},e<s.value){if(!s.left){s.left=Oa(e),yield{tree:St(n),visiting:s.left.id,phase:"inserted",done:!0};return}s=s.left}else{if(!s.right){s.right=Oa(e),yield{tree:St(n),visiting:s.right.id,phase:"inserted",done:!0};return}s=s.right}}function*Ay(t,e){const n=St(t);let s=n,o=null;for(;s&&s.value!==e;)yield{tree:St(n),visiting:s.id,phase:"searching",done:!1},o=s,s=e<s.value?s.left:s.right;if(!s){yield{tree:St(n),visiting:null,phase:"not-found",done:!0};return}yield{tree:St(n),visiting:s.id,phase:"removing",done:!1};const a=s.id;if(s.left&&s.right){let r=s,i=s.right;for(;i.left;)r=i,i=i.left;s.value=i.value,r.left===i?r.left=i.right:r.right=i.right}else{const r=s.left||s.right;if(!o){yield{tree:r?St(r):null,visiting:null,phase:"deleted",done:!0};return}o.left===s?o.left=r:o.right=r}yield{tree:St(n),visiting:a,phase:"deleted",done:!0}}function Ty(){const t=B(null),e=B("idle"),n=B(60),s=Ne({comparisons:0,steps:0}),o=B(null),a=B(null),r=B(ze());let i=null;const l=_r(n),u=C(()=>e.value!=="running");function c(){i!==null&&(clearTimeout(i),i=null)}function d(){s.comparisons=0,s.steps=0}function p(w){t.value=w.tree,o.value=w.visiting??null,a.value=w.phase,w.phase==="searching"&&(s.comparisons+=1),s.steps+=1}function m(w,S){d(),e.value="running";function $(){const{value:_,done:P}=w.next();if(P||!_){e.value="done";return}if(p(_),_.done){e.value="done";return}i=setTimeout($,l.value)}$()}function y(w){u.value&&(typeof w!="number"||!Number.isFinite(w)||m(ol(t.value,w)))}function g(w){u.value&&(typeof w!="number"||!Number.isFinite(w)||m(Ay(t.value,w)))}function v(){c(),t.value=null,o.value=null,a.value=null,d(),e.value="idle"}function b(w){if(!u.value)return;c();const S=Math.min(Math.max(0,Math.floor(w)),200),$=new Set;let _=t.value,P=0;const K=ot(r.value);for(;$.size<S&&P<S*50+100;){P+=1;const I=K.int(1,999);if($.has(I))continue;$.add(I);let N;for(const j of ol(_,I))N=j;_=N.tree}t.value=_,o.value=null,a.value=null,d(),e.value="idle"}return Vo(c),{tree:t,status:e,speed:n,stats:s,visiting:o,phase:a,seedValue:r,canEdit:u,insert:y,remove:g,reset:v,seed:b}}const Oy={class:"block"},My=["disabled"],_y={class:"mt-3 grid grid-cols-2 gap-2"},Ry={class:"mt-4 grid grid-cols-2 gap-2"},jy=se({__name:"BstControls",props:{canEdit:{type:Boolean},speed:{}},emits:["insert","remove","seed","reset","update:speed"],setup(t,{emit:e}){const n=t,s=e,o=B(""),a=C(()=>String(o.value).trim()===""?!1:Number.isFinite(Number(o.value)));function r(){!a.value||!n.canEdit||(s("insert",Number(o.value)),o.value="")}function i(){!a.value||!n.canEdit||(s("remove",Number(o.value)),o.value="")}return(l,u)=>(x(),Y(we,{title:"BST Controls"},{default:D(()=>[h("label",Oy,[u[4]||(u[4]=h("span",{class:"mb-1.5 block text-sm font-medium text-ink-muted"},"Value",-1)),_s(h("input",{"onUpdate:modelValue":u[0]||(u[0]=c=>o.value=c),type:"number",placeholder:"e.g. 42",disabled:!t.canEdit,class:"w-full rounded-xl border border-line bg-surface-raised px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent disabled:cursor-not-allowed disabled:opacity-50",onKeyup:Rt(r,["enter"])},null,40,My),[[Mo,o.value]])]),h("div",_y,[A(Z,{variant:"primary",disabled:!t.canEdit||!a.value,onClick:r},{default:D(()=>[...u[5]||(u[5]=[M(" Insert ",-1)])]),_:1},8,["disabled"]),A(Z,{variant:"danger",disabled:!t.canEdit||!a.value,onClick:i},{default:D(()=>[...u[6]||(u[6]=[M(" Delete ",-1)])]),_:1},8,["disabled"])]),A(Ve,{label:"Speed",class:"mt-4","model-value":t.speed,min:1,max:100,suffix:"%","onUpdate:modelValue":u[1]||(u[1]=c=>s("update:speed",c))},null,8,["model-value"]),h("div",Ry,[A(Z,{variant:"neutral",disabled:!t.canEdit,onClick:u[2]||(u[2]=c=>s("seed",10))},{default:D(()=>[...u[7]||(u[7]=[M(" Seed random tree ",-1)])]),_:1},8,["disabled"]),A(Z,{variant:"neutral",disabled:!t.canEdit,onClick:u[3]||(u[3]=c=>s("reset"))},{default:D(()=>[...u[8]||(u[8]=[M(" Reset ",-1)])]),_:1},8,["disabled"])]),u[9]||(u[9]=h("p",{class:"mt-3 text-center text-xs text-ink-faint"}," Controls lock while an insert/delete animation is playing. ",-1))]),_:1}))}}),Iy=["viewBox"],Dy=["x1","y1","x2","y2"],Ly=["cx","cy"],Ny=["x","y"],Ec=se({__name:"TreeDiagram",props:{nodes:{},edges:{},viewBoxWidth:{default:600},viewBoxHeight:{default:320}},setup(t){const e=t,n={default:{fill:ht.idle,stroke:vt.idle},visiting:{fill:ht.probe,stroke:vt.probe},removing:{fill:ht.active,stroke:vt.active},inserted:{fill:ht.settled,stroke:vt.settled}};function s(a){return n[a??"default"]??n.default}function o(a){return e.nodes.find(r=>r.id===a)}return(a,r)=>(x(),T("svg",{viewBox:`0 0 ${t.viewBoxWidth} ${t.viewBoxHeight}`,class:"h-full w-full",preserveAspectRatio:"xMidYMin meet"},[(x(!0),T(te,null,de(t.edges,(i,l)=>{var u,c,d,p;return x(),T("line",{key:`edge-${l}`,x1:(u=o(i.from))==null?void 0:u.x,y1:(c=o(i.from))==null?void 0:c.y,x2:(d=o(i.to))==null?void 0:d.x,y2:(p=o(i.to))==null?void 0:p.y,class:"stroke-line","stroke-width":"2"},null,8,Dy)}),128)),(x(!0),T(te,null,de(t.nodes,i=>(x(),T("g",{key:i.id},[h("circle",{cx:i.x,cy:i.y,r:"18","stroke-width":"2",class:ve(["transition-all duration-300",[s(i.state).fill,s(i.state).stroke]])},null,10,Ly),h("text",{x:i.x,y:i.y,"text-anchor":"middle","dominant-baseline":"central",class:"select-none fill-ink-inverse text-xs font-semibold"},R(i.value),9,Ny)]))),128))],8,Iy))}}),Py={class:"grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]"},By={class:"flex flex-col gap-4"},Fy={class:"flex flex-col gap-4"},Hy={class:"grid grid-cols-2 gap-2"},Vy={key:0,class:"text-sm text-ink-faint"},al=50,rl=60,il=40,ll=40,Uy=se({__name:"BstView",setup(t){const e=Ty();function n(c){const d=[],p=[];let m=0;function y(g,v){if(!g)return;y(g.left,v+1);const b=il+m*al,w=ll+v*rl;m+=1,d.push({id:g.id,x:b,y:w,value:g.value,node:g,depth:v}),y(g.right,v+1),g.left&&p.push({from:g.id,to:g.left.id}),g.right&&p.push({from:g.id,to:g.right.id})}return y(c,0),{nodes:d,edges:p,slotCount:m}}const s=C(()=>n(e.tree.value)),o=C(()=>s.value.nodes.map(c=>({id:c.id,x:c.x,y:c.y,value:c.value,state:c.id===e.visiting.value?a(e.phase.value):"default"})));function a(c){return c==="searching"?"visiting":c==="removing"?"removing":c==="inserted"||c==="deleted"?"inserted":"default"}const r=C(()=>s.value.edges),i=C(()=>Math.max(320,il*2+s.value.slotCount*al)),l=C(()=>{const c=s.value.nodes.reduce((d,p)=>Math.max(d,p.depth),0);return Math.max(200,ll*2+c*rl)}),u=C(()=>e.tree.value===null);return(c,d)=>(x(),T("div",Py,[h("div",By,[A(jy,{"can-edit":f(e).canEdit.value,speed:f(e).speed.value,onInsert:d[0]||(d[0]=p=>f(e).insert(p)),onRemove:d[1]||(d[1]=p=>f(e).remove(p)),onSeed:d[2]||(d[2]=p=>f(e).seed(p)),onReset:d[3]||(d[3]=p=>f(e).reset()),"onUpdate:speed":d[4]||(d[4]=p=>f(e).speed.value=p)},null,8,["can-edit","speed"])]),h("div",Fy,[A(we,{title:"Stats"},{header:D(()=>[A(Sn,{status:f(e).status.value},null,8,["status"])]),default:D(()=>[h("div",Hy,[A(Dt,{label:"Comparisons",value:String(f(e).stats.comparisons)},null,8,["value"]),A(Dt,{label:"Steps",value:String(f(e).stats.steps)},null,8,["value"])])]),_:1}),A(we,{class:"flex min-h-[320px] flex-1 items-center justify-center"},{default:D(()=>[u.value?(x(),T("p",Vy," The tree is empty — insert a value to get started. ")):(x(),Y(Ec,{key:1,nodes:o.value,edges:r.value,"view-box-width":i.value,"view-box-height":l.value,class:"max-h-[60vh]"},null,8,["nodes","edges","view-box-width","view-box-height"]))]),_:1})])]))}});function ir(t,e,n){return n?t<e:t>e}function*ul(t,e,n){const s=[...t,e];let o=s.length-1;for(;o>0;){const a=o-1>>1;if(yield{heap:[...s],comparing:[o,a],swapping:[],done:!1},ir(s[o],s[a],n))[s[o],s[a]]=[s[a],s[o]],yield{heap:[...s],comparing:[],swapping:[o,a],done:!1},o=a;else break}yield{heap:[...s],comparing:[],swapping:[],done:!0}}function*zy(t,e){if(t.length===0){yield{heap:[],comparing:[],swapping:[],done:!0,extracted:null};return}const n=[...t],s=n[0],o=n.pop();if(n.length===0){yield{heap:[],comparing:[],swapping:[],done:!0,extracted:s};return}n[0]=o;let a=0;const r=n.length;for(;;){const i=2*a+1,l=2*a+2;let u=a;if(i<r&&(yield{heap:[...n],comparing:[u,i],swapping:[],done:!1},ir(n[i],n[u],e)&&(u=i)),l<r&&(yield{heap:[...n],comparing:[u,l],swapping:[],done:!1},ir(n[l],n[u],e)&&(u=l)),u===a)break;[n[a],n[u]]=[n[u],n[a]],yield{heap:[...n],comparing:[],swapping:[a,u],done:!1},a=u}yield{heap:[...n],comparing:[],swapping:[],done:!0,extracted:s}}function qy(){const t=B([]),e=B(!0),n=B("idle"),s=B(60),o=Ne({comparing:[],swapping:[]}),a=Ne({comparisons:0,swaps:0,steps:0}),r=B(null),i=B(ze());let l=null;const u=_r(s),c=C(()=>n.value!=="running");function d(){l!==null&&(clearTimeout(l),l=null)}function p(){a.comparisons=0,a.swaps=0,a.steps=0}function m(){o.comparing=[],o.swapping=[]}function y(_){t.value=_.heap,o.comparing=_.comparing,o.swapping=_.swapping,_.comparing.length>0&&(a.comparisons+=1),_.swapping.length>0&&(a.swaps+=1),a.steps+=1}function g(_,P){p(),m(),n.value="running";function K(){const{value:I,done:N}=_.next();if(N||!I){n.value="done";return}if(y(I),I.done){"extracted"in I&&(r.value=I.extracted),m(),n.value="done";return}l=setTimeout(K,u.value)}K()}function v(_){c.value&&(typeof _!="number"||!Number.isFinite(_)||g(ul(t.value,_,e.value)))}function b(){c.value&&g(zy(t.value,e.value))}function w(){c.value&&(e.value=!e.value)}function S(){d(),t.value=[],r.value=null,m(),p(),n.value="idle"}function $(_){if(!c.value)return;d();const P=Math.min(Math.max(0,Math.floor(_)),200),K=ot(i.value);let I=t.value;for(let N=0;N<P;N++){const j=K.int(1,99);let he;for(const Se of ul(I,j,e.value))he=Se;I=he.heap}t.value=I,m(),p(),n.value="idle"}return Vo(d),{heap:t,isMinHeap:e,status:n,speed:s,highlights:o,stats:a,lastExtracted:r,seedValue:i,canEdit:c,insert:v,extractRoot:b,toggleMode:w,reset:S,seed:$}}const Ky={class:"mb-4 flex items-center justify-between rounded-xl bg-surface-alt p-2"},Gy={class:"grid grid-cols-2 gap-1"},Wy={class:"block"},Yy=["disabled"],Xy={class:"mt-3 grid grid-cols-2 gap-2"},Jy={class:"mt-4 grid grid-cols-2 gap-2"},Qy=se({__name:"HeapControls",props:{canEdit:{type:Boolean},speed:{},isMinHeap:{type:Boolean}},emits:["insert","extract","toggle-mode","seed","reset","update:speed"],setup(t,{emit:e}){const n=t,s=e,o=B(""),a=C(()=>String(o.value).trim()===""?!1:Number.isFinite(Number(o.value)));function r(){!a.value||!n.canEdit||(s("insert",Number(o.value)),o.value="")}return(i,l)=>(x(),Y(we,{title:"Heap Controls"},{default:D(()=>[h("div",Ky,[l[9]||(l[9]=h("span",{class:"pl-2 text-sm font-medium text-ink-muted"},"Mode",-1)),h("div",Gy,[A(Z,{variant:"toggle",active:t.isMinHeap,disabled:!t.canEdit,onClick:l[0]||(l[0]=u=>!t.isMinHeap&&s("toggle-mode"))},{default:D(()=>[...l[7]||(l[7]=[M(" Min ",-1)])]),_:1},8,["active","disabled"]),A(Z,{variant:"toggle",active:!t.isMinHeap,disabled:!t.canEdit,onClick:l[1]||(l[1]=u=>t.isMinHeap&&s("toggle-mode"))},{default:D(()=>[...l[8]||(l[8]=[M(" Max ",-1)])]),_:1},8,["active","disabled"])])]),h("label",Wy,[l[10]||(l[10]=h("span",{class:"mb-1.5 block text-sm font-medium text-ink-muted"},"Value",-1)),_s(h("input",{"onUpdate:modelValue":l[2]||(l[2]=u=>o.value=u),type:"number",placeholder:"e.g. 42",disabled:!t.canEdit,class:"w-full rounded-xl border border-line bg-surface-raised px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent disabled:cursor-not-allowed disabled:opacity-50",onKeyup:Rt(r,["enter"])},null,40,Yy),[[Mo,o.value]])]),h("div",Xy,[A(Z,{variant:"primary",disabled:!t.canEdit||!a.value,onClick:r},{default:D(()=>[...l[11]||(l[11]=[M(" Insert ",-1)])]),_:1},8,["disabled"]),A(Z,{variant:"danger",disabled:!t.canEdit,onClick:l[3]||(l[3]=u=>s("extract"))},{default:D(()=>[M(" Extract "+R(t.isMinHeap?"Min":"Max"),1)]),_:1},8,["disabled"])]),A(Ve,{label:"Speed",class:"mt-4","model-value":t.speed,min:1,max:100,suffix:"%","onUpdate:modelValue":l[4]||(l[4]=u=>s("update:speed",u))},null,8,["model-value"]),h("div",Jy,[A(Z,{variant:"neutral",disabled:!t.canEdit,onClick:l[5]||(l[5]=u=>s("seed",10))},{default:D(()=>[...l[12]||(l[12]=[M(" Seed random heap ",-1)])]),_:1},8,["disabled"]),A(Z,{variant:"neutral",disabled:!t.canEdit,onClick:l[6]||(l[6]=u=>s("reset"))},{default:D(()=>[...l[13]||(l[13]=[M(" Reset ",-1)])]),_:1},8,["disabled"])]),l[14]||(l[14]=h("p",{class:"mt-3 text-center text-xs text-ink-faint"}," Controls lock while an insert/extract animation is playing. ",-1))]),_:1}))}}),Zy={class:"grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]"},ew={class:"flex flex-col gap-4"},tw={class:"flex flex-col gap-4"},nw={class:"grid grid-cols-3 gap-2"},sw={key:0,class:"mt-3 text-center text-xs text-ink-faint"},ow={class:"nums font-mono font-semibold text-accent"},aw={key:0,class:"text-sm text-ink-faint"},rw={key:0,class:"text-sm text-ink-faint"},iw={key:1,class:"flex flex-wrap gap-1.5"},lw={class:"w-full bg-surface-raised/70 py-0.5 text-center text-[10px] font-medium text-ink-muted"},uw={class:"nums py-1 font-mono text-sm font-semibold text-ink"},cl=50,dl=60,pl=40,fl=40,cw=se({__name:"HeapView",setup(t){const e={visiting:Qe.probe,inserted:Qe.settled,removing:Qe.rejected,default:"border-line"},n={visiting:Ct.probe,inserted:Ct.settled,removing:Ct.rejected,default:"bg-surface-alt"},s=qy();function o(p){const m=[],y=[];let g=0;const v=p.length;function b(w,S){if(w>=v)return;const $=2*w+1,_=2*w+2;b($,S+1);const P=pl+g*cl,K=fl+S*dl;g+=1,m.push({id:w,x:P,y:K,value:p[w],depth:S}),b(_,S+1),$<v&&y.push({from:w,to:$}),_<v&&y.push({from:w,to:_})}return b(0,0),{nodes:m,edges:y,slotCount:g}}const a=C(()=>o(s.heap.value));function r(p){return s.highlights.comparing.includes(p)?"visiting":s.highlights.swapping.includes(p)?"inserted":"default"}const i=C(()=>a.value.nodes.map(p=>({id:p.id,x:p.x,y:p.y,value:p.value,state:r(p.id)}))),l=C(()=>a.value.edges),u=C(()=>Math.max(320,pl*2+a.value.slotCount*cl)),c=C(()=>{const p=a.value.nodes.reduce((m,y)=>Math.max(m,y.depth),0);return Math.max(200,fl*2+p*dl)}),d=C(()=>s.heap.value.length===0);return(p,m)=>(x(),T("div",Zy,[h("div",ew,[A(Qy,{"can-edit":f(s).canEdit.value,speed:f(s).speed.value,"is-min-heap":f(s).isMinHeap.value,onInsert:m[0]||(m[0]=y=>f(s).insert(y)),onExtract:m[1]||(m[1]=y=>f(s).extractRoot()),onToggleMode:m[2]||(m[2]=y=>f(s).toggleMode()),onSeed:m[3]||(m[3]=y=>f(s).seed(y)),onReset:m[4]||(m[4]=y=>f(s).reset()),"onUpdate:speed":m[5]||(m[5]=y=>f(s).speed.value=y)},null,8,["can-edit","speed","is-min-heap"])]),h("div",tw,[A(we,{title:"Stats"},{header:D(()=>[A(Sn,{status:f(s).status.value},null,8,["status"])]),default:D(()=>[h("div",nw,[A(Dt,{label:"Comparisons",value:String(f(s).stats.comparisons)},null,8,["value"]),A(Dt,{label:"Swaps",value:String(f(s).stats.swaps)},null,8,["value"]),A(Dt,{label:"Steps",value:String(f(s).stats.steps)},null,8,["value"])]),f(s).lastExtracted.value!==null?(x(),T("p",sw,[m[6]||(m[6]=M(" Last extracted: ",-1)),h("span",ow,R(f(s).lastExtracted.value),1)])):pe("",!0)]),_:1}),A(we,{class:"flex min-h-[280px] flex-1 items-center justify-center"},{default:D(()=>[d.value?(x(),T("p",aw," The heap is empty — insert a value to get started. ")):(x(),Y(Ec,{key:1,nodes:i.value,edges:l.value,"view-box-width":u.value,"view-box-height":c.value,class:"max-h-[55vh]"},null,8,["nodes","edges","view-box-width","view-box-height"]))]),_:1}),A(we,{title:"Backing Array"},{default:D(()=>[d.value?(x(),T("div",rw,"Empty.")):(x(),T("div",iw,[(x(!0),T(te,null,de(f(s).heap.value,(y,g)=>(x(),T("div",{key:g,class:ve(["flex w-12 flex-col items-center overflow-hidden rounded-lg border transition-colors",[e[r(g)],n[r(g)]]])},[h("div",lw,R(g),1),h("div",uw,R(y),1)],2))),128))]))]),_:1})])]))}}),dw=10;function pw(){const t=B({nodes:[],edges:[],adjacency:new Map}),e=B("bfs"),n=B(null),s=B(60),o=B(ze()),a=Ne({visited:[],frontier:[],current:null}),r=Ne({visitedCount:0,totalNodes:0}),i=C(()=>ea[e.value]),l=C(()=>{const v=new Map,b=new Set(a.visited),w=new Set(a.frontier);for(const S of t.value.nodes)S.id===a.current?v.set(S.id,"current"):b.has(S.id)?v.set(S.id,"visited"):w.has(S.id)&&v.set(S.id,"frontier");return v}),u=C(()=>{const v=new Map,b=new Set(a.visited);for(const w of t.value.edges)b.has(w.from)&&b.has(w.to)&&v.set(w.id,"visited");return v});function c(){a.visited=[],a.frontier=[],a.current=null}function d(){r.visitedCount=0,r.totalNodes=t.value.nodes.length}const p=vn({speed:s,createGenerator:()=>n.value===null?null:(c(),d(),i.value.generator(t.value.adjacency,n.value)),applyStep:v=>{a.visited=v.visited,a.frontier=v.frontier,a.current=v.current,r.visitedCount=v.visited.length},clearStep:()=>{c(),d()}});function m(v=!1){var w;t.value=cc(dw,ot(o.value)),v&&n.value!==null&&t.value.adjacency.has(n.value)||(n.value=((w=t.value.nodes[0])==null?void 0:w.id)??null),p.reset()}function y(v){p.canEdit.value&&t.value.adjacency.has(v)&&(n.value=v)}const{hydrated:g}=Qt(Ob({algoKey:e,speed:s,seed:o,startId:n}));return m(g.has("start")),{graph:t,algoKey:e,startId:n,speed:s,seed:o,highlights:a,nodeTone:l,edgeTone:u,stats:r,currentAlgo:i,status:p.status,isRunning:p.isRunning,isPaused:p.isPaused,isDone:p.isDone,canEdit:p.canEdit,delayMs:p.delayMs,elapsedMs:p.elapsedMs,stepCount:p.stepCount,cursor:p.cursor,bufferedCount:p.bufferedCount,fullyBuffered:p.fullyBuffered,current:p.current,canStepBack:p.canStepBack,canStepForward:p.canStepForward,generate:m,setStart:y,run:p.run,pause:p.pause,reset:p.reset,stepForward:p.stepForward,stepBack:p.stepBack,seek:p.seek,skipToEnd:p.skipToEnd}}const fw={class:"mt-5 grid grid-cols-2 gap-2"},hw=se({__name:"GraphControls",props:{speed:{},status:{},canEdit:{type:Boolean},isRunning:{type:Boolean},isPaused:{type:Boolean}},emits:["update:speed","generate","run","pause","reset"],setup(t,{emit:e}){const n=e;return(s,o)=>(x(),Y(we,{title:"Controls"},{default:D(()=>[A(Ve,{label:"Speed","model-value":t.speed,min:1,max:100,suffix:"%","onUpdate:modelValue":o[0]||(o[0]=a=>n("update:speed",a))},null,8,["model-value"]),h("div",fw,[t.isRunning?(x(),Y(Z,{key:1,variant:"warning",class:"col-span-2",onClick:o[2]||(o[2]=a=>n("pause"))},{default:D(()=>[...o[6]||(o[6]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M6 4h4v16H6zM14 4h4v16h-4z"})],-1),M(" Pause ",-1)])]),_:1})):(x(),Y(Z,{key:0,variant:"primary",class:"col-span-2",onClick:o[1]||(o[1]=a=>n("run"))},{default:D(()=>[o[5]||(o[5]=h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M8 5v14l11-7z"})],-1)),M(" "+R(t.isPaused?"Resume":"Run"),1)]),_:1})),A(Z,{variant:"neutral",onClick:o[3]||(o[3]=a=>n("reset"))},{default:D(()=>[...o[7]||(o[7]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.36 2.64L3 8"}),h("path",{d:"M3 3v5h5"})],-1),M(" Reset ",-1)])]),_:1}),A(Z,{variant:"neutral",disabled:!t.canEdit,onClick:o[4]||(o[4]=a=>n("generate"))},{default:D(()=>[...o[8]||(o[8]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"})],-1),M(" New Graph ",-1)])]),_:1},8,["disabled"])]),o[9]||(o[9]=h("p",{class:"mt-3 text-center text-xs text-ink-faint"}," Click a node in the diagram to set the start point. ",-1))]),_:1}))}}),fo={idle:"idle",frontier:"probe",current:"active",visited:"settled"},mw={idle:ht.idle,frontier:ht.probe,current:ht.active,visited:ht.settled,considering:ht.probe,accepted:ht.settled,rejected:ht.rejected},gw={idle:vt.idle,frontier:vt.probe,current:vt.active,visited:vt.settled,considering:vt.probe,accepted:vt.settled,rejected:vt.rejected},bw=kn([{tone:fo.idle,label:"Unvisited"},{tone:fo.frontier,label:"Frontier"},{tone:fo.current,label:"Current"},{tone:fo.visited,label:"Visited"}]),vw={class:"mb-3 flex flex-wrap items-center gap-x-4 gap-y-2"},yw={class:"text-xs font-semibold uppercase tracking-wider text-ink-faint"},ww={class:"flex min-h-[320px] flex-1 items-center justify-center rounded-xl bg-surface-alt p-3"},xw={viewBox:"0 0 400 400",class:"h-full max-h-[480px] w-full max-w-[480px]"},kw=["x1","y1","x2","y2","stroke-width"],Sw=["x","y"],$w=["x","y"],Ew=["onClick"],Cw=["cx","cy","stroke-width"],Aw=["x","y"],Tw=["x","y"],Ow={class:"mt-3 text-center text-xs text-ink-faint"},Cc=se({__name:"GraphCanvas",props:{nodes:{},edges:{},nodeTone:{default:()=>new Map},edgeTone:{default:()=>new Map},nodeBadge:{default:()=>new Map},showWeights:{type:Boolean,default:!1},legend:{default:()=>bw},title:{default:"Graph"},hint:{default:"Click a node to set the traversal start point."},startId:{default:null},canEdit:{type:Boolean,default:!1}},emits:["set-start"],setup(t,{emit:e}){const n=t,s=e,o=C(()=>new Map(n.nodes.map(c=>[c.id,c]))),a=C(()=>{const c=new Map;for(const d of n.edges){const p=o.value.get(d.from),m=o.value.get(d.to);p&&m&&c.set(d.id,{x:(p.x+m.x)/2,y:(p.y+m.y)/2})}return c});function r(c){return mw[n.nodeTone.get(c)??"idle"]}function i(c){return gw[n.edgeTone.get(c.id)??"idle"]}function l(c){return n.edgeTone.get(c.id)==="accepted"?3:2}function u(c){n.canEdit&&s("set-start",c)}return(c,d)=>(x(),Y(we,{class:"flex h-full flex-col"},{default:D(()=>[h("div",vw,[h("h2",yw,R(t.title),1),A(_n,{items:t.legend},null,8,["items"])]),h("div",ww,[(x(),T("svg",xw,[(x(!0),T(te,null,de(t.edges,p=>{var m,y,g,v;return x(),T("line",{key:p.id,x1:(m=o.value.get(p.from))==null?void 0:m.x,y1:(y=o.value.get(p.from))==null?void 0:y.y,x2:(g=o.value.get(p.to))==null?void 0:g.x,y2:(v=o.value.get(p.to))==null?void 0:v.y,"stroke-width":l(p),class:ve(i(p))},null,10,kw)}),128)),t.showWeights?(x(!0),T(te,{key:0},de(t.edges,p=>(x(),T("g",{key:`w-${p.id}`},[p.weight!==void 0&&a.value.get(p.id)?(x(),T(te,{key:0},[h("rect",{x:a.value.get(p.id).x-10,y:a.value.get(p.id).y-7,width:"20",height:"14",rx:"3",class:"fill-surface-alt"},null,8,Sw),h("text",{x:a.value.get(p.id).x,y:a.value.get(p.id).y,"text-anchor":"middle","dominant-baseline":"central",class:"pointer-events-none select-none fill-ink-muted text-[9px] font-semibold"},R(p.weight),9,$w)],64)):pe("",!0)]))),128)):pe("",!0),(x(!0),T(te,null,de(t.nodes,p=>(x(),T("g",{key:p.id,class:"cursor-pointer",onClick:m=>u(p.id)},[h("circle",{cx:p.x,cy:p.y,r:"16","stroke-width":p.id===t.startId?3:0,class:ve(["transition-colors duration-150 ease-out",[r(p.id),p.id===t.startId?"stroke-accent":"stroke-transparent"]])},null,10,Cw),h("text",{x:p.x,y:p.y,"text-anchor":"middle","dominant-baseline":"central",class:"pointer-events-none select-none fill-ink-inverse text-[10px] font-semibold"},R(p.label),9,Aw),t.nodeBadge.get(p.id)!==void 0?(x(),T("text",{key:0,x:p.x,y:p.y+27,"text-anchor":"middle",class:"pointer-events-none select-none fill-ink-faint text-[9px] font-medium"},R(t.nodeBadge.get(p.id)),9,Tw)):pe("",!0)],8,Ew))),128))]))]),h("p",Ow,R(t.hint),1)]),_:1}))}}),Mw={class:"grid grid-cols-3 gap-2"},_w=se({__name:"GraphStats",props:{visitedCount:{},totalNodes:{},steps:{},elapsedMs:{},status:{}},setup(t){const e=t,n=C(()=>`${(e.elapsedMs/1e3).toFixed(2)}s`),s=C(()=>[{label:"Visited",value:`${e.visitedCount} / ${e.totalNodes}`},{label:"Steps",value:e.steps.toLocaleString()},{label:"Elapsed",value:n.value}]);return(o,a)=>(x(),Y(we,{title:"Stats"},{header:D(()=>[A(Sn,{status:t.status},null,8,["status"])]),default:D(()=>[h("div",Mw,[(x(!0),T(te,null,de(s.value,r=>(x(),Y(Dt,{key:r.label,label:r.label,value:r.value},null,8,["label","value"]))),128))])]),_:1}))}}),Rw={class:"grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]"},jw={class:"flex flex-col gap-4"},Iw={class:"flex flex-col gap-4"},Dw=se({__name:"GraphView",setup(t){const e=pw();return Re(e.algoKey,()=>{e.isDone.value&&e.reset()}),(n,s)=>(x(),T("div",Rw,[h("div",jw,[A(Tn,{modelValue:f(e).algoKey.value,"onUpdate:modelValue":s[0]||(s[0]=o=>f(e).algoKey.value=o),algorithms:f(ea),title:"Traversal Algorithm",disabled:!f(e).canEdit.value},null,8,["modelValue","algorithms","disabled"]),A(hw,{speed:f(e).speed.value,"onUpdate:speed":s[1]||(s[1]=o=>f(e).speed.value=o),status:f(e).status.value,"can-edit":f(e).canEdit.value,"is-running":f(e).isRunning.value,"is-paused":f(e).isPaused.value,onGenerate:s[2]||(s[2]=o=>f(e).generate()),onRun:s[3]||(s[3]=o=>f(e).run()),onPause:s[4]||(s[4]=o=>f(e).pause()),onReset:s[5]||(s[5]=o=>f(e).reset())},null,8,["speed","status","can-edit","is-running","is-paused"]),A(xn,{cursor:f(e).cursor.value,"buffered-count":f(e).bufferedCount.value,"fully-buffered":f(e).fullyBuffered.value,"can-step-back":f(e).canStepBack.value,"can-step-forward":f(e).canStepForward.value,onSeek:s[6]||(s[6]=o=>f(e).seek(o)),onStepBack:s[7]||(s[7]=o=>f(e).stepBack()),onStepForward:s[8]||(s[8]=o=>f(e).stepForward()),onSkipToEnd:s[9]||(s[9]=o=>f(e).skipToEnd())},null,8,["cursor","buffered-count","fully-buffered","can-step-back","can-step-forward"])]),h("div",Iw,[A(_w,{"visited-count":f(e).stats.visitedCount,"total-nodes":f(e).stats.totalNodes,steps:f(e).stepCount.value,"elapsed-ms":f(e).elapsedMs.value,status:f(e).status.value},null,8,["visited-count","total-nodes","steps","elapsed-ms","status"]),A(Cc,{class:"flex-1",nodes:f(e).graph.value.nodes,edges:f(e).graph.value.edges,"node-tone":f(e).nodeTone.value,"edge-tone":f(e).edgeTone.value,"start-id":f(e).startId.value,"can-edit":f(e).canEdit.value,onSetStart:s[10]||(s[10]=o=>f(e).setStart(o))},null,8,["nodes","edges","node-tone","edge-tone","start-id","can-edit"])])]))}}),Lw=`
'use strict';

function toNumberArray(value, cap) {
  if (!Array.isArray(value)) return [];
  var out = [];
  var limit = Math.min(value.length, cap);
  for (var i = 0; i < limit; i++) {
    var n = Number(value[i]);
    out.push(isFinite(n) ? n : 0);
  }
  return out;
}

function toCount(value) {
  var n = Number(value);
  return isFinite(n) && n >= 0 ? Math.floor(n) : 0;
}

function normalize(raw, cap) {
  if (!raw || typeof raw !== 'object') return null;
  var step = {
    array: toNumberArray(raw.array, cap),
    comparing: toNumberArray(raw.comparing, cap),
    swapping: toNumberArray(raw.swapping, cap),
    sorted: toNumberArray(raw.sorted, cap),
    comparisons: toCount(raw.comparisons),
    swaps: toCount(raw.swaps),
    done: raw.done === true
  };
  var line = Number(raw.line);
  if (isFinite(line) && line >= 0) step.line = Math.floor(line);
  return step;
}

self.onmessage = function (event) {
  var data = event.data || {};
  var cap = data.arrayCap || 500;

  try {
    var factory = new Function(
      '"use strict";' + data.code + '\\n;return typeof run === "function" ? run : null;'
    );
    var runFn = factory();

    if (typeof runFn !== 'function') {
      self.postMessage({
        type: 'sandbox:error',
        message: 'No run function found. Define: function* run(input) { ... }'
      });
      return;
    }

    var iterator = runFn(data.input.slice());
    if (!iterator || typeof iterator.next !== 'function') {
      self.postMessage({
        type: 'sandbox:error',
        message: 'run did not return a generator. Declare it with function* and use yield.'
      });
      return;
    }

    var started = Date.now();
    var count = 0;
    var batch = [];
    var reason = 'complete';

    for (;;) {
      if (count >= data.maxSteps) { reason = 'step-budget'; break; }
      if (Date.now() - started > data.maxMs) { reason = 'time-budget'; break; }

      var result = iterator.next();
      if (result.done) { reason = 'complete'; break; }

      var step = normalize(result.value, cap);
      if (step === null) {
        self.postMessage({
          type: 'sandbox:error',
          message: 'Step ' + count + ' was not an object. Yield a snapshot object.'
        });
        return;
      }

      batch.push(step);
      count++;

      if (batch.length >= data.batchSize) {
        self.postMessage({ type: 'sandbox:steps', steps: batch });
        batch = [];
      }

      // A terminal snapshot ends the run without asking for one more value,
      // matching how useStepPlayer treats \`done\` on the built-in generators.
      if (step.done) { reason = 'complete'; break; }
    }

    if (batch.length) self.postMessage({ type: 'sandbox:steps', steps: batch });
    self.postMessage({ type: 'sandbox:done', reason: reason, count: count });
  } catch (err) {
    self.postMessage({
      type: 'sandbox:error',
      message: String((err && err.message) || err)
    });
  }
};
`,Nw="<\/script>",Pw=`<!doctype html>
<html>
<head><meta charset="utf-8"></head>
<body>
<script>
(function () {
  'use strict';
  var worker = null;

  function reply(message) {
    // '*' as targetOrigin: this document has an opaque origin and cannot name
    // the parent's. The parent authenticates by event.source instead.
    parent.postMessage(message, '*');
  }

  function cleanup() {
    if (worker) {
      try { worker.terminate(); } catch (e) { /* already gone */ }
      worker = null;
    }
  }

  window.addEventListener('message', function (event) {
    var data = event.data || {};

    if (data.type === 'sandbox:run') {
      cleanup();
      try {
        var blob = new Blob([data.workerSource], { type: 'application/javascript' });
        var url = URL.createObjectURL(blob);
        worker = new Worker(url);
        URL.revokeObjectURL(url);

        worker.onmessage = function (ev) { reply(ev.data); };
        worker.onerror = function (ev) {
          reply({ type: 'sandbox:error', message: (ev && ev.message) || 'worker failed' });
        };

        worker.postMessage({
          code: data.code,
          input: data.input,
          maxSteps: data.maxSteps,
          maxMs: data.maxMs,
          batchSize: data.batchSize,
          arrayCap: data.arrayCap
        });
        reply({ type: 'sandbox:started' });
      } catch (err) {
        reply({
          type: 'sandbox:error',
          message: 'This browser blocked the sandboxed worker: ' + String((err && err.message) || err)
        });
      }
      return;
    }

    if (data.type === 'sandbox:kill') {
      cleanup();
      reply({ type: 'sandbox:killed' });
    }
  });

  reply({ type: 'sandbox:ready' });
})();
${Nw}
</body>
</html>`;function As(t){return typeof t=="number"&&Number.isFinite(t)}function Ma(t,e,n){if(t===void 0)return[];if(!Array.isArray(t))return`${n} must be an array of indices`;if(t.length>Ks)return`${n} has too many entries`;const s=[];for(const o of t){if(!As(o)||!Number.isInteger(o))return`${n} must contain whole numbers`;if(o<0||o>=e)return`${n} contains index ${o}, outside the array (0..${e-1})`;s.push(o)}return s}function Bw(t){if(t===null||typeof t!="object")return{ok:!1,reason:"step is not an object"};const e=t;if(!Array.isArray(e.array))return{ok:!1,reason:"step.array must be an array"};if(e.array.length>Ks)return{ok:!1,reason:`step.array has ${e.array.length} entries, over the ${Ks} limit`};const n=[];for(const i of e.array){if(!As(i))return{ok:!1,reason:"step.array must contain finite numbers"};n.push(i)}const s=Ma(e.comparing,n.length,"step.comparing");if(typeof s=="string")return{ok:!1,reason:s};const o=Ma(e.swapping,n.length,"step.swapping");if(typeof o=="string")return{ok:!1,reason:o};const a=Ma(e.sorted,n.length,"step.sorted");if(typeof a=="string")return{ok:!1,reason:a};if(e.comparisons!==void 0&&!As(e.comparisons))return{ok:!1,reason:"step.comparisons must be a number"};if(e.swaps!==void 0&&!As(e.swaps))return{ok:!1,reason:"step.swaps must be a number"};const r={array:n,comparing:s,swapping:o,sorted:a,comparisons:Math.max(0,Math.floor(e.comparisons??0)),swaps:Math.max(0,Math.floor(e.swaps??0)),done:e.done===!0};return As(e.line)&&e.line>=0&&(r.line=Math.floor(e.line)),{ok:!0,step:r}}class Ac extends Error{constructor(e){super(e),this.name="SandboxError"}}function*Fw(t){for(const e of t)yield e}function Hw(t){const e=t.maxSteps??jr,n=t.maxMs??Sb,s=t.silenceMs??$b,o=[];let a=0,r=null;const i=Date.now();let l=null,u=null,c=!1,d,p;const m=new Promise((S,$)=>{d=S,p=$});function y(){var S;if(u!==null&&(clearTimeout(u),u=null),window.removeEventListener("message",w),l){try{(S=l.contentWindow)==null||S.postMessage({type:"sandbox:kill"},"*")}catch{}l.remove(),l=null}}function g(S){c||(c=!0,y(),d({steps:o,reason:S,rejected:a,firstRejectReason:r,elapsedMs:Date.now()-i}))}function v(S){c||(c=!0,y(),p(new Ac(S)))}function b(){u!==null&&clearTimeout(u),u=setTimeout(()=>g("watchdog"),s)}function w(S){if(!l||S.source!==l.contentWindow)return;const $=S.data;if(!(!$||typeof $!="object"||typeof $.type!="string"))switch(b(),$.type){case"sandbox:steps":{if(!Array.isArray($.steps))return;for(const _ of $.steps){const P=Bw(_);if(!P.ok){a+=1,r===null&&(r=P.reason);continue}o.push(P.step)}return}case"sandbox:done":g($.reason);return;case"sandbox:error":v($.message||"The sandbox reported an unknown error.");return;default:return}}return window.addEventListener("message",w),l=document.createElement("iframe"),l.setAttribute("sandbox","allow-scripts"),l.setAttribute("aria-hidden","true"),l.setAttribute("title","Algorithm sandbox runner"),l.style.cssText="position:absolute;width:0;height:0;border:0;opacity:0;pointer-events:none;left:-9999px;",l.srcdoc=Pw,l.addEventListener("load",()=>{var S;c||!l||(S=l.contentWindow)==null||S.postMessage({type:"sandbox:run",workerSource:Lw,code:t.code,input:Array.from(t.input,Number),maxSteps:e,maxMs:n,batchSize:Eb,arrayCap:Ks},"*")}),document.body.appendChild(l),b(),{result:m,cancel:()=>g("cancelled")}}function Vw(t){switch(t.reason){case"watchdog":return"Force-stopped: the snippet stopped responding without yielding anything — that is what a loop with no yield inside it looks like. The worker was terminated; this page was never blocked.";case"step-budget":case"time-budget":return"Stopped at the budget before the snippet yielded a single snapshot.";case"cancelled":return"Cancelled before the snippet yielded anything.";default:return t.rejected>0?`Every snapshot was rejected. First problem: ${t.firstRejectReason}`:"The snippet ran but never yielded a snapshot. Use `yield` to draw a frame."}}function Uw(){const t=B(rr),e=B(kc),n=B(Sc),s=B(ze()),o=B("idle"),a=B(null),r=B(null),i=br([]);let l=null;const u=B([]),c=B([]),d=Ne({comparing:[],swapping:[],sorted:[]}),p=Ne({comparisons:0,swaps:0}),m=B(1);function y(){d.comparing=[],d.swapping=[],d.sorted=[]}function g(){p.comparisons=0,p.swaps=0}function v(){const z=ot(s.value);u.value=Array.from({length:e.value},()=>z.int(1,99)),c.value=[...u.value],b()}function b(){let z=1;for(const ae of u.value)ae>z&&(z=ae);for(const ae of i.value)for(const L of ae.array)L>z&&(z=L);m.value=z}const w=vn({speed:n,createGenerator:()=>i.value.length===0?null:(c.value=[...u.value],y(),g(),Fw(i.value)),applyStep:z=>{c.value=z.array,d.comparing=z.comparing,d.swapping=z.swapping,d.sorted=z.sorted,p.comparisons=z.comparisons,p.swaps=z.swaps},clearStep:()=>{c.value=[...u.value],y(),g()}});function S(){i.value=[],w.reset(),b()}function $(){K(),v(),S(),o.value="idle",a.value=null,r.value=null}function _(){s.value=ze(),$()}async function P(){K(),a.value=null,r.value=null,o.value="executing",i.value=[],w.reset();const z=Hw({code:t.value,input:u.value});l=z;try{const ae=await z.result;if(l!==z)return;if(i.value=ae.steps,r.value=ae,b(),ae.steps.length===0){o.value="error",a.value=Vw(ae);return}o.value="ready",w.run()}catch(ae){if(l!==z)return;o.value="error",a.value=ae instanceof Ac?ae.message:"The sandbox failed to start."}finally{l===z&&(l=null)}}function K(){l&&(l.cancel(),l=null)}function I(){t.value=rr}const{hydrated:N}=Qt(Mb({source:t,size:e,speed:n,seed:s})),j=N.has("src");v();const he=C(()=>r.value!==null&&r.value.reason!=="complete"&&i.value.length>0),Se=C(()=>{const z=r.value;if(!z)return null;switch(z.reason){case"complete":return null;case"step-budget":return`Stopped at the ${jr.toLocaleString()}-step budget — the snippet never finished.`;case"time-budget":return"Stopped at the time budget — the snippet was still running.";case"watchdog":return"Force-stopped: the sandbox went silent, which is what a loop that never yields looks like.";case"cancelled":return"Cancelled.";default:return null}});return{source:t,size:e,speed:n,seed:s,phase:o,error:a,lastRun:r,truncated:he,stopLabel:Se,stepsCollected:C(()=>i.value.length),fromSharedLink:j,array:c,baseArray:u,highlights:d,stats:p,maxValue:m,status:w.status,isRunning:w.isRunning,isPaused:w.isPaused,isDone:w.isDone,canEdit:w.canEdit,elapsedMs:w.elapsedMs,stepCount:w.stepCount,cursor:w.cursor,bufferedCount:w.bufferedCount,fullyBuffered:w.fullyBuffered,current:w.current,canStepBack:w.canStepBack,canStepForward:w.canStepForward,activeLine:C(()=>{var z;return((z=w.current.value)==null?void 0:z.line)??null}),execute:P,cancel:K,regenerate:$,randomizeSeed:_,resetSource:I,run:w.run,pause:w.pause,reset:w.reset,stepForward:w.stepForward,stepBack:w.stepBack,seek:w.seek,skipToEnd:w.skipToEnd}}const zw={class:"relative flex max-h-[420px] min-h-[260px] overflow-hidden rounded-xl bg-surface-alt font-mono text-xs"},qw={"aria-hidden":"true",class:"select-none overflow-hidden border-r border-line bg-surface-alt py-3 text-right",style:{minWidth:"2.75rem"}},Kw=["value","disabled"],Gw=se({__name:"CodeEditor",props:{modelValue:{},disabled:{type:Boolean}},emits:["update:modelValue"],setup(t,{emit:e}){const n=t,s=e,o=B(null),a=C(()=>{const d=n.modelValue.split(`
`).length;return Array.from({length:d},(p,m)=>m+1)}),r=B(0);function i(d){r.value=d.target.scrollTop}const l=B(!1);function u(d){if(d.key==="Escape"){l.value=!0;return}if(d.key!=="Tab"||l.value)return;d.preventDefault();const p=o.value;if(!p)return;const{selectionStart:m,selectionEnd:y,value:g}=p,v=`${g.slice(0,m)}  ${g.slice(y)}`;s("update:modelValue",v),requestAnimationFrame(()=>{p.selectionStart=p.selectionEnd=m+2})}function c(d){l.value=!1,s("update:modelValue",d.target.value)}return(d,p)=>(x(),Y(we,{title:"Your algorithm"},{header:D(()=>[...p[0]||(p[0]=[h("span",{class:"text-[11px] text-ink-faint"}," Tab indents · Esc then Tab to leave ",-1)])]),default:D(()=>[h("div",zw,[h("div",qw,[h("div",{style:cn({transform:`translateY(${-r.value}px)`})},[(x(!0),T(te,null,de(a.value,m=>(x(),T("div",{key:m,class:"px-2 leading-5 text-ink-faint"},R(m),1))),128))],4)]),h("textarea",{ref_key:"textarea",ref:o,value:t.modelValue,disabled:t.disabled,spellcheck:"false",autocomplete:"off",autocorrect:"off",autocapitalize:"off","aria-label":"Algorithm source code",class:"flex-1 resize-none bg-transparent p-3 leading-5 text-ink outline-none disabled:opacity-60",onInput:c,onKeydown:u,onScroll:i},null,40,Kw)])]),_:1}))}}),Ww=["open"],Yw={class:"flex cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden"},Xw={class:"min-w-0"},Jw={class:"block text-xs font-semibold uppercase tracking-wider text-ink-faint"},Qw={key:0,class:"mt-1 block text-sm text-ink-muted"},Zw={class:"mt-4 border-t border-line pt-4 text-sm"},Zs=se({__name:"AvExplainer",props:{title:{},summary:{default:""},startOpen:{type:Boolean,default:!1}},setup(t){return(e,n)=>(x(),T("details",{class:"av-card group p-4 sm:p-5",open:t.startOpen},[h("summary",Yw,[h("span",Xw,[h("span",Jw,R(t.title),1),t.summary?(x(),T("span",Qw,R(t.summary),1)):pe("",!0)]),n[0]||(n[0]=h("span",{class:"shrink-0 text-ink-faint transition-transform group-open:rotate-180","aria-hidden":"true"}," ▾ ",-1))]),h("div",Zw,[So(e.$slots,"default")])],8,Ww))}}),ex={class:"mb-4 overflow-x-auto"},tx={class:"w-full border-collapse text-left text-xs"},nx={class:"py-1.5 pr-3 font-mono font-semibold text-ink"},sx={class:"py-1.5 pr-3 font-mono text-ink-faint"},ox={class:"py-1.5 text-ink-muted"},ax={class:"mb-4 list-disc space-y-1.5 pl-5 text-ink-muted"},rx=se({__name:"SandboxGuide",setup(t){const e=[{name:"array",type:"number[]",note:"Required. The values as they stand right now."},{name:"comparing",type:"number[]",note:"Indices to mark as being compared. Defaults to none."},{name:"swapping",type:"number[]",note:"Indices to mark as swapping."},{name:"sorted",type:"number[]",note:"Indices to mark as sorted — settled for good."},{name:"comparisons",type:"number",note:"Shown in Stats. Your own running count."},{name:"swaps",type:"number",note:"Shown in Stats."},{name:"done",type:"boolean",note:"true on the final snapshot only. Ends the run."}];return(n,s)=>(x(),Y(Zs,{title:"How this works",summary:"Write a generator, yield a snapshot per frame. Read this first — the shape is strict.","start-open":""},{default:D(()=>[s[4]||(s[4]=h("p",{class:"mb-3 text-ink-muted"},[M(" Your code runs in a sandboxed frame on its own thread, and everything it "),h("code",{class:"font-mono text-xs"},"yield"),M("s is drawn on the chart to the right. It is the same contract every built-in algorithm here uses, so anything you write plays back with the same scrubber, speed control and step history. ")],-1)),s[5]||(s[5]=h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint"}," Required shape ",-1)),s[6]||(s[6]=h("pre",{class:"mb-4 overflow-x-auto rounded-xl bg-surface-alt p-3 font-mono text-[11px] leading-5 text-ink"},[h("code",null,`// name and function* are both required
function* run(input) {
  // copy it — mutating input breaks Reset
  const array = [...input];

  // one yield = one frame
  yield {
    array: [...array],
    comparing: [0, 1],
    swapping: [],
    sorted: [],
    comparisons: 1,
    swaps: 0,
    done: false,
  };
}`)],-1)),s[7]||(s[7]=h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint"}," Snapshot fields ",-1)),h("div",ex,[h("table",tx,[h("tbody",null,[(x(),T(te,null,de(e,o=>h("tr",{key:o.name,class:"border-b border-line last:border-0"},[h("td",nx,R(o.name),1),h("td",sx,R(o.type),1),h("td",ox,R(o.note),1)])),64))])])]),s[8]||(s[8]=h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint"}," Rules worth knowing ",-1)),h("ul",ax,[s[0]||(s[0]=h("li",null,[h("b",null,"JavaScript only."),M(" The runner evaluates JS — other languages and WebAssembly are not supported. ")],-1)),s[1]||(s[1]=h("li",null,[M(" Highlight indices must be whole numbers "),h("b",null,"inside"),M(" the array. An out-of-range index is rejected rather than clamped, because a clamped index quietly highlights the wrong bar. ")],-1)),s[2]||(s[2]=h("li",null," A rejected snapshot is skipped and reported in the Sandbox panel with the reason — the run keeps going. ",-1)),s[3]||(s[3]=h("li",null,[M(" Helper functions are fine. Only "),h("code",{class:"font-mono text-xs"},"run"),M(" is special. ")],-1)),h("li",null," Limits: "+R(f(jr).toLocaleString())+" snapshots per run, arrays up to "+R(f(Ks))+" entries (the size slider stops at "+R(f(Ir))+"). ",1)]),s[9]||(s[9]=h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint"}," Why it is safe to run a link someone sent you ",-1)),s[10]||(s[10]=h("p",{class:"mb-2 text-ink-muted"}," Code executes inside an isolated frame with no access to this page — not its DOM, its storage, or its cookies — and on a separate thread, so even an infinite loop cannot freeze the tab. A run that stops responding is terminated automatically. ",-1)),s[11]||(s[11]=h("p",{class:"text-ink-faint"},[M(" One honest limitation: isolation stops shared code touching "),h("em",null,"this app"),M(", but it can still make network requests, the same as any script on any page you open. Treat a shared snippet the way you would treat any link. ")],-1))]),_:1}))}}),ix={class:"flex flex-col gap-3"},lx={class:"grid grid-cols-2 gap-2"},ux={class:"grid grid-cols-2 gap-2"},cx=se({__name:"SandboxControls",props:qn({status:{},executing:{type:Boolean},canEdit:{type:Boolean},isRunning:{type:Boolean},isPaused:{type:Boolean},hasTape:{type:Boolean},seed:{}},{size:{required:!0},sizeModifiers:{},speed:{required:!0},speedModifiers:{}}),emits:qn(["execute","cancel","run","pause","reset","randomize","reset-source","update:seed"],["update:size","update:speed"]),setup(t,{emit:e}){const n=Kn(t,"size"),s=Kn(t,"speed"),o=e;function a(r){const i=Number(r);Number.isInteger(i)&&o("update:seed",i)}return(r,i)=>(x(),Y(we,{title:"Run"},{default:D(()=>[h("div",ix,[h("div",lx,[A(Z,{variant:"primary",class:"col-span-2",disabled:t.executing,onClick:i[0]||(i[0]=l=>o("execute"))},{default:D(()=>[M(R(t.executing?"Running in sandbox…":"▶ Run in sandbox"),1)]),_:1},8,["disabled"]),t.executing?(x(),Y(Z,{key:0,variant:"danger",class:"col-span-2",onClick:i[1]||(i[1]=l=>o("cancel"))},{default:D(()=>[...i[9]||(i[9]=[M(" Stop ",-1)])]),_:1})):(x(),T(te,{key:1},[t.isRunning?(x(),Y(Z,{key:0,variant:"warning",disabled:!t.hasTape,onClick:i[2]||(i[2]=l=>o("pause"))},{default:D(()=>[...i[10]||(i[10]=[M(" ❚❚ Pause ",-1)])]),_:1},8,["disabled"])):(x(),Y(Z,{key:1,variant:"neutral",disabled:!t.hasTape,onClick:i[3]||(i[3]=l=>o("run"))},{default:D(()=>[M(R(t.isPaused?"▶ Resume":"▶ Replay"),1)]),_:1},8,["disabled"])),A(Z,{variant:"neutral",disabled:!t.hasTape,onClick:i[4]||(i[4]=l=>o("reset"))},{default:D(()=>[...i[11]||(i[11]=[M("Reset",-1)])]),_:1},8,["disabled"])],64))]),A(Ve,{modelValue:n.value,"onUpdate:modelValue":i[5]||(i[5]=l=>n.value=l),label:"Input size",min:f(xc),max:f(Ir),disabled:!t.canEdit||t.executing},null,8,["modelValue","min","max","disabled"]),A(Ve,{modelValue:s.value,"onUpdate:modelValue":i[6]||(i[6]=l=>s.value=l),label:"Speed",min:1,max:100,suffix:"%"},null,8,["modelValue"]),A(kt,{label:"Seed",monospace:"","model-value":String(t.seed),disabled:!t.canEdit||t.executing,"onUpdate:modelValue":a},null,8,["model-value","disabled"]),h("div",ux,[A(Z,{variant:"quiet",disabled:!t.canEdit||t.executing,onClick:i[7]||(i[7]=l=>o("randomize"))},{default:D(()=>[...i[12]||(i[12]=[M(" New seed ",-1)])]),_:1},8,["disabled"]),A(Z,{variant:"quiet",disabled:t.executing,onClick:i[8]||(i[8]=l=>o("reset-source"))},{default:D(()=>[...i[13]||(i[13]=[M(" Starter code ",-1)])]),_:1},8,["disabled"])])])]),_:1}))}}),dx={key:0,class:"mb-3 rounded-lg bg-accent-soft px-3 py-2 text-xs text-accent"},px={key:1,class:"text-sm text-danger"},fx={key:0,class:"mb-2 text-sm text-warn"},hx={key:1,class:"nums text-sm text-ink-muted"},mx={key:0},gx={key:2,class:"text-sm text-ink-muted"},bx={key:3,class:"nums mt-2 text-xs text-warn"},vx=se({__name:"SandboxStatus",props:{phase:{},error:{},stopLabel:{},stepsCollected:{},rejected:{},firstRejectReason:{},elapsedMs:{},fromSharedLink:{type:Boolean}},setup(t){const e=t,n=C(()=>e.phase==="error"?"error":e.stopLabel||e.rejected>0?"warn":e.phase==="ready"?"ok":"idle"),s=C(()=>({idle:"bg-surface-alt text-ink-muted",ok:"bg-ok-soft text-ok-ink",warn:"bg-warn-soft text-warn-ink",error:"bg-danger-soft text-danger-ink"})[n.value]);return(o,a)=>(x(),Y(we,{title:"Sandbox"},{header:D(()=>[h("span",{class:ve(["rounded-full px-2.5 py-0.5 text-xs font-semibold",s.value])},R(t.phase==="executing"?"Executing":t.phase==="ready"?"Isolated · OK":t.phase==="error"?"Failed":"Idle"),3)]),default:D(()=>[t.fromSharedLink?(x(),T("p",dx," This code came from a shared link. It runs in an isolated frame with no access to this page, but it is not code you wrote. ")):pe("",!0),t.error?(x(),T("p",px,R(t.error),1)):(x(),T(te,{key:2},[t.stopLabel?(x(),T("p",fx,R(t.stopLabel),1)):pe("",!0),t.phase==="ready"?(x(),T("p",hx,[M(" Collected "+R(t.stepsCollected.toLocaleString())+" snapshots",1),t.elapsedMs!==null?(x(),T("span",mx," in "+R((t.elapsedMs/1e3).toFixed(2))+"s",1)):pe("",!0),a[0]||(a[0]=M(". ",-1))])):t.phase==="idle"?(x(),T("p",gx," Your code runs in a sandboxed frame on its own thread. It can draw bars; it cannot reach this page. ")):pe("",!0),t.rejected>0?(x(),T("p",bx,R(t.rejected.toLocaleString())+" snapshot"+R(t.rejected===1?"":"s")+" rejected before rendering — "+R(t.firstRejectReason),1)):pe("",!0)],64))]),_:1}))}}),yx={class:"grid gap-4 lg:grid-cols-[minmax(0,420px)_1fr]"},wx={class:"flex flex-col gap-4"},xx={class:"flex flex-col gap-4"},kx=se({__name:"SandboxView",setup(t){const e=Uw();Re([e.size,e.seed],()=>{e.phase.value!=="executing"&&e.regenerate()}),xr(()=>{e.fromSharedLink&&e.execute()});const n=C(()=>{var a;return((a=e.lastRun.value)==null?void 0:a.elapsedMs)??null}),s=C(()=>{var a;return((a=e.lastRun.value)==null?void 0:a.rejected)??0}),o=C(()=>{var a;return((a=e.lastRun.value)==null?void 0:a.firstRejectReason)??null});return(a,r)=>(x(),T("div",yx,[h("div",wx,[A(rx),A(Gw,{modelValue:f(e).source.value,"onUpdate:modelValue":r[0]||(r[0]=i=>f(e).source.value=i),disabled:f(e).phase.value==="executing"},null,8,["modelValue","disabled"]),A(cx,{size:f(e).size.value,"onUpdate:size":r[1]||(r[1]=i=>f(e).size.value=i),speed:f(e).speed.value,"onUpdate:speed":r[2]||(r[2]=i=>f(e).speed.value=i),status:f(e).status.value,executing:f(e).phase.value==="executing","can-edit":f(e).canEdit.value,"is-running":f(e).isRunning.value,"is-paused":f(e).isPaused.value,"has-tape":f(e).stepsCollected.value>0,seed:f(e).seed.value,onExecute:r[3]||(r[3]=i=>f(e).execute()),onCancel:r[4]||(r[4]=i=>f(e).cancel()),onRun:r[5]||(r[5]=i=>f(e).run()),onPause:r[6]||(r[6]=i=>f(e).pause()),onReset:r[7]||(r[7]=i=>f(e).reset()),onRandomize:r[8]||(r[8]=i=>f(e).randomizeSeed()),onResetSource:r[9]||(r[9]=i=>f(e).resetSource()),"onUpdate:seed":r[10]||(r[10]=i=>f(e).seed.value=i)},null,8,["size","speed","status","executing","can-edit","is-running","is-paused","has-tape","seed"]),A(xn,{cursor:f(e).cursor.value,"buffered-count":f(e).bufferedCount.value,"fully-buffered":f(e).fullyBuffered.value,"can-step-back":f(e).canStepBack.value,"can-step-forward":f(e).canStepForward.value,onSeek:r[11]||(r[11]=i=>f(e).seek(i)),onStepBack:r[12]||(r[12]=i=>f(e).stepBack()),onStepForward:r[13]||(r[13]=i=>f(e).stepForward()),onSkipToEnd:r[14]||(r[14]=i=>f(e).skipToEnd())},null,8,["cursor","buffered-count","fully-buffered","can-step-back","can-step-forward"])]),h("div",xx,[A(vx,{phase:f(e).phase.value,error:f(e).error.value,"stop-label":f(e).stopLabel.value,"steps-collected":f(e).stepsCollected.value,rejected:s.value,"first-reject-reason":o.value,"elapsed-ms":n.value,"from-shared-link":f(e).fromSharedLink},null,8,["phase","error","stop-label","steps-collected","rejected","first-reject-reason","elapsed-ms","from-shared-link"]),A(vo,{comparisons:f(e).stats.comparisons,swaps:f(e).stats.swaps,steps:f(e).stepCount.value,"elapsed-ms":f(e).elapsedMs.value,status:f(e).status.value},null,8,["comparisons","swaps","steps","elapsed-ms","status"]),A(bo,{class:"flex-1",title:"Your algorithm",array:f(e).array.value,comparing:f(e).highlights.comparing,swapping:f(e).highlights.swapping,sorted:f(e).highlights.sorted,"max-value":f(e).maxValue.value},null,8,["array","comparing","swapping","sorted","max-value"])])]))}}),Sx=5e3,$x=2e3;function Ex(t){let e=t.reduce((s,o)=>s+o,0),n=1;for(const s of t){let o=1;for(let a=1;a<=s;a++)o=o*(e-s+a)/a;if(e-=s,n*=o,!Number.isFinite(n)||n>Number.MAX_SAFE_INTEGER)return 1/0}return Math.round(n)}function Cx(t){const e=t.reduce((r,i)=>r+i,0),n=[],s=t.map(()=>0),o=[];function a(){if(o.length===e){n.push([...o]);return}for(let r=0;r<t.length;r++)s[r]>=t[r]||(s[r]+=1,o.push(r),a(),o.pop(),s[r]-=1)}return a(),n}function Ax(t,e){const n=[...t],s=t.reduce((a,r)=>a+r,0),o=[];for(let a=0;a<s;a++){const r=[];for(let l=0;l<n.length;l++)for(let u=0;u<n[l];u++)r.push(l);const i=e.pick(r);if(i===void 0)break;n[i]-=1,o.push(i)}return o}function Tx(t,e){const n=Rr(t),s=e.threshold??Sx,o=e.sampleCount??$x,a=Ex(n),r=a<s?Cx(n):Ox(n,e.seed,o),i=a<s?"exhaustive":"sampled",l=r.map(u=>vb(t,u));return{mode:i,totalCount:a,checkedCount:l.length,outcomes:l,violatingCount:l.filter(u=>u.violates).length}}function Ox(t,e,n){const s=ot(e),o=new Set,a=[];for(let r=0;r<n;r++){const i=Ax(t,s),l=i.join(",");o.has(l)||(o.add(l),a.push(i))}return a}function Mx(){const t=B(ec),e=B(60),n=B(ze()),s=B([]),o=C(()=>qs[t.value]),a=br(null);function r(){a.value=Tx(o.value,{seed:n.value})}const i=C(()=>{var I;return((I=a.value)==null?void 0:I.outcomes.filter(N=>N.violates))??[]}),l=C(()=>{var I;return((I=a.value)==null?void 0:I.outcomes.filter(N=>!N.violates))??[]}),u=C(()=>{if(!a.value||s.value.length===0)return null;const I=s.value.join(",");return a.value.outcomes.find(N=>N.schedule.join(",")===I)??null}),c=B([]),d=B({}),p=B({}),m=B(null),y=B(!1),g=Ne({executed:0,total:0});function v(){return o.value.createState().threads}function b(){const I=o.value.createState();c.value=I.threads,d.value={...I.shared},p.value={...I.locks},m.value=null,y.value=!1,g.executed=0,g.total=s.value.length}const w=vn({speed:e,createGenerator:()=>s.value.length===0?null:(b(),yc(o.value,s.value)),applyStep:(I,N)=>{c.value=I.threads,d.value=I.sharedMem,p.value=I.lockOwners,m.value=I.lastAction,y.value=I.violated,g.executed=N+1},clearStep:b});function S(I){var j;if(!ar(o.value,I))return!1;s.value=[...I],w.reset();const N=(j=a.value)==null?void 0:j.outcomes.find(he=>he.schedule.join(",")===I.join(","));return N&&N.violates&&(w.stepForward(),w.seek(N.firstViolationIndex)),!0}function $(I=!1){var j;if(r(),g.total=0,I&&s.value.length>0&&ar(o.value,s.value)){S(s.value);return}const N=i.value[0]??((j=a.value)==null?void 0:j.outcomes[0]);N?S(N.schedule):(s.value=[],b())}function _(){n.value=ze()}const{hydrated:P}=Qt(_b({scenarioKey:t,speed:e,seed:n,schedule:s},()=>o.value));$(P.has("sched")),Re(t,()=>{s.value=[],$()}),Re(n,()=>$());const K=C(()=>{const I=a.value;if(!I)return"";const N=I.violatingCount.toLocaleString();if(I.mode==="exhaustive")return`Checked all ${I.checkedCount.toLocaleString()} possible interleavings — ${N} break the invariant.`;const j=Number.isFinite(I.totalCount)?I.totalCount.toLocaleString():"astronomically many";return`Sampled ${I.checkedCount.toLocaleString()} of ${j} possible interleavings — ${N} of those break the invariant.`});return{scenarioKey:t,scenario:o,speed:e,seed:n,schedule:s,search:a,violating:i,clean:l,selected:u,summary:K,threads:c,sharedMem:d,lockOwners:p,lastAction:m,violatedNow:y,stats:g,idleThreads:v,status:w.status,isRunning:w.isRunning,isPaused:w.isPaused,isDone:w.isDone,canEdit:w.canEdit,elapsedMs:w.elapsedMs,stepCount:w.stepCount,cursor:w.cursor,bufferedCount:w.bufferedCount,fullyBuffered:w.fullyBuffered,current:w.current,canStepBack:w.canStepBack,canStepForward:w.canStepForward,analyse:$,selectSchedule:S,randomizeSeed:_,run:w.run,pause:w.pause,reset:w.reset,stepForward:w.stepForward,stepBack:w.stepBack,seek:w.seek,skipToEnd:w.skipToEnd}}const _x={class:"flex flex-col gap-2"},Rx={class:"block"},jx={class:"block font-semibold"},Ix={class:"block text-[11px] opacity-80"},Dx={class:"mt-3 rounded-lg bg-warn-soft px-3 py-2 text-xs text-warn-ink"},Lx={class:"mt-4 grid grid-cols-2 gap-2"},Nx={class:"mt-4 flex flex-col gap-3"},Px=se({__name:"ConcurrencyControls",props:qn({status:{},canEdit:{type:Boolean},isRunning:{type:Boolean},isPaused:{type:Boolean},hasSchedule:{type:Boolean},seed:{}},{scenario:{required:!0},scenarioModifiers:{},speed:{required:!0},speedModifiers:{}}),emits:qn(["run","pause","reset","randomize","update:seed"],["update:scenario","update:speed"]),setup(t,{emit:e}){const n=Kn(t,"scenario"),s=Kn(t,"speed"),o=e,a=Object.entries(qs);function r(i){const l=Number(i);Number.isInteger(l)&&o("update:seed",l)}return(i,l)=>(x(),Y(we,{title:"Scenario"},{default:D(()=>[h("div",_x,[(x(!0),T(te,null,de(f(a),([u,c])=>(x(),Y(Z,{key:u,variant:"selector",class:"text-left",active:n.value===u,disabled:!t.canEdit,onClick:d=>n.value=u},{default:D(()=>[h("span",Rx,[h("span",jx,R(c.name),1),h("span",Ix,R(c.description),1)])]),_:2},1032,["active","disabled","onClick"]))),128))]),h("p",Dx,R(f(qs)[n.value].bug),1),h("div",Lx,[t.isRunning?(x(),Y(Z,{key:0,variant:"warning",onClick:l[0]||(l[0]=u=>o("pause"))},{default:D(()=>[...l[5]||(l[5]=[M("❚❚ Pause",-1)])]),_:1})):(x(),Y(Z,{key:1,variant:"primary",disabled:!t.hasSchedule,onClick:l[1]||(l[1]=u=>o("run"))},{default:D(()=>[M(R(t.isPaused?"▶ Resume":"▶ Play"),1)]),_:1},8,["disabled"])),A(Z,{variant:"neutral",disabled:!t.hasSchedule,onClick:l[2]||(l[2]=u=>o("reset"))},{default:D(()=>[...l[6]||(l[6]=[M("Reset",-1)])]),_:1},8,["disabled"])]),h("div",Nx,[A(Ve,{modelValue:s.value,"onUpdate:modelValue":l[3]||(l[3]=u=>s.value=u),label:"Speed",min:1,max:100,suffix:"%"},null,8,["modelValue"]),A(kt,{label:"Seed",monospace:"","model-value":String(t.seed),disabled:!t.canEdit,"onUpdate:modelValue":r},null,8,["model-value","disabled"]),A(Z,{variant:"quiet",disabled:!t.canEdit,onClick:l[4]||(l[4]=u=>o("randomize"))},{default:D(()=>[...l[7]||(l[7]=[M("New seed",-1)])]),_:1},8,["disabled"]),l[8]||(l[8]=h("p",{class:"text-[11px] text-ink-faint"}," The seed only matters once a scenario is too large to check exhaustively — then it picks which interleavings get sampled. ",-1))])]),_:1}))}}),Bx=se({__name:"ConcurrencyGuide",setup(t){return(e,n)=>(x(),Y(Zs,{title:"How to read this",summary:"Same code, different orderings. Some orderings are buggy — this finds which.","start-open":""},{default:D(()=>[...n[0]||(n[0]=[h("p",{class:"mb-3 text-ink-muted"},[M(" Two threads run at the same time, so their instructions can land in many different orders. The code never changes; only the "),h("em",null,"ordering"),M(" does. Most concurrency bugs are orderings that happen to be rare — which is exactly why they survive testing and surface in production. This page enumerates the orderings instead of waiting to get unlucky. ")],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint"}," Reading an interleaving ",-1),h("p",{class:"mb-3 text-ink-muted"},[M(" Each chip is one complete ordering, written as letters: "),h("code",{class:"font-mono text-xs"},"A"),M(" means T0 takes its next step, "),h("code",{class:"font-mono text-xs"},"B"),M(" means T1 does. So "),h("code",{class:"font-mono text-xs"},"ABABAB"),M(" is strict alternation, and "),h("code",{class:"font-mono text-xs"},"AAABBB"),M(" is T0 finishing completely before T1 starts. "),h("span",{class:"font-semibold text-danger"},"Chips that break the invariant are marked"),M("; click any chip to load it, and playback jumps straight to the step where it first goes wrong. ")],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint"}," The two scenarios ",-1),h("ul",{class:"mb-4 space-y-2 text-ink-muted"},[h("li",null,[h("b",null,"Racy counter."),M(),h("code",{class:"font-mono text-xs"},"counter = counter + 1"),M(" is three machine steps, not one: read, add, write. If both threads read before either writes, they both compute the same value and one increment vanishes. Only the two orderings where one thread finishes first are safe. ")]),h("li",null,[h("b",null,"Mutex violation."),M(" Checking whether a lock is free and taking it are separate steps, so both threads can see it free and both walk in. Watch for two lanes showing "),h("em",null,"in critical section"),M(" at once — and note the state looks perfectly fine again by the last step, which is why this bug is so hard to catch after the fact. ")])],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint"}," “Checked all” vs “sampled” ",-1),h("p",{class:"mb-2 text-ink-muted"},[M(" The number of orderings explodes as threads and instructions grow — two threads of three steps is 20, but five threads of four is over 300 billion. When the total is small enough, every single ordering is executed and checked, and the panel says "),h("b",null,"checked all N"),M(". When it is not, orderings are sampled instead and the panel says so. Both scenarios here are small enough to check exhaustively, so nothing is being missed. ")],-1),h("p",{class:"text-ink-faint"}," The seed only matters in sampled mode, where it decides which orderings get drawn. Sharing the URL reproduces the exact interleaving you are looking at. ",-1)])]),_:1}))}}),Fx={class:"mb-3 text-xs text-ink-muted"},Hx={class:"flex max-h-52 flex-wrap gap-1.5 overflow-y-auto",role:"listbox"},Vx=["aria-selected","title","onClick"],Ux={key:0,class:"nums mt-2 text-xs text-ink-faint"},zx=se({__name:"ScheduleList",props:{outcomes:{},selected:{},summary:{},limit:{default:240}},emits:["select"],setup(t,{emit:e}){const n=t,s=e,o=C(()=>n.selected.join(",")),a=C(()=>[...n.outcomes].sort((u,c)=>Number(c.violates)-Number(u.violates))),r=C(()=>a.value.slice(0,n.limit)),i=C(()=>Math.max(0,a.value.length-r.value.length));function l(u){return u.map(c=>String.fromCharCode(65+c)).join("")}return(u,c)=>(x(),Y(we,{title:"Interleavings"},{default:D(()=>[h("p",Fx,R(t.summary),1),h("div",Hx,[(x(!0),T(te,null,de(r.value,d=>(x(),T("button",{key:d.schedule.join(","),type:"button",role:"option","aria-selected":d.schedule.join(",")===o.value,title:d.violates?"Breaks the invariant":"Invariant holds throughout",class:ve(["rounded-lg border px-2 py-1 font-mono text-[11px] font-semibold transition-colors",[d.violates?"border-danger/40 bg-danger-soft text-danger hover:border-danger":"border-line text-ink-muted hover:border-accent",d.schedule.join(",")===o.value?"outline outline-2 outline-offset-1 outline-accent":""]]),onClick:p=>s("select",d.schedule)},R(l(d.schedule)),11,Vx))),128))]),i.value>0?(x(),T("p",Ux," + "+R(i.value.toLocaleString())+" more not shown. ",1)):pe("",!0),c[0]||(c[0]=h("p",{class:"mt-3 text-[11px] text-ink-faint"}," Each letter is a thread taking one step. A = T0, B = T1. ",-1))]),_:1}))}}),qx={class:"mb-4 text-xs text-ink-faint"},Kx={class:"flex flex-col gap-3"},Gx={class:"flex items-center gap-2"},Wx={class:"font-mono text-xs font-bold text-ink-muted"},Yx={class:"flex gap-1.5 overflow-x-auto pb-1"},Xx={class:"mt-4 border-t border-line pt-3"},Jx={class:"flex flex-wrap gap-2"},Qx={key:0,class:"mt-3 font-mono text-xs text-ink-faint"},Zx=se({__name:"ThreadLanes",props:{scenario:{},threads:{},sharedMem:{},lockOwners:{},lastAction:{},violated:{type:Boolean}},setup(t){const e=t,n=C(()=>e.scenario.threads.map((i,l)=>{var c;const u=e.threads[l];return{name:i.name,instructions:i.instructions,pc:(u==null?void 0:u.pc)??0,status:(u==null?void 0:u.status)??"ready",locals:(u==null?void 0:u.locals)??{},activeIndex:((c=e.lastAction)==null?void 0:c.threadId)===l&&u?u.pc-1:-1}})),s=C(()=>Object.entries(e.sharedMem)),o=C(()=>Object.entries(e.lockOwners));function a(i,l){const u=n.value[i];return l===u.activeIndex?u.status==="critical"?`${Qe.blocked} ${Ct.blocked} ${Bn.blocked}`:`${Qe.active} ${Ct.active} ${Bn.active}`:l<u.pc?`${Qe.settled} ${Ct.settled} ${Bn.settled}`:`${Qe.idle} ${Bn.idle}`}const r={ready:"bg-surface-alt text-ink-muted",critical:"bg-danger-soft text-danger-ink",done:"bg-ok-soft text-ok-ink"};return(i,l)=>(x(),Y(we,{class:"flex h-full flex-col",title:"Threads"},{header:D(()=>[h("span",{class:ve(["rounded-full px-2.5 py-0.5 text-xs font-semibold",t.violated?"bg-danger-soft text-danger-ink":"bg-ok-soft text-ok-ink"])},R(t.violated?"✕ invariant broken":"✓ invariant holds"),3)]),default:D(()=>[h("p",qx,R(t.scenario.invariant.label),1),h("div",Kx,[(x(!0),T(te,null,de(n.value,(u,c)=>(x(),T("div",{key:u.name,class:"flex flex-col gap-1.5"},[h("div",Gx,[h("span",Wx,R(u.name),1),h("span",{class:ve(["rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",r[u.status]])},R(u.status==="critical"?"in critical section":u.status),3),(x(!0),T(te,null,de(u.locals,(d,p)=>(x(),T("span",{key:p,class:"font-mono text-[11px] text-ink-faint"},R(p)+"="+R(d),1))),128))]),h("div",Yx,[(x(!0),T(te,null,de(u.instructions,(d,p)=>(x(),T("span",{key:p,class:ve(["whitespace-nowrap rounded-lg border px-2.5 py-1.5 font-mono text-[11px] transition-colors",a(c,p)])},R(d.label),3))),128))])]))),128))]),h("div",Xx,[h("div",Jx,[(x(!0),T(te,null,de(s.value,([u,c])=>(x(),T("span",{key:u,class:"rounded-lg bg-surface-alt px-2.5 py-1.5 font-mono text-xs text-ink-muted"},R(u)+": "+R(c),1))),128)),(x(!0),T(te,null,de(o.value,([u,c])=>(x(),T("span",{key:u,class:ve(["rounded-lg px-2.5 py-1.5 font-mono text-xs",c===null?"bg-surface-alt text-ink-muted":"bg-warn-soft text-warn-ink"])}," lock "+R(u)+": "+R(c===null?"free":`held by T${c}`),3))),128))]),t.lastAction?(x(),T("p",Qx," T"+R(t.lastAction.threadId)+" ran “"+R(t.lastAction.instruction)+"” ",1)):pe("",!0)])]),_:1}))}}),e1={class:"grid gap-4 lg:grid-cols-[minmax(0,360px)_1fr]"},t1={class:"flex flex-col gap-4"},n1={class:"flex flex-col gap-4"},s1={class:"mb-3 grid grid-cols-2 gap-2 sm:grid-cols-4"},o1={class:"text-sm text-ink-muted"},a1=se({__name:"ConcurrencyView",setup(t){const e=Mx(),n=C(()=>e.selected.value),s=C(()=>{const i=n.value;return i?i.violates?`This ordering breaks the invariant, first at step ${i.firstViolationIndex+1}.`:"This ordering is safe — the invariant holds at every step.":"No interleaving selected."}),o=C(()=>{var i;return(i=n.value)!=null&&i.violates?"error":"running"}),a=C(()=>{var i;return(i=n.value)!=null&&i.violates?"Buggy ordering":"Safe ordering"}),r=C(()=>{var i,l,u;return[{label:"Step",value:`${e.stats.executed} / ${e.stats.total}`},{label:"Broken",value:(((i=e.search.value)==null?void 0:i.violatingCount)??0).toLocaleString()},{label:"Checked",value:(((l=e.search.value)==null?void 0:l.checkedCount)??0).toLocaleString()},{label:"Coverage",value:((u=e.search.value)==null?void 0:u.mode)==="exhaustive"?"all":"sampled"}]});return(i,l)=>{var u;return x(),T("div",e1,[h("div",t1,[A(Bx),A(Px,{scenario:f(e).scenarioKey.value,"onUpdate:scenario":l[0]||(l[0]=c=>f(e).scenarioKey.value=c),speed:f(e).speed.value,"onUpdate:speed":l[1]||(l[1]=c=>f(e).speed.value=c),status:f(e).status.value,"can-edit":f(e).canEdit.value,"is-running":f(e).isRunning.value,"is-paused":f(e).isPaused.value,"has-schedule":f(e).schedule.value.length>0,seed:f(e).seed.value,onRun:l[2]||(l[2]=c=>f(e).run()),onPause:l[3]||(l[3]=c=>f(e).pause()),onReset:l[4]||(l[4]=c=>f(e).reset()),onRandomize:l[5]||(l[5]=c=>f(e).randomizeSeed()),"onUpdate:seed":l[6]||(l[6]=c=>f(e).seed.value=c)},null,8,["scenario","speed","status","can-edit","is-running","is-paused","has-schedule","seed"]),A(xn,{cursor:f(e).cursor.value,"buffered-count":f(e).bufferedCount.value,"fully-buffered":f(e).fullyBuffered.value,"can-step-back":f(e).canStepBack.value,"can-step-forward":f(e).canStepForward.value,onSeek:l[7]||(l[7]=c=>f(e).seek(c)),onStepBack:l[8]||(l[8]=c=>f(e).stepBack()),onStepForward:l[9]||(l[9]=c=>f(e).stepForward()),onSkipToEnd:l[10]||(l[10]=c=>f(e).skipToEnd())},null,8,["cursor","buffered-count","fully-buffered","can-step-back","can-step-forward"])]),h("div",n1,[A(we,{title:"Search"},{header:D(()=>[A(Sn,{status:o.value,label:a.value},null,8,["status","label"])]),default:D(()=>[h("div",s1,[(x(!0),T(te,null,de(r.value,c=>(x(),Y(Dt,{key:c.label,label:c.label,value:c.value},null,8,["label","value"]))),128))]),h("p",o1,R(s.value),1)]),_:1}),A(zx,{outcomes:((u=f(e).search.value)==null?void 0:u.outcomes)??[],selected:f(e).schedule.value,summary:f(e).summary.value,onSelect:l[11]||(l[11]=c=>f(e).selectSchedule(c))},null,8,["outcomes","selected","summary"]),A(Zx,{class:"flex-1",scenario:f(e).scenario.value,threads:f(e).threads.value,"shared-mem":f(e).sharedMem.value,"lock-owners":f(e).lockOwners.value,"last-action":f(e).lastAction.value,violated:f(e).violatedNow.value},null,8,["scenario","threads","shared-mem","lock-owners","last-action","violated"])])])}}}),r1={key:0,class:"text-sm text-ink-muted"},i1={key:1,class:"space-y-3"},l1={key:0,class:"text-sm text-ink-muted"},u1={key:1,class:"break-words rounded-xl bg-surface-alt p-3 font-mono text-sm text-ink sm:text-base"},c1={key:2,class:"space-y-1.5 text-sm"},d1={class:"text-ink-muted"},Dr=se({__name:"AvStepInspector",props:{title:{default:"Why this step"},headline:{default:null},formula:{default:null},rows:{default:()=>[]},empty:{default:"Run a step to see how it was computed."}},setup(t){const e=t,n={neutral:"text-ink",good:"text-ok-ink",warn:"text-warn-ink",bad:"text-danger-ink"};function s(a){return n[a??"neutral"]}const o=C(()=>!e.headline&&!e.formula&&e.rows.length===0);return(a,r)=>(x(),Y(we,{title:t.title},{default:D(()=>[o.value?(x(),T("p",r1,R(t.empty),1)):(x(),T("div",i1,[t.headline?(x(),T("p",l1,R(t.headline),1)):pe("",!0),t.formula?(x(),T("div",u1,R(t.formula),1)):pe("",!0),t.rows.length?(x(),T("dl",c1,[(x(!0),T(te,null,de(t.rows,i=>(x(),T("div",{key:i.label,class:"flex items-center justify-between gap-3"},[h("dt",d1,R(i.label),1),h("dd",{class:ve(["break-words text-right font-mono",s(i.tone)])},R(i.value),3)]))),128))])):pe("",!0)]))]),_:1},8,["title"]))}}),p1={class:"mt-5 grid grid-cols-2 gap-2"},f1={class:"mt-3 text-center text-xs text-ink-faint"},h1=se({__name:"DpControls",props:{speed:{},status:{},canEdit:{type:Boolean},isRunning:{type:Boolean},isPaused:{type:Boolean},canRun:{type:Boolean}},emits:["update:speed","run","pause","reset","step"],setup(t,{emit:e}){const n=t,s=e,o=C(()=>n.canRun?n.canEdit?"Editing the input clears the table and starts over.":"The algorithm and its input lock while the table fills.":"Fix the input before running.");return(a,r)=>(x(),Y(we,{title:"Controls"},{default:D(()=>[A(Ve,{label:"Speed","model-value":t.speed,min:1,max:100,suffix:"%","onUpdate:modelValue":r[0]||(r[0]=i=>s("update:speed",i))},null,8,["model-value"]),h("div",p1,[t.isRunning?(x(),Y(Z,{key:1,variant:"warning",class:"col-span-2",onClick:r[2]||(r[2]=i=>s("pause"))},{default:D(()=>[...r[6]||(r[6]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M6 4h4v16H6zM14 4h4v16h-4z"})],-1),M(" Pause ",-1)])]),_:1})):(x(),Y(Z,{key:0,variant:"primary",class:"col-span-2",disabled:!t.canRun,onClick:r[1]||(r[1]=i=>s("run"))},{default:D(()=>[r[5]||(r[5]=h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M8 5v14l11-7z"})],-1)),M(" "+R(t.isPaused?"Resume":"Run"),1)]),_:1},8,["disabled"])),A(Z,{variant:"neutral",onClick:r[3]||(r[3]=i=>s("reset"))},{default:D(()=>[...r[7]||(r[7]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.36 2.64L3 8"}),h("path",{d:"M3 3v5h5"})],-1),M(" Reset ",-1)])]),_:1}),A(Z,{variant:"neutral",disabled:!t.canRun,onClick:r[4]||(r[4]=i=>s("step"))},{default:D(()=>[...r[8]||(r[8]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M6 5v14l9-7z"}),h("path",{d:"M17 5h2v14h-2z"})],-1),M(" Step ",-1)])]),_:1},8,["disabled"])]),h("p",f1,R(o.value),1)]),_:1}))}}),m1=se({__name:"DpGuide",setup(t){return(e,n)=>(x(),Y(Zs,{title:"How to read this",summary:"Every cell is a smaller version of the same question, answered once and reused.","start-open":""},{default:D(()=>[...n[0]||(n[0]=[h("p",{class:"mb-3 text-ink-muted"},[M(" A dynamic programming table is a list of subproblems with their answers written down. Each cell asks a smaller version of the same question — "),h("em",null,"what is the best I can do with the first 3 items and a capacity of 5?"),M(" — and the recurrence at the top of the table says how to answer it using cells that are already filled in. Nothing is ever computed twice, which is the entire trick: the naive recursion asks the same subproblem over and over, and the table simply refuses to. ")],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint"}," Reading the arrows ",-1),h("p",{class:"mb-3 text-ink-muted"},[M(" The "),h("span",{class:"font-semibold text-tone-active-ink"},"cell being computed right now"),M(" is highlighted. The "),h("span",{class:"font-semibold text-tone-trace-ink"},"cells its recurrence read"),M(" are highlighted too, and an arrow runs from each of them into it. Where the recurrence has to "),h("em",null,"choose"),M(" — take the item or skip it, insert or delete or substitute — the "),h("span",{class:"font-semibold text-tone-active-ink"},"chosen branch"),M(" is drawn thicker, and the others stay thin. That thicker arrow is the decision the traceback will later follow back. ")],-1),h("p",{class:"mb-3 text-ink-muted"},[M(" Hover any cell — filled or not, at any point in the run — to see the arrows for "),h("em",null,"that"),M(" cell instead, drawn dashed. They come from the same function the animation uses, so what you see on hover is exactly what the algorithm would read. ")],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint"}," The traceback ",-1),h("p",{class:"mb-3 text-ink-muted"},[M(" Filling the table answers the question with a "),h("em",null,"number"),M(": the length of the longest common subsequence, the cost of the cheapest parenthesisation. It does not, by itself, tell you "),h("em",null,"which"),M(" subsequence or "),h("em",null,"which"),M(" parenthesisation. The "),h("span",{class:"font-semibold text-tone-trace-ink"},"traceback path"),M(" is the second pass that recovers it, walking backwards from the answer cell and, at each step, asking which branch won there. That is why the traceback lights up a thin path through a large table — most of the cells were needed to be sure, but only a few are part of the answer. ")],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint"}," Cells versus calls ",-1),h("p",{class:"text-ink-faint"},[M(" The stats panel counts both: the cells this table costs, and the calls the naive recursion would have made on the same input. Fibonacci at n = 40 is 41 cells against 331 million calls. The call counts are exact, not estimated — and where one grows past what a JavaScript number can hold exactly, it is shown as a lower bound ("),h("code",{class:"font-mono text-xs"},"> 9.0e15"),M(") rather than as a wrong-looking round number. ")],-1)])]),_:1}))}}),g1={class:"space-y-4"},b1={class:"text-xs text-ink-faint"},v1={key:0,class:"mt-3 text-xs text-danger"},y1={key:1,class:"mt-3 text-xs text-ink-faint"},w1={class:"mt-4"},x1=se({__name:"DpInputPanel",props:{algoKey:{},input:{},canEdit:{type:Boolean}},emits:["update:input","shuffle"],setup(t,{emit:e}){const n=t,s=e,o=Ne({n:12,coins:"",amount:11,values:"",weights:"",itemValues:"",capacity:9,a:"",b:"",dims:""});let a="";const r=C(()=>Gt[n.algoKey]),i=C(()=>Pu(r.value,n.input)),l=C(()=>r.value.kind),u=C(()=>{const b=i.value.axes.colTitle||"size";return b.charAt(0).toUpperCase()+b.slice(1)}),c=C(()=>{const{rows:b,cols:w}=i.value.dims;return{rows:b,cols:w,cells:b*w}});function d(){const b=Ln(o.weights,{min:1,max:99,maxLength:30});if(b.error)return{items:null,error:b.error};const S=o.itemValues.trim()===""?{values:b.values.map(()=>0),error:null}:Ln(o.itemValues,{min:0,max:999,maxLength:30});return S.error?{items:null,error:S.error}:S.values.length!==b.values.length?{items:null,error:`Give one value per weight — ${b.values.length} weights, ${S.values.length} values.`}:{items:b.values.map(($,_)=>({weight:$,value:S.values[_]})),error:null}}const p=C(()=>{switch(l.value){case"scalar":return{input:{kind:"scalar",n:o.n},error:null};case"coins":{const b=Ln(o.coins,{min:1,max:99,maxLength:8});return b.error?{input:null,error:b.error}:{input:{kind:"coins",coins:b.values,amount:o.amount},error:null}}case"sequence":{const b=Ln(o.values,{min:1,max:99,maxLength:40});return b.error?{input:null,error:b.error}:{input:{kind:"sequence",values:b.values},error:null}}case"items":{const{items:b,error:w}=d();return b===null?{input:null,error:w}:{input:{kind:"items",items:b,capacity:o.capacity},error:null}}case"strings2":return{input:{kind:"strings2",a:o.a,b:o.b},error:null};case"chain":{const b=Ln(o.dims,{min:1,max:999,maxLength:31});return b.error?{input:null,error:b.error}:{input:{kind:"chain",dims:b.values},error:null}}}return{input:null,error:null}}),m=C(()=>p.value.error!==null?p.value.error:p.value.input===null?null:Ro(r.value,p.value.input));function y(){const b=p.value.input;b!==null&&Ro(r.value,b)===null&&(a=Ls(b),s("update:input",b))}function g(b,w){o[b]=w,y()}function v(b){switch(b.kind){case"scalar":o.n=b.n;break;case"coins":o.coins=b.coins.join(", "),o.amount=b.amount;break;case"sequence":o.values=b.values.join(", ");break;case"items":o.weights=b.items.map(w=>w.weight).join(", "),o.itemValues=b.items.map(w=>w.value).join(", "),o.capacity=b.capacity;break;case"strings2":o.a=b.a,o.b=b.b;break;case"chain":o.dims=b.dims.join(", ");break}a=Ls(b)}return Re(()=>n.input,b=>{Ls(b)!==a&&v(b)},{immediate:!0,deep:!0}),(b,w)=>(x(),Y(we,{title:"Input"},{default:D(()=>[h("div",g1,[l.value==="scalar"?(x(),Y(Ve,{key:0,label:"n","model-value":o.n,min:0,max:40,disabled:!t.canEdit,"onUpdate:modelValue":w[0]||(w[0]=S=>g("n",S))},null,8,["model-value","disabled"])):l.value==="coins"?(x(),T(te,{key:1},[A(kt,{label:"Coin values",placeholder:"1, 3, 4",monospace:"","model-value":o.coins,disabled:!t.canEdit,"onUpdate:modelValue":w[1]||(w[1]=S=>g("coins",S))},null,8,["model-value","disabled"]),A(Ve,{label:u.value,"model-value":o.amount,min:0,max:60,disabled:!t.canEdit,"onUpdate:modelValue":w[2]||(w[2]=S=>g("amount",S))},null,8,["label","model-value","disabled"])],64)):l.value==="sequence"?(x(),Y(kt,{key:2,label:"Sequence",placeholder:"3, 10, 2, 1, 20",monospace:"","model-value":o.values,disabled:!t.canEdit,"onUpdate:modelValue":w[3]||(w[3]=S=>g("values",S))},null,8,["model-value","disabled"])):l.value==="items"?(x(),T(te,{key:3},[A(kt,{label:"Item weights",placeholder:"2, 3, 4, 5",monospace:"","model-value":o.weights,disabled:!t.canEdit,"onUpdate:modelValue":w[4]||(w[4]=S=>g("weights",S))},null,8,["model-value","disabled"]),A(kt,{label:"Item values (blank = all zero)",placeholder:"3, 4, 5, 8",monospace:"","model-value":o.itemValues,disabled:!t.canEdit,"onUpdate:modelValue":w[5]||(w[5]=S=>g("itemValues",S))},null,8,["model-value","disabled"]),A(Ve,{label:u.value,"model-value":o.capacity,min:0,max:60,disabled:!t.canEdit,"onUpdate:modelValue":w[6]||(w[6]=S=>g("capacity",S))},null,8,["label","model-value","disabled"])],64)):l.value==="strings2"?(x(),T(te,{key:4},[A(kt,{label:"String a (rows)",placeholder:"kitten",monospace:"","model-value":o.a,disabled:!t.canEdit,"onUpdate:modelValue":w[7]||(w[7]=S=>g("a",S))},null,8,["model-value","disabled"]),A(kt,{label:"String b (columns)",placeholder:"sitting",monospace:"","model-value":o.b,disabled:!t.canEdit,"onUpdate:modelValue":w[8]||(w[8]=S=>g("b",S))},null,8,["model-value","disabled"])],64)):(x(),T(te,{key:5},[A(kt,{label:"Matrix dimensions",placeholder:"40, 20, 30, 10, 30",monospace:"","model-value":o.dims,disabled:!t.canEdit,"onUpdate:modelValue":w[9]||(w[9]=S=>g("dims",S))},null,8,["model-value","disabled"]),h("p",b1,R(c.value.rows)+" matrices — dimension i and i + 1 are the shape of matrix i. ",1)],64))]),m.value?(x(),T("p",v1,R(m.value),1)):(x(),T("p",y1," Table: "+R(c.value.rows)+" × "+R(c.value.cols)+" = "+R(c.value.cells.toLocaleString())+" cells (limit "+R(f(Ka).toLocaleString())+"). ",1)),h("div",w1,[A(Z,{variant:"quiet",class:"w-full",disabled:!t.canEdit,onClick:w[10]||(w[10]=S=>s("shuffle"))},{default:D(()=>[...w[11]||(w[11]=[M(" Shuffle input ",-1)])]),_:1},8,["disabled"])])]),_:1}))}}),Lr=se({__name:"AvStatGrid",props:{cells:{},columns:{default:4}},setup(t){const e={2:"grid grid-cols-2 gap-2",3:"grid grid-cols-2 gap-2 sm:grid-cols-3",4:"grid grid-cols-2 gap-2 sm:grid-cols-4"};return(n,s)=>(x(),T("div",{class:ve(e[t.columns])},[(x(!0),T(te,null,de(t.cells,o=>(x(),Y(Dt,{key:o.label,label:o.label,value:o.value},null,8,["label","value"]))),128))],2))}}),k1={key:0,class:"mb-3 break-words rounded-xl bg-ok-soft p-3 text-center text-sm font-semibold text-ok-ink"},S1={key:1,class:"mb-3 rounded-xl bg-warn-soft p-3 text-center text-xs font-semibold text-warn-ink"},$1=se({__name:"DpStats",props:{cellsFilled:{},fillable:{},rows:{},cols:{},naiveCalls:{},speedup:{},steps:{},elapsedMs:{},status:{},result:{},truncated:{type:Boolean}},setup(t){const e=t,n=C(()=>e.speedup<=0?"—":`${Fu(e.naiveCalls)?"> ":""}${ji(Math.round(e.speedup))}×`),s=C(()=>[{label:"Cells filled",value:`${e.cellsFilled.toLocaleString()} / ${e.fillable.toLocaleString()}`},{label:"Naive calls",value:ji(e.naiveCalls)},{label:"Cheaper by",value:n.value},{label:"Table",value:`${e.rows} × ${e.cols}`},{label:"Steps",value:e.steps.toLocaleString()},{label:"Elapsed",value:`${(e.elapsedMs/1e3).toFixed(2)}s`}]);return(o,a)=>(x(),Y(we,{title:"Stats"},{header:D(()=>[A(Sn,{status:t.status},null,8,["status"])]),default:D(()=>[t.result?(x(),T("div",k1,R(t.result),1)):pe("",!0),t.truncated?(x(),T("div",S1," The step cap stopped this run early — the counts below are partial. ")):pe("",!0),A(Lr,{cells:s.value,columns:3},null,8,["cells"])]),_:1}))}}),E1=34,C1=4,A1=40,T1=6;function hl(t,e,n,s=0){const o=n.x-t.x,a=n.y-t.y,r=Math.hypot(o,a);if(r===0)return{x:t.x,y:t.y};const i=o/r,l=a/r,u=i===0?1/0:e.w/Math.abs(i),c=l===0?1/0:e.h/Math.abs(l),d=Math.min(u,c)+s;return{x:t.x+i*d,y:t.y+l*d}}function O1(t){const e=Math.max(0,t.rows),n=Math.max(0,t.cols),s=t.cell??E1,o=t.gap??C1,a=t.header??A1,r=t.pad??T1,i=s+o,l=r+a,u=r+a,c=n===0?l+r:l+n*i-o+r,d=e===0?u+r:u+e*i-o+r,p={w:s/2,h:s/2},m=(g,v)=>({x:l+v*i,y:u+g*i,w:s,h:s}),y=(g,v)=>({x:l+v*i+s/2,y:u+g*i+s/2});return{rows:e,cols:n,cell:s,gap:o,header:a,pad:r,width:c,height:d,viewBox:`0 0 ${c} ${d}`,cellRect:m,center:y,rowHeaderRect:g=>({x:r,y:u+g*i,w:a,h:s}),colHeaderRect:g=>({x:l+g*i,y:r,w:s,h:a}),arrow:(g,v)=>{if(g.row===v.row&&g.col===v.col)return null;const b=y(g.row,g.col),w=y(v.row,v.col),S=hl(b,p,w,1),$=hl(w,p,b,3);return{x1:S.x,y1:S.y,x2:$.x,y2:$.y}}}}const M1={class:"mb-3 flex flex-wrap items-center gap-x-4 gap-y-2"},_1={class:"text-xs font-semibold uppercase tracking-wider text-ink-faint"},R1={key:0,class:"rounded-lg bg-surface-alt px-2 py-1 font-mono text-xs text-accent"},j1=["width","height","viewBox"],I1=["x","y"],D1=["x","y"],L1=["x","y"],N1=["x","y"],P1=["aria-label","data-cell","data-tone","onPointerenter"],B1=["x","y","width","height"],F1=["x","y","font-size"],H1={class:"pointer-events-none"},V1=["x1","y1","x2","y2"],U1=["x1","y1","x2","y2","stroke-width","marker-end"],z1=se({__name:"DpTable",props:{table:{},axes:{},recurrence:{default:""},cursor:{default:null},deps:{default:()=>[]},chosen:{default:null},path:{default:()=>[]},hoverCell:{default:null},hoverDeps:{default:()=>[]},title:{default:"Table"}},emits:["hover-cell"],setup(t,{emit:e}){const n=t,s=e,o={empty:"fill-tone-idle-soft",filled:"fill-tone-settled-soft",path:"fill-tone-trace-soft",dep:"fill-tone-trace-soft",focus:"fill-tone-probe-soft/60",filling:"fill-tone-active-soft"},a=kn([{tone:"idle",label:"Not computed"},{tone:"settled",label:"Computed"},{tone:"active",label:"Filling now"},{tone:"trace",label:"Read by this cell"},{tone:"trace",label:"Traceback"}]);function r(I){return`${I.row},${I.col}`}const i=C(()=>n.table.length),l=C(()=>{var I;return((I=n.table[0])==null?void 0:I.length)??0}),u=C(()=>O1({rows:i.value,cols:l.value})),c=C(()=>new Set(n.deps.map(r))),d=C(()=>new Set(n.hoverDeps.map(r))),p=C(()=>new Set(n.path.map(r)));function m(I,N){const j=`${I},${N}`;return n.cursor&&n.cursor.row===I&&n.cursor.col===N?"filling":n.hoverCell&&n.hoverCell.row===I&&n.hoverCell.col===N?"focus":c.value.has(j)||d.value.has(j)?"dep":p.value.has(j)?"path":n.table[I][N]===null?"empty":"filled"}function y(I){return Math.round(Math.min(13,50/Math.max(1,I.length))*2)/2}function g(I){return I.length>7?`${I.slice(0,6)}…`:I}const v={empty:"",filled:"",filling:", being computed now",focus:"",dep:", read by the current cell",path:", on the traceback path"},b=C(()=>{const I=[];for(let N=0;N<i.value;N++)for(let j=0;j<l.value;j++){const he=n.table[N][j],Se=Wn(he),z=m(N,j),ae=n.axes.rowHeaders[N]??String(N),L=n.axes.colHeaders[j]??String(j);I.push({key:`${N},${j}`,row:N,col:j,rect:u.value.cellRect(N,j),text:Se,fontSize:y(Se),tone:z,label:he===null?`${ae} by ${L}: not computed yet`:`${ae} by ${L}: ${Se}${v[z]}`})}return I}),w=C(()=>Array.from({length:l.value},(I,N)=>{const j=n.axes.colHeaders[N]??String(N),he=u.value.colHeaderRect(N);return{key:N,x:he.x+u.value.cell/2,y:he.y+he.h-8,text:g(j),full:j}})),S=C(()=>Array.from({length:i.value},(I,N)=>{const j=n.axes.rowHeaders[N]??String(N),he=u.value.rowHeaderRect(N);return{key:N,x:he.x+he.w-6,y:he.y+he.h/2,text:g(j),full:j}}));function $(I,N,j){if(I===null)return[];const he=new Set,Se=[];for(const z of N){const ae=r(z);if(he.has(ae))continue;he.add(ae);const L=u.value.arrow(z,I);L!==null&&Se.push({key:ae,...L,chosen:j!==null&&j.row===z.row&&j.col===z.col,label:z.label})}return Se.sort((z,ae)=>Number(z.chosen)-Number(ae.chosen))}const _=C(()=>$(n.cursor,n.deps,n.chosen)),P=C(()=>{const I=n.hoverCell;return I===null?[]:n.cursor&&n.cursor.row===I.row&&n.cursor.col===I.col?[]:$(I,n.hoverDeps,null)});function K(I,N){s("hover-cell",{row:I,col:N})}return(I,N)=>(x(),Y(we,{class:"flex h-full flex-col"},{default:D(()=>[h("div",M1,[h("h2",_1,R(t.title),1),t.recurrence?(x(),T("code",R1,R(t.recurrence),1)):pe("",!0),A(_n,{items:f(a)},null,8,["items"])]),h("div",{class:"max-h-[60vh] flex-1 overflow-auto rounded-xl bg-surface-alt p-3",onPointerleave:N[0]||(N[0]=j=>s("hover-cell",null))},[(x(),T("svg",{width:u.value.width,height:u.value.height,viewBox:u.value.viewBox,class:"block select-none"},[N[1]||(N[1]=h("defs",null,[h("marker",{id:"dp-arrowhead",viewBox:"0 0 8 8",refX:"7",refY:"4",markerWidth:"5",markerHeight:"5",orient:"auto-start-reverse"},[h("path",{d:"M0 0 L8 4 L0 8 z",class:"fill-ink-muted"})]),h("marker",{id:"dp-arrowhead-chosen",viewBox:"0 0 8 8",refX:"7",refY:"4",markerWidth:"5",markerHeight:"5",orient:"auto-start-reverse"},[h("path",{d:"M0 0 L8 4 L0 8 z",class:"fill-tone-active"})])],-1)),(x(!0),T(te,null,de(w.value,j=>(x(),T("text",{key:`col-${j.key}`,x:j.x,y:j.y,"text-anchor":"middle","dominant-baseline":"central",class:"fill-ink-muted text-[10px] font-semibold"},[h("title",null,R(j.full),1),M(" "+R(j.text),1)],8,I1))),128)),(x(!0),T(te,null,de(S.value,j=>(x(),T("text",{key:`row-${j.key}`,x:j.x,y:j.y,"text-anchor":"end","dominant-baseline":"central",class:"fill-ink-muted text-[10px] font-semibold"},[h("title",null,R(j.full),1),M(" "+R(j.text),1)],8,D1))),128)),t.axes.colTitle?(x(),T("text",{key:0,x:u.value.pad+4,y:u.value.pad+u.value.header/2-6,class:"fill-ink-faint text-[9px] font-semibold uppercase tracking-wide"},R(t.axes.colTitle)+" → ",9,L1)):pe("",!0),t.axes.rowTitle?(x(),T("text",{key:1,x:u.value.pad+4,y:u.value.pad+u.value.header/2+8,class:"fill-ink-faint text-[9px] font-semibold uppercase tracking-wide"},R(t.axes.rowTitle)+" ↓ ",9,N1)):pe("",!0),(x(!0),T(te,null,de(b.value,j=>(x(),T("g",{key:j.key,role:"img","aria-label":j.label,"data-cell":j.key,"data-tone":j.tone,onPointerenter:he=>K(j.row,j.col)},[h("title",null,R(j.label),1),h("rect",{x:j.rect.x,y:j.rect.y,width:j.rect.w,height:j.rect.h,rx:"4",class:ve(["transition-colors duration-150 ease-out",o[j.tone]])},null,10,B1),h("text",{x:j.rect.x+j.rect.w/2,y:j.rect.y+j.rect.h/2,"font-size":j.fontSize,"text-anchor":"middle","dominant-baseline":"central",class:ve(["pointer-events-none font-semibold",j.tone==="empty"?"fill-ink-faint":"fill-ink"])},R(j.text),11,F1)],40,P1))),128)),h("g",H1,[(x(!0),T(te,null,de(P.value,j=>(x(),T("line",{key:`hover-${j.key}`,x1:j.x1,y1:j.y1,x2:j.x2,y2:j.y2,"stroke-width":"1.5","stroke-dasharray":"3 3","marker-end":"url(#dp-arrowhead)",class:"stroke-ink-muted"},null,8,V1))),128)),(x(!0),T(te,null,de(_.value,j=>(x(),T("line",{key:j.key,x1:j.x1,y1:j.y1,x2:j.x2,y2:j.y2,"stroke-width":j.chosen?2.5:1.5,"marker-end":j.chosen?"url(#dp-arrowhead-chosen)":"url(#dp-arrowhead)",class:ve(j.chosen?"stroke-tone-active":"stroke-ink-muted")},[h("title",null,R(j.label),1)],10,U1))),128))])],8,j1))],32),N[2]||(N[2]=h("p",{class:"mt-3 text-center text-xs text-ink-faint"}," Hover any cell to see which cells its value was read from. ",-1))]),_:1}))}}),q1={class:"grid gap-4 lg:grid-cols-[minmax(0,360px)_1fr]"},K1={class:"flex flex-col gap-4"},G1={class:"flex flex-col gap-4"},W1=se({__name:"DpView",setup(t){const e=Ug();function n(r){return e.dims.value.rows===1?`dp[${r.col}]`:`dp[${r.row}][${r.col}]`}function s(r){const i=e.view.chosen;return i!==null&&i.row===r.row&&i.col===r.col}const o=C(()=>e.view.deps.map(r=>({label:r.label,value:`${n(r)} = ${Wn(r.value)}`,tone:s(r)?"good":"neutral"}))),a=C(()=>e.current.value===null?null:e.view.cursor!==null?`Computing ${n(e.view.cursor)}`:e.view.result!==null?"Finished — the answer is decoded from the table":e.view.path.length>0?"Tracing back through the branches that won":null);return(r,i)=>(x(),T("div",q1,[h("div",K1,[A(Tn,{modelValue:f(e).algoKey.value,"onUpdate:modelValue":i[0]||(i[0]=l=>f(e).algoKey.value=l),algorithms:f(Gt),columns:2,disabled:!f(e).canEdit.value},null,8,["modelValue","algorithms","disabled"]),A(m1),A(x1,{"algo-key":f(e).algoKey.value,input:f(e).input.value,"can-edit":f(e).canEdit.value,"onUpdate:input":i[1]||(i[1]=l=>f(e).setInput(l)),onShuffle:i[2]||(i[2]=l=>f(e).randomizeSeed())},null,8,["algo-key","input","can-edit"]),A(h1,{speed:f(e).speed.value,"onUpdate:speed":i[3]||(i[3]=l=>f(e).speed.value=l),status:f(e).status.value,"can-edit":f(e).canEdit.value,"is-running":f(e).isRunning.value,"is-paused":f(e).isPaused.value,"can-run":f(e).canRun.value,onRun:i[4]||(i[4]=l=>f(e).run()),onPause:i[5]||(i[5]=l=>f(e).pause()),onReset:i[6]||(i[6]=l=>f(e).reset()),onStep:i[7]||(i[7]=l=>f(e).stepForward())},null,8,["speed","status","can-edit","is-running","is-paused","can-run"]),A(xn,{cursor:f(e).cursor.value,"buffered-count":f(e).bufferedCount.value,"fully-buffered":f(e).fullyBuffered.value,"can-step-back":f(e).canStepBack.value,"can-step-forward":f(e).canStepForward.value,onSeek:i[8]||(i[8]=l=>f(e).seek(l)),onStepBack:i[9]||(i[9]=l=>f(e).stepBack()),onStepForward:i[10]||(i[10]=l=>f(e).stepForward()),onSkipToEnd:i[11]||(i[11]=l=>f(e).skipToEnd())},null,8,["cursor","buffered-count","fully-buffered","can-step-back","can-step-forward"])]),h("div",G1,[A($1,{"cells-filled":f(e).stats.value.cellsFilled,fillable:f(e).stats.value.fillable,rows:f(e).stats.value.rows,cols:f(e).stats.value.cols,"naive-calls":f(e).stats.value.naiveCalls,speedup:f(e).stats.value.speedup,steps:f(e).stepCount.value,"elapsed-ms":f(e).elapsedMs.value,status:f(e).status.value,result:f(e).view.result,truncated:f(e).truncated.value},null,8,["cells-filled","fillable","rows","cols","naive-calls","speedup","steps","elapsed-ms","status","result","truncated"]),A(z1,{table:f(e).table.value,axes:f(e).axes.value,recurrence:f(e).recurrence.value,cursor:f(e).view.cursor,deps:f(e).view.deps,chosen:f(e).view.chosen,path:f(e).view.path,"hover-cell":f(e).hoverCell.value,"hover-deps":f(e).hoverDeps.value,onHoverCell:i[12]||(i[12]=l=>f(e).setHoverCell(l))},null,8,["table","axes","recurrence","cursor","deps","chosen","path","hover-cell","hover-deps"]),A(Dr,{headline:a.value,formula:f(e).view.explain,rows:o.value,empty:"Run a step to see how a cell was computed."},null,8,["headline","formula","rows"]),A(aa,{lines:f(e).pseudocodeLines.value,source:f(e).sourceCode.value.text,"source-file":f(e).sourceCode.value.file,"active-line":f(e).activeLine.value,"active-source-lines":f(e).activeSourceLines.value},null,8,["lines","source","source-file","active-line","active-source-lines"])])]))}}),Y1=se({__name:"MstGuide",setup(t){return(e,n)=>(x(),Y(Zs,{title:"How to read this",summary:"A disjoint set answers one question fast: are these two nodes already connected?","start-open":""},{default:D(()=>[...n[0]||(n[0]=[h("p",{class:"mb-3 text-ink-muted"},[M(" A "),h("b",null,"disjoint-set forest"),M(" (union-find) partitions a collection of elements into groups — here, nodes into the components they belong to — and supports exactly two operations: "),h("code",{class:"font-mono text-xs"},"find(x)"),M(", which returns the group's representative, and "),h("code",{class:"font-mono text-xs"},"union(a, b)"),M(", which merges two groups into one. Two elements are in the same group precisely when "),h("code",{class:"font-mono text-xs"},"find"),M(" returns the same answer for both. The forest panel on the right draws exactly that: an arrow from each node to its parent, with a self-pointing root marking a group's representative. ")],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint"}," Two optimizations, one payoff ",-1),h("ul",{class:"mb-4 space-y-2 text-ink-muted"},[h("li",null,[h("b",null,"Union by rank."),M(" When two trees merge, the shallower one is hung under the deeper one, never the other way round. Do this consistently and a forest built from n elements can never get deeper than log₂(n) — the Stats panel's "),h("b",null,"Max Depth"),M(" is that bound made visible, not just another counter. ")]),h("li",null,[h("b",null,"Path compression."),M(" Every "),h("code",{class:"font-mono text-xs"},"find"),M(" re-hangs every node it walked through directly onto the root it found. The next "),h("code",{class:"font-mono text-xs"},"find"),M(" on any of those nodes is then one hop instead of a walk — watch the forest panel's nodes flip from "),h("span",{class:"font-semibold text-tone-probe-ink"},"on find path"),M(" to "),h("span",{class:"font-semibold text-tone-settled-ink"},"re-hung"),M(" the instant this happens. ")])],-1),h("p",{class:"mb-4 text-ink-muted"},[M(" Neither optimization is required for correctness — a disjoint set built without them still answers "),h("code",{class:"font-mono text-xs"},"find"),M(" and "),h("code",{class:"font-mono text-xs"},"union"),M(" correctly, just slowly, degenerating toward a linked list under an unlucky sequence of unions. Together they bring every operation down to "),h("code",{class:"font-mono text-xs"},"O(α(n))"),M(" amortized — "),h("code",{class:"font-mono text-xs"},"α"),M(' being the inverse Ackermann function, which is under 5 for any n you could ever construct. That is "constant time" in every practical sense. ')],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint"}," Why Kruskal needs exactly this ",-1),h("p",{class:"mb-2 text-ink-muted"},[M(` Kruskal's rule is trivial to state — sort every edge by weight, then accept it unless its two endpoints are already connected — and completely useless without a fast answer to "already connected?", asked once per edge, on a component structure that is changing under the question as edges get accepted. A disjoint set is the one structure built to answer that question near-instantly: `),h("code",{class:"font-mono text-xs"},"find(u) === find(v)"),M(" is the whole cycle check, and "),h("code",{class:"font-mono text-xs"},"union(u, v)"),M(" is the whole merge. The two obvious alternatives are both dramatically worse — re-running a traversal from scratch per edge to check connectivity is O(E) work E times over, and maintaining an explicit component-id array means relabelling half the graph on every merge. ")],-1),h("p",{class:"text-ink-faint"},` Prim doesn't strictly need one — it could track "in the tree / not in the tree" with a plain boolean array — but this visualization runs a real disjoint set underneath it anyway, purely so both algorithms render through the same forest panel. See prim.ts's own header comment for exactly which of its counters are meaningful as a result and which are just bookkeeping. `,-1)])]),_:1}))}}),X1={class:"space-y-4"},J1={class:"mt-5 grid grid-cols-2 gap-2"},Q1={class:"mt-3 grid grid-cols-1 gap-2"},Z1=se({__name:"MstControls",props:{nodeCount:{},seed:{},speed:{},status:{},canEdit:{type:Boolean},isRunning:{type:Boolean},isPaused:{type:Boolean}},emits:["update:nodeCount","update:speed","update:seed","randomize","generate","run","pause","reset"],setup(t,{emit:e}){const n=e;function s(o){const a=Number(o);Number.isInteger(a)&&n("update:seed",a)}return(o,a)=>(x(),Y(we,{title:"Controls"},{default:D(()=>[h("div",X1,[A(Ve,{label:"Node count","model-value":t.nodeCount,min:f(dc),max:f(pc),disabled:!t.canEdit,"onUpdate:modelValue":a[0]||(a[0]=r=>n("update:nodeCount",r))},null,8,["model-value","min","max","disabled"]),A(Ve,{label:"Speed","model-value":t.speed,min:1,max:100,suffix:"%","onUpdate:modelValue":a[1]||(a[1]=r=>n("update:speed",r))},null,8,["model-value"]),A(kt,{label:"Seed",monospace:"","model-value":String(t.seed),disabled:!t.canEdit,"onUpdate:modelValue":s},null,8,["model-value","disabled"])]),h("div",J1,[t.isRunning?(x(),Y(Z,{key:1,variant:"warning",class:"col-span-2",onClick:a[3]||(a[3]=r=>n("pause"))},{default:D(()=>[...a[8]||(a[8]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M6 4h4v16H6zM14 4h4v16h-4z"})],-1),M(" Pause ",-1)])]),_:1})):(x(),Y(Z,{key:0,variant:"primary",class:"col-span-2",onClick:a[2]||(a[2]=r=>n("run"))},{default:D(()=>[a[7]||(a[7]=h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M8 5v14l11-7z"})],-1)),M(" "+R(t.isPaused?"Resume":"Run"),1)]),_:1})),A(Z,{variant:"neutral",onClick:a[4]||(a[4]=r=>n("reset"))},{default:D(()=>[...a[9]||(a[9]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.36 2.64L3 8"}),h("path",{d:"M3 3v5h5"})],-1),M(" Reset ",-1)])]),_:1}),A(Z,{variant:"neutral",disabled:!t.canEdit,onClick:a[5]||(a[5]=r=>n("generate"))},{default:D(()=>[...a[10]||(a[10]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"})],-1),M(" New Graph ",-1)])]),_:1},8,["disabled"])]),h("div",Q1,[A(Z,{variant:"quiet",disabled:!t.canEdit,onClick:a[6]||(a[6]=r=>n("randomize"))},{default:D(()=>[...a[11]||(a[11]=[M(" New seed ",-1)])]),_:1},8,["disabled"])]),a[12]||(a[12]=h("p",{class:"mt-3 text-center text-xs text-ink-faint"}," Node count, seed & algorithm lock while a run is in progress. ",-1))]),_:1}))}}),ek={class:"flex flex-wrap items-end gap-2"},tk={class:"block"},nk=["disabled"],sk={class:"block w-16"},ok=["max","disabled"],ak={key:0,class:"block w-16"},rk=["max","disabled"],ik={key:0,class:"mt-1.5 text-xs text-danger"},lk={class:"mt-1.5 text-xs text-ink-faint"},uk={class:"mt-4"},ck={key:0,class:"text-sm text-ink-faint"},dk={key:1,class:"max-h-48 space-y-1 overflow-y-auto pr-1"},pk={class:"font-mono font-semibold text-ink"},fk=["disabled","aria-label","onClick"],hk={class:"mt-4 grid grid-cols-2 gap-2"},mk=se({__name:"DsuOpBuilder",props:{ops:{},nodeCount:{},canEdit:{type:Boolean}},emits:["update:ops","randomize"],setup(t,{emit:e}){const n=t,s=e,o=B("union"),a=B("0"),r=B("0"),i=B(null),l=C(()=>Math.max(0,n.nodeCount-1));function u(y){const g=Number(y);return!Number.isInteger(g)||g<0||g>l.value?null:g}function c(y){return y.kind==="union"?`union(${y.a}, ${y.b})`:`find(${y.a})`}function d(){if(!n.canEdit)return;const y=u(a.value);if(y===null){i.value=`Node index must be a whole number from 0 to ${l.value}.`;return}if(o.value==="find"){i.value=null,s("update:ops",[...n.ops,{kind:"find",a:y}]);return}const g=u(r.value);if(g===null){i.value=`Node index must be a whole number from 0 to ${l.value}.`;return}i.value=null,s("update:ops",[...n.ops,{kind:"union",a:y,b:g}])}function p(y){n.canEdit&&s("update:ops",n.ops.filter((g,v)=>v!==y))}function m(){n.canEdit&&s("update:ops",[])}return(y,g)=>(x(),Y(we,{title:"Operation Script"},{default:D(()=>[h("div",ek,[h("label",tk,[g[5]||(g[5]=h("span",{class:"mb-1.5 block text-sm font-medium text-ink-muted"}," Op ",-1)),_s(h("select",{"onUpdate:modelValue":g[0]||(g[0]=v=>o.value=v),disabled:!t.canEdit,class:"rounded-xl border border-line bg-surface-raised px-2.5 py-2 text-sm text-ink disabled:cursor-not-allowed disabled:opacity-50"},[...g[4]||(g[4]=[h("option",{value:"union"},"union",-1),h("option",{value:"find"},"find",-1)])],8,nk),[[Gp,o.value]])]),h("label",sk,[g[6]||(g[6]=h("span",{class:"mb-1.5 block text-sm font-medium text-ink-muted"}," a ",-1)),_s(h("input",{"onUpdate:modelValue":g[1]||(g[1]=v=>a.value=v),type:"number",min:0,max:l.value,disabled:!t.canEdit,class:"w-full rounded-xl border border-line bg-surface-raised px-2.5 py-2 text-sm text-ink disabled:cursor-not-allowed disabled:opacity-50"},null,8,ok),[[Mo,a.value]])]),o.value==="union"?(x(),T("label",ak,[g[7]||(g[7]=h("span",{class:"mb-1.5 block text-sm font-medium text-ink-muted"}," b ",-1)),_s(h("input",{"onUpdate:modelValue":g[2]||(g[2]=v=>r.value=v),type:"number",min:0,max:l.value,disabled:!t.canEdit,class:"w-full rounded-xl border border-line bg-surface-raised px-2.5 py-2 text-sm text-ink disabled:cursor-not-allowed disabled:opacity-50"},null,8,rk),[[Mo,r.value]])])):pe("",!0),A(Z,{variant:"quiet",disabled:!t.canEdit,onClick:d},{default:D(()=>[...g[8]||(g[8]=[M("Add",-1)])]),_:1},8,["disabled"])]),i.value?(x(),T("p",ik,R(i.value),1)):pe("",!0),h("p",lk,"Valid nodes for this forest: 0 to "+R(l.value)+".",1),h("div",uk,[t.ops.length===0?(x(),T("p",ck," No operations yet — add one above, or generate a random script. ")):(x(),T("ol",dk,[(x(!0),T(te,null,de(t.ops,(v,b)=>(x(),T("li",{key:b,class:"flex items-center justify-between gap-2 rounded-lg border border-line bg-surface-alt px-2.5 py-1.5 text-xs"},[h("span",pk,R(b+1)+". "+R(c(v)),1),h("button",{type:"button",disabled:!t.canEdit,class:"rounded px-1.5 py-0.5 text-ink-faint transition-colors hover:bg-danger-soft hover:text-danger disabled:cursor-not-allowed disabled:opacity-50","aria-label":`Remove ${c(v)}`,onClick:w=>p(b)}," ✕ ",8,fk)]))),128))]))]),h("div",hk,[A(Z,{variant:"quiet",disabled:!t.canEdit||t.ops.length===0,onClick:m},{default:D(()=>[...g[9]||(g[9]=[M(" Clear ",-1)])]),_:1},8,["disabled"]),A(Z,{variant:"quiet",disabled:!t.canEdit,onClick:g[3]||(g[3]=v=>s("randomize"))},{default:D(()=>[...g[10]||(g[10]=[M(" Random script ",-1)])]),_:1},8,["disabled"])]),g[11]||(g[11]=h("p",{class:"mt-3 text-xs text-ink-faint"}," Compose the whole script, then press Run — see the guide above for why one continuous history is the point. ",-1))]),_:1}))}}),gk=se({__name:"MstStats",props:{stats:{},status:{},isDsuMode:{type:Boolean,default:!1}},setup(t){const e=t,n=C(()=>[{label:"Finds",value:e.stats.finds.toLocaleString()},{label:"Unions",value:e.stats.unions.toLocaleString()},{label:"Compressions",value:e.stats.compressions.toLocaleString()},{label:"Max Depth",value:e.stats.maxDepth.toLocaleString()},{label:"MST Weight",value:e.isDsuMode?"—":e.stats.totalWeight.toLocaleString()},{label:"Components",value:e.stats.components.toLocaleString()}]);return(s,o)=>(x(),Y(we,{title:"Stats"},{header:D(()=>[A(Sn,{status:t.status},null,8,["status"])]),default:D(()=>[A(Lr,{cells:n.value,columns:3},null,8,["cells"])]),_:1}))}}),bk={xSpacing:46,ySpacing:54,xMargin:30,yMargin:28,rootGap:1};function vk(t,e={}){const{xSpacing:n,ySpacing:s,xMargin:o,yMargin:a,rootGap:r}={...bk,...e},i=t.length,l=Array.from({length:i},()=>[]),u=[];for(let b=0;b<i;b++){const w=t[b];w===b?u.push(b):w>=0&&w<i&&l[w].push(b)}const c=new Map,d=[],p=new Set;let m=0;function y(b){const w=[{id:b,depth:0,cursor:0}];for(p.add(b);w.length>0;){const S=w[w.length-1],$=l[S.id];if(S.cursor<$.length){const I=$[S.cursor];if(S.cursor+=1,p.has(I))continue;p.add(I),w.push({id:I,depth:S.depth+1,cursor:0});continue}w.pop();const _=$.map(I=>c.get(I)).filter(I=>I!==void 0);let P,K;if(_.length===0){const I=m;m+=1,P=o+I*n,K=[I,I]}else{const I=_.map(N=>N.x);P=(Math.min(...I)+Math.max(...I))/2,K=[Math.min(..._.map(N=>N.span[0])),Math.max(..._.map(N=>N.span[1]))]}c.set(S.id,{id:S.id,x:P,y:a+S.depth*s,depth:S.depth,parent:S.id===t[S.id]?null:t[S.id],span:K})}}for(const b of u)m>0&&(m+=r),y(b);const g=[...c.values()].sort((b,w)=>b.id-w.id);for(const b of g)b.parent!==null&&c.has(b.parent)&&d.push({from:b.parent,to:b.id});const v=g.reduce((b,w)=>Math.max(b,w.depth),0);return{nodes:g,edges:d,slotCount:m,width:Math.max(o*2,o*2+Math.max(0,m-1)*n),height:a*2+v*s}}const yk={class:"mb-3 flex flex-wrap items-center gap-x-4 gap-y-2"},wk={class:"text-xs font-semibold uppercase tracking-wider text-ink-faint"},xk={key:0,class:"py-8 text-center text-sm text-ink-faint"},kk={class:"overflow-x-auto rounded-xl bg-surface-alt p-3"},Sk=["viewBox","width","height"],$k=["x1","y1","x2","y2"],Ek=["cx","cy"],Ck=["cx","cy"],Ak=["x","y"],Tk=["x","y"],Ok={class:"flex flex-wrap gap-1.5"},Mk={class:"w-full bg-line/70 py-0.5 text-center text-[10px] font-medium text-ink-muted"},_k={class:"py-1 font-mono text-sm font-semibold text-ink"},Rk={class:"mt-3 text-center text-xs text-ink-faint"},jk=se({__name:"DsuForest",props:{parent:{},setSize:{default:()=>[]},rank:{default:()=>[]},findPath:{default:()=>[]},compressed:{default:()=>[]},active:{default:null},labels:{default:()=>[]},title:{default:"Disjoint-Set Forest"},hint:{default:"Each tree is one set. An arrow points from a node to its parent; a node pointing at itself is a root."}},setup(t){const e=t,n={cursor:ht.active,compressed:ht.settled,path:ht.probe,root:"fill-accent",default:ht.idle},s={cursor:`${Qe.active} ${Ct.active}`,compressed:`${Qe.settled} ${Ct.settled}`,path:`${Qe.probe} ${Ct.probe}`,root:"border-accent/60 bg-accent-soft",default:`${Qe.idle} ${Ct.idle}`},o=kn([{tone:"probe",label:"On find path"},{tone:"settled",label:"Re-hung"},{tone:"active",label:"Cursor"}]),a=C(()=>new Set(e.findPath)),r=C(()=>new Set(e.compressed)),i=C(()=>vk(e.parent)),l=C(()=>new Map(i.value.nodes.map(y=>[y.id,y])));function u(y){return y===e.active?"cursor":r.value.has(y)?"compressed":a.value.has(y)?"path":e.parent[y]===y?"root":"default"}function c(y){return e.labels[y]??String(y)}const d=C(()=>e.parent.length===0);function p(y){return e.parent[y]!==y?null:e.rank[y]??null}function m(y){return e.parent[y]!==y?null:e.setSize[y]??null}return(y,g)=>(x(),Y(we,{class:"flex flex-col"},{default:D(()=>[h("div",yk,[h("h2",wk,R(t.title),1),g[0]||(g[0]=h("div",{class:"flex flex-wrap items-center gap-3 text-xs text-ink-muted"},[h("span",{class:"flex items-center gap-1.5"},[h("i",{class:"h-3 w-3 rounded-mark bg-accent"}),M("Root")])],-1)),A(_n,{items:f(o)},null,8,["items"])]),d.value?(x(),T("p",xk,"The forest is empty.")):(x(),T(te,{key:1},[h("div",kk,[(x(),T("svg",{viewBox:`0 0 ${i.value.width} ${i.value.height}`,width:i.value.width,height:i.value.height,class:"mx-auto block max-h-[42vh] w-full",preserveAspectRatio:"xMidYMid meet"},[(x(!0),T(te,null,de(i.value.edges,v=>{var b,w,S,$;return x(),T("line",{key:`${v.from}-${v.to}`,x1:(b=l.value.get(v.to))==null?void 0:b.x,y1:(w=l.value.get(v.to))==null?void 0:w.y,x2:(S=l.value.get(v.from))==null?void 0:S.x,y2:($=l.value.get(v.from))==null?void 0:$.y,"stroke-width":"2",class:ve(a.value.has(v.to)&&!r.value.has(v.to)?f(vt).probe:r.value.has(v.to)?f(vt).settled:f(vt).idle)},null,10,$k)}),128)),(x(!0),T(te,null,de(i.value.nodes,v=>(x(),T("g",{key:v.id},[v.parent===null?(x(),T("circle",{key:0,cx:v.x,cy:v.y-15,r:"6",fill:"none","stroke-width":"1.5",class:"stroke-accent/60"},null,8,Ek)):pe("",!0),h("circle",{cx:v.x,cy:v.y,r:"14",class:ve(["transition-colors duration-150 ease-out",n[u(v.id)]])},null,10,Ck),h("text",{x:v.x,y:v.y,"text-anchor":"middle","dominant-baseline":"central",class:"pointer-events-none select-none fill-ink-inverse text-[10px] font-semibold"},R(c(v.id)),9,Ak),p(v.id)!==null?(x(),T("text",{key:1,x:v.x,y:v.y+25,"text-anchor":"middle",class:"pointer-events-none select-none fill-ink-faint text-[9px] font-medium"}," rank "+R(p(v.id))+" · "+R(m(v.id)),9,Tk)):pe("",!0)]))),128))],8,Sk))]),g[1]||(g[1]=h("h3",{class:"mb-2 mt-4 text-xs font-semibold uppercase tracking-wider text-ink-faint"}," parent[] ",-1)),h("div",Ok,[(x(!0),T(te,null,de(t.parent,(v,b)=>(x(),T("div",{key:b,class:ve(["flex w-11 flex-col items-center overflow-hidden rounded-lg border transition-colors",s[u(b)]])},[h("div",Mk,R(b),1),h("div",_k,R(v),1)],2))),128))]),h("p",Rk,R(t.hint),1)],64))]),_:1}))}}),Ik={class:"mb-3 flex flex-wrap items-center justify-between gap-2"},Dk={class:"text-xs text-ink-faint"},Lk={key:0,class:"py-6 text-center text-sm text-ink-faint"},Nk=["data-active"],Pk={class:"flex items-center gap-2"},Bk={class:"font-mono font-semibold text-ink"},Fk={class:"font-mono text-ink-muted"},Hk=se({__name:"EdgeList",props:{edges:{},nodes:{},consideringEdge:{},acceptedEdges:{},rejectedEdges:{}},setup(t){const e=t,n=kn([{tone:"idle",label:"Pending"},{tone:"probe",label:"Considering"},{tone:"settled",label:"Accepted"},{tone:"rejected",label:"Rejected"}]),s={pending:Qe.idle,considering:`${Qe.probe} ${Ct.probe}`,accepted:`${Qe.settled} ${Ct.settled}`,rejected:`${Qe.rejected} ${Ct.rejected}`},o={pending:at.idle,considering:at.probe,accepted:at.settled,rejected:at.rejected},a=C(()=>new Set(e.acceptedEdges)),r=C(()=>new Set(e.rejectedEdges)),i=C(()=>new Map(e.nodes.map(m=>[m.id,m.label])));function l(m){return i.value.get(m)??String(m)}function u(m){return a.value.has(m.id)?"accepted":r.value.has(m.id)?"rejected":m.id===e.consideringEdge?"considering":"pending"}const c=C(()=>e.acceptedEdges.length),d=C(()=>e.rejectedEdges.length),p=B(null);return Re(()=>e.consideringEdge,async()=>{var y,g;if(e.consideringEdge===null)return;await hs();const m=(y=p.value)==null?void 0:y.querySelector('[data-active="true"]');(g=m==null?void 0:m.scrollIntoView)==null||g.call(m,{block:"nearest"})}),(m,y)=>(x(),Y(we,{title:"Edge Queue"},{default:D(()=>[h("div",Ik,[A(_n,{items:f(n)},null,8,["items"]),h("p",Dk,R(c.value)+" accepted · "+R(d.value)+" rejected · "+R(t.edges.length)+" total ",1)]),t.edges.length===0?(x(),T("p",Lk," No edges yet — generate a graph to build the queue. ")):(x(),T("ol",{key:1,ref_key:"list",ref:p,class:"max-h-72 space-y-1 overflow-y-auto pr-1"},[(x(!0),T(te,null,de(t.edges,g=>(x(),T("li",{key:g.id,"data-active":g.id===t.consideringEdge,class:ve(["flex items-center justify-between gap-2 rounded-lg border px-2.5 py-1.5 text-xs transition-colors",s[u(g)]])},[h("span",Pk,[h("i",{class:ve(["h-2.5 w-2.5 flex-none rounded-full",o[u(g)]])},null,2),h("span",Bk,R(l(g.from))+" – "+R(l(g.to)),1)]),h("span",Fk,"w="+R(g.weight??1),1)],10,Nk))),128))],512)),y[0]||(y[0]=h("p",{class:"mt-3 text-center text-xs text-ink-faint"}," Lightest edges first — the exact order Kruskal considers them in. ",-1))]),_:1}))}}),Vk={class:"grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]"},Uk={class:"flex flex-col gap-4"},zk={class:"flex flex-col gap-4"},qk=se({__name:"MstView",setup(t){const e=sb();Re(e.nodeCount,()=>{e.canEdit.value&&e.generate()}),Re(e.seed,()=>{e.canEdit.value&&e.generate()}),Re(e.algoKey,()=>{e.isDone.value&&e.reset()});const n=kn([{tone:"idle",label:"Idle"},{tone:"probe",label:"Considering"},{tone:"settled",label:"Accepted"},{tone:"rejected",label:"Rejected"}]),s=C(()=>e.isDsuMode.value?[]:e.graph.value.nodes.map(l=>l.label)),o=C(()=>e.canEdit.value&&e.algoKey.value==="prim"),a=C(()=>e.algoKey.value==="prim"?"Click a node to set Prim's starting point — the tree grows outward from there.":"Kruskal has no starting point: edges are accepted strictly by weight, regardless of position."),r=C(()=>{if(e.isDsuMode.value){const u=e.activeOp.value;return u?u.kind==="union"?`union(${u.a}, ${u.b})`:`find(${u.a})`:null}const l=e.graph.value.edges.find(u=>u.id===e.highlights.consideringEdge);return l?`considering ${l.from}–${l.to} (weight ${l.weight??1})`:null}),i=C(()=>e.isDsuMode.value?[{label:"Active node",value:e.activeNode.value===null?"—":String(e.activeNode.value)},{label:"Sets remaining",value:String(e.stats.value.components)}]:[{label:"Accepted",value:String(e.highlights.acceptedEdges.length),tone:"good"},{label:"Rejected",value:String(e.highlights.rejectedEdges.length),tone:e.highlights.rejectedEdges.length>0?"warn":"neutral"},{label:"Components left",value:String(e.highlights.components)}]);return(l,u)=>(x(),T("div",Vk,[h("div",Uk,[A(Tn,{modelValue:f(e).algoKey.value,"onUpdate:modelValue":u[0]||(u[0]=c=>f(e).algoKey.value=c),algorithms:f(ta),title:"Algorithm",columns:3,disabled:!f(e).canEdit.value},null,8,["modelValue","algorithms","disabled"]),A(Y1),A(Z1,{"node-count":f(e).nodeCount.value,seed:f(e).seed.value,speed:f(e).speed.value,status:f(e).status.value,"can-edit":f(e).canEdit.value,"is-running":f(e).isRunning.value,"is-paused":f(e).isPaused.value,"onUpdate:nodeCount":u[1]||(u[1]=c=>f(e).nodeCount.value=c),"onUpdate:speed":u[2]||(u[2]=c=>f(e).speed.value=c),"onUpdate:seed":u[3]||(u[3]=c=>f(e).seed.value=c),onRandomize:u[4]||(u[4]=c=>f(e).randomizeSeed()),onGenerate:u[5]||(u[5]=c=>f(e).generate()),onRun:u[6]||(u[6]=c=>f(e).run()),onPause:u[7]||(u[7]=c=>f(e).pause()),onReset:u[8]||(u[8]=c=>f(e).reset())},null,8,["node-count","seed","speed","status","can-edit","is-running","is-paused"]),f(e).isDsuMode.value?(x(),Y(mk,{key:0,ops:f(e).opScript.value,"node-count":f(e).nodeCount.value,"can-edit":f(e).canEdit.value,"onUpdate:ops":u[9]||(u[9]=c=>f(e).setOpScript(c)),onRandomize:u[10]||(u[10]=c=>f(e).randomizeOpScript())},null,8,["ops","node-count","can-edit"])):pe("",!0),A(xn,{cursor:f(e).cursor.value,"buffered-count":f(e).bufferedCount.value,"fully-buffered":f(e).fullyBuffered.value,"can-step-back":f(e).canStepBack.value,"can-step-forward":f(e).canStepForward.value,onSeek:u[11]||(u[11]=c=>f(e).seek(c)),onStepBack:u[12]||(u[12]=c=>f(e).stepBack()),onStepForward:u[13]||(u[13]=c=>f(e).stepForward()),onSkipToEnd:u[14]||(u[14]=c=>f(e).skipToEnd())},null,8,["cursor","buffered-count","fully-buffered","can-step-back","can-step-forward"])]),h("div",zk,[A(gk,{stats:f(e).stats.value,status:f(e).status.value,"is-dsu-mode":f(e).isDsuMode.value},null,8,["stats","status","is-dsu-mode"]),f(e).isDsuMode.value?pe("",!0):(x(),Y(Cc,{key:0,nodes:f(e).graph.value.nodes,edges:f(e).graph.value.edges,"node-tone":f(e).nodeTone.value,"edge-tone":f(e).edgeTone.value,"node-badge":f(e).nodeBadge.value,"show-weights":!0,legend:f(n),title:"Graph",hint:a.value,"start-id":f(e).startId.value,"can-edit":o.value,onSetStart:u[15]||(u[15]=c=>f(e).setStart(c))},null,8,["nodes","edges","node-tone","edge-tone","node-badge","legend","hint","start-id","can-edit"])),A(jk,{parent:f(e).forest.value.parent,"set-size":f(e).forest.value.setSize,rank:f(e).forest.value.rank,"find-path":f(e).forest.value.findPath,compressed:f(e).forest.value.compressed,active:f(e).activeNode.value,labels:s.value,title:f(e).isDsuMode.value?"Disjoint-Set Forest":"Underlying Disjoint-Set Forest"},null,8,["parent","set-size","rank","find-path","compressed","active","labels","title"]),f(e).isDsuMode.value?pe("",!0):(x(),Y(Hk,{key:1,edges:f(e).sortedEdges.value,nodes:f(e).graph.value.nodes,"considering-edge":f(e).highlights.consideringEdge,"accepted-edges":f(e).highlights.acceptedEdges,"rejected-edges":f(e).highlights.rejectedEdges},null,8,["edges","nodes","considering-edge","accepted-edges","rejected-edges"])),A(Dr,{headline:f(e).explain.value,formula:r.value,rows:i.value},null,8,["headline","formula","rows"]),A(aa,{lines:f(e).pseudocodeLines.value,source:f(e).sourceCode.value.text,"source-file":f(e).sourceCode.value.file,"active-line":f(e).activeLine.value,"active-source-lines":f(e).activeSourceLines.value,title:"Code"},null,8,["lines","source","source-file","active-line","active-source-lines"])])]))}}),Kk=se({__name:"HashGuide",setup(t){return(e,n)=>(x(),Y(Zs,{title:"How to read this",summary:"A hash sends every key to one bucket. The interesting part is what happens when two land on the same one.","start-open":""},{default:D(()=>[...n[0]||(n[0]=[h("p",{class:"mb-3 text-ink-muted"},[M(" A hash table turns a key into a number, folds that number into a slot with "),h("code",{class:"font-mono text-xs"},"h(key) mod capacity"),M(", and stores the key there. That is the entire idea, and it is O(1) — right up until two keys pick the same slot. Everything on this page is about that moment. The inspector spells out the arithmetic for every step, so each probe can be checked by hand. ")],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint"}," Chaining vs open addressing ",-1),h("ul",{class:"mb-4 space-y-2 text-ink-muted"},[h("li",null,[h("b",null,"Separate chaining"),M(" hangs a list off each bucket. Colliding keys are appended, so a lookup hashes once and then walks a chain that averages α links long. It degrades gently, never fills up, and deletion is just unlinking — but every entry costs a pointer, and the chain is scattered through memory. ")]),h("li",null,[h("b",null,"Open addressing"),M(" keeps everything in the array: on a collision, the key walks a "),h("em",null,"probe sequence"),M(" until it finds a free slot. No pointers, excellent cache behaviour, and it is what most modern standard libraries do — at the price of everything below. ")])],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint"}," Clustering — the reason there are three probe sequences ",-1),h("p",{class:"mb-3 text-ink-muted"},[h("b",null,"Linear probing"),M(" tries the next slot along, so collisions form contiguous runs, and every run is a bigger target for the next key — a cluster grows itself. That is "),h("em",null,"primary clustering"),M(". "),h("b",null,"Quadratic probing"),M(" jumps k(k+1)/2 slots on the k-th probe, which scatters the runs; but two keys with the same home slot still follow the identical jump sequence, which is "),h("em",null,"secondary clustering"),M(". "),h("b",null,"Double hashing"),M(" derives the stride from a second hash of the key, so even keys that collide at home diverge immediately. Load the weak hash function, force a collision, and switch between the three: the badges show the probe order, and the clusters are visible. ")],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint"}," Why α matters ",-1),h("p",{class:"mb-3 text-ink-muted"},[M(" The load factor α = keys / slots is what the cost actually depends on — not the number of keys. Chaining costs about 1 + α. Open addressing costs about 1/(1 − α), which is 2 probes at half full, 10 at 90%, and unbounded as the table fills. That is why the table grows: once α crosses the threshold, the capacity doubles and "),h("em",null,"every key is rehashed"),M(", because a key's slot is a function of the capacity it was inserted under. Watch the rehash step through key by key — most of them move. Each individual resize is O(n), but it only happens after n more inserts, so the amortized cost per insert stays constant. ")],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint"}," Why deletion needs a tombstone ",-1),h("p",{class:"mb-2 text-ink-muted"},[M(" Under open addressing a search stops at the first "),h("em",null,"empty"),M(" slot — that is what makes a miss cheap. So emptying a slot on delete would cut every probe sequence that ran through it, and any key stored further along its own sequence would become invisible while still sitting in the table. Instead the slot is marked "),h("span",{class:"font-mono text-tone-rejected-ink"},"✕ deleted"),M(": searches walk straight past it, and a later insert may reuse it. Delete a key from the middle of a cluster and search for one after it — the tombstone is what makes the lookup still succeed. ")],-1),h("p",{class:"text-ink-faint"}," Tombstones are not free: they hold no key but still cost a probe, so they count toward the fill that triggers a resize. A rehash is also how they get cleaned up. ",-1)])]),_:1}))}}),Gk={class:"space-y-4"},Wk={key:0,class:"mt-1 text-[11px] text-ink-faint"},Yk={class:"nums font-mono"},Xk={key:0,class:"mt-1 text-[11px] text-ink-faint"},Jk={class:"nums font-mono"},Qk={class:"mt-4"},Zk={class:"grid grid-cols-2 gap-2"},e0={class:"mt-2 text-xs leading-relaxed text-ink-muted"},t0={class:"mt-5 grid grid-cols-2 gap-2"},n0=se({__name:"HashControls",props:{capacity:{},effectiveCapacity:{},threshold:{},activeThreshold:{},hashFnKey:{},speed:{},status:{},canEdit:{type:Boolean},isRunning:{type:Boolean},isPaused:{type:Boolean}},emits:["update:capacity","update:threshold","update:hashFnKey","update:speed","run","pause","reset","step"],setup(t,{emit:e}){const n=t,s=e,o=Object.keys(zn),a=C(()=>Math.round(n.threshold*100)),r=C(()=>n.capacity!==n.effectiveCapacity),i=C(()=>Math.abs(n.threshold-n.activeThreshold)>.001);return(l,u)=>(x(),Y(we,{title:"Controls"},{default:D(()=>[h("div",Gk,[h("div",null,[A(Ve,{label:"Capacity","model-value":t.capacity,min:4,max:64,step:4,suffix:" slots",disabled:!t.canEdit,"onUpdate:modelValue":u[0]||(u[0]=c=>s("update:capacity",c))},null,8,["model-value","disabled"]),r.value?(x(),T("p",Wk,[u[7]||(u[7]=M(" Rounded up to ",-1)),h("span",Yk,R(t.effectiveCapacity),1),u[8]||(u[8]=M(" — every capacity here is a power of two. ",-1))])):pe("",!0)]),h("div",null,[A(Ve,{label:"Resize threshold","model-value":a.value,min:25,max:150,step:5,suffix:"%",disabled:!t.canEdit,"onUpdate:modelValue":u[1]||(u[1]=c=>s("update:threshold",c/100))},null,8,["model-value","disabled"]),i.value?(x(),T("p",Xk,[u[9]||(u[9]=M(" Capped at ",-1)),h("span",Jk,R(Math.round(t.activeThreshold*100))+"%",1),u[10]||(u[10]=M(" — open addressing stores one key per slot, so it can never reach α = 1. ",-1))])):pe("",!0)]),A(Ve,{label:"Speed","model-value":t.speed,min:1,max:100,suffix:"%","onUpdate:modelValue":u[2]||(u[2]=c=>s("update:speed",c))},null,8,["model-value"])]),h("div",Qk,[u[11]||(u[11]=h("div",{class:"mb-1.5 text-sm font-medium text-ink-muted"},"Hash function",-1)),h("div",Zk,[(x(!0),T(te,null,de(f(o),c=>(x(),Y(Z,{key:c,variant:"selector",active:c===t.hashFnKey,disabled:!t.canEdit,onClick:d=>s("update:hashFnKey",c)},{default:D(()=>[M(R(f(zn)[c].name),1)]),_:2},1032,["active","disabled","onClick"]))),128))]),h("p",e0,R(f(zn)[t.hashFnKey].description),1)]),h("div",t0,[t.isRunning?(x(),Y(Z,{key:1,variant:"warning",class:"col-span-2",onClick:u[4]||(u[4]=c=>s("pause"))},{default:D(()=>[...u[13]||(u[13]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M6 4h4v16H6zM14 4h4v16h-4z"})],-1),M(" Pause ",-1)])]),_:1})):(x(),Y(Z,{key:0,variant:"primary",class:"col-span-2",onClick:u[3]||(u[3]=c=>s("run"))},{default:D(()=>[u[12]||(u[12]=h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M8 5v14l11-7z"})],-1)),M(" "+R(t.isPaused?"Resume":"Run"),1)]),_:1})),A(Z,{variant:"neutral",onClick:u[5]||(u[5]=c=>s("reset"))},{default:D(()=>[...u[14]||(u[14]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.36 2.64L3 8"}),h("path",{d:"M3 3v5h5"})],-1),M(" Reset ",-1)])]),_:1}),A(Z,{variant:"neutral",disabled:t.isRunning,onClick:u[6]||(u[6]=c=>s("step"))},{default:D(()=>[...u[15]||(u[15]=[M(" Step ▶ ",-1)])]),_:1},8,["disabled"])]),u[16]||(u[16]=h("p",{class:"mt-3 text-center text-xs text-ink-faint"}," Strategy, capacity, threshold & hash function lock while a script is running. ",-1))]),_:1}))}}),s0={class:"grid grid-cols-3 gap-2"},o0={class:"mt-3 flex items-end gap-2"},a0={class:"min-w-0 flex-1"},r0={class:"mt-3 grid grid-cols-3 gap-2"},i0={key:0,class:"mt-2 text-xs text-warn-ink"},l0={class:"mt-3 block"},u0={class:"mb-1.5 flex items-center justify-between text-sm"},c0=["disabled"],d0=["value","disabled"],p0={key:1,class:"mt-4 text-sm text-ink-faint"},f0={key:2,class:"mt-4 max-h-56 space-y-1 overflow-y-auto pr-1"},h0={class:"w-6 text-right font-mono tabular-nums text-ink-faint"},m0={class:"min-w-0 flex-1 truncate font-mono text-ink-muted"},g0=["disabled","aria-label","onClick"],b0=se({__name:"HashOpBuilder",props:{script:{},canEdit:{type:Boolean},seed:{},notice:{}},emits:["add","remove","clear","bulk-load","force-collision","update:seed","randomize-seed"],setup(t,{emit:e}){const n=t,s=e,o=[{kind:"insert",label:"Insert"},{kind:"search",label:"Search"},{kind:"delete",label:"Delete"}],a={insert:"bg-ok-soft text-ok-ink",search:"bg-accent-soft text-accent-ink",delete:"bg-danger-soft text-danger-ink"},r=B("insert"),i=B(""),l=/^[A-Za-z0-9]{1,12}$/,u=C(()=>i.value===""||l.test(i.value)?null:"Letters and digits only, up to 12 characters."),c=C(()=>n.canEdit&&i.value!==""&&u.value===null);function d(){c.value&&(s("add",r.value,i.value),i.value="")}const p=m=>s("update:seed",Number(m.target.value));return(m,y)=>(x(),Y(we,{title:"Operation script"},{default:D(()=>[h("div",s0,[(x(),T(te,null,de(o,g=>A(Z,{key:g.kind,variant:"selector",active:r.value===g.kind,disabled:!t.canEdit,onClick:v=>r.value=g.kind},{default:D(()=>[M(R(g.label),1)]),_:2},1032,["active","disabled","onClick"])),64))]),h("div",o0,[h("div",a0,[A(kt,{modelValue:i.value,"onUpdate:modelValue":y[0]||(y[0]=g=>i.value=g),label:"Key",placeholder:"cat",monospace:"",error:u.value,disabled:!t.canEdit,onKeydown:y[1]||(y[1]=Rt(g=>d(),["enter"]))},null,8,["modelValue","error","disabled"])]),A(Z,{variant:"primary",class:"mb-[1px]",disabled:!c.value,onClick:y[2]||(y[2]=g=>d())},{default:D(()=>[...y[7]||(y[7]=[M(" Add ",-1)])]),_:1},8,["disabled"])]),h("div",r0,[A(Z,{variant:"quiet",disabled:!t.canEdit,onClick:y[3]||(y[3]=g=>s("bulk-load"))},{default:D(()=>[...y[8]||(y[8]=[M(" Bulk load ",-1)])]),_:1},8,["disabled"]),A(Z,{variant:"quiet",disabled:!t.canEdit,onClick:y[4]||(y[4]=g=>s("force-collision"))},{default:D(()=>[...y[9]||(y[9]=[M(" Force collision ",-1)])]),_:1},8,["disabled"]),A(Z,{variant:"quiet",disabled:!t.canEdit||t.script.length===0,onClick:y[5]||(y[5]=g=>s("clear"))},{default:D(()=>[...y[10]||(y[10]=[M(" Clear ",-1)])]),_:1},8,["disabled"])]),t.notice?(x(),T("p",i0,R(t.notice),1)):pe("",!0),h("label",l0,[h("div",u0,[y[11]||(y[11]=h("span",{class:"font-medium text-ink-muted"},"Seed",-1)),h("button",{type:"button",class:"text-xs font-semibold text-accent hover:underline disabled:opacity-50",disabled:!t.canEdit,onClick:y[6]||(y[6]=g=>s("randomize-seed"))}," Randomize ",8,c0)]),h("input",{type:"number",value:t.seed,disabled:!t.canEdit,class:"w-full rounded-xl border border-line bg-surface-raised px-3 py-2 font-mono text-sm text-ink disabled:cursor-not-allowed disabled:opacity-50",onInput:p},null,40,d0)]),t.script.length===0?(x(),T("p",p0," No operations yet — add one, or bulk load a handful of keys. ")):(x(),T("ol",f0,[(x(!0),T(te,null,de(t.script,(g,v)=>(x(),T("li",{key:`${v}-${g.kind}-${g.key}`,class:"flex items-center gap-2 rounded-lg bg-surface-alt px-2 py-1 text-xs"},[h("span",h0,R(v+1),1),h("span",{class:ve(["rounded px-1.5 py-0.5 font-semibold uppercase",a[g.kind]])},R(g.kind),3),h("span",m0,R(g.key),1),h("button",{type:"button",class:"shrink-0 rounded px-1.5 text-ink-faint hover:text-danger disabled:opacity-40",disabled:!t.canEdit,"aria-label":`Remove operation ${v+1}`,onClick:b=>s("remove",v)}," ✕ ",8,g0)]))),128))]))]),_:1}))}}),v0={class:"mb-1.5 flex items-baseline justify-between text-sm"},y0={class:"font-medium text-ink-muted"},w0={class:"nums ml-1 font-mono text-xs text-ink-faint"},x0=["aria-valuenow","aria-valuemax","aria-label"],k0={class:"mt-1 text-[11px] text-ink-faint"},S0={class:"nums font-mono"},$0=se({__name:"LoadFactorMeter",props:{loadFactor:{},threshold:{},size:{},capacity:{}},setup(t){const e=t,n=C(()=>Math.max(1,e.threshold*1.2));function s(a){return`${Math.min(100,Math.max(0,a/n.value*100))}%`}const o=C(()=>e.loadFactor>e.threshold);return(a,r)=>(x(),T("div",null,[h("div",v0,[h("span",y0,[r[0]||(r[0]=M(" Load factor α ",-1)),h("span",w0,R(t.size)+" / "+R(t.capacity),1)]),h("span",{class:ve(["nums font-mono font-semibold",o.value?"text-warn":"text-accent"])},R(t.loadFactor.toFixed(2)),3)]),h("div",{class:"relative h-2.5 w-full overflow-hidden rounded-full bg-surface-alt",role:"meter","aria-valuenow":Number(t.loadFactor.toFixed(2)),"aria-valuemin":0,"aria-valuemax":Number(n.value.toFixed(2)),"aria-label":`Load factor, resize threshold ${t.threshold.toFixed(2)}`},[h("div",{class:ve(["h-full rounded-full transition-all",o.value?"bg-warn":"bg-accent"]),style:cn({width:s(t.loadFactor)})},null,6),h("div",{class:"absolute inset-y-0 w-0.5 bg-danger",style:cn({left:s(t.threshold)}),"aria-hidden":"true"},null,4)],8,x0),h("p",k0,[r[1]||(r[1]=M(" Grows past ",-1)),h("span",S0,R(t.threshold.toFixed(2)),1),r[2]||(r[2]=M("; open addressing also counts tombstones toward the fill. ",-1))])]))}}),E0={class:"mt-4"},C0=se({__name:"HashStats",props:{size:{},capacity:{},loadFactor:{},threshold:{},probes:{},collisions:{},resizes:{},avgProbes:{}},setup(t){const e=t,n=C(()=>[{label:"Keys",value:`${e.size} / ${e.capacity}`},{label:"Load α",value:e.loadFactor.toFixed(2)},{label:"Probes",value:e.probes.toLocaleString()},{label:"Collisions",value:e.collisions.toLocaleString()},{label:"Probes / op",value:e.avgProbes===0?"—":e.avgProbes.toFixed(2)},{label:"Resizes",value:String(e.resizes)}]);return(s,o)=>(x(),Y(we,{title:"Statistics"},{default:D(()=>[A(Lr,{cells:n.value,columns:3},null,8,["cells"]),h("div",E0,[A($0,{"load-factor":t.loadFactor,threshold:t.threshold,size:t.size,capacity:t.capacity},null,8,["load-factor","threshold","size","capacity"])])]),_:1}))}}),A0={class:"max-h-[32rem] flex-1 overflow-y-auto pr-1"},T0={class:"space-y-1"},O0=["data-bucket","data-state","data-home","data-probing"],M0=["data-home"],_0=["data-probe-order","title"],R0={key:1},j0={class:"flex min-w-0 flex-wrap items-center gap-1"},I0=["data-key","data-link-state"],D0={key:1,"data-role":"empty",class:"font-mono text-xs text-ink-faint"},L0=se({__name:"BucketArray",props:{buckets:{},homeIndex:{default:null},probeIndex:{default:null},probeSeq:{default:()=>[]},phase:{default:"idle"},activeKey:{default:null},chaining:{type:Boolean,default:!1}},setup(t){const e=t,n=kn([{tone:"probe",label:"probing now"},{tone:"probe",label:"probed"},{tone:"rejected",label:"tombstone"},{tone:"idle",label:"empty"}]),s=C(()=>new Set(e.probeSeq));function o(u){return s.value.has(u)?e.chaining?e.probeSeq.length:e.probeSeq.indexOf(u)+1:null}const a=C(()=>e.chaining&&e.probeSeq.length>0?e.probeSeq.length-1:-1);function r(u,c){return!e.chaining||e.phase==="idle"?!1:u===e.homeIndex&&c===a.value}function i(u){return u!==e.activeKey?!1:e.phase==="found"||e.phase==="inserted"||e.phase==="updated"}function l(u){return u===e.probeIndex?"bg-tone-probe/20 ring-1 ring-tone-probe":s.value.has(u)?"bg-tone-probe/[0.07]":""}return(u,c)=>(x(),Y(we,{title:"Buckets",class:"flex h-full flex-col"},{header:D(()=>[c[0]||(c[0]=h("div",{class:"flex flex-wrap items-center gap-3 text-xs text-ink-muted"},[h("span",{class:"flex items-center gap-1.5"},[h("i",{class:"h-3 w-3 rounded-mark bg-accent"}),M("home slot")])],-1)),A(_n,{items:f(n)},null,8,["items"])]),default:D(()=>[h("div",A0,[h("ol",T0,[(x(!0),T(te,null,de(t.buckets,(d,p)=>(x(),T("li",{key:p,"data-bucket":p,"data-state":d.state,"data-home":p===t.homeIndex?"true":void 0,"data-probing":p===t.probeIndex?"true":void 0,class:ve(["grid grid-cols-[2.25rem_1.75rem_minmax(0,1fr)] items-center gap-2 rounded-lg px-1 py-1 transition-colors",l(p)])},[h("span",{"data-home":p===t.homeIndex?"true":void 0,class:ve(["rounded-md py-1 text-center font-mono text-xs tabular-nums",p===t.homeIndex?"bg-accent font-bold text-accent-ink":"text-ink-muted"])},R(p),11,M0),o(p)!==null?(x(),T("span",{key:0,"data-probe-order":o(p),class:"rounded-md bg-tone-probe/80 py-0.5 text-center font-mono text-[10px] font-bold text-tone-probe-ink",title:t.chaining?"links walked":"probe number"},R(t.chaining?"↓":"")+R(o(p)),9,_0)):(x(),T("span",R0)),h("div",j0,[(x(!0),T(te,null,de(d.entries,(m,y)=>(x(),T("span",{key:m.key,"data-role":"entry","data-key":m.key,"data-link-state":i(m.key)?"resolved":r(p,y)?"cursor":void 0,class:ve(["inline-flex max-w-full items-center gap-1 truncate rounded-full border px-2 py-0.5 font-mono text-xs",i(m.key)?`${f(Qe).settled} bg-tone-settled/20 font-bold ${f(Bn).settled}`:r(p,y)?`${f(Qe).probe} bg-tone-probe/30 font-bold ${f(Bn).probe}`:"border-line bg-surface-raised text-ink-muted"])},R(m.key),11,I0))),128)),d.state==="tombstone"?(x(),T("span",{key:0,"data-role":"tombstone",class:ve(`inline-flex items-center gap-1 rounded-full border border-dashed px-2 py-0.5 font-mono text-xs ${f(Qe).rejected} ${f(Bn).rejected}`)},"✕ deleted",2)):d.entries.length===0?(x(),T("span",D0,"—")):pe("",!0)])],10,O0))),128))])])]),_:1}))}}),N0={class:"grid gap-4 lg:grid-cols-[minmax(0,360px)_1fr]"},P0={class:"flex flex-col gap-4"},B0={class:"flex flex-col gap-4"},F0=se({__name:"HashTableView",setup(t){const e=mb();Re(e.strategyKey,()=>{e.isDone.value&&e.reset()});const n=B(null);function s(){const d=e.forceCollision();n.value=`Collision forced — 3 keys were queued to land in bucket ${d}.`}function o(){e.clearScript(),n.value=null}const a=C(()=>e.strategyKey.value==="chaining"),r={idle:"Press Run or Step to begin.",hashing:"Hashing the key to find its home slot.",probing:"Collision — walking the probe sequence.",inserted:"Inserted.",updated:"Key already present — value overwritten.",found:"Found.","not-found":"Not found.",deleted:"Deleted.",resizing:"Load factor exceeded the threshold — growing the table.",rehashed:"Rehashing an existing key into the grown table."},i={idle:"neutral",hashing:"neutral",probing:"warn",inserted:"good",updated:"good",found:"good","not-found":"bad",deleted:"good",resizing:"warn",rehashed:"neutral"},l=C(()=>e.view.op!==null),u=C(()=>l.value?r[e.view.phase]:null),c=C(()=>{if(!l.value)return[];const d=e.view,p=[{label:"Operation",value:d.op??"—"},{label:"Key",value:d.key??"—"}];return d.hash!==null&&p.push({label:"Hash",value:String(d.hash)}),d.homeIndex!==null&&p.push({label:"Home index",value:String(d.homeIndex)}),d.probeIndex!==null&&p.push({label:"Probe index",value:String(d.probeIndex)}),p.push({label:"Probes this op",value:String(d.probeSeq.length)}),p.push({label:"Phase",value:d.phase,tone:i[d.phase]}),p});return(d,p)=>(x(),T("div",N0,[h("div",P0,[A(Tn,{modelValue:f(e).strategyKey.value,"onUpdate:modelValue":p[0]||(p[0]=m=>f(e).strategyKey.value=m),algorithms:f(sa),columns:2,disabled:!f(e).canEdit.value},null,8,["modelValue","algorithms","disabled"]),A(Kk),A(n0,{capacity:f(e).capacity.value,"effective-capacity":f(e).startCapacity.value,threshold:f(e).threshold.value,"active-threshold":f(e).activeThreshold.value,"hash-fn-key":f(e).hashFnKey.value,speed:f(e).speed.value,status:f(e).status.value,"can-edit":f(e).canEdit.value,"is-running":f(e).isRunning.value,"is-paused":f(e).isPaused.value,"onUpdate:capacity":p[1]||(p[1]=m=>f(e).capacity.value=m),"onUpdate:threshold":p[2]||(p[2]=m=>f(e).threshold.value=m),"onUpdate:hashFnKey":p[3]||(p[3]=m=>f(e).hashFnKey.value=m),"onUpdate:speed":p[4]||(p[4]=m=>f(e).speed.value=m),onRun:p[5]||(p[5]=m=>f(e).run()),onPause:p[6]||(p[6]=m=>f(e).pause()),onReset:p[7]||(p[7]=m=>f(e).reset()),onStep:p[8]||(p[8]=m=>f(e).stepForward())},null,8,["capacity","effective-capacity","threshold","active-threshold","hash-fn-key","speed","status","can-edit","is-running","is-paused"]),A(b0,{script:f(e).script.value,"can-edit":f(e).canEdit.value,seed:f(e).seed.value,notice:n.value,onAdd:f(e).addOp,onRemove:f(e).removeOp,onClear:p[9]||(p[9]=m=>o()),onBulkLoad:p[10]||(p[10]=m=>f(e).bulkLoad()),onForceCollision:p[11]||(p[11]=m=>s()),"onUpdate:seed":p[12]||(p[12]=m=>f(e).seed.value=m),onRandomizeSeed:p[13]||(p[13]=m=>f(e).randomizeSeed())},null,8,["script","can-edit","seed","notice","onAdd","onRemove"]),A(xn,{cursor:f(e).cursor.value,"buffered-count":f(e).bufferedCount.value,"fully-buffered":f(e).fullyBuffered.value,"can-step-back":f(e).canStepBack.value,"can-step-forward":f(e).canStepForward.value,onSeek:p[14]||(p[14]=m=>f(e).seek(m)),onStepBack:p[15]||(p[15]=m=>f(e).stepBack()),onStepForward:p[16]||(p[16]=m=>f(e).stepForward()),onSkipToEnd:p[17]||(p[17]=m=>f(e).skipToEnd())},null,8,["cursor","buffered-count","fully-buffered","can-step-back","can-step-forward"])]),h("div",B0,[A(C0,{size:f(e).view.size,capacity:f(e).view.capacity,"load-factor":f(e).view.loadFactor,threshold:f(e).activeThreshold.value,probes:f(e).stats.probes,collisions:f(e).stats.collisions,resizes:f(e).stats.resizes,"avg-probes":f(e).avgProbes.value},null,8,["size","capacity","load-factor","threshold","probes","collisions","resizes","avg-probes"]),A(L0,{class:"flex-1",buckets:f(e).buckets.value,"home-index":f(e).view.homeIndex,"probe-index":f(e).view.probeIndex,"probe-seq":f(e).view.probeSeq,phase:f(e).view.phase,"active-key":f(e).view.key,chaining:a.value},null,8,["buckets","home-index","probe-index","probe-seq","phase","active-key","chaining"]),A(Dr,{title:"Why this step",headline:u.value,formula:f(e).view.explain,rows:c.value},null,8,["headline","formula","rows"]),A(aa,{lines:f(e).pseudocodeLines.value,"active-line":f(e).activeLine.value,source:f(e).sourceCode.value.text,"source-file":f(e).sourceCode.value.file,"active-source-lines":f(e).activeSourceLines.value},null,8,["lines","active-line","source","source-file","active-source-lines"])])]))}}),Fn=[{path:"/sorting",name:"sorting",component:zv,meta:{label:"Sorting",pitch:"Watch bars compare and swap their way into order.",count:Object.keys(us).length}},{path:"/searching",name:"searching",component:iy,meta:{label:"Searching",pitch:"Narrow down a target and see how many probes it takes.",count:Object.keys(Qo).length}},{path:"/dp",name:"dp",component:W1,meta:{label:"DP",pitch:"Fill a table cell by cell and trace the answer back out of it.",count:Object.keys(Gt).length}},{path:"/pathfinding",name:"pathfinding",component:Ey,meta:{label:"Pathfinding",pitch:"Paint walls on a grid and race algorithms to the exit.",count:Object.keys(Zo).length}},{path:"/bst",name:"bst",component:Uy,meta:{label:"BST",pitch:"Insert, search and delete nodes in a binary search tree."}},{path:"/heap",name:"heap",component:cw,meta:{label:"Heap",pitch:"Sift values up and down to keep the heap property."}},{path:"/graph",name:"graph",component:Dw,meta:{label:"Graph",pitch:"Traverse nodes and edges breadth- or depth-first.",count:Object.keys(ea).length}},{path:"/mst",name:"mst",component:qk,meta:{label:"Union-Find & MST",pitch:"Merge disjoint sets, then grow a minimum spanning tree from them.",count:Object.keys(ta).length}},{path:"/hashing",name:"hashing",component:F0,meta:{label:"Hashing",pitch:"Watch keys collide, probe, and rehash as the table fills up.",count:Object.keys(sa).length}},{path:"/concurrency",name:"concurrency",component:a1,meta:{label:"Concurrency",pitch:"Find the exact thread interleaving that breaks the invariant.",count:Object.keys(qs).length}},{path:"/sandbox",name:"sandbox",component:kx,meta:{label:"Sandbox",pitch:"Write your own algorithm and watch it run, safely isolated."}}],H0=[{path:"/",name:"landing",component:tg,meta:{label:"Home",pitch:""}},...Fn,{path:"/:pathMatch(.*)*",redirect:"/"}],Tc=ih({history:Hf("/algoviz/preview/claude-website-theme-design-system-3t7ms6/"),routes:H0}),Oc=[{name:"midnight",label:"Midnight",blurb:"Deep blue-black with a single cyan accent.",dark:!0,group:"Core"},{name:"daylight",label:"Daylight",blurb:"Clean and bright, crisp hairlines.",dark:!1,group:"Core"},{name:"neon",label:"Neon",blurb:"Near-black with acid mint and a glow.",dark:!0,group:"Expressive"},{name:"pastel",label:"Pastel",blurb:"Warm paper, soft fills, inked borders.",dark:!1,group:"Expressive"},{name:"mono",label:"Monochrome",blurb:"One hue. State reads as texture and outline.",dark:!0,group:"Expressive"},{name:"terminal",label:"Terminal",blurb:"Amber phosphor, square corners, all mono.",dark:!0,group:"Expressive"},{name:"paper",label:"Paper",blurb:"Risograph spot inks on off-white stock.",dark:!1,group:"Expressive"},{name:"contrast",label:"High Contrast",blurb:"Maximum contrast, colourblind-safe states.",dark:!0,group:"Accessible"}],Mc="midnight",V0=new Set(Oc.map(t=>t.name));function U0(t){return typeof t=="string"&&V0.has(t)}function z0(t){return t==="dark"?"midnight":t==="light"?"daylight":U0(t)?t:Mc}const _c="algoviz-theme";function q0(){try{return z0(localStorage.getItem(_c))}catch{return Mc}}const Do=B(q0());function ml(){document.documentElement.setAttribute("data-theme",Do.value);try{localStorage.setItem(_c,Do.value)}catch{}}function Rc(){function t(n){Do.value=n,ml()}function e(){ml()}return{theme:Do,themes:Oc,setTheme:t,initTheme:e}}const K0={class:"relative"},G0=["aria-expanded","title"],W0={class:"hidden text-sm font-semibold sm:inline"},Y0={class:"sr-only"},X0={class:"px-2 pb-1 pt-2 text-[0.65rem] font-semibold uppercase tracking-wider text-ink-faint"},J0=["aria-selected","tabindex","onClick"],Q0=["data-theme"],Z0={class:"min-w-0 flex-1"},eS={class:"block text-sm font-semibold text-ink"},tS={class:"block truncate text-xs text-ink-muted"},nS={key:0,"aria-hidden":"true",class:"shrink-0 text-accent"},sS=se({__name:"ThemePicker",setup(t){const{theme:e,themes:n,setTheme:s}=Rc(),o=B(!1),a=B(null),r=B(null),i=B(0),l=C(()=>n.find(b=>b.name===e.value)??n[0]),u=C(()=>{const b=[];for(const w of n){const S=b.find($=>$.label===w.group);S?S.items.push(w):b.push({label:w.group,items:[w]})}return b}),c=C(()=>u.value.flatMap(b=>b.items));function d(b){const w=c.value.length;i.value=(b%w+w)%w,hs(()=>{var $,_;const S=($=a.value)==null?void 0:$.querySelectorAll('[role="option"]');(_=S==null?void 0:S[i.value])==null||_.focus()})}function p(){o.value=!o.value,o.value&&d(c.value.findIndex(b=>b.name===e.value))}function m(b=!0){var w;o.value&&(o.value=!1,b&&((w=r.value)==null||w.focus()))}function y(b){s(b),m()}function g(b){switch(b.key){case"ArrowDown":b.preventDefault(),d(i.value+1);break;case"ArrowUp":b.preventDefault(),d(i.value-1);break;case"Home":b.preventDefault(),d(0);break;case"End":b.preventDefault(),d(c.value.length-1);break;case"Escape":b.preventDefault(),m();break}}function v(b){var S,$;const w=b.target;(S=a.value)!=null&&S.contains(w)||($=r.value)!=null&&$.contains(w)||m(!1)}return Re(o,b=>{b?document.addEventListener("pointerdown",v):document.removeEventListener("pointerdown",v)}),Jl(()=>document.removeEventListener("pointerdown",v)),(b,w)=>(x(),T("div",K0,[h("button",{ref_key:"trigger",ref:r,type:"button",class:"flex h-10 items-center gap-2 rounded-xl border border-line bg-surface px-3 text-ink-muted transition-colors hover:text-accent","aria-haspopup":"listbox","aria-expanded":o.value,title:`Theme: ${l.value.label}`,onClick:p},[w[0]||(w[0]=h("span",{class:"flex gap-0.5","aria-hidden":"true"},[h("i",{class:"h-4 w-1.5 rounded-sm bg-accent"}),h("i",{class:"h-4 w-1.5 rounded-sm bg-tone-probe"}),h("i",{class:"h-4 w-1.5 rounded-sm bg-tone-settled"})],-1)),h("span",W0,R(l.value.label),1),h("span",Y0,"Change theme, currently "+R(l.value.label),1)],8,G0),o.value?(x(),T("div",{key:0,ref_key:"listbox",ref:a,role:"listbox","aria-label":"Theme",class:"absolute right-0 z-50 mt-2 w-72 overflow-hidden rounded-2xl border border-line bg-surface-raised p-1.5 shadow-xl",onKeydown:g},[(x(!0),T(te,null,de(u.value,S=>(x(),T(te,{key:S.label},[h("p",X0,R(S.label),1),(x(!0),T(te,null,de(S.items,$=>{var _;return x(),T("button",{key:$.name,role:"option",type:"button","aria-selected":$.name===f(e),tabindex:((_=c.value[i.value])==null?void 0:_.name)===$.name?0:-1,class:"flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-surface-alt focus:bg-surface-alt focus:outline-none",onClick:P=>y($.name)},[h("span",{"data-theme":$.name,class:"flex shrink-0 gap-px overflow-hidden rounded-md border border-line bg-canvas p-1","aria-hidden":"true"},[...w[1]||(w[1]=[h("i",{class:"h-5 w-2 rounded-sm bg-surface"},null,-1),h("i",{class:"h-5 w-2 rounded-sm bg-accent"},null,-1),h("i",{class:"h-5 w-2 rounded-sm bg-tone-probe"},null,-1),h("i",{class:"h-5 w-2 rounded-sm bg-tone-settled"},null,-1)])],8,Q0),h("span",Z0,[h("span",eS,R($.label),1),h("span",tS,R($.blurb),1)]),$.name===f(e)?(x(),T("span",nS,"✓")):pe("",!0)],8,J0)}),128))],64))),128))],544)):pe("",!0)]))}}),oS={class:"min-h-screen"},aS={class:"border-b border-line"},rS={class:"mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4"},iS={class:"border-b border-line","aria-label":"Categories"},lS={class:"mx-auto max-w-6xl px-4 sm:px-6"},uS={class:"-mb-px flex gap-1 overflow-x-auto"},cS={class:"mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8"},dS=se({__name:"App",setup(t){return(e,n)=>(x(),T("div",oS,[h("header",aS,[h("div",rS,[A(f(zs),{to:"/",class:"group flex items-baseline gap-2.5"},{default:D(()=>[...n[0]||(n[0]=[h("span",{class:"font-display text-xl font-extrabold tracking-tight text-ink sm:text-2xl"},"AlgoViz",-1),h("span",{"aria-hidden":"true",class:"h-4 w-px bg-line-strong"},null,-1),h("span",{class:"hidden text-2xs uppercase text-ink-faint sm:inline"}," Algorithm Visualizer ",-1)])]),_:1}),A(sS)])]),h("nav",iS,[h("div",lS,[h("ul",uS,[(x(!0),T(te,null,de(f(Fn),s=>(x(),T("li",{key:s.path,class:"shrink-0"},[A(f(zs),{to:s.path,class:ve(["block whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors",e.$route.path===s.path?"border-accent text-accent":"border-transparent text-ink-muted hover:border-line-strong hover:text-ink"])},{default:D(()=>{var o;return[M(R((o=s.meta)==null?void 0:o.label),1)]}),_:2},1032,["to","class"])]))),128))])])]),h("main",cS,[A(f(Nu)),n[1]||(n[1]=h("footer",{class:"mt-10 border-t border-line pt-5 text-xs text-ink-faint"}," Every algorithm here is a generator that yields a snapshot after each meaningful step — nothing is pre-rendered. ",-1))])]))}});Rc().initTheme();const pS=new Set(Fn.map(t=>t.name));nc().trackLastVisited(Tc,t=>pS.has(t));Zp(dS).use(Tc).mount("#app");
