var _c=Object.defineProperty;var Ic=(t,e,n)=>e in t?_c(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var Zt=(t,e,n)=>Ic(t,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(o){if(o.ep)return;o.ep=!0;const a=n(o);fetch(o.href,a)}})();/**
* @vue/shared v3.5.40
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function ir(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const Ae={},ts=[],Wt=()=>{},gl=()=>!1,Do=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),Po=t=>t.startsWith("onUpdate:"),Ze=Object.assign,lr=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},jc=Object.prototype.hasOwnProperty,Re=(t,e)=>jc.call(t,e),be=Array.isArray,ns=t=>Gs(t)==="[object Map]",Lo=t=>Gs(t)==="[object Set]",Fr=t=>Gs(t)==="[object Date]",xe=t=>typeof t=="function",He=t=>typeof t=="string",Dt=t=>typeof t=="symbol",Ie=t=>t!==null&&typeof t=="object",bl=t=>(Ie(t)||xe(t))&&xe(t.then)&&xe(t.catch),vl=Object.prototype.toString,Gs=t=>vl.call(t),Dc=t=>Gs(t).slice(8,-1),yl=t=>Gs(t)==="[object Object]",ur=t=>He(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,Cs=ir(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),No=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},Pc=/-\w/g,Tt=No(t=>t.replace(Pc,e=>e.slice(1).toUpperCase())),Lc=/\B([A-Z])/g,gn=No(t=>t.replace(Lc,"-$1").toLowerCase()),wl=No(t=>t.charAt(0).toUpperCase()+t.slice(1)),aa=No(t=>t?`on${wl(t)}`:""),nt=(t,e)=>!Object.is(t,e),ho=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},xl=(t,e,n,s=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:s,value:n})},Bo=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let Hr;const Fo=()=>Hr||(Hr=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function cn(t){if(be(t)){const e={};for(let n=0;n<t.length;n++){const s=t[n],o=He(s)?Hc(s):cn(s);if(o)for(const a in o)e[a]=o[a]}return e}else if(He(t)||Ie(t))return t}const Nc=/;(?![^(]*\))/g,Bc=/:([^]+)/,Fc=/\/\*[^]*?\*\//g;function Hc(t){const e={};return t.replace(Fc,"").split(Nc).forEach(n=>{if(n){const s=n.split(Bc);s.length>1&&(e[s[0].trim()]=s[1].trim())}}),e}function de(t){let e="";if(He(t))e=t;else if(be(t))for(let n=0;n<t.length;n++){const s=de(t[n]);s&&(e+=s+" ")}else if(Ie(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const Vc="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Uc=ir(Vc);function kl(t){return!!t||t===""}function zc(t,e){if(t.length!==e.length)return!1;let n=!0;for(let s=0;n&&s<t.length;s++)n=Ws(t[s],e[s]);return n}function Ws(t,e){if(t===e)return!0;let n=Fr(t),s=Fr(e);if(n||s)return n&&s?t.getTime()===e.getTime():!1;if(n=Dt(t),s=Dt(e),n||s)return t===e;if(n=be(t),s=be(e),n||s)return n&&s?zc(t,e):!1;if(n=Ie(t),s=Ie(e),n||s){if(!n||!s)return!1;const o=Object.keys(t).length,a=Object.keys(e).length;if(o!==a)return!1;for(const r in t){const i=t.hasOwnProperty(r),l=e.hasOwnProperty(r);if(i&&!l||!i&&l||!Ws(t[r],e[r]))return!1}}return String(t)===String(e)}function qc(t,e){return t.findIndex(n=>Ws(n,e))}const Sl=t=>!!(t&&t.__v_isRef===!0),R=t=>He(t)?t:t==null?"":be(t)||Ie(t)&&(t.toString===vl||!xe(t.toString))?Sl(t)?R(t.value):JSON.stringify(t,$l,2):String(t),$l=(t,e)=>Sl(e)?$l(t,e.value):ns(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[s,o],a)=>(n[ra(s,a)+" =>"]=o,n),{})}:Lo(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>ra(n))}:Dt(e)?ra(e):Ie(e)&&!be(e)&&!yl(e)?String(e):e,ra=(t,e="")=>{var n;return Dt(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.5.40
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Ge;class Kc{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!e&&Ge&&(Ge.active?(this.parent=Ge,this.index=(Ge.scopes||(Ge.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes){const s=this.scopes.slice();for(e=0,n=s.length;e<n;e++)s[e].pause()}for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes){const o=this.scopes.slice();for(e=0,n=o.length;e<n;e++)o[e].resume()}const s=this.effects.slice();for(e=0,n=s.length;e<n;e++)s[e].resume()}}run(e){if(this._active){const n=Ge;try{return Ge=this,e()}finally{Ge=n}}}on(){++this._on===1&&(this.prevScope=Ge,Ge=this)}off(){if(this._on>0&&--this._on===0){if(Ge===this)Ge=this.prevScope;else{let e=Ge;for(;e;){if(e.prevScope===this){e.prevScope=this.prevScope;break}e=e.prevScope}}this.prevScope=void 0}}stop(e){if(this._active){this._active=!1;let n,s;for(n=0,s=this.effects.length;n<s;n++)this.effects[n].stop();for(this.effects.length=0,n=0,s=this.cleanups.length;n<s;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){const o=this.scopes.slice();for(n=0,s=o.length;n<s;n++)o[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const o=this.parent.scopes.pop();o&&o!==this&&(this.parent.scopes[this.index]=o,o.index=this.index)}this.parent=void 0}}}function Gc(){return Ge}function Ho(t,e=!1){Ge&&Ge.cleanups.push(t)}let Pe;const ia=new WeakSet;class El{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Ge&&(Ge.active?Ge.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,ia.has(this)&&(ia.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Al(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Vr(this),Tl(this);const e=Pe,n=_t;Pe=this,_t=!0;try{return this.fn()}finally{Ol(this),Pe=e,_t=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)pr(e);this.deps=this.depsTail=void 0,Vr(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?ia.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Ma(this)&&this.run()}get dirty(){return Ma(this)}}let Cl=0,As,Ts;function Al(t,e=!1){if(t.flags|=8,e){t.next=Ts,Ts=t;return}t.next=As,As=t}function cr(){Cl++}function dr(){if(--Cl>0)return;if(Ts){let e=Ts;for(Ts=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;As;){let e=As;for(As=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(s){t||(t=s)}e=n}}if(t)throw t}function Tl(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function Ol(t){let e,n=t.depsTail,s=n;for(;s;){const o=s.prevDep;s.version===-1?(s===n&&(n=o),pr(s),Wc(s)):e=s,s.dep.activeLink=s.prevActiveLink,s.prevActiveLink=void 0,s=o}t.deps=e,t.depsTail=n}function Ma(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(Ml(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function Ml(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===Ps)||(t.globalVersion=Ps,!t.isSSR&&t.flags&128&&(!t.deps&&!t._dirty||!Ma(t))))return;t.flags|=2;const e=t.dep,n=Pe,s=_t;Pe=t,_t=!0;try{Tl(t);const o=t.fn(t._value);(e.version===0||nt(o,t._value))&&(t.flags|=128,t._value=o,e.version++)}catch(o){throw e.version++,o}finally{Pe=n,_t=s,Ol(t),t.flags&=-3}}function pr(t,e=!1){const{dep:n,prevSub:s,nextSub:o}=t;if(s&&(s.nextSub=o,t.prevSub=void 0),o&&(o.prevSub=s,t.nextSub=void 0),n.subs===t&&(n.subs=s,!s&&n.computed)){n.computed.flags&=-5;for(let a=n.computed.deps;a;a=a.nextDep)pr(a,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function Wc(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let _t=!0;const Rl=[];function dn(){Rl.push(_t),_t=!1}function pn(){const t=Rl.pop();_t=t===void 0?!0:t}function Vr(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=Pe;Pe=void 0;try{e()}finally{Pe=n}}}let Ps=0;class Yc{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Vo{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!Pe||!_t||Pe===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==Pe)n=this.activeLink=new Yc(Pe,this),Pe.deps?(n.prevDep=Pe.depsTail,Pe.depsTail.nextDep=n,Pe.depsTail=n):Pe.deps=Pe.depsTail=n,_l(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const s=n.nextDep;s.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=s),n.prevDep=Pe.depsTail,n.nextDep=void 0,Pe.depsTail.nextDep=n,Pe.depsTail=n,Pe.deps===n&&(Pe.deps=s)}return n}trigger(e){this.version++,Ps++,this.notify(e)}notify(e){cr();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{dr()}}}function _l(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let s=e.deps;s;s=s.nextDep)_l(s)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const Ra=new WeakMap,Bn=Symbol(""),_a=Symbol(""),Ls=Symbol("");function rt(t,e,n){if(_t&&Pe){let s=Ra.get(t);s||Ra.set(t,s=new Map);let o=s.get(n);o||(s.set(n,o=new Vo),o.map=s,o.key=n),o.track()}}function rn(t,e,n,s,o,a){const r=Ra.get(t);if(!r){Ps++;return}const i=l=>{l&&l.trigger()};if(cr(),e==="clear")r.forEach(i);else{const l=be(t),u=l&&ur(n);if(l&&n==="length"){const c=Number(s);r.forEach((d,p)=>{(p==="length"||p===Ls||!Dt(p)&&p>=c)&&i(d)})}else switch((n!==void 0||r.has(void 0))&&i(r.get(n)),u&&i(r.get(Ls)),e){case"add":l?u&&i(r.get("length")):(i(r.get(Bn)),ns(t)&&i(r.get(_a)));break;case"delete":l||(i(r.get(Bn)),ns(t)&&i(r.get(_a)));break;case"set":ns(t)&&i(r.get(Bn));break}}dr()}function Wn(t){const e=Me(t);return e===t?e:(rt(e,"iterate",Ls),Ot(t)?e:e.map(Pt))}function Uo(t){return rt(t=Me(t),"iterate",Ls),t}function zt(t,e){return fn(t)?ls(Fn(t)?Pt(e):e):Pt(e)}const Xc={__proto__:null,[Symbol.iterator](){return la(this,Symbol.iterator,t=>zt(this,t))},concat(...t){return Wn(this).concat(...t.map(e=>be(e)?Wn(e):e))},entries(){return la(this,"entries",t=>(t[1]=zt(this,t[1]),t))},every(t,e){return en(this,"every",t,e,void 0,arguments)},filter(t,e){return en(this,"filter",t,e,n=>n.map(s=>zt(this,s)),arguments)},find(t,e){return en(this,"find",t,e,n=>zt(this,n),arguments)},findIndex(t,e){return en(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return en(this,"findLast",t,e,n=>zt(this,n),arguments)},findLastIndex(t,e){return en(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return en(this,"forEach",t,e,void 0,arguments)},includes(...t){return ua(this,"includes",t)},indexOf(...t){return ua(this,"indexOf",t)},join(t){return Wn(this).join(t)},lastIndexOf(...t){return ua(this,"lastIndexOf",t)},map(t,e){return en(this,"map",t,e,void 0,arguments)},pop(){return vs(this,"pop")},push(...t){return vs(this,"push",t)},reduce(t,...e){return Ur(this,"reduce",t,e)},reduceRight(t,...e){return Ur(this,"reduceRight",t,e)},shift(){return vs(this,"shift")},some(t,e){return en(this,"some",t,e,void 0,arguments)},splice(...t){return vs(this,"splice",t)},toReversed(){return Wn(this).toReversed()},toSorted(t){return Wn(this).toSorted(t)},toSpliced(...t){return Wn(this).toSpliced(...t)},unshift(...t){return vs(this,"unshift",t)},values(){return la(this,"values",t=>zt(this,t))}};function la(t,e,n){const s=Uo(t),o=s[e]();return s!==t&&!Ot(t)&&(o._next=o.next,o.next=()=>{const a=o._next();return a.done||(a.value=n(a.value)),a}),o}const Jc=Array.prototype;function en(t,e,n,s,o,a){const r=Uo(t),i=r!==t&&!Ot(t),l=r[e];if(l!==Jc[e]){const d=l.apply(t,a);return i?Pt(d):d}let u=n;r!==t&&(i?u=function(d,p){return n.call(this,zt(t,d),p,t)}:n.length>2&&(u=function(d,p){return n.call(this,d,p,t)}));const c=l.call(r,u,s);return i&&o?o(c):c}function Ur(t,e,n,s){const o=Uo(t),a=o!==t&&!Ot(t);let r=n,i=!1;o!==t&&(a?(i=s.length===0,r=function(u,c,d){return i&&(i=!1,u=zt(t,u)),n.call(this,u,zt(t,c),d,t)}):n.length>3&&(r=function(u,c,d){return n.call(this,u,c,d,t)}));const l=o[e](r,...s);return i?zt(t,l):l}function ua(t,e,n){const s=Me(t);rt(s,"iterate",Ls);const o=s[e](...n);return(o===-1||o===!1)&&mr(n[0])?(n[0]=Me(n[0]),s[e](...n)):o}function vs(t,e,n=[]){dn(),cr();const s=Me(t)[e].apply(t,n);return dr(),pn(),s}const Qc=ir("__proto__,__v_isRef,__isVue"),Il=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(Dt));function Zc(t){Dt(t)||(t=String(t));const e=Me(this);return rt(e,"has",t),e.hasOwnProperty(t)}class jl{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,s){if(n==="__v_skip")return e.__v_skip;const o=this._isReadonly,a=this._isShallow;if(n==="__v_isReactive")return!o;if(n==="__v_isReadonly")return o;if(n==="__v_isShallow")return a;if(n==="__v_raw")return s===(o?a?ud:Nl:a?Ll:Pl).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(s)?e:void 0;const r=be(e);if(!o){let l;if(r&&(l=Xc[n]))return l;if(n==="hasOwnProperty")return Zc}const i=Reflect.get(e,n,ct(e)?e:s);if((Dt(n)?Il.has(n):Qc(n))||(o||rt(e,"get",n),a))return i;if(ct(i)){const l=r&&ur(n)?i:i.value;return o&&Ie(l)?ja(l):l}return Ie(i)?o?ja(i):Le(i):i}}class Dl extends jl{constructor(e=!1){super(!1,e)}set(e,n,s,o){let a=e[n];const r=be(e)&&ur(n);if(!this._isShallow){const u=fn(a);if(!Ot(s)&&!fn(s)&&(a=Me(a),s=Me(s)),!r&&ct(a)&&!ct(s))return u||(a.value=s),!0}const i=r?Number(n)<e.length:Re(e,n),l=Reflect.set(e,n,s,ct(e)?e:o);return e===Me(o)&&l&&(i?nt(s,a)&&rn(e,"set",n,s):rn(e,"add",n,s)),l}deleteProperty(e,n){const s=Re(e,n);e[n];const o=Reflect.deleteProperty(e,n);return o&&s&&rn(e,"delete",n,void 0),o}has(e,n){const s=Reflect.has(e,n);return(!Dt(n)||!Il.has(n))&&rt(e,"has",n),s}ownKeys(e){return rt(e,"iterate",be(e)?"length":Bn),Reflect.ownKeys(e)}}class ed extends jl{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const td=new Dl,nd=new ed,sd=new Dl(!0);const Ia=t=>t,eo=t=>Reflect.getPrototypeOf(t);function od(t,e,n){return function(...s){const o=this.__v_raw,a=Me(o),r=ns(a),i=t==="entries"||t===Symbol.iterator&&r,l=t==="keys"&&r,u=o[t](...s),c=n?Ia:e?ls:Pt;return!e&&rt(a,"iterate",l?_a:Bn),Ze(Object.create(u),{next(){const{value:d,done:p}=u.next();return p?{value:d,done:p}:{value:i?[c(d[0]),c(d[1])]:c(d),done:p}}})}}function to(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function ad(t,e){const n={get(o){const a=this.__v_raw,r=Me(a),i=Me(o);t||(nt(o,i)&&rt(r,"get",o),rt(r,"get",i));const{has:l}=eo(r),u=e?Ia:t?ls:Pt;if(l.call(r,o))return u(a.get(o));if(l.call(r,i))return u(a.get(i));a!==r&&a.get(o)},get size(){const o=this.__v_raw;return!t&&rt(Me(o),"iterate",Bn),o.size},has(o){const a=this.__v_raw,r=Me(a),i=Me(o);return t||(nt(o,i)&&rt(r,"has",o),rt(r,"has",i)),o===i?a.has(o):a.has(o)||a.has(i)},forEach(o,a){const r=this,i=r.__v_raw,l=Me(i),u=e?Ia:t?ls:Pt;return!t&&rt(l,"iterate",Bn),i.forEach((c,d)=>o.call(a,u(c),u(d),r))}};return Ze(n,t?{add:to("add"),set:to("set"),delete:to("delete"),clear:to("clear")}:{add(o){const a=Me(this),r=eo(a),i=Me(o),l=!e&&!Ot(o)&&!fn(o)?i:o;return r.has.call(a,l)||nt(o,l)&&r.has.call(a,o)||nt(i,l)&&r.has.call(a,i)||(a.add(l),rn(a,"add",l,l)),this},set(o,a){!e&&!Ot(a)&&!fn(a)&&(a=Me(a));const r=Me(this),{has:i,get:l}=eo(r);let u=i.call(r,o);u||(o=Me(o),u=i.call(r,o));const c=l.call(r,o);return r.set(o,a),u?nt(a,c)&&rn(r,"set",o,a):rn(r,"add",o,a),this},delete(o){const a=Me(this),{has:r,get:i}=eo(a);let l=r.call(a,o);l||(o=Me(o),l=r.call(a,o)),i&&i.call(a,o);const u=a.delete(o);return l&&rn(a,"delete",o,void 0),u},clear(){const o=Me(this),a=o.size!==0,r=o.clear();return a&&rn(o,"clear",void 0,void 0),r}}),["keys","values","entries",Symbol.iterator].forEach(o=>{n[o]=od(o,t,e)}),n}function fr(t,e){const n=ad(t,e);return(s,o,a)=>o==="__v_isReactive"?!t:o==="__v_isReadonly"?t:o==="__v_raw"?s:Reflect.get(Re(n,o)&&o in s?n:s,o,a)}const rd={get:fr(!1,!1)},id={get:fr(!1,!0)},ld={get:fr(!0,!1)};const Pl=new WeakMap,Ll=new WeakMap,Nl=new WeakMap,ud=new WeakMap;function cd(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Le(t){return fn(t)?t:hr(t,!1,td,rd,Pl)}function Bl(t){return hr(t,!1,sd,id,Ll)}function ja(t){return hr(t,!0,nd,ld,Nl)}function hr(t,e,n,s,o){if(!Ie(t)||t.__v_raw&&!(e&&t.__v_isReactive)||t.__v_skip||!Object.isExtensible(t))return t;const a=o.get(t);if(a)return a;const r=cd(Dc(t));if(r===0)return t;const i=new Proxy(t,r===2?s:n);return o.set(t,i),i}function Fn(t){return fn(t)?Fn(t.__v_raw):!!(t&&t.__v_isReactive)}function fn(t){return!!(t&&t.__v_isReadonly)}function Ot(t){return!!(t&&t.__v_isShallow)}function mr(t){return t?!!t.__v_raw:!1}function Me(t){const e=t&&t.__v_raw;return e?Me(e):t}function dd(t){return!Re(t,"__v_skip")&&Object.isExtensible(t)&&xl(t,"__v_skip",!0),t}const Pt=t=>Ie(t)?Le(t):t,ls=t=>Ie(t)?ja(t):t;function ct(t){return t?t.__v_isRef===!0:!1}function B(t){return Fl(t,!1)}function gr(t){return Fl(t,!0)}function Fl(t,e){return ct(t)?t:new pd(t,e)}class pd{constructor(e,n){this.dep=new Vo,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:Me(e),this._value=n?e:Pt(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,s=this.__v_isShallow||Ot(e)||fn(e);e=s?e:Me(e),nt(e,n)&&(this._rawValue=e,this._value=s?e:Pt(e),this.dep.trigger())}}function f(t){return ct(t)?t.value:t}const fd={get:(t,e,n)=>e==="__v_raw"?t:f(Reflect.get(t,e,n)),set:(t,e,n,s)=>{const o=t[e];return ct(o)&&!ct(n)?(o.value=n,!0):Reflect.set(t,e,n,s)}};function Hl(t){return Fn(t)?t:new Proxy(t,fd)}class hd{constructor(e){this.__v_isRef=!0,this._value=void 0;const n=this.dep=new Vo,{get:s,set:o}=e(n.track.bind(n),n.trigger.bind(n));this._get=s,this._set=o}get value(){return this._value=this._get()}set value(e){this._set(e)}}function md(t){return new hd(t)}class gd{constructor(e,n,s){this.fn=e,this.setter=n,this._value=void 0,this.dep=new Vo(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Ps-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=s}notify(){if(this.flags|=16,!(this.flags&8)&&Pe!==this)return Al(this,!0),!0}get value(){const e=this.dep.track();return Ml(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function bd(t,e,n=!1){let s,o;return xe(t)?s=t:(s=t.get,o=t.set),new gd(s,o,n)}const no={},yo=new WeakMap;let In;function vd(t,e=!1,n=In){if(n){let s=yo.get(n);s||yo.set(n,s=[]),s.push(t)}}function yd(t,e,n=Ae){const{immediate:s,deep:o,once:a,scheduler:r,augmentJob:i,call:l}=n,u=$=>o?$:Ot($)||o===!1||o===0?ln($,1):ln($);let c,d,p,m,w=!1,g=!1;if(ct(t)?(d=()=>t.value,w=Ot(t)):Fn(t)?(d=()=>u(t),w=!0):be(t)?(g=!0,w=t.some($=>Fn($)||Ot($)),d=()=>t.map($=>{if(ct($))return $.value;if(Fn($))return u($);if(xe($))return l?l($,2):$()})):xe(t)?e?d=l?()=>l(t,2):t:d=()=>{if(p){dn();try{p()}finally{pn()}}const $=In;In=c;try{return l?l(t,3,[m]):t(m)}finally{In=$}}:d=Wt,e&&o){const $=d,_=o===!0?1/0:o;d=()=>ln($(),_)}const v=Gc(),b=()=>{c.stop(),v&&v.active&&lr(v.effects,c)};if(a&&e){const $=e;e=(..._)=>{const N=$(..._);return b(),N}}let y=g?new Array(t.length).fill(no):no;const S=$=>{if(!(!(c.flags&1)||!c.dirty&&!$))if(e){const _=c.run();if($||o||w||(g?_.some((N,G)=>nt(N,y[G])):nt(_,y))){p&&p();const N=In;In=c;try{const G=[_,y===no?void 0:g&&y[0]===no?[]:y,m];y=_,l?l(e,3,G):e(...G)}finally{In=N}}}else c.run()};return i&&i(S),c=new El(d),c.scheduler=r?()=>r(S,!1):S,m=$=>vd($,!1,c),p=c.onStop=()=>{const $=yo.get(c);if($){if(l)l($,4);else for(const _ of $)_();yo.delete(c)}},e?s?S(!0):y=c.run():r?r(S.bind(null,!0),!0):c.run(),b.pause=c.pause.bind(c),b.resume=c.resume.bind(c),b.stop=b,b}function ln(t,e=1/0,n){if(e<=0||!Ie(t)||t.__v_skip||(n=n||new Map,(n.get(t)||0)>=e))return t;if(n.set(t,e),e--,ct(t))ln(t.value,e,n);else if(be(t))for(let s=0;s<t.length;s++)ln(t[s],e,n);else if(Lo(t)||ns(t))t.forEach(s=>{ln(s,e,n)});else if(yl(t)){for(const s in t)ln(t[s],e,n);for(const s of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,s)&&ln(t[s],e,n)}return t}/**
* @vue/runtime-core v3.5.40
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Ys(t,e,n,s){try{return s?t(...s):t()}catch(o){zo(o,e,n)}}function Lt(t,e,n,s){if(xe(t)){const o=Ys(t,e,n,s);return o&&bl(o)&&o.catch(a=>{zo(a,e,n)}),o}if(be(t)){const o=[];for(let a=0;a<t.length;a++)o.push(Lt(t[a],e,n,s));return o}}function zo(t,e,n,s=!0){const o=e?e.vnode:null,{errorHandler:a,throwUnhandledErrorInProduction:r}=e&&e.appContext.config||Ae;if(e){let i=e.parent;const l=e.proxy,u=`https://vuejs.org/error-reference/#runtime-${n}`;for(;i;){const c=i.ec;if(c){for(let d=0;d<c.length;d++)if(c[d](t,l,u)===!1)return}i=i.parent}if(a){dn(),Ys(a,null,10,[t,l,u]),pn();return}}wd(t,n,o,s,r)}function wd(t,e,n,s=!0,o=!1){if(o)throw t;console.error(t)}const ht=[];let Ut=-1;const ss=[];let En=null,Xn=0;const Vl=Promise.resolve();let wo=null;function ps(t){const e=wo||Vl;return t?e.then(this?t.bind(this):t):e}function xd(t){let e=Ut+1,n=ht.length;for(;e<n;){const s=e+n>>>1,o=ht[s],a=Ns(o);a<t||a===t&&o.flags&2?e=s+1:n=s}return e}function br(t){if(!(t.flags&1)){const e=Ns(t),n=ht[ht.length-1];!n||!(t.flags&2)&&e>=Ns(n)?ht.push(t):ht.splice(xd(e),0,t),t.flags|=1,Ul()}}function Ul(){wo||(wo=Vl.then(ql))}function kd(t){be(t)?ss.push(...t):En&&t.id===-1?En.splice(Xn+1,0,t):t.flags&1||(ss.push(t),t.flags|=1),Ul()}function zr(t,e,n=Ut+1){for(;n<ht.length;n++){const s=ht[n];if(s&&s.flags&2){if(t&&s.id!==t.uid)continue;ht.splice(n,1),n--,s.flags&4&&(s.flags&=-2),s(),s.flags&4||(s.flags&=-2)}}}function zl(t){if(ss.length){const e=[...new Set(ss)].sort((n,s)=>Ns(n)-Ns(s));if(ss.length=0,En){En.push(...e);return}for(En=e,Xn=0;Xn<En.length;Xn++){const n=En[Xn];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}En=null,Xn=0}}const Ns=t=>t.id==null?t.flags&2?-1:1/0:t.id;function ql(t){try{for(Ut=0;Ut<ht.length;Ut++){const e=ht[Ut];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Ys(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;Ut<ht.length;Ut++){const e=ht[Ut];e&&(e.flags&=-2)}Ut=-1,ht.length=0,zl(),wo=null,(ht.length||ss.length)&&ql()}}let it=null,Kl=null;function xo(t){const e=it;return it=t,Kl=t&&t.type.__scopeId||null,e}function D(t,e=it,n){if(!e||t._n)return t;const s=(...o)=>{s._d&&Co(-1);const a=xo(e),r=un.length;let i;try{i=t(...o)}finally{for(let l=un.length;l>r;l--)$r();xo(a),s._d&&Co(1)}return i};return s._n=!0,s._c=!0,s._d=!0,s}function Os(t,e){if(it===null)return t;const n=Wo(it),s=t.dirs||(t.dirs=[]);for(let o=0;o<e.length;o++){let[a,r,i,l=Ae]=e[o];a&&(xe(a)&&(a={mounted:a,updated:a}),a.deep&&ln(r),s.push({dir:a,instance:n,value:r,oldValue:void 0,arg:i,modifiers:l}))}return t}function Rn(t,e,n,s){const o=t.dirs,a=e&&e.dirs;for(let r=0;r<o.length;r++){const i=o[r];a&&(i.oldValue=a[r].value);let l=i.dir[s];l&&(dn(),Lt(l,n,8,[t.el,i,t,e]),pn())}}function mo(t,e){if(mt){let n=mt.provides;const s=mt.parent&&mt.parent.provides;s===n&&(n=mt.provides=Object.create(s)),n[t]=e}}function Yt(t,e,n=!1){const s=yu();if(s||as){let o=as?as._context.provides:s?s.parent==null||s.ce?s.vnode.appContext&&s.vnode.appContext.provides:s.parent.provides:void 0;if(o&&t in o)return o[t];if(arguments.length>1)return n&&xe(e)?e.call(s&&s.proxy):e}}const Sd=Symbol.for("v-scx"),$d=()=>Yt(Sd);function Ed(t,e){return vr(t,null,{flush:"sync"})}function _e(t,e,n){return vr(t,e,n)}function vr(t,e,n=Ae){const{immediate:s,deep:o,flush:a,once:r}=n,i=Ze({},n),l=e&&s||!e&&a!=="post";let u;if(Hs){if(a==="sync"){const m=$d();u=m.__watcherHandles||(m.__watcherHandles=[])}else if(!l){const m=()=>{};return m.stop=Wt,m.resume=Wt,m.pause=Wt,m}}const c=mt;i.call=(m,w,g)=>Lt(m,c,w,g);let d=!1;a==="post"?i.scheduler=m=>{bt(m,c&&c.suspense)}:a!=="sync"&&(d=!0,i.scheduler=(m,w)=>{w?m():br(m)}),i.augmentJob=m=>{e&&(m.flags|=4),d&&(m.flags|=2,c&&(m.id=c.uid,m.i=c))};const p=yd(t,e,i);return Hs&&(u?u.push(p):l&&p()),p}function Cd(t,e,n){const s=this.proxy,o=He(t)?t.includes(".")?Gl(s,t):()=>s[t]:t.bind(s,s);let a;xe(e)?a=e:(a=e.handler,n=e);const r=Xs(this),i=vr(o,a.bind(s),n);return r(),i}function Gl(t,e){const n=e.split(".");return()=>{let s=t;for(let o=0;o<n.length&&s;o++)s=s[n[o]];return s}}const Ad=Symbol("_vte"),Td=t=>t.__isTeleport,ca=Symbol("_leaveCb");function yr(t,e){t.shapeFlag&6&&t.component?(t.transition=e,yr(t.component.subTree,e)):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}function oe(t,e){return xe(t)?Ze({name:t.name},e,{setup:t}):t}function Wl(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}function qr(t,e){let n;return!!((n=Object.getOwnPropertyDescriptor(t,e))&&!n.configurable)}const ko=new WeakMap;function Ms(t,e,n,s,o=!1){if(be(t)){t.forEach((g,v)=>Ms(g,e&&(be(e)?e[v]:e),n,s,o));return}if(os(s)&&!o){s.shapeFlag&512&&s.type.__asyncResolved&&s.component.subTree.component&&Ms(t,e,n,s.component.subTree);return}const a=s.shapeFlag&4?Wo(s.component):s.el,r=o?null:a,{i,r:l}=t,u=e&&e.r,c=i.refs===Ae?i.refs={}:i.refs,d=i.setupState,p=Me(d),m=d===Ae?gl:g=>qr(c,g)?!1:Re(p,g),w=(g,v)=>!(v&&qr(c,v));if(u!=null&&u!==l){if(Kr(e),He(u))c[u]=null,m(u)&&(d[u]=null);else if(ct(u)){const g=e;w(u,g.k)&&(u.value=null),g.k&&(c[g.k]=null)}}if(xe(l))Ys(l,i,12,[r,c]);else{const g=He(l),v=ct(l);if(g||v){const b=()=>{if(t.f){const y=g?m(l)?d[l]:c[l]:w()||!t.k?l.value:c[t.k];if(o)be(y)&&lr(y,a);else if(be(y))y.includes(a)||y.push(a);else if(g)c[l]=[a],m(l)&&(d[l]=c[l]);else{const S=[a];w(l,t.k)&&(l.value=S),t.k&&(c[t.k]=S)}}else g?(c[l]=r,m(l)&&(d[l]=r)):v&&(w(l,t.k)&&(l.value=r),t.k&&(c[t.k]=r))};if(r){const y=()=>{b(),ko.delete(t)};y.id=-1,ko.set(t,y),bt(y,n)}else Kr(t),b()}}}function Kr(t){const e=ko.get(t);e&&(e.flags|=8,ko.delete(t))}Fo().requestIdleCallback;Fo().cancelIdleCallback;const os=t=>!!t.type.__asyncLoader,Yl=t=>t.type.__isKeepAlive;function Od(t,e){Xl(t,"a",e)}function Md(t,e){Xl(t,"da",e)}function Xl(t,e,n=mt){const s=t.__wdc||(t.__wdc=()=>{let o=n;for(;o;){if(o.isDeactivated)return;o=o.parent}return t()});if(qo(e,s,n),n){let o=n.parent;for(;o&&o.parent;)Yl(o.parent.vnode)&&Rd(s,e,n,o),o=o.parent}}function Rd(t,e,n,s){const o=qo(e,t,s,!0);xr(()=>{lr(s[e],o)},n)}function qo(t,e,n=mt,s=!1){if(n){const o=n[t]||(n[t]=[]),a=e.__weh||(e.__weh=(...r)=>{dn();const i=Xs(n),l=Lt(e,n,t,r);return i(),pn(),l});return s?o.unshift(a):o.push(a),a}}const bn=t=>(e,n=mt)=>{(!Hs||t==="sp")&&qo(t,(...s)=>e(...s),n)},_d=bn("bm"),wr=bn("m"),Id=bn("bu"),jd=bn("u"),Jl=bn("bum"),xr=bn("um"),Dd=bn("sp"),Pd=bn("rtg"),Ld=bn("rtc");function Nd(t,e=mt){qo("ec",t,e)}const Bd=Symbol.for("v-ndc");function fe(t,e,n,s){let o;const a=n,r=be(t);if(r||He(t)){const i=r&&Fn(t);let l=!1,u=!1;i&&(l=!Ot(t),u=fn(t),t=Uo(t)),o=new Array(t.length);for(let c=0,d=t.length;c<d;c++)o[c]=e(l?u?ls(Pt(t[c])):Pt(t[c]):t[c],c,void 0,a)}else if(typeof t=="number"){o=new Array(t);for(let i=0;i<t;i++)o[i]=e(i+1,i,void 0,a)}else if(Ie(t))if(t[Symbol.iterator])o=Array.from(t,(i,l)=>e(i,l,void 0,a));else{const i=Object.keys(t);o=new Array(i.length);for(let l=0,u=i.length;l<u;l++){const c=i[l];o[l]=e(t[c],c,l,a)}}else o=[];return o}function So(t,e,n={},s,o,a){if(it.ce||it.parent&&os(it.parent)&&it.parent.ce){const u=n,c=Object.keys(u).length>0;return e!=="default"&&(u.name=e),x(),Y(ne,null,[T("slot",u,s)],c?-2:64)}let r=t[e];r&&r._c&&(r._d=!1);const i=un.length;x();let l;try{const u=r&&Ql(r(n)),c=n.key||a||u&&u.key;l=Y(ne,{key:(c&&!Dt(c)?c:`_${e}`)+(!u&&s?"_fb":"")},u||(s?s():[]),u&&t._===1?64:-2)}catch(u){for(let c=un.length;c>i;c--)$r();throw u}finally{r&&r._c&&(r._d=!0)}return l.scopeId&&(l.slotScopeIds=[l.scopeId+"-s"]),l}function Ql(t){return t.some(e=>Fs(e)?!(e.type===hn||e.type===ne&&!Ql(e.children)):!0)?t:null}const Da=t=>t?wu(t)?Wo(t):Da(t.parent):null,Rs=Ze(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>Da(t.parent),$root:t=>Da(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>eu(t),$forceUpdate:t=>t.f||(t.f=()=>{br(t.update)}),$nextTick:t=>t.n||(t.n=ps.bind(t.proxy)),$watch:t=>Cd.bind(t)}),da=(t,e)=>t!==Ae&&!t.__isScriptSetup&&Re(t,e),Fd={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:s,data:o,props:a,accessCache:r,type:i,appContext:l}=t;if(e[0]!=="$"){const p=r[e];if(p!==void 0)switch(p){case 1:return s[e];case 2:return o[e];case 4:return n[e];case 3:return a[e]}else{if(da(s,e))return r[e]=1,s[e];if(o!==Ae&&Re(o,e))return r[e]=2,o[e];if(Re(a,e))return r[e]=3,a[e];if(n!==Ae&&Re(n,e))return r[e]=4,n[e];Pa&&(r[e]=0)}}const u=Rs[e];let c,d;if(u)return e==="$attrs"&&rt(t.attrs,"get",""),u(t);if((c=i.__cssModules)&&(c=c[e]))return c;if(n!==Ae&&Re(n,e))return r[e]=4,n[e];if(d=l.config.globalProperties,Re(d,e))return d[e]},set({_:t},e,n){const{data:s,setupState:o,ctx:a}=t;return da(o,e)?(o[e]=n,!0):s!==Ae&&Re(s,e)?(s[e]=n,!0):Re(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(a[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:s,appContext:o,props:a,type:r}},i){let l;return!!(n[i]||t!==Ae&&i[0]!=="$"&&Re(t,i)||da(e,i)||Re(a,i)||Re(s,i)||Re(Rs,i)||Re(o.config.globalProperties,i)||(l=r.__cssModules)&&l[i])},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:Re(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function $o(t){return be(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}function Un(t,e){return!t||!e?t||e:be(t)&&be(e)?t.concat(e):Ze({},$o(t),$o(e))}let Pa=!0;function Hd(t){const e=eu(t),n=t.proxy,s=t.ctx;Pa=!1,e.beforeCreate&&Gr(e.beforeCreate,t,"bc");const{data:o,computed:a,methods:r,watch:i,provide:l,inject:u,created:c,beforeMount:d,mounted:p,beforeUpdate:m,updated:w,activated:g,deactivated:v,beforeDestroy:b,beforeUnmount:y,destroyed:S,unmounted:$,render:_,renderTracked:N,renderTriggered:G,errorCaptured:j,serverPrefetch:L,expose:I,inheritAttrs:he,components:Se,directives:z,filters:ae}=e;if(u&&Vd(u,s,null),r)for(const le in r){const K=r[le];xe(K)&&(s[le]=K.bind(n))}if(o){const le=o.call(n,n);Ie(le)&&(t.data=Le(le))}if(Pa=!0,a)for(const le in a){const K=a[le],re=xe(K)?K.bind(n,n):xe(K.get)?K.get.bind(n,n):Wt,$e=!xe(K)&&xe(K.set)?K.set.bind(n):Wt,et=C({get:re,set:$e});Object.defineProperty(s,le,{enumerable:!0,configurable:!0,get:()=>et.value,set:W=>et.value=W})}if(i)for(const le in i)Zl(i[le],s,n,le);if(l){const le=xe(l)?l.call(n):l;Reflect.ownKeys(le).forEach(K=>{mo(K,le[K])})}c&&Gr(c,t,"c");function J(le,K){be(K)?K.forEach(re=>le(re.bind(n))):K&&le(K.bind(n))}if(J(_d,d),J(wr,p),J(Id,m),J(jd,w),J(Od,g),J(Md,v),J(Nd,j),J(Ld,N),J(Pd,G),J(Jl,y),J(xr,$),J(Dd,L),be(I))if(I.length){const le=t.exposed||(t.exposed={});I.forEach(K=>{Object.defineProperty(le,K,{get:()=>n[K],set:re=>n[K]=re,enumerable:!0})})}else t.exposed||(t.exposed={});_&&t.render===Wt&&(t.render=_),he!=null&&(t.inheritAttrs=he),Se&&(t.components=Se),z&&(t.directives=z),L&&Wl(t)}function Vd(t,e,n=Wt){be(t)&&(t=La(t));for(const s in t){const o=t[s];let a;Ie(o)?"default"in o?a=Yt(o.from||s,o.default,!0):a=Yt(o.from||s):a=Yt(o),ct(a)?Object.defineProperty(e,s,{enumerable:!0,configurable:!0,get:()=>a.value,set:r=>a.value=r}):e[s]=a}}function Gr(t,e,n){Lt(be(t)?t.map(s=>s.bind(e.proxy)):t.bind(e.proxy),e,n)}function Zl(t,e,n,s){let o=s.includes(".")?Gl(n,s):()=>n[s];if(He(t)){const a=e[t];xe(a)&&_e(o,a)}else if(xe(t))_e(o,t.bind(n));else if(Ie(t))if(be(t))t.forEach(a=>Zl(a,e,n,s));else{const a=xe(t.handler)?t.handler.bind(n):e[t.handler];xe(a)&&_e(o,a,t)}}function eu(t){const e=t.type,{mixins:n,extends:s}=e,{mixins:o,optionsCache:a,config:{optionMergeStrategies:r}}=t.appContext,i=a.get(e);let l;return i?l=i:!o.length&&!n&&!s?l=e:(l={},o.length&&o.forEach(u=>Eo(l,u,r,!0)),Eo(l,e,r)),Ie(e)&&a.set(e,l),l}function Eo(t,e,n,s=!1){const{mixins:o,extends:a}=e;a&&Eo(t,a,n,!0),o&&o.forEach(r=>Eo(t,r,n,!0));for(const r in e)if(!(s&&r==="expose")){const i=Ud[r]||n&&n[r];t[r]=i?i(t[r],e[r]):e[r]}return t}const Ud={data:Wr,props:Yr,emits:Yr,methods:Ss,computed:Ss,beforeCreate:dt,created:dt,beforeMount:dt,mounted:dt,beforeUpdate:dt,updated:dt,beforeDestroy:dt,beforeUnmount:dt,destroyed:dt,unmounted:dt,activated:dt,deactivated:dt,errorCaptured:dt,serverPrefetch:dt,components:Ss,directives:Ss,watch:qd,provide:Wr,inject:zd};function Wr(t,e){return e?t?function(){return Ze(xe(t)?t.call(this,this):t,xe(e)?e.call(this,this):e)}:e:t}function zd(t,e){return Ss(La(t),La(e))}function La(t){if(be(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function dt(t,e){return t?[...new Set([].concat(t,e))]:e}function Ss(t,e){return t?Ze(Object.create(null),t,e):e}function Yr(t,e){return t?be(t)&&be(e)?[...new Set([...t,...e])]:Ze(Object.create(null),$o(t),$o(e??{})):e}function qd(t,e){if(!t)return e;if(!e)return t;const n=Ze(Object.create(null),t);for(const s in e)n[s]=dt(t[s],e[s]);return n}function tu(){return{app:null,config:{isNativeTag:gl,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Kd=0;function Gd(t,e){return function(s,o=null){xe(s)||(s=Ze({},s)),o!=null&&!Ie(o)&&(o=null);const a=tu(),r=new WeakSet,i=[];let l=!1;const u=a.app={_uid:Kd++,_component:s,_props:o,_container:null,_context:a,_instance:null,version:kp,get config(){return a.config},set config(c){},use(c,...d){return r.has(c)||(c&&xe(c.install)?(r.add(c),c.install(u,...d)):xe(c)&&(r.add(c),c(u,...d))),u},mixin(c){return a.mixins.includes(c)||a.mixins.push(c),u},component(c,d){return d?(a.components[c]=d,u):a.components[c]},directive(c,d){return d?(a.directives[c]=d,u):a.directives[c]},mount(c,d,p){if(!l){const m=u._ceVNode||T(s,o);return m.appContext=a,p===!0?p="svg":p===!1&&(p=void 0),t(m,c,p),l=!0,u._container=c,c.__vue_app__=u,Wo(m.component)}},onUnmount(c){i.push(c)},unmount(){l&&(Lt(i,u._instance,16),t(null,u._container),delete u._container.__vue_app__)},provide(c,d){return a.provides[c]=d,u},runWithContext(c){const d=as;as=u;try{return c()}finally{as=d}}};return u}}let as=null;function zn(t,e,n=Ae){const s=yu(),o=Tt(e),a=gn(e),r=nu(t,o),i=md((l,u)=>{let c,d=Ae,p;return Ed(()=>{const m=t[o];nt(c,m)&&(c=m,u())}),{get(){return l(),n.get?n.get(c):c},set(m){const w=n.set?n.set(m):m;if(!nt(w,c)&&!(d!==Ae&&nt(m,d)))return;const g=s.vnode.props,v=!!(g&&(e in g||o in g||a in g)&&(`onUpdate:${e}`in g||`onUpdate:${o}`in g||`onUpdate:${a}`in g));v||(c=m,u()),s.emit(`update:${e}`,w),nt(m,d)&&(nt(m,w)&&!nt(w,p)||v&&d!==Ae&&!nt(w,c))&&u(),d=m,p=w}}});return i[Symbol.iterator]=()=>{let l=0;return{next(){return l<2?{value:l++?r||Ae:i,done:!1}:{done:!0}}}},i}const nu=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${Tt(e)}Modifiers`]||t[`${gn(e)}Modifiers`];function Wd(t,e,...n){if(t.isUnmounted)return;const s=t.vnode.props||Ae;let o=n;const a=e.startsWith("update:"),r=a&&nu(s,e.slice(7));r&&(r.trim&&(o=n.map(c=>He(c)?c.trim():c)),r.number&&(o=n.map(Bo)));let i,l=s[i=aa(e)]||s[i=aa(Tt(e))];!l&&a&&(l=s[i=aa(gn(e))]),l&&Lt(l,t,6,o);const u=s[i+"Once"];if(u){if(!t.emitted)t.emitted={};else if(t.emitted[i])return;t.emitted[i]=!0,Lt(u,t,6,o)}}const Yd=new WeakMap;function su(t,e,n=!1){const s=n?Yd:e.emitsCache,o=s.get(t);if(o!==void 0)return o;const a=t.emits;let r={},i=!1;if(!xe(t)){const l=u=>{const c=su(u,e,!0);c&&(i=!0,Ze(r,c))};!n&&e.mixins.length&&e.mixins.forEach(l),t.extends&&l(t.extends),t.mixins&&t.mixins.forEach(l)}return!a&&!i?(Ie(t)&&s.set(t,null),null):(be(a)?a.forEach(l=>r[l]=null):Ze(r,a),Ie(t)&&s.set(t,r),r)}function Ko(t,e){return!t||!Do(e)?!1:(e=e.slice(2),e=e==="Once"?e:e.replace(/Once$/,""),Re(t,e[0].toLowerCase()+e.slice(1))||Re(t,gn(e))||Re(t,e))}function Xr(t){const{type:e,vnode:n,proxy:s,withProxy:o,propsOptions:[a],slots:r,attrs:i,emit:l,render:u,renderCache:c,props:d,data:p,setupState:m,ctx:w,inheritAttrs:g}=t,v=xo(t);let b,y;try{if(n.shapeFlag&4){const $=o||s,_=$;b=qt(u.call(_,$,c,d,m,p,w)),y=i}else{const $=e;b=qt($.length>1?$(d,{attrs:i,slots:r,emit:l}):$(d,null)),y=e.props?i:Xd(i)}}catch($){un.length=0,zo($,t,1),b=T(hn)}let S=b;if(y&&g!==!1){const $=Object.keys(y),{shapeFlag:_}=S;$.length&&_&7&&(a&&$.some(Po)&&(y=Jd(y,a)),S=us(S,y,!1,!0))}return n.dirs&&(S=us(S,null,!1,!0),S.dirs=S.dirs?S.dirs.concat(n.dirs):n.dirs),n.transition&&yr(S,n.transition),b=S,xo(v),b}const Xd=t=>{let e;for(const n in t)(n==="class"||n==="style"||Do(n))&&((e||(e={}))[n]=t[n]);return e},Jd=(t,e)=>{const n={};for(const s in t)(!Po(s)||!(s.slice(9)in e))&&(n[s]=t[s]);return n};function Qd(t,e,n){const{props:s,children:o,component:a}=t,{props:r,children:i,patchFlag:l}=e,u=a.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return s?Jr(s,r,u):!!r;if(l&8){const c=e.dynamicProps;for(let d=0;d<c.length;d++){const p=c[d];if(ou(r,s,p)&&!Ko(u,p))return!0}}}else return(o||i)&&(!i||!i.$stable)?!0:s===r?!1:s?r?Jr(s,r,u):!0:!!r;return!1}function Jr(t,e,n){const s=Object.keys(e);if(s.length!==Object.keys(t).length)return!0;for(let o=0;o<s.length;o++){const a=s[o];if(ou(e,t,a)&&!Ko(n,a))return!0}return!1}function ou(t,e,n){const s=t[n],o=e[n];return n==="style"&&Ie(s)&&Ie(o)?!Ws(s,o):s!==o}function Zd({vnode:t,parent:e,suspense:n},s){for(;e;){const o=e.subTree;if(o.suspense&&o.suspense.activeBranch===t&&(o.suspense.vnode.el=o.el=s,t=o),o===t)(t=e.vnode).el=s,e=e.parent;else break}n&&n.activeBranch===t&&(n.vnode.el=s)}const au={},ru=()=>Object.create(au),iu=t=>Object.getPrototypeOf(t)===au;function ep(t,e,n,s=!1){const o={},a=ru();t.propsDefaults=Object.create(null),lu(t,e,o,a);for(const r in t.propsOptions[0])r in o||(o[r]=void 0);n?t.props=s?o:Bl(o):t.type.props?t.props=o:t.props=a,t.attrs=a}function tp(t,e,n,s){const{props:o,attrs:a,vnode:{patchFlag:r}}=t,i=Me(o),[l]=t.propsOptions;let u=!1;if((s||r>0)&&!(r&16)){if(r&8){const c=t.vnode.dynamicProps;for(let d=0;d<c.length;d++){let p=c[d];if(Ko(t.emitsOptions,p))continue;const m=e[p];if(l)if(Re(a,p))m!==a[p]&&(a[p]=m,u=!0);else{const w=Tt(p);o[w]=Na(l,i,w,m,t,!1)}else m!==a[p]&&(a[p]=m,u=!0)}}}else{lu(t,e,o,a)&&(u=!0);let c;for(const d in i)(!e||!Re(e,d)&&((c=gn(d))===d||!Re(e,c)))&&(l?n&&(n[d]!==void 0||n[c]!==void 0)&&(o[d]=Na(l,i,d,void 0,t,!0)):delete o[d]);if(a!==i)for(const d in a)(!e||!Re(e,d))&&(delete a[d],u=!0)}u&&rn(t.attrs,"set","")}function lu(t,e,n,s){const[o,a]=t.propsOptions;let r=!1,i;if(e)for(let l in e){if(Cs(l))continue;const u=e[l];let c;o&&Re(o,c=Tt(l))?!a||!a.includes(c)?n[c]=u:(i||(i={}))[c]=u:Ko(t.emitsOptions,l)||(!(l in s)||u!==s[l])&&(s[l]=u,r=!0)}if(a){const l=Me(n),u=i||Ae;for(let c=0;c<a.length;c++){const d=a[c];n[d]=Na(o,l,d,u[d],t,!Re(u,d))}}return r}function Na(t,e,n,s,o,a){const r=t[n];if(r!=null){const i=Re(r,"default");if(i&&s===void 0){const l=r.default;if(r.type!==Function&&!r.skipFactory&&xe(l)){const{propsDefaults:u}=o;if(n in u)s=u[n];else{const c=Xs(o);s=u[n]=l.call(null,e),c()}}else s=l;o.ce&&o.ce._setProp(n,s)}r[0]&&(a&&!i?s=!1:r[1]&&(s===""||s===gn(n))&&(s=!0))}return s}const np=new WeakMap;function uu(t,e,n=!1){const s=n?np:e.propsCache,o=s.get(t);if(o)return o;const a=t.props,r={},i=[];let l=!1;if(!xe(t)){const c=d=>{l=!0;const[p,m]=uu(d,e,!0);Ze(r,p),m&&i.push(...m)};!n&&e.mixins.length&&e.mixins.forEach(c),t.extends&&c(t.extends),t.mixins&&t.mixins.forEach(c)}if(!a&&!l)return Ie(t)&&s.set(t,ts),ts;if(be(a))for(let c=0;c<a.length;c++){const d=Tt(a[c]);Qr(d)&&(r[d]=Ae)}else if(a)for(const c in a){const d=Tt(c);if(Qr(d)){const p=a[c],m=r[d]=be(p)||xe(p)?{type:p}:Ze({},p),w=m.type;let g=!1,v=!0;if(be(w))for(let b=0;b<w.length;++b){const y=w[b],S=xe(y)&&y.name;if(S==="Boolean"){g=!0;break}else S==="String"&&(v=!1)}else g=xe(w)&&w.name==="Boolean";m[0]=g,m[1]=v,(g||Re(m,"default"))&&i.push(d)}}const u=[r,i];return Ie(t)&&s.set(t,u),u}function Qr(t){return t[0]!=="$"&&!Cs(t)}const kr=t=>t==="_"||t==="_ctx"||t==="$stable",Sr=t=>be(t)?t.map(qt):[qt(t)],sp=(t,e,n)=>{if(e._n)return e;const s=D((...o)=>Sr(e(...o)),n);return s._c=!1,s},cu=(t,e,n)=>{const s=t._ctx;for(const o in t){if(kr(o))continue;const a=t[o];if(xe(a))e[o]=sp(o,a,s);else if(a!=null){const r=Sr(a);e[o]=()=>r}}},du=(t,e)=>{const n=Sr(e);t.slots.default=()=>n},pu=(t,e,n)=>{for(const s in e)(n||!kr(s))&&(t[s]=e[s])},op=(t,e,n)=>{const s=t.slots=ru();if(t.vnode.shapeFlag&32){const o=e._;o?(pu(s,e,n),n&&xl(s,"_",o,!0)):cu(e,s)}else e&&du(t,e)},ap=(t,e,n)=>{const{vnode:s,slots:o}=t;let a=!0,r=Ae;if(s.shapeFlag&32){const i=e._;i?n&&i===1?a=!1:pu(o,e,n):(a=!e.$stable,cu(e,o)),r=e}else e&&(du(t,e),r={default:1});if(a)for(const i in o)!kr(i)&&r[i]==null&&delete o[i]},bt=cp;function rp(t){return ip(t)}function ip(t,e){const n=Fo();n.__VUE__=!0;const{insert:s,remove:o,patchProp:a,createElement:r,createText:i,createComment:l,setText:u,setElementText:c,parentNode:d,nextSibling:p,setScopeId:m=Wt,insertStaticContent:w}=t,g=(k,E,O,H=null,U=null,F=null,ee=void 0,Q=null,X=!!E.dynamicChildren)=>{if(k===E)return;k&&!ys(k,E)&&(H=V(k),W(k,U,F,!0),k=null),E.patchFlag===-2&&(X=!1,E.dynamicChildren=null);const{type:q,ref:pe,shapeFlag:se}=E;switch(q){case Go:v(k,E,O,H);break;case hn:b(k,E,O,H);break;case fa:k==null&&y(E,O,H,ee);break;case ne:Se(k,E,O,H,U,F,ee,Q,X);break;default:se&1?_(k,E,O,H,U,F,ee,Q,X):se&6?z(k,E,O,H,U,F,ee,Q,X):(se&64||se&128)&&q.process(k,E,O,H,U,F,ee,Q,X,ue)}pe!=null&&U?Ms(pe,k&&k.ref,F,E||k,!E):pe==null&&k&&k.ref!=null&&Ms(k.ref,null,F,k,!0)},v=(k,E,O,H)=>{if(k==null)s(E.el=i(E.children),O,H);else{const U=E.el=k.el;E.children!==k.children&&u(U,E.children)}},b=(k,E,O,H)=>{k==null?s(E.el=l(E.children||""),O,H):E.el=k.el},y=(k,E,O,H)=>{[k.el,k.anchor]=w(k.children,E,O,H,k.el,k.anchor)},S=({el:k,anchor:E},O,H)=>{let U;for(;k&&k!==E;)U=p(k),s(k,O,H),k=U;s(E,O,H)},$=({el:k,anchor:E})=>{let O;for(;k&&k!==E;)O=p(k),o(k),k=O;o(E)},_=(k,E,O,H,U,F,ee,Q,X)=>{if(E.type==="svg"?ee="svg":E.type==="math"&&(ee="mathml"),k==null)N(E,O,H,U,F,ee,Q,X);else{const q=k.el&&k.el._isVueCE?k.el:null;try{q&&q._beginPatch(),L(k,E,U,F,ee,Q,X)}finally{q&&q._endPatch()}}},N=(k,E,O,H,U,F,ee,Q)=>{let X,q;const{props:pe,shapeFlag:se,transition:ce,dirs:ve}=k;if(X=k.el=r(k.type,F,pe&&pe.is,pe),se&8?c(X,k.children):se&16&&j(k.children,X,null,H,U,pa(k,F),ee,Q),ve&&Rn(k,null,H,"created"),G(X,k,k.scopeId,ee,H),pe){for(const De in pe)De!=="value"&&!Cs(De)&&a(X,De,null,pe[De],F,H);"value"in pe&&a(X,"value",null,pe.value,F),(q=pe.onVnodeBeforeMount)&&Vt(q,H,k)}ve&&Rn(k,null,H,"beforeMount");const Ee=lp(U,ce);Ee&&ce.beforeEnter(X),s(X,E,O),((q=pe&&pe.onVnodeMounted)||Ee||ve)&&bt(()=>{try{q&&Vt(q,H,k),Ee&&ce.enter(X),ve&&Rn(k,null,H,"mounted")}finally{}},U)},G=(k,E,O,H,U)=>{if(O&&m(k,O),H)for(let F=0;F<H.length;F++)m(k,H[F]);if(U){let F=U.subTree;if(E===F||gu(F.type)&&(F.ssContent===E||F.ssFallback===E)){const ee=U.vnode;G(k,ee,ee.scopeId,ee.slotScopeIds,U.parent)}}},j=(k,E,O,H,U,F,ee,Q,X=0)=>{for(let q=X;q<k.length;q++){const pe=k[q]=Q?an(k[q]):qt(k[q]);g(null,pe,E,O,H,U,F,ee,Q)}},L=(k,E,O,H,U,F,ee)=>{const Q=E.el=k.el;let{patchFlag:X,dynamicChildren:q,dirs:pe}=E;X|=k.patchFlag&16;const se=k.props||Ae,ce=E.props||Ae;let ve;if(O&&_n(O,!1),(ve=ce.onVnodeBeforeUpdate)&&Vt(ve,O,E,k),pe&&Rn(E,k,O,"beforeUpdate"),O&&_n(O,!0),q&&(!k.dynamicChildren||k.dynamicChildren.length!==q.length)&&(X=0,ee=!1,q=null),(se.innerHTML&&ce.innerHTML==null||se.textContent&&ce.textContent==null)&&c(Q,""),q?I(k.dynamicChildren,q,Q,O,H,pa(E,U),F):ee||K(k,E,Q,null,O,H,pa(E,U),F,!1),X>0){if(X&16)he(Q,se,ce,O,U);else if(X&2&&se.class!==ce.class&&a(Q,"class",null,ce.class,U),X&4&&a(Q,"style",se.style,ce.style,U),X&8){const Ee=E.dynamicProps;for(let De=0;De<Ee.length;De++){const je=Ee[De],Ue=se[je],tt=ce[je];(tt!==Ue||je==="value")&&a(Q,je,Ue,tt,U,O)}}X&1&&k.children!==E.children&&c(Q,E.children)}else!ee&&q==null&&he(Q,se,ce,O,U);((ve=ce.onVnodeUpdated)||pe)&&bt(()=>{ve&&Vt(ve,O,E,k),pe&&Rn(E,k,O,"updated")},H)},I=(k,E,O,H,U,F,ee)=>{for(let Q=0;Q<E.length;Q++){const X=k[Q],q=E[Q],pe=X.el&&(X.type===ne||!ys(X,q)||X.shapeFlag&198)?d(X.el):O;g(X,q,pe,null,H,U,F,ee,!0)}},he=(k,E,O,H,U)=>{if(E!==O){if(E!==Ae)for(const F in E)!Cs(F)&&!(F in O)&&a(k,F,E[F],null,U,H);for(const F in O){if(Cs(F))continue;const ee=O[F],Q=E[F];ee!==Q&&F!=="value"&&a(k,F,Q,ee,U,H)}"value"in O&&a(k,"value",E.value,O.value,U)}},Se=(k,E,O,H,U,F,ee,Q,X)=>{const q=E.el=k?k.el:i(""),pe=E.anchor=k?k.anchor:i("");let{patchFlag:se,dynamicChildren:ce,slotScopeIds:ve}=E;ve&&(Q=Q?Q.concat(ve):ve),k==null?(s(q,O,H),s(pe,O,H),j(E.children||[],O,pe,U,F,ee,Q,X)):se>0&&se&64&&ce&&k.dynamicChildren&&k.dynamicChildren.length===ce.length?(I(k.dynamicChildren,ce,O,U,F,ee,Q),(E.key!=null||U&&E===U.subTree)&&fu(k,E,!0)):K(k,E,O,pe,U,F,ee,Q,X)},z=(k,E,O,H,U,F,ee,Q,X)=>{E.slotScopeIds=Q,k==null?E.shapeFlag&512?U.ctx.activate(E,O,H,ee,X):ae(E,O,H,U,F,ee,X):P(k,E,X)},ae=(k,E,O,H,U,F,ee)=>{const Q=k.component=gp(k,H,U);if(Yl(k)&&(Q.ctx.renderer=ue),bp(Q,!1,ee),Q.asyncDep){if(U&&U.registerDep(Q,J,ee),!k.el){const X=Q.subTree=T(hn);b(null,X,E,O),k.placeholder=X.el}}else J(Q,k,E,O,U,F,ee)},P=(k,E,O)=>{const H=E.component=k.component;if(Qd(k,E,O))if(H.asyncDep&&!H.asyncResolved){le(H,E,O);return}else H.next=E,H.update();else E.el=k.el,H.vnode=E},J=(k,E,O,H,U,F,ee)=>{const Q=()=>{if(k.isMounted){let{next:se,bu:ce,u:ve,parent:Ee,vnode:De}=k;{const Ft=hu(k);if(Ft){se&&(se.el=De.el,le(k,se,ee)),Ft.asyncDep.then(()=>{bt(()=>{k.isUnmounted||q()},U)});return}}let je=se,Ue;_n(k,!1),se?(se.el=De.el,le(k,se,ee)):se=De,ce&&ho(ce),(Ue=se.props&&se.props.onVnodeBeforeUpdate)&&Vt(Ue,Ee,se,De),_n(k,!0);const tt=Xr(k),Bt=k.subTree;k.subTree=tt,g(Bt,tt,d(Bt.el),V(Bt),k,U,F),se.el=tt.el,je===null&&Zd(k,tt.el),ve&&bt(ve,U),(Ue=se.props&&se.props.onVnodeUpdated)&&bt(()=>Vt(Ue,Ee,se,De),U)}else{let se;const{el:ce,props:ve}=E,{bm:Ee,m:De,parent:je,root:Ue,type:tt}=k,Bt=os(E);_n(k,!1),Ee&&ho(Ee),!Bt&&(se=ve&&ve.onVnodeBeforeMount)&&Vt(se,je,E),_n(k,!0);{Ue.ce&&Ue.ce._hasShadowRoot()&&Ue.ce._injectChildStyle(tt,k.parent?k.parent.type:void 0);const Ft=k.subTree=Xr(k);g(null,Ft,O,H,k,U,F),E.el=Ft.el}if(De&&bt(De,U),!Bt&&(se=ve&&ve.onVnodeMounted)){const Ft=E;bt(()=>Vt(se,je,Ft),U)}(E.shapeFlag&256||je&&os(je.vnode)&&je.vnode.shapeFlag&256)&&k.a&&bt(k.a,U),k.isMounted=!0,E=O=H=null}};k.scope.on();const X=k.effect=new El(Q);k.scope.off();const q=k.update=X.run.bind(X),pe=k.job=X.runIfDirty.bind(X);pe.i=k,pe.id=k.uid,X.scheduler=()=>br(pe),_n(k,!0),q()},le=(k,E,O)=>{E.component=k;const H=k.vnode.props;k.vnode=E,k.next=null,tp(k,E.props,H,O),ap(k,E.children,O),dn(),zr(k),pn()},K=(k,E,O,H,U,F,ee,Q,X=!1)=>{const q=k&&k.children,pe=k?k.shapeFlag:0,se=E.children,{patchFlag:ce,shapeFlag:ve}=E;if(ce>0){if(ce&128){$e(q,se,O,H,U,F,ee,Q,X);return}else if(ce&256){re(q,se,O,H,U,F,ee,Q,X);return}}ve&8?(pe&16&&at(q,U,F),se!==q&&c(O,se)):pe&16?ve&16?$e(q,se,O,H,U,F,ee,Q,X):at(q,U,F,!0):(pe&8&&c(O,""),ve&16&&j(se,O,H,U,F,ee,Q,X))},re=(k,E,O,H,U,F,ee,Q,X)=>{k=k||ts,E=E||ts;const q=k.length,pe=E.length,se=Math.min(q,pe);let ce;for(ce=0;ce<se;ce++){const ve=E[ce]=X?an(E[ce]):qt(E[ce]);g(k[ce],ve,O,null,U,F,ee,Q,X)}q>pe?at(k,U,F,!0,!1,se):j(E,O,H,U,F,ee,Q,X,se)},$e=(k,E,O,H,U,F,ee,Q,X)=>{let q=0;const pe=E.length;let se=k.length-1,ce=pe-1;for(;q<=se&&q<=ce;){const ve=k[q],Ee=E[q]=X?an(E[q]):qt(E[q]);if(ys(ve,Ee))g(ve,Ee,O,null,U,F,ee,Q,X);else break;q++}for(;q<=se&&q<=ce;){const ve=k[se],Ee=E[ce]=X?an(E[ce]):qt(E[ce]);if(ys(ve,Ee))g(ve,Ee,O,null,U,F,ee,Q,X);else break;se--,ce--}if(q>se){if(q<=ce){const ve=ce+1,Ee=ve<pe?E[ve].el:H;for(;q<=ce;)g(null,E[q]=X?an(E[q]):qt(E[q]),O,Ee,U,F,ee,Q,X),q++}}else if(q>ce)for(;q<=se;)W(k[q],U,F,!0),q++;else{const ve=q,Ee=q,De=new Map;for(q=Ee;q<=ce;q++){const xt=E[q]=X?an(E[q]):qt(E[q]);xt.key!=null&&De.set(xt.key,q)}let je,Ue=0;const tt=ce-Ee+1;let Bt=!1,Ft=0;const bs=new Array(tt);for(q=0;q<tt;q++)bs[q]=0;for(q=ve;q<=se;q++){const xt=k[q];if(Ue>=tt){W(xt,U,F,!0);continue}let Ht;if(xt.key!=null)Ht=De.get(xt.key);else for(je=Ee;je<=ce;je++)if(bs[je-Ee]===0&&ys(xt,E[je])){Ht=je;break}Ht===void 0?W(xt,U,F,!0):(bs[Ht-Ee]=q+1,Ht>=Ft?Ft=Ht:Bt=!0,g(xt,E[Ht],O,null,U,F,ee,Q,X),Ue++)}const Lr=Bt?up(bs):ts;for(je=Lr.length-1,q=tt-1;q>=0;q--){const xt=Ee+q,Ht=E[xt],Nr=E[xt+1],Br=xt+1<pe?Nr.el||mu(Nr):H;bs[q]===0?g(null,Ht,O,Br,U,F,ee,Q,X):Bt&&(je<0||q!==Lr[je]?et(Ht,O,Br,2):je--)}}},et=(k,E,O,H,U=null)=>{const{el:F,type:ee,transition:Q,children:X,shapeFlag:q}=k;if(q&6){et(k.component.subTree,E,O,H);return}if(q&128){k.suspense.move(E,O,H);return}if(q&64){ee.move(k,E,O,ue);return}if(ee===ne){s(F,E,O);for(let se=0;se<X.length;se++)et(X[se],E,O,H);s(k.anchor,E,O);return}if(ee===fa){S(k,E,O);return}if(H!==2&&q&1&&Q)if(H===0)Q.persisted&&!F[ca]?s(F,E,O):(Q.beforeEnter(F),s(F,E,O),bt(()=>Q.enter(F),U));else{const{leave:se,delayLeave:ce,afterLeave:ve}=Q,Ee=()=>{k.ctx.isUnmounted?o(F):s(F,E,O)},De=()=>{const je=F._isLeaving||!!F[ca];F._isLeaving&&F[ca](!0),Q.persisted&&!je?Ee():se(F,()=>{Ee(),ve&&ve()})};ce?ce(F,Ee,De):De()}else s(F,E,O)},W=(k,E,O,H=!1,U=!1)=>{const{type:F,props:ee,ref:Q,children:X,dynamicChildren:q,shapeFlag:pe,patchFlag:se,dirs:ce,cacheIndex:ve,memo:Ee}=k;if(se===-2&&(U=!1),Q!=null&&(dn(),Ms(Q,null,O,k,!0),pn()),ve!=null&&(E.renderCache[ve]=void 0),pe&256){E.ctx.deactivate(k);return}const De=pe&1&&ce,je=!os(k);let Ue;if(je&&(Ue=ee&&ee.onVnodeBeforeUnmount)&&Vt(Ue,E,k),pe&6)qe(k.component,O,H);else{if(pe&128){k.suspense.unmount(O,H);return}De&&Rn(k,null,E,"beforeUnmount"),pe&64?k.type.remove(k,E,O,ue,H):q&&!q.hasOnce&&(F!==ne||se>0&&se&64)?at(q,E,O,!1,!0):(F===ne&&se&384||!U&&pe&16)&&at(X,E,O),H&&me(k)}const tt=Ee!=null&&ve==null;(je&&(Ue=ee&&ee.onVnodeUnmounted)||De||tt)&&bt(()=>{Ue&&Vt(Ue,E,k),De&&Rn(k,null,E,"unmounted"),tt&&(k.el=null)},O)},me=k=>{const{type:E,el:O,anchor:H,transition:U}=k;if(E===ne){Te(O,H);return}if(E===fa){$(k);return}const F=()=>{o(O),U&&!U.persisted&&U.afterLeave&&U.afterLeave()};if(k.shapeFlag&1&&U&&!U.persisted){const{leave:ee,delayLeave:Q}=U,X=()=>ee(O,F);Q?Q(k.el,F,X):X()}else F()},Te=(k,E)=>{let O;for(;k!==E;)O=p(k),o(k),k=O;o(E)},qe=(k,E,O)=>{const{bum:H,scope:U,job:F,subTree:ee,um:Q,m:X,a:q}=k;Zr(X),Zr(q),H&&ho(H),U.stop(),F&&(F.flags|=8,W(ee,k,E,O)),Q&&bt(Q,E),bt(()=>{k.isUnmounted=!0},E)},at=(k,E,O,H=!1,U=!1,F=0)=>{for(let ee=F;ee<k.length;ee++)W(k[ee],E,O,H,U)},V=k=>{if(k.shapeFlag&6)return V(k.component.subTree);if(k.shapeFlag&128)return k.suspense.next();const E=p(k.anchor||k.el),O=E&&E[Ad];return O?p(O):E};let ie=!1;const te=(k,E,O)=>{let H;k==null?E._vnode&&(W(E._vnode,null,null,!0),H=E._vnode.component):g(E._vnode||null,k,E,null,null,null,O),E._vnode=k,ie||(ie=!0,zr(H),zl(),ie=!1)},ue={p:g,um:W,m:et,r:me,mt:ae,mc:j,pc:K,pbc:I,n:V,o:t};return{render:te,hydrate:void 0,createApp:Gd(te)}}function pa({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function _n({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function lp(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function fu(t,e,n=!1){const s=t.children,o=e.children;if(be(s)&&be(o))for(let a=0;a<s.length;a++){const r=s[a];let i=o[a];i.shapeFlag&1&&!i.dynamicChildren&&((i.patchFlag<=0||i.patchFlag===32)&&(i=o[a]=an(o[a]),i.el=r.el),!n&&i.patchFlag!==-2&&fu(r,i)),i.type===Go&&(i.patchFlag===-1&&(i=o[a]=an(i)),i.el=r.el),i.type===hn&&!i.el&&(i.el=r.el)}}function up(t){const e=t.slice(),n=[0];let s,o,a,r,i;const l=t.length;for(s=0;s<l;s++){const u=t[s];if(u!==0){if(o=n[n.length-1],t[o]<u){e[s]=o,n.push(s);continue}for(a=0,r=n.length-1;a<r;)i=a+r>>1,t[n[i]]<u?a=i+1:r=i;u<t[n[a]]&&(a>0&&(e[s]=n[a-1]),n[a]=s)}}for(a=n.length,r=n[a-1];a-- >0;)n[a]=r,r=e[r];return n}function hu(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:hu(e)}function Zr(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}function mu(t){if(t.placeholder)return t.placeholder;const e=t.component;return e?mu(e.subTree):null}const gu=t=>t.__isSuspense;function cp(t,e){e&&e.pendingBranch?be(t)?e.effects.push(...t):e.effects.push(t):kd(t)}const ne=Symbol.for("v-fgt"),Go=Symbol.for("v-txt"),hn=Symbol.for("v-cmt"),fa=Symbol.for("v-stc"),un=[];let $t=null;function x(t=!1){un.push($t=t?null:[])}function $r(){un.pop(),$t=un[un.length-1]||null}let Bs=1;function Co(t,e=!1){Bs+=t,t<0&&$t&&e&&($t.hasOnce=!0)}function bu(t){return t.dynamicChildren=Bs>0?$t||ts:null,$r(),Bs>0&&$t&&$t.push(t),t}function A(t,e,n,s,o,a){return bu(h(t,e,n,s,o,a,!0))}function Y(t,e,n,s,o){return bu(T(t,e,n,s,o,!0))}function Fs(t){return t?t.__v_isVNode===!0:!1}function ys(t,e){return t.type===e.type&&t.key===e.key}const vu=({key:t})=>t??null,go=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?He(t)||ct(t)||xe(t)?{i:it,r:t,k:e,f:!!n}:t:null);function h(t,e=null,n=null,s=0,o=null,a=t===ne?0:1,r=!1,i=!1){const l={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&vu(e),ref:e&&go(e),scopeId:Kl,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:a,patchFlag:s,dynamicProps:o,dynamicChildren:null,appContext:null,ctx:it};return i?(Ao(l,n),a&128&&t.normalize(l)):n&&(l.shapeFlag|=He(n)?8:16),Bs>0&&!r&&$t&&(l.patchFlag>0||a&6)&&l.patchFlag!==32&&$t.push(l),l}const T=dp;function dp(t,e=null,n=null,s=0,o=null,a=!1){if((!t||t===Bd)&&(t=hn),Fs(t)){const i=us(t,e,!0);return n&&Ao(i,n),Bs>0&&!a&&$t&&(i.shapeFlag&6?$t[$t.indexOf(t)]=i:$t.push(i)),i.patchFlag=-2,i}if(xp(t)&&(t=t.__vccOpts),e){e=pp(e);let{class:i,style:l}=e;i&&!He(i)&&(e.class=de(i)),Ie(l)&&(mr(l)&&!be(l)&&(l=Ze({},l)),e.style=cn(l))}const r=He(t)?1:gu(t)?128:Td(t)?64:Ie(t)?4:xe(t)?2:0;return h(t,e,n,s,o,r,a,!0)}function pp(t){return t?mr(t)||iu(t)?Ze({},t):t:null}function us(t,e,n=!1,s=!1){const{props:o,ref:a,patchFlag:r,children:i,transition:l}=t,u=e?fp(o||{},e):o,c={__v_isVNode:!0,__v_skip:!0,type:t.type,props:u,key:u&&vu(u),ref:e&&e.ref?n&&a?be(a)?a.concat(go(e)):[a,go(e)]:go(e):a,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:i,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==ne?r===-1?16:r|16:r,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:l,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&us(t.ssContent),ssFallback:t.ssFallback&&us(t.ssFallback),placeholder:t.placeholder,el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce};return l&&s&&yr(c,l.clone(c)),c}function M(t=" ",e=0){return T(Go,null,t,e)}function ge(t="",e=!1){return e?(x(),Y(hn,null,t)):T(hn,null,t)}function qt(t){return t==null||typeof t=="boolean"?T(hn):be(t)?T(ne,null,t.slice()):Fs(t)?an(t):T(Go,null,String(t))}function an(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:us(t)}function Ao(t,e){let n=0;const{shapeFlag:s}=t;if(e==null)e=null;else if(be(e))n=16;else if(typeof e=="object")if(s&65){const o=e.default;o&&(o._c&&(o._d=!1),Ao(t,o()),o._c&&(o._d=!0));return}else{n=32;const o=e._;!o&&!iu(e)?e._ctx=it:o===3&&it&&(it.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else if(xe(e)){if(s&65){Ao(t,{default:e});return}e={default:e,_ctx:it},n=32}else e=String(e),s&64?(n=16,e=[M(e)]):n=8;t.children=e,t.shapeFlag|=n}function fp(...t){const e={};for(let n=0;n<t.length;n++){const s=t[n];for(const o in s)if(o==="class")e.class!==s.class&&(e.class=de([e.class,s.class]));else if(o==="style")e.style=cn([e.style,s.style]);else if(Do(o)){const a=e[o],r=s[o];r&&a!==r&&!(be(a)&&a.includes(r))?e[o]=a?[].concat(a,r):r:r==null&&a==null&&!Po(o)&&(e[o]=r)}else o!==""&&(e[o]=s[o])}return e}function Vt(t,e,n,s=null){Lt(t,e,7,[n,s])}const hp=tu();let mp=0;function gp(t,e,n){const s=t.type,o=(e?e.appContext:t.appContext)||hp,a={uid:mp++,vnode:t,type:s,parent:e,appContext:o,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Kc(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(o.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:uu(s,o),emitsOptions:su(s,o),emit:null,emitted:null,propsDefaults:Ae,inheritAttrs:s.inheritAttrs,ctx:Ae,data:Ae,props:Ae,attrs:Ae,slots:Ae,refs:Ae,setupState:Ae,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return a.ctx={_:a},a.root=e?e.root:a,a.emit=Wd.bind(null,a),t.ce&&t.ce(a),a}let mt=null;const yu=()=>mt||it;let To,Ba;{const t=Fo(),e=(n,s)=>{let o;return(o=t[n])||(o=t[n]=[]),o.push(s),a=>{o.length>1?o.forEach(r=>r(a)):o[0](a)}};To=e("__VUE_INSTANCE_SETTERS__",n=>mt=n),Ba=e("__VUE_SSR_SETTERS__",n=>Hs=n)}const Xs=t=>{const e=mt;return To(t),t.scope.on(),()=>{t.scope.off(),To(e)}},ei=()=>{mt&&mt.scope.off(),To(null)};function wu(t){return t.vnode.shapeFlag&4}let Hs=!1;function bp(t,e=!1,n=!1){e&&Ba(e);const{props:s,children:o}=t.vnode,a=wu(t);ep(t,s,a,e),op(t,o,n||e);const r=a?vp(t,e):void 0;return e&&Ba(!1),r}function vp(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,Fd);const{setup:s}=n;if(s){dn();const o=t.setupContext=s.length>1?wp(t):null,a=Xs(t),r=Ys(s,t,0,[t.props,o]),i=bl(r);if(pn(),a(),(i||t.sp)&&!os(t)&&Wl(t),i){if(r.then(ei,ei),e)return r.then(l=>{ti(t,l)}).catch(l=>{zo(l,t,0)});t.asyncDep=r}else ti(t,r)}else xu(t)}function ti(t,e,n){xe(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:Ie(e)&&(t.setupState=Hl(e)),xu(t)}function xu(t,e,n){const s=t.type;t.render||(t.render=s.render||Wt);{const o=Xs(t);dn();try{Hd(t)}finally{pn(),o()}}}const yp={get(t,e){return rt(t,"get",""),t[e]}};function wp(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,yp),slots:t.slots,emit:t.emit,expose:e}}function Wo(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(Hl(dd(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in Rs)return Rs[n](t)},has(e,n){return n in e||n in Rs}})):t.proxy}function xp(t){return xe(t)&&"__vccOpts"in t}const C=(t,e)=>bd(t,e,Hs);function ku(t,e,n){try{Co(-1);const s=arguments.length;return s===2?Ie(e)&&!be(e)?Fs(e)?T(t,null,[e]):T(t,e):T(t,null,e):(s>3?n=Array.prototype.slice.call(arguments,2):s===3&&Fs(n)&&(n=[n]),T(t,e,n))}finally{Co(1)}}const kp="3.5.40";/**
* @vue/runtime-dom v3.5.40
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Fa;const ni=typeof window<"u"&&window.trustedTypes;if(ni)try{Fa=ni.createPolicy("vue",{createHTML:t=>t})}catch{}const Su=Fa?t=>Fa.createHTML(t):t=>t,Sp="http://www.w3.org/2000/svg",$p="http://www.w3.org/1998/Math/MathML",on=typeof document<"u"?document:null,si=on&&on.createElement("template"),Ep={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,s)=>{const o=e==="svg"?on.createElementNS(Sp,t):e==="mathml"?on.createElementNS($p,t):n?on.createElement(t,{is:n}):on.createElement(t);return t==="select"&&s&&s.multiple!=null&&o.setAttribute("multiple",s.multiple),o},createText:t=>on.createTextNode(t),createComment:t=>on.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>on.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,s,o,a){const r=n?n.previousSibling:e.lastChild;if(o&&(o===a||o.nextSibling))for(;e.insertBefore(o.cloneNode(!0),n),!(o===a||!(o=o.nextSibling)););else{si.innerHTML=Su(s==="svg"?`<svg>${t}</svg>`:s==="mathml"?`<math>${t}</math>`:t);const i=si.content;if(s==="svg"||s==="mathml"){const l=i.firstChild;for(;l.firstChild;)i.appendChild(l.firstChild);i.removeChild(l)}e.insertBefore(i,n)}return[r?r.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},Cp=Symbol("_vtc");function Ap(t,e,n){const s=t[Cp];s&&(e=(e?[e,...s]:[...s]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const oi=Symbol("_vod"),Tp=Symbol("_vsh"),Op=Symbol(""),Mp=/(?:^|;)\s*display\s*:/;function Rp(t,e,n){const s=t.style,o=He(n);let a=!1;if(n&&!o){if(e)if(He(e))for(const r of e.split(";")){const i=r.slice(0,r.indexOf(":")).trim();n[i]==null&&$s(s,i,"")}else for(const r in e)n[r]==null&&$s(s,r,"");for(const r in n){r==="display"&&(a=!0);const i=n[r];i!=null?Ip(t,r,!He(e)&&e?e[r]:void 0,i)||$s(s,r,i):$s(s,r,"")}}else if(o){if(e!==n){const r=s[Op];r&&(n+=";"+r),s.cssText=n,a=Mp.test(n)}}else e&&t.removeAttribute("style");oi in t&&(t[oi]=a?s.display:"",t[Tp]&&(s.display="none"))}const ai=/\s*!important$/;function $s(t,e,n){if(be(n))n.forEach(s=>$s(t,e,s));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const s=_p(t,e);ai.test(n)?t.setProperty(gn(s),n.replace(ai,""),"important"):t[s]=n}}const ri=["Webkit","Moz","ms"],ha={};function _p(t,e){const n=ha[e];if(n)return n;let s=Tt(e);if(s!=="filter"&&s in t)return ha[e]=s;s=wl(s);for(let o=0;o<ri.length;o++){const a=ri[o]+s;if(a in t)return ha[e]=a}return e}function Ip(t,e,n,s){return t.tagName==="TEXTAREA"&&(e==="width"||e==="height")&&He(s)&&n===s}const ii="http://www.w3.org/1999/xlink";function li(t,e,n,s,o,a=Uc(e)){s&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(ii,e.slice(6,e.length)):t.setAttributeNS(ii,e,n):n==null||a&&!kl(n)?t.removeAttribute(e):t.setAttribute(e,a?"":Dt(n)?String(n):n)}function ui(t,e,n,s,o){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?Su(n):n);return}const a=t.tagName;if(e==="value"&&a!=="PROGRESS"&&!a.includes("-")){const i=a==="OPTION"?t.getAttribute("value")||"":t.value,l=n==null?t.type==="checkbox"?"on":"":String(n);(i!==l||!("_value"in t))&&(t.value=l),n==null&&t.removeAttribute(e),t._value=n;return}let r=!1;if(n===""||n==null){const i=typeof t[e];i==="boolean"?n=kl(n):n==null&&i==="string"?(n="",r=!0):i==="number"&&(n=0,r=!0)}try{t[e]=n}catch{}r&&t.removeAttribute(o||e)}function jn(t,e,n,s){t.addEventListener(e,n,s)}function jp(t,e,n,s){t.removeEventListener(e,n,s)}const ci=Symbol("_vei");function Dp(t,e,n,s,o=null){const a=t[ci]||(t[ci]={}),r=a[e];if(s&&r)r.value=s;else{const[i,l]=Np(e);if(s){const u=a[e]=Hp(s,o);jn(t,i,u,l)}else r&&(jp(t,i,r,l),a[e]=void 0)}}const Pp=/(Once|Passive|Capture)$/,Lp=/^on:?(?:Once|Passive|Capture)$/;function Np(t){let e,n;for(;(n=t.match(Pp))&&!Lp.test(t);)e||(e={}),t=t.slice(0,t.length-n[1].length),e[n[1].toLowerCase()]=!0;return[t[2]===":"?t.slice(3):gn(t.slice(2)),e]}let ma=0;const Bp=Promise.resolve(),Fp=()=>ma||(Bp.then(()=>ma=0),ma=Date.now());function Hp(t,e){const n=s=>{if(!s._vts)s._vts=Date.now();else if(s._vts<=n.attached)return;const o=n.value;if(be(o)){const a=s.stopImmediatePropagation;s.stopImmediatePropagation=()=>{a.call(s),s._stopped=!0};const r=o.slice(),i=[s];for(let l=0;l<r.length&&!s._stopped;l++){const u=r[l];u&&Lt(u,e,5,i)}}else Lt(o,e,5,[s])};return n.value=t,n.attached=Fp(),n}const di=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,Vp=(t,e,n,s,o,a)=>{const r=o==="svg";e==="class"?Ap(t,s,r):e==="style"?Rp(t,n,s):Do(e)?Po(e)||Dp(t,e,n,s,a):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):Up(t,e,s,r))?(ui(t,e,s),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&li(t,e,s,r,a,e!=="value")):t._isVueCE&&(zp(t,e)||t._def.__asyncLoader&&(/[A-Z]/.test(e)||!He(s)))?ui(t,Tt(e),s,a,e):(e==="true-value"?t._trueValue=s:e==="false-value"&&(t._falseValue=s),li(t,e,s,r))};function Up(t,e,n,s){if(s)return!!(e==="innerHTML"||e==="textContent"||e in t&&di(e)&&xe(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="sandbox"&&t.tagName==="IFRAME"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const o=t.tagName;if(o==="IMG"||o==="VIDEO"||o==="CANVAS"||o==="SOURCE")return!1}return di(e)&&He(n)?!1:e in t}function zp(t,e){const n=t._def.props;if(!n)return!1;const s=Tt(e);return Array.isArray(n)?n.some(o=>Tt(o)===s):Object.keys(n).some(o=>Tt(o)===s)}const Oo=t=>{const e=t.props["onUpdate:modelValue"]||!1;return be(e)?n=>ho(e,n):e};function qp(t){t.target.composing=!0}function pi(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const rs=Symbol("_assign");function fi(t,e,n){return e&&(t=t.trim()),n&&(t=Bo(t)),t}const Mo={created(t,{modifiers:{lazy:e,trim:n,number:s}},o){t[rs]=Oo(o);const a=s||o.props&&o.props.type==="number";jn(t,e?"change":"input",r=>{r.target.composing||t[rs](fi(t.value,n,a))}),(n||a)&&jn(t,"change",()=>{t.value=fi(t.value,n,a)}),e||(jn(t,"compositionstart",qp),jn(t,"compositionend",pi),jn(t,"change",pi))},mounted(t,{value:e}){t.value=e??""},beforeUpdate(t,{value:e,oldValue:n,modifiers:{lazy:s,trim:o,number:a}},r){if(t[rs]=Oo(r),t.composing)return;const i=(a||t.type==="number")&&!/^0\d/.test(t.value)?Bo(t.value):t.value,l=e??"";if(i===l)return;const u=t.getRootNode();(u instanceof Document||u instanceof ShadowRoot)&&u.activeElement===t&&t.type!=="range"&&(s&&e===n||o&&t.value.trim()===l)||(t.value=l)}},Kp={deep:!0,created(t,{value:e,modifiers:{number:n}},s){t._modelValue=e,jn(t,"change",()=>{const o=Array.prototype.filter.call(t.options,a=>a.selected).map(a=>n?Bo(Ro(a)):Ro(a));t[rs](t.multiple?Lo(t._modelValue)?new Set(o):o:o[0]),t._assigning=!0,ps(()=>{t._assigning=!1})}),t[rs]=Oo(s)},mounted(t,{value:e}){hi(t,e)},beforeUpdate(t,{value:e},n){t._modelValue=e,t[rs]=Oo(n)},updated(t,{value:e}){t._assigning||hi(t,e)}};function hi(t,e){const n=t.multiple,s=be(e);if(!(n&&!s&&!Lo(e))){for(let o=0,a=t.options.length;o<a;o++){const r=t.options[o],i=Ro(r);if(n)if(s){const l=typeof i;l==="string"||l==="number"?r.selected=e.some(u=>String(u)===String(i)):r.selected=qc(e,i)>-1}else r.selected=e.has(i);else if(Ws(Ro(r),e)){t.selectedIndex!==o&&(t.selectedIndex=o);return}}!n&&t.selectedIndex!==-1&&(t.selectedIndex=-1)}}function Ro(t){return"_value"in t?t._value:t.value}const Gp=["ctrl","shift","alt","meta"],Wp={stop:t=>t.stopPropagation(),prevent:t=>t.preventDefault(),self:t=>t.target!==t.currentTarget,ctrl:t=>!t.ctrlKey,shift:t=>!t.shiftKey,alt:t=>!t.altKey,meta:t=>!t.metaKey,left:t=>"button"in t&&t.button!==0,middle:t=>"button"in t&&t.button!==1,right:t=>"button"in t&&t.button!==2,exact:(t,e)=>Gp.some(n=>t[`${n}Key`]&&!e.includes(n))},tn=(t,e)=>{if(!t)return t;const n=t._withMods||(t._withMods={}),s=e.join(".");return n[s]||(n[s]=(o,...a)=>{for(let r=0;r<e.length;r++){const i=Wp[e[r]];if(i&&i(o,e))return}return t(o,...a)})},Yp={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},Rt=(t,e)=>{const n=t._withKeys||(t._withKeys={}),s=e.join(".");return n[s]||(n[s]=o=>{if(!("key"in o))return;const a=gn(o.key);if(e.some(r=>r===a||Yp[r]===a))return t(o)})},Xp=Ze({patchProp:Vp},Ep);let mi;function Jp(){return mi||(mi=rp(Xp))}const Qp=(...t)=>{const e=Jp().createApp(...t),{mount:n}=e;return e.mount=s=>{const o=ef(s);if(!o)return;const a=e._component;!xe(a)&&!a.render&&!a.template&&(a.template=o.innerHTML),o.nodeType===1&&(o.textContent="");const r=n(o,!1,Zp(o));return o instanceof Element&&(o.removeAttribute("v-cloak"),o.setAttribute("data-v-app","")),r},e};function Zp(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function ef(t){return He(t)?document.querySelector(t):t}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const Jn=typeof document<"u";function $u(t){return typeof t=="object"||"displayName"in t||"props"in t||"__vccOpts"in t}function tf(t){return t.__esModule||t[Symbol.toStringTag]==="Module"||t.default&&$u(t.default)}const Oe=Object.assign;function ga(t,e){const n={};for(const s in e){const o=e[s];n[s]=Nt(o)?o.map(t):t(o)}return n}const _s=()=>{},Nt=Array.isArray;function gi(t,e){const n={};for(const s in t)n[s]=s in e?e[s]:t[s];return n}const Eu=/#/g,nf=/&/g,sf=/\//g,of=/=/g,af=/\?/g,Cu=/\+/g,rf=/%5B/g,lf=/%5D/g,Au=/%5E/g,uf=/%60/g,Tu=/%7B/g,cf=/%7C/g,Ou=/%7D/g,df=/%20/g;function Er(t){return t==null?"":encodeURI(""+t).replace(cf,"|").replace(rf,"[").replace(lf,"]")}function pf(t){return Er(t).replace(Tu,"{").replace(Ou,"}").replace(Au,"^")}function Ha(t){return Er(t).replace(Cu,"%2B").replace(df,"+").replace(Eu,"%23").replace(nf,"%26").replace(uf,"`").replace(Tu,"{").replace(Ou,"}").replace(Au,"^")}function ff(t){return Ha(t).replace(of,"%3D")}function hf(t){return Er(t).replace(Eu,"%23").replace(af,"%3F")}function mf(t){return hf(t).replace(sf,"%2F")}function Vs(t){if(t==null)return null;try{return decodeURIComponent(""+t)}catch{}return""+t}const gf=/\/$/,bf=t=>t.replace(gf,"");function ba(t,e,n="/"){let s,o={},a="",r="";const i=e.indexOf("#");let l=e.indexOf("?");return l=i>=0&&l>i?-1:l,l>=0&&(s=e.slice(0,l),a=e.slice(l,i>0?i:e.length),o=t(a.slice(1))),i>=0&&(s=s||e.slice(0,i),r=e.slice(i,e.length)),s=xf(s??e,n),{fullPath:s+a+r,path:s,query:o,hash:Vs(r)}}function vf(t,e){const n=e.query?t(e.query):"";return e.path+(n&&"?")+n+(e.hash||"")}function bi(t,e){return!e||!t.toLowerCase().startsWith(e.toLowerCase())?t:t.slice(e.length)||"/"}function yf(t,e,n){const s=e.matched.length-1,o=n.matched.length-1;return s>-1&&s===o&&cs(e.matched[s],n.matched[o])&&Mu(e.params,n.params)&&t(e.query)===t(n.query)&&e.hash===n.hash}function cs(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function Mu(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(var n in t)if(!wf(t[n],e[n]))return!1;return!0}function wf(t,e){return Nt(t)?vi(t,e):Nt(e)?vi(e,t):(t==null?void 0:t.valueOf())===(e==null?void 0:e.valueOf())}function vi(t,e){return Nt(e)?t.length===e.length&&t.every((n,s)=>n===e[s]):t.length===1&&t[0]===e}function xf(t,e){if(t.startsWith("/"))return t;if(!t)return e;const n=e.split("/"),s=t.split("/"),o=s[s.length-1];(o===".."||o===".")&&s.push("");let a=n.length-1,r,i;for(r=0;r<s.length;r++)if(i=s[r],i!==".")if(i==="..")a>1&&a--;else break;return n.slice(0,a).join("/")+"/"+s.slice(r).join("/")}const Sn={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let Va=function(t){return t.pop="pop",t.push="push",t}({}),va=function(t){return t.back="back",t.forward="forward",t.unknown="",t}({});function kf(t){if(!t)if(Jn){const e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^\w+:\/\/[^\/]+/,"")}else t="/";return t[0]!=="/"&&t[0]!=="#"&&(t="/"+t),bf(t)}const Sf=/^[^#]+#/;function $f(t,e){return t.replace(Sf,"#")+e}function Ef(t,e){const n=document.documentElement.getBoundingClientRect(),s=t.getBoundingClientRect();return{behavior:e.behavior,left:s.left-n.left-(e.left||0),top:s.top-n.top-(e.top||0)}}const Yo=()=>({left:window.scrollX,top:window.scrollY});function Cf(t){let e;if("el"in t){const n=t.el,s=typeof n=="string"&&n.startsWith("#"),o=typeof n=="string"?s?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!o)return;e=Ef(o,t)}else e=t;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function yi(t,e){return(history.state?history.state.position-e:-1)+t}const Ua=new Map;function Af(t,e){Ua.set(t,e)}function Tf(t){const e=Ua.get(t);return Ua.delete(t),e}function Of(t){return typeof t=="string"||t&&typeof t=="object"}function Ru(t){return typeof t=="string"||typeof t=="symbol"}let Fe=function(t){return t[t.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",t[t.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",t[t.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",t[t.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",t[t.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",t}({});const _u=Symbol("");Fe.MATCHER_NOT_FOUND+"",Fe.NAVIGATION_GUARD_REDIRECT+"",Fe.NAVIGATION_ABORTED+"",Fe.NAVIGATION_CANCELLED+"",Fe.NAVIGATION_DUPLICATED+"";function ds(t,e){return Oe(new Error,{type:t,[_u]:!0},e)}function nn(t,e){return t instanceof Error&&_u in t&&(e==null||!!(t.type&e))}const Mf=["params","query","hash"];function Rf(t){if(typeof t=="string")return t;if(t.path!=null)return t.path;const e={};for(const n of Mf)n in t&&(e[n]=t[n]);return JSON.stringify(e,null,2)}function _f(t){const e={};if(t===""||t==="?")return e;const n=(t[0]==="?"?t.slice(1):t).split("&");for(let s=0;s<n.length;++s){const o=n[s].replace(Cu," "),a=o.indexOf("="),r=Vs(a<0?o:o.slice(0,a)),i=a<0?null:Vs(o.slice(a+1));if(r in e){let l=e[r];Nt(l)||(l=e[r]=[l]),l.push(i)}else e[r]=i}return e}function wi(t){let e="";for(let n in t){const s=t[n];if(n=ff(n),s==null){s!==void 0&&(e+=(e.length?"&":"")+n);continue}(Nt(s)?s.map(o=>o&&Ha(o)):[s&&Ha(s)]).forEach(o=>{o!==void 0&&(e+=(e.length?"&":"")+n,o!=null&&(e+="="+o))})}return e}function If(t){const e={};for(const n in t){const s=t[n];s!==void 0&&(e[n]=Nt(s)?s.map(o=>o==null?null:""+o):s==null?s:""+s)}return e}const jf=Symbol(""),xi=Symbol(""),Xo=Symbol(""),Iu=Symbol(""),za=Symbol("");function ws(){let t=[];function e(s){return t.push(s),()=>{const o=t.indexOf(s);o>-1&&t.splice(o,1)}}function n(){t=[]}return{add:e,list:()=>t.slice(),reset:n}}function Cn(t,e,n,s,o,a=r=>r()){const r=s&&(s.enterCallbacks[o]=s.enterCallbacks[o]||[]);return()=>new Promise((i,l)=>{const u=p=>{p===!1?l(ds(Fe.NAVIGATION_ABORTED,{from:n,to:e})):p instanceof Error?l(p):Of(p)?l(ds(Fe.NAVIGATION_GUARD_REDIRECT,{from:e,to:p})):(r&&s.enterCallbacks[o]===r&&typeof p=="function"&&r.push(p),i())},c=a(()=>t.call(s&&s.instances[o],e,n,u));let d=Promise.resolve(c);t.length<3&&(d=d.then(u)),d.catch(p=>l(p))})}function ya(t,e,n,s,o=a=>a()){const a=[];for(const r of t)for(const i in r.components){let l=r.components[i];if(!(e!=="beforeRouteEnter"&&!r.instances[i]))if($u(l)){const u=(l.__vccOpts||l)[e];u&&a.push(Cn(u,n,s,r,i,o))}else{let u=l();a.push(()=>u.then(c=>{if(!c)throw new Error(`Couldn't resolve component "${i}" at "${r.path}"`);const d=tf(c)?c.default:c;r.mods[i]=c,r.components[i]=d;const p=(d.__vccOpts||d)[e];return p&&Cn(p,n,s,r,i,o)()}))}}return a}function Df(t,e){const n=[],s=[],o=[],a=Math.max(e.matched.length,t.matched.length);for(let r=0;r<a;r++){const i=e.matched[r];i&&(t.matched.find(u=>cs(u,i))?s.push(i):n.push(i));const l=t.matched[r];l&&(e.matched.find(u=>cs(u,l))||o.push(l))}return[n,s,o]}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let Pf=()=>location.protocol+"//"+location.host;function ju(t,e){const{pathname:n,search:s,hash:o}=e,a=t.indexOf("#");if(a>-1){let r=o.includes(t.slice(a))?t.slice(a).length:1,i=o.slice(r);return i[0]!=="/"&&(i="/"+i),bi(i,"")}return bi(n,t)+s+o}function Lf(t,e,n,s){let o=[],a=[],r=null;const i=({state:p})=>{const m=ju(t,location),w=n.value,g=e.value;let v=0;if(p){if(n.value=m,e.value=p,r&&r===w){r=null;return}v=g?p.position-g.position:0}else s(m);o.forEach(b=>{b(n.value,w,{delta:v,type:Va.pop,direction:v?v>0?va.forward:va.back:va.unknown})})};function l(){r=n.value}function u(p){o.push(p);const m=()=>{const w=o.indexOf(p);w>-1&&o.splice(w,1)};return a.push(m),m}function c(){if(document.visibilityState==="hidden"){const{history:p}=window;if(!p.state)return;p.replaceState(Oe({},p.state,{scroll:Yo()}),"")}}function d(){for(const p of a)p();a=[],window.removeEventListener("popstate",i),window.removeEventListener("pagehide",c),document.removeEventListener("visibilitychange",c)}return window.addEventListener("popstate",i),window.addEventListener("pagehide",c),document.addEventListener("visibilitychange",c),{pauseListeners:l,listen:u,destroy:d}}function ki(t,e,n,s=!1,o=!1){return{back:t,current:e,forward:n,replaced:s,position:window.history.length,scroll:o?Yo():null}}function Nf(t){const{history:e,location:n}=window,s={value:ju(t,n)},o={value:e.state};o.value||a(s.value,{back:null,current:s.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function a(l,u,c){const d=t.indexOf("#"),p=d>-1?(n.host&&document.querySelector("base")?t:t.slice(d))+l:Pf()+t+l;try{e[c?"replaceState":"pushState"](u,"",p),o.value=u}catch(m){console.error(m),n[c?"replace":"assign"](p)}}function r(l,u){a(l,Oe({},e.state,ki(o.value.back,l,o.value.forward,!0),u,{position:o.value.position}),!0),s.value=l}function i(l,u){const c=Oe({},o.value,e.state,{forward:l,scroll:Yo()});a(c.current,c,!0),a(l,Oe({},ki(s.value,l,null),{position:c.position+1},u),!1),s.value=l}return{location:s,state:o,push:i,replace:r}}function Bf(t){t=kf(t);const e=Nf(t),n=Lf(t,e.state,e.location,e.replace);function s(a,r=!0){r||n.pauseListeners(),history.go(a)}const o=Oe({location:"",base:t,go:s,createHref:$f.bind(null,t)},e,n);return Object.defineProperty(o,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(o,"state",{enumerable:!0,get:()=>e.state.value}),o}function Ff(t){return t=location.host?t||location.pathname+location.search:"",t.includes("#")||(t+="#"),Bf(t)}let Pn=function(t){return t[t.Static=0]="Static",t[t.Param=1]="Param",t[t.Group=2]="Group",t}({});var Ke=function(t){return t[t.Static=0]="Static",t[t.Param=1]="Param",t[t.ParamRegExp=2]="ParamRegExp",t[t.ParamRegExpEnd=3]="ParamRegExpEnd",t[t.EscapeNext=4]="EscapeNext",t}(Ke||{});const Hf={type:Pn.Static,value:""},Vf=/[a-zA-Z0-9_]/;function Uf(t){if(!t)return[[]];if(t==="/")return[[Hf]];if(!t.startsWith("/"))throw new Error(`Invalid path "${t}"`);function e(m){throw new Error(`ERR (${n})/"${u}": ${m}`)}let n=Ke.Static,s=n;const o=[];let a;function r(){a&&o.push(a),a=[]}let i=0,l,u="",c="";function d(){u&&(n===Ke.Static?a.push({type:Pn.Static,value:u}):n===Ke.Param||n===Ke.ParamRegExp||n===Ke.ParamRegExpEnd?(a.length>1&&(l==="*"||l==="+")&&e(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`),a.push({type:Pn.Param,value:u,regexp:c,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):e("Invalid state to consume buffer"),u="")}function p(){u+=l}for(;i<t.length;){if(l=t[i++],l==="\\"&&n!==Ke.ParamRegExp){s=n,n=Ke.EscapeNext;continue}switch(n){case Ke.Static:l==="/"?(u&&d(),r()):l===":"?(d(),n=Ke.Param):p();break;case Ke.EscapeNext:p(),n=s;break;case Ke.Param:l==="("?n=Ke.ParamRegExp:Vf.test(l)?p():(d(),n=Ke.Static,l!=="*"&&l!=="?"&&l!=="+"&&i--);break;case Ke.ParamRegExp:l===")"?c[c.length-1]=="\\"?c=c.slice(0,-1)+l:n=Ke.ParamRegExpEnd:c+=l;break;case Ke.ParamRegExpEnd:d(),n=Ke.Static,l!=="*"&&l!=="?"&&l!=="+"&&i--,c="";break;default:e("Unknown state");break}}return n===Ke.ParamRegExp&&e(`Unfinished custom RegExp for param "${u}"`),d(),r(),o}const Si="[^/]+?",zf={sensitive:!1,strict:!1,start:!0,end:!0};var pt=function(t){return t[t._multiplier=10]="_multiplier",t[t.Root=90]="Root",t[t.Segment=40]="Segment",t[t.SubSegment=30]="SubSegment",t[t.Static=40]="Static",t[t.Dynamic=20]="Dynamic",t[t.BonusCustomRegExp=10]="BonusCustomRegExp",t[t.BonusWildcard=-50]="BonusWildcard",t[t.BonusRepeatable=-20]="BonusRepeatable",t[t.BonusOptional=-8]="BonusOptional",t[t.BonusStrict=.7000000000000001]="BonusStrict",t[t.BonusCaseSensitive=.25]="BonusCaseSensitive",t}(pt||{});const qf=/[.+*?^${}()[\]/\\]/g;function Kf(t,e){const n=Oe({},zf,e),s=[];let o=n.start?"^":"";const a=[];for(const u of t){const c=u.length?[]:[pt.Root];n.strict&&!u.length&&(o+="/");for(let d=0;d<u.length;d++){const p=u[d];let m=pt.Segment+(n.sensitive?pt.BonusCaseSensitive:0);if(p.type===Pn.Static)d||(o+="/"),o+=p.value.replace(qf,"\\$&"),m+=pt.Static;else if(p.type===Pn.Param){const{value:w,repeatable:g,optional:v,regexp:b}=p;a.push({name:w,repeatable:g,optional:v});const y=b||Si;if(y!==Si){m+=pt.BonusCustomRegExp;try{`${y}`}catch($){throw new Error(`Invalid custom RegExp for param "${w}" (${y}): `+$.message)}}let S=g?`((?:${y})(?:/(?:${y}))*)`:`(${y})`;d||(S=v&&u.length<2?`(?:/${S})`:"/"+S),v&&(S+="?"),o+=S,m+=pt.Dynamic,v&&(m+=pt.BonusOptional),g&&(m+=pt.BonusRepeatable),y===".*"&&(m+=pt.BonusWildcard)}c.push(m)}s.push(c)}if(n.strict&&n.end){const u=s.length-1;s[u][s[u].length-1]+=pt.BonusStrict}n.strict||(o+="/?"),n.end?o+="$":n.strict&&!o.endsWith("/")&&(o+="(?:/|$)");const r=new RegExp(o,n.sensitive?"":"i");function i(u){const c=u.match(r),d={};if(!c)return null;for(let p=1;p<c.length;p++){const m=c[p]||"",w=a[p-1];d[w.name]=m&&w.repeatable?m.split("/"):m}return d}function l(u){let c="",d=!1;for(const p of t){(!d||!c.endsWith("/"))&&(c+="/"),d=!1;for(const m of p)if(m.type===Pn.Static)c+=m.value;else if(m.type===Pn.Param){const{value:w,repeatable:g,optional:v}=m,b=w in u?u[w]:"";if(Nt(b)&&!g)throw new Error(`Provided param "${w}" is an array but it is not repeatable (* or + modifiers)`);const y=Nt(b)?b.join("/"):b;if(!y)if(v)p.length<2&&(c.endsWith("/")?c=c.slice(0,-1):d=!0);else throw new Error(`Missing required param "${w}"`);c+=y}}return c||"/"}return{re:r,score:s,keys:a,parse:i,stringify:l}}function Gf(t,e){let n=0;for(;n<t.length&&n<e.length;){const s=e[n]-t[n];if(s)return s;n++}return t.length<e.length?t.length===1&&t[0]===pt.Static+pt.Segment?-1:1:t.length>e.length?e.length===1&&e[0]===pt.Static+pt.Segment?1:-1:0}function Du(t,e){let n=0;const s=t.score,o=e.score;for(;n<s.length&&n<o.length;){const a=Gf(s[n],o[n]);if(a)return a;n++}if(Math.abs(o.length-s.length)===1){if($i(s))return 1;if($i(o))return-1}return o.length-s.length}function $i(t){const e=t[t.length-1];return t.length>0&&e[e.length-1]<0}const Wf={strict:!1,end:!0,sensitive:!1};function Yf(t,e,n){const s=Kf(Uf(t.path),n),o=Oe(s,{record:t,parent:e,children:[],alias:[]});return e&&!o.record.aliasOf==!e.record.aliasOf&&e.children.push(o),o}function Xf(t,e){const n=[],s=new Map;e=gi(Wf,e);function o(d){return s.get(d)}function a(d,p,m){const w=!m,g=Ci(d);g.aliasOf=m&&m.record;const v=gi(e,d),b=[g];if("alias"in d){const $=typeof d.alias=="string"?[d.alias]:d.alias;for(const _ of $)b.push(Ci(Oe({},g,{components:m?m.record.components:g.components,path:_,aliasOf:m?m.record:g})))}let y,S;for(const $ of b){const{path:_}=$;if(p&&_[0]!=="/"){const N=p.record.path,G=N[N.length-1]==="/"?"":"/";$.path=p.record.path+(_&&G+_)}if(y=Yf($,p,v),m?m.alias.push(y):(S=S||y,S!==y&&S.alias.push(y),w&&d.name&&!Ai(y)&&r(d.name)),Pu(y)&&l(y),g.children){const N=g.children;for(let G=0;G<N.length;G++)a(N[G],y,m&&m.children[G])}m=m||y}return S?()=>{r(S)}:_s}function r(d){if(Ru(d)){const p=s.get(d);p&&(s.delete(d),n.splice(n.indexOf(p),1),p.children.forEach(r),p.alias.forEach(r))}else{const p=n.indexOf(d);p>-1&&(n.splice(p,1),d.record.name&&s.delete(d.record.name),d.children.forEach(r),d.alias.forEach(r))}}function i(){return n}function l(d){const p=Zf(d,n);n.splice(p,0,d),d.record.name&&!Ai(d)&&s.set(d.record.name,d)}function u(d,p){let m,w={},g,v;if("name"in d&&d.name){if(m=s.get(d.name),!m)throw ds(Fe.MATCHER_NOT_FOUND,{location:d});v=m.record.name,w=Oe(Ei(p.params,m.keys.filter(S=>!S.optional).concat(m.parent?m.parent.keys.filter(S=>S.optional):[]).map(S=>S.name)),d.params&&Ei(d.params,m.keys.map(S=>S.name))),g=m.stringify(w)}else if(d.path!=null)g=d.path,m=n.find(S=>S.re.test(g)),m&&(w=m.parse(g),v=m.record.name);else{if(m=p.name?s.get(p.name):n.find(S=>S.re.test(p.path)),!m)throw ds(Fe.MATCHER_NOT_FOUND,{location:d,currentLocation:p});v=m.record.name,w=Oe({},p.params,d.params),g=m.stringify(w)}const b=[];let y=m;for(;y;)b.unshift(y.record),y=y.parent;return{name:v,path:g,params:w,matched:b,meta:Qf(b)}}t.forEach(d=>a(d));function c(){n.length=0,s.clear()}return{addRoute:a,resolve:u,removeRoute:r,clearRoutes:c,getRoutes:i,getRecordMatcher:o}}function Ei(t,e){const n={};for(const s of e)s in t&&(n[s]=t[s]);return n}function Ci(t){const e={path:t.path,redirect:t.redirect,name:t.name,meta:t.meta||{},aliasOf:t.aliasOf,beforeEnter:t.beforeEnter,props:Jf(t),children:t.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in t?t.components||null:t.component&&{default:t.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function Jf(t){const e={},n=t.props||!1;if("component"in t)e.default=n;else for(const s in t.components)e[s]=typeof n=="object"?n[s]:n;return e}function Ai(t){for(;t;){if(t.record.aliasOf)return!0;t=t.parent}return!1}function Qf(t){return t.reduce((e,n)=>Oe(e,n.meta),{})}function Zf(t,e){let n=0,s=e.length;for(;n!==s;){const a=n+s>>1;Du(t,e[a])<0?s=a:n=a+1}const o=eh(t);return o&&(s=e.lastIndexOf(o,s-1)),s}function eh(t){let e=t;for(;e=e.parent;)if(Pu(e)&&Du(t,e)===0)return e}function Pu({record:t}){return!!(t.name||t.components&&Object.keys(t.components).length||t.redirect)}function Ti(t){const e=Yt(Xo),n=Yt(Iu),s=C(()=>{const l=f(t.to);return e.resolve(l)}),o=C(()=>{const{matched:l}=s.value,{length:u}=l,c=l[u-1],d=n.matched;if(!c||!d.length)return-1;const p=d.findIndex(cs.bind(null,c));if(p>-1)return p;const m=Oi(l[u-2]);return u>1&&Oi(c)===m&&d[d.length-1].path!==m?d.findIndex(cs.bind(null,l[u-2])):p}),a=C(()=>o.value>-1&&oh(n.params,s.value.params)),r=C(()=>o.value>-1&&o.value===n.matched.length-1&&Mu(n.params,s.value.params));function i(l={}){if(sh(l)){const u=e[f(t.replace)?"replace":"push"](f(t.to)).catch(_s);return t.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>u),u}return Promise.resolve()}return{route:s,href:C(()=>s.value.href),isActive:a,isExactActive:r,navigate:i}}function th(t){return t.length===1?t[0]:t}const nh=oe({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:Ti,setup(t,{slots:e}){const n=Le(Ti(t)),{options:s}=Yt(Xo),o=C(()=>({[Mi(t.activeClass,s.linkActiveClass,"router-link-active")]:n.isActive,[Mi(t.exactActiveClass,s.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const a=e.default&&th(e.default(n));return t.custom?a:ku("a",{"aria-current":n.isExactActive?t.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:o.value},a)}}}),Us=nh;function sh(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){const e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function oh(t,e){for(const n in e){const s=e[n],o=t[n];if(typeof s=="string"){if(s!==o)return!1}else if(!Nt(o)||o.length!==s.length||s.some((a,r)=>a.valueOf()!==o[r].valueOf()))return!1}return!0}function Oi(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}const Mi=(t,e,n)=>t??e??n,ah=oe({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(t,{attrs:e,slots:n}){const s=Yt(za),o=C(()=>t.route||s.value),a=Yt(xi,0),r=C(()=>{let u=f(a);const{matched:c}=o.value;let d;for(;(d=c[u])&&!d.components;)u++;return u}),i=C(()=>o.value.matched[r.value]);mo(xi,C(()=>r.value+1)),mo(jf,i),mo(za,o);const l=B();return _e(()=>[l.value,i.value,t.name],([u,c,d],[p,m,w])=>{c&&(c.instances[d]=u,m&&m!==c&&u&&u===p&&(c.leaveGuards.size||(c.leaveGuards=m.leaveGuards),c.updateGuards.size||(c.updateGuards=m.updateGuards))),u&&c&&(!m||!cs(c,m)||!p)&&(c.enterCallbacks[d]||[]).forEach(g=>g(u))},{flush:"post"}),()=>{const u=o.value,c=t.name,d=i.value,p=d&&d.components[c];if(!p)return Ri(n.default,{Component:p,route:u});const m=d.props[c],w=m?m===!0?u.params:typeof m=="function"?m(u):m:null,v=ku(p,Oe({},w,e,{onVnodeUnmounted:b=>{b.component.isUnmounted&&(d.instances[c]=null)},ref:l}));return Ri(n.default,{Component:v,route:u})||v}}});function Ri(t,e){if(!t)return null;const n=t(e);return n.length===1?n[0]:n}const Lu=ah;function rh(t){const e=Xf(t.routes,t),n=t.parseQuery||_f,s=t.stringifyQuery||wi,o=t.history,a=ws(),r=ws(),i=ws(),l=gr(Sn);let u=Sn;Jn&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const c=ga.bind(null,V=>""+V),d=ga.bind(null,mf),p=ga.bind(null,Vs);function m(V,ie){let te,ue;return Ru(V)?(te=e.getRecordMatcher(V),ue=ie):ue=V,e.addRoute(ue,te)}function w(V){const ie=e.getRecordMatcher(V);ie&&e.removeRoute(ie)}function g(){return e.getRoutes().map(V=>V.record)}function v(V){return!!e.getRecordMatcher(V)}function b(V,ie){if(ie=Oe({},ie||l.value),typeof V=="string"){const O=ba(n,V,ie.path),H=e.resolve({path:O.path},ie),U=o.createHref(O.fullPath);return Oe(O,H,{params:p(H.params),hash:Vs(O.hash),redirectedFrom:void 0,href:U})}let te;if(V.path!=null)te=Oe({},V,{path:ba(n,V.path,ie.path).path});else{const O=Oe({},V.params);for(const H in O)O[H]==null&&delete O[H];te=Oe({},V,{params:d(O)}),ie.params=d(ie.params)}const ue=e.resolve(te,ie),ke=V.hash||"";ue.params=c(p(ue.params));const k=vf(s,Oe({},V,{hash:pf(ke),path:ue.path})),E=o.createHref(k);return Oe({fullPath:k,hash:ke,query:s===wi?If(V.query):V.query||{}},ue,{redirectedFrom:void 0,href:E})}function y(V){return typeof V=="string"?ba(n,V,l.value.path):Oe({},V)}function S(V,ie){if(u!==V)return ds(Fe.NAVIGATION_CANCELLED,{from:ie,to:V})}function $(V){return G(V)}function _(V){return $(Oe(y(V),{replace:!0}))}function N(V,ie){const te=V.matched[V.matched.length-1];if(te&&te.redirect){const{redirect:ue}=te;let ke=typeof ue=="function"?ue(V,ie):ue;return typeof ke=="string"&&(ke=ke.includes("?")||ke.includes("#")?ke=y(ke):{path:ke},ke.params={}),Oe({query:V.query,hash:V.hash,params:ke.path!=null?{}:V.params},ke)}}function G(V,ie){const te=u=b(V),ue=l.value,ke=V.state,k=V.force,E=V.replace===!0,O=N(te,ue);if(O)return G(Oe(y(O),{state:typeof O=="object"?Oe({},ke,O.state):ke,force:k,replace:E}),ie||te);const H=te;H.redirectedFrom=ie;let U;return!k&&yf(s,ue,te)&&(U=ds(Fe.NAVIGATION_DUPLICATED,{to:H,from:ue}),et(ue,ue,!0,!1)),(U?Promise.resolve(U):I(H,ue)).catch(F=>nn(F)?nn(F,Fe.NAVIGATION_GUARD_REDIRECT)?F:$e(F):K(F,H,ue)).then(F=>{if(F){if(nn(F,Fe.NAVIGATION_GUARD_REDIRECT))return G(Oe({replace:E},y(F.to),{state:typeof F.to=="object"?Oe({},ke,F.to.state):ke,force:k}),ie||H)}else F=Se(H,ue,!0,E,ke);return he(H,ue,F),F})}function j(V,ie){const te=S(V,ie);return te?Promise.reject(te):Promise.resolve()}function L(V){const ie=Te.values().next().value;return ie&&typeof ie.runWithContext=="function"?ie.runWithContext(V):V()}function I(V,ie){let te;const[ue,ke,k]=Df(V,ie);te=ya(ue.reverse(),"beforeRouteLeave",V,ie);for(const O of ue)O.leaveGuards.forEach(H=>{te.push(Cn(H,V,ie))});const E=j.bind(null,V,ie);return te.push(E),at(te).then(()=>{te=[];for(const O of a.list())te.push(Cn(O,V,ie));return te.push(E),at(te)}).then(()=>{te=ya(ke,"beforeRouteUpdate",V,ie);for(const O of ke)O.updateGuards.forEach(H=>{te.push(Cn(H,V,ie))});return te.push(E),at(te)}).then(()=>{te=[];for(const O of k)if(O.beforeEnter)if(Nt(O.beforeEnter))for(const H of O.beforeEnter)te.push(Cn(H,V,ie));else te.push(Cn(O.beforeEnter,V,ie));return te.push(E),at(te)}).then(()=>(V.matched.forEach(O=>O.enterCallbacks={}),te=ya(k,"beforeRouteEnter",V,ie,L),te.push(E),at(te))).then(()=>{te=[];for(const O of r.list())te.push(Cn(O,V,ie));return te.push(E),at(te)}).catch(O=>nn(O,Fe.NAVIGATION_CANCELLED)?O:Promise.reject(O))}function he(V,ie,te){i.list().forEach(ue=>L(()=>ue(V,ie,te)))}function Se(V,ie,te,ue,ke){const k=S(V,ie);if(k)return k;const E=ie===Sn,O=Jn?history.state:{};te&&(ue||E?o.replace(V.fullPath,Oe({scroll:E&&O&&O.scroll},ke)):o.push(V.fullPath,ke)),l.value=V,et(V,ie,te,E),$e()}let z;function ae(){z||(z=o.listen((V,ie,te)=>{if(!qe.listening)return;const ue=b(V),ke=N(ue,qe.currentRoute.value);if(ke){G(Oe(ke,{replace:!0,force:!0}),ue).catch(_s);return}u=ue;const k=l.value;Jn&&Af(yi(k.fullPath,te.delta),Yo()),I(ue,k).catch(E=>nn(E,Fe.NAVIGATION_ABORTED|Fe.NAVIGATION_CANCELLED)?E:nn(E,Fe.NAVIGATION_GUARD_REDIRECT)?(G(Oe(y(E.to),{force:!0}),ue).then(O=>{nn(O,Fe.NAVIGATION_ABORTED|Fe.NAVIGATION_DUPLICATED)&&!te.delta&&te.type===Va.pop&&o.go(-1,!1)}).catch(_s),Promise.reject()):(te.delta&&o.go(-te.delta,!1),K(E,ue,k))).then(E=>{E=E||Se(ue,k,!1),E&&(te.delta&&!nn(E,Fe.NAVIGATION_CANCELLED)?o.go(-te.delta,!1):te.type===Va.pop&&nn(E,Fe.NAVIGATION_ABORTED|Fe.NAVIGATION_DUPLICATED)&&o.go(-1,!1)),he(ue,k,E)}).catch(_s)}))}let P=ws(),J=ws(),le;function K(V,ie,te){$e(V);const ue=J.list();return ue.length?ue.forEach(ke=>ke(V,ie,te)):console.error(V),Promise.reject(V)}function re(){return le&&l.value!==Sn?Promise.resolve():new Promise((V,ie)=>{P.add([V,ie])})}function $e(V){return le||(le=!V,ae(),P.list().forEach(([ie,te])=>V?te(V):ie()),P.reset()),V}function et(V,ie,te,ue){const{scrollBehavior:ke}=t;if(!Jn||!ke)return Promise.resolve();const k=!te&&Tf(yi(V.fullPath,0))||(ue||!te)&&history.state&&history.state.scroll||null;return ps().then(()=>ke(V,ie,k)).then(E=>E&&Cf(E)).catch(E=>K(E,V,ie))}const W=V=>o.go(V);let me;const Te=new Set,qe={currentRoute:l,listening:!0,addRoute:m,removeRoute:w,clearRoutes:e.clearRoutes,hasRoute:v,getRoutes:g,resolve:b,options:t,push:$,replace:_,go:W,back:()=>W(-1),forward:()=>W(1),beforeEach:a.add,beforeResolve:r.add,afterEach:i.add,onError:J.add,isReady:re,install(V){V.component("RouterLink",Us),V.component("RouterView",Lu),V.config.globalProperties.$router=qe,Object.defineProperty(V.config.globalProperties,"$route",{enumerable:!0,get:()=>f(l)}),Jn&&!me&&l.value===Sn&&(me=!0,$(o.location).catch(ue=>{}));const ie={};for(const ue in Sn)Object.defineProperty(ie,ue,{get:()=>l.value[ue],enumerable:!0});V.provide(Xo,qe),V.provide(Iu,Bl(ie)),V.provide(za,l);const te=V.unmount;Te.add(V),V.unmount=function(){Te.delete(V),Te.size<1&&(u=Sn,z&&z(),z=null,l.value=Sn,me=!1,le=!1),te()}}};function at(V){return V.reduce((ie,te)=>ie.then(()=>L(te)),Promise.resolve())}return qe}function ih(){return Yt(Xo)}const Be=(t,e,n,s,o,a,r)=>({array:[...t],comparing:e,swapping:n,sorted:[...s],comparisons:o,swaps:a,done:!1,line:r}),Mt=(t,e,n,s)=>({array:[...t],comparing:[],swapping:[],sorted:t.map((o,a)=>a),comparisons:e,swaps:n,done:!0,line:s});function*lh(t){const e=[...t],n=e.length,s=new Set;let o=0,a=0;for(let r=0;r<n-1;r++){for(let i=0;i<n-1-r;i++)o++,yield Be(e,[i,i+1],[],s,o,a,2),e[i]>e[i+1]&&([e[i],e[i+1]]=[e[i+1],e[i]],a++,yield Be(e,[],[i,i+1],s,o,a,3));s.add(n-1-r)}s.add(0),yield Mt(e,o,a,5)}function*uh(t){const e=[...t],n=e.length,s=new Set;let o=0,a=0;for(let r=0;r<n;r++){let i=r;for(let l=r+1;l<n;l++)o++,yield Be(e,[i,l],[],s,o,a,3),e[l]<e[i]&&(i=l);i!==r&&([e[r],e[i]]=[e[i],e[r]],a++,yield Be(e,[],[r,i],s,o,a,5)),s.add(r)}yield Mt(e,o,a,7)}function*ch(t){const e=[...t],n=e.length,s=new Set;let o=0,a=0;for(let r=1;r<n;r++){let i=r;for(;i>0&&(o++,yield Be(e,[i-1,i],[],s,o,a,2),e[i-1]>e[i]);)[e[i-1],e[i]]=[e[i],e[i-1]],a++,yield Be(e,[],[i-1,i],s,o,a,3),i--}yield Mt(e,o,a,5)}function*dh(t){const e=[...t],n=new Set;let s=0,o=0;function*a(r,i){if(i-r<=1)return;const l=r+i>>1;yield*a(r,l),yield*a(l,i);const u=[];let c=r,d=l;for(;c<l&&d<i;)s++,yield Be(e,[c,d],[],n,s,o,5),e[c]<=e[d]?u.push(e[c++]):u.push(e[d++]);for(;c<l;)u.push(e[c++]);for(;d<i;)u.push(e[d++]);for(let p=0;p<u.length;p++)e[r+p]=u[p],o++,yield Be(e,[],[r+p],n,s,o,7)}yield*a(0,e.length),yield Mt(e,s,o,8)}function*ph(t){const e=[...t],n=new Set;let s=0,o=0;function*a(r,i){if(r>i)return;if(r===i){n.add(r);return}const l=e[i];let u=r;for(let c=r;c<i;c++)s++,yield Be(e,[c,i],[],n,s,o,4),e[c]<l&&(u!==c&&([e[u],e[c]]=[e[c],e[u]],o++,yield Be(e,[],[u,c],n,s,o,5)),u++);u!==i&&([e[u],e[i]]=[e[i],e[u]],o++,yield Be(e,[],[u,i],n,s,o,6)),n.add(u),yield*a(r,u-1),yield*a(u+1,i)}yield*a(0,e.length-1),yield Mt(e,s,o,8)}function*fh(t){const e=[...t],n=e.length,s=new Set;let o=0,a=0;function*r(i,l){for(;2*i+1<=l;){let u=2*i+1;if(u+1<=l&&(o++,yield Be(e,[u,u+1],[],s,o,a,2),e[u]<e[u+1]&&u++),o++,yield Be(e,[i,u],[],s,o,a,3),e[i]<e[u])[e[i],e[u]]=[e[u],e[i]],a++,yield Be(e,[],[i,u],s,o,a,4),i=u;else return}}for(let i=(n>>1)-1;i>=0;i--)yield*r(i,n-1);for(let i=n-1;i>0;i--)[e[0],e[i]]=[e[i],e[0]],a++,yield Be(e,[],[0,i],s,o,a,8),s.add(i),yield*r(0,i-1);s.add(0),yield Mt(e,o,a,10)}function*hh(t){const e=[...t],n=e.length,s=new Set;let o=0,a=0;for(let r=Math.floor(n/2);r>0;r=Math.floor(r/2))for(let i=r;i<n;i++){let l=i;for(;l>=r&&(o++,yield Be(e,[l-r,l],[],s,o,a,3),e[l-r]>e[l]);)[e[l-r],e[l]]=[e[l],e[l-r]],a++,yield Be(e,[],[l-r,l],s,o,a,4),l-=r}yield Mt(e,o,a,6)}const mh=1.3;function*gh(t){const e=[...t],n=e.length,s=new Set;let o=0,a=0,r=n,i=!0;for(;r>1||i;){r=Math.floor(r/mh),r<1&&(r=1),i=!1;for(let l=0;l+r<n;l++)o++,yield Be(e,[l,l+r],[],s,o,a,5),e[l]>e[l+r]&&([e[l],e[l+r]]=[e[l+r],e[l]],a++,i=!0,yield Be(e,[],[l,l+r],s,o,a,6))}yield Mt(e,o,a,7)}function*bh(t){const e=[...t],n=e.length,s=new Set,o=0;let a=0;if(n===0){yield Mt(e,o,a,8);return}const r=Math.max(...e),i=new Array(r+1).fill(0);for(let u=0;u<n;u++)yield Be(e,[u],[],s,o,a,2),i[e[u]]++;for(let u=1;u<=r;u++)i[u]+=i[u-1];const l=new Array(n).fill(0);for(let u=n-1;u>=0;u--){const c=e[u],d=--i[c];l[d]=c,a++,yield Be(l,[],[d],s,o,a,7)}yield Mt(l,o,a,8)}const so=10;function*vh(t){let e=[...t];const n=e.length,s=new Set,o=0;let a=0;if(n===0){yield Mt(e,o,a,11);return}const r=Math.max(...e);for(let i=1;Math.floor(r/i)>0;i*=so){const l=d=>Math.floor(d/i)%so,u=new Array(so).fill(0);for(let d=0;d<n;d++)yield Be(e,[d],[],s,o,a,4),u[l(e[d])]++;for(let d=1;d<so;d++)u[d]+=u[d-1];const c=new Array(n).fill(0);for(let d=n-1;d>=0;d--){const p=--u[l(e[d])];c[p]=e[d],a++,yield Be(c,[],[p],s,o,a,9)}e=c}yield Mt(e,o,a,11)}const is={bubble:{name:"Bubble Sort",generator:lh,description:"Repeatedly compares adjacent elements and swaps them if out of order, letting the largest values bubble to the end each pass.",complexity:{best:"O(n)",average:"O(n²)",worst:"O(n²)",space:"O(1)"},stable:!0},selection:{name:"Selection Sort",generator:uh,description:"Scans the unsorted region for the minimum element and swaps it into place, growing a sorted prefix from the front.",complexity:{best:"O(n²)",average:"O(n²)",worst:"O(n²)",space:"O(1)"},stable:!1},insertion:{name:"Insertion Sort",generator:ch,description:"Builds the sorted array one item at a time by shifting each new element left until it sits in the correct spot.",complexity:{best:"O(n)",average:"O(n²)",worst:"O(n²)",space:"O(1)"},stable:!0},merge:{name:"Merge Sort",generator:dh,description:"Divides the array in half recursively, sorts each half, then merges the sorted halves back together. Consistent O(n log n).",complexity:{best:"O(n log n)",average:"O(n log n)",worst:"O(n log n)",space:"O(n)"},stable:!0},quick:{name:"Quick Sort",generator:ph,description:"Partitions the array around a pivot so smaller values sit left and larger right, then recurses into each side. Fast in practice.",complexity:{best:"O(n log n)",average:"O(n log n)",worst:"O(n²)",space:"O(log n)"},stable:!1},heap:{name:"Heap Sort",generator:fh,description:"Builds a max-heap, then repeatedly moves the largest element to the end and re-heapifies the shrinking heap.",complexity:{best:"O(n log n)",average:"O(n log n)",worst:"O(n log n)",space:"O(1)"},stable:!1},shell:{name:"Shell Sort",generator:hh,description:"Generalizes insertion sort by comparing and swapping elements far apart first, shrinking the gap each pass until a final gap-1 pass leaves the array sorted.",complexity:{best:"O(n log n)",average:"O(n^1.5)",worst:"O(n²)",space:"O(1)"},stable:!1},comb:{name:"Comb Sort",generator:gh,description:"Improves bubble sort by comparing elements separated by a shrinking gap (÷1.3 each pass) instead of only adjacent ones, clearing small trailing values much faster.",complexity:{best:"O(n log n)",average:"O(n²/2ᵖ)",worst:"O(n²)",space:"O(1)"},stable:!1},counting:{name:"Counting Sort",generator:bh,description:"Counts how many times each value occurs, turns those counts into placement offsets, and drops every element straight into its final slot — no comparisons needed.",complexity:{best:"O(n + k)",average:"O(n + k)",worst:"O(n + k)",space:"O(n + k)"},stable:!0},radix:{name:"Radix Sort",generator:vh,description:"Sorts integers one decimal digit at a time, least significant first, using a stable counting sort per digit until every digit position has been processed.",complexity:{best:"O(d·(n + b))",average:"O(d·(n + b))",worst:"O(d·(n + b))",space:"O(n + b)"},stable:!0}},qn=(t,e,n,s,o,a,r)=>({array:[...t],low:e,high:n,mid:s,checking:o,target:a,foundIndex:null,comparisons:r,done:!1}),Et=(t,e,n,s)=>({array:[...t],low:null,high:null,mid:null,checking:null,target:e,foundIndex:n,comparisons:s,done:!0});function*yh(t,e){const n=[...t],s=n.length;let o=0;for(let a=0;a<s;a++)if(o++,yield qn(n,0,s-1,null,a,e,o),n[a]===e){yield Et(n,e,a,o);return}yield Et(n,e,null,o)}function*wh(t,e){const n=[...t];let s=0,o=n.length-1,a=0;for(;s<=o;){const r=Math.floor((s+o)/2);if(a++,yield qn(n,s,o,r,r,e,a),n[r]===e){yield Et(n,e,r,a);return}n[r]<e?s=r+1:o=r-1}yield Et(n,e,null,a)}function*xh(t,e){const n=[...t],s=n.length;let o=0;if(s===0){yield Et(n,e,null,o);return}const a=Math.max(1,Math.floor(Math.sqrt(s)));let r=0,i=Math.min(a,s)-1;for(;;){if(o++,yield qn(n,r,i,null,i,e,o),n[i]===e){yield Et(n,e,i,o);return}if(n[i]>e||i===s-1)break;r=i+1,i=Math.min(i+a,s-1)}for(let l=r;l<i;l++)if(o++,yield qn(n,r,i,null,l,e,o),n[l]===e){yield Et(n,e,l,o);return}yield Et(n,e,null,o)}function*kh(t,e){const n=[...t];let s=0,o=n.length-1,a=0;for(;s<=o&&e>=n[s]&&e<=n[o];){let r;if(n[s]===n[o]?r=s:r=s+Math.floor((e-n[s])*(o-s)/(n[o]-n[s])),a++,yield qn(n,s,o,r,r,e,a),n[r]===e){yield Et(n,e,r,a);return}n[r]<e?s=r+1:o=r-1}yield Et(n,e,null,a)}function*Sh(t,e){const n=[...t],s=n.length;let o=0,a=0,r=1;for(;r<s;){if(o++,yield qn(n,a,r,null,r,e,o),n[r]===e){yield Et(n,e,r,o);return}if(n[r]>e)break;a=r,r*=2}let i=Math.min(r,s-1);for(;a<=i;){const l=Math.floor((a+i)/2);if(o++,yield qn(n,a,i,l,l,e,o),n[l]===e){yield Et(n,e,l,o);return}n[l]<e?a=l+1:i=l-1}yield Et(n,e,null,o)}const Jo={linear:{name:"Linear Search",generator:yh,description:"Scans the array from left to right, comparing each element to the target until a match is found or every element has been checked.",complexity:{best:"O(1)",average:"O(n)",worst:"O(n)",space:"O(1)"}},binary:{name:"Binary Search",generator:wh,description:"Repeatedly compares the target to the middle element of a sorted array and discards the half that cannot contain it, halving the search range each step.",complexity:{best:"O(1)",average:"O(log n)",worst:"O(log n)",space:"O(1)"}},jump:{name:"Jump Search",generator:xh,description:"Advances through a sorted array in fixed-size blocks of about √n, testing only the last element of each block, then falls back to a linear scan of the block where the target must lie.",complexity:{best:"O(1)",average:"O(√n)",worst:"O(√n)",space:"O(1)"}},interpolation:{name:"Interpolation Search",generator:kh,description:"Estimates where the target should be by linearly interpolating between the values at the low and high ends of the search range, rather than always probing the midpoint like binary search.",complexity:{best:"O(1)",average:"O(log log n)",worst:"O(n)",space:"O(1)"}},exponential:{name:"Exponential Search",generator:Sh,description:"Doubles a bound (1, 2, 4, 8, ...) until it overshoots the target, then binary searches within the range that doubling identified.",complexity:{best:"O(1)",average:"O(log n)",worst:"O(log n)",space:"O(1)"}}},fs=(t,e,n)=>({visited:[...t],frontier:[...e],current:n,path:[],done:!1}),Ye=(t,e)=>({visited:[...t],frontier:[],current:null,path:[...e],done:!0}),hs=[[-1,0],[1,0],[0,-1],[0,1]],Je=(t,e)=>`${t},${e}`;function ms(t){const e=t.length,n=e>0?t[0].length:0,s=(a,r)=>a>=0&&a<e&&r>=0&&r<n;return{rows:e,cols:n,inBounds:s,isOpen:(a,r)=>s(a,r)&&t[a][r]===0}}function Js(t,e){const n=[e];let s=Je(e.row,e.col);for(;t.has(s);){const o=t.get(s);n.push(o),s=Je(o.row,o.col)}return n.reverse()}function*$h(t,e,n){const{isOpen:s}=ms(t);if(!s(e.row,e.col)||!s(n.row,n.col)){yield Ye([],[]);return}const o=new Map,a=new Set([Je(e.row,e.col)]),r=[],i=[e];for(;i.length>0;){const l=i.shift();if(r.push(l),yield fs(r,i,l),l.row===n.row&&l.col===n.col){yield Ye(r,Js(o,n));return}for(const[u,c]of hs){const d=l.row+u,p=l.col+c;if(!s(d,p))continue;const m=Je(d,p);a.has(m)||(a.add(m),o.set(m,l),i.push({row:d,col:p}))}}yield Ye(r,[])}function*Eh(t,e,n){const{isOpen:s}=ms(t);if(!s(e.row,e.col)||!s(n.row,n.col)){yield Ye([],[]);return}const o=new Map,a=new Set([Je(e.row,e.col)]),r=[],i=[e];for(;i.length>0;){const l=i.pop();if(r.push(l),yield fs(r,i,l),l.row===n.row&&l.col===n.col){yield Ye(r,Js(o,n));return}for(const[u,c]of hs){const d=l.row+u,p=l.col+c;if(!s(d,p))continue;const m=Je(d,p);a.has(m)||(a.add(m),o.set(m,l),i.push({row:d,col:p}))}}yield Ye(r,[])}function*Ch(t,e,n){const{isOpen:s}=ms(t);if(!s(e.row,e.col)||!s(n.row,n.col)){yield Ye([],[]);return}const o=Je(e.row,e.col),a=new Map([[o,0]]),r=new Map,i=new Set,l=new Map([[o,e]]),u=[];for(;l.size>0;){let c=null,d=null,p=1/0;for(const[m,w]of l){const g=a.get(m);g<p&&(p=g,c=m,d=w)}if(l.delete(c),i.add(c),u.push(d),yield fs(u,[...l.values()],d),d.row===n.row&&d.col===n.col){yield Ye(u,Js(r,n));return}for(const[m,w]of hs){const g=d.row+m,v=d.col+w;if(!s(g,v))continue;const b=Je(g,v);if(i.has(b))continue;const y=p+1;y<(a.get(b)??1/0)&&(a.set(b,y),r.set(b,d),l.set(b,{row:g,col:v}))}}yield Ye(u,[])}function _i(t,e,n){return Math.abs(t-n.row)+Math.abs(e-n.col)}function*Ah(t,e,n){const{isOpen:s}=ms(t);if(!s(e.row,e.col)||!s(n.row,n.col)){yield Ye([],[]);return}const o=Je(e.row,e.col),a=new Map([[o,0]]),r=new Map([[o,_i(e.row,e.col,n)]]),i=new Map,l=new Set,u=new Map([[o,e]]),c=[];for(;u.size>0;){let d=null,p=null,m=1/0;for(const[g,v]of u){const b=r.get(g)??1/0;b<m&&(m=b,d=g,p=v)}if(u.delete(d),l.add(d),c.push(p),yield fs(c,[...u.values()],p),p.row===n.row&&p.col===n.col){yield Ye(c,Js(i,n));return}const w=a.get(d);for(const[g,v]of hs){const b=p.row+g,y=p.col+v;if(!s(b,y))continue;const S=Je(b,y);if(l.has(S))continue;const $=w+1;$<(a.get(S)??1/0)&&(a.set(S,$),r.set(S,$+_i(b,y,n)),i.set(S,p),u.set(S,{row:b,col:y}))}}yield Ye(c,[])}function*Th(t,e,n){const{rows:s,cols:o,isOpen:a}=ms(t);if(!a(e.row,e.col)||!a(n.row,n.col)){yield Ye([],[]);return}const r=[];for(let c=0;c<s;c++)for(let d=0;d<o;d++)a(c,d)&&r.push({row:c,col:d});const i=new Map([[Je(e.row,e.col),0]]),l=new Map,u=[e];for(let c=0;c<r.length-1;c++){const d=[];for(const p of r){const m=i.get(Je(p.row,p.col));if(m!==void 0)for(const[w,g]of hs){const v=p.row+w,b=p.col+g;if(!a(v,b))continue;const y=Je(v,b),S=m+1,$=i.get(y);$!==void 0&&S>=$||($===void 0&&u.push({row:v,col:b}),i.set(y,S),l.set(y,p),d.push({row:v,col:b}),yield fs(u,d,{row:v,col:b}))}}if(d.length===0)break}if(!i.has(Je(n.row,n.col))){yield Ye(u,[]);return}yield Ye(u,Js(l,n))}const Oh=600;function*Mh(t,e,n){const{rows:s,cols:o,isOpen:a}=ms(t);if(!a(e.row,e.col)||!a(n.row,n.col)){yield Ye([],[]);return}const r=[],i=new Map;for(let v=0;v<s;v++)for(let b=0;b<o;b++)a(v,b)&&(i.set(Je(v,b),r.length),r.push({row:v,col:b}));const l=r.length;if(l>Oh){yield Ye([],[]);return}const u=new Float64Array(l*l).fill(1/0),c=new Int32Array(l*l).fill(-1);for(let v=0;v<l;v++){u[v*l+v]=0,c[v*l+v]=v;const{row:b,col:y}=r[v];for(const[S,$]of hs){const _=i.get(Je(b+S,y+$));_!==void 0&&(u[v*l+_]=1,c[v*l+_]=_)}}const d=i.get(Je(e.row,e.col)),p=i.get(Je(n.row,n.col)),m=()=>{const v=[];for(let b=0;b<l;b++)u[d*l+b]!==1/0&&v.push(r[b]);return v};for(let v=0;v<l;v++){const b=v*l,y=[];for(let S=0;S<l;S++){const $=S*l,_=u[$+v];if(_!==1/0)for(let N=0;N<l;N++){const G=_+u[b+N];G>=u[$+N]||(u[$+N]=G,c[$+N]=c[$+v],S===d&&y.push(r[N]))}}yield fs(m(),[r[v],...y],r[v])}if(c[d*l+p]===-1){yield Ye(m(),[]);return}const w=[r[d]];let g=d;for(;g!==p;)g=c[g*l+p],w.push(r[g]);yield Ye(m(),w)}const Qo={bfs:{name:"BFS",generator:$h,description:"Explores the grid ring by ring using a FIFO queue. Guarantees the shortest path on this unweighted grid, since every step costs the same.",complexity:{best:"O(rows×cols)",average:"O(rows×cols)",worst:"O(rows×cols)",space:"O(rows×cols)"}},dfs:{name:"DFS",generator:Eh,description:"Dives down one path as far as possible before backtracking. Finds *a* connected path to the goal but does NOT guarantee the shortest one.",complexity:{best:"O(rows×cols)",average:"O(rows×cols)",worst:"O(rows×cols)",space:"O(rows×cols)"}},dijkstra:{name:"Dijkstra",generator:Ch,description:"Settles the unvisited cell with the smallest known distance each round (uniform edge weight of 1). This implementation selects that cell with a plain array scan rather than a binary heap, so it is honestly O((rows×cols)²) worst case, not the idealized heap-backed O(E log V).",complexity:{best:"O((rows×cols)²)",average:"O((rows×cols)²)",worst:"O((rows×cols)²)",space:"O(rows×cols)"}},astar:{name:"A*",generator:Ah,description:"Like Dijkstra, but prioritizes cells by distance-so-far plus a Manhattan-distance estimate to the goal, so it usually expands far fewer cells. Still selects the next cell via a plain array scan, so the worst case remains O((rows×cols)²), same as this Dijkstra implementation — the heuristic helps in practice, not in the asymptotic bound.",complexity:{best:"O(rows×cols)",average:"O((rows×cols)²)",worst:"O((rows×cols)²)",space:"O(rows×cols)"}},bellmanFord:{name:"Bellman-Ford",generator:Th,description:"Sweeps the entire edge list over and over, letting better distances trickle one hop further per pass, until a whole pass changes nothing. It reaches the same answer as Dijkstra far more slowly and with no priority queue at all — watch the frontier collapse and rebuild to see where one pass ends and the next begins. Unlike the four searches above it never stops early at the goal: it has no way to know a distance is final until the sweeps settle, so it always solves for every reachable cell.",complexity:{best:"O(rows×cols)",average:"O((rows+cols)×rows×cols)",worst:"O((rows×cols)²)",space:"O(rows×cols)"}},floydWarshall:{name:"Floyd-Warshall",generator:Mh,description:"The all-pairs algorithm: instead of searching, it fills a full every-cell-to-every-cell distance table by letting each cell in turn act as an intermediate stop. The single amber cell marching through the grid is that pivot; the answer to this particular query is one row of the table, read out at the end. Genuinely cubic — it does roughly 30 million relaxations on this grid to answer a question BFS answers in 375 — and it is here to show that shape, not to compete.",complexity:{best:"O((rows×cols)³)",average:"O((rows×cols)³)",worst:"O((rows×cols)³)",space:"O((rows×cols)²)"}}};function*Rh(t,e){const n=[],s=new Set,o=[];if(!t.has(e)){yield{visited:n,frontier:[],current:null,done:!0};return}for(o.push(e),s.add(e);o.length>0;){const a=o.shift();n.push(a);for(const r of t.get(a)??[])s.has(r)||(s.add(r),o.push(r));yield{visited:[...n],frontier:[...o],current:a,done:!1}}yield{visited:[...n],frontier:[],current:null,done:!0}}function*_h(t,e){const n=[],s=new Set,o=[];if(!t.has(e)){yield{visited:n,frontier:[],current:null,done:!0};return}for(o.push(e);o.length>0;){const a=o.pop();if(s.has(a))continue;s.add(a),n.push(a);const r=t.get(a)??[];for(let i=r.length-1;i>=0;i--){const l=r[i];s.has(l)||o.push(l)}yield{visited:[...n],frontier:[...o],current:a,done:!1}}yield{visited:[...n],frontier:[],current:null,done:!0}}function*Ih(t,e){const n=[],s=new Set;if(!t.has(e)){yield{visited:n,frontier:[],current:null,done:!0};return}const o=[e,...[...t.keys()].filter(a=>a!==e)];for(const a of o){if(s.has(a))continue;const r=[[a,null]];for(;r.length>0;){const[i,l]=r.pop();if(s.has(i))continue;s.add(i),n.push(i);const u=t.get(i)??[];let c=!1;for(let d=u.length-1;d>=0;d--){const p=u[d];if(!c&&p===l){c=!0;continue}if(s.has(p)){yield{visited:[...n],frontier:[],current:p,done:!0};return}r.push([p,i])}yield{visited:[...n],frontier:r.map(([d])=>d),current:i,done:!1}}}yield{visited:[...n],frontier:[],current:null,done:!0}}function*jh(t,e){const n=[],s=new Set,o=new Map;if(!t.has(e)){yield{visited:n,frontier:[],current:null,done:!0};return}const a=[e,...[...t.keys()].filter(r=>r!==e)];for(const r of a){if(s.has(r))continue;const i=[r];for(s.add(r),o.set(r,0);i.length>0;){const l=i.shift();n.push(l);const u=o.get(l),c=u===0?1:0;for(const d of t.get(l)??[])if(!s.has(d))s.add(d),o.set(d,c),i.push(d);else if(o.get(d)===u){yield{visited:[...n],frontier:[...i],current:d,done:!0};return}yield{visited:[...n],frontier:[...i],current:l,done:!1}}}yield{visited:[...n],frontier:[],current:null,done:!0}}const Zo={bfs:{name:"BFS Traversal",generator:Rh,description:"Explores the graph level by level from the start node, visiting every neighbor of the current node before moving deeper, using a queue to track the frontier.",complexity:{time:"O(V + E)",space:"O(V)"}},dfs:{name:"DFS Traversal",generator:_h,description:"Explores as far as possible down one branch from the start node before backtracking, using a stack to track nodes still waiting to be explored.",complexity:{time:"O(V + E)",space:"O(V)"}},"cycle-detection":{name:"Cycle Detection",generator:Ih,description:"Walks the graph depth-first looking for an edge back to an already-visited node other than the one just arrived from — undirected only, and sweeps every component, not just the one the start node reaches, since a cycle elsewhere still counts.",complexity:{time:"O(V + E)",space:"O(V)"}},"bipartite-check":{name:"Bipartite Check",generator:jh,description:"Attempts to 2-colour the graph breadth-first, alternating colour with every hop; finds no valid colouring exists the moment an edge connects two same-coloured nodes. Checks every component, since one component alone being bipartite says nothing about the rest.",complexity:{time:"O(V + E)",space:"O(V)"}}},Hn=1/0,qa=900,Dh=2e3;function _o(t,e){const n=t;if(n.kind!==e.kind)return`This algorithm needs a ${n.kind} input.`;const s=n.validate(e);if(s)return s;const{rows:o,cols:a}=n.dims(e),r=o*a;return r>qa?`That table would be ${o} x ${a} = ${r} cells; the limit is ${qa}.`:null}function Nu(t,e){const n=t,s=e.kind===n.kind?e:n.defaults;return{input:s,recurrence:n.recurrence,axes:n.axes(s),dims:n.dims(s),naiveCalls:n.naiveCalls(s),depsOf:(o,a,r)=>n.depsOf(s,o,a,r),generator:()=>n.generator(s)}}function Tn(t,e){return{table:Array.from({length:t},()=>new Array(e).fill(null)),path:[],cellsFilled:0}}function yt(t,e,n,s){t.table[e][n]===null&&(t.cellsFilled+=1),t.table[e][n]=s}function Ct(t,e){t.path.push({row:e.row,col:e.col})}function Gn(t){return{row:t.row,col:t.col}}function Bu(t){return t.map(e=>[...e])}function Ce(t,e,n,s,o,a){return{table:Bu(t.table),cursor:e,deps:n,chosen:s,explain:o,path:[...t.path],result:null,cellsFilled:t.cellsFilled,done:!1,line:a}}function On(t,e,n,s){return{table:Bu(t.table),cursor:null,deps:[],chosen:null,explain:n,path:[...t.path],result:e,cellsFilled:t.cellsFilled,done:!0,line:s}}function We(t,e,n,s){return{row:e,col:n,label:s,value:t[e][n]}}function wt(t,e){let n=null;for(const s of t)(n===null||(e==="max"?s.score>n.score:s.score<n.score))&&(n=s);return n}function Kn(t){return t===null?"·":t===Hn?"∞":String(t)}function Xe(t){return`dp[${t}]`}function ye(t,e){return`dp[${t}][${e}]`}function gs(t,e){return`${t}(${e.map(n=>n.text).join(", ")})`}function It(t,e,n){return`${t} = ${e} = ${Kn(n)}`}function mn(t,e,n){return`${t} = ${Kn(e)}  (${n})`}const Ka=Number.MAX_SAFE_INTEGER;function lt(t,e){const n=t+e;return n>=Ka?Ka:n}function Fu(t){return t>=Ka}function Ii(t){return Fu(t)?"> 9.0e15":t<1e6?t.toLocaleString():t.toExponential(1)}function Ph(t){if(t<0)return 0;const e=[1,1];for(let n=2;n<=t;n++)e[n]=lt(1,lt(e[n-1],e[n-2]));return e[Math.min(t,e.length-1)]}function Lh(t,e){if(e<0)return 0;const n=new Array(e+1).fill(0);n[0]=1;for(let s=1;s<=e;s++){let o=1;for(const a of t)a>0&&a<=s&&(o=lt(o,n[s-a]));n[s]=o}return n[e]}function Nh(t){const e=t.length,n=new Array(e).fill(1);let s=0;for(let o=0;o<e;o++){let a=1;for(let r=0;r<o;r++)t[r]<t[o]&&(a=lt(a,n[r]));n[o]=a,s=lt(s,a)}return s}function Hu(t,e){if(e<0)return 0;let n=new Array(e+1).fill(1);for(const s of t){const o=new Array(e+1).fill(0);for(let a=0;a<=e;a++){let r=lt(1,n[a]);s>=0&&s<=a&&(r=lt(r,n[a-s])),o[a]=r}n=o}return n[e]}function Bh(t,e){const n=t.length,s=e.length;let o=new Array(s+1).fill(1);for(let a=1;a<=n;a++){const r=new Array(s+1).fill(1);for(let i=1;i<=s;i++)r[i]=t[a-1]===e[i-1]?lt(1,o[i-1]):lt(1,lt(o[i],r[i-1]));o=r}return o[s]}function Fh(t,e){const n=t.length,s=e.length;let o=new Array(s+1).fill(1);for(let a=1;a<=n;a++){const r=new Array(s+1).fill(1);for(let i=1;i<=s;i++)t[a-1]===e[i-1]?r[i]=lt(1,o[i-1]):r[i]=lt(1,lt(o[i-1],lt(o[i],r[i-1])));o=r}return o[s]}function Hh(t){if(t<=0)return 0;const e=Array.from({length:t},()=>new Array(t).fill(1));for(let n=2;n<=t;n++)for(let s=0;s+n-1<t;s++){const o=s+n-1;let a=1;for(let r=s;r<o;r++)a=lt(a,lt(e[s][r],e[r+1][o]));e[s][o]=a}return e[0][t-1]}function Vu(t,e){if(t<2)return[];const n=We(e,0,t-1,"f(k-1)"),s=We(e,0,t-2,"f(k-2)");return[{deps:[n],score:n.value??0,text:`${Xe(t-1)}=${n.value??0}`},{deps:[s],score:s.value??0,text:`${Xe(t-2)}=${s.value??0}`}]}function Vh(t,e,n,s){return Vu(n,s).flatMap(o=>o.deps)}function*Uh(t){const e=t.n,n=Tn(1,e+1);for(let a=0;a<=e;a++){if(a<2){yt(n,0,a,a);const d={row:0,col:a},p=mn(Xe(a),a,"base case");yield Ce(n,d,[],null,p,0);continue}const r=Vu(a,n.table),i=r.flatMap(d=>d.deps),l=r[0].score+r[1].score;yt(n,0,a,l);const u={row:0,col:a},c=It(Xe(a),r.map(d=>d.text).join(" + "),l);yield Ce(n,u,i,null,c,1)}for(let a=e;a>=0;a--){Ct(n,{row:0,col:a});const r=`${Xe(a)} = ${n.table[0][a]} contributed to every later cell`;yield Ce(n,null,[],null,r,2)}const s=n.table[0][e]??0,o=`fib(${e}) = ${s}`;yield On(n,o,`${Xe(e)} = ${s}`,3)}const zh={kind:"scalar",defaults:{kind:"scalar",n:12},recurrence:"dp[k] = dp[k-1] + dp[k-2]",axes:t=>({rowHeaders:["fib(k)"],colHeaders:Array.from({length:t.n+1},(e,n)=>String(n)),rowTitle:"",colTitle:"k"}),dims:t=>({rows:1,cols:t.n+1,fillable:t.n+1}),validate:t=>Number.isInteger(t.n)&&t.n>=0&&t.n<=40?null:"n must be a whole number from 0 to 40.",depsOf:Vh,generator:Uh,naiveCalls:t=>Ph(t.n)};function Ga(t,e,n){if(e===0)return[];const s=[];for(const o of t.coins){if(o>e)continue;const a=We(n,0,e-o,`coin ${o}`),r=a.value??Hn,i=r===Hn?Hn:r+1;s.push({deps:[a],score:i,text:`1+${Xe(e-o)}=${Kn(i)}`})}return s}function qh(t,e,n,s){return Ga(t,n,s).flatMap(o=>o.deps)}function*Kh(t){const{amount:e}=t,n=Tn(1,e+1);yt(n,0,0,0),yield Ce(n,{row:0,col:0},[],null,mn(Xe(0),0,"zero coins make 0"),0);for(let l=1;l<=e;l++){const u=Ga(t,l,n.table),c=u.flatMap(v=>v.deps),d=wt(u,"min"),p=d===null?Hn:d.score;yt(n,0,l,p);const m={row:0,col:l},w=d!==null&&p!==Hn?Gn(d.deps[0]):null,g=u.length===0?mn(Xe(l),p,"no coin is small enough"):It(Xe(l),gs("min",u),p);yield Ce(n,m,c,w,g,2)}const s=[];let o=e;const a=n.table[0][e]!==Hn;if(a){Ct(n,{row:0,col:o});const l=`start at ${Xe(o)} = ${Kn(n.table[0][o])}`;for(yield Ce(n,null,[],null,l,3);o>0;){const u=wt(Ga(t,o,n.table),"min");if(u===null)break;const c=u.deps[0].col,d=o-c;s.push(d),o=c,Ct(n,{row:0,col:o});const p=`take coin ${d} — ${Xe(o+d)} came from ${Xe(o)}`;yield Ce(n,null,[],null,p,3)}}const r=n.table[0][e],i=a?`${s.join(" + ")} = ${e}  (${s.length} coin${s.length===1?"":"s"})`:`no combination of {${t.coins.join(", ")}} makes ${e}`;yield On(n,i,`${Xe(e)} = ${Kn(r)}`,4)}const Gh={kind:"coins",defaults:{kind:"coins",coins:[1,3,4],amount:11},recurrence:"dp[a] = 1 + min(dp[a - c]) over coins c <= a",axes:t=>({rowHeaders:["min coins"],colHeaders:Array.from({length:t.amount+1},(e,n)=>String(n)),rowTitle:"",colTitle:"amount"}),dims:t=>({rows:1,cols:t.amount+1,fillable:t.amount+1}),validate:t=>t.coins.length===0?"Enter at least one coin.":t.coins.some(e=>!Number.isInteger(e)||e<1)?"Coin values must be whole numbers of at least 1.":new Set(t.coins).size!==t.coins.length?"Coin values must be distinct.":!Number.isInteger(t.amount)||t.amount<0?"Amount must be 0 or more.":null,depsOf:qh,generator:Kh,naiveCalls:t=>Lh(t.coins,t.amount)};function Wa(t,e,n){const s=t.values,o=[];for(let a=0;a<e;a++){if(s[a]>=s[e])continue;const r=We(n,0,a,`a[${a}]=${s[a]}`);o.push({deps:[r],score:(r.value??0)+1,text:`${Xe(a)}=${r.value??0}`})}return o}function Wh(t,e,n,s){return Wa(t,n,s).flatMap(o=>o.deps)}function*Yh(t){const e=t.values,n=e.length,s=Tn(1,n);for(let c=0;c<n;c++){const d=Wa(t,c,s.table),p=d.flatMap(v=>v.deps),m=wt(d,"max"),w=m===null?1:m.score;yt(s,0,c,w);const g={row:0,col:c};if(m===null){const v=mn(Xe(c),1,`nothing to the left is smaller than ${e[c]}`);yield Ce(s,g,p,null,v,0)}else{const v=`1 + ${gs("max",d)}`,b=It(Xe(c),v,w);yield Ce(s,g,p,Gn(m.deps[0]),b,2)}}let o=-1;for(let c=0;c<n;c++)(o===-1||(s.table[0][c]??0)>(s.table[0][o]??0))&&(o=c);const a=[];let r=o;for(;r>=0;){a.push(r),Ct(s,{row:0,col:r});const c=`a[${r}]=${e[r]} is in the subsequence (${Xe(r)}=${s.table[0][r]})`;yield Ce(s,null,[],null,c,3);const d=wt(Wa(t,r,s.table),"max");r=d===null?-1:d.deps[0].col}a.reverse();const i=o===-1?0:s.table[0][o]??0,l=a.map(c=>e[c]).join(", "),u=o===-1?"the sequence is empty":`[${l}]  (length ${i})`;yield On(s,u,`longest increasing subsequence has length ${i}`,4)}const Xh={kind:"sequence",defaults:{kind:"sequence",values:[3,10,2,1,20,4,6,21,5]},recurrence:"dp[i] = 1 + max(dp[j]) over j < i with a[j] < a[i]",axes:t=>({rowHeaders:["LIS ending here"],colHeaders:t.values.map(String),rowTitle:"",colTitle:"a[i]"}),dims:t=>({rows:1,cols:t.values.length,fillable:t.values.length}),validate:t=>t.values.length===0?"Enter at least one number.":t.values.length>40?"Enter at most 40 numbers.":null,depsOf:Wh,generator:Yh,naiveCalls:t=>Nh(t.values)};function Ya(t,e,n,s){if(e===0)return[];const o=t.items[e-1],a=We(s,e-1,n,"skip"),r=[{deps:[a],score:a.value??0,text:`${ye(e-1,n)}=${a.value??0}`}];if(o.weight<=n){const i=We(s,e-1,n-o.weight,"take"),l=(i.value??0)+o.value,u=ye(e-1,n-o.weight);r.push({deps:[i],score:l,text:`${o.value}+${u}=${l}`})}return r}function Jh(t,e,n,s){return Ya(t,e,n,s).flatMap(o=>o.deps)}function*Qh(t){const{items:e,capacity:n}=t,s=e.length+1,o=Tn(s,n+1);for(let p=0;p<=n;p++){yt(o,0,p,0);const m={row:0,col:p},w=mn(ye(0,p),0,"no items to choose from");yield Ce(o,m,[],null,w,0)}for(let p=1;p<s;p++)for(let m=0;m<=n;m++){const w=Ya(t,p,m,o.table),g=w.flatMap(_=>_.deps),v=wt(w,"max"),b=v===null?0:v.score;yt(o,p,m,b);const y={row:p,col:m},S=v===null?null:Gn(v.deps[0]),$=It(ye(p,m),gs("max",w),b);yield Ce(o,y,g,S,$,4)}const a=[];let r=s-1,i=n;for(Ct(o,{row:r,col:i}),yield Ce(o,null,[],null,`start at ${ye(r,i)} = ${o.table[r][i]}`,5);r>0;){const p=wt(Ya(t,r,i,o.table),"max");if(p===null)break;const m=p.deps[0],w=m.label==="take";w&&a.push(r);const g=e[r-1],v=w?`take item #${r} (w=${g.weight}, v=${g.value}) — drop to ${ye(m.row,m.col)}`:`skip item #${r} — ${ye(r,i)} equals ${ye(m.row,m.col)}`;r=m.row,i=m.col,Ct(o,{row:r,col:i}),yield Ce(o,null,[],null,v,5)}a.reverse();const l=a.reduce((p,m)=>p+e[m-1].weight,0),u=o.table[s-1][n]??0,c=a.map(p=>`#${p}`).join(", "),d=a.length?`take {${c}} — weight ${l}/${n}, value ${u}`:`take nothing — no item fits in ${n}`;yield On(o,d,`${ye(s-1,n)} = ${u}`,6)}const Zh={kind:"items",defaults:{kind:"items",items:[{weight:2,value:3},{weight:3,value:4},{weight:4,value:5},{weight:5,value:8}],capacity:9},recurrence:"dp[i][c] = max(dp[i-1][c], v_i + dp[i-1][c - w_i])",axes:t=>({rowHeaders:["—",...t.items.map((e,n)=>`#${n+1} w${e.weight} v${e.value}`)],colHeaders:Array.from({length:t.capacity+1},(e,n)=>String(n)),rowTitle:"items",colTitle:"capacity"}),dims:t=>{const e=t.items.length+1,n=t.capacity+1;return{rows:e,cols:n,fillable:e*n}},validate:t=>Uu(t,"capacity"),depsOf:Jh,generator:Qh,naiveCalls:t=>Hu(t.items.map(e=>e.weight),t.capacity)};function Uu(t,e){return t.items.length===0?"Enter at least one item.":t.items.some(n=>!Number.isInteger(n.weight)||n.weight<1)?"Item weights must be whole numbers of at least 1.":t.items.some(n=>!Number.isInteger(n.value)||n.value<0)?"Item values must be whole numbers of 0 or more.":!Number.isInteger(t.capacity)||t.capacity<0?`The ${e} must be 0 or more.`:null}function Xa(t,e,n,s){if(e===0)return[];const o=t.items[e-1],a=We(s,e-1,n,"skip"),r=[{deps:[a],score:a.value??0,text:`${ye(e-1,n)}=${a.value??0}`}];if(o.weight<=n){const i=We(s,e-1,n-o.weight,"take"),l=i.value??0;r.push({deps:[i],score:l,text:`${ye(e-1,n-o.weight)}=${l}`})}return r}function em(t,e,n,s){return Xa(t,e,n,s).flatMap(o=>o.deps)}function*tm(t){const{items:e,capacity:n}=t,s=e.length+1,o=Tn(s,n+1);for(let d=0;d<=n;d++){const p=d===0?1:0;yt(o,0,d,p);const m={row:0,col:d},w=mn(ye(0,d),p,d===0?"the empty set sums to 0":"no items yet");yield Ce(o,m,[],null,w,0)}for(let d=1;d<s;d++)for(let p=0;p<=n;p++){const m=Xa(t,d,p,o.table),w=m.flatMap(_=>_.deps),g=wt(m,"max"),v=g===null?0:g.score;yt(o,d,p,v);const b={row:d,col:p},y=v===1&&g!==null?Gn(g.deps[0]):null,S=m.map(_=>_.text).join(" or "),$=It(ye(d,p),S,v);yield Ce(o,b,w,y,$,4)}const a=o.table[s-1][n]===1,r=[];let i=s-1,l=n;if(a)for(Ct(o,{row:i,col:l}),yield Ce(o,null,[],null,`start at ${ye(i,l)} = 1`,5);i>0;){const d=wt(Xa(t,i,l,o.table),"max");if(d===null||d.score!==1)break;const p=d.deps[0],m=p.label==="take";m&&r.push(i);const w=e[i-1],g=m?`take item #${i} (w=${w.weight}) — drop to ${ye(p.row,p.col)}`:`skip item #${i} — ${ye(p.row,p.col)} is already 1`;i=p.row,l=p.col,Ct(o,{row:i,col:l}),yield Ce(o,null,[],null,g,5)}r.reverse();const u=r.map(d=>e[d-1].weight),c=a?`{${u.join(", ")}} sums to ${n}`:`no subset of {${e.map(d=>d.weight).join(", ")}} sums to ${n}`;yield On(o,c,`${ye(s-1,n)} = ${a?1:0}`,6)}const nm={kind:"items",defaults:{kind:"items",items:[{weight:3,value:0},{weight:34,value:0},{weight:4,value:0},{weight:12,value:0},{weight:5,value:0},{weight:2,value:0}],capacity:9},recurrence:"dp[i][t] = dp[i-1][t] OR dp[i-1][t - w_i]",axes:t=>({rowHeaders:["—",...t.items.map((e,n)=>`#${n+1} w${e.weight}`)],colHeaders:Array.from({length:t.capacity+1},(e,n)=>String(n)),rowTitle:"items",colTitle:"target"}),dims:t=>{const e=t.items.length+1,n=t.capacity+1;return{rows:e,cols:n,fillable:e*n}},validate:t=>Uu(t,"target"),depsOf:em,generator:tm,naiveCalls:t=>Hu(t.items.map(e=>e.weight),t.capacity)};function Ja(t,e,n,s){if(e===0||n===0)return[];if(t.a[e-1]===t.b[n-1]){const r=We(s,e-1,n-1,"match"),i=(r.value??0)+1;return[{deps:[r],score:i,text:`1+${ye(e-1,n-1)}=${i}`}]}const o=We(s,e-1,n,"drop from a"),a=We(s,e,n-1,"drop from b");return[{deps:[o],score:o.value??0,text:`${ye(e-1,n)}=${o.value??0}`},{deps:[a],score:a.value??0,text:`${ye(e,n-1)}=${a.value??0}`}]}function sm(t,e,n,s){return Ja(t,e,n,s).flatMap(o=>o.deps)}function*om(t){const{a:e,b:n}=t,s=e.length+1,o=n.length+1,a=Tn(s,o);for(let p=0;p<s;p++)for(let m=0;m<o;m++){if(p===0||m===0){yt(a,p,m,0);const $={row:p,col:m},_=mn(ye(p,m),0,"one side is empty");yield Ce(a,$,[],null,_,0);continue}const w=Ja(t,p,m,a.table),g=w.flatMap($=>$.deps),v=wt(w,"max"),b=v===null?0:v.score;yt(a,p,m,b);const y={row:p,col:m},S=v===null?null:Gn(v.deps[0]);if(e[p-1]===n[m-1]){const $=It(ye(p,m),w[0].text,b);yield Ce(a,y,g,S,$,2)}else{const $=It(ye(p,m),gs("max",w),b);yield Ce(a,y,g,S,$,3)}}const r=[];let i=s-1,l=o-1;for(Ct(a,{row:i,col:l}),yield Ce(a,null,[],null,`start at ${ye(i,l)} = ${a.table[i][l]}`,4);i>0&&l>0;){const p=wt(Ja(t,i,l,a.table),"max");if(p===null)break;const m=p.deps[0],w=m.label==="match";w&&r.push(e[i-1]);const g=w?`'${e[i-1]}' matches — take it and step diagonally to ${ye(m.row,m.col)}`:`${m.label} — ${ye(i,l)} inherits ${ye(m.row,m.col)}`;i=m.row,l=m.col,Ct(a,{row:i,col:l}),yield Ce(a,null,[],null,g,4)}r.reverse();const u=a.table[s-1][o-1]??0,c=r.join(""),d=u===0?"no common subsequence":`"${c}"  (length ${u})`;yield On(a,d,`${ye(s-1,o-1)} = ${u}`,5)}function zu(t){return t.a.length===0||t.b.length===0?"Both strings need at least one character.":t.a.length>28||t.b.length>28?"Each string may be at most 28 characters.":/\s/.test(t.a)||/\s/.test(t.b)?"Whitespace is not allowed.":null}const am={kind:"strings2",defaults:{kind:"strings2",a:"AGGTAB",b:"GXTXAYB"},recurrence:"dp[i][j] = match ? 1 + dp[i-1][j-1] : max(dp[i-1][j], dp[i][j-1])",axes:t=>({rowHeaders:["ε",...t.a.split("")],colHeaders:["ε",...t.b.split("")],rowTitle:"a",colTitle:"b"}),dims:t=>{const e=t.a.length+1,n=t.b.length+1;return{rows:e,cols:n,fillable:e*n}},validate:zu,depsOf:sm,generator:om,naiveCalls:t=>Bh(t.a,t.b)};function Qa(t,e,n,s){if(e===0&&n===0)return[];if(n===0){const i=We(s,e-1,0,"delete"),l=(i.value??0)+1;return[{deps:[i],score:l,text:`1+${ye(e-1,0)}=${l}`}]}if(e===0){const i=We(s,0,n-1,"insert"),l=(i.value??0)+1;return[{deps:[i],score:l,text:`1+${ye(0,n-1)}=${l}`}]}if(t.a[e-1]===t.b[n-1]){const i=We(s,e-1,n-1,"match"),l=i.value??0;return[{deps:[i],score:l,text:`${ye(e-1,n-1)}=${l}`}]}const o=We(s,e-1,n-1,"substitute"),a=We(s,e-1,n,"delete"),r=We(s,e,n-1,"insert");return[{deps:[o],score:(o.value??0)+1,text:`1+${ye(e-1,n-1)}=${(o.value??0)+1}`},{deps:[a],score:(a.value??0)+1,text:`1+${ye(e-1,n)}=${(a.value??0)+1}`},{deps:[r],score:(r.value??0)+1,text:`1+${ye(e,n-1)}=${(r.value??0)+1}`}]}function rm(t,e,n,s){return Qa(t,e,n,s).flatMap(o=>o.deps)}function im(t,e,n){return t==="match"?`keep '${e}'`:t==="substitute"?`sub '${e}'→'${n}'`:t==="delete"?`del '${e}'`:`ins '${n}'`}function*lm(t){const{a:e,b:n}=t,s=e.length+1,o=n.length+1,a=Tn(s,o);for(let p=0;p<s;p++)for(let m=0;m<o;m++){const w=Qa(t,p,m,a.table),g=w.flatMap($=>$.deps),v=wt(w,"min"),b=v===null?0:v.score;yt(a,p,m,b);const y={row:p,col:m},S=v===null?null:Gn(v.deps[0]);if(p===0&&m===0){const $=mn(ye(0,0),0,"both prefixes are empty");yield Ce(a,y,g,null,$,0)}else if(p===0||m===0){const $=p===0?"insertions":"deletions",_=It(ye(p,m),`${w[0].text}`,b)+`  (${$} only)`;yield Ce(a,y,g,S,_,0)}else if(e[p-1]===n[m-1]){const $=It(ye(p,m),w[0].text,b)+`  ('${e[p-1]}' matches)`;yield Ce(a,y,g,S,$,2)}else{const $=It(ye(p,m),gs("min",w),b);yield Ce(a,y,g,S,$,3)}}const r=[];let i=s-1,l=o-1;for(Ct(a,{row:i,col:l}),yield Ce(a,null,[],null,`start at ${ye(i,l)} = ${a.table[i][l]}`,4);i>0||l>0;){const p=wt(Qa(t,i,l,a.table),"min");if(p===null)break;const m=p.deps[0],w=i>0?e[i-1]:"",g=l>0?n[l-1]:"",v=im(m.label,w,g);r.push(v),i=m.row,l=m.col,Ct(a,{row:i,col:l}),yield Ce(a,null,[],null,`${v} — step to ${ye(i,l)}`,4)}r.reverse();const u=a.table[s-1][o-1]??0,c=r.filter(p=>!p.startsWith("keep")),d=u===0?"already identical — 0 edits":`${c.join(", ")}  (${u} edits)`;yield On(a,d,`${ye(s-1,o-1)} = ${u}`,5)}const um={kind:"strings2",defaults:{kind:"strings2",a:"kitten",b:"sitting"},recurrence:"dp[i][j] = match ? dp[i-1][j-1] : 1 + min(sub, del, ins)",axes:t=>({rowHeaders:["ε",...t.a.split("")],colHeaders:["ε",...t.b.split("")],rowTitle:"a",colTitle:"b"}),dims:t=>{const e=t.a.length+1,n=t.b.length+1;return{rows:e,cols:n,fillable:e*n}},validate:zu,depsOf:rm,generator:lm,naiveCalls:t=>Fh(t.a,t.b)};function Cr(t,e,n,s){if(e>=n)return[];const o=t.dims,a=[];for(let r=e;r<n;r++){const i=We(s,e,r,`split at k=${r}`),l=We(s,r+1,n,`split at k=${r}`),u=o[e]*o[r+1]*o[n+1],c=(i.value??0)+(l.value??0)+u;a.push({deps:[i,l],score:c,text:`k=${r}:${c}`})}return a}function cm(t,e,n,s){return Cr(t,e,n,s).flatMap(o=>o.deps)}function*Za(t,e,n,s){if(Ct(e,{row:n,col:s}),n===s){const u=`A${n+1}`;return yield Ce(e,null,[],null,`${u} on its own costs nothing`,4),u}const o=wt(Cr(t,n,s,e.table),"min");if(o===null)return`A${n+1}..A${s+1}`;const a=o.deps[0].col,r=`split A${n+1}..A${s+1} after A${a+1} — cost ${o.score}`;yield Ce(e,null,[],null,r,4);const i=yield*Za(t,e,n,a),l=yield*Za(t,e,a+1,s);return`(${i}${l})`}function*dm(t){const n=t.dims.length-1,s=Tn(n,n);for(let i=0;i<n;i++){yt(s,i,i,0);const l={row:i,col:i},u=mn(ye(i,i),0,`A${i+1} alone needs no multiplication`);yield Ce(s,l,[],null,u,0)}for(let i=2;i<=n;i++)for(let l=0;l+i-1<n;l++){const u=l+i-1,c=Cr(t,l,u,s.table),d=c.flatMap(b=>b.deps),p=wt(c,"min"),m=p===null?0:p.score;yt(s,l,u,m);const w={row:l,col:u},g=p===null?null:Gn(p.deps[0]),v=It(ye(l,u),gs("min",c),m);yield Ce(s,w,d,g,v,2)}const o=yield*Za(t,s,0,n-1),a=s.table[0][n-1]??0,r=`${o} — ${a.toLocaleString()} scalar multiplications`;yield On(s,r,`${ye(0,n-1)} = ${a}`,5)}const pm={kind:"chain",defaults:{kind:"chain",dims:[40,20,30,10,30]},recurrence:"dp[i][j] = min over k of dp[i][k] + dp[k+1][j] + d[i]*d[k+1]*d[j+1]",axes:t=>{const e=Math.max(0,t.dims.length-1),n=Array.from({length:e},(s,o)=>`A${o+1}`);return{rowHeaders:n,colHeaders:n,rowTitle:"i",colTitle:"j"}},dims:t=>{const e=Math.max(0,t.dims.length-1);return{rows:e,cols:e,fillable:e*(e+1)/2}},validate:t=>t.dims.length<2?"Enter at least two dimensions (one matrix).":t.dims.some(e=>!Number.isInteger(e)||e<1)?"Dimensions must be whole numbers of at least 1.":t.dims.length>31?"Enter at most 31 dimensions (30 matrices).":null,depsOf:cm,generator:dm,naiveCalls:t=>Hh(Math.max(0,t.dims.length-1))},Kt={fib:{...zh,name:"Fibonacci",description:"Fills one row left to right, each cell the sum of the two before it. The smallest example of the whole idea: 40 cells replace 331 million recursive calls.",complexity:{time:"O(n)",space:"O(n)"}},"coin-change":{...Gh,name:"Coin Change",description:"Fewest coins that make each amount from 0 upwards, each cell taking the best of one more coin on top of a smaller amount. Amounts no combination can reach stay at infinity.",complexity:{time:"O(amount × coins)",space:"O(amount)"}},lis:{...Xh,name:"Longest Increasing Subsequence",description:"Each cell holds the longest increasing run ending at that element, extending the best smaller element to its left. The answer is the largest cell, not the last one.",complexity:{time:"O(n²)",space:"O(n)"}},knapsack:{...Zh,name:"0/1 Knapsack",description:"One row per item, one column per capacity. Each cell chooses between skipping the item and taking it, and the traceback reads those choices straight back out of the table.",complexity:{time:"O(n × capacity)",space:"O(n × capacity)"}},"subset-sum":{...nm,name:"Subset Sum",description:"Knapsack’s table answering a yes/no question instead: can any subset hit the target exactly? Same shape, same traversal, OR in place of max.",complexity:{time:"O(n × target)",space:"O(n × target)"}},lcs:{...am,name:"Longest Common Subsequence",description:"A grid of two strings. Matching characters extend the diagonal by one; mismatches take the better of dropping a character from either side.",complexity:{time:"O(m × n)",space:"O(m × n)"}},"edit-distance":{...um,name:"Edit Distance",description:"Fewest insert/delete/substitute operations turning one string into the other. Same grid as LCS, but a mismatch forks three ways instead of two.",complexity:{time:"O(m × n)",space:"O(m × n)"}},"matrix-chain":{...pm,name:"Matrix Chain",description:"Where to put the parentheses so a chain of matrix products costs the least. Fills along diagonals rather than row by row, because a cell needs every shorter sub-chain first.",complexity:{time:"O(n³)",space:"O(n²)"}}};class Ar{constructor(e){Zt(this,"n");Zt(this,"parents");Zt(this,"ranks");Zt(this,"sizes");Zt(this,"findCount",0);Zt(this,"unionCount",0);Zt(this,"compressionCount",0);Zt(this,"componentCount");this.n=Math.max(0,Math.floor(e)),this.parents=Array.from({length:this.n},(n,s)=>s),this.ranks=new Array(this.n).fill(0),this.sizes=new Array(this.n).fill(1),this.componentCount=this.n}get components(){return this.componentCount}get finds(){return this.findCount}get unions(){return this.unionCount}get compressions(){return this.compressionCount}isRoot(e){return this.parents[e]===e}rankOf(e){return this.ranks[e]}sizeOf(e){return this.sizes[e]}pathTo(e){const n=[e];let s=e;for(;this.parents[s]!==s;)s=this.parents[s],n.push(s);return n}completeFind(e){if(this.findCount+=1,e.length===0)return[];const n=e[e.length-1],s=[];for(const o of e)o!==n&&this.parents[o]!==n&&(this.parents[o]=n,s.push(o));return this.compressionCount+=s.length,s}find(e){const n=this.pathTo(e);return this.completeFind(n),n[n.length-1]}rootOf(e){let n=e;for(;this.parents[n]!==n;)n=this.parents[n];return n}link(e,n){if(e===n)return!1;let s=e,o=n;return this.ranks[s]<this.ranks[o]&&([s,o]=[o,s]),this.parents[o]=s,this.sizes[s]+=this.sizes[o],this.ranks[s]===this.ranks[o]&&(this.ranks[s]+=1),this.unionCount+=1,this.componentCount-=1,!0}union(e,n){return this.link(this.find(e),this.find(n))}connected(e,n){return this.find(e)===this.find(n)}isConnected(e,n){return this.rootOf(e)===this.rootOf(n)}maxDepth(){const e=new Array(this.n).fill(-1);let n=0;for(let s=0;s<this.n;s++){const o=[];let a=s;for(;e[a]===-1&&this.parents[a]!==a;)o.push(a),a=this.parents[a];e[a]===-1&&(e[a]=0);let r=e[a];for(;o.length>0;)r+=1,e[o.pop()]=r;r>n&&(n=r)}return n}snapshot(e=[],n=[]){return{parent:[...this.parents],rank:[...this.ranks],setSize:[...this.sizes],findPath:[...e],compressed:[...n],finds:this.findCount,unions:this.unionCount,compressions:this.compressionCount,maxDepth:this.maxDepth()}}}const fm=1;function Io(t){return t.weight??fm}function er(t,e){const n=Io(t)-Io(e);return n!==0?n:t.id.localeCompare(e.id)}function qu(t){return new Map(t.map((e,n)=>[e.id,n]))}function Ku(t){return t.map(e=>e.label)}function hm(t,e,n){return t===n?e:t}const Ne=Object.freeze([]),sn=(t,e,n,s,o,a,r)=>({kind:"dsu",forest:t.snapshot(o,a),op:e,active:n,explain:s,done:!1,line:r}),mm=(t,e,n)=>({kind:"dsu",forest:t.snapshot(),op:null,active:null,explain:e,done:!0,line:n});function Gu(t){return{dsu:t,considering:null,acceptedEdges:[],rejectedEdges:[],queue:[],totalWeight:0}}const At=(t,e,n,s)=>({kind:"mst",forest:t.dsu.snapshot(n),consideringEdge:t.considering,acceptedEdges:[...t.acceptedEdges],rejectedEdges:[...t.rejectedEdges],queue:[...t.queue],totalWeight:t.totalWeight,components:t.dsu.components,explain:e,done:!1,line:s}),tr=(t,e,n)=>({kind:"mst",forest:t.dsu.snapshot(),consideringEdge:null,acceptedEdges:[...t.acceptedEdges],rejectedEdges:[...t.rejectedEdges],queue:[],totalWeight:t.totalWeight,components:t.dsu.components,explain:e,done:!0,line:n});function nr(t,e,n){const s=t.acceptedEdges.length,o=t.dsu.components,a=t.totalWeight;return e===0?`${n} finished: the graph has no nodes.`:o===1?`${n} finished: spanning tree with ${s} edges (V - 1 = ${e-1}), total weight ${a}.`:`${n} finished: the graph is disconnected, so this is a spanning forest — ${o} components, ${s} edges (V - components = ${e} - ${o}), total weight ${a}. No spanning tree exists.`}function Wu(t,e,n){return`${t[e]??e} — ${t[n]??n}`}function*gm(t,e){const n=Math.max(0,Math.floor(t)),s=new Ar(n),o=p=>p!==void 0&&p>=0&&p<n,a=e.filter(p=>p.kind==="union"?o(p.a)&&o(p.b):o(p.a)),r=e.length-a.length,i=r>0?` (${r} operation(s) skipped: node out of range)`:"",l=`${n} singleton sets — every node is its own parent, every rank 0${i}.`;yield sn(s,null,null,l,Ne,Ne,0);function*u(p,m){const w=s.pathTo(m),g=`find(${m}): walking up from ${m} to its root.`;yield sn(s,p,m,g,[m],Ne,1);for(let S=1;S<w.length;S++){const $=w[S],_=w.slice(0,S+1),G=S===w.length-1?`${$} is its own parent — that is the root of ${m}'s set.`:`parent[${w[S-1]}] = ${$}, still not a root — keep walking.`;yield sn(s,p,$,G,_,Ne,2)}const v=w[w.length-1],b=s.completeFind(w),y=b.length===0?`Nothing to compress: ${m} already pointed straight at root ${v}.`:`Path compression: ${b.join(", ")} now point straight at root ${v}.`;return yield sn(s,p,v,y,w,b,3),v}for(const p of a){if(p.kind==="find"){yield*u(p,p.a);continue}const m=p.a,w=p.b,g=`union(${m}, ${w}): find both roots first.`;yield sn(s,p,m,g,Ne,Ne,4);const v=yield*u(p,m),b=yield*u(p,w),y=`Roots are ${v} and ${b}.`;if(yield sn(s,p,b,y,Ne,Ne,5),v===b){const L=`${m} and ${w} are already in the same set — union does nothing.`;yield sn(s,p,v,L,Ne,Ne,6);continue}const S=s.rankOf(v),$=s.rankOf(b),_=S===$;s.link(v,b);const N=S>=$?v:b,j=`rank[${v}]=${S}, rank[${b}]=${$} — hang ${N===v?b:v} under ${N}.`;if(yield sn(s,p,N,j,Ne,Ne,7),_){const L=`Ranks were equal, so rank[${N}] goes up to ${S+1}.`;yield sn(s,p,N,L,Ne,Ne,8)}}const d=`Script finished: ${s.components===1?"1 set":`${s.components} sets`} remain, deepest tree is ${s.maxDepth()} level(s).`;yield mm(s,d,9)}function*bm(t){const e=t.nodes,n=e.length,s=qu(e),o=Ku(e),a=new Ar(n),r=Gu(a),i=[...t.edges].sort(er);r.queue=i.map(c=>c.id);const l=`Sorted ${i.length} edges by weight, lightest first.`;yield At(r,l,Ne,0);const u=`${n} singleton components — no node is connected to any other yet.`;yield At(r,u,Ne,1);for(let c=0;c<i.length;c++){const d=i[c],p=s.get(d.from),m=s.get(d.to);if(p===void 0||m===void 0)continue;const w=Io(d);r.considering=d.id,r.queue=i.slice(c+1).map(S=>S.id);const g=[...a.pathTo(p),...a.pathTo(m)],v=`Considering ${Wu(o,p,m)} (weight ${w}) — same set?`;yield At(r,v,g,2);const b=a.find(p),y=a.find(m);if(b===y){r.rejectedEdges.push(d.id);const S=`Both ends are in set ${b} already — this edge would close a cycle. Reject.`;yield At(r,S,g,3)}else{a.link(b,y),r.acceptedEdges.push(d.id),r.totalWeight+=w;const S=`Sets ${b} and ${y} were separate — accept, and merge them. Total ${r.totalWeight}.`;yield At(r,S,g,4)}if(r.acceptedEdges.length===n-1){r.considering=null,r.queue=[];const S=`${n-1} edges accepted — every node is connected, so the rest cannot help.`;yield At(r,S,Ne,5);break}}r.considering=null,r.queue=[],yield tr(r,nr(r,n,"Kruskal"),6)}function*vm(t,e){const n=t.nodes,s=n.length,o=qu(n),a=Ku(n),r=new Ar(s),i=Gu(r);if(s===0){yield tr(i,nr(i,s,"Prim"),6);return}const l=Array.from({length:s},()=>[]),u=new Map;for(const b of t.edges){const y=o.get(b.from),S=o.get(b.to);y===void 0||S===void 0||y===S||(l[y].push(b),l[S].push(b),u.set(b.id,[y,S]))}const c=new Array(s).fill(!1),d=[];function p(b){c[b]=!0;for(const y of l[b]){const[S,$]=u.get(y.id);c[hm(S,$,b)]||d.push(y)}}function m(){return[...d].sort(er).map(b=>b.id)}const w=e!==void 0&&o.has(e)?o.get(e):0;p(w),i.queue=m();const g=`Starting from ${a[w]??w}; the tree is that node alone.`;yield At(i,g,Ne,0);const v=`${d.length} edge(s) leave the tree — these are the candidates.`;for(yield At(i,v,Ne,1);;){if(d.length===0){const L=c.indexOf(!1);if(L===-1)break;i.considering=null;const I=`No candidate crosses the cut, but ${a[L]??L} is still unreached — that component is done. Restarting there.`;yield At(i,I,Ne,5),p(L),i.queue=m();continue}let b=0;for(let L=1;L<d.length;L++)er(d[L],d[b])<0&&(b=L);const y=d[b];d.splice(b,1);const[S,$]=u.get(y.id),_=Io(y);i.considering=y.id,i.queue=m();const N=`Lightest candidate is ${Wu(a,S,$)} (weight ${_}).`;yield At(i,N,Ne,2);const G=c[S]?$:S;if(c[S]&&c[$]){i.rejectedEdges.push(y.id),yield At(i,"Both ends joined the tree by other routes — it no longer crosses the cut, so taking it would close a cycle. Reject.",Ne,3);continue}r.link(r.find(S),r.find($)),i.acceptedEdges.push(y.id),i.totalWeight+=_,p(G),i.queue=m();const j=`Accept: ${a[G]??G} joins the tree and offers its own edges. Total ${i.totalWeight}.`;yield At(i,j,Ne,4)}i.considering=null,i.queue=[],yield tr(i,nr(i,s,"Prim"),6)}const ea={dsu:{name:"Union-Find",mode:"dsu",generator:gm,description:"The disjoint-set forest on its own: compose a script of union and find operations and watch the trees merge. Each find walks to its root and then re-hangs the whole walk onto it — path compression — while union always hangs the shallower tree under the deeper, which is what keeps the forest from degenerating into a linked list.",complexity:{time:"O(α(n)) amortized per op",space:"O(n)"}},kruskal:{name:"Kruskal's MST",mode:"mst",generator:bm,description:'Sorts every edge by weight and walks that list once, accepting an edge whenever its endpoints are still in different components and rejecting it when they are not. The "still different?" question is answered by the disjoint set, which is the only reason the greedy rule is affordable.',complexity:{time:"O(E log E)",space:"O(V + E)"}},prim:{name:"Prim's MST",mode:"mst",generator:vm,description:"Grows a single tree from a root, repeatedly taking the cheapest edge that crosses from the tree to a node outside it. Reaches the same total weight as Kruskal on any connected graph, by a completely different route — one growing tree instead of many merging ones.",complexity:{time:"O(V · E)",space:"O(V + E)"}}},ym=2654435761;function wm(t){let e=5381;for(let n=0;n<t.length;n++)e=(Math.imul(e,33)^t.charCodeAt(n))>>>0;return e>>>0}function xm(t){let e=0;for(let n=0;n<t.length;n++)e=Math.imul(e,31)+t.charCodeAt(n)|0;return Math.imul(e,ym)>>>8}function km(t){let e=0;for(let n=0;n<t.length;n++)e+=t.charCodeAt(n);return e}function Sm(t){return t.length===0?0:t.charCodeAt(0)}const Vn={djb2:{name:"djb2",description:"Classic string hash — mixes every character, spreads keys evenly.",hash:wm},knuth:{name:"Knuth",description:"Multiplicative hash against 2^32/φ; well-spread, cheap to compute.",hash:xm},mod:{name:"Sum + mod",description:"Adds the character codes. Simple, but every anagram collides.",hash:km},weak:{name:"Weak (first char)",description:"First character only. Awful on purpose — collisions on demand.",hash:Sm}},Yu="djb2",wa=4;function ta(t){const e=Math.max(wa,Math.floor(t)||wa);let n=wa;for(;n<e;)n*=2;return n}function $m(t,e){return(Math.imul(t^t>>>15,739982445)>>>0)%e|1}function Tr(t,e){return t%e}const Em=.25,Cm=.9,Am=4096;function Xu(t,e){const n=Math.max(Em,e);return t==="chaining"?n:Math.min(Cm,n)}function Tm(){return{entries:[],state:"empty"}}function Ju(t){const e=t.strategy,n=t.hashFnKey,s=ta(t.capacity),o=Xu(e,t.threshold),a=Vn[n].hash,r=t.counters??{probes:0,collisions:0,resizes:0},i=t.arrivals??{next:1},l=Array.from({length:s},Tm),u=e==="chaining";let c=0,d=0;function p(z){return Tr(z,s)}function m(z){return e==="double"?$m(z,s):1}function w(z,ae){switch(e){case"quadratic":return z*(z+1)/2;case"double":return z*ae;case"linear":return z;default:return 0}}function g(z,ae){const P=p(z);return u?{index:P,chainPos:ae}:{index:(P+w(ae,m(z)))%s,chainPos:0}}function v(z){return u?l[z].entries.length+1:s}function b(z){return l[z.index].entries[z.chainPos]??null}function y(z,ae){const P=l[z.index];if(u){const J=P.entries[z.chainPos];return J?J.key===ae?"match":"occupied":"free"}return P.state==="empty"?"free":P.state==="tombstone"?"tombstone":P.entries[0].key===ae?"match":"occupied"}function S(z,ae){const P={key:ae,value:i.next++},J=l[z.index];return u?(J.entries.push(P),J.state="occupied"):(J.state==="tombstone"&&(d-=1),J.entries=[P],J.state="occupied"),c+=1,P}function $(z){const ae=l[z.index].entries[z.chainPos];return ae.value=i.next++,ae}function _(z){const ae=l[z.index];u?(ae.entries.splice(z.chainPos,1),ae.entries.length===0&&(ae.state="empty")):(ae.entries=[],ae.state="tombstone",d+=1),c-=1}function N(){const z=[];for(const ae of l)z.push(...ae.entries);return z}function G(){return l.map(z=>({entries:z.entries.map(ae=>({...ae})),state:z.state}))}function j(){return c+d}function L(){return j()/s>o}function I(){return s*2<=Am}function he(){return r.resizes+=1,Ju({strategy:e,hashFnKey:n,capacity:s*2,threshold:o,counters:r,arrivals:i})}function Se(z){const ae=a(z.key),P=p(ae),J=m(ae),le=v(P);for(let K=0;K<le;K++){const re=u?{index:P,chainPos:l[P].entries.length}:{index:(P+w(K,J))%s};if(r.probes+=1,u||l[re.index].state==="empty")return l[re.index].entries=u?[...l[re.index].entries,z]:[z],l[re.index].state="occupied",c+=1,{hash:ae,home:P,index:re.index,probes:K+1}}return{hash:ae,home:P,index:-1,probes:le}}return{strategy:e,hashFnKey:n,capacity:s,threshold:o,counters:r,size:()=>c,tombstones:()=>d,fill:j,loadFactor:()=>c/s,hash:a,home:p,stride:m,offset:w,cursor:g,maxProbes:v,classify:y,entryAt:b,stateAt:z=>l[z].state,chainLength:z=>l[z].entries.length,place:S,overwrite:$,remove:_,entries:N,snapshot:G,overThreshold:L,canGrow:I,growEmpty:he,insertDirect:Se}}function ji(){return{op:null,key:null,hash:null,homeIndex:null,probeIndex:null,probeSeq:[],phase:"idle",explain:null}}const ut=(t,e,n)=>({buckets:t.snapshot(),capacity:t.capacity,size:t.size(),loadFactor:t.loadFactor(),op:e.op,key:e.key,hash:e.hash,homeIndex:e.homeIndex,probeIndex:e.probeIndex,probeSeq:[...e.probeSeq],probes:t.counters.probes,collisions:t.counters.collisions,resizes:t.counters.resizes,phase:e.phase,explain:e.explain,done:!1,line:n}),Om=(t,e,n)=>({...ut(t,e,n),done:!0});function Mm(t,e,n,s){return`h("${t}") = ${e} → ${e} mod ${n} = ${s}`}function Ln(t,e){return`${t} ${e}${t===1?"":"s"}`}function Or(t,e,n,s,o,a){const r=n+1;if(t.strategy==="chaining")return a?`probe ${r}: bucket ${e}, end of chain`:`probe ${r}: bucket ${e}, link ${r}`;if(n===0)return`probe 1: slot ${e} (home)`;const i=t.capacity;if(t.strategy==="double")return`probe ${r}: (${e} + ${n}×${s}) mod ${i} = ${o}`;const l=t.offset(n,s);return t.strategy==="quadratic"?`probe ${r}: (${e} + ${l}) mod ${i} = ${o}  [k(k+1)/2, k=${n}]`:`probe ${r}: (${e} + ${l}) mod ${i} = ${o}`}function*Rm(t,e,n,s,o,a){var l;let r=null;const i=t.maxProbes(o);for(let u=0;u<i;u++){const c=t.cursor(s,u),d=t.classify(c,n),p=Or(t,o,u,a,c.index,d==="free");if(t.counters.probes+=1,e.probeSeq.push(c.index),e.probeIndex=c.index,d==="match"){const g=t.overwrite(c);e.phase="updated",e.explain=`${p} — "${n}" is already here → overwrite (now #${g.value})`,yield ut(t,e,3);break}if(d==="occupied"){t.counters.collisions+=1;const g=((l=t.entryAt(c))==null?void 0:l.key)??"?";e.phase="probing",e.explain=`${p} — taken by "${g}" → collision, keep walking`,yield ut(t,e,5);continue}if(d==="tombstone"){r===null&&(r=c),e.phase="probing",e.explain=`${p} — tombstone; remember it, but keep looking for "${n}"`,yield ut(t,e,2);continue}const m=r??c,w=t.place(m,n);e.probeIndex=m.index,e.phase="inserted",e.explain=_m(t,p,n,w.value,m,r!==null),yield ut(t,e,4);break}return t.overThreshold()&&t.canGrow()?yield*Pm(t,e):t}function _m(t,e,n,s,o,a){if(t.strategy==="chaining"){const r=Ln(t.chainLength(o.index),"link");return`${e} → append "${n}" (#${s}); the chain is now ${r}`}return a?`${e} — free, but slot ${o.index} was a tombstone → reuse it for "${n}"`:`${e} — empty → insert "${n}" (#${s})`}function*Im(t,e,n,s,o,a){var i;const r=t.maxProbes(o);for(let l=0;l<r;l++){const u=t.cursor(s,l),c=t.classify(u,n),d=Or(t,o,l,a,u.index,c==="free");if(t.counters.probes+=1,e.probeSeq.push(u.index),e.probeIndex=u.index,c==="match"){const p=t.entryAt(u);e.phase="found",e.explain=`${d} — found "${n}" (inserted #${p==null?void 0:p.value})`,yield ut(t,e,8);return}if(c==="free"){e.phase="not-found",e.explain=`${d} — ${Qu(t)} → "${n}" is not in the table`,yield ut(t,e,9);return}e.phase="probing",e.explain=c==="tombstone"?`${d} — tombstone; a deleted slot never ends a search → keep walking`:`${d} — holds "${(i=t.entryAt(u))==null?void 0:i.key}", not "${n}" → keep walking`,yield ut(t,e,7)}e.phase="not-found",e.explain=`walked all ${r} probes without finding "${n}"`,yield ut(t,e,9)}function*jm(t,e,n,s,o,a){const r=t.maxProbes(o);for(let i=0;i<r;i++){const l=t.cursor(s,i),u=t.classify(l,n),c=Or(t,o,i,a,l.index,u==="free");if(t.counters.probes+=1,e.probeSeq.push(l.index),e.probeIndex=l.index,u==="match"){t.remove(l),e.phase="deleted",e.explain=Dm(t,c,n,l.index),yield ut(t,e,11);return}if(u==="free"){e.phase="not-found",e.explain=`${c} — ${Qu(t)} → nothing to delete`,yield ut(t,e,9);return}e.phase="probing",e.explain=`${c} — not "${n}" → keep walking`,yield ut(t,e,10)}e.phase="not-found",e.explain=`walked all ${r} probes without finding "${n}"`,yield ut(t,e,9)}function Qu(t){return t.strategy==="chaining"?"chain ends here":"slot is EMPTY"}function Dm(t,e,n,s){if(t.strategy==="chaining"){const o=Ln(t.chainLength(s),"link");return`${e} — unlink "${n}"; bucket ${s}'s chain is now ${o}`}return`${e} — remove "${n}" and leave a TOMBSTONE, so probes still walk past slot ${s}`}function*Pm(t,e){const n=t.entries(),s=t.fill(),o=(s/t.capacity).toFixed(2),a=t.threshold.toFixed(2),r=t.strategy==="chaining"?`load factor ${s}/${t.capacity} = ${o}`:`slots used ${s}/${t.capacity} = ${o} (${t.size()} keys${t.tombstones()>0?` + ${t.tombstones()} tombstones`:""})`;e.phase="resizing",e.probeIndex=null,e.probeSeq=[],e.explain=`${r} > ${a} → grow to ${t.capacity*2} slots and rehash ${Ln(n.length,"key")}`,yield ut(t,e,6);const i=t.growEmpty();for(const l of n){const u=i.insertDirect(l);e.key=l.key,e.hash=u.hash,e.homeIndex=u.home,e.probeIndex=u.index,e.probeSeq=[u.index],e.phase="rehashed",e.explain=`rehash "${l.key}": ${u.hash} mod ${i.capacity} = ${u.home}`+(u.index===u.home?` → slot ${u.index}`:` → slot ${u.home} taken, landed in ${u.index}`),yield ut(i,e,6)}return i}function*Lm(t,e,n){let s=Ju({strategy:n,...e});const o=ji();for(const u of t){const c=s.hash(u.key),d=s.home(c),p=s.stride(c);o.op=u.kind,o.key=u.key,o.hash=c,o.homeIndex=d,o.probeIndex=d,o.probeSeq=[],o.phase="hashing",o.explain=Mm(u.key,c,s.capacity,d),yield ut(s,o,1),u.kind==="insert"?s=yield*Rm(s,o,u.key,c,d,p):u.kind==="search"?yield*Im(s,o,u.key,c,d,p):yield*jm(s,o,u.key,c,d,p)}const{probes:a,collisions:r,resizes:i}=s.counters,l=ji();l.explain=`script complete — ${Ln(t.length,"operation")}, ${Ln(a,"probe")}, ${Ln(r,"collision")}, ${Ln(i,"resize")}`,yield Om(s,l,12)}function oo(t){return(e,n)=>Lm(e,n,t)}const na={chaining:{name:"Separate Chaining",generator:oo("chaining"),description:"Every bucket holds a list. Colliding keys are appended to the list at their home bucket, so a lookup hashes once and then walks a chain whose length is the load factor on average.",complexity:{best:"O(1)",average:"O(1 + α)",worst:"O(n)",space:"O(n + m)"}},linear:{name:"Linear Probing",generator:oo("linear"),description:"On a collision, try the very next slot, and the next. Cache-friendly and trivial to implement, but colliding keys pile into contiguous runs — primary clustering — and each run makes itself more likely to grow.",complexity:{best:"O(1)",average:"O(1 / (1 - α))",worst:"O(n)",space:"O(m)"}},quadratic:{name:"Quadratic Probing",generator:oo("quadratic"),description:"Jump k(k+1)/2 slots away on the k-th probe, so colliding keys scatter instead of forming runs. Two keys sharing a home slot still share the entire jump sequence, which is secondary clustering.",complexity:{best:"O(1)",average:"O(1 / (1 - α))",worst:"O(n)",space:"O(m)"}},double:{name:"Double Hashing",generator:oo("double"),description:"A second hash of the key decides the stride, so two keys that collide at their home slot almost never collide again. The closest of the three to the uniform-hashing ideal, at the cost of a second hash per key.",complexity:{best:"O(1)",average:"O(1 / (1 - α))",worst:"O(n)",space:"O(m)"}}},Zu="chaining",Nm={key:"racy-counter",name:"Racy counter",description:"Two threads each run counter = counter + 1, one machine step at a time.",bug:"If both threads read before either writes, both compute the same value and one increment is lost.",threads:[{name:"T0",instructions:[{label:"local = counter",exec:(t,e)=>{t.threads[e].locals.local=t.shared.counter}},{label:"local = local + 1",exec:(t,e)=>{t.threads[e].locals.local+=1}},{label:"counter = local",exec:(t,e)=>{t.shared.counter=t.threads[e].locals.local}}]},{name:"T1",instructions:[{label:"local = counter",exec:(t,e)=>{t.threads[e].locals.local=t.shared.counter}},{label:"local = local + 1",exec:(t,e)=>{t.threads[e].locals.local+=1}},{label:"counter = local",exec:(t,e)=>{t.shared.counter=t.threads[e].locals.local}}]}],invariant:{label:"counter === 2 once both threads finish",holds:(t,e)=>!e||t.shared.counter===2},createState:()=>({shared:{counter:0},locks:{},threads:[{id:0,pc:0,status:"ready",locals:{local:0}},{id:1,pc:0,status:"ready",locals:{local:0}}]})},Bm={key:"mutex-violation",name:"Mutex violation",description:"Two threads guard a critical section with a check-then-acquire lock.",bug:"Checking the lock and taking it are separate steps, so both threads can see it free and both enter.",threads:[0,1].map((t,e)=>({name:`T${e}`,instructions:[{label:"saw = (lock == free)",exec:(n,s)=>{n.threads[s].locals.saw=n.locks.L===null?1:0}},{label:"if saw: take lock",exec:(n,s)=>{n.threads[s].locals.saw===1&&(n.locks.L=s,n.threads[s].status="critical")}},{label:"critical section",exec:(n,s)=>{n.shared.entered+=1}},{label:"release lock",exec:(n,s)=>{n.threads[s].status==="critical"&&(n.threads[s].status="ready",n.locks.L===s&&(n.locks.L=null))}}]})),invariant:{label:"at most one thread in the critical section",holds:t=>t.threads.filter(e=>e.status==="critical").length<=1},createState:()=>({shared:{entered:0},locks:{L:null},threads:[{id:0,pc:0,status:"ready",locals:{saw:0}},{id:1,pc:0,status:"ready",locals:{saw:0}}]})},zs={"racy-counter":Nm,"mutex-violation":Bm},ec="racy-counter",tc="algoviz-last-visited";function Fm(){try{return localStorage.getItem(tc)||null}catch{return null}}const Di=B(Fm());function Hm(t){try{localStorage.setItem(tc,t)}catch{}}function nc(){function t(n){Di.value=n,Hm(n)}function e(n,s){n.afterEach(o=>{const a=typeof o.name=="string"?o.name:null;a&&s(a)&&t(a)})}return{lastVisited:Di,record:t,trackLastVisited:e}}const Vm={class:"space-y-8"},Um={key:0},zm={class:"mt-1 font-semibold"},qm={class:"grid gap-3 sm:grid-cols-2 lg:grid-cols-3"},Km={class:"flex items-baseline justify-between gap-2"},Gm={class:"font-semibold"},Wm={key:0,class:"shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500 dark:bg-slate-700 dark:text-slate-300"},Ym={class:"mt-2 text-sm text-slate-500 dark:text-slate-400"},Xm=oe({__name:"LandingView",setup(t){const{lastVisited:e}=nc(),n=C(()=>e.value?Ks.find(s=>s.name===e.value):void 0);return(s,o)=>(x(),A("div",Vm,[o[3]||(o[3]=h("section",{class:"text-center"},[h("h2",{class:"text-2xl font-bold tracking-tight sm:text-3xl"},"See how algorithms actually run"),h("p",{class:"mx-auto mt-3 max-w-2xl text-sm text-slate-500 dark:text-slate-400 sm:text-base"}," Every algorithm here is written as a generator that yields a snapshot after each meaningful step. Nothing is pre-rendered or faked — play, pause and scrub through the real sequence of comparisons, swaps and visits, one step at a time. ")],-1)),n.value?(x(),A("section",Um,[T(f(Us),{to:n.value.path,class:"flex items-center justify-between gap-4 rounded-2xl border border-indigo-200 bg-indigo-50/60 px-5 py-4 transition-all hover:border-indigo-300 hover:bg-indigo-50 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:hover:border-indigo-500/50 dark:hover:bg-indigo-500/20"},{default:D(()=>{var a;return[h("div",null,[o[0]||(o[0]=h("p",{class:"text-xs font-semibold uppercase tracking-wide text-indigo-500 dark:text-indigo-400"}," Continue where you left off ",-1)),h("p",zm,R((a=n.value.meta)==null?void 0:a.label),1)]),o[1]||(o[1]=h("span",{"aria-hidden":"true",class:"text-xl text-indigo-500 dark:text-indigo-400"},"→",-1))]}),_:1},8,["to"])])):ge("",!0),h("section",null,[o[2]||(o[2]=h("h3",{class:"mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400"},"Categories",-1)),h("ul",qm,[(x(!0),A(ne,null,fe(f(Ks),a=>(x(),A("li",{key:a.path},[T(f(Us),{to:a.path,class:"flex h-full flex-col rounded-2xl border border-slate-200 bg-white/70 p-5 transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/10 dark:border-slate-700 dark:bg-slate-800/70 dark:hover:border-indigo-500/50"},{default:D(()=>{var r,i,l;return[h("div",Km,[h("span",Gm,R((r=a.meta)==null?void 0:r.label),1),(i=a.meta)!=null&&i.count?(x(),A("span",Wm,R(a.meta.count)+" algorithms ",1)):ge("",!0)]),h("p",Ym,R((l=a.meta)==null?void 0:l.pitch),1)]}),_:2},1032,["to"])]))),128))])])]))}}),Jm=/^\s*yield\s+(?:snap|done)\(.*?,\s*(\d+)\s*\)\s*;?\s*$/;function Qm(t){const e=new Map;return t.split(`
`).forEach((n,s)=>{const o=Jm.exec(n);if(!o)return;const a=Number(o[1]);e.set(a,[...e.get(a)??[],s])}),e}function sa(t){const e=new Map;return n=>{let s=e.get(n);return s||(s=Qm(t[n].text),e.set(n,s)),s}}const Zm=`import type { SortStep } from '@/types';
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
`,eg=`import type { SortStep } from '@/types';
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
`,tg=`import type { SortStep } from '@/types';
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
`,ng=`import type { SortStep } from '@/types';
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
`,sg=`import type { SortStep } from '@/types';
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
`,og=`import type { SortStep } from '@/types';
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
`,ag=`import type { SortStep } from '@/types';
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
`,rg=`import type { SortStep } from '@/types';
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
`,ig=`import type { SortStep } from '@/types';
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
`,lg=`import type { SortStep } from '@/types';
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
`,sc={bubble:{file:"bubbleSort.ts",text:Zm},selection:{file:"selectionSort.ts",text:eg},insertion:{file:"insertionSort.ts",text:tg},merge:{file:"mergeSort.ts",text:ng},quick:{file:"quickSort.ts",text:sg},heap:{file:"heapSort.ts",text:og},shell:{file:"shellSort.ts",text:ag},comb:{file:"combSort.ts",text:rg},counting:{file:"countingSort.ts",text:ig},radix:{file:"radixSort.ts",text:lg}},ug=sa(sc),cg={compare:{wave:"sine",freq:330,durationMs:18,gain:.25},swap:{wave:"triangle",freq:660,durationMs:28,gain:.4},hit:{wave:"triangle",freq:495,durationMs:26,gain:.35},miss:{wave:"sine",freq:220,durationMs:22,gain:.22}},Xt=Object.freeze([]),ao=t=>t.comparing.length>0?["compare"]:t.swapping.length>0?["swap"]:Xt,ro={bubble:ao,insertion:ao,quick:ao,merge:ao};function st(t){let e=t>>>0;function n(){e=e+1831565813|0;let a=e;return a=Math.imul(a^a>>>15,a|1),a^=a+Math.imul(a^a>>>7,a|61),((a^a>>>14)>>>0)/4294967296}function s(a,r){return r<a?a:a+Math.floor(n()*(r-a+1))}function o(a){if(a.length!==0)return a[s(0,a.length-1)]}return{next:n,int:s,pick:o}}function ze(){return Math.floor(Math.random()*4294967296)>>>0}function dg(t){if(t==null)return null;const e=t.trim();if(e==="")return null;const n=Number(e);return!Number.isFinite(n)||!Number.isInteger(n)?null:n>>>0}function Mr(t){return C(()=>Math.max(4,Math.round(204-t.value*2)))}const pg=5e4,fg=2e3;function vn(t){const e=t.maxSteps??pg,n=B("idle"),s=B(-1),o=B(0),a=B(!1),r=B(!1),i=B(0);let l=[],u=null,c=null,d=0,p=null;const m=Mr(t.speed),w=C(()=>n.value==="running"),g=C(()=>n.value==="paused"),v=C(()=>n.value==="done"),b=C(()=>n.value==="idle"||n.value==="done"),y=C(()=>s.value+1),S=C(()=>s.value>=0?l[s.value]:null),$=C(()=>s.value>=0),_=C(()=>n.value==="idle"||s.value<o.value-1||!a.value);function N(){c!==null&&(clearTimeout(c),c=null)}function G(){p=Date.now()}function j(){p!==null&&(d+=Date.now()-p,p=null),i.value=d}function L(){i.value=d+(p===null?0:Date.now()-p)}function I(){if(!u)return null;if(l.length>=e)return r.value=!0,a.value=!0,u=null,null;const{value:W,done:me}=u.next();return me||!W?(a.value=!0,u=null,null):(l.push(W),o.value=l.length,W.done&&(a.value=!0,u=null),W)}function he(W){if(s.value=W,W<0){t.clearStep();return}t.applyStep(l[W],W)}function Se(){return N(),l=[],o.value=0,s.value=-1,a.value=!1,r.value=!1,d=0,p=null,i.value=0,u=t.createGenerator(),u!==null}function z(){N(),j(),n.value="done"}function ae(){var me;if(n.value!=="running")return;let W;if(s.value<l.length-1)W=l[s.value+1],he(s.value+1);else{if(W=I(),W===null){z();return}he(l.length-1)}if((me=t.onAdvance)==null||me.call(t,W,s.value),L(),W.done){z();return}c=setTimeout(ae,m.value)}function P(){if(n.value!=="running"){if(n.value==="paused"){n.value="running",G(),ae();return}Se()&&(n.value="running",G(),ae())}}function J(){n.value==="running"&&(N(),j(),n.value="paused")}function le(){N(),u=null,l=[],o.value=0,s.value=-1,a.value=!1,r.value=!1,d=0,p=null,i.value=0,t.clearStep(),n.value="idle"}function K(W){n.value==="running"&&J();let me=Math.max(-1,W),Te=0;for(;me>=l.length&&u!==null&&Te<fg&&I()!==null;)Te+=1;me=Math.min(me,l.length-1),he(me),me>=0&&l[me].done?n.value="done":me<0&&l.length===0?n.value="idle":n.value="paused"}function re(){var me;if(n.value==="idle"&&!Se())return;const W=s.value;K(s.value+1),s.value>W&&((me=t.onAdvance)==null||me.call(t,l[s.value],s.value))}function $e(){K(s.value-1)}function et(){if(!(n.value==="idle"&&!Se())){for(n.value==="running"&&J();u!==null&&I()!==null;);he(l.length-1),j(),n.value=l.length>0?"done":"idle"}}return Ho(N),{status:n,isRunning:w,isPaused:g,isDone:v,canEdit:b,delayMs:m,elapsedMs:i,cursor:s,stepCount:y,bufferedCount:o,fullyBuffered:a,truncated:r,current:S,canStepBack:$,canStepForward:_,run:P,pause:J,reset:le,stepForward:re,stepBack:$e,seek:K,skipToEnd:et}}const hg=45,mg=.0015,Pi=1e-4,gg=.5;function bg(){try{const t=window,e=window.AudioContext??t.webkitAudioContext;return e?new e:null}catch{return null}}function Li(t){Promise.resolve(t).catch(()=>{})}function vg(t={}){const e=t.createContext??bg,n=t.minIntervalMs??hg,s=t.now??(()=>performance.now());let o=null,a=null,r=!1,i=1,l={};const u=()=>gg*i*i;function c(){if(o)return!0;if(r)return!1;let g=null;try{g=e()}catch{g=null}return g?(o=g,a=o.createGain(),a.gain.value=u(),a.connect(o.destination),!0):(r=!0,!1)}function d(g){i=Math.min(1,Math.max(0,g)),a&&(a.gain.value=u())}function p(){!c()||!o||o.state==="suspended"&&Li(o.resume())}function m(g,v){const b=s(),y=l[v];if(y!==void 0&&b-y<n||!c()||!o||!a)return!1;try{const S=o.currentTime,$=S+g.durationMs/1e3,_=o.createOscillator(),N=o.createGain();_.type=g.wave,_.frequency.value=g.freq,N.gain.setValueAtTime(Pi,S),N.gain.linearRampToValueAtTime(g.gain,Math.min(S+mg,$)),N.gain.exponentialRampToValueAtTime(Pi,$),_.connect(N),N.connect(a),_.onended=()=>{_.disconnect(),N.disconnect()},_.start(S),_.stop($+.01)}catch{return!1}return l[v]=b,!0}function w(){const g=o;o=null,a=null,l={},g&&Li(g.close())}return{get available(){return!r},setVolume:d,unlock:p,play:m,dispose:w}}const oc="algoviz-audio-enabled",ac="algoviz-audio-volume",xa=.4;function yg(){try{return localStorage.getItem(oc)==="1"}catch{return!1}}function wg(){try{const t=localStorage.getItem(ac);if(t===null||t==="")return xa;const e=Number(t);return Number.isFinite(e)&&e>=0&&e<=1?e:xa}catch{return xa}}const Qn=B(yg()),Is=B(wg());let es=null;function Ni(){try{localStorage.setItem(oc,Qn.value?"1":"0"),localStorage.setItem(ac,String(Is.value))}catch{}}function Bi(){const t=es??vg();return es=t,t.setVolume(Is.value),t.unlock(),t}function Qs(){function t(){Qn.value=!Qn.value,Ni(),Qn.value&&Bi()}function e(s){Is.value=Math.min(1,Math.max(0,s)),Ni(),es==null||es.setVolume(Is.value)}function n(s){if(!Qn.value||s.length===0||document.hidden)return;const o=es??Bi();for(const a of s)o.play(cg[a],a)}return{enabled:Qn,volume:Is,toggle:t,setVolume:e,play:n}}function xg(t,e){const n=t[e],s=Array.isArray(n)?n[0]:n;return typeof s=="string"?s:void 0}function Qt(t){const e=ih(),n=Object.keys(t),s=new Set,o=e.currentRoute.value.query;for(const l of n){const u=xg(o,l);if(u===void 0)continue;const c=t[l].decode(u);c!==void 0&&(t[l].ref.value=c,s.add(l))}let a=null;function r(){const l=e.currentRoute.value.query,u={...l};for(const d of n){const p=t[d].encode(t[d].ref.value);p===null?delete u[d]:u[d]=p}(n.some(d=>u[d]!==l[d])||Object.keys(u).length!==Object.keys(l).length)&&e.replace({query:u}).catch(()=>{})}const i=Math.max(0,...n.map(l=>t[l].debounceMs??0));return _e(n.map(l=>t[l].ref),()=>{if(i===0){r();return}a!==null&&clearTimeout(a),a=setTimeout(r,i)},{flush:"post"}),Ho(()=>{a!==null&&clearTimeout(a)}),{hydrated:s}}const kg=1,Sg=999,$g=200;function Dn(t,e){const n=(e==null?void 0:e.min)??kg,s=(e==null?void 0:e.max)??Sg,o=(e==null?void 0:e.maxLength)??$g,a=t.trim().split(/[\s,]+/).filter(Boolean);if(a.length===0)return{values:[],error:"Enter at least one number."};if(a.length>o)return{values:[],error:`Enter at most ${o} numbers.`};const r=[];for(const i of a){const l=Number(i);if(!Number.isFinite(l)||!Number.isInteger(l))return{values:[],error:`"${i}" is not a whole number.`};r.push(Math.min(s,Math.max(n,l)))}return{values:r,error:null}}function Qe(t,e,n){if(t.trim()==="")return;const s=Number(t);if(!(!Number.isFinite(s)||!Number.isInteger(s)))return Math.min(n,Math.max(e,s))}function Jt(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return e}function Fi(t){return`${t.row},${t.col}`}function Hi(t,e,n){const s=t.split(",");if(s.length!==2)return;const[o,a]=s;if(o.trim()===""||a.trim()==="")return;const r=Number(o),i=Number(a);if(!(!Number.isFinite(r)||!Number.isInteger(r))&&!(!Number.isFinite(i)||!Number.isInteger(i))&&!(r<0||r>=e||i<0||i>=n))return{row:r,col:i}}const rc="-",Eg=64;function jo(t,e){return t.map(e.encodeOp).join(rc)}function ic(t,e){const n=t.trim();if(n==="")return[];const s=n.split(rc);if(s.length>(e.maxOps??Eg))return;const o=[];for(const a of s){const r=e.decodeOp(a);if(r===void 0)return;o.push(r)}return o}const $n=t=>t.cursor!==null?["compare"]:t.path.length>0?["hit"]:Xt,io={fib:$n,"coin-change":$n,lis:$n,knapsack:$n,"subset-sum":$n,lcs:$n,"edit-distance":$n,"matrix-chain":$n},Cg={fib:["dp[0] = 0; dp[1] = 1","for k = 2 to n:  dp[k] = dp[k - 1] + dp[k - 2]","traceback: every dp[k] fed the two cells after it","done — fib(n) = dp[n]"],"coin-change":["dp[0] = 0   // zero coins make zero","for a = 1 to amount","  dp[a] = 1 + min(dp[a - c]) over coins c <= a","traceback: subtract the winning coin, repeat","done — dp[amount] is the fewest coins"],lis:["dp[i] = 1   // a[i] on its own is a subsequence","for i = 0 to n - 1","  dp[i] = 1 + max(dp[j]) over j < i with a[j] < a[i]","traceback: from argmax dp, hop to the predecessor that won","done — the answer is max(dp), not dp[n - 1]"],knapsack:["dp[0][c] = 0 for every c   // no items, no value","for i = 1 to n","  for c = 0 to capacity","    skip = dp[i-1][c];  take = v_i + dp[i-1][c - w_i] if w_i <= c","    dp[i][c] = max(skip, take)","traceback: dp[i][c] != dp[i-1][c] means item i was taken","done — dp[n][capacity] is the best value"],"subset-sum":["dp[0][0] = 1; dp[0][t] = 0 for t > 0","for i = 1 to n","  for t = 0 to target","    skip = dp[i-1][t];  take = dp[i-1][t - w_i] if w_i <= t","    dp[i][t] = skip OR take","traceback: follow whichever branch held 1","done — dp[n][target] = 1 means the target is reachable"],lcs:["dp[i][0] = dp[0][j] = 0","for i = 1 to m, for j = 1 to n","  if a[i-1] == b[j-1]:  dp[i][j] = 1 + dp[i-1][j-1]","  else:                 dp[i][j] = max(dp[i-1][j], dp[i][j-1])","traceback: on a match take the character and step diagonally","done — dp[m][n] is the LCS length"],"edit-distance":["dp[i][0] = i   // delete everything","dp[0][j] = j   // insert everything","  if a[i-1] == b[j-1]:  dp[i][j] = dp[i-1][j-1]","  else:  dp[i][j] = 1 + min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1])","traceback: read the edit script off the winning branches","done — dp[m][n] is the edit distance"],"matrix-chain":["dp[i][i] = 0   // one matrix needs no multiplication","for len = 2 to n:  for each i, with j = i + len - 1","  dp[i][j] = min over k in [i, j) of","             dp[i][k] + dp[k+1][j] + d[i]*d[k+1]*d[j+1]","traceback: descend into the winning split on both sides","done — dp[0][n-1] is the fewest scalar multiplications"]},Ag=`import type { DpDep, DpStep, StepGenerator } from '@/types';
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
`,Tg=`import type { DpDep, DpStep, StepGenerator } from '@/types';
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
`,Og=`import type { DpDep, DpStep, StepGenerator } from '@/types';
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
`,Mg=`import type { DpDep, DpStep, StepGenerator } from '@/types';
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
`,Rg=`import type { DpDep, DpStep, StepGenerator } from '@/types';
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
`,_g=`import type { DpDep, DpStep, StepGenerator } from '@/types';
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
`,Ig=`import type { DpDep, DpStep, StepGenerator } from '@/types';
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
`,jg=`import type { DpBoard } from './_utils';
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
`,lc={fib:{file:"fib.ts",text:Ag},"coin-change":{file:"coinChange.ts",text:Tg},lis:{file:"lis.ts",text:Og},knapsack:{file:"knapsack.ts",text:Mg},"subset-sum":{file:"subsetSum.ts",text:Rg},lcs:{file:"lcs.ts",text:_g},"edit-distance":{file:"editDistance.ts",text:Ig},"matrix-chain":{file:"matrixChain.ts",text:jg}},Dg=sa(lc),Vi="fib";function js(t){switch(t.kind){case"scalar":return`scalar:${t.n}`;case"coins":return`coins:${t.coins.join(",")}:${t.amount}`;case"sequence":return`sequence:${t.values.join(",")}`;case"items":return`items:${t.items.map(e=>`${e.weight}/${e.value}`).join(",")}:${t.capacity}`;case"strings2":return`strings2:${t.a}:${t.b}`;case"chain":return`chain:${t.dims.join(",")}`}}const Ui="ABCDEF";function zi(t,e,n){const s=t.int(e,n);return Array.from({length:s},()=>Ui[t.int(0,Ui.length-1)]).join("")}function Pg(t,e){switch(t){case"scalar":return{kind:"scalar",n:e.int(10,22)};case"coins":{const n=[];let s=1;for(let o=0;o<3;o++)n.push(s),s+=e.int(1,4);return{kind:"coins",coins:n,amount:e.int(9,18)}}case"sequence":return{kind:"sequence",values:Array.from({length:e.int(7,10)},()=>e.int(1,30))};case"items":{const n=e.int(3,6);return{kind:"items",items:Array.from({length:n},()=>({weight:e.int(1,7),value:e.int(1,12)})),capacity:e.int(7,14)}}case"strings2":return{kind:"strings2",a:zi(e,5,7),b:zi(e,5,7)};case"chain":return{kind:"chain",dims:Array.from({length:e.int(4,6)},()=>e.int(1,8)*5)}}}function Lg(t,e){return Array.from({length:t},()=>new Array(e).fill(null))}function Ng(t={}){const{audio:e=!0}=t,n=Qs(),s=B(Vi),o=B(Kt[Vi].defaults),a=B(60),r=B(ze()),i=B([]),l=Le({cursor:null,deps:[],chosen:null,path:[],explain:null,result:null,cellsFilled:0}),u=B(null),c=C(()=>Kt[s.value]),d=C(()=>Nu(c.value,o.value)),p=C(()=>d.value.axes),m=C(()=>d.value.dims),w=C(()=>d.value.recurrence),g=C(()=>d.value.naiveCalls),v=C(()=>_o(c.value,o.value)),b=C(()=>v.value===null),y=C(()=>{var re;const P=u.value;if(P===null)return[];const{rows:J,cols:le}=m.value,K=i.value;return K.length!==J||(((re=K[0])==null?void 0:re.length)??0)!==le?[]:P.row<0||P.row>=J||P.col<0||P.col>=le?[]:d.value.depsOf(P.row,P.col,K)}),S=C(()=>({cellsFilled:l.cellsFilled,fillable:m.value.fillable,rows:m.value.rows,cols:m.value.cols,naiveCalls:g.value,speedup:m.value.fillable>0?g.value/m.value.fillable:0}));function $(){i.value=Lg(m.value.rows,m.value.cols),l.cursor=null,l.deps=[],l.chosen=null,l.path=[],l.explain=null,l.result=null,l.cellsFilled=0}const _=vn({speed:a,createGenerator:()=>($(),b.value?d.value.generator():null),applyStep:P=>{i.value=P.table,l.cursor=P.cursor,l.deps=P.deps,l.chosen=P.chosen,l.path=P.path,l.explain=P.explain,l.result=P.result,l.cellsFilled=P.cellsFilled},clearStep:$,onAdvance:e?P=>{var J;return n.play(((J=io[s.value])==null?void 0:J.call(io,P))??Xt)}:void 0,maxSteps:Dh});function N(P){_.canEdit.value&&(o.value=P,_.reset())}function G(){N(Pg(c.value.kind,st(r.value)))}function j(){r.value=ze(),G()}function L(P){u.value=P}_e(s,P=>{Kt[P].kind!==o.value.kind&&(o.value=Kt[P].defaults),_.reset()});const I=C(()=>{var P;return((P=_.current.value)==null?void 0:P.line)??null}),he=C(()=>Cg[s.value]),Se=C(()=>lc[s.value]),z=C(()=>{var J;const P=(J=_.current.value)==null?void 0:J.line;return P===void 0?[]:Dg(s.value).get(P)??[]}),ae=C(()=>s.value in io);return Qt(Ob({algoKey:s,input:o,speed:a,seed:r})),$(),{algoKey:s,input:o,speed:a,seed:r,currentAlgo:c,axes:p,dims:m,recurrence:w,naiveCalls:g,inputError:v,canRun:b,table:i,view:l,hoverCell:u,hoverDeps:y,stats:S,activeLine:I,pseudocodeLines:he,sourceCode:Se,activeSourceLines:z,hasSoundCues:ae,status:_.status,isRunning:_.isRunning,isPaused:_.isPaused,isDone:_.isDone,canEdit:_.canEdit,delayMs:_.delayMs,elapsedMs:_.elapsedMs,stepCount:_.stepCount,cursor:_.cursor,bufferedCount:_.bufferedCount,fullyBuffered:_.fullyBuffered,truncated:_.truncated,current:_.current,canStepBack:_.canStepBack,canStepForward:_.canStepForward,setInput:N,randomizeInput:G,randomizeSeed:j,setHoverCell:L,run:_.run,pause:_.pause,reset:_.reset,stepForward:_.stepForward,stepBack:_.stepBack,seek:_.seek,skipToEnd:_.skipToEnd}}const Bg=`import type { DsuOp, DsuStep } from '@/types';
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
`,Fg=`import type { GraphModel, MstStep } from '@/types';
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
`,Hg=`import type { GraphEdge, GraphModel, MstStep } from '@/types';
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
`,uc={dsu:{file:"dsuOps.ts",text:Bg},kruskal:{file:"kruskal.ts",text:Fg},prim:{file:"prim.ts",text:Hg}},Vg=sa(uc),Ug={dsu:["parent[i] = i, rank[i] = 0        // n singleton sets","find(x):","  walk parent pointers up to the root","  re-hang every node walked onto the root   // path compression","union(a, b):","  ra = find(a); rb = find(b)","  if ra == rb: already one set — nothing to do","  hang the lower-rank root under the higher   // union by rank","  on a tie, the surviving root’s rank goes up by 1","done — every operation in the script has run"],kruskal:["sort every edge by weight, lightest first","parent[i] = i        // every node starts as its own component","for each edge (u, v) in that order","  if find(u) == find(v): reject — u and v are already connected","  else accept (u, v) and union(u, v)","  stop early once V - 1 edges have been accepted","done — spanning tree, or a spanning forest if the graph was disconnected"],prim:["pick a start node; the tree holds just that node","offer every edge leaving the tree as a candidate","take the lightest candidate","  if both its ends are already in the tree, drop it   // it would close a cycle","  otherwise accept it: its far end joins the tree and offers its own edges","no candidate left but nodes remain — restart from an unreached node","done — spanning tree, or a spanning forest if the graph was disconnected"]},qi=t=>{if(t.kind!=="mst")return Xt;const e=t.consideringEdge;return e===null?Xt:t.acceptedEdges.includes(e)?["hit"]:t.rejectedEdges.includes(e)?["miss"]:["compare"]},zg=7,qg=6,Kg=2,Gg=t=>t.kind!=="dsu"?Xt:t.line===zg?["hit"]:t.line===qg?["miss"]:t.line===Kg?["compare"]:Xt,lo={dsu:Gg,kruskal:qi,prim:qi},Ki=400,Wg=.42,Yg=.35,Xg=20;function cc(t=10,e=st(ze()),n){const s=Math.max(1,Math.floor(t)),o=Ki/2,a=Ki*Wg,r=(n==null?void 0:n.weighted)??!1,i=(n==null?void 0:n.maxWeight)??Xg,l=Array.from({length:s},(w,g)=>{const v=2*Math.PI*g/s-Math.PI/2;return{id:g,label:`N${g}`,x:o+a*Math.cos(v),y:o+a*Math.sin(v)}}),u=new Set,c=[];function d(w,g){if(w===g)return;const v=w<g?`${w}-${g}`:`${g}-${w}`;if(u.has(v))return;u.add(v);const b=r?e.int(1,i):void 0;c.push(b===void 0?{id:v,from:w,to:g}:{id:v,from:w,to:g,weight:b})}for(let w=0;w<s;w++)d(w,(w+1)%s);const p=s>2?Math.max(1,Math.round(s*Yg)):0;for(let w=0;w<p;w++){const g=e.int(0,s-1),v=e.int(0,s-1);d(g,v)}const m=new Map(l.map(w=>[w.id,[]]));for(const w of c)m.get(w.from).push(w.to),m.get(w.to).push(w.from);return{nodes:l,edges:c,adjacency:m}}const ka=8,dc=3,pc=14,Jg=20;function Gi(t){return{parent:Array.from({length:t},(e,n)=>n),rank:new Array(t).fill(0),setSize:new Array(t).fill(1),findPath:[],compressed:[],finds:0,unions:0,compressions:0,maxDepth:0}}function sr(t,e){const n=st(e),s=Math.max(2,t),o=[];for(let a=0;a<Math.min(6,s-1);a++)o.push({kind:"union",a:n.int(0,s-1),b:n.int(0,s-1)});for(let a=0;a<3;a++)o.push({kind:"find",a:n.int(0,s-1)});return o}function Qg(t={}){const{audio:e=!0}=t,n=Qs(),s=B("kruskal"),o=B(ka),a=B(60),r=B(ze()),i=B([]),l=B(null),u=B({nodes:[],edges:[],adjacency:new Map}),c=B(Gi(ka)),d=Le({consideringEdge:null,acceptedEdges:[],rejectedEdges:[],queue:[],totalWeight:0,components:ka}),p=B(null),m=B(null),w=B(null),g=C(()=>ea[s.value]),v=C(()=>g.value.mode==="dsu"),b=C(()=>[...u.value.edges].sort((W,me)=>{const Te=(W.weight??1)-(me.weight??1);return Te!==0?Te:W.id.localeCompare(me.id)}));function y(W,me){let Te=me;for(let qe=0;qe<W.length&&W[Te]!==Te;qe++)Te=W[Te];return Te}const S=C(()=>new Map(u.value.nodes.map((W,me)=>[W.id,me]))),$=C(()=>{const W=new Map;for(const me of d.rejectedEdges)W.set(me,"rejected");for(const me of d.acceptedEdges)W.set(me,"accepted");return d.consideringEdge!==null&&!W.has(d.consideringEdge)&&W.set(d.consideringEdge,"considering"),W}),_=C(()=>{const W=new Map,me=new Set(d.acceptedEdges);for(const qe of u.value.edges)me.has(qe.id)&&(W.set(qe.from,"accepted"),W.set(qe.to,"accepted"));const Te=u.value.edges.find(qe=>qe.id===d.consideringEdge);return Te&&(W.set(Te.from,"considering"),W.set(Te.to,"considering")),W}),N=C(()=>{var Te;const W=new Map;if(v.value)return W;const me=c.value.parent;for(const qe of u.value.nodes){const at=S.value.get(qe.id);if(at===void 0||at>=me.length)continue;const V=y(me,at);W.set(qe.id,`set ${((Te=u.value.nodes[V])==null?void 0:Te.label)??V}`)}return W}),G=C(()=>({finds:c.value.finds,unions:c.value.unions,compressions:c.value.compressions,maxDepth:c.value.maxDepth,totalWeight:d.totalWeight,components:d.components}));function j(){d.consideringEdge=null,d.acceptedEdges=[],d.rejectedEdges=[],d.queue=[],d.totalWeight=0,d.components=v.value?o.value:u.value.nodes.length}function L(){c.value=Gi(v.value?o.value:u.value.nodes.length),p.value=null,m.value=null,w.value=null,j()}const I=vn({speed:a,createGenerator:()=>{L();const W=g.value;if(W.mode==="dsu")return W.generator(o.value,[...i.value]);if(u.value.nodes.length===0)return null;const me=typeof l.value=="number"?l.value:u.value.nodes[0].id;return W.generator(u.value,me)},applyStep:W=>{if(c.value=W.forest,w.value=W.explain,W.kind==="dsu"){p.value=W.op,m.value=W.active,d.consideringEdge=null,d.acceptedEdges=[],d.rejectedEdges=[],d.queue=[],d.totalWeight=0,d.components=W.forest.parent.filter((me,Te)=>me===Te).length;return}p.value=null,m.value=null,d.consideringEdge=W.consideringEdge,d.acceptedEdges=W.acceptedEdges,d.rejectedEdges=W.rejectedEdges,d.queue=W.queue,d.totalWeight=W.totalWeight,d.components=W.components},clearStep:L,onAdvance:e?W=>{var me;return n.play(((me=lo[s.value])==null?void 0:me.call(lo,W))??Xt)}:void 0});function he(W=!1){var Te;u.value=cc(o.value,st(r.value),{weighted:!0,maxWeight:Jg}),W&&l.value!==null&&u.value.adjacency.has(l.value)||(l.value=((Te=u.value.nodes[0])==null?void 0:Te.id)??null),I.reset()}function Se(W){I.canEdit.value&&(i.value=[...W],I.reset())}function z(){Se(sr(o.value,r.value))}function ae(W){I.canEdit.value&&u.value.adjacency.has(W)&&(l.value=W)}function P(){r.value=ze(),he(),z()}const J=C(()=>{var W;return((W=I.current.value)==null?void 0:W.line)??null}),le=C(()=>Ug[s.value]??[]),K=C(()=>uc[s.value]),re=C(()=>{var me;const W=(me=I.current.value)==null?void 0:me.line;return W===void 0?[]:Vg(s.value).get(W)??[]}),$e=C(()=>s.value in lo),{hydrated:et}=Qt(Mb({algoKey:s,nodeCount:o,speed:a,seed:r,startId:l,opScript:i}));return he(et.has("start")),et.has("ops")||(i.value=sr(o.value,r.value)),{algoKey:s,nodeCount:o,speed:a,seed:r,opScript:i,startId:l,graph:u,sortedEdges:b,forest:c,highlights:d,activeOp:p,activeNode:m,explain:w,stats:G,nodeTone:_,edgeTone:$,nodeBadge:N,currentAlgo:g,isDsuMode:v,activeLine:J,pseudocodeLines:le,sourceCode:K,activeSourceLines:re,hasSoundCues:$e,status:I.status,isRunning:I.isRunning,isPaused:I.isPaused,isDone:I.isDone,canEdit:I.canEdit,delayMs:I.delayMs,elapsedMs:I.elapsedMs,stepCount:I.stepCount,cursor:I.cursor,bufferedCount:I.bufferedCount,fullyBuffered:I.fullyBuffered,current:I.current,canStepBack:I.canStepBack,canStepForward:I.canStepForward,generate:he,setOpScript:Se,randomizeOpScript:z,randomizeSeed:P,setStart:ae,run:I.run,pause:I.pause,reset:I.reset,stepForward:I.stepForward,stepBack:I.stepBack,seek:I.seek,skipToEnd:I.skipToEnd}}const fc="abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",Zg=3;function*hc(){const t=[...fc],e=t.length;for(let n=1;n<=Zg;n++){const s=e**n;for(let o=0;o<s;o++){let a="",r=o;for(let i=0;i<n;i++)a=t[r%e]+a,r=Math.floor(r/e);yield a}}}function eb(t,e,n){const s=ta(n.capacity),o=Vn[n.hashFnKey].hash,a=n.exclude??new Set,r=(t%s+s)%s,i=[];for(const l of hc())if(!a.has(l)&&Tr(o(l),s)===r&&(i.push(l),i.length>=e))break;return i}function tb(t,e,n){const s=ta(e.capacity),o=Vn[e.hashFnKey].hash,a=e.exclude??new Set;if(n!==void 0){const l=eb(n,t,e),u=(n%s+s)%s;if(l.length===t)return{bucket:u,keys:l}}const r=new Map;for(const l of hc()){if(a.has(l))continue;const u=Tr(o(l),s),c=r.get(u)??[];if(c.push(l),r.set(u,c),c.length>=t)return{bucket:u,keys:c}}let i={bucket:0,keys:[]};for(const[l,u]of r)u.length>i.keys.length&&(i={bucket:l,keys:u});return i}function mc(t,e,n){const s=new Set(n??[]),o=[];for(let a=0;a<e*50&&o.length<e;a++){const r=t.int(2,3);let i="";for(let l=0;l<r;l++)i+=fc[t.int(0,25)];s.has(i)||(s.add(i),o.push(i))}return o}const nb={chaining:["insert(key):","  h = hash(key);  home = h mod capacity","  walk bucket[home]’s chain, link by link","    key already in the chain -> overwrite its value","    end of the chain reached -> append the key","    a different key here -> collision; the chain just gets longer","  if size / capacity > threshold: grow, then rehash every key","search(key): walk the same chain from the front","  key found -> report the bucket holding it","  end of chain -> the key is not in the table","delete(key): walk the chain to find the key","  unlink it; the chain simply gets shorter","done — every operation in the script has run"],linear:["insert(key):","  h = hash(key);  home = h mod capacity","  probe (home + k) mod capacity for k = 0, 1, 2, ...","    key already in this slot -> overwrite its value","    slot empty (or a reusable tombstone) -> put the key here","    a different key here -> collision; probe the next slot","  if slots used / capacity > threshold: grow, then rehash every key","search(key): walk the same probe sequence from home","  key found -> report the slot holding it","  first EMPTY slot -> the key is not in the table","delete(key): walk the sequence to find the key","  leave a TOMBSTONE behind, never an empty slot","done — every operation in the script has run"],quadratic:["insert(key):","  h = hash(key);  home = h mod capacity","  probe (home + k(k+1)/2) mod capacity for k = 0, 1, 2, ...","    key already in this slot -> overwrite its value","    slot empty (or a reusable tombstone) -> put the key here","    a different key here -> collision; widen the jump and probe again","  if slots used / capacity > threshold: grow, then rehash every key","search(key): walk the same probe sequence from home","  key found -> report the slot holding it","  first EMPTY slot -> the key is not in the table","delete(key): walk the sequence to find the key","  leave a TOMBSTONE behind, never an empty slot","done — every operation in the script has run"],double:["insert(key):","  h = hash(key);  home = h mod capacity;  step = h2(h) | 1","  probe (home + k * step) mod capacity for k = 0, 1, 2, ...","    key already in this slot -> overwrite its value","    slot empty (or a reusable tombstone) -> put the key here","    a different key here -> collision; jump another step","  if slots used / capacity > threshold: grow, then rehash every key","search(key): walk the same probe sequence from home","  key found -> report the slot holding it","  first EMPTY slot -> the key is not in the table","delete(key): walk the sequence to find the key","  leave a TOMBSTONE behind, never an empty slot","done — every operation in the script has run"]},uo=`// The generators that turn a script of hash-table operations into watchable
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
`,gc={chaining:{file:"hashtable/ops.ts",text:uo},linear:{file:"hashtable/ops.ts",text:uo},quadratic:{file:"hashtable/ops.ts",text:uo},double:{file:"hashtable/ops.ts",text:uo}},sb=sa(gc),Wi=Object.freeze(["compare"]),ob=Object.freeze(["hit"]),Yi=Object.freeze(["miss"]),ab=Object.freeze(["swap"]);function rb(t){if(t.probeIndex===null||t.key===null)return!1;const e=t.buckets[t.probeIndex];if(!e||e.state!=="occupied")return!1;const n=e.entries[t.probeSeq.length-1]??e.entries[0];return n!==void 0&&n.key!==t.key}const ib=t=>{switch(t.phase){case"probing":return rb(t)?Yi:Wi;case"hashing":return Wi;case"inserted":case"updated":case"found":case"deleted":return ob;case"not-found":return Yi;case"resizing":return ab;default:return Xt}},lb=new Set(["inserted","updated","found","not-found","deleted"]),bc=8,ub=3;function Xi(t){return Array.from({length:t},()=>({entries:[],state:"empty"}))}function vc(t,e=bc){const n=mc(st(t),e),s=n.map(o=>({kind:"insert",key:o}));return n.length===0||(s.push({kind:"search",key:n[Math.floor(n.length/2)]}),s.push({kind:"delete",key:n[0]})),s}function cb(t={}){const{audio:e=!0}=t,n=Qs(),s=B(Zu),o=B(Yu),a=B(8),r=B(.75),i=B(60),l=B(ze()),u=B([]),c=C(()=>ta(a.value)),d=C(()=>Xu(s.value,r.value)),p=C(()=>na[s.value]),{hydrated:m}=Qt(Pb({strategyKey:s,hashFnKey:o,capacity:a,threshold:r,speed:i,seed:l,script:u}));m.has("ops")||(u.value=vc(l.value));const w=B(Xi(c.value)),g=Le({capacity:c.value,size:0,loadFactor:0,op:null,key:null,hash:null,homeIndex:null,probeIndex:null,probeSeq:[],phase:"idle",explain:null}),v=Le({probes:0,collisions:0,resizes:0,opsDone:0});let b=[];function*y(K){let re=0;for(const $e of K)lb.has($e.phase)&&(re+=1),b.push(re),yield $e}function S(){w.value=Xi(c.value),g.capacity=c.value,g.size=0,g.loadFactor=0,g.op=null,g.key=null,g.hash=null,g.homeIndex=null,g.probeIndex=null,g.probeSeq=[],g.phase="idle",g.explain=null,v.probes=0,v.collisions=0,v.resizes=0,v.opsDone=0}const $=vn({speed:i,createGenerator:()=>{S(),b=[];const K=u.value.map(re=>({...re}));return y(p.value.generator(K,{hashFnKey:o.value,capacity:a.value,threshold:r.value}))},applyStep:(K,re)=>{w.value=K.buckets,g.capacity=K.capacity,g.size=K.size,g.loadFactor=K.loadFactor,g.op=K.op,g.key=K.key,g.hash=K.hash,g.homeIndex=K.homeIndex,g.probeIndex=K.probeIndex,g.probeSeq=K.probeSeq,g.phase=K.phase,g.explain=K.explain,v.probes=K.probes,v.collisions=K.collisions,v.resizes=K.resizes,v.opsDone=b[re]??0},clearStep:S,onAdvance:e?K=>n.play(ib(K)):void 0}),_=C(()=>v.opsDone===0?0:v.probes/v.opsDone);function N(){return new Set(u.value.map(K=>K.key))}function G(K){u.value=K.map(re=>({...re})),$.reset()}function j(K,re){re!==""&&(u.value=[...u.value,{kind:K,key:re}],$.reset())}function L(K){u.value=u.value.filter((re,$e)=>$e!==K),$.reset()}function I(){u.value=[],$.reset()}function he(K=bc){const re=mc(st(l.value),K,N());u.value=[...u.value,...re.map($e=>({kind:"insert",key:$e}))],$.reset()}function Se(K=ub,re){const $e=tb(K,{hashFnKey:o.value,capacity:a.value,exclude:N()},re);return u.value=[...u.value,...$e.keys.map(et=>({kind:"insert",key:et}))],$.reset(),$e.bucket}function z(){l.value=ze()}_e([s,o,a,r],()=>$.reset());const ae=C(()=>{var K;return((K=$.current.value)==null?void 0:K.line)??null}),P=C(()=>nb[s.value]),J=C(()=>gc[s.value]),le=C(()=>{var re;const K=(re=$.current.value)==null?void 0:re.line;return K===void 0?[]:sb(s.value).get(K)??[]});return{strategyKey:s,hashFnKey:o,capacity:a,threshold:r,speed:i,seed:l,script:u,startCapacity:c,activeThreshold:d,currentAlgo:p,buckets:w,view:g,stats:v,avgProbes:_,activeLine:ae,pseudocodeLines:P,sourceCode:J,activeSourceLines:le,status:$.status,isRunning:$.isRunning,isPaused:$.isPaused,isDone:$.isDone,canEdit:$.canEdit,delayMs:$.delayMs,elapsedMs:$.elapsedMs,stepCount:$.stepCount,cursor:$.cursor,bufferedCount:$.bufferedCount,fullyBuffered:$.fullyBuffered,current:$.current,canStepBack:$.canStepBack,canStepForward:$.canStepForward,setScript:G,addOp:j,removeOp:L,clearScript:I,bulkLoad:he,forceCollision:Se,randomizeSeed:z,run:$.run,pause:$.pause,reset:$.reset,stepForward:$.stepForward,stepBack:$.stepBack,seek:$.seek,skipToEnd:$.skipToEnd}}function Rr(t){return t.threads.map(e=>e.instructions.length)}function db(t){return t.map(e=>({id:e.id,pc:e.pc,status:e.status,locals:{...e.locals}}))}function pb(t,e){return t.threads.every((n,s)=>n.pc>=e[s])}function or(t,e){const n=Rr(t),s=n.map(()=>0);for(const o of e)if(!Number.isInteger(o)||o<0||o>=n.length||(s[o]+=1,s[o]>n[o]))return!1;return s.every((o,a)=>o===n[a])}function*yc(t,e){const n=Rr(t),s=t.createState();for(let o=0;o<e.length;o++){const a=e[o],r=s.threads[a],i=t.threads[a].instructions[r.pc];if(!i)continue;i.exec(s,a),r.pc+=1,r.pc>=n[a]&&(r.status="done");const l=pb(s,n);yield{threads:db(s.threads),sharedMem:{...s.shared},lockOwners:{...s.locks},lastAction:{threadId:a,instruction:i.label},violated:!t.invariant.holds(s,l),done:l}}}function fb(t,e){let n=-1,s=0;for(const o of yc(t,e))o.violated&&n===-1&&(n=s),s+=1;return{schedule:[...e],violates:n!==-1,firstViolationIndex:n}}const wc=6e3;function hb(t){let e="";for(const n of t)e+=String.fromCharCode(n);return btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function mb(t){const e=t.replace(/-/g,"+").replace(/_/g,"/");try{const n=atob(e),s=new Uint8Array(n.length);for(let o=0;o<n.length;o++)s[o]=n.charCodeAt(o);return s}catch{return}}function gb(t){return t.length>wc?null:hb(new TextEncoder().encode(t))}function bb(t){const e=mb(t);if(e!==void 0)try{const n=new TextDecoder("utf-8",{fatal:!0}).decode(e);return n.length>wc?void 0:n}catch{return}}const _r=2e4,vb=3e3,yb=5e3,wb=250,qs=500,xc=5,Ir=60,kc=22,Sc=60,ar=`// Write any sorting algorithm you like.
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
`;function yn(t){return String(t)}function wn(t){const e=dg(t);return e===null?void 0:e}function Zn(t){if(t.trim()==="")return;const e=Number(t);return Number.isInteger(e)?e:void 0}function Sa(t){const e=[];for(const n of t.split(",")){const s=Zn(n);if(s===void 0)return;e.push(s)}return e}const $a={algo:"bubble",size:45,speed:60};function xb(t){return{algo:{ref:t.algoKey,encode:e=>e===$a.algo?null:e,decode:e=>Jt(is,e)},size:{ref:t.size,encode:e=>e===$a.size?null:String(e),decode:e=>Qe(e,10,100),debounceMs:250},speed:{ref:t.speed,encode:e=>e===$a.speed?null:String(e),decode:e=>Qe(e,1,100),debounceMs:250},seed:{ref:t.seed,encode:yn,decode:wn}}}const co={algo:"binary",size:20,speed:60,target:0};function kb(t){return{algo:{ref:t.algoKey,encode:e=>e===co.algo?null:e,decode:e=>Jt(Jo,e)},size:{ref:t.size,encode:e=>e===co.size?null:String(e),decode:e=>Qe(e,10,50),debounceMs:250},speed:{ref:t.speed,encode:e=>e===co.speed?null:String(e),decode:e=>Qe(e,1,100),debounceMs:250},seed:{ref:t.seed,encode:yn,decode:wn},target:{ref:t.target,encode:e=>e===co.target?null:String(e),decode:e=>Qe(e,0,99)}}}function Sb(t,e){const n="bfs",o={row:Math.floor(e.rows/2),col:0},a={row:Math.floor(e.rows/2),col:e.cols-1},r=(i,l)=>i.row===l.row&&i.col===l.col;return{algo:{ref:t.algoKey,encode:i=>i===n?null:i,decode:i=>Jt(Qo,i)},speed:{ref:t.speed,encode:i=>i===60?null:String(i),decode:i=>Qe(i,1,100),debounceMs:250},seed:{ref:t.seed,encode:yn,decode:wn},start:{ref:t.start,encode:i=>r(i,o)?null:Fi(i),decode:i=>Hi(i,e.rows,e.cols)},end:{ref:t.end,encode:i=>r(i,a)?null:Fi(i),decode:i=>Hi(i,e.rows,e.cols)}}}function Ji(t){return C({get:()=>({row:t.row,col:t.col}),set:e=>{t.row=e.row,t.col=e.col}})}const Qi={algo:"bfs",speed:60};function $b(t){return{algo:{ref:t.algoKey,encode:e=>e===Qi.algo?null:e,decode:e=>Jt(Zo,e)},speed:{ref:t.speed,encode:e=>e===Qi.speed?null:String(e),decode:e=>Qe(e,1,100),debounceMs:250},seed:{ref:t.seed,encode:yn,decode:wn},start:{ref:t.startId,encode:e=>e===null?null:String(e),decode:e=>Qe(e,0,9999)}}}const Zi={size:kc,speed:Sc};function Eb(t){return{src:{ref:t.source,encode:e=>e===ar?null:gb(e),decode:bb,debounceMs:400},size:{ref:t.size,encode:e=>e===Zi.size?null:String(e),decode:e=>Qe(e,xc,Ir),debounceMs:250},speed:{ref:t.speed,encode:e=>e===Zi.speed?null:String(e),decode:e=>Qe(e,1,100),debounceMs:250},seed:{ref:t.seed,encode:yn,decode:wn}}}const el={scenario:ec,speed:60};function Cb(t,e){return{scenario:{ref:t.scenarioKey,encode:n=>n===el.scenario?null:n,decode:n=>Jt(zs,n)},speed:{ref:t.speed,encode:n=>n===el.speed?null:String(n),decode:n=>Qe(n,1,100),debounceMs:250},seed:{ref:t.seed,encode:yn,decode:wn},sched:{ref:C({get:()=>t.schedule.value.join(""),set:n=>{t.schedule.value=[...n].map(Number)}}),encode:n=>n===""?null:n,decode:n=>{if(/^[0-9]+$/.test(n))return or(e(),[...n].map(Number))?n:void 0}}}}const tl={algo:"fib",speed:60};function Ab(t,e){switch(t){case"scalar":{const n=Zn(e);return n===void 0?void 0:{kind:"scalar",n}}case"coins":{const n=e.split(":");if(n.length!==2)return;const s=Sa(n[0]),o=Zn(n[1]);return s===void 0||o===void 0?void 0:{kind:"coins",coins:s,amount:o}}case"sequence":{const n=Sa(e);return n===void 0?void 0:{kind:"sequence",values:n}}case"items":{const n=e.split(":");if(n.length!==2)return;const s=Zn(n[1]);if(s===void 0)return;const o=[];for(const a of n[0].split(",")){const r=a.split("/");if(r.length!==2)return;const i=Zn(r[0]),l=Zn(r[1]);if(i===void 0||l===void 0)return;o.push({weight:i,value:l})}return{kind:"items",items:o,capacity:s}}case"strings2":{const n=e.split(":");return n.length!==2?void 0:{kind:"strings2",a:n[0],b:n[1]}}case"chain":{const n=Sa(e);return n===void 0?void 0:{kind:"chain",dims:n}}}}function Tb(t,e){const n=t.indexOf(":"),s=n===-1?t:t.slice(0,n),o=n===-1?"":t.slice(n+1);if(s!==e.kind)return;const a=Ab(e.kind,o);if(a!==void 0)return _o(e,a)===null?a:void 0}function Ob(t){return{algo:{ref:t.algoKey,encode:e=>e===tl.algo?null:e,decode:e=>Jt(Kt,e)},speed:{ref:t.speed,encode:e=>e===tl.speed?null:String(e),decode:e=>Qe(e,1,100),debounceMs:250},seed:{ref:t.seed,encode:yn,decode:wn},in:{ref:t.input,encode:e=>{const n=js(e),s=js(Kt[t.algoKey.value].defaults);return n===s?null:n},decode:e=>Tb(e,Kt[t.algoKey.value])}}}const Ea={algo:"kruskal",n:8,speed:60};function nl(t){const e=n=>n>=0&&n<t;return{encodeOp:n=>n.kind==="union"?`u${n.a}.${n.b??n.a}`:`f${n.a}`,decodeOp:n=>{const s=/^([uf])(\d+)(?:\.(\d+))?$/.exec(n);if(s===null)return;const o=Number(s[2]);if(!e(o))return;if(s[1]==="f")return s[3]===void 0?{kind:"find",a:o}:void 0;if(s[3]===void 0)return;const a=Number(s[3]);return e(a)?{kind:"union",a:o,b:a}:void 0}}}function Mb(t){return{algo:{ref:t.algoKey,encode:e=>e===Ea.algo?null:e,decode:e=>Jt(ea,e)},n:{ref:t.nodeCount,encode:e=>e===Ea.n?null:String(e),decode:e=>Qe(e,dc,pc),debounceMs:250},speed:{ref:t.speed,encode:e=>e===Ea.speed?null:String(e),decode:e=>Qe(e,1,100),debounceMs:250},seed:{ref:t.seed,encode:yn,decode:wn},start:{ref:t.startId,encode:e=>e===null?null:String(e),decode:e=>Qe(e,0,9999)},ops:{ref:t.opScript,encode:e=>{const n=nl(t.nodeCount.value),s=jo(e,n),o=sr(t.nodeCount.value,t.seed.value);return s===jo(o,n)?null:s},decode:e=>ic(e,nl(t.nodeCount.value))}}}const xs={strategy:Zu,fn:Yu,capacity:8,threshold:.75,speed:60},Rb=25,_b=150,Ca=t=>Math.round(t*100),Ib={insert:"i",search:"s",delete:"d"},jb={i:"insert",s:"search",d:"delete"},Db=/^([isd])([A-Za-z0-9]{1,12})$/,Aa={encodeOp:t=>`${Ib[t.kind]}${t.key}`,decodeOp:t=>{const e=Db.exec(t);if(e!==null)return{kind:jb[e[1]],key:e[2]}}};function Pb(t){return{strategy:{ref:t.strategyKey,encode:e=>e===xs.strategy?null:e,decode:e=>Jt(na,e)},fn:{ref:t.hashFnKey,encode:e=>e===xs.fn?null:e,decode:e=>Jt(Vn,e)},cap:{ref:t.capacity,encode:e=>e===xs.capacity?null:String(e),decode:e=>Qe(e,4,64),debounceMs:250},thr:{ref:t.threshold,encode:e=>Ca(e)===Ca(xs.threshold)?null:String(Ca(e)),decode:e=>{const n=Qe(e,Rb,_b);return n===void 0?void 0:n/100},debounceMs:250},speed:{ref:t.speed,encode:e=>e===xs.speed?null:String(e),decode:e=>Qe(e,1,100),debounceMs:250},seed:{ref:t.seed,encode:yn,decode:wn},ops:{ref:t.script,encode:e=>{const n=jo(e,Aa),s=vc(t.seed.value);return n===jo(s,Aa)?null:n},decode:e=>ic(e,Aa)}}}function sl(t={}){const{syncUrl:e=!0,audio:n=!0}=t,s=Qs(),o=B(45),a=B(60),r=B("bubble"),i=B(ze()),l=B([]),u=Le({comparing:[],swapping:[],sorted:[]}),c=Le({comparisons:0,swaps:0}),d=B([]),p=C(()=>is[r.value]),m=B(1);function w(L){const I=st(i.value);return Array.from({length:L},()=>I.int(1,99))}function g(){u.comparing=[],u.swapping=[],u.sorted=[]}function v(){c.comparisons=0,c.swaps=0}const b=vn({speed:a,createGenerator:()=>(l.value=[...d.value],g(),v(),p.value.generator([...d.value])),applyStep:L=>{l.value=L.array,u.comparing=L.comparing,u.swapping=L.swapping,u.sorted=L.sorted,c.comparisons=L.comparisons,c.swaps=L.swaps},clearStep:()=>{l.value=[...d.value],g(),v()},onAdvance:n?L=>{var I;return s.play(((I=ro[r.value])==null?void 0:I.call(ro,L))??Xt)}:void 0});function y(){d.value=w(o.value),m.value=Math.max(...d.value,1),b.reset()}function S(L){L.length!==0&&(d.value=[...L],o.value=L.length,m.value=Math.max(...L,1),b.reset())}const $=C(()=>{var L;return((L=b.current.value)==null?void 0:L.line)??null}),_=C(()=>sc[r.value]),N=C(()=>{var I;const L=(I=b.current.value)==null?void 0:I.line;return L===void 0?[]:ug(r.value).get(L)??[]}),G=C(()=>r.value in ro);function j(){i.value=ze(),y()}return e&&Qt(xb({algoKey:r,size:o,speed:a,seed:i})),y(),{size:o,speed:a,algoKey:r,seed:i,array:l,baseArray:d,highlights:u,stats:c,maxValue:m,currentAlgo:p,status:b.status,isRunning:b.isRunning,isPaused:b.isPaused,isDone:b.isDone,canEdit:b.canEdit,delayMs:b.delayMs,elapsedMs:b.elapsedMs,stepCount:b.stepCount,cursor:b.cursor,bufferedCount:b.bufferedCount,fullyBuffered:b.fullyBuffered,current:b.current,activeLine:$,sourceCode:_,activeSourceLines:N,hasSoundCues:G,canStepBack:b.canStepBack,canStepForward:b.canStepForward,generate:y,randomizeSeed:j,setArray:S,run:b.run,pause:b.pause,reset:b.reset,stepForward:b.stepForward,stepBack:b.stepBack,seek:b.seek,skipToEnd:b.skipToEnd}}const Lb={bubble:["for i = 0 to n - 2","  for j = 0 to n - 2 - i","    if a[j] > a[j + 1]","      swap a[j] and a[j + 1]","  a[n - 1 - i] is now in its final position","done — array is sorted"],selection:["for i = 0 to n - 1","  min = i","  for j = i + 1 to n - 1","    if a[j] < a[min]: min = j","  if min != i","    swap a[i] and a[min]","  a[i] is now in its final position","done — array is sorted"],insertion:["for i = 1 to n - 1","  j = i","  while j > 0 and a[j - 1] > a[j]","    swap a[j - 1] and a[j]","    j = j - 1","done — array is sorted"],merge:["mergesort(lo, hi):","  if hi - lo <= 1: return","  mid = (lo + hi) / 2","  mergesort(lo, mid); mergesort(mid, hi)","  while both halves still have items","    compare a[i] and a[j]; move the smaller into buffer","  append whatever remains of either half","  copy the buffer back into a[lo..hi)","done — array is sorted"],quick:["quicksort(lo, hi):","  if lo >= hi: return","  pivot = a[hi]; i = lo","  for j = lo to hi - 1","    if a[j] < pivot","      swap a[i] and a[j]; i = i + 1","  swap a[i] and a[hi]   // pivot into its final position","  quicksort(lo, i - 1); quicksort(i + 1, hi)","done — array is sorted"],heap:["siftDown(root, hi):","  while root still has a child at or before hi","    child = the larger child of root","    if a[root] >= a[child]: stop","    swap a[root] and a[child]; root = child","build the max-heap: for i = n/2 - 1 down to 0","  siftDown(i, n - 1)","for end = n - 1 down to 1","  swap a[0] and a[end]   // the max lands in its final slot","  siftDown(0, end - 1)","done — array is sorted"],shell:["for gap = n/2; gap > 0; gap = gap/2","  for i = gap to n - 1","    j = i","    while j >= gap and a[j - gap] > a[j]","      swap a[j - gap] and a[j]","      j = j - gap","done — array is sorted"],comb:["gap = n; swapped = true","while gap > 1 or swapped","  gap = max(1, floor(gap / 1.3))","  swapped = false","  for i = 0 while i + gap < n","    if a[i] > a[i + gap]","      swap a[i] and a[i + gap]; swapped = true","done — array is sorted"],counting:["count = zeros, sized max(a) + 1","for i = 0 to n - 1","  count[a[i]] = count[a[i]] + 1","for v = 1 to max","  count[v] = count[v] + count[v - 1]   // where each value ends","for i = n - 1 down to 0   // backwards keeps equal values in order","  d = count[a[i]] - 1; count[a[i]] = d","  output[d] = a[i]","done — array is sorted"],radix:["for exp = 1, 10, 100, ... while max / exp > 0","  digit(v) = (v / exp) mod 10","  count = ten zeros","  for i = 0 to n - 1","    count[digit(a[i])] = count[digit(a[i])] + 1","  for d = 1 to 9","    count[d] = count[d] + count[d - 1]   // where each digit ends","  for i = n - 1 down to 0   // backwards keeps the pass stable","    k = count[digit(a[i])] - 1; count[digit(a[i])] = k","    output[k] = a[i]","  a = output   // now ordered by every digit up to exp","done — array is sorted"]},Nb={class:"av-card p-4 sm:p-5"},Bb={key:0,class:"mb-3 flex items-center justify-between"},Fb={class:"text-xs font-semibold uppercase tracking-wider text-ink-faint"},Hb={key:1,class:"mb-3 text-xs font-semibold uppercase tracking-wider text-ink-faint"},we=oe({__name:"AvPanel",props:{title:{}},setup(t){return(e,n)=>(x(),A("div",Nb,[e.$slots.header?(x(),A("div",Bb,[h("h2",Fb,R(t.title),1),So(e.$slots,"header")])):t.title?(x(),A("h2",Hb,R(t.title),1)):ge("",!0),So(e.$slots,"default")]))}}),Vb=["disabled","aria-pressed"],Ub="flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none",zb="rounded-xl bg-surface-alt px-3 py-2 text-xs font-semibold text-ink-muted transition-all hover:bg-surface-raised hover:text-ink disabled:cursor-not-allowed disabled:opacity-50",Z=oe({__name:"AvButton",props:{variant:{default:"neutral"},active:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1}},setup(t){const e=t,n={primary:"bg-ok text-ink-inverse shadow-md shadow-ok/30 hover:bg-ok/90",warning:"bg-warn text-ink-inverse shadow-md shadow-warn/30 hover:bg-warn/90",danger:"bg-danger text-ink-inverse shadow-md shadow-danger/30 hover:bg-danger/90",neutral:"bg-surface-alt text-ink hover:bg-surface-raised"},s={primary:"hover:shadow-lg",warning:"hover:shadow-lg",danger:"hover:shadow-lg",neutral:""},o={selector:{base:"rounded-xl px-3 py-2 text-sm font-medium transition-all disabled:cursor-not-allowed",on:"bg-accent text-accent-ink shadow-md shadow-accent/30",off:"bg-surface-alt text-ink-muted hover:bg-surface-raised hover:text-ink disabled:opacity-50"},toggle:{base:"rounded-lg px-3 py-1.5 text-xs font-semibold transition-all disabled:cursor-not-allowed",on:"bg-accent text-accent-ink shadow-sm",off:"text-ink-muted hover:bg-surface-raised hover:text-ink"}},a=C(()=>e.variant==="selector"||e.variant==="toggle"),r=C(()=>{const l=e.variant;if(l==="selector"||l==="toggle"){const u=o[l];return[u.base,e.active?u.on:u.off]}return l==="quiet"?zb:[Ub,n[l],s[l]]}),i=C(()=>a.value?e.active:void 0);return(l,u)=>(x(),A("button",{type:"button",class:de(r.value),disabled:t.disabled,"aria-pressed":i.value},[So(l.$slots,"default")],10,Vb))}}),qb={key:0,class:"mt-4 rounded-xl bg-surface-alt p-4"},Kb={class:"text-sm leading-relaxed text-ink-muted"},Gb={class:"mt-3 flex flex-wrap gap-2"},Wb={class:"uppercase tracking-wide text-[10px] text-ink-faint"},Yb={class:"font-mono font-semibold text-accent"},An=oe({__name:"AvAlgorithmSelector",props:Un({algorithms:{},title:{default:"Algorithm"},disabled:{type:Boolean,default:!1},columns:{default:2}},{modelValue:{required:!0},modelModifiers:{}}),emits:["update:modelValue"],setup(t){const e=t,n=zn(t,"modelValue"),s=C(()=>Object.keys(e.algorithms)),o=C(()=>e.algorithms[n.value]),a=C(()=>o.value?Object.entries(o.value.complexity):[]),r={2:"grid grid-cols-2 gap-2",3:"grid grid-cols-2 gap-2 sm:grid-cols-3",4:"grid grid-cols-2 gap-2 sm:grid-cols-4"},i=C(()=>r[e.columns]);function l(u){e.disabled||(n.value=u)}return(u,c)=>(x(),Y(we,{title:t.title},{default:D(()=>[h("div",{class:de(i.value)},[(x(!0),A(ne,null,fe(s.value,d=>(x(),Y(Z,{key:d,variant:"selector",active:d===n.value,disabled:t.disabled,onClick:p=>l(d)},{default:D(()=>[M(R(t.algorithms[d].name),1)]),_:2},1032,["active","disabled","onClick"]))),128))],2),o.value?(x(),A("div",qb,[h("p",Kb,R(o.value.description),1),h("div",Gb,[(x(!0),A(ne,null,fe(a.value,([d,p])=>(x(),A("span",{key:d,class:"inline-flex items-center gap-1 rounded-lg bg-surface-raised px-2.5 py-1 text-xs font-medium text-ink-muted shadow-sm"},[h("span",Wb,R(d),1),h("span",Yb,R(p),1)]))),128)),o.value.stable!==void 0?(x(),A("span",{key:0,class:de(["inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium shadow-sm",o.value.stable?"bg-ok-soft text-ok-ink":"bg-warn-soft text-warn-ink"])},R(o.value.stable?"Stable":"Unstable"),3)):ge("",!0)])])):ge("",!0)]),_:1},8,["title"]))}}),Xb={class:"block"},Jb={class:"mb-1.5 flex items-center justify-between text-sm"},Qb={class:"font-medium text-ink-muted"},Zb={class:"font-mono text-accent"},ev=["min","max","step","value","disabled","aria-valuetext"],Ve=oe({__name:"AvSlider",props:Un({label:{},min:{},max:{},step:{default:1},suffix:{default:""},disabled:{type:Boolean,default:!1}},{modelValue:{required:!0},modelModifiers:{}}),emits:["update:modelValue"],setup(t){const e=t,n=zn(t,"modelValue"),s=C(()=>`${n.value}${e.suffix}`);function o(a){n.value=Number(a.target.value)}return(a,r)=>(x(),A("label",Xb,[h("div",Jb,[h("span",Qb,R(t.label),1),h("span",Zb,R(s.value),1)]),h("input",{type:"range",min:t.min,max:t.max,step:t.step,value:n.value,disabled:t.disabled,"aria-valuetext":s.value,class:"w-full",onInput:o},null,40,ev)]))}}),tv={class:"space-y-4"},nv={key:1,class:"mt-2 text-center text-xs text-slate-400"},sv={class:"mt-2 grid grid-cols-2 gap-2"},ov=oe({__name:"ControlsPanel",props:{size:{},speed:{},status:{},canEdit:{type:Boolean},isRunning:{type:Boolean},isPaused:{type:Boolean},compare:{type:Boolean,default:!1},sound:{type:Boolean,default:!1},volume:{default:.4},hasSoundCues:{type:Boolean,default:!0}},emits:["update:size","update:speed","update:compare","update:sound","update:volume","generate","run","runBoth","pause","reset"],setup(t,{emit:e}){const n=t,s=e;function o(){n.compare?s("runBoth"):s("run")}return(a,r)=>(x(),Y(we,{title:"Controls"},{default:D(()=>[h("div",tv,[T(Ve,{label:"Array size","model-value":t.size,min:10,max:100,disabled:!t.canEdit,"onUpdate:modelValue":r[0]||(r[0]=i=>s("update:size",i))},null,8,["model-value","disabled"]),T(Ve,{label:"Speed","model-value":t.speed,min:1,max:100,suffix:"%","onUpdate:modelValue":r[1]||(r[1]=i=>s("update:speed",i))},null,8,["model-value"])]),T(Z,{variant:"toggle",class:"mt-5 w-full",active:t.compare,disabled:!t.canEdit,onClick:r[2]||(r[2]=i=>s("update:compare",!t.compare))},{default:D(()=>[...r[8]||(r[8]=[M(" Compare two algorithms ",-1)])]),_:1},8,["active","disabled"]),T(Z,{variant:"toggle",class:"mt-2 w-full",active:t.sound,onClick:r[3]||(r[3]=i=>s("update:sound",!t.sound))},{default:D(()=>[...r[9]||(r[9]=[M(" Sound cues ",-1)])]),_:1},8,["active"]),t.sound?(x(),Y(Ve,{key:0,label:"Volume",class:"mt-3","model-value":Math.round(t.volume*100),min:0,max:100,suffix:"%","onUpdate:modelValue":r[4]||(r[4]=i=>s("update:volume",i/100))},null,8,["model-value"])):ge("",!0),t.sound&&!t.hasSoundCues?(x(),A("p",nv," Sound cues aren't mapped for this algorithm yet. ")):ge("",!0),h("div",sv,[t.isRunning?(x(),Y(Z,{key:1,variant:"warning",class:"col-span-2",onClick:r[5]||(r[5]=i=>s("pause"))},{default:D(()=>[...r[11]||(r[11]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M6 4h4v16H6zM14 4h4v16h-4z"})],-1),M(" Pause ",-1)])]),_:1})):(x(),Y(Z,{key:0,variant:"primary",class:"col-span-2",onClick:o},{default:D(()=>[r[10]||(r[10]=h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M8 5v14l11-7z"})],-1)),M(" "+R(t.isPaused?"Resume":"Run"),1)]),_:1})),T(Z,{variant:"neutral",onClick:r[6]||(r[6]=i=>s("reset"))},{default:D(()=>[...r[12]||(r[12]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.36 2.64L3 8"}),h("path",{d:"M3 3v5h5"})],-1),M(" Reset ",-1)])]),_:1}),T(Z,{variant:"neutral",disabled:!t.canEdit,onClick:r[7]||(r[7]=i=>s("generate"))},{default:D(()=>[...r[13]||(r[13]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"})],-1),M(" Shuffle ",-1)])]),_:1},8,["disabled"])]),r[14]||(r[14]=h("p",{class:"mt-3 text-center text-xs text-slate-400"}," Size & algorithm lock while a sort is running. ",-1))]),_:1}))}}),av={key:1,class:"text-sm text-slate-400 dark:text-slate-500"},rv={class:"mt-3 grid grid-cols-3 gap-2"},xn=oe({__name:"PlaybackScrubber",props:{cursor:{},bufferedCount:{},fullyBuffered:{type:Boolean},canStepBack:{type:Boolean},canStepForward:{type:Boolean}},emits:["seek","step-back","step-forward","skip-to-end"],setup(t,{emit:e}){const n=e;return(s,o)=>(x(),Y(we,{title:"History"},{default:D(()=>[t.bufferedCount>0?(x(),Y(Ve,{key:0,label:"Step",min:0,max:Math.max(0,t.bufferedCount-1),suffix:` / ${Math.max(0,t.bufferedCount-1)}`,"model-value":t.cursor,"onUpdate:modelValue":o[0]||(o[0]=a=>n("seek",a))},null,8,["max","suffix","model-value"])):(x(),A("p",av,"Press Run or Step to begin.")),h("div",rv,[T(Z,{variant:"quiet",disabled:!t.canStepBack,onClick:o[1]||(o[1]=a=>n("step-back"))},{default:D(()=>[...o[4]||(o[4]=[M(" ◀ Step ",-1)])]),_:1},8,["disabled"]),T(Z,{variant:"quiet",disabled:!t.canStepForward,onClick:o[2]||(o[2]=a=>n("step-forward"))},{default:D(()=>[...o[5]||(o[5]=[M(" Step ▶ ",-1)])]),_:1},8,["disabled"]),T(Z,{variant:"quiet",disabled:t.fullyBuffered&&t.cursor===t.bufferedCount-1,onClick:o[3]||(o[3]=a=>n("skip-to-end"))},{default:D(()=>[...o[6]||(o[6]=[M(" Skip to end ",-1)])]),_:1},8,["disabled"])])]),_:1}))}}),iv={class:"flex gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800/50"},lv={key:0,class:"mb-2 font-mono text-[0.65rem] uppercase tracking-wider text-slate-400 dark:text-slate-500"},uv={key:1,class:"text-xs text-slate-400 dark:text-slate-500"},cv=["data-active"],dv={class:"whitespace-pre font-mono"},oa=oe({__name:"CodePanel",props:{lines:{},source:{},sourceFile:{default:""},activeLine:{default:null},activeSourceLines:{default:()=>[]},title:{default:"Code"}},setup(t){const e=t,n=B("pseudo"),s=C(()=>e.source.split(`
`)),o=C(()=>n.value==="source"?s.value:e.lines);function a(c){return n.value==="source"?e.activeSourceLines.includes(c):c===e.activeLine}const r=/^\s*(\/\/|\/\*|\*)/;function i(c){return n.value==="source"&&r.test(c)}const l=C(()=>n.value==="source"?e.activeSourceLines[0]??null:e.activeLine),u=B(null);return _e([l,n],async()=>{var d,p;if(l.value===null)return;await ps();const c=(d=u.value)==null?void 0:d.querySelector('[data-active="true"]');(p=c==null?void 0:c.scrollIntoView)==null||p.call(c,{block:"nearest"})}),(c,d)=>(x(),Y(we,{title:t.title,class:"max-h-96 overflow-y-auto"},{header:D(()=>[h("div",iv,[T(Z,{variant:"toggle",active:n.value==="pseudo",onClick:d[0]||(d[0]=p=>n.value="pseudo")},{default:D(()=>[...d[2]||(d[2]=[M(" Pseudocode ",-1)])]),_:1},8,["active"]),T(Z,{variant:"toggle",active:n.value==="source",onClick:d[1]||(d[1]=p=>n.value="source")},{default:D(()=>[...d[3]||(d[3]=[M(" Source ",-1)])]),_:1},8,["active"])])]),default:D(()=>[n.value==="source"&&t.sourceFile?(x(),A("p",lv,R(t.sourceFile),1)):ge("",!0),o.value.length===0?(x(),A("p",uv," Pseudocode isn't written for this algorithm yet — switch to Source to watch the generator itself. ")):(x(),A("ol",{key:2,ref_key:"list",ref:u,class:"space-y-0.5 text-xs"},[(x(!0),A(ne,null,fe(o.value,(p,m)=>(x(),A("li",{key:m,"data-active":a(m),class:de(["flex gap-3 rounded px-1.5 py-0.5 transition-colors",a(m)?"bg-amber-400/20 text-amber-800 dark:text-amber-300":i(p)?"text-slate-400/70 dark:text-slate-600":"text-slate-500 dark:text-slate-400"])},[h("span",{class:de(["w-5 flex-none text-right tabular-nums",a(m)?"font-semibold text-amber-600 dark:text-amber-400":"text-slate-400 dark:text-slate-600"])},R(m+1),3),h("span",dv,R(p),1)],10,cv))),128))],512))]),_:1},8,["title"]))}}),pv={class:"block"},fv={class:"mb-1.5 flex items-center justify-between text-sm"},hv={class:"font-medium text-ink-muted"},mv=["value","placeholder","disabled","aria-invalid"],gv={key:0,class:"mt-1.5 text-xs text-danger-ink"},kt=oe({__name:"AvTextField",props:Un({label:{},placeholder:{default:""},error:{default:null},disabled:{type:Boolean,default:!1},monospace:{type:Boolean,default:!1}},{modelValue:{required:!0},modelModifiers:{}}),emits:["update:modelValue"],setup(t){const e=zn(t,"modelValue");function n(s){e.value=s.target.value}return(s,o)=>(x(),A("label",pv,[h("div",fv,[h("span",hv,R(t.label),1)]),h("input",{type:"text",value:e.value,placeholder:t.placeholder,disabled:t.disabled,"aria-invalid":!!t.error,class:de(["w-full rounded-xl border bg-surface-raised px-3 py-2 text-sm text-ink transition-colors disabled:cursor-not-allowed disabled:opacity-50",[t.monospace?"font-mono":"",t.error?"border-danger ring-1 ring-danger":"border-line"]]),onInput:n},null,42,mv),t.error?(x(),A("p",gv,R(t.error),1)):ge("",!0)]))}}),bv={class:"space-y-4"},vv={class:"mt-4 grid grid-cols-2 gap-2"},$c=oe({__name:"DatasetPanel",props:{seed:{},custom:{},error:{},canEdit:{type:Boolean}},emits:["update:seed","update:custom","apply","randomize"],setup(t,{emit:e}){const n=e;function s(o){const a=Number(o);Number.isInteger(a)&&n("update:seed",a)}return(o,a)=>(x(),Y(we,{title:"Dataset"},{default:D(()=>[h("div",bv,[T(kt,{label:"Seed",monospace:"","model-value":String(t.seed),disabled:!t.canEdit,"onUpdate:modelValue":s},null,8,["model-value","disabled"]),T(kt,{label:"Custom array",monospace:"",placeholder:"e.g. 5, 3, 9, 1","model-value":t.custom,error:t.error,disabled:!t.canEdit,"onUpdate:modelValue":a[0]||(a[0]=r=>n("update:custom",r))},null,8,["model-value","error","disabled"])]),h("div",vv,[T(Z,{variant:"quiet",disabled:!t.canEdit,onClick:a[1]||(a[1]=r=>n("apply"))},{default:D(()=>[...a[3]||(a[3]=[M("Apply",-1)])]),_:1},8,["disabled"]),T(Z,{variant:"quiet",disabled:!t.canEdit,onClick:a[2]||(a[2]=r=>n("randomize"))},{default:D(()=>[...a[4]||(a[4]=[M("New seed",-1)])]),_:1},8,["disabled"])]),a[5]||(a[5]=h("p",{class:"mt-3 text-xs text-slate-400"},"The same seed always reproduces the same data.",-1))]),_:1}))}}),Gt={idle:"bg-tone-idle-soft",probe:"bg-tone-probe-soft",active:"bg-tone-active-soft",settled:"bg-tone-settled-soft",rejected:"bg-tone-rejected-soft",blocked:"bg-tone-blocked-soft"},Nn={idle:"text-tone-idle-ink",probe:"text-tone-probe-ink",active:"text-tone-active-ink",settled:"text-tone-settled-ink",rejected:"text-tone-rejected-ink",trace:"text-tone-trace-ink",blocked:"text-tone-blocked-ink"},gt={idle:"border-tone-idle/60",probe:"border-tone-probe/60",active:"border-tone-active/60",settled:"border-tone-settled/60",rejected:"border-tone-rejected/60",trace:"border-tone-trace/60",blocked:"border-tone-blocked/60"},ft={idle:"fill-tone-idle",probe:"fill-tone-probe",active:"fill-tone-active",settled:"fill-tone-settled",rejected:"fill-tone-rejected"},vt={idle:"stroke-tone-idle",probe:"stroke-tone-probe",active:"stroke-tone-active",settled:"stroke-tone-settled",rejected:"stroke-tone-rejected",trace:"stroke-tone-trace",blocked:"stroke-tone-blocked"},ot={idle:"viz-mark bg-tone-idle [--tone-pat:var(--av-tone-idle-pat)]",probe:"viz-mark bg-tone-probe [--tone-pat:var(--av-tone-probe-pat)]",active:"viz-mark bg-tone-active [--tone-pat:var(--av-tone-active-pat)]",settled:"viz-mark bg-tone-settled [--tone-pat:var(--av-tone-settled-pat)]",rejected:"viz-mark bg-tone-rejected [--tone-pat:var(--av-tone-rejected-pat)]",trace:"viz-mark bg-tone-trace [--tone-pat:var(--av-tone-trace-pat)]",blocked:"viz-mark bg-tone-blocked [--tone-pat:var(--av-tone-blocked-pat)]"},yv={idle:"Untouched",probe:"Comparing",active:"Current",settled:"Settled",rejected:"Rejected",trace:"Path",blocked:"Blocked"};function kn(t){return t.map(e=>typeof e=="string"?{tone:e,label:yv[e]}:e)}const wv={class:"flex flex-wrap items-center gap-3 text-xs text-ink-muted"},Mn=oe({__name:"AvLegend",props:{items:{}},setup(t){return(e,n)=>(x(),A("div",wv,[(x(!0),A(ne,null,fe(t.items,s=>(x(),A("span",{key:s.label,class:"flex items-center gap-1.5"},[h("i",{class:de(["h-3 w-3 rounded-mark",f(ot)[s.tone]])},null,2),M(R(s.label),1)]))),128))]))}}),xv={class:"mb-3 flex flex-wrap items-center gap-x-4 gap-y-2"},kv={class:"text-xs font-semibold uppercase tracking-wider text-ink-faint"},Sv={class:"flex min-h-[280px] flex-1 items-end gap-[2px] rounded-xl bg-surface-alt p-3 sm:gap-1"},$v={key:0,class:"nums mb-1 text-[10px] font-medium text-ink-faint sm:text-xs"},bo=oe({__name:"BarChart",props:{array:{},comparing:{default:()=>[]},swapping:{default:()=>[]},sorted:{default:()=>[]},maxValue:{default:1},title:{default:"Visualization"},showLegend:{type:Boolean,default:!0}},setup(t){const e=t,n=C(()=>new Set(e.comparing)),s=C(()=>new Set(e.swapping)),o=C(()=>new Set(e.sorted)),a=C(()=>e.array.length<=25);function r(u){return s.value.has(u)?ot.active:n.value.has(u)?ot.probe:o.value.has(u)?ot.settled:ot.idle}const i=kn([{tone:"idle",label:"Unsorted"},{tone:"probe",label:"Comparing"},{tone:"active",label:"Swapping"},{tone:"settled",label:"Sorted"}]);function l(u){return`${u/e.maxValue*98+2}%`}return(u,c)=>(x(),Y(we,{class:"flex h-full flex-col"},{default:D(()=>[h("div",xv,[h("h2",kv,R(t.title),1),t.showLegend?(x(),Y(Mn,{key:0,items:f(i)},null,8,["items"])):ge("",!0)]),h("div",Sv,[(x(!0),A(ne,null,fe(t.array,(d,p)=>(x(),A("div",{key:p,class:"flex flex-1 flex-col items-center justify-end",style:{height:"100%"}},[a.value?(x(),A("span",$v,R(d),1)):ge("",!0),h("div",{class:de(["w-full rounded-t-mark transition-[height,background-color] duration-150 ease-out",r(p)]),style:cn({height:l(d)})},null,6)]))),128))])]),_:1}))}}),Ev={class:"rounded-xl bg-surface-alt p-3 text-center"},Cv={class:"nums font-mono text-xl font-bold text-ink sm:text-2xl"},Av={class:"mt-0.5 text-[11px] font-medium uppercase tracking-wide text-ink-faint"},jt=oe({__name:"AvStatCell",props:{label:{},value:{}},setup(t){return(e,n)=>(x(),A("div",Ev,[h("div",Cv,R(t.value),1),h("div",Av,R(t.label),1)]))}}),Tv={class:"grid grid-cols-2 gap-2 sm:grid-cols-4"},vo=oe({__name:"StatsDisplay",props:{comparisons:{},swaps:{},steps:{},elapsedMs:{},status:{}},setup(t){const e=t,n=C(()=>`${(e.elapsedMs/1e3).toFixed(2)}s`),s=C(()=>({idle:"Idle",running:"Running",paused:"Paused",done:"Sorted"})[e.status]??e.status),o=C(()=>({idle:"bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",running:"bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400",paused:"bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400",done:"bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400"})[e.status]),a=C(()=>[{label:"Comparisons",value:e.comparisons.toLocaleString()},{label:"Swaps",value:e.swaps.toLocaleString()},{label:"Steps",value:e.steps.toLocaleString()},{label:"Elapsed",value:n.value}]);return(r,i)=>(x(),Y(we,{title:"Stats"},{header:D(()=>[h("span",{class:de(["rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",o.value])},R(s.value),3)]),default:D(()=>[h("div",Tv,[(x(!0),A(ne,null,fe(a.value,l=>(x(),Y(jt,{key:l.label,label:l.label,value:l.value},null,8,["label","value"]))),128))])]),_:1}))}}),Ov={class:"grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]"},Mv={class:"flex flex-col gap-4"},Rv={key:0,class:"grid gap-4 lg:grid-cols-2"},_v={class:"flex flex-col gap-4"},Iv={class:"flex flex-col gap-4"},jv={key:1,class:"flex flex-col gap-4"},Dv=oe({__name:"SortingView",setup(t){const e=sl(),n=Qs(),s=sl({syncUrl:!1,audio:!1}),o=B(!1);Qt({cmp:{ref:o,encode:u=>u?"1":null,decode:u=>u==="1"},algo2:{ref:s.algoKey,encode:u=>u,decode:u=>Jt(is,u)}}),_e([e.baseArray,o],()=>{o.value&&s.setArray([...e.baseArray.value])},{immediate:!0}),_e(e.speed,u=>s.speed.value=u,{immediate:!0}),_e(o,u=>{u||s.reset()});function a(){e.run(),s.run()}const r=B(""),i=B(null);function l(){const{values:u,error:c}=Dn(r.value);i.value=c,c||e.setArray(u)}return _e(e.size,()=>{e.canEdit.value&&e.generate()}),_e(e.seed,()=>{e.canEdit.value&&e.generate()}),_e(e.algoKey,()=>{e.isDone.value&&e.reset()}),(u,c)=>(x(),A("div",Ov,[h("div",Mv,[T(An,{modelValue:f(e).algoKey.value,"onUpdate:modelValue":c[0]||(c[0]=d=>f(e).algoKey.value=d),algorithms:f(is),columns:3,disabled:!f(e).canEdit.value},null,8,["modelValue","algorithms","disabled"]),o.value?(x(),Y(An,{key:0,modelValue:f(s).algoKey.value,"onUpdate:modelValue":c[1]||(c[1]=d=>f(s).algoKey.value=d),title:"Compare against",algorithms:f(is),columns:3,disabled:!f(e).canEdit.value},null,8,["modelValue","algorithms","disabled"])):ge("",!0),T(ov,{size:f(e).size.value,"onUpdate:size":c[2]||(c[2]=d=>f(e).size.value=d),speed:f(e).speed.value,"onUpdate:speed":c[3]||(c[3]=d=>f(e).speed.value=d),compare:o.value,"onUpdate:compare":c[4]||(c[4]=d=>o.value=d),status:f(e).status.value,"can-edit":f(e).canEdit.value,"is-running":f(e).isRunning.value,"is-paused":f(e).isPaused.value,sound:f(n).enabled.value,volume:f(n).volume.value,"has-sound-cues":f(e).hasSoundCues.value,onGenerate:c[5]||(c[5]=d=>f(e).generate()),onRun:c[6]||(c[6]=d=>f(e).run()),onRunBoth:c[7]||(c[7]=d=>a()),onPause:c[8]||(c[8]=d=>{f(e).pause(),f(s).pause()}),onReset:c[9]||(c[9]=d=>{f(e).reset(),f(s).reset()}),"onUpdate:sound":c[10]||(c[10]=d=>f(n).toggle()),"onUpdate:volume":c[11]||(c[11]=d=>f(n).setVolume(d))},null,8,["size","speed","compare","status","can-edit","is-running","is-paused","sound","volume","has-sound-cues"]),T($c,{custom:r.value,"onUpdate:custom":c[12]||(c[12]=d=>r.value=d),seed:f(e).seed.value,error:i.value,"can-edit":f(e).canEdit.value,"onUpdate:seed":c[13]||(c[13]=d=>f(e).seed.value=d),onApply:c[14]||(c[14]=d=>l()),onRandomize:c[15]||(c[15]=d=>f(e).randomizeSeed())},null,8,["custom","seed","error","can-edit"]),T(xn,{cursor:f(e).cursor.value,"buffered-count":f(e).bufferedCount.value,"fully-buffered":f(e).fullyBuffered.value,"can-step-back":f(e).canStepBack.value,"can-step-forward":f(e).canStepForward.value,onSeek:c[16]||(c[16]=d=>f(e).seek(d)),onStepBack:c[17]||(c[17]=d=>f(e).stepBack()),onStepForward:c[18]||(c[18]=d=>f(e).stepForward()),onSkipToEnd:c[19]||(c[19]=d=>f(e).skipToEnd())},null,8,["cursor","buffered-count","fully-buffered","can-step-back","can-step-forward"]),T(oa,{lines:f(Lb)[f(e).algoKey.value]??[],"active-line":f(e).activeLine.value,source:f(e).sourceCode.value.text,"source-file":f(e).sourceCode.value.file,"active-source-lines":f(e).activeSourceLines.value},null,8,["lines","active-line","source","source-file","active-source-lines"])]),o.value?(x(),A("div",Rv,[h("div",_v,[T(vo,{comparisons:f(e).stats.comparisons,swaps:f(e).stats.swaps,steps:f(e).stepCount.value,"elapsed-ms":f(e).elapsedMs.value,status:f(e).status.value},null,8,["comparisons","swaps","steps","elapsed-ms","status"]),T(bo,{class:"flex-1",title:f(e).currentAlgo.value.name,array:f(e).array.value,comparing:f(e).highlights.comparing,swapping:f(e).highlights.swapping,sorted:f(e).highlights.sorted,"max-value":f(e).maxValue.value},null,8,["title","array","comparing","swapping","sorted","max-value"])]),h("div",Iv,[T(vo,{comparisons:f(s).stats.comparisons,swaps:f(s).stats.swaps,steps:f(s).stepCount.value,"elapsed-ms":f(s).elapsedMs.value,status:f(s).status.value},null,8,["comparisons","swaps","steps","elapsed-ms","status"]),T(bo,{class:"flex-1",title:f(s).currentAlgo.value.name,"show-legend":!1,array:f(s).array.value,comparing:f(s).highlights.comparing,swapping:f(s).highlights.swapping,sorted:f(s).highlights.sorted,"max-value":f(s).maxValue.value},null,8,["title","array","comparing","swapping","sorted","max-value"])])])):(x(),A("div",jv,[T(vo,{comparisons:f(e).stats.comparisons,swaps:f(e).stats.swaps,steps:f(e).stepCount.value,"elapsed-ms":f(e).elapsedMs.value,status:f(e).status.value},null,8,["comparisons","swaps","steps","elapsed-ms","status"]),T(bo,{class:"flex-1",array:f(e).array.value,comparing:f(e).highlights.comparing,swapping:f(e).highlights.swapping,sorted:f(e).highlights.sorted,"max-value":f(e).maxValue.value},null,8,["array","comparing","swapping","sorted","max-value"])]))]))}});function Pv(){const t=B(20),e=B(60),n=B("binary"),s=B(ze()),o=B(0),a=B([]),r=Le({low:null,high:null,mid:null,checking:null}),i=B(null),l=Le({comparisons:0});let u=[];const c=C(()=>Jo[n.value]),d=B(1);function p(N){const G=st(s.value);return Array.from({length:N},()=>G.int(1,99)).sort((j,L)=>j-L)}function m(){r.low=null,r.high=null,r.mid=null,r.checking=null}function w(){l.comparisons=0}function g(N=st(ze())){u.length!==0&&(o.value=u[N.int(0,u.length-1)])}function v(){const N=new Set(u);for(let G=0;G<=100;G++)if(!N.has(G)){o.value=G;return}o.value=-1}const b=vn({speed:e,createGenerator:()=>(a.value=[...u],m(),w(),i.value=null,c.value.generator([...u],o.value)),applyStep:N=>{a.value=N.array,r.low=N.low,r.high=N.high,r.mid=N.mid,r.checking=N.checking,i.value=N.foundIndex,l.comparisons=N.comparisons},clearStep:()=>{a.value=[...u],m(),w(),i.value=null}});function y(N=!1){u=p(t.value),a.value=[...u],d.value=Math.max(...u,1),b.reset(),N||g(st(s.value))}function S(N){N.length!==0&&(u=[...N].sort((G,j)=>G-j),a.value=[...u],t.value=u.length,d.value=Math.max(...u,1),b.reset(),g(st(s.value)))}function $(){s.value=ze(),y()}const{hydrated:_}=Qt(kb({algoKey:n,size:t,speed:e,seed:s,target:o}));return y(_.has("target")),{size:t,speed:e,algoKey:n,seed:s,target:o,array:a,highlights:r,foundIndex:i,stats:l,maxValue:d,currentAlgo:c,status:b.status,isRunning:b.isRunning,isPaused:b.isPaused,isDone:b.isDone,canEdit:b.canEdit,delayMs:b.delayMs,elapsedMs:b.elapsedMs,stepCount:b.stepCount,cursor:b.cursor,bufferedCount:b.bufferedCount,fullyBuffered:b.fullyBuffered,current:b.current,canStepBack:b.canStepBack,canStepForward:b.canStepForward,generate:y,randomizeSeed:$,setArray:S,pickPresentTarget:g,pickMissingTarget:v,run:b.run,pause:b.pause,reset:b.reset,stepForward:b.stepForward,stepBack:b.stepBack,seek:b.seek,skipToEnd:b.skipToEnd}}const Lv={class:"space-y-4"},Nv={class:"block"},Bv=["value","disabled"],Fv={class:"mt-3 grid grid-cols-2 gap-2"},Hv={class:"mt-5 grid grid-cols-2 gap-2"},Vv=oe({__name:"SearchControls",props:{size:{},speed:{},target:{},status:{},canEdit:{type:Boolean},isRunning:{type:Boolean},isPaused:{type:Boolean}},emits:["update:size","update:speed","update:target","pick-present-target","pick-missing-target","generate","run","pause","reset"],setup(t,{emit:e}){const n=e,s=o=>n("update:target",Number(o.target.value));return(o,a)=>(x(),Y(we,{title:"Controls"},{default:D(()=>[h("div",Lv,[T(Ve,{label:"Array size","model-value":t.size,min:10,max:50,disabled:!t.canEdit,"onUpdate:modelValue":a[0]||(a[0]=r=>n("update:size",r))},null,8,["model-value","disabled"]),T(Ve,{label:"Speed","model-value":t.speed,min:1,max:100,suffix:"%","onUpdate:modelValue":a[1]||(a[1]=r=>n("update:speed",r))},null,8,["model-value"]),h("label",Nv,[a[8]||(a[8]=h("div",{class:"mb-1.5 flex items-center justify-between text-sm"},[h("span",{class:"font-medium text-slate-600 dark:text-slate-300"},"Target")],-1)),h("input",{type:"number",value:t.target,disabled:!t.canEdit,class:"w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100",onInput:s},null,40,Bv)])]),h("div",Fv,[T(Z,{variant:"quiet",disabled:!t.canEdit,onClick:a[2]||(a[2]=r=>n("pick-present-target"))},{default:D(()=>[...a[9]||(a[9]=[M(" Random present target ",-1)])]),_:1},8,["disabled"]),T(Z,{variant:"quiet",disabled:!t.canEdit,onClick:a[3]||(a[3]=r=>n("pick-missing-target"))},{default:D(()=>[...a[10]||(a[10]=[M(" Random missing target ",-1)])]),_:1},8,["disabled"])]),h("div",Hv,[t.isRunning?(x(),Y(Z,{key:1,variant:"warning",class:"col-span-2",onClick:a[5]||(a[5]=r=>n("pause"))},{default:D(()=>[...a[12]||(a[12]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M6 4h4v16H6zM14 4h4v16h-4z"})],-1),M(" Pause ",-1)])]),_:1})):(x(),Y(Z,{key:0,variant:"primary",class:"col-span-2",onClick:a[4]||(a[4]=r=>n("run"))},{default:D(()=>[a[11]||(a[11]=h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M8 5v14l11-7z"})],-1)),M(" "+R(t.isPaused?"Resume":"Run"),1)]),_:1})),T(Z,{variant:"neutral",onClick:a[6]||(a[6]=r=>n("reset"))},{default:D(()=>[...a[13]||(a[13]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.36 2.64L3 8"}),h("path",{d:"M3 3v5h5"})],-1),M(" Reset ",-1)])]),_:1}),T(Z,{variant:"neutral",disabled:!t.canEdit,onClick:a[7]||(a[7]=r=>n("generate"))},{default:D(()=>[...a[14]||(a[14]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"})],-1),M(" Shuffle ",-1)])]),_:1},8,["disabled"])]),a[15]||(a[15]=h("p",{class:"mt-3 text-center text-xs text-slate-400"}," Size, algorithm & target lock while a search is running. ",-1))]),_:1}))}}),Uv={class:"mb-3 flex flex-wrap items-center gap-x-4 gap-y-2"},zv={class:"flex min-h-[280px] flex-1 items-end gap-[2px] rounded-xl bg-surface-alt p-3 sm:gap-1"},qv={key:0,class:"mb-1 text-[10px] font-medium text-ink-faint sm:text-xs"},Kv=oe({__name:"SearchBarChart",props:{array:{},low:{default:null},high:{default:null},checking:{default:null},foundIndex:{default:null},maxValue:{default:1}},setup(t){const e=t,n=C(()=>e.array.length<=25),s=C(()=>e.low!==null&&e.high!==null&&!(e.low===0&&e.high===e.array.length-1)),o=kn([{tone:"idle",label:"Default"},{tone:"trace",label:"Active range"},{tone:"probe",label:"Checking"},{tone:"settled",label:"Found"}]);function a(i){return e.foundIndex!==null&&i===e.foundIndex?ot.settled:e.checking!==null&&i===e.checking?ot.probe:s.value&&i>=e.low&&i<=e.high?ot.trace:ot.idle}function r(i){return`${i/e.maxValue*98+2}%`}return(i,l)=>(x(),Y(we,{class:"flex h-full flex-col"},{default:D(()=>[h("div",Uv,[l[0]||(l[0]=h("h2",{class:"text-xs font-semibold uppercase tracking-wider text-ink-faint"},"Visualization",-1)),T(Mn,{items:f(o)},null,8,["items"])]),h("div",zv,[(x(!0),A(ne,null,fe(t.array,(u,c)=>(x(),A("div",{key:c,class:"flex flex-1 flex-col items-center justify-end",style:{height:"100%"}},[n.value?(x(),A("span",qv,R(u),1)):ge("",!0),h("div",{class:de(["w-full rounded-t-mark transition-[height,background-color] duration-150 ease-out",a(c)]),style:cn({height:r(u)})},null,6)]))),128))])]),_:1}))}}),Gv={class:"grid grid-cols-3 gap-2"},Wv=oe({__name:"SearchStats",props:{comparisons:{},steps:{},elapsedMs:{},status:{},foundIndex:{default:null}},setup(t){const e=t,n=C(()=>`${(e.elapsedMs/1e3).toFixed(2)}s`),s=C(()=>({idle:"Idle",running:"Running",paused:"Paused",done:"Done"})[e.status]??e.status),o=C(()=>({idle:"bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",running:"bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400",paused:"bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400",done:"bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400"})[e.status]),a=C(()=>[{label:"Comparisons",value:e.comparisons.toLocaleString()},{label:"Steps",value:e.steps.toLocaleString()},{label:"Elapsed",value:n.value}]),r=C(()=>e.status==="done"),i=C(()=>e.foundIndex!==null);return(l,u)=>(x(),Y(we,{title:"Stats"},{header:D(()=>[h("span",{class:de(["rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",o.value])},R(s.value),3)]),default:D(()=>[r.value?(x(),A("div",{key:0,class:de(["mb-3 rounded-xl p-3 text-center text-sm font-semibold",i.value?"bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400":"bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"])},R(i.value?`Found at index ${t.foundIndex}`:"Not found"),3)):ge("",!0),h("div",Gv,[(x(!0),A(ne,null,fe(a.value,c=>(x(),Y(jt,{key:c.label,label:c.label,value:c.value},null,8,["label","value"]))),128))])]),_:1}))}}),Yv={class:"grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]"},Xv={class:"flex flex-col gap-4"},Jv={class:"flex flex-col gap-4"},Qv=oe({__name:"SearchView",setup(t){const e=Pv(),n=B(""),s=B(null);function o(){const{values:a,error:r}=Dn(n.value);s.value=r,r||e.setArray(a)}return _e(e.size,()=>{e.canEdit.value&&e.generate()}),_e(e.seed,()=>{e.canEdit.value&&e.generate()}),_e(e.algoKey,()=>{e.isDone.value&&e.reset()}),(a,r)=>(x(),A("div",Yv,[h("div",Xv,[T(An,{modelValue:f(e).algoKey.value,"onUpdate:modelValue":r[0]||(r[0]=i=>f(e).algoKey.value=i),algorithms:f(Jo),columns:3,disabled:!f(e).canEdit.value},null,8,["modelValue","algorithms","disabled"]),T(Vv,{size:f(e).size.value,"onUpdate:size":r[1]||(r[1]=i=>f(e).size.value=i),speed:f(e).speed.value,"onUpdate:speed":r[2]||(r[2]=i=>f(e).speed.value=i),target:f(e).target.value,"onUpdate:target":r[3]||(r[3]=i=>f(e).target.value=i),status:f(e).status.value,"can-edit":f(e).canEdit.value,"is-running":f(e).isRunning.value,"is-paused":f(e).isPaused.value,onPickPresentTarget:r[4]||(r[4]=i=>f(e).pickPresentTarget()),onPickMissingTarget:r[5]||(r[5]=i=>f(e).pickMissingTarget()),onGenerate:r[6]||(r[6]=i=>f(e).generate()),onRun:r[7]||(r[7]=i=>f(e).run()),onPause:r[8]||(r[8]=i=>f(e).pause()),onReset:r[9]||(r[9]=i=>f(e).reset())},null,8,["size","speed","target","status","can-edit","is-running","is-paused"]),T($c,{custom:n.value,"onUpdate:custom":r[10]||(r[10]=i=>n.value=i),seed:f(e).seed.value,error:s.value,"can-edit":f(e).canEdit.value,"onUpdate:seed":r[11]||(r[11]=i=>f(e).seed.value=i),onApply:r[12]||(r[12]=i=>o()),onRandomize:r[13]||(r[13]=i=>f(e).randomizeSeed())},null,8,["custom","seed","error","can-edit"]),T(xn,{cursor:f(e).cursor.value,"buffered-count":f(e).bufferedCount.value,"fully-buffered":f(e).fullyBuffered.value,"can-step-back":f(e).canStepBack.value,"can-step-forward":f(e).canStepForward.value,onSeek:r[14]||(r[14]=i=>f(e).seek(i)),onStepBack:r[15]||(r[15]=i=>f(e).stepBack()),onStepForward:r[16]||(r[16]=i=>f(e).stepForward()),onSkipToEnd:r[17]||(r[17]=i=>f(e).skipToEnd())},null,8,["cursor","buffered-count","fully-buffered","can-step-back","can-step-forward"])]),h("div",Jv,[T(Wv,{comparisons:f(e).stats.comparisons,steps:f(e).stepCount.value,"elapsed-ms":f(e).elapsedMs.value,status:f(e).status.value,"found-index":f(e).foundIndex.value},null,8,["comparisons","steps","elapsed-ms","status","found-index"]),T(Kv,{class:"flex-1",array:f(e).array.value,low:f(e).highlights.low,high:f(e).highlights.high,checking:f(e).highlights.checking,"found-index":f(e).foundIndex.value,"max-value":f(e).maxValue.value},null,8,["array","low","high","checking","found-index","max-value"])])]))}}),Yn=15,ks=25,po=(t,e)=>`${t},${e}`;function Zv(){const t=B(60),e=B("bfs"),n=Le(new Set),s=Le({row:Math.floor(Yn/2),col:0}),o=Le({row:Math.floor(Yn/2),col:ks-1}),a=B(ze());Qt(Sb({algoKey:e,speed:t,seed:a,start:Ji(s),end:Ji(o)},{rows:Yn,cols:ks}));const r=B([]),i=B([]),l=B([]),u=Le({visitedCount:0,pathLength:0}),c=C(()=>Qo[e.value]);function d(N,G){return s.row===N&&s.col===G}function p(N,G){return o.row===N&&o.col===G}function m(){const N=Array.from({length:Yn},()=>Array(ks).fill(0));for(const G of n){const[j,L]=G.split(",").map(Number);N[j][L]=1}return N}function w(){r.value=[],i.value=[],l.value=[]}function g(){u.visitedCount=0,u.pathLength=0}const v=vn({speed:t,createGenerator:()=>(w(),g(),c.value.generator(m(),{...s},{...o})),applyStep:N=>{r.value=N.visited,i.value=N.frontier,l.value=N.path,u.visitedCount=N.visited.length,u.pathLength=N.path.length},clearStep:()=>{w(),g()}});function b(N,G){if(!v.canEdit.value||d(N,G)||p(N,G))return;const j=po(N,G);n.has(j)?n.delete(j):n.add(j),v.isDone.value&&v.reset()}function y(){v.canEdit.value&&(n.clear(),v.reset())}function S(N,G){v.canEdit.value&&(p(N,G)||n.has(po(N,G))||(s.row=N,s.col=G,v.reset()))}function $(N,G){v.canEdit.value&&(d(N,G)||n.has(po(N,G))||(o.row=N,o.col=G,v.reset()))}function _(N=.25){if(!v.canEdit.value)return;const G=st(a.value);n.clear();for(let j=0;j<Yn;j++)for(let L=0;L<ks;L++)d(j,L)||p(j,L)||G.next()<N&&n.add(po(j,L));v.reset()}return{rows:Yn,cols:ks,speed:t,algoKey:e,walls:n,start:s,end:o,seed:a,visited:r,frontier:i,path:l,stats:u,currentAlgo:c,status:v.status,isRunning:v.isRunning,isPaused:v.isPaused,isDone:v.isDone,canEdit:v.canEdit,delayMs:v.delayMs,elapsedMs:v.elapsedMs,stepCount:v.stepCount,cursor:v.cursor,bufferedCount:v.bufferedCount,fullyBuffered:v.fullyBuffered,current:v.current,canStepBack:v.canStepBack,canStepForward:v.canStepForward,toggleWall:b,clearWalls:y,placeStart:S,placeEnd:$,randomizeWalls:_,run:v.run,pause:v.pause,reset:v.reset,stepForward:v.stepForward,stepBack:v.stepBack,seek:v.seek,skipToEnd:v.skipToEnd}}const e0={class:"mt-5 grid grid-cols-2 gap-2"},t0=oe({__name:"PathfindingControls",props:{speed:{},status:{},canEdit:{type:Boolean},isRunning:{type:Boolean},isPaused:{type:Boolean}},emits:["update:speed","run","pause","reset","clear-walls","randomize-walls"],setup(t,{emit:e}){const n=e;return(s,o)=>(x(),Y(we,{title:"Controls"},{default:D(()=>[T(Ve,{label:"Speed","model-value":t.speed,min:1,max:100,suffix:"%","onUpdate:modelValue":o[0]||(o[0]=a=>n("update:speed",a))},null,8,["model-value"]),h("div",e0,[t.isRunning?(x(),Y(Z,{key:1,variant:"warning",class:"col-span-2",onClick:o[2]||(o[2]=a=>n("pause"))},{default:D(()=>[...o[7]||(o[7]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M6 4h4v16H6zM14 4h4v16h-4z"})],-1),M(" Pause ",-1)])]),_:1})):(x(),Y(Z,{key:0,variant:"primary",class:"col-span-2",onClick:o[1]||(o[1]=a=>n("run"))},{default:D(()=>[o[6]||(o[6]=h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M8 5v14l11-7z"})],-1)),M(" "+R(t.isPaused?"Resume":"Run"),1)]),_:1})),T(Z,{variant:"neutral",onClick:o[3]||(o[3]=a=>n("reset"))},{default:D(()=>[...o[8]||(o[8]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.36 2.64L3 8"}),h("path",{d:"M3 3v5h5"})],-1),M(" Reset ",-1)])]),_:1}),T(Z,{variant:"neutral",disabled:!t.canEdit,onClick:o[4]||(o[4]=a=>n("clear-walls"))},{default:D(()=>[...o[9]||(o[9]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m2 0-1 14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1L5 6"})],-1),M(" Clear Walls ",-1)])]),_:1},8,["disabled"]),T(Z,{variant:"neutral",disabled:!t.canEdit,class:"col-span-2",onClick:o[5]||(o[5]=a=>n("randomize-walls"))},{default:D(()=>[...o[10]||(o[10]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"})],-1),M(" Random Walls ",-1)])]),_:1},8,["disabled"])]),o[11]||(o[11]=h("p",{class:"mt-3 text-center text-xs text-slate-400"}," Walls, start, and end lock while a search is running. ",-1))]),_:1}))}}),n0={class:"mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2"},s0={class:"mb-3 grid grid-cols-3 gap-2"},o0=["aria-label"],a0=["data-key","tabindex","aria-label","onPointerdown","onPointerenter","onKeydown"],r0={key:0,class:"flex h-[70%] w-[70%] items-center justify-center rounded-full bg-ok text-[8px] font-bold text-ink-inverse shadow"},i0={key:1,class:"flex h-[70%] w-[70%] items-center justify-center rounded-full bg-danger text-[8px] font-bold text-ink-inverse shadow"},l0=oe({__name:"GridCanvas",props:{rows:{},cols:{},walls:{},start:{},end:{},visited:{default:()=>[]},frontier:{default:()=>[]},path:{default:()=>[]},canEdit:{type:Boolean}},emits:["toggle-wall","place-start","place-end"],setup(t,{emit:e}){const n=t,s=e,o=(P,J)=>`${P},${J}`,a=B("wall"),r={wall:"Draw Walls",start:"Move Start",end:"Move End"},i=Object.entries(r),l=C(()=>new Set(n.visited.map(P=>o(P.row,P.col)))),u=C(()=>new Set(n.frontier.map(P=>o(P.row,P.col)))),c=C(()=>new Set(n.path.map(P=>o(P.row,P.col)))),d=C(()=>{const P=[];for(let J=0;J<n.rows;J++){const le=[];for(let K=0;K<n.cols;K++)le.push({row:J,col:K,key:o(J,K)});P.push(le)}return P});function p(P,J){return n.start.row===P&&n.start.col===J}function m(P,J){return n.end.row===P&&n.end.col===J}const w=kn([{tone:"blocked",label:"Wall"},{tone:"probe",label:"Frontier"},{tone:"settled",label:"Visited"},{tone:"trace",label:"Path"}]);function g(P){const J=P.key;return n.walls.has(J)?ot.blocked:c.value.has(J)?ot.trace:u.value.has(J)?ot.probe:l.value.has(J)?ot.settled:"bg-surface-alt"}function v(P){return p(P.row,P.col)?"start":m(P.row,P.col)?"end":n.walls.has(P.key)?"wall":c.value.has(P.key)?"path":u.value.has(P.key)?"frontier":l.value.has(P.key)?"visited":"empty"}function b(P){return`Row ${P.row+1}, column ${P.col+1}, ${v(P)}`}const y=C(()=>`Pathfinding grid, ${r[a.value]} mode`),S=B(!1);let $=!0;function _(){S.value=!1}wr(()=>{window.addEventListener("pointerup",_),window.addEventListener("pointercancel",_)}),xr(()=>{window.removeEventListener("pointerup",_),window.removeEventListener("pointercancel",_)});const N=B({row:0,col:0}),G=B(null),j=(P,J)=>Math.min(Math.max(P,0),J-1);function L(P,J){var le,K;N.value={row:P,col:J},(K=(le=G.value)==null?void 0:le.querySelector(`[data-key="${P},${J}"]`))==null||K.focus()}function I(P,J,le){L(j(P.row+J,n.rows),j(P.col+le,n.cols))}function he(P){if(n.canEdit){if(N.value={row:P.row,col:P.col},a.value==="start"){s("place-start",{row:P.row,col:P.col});return}if(a.value==="end"){s("place-end",{row:P.row,col:P.col});return}p(P.row,P.col)||m(P.row,P.col)||($=!n.walls.has(P.key),s("toggle-wall",{row:P.row,col:P.col}),S.value=!0)}}function Se(P,J){var le,K;(K=(le=P.currentTarget).releasePointerCapture)==null||K.call(le,P.pointerId),he(J)}function z(P){he(P),S.value=!1}function ae(P){if(!n.canEdit||a.value!=="wall"||!S.value||p(P.row,P.col)||m(P.row,P.col))return;n.walls.has(P.key)!==$&&s("toggle-wall",{row:P.row,col:P.col})}return(P,J)=>(x(),Y(we,{class:"flex h-full flex-col"},{default:D(()=>[h("div",n0,[J[1]||(J[1]=h("h2",{class:"text-xs font-semibold uppercase tracking-wider text-ink-faint"},"Grid",-1)),T(Mn,{items:f(w)},null,8,["items"])]),h("div",s0,[(x(!0),A(ne,null,fe(f(i),([le,K])=>(x(),Y(Z,{key:le,variant:"toggle",active:a.value===le,disabled:!t.canEdit,onClick:re=>a.value=le},{default:D(()=>[M(R(K),1)]),_:2},1032,["active","disabled","onClick"]))),128))]),h("div",{ref_key:"gridEl",ref:G,role:"grid","aria-label":y.value,"aria-describedby":"grid-help",class:de(["grid flex-1 select-none gap-px rounded-xl bg-line p-1",t.canEdit?"touch-none":""]),style:cn({gridTemplateColumns:`repeat(${t.cols}, minmax(0, 1fr))`,gridTemplateRows:`repeat(${t.rows}, minmax(0, 1fr))`,aspectRatio:`${t.cols} / ${t.rows}`}),onDragstart:J[0]||(J[0]=tn(()=>{},["prevent"]))},[(x(!0),A(ne,null,fe(d.value,(le,K)=>(x(),A("div",{key:K,role:"row",class:"contents"},[(x(!0),A(ne,null,fe(le,re=>(x(),A("div",{key:re.key,role:"gridcell","data-key":re.key,tabindex:N.value.row===re.row&&N.value.col===re.col?0:-1,"aria-label":b(re),class:de(["relative flex items-center justify-center rounded-mark transition-colors duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent",[g(re),t.canEdit?"cursor-pointer":"cursor-default"]]),onPointerdown:tn($e=>Se($e,re),["prevent"]),onPointerenter:$e=>ae(re),onKeydown:[Rt(tn($e=>I(re,-1,0),["prevent"]),["up"]),Rt(tn($e=>I(re,1,0),["prevent"]),["down"]),Rt(tn($e=>I(re,0,-1),["prevent"]),["left"]),Rt(tn($e=>I(re,0,1),["prevent"]),["right"]),Rt(tn($e=>L(re.row,0),["prevent"]),["home"]),Rt(tn($e=>L(re.row,t.cols-1),["prevent"]),["end"]),Rt(tn($e=>z(re),["prevent"]),["space"]),Rt($e=>z(re),["enter"])]},[p(re.row,re.col)?(x(),A("span",r0,"S")):m(re.row,re.col)?(x(),A("span",i0,"E")):ge("",!0)],42,a0))),128))]))),128))],46,o0),J[2]||(J[2]=h("p",{id:"grid-help",class:"mt-3 text-center text-xs text-ink-faint"}," Drag or press Space to draw walls. Arrow keys move, Enter places. Switch mode to relocate start/end. ",-1))]),_:1}))}}),u0={class:"grid grid-cols-3 gap-2"},c0={key:0,class:"mt-3 rounded-xl bg-emerald-50 px-3 py-2 text-center text-sm font-semibold text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"},d0={key:1,class:"mt-3 rounded-xl bg-amber-50 px-3 py-2 text-center text-sm font-semibold text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"},p0=oe({__name:"PathfindingStats",props:{visitedCount:{},pathLength:{},elapsedMs:{},status:{}},setup(t){const e=t,n=C(()=>`${(e.elapsedMs/1e3).toFixed(2)}s`),s=C(()=>({idle:"Idle",running:"Running",paused:"Paused",done:"Finished"})[e.status]??e.status),o=C(()=>({idle:"bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",running:"bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400",paused:"bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400",done:"bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400"})[e.status]),a=C(()=>[{label:"Visited",value:e.visitedCount.toLocaleString()},{label:"Path Length",value:e.pathLength.toLocaleString()},{label:"Elapsed",value:n.value}]),r=C(()=>e.status==="done"&&e.pathLength>0),i=C(()=>e.status==="done"&&e.pathLength===0),l=C(()=>Math.max(e.pathLength-1,0));return(u,c)=>(x(),Y(we,{title:"Stats"},{header:D(()=>[h("span",{class:de(["rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",o.value])},R(s.value),3)]),default:D(()=>[h("div",u0,[(x(!0),A(ne,null,fe(a.value,d=>(x(),Y(jt,{key:d.label,label:d.label,value:d.value},null,8,["label","value"]))),128))]),r.value?(x(),A("div",c0," Path found ("+R(l.value)+" steps) ",1)):i.value?(x(),A("div",d0," No path exists ")):ge("",!0)]),_:1}))}}),f0={class:"grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]"},h0={class:"flex flex-col gap-4"},m0={class:"flex flex-col gap-4"},g0=oe({__name:"PathfindingView",setup(t){const e=Zv();return _e(e.algoKey,()=>{e.isDone.value&&e.reset()}),(n,s)=>(x(),A("div",f0,[h("div",h0,[T(An,{modelValue:f(e).algoKey.value,"onUpdate:modelValue":s[0]||(s[0]=o=>f(e).algoKey.value=o),algorithms:f(Qo),columns:3,disabled:!f(e).canEdit.value},null,8,["modelValue","algorithms","disabled"]),T(t0,{speed:f(e).speed.value,"onUpdate:speed":s[1]||(s[1]=o=>f(e).speed.value=o),status:f(e).status.value,"can-edit":f(e).canEdit.value,"is-running":f(e).isRunning.value,"is-paused":f(e).isPaused.value,onRun:s[2]||(s[2]=o=>f(e).run()),onPause:s[3]||(s[3]=o=>f(e).pause()),onReset:s[4]||(s[4]=o=>f(e).reset()),onClearWalls:s[5]||(s[5]=o=>f(e).clearWalls()),onRandomizeWalls:s[6]||(s[6]=o=>f(e).randomizeWalls())},null,8,["speed","status","can-edit","is-running","is-paused"]),T(xn,{cursor:f(e).cursor.value,"buffered-count":f(e).bufferedCount.value,"fully-buffered":f(e).fullyBuffered.value,"can-step-back":f(e).canStepBack.value,"can-step-forward":f(e).canStepForward.value,onSeek:s[7]||(s[7]=o=>f(e).seek(o)),onStepBack:s[8]||(s[8]=o=>f(e).stepBack()),onStepForward:s[9]||(s[9]=o=>f(e).stepForward()),onSkipToEnd:s[10]||(s[10]=o=>f(e).skipToEnd())},null,8,["cursor","buffered-count","fully-buffered","can-step-back","can-step-forward"])]),h("div",m0,[T(p0,{"visited-count":f(e).stats.visitedCount,"path-length":f(e).stats.pathLength,"elapsed-ms":f(e).elapsedMs.value,status:f(e).status.value},null,8,["visited-count","path-length","elapsed-ms","status"]),T(l0,{class:"flex-1",rows:f(e).rows,cols:f(e).cols,walls:f(e).walls,start:f(e).start,end:f(e).end,visited:f(e).visited.value,frontier:f(e).frontier.value,path:f(e).path.value,"can-edit":f(e).canEdit.value,onToggleWall:s[11]||(s[11]=o=>f(e).toggleWall(o.row,o.col)),onPlaceStart:s[12]||(s[12]=o=>f(e).placeStart(o.row,o.col)),onPlaceEnd:s[13]||(s[13]=o=>f(e).placeEnd(o.row,o.col))},null,8,["rows","cols","walls","start","end","visited","frontier","path","can-edit"])])]))}});let b0=1;function Ta(t){return{id:b0++,value:t,left:null,right:null}}function St(t){return t?{id:t.id,value:t.value,left:St(t.left),right:St(t.right)}:null}function*ol(t,e){const n=St(t);if(!n){const o=Ta(e);yield{tree:St(o),visiting:o.id,phase:"inserted",done:!0};return}let s=n;for(;;)if(yield{tree:St(n),visiting:s.id,phase:"searching",done:!1},e<s.value){if(!s.left){s.left=Ta(e),yield{tree:St(n),visiting:s.left.id,phase:"inserted",done:!0};return}s=s.left}else{if(!s.right){s.right=Ta(e),yield{tree:St(n),visiting:s.right.id,phase:"inserted",done:!0};return}s=s.right}}function*v0(t,e){const n=St(t);let s=n,o=null;for(;s&&s.value!==e;)yield{tree:St(n),visiting:s.id,phase:"searching",done:!1},o=s,s=e<s.value?s.left:s.right;if(!s){yield{tree:St(n),visiting:null,phase:"not-found",done:!0};return}yield{tree:St(n),visiting:s.id,phase:"removing",done:!1};const a=s.id;if(s.left&&s.right){let r=s,i=s.right;for(;i.left;)r=i,i=i.left;s.value=i.value,r.left===i?r.left=i.right:r.right=i.right}else{const r=s.left||s.right;if(!o){yield{tree:r?St(r):null,visiting:null,phase:"deleted",done:!0};return}o.left===s?o.left=r:o.right=r}yield{tree:St(n),visiting:a,phase:"deleted",done:!0}}function y0(){const t=B(null),e=B("idle"),n=B(60),s=Le({comparisons:0,steps:0}),o=B(null),a=B(null),r=B(ze());let i=null;const l=Mr(n),u=C(()=>e.value!=="running");function c(){i!==null&&(clearTimeout(i),i=null)}function d(){s.comparisons=0,s.steps=0}function p(y){t.value=y.tree,o.value=y.visiting??null,a.value=y.phase,y.phase==="searching"&&(s.comparisons+=1),s.steps+=1}function m(y,S){d(),e.value="running";function $(){const{value:_,done:N}=y.next();if(N||!_){e.value="done";return}if(p(_),_.done){e.value="done";return}i=setTimeout($,l.value)}$()}function w(y){u.value&&(typeof y!="number"||!Number.isFinite(y)||m(ol(t.value,y)))}function g(y){u.value&&(typeof y!="number"||!Number.isFinite(y)||m(v0(t.value,y)))}function v(){c(),t.value=null,o.value=null,a.value=null,d(),e.value="idle"}function b(y){if(!u.value)return;c();const S=Math.min(Math.max(0,Math.floor(y)),200),$=new Set;let _=t.value,N=0;const G=st(r.value);for(;$.size<S&&N<S*50+100;){N+=1;const j=G.int(1,999);if($.has(j))continue;$.add(j);let L;for(const I of ol(_,j))L=I;_=L.tree}t.value=_,o.value=null,a.value=null,d(),e.value="idle"}return Ho(c),{tree:t,status:e,speed:n,stats:s,visiting:o,phase:a,seedValue:r,canEdit:u,insert:w,remove:g,reset:v,seed:b}}const w0={class:"block"},x0=["disabled"],k0={class:"mt-3 grid grid-cols-2 gap-2"},S0={class:"mt-4 grid grid-cols-2 gap-2"},$0=oe({__name:"BstControls",props:{canEdit:{type:Boolean},speed:{}},emits:["insert","remove","seed","reset","update:speed"],setup(t,{emit:e}){const n=t,s=e,o=B(""),a=C(()=>String(o.value).trim()===""?!1:Number.isFinite(Number(o.value)));function r(){!a.value||!n.canEdit||(s("insert",Number(o.value)),o.value="")}function i(){!a.value||!n.canEdit||(s("remove",Number(o.value)),o.value="")}return(l,u)=>(x(),Y(we,{title:"BST Controls"},{default:D(()=>[h("label",w0,[u[4]||(u[4]=h("span",{class:"mb-1.5 block text-sm font-medium text-slate-600 dark:text-slate-300"},"Value",-1)),Os(h("input",{"onUpdate:modelValue":u[0]||(u[0]=c=>o.value=c),type:"number",placeholder:"e.g. 42",disabled:!t.canEdit,class:"w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition-colors focus:border-indigo-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100",onKeyup:Rt(r,["enter"])},null,40,x0),[[Mo,o.value]])]),h("div",k0,[T(Z,{variant:"primary",disabled:!t.canEdit||!a.value,onClick:r},{default:D(()=>[...u[5]||(u[5]=[M(" Insert ",-1)])]),_:1},8,["disabled"]),T(Z,{variant:"danger",disabled:!t.canEdit||!a.value,onClick:i},{default:D(()=>[...u[6]||(u[6]=[M(" Delete ",-1)])]),_:1},8,["disabled"])]),T(Ve,{label:"Speed",class:"mt-4","model-value":t.speed,min:1,max:100,suffix:"%","onUpdate:modelValue":u[1]||(u[1]=c=>s("update:speed",c))},null,8,["model-value"]),h("div",S0,[T(Z,{variant:"neutral",disabled:!t.canEdit,onClick:u[2]||(u[2]=c=>s("seed",10))},{default:D(()=>[...u[7]||(u[7]=[M(" Seed random tree ",-1)])]),_:1},8,["disabled"]),T(Z,{variant:"neutral",disabled:!t.canEdit,onClick:u[3]||(u[3]=c=>s("reset"))},{default:D(()=>[...u[8]||(u[8]=[M(" Reset ",-1)])]),_:1},8,["disabled"])]),u[9]||(u[9]=h("p",{class:"mt-3 text-center text-xs text-slate-400"}," Controls lock while an insert/delete animation is playing. ",-1))]),_:1}))}}),E0=["viewBox"],C0=["x1","y1","x2","y2"],A0=["cx","cy"],T0=["x","y"],Ec=oe({__name:"TreeDiagram",props:{nodes:{},edges:{},viewBoxWidth:{default:600},viewBoxHeight:{default:320}},setup(t){const e=t,n={default:{fill:ft.idle,stroke:vt.idle},visiting:{fill:ft.probe,stroke:vt.probe},removing:{fill:ft.active,stroke:vt.active},inserted:{fill:ft.settled,stroke:vt.settled}};function s(a){return n[a??"default"]??n.default}function o(a){return e.nodes.find(r=>r.id===a)}return(a,r)=>(x(),A("svg",{viewBox:`0 0 ${t.viewBoxWidth} ${t.viewBoxHeight}`,class:"h-full w-full",preserveAspectRatio:"xMidYMin meet"},[(x(!0),A(ne,null,fe(t.edges,(i,l)=>{var u,c,d,p;return x(),A("line",{key:`edge-${l}`,x1:(u=o(i.from))==null?void 0:u.x,y1:(c=o(i.from))==null?void 0:c.y,x2:(d=o(i.to))==null?void 0:d.x,y2:(p=o(i.to))==null?void 0:p.y,class:"stroke-line","stroke-width":"2"},null,8,C0)}),128)),(x(!0),A(ne,null,fe(t.nodes,i=>(x(),A("g",{key:i.id},[h("circle",{cx:i.x,cy:i.y,r:"18","stroke-width":"2",class:de(["transition-all duration-300",[s(i.state).fill,s(i.state).stroke]])},null,10,A0),h("text",{x:i.x,y:i.y,"text-anchor":"middle","dominant-baseline":"central",class:"select-none fill-ink-inverse text-xs font-semibold"},R(i.value),9,T0)]))),128))],8,E0))}}),O0={class:"grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]"},M0={class:"flex flex-col gap-4"},R0={class:"flex flex-col gap-4"},_0={class:"grid grid-cols-2 gap-2"},I0={key:0,class:"text-sm text-slate-400"},al=50,rl=60,il=40,ll=40,j0=oe({__name:"BstView",setup(t){const e=y0();function n(c){const d=[],p=[];let m=0;function w(g,v){if(!g)return;w(g.left,v+1);const b=il+m*al,y=ll+v*rl;m+=1,d.push({id:g.id,x:b,y,value:g.value,node:g,depth:v}),w(g.right,v+1),g.left&&p.push({from:g.id,to:g.left.id}),g.right&&p.push({from:g.id,to:g.right.id})}return w(c,0),{nodes:d,edges:p,slotCount:m}}const s=C(()=>n(e.tree.value)),o=C(()=>s.value.nodes.map(c=>({id:c.id,x:c.x,y:c.y,value:c.value,state:c.id===e.visiting.value?a(e.phase.value):"default"})));function a(c){return c==="searching"?"visiting":c==="removing"?"removing":c==="inserted"||c==="deleted"?"inserted":"default"}const r=C(()=>s.value.edges),i=C(()=>Math.max(320,il*2+s.value.slotCount*al)),l=C(()=>{const c=s.value.nodes.reduce((d,p)=>Math.max(d,p.depth),0);return Math.max(200,ll*2+c*rl)}),u=C(()=>e.tree.value===null);return(c,d)=>(x(),A("div",O0,[h("div",M0,[T($0,{"can-edit":f(e).canEdit.value,speed:f(e).speed.value,onInsert:d[0]||(d[0]=p=>f(e).insert(p)),onRemove:d[1]||(d[1]=p=>f(e).remove(p)),onSeed:d[2]||(d[2]=p=>f(e).seed(p)),onReset:d[3]||(d[3]=p=>f(e).reset()),"onUpdate:speed":d[4]||(d[4]=p=>f(e).speed.value=p)},null,8,["can-edit","speed"])]),h("div",R0,[T(we,{title:"Stats"},{header:D(()=>[h("span",{class:de(["rounded-full px-2.5 py-0.5 text-xs font-semibold",{"bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400":f(e).status.value==="idle","bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400":f(e).status.value==="running","bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400":f(e).status.value==="done"}])},R(f(e).status.value==="running"?"Running":f(e).status.value==="done"?"Done":"Idle"),3)]),default:D(()=>[h("div",_0,[T(jt,{label:"Comparisons",value:String(f(e).stats.comparisons)},null,8,["value"]),T(jt,{label:"Steps",value:String(f(e).stats.steps)},null,8,["value"])])]),_:1}),T(we,{class:"flex min-h-[320px] flex-1 items-center justify-center"},{default:D(()=>[u.value?(x(),A("p",I0," The tree is empty — insert a value to get started. ")):(x(),Y(Ec,{key:1,nodes:o.value,edges:r.value,"view-box-width":i.value,"view-box-height":l.value,class:"max-h-[60vh]"},null,8,["nodes","edges","view-box-width","view-box-height"]))]),_:1})])]))}});function rr(t,e,n){return n?t<e:t>e}function*ul(t,e,n){const s=[...t,e];let o=s.length-1;for(;o>0;){const a=o-1>>1;if(yield{heap:[...s],comparing:[o,a],swapping:[],done:!1},rr(s[o],s[a],n))[s[o],s[a]]=[s[a],s[o]],yield{heap:[...s],comparing:[],swapping:[o,a],done:!1},o=a;else break}yield{heap:[...s],comparing:[],swapping:[],done:!0}}function*D0(t,e){if(t.length===0){yield{heap:[],comparing:[],swapping:[],done:!0,extracted:null};return}const n=[...t],s=n[0],o=n.pop();if(n.length===0){yield{heap:[],comparing:[],swapping:[],done:!0,extracted:s};return}n[0]=o;let a=0;const r=n.length;for(;;){const i=2*a+1,l=2*a+2;let u=a;if(i<r&&(yield{heap:[...n],comparing:[u,i],swapping:[],done:!1},rr(n[i],n[u],e)&&(u=i)),l<r&&(yield{heap:[...n],comparing:[u,l],swapping:[],done:!1},rr(n[l],n[u],e)&&(u=l)),u===a)break;[n[a],n[u]]=[n[u],n[a]],yield{heap:[...n],comparing:[],swapping:[a,u],done:!1},a=u}yield{heap:[...n],comparing:[],swapping:[],done:!0,extracted:s}}function P0(){const t=B([]),e=B(!0),n=B("idle"),s=B(60),o=Le({comparing:[],swapping:[]}),a=Le({comparisons:0,swaps:0,steps:0}),r=B(null),i=B(ze());let l=null;const u=Mr(s),c=C(()=>n.value!=="running");function d(){l!==null&&(clearTimeout(l),l=null)}function p(){a.comparisons=0,a.swaps=0,a.steps=0}function m(){o.comparing=[],o.swapping=[]}function w(_){t.value=_.heap,o.comparing=_.comparing,o.swapping=_.swapping,_.comparing.length>0&&(a.comparisons+=1),_.swapping.length>0&&(a.swaps+=1),a.steps+=1}function g(_,N){p(),m(),n.value="running";function G(){const{value:j,done:L}=_.next();if(L||!j){n.value="done";return}if(w(j),j.done){"extracted"in j&&(r.value=j.extracted),m(),n.value="done";return}l=setTimeout(G,u.value)}G()}function v(_){c.value&&(typeof _!="number"||!Number.isFinite(_)||g(ul(t.value,_,e.value)))}function b(){c.value&&g(D0(t.value,e.value))}function y(){c.value&&(e.value=!e.value)}function S(){d(),t.value=[],r.value=null,m(),p(),n.value="idle"}function $(_){if(!c.value)return;d();const N=Math.min(Math.max(0,Math.floor(_)),200),G=st(i.value);let j=t.value;for(let L=0;L<N;L++){const I=G.int(1,99);let he;for(const Se of ul(j,I,e.value))he=Se;j=he.heap}t.value=j,m(),p(),n.value="idle"}return Ho(d),{heap:t,isMinHeap:e,status:n,speed:s,highlights:o,stats:a,lastExtracted:r,seedValue:i,canEdit:c,insert:v,extractRoot:b,toggleMode:y,reset:S,seed:$}}const L0={class:"mb-4 flex items-center justify-between rounded-xl bg-slate-50 p-2 dark:bg-slate-800/50"},N0={class:"grid grid-cols-2 gap-1"},B0={class:"block"},F0=["disabled"],H0={class:"mt-3 grid grid-cols-2 gap-2"},V0={class:"mt-4 grid grid-cols-2 gap-2"},U0=oe({__name:"HeapControls",props:{canEdit:{type:Boolean},speed:{},isMinHeap:{type:Boolean}},emits:["insert","extract","toggle-mode","seed","reset","update:speed"],setup(t,{emit:e}){const n=t,s=e,o=B(""),a=C(()=>String(o.value).trim()===""?!1:Number.isFinite(Number(o.value)));function r(){!a.value||!n.canEdit||(s("insert",Number(o.value)),o.value="")}return(i,l)=>(x(),Y(we,{title:"Heap Controls"},{default:D(()=>[h("div",L0,[l[9]||(l[9]=h("span",{class:"pl-2 text-sm font-medium text-slate-600 dark:text-slate-300"},"Mode",-1)),h("div",N0,[T(Z,{variant:"toggle",active:t.isMinHeap,disabled:!t.canEdit,onClick:l[0]||(l[0]=u=>!t.isMinHeap&&s("toggle-mode"))},{default:D(()=>[...l[7]||(l[7]=[M(" Min ",-1)])]),_:1},8,["active","disabled"]),T(Z,{variant:"toggle",active:!t.isMinHeap,disabled:!t.canEdit,onClick:l[1]||(l[1]=u=>t.isMinHeap&&s("toggle-mode"))},{default:D(()=>[...l[8]||(l[8]=[M(" Max ",-1)])]),_:1},8,["active","disabled"])])]),h("label",B0,[l[10]||(l[10]=h("span",{class:"mb-1.5 block text-sm font-medium text-slate-600 dark:text-slate-300"},"Value",-1)),Os(h("input",{"onUpdate:modelValue":l[2]||(l[2]=u=>o.value=u),type:"number",placeholder:"e.g. 42",disabled:!t.canEdit,class:"w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition-colors focus:border-indigo-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100",onKeyup:Rt(r,["enter"])},null,40,F0),[[Mo,o.value]])]),h("div",H0,[T(Z,{variant:"primary",disabled:!t.canEdit||!a.value,onClick:r},{default:D(()=>[...l[11]||(l[11]=[M(" Insert ",-1)])]),_:1},8,["disabled"]),T(Z,{variant:"danger",disabled:!t.canEdit,onClick:l[3]||(l[3]=u=>s("extract"))},{default:D(()=>[M(" Extract "+R(t.isMinHeap?"Min":"Max"),1)]),_:1},8,["disabled"])]),T(Ve,{label:"Speed",class:"mt-4","model-value":t.speed,min:1,max:100,suffix:"%","onUpdate:modelValue":l[4]||(l[4]=u=>s("update:speed",u))},null,8,["model-value"]),h("div",V0,[T(Z,{variant:"neutral",disabled:!t.canEdit,onClick:l[5]||(l[5]=u=>s("seed",10))},{default:D(()=>[...l[12]||(l[12]=[M(" Seed random heap ",-1)])]),_:1},8,["disabled"]),T(Z,{variant:"neutral",disabled:!t.canEdit,onClick:l[6]||(l[6]=u=>s("reset"))},{default:D(()=>[...l[13]||(l[13]=[M(" Reset ",-1)])]),_:1},8,["disabled"])]),l[14]||(l[14]=h("p",{class:"mt-3 text-center text-xs text-slate-400"}," Controls lock while an insert/extract animation is playing. ",-1))]),_:1}))}}),z0={class:"grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]"},q0={class:"flex flex-col gap-4"},K0={class:"flex flex-col gap-4"},G0={class:"grid grid-cols-3 gap-2"},W0={key:0,class:"mt-3 text-center text-xs text-slate-400"},Y0={class:"font-mono font-semibold text-indigo-500 dark:text-indigo-400"},X0={key:0,class:"text-sm text-slate-400"},J0={key:0,class:"text-sm text-slate-400"},Q0={key:1,class:"flex flex-wrap gap-1.5"},Z0={class:"w-full bg-slate-200/70 py-0.5 text-center text-[10px] font-medium text-slate-500 dark:bg-slate-700/70 dark:text-slate-400"},ey={class:"py-1 font-mono text-sm font-semibold text-slate-800 dark:text-slate-100"},cl=50,dl=60,pl=40,fl=40,ty=oe({__name:"HeapView",setup(t){const e=P0();function n(c){const d=[],p=[];let m=0;const w=c.length;function g(v,b){if(v>=w)return;const y=2*v+1,S=2*v+2;g(y,b+1);const $=pl+m*cl,_=fl+b*dl;m+=1,d.push({id:v,x:$,y:_,value:c[v],depth:b}),g(S,b+1),y<w&&p.push({from:v,to:y}),S<w&&p.push({from:v,to:S})}return g(0,0),{nodes:d,edges:p,slotCount:m}}const s=C(()=>n(e.heap.value));function o(c){return e.highlights.comparing.includes(c)?"visiting":e.highlights.swapping.includes(c)?"inserted":"default"}const a=C(()=>s.value.nodes.map(c=>({id:c.id,x:c.x,y:c.y,value:c.value,state:o(c.id)}))),r=C(()=>s.value.edges),i=C(()=>Math.max(320,pl*2+s.value.slotCount*cl)),l=C(()=>{const c=s.value.nodes.reduce((d,p)=>Math.max(d,p.depth),0);return Math.max(200,fl*2+c*dl)}),u=C(()=>e.heap.value.length===0);return(c,d)=>(x(),A("div",z0,[h("div",q0,[T(U0,{"can-edit":f(e).canEdit.value,speed:f(e).speed.value,"is-min-heap":f(e).isMinHeap.value,onInsert:d[0]||(d[0]=p=>f(e).insert(p)),onExtract:d[1]||(d[1]=p=>f(e).extractRoot()),onToggleMode:d[2]||(d[2]=p=>f(e).toggleMode()),onSeed:d[3]||(d[3]=p=>f(e).seed(p)),onReset:d[4]||(d[4]=p=>f(e).reset()),"onUpdate:speed":d[5]||(d[5]=p=>f(e).speed.value=p)},null,8,["can-edit","speed","is-min-heap"])]),h("div",K0,[T(we,{title:"Stats"},{header:D(()=>[h("span",{class:de(["rounded-full px-2.5 py-0.5 text-xs font-semibold",{"bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400":f(e).status.value==="idle","bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400":f(e).status.value==="running","bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400":f(e).status.value==="done"}])},R(f(e).status.value==="running"?"Running":f(e).status.value==="done"?"Done":"Idle"),3)]),default:D(()=>[h("div",G0,[T(jt,{label:"Comparisons",value:String(f(e).stats.comparisons)},null,8,["value"]),T(jt,{label:"Swaps",value:String(f(e).stats.swaps)},null,8,["value"]),T(jt,{label:"Steps",value:String(f(e).stats.steps)},null,8,["value"])]),f(e).lastExtracted.value!==null?(x(),A("p",W0,[d[6]||(d[6]=M(" Last extracted: ",-1)),h("span",Y0,R(f(e).lastExtracted.value),1)])):ge("",!0)]),_:1}),T(we,{class:"flex min-h-[280px] flex-1 items-center justify-center"},{default:D(()=>[u.value?(x(),A("p",X0," The heap is empty — insert a value to get started. ")):(x(),Y(Ec,{key:1,nodes:a.value,edges:r.value,"view-box-width":i.value,"view-box-height":l.value,class:"max-h-[55vh]"},null,8,["nodes","edges","view-box-width","view-box-height"]))]),_:1}),T(we,{title:"Backing Array"},{default:D(()=>[u.value?(x(),A("div",J0,"Empty.")):(x(),A("div",Q0,[(x(!0),A(ne,null,fe(f(e).heap.value,(p,m)=>(x(),A("div",{key:m,class:de(["flex w-12 flex-col items-center overflow-hidden rounded-lg border transition-colors",o(m)==="visiting"?"border-amber-400 bg-amber-50 dark:bg-amber-900/30":o(m)==="inserted"?"border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30":"border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50"])},[h("div",Z0,R(m),1),h("div",ey,R(p),1)],2))),128))]))]),_:1})])]))}}),ny=10;function sy(){const t=B({nodes:[],edges:[],adjacency:new Map}),e=B("bfs"),n=B(null),s=B(60),o=B(ze()),a=Le({visited:[],frontier:[],current:null}),r=Le({visitedCount:0,totalNodes:0}),i=C(()=>Zo[e.value]),l=C(()=>{const v=new Map,b=new Set(a.visited),y=new Set(a.frontier);for(const S of t.value.nodes)S.id===a.current?v.set(S.id,"current"):b.has(S.id)?v.set(S.id,"visited"):y.has(S.id)&&v.set(S.id,"frontier");return v}),u=C(()=>{const v=new Map,b=new Set(a.visited);for(const y of t.value.edges)b.has(y.from)&&b.has(y.to)&&v.set(y.id,"visited");return v});function c(){a.visited=[],a.frontier=[],a.current=null}function d(){r.visitedCount=0,r.totalNodes=t.value.nodes.length}const p=vn({speed:s,createGenerator:()=>n.value===null?null:(c(),d(),i.value.generator(t.value.adjacency,n.value)),applyStep:v=>{a.visited=v.visited,a.frontier=v.frontier,a.current=v.current,r.visitedCount=v.visited.length},clearStep:()=>{c(),d()}});function m(v=!1){var y;t.value=cc(ny,st(o.value)),v&&n.value!==null&&t.value.adjacency.has(n.value)||(n.value=((y=t.value.nodes[0])==null?void 0:y.id)??null),p.reset()}function w(v){p.canEdit.value&&t.value.adjacency.has(v)&&(n.value=v)}const{hydrated:g}=Qt($b({algoKey:e,speed:s,seed:o,startId:n}));return m(g.has("start")),{graph:t,algoKey:e,startId:n,speed:s,seed:o,highlights:a,nodeTone:l,edgeTone:u,stats:r,currentAlgo:i,status:p.status,isRunning:p.isRunning,isPaused:p.isPaused,isDone:p.isDone,canEdit:p.canEdit,delayMs:p.delayMs,elapsedMs:p.elapsedMs,stepCount:p.stepCount,cursor:p.cursor,bufferedCount:p.bufferedCount,fullyBuffered:p.fullyBuffered,current:p.current,canStepBack:p.canStepBack,canStepForward:p.canStepForward,generate:m,setStart:w,run:p.run,pause:p.pause,reset:p.reset,stepForward:p.stepForward,stepBack:p.stepBack,seek:p.seek,skipToEnd:p.skipToEnd}}const oy={class:"mt-5 grid grid-cols-2 gap-2"},ay=oe({__name:"GraphControls",props:{speed:{},status:{},canEdit:{type:Boolean},isRunning:{type:Boolean},isPaused:{type:Boolean}},emits:["update:speed","generate","run","pause","reset"],setup(t,{emit:e}){const n=e;return(s,o)=>(x(),Y(we,{title:"Controls"},{default:D(()=>[T(Ve,{label:"Speed","model-value":t.speed,min:1,max:100,suffix:"%","onUpdate:modelValue":o[0]||(o[0]=a=>n("update:speed",a))},null,8,["model-value"]),h("div",oy,[t.isRunning?(x(),Y(Z,{key:1,variant:"warning",class:"col-span-2",onClick:o[2]||(o[2]=a=>n("pause"))},{default:D(()=>[...o[6]||(o[6]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M6 4h4v16H6zM14 4h4v16h-4z"})],-1),M(" Pause ",-1)])]),_:1})):(x(),Y(Z,{key:0,variant:"primary",class:"col-span-2",onClick:o[1]||(o[1]=a=>n("run"))},{default:D(()=>[o[5]||(o[5]=h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M8 5v14l11-7z"})],-1)),M(" "+R(t.isPaused?"Resume":"Run"),1)]),_:1})),T(Z,{variant:"neutral",onClick:o[3]||(o[3]=a=>n("reset"))},{default:D(()=>[...o[7]||(o[7]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.36 2.64L3 8"}),h("path",{d:"M3 3v5h5"})],-1),M(" Reset ",-1)])]),_:1}),T(Z,{variant:"neutral",disabled:!t.canEdit,onClick:o[4]||(o[4]=a=>n("generate"))},{default:D(()=>[...o[8]||(o[8]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"})],-1),M(" New Graph ",-1)])]),_:1},8,["disabled"])]),o[9]||(o[9]=h("p",{class:"mt-3 text-center text-xs text-slate-400"}," Click a node in the diagram to set the start point. ",-1))]),_:1}))}}),fo={idle:"idle",frontier:"probe",current:"active",visited:"settled"},ry={idle:ft.idle,frontier:ft.probe,current:ft.active,visited:ft.settled,considering:ft.probe,accepted:ft.settled,rejected:ft.rejected},iy={idle:vt.idle,frontier:vt.probe,current:vt.active,visited:vt.settled,considering:vt.probe,accepted:vt.settled,rejected:vt.rejected},ly=kn([{tone:fo.idle,label:"Unvisited"},{tone:fo.frontier,label:"Frontier"},{tone:fo.current,label:"Current"},{tone:fo.visited,label:"Visited"}]),uy={class:"mb-3 flex flex-wrap items-center gap-x-4 gap-y-2"},cy={class:"text-xs font-semibold uppercase tracking-wider text-ink-faint"},dy={class:"flex min-h-[320px] flex-1 items-center justify-center rounded-xl bg-surface-alt p-3"},py={viewBox:"0 0 400 400",class:"h-full max-h-[480px] w-full max-w-[480px]"},fy=["x1","y1","x2","y2","stroke-width"],hy=["x","y"],my=["x","y"],gy=["onClick"],by=["cx","cy","stroke-width"],vy=["x","y"],yy=["x","y"],wy={class:"mt-3 text-center text-xs text-ink-faint"},Cc=oe({__name:"GraphCanvas",props:{nodes:{},edges:{},nodeTone:{default:()=>new Map},edgeTone:{default:()=>new Map},nodeBadge:{default:()=>new Map},showWeights:{type:Boolean,default:!1},legend:{default:()=>ly},title:{default:"Graph"},hint:{default:"Click a node to set the traversal start point."},startId:{default:null},canEdit:{type:Boolean,default:!1}},emits:["set-start"],setup(t,{emit:e}){const n=t,s=e,o=C(()=>new Map(n.nodes.map(c=>[c.id,c]))),a=C(()=>{const c=new Map;for(const d of n.edges){const p=o.value.get(d.from),m=o.value.get(d.to);p&&m&&c.set(d.id,{x:(p.x+m.x)/2,y:(p.y+m.y)/2})}return c});function r(c){return ry[n.nodeTone.get(c)??"idle"]}function i(c){return iy[n.edgeTone.get(c.id)??"idle"]}function l(c){return n.edgeTone.get(c.id)==="accepted"?3:2}function u(c){n.canEdit&&s("set-start",c)}return(c,d)=>(x(),Y(we,{class:"flex h-full flex-col"},{default:D(()=>[h("div",uy,[h("h2",cy,R(t.title),1),T(Mn,{items:t.legend},null,8,["items"])]),h("div",dy,[(x(),A("svg",py,[(x(!0),A(ne,null,fe(t.edges,p=>{var m,w,g,v;return x(),A("line",{key:p.id,x1:(m=o.value.get(p.from))==null?void 0:m.x,y1:(w=o.value.get(p.from))==null?void 0:w.y,x2:(g=o.value.get(p.to))==null?void 0:g.x,y2:(v=o.value.get(p.to))==null?void 0:v.y,"stroke-width":l(p),class:de(i(p))},null,10,fy)}),128)),t.showWeights?(x(!0),A(ne,{key:0},fe(t.edges,p=>(x(),A("g",{key:`w-${p.id}`},[p.weight!==void 0&&a.value.get(p.id)?(x(),A(ne,{key:0},[h("rect",{x:a.value.get(p.id).x-10,y:a.value.get(p.id).y-7,width:"20",height:"14",rx:"3",class:"fill-surface-alt"},null,8,hy),h("text",{x:a.value.get(p.id).x,y:a.value.get(p.id).y,"text-anchor":"middle","dominant-baseline":"central",class:"pointer-events-none select-none fill-ink-muted text-[9px] font-semibold"},R(p.weight),9,my)],64)):ge("",!0)]))),128)):ge("",!0),(x(!0),A(ne,null,fe(t.nodes,p=>(x(),A("g",{key:p.id,class:"cursor-pointer",onClick:m=>u(p.id)},[h("circle",{cx:p.x,cy:p.y,r:"16","stroke-width":p.id===t.startId?3:0,class:de(["transition-colors duration-150 ease-out",[r(p.id),p.id===t.startId?"stroke-accent":"stroke-transparent"]])},null,10,by),h("text",{x:p.x,y:p.y,"text-anchor":"middle","dominant-baseline":"central",class:"pointer-events-none select-none fill-ink-inverse text-[10px] font-semibold"},R(p.label),9,vy),t.nodeBadge.get(p.id)!==void 0?(x(),A("text",{key:0,x:p.x,y:p.y+27,"text-anchor":"middle",class:"pointer-events-none select-none fill-ink-faint text-[9px] font-medium"},R(t.nodeBadge.get(p.id)),9,yy)):ge("",!0)],8,gy))),128))]))]),h("p",wy,R(t.hint),1)]),_:1}))}}),xy={class:"grid grid-cols-3 gap-2"},ky=oe({__name:"GraphStats",props:{visitedCount:{},totalNodes:{},steps:{},elapsedMs:{},status:{}},setup(t){const e=t,n=C(()=>`${(e.elapsedMs/1e3).toFixed(2)}s`),s=C(()=>({idle:"Idle",running:"Running",paused:"Paused",done:"Done"})[e.status]??e.status),o=C(()=>({idle:"bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",running:"bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400",paused:"bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400",done:"bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400"})[e.status]),a=C(()=>[{label:"Visited",value:`${e.visitedCount} / ${e.totalNodes}`},{label:"Steps",value:e.steps.toLocaleString()},{label:"Elapsed",value:n.value}]);return(r,i)=>(x(),Y(we,{title:"Stats"},{header:D(()=>[h("span",{class:de(["rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",o.value])},R(s.value),3)]),default:D(()=>[h("div",xy,[(x(!0),A(ne,null,fe(a.value,l=>(x(),Y(jt,{key:l.label,label:l.label,value:l.value},null,8,["label","value"]))),128))])]),_:1}))}}),Sy={class:"grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]"},$y={class:"flex flex-col gap-4"},Ey={class:"flex flex-col gap-4"},Cy=oe({__name:"GraphView",setup(t){const e=sy();return _e(e.algoKey,()=>{e.isDone.value&&e.reset()}),(n,s)=>(x(),A("div",Sy,[h("div",$y,[T(An,{modelValue:f(e).algoKey.value,"onUpdate:modelValue":s[0]||(s[0]=o=>f(e).algoKey.value=o),algorithms:f(Zo),title:"Traversal Algorithm",disabled:!f(e).canEdit.value},null,8,["modelValue","algorithms","disabled"]),T(ay,{speed:f(e).speed.value,"onUpdate:speed":s[1]||(s[1]=o=>f(e).speed.value=o),status:f(e).status.value,"can-edit":f(e).canEdit.value,"is-running":f(e).isRunning.value,"is-paused":f(e).isPaused.value,onGenerate:s[2]||(s[2]=o=>f(e).generate()),onRun:s[3]||(s[3]=o=>f(e).run()),onPause:s[4]||(s[4]=o=>f(e).pause()),onReset:s[5]||(s[5]=o=>f(e).reset())},null,8,["speed","status","can-edit","is-running","is-paused"]),T(xn,{cursor:f(e).cursor.value,"buffered-count":f(e).bufferedCount.value,"fully-buffered":f(e).fullyBuffered.value,"can-step-back":f(e).canStepBack.value,"can-step-forward":f(e).canStepForward.value,onSeek:s[6]||(s[6]=o=>f(e).seek(o)),onStepBack:s[7]||(s[7]=o=>f(e).stepBack()),onStepForward:s[8]||(s[8]=o=>f(e).stepForward()),onSkipToEnd:s[9]||(s[9]=o=>f(e).skipToEnd())},null,8,["cursor","buffered-count","fully-buffered","can-step-back","can-step-forward"])]),h("div",Ey,[T(ky,{"visited-count":f(e).stats.visitedCount,"total-nodes":f(e).stats.totalNodes,steps:f(e).stepCount.value,"elapsed-ms":f(e).elapsedMs.value,status:f(e).status.value},null,8,["visited-count","total-nodes","steps","elapsed-ms","status"]),T(Cc,{class:"flex-1",nodes:f(e).graph.value.nodes,edges:f(e).graph.value.edges,"node-tone":f(e).nodeTone.value,"edge-tone":f(e).edgeTone.value,"start-id":f(e).startId.value,"can-edit":f(e).canEdit.value,onSetStart:s[10]||(s[10]=o=>f(e).setStart(o))},null,8,["nodes","edges","node-tone","edge-tone","start-id","can-edit"])])]))}}),Ay=`
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
`,Ty="<\/script>",Oy=`<!doctype html>
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
${Ty}
</body>
</html>`;function Es(t){return typeof t=="number"&&Number.isFinite(t)}function Oa(t,e,n){if(t===void 0)return[];if(!Array.isArray(t))return`${n} must be an array of indices`;if(t.length>qs)return`${n} has too many entries`;const s=[];for(const o of t){if(!Es(o)||!Number.isInteger(o))return`${n} must contain whole numbers`;if(o<0||o>=e)return`${n} contains index ${o}, outside the array (0..${e-1})`;s.push(o)}return s}function My(t){if(t===null||typeof t!="object")return{ok:!1,reason:"step is not an object"};const e=t;if(!Array.isArray(e.array))return{ok:!1,reason:"step.array must be an array"};if(e.array.length>qs)return{ok:!1,reason:`step.array has ${e.array.length} entries, over the ${qs} limit`};const n=[];for(const i of e.array){if(!Es(i))return{ok:!1,reason:"step.array must contain finite numbers"};n.push(i)}const s=Oa(e.comparing,n.length,"step.comparing");if(typeof s=="string")return{ok:!1,reason:s};const o=Oa(e.swapping,n.length,"step.swapping");if(typeof o=="string")return{ok:!1,reason:o};const a=Oa(e.sorted,n.length,"step.sorted");if(typeof a=="string")return{ok:!1,reason:a};if(e.comparisons!==void 0&&!Es(e.comparisons))return{ok:!1,reason:"step.comparisons must be a number"};if(e.swaps!==void 0&&!Es(e.swaps))return{ok:!1,reason:"step.swaps must be a number"};const r={array:n,comparing:s,swapping:o,sorted:a,comparisons:Math.max(0,Math.floor(e.comparisons??0)),swaps:Math.max(0,Math.floor(e.swaps??0)),done:e.done===!0};return Es(e.line)&&e.line>=0&&(r.line=Math.floor(e.line)),{ok:!0,step:r}}class Ac extends Error{constructor(e){super(e),this.name="SandboxError"}}function*Ry(t){for(const e of t)yield e}function _y(t){const e=t.maxSteps??_r,n=t.maxMs??vb,s=t.silenceMs??yb,o=[];let a=0,r=null;const i=Date.now();let l=null,u=null,c=!1,d,p;const m=new Promise((S,$)=>{d=S,p=$});function w(){var S;if(u!==null&&(clearTimeout(u),u=null),window.removeEventListener("message",y),l){try{(S=l.contentWindow)==null||S.postMessage({type:"sandbox:kill"},"*")}catch{}l.remove(),l=null}}function g(S){c||(c=!0,w(),d({steps:o,reason:S,rejected:a,firstRejectReason:r,elapsedMs:Date.now()-i}))}function v(S){c||(c=!0,w(),p(new Ac(S)))}function b(){u!==null&&clearTimeout(u),u=setTimeout(()=>g("watchdog"),s)}function y(S){if(!l||S.source!==l.contentWindow)return;const $=S.data;if(!(!$||typeof $!="object"||typeof $.type!="string"))switch(b(),$.type){case"sandbox:steps":{if(!Array.isArray($.steps))return;for(const _ of $.steps){const N=My(_);if(!N.ok){a+=1,r===null&&(r=N.reason);continue}o.push(N.step)}return}case"sandbox:done":g($.reason);return;case"sandbox:error":v($.message||"The sandbox reported an unknown error.");return;default:return}}return window.addEventListener("message",y),l=document.createElement("iframe"),l.setAttribute("sandbox","allow-scripts"),l.setAttribute("aria-hidden","true"),l.setAttribute("title","Algorithm sandbox runner"),l.style.cssText="position:absolute;width:0;height:0;border:0;opacity:0;pointer-events:none;left:-9999px;",l.srcdoc=Oy,l.addEventListener("load",()=>{var S;c||!l||(S=l.contentWindow)==null||S.postMessage({type:"sandbox:run",workerSource:Ay,code:t.code,input:Array.from(t.input,Number),maxSteps:e,maxMs:n,batchSize:wb,arrayCap:qs},"*")}),document.body.appendChild(l),b(),{result:m,cancel:()=>g("cancelled")}}function Iy(t){switch(t.reason){case"watchdog":return"Force-stopped: the snippet stopped responding without yielding anything — that is what a loop with no yield inside it looks like. The worker was terminated; this page was never blocked.";case"step-budget":case"time-budget":return"Stopped at the budget before the snippet yielded a single snapshot.";case"cancelled":return"Cancelled before the snippet yielded anything.";default:return t.rejected>0?`Every snapshot was rejected. First problem: ${t.firstRejectReason}`:"The snippet ran but never yielded a snapshot. Use `yield` to draw a frame."}}function jy(){const t=B(ar),e=B(kc),n=B(Sc),s=B(ze()),o=B("idle"),a=B(null),r=B(null),i=gr([]);let l=null;const u=B([]),c=B([]),d=Le({comparing:[],swapping:[],sorted:[]}),p=Le({comparisons:0,swaps:0}),m=B(1);function w(){d.comparing=[],d.swapping=[],d.sorted=[]}function g(){p.comparisons=0,p.swaps=0}function v(){const z=st(s.value);u.value=Array.from({length:e.value},()=>z.int(1,99)),c.value=[...u.value],b()}function b(){let z=1;for(const ae of u.value)ae>z&&(z=ae);for(const ae of i.value)for(const P of ae.array)P>z&&(z=P);m.value=z}const y=vn({speed:n,createGenerator:()=>i.value.length===0?null:(c.value=[...u.value],w(),g(),Ry(i.value)),applyStep:z=>{c.value=z.array,d.comparing=z.comparing,d.swapping=z.swapping,d.sorted=z.sorted,p.comparisons=z.comparisons,p.swaps=z.swaps},clearStep:()=>{c.value=[...u.value],w(),g()}});function S(){i.value=[],y.reset(),b()}function $(){G(),v(),S(),o.value="idle",a.value=null,r.value=null}function _(){s.value=ze(),$()}async function N(){G(),a.value=null,r.value=null,o.value="executing",i.value=[],y.reset();const z=_y({code:t.value,input:u.value});l=z;try{const ae=await z.result;if(l!==z)return;if(i.value=ae.steps,r.value=ae,b(),ae.steps.length===0){o.value="error",a.value=Iy(ae);return}o.value="ready",y.run()}catch(ae){if(l!==z)return;o.value="error",a.value=ae instanceof Ac?ae.message:"The sandbox failed to start."}finally{l===z&&(l=null)}}function G(){l&&(l.cancel(),l=null)}function j(){t.value=ar}const{hydrated:L}=Qt(Eb({source:t,size:e,speed:n,seed:s})),I=L.has("src");v();const he=C(()=>r.value!==null&&r.value.reason!=="complete"&&i.value.length>0),Se=C(()=>{const z=r.value;if(!z)return null;switch(z.reason){case"complete":return null;case"step-budget":return`Stopped at the ${_r.toLocaleString()}-step budget — the snippet never finished.`;case"time-budget":return"Stopped at the time budget — the snippet was still running.";case"watchdog":return"Force-stopped: the sandbox went silent, which is what a loop that never yields looks like.";case"cancelled":return"Cancelled.";default:return null}});return{source:t,size:e,speed:n,seed:s,phase:o,error:a,lastRun:r,truncated:he,stopLabel:Se,stepsCollected:C(()=>i.value.length),fromSharedLink:I,array:c,baseArray:u,highlights:d,stats:p,maxValue:m,status:y.status,isRunning:y.isRunning,isPaused:y.isPaused,isDone:y.isDone,canEdit:y.canEdit,elapsedMs:y.elapsedMs,stepCount:y.stepCount,cursor:y.cursor,bufferedCount:y.bufferedCount,fullyBuffered:y.fullyBuffered,current:y.current,canStepBack:y.canStepBack,canStepForward:y.canStepForward,activeLine:C(()=>{var z;return((z=y.current.value)==null?void 0:z.line)??null}),execute:N,cancel:G,regenerate:$,randomizeSeed:_,resetSource:j,run:y.run,pause:y.pause,reset:y.reset,stepForward:y.stepForward,stepBack:y.stepBack,seek:y.seek,skipToEnd:y.skipToEnd}}const Dy={class:"relative flex max-h-[420px] min-h-[260px] overflow-hidden rounded-xl bg-slate-50 font-mono text-xs dark:bg-slate-950/40"},Py={"aria-hidden":"true",class:"select-none overflow-hidden border-r border-slate-200 bg-slate-100/60 py-3 text-right dark:border-slate-800 dark:bg-slate-900/40",style:{minWidth:"2.75rem"}},Ly=["value","disabled"],Ny=oe({__name:"CodeEditor",props:{modelValue:{},disabled:{type:Boolean}},emits:["update:modelValue"],setup(t,{emit:e}){const n=t,s=e,o=B(null),a=C(()=>{const d=n.modelValue.split(`
`).length;return Array.from({length:d},(p,m)=>m+1)}),r=B(0);function i(d){r.value=d.target.scrollTop}const l=B(!1);function u(d){if(d.key==="Escape"){l.value=!0;return}if(d.key!=="Tab"||l.value)return;d.preventDefault();const p=o.value;if(!p)return;const{selectionStart:m,selectionEnd:w,value:g}=p,v=`${g.slice(0,m)}  ${g.slice(w)}`;s("update:modelValue",v),requestAnimationFrame(()=>{p.selectionStart=p.selectionEnd=m+2})}function c(d){l.value=!1,s("update:modelValue",d.target.value)}return(d,p)=>(x(),Y(we,{title:"Your algorithm"},{header:D(()=>[...p[0]||(p[0]=[h("span",{class:"text-[11px] text-slate-400 dark:text-slate-500"}," Tab indents · Esc then Tab to leave ",-1)])]),default:D(()=>[h("div",Dy,[h("div",Py,[h("div",{style:cn({transform:`translateY(${-r.value}px)`})},[(x(!0),A(ne,null,fe(a.value,m=>(x(),A("div",{key:m,class:"px-2 leading-5 text-slate-400 dark:text-slate-600"},R(m),1))),128))],4)]),h("textarea",{ref_key:"textarea",ref:o,value:t.modelValue,disabled:t.disabled,spellcheck:"false",autocomplete:"off",autocorrect:"off",autocapitalize:"off","aria-label":"Algorithm source code",class:"flex-1 resize-none bg-transparent p-3 leading-5 text-slate-800 outline-none disabled:opacity-60 dark:text-slate-200",onInput:c,onKeydown:u,onScroll:i},null,40,Ly)])]),_:1}))}}),By=["open"],Fy={class:"flex cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden"},Hy={class:"min-w-0"},Vy={class:"block text-xs font-semibold uppercase tracking-wider text-ink-faint"},Uy={key:0,class:"mt-1 block text-sm text-ink-muted"},zy={class:"mt-4 border-t border-line pt-4 text-sm"},Zs=oe({__name:"AvExplainer",props:{title:{},summary:{default:""},startOpen:{type:Boolean,default:!1}},setup(t){return(e,n)=>(x(),A("details",{class:"av-card group p-4 sm:p-5",open:t.startOpen},[h("summary",Fy,[h("span",Hy,[h("span",Vy,R(t.title),1),t.summary?(x(),A("span",Uy,R(t.summary),1)):ge("",!0)]),n[0]||(n[0]=h("span",{class:"shrink-0 text-ink-faint transition-transform group-open:rotate-180","aria-hidden":"true"}," ▾ ",-1))]),h("div",zy,[So(e.$slots,"default")])],8,By))}}),qy={class:"mb-4 overflow-x-auto"},Ky={class:"w-full border-collapse text-left text-xs"},Gy={class:"py-1.5 pr-3 font-mono font-semibold text-slate-700 dark:text-slate-200"},Wy={class:"py-1.5 pr-3 font-mono text-slate-400"},Yy={class:"py-1.5 text-slate-500 dark:text-slate-400"},Xy={class:"mb-4 list-disc space-y-1.5 pl-5 text-slate-600 dark:text-slate-300"},Jy=oe({__name:"SandboxGuide",setup(t){const e=[{name:"array",type:"number[]",note:"Required. The values as they stand right now."},{name:"comparing",type:"number[]",note:"Indices to paint amber. Defaults to none."},{name:"swapping",type:"number[]",note:"Indices to paint rose."},{name:"sorted",type:"number[]",note:"Indices to paint emerald — settled for good."},{name:"comparisons",type:"number",note:"Shown in Stats. Your own running count."},{name:"swaps",type:"number",note:"Shown in Stats."},{name:"done",type:"boolean",note:"true on the final snapshot only. Ends the run."}];return(n,s)=>(x(),Y(Zs,{title:"How this works",summary:"Write a generator, yield a snapshot per frame. Read this first — the shape is strict.","start-open":""},{default:D(()=>[s[4]||(s[4]=h("p",{class:"mb-3 text-slate-600 dark:text-slate-300"},[M(" Your code runs in a sandboxed frame on its own thread, and everything it "),h("code",{class:"font-mono text-xs"},"yield"),M("s is drawn on the chart to the right. It is the same contract every built-in algorithm here uses, so anything you write plays back with the same scrubber, speed control and step history. ")],-1)),s[5]||(s[5]=h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400"}," Required shape ",-1)),s[6]||(s[6]=h("pre",{class:"mb-4 overflow-x-auto rounded-xl bg-slate-50 p-3 font-mono text-[11px] leading-5 text-slate-700 dark:bg-slate-950/40 dark:text-slate-300"},[h("code",null,`// name and function* are both required
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
}`)],-1)),s[7]||(s[7]=h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400"}," Snapshot fields ",-1)),h("div",qy,[h("table",Ky,[h("tbody",null,[(x(),A(ne,null,fe(e,o=>h("tr",{key:o.name,class:"border-b border-slate-200 last:border-0 dark:border-slate-700"},[h("td",Gy,R(o.name),1),h("td",Wy,R(o.type),1),h("td",Yy,R(o.note),1)])),64))])])]),s[8]||(s[8]=h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400"}," Rules worth knowing ",-1)),h("ul",Xy,[s[0]||(s[0]=h("li",null,[h("b",null,"JavaScript only."),M(" The runner evaluates JS — other languages and WebAssembly are not supported. ")],-1)),s[1]||(s[1]=h("li",null,[M(" Highlight indices must be whole numbers "),h("b",null,"inside"),M(" the array. An out-of-range index is rejected rather than clamped, because a clamped index quietly highlights the wrong bar. ")],-1)),s[2]||(s[2]=h("li",null," A rejected snapshot is skipped and reported in the Sandbox panel with the reason — the run keeps going. ",-1)),s[3]||(s[3]=h("li",null,[M(" Helper functions are fine. Only "),h("code",{class:"font-mono text-xs"},"run"),M(" is special. ")],-1)),h("li",null," Limits: "+R(f(_r).toLocaleString())+" snapshots per run, arrays up to "+R(f(qs))+" entries (the size slider stops at "+R(f(Ir))+"). ",1)]),s[9]||(s[9]=h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400"}," Why it is safe to run a link someone sent you ",-1)),s[10]||(s[10]=h("p",{class:"mb-2 text-slate-600 dark:text-slate-300"}," Code executes inside an isolated frame with no access to this page — not its DOM, its storage, or its cookies — and on a separate thread, so even an infinite loop cannot freeze the tab. A run that stops responding is terminated automatically. ",-1)),s[11]||(s[11]=h("p",{class:"text-slate-500 dark:text-slate-400"},[M(" One honest limitation: isolation stops shared code touching "),h("em",null,"this app"),M(", but it can still make network requests, the same as any script on any page you open. Treat a shared snippet the way you would treat any link. ")],-1))]),_:1}))}}),Qy={class:"flex flex-col gap-3"},Zy={class:"grid grid-cols-2 gap-2"},ew={class:"grid grid-cols-2 gap-2"},tw=oe({__name:"SandboxControls",props:Un({status:{},executing:{type:Boolean},canEdit:{type:Boolean},isRunning:{type:Boolean},isPaused:{type:Boolean},hasTape:{type:Boolean},seed:{}},{size:{required:!0},sizeModifiers:{},speed:{required:!0},speedModifiers:{}}),emits:Un(["execute","cancel","run","pause","reset","randomize","reset-source","update:seed"],["update:size","update:speed"]),setup(t,{emit:e}){const n=zn(t,"size"),s=zn(t,"speed"),o=e;function a(r){const i=Number(r);Number.isInteger(i)&&o("update:seed",i)}return(r,i)=>(x(),Y(we,{title:"Run"},{default:D(()=>[h("div",Qy,[h("div",Zy,[T(Z,{variant:"primary",class:"col-span-2",disabled:t.executing,onClick:i[0]||(i[0]=l=>o("execute"))},{default:D(()=>[M(R(t.executing?"Running in sandbox…":"▶ Run in sandbox"),1)]),_:1},8,["disabled"]),t.executing?(x(),Y(Z,{key:0,variant:"danger",class:"col-span-2",onClick:i[1]||(i[1]=l=>o("cancel"))},{default:D(()=>[...i[9]||(i[9]=[M(" Stop ",-1)])]),_:1})):(x(),A(ne,{key:1},[t.isRunning?(x(),Y(Z,{key:0,variant:"warning",disabled:!t.hasTape,onClick:i[2]||(i[2]=l=>o("pause"))},{default:D(()=>[...i[10]||(i[10]=[M(" ❚❚ Pause ",-1)])]),_:1},8,["disabled"])):(x(),Y(Z,{key:1,variant:"neutral",disabled:!t.hasTape,onClick:i[3]||(i[3]=l=>o("run"))},{default:D(()=>[M(R(t.isPaused?"▶ Resume":"▶ Replay"),1)]),_:1},8,["disabled"])),T(Z,{variant:"neutral",disabled:!t.hasTape,onClick:i[4]||(i[4]=l=>o("reset"))},{default:D(()=>[...i[11]||(i[11]=[M("Reset",-1)])]),_:1},8,["disabled"])],64))]),T(Ve,{modelValue:n.value,"onUpdate:modelValue":i[5]||(i[5]=l=>n.value=l),label:"Input size",min:f(xc),max:f(Ir),disabled:!t.canEdit||t.executing},null,8,["modelValue","min","max","disabled"]),T(Ve,{modelValue:s.value,"onUpdate:modelValue":i[6]||(i[6]=l=>s.value=l),label:"Speed",min:1,max:100,suffix:"%"},null,8,["modelValue"]),T(kt,{label:"Seed",monospace:"","model-value":String(t.seed),disabled:!t.canEdit||t.executing,"onUpdate:modelValue":a},null,8,["model-value","disabled"]),h("div",ew,[T(Z,{variant:"quiet",disabled:!t.canEdit||t.executing,onClick:i[7]||(i[7]=l=>o("randomize"))},{default:D(()=>[...i[12]||(i[12]=[M(" New seed ",-1)])]),_:1},8,["disabled"]),T(Z,{variant:"quiet",disabled:t.executing,onClick:i[8]||(i[8]=l=>o("reset-source"))},{default:D(()=>[...i[13]||(i[13]=[M(" Starter code ",-1)])]),_:1},8,["disabled"])])])]),_:1}))}}),nw={key:0,class:"mb-3 rounded-lg bg-indigo-50 px-3 py-2 text-xs text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"},sw={key:1,class:"text-sm text-rose-600 dark:text-rose-400"},ow={key:0,class:"mb-2 text-sm text-amber-600 dark:text-amber-400"},aw={key:1,class:"text-sm text-slate-500 dark:text-slate-400"},rw={key:0},iw={key:2,class:"text-sm text-slate-500 dark:text-slate-400"},lw={key:3,class:"mt-2 text-xs text-amber-600 dark:text-amber-400"},uw=oe({__name:"SandboxStatus",props:{phase:{},error:{},stopLabel:{},stepsCollected:{},rejected:{},firstRejectReason:{},elapsedMs:{},fromSharedLink:{type:Boolean}},setup(t){const e=t,n=C(()=>e.phase==="error"?"error":e.stopLabel||e.rejected>0?"warn":e.phase==="ready"?"ok":"idle"),s=C(()=>({idle:"bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",ok:"bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",warn:"bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",error:"bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300"})[n.value]);return(o,a)=>(x(),Y(we,{title:"Sandbox"},{header:D(()=>[h("span",{class:de(["rounded-full px-2.5 py-0.5 text-xs font-semibold",s.value])},R(t.phase==="executing"?"Executing":t.phase==="ready"?"Isolated · OK":t.phase==="error"?"Failed":"Idle"),3)]),default:D(()=>[t.fromSharedLink?(x(),A("p",nw," This code came from a shared link. It runs in an isolated frame with no access to this page, but it is not code you wrote. ")):ge("",!0),t.error?(x(),A("p",sw,R(t.error),1)):(x(),A(ne,{key:2},[t.stopLabel?(x(),A("p",ow,R(t.stopLabel),1)):ge("",!0),t.phase==="ready"?(x(),A("p",aw,[M(" Collected "+R(t.stepsCollected.toLocaleString())+" snapshots",1),t.elapsedMs!==null?(x(),A("span",rw," in "+R((t.elapsedMs/1e3).toFixed(2))+"s",1)):ge("",!0),a[0]||(a[0]=M(". ",-1))])):t.phase==="idle"?(x(),A("p",iw," Your code runs in a sandboxed frame on its own thread. It can draw bars; it cannot reach this page. ")):ge("",!0),t.rejected>0?(x(),A("p",lw,R(t.rejected.toLocaleString())+" snapshot"+R(t.rejected===1?"":"s")+" rejected before rendering — "+R(t.firstRejectReason),1)):ge("",!0)],64))]),_:1}))}}),cw={class:"grid gap-4 lg:grid-cols-[minmax(0,420px)_1fr]"},dw={class:"flex flex-col gap-4"},pw={class:"flex flex-col gap-4"},fw=oe({__name:"SandboxView",setup(t){const e=jy();_e([e.size,e.seed],()=>{e.phase.value!=="executing"&&e.regenerate()}),wr(()=>{e.fromSharedLink&&e.execute()});const n=C(()=>{var a;return((a=e.lastRun.value)==null?void 0:a.elapsedMs)??null}),s=C(()=>{var a;return((a=e.lastRun.value)==null?void 0:a.rejected)??0}),o=C(()=>{var a;return((a=e.lastRun.value)==null?void 0:a.firstRejectReason)??null});return(a,r)=>(x(),A("div",cw,[h("div",dw,[T(Jy),T(Ny,{modelValue:f(e).source.value,"onUpdate:modelValue":r[0]||(r[0]=i=>f(e).source.value=i),disabled:f(e).phase.value==="executing"},null,8,["modelValue","disabled"]),T(tw,{size:f(e).size.value,"onUpdate:size":r[1]||(r[1]=i=>f(e).size.value=i),speed:f(e).speed.value,"onUpdate:speed":r[2]||(r[2]=i=>f(e).speed.value=i),status:f(e).status.value,executing:f(e).phase.value==="executing","can-edit":f(e).canEdit.value,"is-running":f(e).isRunning.value,"is-paused":f(e).isPaused.value,"has-tape":f(e).stepsCollected.value>0,seed:f(e).seed.value,onExecute:r[3]||(r[3]=i=>f(e).execute()),onCancel:r[4]||(r[4]=i=>f(e).cancel()),onRun:r[5]||(r[5]=i=>f(e).run()),onPause:r[6]||(r[6]=i=>f(e).pause()),onReset:r[7]||(r[7]=i=>f(e).reset()),onRandomize:r[8]||(r[8]=i=>f(e).randomizeSeed()),onResetSource:r[9]||(r[9]=i=>f(e).resetSource()),"onUpdate:seed":r[10]||(r[10]=i=>f(e).seed.value=i)},null,8,["size","speed","status","executing","can-edit","is-running","is-paused","has-tape","seed"]),T(xn,{cursor:f(e).cursor.value,"buffered-count":f(e).bufferedCount.value,"fully-buffered":f(e).fullyBuffered.value,"can-step-back":f(e).canStepBack.value,"can-step-forward":f(e).canStepForward.value,onSeek:r[11]||(r[11]=i=>f(e).seek(i)),onStepBack:r[12]||(r[12]=i=>f(e).stepBack()),onStepForward:r[13]||(r[13]=i=>f(e).stepForward()),onSkipToEnd:r[14]||(r[14]=i=>f(e).skipToEnd())},null,8,["cursor","buffered-count","fully-buffered","can-step-back","can-step-forward"])]),h("div",pw,[T(uw,{phase:f(e).phase.value,error:f(e).error.value,"stop-label":f(e).stopLabel.value,"steps-collected":f(e).stepsCollected.value,rejected:s.value,"first-reject-reason":o.value,"elapsed-ms":n.value,"from-shared-link":f(e).fromSharedLink},null,8,["phase","error","stop-label","steps-collected","rejected","first-reject-reason","elapsed-ms","from-shared-link"]),T(vo,{comparisons:f(e).stats.comparisons,swaps:f(e).stats.swaps,steps:f(e).stepCount.value,"elapsed-ms":f(e).elapsedMs.value,status:f(e).status.value},null,8,["comparisons","swaps","steps","elapsed-ms","status"]),T(bo,{class:"flex-1",title:"Your algorithm",array:f(e).array.value,comparing:f(e).highlights.comparing,swapping:f(e).highlights.swapping,sorted:f(e).highlights.sorted,"max-value":f(e).maxValue.value},null,8,["array","comparing","swapping","sorted","max-value"])])]))}}),hw=5e3,mw=2e3;function gw(t){let e=t.reduce((s,o)=>s+o,0),n=1;for(const s of t){let o=1;for(let a=1;a<=s;a++)o=o*(e-s+a)/a;if(e-=s,n*=o,!Number.isFinite(n)||n>Number.MAX_SAFE_INTEGER)return 1/0}return Math.round(n)}function bw(t){const e=t.reduce((r,i)=>r+i,0),n=[],s=t.map(()=>0),o=[];function a(){if(o.length===e){n.push([...o]);return}for(let r=0;r<t.length;r++)s[r]>=t[r]||(s[r]+=1,o.push(r),a(),o.pop(),s[r]-=1)}return a(),n}function vw(t,e){const n=[...t],s=t.reduce((a,r)=>a+r,0),o=[];for(let a=0;a<s;a++){const r=[];for(let l=0;l<n.length;l++)for(let u=0;u<n[l];u++)r.push(l);const i=e.pick(r);if(i===void 0)break;n[i]-=1,o.push(i)}return o}function yw(t,e){const n=Rr(t),s=e.threshold??hw,o=e.sampleCount??mw,a=gw(n),r=a<s?bw(n):ww(n,e.seed,o),i=a<s?"exhaustive":"sampled",l=r.map(u=>fb(t,u));return{mode:i,totalCount:a,checkedCount:l.length,outcomes:l,violatingCount:l.filter(u=>u.violates).length}}function ww(t,e,n){const s=st(e),o=new Set,a=[];for(let r=0;r<n;r++){const i=vw(t,s),l=i.join(",");o.has(l)||(o.add(l),a.push(i))}return a}function xw(){const t=B(ec),e=B(60),n=B(ze()),s=B([]),o=C(()=>zs[t.value]),a=gr(null);function r(){a.value=yw(o.value,{seed:n.value})}const i=C(()=>{var j;return((j=a.value)==null?void 0:j.outcomes.filter(L=>L.violates))??[]}),l=C(()=>{var j;return((j=a.value)==null?void 0:j.outcomes.filter(L=>!L.violates))??[]}),u=C(()=>{if(!a.value||s.value.length===0)return null;const j=s.value.join(",");return a.value.outcomes.find(L=>L.schedule.join(",")===j)??null}),c=B([]),d=B({}),p=B({}),m=B(null),w=B(!1),g=Le({executed:0,total:0});function v(){return o.value.createState().threads}function b(){const j=o.value.createState();c.value=j.threads,d.value={...j.shared},p.value={...j.locks},m.value=null,w.value=!1,g.executed=0,g.total=s.value.length}const y=vn({speed:e,createGenerator:()=>s.value.length===0?null:(b(),yc(o.value,s.value)),applyStep:(j,L)=>{c.value=j.threads,d.value=j.sharedMem,p.value=j.lockOwners,m.value=j.lastAction,w.value=j.violated,g.executed=L+1},clearStep:b});function S(j){var I;if(!or(o.value,j))return!1;s.value=[...j],y.reset();const L=(I=a.value)==null?void 0:I.outcomes.find(he=>he.schedule.join(",")===j.join(","));return L&&L.violates&&(y.stepForward(),y.seek(L.firstViolationIndex)),!0}function $(j=!1){var I;if(r(),g.total=0,j&&s.value.length>0&&or(o.value,s.value)){S(s.value);return}const L=i.value[0]??((I=a.value)==null?void 0:I.outcomes[0]);L?S(L.schedule):(s.value=[],b())}function _(){n.value=ze()}const{hydrated:N}=Qt(Cb({scenarioKey:t,speed:e,seed:n,schedule:s},()=>o.value));$(N.has("sched")),_e(t,()=>{s.value=[],$()}),_e(n,()=>$());const G=C(()=>{const j=a.value;if(!j)return"";const L=j.violatingCount.toLocaleString();if(j.mode==="exhaustive")return`Checked all ${j.checkedCount.toLocaleString()} possible interleavings — ${L} break the invariant.`;const I=Number.isFinite(j.totalCount)?j.totalCount.toLocaleString():"astronomically many";return`Sampled ${j.checkedCount.toLocaleString()} of ${I} possible interleavings — ${L} of those break the invariant.`});return{scenarioKey:t,scenario:o,speed:e,seed:n,schedule:s,search:a,violating:i,clean:l,selected:u,summary:G,threads:c,sharedMem:d,lockOwners:p,lastAction:m,violatedNow:w,stats:g,idleThreads:v,status:y.status,isRunning:y.isRunning,isPaused:y.isPaused,isDone:y.isDone,canEdit:y.canEdit,elapsedMs:y.elapsedMs,stepCount:y.stepCount,cursor:y.cursor,bufferedCount:y.bufferedCount,fullyBuffered:y.fullyBuffered,current:y.current,canStepBack:y.canStepBack,canStepForward:y.canStepForward,analyse:$,selectSchedule:S,randomizeSeed:_,run:y.run,pause:y.pause,reset:y.reset,stepForward:y.stepForward,stepBack:y.stepBack,seek:y.seek,skipToEnd:y.skipToEnd}}const kw={class:"flex flex-col gap-2"},Sw={class:"block"},$w={class:"block font-semibold"},Ew={class:"block text-[11px] opacity-80"},Cw={class:"mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"},Aw={class:"mt-4 grid grid-cols-2 gap-2"},Tw={class:"mt-4 flex flex-col gap-3"},Ow=oe({__name:"ConcurrencyControls",props:Un({status:{},canEdit:{type:Boolean},isRunning:{type:Boolean},isPaused:{type:Boolean},hasSchedule:{type:Boolean},seed:{}},{scenario:{required:!0},scenarioModifiers:{},speed:{required:!0},speedModifiers:{}}),emits:Un(["run","pause","reset","randomize","update:seed"],["update:scenario","update:speed"]),setup(t,{emit:e}){const n=zn(t,"scenario"),s=zn(t,"speed"),o=e,a=Object.entries(zs);function r(i){const l=Number(i);Number.isInteger(l)&&o("update:seed",l)}return(i,l)=>(x(),Y(we,{title:"Scenario"},{default:D(()=>[h("div",kw,[(x(!0),A(ne,null,fe(f(a),([u,c])=>(x(),Y(Z,{key:u,variant:"selector",class:"text-left",active:n.value===u,disabled:!t.canEdit,onClick:d=>n.value=u},{default:D(()=>[h("span",Sw,[h("span",$w,R(c.name),1),h("span",Ew,R(c.description),1)])]),_:2},1032,["active","disabled","onClick"]))),128))]),h("p",Cw,R(f(zs)[n.value].bug),1),h("div",Aw,[t.isRunning?(x(),Y(Z,{key:0,variant:"warning",onClick:l[0]||(l[0]=u=>o("pause"))},{default:D(()=>[...l[5]||(l[5]=[M("❚❚ Pause",-1)])]),_:1})):(x(),Y(Z,{key:1,variant:"primary",disabled:!t.hasSchedule,onClick:l[1]||(l[1]=u=>o("run"))},{default:D(()=>[M(R(t.isPaused?"▶ Resume":"▶ Play"),1)]),_:1},8,["disabled"])),T(Z,{variant:"neutral",disabled:!t.hasSchedule,onClick:l[2]||(l[2]=u=>o("reset"))},{default:D(()=>[...l[6]||(l[6]=[M("Reset",-1)])]),_:1},8,["disabled"])]),h("div",Tw,[T(Ve,{modelValue:s.value,"onUpdate:modelValue":l[3]||(l[3]=u=>s.value=u),label:"Speed",min:1,max:100,suffix:"%"},null,8,["modelValue"]),T(kt,{label:"Seed",monospace:"","model-value":String(t.seed),disabled:!t.canEdit,"onUpdate:modelValue":r},null,8,["model-value","disabled"]),T(Z,{variant:"quiet",disabled:!t.canEdit,onClick:l[4]||(l[4]=u=>o("randomize"))},{default:D(()=>[...l[7]||(l[7]=[M("New seed",-1)])]),_:1},8,["disabled"]),l[8]||(l[8]=h("p",{class:"text-[11px] text-slate-400 dark:text-slate-500"}," The seed only matters once a scenario is too large to check exhaustively — then it picks which interleavings get sampled. ",-1))])]),_:1}))}}),Mw=oe({__name:"ConcurrencyGuide",setup(t){return(e,n)=>(x(),Y(Zs,{title:"How to read this",summary:"Same code, different orderings. Some orderings are buggy — this finds which.","start-open":""},{default:D(()=>[...n[0]||(n[0]=[h("p",{class:"mb-3 text-slate-600 dark:text-slate-300"},[M(" Two threads run at the same time, so their instructions can land in many different orders. The code never changes; only the "),h("em",null,"ordering"),M(" does. Most concurrency bugs are orderings that happen to be rare — which is exactly why they survive testing and surface in production. This page enumerates the orderings instead of waiting to get unlucky. ")],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400"}," Reading an interleaving ",-1),h("p",{class:"mb-3 text-slate-600 dark:text-slate-300"},[M(" Each chip is one complete ordering, written as letters: "),h("code",{class:"font-mono text-xs"},"A"),M(" means T0 takes its next step, "),h("code",{class:"font-mono text-xs"},"B"),M(" means T1 does. So "),h("code",{class:"font-mono text-xs"},"ABABAB"),M(" is strict alternation, and "),h("code",{class:"font-mono text-xs"},"AAABBB"),M(" is T0 finishing completely before T1 starts. "),h("span",{class:"text-rose-600 dark:text-rose-400"},"Red chips break the invariant"),M("; click any chip to load it, and playback jumps straight to the step where it first goes wrong. ")],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400"}," The two scenarios ",-1),h("ul",{class:"mb-4 space-y-2 text-slate-600 dark:text-slate-300"},[h("li",null,[h("b",null,"Racy counter."),M(),h("code",{class:"font-mono text-xs"},"counter = counter + 1"),M(" is three machine steps, not one: read, add, write. If both threads read before either writes, they both compute the same value and one increment vanishes. Only the two orderings where one thread finishes first are safe. ")]),h("li",null,[h("b",null,"Mutex violation."),M(" Checking whether a lock is free and taking it are separate steps, so both threads can see it free and both walk in. Watch for two lanes showing "),h("em",null,"in critical section"),M(" at once — and note the state looks perfectly fine again by the last step, which is why this bug is so hard to catch after the fact. ")])],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400"}," “Checked all” vs “sampled” ",-1),h("p",{class:"mb-2 text-slate-600 dark:text-slate-300"},[M(" The number of orderings explodes as threads and instructions grow — two threads of three steps is 20, but five threads of four is over 300 billion. When the total is small enough, every single ordering is executed and checked, and the panel says "),h("b",null,"checked all N"),M(". When it is not, orderings are sampled instead and the panel says so. Both scenarios here are small enough to check exhaustively, so nothing is being missed. ")],-1),h("p",{class:"text-slate-500 dark:text-slate-400"}," The seed only matters in sampled mode, where it decides which orderings get drawn. Sharing the URL reproduces the exact interleaving you are looking at. ",-1)])]),_:1}))}}),Rw={class:"mb-3 text-xs text-slate-500 dark:text-slate-400"},_w={class:"flex max-h-52 flex-wrap gap-1.5 overflow-y-auto",role:"listbox"},Iw=["aria-selected","title","onClick"],jw={key:0,class:"mt-2 text-xs text-slate-400 dark:text-slate-500"},Dw=oe({__name:"ScheduleList",props:{outcomes:{},selected:{},summary:{},limit:{default:240}},emits:["select"],setup(t,{emit:e}){const n=t,s=e,o=C(()=>n.selected.join(",")),a=C(()=>[...n.outcomes].sort((u,c)=>Number(c.violates)-Number(u.violates))),r=C(()=>a.value.slice(0,n.limit)),i=C(()=>Math.max(0,a.value.length-r.value.length));function l(u){return u.map(c=>String.fromCharCode(65+c)).join("")}return(u,c)=>(x(),Y(we,{title:"Interleavings"},{default:D(()=>[h("p",Rw,R(t.summary),1),h("div",_w,[(x(!0),A(ne,null,fe(r.value,d=>(x(),A("button",{key:d.schedule.join(","),type:"button",role:"option","aria-selected":d.schedule.join(",")===o.value,title:d.violates?"Breaks the invariant":"Invariant holds throughout",class:de(["rounded-lg border px-2 py-1 font-mono text-[11px] font-semibold transition-colors",[d.violates?"border-rose-300 bg-rose-50 text-rose-600 hover:border-rose-500 dark:border-rose-700 dark:bg-rose-900/30 dark:text-rose-300":"border-slate-200 text-slate-500 hover:border-indigo-400 dark:border-slate-700 dark:text-slate-400",d.schedule.join(",")===o.value?"outline outline-2 outline-offset-1 outline-indigo-500":""]]),onClick:p=>s("select",d.schedule)},R(l(d.schedule)),11,Iw))),128))]),i.value>0?(x(),A("p",jw," + "+R(i.value.toLocaleString())+" more not shown. ",1)):ge("",!0),c[0]||(c[0]=h("p",{class:"mt-3 text-[11px] text-slate-400 dark:text-slate-500"}," Each letter is a thread taking one step. A = T0, B = T1. ",-1))]),_:1}))}}),Pw={class:"mb-4 text-xs text-ink-faint"},Lw={class:"flex flex-col gap-3"},Nw={class:"flex items-center gap-2"},Bw={class:"font-mono text-xs font-bold text-ink-muted"},Fw={class:"flex gap-1.5 overflow-x-auto pb-1"},Hw={class:"mt-4 border-t border-line pt-3"},Vw={class:"flex flex-wrap gap-2"},Uw={key:0,class:"mt-3 font-mono text-xs text-ink-faint"},zw=oe({__name:"ThreadLanes",props:{scenario:{},threads:{},sharedMem:{},lockOwners:{},lastAction:{},violated:{type:Boolean}},setup(t){const e=t,n=C(()=>e.scenario.threads.map((i,l)=>{var c;const u=e.threads[l];return{name:i.name,instructions:i.instructions,pc:(u==null?void 0:u.pc)??0,status:(u==null?void 0:u.status)??"ready",locals:(u==null?void 0:u.locals)??{},activeIndex:((c=e.lastAction)==null?void 0:c.threadId)===l&&u?u.pc-1:-1}})),s=C(()=>Object.entries(e.sharedMem)),o=C(()=>Object.entries(e.lockOwners));function a(i,l){const u=n.value[i];return l===u.activeIndex?u.status==="critical"?`${gt.blocked} ${Gt.blocked} ${Nn.blocked}`:`${gt.active} ${Gt.active} ${Nn.active}`:l<u.pc?`${gt.settled} ${Gt.settled} ${Nn.settled}`:`${gt.idle} ${Nn.idle}`}const r={ready:"bg-surface-alt text-ink-muted",critical:"bg-danger-soft text-danger-ink",done:"bg-ok-soft text-ok-ink"};return(i,l)=>(x(),Y(we,{class:"flex h-full flex-col",title:"Threads"},{header:D(()=>[h("span",{class:de(["rounded-full px-2.5 py-0.5 text-xs font-semibold",t.violated?"bg-danger-soft text-danger-ink":"bg-ok-soft text-ok-ink"])},R(t.violated?"✕ invariant broken":"✓ invariant holds"),3)]),default:D(()=>[h("p",Pw,R(t.scenario.invariant.label),1),h("div",Lw,[(x(!0),A(ne,null,fe(n.value,(u,c)=>(x(),A("div",{key:u.name,class:"flex flex-col gap-1.5"},[h("div",Nw,[h("span",Bw,R(u.name),1),h("span",{class:de(["rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",r[u.status]])},R(u.status==="critical"?"in critical section":u.status),3),(x(!0),A(ne,null,fe(u.locals,(d,p)=>(x(),A("span",{key:p,class:"font-mono text-[11px] text-ink-faint"},R(p)+"="+R(d),1))),128))]),h("div",Fw,[(x(!0),A(ne,null,fe(u.instructions,(d,p)=>(x(),A("span",{key:p,class:de(["whitespace-nowrap rounded-lg border px-2.5 py-1.5 font-mono text-[11px] transition-colors",a(c,p)])},R(d.label),3))),128))])]))),128))]),h("div",Hw,[h("div",Vw,[(x(!0),A(ne,null,fe(s.value,([u,c])=>(x(),A("span",{key:u,class:"rounded-lg bg-surface-alt px-2.5 py-1.5 font-mono text-xs text-ink-muted"},R(u)+": "+R(c),1))),128)),(x(!0),A(ne,null,fe(o.value,([u,c])=>(x(),A("span",{key:u,class:de(["rounded-lg px-2.5 py-1.5 font-mono text-xs",c===null?"bg-surface-alt text-ink-muted":"bg-warn-soft text-warn-ink"])}," lock "+R(u)+": "+R(c===null?"free":`held by T${c}`),3))),128))]),t.lastAction?(x(),A("p",Uw," T"+R(t.lastAction.threadId)+" ran “"+R(t.lastAction.instruction)+"” ",1)):ge("",!0)])]),_:1}))}}),qw={class:"grid gap-4 lg:grid-cols-[minmax(0,360px)_1fr]"},Kw={class:"flex flex-col gap-4"},Gw={class:"flex flex-col gap-4"},Ww={class:"mb-3 grid grid-cols-2 gap-2 sm:grid-cols-4"},Yw={class:"text-sm text-slate-500 dark:text-slate-400"},Xw=oe({__name:"ConcurrencyView",setup(t){const e=xw(),n=C(()=>e.selected.value),s=C(()=>{const a=n.value;return a?a.violates?`This ordering breaks the invariant, first at step ${a.firstViolationIndex+1}.`:"This ordering is safe — the invariant holds at every step.":"No interleaving selected."}),o=C(()=>{var a,r,i;return[{label:"Step",value:`${e.stats.executed} / ${e.stats.total}`},{label:"Broken",value:(((a=e.search.value)==null?void 0:a.violatingCount)??0).toLocaleString()},{label:"Checked",value:(((r=e.search.value)==null?void 0:r.checkedCount)??0).toLocaleString()},{label:"Coverage",value:((i=e.search.value)==null?void 0:i.mode)==="exhaustive"?"all":"sampled"}]});return(a,r)=>{var i;return x(),A("div",qw,[h("div",Kw,[T(Mw),T(Ow,{scenario:f(e).scenarioKey.value,"onUpdate:scenario":r[0]||(r[0]=l=>f(e).scenarioKey.value=l),speed:f(e).speed.value,"onUpdate:speed":r[1]||(r[1]=l=>f(e).speed.value=l),status:f(e).status.value,"can-edit":f(e).canEdit.value,"is-running":f(e).isRunning.value,"is-paused":f(e).isPaused.value,"has-schedule":f(e).schedule.value.length>0,seed:f(e).seed.value,onRun:r[2]||(r[2]=l=>f(e).run()),onPause:r[3]||(r[3]=l=>f(e).pause()),onReset:r[4]||(r[4]=l=>f(e).reset()),onRandomize:r[5]||(r[5]=l=>f(e).randomizeSeed()),"onUpdate:seed":r[6]||(r[6]=l=>f(e).seed.value=l)},null,8,["scenario","speed","status","can-edit","is-running","is-paused","has-schedule","seed"]),T(xn,{cursor:f(e).cursor.value,"buffered-count":f(e).bufferedCount.value,"fully-buffered":f(e).fullyBuffered.value,"can-step-back":f(e).canStepBack.value,"can-step-forward":f(e).canStepForward.value,onSeek:r[7]||(r[7]=l=>f(e).seek(l)),onStepBack:r[8]||(r[8]=l=>f(e).stepBack()),onStepForward:r[9]||(r[9]=l=>f(e).stepForward()),onSkipToEnd:r[10]||(r[10]=l=>f(e).skipToEnd())},null,8,["cursor","buffered-count","fully-buffered","can-step-back","can-step-forward"])]),h("div",Gw,[T(we,{title:"Search"},{header:D(()=>{var l,u;return[h("span",{class:de(["rounded-full px-2.5 py-0.5 text-xs font-semibold",(l=n.value)!=null&&l.violates?"bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300":"bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400"])},R((u=n.value)!=null&&u.violates?"Buggy ordering":"Safe ordering"),3)]}),default:D(()=>[h("div",Ww,[(x(!0),A(ne,null,fe(o.value,l=>(x(),Y(jt,{key:l.label,label:l.label,value:l.value},null,8,["label","value"]))),128))]),h("p",Yw,R(s.value),1)]),_:1}),T(Dw,{outcomes:((i=f(e).search.value)==null?void 0:i.outcomes)??[],selected:f(e).schedule.value,summary:f(e).summary.value,onSelect:r[11]||(r[11]=l=>f(e).selectSchedule(l))},null,8,["outcomes","selected","summary"]),T(zw,{class:"flex-1",scenario:f(e).scenario.value,threads:f(e).threads.value,"shared-mem":f(e).sharedMem.value,"lock-owners":f(e).lockOwners.value,"last-action":f(e).lastAction.value,violated:f(e).violatedNow.value},null,8,["scenario","threads","shared-mem","lock-owners","last-action","violated"])])])}}}),Jw={key:0,class:"text-sm text-ink-muted"},Qw={key:1,class:"space-y-3"},Zw={key:0,class:"text-sm text-ink-muted"},ex={key:1,class:"break-words rounded-xl bg-surface-alt p-3 font-mono text-sm text-ink sm:text-base"},tx={key:2,class:"space-y-1.5 text-sm"},nx={class:"text-ink-muted"},jr=oe({__name:"AvStepInspector",props:{title:{default:"Why this step"},headline:{default:null},formula:{default:null},rows:{default:()=>[]},empty:{default:"Run a step to see how it was computed."}},setup(t){const e=t,n={neutral:"text-ink",good:"text-ok-ink",warn:"text-warn-ink",bad:"text-danger-ink"};function s(a){return n[a??"neutral"]}const o=C(()=>!e.headline&&!e.formula&&e.rows.length===0);return(a,r)=>(x(),Y(we,{title:t.title},{default:D(()=>[o.value?(x(),A("p",Jw,R(t.empty),1)):(x(),A("div",Qw,[t.headline?(x(),A("p",Zw,R(t.headline),1)):ge("",!0),t.formula?(x(),A("div",ex,R(t.formula),1)):ge("",!0),t.rows.length?(x(),A("dl",tx,[(x(!0),A(ne,null,fe(t.rows,i=>(x(),A("div",{key:i.label,class:"flex items-center justify-between gap-3"},[h("dt",nx,R(i.label),1),h("dd",{class:de(["break-words text-right font-mono",s(i.tone)])},R(i.value),3)]))),128))])):ge("",!0)]))]),_:1},8,["title"]))}}),sx={class:"mt-5 grid grid-cols-2 gap-2"},ox={class:"mt-3 text-center text-xs text-slate-400"},ax=oe({__name:"DpControls",props:{speed:{},status:{},canEdit:{type:Boolean},isRunning:{type:Boolean},isPaused:{type:Boolean},canRun:{type:Boolean}},emits:["update:speed","run","pause","reset","step"],setup(t,{emit:e}){const n=t,s=e,o=C(()=>n.canRun?n.canEdit?"Editing the input clears the table and starts over.":"The algorithm and its input lock while the table fills.":"Fix the input before running.");return(a,r)=>(x(),Y(we,{title:"Controls"},{default:D(()=>[T(Ve,{label:"Speed","model-value":t.speed,min:1,max:100,suffix:"%","onUpdate:modelValue":r[0]||(r[0]=i=>s("update:speed",i))},null,8,["model-value"]),h("div",sx,[t.isRunning?(x(),Y(Z,{key:1,variant:"warning",class:"col-span-2",onClick:r[2]||(r[2]=i=>s("pause"))},{default:D(()=>[...r[6]||(r[6]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M6 4h4v16H6zM14 4h4v16h-4z"})],-1),M(" Pause ",-1)])]),_:1})):(x(),Y(Z,{key:0,variant:"primary",class:"col-span-2",disabled:!t.canRun,onClick:r[1]||(r[1]=i=>s("run"))},{default:D(()=>[r[5]||(r[5]=h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M8 5v14l11-7z"})],-1)),M(" "+R(t.isPaused?"Resume":"Run"),1)]),_:1},8,["disabled"])),T(Z,{variant:"neutral",onClick:r[3]||(r[3]=i=>s("reset"))},{default:D(()=>[...r[7]||(r[7]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.36 2.64L3 8"}),h("path",{d:"M3 3v5h5"})],-1),M(" Reset ",-1)])]),_:1}),T(Z,{variant:"neutral",disabled:!t.canRun,onClick:r[4]||(r[4]=i=>s("step"))},{default:D(()=>[...r[8]||(r[8]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M6 5v14l9-7z"}),h("path",{d:"M17 5h2v14h-2z"})],-1),M(" Step ",-1)])]),_:1},8,["disabled"])]),h("p",ox,R(o.value),1)]),_:1}))}}),rx=oe({__name:"DpGuide",setup(t){return(e,n)=>(x(),Y(Zs,{title:"How to read this",summary:"Every cell is a smaller version of the same question, answered once and reused.","start-open":""},{default:D(()=>[...n[0]||(n[0]=[h("p",{class:"mb-3 text-slate-600 dark:text-slate-300"},[M(" A dynamic programming table is a list of subproblems with their answers written down. Each cell asks a smaller version of the same question — "),h("em",null,"what is the best I can do with the first 3 items and a capacity of 5?"),M(" — and the recurrence at the top of the table says how to answer it using cells that are already filled in. Nothing is ever computed twice, which is the entire trick: the naive recursion asks the same subproblem over and over, and the table simply refuses to. ")],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400"}," Reading the arrows ",-1),h("p",{class:"mb-3 text-slate-600 dark:text-slate-300"},[M(" The "),h("span",{class:"text-amber-600 dark:text-amber-400"},"amber cell"),M(" is the one being computed right now. The "),h("span",{class:"text-sky-600 dark:text-sky-400"},"blue cells"),M(" are the ones its recurrence read, and an arrow runs from each of them into it. Where the recurrence has to "),h("em",null,"choose"),M(" — take the item or skip it, insert or delete or substitute — the winning branch is drawn "),h("span",{class:"text-rose-600 dark:text-rose-400"},"thicker and in red"),M(", and the others stay thin. That red arrow is the decision the traceback will later follow back. ")],-1),h("p",{class:"mb-3 text-slate-600 dark:text-slate-300"},[M(" Hover any cell — filled or not, at any point in the run — to see the arrows for "),h("em",null,"that"),M(" cell instead, drawn dashed. They come from the same function the animation uses, so what you see on hover is exactly what the algorithm would read. ")],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400"}," The traceback ",-1),h("p",{class:"mb-3 text-slate-600 dark:text-slate-300"},[M(" Filling the table answers the question with a "),h("em",null,"number"),M(": the length of the longest common subsequence, the cost of the cheapest parenthesisation. It does not, by itself, tell you "),h("em",null,"which"),M(" subsequence or "),h("em",null,"which"),M(" parenthesisation. The "),h("span",{class:"text-emerald-600 dark:text-emerald-400"},"green path"),M(" is the second pass that recovers it, walking backwards from the answer cell and, at each step, asking which branch won there. That is why the traceback lights up a thin path through a large table — most of the cells were needed to be sure, but only a few are part of the answer. ")],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400"}," Cells versus calls ",-1),h("p",{class:"text-slate-500 dark:text-slate-400"},[M(" The stats panel counts both: the cells this table costs, and the calls the naive recursion would have made on the same input. Fibonacci at n = 40 is 41 cells against 331 million calls. The call counts are exact, not estimated — and where one grows past what a JavaScript number can hold exactly, it is shown as a lower bound ("),h("code",{class:"font-mono text-xs"},"> 9.0e15"),M(") rather than as a wrong-looking round number. ")],-1)])]),_:1}))}}),ix={class:"space-y-4"},lx={class:"text-xs text-slate-400"},ux={key:0,class:"mt-3 text-xs text-rose-500 dark:text-rose-400"},cx={key:1,class:"mt-3 text-xs text-slate-400"},dx={class:"mt-4"},px=oe({__name:"DpInputPanel",props:{algoKey:{},input:{},canEdit:{type:Boolean}},emits:["update:input","shuffle"],setup(t,{emit:e}){const n=t,s=e,o=Le({n:12,coins:"",amount:11,values:"",weights:"",itemValues:"",capacity:9,a:"",b:"",dims:""});let a="";const r=C(()=>Kt[n.algoKey]),i=C(()=>Nu(r.value,n.input)),l=C(()=>r.value.kind),u=C(()=>{const b=i.value.axes.colTitle||"size";return b.charAt(0).toUpperCase()+b.slice(1)}),c=C(()=>{const{rows:b,cols:y}=i.value.dims;return{rows:b,cols:y,cells:b*y}});function d(){const b=Dn(o.weights,{min:1,max:99,maxLength:30});if(b.error)return{items:null,error:b.error};const S=o.itemValues.trim()===""?{values:b.values.map(()=>0),error:null}:Dn(o.itemValues,{min:0,max:999,maxLength:30});return S.error?{items:null,error:S.error}:S.values.length!==b.values.length?{items:null,error:`Give one value per weight — ${b.values.length} weights, ${S.values.length} values.`}:{items:b.values.map(($,_)=>({weight:$,value:S.values[_]})),error:null}}const p=C(()=>{switch(l.value){case"scalar":return{input:{kind:"scalar",n:o.n},error:null};case"coins":{const b=Dn(o.coins,{min:1,max:99,maxLength:8});return b.error?{input:null,error:b.error}:{input:{kind:"coins",coins:b.values,amount:o.amount},error:null}}case"sequence":{const b=Dn(o.values,{min:1,max:99,maxLength:40});return b.error?{input:null,error:b.error}:{input:{kind:"sequence",values:b.values},error:null}}case"items":{const{items:b,error:y}=d();return b===null?{input:null,error:y}:{input:{kind:"items",items:b,capacity:o.capacity},error:null}}case"strings2":return{input:{kind:"strings2",a:o.a,b:o.b},error:null};case"chain":{const b=Dn(o.dims,{min:1,max:999,maxLength:31});return b.error?{input:null,error:b.error}:{input:{kind:"chain",dims:b.values},error:null}}}return{input:null,error:null}}),m=C(()=>p.value.error!==null?p.value.error:p.value.input===null?null:_o(r.value,p.value.input));function w(){const b=p.value.input;b!==null&&_o(r.value,b)===null&&(a=js(b),s("update:input",b))}function g(b,y){o[b]=y,w()}function v(b){switch(b.kind){case"scalar":o.n=b.n;break;case"coins":o.coins=b.coins.join(", "),o.amount=b.amount;break;case"sequence":o.values=b.values.join(", ");break;case"items":o.weights=b.items.map(y=>y.weight).join(", "),o.itemValues=b.items.map(y=>y.value).join(", "),o.capacity=b.capacity;break;case"strings2":o.a=b.a,o.b=b.b;break;case"chain":o.dims=b.dims.join(", ");break}a=js(b)}return _e(()=>n.input,b=>{js(b)!==a&&v(b)},{immediate:!0,deep:!0}),(b,y)=>(x(),Y(we,{title:"Input"},{default:D(()=>[h("div",ix,[l.value==="scalar"?(x(),Y(Ve,{key:0,label:"n","model-value":o.n,min:0,max:40,disabled:!t.canEdit,"onUpdate:modelValue":y[0]||(y[0]=S=>g("n",S))},null,8,["model-value","disabled"])):l.value==="coins"?(x(),A(ne,{key:1},[T(kt,{label:"Coin values",placeholder:"1, 3, 4",monospace:"","model-value":o.coins,disabled:!t.canEdit,"onUpdate:modelValue":y[1]||(y[1]=S=>g("coins",S))},null,8,["model-value","disabled"]),T(Ve,{label:u.value,"model-value":o.amount,min:0,max:60,disabled:!t.canEdit,"onUpdate:modelValue":y[2]||(y[2]=S=>g("amount",S))},null,8,["label","model-value","disabled"])],64)):l.value==="sequence"?(x(),Y(kt,{key:2,label:"Sequence",placeholder:"3, 10, 2, 1, 20",monospace:"","model-value":o.values,disabled:!t.canEdit,"onUpdate:modelValue":y[3]||(y[3]=S=>g("values",S))},null,8,["model-value","disabled"])):l.value==="items"?(x(),A(ne,{key:3},[T(kt,{label:"Item weights",placeholder:"2, 3, 4, 5",monospace:"","model-value":o.weights,disabled:!t.canEdit,"onUpdate:modelValue":y[4]||(y[4]=S=>g("weights",S))},null,8,["model-value","disabled"]),T(kt,{label:"Item values (blank = all zero)",placeholder:"3, 4, 5, 8",monospace:"","model-value":o.itemValues,disabled:!t.canEdit,"onUpdate:modelValue":y[5]||(y[5]=S=>g("itemValues",S))},null,8,["model-value","disabled"]),T(Ve,{label:u.value,"model-value":o.capacity,min:0,max:60,disabled:!t.canEdit,"onUpdate:modelValue":y[6]||(y[6]=S=>g("capacity",S))},null,8,["label","model-value","disabled"])],64)):l.value==="strings2"?(x(),A(ne,{key:4},[T(kt,{label:"String a (rows)",placeholder:"kitten",monospace:"","model-value":o.a,disabled:!t.canEdit,"onUpdate:modelValue":y[7]||(y[7]=S=>g("a",S))},null,8,["model-value","disabled"]),T(kt,{label:"String b (columns)",placeholder:"sitting",monospace:"","model-value":o.b,disabled:!t.canEdit,"onUpdate:modelValue":y[8]||(y[8]=S=>g("b",S))},null,8,["model-value","disabled"])],64)):(x(),A(ne,{key:5},[T(kt,{label:"Matrix dimensions",placeholder:"40, 20, 30, 10, 30",monospace:"","model-value":o.dims,disabled:!t.canEdit,"onUpdate:modelValue":y[9]||(y[9]=S=>g("dims",S))},null,8,["model-value","disabled"]),h("p",lx,R(c.value.rows)+" matrices — dimension i and i + 1 are the shape of matrix i. ",1)],64))]),m.value?(x(),A("p",ux,R(m.value),1)):(x(),A("p",cx," Table: "+R(c.value.rows)+" × "+R(c.value.cols)+" = "+R(c.value.cells.toLocaleString())+" cells (limit "+R(f(qa).toLocaleString())+"). ",1)),h("div",dx,[T(Z,{variant:"quiet",class:"w-full",disabled:!t.canEdit,onClick:y[10]||(y[10]=S=>s("shuffle"))},{default:D(()=>[...y[11]||(y[11]=[M(" Shuffle input ",-1)])]),_:1},8,["disabled"])])]),_:1}))}}),Dr=oe({__name:"AvStatGrid",props:{cells:{},columns:{default:4}},setup(t){const e={2:"grid grid-cols-2 gap-2",3:"grid grid-cols-2 gap-2 sm:grid-cols-3",4:"grid grid-cols-2 gap-2 sm:grid-cols-4"};return(n,s)=>(x(),A("div",{class:de(e[t.columns])},[(x(!0),A(ne,null,fe(t.cells,o=>(x(),Y(jt,{key:o.label,label:o.label,value:o.value},null,8,["label","value"]))),128))],2))}}),fx={key:0,class:"mb-3 break-words rounded-xl bg-emerald-50 p-3 text-center text-sm font-semibold text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"},hx={key:1,class:"mb-3 rounded-xl bg-amber-50 p-3 text-center text-xs font-semibold text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"},mx=oe({__name:"DpStats",props:{cellsFilled:{},fillable:{},rows:{},cols:{},naiveCalls:{},speedup:{},steps:{},elapsedMs:{},status:{},result:{},truncated:{type:Boolean}},setup(t){const e=t,n=C(()=>e.speedup<=0?"—":`${Fu(e.naiveCalls)?"> ":""}${Ii(Math.round(e.speedup))}×`),s=C(()=>[{label:"Cells filled",value:`${e.cellsFilled.toLocaleString()} / ${e.fillable.toLocaleString()}`},{label:"Naive calls",value:Ii(e.naiveCalls)},{label:"Cheaper by",value:n.value},{label:"Table",value:`${e.rows} × ${e.cols}`},{label:"Steps",value:e.steps.toLocaleString()},{label:"Elapsed",value:`${(e.elapsedMs/1e3).toFixed(2)}s`}]),o=C(()=>({idle:"Idle",running:"Running",paused:"Paused",done:"Done"})[e.status]??e.status),a=C(()=>({idle:"bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",running:"bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400",paused:"bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400",done:"bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400"})[e.status]);return(r,i)=>(x(),Y(we,{title:"Stats"},{header:D(()=>[h("span",{class:de(["rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",a.value])},R(o.value),3)]),default:D(()=>[t.result?(x(),A("div",fx,R(t.result),1)):ge("",!0),t.truncated?(x(),A("div",hx," The step cap stopped this run early — the counts below are partial. ")):ge("",!0),T(Dr,{cells:s.value,columns:3},null,8,["cells"])]),_:1}))}}),gx=34,bx=4,vx=40,yx=6;function hl(t,e,n,s=0){const o=n.x-t.x,a=n.y-t.y,r=Math.hypot(o,a);if(r===0)return{x:t.x,y:t.y};const i=o/r,l=a/r,u=i===0?1/0:e.w/Math.abs(i),c=l===0?1/0:e.h/Math.abs(l),d=Math.min(u,c)+s;return{x:t.x+i*d,y:t.y+l*d}}function wx(t){const e=Math.max(0,t.rows),n=Math.max(0,t.cols),s=t.cell??gx,o=t.gap??bx,a=t.header??vx,r=t.pad??yx,i=s+o,l=r+a,u=r+a,c=n===0?l+r:l+n*i-o+r,d=e===0?u+r:u+e*i-o+r,p={w:s/2,h:s/2},m=(g,v)=>({x:l+v*i,y:u+g*i,w:s,h:s}),w=(g,v)=>({x:l+v*i+s/2,y:u+g*i+s/2});return{rows:e,cols:n,cell:s,gap:o,header:a,pad:r,width:c,height:d,viewBox:`0 0 ${c} ${d}`,cellRect:m,center:w,rowHeaderRect:g=>({x:r,y:u+g*i,w:a,h:s}),colHeaderRect:g=>({x:l+g*i,y:r,w:s,h:a}),arrow:(g,v)=>{if(g.row===v.row&&g.col===v.col)return null;const b=w(g.row,g.col),y=w(v.row,v.col),S=hl(b,p,y,1),$=hl(y,p,b,3);return{x1:S.x,y1:S.y,x2:$.x,y2:$.y}}}}const xx={class:"mb-3 flex flex-wrap items-center gap-x-4 gap-y-2"},kx={class:"text-xs font-semibold uppercase tracking-wider text-ink-faint"},Sx={key:0,class:"rounded-lg bg-surface-alt px-2 py-1 font-mono text-xs text-accent"},$x=["width","height","viewBox"],Ex=["x","y"],Cx=["x","y"],Ax=["x","y"],Tx=["x","y"],Ox=["aria-label","data-cell","data-tone","onPointerenter"],Mx=["x","y","width","height"],Rx=["x","y","font-size"],_x={class:"pointer-events-none"},Ix=["x1","y1","x2","y2"],jx=["x1","y1","x2","y2","stroke-width","marker-end"],Dx=oe({__name:"DpTable",props:{table:{},axes:{},recurrence:{default:""},cursor:{default:null},deps:{default:()=>[]},chosen:{default:null},path:{default:()=>[]},hoverCell:{default:null},hoverDeps:{default:()=>[]},title:{default:"Table"}},emits:["hover-cell"],setup(t,{emit:e}){const n=t,s=e,o={empty:"fill-tone-idle-soft",filled:"fill-tone-settled-soft",path:"fill-tone-trace-soft",dep:"fill-tone-trace-soft",focus:"fill-tone-probe-soft/60",filling:"fill-tone-active-soft"},a=kn([{tone:"idle",label:"Not computed"},{tone:"settled",label:"Computed"},{tone:"active",label:"Filling now"},{tone:"trace",label:"Read by this cell"},{tone:"trace",label:"Traceback"}]);function r(j){return`${j.row},${j.col}`}const i=C(()=>n.table.length),l=C(()=>{var j;return((j=n.table[0])==null?void 0:j.length)??0}),u=C(()=>wx({rows:i.value,cols:l.value})),c=C(()=>new Set(n.deps.map(r))),d=C(()=>new Set(n.hoverDeps.map(r))),p=C(()=>new Set(n.path.map(r)));function m(j,L){const I=`${j},${L}`;return n.cursor&&n.cursor.row===j&&n.cursor.col===L?"filling":n.hoverCell&&n.hoverCell.row===j&&n.hoverCell.col===L?"focus":c.value.has(I)||d.value.has(I)?"dep":p.value.has(I)?"path":n.table[j][L]===null?"empty":"filled"}function w(j){return Math.round(Math.min(13,50/Math.max(1,j.length))*2)/2}function g(j){return j.length>7?`${j.slice(0,6)}…`:j}const v={empty:"",filled:"",filling:", being computed now",focus:"",dep:", read by the current cell",path:", on the traceback path"},b=C(()=>{const j=[];for(let L=0;L<i.value;L++)for(let I=0;I<l.value;I++){const he=n.table[L][I],Se=Kn(he),z=m(L,I),ae=n.axes.rowHeaders[L]??String(L),P=n.axes.colHeaders[I]??String(I);j.push({key:`${L},${I}`,row:L,col:I,rect:u.value.cellRect(L,I),text:Se,fontSize:w(Se),tone:z,label:he===null?`${ae} by ${P}: not computed yet`:`${ae} by ${P}: ${Se}${v[z]}`})}return j}),y=C(()=>Array.from({length:l.value},(j,L)=>{const I=n.axes.colHeaders[L]??String(L),he=u.value.colHeaderRect(L);return{key:L,x:he.x+u.value.cell/2,y:he.y+he.h-8,text:g(I),full:I}})),S=C(()=>Array.from({length:i.value},(j,L)=>{const I=n.axes.rowHeaders[L]??String(L),he=u.value.rowHeaderRect(L);return{key:L,x:he.x+he.w-6,y:he.y+he.h/2,text:g(I),full:I}}));function $(j,L,I){if(j===null)return[];const he=new Set,Se=[];for(const z of L){const ae=r(z);if(he.has(ae))continue;he.add(ae);const P=u.value.arrow(z,j);P!==null&&Se.push({key:ae,...P,chosen:I!==null&&I.row===z.row&&I.col===z.col,label:z.label})}return Se.sort((z,ae)=>Number(z.chosen)-Number(ae.chosen))}const _=C(()=>$(n.cursor,n.deps,n.chosen)),N=C(()=>{const j=n.hoverCell;return j===null?[]:n.cursor&&n.cursor.row===j.row&&n.cursor.col===j.col?[]:$(j,n.hoverDeps,null)});function G(j,L){s("hover-cell",{row:j,col:L})}return(j,L)=>(x(),Y(we,{class:"flex h-full flex-col"},{default:D(()=>[h("div",xx,[h("h2",kx,R(t.title),1),t.recurrence?(x(),A("code",Sx,R(t.recurrence),1)):ge("",!0),T(Mn,{items:f(a)},null,8,["items"])]),h("div",{class:"max-h-[60vh] flex-1 overflow-auto rounded-xl bg-surface-alt p-3",onPointerleave:L[0]||(L[0]=I=>s("hover-cell",null))},[(x(),A("svg",{width:u.value.width,height:u.value.height,viewBox:u.value.viewBox,class:"block select-none"},[L[1]||(L[1]=h("defs",null,[h("marker",{id:"dp-arrowhead",viewBox:"0 0 8 8",refX:"7",refY:"4",markerWidth:"5",markerHeight:"5",orient:"auto-start-reverse"},[h("path",{d:"M0 0 L8 4 L0 8 z",class:"fill-ink-muted"})]),h("marker",{id:"dp-arrowhead-chosen",viewBox:"0 0 8 8",refX:"7",refY:"4",markerWidth:"5",markerHeight:"5",orient:"auto-start-reverse"},[h("path",{d:"M0 0 L8 4 L0 8 z",class:"fill-tone-active"})])],-1)),(x(!0),A(ne,null,fe(y.value,I=>(x(),A("text",{key:`col-${I.key}`,x:I.x,y:I.y,"text-anchor":"middle","dominant-baseline":"central",class:"fill-ink-muted text-[10px] font-semibold"},[h("title",null,R(I.full),1),M(" "+R(I.text),1)],8,Ex))),128)),(x(!0),A(ne,null,fe(S.value,I=>(x(),A("text",{key:`row-${I.key}`,x:I.x,y:I.y,"text-anchor":"end","dominant-baseline":"central",class:"fill-ink-muted text-[10px] font-semibold"},[h("title",null,R(I.full),1),M(" "+R(I.text),1)],8,Cx))),128)),t.axes.colTitle?(x(),A("text",{key:0,x:u.value.pad+4,y:u.value.pad+u.value.header/2-6,class:"fill-ink-faint text-[9px] font-semibold uppercase tracking-wide"},R(t.axes.colTitle)+" → ",9,Ax)):ge("",!0),t.axes.rowTitle?(x(),A("text",{key:1,x:u.value.pad+4,y:u.value.pad+u.value.header/2+8,class:"fill-ink-faint text-[9px] font-semibold uppercase tracking-wide"},R(t.axes.rowTitle)+" ↓ ",9,Tx)):ge("",!0),(x(!0),A(ne,null,fe(b.value,I=>(x(),A("g",{key:I.key,role:"img","aria-label":I.label,"data-cell":I.key,"data-tone":I.tone,onPointerenter:he=>G(I.row,I.col)},[h("title",null,R(I.label),1),h("rect",{x:I.rect.x,y:I.rect.y,width:I.rect.w,height:I.rect.h,rx:"4",class:de(["transition-colors duration-150 ease-out",o[I.tone]])},null,10,Mx),h("text",{x:I.rect.x+I.rect.w/2,y:I.rect.y+I.rect.h/2,"font-size":I.fontSize,"text-anchor":"middle","dominant-baseline":"central",class:de(["pointer-events-none font-semibold",I.tone==="empty"?"fill-ink-faint":"fill-ink"])},R(I.text),11,Rx)],40,Ox))),128)),h("g",_x,[(x(!0),A(ne,null,fe(N.value,I=>(x(),A("line",{key:`hover-${I.key}`,x1:I.x1,y1:I.y1,x2:I.x2,y2:I.y2,"stroke-width":"1.5","stroke-dasharray":"3 3","marker-end":"url(#dp-arrowhead)",class:"stroke-ink-muted"},null,8,Ix))),128)),(x(!0),A(ne,null,fe(_.value,I=>(x(),A("line",{key:I.key,x1:I.x1,y1:I.y1,x2:I.x2,y2:I.y2,"stroke-width":I.chosen?2.5:1.5,"marker-end":I.chosen?"url(#dp-arrowhead-chosen)":"url(#dp-arrowhead)",class:de(I.chosen?"stroke-tone-active":"stroke-ink-muted")},[h("title",null,R(I.label),1)],10,jx))),128))])],8,$x))],32),L[2]||(L[2]=h("p",{class:"mt-3 text-center text-xs text-ink-faint"}," Hover any cell to see which cells its value was read from. ",-1))]),_:1}))}}),Px={class:"grid gap-4 lg:grid-cols-[minmax(0,360px)_1fr]"},Lx={class:"flex flex-col gap-4"},Nx={class:"flex flex-col gap-4"},Bx=oe({__name:"DpView",setup(t){const e=Ng();function n(r){return e.dims.value.rows===1?`dp[${r.col}]`:`dp[${r.row}][${r.col}]`}function s(r){const i=e.view.chosen;return i!==null&&i.row===r.row&&i.col===r.col}const o=C(()=>e.view.deps.map(r=>({label:r.label,value:`${n(r)} = ${Kn(r.value)}`,tone:s(r)?"good":"neutral"}))),a=C(()=>e.current.value===null?null:e.view.cursor!==null?`Computing ${n(e.view.cursor)}`:e.view.result!==null?"Finished — the answer is decoded from the table":e.view.path.length>0?"Tracing back through the branches that won":null);return(r,i)=>(x(),A("div",Px,[h("div",Lx,[T(An,{modelValue:f(e).algoKey.value,"onUpdate:modelValue":i[0]||(i[0]=l=>f(e).algoKey.value=l),algorithms:f(Kt),columns:2,disabled:!f(e).canEdit.value},null,8,["modelValue","algorithms","disabled"]),T(rx),T(px,{"algo-key":f(e).algoKey.value,input:f(e).input.value,"can-edit":f(e).canEdit.value,"onUpdate:input":i[1]||(i[1]=l=>f(e).setInput(l)),onShuffle:i[2]||(i[2]=l=>f(e).randomizeSeed())},null,8,["algo-key","input","can-edit"]),T(ax,{speed:f(e).speed.value,"onUpdate:speed":i[3]||(i[3]=l=>f(e).speed.value=l),status:f(e).status.value,"can-edit":f(e).canEdit.value,"is-running":f(e).isRunning.value,"is-paused":f(e).isPaused.value,"can-run":f(e).canRun.value,onRun:i[4]||(i[4]=l=>f(e).run()),onPause:i[5]||(i[5]=l=>f(e).pause()),onReset:i[6]||(i[6]=l=>f(e).reset()),onStep:i[7]||(i[7]=l=>f(e).stepForward())},null,8,["speed","status","can-edit","is-running","is-paused","can-run"]),T(xn,{cursor:f(e).cursor.value,"buffered-count":f(e).bufferedCount.value,"fully-buffered":f(e).fullyBuffered.value,"can-step-back":f(e).canStepBack.value,"can-step-forward":f(e).canStepForward.value,onSeek:i[8]||(i[8]=l=>f(e).seek(l)),onStepBack:i[9]||(i[9]=l=>f(e).stepBack()),onStepForward:i[10]||(i[10]=l=>f(e).stepForward()),onSkipToEnd:i[11]||(i[11]=l=>f(e).skipToEnd())},null,8,["cursor","buffered-count","fully-buffered","can-step-back","can-step-forward"])]),h("div",Nx,[T(mx,{"cells-filled":f(e).stats.value.cellsFilled,fillable:f(e).stats.value.fillable,rows:f(e).stats.value.rows,cols:f(e).stats.value.cols,"naive-calls":f(e).stats.value.naiveCalls,speedup:f(e).stats.value.speedup,steps:f(e).stepCount.value,"elapsed-ms":f(e).elapsedMs.value,status:f(e).status.value,result:f(e).view.result,truncated:f(e).truncated.value},null,8,["cells-filled","fillable","rows","cols","naive-calls","speedup","steps","elapsed-ms","status","result","truncated"]),T(Dx,{table:f(e).table.value,axes:f(e).axes.value,recurrence:f(e).recurrence.value,cursor:f(e).view.cursor,deps:f(e).view.deps,chosen:f(e).view.chosen,path:f(e).view.path,"hover-cell":f(e).hoverCell.value,"hover-deps":f(e).hoverDeps.value,onHoverCell:i[12]||(i[12]=l=>f(e).setHoverCell(l))},null,8,["table","axes","recurrence","cursor","deps","chosen","path","hover-cell","hover-deps"]),T(jr,{headline:a.value,formula:f(e).view.explain,rows:o.value,empty:"Run a step to see how a cell was computed."},null,8,["headline","formula","rows"]),T(oa,{lines:f(e).pseudocodeLines.value,source:f(e).sourceCode.value.text,"source-file":f(e).sourceCode.value.file,"active-line":f(e).activeLine.value,"active-source-lines":f(e).activeSourceLines.value},null,8,["lines","source","source-file","active-line","active-source-lines"])])]))}}),Fx=oe({__name:"MstGuide",setup(t){return(e,n)=>(x(),Y(Zs,{title:"How to read this",summary:"A disjoint set answers one question fast: are these two nodes already connected?","start-open":""},{default:D(()=>[...n[0]||(n[0]=[h("p",{class:"mb-3 text-slate-600 dark:text-slate-300"},[M(" A "),h("b",null,"disjoint-set forest"),M(" (union-find) partitions a collection of elements into groups — here, nodes into the components they belong to — and supports exactly two operations: "),h("code",{class:"font-mono text-xs"},"find(x)"),M(", which returns the group's representative, and "),h("code",{class:"font-mono text-xs"},"union(a, b)"),M(", which merges two groups into one. Two elements are in the same group precisely when "),h("code",{class:"font-mono text-xs"},"find"),M(" returns the same answer for both. The forest panel on the right draws exactly that: an arrow from each node to its parent, with a self-pointing root marking a group's representative. ")],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400"}," Two optimizations, one payoff ",-1),h("ul",{class:"mb-4 space-y-2 text-slate-600 dark:text-slate-300"},[h("li",null,[h("b",null,"Union by rank."),M(" When two trees merge, the shallower one is hung under the deeper one, never the other way round. Do this consistently and a forest built from n elements can never get deeper than log₂(n) — the Stats panel's "),h("b",null,"Max Depth"),M(" is that bound made visible, not just another counter. ")]),h("li",null,[h("b",null,"Path compression."),M(" Every "),h("code",{class:"font-mono text-xs"},"find"),M(" re-hangs every node it walked through directly onto the root it found. The next "),h("code",{class:"font-mono text-xs"},"find"),M(` on any of those nodes is then one hop instead of a walk — watch the forest panel's amber "on find path" nodes turn emerald the instant this happens. `)])],-1),h("p",{class:"mb-4 text-slate-600 dark:text-slate-300"},[M(" Neither optimization is required for correctness — a disjoint set built without them still answers "),h("code",{class:"font-mono text-xs"},"find"),M(" and "),h("code",{class:"font-mono text-xs"},"union"),M(" correctly, just slowly, degenerating toward a linked list under an unlucky sequence of unions. Together they bring every operation down to "),h("code",{class:"font-mono text-xs"},"O(α(n))"),M(" amortized — "),h("code",{class:"font-mono text-xs"},"α"),M(' being the inverse Ackermann function, which is under 5 for any n you could ever construct. That is "constant time" in every practical sense. ')],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400"}," Why Kruskal needs exactly this ",-1),h("p",{class:"mb-2 text-slate-600 dark:text-slate-300"},[M(` Kruskal's rule is trivial to state — sort every edge by weight, then accept it unless its two endpoints are already connected — and completely useless without a fast answer to "already connected?", asked once per edge, on a component structure that is changing under the question as edges get accepted. A disjoint set is the one structure built to answer that question near-instantly: `),h("code",{class:"font-mono text-xs"},"find(u) === find(v)"),M(" is the whole cycle check, and "),h("code",{class:"font-mono text-xs"},"union(u, v)"),M(" is the whole merge. The two obvious alternatives are both dramatically worse — re-running a traversal from scratch per edge to check connectivity is O(E) work E times over, and maintaining an explicit component-id array means relabelling half the graph on every merge. ")],-1),h("p",{class:"text-slate-500 dark:text-slate-400"},` Prim doesn't strictly need one — it could track "in the tree / not in the tree" with a plain boolean array — but this visualization runs a real disjoint set underneath it anyway, purely so both algorithms render through the same forest panel. See prim.ts's own header comment for exactly which of its counters are meaningful as a result and which are just bookkeeping. `,-1)])]),_:1}))}}),Hx={class:"space-y-4"},Vx={class:"mt-5 grid grid-cols-2 gap-2"},Ux={class:"mt-3 grid grid-cols-1 gap-2"},zx=oe({__name:"MstControls",props:{nodeCount:{},seed:{},speed:{},status:{},canEdit:{type:Boolean},isRunning:{type:Boolean},isPaused:{type:Boolean}},emits:["update:nodeCount","update:speed","update:seed","randomize","generate","run","pause","reset"],setup(t,{emit:e}){const n=e;function s(o){const a=Number(o);Number.isInteger(a)&&n("update:seed",a)}return(o,a)=>(x(),Y(we,{title:"Controls"},{default:D(()=>[h("div",Hx,[T(Ve,{label:"Node count","model-value":t.nodeCount,min:f(dc),max:f(pc),disabled:!t.canEdit,"onUpdate:modelValue":a[0]||(a[0]=r=>n("update:nodeCount",r))},null,8,["model-value","min","max","disabled"]),T(Ve,{label:"Speed","model-value":t.speed,min:1,max:100,suffix:"%","onUpdate:modelValue":a[1]||(a[1]=r=>n("update:speed",r))},null,8,["model-value"]),T(kt,{label:"Seed",monospace:"","model-value":String(t.seed),disabled:!t.canEdit,"onUpdate:modelValue":s},null,8,["model-value","disabled"])]),h("div",Vx,[t.isRunning?(x(),Y(Z,{key:1,variant:"warning",class:"col-span-2",onClick:a[3]||(a[3]=r=>n("pause"))},{default:D(()=>[...a[8]||(a[8]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M6 4h4v16H6zM14 4h4v16h-4z"})],-1),M(" Pause ",-1)])]),_:1})):(x(),Y(Z,{key:0,variant:"primary",class:"col-span-2",onClick:a[2]||(a[2]=r=>n("run"))},{default:D(()=>[a[7]||(a[7]=h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M8 5v14l11-7z"})],-1)),M(" "+R(t.isPaused?"Resume":"Run"),1)]),_:1})),T(Z,{variant:"neutral",onClick:a[4]||(a[4]=r=>n("reset"))},{default:D(()=>[...a[9]||(a[9]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.36 2.64L3 8"}),h("path",{d:"M3 3v5h5"})],-1),M(" Reset ",-1)])]),_:1}),T(Z,{variant:"neutral",disabled:!t.canEdit,onClick:a[5]||(a[5]=r=>n("generate"))},{default:D(()=>[...a[10]||(a[10]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"})],-1),M(" New Graph ",-1)])]),_:1},8,["disabled"])]),h("div",Ux,[T(Z,{variant:"quiet",disabled:!t.canEdit,onClick:a[6]||(a[6]=r=>n("randomize"))},{default:D(()=>[...a[11]||(a[11]=[M(" New seed ",-1)])]),_:1},8,["disabled"])]),a[12]||(a[12]=h("p",{class:"mt-3 text-center text-xs text-slate-400"}," Node count, seed & algorithm lock while a run is in progress. ",-1))]),_:1}))}}),qx={class:"flex flex-wrap items-end gap-2"},Kx={class:"block"},Gx=["disabled"],Wx={class:"block w-16"},Yx=["max","disabled"],Xx={key:0,class:"block w-16"},Jx=["max","disabled"],Qx={key:0,class:"mt-1.5 text-xs text-rose-500 dark:text-rose-400"},Zx={class:"mt-1.5 text-xs text-slate-400"},e1={class:"mt-4"},t1={key:0,class:"text-sm text-slate-400"},n1={key:1,class:"max-h-48 space-y-1 overflow-y-auto pr-1"},s1={class:"font-mono font-semibold text-slate-700 dark:text-slate-200"},o1=["disabled","aria-label","onClick"],a1={class:"mt-4 grid grid-cols-2 gap-2"},r1=oe({__name:"DsuOpBuilder",props:{ops:{},nodeCount:{},canEdit:{type:Boolean}},emits:["update:ops","randomize"],setup(t,{emit:e}){const n=t,s=e,o=B("union"),a=B("0"),r=B("0"),i=B(null),l=C(()=>Math.max(0,n.nodeCount-1));function u(w){const g=Number(w);return!Number.isInteger(g)||g<0||g>l.value?null:g}function c(w){return w.kind==="union"?`union(${w.a}, ${w.b})`:`find(${w.a})`}function d(){if(!n.canEdit)return;const w=u(a.value);if(w===null){i.value=`Node index must be a whole number from 0 to ${l.value}.`;return}if(o.value==="find"){i.value=null,s("update:ops",[...n.ops,{kind:"find",a:w}]);return}const g=u(r.value);if(g===null){i.value=`Node index must be a whole number from 0 to ${l.value}.`;return}i.value=null,s("update:ops",[...n.ops,{kind:"union",a:w,b:g}])}function p(w){n.canEdit&&s("update:ops",n.ops.filter((g,v)=>v!==w))}function m(){n.canEdit&&s("update:ops",[])}return(w,g)=>(x(),Y(we,{title:"Operation Script"},{default:D(()=>[h("div",qx,[h("label",Kx,[g[5]||(g[5]=h("span",{class:"mb-1.5 block text-sm font-medium text-slate-600 dark:text-slate-300"}," Op ",-1)),Os(h("select",{"onUpdate:modelValue":g[0]||(g[0]=v=>o.value=v),disabled:!t.canEdit,class:"rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-sm text-slate-800 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"},[...g[4]||(g[4]=[h("option",{value:"union"},"union",-1),h("option",{value:"find"},"find",-1)])],8,Gx),[[Kp,o.value]])]),h("label",Wx,[g[6]||(g[6]=h("span",{class:"mb-1.5 block text-sm font-medium text-slate-600 dark:text-slate-300"}," a ",-1)),Os(h("input",{"onUpdate:modelValue":g[1]||(g[1]=v=>a.value=v),type:"number",min:0,max:l.value,disabled:!t.canEdit,class:"w-full rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-sm text-slate-800 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"},null,8,Yx),[[Mo,a.value]])]),o.value==="union"?(x(),A("label",Xx,[g[7]||(g[7]=h("span",{class:"mb-1.5 block text-sm font-medium text-slate-600 dark:text-slate-300"}," b ",-1)),Os(h("input",{"onUpdate:modelValue":g[2]||(g[2]=v=>r.value=v),type:"number",min:0,max:l.value,disabled:!t.canEdit,class:"w-full rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-sm text-slate-800 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"},null,8,Jx),[[Mo,r.value]])])):ge("",!0),T(Z,{variant:"quiet",disabled:!t.canEdit,onClick:d},{default:D(()=>[...g[8]||(g[8]=[M("Add",-1)])]),_:1},8,["disabled"])]),i.value?(x(),A("p",Qx,R(i.value),1)):ge("",!0),h("p",Zx,"Valid nodes for this forest: 0 to "+R(l.value)+".",1),h("div",e1,[t.ops.length===0?(x(),A("p",t1," No operations yet — add one above, or generate a random script. ")):(x(),A("ol",n1,[(x(!0),A(ne,null,fe(t.ops,(v,b)=>(x(),A("li",{key:b,class:"flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-800/50"},[h("span",s1,R(b+1)+". "+R(c(v)),1),h("button",{type:"button",disabled:!t.canEdit,class:"rounded px-1.5 py-0.5 text-slate-400 transition-colors hover:bg-rose-100 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-rose-900/30 dark:hover:text-rose-300","aria-label":`Remove ${c(v)}`,onClick:y=>p(b)}," ✕ ",8,o1)]))),128))]))]),h("div",a1,[T(Z,{variant:"quiet",disabled:!t.canEdit||t.ops.length===0,onClick:m},{default:D(()=>[...g[9]||(g[9]=[M(" Clear ",-1)])]),_:1},8,["disabled"]),T(Z,{variant:"quiet",disabled:!t.canEdit,onClick:g[3]||(g[3]=v=>s("randomize"))},{default:D(()=>[...g[10]||(g[10]=[M(" Random script ",-1)])]),_:1},8,["disabled"])]),g[11]||(g[11]=h("p",{class:"mt-3 text-xs text-slate-400"}," Compose the whole script, then press Run — see the guide above for why one continuous history is the point. ",-1))]),_:1}))}}),i1=oe({__name:"MstStats",props:{stats:{},status:{},isDsuMode:{type:Boolean,default:!1}},setup(t){const e=t,n=C(()=>({idle:"Idle",running:"Running",paused:"Paused",done:"Done"})[e.status]??e.status),s=C(()=>({idle:"bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",running:"bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400",paused:"bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400",done:"bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400"})[e.status]),o=C(()=>[{label:"Finds",value:e.stats.finds.toLocaleString()},{label:"Unions",value:e.stats.unions.toLocaleString()},{label:"Compressions",value:e.stats.compressions.toLocaleString()},{label:"Max Depth",value:e.stats.maxDepth.toLocaleString()},{label:"MST Weight",value:e.isDsuMode?"—":e.stats.totalWeight.toLocaleString()},{label:"Components",value:e.stats.components.toLocaleString()}]);return(a,r)=>(x(),Y(we,{title:"Stats"},{header:D(()=>[h("span",{class:de(["rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",s.value])},R(n.value),3)]),default:D(()=>[T(Dr,{cells:o.value,columns:3},null,8,["cells"])]),_:1}))}}),l1={xSpacing:46,ySpacing:54,xMargin:30,yMargin:28,rootGap:1};function u1(t,e={}){const{xSpacing:n,ySpacing:s,xMargin:o,yMargin:a,rootGap:r}={...l1,...e},i=t.length,l=Array.from({length:i},()=>[]),u=[];for(let b=0;b<i;b++){const y=t[b];y===b?u.push(b):y>=0&&y<i&&l[y].push(b)}const c=new Map,d=[],p=new Set;let m=0;function w(b){const y=[{id:b,depth:0,cursor:0}];for(p.add(b);y.length>0;){const S=y[y.length-1],$=l[S.id];if(S.cursor<$.length){const j=$[S.cursor];if(S.cursor+=1,p.has(j))continue;p.add(j),y.push({id:j,depth:S.depth+1,cursor:0});continue}y.pop();const _=$.map(j=>c.get(j)).filter(j=>j!==void 0);let N,G;if(_.length===0){const j=m;m+=1,N=o+j*n,G=[j,j]}else{const j=_.map(L=>L.x);N=(Math.min(...j)+Math.max(...j))/2,G=[Math.min(..._.map(L=>L.span[0])),Math.max(..._.map(L=>L.span[1]))]}c.set(S.id,{id:S.id,x:N,y:a+S.depth*s,depth:S.depth,parent:S.id===t[S.id]?null:t[S.id],span:G})}}for(const b of u)m>0&&(m+=r),w(b);const g=[...c.values()].sort((b,y)=>b.id-y.id);for(const b of g)b.parent!==null&&c.has(b.parent)&&d.push({from:b.parent,to:b.id});const v=g.reduce((b,y)=>Math.max(b,y.depth),0);return{nodes:g,edges:d,slotCount:m,width:Math.max(o*2,o*2+Math.max(0,m-1)*n),height:a*2+v*s}}const c1={class:"mb-3 flex flex-wrap items-center gap-x-4 gap-y-2"},d1={class:"text-xs font-semibold uppercase tracking-wider text-ink-faint"},p1={key:0,class:"py-8 text-center text-sm text-ink-faint"},f1={class:"overflow-x-auto rounded-xl bg-surface-alt p-3"},h1=["viewBox","width","height"],m1=["x1","y1","x2","y2"],g1=["cx","cy"],b1=["cx","cy"],v1=["x","y"],y1=["x","y"],w1={class:"flex flex-wrap gap-1.5"},x1={class:"w-full bg-line/70 py-0.5 text-center text-[10px] font-medium text-ink-muted"},k1={class:"py-1 font-mono text-sm font-semibold text-ink"},S1={class:"mt-3 text-center text-xs text-ink-faint"},$1=oe({__name:"DsuForest",props:{parent:{},setSize:{default:()=>[]},rank:{default:()=>[]},findPath:{default:()=>[]},compressed:{default:()=>[]},active:{default:null},labels:{default:()=>[]},title:{default:"Disjoint-Set Forest"},hint:{default:"Each tree is one set. An arrow points from a node to its parent; a node pointing at itself is a root."}},setup(t){const e=t,n={cursor:ft.active,compressed:ft.settled,path:ft.probe,root:"fill-accent",default:ft.idle},s={cursor:`${gt.active} ${Gt.active}`,compressed:`${gt.settled} ${Gt.settled}`,path:`${gt.probe} ${Gt.probe}`,root:"border-accent/60 bg-accent-soft",default:`${gt.idle} ${Gt.idle}`},o=kn([{tone:"probe",label:"On find path"},{tone:"settled",label:"Re-hung"},{tone:"active",label:"Cursor"}]),a=C(()=>new Set(e.findPath)),r=C(()=>new Set(e.compressed)),i=C(()=>u1(e.parent)),l=C(()=>new Map(i.value.nodes.map(w=>[w.id,w])));function u(w){return w===e.active?"cursor":r.value.has(w)?"compressed":a.value.has(w)?"path":e.parent[w]===w?"root":"default"}function c(w){return e.labels[w]??String(w)}const d=C(()=>e.parent.length===0);function p(w){return e.parent[w]!==w?null:e.rank[w]??null}function m(w){return e.parent[w]!==w?null:e.setSize[w]??null}return(w,g)=>(x(),Y(we,{class:"flex flex-col"},{default:D(()=>[h("div",c1,[h("h2",d1,R(t.title),1),g[0]||(g[0]=h("div",{class:"flex flex-wrap items-center gap-3 text-xs text-ink-muted"},[h("span",{class:"flex items-center gap-1.5"},[h("i",{class:"h-3 w-3 rounded-mark bg-accent"}),M("Root")])],-1)),T(Mn,{items:f(o)},null,8,["items"])]),d.value?(x(),A("p",p1,"The forest is empty.")):(x(),A(ne,{key:1},[h("div",f1,[(x(),A("svg",{viewBox:`0 0 ${i.value.width} ${i.value.height}`,width:i.value.width,height:i.value.height,class:"mx-auto block max-h-[42vh] w-full",preserveAspectRatio:"xMidYMid meet"},[(x(!0),A(ne,null,fe(i.value.edges,v=>{var b,y,S,$;return x(),A("line",{key:`${v.from}-${v.to}`,x1:(b=l.value.get(v.to))==null?void 0:b.x,y1:(y=l.value.get(v.to))==null?void 0:y.y,x2:(S=l.value.get(v.from))==null?void 0:S.x,y2:($=l.value.get(v.from))==null?void 0:$.y,"stroke-width":"2",class:de(a.value.has(v.to)&&!r.value.has(v.to)?f(vt).probe:r.value.has(v.to)?f(vt).settled:f(vt).idle)},null,10,m1)}),128)),(x(!0),A(ne,null,fe(i.value.nodes,v=>(x(),A("g",{key:v.id},[v.parent===null?(x(),A("circle",{key:0,cx:v.x,cy:v.y-15,r:"6",fill:"none","stroke-width":"1.5",class:"stroke-accent/60"},null,8,g1)):ge("",!0),h("circle",{cx:v.x,cy:v.y,r:"14",class:de(["transition-colors duration-150 ease-out",n[u(v.id)]])},null,10,b1),h("text",{x:v.x,y:v.y,"text-anchor":"middle","dominant-baseline":"central",class:"pointer-events-none select-none fill-ink-inverse text-[10px] font-semibold"},R(c(v.id)),9,v1),p(v.id)!==null?(x(),A("text",{key:1,x:v.x,y:v.y+25,"text-anchor":"middle",class:"pointer-events-none select-none fill-ink-faint text-[9px] font-medium"}," rank "+R(p(v.id))+" · "+R(m(v.id)),9,y1)):ge("",!0)]))),128))],8,h1))]),g[1]||(g[1]=h("h3",{class:"mb-2 mt-4 text-xs font-semibold uppercase tracking-wider text-ink-faint"}," parent[] ",-1)),h("div",w1,[(x(!0),A(ne,null,fe(t.parent,(v,b)=>(x(),A("div",{key:b,class:de(["flex w-11 flex-col items-center overflow-hidden rounded-lg border transition-colors",s[u(b)]])},[h("div",x1,R(b),1),h("div",k1,R(v),1)],2))),128))]),h("p",S1,R(t.hint),1)],64))]),_:1}))}}),E1={class:"mb-3 flex flex-wrap items-center justify-between gap-2"},C1={class:"text-xs text-ink-faint"},A1={key:0,class:"py-6 text-center text-sm text-ink-faint"},T1=["data-active"],O1={class:"flex items-center gap-2"},M1={class:"font-mono font-semibold text-ink"},R1={class:"font-mono text-ink-muted"},_1=oe({__name:"EdgeList",props:{edges:{},nodes:{},consideringEdge:{},acceptedEdges:{},rejectedEdges:{}},setup(t){const e=t,n=kn([{tone:"idle",label:"Pending"},{tone:"probe",label:"Considering"},{tone:"settled",label:"Accepted"},{tone:"rejected",label:"Rejected"}]),s={pending:gt.idle,considering:`${gt.probe} ${Gt.probe}`,accepted:`${gt.settled} ${Gt.settled}`,rejected:`${gt.rejected} ${Gt.rejected}`},o={pending:ot.idle,considering:ot.probe,accepted:ot.settled,rejected:ot.rejected},a=C(()=>new Set(e.acceptedEdges)),r=C(()=>new Set(e.rejectedEdges)),i=C(()=>new Map(e.nodes.map(m=>[m.id,m.label])));function l(m){return i.value.get(m)??String(m)}function u(m){return a.value.has(m.id)?"accepted":r.value.has(m.id)?"rejected":m.id===e.consideringEdge?"considering":"pending"}const c=C(()=>e.acceptedEdges.length),d=C(()=>e.rejectedEdges.length),p=B(null);return _e(()=>e.consideringEdge,async()=>{var w,g;if(e.consideringEdge===null)return;await ps();const m=(w=p.value)==null?void 0:w.querySelector('[data-active="true"]');(g=m==null?void 0:m.scrollIntoView)==null||g.call(m,{block:"nearest"})}),(m,w)=>(x(),Y(we,{title:"Edge Queue"},{default:D(()=>[h("div",E1,[T(Mn,{items:f(n)},null,8,["items"]),h("p",C1,R(c.value)+" accepted · "+R(d.value)+" rejected · "+R(t.edges.length)+" total ",1)]),t.edges.length===0?(x(),A("p",A1," No edges yet — generate a graph to build the queue. ")):(x(),A("ol",{key:1,ref_key:"list",ref:p,class:"max-h-72 space-y-1 overflow-y-auto pr-1"},[(x(!0),A(ne,null,fe(t.edges,g=>(x(),A("li",{key:g.id,"data-active":g.id===t.consideringEdge,class:de(["flex items-center justify-between gap-2 rounded-lg border px-2.5 py-1.5 text-xs transition-colors",s[u(g)]])},[h("span",O1,[h("i",{class:de(["h-2.5 w-2.5 flex-none rounded-full",o[u(g)]])},null,2),h("span",M1,R(l(g.from))+" – "+R(l(g.to)),1)]),h("span",R1,"w="+R(g.weight??1),1)],10,T1))),128))],512)),w[0]||(w[0]=h("p",{class:"mt-3 text-center text-xs text-ink-faint"}," Lightest edges first — the exact order Kruskal considers them in. ",-1))]),_:1}))}}),I1={class:"grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]"},j1={class:"flex flex-col gap-4"},D1={class:"flex flex-col gap-4"},P1=oe({__name:"MstView",setup(t){const e=Qg();_e(e.nodeCount,()=>{e.canEdit.value&&e.generate()}),_e(e.seed,()=>{e.canEdit.value&&e.generate()}),_e(e.algoKey,()=>{e.isDone.value&&e.reset()});const n=kn([{tone:"idle",label:"Idle"},{tone:"probe",label:"Considering"},{tone:"settled",label:"Accepted"},{tone:"rejected",label:"Rejected"}]),s=C(()=>e.isDsuMode.value?[]:e.graph.value.nodes.map(l=>l.label)),o=C(()=>e.canEdit.value&&e.algoKey.value==="prim"),a=C(()=>e.algoKey.value==="prim"?"Click a node to set Prim's starting point — the tree grows outward from there.":"Kruskal has no starting point: edges are accepted strictly by weight, regardless of position."),r=C(()=>{if(e.isDsuMode.value){const u=e.activeOp.value;return u?u.kind==="union"?`union(${u.a}, ${u.b})`:`find(${u.a})`:null}const l=e.graph.value.edges.find(u=>u.id===e.highlights.consideringEdge);return l?`considering ${l.from}–${l.to} (weight ${l.weight??1})`:null}),i=C(()=>e.isDsuMode.value?[{label:"Active node",value:e.activeNode.value===null?"—":String(e.activeNode.value)},{label:"Sets remaining",value:String(e.stats.value.components)}]:[{label:"Accepted",value:String(e.highlights.acceptedEdges.length),tone:"good"},{label:"Rejected",value:String(e.highlights.rejectedEdges.length),tone:e.highlights.rejectedEdges.length>0?"warn":"neutral"},{label:"Components left",value:String(e.highlights.components)}]);return(l,u)=>(x(),A("div",I1,[h("div",j1,[T(An,{modelValue:f(e).algoKey.value,"onUpdate:modelValue":u[0]||(u[0]=c=>f(e).algoKey.value=c),algorithms:f(ea),title:"Algorithm",columns:3,disabled:!f(e).canEdit.value},null,8,["modelValue","algorithms","disabled"]),T(Fx),T(zx,{"node-count":f(e).nodeCount.value,seed:f(e).seed.value,speed:f(e).speed.value,status:f(e).status.value,"can-edit":f(e).canEdit.value,"is-running":f(e).isRunning.value,"is-paused":f(e).isPaused.value,"onUpdate:nodeCount":u[1]||(u[1]=c=>f(e).nodeCount.value=c),"onUpdate:speed":u[2]||(u[2]=c=>f(e).speed.value=c),"onUpdate:seed":u[3]||(u[3]=c=>f(e).seed.value=c),onRandomize:u[4]||(u[4]=c=>f(e).randomizeSeed()),onGenerate:u[5]||(u[5]=c=>f(e).generate()),onRun:u[6]||(u[6]=c=>f(e).run()),onPause:u[7]||(u[7]=c=>f(e).pause()),onReset:u[8]||(u[8]=c=>f(e).reset())},null,8,["node-count","seed","speed","status","can-edit","is-running","is-paused"]),f(e).isDsuMode.value?(x(),Y(r1,{key:0,ops:f(e).opScript.value,"node-count":f(e).nodeCount.value,"can-edit":f(e).canEdit.value,"onUpdate:ops":u[9]||(u[9]=c=>f(e).setOpScript(c)),onRandomize:u[10]||(u[10]=c=>f(e).randomizeOpScript())},null,8,["ops","node-count","can-edit"])):ge("",!0),T(xn,{cursor:f(e).cursor.value,"buffered-count":f(e).bufferedCount.value,"fully-buffered":f(e).fullyBuffered.value,"can-step-back":f(e).canStepBack.value,"can-step-forward":f(e).canStepForward.value,onSeek:u[11]||(u[11]=c=>f(e).seek(c)),onStepBack:u[12]||(u[12]=c=>f(e).stepBack()),onStepForward:u[13]||(u[13]=c=>f(e).stepForward()),onSkipToEnd:u[14]||(u[14]=c=>f(e).skipToEnd())},null,8,["cursor","buffered-count","fully-buffered","can-step-back","can-step-forward"])]),h("div",D1,[T(i1,{stats:f(e).stats.value,status:f(e).status.value,"is-dsu-mode":f(e).isDsuMode.value},null,8,["stats","status","is-dsu-mode"]),f(e).isDsuMode.value?ge("",!0):(x(),Y(Cc,{key:0,nodes:f(e).graph.value.nodes,edges:f(e).graph.value.edges,"node-tone":f(e).nodeTone.value,"edge-tone":f(e).edgeTone.value,"node-badge":f(e).nodeBadge.value,"show-weights":!0,legend:f(n),title:"Graph",hint:a.value,"start-id":f(e).startId.value,"can-edit":o.value,onSetStart:u[15]||(u[15]=c=>f(e).setStart(c))},null,8,["nodes","edges","node-tone","edge-tone","node-badge","legend","hint","start-id","can-edit"])),T($1,{parent:f(e).forest.value.parent,"set-size":f(e).forest.value.setSize,rank:f(e).forest.value.rank,"find-path":f(e).forest.value.findPath,compressed:f(e).forest.value.compressed,active:f(e).activeNode.value,labels:s.value,title:f(e).isDsuMode.value?"Disjoint-Set Forest":"Underlying Disjoint-Set Forest"},null,8,["parent","set-size","rank","find-path","compressed","active","labels","title"]),f(e).isDsuMode.value?ge("",!0):(x(),Y(_1,{key:1,edges:f(e).sortedEdges.value,nodes:f(e).graph.value.nodes,"considering-edge":f(e).highlights.consideringEdge,"accepted-edges":f(e).highlights.acceptedEdges,"rejected-edges":f(e).highlights.rejectedEdges},null,8,["edges","nodes","considering-edge","accepted-edges","rejected-edges"])),T(jr,{headline:f(e).explain.value,formula:r.value,rows:i.value},null,8,["headline","formula","rows"]),T(oa,{lines:f(e).pseudocodeLines.value,source:f(e).sourceCode.value.text,"source-file":f(e).sourceCode.value.file,"active-line":f(e).activeLine.value,"active-source-lines":f(e).activeSourceLines.value,title:"Code"},null,8,["lines","source","source-file","active-line","active-source-lines"])])]))}}),L1=oe({__name:"HashGuide",setup(t){return(e,n)=>(x(),Y(Zs,{title:"How to read this",summary:"A hash sends every key to one bucket. The interesting part is what happens when two land on the same one.","start-open":""},{default:D(()=>[...n[0]||(n[0]=[h("p",{class:"mb-3 text-slate-600 dark:text-slate-300"},[M(" A hash table turns a key into a number, folds that number into a slot with "),h("code",{class:"font-mono text-xs"},"h(key) mod capacity"),M(", and stores the key there. That is the entire idea, and it is O(1) — right up until two keys pick the same slot. Everything on this page is about that moment. The inspector spells out the arithmetic for every step, so each probe can be checked by hand. ")],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400"}," Chaining vs open addressing ",-1),h("ul",{class:"mb-4 space-y-2 text-slate-600 dark:text-slate-300"},[h("li",null,[h("b",null,"Separate chaining"),M(" hangs a list off each bucket. Colliding keys are appended, so a lookup hashes once and then walks a chain that averages α links long. It degrades gently, never fills up, and deletion is just unlinking — but every entry costs a pointer, and the chain is scattered through memory. ")]),h("li",null,[h("b",null,"Open addressing"),M(" keeps everything in the array: on a collision, the key walks a "),h("em",null,"probe sequence"),M(" until it finds a free slot. No pointers, excellent cache behaviour, and it is what most modern standard libraries do — at the price of everything below. ")])],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400"}," Clustering — the reason there are three probe sequences ",-1),h("p",{class:"mb-3 text-slate-600 dark:text-slate-300"},[h("b",null,"Linear probing"),M(" tries the next slot along, so collisions form contiguous runs, and every run is a bigger target for the next key — a cluster grows itself. That is "),h("em",null,"primary clustering"),M(". "),h("b",null,"Quadratic probing"),M(" jumps k(k+1)/2 slots on the k-th probe, which scatters the runs; but two keys with the same home slot still follow the identical jump sequence, which is "),h("em",null,"secondary clustering"),M(". "),h("b",null,"Double hashing"),M(" derives the stride from a second hash of the key, so even keys that collide at home diverge immediately. Load the weak hash function, force a collision, and switch between the three: the badges show the probe order, and the clusters are visible. ")],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400"}," Why α matters ",-1),h("p",{class:"mb-3 text-slate-600 dark:text-slate-300"},[M(" The load factor α = keys / slots is what the cost actually depends on — not the number of keys. Chaining costs about 1 + α. Open addressing costs about 1/(1 − α), which is 2 probes at half full, 10 at 90%, and unbounded as the table fills. That is why the table grows: once α crosses the threshold, the capacity doubles and "),h("em",null,"every key is rehashed"),M(", because a key's slot is a function of the capacity it was inserted under. Watch the rehash step through key by key — most of them move. Each individual resize is O(n), but it only happens after n more inserts, so the amortized cost per insert stays constant. ")],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400"}," Why deletion needs a tombstone ",-1),h("p",{class:"mb-2 text-slate-600 dark:text-slate-300"},[M(" Under open addressing a search stops at the first "),h("em",null,"empty"),M(" slot — that is what makes a miss cheap. So emptying a slot on delete would cut every probe sequence that ran through it, and any key stored further along its own sequence would become invisible while still sitting in the table. Instead the slot is marked "),h("span",{class:"font-mono text-rose-500 dark:text-rose-400"},"✕ deleted"),M(": searches walk straight past it, and a later insert may reuse it. Delete a key from the middle of a cluster and search for one after it — the tombstone is what makes the lookup still succeed. ")],-1),h("p",{class:"text-slate-500 dark:text-slate-400"}," Tombstones are not free: they hold no key but still cost a probe, so they count toward the fill that triggers a resize. A rehash is also how they get cleaned up. ",-1)])]),_:1}))}}),N1={class:"space-y-4"},B1={key:0,class:"mt-1 text-[11px] text-slate-400"},F1={class:"font-mono"},H1={key:0,class:"mt-1 text-[11px] text-slate-400"},V1={class:"font-mono"},U1={class:"mt-4"},z1={class:"grid grid-cols-2 gap-2"},q1={class:"mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400"},K1={class:"mt-5 grid grid-cols-2 gap-2"},G1=oe({__name:"HashControls",props:{capacity:{},effectiveCapacity:{},threshold:{},activeThreshold:{},hashFnKey:{},speed:{},status:{},canEdit:{type:Boolean},isRunning:{type:Boolean},isPaused:{type:Boolean}},emits:["update:capacity","update:threshold","update:hashFnKey","update:speed","run","pause","reset","step"],setup(t,{emit:e}){const n=t,s=e,o=Object.keys(Vn),a=C(()=>Math.round(n.threshold*100)),r=C(()=>n.capacity!==n.effectiveCapacity),i=C(()=>Math.abs(n.threshold-n.activeThreshold)>.001);return(l,u)=>(x(),Y(we,{title:"Controls"},{default:D(()=>[h("div",N1,[h("div",null,[T(Ve,{label:"Capacity","model-value":t.capacity,min:4,max:64,step:4,suffix:" slots",disabled:!t.canEdit,"onUpdate:modelValue":u[0]||(u[0]=c=>s("update:capacity",c))},null,8,["model-value","disabled"]),r.value?(x(),A("p",B1,[u[7]||(u[7]=M(" Rounded up to ",-1)),h("span",F1,R(t.effectiveCapacity),1),u[8]||(u[8]=M(" — every capacity here is a power of two. ",-1))])):ge("",!0)]),h("div",null,[T(Ve,{label:"Resize threshold","model-value":a.value,min:25,max:150,step:5,suffix:"%",disabled:!t.canEdit,"onUpdate:modelValue":u[1]||(u[1]=c=>s("update:threshold",c/100))},null,8,["model-value","disabled"]),i.value?(x(),A("p",H1,[u[9]||(u[9]=M(" Capped at ",-1)),h("span",V1,R(Math.round(t.activeThreshold*100))+"%",1),u[10]||(u[10]=M(" — open addressing stores one key per slot, so it can never reach α = 1. ",-1))])):ge("",!0)]),T(Ve,{label:"Speed","model-value":t.speed,min:1,max:100,suffix:"%","onUpdate:modelValue":u[2]||(u[2]=c=>s("update:speed",c))},null,8,["model-value"])]),h("div",U1,[u[11]||(u[11]=h("div",{class:"mb-1.5 text-sm font-medium text-slate-600 dark:text-slate-300"},"Hash function",-1)),h("div",z1,[(x(!0),A(ne,null,fe(f(o),c=>(x(),Y(Z,{key:c,variant:"selector",active:c===t.hashFnKey,disabled:!t.canEdit,onClick:d=>s("update:hashFnKey",c)},{default:D(()=>[M(R(f(Vn)[c].name),1)]),_:2},1032,["active","disabled","onClick"]))),128))]),h("p",q1,R(f(Vn)[t.hashFnKey].description),1)]),h("div",K1,[t.isRunning?(x(),Y(Z,{key:1,variant:"warning",class:"col-span-2",onClick:u[4]||(u[4]=c=>s("pause"))},{default:D(()=>[...u[13]||(u[13]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M6 4h4v16H6zM14 4h4v16h-4z"})],-1),M(" Pause ",-1)])]),_:1})):(x(),Y(Z,{key:0,variant:"primary",class:"col-span-2",onClick:u[3]||(u[3]=c=>s("run"))},{default:D(()=>[u[12]||(u[12]=h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M8 5v14l11-7z"})],-1)),M(" "+R(t.isPaused?"Resume":"Run"),1)]),_:1})),T(Z,{variant:"neutral",onClick:u[5]||(u[5]=c=>s("reset"))},{default:D(()=>[...u[14]||(u[14]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.36 2.64L3 8"}),h("path",{d:"M3 3v5h5"})],-1),M(" Reset ",-1)])]),_:1}),T(Z,{variant:"neutral",disabled:t.isRunning,onClick:u[6]||(u[6]=c=>s("step"))},{default:D(()=>[...u[15]||(u[15]=[M(" Step ▶ ",-1)])]),_:1},8,["disabled"])]),u[16]||(u[16]=h("p",{class:"mt-3 text-center text-xs text-slate-400"}," Strategy, capacity, threshold & hash function lock while a script is running. ",-1))]),_:1}))}}),W1={class:"grid grid-cols-3 gap-2"},Y1={class:"mt-3 flex items-end gap-2"},X1={class:"min-w-0 flex-1"},J1={class:"mt-3 grid grid-cols-3 gap-2"},Q1={key:0,class:"mt-2 text-xs text-warn-ink"},Z1={class:"mt-3 block"},ek={class:"mb-1.5 flex items-center justify-between text-sm"},tk=["disabled"],nk=["value","disabled"],sk={key:1,class:"mt-4 text-sm text-ink-faint"},ok={key:2,class:"mt-4 max-h-56 space-y-1 overflow-y-auto pr-1"},ak={class:"w-6 text-right font-mono tabular-nums text-ink-faint"},rk={class:"min-w-0 flex-1 truncate font-mono text-ink-muted"},ik=["disabled","aria-label","onClick"],lk=oe({__name:"HashOpBuilder",props:{script:{},canEdit:{type:Boolean},seed:{},notice:{}},emits:["add","remove","clear","bulk-load","force-collision","update:seed","randomize-seed"],setup(t,{emit:e}){const n=t,s=e,o=[{kind:"insert",label:"Insert"},{kind:"search",label:"Search"},{kind:"delete",label:"Delete"}],a={insert:"bg-ok-soft text-ok-ink",search:"bg-accent-soft text-accent-ink",delete:"bg-danger-soft text-danger-ink"},r=B("insert"),i=B(""),l=/^[A-Za-z0-9]{1,12}$/,u=C(()=>i.value===""||l.test(i.value)?null:"Letters and digits only, up to 12 characters."),c=C(()=>n.canEdit&&i.value!==""&&u.value===null);function d(){c.value&&(s("add",r.value,i.value),i.value="")}const p=m=>s("update:seed",Number(m.target.value));return(m,w)=>(x(),Y(we,{title:"Operation script"},{default:D(()=>[h("div",W1,[(x(),A(ne,null,fe(o,g=>T(Z,{key:g.kind,variant:"selector",active:r.value===g.kind,disabled:!t.canEdit,onClick:v=>r.value=g.kind},{default:D(()=>[M(R(g.label),1)]),_:2},1032,["active","disabled","onClick"])),64))]),h("div",Y1,[h("div",X1,[T(kt,{modelValue:i.value,"onUpdate:modelValue":w[0]||(w[0]=g=>i.value=g),label:"Key",placeholder:"cat",monospace:"",error:u.value,disabled:!t.canEdit,onKeydown:w[1]||(w[1]=Rt(g=>d(),["enter"]))},null,8,["modelValue","error","disabled"])]),T(Z,{variant:"primary",class:"mb-[1px]",disabled:!c.value,onClick:w[2]||(w[2]=g=>d())},{default:D(()=>[...w[7]||(w[7]=[M(" Add ",-1)])]),_:1},8,["disabled"])]),h("div",J1,[T(Z,{variant:"quiet",disabled:!t.canEdit,onClick:w[3]||(w[3]=g=>s("bulk-load"))},{default:D(()=>[...w[8]||(w[8]=[M(" Bulk load ",-1)])]),_:1},8,["disabled"]),T(Z,{variant:"quiet",disabled:!t.canEdit,onClick:w[4]||(w[4]=g=>s("force-collision"))},{default:D(()=>[...w[9]||(w[9]=[M(" Force collision ",-1)])]),_:1},8,["disabled"]),T(Z,{variant:"quiet",disabled:!t.canEdit||t.script.length===0,onClick:w[5]||(w[5]=g=>s("clear"))},{default:D(()=>[...w[10]||(w[10]=[M(" Clear ",-1)])]),_:1},8,["disabled"])]),t.notice?(x(),A("p",Q1,R(t.notice),1)):ge("",!0),h("label",Z1,[h("div",ek,[w[11]||(w[11]=h("span",{class:"font-medium text-ink-muted"},"Seed",-1)),h("button",{type:"button",class:"text-xs font-semibold text-accent hover:underline disabled:opacity-50",disabled:!t.canEdit,onClick:w[6]||(w[6]=g=>s("randomize-seed"))}," Randomize ",8,tk)]),h("input",{type:"number",value:t.seed,disabled:!t.canEdit,class:"w-full rounded-xl border border-line bg-surface-raised px-3 py-2 font-mono text-sm text-ink disabled:cursor-not-allowed disabled:opacity-50",onInput:p},null,40,nk)]),t.script.length===0?(x(),A("p",sk," No operations yet — add one, or bulk load a handful of keys. ")):(x(),A("ol",ok,[(x(!0),A(ne,null,fe(t.script,(g,v)=>(x(),A("li",{key:`${v}-${g.kind}-${g.key}`,class:"flex items-center gap-2 rounded-lg bg-surface-alt px-2 py-1 text-xs"},[h("span",ak,R(v+1),1),h("span",{class:de(["rounded px-1.5 py-0.5 font-semibold uppercase",a[g.kind]])},R(g.kind),3),h("span",rk,R(g.key),1),h("button",{type:"button",class:"shrink-0 rounded px-1.5 text-ink-faint hover:text-danger disabled:opacity-40",disabled:!t.canEdit,"aria-label":`Remove operation ${v+1}`,onClick:b=>s("remove",v)}," ✕ ",8,ik)]))),128))]))]),_:1}))}}),uk={class:"mb-1.5 flex items-baseline justify-between text-sm"},ck={class:"font-medium text-slate-600 dark:text-slate-300"},dk={class:"ml-1 font-mono text-xs text-slate-400"},pk=["aria-valuenow","aria-valuemax","aria-label"],fk={class:"mt-1 text-[11px] text-slate-400"},hk={class:"font-mono"},mk=oe({__name:"LoadFactorMeter",props:{loadFactor:{},threshold:{},size:{},capacity:{}},setup(t){const e=t,n=C(()=>Math.max(1,e.threshold*1.2));function s(a){return`${Math.min(100,Math.max(0,a/n.value*100))}%`}const o=C(()=>e.loadFactor>e.threshold);return(a,r)=>(x(),A("div",null,[h("div",uk,[h("span",ck,[r[0]||(r[0]=M(" Load factor α ",-1)),h("span",dk,R(t.size)+" / "+R(t.capacity),1)]),h("span",{class:de(["font-mono font-semibold",o.value?"text-amber-500":"text-indigo-500 dark:text-indigo-400"])},R(t.loadFactor.toFixed(2)),3)]),h("div",{class:"relative h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700",role:"meter","aria-valuenow":Number(t.loadFactor.toFixed(2)),"aria-valuemin":0,"aria-valuemax":Number(n.value.toFixed(2)),"aria-label":`Load factor, resize threshold ${t.threshold.toFixed(2)}`},[h("div",{class:de(["h-full rounded-full transition-all",o.value?"bg-amber-400":"bg-indigo-500"]),style:cn({width:s(t.loadFactor)})},null,6),h("div",{class:"absolute inset-y-0 w-0.5 bg-rose-500",style:cn({left:s(t.threshold)}),"aria-hidden":"true"},null,4)],8,pk),h("p",fk,[r[1]||(r[1]=M(" Grows past ",-1)),h("span",hk,R(t.threshold.toFixed(2)),1),r[2]||(r[2]=M("; open addressing also counts tombstones toward the fill. ",-1))])]))}}),gk={class:"mt-4"},bk=oe({__name:"HashStats",props:{size:{},capacity:{},loadFactor:{},threshold:{},probes:{},collisions:{},resizes:{},avgProbes:{}},setup(t){const e=t,n=C(()=>[{label:"Keys",value:`${e.size} / ${e.capacity}`},{label:"Load α",value:e.loadFactor.toFixed(2)},{label:"Probes",value:e.probes.toLocaleString()},{label:"Collisions",value:e.collisions.toLocaleString()},{label:"Probes / op",value:e.avgProbes===0?"—":e.avgProbes.toFixed(2)},{label:"Resizes",value:String(e.resizes)}]);return(s,o)=>(x(),Y(we,{title:"Statistics"},{default:D(()=>[T(Dr,{cells:n.value,columns:3},null,8,["cells"]),h("div",gk,[T(mk,{"load-factor":t.loadFactor,threshold:t.threshold,size:t.size,capacity:t.capacity},null,8,["load-factor","threshold","size","capacity"])])]),_:1}))}}),vk={class:"max-h-[32rem] flex-1 overflow-y-auto pr-1"},yk={class:"space-y-1"},wk=["data-bucket","data-state","data-home","data-probing"],xk=["data-home"],kk=["data-probe-order","title"],Sk={key:1},$k={class:"flex min-w-0 flex-wrap items-center gap-1"},Ek=["data-key","data-link-state"],Ck={key:1,"data-role":"empty",class:"font-mono text-xs text-ink-faint"},Ak=oe({__name:"BucketArray",props:{buckets:{},homeIndex:{default:null},probeIndex:{default:null},probeSeq:{default:()=>[]},phase:{default:"idle"},activeKey:{default:null},chaining:{type:Boolean,default:!1}},setup(t){const e=t,n=kn([{tone:"probe",label:"probing now"},{tone:"probe",label:"probed"},{tone:"rejected",label:"tombstone"},{tone:"idle",label:"empty"}]),s=C(()=>new Set(e.probeSeq));function o(u){return s.value.has(u)?e.chaining?e.probeSeq.length:e.probeSeq.indexOf(u)+1:null}const a=C(()=>e.chaining&&e.probeSeq.length>0?e.probeSeq.length-1:-1);function r(u,c){return!e.chaining||e.phase==="idle"?!1:u===e.homeIndex&&c===a.value}function i(u){return u!==e.activeKey?!1:e.phase==="found"||e.phase==="inserted"||e.phase==="updated"}function l(u){return u===e.probeIndex?"bg-tone-probe/20 ring-1 ring-tone-probe":s.value.has(u)?"bg-tone-probe/[0.07]":""}return(u,c)=>(x(),Y(we,{title:"Buckets",class:"flex h-full flex-col"},{header:D(()=>[c[0]||(c[0]=h("div",{class:"flex flex-wrap items-center gap-3 text-xs text-ink-muted"},[h("span",{class:"flex items-center gap-1.5"},[h("i",{class:"h-3 w-3 rounded-mark bg-accent"}),M("home slot")])],-1)),T(Mn,{items:f(n)},null,8,["items"])]),default:D(()=>[h("div",vk,[h("ol",yk,[(x(!0),A(ne,null,fe(t.buckets,(d,p)=>(x(),A("li",{key:p,"data-bucket":p,"data-state":d.state,"data-home":p===t.homeIndex?"true":void 0,"data-probing":p===t.probeIndex?"true":void 0,class:de(["grid grid-cols-[2.25rem_1.75rem_minmax(0,1fr)] items-center gap-2 rounded-lg px-1 py-1 transition-colors",l(p)])},[h("span",{"data-home":p===t.homeIndex?"true":void 0,class:de(["rounded-md py-1 text-center font-mono text-xs tabular-nums",p===t.homeIndex?"bg-accent font-bold text-accent-ink":"text-ink-muted"])},R(p),11,xk),o(p)!==null?(x(),A("span",{key:0,"data-probe-order":o(p),class:"rounded-md bg-tone-probe/80 py-0.5 text-center font-mono text-[10px] font-bold text-tone-probe-ink",title:t.chaining?"links walked":"probe number"},R(t.chaining?"↓":"")+R(o(p)),9,kk)):(x(),A("span",Sk)),h("div",$k,[(x(!0),A(ne,null,fe(d.entries,(m,w)=>(x(),A("span",{key:m.key,"data-role":"entry","data-key":m.key,"data-link-state":i(m.key)?"resolved":r(p,w)?"cursor":void 0,class:de(["inline-flex max-w-full items-center gap-1 truncate rounded-full border px-2 py-0.5 font-mono text-xs",i(m.key)?`${f(gt).settled} bg-tone-settled/20 font-bold ${f(Nn).settled}`:r(p,w)?`${f(gt).probe} bg-tone-probe/30 font-bold ${f(Nn).probe}`:"border-line bg-surface-raised text-ink-muted"])},R(m.key),11,Ek))),128)),d.state==="tombstone"?(x(),A("span",{key:0,"data-role":"tombstone",class:de(`inline-flex items-center gap-1 rounded-full border border-dashed px-2 py-0.5 font-mono text-xs ${f(gt).rejected} ${f(Nn).rejected}`)},"✕ deleted",2)):d.entries.length===0?(x(),A("span",Ck,"—")):ge("",!0)])],10,wk))),128))])])]),_:1}))}}),Tk={class:"grid gap-4 lg:grid-cols-[minmax(0,360px)_1fr]"},Ok={class:"flex flex-col gap-4"},Mk={class:"flex flex-col gap-4"},Rk=oe({__name:"HashTableView",setup(t){const e=cb();_e(e.strategyKey,()=>{e.isDone.value&&e.reset()});const n=B(null);function s(){const d=e.forceCollision();n.value=`Collision forced — 3 keys were queued to land in bucket ${d}.`}function o(){e.clearScript(),n.value=null}const a=C(()=>e.strategyKey.value==="chaining"),r={idle:"Press Run or Step to begin.",hashing:"Hashing the key to find its home slot.",probing:"Collision — walking the probe sequence.",inserted:"Inserted.",updated:"Key already present — value overwritten.",found:"Found.","not-found":"Not found.",deleted:"Deleted.",resizing:"Load factor exceeded the threshold — growing the table.",rehashed:"Rehashing an existing key into the grown table."},i={idle:"neutral",hashing:"neutral",probing:"warn",inserted:"good",updated:"good",found:"good","not-found":"bad",deleted:"good",resizing:"warn",rehashed:"neutral"},l=C(()=>e.view.op!==null),u=C(()=>l.value?r[e.view.phase]:null),c=C(()=>{if(!l.value)return[];const d=e.view,p=[{label:"Operation",value:d.op??"—"},{label:"Key",value:d.key??"—"}];return d.hash!==null&&p.push({label:"Hash",value:String(d.hash)}),d.homeIndex!==null&&p.push({label:"Home index",value:String(d.homeIndex)}),d.probeIndex!==null&&p.push({label:"Probe index",value:String(d.probeIndex)}),p.push({label:"Probes this op",value:String(d.probeSeq.length)}),p.push({label:"Phase",value:d.phase,tone:i[d.phase]}),p});return(d,p)=>(x(),A("div",Tk,[h("div",Ok,[T(An,{modelValue:f(e).strategyKey.value,"onUpdate:modelValue":p[0]||(p[0]=m=>f(e).strategyKey.value=m),algorithms:f(na),columns:2,disabled:!f(e).canEdit.value},null,8,["modelValue","algorithms","disabled"]),T(L1),T(G1,{capacity:f(e).capacity.value,"effective-capacity":f(e).startCapacity.value,threshold:f(e).threshold.value,"active-threshold":f(e).activeThreshold.value,"hash-fn-key":f(e).hashFnKey.value,speed:f(e).speed.value,status:f(e).status.value,"can-edit":f(e).canEdit.value,"is-running":f(e).isRunning.value,"is-paused":f(e).isPaused.value,"onUpdate:capacity":p[1]||(p[1]=m=>f(e).capacity.value=m),"onUpdate:threshold":p[2]||(p[2]=m=>f(e).threshold.value=m),"onUpdate:hashFnKey":p[3]||(p[3]=m=>f(e).hashFnKey.value=m),"onUpdate:speed":p[4]||(p[4]=m=>f(e).speed.value=m),onRun:p[5]||(p[5]=m=>f(e).run()),onPause:p[6]||(p[6]=m=>f(e).pause()),onReset:p[7]||(p[7]=m=>f(e).reset()),onStep:p[8]||(p[8]=m=>f(e).stepForward())},null,8,["capacity","effective-capacity","threshold","active-threshold","hash-fn-key","speed","status","can-edit","is-running","is-paused"]),T(lk,{script:f(e).script.value,"can-edit":f(e).canEdit.value,seed:f(e).seed.value,notice:n.value,onAdd:f(e).addOp,onRemove:f(e).removeOp,onClear:p[9]||(p[9]=m=>o()),onBulkLoad:p[10]||(p[10]=m=>f(e).bulkLoad()),onForceCollision:p[11]||(p[11]=m=>s()),"onUpdate:seed":p[12]||(p[12]=m=>f(e).seed.value=m),onRandomizeSeed:p[13]||(p[13]=m=>f(e).randomizeSeed())},null,8,["script","can-edit","seed","notice","onAdd","onRemove"]),T(xn,{cursor:f(e).cursor.value,"buffered-count":f(e).bufferedCount.value,"fully-buffered":f(e).fullyBuffered.value,"can-step-back":f(e).canStepBack.value,"can-step-forward":f(e).canStepForward.value,onSeek:p[14]||(p[14]=m=>f(e).seek(m)),onStepBack:p[15]||(p[15]=m=>f(e).stepBack()),onStepForward:p[16]||(p[16]=m=>f(e).stepForward()),onSkipToEnd:p[17]||(p[17]=m=>f(e).skipToEnd())},null,8,["cursor","buffered-count","fully-buffered","can-step-back","can-step-forward"])]),h("div",Mk,[T(bk,{size:f(e).view.size,capacity:f(e).view.capacity,"load-factor":f(e).view.loadFactor,threshold:f(e).activeThreshold.value,probes:f(e).stats.probes,collisions:f(e).stats.collisions,resizes:f(e).stats.resizes,"avg-probes":f(e).avgProbes.value},null,8,["size","capacity","load-factor","threshold","probes","collisions","resizes","avg-probes"]),T(Ak,{class:"flex-1",buckets:f(e).buckets.value,"home-index":f(e).view.homeIndex,"probe-index":f(e).view.probeIndex,"probe-seq":f(e).view.probeSeq,phase:f(e).view.phase,"active-key":f(e).view.key,chaining:a.value},null,8,["buckets","home-index","probe-index","probe-seq","phase","active-key","chaining"]),T(jr,{title:"Why this step",headline:u.value,formula:f(e).view.explain,rows:c.value},null,8,["headline","formula","rows"]),T(oa,{lines:f(e).pseudocodeLines.value,"active-line":f(e).activeLine.value,source:f(e).sourceCode.value.text,"source-file":f(e).sourceCode.value.file,"active-source-lines":f(e).activeSourceLines.value},null,8,["lines","active-line","source","source-file","active-source-lines"])])]))}}),Ks=[{path:"/sorting",name:"sorting",component:Dv,meta:{label:"Sorting",pitch:"Watch bars compare and swap their way into order.",count:Object.keys(is).length}},{path:"/searching",name:"searching",component:Qv,meta:{label:"Searching",pitch:"Narrow down a target and see how many probes it takes.",count:Object.keys(Jo).length}},{path:"/dp",name:"dp",component:Bx,meta:{label:"DP",pitch:"Fill a table cell by cell and trace the answer back out of it.",count:Object.keys(Kt).length}},{path:"/pathfinding",name:"pathfinding",component:g0,meta:{label:"Pathfinding",pitch:"Paint walls on a grid and race algorithms to the exit.",count:Object.keys(Qo).length}},{path:"/bst",name:"bst",component:j0,meta:{label:"BST",pitch:"Insert, search and delete nodes in a binary search tree."}},{path:"/heap",name:"heap",component:ty,meta:{label:"Heap",pitch:"Sift values up and down to keep the heap property."}},{path:"/graph",name:"graph",component:Cy,meta:{label:"Graph",pitch:"Traverse nodes and edges breadth- or depth-first.",count:Object.keys(Zo).length}},{path:"/mst",name:"mst",component:P1,meta:{label:"Union-Find & MST",pitch:"Merge disjoint sets, then grow a minimum spanning tree from them.",count:Object.keys(ea).length}},{path:"/hashing",name:"hashing",component:Rk,meta:{label:"Hashing",pitch:"Watch keys collide, probe, and rehash as the table fills up.",count:Object.keys(na).length}},{path:"/concurrency",name:"concurrency",component:Xw,meta:{label:"Concurrency",pitch:"Find the exact thread interleaving that breaks the invariant.",count:Object.keys(zs).length}},{path:"/sandbox",name:"sandbox",component:fw,meta:{label:"Sandbox",pitch:"Write your own algorithm and watch it run, safely isolated."}}],_k=[{path:"/",name:"landing",component:Xm,meta:{label:"Home",pitch:""}},...Ks,{path:"/:pathMatch(.*)*",redirect:"/"}],Tc=rh({history:Ff("/algoviz/preview/claude-website-theme-design-system-3t7ms6/"),routes:_k}),Pr=[{name:"midnight",label:"Midnight",blurb:"Deep blue-black with a single cyan accent.",dark:!0,group:"Core"},{name:"daylight",label:"Daylight",blurb:"Clean and bright, crisp hairlines.",dark:!1,group:"Core"},{name:"neon",label:"Neon",blurb:"Near-black with acid mint and a glow.",dark:!0,group:"Expressive"},{name:"pastel",label:"Pastel",blurb:"Warm paper, soft fills, inked borders.",dark:!1,group:"Expressive"},{name:"mono",label:"Monochrome",blurb:"One hue. State reads as texture and outline.",dark:!0,group:"Expressive"},{name:"terminal",label:"Terminal",blurb:"Amber phosphor, square corners, all mono.",dark:!0,group:"Expressive"},{name:"paper",label:"Paper",blurb:"Risograph spot inks on off-white stock.",dark:!1,group:"Expressive"},{name:"contrast",label:"High Contrast",blurb:"Maximum contrast, colourblind-safe states.",dark:!0,group:"Accessible"}],Oc="midnight",Ik=new Set(Pr.map(t=>t.name));function jk(t){return typeof t=="string"&&Ik.has(t)}function Dk(t){var e;return((e=Pr.find(n=>n.name===t))==null?void 0:e.dark)??!0}function Pk(t){return t==="dark"?"midnight":t==="light"?"daylight":jk(t)?t:Oc}const Mc="algoviz-theme";function Lk(){try{return Pk(localStorage.getItem(Mc))}catch{return Oc}}const Ds=B(Lk());function ml(){const t=document.documentElement;t.setAttribute("data-theme",Ds.value),t.classList.toggle("dark",Dk(Ds.value));try{localStorage.setItem(Mc,Ds.value)}catch{}}function Rc(){function t(n){Ds.value=n,ml()}function e(){ml()}return{theme:Ds,themes:Pr,setTheme:t,initTheme:e}}const Nk={class:"relative"},Bk=["aria-expanded","title"],Fk={class:"hidden text-sm font-semibold sm:inline"},Hk={class:"sr-only"},Vk={class:"px-2 pb-1 pt-2 text-[0.65rem] font-semibold uppercase tracking-wider text-ink-faint"},Uk=["aria-selected","tabindex","onClick"],zk=["data-theme"],qk={class:"min-w-0 flex-1"},Kk={class:"block text-sm font-semibold text-ink"},Gk={class:"block truncate text-xs text-ink-muted"},Wk={key:0,"aria-hidden":"true",class:"shrink-0 text-accent"},Yk=oe({__name:"ThemePicker",setup(t){const{theme:e,themes:n,setTheme:s}=Rc(),o=B(!1),a=B(null),r=B(null),i=B(0),l=C(()=>n.find(b=>b.name===e.value)??n[0]),u=C(()=>{const b=[];for(const y of n){const S=b.find($=>$.label===y.group);S?S.items.push(y):b.push({label:y.group,items:[y]})}return b}),c=C(()=>u.value.flatMap(b=>b.items));function d(b){const y=c.value.length;i.value=(b%y+y)%y,ps(()=>{var $,_;const S=($=a.value)==null?void 0:$.querySelectorAll('[role="option"]');(_=S==null?void 0:S[i.value])==null||_.focus()})}function p(){o.value=!o.value,o.value&&d(c.value.findIndex(b=>b.name===e.value))}function m(b=!0){var y;o.value&&(o.value=!1,b&&((y=r.value)==null||y.focus()))}function w(b){s(b),m()}function g(b){switch(b.key){case"ArrowDown":b.preventDefault(),d(i.value+1);break;case"ArrowUp":b.preventDefault(),d(i.value-1);break;case"Home":b.preventDefault(),d(0);break;case"End":b.preventDefault(),d(c.value.length-1);break;case"Escape":b.preventDefault(),m();break}}function v(b){var S,$;const y=b.target;(S=a.value)!=null&&S.contains(y)||($=r.value)!=null&&$.contains(y)||m(!1)}return _e(o,b=>{b?document.addEventListener("pointerdown",v):document.removeEventListener("pointerdown",v)}),Jl(()=>document.removeEventListener("pointerdown",v)),(b,y)=>(x(),A("div",Nk,[h("button",{ref_key:"trigger",ref:r,type:"button",class:"flex h-10 items-center gap-2 rounded-xl border border-line bg-surface px-3 text-ink-muted transition-colors hover:text-accent","aria-haspopup":"listbox","aria-expanded":o.value,title:`Theme: ${l.value.label}`,onClick:p},[y[0]||(y[0]=h("span",{class:"flex gap-0.5","aria-hidden":"true"},[h("i",{class:"h-4 w-1.5 rounded-sm bg-accent"}),h("i",{class:"h-4 w-1.5 rounded-sm bg-tone-probe"}),h("i",{class:"h-4 w-1.5 rounded-sm bg-tone-settled"})],-1)),h("span",Fk,R(l.value.label),1),h("span",Hk,"Change theme, currently "+R(l.value.label),1)],8,Bk),o.value?(x(),A("div",{key:0,ref_key:"listbox",ref:a,role:"listbox","aria-label":"Theme",class:"absolute right-0 z-50 mt-2 w-72 overflow-hidden rounded-2xl border border-line bg-surface-raised p-1.5 shadow-xl",onKeydown:g},[(x(!0),A(ne,null,fe(u.value,S=>(x(),A(ne,{key:S.label},[h("p",Vk,R(S.label),1),(x(!0),A(ne,null,fe(S.items,$=>{var _;return x(),A("button",{key:$.name,role:"option",type:"button","aria-selected":$.name===f(e),tabindex:((_=c.value[i.value])==null?void 0:_.name)===$.name?0:-1,class:"flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-surface-alt focus:bg-surface-alt focus:outline-none",onClick:N=>w($.name)},[h("span",{"data-theme":$.name,class:"flex shrink-0 gap-px overflow-hidden rounded-md border border-line bg-canvas p-1","aria-hidden":"true"},[...y[1]||(y[1]=[h("i",{class:"h-5 w-2 rounded-sm bg-surface"},null,-1),h("i",{class:"h-5 w-2 rounded-sm bg-accent"},null,-1),h("i",{class:"h-5 w-2 rounded-sm bg-tone-probe"},null,-1),h("i",{class:"h-5 w-2 rounded-sm bg-tone-settled"},null,-1)])],8,zk),h("span",qk,[h("span",Kk,R($.label),1),h("span",Gk,R($.blurb),1)]),$.name===f(e)?(x(),A("span",Wk,"✓")):ge("",!0)],8,Uk)}),128))],64))),128))],544)):ge("",!0)]))}}),Xk={class:"min-h-screen"},Jk={class:"mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8"},Qk={class:"mb-6 flex items-center justify-between"},Zk={class:"mb-6 flex flex-wrap gap-2"},eS=oe({__name:"App",setup(t){return(e,n)=>(x(),A("div",Xk,[h("div",Jk,[h("header",Qk,[T(f(Us),{to:"/",class:"flex items-center gap-3 rounded-2xl transition-opacity hover:opacity-80"},{default:D(()=>[...n[0]||(n[0]=[h("div",{class:"flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/30"},[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"white","stroke-width":"2","stroke-linecap":"round",class:"h-6 w-6"},[h("line",{x1:"6",y1:"20",x2:"6",y2:"14"}),h("line",{x1:"12",y1:"20",x2:"12",y2:"4"}),h("line",{x1:"18",y1:"20",x2:"18",y2:"10"})])],-1),h("div",null,[h("h1",{class:"text-xl font-bold tracking-tight sm:text-2xl"},"AlgoViz"),h("p",{class:"text-xs text-slate-400 sm:text-sm"},"Interactive algorithm visualizer")],-1)])]),_:1}),T(Yk)]),h("nav",Zk,[(x(!0),A(ne,null,fe(f(Ks),s=>(x(),Y(f(Us),{key:s.path,to:s.path,class:de(["rounded-xl px-4 py-2 text-sm font-semibold transition-all",e.$route.path===s.path?"bg-indigo-500 text-white shadow-md shadow-indigo-500/30":"bg-white/70 text-slate-600 hover:bg-slate-100 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:bg-slate-700"])},{default:D(()=>{var o;return[M(R((o=s.meta)==null?void 0:o.label),1)]}),_:2},1032,["to","class"]))),128))]),T(f(Lu)),n[1]||(n[1]=h("footer",{class:"mt-8 text-center text-xs text-slate-400"}," Built with Vue 3, Vite & Tailwind CSS · each algorithm is a generator yielding step snapshots. ",-1))])]))}});Rc().initTheme();const tS=new Set(Ks.map(t=>t.name));nc().trackLastVisited(Tc,t=>tS.has(t));Qp(eS).use(Tc).mount("#app");
