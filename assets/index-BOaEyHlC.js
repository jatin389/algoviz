var zc=Object.defineProperty;var qc=(t,e,n)=>e in t?zc(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var en=(t,e,n)=>qc(t,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(o){if(o.ep)return;o.ep=!0;const a=n(o);fetch(o.href,a)}})();/**
* @vue/shared v3.5.40
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function pr(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const Ae={},ss=[],Jt=()=>{},El=()=>!1,Bo=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),Fo=t=>t.startsWith("onUpdate:"),tt=Object.assign,fr=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},Kc=Object.prototype.hasOwnProperty,Me=(t,e)=>Kc.call(t,e),ve=Array.isArray,os=t=>Xs(t)==="[object Map]",Vo=t=>Xs(t)==="[object Set]",Wr=t=>Xs(t)==="[object Date]",xe=t=>typeof t=="function",Fe=t=>typeof t=="string",Pt=t=>typeof t=="symbol",je=t=>t!==null&&typeof t=="object",Cl=t=>(je(t)||xe(t))&&xe(t.then)&&xe(t.catch),Al=Object.prototype.toString,Xs=t=>Al.call(t),Gc=t=>Xs(t).slice(8,-1),Tl=t=>Xs(t)==="[object Object]",hr=t=>Fe(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,_s=pr(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Ho=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},Wc=/-\w/g,pt=Ho(t=>t.replace(Wc,e=>e.slice(1).toUpperCase())),Xc=/\B([A-Z])/g,gn=Ho(t=>t.replace(Xc,"-$1").toLowerCase()),Uo=Ho(t=>t.charAt(0).toUpperCase()+t.slice(1)),ca=Ho(t=>t?`on${Uo(t)}`:""),ot=(t,e)=>!Object.is(t,e),go=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},Ol=(t,e,n,s=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:s,value:n})},zo=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let Xr;const qo=()=>Xr||(Xr=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Tt(t){if(ve(t)){const e={};for(let n=0;n<t.length;n++){const s=t[n],o=Fe(s)?Zc(s):Tt(s);if(o)for(const a in o)e[a]=o[a]}return e}else if(Fe(t)||je(t))return t}const Yc=/;(?![^(]*\))/g,Jc=/:([^]+)/,Qc=/\/\*[^]*?\*\//g;function Zc(t){const e={};return t.replace(Qc,"").split(Yc).forEach(n=>{if(n){const s=n.split(Jc);s.length>1&&(e[s[0].trim()]=s[1].trim())}}),e}function fe(t){let e="";if(Fe(t))e=t;else if(ve(t))for(let n=0;n<t.length;n++){const s=fe(t[n]);s&&(e+=s+" ")}else if(je(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const ed="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",td=pr(ed);function _l(t){return!!t||t===""}function nd(t,e){if(t.length!==e.length)return!1;let n=!0;for(let s=0;n&&s<t.length;s++)n=Ys(t[s],e[s]);return n}function Ys(t,e){if(t===e)return!0;let n=Wr(t),s=Wr(e);if(n||s)return n&&s?t.getTime()===e.getTime():!1;if(n=Pt(t),s=Pt(e),n||s)return t===e;if(n=ve(t),s=ve(e),n||s)return n&&s?nd(t,e):!1;if(n=je(t),s=je(e),n||s){if(!n||!s)return!1;const o=Object.keys(t).length,a=Object.keys(e).length;if(o!==a)return!1;for(const r in t){const i=t.hasOwnProperty(r),l=e.hasOwnProperty(r);if(i&&!l||!i&&l||!Ys(t[r],e[r]))return!1}}return String(t)===String(e)}function sd(t,e){return t.findIndex(n=>Ys(n,e))}const Ml=t=>!!(t&&t.__v_isRef===!0),M=t=>Fe(t)?t:t==null?"":ve(t)||je(t)&&(t.toString===Al||!xe(t.toString))?Ml(t)?M(t.value):JSON.stringify(t,Rl,2):String(t),Rl=(t,e)=>Ml(e)?Rl(t,e.value):os(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[s,o],a)=>(n[da(s,a)+" =>"]=o,n),{})}:Vo(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>da(n))}:Pt(e)?da(e):je(e)&&!ve(e)&&!Tl(e)?String(e):e,da=(t,e="")=>{var n;return Pt(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.5.40
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Ge;class od{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!e&&Ge&&(Ge.active?(this.parent=Ge,this.index=(Ge.scopes||(Ge.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes){const s=this.scopes.slice();for(e=0,n=s.length;e<n;e++)s[e].pause()}for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes){const o=this.scopes.slice();for(e=0,n=o.length;e<n;e++)o[e].resume()}const s=this.effects.slice();for(e=0,n=s.length;e<n;e++)s[e].resume()}}run(e){if(this._active){const n=Ge;try{return Ge=this,e()}finally{Ge=n}}}on(){++this._on===1&&(this.prevScope=Ge,Ge=this)}off(){if(this._on>0&&--this._on===0){if(Ge===this)Ge=this.prevScope;else{let e=Ge;for(;e;){if(e.prevScope===this){e.prevScope=this.prevScope;break}e=e.prevScope}}this.prevScope=void 0}}stop(e){if(this._active){this._active=!1;let n,s;for(n=0,s=this.effects.length;n<s;n++)this.effects[n].stop();for(this.effects.length=0,n=0,s=this.cleanups.length;n<s;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){const o=this.scopes.slice();for(n=0,s=o.length;n<s;n++)o[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const o=this.parent.scopes.pop();o&&o!==this&&(this.parent.scopes[this.index]=o,o.index=this.index)}this.parent=void 0}}}function ad(){return Ge}function Ko(t,e=!1){Ge&&Ge.cleanups.push(t)}let Le;const pa=new WeakSet;class jl{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Ge&&(Ge.active?Ge.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,pa.has(this)&&(pa.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Dl(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Yr(this),Ll(this);const e=Le,n=It;Le=this,It=!0;try{return this.fn()}finally{Nl(this),Le=e,It=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)vr(e);this.deps=this.depsTail=void 0,Yr(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?pa.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Da(this)&&this.run()}get dirty(){return Da(this)}}let Il=0,Ms,Rs;function Dl(t,e=!1){if(t.flags|=8,e){t.next=Rs,Rs=t;return}t.next=Ms,Ms=t}function mr(){Il++}function gr(){if(--Il>0)return;if(Rs){let e=Rs;for(Rs=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;Ms;){let e=Ms;for(Ms=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(s){t||(t=s)}e=n}}if(t)throw t}function Ll(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function Nl(t){let e,n=t.depsTail,s=n;for(;s;){const o=s.prevDep;s.version===-1?(s===n&&(n=o),vr(s),rd(s)):e=s,s.dep.activeLink=s.prevActiveLink,s.prevActiveLink=void 0,s=o}t.deps=e,t.depsTail=n}function Da(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(Pl(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function Pl(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===Bs)||(t.globalVersion=Bs,!t.isSSR&&t.flags&128&&(!t.deps&&!t._dirty||!Da(t))))return;t.flags|=2;const e=t.dep,n=Le,s=It;Le=t,It=!0;try{Ll(t);const o=t.fn(t._value);(e.version===0||ot(o,t._value))&&(t.flags|=128,t._value=o,e.version++)}catch(o){throw e.version++,o}finally{Le=n,It=s,Nl(t),t.flags&=-3}}function vr(t,e=!1){const{dep:n,prevSub:s,nextSub:o}=t;if(s&&(s.nextSub=o,t.prevSub=void 0),o&&(o.prevSub=s,t.nextSub=void 0),n.subs===t&&(n.subs=s,!s&&n.computed)){n.computed.flags&=-5;for(let a=n.computed.deps;a;a=a.nextDep)vr(a,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function rd(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let It=!0;const Bl=[];function dn(){Bl.push(It),It=!1}function pn(){const t=Bl.pop();It=t===void 0?!0:t}function Yr(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=Le;Le=void 0;try{e()}finally{Le=n}}}let Bs=0;class id{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Go{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!Le||!It||Le===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==Le)n=this.activeLink=new id(Le,this),Le.deps?(n.prevDep=Le.depsTail,Le.depsTail.nextDep=n,Le.depsTail=n):Le.deps=Le.depsTail=n,Fl(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const s=n.nextDep;s.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=s),n.prevDep=Le.depsTail,n.nextDep=void 0,Le.depsTail.nextDep=n,Le.depsTail=n,Le.deps===n&&(Le.deps=s)}return n}trigger(e){this.version++,Bs++,this.notify(e)}notify(e){mr();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{gr()}}}function Fl(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let s=e.deps;s;s=s.nextDep)Fl(s)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const La=new WeakMap,Un=Symbol(""),Na=Symbol(""),Fs=Symbol("");function lt(t,e,n){if(It&&Le){let s=La.get(t);s||La.set(t,s=new Map);let o=s.get(n);o||(s.set(n,o=new Go),o.map=s,o.key=n),o.track()}}function ln(t,e,n,s,o,a){const r=La.get(t);if(!r){Bs++;return}const i=l=>{l&&l.trigger()};if(mr(),e==="clear")r.forEach(i);else{const l=ve(t),u=l&&hr(n);if(l&&n==="length"){const c=Number(s);r.forEach((d,p)=>{(p==="length"||p===Fs||!Pt(p)&&p>=c)&&i(d)})}else switch((n!==void 0||r.has(void 0))&&i(r.get(n)),u&&i(r.get(Fs)),e){case"add":l?u&&i(r.get("length")):(i(r.get(Un)),os(t)&&i(r.get(Na)));break;case"delete":l||(i(r.get(Un)),os(t)&&i(r.get(Na)));break;case"set":os(t)&&i(r.get(Un));break}}gr()}function Yn(t){const e=_e(t);return e===t?e:(lt(e,"iterate",Fs),Mt(t)?e:e.map(Bt))}function Wo(t){return lt(t=_e(t),"iterate",Fs),t}function Wt(t,e){return fn(t)?ds(zn(t)?Bt(e):e):Bt(e)}const ld={__proto__:null,[Symbol.iterator](){return fa(this,Symbol.iterator,t=>Wt(this,t))},concat(...t){return Yn(this).concat(...t.map(e=>ve(e)?Yn(e):e))},entries(){return fa(this,"entries",t=>(t[1]=Wt(this,t[1]),t))},every(t,e){return tn(this,"every",t,e,void 0,arguments)},filter(t,e){return tn(this,"filter",t,e,n=>n.map(s=>Wt(this,s)),arguments)},find(t,e){return tn(this,"find",t,e,n=>Wt(this,n),arguments)},findIndex(t,e){return tn(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return tn(this,"findLast",t,e,n=>Wt(this,n),arguments)},findLastIndex(t,e){return tn(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return tn(this,"forEach",t,e,void 0,arguments)},includes(...t){return ha(this,"includes",t)},indexOf(...t){return ha(this,"indexOf",t)},join(t){return Yn(this).join(t)},lastIndexOf(...t){return ha(this,"lastIndexOf",t)},map(t,e){return tn(this,"map",t,e,void 0,arguments)},pop(){return ks(this,"pop")},push(...t){return ks(this,"push",t)},reduce(t,...e){return Jr(this,"reduce",t,e)},reduceRight(t,...e){return Jr(this,"reduceRight",t,e)},shift(){return ks(this,"shift")},some(t,e){return tn(this,"some",t,e,void 0,arguments)},splice(...t){return ks(this,"splice",t)},toReversed(){return Yn(this).toReversed()},toSorted(t){return Yn(this).toSorted(t)},toSpliced(...t){return Yn(this).toSpliced(...t)},unshift(...t){return ks(this,"unshift",t)},values(){return fa(this,"values",t=>Wt(this,t))}};function fa(t,e,n){const s=Wo(t),o=s[e]();return s!==t&&!Mt(t)&&(o._next=o.next,o.next=()=>{const a=o._next();return a.done||(a.value=n(a.value)),a}),o}const ud=Array.prototype;function tn(t,e,n,s,o,a){const r=Wo(t),i=r!==t&&!Mt(t),l=r[e];if(l!==ud[e]){const d=l.apply(t,a);return i?Bt(d):d}let u=n;r!==t&&(i?u=function(d,p){return n.call(this,Wt(t,d),p,t)}:n.length>2&&(u=function(d,p){return n.call(this,d,p,t)}));const c=l.call(r,u,s);return i&&o?o(c):c}function Jr(t,e,n,s){const o=Wo(t),a=o!==t&&!Mt(t);let r=n,i=!1;o!==t&&(a?(i=s.length===0,r=function(u,c,d){return i&&(i=!1,u=Wt(t,u)),n.call(this,u,Wt(t,c),d,t)}):n.length>3&&(r=function(u,c,d){return n.call(this,u,c,d,t)}));const l=o[e](r,...s);return i?Wt(t,l):l}function ha(t,e,n){const s=_e(t);lt(s,"iterate",Fs);const o=s[e](...n);return(o===-1||o===!1)&&wr(n[0])?(n[0]=_e(n[0]),s[e](...n)):o}function ks(t,e,n=[]){dn(),mr();const s=_e(t)[e].apply(t,n);return gr(),pn(),s}const cd=pr("__proto__,__v_isRef,__isVue"),Vl=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(Pt));function dd(t){Pt(t)||(t=String(t));const e=_e(this);return lt(e,"has",t),e.hasOwnProperty(t)}class Hl{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,s){if(n==="__v_skip")return e.__v_skip;const o=this._isReadonly,a=this._isShallow;if(n==="__v_isReactive")return!o;if(n==="__v_isReadonly")return o;if(n==="__v_isShallow")return a;if(n==="__v_raw")return s===(o?a?xd:Kl:a?ql:zl).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(s)?e:void 0;const r=ve(e);if(!o){let l;if(r&&(l=ld[n]))return l;if(n==="hasOwnProperty")return dd}const i=Reflect.get(e,n,ft(e)?e:s);if((Pt(n)?Vl.has(n):cd(n))||(o||lt(e,"get",n),a))return i;if(ft(i)){const l=r&&hr(n)?i:i.value;return o&&je(l)?Ba(l):l}return je(i)?o?Ba(i):Ne(i):i}}class Ul extends Hl{constructor(e=!1){super(!1,e)}set(e,n,s,o){let a=e[n];const r=ve(e)&&hr(n);if(!this._isShallow){const u=fn(a);if(!Mt(s)&&!fn(s)&&(a=_e(a),s=_e(s)),!r&&ft(a)&&!ft(s))return u||(a.value=s),!0}const i=r?Number(n)<e.length:Me(e,n),l=Reflect.set(e,n,s,ft(e)?e:o);return e===_e(o)&&l&&(i?ot(s,a)&&ln(e,"set",n,s):ln(e,"add",n,s)),l}deleteProperty(e,n){const s=Me(e,n);e[n];const o=Reflect.deleteProperty(e,n);return o&&s&&ln(e,"delete",n,void 0),o}has(e,n){const s=Reflect.has(e,n);return(!Pt(n)||!Vl.has(n))&&lt(e,"has",n),s}ownKeys(e){return lt(e,"iterate",ve(e)?"length":Un),Reflect.ownKeys(e)}}class pd extends Hl{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const fd=new Ul,hd=new pd,md=new Ul(!0);const Pa=t=>t,no=t=>Reflect.getPrototypeOf(t);function gd(t,e,n){return function(...s){const o=this.__v_raw,a=_e(o),r=os(a),i=t==="entries"||t===Symbol.iterator&&r,l=t==="keys"&&r,u=o[t](...s),c=n?Pa:e?ds:Bt;return!e&&lt(a,"iterate",l?Na:Un),tt(Object.create(u),{next(){const{value:d,done:p}=u.next();return p?{value:d,done:p}:{value:i?[c(d[0]),c(d[1])]:c(d),done:p}}})}}function so(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function vd(t,e){const n={get(o){const a=this.__v_raw,r=_e(a),i=_e(o);t||(ot(o,i)&&lt(r,"get",o),lt(r,"get",i));const{has:l}=no(r),u=e?Pa:t?ds:Bt;if(l.call(r,o))return u(a.get(o));if(l.call(r,i))return u(a.get(i));a!==r&&a.get(o)},get size(){const o=this.__v_raw;return!t&&lt(_e(o),"iterate",Un),o.size},has(o){const a=this.__v_raw,r=_e(a),i=_e(o);return t||(ot(o,i)&&lt(r,"has",o),lt(r,"has",i)),o===i?a.has(o):a.has(o)||a.has(i)},forEach(o,a){const r=this,i=r.__v_raw,l=_e(i),u=e?Pa:t?ds:Bt;return!t&&lt(l,"iterate",Un),i.forEach((c,d)=>o.call(a,u(c),u(d),r))}};return tt(n,t?{add:so("add"),set:so("set"),delete:so("delete"),clear:so("clear")}:{add(o){const a=_e(this),r=no(a),i=_e(o),l=!e&&!Mt(o)&&!fn(o)?i:o;return r.has.call(a,l)||ot(o,l)&&r.has.call(a,o)||ot(i,l)&&r.has.call(a,i)||(a.add(l),ln(a,"add",l,l)),this},set(o,a){!e&&!Mt(a)&&!fn(a)&&(a=_e(a));const r=_e(this),{has:i,get:l}=no(r);let u=i.call(r,o);u||(o=_e(o),u=i.call(r,o));const c=l.call(r,o);return r.set(o,a),u?ot(a,c)&&ln(r,"set",o,a):ln(r,"add",o,a),this},delete(o){const a=_e(this),{has:r,get:i}=no(a);let l=r.call(a,o);l||(o=_e(o),l=r.call(a,o)),i&&i.call(a,o);const u=a.delete(o);return l&&ln(a,"delete",o,void 0),u},clear(){const o=_e(this),a=o.size!==0,r=o.clear();return a&&ln(o,"clear",void 0,void 0),r}}),["keys","values","entries",Symbol.iterator].forEach(o=>{n[o]=gd(o,t,e)}),n}function br(t,e){const n=vd(t,e);return(s,o,a)=>o==="__v_isReactive"?!t:o==="__v_isReadonly"?t:o==="__v_raw"?s:Reflect.get(Me(n,o)&&o in s?n:s,o,a)}const bd={get:br(!1,!1)},yd={get:br(!1,!0)},wd={get:br(!0,!1)};const zl=new WeakMap,ql=new WeakMap,Kl=new WeakMap,xd=new WeakMap;function kd(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Ne(t){return fn(t)?t:yr(t,!1,fd,bd,zl)}function Gl(t){return yr(t,!1,md,yd,ql)}function Ba(t){return yr(t,!0,hd,wd,Kl)}function yr(t,e,n,s,o){if(!je(t)||t.__v_raw&&!(e&&t.__v_isReactive)||t.__v_skip||!Object.isExtensible(t))return t;const a=o.get(t);if(a)return a;const r=kd(Gc(t));if(r===0)return t;const i=new Proxy(t,r===2?s:n);return o.set(t,i),i}function zn(t){return fn(t)?zn(t.__v_raw):!!(t&&t.__v_isReactive)}function fn(t){return!!(t&&t.__v_isReadonly)}function Mt(t){return!!(t&&t.__v_isShallow)}function wr(t){return t?!!t.__v_raw:!1}function _e(t){const e=t&&t.__v_raw;return e?_e(e):t}function Sd(t){return!Me(t,"__v_skip")&&Object.isExtensible(t)&&Ol(t,"__v_skip",!0),t}const Bt=t=>je(t)?Ne(t):t,ds=t=>je(t)?Ba(t):t;function ft(t){return t?t.__v_isRef===!0:!1}function B(t){return Wl(t,!1)}function xr(t){return Wl(t,!0)}function Wl(t,e){return ft(t)?t:new $d(t,e)}class $d{constructor(e,n){this.dep=new Go,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:_e(e),this._value=n?e:Bt(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,s=this.__v_isShallow||Mt(e)||fn(e);e=s?e:_e(e),ot(e,n)&&(this._rawValue=e,this._value=s?e:Bt(e),this.dep.trigger())}}function f(t){return ft(t)?t.value:t}const Ed={get:(t,e,n)=>e==="__v_raw"?t:f(Reflect.get(t,e,n)),set:(t,e,n,s)=>{const o=t[e];return ft(o)&&!ft(n)?(o.value=n,!0):Reflect.set(t,e,n,s)}};function Xl(t){return zn(t)?t:new Proxy(t,Ed)}class Cd{constructor(e){this.__v_isRef=!0,this._value=void 0;const n=this.dep=new Go,{get:s,set:o}=e(n.track.bind(n),n.trigger.bind(n));this._get=s,this._set=o}get value(){return this._value=this._get()}set value(e){this._set(e)}}function Ad(t){return new Cd(t)}class Td{constructor(e,n,s){this.fn=e,this.setter=n,this._value=void 0,this.dep=new Go(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Bs-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=s}notify(){if(this.flags|=16,!(this.flags&8)&&Le!==this)return Dl(this,!0),!0}get value(){const e=this.dep.track();return Pl(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function Od(t,e,n=!1){let s,o;return xe(t)?s=t:(s=t.get,o=t.set),new Td(s,o,n)}const oo={},xo=new WeakMap;let Pn;function _d(t,e=!1,n=Pn){if(n){let s=xo.get(n);s||xo.set(n,s=[]),s.push(t)}}function Md(t,e,n=Ae){const{immediate:s,deep:o,once:a,scheduler:r,augmentJob:i,call:l}=n,u=$=>o?$:Mt($)||o===!1||o===0?un($,1):un($);let c,d,p,m,b=!1,g=!1;if(ft(t)?(d=()=>t.value,b=Mt(t)):zn(t)?(d=()=>u(t),b=!0):ve(t)?(g=!0,b=t.some($=>zn($)||Mt($)),d=()=>t.map($=>{if(ft($))return $.value;if(zn($))return u($);if(xe($))return l?l($,2):$()})):xe(t)?e?d=l?()=>l(t,2):t:d=()=>{if(p){dn();try{p()}finally{pn()}}const $=Pn;Pn=c;try{return l?l(t,3,[m]):t(m)}finally{Pn=$}}:d=Jt,e&&o){const $=d,R=o===!0?1/0:o;d=()=>un($(),R)}const y=ad(),v=()=>{c.stop(),y&&y.active&&fr(y.effects,c)};if(a&&e){const $=e;e=(...R)=>{const P=$(...R);return v(),P}}let x=g?new Array(t.length).fill(oo):oo;const S=$=>{if(!(!(c.flags&1)||!c.dirty&&!$))if(e){const R=c.run();if($||o||b||(g?R.some((P,K)=>ot(P,x[K])):ot(R,x))){p&&p();const P=Pn;Pn=c;try{const K=[R,x===oo?void 0:g&&x[0]===oo?[]:x,m];x=R,l?l(e,3,K):e(...K)}finally{Pn=P}}}else c.run()};return i&&i(S),c=new jl(d),c.scheduler=r?()=>r(S,!1):S,m=$=>_d($,!1,c),p=c.onStop=()=>{const $=xo.get(c);if($){if(l)l($,4);else for(const R of $)R();xo.delete(c)}},e?s?S(!0):x=c.run():r?r(S.bind(null,!0),!0):c.run(),v.pause=c.pause.bind(c),v.resume=c.resume.bind(c),v.stop=v,v}function un(t,e=1/0,n){if(e<=0||!je(t)||t.__v_skip||(n=n||new Map,(n.get(t)||0)>=e))return t;if(n.set(t,e),e--,ft(t))un(t.value,e,n);else if(ve(t))for(let s=0;s<t.length;s++)un(t[s],e,n);else if(Vo(t)||os(t))t.forEach(s=>{un(s,e,n)});else if(Tl(t)){for(const s in t)un(t[s],e,n);for(const s of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,s)&&un(t[s],e,n)}return t}/**
* @vue/runtime-core v3.5.40
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Js(t,e,n,s){try{return s?t(...s):t()}catch(o){Xo(o,e,n)}}function Ft(t,e,n,s){if(xe(t)){const o=Js(t,e,n,s);return o&&Cl(o)&&o.catch(a=>{Xo(a,e,n)}),o}if(ve(t)){const o=[];for(let a=0;a<t.length;a++)o.push(Ft(t[a],e,n,s));return o}}function Xo(t,e,n,s=!0){const o=e?e.vnode:null,{errorHandler:a,throwUnhandledErrorInProduction:r}=e&&e.appContext.config||Ae;if(e){let i=e.parent;const l=e.proxy,u=`https://vuejs.org/error-reference/#runtime-${n}`;for(;i;){const c=i.ec;if(c){for(let d=0;d<c.length;d++)if(c[d](t,l,u)===!1)return}i=i.parent}if(a){dn(),Js(a,null,10,[t,l,u]),pn();return}}Rd(t,n,o,s,r)}function Rd(t,e,n,s=!0,o=!1){if(o)throw t;console.error(t)}const vt=[];let Gt=-1;const as=[];let Cn=null,Qn=0;const Yl=Promise.resolve();let ko=null;function ms(t){const e=ko||Yl;return t?e.then(this?t.bind(this):t):e}function jd(t){let e=Gt+1,n=vt.length;for(;e<n;){const s=e+n>>>1,o=vt[s],a=Vs(o);a<t||a===t&&o.flags&2?e=s+1:n=s}return e}function kr(t){if(!(t.flags&1)){const e=Vs(t),n=vt[vt.length-1];!n||!(t.flags&2)&&e>=Vs(n)?vt.push(t):vt.splice(jd(e),0,t),t.flags|=1,Jl()}}function Jl(){ko||(ko=Yl.then(Zl))}function Id(t){ve(t)?as.push(...t):Cn&&t.id===-1?Cn.splice(Qn+1,0,t):t.flags&1||(as.push(t),t.flags|=1),Jl()}function Qr(t,e,n=Gt+1){for(;n<vt.length;n++){const s=vt[n];if(s&&s.flags&2){if(t&&s.id!==t.uid)continue;vt.splice(n,1),n--,s.flags&4&&(s.flags&=-2),s(),s.flags&4||(s.flags&=-2)}}}function Ql(t){if(as.length){const e=[...new Set(as)].sort((n,s)=>Vs(n)-Vs(s));if(as.length=0,Cn){Cn.push(...e);return}for(Cn=e,Qn=0;Qn<Cn.length;Qn++){const n=Cn[Qn];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}Cn=null,Qn=0}}const Vs=t=>t.id==null?t.flags&2?-1:1/0:t.id;function Zl(t){try{for(Gt=0;Gt<vt.length;Gt++){const e=vt[Gt];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Js(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;Gt<vt.length;Gt++){const e=vt[Gt];e&&(e.flags&=-2)}Gt=-1,vt.length=0,Ql(),ko=null,(vt.length||as.length)&&Zl()}}let at=null,eu=null;function So(t){const e=at;return at=t,eu=t&&t.type.__scopeId||null,e}function I(t,e=at,n){if(!e||t._n)return t;const s=(...o)=>{s._d&&To(-1);const a=So(e),r=cn.length;let i;try{i=t(...o)}finally{for(let l=cn.length;l>r;l--)Or();So(a),s._d&&To(1)}return i};return s._n=!0,s._c=!0,s._d=!0,s}function js(t,e){if(at===null)return t;const n=Zo(at),s=t.dirs||(t.dirs=[]);for(let o=0;o<e.length;o++){let[a,r,i,l=Ae]=e[o];a&&(xe(a)&&(a={mounted:a,updated:a}),a.deep&&un(r),s.push({dir:a,instance:n,value:r,oldValue:void 0,arg:i,modifiers:l}))}return t}function Ln(t,e,n,s){const o=t.dirs,a=e&&e.dirs;for(let r=0;r<o.length;r++){const i=o[r];a&&(i.oldValue=a[r].value);let l=i.dir[s];l&&(dn(),Ft(l,n,8,[t.el,i,t,e]),pn())}}function vo(t,e){if(ut){let n=ut.provides;const s=ut.parent&&ut.parent.provides;s===n&&(n=ut.provides=Object.create(s)),n[t]=e}}function Dt(t,e,n=!1){const s=Ou();if(s||is){let o=is?is._context.provides:s?s.parent==null||s.ce?s.vnode.appContext&&s.vnode.appContext.provides:s.parent.provides:void 0;if(o&&t in o)return o[t];if(arguments.length>1)return n&&xe(e)?e.call(s&&s.proxy):e}}const Dd=Symbol.for("v-scx"),Ld=()=>Dt(Dd);function Nd(t,e){return Sr(t,null,{flush:"sync"})}function Re(t,e,n){return Sr(t,e,n)}function Sr(t,e,n=Ae){const{immediate:s,deep:o,flush:a,once:r}=n,i=tt({},n),l=e&&s||!e&&a!=="post";let u;if(zs){if(a==="sync"){const m=Ld();u=m.__watcherHandles||(m.__watcherHandles=[])}else if(!l){const m=()=>{};return m.stop=Jt,m.resume=Jt,m.pause=Jt,m}}const c=ut;i.call=(m,b,g)=>Ft(m,c,b,g);let d=!1;a==="post"?i.scheduler=m=>{bt(m,c&&c.suspense)}:a!=="sync"&&(d=!0,i.scheduler=(m,b)=>{b?m():kr(m)}),i.augmentJob=m=>{e&&(m.flags|=4),d&&(m.flags|=2,c&&(m.id=c.uid,m.i=c))};const p=Md(t,e,i);return zs&&(u?u.push(p):l&&p()),p}function Pd(t,e,n){const s=this.proxy,o=Fe(t)?t.includes(".")?tu(s,t):()=>s[t]:t.bind(s,s);let a;xe(e)?a=e:(a=e.handler,n=e);const r=Qs(this),i=Sr(o,a.bind(s),n);return r(),i}function tu(t,e){const n=e.split(".");return()=>{let s=t;for(let o=0;o<n.length&&s;o++)s=s[n[o]];return s}}const Bd=Symbol("_vte"),Fd=t=>t.__isTeleport,ma=Symbol("_leaveCb");function $r(t,e){t.shapeFlag&6&&t.component?(t.transition=e,$r(t.component.subTree,e)):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}function Z(t,e){return xe(t)?tt({name:t.name},e,{setup:t}):t}function nu(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}function Zr(t,e){let n;return!!((n=Object.getOwnPropertyDescriptor(t,e))&&!n.configurable)}const $o=new WeakMap;function Is(t,e,n,s,o=!1){if(ve(t)){t.forEach((g,y)=>Is(g,e&&(ve(e)?e[y]:e),n,s,o));return}if(rs(s)&&!o){s.shapeFlag&512&&s.type.__asyncResolved&&s.component.subTree.component&&Is(t,e,n,s.component.subTree);return}const a=s.shapeFlag&4?Zo(s.component):s.el,r=o?null:a,{i,r:l}=t,u=e&&e.r,c=i.refs===Ae?i.refs={}:i.refs,d=i.setupState,p=_e(d),m=d===Ae?El:g=>Zr(c,g)?!1:Me(p,g),b=(g,y)=>!(y&&Zr(c,y));if(u!=null&&u!==l){if(ei(e),Fe(u))c[u]=null,m(u)&&(d[u]=null);else if(ft(u)){const g=e;b(u,g.k)&&(u.value=null),g.k&&(c[g.k]=null)}}if(xe(l))Js(l,i,12,[r,c]);else{const g=Fe(l),y=ft(l);if(g||y){const v=()=>{if(t.f){const x=g?m(l)?d[l]:c[l]:b()||!t.k?l.value:c[t.k];if(o)ve(x)&&fr(x,a);else if(ve(x))x.includes(a)||x.push(a);else if(g)c[l]=[a],m(l)&&(d[l]=c[l]);else{const S=[a];b(l,t.k)&&(l.value=S),t.k&&(c[t.k]=S)}}else g?(c[l]=r,m(l)&&(d[l]=r)):y&&(b(l,t.k)&&(l.value=r),t.k&&(c[t.k]=r))};if(r){const x=()=>{v(),$o.delete(t)};x.id=-1,$o.set(t,x),bt(x,n)}else ei(t),v()}}}function ei(t){const e=$o.get(t);e&&(e.flags|=8,$o.delete(t))}qo().requestIdleCallback;qo().cancelIdleCallback;const rs=t=>!!t.type.__asyncLoader,su=t=>t.type.__isKeepAlive;function Vd(t,e){ou(t,"a",e)}function Hd(t,e){ou(t,"da",e)}function ou(t,e,n=ut){const s=t.__wdc||(t.__wdc=()=>{let o=n;for(;o;){if(o.isDeactivated)return;o=o.parent}return t()});if(Yo(e,s,n),n){let o=n.parent;for(;o&&o.parent;)su(o.parent.vnode)&&Ud(s,e,n,o),o=o.parent}}function Ud(t,e,n,s){const o=Yo(e,t,s,!0);Cr(()=>{fr(s[e],o)},n)}function Yo(t,e,n=ut,s=!1){if(n){const o=n[t]||(n[t]=[]),a=e.__weh||(e.__weh=(...r)=>{dn();const i=Qs(n),l=Ft(e,n,t,r);return i(),pn(),l});return s?o.unshift(a):o.push(a),a}}const vn=t=>(e,n=ut)=>{(!zs||t==="sp")&&Yo(t,(...s)=>e(...s),n)},zd=vn("bm"),Er=vn("m"),qd=vn("bu"),Kd=vn("u"),au=vn("bum"),Cr=vn("um"),Gd=vn("sp"),Wd=vn("rtg"),Xd=vn("rtc");function Yd(t,e=ut){Yo("ec",t,e)}const Jd="components",ru=Symbol.for("v-ndc");function iu(t){return Fe(t)?Qd(Jd,t,!1)||t:t||ru}function Qd(t,e,n=!0,s=!1){const o=at||ut;if(o){const a=o.type;{const i=Ip(a,!1);if(i&&(i===e||i===pt(e)||i===Uo(pt(e))))return a}const r=ti(o[t]||a[t],e)||ti(o.appContext[t],e);return!r&&s?a:r}}function ti(t,e){return t&&(t[e]||t[pt(e)]||t[Uo(pt(e))])}function ce(t,e,n,s){let o;const a=n,r=ve(t);if(r||Fe(t)){const i=r&&zn(t);let l=!1,u=!1;i&&(l=!Mt(t),u=fn(t),t=Wo(t)),o=new Array(t.length);for(let c=0,d=t.length;c<d;c++)o[c]=e(l?u?ds(Bt(t[c])):Bt(t[c]):t[c],c,void 0,a)}else if(typeof t=="number"){o=new Array(t);for(let i=0;i<t;i++)o[i]=e(i+1,i,void 0,a)}else if(je(t))if(t[Symbol.iterator])o=Array.from(t,(i,l)=>e(i,l,void 0,a));else{const i=Object.keys(t);o=new Array(i.length);for(let l=0,u=i.length;l<u;l++){const c=i[l];o[l]=e(t[c],c,l,a)}}else o=[];return o}function Eo(t,e,n={},s,o,a){if(at.ce||at.parent&&rs(at.parent)&&at.parent.ce){const u=n,c=Object.keys(u).length>0;return e!=="default"&&(u.name=e),w(),W(ee,null,[T("slot",u,s)],c?-2:64)}let r=t[e];r&&r._c&&(r._d=!1);const i=cn.length;w();let l;try{const u=r&&lu(r(n)),c=n.key||a||u&&u.key;l=W(ee,{key:(c&&!Pt(c)?c:`_${e}`)+(!u&&s?"_fb":"")},u||(s?s():[]),u&&t._===1?64:-2)}catch(u){for(let c=cn.length;c>i;c--)Or();throw u}finally{r&&r._c&&(r._d=!0)}return l.scopeId&&(l.slotScopeIds=[l.scopeId+"-s"]),l}function lu(t){return t.some(e=>Us(e)?!(e.type===hn||e.type===ee&&!lu(e.children)):!0)?t:null}const Fa=t=>t?_u(t)?Zo(t):Fa(t.parent):null,Ds=tt(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>Fa(t.parent),$root:t=>Fa(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>cu(t),$forceUpdate:t=>t.f||(t.f=()=>{kr(t.update)}),$nextTick:t=>t.n||(t.n=ms.bind(t.proxy)),$watch:t=>Pd.bind(t)}),ga=(t,e)=>t!==Ae&&!t.__isScriptSetup&&Me(t,e),Zd={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:s,data:o,props:a,accessCache:r,type:i,appContext:l}=t;if(e[0]!=="$"){const p=r[e];if(p!==void 0)switch(p){case 1:return s[e];case 2:return o[e];case 4:return n[e];case 3:return a[e]}else{if(ga(s,e))return r[e]=1,s[e];if(o!==Ae&&Me(o,e))return r[e]=2,o[e];if(Me(a,e))return r[e]=3,a[e];if(n!==Ae&&Me(n,e))return r[e]=4,n[e];Va&&(r[e]=0)}}const u=Ds[e];let c,d;if(u)return e==="$attrs"&&lt(t.attrs,"get",""),u(t);if((c=i.__cssModules)&&(c=c[e]))return c;if(n!==Ae&&Me(n,e))return r[e]=4,n[e];if(d=l.config.globalProperties,Me(d,e))return d[e]},set({_:t},e,n){const{data:s,setupState:o,ctx:a}=t;return ga(o,e)?(o[e]=n,!0):s!==Ae&&Me(s,e)?(s[e]=n,!0):Me(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(a[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:s,appContext:o,props:a,type:r}},i){let l;return!!(n[i]||t!==Ae&&i[0]!=="$"&&Me(t,i)||ga(e,i)||Me(a,i)||Me(s,i)||Me(Ds,i)||Me(o.config.globalProperties,i)||(l=r.__cssModules)&&l[i])},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:Me(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function Co(t){return ve(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}function _n(t,e){return!t||!e?t||e:ve(t)&&ve(e)?t.concat(e):tt({},Co(t),Co(e))}let Va=!0;function ep(t){const e=cu(t),n=t.proxy,s=t.ctx;Va=!1,e.beforeCreate&&ni(e.beforeCreate,t,"bc");const{data:o,computed:a,methods:r,watch:i,provide:l,inject:u,created:c,beforeMount:d,mounted:p,beforeUpdate:m,updated:b,activated:g,deactivated:y,beforeDestroy:v,beforeUnmount:x,destroyed:S,unmounted:$,render:R,renderTracked:P,renderTriggered:K,errorCaptured:D,serverPrefetch:N,expose:j,inheritAttrs:me,components:Se,directives:z,filters:ae}=e;if(u&&tp(u,s,null),r)for(const ue in r){const G=r[ue];xe(G)&&(s[ue]=G.bind(n))}if(o){const ue=o.call(n,n);je(ue)&&(t.data=Ne(ue))}if(Va=!0,a)for(const ue in a){const G=a[ue],ie=xe(G)?G.bind(n,n):xe(G.get)?G.get.bind(n,n):Jt,$e=!xe(G)&&xe(G.set)?G.set.bind(n):Jt,nt=E({get:ie,set:$e});Object.defineProperty(s,ue,{enumerable:!0,configurable:!0,get:()=>nt.value,set:X=>nt.value=X})}if(i)for(const ue in i)uu(i[ue],s,n,ue);if(l){const ue=xe(l)?l.call(n):l;Reflect.ownKeys(ue).forEach(G=>{vo(G,ue[G])})}c&&ni(c,t,"c");function J(ue,G){ve(G)?G.forEach(ie=>ue(ie.bind(n))):G&&ue(G.bind(n))}if(J(zd,d),J(Er,p),J(qd,m),J(Kd,b),J(Vd,g),J(Hd,y),J(Yd,D),J(Xd,P),J(Wd,K),J(au,x),J(Cr,$),J(Gd,N),ve(j))if(j.length){const ue=t.exposed||(t.exposed={});j.forEach(G=>{Object.defineProperty(ue,G,{get:()=>n[G],set:ie=>n[G]=ie,enumerable:!0})})}else t.exposed||(t.exposed={});R&&t.render===Jt&&(t.render=R),me!=null&&(t.inheritAttrs=me),Se&&(t.components=Se),z&&(t.directives=z),N&&nu(t)}function tp(t,e,n=Jt){ve(t)&&(t=Ha(t));for(const s in t){const o=t[s];let a;je(o)?"default"in o?a=Dt(o.from||s,o.default,!0):a=Dt(o.from||s):a=Dt(o),ft(a)?Object.defineProperty(e,s,{enumerable:!0,configurable:!0,get:()=>a.value,set:r=>a.value=r}):e[s]=a}}function ni(t,e,n){Ft(ve(t)?t.map(s=>s.bind(e.proxy)):t.bind(e.proxy),e,n)}function uu(t,e,n,s){let o=s.includes(".")?tu(n,s):()=>n[s];if(Fe(t)){const a=e[t];xe(a)&&Re(o,a)}else if(xe(t))Re(o,t.bind(n));else if(je(t))if(ve(t))t.forEach(a=>uu(a,e,n,s));else{const a=xe(t.handler)?t.handler.bind(n):e[t.handler];xe(a)&&Re(o,a,t)}}function cu(t){const e=t.type,{mixins:n,extends:s}=e,{mixins:o,optionsCache:a,config:{optionMergeStrategies:r}}=t.appContext,i=a.get(e);let l;return i?l=i:!o.length&&!n&&!s?l=e:(l={},o.length&&o.forEach(u=>Ao(l,u,r,!0)),Ao(l,e,r)),je(e)&&a.set(e,l),l}function Ao(t,e,n,s=!1){const{mixins:o,extends:a}=e;a&&Ao(t,a,n,!0),o&&o.forEach(r=>Ao(t,r,n,!0));for(const r in e)if(!(s&&r==="expose")){const i=np[r]||n&&n[r];t[r]=i?i(t[r],e[r]):e[r]}return t}const np={data:si,props:oi,emits:oi,methods:As,computed:As,beforeCreate:ht,created:ht,beforeMount:ht,mounted:ht,beforeUpdate:ht,updated:ht,beforeDestroy:ht,beforeUnmount:ht,destroyed:ht,unmounted:ht,activated:ht,deactivated:ht,errorCaptured:ht,serverPrefetch:ht,components:As,directives:As,watch:op,provide:si,inject:sp};function si(t,e){return e?t?function(){return tt(xe(t)?t.call(this,this):t,xe(e)?e.call(this,this):e)}:e:t}function sp(t,e){return As(Ha(t),Ha(e))}function Ha(t){if(ve(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function ht(t,e){return t?[...new Set([].concat(t,e))]:e}function As(t,e){return t?tt(Object.create(null),t,e):e}function oi(t,e){return t?ve(t)&&ve(e)?[...new Set([...t,...e])]:tt(Object.create(null),Co(t),Co(e??{})):e}function op(t,e){if(!t)return e;if(!e)return t;const n=tt(Object.create(null),t);for(const s in e)n[s]=ht(t[s],e[s]);return n}function du(){return{app:null,config:{isNativeTag:El,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let ap=0;function rp(t,e){return function(s,o=null){xe(s)||(s=tt({},s)),o!=null&&!je(o)&&(o=null);const a=du(),r=new WeakSet,i=[];let l=!1;const u=a.app={_uid:ap++,_component:s,_props:o,_container:null,_context:a,_instance:null,version:Lp,get config(){return a.config},set config(c){},use(c,...d){return r.has(c)||(c&&xe(c.install)?(r.add(c),c.install(u,...d)):xe(c)&&(r.add(c),c(u,...d))),u},mixin(c){return a.mixins.includes(c)||a.mixins.push(c),u},component(c,d){return d?(a.components[c]=d,u):a.components[c]},directive(c,d){return d?(a.directives[c]=d,u):a.directives[c]},mount(c,d,p){if(!l){const m=u._ceVNode||T(s,o);return m.appContext=a,p===!0?p="svg":p===!1&&(p=void 0),t(m,c,p),l=!0,u._container=c,c.__vue_app__=u,Zo(m.component)}},onUnmount(c){i.push(c)},unmount(){l&&(Ft(i,u._instance,16),t(null,u._container),delete u._container.__vue_app__)},provide(c,d){return a.provides[c]=d,u},runWithContext(c){const d=is;is=u;try{return c()}finally{is=d}}};return u}}let is=null;function Mn(t,e,n=Ae){const s=Ou(),o=pt(e),a=gn(e),r=pu(t,o),i=Ad((l,u)=>{let c,d=Ae,p;return Nd(()=>{const m=t[o];ot(c,m)&&(c=m,u())}),{get(){return l(),n.get?n.get(c):c},set(m){const b=n.set?n.set(m):m;if(!ot(b,c)&&!(d!==Ae&&ot(m,d)))return;const g=s.vnode.props,y=!!(g&&(e in g||o in g||a in g)&&(`onUpdate:${e}`in g||`onUpdate:${o}`in g||`onUpdate:${a}`in g));y||(c=m,u()),s.emit(`update:${e}`,b),ot(m,d)&&(ot(m,b)&&!ot(b,p)||y&&d!==Ae&&!ot(b,c))&&u(),d=m,p=b}}});return i[Symbol.iterator]=()=>{let l=0;return{next(){return l<2?{value:l++?r||Ae:i,done:!1}:{done:!0}}}},i}const pu=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${pt(e)}Modifiers`]||t[`${gn(e)}Modifiers`];function ip(t,e,...n){if(t.isUnmounted)return;const s=t.vnode.props||Ae;let o=n;const a=e.startsWith("update:"),r=a&&pu(s,e.slice(7));r&&(r.trim&&(o=n.map(c=>Fe(c)?c.trim():c)),r.number&&(o=n.map(zo)));let i,l=s[i=ca(e)]||s[i=ca(pt(e))];!l&&a&&(l=s[i=ca(gn(e))]),l&&Ft(l,t,6,o);const u=s[i+"Once"];if(u){if(!t.emitted)t.emitted={};else if(t.emitted[i])return;t.emitted[i]=!0,Ft(u,t,6,o)}}const lp=new WeakMap;function fu(t,e,n=!1){const s=n?lp:e.emitsCache,o=s.get(t);if(o!==void 0)return o;const a=t.emits;let r={},i=!1;if(!xe(t)){const l=u=>{const c=fu(u,e,!0);c&&(i=!0,tt(r,c))};!n&&e.mixins.length&&e.mixins.forEach(l),t.extends&&l(t.extends),t.mixins&&t.mixins.forEach(l)}return!a&&!i?(je(t)&&s.set(t,null),null):(ve(a)?a.forEach(l=>r[l]=null):tt(r,a),je(t)&&s.set(t,r),r)}function Jo(t,e){return!t||!Bo(e)?!1:(e=e.slice(2),e=e==="Once"?e:e.replace(/Once$/,""),Me(t,e[0].toLowerCase()+e.slice(1))||Me(t,gn(e))||Me(t,e))}function ai(t){const{type:e,vnode:n,proxy:s,withProxy:o,propsOptions:[a],slots:r,attrs:i,emit:l,render:u,renderCache:c,props:d,data:p,setupState:m,ctx:b,inheritAttrs:g}=t,y=So(t);let v,x;try{if(n.shapeFlag&4){const $=o||s,R=$;v=Xt(u.call(R,$,c,d,m,p,b)),x=i}else{const $=e;v=Xt($.length>1?$(d,{attrs:i,slots:r,emit:l}):$(d,null)),x=e.props?i:up(i)}}catch($){cn.length=0,Xo($,t,1),v=T(hn)}let S=v;if(x&&g!==!1){const $=Object.keys(x),{shapeFlag:R}=S;$.length&&R&7&&(a&&$.some(Fo)&&(x=cp(x,a)),S=ps(S,x,!1,!0))}return n.dirs&&(S=ps(S,null,!1,!0),S.dirs=S.dirs?S.dirs.concat(n.dirs):n.dirs),n.transition&&$r(S,n.transition),v=S,So(y),v}const up=t=>{let e;for(const n in t)(n==="class"||n==="style"||Bo(n))&&((e||(e={}))[n]=t[n]);return e},cp=(t,e)=>{const n={};for(const s in t)(!Fo(s)||!(s.slice(9)in e))&&(n[s]=t[s]);return n};function dp(t,e,n){const{props:s,children:o,component:a}=t,{props:r,children:i,patchFlag:l}=e,u=a.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return s?ri(s,r,u):!!r;if(l&8){const c=e.dynamicProps;for(let d=0;d<c.length;d++){const p=c[d];if(hu(r,s,p)&&!Jo(u,p))return!0}}}else return(o||i)&&(!i||!i.$stable)?!0:s===r?!1:s?r?ri(s,r,u):!0:!!r;return!1}function ri(t,e,n){const s=Object.keys(e);if(s.length!==Object.keys(t).length)return!0;for(let o=0;o<s.length;o++){const a=s[o];if(hu(e,t,a)&&!Jo(n,a))return!0}return!1}function hu(t,e,n){const s=t[n],o=e[n];return n==="style"&&je(s)&&je(o)?!Ys(s,o):s!==o}function pp({vnode:t,parent:e,suspense:n},s){for(;e;){const o=e.subTree;if(o.suspense&&o.suspense.activeBranch===t&&(o.suspense.vnode.el=o.el=s,t=o),o===t)(t=e.vnode).el=s,e=e.parent;else break}n&&n.activeBranch===t&&(n.vnode.el=s)}const mu={},gu=()=>Object.create(mu),vu=t=>Object.getPrototypeOf(t)===mu;function fp(t,e,n,s=!1){const o={},a=gu();t.propsDefaults=Object.create(null),bu(t,e,o,a);for(const r in t.propsOptions[0])r in o||(o[r]=void 0);n?t.props=s?o:Gl(o):t.type.props?t.props=o:t.props=a,t.attrs=a}function hp(t,e,n,s){const{props:o,attrs:a,vnode:{patchFlag:r}}=t,i=_e(o),[l]=t.propsOptions;let u=!1;if((s||r>0)&&!(r&16)){if(r&8){const c=t.vnode.dynamicProps;for(let d=0;d<c.length;d++){let p=c[d];if(Jo(t.emitsOptions,p))continue;const m=e[p];if(l)if(Me(a,p))m!==a[p]&&(a[p]=m,u=!0);else{const b=pt(p);o[b]=Ua(l,i,b,m,t,!1)}else m!==a[p]&&(a[p]=m,u=!0)}}}else{bu(t,e,o,a)&&(u=!0);let c;for(const d in i)(!e||!Me(e,d)&&((c=gn(d))===d||!Me(e,c)))&&(l?n&&(n[d]!==void 0||n[c]!==void 0)&&(o[d]=Ua(l,i,d,void 0,t,!0)):delete o[d]);if(a!==i)for(const d in a)(!e||!Me(e,d))&&(delete a[d],u=!0)}u&&ln(t.attrs,"set","")}function bu(t,e,n,s){const[o,a]=t.propsOptions;let r=!1,i;if(e)for(let l in e){if(_s(l))continue;const u=e[l];let c;o&&Me(o,c=pt(l))?!a||!a.includes(c)?n[c]=u:(i||(i={}))[c]=u:Jo(t.emitsOptions,l)||(!(l in s)||u!==s[l])&&(s[l]=u,r=!0)}if(a){const l=_e(n),u=i||Ae;for(let c=0;c<a.length;c++){const d=a[c];n[d]=Ua(o,l,d,u[d],t,!Me(u,d))}}return r}function Ua(t,e,n,s,o,a){const r=t[n];if(r!=null){const i=Me(r,"default");if(i&&s===void 0){const l=r.default;if(r.type!==Function&&!r.skipFactory&&xe(l)){const{propsDefaults:u}=o;if(n in u)s=u[n];else{const c=Qs(o);s=u[n]=l.call(null,e),c()}}else s=l;o.ce&&o.ce._setProp(n,s)}r[0]&&(a&&!i?s=!1:r[1]&&(s===""||s===gn(n))&&(s=!0))}return s}const mp=new WeakMap;function yu(t,e,n=!1){const s=n?mp:e.propsCache,o=s.get(t);if(o)return o;const a=t.props,r={},i=[];let l=!1;if(!xe(t)){const c=d=>{l=!0;const[p,m]=yu(d,e,!0);tt(r,p),m&&i.push(...m)};!n&&e.mixins.length&&e.mixins.forEach(c),t.extends&&c(t.extends),t.mixins&&t.mixins.forEach(c)}if(!a&&!l)return je(t)&&s.set(t,ss),ss;if(ve(a))for(let c=0;c<a.length;c++){const d=pt(a[c]);ii(d)&&(r[d]=Ae)}else if(a)for(const c in a){const d=pt(c);if(ii(d)){const p=a[c],m=r[d]=ve(p)||xe(p)?{type:p}:tt({},p),b=m.type;let g=!1,y=!0;if(ve(b))for(let v=0;v<b.length;++v){const x=b[v],S=xe(x)&&x.name;if(S==="Boolean"){g=!0;break}else S==="String"&&(y=!1)}else g=xe(b)&&b.name==="Boolean";m[0]=g,m[1]=y,(g||Me(m,"default"))&&i.push(d)}}const u=[r,i];return je(t)&&s.set(t,u),u}function ii(t){return t[0]!=="$"&&!_s(t)}const Ar=t=>t==="_"||t==="_ctx"||t==="$stable",Tr=t=>ve(t)?t.map(Xt):[Xt(t)],gp=(t,e,n)=>{if(e._n)return e;const s=I((...o)=>Tr(e(...o)),n);return s._c=!1,s},wu=(t,e,n)=>{const s=t._ctx;for(const o in t){if(Ar(o))continue;const a=t[o];if(xe(a))e[o]=gp(o,a,s);else if(a!=null){const r=Tr(a);e[o]=()=>r}}},xu=(t,e)=>{const n=Tr(e);t.slots.default=()=>n},ku=(t,e,n)=>{for(const s in e)(n||!Ar(s))&&(t[s]=e[s])},vp=(t,e,n)=>{const s=t.slots=gu();if(t.vnode.shapeFlag&32){const o=e._;o?(ku(s,e,n),n&&Ol(s,"_",o,!0)):wu(e,s)}else e&&xu(t,e)},bp=(t,e,n)=>{const{vnode:s,slots:o}=t;let a=!0,r=Ae;if(s.shapeFlag&32){const i=e._;i?n&&i===1?a=!1:ku(o,e,n):(a=!e.$stable,wu(e,o)),r=e}else e&&(xu(t,e),r={default:1});if(a)for(const i in o)!Ar(i)&&r[i]==null&&delete o[i]},bt=Sp;function yp(t){return wp(t)}function wp(t,e){const n=qo();n.__VUE__=!0;const{insert:s,remove:o,patchProp:a,createElement:r,createText:i,createComment:l,setText:u,setElementText:c,parentNode:d,nextSibling:p,setScopeId:m=Jt,insertStaticContent:b}=t,g=(k,A,_,V=null,U=null,F=null,ne=void 0,Q=null,Y=!!A.dynamicChildren)=>{if(k===A)return;k&&!Ss(k,A)&&(V=H(k),X(k,U,F,!0),k=null),A.patchFlag===-2&&(Y=!1,A.dynamicChildren=null);const{type:q,ref:he,shapeFlag:oe}=A;switch(q){case Qo:y(k,A,_,V);break;case hn:v(k,A,_,V);break;case ba:k==null&&x(A,_,V,ne);break;case ee:Se(k,A,_,V,U,F,ne,Q,Y);break;default:oe&1?R(k,A,_,V,U,F,ne,Q,Y):oe&6?z(k,A,_,V,U,F,ne,Q,Y):(oe&64||oe&128)&&q.process(k,A,_,V,U,F,ne,Q,Y,de)}he!=null&&U?Is(he,k&&k.ref,F,A||k,!A):he==null&&k&&k.ref!=null&&Is(k.ref,null,F,k,!0)},y=(k,A,_,V)=>{if(k==null)s(A.el=i(A.children),_,V);else{const U=A.el=k.el;A.children!==k.children&&u(U,A.children)}},v=(k,A,_,V)=>{k==null?s(A.el=l(A.children||""),_,V):A.el=k.el},x=(k,A,_,V)=>{[k.el,k.anchor]=b(k.children,A,_,V,k.el,k.anchor)},S=({el:k,anchor:A},_,V)=>{let U;for(;k&&k!==A;)U=p(k),s(k,_,V),k=U;s(A,_,V)},$=({el:k,anchor:A})=>{let _;for(;k&&k!==A;)_=p(k),o(k),k=_;o(A)},R=(k,A,_,V,U,F,ne,Q,Y)=>{if(A.type==="svg"?ne="svg":A.type==="math"&&(ne="mathml"),k==null)P(A,_,V,U,F,ne,Q,Y);else{const q=k.el&&k.el._isVueCE?k.el:null;try{q&&q._beginPatch(),N(k,A,U,F,ne,Q,Y)}finally{q&&q._endPatch()}}},P=(k,A,_,V,U,F,ne,Q)=>{let Y,q;const{props:he,shapeFlag:oe,transition:pe,dirs:be}=k;if(Y=k.el=r(k.type,F,he&&he.is,he),oe&8?c(Y,k.children):oe&16&&D(k.children,Y,null,V,U,va(k,F),ne,Q),be&&Ln(k,null,V,"created"),K(Y,k,k.scopeId,ne,V),he){for(const De in he)De!=="value"&&!_s(De)&&a(Y,De,null,he[De],F,V);"value"in he&&a(Y,"value",null,he.value,F),(q=he.onVnodeBeforeMount)&&Kt(q,V,k)}be&&Ln(k,null,V,"beforeMount");const Ee=xp(U,pe);Ee&&pe.beforeEnter(Y),s(Y,A,_),((q=he&&he.onVnodeMounted)||Ee||be)&&bt(()=>{try{q&&Kt(q,V,k),Ee&&pe.enter(Y),be&&Ln(k,null,V,"mounted")}finally{}},U)},K=(k,A,_,V,U)=>{if(_&&m(k,_),V)for(let F=0;F<V.length;F++)m(k,V[F]);if(U){let F=U.subTree;if(A===F||Cu(F.type)&&(F.ssContent===A||F.ssFallback===A)){const ne=U.vnode;K(k,ne,ne.scopeId,ne.slotScopeIds,U.parent)}}},D=(k,A,_,V,U,F,ne,Q,Y=0)=>{for(let q=Y;q<k.length;q++){const he=k[q]=Q?rn(k[q]):Xt(k[q]);g(null,he,A,_,V,U,F,ne,Q)}},N=(k,A,_,V,U,F,ne)=>{const Q=A.el=k.el;let{patchFlag:Y,dynamicChildren:q,dirs:he}=A;Y|=k.patchFlag&16;const oe=k.props||Ae,pe=A.props||Ae;let be;if(_&&Nn(_,!1),(be=pe.onVnodeBeforeUpdate)&&Kt(be,_,A,k),he&&Ln(A,k,_,"beforeUpdate"),_&&Nn(_,!0),q&&(!k.dynamicChildren||k.dynamicChildren.length!==q.length)&&(Y=0,ne=!1,q=null),(oe.innerHTML&&pe.innerHTML==null||oe.textContent&&pe.textContent==null)&&c(Q,""),q?j(k.dynamicChildren,q,Q,_,V,va(A,U),F):ne||G(k,A,Q,null,_,V,va(A,U),F,!1),Y>0){if(Y&16)me(Q,oe,pe,_,U);else if(Y&2&&oe.class!==pe.class&&a(Q,"class",null,pe.class,U),Y&4&&a(Q,"style",oe.style,pe.style,U),Y&8){const Ee=A.dynamicProps;for(let De=0;De<Ee.length;De++){const Ie=Ee[De],Ue=oe[Ie],st=pe[Ie];(st!==Ue||Ie==="value")&&a(Q,Ie,Ue,st,U,_)}}Y&1&&k.children!==A.children&&c(Q,A.children)}else!ne&&q==null&&me(Q,oe,pe,_,U);((be=pe.onVnodeUpdated)||he)&&bt(()=>{be&&Kt(be,_,A,k),he&&Ln(A,k,_,"updated")},V)},j=(k,A,_,V,U,F,ne)=>{for(let Q=0;Q<A.length;Q++){const Y=k[Q],q=A[Q],he=Y.el&&(Y.type===ee||!Ss(Y,q)||Y.shapeFlag&198)?d(Y.el):_;g(Y,q,he,null,V,U,F,ne,!0)}},me=(k,A,_,V,U)=>{if(A!==_){if(A!==Ae)for(const F in A)!_s(F)&&!(F in _)&&a(k,F,A[F],null,U,V);for(const F in _){if(_s(F))continue;const ne=_[F],Q=A[F];ne!==Q&&F!=="value"&&a(k,F,Q,ne,U,V)}"value"in _&&a(k,"value",A.value,_.value,U)}},Se=(k,A,_,V,U,F,ne,Q,Y)=>{const q=A.el=k?k.el:i(""),he=A.anchor=k?k.anchor:i("");let{patchFlag:oe,dynamicChildren:pe,slotScopeIds:be}=A;be&&(Q=Q?Q.concat(be):be),k==null?(s(q,_,V),s(he,_,V),D(A.children||[],_,he,U,F,ne,Q,Y)):oe>0&&oe&64&&pe&&k.dynamicChildren&&k.dynamicChildren.length===pe.length?(j(k.dynamicChildren,pe,_,U,F,ne,Q),(A.key!=null||U&&A===U.subTree)&&Su(k,A,!0)):G(k,A,_,he,U,F,ne,Q,Y)},z=(k,A,_,V,U,F,ne,Q,Y)=>{A.slotScopeIds=Q,k==null?A.shapeFlag&512?U.ctx.activate(A,_,V,ne,Y):ae(A,_,V,U,F,ne,Y):L(k,A,Y)},ae=(k,A,_,V,U,F,ne)=>{const Q=k.component=Op(k,V,U);if(su(k)&&(Q.ctx.renderer=de),_p(Q,!1,ne),Q.asyncDep){if(U&&U.registerDep(Q,J,ne),!k.el){const Y=Q.subTree=T(hn);v(null,Y,A,_),k.placeholder=Y.el}}else J(Q,k,A,_,U,F,ne)},L=(k,A,_)=>{const V=A.component=k.component;if(dp(k,A,_))if(V.asyncDep&&!V.asyncResolved){ue(V,A,_);return}else V.next=A,V.update();else A.el=k.el,V.vnode=A},J=(k,A,_,V,U,F,ne)=>{const Q=()=>{if(k.isMounted){let{next:oe,bu:pe,u:be,parent:Ee,vnode:De}=k;{const zt=$u(k);if(zt){oe&&(oe.el=De.el,ue(k,oe,ne)),zt.asyncDep.then(()=>{bt(()=>{k.isUnmounted||q()},U)});return}}let Ie=oe,Ue;Nn(k,!1),oe?(oe.el=De.el,ue(k,oe,ne)):oe=De,pe&&go(pe),(Ue=oe.props&&oe.props.onVnodeBeforeUpdate)&&Kt(Ue,Ee,oe,De),Nn(k,!0);const st=ai(k),Ut=k.subTree;k.subTree=st,g(Ut,st,d(Ut.el),H(Ut),k,U,F),oe.el=st.el,Ie===null&&pp(k,st.el),be&&bt(be,U),(Ue=oe.props&&oe.props.onVnodeUpdated)&&bt(()=>Kt(Ue,Ee,oe,De),U)}else{let oe;const{el:pe,props:be}=A,{bm:Ee,m:De,parent:Ie,root:Ue,type:st}=k,Ut=rs(A);Nn(k,!1),Ee&&go(Ee),!Ut&&(oe=be&&be.onVnodeBeforeMount)&&Kt(oe,Ie,A),Nn(k,!0);{Ue.ce&&Ue.ce._hasShadowRoot()&&Ue.ce._injectChildStyle(st,k.parent?k.parent.type:void 0);const zt=k.subTree=ai(k);g(null,zt,_,V,k,U,F),A.el=zt.el}if(De&&bt(De,U),!Ut&&(oe=be&&be.onVnodeMounted)){const zt=A;bt(()=>Kt(oe,Ie,zt),U)}(A.shapeFlag&256||Ie&&rs(Ie.vnode)&&Ie.vnode.shapeFlag&256)&&k.a&&bt(k.a,U),k.isMounted=!0,A=_=V=null}};k.scope.on();const Y=k.effect=new jl(Q);k.scope.off();const q=k.update=Y.run.bind(Y),he=k.job=Y.runIfDirty.bind(Y);he.i=k,he.id=k.uid,Y.scheduler=()=>kr(he),Nn(k,!0),q()},ue=(k,A,_)=>{A.component=k;const V=k.vnode.props;k.vnode=A,k.next=null,hp(k,A.props,V,_),bp(k,A.children,_),dn(),Qr(k),pn()},G=(k,A,_,V,U,F,ne,Q,Y=!1)=>{const q=k&&k.children,he=k?k.shapeFlag:0,oe=A.children,{patchFlag:pe,shapeFlag:be}=A;if(pe>0){if(pe&128){$e(q,oe,_,V,U,F,ne,Q,Y);return}else if(pe&256){ie(q,oe,_,V,U,F,ne,Q,Y);return}}be&8?(he&16&&it(q,U,F),oe!==q&&c(_,oe)):he&16?be&16?$e(q,oe,_,V,U,F,ne,Q,Y):it(q,U,F,!0):(he&8&&c(_,""),be&16&&D(oe,_,V,U,F,ne,Q,Y))},ie=(k,A,_,V,U,F,ne,Q,Y)=>{k=k||ss,A=A||ss;const q=k.length,he=A.length,oe=Math.min(q,he);let pe;for(pe=0;pe<oe;pe++){const be=A[pe]=Y?rn(A[pe]):Xt(A[pe]);g(k[pe],be,_,null,U,F,ne,Q,Y)}q>he?it(k,U,F,!0,!1,oe):D(A,_,V,U,F,ne,Q,Y,oe)},$e=(k,A,_,V,U,F,ne,Q,Y)=>{let q=0;const he=A.length;let oe=k.length-1,pe=he-1;for(;q<=oe&&q<=pe;){const be=k[q],Ee=A[q]=Y?rn(A[q]):Xt(A[q]);if(Ss(be,Ee))g(be,Ee,_,null,U,F,ne,Q,Y);else break;q++}for(;q<=oe&&q<=pe;){const be=k[oe],Ee=A[pe]=Y?rn(A[pe]):Xt(A[pe]);if(Ss(be,Ee))g(be,Ee,_,null,U,F,ne,Q,Y);else break;oe--,pe--}if(q>oe){if(q<=pe){const be=pe+1,Ee=be<he?A[be].el:V;for(;q<=pe;)g(null,A[q]=Y?rn(A[q]):Xt(A[q]),_,Ee,U,F,ne,Q,Y),q++}}else if(q>pe)for(;q<=oe;)X(k[q],U,F,!0),q++;else{const be=q,Ee=q,De=new Map;for(q=Ee;q<=pe;q++){const St=A[q]=Y?rn(A[q]):Xt(A[q]);St.key!=null&&De.set(St.key,q)}let Ie,Ue=0;const st=pe-Ee+1;let Ut=!1,zt=0;const xs=new Array(st);for(q=0;q<st;q++)xs[q]=0;for(q=be;q<=oe;q++){const St=k[q];if(Ue>=st){X(St,U,F,!0);continue}let qt;if(St.key!=null)qt=De.get(St.key);else for(Ie=Ee;Ie<=pe;Ie++)if(xs[Ie-Ee]===0&&Ss(St,A[Ie])){qt=Ie;break}qt===void 0?X(St,U,F,!0):(xs[qt-Ee]=q+1,qt>=zt?zt=qt:Ut=!0,g(St,A[qt],_,null,U,F,ne,Q,Y),Ue++)}const qr=Ut?kp(xs):ss;for(Ie=qr.length-1,q=st-1;q>=0;q--){const St=Ee+q,qt=A[St],Kr=A[St+1],Gr=St+1<he?Kr.el||Eu(Kr):V;xs[q]===0?g(null,qt,_,Gr,U,F,ne,Q,Y):Ut&&(Ie<0||q!==qr[Ie]?nt(qt,_,Gr,2):Ie--)}}},nt=(k,A,_,V,U=null)=>{const{el:F,type:ne,transition:Q,children:Y,shapeFlag:q}=k;if(q&6){nt(k.component.subTree,A,_,V);return}if(q&128){k.suspense.move(A,_,V);return}if(q&64){ne.move(k,A,_,de);return}if(ne===ee){s(F,A,_);for(let oe=0;oe<Y.length;oe++)nt(Y[oe],A,_,V);s(k.anchor,A,_);return}if(ne===ba){S(k,A,_);return}if(V!==2&&q&1&&Q)if(V===0)Q.persisted&&!F[ma]?s(F,A,_):(Q.beforeEnter(F),s(F,A,_),bt(()=>Q.enter(F),U));else{const{leave:oe,delayLeave:pe,afterLeave:be}=Q,Ee=()=>{k.ctx.isUnmounted?o(F):s(F,A,_)},De=()=>{const Ie=F._isLeaving||!!F[ma];F._isLeaving&&F[ma](!0),Q.persisted&&!Ie?Ee():oe(F,()=>{Ee(),be&&be()})};pe?pe(F,Ee,De):De()}else s(F,A,_)},X=(k,A,_,V=!1,U=!1)=>{const{type:F,props:ne,ref:Q,children:Y,dynamicChildren:q,shapeFlag:he,patchFlag:oe,dirs:pe,cacheIndex:be,memo:Ee}=k;if(oe===-2&&(U=!1),Q!=null&&(dn(),Is(Q,null,_,k,!0),pn()),be!=null&&(A.renderCache[be]=void 0),he&256){A.ctx.deactivate(k);return}const De=he&1&&pe,Ie=!rs(k);let Ue;if(Ie&&(Ue=ne&&ne.onVnodeBeforeUnmount)&&Kt(Ue,A,k),he&6)qe(k.component,_,V);else{if(he&128){k.suspense.unmount(_,V);return}De&&Ln(k,null,A,"beforeUnmount"),he&64?k.type.remove(k,A,_,de,V):q&&!q.hasOnce&&(F!==ee||oe>0&&oe&64)?it(q,A,_,!1,!0):(F===ee&&oe&384||!U&&he&16)&&it(Y,A,_),V&&ge(k)}const st=Ee!=null&&be==null;(Ie&&(Ue=ne&&ne.onVnodeUnmounted)||De||st)&&bt(()=>{Ue&&Kt(Ue,A,k),De&&Ln(k,null,A,"unmounted"),st&&(k.el=null)},_)},ge=k=>{const{type:A,el:_,anchor:V,transition:U}=k;if(A===ee){Te(_,V);return}if(A===ba){$(k);return}const F=()=>{o(_),U&&!U.persisted&&U.afterLeave&&U.afterLeave()};if(k.shapeFlag&1&&U&&!U.persisted){const{leave:ne,delayLeave:Q}=U,Y=()=>ne(_,F);Q?Q(k.el,F,Y):Y()}else F()},Te=(k,A)=>{let _;for(;k!==A;)_=p(k),o(k),k=_;o(A)},qe=(k,A,_)=>{const{bum:V,scope:U,job:F,subTree:ne,um:Q,m:Y,a:q}=k;li(Y),li(q),V&&go(V),U.stop(),F&&(F.flags|=8,X(ne,k,A,_)),Q&&bt(Q,A),bt(()=>{k.isUnmounted=!0},A)},it=(k,A,_,V=!1,U=!1,F=0)=>{for(let ne=F;ne<k.length;ne++)X(k[ne],A,_,V,U)},H=k=>{if(k.shapeFlag&6)return H(k.component.subTree);if(k.shapeFlag&128)return k.suspense.next();const A=p(k.anchor||k.el),_=A&&A[Bd];return _?p(_):A};let le=!1;const se=(k,A,_)=>{let V;k==null?A._vnode&&(X(A._vnode,null,null,!0),V=A._vnode.component):g(A._vnode||null,k,A,null,null,null,_),A._vnode=k,le||(le=!0,Qr(V),Ql(),le=!1)},de={p:g,um:X,m:nt,r:ge,mt:ae,mc:D,pc:G,pbc:j,n:H,o:t};return{render:se,hydrate:void 0,createApp:rp(se)}}function va({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function Nn({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function xp(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function Su(t,e,n=!1){const s=t.children,o=e.children;if(ve(s)&&ve(o))for(let a=0;a<s.length;a++){const r=s[a];let i=o[a];i.shapeFlag&1&&!i.dynamicChildren&&((i.patchFlag<=0||i.patchFlag===32)&&(i=o[a]=rn(o[a]),i.el=r.el),!n&&i.patchFlag!==-2&&Su(r,i)),i.type===Qo&&(i.patchFlag===-1&&(i=o[a]=rn(i)),i.el=r.el),i.type===hn&&!i.el&&(i.el=r.el)}}function kp(t){const e=t.slice(),n=[0];let s,o,a,r,i;const l=t.length;for(s=0;s<l;s++){const u=t[s];if(u!==0){if(o=n[n.length-1],t[o]<u){e[s]=o,n.push(s);continue}for(a=0,r=n.length-1;a<r;)i=a+r>>1,t[n[i]]<u?a=i+1:r=i;u<t[n[a]]&&(a>0&&(e[s]=n[a-1]),n[a]=s)}}for(a=n.length,r=n[a-1];a-- >0;)n[a]=r,r=e[r];return n}function $u(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:$u(e)}function li(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}function Eu(t){if(t.placeholder)return t.placeholder;const e=t.component;return e?Eu(e.subTree):null}const Cu=t=>t.__isSuspense;function Sp(t,e){e&&e.pendingBranch?ve(t)?e.effects.push(...t):e.effects.push(t):Id(t)}const ee=Symbol.for("v-fgt"),Qo=Symbol.for("v-txt"),hn=Symbol.for("v-cmt"),ba=Symbol.for("v-stc"),cn=[];let Ct=null;function w(t=!1){cn.push(Ct=t?null:[])}function Or(){cn.pop(),Ct=cn[cn.length-1]||null}let Hs=1;function To(t,e=!1){Hs+=t,t<0&&Ct&&e&&(Ct.hasOnce=!0)}function Au(t){return t.dynamicChildren=Hs>0?Ct||ss:null,Or(),Hs>0&&Ct&&Ct.push(t),t}function C(t,e,n,s,o,a){return Au(h(t,e,n,s,o,a,!0))}function W(t,e,n,s,o){return Au(T(t,e,n,s,o,!0))}function Us(t){return t?t.__v_isVNode===!0:!1}function Ss(t,e){return t.type===e.type&&t.key===e.key}const Tu=({key:t})=>t??null,bo=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?Fe(t)||ft(t)||xe(t)?{i:at,r:t,k:e,f:!!n}:t:null);function h(t,e=null,n=null,s=0,o=null,a=t===ee?0:1,r=!1,i=!1){const l={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&Tu(e),ref:e&&bo(e),scopeId:eu,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:a,patchFlag:s,dynamicProps:o,dynamicChildren:null,appContext:null,ctx:at};return i?(Oo(l,n),a&128&&t.normalize(l)):n&&(l.shapeFlag|=Fe(n)?8:16),Hs>0&&!r&&Ct&&(l.patchFlag>0||a&6)&&l.patchFlag!==32&&Ct.push(l),l}const T=$p;function $p(t,e=null,n=null,s=0,o=null,a=!1){if((!t||t===ru)&&(t=hn),Us(t)){const i=ps(t,e,!0);return n&&Oo(i,n),Hs>0&&!a&&Ct&&(i.shapeFlag&6?Ct[Ct.indexOf(t)]=i:Ct.push(i)),i.patchFlag=-2,i}if(Dp(t)&&(t=t.__vccOpts),e){e=Ep(e);let{class:i,style:l}=e;i&&!Fe(i)&&(e.class=fe(i)),je(l)&&(wr(l)&&!ve(l)&&(l=tt({},l)),e.style=Tt(l))}const r=Fe(t)?1:Cu(t)?128:Fd(t)?64:je(t)?4:xe(t)?2:0;return h(t,e,n,s,o,r,a,!0)}function Ep(t){return t?wr(t)||vu(t)?tt({},t):t:null}function ps(t,e,n=!1,s=!1){const{props:o,ref:a,patchFlag:r,children:i,transition:l}=t,u=e?Cp(o||{},e):o,c={__v_isVNode:!0,__v_skip:!0,type:t.type,props:u,key:u&&Tu(u),ref:e&&e.ref?n&&a?ve(a)?a.concat(bo(e)):[a,bo(e)]:bo(e):a,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:i,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==ee?r===-1?16:r|16:r,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:l,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&ps(t.ssContent),ssFallback:t.ssFallback&&ps(t.ssFallback),placeholder:t.placeholder,el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce};return l&&s&&$r(c,l.clone(c)),c}function O(t=" ",e=0){return T(Qo,null,t,e)}function re(t="",e=!1){return e?(w(),W(hn,null,t)):T(hn,null,t)}function Xt(t){return t==null||typeof t=="boolean"?T(hn):ve(t)?T(ee,null,t.slice()):Us(t)?rn(t):T(Qo,null,String(t))}function rn(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:ps(t)}function Oo(t,e){let n=0;const{shapeFlag:s}=t;if(e==null)e=null;else if(ve(e))n=16;else if(typeof e=="object")if(s&65){const o=e.default;o&&(o._c&&(o._d=!1),Oo(t,o()),o._c&&(o._d=!0));return}else{n=32;const o=e._;!o&&!vu(e)?e._ctx=at:o===3&&at&&(at.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else if(xe(e)){if(s&65){Oo(t,{default:e});return}e={default:e,_ctx:at},n=32}else e=String(e),s&64?(n=16,e=[O(e)]):n=8;t.children=e,t.shapeFlag|=n}function Cp(...t){const e={};for(let n=0;n<t.length;n++){const s=t[n];for(const o in s)if(o==="class")e.class!==s.class&&(e.class=fe([e.class,s.class]));else if(o==="style")e.style=Tt([e.style,s.style]);else if(Bo(o)){const a=e[o],r=s[o];r&&a!==r&&!(ve(a)&&a.includes(r))?e[o]=a?[].concat(a,r):r:r==null&&a==null&&!Fo(o)&&(e[o]=r)}else o!==""&&(e[o]=s[o])}return e}function Kt(t,e,n,s=null){Ft(t,e,7,[n,s])}const Ap=du();let Tp=0;function Op(t,e,n){const s=t.type,o=(e?e.appContext:t.appContext)||Ap,a={uid:Tp++,vnode:t,type:s,parent:e,appContext:o,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new od(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(o.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:yu(s,o),emitsOptions:fu(s,o),emit:null,emitted:null,propsDefaults:Ae,inheritAttrs:s.inheritAttrs,ctx:Ae,data:Ae,props:Ae,attrs:Ae,slots:Ae,refs:Ae,setupState:Ae,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return a.ctx={_:a},a.root=e?e.root:a,a.emit=ip.bind(null,a),t.ce&&t.ce(a),a}let ut=null;const Ou=()=>ut||at;let _o,za;{const t=qo(),e=(n,s)=>{let o;return(o=t[n])||(o=t[n]=[]),o.push(s),a=>{o.length>1?o.forEach(r=>r(a)):o[0](a)}};_o=e("__VUE_INSTANCE_SETTERS__",n=>ut=n),za=e("__VUE_SSR_SETTERS__",n=>zs=n)}const Qs=t=>{const e=ut;return _o(t),t.scope.on(),()=>{t.scope.off(),_o(e)}},ui=()=>{ut&&ut.scope.off(),_o(null)};function _u(t){return t.vnode.shapeFlag&4}let zs=!1;function _p(t,e=!1,n=!1){e&&za(e);const{props:s,children:o}=t.vnode,a=_u(t);fp(t,s,a,e),vp(t,o,n||e);const r=a?Mp(t,e):void 0;return e&&za(!1),r}function Mp(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,Zd);const{setup:s}=n;if(s){dn();const o=t.setupContext=s.length>1?jp(t):null,a=Qs(t),r=Js(s,t,0,[t.props,o]),i=Cl(r);if(pn(),a(),(i||t.sp)&&!rs(t)&&nu(t),i){if(r.then(ui,ui),e)return r.then(l=>{ci(t,l)}).catch(l=>{Xo(l,t,0)});t.asyncDep=r}else ci(t,r)}else Mu(t)}function ci(t,e,n){xe(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:je(e)&&(t.setupState=Xl(e)),Mu(t)}function Mu(t,e,n){const s=t.type;t.render||(t.render=s.render||Jt);{const o=Qs(t);dn();try{ep(t)}finally{pn(),o()}}}const Rp={get(t,e){return lt(t,"get",""),t[e]}};function jp(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,Rp),slots:t.slots,emit:t.emit,expose:e}}function Zo(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(Xl(Sd(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in Ds)return Ds[n](t)},has(e,n){return n in e||n in Ds}})):t.proxy}function Ip(t,e=!0){return xe(t)?t.displayName||t.name:t.name||e&&t.__name}function Dp(t){return xe(t)&&"__vccOpts"in t}const E=(t,e)=>Od(t,e,zs);function Ru(t,e,n){try{To(-1);const s=arguments.length;return s===2?je(e)&&!ve(e)?Us(e)?T(t,null,[e]):T(t,e):T(t,null,e):(s>3?n=Array.prototype.slice.call(arguments,2):s===3&&Us(n)&&(n=[n]),T(t,e,n))}finally{To(1)}}const Lp="3.5.40";/**
* @vue/runtime-dom v3.5.40
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let qa;const di=typeof window<"u"&&window.trustedTypes;if(di)try{qa=di.createPolicy("vue",{createHTML:t=>t})}catch{}const ju=qa?t=>qa.createHTML(t):t=>t,Np="http://www.w3.org/2000/svg",Pp="http://www.w3.org/1998/Math/MathML",an=typeof document<"u"?document:null,pi=an&&an.createElement("template"),Bp={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,s)=>{const o=e==="svg"?an.createElementNS(Np,t):e==="mathml"?an.createElementNS(Pp,t):n?an.createElement(t,{is:n}):an.createElement(t);return t==="select"&&s&&s.multiple!=null&&o.setAttribute("multiple",s.multiple),o},createText:t=>an.createTextNode(t),createComment:t=>an.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>an.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,s,o,a){const r=n?n.previousSibling:e.lastChild;if(o&&(o===a||o.nextSibling))for(;e.insertBefore(o.cloneNode(!0),n),!(o===a||!(o=o.nextSibling)););else{pi.innerHTML=ju(s==="svg"?`<svg>${t}</svg>`:s==="mathml"?`<math>${t}</math>`:t);const i=pi.content;if(s==="svg"||s==="mathml"){const l=i.firstChild;for(;l.firstChild;)i.appendChild(l.firstChild);i.removeChild(l)}e.insertBefore(i,n)}return[r?r.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},Fp=Symbol("_vtc");function Vp(t,e,n){const s=t[Fp];s&&(e=(e?[e,...s]:[...s]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const fi=Symbol("_vod"),Hp=Symbol("_vsh"),Up=Symbol(""),zp=/(?:^|;)\s*display\s*:/;function qp(t,e,n){const s=t.style,o=Fe(n);let a=!1;if(n&&!o){if(e)if(Fe(e))for(const r of e.split(";")){const i=r.slice(0,r.indexOf(":")).trim();n[i]==null&&Ts(s,i,"")}else for(const r in e)n[r]==null&&Ts(s,r,"");for(const r in n){r==="display"&&(a=!0);const i=n[r];i!=null?Gp(t,r,!Fe(e)&&e?e[r]:void 0,i)||Ts(s,r,i):Ts(s,r,"")}}else if(o){if(e!==n){const r=s[Up];r&&(n+=";"+r),s.cssText=n,a=zp.test(n)}}else e&&t.removeAttribute("style");fi in t&&(t[fi]=a?s.display:"",t[Hp]&&(s.display="none"))}const hi=/\s*!important$/;function Ts(t,e,n){if(ve(n))n.forEach(s=>Ts(t,e,s));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const s=Kp(t,e);hi.test(n)?t.setProperty(gn(s),n.replace(hi,""),"important"):t[s]=n}}const mi=["Webkit","Moz","ms"],ya={};function Kp(t,e){const n=ya[e];if(n)return n;let s=pt(e);if(s!=="filter"&&s in t)return ya[e]=s;s=Uo(s);for(let o=0;o<mi.length;o++){const a=mi[o]+s;if(a in t)return ya[e]=a}return e}function Gp(t,e,n,s){return t.tagName==="TEXTAREA"&&(e==="width"||e==="height")&&Fe(s)&&n===s}const gi="http://www.w3.org/1999/xlink";function vi(t,e,n,s,o,a=td(e)){s&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(gi,e.slice(6,e.length)):t.setAttributeNS(gi,e,n):n==null||a&&!_l(n)?t.removeAttribute(e):t.setAttribute(e,a?"":Pt(n)?String(n):n)}function bi(t,e,n,s,o){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?ju(n):n);return}const a=t.tagName;if(e==="value"&&a!=="PROGRESS"&&!a.includes("-")){const i=a==="OPTION"?t.getAttribute("value")||"":t.value,l=n==null?t.type==="checkbox"?"on":"":String(n);(i!==l||!("_value"in t))&&(t.value=l),n==null&&t.removeAttribute(e),t._value=n;return}let r=!1;if(n===""||n==null){const i=typeof t[e];i==="boolean"?n=_l(n):n==null&&i==="string"?(n="",r=!0):i==="number"&&(n=0,r=!0)}try{t[e]=n}catch{}r&&t.removeAttribute(o||e)}function Bn(t,e,n,s){t.addEventListener(e,n,s)}function Wp(t,e,n,s){t.removeEventListener(e,n,s)}const yi=Symbol("_vei");function Xp(t,e,n,s,o=null){const a=t[yi]||(t[yi]={}),r=a[e];if(s&&r)r.value=s;else{const[i,l]=Qp(e);if(s){const u=a[e]=tf(s,o);Bn(t,i,u,l)}else r&&(Wp(t,i,r,l),a[e]=void 0)}}const Yp=/(Once|Passive|Capture)$/,Jp=/^on:?(?:Once|Passive|Capture)$/;function Qp(t){let e,n;for(;(n=t.match(Yp))&&!Jp.test(t);)e||(e={}),t=t.slice(0,t.length-n[1].length),e[n[1].toLowerCase()]=!0;return[t[2]===":"?t.slice(3):gn(t.slice(2)),e]}let wa=0;const Zp=Promise.resolve(),ef=()=>wa||(Zp.then(()=>wa=0),wa=Date.now());function tf(t,e){const n=s=>{if(!s._vts)s._vts=Date.now();else if(s._vts<=n.attached)return;const o=n.value;if(ve(o)){const a=s.stopImmediatePropagation;s.stopImmediatePropagation=()=>{a.call(s),s._stopped=!0};const r=o.slice(),i=[s];for(let l=0;l<r.length&&!s._stopped;l++){const u=r[l];u&&Ft(u,e,5,i)}}else Ft(o,e,5,[s])};return n.value=t,n.attached=ef(),n}const wi=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,nf=(t,e,n,s,o,a)=>{const r=o==="svg";e==="class"?Vp(t,s,r):e==="style"?qp(t,n,s):Bo(e)?Fo(e)||Xp(t,e,n,s,a):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):sf(t,e,s,r))?(bi(t,e,s),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&vi(t,e,s,r,a,e!=="value")):t._isVueCE&&(of(t,e)||t._def.__asyncLoader&&(/[A-Z]/.test(e)||!Fe(s)))?bi(t,pt(e),s,a,e):(e==="true-value"?t._trueValue=s:e==="false-value"&&(t._falseValue=s),vi(t,e,s,r))};function sf(t,e,n,s){if(s)return!!(e==="innerHTML"||e==="textContent"||e in t&&wi(e)&&xe(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="sandbox"&&t.tagName==="IFRAME"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const o=t.tagName;if(o==="IMG"||o==="VIDEO"||o==="CANVAS"||o==="SOURCE")return!1}return wi(e)&&Fe(n)?!1:e in t}function of(t,e){const n=t._def.props;if(!n)return!1;const s=pt(e);return Array.isArray(n)?n.some(o=>pt(o)===s):Object.keys(n).some(o=>pt(o)===s)}const Mo=t=>{const e=t.props["onUpdate:modelValue"]||!1;return ve(e)?n=>go(e,n):e};function af(t){t.target.composing=!0}function xi(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const ls=Symbol("_assign");function ki(t,e,n){return e&&(t=t.trim()),n&&(t=zo(t)),t}const Ro={created(t,{modifiers:{lazy:e,trim:n,number:s}},o){t[ls]=Mo(o);const a=s||o.props&&o.props.type==="number";Bn(t,e?"change":"input",r=>{r.target.composing||t[ls](ki(t.value,n,a))}),(n||a)&&Bn(t,"change",()=>{t.value=ki(t.value,n,a)}),e||(Bn(t,"compositionstart",af),Bn(t,"compositionend",xi),Bn(t,"change",xi))},mounted(t,{value:e}){t.value=e??""},beforeUpdate(t,{value:e,oldValue:n,modifiers:{lazy:s,trim:o,number:a}},r){if(t[ls]=Mo(r),t.composing)return;const i=(a||t.type==="number")&&!/^0\d/.test(t.value)?zo(t.value):t.value,l=e??"";if(i===l)return;const u=t.getRootNode();(u instanceof Document||u instanceof ShadowRoot)&&u.activeElement===t&&t.type!=="range"&&(s&&e===n||o&&t.value.trim()===l)||(t.value=l)}},rf={deep:!0,created(t,{value:e,modifiers:{number:n}},s){t._modelValue=e,Bn(t,"change",()=>{const o=Array.prototype.filter.call(t.options,a=>a.selected).map(a=>n?zo(jo(a)):jo(a));t[ls](t.multiple?Vo(t._modelValue)?new Set(o):o:o[0]),t._assigning=!0,ms(()=>{t._assigning=!1})}),t[ls]=Mo(s)},mounted(t,{value:e}){Si(t,e)},beforeUpdate(t,{value:e},n){t._modelValue=e,t[ls]=Mo(n)},updated(t,{value:e}){t._assigning||Si(t,e)}};function Si(t,e){const n=t.multiple,s=ve(e);if(!(n&&!s&&!Vo(e))){for(let o=0,a=t.options.length;o<a;o++){const r=t.options[o],i=jo(r);if(n)if(s){const l=typeof i;l==="string"||l==="number"?r.selected=e.some(u=>String(u)===String(i)):r.selected=sd(e,i)>-1}else r.selected=e.has(i);else if(Ys(jo(r),e)){t.selectedIndex!==o&&(t.selectedIndex=o);return}}!n&&t.selectedIndex!==-1&&(t.selectedIndex=-1)}}function jo(t){return"_value"in t?t._value:t.value}const lf=["ctrl","shift","alt","meta"],uf={stop:t=>t.stopPropagation(),prevent:t=>t.preventDefault(),self:t=>t.target!==t.currentTarget,ctrl:t=>!t.ctrlKey,shift:t=>!t.shiftKey,alt:t=>!t.altKey,meta:t=>!t.metaKey,left:t=>"button"in t&&t.button!==0,middle:t=>"button"in t&&t.button!==1,right:t=>"button"in t&&t.button!==2,exact:(t,e)=>lf.some(n=>t[`${n}Key`]&&!e.includes(n))},nn=(t,e)=>{if(!t)return t;const n=t._withMods||(t._withMods={}),s=e.join(".");return n[s]||(n[s]=(o,...a)=>{for(let r=0;r<e.length;r++){const i=uf[e[r]];if(i&&i(o,e))return}return t(o,...a)})},cf={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},jt=(t,e)=>{const n=t._withKeys||(t._withKeys={}),s=e.join(".");return n[s]||(n[s]=o=>{if(!("key"in o))return;const a=gn(o.key);if(e.some(r=>r===a||cf[r]===a))return t(o)})},df=tt({patchProp:nf},Bp);let $i;function pf(){return $i||($i=yp(df))}const ff=(...t)=>{const e=pf().createApp(...t),{mount:n}=e;return e.mount=s=>{const o=mf(s);if(!o)return;const a=e._component;!xe(a)&&!a.render&&!a.template&&(a.template=o.innerHTML),o.nodeType===1&&(o.textContent="");const r=n(o,!1,hf(o));return o instanceof Element&&(o.removeAttribute("v-cloak"),o.setAttribute("data-v-app","")),r},e};function hf(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function mf(t){return Fe(t)?document.querySelector(t):t}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const Zn=typeof document<"u";function Iu(t){return typeof t=="object"||"displayName"in t||"props"in t||"__vccOpts"in t}function gf(t){return t.__esModule||t[Symbol.toStringTag]==="Module"||t.default&&Iu(t.default)}const Oe=Object.assign;function xa(t,e){const n={};for(const s in e){const o=e[s];n[s]=Vt(o)?o.map(t):t(o)}return n}const Ls=()=>{},Vt=Array.isArray;function Ei(t,e){const n={};for(const s in t)n[s]=s in e?e[s]:t[s];return n}const Du=/#/g,vf=/&/g,bf=/\//g,yf=/=/g,wf=/\?/g,Lu=/\+/g,xf=/%5B/g,kf=/%5D/g,Nu=/%5E/g,Sf=/%60/g,Pu=/%7B/g,$f=/%7C/g,Bu=/%7D/g,Ef=/%20/g;function _r(t){return t==null?"":encodeURI(""+t).replace($f,"|").replace(xf,"[").replace(kf,"]")}function Cf(t){return _r(t).replace(Pu,"{").replace(Bu,"}").replace(Nu,"^")}function Ka(t){return _r(t).replace(Lu,"%2B").replace(Ef,"+").replace(Du,"%23").replace(vf,"%26").replace(Sf,"`").replace(Pu,"{").replace(Bu,"}").replace(Nu,"^")}function Af(t){return Ka(t).replace(yf,"%3D")}function Tf(t){return _r(t).replace(Du,"%23").replace(wf,"%3F")}function Of(t){return Tf(t).replace(bf,"%2F")}function qs(t){if(t==null)return null;try{return decodeURIComponent(""+t)}catch{}return""+t}const _f=/\/$/,Mf=t=>t.replace(_f,"");function ka(t,e,n="/"){let s,o={},a="",r="";const i=e.indexOf("#");let l=e.indexOf("?");return l=i>=0&&l>i?-1:l,l>=0&&(s=e.slice(0,l),a=e.slice(l,i>0?i:e.length),o=t(a.slice(1))),i>=0&&(s=s||e.slice(0,i),r=e.slice(i,e.length)),s=Df(s??e,n),{fullPath:s+a+r,path:s,query:o,hash:qs(r)}}function Rf(t,e){const n=e.query?t(e.query):"";return e.path+(n&&"?")+n+(e.hash||"")}function Ci(t,e){return!e||!t.toLowerCase().startsWith(e.toLowerCase())?t:t.slice(e.length)||"/"}function jf(t,e,n){const s=e.matched.length-1,o=n.matched.length-1;return s>-1&&s===o&&fs(e.matched[s],n.matched[o])&&Fu(e.params,n.params)&&t(e.query)===t(n.query)&&e.hash===n.hash}function fs(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function Fu(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(var n in t)if(!If(t[n],e[n]))return!1;return!0}function If(t,e){return Vt(t)?Ai(t,e):Vt(e)?Ai(e,t):(t==null?void 0:t.valueOf())===(e==null?void 0:e.valueOf())}function Ai(t,e){return Vt(e)?t.length===e.length&&t.every((n,s)=>n===e[s]):t.length===1&&t[0]===e}function Df(t,e){if(t.startsWith("/"))return t;if(!t)return e;const n=e.split("/"),s=t.split("/"),o=s[s.length-1];(o===".."||o===".")&&s.push("");let a=n.length-1,r,i;for(r=0;r<s.length;r++)if(i=s[r],i!==".")if(i==="..")a>1&&a--;else break;return n.slice(0,a).join("/")+"/"+s.slice(r).join("/")}const $n={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let Ga=function(t){return t.pop="pop",t.push="push",t}({}),Sa=function(t){return t.back="back",t.forward="forward",t.unknown="",t}({});function Lf(t){if(!t)if(Zn){const e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^\w+:\/\/[^\/]+/,"")}else t="/";return t[0]!=="/"&&t[0]!=="#"&&(t="/"+t),Mf(t)}const Nf=/^[^#]+#/;function Pf(t,e){return t.replace(Nf,"#")+e}function Bf(t,e){const n=document.documentElement.getBoundingClientRect(),s=t.getBoundingClientRect();return{behavior:e.behavior,left:s.left-n.left-(e.left||0),top:s.top-n.top-(e.top||0)}}const ea=()=>({left:window.scrollX,top:window.scrollY});function Ff(t){let e;if("el"in t){const n=t.el,s=typeof n=="string"&&n.startsWith("#"),o=typeof n=="string"?s?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!o)return;e=Bf(o,t)}else e=t;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function Ti(t,e){return(history.state?history.state.position-e:-1)+t}const Wa=new Map;function Vf(t,e){Wa.set(t,e)}function Hf(t){const e=Wa.get(t);return Wa.delete(t),e}function Uf(t){return typeof t=="string"||t&&typeof t=="object"}function Vu(t){return typeof t=="string"||typeof t=="symbol"}let Ve=function(t){return t[t.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",t[t.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",t[t.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",t[t.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",t[t.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",t}({});const Hu=Symbol("");Ve.MATCHER_NOT_FOUND+"",Ve.NAVIGATION_GUARD_REDIRECT+"",Ve.NAVIGATION_ABORTED+"",Ve.NAVIGATION_CANCELLED+"",Ve.NAVIGATION_DUPLICATED+"";function hs(t,e){return Oe(new Error,{type:t,[Hu]:!0},e)}function sn(t,e){return t instanceof Error&&Hu in t&&(e==null||!!(t.type&e))}const zf=["params","query","hash"];function qf(t){if(typeof t=="string")return t;if(t.path!=null)return t.path;const e={};for(const n of zf)n in t&&(e[n]=t[n]);return JSON.stringify(e,null,2)}function Kf(t){const e={};if(t===""||t==="?")return e;const n=(t[0]==="?"?t.slice(1):t).split("&");for(let s=0;s<n.length;++s){const o=n[s].replace(Lu," "),a=o.indexOf("="),r=qs(a<0?o:o.slice(0,a)),i=a<0?null:qs(o.slice(a+1));if(r in e){let l=e[r];Vt(l)||(l=e[r]=[l]),l.push(i)}else e[r]=i}return e}function Oi(t){let e="";for(let n in t){const s=t[n];if(n=Af(n),s==null){s!==void 0&&(e+=(e.length?"&":"")+n);continue}(Vt(s)?s.map(o=>o&&Ka(o)):[s&&Ka(s)]).forEach(o=>{o!==void 0&&(e+=(e.length?"&":"")+n,o!=null&&(e+="="+o))})}return e}function Gf(t){const e={};for(const n in t){const s=t[n];s!==void 0&&(e[n]=Vt(s)?s.map(o=>o==null?null:""+o):s==null?s:""+s)}return e}const Wf=Symbol(""),_i=Symbol(""),ta=Symbol(""),Mr=Symbol(""),Xa=Symbol("");function $s(){let t=[];function e(s){return t.push(s),()=>{const o=t.indexOf(s);o>-1&&t.splice(o,1)}}function n(){t=[]}return{add:e,list:()=>t.slice(),reset:n}}function An(t,e,n,s,o,a=r=>r()){const r=s&&(s.enterCallbacks[o]=s.enterCallbacks[o]||[]);return()=>new Promise((i,l)=>{const u=p=>{p===!1?l(hs(Ve.NAVIGATION_ABORTED,{from:n,to:e})):p instanceof Error?l(p):Uf(p)?l(hs(Ve.NAVIGATION_GUARD_REDIRECT,{from:e,to:p})):(r&&s.enterCallbacks[o]===r&&typeof p=="function"&&r.push(p),i())},c=a(()=>t.call(s&&s.instances[o],e,n,u));let d=Promise.resolve(c);t.length<3&&(d=d.then(u)),d.catch(p=>l(p))})}function $a(t,e,n,s,o=a=>a()){const a=[];for(const r of t)for(const i in r.components){let l=r.components[i];if(!(e!=="beforeRouteEnter"&&!r.instances[i]))if(Iu(l)){const u=(l.__vccOpts||l)[e];u&&a.push(An(u,n,s,r,i,o))}else{let u=l();a.push(()=>u.then(c=>{if(!c)throw new Error(`Couldn't resolve component "${i}" at "${r.path}"`);const d=gf(c)?c.default:c;r.mods[i]=c,r.components[i]=d;const p=(d.__vccOpts||d)[e];return p&&An(p,n,s,r,i,o)()}))}}return a}function Xf(t,e){const n=[],s=[],o=[],a=Math.max(e.matched.length,t.matched.length);for(let r=0;r<a;r++){const i=e.matched[r];i&&(t.matched.find(u=>fs(u,i))?s.push(i):n.push(i));const l=t.matched[r];l&&(e.matched.find(u=>fs(u,l))||o.push(l))}return[n,s,o]}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let Yf=()=>location.protocol+"//"+location.host;function Uu(t,e){const{pathname:n,search:s,hash:o}=e,a=t.indexOf("#");if(a>-1){let r=o.includes(t.slice(a))?t.slice(a).length:1,i=o.slice(r);return i[0]!=="/"&&(i="/"+i),Ci(i,"")}return Ci(n,t)+s+o}function Jf(t,e,n,s){let o=[],a=[],r=null;const i=({state:p})=>{const m=Uu(t,location),b=n.value,g=e.value;let y=0;if(p){if(n.value=m,e.value=p,r&&r===b){r=null;return}y=g?p.position-g.position:0}else s(m);o.forEach(v=>{v(n.value,b,{delta:y,type:Ga.pop,direction:y?y>0?Sa.forward:Sa.back:Sa.unknown})})};function l(){r=n.value}function u(p){o.push(p);const m=()=>{const b=o.indexOf(p);b>-1&&o.splice(b,1)};return a.push(m),m}function c(){if(document.visibilityState==="hidden"){const{history:p}=window;if(!p.state)return;p.replaceState(Oe({},p.state,{scroll:ea()}),"")}}function d(){for(const p of a)p();a=[],window.removeEventListener("popstate",i),window.removeEventListener("pagehide",c),document.removeEventListener("visibilitychange",c)}return window.addEventListener("popstate",i),window.addEventListener("pagehide",c),document.addEventListener("visibilitychange",c),{pauseListeners:l,listen:u,destroy:d}}function Mi(t,e,n,s=!1,o=!1){return{back:t,current:e,forward:n,replaced:s,position:window.history.length,scroll:o?ea():null}}function Qf(t){const{history:e,location:n}=window,s={value:Uu(t,n)},o={value:e.state};o.value||a(s.value,{back:null,current:s.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function a(l,u,c){const d=t.indexOf("#"),p=d>-1?(n.host&&document.querySelector("base")?t:t.slice(d))+l:Yf()+t+l;try{e[c?"replaceState":"pushState"](u,"",p),o.value=u}catch(m){console.error(m),n[c?"replace":"assign"](p)}}function r(l,u){a(l,Oe({},e.state,Mi(o.value.back,l,o.value.forward,!0),u,{position:o.value.position}),!0),s.value=l}function i(l,u){const c=Oe({},o.value,e.state,{forward:l,scroll:ea()});a(c.current,c,!0),a(l,Oe({},Mi(s.value,l,null),{position:c.position+1},u),!1),s.value=l}return{location:s,state:o,push:i,replace:r}}function Zf(t){t=Lf(t);const e=Qf(t),n=Jf(t,e.state,e.location,e.replace);function s(a,r=!0){r||n.pauseListeners(),history.go(a)}const o=Oe({location:"",base:t,go:s,createHref:Pf.bind(null,t)},e,n);return Object.defineProperty(o,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(o,"state",{enumerable:!0,get:()=>e.state.value}),o}function eh(t){return t=location.host?t||location.pathname+location.search:"",t.includes("#")||(t+="#"),Zf(t)}let Vn=function(t){return t[t.Static=0]="Static",t[t.Param=1]="Param",t[t.Group=2]="Group",t}({});var Ke=function(t){return t[t.Static=0]="Static",t[t.Param=1]="Param",t[t.ParamRegExp=2]="ParamRegExp",t[t.ParamRegExpEnd=3]="ParamRegExpEnd",t[t.EscapeNext=4]="EscapeNext",t}(Ke||{});const th={type:Vn.Static,value:""},nh=/[a-zA-Z0-9_]/;function sh(t){if(!t)return[[]];if(t==="/")return[[th]];if(!t.startsWith("/"))throw new Error(`Invalid path "${t}"`);function e(m){throw new Error(`ERR (${n})/"${u}": ${m}`)}let n=Ke.Static,s=n;const o=[];let a;function r(){a&&o.push(a),a=[]}let i=0,l,u="",c="";function d(){u&&(n===Ke.Static?a.push({type:Vn.Static,value:u}):n===Ke.Param||n===Ke.ParamRegExp||n===Ke.ParamRegExpEnd?(a.length>1&&(l==="*"||l==="+")&&e(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`),a.push({type:Vn.Param,value:u,regexp:c,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):e("Invalid state to consume buffer"),u="")}function p(){u+=l}for(;i<t.length;){if(l=t[i++],l==="\\"&&n!==Ke.ParamRegExp){s=n,n=Ke.EscapeNext;continue}switch(n){case Ke.Static:l==="/"?(u&&d(),r()):l===":"?(d(),n=Ke.Param):p();break;case Ke.EscapeNext:p(),n=s;break;case Ke.Param:l==="("?n=Ke.ParamRegExp:nh.test(l)?p():(d(),n=Ke.Static,l!=="*"&&l!=="?"&&l!=="+"&&i--);break;case Ke.ParamRegExp:l===")"?c[c.length-1]=="\\"?c=c.slice(0,-1)+l:n=Ke.ParamRegExpEnd:c+=l;break;case Ke.ParamRegExpEnd:d(),n=Ke.Static,l!=="*"&&l!=="?"&&l!=="+"&&i--,c="";break;default:e("Unknown state");break}}return n===Ke.ParamRegExp&&e(`Unfinished custom RegExp for param "${u}"`),d(),r(),o}const Ri="[^/]+?",oh={sensitive:!1,strict:!1,start:!0,end:!0};var mt=function(t){return t[t._multiplier=10]="_multiplier",t[t.Root=90]="Root",t[t.Segment=40]="Segment",t[t.SubSegment=30]="SubSegment",t[t.Static=40]="Static",t[t.Dynamic=20]="Dynamic",t[t.BonusCustomRegExp=10]="BonusCustomRegExp",t[t.BonusWildcard=-50]="BonusWildcard",t[t.BonusRepeatable=-20]="BonusRepeatable",t[t.BonusOptional=-8]="BonusOptional",t[t.BonusStrict=.7000000000000001]="BonusStrict",t[t.BonusCaseSensitive=.25]="BonusCaseSensitive",t}(mt||{});const ah=/[.+*?^${}()[\]/\\]/g;function rh(t,e){const n=Oe({},oh,e),s=[];let o=n.start?"^":"";const a=[];for(const u of t){const c=u.length?[]:[mt.Root];n.strict&&!u.length&&(o+="/");for(let d=0;d<u.length;d++){const p=u[d];let m=mt.Segment+(n.sensitive?mt.BonusCaseSensitive:0);if(p.type===Vn.Static)d||(o+="/"),o+=p.value.replace(ah,"\\$&"),m+=mt.Static;else if(p.type===Vn.Param){const{value:b,repeatable:g,optional:y,regexp:v}=p;a.push({name:b,repeatable:g,optional:y});const x=v||Ri;if(x!==Ri){m+=mt.BonusCustomRegExp;try{`${x}`}catch($){throw new Error(`Invalid custom RegExp for param "${b}" (${x}): `+$.message)}}let S=g?`((?:${x})(?:/(?:${x}))*)`:`(${x})`;d||(S=y&&u.length<2?`(?:/${S})`:"/"+S),y&&(S+="?"),o+=S,m+=mt.Dynamic,y&&(m+=mt.BonusOptional),g&&(m+=mt.BonusRepeatable),x===".*"&&(m+=mt.BonusWildcard)}c.push(m)}s.push(c)}if(n.strict&&n.end){const u=s.length-1;s[u][s[u].length-1]+=mt.BonusStrict}n.strict||(o+="/?"),n.end?o+="$":n.strict&&!o.endsWith("/")&&(o+="(?:/|$)");const r=new RegExp(o,n.sensitive?"":"i");function i(u){const c=u.match(r),d={};if(!c)return null;for(let p=1;p<c.length;p++){const m=c[p]||"",b=a[p-1];d[b.name]=m&&b.repeatable?m.split("/"):m}return d}function l(u){let c="",d=!1;for(const p of t){(!d||!c.endsWith("/"))&&(c+="/"),d=!1;for(const m of p)if(m.type===Vn.Static)c+=m.value;else if(m.type===Vn.Param){const{value:b,repeatable:g,optional:y}=m,v=b in u?u[b]:"";if(Vt(v)&&!g)throw new Error(`Provided param "${b}" is an array but it is not repeatable (* or + modifiers)`);const x=Vt(v)?v.join("/"):v;if(!x)if(y)p.length<2&&(c.endsWith("/")?c=c.slice(0,-1):d=!0);else throw new Error(`Missing required param "${b}"`);c+=x}}return c||"/"}return{re:r,score:s,keys:a,parse:i,stringify:l}}function ih(t,e){let n=0;for(;n<t.length&&n<e.length;){const s=e[n]-t[n];if(s)return s;n++}return t.length<e.length?t.length===1&&t[0]===mt.Static+mt.Segment?-1:1:t.length>e.length?e.length===1&&e[0]===mt.Static+mt.Segment?1:-1:0}function zu(t,e){let n=0;const s=t.score,o=e.score;for(;n<s.length&&n<o.length;){const a=ih(s[n],o[n]);if(a)return a;n++}if(Math.abs(o.length-s.length)===1){if(ji(s))return 1;if(ji(o))return-1}return o.length-s.length}function ji(t){const e=t[t.length-1];return t.length>0&&e[e.length-1]<0}const lh={strict:!1,end:!0,sensitive:!1};function uh(t,e,n){const s=rh(sh(t.path),n),o=Oe(s,{record:t,parent:e,children:[],alias:[]});return e&&!o.record.aliasOf==!e.record.aliasOf&&e.children.push(o),o}function ch(t,e){const n=[],s=new Map;e=Ei(lh,e);function o(d){return s.get(d)}function a(d,p,m){const b=!m,g=Di(d);g.aliasOf=m&&m.record;const y=Ei(e,d),v=[g];if("alias"in d){const $=typeof d.alias=="string"?[d.alias]:d.alias;for(const R of $)v.push(Di(Oe({},g,{components:m?m.record.components:g.components,path:R,aliasOf:m?m.record:g})))}let x,S;for(const $ of v){const{path:R}=$;if(p&&R[0]!=="/"){const P=p.record.path,K=P[P.length-1]==="/"?"":"/";$.path=p.record.path+(R&&K+R)}if(x=uh($,p,y),m?m.alias.push(x):(S=S||x,S!==x&&S.alias.push(x),b&&d.name&&!Li(x)&&r(d.name)),qu(x)&&l(x),g.children){const P=g.children;for(let K=0;K<P.length;K++)a(P[K],x,m&&m.children[K])}m=m||x}return S?()=>{r(S)}:Ls}function r(d){if(Vu(d)){const p=s.get(d);p&&(s.delete(d),n.splice(n.indexOf(p),1),p.children.forEach(r),p.alias.forEach(r))}else{const p=n.indexOf(d);p>-1&&(n.splice(p,1),d.record.name&&s.delete(d.record.name),d.children.forEach(r),d.alias.forEach(r))}}function i(){return n}function l(d){const p=fh(d,n);n.splice(p,0,d),d.record.name&&!Li(d)&&s.set(d.record.name,d)}function u(d,p){let m,b={},g,y;if("name"in d&&d.name){if(m=s.get(d.name),!m)throw hs(Ve.MATCHER_NOT_FOUND,{location:d});y=m.record.name,b=Oe(Ii(p.params,m.keys.filter(S=>!S.optional).concat(m.parent?m.parent.keys.filter(S=>S.optional):[]).map(S=>S.name)),d.params&&Ii(d.params,m.keys.map(S=>S.name))),g=m.stringify(b)}else if(d.path!=null)g=d.path,m=n.find(S=>S.re.test(g)),m&&(b=m.parse(g),y=m.record.name);else{if(m=p.name?s.get(p.name):n.find(S=>S.re.test(p.path)),!m)throw hs(Ve.MATCHER_NOT_FOUND,{location:d,currentLocation:p});y=m.record.name,b=Oe({},p.params,d.params),g=m.stringify(b)}const v=[];let x=m;for(;x;)v.unshift(x.record),x=x.parent;return{name:y,path:g,params:b,matched:v,meta:ph(v)}}t.forEach(d=>a(d));function c(){n.length=0,s.clear()}return{addRoute:a,resolve:u,removeRoute:r,clearRoutes:c,getRoutes:i,getRecordMatcher:o}}function Ii(t,e){const n={};for(const s of e)s in t&&(n[s]=t[s]);return n}function Di(t){const e={path:t.path,redirect:t.redirect,name:t.name,meta:t.meta||{},aliasOf:t.aliasOf,beforeEnter:t.beforeEnter,props:dh(t),children:t.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in t?t.components||null:t.component&&{default:t.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function dh(t){const e={},n=t.props||!1;if("component"in t)e.default=n;else for(const s in t.components)e[s]=typeof n=="object"?n[s]:n;return e}function Li(t){for(;t;){if(t.record.aliasOf)return!0;t=t.parent}return!1}function ph(t){return t.reduce((e,n)=>Oe(e,n.meta),{})}function fh(t,e){let n=0,s=e.length;for(;n!==s;){const a=n+s>>1;zu(t,e[a])<0?s=a:n=a+1}const o=hh(t);return o&&(s=e.lastIndexOf(o,s-1)),s}function hh(t){let e=t;for(;e=e.parent;)if(qu(e)&&zu(t,e)===0)return e}function qu({record:t}){return!!(t.name||t.components&&Object.keys(t.components).length||t.redirect)}function Ni(t){const e=Dt(ta),n=Dt(Mr),s=E(()=>{const l=f(t.to);return e.resolve(l)}),o=E(()=>{const{matched:l}=s.value,{length:u}=l,c=l[u-1],d=n.matched;if(!c||!d.length)return-1;const p=d.findIndex(fs.bind(null,c));if(p>-1)return p;const m=Pi(l[u-2]);return u>1&&Pi(c)===m&&d[d.length-1].path!==m?d.findIndex(fs.bind(null,l[u-2])):p}),a=E(()=>o.value>-1&&bh(n.params,s.value.params)),r=E(()=>o.value>-1&&o.value===n.matched.length-1&&Fu(n.params,s.value.params));function i(l={}){if(vh(l)){const u=e[f(t.replace)?"replace":"push"](f(t.to)).catch(Ls);return t.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>u),u}return Promise.resolve()}return{route:s,href:E(()=>s.value.href),isActive:a,isExactActive:r,navigate:i}}function mh(t){return t.length===1?t[0]:t}const gh=Z({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:Ni,setup(t,{slots:e}){const n=Ne(Ni(t)),{options:s}=Dt(ta),o=E(()=>({[Bi(t.activeClass,s.linkActiveClass,"router-link-active")]:n.isActive,[Bi(t.exactActiveClass,s.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const a=e.default&&mh(e.default(n));return t.custom?a:Ru("a",{"aria-current":n.isExactActive?t.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:o.value},a)}}}),Ks=gh;function vh(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){const e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function bh(t,e){for(const n in e){const s=e[n],o=t[n];if(typeof s=="string"){if(s!==o)return!1}else if(!Vt(o)||o.length!==s.length||s.some((a,r)=>a.valueOf()!==o[r].valueOf()))return!1}return!0}function Pi(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}const Bi=(t,e,n)=>t??e??n,yh=Z({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(t,{attrs:e,slots:n}){const s=Dt(Xa),o=E(()=>t.route||s.value),a=Dt(_i,0),r=E(()=>{let u=f(a);const{matched:c}=o.value;let d;for(;(d=c[u])&&!d.components;)u++;return u}),i=E(()=>o.value.matched[r.value]);vo(_i,E(()=>r.value+1)),vo(Wf,i),vo(Xa,o);const l=B();return Re(()=>[l.value,i.value,t.name],([u,c,d],[p,m,b])=>{c&&(c.instances[d]=u,m&&m!==c&&u&&u===p&&(c.leaveGuards.size||(c.leaveGuards=m.leaveGuards),c.updateGuards.size||(c.updateGuards=m.updateGuards))),u&&c&&(!m||!fs(c,m)||!p)&&(c.enterCallbacks[d]||[]).forEach(g=>g(u))},{flush:"post"}),()=>{const u=o.value,c=t.name,d=i.value,p=d&&d.components[c];if(!p)return Fi(n.default,{Component:p,route:u});const m=d.props[c],b=m?m===!0?u.params:typeof m=="function"?m(u):m:null,y=Ru(p,Oe({},b,e,{onVnodeUnmounted:v=>{v.component.isUnmounted&&(d.instances[c]=null)},ref:l}));return Fi(n.default,{Component:y,route:u})||y}}});function Fi(t,e){if(!t)return null;const n=t(e);return n.length===1?n[0]:n}const Ku=yh;function wh(t){const e=ch(t.routes,t),n=t.parseQuery||Kf,s=t.stringifyQuery||Oi,o=t.history,a=$s(),r=$s(),i=$s(),l=xr($n);let u=$n;Zn&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const c=xa.bind(null,H=>""+H),d=xa.bind(null,Of),p=xa.bind(null,qs);function m(H,le){let se,de;return Vu(H)?(se=e.getRecordMatcher(H),de=le):de=H,e.addRoute(de,se)}function b(H){const le=e.getRecordMatcher(H);le&&e.removeRoute(le)}function g(){return e.getRoutes().map(H=>H.record)}function y(H){return!!e.getRecordMatcher(H)}function v(H,le){if(le=Oe({},le||l.value),typeof H=="string"){const _=ka(n,H,le.path),V=e.resolve({path:_.path},le),U=o.createHref(_.fullPath);return Oe(_,V,{params:p(V.params),hash:qs(_.hash),redirectedFrom:void 0,href:U})}let se;if(H.path!=null)se=Oe({},H,{path:ka(n,H.path,le.path).path});else{const _=Oe({},H.params);for(const V in _)_[V]==null&&delete _[V];se=Oe({},H,{params:d(_)}),le.params=d(le.params)}const de=e.resolve(se,le),ke=H.hash||"";de.params=c(p(de.params));const k=Rf(s,Oe({},H,{hash:Cf(ke),path:de.path})),A=o.createHref(k);return Oe({fullPath:k,hash:ke,query:s===Oi?Gf(H.query):H.query||{}},de,{redirectedFrom:void 0,href:A})}function x(H){return typeof H=="string"?ka(n,H,l.value.path):Oe({},H)}function S(H,le){if(u!==H)return hs(Ve.NAVIGATION_CANCELLED,{from:le,to:H})}function $(H){return K(H)}function R(H){return $(Oe(x(H),{replace:!0}))}function P(H,le){const se=H.matched[H.matched.length-1];if(se&&se.redirect){const{redirect:de}=se;let ke=typeof de=="function"?de(H,le):de;return typeof ke=="string"&&(ke=ke.includes("?")||ke.includes("#")?ke=x(ke):{path:ke},ke.params={}),Oe({query:H.query,hash:H.hash,params:ke.path!=null?{}:H.params},ke)}}function K(H,le){const se=u=v(H),de=l.value,ke=H.state,k=H.force,A=H.replace===!0,_=P(se,de);if(_)return K(Oe(x(_),{state:typeof _=="object"?Oe({},ke,_.state):ke,force:k,replace:A}),le||se);const V=se;V.redirectedFrom=le;let U;return!k&&jf(s,de,se)&&(U=hs(Ve.NAVIGATION_DUPLICATED,{to:V,from:de}),nt(de,de,!0,!1)),(U?Promise.resolve(U):j(V,de)).catch(F=>sn(F)?sn(F,Ve.NAVIGATION_GUARD_REDIRECT)?F:$e(F):G(F,V,de)).then(F=>{if(F){if(sn(F,Ve.NAVIGATION_GUARD_REDIRECT))return K(Oe({replace:A},x(F.to),{state:typeof F.to=="object"?Oe({},ke,F.to.state):ke,force:k}),le||V)}else F=Se(V,de,!0,A,ke);return me(V,de,F),F})}function D(H,le){const se=S(H,le);return se?Promise.reject(se):Promise.resolve()}function N(H){const le=Te.values().next().value;return le&&typeof le.runWithContext=="function"?le.runWithContext(H):H()}function j(H,le){let se;const[de,ke,k]=Xf(H,le);se=$a(de.reverse(),"beforeRouteLeave",H,le);for(const _ of de)_.leaveGuards.forEach(V=>{se.push(An(V,H,le))});const A=D.bind(null,H,le);return se.push(A),it(se).then(()=>{se=[];for(const _ of a.list())se.push(An(_,H,le));return se.push(A),it(se)}).then(()=>{se=$a(ke,"beforeRouteUpdate",H,le);for(const _ of ke)_.updateGuards.forEach(V=>{se.push(An(V,H,le))});return se.push(A),it(se)}).then(()=>{se=[];for(const _ of k)if(_.beforeEnter)if(Vt(_.beforeEnter))for(const V of _.beforeEnter)se.push(An(V,H,le));else se.push(An(_.beforeEnter,H,le));return se.push(A),it(se)}).then(()=>(H.matched.forEach(_=>_.enterCallbacks={}),se=$a(k,"beforeRouteEnter",H,le,N),se.push(A),it(se))).then(()=>{se=[];for(const _ of r.list())se.push(An(_,H,le));return se.push(A),it(se)}).catch(_=>sn(_,Ve.NAVIGATION_CANCELLED)?_:Promise.reject(_))}function me(H,le,se){i.list().forEach(de=>N(()=>de(H,le,se)))}function Se(H,le,se,de,ke){const k=S(H,le);if(k)return k;const A=le===$n,_=Zn?history.state:{};se&&(de||A?o.replace(H.fullPath,Oe({scroll:A&&_&&_.scroll},ke)):o.push(H.fullPath,ke)),l.value=H,nt(H,le,se,A),$e()}let z;function ae(){z||(z=o.listen((H,le,se)=>{if(!qe.listening)return;const de=v(H),ke=P(de,qe.currentRoute.value);if(ke){K(Oe(ke,{replace:!0,force:!0}),de).catch(Ls);return}u=de;const k=l.value;Zn&&Vf(Ti(k.fullPath,se.delta),ea()),j(de,k).catch(A=>sn(A,Ve.NAVIGATION_ABORTED|Ve.NAVIGATION_CANCELLED)?A:sn(A,Ve.NAVIGATION_GUARD_REDIRECT)?(K(Oe(x(A.to),{force:!0}),de).then(_=>{sn(_,Ve.NAVIGATION_ABORTED|Ve.NAVIGATION_DUPLICATED)&&!se.delta&&se.type===Ga.pop&&o.go(-1,!1)}).catch(Ls),Promise.reject()):(se.delta&&o.go(-se.delta,!1),G(A,de,k))).then(A=>{A=A||Se(de,k,!1),A&&(se.delta&&!sn(A,Ve.NAVIGATION_CANCELLED)?o.go(-se.delta,!1):se.type===Ga.pop&&sn(A,Ve.NAVIGATION_ABORTED|Ve.NAVIGATION_DUPLICATED)&&o.go(-1,!1)),me(de,k,A)}).catch(Ls)}))}let L=$s(),J=$s(),ue;function G(H,le,se){$e(H);const de=J.list();return de.length?de.forEach(ke=>ke(H,le,se)):console.error(H),Promise.reject(H)}function ie(){return ue&&l.value!==$n?Promise.resolve():new Promise((H,le)=>{L.add([H,le])})}function $e(H){return ue||(ue=!H,ae(),L.list().forEach(([le,se])=>H?se(H):le()),L.reset()),H}function nt(H,le,se,de){const{scrollBehavior:ke}=t;if(!Zn||!ke)return Promise.resolve();const k=!se&&Hf(Ti(H.fullPath,0))||(de||!se)&&history.state&&history.state.scroll||null;return ms().then(()=>ke(H,le,k)).then(A=>A&&Ff(A)).catch(A=>G(A,H,le))}const X=H=>o.go(H);let ge;const Te=new Set,qe={currentRoute:l,listening:!0,addRoute:m,removeRoute:b,clearRoutes:e.clearRoutes,hasRoute:y,getRoutes:g,resolve:v,options:t,push:$,replace:R,go:X,back:()=>X(-1),forward:()=>X(1),beforeEach:a.add,beforeResolve:r.add,afterEach:i.add,onError:J.add,isReady:ie,install(H){H.component("RouterLink",Ks),H.component("RouterView",Ku),H.config.globalProperties.$router=qe,Object.defineProperty(H.config.globalProperties,"$route",{enumerable:!0,get:()=>f(l)}),Zn&&!ge&&l.value===$n&&(ge=!0,$(o.location).catch(de=>{}));const le={};for(const de in $n)Object.defineProperty(le,de,{get:()=>l.value[de],enumerable:!0});H.provide(ta,qe),H.provide(Mr,Gl(le)),H.provide(Xa,l);const se=H.unmount;Te.add(H),H.unmount=function(){Te.delete(H),Te.size<1&&(u=$n,z&&z(),z=null,l.value=$n,ge=!1,ue=!1),se()}}};function it(H){return H.reduce((le,se)=>le.then(()=>N(se)),Promise.resolve())}return qe}function Rr(){return Dt(ta)}function Gu(t){return Dt(Mr)}const Be=(t,e,n,s,o,a,r)=>({array:[...t],comparing:e,swapping:n,sorted:[...s],comparisons:o,swaps:a,done:!1,line:r}),Rt=(t,e,n,s)=>({array:[...t],comparing:[],swapping:[],sorted:t.map((o,a)=>a),comparisons:e,swaps:n,done:!0,line:s});function*xh(t){const e=[...t],n=e.length,s=new Set;let o=0,a=0;for(let r=0;r<n-1;r++){for(let i=0;i<n-1-r;i++)o++,yield Be(e,[i,i+1],[],s,o,a,2),e[i]>e[i+1]&&([e[i],e[i+1]]=[e[i+1],e[i]],a++,yield Be(e,[],[i,i+1],s,o,a,3));s.add(n-1-r)}s.add(0),yield Rt(e,o,a,5)}function*kh(t){const e=[...t],n=e.length,s=new Set;let o=0,a=0;for(let r=0;r<n;r++){let i=r;for(let l=r+1;l<n;l++)o++,yield Be(e,[i,l],[],s,o,a,3),e[l]<e[i]&&(i=l);i!==r&&([e[r],e[i]]=[e[i],e[r]],a++,yield Be(e,[],[r,i],s,o,a,5)),s.add(r)}yield Rt(e,o,a,7)}function*Sh(t){const e=[...t],n=e.length,s=new Set;let o=0,a=0;for(let r=1;r<n;r++){let i=r;for(;i>0&&(o++,yield Be(e,[i-1,i],[],s,o,a,2),e[i-1]>e[i]);)[e[i-1],e[i]]=[e[i],e[i-1]],a++,yield Be(e,[],[i-1,i],s,o,a,3),i--}yield Rt(e,o,a,5)}function*$h(t){const e=[...t],n=new Set;let s=0,o=0;function*a(r,i){if(i-r<=1)return;const l=r+i>>1;yield*a(r,l),yield*a(l,i);const u=[];let c=r,d=l;for(;c<l&&d<i;)s++,yield Be(e,[c,d],[],n,s,o,5),e[c]<=e[d]?u.push(e[c++]):u.push(e[d++]);for(;c<l;)u.push(e[c++]);for(;d<i;)u.push(e[d++]);for(let p=0;p<u.length;p++)e[r+p]=u[p],o++,yield Be(e,[],[r+p],n,s,o,7)}yield*a(0,e.length),yield Rt(e,s,o,8)}function*Eh(t){const e=[...t],n=new Set;let s=0,o=0;function*a(r,i){if(r>i)return;if(r===i){n.add(r);return}const l=e[i];let u=r;for(let c=r;c<i;c++)s++,yield Be(e,[c,i],[],n,s,o,4),e[c]<l&&(u!==c&&([e[u],e[c]]=[e[c],e[u]],o++,yield Be(e,[],[u,c],n,s,o,5)),u++);u!==i&&([e[u],e[i]]=[e[i],e[u]],o++,yield Be(e,[],[u,i],n,s,o,6)),n.add(u),yield*a(r,u-1),yield*a(u+1,i)}yield*a(0,e.length-1),yield Rt(e,s,o,8)}function*Ch(t){const e=[...t],n=e.length,s=new Set;let o=0,a=0;function*r(i,l){for(;2*i+1<=l;){let u=2*i+1;if(u+1<=l&&(o++,yield Be(e,[u,u+1],[],s,o,a,2),e[u]<e[u+1]&&u++),o++,yield Be(e,[i,u],[],s,o,a,3),e[i]<e[u])[e[i],e[u]]=[e[u],e[i]],a++,yield Be(e,[],[i,u],s,o,a,4),i=u;else return}}for(let i=(n>>1)-1;i>=0;i--)yield*r(i,n-1);for(let i=n-1;i>0;i--)[e[0],e[i]]=[e[i],e[0]],a++,yield Be(e,[],[0,i],s,o,a,8),s.add(i),yield*r(0,i-1);s.add(0),yield Rt(e,o,a,10)}function*Ah(t){const e=[...t],n=e.length,s=new Set;let o=0,a=0;for(let r=Math.floor(n/2);r>0;r=Math.floor(r/2))for(let i=r;i<n;i++){let l=i;for(;l>=r&&(o++,yield Be(e,[l-r,l],[],s,o,a,3),e[l-r]>e[l]);)[e[l-r],e[l]]=[e[l],e[l-r]],a++,yield Be(e,[],[l-r,l],s,o,a,4),l-=r}yield Rt(e,o,a,6)}const Th=1.3;function*Oh(t){const e=[...t],n=e.length,s=new Set;let o=0,a=0,r=n,i=!0;for(;r>1||i;){r=Math.floor(r/Th),r<1&&(r=1),i=!1;for(let l=0;l+r<n;l++)o++,yield Be(e,[l,l+r],[],s,o,a,5),e[l]>e[l+r]&&([e[l],e[l+r]]=[e[l+r],e[l]],a++,i=!0,yield Be(e,[],[l,l+r],s,o,a,6))}yield Rt(e,o,a,7)}function*_h(t){const e=[...t],n=e.length,s=new Set,o=0;let a=0;if(n===0){yield Rt(e,o,a,8);return}const r=Math.max(...e),i=new Array(r+1).fill(0);for(let u=0;u<n;u++)yield Be(e,[u],[],s,o,a,2),i[e[u]]++;for(let u=1;u<=r;u++)i[u]+=i[u-1];const l=new Array(n).fill(0);for(let u=n-1;u>=0;u--){const c=e[u],d=--i[c];l[d]=c,a++,yield Be(l,[],[d],s,o,a,7)}yield Rt(l,o,a,8)}const ao=10;function*Mh(t){let e=[...t];const n=e.length,s=new Set,o=0;let a=0;if(n===0){yield Rt(e,o,a,11);return}const r=Math.max(...e);for(let i=1;Math.floor(r/i)>0;i*=ao){const l=d=>Math.floor(d/i)%ao,u=new Array(ao).fill(0);for(let d=0;d<n;d++)yield Be(e,[d],[],s,o,a,4),u[l(e[d])]++;for(let d=1;d<ao;d++)u[d]+=u[d-1];const c=new Array(n).fill(0);for(let d=n-1;d>=0;d--){const p=--u[l(e[d])];c[p]=e[d],a++,yield Be(c,[],[p],s,o,a,9)}e=c}yield Rt(e,o,a,11)}const us={bubble:{name:"Bubble Sort",generator:xh,description:"Repeatedly compares adjacent elements and swaps them if out of order, letting the largest values bubble to the end each pass.",complexity:{best:"O(n)",average:"O(n²)",worst:"O(n²)",space:"O(1)"},stable:!0},selection:{name:"Selection Sort",generator:kh,description:"Scans the unsorted region for the minimum element and swaps it into place, growing a sorted prefix from the front.",complexity:{best:"O(n²)",average:"O(n²)",worst:"O(n²)",space:"O(1)"},stable:!1},insertion:{name:"Insertion Sort",generator:Sh,description:"Builds the sorted array one item at a time by shifting each new element left until it sits in the correct spot.",complexity:{best:"O(n)",average:"O(n²)",worst:"O(n²)",space:"O(1)"},stable:!0},merge:{name:"Merge Sort",generator:$h,description:"Divides the array in half recursively, sorts each half, then merges the sorted halves back together. Consistent O(n log n).",complexity:{best:"O(n log n)",average:"O(n log n)",worst:"O(n log n)",space:"O(n)"},stable:!0},quick:{name:"Quick Sort",generator:Eh,description:"Partitions the array around a pivot so smaller values sit left and larger right, then recurses into each side. Fast in practice.",complexity:{best:"O(n log n)",average:"O(n log n)",worst:"O(n²)",space:"O(log n)"},stable:!1},heap:{name:"Heap Sort",generator:Ch,description:"Builds a max-heap, then repeatedly moves the largest element to the end and re-heapifies the shrinking heap.",complexity:{best:"O(n log n)",average:"O(n log n)",worst:"O(n log n)",space:"O(1)"},stable:!1},shell:{name:"Shell Sort",generator:Ah,description:"Generalizes insertion sort by comparing and swapping elements far apart first, shrinking the gap each pass until a final gap-1 pass leaves the array sorted.",complexity:{best:"O(n log n)",average:"O(n^1.5)",worst:"O(n²)",space:"O(1)"},stable:!1},comb:{name:"Comb Sort",generator:Oh,description:"Improves bubble sort by comparing elements separated by a shrinking gap (÷1.3 each pass) instead of only adjacent ones, clearing small trailing values much faster.",complexity:{best:"O(n log n)",average:"O(n²/2ᵖ)",worst:"O(n²)",space:"O(1)"},stable:!1},counting:{name:"Counting Sort",generator:_h,description:"Counts how many times each value occurs, turns those counts into placement offsets, and drops every element straight into its final slot — no comparisons needed.",complexity:{best:"O(n + k)",average:"O(n + k)",worst:"O(n + k)",space:"O(n + k)"},stable:!0},radix:{name:"Radix Sort",generator:Mh,description:"Sorts integers one decimal digit at a time, least significant first, using a stable counting sort per digit until every digit position has been processed.",complexity:{best:"O(d·(n + b))",average:"O(d·(n + b))",worst:"O(d·(n + b))",space:"O(n + b)"},stable:!0}},Gn=(t,e,n,s,o,a,r)=>({array:[...t],low:e,high:n,mid:s,checking:o,target:a,foundIndex:null,comparisons:r,done:!1}),At=(t,e,n,s)=>({array:[...t],low:null,high:null,mid:null,checking:null,target:e,foundIndex:n,comparisons:s,done:!0});function*Rh(t,e){const n=[...t],s=n.length;let o=0;for(let a=0;a<s;a++)if(o++,yield Gn(n,0,s-1,null,a,e,o),n[a]===e){yield At(n,e,a,o);return}yield At(n,e,null,o)}function*jh(t,e){const n=[...t];let s=0,o=n.length-1,a=0;for(;s<=o;){const r=Math.floor((s+o)/2);if(a++,yield Gn(n,s,o,r,r,e,a),n[r]===e){yield At(n,e,r,a);return}n[r]<e?s=r+1:o=r-1}yield At(n,e,null,a)}function*Ih(t,e){const n=[...t],s=n.length;let o=0;if(s===0){yield At(n,e,null,o);return}const a=Math.max(1,Math.floor(Math.sqrt(s)));let r=0,i=Math.min(a,s)-1;for(;;){if(o++,yield Gn(n,r,i,null,i,e,o),n[i]===e){yield At(n,e,i,o);return}if(n[i]>e||i===s-1)break;r=i+1,i=Math.min(i+a,s-1)}for(let l=r;l<i;l++)if(o++,yield Gn(n,r,i,null,l,e,o),n[l]===e){yield At(n,e,l,o);return}yield At(n,e,null,o)}function*Dh(t,e){const n=[...t];let s=0,o=n.length-1,a=0;for(;s<=o&&e>=n[s]&&e<=n[o];){let r;if(n[s]===n[o]?r=s:r=s+Math.floor((e-n[s])*(o-s)/(n[o]-n[s])),a++,yield Gn(n,s,o,r,r,e,a),n[r]===e){yield At(n,e,r,a);return}n[r]<e?s=r+1:o=r-1}yield At(n,e,null,a)}function*Lh(t,e){const n=[...t],s=n.length;let o=0,a=0,r=1;for(;r<s;){if(o++,yield Gn(n,a,r,null,r,e,o),n[r]===e){yield At(n,e,r,o);return}if(n[r]>e)break;a=r,r*=2}let i=Math.min(r,s-1);for(;a<=i;){const l=Math.floor((a+i)/2);if(o++,yield Gn(n,a,i,l,l,e,o),n[l]===e){yield At(n,e,l,o);return}n[l]<e?a=l+1:i=l-1}yield At(n,e,null,o)}const na={linear:{name:"Linear Search",generator:Rh,description:"Scans the array from left to right, comparing each element to the target until a match is found or every element has been checked.",complexity:{best:"O(1)",average:"O(n)",worst:"O(n)",space:"O(1)"}},binary:{name:"Binary Search",generator:jh,description:"Repeatedly compares the target to the middle element of a sorted array and discards the half that cannot contain it, halving the search range each step.",complexity:{best:"O(1)",average:"O(log n)",worst:"O(log n)",space:"O(1)"}},jump:{name:"Jump Search",generator:Ih,description:"Advances through a sorted array in fixed-size blocks of about √n, testing only the last element of each block, then falls back to a linear scan of the block where the target must lie.",complexity:{best:"O(1)",average:"O(√n)",worst:"O(√n)",space:"O(1)"}},interpolation:{name:"Interpolation Search",generator:Dh,description:"Estimates where the target should be by linearly interpolating between the values at the low and high ends of the search range, rather than always probing the midpoint like binary search.",complexity:{best:"O(1)",average:"O(log log n)",worst:"O(n)",space:"O(1)"}},exponential:{name:"Exponential Search",generator:Lh,description:"Doubles a bound (1, 2, 4, 8, ...) until it overshoots the target, then binary searches within the range that doubling identified.",complexity:{best:"O(1)",average:"O(log n)",worst:"O(log n)",space:"O(1)"}}},gs=(t,e,n)=>({visited:[...t],frontier:[...e],current:n,path:[],done:!1}),Xe=(t,e)=>({visited:[...t],frontier:[],current:null,path:[...e],done:!0}),vs=[[-1,0],[1,0],[0,-1],[0,1]],Qe=(t,e)=>`${t},${e}`;function bs(t){const e=t.length,n=e>0?t[0].length:0,s=(a,r)=>a>=0&&a<e&&r>=0&&r<n;return{rows:e,cols:n,inBounds:s,isOpen:(a,r)=>s(a,r)&&t[a][r]===0}}function Zs(t,e){const n=[e];let s=Qe(e.row,e.col);for(;t.has(s);){const o=t.get(s);n.push(o),s=Qe(o.row,o.col)}return n.reverse()}function*Nh(t,e,n){const{isOpen:s}=bs(t);if(!s(e.row,e.col)||!s(n.row,n.col)){yield Xe([],[]);return}const o=new Map,a=new Set([Qe(e.row,e.col)]),r=[],i=[e];for(;i.length>0;){const l=i.shift();if(r.push(l),yield gs(r,i,l),l.row===n.row&&l.col===n.col){yield Xe(r,Zs(o,n));return}for(const[u,c]of vs){const d=l.row+u,p=l.col+c;if(!s(d,p))continue;const m=Qe(d,p);a.has(m)||(a.add(m),o.set(m,l),i.push({row:d,col:p}))}}yield Xe(r,[])}function*Ph(t,e,n){const{isOpen:s}=bs(t);if(!s(e.row,e.col)||!s(n.row,n.col)){yield Xe([],[]);return}const o=new Map,a=new Set([Qe(e.row,e.col)]),r=[],i=[e];for(;i.length>0;){const l=i.pop();if(r.push(l),yield gs(r,i,l),l.row===n.row&&l.col===n.col){yield Xe(r,Zs(o,n));return}for(const[u,c]of vs){const d=l.row+u,p=l.col+c;if(!s(d,p))continue;const m=Qe(d,p);a.has(m)||(a.add(m),o.set(m,l),i.push({row:d,col:p}))}}yield Xe(r,[])}function*Bh(t,e,n){const{isOpen:s}=bs(t);if(!s(e.row,e.col)||!s(n.row,n.col)){yield Xe([],[]);return}const o=Qe(e.row,e.col),a=new Map([[o,0]]),r=new Map,i=new Set,l=new Map([[o,e]]),u=[];for(;l.size>0;){let c=null,d=null,p=1/0;for(const[m,b]of l){const g=a.get(m);g<p&&(p=g,c=m,d=b)}if(l.delete(c),i.add(c),u.push(d),yield gs(u,[...l.values()],d),d.row===n.row&&d.col===n.col){yield Xe(u,Zs(r,n));return}for(const[m,b]of vs){const g=d.row+m,y=d.col+b;if(!s(g,y))continue;const v=Qe(g,y);if(i.has(v))continue;const x=p+1;x<(a.get(v)??1/0)&&(a.set(v,x),r.set(v,d),l.set(v,{row:g,col:y}))}}yield Xe(u,[])}function Vi(t,e,n){return Math.abs(t-n.row)+Math.abs(e-n.col)}function*Fh(t,e,n){const{isOpen:s}=bs(t);if(!s(e.row,e.col)||!s(n.row,n.col)){yield Xe([],[]);return}const o=Qe(e.row,e.col),a=new Map([[o,0]]),r=new Map([[o,Vi(e.row,e.col,n)]]),i=new Map,l=new Set,u=new Map([[o,e]]),c=[];for(;u.size>0;){let d=null,p=null,m=1/0;for(const[g,y]of u){const v=r.get(g)??1/0;v<m&&(m=v,d=g,p=y)}if(u.delete(d),l.add(d),c.push(p),yield gs(c,[...u.values()],p),p.row===n.row&&p.col===n.col){yield Xe(c,Zs(i,n));return}const b=a.get(d);for(const[g,y]of vs){const v=p.row+g,x=p.col+y;if(!s(v,x))continue;const S=Qe(v,x);if(l.has(S))continue;const $=b+1;$<(a.get(S)??1/0)&&(a.set(S,$),r.set(S,$+Vi(v,x,n)),i.set(S,p),u.set(S,{row:v,col:x}))}}yield Xe(c,[])}function*Vh(t,e,n){const{rows:s,cols:o,isOpen:a}=bs(t);if(!a(e.row,e.col)||!a(n.row,n.col)){yield Xe([],[]);return}const r=[];for(let c=0;c<s;c++)for(let d=0;d<o;d++)a(c,d)&&r.push({row:c,col:d});const i=new Map([[Qe(e.row,e.col),0]]),l=new Map,u=[e];for(let c=0;c<r.length-1;c++){const d=[];for(const p of r){const m=i.get(Qe(p.row,p.col));if(m!==void 0)for(const[b,g]of vs){const y=p.row+b,v=p.col+g;if(!a(y,v))continue;const x=Qe(y,v),S=m+1,$=i.get(x);$!==void 0&&S>=$||($===void 0&&u.push({row:y,col:v}),i.set(x,S),l.set(x,p),d.push({row:y,col:v}),yield gs(u,d,{row:y,col:v}))}}if(d.length===0)break}if(!i.has(Qe(n.row,n.col))){yield Xe(u,[]);return}yield Xe(u,Zs(l,n))}const Hh=600;function*Uh(t,e,n){const{rows:s,cols:o,isOpen:a}=bs(t);if(!a(e.row,e.col)||!a(n.row,n.col)){yield Xe([],[]);return}const r=[],i=new Map;for(let y=0;y<s;y++)for(let v=0;v<o;v++)a(y,v)&&(i.set(Qe(y,v),r.length),r.push({row:y,col:v}));const l=r.length;if(l>Hh){yield Xe([],[]);return}const u=new Float64Array(l*l).fill(1/0),c=new Int32Array(l*l).fill(-1);for(let y=0;y<l;y++){u[y*l+y]=0,c[y*l+y]=y;const{row:v,col:x}=r[y];for(const[S,$]of vs){const R=i.get(Qe(v+S,x+$));R!==void 0&&(u[y*l+R]=1,c[y*l+R]=R)}}const d=i.get(Qe(e.row,e.col)),p=i.get(Qe(n.row,n.col)),m=()=>{const y=[];for(let v=0;v<l;v++)u[d*l+v]!==1/0&&y.push(r[v]);return y};for(let y=0;y<l;y++){const v=y*l,x=[];for(let S=0;S<l;S++){const $=S*l,R=u[$+y];if(R!==1/0)for(let P=0;P<l;P++){const K=R+u[v+P];K>=u[$+P]||(u[$+P]=K,c[$+P]=c[$+y],S===d&&x.push(r[P]))}}yield gs(m(),[r[y],...x],r[y])}if(c[d*l+p]===-1){yield Xe(m(),[]);return}const b=[r[d]];let g=d;for(;g!==p;)g=c[g*l+p],b.push(r[g]);yield Xe(m(),b)}const sa={bfs:{name:"BFS",generator:Nh,description:"Explores the grid ring by ring using a FIFO queue. Guarantees the shortest path on this unweighted grid, since every step costs the same.",complexity:{best:"O(rows×cols)",average:"O(rows×cols)",worst:"O(rows×cols)",space:"O(rows×cols)"}},dfs:{name:"DFS",generator:Ph,description:"Dives down one path as far as possible before backtracking. Finds *a* connected path to the goal but does NOT guarantee the shortest one.",complexity:{best:"O(rows×cols)",average:"O(rows×cols)",worst:"O(rows×cols)",space:"O(rows×cols)"}},dijkstra:{name:"Dijkstra",generator:Bh,description:"Settles the unvisited cell with the smallest known distance each round (uniform edge weight of 1). This implementation selects that cell with a plain array scan rather than a binary heap, so it is honestly O((rows×cols)²) worst case, not the idealized heap-backed O(E log V).",complexity:{best:"O((rows×cols)²)",average:"O((rows×cols)²)",worst:"O((rows×cols)²)",space:"O(rows×cols)"}},astar:{name:"A*",generator:Fh,description:"Like Dijkstra, but prioritizes cells by distance-so-far plus a Manhattan-distance estimate to the goal, so it usually expands far fewer cells. Still selects the next cell via a plain array scan, so the worst case remains O((rows×cols)²), same as this Dijkstra implementation — the heuristic helps in practice, not in the asymptotic bound.",complexity:{best:"O(rows×cols)",average:"O((rows×cols)²)",worst:"O((rows×cols)²)",space:"O(rows×cols)"}},bellmanFord:{name:"Bellman-Ford",generator:Vh,description:"Sweeps the entire edge list over and over, letting better distances trickle one hop further per pass, until a whole pass changes nothing. It reaches the same answer as Dijkstra far more slowly and with no priority queue at all — watch the frontier collapse and rebuild to see where one pass ends and the next begins. Unlike the four searches above it never stops early at the goal: it has no way to know a distance is final until the sweeps settle, so it always solves for every reachable cell.",complexity:{best:"O(rows×cols)",average:"O((rows+cols)×rows×cols)",worst:"O((rows×cols)²)",space:"O(rows×cols)"}},floydWarshall:{name:"Floyd-Warshall",generator:Uh,description:"The all-pairs algorithm: instead of searching, it fills a full every-cell-to-every-cell distance table by letting each cell in turn act as an intermediate stop. The single amber cell marching through the grid is that pivot; the answer to this particular query is one row of the table, read out at the end. Genuinely cubic — it does roughly 30 million relaxations on this grid to answer a question BFS answers in 375 — and it is here to show that shape, not to compete.",complexity:{best:"O((rows×cols)³)",average:"O((rows×cols)³)",worst:"O((rows×cols)³)",space:"O((rows×cols)²)"}}};function*zh(t,e){const n=[],s=new Set,o=[];if(!t.has(e)){yield{visited:n,frontier:[],current:null,done:!0};return}for(o.push(e),s.add(e);o.length>0;){const a=o.shift();n.push(a);for(const r of t.get(a)??[])s.has(r)||(s.add(r),o.push(r));yield{visited:[...n],frontier:[...o],current:a,done:!1}}yield{visited:[...n],frontier:[],current:null,done:!0}}function*qh(t,e){const n=[],s=new Set,o=[];if(!t.has(e)){yield{visited:n,frontier:[],current:null,done:!0};return}for(o.push(e);o.length>0;){const a=o.pop();if(s.has(a))continue;s.add(a),n.push(a);const r=t.get(a)??[];for(let i=r.length-1;i>=0;i--){const l=r[i];s.has(l)||o.push(l)}yield{visited:[...n],frontier:[...o],current:a,done:!1}}yield{visited:[...n],frontier:[],current:null,done:!0}}function*Kh(t,e){const n=[],s=new Set;if(!t.has(e)){yield{visited:n,frontier:[],current:null,done:!0};return}const o=[e,...[...t.keys()].filter(a=>a!==e)];for(const a of o){if(s.has(a))continue;const r=[[a,null]];for(;r.length>0;){const[i,l]=r.pop();if(s.has(i))continue;s.add(i),n.push(i);const u=t.get(i)??[];let c=!1;for(let d=u.length-1;d>=0;d--){const p=u[d];if(!c&&p===l){c=!0;continue}if(s.has(p)){yield{visited:[...n],frontier:[],current:p,done:!0};return}r.push([p,i])}yield{visited:[...n],frontier:r.map(([d])=>d),current:i,done:!1}}}yield{visited:[...n],frontier:[],current:null,done:!0}}function*Gh(t,e){const n=[],s=new Set,o=new Map;if(!t.has(e)){yield{visited:n,frontier:[],current:null,done:!0};return}const a=[e,...[...t.keys()].filter(r=>r!==e)];for(const r of a){if(s.has(r))continue;const i=[r];for(s.add(r),o.set(r,0);i.length>0;){const l=i.shift();n.push(l);const u=o.get(l),c=u===0?1:0;for(const d of t.get(l)??[])if(!s.has(d))s.add(d),o.set(d,c),i.push(d);else if(o.get(d)===u){yield{visited:[...n],frontier:[...i],current:d,done:!0};return}yield{visited:[...n],frontier:[...i],current:l,done:!1}}}yield{visited:[...n],frontier:[],current:null,done:!0}}const oa={bfs:{name:"BFS Traversal",generator:zh,description:"Explores the graph level by level from the start node, visiting every neighbor of the current node before moving deeper, using a queue to track the frontier.",complexity:{time:"O(V + E)",space:"O(V)"}},dfs:{name:"DFS Traversal",generator:qh,description:"Explores as far as possible down one branch from the start node before backtracking, using a stack to track nodes still waiting to be explored.",complexity:{time:"O(V + E)",space:"O(V)"}},"cycle-detection":{name:"Cycle Detection",generator:Kh,description:"Walks the graph depth-first looking for an edge back to an already-visited node other than the one just arrived from — undirected only, and sweeps every component, not just the one the start node reaches, since a cycle elsewhere still counts.",complexity:{time:"O(V + E)",space:"O(V)"}},"bipartite-check":{name:"Bipartite Check",generator:Gh,description:"Attempts to 2-colour the graph breadth-first, alternating colour with every hop; finds no valid colouring exists the moment an edge connects two same-coloured nodes. Checks every component, since one component alone being bipartite says nothing about the rest.",complexity:{time:"O(V + E)",space:"O(V)"}}},qn=1/0,Ya=900,Wh=2e3;function Io(t,e){const n=t;if(n.kind!==e.kind)return`This algorithm needs a ${n.kind} input.`;const s=n.validate(e);if(s)return s;const{rows:o,cols:a}=n.dims(e),r=o*a;return r>Ya?`That table would be ${o} x ${a} = ${r} cells; the limit is ${Ya}.`:null}function Wu(t,e){const n=t,s=e.kind===n.kind?e:n.defaults;return{input:s,recurrence:n.recurrence,axes:n.axes(s),dims:n.dims(s),naiveCalls:n.naiveCalls(s),depsOf:(o,a,r)=>n.depsOf(s,o,a,r),generator:()=>n.generator(s)}}function jn(t,e){return{table:Array.from({length:t},()=>new Array(e).fill(null)),path:[],cellsFilled:0}}function xt(t,e,n,s){t.table[e][n]===null&&(t.cellsFilled+=1),t.table[e][n]=s}function Ot(t,e){t.path.push({row:e.row,col:e.col})}function Xn(t){return{row:t.row,col:t.col}}function Xu(t){return t.map(e=>[...e])}function Ce(t,e,n,s,o,a){return{table:Xu(t.table),cursor:e,deps:n,chosen:s,explain:o,path:[...t.path],result:null,cellsFilled:t.cellsFilled,done:!1,line:a}}function In(t,e,n,s){return{table:Xu(t.table),cursor:null,deps:[],chosen:null,explain:n,path:[...t.path],result:e,cellsFilled:t.cellsFilled,done:!0,line:s}}function We(t,e,n,s){return{row:e,col:n,label:s,value:t[e][n]}}function kt(t,e){let n=null;for(const s of t)(n===null||(e==="max"?s.score>n.score:s.score<n.score))&&(n=s);return n}function Wn(t){return t===null?"·":t===qn?"∞":String(t)}function Je(t){return`dp[${t}]`}function we(t,e){return`dp[${t}][${e}]`}function ys(t,e){return`${t}(${e.map(n=>n.text).join(", ")})`}function Lt(t,e,n){return`${t} = ${e} = ${Wn(n)}`}function mn(t,e,n){return`${t} = ${Wn(e)}  (${n})`}const Ja=Number.MAX_SAFE_INTEGER;function ct(t,e){const n=t+e;return n>=Ja?Ja:n}function Yu(t){return t>=Ja}function Hi(t){return Yu(t)?"> 9.0e15":t<1e6?t.toLocaleString():t.toExponential(1)}function Xh(t){if(t<0)return 0;const e=[1,1];for(let n=2;n<=t;n++)e[n]=ct(1,ct(e[n-1],e[n-2]));return e[Math.min(t,e.length-1)]}function Yh(t,e){if(e<0)return 0;const n=new Array(e+1).fill(0);n[0]=1;for(let s=1;s<=e;s++){let o=1;for(const a of t)a>0&&a<=s&&(o=ct(o,n[s-a]));n[s]=o}return n[e]}function Jh(t){const e=t.length,n=new Array(e).fill(1);let s=0;for(let o=0;o<e;o++){let a=1;for(let r=0;r<o;r++)t[r]<t[o]&&(a=ct(a,n[r]));n[o]=a,s=ct(s,a)}return s}function Ju(t,e){if(e<0)return 0;let n=new Array(e+1).fill(1);for(const s of t){const o=new Array(e+1).fill(0);for(let a=0;a<=e;a++){let r=ct(1,n[a]);s>=0&&s<=a&&(r=ct(r,n[a-s])),o[a]=r}n=o}return n[e]}function Qh(t,e){const n=t.length,s=e.length;let o=new Array(s+1).fill(1);for(let a=1;a<=n;a++){const r=new Array(s+1).fill(1);for(let i=1;i<=s;i++)r[i]=t[a-1]===e[i-1]?ct(1,o[i-1]):ct(1,ct(o[i],r[i-1]));o=r}return o[s]}function Zh(t,e){const n=t.length,s=e.length;let o=new Array(s+1).fill(1);for(let a=1;a<=n;a++){const r=new Array(s+1).fill(1);for(let i=1;i<=s;i++)t[a-1]===e[i-1]?r[i]=ct(1,o[i-1]):r[i]=ct(1,ct(o[i-1],ct(o[i],r[i-1])));o=r}return o[s]}function em(t){if(t<=0)return 0;const e=Array.from({length:t},()=>new Array(t).fill(1));for(let n=2;n<=t;n++)for(let s=0;s+n-1<t;s++){const o=s+n-1;let a=1;for(let r=s;r<o;r++)a=ct(a,ct(e[s][r],e[r+1][o]));e[s][o]=a}return e[0][t-1]}function Qu(t,e){if(t<2)return[];const n=We(e,0,t-1,"f(k-1)"),s=We(e,0,t-2,"f(k-2)");return[{deps:[n],score:n.value??0,text:`${Je(t-1)}=${n.value??0}`},{deps:[s],score:s.value??0,text:`${Je(t-2)}=${s.value??0}`}]}function tm(t,e,n,s){return Qu(n,s).flatMap(o=>o.deps)}function*nm(t){const e=t.n,n=jn(1,e+1);for(let a=0;a<=e;a++){if(a<2){xt(n,0,a,a);const d={row:0,col:a},p=mn(Je(a),a,"base case");yield Ce(n,d,[],null,p,0);continue}const r=Qu(a,n.table),i=r.flatMap(d=>d.deps),l=r[0].score+r[1].score;xt(n,0,a,l);const u={row:0,col:a},c=Lt(Je(a),r.map(d=>d.text).join(" + "),l);yield Ce(n,u,i,null,c,1)}for(let a=e;a>=0;a--){Ot(n,{row:0,col:a});const r=`${Je(a)} = ${n.table[0][a]} contributed to every later cell`;yield Ce(n,null,[],null,r,2)}const s=n.table[0][e]??0,o=`fib(${e}) = ${s}`;yield In(n,o,`${Je(e)} = ${s}`,3)}const sm={kind:"scalar",defaults:{kind:"scalar",n:12},recurrence:"dp[k] = dp[k-1] + dp[k-2]",axes:t=>({rowHeaders:["fib(k)"],colHeaders:Array.from({length:t.n+1},(e,n)=>String(n)),rowTitle:"",colTitle:"k"}),dims:t=>({rows:1,cols:t.n+1,fillable:t.n+1}),validate:t=>Number.isInteger(t.n)&&t.n>=0&&t.n<=40?null:"n must be a whole number from 0 to 40.",depsOf:tm,generator:nm,naiveCalls:t=>Xh(t.n)};function Qa(t,e,n){if(e===0)return[];const s=[];for(const o of t.coins){if(o>e)continue;const a=We(n,0,e-o,`coin ${o}`),r=a.value??qn,i=r===qn?qn:r+1;s.push({deps:[a],score:i,text:`1+${Je(e-o)}=${Wn(i)}`})}return s}function om(t,e,n,s){return Qa(t,n,s).flatMap(o=>o.deps)}function*am(t){const{amount:e}=t,n=jn(1,e+1);xt(n,0,0,0),yield Ce(n,{row:0,col:0},[],null,mn(Je(0),0,"zero coins make 0"),0);for(let l=1;l<=e;l++){const u=Qa(t,l,n.table),c=u.flatMap(y=>y.deps),d=kt(u,"min"),p=d===null?qn:d.score;xt(n,0,l,p);const m={row:0,col:l},b=d!==null&&p!==qn?Xn(d.deps[0]):null,g=u.length===0?mn(Je(l),p,"no coin is small enough"):Lt(Je(l),ys("min",u),p);yield Ce(n,m,c,b,g,2)}const s=[];let o=e;const a=n.table[0][e]!==qn;if(a){Ot(n,{row:0,col:o});const l=`start at ${Je(o)} = ${Wn(n.table[0][o])}`;for(yield Ce(n,null,[],null,l,3);o>0;){const u=kt(Qa(t,o,n.table),"min");if(u===null)break;const c=u.deps[0].col,d=o-c;s.push(d),o=c,Ot(n,{row:0,col:o});const p=`take coin ${d} — ${Je(o+d)} came from ${Je(o)}`;yield Ce(n,null,[],null,p,3)}}const r=n.table[0][e],i=a?`${s.join(" + ")} = ${e}  (${s.length} coin${s.length===1?"":"s"})`:`no combination of {${t.coins.join(", ")}} makes ${e}`;yield In(n,i,`${Je(e)} = ${Wn(r)}`,4)}const rm={kind:"coins",defaults:{kind:"coins",coins:[1,3,4],amount:11},recurrence:"dp[a] = 1 + min(dp[a - c]) over coins c <= a",axes:t=>({rowHeaders:["min coins"],colHeaders:Array.from({length:t.amount+1},(e,n)=>String(n)),rowTitle:"",colTitle:"amount"}),dims:t=>({rows:1,cols:t.amount+1,fillable:t.amount+1}),validate:t=>t.coins.length===0?"Enter at least one coin.":t.coins.some(e=>!Number.isInteger(e)||e<1)?"Coin values must be whole numbers of at least 1.":new Set(t.coins).size!==t.coins.length?"Coin values must be distinct.":!Number.isInteger(t.amount)||t.amount<0?"Amount must be 0 or more.":null,depsOf:om,generator:am,naiveCalls:t=>Yh(t.coins,t.amount)};function Za(t,e,n){const s=t.values,o=[];for(let a=0;a<e;a++){if(s[a]>=s[e])continue;const r=We(n,0,a,`a[${a}]=${s[a]}`);o.push({deps:[r],score:(r.value??0)+1,text:`${Je(a)}=${r.value??0}`})}return o}function im(t,e,n,s){return Za(t,n,s).flatMap(o=>o.deps)}function*lm(t){const e=t.values,n=e.length,s=jn(1,n);for(let c=0;c<n;c++){const d=Za(t,c,s.table),p=d.flatMap(y=>y.deps),m=kt(d,"max"),b=m===null?1:m.score;xt(s,0,c,b);const g={row:0,col:c};if(m===null){const y=mn(Je(c),1,`nothing to the left is smaller than ${e[c]}`);yield Ce(s,g,p,null,y,0)}else{const y=`1 + ${ys("max",d)}`,v=Lt(Je(c),y,b);yield Ce(s,g,p,Xn(m.deps[0]),v,2)}}let o=-1;for(let c=0;c<n;c++)(o===-1||(s.table[0][c]??0)>(s.table[0][o]??0))&&(o=c);const a=[];let r=o;for(;r>=0;){a.push(r),Ot(s,{row:0,col:r});const c=`a[${r}]=${e[r]} is in the subsequence (${Je(r)}=${s.table[0][r]})`;yield Ce(s,null,[],null,c,3);const d=kt(Za(t,r,s.table),"max");r=d===null?-1:d.deps[0].col}a.reverse();const i=o===-1?0:s.table[0][o]??0,l=a.map(c=>e[c]).join(", "),u=o===-1?"the sequence is empty":`[${l}]  (length ${i})`;yield In(s,u,`longest increasing subsequence has length ${i}`,4)}const um={kind:"sequence",defaults:{kind:"sequence",values:[3,10,2,1,20,4,6,21,5]},recurrence:"dp[i] = 1 + max(dp[j]) over j < i with a[j] < a[i]",axes:t=>({rowHeaders:["LIS ending here"],colHeaders:t.values.map(String),rowTitle:"",colTitle:"a[i]"}),dims:t=>({rows:1,cols:t.values.length,fillable:t.values.length}),validate:t=>t.values.length===0?"Enter at least one number.":t.values.length>40?"Enter at most 40 numbers.":null,depsOf:im,generator:lm,naiveCalls:t=>Jh(t.values)};function er(t,e,n,s){if(e===0)return[];const o=t.items[e-1],a=We(s,e-1,n,"skip"),r=[{deps:[a],score:a.value??0,text:`${we(e-1,n)}=${a.value??0}`}];if(o.weight<=n){const i=We(s,e-1,n-o.weight,"take"),l=(i.value??0)+o.value,u=we(e-1,n-o.weight);r.push({deps:[i],score:l,text:`${o.value}+${u}=${l}`})}return r}function cm(t,e,n,s){return er(t,e,n,s).flatMap(o=>o.deps)}function*dm(t){const{items:e,capacity:n}=t,s=e.length+1,o=jn(s,n+1);for(let p=0;p<=n;p++){xt(o,0,p,0);const m={row:0,col:p},b=mn(we(0,p),0,"no items to choose from");yield Ce(o,m,[],null,b,0)}for(let p=1;p<s;p++)for(let m=0;m<=n;m++){const b=er(t,p,m,o.table),g=b.flatMap(R=>R.deps),y=kt(b,"max"),v=y===null?0:y.score;xt(o,p,m,v);const x={row:p,col:m},S=y===null?null:Xn(y.deps[0]),$=Lt(we(p,m),ys("max",b),v);yield Ce(o,x,g,S,$,4)}const a=[];let r=s-1,i=n;for(Ot(o,{row:r,col:i}),yield Ce(o,null,[],null,`start at ${we(r,i)} = ${o.table[r][i]}`,5);r>0;){const p=kt(er(t,r,i,o.table),"max");if(p===null)break;const m=p.deps[0],b=m.label==="take";b&&a.push(r);const g=e[r-1],y=b?`take item #${r} (w=${g.weight}, v=${g.value}) — drop to ${we(m.row,m.col)}`:`skip item #${r} — ${we(r,i)} equals ${we(m.row,m.col)}`;r=m.row,i=m.col,Ot(o,{row:r,col:i}),yield Ce(o,null,[],null,y,5)}a.reverse();const l=a.reduce((p,m)=>p+e[m-1].weight,0),u=o.table[s-1][n]??0,c=a.map(p=>`#${p}`).join(", "),d=a.length?`take {${c}} — weight ${l}/${n}, value ${u}`:`take nothing — no item fits in ${n}`;yield In(o,d,`${we(s-1,n)} = ${u}`,6)}const pm={kind:"items",defaults:{kind:"items",items:[{weight:2,value:3},{weight:3,value:4},{weight:4,value:5},{weight:5,value:8}],capacity:9},recurrence:"dp[i][c] = max(dp[i-1][c], v_i + dp[i-1][c - w_i])",axes:t=>({rowHeaders:["—",...t.items.map((e,n)=>`#${n+1} w${e.weight} v${e.value}`)],colHeaders:Array.from({length:t.capacity+1},(e,n)=>String(n)),rowTitle:"items",colTitle:"capacity"}),dims:t=>{const e=t.items.length+1,n=t.capacity+1;return{rows:e,cols:n,fillable:e*n}},validate:t=>Zu(t,"capacity"),depsOf:cm,generator:dm,naiveCalls:t=>Ju(t.items.map(e=>e.weight),t.capacity)};function Zu(t,e){return t.items.length===0?"Enter at least one item.":t.items.some(n=>!Number.isInteger(n.weight)||n.weight<1)?"Item weights must be whole numbers of at least 1.":t.items.some(n=>!Number.isInteger(n.value)||n.value<0)?"Item values must be whole numbers of 0 or more.":!Number.isInteger(t.capacity)||t.capacity<0?`The ${e} must be 0 or more.`:null}function tr(t,e,n,s){if(e===0)return[];const o=t.items[e-1],a=We(s,e-1,n,"skip"),r=[{deps:[a],score:a.value??0,text:`${we(e-1,n)}=${a.value??0}`}];if(o.weight<=n){const i=We(s,e-1,n-o.weight,"take"),l=i.value??0;r.push({deps:[i],score:l,text:`${we(e-1,n-o.weight)}=${l}`})}return r}function fm(t,e,n,s){return tr(t,e,n,s).flatMap(o=>o.deps)}function*hm(t){const{items:e,capacity:n}=t,s=e.length+1,o=jn(s,n+1);for(let d=0;d<=n;d++){const p=d===0?1:0;xt(o,0,d,p);const m={row:0,col:d},b=mn(we(0,d),p,d===0?"the empty set sums to 0":"no items yet");yield Ce(o,m,[],null,b,0)}for(let d=1;d<s;d++)for(let p=0;p<=n;p++){const m=tr(t,d,p,o.table),b=m.flatMap(R=>R.deps),g=kt(m,"max"),y=g===null?0:g.score;xt(o,d,p,y);const v={row:d,col:p},x=y===1&&g!==null?Xn(g.deps[0]):null,S=m.map(R=>R.text).join(" or "),$=Lt(we(d,p),S,y);yield Ce(o,v,b,x,$,4)}const a=o.table[s-1][n]===1,r=[];let i=s-1,l=n;if(a)for(Ot(o,{row:i,col:l}),yield Ce(o,null,[],null,`start at ${we(i,l)} = 1`,5);i>0;){const d=kt(tr(t,i,l,o.table),"max");if(d===null||d.score!==1)break;const p=d.deps[0],m=p.label==="take";m&&r.push(i);const b=e[i-1],g=m?`take item #${i} (w=${b.weight}) — drop to ${we(p.row,p.col)}`:`skip item #${i} — ${we(p.row,p.col)} is already 1`;i=p.row,l=p.col,Ot(o,{row:i,col:l}),yield Ce(o,null,[],null,g,5)}r.reverse();const u=r.map(d=>e[d-1].weight),c=a?`{${u.join(", ")}} sums to ${n}`:`no subset of {${e.map(d=>d.weight).join(", ")}} sums to ${n}`;yield In(o,c,`${we(s-1,n)} = ${a?1:0}`,6)}const mm={kind:"items",defaults:{kind:"items",items:[{weight:3,value:0},{weight:34,value:0},{weight:4,value:0},{weight:12,value:0},{weight:5,value:0},{weight:2,value:0}],capacity:9},recurrence:"dp[i][t] = dp[i-1][t] OR dp[i-1][t - w_i]",axes:t=>({rowHeaders:["—",...t.items.map((e,n)=>`#${n+1} w${e.weight}`)],colHeaders:Array.from({length:t.capacity+1},(e,n)=>String(n)),rowTitle:"items",colTitle:"target"}),dims:t=>{const e=t.items.length+1,n=t.capacity+1;return{rows:e,cols:n,fillable:e*n}},validate:t=>Zu(t,"target"),depsOf:fm,generator:hm,naiveCalls:t=>Ju(t.items.map(e=>e.weight),t.capacity)};function nr(t,e,n,s){if(e===0||n===0)return[];if(t.a[e-1]===t.b[n-1]){const r=We(s,e-1,n-1,"match"),i=(r.value??0)+1;return[{deps:[r],score:i,text:`1+${we(e-1,n-1)}=${i}`}]}const o=We(s,e-1,n,"drop from a"),a=We(s,e,n-1,"drop from b");return[{deps:[o],score:o.value??0,text:`${we(e-1,n)}=${o.value??0}`},{deps:[a],score:a.value??0,text:`${we(e,n-1)}=${a.value??0}`}]}function gm(t,e,n,s){return nr(t,e,n,s).flatMap(o=>o.deps)}function*vm(t){const{a:e,b:n}=t,s=e.length+1,o=n.length+1,a=jn(s,o);for(let p=0;p<s;p++)for(let m=0;m<o;m++){if(p===0||m===0){xt(a,p,m,0);const $={row:p,col:m},R=mn(we(p,m),0,"one side is empty");yield Ce(a,$,[],null,R,0);continue}const b=nr(t,p,m,a.table),g=b.flatMap($=>$.deps),y=kt(b,"max"),v=y===null?0:y.score;xt(a,p,m,v);const x={row:p,col:m},S=y===null?null:Xn(y.deps[0]);if(e[p-1]===n[m-1]){const $=Lt(we(p,m),b[0].text,v);yield Ce(a,x,g,S,$,2)}else{const $=Lt(we(p,m),ys("max",b),v);yield Ce(a,x,g,S,$,3)}}const r=[];let i=s-1,l=o-1;for(Ot(a,{row:i,col:l}),yield Ce(a,null,[],null,`start at ${we(i,l)} = ${a.table[i][l]}`,4);i>0&&l>0;){const p=kt(nr(t,i,l,a.table),"max");if(p===null)break;const m=p.deps[0],b=m.label==="match";b&&r.push(e[i-1]);const g=b?`'${e[i-1]}' matches — take it and step diagonally to ${we(m.row,m.col)}`:`${m.label} — ${we(i,l)} inherits ${we(m.row,m.col)}`;i=m.row,l=m.col,Ot(a,{row:i,col:l}),yield Ce(a,null,[],null,g,4)}r.reverse();const u=a.table[s-1][o-1]??0,c=r.join(""),d=u===0?"no common subsequence":`"${c}"  (length ${u})`;yield In(a,d,`${we(s-1,o-1)} = ${u}`,5)}function ec(t){return t.a.length===0||t.b.length===0?"Both strings need at least one character.":t.a.length>28||t.b.length>28?"Each string may be at most 28 characters.":/\s/.test(t.a)||/\s/.test(t.b)?"Whitespace is not allowed.":null}const bm={kind:"strings2",defaults:{kind:"strings2",a:"AGGTAB",b:"GXTXAYB"},recurrence:"dp[i][j] = match ? 1 + dp[i-1][j-1] : max(dp[i-1][j], dp[i][j-1])",axes:t=>({rowHeaders:["ε",...t.a.split("")],colHeaders:["ε",...t.b.split("")],rowTitle:"a",colTitle:"b"}),dims:t=>{const e=t.a.length+1,n=t.b.length+1;return{rows:e,cols:n,fillable:e*n}},validate:ec,depsOf:gm,generator:vm,naiveCalls:t=>Qh(t.a,t.b)};function sr(t,e,n,s){if(e===0&&n===0)return[];if(n===0){const i=We(s,e-1,0,"delete"),l=(i.value??0)+1;return[{deps:[i],score:l,text:`1+${we(e-1,0)}=${l}`}]}if(e===0){const i=We(s,0,n-1,"insert"),l=(i.value??0)+1;return[{deps:[i],score:l,text:`1+${we(0,n-1)}=${l}`}]}if(t.a[e-1]===t.b[n-1]){const i=We(s,e-1,n-1,"match"),l=i.value??0;return[{deps:[i],score:l,text:`${we(e-1,n-1)}=${l}`}]}const o=We(s,e-1,n-1,"substitute"),a=We(s,e-1,n,"delete"),r=We(s,e,n-1,"insert");return[{deps:[o],score:(o.value??0)+1,text:`1+${we(e-1,n-1)}=${(o.value??0)+1}`},{deps:[a],score:(a.value??0)+1,text:`1+${we(e-1,n)}=${(a.value??0)+1}`},{deps:[r],score:(r.value??0)+1,text:`1+${we(e,n-1)}=${(r.value??0)+1}`}]}function ym(t,e,n,s){return sr(t,e,n,s).flatMap(o=>o.deps)}function wm(t,e,n){return t==="match"?`keep '${e}'`:t==="substitute"?`sub '${e}'→'${n}'`:t==="delete"?`del '${e}'`:`ins '${n}'`}function*xm(t){const{a:e,b:n}=t,s=e.length+1,o=n.length+1,a=jn(s,o);for(let p=0;p<s;p++)for(let m=0;m<o;m++){const b=sr(t,p,m,a.table),g=b.flatMap($=>$.deps),y=kt(b,"min"),v=y===null?0:y.score;xt(a,p,m,v);const x={row:p,col:m},S=y===null?null:Xn(y.deps[0]);if(p===0&&m===0){const $=mn(we(0,0),0,"both prefixes are empty");yield Ce(a,x,g,null,$,0)}else if(p===0||m===0){const $=p===0?"insertions":"deletions",R=Lt(we(p,m),`${b[0].text}`,v)+`  (${$} only)`;yield Ce(a,x,g,S,R,0)}else if(e[p-1]===n[m-1]){const $=Lt(we(p,m),b[0].text,v)+`  ('${e[p-1]}' matches)`;yield Ce(a,x,g,S,$,2)}else{const $=Lt(we(p,m),ys("min",b),v);yield Ce(a,x,g,S,$,3)}}const r=[];let i=s-1,l=o-1;for(Ot(a,{row:i,col:l}),yield Ce(a,null,[],null,`start at ${we(i,l)} = ${a.table[i][l]}`,4);i>0||l>0;){const p=kt(sr(t,i,l,a.table),"min");if(p===null)break;const m=p.deps[0],b=i>0?e[i-1]:"",g=l>0?n[l-1]:"",y=wm(m.label,b,g);r.push(y),i=m.row,l=m.col,Ot(a,{row:i,col:l}),yield Ce(a,null,[],null,`${y} — step to ${we(i,l)}`,4)}r.reverse();const u=a.table[s-1][o-1]??0,c=r.filter(p=>!p.startsWith("keep")),d=u===0?"already identical — 0 edits":`${c.join(", ")}  (${u} edits)`;yield In(a,d,`${we(s-1,o-1)} = ${u}`,5)}const km={kind:"strings2",defaults:{kind:"strings2",a:"kitten",b:"sitting"},recurrence:"dp[i][j] = match ? dp[i-1][j-1] : 1 + min(sub, del, ins)",axes:t=>({rowHeaders:["ε",...t.a.split("")],colHeaders:["ε",...t.b.split("")],rowTitle:"a",colTitle:"b"}),dims:t=>{const e=t.a.length+1,n=t.b.length+1;return{rows:e,cols:n,fillable:e*n}},validate:ec,depsOf:ym,generator:xm,naiveCalls:t=>Zh(t.a,t.b)};function jr(t,e,n,s){if(e>=n)return[];const o=t.dims,a=[];for(let r=e;r<n;r++){const i=We(s,e,r,`split at k=${r}`),l=We(s,r+1,n,`split at k=${r}`),u=o[e]*o[r+1]*o[n+1],c=(i.value??0)+(l.value??0)+u;a.push({deps:[i,l],score:c,text:`k=${r}:${c}`})}return a}function Sm(t,e,n,s){return jr(t,e,n,s).flatMap(o=>o.deps)}function*or(t,e,n,s){if(Ot(e,{row:n,col:s}),n===s){const u=`A${n+1}`;return yield Ce(e,null,[],null,`${u} on its own costs nothing`,4),u}const o=kt(jr(t,n,s,e.table),"min");if(o===null)return`A${n+1}..A${s+1}`;const a=o.deps[0].col,r=`split A${n+1}..A${s+1} after A${a+1} — cost ${o.score}`;yield Ce(e,null,[],null,r,4);const i=yield*or(t,e,n,a),l=yield*or(t,e,a+1,s);return`(${i}${l})`}function*$m(t){const n=t.dims.length-1,s=jn(n,n);for(let i=0;i<n;i++){xt(s,i,i,0);const l={row:i,col:i},u=mn(we(i,i),0,`A${i+1} alone needs no multiplication`);yield Ce(s,l,[],null,u,0)}for(let i=2;i<=n;i++)for(let l=0;l+i-1<n;l++){const u=l+i-1,c=jr(t,l,u,s.table),d=c.flatMap(v=>v.deps),p=kt(c,"min"),m=p===null?0:p.score;xt(s,l,u,m);const b={row:l,col:u},g=p===null?null:Xn(p.deps[0]),y=Lt(we(l,u),ys("min",c),m);yield Ce(s,b,d,g,y,2)}const o=yield*or(t,s,0,n-1),a=s.table[0][n-1]??0,r=`${o} — ${a.toLocaleString()} scalar multiplications`;yield In(s,r,`${we(0,n-1)} = ${a}`,5)}const Em={kind:"chain",defaults:{kind:"chain",dims:[40,20,30,10,30]},recurrence:"dp[i][j] = min over k of dp[i][k] + dp[k+1][j] + d[i]*d[k+1]*d[j+1]",axes:t=>{const e=Math.max(0,t.dims.length-1),n=Array.from({length:e},(s,o)=>`A${o+1}`);return{rowHeaders:n,colHeaders:n,rowTitle:"i",colTitle:"j"}},dims:t=>{const e=Math.max(0,t.dims.length-1);return{rows:e,cols:e,fillable:e*(e+1)/2}},validate:t=>t.dims.length<2?"Enter at least two dimensions (one matrix).":t.dims.some(e=>!Number.isInteger(e)||e<1)?"Dimensions must be whole numbers of at least 1.":t.dims.length>31?"Enter at most 31 dimensions (30 matrices).":null,depsOf:Sm,generator:$m,naiveCalls:t=>em(Math.max(0,t.dims.length-1))},Yt={fib:{...sm,name:"Fibonacci",description:"Fills one row left to right, each cell the sum of the two before it. The smallest example of the whole idea: 40 cells replace 331 million recursive calls.",complexity:{time:"O(n)",space:"O(n)"}},"coin-change":{...rm,name:"Coin Change",description:"Fewest coins that make each amount from 0 upwards, each cell taking the best of one more coin on top of a smaller amount. Amounts no combination can reach stay at infinity.",complexity:{time:"O(amount × coins)",space:"O(amount)"}},lis:{...um,name:"Longest Increasing Subsequence",description:"Each cell holds the longest increasing run ending at that element, extending the best smaller element to its left. The answer is the largest cell, not the last one.",complexity:{time:"O(n²)",space:"O(n)"}},knapsack:{...pm,name:"0/1 Knapsack",description:"One row per item, one column per capacity. Each cell chooses between skipping the item and taking it, and the traceback reads those choices straight back out of the table.",complexity:{time:"O(n × capacity)",space:"O(n × capacity)"}},"subset-sum":{...mm,name:"Subset Sum",description:"Knapsack’s table answering a yes/no question instead: can any subset hit the target exactly? Same shape, same traversal, OR in place of max.",complexity:{time:"O(n × target)",space:"O(n × target)"}},lcs:{...bm,name:"Longest Common Subsequence",description:"A grid of two strings. Matching characters extend the diagonal by one; mismatches take the better of dropping a character from either side.",complexity:{time:"O(m × n)",space:"O(m × n)"}},"edit-distance":{...km,name:"Edit Distance",description:"Fewest insert/delete/substitute operations turning one string into the other. Same grid as LCS, but a mismatch forks three ways instead of two.",complexity:{time:"O(m × n)",space:"O(m × n)"}},"matrix-chain":{...Em,name:"Matrix Chain",description:"Where to put the parentheses so a chain of matrix products costs the least. Fills along diagonals rather than row by row, because a cell needs every shorter sub-chain first.",complexity:{time:"O(n³)",space:"O(n²)"}}};class Ir{constructor(e){en(this,"n");en(this,"parents");en(this,"ranks");en(this,"sizes");en(this,"findCount",0);en(this,"unionCount",0);en(this,"compressionCount",0);en(this,"componentCount");this.n=Math.max(0,Math.floor(e)),this.parents=Array.from({length:this.n},(n,s)=>s),this.ranks=new Array(this.n).fill(0),this.sizes=new Array(this.n).fill(1),this.componentCount=this.n}get components(){return this.componentCount}get finds(){return this.findCount}get unions(){return this.unionCount}get compressions(){return this.compressionCount}isRoot(e){return this.parents[e]===e}rankOf(e){return this.ranks[e]}sizeOf(e){return this.sizes[e]}pathTo(e){const n=[e];let s=e;for(;this.parents[s]!==s;)s=this.parents[s],n.push(s);return n}completeFind(e){if(this.findCount+=1,e.length===0)return[];const n=e[e.length-1],s=[];for(const o of e)o!==n&&this.parents[o]!==n&&(this.parents[o]=n,s.push(o));return this.compressionCount+=s.length,s}find(e){const n=this.pathTo(e);return this.completeFind(n),n[n.length-1]}rootOf(e){let n=e;for(;this.parents[n]!==n;)n=this.parents[n];return n}link(e,n){if(e===n)return!1;let s=e,o=n;return this.ranks[s]<this.ranks[o]&&([s,o]=[o,s]),this.parents[o]=s,this.sizes[s]+=this.sizes[o],this.ranks[s]===this.ranks[o]&&(this.ranks[s]+=1),this.unionCount+=1,this.componentCount-=1,!0}union(e,n){return this.link(this.find(e),this.find(n))}connected(e,n){return this.find(e)===this.find(n)}isConnected(e,n){return this.rootOf(e)===this.rootOf(n)}maxDepth(){const e=new Array(this.n).fill(-1);let n=0;for(let s=0;s<this.n;s++){const o=[];let a=s;for(;e[a]===-1&&this.parents[a]!==a;)o.push(a),a=this.parents[a];e[a]===-1&&(e[a]=0);let r=e[a];for(;o.length>0;)r+=1,e[o.pop()]=r;r>n&&(n=r)}return n}snapshot(e=[],n=[]){return{parent:[...this.parents],rank:[...this.ranks],setSize:[...this.sizes],findPath:[...e],compressed:[...n],finds:this.findCount,unions:this.unionCount,compressions:this.compressionCount,maxDepth:this.maxDepth()}}}const Cm=1;function Do(t){return t.weight??Cm}function ar(t,e){const n=Do(t)-Do(e);return n!==0?n:t.id.localeCompare(e.id)}function tc(t){return new Map(t.map((e,n)=>[e.id,n]))}function nc(t){return t.map(e=>e.label)}function Am(t,e,n){return t===n?e:t}const Pe=Object.freeze([]),on=(t,e,n,s,o,a,r)=>({kind:"dsu",forest:t.snapshot(o,a),op:e,active:n,explain:s,done:!1,line:r}),Tm=(t,e,n)=>({kind:"dsu",forest:t.snapshot(),op:null,active:null,explain:e,done:!0,line:n});function sc(t){return{dsu:t,considering:null,acceptedEdges:[],rejectedEdges:[],queue:[],totalWeight:0}}const _t=(t,e,n,s)=>({kind:"mst",forest:t.dsu.snapshot(n),consideringEdge:t.considering,acceptedEdges:[...t.acceptedEdges],rejectedEdges:[...t.rejectedEdges],queue:[...t.queue],totalWeight:t.totalWeight,components:t.dsu.components,explain:e,done:!1,line:s}),rr=(t,e,n)=>({kind:"mst",forest:t.dsu.snapshot(),consideringEdge:null,acceptedEdges:[...t.acceptedEdges],rejectedEdges:[...t.rejectedEdges],queue:[],totalWeight:t.totalWeight,components:t.dsu.components,explain:e,done:!0,line:n});function ir(t,e,n){const s=t.acceptedEdges.length,o=t.dsu.components,a=t.totalWeight;return e===0?`${n} finished: the graph has no nodes.`:o===1?`${n} finished: spanning tree with ${s} edges (V - 1 = ${e-1}), total weight ${a}.`:`${n} finished: the graph is disconnected, so this is a spanning forest — ${o} components, ${s} edges (V - components = ${e} - ${o}), total weight ${a}. No spanning tree exists.`}function oc(t,e,n){return`${t[e]??e} — ${t[n]??n}`}function*Om(t,e){const n=Math.max(0,Math.floor(t)),s=new Ir(n),o=p=>p!==void 0&&p>=0&&p<n,a=e.filter(p=>p.kind==="union"?o(p.a)&&o(p.b):o(p.a)),r=e.length-a.length,i=r>0?` (${r} operation(s) skipped: node out of range)`:"",l=`${n} singleton sets — every node is its own parent, every rank 0${i}.`;yield on(s,null,null,l,Pe,Pe,0);function*u(p,m){const b=s.pathTo(m),g=`find(${m}): walking up from ${m} to its root.`;yield on(s,p,m,g,[m],Pe,1);for(let S=1;S<b.length;S++){const $=b[S],R=b.slice(0,S+1),K=S===b.length-1?`${$} is its own parent — that is the root of ${m}'s set.`:`parent[${b[S-1]}] = ${$}, still not a root — keep walking.`;yield on(s,p,$,K,R,Pe,2)}const y=b[b.length-1],v=s.completeFind(b),x=v.length===0?`Nothing to compress: ${m} already pointed straight at root ${y}.`:`Path compression: ${v.join(", ")} now point straight at root ${y}.`;return yield on(s,p,y,x,b,v,3),y}for(const p of a){if(p.kind==="find"){yield*u(p,p.a);continue}const m=p.a,b=p.b,g=`union(${m}, ${b}): find both roots first.`;yield on(s,p,m,g,Pe,Pe,4);const y=yield*u(p,m),v=yield*u(p,b),x=`Roots are ${y} and ${v}.`;if(yield on(s,p,v,x,Pe,Pe,5),y===v){const N=`${m} and ${b} are already in the same set — union does nothing.`;yield on(s,p,y,N,Pe,Pe,6);continue}const S=s.rankOf(y),$=s.rankOf(v),R=S===$;s.link(y,v);const P=S>=$?y:v,D=`rank[${y}]=${S}, rank[${v}]=${$} — hang ${P===y?v:y} under ${P}.`;if(yield on(s,p,P,D,Pe,Pe,7),R){const N=`Ranks were equal, so rank[${P}] goes up to ${S+1}.`;yield on(s,p,P,N,Pe,Pe,8)}}const d=`Script finished: ${s.components===1?"1 set":`${s.components} sets`} remain, deepest tree is ${s.maxDepth()} level(s).`;yield Tm(s,d,9)}function*_m(t){const e=t.nodes,n=e.length,s=tc(e),o=nc(e),a=new Ir(n),r=sc(a),i=[...t.edges].sort(ar);r.queue=i.map(c=>c.id);const l=`Sorted ${i.length} edges by weight, lightest first.`;yield _t(r,l,Pe,0);const u=`${n} singleton components — no node is connected to any other yet.`;yield _t(r,u,Pe,1);for(let c=0;c<i.length;c++){const d=i[c],p=s.get(d.from),m=s.get(d.to);if(p===void 0||m===void 0)continue;const b=Do(d);r.considering=d.id,r.queue=i.slice(c+1).map(S=>S.id);const g=[...a.pathTo(p),...a.pathTo(m)],y=`Considering ${oc(o,p,m)} (weight ${b}) — same set?`;yield _t(r,y,g,2);const v=a.find(p),x=a.find(m);if(v===x){r.rejectedEdges.push(d.id);const S=`Both ends are in set ${v} already — this edge would close a cycle. Reject.`;yield _t(r,S,g,3)}else{a.link(v,x),r.acceptedEdges.push(d.id),r.totalWeight+=b;const S=`Sets ${v} and ${x} were separate — accept, and merge them. Total ${r.totalWeight}.`;yield _t(r,S,g,4)}if(r.acceptedEdges.length===n-1){r.considering=null,r.queue=[];const S=`${n-1} edges accepted — every node is connected, so the rest cannot help.`;yield _t(r,S,Pe,5);break}}r.considering=null,r.queue=[],yield rr(r,ir(r,n,"Kruskal"),6)}function*Mm(t,e){const n=t.nodes,s=n.length,o=tc(n),a=nc(n),r=new Ir(s),i=sc(r);if(s===0){yield rr(i,ir(i,s,"Prim"),6);return}const l=Array.from({length:s},()=>[]),u=new Map;for(const v of t.edges){const x=o.get(v.from),S=o.get(v.to);x===void 0||S===void 0||x===S||(l[x].push(v),l[S].push(v),u.set(v.id,[x,S]))}const c=new Array(s).fill(!1),d=[];function p(v){c[v]=!0;for(const x of l[v]){const[S,$]=u.get(x.id);c[Am(S,$,v)]||d.push(x)}}function m(){return[...d].sort(ar).map(v=>v.id)}const b=e!==void 0&&o.has(e)?o.get(e):0;p(b),i.queue=m();const g=`Starting from ${a[b]??b}; the tree is that node alone.`;yield _t(i,g,Pe,0);const y=`${d.length} edge(s) leave the tree — these are the candidates.`;for(yield _t(i,y,Pe,1);;){if(d.length===0){const N=c.indexOf(!1);if(N===-1)break;i.considering=null;const j=`No candidate crosses the cut, but ${a[N]??N} is still unreached — that component is done. Restarting there.`;yield _t(i,j,Pe,5),p(N),i.queue=m();continue}let v=0;for(let N=1;N<d.length;N++)ar(d[N],d[v])<0&&(v=N);const x=d[v];d.splice(v,1);const[S,$]=u.get(x.id),R=Do(x);i.considering=x.id,i.queue=m();const P=`Lightest candidate is ${oc(a,S,$)} (weight ${R}).`;yield _t(i,P,Pe,2);const K=c[S]?$:S;if(c[S]&&c[$]){i.rejectedEdges.push(x.id),yield _t(i,"Both ends joined the tree by other routes — it no longer crosses the cut, so taking it would close a cycle. Reject.",Pe,3);continue}r.link(r.find(S),r.find($)),i.acceptedEdges.push(x.id),i.totalWeight+=R,p(K),i.queue=m();const D=`Accept: ${a[K]??K} joins the tree and offers its own edges. Total ${i.totalWeight}.`;yield _t(i,D,Pe,4)}i.considering=null,i.queue=[],yield rr(i,ir(i,s,"Prim"),6)}const aa={dsu:{name:"Union-Find",mode:"dsu",generator:Om,description:"The disjoint-set forest on its own: compose a script of union and find operations and watch the trees merge. Each find walks to its root and then re-hangs the whole walk onto it — path compression — while union always hangs the shallower tree under the deeper, which is what keeps the forest from degenerating into a linked list.",complexity:{time:"O(α(n)) amortized per op",space:"O(n)"}},kruskal:{name:"Kruskal's MST",mode:"mst",generator:_m,description:'Sorts every edge by weight and walks that list once, accepting an edge whenever its endpoints are still in different components and rejecting it when they are not. The "still different?" question is answered by the disjoint set, which is the only reason the greedy rule is affordable.',complexity:{time:"O(E log E)",space:"O(V + E)"}},prim:{name:"Prim's MST",mode:"mst",generator:Mm,description:"Grows a single tree from a root, repeatedly taking the cheapest edge that crosses from the tree to a node outside it. Reaches the same total weight as Kruskal on any connected graph, by a completely different route — one growing tree instead of many merging ones.",complexity:{time:"O(V · E)",space:"O(V + E)"}}},Rm=2654435761;function jm(t){let e=5381;for(let n=0;n<t.length;n++)e=(Math.imul(e,33)^t.charCodeAt(n))>>>0;return e>>>0}function Im(t){let e=0;for(let n=0;n<t.length;n++)e=Math.imul(e,31)+t.charCodeAt(n)|0;return Math.imul(e,Rm)>>>8}function Dm(t){let e=0;for(let n=0;n<t.length;n++)e+=t.charCodeAt(n);return e}function Lm(t){return t.length===0?0:t.charCodeAt(0)}const Kn={djb2:{name:"djb2",description:"Classic string hash — mixes every character, spreads keys evenly.",hash:jm},knuth:{name:"Knuth",description:"Multiplicative hash against 2^32/φ; well-spread, cheap to compute.",hash:Im},mod:{name:"Sum + mod",description:"Adds the character codes. Simple, but every anagram collides.",hash:Dm},weak:{name:"Weak (first char)",description:"First character only. Awful on purpose — collisions on demand.",hash:Lm}},ac="djb2",Ea=4;function ra(t){const e=Math.max(Ea,Math.floor(t)||Ea);let n=Ea;for(;n<e;)n*=2;return n}function Nm(t,e){return(Math.imul(t^t>>>15,739982445)>>>0)%e|1}function Dr(t,e){return t%e}const Pm=.25,Bm=.9,Fm=4096;function rc(t,e){const n=Math.max(Pm,e);return t==="chaining"?n:Math.min(Bm,n)}function Vm(){return{entries:[],state:"empty"}}function ic(t){const e=t.strategy,n=t.hashFnKey,s=ra(t.capacity),o=rc(e,t.threshold),a=Kn[n].hash,r=t.counters??{probes:0,collisions:0,resizes:0},i=t.arrivals??{next:1},l=Array.from({length:s},Vm),u=e==="chaining";let c=0,d=0;function p(z){return Dr(z,s)}function m(z){return e==="double"?Nm(z,s):1}function b(z,ae){switch(e){case"quadratic":return z*(z+1)/2;case"double":return z*ae;case"linear":return z;default:return 0}}function g(z,ae){const L=p(z);return u?{index:L,chainPos:ae}:{index:(L+b(ae,m(z)))%s,chainPos:0}}function y(z){return u?l[z].entries.length+1:s}function v(z){return l[z.index].entries[z.chainPos]??null}function x(z,ae){const L=l[z.index];if(u){const J=L.entries[z.chainPos];return J?J.key===ae?"match":"occupied":"free"}return L.state==="empty"?"free":L.state==="tombstone"?"tombstone":L.entries[0].key===ae?"match":"occupied"}function S(z,ae){const L={key:ae,value:i.next++},J=l[z.index];return u?(J.entries.push(L),J.state="occupied"):(J.state==="tombstone"&&(d-=1),J.entries=[L],J.state="occupied"),c+=1,L}function $(z){const ae=l[z.index].entries[z.chainPos];return ae.value=i.next++,ae}function R(z){const ae=l[z.index];u?(ae.entries.splice(z.chainPos,1),ae.entries.length===0&&(ae.state="empty")):(ae.entries=[],ae.state="tombstone",d+=1),c-=1}function P(){const z=[];for(const ae of l)z.push(...ae.entries);return z}function K(){return l.map(z=>({entries:z.entries.map(ae=>({...ae})),state:z.state}))}function D(){return c+d}function N(){return D()/s>o}function j(){return s*2<=Fm}function me(){return r.resizes+=1,ic({strategy:e,hashFnKey:n,capacity:s*2,threshold:o,counters:r,arrivals:i})}function Se(z){const ae=a(z.key),L=p(ae),J=m(ae),ue=y(L);for(let G=0;G<ue;G++){const ie=u?{index:L,chainPos:l[L].entries.length}:{index:(L+b(G,J))%s};if(r.probes+=1,u||l[ie.index].state==="empty")return l[ie.index].entries=u?[...l[ie.index].entries,z]:[z],l[ie.index].state="occupied",c+=1,{hash:ae,home:L,index:ie.index,probes:G+1}}return{hash:ae,home:L,index:-1,probes:ue}}return{strategy:e,hashFnKey:n,capacity:s,threshold:o,counters:r,size:()=>c,tombstones:()=>d,fill:D,loadFactor:()=>c/s,hash:a,home:p,stride:m,offset:b,cursor:g,maxProbes:y,classify:x,entryAt:v,stateAt:z=>l[z].state,chainLength:z=>l[z].entries.length,place:S,overwrite:$,remove:R,entries:P,snapshot:K,overThreshold:N,canGrow:j,growEmpty:me,insertDirect:Se}}function Ui(){return{op:null,key:null,hash:null,homeIndex:null,probeIndex:null,probeSeq:[],phase:"idle",explain:null}}const dt=(t,e,n)=>({buckets:t.snapshot(),capacity:t.capacity,size:t.size(),loadFactor:t.loadFactor(),op:e.op,key:e.key,hash:e.hash,homeIndex:e.homeIndex,probeIndex:e.probeIndex,probeSeq:[...e.probeSeq],probes:t.counters.probes,collisions:t.counters.collisions,resizes:t.counters.resizes,phase:e.phase,explain:e.explain,done:!1,line:n}),Hm=(t,e,n)=>({...dt(t,e,n),done:!0});function Um(t,e,n,s){return`h("${t}") = ${e} → ${e} mod ${n} = ${s}`}function Hn(t,e){return`${t} ${e}${t===1?"":"s"}`}function Lr(t,e,n,s,o,a){const r=n+1;if(t.strategy==="chaining")return a?`probe ${r}: bucket ${e}, end of chain`:`probe ${r}: bucket ${e}, link ${r}`;if(n===0)return`probe 1: slot ${e} (home)`;const i=t.capacity;if(t.strategy==="double")return`probe ${r}: (${e} + ${n}×${s}) mod ${i} = ${o}`;const l=t.offset(n,s);return t.strategy==="quadratic"?`probe ${r}: (${e} + ${l}) mod ${i} = ${o}  [k(k+1)/2, k=${n}]`:`probe ${r}: (${e} + ${l}) mod ${i} = ${o}`}function*zm(t,e,n,s,o,a){var l;let r=null;const i=t.maxProbes(o);for(let u=0;u<i;u++){const c=t.cursor(s,u),d=t.classify(c,n),p=Lr(t,o,u,a,c.index,d==="free");if(t.counters.probes+=1,e.probeSeq.push(c.index),e.probeIndex=c.index,d==="match"){const g=t.overwrite(c);e.phase="updated",e.explain=`${p} — "${n}" is already here → overwrite (now #${g.value})`,yield dt(t,e,3);break}if(d==="occupied"){t.counters.collisions+=1;const g=((l=t.entryAt(c))==null?void 0:l.key)??"?";e.phase="probing",e.explain=`${p} — taken by "${g}" → collision, keep walking`,yield dt(t,e,5);continue}if(d==="tombstone"){r===null&&(r=c),e.phase="probing",e.explain=`${p} — tombstone; remember it, but keep looking for "${n}"`,yield dt(t,e,2);continue}const m=r??c,b=t.place(m,n);e.probeIndex=m.index,e.phase="inserted",e.explain=qm(t,p,n,b.value,m,r!==null),yield dt(t,e,4);break}return t.overThreshold()&&t.canGrow()?yield*Xm(t,e):t}function qm(t,e,n,s,o,a){if(t.strategy==="chaining"){const r=Hn(t.chainLength(o.index),"link");return`${e} → append "${n}" (#${s}); the chain is now ${r}`}return a?`${e} — free, but slot ${o.index} was a tombstone → reuse it for "${n}"`:`${e} — empty → insert "${n}" (#${s})`}function*Km(t,e,n,s,o,a){var i;const r=t.maxProbes(o);for(let l=0;l<r;l++){const u=t.cursor(s,l),c=t.classify(u,n),d=Lr(t,o,l,a,u.index,c==="free");if(t.counters.probes+=1,e.probeSeq.push(u.index),e.probeIndex=u.index,c==="match"){const p=t.entryAt(u);e.phase="found",e.explain=`${d} — found "${n}" (inserted #${p==null?void 0:p.value})`,yield dt(t,e,8);return}if(c==="free"){e.phase="not-found",e.explain=`${d} — ${lc(t)} → "${n}" is not in the table`,yield dt(t,e,9);return}e.phase="probing",e.explain=c==="tombstone"?`${d} — tombstone; a deleted slot never ends a search → keep walking`:`${d} — holds "${(i=t.entryAt(u))==null?void 0:i.key}", not "${n}" → keep walking`,yield dt(t,e,7)}e.phase="not-found",e.explain=`walked all ${r} probes without finding "${n}"`,yield dt(t,e,9)}function*Gm(t,e,n,s,o,a){const r=t.maxProbes(o);for(let i=0;i<r;i++){const l=t.cursor(s,i),u=t.classify(l,n),c=Lr(t,o,i,a,l.index,u==="free");if(t.counters.probes+=1,e.probeSeq.push(l.index),e.probeIndex=l.index,u==="match"){t.remove(l),e.phase="deleted",e.explain=Wm(t,c,n,l.index),yield dt(t,e,11);return}if(u==="free"){e.phase="not-found",e.explain=`${c} — ${lc(t)} → nothing to delete`,yield dt(t,e,9);return}e.phase="probing",e.explain=`${c} — not "${n}" → keep walking`,yield dt(t,e,10)}e.phase="not-found",e.explain=`walked all ${r} probes without finding "${n}"`,yield dt(t,e,9)}function lc(t){return t.strategy==="chaining"?"chain ends here":"slot is EMPTY"}function Wm(t,e,n,s){if(t.strategy==="chaining"){const o=Hn(t.chainLength(s),"link");return`${e} — unlink "${n}"; bucket ${s}'s chain is now ${o}`}return`${e} — remove "${n}" and leave a TOMBSTONE, so probes still walk past slot ${s}`}function*Xm(t,e){const n=t.entries(),s=t.fill(),o=(s/t.capacity).toFixed(2),a=t.threshold.toFixed(2),r=t.strategy==="chaining"?`load factor ${s}/${t.capacity} = ${o}`:`slots used ${s}/${t.capacity} = ${o} (${t.size()} keys${t.tombstones()>0?` + ${t.tombstones()} tombstones`:""})`;e.phase="resizing",e.probeIndex=null,e.probeSeq=[],e.explain=`${r} > ${a} → grow to ${t.capacity*2} slots and rehash ${Hn(n.length,"key")}`,yield dt(t,e,6);const i=t.growEmpty();for(const l of n){const u=i.insertDirect(l);e.key=l.key,e.hash=u.hash,e.homeIndex=u.home,e.probeIndex=u.index,e.probeSeq=[u.index],e.phase="rehashed",e.explain=`rehash "${l.key}": ${u.hash} mod ${i.capacity} = ${u.home}`+(u.index===u.home?` → slot ${u.index}`:` → slot ${u.home} taken, landed in ${u.index}`),yield dt(i,e,6)}return i}function*Ym(t,e,n){let s=ic({strategy:n,...e});const o=Ui();for(const u of t){const c=s.hash(u.key),d=s.home(c),p=s.stride(c);o.op=u.kind,o.key=u.key,o.hash=c,o.homeIndex=d,o.probeIndex=d,o.probeSeq=[],o.phase="hashing",o.explain=Um(u.key,c,s.capacity,d),yield dt(s,o,1),u.kind==="insert"?s=yield*zm(s,o,u.key,c,d,p):u.kind==="search"?yield*Km(s,o,u.key,c,d,p):yield*Gm(s,o,u.key,c,d,p)}const{probes:a,collisions:r,resizes:i}=s.counters,l=Ui();l.explain=`script complete — ${Hn(t.length,"operation")}, ${Hn(a,"probe")}, ${Hn(r,"collision")}, ${Hn(i,"resize")}`,yield Hm(s,l,12)}function ro(t){return(e,n)=>Ym(e,n,t)}const ia={chaining:{name:"Separate Chaining",generator:ro("chaining"),description:"Every bucket holds a list. Colliding keys are appended to the list at their home bucket, so a lookup hashes once and then walks a chain whose length is the load factor on average.",complexity:{best:"O(1)",average:"O(1 + α)",worst:"O(n)",space:"O(n + m)"}},linear:{name:"Linear Probing",generator:ro("linear"),description:"On a collision, try the very next slot, and the next. Cache-friendly and trivial to implement, but colliding keys pile into contiguous runs — primary clustering — and each run makes itself more likely to grow.",complexity:{best:"O(1)",average:"O(1 / (1 - α))",worst:"O(n)",space:"O(m)"}},quadratic:{name:"Quadratic Probing",generator:ro("quadratic"),description:"Jump k(k+1)/2 slots away on the k-th probe, so colliding keys scatter instead of forming runs. Two keys sharing a home slot still share the entire jump sequence, which is secondary clustering.",complexity:{best:"O(1)",average:"O(1 / (1 - α))",worst:"O(n)",space:"O(m)"}},double:{name:"Double Hashing",generator:ro("double"),description:"A second hash of the key decides the stride, so two keys that collide at their home slot almost never collide again. The closest of the three to the uniform-hashing ideal, at the cost of a second hash per key.",complexity:{best:"O(1)",average:"O(1 / (1 - α))",worst:"O(n)",space:"O(m)"}}},uc="chaining",Jm={key:"racy-counter",name:"Racy counter",description:"Two threads each run counter = counter + 1, one machine step at a time.",bug:"If both threads read before either writes, both compute the same value and one increment is lost.",threads:[{name:"T0",instructions:[{label:"local = counter",exec:(t,e)=>{t.threads[e].locals.local=t.shared.counter}},{label:"local = local + 1",exec:(t,e)=>{t.threads[e].locals.local+=1}},{label:"counter = local",exec:(t,e)=>{t.shared.counter=t.threads[e].locals.local}}]},{name:"T1",instructions:[{label:"local = counter",exec:(t,e)=>{t.threads[e].locals.local=t.shared.counter}},{label:"local = local + 1",exec:(t,e)=>{t.threads[e].locals.local+=1}},{label:"counter = local",exec:(t,e)=>{t.shared.counter=t.threads[e].locals.local}}]}],invariant:{label:"counter === 2 once both threads finish",holds:(t,e)=>!e||t.shared.counter===2},createState:()=>({shared:{counter:0},locks:{},threads:[{id:0,pc:0,status:"ready",locals:{local:0}},{id:1,pc:0,status:"ready",locals:{local:0}}]})},Qm={key:"mutex-violation",name:"Mutex violation",description:"Two threads guard a critical section with a check-then-acquire lock.",bug:"Checking the lock and taking it are separate steps, so both threads can see it free and both enter.",threads:[0,1].map((t,e)=>({name:`T${e}`,instructions:[{label:"saw = (lock == free)",exec:(n,s)=>{n.threads[s].locals.saw=n.locks.L===null?1:0}},{label:"if saw: take lock",exec:(n,s)=>{n.threads[s].locals.saw===1&&(n.locks.L=s,n.threads[s].status="critical")}},{label:"critical section",exec:(n,s)=>{n.shared.entered+=1}},{label:"release lock",exec:(n,s)=>{n.threads[s].status==="critical"&&(n.threads[s].status="ready",n.locks.L===s&&(n.locks.L=null))}}]})),invariant:{label:"at most one thread in the critical section",holds:t=>t.threads.filter(e=>e.status==="critical").length<=1},createState:()=>({shared:{entered:0},locks:{L:null},threads:[{id:0,pc:0,status:"ready",locals:{saw:0}},{id:1,pc:0,status:"ready",locals:{saw:0}}]})},Gs={"racy-counter":Jm,"mutex-violation":Qm},cc="racy-counter",dc="algoviz-last-visited";function Zm(){try{return localStorage.getItem(dc)||null}catch{return null}}const zi=B(Zm());function eg(t){try{localStorage.setItem(dc,t)}catch{}}function pc(){function t(n){zi.value=n,eg(n)}function e(n,s){n.afterEach(o=>{const a=typeof o.name=="string"?o.name:null;a&&s(a)&&t(a)})}return{lastVisited:zi,record:t,trackLastVisited:e}}const tg={class:"space-y-12"},ng={class:"max-w-3xl"},sg={class:"mt-7 flex flex-wrap gap-x-8 gap-y-3"},og={class:"nums font-mono text-xl font-semibold text-ink"},ag={class:"nums font-mono text-xl font-semibold text-ink"},rg={key:0},ig={class:"mt-1 block font-semibold text-ink"},lg={class:"grid gap-3 sm:grid-cols-2 lg:grid-cols-3"},ug={class:"flex items-baseline justify-between gap-2"},cg={class:"font-display font-bold text-ink"},dg={key:0,class:"nums shrink-0 font-mono text-2xs text-ink-faint"},pg={class:"mt-2 text-sm text-ink-muted"},fg=Z({__name:"LandingView",setup(t){const{lastVisited:e}=pc(),n=E(()=>e.value?On.find(o=>o.name===e.value):void 0),s=E(()=>On.reduce((o,a)=>{var r;return o+(((r=a.meta)==null?void 0:r.count)??0)},0));return(o,a)=>(w(),C("div",tg,[h("section",ng,[a[3]||(a[3]=h("p",{class:"text-2xs font-semibold uppercase text-accent"},"Algorithm Visualizer",-1)),a[4]||(a[4]=h("h2",{class:"mt-3 font-display text-d-1 font-extrabold text-ink sm:text-d-2"}," See how algorithms actually run. ",-1)),a[5]||(a[5]=h("p",{class:"mt-4 max-w-2xl text-base text-ink-muted"}," Every algorithm here is a generator that yields a snapshot after each meaningful step. Nothing is pre-rendered or faked — play, pause and scrub through the real sequence of comparisons, swaps and visits, one step at a time. ",-1)),h("dl",sg,[h("div",null,[a[0]||(a[0]=h("dt",{class:"text-2xs uppercase text-ink-faint"},"Categories",-1)),h("dd",og,M(f(On).length),1)]),h("div",null,[a[1]||(a[1]=h("dt",{class:"text-2xs uppercase text-ink-faint"},"Algorithms",-1)),h("dd",ag,M(s.value),1)]),a[2]||(a[2]=h("div",null,[h("dt",{class:"text-2xs uppercase text-ink-faint"},"Themes"),h("dd",{class:"nums font-mono text-xl font-semibold text-ink"},"8")],-1))])]),n.value?(w(),C("section",rg,[T(f(Ks),{to:n.value.path,class:"group flex items-center justify-between gap-4 rounded-xl border border-accent/40 bg-accent-soft px-5 py-4 transition-colors hover:border-accent"},{default:I(()=>{var r;return[h("span",null,[a[6]||(a[6]=h("span",{class:"block text-2xs font-semibold uppercase text-accent"}," Continue where you left off ",-1)),h("span",ig,M((r=n.value.meta)==null?void 0:r.label),1)]),a[7]||(a[7]=h("span",{"aria-hidden":"true",class:"text-xl text-accent transition-transform group-hover:translate-x-1"},"→",-1))]}),_:1},8,["to"])])):re("",!0),h("section",null,[a[8]||(a[8]=h("h3",{class:"mb-4 text-2xs font-semibold uppercase text-ink-faint"},"Categories",-1)),h("ul",lg,[(w(!0),C(ee,null,ce(f(On),r=>(w(),C("li",{key:r.path},[T(f(Ks),{to:r.path,class:"flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent/50 hover:bg-surface-alt"},{default:I(()=>{var i,l,u;return[h("span",ug,[h("span",cg,M((i=r.meta)==null?void 0:i.label),1),(l=r.meta)!=null&&l.count?(w(),C("span",dg,M(r.meta.count),1)):re("",!0)]),h("span",pg,M((u=r.meta)==null?void 0:u.pitch),1)]}),_:2},1032,["to"])]))),128))])])]))}}),hg=/^\s*yield\s+(?:snap|done)\(.*?,\s*(\d+)\s*\)\s*;?\s*$/;function mg(t){const e=new Map;return t.split(`
`).forEach((n,s)=>{const o=hg.exec(n);if(!o)return;const a=Number(o[1]);e.set(a,[...e.get(a)??[],s])}),e}function la(t){const e=new Map;return n=>{let s=e.get(n);return s||(s=mg(t[n].text),e.set(n,s)),s}}const gg=`import type { SortStep } from '@/types';
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
`,vg=`import type { SortStep } from '@/types';
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
`,bg=`import type { SortStep } from '@/types';
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
`,yg=`import type { SortStep } from '@/types';
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
`,wg=`import type { SortStep } from '@/types';
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
`,xg=`import type { SortStep } from '@/types';
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
`,kg=`import type { SortStep } from '@/types';
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
`,Sg=`import type { SortStep } from '@/types';
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
`,$g=`import type { SortStep } from '@/types';
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
`,Eg=`import type { SortStep } from '@/types';
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
`,fc={bubble:{file:"bubbleSort.ts",text:gg},selection:{file:"selectionSort.ts",text:vg},insertion:{file:"insertionSort.ts",text:bg},merge:{file:"mergeSort.ts",text:yg},quick:{file:"quickSort.ts",text:wg},heap:{file:"heapSort.ts",text:xg},shell:{file:"shellSort.ts",text:kg},comb:{file:"combSort.ts",text:Sg},counting:{file:"countingSort.ts",text:$g},radix:{file:"radixSort.ts",text:Eg}},Cg=la(fc),Ag={compare:{wave:"sine",freq:330,durationMs:18,gain:.25},swap:{wave:"triangle",freq:660,durationMs:28,gain:.4},hit:{wave:"triangle",freq:495,durationMs:26,gain:.35},miss:{wave:"sine",freq:220,durationMs:22,gain:.22}},Qt=Object.freeze([]),io=t=>t.comparing.length>0?["compare"]:t.swapping.length>0?["swap"]:Qt,lo={bubble:io,insertion:io,quick:io,merge:io};function rt(t){let e=t>>>0;function n(){e=e+1831565813|0;let a=e;return a=Math.imul(a^a>>>15,a|1),a^=a+Math.imul(a^a>>>7,a|61),((a^a>>>14)>>>0)/4294967296}function s(a,r){return r<a?a:a+Math.floor(n()*(r-a+1))}function o(a){if(a.length!==0)return a[s(0,a.length-1)]}return{next:n,int:s,pick:o}}function ze(){return Math.floor(Math.random()*4294967296)>>>0}function Tg(t){if(t==null)return null;const e=t.trim();if(e==="")return null;const n=Number(e);return!Number.isFinite(n)||!Number.isInteger(n)?null:n>>>0}function Nr(t){return E(()=>Math.max(4,Math.round(204-t.value*2)))}const Og=5e4,_g=2e3;function bn(t){const e=t.maxSteps??Og,n=B("idle"),s=B(-1),o=B(0),a=B(!1),r=B(!1),i=B(0);let l=[],u=null,c=null,d=0,p=null;const m=Nr(t.speed),b=E(()=>n.value==="running"),g=E(()=>n.value==="paused"),y=E(()=>n.value==="done"),v=E(()=>n.value==="idle"||n.value==="done"),x=E(()=>s.value+1),S=E(()=>s.value>=0?l[s.value]:null),$=E(()=>s.value>=0),R=E(()=>n.value==="idle"||s.value<o.value-1||!a.value);function P(){c!==null&&(clearTimeout(c),c=null)}function K(){p=Date.now()}function D(){p!==null&&(d+=Date.now()-p,p=null),i.value=d}function N(){i.value=d+(p===null?0:Date.now()-p)}function j(){if(!u)return null;if(l.length>=e)return r.value=!0,a.value=!0,u=null,null;const{value:X,done:ge}=u.next();return ge||!X?(a.value=!0,u=null,null):(l.push(X),o.value=l.length,X.done&&(a.value=!0,u=null),X)}function me(X){if(s.value=X,X<0){t.clearStep();return}t.applyStep(l[X],X)}function Se(){return P(),l=[],o.value=0,s.value=-1,a.value=!1,r.value=!1,d=0,p=null,i.value=0,u=t.createGenerator(),u!==null}function z(){P(),D(),n.value="done"}function ae(){var ge;if(n.value!=="running")return;let X;if(s.value<l.length-1)X=l[s.value+1],me(s.value+1);else{if(X=j(),X===null){z();return}me(l.length-1)}if((ge=t.onAdvance)==null||ge.call(t,X,s.value),N(),X.done){z();return}c=setTimeout(ae,m.value)}function L(){if(n.value!=="running"){if(n.value==="paused"){n.value="running",K(),ae();return}Se()&&(n.value="running",K(),ae())}}function J(){n.value==="running"&&(P(),D(),n.value="paused")}function ue(){P(),u=null,l=[],o.value=0,s.value=-1,a.value=!1,r.value=!1,d=0,p=null,i.value=0,t.clearStep(),n.value="idle"}function G(X){n.value==="running"&&J();let ge=Math.max(-1,X),Te=0;for(;ge>=l.length&&u!==null&&Te<_g&&j()!==null;)Te+=1;ge=Math.min(ge,l.length-1),me(ge),ge>=0&&l[ge].done?n.value="done":ge<0&&l.length===0?n.value="idle":n.value="paused"}function ie(){var ge;if(n.value==="idle"&&!Se())return;const X=s.value;G(s.value+1),s.value>X&&((ge=t.onAdvance)==null||ge.call(t,l[s.value],s.value))}function $e(){G(s.value-1)}function nt(){if(!(n.value==="idle"&&!Se())){for(n.value==="running"&&J();u!==null&&j()!==null;);me(l.length-1),D(),n.value=l.length>0?"done":"idle"}}return Ko(P),{status:n,isRunning:b,isPaused:g,isDone:y,canEdit:v,delayMs:m,elapsedMs:i,cursor:s,stepCount:x,bufferedCount:o,fullyBuffered:a,truncated:r,current:S,canStepBack:$,canStepForward:R,run:L,pause:J,reset:ue,stepForward:ie,stepBack:$e,seek:G,skipToEnd:nt}}const Mg=45,Rg=.0015,qi=1e-4,jg=.5;function Ig(){try{const t=window,e=window.AudioContext??t.webkitAudioContext;return e?new e:null}catch{return null}}function Ki(t){Promise.resolve(t).catch(()=>{})}function Dg(t={}){const e=t.createContext??Ig,n=t.minIntervalMs??Mg,s=t.now??(()=>performance.now());let o=null,a=null,r=!1,i=1,l={};const u=()=>jg*i*i;function c(){if(o)return!0;if(r)return!1;let g=null;try{g=e()}catch{g=null}return g?(o=g,a=o.createGain(),a.gain.value=u(),a.connect(o.destination),!0):(r=!0,!1)}function d(g){i=Math.min(1,Math.max(0,g)),a&&(a.gain.value=u())}function p(){!c()||!o||o.state==="suspended"&&Ki(o.resume())}function m(g,y){const v=s(),x=l[y];if(x!==void 0&&v-x<n||!c()||!o||!a)return!1;try{const S=o.currentTime,$=S+g.durationMs/1e3,R=o.createOscillator(),P=o.createGain();R.type=g.wave,R.frequency.value=g.freq,P.gain.setValueAtTime(qi,S),P.gain.linearRampToValueAtTime(g.gain,Math.min(S+Rg,$)),P.gain.exponentialRampToValueAtTime(qi,$),R.connect(P),P.connect(a),R.onended=()=>{R.disconnect(),P.disconnect()},R.start(S),R.stop($+.01)}catch{return!1}return l[y]=v,!0}function b(){const g=o;o=null,a=null,l={},g&&Ki(g.close())}return{get available(){return!r},setVolume:d,unlock:p,play:m,dispose:b}}const hc="algoviz-audio-enabled",mc="algoviz-audio-volume",Ca=.4;function Lg(){try{return localStorage.getItem(hc)==="1"}catch{return!1}}function Ng(){try{const t=localStorage.getItem(mc);if(t===null||t==="")return Ca;const e=Number(t);return Number.isFinite(e)&&e>=0&&e<=1?e:Ca}catch{return Ca}}const es=B(Lg()),Ns=B(Ng());let ns=null;function Gi(){try{localStorage.setItem(hc,es.value?"1":"0"),localStorage.setItem(mc,String(Ns.value))}catch{}}function Wi(){const t=ns??Dg();return ns=t,t.setVolume(Ns.value),t.unlock(),t}function eo(){function t(){es.value=!es.value,Gi(),es.value&&Wi()}function e(s){Ns.value=Math.min(1,Math.max(0,s)),Gi(),ns==null||ns.setVolume(Ns.value)}function n(s){if(!es.value||s.length===0||document.hidden)return;const o=ns??Wi();for(const a of s)o.play(Ag[a],a)}return{enabled:es,volume:Ns,toggle:t,setVolume:e,play:n}}function Pg(t,e){const n=t[e],s=Array.isArray(n)?n[0]:n;return typeof s=="string"?s:void 0}function Zt(t){const e=Rr(),n=Object.keys(t),s=new Set,o=e.currentRoute.value.query;for(const l of n){const u=Pg(o,l);if(u===void 0)continue;const c=t[l].decode(u);c!==void 0&&(t[l].ref.value=c,s.add(l))}let a=null;function r(){const l=e.currentRoute.value.query,u={...l};for(const d of n){const p=t[d].encode(t[d].ref.value);p===null?delete u[d]:u[d]=p}(n.some(d=>u[d]!==l[d])||Object.keys(u).length!==Object.keys(l).length)&&e.replace({query:u}).catch(()=>{})}const i=Math.max(0,...n.map(l=>t[l].debounceMs??0));return Re(n.map(l=>t[l].ref),()=>{if(i===0){r();return}a!==null&&clearTimeout(a),a=setTimeout(r,i)},{flush:"post"}),Ko(()=>{a!==null&&clearTimeout(a)}),{hydrated:s}}const Bg=1,Fg=999,Vg=200;function Fn(t,e){const n=(e==null?void 0:e.min)??Bg,s=(e==null?void 0:e.max)??Fg,o=(e==null?void 0:e.maxLength)??Vg,a=t.trim().split(/[\s,]+/).filter(Boolean);if(a.length===0)return{values:[],error:"Enter at least one number."};if(a.length>o)return{values:[],error:`Enter at most ${o} numbers.`};const r=[];for(const i of a){const l=Number(i);if(!Number.isFinite(l)||!Number.isInteger(l))return{values:[],error:`"${i}" is not a whole number.`};r.push(Math.min(s,Math.max(n,l)))}return{values:r,error:null}}function et(t,e,n){if(t.trim()==="")return;const s=Number(t);if(!(!Number.isFinite(s)||!Number.isInteger(s)))return Math.min(n,Math.max(e,s))}function Ht(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return e}function Xi(t){return`${t.row},${t.col}`}function Yi(t,e,n){const s=t.split(",");if(s.length!==2)return;const[o,a]=s;if(o.trim()===""||a.trim()==="")return;const r=Number(o),i=Number(a);if(!(!Number.isFinite(r)||!Number.isInteger(r))&&!(!Number.isFinite(i)||!Number.isInteger(i))&&!(r<0||r>=e||i<0||i>=n))return{row:r,col:i}}const gc="-",Hg=64;function Lo(t,e){return t.map(e.encodeOp).join(gc)}function vc(t,e){const n=t.trim();if(n==="")return[];const s=n.split(gc);if(s.length>(e.maxOps??Hg))return;const o=[];for(const a of s){const r=e.decodeOp(a);if(r===void 0)return;o.push(r)}return o}const En=t=>t.cursor!==null?["compare"]:t.path.length>0?["hit"]:Qt,uo={fib:En,"coin-change":En,lis:En,knapsack:En,"subset-sum":En,lcs:En,"edit-distance":En,"matrix-chain":En},Ug={fib:["dp[0] = 0; dp[1] = 1","for k = 2 to n:  dp[k] = dp[k - 1] + dp[k - 2]","traceback: every dp[k] fed the two cells after it","done — fib(n) = dp[n]"],"coin-change":["dp[0] = 0   // zero coins make zero","for a = 1 to amount","  dp[a] = 1 + min(dp[a - c]) over coins c <= a","traceback: subtract the winning coin, repeat","done — dp[amount] is the fewest coins"],lis:["dp[i] = 1   // a[i] on its own is a subsequence","for i = 0 to n - 1","  dp[i] = 1 + max(dp[j]) over j < i with a[j] < a[i]","traceback: from argmax dp, hop to the predecessor that won","done — the answer is max(dp), not dp[n - 1]"],knapsack:["dp[0][c] = 0 for every c   // no items, no value","for i = 1 to n","  for c = 0 to capacity","    skip = dp[i-1][c];  take = v_i + dp[i-1][c - w_i] if w_i <= c","    dp[i][c] = max(skip, take)","traceback: dp[i][c] != dp[i-1][c] means item i was taken","done — dp[n][capacity] is the best value"],"subset-sum":["dp[0][0] = 1; dp[0][t] = 0 for t > 0","for i = 1 to n","  for t = 0 to target","    skip = dp[i-1][t];  take = dp[i-1][t - w_i] if w_i <= t","    dp[i][t] = skip OR take","traceback: follow whichever branch held 1","done — dp[n][target] = 1 means the target is reachable"],lcs:["dp[i][0] = dp[0][j] = 0","for i = 1 to m, for j = 1 to n","  if a[i-1] == b[j-1]:  dp[i][j] = 1 + dp[i-1][j-1]","  else:                 dp[i][j] = max(dp[i-1][j], dp[i][j-1])","traceback: on a match take the character and step diagonally","done — dp[m][n] is the LCS length"],"edit-distance":["dp[i][0] = i   // delete everything","dp[0][j] = j   // insert everything","  if a[i-1] == b[j-1]:  dp[i][j] = dp[i-1][j-1]","  else:  dp[i][j] = 1 + min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1])","traceback: read the edit script off the winning branches","done — dp[m][n] is the edit distance"],"matrix-chain":["dp[i][i] = 0   // one matrix needs no multiplication","for len = 2 to n:  for each i, with j = i + len - 1","  dp[i][j] = min over k in [i, j) of","             dp[i][k] + dp[k+1][j] + d[i]*d[k+1]*d[j+1]","traceback: descend into the winning split on both sides","done — dp[0][n-1] is the fewest scalar multiplications"]},zg=`import type { DpDep, DpStep, StepGenerator } from '@/types';
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
`,qg=`import type { DpDep, DpStep, StepGenerator } from '@/types';
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
`,Kg=`import type { DpDep, DpStep, StepGenerator } from '@/types';
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
`,Gg=`import type { DpDep, DpStep, StepGenerator } from '@/types';
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
`,Wg=`import type { DpDep, DpStep, StepGenerator } from '@/types';
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
`,Xg=`import type { DpDep, DpStep, StepGenerator } from '@/types';
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
`,Yg=`import type { DpDep, DpStep, StepGenerator } from '@/types';
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
`,Jg=`import type { DpBoard } from './_utils';
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
`,bc={fib:{file:"fib.ts",text:zg},"coin-change":{file:"coinChange.ts",text:qg},lis:{file:"lis.ts",text:Kg},knapsack:{file:"knapsack.ts",text:Gg},"subset-sum":{file:"subsetSum.ts",text:Wg},lcs:{file:"lcs.ts",text:Xg},"edit-distance":{file:"editDistance.ts",text:Yg},"matrix-chain":{file:"matrixChain.ts",text:Jg}},Qg=la(bc),Ji="fib";function Ps(t){switch(t.kind){case"scalar":return`scalar:${t.n}`;case"coins":return`coins:${t.coins.join(",")}:${t.amount}`;case"sequence":return`sequence:${t.values.join(",")}`;case"items":return`items:${t.items.map(e=>`${e.weight}/${e.value}`).join(",")}:${t.capacity}`;case"strings2":return`strings2:${t.a}:${t.b}`;case"chain":return`chain:${t.dims.join(",")}`}}const Qi="ABCDEF";function Zi(t,e,n){const s=t.int(e,n);return Array.from({length:s},()=>Qi[t.int(0,Qi.length-1)]).join("")}function Zg(t,e){switch(t){case"scalar":return{kind:"scalar",n:e.int(10,22)};case"coins":{const n=[];let s=1;for(let o=0;o<3;o++)n.push(s),s+=e.int(1,4);return{kind:"coins",coins:n,amount:e.int(9,18)}}case"sequence":return{kind:"sequence",values:Array.from({length:e.int(7,10)},()=>e.int(1,30))};case"items":{const n=e.int(3,6);return{kind:"items",items:Array.from({length:n},()=>({weight:e.int(1,7),value:e.int(1,12)})),capacity:e.int(7,14)}}case"strings2":return{kind:"strings2",a:Zi(e,5,7),b:Zi(e,5,7)};case"chain":return{kind:"chain",dims:Array.from({length:e.int(4,6)},()=>e.int(1,8)*5)}}}function ev(t,e){return Array.from({length:t},()=>new Array(e).fill(null))}function tv(t={}){const{audio:e=!0}=t,n=eo(),s=B(Ji),o=B(Yt[Ji].defaults),a=B(60),r=B(ze()),i=B([]),l=Ne({cursor:null,deps:[],chosen:null,path:[],explain:null,result:null,cellsFilled:0}),u=B(null),c=E(()=>Yt[s.value]),d=E(()=>Wu(c.value,o.value)),p=E(()=>d.value.axes),m=E(()=>d.value.dims),b=E(()=>d.value.recurrence),g=E(()=>d.value.naiveCalls),y=E(()=>Io(c.value,o.value)),v=E(()=>y.value===null),x=E(()=>{var ie;const L=u.value;if(L===null)return[];const{rows:J,cols:ue}=m.value,G=i.value;return G.length!==J||(((ie=G[0])==null?void 0:ie.length)??0)!==ue?[]:L.row<0||L.row>=J||L.col<0||L.col>=ue?[]:d.value.depsOf(L.row,L.col,G)}),S=E(()=>({cellsFilled:l.cellsFilled,fillable:m.value.fillable,rows:m.value.rows,cols:m.value.cols,naiveCalls:g.value,speedup:m.value.fillable>0?g.value/m.value.fillable:0}));function $(){i.value=ev(m.value.rows,m.value.cols),l.cursor=null,l.deps=[],l.chosen=null,l.path=[],l.explain=null,l.result=null,l.cellsFilled=0}const R=bn({speed:a,createGenerator:()=>($(),v.value?d.value.generator():null),applyStep:L=>{i.value=L.table,l.cursor=L.cursor,l.deps=L.deps,l.chosen=L.chosen,l.path=L.path,l.explain=L.explain,l.result=L.result,l.cellsFilled=L.cellsFilled},clearStep:$,onAdvance:e?L=>{var J;return n.play(((J=uo[s.value])==null?void 0:J.call(uo,L))??Qt)}:void 0,maxSteps:Wh});function P(L){R.canEdit.value&&(o.value=L,R.reset())}function K(){P(Zg(c.value.kind,rt(r.value)))}function D(){r.value=ze(),K()}function N(L){u.value=L}Re(s,L=>{Yt[L].kind!==o.value.kind&&(o.value=Yt[L].defaults),R.reset()});const j=E(()=>{var L;return((L=R.current.value)==null?void 0:L.line)??null}),me=E(()=>Ug[s.value]),Se=E(()=>bc[s.value]),z=E(()=>{var J;const L=(J=R.current.value)==null?void 0:J.line;return L===void 0?[]:Qg(s.value).get(L)??[]}),ae=E(()=>s.value in uo);return Zt(Kv({algoKey:s,input:o,speed:a,seed:r})),$(),{algoKey:s,input:o,speed:a,seed:r,currentAlgo:c,axes:p,dims:m,recurrence:b,naiveCalls:g,inputError:y,canRun:v,table:i,view:l,hoverCell:u,hoverDeps:x,stats:S,activeLine:j,pseudocodeLines:me,sourceCode:Se,activeSourceLines:z,hasSoundCues:ae,status:R.status,isRunning:R.isRunning,isPaused:R.isPaused,isDone:R.isDone,canEdit:R.canEdit,delayMs:R.delayMs,elapsedMs:R.elapsedMs,stepCount:R.stepCount,cursor:R.cursor,bufferedCount:R.bufferedCount,fullyBuffered:R.fullyBuffered,truncated:R.truncated,current:R.current,canStepBack:R.canStepBack,canStepForward:R.canStepForward,setInput:P,randomizeInput:K,randomizeSeed:D,setHoverCell:N,run:R.run,pause:R.pause,reset:R.reset,stepForward:R.stepForward,stepBack:R.stepBack,seek:R.seek,skipToEnd:R.skipToEnd}}const nv=`import type { DsuOp, DsuStep } from '@/types';
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
`,sv=`import type { GraphModel, MstStep } from '@/types';
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
`,ov=`import type { GraphEdge, GraphModel, MstStep } from '@/types';
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
`,yc={dsu:{file:"dsuOps.ts",text:nv},kruskal:{file:"kruskal.ts",text:sv},prim:{file:"prim.ts",text:ov}},av=la(yc),rv={dsu:["parent[i] = i, rank[i] = 0        // n singleton sets","find(x):","  walk parent pointers up to the root","  re-hang every node walked onto the root   // path compression","union(a, b):","  ra = find(a); rb = find(b)","  if ra == rb: already one set — nothing to do","  hang the lower-rank root under the higher   // union by rank","  on a tie, the surviving root’s rank goes up by 1","done — every operation in the script has run"],kruskal:["sort every edge by weight, lightest first","parent[i] = i        // every node starts as its own component","for each edge (u, v) in that order","  if find(u) == find(v): reject — u and v are already connected","  else accept (u, v) and union(u, v)","  stop early once V - 1 edges have been accepted","done — spanning tree, or a spanning forest if the graph was disconnected"],prim:["pick a start node; the tree holds just that node","offer every edge leaving the tree as a candidate","take the lightest candidate","  if both its ends are already in the tree, drop it   // it would close a cycle","  otherwise accept it: its far end joins the tree and offers its own edges","no candidate left but nodes remain — restart from an unreached node","done — spanning tree, or a spanning forest if the graph was disconnected"]},el=t=>{if(t.kind!=="mst")return Qt;const e=t.consideringEdge;return e===null?Qt:t.acceptedEdges.includes(e)?["hit"]:t.rejectedEdges.includes(e)?["miss"]:["compare"]},iv=7,lv=6,uv=2,cv=t=>t.kind!=="dsu"?Qt:t.line===iv?["hit"]:t.line===lv?["miss"]:t.line===uv?["compare"]:Qt,co={dsu:cv,kruskal:el,prim:el},tl=400,dv=.42,pv=.35,fv=20;function wc(t=10,e=rt(ze()),n){const s=Math.max(1,Math.floor(t)),o=tl/2,a=tl*dv,r=(n==null?void 0:n.weighted)??!1,i=(n==null?void 0:n.maxWeight)??fv,l=Array.from({length:s},(b,g)=>{const y=2*Math.PI*g/s-Math.PI/2;return{id:g,label:`N${g}`,x:o+a*Math.cos(y),y:o+a*Math.sin(y)}}),u=new Set,c=[];function d(b,g){if(b===g)return;const y=b<g?`${b}-${g}`:`${g}-${b}`;if(u.has(y))return;u.add(y);const v=r?e.int(1,i):void 0;c.push(v===void 0?{id:y,from:b,to:g}:{id:y,from:b,to:g,weight:v})}for(let b=0;b<s;b++)d(b,(b+1)%s);const p=s>2?Math.max(1,Math.round(s*pv)):0;for(let b=0;b<p;b++){const g=e.int(0,s-1),y=e.int(0,s-1);d(g,y)}const m=new Map(l.map(b=>[b.id,[]]));for(const b of c)m.get(b.from).push(b.to),m.get(b.to).push(b.from);return{nodes:l,edges:c,adjacency:m}}const Aa=8,xc=3,kc=14,hv=20;function nl(t){return{parent:Array.from({length:t},(e,n)=>n),rank:new Array(t).fill(0),setSize:new Array(t).fill(1),findPath:[],compressed:[],finds:0,unions:0,compressions:0,maxDepth:0}}function lr(t,e){const n=rt(e),s=Math.max(2,t),o=[];for(let a=0;a<Math.min(6,s-1);a++)o.push({kind:"union",a:n.int(0,s-1),b:n.int(0,s-1)});for(let a=0;a<3;a++)o.push({kind:"find",a:n.int(0,s-1)});return o}function mv(t={}){const{audio:e=!0}=t,n=eo(),s=B("kruskal"),o=B(Aa),a=B(60),r=B(ze()),i=B([]),l=B(null),u=B({nodes:[],edges:[],adjacency:new Map}),c=B(nl(Aa)),d=Ne({consideringEdge:null,acceptedEdges:[],rejectedEdges:[],queue:[],totalWeight:0,components:Aa}),p=B(null),m=B(null),b=B(null),g=E(()=>aa[s.value]),y=E(()=>g.value.mode==="dsu"),v=E(()=>[...u.value.edges].sort((X,ge)=>{const Te=(X.weight??1)-(ge.weight??1);return Te!==0?Te:X.id.localeCompare(ge.id)}));function x(X,ge){let Te=ge;for(let qe=0;qe<X.length&&X[Te]!==Te;qe++)Te=X[Te];return Te}const S=E(()=>new Map(u.value.nodes.map((X,ge)=>[X.id,ge]))),$=E(()=>{const X=new Map;for(const ge of d.rejectedEdges)X.set(ge,"rejected");for(const ge of d.acceptedEdges)X.set(ge,"accepted");return d.consideringEdge!==null&&!X.has(d.consideringEdge)&&X.set(d.consideringEdge,"considering"),X}),R=E(()=>{const X=new Map,ge=new Set(d.acceptedEdges);for(const qe of u.value.edges)ge.has(qe.id)&&(X.set(qe.from,"accepted"),X.set(qe.to,"accepted"));const Te=u.value.edges.find(qe=>qe.id===d.consideringEdge);return Te&&(X.set(Te.from,"considering"),X.set(Te.to,"considering")),X}),P=E(()=>{var Te;const X=new Map;if(y.value)return X;const ge=c.value.parent;for(const qe of u.value.nodes){const it=S.value.get(qe.id);if(it===void 0||it>=ge.length)continue;const H=x(ge,it);X.set(qe.id,`set ${((Te=u.value.nodes[H])==null?void 0:Te.label)??H}`)}return X}),K=E(()=>({finds:c.value.finds,unions:c.value.unions,compressions:c.value.compressions,maxDepth:c.value.maxDepth,totalWeight:d.totalWeight,components:d.components}));function D(){d.consideringEdge=null,d.acceptedEdges=[],d.rejectedEdges=[],d.queue=[],d.totalWeight=0,d.components=y.value?o.value:u.value.nodes.length}function N(){c.value=nl(y.value?o.value:u.value.nodes.length),p.value=null,m.value=null,b.value=null,D()}const j=bn({speed:a,createGenerator:()=>{N();const X=g.value;if(X.mode==="dsu")return X.generator(o.value,[...i.value]);if(u.value.nodes.length===0)return null;const ge=typeof l.value=="number"?l.value:u.value.nodes[0].id;return X.generator(u.value,ge)},applyStep:X=>{if(c.value=X.forest,b.value=X.explain,X.kind==="dsu"){p.value=X.op,m.value=X.active,d.consideringEdge=null,d.acceptedEdges=[],d.rejectedEdges=[],d.queue=[],d.totalWeight=0,d.components=X.forest.parent.filter((ge,Te)=>ge===Te).length;return}p.value=null,m.value=null,d.consideringEdge=X.consideringEdge,d.acceptedEdges=X.acceptedEdges,d.rejectedEdges=X.rejectedEdges,d.queue=X.queue,d.totalWeight=X.totalWeight,d.components=X.components},clearStep:N,onAdvance:e?X=>{var ge;return n.play(((ge=co[s.value])==null?void 0:ge.call(co,X))??Qt)}:void 0});function me(X=!1){var Te;u.value=wc(o.value,rt(r.value),{weighted:!0,maxWeight:hv}),X&&l.value!==null&&u.value.adjacency.has(l.value)||(l.value=((Te=u.value.nodes[0])==null?void 0:Te.id)??null),j.reset()}function Se(X){j.canEdit.value&&(i.value=[...X],j.reset())}function z(){Se(lr(o.value,r.value))}function ae(X){j.canEdit.value&&u.value.adjacency.has(X)&&(l.value=X)}function L(){r.value=ze(),me(),z()}const J=E(()=>{var X;return((X=j.current.value)==null?void 0:X.line)??null}),ue=E(()=>rv[s.value]??[]),G=E(()=>yc[s.value]),ie=E(()=>{var ge;const X=(ge=j.current.value)==null?void 0:ge.line;return X===void 0?[]:av(s.value).get(X)??[]}),$e=E(()=>s.value in co),{hydrated:nt}=Zt(Gv({algoKey:s,nodeCount:o,speed:a,seed:r,startId:l,opScript:i}));return me(nt.has("start")),nt.has("ops")||(i.value=lr(o.value,r.value)),{algoKey:s,nodeCount:o,speed:a,seed:r,opScript:i,startId:l,graph:u,sortedEdges:v,forest:c,highlights:d,activeOp:p,activeNode:m,explain:b,stats:K,nodeTone:R,edgeTone:$,nodeBadge:P,currentAlgo:g,isDsuMode:y,activeLine:J,pseudocodeLines:ue,sourceCode:G,activeSourceLines:ie,hasSoundCues:$e,status:j.status,isRunning:j.isRunning,isPaused:j.isPaused,isDone:j.isDone,canEdit:j.canEdit,delayMs:j.delayMs,elapsedMs:j.elapsedMs,stepCount:j.stepCount,cursor:j.cursor,bufferedCount:j.bufferedCount,fullyBuffered:j.fullyBuffered,current:j.current,canStepBack:j.canStepBack,canStepForward:j.canStepForward,generate:me,setOpScript:Se,randomizeOpScript:z,randomizeSeed:L,setStart:ae,run:j.run,pause:j.pause,reset:j.reset,stepForward:j.stepForward,stepBack:j.stepBack,seek:j.seek,skipToEnd:j.skipToEnd}}const Sc="abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",gv=3;function*$c(){const t=[...Sc],e=t.length;for(let n=1;n<=gv;n++){const s=e**n;for(let o=0;o<s;o++){let a="",r=o;for(let i=0;i<n;i++)a=t[r%e]+a,r=Math.floor(r/e);yield a}}}function vv(t,e,n){const s=ra(n.capacity),o=Kn[n.hashFnKey].hash,a=n.exclude??new Set,r=(t%s+s)%s,i=[];for(const l of $c())if(!a.has(l)&&Dr(o(l),s)===r&&(i.push(l),i.length>=e))break;return i}function bv(t,e,n){const s=ra(e.capacity),o=Kn[e.hashFnKey].hash,a=e.exclude??new Set;if(n!==void 0){const l=vv(n,t,e),u=(n%s+s)%s;if(l.length===t)return{bucket:u,keys:l}}const r=new Map;for(const l of $c()){if(a.has(l))continue;const u=Dr(o(l),s),c=r.get(u)??[];if(c.push(l),r.set(u,c),c.length>=t)return{bucket:u,keys:c}}let i={bucket:0,keys:[]};for(const[l,u]of r)u.length>i.keys.length&&(i={bucket:l,keys:u});return i}function Ec(t,e,n){const s=new Set(n??[]),o=[];for(let a=0;a<e*50&&o.length<e;a++){const r=t.int(2,3);let i="";for(let l=0;l<r;l++)i+=Sc[t.int(0,25)];s.has(i)||(s.add(i),o.push(i))}return o}const yv={chaining:["insert(key):","  h = hash(key);  home = h mod capacity","  walk bucket[home]’s chain, link by link","    key already in the chain -> overwrite its value","    end of the chain reached -> append the key","    a different key here -> collision; the chain just gets longer","  if size / capacity > threshold: grow, then rehash every key","search(key): walk the same chain from the front","  key found -> report the bucket holding it","  end of chain -> the key is not in the table","delete(key): walk the chain to find the key","  unlink it; the chain simply gets shorter","done — every operation in the script has run"],linear:["insert(key):","  h = hash(key);  home = h mod capacity","  probe (home + k) mod capacity for k = 0, 1, 2, ...","    key already in this slot -> overwrite its value","    slot empty (or a reusable tombstone) -> put the key here","    a different key here -> collision; probe the next slot","  if slots used / capacity > threshold: grow, then rehash every key","search(key): walk the same probe sequence from home","  key found -> report the slot holding it","  first EMPTY slot -> the key is not in the table","delete(key): walk the sequence to find the key","  leave a TOMBSTONE behind, never an empty slot","done — every operation in the script has run"],quadratic:["insert(key):","  h = hash(key);  home = h mod capacity","  probe (home + k(k+1)/2) mod capacity for k = 0, 1, 2, ...","    key already in this slot -> overwrite its value","    slot empty (or a reusable tombstone) -> put the key here","    a different key here -> collision; widen the jump and probe again","  if slots used / capacity > threshold: grow, then rehash every key","search(key): walk the same probe sequence from home","  key found -> report the slot holding it","  first EMPTY slot -> the key is not in the table","delete(key): walk the sequence to find the key","  leave a TOMBSTONE behind, never an empty slot","done — every operation in the script has run"],double:["insert(key):","  h = hash(key);  home = h mod capacity;  step = h2(h) | 1","  probe (home + k * step) mod capacity for k = 0, 1, 2, ...","    key already in this slot -> overwrite its value","    slot empty (or a reusable tombstone) -> put the key here","    a different key here -> collision; jump another step","  if slots used / capacity > threshold: grow, then rehash every key","search(key): walk the same probe sequence from home","  key found -> report the slot holding it","  first EMPTY slot -> the key is not in the table","delete(key): walk the sequence to find the key","  leave a TOMBSTONE behind, never an empty slot","done — every operation in the script has run"]},po=`// The generators that turn a script of hash-table operations into watchable
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
`,Cc={chaining:{file:"hashtable/ops.ts",text:po},linear:{file:"hashtable/ops.ts",text:po},quadratic:{file:"hashtable/ops.ts",text:po},double:{file:"hashtable/ops.ts",text:po}},wv=la(Cc),sl=Object.freeze(["compare"]),xv=Object.freeze(["hit"]),ol=Object.freeze(["miss"]),kv=Object.freeze(["swap"]);function Sv(t){if(t.probeIndex===null||t.key===null)return!1;const e=t.buckets[t.probeIndex];if(!e||e.state!=="occupied")return!1;const n=e.entries[t.probeSeq.length-1]??e.entries[0];return n!==void 0&&n.key!==t.key}const $v=t=>{switch(t.phase){case"probing":return Sv(t)?ol:sl;case"hashing":return sl;case"inserted":case"updated":case"found":case"deleted":return xv;case"not-found":return ol;case"resizing":return kv;default:return Qt}},Ev=new Set(["inserted","updated","found","not-found","deleted"]),Ac=8,Cv=3;function al(t){return Array.from({length:t},()=>({entries:[],state:"empty"}))}function Tc(t,e=Ac){const n=Ec(rt(t),e),s=n.map(o=>({kind:"insert",key:o}));return n.length===0||(s.push({kind:"search",key:n[Math.floor(n.length/2)]}),s.push({kind:"delete",key:n[0]})),s}function Av(t={}){const{audio:e=!0}=t,n=eo(),s=B(uc),o=B(ac),a=B(8),r=B(.75),i=B(60),l=B(ze()),u=B([]),c=E(()=>ra(a.value)),d=E(()=>rc(s.value,r.value)),p=E(()=>ia[s.value]),{hydrated:m}=Zt(Zv({strategyKey:s,hashFnKey:o,capacity:a,threshold:r,speed:i,seed:l,script:u}));m.has("ops")||(u.value=Tc(l.value));const b=B(al(c.value)),g=Ne({capacity:c.value,size:0,loadFactor:0,op:null,key:null,hash:null,homeIndex:null,probeIndex:null,probeSeq:[],phase:"idle",explain:null}),y=Ne({probes:0,collisions:0,resizes:0,opsDone:0});let v=[];function*x(G){let ie=0;for(const $e of G)Ev.has($e.phase)&&(ie+=1),v.push(ie),yield $e}function S(){b.value=al(c.value),g.capacity=c.value,g.size=0,g.loadFactor=0,g.op=null,g.key=null,g.hash=null,g.homeIndex=null,g.probeIndex=null,g.probeSeq=[],g.phase="idle",g.explain=null,y.probes=0,y.collisions=0,y.resizes=0,y.opsDone=0}const $=bn({speed:i,createGenerator:()=>{S(),v=[];const G=u.value.map(ie=>({...ie}));return x(p.value.generator(G,{hashFnKey:o.value,capacity:a.value,threshold:r.value}))},applyStep:(G,ie)=>{b.value=G.buckets,g.capacity=G.capacity,g.size=G.size,g.loadFactor=G.loadFactor,g.op=G.op,g.key=G.key,g.hash=G.hash,g.homeIndex=G.homeIndex,g.probeIndex=G.probeIndex,g.probeSeq=G.probeSeq,g.phase=G.phase,g.explain=G.explain,y.probes=G.probes,y.collisions=G.collisions,y.resizes=G.resizes,y.opsDone=v[ie]??0},clearStep:S,onAdvance:e?G=>n.play($v(G)):void 0}),R=E(()=>y.opsDone===0?0:y.probes/y.opsDone);function P(){return new Set(u.value.map(G=>G.key))}function K(G){u.value=G.map(ie=>({...ie})),$.reset()}function D(G,ie){ie!==""&&(u.value=[...u.value,{kind:G,key:ie}],$.reset())}function N(G){u.value=u.value.filter((ie,$e)=>$e!==G),$.reset()}function j(){u.value=[],$.reset()}function me(G=Ac){const ie=Ec(rt(l.value),G,P());u.value=[...u.value,...ie.map($e=>({kind:"insert",key:$e}))],$.reset()}function Se(G=Cv,ie){const $e=bv(G,{hashFnKey:o.value,capacity:a.value,exclude:P()},ie);return u.value=[...u.value,...$e.keys.map(nt=>({kind:"insert",key:nt}))],$.reset(),$e.bucket}function z(){l.value=ze()}Re([s,o,a,r],()=>$.reset());const ae=E(()=>{var G;return((G=$.current.value)==null?void 0:G.line)??null}),L=E(()=>yv[s.value]),J=E(()=>Cc[s.value]),ue=E(()=>{var ie;const G=(ie=$.current.value)==null?void 0:ie.line;return G===void 0?[]:wv(s.value).get(G)??[]});return{strategyKey:s,hashFnKey:o,capacity:a,threshold:r,speed:i,seed:l,script:u,startCapacity:c,activeThreshold:d,currentAlgo:p,buckets:b,view:g,stats:y,avgProbes:R,activeLine:ae,pseudocodeLines:L,sourceCode:J,activeSourceLines:ue,status:$.status,isRunning:$.isRunning,isPaused:$.isPaused,isDone:$.isDone,canEdit:$.canEdit,delayMs:$.delayMs,elapsedMs:$.elapsedMs,stepCount:$.stepCount,cursor:$.cursor,bufferedCount:$.bufferedCount,fullyBuffered:$.fullyBuffered,current:$.current,canStepBack:$.canStepBack,canStepForward:$.canStepForward,setScript:K,addOp:D,removeOp:N,clearScript:j,bulkLoad:me,forceCollision:Se,randomizeSeed:z,run:$.run,pause:$.pause,reset:$.reset,stepForward:$.stepForward,stepBack:$.stepBack,seek:$.seek,skipToEnd:$.skipToEnd}}function Pr(t){return t.threads.map(e=>e.instructions.length)}function Tv(t){return t.map(e=>({id:e.id,pc:e.pc,status:e.status,locals:{...e.locals}}))}function Ov(t,e){return t.threads.every((n,s)=>n.pc>=e[s])}function ur(t,e){const n=Pr(t),s=n.map(()=>0);for(const o of e)if(!Number.isInteger(o)||o<0||o>=n.length||(s[o]+=1,s[o]>n[o]))return!1;return s.every((o,a)=>o===n[a])}function*Oc(t,e){const n=Pr(t),s=t.createState();for(let o=0;o<e.length;o++){const a=e[o],r=s.threads[a],i=t.threads[a].instructions[r.pc];if(!i)continue;i.exec(s,a),r.pc+=1,r.pc>=n[a]&&(r.status="done");const l=Ov(s,n);yield{threads:Tv(s.threads),sharedMem:{...s.shared},lockOwners:{...s.locks},lastAction:{threadId:a,instruction:i.label},violated:!t.invariant.holds(s,l),done:l}}}function _v(t,e){let n=-1,s=0;for(const o of Oc(t,e))o.violated&&n===-1&&(n=s),s+=1;return{schedule:[...e],violates:n!==-1,firstViolationIndex:n}}const _c=6e3;function Mv(t){let e="";for(const n of t)e+=String.fromCharCode(n);return btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function Rv(t){const e=t.replace(/-/g,"+").replace(/_/g,"/");try{const n=atob(e),s=new Uint8Array(n.length);for(let o=0;o<n.length;o++)s[o]=n.charCodeAt(o);return s}catch{return}}function jv(t){return t.length>_c?null:Mv(new TextEncoder().encode(t))}function Iv(t){const e=Rv(t);if(e!==void 0)try{const n=new TextDecoder("utf-8",{fatal:!0}).decode(e);return n.length>_c?void 0:n}catch{return}}const Br=2e4,Dv=3e3,Lv=5e3,Nv=250,Ws=500,Mc=5,Fr=60,Rc=22,jc=60,cr=`// Write any sorting algorithm you like.
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
`;function yn(t){return String(t)}function wn(t){const e=Tg(t);return e===null?void 0:e}function ts(t){if(t.trim()==="")return;const e=Number(t);return Number.isInteger(e)?e:void 0}function Ta(t){const e=[];for(const n of t.split(",")){const s=ts(n);if(s===void 0)return;e.push(s)}return e}const Oa={algo:"bubble",size:45,speed:60};function Pv(t){return{algo:{ref:t.algoKey,encode:e=>e===Oa.algo?null:e,decode:e=>Ht(us,e)},size:{ref:t.size,encode:e=>e===Oa.size?null:String(e),decode:e=>et(e,10,100),debounceMs:250},speed:{ref:t.speed,encode:e=>e===Oa.speed?null:String(e),decode:e=>et(e,1,100),debounceMs:250},seed:{ref:t.seed,encode:yn,decode:wn}}}const fo={algo:"binary",size:20,speed:60,target:0};function Bv(t){return{algo:{ref:t.algoKey,encode:e=>e===fo.algo?null:e,decode:e=>Ht(na,e)},size:{ref:t.size,encode:e=>e===fo.size?null:String(e),decode:e=>et(e,10,50),debounceMs:250},speed:{ref:t.speed,encode:e=>e===fo.speed?null:String(e),decode:e=>et(e,1,100),debounceMs:250},seed:{ref:t.seed,encode:yn,decode:wn},target:{ref:t.target,encode:e=>e===fo.target?null:String(e),decode:e=>et(e,0,99)}}}function Fv(t,e){const n="bfs",o={row:Math.floor(e.rows/2),col:0},a={row:Math.floor(e.rows/2),col:e.cols-1},r=(i,l)=>i.row===l.row&&i.col===l.col;return{algo:{ref:t.algoKey,encode:i=>i===n?null:i,decode:i=>Ht(sa,i)},speed:{ref:t.speed,encode:i=>i===60?null:String(i),decode:i=>et(i,1,100),debounceMs:250},seed:{ref:t.seed,encode:yn,decode:wn},start:{ref:t.start,encode:i=>r(i,o)?null:Xi(i),decode:i=>Yi(i,e.rows,e.cols)},end:{ref:t.end,encode:i=>r(i,a)?null:Xi(i),decode:i=>Yi(i,e.rows,e.cols)}}}function rl(t){return E({get:()=>({row:t.row,col:t.col}),set:e=>{t.row=e.row,t.col=e.col}})}const il={algo:"bfs",speed:60};function Vv(t){return{algo:{ref:t.algoKey,encode:e=>e===il.algo?null:e,decode:e=>Ht(oa,e)},speed:{ref:t.speed,encode:e=>e===il.speed?null:String(e),decode:e=>et(e,1,100),debounceMs:250},seed:{ref:t.seed,encode:yn,decode:wn},start:{ref:t.startId,encode:e=>e===null?null:String(e),decode:e=>et(e,0,9999)}}}const ll={size:Rc,speed:jc};function Hv(t){return{src:{ref:t.source,encode:e=>e===cr?null:jv(e),decode:Iv,debounceMs:400},size:{ref:t.size,encode:e=>e===ll.size?null:String(e),decode:e=>et(e,Mc,Fr),debounceMs:250},speed:{ref:t.speed,encode:e=>e===ll.speed?null:String(e),decode:e=>et(e,1,100),debounceMs:250},seed:{ref:t.seed,encode:yn,decode:wn}}}const ul={scenario:cc,speed:60};function Uv(t,e){return{scenario:{ref:t.scenarioKey,encode:n=>n===ul.scenario?null:n,decode:n=>Ht(Gs,n)},speed:{ref:t.speed,encode:n=>n===ul.speed?null:String(n),decode:n=>et(n,1,100),debounceMs:250},seed:{ref:t.seed,encode:yn,decode:wn},sched:{ref:E({get:()=>t.schedule.value.join(""),set:n=>{t.schedule.value=[...n].map(Number)}}),encode:n=>n===""?null:n,decode:n=>{if(/^[0-9]+$/.test(n))return ur(e(),[...n].map(Number))?n:void 0}}}}const cl={algo:"fib",speed:60};function zv(t,e){switch(t){case"scalar":{const n=ts(e);return n===void 0?void 0:{kind:"scalar",n}}case"coins":{const n=e.split(":");if(n.length!==2)return;const s=Ta(n[0]),o=ts(n[1]);return s===void 0||o===void 0?void 0:{kind:"coins",coins:s,amount:o}}case"sequence":{const n=Ta(e);return n===void 0?void 0:{kind:"sequence",values:n}}case"items":{const n=e.split(":");if(n.length!==2)return;const s=ts(n[1]);if(s===void 0)return;const o=[];for(const a of n[0].split(",")){const r=a.split("/");if(r.length!==2)return;const i=ts(r[0]),l=ts(r[1]);if(i===void 0||l===void 0)return;o.push({weight:i,value:l})}return{kind:"items",items:o,capacity:s}}case"strings2":{const n=e.split(":");return n.length!==2?void 0:{kind:"strings2",a:n[0],b:n[1]}}case"chain":{const n=Ta(e);return n===void 0?void 0:{kind:"chain",dims:n}}}}function qv(t,e){const n=t.indexOf(":"),s=n===-1?t:t.slice(0,n),o=n===-1?"":t.slice(n+1);if(s!==e.kind)return;const a=zv(e.kind,o);if(a!==void 0)return Io(e,a)===null?a:void 0}function Kv(t){return{algo:{ref:t.algoKey,encode:e=>e===cl.algo?null:e,decode:e=>Ht(Yt,e)},speed:{ref:t.speed,encode:e=>e===cl.speed?null:String(e),decode:e=>et(e,1,100),debounceMs:250},seed:{ref:t.seed,encode:yn,decode:wn},in:{ref:t.input,encode:e=>{const n=Ps(e),s=Ps(Yt[t.algoKey.value].defaults);return n===s?null:n},decode:e=>qv(e,Yt[t.algoKey.value])}}}const _a={algo:"kruskal",n:8,speed:60};function dl(t){const e=n=>n>=0&&n<t;return{encodeOp:n=>n.kind==="union"?`u${n.a}.${n.b??n.a}`:`f${n.a}`,decodeOp:n=>{const s=/^([uf])(\d+)(?:\.(\d+))?$/.exec(n);if(s===null)return;const o=Number(s[2]);if(!e(o))return;if(s[1]==="f")return s[3]===void 0?{kind:"find",a:o}:void 0;if(s[3]===void 0)return;const a=Number(s[3]);return e(a)?{kind:"union",a:o,b:a}:void 0}}}function Gv(t){return{algo:{ref:t.algoKey,encode:e=>e===_a.algo?null:e,decode:e=>Ht(aa,e)},n:{ref:t.nodeCount,encode:e=>e===_a.n?null:String(e),decode:e=>et(e,xc,kc),debounceMs:250},speed:{ref:t.speed,encode:e=>e===_a.speed?null:String(e),decode:e=>et(e,1,100),debounceMs:250},seed:{ref:t.seed,encode:yn,decode:wn},start:{ref:t.startId,encode:e=>e===null?null:String(e),decode:e=>et(e,0,9999)},ops:{ref:t.opScript,encode:e=>{const n=dl(t.nodeCount.value),s=Lo(e,n),o=lr(t.nodeCount.value,t.seed.value);return s===Lo(o,n)?null:s},decode:e=>vc(e,dl(t.nodeCount.value))}}}const Es={strategy:uc,fn:ac,capacity:8,threshold:.75,speed:60},Wv=25,Xv=150,Ma=t=>Math.round(t*100),Yv={insert:"i",search:"s",delete:"d"},Jv={i:"insert",s:"search",d:"delete"},Qv=/^([isd])([A-Za-z0-9]{1,12})$/,Ra={encodeOp:t=>`${Yv[t.kind]}${t.key}`,decodeOp:t=>{const e=Qv.exec(t);if(e!==null)return{kind:Jv[e[1]],key:e[2]}}};function Zv(t){return{strategy:{ref:t.strategyKey,encode:e=>e===Es.strategy?null:e,decode:e=>Ht(ia,e)},fn:{ref:t.hashFnKey,encode:e=>e===Es.fn?null:e,decode:e=>Ht(Kn,e)},cap:{ref:t.capacity,encode:e=>e===Es.capacity?null:String(e),decode:e=>et(e,4,64),debounceMs:250},thr:{ref:t.threshold,encode:e=>Ma(e)===Ma(Es.threshold)?null:String(Ma(e)),decode:e=>{const n=et(e,Wv,Xv);return n===void 0?void 0:n/100},debounceMs:250},speed:{ref:t.speed,encode:e=>e===Es.speed?null:String(e),decode:e=>et(e,1,100),debounceMs:250},seed:{ref:t.seed,encode:yn,decode:wn},ops:{ref:t.script,encode:e=>{const n=Lo(e,Ra),s=Tc(t.seed.value);return n===Lo(s,Ra)?null:n},decode:e=>vc(e,Ra)}}}function pl(t={}){const{syncUrl:e=!0,audio:n=!0}=t,s=eo(),o=B(45),a=B(60),r=B("bubble"),i=B(ze()),l=B([]),u=Ne({comparing:[],swapping:[],sorted:[]}),c=Ne({comparisons:0,swaps:0}),d=B([]),p=E(()=>us[r.value]),m=B(1);function b(N){const j=rt(i.value);return Array.from({length:N},()=>j.int(1,99))}function g(){u.comparing=[],u.swapping=[],u.sorted=[]}function y(){c.comparisons=0,c.swaps=0}const v=bn({speed:a,createGenerator:()=>(l.value=[...d.value],g(),y(),p.value.generator([...d.value])),applyStep:N=>{l.value=N.array,u.comparing=N.comparing,u.swapping=N.swapping,u.sorted=N.sorted,c.comparisons=N.comparisons,c.swaps=N.swaps},clearStep:()=>{l.value=[...d.value],g(),y()},onAdvance:n?N=>{var j;return s.play(((j=lo[r.value])==null?void 0:j.call(lo,N))??Qt)}:void 0});function x(){d.value=b(o.value),m.value=Math.max(...d.value,1),v.reset()}function S(N){N.length!==0&&(d.value=[...N],o.value=N.length,m.value=Math.max(...N,1),v.reset())}const $=E(()=>{var N;return((N=v.current.value)==null?void 0:N.line)??null}),R=E(()=>fc[r.value]),P=E(()=>{var j;const N=(j=v.current.value)==null?void 0:j.line;return N===void 0?[]:Cg(r.value).get(N)??[]}),K=E(()=>r.value in lo);function D(){i.value=ze(),x()}return e&&Zt(Pv({algoKey:r,size:o,speed:a,seed:i})),x(),{size:o,speed:a,algoKey:r,seed:i,array:l,baseArray:d,highlights:u,stats:c,maxValue:m,currentAlgo:p,status:v.status,isRunning:v.isRunning,isPaused:v.isPaused,isDone:v.isDone,canEdit:v.canEdit,delayMs:v.delayMs,elapsedMs:v.elapsedMs,stepCount:v.stepCount,cursor:v.cursor,bufferedCount:v.bufferedCount,fullyBuffered:v.fullyBuffered,current:v.current,activeLine:$,sourceCode:R,activeSourceLines:P,hasSoundCues:K,canStepBack:v.canStepBack,canStepForward:v.canStepForward,generate:x,randomizeSeed:D,setArray:S,run:v.run,pause:v.pause,reset:v.reset,stepForward:v.stepForward,stepBack:v.stepBack,seek:v.seek,skipToEnd:v.skipToEnd}}const eb={bubble:["for i = 0 to n - 2","  for j = 0 to n - 2 - i","    if a[j] > a[j + 1]","      swap a[j] and a[j + 1]","  a[n - 1 - i] is now in its final position","done — array is sorted"],selection:["for i = 0 to n - 1","  min = i","  for j = i + 1 to n - 1","    if a[j] < a[min]: min = j","  if min != i","    swap a[i] and a[min]","  a[i] is now in its final position","done — array is sorted"],insertion:["for i = 1 to n - 1","  j = i","  while j > 0 and a[j - 1] > a[j]","    swap a[j - 1] and a[j]","    j = j - 1","done — array is sorted"],merge:["mergesort(lo, hi):","  if hi - lo <= 1: return","  mid = (lo + hi) / 2","  mergesort(lo, mid); mergesort(mid, hi)","  while both halves still have items","    compare a[i] and a[j]; move the smaller into buffer","  append whatever remains of either half","  copy the buffer back into a[lo..hi)","done — array is sorted"],quick:["quicksort(lo, hi):","  if lo >= hi: return","  pivot = a[hi]; i = lo","  for j = lo to hi - 1","    if a[j] < pivot","      swap a[i] and a[j]; i = i + 1","  swap a[i] and a[hi]   // pivot into its final position","  quicksort(lo, i - 1); quicksort(i + 1, hi)","done — array is sorted"],heap:["siftDown(root, hi):","  while root still has a child at or before hi","    child = the larger child of root","    if a[root] >= a[child]: stop","    swap a[root] and a[child]; root = child","build the max-heap: for i = n/2 - 1 down to 0","  siftDown(i, n - 1)","for end = n - 1 down to 1","  swap a[0] and a[end]   // the max lands in its final slot","  siftDown(0, end - 1)","done — array is sorted"],shell:["for gap = n/2; gap > 0; gap = gap/2","  for i = gap to n - 1","    j = i","    while j >= gap and a[j - gap] > a[j]","      swap a[j - gap] and a[j]","      j = j - gap","done — array is sorted"],comb:["gap = n; swapped = true","while gap > 1 or swapped","  gap = max(1, floor(gap / 1.3))","  swapped = false","  for i = 0 while i + gap < n","    if a[i] > a[i + gap]","      swap a[i] and a[i + gap]; swapped = true","done — array is sorted"],counting:["count = zeros, sized max(a) + 1","for i = 0 to n - 1","  count[a[i]] = count[a[i]] + 1","for v = 1 to max","  count[v] = count[v] + count[v - 1]   // where each value ends","for i = n - 1 down to 0   // backwards keeps equal values in order","  d = count[a[i]] - 1; count[a[i]] = d","  output[d] = a[i]","done — array is sorted"],radix:["for exp = 1, 10, 100, ... while max / exp > 0","  digit(v) = (v / exp) mod 10","  count = ten zeros","  for i = 0 to n - 1","    count[digit(a[i])] = count[digit(a[i])] + 1","  for d = 1 to 9","    count[d] = count[d] + count[d - 1]   // where each digit ends","  for i = n - 1 down to 0   // backwards keeps the pass stable","    k = count[digit(a[i])] - 1; count[digit(a[i])] = k","    output[k] = a[i]","  a = output   // now ordered by every digit up to exp","done — array is sorted"]},tb={class:"av-card p-4 sm:p-5"},nb={key:0,class:"mb-3 flex items-center justify-between"},sb={class:"text-xs font-semibold uppercase tracking-wider text-ink-faint"},ob={key:1,class:"mb-3 text-xs font-semibold uppercase tracking-wider text-ink-faint"},ye=Z({__name:"AvPanel",props:{title:{}},setup(t){return(e,n)=>(w(),C("div",tb,[e.$slots.header?(w(),C("div",nb,[h("h2",sb,M(t.title),1),Eo(e.$slots,"header")])):t.title?(w(),C("h2",ob,M(t.title),1)):re("",!0),Eo(e.$slots,"default")]))}}),ab=["disabled","aria-pressed"],rb="flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none",ib="rounded-xl bg-surface-alt px-3 py-2 text-xs font-semibold text-ink-muted transition-all hover:bg-surface-raised hover:text-ink disabled:cursor-not-allowed disabled:opacity-50",te=Z({__name:"AvButton",props:{variant:{default:"neutral"},active:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1}},setup(t){const e=t,n={primary:"bg-ok text-ink-inverse shadow-md shadow-ok/30 hover:bg-ok/90",warning:"bg-warn text-ink-inverse shadow-md shadow-warn/30 hover:bg-warn/90",danger:"bg-danger text-ink-inverse shadow-md shadow-danger/30 hover:bg-danger/90",neutral:"bg-surface-alt text-ink hover:bg-surface-raised"},s={primary:"hover:shadow-lg",warning:"hover:shadow-lg",danger:"hover:shadow-lg",neutral:""},o={selector:{base:"rounded-xl px-3 py-2 text-sm font-medium transition-all disabled:cursor-not-allowed",on:"bg-accent text-accent-ink shadow-md shadow-accent/30",off:"bg-surface-alt text-ink-muted hover:bg-surface-raised hover:text-ink disabled:opacity-50"},toggle:{base:"rounded-lg px-3 py-1.5 text-xs font-semibold transition-all disabled:cursor-not-allowed",on:"bg-accent text-accent-ink shadow-sm",off:"text-ink-muted hover:bg-surface-raised hover:text-ink"}},a=E(()=>e.variant==="selector"||e.variant==="toggle"),r=E(()=>{const l=e.variant;if(l==="selector"||l==="toggle"){const u=o[l];return[u.base,e.active?u.on:u.off]}return l==="quiet"?ib:[rb,n[l],s[l]]}),i=E(()=>a.value?e.active:void 0);return(l,u)=>(w(),C("button",{type:"button",class:fe(r.value),disabled:t.disabled,"aria-pressed":i.value},[Eo(l.$slots,"default")],10,ab))}}),lb={key:0,class:"mt-4 rounded-xl bg-surface-alt p-4"},ub={class:"text-sm leading-relaxed text-ink-muted"},cb={class:"mt-3 flex flex-wrap gap-2"},db={class:"uppercase tracking-wide text-[10px] text-ink-faint"},pb={class:"font-mono font-semibold text-accent"},Rn=Z({__name:"AvAlgorithmSelector",props:_n({algorithms:{},title:{default:"Algorithm"},disabled:{type:Boolean,default:!1},columns:{default:2}},{modelValue:{required:!0},modelModifiers:{}}),emits:["update:modelValue"],setup(t){const e=t,n=Mn(t,"modelValue"),s=E(()=>Object.keys(e.algorithms)),o=E(()=>e.algorithms[n.value]),a=E(()=>o.value?Object.entries(o.value.complexity):[]),r={2:"grid grid-cols-2 gap-2",3:"grid grid-cols-2 gap-2 sm:grid-cols-3",4:"grid grid-cols-2 gap-2 sm:grid-cols-4"},i=E(()=>r[e.columns]);function l(u){e.disabled||(n.value=u)}return(u,c)=>(w(),W(ye,{title:t.title},{default:I(()=>[h("div",{class:fe(i.value)},[(w(!0),C(ee,null,ce(s.value,d=>(w(),W(te,{key:d,variant:"selector",active:d===n.value,disabled:t.disabled,onClick:p=>l(d)},{default:I(()=>[O(M(t.algorithms[d].name),1)]),_:2},1032,["active","disabled","onClick"]))),128))],2),o.value?(w(),C("div",lb,[h("p",ub,M(o.value.description),1),h("div",cb,[(w(!0),C(ee,null,ce(a.value,([d,p])=>(w(),C("span",{key:d,class:"inline-flex items-center gap-1 rounded-lg bg-surface-raised px-2.5 py-1 text-xs font-medium text-ink-muted shadow-sm"},[h("span",db,M(d),1),h("span",pb,M(p),1)]))),128)),o.value.stable!==void 0?(w(),C("span",{key:0,class:fe(["inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium shadow-sm",o.value.stable?"bg-ok-soft text-ok-ink":"bg-warn-soft text-warn-ink"])},M(o.value.stable?"Stable":"Unstable"),3)):re("",!0)])])):re("",!0)]),_:1},8,["title"]))}}),fb={class:"block"},hb={class:"mb-1.5 flex items-center justify-between text-sm"},mb={class:"font-medium text-ink-muted"},gb={class:"font-mono text-accent"},vb=["min","max","step","value","disabled","aria-valuetext"],He=Z({__name:"AvSlider",props:_n({label:{},min:{},max:{},step:{default:1},suffix:{default:""},disabled:{type:Boolean,default:!1}},{modelValue:{required:!0},modelModifiers:{}}),emits:["update:modelValue"],setup(t){const e=t,n=Mn(t,"modelValue"),s=E(()=>`${n.value}${e.suffix}`);function o(a){n.value=Number(a.target.value)}return(a,r)=>(w(),C("label",fb,[h("div",hb,[h("span",mb,M(t.label),1),h("span",gb,M(s.value),1)]),h("input",{type:"range",min:t.min,max:t.max,step:t.step,value:n.value,disabled:t.disabled,"aria-valuetext":s.value,class:"w-full",onInput:o},null,40,vb)]))}}),bb={class:"space-y-4"},yb={key:1,class:"mt-2 text-center text-xs text-ink-faint"},wb={class:"mt-2 grid grid-cols-2 gap-2"},xb=Z({__name:"ControlsPanel",props:{size:{},speed:{},status:{},canEdit:{type:Boolean},isRunning:{type:Boolean},isPaused:{type:Boolean},compare:{type:Boolean,default:!1},sound:{type:Boolean,default:!1},volume:{default:.4},hasSoundCues:{type:Boolean,default:!0}},emits:["update:size","update:speed","update:compare","update:sound","update:volume","generate","run","runBoth","pause","reset"],setup(t,{emit:e}){const n=t,s=e;function o(){n.compare?s("runBoth"):s("run")}return(a,r)=>(w(),W(ye,{title:"Controls"},{default:I(()=>[h("div",bb,[T(He,{label:"Array size","model-value":t.size,min:10,max:100,disabled:!t.canEdit,"onUpdate:modelValue":r[0]||(r[0]=i=>s("update:size",i))},null,8,["model-value","disabled"]),T(He,{label:"Speed","model-value":t.speed,min:1,max:100,suffix:"%","onUpdate:modelValue":r[1]||(r[1]=i=>s("update:speed",i))},null,8,["model-value"])]),T(te,{variant:"toggle",class:"mt-5 w-full",active:t.compare,disabled:!t.canEdit,onClick:r[2]||(r[2]=i=>s("update:compare",!t.compare))},{default:I(()=>[...r[8]||(r[8]=[O(" Compare two algorithms ",-1)])]),_:1},8,["active","disabled"]),T(te,{variant:"toggle",class:"mt-2 w-full",active:t.sound,onClick:r[3]||(r[3]=i=>s("update:sound",!t.sound))},{default:I(()=>[...r[9]||(r[9]=[O(" Sound cues ",-1)])]),_:1},8,["active"]),t.sound?(w(),W(He,{key:0,label:"Volume",class:"mt-3","model-value":Math.round(t.volume*100),min:0,max:100,suffix:"%","onUpdate:modelValue":r[4]||(r[4]=i=>s("update:volume",i/100))},null,8,["model-value"])):re("",!0),t.sound&&!t.hasSoundCues?(w(),C("p",yb," Sound cues aren't mapped for this algorithm yet. ")):re("",!0),h("div",wb,[t.isRunning?(w(),W(te,{key:1,variant:"warning",class:"col-span-2",onClick:r[5]||(r[5]=i=>s("pause"))},{default:I(()=>[...r[11]||(r[11]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M6 4h4v16H6zM14 4h4v16h-4z"})],-1),O(" Pause ",-1)])]),_:1})):(w(),W(te,{key:0,variant:"primary",class:"col-span-2",onClick:o},{default:I(()=>[r[10]||(r[10]=h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M8 5v14l11-7z"})],-1)),O(" "+M(t.isPaused?"Resume":"Run"),1)]),_:1})),T(te,{variant:"neutral",onClick:r[6]||(r[6]=i=>s("reset"))},{default:I(()=>[...r[12]||(r[12]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.36 2.64L3 8"}),h("path",{d:"M3 3v5h5"})],-1),O(" Reset ",-1)])]),_:1}),T(te,{variant:"neutral",disabled:!t.canEdit,onClick:r[7]||(r[7]=i=>s("generate"))},{default:I(()=>[...r[13]||(r[13]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"})],-1),O(" Shuffle ",-1)])]),_:1},8,["disabled"])]),r[14]||(r[14]=h("p",{class:"mt-3 text-center text-xs text-ink-faint"}," Size & algorithm lock while a sort is running. ",-1))]),_:1}))}}),kb={key:1,class:"text-sm text-ink-faint"},Sb={class:"mt-3 grid grid-cols-3 gap-2"},xn=Z({__name:"PlaybackScrubber",props:{cursor:{},bufferedCount:{},fullyBuffered:{type:Boolean},canStepBack:{type:Boolean},canStepForward:{type:Boolean}},emits:["seek","step-back","step-forward","skip-to-end"],setup(t,{emit:e}){const n=e;return(s,o)=>(w(),W(ye,{title:"History"},{default:I(()=>[t.bufferedCount>0?(w(),W(He,{key:0,label:"Step",min:0,max:Math.max(0,t.bufferedCount-1),suffix:` / ${Math.max(0,t.bufferedCount-1)}`,"model-value":t.cursor,"onUpdate:modelValue":o[0]||(o[0]=a=>n("seek",a))},null,8,["max","suffix","model-value"])):(w(),C("p",kb,"Press Run or Step to begin.")),h("div",Sb,[T(te,{variant:"quiet",disabled:!t.canStepBack,onClick:o[1]||(o[1]=a=>n("step-back"))},{default:I(()=>[...o[4]||(o[4]=[O(" ◀ Step ",-1)])]),_:1},8,["disabled"]),T(te,{variant:"quiet",disabled:!t.canStepForward,onClick:o[2]||(o[2]=a=>n("step-forward"))},{default:I(()=>[...o[5]||(o[5]=[O(" Step ▶ ",-1)])]),_:1},8,["disabled"]),T(te,{variant:"quiet",disabled:t.fullyBuffered&&t.cursor===t.bufferedCount-1,onClick:o[3]||(o[3]=a=>n("skip-to-end"))},{default:I(()=>[...o[6]||(o[6]=[O(" Skip to end ",-1)])]),_:1},8,["disabled"])])]),_:1}))}}),$b={class:"flex gap-1 rounded-xl bg-surface-alt p-1"},Eb={key:0,class:"mb-2 font-mono text-[0.65rem] uppercase tracking-wider text-ink-faint"},Cb={key:1,class:"text-xs text-ink-faint"},Ab=["data-active"],Tb={class:"whitespace-pre font-mono"},ua=Z({__name:"CodePanel",props:{lines:{},source:{},sourceFile:{default:""},activeLine:{default:null},activeSourceLines:{default:()=>[]},title:{default:"Code"}},setup(t){const e=t,n=B("pseudo"),s=E(()=>e.source.split(`
`)),o=E(()=>n.value==="source"?s.value:e.lines);function a(c){return n.value==="source"?e.activeSourceLines.includes(c):c===e.activeLine}const r=/^\s*(\/\/|\/\*|\*)/;function i(c){return n.value==="source"&&r.test(c)}const l=E(()=>n.value==="source"?e.activeSourceLines[0]??null:e.activeLine),u=B(null);return Re([l,n],async()=>{var d,p;if(l.value===null)return;await ms();const c=(d=u.value)==null?void 0:d.querySelector('[data-active="true"]');(p=c==null?void 0:c.scrollIntoView)==null||p.call(c,{block:"nearest"})}),(c,d)=>(w(),W(ye,{title:t.title,class:"max-h-96 overflow-y-auto"},{header:I(()=>[h("div",$b,[T(te,{variant:"toggle",active:n.value==="pseudo",onClick:d[0]||(d[0]=p=>n.value="pseudo")},{default:I(()=>[...d[2]||(d[2]=[O(" Pseudocode ",-1)])]),_:1},8,["active"]),T(te,{variant:"toggle",active:n.value==="source",onClick:d[1]||(d[1]=p=>n.value="source")},{default:I(()=>[...d[3]||(d[3]=[O(" Source ",-1)])]),_:1},8,["active"])])]),default:I(()=>[n.value==="source"&&t.sourceFile?(w(),C("p",Eb,M(t.sourceFile),1)):re("",!0),o.value.length===0?(w(),C("p",Cb," Pseudocode isn't written for this algorithm yet — switch to Source to watch the generator itself. ")):(w(),C("ol",{key:2,ref_key:"list",ref:u,class:"space-y-0.5 text-xs"},[(w(!0),C(ee,null,ce(o.value,(p,m)=>(w(),C("li",{key:m,"data-active":a(m),class:fe(["flex gap-3 rounded px-1.5 py-0.5 transition-colors",a(m)?"bg-tone-probe/20 text-tone-probe-ink":i(p)?"text-ink-faint":"text-ink-muted"])},[h("span",{class:fe(["nums w-5 flex-none text-right",a(m)?"font-semibold text-tone-probe-ink":"text-ink-faint"])},M(m+1),3),h("span",Tb,M(p),1)],10,Ab))),128))],512))]),_:1},8,["title"]))}}),Ob={class:"block"},_b={class:"mb-1.5 flex items-center justify-between text-sm"},Mb={class:"font-medium text-ink-muted"},Rb=["value","placeholder","disabled","aria-invalid"],jb={key:0,class:"mt-1.5 text-xs text-danger-ink"},$t=Z({__name:"AvTextField",props:_n({label:{},placeholder:{default:""},error:{default:null},disabled:{type:Boolean,default:!1},monospace:{type:Boolean,default:!1}},{modelValue:{required:!0},modelModifiers:{}}),emits:["update:modelValue"],setup(t){const e=Mn(t,"modelValue");function n(s){e.value=s.target.value}return(s,o)=>(w(),C("label",Ob,[h("div",_b,[h("span",Mb,M(t.label),1)]),h("input",{type:"text",value:e.value,placeholder:t.placeholder,disabled:t.disabled,"aria-invalid":!!t.error,class:fe(["w-full rounded-xl border bg-surface-raised px-3 py-2 text-sm text-ink transition-colors disabled:cursor-not-allowed disabled:opacity-50",[t.monospace?"font-mono":"",t.error?"border-danger ring-1 ring-danger":"border-line"]]),onInput:n},null,42,Rb),t.error?(w(),C("p",jb,M(t.error),1)):re("",!0)]))}}),Ib={class:"space-y-4"},Db={class:"mt-4 grid grid-cols-2 gap-2"},Ic=Z({__name:"DatasetPanel",props:{seed:{},custom:{},error:{},canEdit:{type:Boolean}},emits:["update:seed","update:custom","apply","randomize"],setup(t,{emit:e}){const n=e;function s(o){const a=Number(o);Number.isInteger(a)&&n("update:seed",a)}return(o,a)=>(w(),W(ye,{title:"Dataset"},{default:I(()=>[h("div",Ib,[T($t,{label:"Seed",monospace:"","model-value":String(t.seed),disabled:!t.canEdit,"onUpdate:modelValue":s},null,8,["model-value","disabled"]),T($t,{label:"Custom array",monospace:"",placeholder:"e.g. 5, 3, 9, 1","model-value":t.custom,error:t.error,disabled:!t.canEdit,"onUpdate:modelValue":a[0]||(a[0]=r=>n("update:custom",r))},null,8,["model-value","error","disabled"])]),h("div",Db,[T(te,{variant:"quiet",disabled:!t.canEdit,onClick:a[1]||(a[1]=r=>n("apply"))},{default:I(()=>[...a[3]||(a[3]=[O("Apply",-1)])]),_:1},8,["disabled"]),T(te,{variant:"quiet",disabled:!t.canEdit,onClick:a[2]||(a[2]=r=>n("randomize"))},{default:I(()=>[...a[4]||(a[4]=[O("New seed",-1)])]),_:1},8,["disabled"])]),a[5]||(a[5]=h("p",{class:"mt-3 text-xs text-ink-faint"},"The same seed always reproduces the same data.",-1))]),_:1}))}}),wt={idle:"bg-tone-idle-soft",probe:"bg-tone-probe-soft",active:"bg-tone-active-soft",settled:"bg-tone-settled-soft",rejected:"bg-tone-rejected-soft",trace:"bg-tone-trace-soft",blocked:"bg-tone-blocked-soft"},Tn={idle:"text-tone-idle-ink",probe:"text-tone-probe-ink",active:"text-tone-active-ink",settled:"text-tone-settled-ink",rejected:"text-tone-rejected-ink",trace:"text-tone-trace-ink",blocked:"text-tone-blocked-ink"},Ye={idle:"border-tone-idle/60",probe:"border-tone-probe/60",active:"border-tone-active/60",settled:"border-tone-settled/60",rejected:"border-tone-rejected/60",trace:"border-tone-trace/60",blocked:"border-tone-blocked/60"},gt={idle:"fill-tone-idle",probe:"fill-tone-probe",active:"fill-tone-active",settled:"fill-tone-settled",rejected:"fill-tone-rejected"},yt={idle:"stroke-tone-idle",probe:"stroke-tone-probe",active:"stroke-tone-active",settled:"stroke-tone-settled",rejected:"stroke-tone-rejected",trace:"stroke-tone-trace",blocked:"stroke-tone-blocked"},Ze={idle:"viz-mark bg-tone-idle [--tone-pat:var(--av-tone-idle-pat)]",probe:"viz-mark bg-tone-probe [--tone-pat:var(--av-tone-probe-pat)]",active:"viz-mark bg-tone-active [--tone-pat:var(--av-tone-active-pat)]",settled:"viz-mark bg-tone-settled [--tone-pat:var(--av-tone-settled-pat)]",rejected:"viz-mark bg-tone-rejected [--tone-pat:var(--av-tone-rejected-pat)]",trace:"viz-mark bg-tone-trace [--tone-pat:var(--av-tone-trace-pat)]",blocked:"viz-mark bg-tone-blocked [--tone-pat:var(--av-tone-blocked-pat)]"},Lb={idle:"Untouched",probe:"Comparing",active:"Current",settled:"Settled",rejected:"Rejected",trace:"Path",blocked:"Blocked"};function kn(t){return t.map(e=>typeof e=="string"?{tone:e,label:Lb[e]}:e)}const Nb={class:"flex flex-wrap items-center gap-3 text-xs text-ink-muted"},Dn=Z({__name:"AvLegend",props:{items:{}},setup(t){return(e,n)=>(w(),C("div",Nb,[(w(!0),C(ee,null,ce(t.items,s=>(w(),C("span",{key:s.label,class:"flex items-center gap-1.5"},[h("i",{class:fe(["h-3 w-3 rounded-mark",f(Ze)[s.tone]])},null,2),O(M(s.label),1)]))),128))]))}}),Pb={key:0,class:"mt-1 select-none","aria-hidden":"true"},Bb={class:"flex items-start gap-[2px] sm:gap-1"},Fb={key:0,class:"nums mt-0.5 font-mono text-[9px] leading-none text-ink-faint"},Vb=Z({__name:"AvRulerRail",props:{length:{},step:{default:5},minLength:{default:12}},setup(t){const e=t,n=E(()=>e.length>=e.minLength),s=E(()=>{const a=Math.ceil(e.length/12);return Math.max(e.step,Math.ceil(a/e.step)*e.step)}),o=E(()=>Array.from({length:e.length},(a,r)=>({index:r,major:r%s.value===0})));return(a,r)=>n.value?(w(),C("div",Pb,[h("div",Bb,[(w(!0),C(ee,null,ce(o.value,i=>(w(),C("div",{key:i.index,class:"flex flex-1 flex-col items-center"},[h("span",{class:fe(["w-px bg-line-strong",i.major?"h-1.5 opacity-100":"h-1 opacity-40"])},null,2),i.major?(w(),C("span",Fb,M(i.index),1)):re("",!0)]))),128))])])):re("",!0)}});function Hb(t,e){return t.swapping.has(e)?"active":t.comparing.has(e)?"probe":t.sorted.has(e)?"settled":"idle"}function Vr(t,e){return`${t/e*98+2}%`}const Ub={class:"flex min-h-[280px] flex-1 items-end gap-[2px] rounded-xl bg-surface-alt p-3 sm:gap-1"},zb=["data-tone"],qb={key:0,"data-testid":"sort-skin-item-label",class:"nums mb-1 text-[10px] font-medium text-ink-faint sm:text-xs"},Kb=Z({__name:"BarsSkin",props:{items:{},maxValue:{},showLabels:{type:Boolean}},setup(t){const e=t;return(n,s)=>(w(),C("div",Ub,[(w(!0),C(ee,null,ce(t.items,o=>(w(),C("div",{key:o.key,"data-testid":"sort-skin-item","data-tone":o.tone,class:"flex flex-1 flex-col items-center justify-end",style:{height:"100%"}},[t.showLabels?(w(),C("span",qb,M(o.value),1)):re("",!0),h("div",{class:fe(["w-full rounded-t-mark transition-[height,background-color] duration-150 ease-out",f(Ze)[o.tone]]),style:Tt({height:f(Vr)(o.value,e.maxValue)})},null,6)],8,zb))),128))]))}}),Gb={class:"flex min-h-[280px] flex-1 flex-col rounded-xl bg-surface-alt p-3"},Wb={class:"flex flex-1 items-end gap-[2px] sm:gap-1"},Xb=["data-tone"],Yb={key:0,"data-testid":"sort-skin-item-label",class:"nums mb-1 text-[10px] font-medium text-ink-faint sm:text-xs"},Jb=Z({__name:"SpinesSkin",props:{items:{},maxValue:{},showLabels:{type:Boolean}},setup(t){const e=t;return(n,s)=>(w(),C("div",Gb,[h("div",Wb,[(w(!0),C(ee,null,ce(t.items,o=>(w(),C("div",{key:o.key,"data-testid":"sort-skin-item","data-tone":o.tone,class:"flex flex-1 flex-col items-center justify-end",style:{height:"100%"}},[t.showLabels?(w(),C("span",Yb,M(o.value),1)):re("",!0),h("div",{class:fe(["relative w-full rounded-t-mark transition-[height,background-color] duration-150 ease-out",f(Ze)[o.tone]]),style:Tt({height:f(Vr)(o.value,e.maxValue)})},[...s[0]||(s[0]=[h("div",{class:"absolute inset-x-0 top-1/3 border-t border-line-strong"},null,-1)])],6)],8,Xb))),128))]),s[1]||(s[1]=h("div",{class:"border-t-2 border-line-strong"},null,-1))]))}}),Qb={class:"flex min-h-[280px] flex-1 items-end gap-[2px] rounded-xl bg-surface-alt p-3 sm:gap-1"},Zb=["data-tone"],ey={key:0,"data-testid":"sort-skin-item-label",class:"nums mb-1 text-[10px] font-medium text-ink-faint sm:text-xs"},ty=Z({__name:"PeopleSkin",props:{items:{},maxValue:{},showLabels:{type:Boolean}},setup(t){const e=t;return(n,s)=>(w(),C("div",Qb,[(w(!0),C(ee,null,ce(t.items,o=>(w(),C("div",{key:o.key,"data-testid":"sort-skin-item","data-tone":o.tone,class:"flex flex-1 flex-col items-center justify-end",style:{height:"100%"}},[t.showLabels?(w(),C("span",ey,M(o.value),1)):re("",!0),h("div",{class:"flex w-full flex-col items-center transition-[height] duration-150 ease-out",style:Tt({height:f(Vr)(o.value,e.maxValue)})},[h("div",{class:fe(["aspect-square w-[55%] flex-none rounded-full transition-colors duration-150 ease-out",f(Ze)[o.tone]])},null,2),h("div",{class:fe(["w-full min-h-0 flex-1 rounded-t-mark transition-colors duration-150 ease-out",f(Ze)[o.tone]])},null,2)],4)],8,Zb))),128))]))}}),ny={class:"flex min-h-[280px] flex-1 flex-col gap-px rounded-xl bg-surface-alt p-3"},sy=["data-tone"],oy={class:"nums w-6 shrink-0 text-right text-[10px] text-ink-faint"},ay={class:"relative h-4 min-h-0 flex-1 rounded-mark border-b border-line"},ry=Z({__name:"CarsSkin",props:{items:{},maxValue:{},showLabels:{type:Boolean}},setup(t){const e=t;function n(s,o){return`${s/Math.max(o,1)*92+4}%`}return(s,o)=>(w(),C("div",ny,[(w(!0),C(ee,null,ce(t.items,a=>(w(),C("div",{key:a.key,"data-testid":"sort-skin-item","data-tone":a.tone,class:"relative flex min-h-0 flex-1 items-center gap-2"},[h("span",oy,M(a.index),1),h("div",ay,[h("div",{class:fe(["absolute top-1/2 h-3 w-5 -translate-y-1/2 rounded-full transition-[left] duration-150 ease-out",f(Ze)[a.tone]]),style:Tt({left:n(a.value,e.maxValue)})},null,6),t.showLabels?(w(),C("span",{key:0,class:"nums absolute top-1/2 -translate-x-1/2 -translate-y-full text-[9px] text-ink-faint",style:Tt({left:n(a.value,e.maxValue)})},M(a.value),5)):re("",!0)])],8,sy))),128))]))}}),iy={class:"flex min-h-[280px] flex-1 flex-wrap items-center gap-2 rounded-xl bg-surface-alt p-3"},ly=["data-tone"],uy=Z({__name:"CardsSkin",props:{items:{},maxValue:{},showLabels:{type:Boolean}},setup(t){const e=t,n=E(()=>{const s=e.items.length;return s<=20?{card:"h-20 w-14",text:"text-2xl"}:s<=50?{card:"h-16 w-11",text:"text-lg"}:{card:"h-12 w-8",text:"text-sm"}});return(s,o)=>(w(),C("div",iy,[(w(!0),C(ee,null,ce(t.items,a=>(w(),C("div",{key:a.key,"data-testid":"sort-skin-item","data-tone":a.tone,class:fe(["flex shrink-0 items-center justify-center rounded-lg border-2 shadow-sm",[n.value.card,f(Ye)[a.tone],f(wt)[a.tone]]])},[h("span",{class:fe(["nums font-bold",[n.value.text,f(Tn)[a.tone]]])},M(a.value),3)],10,ly))),128))]))}}),cs={bars:{name:"Bars",description:"The classic bar chart — value is height.",component:Kb,encoding:"magnitude"},spines:{name:"Book spines",description:"A shelf of books — taller spine, bigger value.",component:Jb,encoding:"magnitude"},people:{name:"People",description:"People lining up by height — taller person, bigger value.",component:ty,encoding:"magnitude"},cars:{name:"Race cars",description:"One lane per element — further along the track, bigger value.",component:ry,encoding:"position",maxComfortableN:40,showsRail:!1},cards:{name:"Cards",description:"A hand of cards — the printed number is the value, not the size.",component:uy,encoding:"glyph",maxComfortableN:30,showsRail:!1}},No="bars",cy={class:"mb-3 flex flex-wrap items-center gap-x-4 gap-y-2"},dy={class:"text-xs font-semibold uppercase tracking-wider text-ink-faint"},py=["aria-label"],yo=Z({__name:"SortStage",props:{array:{},comparing:{default:()=>[]},swapping:{default:()=>[]},sorted:{default:()=>[]},maxValue:{default:1},title:{default:"Visualization"},showLegend:{type:Boolean,default:!0},skin:{default:No}},setup(t){const e=t,n=E(()=>cs[e.skin]??cs[No]),s=E(()=>e.array.length<=25),o=E(()=>{const i={comparing:new Set(e.comparing),swapping:new Set(e.swapping),sorted:new Set(e.sorted)};return e.array.map((l,u)=>({index:u,value:l,key:u,tone:Hb(i,u)}))}),a=kn([{tone:"idle",label:"Unsorted"},{tone:"probe",label:"Comparing"},{tone:"active",label:"Swapping"},{tone:"settled",label:"Sorted"}]),r=E(()=>e.swapping.length>0?`Swapping values at positions ${e.swapping.join(", ")}`:e.comparing.length>0?`Comparing values at positions ${e.comparing.join(", ")}`:e.array.length>0&&e.sorted.length===e.array.length?`${n.value.name} view: array fully sorted`:`${n.value.name} view: ${e.array.length} elements, ${e.sorted.length} sorted so far`);return(i,l)=>(w(),W(ye,{class:"flex h-full flex-col"},{default:I(()=>[h("div",cy,[h("h2",dy,M(t.title),1),t.showLegend?(w(),W(Dn,{key:0,items:f(a)},null,8,["items"])):re("",!0)]),h("div",{role:"img","aria-label":r.value,class:"flex flex-1 flex-col"},[(w(),W(iu(n.value.component),{items:o.value,"max-value":t.maxValue,"show-labels":s.value},null,8,["items","max-value","show-labels"]))],8,py),n.value.showsRail!==!1?(w(),W(Vb,{key:0,length:t.array.length},null,8,["length"])):re("",!0)]),_:1}))}}),fy={class:"grid grid-cols-2 gap-2 sm:grid-cols-3"},hy={class:"mt-4 rounded-xl bg-surface-alt p-4"},my={class:"text-sm leading-relaxed text-ink-muted"},gy={key:0,class:"mt-2 text-xs text-warn"},vy=Z({__name:"SkinPicker",props:_n({count:{}},{modelValue:{required:!0},modelModifiers:{}}),emits:["update:modelValue"],setup(t){const e=t,n=Mn(t,"modelValue"),s=E(()=>Object.keys(cs)),o=E(()=>cs[n.value]),a=E(()=>{const i=o.value.maxComfortableN;return i!==void 0&&e.count>i});function r(i){n.value=i}return(i,l)=>(w(),W(ye,{title:"Skin"},{default:I(()=>[h("div",fy,[(w(!0),C(ee,null,ce(s.value,u=>(w(),W(te,{key:u,variant:"selector",active:u===n.value,onClick:c=>r(u)},{default:I(()=>[O(M(f(cs)[u].name),1)]),_:2},1032,["active","onClick"]))),128))]),h("div",hy,[h("p",my,M(o.value.description),1),a.value?(w(),C("p",gy,M(o.value.name)+" gets crowded above ~"+M(o.value.maxComfortableN)+" items — try Bars for a large array. ",1)):re("",!0)])]),_:1}))}}),by={class:"rounded-xl bg-surface-alt p-3 text-center"},yy={class:"nums font-mono text-xl font-bold text-ink sm:text-2xl"},wy={class:"mt-0.5 text-[11px] font-medium uppercase tracking-wide text-ink-faint"},Nt=Z({__name:"AvStatCell",props:{label:{},value:{}},setup(t){return(e,n)=>(w(),C("div",by,[h("div",yy,M(t.value),1),h("div",wy,M(t.label),1)]))}}),Sn=Z({__name:"AvStatusPill",props:{status:{},label:{default:""}},setup(t){const e=t,n={idle:"bg-surface-alt text-ink-muted",running:"bg-ok-soft text-ok-ink",paused:"bg-warn-soft text-warn-ink",done:"bg-accent-soft text-accent",error:"bg-danger-soft text-danger-ink"},s={idle:"Idle",running:"Running",paused:"Paused",done:"Done",error:"Error"},o=E(()=>n[e.status]),a=E(()=>e.label||s[e.status]);return(r,i)=>(w(),C("span",{class:fe(["rounded-full px-2.5 py-1 text-xs font-semibold",o.value])},M(a.value),3))}}),xy={class:"grid grid-cols-2 gap-2 sm:grid-cols-4"},wo=Z({__name:"StatsDisplay",props:{comparisons:{},swaps:{},steps:{},elapsedMs:{},status:{}},setup(t){const e=t,n=E(()=>`${(e.elapsedMs/1e3).toFixed(2)}s`),s=E(()=>e.status==="done"?"Sorted":void 0),o=E(()=>[{label:"Comparisons",value:e.comparisons.toLocaleString()},{label:"Swaps",value:e.swaps.toLocaleString()},{label:"Steps",value:e.steps.toLocaleString()},{label:"Elapsed",value:n.value}]);return(a,r)=>(w(),W(ye,{title:"Stats"},{header:I(()=>[T(Sn,{status:t.status,label:s.value},null,8,["status","label"])]),default:I(()=>[h("div",xy,[(w(!0),C(ee,null,ce(o.value,i=>(w(),W(Nt,{key:i.label,label:i.label,value:i.value},null,8,["label","value"]))),128))])]),_:1}))}}),ky={class:"grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]"},Sy={class:"flex flex-col gap-4"},$y={key:0,class:"grid gap-4 lg:grid-cols-2"},Ey={class:"flex flex-col gap-4"},Cy={class:"flex flex-col gap-4"},Ay={key:1,class:"flex flex-col gap-4"},Ty=Z({__name:"SortingView",setup(t){const e=pl(),n=eo(),s=pl({syncUrl:!1,audio:!1}),o=B(!1),a=B(No);Zt({cmp:{ref:o,encode:c=>c?"1":null,decode:c=>c==="1"},algo2:{ref:s.algoKey,encode:c=>c,decode:c=>Ht(us,c)},skin:{ref:a,encode:c=>c===No?null:c,decode:c=>Ht(cs,c)}}),Re([e.baseArray,o],()=>{o.value&&s.setArray([...e.baseArray.value])},{immediate:!0}),Re(e.speed,c=>s.speed.value=c,{immediate:!0}),Re(o,c=>{c||s.reset()});function r(){e.run(),s.run()}const i=B(""),l=B(null);function u(){const{values:c,error:d}=Fn(i.value);l.value=d,d||e.setArray(c)}return Re(e.size,()=>{e.canEdit.value&&e.generate()}),Re(e.seed,()=>{e.canEdit.value&&e.generate()}),Re(e.algoKey,()=>{e.isDone.value&&e.reset()}),(c,d)=>(w(),C("div",ky,[h("div",Sy,[T(Rn,{modelValue:f(e).algoKey.value,"onUpdate:modelValue":d[0]||(d[0]=p=>f(e).algoKey.value=p),algorithms:f(us),columns:3,disabled:!f(e).canEdit.value},null,8,["modelValue","algorithms","disabled"]),o.value?(w(),W(Rn,{key:0,modelValue:f(s).algoKey.value,"onUpdate:modelValue":d[1]||(d[1]=p=>f(s).algoKey.value=p),title:"Compare against",algorithms:f(us),columns:3,disabled:!f(e).canEdit.value},null,8,["modelValue","algorithms","disabled"])):re("",!0),T(vy,{modelValue:a.value,"onUpdate:modelValue":d[2]||(d[2]=p=>a.value=p),count:f(e).array.value.length},null,8,["modelValue","count"]),T(xb,{size:f(e).size.value,"onUpdate:size":d[3]||(d[3]=p=>f(e).size.value=p),speed:f(e).speed.value,"onUpdate:speed":d[4]||(d[4]=p=>f(e).speed.value=p),compare:o.value,"onUpdate:compare":d[5]||(d[5]=p=>o.value=p),status:f(e).status.value,"can-edit":f(e).canEdit.value,"is-running":f(e).isRunning.value,"is-paused":f(e).isPaused.value,sound:f(n).enabled.value,volume:f(n).volume.value,"has-sound-cues":f(e).hasSoundCues.value,onGenerate:d[6]||(d[6]=p=>f(e).generate()),onRun:d[7]||(d[7]=p=>f(e).run()),onRunBoth:d[8]||(d[8]=p=>r()),onPause:d[9]||(d[9]=p=>{f(e).pause(),f(s).pause()}),onReset:d[10]||(d[10]=p=>{f(e).reset(),f(s).reset()}),"onUpdate:sound":d[11]||(d[11]=p=>f(n).toggle()),"onUpdate:volume":d[12]||(d[12]=p=>f(n).setVolume(p))},null,8,["size","speed","compare","status","can-edit","is-running","is-paused","sound","volume","has-sound-cues"]),T(Ic,{custom:i.value,"onUpdate:custom":d[13]||(d[13]=p=>i.value=p),seed:f(e).seed.value,error:l.value,"can-edit":f(e).canEdit.value,"onUpdate:seed":d[14]||(d[14]=p=>f(e).seed.value=p),onApply:d[15]||(d[15]=p=>u()),onRandomize:d[16]||(d[16]=p=>f(e).randomizeSeed())},null,8,["custom","seed","error","can-edit"]),T(xn,{cursor:f(e).cursor.value,"buffered-count":f(e).bufferedCount.value,"fully-buffered":f(e).fullyBuffered.value,"can-step-back":f(e).canStepBack.value,"can-step-forward":f(e).canStepForward.value,onSeek:d[17]||(d[17]=p=>f(e).seek(p)),onStepBack:d[18]||(d[18]=p=>f(e).stepBack()),onStepForward:d[19]||(d[19]=p=>f(e).stepForward()),onSkipToEnd:d[20]||(d[20]=p=>f(e).skipToEnd())},null,8,["cursor","buffered-count","fully-buffered","can-step-back","can-step-forward"]),T(ua,{lines:f(eb)[f(e).algoKey.value]??[],"active-line":f(e).activeLine.value,source:f(e).sourceCode.value.text,"source-file":f(e).sourceCode.value.file,"active-source-lines":f(e).activeSourceLines.value},null,8,["lines","active-line","source","source-file","active-source-lines"])]),o.value?(w(),C("div",$y,[h("div",Ey,[T(wo,{comparisons:f(e).stats.comparisons,swaps:f(e).stats.swaps,steps:f(e).stepCount.value,"elapsed-ms":f(e).elapsedMs.value,status:f(e).status.value},null,8,["comparisons","swaps","steps","elapsed-ms","status"]),T(yo,{class:"flex-1",title:f(e).currentAlgo.value.name,array:f(e).array.value,comparing:f(e).highlights.comparing,swapping:f(e).highlights.swapping,sorted:f(e).highlights.sorted,"max-value":f(e).maxValue.value,skin:a.value},null,8,["title","array","comparing","swapping","sorted","max-value","skin"])]),h("div",Cy,[T(wo,{comparisons:f(s).stats.comparisons,swaps:f(s).stats.swaps,steps:f(s).stepCount.value,"elapsed-ms":f(s).elapsedMs.value,status:f(s).status.value},null,8,["comparisons","swaps","steps","elapsed-ms","status"]),T(yo,{class:"flex-1",title:f(s).currentAlgo.value.name,"show-legend":!1,array:f(s).array.value,comparing:f(s).highlights.comparing,swapping:f(s).highlights.swapping,sorted:f(s).highlights.sorted,"max-value":f(s).maxValue.value,skin:a.value},null,8,["title","array","comparing","swapping","sorted","max-value","skin"])])])):(w(),C("div",Ay,[T(wo,{comparisons:f(e).stats.comparisons,swaps:f(e).stats.swaps,steps:f(e).stepCount.value,"elapsed-ms":f(e).elapsedMs.value,status:f(e).status.value},null,8,["comparisons","swaps","steps","elapsed-ms","status"]),T(yo,{class:"flex-1",array:f(e).array.value,comparing:f(e).highlights.comparing,swapping:f(e).highlights.swapping,sorted:f(e).highlights.sorted,"max-value":f(e).maxValue.value,skin:a.value},null,8,["array","comparing","swapping","sorted","max-value","skin"])]))]))}});function Oy(){const t=B(20),e=B(60),n=B("binary"),s=B(ze()),o=B(0),a=B([]),r=Ne({low:null,high:null,mid:null,checking:null}),i=B(null),l=Ne({comparisons:0});let u=[];const c=E(()=>na[n.value]),d=B(1);function p(P){const K=rt(s.value);return Array.from({length:P},()=>K.int(1,99)).sort((D,N)=>D-N)}function m(){r.low=null,r.high=null,r.mid=null,r.checking=null}function b(){l.comparisons=0}function g(P=rt(ze())){u.length!==0&&(o.value=u[P.int(0,u.length-1)])}function y(){const P=new Set(u);for(let K=0;K<=100;K++)if(!P.has(K)){o.value=K;return}o.value=-1}const v=bn({speed:e,createGenerator:()=>(a.value=[...u],m(),b(),i.value=null,c.value.generator([...u],o.value)),applyStep:P=>{a.value=P.array,r.low=P.low,r.high=P.high,r.mid=P.mid,r.checking=P.checking,i.value=P.foundIndex,l.comparisons=P.comparisons},clearStep:()=>{a.value=[...u],m(),b(),i.value=null}});function x(P=!1){u=p(t.value),a.value=[...u],d.value=Math.max(...u,1),v.reset(),P||g(rt(s.value))}function S(P){P.length!==0&&(u=[...P].sort((K,D)=>K-D),a.value=[...u],t.value=u.length,d.value=Math.max(...u,1),v.reset(),g(rt(s.value)))}function $(){s.value=ze(),x()}const{hydrated:R}=Zt(Bv({algoKey:n,size:t,speed:e,seed:s,target:o}));return x(R.has("target")),{size:t,speed:e,algoKey:n,seed:s,target:o,array:a,highlights:r,foundIndex:i,stats:l,maxValue:d,currentAlgo:c,status:v.status,isRunning:v.isRunning,isPaused:v.isPaused,isDone:v.isDone,canEdit:v.canEdit,delayMs:v.delayMs,elapsedMs:v.elapsedMs,stepCount:v.stepCount,cursor:v.cursor,bufferedCount:v.bufferedCount,fullyBuffered:v.fullyBuffered,current:v.current,canStepBack:v.canStepBack,canStepForward:v.canStepForward,generate:x,randomizeSeed:$,setArray:S,pickPresentTarget:g,pickMissingTarget:y,run:v.run,pause:v.pause,reset:v.reset,stepForward:v.stepForward,stepBack:v.stepBack,seek:v.seek,skipToEnd:v.skipToEnd}}const _y={class:"space-y-4"},My={class:"block"},Ry=["value","disabled"],jy={class:"mt-3 grid grid-cols-2 gap-2"},Iy={class:"mt-5 grid grid-cols-2 gap-2"},Dy=Z({__name:"SearchControls",props:{size:{},speed:{},target:{},status:{},canEdit:{type:Boolean},isRunning:{type:Boolean},isPaused:{type:Boolean}},emits:["update:size","update:speed","update:target","pick-present-target","pick-missing-target","generate","run","pause","reset"],setup(t,{emit:e}){const n=e,s=o=>n("update:target",Number(o.target.value));return(o,a)=>(w(),W(ye,{title:"Controls"},{default:I(()=>[h("div",_y,[T(He,{label:"Array size","model-value":t.size,min:10,max:50,disabled:!t.canEdit,"onUpdate:modelValue":a[0]||(a[0]=r=>n("update:size",r))},null,8,["model-value","disabled"]),T(He,{label:"Speed","model-value":t.speed,min:1,max:100,suffix:"%","onUpdate:modelValue":a[1]||(a[1]=r=>n("update:speed",r))},null,8,["model-value"]),h("label",My,[a[8]||(a[8]=h("div",{class:"mb-1.5 flex items-center justify-between text-sm"},[h("span",{class:"font-medium text-ink-muted"},"Target")],-1)),h("input",{type:"number",value:t.target,disabled:!t.canEdit,class:"nums w-full rounded-xl border border-line bg-surface-raised px-3 py-2 text-sm text-ink disabled:cursor-not-allowed disabled:opacity-50",onInput:s},null,40,Ry)])]),h("div",jy,[T(te,{variant:"quiet",disabled:!t.canEdit,onClick:a[2]||(a[2]=r=>n("pick-present-target"))},{default:I(()=>[...a[9]||(a[9]=[O(" Random present target ",-1)])]),_:1},8,["disabled"]),T(te,{variant:"quiet",disabled:!t.canEdit,onClick:a[3]||(a[3]=r=>n("pick-missing-target"))},{default:I(()=>[...a[10]||(a[10]=[O(" Random missing target ",-1)])]),_:1},8,["disabled"])]),h("div",Iy,[t.isRunning?(w(),W(te,{key:1,variant:"warning",class:"col-span-2",onClick:a[5]||(a[5]=r=>n("pause"))},{default:I(()=>[...a[12]||(a[12]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M6 4h4v16H6zM14 4h4v16h-4z"})],-1),O(" Pause ",-1)])]),_:1})):(w(),W(te,{key:0,variant:"primary",class:"col-span-2",onClick:a[4]||(a[4]=r=>n("run"))},{default:I(()=>[a[11]||(a[11]=h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M8 5v14l11-7z"})],-1)),O(" "+M(t.isPaused?"Resume":"Run"),1)]),_:1})),T(te,{variant:"neutral",onClick:a[6]||(a[6]=r=>n("reset"))},{default:I(()=>[...a[13]||(a[13]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.36 2.64L3 8"}),h("path",{d:"M3 3v5h5"})],-1),O(" Reset ",-1)])]),_:1}),T(te,{variant:"neutral",disabled:!t.canEdit,onClick:a[7]||(a[7]=r=>n("generate"))},{default:I(()=>[...a[14]||(a[14]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"})],-1),O(" Shuffle ",-1)])]),_:1},8,["disabled"])]),a[15]||(a[15]=h("p",{class:"mt-3 text-center text-xs text-ink-faint"}," Size, algorithm & target lock while a search is running. ",-1))]),_:1}))}}),Ly={class:"mb-3 flex flex-wrap items-center gap-x-4 gap-y-2"},Ny={class:"flex min-h-[280px] flex-1 items-end gap-[2px] rounded-xl bg-surface-alt p-3 sm:gap-1"},Py={key:0,class:"mb-1 text-[10px] font-medium text-ink-faint sm:text-xs"},By=Z({__name:"SearchBarChart",props:{array:{},low:{default:null},high:{default:null},checking:{default:null},foundIndex:{default:null},maxValue:{default:1}},setup(t){const e=t,n=E(()=>e.array.length<=25),s=E(()=>e.low!==null&&e.high!==null&&!(e.low===0&&e.high===e.array.length-1)),o=kn([{tone:"idle",label:"Default"},{tone:"trace",label:"Active range"},{tone:"probe",label:"Checking"},{tone:"settled",label:"Found"}]);function a(i){return e.foundIndex!==null&&i===e.foundIndex?Ze.settled:e.checking!==null&&i===e.checking?Ze.probe:s.value&&i>=e.low&&i<=e.high?Ze.trace:Ze.idle}function r(i){return`${i/e.maxValue*98+2}%`}return(i,l)=>(w(),W(ye,{class:"flex h-full flex-col"},{default:I(()=>[h("div",Ly,[l[0]||(l[0]=h("h2",{class:"text-xs font-semibold uppercase tracking-wider text-ink-faint"},"Visualization",-1)),T(Dn,{items:f(o)},null,8,["items"])]),h("div",Ny,[(w(!0),C(ee,null,ce(t.array,(u,c)=>(w(),C("div",{key:c,class:"flex flex-1 flex-col items-center justify-end",style:{height:"100%"}},[n.value?(w(),C("span",Py,M(u),1)):re("",!0),h("div",{class:fe(["w-full rounded-t-mark transition-[height,background-color] duration-150 ease-out",a(c)]),style:Tt({height:r(u)})},null,6)]))),128))])]),_:1}))}}),Fy={class:"grid grid-cols-3 gap-2"},Vy=Z({__name:"SearchStats",props:{comparisons:{},steps:{},elapsedMs:{},status:{},foundIndex:{default:null}},setup(t){const e=t,n=E(()=>`${(e.elapsedMs/1e3).toFixed(2)}s`),s=E(()=>[{label:"Comparisons",value:e.comparisons.toLocaleString()},{label:"Steps",value:e.steps.toLocaleString()},{label:"Elapsed",value:n.value}]),o=E(()=>e.status==="done"),a=E(()=>e.foundIndex!==null);return(r,i)=>(w(),W(ye,{title:"Stats"},{header:I(()=>[T(Sn,{status:t.status},null,8,["status"])]),default:I(()=>[o.value?(w(),C("div",{key:0,class:fe(["mb-3 rounded-xl p-3 text-center text-sm font-semibold",a.value?"bg-ok-soft text-ok-ink":"bg-warn-soft text-warn-ink"])},M(a.value?`Found at index ${t.foundIndex}`:"Not found"),3)):re("",!0),h("div",Fy,[(w(!0),C(ee,null,ce(s.value,l=>(w(),W(Nt,{key:l.label,label:l.label,value:l.value},null,8,["label","value"]))),128))])]),_:1}))}}),Hy={class:"grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]"},Uy={class:"flex flex-col gap-4"},zy={class:"flex flex-col gap-4"},qy=Z({__name:"SearchView",setup(t){const e=Oy(),n=B(""),s=B(null);function o(){const{values:a,error:r}=Fn(n.value);s.value=r,r||e.setArray(a)}return Re(e.size,()=>{e.canEdit.value&&e.generate()}),Re(e.seed,()=>{e.canEdit.value&&e.generate()}),Re(e.algoKey,()=>{e.isDone.value&&e.reset()}),(a,r)=>(w(),C("div",Hy,[h("div",Uy,[T(Rn,{modelValue:f(e).algoKey.value,"onUpdate:modelValue":r[0]||(r[0]=i=>f(e).algoKey.value=i),algorithms:f(na),columns:3,disabled:!f(e).canEdit.value},null,8,["modelValue","algorithms","disabled"]),T(Dy,{size:f(e).size.value,"onUpdate:size":r[1]||(r[1]=i=>f(e).size.value=i),speed:f(e).speed.value,"onUpdate:speed":r[2]||(r[2]=i=>f(e).speed.value=i),target:f(e).target.value,"onUpdate:target":r[3]||(r[3]=i=>f(e).target.value=i),status:f(e).status.value,"can-edit":f(e).canEdit.value,"is-running":f(e).isRunning.value,"is-paused":f(e).isPaused.value,onPickPresentTarget:r[4]||(r[4]=i=>f(e).pickPresentTarget()),onPickMissingTarget:r[5]||(r[5]=i=>f(e).pickMissingTarget()),onGenerate:r[6]||(r[6]=i=>f(e).generate()),onRun:r[7]||(r[7]=i=>f(e).run()),onPause:r[8]||(r[8]=i=>f(e).pause()),onReset:r[9]||(r[9]=i=>f(e).reset())},null,8,["size","speed","target","status","can-edit","is-running","is-paused"]),T(Ic,{custom:n.value,"onUpdate:custom":r[10]||(r[10]=i=>n.value=i),seed:f(e).seed.value,error:s.value,"can-edit":f(e).canEdit.value,"onUpdate:seed":r[11]||(r[11]=i=>f(e).seed.value=i),onApply:r[12]||(r[12]=i=>o()),onRandomize:r[13]||(r[13]=i=>f(e).randomizeSeed())},null,8,["custom","seed","error","can-edit"]),T(xn,{cursor:f(e).cursor.value,"buffered-count":f(e).bufferedCount.value,"fully-buffered":f(e).fullyBuffered.value,"can-step-back":f(e).canStepBack.value,"can-step-forward":f(e).canStepForward.value,onSeek:r[14]||(r[14]=i=>f(e).seek(i)),onStepBack:r[15]||(r[15]=i=>f(e).stepBack()),onStepForward:r[16]||(r[16]=i=>f(e).stepForward()),onSkipToEnd:r[17]||(r[17]=i=>f(e).skipToEnd())},null,8,["cursor","buffered-count","fully-buffered","can-step-back","can-step-forward"])]),h("div",zy,[T(Vy,{comparisons:f(e).stats.comparisons,steps:f(e).stepCount.value,"elapsed-ms":f(e).elapsedMs.value,status:f(e).status.value,"found-index":f(e).foundIndex.value},null,8,["comparisons","steps","elapsed-ms","status","found-index"]),T(By,{class:"flex-1",array:f(e).array.value,low:f(e).highlights.low,high:f(e).highlights.high,checking:f(e).highlights.checking,"found-index":f(e).foundIndex.value,"max-value":f(e).maxValue.value},null,8,["array","low","high","checking","found-index","max-value"])])]))}}),Jn=15,Cs=25,ho=(t,e)=>`${t},${e}`;function Ky(){const t=B(60),e=B("bfs"),n=Ne(new Set),s=Ne({row:Math.floor(Jn/2),col:0}),o=Ne({row:Math.floor(Jn/2),col:Cs-1}),a=B(ze());Zt(Fv({algoKey:e,speed:t,seed:a,start:rl(s),end:rl(o)},{rows:Jn,cols:Cs}));const r=B([]),i=B([]),l=B([]),u=Ne({visitedCount:0,pathLength:0}),c=E(()=>sa[e.value]);function d(P,K){return s.row===P&&s.col===K}function p(P,K){return o.row===P&&o.col===K}function m(){const P=Array.from({length:Jn},()=>Array(Cs).fill(0));for(const K of n){const[D,N]=K.split(",").map(Number);P[D][N]=1}return P}function b(){r.value=[],i.value=[],l.value=[]}function g(){u.visitedCount=0,u.pathLength=0}const y=bn({speed:t,createGenerator:()=>(b(),g(),c.value.generator(m(),{...s},{...o})),applyStep:P=>{r.value=P.visited,i.value=P.frontier,l.value=P.path,u.visitedCount=P.visited.length,u.pathLength=P.path.length},clearStep:()=>{b(),g()}});function v(P,K){if(!y.canEdit.value||d(P,K)||p(P,K))return;const D=ho(P,K);n.has(D)?n.delete(D):n.add(D),y.isDone.value&&y.reset()}function x(){y.canEdit.value&&(n.clear(),y.reset())}function S(P,K){y.canEdit.value&&(p(P,K)||n.has(ho(P,K))||(s.row=P,s.col=K,y.reset()))}function $(P,K){y.canEdit.value&&(d(P,K)||n.has(ho(P,K))||(o.row=P,o.col=K,y.reset()))}function R(P=.25){if(!y.canEdit.value)return;const K=rt(a.value);n.clear();for(let D=0;D<Jn;D++)for(let N=0;N<Cs;N++)d(D,N)||p(D,N)||K.next()<P&&n.add(ho(D,N));y.reset()}return{rows:Jn,cols:Cs,speed:t,algoKey:e,walls:n,start:s,end:o,seed:a,visited:r,frontier:i,path:l,stats:u,currentAlgo:c,status:y.status,isRunning:y.isRunning,isPaused:y.isPaused,isDone:y.isDone,canEdit:y.canEdit,delayMs:y.delayMs,elapsedMs:y.elapsedMs,stepCount:y.stepCount,cursor:y.cursor,bufferedCount:y.bufferedCount,fullyBuffered:y.fullyBuffered,current:y.current,canStepBack:y.canStepBack,canStepForward:y.canStepForward,toggleWall:v,clearWalls:x,placeStart:S,placeEnd:$,randomizeWalls:R,run:y.run,pause:y.pause,reset:y.reset,stepForward:y.stepForward,stepBack:y.stepBack,seek:y.seek,skipToEnd:y.skipToEnd}}const Gy={class:"mt-5 grid grid-cols-2 gap-2"},Wy=Z({__name:"PathfindingControls",props:{speed:{},status:{},canEdit:{type:Boolean},isRunning:{type:Boolean},isPaused:{type:Boolean}},emits:["update:speed","run","pause","reset","clear-walls","randomize-walls"],setup(t,{emit:e}){const n=e;return(s,o)=>(w(),W(ye,{title:"Controls"},{default:I(()=>[T(He,{label:"Speed","model-value":t.speed,min:1,max:100,suffix:"%","onUpdate:modelValue":o[0]||(o[0]=a=>n("update:speed",a))},null,8,["model-value"]),h("div",Gy,[t.isRunning?(w(),W(te,{key:1,variant:"warning",class:"col-span-2",onClick:o[2]||(o[2]=a=>n("pause"))},{default:I(()=>[...o[7]||(o[7]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M6 4h4v16H6zM14 4h4v16h-4z"})],-1),O(" Pause ",-1)])]),_:1})):(w(),W(te,{key:0,variant:"primary",class:"col-span-2",onClick:o[1]||(o[1]=a=>n("run"))},{default:I(()=>[o[6]||(o[6]=h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M8 5v14l11-7z"})],-1)),O(" "+M(t.isPaused?"Resume":"Run"),1)]),_:1})),T(te,{variant:"neutral",onClick:o[3]||(o[3]=a=>n("reset"))},{default:I(()=>[...o[8]||(o[8]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.36 2.64L3 8"}),h("path",{d:"M3 3v5h5"})],-1),O(" Reset ",-1)])]),_:1}),T(te,{variant:"neutral",disabled:!t.canEdit,onClick:o[4]||(o[4]=a=>n("clear-walls"))},{default:I(()=>[...o[9]||(o[9]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m2 0-1 14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1L5 6"})],-1),O(" Clear Walls ",-1)])]),_:1},8,["disabled"]),T(te,{variant:"neutral",disabled:!t.canEdit,class:"col-span-2",onClick:o[5]||(o[5]=a=>n("randomize-walls"))},{default:I(()=>[...o[10]||(o[10]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"})],-1),O(" Random Walls ",-1)])]),_:1},8,["disabled"])]),o[11]||(o[11]=h("p",{class:"mt-3 text-center text-xs text-ink-faint"}," Walls, start, and end lock while a search is running. ",-1))]),_:1}))}}),Xy={class:"mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2"},Yy={class:"mb-3 grid grid-cols-3 gap-2"},Jy=["aria-label"],Qy=["data-key","tabindex","aria-label","onPointerdown","onPointerenter","onKeydown"],Zy={key:0,class:"flex h-[70%] w-[70%] items-center justify-center rounded-full bg-ok text-[8px] font-bold text-ink-inverse shadow"},ew={key:1,class:"flex h-[70%] w-[70%] items-center justify-center rounded-full bg-danger text-[8px] font-bold text-ink-inverse shadow"},tw=Z({__name:"GridCanvas",props:{rows:{},cols:{},walls:{},start:{},end:{},visited:{default:()=>[]},frontier:{default:()=>[]},path:{default:()=>[]},canEdit:{type:Boolean}},emits:["toggle-wall","place-start","place-end"],setup(t,{emit:e}){const n=t,s=e,o=(L,J)=>`${L},${J}`,a=B("wall"),r={wall:"Draw Walls",start:"Move Start",end:"Move End"},i=Object.entries(r),l=E(()=>new Set(n.visited.map(L=>o(L.row,L.col)))),u=E(()=>new Set(n.frontier.map(L=>o(L.row,L.col)))),c=E(()=>new Set(n.path.map(L=>o(L.row,L.col)))),d=E(()=>{const L=[];for(let J=0;J<n.rows;J++){const ue=[];for(let G=0;G<n.cols;G++)ue.push({row:J,col:G,key:o(J,G)});L.push(ue)}return L});function p(L,J){return n.start.row===L&&n.start.col===J}function m(L,J){return n.end.row===L&&n.end.col===J}const b=kn([{tone:"blocked",label:"Wall"},{tone:"probe",label:"Frontier"},{tone:"settled",label:"Visited"},{tone:"trace",label:"Path"}]);function g(L){const J=L.key;return n.walls.has(J)?Ze.blocked:c.value.has(J)?Ze.trace:u.value.has(J)?Ze.probe:l.value.has(J)?Ze.settled:"bg-surface-alt"}function y(L){return p(L.row,L.col)?"start":m(L.row,L.col)?"end":n.walls.has(L.key)?"wall":c.value.has(L.key)?"path":u.value.has(L.key)?"frontier":l.value.has(L.key)?"visited":"empty"}function v(L){return`Row ${L.row+1}, column ${L.col+1}, ${y(L)}`}const x=E(()=>`Pathfinding grid, ${r[a.value]} mode`),S=B(!1);let $=!0;function R(){S.value=!1}Er(()=>{window.addEventListener("pointerup",R),window.addEventListener("pointercancel",R)}),Cr(()=>{window.removeEventListener("pointerup",R),window.removeEventListener("pointercancel",R)});const P=B({row:0,col:0}),K=B(null),D=(L,J)=>Math.min(Math.max(L,0),J-1);function N(L,J){var ue,G;P.value={row:L,col:J},(G=(ue=K.value)==null?void 0:ue.querySelector(`[data-key="${L},${J}"]`))==null||G.focus()}function j(L,J,ue){N(D(L.row+J,n.rows),D(L.col+ue,n.cols))}function me(L){if(n.canEdit){if(P.value={row:L.row,col:L.col},a.value==="start"){s("place-start",{row:L.row,col:L.col});return}if(a.value==="end"){s("place-end",{row:L.row,col:L.col});return}p(L.row,L.col)||m(L.row,L.col)||($=!n.walls.has(L.key),s("toggle-wall",{row:L.row,col:L.col}),S.value=!0)}}function Se(L,J){var ue,G;(G=(ue=L.currentTarget).releasePointerCapture)==null||G.call(ue,L.pointerId),me(J)}function z(L){me(L),S.value=!1}function ae(L){if(!n.canEdit||a.value!=="wall"||!S.value||p(L.row,L.col)||m(L.row,L.col))return;n.walls.has(L.key)!==$&&s("toggle-wall",{row:L.row,col:L.col})}return(L,J)=>(w(),W(ye,{class:"flex h-full flex-col"},{default:I(()=>[h("div",Xy,[J[1]||(J[1]=h("h2",{class:"text-xs font-semibold uppercase tracking-wider text-ink-faint"},"Grid",-1)),T(Dn,{items:f(b)},null,8,["items"])]),h("div",Yy,[(w(!0),C(ee,null,ce(f(i),([ue,G])=>(w(),W(te,{key:ue,variant:"toggle",active:a.value===ue,disabled:!t.canEdit,onClick:ie=>a.value=ue},{default:I(()=>[O(M(G),1)]),_:2},1032,["active","disabled","onClick"]))),128))]),h("div",{ref_key:"gridEl",ref:K,role:"grid","aria-label":x.value,"aria-describedby":"grid-help",class:fe(["grid flex-1 select-none gap-px rounded-xl bg-line p-1",t.canEdit?"touch-none":""]),style:Tt({gridTemplateColumns:`repeat(${t.cols}, minmax(0, 1fr))`,gridTemplateRows:`repeat(${t.rows}, minmax(0, 1fr))`,aspectRatio:`${t.cols} / ${t.rows}`}),onDragstart:J[0]||(J[0]=nn(()=>{},["prevent"]))},[(w(!0),C(ee,null,ce(d.value,(ue,G)=>(w(),C("div",{key:G,role:"row",class:"contents"},[(w(!0),C(ee,null,ce(ue,ie=>(w(),C("div",{key:ie.key,role:"gridcell","data-key":ie.key,tabindex:P.value.row===ie.row&&P.value.col===ie.col?0:-1,"aria-label":v(ie),class:fe(["relative flex items-center justify-center rounded-mark transition-colors duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent",[g(ie),t.canEdit?"cursor-pointer":"cursor-default"]]),onPointerdown:nn($e=>Se($e,ie),["prevent"]),onPointerenter:$e=>ae(ie),onKeydown:[jt(nn($e=>j(ie,-1,0),["prevent"]),["up"]),jt(nn($e=>j(ie,1,0),["prevent"]),["down"]),jt(nn($e=>j(ie,0,-1),["prevent"]),["left"]),jt(nn($e=>j(ie,0,1),["prevent"]),["right"]),jt(nn($e=>N(ie.row,0),["prevent"]),["home"]),jt(nn($e=>N(ie.row,t.cols-1),["prevent"]),["end"]),jt(nn($e=>z(ie),["prevent"]),["space"]),jt($e=>z(ie),["enter"])]},[p(ie.row,ie.col)?(w(),C("span",Zy,"S")):m(ie.row,ie.col)?(w(),C("span",ew,"E")):re("",!0)],42,Qy))),128))]))),128))],46,Jy),J[2]||(J[2]=h("p",{id:"grid-help",class:"mt-3 text-center text-xs text-ink-faint"}," Drag or press Space to draw walls. Arrow keys move, Enter places. Switch mode to relocate start/end. ",-1))]),_:1}))}}),nw={class:"grid grid-cols-3 gap-2"},sw={key:0,class:"mt-3 rounded-xl bg-ok-soft px-3 py-2 text-center text-sm font-semibold text-ok-ink"},ow={key:1,class:"mt-3 rounded-xl bg-warn-soft px-3 py-2 text-center text-sm font-semibold text-warn-ink"},aw=Z({__name:"PathfindingStats",props:{visitedCount:{},pathLength:{},elapsedMs:{},status:{}},setup(t){const e=t,n=E(()=>`${(e.elapsedMs/1e3).toFixed(2)}s`),s=E(()=>e.status==="done"?"Finished":void 0),o=E(()=>[{label:"Visited",value:e.visitedCount.toLocaleString()},{label:"Path Length",value:e.pathLength.toLocaleString()},{label:"Elapsed",value:n.value}]),a=E(()=>e.status==="done"&&e.pathLength>0),r=E(()=>e.status==="done"&&e.pathLength===0),i=E(()=>Math.max(e.pathLength-1,0));return(l,u)=>(w(),W(ye,{title:"Stats"},{header:I(()=>[T(Sn,{status:t.status,label:s.value},null,8,["status","label"])]),default:I(()=>[h("div",nw,[(w(!0),C(ee,null,ce(o.value,c=>(w(),W(Nt,{key:c.label,label:c.label,value:c.value},null,8,["label","value"]))),128))]),a.value?(w(),C("div",sw," Path found ("+M(i.value)+" steps) ",1)):r.value?(w(),C("div",ow," No path exists ")):re("",!0)]),_:1}))}}),rw={class:"grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]"},iw={class:"flex flex-col gap-4"},lw={class:"flex flex-col gap-4"},uw=Z({__name:"PathfindingView",setup(t){const e=Ky();return Re(e.algoKey,()=>{e.isDone.value&&e.reset()}),(n,s)=>(w(),C("div",rw,[h("div",iw,[T(Rn,{modelValue:f(e).algoKey.value,"onUpdate:modelValue":s[0]||(s[0]=o=>f(e).algoKey.value=o),algorithms:f(sa),columns:3,disabled:!f(e).canEdit.value},null,8,["modelValue","algorithms","disabled"]),T(Wy,{speed:f(e).speed.value,"onUpdate:speed":s[1]||(s[1]=o=>f(e).speed.value=o),status:f(e).status.value,"can-edit":f(e).canEdit.value,"is-running":f(e).isRunning.value,"is-paused":f(e).isPaused.value,onRun:s[2]||(s[2]=o=>f(e).run()),onPause:s[3]||(s[3]=o=>f(e).pause()),onReset:s[4]||(s[4]=o=>f(e).reset()),onClearWalls:s[5]||(s[5]=o=>f(e).clearWalls()),onRandomizeWalls:s[6]||(s[6]=o=>f(e).randomizeWalls())},null,8,["speed","status","can-edit","is-running","is-paused"]),T(xn,{cursor:f(e).cursor.value,"buffered-count":f(e).bufferedCount.value,"fully-buffered":f(e).fullyBuffered.value,"can-step-back":f(e).canStepBack.value,"can-step-forward":f(e).canStepForward.value,onSeek:s[7]||(s[7]=o=>f(e).seek(o)),onStepBack:s[8]||(s[8]=o=>f(e).stepBack()),onStepForward:s[9]||(s[9]=o=>f(e).stepForward()),onSkipToEnd:s[10]||(s[10]=o=>f(e).skipToEnd())},null,8,["cursor","buffered-count","fully-buffered","can-step-back","can-step-forward"])]),h("div",lw,[T(aw,{"visited-count":f(e).stats.visitedCount,"path-length":f(e).stats.pathLength,"elapsed-ms":f(e).elapsedMs.value,status:f(e).status.value},null,8,["visited-count","path-length","elapsed-ms","status"]),T(tw,{class:"flex-1",rows:f(e).rows,cols:f(e).cols,walls:f(e).walls,start:f(e).start,end:f(e).end,visited:f(e).visited.value,frontier:f(e).frontier.value,path:f(e).path.value,"can-edit":f(e).canEdit.value,onToggleWall:s[11]||(s[11]=o=>f(e).toggleWall(o.row,o.col)),onPlaceStart:s[12]||(s[12]=o=>f(e).placeStart(o.row,o.col)),onPlaceEnd:s[13]||(s[13]=o=>f(e).placeEnd(o.row,o.col))},null,8,["rows","cols","walls","start","end","visited","frontier","path","can-edit"])])]))}});let cw=1;function ja(t){return{id:cw++,value:t,left:null,right:null}}function Et(t){return t?{id:t.id,value:t.value,left:Et(t.left),right:Et(t.right)}:null}function*fl(t,e){const n=Et(t);if(!n){const o=ja(e);yield{tree:Et(o),visiting:o.id,phase:"inserted",done:!0};return}let s=n;for(;;)if(yield{tree:Et(n),visiting:s.id,phase:"searching",done:!1},e<s.value){if(!s.left){s.left=ja(e),yield{tree:Et(n),visiting:s.left.id,phase:"inserted",done:!0};return}s=s.left}else{if(!s.right){s.right=ja(e),yield{tree:Et(n),visiting:s.right.id,phase:"inserted",done:!0};return}s=s.right}}function*dw(t,e){const n=Et(t);let s=n,o=null;for(;s&&s.value!==e;)yield{tree:Et(n),visiting:s.id,phase:"searching",done:!1},o=s,s=e<s.value?s.left:s.right;if(!s){yield{tree:Et(n),visiting:null,phase:"not-found",done:!0};return}yield{tree:Et(n),visiting:s.id,phase:"removing",done:!1};const a=s.id;if(s.left&&s.right){let r=s,i=s.right;for(;i.left;)r=i,i=i.left;s.value=i.value,r.left===i?r.left=i.right:r.right=i.right}else{const r=s.left||s.right;if(!o){yield{tree:r?Et(r):null,visiting:null,phase:"deleted",done:!0};return}o.left===s?o.left=r:o.right=r}yield{tree:Et(n),visiting:a,phase:"deleted",done:!0}}function pw(){const t=B(null),e=B("idle"),n=B(60),s=Ne({comparisons:0,steps:0}),o=B(null),a=B(null),r=B(ze());let i=null;const l=Nr(n),u=E(()=>e.value!=="running");function c(){i!==null&&(clearTimeout(i),i=null)}function d(){s.comparisons=0,s.steps=0}function p(x){t.value=x.tree,o.value=x.visiting??null,a.value=x.phase,x.phase==="searching"&&(s.comparisons+=1),s.steps+=1}function m(x,S){d(),e.value="running";function $(){const{value:R,done:P}=x.next();if(P||!R){e.value="done";return}if(p(R),R.done){e.value="done";return}i=setTimeout($,l.value)}$()}function b(x){u.value&&(typeof x!="number"||!Number.isFinite(x)||m(fl(t.value,x)))}function g(x){u.value&&(typeof x!="number"||!Number.isFinite(x)||m(dw(t.value,x)))}function y(){c(),t.value=null,o.value=null,a.value=null,d(),e.value="idle"}function v(x){if(!u.value)return;c();const S=Math.min(Math.max(0,Math.floor(x)),200),$=new Set;let R=t.value,P=0;const K=rt(r.value);for(;$.size<S&&P<S*50+100;){P+=1;const D=K.int(1,999);if($.has(D))continue;$.add(D);let N;for(const j of fl(R,D))N=j;R=N.tree}t.value=R,o.value=null,a.value=null,d(),e.value="idle"}return Ko(c),{tree:t,status:e,speed:n,stats:s,visiting:o,phase:a,seedValue:r,canEdit:u,insert:b,remove:g,reset:y,seed:v}}const fw={class:"block"},hw=["disabled"],mw={class:"mt-3 grid grid-cols-2 gap-2"},gw={class:"mt-4 grid grid-cols-2 gap-2"},vw=Z({__name:"BstControls",props:{canEdit:{type:Boolean},speed:{}},emits:["insert","remove","seed","reset","update:speed"],setup(t,{emit:e}){const n=t,s=e,o=B(""),a=E(()=>String(o.value).trim()===""?!1:Number.isFinite(Number(o.value)));function r(){!a.value||!n.canEdit||(s("insert",Number(o.value)),o.value="")}function i(){!a.value||!n.canEdit||(s("remove",Number(o.value)),o.value="")}return(l,u)=>(w(),W(ye,{title:"BST Controls"},{default:I(()=>[h("label",fw,[u[4]||(u[4]=h("span",{class:"mb-1.5 block text-sm font-medium text-ink-muted"},"Value",-1)),js(h("input",{"onUpdate:modelValue":u[0]||(u[0]=c=>o.value=c),type:"number",placeholder:"e.g. 42",disabled:!t.canEdit,class:"w-full rounded-xl border border-line bg-surface-raised px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent disabled:cursor-not-allowed disabled:opacity-50",onKeyup:jt(r,["enter"])},null,40,hw),[[Ro,o.value]])]),h("div",mw,[T(te,{variant:"primary",disabled:!t.canEdit||!a.value,onClick:r},{default:I(()=>[...u[5]||(u[5]=[O(" Insert ",-1)])]),_:1},8,["disabled"]),T(te,{variant:"danger",disabled:!t.canEdit||!a.value,onClick:i},{default:I(()=>[...u[6]||(u[6]=[O(" Delete ",-1)])]),_:1},8,["disabled"])]),T(He,{label:"Speed",class:"mt-4","model-value":t.speed,min:1,max:100,suffix:"%","onUpdate:modelValue":u[1]||(u[1]=c=>s("update:speed",c))},null,8,["model-value"]),h("div",gw,[T(te,{variant:"neutral",disabled:!t.canEdit,onClick:u[2]||(u[2]=c=>s("seed",10))},{default:I(()=>[...u[7]||(u[7]=[O(" Seed random tree ",-1)])]),_:1},8,["disabled"]),T(te,{variant:"neutral",disabled:!t.canEdit,onClick:u[3]||(u[3]=c=>s("reset"))},{default:I(()=>[...u[8]||(u[8]=[O(" Reset ",-1)])]),_:1},8,["disabled"])]),u[9]||(u[9]=h("p",{class:"mt-3 text-center text-xs text-ink-faint"}," Controls lock while an insert/delete animation is playing. ",-1))]),_:1}))}}),bw=["viewBox"],yw=["x1","y1","x2","y2"],ww=["cx","cy"],xw=["x","y"],Dc=Z({__name:"TreeDiagram",props:{nodes:{},edges:{},viewBoxWidth:{default:600},viewBoxHeight:{default:320}},setup(t){const e=t,n={default:{fill:gt.idle,stroke:yt.idle},visiting:{fill:gt.probe,stroke:yt.probe},removing:{fill:gt.active,stroke:yt.active},inserted:{fill:gt.settled,stroke:yt.settled}};function s(a){return n[a??"default"]??n.default}function o(a){return e.nodes.find(r=>r.id===a)}return(a,r)=>(w(),C("svg",{viewBox:`0 0 ${t.viewBoxWidth} ${t.viewBoxHeight}`,class:"h-full w-full",preserveAspectRatio:"xMidYMin meet"},[(w(!0),C(ee,null,ce(t.edges,(i,l)=>{var u,c,d,p;return w(),C("line",{key:`edge-${l}`,x1:(u=o(i.from))==null?void 0:u.x,y1:(c=o(i.from))==null?void 0:c.y,x2:(d=o(i.to))==null?void 0:d.x,y2:(p=o(i.to))==null?void 0:p.y,class:"stroke-line","stroke-width":"2"},null,8,yw)}),128)),(w(!0),C(ee,null,ce(t.nodes,i=>(w(),C("g",{key:i.id},[h("circle",{cx:i.x,cy:i.y,r:"18","stroke-width":"2",class:fe(["transition-all duration-300",[s(i.state).fill,s(i.state).stroke]])},null,10,ww),h("text",{x:i.x,y:i.y,"text-anchor":"middle","dominant-baseline":"central",class:"select-none fill-ink-inverse text-xs font-semibold"},M(i.value),9,xw)]))),128))],8,bw))}}),kw={class:"grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]"},Sw={class:"flex flex-col gap-4"},$w={class:"flex flex-col gap-4"},Ew={class:"grid grid-cols-2 gap-2"},Cw={key:0,class:"text-sm text-ink-faint"},hl=50,ml=60,gl=40,vl=40,Aw=Z({__name:"BstView",setup(t){const e=pw();function n(c){const d=[],p=[];let m=0;function b(g,y){if(!g)return;b(g.left,y+1);const v=gl+m*hl,x=vl+y*ml;m+=1,d.push({id:g.id,x:v,y:x,value:g.value,node:g,depth:y}),b(g.right,y+1),g.left&&p.push({from:g.id,to:g.left.id}),g.right&&p.push({from:g.id,to:g.right.id})}return b(c,0),{nodes:d,edges:p,slotCount:m}}const s=E(()=>n(e.tree.value)),o=E(()=>s.value.nodes.map(c=>({id:c.id,x:c.x,y:c.y,value:c.value,state:c.id===e.visiting.value?a(e.phase.value):"default"})));function a(c){return c==="searching"?"visiting":c==="removing"?"removing":c==="inserted"||c==="deleted"?"inserted":"default"}const r=E(()=>s.value.edges),i=E(()=>Math.max(320,gl*2+s.value.slotCount*hl)),l=E(()=>{const c=s.value.nodes.reduce((d,p)=>Math.max(d,p.depth),0);return Math.max(200,vl*2+c*ml)}),u=E(()=>e.tree.value===null);return(c,d)=>(w(),C("div",kw,[h("div",Sw,[T(vw,{"can-edit":f(e).canEdit.value,speed:f(e).speed.value,onInsert:d[0]||(d[0]=p=>f(e).insert(p)),onRemove:d[1]||(d[1]=p=>f(e).remove(p)),onSeed:d[2]||(d[2]=p=>f(e).seed(p)),onReset:d[3]||(d[3]=p=>f(e).reset()),"onUpdate:speed":d[4]||(d[4]=p=>f(e).speed.value=p)},null,8,["can-edit","speed"])]),h("div",$w,[T(ye,{title:"Stats"},{header:I(()=>[T(Sn,{status:f(e).status.value},null,8,["status"])]),default:I(()=>[h("div",Ew,[T(Nt,{label:"Comparisons",value:String(f(e).stats.comparisons)},null,8,["value"]),T(Nt,{label:"Steps",value:String(f(e).stats.steps)},null,8,["value"])])]),_:1}),T(ye,{class:"flex min-h-[320px] flex-1 items-center justify-center"},{default:I(()=>[u.value?(w(),C("p",Cw," The tree is empty — insert a value to get started. ")):(w(),W(Dc,{key:1,nodes:o.value,edges:r.value,"view-box-width":i.value,"view-box-height":l.value,class:"max-h-[60vh]"},null,8,["nodes","edges","view-box-width","view-box-height"]))]),_:1})])]))}});function dr(t,e,n){return n?t<e:t>e}function*bl(t,e,n){const s=[...t,e];let o=s.length-1;for(;o>0;){const a=o-1>>1;if(yield{heap:[...s],comparing:[o,a],swapping:[],done:!1},dr(s[o],s[a],n))[s[o],s[a]]=[s[a],s[o]],yield{heap:[...s],comparing:[],swapping:[o,a],done:!1},o=a;else break}yield{heap:[...s],comparing:[],swapping:[],done:!0}}function*Tw(t,e){if(t.length===0){yield{heap:[],comparing:[],swapping:[],done:!0,extracted:null};return}const n=[...t],s=n[0],o=n.pop();if(n.length===0){yield{heap:[],comparing:[],swapping:[],done:!0,extracted:s};return}n[0]=o;let a=0;const r=n.length;for(;;){const i=2*a+1,l=2*a+2;let u=a;if(i<r&&(yield{heap:[...n],comparing:[u,i],swapping:[],done:!1},dr(n[i],n[u],e)&&(u=i)),l<r&&(yield{heap:[...n],comparing:[u,l],swapping:[],done:!1},dr(n[l],n[u],e)&&(u=l)),u===a)break;[n[a],n[u]]=[n[u],n[a]],yield{heap:[...n],comparing:[],swapping:[a,u],done:!1},a=u}yield{heap:[...n],comparing:[],swapping:[],done:!0,extracted:s}}function Ow(){const t=B([]),e=B(!0),n=B("idle"),s=B(60),o=Ne({comparing:[],swapping:[]}),a=Ne({comparisons:0,swaps:0,steps:0}),r=B(null),i=B(ze());let l=null;const u=Nr(s),c=E(()=>n.value!=="running");function d(){l!==null&&(clearTimeout(l),l=null)}function p(){a.comparisons=0,a.swaps=0,a.steps=0}function m(){o.comparing=[],o.swapping=[]}function b(R){t.value=R.heap,o.comparing=R.comparing,o.swapping=R.swapping,R.comparing.length>0&&(a.comparisons+=1),R.swapping.length>0&&(a.swaps+=1),a.steps+=1}function g(R,P){p(),m(),n.value="running";function K(){const{value:D,done:N}=R.next();if(N||!D){n.value="done";return}if(b(D),D.done){"extracted"in D&&(r.value=D.extracted),m(),n.value="done";return}l=setTimeout(K,u.value)}K()}function y(R){c.value&&(typeof R!="number"||!Number.isFinite(R)||g(bl(t.value,R,e.value)))}function v(){c.value&&g(Tw(t.value,e.value))}function x(){c.value&&(e.value=!e.value)}function S(){d(),t.value=[],r.value=null,m(),p(),n.value="idle"}function $(R){if(!c.value)return;d();const P=Math.min(Math.max(0,Math.floor(R)),200),K=rt(i.value);let D=t.value;for(let N=0;N<P;N++){const j=K.int(1,99);let me;for(const Se of bl(D,j,e.value))me=Se;D=me.heap}t.value=D,m(),p(),n.value="idle"}return Ko(d),{heap:t,isMinHeap:e,status:n,speed:s,highlights:o,stats:a,lastExtracted:r,seedValue:i,canEdit:c,insert:y,extractRoot:v,toggleMode:x,reset:S,seed:$}}const _w={class:"mb-4 flex items-center justify-between rounded-xl bg-surface-alt p-2"},Mw={class:"grid grid-cols-2 gap-1"},Rw={class:"block"},jw=["disabled"],Iw={class:"mt-3 grid grid-cols-2 gap-2"},Dw={class:"mt-4 grid grid-cols-2 gap-2"},Lw=Z({__name:"HeapControls",props:{canEdit:{type:Boolean},speed:{},isMinHeap:{type:Boolean}},emits:["insert","extract","toggle-mode","seed","reset","update:speed"],setup(t,{emit:e}){const n=t,s=e,o=B(""),a=E(()=>String(o.value).trim()===""?!1:Number.isFinite(Number(o.value)));function r(){!a.value||!n.canEdit||(s("insert",Number(o.value)),o.value="")}return(i,l)=>(w(),W(ye,{title:"Heap Controls"},{default:I(()=>[h("div",_w,[l[9]||(l[9]=h("span",{class:"pl-2 text-sm font-medium text-ink-muted"},"Mode",-1)),h("div",Mw,[T(te,{variant:"toggle",active:t.isMinHeap,disabled:!t.canEdit,onClick:l[0]||(l[0]=u=>!t.isMinHeap&&s("toggle-mode"))},{default:I(()=>[...l[7]||(l[7]=[O(" Min ",-1)])]),_:1},8,["active","disabled"]),T(te,{variant:"toggle",active:!t.isMinHeap,disabled:!t.canEdit,onClick:l[1]||(l[1]=u=>t.isMinHeap&&s("toggle-mode"))},{default:I(()=>[...l[8]||(l[8]=[O(" Max ",-1)])]),_:1},8,["active","disabled"])])]),h("label",Rw,[l[10]||(l[10]=h("span",{class:"mb-1.5 block text-sm font-medium text-ink-muted"},"Value",-1)),js(h("input",{"onUpdate:modelValue":l[2]||(l[2]=u=>o.value=u),type:"number",placeholder:"e.g. 42",disabled:!t.canEdit,class:"w-full rounded-xl border border-line bg-surface-raised px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent disabled:cursor-not-allowed disabled:opacity-50",onKeyup:jt(r,["enter"])},null,40,jw),[[Ro,o.value]])]),h("div",Iw,[T(te,{variant:"primary",disabled:!t.canEdit||!a.value,onClick:r},{default:I(()=>[...l[11]||(l[11]=[O(" Insert ",-1)])]),_:1},8,["disabled"]),T(te,{variant:"danger",disabled:!t.canEdit,onClick:l[3]||(l[3]=u=>s("extract"))},{default:I(()=>[O(" Extract "+M(t.isMinHeap?"Min":"Max"),1)]),_:1},8,["disabled"])]),T(He,{label:"Speed",class:"mt-4","model-value":t.speed,min:1,max:100,suffix:"%","onUpdate:modelValue":l[4]||(l[4]=u=>s("update:speed",u))},null,8,["model-value"]),h("div",Dw,[T(te,{variant:"neutral",disabled:!t.canEdit,onClick:l[5]||(l[5]=u=>s("seed",10))},{default:I(()=>[...l[12]||(l[12]=[O(" Seed random heap ",-1)])]),_:1},8,["disabled"]),T(te,{variant:"neutral",disabled:!t.canEdit,onClick:l[6]||(l[6]=u=>s("reset"))},{default:I(()=>[...l[13]||(l[13]=[O(" Reset ",-1)])]),_:1},8,["disabled"])]),l[14]||(l[14]=h("p",{class:"mt-3 text-center text-xs text-ink-faint"}," Controls lock while an insert/extract animation is playing. ",-1))]),_:1}))}}),Nw={class:"grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]"},Pw={class:"flex flex-col gap-4"},Bw={class:"flex flex-col gap-4"},Fw={class:"grid grid-cols-3 gap-2"},Vw={key:0,class:"mt-3 text-center text-xs text-ink-faint"},Hw={class:"nums font-mono font-semibold text-accent"},Uw={key:0,class:"text-sm text-ink-faint"},zw={key:0,class:"text-sm text-ink-faint"},qw={key:1,class:"flex flex-wrap gap-1.5"},Kw={class:"w-full bg-surface-raised/70 py-0.5 text-center text-[10px] font-medium text-ink-muted"},Gw={class:"nums py-1 font-mono text-sm font-semibold text-ink"},yl=50,wl=60,xl=40,kl=40,Ww=Z({__name:"HeapView",setup(t){const e={visiting:Ye.probe,inserted:Ye.settled,removing:Ye.rejected,default:"border-line"},n={visiting:wt.probe,inserted:wt.settled,removing:wt.rejected,default:"bg-surface-alt"},s=Ow();function o(p){const m=[],b=[];let g=0;const y=p.length;function v(x,S){if(x>=y)return;const $=2*x+1,R=2*x+2;v($,S+1);const P=xl+g*yl,K=kl+S*wl;g+=1,m.push({id:x,x:P,y:K,value:p[x],depth:S}),v(R,S+1),$<y&&b.push({from:x,to:$}),R<y&&b.push({from:x,to:R})}return v(0,0),{nodes:m,edges:b,slotCount:g}}const a=E(()=>o(s.heap.value));function r(p){return s.highlights.comparing.includes(p)?"visiting":s.highlights.swapping.includes(p)?"inserted":"default"}const i=E(()=>a.value.nodes.map(p=>({id:p.id,x:p.x,y:p.y,value:p.value,state:r(p.id)}))),l=E(()=>a.value.edges),u=E(()=>Math.max(320,xl*2+a.value.slotCount*yl)),c=E(()=>{const p=a.value.nodes.reduce((m,b)=>Math.max(m,b.depth),0);return Math.max(200,kl*2+p*wl)}),d=E(()=>s.heap.value.length===0);return(p,m)=>(w(),C("div",Nw,[h("div",Pw,[T(Lw,{"can-edit":f(s).canEdit.value,speed:f(s).speed.value,"is-min-heap":f(s).isMinHeap.value,onInsert:m[0]||(m[0]=b=>f(s).insert(b)),onExtract:m[1]||(m[1]=b=>f(s).extractRoot()),onToggleMode:m[2]||(m[2]=b=>f(s).toggleMode()),onSeed:m[3]||(m[3]=b=>f(s).seed(b)),onReset:m[4]||(m[4]=b=>f(s).reset()),"onUpdate:speed":m[5]||(m[5]=b=>f(s).speed.value=b)},null,8,["can-edit","speed","is-min-heap"])]),h("div",Bw,[T(ye,{title:"Stats"},{header:I(()=>[T(Sn,{status:f(s).status.value},null,8,["status"])]),default:I(()=>[h("div",Fw,[T(Nt,{label:"Comparisons",value:String(f(s).stats.comparisons)},null,8,["value"]),T(Nt,{label:"Swaps",value:String(f(s).stats.swaps)},null,8,["value"]),T(Nt,{label:"Steps",value:String(f(s).stats.steps)},null,8,["value"])]),f(s).lastExtracted.value!==null?(w(),C("p",Vw,[m[6]||(m[6]=O(" Last extracted: ",-1)),h("span",Hw,M(f(s).lastExtracted.value),1)])):re("",!0)]),_:1}),T(ye,{class:"flex min-h-[280px] flex-1 items-center justify-center"},{default:I(()=>[d.value?(w(),C("p",Uw," The heap is empty — insert a value to get started. ")):(w(),W(Dc,{key:1,nodes:i.value,edges:l.value,"view-box-width":u.value,"view-box-height":c.value,class:"max-h-[55vh]"},null,8,["nodes","edges","view-box-width","view-box-height"]))]),_:1}),T(ye,{title:"Backing Array"},{default:I(()=>[d.value?(w(),C("div",zw,"Empty.")):(w(),C("div",qw,[(w(!0),C(ee,null,ce(f(s).heap.value,(b,g)=>(w(),C("div",{key:g,class:fe(["flex w-12 flex-col items-center overflow-hidden rounded-lg border transition-colors",[e[r(g)],n[r(g)]]])},[h("div",Kw,M(g),1),h("div",Gw,M(b),1)],2))),128))]))]),_:1})])]))}}),Xw=10;function Yw(){const t=B({nodes:[],edges:[],adjacency:new Map}),e=B("bfs"),n=B(null),s=B(60),o=B(ze()),a=Ne({visited:[],frontier:[],current:null}),r=Ne({visitedCount:0,totalNodes:0}),i=E(()=>oa[e.value]),l=E(()=>{const y=new Map,v=new Set(a.visited),x=new Set(a.frontier);for(const S of t.value.nodes)S.id===a.current?y.set(S.id,"current"):v.has(S.id)?y.set(S.id,"visited"):x.has(S.id)&&y.set(S.id,"frontier");return y}),u=E(()=>{const y=new Map,v=new Set(a.visited);for(const x of t.value.edges)v.has(x.from)&&v.has(x.to)&&y.set(x.id,"visited");return y});function c(){a.visited=[],a.frontier=[],a.current=null}function d(){r.visitedCount=0,r.totalNodes=t.value.nodes.length}const p=bn({speed:s,createGenerator:()=>n.value===null?null:(c(),d(),i.value.generator(t.value.adjacency,n.value)),applyStep:y=>{a.visited=y.visited,a.frontier=y.frontier,a.current=y.current,r.visitedCount=y.visited.length},clearStep:()=>{c(),d()}});function m(y=!1){var x;t.value=wc(Xw,rt(o.value)),y&&n.value!==null&&t.value.adjacency.has(n.value)||(n.value=((x=t.value.nodes[0])==null?void 0:x.id)??null),p.reset()}function b(y){p.canEdit.value&&t.value.adjacency.has(y)&&(n.value=y)}const{hydrated:g}=Zt(Vv({algoKey:e,speed:s,seed:o,startId:n}));return m(g.has("start")),{graph:t,algoKey:e,startId:n,speed:s,seed:o,highlights:a,nodeTone:l,edgeTone:u,stats:r,currentAlgo:i,status:p.status,isRunning:p.isRunning,isPaused:p.isPaused,isDone:p.isDone,canEdit:p.canEdit,delayMs:p.delayMs,elapsedMs:p.elapsedMs,stepCount:p.stepCount,cursor:p.cursor,bufferedCount:p.bufferedCount,fullyBuffered:p.fullyBuffered,current:p.current,canStepBack:p.canStepBack,canStepForward:p.canStepForward,generate:m,setStart:b,run:p.run,pause:p.pause,reset:p.reset,stepForward:p.stepForward,stepBack:p.stepBack,seek:p.seek,skipToEnd:p.skipToEnd}}const Jw={class:"mt-5 grid grid-cols-2 gap-2"},Qw=Z({__name:"GraphControls",props:{speed:{},status:{},canEdit:{type:Boolean},isRunning:{type:Boolean},isPaused:{type:Boolean}},emits:["update:speed","generate","run","pause","reset"],setup(t,{emit:e}){const n=e;return(s,o)=>(w(),W(ye,{title:"Controls"},{default:I(()=>[T(He,{label:"Speed","model-value":t.speed,min:1,max:100,suffix:"%","onUpdate:modelValue":o[0]||(o[0]=a=>n("update:speed",a))},null,8,["model-value"]),h("div",Jw,[t.isRunning?(w(),W(te,{key:1,variant:"warning",class:"col-span-2",onClick:o[2]||(o[2]=a=>n("pause"))},{default:I(()=>[...o[6]||(o[6]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M6 4h4v16H6zM14 4h4v16h-4z"})],-1),O(" Pause ",-1)])]),_:1})):(w(),W(te,{key:0,variant:"primary",class:"col-span-2",onClick:o[1]||(o[1]=a=>n("run"))},{default:I(()=>[o[5]||(o[5]=h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M8 5v14l11-7z"})],-1)),O(" "+M(t.isPaused?"Resume":"Run"),1)]),_:1})),T(te,{variant:"neutral",onClick:o[3]||(o[3]=a=>n("reset"))},{default:I(()=>[...o[7]||(o[7]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.36 2.64L3 8"}),h("path",{d:"M3 3v5h5"})],-1),O(" Reset ",-1)])]),_:1}),T(te,{variant:"neutral",disabled:!t.canEdit,onClick:o[4]||(o[4]=a=>n("generate"))},{default:I(()=>[...o[8]||(o[8]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"})],-1),O(" New Graph ",-1)])]),_:1},8,["disabled"])]),o[9]||(o[9]=h("p",{class:"mt-3 text-center text-xs text-ink-faint"}," Click a node in the diagram to set the start point. ",-1))]),_:1}))}}),mo={idle:"idle",frontier:"probe",current:"active",visited:"settled"},Zw={idle:gt.idle,frontier:gt.probe,current:gt.active,visited:gt.settled,considering:gt.probe,accepted:gt.settled,rejected:gt.rejected},ex={idle:yt.idle,frontier:yt.probe,current:yt.active,visited:yt.settled,considering:yt.probe,accepted:yt.settled,rejected:yt.rejected},tx=kn([{tone:mo.idle,label:"Unvisited"},{tone:mo.frontier,label:"Frontier"},{tone:mo.current,label:"Current"},{tone:mo.visited,label:"Visited"}]),nx={class:"mb-3 flex flex-wrap items-center gap-x-4 gap-y-2"},sx={class:"text-xs font-semibold uppercase tracking-wider text-ink-faint"},ox={class:"flex min-h-[320px] flex-1 items-center justify-center rounded-xl bg-surface-alt p-3"},ax={viewBox:"0 0 400 400",class:"h-full max-h-[480px] w-full max-w-[480px]"},rx=["x1","y1","x2","y2","stroke-width"],ix=["x","y"],lx=["x","y"],ux=["onClick"],cx=["cx","cy","stroke-width"],dx=["x","y"],px=["x","y"],fx={class:"mt-3 text-center text-xs text-ink-faint"},Lc=Z({__name:"GraphCanvas",props:{nodes:{},edges:{},nodeTone:{default:()=>new Map},edgeTone:{default:()=>new Map},nodeBadge:{default:()=>new Map},showWeights:{type:Boolean,default:!1},legend:{default:()=>tx},title:{default:"Graph"},hint:{default:"Click a node to set the traversal start point."},startId:{default:null},canEdit:{type:Boolean,default:!1}},emits:["set-start"],setup(t,{emit:e}){const n=t,s=e,o=E(()=>new Map(n.nodes.map(c=>[c.id,c]))),a=E(()=>{const c=new Map;for(const d of n.edges){const p=o.value.get(d.from),m=o.value.get(d.to);p&&m&&c.set(d.id,{x:(p.x+m.x)/2,y:(p.y+m.y)/2})}return c});function r(c){return Zw[n.nodeTone.get(c)??"idle"]}function i(c){return ex[n.edgeTone.get(c.id)??"idle"]}function l(c){return n.edgeTone.get(c.id)==="accepted"?3:2}function u(c){n.canEdit&&s("set-start",c)}return(c,d)=>(w(),W(ye,{class:"flex h-full flex-col"},{default:I(()=>[h("div",nx,[h("h2",sx,M(t.title),1),T(Dn,{items:t.legend},null,8,["items"])]),h("div",ox,[(w(),C("svg",ax,[(w(!0),C(ee,null,ce(t.edges,p=>{var m,b,g,y;return w(),C("line",{key:p.id,x1:(m=o.value.get(p.from))==null?void 0:m.x,y1:(b=o.value.get(p.from))==null?void 0:b.y,x2:(g=o.value.get(p.to))==null?void 0:g.x,y2:(y=o.value.get(p.to))==null?void 0:y.y,"stroke-width":l(p),class:fe(i(p))},null,10,rx)}),128)),t.showWeights?(w(!0),C(ee,{key:0},ce(t.edges,p=>(w(),C("g",{key:`w-${p.id}`},[p.weight!==void 0&&a.value.get(p.id)?(w(),C(ee,{key:0},[h("rect",{x:a.value.get(p.id).x-10,y:a.value.get(p.id).y-7,width:"20",height:"14",rx:"3",class:"fill-surface-alt"},null,8,ix),h("text",{x:a.value.get(p.id).x,y:a.value.get(p.id).y,"text-anchor":"middle","dominant-baseline":"central",class:"pointer-events-none select-none fill-ink-muted text-[9px] font-semibold"},M(p.weight),9,lx)],64)):re("",!0)]))),128)):re("",!0),(w(!0),C(ee,null,ce(t.nodes,p=>(w(),C("g",{key:p.id,class:"cursor-pointer",onClick:m=>u(p.id)},[h("circle",{cx:p.x,cy:p.y,r:"16","stroke-width":p.id===t.startId?3:0,class:fe(["transition-colors duration-150 ease-out",[r(p.id),p.id===t.startId?"stroke-accent":"stroke-transparent"]])},null,10,cx),h("text",{x:p.x,y:p.y,"text-anchor":"middle","dominant-baseline":"central",class:"pointer-events-none select-none fill-ink-inverse text-[10px] font-semibold"},M(p.label),9,dx),t.nodeBadge.get(p.id)!==void 0?(w(),C("text",{key:0,x:p.x,y:p.y+27,"text-anchor":"middle",class:"pointer-events-none select-none fill-ink-faint text-[9px] font-medium"},M(t.nodeBadge.get(p.id)),9,px)):re("",!0)],8,ux))),128))]))]),h("p",fx,M(t.hint),1)]),_:1}))}}),hx={class:"grid grid-cols-3 gap-2"},mx=Z({__name:"GraphStats",props:{visitedCount:{},totalNodes:{},steps:{},elapsedMs:{},status:{}},setup(t){const e=t,n=E(()=>`${(e.elapsedMs/1e3).toFixed(2)}s`),s=E(()=>[{label:"Visited",value:`${e.visitedCount} / ${e.totalNodes}`},{label:"Steps",value:e.steps.toLocaleString()},{label:"Elapsed",value:n.value}]);return(o,a)=>(w(),W(ye,{title:"Stats"},{header:I(()=>[T(Sn,{status:t.status},null,8,["status"])]),default:I(()=>[h("div",hx,[(w(!0),C(ee,null,ce(s.value,r=>(w(),W(Nt,{key:r.label,label:r.label,value:r.value},null,8,["label","value"]))),128))])]),_:1}))}}),gx={class:"grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]"},vx={class:"flex flex-col gap-4"},bx={class:"flex flex-col gap-4"},yx=Z({__name:"GraphView",setup(t){const e=Yw();return Re(e.algoKey,()=>{e.isDone.value&&e.reset()}),(n,s)=>(w(),C("div",gx,[h("div",vx,[T(Rn,{modelValue:f(e).algoKey.value,"onUpdate:modelValue":s[0]||(s[0]=o=>f(e).algoKey.value=o),algorithms:f(oa),title:"Traversal Algorithm",disabled:!f(e).canEdit.value},null,8,["modelValue","algorithms","disabled"]),T(Qw,{speed:f(e).speed.value,"onUpdate:speed":s[1]||(s[1]=o=>f(e).speed.value=o),status:f(e).status.value,"can-edit":f(e).canEdit.value,"is-running":f(e).isRunning.value,"is-paused":f(e).isPaused.value,onGenerate:s[2]||(s[2]=o=>f(e).generate()),onRun:s[3]||(s[3]=o=>f(e).run()),onPause:s[4]||(s[4]=o=>f(e).pause()),onReset:s[5]||(s[5]=o=>f(e).reset())},null,8,["speed","status","can-edit","is-running","is-paused"]),T(xn,{cursor:f(e).cursor.value,"buffered-count":f(e).bufferedCount.value,"fully-buffered":f(e).fullyBuffered.value,"can-step-back":f(e).canStepBack.value,"can-step-forward":f(e).canStepForward.value,onSeek:s[6]||(s[6]=o=>f(e).seek(o)),onStepBack:s[7]||(s[7]=o=>f(e).stepBack()),onStepForward:s[8]||(s[8]=o=>f(e).stepForward()),onSkipToEnd:s[9]||(s[9]=o=>f(e).skipToEnd())},null,8,["cursor","buffered-count","fully-buffered","can-step-back","can-step-forward"])]),h("div",bx,[T(mx,{"visited-count":f(e).stats.visitedCount,"total-nodes":f(e).stats.totalNodes,steps:f(e).stepCount.value,"elapsed-ms":f(e).elapsedMs.value,status:f(e).status.value},null,8,["visited-count","total-nodes","steps","elapsed-ms","status"]),T(Lc,{class:"flex-1",nodes:f(e).graph.value.nodes,edges:f(e).graph.value.edges,"node-tone":f(e).nodeTone.value,"edge-tone":f(e).edgeTone.value,"start-id":f(e).startId.value,"can-edit":f(e).canEdit.value,onSetStart:s[10]||(s[10]=o=>f(e).setStart(o))},null,8,["nodes","edges","node-tone","edge-tone","start-id","can-edit"])])]))}}),wx=`
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
`,xx="<\/script>",kx=`<!doctype html>
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
${xx}
</body>
</html>`;function Os(t){return typeof t=="number"&&Number.isFinite(t)}function Ia(t,e,n){if(t===void 0)return[];if(!Array.isArray(t))return`${n} must be an array of indices`;if(t.length>Ws)return`${n} has too many entries`;const s=[];for(const o of t){if(!Os(o)||!Number.isInteger(o))return`${n} must contain whole numbers`;if(o<0||o>=e)return`${n} contains index ${o}, outside the array (0..${e-1})`;s.push(o)}return s}function Sx(t){if(t===null||typeof t!="object")return{ok:!1,reason:"step is not an object"};const e=t;if(!Array.isArray(e.array))return{ok:!1,reason:"step.array must be an array"};if(e.array.length>Ws)return{ok:!1,reason:`step.array has ${e.array.length} entries, over the ${Ws} limit`};const n=[];for(const i of e.array){if(!Os(i))return{ok:!1,reason:"step.array must contain finite numbers"};n.push(i)}const s=Ia(e.comparing,n.length,"step.comparing");if(typeof s=="string")return{ok:!1,reason:s};const o=Ia(e.swapping,n.length,"step.swapping");if(typeof o=="string")return{ok:!1,reason:o};const a=Ia(e.sorted,n.length,"step.sorted");if(typeof a=="string")return{ok:!1,reason:a};if(e.comparisons!==void 0&&!Os(e.comparisons))return{ok:!1,reason:"step.comparisons must be a number"};if(e.swaps!==void 0&&!Os(e.swaps))return{ok:!1,reason:"step.swaps must be a number"};const r={array:n,comparing:s,swapping:o,sorted:a,comparisons:Math.max(0,Math.floor(e.comparisons??0)),swaps:Math.max(0,Math.floor(e.swaps??0)),done:e.done===!0};return Os(e.line)&&e.line>=0&&(r.line=Math.floor(e.line)),{ok:!0,step:r}}class Nc extends Error{constructor(e){super(e),this.name="SandboxError"}}function*$x(t){for(const e of t)yield e}function Ex(t){const e=t.maxSteps??Br,n=t.maxMs??Dv,s=t.silenceMs??Lv,o=[];let a=0,r=null;const i=Date.now();let l=null,u=null,c=!1,d,p;const m=new Promise((S,$)=>{d=S,p=$});function b(){var S;if(u!==null&&(clearTimeout(u),u=null),window.removeEventListener("message",x),l){try{(S=l.contentWindow)==null||S.postMessage({type:"sandbox:kill"},"*")}catch{}l.remove(),l=null}}function g(S){c||(c=!0,b(),d({steps:o,reason:S,rejected:a,firstRejectReason:r,elapsedMs:Date.now()-i}))}function y(S){c||(c=!0,b(),p(new Nc(S)))}function v(){u!==null&&clearTimeout(u),u=setTimeout(()=>g("watchdog"),s)}function x(S){if(!l||S.source!==l.contentWindow)return;const $=S.data;if(!(!$||typeof $!="object"||typeof $.type!="string"))switch(v(),$.type){case"sandbox:steps":{if(!Array.isArray($.steps))return;for(const R of $.steps){const P=Sx(R);if(!P.ok){a+=1,r===null&&(r=P.reason);continue}o.push(P.step)}return}case"sandbox:done":g($.reason);return;case"sandbox:error":y($.message||"The sandbox reported an unknown error.");return;default:return}}return window.addEventListener("message",x),l=document.createElement("iframe"),l.setAttribute("sandbox","allow-scripts"),l.setAttribute("aria-hidden","true"),l.setAttribute("title","Algorithm sandbox runner"),l.style.cssText="position:absolute;width:0;height:0;border:0;opacity:0;pointer-events:none;left:-9999px;",l.srcdoc=kx,l.addEventListener("load",()=>{var S;c||!l||(S=l.contentWindow)==null||S.postMessage({type:"sandbox:run",workerSource:wx,code:t.code,input:Array.from(t.input,Number),maxSteps:e,maxMs:n,batchSize:Nv,arrayCap:Ws},"*")}),document.body.appendChild(l),v(),{result:m,cancel:()=>g("cancelled")}}function Cx(t){switch(t.reason){case"watchdog":return"Force-stopped: the snippet stopped responding without yielding anything — that is what a loop with no yield inside it looks like. The worker was terminated; this page was never blocked.";case"step-budget":case"time-budget":return"Stopped at the budget before the snippet yielded a single snapshot.";case"cancelled":return"Cancelled before the snippet yielded anything.";default:return t.rejected>0?`Every snapshot was rejected. First problem: ${t.firstRejectReason}`:"The snippet ran but never yielded a snapshot. Use `yield` to draw a frame."}}function Ax(){const t=B(cr),e=B(Rc),n=B(jc),s=B(ze()),o=B("idle"),a=B(null),r=B(null),i=xr([]);let l=null;const u=B([]),c=B([]),d=Ne({comparing:[],swapping:[],sorted:[]}),p=Ne({comparisons:0,swaps:0}),m=B(1);function b(){d.comparing=[],d.swapping=[],d.sorted=[]}function g(){p.comparisons=0,p.swaps=0}function y(){const z=rt(s.value);u.value=Array.from({length:e.value},()=>z.int(1,99)),c.value=[...u.value],v()}function v(){let z=1;for(const ae of u.value)ae>z&&(z=ae);for(const ae of i.value)for(const L of ae.array)L>z&&(z=L);m.value=z}const x=bn({speed:n,createGenerator:()=>i.value.length===0?null:(c.value=[...u.value],b(),g(),$x(i.value)),applyStep:z=>{c.value=z.array,d.comparing=z.comparing,d.swapping=z.swapping,d.sorted=z.sorted,p.comparisons=z.comparisons,p.swaps=z.swaps},clearStep:()=>{c.value=[...u.value],b(),g()}});function S(){i.value=[],x.reset(),v()}function $(){K(),y(),S(),o.value="idle",a.value=null,r.value=null}function R(){s.value=ze(),$()}async function P(){K(),a.value=null,r.value=null,o.value="executing",i.value=[],x.reset();const z=Ex({code:t.value,input:u.value});l=z;try{const ae=await z.result;if(l!==z)return;if(i.value=ae.steps,r.value=ae,v(),ae.steps.length===0){o.value="error",a.value=Cx(ae);return}o.value="ready",x.run()}catch(ae){if(l!==z)return;o.value="error",a.value=ae instanceof Nc?ae.message:"The sandbox failed to start."}finally{l===z&&(l=null)}}function K(){l&&(l.cancel(),l=null)}function D(){t.value=cr}const{hydrated:N}=Zt(Hv({source:t,size:e,speed:n,seed:s})),j=N.has("src");y();const me=E(()=>r.value!==null&&r.value.reason!=="complete"&&i.value.length>0),Se=E(()=>{const z=r.value;if(!z)return null;switch(z.reason){case"complete":return null;case"step-budget":return`Stopped at the ${Br.toLocaleString()}-step budget — the snippet never finished.`;case"time-budget":return"Stopped at the time budget — the snippet was still running.";case"watchdog":return"Force-stopped: the sandbox went silent, which is what a loop that never yields looks like.";case"cancelled":return"Cancelled.";default:return null}});return{source:t,size:e,speed:n,seed:s,phase:o,error:a,lastRun:r,truncated:me,stopLabel:Se,stepsCollected:E(()=>i.value.length),fromSharedLink:j,array:c,baseArray:u,highlights:d,stats:p,maxValue:m,status:x.status,isRunning:x.isRunning,isPaused:x.isPaused,isDone:x.isDone,canEdit:x.canEdit,elapsedMs:x.elapsedMs,stepCount:x.stepCount,cursor:x.cursor,bufferedCount:x.bufferedCount,fullyBuffered:x.fullyBuffered,current:x.current,canStepBack:x.canStepBack,canStepForward:x.canStepForward,activeLine:E(()=>{var z;return((z=x.current.value)==null?void 0:z.line)??null}),execute:P,cancel:K,regenerate:$,randomizeSeed:R,resetSource:D,run:x.run,pause:x.pause,reset:x.reset,stepForward:x.stepForward,stepBack:x.stepBack,seek:x.seek,skipToEnd:x.skipToEnd}}function ws(){const t=Gu();return E(()=>t.meta.embed===!0)}const Tx={class:"relative flex max-h-[420px] min-h-[260px] overflow-hidden rounded-xl bg-surface-alt font-mono text-xs"},Ox={"aria-hidden":"true",class:"select-none overflow-hidden border-r border-line bg-surface-alt py-3 text-right",style:{minWidth:"2.75rem"}},_x=["value","disabled"],Mx=Z({__name:"CodeEditor",props:{modelValue:{},disabled:{type:Boolean}},emits:["update:modelValue"],setup(t,{emit:e}){const n=t,s=e,o=B(null),a=E(()=>{const d=n.modelValue.split(`
`).length;return Array.from({length:d},(p,m)=>m+1)}),r=B(0);function i(d){r.value=d.target.scrollTop}const l=B(!1);function u(d){if(d.key==="Escape"){l.value=!0;return}if(d.key!=="Tab"||l.value)return;d.preventDefault();const p=o.value;if(!p)return;const{selectionStart:m,selectionEnd:b,value:g}=p,y=`${g.slice(0,m)}  ${g.slice(b)}`;s("update:modelValue",y),requestAnimationFrame(()=>{p.selectionStart=p.selectionEnd=m+2})}function c(d){l.value=!1,s("update:modelValue",d.target.value)}return(d,p)=>(w(),W(ye,{title:"Your algorithm"},{header:I(()=>[...p[0]||(p[0]=[h("span",{class:"text-[11px] text-ink-faint"}," Tab indents · Esc then Tab to leave ",-1)])]),default:I(()=>[h("div",Tx,[h("div",Ox,[h("div",{style:Tt({transform:`translateY(${-r.value}px)`})},[(w(!0),C(ee,null,ce(a.value,m=>(w(),C("div",{key:m,class:"px-2 leading-5 text-ink-faint"},M(m),1))),128))],4)]),h("textarea",{ref_key:"textarea",ref:o,value:t.modelValue,disabled:t.disabled,spellcheck:"false",autocomplete:"off",autocorrect:"off",autocapitalize:"off","aria-label":"Algorithm source code",class:"flex-1 resize-none bg-transparent p-3 leading-5 text-ink outline-none disabled:opacity-60",onInput:c,onKeydown:u,onScroll:i},null,40,_x)])]),_:1}))}}),Rx=["open"],jx={class:"flex cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden"},Ix={class:"min-w-0"},Dx={class:"block text-xs font-semibold uppercase tracking-wider text-ink-faint"},Lx={key:0,class:"mt-1 block text-sm text-ink-muted"},Nx={class:"mt-4 border-t border-line pt-4 text-sm"},to=Z({__name:"AvExplainer",props:{title:{},summary:{default:""},startOpen:{type:Boolean,default:!1}},setup(t){return(e,n)=>(w(),C("details",{class:"av-card group p-4 sm:p-5",open:t.startOpen},[h("summary",jx,[h("span",Ix,[h("span",Dx,M(t.title),1),t.summary?(w(),C("span",Lx,M(t.summary),1)):re("",!0)]),n[0]||(n[0]=h("span",{class:"shrink-0 text-ink-faint transition-transform group-open:rotate-180","aria-hidden":"true"}," ▾ ",-1))]),h("div",Nx,[Eo(e.$slots,"default")])],8,Rx))}}),Px={class:"mb-4 overflow-x-auto"},Bx={class:"w-full border-collapse text-left text-xs"},Fx={class:"py-1.5 pr-3 font-mono font-semibold text-ink"},Vx={class:"py-1.5 pr-3 font-mono text-ink-faint"},Hx={class:"py-1.5 text-ink-muted"},Ux={class:"mb-4 list-disc space-y-1.5 pl-5 text-ink-muted"},zx=Z({__name:"SandboxGuide",setup(t){const e=[{name:"array",type:"number[]",note:"Required. The values as they stand right now."},{name:"comparing",type:"number[]",note:"Indices to mark as being compared. Defaults to none."},{name:"swapping",type:"number[]",note:"Indices to mark as swapping."},{name:"sorted",type:"number[]",note:"Indices to mark as sorted — settled for good."},{name:"comparisons",type:"number",note:"Shown in Stats. Your own running count."},{name:"swaps",type:"number",note:"Shown in Stats."},{name:"done",type:"boolean",note:"true on the final snapshot only. Ends the run."}];return(n,s)=>(w(),W(to,{title:"How this works",summary:"Write a generator, yield a snapshot per frame. Read this first — the shape is strict.","start-open":""},{default:I(()=>[s[4]||(s[4]=h("p",{class:"mb-3 text-ink-muted"},[O(" Your code runs in a sandboxed frame on its own thread, and everything it "),h("code",{class:"font-mono text-xs"},"yield"),O("s is drawn on the chart to the right. It is the same contract every built-in algorithm here uses, so anything you write plays back with the same scrubber, speed control and step history. ")],-1)),s[5]||(s[5]=h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint"}," Required shape ",-1)),s[6]||(s[6]=h("pre",{class:"mb-4 overflow-x-auto rounded-xl bg-surface-alt p-3 font-mono text-[11px] leading-5 text-ink"},[h("code",null,`// name and function* are both required
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
}`)],-1)),s[7]||(s[7]=h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint"}," Snapshot fields ",-1)),h("div",Px,[h("table",Bx,[h("tbody",null,[(w(),C(ee,null,ce(e,o=>h("tr",{key:o.name,class:"border-b border-line last:border-0"},[h("td",Fx,M(o.name),1),h("td",Vx,M(o.type),1),h("td",Hx,M(o.note),1)])),64))])])]),s[8]||(s[8]=h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint"}," Rules worth knowing ",-1)),h("ul",Ux,[s[0]||(s[0]=h("li",null,[h("b",null,"JavaScript only."),O(" The runner evaluates JS — other languages and WebAssembly are not supported. ")],-1)),s[1]||(s[1]=h("li",null,[O(" Highlight indices must be whole numbers "),h("b",null,"inside"),O(" the array. An out-of-range index is rejected rather than clamped, because a clamped index quietly highlights the wrong bar. ")],-1)),s[2]||(s[2]=h("li",null," A rejected snapshot is skipped and reported in the Sandbox panel with the reason — the run keeps going. ",-1)),s[3]||(s[3]=h("li",null,[O(" Helper functions are fine. Only "),h("code",{class:"font-mono text-xs"},"run"),O(" is special. ")],-1)),h("li",null," Limits: "+M(f(Br).toLocaleString())+" snapshots per run, arrays up to "+M(f(Ws))+" entries (the size slider stops at "+M(f(Fr))+"). ",1)]),s[9]||(s[9]=h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint"}," Why it is safe to run a link someone sent you ",-1)),s[10]||(s[10]=h("p",{class:"mb-2 text-ink-muted"}," Code executes inside an isolated frame with no access to this page — not its DOM, its storage, or its cookies — and on a separate thread, so even an infinite loop cannot freeze the tab. A run that stops responding is terminated automatically. ",-1)),s[11]||(s[11]=h("p",{class:"text-ink-faint"},[O(" One honest limitation: isolation stops shared code touching "),h("em",null,"this app"),O(", but it can still make network requests, the same as any script on any page you open. Treat a shared snippet the way you would treat any link. ")],-1))]),_:1}))}}),qx={class:"flex flex-col gap-3"},Kx={class:"grid grid-cols-2 gap-2"},Gx={class:"grid grid-cols-2 gap-2"},Wx=Z({__name:"SandboxControls",props:_n({status:{},executing:{type:Boolean},canEdit:{type:Boolean},isRunning:{type:Boolean},isPaused:{type:Boolean},hasTape:{type:Boolean},seed:{}},{size:{required:!0},sizeModifiers:{},speed:{required:!0},speedModifiers:{}}),emits:_n(["execute","cancel","run","pause","reset","randomize","reset-source","update:seed"],["update:size","update:speed"]),setup(t,{emit:e}){const n=Mn(t,"size"),s=Mn(t,"speed"),o=e;function a(r){const i=Number(r);Number.isInteger(i)&&o("update:seed",i)}return(r,i)=>(w(),W(ye,{title:"Run"},{default:I(()=>[h("div",qx,[h("div",Kx,[T(te,{variant:"primary",class:"col-span-2",disabled:t.executing,onClick:i[0]||(i[0]=l=>o("execute"))},{default:I(()=>[O(M(t.executing?"Running in sandbox…":"▶ Run in sandbox"),1)]),_:1},8,["disabled"]),t.executing?(w(),W(te,{key:0,variant:"danger",class:"col-span-2",onClick:i[1]||(i[1]=l=>o("cancel"))},{default:I(()=>[...i[9]||(i[9]=[O(" Stop ",-1)])]),_:1})):(w(),C(ee,{key:1},[t.isRunning?(w(),W(te,{key:0,variant:"warning",disabled:!t.hasTape,onClick:i[2]||(i[2]=l=>o("pause"))},{default:I(()=>[...i[10]||(i[10]=[O(" ❚❚ Pause ",-1)])]),_:1},8,["disabled"])):(w(),W(te,{key:1,variant:"neutral",disabled:!t.hasTape,onClick:i[3]||(i[3]=l=>o("run"))},{default:I(()=>[O(M(t.isPaused?"▶ Resume":"▶ Replay"),1)]),_:1},8,["disabled"])),T(te,{variant:"neutral",disabled:!t.hasTape,onClick:i[4]||(i[4]=l=>o("reset"))},{default:I(()=>[...i[11]||(i[11]=[O("Reset",-1)])]),_:1},8,["disabled"])],64))]),T(He,{modelValue:n.value,"onUpdate:modelValue":i[5]||(i[5]=l=>n.value=l),label:"Input size",min:f(Mc),max:f(Fr),disabled:!t.canEdit||t.executing},null,8,["modelValue","min","max","disabled"]),T(He,{modelValue:s.value,"onUpdate:modelValue":i[6]||(i[6]=l=>s.value=l),label:"Speed",min:1,max:100,suffix:"%"},null,8,["modelValue"]),T($t,{label:"Seed",monospace:"","model-value":String(t.seed),disabled:!t.canEdit||t.executing,"onUpdate:modelValue":a},null,8,["model-value","disabled"]),h("div",Gx,[T(te,{variant:"quiet",disabled:!t.canEdit||t.executing,onClick:i[7]||(i[7]=l=>o("randomize"))},{default:I(()=>[...i[12]||(i[12]=[O(" New seed ",-1)])]),_:1},8,["disabled"]),T(te,{variant:"quiet",disabled:t.executing,onClick:i[8]||(i[8]=l=>o("reset-source"))},{default:I(()=>[...i[13]||(i[13]=[O(" Starter code ",-1)])]),_:1},8,["disabled"])])])]),_:1}))}}),Xx={key:0,class:"mb-3 rounded-lg bg-accent-soft px-3 py-2 text-xs text-accent"},Yx={key:1,class:"text-sm text-danger"},Jx={key:0,class:"mb-2 text-sm text-warn"},Qx={key:1,class:"nums text-sm text-ink-muted"},Zx={key:0},e1={key:2,class:"text-sm text-ink-muted"},t1={key:3,class:"nums mt-2 text-xs text-warn"},n1=Z({__name:"SandboxStatus",props:{phase:{},error:{},stopLabel:{},stepsCollected:{},rejected:{},firstRejectReason:{},elapsedMs:{},fromSharedLink:{type:Boolean}},setup(t){const e=t,n=E(()=>e.phase==="error"?"error":e.stopLabel||e.rejected>0?"warn":e.phase==="ready"?"ok":"idle"),s=E(()=>({idle:"bg-surface-alt text-ink-muted",ok:"bg-ok-soft text-ok-ink",warn:"bg-warn-soft text-warn-ink",error:"bg-danger-soft text-danger-ink"})[n.value]);return(o,a)=>(w(),W(ye,{title:"Sandbox"},{header:I(()=>[h("span",{class:fe(["rounded-full px-2.5 py-0.5 text-xs font-semibold",s.value])},M(t.phase==="executing"?"Executing":t.phase==="ready"?"Isolated · OK":t.phase==="error"?"Failed":"Idle"),3)]),default:I(()=>[t.fromSharedLink?(w(),C("p",Xx," This code came from a shared link. It runs in an isolated frame with no access to this page, but it is not code you wrote. ")):re("",!0),t.error?(w(),C("p",Yx,M(t.error),1)):(w(),C(ee,{key:2},[t.stopLabel?(w(),C("p",Jx,M(t.stopLabel),1)):re("",!0),t.phase==="ready"?(w(),C("p",Qx,[O(" Collected "+M(t.stepsCollected.toLocaleString())+" snapshots",1),t.elapsedMs!==null?(w(),C("span",Zx," in "+M((t.elapsedMs/1e3).toFixed(2))+"s",1)):re("",!0),a[0]||(a[0]=O(". ",-1))])):t.phase==="idle"?(w(),C("p",e1," Your code runs in a sandboxed frame on its own thread. It can draw bars; it cannot reach this page. ")):re("",!0),t.rejected>0?(w(),C("p",t1,M(t.rejected.toLocaleString())+" snapshot"+M(t.rejected===1?"":"s")+" rejected before rendering — "+M(t.firstRejectReason),1)):re("",!0)],64))]),_:1}))}}),s1={class:"grid gap-4 lg:grid-cols-[minmax(0,420px)_1fr]"},o1={class:"flex flex-col gap-4"},a1={class:"flex flex-col gap-4"},r1=Z({__name:"SandboxView",setup(t){const e=Ax(),n=ws();Re([e.size,e.seed],()=>{e.phase.value!=="executing"&&e.regenerate()}),Er(()=>{e.fromSharedLink&&e.execute()});const s=E(()=>{var r;return((r=e.lastRun.value)==null?void 0:r.elapsedMs)??null}),o=E(()=>{var r;return((r=e.lastRun.value)==null?void 0:r.rejected)??0}),a=E(()=>{var r;return((r=e.lastRun.value)==null?void 0:r.firstRejectReason)??null});return(r,i)=>(w(),C("div",s1,[h("div",o1,[f(n)?re("",!0):(w(),W(zx,{key:0})),T(Mx,{modelValue:f(e).source.value,"onUpdate:modelValue":i[0]||(i[0]=l=>f(e).source.value=l),disabled:f(e).phase.value==="executing"},null,8,["modelValue","disabled"]),T(Wx,{size:f(e).size.value,"onUpdate:size":i[1]||(i[1]=l=>f(e).size.value=l),speed:f(e).speed.value,"onUpdate:speed":i[2]||(i[2]=l=>f(e).speed.value=l),status:f(e).status.value,executing:f(e).phase.value==="executing","can-edit":f(e).canEdit.value,"is-running":f(e).isRunning.value,"is-paused":f(e).isPaused.value,"has-tape":f(e).stepsCollected.value>0,seed:f(e).seed.value,onExecute:i[3]||(i[3]=l=>f(e).execute()),onCancel:i[4]||(i[4]=l=>f(e).cancel()),onRun:i[5]||(i[5]=l=>f(e).run()),onPause:i[6]||(i[6]=l=>f(e).pause()),onReset:i[7]||(i[7]=l=>f(e).reset()),onRandomize:i[8]||(i[8]=l=>f(e).randomizeSeed()),onResetSource:i[9]||(i[9]=l=>f(e).resetSource()),"onUpdate:seed":i[10]||(i[10]=l=>f(e).seed.value=l)},null,8,["size","speed","status","executing","can-edit","is-running","is-paused","has-tape","seed"]),T(xn,{cursor:f(e).cursor.value,"buffered-count":f(e).bufferedCount.value,"fully-buffered":f(e).fullyBuffered.value,"can-step-back":f(e).canStepBack.value,"can-step-forward":f(e).canStepForward.value,onSeek:i[11]||(i[11]=l=>f(e).seek(l)),onStepBack:i[12]||(i[12]=l=>f(e).stepBack()),onStepForward:i[13]||(i[13]=l=>f(e).stepForward()),onSkipToEnd:i[14]||(i[14]=l=>f(e).skipToEnd())},null,8,["cursor","buffered-count","fully-buffered","can-step-back","can-step-forward"])]),h("div",a1,[T(n1,{phase:f(e).phase.value,error:f(e).error.value,"stop-label":f(e).stopLabel.value,"steps-collected":f(e).stepsCollected.value,rejected:o.value,"first-reject-reason":a.value,"elapsed-ms":s.value,"from-shared-link":f(e).fromSharedLink},null,8,["phase","error","stop-label","steps-collected","rejected","first-reject-reason","elapsed-ms","from-shared-link"]),T(wo,{comparisons:f(e).stats.comparisons,swaps:f(e).stats.swaps,steps:f(e).stepCount.value,"elapsed-ms":f(e).elapsedMs.value,status:f(e).status.value},null,8,["comparisons","swaps","steps","elapsed-ms","status"]),T(yo,{class:"flex-1",title:"Your algorithm",array:f(e).array.value,comparing:f(e).highlights.comparing,swapping:f(e).highlights.swapping,sorted:f(e).highlights.sorted,"max-value":f(e).maxValue.value},null,8,["array","comparing","swapping","sorted","max-value"])])]))}}),i1=5e3,l1=2e3;function u1(t){let e=t.reduce((s,o)=>s+o,0),n=1;for(const s of t){let o=1;for(let a=1;a<=s;a++)o=o*(e-s+a)/a;if(e-=s,n*=o,!Number.isFinite(n)||n>Number.MAX_SAFE_INTEGER)return 1/0}return Math.round(n)}function c1(t){const e=t.reduce((r,i)=>r+i,0),n=[],s=t.map(()=>0),o=[];function a(){if(o.length===e){n.push([...o]);return}for(let r=0;r<t.length;r++)s[r]>=t[r]||(s[r]+=1,o.push(r),a(),o.pop(),s[r]-=1)}return a(),n}function d1(t,e){const n=[...t],s=t.reduce((a,r)=>a+r,0),o=[];for(let a=0;a<s;a++){const r=[];for(let l=0;l<n.length;l++)for(let u=0;u<n[l];u++)r.push(l);const i=e.pick(r);if(i===void 0)break;n[i]-=1,o.push(i)}return o}function p1(t,e){const n=Pr(t),s=e.threshold??i1,o=e.sampleCount??l1,a=u1(n),r=a<s?c1(n):f1(n,e.seed,o),i=a<s?"exhaustive":"sampled",l=r.map(u=>_v(t,u));return{mode:i,totalCount:a,checkedCount:l.length,outcomes:l,violatingCount:l.filter(u=>u.violates).length}}function f1(t,e,n){const s=rt(e),o=new Set,a=[];for(let r=0;r<n;r++){const i=d1(t,s),l=i.join(",");o.has(l)||(o.add(l),a.push(i))}return a}function h1(){const t=B(cc),e=B(60),n=B(ze()),s=B([]),o=E(()=>Gs[t.value]),a=xr(null);function r(){a.value=p1(o.value,{seed:n.value})}const i=E(()=>{var D;return((D=a.value)==null?void 0:D.outcomes.filter(N=>N.violates))??[]}),l=E(()=>{var D;return((D=a.value)==null?void 0:D.outcomes.filter(N=>!N.violates))??[]}),u=E(()=>{if(!a.value||s.value.length===0)return null;const D=s.value.join(",");return a.value.outcomes.find(N=>N.schedule.join(",")===D)??null}),c=B([]),d=B({}),p=B({}),m=B(null),b=B(!1),g=Ne({executed:0,total:0});function y(){return o.value.createState().threads}function v(){const D=o.value.createState();c.value=D.threads,d.value={...D.shared},p.value={...D.locks},m.value=null,b.value=!1,g.executed=0,g.total=s.value.length}const x=bn({speed:e,createGenerator:()=>s.value.length===0?null:(v(),Oc(o.value,s.value)),applyStep:(D,N)=>{c.value=D.threads,d.value=D.sharedMem,p.value=D.lockOwners,m.value=D.lastAction,b.value=D.violated,g.executed=N+1},clearStep:v});function S(D){var j;if(!ur(o.value,D))return!1;s.value=[...D],x.reset();const N=(j=a.value)==null?void 0:j.outcomes.find(me=>me.schedule.join(",")===D.join(","));return N&&N.violates&&(x.stepForward(),x.seek(N.firstViolationIndex)),!0}function $(D=!1){var j;if(r(),g.total=0,D&&s.value.length>0&&ur(o.value,s.value)){S(s.value);return}const N=i.value[0]??((j=a.value)==null?void 0:j.outcomes[0]);N?S(N.schedule):(s.value=[],v())}function R(){n.value=ze()}const{hydrated:P}=Zt(Uv({scenarioKey:t,speed:e,seed:n,schedule:s},()=>o.value));$(P.has("sched")),Re(t,()=>{s.value=[],$()}),Re(n,()=>$());const K=E(()=>{const D=a.value;if(!D)return"";const N=D.violatingCount.toLocaleString();if(D.mode==="exhaustive")return`Checked all ${D.checkedCount.toLocaleString()} possible interleavings — ${N} break the invariant.`;const j=Number.isFinite(D.totalCount)?D.totalCount.toLocaleString():"astronomically many";return`Sampled ${D.checkedCount.toLocaleString()} of ${j} possible interleavings — ${N} of those break the invariant.`});return{scenarioKey:t,scenario:o,speed:e,seed:n,schedule:s,search:a,violating:i,clean:l,selected:u,summary:K,threads:c,sharedMem:d,lockOwners:p,lastAction:m,violatedNow:b,stats:g,idleThreads:y,status:x.status,isRunning:x.isRunning,isPaused:x.isPaused,isDone:x.isDone,canEdit:x.canEdit,elapsedMs:x.elapsedMs,stepCount:x.stepCount,cursor:x.cursor,bufferedCount:x.bufferedCount,fullyBuffered:x.fullyBuffered,current:x.current,canStepBack:x.canStepBack,canStepForward:x.canStepForward,analyse:$,selectSchedule:S,randomizeSeed:R,run:x.run,pause:x.pause,reset:x.reset,stepForward:x.stepForward,stepBack:x.stepBack,seek:x.seek,skipToEnd:x.skipToEnd}}const m1={class:"flex flex-col gap-2"},g1={class:"block"},v1={class:"block font-semibold"},b1={class:"block text-[11px] opacity-80"},y1={class:"mt-3 rounded-lg bg-warn-soft px-3 py-2 text-xs text-warn-ink"},w1={class:"mt-4 grid grid-cols-2 gap-2"},x1={class:"mt-4 flex flex-col gap-3"},k1=Z({__name:"ConcurrencyControls",props:_n({status:{},canEdit:{type:Boolean},isRunning:{type:Boolean},isPaused:{type:Boolean},hasSchedule:{type:Boolean},seed:{}},{scenario:{required:!0},scenarioModifiers:{},speed:{required:!0},speedModifiers:{}}),emits:_n(["run","pause","reset","randomize","update:seed"],["update:scenario","update:speed"]),setup(t,{emit:e}){const n=Mn(t,"scenario"),s=Mn(t,"speed"),o=e,a=Object.entries(Gs);function r(i){const l=Number(i);Number.isInteger(l)&&o("update:seed",l)}return(i,l)=>(w(),W(ye,{title:"Scenario"},{default:I(()=>[h("div",m1,[(w(!0),C(ee,null,ce(f(a),([u,c])=>(w(),W(te,{key:u,variant:"selector",class:"text-left",active:n.value===u,disabled:!t.canEdit,onClick:d=>n.value=u},{default:I(()=>[h("span",g1,[h("span",v1,M(c.name),1),h("span",b1,M(c.description),1)])]),_:2},1032,["active","disabled","onClick"]))),128))]),h("p",y1,M(f(Gs)[n.value].bug),1),h("div",w1,[t.isRunning?(w(),W(te,{key:0,variant:"warning",onClick:l[0]||(l[0]=u=>o("pause"))},{default:I(()=>[...l[5]||(l[5]=[O("❚❚ Pause",-1)])]),_:1})):(w(),W(te,{key:1,variant:"primary",disabled:!t.hasSchedule,onClick:l[1]||(l[1]=u=>o("run"))},{default:I(()=>[O(M(t.isPaused?"▶ Resume":"▶ Play"),1)]),_:1},8,["disabled"])),T(te,{variant:"neutral",disabled:!t.hasSchedule,onClick:l[2]||(l[2]=u=>o("reset"))},{default:I(()=>[...l[6]||(l[6]=[O("Reset",-1)])]),_:1},8,["disabled"])]),h("div",x1,[T(He,{modelValue:s.value,"onUpdate:modelValue":l[3]||(l[3]=u=>s.value=u),label:"Speed",min:1,max:100,suffix:"%"},null,8,["modelValue"]),T($t,{label:"Seed",monospace:"","model-value":String(t.seed),disabled:!t.canEdit,"onUpdate:modelValue":r},null,8,["model-value","disabled"]),T(te,{variant:"quiet",disabled:!t.canEdit,onClick:l[4]||(l[4]=u=>o("randomize"))},{default:I(()=>[...l[7]||(l[7]=[O("New seed",-1)])]),_:1},8,["disabled"]),l[8]||(l[8]=h("p",{class:"text-[11px] text-ink-faint"}," The seed only matters once a scenario is too large to check exhaustively — then it picks which interleavings get sampled. ",-1))])]),_:1}))}}),S1=Z({__name:"ConcurrencyGuide",setup(t){return(e,n)=>(w(),W(to,{title:"How to read this",summary:"Same code, different orderings. Some orderings are buggy — this finds which.","start-open":""},{default:I(()=>[...n[0]||(n[0]=[h("p",{class:"mb-3 text-ink-muted"},[O(" Two threads run at the same time, so their instructions can land in many different orders. The code never changes; only the "),h("em",null,"ordering"),O(" does. Most concurrency bugs are orderings that happen to be rare — which is exactly why they survive testing and surface in production. This page enumerates the orderings instead of waiting to get unlucky. ")],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint"}," Reading an interleaving ",-1),h("p",{class:"mb-3 text-ink-muted"},[O(" Each chip is one complete ordering, written as letters: "),h("code",{class:"font-mono text-xs"},"A"),O(" means T0 takes its next step, "),h("code",{class:"font-mono text-xs"},"B"),O(" means T1 does. So "),h("code",{class:"font-mono text-xs"},"ABABAB"),O(" is strict alternation, and "),h("code",{class:"font-mono text-xs"},"AAABBB"),O(" is T0 finishing completely before T1 starts. "),h("span",{class:"font-semibold text-danger"},"Chips that break the invariant are marked"),O("; click any chip to load it, and playback jumps straight to the step where it first goes wrong. ")],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint"}," The two scenarios ",-1),h("ul",{class:"mb-4 space-y-2 text-ink-muted"},[h("li",null,[h("b",null,"Racy counter."),O(),h("code",{class:"font-mono text-xs"},"counter = counter + 1"),O(" is three machine steps, not one: read, add, write. If both threads read before either writes, they both compute the same value and one increment vanishes. Only the two orderings where one thread finishes first are safe. ")]),h("li",null,[h("b",null,"Mutex violation."),O(" Checking whether a lock is free and taking it are separate steps, so both threads can see it free and both walk in. Watch for two lanes showing "),h("em",null,"in critical section"),O(" at once — and note the state looks perfectly fine again by the last step, which is why this bug is so hard to catch after the fact. ")])],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint"}," “Checked all” vs “sampled” ",-1),h("p",{class:"mb-2 text-ink-muted"},[O(" The number of orderings explodes as threads and instructions grow — two threads of three steps is 20, but five threads of four is over 300 billion. When the total is small enough, every single ordering is executed and checked, and the panel says "),h("b",null,"checked all N"),O(". When it is not, orderings are sampled instead and the panel says so. Both scenarios here are small enough to check exhaustively, so nothing is being missed. ")],-1),h("p",{class:"text-ink-faint"}," The seed only matters in sampled mode, where it decides which orderings get drawn. Sharing the URL reproduces the exact interleaving you are looking at. ",-1)])]),_:1}))}}),$1={class:"mb-3 text-xs text-ink-muted"},E1={class:"flex max-h-52 flex-wrap gap-1.5 overflow-y-auto",role:"listbox"},C1=["aria-selected","title","onClick"],A1={key:0,class:"nums mt-2 text-xs text-ink-faint"},T1=Z({__name:"ScheduleList",props:{outcomes:{},selected:{},summary:{},limit:{default:240}},emits:["select"],setup(t,{emit:e}){const n=t,s=e,o=E(()=>n.selected.join(",")),a=E(()=>[...n.outcomes].sort((u,c)=>Number(c.violates)-Number(u.violates))),r=E(()=>a.value.slice(0,n.limit)),i=E(()=>Math.max(0,a.value.length-r.value.length));function l(u){return u.map(c=>String.fromCharCode(65+c)).join("")}return(u,c)=>(w(),W(ye,{title:"Interleavings"},{default:I(()=>[h("p",$1,M(t.summary),1),h("div",E1,[(w(!0),C(ee,null,ce(r.value,d=>(w(),C("button",{key:d.schedule.join(","),type:"button",role:"option","aria-selected":d.schedule.join(",")===o.value,title:d.violates?"Breaks the invariant":"Invariant holds throughout",class:fe(["rounded-lg border px-2 py-1 font-mono text-[11px] font-semibold transition-colors",[d.violates?"border-danger/40 bg-danger-soft text-danger hover:border-danger":"border-line text-ink-muted hover:border-accent",d.schedule.join(",")===o.value?"outline outline-2 outline-offset-1 outline-accent":""]]),onClick:p=>s("select",d.schedule)},M(l(d.schedule)),11,C1))),128))]),i.value>0?(w(),C("p",A1," + "+M(i.value.toLocaleString())+" more not shown. ",1)):re("",!0),c[0]||(c[0]=h("p",{class:"mt-3 text-[11px] text-ink-faint"}," Each letter is a thread taking one step. A = T0, B = T1. ",-1))]),_:1}))}}),O1={class:"mb-4 text-xs text-ink-faint"},_1={class:"flex flex-col gap-3"},M1={class:"flex items-center gap-2"},R1={class:"font-mono text-xs font-bold text-ink-muted"},j1={class:"flex gap-1.5 overflow-x-auto pb-1"},I1={class:"mt-4 border-t border-line pt-3"},D1={class:"flex flex-wrap gap-2"},L1={key:0,class:"mt-3 font-mono text-xs text-ink-faint"},N1=Z({__name:"ThreadLanes",props:{scenario:{},threads:{},sharedMem:{},lockOwners:{},lastAction:{},violated:{type:Boolean}},setup(t){const e=t,n=E(()=>e.scenario.threads.map((i,l)=>{var c;const u=e.threads[l];return{name:i.name,instructions:i.instructions,pc:(u==null?void 0:u.pc)??0,status:(u==null?void 0:u.status)??"ready",locals:(u==null?void 0:u.locals)??{},activeIndex:((c=e.lastAction)==null?void 0:c.threadId)===l&&u?u.pc-1:-1}})),s=E(()=>Object.entries(e.sharedMem)),o=E(()=>Object.entries(e.lockOwners));function a(i,l){const u=n.value[i];return l===u.activeIndex?u.status==="critical"?`${Ye.blocked} ${wt.blocked} ${Tn.blocked}`:`${Ye.active} ${wt.active} ${Tn.active}`:l<u.pc?`${Ye.settled} ${wt.settled} ${Tn.settled}`:`${Ye.idle} ${Tn.idle}`}const r={ready:"bg-surface-alt text-ink-muted",critical:"bg-danger-soft text-danger-ink",done:"bg-ok-soft text-ok-ink"};return(i,l)=>(w(),W(ye,{class:"flex h-full flex-col",title:"Threads"},{header:I(()=>[h("span",{class:fe(["rounded-full px-2.5 py-0.5 text-xs font-semibold",t.violated?"bg-danger-soft text-danger-ink":"bg-ok-soft text-ok-ink"])},M(t.violated?"✕ invariant broken":"✓ invariant holds"),3)]),default:I(()=>[h("p",O1,M(t.scenario.invariant.label),1),h("div",_1,[(w(!0),C(ee,null,ce(n.value,(u,c)=>(w(),C("div",{key:u.name,class:"flex flex-col gap-1.5"},[h("div",M1,[h("span",R1,M(u.name),1),h("span",{class:fe(["rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",r[u.status]])},M(u.status==="critical"?"in critical section":u.status),3),(w(!0),C(ee,null,ce(u.locals,(d,p)=>(w(),C("span",{key:p,class:"font-mono text-[11px] text-ink-faint"},M(p)+"="+M(d),1))),128))]),h("div",j1,[(w(!0),C(ee,null,ce(u.instructions,(d,p)=>(w(),C("span",{key:p,class:fe(["whitespace-nowrap rounded-lg border px-2.5 py-1.5 font-mono text-[11px] transition-colors",a(c,p)])},M(d.label),3))),128))])]))),128))]),h("div",I1,[h("div",D1,[(w(!0),C(ee,null,ce(s.value,([u,c])=>(w(),C("span",{key:u,class:"rounded-lg bg-surface-alt px-2.5 py-1.5 font-mono text-xs text-ink-muted"},M(u)+": "+M(c),1))),128)),(w(!0),C(ee,null,ce(o.value,([u,c])=>(w(),C("span",{key:u,class:fe(["rounded-lg px-2.5 py-1.5 font-mono text-xs",c===null?"bg-surface-alt text-ink-muted":"bg-warn-soft text-warn-ink"])}," lock "+M(u)+": "+M(c===null?"free":`held by T${c}`),3))),128))]),t.lastAction?(w(),C("p",L1," T"+M(t.lastAction.threadId)+" ran “"+M(t.lastAction.instruction)+"” ",1)):re("",!0)])]),_:1}))}}),P1={class:"grid gap-4 lg:grid-cols-[minmax(0,360px)_1fr]"},B1={class:"flex flex-col gap-4"},F1={class:"flex flex-col gap-4"},V1={class:"mb-3 grid grid-cols-2 gap-2 sm:grid-cols-4"},H1={class:"text-sm text-ink-muted"},U1=Z({__name:"ConcurrencyView",setup(t){const e=h1(),n=ws(),s=E(()=>e.selected.value),o=E(()=>{const l=s.value;return l?l.violates?`This ordering breaks the invariant, first at step ${l.firstViolationIndex+1}.`:"This ordering is safe — the invariant holds at every step.":"No interleaving selected."}),a=E(()=>{var l;return(l=s.value)!=null&&l.violates?"error":"running"}),r=E(()=>{var l;return(l=s.value)!=null&&l.violates?"Buggy ordering":"Safe ordering"}),i=E(()=>{var l,u,c;return[{label:"Step",value:`${e.stats.executed} / ${e.stats.total}`},{label:"Broken",value:(((l=e.search.value)==null?void 0:l.violatingCount)??0).toLocaleString()},{label:"Checked",value:(((u=e.search.value)==null?void 0:u.checkedCount)??0).toLocaleString()},{label:"Coverage",value:((c=e.search.value)==null?void 0:c.mode)==="exhaustive"?"all":"sampled"}]});return(l,u)=>{var c;return w(),C("div",P1,[h("div",B1,[f(n)?re("",!0):(w(),W(S1,{key:0})),T(k1,{scenario:f(e).scenarioKey.value,"onUpdate:scenario":u[0]||(u[0]=d=>f(e).scenarioKey.value=d),speed:f(e).speed.value,"onUpdate:speed":u[1]||(u[1]=d=>f(e).speed.value=d),status:f(e).status.value,"can-edit":f(e).canEdit.value,"is-running":f(e).isRunning.value,"is-paused":f(e).isPaused.value,"has-schedule":f(e).schedule.value.length>0,seed:f(e).seed.value,onRun:u[2]||(u[2]=d=>f(e).run()),onPause:u[3]||(u[3]=d=>f(e).pause()),onReset:u[4]||(u[4]=d=>f(e).reset()),onRandomize:u[5]||(u[5]=d=>f(e).randomizeSeed()),"onUpdate:seed":u[6]||(u[6]=d=>f(e).seed.value=d)},null,8,["scenario","speed","status","can-edit","is-running","is-paused","has-schedule","seed"]),T(xn,{cursor:f(e).cursor.value,"buffered-count":f(e).bufferedCount.value,"fully-buffered":f(e).fullyBuffered.value,"can-step-back":f(e).canStepBack.value,"can-step-forward":f(e).canStepForward.value,onSeek:u[7]||(u[7]=d=>f(e).seek(d)),onStepBack:u[8]||(u[8]=d=>f(e).stepBack()),onStepForward:u[9]||(u[9]=d=>f(e).stepForward()),onSkipToEnd:u[10]||(u[10]=d=>f(e).skipToEnd())},null,8,["cursor","buffered-count","fully-buffered","can-step-back","can-step-forward"])]),h("div",F1,[T(ye,{title:"Search"},{header:I(()=>[T(Sn,{status:a.value,label:r.value},null,8,["status","label"])]),default:I(()=>[h("div",V1,[(w(!0),C(ee,null,ce(i.value,d=>(w(),W(Nt,{key:d.label,label:d.label,value:d.value},null,8,["label","value"]))),128))]),h("p",H1,M(o.value),1)]),_:1}),T(T1,{outcomes:((c=f(e).search.value)==null?void 0:c.outcomes)??[],selected:f(e).schedule.value,summary:f(e).summary.value,onSelect:u[11]||(u[11]=d=>f(e).selectSchedule(d))},null,8,["outcomes","selected","summary"]),T(N1,{class:"flex-1",scenario:f(e).scenario.value,threads:f(e).threads.value,"shared-mem":f(e).sharedMem.value,"lock-owners":f(e).lockOwners.value,"last-action":f(e).lastAction.value,violated:f(e).violatedNow.value},null,8,["scenario","threads","shared-mem","lock-owners","last-action","violated"])])])}}}),z1={key:0,class:"text-sm text-ink-muted"},q1={key:1,class:"space-y-3"},K1={key:0,class:"text-sm text-ink-muted"},G1={key:1,class:"break-words rounded-xl bg-surface-alt p-3 font-mono text-sm text-ink sm:text-base"},W1={key:2,class:"space-y-1.5 text-sm"},X1={class:"text-ink-muted"},Hr=Z({__name:"AvStepInspector",props:{title:{default:"Why this step"},headline:{default:null},formula:{default:null},rows:{default:()=>[]},empty:{default:"Run a step to see how it was computed."}},setup(t){const e=t,n={neutral:"text-ink",good:"text-ok-ink",warn:"text-warn-ink",bad:"text-danger-ink"};function s(a){return n[a??"neutral"]}const o=E(()=>!e.headline&&!e.formula&&e.rows.length===0);return(a,r)=>(w(),W(ye,{title:t.title},{default:I(()=>[o.value?(w(),C("p",z1,M(t.empty),1)):(w(),C("div",q1,[t.headline?(w(),C("p",K1,M(t.headline),1)):re("",!0),t.formula?(w(),C("div",G1,M(t.formula),1)):re("",!0),t.rows.length?(w(),C("dl",W1,[(w(!0),C(ee,null,ce(t.rows,i=>(w(),C("div",{key:i.label,class:"flex items-center justify-between gap-3"},[h("dt",X1,M(i.label),1),h("dd",{class:fe(["break-words text-right font-mono",s(i.tone)])},M(i.value),3)]))),128))])):re("",!0)]))]),_:1},8,["title"]))}}),Y1={class:"mt-5 grid grid-cols-2 gap-2"},J1={class:"mt-3 text-center text-xs text-ink-faint"},Q1=Z({__name:"DpControls",props:{speed:{},status:{},canEdit:{type:Boolean},isRunning:{type:Boolean},isPaused:{type:Boolean},canRun:{type:Boolean}},emits:["update:speed","run","pause","reset","step"],setup(t,{emit:e}){const n=t,s=e,o=E(()=>n.canRun?n.canEdit?"Editing the input clears the table and starts over.":"The algorithm and its input lock while the table fills.":"Fix the input before running.");return(a,r)=>(w(),W(ye,{title:"Controls"},{default:I(()=>[T(He,{label:"Speed","model-value":t.speed,min:1,max:100,suffix:"%","onUpdate:modelValue":r[0]||(r[0]=i=>s("update:speed",i))},null,8,["model-value"]),h("div",Y1,[t.isRunning?(w(),W(te,{key:1,variant:"warning",class:"col-span-2",onClick:r[2]||(r[2]=i=>s("pause"))},{default:I(()=>[...r[6]||(r[6]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M6 4h4v16H6zM14 4h4v16h-4z"})],-1),O(" Pause ",-1)])]),_:1})):(w(),W(te,{key:0,variant:"primary",class:"col-span-2",disabled:!t.canRun,onClick:r[1]||(r[1]=i=>s("run"))},{default:I(()=>[r[5]||(r[5]=h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M8 5v14l11-7z"})],-1)),O(" "+M(t.isPaused?"Resume":"Run"),1)]),_:1},8,["disabled"])),T(te,{variant:"neutral",onClick:r[3]||(r[3]=i=>s("reset"))},{default:I(()=>[...r[7]||(r[7]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.36 2.64L3 8"}),h("path",{d:"M3 3v5h5"})],-1),O(" Reset ",-1)])]),_:1}),T(te,{variant:"neutral",disabled:!t.canRun,onClick:r[4]||(r[4]=i=>s("step"))},{default:I(()=>[...r[8]||(r[8]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M6 5v14l9-7z"}),h("path",{d:"M17 5h2v14h-2z"})],-1),O(" Step ",-1)])]),_:1},8,["disabled"])]),h("p",J1,M(o.value),1)]),_:1}))}}),Z1=Z({__name:"DpGuide",setup(t){return(e,n)=>(w(),W(to,{title:"How to read this",summary:"Every cell is a smaller version of the same question, answered once and reused.","start-open":""},{default:I(()=>[...n[0]||(n[0]=[h("p",{class:"mb-3 text-ink-muted"},[O(" A dynamic programming table is a list of subproblems with their answers written down. Each cell asks a smaller version of the same question — "),h("em",null,"what is the best I can do with the first 3 items and a capacity of 5?"),O(" — and the recurrence at the top of the table says how to answer it using cells that are already filled in. Nothing is ever computed twice, which is the entire trick: the naive recursion asks the same subproblem over and over, and the table simply refuses to. ")],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint"}," Reading the arrows ",-1),h("p",{class:"mb-3 text-ink-muted"},[O(" The "),h("span",{class:"font-semibold text-tone-active-ink"},"cell being computed right now"),O(" is highlighted. The "),h("span",{class:"font-semibold text-tone-trace-ink"},"cells its recurrence read"),O(" are highlighted too, and an arrow runs from each of them into it. Where the recurrence has to "),h("em",null,"choose"),O(" — take the item or skip it, insert or delete or substitute — the "),h("span",{class:"font-semibold text-tone-active-ink"},"chosen branch"),O(" is drawn thicker, and the others stay thin. That thicker arrow is the decision the traceback will later follow back. ")],-1),h("p",{class:"mb-3 text-ink-muted"},[O(" Hover any cell — filled or not, at any point in the run — to see the arrows for "),h("em",null,"that"),O(" cell instead, drawn dashed. They come from the same function the animation uses, so what you see on hover is exactly what the algorithm would read. ")],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint"}," The traceback ",-1),h("p",{class:"mb-3 text-ink-muted"},[O(" Filling the table answers the question with a "),h("em",null,"number"),O(": the length of the longest common subsequence, the cost of the cheapest parenthesisation. It does not, by itself, tell you "),h("em",null,"which"),O(" subsequence or "),h("em",null,"which"),O(" parenthesisation. The "),h("span",{class:"font-semibold text-tone-trace-ink"},"traceback path"),O(" is the second pass that recovers it, walking backwards from the answer cell and, at each step, asking which branch won there. That is why the traceback lights up a thin path through a large table — most of the cells were needed to be sure, but only a few are part of the answer. ")],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint"}," Cells versus calls ",-1),h("p",{class:"text-ink-faint"},[O(" The stats panel counts both: the cells this table costs, and the calls the naive recursion would have made on the same input. Fibonacci at n = 40 is 41 cells against 331 million calls. The call counts are exact, not estimated — and where one grows past what a JavaScript number can hold exactly, it is shown as a lower bound ("),h("code",{class:"font-mono text-xs"},"> 9.0e15"),O(") rather than as a wrong-looking round number. ")],-1)])]),_:1}))}}),ek={class:"space-y-4"},tk={class:"text-xs text-ink-faint"},nk={key:0,class:"mt-3 text-xs text-danger"},sk={key:1,class:"mt-3 text-xs text-ink-faint"},ok={class:"mt-4"},ak=Z({__name:"DpInputPanel",props:{algoKey:{},input:{},canEdit:{type:Boolean}},emits:["update:input","shuffle"],setup(t,{emit:e}){const n=t,s=e,o=Ne({n:12,coins:"",amount:11,values:"",weights:"",itemValues:"",capacity:9,a:"",b:"",dims:""});let a="";const r=E(()=>Yt[n.algoKey]),i=E(()=>Wu(r.value,n.input)),l=E(()=>r.value.kind),u=E(()=>{const v=i.value.axes.colTitle||"size";return v.charAt(0).toUpperCase()+v.slice(1)}),c=E(()=>{const{rows:v,cols:x}=i.value.dims;return{rows:v,cols:x,cells:v*x}});function d(){const v=Fn(o.weights,{min:1,max:99,maxLength:30});if(v.error)return{items:null,error:v.error};const S=o.itemValues.trim()===""?{values:v.values.map(()=>0),error:null}:Fn(o.itemValues,{min:0,max:999,maxLength:30});return S.error?{items:null,error:S.error}:S.values.length!==v.values.length?{items:null,error:`Give one value per weight — ${v.values.length} weights, ${S.values.length} values.`}:{items:v.values.map(($,R)=>({weight:$,value:S.values[R]})),error:null}}const p=E(()=>{switch(l.value){case"scalar":return{input:{kind:"scalar",n:o.n},error:null};case"coins":{const v=Fn(o.coins,{min:1,max:99,maxLength:8});return v.error?{input:null,error:v.error}:{input:{kind:"coins",coins:v.values,amount:o.amount},error:null}}case"sequence":{const v=Fn(o.values,{min:1,max:99,maxLength:40});return v.error?{input:null,error:v.error}:{input:{kind:"sequence",values:v.values},error:null}}case"items":{const{items:v,error:x}=d();return v===null?{input:null,error:x}:{input:{kind:"items",items:v,capacity:o.capacity},error:null}}case"strings2":return{input:{kind:"strings2",a:o.a,b:o.b},error:null};case"chain":{const v=Fn(o.dims,{min:1,max:999,maxLength:31});return v.error?{input:null,error:v.error}:{input:{kind:"chain",dims:v.values},error:null}}}return{input:null,error:null}}),m=E(()=>p.value.error!==null?p.value.error:p.value.input===null?null:Io(r.value,p.value.input));function b(){const v=p.value.input;v!==null&&Io(r.value,v)===null&&(a=Ps(v),s("update:input",v))}function g(v,x){o[v]=x,b()}function y(v){switch(v.kind){case"scalar":o.n=v.n;break;case"coins":o.coins=v.coins.join(", "),o.amount=v.amount;break;case"sequence":o.values=v.values.join(", ");break;case"items":o.weights=v.items.map(x=>x.weight).join(", "),o.itemValues=v.items.map(x=>x.value).join(", "),o.capacity=v.capacity;break;case"strings2":o.a=v.a,o.b=v.b;break;case"chain":o.dims=v.dims.join(", ");break}a=Ps(v)}return Re(()=>n.input,v=>{Ps(v)!==a&&y(v)},{immediate:!0,deep:!0}),(v,x)=>(w(),W(ye,{title:"Input"},{default:I(()=>[h("div",ek,[l.value==="scalar"?(w(),W(He,{key:0,label:"n","model-value":o.n,min:0,max:40,disabled:!t.canEdit,"onUpdate:modelValue":x[0]||(x[0]=S=>g("n",S))},null,8,["model-value","disabled"])):l.value==="coins"?(w(),C(ee,{key:1},[T($t,{label:"Coin values",placeholder:"1, 3, 4",monospace:"","model-value":o.coins,disabled:!t.canEdit,"onUpdate:modelValue":x[1]||(x[1]=S=>g("coins",S))},null,8,["model-value","disabled"]),T(He,{label:u.value,"model-value":o.amount,min:0,max:60,disabled:!t.canEdit,"onUpdate:modelValue":x[2]||(x[2]=S=>g("amount",S))},null,8,["label","model-value","disabled"])],64)):l.value==="sequence"?(w(),W($t,{key:2,label:"Sequence",placeholder:"3, 10, 2, 1, 20",monospace:"","model-value":o.values,disabled:!t.canEdit,"onUpdate:modelValue":x[3]||(x[3]=S=>g("values",S))},null,8,["model-value","disabled"])):l.value==="items"?(w(),C(ee,{key:3},[T($t,{label:"Item weights",placeholder:"2, 3, 4, 5",monospace:"","model-value":o.weights,disabled:!t.canEdit,"onUpdate:modelValue":x[4]||(x[4]=S=>g("weights",S))},null,8,["model-value","disabled"]),T($t,{label:"Item values (blank = all zero)",placeholder:"3, 4, 5, 8",monospace:"","model-value":o.itemValues,disabled:!t.canEdit,"onUpdate:modelValue":x[5]||(x[5]=S=>g("itemValues",S))},null,8,["model-value","disabled"]),T(He,{label:u.value,"model-value":o.capacity,min:0,max:60,disabled:!t.canEdit,"onUpdate:modelValue":x[6]||(x[6]=S=>g("capacity",S))},null,8,["label","model-value","disabled"])],64)):l.value==="strings2"?(w(),C(ee,{key:4},[T($t,{label:"String a (rows)",placeholder:"kitten",monospace:"","model-value":o.a,disabled:!t.canEdit,"onUpdate:modelValue":x[7]||(x[7]=S=>g("a",S))},null,8,["model-value","disabled"]),T($t,{label:"String b (columns)",placeholder:"sitting",monospace:"","model-value":o.b,disabled:!t.canEdit,"onUpdate:modelValue":x[8]||(x[8]=S=>g("b",S))},null,8,["model-value","disabled"])],64)):(w(),C(ee,{key:5},[T($t,{label:"Matrix dimensions",placeholder:"40, 20, 30, 10, 30",monospace:"","model-value":o.dims,disabled:!t.canEdit,"onUpdate:modelValue":x[9]||(x[9]=S=>g("dims",S))},null,8,["model-value","disabled"]),h("p",tk,M(c.value.rows)+" matrices — dimension i and i + 1 are the shape of matrix i. ",1)],64))]),m.value?(w(),C("p",nk,M(m.value),1)):(w(),C("p",sk," Table: "+M(c.value.rows)+" × "+M(c.value.cols)+" = "+M(c.value.cells.toLocaleString())+" cells (limit "+M(f(Ya).toLocaleString())+"). ",1)),h("div",ok,[T(te,{variant:"quiet",class:"w-full",disabled:!t.canEdit,onClick:x[10]||(x[10]=S=>s("shuffle"))},{default:I(()=>[...x[11]||(x[11]=[O(" Shuffle input ",-1)])]),_:1},8,["disabled"])])]),_:1}))}}),Ur=Z({__name:"AvStatGrid",props:{cells:{},columns:{default:4}},setup(t){const e={2:"grid grid-cols-2 gap-2",3:"grid grid-cols-2 gap-2 sm:grid-cols-3",4:"grid grid-cols-2 gap-2 sm:grid-cols-4"};return(n,s)=>(w(),C("div",{class:fe(e[t.columns])},[(w(!0),C(ee,null,ce(t.cells,o=>(w(),W(Nt,{key:o.label,label:o.label,value:o.value},null,8,["label","value"]))),128))],2))}}),rk={key:0,class:"mb-3 break-words rounded-xl bg-ok-soft p-3 text-center text-sm font-semibold text-ok-ink"},ik={key:1,class:"mb-3 rounded-xl bg-warn-soft p-3 text-center text-xs font-semibold text-warn-ink"},lk=Z({__name:"DpStats",props:{cellsFilled:{},fillable:{},rows:{},cols:{},naiveCalls:{},speedup:{},steps:{},elapsedMs:{},status:{},result:{},truncated:{type:Boolean}},setup(t){const e=t,n=E(()=>e.speedup<=0?"—":`${Yu(e.naiveCalls)?"> ":""}${Hi(Math.round(e.speedup))}×`),s=E(()=>[{label:"Cells filled",value:`${e.cellsFilled.toLocaleString()} / ${e.fillable.toLocaleString()}`},{label:"Naive calls",value:Hi(e.naiveCalls)},{label:"Cheaper by",value:n.value},{label:"Table",value:`${e.rows} × ${e.cols}`},{label:"Steps",value:e.steps.toLocaleString()},{label:"Elapsed",value:`${(e.elapsedMs/1e3).toFixed(2)}s`}]);return(o,a)=>(w(),W(ye,{title:"Stats"},{header:I(()=>[T(Sn,{status:t.status},null,8,["status"])]),default:I(()=>[t.result?(w(),C("div",rk,M(t.result),1)):re("",!0),t.truncated?(w(),C("div",ik," The step cap stopped this run early — the counts below are partial. ")):re("",!0),T(Ur,{cells:s.value,columns:3},null,8,["cells"])]),_:1}))}}),uk=34,ck=4,dk=40,pk=6;function Sl(t,e,n,s=0){const o=n.x-t.x,a=n.y-t.y,r=Math.hypot(o,a);if(r===0)return{x:t.x,y:t.y};const i=o/r,l=a/r,u=i===0?1/0:e.w/Math.abs(i),c=l===0?1/0:e.h/Math.abs(l),d=Math.min(u,c)+s;return{x:t.x+i*d,y:t.y+l*d}}function fk(t){const e=Math.max(0,t.rows),n=Math.max(0,t.cols),s=t.cell??uk,o=t.gap??ck,a=t.header??dk,r=t.pad??pk,i=s+o,l=r+a,u=r+a,c=n===0?l+r:l+n*i-o+r,d=e===0?u+r:u+e*i-o+r,p={w:s/2,h:s/2},m=(g,y)=>({x:l+y*i,y:u+g*i,w:s,h:s}),b=(g,y)=>({x:l+y*i+s/2,y:u+g*i+s/2});return{rows:e,cols:n,cell:s,gap:o,header:a,pad:r,width:c,height:d,viewBox:`0 0 ${c} ${d}`,cellRect:m,center:b,rowHeaderRect:g=>({x:r,y:u+g*i,w:a,h:s}),colHeaderRect:g=>({x:l+g*i,y:r,w:s,h:a}),arrow:(g,y)=>{if(g.row===y.row&&g.col===y.col)return null;const v=b(g.row,g.col),x=b(y.row,y.col),S=Sl(v,p,x,1),$=Sl(x,p,v,3);return{x1:S.x,y1:S.y,x2:$.x,y2:$.y}}}}const hk={class:"mb-3 flex flex-wrap items-center gap-x-4 gap-y-2"},mk={class:"text-xs font-semibold uppercase tracking-wider text-ink-faint"},gk={key:0,class:"rounded-lg bg-surface-alt px-2 py-1 font-mono text-xs text-accent"},vk=["width","height","viewBox"],bk=["x","y"],yk=["x","y"],wk=["x","y"],xk=["x","y"],kk=["aria-label","data-cell","data-tone","onPointerenter"],Sk=["x","y","width","height"],$k=["x","y","font-size"],Ek={class:"pointer-events-none"},Ck=["x1","y1","x2","y2"],Ak=["x1","y1","x2","y2","stroke-width","marker-end"],Tk=Z({__name:"DpTable",props:{table:{},axes:{},recurrence:{default:""},cursor:{default:null},deps:{default:()=>[]},chosen:{default:null},path:{default:()=>[]},hoverCell:{default:null},hoverDeps:{default:()=>[]},title:{default:"Table"}},emits:["hover-cell"],setup(t,{emit:e}){const n=t,s=e,o={empty:"fill-tone-idle-soft",filled:"fill-tone-settled-soft",path:"fill-tone-trace-soft",dep:"fill-tone-trace-soft",focus:"fill-tone-probe-soft/60",filling:"fill-tone-active-soft"},a=kn([{tone:"idle",label:"Not computed"},{tone:"settled",label:"Computed"},{tone:"active",label:"Filling now"},{tone:"trace",label:"Read by this cell"},{tone:"trace",label:"Traceback"}]);function r(D){return`${D.row},${D.col}`}const i=E(()=>n.table.length),l=E(()=>{var D;return((D=n.table[0])==null?void 0:D.length)??0}),u=E(()=>fk({rows:i.value,cols:l.value})),c=E(()=>new Set(n.deps.map(r))),d=E(()=>new Set(n.hoverDeps.map(r))),p=E(()=>new Set(n.path.map(r)));function m(D,N){const j=`${D},${N}`;return n.cursor&&n.cursor.row===D&&n.cursor.col===N?"filling":n.hoverCell&&n.hoverCell.row===D&&n.hoverCell.col===N?"focus":c.value.has(j)||d.value.has(j)?"dep":p.value.has(j)?"path":n.table[D][N]===null?"empty":"filled"}function b(D){return Math.round(Math.min(13,50/Math.max(1,D.length))*2)/2}function g(D){return D.length>7?`${D.slice(0,6)}…`:D}const y={empty:"",filled:"",filling:", being computed now",focus:"",dep:", read by the current cell",path:", on the traceback path"},v=E(()=>{const D=[];for(let N=0;N<i.value;N++)for(let j=0;j<l.value;j++){const me=n.table[N][j],Se=Wn(me),z=m(N,j),ae=n.axes.rowHeaders[N]??String(N),L=n.axes.colHeaders[j]??String(j);D.push({key:`${N},${j}`,row:N,col:j,rect:u.value.cellRect(N,j),text:Se,fontSize:b(Se),tone:z,label:me===null?`${ae} by ${L}: not computed yet`:`${ae} by ${L}: ${Se}${y[z]}`})}return D}),x=E(()=>Array.from({length:l.value},(D,N)=>{const j=n.axes.colHeaders[N]??String(N),me=u.value.colHeaderRect(N);return{key:N,x:me.x+u.value.cell/2,y:me.y+me.h-8,text:g(j),full:j}})),S=E(()=>Array.from({length:i.value},(D,N)=>{const j=n.axes.rowHeaders[N]??String(N),me=u.value.rowHeaderRect(N);return{key:N,x:me.x+me.w-6,y:me.y+me.h/2,text:g(j),full:j}}));function $(D,N,j){if(D===null)return[];const me=new Set,Se=[];for(const z of N){const ae=r(z);if(me.has(ae))continue;me.add(ae);const L=u.value.arrow(z,D);L!==null&&Se.push({key:ae,...L,chosen:j!==null&&j.row===z.row&&j.col===z.col,label:z.label})}return Se.sort((z,ae)=>Number(z.chosen)-Number(ae.chosen))}const R=E(()=>$(n.cursor,n.deps,n.chosen)),P=E(()=>{const D=n.hoverCell;return D===null?[]:n.cursor&&n.cursor.row===D.row&&n.cursor.col===D.col?[]:$(D,n.hoverDeps,null)});function K(D,N){s("hover-cell",{row:D,col:N})}return(D,N)=>(w(),W(ye,{class:"flex h-full flex-col"},{default:I(()=>[h("div",hk,[h("h2",mk,M(t.title),1),t.recurrence?(w(),C("code",gk,M(t.recurrence),1)):re("",!0),T(Dn,{items:f(a)},null,8,["items"])]),h("div",{class:"max-h-[60vh] flex-1 overflow-auto rounded-xl bg-surface-alt p-3",onPointerleave:N[0]||(N[0]=j=>s("hover-cell",null))},[(w(),C("svg",{width:u.value.width,height:u.value.height,viewBox:u.value.viewBox,class:"block select-none"},[N[1]||(N[1]=h("defs",null,[h("marker",{id:"dp-arrowhead",viewBox:"0 0 8 8",refX:"7",refY:"4",markerWidth:"5",markerHeight:"5",orient:"auto-start-reverse"},[h("path",{d:"M0 0 L8 4 L0 8 z",class:"fill-ink-muted"})]),h("marker",{id:"dp-arrowhead-chosen",viewBox:"0 0 8 8",refX:"7",refY:"4",markerWidth:"5",markerHeight:"5",orient:"auto-start-reverse"},[h("path",{d:"M0 0 L8 4 L0 8 z",class:"fill-tone-active"})])],-1)),(w(!0),C(ee,null,ce(x.value,j=>(w(),C("text",{key:`col-${j.key}`,x:j.x,y:j.y,"text-anchor":"middle","dominant-baseline":"central",class:"fill-ink-muted text-[10px] font-semibold"},[h("title",null,M(j.full),1),O(" "+M(j.text),1)],8,bk))),128)),(w(!0),C(ee,null,ce(S.value,j=>(w(),C("text",{key:`row-${j.key}`,x:j.x,y:j.y,"text-anchor":"end","dominant-baseline":"central",class:"fill-ink-muted text-[10px] font-semibold"},[h("title",null,M(j.full),1),O(" "+M(j.text),1)],8,yk))),128)),t.axes.colTitle?(w(),C("text",{key:0,x:u.value.pad+4,y:u.value.pad+u.value.header/2-6,class:"fill-ink-faint text-[9px] font-semibold uppercase tracking-wide"},M(t.axes.colTitle)+" → ",9,wk)):re("",!0),t.axes.rowTitle?(w(),C("text",{key:1,x:u.value.pad+4,y:u.value.pad+u.value.header/2+8,class:"fill-ink-faint text-[9px] font-semibold uppercase tracking-wide"},M(t.axes.rowTitle)+" ↓ ",9,xk)):re("",!0),(w(!0),C(ee,null,ce(v.value,j=>(w(),C("g",{key:j.key,role:"img","aria-label":j.label,"data-cell":j.key,"data-tone":j.tone,onPointerenter:me=>K(j.row,j.col)},[h("title",null,M(j.label),1),h("rect",{x:j.rect.x,y:j.rect.y,width:j.rect.w,height:j.rect.h,rx:"4",class:fe(["transition-colors duration-150 ease-out",o[j.tone]])},null,10,Sk),h("text",{x:j.rect.x+j.rect.w/2,y:j.rect.y+j.rect.h/2,"font-size":j.fontSize,"text-anchor":"middle","dominant-baseline":"central",class:fe(["pointer-events-none font-semibold",j.tone==="empty"?"fill-ink-faint":"fill-ink"])},M(j.text),11,$k)],40,kk))),128)),h("g",Ek,[(w(!0),C(ee,null,ce(P.value,j=>(w(),C("line",{key:`hover-${j.key}`,x1:j.x1,y1:j.y1,x2:j.x2,y2:j.y2,"stroke-width":"1.5","stroke-dasharray":"3 3","marker-end":"url(#dp-arrowhead)",class:"stroke-ink-muted"},null,8,Ck))),128)),(w(!0),C(ee,null,ce(R.value,j=>(w(),C("line",{key:j.key,x1:j.x1,y1:j.y1,x2:j.x2,y2:j.y2,"stroke-width":j.chosen?2.5:1.5,"marker-end":j.chosen?"url(#dp-arrowhead-chosen)":"url(#dp-arrowhead)",class:fe(j.chosen?"stroke-tone-active":"stroke-ink-muted")},[h("title",null,M(j.label),1)],10,Ak))),128))])],8,vk))],32),N[2]||(N[2]=h("p",{class:"mt-3 text-center text-xs text-ink-faint"}," Hover any cell to see which cells its value was read from. ",-1))]),_:1}))}}),Ok={class:"grid gap-4 lg:grid-cols-[minmax(0,360px)_1fr]"},_k={class:"flex flex-col gap-4"},Mk={class:"flex flex-col gap-4"},Rk=Z({__name:"DpView",setup(t){const e=tv(),n=ws();function s(i){return e.dims.value.rows===1?`dp[${i.col}]`:`dp[${i.row}][${i.col}]`}function o(i){const l=e.view.chosen;return l!==null&&l.row===i.row&&l.col===i.col}const a=E(()=>e.view.deps.map(i=>({label:i.label,value:`${s(i)} = ${Wn(i.value)}`,tone:o(i)?"good":"neutral"}))),r=E(()=>e.current.value===null?null:e.view.cursor!==null?`Computing ${s(e.view.cursor)}`:e.view.result!==null?"Finished — the answer is decoded from the table":e.view.path.length>0?"Tracing back through the branches that won":null);return(i,l)=>(w(),C("div",Ok,[h("div",_k,[T(Rn,{modelValue:f(e).algoKey.value,"onUpdate:modelValue":l[0]||(l[0]=u=>f(e).algoKey.value=u),algorithms:f(Yt),columns:2,disabled:!f(e).canEdit.value},null,8,["modelValue","algorithms","disabled"]),f(n)?re("",!0):(w(),W(Z1,{key:0})),T(ak,{"algo-key":f(e).algoKey.value,input:f(e).input.value,"can-edit":f(e).canEdit.value,"onUpdate:input":l[1]||(l[1]=u=>f(e).setInput(u)),onShuffle:l[2]||(l[2]=u=>f(e).randomizeSeed())},null,8,["algo-key","input","can-edit"]),T(Q1,{speed:f(e).speed.value,"onUpdate:speed":l[3]||(l[3]=u=>f(e).speed.value=u),status:f(e).status.value,"can-edit":f(e).canEdit.value,"is-running":f(e).isRunning.value,"is-paused":f(e).isPaused.value,"can-run":f(e).canRun.value,onRun:l[4]||(l[4]=u=>f(e).run()),onPause:l[5]||(l[5]=u=>f(e).pause()),onReset:l[6]||(l[6]=u=>f(e).reset()),onStep:l[7]||(l[7]=u=>f(e).stepForward())},null,8,["speed","status","can-edit","is-running","is-paused","can-run"]),T(xn,{cursor:f(e).cursor.value,"buffered-count":f(e).bufferedCount.value,"fully-buffered":f(e).fullyBuffered.value,"can-step-back":f(e).canStepBack.value,"can-step-forward":f(e).canStepForward.value,onSeek:l[8]||(l[8]=u=>f(e).seek(u)),onStepBack:l[9]||(l[9]=u=>f(e).stepBack()),onStepForward:l[10]||(l[10]=u=>f(e).stepForward()),onSkipToEnd:l[11]||(l[11]=u=>f(e).skipToEnd())},null,8,["cursor","buffered-count","fully-buffered","can-step-back","can-step-forward"])]),h("div",Mk,[T(lk,{"cells-filled":f(e).stats.value.cellsFilled,fillable:f(e).stats.value.fillable,rows:f(e).stats.value.rows,cols:f(e).stats.value.cols,"naive-calls":f(e).stats.value.naiveCalls,speedup:f(e).stats.value.speedup,steps:f(e).stepCount.value,"elapsed-ms":f(e).elapsedMs.value,status:f(e).status.value,result:f(e).view.result,truncated:f(e).truncated.value},null,8,["cells-filled","fillable","rows","cols","naive-calls","speedup","steps","elapsed-ms","status","result","truncated"]),T(Tk,{table:f(e).table.value,axes:f(e).axes.value,recurrence:f(e).recurrence.value,cursor:f(e).view.cursor,deps:f(e).view.deps,chosen:f(e).view.chosen,path:f(e).view.path,"hover-cell":f(e).hoverCell.value,"hover-deps":f(e).hoverDeps.value,onHoverCell:l[12]||(l[12]=u=>f(e).setHoverCell(u))},null,8,["table","axes","recurrence","cursor","deps","chosen","path","hover-cell","hover-deps"]),T(Hr,{headline:r.value,formula:f(e).view.explain,rows:a.value,empty:"Run a step to see how a cell was computed."},null,8,["headline","formula","rows"]),T(ua,{lines:f(e).pseudocodeLines.value,source:f(e).sourceCode.value.text,"source-file":f(e).sourceCode.value.file,"active-line":f(e).activeLine.value,"active-source-lines":f(e).activeSourceLines.value},null,8,["lines","source","source-file","active-line","active-source-lines"])])]))}}),jk=Z({__name:"MstGuide",setup(t){return(e,n)=>(w(),W(to,{title:"How to read this",summary:"A disjoint set answers one question fast: are these two nodes already connected?","start-open":""},{default:I(()=>[...n[0]||(n[0]=[h("p",{class:"mb-3 text-ink-muted"},[O(" A "),h("b",null,"disjoint-set forest"),O(" (union-find) partitions a collection of elements into groups — here, nodes into the components they belong to — and supports exactly two operations: "),h("code",{class:"font-mono text-xs"},"find(x)"),O(", which returns the group's representative, and "),h("code",{class:"font-mono text-xs"},"union(a, b)"),O(", which merges two groups into one. Two elements are in the same group precisely when "),h("code",{class:"font-mono text-xs"},"find"),O(" returns the same answer for both. The forest panel on the right draws exactly that: an arrow from each node to its parent, with a self-pointing root marking a group's representative. ")],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint"}," Two optimizations, one payoff ",-1),h("ul",{class:"mb-4 space-y-2 text-ink-muted"},[h("li",null,[h("b",null,"Union by rank."),O(" When two trees merge, the shallower one is hung under the deeper one, never the other way round. Do this consistently and a forest built from n elements can never get deeper than log₂(n) — the Stats panel's "),h("b",null,"Max Depth"),O(" is that bound made visible, not just another counter. ")]),h("li",null,[h("b",null,"Path compression."),O(" Every "),h("code",{class:"font-mono text-xs"},"find"),O(" re-hangs every node it walked through directly onto the root it found. The next "),h("code",{class:"font-mono text-xs"},"find"),O(" on any of those nodes is then one hop instead of a walk — watch the forest panel's nodes flip from "),h("span",{class:"font-semibold text-tone-probe-ink"},"on find path"),O(" to "),h("span",{class:"font-semibold text-tone-settled-ink"},"re-hung"),O(" the instant this happens. ")])],-1),h("p",{class:"mb-4 text-ink-muted"},[O(" Neither optimization is required for correctness — a disjoint set built without them still answers "),h("code",{class:"font-mono text-xs"},"find"),O(" and "),h("code",{class:"font-mono text-xs"},"union"),O(" correctly, just slowly, degenerating toward a linked list under an unlucky sequence of unions. Together they bring every operation down to "),h("code",{class:"font-mono text-xs"},"O(α(n))"),O(" amortized — "),h("code",{class:"font-mono text-xs"},"α"),O(' being the inverse Ackermann function, which is under 5 for any n you could ever construct. That is "constant time" in every practical sense. ')],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint"}," Why Kruskal needs exactly this ",-1),h("p",{class:"mb-2 text-ink-muted"},[O(` Kruskal's rule is trivial to state — sort every edge by weight, then accept it unless its two endpoints are already connected — and completely useless without a fast answer to "already connected?", asked once per edge, on a component structure that is changing under the question as edges get accepted. A disjoint set is the one structure built to answer that question near-instantly: `),h("code",{class:"font-mono text-xs"},"find(u) === find(v)"),O(" is the whole cycle check, and "),h("code",{class:"font-mono text-xs"},"union(u, v)"),O(" is the whole merge. The two obvious alternatives are both dramatically worse — re-running a traversal from scratch per edge to check connectivity is O(E) work E times over, and maintaining an explicit component-id array means relabelling half the graph on every merge. ")],-1),h("p",{class:"text-ink-faint"},` Prim doesn't strictly need one — it could track "in the tree / not in the tree" with a plain boolean array — but this visualization runs a real disjoint set underneath it anyway, purely so both algorithms render through the same forest panel. See prim.ts's own header comment for exactly which of its counters are meaningful as a result and which are just bookkeeping. `,-1)])]),_:1}))}}),Ik={class:"space-y-4"},Dk={class:"mt-5 grid grid-cols-2 gap-2"},Lk={class:"mt-3 grid grid-cols-1 gap-2"},Nk=Z({__name:"MstControls",props:{nodeCount:{},seed:{},speed:{},status:{},canEdit:{type:Boolean},isRunning:{type:Boolean},isPaused:{type:Boolean}},emits:["update:nodeCount","update:speed","update:seed","randomize","generate","run","pause","reset"],setup(t,{emit:e}){const n=e;function s(o){const a=Number(o);Number.isInteger(a)&&n("update:seed",a)}return(o,a)=>(w(),W(ye,{title:"Controls"},{default:I(()=>[h("div",Ik,[T(He,{label:"Node count","model-value":t.nodeCount,min:f(xc),max:f(kc),disabled:!t.canEdit,"onUpdate:modelValue":a[0]||(a[0]=r=>n("update:nodeCount",r))},null,8,["model-value","min","max","disabled"]),T(He,{label:"Speed","model-value":t.speed,min:1,max:100,suffix:"%","onUpdate:modelValue":a[1]||(a[1]=r=>n("update:speed",r))},null,8,["model-value"]),T($t,{label:"Seed",monospace:"","model-value":String(t.seed),disabled:!t.canEdit,"onUpdate:modelValue":s},null,8,["model-value","disabled"])]),h("div",Dk,[t.isRunning?(w(),W(te,{key:1,variant:"warning",class:"col-span-2",onClick:a[3]||(a[3]=r=>n("pause"))},{default:I(()=>[...a[8]||(a[8]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M6 4h4v16H6zM14 4h4v16h-4z"})],-1),O(" Pause ",-1)])]),_:1})):(w(),W(te,{key:0,variant:"primary",class:"col-span-2",onClick:a[2]||(a[2]=r=>n("run"))},{default:I(()=>[a[7]||(a[7]=h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M8 5v14l11-7z"})],-1)),O(" "+M(t.isPaused?"Resume":"Run"),1)]),_:1})),T(te,{variant:"neutral",onClick:a[4]||(a[4]=r=>n("reset"))},{default:I(()=>[...a[9]||(a[9]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.36 2.64L3 8"}),h("path",{d:"M3 3v5h5"})],-1),O(" Reset ",-1)])]),_:1}),T(te,{variant:"neutral",disabled:!t.canEdit,onClick:a[5]||(a[5]=r=>n("generate"))},{default:I(()=>[...a[10]||(a[10]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"})],-1),O(" New Graph ",-1)])]),_:1},8,["disabled"])]),h("div",Lk,[T(te,{variant:"quiet",disabled:!t.canEdit,onClick:a[6]||(a[6]=r=>n("randomize"))},{default:I(()=>[...a[11]||(a[11]=[O(" New seed ",-1)])]),_:1},8,["disabled"])]),a[12]||(a[12]=h("p",{class:"mt-3 text-center text-xs text-ink-faint"}," Node count, seed & algorithm lock while a run is in progress. ",-1))]),_:1}))}}),Pk={class:"flex flex-wrap items-end gap-2"},Bk={class:"block"},Fk=["disabled"],Vk={class:"block w-16"},Hk=["max","disabled"],Uk={key:0,class:"block w-16"},zk=["max","disabled"],qk={key:0,class:"mt-1.5 text-xs text-danger"},Kk={class:"mt-1.5 text-xs text-ink-faint"},Gk={class:"mt-4"},Wk={key:0,class:"text-sm text-ink-faint"},Xk={key:1,class:"max-h-48 space-y-1 overflow-y-auto pr-1"},Yk={class:"font-mono font-semibold text-ink"},Jk=["disabled","aria-label","onClick"],Qk={class:"mt-4 grid grid-cols-2 gap-2"},Zk=Z({__name:"DsuOpBuilder",props:{ops:{},nodeCount:{},canEdit:{type:Boolean}},emits:["update:ops","randomize"],setup(t,{emit:e}){const n=t,s=e,o=B("union"),a=B("0"),r=B("0"),i=B(null),l=E(()=>Math.max(0,n.nodeCount-1));function u(b){const g=Number(b);return!Number.isInteger(g)||g<0||g>l.value?null:g}function c(b){return b.kind==="union"?`union(${b.a}, ${b.b})`:`find(${b.a})`}function d(){if(!n.canEdit)return;const b=u(a.value);if(b===null){i.value=`Node index must be a whole number from 0 to ${l.value}.`;return}if(o.value==="find"){i.value=null,s("update:ops",[...n.ops,{kind:"find",a:b}]);return}const g=u(r.value);if(g===null){i.value=`Node index must be a whole number from 0 to ${l.value}.`;return}i.value=null,s("update:ops",[...n.ops,{kind:"union",a:b,b:g}])}function p(b){n.canEdit&&s("update:ops",n.ops.filter((g,y)=>y!==b))}function m(){n.canEdit&&s("update:ops",[])}return(b,g)=>(w(),W(ye,{title:"Operation Script"},{default:I(()=>[h("div",Pk,[h("label",Bk,[g[5]||(g[5]=h("span",{class:"mb-1.5 block text-sm font-medium text-ink-muted"}," Op ",-1)),js(h("select",{"onUpdate:modelValue":g[0]||(g[0]=y=>o.value=y),disabled:!t.canEdit,class:"rounded-xl border border-line bg-surface-raised px-2.5 py-2 text-sm text-ink disabled:cursor-not-allowed disabled:opacity-50"},[...g[4]||(g[4]=[h("option",{value:"union"},"union",-1),h("option",{value:"find"},"find",-1)])],8,Fk),[[rf,o.value]])]),h("label",Vk,[g[6]||(g[6]=h("span",{class:"mb-1.5 block text-sm font-medium text-ink-muted"}," a ",-1)),js(h("input",{"onUpdate:modelValue":g[1]||(g[1]=y=>a.value=y),type:"number",min:0,max:l.value,disabled:!t.canEdit,class:"w-full rounded-xl border border-line bg-surface-raised px-2.5 py-2 text-sm text-ink disabled:cursor-not-allowed disabled:opacity-50"},null,8,Hk),[[Ro,a.value]])]),o.value==="union"?(w(),C("label",Uk,[g[7]||(g[7]=h("span",{class:"mb-1.5 block text-sm font-medium text-ink-muted"}," b ",-1)),js(h("input",{"onUpdate:modelValue":g[2]||(g[2]=y=>r.value=y),type:"number",min:0,max:l.value,disabled:!t.canEdit,class:"w-full rounded-xl border border-line bg-surface-raised px-2.5 py-2 text-sm text-ink disabled:cursor-not-allowed disabled:opacity-50"},null,8,zk),[[Ro,r.value]])])):re("",!0),T(te,{variant:"quiet",disabled:!t.canEdit,onClick:d},{default:I(()=>[...g[8]||(g[8]=[O("Add",-1)])]),_:1},8,["disabled"])]),i.value?(w(),C("p",qk,M(i.value),1)):re("",!0),h("p",Kk,"Valid nodes for this forest: 0 to "+M(l.value)+".",1),h("div",Gk,[t.ops.length===0?(w(),C("p",Wk," No operations yet — add one above, or generate a random script. ")):(w(),C("ol",Xk,[(w(!0),C(ee,null,ce(t.ops,(y,v)=>(w(),C("li",{key:v,class:"flex items-center justify-between gap-2 rounded-lg border border-line bg-surface-alt px-2.5 py-1.5 text-xs"},[h("span",Yk,M(v+1)+". "+M(c(y)),1),h("button",{type:"button",disabled:!t.canEdit,class:"rounded px-1.5 py-0.5 text-ink-faint transition-colors hover:bg-danger-soft hover:text-danger disabled:cursor-not-allowed disabled:opacity-50","aria-label":`Remove ${c(y)}`,onClick:x=>p(v)}," ✕ ",8,Jk)]))),128))]))]),h("div",Qk,[T(te,{variant:"quiet",disabled:!t.canEdit||t.ops.length===0,onClick:m},{default:I(()=>[...g[9]||(g[9]=[O(" Clear ",-1)])]),_:1},8,["disabled"]),T(te,{variant:"quiet",disabled:!t.canEdit,onClick:g[3]||(g[3]=y=>s("randomize"))},{default:I(()=>[...g[10]||(g[10]=[O(" Random script ",-1)])]),_:1},8,["disabled"])]),g[11]||(g[11]=h("p",{class:"mt-3 text-xs text-ink-faint"}," Compose the whole script, then press Run — see the guide above for why one continuous history is the point. ",-1))]),_:1}))}}),e0=Z({__name:"MstStats",props:{stats:{},status:{},isDsuMode:{type:Boolean,default:!1}},setup(t){const e=t,n=E(()=>[{label:"Finds",value:e.stats.finds.toLocaleString()},{label:"Unions",value:e.stats.unions.toLocaleString()},{label:"Compressions",value:e.stats.compressions.toLocaleString()},{label:"Max Depth",value:e.stats.maxDepth.toLocaleString()},{label:"MST Weight",value:e.isDsuMode?"—":e.stats.totalWeight.toLocaleString()},{label:"Components",value:e.stats.components.toLocaleString()}]);return(s,o)=>(w(),W(ye,{title:"Stats"},{header:I(()=>[T(Sn,{status:t.status},null,8,["status"])]),default:I(()=>[T(Ur,{cells:n.value,columns:3},null,8,["cells"])]),_:1}))}}),t0={xSpacing:46,ySpacing:54,xMargin:30,yMargin:28,rootGap:1};function n0(t,e={}){const{xSpacing:n,ySpacing:s,xMargin:o,yMargin:a,rootGap:r}={...t0,...e},i=t.length,l=Array.from({length:i},()=>[]),u=[];for(let v=0;v<i;v++){const x=t[v];x===v?u.push(v):x>=0&&x<i&&l[x].push(v)}const c=new Map,d=[],p=new Set;let m=0;function b(v){const x=[{id:v,depth:0,cursor:0}];for(p.add(v);x.length>0;){const S=x[x.length-1],$=l[S.id];if(S.cursor<$.length){const D=$[S.cursor];if(S.cursor+=1,p.has(D))continue;p.add(D),x.push({id:D,depth:S.depth+1,cursor:0});continue}x.pop();const R=$.map(D=>c.get(D)).filter(D=>D!==void 0);let P,K;if(R.length===0){const D=m;m+=1,P=o+D*n,K=[D,D]}else{const D=R.map(N=>N.x);P=(Math.min(...D)+Math.max(...D))/2,K=[Math.min(...R.map(N=>N.span[0])),Math.max(...R.map(N=>N.span[1]))]}c.set(S.id,{id:S.id,x:P,y:a+S.depth*s,depth:S.depth,parent:S.id===t[S.id]?null:t[S.id],span:K})}}for(const v of u)m>0&&(m+=r),b(v);const g=[...c.values()].sort((v,x)=>v.id-x.id);for(const v of g)v.parent!==null&&c.has(v.parent)&&d.push({from:v.parent,to:v.id});const y=g.reduce((v,x)=>Math.max(v,x.depth),0);return{nodes:g,edges:d,slotCount:m,width:Math.max(o*2,o*2+Math.max(0,m-1)*n),height:a*2+y*s}}const s0={class:"mb-3 flex flex-wrap items-center gap-x-4 gap-y-2"},o0={class:"text-xs font-semibold uppercase tracking-wider text-ink-faint"},a0={key:0,class:"py-8 text-center text-sm text-ink-faint"},r0={class:"overflow-x-auto rounded-xl bg-surface-alt p-3"},i0=["viewBox","width","height"],l0=["x1","y1","x2","y2"],u0=["cx","cy"],c0=["cx","cy"],d0=["x","y"],p0=["x","y"],f0={class:"flex flex-wrap gap-1.5"},h0={class:"w-full bg-line/70 py-0.5 text-center text-[10px] font-medium text-ink-muted"},m0={class:"py-1 font-mono text-sm font-semibold text-ink"},g0={class:"mt-3 text-center text-xs text-ink-faint"},v0=Z({__name:"DsuForest",props:{parent:{},setSize:{default:()=>[]},rank:{default:()=>[]},findPath:{default:()=>[]},compressed:{default:()=>[]},active:{default:null},labels:{default:()=>[]},title:{default:"Disjoint-Set Forest"},hint:{default:"Each tree is one set. An arrow points from a node to its parent; a node pointing at itself is a root."}},setup(t){const e=t,n={cursor:gt.active,compressed:gt.settled,path:gt.probe,root:"fill-accent",default:gt.idle},s={cursor:`${Ye.active} ${wt.active}`,compressed:`${Ye.settled} ${wt.settled}`,path:`${Ye.probe} ${wt.probe}`,root:"border-accent/60 bg-accent-soft",default:`${Ye.idle} ${wt.idle}`},o=kn([{tone:"probe",label:"On find path"},{tone:"settled",label:"Re-hung"},{tone:"active",label:"Cursor"}]),a=E(()=>new Set(e.findPath)),r=E(()=>new Set(e.compressed)),i=E(()=>n0(e.parent)),l=E(()=>new Map(i.value.nodes.map(b=>[b.id,b])));function u(b){return b===e.active?"cursor":r.value.has(b)?"compressed":a.value.has(b)?"path":e.parent[b]===b?"root":"default"}function c(b){return e.labels[b]??String(b)}const d=E(()=>e.parent.length===0);function p(b){return e.parent[b]!==b?null:e.rank[b]??null}function m(b){return e.parent[b]!==b?null:e.setSize[b]??null}return(b,g)=>(w(),W(ye,{class:"flex flex-col"},{default:I(()=>[h("div",s0,[h("h2",o0,M(t.title),1),g[0]||(g[0]=h("div",{class:"flex flex-wrap items-center gap-3 text-xs text-ink-muted"},[h("span",{class:"flex items-center gap-1.5"},[h("i",{class:"h-3 w-3 rounded-mark bg-accent"}),O("Root")])],-1)),T(Dn,{items:f(o)},null,8,["items"])]),d.value?(w(),C("p",a0,"The forest is empty.")):(w(),C(ee,{key:1},[h("div",r0,[(w(),C("svg",{viewBox:`0 0 ${i.value.width} ${i.value.height}`,width:i.value.width,height:i.value.height,class:"mx-auto block max-h-[42vh] w-full",preserveAspectRatio:"xMidYMid meet"},[(w(!0),C(ee,null,ce(i.value.edges,y=>{var v,x,S,$;return w(),C("line",{key:`${y.from}-${y.to}`,x1:(v=l.value.get(y.to))==null?void 0:v.x,y1:(x=l.value.get(y.to))==null?void 0:x.y,x2:(S=l.value.get(y.from))==null?void 0:S.x,y2:($=l.value.get(y.from))==null?void 0:$.y,"stroke-width":"2",class:fe(a.value.has(y.to)&&!r.value.has(y.to)?f(yt).probe:r.value.has(y.to)?f(yt).settled:f(yt).idle)},null,10,l0)}),128)),(w(!0),C(ee,null,ce(i.value.nodes,y=>(w(),C("g",{key:y.id},[y.parent===null?(w(),C("circle",{key:0,cx:y.x,cy:y.y-15,r:"6",fill:"none","stroke-width":"1.5",class:"stroke-accent/60"},null,8,u0)):re("",!0),h("circle",{cx:y.x,cy:y.y,r:"14",class:fe(["transition-colors duration-150 ease-out",n[u(y.id)]])},null,10,c0),h("text",{x:y.x,y:y.y,"text-anchor":"middle","dominant-baseline":"central",class:"pointer-events-none select-none fill-ink-inverse text-[10px] font-semibold"},M(c(y.id)),9,d0),p(y.id)!==null?(w(),C("text",{key:1,x:y.x,y:y.y+25,"text-anchor":"middle",class:"pointer-events-none select-none fill-ink-faint text-[9px] font-medium"}," rank "+M(p(y.id))+" · "+M(m(y.id)),9,p0)):re("",!0)]))),128))],8,i0))]),g[1]||(g[1]=h("h3",{class:"mb-2 mt-4 text-xs font-semibold uppercase tracking-wider text-ink-faint"}," parent[] ",-1)),h("div",f0,[(w(!0),C(ee,null,ce(t.parent,(y,v)=>(w(),C("div",{key:v,class:fe(["flex w-11 flex-col items-center overflow-hidden rounded-lg border transition-colors",s[u(v)]])},[h("div",h0,M(v),1),h("div",m0,M(y),1)],2))),128))]),h("p",g0,M(t.hint),1)],64))]),_:1}))}}),b0={class:"mb-3 flex flex-wrap items-center justify-between gap-2"},y0={class:"text-xs text-ink-faint"},w0={key:0,class:"py-6 text-center text-sm text-ink-faint"},x0=["data-active"],k0={class:"flex items-center gap-2"},S0={class:"font-mono font-semibold text-ink"},$0={class:"font-mono text-ink-muted"},E0=Z({__name:"EdgeList",props:{edges:{},nodes:{},consideringEdge:{},acceptedEdges:{},rejectedEdges:{}},setup(t){const e=t,n=kn([{tone:"idle",label:"Pending"},{tone:"probe",label:"Considering"},{tone:"settled",label:"Accepted"},{tone:"rejected",label:"Rejected"}]),s={pending:Ye.idle,considering:`${Ye.probe} ${wt.probe}`,accepted:`${Ye.settled} ${wt.settled}`,rejected:`${Ye.rejected} ${wt.rejected}`},o={pending:Ze.idle,considering:Ze.probe,accepted:Ze.settled,rejected:Ze.rejected},a=E(()=>new Set(e.acceptedEdges)),r=E(()=>new Set(e.rejectedEdges)),i=E(()=>new Map(e.nodes.map(m=>[m.id,m.label])));function l(m){return i.value.get(m)??String(m)}function u(m){return a.value.has(m.id)?"accepted":r.value.has(m.id)?"rejected":m.id===e.consideringEdge?"considering":"pending"}const c=E(()=>e.acceptedEdges.length),d=E(()=>e.rejectedEdges.length),p=B(null);return Re(()=>e.consideringEdge,async()=>{var b,g;if(e.consideringEdge===null)return;await ms();const m=(b=p.value)==null?void 0:b.querySelector('[data-active="true"]');(g=m==null?void 0:m.scrollIntoView)==null||g.call(m,{block:"nearest"})}),(m,b)=>(w(),W(ye,{title:"Edge Queue"},{default:I(()=>[h("div",b0,[T(Dn,{items:f(n)},null,8,["items"]),h("p",y0,M(c.value)+" accepted · "+M(d.value)+" rejected · "+M(t.edges.length)+" total ",1)]),t.edges.length===0?(w(),C("p",w0," No edges yet — generate a graph to build the queue. ")):(w(),C("ol",{key:1,ref_key:"list",ref:p,class:"max-h-72 space-y-1 overflow-y-auto pr-1"},[(w(!0),C(ee,null,ce(t.edges,g=>(w(),C("li",{key:g.id,"data-active":g.id===t.consideringEdge,class:fe(["flex items-center justify-between gap-2 rounded-lg border px-2.5 py-1.5 text-xs transition-colors",s[u(g)]])},[h("span",k0,[h("i",{class:fe(["h-2.5 w-2.5 flex-none rounded-full",o[u(g)]])},null,2),h("span",S0,M(l(g.from))+" – "+M(l(g.to)),1)]),h("span",$0,"w="+M(g.weight??1),1)],10,x0))),128))],512)),b[0]||(b[0]=h("p",{class:"mt-3 text-center text-xs text-ink-faint"}," Lightest edges first — the exact order Kruskal considers them in. ",-1))]),_:1}))}}),C0={class:"grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]"},A0={class:"flex flex-col gap-4"},T0={class:"flex flex-col gap-4"},O0=Z({__name:"MstView",setup(t){const e=mv(),n=ws();Re(e.nodeCount,()=>{e.canEdit.value&&e.generate()}),Re(e.seed,()=>{e.canEdit.value&&e.generate()}),Re(e.algoKey,()=>{e.isDone.value&&e.reset()});const s=kn([{tone:"idle",label:"Idle"},{tone:"probe",label:"Considering"},{tone:"settled",label:"Accepted"},{tone:"rejected",label:"Rejected"}]),o=E(()=>e.isDsuMode.value?[]:e.graph.value.nodes.map(u=>u.label)),a=E(()=>e.canEdit.value&&e.algoKey.value==="prim"),r=E(()=>e.algoKey.value==="prim"?"Click a node to set Prim's starting point — the tree grows outward from there.":"Kruskal has no starting point: edges are accepted strictly by weight, regardless of position."),i=E(()=>{if(e.isDsuMode.value){const c=e.activeOp.value;return c?c.kind==="union"?`union(${c.a}, ${c.b})`:`find(${c.a})`:null}const u=e.graph.value.edges.find(c=>c.id===e.highlights.consideringEdge);return u?`considering ${u.from}–${u.to} (weight ${u.weight??1})`:null}),l=E(()=>e.isDsuMode.value?[{label:"Active node",value:e.activeNode.value===null?"—":String(e.activeNode.value)},{label:"Sets remaining",value:String(e.stats.value.components)}]:[{label:"Accepted",value:String(e.highlights.acceptedEdges.length),tone:"good"},{label:"Rejected",value:String(e.highlights.rejectedEdges.length),tone:e.highlights.rejectedEdges.length>0?"warn":"neutral"},{label:"Components left",value:String(e.highlights.components)}]);return(u,c)=>(w(),C("div",C0,[h("div",A0,[T(Rn,{modelValue:f(e).algoKey.value,"onUpdate:modelValue":c[0]||(c[0]=d=>f(e).algoKey.value=d),algorithms:f(aa),title:"Algorithm",columns:3,disabled:!f(e).canEdit.value},null,8,["modelValue","algorithms","disabled"]),f(n)?re("",!0):(w(),W(jk,{key:0})),T(Nk,{"node-count":f(e).nodeCount.value,seed:f(e).seed.value,speed:f(e).speed.value,status:f(e).status.value,"can-edit":f(e).canEdit.value,"is-running":f(e).isRunning.value,"is-paused":f(e).isPaused.value,"onUpdate:nodeCount":c[1]||(c[1]=d=>f(e).nodeCount.value=d),"onUpdate:speed":c[2]||(c[2]=d=>f(e).speed.value=d),"onUpdate:seed":c[3]||(c[3]=d=>f(e).seed.value=d),onRandomize:c[4]||(c[4]=d=>f(e).randomizeSeed()),onGenerate:c[5]||(c[5]=d=>f(e).generate()),onRun:c[6]||(c[6]=d=>f(e).run()),onPause:c[7]||(c[7]=d=>f(e).pause()),onReset:c[8]||(c[8]=d=>f(e).reset())},null,8,["node-count","seed","speed","status","can-edit","is-running","is-paused"]),f(e).isDsuMode.value?(w(),W(Zk,{key:1,ops:f(e).opScript.value,"node-count":f(e).nodeCount.value,"can-edit":f(e).canEdit.value,"onUpdate:ops":c[9]||(c[9]=d=>f(e).setOpScript(d)),onRandomize:c[10]||(c[10]=d=>f(e).randomizeOpScript())},null,8,["ops","node-count","can-edit"])):re("",!0),T(xn,{cursor:f(e).cursor.value,"buffered-count":f(e).bufferedCount.value,"fully-buffered":f(e).fullyBuffered.value,"can-step-back":f(e).canStepBack.value,"can-step-forward":f(e).canStepForward.value,onSeek:c[11]||(c[11]=d=>f(e).seek(d)),onStepBack:c[12]||(c[12]=d=>f(e).stepBack()),onStepForward:c[13]||(c[13]=d=>f(e).stepForward()),onSkipToEnd:c[14]||(c[14]=d=>f(e).skipToEnd())},null,8,["cursor","buffered-count","fully-buffered","can-step-back","can-step-forward"])]),h("div",T0,[T(e0,{stats:f(e).stats.value,status:f(e).status.value,"is-dsu-mode":f(e).isDsuMode.value},null,8,["stats","status","is-dsu-mode"]),f(e).isDsuMode.value?re("",!0):(w(),W(Lc,{key:0,nodes:f(e).graph.value.nodes,edges:f(e).graph.value.edges,"node-tone":f(e).nodeTone.value,"edge-tone":f(e).edgeTone.value,"node-badge":f(e).nodeBadge.value,"show-weights":!0,legend:f(s),title:"Graph",hint:r.value,"start-id":f(e).startId.value,"can-edit":a.value,onSetStart:c[15]||(c[15]=d=>f(e).setStart(d))},null,8,["nodes","edges","node-tone","edge-tone","node-badge","legend","hint","start-id","can-edit"])),T(v0,{parent:f(e).forest.value.parent,"set-size":f(e).forest.value.setSize,rank:f(e).forest.value.rank,"find-path":f(e).forest.value.findPath,compressed:f(e).forest.value.compressed,active:f(e).activeNode.value,labels:o.value,title:f(e).isDsuMode.value?"Disjoint-Set Forest":"Underlying Disjoint-Set Forest"},null,8,["parent","set-size","rank","find-path","compressed","active","labels","title"]),f(e).isDsuMode.value?re("",!0):(w(),W(E0,{key:1,edges:f(e).sortedEdges.value,nodes:f(e).graph.value.nodes,"considering-edge":f(e).highlights.consideringEdge,"accepted-edges":f(e).highlights.acceptedEdges,"rejected-edges":f(e).highlights.rejectedEdges},null,8,["edges","nodes","considering-edge","accepted-edges","rejected-edges"])),T(Hr,{headline:f(e).explain.value,formula:i.value,rows:l.value},null,8,["headline","formula","rows"]),T(ua,{lines:f(e).pseudocodeLines.value,source:f(e).sourceCode.value.text,"source-file":f(e).sourceCode.value.file,"active-line":f(e).activeLine.value,"active-source-lines":f(e).activeSourceLines.value,title:"Code"},null,8,["lines","source","source-file","active-line","active-source-lines"])])]))}}),_0=Z({__name:"HashGuide",setup(t){return(e,n)=>(w(),W(to,{title:"How to read this",summary:"A hash sends every key to one bucket. The interesting part is what happens when two land on the same one.","start-open":""},{default:I(()=>[...n[0]||(n[0]=[h("p",{class:"mb-3 text-ink-muted"},[O(" A hash table turns a key into a number, folds that number into a slot with "),h("code",{class:"font-mono text-xs"},"h(key) mod capacity"),O(", and stores the key there. That is the entire idea, and it is O(1) — right up until two keys pick the same slot. Everything on this page is about that moment. The inspector spells out the arithmetic for every step, so each probe can be checked by hand. ")],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint"}," Chaining vs open addressing ",-1),h("ul",{class:"mb-4 space-y-2 text-ink-muted"},[h("li",null,[h("b",null,"Separate chaining"),O(" hangs a list off each bucket. Colliding keys are appended, so a lookup hashes once and then walks a chain that averages α links long. It degrades gently, never fills up, and deletion is just unlinking — but every entry costs a pointer, and the chain is scattered through memory. ")]),h("li",null,[h("b",null,"Open addressing"),O(" keeps everything in the array: on a collision, the key walks a "),h("em",null,"probe sequence"),O(" until it finds a free slot. No pointers, excellent cache behaviour, and it is what most modern standard libraries do — at the price of everything below. ")])],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint"}," Clustering — the reason there are three probe sequences ",-1),h("p",{class:"mb-3 text-ink-muted"},[h("b",null,"Linear probing"),O(" tries the next slot along, so collisions form contiguous runs, and every run is a bigger target for the next key — a cluster grows itself. That is "),h("em",null,"primary clustering"),O(". "),h("b",null,"Quadratic probing"),O(" jumps k(k+1)/2 slots on the k-th probe, which scatters the runs; but two keys with the same home slot still follow the identical jump sequence, which is "),h("em",null,"secondary clustering"),O(". "),h("b",null,"Double hashing"),O(" derives the stride from a second hash of the key, so even keys that collide at home diverge immediately. Load the weak hash function, force a collision, and switch between the three: the badges show the probe order, and the clusters are visible. ")],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint"}," Why α matters ",-1),h("p",{class:"mb-3 text-ink-muted"},[O(" The load factor α = keys / slots is what the cost actually depends on — not the number of keys. Chaining costs about 1 + α. Open addressing costs about 1/(1 − α), which is 2 probes at half full, 10 at 90%, and unbounded as the table fills. That is why the table grows: once α crosses the threshold, the capacity doubles and "),h("em",null,"every key is rehashed"),O(", because a key's slot is a function of the capacity it was inserted under. Watch the rehash step through key by key — most of them move. Each individual resize is O(n), but it only happens after n more inserts, so the amortized cost per insert stays constant. ")],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint"}," Why deletion needs a tombstone ",-1),h("p",{class:"mb-2 text-ink-muted"},[O(" Under open addressing a search stops at the first "),h("em",null,"empty"),O(" slot — that is what makes a miss cheap. So emptying a slot on delete would cut every probe sequence that ran through it, and any key stored further along its own sequence would become invisible while still sitting in the table. Instead the slot is marked "),h("span",{class:"font-mono text-tone-rejected-ink"},"✕ deleted"),O(": searches walk straight past it, and a later insert may reuse it. Delete a key from the middle of a cluster and search for one after it — the tombstone is what makes the lookup still succeed. ")],-1),h("p",{class:"text-ink-faint"}," Tombstones are not free: they hold no key but still cost a probe, so they count toward the fill that triggers a resize. A rehash is also how they get cleaned up. ",-1)])]),_:1}))}}),M0={class:"space-y-4"},R0={key:0,class:"mt-1 text-[11px] text-ink-faint"},j0={class:"nums font-mono"},I0={key:0,class:"mt-1 text-[11px] text-ink-faint"},D0={class:"nums font-mono"},L0={class:"mt-4"},N0={class:"grid grid-cols-2 gap-2"},P0={class:"mt-2 text-xs leading-relaxed text-ink-muted"},B0={class:"mt-5 grid grid-cols-2 gap-2"},F0=Z({__name:"HashControls",props:{capacity:{},effectiveCapacity:{},threshold:{},activeThreshold:{},hashFnKey:{},speed:{},status:{},canEdit:{type:Boolean},isRunning:{type:Boolean},isPaused:{type:Boolean}},emits:["update:capacity","update:threshold","update:hashFnKey","update:speed","run","pause","reset","step"],setup(t,{emit:e}){const n=t,s=e,o=Object.keys(Kn),a=E(()=>Math.round(n.threshold*100)),r=E(()=>n.capacity!==n.effectiveCapacity),i=E(()=>Math.abs(n.threshold-n.activeThreshold)>.001);return(l,u)=>(w(),W(ye,{title:"Controls"},{default:I(()=>[h("div",M0,[h("div",null,[T(He,{label:"Capacity","model-value":t.capacity,min:4,max:64,step:4,suffix:" slots",disabled:!t.canEdit,"onUpdate:modelValue":u[0]||(u[0]=c=>s("update:capacity",c))},null,8,["model-value","disabled"]),r.value?(w(),C("p",R0,[u[7]||(u[7]=O(" Rounded up to ",-1)),h("span",j0,M(t.effectiveCapacity),1),u[8]||(u[8]=O(" — every capacity here is a power of two. ",-1))])):re("",!0)]),h("div",null,[T(He,{label:"Resize threshold","model-value":a.value,min:25,max:150,step:5,suffix:"%",disabled:!t.canEdit,"onUpdate:modelValue":u[1]||(u[1]=c=>s("update:threshold",c/100))},null,8,["model-value","disabled"]),i.value?(w(),C("p",I0,[u[9]||(u[9]=O(" Capped at ",-1)),h("span",D0,M(Math.round(t.activeThreshold*100))+"%",1),u[10]||(u[10]=O(" — open addressing stores one key per slot, so it can never reach α = 1. ",-1))])):re("",!0)]),T(He,{label:"Speed","model-value":t.speed,min:1,max:100,suffix:"%","onUpdate:modelValue":u[2]||(u[2]=c=>s("update:speed",c))},null,8,["model-value"])]),h("div",L0,[u[11]||(u[11]=h("div",{class:"mb-1.5 text-sm font-medium text-ink-muted"},"Hash function",-1)),h("div",N0,[(w(!0),C(ee,null,ce(f(o),c=>(w(),W(te,{key:c,variant:"selector",active:c===t.hashFnKey,disabled:!t.canEdit,onClick:d=>s("update:hashFnKey",c)},{default:I(()=>[O(M(f(Kn)[c].name),1)]),_:2},1032,["active","disabled","onClick"]))),128))]),h("p",P0,M(f(Kn)[t.hashFnKey].description),1)]),h("div",B0,[t.isRunning?(w(),W(te,{key:1,variant:"warning",class:"col-span-2",onClick:u[4]||(u[4]=c=>s("pause"))},{default:I(()=>[...u[13]||(u[13]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M6 4h4v16H6zM14 4h4v16h-4z"})],-1),O(" Pause ",-1)])]),_:1})):(w(),W(te,{key:0,variant:"primary",class:"col-span-2",onClick:u[3]||(u[3]=c=>s("run"))},{default:I(()=>[u[12]||(u[12]=h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M8 5v14l11-7z"})],-1)),O(" "+M(t.isPaused?"Resume":"Run"),1)]),_:1})),T(te,{variant:"neutral",onClick:u[5]||(u[5]=c=>s("reset"))},{default:I(()=>[...u[14]||(u[14]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.36 2.64L3 8"}),h("path",{d:"M3 3v5h5"})],-1),O(" Reset ",-1)])]),_:1}),T(te,{variant:"neutral",disabled:t.isRunning,onClick:u[6]||(u[6]=c=>s("step"))},{default:I(()=>[...u[15]||(u[15]=[O(" Step ▶ ",-1)])]),_:1},8,["disabled"])]),u[16]||(u[16]=h("p",{class:"mt-3 text-center text-xs text-ink-faint"}," Strategy, capacity, threshold & hash function lock while a script is running. ",-1))]),_:1}))}}),V0={class:"grid grid-cols-3 gap-2"},H0={class:"mt-3 flex items-end gap-2"},U0={class:"min-w-0 flex-1"},z0={class:"mt-3 grid grid-cols-3 gap-2"},q0={key:0,class:"mt-2 text-xs text-warn-ink"},K0={class:"mt-3 block"},G0={class:"mb-1.5 flex items-center justify-between text-sm"},W0=["disabled"],X0=["value","disabled"],Y0={key:1,class:"mt-4 text-sm text-ink-faint"},J0={key:2,class:"mt-4 max-h-56 space-y-1 overflow-y-auto pr-1"},Q0={class:"w-6 text-right font-mono tabular-nums text-ink-faint"},Z0={class:"min-w-0 flex-1 truncate font-mono text-ink-muted"},eS=["disabled","aria-label","onClick"],tS=Z({__name:"HashOpBuilder",props:{script:{},canEdit:{type:Boolean},seed:{},notice:{}},emits:["add","remove","clear","bulk-load","force-collision","update:seed","randomize-seed"],setup(t,{emit:e}){const n=t,s=e,o=[{kind:"insert",label:"Insert"},{kind:"search",label:"Search"},{kind:"delete",label:"Delete"}],a={insert:"bg-ok-soft text-ok-ink",search:"bg-accent-soft text-accent-ink",delete:"bg-danger-soft text-danger-ink"},r=B("insert"),i=B(""),l=/^[A-Za-z0-9]{1,12}$/,u=E(()=>i.value===""||l.test(i.value)?null:"Letters and digits only, up to 12 characters."),c=E(()=>n.canEdit&&i.value!==""&&u.value===null);function d(){c.value&&(s("add",r.value,i.value),i.value="")}const p=m=>s("update:seed",Number(m.target.value));return(m,b)=>(w(),W(ye,{title:"Operation script"},{default:I(()=>[h("div",V0,[(w(),C(ee,null,ce(o,g=>T(te,{key:g.kind,variant:"selector",active:r.value===g.kind,disabled:!t.canEdit,onClick:y=>r.value=g.kind},{default:I(()=>[O(M(g.label),1)]),_:2},1032,["active","disabled","onClick"])),64))]),h("div",H0,[h("div",U0,[T($t,{modelValue:i.value,"onUpdate:modelValue":b[0]||(b[0]=g=>i.value=g),label:"Key",placeholder:"cat",monospace:"",error:u.value,disabled:!t.canEdit,onKeydown:b[1]||(b[1]=jt(g=>d(),["enter"]))},null,8,["modelValue","error","disabled"])]),T(te,{variant:"primary",class:"mb-[1px]",disabled:!c.value,onClick:b[2]||(b[2]=g=>d())},{default:I(()=>[...b[7]||(b[7]=[O(" Add ",-1)])]),_:1},8,["disabled"])]),h("div",z0,[T(te,{variant:"quiet",disabled:!t.canEdit,onClick:b[3]||(b[3]=g=>s("bulk-load"))},{default:I(()=>[...b[8]||(b[8]=[O(" Bulk load ",-1)])]),_:1},8,["disabled"]),T(te,{variant:"quiet",disabled:!t.canEdit,onClick:b[4]||(b[4]=g=>s("force-collision"))},{default:I(()=>[...b[9]||(b[9]=[O(" Force collision ",-1)])]),_:1},8,["disabled"]),T(te,{variant:"quiet",disabled:!t.canEdit||t.script.length===0,onClick:b[5]||(b[5]=g=>s("clear"))},{default:I(()=>[...b[10]||(b[10]=[O(" Clear ",-1)])]),_:1},8,["disabled"])]),t.notice?(w(),C("p",q0,M(t.notice),1)):re("",!0),h("label",K0,[h("div",G0,[b[11]||(b[11]=h("span",{class:"font-medium text-ink-muted"},"Seed",-1)),h("button",{type:"button",class:"text-xs font-semibold text-accent hover:underline disabled:opacity-50",disabled:!t.canEdit,onClick:b[6]||(b[6]=g=>s("randomize-seed"))}," Randomize ",8,W0)]),h("input",{type:"number",value:t.seed,disabled:!t.canEdit,class:"w-full rounded-xl border border-line bg-surface-raised px-3 py-2 font-mono text-sm text-ink disabled:cursor-not-allowed disabled:opacity-50",onInput:p},null,40,X0)]),t.script.length===0?(w(),C("p",Y0," No operations yet — add one, or bulk load a handful of keys. ")):(w(),C("ol",J0,[(w(!0),C(ee,null,ce(t.script,(g,y)=>(w(),C("li",{key:`${y}-${g.kind}-${g.key}`,class:"flex items-center gap-2 rounded-lg bg-surface-alt px-2 py-1 text-xs"},[h("span",Q0,M(y+1),1),h("span",{class:fe(["rounded px-1.5 py-0.5 font-semibold uppercase",a[g.kind]])},M(g.kind),3),h("span",Z0,M(g.key),1),h("button",{type:"button",class:"shrink-0 rounded px-1.5 text-ink-faint hover:text-danger disabled:opacity-40",disabled:!t.canEdit,"aria-label":`Remove operation ${y+1}`,onClick:v=>s("remove",y)}," ✕ ",8,eS)]))),128))]))]),_:1}))}}),nS={class:"mb-1.5 flex items-baseline justify-between text-sm"},sS={class:"font-medium text-ink-muted"},oS={class:"nums ml-1 font-mono text-xs text-ink-faint"},aS=["aria-valuenow","aria-valuemax","aria-label"],rS={class:"mt-1 text-[11px] text-ink-faint"},iS={class:"nums font-mono"},lS=Z({__name:"LoadFactorMeter",props:{loadFactor:{},threshold:{},size:{},capacity:{}},setup(t){const e=t,n=E(()=>Math.max(1,e.threshold*1.2));function s(a){return`${Math.min(100,Math.max(0,a/n.value*100))}%`}const o=E(()=>e.loadFactor>e.threshold);return(a,r)=>(w(),C("div",null,[h("div",nS,[h("span",sS,[r[0]||(r[0]=O(" Load factor α ",-1)),h("span",oS,M(t.size)+" / "+M(t.capacity),1)]),h("span",{class:fe(["nums font-mono font-semibold",o.value?"text-warn":"text-accent"])},M(t.loadFactor.toFixed(2)),3)]),h("div",{class:"relative h-2.5 w-full overflow-hidden rounded-full bg-surface-alt",role:"meter","aria-valuenow":Number(t.loadFactor.toFixed(2)),"aria-valuemin":0,"aria-valuemax":Number(n.value.toFixed(2)),"aria-label":`Load factor, resize threshold ${t.threshold.toFixed(2)}`},[h("div",{class:fe(["h-full rounded-full transition-all",o.value?"bg-warn":"bg-accent"]),style:Tt({width:s(t.loadFactor)})},null,6),h("div",{class:"absolute inset-y-0 w-0.5 bg-danger",style:Tt({left:s(t.threshold)}),"aria-hidden":"true"},null,4)],8,aS),h("p",rS,[r[1]||(r[1]=O(" Grows past ",-1)),h("span",iS,M(t.threshold.toFixed(2)),1),r[2]||(r[2]=O("; open addressing also counts tombstones toward the fill. ",-1))])]))}}),uS={class:"mt-4"},cS=Z({__name:"HashStats",props:{size:{},capacity:{},loadFactor:{},threshold:{},probes:{},collisions:{},resizes:{},avgProbes:{}},setup(t){const e=t,n=E(()=>[{label:"Keys",value:`${e.size} / ${e.capacity}`},{label:"Load α",value:e.loadFactor.toFixed(2)},{label:"Probes",value:e.probes.toLocaleString()},{label:"Collisions",value:e.collisions.toLocaleString()},{label:"Probes / op",value:e.avgProbes===0?"—":e.avgProbes.toFixed(2)},{label:"Resizes",value:String(e.resizes)}]);return(s,o)=>(w(),W(ye,{title:"Statistics"},{default:I(()=>[T(Ur,{cells:n.value,columns:3},null,8,["cells"]),h("div",uS,[T(lS,{"load-factor":t.loadFactor,threshold:t.threshold,size:t.size,capacity:t.capacity},null,8,["load-factor","threshold","size","capacity"])])]),_:1}))}}),dS={class:"max-h-[32rem] flex-1 overflow-y-auto pr-1"},pS={class:"space-y-1"},fS=["data-bucket","data-state","data-home","data-probing"],hS=["data-home"],mS=["data-probe-order","title"],gS={key:1},vS={class:"flex min-w-0 flex-wrap items-center gap-1"},bS=["data-key","data-link-state"],yS={key:1,"data-role":"empty",class:"font-mono text-xs text-ink-faint"},wS=Z({__name:"BucketArray",props:{buckets:{},homeIndex:{default:null},probeIndex:{default:null},probeSeq:{default:()=>[]},phase:{default:"idle"},activeKey:{default:null},chaining:{type:Boolean,default:!1}},setup(t){const e=t,n=kn([{tone:"probe",label:"probing now"},{tone:"probe",label:"probed"},{tone:"rejected",label:"tombstone"},{tone:"idle",label:"empty"}]),s=E(()=>new Set(e.probeSeq));function o(u){return s.value.has(u)?e.chaining?e.probeSeq.length:e.probeSeq.indexOf(u)+1:null}const a=E(()=>e.chaining&&e.probeSeq.length>0?e.probeSeq.length-1:-1);function r(u,c){return!e.chaining||e.phase==="idle"?!1:u===e.homeIndex&&c===a.value}function i(u){return u!==e.activeKey?!1:e.phase==="found"||e.phase==="inserted"||e.phase==="updated"}function l(u){return u===e.probeIndex?"bg-tone-probe/20 ring-1 ring-tone-probe":s.value.has(u)?"bg-tone-probe/[0.07]":""}return(u,c)=>(w(),W(ye,{title:"Buckets",class:"flex h-full flex-col"},{header:I(()=>[c[0]||(c[0]=h("div",{class:"flex flex-wrap items-center gap-3 text-xs text-ink-muted"},[h("span",{class:"flex items-center gap-1.5"},[h("i",{class:"h-3 w-3 rounded-mark bg-accent"}),O("home slot")])],-1)),T(Dn,{items:f(n)},null,8,["items"])]),default:I(()=>[h("div",dS,[h("ol",pS,[(w(!0),C(ee,null,ce(t.buckets,(d,p)=>(w(),C("li",{key:p,"data-bucket":p,"data-state":d.state,"data-home":p===t.homeIndex?"true":void 0,"data-probing":p===t.probeIndex?"true":void 0,class:fe(["grid grid-cols-[2.25rem_1.75rem_minmax(0,1fr)] items-center gap-2 rounded-lg px-1 py-1 transition-colors",l(p)])},[h("span",{"data-home":p===t.homeIndex?"true":void 0,class:fe(["rounded-md py-1 text-center font-mono text-xs tabular-nums",p===t.homeIndex?"bg-accent font-bold text-accent-ink":"text-ink-muted"])},M(p),11,hS),o(p)!==null?(w(),C("span",{key:0,"data-probe-order":o(p),class:"rounded-md bg-tone-probe/80 py-0.5 text-center font-mono text-[10px] font-bold text-tone-probe-ink",title:t.chaining?"links walked":"probe number"},M(t.chaining?"↓":"")+M(o(p)),9,mS)):(w(),C("span",gS)),h("div",vS,[(w(!0),C(ee,null,ce(d.entries,(m,b)=>(w(),C("span",{key:m.key,"data-role":"entry","data-key":m.key,"data-link-state":i(m.key)?"resolved":r(p,b)?"cursor":void 0,class:fe(["inline-flex max-w-full items-center gap-1 truncate rounded-full border px-2 py-0.5 font-mono text-xs",i(m.key)?`${f(Ye).settled} bg-tone-settled/20 font-bold ${f(Tn).settled}`:r(p,b)?`${f(Ye).probe} bg-tone-probe/30 font-bold ${f(Tn).probe}`:"border-line bg-surface-raised text-ink-muted"])},M(m.key),11,bS))),128)),d.state==="tombstone"?(w(),C("span",{key:0,"data-role":"tombstone",class:fe(`inline-flex items-center gap-1 rounded-full border border-dashed px-2 py-0.5 font-mono text-xs ${f(Ye).rejected} ${f(Tn).rejected}`)},"✕ deleted",2)):d.entries.length===0?(w(),C("span",yS,"—")):re("",!0)])],10,fS))),128))])])]),_:1}))}}),xS={class:"grid gap-4 lg:grid-cols-[minmax(0,360px)_1fr]"},kS={class:"flex flex-col gap-4"},SS={class:"flex flex-col gap-4"},$S=Z({__name:"HashTableView",setup(t){const e=Av(),n=ws();Re(e.strategyKey,()=>{e.isDone.value&&e.reset()});const s=B(null);function o(){const p=e.forceCollision();s.value=`Collision forced — 3 keys were queued to land in bucket ${p}.`}function a(){e.clearScript(),s.value=null}const r=E(()=>e.strategyKey.value==="chaining"),i={idle:"Press Run or Step to begin.",hashing:"Hashing the key to find its home slot.",probing:"Collision — walking the probe sequence.",inserted:"Inserted.",updated:"Key already present — value overwritten.",found:"Found.","not-found":"Not found.",deleted:"Deleted.",resizing:"Load factor exceeded the threshold — growing the table.",rehashed:"Rehashing an existing key into the grown table."},l={idle:"neutral",hashing:"neutral",probing:"warn",inserted:"good",updated:"good",found:"good","not-found":"bad",deleted:"good",resizing:"warn",rehashed:"neutral"},u=E(()=>e.view.op!==null),c=E(()=>u.value?i[e.view.phase]:null),d=E(()=>{if(!u.value)return[];const p=e.view,m=[{label:"Operation",value:p.op??"—"},{label:"Key",value:p.key??"—"}];return p.hash!==null&&m.push({label:"Hash",value:String(p.hash)}),p.homeIndex!==null&&m.push({label:"Home index",value:String(p.homeIndex)}),p.probeIndex!==null&&m.push({label:"Probe index",value:String(p.probeIndex)}),m.push({label:"Probes this op",value:String(p.probeSeq.length)}),m.push({label:"Phase",value:p.phase,tone:l[p.phase]}),m});return(p,m)=>(w(),C("div",xS,[h("div",kS,[T(Rn,{modelValue:f(e).strategyKey.value,"onUpdate:modelValue":m[0]||(m[0]=b=>f(e).strategyKey.value=b),algorithms:f(ia),columns:2,disabled:!f(e).canEdit.value},null,8,["modelValue","algorithms","disabled"]),f(n)?re("",!0):(w(),W(_0,{key:0})),T(F0,{capacity:f(e).capacity.value,"effective-capacity":f(e).startCapacity.value,threshold:f(e).threshold.value,"active-threshold":f(e).activeThreshold.value,"hash-fn-key":f(e).hashFnKey.value,speed:f(e).speed.value,status:f(e).status.value,"can-edit":f(e).canEdit.value,"is-running":f(e).isRunning.value,"is-paused":f(e).isPaused.value,"onUpdate:capacity":m[1]||(m[1]=b=>f(e).capacity.value=b),"onUpdate:threshold":m[2]||(m[2]=b=>f(e).threshold.value=b),"onUpdate:hashFnKey":m[3]||(m[3]=b=>f(e).hashFnKey.value=b),"onUpdate:speed":m[4]||(m[4]=b=>f(e).speed.value=b),onRun:m[5]||(m[5]=b=>f(e).run()),onPause:m[6]||(m[6]=b=>f(e).pause()),onReset:m[7]||(m[7]=b=>f(e).reset()),onStep:m[8]||(m[8]=b=>f(e).stepForward())},null,8,["capacity","effective-capacity","threshold","active-threshold","hash-fn-key","speed","status","can-edit","is-running","is-paused"]),T(tS,{script:f(e).script.value,"can-edit":f(e).canEdit.value,seed:f(e).seed.value,notice:s.value,onAdd:f(e).addOp,onRemove:f(e).removeOp,onClear:m[9]||(m[9]=b=>a()),onBulkLoad:m[10]||(m[10]=b=>f(e).bulkLoad()),onForceCollision:m[11]||(m[11]=b=>o()),"onUpdate:seed":m[12]||(m[12]=b=>f(e).seed.value=b),onRandomizeSeed:m[13]||(m[13]=b=>f(e).randomizeSeed())},null,8,["script","can-edit","seed","notice","onAdd","onRemove"]),T(xn,{cursor:f(e).cursor.value,"buffered-count":f(e).bufferedCount.value,"fully-buffered":f(e).fullyBuffered.value,"can-step-back":f(e).canStepBack.value,"can-step-forward":f(e).canStepForward.value,onSeek:m[14]||(m[14]=b=>f(e).seek(b)),onStepBack:m[15]||(m[15]=b=>f(e).stepBack()),onStepForward:m[16]||(m[16]=b=>f(e).stepForward()),onSkipToEnd:m[17]||(m[17]=b=>f(e).skipToEnd())},null,8,["cursor","buffered-count","fully-buffered","can-step-back","can-step-forward"])]),h("div",SS,[T(cS,{size:f(e).view.size,capacity:f(e).view.capacity,"load-factor":f(e).view.loadFactor,threshold:f(e).activeThreshold.value,probes:f(e).stats.probes,collisions:f(e).stats.collisions,resizes:f(e).stats.resizes,"avg-probes":f(e).avgProbes.value},null,8,["size","capacity","load-factor","threshold","probes","collisions","resizes","avg-probes"]),T(wS,{class:"flex-1",buckets:f(e).buckets.value,"home-index":f(e).view.homeIndex,"probe-index":f(e).view.probeIndex,"probe-seq":f(e).view.probeSeq,phase:f(e).view.phase,"active-key":f(e).view.key,chaining:r.value},null,8,["buckets","home-index","probe-index","probe-seq","phase","active-key","chaining"]),T(Hr,{title:"Why this step",headline:c.value,formula:f(e).view.explain,rows:d.value},null,8,["headline","formula","rows"]),T(ua,{lines:f(e).pseudocodeLines.value,"active-line":f(e).activeLine.value,source:f(e).sourceCode.value.text,"source-file":f(e).sourceCode.value.file,"active-source-lines":f(e).activeSourceLines.value},null,8,["lines","active-line","source","source-file","active-source-lines"])])]))}}),Pc=[{name:"midnight",label:"Midnight",blurb:"Deep blue-black with a single cyan accent.",dark:!0,group:"Core"},{name:"daylight",label:"Daylight",blurb:"Clean and bright, crisp hairlines.",dark:!1,group:"Core"},{name:"neon",label:"Neon",blurb:"Near-black with acid mint and a glow.",dark:!0,group:"Expressive"},{name:"pastel",label:"Pastel",blurb:"Warm paper, soft fills, inked borders.",dark:!1,group:"Expressive"},{name:"mono",label:"Monochrome",blurb:"One hue. State reads as texture and outline.",dark:!0,group:"Expressive"},{name:"terminal",label:"Terminal",blurb:"Amber phosphor, square corners, all mono.",dark:!0,group:"Expressive"},{name:"paper",label:"Paper",blurb:"Risograph spot inks on off-white stock.",dark:!1,group:"Expressive"},{name:"contrast",label:"High Contrast",blurb:"Maximum contrast, colourblind-safe states.",dark:!0,group:"Accessible"}],Bc="midnight",ES=new Set(Pc.map(t=>t.name));function Fc(t){return typeof t=="string"&&ES.has(t)}function Vc(t){return t==="dark"?"midnight":t==="light"?"daylight":Fc(t)?t:Bc}const Hc="algoviz-theme";function CS(){try{return Vc(localStorage.getItem(Hc))}catch{return Bc}}const Po=B(CS());function $l(t=!0){if(document.documentElement.setAttribute("data-theme",Po.value),!!t)try{localStorage.setItem(Hc,Po.value)}catch{}}function zr(){function t(n,s={}){Po.value=n,$l(s.persist??!0)}function e(){$l()}return{theme:Po,themes:Pc,setTheme:t,initTheme:e}}const AS=["href"],TS=Z({__name:"EmbedBrand",props:{category:{},query:{}},setup(t){const e=t,n=Rr(),s=E(()=>{const{brand:o,...a}=e.query;return n.resolve({name:e.category,query:a}).href});return(o,a)=>(w(),C("a",{href:s.value,target:"_blank",rel:"noopener","data-testid":"embed-brand",class:"pointer-events-auto absolute bottom-2 right-2 rounded-lg border border-line bg-surface/90 px-2 py-1 text-2xs font-medium text-ink-muted shadow-sm transition-colors hover:text-accent"}," Powered by AlgoViz ↗ ",8,AS))}}),OS={key:0,class:"embed-shell relative","data-testid":"embed-shell"},_S=Z({__name:"EmbedView",setup(t){const e=Gu(),n=Rr(),s=E(()=>String(e.params.category??"")),o=E(()=>IS.find(u=>u.name===s.value)),a=E(()=>{var u;return(u=o.value)==null?void 0:u.component});o.value===void 0&&n.replace("/");const r=u=>Fc(u)||u==="light"||u==="dark",i=E(()=>e.query.theme);typeof i.value=="string"&&r(i.value)&&zr().setTheme(Vc(i.value),{persist:!1});const l=E(()=>e.query.brand!=="0");return(u,c)=>a.value?(w(),C("div",OS,[(w(),W(iu(a.value))),l.value?(w(),W(TS,{key:0,category:s.value,query:f(e).query},null,8,["category","query"])):re("",!0)])):re("",!0)}}),MS=(t,e)=>{const n=t.__vccOpts||t;for(const[s,o]of e)n[s]=o;return n},RS=MS(_S,[["__scopeId","data-v-d48216da"]]),On=[{path:"/sorting",name:"sorting",component:Ty,meta:{label:"Sorting",pitch:"Watch bars compare and swap their way into order.",count:Object.keys(us).length}},{path:"/searching",name:"searching",component:qy,meta:{label:"Searching",pitch:"Narrow down a target and see how many probes it takes.",count:Object.keys(na).length}},{path:"/dp",name:"dp",component:Rk,meta:{label:"DP",pitch:"Fill a table cell by cell and trace the answer back out of it.",count:Object.keys(Yt).length}},{path:"/pathfinding",name:"pathfinding",component:uw,meta:{label:"Pathfinding",pitch:"Paint walls on a grid and race algorithms to the exit.",count:Object.keys(sa).length}},{path:"/bst",name:"bst",component:Aw,meta:{label:"BST",pitch:"Insert, search and delete nodes in a binary search tree."}},{path:"/heap",name:"heap",component:Ww,meta:{label:"Heap",pitch:"Sift values up and down to keep the heap property."}},{path:"/graph",name:"graph",component:yx,meta:{label:"Graph",pitch:"Traverse nodes and edges breadth- or depth-first.",count:Object.keys(oa).length}},{path:"/mst",name:"mst",component:O0,meta:{label:"Union-Find & MST",pitch:"Merge disjoint sets, then grow a minimum spanning tree from them.",count:Object.keys(aa).length}},{path:"/hashing",name:"hashing",component:$S,meta:{label:"Hashing",pitch:"Watch keys collide, probe, and rehash as the table fills up.",count:Object.keys(ia).length}},{path:"/concurrency",name:"concurrency",component:U1,meta:{label:"Concurrency",pitch:"Find the exact thread interleaving that breaks the invariant.",count:Object.keys(Gs).length}},{path:"/sandbox",name:"sandbox",component:r1,meta:{label:"Sandbox",pitch:"Write your own algorithm and watch it run, safely isolated."}}],jS=new Set(["bst","heap"]),IS=On.filter(t=>!jS.has(String(t.name))),DS=[{path:"/",name:"landing",component:fg,meta:{label:"Home",pitch:""}},...On,{path:"/embed/:category",name:"embed",component:RS,meta:{label:"Embed",pitch:"",embed:!0}},{path:"/:pathMatch(.*)*",redirect:"/"}],Uc=wh({history:eh("/algoviz/"),routes:DS}),LS={class:"relative"},NS=["aria-expanded","title"],PS={class:"hidden text-sm font-semibold sm:inline"},BS={class:"sr-only"},FS={class:"px-2 pb-1 pt-2 text-[0.65rem] font-semibold uppercase tracking-wider text-ink-faint"},VS=["aria-selected","tabindex","onClick"],HS=["data-theme"],US={class:"min-w-0 flex-1"},zS={class:"block text-sm font-semibold text-ink"},qS={class:"block truncate text-xs text-ink-muted"},KS={key:0,"aria-hidden":"true",class:"shrink-0 text-accent"},GS=Z({__name:"ThemePicker",setup(t){const{theme:e,themes:n,setTheme:s}=zr(),o=B(!1),a=B(null),r=B(null),i=B(0),l=E(()=>n.find(v=>v.name===e.value)??n[0]),u=E(()=>{const v=[];for(const x of n){const S=v.find($=>$.label===x.group);S?S.items.push(x):v.push({label:x.group,items:[x]})}return v}),c=E(()=>u.value.flatMap(v=>v.items));function d(v){const x=c.value.length;i.value=(v%x+x)%x,ms(()=>{var $,R;const S=($=a.value)==null?void 0:$.querySelectorAll('[role="option"]');(R=S==null?void 0:S[i.value])==null||R.focus()})}function p(){o.value=!o.value,o.value&&d(c.value.findIndex(v=>v.name===e.value))}function m(v=!0){var x;o.value&&(o.value=!1,v&&((x=r.value)==null||x.focus()))}function b(v){s(v),m()}function g(v){switch(v.key){case"ArrowDown":v.preventDefault(),d(i.value+1);break;case"ArrowUp":v.preventDefault(),d(i.value-1);break;case"Home":v.preventDefault(),d(0);break;case"End":v.preventDefault(),d(c.value.length-1);break;case"Escape":v.preventDefault(),m();break}}function y(v){var S,$;const x=v.target;(S=a.value)!=null&&S.contains(x)||($=r.value)!=null&&$.contains(x)||m(!1)}return Re(o,v=>{v?document.addEventListener("pointerdown",y):document.removeEventListener("pointerdown",y)}),au(()=>document.removeEventListener("pointerdown",y)),(v,x)=>(w(),C("div",LS,[h("button",{ref_key:"trigger",ref:r,type:"button",class:"flex h-10 items-center gap-2 rounded-xl border border-line bg-surface px-3 text-ink-muted transition-colors hover:text-accent","aria-haspopup":"listbox","aria-expanded":o.value,title:`Theme: ${l.value.label}`,onClick:p},[x[0]||(x[0]=h("span",{class:"flex gap-0.5","aria-hidden":"true"},[h("i",{class:"h-4 w-1.5 rounded-sm bg-accent"}),h("i",{class:"h-4 w-1.5 rounded-sm bg-tone-probe"}),h("i",{class:"h-4 w-1.5 rounded-sm bg-tone-settled"})],-1)),h("span",PS,M(l.value.label),1),h("span",BS,"Change theme, currently "+M(l.value.label),1)],8,NS),o.value?(w(),C("div",{key:0,ref_key:"listbox",ref:a,role:"listbox","aria-label":"Theme",class:"absolute right-0 z-50 mt-2 w-72 overflow-hidden rounded-2xl border border-line bg-surface-raised p-1.5 shadow-xl",onKeydown:g},[(w(!0),C(ee,null,ce(u.value,S=>(w(),C(ee,{key:S.label},[h("p",FS,M(S.label),1),(w(!0),C(ee,null,ce(S.items,$=>{var R;return w(),C("button",{key:$.name,role:"option",type:"button","aria-selected":$.name===f(e),tabindex:((R=c.value[i.value])==null?void 0:R.name)===$.name?0:-1,class:"flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-surface-alt focus:bg-surface-alt focus:outline-none",onClick:P=>b($.name)},[h("span",{"data-theme":$.name,class:"flex shrink-0 gap-px overflow-hidden rounded-md border border-line bg-canvas p-1","aria-hidden":"true"},[...x[1]||(x[1]=[h("i",{class:"h-5 w-2 rounded-sm bg-surface"},null,-1),h("i",{class:"h-5 w-2 rounded-sm bg-accent"},null,-1),h("i",{class:"h-5 w-2 rounded-sm bg-tone-probe"},null,-1),h("i",{class:"h-5 w-2 rounded-sm bg-tone-settled"},null,-1)])],8,HS),h("span",US,[h("span",zS,M($.label),1),h("span",qS,M($.blurb),1)]),$.name===f(e)?(w(),C("span",KS,"✓")):re("",!0)],8,VS)}),128))],64))),128))],544)):re("",!0)]))}}),WS={key:0,class:"border-b border-line"},XS={class:"mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4"},YS={key:1,class:"border-b border-line","aria-label":"Categories"},JS={class:"mx-auto max-w-6xl px-4 sm:px-6"},QS={class:"-mb-px flex gap-1 overflow-x-auto"},ZS={key:0,class:"mt-10 border-t border-line pt-5 text-xs text-ink-faint"},e$=Z({__name:"App",setup(t){const e=ws();return(n,s)=>(w(),C("div",{class:fe(f(e)?"":"min-h-screen")},[f(e)?re("",!0):(w(),C("header",WS,[h("div",XS,[T(f(Ks),{to:"/",class:"group flex items-baseline gap-2.5"},{default:I(()=>[...s[0]||(s[0]=[h("span",{class:"font-display text-xl font-extrabold tracking-tight text-ink sm:text-2xl"},"AlgoViz",-1),h("span",{"aria-hidden":"true",class:"h-4 w-px bg-line-strong"},null,-1),h("span",{class:"hidden text-2xs uppercase text-ink-faint sm:inline"}," Algorithm Visualizer ",-1)])]),_:1}),T(GS)])])),f(e)?re("",!0):(w(),C("nav",YS,[h("div",JS,[h("ul",QS,[(w(!0),C(ee,null,ce(f(On),o=>(w(),C("li",{key:o.path,class:"shrink-0"},[T(f(Ks),{to:o.path,class:fe(["block whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors",n.$route.path===o.path?"border-accent text-accent":"border-transparent text-ink-muted hover:border-line-strong hover:text-ink"])},{default:I(()=>{var a;return[O(M((a=o.meta)==null?void 0:a.label),1)]}),_:2},1032,["to","class"])]))),128))])])])),h("main",{class:fe(f(e)?"p-3":"mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8")},[T(f(Ku)),f(e)?re("",!0):(w(),C("footer",ZS," Every algorithm here is a generator that yields a snapshot after each meaningful step — nothing is pre-rendered. "))],2)],2))}});zr().initTheme();const t$=new Set(On.map(t=>t.name));pc().trackLastVisited(Uc,t=>t$.has(t));ff(e$).use(Uc).mount("#app");
