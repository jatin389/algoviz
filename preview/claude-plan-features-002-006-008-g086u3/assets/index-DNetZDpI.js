var vc=Object.defineProperty;var yc=(t,e,n)=>e in t?vc(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var Wt=(t,e,n)=>yc(t,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(o){if(o.ep)return;o.ep=!0;const a=n(o);fetch(o.href,a)}})();/**
* @vue/shared v3.5.40
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Qa(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const Ce={},Gn=[],Ut=()=>{},il=()=>!1,Co=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),Ao=t=>t.startsWith("onUpdate:"),Qe=Object.assign,Za=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},wc=Object.prototype.hasOwnProperty,Me=(t,e)=>wc.call(t,e),fe=Array.isArray,Wn=t=>Ns(t)==="[object Map]",To=t=>Ns(t)==="[object Set]",Mr=t=>Ns(t)==="[object Date]",xe=t=>typeof t=="function",Fe=t=>typeof t=="string",Rt=t=>typeof t=="symbol",Re=t=>t!==null&&typeof t=="object",ll=t=>(Re(t)||xe(t))&&xe(t.then)&&xe(t.catch),ul=Object.prototype.toString,Ns=t=>ul.call(t),xc=t=>Ns(t).slice(8,-1),cl=t=>Ns(t)==="[object Object]",er=t=>Fe(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,bs=Qa(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Oo=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},kc=/-\w/g,$t=Oo(t=>t.replace(kc,e=>e.slice(1).toUpperCase())),Sc=/\B([A-Z])/g,dn=Oo(t=>t.replace(Sc,"-$1").toLowerCase()),dl=Oo(t=>t.charAt(0).toUpperCase()+t.slice(1)),Xo=Oo(t=>t?`on${dl(t)}`:""),et=(t,e)=>!Object.is(t,e),ao=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},pl=(t,e,n,s=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:s,value:n})},Mo=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let Rr;const Ro=()=>Rr||(Rr=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function on(t){if(fe(t)){const e={};for(let n=0;n<t.length;n++){const s=t[n],o=Fe(s)?Ac(s):on(s);if(o)for(const a in o)e[a]=o[a]}return e}else if(Fe(t)||Re(t))return t}const $c=/;(?![^(]*\))/g,Ec=/:([^]+)/,Cc=/\/\*[^]*?\*\//g;function Ac(t){const e={};return t.replace(Cc,"").split($c).forEach(n=>{if(n){const s=n.split(Ec);s.length>1&&(e[s[0].trim()]=s[1].trim())}}),e}function de(t){let e="";if(Fe(t))e=t;else if(fe(t))for(let n=0;n<t.length;n++){const s=de(t[n]);s&&(e+=s+" ")}else if(Re(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const Tc="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Oc=Qa(Tc);function fl(t){return!!t||t===""}function Mc(t,e){if(t.length!==e.length)return!1;let n=!0;for(let s=0;n&&s<t.length;s++)n=Bs(t[s],e[s]);return n}function Bs(t,e){if(t===e)return!0;let n=Mr(t),s=Mr(e);if(n||s)return n&&s?t.getTime()===e.getTime():!1;if(n=Rt(t),s=Rt(e),n||s)return t===e;if(n=fe(t),s=fe(e),n||s)return n&&s?Mc(t,e):!1;if(n=Re(t),s=Re(e),n||s){if(!n||!s)return!1;const o=Object.keys(t).length,a=Object.keys(e).length;if(o!==a)return!1;for(const r in t){const i=t.hasOwnProperty(r),l=e.hasOwnProperty(r);if(i&&!l||!i&&l||!Bs(t[r],e[r]))return!1}}return String(t)===String(e)}function Rc(t,e){return t.findIndex(n=>Bs(n,e))}const hl=t=>!!(t&&t.__v_isRef===!0),R=t=>Fe(t)?t:t==null?"":fe(t)||Re(t)&&(t.toString===ul||!xe(t.toString))?hl(t)?R(t.value):JSON.stringify(t,ml,2):String(t),ml=(t,e)=>hl(e)?ml(t,e.value):Wn(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[s,o],a)=>(n[Jo(s,a)+" =>"]=o,n),{})}:To(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>Jo(n))}:Rt(e)?Jo(e):Re(e)&&!fe(e)&&!cl(e)?String(e):e,Jo=(t,e="")=>{var n;return Rt(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.5.40
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Ke;class Ic{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!e&&Ke&&(Ke.active?(this.parent=Ke,this.index=(Ke.scopes||(Ke.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes){const s=this.scopes.slice();for(e=0,n=s.length;e<n;e++)s[e].pause()}for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes){const o=this.scopes.slice();for(e=0,n=o.length;e<n;e++)o[e].resume()}const s=this.effects.slice();for(e=0,n=s.length;e<n;e++)s[e].resume()}}run(e){if(this._active){const n=Ke;try{return Ke=this,e()}finally{Ke=n}}}on(){++this._on===1&&(this.prevScope=Ke,Ke=this)}off(){if(this._on>0&&--this._on===0){if(Ke===this)Ke=this.prevScope;else{let e=Ke;for(;e;){if(e.prevScope===this){e.prevScope=this.prevScope;break}e=e.prevScope}}this.prevScope=void 0}}stop(e){if(this._active){this._active=!1;let n,s;for(n=0,s=this.effects.length;n<s;n++)this.effects[n].stop();for(this.effects.length=0,n=0,s=this.cleanups.length;n<s;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){const o=this.scopes.slice();for(n=0,s=o.length;n<s;n++)o[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const o=this.parent.scopes.pop();o&&o!==this&&(this.parent.scopes[this.index]=o,o.index=this.index)}this.parent=void 0}}}function _c(){return Ke}function Io(t,e=!1){Ke&&Ke.cleanups.push(t)}let De;const Qo=new WeakSet;class gl{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Ke&&(Ke.active?Ke.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Qo.has(this)&&(Qo.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||vl(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Ir(this),yl(this);const e=De,n=Tt;De=this,Tt=!0;try{return this.fn()}finally{wl(this),De=e,Tt=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)sr(e);this.deps=this.depsTail=void 0,Ir(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Qo.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){wa(this)&&this.run()}get dirty(){return wa(this)}}let bl=0,vs,ys;function vl(t,e=!1){if(t.flags|=8,e){t.next=ys,ys=t;return}t.next=vs,vs=t}function tr(){bl++}function nr(){if(--bl>0)return;if(ys){let e=ys;for(ys=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;vs;){let e=vs;for(vs=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(s){t||(t=s)}e=n}}if(t)throw t}function yl(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function wl(t){let e,n=t.depsTail,s=n;for(;s;){const o=s.prevDep;s.version===-1?(s===n&&(n=o),sr(s),jc(s)):e=s,s.dep.activeLink=s.prevActiveLink,s.prevActiveLink=void 0,s=o}t.deps=e,t.depsTail=n}function wa(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(xl(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function xl(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===As)||(t.globalVersion=As,!t.isSSR&&t.flags&128&&(!t.deps&&!t._dirty||!wa(t))))return;t.flags|=2;const e=t.dep,n=De,s=Tt;De=t,Tt=!0;try{yl(t);const o=t.fn(t._value);(e.version===0||et(o,t._value))&&(t.flags|=128,t._value=o,e.version++)}catch(o){throw e.version++,o}finally{De=n,Tt=s,wl(t),t.flags&=-3}}function sr(t,e=!1){const{dep:n,prevSub:s,nextSub:o}=t;if(s&&(s.nextSub=o,t.prevSub=void 0),o&&(o.prevSub=s,t.nextSub=void 0),n.subs===t&&(n.subs=s,!s&&n.computed)){n.computed.flags&=-5;for(let a=n.computed.deps;a;a=a.nextDep)sr(a,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function jc(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let Tt=!0;const kl=[];function an(){kl.push(Tt),Tt=!1}function rn(){const t=kl.pop();Tt=t===void 0?!0:t}function Ir(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=De;De=void 0;try{e()}finally{De=n}}}let As=0;class Dc{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class _o{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!De||!Tt||De===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==De)n=this.activeLink=new Dc(De,this),De.deps?(n.prevDep=De.depsTail,De.depsTail.nextDep=n,De.depsTail=n):De.deps=De.depsTail=n,Sl(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const s=n.nextDep;s.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=s),n.prevDep=De.depsTail,n.nextDep=void 0,De.depsTail.nextDep=n,De.depsTail=n,De.deps===n&&(De.deps=s)}return n}trigger(e){this.version++,As++,this.notify(e)}notify(e){tr();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{nr()}}}function Sl(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let s=e.deps;s;s=s.nextDep)Sl(s)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const xa=new WeakMap,Rn=Symbol(""),ka=Symbol(""),Ts=Symbol("");function nt(t,e,n){if(Tt&&De){let s=xa.get(t);s||xa.set(t,s=new Map);let o=s.get(n);o||(s.set(n,o=new _o),o.map=s,o.key=n),o.track()}}function tn(t,e,n,s,o,a){const r=xa.get(t);if(!r){As++;return}const i=l=>{l&&l.trigger()};if(tr(),e==="clear")r.forEach(i);else{const l=fe(t),u=l&&er(n);if(l&&n==="length"){const c=Number(s);r.forEach((d,p)=>{(p==="length"||p===Ts||!Rt(p)&&p>=c)&&i(d)})}else switch((n!==void 0||r.has(void 0))&&i(r.get(n)),u&&i(r.get(Ts)),e){case"add":l?u&&i(r.get("length")):(i(r.get(Rn)),Wn(t)&&i(r.get(ka)));break;case"delete":l||(i(r.get(Rn)),Wn(t)&&i(r.get(ka)));break;case"set":Wn(t)&&i(r.get(Rn));break}}nr()}function Fn(t){const e=Oe(t);return e===t?e:(nt(e,"iterate",Ts),Et(t)?e:e.map(It))}function jo(t){return nt(t=Oe(t),"iterate",Ts),t}function Ft(t,e){return ln(t)?es(In(t)?It(e):e):It(e)}const Pc={__proto__:null,[Symbol.iterator](){return Zo(this,Symbol.iterator,t=>Ft(this,t))},concat(...t){return Fn(this).concat(...t.map(e=>fe(e)?Fn(e):e))},entries(){return Zo(this,"entries",t=>(t[1]=Ft(this,t[1]),t))},every(t,e){return Yt(this,"every",t,e,void 0,arguments)},filter(t,e){return Yt(this,"filter",t,e,n=>n.map(s=>Ft(this,s)),arguments)},find(t,e){return Yt(this,"find",t,e,n=>Ft(this,n),arguments)},findIndex(t,e){return Yt(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return Yt(this,"findLast",t,e,n=>Ft(this,n),arguments)},findLastIndex(t,e){return Yt(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return Yt(this,"forEach",t,e,void 0,arguments)},includes(...t){return ea(this,"includes",t)},indexOf(...t){return ea(this,"indexOf",t)},join(t){return Fn(this).join(t)},lastIndexOf(...t){return ea(this,"lastIndexOf",t)},map(t,e){return Yt(this,"map",t,e,void 0,arguments)},pop(){return us(this,"pop")},push(...t){return us(this,"push",t)},reduce(t,...e){return _r(this,"reduce",t,e)},reduceRight(t,...e){return _r(this,"reduceRight",t,e)},shift(){return us(this,"shift")},some(t,e){return Yt(this,"some",t,e,void 0,arguments)},splice(...t){return us(this,"splice",t)},toReversed(){return Fn(this).toReversed()},toSorted(t){return Fn(this).toSorted(t)},toSpliced(...t){return Fn(this).toSpliced(...t)},unshift(...t){return us(this,"unshift",t)},values(){return Zo(this,"values",t=>Ft(this,t))}};function Zo(t,e,n){const s=jo(t),o=s[e]();return s!==t&&!Et(t)&&(o._next=o.next,o.next=()=>{const a=o._next();return a.done||(a.value=n(a.value)),a}),o}const Lc=Array.prototype;function Yt(t,e,n,s,o,a){const r=jo(t),i=r!==t&&!Et(t),l=r[e];if(l!==Lc[e]){const d=l.apply(t,a);return i?It(d):d}let u=n;r!==t&&(i?u=function(d,p){return n.call(this,Ft(t,d),p,t)}:n.length>2&&(u=function(d,p){return n.call(this,d,p,t)}));const c=l.call(r,u,s);return i&&o?o(c):c}function _r(t,e,n,s){const o=jo(t),a=o!==t&&!Et(t);let r=n,i=!1;o!==t&&(a?(i=s.length===0,r=function(u,c,d){return i&&(i=!1,u=Ft(t,u)),n.call(this,u,Ft(t,c),d,t)}):n.length>3&&(r=function(u,c,d){return n.call(this,u,c,d,t)}));const l=o[e](r,...s);return i?Ft(t,l):l}function ea(t,e,n){const s=Oe(t);nt(s,"iterate",Ts);const o=s[e](...n);return(o===-1||o===!1)&&rr(n[0])?(n[0]=Oe(n[0]),s[e](...n)):o}function us(t,e,n=[]){an(),tr();const s=Oe(t)[e].apply(t,n);return nr(),rn(),s}const Nc=Qa("__proto__,__v_isRef,__isVue"),$l=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(Rt));function Bc(t){Rt(t)||(t=String(t));const e=Oe(this);return nt(e,"has",t),e.hasOwnProperty(t)}class El{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,s){if(n==="__v_skip")return e.__v_skip;const o=this._isReadonly,a=this._isShallow;if(n==="__v_isReactive")return!o;if(n==="__v_isReadonly")return o;if(n==="__v_isShallow")return a;if(n==="__v_raw")return s===(o?a?Yc:Ol:a?Tl:Al).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(s)?e:void 0;const r=fe(e);if(!o){let l;if(r&&(l=Pc[n]))return l;if(n==="hasOwnProperty")return Bc}const i=Reflect.get(e,n,it(e)?e:s);if((Rt(n)?$l.has(n):Nc(n))||(o||nt(e,"get",n),a))return i;if(it(i)){const l=r&&er(n)?i:i.value;return o&&Re(l)?$a(l):l}return Re(i)?o?$a(i):Pe(i):i}}class Cl extends El{constructor(e=!1){super(!1,e)}set(e,n,s,o){let a=e[n];const r=fe(e)&&er(n);if(!this._isShallow){const u=ln(a);if(!Et(s)&&!ln(s)&&(a=Oe(a),s=Oe(s)),!r&&it(a)&&!it(s))return u||(a.value=s),!0}const i=r?Number(n)<e.length:Me(e,n),l=Reflect.set(e,n,s,it(e)?e:o);return e===Oe(o)&&l&&(i?et(s,a)&&tn(e,"set",n,s):tn(e,"add",n,s)),l}deleteProperty(e,n){const s=Me(e,n);e[n];const o=Reflect.deleteProperty(e,n);return o&&s&&tn(e,"delete",n,void 0),o}has(e,n){const s=Reflect.has(e,n);return(!Rt(n)||!$l.has(n))&&nt(e,"has",n),s}ownKeys(e){return nt(e,"iterate",fe(e)?"length":Rn),Reflect.ownKeys(e)}}class Fc extends El{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const Vc=new Cl,Hc=new Fc,Uc=new Cl(!0);const Sa=t=>t,Gs=t=>Reflect.getPrototypeOf(t);function zc(t,e,n){return function(...s){const o=this.__v_raw,a=Oe(o),r=Wn(a),i=t==="entries"||t===Symbol.iterator&&r,l=t==="keys"&&r,u=o[t](...s),c=n?Sa:e?es:It;return!e&&nt(a,"iterate",l?ka:Rn),Qe(Object.create(u),{next(){const{value:d,done:p}=u.next();return p?{value:d,done:p}:{value:i?[c(d[0]),c(d[1])]:c(d),done:p}}})}}function Ws(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function qc(t,e){const n={get(o){const a=this.__v_raw,r=Oe(a),i=Oe(o);t||(et(o,i)&&nt(r,"get",o),nt(r,"get",i));const{has:l}=Gs(r),u=e?Sa:t?es:It;if(l.call(r,o))return u(a.get(o));if(l.call(r,i))return u(a.get(i));a!==r&&a.get(o)},get size(){const o=this.__v_raw;return!t&&nt(Oe(o),"iterate",Rn),o.size},has(o){const a=this.__v_raw,r=Oe(a),i=Oe(o);return t||(et(o,i)&&nt(r,"has",o),nt(r,"has",i)),o===i?a.has(o):a.has(o)||a.has(i)},forEach(o,a){const r=this,i=r.__v_raw,l=Oe(i),u=e?Sa:t?es:It;return!t&&nt(l,"iterate",Rn),i.forEach((c,d)=>o.call(a,u(c),u(d),r))}};return Qe(n,t?{add:Ws("add"),set:Ws("set"),delete:Ws("delete"),clear:Ws("clear")}:{add(o){const a=Oe(this),r=Gs(a),i=Oe(o),l=!e&&!Et(o)&&!ln(o)?i:o;return r.has.call(a,l)||et(o,l)&&r.has.call(a,o)||et(i,l)&&r.has.call(a,i)||(a.add(l),tn(a,"add",l,l)),this},set(o,a){!e&&!Et(a)&&!ln(a)&&(a=Oe(a));const r=Oe(this),{has:i,get:l}=Gs(r);let u=i.call(r,o);u||(o=Oe(o),u=i.call(r,o));const c=l.call(r,o);return r.set(o,a),u?et(a,c)&&tn(r,"set",o,a):tn(r,"add",o,a),this},delete(o){const a=Oe(this),{has:r,get:i}=Gs(a);let l=r.call(a,o);l||(o=Oe(o),l=r.call(a,o)),i&&i.call(a,o);const u=a.delete(o);return l&&tn(a,"delete",o,void 0),u},clear(){const o=Oe(this),a=o.size!==0,r=o.clear();return a&&tn(o,"clear",void 0,void 0),r}}),["keys","values","entries",Symbol.iterator].forEach(o=>{n[o]=zc(o,t,e)}),n}function or(t,e){const n=qc(t,e);return(s,o,a)=>o==="__v_isReactive"?!t:o==="__v_isReadonly"?t:o==="__v_raw"?s:Reflect.get(Me(n,o)&&o in s?n:s,o,a)}const Kc={get:or(!1,!1)},Gc={get:or(!1,!0)},Wc={get:or(!0,!1)};const Al=new WeakMap,Tl=new WeakMap,Ol=new WeakMap,Yc=new WeakMap;function Xc(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Pe(t){return ln(t)?t:ar(t,!1,Vc,Kc,Al)}function Ml(t){return ar(t,!1,Uc,Gc,Tl)}function $a(t){return ar(t,!0,Hc,Wc,Ol)}function ar(t,e,n,s,o){if(!Re(t)||t.__v_raw&&!(e&&t.__v_isReactive)||t.__v_skip||!Object.isExtensible(t))return t;const a=o.get(t);if(a)return a;const r=Xc(xc(t));if(r===0)return t;const i=new Proxy(t,r===2?s:n);return o.set(t,i),i}function In(t){return ln(t)?In(t.__v_raw):!!(t&&t.__v_isReactive)}function ln(t){return!!(t&&t.__v_isReadonly)}function Et(t){return!!(t&&t.__v_isShallow)}function rr(t){return t?!!t.__v_raw:!1}function Oe(t){const e=t&&t.__v_raw;return e?Oe(e):t}function Jc(t){return!Me(t,"__v_skip")&&Object.isExtensible(t)&&pl(t,"__v_skip",!0),t}const It=t=>Re(t)?Pe(t):t,es=t=>Re(t)?$a(t):t;function it(t){return t?t.__v_isRef===!0:!1}function F(t){return Rl(t,!1)}function ir(t){return Rl(t,!0)}function Rl(t,e){return it(t)?t:new Qc(t,e)}class Qc{constructor(e,n){this.dep=new _o,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:Oe(e),this._value=n?e:It(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,s=this.__v_isShallow||Et(e)||ln(e);e=s?e:Oe(e),et(e,n)&&(this._rawValue=e,this._value=s?e:It(e),this.dep.trigger())}}function f(t){return it(t)?t.value:t}const Zc={get:(t,e,n)=>e==="__v_raw"?t:f(Reflect.get(t,e,n)),set:(t,e,n,s)=>{const o=t[e];return it(o)&&!it(n)?(o.value=n,!0):Reflect.set(t,e,n,s)}};function Il(t){return In(t)?t:new Proxy(t,Zc)}class ed{constructor(e){this.__v_isRef=!0,this._value=void 0;const n=this.dep=new _o,{get:s,set:o}=e(n.track.bind(n),n.trigger.bind(n));this._get=s,this._set=o}get value(){return this._value=this._get()}set value(e){this._set(e)}}function td(t){return new ed(t)}class nd{constructor(e,n,s){this.fn=e,this.setter=n,this._value=void 0,this.dep=new _o(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=As-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=s}notify(){if(this.flags|=16,!(this.flags&8)&&De!==this)return vl(this,!0),!0}get value(){const e=this.dep.track();return xl(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function sd(t,e,n=!1){let s,o;return xe(t)?s=t:(s=t.get,o=t.set),new nd(s,o,n)}const Ys={},co=new WeakMap;let Cn;function od(t,e=!1,n=Cn){if(n){let s=co.get(n);s||co.set(n,s=[]),s.push(t)}}function ad(t,e,n=Ce){const{immediate:s,deep:o,once:a,scheduler:r,augmentJob:i,call:l}=n,u=T=>o?T:Et(T)||o===!1||o===0?nn(T,1):nn(T);let c,d,p,m,y=!1,g=!1;if(it(t)?(d=()=>t.value,y=Et(t)):In(t)?(d=()=>u(t),y=!0):fe(t)?(g=!0,y=t.some(T=>In(T)||Et(T)),d=()=>t.map(T=>{if(it(T))return T.value;if(In(T))return u(T);if(xe(T))return l?l(T,2):T()})):xe(t)?e?d=l?()=>l(t,2):t:d=()=>{if(p){an();try{p()}finally{rn()}}const T=Cn;Cn=c;try{return l?l(t,3,[m]):t(m)}finally{Cn=T}}:d=Ut,e&&o){const T=d,_=o===!0?1/0:o;d=()=>nn(T(),_)}const v=_c(),b=()=>{c.stop(),v&&v.active&&Za(v.effects,c)};if(a&&e){const T=e;e=(..._)=>{const N=T(..._);return b(),N}}let w=g?new Array(t.length).fill(Ys):Ys;const k=T=>{if(!(!(c.flags&1)||!c.dirty&&!T))if(e){const _=c.run();if(T||o||y||(g?_.some((N,G)=>et(N,w[G])):et(_,w))){p&&p();const N=Cn;Cn=c;try{const G=[_,w===Ys?void 0:g&&w[0]===Ys?[]:w,m];w=_,l?l(e,3,G):e(...G)}finally{Cn=N}}}else c.run()};return i&&i(k),c=new gl(d),c.scheduler=r?()=>r(k,!1):k,m=T=>od(T,!1,c),p=c.onStop=()=>{const T=co.get(c);if(T){if(l)l(T,4);else for(const _ of T)_();co.delete(c)}},e?s?k(!0):w=c.run():r?r(k.bind(null,!0),!0):c.run(),b.pause=c.pause.bind(c),b.resume=c.resume.bind(c),b.stop=b,b}function nn(t,e=1/0,n){if(e<=0||!Re(t)||t.__v_skip||(n=n||new Map,(n.get(t)||0)>=e))return t;if(n.set(t,e),e--,it(t))nn(t.value,e,n);else if(fe(t))for(let s=0;s<t.length;s++)nn(t[s],e,n);else if(To(t)||Wn(t))t.forEach(s=>{nn(s,e,n)});else if(cl(t)){for(const s in t)nn(t[s],e,n);for(const s of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,s)&&nn(t[s],e,n)}return t}/**
* @vue/runtime-core v3.5.40
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Fs(t,e,n,s){try{return s?t(...s):t()}catch(o){Do(o,e,n)}}function _t(t,e,n,s){if(xe(t)){const o=Fs(t,e,n,s);return o&&ll(o)&&o.catch(a=>{Do(a,e,n)}),o}if(fe(t)){const o=[];for(let a=0;a<t.length;a++)o.push(_t(t[a],e,n,s));return o}}function Do(t,e,n,s=!0){const o=e?e.vnode:null,{errorHandler:a,throwUnhandledErrorInProduction:r}=e&&e.appContext.config||Ce;if(e){let i=e.parent;const l=e.proxy,u=`https://vuejs.org/error-reference/#runtime-${n}`;for(;i;){const c=i.ec;if(c){for(let d=0;d<c.length;d++)if(c[d](t,l,u)===!1)return}i=i.parent}if(a){an(),Fs(a,null,10,[t,l,u]),rn();return}}rd(t,n,o,s,r)}function rd(t,e,n,s=!0,o=!1){if(o)throw t;console.error(t)}const dt=[];let Bt=-1;const Yn=[];let yn=null,Hn=0;const _l=Promise.resolve();let po=null;function Vs(t){const e=po||_l;return t?e.then(this?t.bind(this):t):e}function id(t){let e=Bt+1,n=dt.length;for(;e<n;){const s=e+n>>>1,o=dt[s],a=Os(o);a<t||a===t&&o.flags&2?e=s+1:n=s}return e}function lr(t){if(!(t.flags&1)){const e=Os(t),n=dt[dt.length-1];!n||!(t.flags&2)&&e>=Os(n)?dt.push(t):dt.splice(id(e),0,t),t.flags|=1,jl()}}function jl(){po||(po=_l.then(Pl))}function ld(t){fe(t)?Yn.push(...t):yn&&t.id===-1?yn.splice(Hn+1,0,t):t.flags&1||(Yn.push(t),t.flags|=1),jl()}function jr(t,e,n=Bt+1){for(;n<dt.length;n++){const s=dt[n];if(s&&s.flags&2){if(t&&s.id!==t.uid)continue;dt.splice(n,1),n--,s.flags&4&&(s.flags&=-2),s(),s.flags&4||(s.flags&=-2)}}}function Dl(t){if(Yn.length){const e=[...new Set(Yn)].sort((n,s)=>Os(n)-Os(s));if(Yn.length=0,yn){yn.push(...e);return}for(yn=e,Hn=0;Hn<yn.length;Hn++){const n=yn[Hn];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}yn=null,Hn=0}}const Os=t=>t.id==null?t.flags&2?-1:1/0:t.id;function Pl(t){try{for(Bt=0;Bt<dt.length;Bt++){const e=dt[Bt];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Fs(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;Bt<dt.length;Bt++){const e=dt[Bt];e&&(e.flags&=-2)}Bt=-1,dt.length=0,Dl(),po=null,(dt.length||Yn.length)&&Pl()}}let st=null,Ll=null;function fo(t){const e=st;return st=t,Ll=t&&t.type.__scopeId||null,e}function D(t,e=st,n){if(!e||t._n)return t;const s=(...o)=>{s._d&&vo(-1);const a=fo(e),r=sn.length;let i;try{i=t(...o)}finally{for(let l=sn.length;l>r;l--)mr();fo(a),s._d&&vo(1)}return i};return s._n=!0,s._c=!0,s._d=!0,s}function ws(t,e){if(st===null)return t;const n=Bo(st),s=t.dirs||(t.dirs=[]);for(let o=0;o<e.length;o++){let[a,r,i,l=Ce]=e[o];a&&(xe(a)&&(a={mounted:a,updated:a}),a.deep&&nn(r),s.push({dir:a,instance:n,value:r,oldValue:void 0,arg:i,modifiers:l}))}return t}function $n(t,e,n,s){const o=t.dirs,a=e&&e.dirs;for(let r=0;r<o.length;r++){const i=o[r];a&&(i.oldValue=a[r].value);let l=i.dir[s];l&&(an(),_t(l,n,8,[t.el,i,t,e]),rn())}}function ro(t,e){if(pt){let n=pt.provides;const s=pt.parent&&pt.parent.provides;s===n&&(n=pt.provides=Object.create(s)),n[t]=e}}function zt(t,e,n=!1){const s=uu();if(s||Jn){let o=Jn?Jn._context.provides:s?s.parent==null||s.ce?s.vnode.appContext&&s.vnode.appContext.provides:s.parent.provides:void 0;if(o&&t in o)return o[t];if(arguments.length>1)return n&&xe(e)?e.call(s&&s.proxy):e}}const ud=Symbol.for("v-scx"),cd=()=>zt(ud);function dd(t,e){return ur(t,null,{flush:"sync"})}function _e(t,e,n){return ur(t,e,n)}function ur(t,e,n=Ce){const{immediate:s,deep:o,flush:a,once:r}=n,i=Qe({},n),l=e&&s||!e&&a!=="post";let u;if(Is){if(a==="sync"){const m=cd();u=m.__watcherHandles||(m.__watcherHandles=[])}else if(!l){const m=()=>{};return m.stop=Ut,m.resume=Ut,m.pause=Ut,m}}const c=pt;i.call=(m,y,g)=>_t(m,c,y,g);let d=!1;a==="post"?i.scheduler=m=>{ht(m,c&&c.suspense)}:a!=="sync"&&(d=!0,i.scheduler=(m,y)=>{y?m():lr(m)}),i.augmentJob=m=>{e&&(m.flags|=4),d&&(m.flags|=2,c&&(m.id=c.uid,m.i=c))};const p=ad(t,e,i);return Is&&(u?u.push(p):l&&p()),p}function pd(t,e,n){const s=this.proxy,o=Fe(t)?t.includes(".")?Nl(s,t):()=>s[t]:t.bind(s,s);let a;xe(e)?a=e:(a=e.handler,n=e);const r=Hs(this),i=ur(o,a.bind(s),n);return r(),i}function Nl(t,e){const n=e.split(".");return()=>{let s=t;for(let o=0;o<n.length&&s;o++)s=s[n[o]];return s}}const fd=Symbol("_vte"),hd=t=>t.__isTeleport,ta=Symbol("_leaveCb");function cr(t,e){t.shapeFlag&6&&t.component?(t.transition=e,cr(t.component.subTree,e)):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}function oe(t,e){return xe(t)?Qe({name:t.name},e,{setup:t}):t}function Bl(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}function Dr(t,e){let n;return!!((n=Object.getOwnPropertyDescriptor(t,e))&&!n.configurable)}const ho=new WeakMap;function xs(t,e,n,s,o=!1){if(fe(t)){t.forEach((g,v)=>xs(g,e&&(fe(e)?e[v]:e),n,s,o));return}if(Xn(s)&&!o){s.shapeFlag&512&&s.type.__asyncResolved&&s.component.subTree.component&&xs(t,e,n,s.component.subTree);return}const a=s.shapeFlag&4?Bo(s.component):s.el,r=o?null:a,{i,r:l}=t,u=e&&e.r,c=i.refs===Ce?i.refs={}:i.refs,d=i.setupState,p=Oe(d),m=d===Ce?il:g=>Dr(c,g)?!1:Me(p,g),y=(g,v)=>!(v&&Dr(c,v));if(u!=null&&u!==l){if(Pr(e),Fe(u))c[u]=null,m(u)&&(d[u]=null);else if(it(u)){const g=e;y(u,g.k)&&(u.value=null),g.k&&(c[g.k]=null)}}if(xe(l))Fs(l,i,12,[r,c]);else{const g=Fe(l),v=it(l);if(g||v){const b=()=>{if(t.f){const w=g?m(l)?d[l]:c[l]:y()||!t.k?l.value:c[t.k];if(o)fe(w)&&Za(w,a);else if(fe(w))w.includes(a)||w.push(a);else if(g)c[l]=[a],m(l)&&(d[l]=c[l]);else{const k=[a];y(l,t.k)&&(l.value=k),t.k&&(c[t.k]=k)}}else g?(c[l]=r,m(l)&&(d[l]=r)):v&&(y(l,t.k)&&(l.value=r),t.k&&(c[t.k]=r))};if(r){const w=()=>{b(),ho.delete(t)};w.id=-1,ho.set(t,w),ht(w,n)}else Pr(t),b()}}}function Pr(t){const e=ho.get(t);e&&(e.flags|=8,ho.delete(t))}Ro().requestIdleCallback;Ro().cancelIdleCallback;const Xn=t=>!!t.type.__asyncLoader,Fl=t=>t.type.__isKeepAlive;function md(t,e){Vl(t,"a",e)}function gd(t,e){Vl(t,"da",e)}function Vl(t,e,n=pt){const s=t.__wdc||(t.__wdc=()=>{let o=n;for(;o;){if(o.isDeactivated)return;o=o.parent}return t()});if(Po(e,s,n),n){let o=n.parent;for(;o&&o.parent;)Fl(o.parent.vnode)&&bd(s,e,n,o),o=o.parent}}function bd(t,e,n,s){const o=Po(e,t,s,!0);pr(()=>{Za(s[e],o)},n)}function Po(t,e,n=pt,s=!1){if(n){const o=n[t]||(n[t]=[]),a=e.__weh||(e.__weh=(...r)=>{an();const i=Hs(n),l=_t(e,n,t,r);return i(),rn(),l});return s?o.unshift(a):o.push(a),a}}const pn=t=>(e,n=pt)=>{(!Is||t==="sp")&&Po(t,(...s)=>e(...s),n)},vd=pn("bm"),dr=pn("m"),yd=pn("bu"),wd=pn("u"),xd=pn("bum"),pr=pn("um"),kd=pn("sp"),Sd=pn("rtg"),$d=pn("rtc");function Ed(t,e=pt){Po("ec",t,e)}const Cd=Symbol.for("v-ndc");function me(t,e,n,s){let o;const a=n,r=fe(t);if(r||Fe(t)){const i=r&&In(t);let l=!1,u=!1;i&&(l=!Et(t),u=ln(t),t=jo(t)),o=new Array(t.length);for(let c=0,d=t.length;c<d;c++)o[c]=e(l?u?es(It(t[c])):It(t[c]):t[c],c,void 0,a)}else if(typeof t=="number"){o=new Array(t);for(let i=0;i<t;i++)o[i]=e(i+1,i,void 0,a)}else if(Re(t))if(t[Symbol.iterator])o=Array.from(t,(i,l)=>e(i,l,void 0,a));else{const i=Object.keys(t);o=new Array(i.length);for(let l=0,u=i.length;l<u;l++){const c=i[l];o[l]=e(t[c],c,l,a)}}else o=[];return o}function mo(t,e,n={},s,o,a){if(st.ce||st.parent&&Xn(st.parent)&&st.parent.ce){const u=n,c=Object.keys(u).length>0;return e!=="default"&&(u.name=e),x(),J(ae,null,[C("slot",u,s)],c?-2:64)}let r=t[e];r&&r._c&&(r._d=!1);const i=sn.length;x();let l;try{const u=r&&Hl(r(n)),c=n.key||a||u&&u.key;l=J(ae,{key:(c&&!Rt(c)?c:`_${e}`)+(!u&&s?"_fb":"")},u||(s?s():[]),u&&t._===1?64:-2)}catch(u){for(let c=sn.length;c>i;c--)mr();throw u}finally{r&&r._c&&(r._d=!0)}return l.scopeId&&(l.slotScopeIds=[l.scopeId+"-s"]),l}function Hl(t){return t.some(e=>Rs(e)?!(e.type===un||e.type===ae&&!Hl(e.children)):!0)?t:null}const Ea=t=>t?cu(t)?Bo(t):Ea(t.parent):null,ks=Qe(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>Ea(t.parent),$root:t=>Ea(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>zl(t),$forceUpdate:t=>t.f||(t.f=()=>{lr(t.update)}),$nextTick:t=>t.n||(t.n=Vs.bind(t.proxy)),$watch:t=>pd.bind(t)}),na=(t,e)=>t!==Ce&&!t.__isScriptSetup&&Me(t,e),Ad={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:s,data:o,props:a,accessCache:r,type:i,appContext:l}=t;if(e[0]!=="$"){const p=r[e];if(p!==void 0)switch(p){case 1:return s[e];case 2:return o[e];case 4:return n[e];case 3:return a[e]}else{if(na(s,e))return r[e]=1,s[e];if(o!==Ce&&Me(o,e))return r[e]=2,o[e];if(Me(a,e))return r[e]=3,a[e];if(n!==Ce&&Me(n,e))return r[e]=4,n[e];Ca&&(r[e]=0)}}const u=ks[e];let c,d;if(u)return e==="$attrs"&&nt(t.attrs,"get",""),u(t);if((c=i.__cssModules)&&(c=c[e]))return c;if(n!==Ce&&Me(n,e))return r[e]=4,n[e];if(d=l.config.globalProperties,Me(d,e))return d[e]},set({_:t},e,n){const{data:s,setupState:o,ctx:a}=t;return na(o,e)?(o[e]=n,!0):s!==Ce&&Me(s,e)?(s[e]=n,!0):Me(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(a[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:s,appContext:o,props:a,type:r}},i){let l;return!!(n[i]||t!==Ce&&i[0]!=="$"&&Me(t,i)||na(e,i)||Me(a,i)||Me(s,i)||Me(ks,i)||Me(o.config.globalProperties,i)||(l=r.__cssModules)&&l[i])},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:Me(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function go(t){return fe(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}function Dn(t,e){return!t||!e?t||e:fe(t)&&fe(e)?t.concat(e):Qe({},go(t),go(e))}let Ca=!0;function Td(t){const e=zl(t),n=t.proxy,s=t.ctx;Ca=!1,e.beforeCreate&&Lr(e.beforeCreate,t,"bc");const{data:o,computed:a,methods:r,watch:i,provide:l,inject:u,created:c,beforeMount:d,mounted:p,beforeUpdate:m,updated:y,activated:g,deactivated:v,beforeDestroy:b,beforeUnmount:w,destroyed:k,unmounted:T,render:_,renderTracked:N,renderTriggered:G,errorCaptured:j,serverPrefetch:P,expose:I,inheritAttrs:he,components:ke,directives:q,filters:L}=e;if(u&&Od(u,s,null),r)for(const W in r){const X=r[W];xe(X)&&(s[W]=X.bind(n))}if(o){const W=o.call(n,n);Re(W)&&(t.data=Pe(W))}if(Ca=!0,a)for(const W in a){const X=a[W],we=xe(X)?X.bind(n,n):xe(X.get)?X.get.bind(n,n):Ut,ft=!xe(X)&&xe(X.set)?X.set.bind(n):Ut,lt=E({get:we,set:ft});Object.defineProperty(s,W,{enumerable:!0,configurable:!0,get:()=>lt.value,set:Y=>lt.value=Y})}if(i)for(const W in i)Ul(i[W],s,n,W);if(l){const W=xe(l)?l.call(n):l;Reflect.ownKeys(W).forEach(X=>{ro(X,W[X])})}c&&Lr(c,t,"c");function ie(W,X){fe(X)?X.forEach(we=>W(we.bind(n))):X&&W(X.bind(n))}if(ie(vd,d),ie(dr,p),ie(yd,m),ie(wd,y),ie(md,g),ie(gd,v),ie(Ed,j),ie($d,N),ie(Sd,G),ie(xd,w),ie(pr,T),ie(kd,P),fe(I))if(I.length){const W=t.exposed||(t.exposed={});I.forEach(X=>{Object.defineProperty(W,X,{get:()=>n[X],set:we=>n[X]=we,enumerable:!0})})}else t.exposed||(t.exposed={});_&&t.render===Ut&&(t.render=_),he!=null&&(t.inheritAttrs=he),ke&&(t.components=ke),q&&(t.directives=q),P&&Bl(t)}function Od(t,e,n=Ut){fe(t)&&(t=Aa(t));for(const s in t){const o=t[s];let a;Re(o)?"default"in o?a=zt(o.from||s,o.default,!0):a=zt(o.from||s):a=zt(o),it(a)?Object.defineProperty(e,s,{enumerable:!0,configurable:!0,get:()=>a.value,set:r=>a.value=r}):e[s]=a}}function Lr(t,e,n){_t(fe(t)?t.map(s=>s.bind(e.proxy)):t.bind(e.proxy),e,n)}function Ul(t,e,n,s){let o=s.includes(".")?Nl(n,s):()=>n[s];if(Fe(t)){const a=e[t];xe(a)&&_e(o,a)}else if(xe(t))_e(o,t.bind(n));else if(Re(t))if(fe(t))t.forEach(a=>Ul(a,e,n,s));else{const a=xe(t.handler)?t.handler.bind(n):e[t.handler];xe(a)&&_e(o,a,t)}}function zl(t){const e=t.type,{mixins:n,extends:s}=e,{mixins:o,optionsCache:a,config:{optionMergeStrategies:r}}=t.appContext,i=a.get(e);let l;return i?l=i:!o.length&&!n&&!s?l=e:(l={},o.length&&o.forEach(u=>bo(l,u,r,!0)),bo(l,e,r)),Re(e)&&a.set(e,l),l}function bo(t,e,n,s=!1){const{mixins:o,extends:a}=e;a&&bo(t,a,n,!0),o&&o.forEach(r=>bo(t,r,n,!0));for(const r in e)if(!(s&&r==="expose")){const i=Md[r]||n&&n[r];t[r]=i?i(t[r],e[r]):e[r]}return t}const Md={data:Nr,props:Br,emits:Br,methods:hs,computed:hs,beforeCreate:ut,created:ut,beforeMount:ut,mounted:ut,beforeUpdate:ut,updated:ut,beforeDestroy:ut,beforeUnmount:ut,destroyed:ut,unmounted:ut,activated:ut,deactivated:ut,errorCaptured:ut,serverPrefetch:ut,components:hs,directives:hs,watch:Id,provide:Nr,inject:Rd};function Nr(t,e){return e?t?function(){return Qe(xe(t)?t.call(this,this):t,xe(e)?e.call(this,this):e)}:e:t}function Rd(t,e){return hs(Aa(t),Aa(e))}function Aa(t){if(fe(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function ut(t,e){return t?[...new Set([].concat(t,e))]:e}function hs(t,e){return t?Qe(Object.create(null),t,e):e}function Br(t,e){return t?fe(t)&&fe(e)?[...new Set([...t,...e])]:Qe(Object.create(null),go(t),go(e??{})):e}function Id(t,e){if(!t)return e;if(!e)return t;const n=Qe(Object.create(null),t);for(const s in e)n[s]=ut(t[s],e[s]);return n}function ql(){return{app:null,config:{isNativeTag:il,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let _d=0;function jd(t,e){return function(s,o=null){xe(s)||(s=Qe({},s)),o!=null&&!Re(o)&&(o=null);const a=ql(),r=new WeakSet,i=[];let l=!1;const u=a.app={_uid:_d++,_component:s,_props:o,_container:null,_context:a,_instance:null,version:up,get config(){return a.config},set config(c){},use(c,...d){return r.has(c)||(c&&xe(c.install)?(r.add(c),c.install(u,...d)):xe(c)&&(r.add(c),c(u,...d))),u},mixin(c){return a.mixins.includes(c)||a.mixins.push(c),u},component(c,d){return d?(a.components[c]=d,u):a.components[c]},directive(c,d){return d?(a.directives[c]=d,u):a.directives[c]},mount(c,d,p){if(!l){const m=u._ceVNode||C(s,o);return m.appContext=a,p===!0?p="svg":p===!1&&(p=void 0),t(m,c,p),l=!0,u._container=c,c.__vue_app__=u,Bo(m.component)}},onUnmount(c){i.push(c)},unmount(){l&&(_t(i,u._instance,16),t(null,u._container),delete u._container.__vue_app__)},provide(c,d){return a.provides[c]=d,u},runWithContext(c){const d=Jn;Jn=u;try{return c()}finally{Jn=d}}};return u}}let Jn=null;function Pn(t,e,n=Ce){const s=uu(),o=$t(e),a=dn(e),r=Kl(t,o),i=td((l,u)=>{let c,d=Ce,p;return dd(()=>{const m=t[o];et(c,m)&&(c=m,u())}),{get(){return l(),n.get?n.get(c):c},set(m){const y=n.set?n.set(m):m;if(!et(y,c)&&!(d!==Ce&&et(m,d)))return;const g=s.vnode.props,v=!!(g&&(e in g||o in g||a in g)&&(`onUpdate:${e}`in g||`onUpdate:${o}`in g||`onUpdate:${a}`in g));v||(c=m,u()),s.emit(`update:${e}`,y),et(m,d)&&(et(m,y)&&!et(y,p)||v&&d!==Ce&&!et(y,c))&&u(),d=m,p=y}}});return i[Symbol.iterator]=()=>{let l=0;return{next(){return l<2?{value:l++?r||Ce:i,done:!1}:{done:!0}}}},i}const Kl=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${$t(e)}Modifiers`]||t[`${dn(e)}Modifiers`];function Dd(t,e,...n){if(t.isUnmounted)return;const s=t.vnode.props||Ce;let o=n;const a=e.startsWith("update:"),r=a&&Kl(s,e.slice(7));r&&(r.trim&&(o=n.map(c=>Fe(c)?c.trim():c)),r.number&&(o=n.map(Mo)));let i,l=s[i=Xo(e)]||s[i=Xo($t(e))];!l&&a&&(l=s[i=Xo(dn(e))]),l&&_t(l,t,6,o);const u=s[i+"Once"];if(u){if(!t.emitted)t.emitted={};else if(t.emitted[i])return;t.emitted[i]=!0,_t(u,t,6,o)}}const Pd=new WeakMap;function Gl(t,e,n=!1){const s=n?Pd:e.emitsCache,o=s.get(t);if(o!==void 0)return o;const a=t.emits;let r={},i=!1;if(!xe(t)){const l=u=>{const c=Gl(u,e,!0);c&&(i=!0,Qe(r,c))};!n&&e.mixins.length&&e.mixins.forEach(l),t.extends&&l(t.extends),t.mixins&&t.mixins.forEach(l)}return!a&&!i?(Re(t)&&s.set(t,null),null):(fe(a)?a.forEach(l=>r[l]=null):Qe(r,a),Re(t)&&s.set(t,r),r)}function Lo(t,e){return!t||!Co(e)?!1:(e=e.slice(2),e=e==="Once"?e:e.replace(/Once$/,""),Me(t,e[0].toLowerCase()+e.slice(1))||Me(t,dn(e))||Me(t,e))}function Fr(t){const{type:e,vnode:n,proxy:s,withProxy:o,propsOptions:[a],slots:r,attrs:i,emit:l,render:u,renderCache:c,props:d,data:p,setupState:m,ctx:y,inheritAttrs:g}=t,v=fo(t);let b,w;try{if(n.shapeFlag&4){const T=o||s,_=T;b=Vt(u.call(_,T,c,d,m,p,y)),w=i}else{const T=e;b=Vt(T.length>1?T(d,{attrs:i,slots:r,emit:l}):T(d,null)),w=e.props?i:Ld(i)}}catch(T){sn.length=0,Do(T,t,1),b=C(un)}let k=b;if(w&&g!==!1){const T=Object.keys(w),{shapeFlag:_}=k;T.length&&_&7&&(a&&T.some(Ao)&&(w=Nd(w,a)),k=ts(k,w,!1,!0))}return n.dirs&&(k=ts(k,null,!1,!0),k.dirs=k.dirs?k.dirs.concat(n.dirs):n.dirs),n.transition&&cr(k,n.transition),b=k,fo(v),b}const Ld=t=>{let e;for(const n in t)(n==="class"||n==="style"||Co(n))&&((e||(e={}))[n]=t[n]);return e},Nd=(t,e)=>{const n={};for(const s in t)(!Ao(s)||!(s.slice(9)in e))&&(n[s]=t[s]);return n};function Bd(t,e,n){const{props:s,children:o,component:a}=t,{props:r,children:i,patchFlag:l}=e,u=a.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return s?Vr(s,r,u):!!r;if(l&8){const c=e.dynamicProps;for(let d=0;d<c.length;d++){const p=c[d];if(Wl(r,s,p)&&!Lo(u,p))return!0}}}else return(o||i)&&(!i||!i.$stable)?!0:s===r?!1:s?r?Vr(s,r,u):!0:!!r;return!1}function Vr(t,e,n){const s=Object.keys(e);if(s.length!==Object.keys(t).length)return!0;for(let o=0;o<s.length;o++){const a=s[o];if(Wl(e,t,a)&&!Lo(n,a))return!0}return!1}function Wl(t,e,n){const s=t[n],o=e[n];return n==="style"&&Re(s)&&Re(o)?!Bs(s,o):s!==o}function Fd({vnode:t,parent:e,suspense:n},s){for(;e;){const o=e.subTree;if(o.suspense&&o.suspense.activeBranch===t&&(o.suspense.vnode.el=o.el=s,t=o),o===t)(t=e.vnode).el=s,e=e.parent;else break}n&&n.activeBranch===t&&(n.vnode.el=s)}const Yl={},Xl=()=>Object.create(Yl),Jl=t=>Object.getPrototypeOf(t)===Yl;function Vd(t,e,n,s=!1){const o={},a=Xl();t.propsDefaults=Object.create(null),Ql(t,e,o,a);for(const r in t.propsOptions[0])r in o||(o[r]=void 0);n?t.props=s?o:Ml(o):t.type.props?t.props=o:t.props=a,t.attrs=a}function Hd(t,e,n,s){const{props:o,attrs:a,vnode:{patchFlag:r}}=t,i=Oe(o),[l]=t.propsOptions;let u=!1;if((s||r>0)&&!(r&16)){if(r&8){const c=t.vnode.dynamicProps;for(let d=0;d<c.length;d++){let p=c[d];if(Lo(t.emitsOptions,p))continue;const m=e[p];if(l)if(Me(a,p))m!==a[p]&&(a[p]=m,u=!0);else{const y=$t(p);o[y]=Ta(l,i,y,m,t,!1)}else m!==a[p]&&(a[p]=m,u=!0)}}}else{Ql(t,e,o,a)&&(u=!0);let c;for(const d in i)(!e||!Me(e,d)&&((c=dn(d))===d||!Me(e,c)))&&(l?n&&(n[d]!==void 0||n[c]!==void 0)&&(o[d]=Ta(l,i,d,void 0,t,!0)):delete o[d]);if(a!==i)for(const d in a)(!e||!Me(e,d))&&(delete a[d],u=!0)}u&&tn(t.attrs,"set","")}function Ql(t,e,n,s){const[o,a]=t.propsOptions;let r=!1,i;if(e)for(let l in e){if(bs(l))continue;const u=e[l];let c;o&&Me(o,c=$t(l))?!a||!a.includes(c)?n[c]=u:(i||(i={}))[c]=u:Lo(t.emitsOptions,l)||(!(l in s)||u!==s[l])&&(s[l]=u,r=!0)}if(a){const l=Oe(n),u=i||Ce;for(let c=0;c<a.length;c++){const d=a[c];n[d]=Ta(o,l,d,u[d],t,!Me(u,d))}}return r}function Ta(t,e,n,s,o,a){const r=t[n];if(r!=null){const i=Me(r,"default");if(i&&s===void 0){const l=r.default;if(r.type!==Function&&!r.skipFactory&&xe(l)){const{propsDefaults:u}=o;if(n in u)s=u[n];else{const c=Hs(o);s=u[n]=l.call(null,e),c()}}else s=l;o.ce&&o.ce._setProp(n,s)}r[0]&&(a&&!i?s=!1:r[1]&&(s===""||s===dn(n))&&(s=!0))}return s}const Ud=new WeakMap;function Zl(t,e,n=!1){const s=n?Ud:e.propsCache,o=s.get(t);if(o)return o;const a=t.props,r={},i=[];let l=!1;if(!xe(t)){const c=d=>{l=!0;const[p,m]=Zl(d,e,!0);Qe(r,p),m&&i.push(...m)};!n&&e.mixins.length&&e.mixins.forEach(c),t.extends&&c(t.extends),t.mixins&&t.mixins.forEach(c)}if(!a&&!l)return Re(t)&&s.set(t,Gn),Gn;if(fe(a))for(let c=0;c<a.length;c++){const d=$t(a[c]);Hr(d)&&(r[d]=Ce)}else if(a)for(const c in a){const d=$t(c);if(Hr(d)){const p=a[c],m=r[d]=fe(p)||xe(p)?{type:p}:Qe({},p),y=m.type;let g=!1,v=!0;if(fe(y))for(let b=0;b<y.length;++b){const w=y[b],k=xe(w)&&w.name;if(k==="Boolean"){g=!0;break}else k==="String"&&(v=!1)}else g=xe(y)&&y.name==="Boolean";m[0]=g,m[1]=v,(g||Me(m,"default"))&&i.push(d)}}const u=[r,i];return Re(t)&&s.set(t,u),u}function Hr(t){return t[0]!=="$"&&!bs(t)}const fr=t=>t==="_"||t==="_ctx"||t==="$stable",hr=t=>fe(t)?t.map(Vt):[Vt(t)],zd=(t,e,n)=>{if(e._n)return e;const s=D((...o)=>hr(e(...o)),n);return s._c=!1,s},eu=(t,e,n)=>{const s=t._ctx;for(const o in t){if(fr(o))continue;const a=t[o];if(xe(a))e[o]=zd(o,a,s);else if(a!=null){const r=hr(a);e[o]=()=>r}}},tu=(t,e)=>{const n=hr(e);t.slots.default=()=>n},nu=(t,e,n)=>{for(const s in e)(n||!fr(s))&&(t[s]=e[s])},qd=(t,e,n)=>{const s=t.slots=Xl();if(t.vnode.shapeFlag&32){const o=e._;o?(nu(s,e,n),n&&pl(s,"_",o,!0)):eu(e,s)}else e&&tu(t,e)},Kd=(t,e,n)=>{const{vnode:s,slots:o}=t;let a=!0,r=Ce;if(s.shapeFlag&32){const i=e._;i?n&&i===1?a=!1:nu(o,e,n):(a=!e.$stable,eu(e,o)),r=e}else e&&(tu(t,e),r={default:1});if(a)for(const i in o)!fr(i)&&r[i]==null&&delete o[i]},ht=Jd;function Gd(t){return Wd(t)}function Wd(t,e){const n=Ro();n.__VUE__=!0;const{insert:s,remove:o,patchProp:a,createElement:r,createText:i,createComment:l,setText:u,setElementText:c,parentNode:d,nextSibling:p,setScopeId:m=Ut,insertStaticContent:y}=t,g=(S,$,M,V=null,U=null,B=null,te=void 0,Z=null,Q=!!$.dynamicChildren)=>{if(S===$)return;S&&!cs(S,$)&&(V=H(S),Y(S,U,B,!0),S=null),$.patchFlag===-2&&(Q=!1,$.dynamicChildren=null);const{type:K,ref:ce,shapeFlag:se}=$;switch(K){case No:v(S,$,M,V);break;case un:b(S,$,M,V);break;case oa:S==null&&w($,M,V,te);break;case ae:ke(S,$,M,V,U,B,te,Z,Q);break;default:se&1?_(S,$,M,V,U,B,te,Z,Q):se&6?q(S,$,M,V,U,B,te,Z,Q):(se&64||se&128)&&K.process(S,$,M,V,U,B,te,Z,Q,le)}ce!=null&&U?xs(ce,S&&S.ref,B,$||S,!$):ce==null&&S&&S.ref!=null&&xs(S.ref,null,B,S,!0)},v=(S,$,M,V)=>{if(S==null)s($.el=i($.children),M,V);else{const U=$.el=S.el;$.children!==S.children&&u(U,$.children)}},b=(S,$,M,V)=>{S==null?s($.el=l($.children||""),M,V):$.el=S.el},w=(S,$,M,V)=>{[S.el,S.anchor]=y(S.children,$,M,V,S.el,S.anchor)},k=({el:S,anchor:$},M,V)=>{let U;for(;S&&S!==$;)U=p(S),s(S,M,V),S=U;s($,M,V)},T=({el:S,anchor:$})=>{let M;for(;S&&S!==$;)M=p(S),o(S),S=M;o($)},_=(S,$,M,V,U,B,te,Z,Q)=>{if($.type==="svg"?te="svg":$.type==="math"&&(te="mathml"),S==null)N($,M,V,U,B,te,Z,Q);else{const K=S.el&&S.el._isVueCE?S.el:null;try{K&&K._beginPatch(),P(S,$,U,B,te,Z,Q)}finally{K&&K._endPatch()}}},N=(S,$,M,V,U,B,te,Z)=>{let Q,K;const{props:ce,shapeFlag:se,transition:ue,dirs:be}=S;if(Q=S.el=r(S.type,B,ce&&ce.is,ce),se&8?c(Q,S.children):se&16&&j(S.children,Q,null,V,U,sa(S,B),te,Z),be&&$n(S,null,V,"created"),G(Q,S,S.scopeId,te,V),ce){for(const je in ce)je!=="value"&&!bs(je)&&a(Q,je,null,ce[je],B,V);"value"in ce&&a(Q,"value",null,ce.value,B),(K=ce.onVnodeBeforeMount)&&Nt(K,V,S)}be&&$n(S,null,V,"beforeMount");const $e=Yd(U,ue);$e&&ue.beforeEnter(Q),s(Q,$,M),((K=ce&&ce.onVnodeMounted)||$e||be)&&ht(()=>{try{K&&Nt(K,V,S),$e&&ue.enter(Q),be&&$n(S,null,V,"mounted")}finally{}},U)},G=(S,$,M,V,U)=>{if(M&&m(S,M),V)for(let B=0;B<V.length;B++)m(S,V[B]);if(U){let B=U.subTree;if($===B||ru(B.type)&&(B.ssContent===$||B.ssFallback===$)){const te=U.vnode;G(S,te,te.scopeId,te.slotScopeIds,U.parent)}}},j=(S,$,M,V,U,B,te,Z,Q=0)=>{for(let K=Q;K<S.length;K++){const ce=S[K]=Z?en(S[K]):Vt(S[K]);g(null,ce,$,M,V,U,B,te,Z)}},P=(S,$,M,V,U,B,te)=>{const Z=$.el=S.el;let{patchFlag:Q,dynamicChildren:K,dirs:ce}=$;Q|=S.patchFlag&16;const se=S.props||Ce,ue=$.props||Ce;let be;if(M&&En(M,!1),(be=ue.onVnodeBeforeUpdate)&&Nt(be,M,$,S),ce&&$n($,S,M,"beforeUpdate"),M&&En(M,!0),K&&(!S.dynamicChildren||S.dynamicChildren.length!==K.length)&&(Q=0,te=!1,K=null),(se.innerHTML&&ue.innerHTML==null||se.textContent&&ue.textContent==null)&&c(Z,""),K?I(S.dynamicChildren,K,Z,M,V,sa($,U),B):te||X(S,$,Z,null,M,V,sa($,U),B,!1),Q>0){if(Q&16)he(Z,se,ue,M,U);else if(Q&2&&se.class!==ue.class&&a(Z,"class",null,ue.class,U),Q&4&&a(Z,"style",se.style,ue.style,U),Q&8){const $e=$.dynamicProps;for(let je=0;je<$e.length;je++){const Ie=$e[je],He=se[Ie],Ze=ue[Ie];(Ze!==He||Ie==="value")&&a(Z,Ie,He,Ze,U,M)}}Q&1&&S.children!==$.children&&c(Z,$.children)}else!te&&K==null&&he(Z,se,ue,M,U);((be=ue.onVnodeUpdated)||ce)&&ht(()=>{be&&Nt(be,M,$,S),ce&&$n($,S,M,"updated")},V)},I=(S,$,M,V,U,B,te)=>{for(let Z=0;Z<$.length;Z++){const Q=S[Z],K=$[Z],ce=Q.el&&(Q.type===ae||!cs(Q,K)||Q.shapeFlag&198)?d(Q.el):M;g(Q,K,ce,null,V,U,B,te,!0)}},he=(S,$,M,V,U)=>{if($!==M){if($!==Ce)for(const B in $)!bs(B)&&!(B in M)&&a(S,B,$[B],null,U,V);for(const B in M){if(bs(B))continue;const te=M[B],Z=$[B];te!==Z&&B!=="value"&&a(S,B,Z,te,U,V)}"value"in M&&a(S,"value",$.value,M.value,U)}},ke=(S,$,M,V,U,B,te,Z,Q)=>{const K=$.el=S?S.el:i(""),ce=$.anchor=S?S.anchor:i("");let{patchFlag:se,dynamicChildren:ue,slotScopeIds:be}=$;be&&(Z=Z?Z.concat(be):be),S==null?(s(K,M,V),s(ce,M,V),j($.children||[],M,ce,U,B,te,Z,Q)):se>0&&se&64&&ue&&S.dynamicChildren&&S.dynamicChildren.length===ue.length?(I(S.dynamicChildren,ue,M,U,B,te,Z),($.key!=null||U&&$===U.subTree)&&su(S,$,!0)):X(S,$,M,ce,U,B,te,Z,Q)},q=(S,$,M,V,U,B,te,Z,Q)=>{$.slotScopeIds=Z,S==null?$.shapeFlag&512?U.ctx.activate($,M,V,te,Q):L($,M,V,U,B,te,Q):z(S,$,Q)},L=(S,$,M,V,U,B,te)=>{const Z=S.component=sp(S,V,U);if(Fl(S)&&(Z.ctx.renderer=le),op(Z,!1,te),Z.asyncDep){if(U&&U.registerDep(Z,ie,te),!S.el){const Q=Z.subTree=C(un);b(null,Q,$,M),S.placeholder=Q.el}}else ie(Z,S,$,M,U,B,te)},z=(S,$,M)=>{const V=$.component=S.component;if(Bd(S,$,M))if(V.asyncDep&&!V.asyncResolved){W(V,$,M);return}else V.next=$,V.update();else $.el=S.el,V.vnode=$},ie=(S,$,M,V,U,B,te)=>{const Z=()=>{if(S.isMounted){let{next:se,bu:ue,u:be,parent:$e,vnode:je}=S;{const Pt=ou(S);if(Pt){se&&(se.el=je.el,W(S,se,te)),Pt.asyncDep.then(()=>{ht(()=>{S.isUnmounted||K()},U)});return}}let Ie=se,He;En(S,!1),se?(se.el=je.el,W(S,se,te)):se=je,ue&&ao(ue),(He=se.props&&se.props.onVnodeBeforeUpdate)&&Nt(He,$e,se,je),En(S,!0);const Ze=Fr(S),Dt=S.subTree;S.subTree=Ze,g(Dt,Ze,d(Dt.el),H(Dt),S,U,B),se.el=Ze.el,Ie===null&&Fd(S,Ze.el),be&&ht(be,U),(He=se.props&&se.props.onVnodeUpdated)&&ht(()=>Nt(He,$e,se,je),U)}else{let se;const{el:ue,props:be}=$,{bm:$e,m:je,parent:Ie,root:He,type:Ze}=S,Dt=Xn($);En(S,!1),$e&&ao($e),!Dt&&(se=be&&be.onVnodeBeforeMount)&&Nt(se,Ie,$),En(S,!0);{He.ce&&He.ce._hasShadowRoot()&&He.ce._injectChildStyle(Ze,S.parent?S.parent.type:void 0);const Pt=S.subTree=Fr(S);g(null,Pt,M,V,S,U,B),$.el=Pt.el}if(je&&ht(je,U),!Dt&&(se=be&&be.onVnodeMounted)){const Pt=$;ht(()=>Nt(se,Ie,Pt),U)}($.shapeFlag&256||Ie&&Xn(Ie.vnode)&&Ie.vnode.shapeFlag&256)&&S.a&&ht(S.a,U),S.isMounted=!0,$=M=V=null}};S.scope.on();const Q=S.effect=new gl(Z);S.scope.off();const K=S.update=Q.run.bind(Q),ce=S.job=Q.runIfDirty.bind(Q);ce.i=S,ce.id=S.uid,Q.scheduler=()=>lr(ce),En(S,!0),K()},W=(S,$,M)=>{$.component=S;const V=S.vnode.props;S.vnode=$,S.next=null,Hd(S,$.props,V,M),Kd(S,$.children,M),an(),jr(S),rn()},X=(S,$,M,V,U,B,te,Z,Q=!1)=>{const K=S&&S.children,ce=S?S.shapeFlag:0,se=$.children,{patchFlag:ue,shapeFlag:be}=$;if(ue>0){if(ue&128){ft(K,se,M,V,U,B,te,Z,Q);return}else if(ue&256){we(K,se,M,V,U,B,te,Z,Q);return}}be&8?(ce&16&&tt(K,U,B),se!==K&&c(M,se)):ce&16?be&16?ft(K,se,M,V,U,B,te,Z,Q):tt(K,U,B,!0):(ce&8&&c(M,""),be&16&&j(se,M,V,U,B,te,Z,Q))},we=(S,$,M,V,U,B,te,Z,Q)=>{S=S||Gn,$=$||Gn;const K=S.length,ce=$.length,se=Math.min(K,ce);let ue;for(ue=0;ue<se;ue++){const be=$[ue]=Q?en($[ue]):Vt($[ue]);g(S[ue],be,M,null,U,B,te,Z,Q)}K>ce?tt(S,U,B,!0,!1,se):j($,M,V,U,B,te,Z,Q,se)},ft=(S,$,M,V,U,B,te,Z,Q)=>{let K=0;const ce=$.length;let se=S.length-1,ue=ce-1;for(;K<=se&&K<=ue;){const be=S[K],$e=$[K]=Q?en($[K]):Vt($[K]);if(cs(be,$e))g(be,$e,M,null,U,B,te,Z,Q);else break;K++}for(;K<=se&&K<=ue;){const be=S[se],$e=$[ue]=Q?en($[ue]):Vt($[ue]);if(cs(be,$e))g(be,$e,M,null,U,B,te,Z,Q);else break;se--,ue--}if(K>se){if(K<=ue){const be=ue+1,$e=be<ce?$[be].el:V;for(;K<=ue;)g(null,$[K]=Q?en($[K]):Vt($[K]),M,$e,U,B,te,Z,Q),K++}}else if(K>ue)for(;K<=se;)Y(S[K],U,B,!0),K++;else{const be=K,$e=K,je=new Map;for(K=$e;K<=ue;K++){const bt=$[K]=Q?en($[K]):Vt($[K]);bt.key!=null&&je.set(bt.key,K)}let Ie,He=0;const Ze=ue-$e+1;let Dt=!1,Pt=0;const ls=new Array(Ze);for(K=0;K<Ze;K++)ls[K]=0;for(K=be;K<=se;K++){const bt=S[K];if(He>=Ze){Y(bt,U,B,!0);continue}let Lt;if(bt.key!=null)Lt=je.get(bt.key);else for(Ie=$e;Ie<=ue;Ie++)if(ls[Ie-$e]===0&&cs(bt,$[Ie])){Lt=Ie;break}Lt===void 0?Y(bt,U,B,!0):(ls[Lt-$e]=K+1,Lt>=Pt?Pt=Lt:Dt=!0,g(bt,$[Lt],M,null,U,B,te,Z,Q),He++)}const Ar=Dt?Xd(ls):Gn;for(Ie=Ar.length-1,K=Ze-1;K>=0;K--){const bt=$e+K,Lt=$[bt],Tr=$[bt+1],Or=bt+1<ce?Tr.el||au(Tr):V;ls[K]===0?g(null,Lt,M,Or,U,B,te,Z,Q):Dt&&(Ie<0||K!==Ar[Ie]?lt(Lt,M,Or,2):Ie--)}}},lt=(S,$,M,V,U=null)=>{const{el:B,type:te,transition:Z,children:Q,shapeFlag:K}=S;if(K&6){lt(S.component.subTree,$,M,V);return}if(K&128){S.suspense.move($,M,V);return}if(K&64){te.move(S,$,M,le);return}if(te===ae){s(B,$,M);for(let se=0;se<Q.length;se++)lt(Q[se],$,M,V);s(S.anchor,$,M);return}if(te===oa){k(S,$,M);return}if(V!==2&&K&1&&Z)if(V===0)Z.persisted&&!B[ta]?s(B,$,M):(Z.beforeEnter(B),s(B,$,M),ht(()=>Z.enter(B),U));else{const{leave:se,delayLeave:ue,afterLeave:be}=Z,$e=()=>{S.ctx.isUnmounted?o(B):s(B,$,M)},je=()=>{const Ie=B._isLeaving||!!B[ta];B._isLeaving&&B[ta](!0),Z.persisted&&!Ie?$e():se(B,()=>{$e(),be&&be()})};ue?ue(B,$e,je):je()}else s(B,$,M)},Y=(S,$,M,V=!1,U=!1)=>{const{type:B,props:te,ref:Z,children:Q,dynamicChildren:K,shapeFlag:ce,patchFlag:se,dirs:ue,cacheIndex:be,memo:$e}=S;if(se===-2&&(U=!1),Z!=null&&(an(),xs(Z,null,M,S,!0),rn()),be!=null&&($.renderCache[be]=void 0),ce&256){$.ctx.deactivate(S);return}const je=ce&1&&ue,Ie=!Xn(S);let He;if(Ie&&(He=te&&te.onVnodeBeforeUnmount)&&Nt(He,$,S),ce&6)ze(S.component,M,V);else{if(ce&128){S.suspense.unmount(M,V);return}je&&$n(S,null,$,"beforeUnmount"),ce&64?S.type.remove(S,$,M,le,V):K&&!K.hasOnce&&(B!==ae||se>0&&se&64)?tt(K,$,M,!1,!0):(B===ae&&se&384||!U&&ce&16)&&tt(Q,$,M),V&&pe(S)}const Ze=$e!=null&&be==null;(Ie&&(He=te&&te.onVnodeUnmounted)||je||Ze)&&ht(()=>{He&&Nt(He,$,S),je&&$n(S,null,$,"unmounted"),Ze&&(S.el=null)},M)},pe=S=>{const{type:$,el:M,anchor:V,transition:U}=S;if($===ae){Ae(M,V);return}if($===oa){T(S);return}const B=()=>{o(M),U&&!U.persisted&&U.afterLeave&&U.afterLeave()};if(S.shapeFlag&1&&U&&!U.persisted){const{leave:te,delayLeave:Z}=U,Q=()=>te(M,B);Z?Z(S.el,B,Q):Q()}else B()},Ae=(S,$)=>{let M;for(;S!==$;)M=p(S),o(S),S=M;o($)},ze=(S,$,M)=>{const{bum:V,scope:U,job:B,subTree:te,um:Z,m:Q,a:K}=S;Ur(Q),Ur(K),V&&ao(V),U.stop(),B&&(B.flags|=8,Y(te,S,$,M)),Z&&ht(Z,$),ht(()=>{S.isUnmounted=!0},$)},tt=(S,$,M,V=!1,U=!1,B=0)=>{for(let te=B;te<S.length;te++)Y(S[te],$,M,V,U)},H=S=>{if(S.shapeFlag&6)return H(S.component.subTree);if(S.shapeFlag&128)return S.suspense.next();const $=p(S.anchor||S.el),M=$&&$[fd];return M?p(M):$};let re=!1;const ne=(S,$,M)=>{let V;S==null?$._vnode&&(Y($._vnode,null,null,!0),V=$._vnode.component):g($._vnode||null,S,$,null,null,null,M),$._vnode=S,re||(re=!0,jr(V),Dl(),re=!1)},le={p:g,um:Y,m:lt,r:pe,mt:L,mc:j,pc:X,pbc:I,n:H,o:t};return{render:ne,hydrate:void 0,createApp:jd(ne)}}function sa({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function En({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function Yd(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function su(t,e,n=!1){const s=t.children,o=e.children;if(fe(s)&&fe(o))for(let a=0;a<s.length;a++){const r=s[a];let i=o[a];i.shapeFlag&1&&!i.dynamicChildren&&((i.patchFlag<=0||i.patchFlag===32)&&(i=o[a]=en(o[a]),i.el=r.el),!n&&i.patchFlag!==-2&&su(r,i)),i.type===No&&(i.patchFlag===-1&&(i=o[a]=en(i)),i.el=r.el),i.type===un&&!i.el&&(i.el=r.el)}}function Xd(t){const e=t.slice(),n=[0];let s,o,a,r,i;const l=t.length;for(s=0;s<l;s++){const u=t[s];if(u!==0){if(o=n[n.length-1],t[o]<u){e[s]=o,n.push(s);continue}for(a=0,r=n.length-1;a<r;)i=a+r>>1,t[n[i]]<u?a=i+1:r=i;u<t[n[a]]&&(a>0&&(e[s]=n[a-1]),n[a]=s)}}for(a=n.length,r=n[a-1];a-- >0;)n[a]=r,r=e[r];return n}function ou(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:ou(e)}function Ur(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}function au(t){if(t.placeholder)return t.placeholder;const e=t.component;return e?au(e.subTree):null}const ru=t=>t.__isSuspense;function Jd(t,e){e&&e.pendingBranch?fe(t)?e.effects.push(...t):e.effects.push(t):ld(t)}const ae=Symbol.for("v-fgt"),No=Symbol.for("v-txt"),un=Symbol.for("v-cmt"),oa=Symbol.for("v-stc"),sn=[];let wt=null;function x(t=!1){sn.push(wt=t?null:[])}function mr(){sn.pop(),wt=sn[sn.length-1]||null}let Ms=1;function vo(t,e=!1){Ms+=t,t<0&&wt&&e&&(wt.hasOnce=!0)}function iu(t){return t.dynamicChildren=Ms>0?wt||Gn:null,mr(),Ms>0&&wt&&wt.push(t),t}function A(t,e,n,s,o,a){return iu(h(t,e,n,s,o,a,!0))}function J(t,e,n,s,o){return iu(C(t,e,n,s,o,!0))}function Rs(t){return t?t.__v_isVNode===!0:!1}function cs(t,e){return t.type===e.type&&t.key===e.key}const lu=({key:t})=>t??null,io=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?Fe(t)||it(t)||xe(t)?{i:st,r:t,k:e,f:!!n}:t:null);function h(t,e=null,n=null,s=0,o=null,a=t===ae?0:1,r=!1,i=!1){const l={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&lu(e),ref:e&&io(e),scopeId:Ll,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:a,patchFlag:s,dynamicProps:o,dynamicChildren:null,appContext:null,ctx:st};return i?(yo(l,n),a&128&&t.normalize(l)):n&&(l.shapeFlag|=Fe(n)?8:16),Ms>0&&!r&&wt&&(l.patchFlag>0||a&6)&&l.patchFlag!==32&&wt.push(l),l}const C=Qd;function Qd(t,e=null,n=null,s=0,o=null,a=!1){if((!t||t===Cd)&&(t=un),Rs(t)){const i=ts(t,e,!0);return n&&yo(i,n),Ms>0&&!a&&wt&&(i.shapeFlag&6?wt[wt.indexOf(t)]=i:wt.push(i)),i.patchFlag=-2,i}if(lp(t)&&(t=t.__vccOpts),e){e=Zd(e);let{class:i,style:l}=e;i&&!Fe(i)&&(e.class=de(i)),Re(l)&&(rr(l)&&!fe(l)&&(l=Qe({},l)),e.style=on(l))}const r=Fe(t)?1:ru(t)?128:hd(t)?64:Re(t)?4:xe(t)?2:0;return h(t,e,n,s,o,r,a,!0)}function Zd(t){return t?rr(t)||Jl(t)?Qe({},t):t:null}function ts(t,e,n=!1,s=!1){const{props:o,ref:a,patchFlag:r,children:i,transition:l}=t,u=e?ep(o||{},e):o,c={__v_isVNode:!0,__v_skip:!0,type:t.type,props:u,key:u&&lu(u),ref:e&&e.ref?n&&a?fe(a)?a.concat(io(e)):[a,io(e)]:io(e):a,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:i,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==ae?r===-1?16:r|16:r,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:l,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&ts(t.ssContent),ssFallback:t.ssFallback&&ts(t.ssFallback),placeholder:t.placeholder,el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce};return l&&s&&cr(c,l.clone(c)),c}function O(t=" ",e=0){return C(No,null,t,e)}function ge(t="",e=!1){return e?(x(),J(un,null,t)):C(un,null,t)}function Vt(t){return t==null||typeof t=="boolean"?C(un):fe(t)?C(ae,null,t.slice()):Rs(t)?en(t):C(No,null,String(t))}function en(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:ts(t)}function yo(t,e){let n=0;const{shapeFlag:s}=t;if(e==null)e=null;else if(fe(e))n=16;else if(typeof e=="object")if(s&65){const o=e.default;o&&(o._c&&(o._d=!1),yo(t,o()),o._c&&(o._d=!0));return}else{n=32;const o=e._;!o&&!Jl(e)?e._ctx=st:o===3&&st&&(st.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else if(xe(e)){if(s&65){yo(t,{default:e});return}e={default:e,_ctx:st},n=32}else e=String(e),s&64?(n=16,e=[O(e)]):n=8;t.children=e,t.shapeFlag|=n}function ep(...t){const e={};for(let n=0;n<t.length;n++){const s=t[n];for(const o in s)if(o==="class")e.class!==s.class&&(e.class=de([e.class,s.class]));else if(o==="style")e.style=on([e.style,s.style]);else if(Co(o)){const a=e[o],r=s[o];r&&a!==r&&!(fe(a)&&a.includes(r))?e[o]=a?[].concat(a,r):r:r==null&&a==null&&!Ao(o)&&(e[o]=r)}else o!==""&&(e[o]=s[o])}return e}function Nt(t,e,n,s=null){_t(t,e,7,[n,s])}const tp=ql();let np=0;function sp(t,e,n){const s=t.type,o=(e?e.appContext:t.appContext)||tp,a={uid:np++,vnode:t,type:s,parent:e,appContext:o,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Ic(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(o.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Zl(s,o),emitsOptions:Gl(s,o),emit:null,emitted:null,propsDefaults:Ce,inheritAttrs:s.inheritAttrs,ctx:Ce,data:Ce,props:Ce,attrs:Ce,slots:Ce,refs:Ce,setupState:Ce,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return a.ctx={_:a},a.root=e?e.root:a,a.emit=Dd.bind(null,a),t.ce&&t.ce(a),a}let pt=null;const uu=()=>pt||st;let wo,Oa;{const t=Ro(),e=(n,s)=>{let o;return(o=t[n])||(o=t[n]=[]),o.push(s),a=>{o.length>1?o.forEach(r=>r(a)):o[0](a)}};wo=e("__VUE_INSTANCE_SETTERS__",n=>pt=n),Oa=e("__VUE_SSR_SETTERS__",n=>Is=n)}const Hs=t=>{const e=pt;return wo(t),t.scope.on(),()=>{t.scope.off(),wo(e)}},zr=()=>{pt&&pt.scope.off(),wo(null)};function cu(t){return t.vnode.shapeFlag&4}let Is=!1;function op(t,e=!1,n=!1){e&&Oa(e);const{props:s,children:o}=t.vnode,a=cu(t);Vd(t,s,a,e),qd(t,o,n||e);const r=a?ap(t,e):void 0;return e&&Oa(!1),r}function ap(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,Ad);const{setup:s}=n;if(s){an();const o=t.setupContext=s.length>1?ip(t):null,a=Hs(t),r=Fs(s,t,0,[t.props,o]),i=ll(r);if(rn(),a(),(i||t.sp)&&!Xn(t)&&Bl(t),i){if(r.then(zr,zr),e)return r.then(l=>{qr(t,l)}).catch(l=>{Do(l,t,0)});t.asyncDep=r}else qr(t,r)}else du(t)}function qr(t,e,n){xe(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:Re(e)&&(t.setupState=Il(e)),du(t)}function du(t,e,n){const s=t.type;t.render||(t.render=s.render||Ut);{const o=Hs(t);an();try{Td(t)}finally{rn(),o()}}}const rp={get(t,e){return nt(t,"get",""),t[e]}};function ip(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,rp),slots:t.slots,emit:t.emit,expose:e}}function Bo(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(Il(Jc(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in ks)return ks[n](t)},has(e,n){return n in e||n in ks}})):t.proxy}function lp(t){return xe(t)&&"__vccOpts"in t}const E=(t,e)=>sd(t,e,Is);function pu(t,e,n){try{vo(-1);const s=arguments.length;return s===2?Re(e)&&!fe(e)?Rs(e)?C(t,null,[e]):C(t,e):C(t,null,e):(s>3?n=Array.prototype.slice.call(arguments,2):s===3&&Rs(n)&&(n=[n]),C(t,e,n))}finally{vo(1)}}const up="3.5.40";/**
* @vue/runtime-dom v3.5.40
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Ma;const Kr=typeof window<"u"&&window.trustedTypes;if(Kr)try{Ma=Kr.createPolicy("vue",{createHTML:t=>t})}catch{}const fu=Ma?t=>Ma.createHTML(t):t=>t,cp="http://www.w3.org/2000/svg",dp="http://www.w3.org/1998/Math/MathML",Zt=typeof document<"u"?document:null,Gr=Zt&&Zt.createElement("template"),pp={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,s)=>{const o=e==="svg"?Zt.createElementNS(cp,t):e==="mathml"?Zt.createElementNS(dp,t):n?Zt.createElement(t,{is:n}):Zt.createElement(t);return t==="select"&&s&&s.multiple!=null&&o.setAttribute("multiple",s.multiple),o},createText:t=>Zt.createTextNode(t),createComment:t=>Zt.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>Zt.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,s,o,a){const r=n?n.previousSibling:e.lastChild;if(o&&(o===a||o.nextSibling))for(;e.insertBefore(o.cloneNode(!0),n),!(o===a||!(o=o.nextSibling)););else{Gr.innerHTML=fu(s==="svg"?`<svg>${t}</svg>`:s==="mathml"?`<math>${t}</math>`:t);const i=Gr.content;if(s==="svg"||s==="mathml"){const l=i.firstChild;for(;l.firstChild;)i.appendChild(l.firstChild);i.removeChild(l)}e.insertBefore(i,n)}return[r?r.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},fp=Symbol("_vtc");function hp(t,e,n){const s=t[fp];s&&(e=(e?[e,...s]:[...s]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const Wr=Symbol("_vod"),mp=Symbol("_vsh"),gp=Symbol(""),bp=/(?:^|;)\s*display\s*:/;function vp(t,e,n){const s=t.style,o=Fe(n);let a=!1;if(n&&!o){if(e)if(Fe(e))for(const r of e.split(";")){const i=r.slice(0,r.indexOf(":")).trim();n[i]==null&&ms(s,i,"")}else for(const r in e)n[r]==null&&ms(s,r,"");for(const r in n){r==="display"&&(a=!0);const i=n[r];i!=null?wp(t,r,!Fe(e)&&e?e[r]:void 0,i)||ms(s,r,i):ms(s,r,"")}}else if(o){if(e!==n){const r=s[gp];r&&(n+=";"+r),s.cssText=n,a=bp.test(n)}}else e&&t.removeAttribute("style");Wr in t&&(t[Wr]=a?s.display:"",t[mp]&&(s.display="none"))}const Yr=/\s*!important$/;function ms(t,e,n){if(fe(n))n.forEach(s=>ms(t,e,s));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const s=yp(t,e);Yr.test(n)?t.setProperty(dn(s),n.replace(Yr,""),"important"):t[s]=n}}const Xr=["Webkit","Moz","ms"],aa={};function yp(t,e){const n=aa[e];if(n)return n;let s=$t(e);if(s!=="filter"&&s in t)return aa[e]=s;s=dl(s);for(let o=0;o<Xr.length;o++){const a=Xr[o]+s;if(a in t)return aa[e]=a}return e}function wp(t,e,n,s){return t.tagName==="TEXTAREA"&&(e==="width"||e==="height")&&Fe(s)&&n===s}const Jr="http://www.w3.org/1999/xlink";function Qr(t,e,n,s,o,a=Oc(e)){s&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(Jr,e.slice(6,e.length)):t.setAttributeNS(Jr,e,n):n==null||a&&!fl(n)?t.removeAttribute(e):t.setAttribute(e,a?"":Rt(n)?String(n):n)}function Zr(t,e,n,s,o){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?fu(n):n);return}const a=t.tagName;if(e==="value"&&a!=="PROGRESS"&&!a.includes("-")){const i=a==="OPTION"?t.getAttribute("value")||"":t.value,l=n==null?t.type==="checkbox"?"on":"":String(n);(i!==l||!("_value"in t))&&(t.value=l),n==null&&t.removeAttribute(e),t._value=n;return}let r=!1;if(n===""||n==null){const i=typeof t[e];i==="boolean"?n=fl(n):n==null&&i==="string"?(n="",r=!0):i==="number"&&(n=0,r=!0)}try{t[e]=n}catch{}r&&t.removeAttribute(o||e)}function An(t,e,n,s){t.addEventListener(e,n,s)}function xp(t,e,n,s){t.removeEventListener(e,n,s)}const ei=Symbol("_vei");function kp(t,e,n,s,o=null){const a=t[ei]||(t[ei]={}),r=a[e];if(s&&r)r.value=s;else{const[i,l]=Ep(e);if(s){const u=a[e]=Tp(s,o);An(t,i,u,l)}else r&&(xp(t,i,r,l),a[e]=void 0)}}const Sp=/(Once|Passive|Capture)$/,$p=/^on:?(?:Once|Passive|Capture)$/;function Ep(t){let e,n;for(;(n=t.match(Sp))&&!$p.test(t);)e||(e={}),t=t.slice(0,t.length-n[1].length),e[n[1].toLowerCase()]=!0;return[t[2]===":"?t.slice(3):dn(t.slice(2)),e]}let ra=0;const Cp=Promise.resolve(),Ap=()=>ra||(Cp.then(()=>ra=0),ra=Date.now());function Tp(t,e){const n=s=>{if(!s._vts)s._vts=Date.now();else if(s._vts<=n.attached)return;const o=n.value;if(fe(o)){const a=s.stopImmediatePropagation;s.stopImmediatePropagation=()=>{a.call(s),s._stopped=!0};const r=o.slice(),i=[s];for(let l=0;l<r.length&&!s._stopped;l++){const u=r[l];u&&_t(u,e,5,i)}}else _t(o,e,5,[s])};return n.value=t,n.attached=Ap(),n}const ti=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,Op=(t,e,n,s,o,a)=>{const r=o==="svg";e==="class"?hp(t,s,r):e==="style"?vp(t,n,s):Co(e)?Ao(e)||kp(t,e,n,s,a):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):Mp(t,e,s,r))?(Zr(t,e,s),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&Qr(t,e,s,r,a,e!=="value")):t._isVueCE&&(Rp(t,e)||t._def.__asyncLoader&&(/[A-Z]/.test(e)||!Fe(s)))?Zr(t,$t(e),s,a,e):(e==="true-value"?t._trueValue=s:e==="false-value"&&(t._falseValue=s),Qr(t,e,s,r))};function Mp(t,e,n,s){if(s)return!!(e==="innerHTML"||e==="textContent"||e in t&&ti(e)&&xe(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="sandbox"&&t.tagName==="IFRAME"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const o=t.tagName;if(o==="IMG"||o==="VIDEO"||o==="CANVAS"||o==="SOURCE")return!1}return ti(e)&&Fe(n)?!1:e in t}function Rp(t,e){const n=t._def.props;if(!n)return!1;const s=$t(e);return Array.isArray(n)?n.some(o=>$t(o)===s):Object.keys(n).some(o=>$t(o)===s)}const xo=t=>{const e=t.props["onUpdate:modelValue"]||!1;return fe(e)?n=>ao(e,n):e};function Ip(t){t.target.composing=!0}function ni(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const Qn=Symbol("_assign");function si(t,e,n){return e&&(t=t.trim()),n&&(t=Mo(t)),t}const ko={created(t,{modifiers:{lazy:e,trim:n,number:s}},o){t[Qn]=xo(o);const a=s||o.props&&o.props.type==="number";An(t,e?"change":"input",r=>{r.target.composing||t[Qn](si(t.value,n,a))}),(n||a)&&An(t,"change",()=>{t.value=si(t.value,n,a)}),e||(An(t,"compositionstart",Ip),An(t,"compositionend",ni),An(t,"change",ni))},mounted(t,{value:e}){t.value=e??""},beforeUpdate(t,{value:e,oldValue:n,modifiers:{lazy:s,trim:o,number:a}},r){if(t[Qn]=xo(r),t.composing)return;const i=(a||t.type==="number")&&!/^0\d/.test(t.value)?Mo(t.value):t.value,l=e??"";if(i===l)return;const u=t.getRootNode();(u instanceof Document||u instanceof ShadowRoot)&&u.activeElement===t&&t.type!=="range"&&(s&&e===n||o&&t.value.trim()===l)||(t.value=l)}},_p={deep:!0,created(t,{value:e,modifiers:{number:n}},s){t._modelValue=e,An(t,"change",()=>{const o=Array.prototype.filter.call(t.options,a=>a.selected).map(a=>n?Mo(So(a)):So(a));t[Qn](t.multiple?To(t._modelValue)?new Set(o):o:o[0]),t._assigning=!0,Vs(()=>{t._assigning=!1})}),t[Qn]=xo(s)},mounted(t,{value:e}){oi(t,e)},beforeUpdate(t,{value:e},n){t._modelValue=e,t[Qn]=xo(n)},updated(t,{value:e}){t._assigning||oi(t,e)}};function oi(t,e){const n=t.multiple,s=fe(e);if(!(n&&!s&&!To(e))){for(let o=0,a=t.options.length;o<a;o++){const r=t.options[o],i=So(r);if(n)if(s){const l=typeof i;l==="string"||l==="number"?r.selected=e.some(u=>String(u)===String(i)):r.selected=Rc(e,i)>-1}else r.selected=e.has(i);else if(Bs(So(r),e)){t.selectedIndex!==o&&(t.selectedIndex=o);return}}!n&&t.selectedIndex!==-1&&(t.selectedIndex=-1)}}function So(t){return"_value"in t?t._value:t.value}const jp=["ctrl","shift","alt","meta"],Dp={stop:t=>t.stopPropagation(),prevent:t=>t.preventDefault(),self:t=>t.target!==t.currentTarget,ctrl:t=>!t.ctrlKey,shift:t=>!t.shiftKey,alt:t=>!t.altKey,meta:t=>!t.metaKey,left:t=>"button"in t&&t.button!==0,middle:t=>"button"in t&&t.button!==1,right:t=>"button"in t&&t.button!==2,exact:(t,e)=>jp.some(n=>t[`${n}Key`]&&!e.includes(n))},Xt=(t,e)=>{if(!t)return t;const n=t._withMods||(t._withMods={}),s=e.join(".");return n[s]||(n[s]=(o,...a)=>{for(let r=0;r<e.length;r++){const i=Dp[e[r]];if(i&&i(o,e))return}return t(o,...a)})},Pp={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},At=(t,e)=>{const n=t._withKeys||(t._withKeys={}),s=e.join(".");return n[s]||(n[s]=o=>{if(!("key"in o))return;const a=dn(o.key);if(e.some(r=>r===a||Pp[r]===a))return t(o)})},Lp=Qe({patchProp:Op},pp);let ai;function Np(){return ai||(ai=Gd(Lp))}const Bp=(...t)=>{const e=Np().createApp(...t),{mount:n}=e;return e.mount=s=>{const o=Vp(s);if(!o)return;const a=e._component;!xe(a)&&!a.render&&!a.template&&(a.template=o.innerHTML),o.nodeType===1&&(o.textContent="");const r=n(o,!1,Fp(o));return o instanceof Element&&(o.removeAttribute("v-cloak"),o.setAttribute("data-v-app","")),r},e};function Fp(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function Vp(t){return Fe(t)?document.querySelector(t):t}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const Un=typeof document<"u";function hu(t){return typeof t=="object"||"displayName"in t||"props"in t||"__vccOpts"in t}function Hp(t){return t.__esModule||t[Symbol.toStringTag]==="Module"||t.default&&hu(t.default)}const Te=Object.assign;function ia(t,e){const n={};for(const s in e){const o=e[s];n[s]=jt(o)?o.map(t):t(o)}return n}const Ss=()=>{},jt=Array.isArray;function ri(t,e){const n={};for(const s in t)n[s]=s in e?e[s]:t[s];return n}const mu=/#/g,Up=/&/g,zp=/\//g,qp=/=/g,Kp=/\?/g,gu=/\+/g,Gp=/%5B/g,Wp=/%5D/g,bu=/%5E/g,Yp=/%60/g,vu=/%7B/g,Xp=/%7C/g,yu=/%7D/g,Jp=/%20/g;function gr(t){return t==null?"":encodeURI(""+t).replace(Xp,"|").replace(Gp,"[").replace(Wp,"]")}function Qp(t){return gr(t).replace(vu,"{").replace(yu,"}").replace(bu,"^")}function Ra(t){return gr(t).replace(gu,"%2B").replace(Jp,"+").replace(mu,"%23").replace(Up,"%26").replace(Yp,"`").replace(vu,"{").replace(yu,"}").replace(bu,"^")}function Zp(t){return Ra(t).replace(qp,"%3D")}function ef(t){return gr(t).replace(mu,"%23").replace(Kp,"%3F")}function tf(t){return ef(t).replace(zp,"%2F")}function _s(t){if(t==null)return null;try{return decodeURIComponent(""+t)}catch{}return""+t}const nf=/\/$/,sf=t=>t.replace(nf,"");function la(t,e,n="/"){let s,o={},a="",r="";const i=e.indexOf("#");let l=e.indexOf("?");return l=i>=0&&l>i?-1:l,l>=0&&(s=e.slice(0,l),a=e.slice(l,i>0?i:e.length),o=t(a.slice(1))),i>=0&&(s=s||e.slice(0,i),r=e.slice(i,e.length)),s=lf(s??e,n),{fullPath:s+a+r,path:s,query:o,hash:_s(r)}}function of(t,e){const n=e.query?t(e.query):"";return e.path+(n&&"?")+n+(e.hash||"")}function ii(t,e){return!e||!t.toLowerCase().startsWith(e.toLowerCase())?t:t.slice(e.length)||"/"}function af(t,e,n){const s=e.matched.length-1,o=n.matched.length-1;return s>-1&&s===o&&ns(e.matched[s],n.matched[o])&&wu(e.params,n.params)&&t(e.query)===t(n.query)&&e.hash===n.hash}function ns(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function wu(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(var n in t)if(!rf(t[n],e[n]))return!1;return!0}function rf(t,e){return jt(t)?li(t,e):jt(e)?li(e,t):(t==null?void 0:t.valueOf())===(e==null?void 0:e.valueOf())}function li(t,e){return jt(e)?t.length===e.length&&t.every((n,s)=>n===e[s]):t.length===1&&t[0]===e}function lf(t,e){if(t.startsWith("/"))return t;if(!t)return e;const n=e.split("/"),s=t.split("/"),o=s[s.length-1];(o===".."||o===".")&&s.push("");let a=n.length-1,r,i;for(r=0;r<s.length;r++)if(i=s[r],i!==".")if(i==="..")a>1&&a--;else break;return n.slice(0,a).join("/")+"/"+s.slice(r).join("/")}const bn={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let Ia=function(t){return t.pop="pop",t.push="push",t}({}),ua=function(t){return t.back="back",t.forward="forward",t.unknown="",t}({});function uf(t){if(!t)if(Un){const e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^\w+:\/\/[^\/]+/,"")}else t="/";return t[0]!=="/"&&t[0]!=="#"&&(t="/"+t),sf(t)}const cf=/^[^#]+#/;function df(t,e){return t.replace(cf,"#")+e}function pf(t,e){const n=document.documentElement.getBoundingClientRect(),s=t.getBoundingClientRect();return{behavior:e.behavior,left:s.left-n.left-(e.left||0),top:s.top-n.top-(e.top||0)}}const Fo=()=>({left:window.scrollX,top:window.scrollY});function ff(t){let e;if("el"in t){const n=t.el,s=typeof n=="string"&&n.startsWith("#"),o=typeof n=="string"?s?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!o)return;e=pf(o,t)}else e=t;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function ui(t,e){return(history.state?history.state.position-e:-1)+t}const _a=new Map;function hf(t,e){_a.set(t,e)}function mf(t){const e=_a.get(t);return _a.delete(t),e}function gf(t){return typeof t=="string"||t&&typeof t=="object"}function xu(t){return typeof t=="string"||typeof t=="symbol"}let Be=function(t){return t[t.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",t[t.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",t[t.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",t[t.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",t[t.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",t}({});const ku=Symbol("");Be.MATCHER_NOT_FOUND+"",Be.NAVIGATION_GUARD_REDIRECT+"",Be.NAVIGATION_ABORTED+"",Be.NAVIGATION_CANCELLED+"",Be.NAVIGATION_DUPLICATED+"";function ss(t,e){return Te(new Error,{type:t,[ku]:!0},e)}function Jt(t,e){return t instanceof Error&&ku in t&&(e==null||!!(t.type&e))}const bf=["params","query","hash"];function vf(t){if(typeof t=="string")return t;if(t.path!=null)return t.path;const e={};for(const n of bf)n in t&&(e[n]=t[n]);return JSON.stringify(e,null,2)}function yf(t){const e={};if(t===""||t==="?")return e;const n=(t[0]==="?"?t.slice(1):t).split("&");for(let s=0;s<n.length;++s){const o=n[s].replace(gu," "),a=o.indexOf("="),r=_s(a<0?o:o.slice(0,a)),i=a<0?null:_s(o.slice(a+1));if(r in e){let l=e[r];jt(l)||(l=e[r]=[l]),l.push(i)}else e[r]=i}return e}function ci(t){let e="";for(let n in t){const s=t[n];if(n=Zp(n),s==null){s!==void 0&&(e+=(e.length?"&":"")+n);continue}(jt(s)?s.map(o=>o&&Ra(o)):[s&&Ra(s)]).forEach(o=>{o!==void 0&&(e+=(e.length?"&":"")+n,o!=null&&(e+="="+o))})}return e}function wf(t){const e={};for(const n in t){const s=t[n];s!==void 0&&(e[n]=jt(s)?s.map(o=>o==null?null:""+o):s==null?s:""+s)}return e}const xf=Symbol(""),di=Symbol(""),Vo=Symbol(""),Su=Symbol(""),ja=Symbol("");function ds(){let t=[];function e(s){return t.push(s),()=>{const o=t.indexOf(s);o>-1&&t.splice(o,1)}}function n(){t=[]}return{add:e,list:()=>t.slice(),reset:n}}function wn(t,e,n,s,o,a=r=>r()){const r=s&&(s.enterCallbacks[o]=s.enterCallbacks[o]||[]);return()=>new Promise((i,l)=>{const u=p=>{p===!1?l(ss(Be.NAVIGATION_ABORTED,{from:n,to:e})):p instanceof Error?l(p):gf(p)?l(ss(Be.NAVIGATION_GUARD_REDIRECT,{from:e,to:p})):(r&&s.enterCallbacks[o]===r&&typeof p=="function"&&r.push(p),i())},c=a(()=>t.call(s&&s.instances[o],e,n,u));let d=Promise.resolve(c);t.length<3&&(d=d.then(u)),d.catch(p=>l(p))})}function ca(t,e,n,s,o=a=>a()){const a=[];for(const r of t)for(const i in r.components){let l=r.components[i];if(!(e!=="beforeRouteEnter"&&!r.instances[i]))if(hu(l)){const u=(l.__vccOpts||l)[e];u&&a.push(wn(u,n,s,r,i,o))}else{let u=l();a.push(()=>u.then(c=>{if(!c)throw new Error(`Couldn't resolve component "${i}" at "${r.path}"`);const d=Hp(c)?c.default:c;r.mods[i]=c,r.components[i]=d;const p=(d.__vccOpts||d)[e];return p&&wn(p,n,s,r,i,o)()}))}}return a}function kf(t,e){const n=[],s=[],o=[],a=Math.max(e.matched.length,t.matched.length);for(let r=0;r<a;r++){const i=e.matched[r];i&&(t.matched.find(u=>ns(u,i))?s.push(i):n.push(i));const l=t.matched[r];l&&(e.matched.find(u=>ns(u,l))||o.push(l))}return[n,s,o]}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let Sf=()=>location.protocol+"//"+location.host;function $u(t,e){const{pathname:n,search:s,hash:o}=e,a=t.indexOf("#");if(a>-1){let r=o.includes(t.slice(a))?t.slice(a).length:1,i=o.slice(r);return i[0]!=="/"&&(i="/"+i),ii(i,"")}return ii(n,t)+s+o}function $f(t,e,n,s){let o=[],a=[],r=null;const i=({state:p})=>{const m=$u(t,location),y=n.value,g=e.value;let v=0;if(p){if(n.value=m,e.value=p,r&&r===y){r=null;return}v=g?p.position-g.position:0}else s(m);o.forEach(b=>{b(n.value,y,{delta:v,type:Ia.pop,direction:v?v>0?ua.forward:ua.back:ua.unknown})})};function l(){r=n.value}function u(p){o.push(p);const m=()=>{const y=o.indexOf(p);y>-1&&o.splice(y,1)};return a.push(m),m}function c(){if(document.visibilityState==="hidden"){const{history:p}=window;if(!p.state)return;p.replaceState(Te({},p.state,{scroll:Fo()}),"")}}function d(){for(const p of a)p();a=[],window.removeEventListener("popstate",i),window.removeEventListener("pagehide",c),document.removeEventListener("visibilitychange",c)}return window.addEventListener("popstate",i),window.addEventListener("pagehide",c),document.addEventListener("visibilitychange",c),{pauseListeners:l,listen:u,destroy:d}}function pi(t,e,n,s=!1,o=!1){return{back:t,current:e,forward:n,replaced:s,position:window.history.length,scroll:o?Fo():null}}function Ef(t){const{history:e,location:n}=window,s={value:$u(t,n)},o={value:e.state};o.value||a(s.value,{back:null,current:s.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function a(l,u,c){const d=t.indexOf("#"),p=d>-1?(n.host&&document.querySelector("base")?t:t.slice(d))+l:Sf()+t+l;try{e[c?"replaceState":"pushState"](u,"",p),o.value=u}catch(m){console.error(m),n[c?"replace":"assign"](p)}}function r(l,u){a(l,Te({},e.state,pi(o.value.back,l,o.value.forward,!0),u,{position:o.value.position}),!0),s.value=l}function i(l,u){const c=Te({},o.value,e.state,{forward:l,scroll:Fo()});a(c.current,c,!0),a(l,Te({},pi(s.value,l,null),{position:c.position+1},u),!1),s.value=l}return{location:s,state:o,push:i,replace:r}}function Cf(t){t=uf(t);const e=Ef(t),n=$f(t,e.state,e.location,e.replace);function s(a,r=!0){r||n.pauseListeners(),history.go(a)}const o=Te({location:"",base:t,go:s,createHref:df.bind(null,t)},e,n);return Object.defineProperty(o,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(o,"state",{enumerable:!0,get:()=>e.state.value}),o}function Af(t){return t=location.host?t||location.pathname+location.search:"",t.includes("#")||(t+="#"),Cf(t)}let On=function(t){return t[t.Static=0]="Static",t[t.Param=1]="Param",t[t.Group=2]="Group",t}({});var qe=function(t){return t[t.Static=0]="Static",t[t.Param=1]="Param",t[t.ParamRegExp=2]="ParamRegExp",t[t.ParamRegExpEnd=3]="ParamRegExpEnd",t[t.EscapeNext=4]="EscapeNext",t}(qe||{});const Tf={type:On.Static,value:""},Of=/[a-zA-Z0-9_]/;function Mf(t){if(!t)return[[]];if(t==="/")return[[Tf]];if(!t.startsWith("/"))throw new Error(`Invalid path "${t}"`);function e(m){throw new Error(`ERR (${n})/"${u}": ${m}`)}let n=qe.Static,s=n;const o=[];let a;function r(){a&&o.push(a),a=[]}let i=0,l,u="",c="";function d(){u&&(n===qe.Static?a.push({type:On.Static,value:u}):n===qe.Param||n===qe.ParamRegExp||n===qe.ParamRegExpEnd?(a.length>1&&(l==="*"||l==="+")&&e(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`),a.push({type:On.Param,value:u,regexp:c,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):e("Invalid state to consume buffer"),u="")}function p(){u+=l}for(;i<t.length;){if(l=t[i++],l==="\\"&&n!==qe.ParamRegExp){s=n,n=qe.EscapeNext;continue}switch(n){case qe.Static:l==="/"?(u&&d(),r()):l===":"?(d(),n=qe.Param):p();break;case qe.EscapeNext:p(),n=s;break;case qe.Param:l==="("?n=qe.ParamRegExp:Of.test(l)?p():(d(),n=qe.Static,l!=="*"&&l!=="?"&&l!=="+"&&i--);break;case qe.ParamRegExp:l===")"?c[c.length-1]=="\\"?c=c.slice(0,-1)+l:n=qe.ParamRegExpEnd:c+=l;break;case qe.ParamRegExpEnd:d(),n=qe.Static,l!=="*"&&l!=="?"&&l!=="+"&&i--,c="";break;default:e("Unknown state");break}}return n===qe.ParamRegExp&&e(`Unfinished custom RegExp for param "${u}"`),d(),r(),o}const fi="[^/]+?",Rf={sensitive:!1,strict:!1,start:!0,end:!0};var ct=function(t){return t[t._multiplier=10]="_multiplier",t[t.Root=90]="Root",t[t.Segment=40]="Segment",t[t.SubSegment=30]="SubSegment",t[t.Static=40]="Static",t[t.Dynamic=20]="Dynamic",t[t.BonusCustomRegExp=10]="BonusCustomRegExp",t[t.BonusWildcard=-50]="BonusWildcard",t[t.BonusRepeatable=-20]="BonusRepeatable",t[t.BonusOptional=-8]="BonusOptional",t[t.BonusStrict=.7000000000000001]="BonusStrict",t[t.BonusCaseSensitive=.25]="BonusCaseSensitive",t}(ct||{});const If=/[.+*?^${}()[\]/\\]/g;function _f(t,e){const n=Te({},Rf,e),s=[];let o=n.start?"^":"";const a=[];for(const u of t){const c=u.length?[]:[ct.Root];n.strict&&!u.length&&(o+="/");for(let d=0;d<u.length;d++){const p=u[d];let m=ct.Segment+(n.sensitive?ct.BonusCaseSensitive:0);if(p.type===On.Static)d||(o+="/"),o+=p.value.replace(If,"\\$&"),m+=ct.Static;else if(p.type===On.Param){const{value:y,repeatable:g,optional:v,regexp:b}=p;a.push({name:y,repeatable:g,optional:v});const w=b||fi;if(w!==fi){m+=ct.BonusCustomRegExp;try{`${w}`}catch(T){throw new Error(`Invalid custom RegExp for param "${y}" (${w}): `+T.message)}}let k=g?`((?:${w})(?:/(?:${w}))*)`:`(${w})`;d||(k=v&&u.length<2?`(?:/${k})`:"/"+k),v&&(k+="?"),o+=k,m+=ct.Dynamic,v&&(m+=ct.BonusOptional),g&&(m+=ct.BonusRepeatable),w===".*"&&(m+=ct.BonusWildcard)}c.push(m)}s.push(c)}if(n.strict&&n.end){const u=s.length-1;s[u][s[u].length-1]+=ct.BonusStrict}n.strict||(o+="/?"),n.end?o+="$":n.strict&&!o.endsWith("/")&&(o+="(?:/|$)");const r=new RegExp(o,n.sensitive?"":"i");function i(u){const c=u.match(r),d={};if(!c)return null;for(let p=1;p<c.length;p++){const m=c[p]||"",y=a[p-1];d[y.name]=m&&y.repeatable?m.split("/"):m}return d}function l(u){let c="",d=!1;for(const p of t){(!d||!c.endsWith("/"))&&(c+="/"),d=!1;for(const m of p)if(m.type===On.Static)c+=m.value;else if(m.type===On.Param){const{value:y,repeatable:g,optional:v}=m,b=y in u?u[y]:"";if(jt(b)&&!g)throw new Error(`Provided param "${y}" is an array but it is not repeatable (* or + modifiers)`);const w=jt(b)?b.join("/"):b;if(!w)if(v)p.length<2&&(c.endsWith("/")?c=c.slice(0,-1):d=!0);else throw new Error(`Missing required param "${y}"`);c+=w}}return c||"/"}return{re:r,score:s,keys:a,parse:i,stringify:l}}function jf(t,e){let n=0;for(;n<t.length&&n<e.length;){const s=e[n]-t[n];if(s)return s;n++}return t.length<e.length?t.length===1&&t[0]===ct.Static+ct.Segment?-1:1:t.length>e.length?e.length===1&&e[0]===ct.Static+ct.Segment?1:-1:0}function Eu(t,e){let n=0;const s=t.score,o=e.score;for(;n<s.length&&n<o.length;){const a=jf(s[n],o[n]);if(a)return a;n++}if(Math.abs(o.length-s.length)===1){if(hi(s))return 1;if(hi(o))return-1}return o.length-s.length}function hi(t){const e=t[t.length-1];return t.length>0&&e[e.length-1]<0}const Df={strict:!1,end:!0,sensitive:!1};function Pf(t,e,n){const s=_f(Mf(t.path),n),o=Te(s,{record:t,parent:e,children:[],alias:[]});return e&&!o.record.aliasOf==!e.record.aliasOf&&e.children.push(o),o}function Lf(t,e){const n=[],s=new Map;e=ri(Df,e);function o(d){return s.get(d)}function a(d,p,m){const y=!m,g=gi(d);g.aliasOf=m&&m.record;const v=ri(e,d),b=[g];if("alias"in d){const T=typeof d.alias=="string"?[d.alias]:d.alias;for(const _ of T)b.push(gi(Te({},g,{components:m?m.record.components:g.components,path:_,aliasOf:m?m.record:g})))}let w,k;for(const T of b){const{path:_}=T;if(p&&_[0]!=="/"){const N=p.record.path,G=N[N.length-1]==="/"?"":"/";T.path=p.record.path+(_&&G+_)}if(w=Pf(T,p,v),m?m.alias.push(w):(k=k||w,k!==w&&k.alias.push(w),y&&d.name&&!bi(w)&&r(d.name)),Cu(w)&&l(w),g.children){const N=g.children;for(let G=0;G<N.length;G++)a(N[G],w,m&&m.children[G])}m=m||w}return k?()=>{r(k)}:Ss}function r(d){if(xu(d)){const p=s.get(d);p&&(s.delete(d),n.splice(n.indexOf(p),1),p.children.forEach(r),p.alias.forEach(r))}else{const p=n.indexOf(d);p>-1&&(n.splice(p,1),d.record.name&&s.delete(d.record.name),d.children.forEach(r),d.alias.forEach(r))}}function i(){return n}function l(d){const p=Ff(d,n);n.splice(p,0,d),d.record.name&&!bi(d)&&s.set(d.record.name,d)}function u(d,p){let m,y={},g,v;if("name"in d&&d.name){if(m=s.get(d.name),!m)throw ss(Be.MATCHER_NOT_FOUND,{location:d});v=m.record.name,y=Te(mi(p.params,m.keys.filter(k=>!k.optional).concat(m.parent?m.parent.keys.filter(k=>k.optional):[]).map(k=>k.name)),d.params&&mi(d.params,m.keys.map(k=>k.name))),g=m.stringify(y)}else if(d.path!=null)g=d.path,m=n.find(k=>k.re.test(g)),m&&(y=m.parse(g),v=m.record.name);else{if(m=p.name?s.get(p.name):n.find(k=>k.re.test(p.path)),!m)throw ss(Be.MATCHER_NOT_FOUND,{location:d,currentLocation:p});v=m.record.name,y=Te({},p.params,d.params),g=m.stringify(y)}const b=[];let w=m;for(;w;)b.unshift(w.record),w=w.parent;return{name:v,path:g,params:y,matched:b,meta:Bf(b)}}t.forEach(d=>a(d));function c(){n.length=0,s.clear()}return{addRoute:a,resolve:u,removeRoute:r,clearRoutes:c,getRoutes:i,getRecordMatcher:o}}function mi(t,e){const n={};for(const s of e)s in t&&(n[s]=t[s]);return n}function gi(t){const e={path:t.path,redirect:t.redirect,name:t.name,meta:t.meta||{},aliasOf:t.aliasOf,beforeEnter:t.beforeEnter,props:Nf(t),children:t.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in t?t.components||null:t.component&&{default:t.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function Nf(t){const e={},n=t.props||!1;if("component"in t)e.default=n;else for(const s in t.components)e[s]=typeof n=="object"?n[s]:n;return e}function bi(t){for(;t;){if(t.record.aliasOf)return!0;t=t.parent}return!1}function Bf(t){return t.reduce((e,n)=>Te(e,n.meta),{})}function Ff(t,e){let n=0,s=e.length;for(;n!==s;){const a=n+s>>1;Eu(t,e[a])<0?s=a:n=a+1}const o=Vf(t);return o&&(s=e.lastIndexOf(o,s-1)),s}function Vf(t){let e=t;for(;e=e.parent;)if(Cu(e)&&Eu(t,e)===0)return e}function Cu({record:t}){return!!(t.name||t.components&&Object.keys(t.components).length||t.redirect)}function vi(t){const e=zt(Vo),n=zt(Su),s=E(()=>{const l=f(t.to);return e.resolve(l)}),o=E(()=>{const{matched:l}=s.value,{length:u}=l,c=l[u-1],d=n.matched;if(!c||!d.length)return-1;const p=d.findIndex(ns.bind(null,c));if(p>-1)return p;const m=yi(l[u-2]);return u>1&&yi(c)===m&&d[d.length-1].path!==m?d.findIndex(ns.bind(null,l[u-2])):p}),a=E(()=>o.value>-1&&qf(n.params,s.value.params)),r=E(()=>o.value>-1&&o.value===n.matched.length-1&&wu(n.params,s.value.params));function i(l={}){if(zf(l)){const u=e[f(t.replace)?"replace":"push"](f(t.to)).catch(Ss);return t.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>u),u}return Promise.resolve()}return{route:s,href:E(()=>s.value.href),isActive:a,isExactActive:r,navigate:i}}function Hf(t){return t.length===1?t[0]:t}const Uf=oe({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:vi,setup(t,{slots:e}){const n=Pe(vi(t)),{options:s}=zt(Vo),o=E(()=>({[wi(t.activeClass,s.linkActiveClass,"router-link-active")]:n.isActive,[wi(t.exactActiveClass,s.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const a=e.default&&Hf(e.default(n));return t.custom?a:pu("a",{"aria-current":n.isExactActive?t.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:o.value},a)}}}),js=Uf;function zf(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){const e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function qf(t,e){for(const n in e){const s=e[n],o=t[n];if(typeof s=="string"){if(s!==o)return!1}else if(!jt(o)||o.length!==s.length||s.some((a,r)=>a.valueOf()!==o[r].valueOf()))return!1}return!0}function yi(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}const wi=(t,e,n)=>t??e??n,Kf=oe({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(t,{attrs:e,slots:n}){const s=zt(ja),o=E(()=>t.route||s.value),a=zt(di,0),r=E(()=>{let u=f(a);const{matched:c}=o.value;let d;for(;(d=c[u])&&!d.components;)u++;return u}),i=E(()=>o.value.matched[r.value]);ro(di,E(()=>r.value+1)),ro(xf,i),ro(ja,o);const l=F();return _e(()=>[l.value,i.value,t.name],([u,c,d],[p,m,y])=>{c&&(c.instances[d]=u,m&&m!==c&&u&&u===p&&(c.leaveGuards.size||(c.leaveGuards=m.leaveGuards),c.updateGuards.size||(c.updateGuards=m.updateGuards))),u&&c&&(!m||!ns(c,m)||!p)&&(c.enterCallbacks[d]||[]).forEach(g=>g(u))},{flush:"post"}),()=>{const u=o.value,c=t.name,d=i.value,p=d&&d.components[c];if(!p)return xi(n.default,{Component:p,route:u});const m=d.props[c],y=m?m===!0?u.params:typeof m=="function"?m(u):m:null,v=pu(p,Te({},y,e,{onVnodeUnmounted:b=>{b.component.isUnmounted&&(d.instances[c]=null)},ref:l}));return xi(n.default,{Component:v,route:u})||v}}});function xi(t,e){if(!t)return null;const n=t(e);return n.length===1?n[0]:n}const Au=Kf;function Gf(t){const e=Lf(t.routes,t),n=t.parseQuery||yf,s=t.stringifyQuery||ci,o=t.history,a=ds(),r=ds(),i=ds(),l=ir(bn);let u=bn;Un&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const c=ia.bind(null,H=>""+H),d=ia.bind(null,tf),p=ia.bind(null,_s);function m(H,re){let ne,le;return xu(H)?(ne=e.getRecordMatcher(H),le=re):le=H,e.addRoute(le,ne)}function y(H){const re=e.getRecordMatcher(H);re&&e.removeRoute(re)}function g(){return e.getRoutes().map(H=>H.record)}function v(H){return!!e.getRecordMatcher(H)}function b(H,re){if(re=Te({},re||l.value),typeof H=="string"){const M=la(n,H,re.path),V=e.resolve({path:M.path},re),U=o.createHref(M.fullPath);return Te(M,V,{params:p(V.params),hash:_s(M.hash),redirectedFrom:void 0,href:U})}let ne;if(H.path!=null)ne=Te({},H,{path:la(n,H.path,re.path).path});else{const M=Te({},H.params);for(const V in M)M[V]==null&&delete M[V];ne=Te({},H,{params:d(M)}),re.params=d(re.params)}const le=e.resolve(ne,re),Se=H.hash||"";le.params=c(p(le.params));const S=of(s,Te({},H,{hash:Qp(Se),path:le.path})),$=o.createHref(S);return Te({fullPath:S,hash:Se,query:s===ci?wf(H.query):H.query||{}},le,{redirectedFrom:void 0,href:$})}function w(H){return typeof H=="string"?la(n,H,l.value.path):Te({},H)}function k(H,re){if(u!==H)return ss(Be.NAVIGATION_CANCELLED,{from:re,to:H})}function T(H){return G(H)}function _(H){return T(Te(w(H),{replace:!0}))}function N(H,re){const ne=H.matched[H.matched.length-1];if(ne&&ne.redirect){const{redirect:le}=ne;let Se=typeof le=="function"?le(H,re):le;return typeof Se=="string"&&(Se=Se.includes("?")||Se.includes("#")?Se=w(Se):{path:Se},Se.params={}),Te({query:H.query,hash:H.hash,params:Se.path!=null?{}:H.params},Se)}}function G(H,re){const ne=u=b(H),le=l.value,Se=H.state,S=H.force,$=H.replace===!0,M=N(ne,le);if(M)return G(Te(w(M),{state:typeof M=="object"?Te({},Se,M.state):Se,force:S,replace:$}),re||ne);const V=ne;V.redirectedFrom=re;let U;return!S&&af(s,le,ne)&&(U=ss(Be.NAVIGATION_DUPLICATED,{to:V,from:le}),lt(le,le,!0,!1)),(U?Promise.resolve(U):I(V,le)).catch(B=>Jt(B)?Jt(B,Be.NAVIGATION_GUARD_REDIRECT)?B:ft(B):X(B,V,le)).then(B=>{if(B){if(Jt(B,Be.NAVIGATION_GUARD_REDIRECT))return G(Te({replace:$},w(B.to),{state:typeof B.to=="object"?Te({},Se,B.to.state):Se,force:S}),re||V)}else B=ke(V,le,!0,$,Se);return he(V,le,B),B})}function j(H,re){const ne=k(H,re);return ne?Promise.reject(ne):Promise.resolve()}function P(H){const re=Ae.values().next().value;return re&&typeof re.runWithContext=="function"?re.runWithContext(H):H()}function I(H,re){let ne;const[le,Se,S]=kf(H,re);ne=ca(le.reverse(),"beforeRouteLeave",H,re);for(const M of le)M.leaveGuards.forEach(V=>{ne.push(wn(V,H,re))});const $=j.bind(null,H,re);return ne.push($),tt(ne).then(()=>{ne=[];for(const M of a.list())ne.push(wn(M,H,re));return ne.push($),tt(ne)}).then(()=>{ne=ca(Se,"beforeRouteUpdate",H,re);for(const M of Se)M.updateGuards.forEach(V=>{ne.push(wn(V,H,re))});return ne.push($),tt(ne)}).then(()=>{ne=[];for(const M of S)if(M.beforeEnter)if(jt(M.beforeEnter))for(const V of M.beforeEnter)ne.push(wn(V,H,re));else ne.push(wn(M.beforeEnter,H,re));return ne.push($),tt(ne)}).then(()=>(H.matched.forEach(M=>M.enterCallbacks={}),ne=ca(S,"beforeRouteEnter",H,re,P),ne.push($),tt(ne))).then(()=>{ne=[];for(const M of r.list())ne.push(wn(M,H,re));return ne.push($),tt(ne)}).catch(M=>Jt(M,Be.NAVIGATION_CANCELLED)?M:Promise.reject(M))}function he(H,re,ne){i.list().forEach(le=>P(()=>le(H,re,ne)))}function ke(H,re,ne,le,Se){const S=k(H,re);if(S)return S;const $=re===bn,M=Un?history.state:{};ne&&(le||$?o.replace(H.fullPath,Te({scroll:$&&M&&M.scroll},Se)):o.push(H.fullPath,Se)),l.value=H,lt(H,re,ne,$),ft()}let q;function L(){q||(q=o.listen((H,re,ne)=>{if(!ze.listening)return;const le=b(H),Se=N(le,ze.currentRoute.value);if(Se){G(Te(Se,{replace:!0,force:!0}),le).catch(Ss);return}u=le;const S=l.value;Un&&hf(ui(S.fullPath,ne.delta),Fo()),I(le,S).catch($=>Jt($,Be.NAVIGATION_ABORTED|Be.NAVIGATION_CANCELLED)?$:Jt($,Be.NAVIGATION_GUARD_REDIRECT)?(G(Te(w($.to),{force:!0}),le).then(M=>{Jt(M,Be.NAVIGATION_ABORTED|Be.NAVIGATION_DUPLICATED)&&!ne.delta&&ne.type===Ia.pop&&o.go(-1,!1)}).catch(Ss),Promise.reject()):(ne.delta&&o.go(-ne.delta,!1),X($,le,S))).then($=>{$=$||ke(le,S,!1),$&&(ne.delta&&!Jt($,Be.NAVIGATION_CANCELLED)?o.go(-ne.delta,!1):ne.type===Ia.pop&&Jt($,Be.NAVIGATION_ABORTED|Be.NAVIGATION_DUPLICATED)&&o.go(-1,!1)),he(le,S,$)}).catch(Ss)}))}let z=ds(),ie=ds(),W;function X(H,re,ne){ft(H);const le=ie.list();return le.length?le.forEach(Se=>Se(H,re,ne)):console.error(H),Promise.reject(H)}function we(){return W&&l.value!==bn?Promise.resolve():new Promise((H,re)=>{z.add([H,re])})}function ft(H){return W||(W=!H,L(),z.list().forEach(([re,ne])=>H?ne(H):re()),z.reset()),H}function lt(H,re,ne,le){const{scrollBehavior:Se}=t;if(!Un||!Se)return Promise.resolve();const S=!ne&&mf(ui(H.fullPath,0))||(le||!ne)&&history.state&&history.state.scroll||null;return Vs().then(()=>Se(H,re,S)).then($=>$&&ff($)).catch($=>X($,H,re))}const Y=H=>o.go(H);let pe;const Ae=new Set,ze={currentRoute:l,listening:!0,addRoute:m,removeRoute:y,clearRoutes:e.clearRoutes,hasRoute:v,getRoutes:g,resolve:b,options:t,push:T,replace:_,go:Y,back:()=>Y(-1),forward:()=>Y(1),beforeEach:a.add,beforeResolve:r.add,afterEach:i.add,onError:ie.add,isReady:we,install(H){H.component("RouterLink",js),H.component("RouterView",Au),H.config.globalProperties.$router=ze,Object.defineProperty(H.config.globalProperties,"$route",{enumerable:!0,get:()=>f(l)}),Un&&!pe&&l.value===bn&&(pe=!0,T(o.location).catch(le=>{}));const re={};for(const le in bn)Object.defineProperty(re,le,{get:()=>l.value[le],enumerable:!0});H.provide(Vo,ze),H.provide(Su,Ml(re)),H.provide(ja,l);const ne=H.unmount;Ae.add(H),H.unmount=function(){Ae.delete(H),Ae.size<1&&(u=bn,q&&q(),q=null,l.value=bn,pe=!1,W=!1),ne()}}};function tt(H){return H.reduce((re,ne)=>re.then(()=>P(ne)),Promise.resolve())}return ze}function Wf(){return zt(Vo)}const Ne=(t,e,n,s,o,a,r)=>({array:[...t],comparing:e,swapping:n,sorted:[...s],comparisons:o,swaps:a,done:!1,line:r}),Ct=(t,e,n,s)=>({array:[...t],comparing:[],swapping:[],sorted:t.map((o,a)=>a),comparisons:e,swaps:n,done:!0,line:s});function*Yf(t){const e=[...t],n=e.length,s=new Set;let o=0,a=0;for(let r=0;r<n-1;r++){for(let i=0;i<n-1-r;i++)o++,yield Ne(e,[i,i+1],[],s,o,a,2),e[i]>e[i+1]&&([e[i],e[i+1]]=[e[i+1],e[i]],a++,yield Ne(e,[],[i,i+1],s,o,a,3));s.add(n-1-r)}s.add(0),yield Ct(e,o,a,5)}function*Xf(t){const e=[...t],n=e.length,s=new Set;let o=0,a=0;for(let r=0;r<n;r++){let i=r;for(let l=r+1;l<n;l++)o++,yield Ne(e,[i,l],[],s,o,a,3),e[l]<e[i]&&(i=l);i!==r&&([e[r],e[i]]=[e[i],e[r]],a++,yield Ne(e,[],[r,i],s,o,a,5)),s.add(r)}yield Ct(e,o,a,7)}function*Jf(t){const e=[...t],n=e.length,s=new Set;let o=0,a=0;for(let r=1;r<n;r++){let i=r;for(;i>0&&(o++,yield Ne(e,[i-1,i],[],s,o,a,2),e[i-1]>e[i]);)[e[i-1],e[i]]=[e[i],e[i-1]],a++,yield Ne(e,[],[i-1,i],s,o,a,3),i--}yield Ct(e,o,a,5)}function*Qf(t){const e=[...t],n=new Set;let s=0,o=0;function*a(r,i){if(i-r<=1)return;const l=r+i>>1;yield*a(r,l),yield*a(l,i);const u=[];let c=r,d=l;for(;c<l&&d<i;)s++,yield Ne(e,[c,d],[],n,s,o,5),e[c]<=e[d]?u.push(e[c++]):u.push(e[d++]);for(;c<l;)u.push(e[c++]);for(;d<i;)u.push(e[d++]);for(let p=0;p<u.length;p++)e[r+p]=u[p],o++,yield Ne(e,[],[r+p],n,s,o,7)}yield*a(0,e.length),yield Ct(e,s,o,8)}function*Zf(t){const e=[...t],n=new Set;let s=0,o=0;function*a(r,i){if(r>i)return;if(r===i){n.add(r);return}const l=e[i];let u=r;for(let c=r;c<i;c++)s++,yield Ne(e,[c,i],[],n,s,o,4),e[c]<l&&(u!==c&&([e[u],e[c]]=[e[c],e[u]],o++,yield Ne(e,[],[u,c],n,s,o,5)),u++);u!==i&&([e[u],e[i]]=[e[i],e[u]],o++,yield Ne(e,[],[u,i],n,s,o,6)),n.add(u),yield*a(r,u-1),yield*a(u+1,i)}yield*a(0,e.length-1),yield Ct(e,s,o,8)}function*eh(t){const e=[...t],n=e.length,s=new Set;let o=0,a=0;function*r(i,l){for(;2*i+1<=l;){let u=2*i+1;if(u+1<=l&&(o++,yield Ne(e,[u,u+1],[],s,o,a,2),e[u]<e[u+1]&&u++),o++,yield Ne(e,[i,u],[],s,o,a,3),e[i]<e[u])[e[i],e[u]]=[e[u],e[i]],a++,yield Ne(e,[],[i,u],s,o,a,4),i=u;else return}}for(let i=(n>>1)-1;i>=0;i--)yield*r(i,n-1);for(let i=n-1;i>0;i--)[e[0],e[i]]=[e[i],e[0]],a++,yield Ne(e,[],[0,i],s,o,a,8),s.add(i),yield*r(0,i-1);s.add(0),yield Ct(e,o,a,10)}function*th(t){const e=[...t],n=e.length,s=new Set;let o=0,a=0;for(let r=Math.floor(n/2);r>0;r=Math.floor(r/2))for(let i=r;i<n;i++){let l=i;for(;l>=r&&(o++,yield Ne(e,[l-r,l],[],s,o,a,3),e[l-r]>e[l]);)[e[l-r],e[l]]=[e[l],e[l-r]],a++,yield Ne(e,[],[l-r,l],s,o,a,4),l-=r}yield Ct(e,o,a,6)}const nh=1.3;function*sh(t){const e=[...t],n=e.length,s=new Set;let o=0,a=0,r=n,i=!0;for(;r>1||i;){r=Math.floor(r/nh),r<1&&(r=1),i=!1;for(let l=0;l+r<n;l++)o++,yield Ne(e,[l,l+r],[],s,o,a,5),e[l]>e[l+r]&&([e[l],e[l+r]]=[e[l+r],e[l]],a++,i=!0,yield Ne(e,[],[l,l+r],s,o,a,6))}yield Ct(e,o,a,7)}function*oh(t){const e=[...t],n=e.length,s=new Set,o=0;let a=0;if(n===0){yield Ct(e,o,a,8);return}const r=Math.max(...e),i=new Array(r+1).fill(0);for(let u=0;u<n;u++)yield Ne(e,[u],[],s,o,a,2),i[e[u]]++;for(let u=1;u<=r;u++)i[u]+=i[u-1];const l=new Array(n).fill(0);for(let u=n-1;u>=0;u--){const c=e[u],d=--i[c];l[d]=c,a++,yield Ne(l,[],[d],s,o,a,7)}yield Ct(l,o,a,8)}const Xs=10;function*ah(t){let e=[...t];const n=e.length,s=new Set,o=0;let a=0;if(n===0){yield Ct(e,o,a,11);return}const r=Math.max(...e);for(let i=1;Math.floor(r/i)>0;i*=Xs){const l=d=>Math.floor(d/i)%Xs,u=new Array(Xs).fill(0);for(let d=0;d<n;d++)yield Ne(e,[d],[],s,o,a,4),u[l(e[d])]++;for(let d=1;d<Xs;d++)u[d]+=u[d-1];const c=new Array(n).fill(0);for(let d=n-1;d>=0;d--){const p=--u[l(e[d])];c[p]=e[d],a++,yield Ne(c,[],[p],s,o,a,9)}e=c}yield Ct(e,o,a,11)}const Zn={bubble:{name:"Bubble Sort",generator:Yf,description:"Repeatedly compares adjacent elements and swaps them if out of order, letting the largest values bubble to the end each pass.",complexity:{best:"O(n)",average:"O(n²)",worst:"O(n²)",space:"O(1)"},stable:!0},selection:{name:"Selection Sort",generator:Xf,description:"Scans the unsorted region for the minimum element and swaps it into place, growing a sorted prefix from the front.",complexity:{best:"O(n²)",average:"O(n²)",worst:"O(n²)",space:"O(1)"},stable:!1},insertion:{name:"Insertion Sort",generator:Jf,description:"Builds the sorted array one item at a time by shifting each new element left until it sits in the correct spot.",complexity:{best:"O(n)",average:"O(n²)",worst:"O(n²)",space:"O(1)"},stable:!0},merge:{name:"Merge Sort",generator:Qf,description:"Divides the array in half recursively, sorts each half, then merges the sorted halves back together. Consistent O(n log n).",complexity:{best:"O(n log n)",average:"O(n log n)",worst:"O(n log n)",space:"O(n)"},stable:!0},quick:{name:"Quick Sort",generator:Zf,description:"Partitions the array around a pivot so smaller values sit left and larger right, then recurses into each side. Fast in practice.",complexity:{best:"O(n log n)",average:"O(n log n)",worst:"O(n²)",space:"O(log n)"},stable:!1},heap:{name:"Heap Sort",generator:eh,description:"Builds a max-heap, then repeatedly moves the largest element to the end and re-heapifies the shrinking heap.",complexity:{best:"O(n log n)",average:"O(n log n)",worst:"O(n log n)",space:"O(1)"},stable:!1},shell:{name:"Shell Sort",generator:th,description:"Generalizes insertion sort by comparing and swapping elements far apart first, shrinking the gap each pass until a final gap-1 pass leaves the array sorted.",complexity:{best:"O(n log n)",average:"O(n^1.5)",worst:"O(n²)",space:"O(1)"},stable:!1},comb:{name:"Comb Sort",generator:sh,description:"Improves bubble sort by comparing elements separated by a shrinking gap (÷1.3 each pass) instead of only adjacent ones, clearing small trailing values much faster.",complexity:{best:"O(n log n)",average:"O(n²/2ᵖ)",worst:"O(n²)",space:"O(1)"},stable:!1},counting:{name:"Counting Sort",generator:oh,description:"Counts how many times each value occurs, turns those counts into placement offsets, and drops every element straight into its final slot — no comparisons needed.",complexity:{best:"O(n + k)",average:"O(n + k)",worst:"O(n + k)",space:"O(n + k)"},stable:!0},radix:{name:"Radix Sort",generator:ah,description:"Sorts integers one decimal digit at a time, least significant first, using a stable counting sort per digit until every digit position has been processed.",complexity:{best:"O(d·(n + b))",average:"O(d·(n + b))",worst:"O(d·(n + b))",space:"O(n + b)"},stable:!0}},Ln=(t,e,n,s,o,a,r)=>({array:[...t],low:e,high:n,mid:s,checking:o,target:a,foundIndex:null,comparisons:r,done:!1}),xt=(t,e,n,s)=>({array:[...t],low:null,high:null,mid:null,checking:null,target:e,foundIndex:n,comparisons:s,done:!0});function*rh(t,e){const n=[...t],s=n.length;let o=0;for(let a=0;a<s;a++)if(o++,yield Ln(n,0,s-1,null,a,e,o),n[a]===e){yield xt(n,e,a,o);return}yield xt(n,e,null,o)}function*ih(t,e){const n=[...t];let s=0,o=n.length-1,a=0;for(;s<=o;){const r=Math.floor((s+o)/2);if(a++,yield Ln(n,s,o,r,r,e,a),n[r]===e){yield xt(n,e,r,a);return}n[r]<e?s=r+1:o=r-1}yield xt(n,e,null,a)}function*lh(t,e){const n=[...t],s=n.length;let o=0;if(s===0){yield xt(n,e,null,o);return}const a=Math.max(1,Math.floor(Math.sqrt(s)));let r=0,i=Math.min(a,s)-1;for(;;){if(o++,yield Ln(n,r,i,null,i,e,o),n[i]===e){yield xt(n,e,i,o);return}if(n[i]>e||i===s-1)break;r=i+1,i=Math.min(i+a,s-1)}for(let l=r;l<i;l++)if(o++,yield Ln(n,r,i,null,l,e,o),n[l]===e){yield xt(n,e,l,o);return}yield xt(n,e,null,o)}function*uh(t,e){const n=[...t];let s=0,o=n.length-1,a=0;for(;s<=o&&e>=n[s]&&e<=n[o];){let r;if(n[s]===n[o]?r=s:r=s+Math.floor((e-n[s])*(o-s)/(n[o]-n[s])),a++,yield Ln(n,s,o,r,r,e,a),n[r]===e){yield xt(n,e,r,a);return}n[r]<e?s=r+1:o=r-1}yield xt(n,e,null,a)}function*ch(t,e){const n=[...t],s=n.length;let o=0,a=0,r=1;for(;r<s;){if(o++,yield Ln(n,a,r,null,r,e,o),n[r]===e){yield xt(n,e,r,o);return}if(n[r]>e)break;a=r,r*=2}let i=Math.min(r,s-1);for(;a<=i;){const l=Math.floor((a+i)/2);if(o++,yield Ln(n,a,i,l,l,e,o),n[l]===e){yield xt(n,e,l,o);return}n[l]<e?a=l+1:i=l-1}yield xt(n,e,null,o)}const Ho={linear:{name:"Linear Search",generator:rh,description:"Scans the array from left to right, comparing each element to the target until a match is found or every element has been checked.",complexity:{best:"O(1)",average:"O(n)",worst:"O(n)",space:"O(1)"}},binary:{name:"Binary Search",generator:ih,description:"Repeatedly compares the target to the middle element of a sorted array and discards the half that cannot contain it, halving the search range each step.",complexity:{best:"O(1)",average:"O(log n)",worst:"O(log n)",space:"O(1)"}},jump:{name:"Jump Search",generator:lh,description:"Advances through a sorted array in fixed-size blocks of about √n, testing only the last element of each block, then falls back to a linear scan of the block where the target must lie.",complexity:{best:"O(1)",average:"O(√n)",worst:"O(√n)",space:"O(1)"}},interpolation:{name:"Interpolation Search",generator:uh,description:"Estimates where the target should be by linearly interpolating between the values at the low and high ends of the search range, rather than always probing the midpoint like binary search.",complexity:{best:"O(1)",average:"O(log log n)",worst:"O(n)",space:"O(1)"}},exponential:{name:"Exponential Search",generator:ch,description:"Doubles a bound (1, 2, 4, 8, ...) until it overshoots the target, then binary searches within the range that doubling identified.",complexity:{best:"O(1)",average:"O(log n)",worst:"O(log n)",space:"O(1)"}}},os=(t,e,n)=>({visited:[...t],frontier:[...e],current:n,path:[],done:!1}),We=(t,e)=>({visited:[...t],frontier:[],current:null,path:[...e],done:!0}),as=[[-1,0],[1,0],[0,-1],[0,1]],Xe=(t,e)=>`${t},${e}`;function rs(t){const e=t.length,n=e>0?t[0].length:0,s=(a,r)=>a>=0&&a<e&&r>=0&&r<n;return{rows:e,cols:n,inBounds:s,isOpen:(a,r)=>s(a,r)&&t[a][r]===0}}function Us(t,e){const n=[e];let s=Xe(e.row,e.col);for(;t.has(s);){const o=t.get(s);n.push(o),s=Xe(o.row,o.col)}return n.reverse()}function*dh(t,e,n){const{isOpen:s}=rs(t);if(!s(e.row,e.col)||!s(n.row,n.col)){yield We([],[]);return}const o=new Map,a=new Set([Xe(e.row,e.col)]),r=[],i=[e];for(;i.length>0;){const l=i.shift();if(r.push(l),yield os(r,i,l),l.row===n.row&&l.col===n.col){yield We(r,Us(o,n));return}for(const[u,c]of as){const d=l.row+u,p=l.col+c;if(!s(d,p))continue;const m=Xe(d,p);a.has(m)||(a.add(m),o.set(m,l),i.push({row:d,col:p}))}}yield We(r,[])}function*ph(t,e,n){const{isOpen:s}=rs(t);if(!s(e.row,e.col)||!s(n.row,n.col)){yield We([],[]);return}const o=new Map,a=new Set([Xe(e.row,e.col)]),r=[],i=[e];for(;i.length>0;){const l=i.pop();if(r.push(l),yield os(r,i,l),l.row===n.row&&l.col===n.col){yield We(r,Us(o,n));return}for(const[u,c]of as){const d=l.row+u,p=l.col+c;if(!s(d,p))continue;const m=Xe(d,p);a.has(m)||(a.add(m),o.set(m,l),i.push({row:d,col:p}))}}yield We(r,[])}function*fh(t,e,n){const{isOpen:s}=rs(t);if(!s(e.row,e.col)||!s(n.row,n.col)){yield We([],[]);return}const o=Xe(e.row,e.col),a=new Map([[o,0]]),r=new Map,i=new Set,l=new Map([[o,e]]),u=[];for(;l.size>0;){let c=null,d=null,p=1/0;for(const[m,y]of l){const g=a.get(m);g<p&&(p=g,c=m,d=y)}if(l.delete(c),i.add(c),u.push(d),yield os(u,[...l.values()],d),d.row===n.row&&d.col===n.col){yield We(u,Us(r,n));return}for(const[m,y]of as){const g=d.row+m,v=d.col+y;if(!s(g,v))continue;const b=Xe(g,v);if(i.has(b))continue;const w=p+1;w<(a.get(b)??1/0)&&(a.set(b,w),r.set(b,d),l.set(b,{row:g,col:v}))}}yield We(u,[])}function ki(t,e,n){return Math.abs(t-n.row)+Math.abs(e-n.col)}function*hh(t,e,n){const{isOpen:s}=rs(t);if(!s(e.row,e.col)||!s(n.row,n.col)){yield We([],[]);return}const o=Xe(e.row,e.col),a=new Map([[o,0]]),r=new Map([[o,ki(e.row,e.col,n)]]),i=new Map,l=new Set,u=new Map([[o,e]]),c=[];for(;u.size>0;){let d=null,p=null,m=1/0;for(const[g,v]of u){const b=r.get(g)??1/0;b<m&&(m=b,d=g,p=v)}if(u.delete(d),l.add(d),c.push(p),yield os(c,[...u.values()],p),p.row===n.row&&p.col===n.col){yield We(c,Us(i,n));return}const y=a.get(d);for(const[g,v]of as){const b=p.row+g,w=p.col+v;if(!s(b,w))continue;const k=Xe(b,w);if(l.has(k))continue;const T=y+1;T<(a.get(k)??1/0)&&(a.set(k,T),r.set(k,T+ki(b,w,n)),i.set(k,p),u.set(k,{row:b,col:w}))}}yield We(c,[])}function*mh(t,e,n){const{rows:s,cols:o,isOpen:a}=rs(t);if(!a(e.row,e.col)||!a(n.row,n.col)){yield We([],[]);return}const r=[];for(let c=0;c<s;c++)for(let d=0;d<o;d++)a(c,d)&&r.push({row:c,col:d});const i=new Map([[Xe(e.row,e.col),0]]),l=new Map,u=[e];for(let c=0;c<r.length-1;c++){const d=[];for(const p of r){const m=i.get(Xe(p.row,p.col));if(m!==void 0)for(const[y,g]of as){const v=p.row+y,b=p.col+g;if(!a(v,b))continue;const w=Xe(v,b),k=m+1,T=i.get(w);T!==void 0&&k>=T||(T===void 0&&u.push({row:v,col:b}),i.set(w,k),l.set(w,p),d.push({row:v,col:b}),yield os(u,d,{row:v,col:b}))}}if(d.length===0)break}if(!i.has(Xe(n.row,n.col))){yield We(u,[]);return}yield We(u,Us(l,n))}const gh=600;function*bh(t,e,n){const{rows:s,cols:o,isOpen:a}=rs(t);if(!a(e.row,e.col)||!a(n.row,n.col)){yield We([],[]);return}const r=[],i=new Map;for(let v=0;v<s;v++)for(let b=0;b<o;b++)a(v,b)&&(i.set(Xe(v,b),r.length),r.push({row:v,col:b}));const l=r.length;if(l>gh){yield We([],[]);return}const u=new Float64Array(l*l).fill(1/0),c=new Int32Array(l*l).fill(-1);for(let v=0;v<l;v++){u[v*l+v]=0,c[v*l+v]=v;const{row:b,col:w}=r[v];for(const[k,T]of as){const _=i.get(Xe(b+k,w+T));_!==void 0&&(u[v*l+_]=1,c[v*l+_]=_)}}const d=i.get(Xe(e.row,e.col)),p=i.get(Xe(n.row,n.col)),m=()=>{const v=[];for(let b=0;b<l;b++)u[d*l+b]!==1/0&&v.push(r[b]);return v};for(let v=0;v<l;v++){const b=v*l,w=[];for(let k=0;k<l;k++){const T=k*l,_=u[T+v];if(_!==1/0)for(let N=0;N<l;N++){const G=_+u[b+N];G>=u[T+N]||(u[T+N]=G,c[T+N]=c[T+v],k===d&&w.push(r[N]))}}yield os(m(),[r[v],...w],r[v])}if(c[d*l+p]===-1){yield We(m(),[]);return}const y=[r[d]];let g=d;for(;g!==p;)g=c[g*l+p],y.push(r[g]);yield We(m(),y)}const Uo={bfs:{name:"BFS",generator:dh,description:"Explores the grid ring by ring using a FIFO queue. Guarantees the shortest path on this unweighted grid, since every step costs the same.",complexity:{best:"O(rows×cols)",average:"O(rows×cols)",worst:"O(rows×cols)",space:"O(rows×cols)"}},dfs:{name:"DFS",generator:ph,description:"Dives down one path as far as possible before backtracking. Finds *a* connected path to the goal but does NOT guarantee the shortest one.",complexity:{best:"O(rows×cols)",average:"O(rows×cols)",worst:"O(rows×cols)",space:"O(rows×cols)"}},dijkstra:{name:"Dijkstra",generator:fh,description:"Settles the unvisited cell with the smallest known distance each round (uniform edge weight of 1). This implementation selects that cell with a plain array scan rather than a binary heap, so it is honestly O((rows×cols)²) worst case, not the idealized heap-backed O(E log V).",complexity:{best:"O((rows×cols)²)",average:"O((rows×cols)²)",worst:"O((rows×cols)²)",space:"O(rows×cols)"}},astar:{name:"A*",generator:hh,description:"Like Dijkstra, but prioritizes cells by distance-so-far plus a Manhattan-distance estimate to the goal, so it usually expands far fewer cells. Still selects the next cell via a plain array scan, so the worst case remains O((rows×cols)²), same as this Dijkstra implementation — the heuristic helps in practice, not in the asymptotic bound.",complexity:{best:"O(rows×cols)",average:"O((rows×cols)²)",worst:"O((rows×cols)²)",space:"O(rows×cols)"}},bellmanFord:{name:"Bellman-Ford",generator:mh,description:"Sweeps the entire edge list over and over, letting better distances trickle one hop further per pass, until a whole pass changes nothing. It reaches the same answer as Dijkstra far more slowly and with no priority queue at all — watch the frontier collapse and rebuild to see where one pass ends and the next begins. Unlike the four searches above it never stops early at the goal: it has no way to know a distance is final until the sweeps settle, so it always solves for every reachable cell.",complexity:{best:"O(rows×cols)",average:"O((rows+cols)×rows×cols)",worst:"O((rows×cols)²)",space:"O(rows×cols)"}},floydWarshall:{name:"Floyd-Warshall",generator:bh,description:"The all-pairs algorithm: instead of searching, it fills a full every-cell-to-every-cell distance table by letting each cell in turn act as an intermediate stop. The single amber cell marching through the grid is that pivot; the answer to this particular query is one row of the table, read out at the end. Genuinely cubic — it does roughly 30 million relaxations on this grid to answer a question BFS answers in 375 — and it is here to show that shape, not to compete.",complexity:{best:"O((rows×cols)³)",average:"O((rows×cols)³)",worst:"O((rows×cols)³)",space:"O((rows×cols)²)"}}};function*vh(t,e){const n=[],s=new Set,o=[];if(!t.has(e)){yield{visited:n,frontier:[],current:null,done:!0};return}for(o.push(e),s.add(e);o.length>0;){const a=o.shift();n.push(a);for(const r of t.get(a)??[])s.has(r)||(s.add(r),o.push(r));yield{visited:[...n],frontier:[...o],current:a,done:!1}}yield{visited:[...n],frontier:[],current:null,done:!0}}function*yh(t,e){const n=[],s=new Set,o=[];if(!t.has(e)){yield{visited:n,frontier:[],current:null,done:!0};return}for(o.push(e);o.length>0;){const a=o.pop();if(s.has(a))continue;s.add(a),n.push(a);const r=t.get(a)??[];for(let i=r.length-1;i>=0;i--){const l=r[i];s.has(l)||o.push(l)}yield{visited:[...n],frontier:[...o],current:a,done:!1}}yield{visited:[...n],frontier:[],current:null,done:!0}}function*wh(t,e){const n=[],s=new Set;if(!t.has(e)){yield{visited:n,frontier:[],current:null,done:!0};return}const o=[e,...[...t.keys()].filter(a=>a!==e)];for(const a of o){if(s.has(a))continue;const r=[[a,null]];for(;r.length>0;){const[i,l]=r.pop();if(s.has(i))continue;s.add(i),n.push(i);const u=t.get(i)??[];let c=!1;for(let d=u.length-1;d>=0;d--){const p=u[d];if(!c&&p===l){c=!0;continue}if(s.has(p)){yield{visited:[...n],frontier:[],current:p,done:!0};return}r.push([p,i])}yield{visited:[...n],frontier:r.map(([d])=>d),current:i,done:!1}}}yield{visited:[...n],frontier:[],current:null,done:!0}}function*xh(t,e){const n=[],s=new Set,o=new Map;if(!t.has(e)){yield{visited:n,frontier:[],current:null,done:!0};return}const a=[e,...[...t.keys()].filter(r=>r!==e)];for(const r of a){if(s.has(r))continue;const i=[r];for(s.add(r),o.set(r,0);i.length>0;){const l=i.shift();n.push(l);const u=o.get(l),c=u===0?1:0;for(const d of t.get(l)??[])if(!s.has(d))s.add(d),o.set(d,c),i.push(d);else if(o.get(d)===u){yield{visited:[...n],frontier:[...i],current:d,done:!0};return}yield{visited:[...n],frontier:[...i],current:l,done:!1}}}yield{visited:[...n],frontier:[],current:null,done:!0}}const zo={bfs:{name:"BFS Traversal",generator:vh,description:"Explores the graph level by level from the start node, visiting every neighbor of the current node before moving deeper, using a queue to track the frontier.",complexity:{time:"O(V + E)",space:"O(V)"}},dfs:{name:"DFS Traversal",generator:yh,description:"Explores as far as possible down one branch from the start node before backtracking, using a stack to track nodes still waiting to be explored.",complexity:{time:"O(V + E)",space:"O(V)"}},"cycle-detection":{name:"Cycle Detection",generator:wh,description:"Walks the graph depth-first looking for an edge back to an already-visited node other than the one just arrived from — undirected only, and sweeps every component, not just the one the start node reaches, since a cycle elsewhere still counts.",complexity:{time:"O(V + E)",space:"O(V)"}},"bipartite-check":{name:"Bipartite Check",generator:xh,description:"Attempts to 2-colour the graph breadth-first, alternating colour with every hop; finds no valid colouring exists the moment an edge connects two same-coloured nodes. Checks every component, since one component alone being bipartite says nothing about the rest.",complexity:{time:"O(V + E)",space:"O(V)"}}},_n=1/0,Da=900,kh=2e3;function $o(t,e){const n=t;if(n.kind!==e.kind)return`This algorithm needs a ${n.kind} input.`;const s=n.validate(e);if(s)return s;const{rows:o,cols:a}=n.dims(e),r=o*a;return r>Da?`That table would be ${o} x ${a} = ${r} cells; the limit is ${Da}.`:null}function Tu(t,e){const n=t,s=e.kind===n.kind?e:n.defaults;return{input:s,recurrence:n.recurrence,axes:n.axes(s),dims:n.dims(s),naiveCalls:n.naiveCalls(s),depsOf:(o,a,r)=>n.depsOf(s,o,a,r),generator:()=>n.generator(s)}}function kn(t,e){return{table:Array.from({length:t},()=>new Array(e).fill(null)),path:[],cellsFilled:0}}function mt(t,e,n,s){t.table[e][n]===null&&(t.cellsFilled+=1),t.table[e][n]=s}function kt(t,e){t.path.push({row:e.row,col:e.col})}function Bn(t){return{row:t.row,col:t.col}}function Ou(t){return t.map(e=>[...e])}function Ee(t,e,n,s,o,a){return{table:Ou(t.table),cursor:e,deps:n,chosen:s,explain:o,path:[...t.path],result:null,cellsFilled:t.cellsFilled,done:!1,line:a}}function Sn(t,e,n,s){return{table:Ou(t.table),cursor:null,deps:[],chosen:null,explain:n,path:[...t.path],result:e,cellsFilled:t.cellsFilled,done:!0,line:s}}function Ge(t,e,n,s){return{row:e,col:n,label:s,value:t[e][n]}}function gt(t,e){let n=null;for(const s of t)(n===null||(e==="max"?s.score>n.score:s.score<n.score))&&(n=s);return n}function Nn(t){return t===null?"·":t===_n?"∞":String(t)}function Ye(t){return`dp[${t}]`}function ve(t,e){return`dp[${t}][${e}]`}function is(t,e){return`${t}(${e.map(n=>n.text).join(", ")})`}function Ot(t,e,n){return`${t} = ${e} = ${Nn(n)}`}function cn(t,e,n){return`${t} = ${Nn(e)}  (${n})`}const Pa=Number.MAX_SAFE_INTEGER;function ot(t,e){const n=t+e;return n>=Pa?Pa:n}function Mu(t){return t>=Pa}function Si(t){return Mu(t)?"> 9.0e15":t<1e6?t.toLocaleString():t.toExponential(1)}function Sh(t){if(t<0)return 0;const e=[1,1];for(let n=2;n<=t;n++)e[n]=ot(1,ot(e[n-1],e[n-2]));return e[Math.min(t,e.length-1)]}function $h(t,e){if(e<0)return 0;const n=new Array(e+1).fill(0);n[0]=1;for(let s=1;s<=e;s++){let o=1;for(const a of t)a>0&&a<=s&&(o=ot(o,n[s-a]));n[s]=o}return n[e]}function Eh(t){const e=t.length,n=new Array(e).fill(1);let s=0;for(let o=0;o<e;o++){let a=1;for(let r=0;r<o;r++)t[r]<t[o]&&(a=ot(a,n[r]));n[o]=a,s=ot(s,a)}return s}function Ru(t,e){if(e<0)return 0;let n=new Array(e+1).fill(1);for(const s of t){const o=new Array(e+1).fill(0);for(let a=0;a<=e;a++){let r=ot(1,n[a]);s>=0&&s<=a&&(r=ot(r,n[a-s])),o[a]=r}n=o}return n[e]}function Ch(t,e){const n=t.length,s=e.length;let o=new Array(s+1).fill(1);for(let a=1;a<=n;a++){const r=new Array(s+1).fill(1);for(let i=1;i<=s;i++)r[i]=t[a-1]===e[i-1]?ot(1,o[i-1]):ot(1,ot(o[i],r[i-1]));o=r}return o[s]}function Ah(t,e){const n=t.length,s=e.length;let o=new Array(s+1).fill(1);for(let a=1;a<=n;a++){const r=new Array(s+1).fill(1);for(let i=1;i<=s;i++)t[a-1]===e[i-1]?r[i]=ot(1,o[i-1]):r[i]=ot(1,ot(o[i-1],ot(o[i],r[i-1])));o=r}return o[s]}function Th(t){if(t<=0)return 0;const e=Array.from({length:t},()=>new Array(t).fill(1));for(let n=2;n<=t;n++)for(let s=0;s+n-1<t;s++){const o=s+n-1;let a=1;for(let r=s;r<o;r++)a=ot(a,ot(e[s][r],e[r+1][o]));e[s][o]=a}return e[0][t-1]}function Iu(t,e){if(t<2)return[];const n=Ge(e,0,t-1,"f(k-1)"),s=Ge(e,0,t-2,"f(k-2)");return[{deps:[n],score:n.value??0,text:`${Ye(t-1)}=${n.value??0}`},{deps:[s],score:s.value??0,text:`${Ye(t-2)}=${s.value??0}`}]}function Oh(t,e,n,s){return Iu(n,s).flatMap(o=>o.deps)}function*Mh(t){const e=t.n,n=kn(1,e+1);for(let a=0;a<=e;a++){if(a<2){mt(n,0,a,a);const d={row:0,col:a},p=cn(Ye(a),a,"base case");yield Ee(n,d,[],null,p,0);continue}const r=Iu(a,n.table),i=r.flatMap(d=>d.deps),l=r[0].score+r[1].score;mt(n,0,a,l);const u={row:0,col:a},c=Ot(Ye(a),r.map(d=>d.text).join(" + "),l);yield Ee(n,u,i,null,c,1)}for(let a=e;a>=0;a--){kt(n,{row:0,col:a});const r=`${Ye(a)} = ${n.table[0][a]} contributed to every later cell`;yield Ee(n,null,[],null,r,2)}const s=n.table[0][e]??0,o=`fib(${e}) = ${s}`;yield Sn(n,o,`${Ye(e)} = ${s}`,3)}const Rh={kind:"scalar",defaults:{kind:"scalar",n:12},recurrence:"dp[k] = dp[k-1] + dp[k-2]",axes:t=>({rowHeaders:["fib(k)"],colHeaders:Array.from({length:t.n+1},(e,n)=>String(n)),rowTitle:"",colTitle:"k"}),dims:t=>({rows:1,cols:t.n+1,fillable:t.n+1}),validate:t=>Number.isInteger(t.n)&&t.n>=0&&t.n<=40?null:"n must be a whole number from 0 to 40.",depsOf:Oh,generator:Mh,naiveCalls:t=>Sh(t.n)};function La(t,e,n){if(e===0)return[];const s=[];for(const o of t.coins){if(o>e)continue;const a=Ge(n,0,e-o,`coin ${o}`),r=a.value??_n,i=r===_n?_n:r+1;s.push({deps:[a],score:i,text:`1+${Ye(e-o)}=${Nn(i)}`})}return s}function Ih(t,e,n,s){return La(t,n,s).flatMap(o=>o.deps)}function*_h(t){const{amount:e}=t,n=kn(1,e+1);mt(n,0,0,0),yield Ee(n,{row:0,col:0},[],null,cn(Ye(0),0,"zero coins make 0"),0);for(let l=1;l<=e;l++){const u=La(t,l,n.table),c=u.flatMap(v=>v.deps),d=gt(u,"min"),p=d===null?_n:d.score;mt(n,0,l,p);const m={row:0,col:l},y=d!==null&&p!==_n?Bn(d.deps[0]):null,g=u.length===0?cn(Ye(l),p,"no coin is small enough"):Ot(Ye(l),is("min",u),p);yield Ee(n,m,c,y,g,2)}const s=[];let o=e;const a=n.table[0][e]!==_n;if(a){kt(n,{row:0,col:o});const l=`start at ${Ye(o)} = ${Nn(n.table[0][o])}`;for(yield Ee(n,null,[],null,l,3);o>0;){const u=gt(La(t,o,n.table),"min");if(u===null)break;const c=u.deps[0].col,d=o-c;s.push(d),o=c,kt(n,{row:0,col:o});const p=`take coin ${d} — ${Ye(o+d)} came from ${Ye(o)}`;yield Ee(n,null,[],null,p,3)}}const r=n.table[0][e],i=a?`${s.join(" + ")} = ${e}  (${s.length} coin${s.length===1?"":"s"})`:`no combination of {${t.coins.join(", ")}} makes ${e}`;yield Sn(n,i,`${Ye(e)} = ${Nn(r)}`,4)}const jh={kind:"coins",defaults:{kind:"coins",coins:[1,3,4],amount:11},recurrence:"dp[a] = 1 + min(dp[a - c]) over coins c <= a",axes:t=>({rowHeaders:["min coins"],colHeaders:Array.from({length:t.amount+1},(e,n)=>String(n)),rowTitle:"",colTitle:"amount"}),dims:t=>({rows:1,cols:t.amount+1,fillable:t.amount+1}),validate:t=>t.coins.length===0?"Enter at least one coin.":t.coins.some(e=>!Number.isInteger(e)||e<1)?"Coin values must be whole numbers of at least 1.":new Set(t.coins).size!==t.coins.length?"Coin values must be distinct.":!Number.isInteger(t.amount)||t.amount<0?"Amount must be 0 or more.":null,depsOf:Ih,generator:_h,naiveCalls:t=>$h(t.coins,t.amount)};function Na(t,e,n){const s=t.values,o=[];for(let a=0;a<e;a++){if(s[a]>=s[e])continue;const r=Ge(n,0,a,`a[${a}]=${s[a]}`);o.push({deps:[r],score:(r.value??0)+1,text:`${Ye(a)}=${r.value??0}`})}return o}function Dh(t,e,n,s){return Na(t,n,s).flatMap(o=>o.deps)}function*Ph(t){const e=t.values,n=e.length,s=kn(1,n);for(let c=0;c<n;c++){const d=Na(t,c,s.table),p=d.flatMap(v=>v.deps),m=gt(d,"max"),y=m===null?1:m.score;mt(s,0,c,y);const g={row:0,col:c};if(m===null){const v=cn(Ye(c),1,`nothing to the left is smaller than ${e[c]}`);yield Ee(s,g,p,null,v,0)}else{const v=`1 + ${is("max",d)}`,b=Ot(Ye(c),v,y);yield Ee(s,g,p,Bn(m.deps[0]),b,2)}}let o=-1;for(let c=0;c<n;c++)(o===-1||(s.table[0][c]??0)>(s.table[0][o]??0))&&(o=c);const a=[];let r=o;for(;r>=0;){a.push(r),kt(s,{row:0,col:r});const c=`a[${r}]=${e[r]} is in the subsequence (${Ye(r)}=${s.table[0][r]})`;yield Ee(s,null,[],null,c,3);const d=gt(Na(t,r,s.table),"max");r=d===null?-1:d.deps[0].col}a.reverse();const i=o===-1?0:s.table[0][o]??0,l=a.map(c=>e[c]).join(", "),u=o===-1?"the sequence is empty":`[${l}]  (length ${i})`;yield Sn(s,u,`longest increasing subsequence has length ${i}`,4)}const Lh={kind:"sequence",defaults:{kind:"sequence",values:[3,10,2,1,20,4,6,21,5]},recurrence:"dp[i] = 1 + max(dp[j]) over j < i with a[j] < a[i]",axes:t=>({rowHeaders:["LIS ending here"],colHeaders:t.values.map(String),rowTitle:"",colTitle:"a[i]"}),dims:t=>({rows:1,cols:t.values.length,fillable:t.values.length}),validate:t=>t.values.length===0?"Enter at least one number.":t.values.length>40?"Enter at most 40 numbers.":null,depsOf:Dh,generator:Ph,naiveCalls:t=>Eh(t.values)};function Ba(t,e,n,s){if(e===0)return[];const o=t.items[e-1],a=Ge(s,e-1,n,"skip"),r=[{deps:[a],score:a.value??0,text:`${ve(e-1,n)}=${a.value??0}`}];if(o.weight<=n){const i=Ge(s,e-1,n-o.weight,"take"),l=(i.value??0)+o.value,u=ve(e-1,n-o.weight);r.push({deps:[i],score:l,text:`${o.value}+${u}=${l}`})}return r}function Nh(t,e,n,s){return Ba(t,e,n,s).flatMap(o=>o.deps)}function*Bh(t){const{items:e,capacity:n}=t,s=e.length+1,o=kn(s,n+1);for(let p=0;p<=n;p++){mt(o,0,p,0);const m={row:0,col:p},y=cn(ve(0,p),0,"no items to choose from");yield Ee(o,m,[],null,y,0)}for(let p=1;p<s;p++)for(let m=0;m<=n;m++){const y=Ba(t,p,m,o.table),g=y.flatMap(_=>_.deps),v=gt(y,"max"),b=v===null?0:v.score;mt(o,p,m,b);const w={row:p,col:m},k=v===null?null:Bn(v.deps[0]),T=Ot(ve(p,m),is("max",y),b);yield Ee(o,w,g,k,T,4)}const a=[];let r=s-1,i=n;for(kt(o,{row:r,col:i}),yield Ee(o,null,[],null,`start at ${ve(r,i)} = ${o.table[r][i]}`,5);r>0;){const p=gt(Ba(t,r,i,o.table),"max");if(p===null)break;const m=p.deps[0],y=m.label==="take";y&&a.push(r);const g=e[r-1],v=y?`take item #${r} (w=${g.weight}, v=${g.value}) — drop to ${ve(m.row,m.col)}`:`skip item #${r} — ${ve(r,i)} equals ${ve(m.row,m.col)}`;r=m.row,i=m.col,kt(o,{row:r,col:i}),yield Ee(o,null,[],null,v,5)}a.reverse();const l=a.reduce((p,m)=>p+e[m-1].weight,0),u=o.table[s-1][n]??0,c=a.map(p=>`#${p}`).join(", "),d=a.length?`take {${c}} — weight ${l}/${n}, value ${u}`:`take nothing — no item fits in ${n}`;yield Sn(o,d,`${ve(s-1,n)} = ${u}`,6)}const Fh={kind:"items",defaults:{kind:"items",items:[{weight:2,value:3},{weight:3,value:4},{weight:4,value:5},{weight:5,value:8}],capacity:9},recurrence:"dp[i][c] = max(dp[i-1][c], v_i + dp[i-1][c - w_i])",axes:t=>({rowHeaders:["—",...t.items.map((e,n)=>`#${n+1} w${e.weight} v${e.value}`)],colHeaders:Array.from({length:t.capacity+1},(e,n)=>String(n)),rowTitle:"items",colTitle:"capacity"}),dims:t=>{const e=t.items.length+1,n=t.capacity+1;return{rows:e,cols:n,fillable:e*n}},validate:t=>_u(t,"capacity"),depsOf:Nh,generator:Bh,naiveCalls:t=>Ru(t.items.map(e=>e.weight),t.capacity)};function _u(t,e){return t.items.length===0?"Enter at least one item.":t.items.some(n=>!Number.isInteger(n.weight)||n.weight<1)?"Item weights must be whole numbers of at least 1.":t.items.some(n=>!Number.isInteger(n.value)||n.value<0)?"Item values must be whole numbers of 0 or more.":!Number.isInteger(t.capacity)||t.capacity<0?`The ${e} must be 0 or more.`:null}function Fa(t,e,n,s){if(e===0)return[];const o=t.items[e-1],a=Ge(s,e-1,n,"skip"),r=[{deps:[a],score:a.value??0,text:`${ve(e-1,n)}=${a.value??0}`}];if(o.weight<=n){const i=Ge(s,e-1,n-o.weight,"take"),l=i.value??0;r.push({deps:[i],score:l,text:`${ve(e-1,n-o.weight)}=${l}`})}return r}function Vh(t,e,n,s){return Fa(t,e,n,s).flatMap(o=>o.deps)}function*Hh(t){const{items:e,capacity:n}=t,s=e.length+1,o=kn(s,n+1);for(let d=0;d<=n;d++){const p=d===0?1:0;mt(o,0,d,p);const m={row:0,col:d},y=cn(ve(0,d),p,d===0?"the empty set sums to 0":"no items yet");yield Ee(o,m,[],null,y,0)}for(let d=1;d<s;d++)for(let p=0;p<=n;p++){const m=Fa(t,d,p,o.table),y=m.flatMap(_=>_.deps),g=gt(m,"max"),v=g===null?0:g.score;mt(o,d,p,v);const b={row:d,col:p},w=v===1&&g!==null?Bn(g.deps[0]):null,k=m.map(_=>_.text).join(" or "),T=Ot(ve(d,p),k,v);yield Ee(o,b,y,w,T,4)}const a=o.table[s-1][n]===1,r=[];let i=s-1,l=n;if(a)for(kt(o,{row:i,col:l}),yield Ee(o,null,[],null,`start at ${ve(i,l)} = 1`,5);i>0;){const d=gt(Fa(t,i,l,o.table),"max");if(d===null||d.score!==1)break;const p=d.deps[0],m=p.label==="take";m&&r.push(i);const y=e[i-1],g=m?`take item #${i} (w=${y.weight}) — drop to ${ve(p.row,p.col)}`:`skip item #${i} — ${ve(p.row,p.col)} is already 1`;i=p.row,l=p.col,kt(o,{row:i,col:l}),yield Ee(o,null,[],null,g,5)}r.reverse();const u=r.map(d=>e[d-1].weight),c=a?`{${u.join(", ")}} sums to ${n}`:`no subset of {${e.map(d=>d.weight).join(", ")}} sums to ${n}`;yield Sn(o,c,`${ve(s-1,n)} = ${a?1:0}`,6)}const Uh={kind:"items",defaults:{kind:"items",items:[{weight:3,value:0},{weight:34,value:0},{weight:4,value:0},{weight:12,value:0},{weight:5,value:0},{weight:2,value:0}],capacity:9},recurrence:"dp[i][t] = dp[i-1][t] OR dp[i-1][t - w_i]",axes:t=>({rowHeaders:["—",...t.items.map((e,n)=>`#${n+1} w${e.weight}`)],colHeaders:Array.from({length:t.capacity+1},(e,n)=>String(n)),rowTitle:"items",colTitle:"target"}),dims:t=>{const e=t.items.length+1,n=t.capacity+1;return{rows:e,cols:n,fillable:e*n}},validate:t=>_u(t,"target"),depsOf:Vh,generator:Hh,naiveCalls:t=>Ru(t.items.map(e=>e.weight),t.capacity)};function Va(t,e,n,s){if(e===0||n===0)return[];if(t.a[e-1]===t.b[n-1]){const r=Ge(s,e-1,n-1,"match"),i=(r.value??0)+1;return[{deps:[r],score:i,text:`1+${ve(e-1,n-1)}=${i}`}]}const o=Ge(s,e-1,n,"drop from a"),a=Ge(s,e,n-1,"drop from b");return[{deps:[o],score:o.value??0,text:`${ve(e-1,n)}=${o.value??0}`},{deps:[a],score:a.value??0,text:`${ve(e,n-1)}=${a.value??0}`}]}function zh(t,e,n,s){return Va(t,e,n,s).flatMap(o=>o.deps)}function*qh(t){const{a:e,b:n}=t,s=e.length+1,o=n.length+1,a=kn(s,o);for(let p=0;p<s;p++)for(let m=0;m<o;m++){if(p===0||m===0){mt(a,p,m,0);const T={row:p,col:m},_=cn(ve(p,m),0,"one side is empty");yield Ee(a,T,[],null,_,0);continue}const y=Va(t,p,m,a.table),g=y.flatMap(T=>T.deps),v=gt(y,"max"),b=v===null?0:v.score;mt(a,p,m,b);const w={row:p,col:m},k=v===null?null:Bn(v.deps[0]);if(e[p-1]===n[m-1]){const T=Ot(ve(p,m),y[0].text,b);yield Ee(a,w,g,k,T,2)}else{const T=Ot(ve(p,m),is("max",y),b);yield Ee(a,w,g,k,T,3)}}const r=[];let i=s-1,l=o-1;for(kt(a,{row:i,col:l}),yield Ee(a,null,[],null,`start at ${ve(i,l)} = ${a.table[i][l]}`,4);i>0&&l>0;){const p=gt(Va(t,i,l,a.table),"max");if(p===null)break;const m=p.deps[0],y=m.label==="match";y&&r.push(e[i-1]);const g=y?`'${e[i-1]}' matches — take it and step diagonally to ${ve(m.row,m.col)}`:`${m.label} — ${ve(i,l)} inherits ${ve(m.row,m.col)}`;i=m.row,l=m.col,kt(a,{row:i,col:l}),yield Ee(a,null,[],null,g,4)}r.reverse();const u=a.table[s-1][o-1]??0,c=r.join(""),d=u===0?"no common subsequence":`"${c}"  (length ${u})`;yield Sn(a,d,`${ve(s-1,o-1)} = ${u}`,5)}function ju(t){return t.a.length===0||t.b.length===0?"Both strings need at least one character.":t.a.length>28||t.b.length>28?"Each string may be at most 28 characters.":/\s/.test(t.a)||/\s/.test(t.b)?"Whitespace is not allowed.":null}const Kh={kind:"strings2",defaults:{kind:"strings2",a:"AGGTAB",b:"GXTXAYB"},recurrence:"dp[i][j] = match ? 1 + dp[i-1][j-1] : max(dp[i-1][j], dp[i][j-1])",axes:t=>({rowHeaders:["ε",...t.a.split("")],colHeaders:["ε",...t.b.split("")],rowTitle:"a",colTitle:"b"}),dims:t=>{const e=t.a.length+1,n=t.b.length+1;return{rows:e,cols:n,fillable:e*n}},validate:ju,depsOf:zh,generator:qh,naiveCalls:t=>Ch(t.a,t.b)};function Ha(t,e,n,s){if(e===0&&n===0)return[];if(n===0){const i=Ge(s,e-1,0,"delete"),l=(i.value??0)+1;return[{deps:[i],score:l,text:`1+${ve(e-1,0)}=${l}`}]}if(e===0){const i=Ge(s,0,n-1,"insert"),l=(i.value??0)+1;return[{deps:[i],score:l,text:`1+${ve(0,n-1)}=${l}`}]}if(t.a[e-1]===t.b[n-1]){const i=Ge(s,e-1,n-1,"match"),l=i.value??0;return[{deps:[i],score:l,text:`${ve(e-1,n-1)}=${l}`}]}const o=Ge(s,e-1,n-1,"substitute"),a=Ge(s,e-1,n,"delete"),r=Ge(s,e,n-1,"insert");return[{deps:[o],score:(o.value??0)+1,text:`1+${ve(e-1,n-1)}=${(o.value??0)+1}`},{deps:[a],score:(a.value??0)+1,text:`1+${ve(e-1,n)}=${(a.value??0)+1}`},{deps:[r],score:(r.value??0)+1,text:`1+${ve(e,n-1)}=${(r.value??0)+1}`}]}function Gh(t,e,n,s){return Ha(t,e,n,s).flatMap(o=>o.deps)}function Wh(t,e,n){return t==="match"?`keep '${e}'`:t==="substitute"?`sub '${e}'→'${n}'`:t==="delete"?`del '${e}'`:`ins '${n}'`}function*Yh(t){const{a:e,b:n}=t,s=e.length+1,o=n.length+1,a=kn(s,o);for(let p=0;p<s;p++)for(let m=0;m<o;m++){const y=Ha(t,p,m,a.table),g=y.flatMap(T=>T.deps),v=gt(y,"min"),b=v===null?0:v.score;mt(a,p,m,b);const w={row:p,col:m},k=v===null?null:Bn(v.deps[0]);if(p===0&&m===0){const T=cn(ve(0,0),0,"both prefixes are empty");yield Ee(a,w,g,null,T,0)}else if(p===0||m===0){const T=p===0?"insertions":"deletions",_=Ot(ve(p,m),`${y[0].text}`,b)+`  (${T} only)`;yield Ee(a,w,g,k,_,0)}else if(e[p-1]===n[m-1]){const T=Ot(ve(p,m),y[0].text,b)+`  ('${e[p-1]}' matches)`;yield Ee(a,w,g,k,T,2)}else{const T=Ot(ve(p,m),is("min",y),b);yield Ee(a,w,g,k,T,3)}}const r=[];let i=s-1,l=o-1;for(kt(a,{row:i,col:l}),yield Ee(a,null,[],null,`start at ${ve(i,l)} = ${a.table[i][l]}`,4);i>0||l>0;){const p=gt(Ha(t,i,l,a.table),"min");if(p===null)break;const m=p.deps[0],y=i>0?e[i-1]:"",g=l>0?n[l-1]:"",v=Wh(m.label,y,g);r.push(v),i=m.row,l=m.col,kt(a,{row:i,col:l}),yield Ee(a,null,[],null,`${v} — step to ${ve(i,l)}`,4)}r.reverse();const u=a.table[s-1][o-1]??0,c=r.filter(p=>!p.startsWith("keep")),d=u===0?"already identical — 0 edits":`${c.join(", ")}  (${u} edits)`;yield Sn(a,d,`${ve(s-1,o-1)} = ${u}`,5)}const Xh={kind:"strings2",defaults:{kind:"strings2",a:"kitten",b:"sitting"},recurrence:"dp[i][j] = match ? dp[i-1][j-1] : 1 + min(sub, del, ins)",axes:t=>({rowHeaders:["ε",...t.a.split("")],colHeaders:["ε",...t.b.split("")],rowTitle:"a",colTitle:"b"}),dims:t=>{const e=t.a.length+1,n=t.b.length+1;return{rows:e,cols:n,fillable:e*n}},validate:ju,depsOf:Gh,generator:Yh,naiveCalls:t=>Ah(t.a,t.b)};function br(t,e,n,s){if(e>=n)return[];const o=t.dims,a=[];for(let r=e;r<n;r++){const i=Ge(s,e,r,`split at k=${r}`),l=Ge(s,r+1,n,`split at k=${r}`),u=o[e]*o[r+1]*o[n+1],c=(i.value??0)+(l.value??0)+u;a.push({deps:[i,l],score:c,text:`k=${r}:${c}`})}return a}function Jh(t,e,n,s){return br(t,e,n,s).flatMap(o=>o.deps)}function*Ua(t,e,n,s){if(kt(e,{row:n,col:s}),n===s){const u=`A${n+1}`;return yield Ee(e,null,[],null,`${u} on its own costs nothing`,4),u}const o=gt(br(t,n,s,e.table),"min");if(o===null)return`A${n+1}..A${s+1}`;const a=o.deps[0].col,r=`split A${n+1}..A${s+1} after A${a+1} — cost ${o.score}`;yield Ee(e,null,[],null,r,4);const i=yield*Ua(t,e,n,a),l=yield*Ua(t,e,a+1,s);return`(${i}${l})`}function*Qh(t){const n=t.dims.length-1,s=kn(n,n);for(let i=0;i<n;i++){mt(s,i,i,0);const l={row:i,col:i},u=cn(ve(i,i),0,`A${i+1} alone needs no multiplication`);yield Ee(s,l,[],null,u,0)}for(let i=2;i<=n;i++)for(let l=0;l+i-1<n;l++){const u=l+i-1,c=br(t,l,u,s.table),d=c.flatMap(b=>b.deps),p=gt(c,"min"),m=p===null?0:p.score;mt(s,l,u,m);const y={row:l,col:u},g=p===null?null:Bn(p.deps[0]),v=Ot(ve(l,u),is("min",c),m);yield Ee(s,y,d,g,v,2)}const o=yield*Ua(t,s,0,n-1),a=s.table[0][n-1]??0,r=`${o} — ${a.toLocaleString()} scalar multiplications`;yield Sn(s,r,`${ve(0,n-1)} = ${a}`,5)}const Zh={kind:"chain",defaults:{kind:"chain",dims:[40,20,30,10,30]},recurrence:"dp[i][j] = min over k of dp[i][k] + dp[k+1][j] + d[i]*d[k+1]*d[j+1]",axes:t=>{const e=Math.max(0,t.dims.length-1),n=Array.from({length:e},(s,o)=>`A${o+1}`);return{rowHeaders:n,colHeaders:n,rowTitle:"i",colTitle:"j"}},dims:t=>{const e=Math.max(0,t.dims.length-1);return{rows:e,cols:e,fillable:e*(e+1)/2}},validate:t=>t.dims.length<2?"Enter at least two dimensions (one matrix).":t.dims.some(e=>!Number.isInteger(e)||e<1)?"Dimensions must be whole numbers of at least 1.":t.dims.length>31?"Enter at most 31 dimensions (30 matrices).":null,depsOf:Jh,generator:Qh,naiveCalls:t=>Th(Math.max(0,t.dims.length-1))},Ht={fib:{...Rh,name:"Fibonacci",description:"Fills one row left to right, each cell the sum of the two before it. The smallest example of the whole idea: 40 cells replace 331 million recursive calls.",complexity:{time:"O(n)",space:"O(n)"}},"coin-change":{...jh,name:"Coin Change",description:"Fewest coins that make each amount from 0 upwards, each cell taking the best of one more coin on top of a smaller amount. Amounts no combination can reach stay at infinity.",complexity:{time:"O(amount × coins)",space:"O(amount)"}},lis:{...Lh,name:"Longest Increasing Subsequence",description:"Each cell holds the longest increasing run ending at that element, extending the best smaller element to its left. The answer is the largest cell, not the last one.",complexity:{time:"O(n²)",space:"O(n)"}},knapsack:{...Fh,name:"0/1 Knapsack",description:"One row per item, one column per capacity. Each cell chooses between skipping the item and taking it, and the traceback reads those choices straight back out of the table.",complexity:{time:"O(n × capacity)",space:"O(n × capacity)"}},"subset-sum":{...Uh,name:"Subset Sum",description:"Knapsack’s table answering a yes/no question instead: can any subset hit the target exactly? Same shape, same traversal, OR in place of max.",complexity:{time:"O(n × target)",space:"O(n × target)"}},lcs:{...Kh,name:"Longest Common Subsequence",description:"A grid of two strings. Matching characters extend the diagonal by one; mismatches take the better of dropping a character from either side.",complexity:{time:"O(m × n)",space:"O(m × n)"}},"edit-distance":{...Xh,name:"Edit Distance",description:"Fewest insert/delete/substitute operations turning one string into the other. Same grid as LCS, but a mismatch forks three ways instead of two.",complexity:{time:"O(m × n)",space:"O(m × n)"}},"matrix-chain":{...Zh,name:"Matrix Chain",description:"Where to put the parentheses so a chain of matrix products costs the least. Fills along diagonals rather than row by row, because a cell needs every shorter sub-chain first.",complexity:{time:"O(n³)",space:"O(n²)"}}};class vr{constructor(e){Wt(this,"n");Wt(this,"parents");Wt(this,"ranks");Wt(this,"sizes");Wt(this,"findCount",0);Wt(this,"unionCount",0);Wt(this,"compressionCount",0);Wt(this,"componentCount");this.n=Math.max(0,Math.floor(e)),this.parents=Array.from({length:this.n},(n,s)=>s),this.ranks=new Array(this.n).fill(0),this.sizes=new Array(this.n).fill(1),this.componentCount=this.n}get components(){return this.componentCount}get finds(){return this.findCount}get unions(){return this.unionCount}get compressions(){return this.compressionCount}isRoot(e){return this.parents[e]===e}rankOf(e){return this.ranks[e]}sizeOf(e){return this.sizes[e]}pathTo(e){const n=[e];let s=e;for(;this.parents[s]!==s;)s=this.parents[s],n.push(s);return n}completeFind(e){if(this.findCount+=1,e.length===0)return[];const n=e[e.length-1],s=[];for(const o of e)o!==n&&this.parents[o]!==n&&(this.parents[o]=n,s.push(o));return this.compressionCount+=s.length,s}find(e){const n=this.pathTo(e);return this.completeFind(n),n[n.length-1]}rootOf(e){let n=e;for(;this.parents[n]!==n;)n=this.parents[n];return n}link(e,n){if(e===n)return!1;let s=e,o=n;return this.ranks[s]<this.ranks[o]&&([s,o]=[o,s]),this.parents[o]=s,this.sizes[s]+=this.sizes[o],this.ranks[s]===this.ranks[o]&&(this.ranks[s]+=1),this.unionCount+=1,this.componentCount-=1,!0}union(e,n){return this.link(this.find(e),this.find(n))}connected(e,n){return this.find(e)===this.find(n)}isConnected(e,n){return this.rootOf(e)===this.rootOf(n)}maxDepth(){const e=new Array(this.n).fill(-1);let n=0;for(let s=0;s<this.n;s++){const o=[];let a=s;for(;e[a]===-1&&this.parents[a]!==a;)o.push(a),a=this.parents[a];e[a]===-1&&(e[a]=0);let r=e[a];for(;o.length>0;)r+=1,e[o.pop()]=r;r>n&&(n=r)}return n}snapshot(e=[],n=[]){return{parent:[...this.parents],rank:[...this.ranks],setSize:[...this.sizes],findPath:[...e],compressed:[...n],finds:this.findCount,unions:this.unionCount,compressions:this.compressionCount,maxDepth:this.maxDepth()}}}const em=1;function Eo(t){return t.weight??em}function za(t,e){const n=Eo(t)-Eo(e);return n!==0?n:t.id.localeCompare(e.id)}function Du(t){return new Map(t.map((e,n)=>[e.id,n]))}function Pu(t){return t.map(e=>e.label)}function tm(t,e,n){return t===n?e:t}const Le=Object.freeze([]),Qt=(t,e,n,s,o,a,r)=>({kind:"dsu",forest:t.snapshot(o,a),op:e,active:n,explain:s,done:!1,line:r}),nm=(t,e,n)=>({kind:"dsu",forest:t.snapshot(),op:null,active:null,explain:e,done:!0,line:n});function Lu(t){return{dsu:t,considering:null,acceptedEdges:[],rejectedEdges:[],queue:[],totalWeight:0}}const St=(t,e,n,s)=>({kind:"mst",forest:t.dsu.snapshot(n),consideringEdge:t.considering,acceptedEdges:[...t.acceptedEdges],rejectedEdges:[...t.rejectedEdges],queue:[...t.queue],totalWeight:t.totalWeight,components:t.dsu.components,explain:e,done:!1,line:s}),qa=(t,e,n)=>({kind:"mst",forest:t.dsu.snapshot(),consideringEdge:null,acceptedEdges:[...t.acceptedEdges],rejectedEdges:[...t.rejectedEdges],queue:[],totalWeight:t.totalWeight,components:t.dsu.components,explain:e,done:!0,line:n});function Ka(t,e,n){const s=t.acceptedEdges.length,o=t.dsu.components,a=t.totalWeight;return e===0?`${n} finished: the graph has no nodes.`:o===1?`${n} finished: spanning tree with ${s} edges (V - 1 = ${e-1}), total weight ${a}.`:`${n} finished: the graph is disconnected, so this is a spanning forest — ${o} components, ${s} edges (V - components = ${e} - ${o}), total weight ${a}. No spanning tree exists.`}function Nu(t,e,n){return`${t[e]??e} — ${t[n]??n}`}function*sm(t,e){const n=Math.max(0,Math.floor(t)),s=new vr(n),o=p=>p!==void 0&&p>=0&&p<n,a=e.filter(p=>p.kind==="union"?o(p.a)&&o(p.b):o(p.a)),r=e.length-a.length,i=r>0?` (${r} operation(s) skipped: node out of range)`:"",l=`${n} singleton sets — every node is its own parent, every rank 0${i}.`;yield Qt(s,null,null,l,Le,Le,0);function*u(p,m){const y=s.pathTo(m),g=`find(${m}): walking up from ${m} to its root.`;yield Qt(s,p,m,g,[m],Le,1);for(let k=1;k<y.length;k++){const T=y[k],_=y.slice(0,k+1),G=k===y.length-1?`${T} is its own parent — that is the root of ${m}'s set.`:`parent[${y[k-1]}] = ${T}, still not a root — keep walking.`;yield Qt(s,p,T,G,_,Le,2)}const v=y[y.length-1],b=s.completeFind(y),w=b.length===0?`Nothing to compress: ${m} already pointed straight at root ${v}.`:`Path compression: ${b.join(", ")} now point straight at root ${v}.`;return yield Qt(s,p,v,w,y,b,3),v}for(const p of a){if(p.kind==="find"){yield*u(p,p.a);continue}const m=p.a,y=p.b,g=`union(${m}, ${y}): find both roots first.`;yield Qt(s,p,m,g,Le,Le,4);const v=yield*u(p,m),b=yield*u(p,y),w=`Roots are ${v} and ${b}.`;if(yield Qt(s,p,b,w,Le,Le,5),v===b){const P=`${m} and ${y} are already in the same set — union does nothing.`;yield Qt(s,p,v,P,Le,Le,6);continue}const k=s.rankOf(v),T=s.rankOf(b),_=k===T;s.link(v,b);const N=k>=T?v:b,j=`rank[${v}]=${k}, rank[${b}]=${T} — hang ${N===v?b:v} under ${N}.`;if(yield Qt(s,p,N,j,Le,Le,7),_){const P=`Ranks were equal, so rank[${N}] goes up to ${k+1}.`;yield Qt(s,p,N,P,Le,Le,8)}}const d=`Script finished: ${s.components===1?"1 set":`${s.components} sets`} remain, deepest tree is ${s.maxDepth()} level(s).`;yield nm(s,d,9)}function*om(t){const e=t.nodes,n=e.length,s=Du(e),o=Pu(e),a=new vr(n),r=Lu(a),i=[...t.edges].sort(za);r.queue=i.map(c=>c.id);const l=`Sorted ${i.length} edges by weight, lightest first.`;yield St(r,l,Le,0);const u=`${n} singleton components — no node is connected to any other yet.`;yield St(r,u,Le,1);for(let c=0;c<i.length;c++){const d=i[c],p=s.get(d.from),m=s.get(d.to);if(p===void 0||m===void 0)continue;const y=Eo(d);r.considering=d.id,r.queue=i.slice(c+1).map(k=>k.id);const g=[...a.pathTo(p),...a.pathTo(m)],v=`Considering ${Nu(o,p,m)} (weight ${y}) — same set?`;yield St(r,v,g,2);const b=a.find(p),w=a.find(m);if(b===w){r.rejectedEdges.push(d.id);const k=`Both ends are in set ${b} already — this edge would close a cycle. Reject.`;yield St(r,k,g,3)}else{a.link(b,w),r.acceptedEdges.push(d.id),r.totalWeight+=y;const k=`Sets ${b} and ${w} were separate — accept, and merge them. Total ${r.totalWeight}.`;yield St(r,k,g,4)}if(r.acceptedEdges.length===n-1){r.considering=null,r.queue=[];const k=`${n-1} edges accepted — every node is connected, so the rest cannot help.`;yield St(r,k,Le,5);break}}r.considering=null,r.queue=[],yield qa(r,Ka(r,n,"Kruskal"),6)}function*am(t,e){const n=t.nodes,s=n.length,o=Du(n),a=Pu(n),r=new vr(s),i=Lu(r);if(s===0){yield qa(i,Ka(i,s,"Prim"),6);return}const l=Array.from({length:s},()=>[]),u=new Map;for(const b of t.edges){const w=o.get(b.from),k=o.get(b.to);w===void 0||k===void 0||w===k||(l[w].push(b),l[k].push(b),u.set(b.id,[w,k]))}const c=new Array(s).fill(!1),d=[];function p(b){c[b]=!0;for(const w of l[b]){const[k,T]=u.get(w.id);c[tm(k,T,b)]||d.push(w)}}function m(){return[...d].sort(za).map(b=>b.id)}const y=e!==void 0&&o.has(e)?o.get(e):0;p(y),i.queue=m();const g=`Starting from ${a[y]??y}; the tree is that node alone.`;yield St(i,g,Le,0);const v=`${d.length} edge(s) leave the tree — these are the candidates.`;for(yield St(i,v,Le,1);;){if(d.length===0){const P=c.indexOf(!1);if(P===-1)break;i.considering=null;const I=`No candidate crosses the cut, but ${a[P]??P} is still unreached — that component is done. Restarting there.`;yield St(i,I,Le,5),p(P),i.queue=m();continue}let b=0;for(let P=1;P<d.length;P++)za(d[P],d[b])<0&&(b=P);const w=d[b];d.splice(b,1);const[k,T]=u.get(w.id),_=Eo(w);i.considering=w.id,i.queue=m();const N=`Lightest candidate is ${Nu(a,k,T)} (weight ${_}).`;yield St(i,N,Le,2);const G=c[k]?T:k;if(c[k]&&c[T]){i.rejectedEdges.push(w.id),yield St(i,"Both ends joined the tree by other routes — it no longer crosses the cut, so taking it would close a cycle. Reject.",Le,3);continue}r.link(r.find(k),r.find(T)),i.acceptedEdges.push(w.id),i.totalWeight+=_,p(G),i.queue=m();const j=`Accept: ${a[G]??G} joins the tree and offers its own edges. Total ${i.totalWeight}.`;yield St(i,j,Le,4)}i.considering=null,i.queue=[],yield qa(i,Ka(i,s,"Prim"),6)}const qo={dsu:{name:"Union-Find",mode:"dsu",generator:sm,description:"The disjoint-set forest on its own: compose a script of union and find operations and watch the trees merge. Each find walks to its root and then re-hangs the whole walk onto it — path compression — while union always hangs the shallower tree under the deeper, which is what keeps the forest from degenerating into a linked list.",complexity:{time:"O(α(n)) amortized per op",space:"O(n)"}},kruskal:{name:"Kruskal's MST",mode:"mst",generator:om,description:'Sorts every edge by weight and walks that list once, accepting an edge whenever its endpoints are still in different components and rejecting it when they are not. The "still different?" question is answered by the disjoint set, which is the only reason the greedy rule is affordable.',complexity:{time:"O(E log E)",space:"O(V + E)"}},prim:{name:"Prim's MST",mode:"mst",generator:am,description:"Grows a single tree from a root, repeatedly taking the cheapest edge that crosses from the tree to a node outside it. Reaches the same total weight as Kruskal on any connected graph, by a completely different route — one growing tree instead of many merging ones.",complexity:{time:"O(V · E)",space:"O(V + E)"}}},rm=2654435761;function im(t){let e=5381;for(let n=0;n<t.length;n++)e=(Math.imul(e,33)^t.charCodeAt(n))>>>0;return e>>>0}function lm(t){let e=0;for(let n=0;n<t.length;n++)e=Math.imul(e,31)+t.charCodeAt(n)|0;return Math.imul(e,rm)>>>8}function um(t){let e=0;for(let n=0;n<t.length;n++)e+=t.charCodeAt(n);return e}function cm(t){return t.length===0?0:t.charCodeAt(0)}const jn={djb2:{name:"djb2",description:"Classic string hash — mixes every character, spreads keys evenly.",hash:im},knuth:{name:"Knuth",description:"Multiplicative hash against 2^32/φ; well-spread, cheap to compute.",hash:lm},mod:{name:"Sum + mod",description:"Adds the character codes. Simple, but every anagram collides.",hash:um},weak:{name:"Weak (first char)",description:"First character only. Awful on purpose — collisions on demand.",hash:cm}},Bu="djb2",da=4;function Ko(t){const e=Math.max(da,Math.floor(t)||da);let n=da;for(;n<e;)n*=2;return n}function dm(t,e){return(Math.imul(t^t>>>15,739982445)>>>0)%e|1}function yr(t,e){return t%e}const pm=.25,fm=.9,hm=4096;function Fu(t,e){const n=Math.max(pm,e);return t==="chaining"?n:Math.min(fm,n)}function mm(){return{entries:[],state:"empty"}}function Vu(t){const e=t.strategy,n=t.hashFnKey,s=Ko(t.capacity),o=Fu(e,t.threshold),a=jn[n].hash,r=t.counters??{probes:0,collisions:0,resizes:0},i=t.arrivals??{next:1},l=Array.from({length:s},mm),u=e==="chaining";let c=0,d=0;function p(q){return yr(q,s)}function m(q){return e==="double"?dm(q,s):1}function y(q,L){switch(e){case"quadratic":return q*(q+1)/2;case"double":return q*L;case"linear":return q;default:return 0}}function g(q,L){const z=p(q);return u?{index:z,chainPos:L}:{index:(z+y(L,m(q)))%s,chainPos:0}}function v(q){return u?l[q].entries.length+1:s}function b(q){return l[q.index].entries[q.chainPos]??null}function w(q,L){const z=l[q.index];if(u){const ie=z.entries[q.chainPos];return ie?ie.key===L?"match":"occupied":"free"}return z.state==="empty"?"free":z.state==="tombstone"?"tombstone":z.entries[0].key===L?"match":"occupied"}function k(q,L){const z={key:L,value:i.next++},ie=l[q.index];return u?(ie.entries.push(z),ie.state="occupied"):(ie.state==="tombstone"&&(d-=1),ie.entries=[z],ie.state="occupied"),c+=1,z}function T(q){const L=l[q.index].entries[q.chainPos];return L.value=i.next++,L}function _(q){const L=l[q.index];u?(L.entries.splice(q.chainPos,1),L.entries.length===0&&(L.state="empty")):(L.entries=[],L.state="tombstone",d+=1),c-=1}function N(){const q=[];for(const L of l)q.push(...L.entries);return q}function G(){return l.map(q=>({entries:q.entries.map(L=>({...L})),state:q.state}))}function j(){return c+d}function P(){return j()/s>o}function I(){return s*2<=hm}function he(){return r.resizes+=1,Vu({strategy:e,hashFnKey:n,capacity:s*2,threshold:o,counters:r,arrivals:i})}function ke(q){const L=a(q.key),z=p(L),ie=m(L),W=v(z);for(let X=0;X<W;X++){const we=u?{index:z,chainPos:l[z].entries.length}:{index:(z+y(X,ie))%s};if(r.probes+=1,u||l[we.index].state==="empty")return l[we.index].entries=u?[...l[we.index].entries,q]:[q],l[we.index].state="occupied",c+=1,{hash:L,home:z,index:we.index,probes:X+1}}return{hash:L,home:z,index:-1,probes:W}}return{strategy:e,hashFnKey:n,capacity:s,threshold:o,counters:r,size:()=>c,tombstones:()=>d,fill:j,loadFactor:()=>c/s,hash:a,home:p,stride:m,offset:y,cursor:g,maxProbes:v,classify:w,entryAt:b,stateAt:q=>l[q].state,chainLength:q=>l[q].entries.length,place:k,overwrite:T,remove:_,entries:N,snapshot:G,overThreshold:P,canGrow:I,growEmpty:he,insertDirect:ke}}function $i(){return{op:null,key:null,hash:null,homeIndex:null,probeIndex:null,probeSeq:[],phase:"idle",explain:null}}const at=(t,e,n)=>({buckets:t.snapshot(),capacity:t.capacity,size:t.size(),loadFactor:t.loadFactor(),op:e.op,key:e.key,hash:e.hash,homeIndex:e.homeIndex,probeIndex:e.probeIndex,probeSeq:[...e.probeSeq],probes:t.counters.probes,collisions:t.counters.collisions,resizes:t.counters.resizes,phase:e.phase,explain:e.explain,done:!1,line:n}),gm=(t,e,n)=>({...at(t,e,n),done:!0});function bm(t,e,n,s){return`h("${t}") = ${e} → ${e} mod ${n} = ${s}`}function Mn(t,e){return`${t} ${e}${t===1?"":"s"}`}function wr(t,e,n,s,o,a){const r=n+1;if(t.strategy==="chaining")return a?`probe ${r}: bucket ${e}, end of chain`:`probe ${r}: bucket ${e}, link ${r}`;if(n===0)return`probe 1: slot ${e} (home)`;const i=t.capacity;if(t.strategy==="double")return`probe ${r}: (${e} + ${n}×${s}) mod ${i} = ${o}`;const l=t.offset(n,s);return t.strategy==="quadratic"?`probe ${r}: (${e} + ${l}) mod ${i} = ${o}  [k(k+1)/2, k=${n}]`:`probe ${r}: (${e} + ${l}) mod ${i} = ${o}`}function*vm(t,e,n,s,o,a){var l;let r=null;const i=t.maxProbes(o);for(let u=0;u<i;u++){const c=t.cursor(s,u),d=t.classify(c,n),p=wr(t,o,u,a,c.index,d==="free");if(t.counters.probes+=1,e.probeSeq.push(c.index),e.probeIndex=c.index,d==="match"){const g=t.overwrite(c);e.phase="updated",e.explain=`${p} — "${n}" is already here → overwrite (now #${g.value})`,yield at(t,e,3);break}if(d==="occupied"){t.counters.collisions+=1;const g=((l=t.entryAt(c))==null?void 0:l.key)??"?";e.phase="probing",e.explain=`${p} — taken by "${g}" → collision, keep walking`,yield at(t,e,5);continue}if(d==="tombstone"){r===null&&(r=c),e.phase="probing",e.explain=`${p} — tombstone; remember it, but keep looking for "${n}"`,yield at(t,e,2);continue}const m=r??c,y=t.place(m,n);e.probeIndex=m.index,e.phase="inserted",e.explain=ym(t,p,n,y.value,m,r!==null),yield at(t,e,4);break}return t.overThreshold()&&t.canGrow()?yield*Sm(t,e):t}function ym(t,e,n,s,o,a){if(t.strategy==="chaining"){const r=Mn(t.chainLength(o.index),"link");return`${e} → append "${n}" (#${s}); the chain is now ${r}`}return a?`${e} — free, but slot ${o.index} was a tombstone → reuse it for "${n}"`:`${e} — empty → insert "${n}" (#${s})`}function*wm(t,e,n,s,o,a){var i;const r=t.maxProbes(o);for(let l=0;l<r;l++){const u=t.cursor(s,l),c=t.classify(u,n),d=wr(t,o,l,a,u.index,c==="free");if(t.counters.probes+=1,e.probeSeq.push(u.index),e.probeIndex=u.index,c==="match"){const p=t.entryAt(u);e.phase="found",e.explain=`${d} — found "${n}" (inserted #${p==null?void 0:p.value})`,yield at(t,e,8);return}if(c==="free"){e.phase="not-found",e.explain=`${d} — ${Hu(t)} → "${n}" is not in the table`,yield at(t,e,9);return}e.phase="probing",e.explain=c==="tombstone"?`${d} — tombstone; a deleted slot never ends a search → keep walking`:`${d} — holds "${(i=t.entryAt(u))==null?void 0:i.key}", not "${n}" → keep walking`,yield at(t,e,7)}e.phase="not-found",e.explain=`walked all ${r} probes without finding "${n}"`,yield at(t,e,9)}function*xm(t,e,n,s,o,a){const r=t.maxProbes(o);for(let i=0;i<r;i++){const l=t.cursor(s,i),u=t.classify(l,n),c=wr(t,o,i,a,l.index,u==="free");if(t.counters.probes+=1,e.probeSeq.push(l.index),e.probeIndex=l.index,u==="match"){t.remove(l),e.phase="deleted",e.explain=km(t,c,n,l.index),yield at(t,e,11);return}if(u==="free"){e.phase="not-found",e.explain=`${c} — ${Hu(t)} → nothing to delete`,yield at(t,e,9);return}e.phase="probing",e.explain=`${c} — not "${n}" → keep walking`,yield at(t,e,10)}e.phase="not-found",e.explain=`walked all ${r} probes without finding "${n}"`,yield at(t,e,9)}function Hu(t){return t.strategy==="chaining"?"chain ends here":"slot is EMPTY"}function km(t,e,n,s){if(t.strategy==="chaining"){const o=Mn(t.chainLength(s),"link");return`${e} — unlink "${n}"; bucket ${s}'s chain is now ${o}`}return`${e} — remove "${n}" and leave a TOMBSTONE, so probes still walk past slot ${s}`}function*Sm(t,e){const n=t.entries(),s=t.fill(),o=(s/t.capacity).toFixed(2),a=t.threshold.toFixed(2),r=t.strategy==="chaining"?`load factor ${s}/${t.capacity} = ${o}`:`slots used ${s}/${t.capacity} = ${o} (${t.size()} keys${t.tombstones()>0?` + ${t.tombstones()} tombstones`:""})`;e.phase="resizing",e.probeIndex=null,e.probeSeq=[],e.explain=`${r} > ${a} → grow to ${t.capacity*2} slots and rehash ${Mn(n.length,"key")}`,yield at(t,e,6);const i=t.growEmpty();for(const l of n){const u=i.insertDirect(l);e.key=l.key,e.hash=u.hash,e.homeIndex=u.home,e.probeIndex=u.index,e.probeSeq=[u.index],e.phase="rehashed",e.explain=`rehash "${l.key}": ${u.hash} mod ${i.capacity} = ${u.home}`+(u.index===u.home?` → slot ${u.index}`:` → slot ${u.home} taken, landed in ${u.index}`),yield at(i,e,6)}return i}function*$m(t,e,n){let s=Vu({strategy:n,...e});const o=$i();for(const u of t){const c=s.hash(u.key),d=s.home(c),p=s.stride(c);o.op=u.kind,o.key=u.key,o.hash=c,o.homeIndex=d,o.probeIndex=d,o.probeSeq=[],o.phase="hashing",o.explain=bm(u.key,c,s.capacity,d),yield at(s,o,1),u.kind==="insert"?s=yield*vm(s,o,u.key,c,d,p):u.kind==="search"?yield*wm(s,o,u.key,c,d,p):yield*xm(s,o,u.key,c,d,p)}const{probes:a,collisions:r,resizes:i}=s.counters,l=$i();l.explain=`script complete — ${Mn(t.length,"operation")}, ${Mn(a,"probe")}, ${Mn(r,"collision")}, ${Mn(i,"resize")}`,yield gm(s,l,12)}function Js(t){return(e,n)=>$m(e,n,t)}const Go={chaining:{name:"Separate Chaining",generator:Js("chaining"),description:"Every bucket holds a list. Colliding keys are appended to the list at their home bucket, so a lookup hashes once and then walks a chain whose length is the load factor on average.",complexity:{best:"O(1)",average:"O(1 + α)",worst:"O(n)",space:"O(n + m)"}},linear:{name:"Linear Probing",generator:Js("linear"),description:"On a collision, try the very next slot, and the next. Cache-friendly and trivial to implement, but colliding keys pile into contiguous runs — primary clustering — and each run makes itself more likely to grow.",complexity:{best:"O(1)",average:"O(1 / (1 - α))",worst:"O(n)",space:"O(m)"}},quadratic:{name:"Quadratic Probing",generator:Js("quadratic"),description:"Jump k(k+1)/2 slots away on the k-th probe, so colliding keys scatter instead of forming runs. Two keys sharing a home slot still share the entire jump sequence, which is secondary clustering.",complexity:{best:"O(1)",average:"O(1 / (1 - α))",worst:"O(n)",space:"O(m)"}},double:{name:"Double Hashing",generator:Js("double"),description:"A second hash of the key decides the stride, so two keys that collide at their home slot almost never collide again. The closest of the three to the uniform-hashing ideal, at the cost of a second hash per key.",complexity:{best:"O(1)",average:"O(1 / (1 - α))",worst:"O(n)",space:"O(m)"}}},Uu="chaining",Em={key:"racy-counter",name:"Racy counter",description:"Two threads each run counter = counter + 1, one machine step at a time.",bug:"If both threads read before either writes, both compute the same value and one increment is lost.",threads:[{name:"T0",instructions:[{label:"local = counter",exec:(t,e)=>{t.threads[e].locals.local=t.shared.counter}},{label:"local = local + 1",exec:(t,e)=>{t.threads[e].locals.local+=1}},{label:"counter = local",exec:(t,e)=>{t.shared.counter=t.threads[e].locals.local}}]},{name:"T1",instructions:[{label:"local = counter",exec:(t,e)=>{t.threads[e].locals.local=t.shared.counter}},{label:"local = local + 1",exec:(t,e)=>{t.threads[e].locals.local+=1}},{label:"counter = local",exec:(t,e)=>{t.shared.counter=t.threads[e].locals.local}}]}],invariant:{label:"counter === 2 once both threads finish",holds:(t,e)=>!e||t.shared.counter===2},createState:()=>({shared:{counter:0},locks:{},threads:[{id:0,pc:0,status:"ready",locals:{local:0}},{id:1,pc:0,status:"ready",locals:{local:0}}]})},Cm={key:"mutex-violation",name:"Mutex violation",description:"Two threads guard a critical section with a check-then-acquire lock.",bug:"Checking the lock and taking it are separate steps, so both threads can see it free and both enter.",threads:[0,1].map((t,e)=>({name:`T${e}`,instructions:[{label:"saw = (lock == free)",exec:(n,s)=>{n.threads[s].locals.saw=n.locks.L===null?1:0}},{label:"if saw: take lock",exec:(n,s)=>{n.threads[s].locals.saw===1&&(n.locks.L=s,n.threads[s].status="critical")}},{label:"critical section",exec:(n,s)=>{n.shared.entered+=1}},{label:"release lock",exec:(n,s)=>{n.threads[s].status==="critical"&&(n.threads[s].status="ready",n.locks.L===s&&(n.locks.L=null))}}]})),invariant:{label:"at most one thread in the critical section",holds:t=>t.threads.filter(e=>e.status==="critical").length<=1},createState:()=>({shared:{entered:0},locks:{L:null},threads:[{id:0,pc:0,status:"ready",locals:{saw:0}},{id:1,pc:0,status:"ready",locals:{saw:0}}]})},Ds={"racy-counter":Em,"mutex-violation":Cm},zu="racy-counter",qu="algoviz-last-visited";function Am(){try{return localStorage.getItem(qu)||null}catch{return null}}const Ei=F(Am());function Tm(t){try{localStorage.setItem(qu,t)}catch{}}function Ku(){function t(n){Ei.value=n,Tm(n)}function e(n,s){n.afterEach(o=>{const a=typeof o.name=="string"?o.name:null;a&&s(a)&&t(a)})}return{lastVisited:Ei,record:t,trackLastVisited:e}}const Om={class:"space-y-8"},Mm={key:0},Rm={class:"mt-1 font-semibold"},Im={class:"grid gap-3 sm:grid-cols-2 lg:grid-cols-3"},_m={class:"flex items-baseline justify-between gap-2"},jm={class:"font-semibold"},Dm={key:0,class:"shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500 dark:bg-slate-700 dark:text-slate-300"},Pm={class:"mt-2 text-sm text-slate-500 dark:text-slate-400"},Lm=oe({__name:"LandingView",setup(t){const{lastVisited:e}=Ku(),n=E(()=>e.value?Ls.find(s=>s.name===e.value):void 0);return(s,o)=>(x(),A("div",Om,[o[3]||(o[3]=h("section",{class:"text-center"},[h("h2",{class:"text-2xl font-bold tracking-tight sm:text-3xl"},"See how algorithms actually run"),h("p",{class:"mx-auto mt-3 max-w-2xl text-sm text-slate-500 dark:text-slate-400 sm:text-base"}," Every algorithm here is written as a generator that yields a snapshot after each meaningful step. Nothing is pre-rendered or faked — play, pause and scrub through the real sequence of comparisons, swaps and visits, one step at a time. ")],-1)),n.value?(x(),A("section",Mm,[C(f(js),{to:n.value.path,class:"flex items-center justify-between gap-4 rounded-2xl border border-indigo-200 bg-indigo-50/60 px-5 py-4 transition-all hover:border-indigo-300 hover:bg-indigo-50 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:hover:border-indigo-500/50 dark:hover:bg-indigo-500/20"},{default:D(()=>{var a;return[h("div",null,[o[0]||(o[0]=h("p",{class:"text-xs font-semibold uppercase tracking-wide text-indigo-500 dark:text-indigo-400"}," Continue where you left off ",-1)),h("p",Rm,R((a=n.value.meta)==null?void 0:a.label),1)]),o[1]||(o[1]=h("span",{"aria-hidden":"true",class:"text-xl text-indigo-500 dark:text-indigo-400"},"→",-1))]}),_:1},8,["to"])])):ge("",!0),h("section",null,[o[2]||(o[2]=h("h3",{class:"mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400"},"Categories",-1)),h("ul",Im,[(x(!0),A(ae,null,me(f(Ls),a=>(x(),A("li",{key:a.path},[C(f(js),{to:a.path,class:"flex h-full flex-col rounded-2xl border border-slate-200 bg-white/70 p-5 transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/10 dark:border-slate-700 dark:bg-slate-800/70 dark:hover:border-indigo-500/50"},{default:D(()=>{var r,i,l;return[h("div",_m,[h("span",jm,R((r=a.meta)==null?void 0:r.label),1),(i=a.meta)!=null&&i.count?(x(),A("span",Dm,R(a.meta.count)+" algorithms ",1)):ge("",!0)]),h("p",Pm,R((l=a.meta)==null?void 0:l.pitch),1)]}),_:2},1032,["to"])]))),128))])])]))}}),Nm=/^\s*yield\s+(?:snap|done)\(.*?,\s*(\d+)\s*\)\s*;?\s*$/;function Bm(t){const e=new Map;return t.split(`
`).forEach((n,s)=>{const o=Nm.exec(n);if(!o)return;const a=Number(o[1]);e.set(a,[...e.get(a)??[],s])}),e}function Wo(t){const e=new Map;return n=>{let s=e.get(n);return s||(s=Bm(t[n].text),e.set(n,s)),s}}const Fm=`import type { SortStep } from '@/types';
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
`,Vm=`import type { SortStep } from '@/types';
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
`,Hm=`import type { SortStep } from '@/types';
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
`,Um=`import type { SortStep } from '@/types';
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
`,zm=`import type { SortStep } from '@/types';
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
`,qm=`import type { SortStep } from '@/types';
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
`,Km=`import type { SortStep } from '@/types';
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
`,Gm=`import type { SortStep } from '@/types';
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
`,Wm=`import type { SortStep } from '@/types';
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
`,Ym=`import type { SortStep } from '@/types';
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
`,Gu={bubble:{file:"bubbleSort.ts",text:Fm},selection:{file:"selectionSort.ts",text:Vm},insertion:{file:"insertionSort.ts",text:Hm},merge:{file:"mergeSort.ts",text:Um},quick:{file:"quickSort.ts",text:zm},heap:{file:"heapSort.ts",text:qm},shell:{file:"shellSort.ts",text:Km},comb:{file:"combSort.ts",text:Gm},counting:{file:"countingSort.ts",text:Wm},radix:{file:"radixSort.ts",text:Ym}},Xm=Wo(Gu),Jm={compare:{wave:"sine",freq:330,durationMs:18,gain:.25},swap:{wave:"triangle",freq:660,durationMs:28,gain:.4},hit:{wave:"triangle",freq:495,durationMs:26,gain:.35},miss:{wave:"sine",freq:220,durationMs:22,gain:.22}},qt=Object.freeze([]),Qs=t=>t.comparing.length>0?["compare"]:t.swapping.length>0?["swap"]:qt,Zs={bubble:Qs,insertion:Qs,quick:Qs,merge:Qs};function rt(t){let e=t>>>0;function n(){e=e+1831565813|0;let a=e;return a=Math.imul(a^a>>>15,a|1),a^=a+Math.imul(a^a>>>7,a|61),((a^a>>>14)>>>0)/4294967296}function s(a,r){return r<a?a:a+Math.floor(n()*(r-a+1))}function o(a){if(a.length!==0)return a[s(0,a.length-1)]}return{next:n,int:s,pick:o}}function Ue(){return Math.floor(Math.random()*4294967296)>>>0}function Qm(t){if(t==null)return null;const e=t.trim();if(e==="")return null;const n=Number(e);return!Number.isFinite(n)||!Number.isInteger(n)?null:n>>>0}function xr(t){return E(()=>Math.max(4,Math.round(204-t.value*2)))}const Zm=5e4,eg=2e3;function fn(t){const e=t.maxSteps??Zm,n=F("idle"),s=F(-1),o=F(0),a=F(!1),r=F(!1),i=F(0);let l=[],u=null,c=null,d=0,p=null;const m=xr(t.speed),y=E(()=>n.value==="running"),g=E(()=>n.value==="paused"),v=E(()=>n.value==="done"),b=E(()=>n.value==="idle"||n.value==="done"),w=E(()=>s.value+1),k=E(()=>s.value>=0?l[s.value]:null),T=E(()=>s.value>=0),_=E(()=>n.value==="idle"||s.value<o.value-1||!a.value);function N(){c!==null&&(clearTimeout(c),c=null)}function G(){p=Date.now()}function j(){p!==null&&(d+=Date.now()-p,p=null),i.value=d}function P(){i.value=d+(p===null?0:Date.now()-p)}function I(){if(!u)return null;if(l.length>=e)return r.value=!0,a.value=!0,u=null,null;const{value:Y,done:pe}=u.next();return pe||!Y?(a.value=!0,u=null,null):(l.push(Y),o.value=l.length,Y.done&&(a.value=!0,u=null),Y)}function he(Y){if(s.value=Y,Y<0){t.clearStep();return}t.applyStep(l[Y],Y)}function ke(){return N(),l=[],o.value=0,s.value=-1,a.value=!1,r.value=!1,d=0,p=null,i.value=0,u=t.createGenerator(),u!==null}function q(){N(),j(),n.value="done"}function L(){var pe;if(n.value!=="running")return;let Y;if(s.value<l.length-1)Y=l[s.value+1],he(s.value+1);else{if(Y=I(),Y===null){q();return}he(l.length-1)}if((pe=t.onAdvance)==null||pe.call(t,Y,s.value),P(),Y.done){q();return}c=setTimeout(L,m.value)}function z(){if(n.value!=="running"){if(n.value==="paused"){n.value="running",G(),L();return}ke()&&(n.value="running",G(),L())}}function ie(){n.value==="running"&&(N(),j(),n.value="paused")}function W(){N(),u=null,l=[],o.value=0,s.value=-1,a.value=!1,r.value=!1,d=0,p=null,i.value=0,t.clearStep(),n.value="idle"}function X(Y){n.value==="running"&&ie();let pe=Math.max(-1,Y),Ae=0;for(;pe>=l.length&&u!==null&&Ae<eg&&I()!==null;)Ae+=1;pe=Math.min(pe,l.length-1),he(pe),pe>=0&&l[pe].done?n.value="done":pe<0&&l.length===0?n.value="idle":n.value="paused"}function we(){var pe;if(n.value==="idle"&&!ke())return;const Y=s.value;X(s.value+1),s.value>Y&&((pe=t.onAdvance)==null||pe.call(t,l[s.value],s.value))}function ft(){X(s.value-1)}function lt(){if(!(n.value==="idle"&&!ke())){for(n.value==="running"&&ie();u!==null&&I()!==null;);he(l.length-1),j(),n.value=l.length>0?"done":"idle"}}return Io(N),{status:n,isRunning:y,isPaused:g,isDone:v,canEdit:b,delayMs:m,elapsedMs:i,cursor:s,stepCount:w,bufferedCount:o,fullyBuffered:a,truncated:r,current:k,canStepBack:T,canStepForward:_,run:z,pause:ie,reset:W,stepForward:we,stepBack:ft,seek:X,skipToEnd:lt}}const tg=45,ng=.0015,Ci=1e-4,sg=.5;function og(){try{const t=window,e=window.AudioContext??t.webkitAudioContext;return e?new e:null}catch{return null}}function Ai(t){Promise.resolve(t).catch(()=>{})}function ag(t={}){const e=t.createContext??og,n=t.minIntervalMs??tg,s=t.now??(()=>performance.now());let o=null,a=null,r=!1,i=1,l={};const u=()=>sg*i*i;function c(){if(o)return!0;if(r)return!1;let g=null;try{g=e()}catch{g=null}return g?(o=g,a=o.createGain(),a.gain.value=u(),a.connect(o.destination),!0):(r=!0,!1)}function d(g){i=Math.min(1,Math.max(0,g)),a&&(a.gain.value=u())}function p(){!c()||!o||o.state==="suspended"&&Ai(o.resume())}function m(g,v){const b=s(),w=l[v];if(w!==void 0&&b-w<n||!c()||!o||!a)return!1;try{const k=o.currentTime,T=k+g.durationMs/1e3,_=o.createOscillator(),N=o.createGain();_.type=g.wave,_.frequency.value=g.freq,N.gain.setValueAtTime(Ci,k),N.gain.linearRampToValueAtTime(g.gain,Math.min(k+ng,T)),N.gain.exponentialRampToValueAtTime(Ci,T),_.connect(N),N.connect(a),_.onended=()=>{_.disconnect(),N.disconnect()},_.start(k),_.stop(T+.01)}catch{return!1}return l[v]=b,!0}function y(){const g=o;o=null,a=null,l={},g&&Ai(g.close())}return{get available(){return!r},setVolume:d,unlock:p,play:m,dispose:y}}const Wu="algoviz-audio-enabled",Yu="algoviz-audio-volume",pa=.4;function rg(){try{return localStorage.getItem(Wu)==="1"}catch{return!1}}function ig(){try{const t=localStorage.getItem(Yu);if(t===null||t==="")return pa;const e=Number(t);return Number.isFinite(e)&&e>=0&&e<=1?e:pa}catch{return pa}}const zn=F(rg()),$s=F(ig());let Kn=null;function Ti(){try{localStorage.setItem(Wu,zn.value?"1":"0"),localStorage.setItem(Yu,String($s.value))}catch{}}function Oi(){const t=Kn??ag();return Kn=t,t.setVolume($s.value),t.unlock(),t}function zs(){function t(){zn.value=!zn.value,Ti(),zn.value&&Oi()}function e(s){$s.value=Math.min(1,Math.max(0,s)),Ti(),Kn==null||Kn.setVolume($s.value)}function n(s){if(!zn.value||s.length===0||document.hidden)return;const o=Kn??Oi();for(const a of s)o.play(Jm[a],a)}return{enabled:zn,volume:$s,toggle:t,setVolume:e,play:n}}function lg(t,e){const n=t[e],s=Array.isArray(n)?n[0]:n;return typeof s=="string"?s:void 0}function Gt(t){const e=Wf(),n=Object.keys(t),s=new Set,o=e.currentRoute.value.query;for(const l of n){const u=lg(o,l);if(u===void 0)continue;const c=t[l].decode(u);c!==void 0&&(t[l].ref.value=c,s.add(l))}let a=null;function r(){const l=e.currentRoute.value.query,u={...l};for(const d of n){const p=t[d].encode(t[d].ref.value);p===null?delete u[d]:u[d]=p}(n.some(d=>u[d]!==l[d])||Object.keys(u).length!==Object.keys(l).length)&&e.replace({query:u}).catch(()=>{})}const i=Math.max(0,...n.map(l=>t[l].debounceMs??0));return _e(n.map(l=>t[l].ref),()=>{if(i===0){r();return}a!==null&&clearTimeout(a),a=setTimeout(r,i)},{flush:"post"}),Io(()=>{a!==null&&clearTimeout(a)}),{hydrated:s}}const ug=1,cg=999,dg=200;function Tn(t,e){const n=(e==null?void 0:e.min)??ug,s=(e==null?void 0:e.max)??cg,o=(e==null?void 0:e.maxLength)??dg,a=t.trim().split(/[\s,]+/).filter(Boolean);if(a.length===0)return{values:[],error:"Enter at least one number."};if(a.length>o)return{values:[],error:`Enter at most ${o} numbers.`};const r=[];for(const i of a){const l=Number(i);if(!Number.isFinite(l)||!Number.isInteger(l))return{values:[],error:`"${i}" is not a whole number.`};r.push(Math.min(s,Math.max(n,l)))}return{values:r,error:null}}function Je(t,e,n){if(t.trim()==="")return;const s=Number(t);if(!(!Number.isFinite(s)||!Number.isInteger(s)))return Math.min(n,Math.max(e,s))}function Kt(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return e}function Mi(t){return`${t.row},${t.col}`}function Ri(t,e,n){const s=t.split(",");if(s.length!==2)return;const[o,a]=s;if(o.trim()===""||a.trim()==="")return;const r=Number(o),i=Number(a);if(!(!Number.isFinite(r)||!Number.isInteger(r))&&!(!Number.isFinite(i)||!Number.isInteger(i))&&!(r<0||r>=e||i<0||i>=n))return{row:r,col:i}}const Xu="-",pg=64;function Ga(t,e){return t.map(e.encodeOp).join(Xu)}function Ju(t,e){const n=t.trim();if(n==="")return[];const s=n.split(Xu);if(s.length>(e.maxOps??pg))return;const o=[];for(const a of s){const r=e.decodeOp(a);if(r===void 0)return;o.push(r)}return o}const vn=t=>t.cursor!==null?["compare"]:t.path.length>0?["hit"]:qt,eo={fib:vn,"coin-change":vn,lis:vn,knapsack:vn,"subset-sum":vn,lcs:vn,"edit-distance":vn,"matrix-chain":vn},fg={fib:["dp[0] = 0; dp[1] = 1","for k = 2 to n:  dp[k] = dp[k - 1] + dp[k - 2]","traceback: every dp[k] fed the two cells after it","done — fib(n) = dp[n]"],"coin-change":["dp[0] = 0   // zero coins make zero","for a = 1 to amount","  dp[a] = 1 + min(dp[a - c]) over coins c <= a","traceback: subtract the winning coin, repeat","done — dp[amount] is the fewest coins"],lis:["dp[i] = 1   // a[i] on its own is a subsequence","for i = 0 to n - 1","  dp[i] = 1 + max(dp[j]) over j < i with a[j] < a[i]","traceback: from argmax dp, hop to the predecessor that won","done — the answer is max(dp), not dp[n - 1]"],knapsack:["dp[0][c] = 0 for every c   // no items, no value","for i = 1 to n","  for c = 0 to capacity","    skip = dp[i-1][c];  take = v_i + dp[i-1][c - w_i] if w_i <= c","    dp[i][c] = max(skip, take)","traceback: dp[i][c] != dp[i-1][c] means item i was taken","done — dp[n][capacity] is the best value"],"subset-sum":["dp[0][0] = 1; dp[0][t] = 0 for t > 0","for i = 1 to n","  for t = 0 to target","    skip = dp[i-1][t];  take = dp[i-1][t - w_i] if w_i <= t","    dp[i][t] = skip OR take","traceback: follow whichever branch held 1","done — dp[n][target] = 1 means the target is reachable"],lcs:["dp[i][0] = dp[0][j] = 0","for i = 1 to m, for j = 1 to n","  if a[i-1] == b[j-1]:  dp[i][j] = 1 + dp[i-1][j-1]","  else:                 dp[i][j] = max(dp[i-1][j], dp[i][j-1])","traceback: on a match take the character and step diagonally","done — dp[m][n] is the LCS length"],"edit-distance":["dp[i][0] = i   // delete everything","dp[0][j] = j   // insert everything","  if a[i-1] == b[j-1]:  dp[i][j] = dp[i-1][j-1]","  else:  dp[i][j] = 1 + min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1])","traceback: read the edit script off the winning branches","done — dp[m][n] is the edit distance"],"matrix-chain":["dp[i][i] = 0   // one matrix needs no multiplication","for len = 2 to n:  for each i, with j = i + len - 1","  dp[i][j] = min over k in [i, j) of","             dp[i][k] + dp[k+1][j] + d[i]*d[k+1]*d[j+1]","traceback: descend into the winning split on both sides","done — dp[0][n-1] is the fewest scalar multiplications"]},hg=`import type { DpDep, DpStep, StepGenerator } from '@/types';
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
`,mg=`import type { DpDep, DpStep, StepGenerator } from '@/types';
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
`,gg=`import type { DpDep, DpStep, StepGenerator } from '@/types';
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
`,bg=`import type { DpDep, DpStep, StepGenerator } from '@/types';
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
`,vg=`import type { DpDep, DpStep, StepGenerator } from '@/types';
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
`,yg=`import type { DpDep, DpStep, StepGenerator } from '@/types';
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
`,wg=`import type { DpDep, DpStep, StepGenerator } from '@/types';
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
`,xg=`import type { DpBoard } from './_utils';
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
`,Qu={fib:{file:"fib.ts",text:hg},"coin-change":{file:"coinChange.ts",text:mg},lis:{file:"lis.ts",text:gg},knapsack:{file:"knapsack.ts",text:bg},"subset-sum":{file:"subsetSum.ts",text:vg},lcs:{file:"lcs.ts",text:yg},"edit-distance":{file:"editDistance.ts",text:wg},"matrix-chain":{file:"matrixChain.ts",text:xg}},kg=Wo(Qu),Ii="fib";function Es(t){switch(t.kind){case"scalar":return`scalar:${t.n}`;case"coins":return`coins:${t.coins.join(",")}:${t.amount}`;case"sequence":return`sequence:${t.values.join(",")}`;case"items":return`items:${t.items.map(e=>`${e.weight}/${e.value}`).join(",")}:${t.capacity}`;case"strings2":return`strings2:${t.a}:${t.b}`;case"chain":return`chain:${t.dims.join(",")}`}}const _i="ABCDEF";function ji(t,e,n){const s=t.int(e,n);return Array.from({length:s},()=>_i[t.int(0,_i.length-1)]).join("")}function Sg(t,e){switch(t){case"scalar":return{kind:"scalar",n:e.int(10,22)};case"coins":{const n=[];let s=1;for(let o=0;o<3;o++)n.push(s),s+=e.int(1,4);return{kind:"coins",coins:n,amount:e.int(9,18)}}case"sequence":return{kind:"sequence",values:Array.from({length:e.int(7,10)},()=>e.int(1,30))};case"items":{const n=e.int(3,6);return{kind:"items",items:Array.from({length:n},()=>({weight:e.int(1,7),value:e.int(1,12)})),capacity:e.int(7,14)}}case"strings2":return{kind:"strings2",a:ji(e,5,7),b:ji(e,5,7)};case"chain":return{kind:"chain",dims:Array.from({length:e.int(4,6)},()=>e.int(1,8)*5)}}}function $g(t,e){return Array.from({length:t},()=>new Array(e).fill(null))}function Eg(t={}){const{audio:e=!0}=t,n=zs(),s=F(Ii),o=F(Ht[Ii].defaults),a=F(60),r=F(Ue()),i=F([]),l=Pe({cursor:null,deps:[],chosen:null,path:[],explain:null,result:null,cellsFilled:0}),u=F(null),c=E(()=>Ht[s.value]),d=E(()=>Tu(c.value,o.value)),p=E(()=>d.value.axes),m=E(()=>d.value.dims),y=E(()=>d.value.recurrence),g=E(()=>d.value.naiveCalls),v=E(()=>$o(c.value,o.value)),b=E(()=>v.value===null),w=E(()=>{var we;const z=u.value;if(z===null)return[];const{rows:ie,cols:W}=m.value,X=i.value;return X.length!==ie||(((we=X[0])==null?void 0:we.length)??0)!==W?[]:z.row<0||z.row>=ie||z.col<0||z.col>=W?[]:d.value.depsOf(z.row,z.col,X)}),k=E(()=>({cellsFilled:l.cellsFilled,fillable:m.value.fillable,rows:m.value.rows,cols:m.value.cols,naiveCalls:g.value,speedup:m.value.fillable>0?g.value/m.value.fillable:0}));function T(){i.value=$g(m.value.rows,m.value.cols),l.cursor=null,l.deps=[],l.chosen=null,l.path=[],l.explain=null,l.result=null,l.cellsFilled=0}const _=fn({speed:a,createGenerator:()=>(T(),b.value?d.value.generator():null),applyStep:z=>{i.value=z.table,l.cursor=z.cursor,l.deps=z.deps,l.chosen=z.chosen,l.path=z.path,l.explain=z.explain,l.result=z.result,l.cellsFilled=z.cellsFilled},clearStep:T,onAdvance:e?z=>{var ie;return n.play(((ie=eo[s.value])==null?void 0:ie.call(eo,z))??qt)}:void 0,maxSteps:kh});function N(z){_.canEdit.value&&(o.value=z,_.reset())}function G(){N(Sg(c.value.kind,rt(r.value)))}function j(){r.value=Ue(),G()}function P(z){u.value=z}_e(s,z=>{Ht[z].kind!==o.value.kind&&(o.value=Ht[z].defaults),_.reset()});const I=E(()=>{var z;return((z=_.current.value)==null?void 0:z.line)??null}),he=E(()=>fg[s.value]),ke=E(()=>Qu[s.value]),q=E(()=>{var ie;const z=(ie=_.current.value)==null?void 0:ie.line;return z===void 0?[]:kg(s.value).get(z)??[]}),L=E(()=>s.value in eo);return Gt(o0({algoKey:s,input:o,speed:a,seed:r})),T(),{algoKey:s,input:o,speed:a,seed:r,currentAlgo:c,axes:p,dims:m,recurrence:y,naiveCalls:g,inputError:v,canRun:b,table:i,view:l,hoverCell:u,hoverDeps:w,stats:k,activeLine:I,pseudocodeLines:he,sourceCode:ke,activeSourceLines:q,hasSoundCues:L,status:_.status,isRunning:_.isRunning,isPaused:_.isPaused,isDone:_.isDone,canEdit:_.canEdit,delayMs:_.delayMs,elapsedMs:_.elapsedMs,stepCount:_.stepCount,cursor:_.cursor,bufferedCount:_.bufferedCount,fullyBuffered:_.fullyBuffered,truncated:_.truncated,current:_.current,canStepBack:_.canStepBack,canStepForward:_.canStepForward,setInput:N,randomizeInput:G,randomizeSeed:j,setHoverCell:P,run:_.run,pause:_.pause,reset:_.reset,stepForward:_.stepForward,stepBack:_.stepBack,seek:_.seek,skipToEnd:_.skipToEnd}}const Cg=`import type { DsuOp, DsuStep } from '@/types';
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
`,Ag=`import type { GraphModel, MstStep } from '@/types';
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
`,Tg=`import type { GraphEdge, GraphModel, MstStep } from '@/types';
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
`,Zu={dsu:{file:"dsuOps.ts",text:Cg},kruskal:{file:"kruskal.ts",text:Ag},prim:{file:"prim.ts",text:Tg}},Og=Wo(Zu),Mg={dsu:["parent[i] = i, rank[i] = 0        // n singleton sets","find(x):","  walk parent pointers up to the root","  re-hang every node walked onto the root   // path compression","union(a, b):","  ra = find(a); rb = find(b)","  if ra == rb: already one set — nothing to do","  hang the lower-rank root under the higher   // union by rank","  on a tie, the surviving root’s rank goes up by 1","done — every operation in the script has run"],kruskal:["sort every edge by weight, lightest first","parent[i] = i        // every node starts as its own component","for each edge (u, v) in that order","  if find(u) == find(v): reject — u and v are already connected","  else accept (u, v) and union(u, v)","  stop early once V - 1 edges have been accepted","done — spanning tree, or a spanning forest if the graph was disconnected"],prim:["pick a start node; the tree holds just that node","offer every edge leaving the tree as a candidate","take the lightest candidate","  if both its ends are already in the tree, drop it   // it would close a cycle","  otherwise accept it: its far end joins the tree and offers its own edges","no candidate left but nodes remain — restart from an unreached node","done — spanning tree, or a spanning forest if the graph was disconnected"]},Di=t=>{if(t.kind!=="mst")return qt;const e=t.consideringEdge;return e===null?qt:t.acceptedEdges.includes(e)?["hit"]:t.rejectedEdges.includes(e)?["miss"]:["compare"]},Rg=7,Ig=6,_g=2,jg=t=>t.kind!=="dsu"?qt:t.line===Rg?["hit"]:t.line===Ig?["miss"]:t.line===_g?["compare"]:qt,to={dsu:jg,kruskal:Di,prim:Di},Pi=400,Dg=.42,Pg=.35,Lg=20;function ec(t=10,e=rt(Ue()),n){const s=Math.max(1,Math.floor(t)),o=Pi/2,a=Pi*Dg,r=(n==null?void 0:n.weighted)??!1,i=(n==null?void 0:n.maxWeight)??Lg,l=Array.from({length:s},(y,g)=>{const v=2*Math.PI*g/s-Math.PI/2;return{id:g,label:`N${g}`,x:o+a*Math.cos(v),y:o+a*Math.sin(v)}}),u=new Set,c=[];function d(y,g){if(y===g)return;const v=y<g?`${y}-${g}`:`${g}-${y}`;if(u.has(v))return;u.add(v);const b=r?e.int(1,i):void 0;c.push(b===void 0?{id:v,from:y,to:g}:{id:v,from:y,to:g,weight:b})}for(let y=0;y<s;y++)d(y,(y+1)%s);const p=s>2?Math.max(1,Math.round(s*Pg)):0;for(let y=0;y<p;y++){const g=e.int(0,s-1),v=e.int(0,s-1);d(g,v)}const m=new Map(l.map(y=>[y.id,[]]));for(const y of c)m.get(y.from).push(y.to),m.get(y.to).push(y.from);return{nodes:l,edges:c,adjacency:m}}const fa=8,tc=3,nc=14,Ng=20;function Li(t){return{parent:Array.from({length:t},(e,n)=>n),rank:new Array(t).fill(0),setSize:new Array(t).fill(1),findPath:[],compressed:[],finds:0,unions:0,compressions:0,maxDepth:0}}function Wa(t,e){const n=rt(e),s=Math.max(2,t),o=[];for(let a=0;a<Math.min(6,s-1);a++)o.push({kind:"union",a:n.int(0,s-1),b:n.int(0,s-1)});for(let a=0;a<3;a++)o.push({kind:"find",a:n.int(0,s-1)});return o}function Bg(t={}){const{audio:e=!0}=t,n=zs(),s=F("kruskal"),o=F(fa),a=F(60),r=F(Ue()),i=F([]),l=F(null),u=F({nodes:[],edges:[],adjacency:new Map}),c=F(Li(fa)),d=Pe({consideringEdge:null,acceptedEdges:[],rejectedEdges:[],queue:[],totalWeight:0,components:fa}),p=F(null),m=F(null),y=F(null),g=E(()=>qo[s.value]),v=E(()=>g.value.mode==="dsu"),b=E(()=>[...u.value.edges].sort((Y,pe)=>{const Ae=(Y.weight??1)-(pe.weight??1);return Ae!==0?Ae:Y.id.localeCompare(pe.id)}));function w(Y,pe){let Ae=pe;for(let ze=0;ze<Y.length&&Y[Ae]!==Ae;ze++)Ae=Y[Ae];return Ae}const k=E(()=>new Map(u.value.nodes.map((Y,pe)=>[Y.id,pe]))),T=E(()=>{const Y=new Map;for(const pe of d.rejectedEdges)Y.set(pe,"rejected");for(const pe of d.acceptedEdges)Y.set(pe,"accepted");return d.consideringEdge!==null&&!Y.has(d.consideringEdge)&&Y.set(d.consideringEdge,"considering"),Y}),_=E(()=>{const Y=new Map,pe=new Set(d.acceptedEdges);for(const ze of u.value.edges)pe.has(ze.id)&&(Y.set(ze.from,"accepted"),Y.set(ze.to,"accepted"));const Ae=u.value.edges.find(ze=>ze.id===d.consideringEdge);return Ae&&(Y.set(Ae.from,"considering"),Y.set(Ae.to,"considering")),Y}),N=E(()=>{var Ae;const Y=new Map;if(v.value)return Y;const pe=c.value.parent;for(const ze of u.value.nodes){const tt=k.value.get(ze.id);if(tt===void 0||tt>=pe.length)continue;const H=w(pe,tt);Y.set(ze.id,`set ${((Ae=u.value.nodes[H])==null?void 0:Ae.label)??H}`)}return Y}),G=E(()=>({finds:c.value.finds,unions:c.value.unions,compressions:c.value.compressions,maxDepth:c.value.maxDepth,totalWeight:d.totalWeight,components:d.components}));function j(){d.consideringEdge=null,d.acceptedEdges=[],d.rejectedEdges=[],d.queue=[],d.totalWeight=0,d.components=v.value?o.value:u.value.nodes.length}function P(){c.value=Li(v.value?o.value:u.value.nodes.length),p.value=null,m.value=null,y.value=null,j()}const I=fn({speed:a,createGenerator:()=>{P();const Y=g.value;if(Y.mode==="dsu")return Y.generator(o.value,[...i.value]);if(u.value.nodes.length===0)return null;const pe=typeof l.value=="number"?l.value:u.value.nodes[0].id;return Y.generator(u.value,pe)},applyStep:Y=>{if(c.value=Y.forest,y.value=Y.explain,Y.kind==="dsu"){p.value=Y.op,m.value=Y.active,d.consideringEdge=null,d.acceptedEdges=[],d.rejectedEdges=[],d.queue=[],d.totalWeight=0,d.components=Y.forest.parent.filter((pe,Ae)=>pe===Ae).length;return}p.value=null,m.value=null,d.consideringEdge=Y.consideringEdge,d.acceptedEdges=Y.acceptedEdges,d.rejectedEdges=Y.rejectedEdges,d.queue=Y.queue,d.totalWeight=Y.totalWeight,d.components=Y.components},clearStep:P,onAdvance:e?Y=>{var pe;return n.play(((pe=to[s.value])==null?void 0:pe.call(to,Y))??qt)}:void 0});function he(Y=!1){var Ae;u.value=ec(o.value,rt(r.value),{weighted:!0,maxWeight:Ng}),Y&&l.value!==null&&u.value.adjacency.has(l.value)||(l.value=((Ae=u.value.nodes[0])==null?void 0:Ae.id)??null),I.reset()}function ke(Y){I.canEdit.value&&(i.value=[...Y],I.reset())}function q(){ke(Wa(o.value,r.value))}function L(Y){I.canEdit.value&&u.value.adjacency.has(Y)&&(l.value=Y)}function z(){r.value=Ue(),he(),q()}const ie=E(()=>{var Y;return((Y=I.current.value)==null?void 0:Y.line)??null}),W=E(()=>Mg[s.value]??[]),X=E(()=>Zu[s.value]),we=E(()=>{var pe;const Y=(pe=I.current.value)==null?void 0:pe.line;return Y===void 0?[]:Og(s.value).get(Y)??[]}),ft=E(()=>s.value in to),{hydrated:lt}=Gt(a0({algoKey:s,nodeCount:o,speed:a,seed:r,startId:l,opScript:i}));return he(lt.has("start")),lt.has("ops")||(i.value=Wa(o.value,r.value)),{algoKey:s,nodeCount:o,speed:a,seed:r,opScript:i,startId:l,graph:u,sortedEdges:b,forest:c,highlights:d,activeOp:p,activeNode:m,explain:y,stats:G,nodeTone:_,edgeTone:T,nodeBadge:N,currentAlgo:g,isDsuMode:v,activeLine:ie,pseudocodeLines:W,sourceCode:X,activeSourceLines:we,hasSoundCues:ft,status:I.status,isRunning:I.isRunning,isPaused:I.isPaused,isDone:I.isDone,canEdit:I.canEdit,delayMs:I.delayMs,elapsedMs:I.elapsedMs,stepCount:I.stepCount,cursor:I.cursor,bufferedCount:I.bufferedCount,fullyBuffered:I.fullyBuffered,current:I.current,canStepBack:I.canStepBack,canStepForward:I.canStepForward,generate:he,setOpScript:ke,randomizeOpScript:q,randomizeSeed:z,setStart:L,run:I.run,pause:I.pause,reset:I.reset,stepForward:I.stepForward,stepBack:I.stepBack,seek:I.seek,skipToEnd:I.skipToEnd}}function kr(t){return t.threads.map(e=>e.instructions.length)}function Fg(t){return t.map(e=>({id:e.id,pc:e.pc,status:e.status,locals:{...e.locals}}))}function Vg(t,e){return t.threads.every((n,s)=>n.pc>=e[s])}function Ya(t,e){const n=kr(t),s=n.map(()=>0);for(const o of e)if(!Number.isInteger(o)||o<0||o>=n.length||(s[o]+=1,s[o]>n[o]))return!1;return s.every((o,a)=>o===n[a])}function*sc(t,e){const n=kr(t),s=t.createState();for(let o=0;o<e.length;o++){const a=e[o],r=s.threads[a],i=t.threads[a].instructions[r.pc];if(!i)continue;i.exec(s,a),r.pc+=1,r.pc>=n[a]&&(r.status="done");const l=Vg(s,n);yield{threads:Fg(s.threads),sharedMem:{...s.shared},lockOwners:{...s.locks},lastAction:{threadId:a,instruction:i.label},violated:!t.invariant.holds(s,l),done:l}}}function Hg(t,e){let n=-1,s=0;for(const o of sc(t,e))o.violated&&n===-1&&(n=s),s+=1;return{schedule:[...e],violates:n!==-1,firstViolationIndex:n}}const oc=6e3;function Ug(t){let e="";for(const n of t)e+=String.fromCharCode(n);return btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function zg(t){const e=t.replace(/-/g,"+").replace(/_/g,"/");try{const n=atob(e),s=new Uint8Array(n.length);for(let o=0;o<n.length;o++)s[o]=n.charCodeAt(o);return s}catch{return}}function qg(t){return t.length>oc?null:Ug(new TextEncoder().encode(t))}function Kg(t){const e=zg(t);if(e!==void 0)try{const n=new TextDecoder("utf-8",{fatal:!0}).decode(e);return n.length>oc?void 0:n}catch{return}}const Sr=2e4,Gg=3e3,Wg=5e3,Yg=250,Ps=500,ac=5,$r=60,rc=22,ic=60,Xa=`// Write any sorting algorithm you like.
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
`;function hn(t){return String(t)}function mn(t){const e=Qm(t);return e===null?void 0:e}function qn(t){if(t.trim()==="")return;const e=Number(t);return Number.isInteger(e)?e:void 0}function ha(t){const e=[];for(const n of t.split(",")){const s=qn(n);if(s===void 0)return;e.push(s)}return e}const ma={algo:"bubble",size:45,speed:60};function Xg(t){return{algo:{ref:t.algoKey,encode:e=>e===ma.algo?null:e,decode:e=>Kt(Zn,e)},size:{ref:t.size,encode:e=>e===ma.size?null:String(e),decode:e=>Je(e,10,100),debounceMs:250},speed:{ref:t.speed,encode:e=>e===ma.speed?null:String(e),decode:e=>Je(e,1,100),debounceMs:250},seed:{ref:t.seed,encode:hn,decode:mn}}}const no={algo:"binary",size:20,speed:60,target:0};function Jg(t){return{algo:{ref:t.algoKey,encode:e=>e===no.algo?null:e,decode:e=>Kt(Ho,e)},size:{ref:t.size,encode:e=>e===no.size?null:String(e),decode:e=>Je(e,10,50),debounceMs:250},speed:{ref:t.speed,encode:e=>e===no.speed?null:String(e),decode:e=>Je(e,1,100),debounceMs:250},seed:{ref:t.seed,encode:hn,decode:mn},target:{ref:t.target,encode:e=>e===no.target?null:String(e),decode:e=>Je(e,0,99)}}}function Qg(t,e){const n="bfs",o={row:Math.floor(e.rows/2),col:0},a={row:Math.floor(e.rows/2),col:e.cols-1},r=(i,l)=>i.row===l.row&&i.col===l.col;return{algo:{ref:t.algoKey,encode:i=>i===n?null:i,decode:i=>Kt(Uo,i)},speed:{ref:t.speed,encode:i=>i===60?null:String(i),decode:i=>Je(i,1,100),debounceMs:250},seed:{ref:t.seed,encode:hn,decode:mn},start:{ref:t.start,encode:i=>r(i,o)?null:Mi(i),decode:i=>Ri(i,e.rows,e.cols)},end:{ref:t.end,encode:i=>r(i,a)?null:Mi(i),decode:i=>Ri(i,e.rows,e.cols)}}}function Ni(t){return E({get:()=>({row:t.row,col:t.col}),set:e=>{t.row=e.row,t.col=e.col}})}const Bi={algo:"bfs",speed:60};function Zg(t){return{algo:{ref:t.algoKey,encode:e=>e===Bi.algo?null:e,decode:e=>Kt(zo,e)},speed:{ref:t.speed,encode:e=>e===Bi.speed?null:String(e),decode:e=>Je(e,1,100),debounceMs:250},seed:{ref:t.seed,encode:hn,decode:mn},start:{ref:t.startId,encode:e=>e===null?null:String(e),decode:e=>Je(e,0,9999)}}}const Fi={size:rc,speed:ic};function e0(t){return{src:{ref:t.source,encode:e=>e===Xa?null:qg(e),decode:Kg,debounceMs:400},size:{ref:t.size,encode:e=>e===Fi.size?null:String(e),decode:e=>Je(e,ac,$r),debounceMs:250},speed:{ref:t.speed,encode:e=>e===Fi.speed?null:String(e),decode:e=>Je(e,1,100),debounceMs:250},seed:{ref:t.seed,encode:hn,decode:mn}}}const Vi={scenario:zu,speed:60};function t0(t,e){return{scenario:{ref:t.scenarioKey,encode:n=>n===Vi.scenario?null:n,decode:n=>Kt(Ds,n)},speed:{ref:t.speed,encode:n=>n===Vi.speed?null:String(n),decode:n=>Je(n,1,100),debounceMs:250},seed:{ref:t.seed,encode:hn,decode:mn},sched:{ref:E({get:()=>t.schedule.value.join(""),set:n=>{t.schedule.value=[...n].map(Number)}}),encode:n=>n===""?null:n,decode:n=>{if(/^[0-9]+$/.test(n))return Ya(e(),[...n].map(Number))?n:void 0}}}}const Hi={algo:"fib",speed:60};function n0(t,e){switch(t){case"scalar":{const n=qn(e);return n===void 0?void 0:{kind:"scalar",n}}case"coins":{const n=e.split(":");if(n.length!==2)return;const s=ha(n[0]),o=qn(n[1]);return s===void 0||o===void 0?void 0:{kind:"coins",coins:s,amount:o}}case"sequence":{const n=ha(e);return n===void 0?void 0:{kind:"sequence",values:n}}case"items":{const n=e.split(":");if(n.length!==2)return;const s=qn(n[1]);if(s===void 0)return;const o=[];for(const a of n[0].split(",")){const r=a.split("/");if(r.length!==2)return;const i=qn(r[0]),l=qn(r[1]);if(i===void 0||l===void 0)return;o.push({weight:i,value:l})}return{kind:"items",items:o,capacity:s}}case"strings2":{const n=e.split(":");return n.length!==2?void 0:{kind:"strings2",a:n[0],b:n[1]}}case"chain":{const n=ha(e);return n===void 0?void 0:{kind:"chain",dims:n}}}}function s0(t,e){const n=t.indexOf(":"),s=n===-1?t:t.slice(0,n),o=n===-1?"":t.slice(n+1);if(s!==e.kind)return;const a=n0(e.kind,o);if(a!==void 0)return $o(e,a)===null?a:void 0}function o0(t){return{algo:{ref:t.algoKey,encode:e=>e===Hi.algo?null:e,decode:e=>Kt(Ht,e)},speed:{ref:t.speed,encode:e=>e===Hi.speed?null:String(e),decode:e=>Je(e,1,100),debounceMs:250},seed:{ref:t.seed,encode:hn,decode:mn},in:{ref:t.input,encode:e=>{const n=Es(e),s=Es(Ht[t.algoKey.value].defaults);return n===s?null:n},decode:e=>s0(e,Ht[t.algoKey.value])}}}const ga={algo:"kruskal",n:8,speed:60};function Ui(t){const e=n=>n>=0&&n<t;return{encodeOp:n=>n.kind==="union"?`u${n.a}.${n.b??n.a}`:`f${n.a}`,decodeOp:n=>{const s=/^([uf])(\d+)(?:\.(\d+))?$/.exec(n);if(s===null)return;const o=Number(s[2]);if(!e(o))return;if(s[1]==="f")return s[3]===void 0?{kind:"find",a:o}:void 0;if(s[3]===void 0)return;const a=Number(s[3]);return e(a)?{kind:"union",a:o,b:a}:void 0}}}function a0(t){return{algo:{ref:t.algoKey,encode:e=>e===ga.algo?null:e,decode:e=>Kt(qo,e)},n:{ref:t.nodeCount,encode:e=>e===ga.n?null:String(e),decode:e=>Je(e,tc,nc),debounceMs:250},speed:{ref:t.speed,encode:e=>e===ga.speed?null:String(e),decode:e=>Je(e,1,100),debounceMs:250},seed:{ref:t.seed,encode:hn,decode:mn},start:{ref:t.startId,encode:e=>e===null?null:String(e),decode:e=>Je(e,0,9999)},ops:{ref:t.opScript,encode:e=>{const n=Ui(t.nodeCount.value),s=Ga(e,n),o=Wa(t.nodeCount.value,t.seed.value);return s===Ga(o,n)?null:s},decode:e=>Ju(e,Ui(t.nodeCount.value))}}}const ps={strategy:Uu,fn:Bu,capacity:8,threshold:.75,speed:60},r0=25,i0=150,ba=t=>Math.round(t*100),l0={insert:"i",search:"s",delete:"d"},u0={i:"insert",s:"search",d:"delete"},c0=/^([isd])([A-Za-z0-9]{1,12})$/,zi={encodeOp:t=>`${l0[t.kind]}${t.key}`,decodeOp:t=>{const e=c0.exec(t);if(e!==null)return{kind:u0[e[1]],key:e[2]}}};function d0(t){return{strategy:{ref:t.strategyKey,encode:e=>e===ps.strategy?null:e,decode:e=>Kt(Go,e)},fn:{ref:t.hashFnKey,encode:e=>e===ps.fn?null:e,decode:e=>Kt(jn,e)},cap:{ref:t.capacity,encode:e=>e===ps.capacity?null:String(e),decode:e=>Je(e,4,64),debounceMs:250},thr:{ref:t.threshold,encode:e=>ba(e)===ba(ps.threshold)?null:String(ba(e)),decode:e=>{const n=Je(e,r0,i0);return n===void 0?void 0:n/100},debounceMs:250},speed:{ref:t.speed,encode:e=>e===ps.speed?null:String(e),decode:e=>Je(e,1,100),debounceMs:250},seed:{ref:t.seed,encode:hn,decode:mn},ops:{ref:t.script,encode:e=>e.length===0?null:Ga(e,zi),decode:e=>Ju(e,zi)}}}function qi(t={}){const{syncUrl:e=!0,audio:n=!0}=t,s=zs(),o=F(45),a=F(60),r=F("bubble"),i=F(Ue()),l=F([]),u=Pe({comparing:[],swapping:[],sorted:[]}),c=Pe({comparisons:0,swaps:0}),d=F([]),p=E(()=>Zn[r.value]),m=F(1);function y(P){const I=rt(i.value);return Array.from({length:P},()=>I.int(1,99))}function g(){u.comparing=[],u.swapping=[],u.sorted=[]}function v(){c.comparisons=0,c.swaps=0}const b=fn({speed:a,createGenerator:()=>(l.value=[...d.value],g(),v(),p.value.generator([...d.value])),applyStep:P=>{l.value=P.array,u.comparing=P.comparing,u.swapping=P.swapping,u.sorted=P.sorted,c.comparisons=P.comparisons,c.swaps=P.swaps},clearStep:()=>{l.value=[...d.value],g(),v()},onAdvance:n?P=>{var I;return s.play(((I=Zs[r.value])==null?void 0:I.call(Zs,P))??qt)}:void 0});function w(){d.value=y(o.value),m.value=Math.max(...d.value,1),b.reset()}function k(P){P.length!==0&&(d.value=[...P],o.value=P.length,m.value=Math.max(...P,1),b.reset())}const T=E(()=>{var P;return((P=b.current.value)==null?void 0:P.line)??null}),_=E(()=>Gu[r.value]),N=E(()=>{var I;const P=(I=b.current.value)==null?void 0:I.line;return P===void 0?[]:Xm(r.value).get(P)??[]}),G=E(()=>r.value in Zs);function j(){i.value=Ue(),w()}return e&&Gt(Xg({algoKey:r,size:o,speed:a,seed:i})),w(),{size:o,speed:a,algoKey:r,seed:i,array:l,baseArray:d,highlights:u,stats:c,maxValue:m,currentAlgo:p,status:b.status,isRunning:b.isRunning,isPaused:b.isPaused,isDone:b.isDone,canEdit:b.canEdit,delayMs:b.delayMs,elapsedMs:b.elapsedMs,stepCount:b.stepCount,cursor:b.cursor,bufferedCount:b.bufferedCount,fullyBuffered:b.fullyBuffered,current:b.current,activeLine:T,sourceCode:_,activeSourceLines:N,hasSoundCues:G,canStepBack:b.canStepBack,canStepForward:b.canStepForward,generate:w,randomizeSeed:j,setArray:k,run:b.run,pause:b.pause,reset:b.reset,stepForward:b.stepForward,stepBack:b.stepBack,seek:b.seek,skipToEnd:b.skipToEnd}}const p0={bubble:["for i = 0 to n - 2","  for j = 0 to n - 2 - i","    if a[j] > a[j + 1]","      swap a[j] and a[j + 1]","  a[n - 1 - i] is now in its final position","done — array is sorted"],selection:["for i = 0 to n - 1","  min = i","  for j = i + 1 to n - 1","    if a[j] < a[min]: min = j","  if min != i","    swap a[i] and a[min]","  a[i] is now in its final position","done — array is sorted"],insertion:["for i = 1 to n - 1","  j = i","  while j > 0 and a[j - 1] > a[j]","    swap a[j - 1] and a[j]","    j = j - 1","done — array is sorted"],merge:["mergesort(lo, hi):","  if hi - lo <= 1: return","  mid = (lo + hi) / 2","  mergesort(lo, mid); mergesort(mid, hi)","  while both halves still have items","    compare a[i] and a[j]; move the smaller into buffer","  append whatever remains of either half","  copy the buffer back into a[lo..hi)","done — array is sorted"],quick:["quicksort(lo, hi):","  if lo >= hi: return","  pivot = a[hi]; i = lo","  for j = lo to hi - 1","    if a[j] < pivot","      swap a[i] and a[j]; i = i + 1","  swap a[i] and a[hi]   // pivot into its final position","  quicksort(lo, i - 1); quicksort(i + 1, hi)","done — array is sorted"],heap:["siftDown(root, hi):","  while root still has a child at or before hi","    child = the larger child of root","    if a[root] >= a[child]: stop","    swap a[root] and a[child]; root = child","build the max-heap: for i = n/2 - 1 down to 0","  siftDown(i, n - 1)","for end = n - 1 down to 1","  swap a[0] and a[end]   // the max lands in its final slot","  siftDown(0, end - 1)","done — array is sorted"],shell:["for gap = n/2; gap > 0; gap = gap/2","  for i = gap to n - 1","    j = i","    while j >= gap and a[j - gap] > a[j]","      swap a[j - gap] and a[j]","      j = j - gap","done — array is sorted"],comb:["gap = n; swapped = true","while gap > 1 or swapped","  gap = max(1, floor(gap / 1.3))","  swapped = false","  for i = 0 while i + gap < n","    if a[i] > a[i + gap]","      swap a[i] and a[i + gap]; swapped = true","done — array is sorted"],counting:["count = zeros, sized max(a) + 1","for i = 0 to n - 1","  count[a[i]] = count[a[i]] + 1","for v = 1 to max","  count[v] = count[v] + count[v - 1]   // where each value ends","for i = n - 1 down to 0   // backwards keeps equal values in order","  d = count[a[i]] - 1; count[a[i]] = d","  output[d] = a[i]","done — array is sorted"],radix:["for exp = 1, 10, 100, ... while max / exp > 0","  digit(v) = (v / exp) mod 10","  count = ten zeros","  for i = 0 to n - 1","    count[digit(a[i])] = count[digit(a[i])] + 1","  for d = 1 to 9","    count[d] = count[d] + count[d - 1]   // where each digit ends","  for i = n - 1 down to 0   // backwards keeps the pass stable","    k = count[digit(a[i])] - 1; count[digit(a[i])] = k","    output[k] = a[i]","  a = output   // now ordered by every digit up to exp","done — array is sorted"]},f0={class:"av-card p-4 sm:p-5"},h0={key:0,class:"mb-3 flex items-center justify-between"},m0={class:"text-xs font-semibold uppercase tracking-wider text-slate-400"},g0={key:1,class:"mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400"},ye=oe({__name:"AvPanel",props:{title:{}},setup(t){return(e,n)=>(x(),A("div",f0,[e.$slots.header?(x(),A("div",h0,[h("h2",m0,R(t.title),1),mo(e.$slots,"header")])):t.title?(x(),A("h2",g0,R(t.title),1)):ge("",!0),mo(e.$slots,"default")]))}}),b0=["disabled","aria-pressed"],v0="flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none",y0="rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600 transition-all hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",ee=oe({__name:"AvButton",props:{variant:{default:"neutral"},active:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1}},setup(t){const e=t,n={primary:"bg-emerald-500 text-white shadow-md shadow-emerald-500/30 hover:bg-emerald-600",warning:"bg-amber-500 text-white shadow-md shadow-amber-500/30 hover:bg-amber-600",danger:"bg-rose-500 text-white shadow-md shadow-rose-500/30 hover:bg-rose-600",neutral:"bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"},s={primary:"hover:shadow-lg",warning:"hover:shadow-lg",danger:"hover:shadow-lg",neutral:""},o={selector:{base:"rounded-xl px-3 py-2 text-sm font-medium transition-all disabled:cursor-not-allowed",on:"bg-indigo-500 text-white shadow-md shadow-indigo-500/30",off:"bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 disabled:opacity-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"},toggle:{base:"rounded-lg px-3 py-1.5 text-xs font-semibold transition-all disabled:cursor-not-allowed",on:"bg-indigo-500 text-white shadow-sm",off:"text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700"}},a=E(()=>e.variant==="selector"||e.variant==="toggle"),r=E(()=>{const l=e.variant;if(l==="selector"||l==="toggle"){const u=o[l];return[u.base,e.active?u.on:u.off]}return l==="quiet"?y0:[v0,n[l],s[l]]}),i=E(()=>a.value?e.active:void 0);return(l,u)=>(x(),A("button",{type:"button",class:de(r.value),disabled:t.disabled,"aria-pressed":i.value},[mo(l.$slots,"default")],10,b0))}}),w0={key:0,class:"mt-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50"},x0={class:"text-sm leading-relaxed text-slate-600 dark:text-slate-300"},k0={class:"mt-3 flex flex-wrap gap-2"},S0={class:"uppercase tracking-wide text-[10px] text-slate-400"},$0={class:"font-mono font-semibold text-indigo-500 dark:text-indigo-400"},xn=oe({__name:"AvAlgorithmSelector",props:Dn({algorithms:{},title:{default:"Algorithm"},disabled:{type:Boolean,default:!1},columns:{default:2}},{modelValue:{required:!0},modelModifiers:{}}),emits:["update:modelValue"],setup(t){const e=t,n=Pn(t,"modelValue"),s=E(()=>Object.keys(e.algorithms)),o=E(()=>e.algorithms[n.value]),a=E(()=>o.value?Object.entries(o.value.complexity):[]),r={2:"grid grid-cols-2 gap-2",3:"grid grid-cols-2 gap-2 sm:grid-cols-3",4:"grid grid-cols-2 gap-2 sm:grid-cols-4"},i=E(()=>r[e.columns]);function l(u){e.disabled||(n.value=u)}return(u,c)=>(x(),J(ye,{title:t.title},{default:D(()=>[h("div",{class:de(i.value)},[(x(!0),A(ae,null,me(s.value,d=>(x(),J(ee,{key:d,variant:"selector",active:d===n.value,disabled:t.disabled,onClick:p=>l(d)},{default:D(()=>[O(R(t.algorithms[d].name),1)]),_:2},1032,["active","disabled","onClick"]))),128))],2),o.value?(x(),A("div",w0,[h("p",x0,R(o.value.description),1),h("div",k0,[(x(!0),A(ae,null,me(a.value,([d,p])=>(x(),A("span",{key:d,class:"inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 text-xs font-medium text-slate-500 shadow-sm dark:bg-slate-900 dark:text-slate-400"},[h("span",S0,R(d),1),h("span",$0,R(p),1)]))),128)),o.value.stable!==void 0?(x(),A("span",{key:0,class:de(["inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium shadow-sm",o.value.stable?"bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400":"bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"])},R(o.value.stable?"Stable":"Unstable"),3)):ge("",!0)])])):ge("",!0)]),_:1},8,["title"]))}}),E0={class:"block"},C0={class:"mb-1.5 flex items-center justify-between text-sm"},A0={class:"font-medium text-slate-600 dark:text-slate-300"},T0={class:"font-mono text-indigo-500 dark:text-indigo-400"},O0=["min","max","step","value","disabled","aria-valuetext"],Ve=oe({__name:"AvSlider",props:Dn({label:{},min:{},max:{},step:{default:1},suffix:{default:""},disabled:{type:Boolean,default:!1}},{modelValue:{required:!0},modelModifiers:{}}),emits:["update:modelValue"],setup(t){const e=t,n=Pn(t,"modelValue"),s=E(()=>`${n.value}${e.suffix}`);function o(a){n.value=Number(a.target.value)}return(a,r)=>(x(),A("label",E0,[h("div",C0,[h("span",A0,R(t.label),1),h("span",T0,R(s.value),1)]),h("input",{type:"range",min:t.min,max:t.max,step:t.step,value:n.value,disabled:t.disabled,"aria-valuetext":s.value,class:"w-full",onInput:o},null,40,O0)]))}}),M0={class:"space-y-4"},R0={key:1,class:"mt-2 text-center text-xs text-slate-400"},I0={class:"mt-2 grid grid-cols-2 gap-2"},_0=oe({__name:"ControlsPanel",props:{size:{},speed:{},status:{},canEdit:{type:Boolean},isRunning:{type:Boolean},isPaused:{type:Boolean},compare:{type:Boolean,default:!1},sound:{type:Boolean,default:!1},volume:{default:.4},hasSoundCues:{type:Boolean,default:!0}},emits:["update:size","update:speed","update:compare","update:sound","update:volume","generate","run","runBoth","pause","reset"],setup(t,{emit:e}){const n=t,s=e;function o(){n.compare?s("runBoth"):s("run")}return(a,r)=>(x(),J(ye,{title:"Controls"},{default:D(()=>[h("div",M0,[C(Ve,{label:"Array size","model-value":t.size,min:10,max:100,disabled:!t.canEdit,"onUpdate:modelValue":r[0]||(r[0]=i=>s("update:size",i))},null,8,["model-value","disabled"]),C(Ve,{label:"Speed","model-value":t.speed,min:1,max:100,suffix:"%","onUpdate:modelValue":r[1]||(r[1]=i=>s("update:speed",i))},null,8,["model-value"])]),C(ee,{variant:"toggle",class:"mt-5 w-full",active:t.compare,disabled:!t.canEdit,onClick:r[2]||(r[2]=i=>s("update:compare",!t.compare))},{default:D(()=>[...r[8]||(r[8]=[O(" Compare two algorithms ",-1)])]),_:1},8,["active","disabled"]),C(ee,{variant:"toggle",class:"mt-2 w-full",active:t.sound,onClick:r[3]||(r[3]=i=>s("update:sound",!t.sound))},{default:D(()=>[...r[9]||(r[9]=[O(" Sound cues ",-1)])]),_:1},8,["active"]),t.sound?(x(),J(Ve,{key:0,label:"Volume",class:"mt-3","model-value":Math.round(t.volume*100),min:0,max:100,suffix:"%","onUpdate:modelValue":r[4]||(r[4]=i=>s("update:volume",i/100))},null,8,["model-value"])):ge("",!0),t.sound&&!t.hasSoundCues?(x(),A("p",R0," Sound cues aren't mapped for this algorithm yet. ")):ge("",!0),h("div",I0,[t.isRunning?(x(),J(ee,{key:1,variant:"warning",class:"col-span-2",onClick:r[5]||(r[5]=i=>s("pause"))},{default:D(()=>[...r[11]||(r[11]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M6 4h4v16H6zM14 4h4v16h-4z"})],-1),O(" Pause ",-1)])]),_:1})):(x(),J(ee,{key:0,variant:"primary",class:"col-span-2",onClick:o},{default:D(()=>[r[10]||(r[10]=h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M8 5v14l11-7z"})],-1)),O(" "+R(t.isPaused?"Resume":"Run"),1)]),_:1})),C(ee,{variant:"neutral",onClick:r[6]||(r[6]=i=>s("reset"))},{default:D(()=>[...r[12]||(r[12]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.36 2.64L3 8"}),h("path",{d:"M3 3v5h5"})],-1),O(" Reset ",-1)])]),_:1}),C(ee,{variant:"neutral",disabled:!t.canEdit,onClick:r[7]||(r[7]=i=>s("generate"))},{default:D(()=>[...r[13]||(r[13]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"})],-1),O(" Shuffle ",-1)])]),_:1},8,["disabled"])]),r[14]||(r[14]=h("p",{class:"mt-3 text-center text-xs text-slate-400"}," Size & algorithm lock while a sort is running. ",-1))]),_:1}))}}),j0={key:1,class:"text-sm text-slate-400 dark:text-slate-500"},D0={class:"mt-3 grid grid-cols-3 gap-2"},gn=oe({__name:"PlaybackScrubber",props:{cursor:{},bufferedCount:{},fullyBuffered:{type:Boolean},canStepBack:{type:Boolean},canStepForward:{type:Boolean}},emits:["seek","step-back","step-forward","skip-to-end"],setup(t,{emit:e}){const n=e;return(s,o)=>(x(),J(ye,{title:"History"},{default:D(()=>[t.bufferedCount>0?(x(),J(Ve,{key:0,label:"Step",min:0,max:Math.max(0,t.bufferedCount-1),suffix:` / ${Math.max(0,t.bufferedCount-1)}`,"model-value":t.cursor,"onUpdate:modelValue":o[0]||(o[0]=a=>n("seek",a))},null,8,["max","suffix","model-value"])):(x(),A("p",j0,"Press Run or Step to begin.")),h("div",D0,[C(ee,{variant:"quiet",disabled:!t.canStepBack,onClick:o[1]||(o[1]=a=>n("step-back"))},{default:D(()=>[...o[4]||(o[4]=[O(" ◀ Step ",-1)])]),_:1},8,["disabled"]),C(ee,{variant:"quiet",disabled:!t.canStepForward,onClick:o[2]||(o[2]=a=>n("step-forward"))},{default:D(()=>[...o[5]||(o[5]=[O(" Step ▶ ",-1)])]),_:1},8,["disabled"]),C(ee,{variant:"quiet",disabled:t.fullyBuffered&&t.cursor===t.bufferedCount-1,onClick:o[3]||(o[3]=a=>n("skip-to-end"))},{default:D(()=>[...o[6]||(o[6]=[O(" Skip to end ",-1)])]),_:1},8,["disabled"])])]),_:1}))}}),P0={class:"flex gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800/50"},L0={key:0,class:"mb-2 font-mono text-[0.65rem] uppercase tracking-wider text-slate-400 dark:text-slate-500"},N0={key:1,class:"text-xs text-slate-400 dark:text-slate-500"},B0=["data-active"],F0={class:"whitespace-pre font-mono"},Yo=oe({__name:"CodePanel",props:{lines:{},source:{},sourceFile:{default:""},activeLine:{default:null},activeSourceLines:{default:()=>[]},title:{default:"Code"}},setup(t){const e=t,n=F("pseudo"),s=E(()=>e.source.split(`
`)),o=E(()=>n.value==="source"?s.value:e.lines);function a(c){return n.value==="source"?e.activeSourceLines.includes(c):c===e.activeLine}const r=/^\s*(\/\/|\/\*|\*)/;function i(c){return n.value==="source"&&r.test(c)}const l=E(()=>n.value==="source"?e.activeSourceLines[0]??null:e.activeLine),u=F(null);return _e([l,n],async()=>{var d,p;if(l.value===null)return;await Vs();const c=(d=u.value)==null?void 0:d.querySelector('[data-active="true"]');(p=c==null?void 0:c.scrollIntoView)==null||p.call(c,{block:"nearest"})}),(c,d)=>(x(),J(ye,{title:t.title,class:"max-h-96 overflow-y-auto"},{header:D(()=>[h("div",P0,[C(ee,{variant:"toggle",active:n.value==="pseudo",onClick:d[0]||(d[0]=p=>n.value="pseudo")},{default:D(()=>[...d[2]||(d[2]=[O(" Pseudocode ",-1)])]),_:1},8,["active"]),C(ee,{variant:"toggle",active:n.value==="source",onClick:d[1]||(d[1]=p=>n.value="source")},{default:D(()=>[...d[3]||(d[3]=[O(" Source ",-1)])]),_:1},8,["active"])])]),default:D(()=>[n.value==="source"&&t.sourceFile?(x(),A("p",L0,R(t.sourceFile),1)):ge("",!0),o.value.length===0?(x(),A("p",N0," Pseudocode isn't written for this algorithm yet — switch to Source to watch the generator itself. ")):(x(),A("ol",{key:2,ref_key:"list",ref:u,class:"space-y-0.5 text-xs"},[(x(!0),A(ae,null,me(o.value,(p,m)=>(x(),A("li",{key:m,"data-active":a(m),class:de(["flex gap-3 rounded px-1.5 py-0.5 transition-colors",a(m)?"bg-amber-400/20 text-amber-800 dark:text-amber-300":i(p)?"text-slate-400/70 dark:text-slate-600":"text-slate-500 dark:text-slate-400"])},[h("span",{class:de(["w-5 flex-none text-right tabular-nums",a(m)?"font-semibold text-amber-600 dark:text-amber-400":"text-slate-400 dark:text-slate-600"])},R(m+1),3),h("span",F0,R(p),1)],10,B0))),128))],512))]),_:1},8,["title"]))}}),V0={class:"block"},H0={class:"mb-1.5 flex items-center justify-between text-sm"},U0={class:"font-medium text-slate-600 dark:text-slate-300"},z0=["value","placeholder","disabled","aria-invalid"],q0={key:0,class:"mt-1.5 text-xs text-rose-500 dark:text-rose-400"},vt=oe({__name:"AvTextField",props:Dn({label:{},placeholder:{default:""},error:{default:null},disabled:{type:Boolean,default:!1},monospace:{type:Boolean,default:!1}},{modelValue:{required:!0},modelModifiers:{}}),emits:["update:modelValue"],setup(t){const e=Pn(t,"modelValue");function n(s){e.value=s.target.value}return(s,o)=>(x(),A("label",V0,[h("div",H0,[h("span",U0,R(t.label),1)]),h("input",{type:"text",value:e.value,placeholder:t.placeholder,disabled:t.disabled,"aria-invalid":!!t.error,class:de(["w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-800 transition-colors disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-800 dark:text-slate-100",[t.monospace?"font-mono":"",t.error?"border-rose-500 ring-1 ring-rose-500 dark:border-rose-400 dark:ring-rose-400":"border-slate-200 dark:border-slate-700"]]),onInput:n},null,42,z0),t.error?(x(),A("p",q0,R(t.error),1)):ge("",!0)]))}}),K0={class:"space-y-4"},G0={class:"mt-4 grid grid-cols-2 gap-2"},lc=oe({__name:"DatasetPanel",props:{seed:{},custom:{},error:{},canEdit:{type:Boolean}},emits:["update:seed","update:custom","apply","randomize"],setup(t,{emit:e}){const n=e;function s(o){const a=Number(o);Number.isInteger(a)&&n("update:seed",a)}return(o,a)=>(x(),J(ye,{title:"Dataset"},{default:D(()=>[h("div",K0,[C(vt,{label:"Seed",monospace:"","model-value":String(t.seed),disabled:!t.canEdit,"onUpdate:modelValue":s},null,8,["model-value","disabled"]),C(vt,{label:"Custom array",monospace:"",placeholder:"e.g. 5, 3, 9, 1","model-value":t.custom,error:t.error,disabled:!t.canEdit,"onUpdate:modelValue":a[0]||(a[0]=r=>n("update:custom",r))},null,8,["model-value","error","disabled"])]),h("div",G0,[C(ee,{variant:"quiet",disabled:!t.canEdit,onClick:a[1]||(a[1]=r=>n("apply"))},{default:D(()=>[...a[3]||(a[3]=[O("Apply",-1)])]),_:1},8,["disabled"]),C(ee,{variant:"quiet",disabled:!t.canEdit,onClick:a[2]||(a[2]=r=>n("randomize"))},{default:D(()=>[...a[4]||(a[4]=[O("New seed",-1)])]),_:1},8,["disabled"])]),a[5]||(a[5]=h("p",{class:"mt-3 text-xs text-slate-400"},"The same seed always reproduces the same data.",-1))]),_:1}))}}),W0={class:"mb-3 flex flex-wrap items-center gap-x-4 gap-y-2"},Y0={class:"text-xs font-semibold uppercase tracking-wider text-slate-400"},X0={key:0,class:"flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400"},J0={class:"flex min-h-[280px] flex-1 items-end gap-[2px] rounded-xl bg-slate-50 p-3 dark:bg-slate-950/40 sm:gap-1"},Q0={key:0,class:"mb-1 text-[10px] font-medium text-slate-400 sm:text-xs"},lo=oe({__name:"BarChart",props:{array:{},comparing:{default:()=>[]},swapping:{default:()=>[]},sorted:{default:()=>[]},maxValue:{default:1},title:{default:"Visualization"},showLegend:{type:Boolean,default:!0}},setup(t){const e=t,n=E(()=>new Set(e.comparing)),s=E(()=>new Set(e.swapping)),o=E(()=>new Set(e.sorted)),a=E(()=>e.array.length<=25);function r(l){return s.value.has(l)?"bg-rose-500":n.value.has(l)?"bg-amber-400":o.value.has(l)?"bg-emerald-500":"bg-indigo-500/80 dark:bg-indigo-400/80"}function i(l){return`${l/e.maxValue*98+2}%`}return(l,u)=>(x(),J(ye,{class:"flex h-full flex-col"},{default:D(()=>[h("div",W0,[h("h2",Y0,R(t.title),1),t.showLegend?(x(),A("div",X0,[...u[0]||(u[0]=[h("span",{class:"flex items-center gap-1.5"},[h("i",{class:"h-3 w-3 rounded-sm bg-indigo-500/80 dark:bg-indigo-400/80"}),O("Unsorted")],-1),h("span",{class:"flex items-center gap-1.5"},[h("i",{class:"h-3 w-3 rounded-sm bg-amber-400"}),O("Comparing")],-1),h("span",{class:"flex items-center gap-1.5"},[h("i",{class:"h-3 w-3 rounded-sm bg-rose-500"}),O("Swapping")],-1),h("span",{class:"flex items-center gap-1.5"},[h("i",{class:"h-3 w-3 rounded-sm bg-emerald-500"}),O("Sorted")],-1)])])):ge("",!0)]),h("div",J0,[(x(!0),A(ae,null,me(t.array,(c,d)=>(x(),A("div",{key:d,class:"flex flex-1 flex-col items-center justify-end",style:{height:"100%"}},[a.value?(x(),A("span",Q0,R(c),1)):ge("",!0),h("div",{class:de(["w-full rounded-t-sm transition-[height,background-color] duration-150 ease-out",r(d)]),style:on({height:i(c)})},null,6)]))),128))])]),_:1}))}}),Z0={class:"rounded-xl bg-slate-50 p-3 text-center dark:bg-slate-800/50"},eb={class:"font-mono text-xl font-bold text-slate-800 dark:text-slate-100 sm:text-2xl"},tb={class:"mt-0.5 text-[11px] font-medium uppercase tracking-wide text-slate-400"},Mt=oe({__name:"AvStatCell",props:{label:{},value:{}},setup(t){return(e,n)=>(x(),A("div",Z0,[h("div",eb,R(t.value),1),h("div",tb,R(t.label),1)]))}}),nb={class:"grid grid-cols-2 gap-2 sm:grid-cols-4"},uo=oe({__name:"StatsDisplay",props:{comparisons:{},swaps:{},steps:{},elapsedMs:{},status:{}},setup(t){const e=t,n=E(()=>`${(e.elapsedMs/1e3).toFixed(2)}s`),s=E(()=>({idle:"Idle",running:"Running",paused:"Paused",done:"Sorted"})[e.status]??e.status),o=E(()=>({idle:"bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",running:"bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400",paused:"bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400",done:"bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400"})[e.status]),a=E(()=>[{label:"Comparisons",value:e.comparisons.toLocaleString()},{label:"Swaps",value:e.swaps.toLocaleString()},{label:"Steps",value:e.steps.toLocaleString()},{label:"Elapsed",value:n.value}]);return(r,i)=>(x(),J(ye,{title:"Stats"},{header:D(()=>[h("span",{class:de(["rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",o.value])},R(s.value),3)]),default:D(()=>[h("div",nb,[(x(!0),A(ae,null,me(a.value,l=>(x(),J(Mt,{key:l.label,label:l.label,value:l.value},null,8,["label","value"]))),128))])]),_:1}))}}),sb={class:"grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]"},ob={class:"flex flex-col gap-4"},ab={key:0,class:"grid gap-4 lg:grid-cols-2"},rb={class:"flex flex-col gap-4"},ib={class:"flex flex-col gap-4"},lb={key:1,class:"flex flex-col gap-4"},ub=oe({__name:"SortingView",setup(t){const e=qi(),n=zs(),s=qi({syncUrl:!1,audio:!1}),o=F(!1);Gt({cmp:{ref:o,encode:u=>u?"1":null,decode:u=>u==="1"},algo2:{ref:s.algoKey,encode:u=>u,decode:u=>Kt(Zn,u)}}),_e([e.baseArray,o],()=>{o.value&&s.setArray([...e.baseArray.value])},{immediate:!0}),_e(e.speed,u=>s.speed.value=u,{immediate:!0}),_e(o,u=>{u||s.reset()});function a(){e.run(),s.run()}const r=F(""),i=F(null);function l(){const{values:u,error:c}=Tn(r.value);i.value=c,c||e.setArray(u)}return _e(e.size,()=>{e.canEdit.value&&e.generate()}),_e(e.seed,()=>{e.canEdit.value&&e.generate()}),_e(e.algoKey,()=>{e.isDone.value&&e.reset()}),(u,c)=>(x(),A("div",sb,[h("div",ob,[C(xn,{modelValue:f(e).algoKey.value,"onUpdate:modelValue":c[0]||(c[0]=d=>f(e).algoKey.value=d),algorithms:f(Zn),columns:3,disabled:!f(e).canEdit.value},null,8,["modelValue","algorithms","disabled"]),o.value?(x(),J(xn,{key:0,modelValue:f(s).algoKey.value,"onUpdate:modelValue":c[1]||(c[1]=d=>f(s).algoKey.value=d),title:"Compare against",algorithms:f(Zn),columns:3,disabled:!f(e).canEdit.value},null,8,["modelValue","algorithms","disabled"])):ge("",!0),C(_0,{size:f(e).size.value,"onUpdate:size":c[2]||(c[2]=d=>f(e).size.value=d),speed:f(e).speed.value,"onUpdate:speed":c[3]||(c[3]=d=>f(e).speed.value=d),compare:o.value,"onUpdate:compare":c[4]||(c[4]=d=>o.value=d),status:f(e).status.value,"can-edit":f(e).canEdit.value,"is-running":f(e).isRunning.value,"is-paused":f(e).isPaused.value,sound:f(n).enabled.value,volume:f(n).volume.value,"has-sound-cues":f(e).hasSoundCues.value,onGenerate:c[5]||(c[5]=d=>f(e).generate()),onRun:c[6]||(c[6]=d=>f(e).run()),onRunBoth:c[7]||(c[7]=d=>a()),onPause:c[8]||(c[8]=d=>{f(e).pause(),f(s).pause()}),onReset:c[9]||(c[9]=d=>{f(e).reset(),f(s).reset()}),"onUpdate:sound":c[10]||(c[10]=d=>f(n).toggle()),"onUpdate:volume":c[11]||(c[11]=d=>f(n).setVolume(d))},null,8,["size","speed","compare","status","can-edit","is-running","is-paused","sound","volume","has-sound-cues"]),C(lc,{custom:r.value,"onUpdate:custom":c[12]||(c[12]=d=>r.value=d),seed:f(e).seed.value,error:i.value,"can-edit":f(e).canEdit.value,"onUpdate:seed":c[13]||(c[13]=d=>f(e).seed.value=d),onApply:c[14]||(c[14]=d=>l()),onRandomize:c[15]||(c[15]=d=>f(e).randomizeSeed())},null,8,["custom","seed","error","can-edit"]),C(gn,{cursor:f(e).cursor.value,"buffered-count":f(e).bufferedCount.value,"fully-buffered":f(e).fullyBuffered.value,"can-step-back":f(e).canStepBack.value,"can-step-forward":f(e).canStepForward.value,onSeek:c[16]||(c[16]=d=>f(e).seek(d)),onStepBack:c[17]||(c[17]=d=>f(e).stepBack()),onStepForward:c[18]||(c[18]=d=>f(e).stepForward()),onSkipToEnd:c[19]||(c[19]=d=>f(e).skipToEnd())},null,8,["cursor","buffered-count","fully-buffered","can-step-back","can-step-forward"]),C(Yo,{lines:f(p0)[f(e).algoKey.value]??[],"active-line":f(e).activeLine.value,source:f(e).sourceCode.value.text,"source-file":f(e).sourceCode.value.file,"active-source-lines":f(e).activeSourceLines.value},null,8,["lines","active-line","source","source-file","active-source-lines"])]),o.value?(x(),A("div",ab,[h("div",rb,[C(uo,{comparisons:f(e).stats.comparisons,swaps:f(e).stats.swaps,steps:f(e).stepCount.value,"elapsed-ms":f(e).elapsedMs.value,status:f(e).status.value},null,8,["comparisons","swaps","steps","elapsed-ms","status"]),C(lo,{class:"flex-1",title:f(e).currentAlgo.value.name,array:f(e).array.value,comparing:f(e).highlights.comparing,swapping:f(e).highlights.swapping,sorted:f(e).highlights.sorted,"max-value":f(e).maxValue.value},null,8,["title","array","comparing","swapping","sorted","max-value"])]),h("div",ib,[C(uo,{comparisons:f(s).stats.comparisons,swaps:f(s).stats.swaps,steps:f(s).stepCount.value,"elapsed-ms":f(s).elapsedMs.value,status:f(s).status.value},null,8,["comparisons","swaps","steps","elapsed-ms","status"]),C(lo,{class:"flex-1",title:f(s).currentAlgo.value.name,"show-legend":!1,array:f(s).array.value,comparing:f(s).highlights.comparing,swapping:f(s).highlights.swapping,sorted:f(s).highlights.sorted,"max-value":f(s).maxValue.value},null,8,["title","array","comparing","swapping","sorted","max-value"])])])):(x(),A("div",lb,[C(uo,{comparisons:f(e).stats.comparisons,swaps:f(e).stats.swaps,steps:f(e).stepCount.value,"elapsed-ms":f(e).elapsedMs.value,status:f(e).status.value},null,8,["comparisons","swaps","steps","elapsed-ms","status"]),C(lo,{class:"flex-1",array:f(e).array.value,comparing:f(e).highlights.comparing,swapping:f(e).highlights.swapping,sorted:f(e).highlights.sorted,"max-value":f(e).maxValue.value},null,8,["array","comparing","swapping","sorted","max-value"])]))]))}});function cb(){const t=F(20),e=F(60),n=F("binary"),s=F(Ue()),o=F(0),a=F([]),r=Pe({low:null,high:null,mid:null,checking:null}),i=F(null),l=Pe({comparisons:0});let u=[];const c=E(()=>Ho[n.value]),d=F(1);function p(N){const G=rt(s.value);return Array.from({length:N},()=>G.int(1,99)).sort((j,P)=>j-P)}function m(){r.low=null,r.high=null,r.mid=null,r.checking=null}function y(){l.comparisons=0}function g(N=rt(Ue())){u.length!==0&&(o.value=u[N.int(0,u.length-1)])}function v(){const N=new Set(u);for(let G=0;G<=100;G++)if(!N.has(G)){o.value=G;return}o.value=-1}const b=fn({speed:e,createGenerator:()=>(a.value=[...u],m(),y(),i.value=null,c.value.generator([...u],o.value)),applyStep:N=>{a.value=N.array,r.low=N.low,r.high=N.high,r.mid=N.mid,r.checking=N.checking,i.value=N.foundIndex,l.comparisons=N.comparisons},clearStep:()=>{a.value=[...u],m(),y(),i.value=null}});function w(N=!1){u=p(t.value),a.value=[...u],d.value=Math.max(...u,1),b.reset(),N||g(rt(s.value))}function k(N){N.length!==0&&(u=[...N].sort((G,j)=>G-j),a.value=[...u],t.value=u.length,d.value=Math.max(...u,1),b.reset(),g(rt(s.value)))}function T(){s.value=Ue(),w()}const{hydrated:_}=Gt(Jg({algoKey:n,size:t,speed:e,seed:s,target:o}));return w(_.has("target")),{size:t,speed:e,algoKey:n,seed:s,target:o,array:a,highlights:r,foundIndex:i,stats:l,maxValue:d,currentAlgo:c,status:b.status,isRunning:b.isRunning,isPaused:b.isPaused,isDone:b.isDone,canEdit:b.canEdit,delayMs:b.delayMs,elapsedMs:b.elapsedMs,stepCount:b.stepCount,cursor:b.cursor,bufferedCount:b.bufferedCount,fullyBuffered:b.fullyBuffered,current:b.current,canStepBack:b.canStepBack,canStepForward:b.canStepForward,generate:w,randomizeSeed:T,setArray:k,pickPresentTarget:g,pickMissingTarget:v,run:b.run,pause:b.pause,reset:b.reset,stepForward:b.stepForward,stepBack:b.stepBack,seek:b.seek,skipToEnd:b.skipToEnd}}const db={class:"space-y-4"},pb={class:"block"},fb=["value","disabled"],hb={class:"mt-3 grid grid-cols-2 gap-2"},mb={class:"mt-5 grid grid-cols-2 gap-2"},gb=oe({__name:"SearchControls",props:{size:{},speed:{},target:{},status:{},canEdit:{type:Boolean},isRunning:{type:Boolean},isPaused:{type:Boolean}},emits:["update:size","update:speed","update:target","pick-present-target","pick-missing-target","generate","run","pause","reset"],setup(t,{emit:e}){const n=e,s=o=>n("update:target",Number(o.target.value));return(o,a)=>(x(),J(ye,{title:"Controls"},{default:D(()=>[h("div",db,[C(Ve,{label:"Array size","model-value":t.size,min:10,max:50,disabled:!t.canEdit,"onUpdate:modelValue":a[0]||(a[0]=r=>n("update:size",r))},null,8,["model-value","disabled"]),C(Ve,{label:"Speed","model-value":t.speed,min:1,max:100,suffix:"%","onUpdate:modelValue":a[1]||(a[1]=r=>n("update:speed",r))},null,8,["model-value"]),h("label",pb,[a[8]||(a[8]=h("div",{class:"mb-1.5 flex items-center justify-between text-sm"},[h("span",{class:"font-medium text-slate-600 dark:text-slate-300"},"Target")],-1)),h("input",{type:"number",value:t.target,disabled:!t.canEdit,class:"w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100",onInput:s},null,40,fb)])]),h("div",hb,[C(ee,{variant:"quiet",disabled:!t.canEdit,onClick:a[2]||(a[2]=r=>n("pick-present-target"))},{default:D(()=>[...a[9]||(a[9]=[O(" Random present target ",-1)])]),_:1},8,["disabled"]),C(ee,{variant:"quiet",disabled:!t.canEdit,onClick:a[3]||(a[3]=r=>n("pick-missing-target"))},{default:D(()=>[...a[10]||(a[10]=[O(" Random missing target ",-1)])]),_:1},8,["disabled"])]),h("div",mb,[t.isRunning?(x(),J(ee,{key:1,variant:"warning",class:"col-span-2",onClick:a[5]||(a[5]=r=>n("pause"))},{default:D(()=>[...a[12]||(a[12]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M6 4h4v16H6zM14 4h4v16h-4z"})],-1),O(" Pause ",-1)])]),_:1})):(x(),J(ee,{key:0,variant:"primary",class:"col-span-2",onClick:a[4]||(a[4]=r=>n("run"))},{default:D(()=>[a[11]||(a[11]=h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M8 5v14l11-7z"})],-1)),O(" "+R(t.isPaused?"Resume":"Run"),1)]),_:1})),C(ee,{variant:"neutral",onClick:a[6]||(a[6]=r=>n("reset"))},{default:D(()=>[...a[13]||(a[13]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.36 2.64L3 8"}),h("path",{d:"M3 3v5h5"})],-1),O(" Reset ",-1)])]),_:1}),C(ee,{variant:"neutral",disabled:!t.canEdit,onClick:a[7]||(a[7]=r=>n("generate"))},{default:D(()=>[...a[14]||(a[14]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"})],-1),O(" Shuffle ",-1)])]),_:1},8,["disabled"])]),a[15]||(a[15]=h("p",{class:"mt-3 text-center text-xs text-slate-400"}," Size, algorithm & target lock while a search is running. ",-1))]),_:1}))}}),bb={class:"flex min-h-[280px] flex-1 items-end gap-[2px] rounded-xl bg-slate-50 p-3 dark:bg-slate-950/40 sm:gap-1"},vb={key:0,class:"mb-1 text-[10px] font-medium text-slate-400 sm:text-xs"},yb=oe({__name:"SearchBarChart",props:{array:{},low:{default:null},high:{default:null},checking:{default:null},foundIndex:{default:null},maxValue:{default:1}},setup(t){const e=t,n=E(()=>e.array.length<=25),s=E(()=>e.low!==null&&e.high!==null&&!(e.low===0&&e.high===e.array.length-1));function o(r){return e.foundIndex!==null&&r===e.foundIndex?"bg-emerald-500":e.checking!==null&&r===e.checking?"bg-amber-400":s.value&&r>=e.low&&r<=e.high?"bg-indigo-300 dark:bg-indigo-600":"bg-indigo-500/80 dark:bg-indigo-400/80"}function a(r){return`${r/e.maxValue*98+2}%`}return(r,i)=>(x(),J(ye,{class:"flex h-full flex-col"},{default:D(()=>[i[0]||(i[0]=h("div",{class:"mb-3 flex flex-wrap items-center gap-x-4 gap-y-2"},[h("h2",{class:"text-xs font-semibold uppercase tracking-wider text-slate-400"},"Visualization"),h("div",{class:"flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400"},[h("span",{class:"flex items-center gap-1.5"},[h("i",{class:"h-3 w-3 rounded-sm bg-indigo-500/80 dark:bg-indigo-400/80"}),O("Default")]),h("span",{class:"flex items-center gap-1.5"},[h("i",{class:"h-3 w-3 rounded-sm bg-indigo-300 dark:bg-indigo-600"}),O("Active range")]),h("span",{class:"flex items-center gap-1.5"},[h("i",{class:"h-3 w-3 rounded-sm bg-amber-400"}),O("Checking")]),h("span",{class:"flex items-center gap-1.5"},[h("i",{class:"h-3 w-3 rounded-sm bg-emerald-500"}),O("Found")])])],-1)),h("div",bb,[(x(!0),A(ae,null,me(t.array,(l,u)=>(x(),A("div",{key:u,class:"flex flex-1 flex-col items-center justify-end",style:{height:"100%"}},[n.value?(x(),A("span",vb,R(l),1)):ge("",!0),h("div",{class:de(["w-full rounded-t-sm transition-[height,background-color] duration-150 ease-out",o(u)]),style:on({height:a(l)})},null,6)]))),128))])]),_:1}))}}),wb={class:"grid grid-cols-3 gap-2"},xb=oe({__name:"SearchStats",props:{comparisons:{},steps:{},elapsedMs:{},status:{},foundIndex:{default:null}},setup(t){const e=t,n=E(()=>`${(e.elapsedMs/1e3).toFixed(2)}s`),s=E(()=>({idle:"Idle",running:"Running",paused:"Paused",done:"Done"})[e.status]??e.status),o=E(()=>({idle:"bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",running:"bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400",paused:"bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400",done:"bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400"})[e.status]),a=E(()=>[{label:"Comparisons",value:e.comparisons.toLocaleString()},{label:"Steps",value:e.steps.toLocaleString()},{label:"Elapsed",value:n.value}]),r=E(()=>e.status==="done"),i=E(()=>e.foundIndex!==null);return(l,u)=>(x(),J(ye,{title:"Stats"},{header:D(()=>[h("span",{class:de(["rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",o.value])},R(s.value),3)]),default:D(()=>[r.value?(x(),A("div",{key:0,class:de(["mb-3 rounded-xl p-3 text-center text-sm font-semibold",i.value?"bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400":"bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"])},R(i.value?`Found at index ${t.foundIndex}`:"Not found"),3)):ge("",!0),h("div",wb,[(x(!0),A(ae,null,me(a.value,c=>(x(),J(Mt,{key:c.label,label:c.label,value:c.value},null,8,["label","value"]))),128))])]),_:1}))}}),kb={class:"grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]"},Sb={class:"flex flex-col gap-4"},$b={class:"flex flex-col gap-4"},Eb=oe({__name:"SearchView",setup(t){const e=cb(),n=F(""),s=F(null);function o(){const{values:a,error:r}=Tn(n.value);s.value=r,r||e.setArray(a)}return _e(e.size,()=>{e.canEdit.value&&e.generate()}),_e(e.seed,()=>{e.canEdit.value&&e.generate()}),_e(e.algoKey,()=>{e.isDone.value&&e.reset()}),(a,r)=>(x(),A("div",kb,[h("div",Sb,[C(xn,{modelValue:f(e).algoKey.value,"onUpdate:modelValue":r[0]||(r[0]=i=>f(e).algoKey.value=i),algorithms:f(Ho),columns:3,disabled:!f(e).canEdit.value},null,8,["modelValue","algorithms","disabled"]),C(gb,{size:f(e).size.value,"onUpdate:size":r[1]||(r[1]=i=>f(e).size.value=i),speed:f(e).speed.value,"onUpdate:speed":r[2]||(r[2]=i=>f(e).speed.value=i),target:f(e).target.value,"onUpdate:target":r[3]||(r[3]=i=>f(e).target.value=i),status:f(e).status.value,"can-edit":f(e).canEdit.value,"is-running":f(e).isRunning.value,"is-paused":f(e).isPaused.value,onPickPresentTarget:r[4]||(r[4]=i=>f(e).pickPresentTarget()),onPickMissingTarget:r[5]||(r[5]=i=>f(e).pickMissingTarget()),onGenerate:r[6]||(r[6]=i=>f(e).generate()),onRun:r[7]||(r[7]=i=>f(e).run()),onPause:r[8]||(r[8]=i=>f(e).pause()),onReset:r[9]||(r[9]=i=>f(e).reset())},null,8,["size","speed","target","status","can-edit","is-running","is-paused"]),C(lc,{custom:n.value,"onUpdate:custom":r[10]||(r[10]=i=>n.value=i),seed:f(e).seed.value,error:s.value,"can-edit":f(e).canEdit.value,"onUpdate:seed":r[11]||(r[11]=i=>f(e).seed.value=i),onApply:r[12]||(r[12]=i=>o()),onRandomize:r[13]||(r[13]=i=>f(e).randomizeSeed())},null,8,["custom","seed","error","can-edit"]),C(gn,{cursor:f(e).cursor.value,"buffered-count":f(e).bufferedCount.value,"fully-buffered":f(e).fullyBuffered.value,"can-step-back":f(e).canStepBack.value,"can-step-forward":f(e).canStepForward.value,onSeek:r[14]||(r[14]=i=>f(e).seek(i)),onStepBack:r[15]||(r[15]=i=>f(e).stepBack()),onStepForward:r[16]||(r[16]=i=>f(e).stepForward()),onSkipToEnd:r[17]||(r[17]=i=>f(e).skipToEnd())},null,8,["cursor","buffered-count","fully-buffered","can-step-back","can-step-forward"])]),h("div",$b,[C(xb,{comparisons:f(e).stats.comparisons,steps:f(e).stepCount.value,"elapsed-ms":f(e).elapsedMs.value,status:f(e).status.value,"found-index":f(e).foundIndex.value},null,8,["comparisons","steps","elapsed-ms","status","found-index"]),C(yb,{class:"flex-1",array:f(e).array.value,low:f(e).highlights.low,high:f(e).highlights.high,checking:f(e).highlights.checking,"found-index":f(e).foundIndex.value,"max-value":f(e).maxValue.value},null,8,["array","low","high","checking","found-index","max-value"])])]))}}),Vn=15,fs=25,so=(t,e)=>`${t},${e}`;function Cb(){const t=F(60),e=F("bfs"),n=Pe(new Set),s=Pe({row:Math.floor(Vn/2),col:0}),o=Pe({row:Math.floor(Vn/2),col:fs-1}),a=F(Ue());Gt(Qg({algoKey:e,speed:t,seed:a,start:Ni(s),end:Ni(o)},{rows:Vn,cols:fs}));const r=F([]),i=F([]),l=F([]),u=Pe({visitedCount:0,pathLength:0}),c=E(()=>Uo[e.value]);function d(N,G){return s.row===N&&s.col===G}function p(N,G){return o.row===N&&o.col===G}function m(){const N=Array.from({length:Vn},()=>Array(fs).fill(0));for(const G of n){const[j,P]=G.split(",").map(Number);N[j][P]=1}return N}function y(){r.value=[],i.value=[],l.value=[]}function g(){u.visitedCount=0,u.pathLength=0}const v=fn({speed:t,createGenerator:()=>(y(),g(),c.value.generator(m(),{...s},{...o})),applyStep:N=>{r.value=N.visited,i.value=N.frontier,l.value=N.path,u.visitedCount=N.visited.length,u.pathLength=N.path.length},clearStep:()=>{y(),g()}});function b(N,G){if(!v.canEdit.value||d(N,G)||p(N,G))return;const j=so(N,G);n.has(j)?n.delete(j):n.add(j),v.isDone.value&&v.reset()}function w(){v.canEdit.value&&(n.clear(),v.reset())}function k(N,G){v.canEdit.value&&(p(N,G)||n.has(so(N,G))||(s.row=N,s.col=G,v.reset()))}function T(N,G){v.canEdit.value&&(d(N,G)||n.has(so(N,G))||(o.row=N,o.col=G,v.reset()))}function _(N=.25){if(!v.canEdit.value)return;const G=rt(a.value);n.clear();for(let j=0;j<Vn;j++)for(let P=0;P<fs;P++)d(j,P)||p(j,P)||G.next()<N&&n.add(so(j,P));v.reset()}return{rows:Vn,cols:fs,speed:t,algoKey:e,walls:n,start:s,end:o,seed:a,visited:r,frontier:i,path:l,stats:u,currentAlgo:c,status:v.status,isRunning:v.isRunning,isPaused:v.isPaused,isDone:v.isDone,canEdit:v.canEdit,delayMs:v.delayMs,elapsedMs:v.elapsedMs,stepCount:v.stepCount,cursor:v.cursor,bufferedCount:v.bufferedCount,fullyBuffered:v.fullyBuffered,current:v.current,canStepBack:v.canStepBack,canStepForward:v.canStepForward,toggleWall:b,clearWalls:w,placeStart:k,placeEnd:T,randomizeWalls:_,run:v.run,pause:v.pause,reset:v.reset,stepForward:v.stepForward,stepBack:v.stepBack,seek:v.seek,skipToEnd:v.skipToEnd}}const Ab={class:"mt-5 grid grid-cols-2 gap-2"},Tb=oe({__name:"PathfindingControls",props:{speed:{},status:{},canEdit:{type:Boolean},isRunning:{type:Boolean},isPaused:{type:Boolean}},emits:["update:speed","run","pause","reset","clear-walls","randomize-walls"],setup(t,{emit:e}){const n=e;return(s,o)=>(x(),J(ye,{title:"Controls"},{default:D(()=>[C(Ve,{label:"Speed","model-value":t.speed,min:1,max:100,suffix:"%","onUpdate:modelValue":o[0]||(o[0]=a=>n("update:speed",a))},null,8,["model-value"]),h("div",Ab,[t.isRunning?(x(),J(ee,{key:1,variant:"warning",class:"col-span-2",onClick:o[2]||(o[2]=a=>n("pause"))},{default:D(()=>[...o[7]||(o[7]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M6 4h4v16H6zM14 4h4v16h-4z"})],-1),O(" Pause ",-1)])]),_:1})):(x(),J(ee,{key:0,variant:"primary",class:"col-span-2",onClick:o[1]||(o[1]=a=>n("run"))},{default:D(()=>[o[6]||(o[6]=h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M8 5v14l11-7z"})],-1)),O(" "+R(t.isPaused?"Resume":"Run"),1)]),_:1})),C(ee,{variant:"neutral",onClick:o[3]||(o[3]=a=>n("reset"))},{default:D(()=>[...o[8]||(o[8]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.36 2.64L3 8"}),h("path",{d:"M3 3v5h5"})],-1),O(" Reset ",-1)])]),_:1}),C(ee,{variant:"neutral",disabled:!t.canEdit,onClick:o[4]||(o[4]=a=>n("clear-walls"))},{default:D(()=>[...o[9]||(o[9]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m2 0-1 14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1L5 6"})],-1),O(" Clear Walls ",-1)])]),_:1},8,["disabled"]),C(ee,{variant:"neutral",disabled:!t.canEdit,class:"col-span-2",onClick:o[5]||(o[5]=a=>n("randomize-walls"))},{default:D(()=>[...o[10]||(o[10]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"})],-1),O(" Random Walls ",-1)])]),_:1},8,["disabled"])]),o[11]||(o[11]=h("p",{class:"mt-3 text-center text-xs text-slate-400"}," Walls, start, and end lock while a search is running. ",-1))]),_:1}))}}),Ob={class:"mb-3 grid grid-cols-3 gap-2"},Mb=["aria-label"],Rb=["data-key","tabindex","aria-label","onPointerdown","onPointerenter","onKeydown"],Ib={key:0,class:"flex h-[70%] w-[70%] items-center justify-center rounded-full bg-green-500 text-[8px] font-bold text-white shadow"},_b={key:1,class:"flex h-[70%] w-[70%] items-center justify-center rounded-full bg-rose-600 text-[8px] font-bold text-white shadow"},jb=oe({__name:"GridCanvas",props:{rows:{},cols:{},walls:{},start:{},end:{},visited:{default:()=>[]},frontier:{default:()=>[]},path:{default:()=>[]},canEdit:{type:Boolean}},emits:["toggle-wall","place-start","place-end"],setup(t,{emit:e}){const n=t,s=e,o=(L,z)=>`${L},${z}`,a=F("wall"),r={wall:"Draw Walls",start:"Move Start",end:"Move End"},i=Object.entries(r),l=E(()=>new Set(n.visited.map(L=>o(L.row,L.col)))),u=E(()=>new Set(n.frontier.map(L=>o(L.row,L.col)))),c=E(()=>new Set(n.path.map(L=>o(L.row,L.col)))),d=E(()=>{const L=[];for(let z=0;z<n.rows;z++){const ie=[];for(let W=0;W<n.cols;W++)ie.push({row:z,col:W,key:o(z,W)});L.push(ie)}return L});function p(L,z){return n.start.row===L&&n.start.col===z}function m(L,z){return n.end.row===L&&n.end.col===z}function y(L){const z=L.key;return n.walls.has(z)?"bg-slate-900 dark:bg-black":c.value.has(z)?"bg-emerald-500":u.value.has(z)?"bg-amber-400":l.value.has(z)?"bg-sky-400/80":"bg-slate-100 dark:bg-slate-800/50"}function g(L){return p(L.row,L.col)?"start":m(L.row,L.col)?"end":n.walls.has(L.key)?"wall":c.value.has(L.key)?"path":u.value.has(L.key)?"frontier":l.value.has(L.key)?"visited":"empty"}function v(L){return`Row ${L.row+1}, column ${L.col+1}, ${g(L)}`}const b=E(()=>`Pathfinding grid, ${r[a.value]} mode`),w=F(!1);let k=!0;function T(){w.value=!1}dr(()=>{window.addEventListener("pointerup",T),window.addEventListener("pointercancel",T)}),pr(()=>{window.removeEventListener("pointerup",T),window.removeEventListener("pointercancel",T)});const _=F({row:0,col:0}),N=F(null),G=(L,z)=>Math.min(Math.max(L,0),z-1);function j(L,z){var ie,W;_.value={row:L,col:z},(W=(ie=N.value)==null?void 0:ie.querySelector(`[data-key="${L},${z}"]`))==null||W.focus()}function P(L,z,ie){j(G(L.row+z,n.rows),G(L.col+ie,n.cols))}function I(L){if(n.canEdit){if(_.value={row:L.row,col:L.col},a.value==="start"){s("place-start",{row:L.row,col:L.col});return}if(a.value==="end"){s("place-end",{row:L.row,col:L.col});return}p(L.row,L.col)||m(L.row,L.col)||(k=!n.walls.has(L.key),s("toggle-wall",{row:L.row,col:L.col}),w.value=!0)}}function he(L,z){var ie,W;(W=(ie=L.currentTarget).releasePointerCapture)==null||W.call(ie,L.pointerId),I(z)}function ke(L){I(L),w.value=!1}function q(L){if(!n.canEdit||a.value!=="wall"||!w.value||p(L.row,L.col)||m(L.row,L.col))return;n.walls.has(L.key)!==k&&s("toggle-wall",{row:L.row,col:L.col})}return(L,z)=>(x(),J(ye,{class:"flex h-full flex-col"},{default:D(()=>[z[1]||(z[1]=h("div",{class:"mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2"},[h("h2",{class:"text-xs font-semibold uppercase tracking-wider text-slate-400"},"Grid"),h("div",{class:"flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400"},[h("span",{class:"flex items-center gap-1.5"},[h("i",{class:"h-3 w-3 rounded-sm bg-slate-900 dark:bg-black"}),O("Wall")]),h("span",{class:"flex items-center gap-1.5"},[h("i",{class:"h-3 w-3 rounded-sm bg-amber-400"}),O("Frontier")]),h("span",{class:"flex items-center gap-1.5"},[h("i",{class:"h-3 w-3 rounded-sm bg-sky-400/80"}),O("Visited")]),h("span",{class:"flex items-center gap-1.5"},[h("i",{class:"h-3 w-3 rounded-sm bg-emerald-500"}),O("Path")])])],-1)),h("div",Ob,[(x(!0),A(ae,null,me(f(i),([ie,W])=>(x(),J(ee,{key:ie,variant:"toggle",active:a.value===ie,disabled:!t.canEdit,onClick:X=>a.value=ie},{default:D(()=>[O(R(W),1)]),_:2},1032,["active","disabled","onClick"]))),128))]),h("div",{ref_key:"gridEl",ref:N,role:"grid","aria-label":b.value,"aria-describedby":"grid-help",class:de(["grid flex-1 select-none gap-px rounded-xl bg-slate-200 p-1 dark:bg-slate-800",t.canEdit?"touch-none":""]),style:on({gridTemplateColumns:`repeat(${t.cols}, minmax(0, 1fr))`,gridTemplateRows:`repeat(${t.rows}, minmax(0, 1fr))`,aspectRatio:`${t.cols} / ${t.rows}`}),onDragstart:z[0]||(z[0]=Xt(()=>{},["prevent"]))},[(x(!0),A(ae,null,me(d.value,(ie,W)=>(x(),A("div",{key:W,role:"row",class:"contents"},[(x(!0),A(ae,null,me(ie,X=>(x(),A("div",{key:X.key,role:"gridcell","data-key":X.key,tabindex:_.value.row===X.row&&_.value.col===X.col?0:-1,"aria-label":v(X),class:de(["relative flex items-center justify-center rounded-[2px] transition-colors duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500",[y(X),t.canEdit?"cursor-pointer":"cursor-default"]]),onPointerdown:Xt(we=>he(we,X),["prevent"]),onPointerenter:we=>q(X),onKeydown:[At(Xt(we=>P(X,-1,0),["prevent"]),["up"]),At(Xt(we=>P(X,1,0),["prevent"]),["down"]),At(Xt(we=>P(X,0,-1),["prevent"]),["left"]),At(Xt(we=>P(X,0,1),["prevent"]),["right"]),At(Xt(we=>j(X.row,0),["prevent"]),["home"]),At(Xt(we=>j(X.row,t.cols-1),["prevent"]),["end"]),At(Xt(we=>ke(X),["prevent"]),["space"]),At(we=>ke(X),["enter"])]},[p(X.row,X.col)?(x(),A("span",Ib,"S")):m(X.row,X.col)?(x(),A("span",_b,"E")):ge("",!0)],42,Rb))),128))]))),128))],46,Mb),z[2]||(z[2]=h("p",{id:"grid-help",class:"mt-3 text-center text-xs text-slate-400"}," Drag or press Space to draw walls. Arrow keys move, Enter places. Switch mode to relocate start/end. ",-1))]),_:1}))}}),Db={class:"grid grid-cols-3 gap-2"},Pb={key:0,class:"mt-3 rounded-xl bg-emerald-50 px-3 py-2 text-center text-sm font-semibold text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"},Lb={key:1,class:"mt-3 rounded-xl bg-amber-50 px-3 py-2 text-center text-sm font-semibold text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"},Nb=oe({__name:"PathfindingStats",props:{visitedCount:{},pathLength:{},elapsedMs:{},status:{}},setup(t){const e=t,n=E(()=>`${(e.elapsedMs/1e3).toFixed(2)}s`),s=E(()=>({idle:"Idle",running:"Running",paused:"Paused",done:"Finished"})[e.status]??e.status),o=E(()=>({idle:"bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",running:"bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400",paused:"bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400",done:"bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400"})[e.status]),a=E(()=>[{label:"Visited",value:e.visitedCount.toLocaleString()},{label:"Path Length",value:e.pathLength.toLocaleString()},{label:"Elapsed",value:n.value}]),r=E(()=>e.status==="done"&&e.pathLength>0),i=E(()=>e.status==="done"&&e.pathLength===0),l=E(()=>Math.max(e.pathLength-1,0));return(u,c)=>(x(),J(ye,{title:"Stats"},{header:D(()=>[h("span",{class:de(["rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",o.value])},R(s.value),3)]),default:D(()=>[h("div",Db,[(x(!0),A(ae,null,me(a.value,d=>(x(),J(Mt,{key:d.label,label:d.label,value:d.value},null,8,["label","value"]))),128))]),r.value?(x(),A("div",Pb," Path found ("+R(l.value)+" steps) ",1)):i.value?(x(),A("div",Lb," No path exists ")):ge("",!0)]),_:1}))}}),Bb={class:"grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]"},Fb={class:"flex flex-col gap-4"},Vb={class:"flex flex-col gap-4"},Hb=oe({__name:"PathfindingView",setup(t){const e=Cb();return _e(e.algoKey,()=>{e.isDone.value&&e.reset()}),(n,s)=>(x(),A("div",Bb,[h("div",Fb,[C(xn,{modelValue:f(e).algoKey.value,"onUpdate:modelValue":s[0]||(s[0]=o=>f(e).algoKey.value=o),algorithms:f(Uo),columns:3,disabled:!f(e).canEdit.value},null,8,["modelValue","algorithms","disabled"]),C(Tb,{speed:f(e).speed.value,"onUpdate:speed":s[1]||(s[1]=o=>f(e).speed.value=o),status:f(e).status.value,"can-edit":f(e).canEdit.value,"is-running":f(e).isRunning.value,"is-paused":f(e).isPaused.value,onRun:s[2]||(s[2]=o=>f(e).run()),onPause:s[3]||(s[3]=o=>f(e).pause()),onReset:s[4]||(s[4]=o=>f(e).reset()),onClearWalls:s[5]||(s[5]=o=>f(e).clearWalls()),onRandomizeWalls:s[6]||(s[6]=o=>f(e).randomizeWalls())},null,8,["speed","status","can-edit","is-running","is-paused"]),C(gn,{cursor:f(e).cursor.value,"buffered-count":f(e).bufferedCount.value,"fully-buffered":f(e).fullyBuffered.value,"can-step-back":f(e).canStepBack.value,"can-step-forward":f(e).canStepForward.value,onSeek:s[7]||(s[7]=o=>f(e).seek(o)),onStepBack:s[8]||(s[8]=o=>f(e).stepBack()),onStepForward:s[9]||(s[9]=o=>f(e).stepForward()),onSkipToEnd:s[10]||(s[10]=o=>f(e).skipToEnd())},null,8,["cursor","buffered-count","fully-buffered","can-step-back","can-step-forward"])]),h("div",Vb,[C(Nb,{"visited-count":f(e).stats.visitedCount,"path-length":f(e).stats.pathLength,"elapsed-ms":f(e).elapsedMs.value,status:f(e).status.value},null,8,["visited-count","path-length","elapsed-ms","status"]),C(jb,{class:"flex-1",rows:f(e).rows,cols:f(e).cols,walls:f(e).walls,start:f(e).start,end:f(e).end,visited:f(e).visited.value,frontier:f(e).frontier.value,path:f(e).path.value,"can-edit":f(e).canEdit.value,onToggleWall:s[11]||(s[11]=o=>f(e).toggleWall(o.row,o.col)),onPlaceStart:s[12]||(s[12]=o=>f(e).placeStart(o.row,o.col)),onPlaceEnd:s[13]||(s[13]=o=>f(e).placeEnd(o.row,o.col))},null,8,["rows","cols","walls","start","end","visited","frontier","path","can-edit"])])]))}});let Ub=1;function va(t){return{id:Ub++,value:t,left:null,right:null}}function yt(t){return t?{id:t.id,value:t.value,left:yt(t.left),right:yt(t.right)}:null}function*Ki(t,e){const n=yt(t);if(!n){const o=va(e);yield{tree:yt(o),visiting:o.id,phase:"inserted",done:!0};return}let s=n;for(;;)if(yield{tree:yt(n),visiting:s.id,phase:"searching",done:!1},e<s.value){if(!s.left){s.left=va(e),yield{tree:yt(n),visiting:s.left.id,phase:"inserted",done:!0};return}s=s.left}else{if(!s.right){s.right=va(e),yield{tree:yt(n),visiting:s.right.id,phase:"inserted",done:!0};return}s=s.right}}function*zb(t,e){const n=yt(t);let s=n,o=null;for(;s&&s.value!==e;)yield{tree:yt(n),visiting:s.id,phase:"searching",done:!1},o=s,s=e<s.value?s.left:s.right;if(!s){yield{tree:yt(n),visiting:null,phase:"not-found",done:!0};return}yield{tree:yt(n),visiting:s.id,phase:"removing",done:!1};const a=s.id;if(s.left&&s.right){let r=s,i=s.right;for(;i.left;)r=i,i=i.left;s.value=i.value,r.left===i?r.left=i.right:r.right=i.right}else{const r=s.left||s.right;if(!o){yield{tree:r?yt(r):null,visiting:null,phase:"deleted",done:!0};return}o.left===s?o.left=r:o.right=r}yield{tree:yt(n),visiting:a,phase:"deleted",done:!0}}function qb(){const t=F(null),e=F("idle"),n=F(60),s=Pe({comparisons:0,steps:0}),o=F(null),a=F(null),r=F(Ue());let i=null;const l=xr(n),u=E(()=>e.value!=="running");function c(){i!==null&&(clearTimeout(i),i=null)}function d(){s.comparisons=0,s.steps=0}function p(w){t.value=w.tree,o.value=w.visiting??null,a.value=w.phase,w.phase==="searching"&&(s.comparisons+=1),s.steps+=1}function m(w,k){d(),e.value="running";function T(){const{value:_,done:N}=w.next();if(N||!_){e.value="done";return}if(p(_),_.done){e.value="done";return}i=setTimeout(T,l.value)}T()}function y(w){u.value&&(typeof w!="number"||!Number.isFinite(w)||m(Ki(t.value,w)))}function g(w){u.value&&(typeof w!="number"||!Number.isFinite(w)||m(zb(t.value,w)))}function v(){c(),t.value=null,o.value=null,a.value=null,d(),e.value="idle"}function b(w){if(!u.value)return;c();const k=Math.min(Math.max(0,Math.floor(w)),200),T=new Set;let _=t.value,N=0;const G=rt(r.value);for(;T.size<k&&N<k*50+100;){N+=1;const j=G.int(1,999);if(T.has(j))continue;T.add(j);let P;for(const I of Ki(_,j))P=I;_=P.tree}t.value=_,o.value=null,a.value=null,d(),e.value="idle"}return Io(c),{tree:t,status:e,speed:n,stats:s,visiting:o,phase:a,seedValue:r,canEdit:u,insert:y,remove:g,reset:v,seed:b}}const Kb={class:"block"},Gb=["disabled"],Wb={class:"mt-3 grid grid-cols-2 gap-2"},Yb={class:"mt-4 grid grid-cols-2 gap-2"},Xb=oe({__name:"BstControls",props:{canEdit:{type:Boolean},speed:{}},emits:["insert","remove","seed","reset","update:speed"],setup(t,{emit:e}){const n=t,s=e,o=F(""),a=E(()=>String(o.value).trim()===""?!1:Number.isFinite(Number(o.value)));function r(){!a.value||!n.canEdit||(s("insert",Number(o.value)),o.value="")}function i(){!a.value||!n.canEdit||(s("remove",Number(o.value)),o.value="")}return(l,u)=>(x(),J(ye,{title:"BST Controls"},{default:D(()=>[h("label",Kb,[u[4]||(u[4]=h("span",{class:"mb-1.5 block text-sm font-medium text-slate-600 dark:text-slate-300"},"Value",-1)),ws(h("input",{"onUpdate:modelValue":u[0]||(u[0]=c=>o.value=c),type:"number",placeholder:"e.g. 42",disabled:!t.canEdit,class:"w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition-colors focus:border-indigo-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100",onKeyup:At(r,["enter"])},null,40,Gb),[[ko,o.value]])]),h("div",Wb,[C(ee,{variant:"primary",disabled:!t.canEdit||!a.value,onClick:r},{default:D(()=>[...u[5]||(u[5]=[O(" Insert ",-1)])]),_:1},8,["disabled"]),C(ee,{variant:"danger",disabled:!t.canEdit||!a.value,onClick:i},{default:D(()=>[...u[6]||(u[6]=[O(" Delete ",-1)])]),_:1},8,["disabled"])]),C(Ve,{label:"Speed",class:"mt-4","model-value":t.speed,min:1,max:100,suffix:"%","onUpdate:modelValue":u[1]||(u[1]=c=>s("update:speed",c))},null,8,["model-value"]),h("div",Yb,[C(ee,{variant:"neutral",disabled:!t.canEdit,onClick:u[2]||(u[2]=c=>s("seed",10))},{default:D(()=>[...u[7]||(u[7]=[O(" Seed random tree ",-1)])]),_:1},8,["disabled"]),C(ee,{variant:"neutral",disabled:!t.canEdit,onClick:u[3]||(u[3]=c=>s("reset"))},{default:D(()=>[...u[8]||(u[8]=[O(" Reset ",-1)])]),_:1},8,["disabled"])]),u[9]||(u[9]=h("p",{class:"mt-3 text-center text-xs text-slate-400"}," Controls lock while an insert/delete animation is playing. ",-1))]),_:1}))}}),Jb=["viewBox"],Qb=["x1","y1","x2","y2"],Zb=["cx","cy","fill","stroke"],ev=["x","y"],uc=oe({__name:"TreeDiagram",props:{nodes:{},edges:{},viewBoxWidth:{default:600},viewBoxHeight:{default:320}},setup(t){const e=t,n={default:{fill:"#6366f1",stroke:"#4338ca"},visiting:{fill:"#f59e0b",stroke:"#b45309"},removing:{fill:"#f43f5e",stroke:"#be123c"},inserted:{fill:"#10b981",stroke:"#047857"}};function s(a){return n[a??"default"]??n.default}function o(a){return e.nodes.find(r=>r.id===a)}return(a,r)=>(x(),A("svg",{viewBox:`0 0 ${t.viewBoxWidth} ${t.viewBoxHeight}`,class:"h-full w-full",preserveAspectRatio:"xMidYMin meet"},[(x(!0),A(ae,null,me(t.edges,(i,l)=>{var u,c,d,p;return x(),A("line",{key:`edge-${l}`,x1:(u=o(i.from))==null?void 0:u.x,y1:(c=o(i.from))==null?void 0:c.y,x2:(d=o(i.to))==null?void 0:d.x,y2:(p=o(i.to))==null?void 0:p.y,class:"stroke-slate-300 dark:stroke-slate-700","stroke-width":"2"},null,8,Qb)}),128)),(x(!0),A(ae,null,me(t.nodes,i=>(x(),A("g",{key:i.id},[h("circle",{cx:i.x,cy:i.y,r:"18",fill:s(i.state).fill,stroke:s(i.state).stroke,"stroke-width":"2",class:"transition-all duration-300"},null,8,Zb),h("text",{x:i.x,y:i.y,"text-anchor":"middle","dominant-baseline":"central",class:"select-none fill-white text-xs font-semibold"},R(i.value),9,ev)]))),128))],8,Jb))}}),tv={class:"grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]"},nv={class:"flex flex-col gap-4"},sv={class:"flex flex-col gap-4"},ov={class:"grid grid-cols-2 gap-2"},av={key:0,class:"text-sm text-slate-400"},Gi=50,Wi=60,Yi=40,Xi=40,rv=oe({__name:"BstView",setup(t){const e=qb();function n(c){const d=[],p=[];let m=0;function y(g,v){if(!g)return;y(g.left,v+1);const b=Yi+m*Gi,w=Xi+v*Wi;m+=1,d.push({id:g.id,x:b,y:w,value:g.value,node:g,depth:v}),y(g.right,v+1),g.left&&p.push({from:g.id,to:g.left.id}),g.right&&p.push({from:g.id,to:g.right.id})}return y(c,0),{nodes:d,edges:p,slotCount:m}}const s=E(()=>n(e.tree.value)),o=E(()=>s.value.nodes.map(c=>({id:c.id,x:c.x,y:c.y,value:c.value,state:c.id===e.visiting.value?a(e.phase.value):"default"})));function a(c){return c==="searching"?"visiting":c==="removing"?"removing":c==="inserted"||c==="deleted"?"inserted":"default"}const r=E(()=>s.value.edges),i=E(()=>Math.max(320,Yi*2+s.value.slotCount*Gi)),l=E(()=>{const c=s.value.nodes.reduce((d,p)=>Math.max(d,p.depth),0);return Math.max(200,Xi*2+c*Wi)}),u=E(()=>e.tree.value===null);return(c,d)=>(x(),A("div",tv,[h("div",nv,[C(Xb,{"can-edit":f(e).canEdit.value,speed:f(e).speed.value,onInsert:d[0]||(d[0]=p=>f(e).insert(p)),onRemove:d[1]||(d[1]=p=>f(e).remove(p)),onSeed:d[2]||(d[2]=p=>f(e).seed(p)),onReset:d[3]||(d[3]=p=>f(e).reset()),"onUpdate:speed":d[4]||(d[4]=p=>f(e).speed.value=p)},null,8,["can-edit","speed"])]),h("div",sv,[C(ye,{title:"Stats"},{header:D(()=>[h("span",{class:de(["rounded-full px-2.5 py-0.5 text-xs font-semibold",{"bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400":f(e).status.value==="idle","bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400":f(e).status.value==="running","bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400":f(e).status.value==="done"}])},R(f(e).status.value==="running"?"Running":f(e).status.value==="done"?"Done":"Idle"),3)]),default:D(()=>[h("div",ov,[C(Mt,{label:"Comparisons",value:String(f(e).stats.comparisons)},null,8,["value"]),C(Mt,{label:"Steps",value:String(f(e).stats.steps)},null,8,["value"])])]),_:1}),C(ye,{class:"flex min-h-[320px] flex-1 items-center justify-center"},{default:D(()=>[u.value?(x(),A("p",av," The tree is empty — insert a value to get started. ")):(x(),J(uc,{key:1,nodes:o.value,edges:r.value,"view-box-width":i.value,"view-box-height":l.value,class:"max-h-[60vh]"},null,8,["nodes","edges","view-box-width","view-box-height"]))]),_:1})])]))}});function Ja(t,e,n){return n?t<e:t>e}function*Ji(t,e,n){const s=[...t,e];let o=s.length-1;for(;o>0;){const a=o-1>>1;if(yield{heap:[...s],comparing:[o,a],swapping:[],done:!1},Ja(s[o],s[a],n))[s[o],s[a]]=[s[a],s[o]],yield{heap:[...s],comparing:[],swapping:[o,a],done:!1},o=a;else break}yield{heap:[...s],comparing:[],swapping:[],done:!0}}function*iv(t,e){if(t.length===0){yield{heap:[],comparing:[],swapping:[],done:!0,extracted:null};return}const n=[...t],s=n[0],o=n.pop();if(n.length===0){yield{heap:[],comparing:[],swapping:[],done:!0,extracted:s};return}n[0]=o;let a=0;const r=n.length;for(;;){const i=2*a+1,l=2*a+2;let u=a;if(i<r&&(yield{heap:[...n],comparing:[u,i],swapping:[],done:!1},Ja(n[i],n[u],e)&&(u=i)),l<r&&(yield{heap:[...n],comparing:[u,l],swapping:[],done:!1},Ja(n[l],n[u],e)&&(u=l)),u===a)break;[n[a],n[u]]=[n[u],n[a]],yield{heap:[...n],comparing:[],swapping:[a,u],done:!1},a=u}yield{heap:[...n],comparing:[],swapping:[],done:!0,extracted:s}}function lv(){const t=F([]),e=F(!0),n=F("idle"),s=F(60),o=Pe({comparing:[],swapping:[]}),a=Pe({comparisons:0,swaps:0,steps:0}),r=F(null),i=F(Ue());let l=null;const u=xr(s),c=E(()=>n.value!=="running");function d(){l!==null&&(clearTimeout(l),l=null)}function p(){a.comparisons=0,a.swaps=0,a.steps=0}function m(){o.comparing=[],o.swapping=[]}function y(_){t.value=_.heap,o.comparing=_.comparing,o.swapping=_.swapping,_.comparing.length>0&&(a.comparisons+=1),_.swapping.length>0&&(a.swaps+=1),a.steps+=1}function g(_,N){p(),m(),n.value="running";function G(){const{value:j,done:P}=_.next();if(P||!j){n.value="done";return}if(y(j),j.done){"extracted"in j&&(r.value=j.extracted),m(),n.value="done";return}l=setTimeout(G,u.value)}G()}function v(_){c.value&&(typeof _!="number"||!Number.isFinite(_)||g(Ji(t.value,_,e.value)))}function b(){c.value&&g(iv(t.value,e.value))}function w(){c.value&&(e.value=!e.value)}function k(){d(),t.value=[],r.value=null,m(),p(),n.value="idle"}function T(_){if(!c.value)return;d();const N=Math.min(Math.max(0,Math.floor(_)),200),G=rt(i.value);let j=t.value;for(let P=0;P<N;P++){const I=G.int(1,99);let he;for(const ke of Ji(j,I,e.value))he=ke;j=he.heap}t.value=j,m(),p(),n.value="idle"}return Io(d),{heap:t,isMinHeap:e,status:n,speed:s,highlights:o,stats:a,lastExtracted:r,seedValue:i,canEdit:c,insert:v,extractRoot:b,toggleMode:w,reset:k,seed:T}}const uv={class:"mb-4 flex items-center justify-between rounded-xl bg-slate-50 p-2 dark:bg-slate-800/50"},cv={class:"grid grid-cols-2 gap-1"},dv={class:"block"},pv=["disabled"],fv={class:"mt-3 grid grid-cols-2 gap-2"},hv={class:"mt-4 grid grid-cols-2 gap-2"},mv=oe({__name:"HeapControls",props:{canEdit:{type:Boolean},speed:{},isMinHeap:{type:Boolean}},emits:["insert","extract","toggle-mode","seed","reset","update:speed"],setup(t,{emit:e}){const n=t,s=e,o=F(""),a=E(()=>String(o.value).trim()===""?!1:Number.isFinite(Number(o.value)));function r(){!a.value||!n.canEdit||(s("insert",Number(o.value)),o.value="")}return(i,l)=>(x(),J(ye,{title:"Heap Controls"},{default:D(()=>[h("div",uv,[l[9]||(l[9]=h("span",{class:"pl-2 text-sm font-medium text-slate-600 dark:text-slate-300"},"Mode",-1)),h("div",cv,[C(ee,{variant:"toggle",active:t.isMinHeap,disabled:!t.canEdit,onClick:l[0]||(l[0]=u=>!t.isMinHeap&&s("toggle-mode"))},{default:D(()=>[...l[7]||(l[7]=[O(" Min ",-1)])]),_:1},8,["active","disabled"]),C(ee,{variant:"toggle",active:!t.isMinHeap,disabled:!t.canEdit,onClick:l[1]||(l[1]=u=>t.isMinHeap&&s("toggle-mode"))},{default:D(()=>[...l[8]||(l[8]=[O(" Max ",-1)])]),_:1},8,["active","disabled"])])]),h("label",dv,[l[10]||(l[10]=h("span",{class:"mb-1.5 block text-sm font-medium text-slate-600 dark:text-slate-300"},"Value",-1)),ws(h("input",{"onUpdate:modelValue":l[2]||(l[2]=u=>o.value=u),type:"number",placeholder:"e.g. 42",disabled:!t.canEdit,class:"w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition-colors focus:border-indigo-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100",onKeyup:At(r,["enter"])},null,40,pv),[[ko,o.value]])]),h("div",fv,[C(ee,{variant:"primary",disabled:!t.canEdit||!a.value,onClick:r},{default:D(()=>[...l[11]||(l[11]=[O(" Insert ",-1)])]),_:1},8,["disabled"]),C(ee,{variant:"danger",disabled:!t.canEdit,onClick:l[3]||(l[3]=u=>s("extract"))},{default:D(()=>[O(" Extract "+R(t.isMinHeap?"Min":"Max"),1)]),_:1},8,["disabled"])]),C(Ve,{label:"Speed",class:"mt-4","model-value":t.speed,min:1,max:100,suffix:"%","onUpdate:modelValue":l[4]||(l[4]=u=>s("update:speed",u))},null,8,["model-value"]),h("div",hv,[C(ee,{variant:"neutral",disabled:!t.canEdit,onClick:l[5]||(l[5]=u=>s("seed",10))},{default:D(()=>[...l[12]||(l[12]=[O(" Seed random heap ",-1)])]),_:1},8,["disabled"]),C(ee,{variant:"neutral",disabled:!t.canEdit,onClick:l[6]||(l[6]=u=>s("reset"))},{default:D(()=>[...l[13]||(l[13]=[O(" Reset ",-1)])]),_:1},8,["disabled"])]),l[14]||(l[14]=h("p",{class:"mt-3 text-center text-xs text-slate-400"}," Controls lock while an insert/extract animation is playing. ",-1))]),_:1}))}}),gv={class:"grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]"},bv={class:"flex flex-col gap-4"},vv={class:"flex flex-col gap-4"},yv={class:"grid grid-cols-3 gap-2"},wv={key:0,class:"mt-3 text-center text-xs text-slate-400"},xv={class:"font-mono font-semibold text-indigo-500 dark:text-indigo-400"},kv={key:0,class:"text-sm text-slate-400"},Sv={key:0,class:"text-sm text-slate-400"},$v={key:1,class:"flex flex-wrap gap-1.5"},Ev={class:"w-full bg-slate-200/70 py-0.5 text-center text-[10px] font-medium text-slate-500 dark:bg-slate-700/70 dark:text-slate-400"},Cv={class:"py-1 font-mono text-sm font-semibold text-slate-800 dark:text-slate-100"},Qi=50,Zi=60,el=40,tl=40,Av=oe({__name:"HeapView",setup(t){const e=lv();function n(c){const d=[],p=[];let m=0;const y=c.length;function g(v,b){if(v>=y)return;const w=2*v+1,k=2*v+2;g(w,b+1);const T=el+m*Qi,_=tl+b*Zi;m+=1,d.push({id:v,x:T,y:_,value:c[v],depth:b}),g(k,b+1),w<y&&p.push({from:v,to:w}),k<y&&p.push({from:v,to:k})}return g(0,0),{nodes:d,edges:p,slotCount:m}}const s=E(()=>n(e.heap.value));function o(c){return e.highlights.comparing.includes(c)?"visiting":e.highlights.swapping.includes(c)?"inserted":"default"}const a=E(()=>s.value.nodes.map(c=>({id:c.id,x:c.x,y:c.y,value:c.value,state:o(c.id)}))),r=E(()=>s.value.edges),i=E(()=>Math.max(320,el*2+s.value.slotCount*Qi)),l=E(()=>{const c=s.value.nodes.reduce((d,p)=>Math.max(d,p.depth),0);return Math.max(200,tl*2+c*Zi)}),u=E(()=>e.heap.value.length===0);return(c,d)=>(x(),A("div",gv,[h("div",bv,[C(mv,{"can-edit":f(e).canEdit.value,speed:f(e).speed.value,"is-min-heap":f(e).isMinHeap.value,onInsert:d[0]||(d[0]=p=>f(e).insert(p)),onExtract:d[1]||(d[1]=p=>f(e).extractRoot()),onToggleMode:d[2]||(d[2]=p=>f(e).toggleMode()),onSeed:d[3]||(d[3]=p=>f(e).seed(p)),onReset:d[4]||(d[4]=p=>f(e).reset()),"onUpdate:speed":d[5]||(d[5]=p=>f(e).speed.value=p)},null,8,["can-edit","speed","is-min-heap"])]),h("div",vv,[C(ye,{title:"Stats"},{header:D(()=>[h("span",{class:de(["rounded-full px-2.5 py-0.5 text-xs font-semibold",{"bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400":f(e).status.value==="idle","bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400":f(e).status.value==="running","bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400":f(e).status.value==="done"}])},R(f(e).status.value==="running"?"Running":f(e).status.value==="done"?"Done":"Idle"),3)]),default:D(()=>[h("div",yv,[C(Mt,{label:"Comparisons",value:String(f(e).stats.comparisons)},null,8,["value"]),C(Mt,{label:"Swaps",value:String(f(e).stats.swaps)},null,8,["value"]),C(Mt,{label:"Steps",value:String(f(e).stats.steps)},null,8,["value"])]),f(e).lastExtracted.value!==null?(x(),A("p",wv,[d[6]||(d[6]=O(" Last extracted: ",-1)),h("span",xv,R(f(e).lastExtracted.value),1)])):ge("",!0)]),_:1}),C(ye,{class:"flex min-h-[280px] flex-1 items-center justify-center"},{default:D(()=>[u.value?(x(),A("p",kv," The heap is empty — insert a value to get started. ")):(x(),J(uc,{key:1,nodes:a.value,edges:r.value,"view-box-width":i.value,"view-box-height":l.value,class:"max-h-[55vh]"},null,8,["nodes","edges","view-box-width","view-box-height"]))]),_:1}),C(ye,{title:"Backing Array"},{default:D(()=>[u.value?(x(),A("div",Sv,"Empty.")):(x(),A("div",$v,[(x(!0),A(ae,null,me(f(e).heap.value,(p,m)=>(x(),A("div",{key:m,class:de(["flex w-12 flex-col items-center overflow-hidden rounded-lg border transition-colors",o(m)==="visiting"?"border-amber-400 bg-amber-50 dark:bg-amber-900/30":o(m)==="inserted"?"border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30":"border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50"])},[h("div",Ev,R(m),1),h("div",Cv,R(p),1)],2))),128))]))]),_:1})])]))}}),Tv=10;function Ov(){const t=F({nodes:[],edges:[],adjacency:new Map}),e=F("bfs"),n=F(null),s=F(60),o=F(Ue()),a=Pe({visited:[],frontier:[],current:null}),r=Pe({visitedCount:0,totalNodes:0}),i=E(()=>zo[e.value]),l=E(()=>{const v=new Map,b=new Set(a.visited),w=new Set(a.frontier);for(const k of t.value.nodes)k.id===a.current?v.set(k.id,"current"):b.has(k.id)?v.set(k.id,"visited"):w.has(k.id)&&v.set(k.id,"frontier");return v}),u=E(()=>{const v=new Map,b=new Set(a.visited);for(const w of t.value.edges)b.has(w.from)&&b.has(w.to)&&v.set(w.id,"visited");return v});function c(){a.visited=[],a.frontier=[],a.current=null}function d(){r.visitedCount=0,r.totalNodes=t.value.nodes.length}const p=fn({speed:s,createGenerator:()=>n.value===null?null:(c(),d(),i.value.generator(t.value.adjacency,n.value)),applyStep:v=>{a.visited=v.visited,a.frontier=v.frontier,a.current=v.current,r.visitedCount=v.visited.length},clearStep:()=>{c(),d()}});function m(v=!1){var w;t.value=ec(Tv,rt(o.value)),v&&n.value!==null&&t.value.adjacency.has(n.value)||(n.value=((w=t.value.nodes[0])==null?void 0:w.id)??null),p.reset()}function y(v){p.canEdit.value&&t.value.adjacency.has(v)&&(n.value=v)}const{hydrated:g}=Gt(Zg({algoKey:e,speed:s,seed:o,startId:n}));return m(g.has("start")),{graph:t,algoKey:e,startId:n,speed:s,seed:o,highlights:a,nodeTone:l,edgeTone:u,stats:r,currentAlgo:i,status:p.status,isRunning:p.isRunning,isPaused:p.isPaused,isDone:p.isDone,canEdit:p.canEdit,delayMs:p.delayMs,elapsedMs:p.elapsedMs,stepCount:p.stepCount,cursor:p.cursor,bufferedCount:p.bufferedCount,fullyBuffered:p.fullyBuffered,current:p.current,canStepBack:p.canStepBack,canStepForward:p.canStepForward,generate:m,setStart:y,run:p.run,pause:p.pause,reset:p.reset,stepForward:p.stepForward,stepBack:p.stepBack,seek:p.seek,skipToEnd:p.skipToEnd}}const Mv={class:"mt-5 grid grid-cols-2 gap-2"},Rv=oe({__name:"GraphControls",props:{speed:{},status:{},canEdit:{type:Boolean},isRunning:{type:Boolean},isPaused:{type:Boolean}},emits:["update:speed","generate","run","pause","reset"],setup(t,{emit:e}){const n=e;return(s,o)=>(x(),J(ye,{title:"Controls"},{default:D(()=>[C(Ve,{label:"Speed","model-value":t.speed,min:1,max:100,suffix:"%","onUpdate:modelValue":o[0]||(o[0]=a=>n("update:speed",a))},null,8,["model-value"]),h("div",Mv,[t.isRunning?(x(),J(ee,{key:1,variant:"warning",class:"col-span-2",onClick:o[2]||(o[2]=a=>n("pause"))},{default:D(()=>[...o[6]||(o[6]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M6 4h4v16H6zM14 4h4v16h-4z"})],-1),O(" Pause ",-1)])]),_:1})):(x(),J(ee,{key:0,variant:"primary",class:"col-span-2",onClick:o[1]||(o[1]=a=>n("run"))},{default:D(()=>[o[5]||(o[5]=h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M8 5v14l11-7z"})],-1)),O(" "+R(t.isPaused?"Resume":"Run"),1)]),_:1})),C(ee,{variant:"neutral",onClick:o[3]||(o[3]=a=>n("reset"))},{default:D(()=>[...o[7]||(o[7]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.36 2.64L3 8"}),h("path",{d:"M3 3v5h5"})],-1),O(" Reset ",-1)])]),_:1}),C(ee,{variant:"neutral",disabled:!t.canEdit,onClick:o[4]||(o[4]=a=>n("generate"))},{default:D(()=>[...o[8]||(o[8]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"})],-1),O(" New Graph ",-1)])]),_:1},8,["disabled"])]),o[9]||(o[9]=h("p",{class:"mt-3 text-center text-xs text-slate-400"}," Click a node in the diagram to set the start point. ",-1))]),_:1}))}}),Iv={class:"flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400"},qs=oe({__name:"AvLegend",props:{items:{}},setup(t){return(e,n)=>(x(),A("div",Iv,[(x(!0),A(ae,null,me(t.items,s=>(x(),A("span",{key:s.label,class:"flex items-center gap-1.5"},[h("i",{class:de(["h-3 w-3 rounded-sm",s.class])},null,2),O(R(s.label),1)]))),128))]))}}),_v={idle:"fill-indigo-500/80 dark:fill-indigo-400/80",frontier:"fill-amber-400",current:"fill-rose-500",visited:"fill-emerald-500",considering:"fill-amber-400",accepted:"fill-emerald-500",rejected:"fill-rose-400/60 dark:fill-rose-500/50"},jv={idle:"stroke-slate-300 dark:stroke-slate-700",frontier:"stroke-amber-400/70",current:"stroke-rose-500",visited:"stroke-emerald-500",considering:"stroke-amber-400",accepted:"stroke-emerald-500",rejected:"stroke-rose-400/50 dark:stroke-rose-500/40"},Dv=[{label:"Unvisited",class:"bg-indigo-500/80 dark:bg-indigo-400/80"},{label:"Frontier",class:"bg-amber-400"},{label:"Current",class:"bg-rose-500"},{label:"Visited",class:"bg-emerald-500"}],Pv={class:"mb-3 flex flex-wrap items-center gap-x-4 gap-y-2"},Lv={class:"text-xs font-semibold uppercase tracking-wider text-slate-400"},Nv={class:"flex min-h-[320px] flex-1 items-center justify-center rounded-xl bg-slate-50 p-3 dark:bg-slate-950/40"},Bv={viewBox:"0 0 400 400",class:"h-full max-h-[480px] w-full max-w-[480px]"},Fv=["x1","y1","x2","y2","stroke-width"],Vv=["x","y"],Hv=["x","y"],Uv=["onClick"],zv=["cx","cy","stroke-width"],qv=["x","y"],Kv=["x","y"],Gv={class:"mt-3 text-center text-xs text-slate-400"},cc=oe({__name:"GraphCanvas",props:{nodes:{},edges:{},nodeTone:{default:()=>new Map},edgeTone:{default:()=>new Map},nodeBadge:{default:()=>new Map},showWeights:{type:Boolean,default:!1},legend:{default:()=>Dv},title:{default:"Graph"},hint:{default:"Click a node to set the traversal start point."},startId:{default:null},canEdit:{type:Boolean,default:!1}},emits:["set-start"],setup(t,{emit:e}){const n=t,s=e,o=E(()=>new Map(n.nodes.map(c=>[c.id,c]))),a=E(()=>{const c=new Map;for(const d of n.edges){const p=o.value.get(d.from),m=o.value.get(d.to);p&&m&&c.set(d.id,{x:(p.x+m.x)/2,y:(p.y+m.y)/2})}return c});function r(c){return _v[n.nodeTone.get(c)??"idle"]}function i(c){return jv[n.edgeTone.get(c.id)??"idle"]}function l(c){return n.edgeTone.get(c.id)==="accepted"?3:2}function u(c){n.canEdit&&s("set-start",c)}return(c,d)=>(x(),J(ye,{class:"flex h-full flex-col"},{default:D(()=>[h("div",Pv,[h("h2",Lv,R(t.title),1),C(qs,{items:t.legend},null,8,["items"])]),h("div",Nv,[(x(),A("svg",Bv,[(x(!0),A(ae,null,me(t.edges,p=>{var m,y,g,v;return x(),A("line",{key:p.id,x1:(m=o.value.get(p.from))==null?void 0:m.x,y1:(y=o.value.get(p.from))==null?void 0:y.y,x2:(g=o.value.get(p.to))==null?void 0:g.x,y2:(v=o.value.get(p.to))==null?void 0:v.y,"stroke-width":l(p),class:de(i(p))},null,10,Fv)}),128)),t.showWeights?(x(!0),A(ae,{key:0},me(t.edges,p=>(x(),A("g",{key:`w-${p.id}`},[p.weight!==void 0&&a.value.get(p.id)?(x(),A(ae,{key:0},[h("rect",{x:a.value.get(p.id).x-10,y:a.value.get(p.id).y-7,width:"20",height:"14",rx:"3",class:"fill-slate-50 dark:fill-slate-950/80"},null,8,Vv),h("text",{x:a.value.get(p.id).x,y:a.value.get(p.id).y,"text-anchor":"middle","dominant-baseline":"central",class:"pointer-events-none select-none fill-slate-500 text-[9px] font-semibold dark:fill-slate-400"},R(p.weight),9,Hv)],64)):ge("",!0)]))),128)):ge("",!0),(x(!0),A(ae,null,me(t.nodes,p=>(x(),A("g",{key:p.id,class:"cursor-pointer",onClick:m=>u(p.id)},[h("circle",{cx:p.x,cy:p.y,r:"16","stroke-width":p.id===t.startId?3:0,class:de(["transition-colors duration-150 ease-out",[r(p.id),p.id===t.startId?"stroke-white dark:stroke-slate-100":"stroke-transparent"]])},null,10,zv),h("text",{x:p.x,y:p.y,"text-anchor":"middle","dominant-baseline":"central",class:"pointer-events-none select-none fill-white text-[10px] font-semibold"},R(p.label),9,qv),t.nodeBadge.get(p.id)!==void 0?(x(),A("text",{key:0,x:p.x,y:p.y+27,"text-anchor":"middle",class:"pointer-events-none select-none fill-slate-400 text-[9px] font-medium dark:fill-slate-500"},R(t.nodeBadge.get(p.id)),9,Kv)):ge("",!0)],8,Uv))),128))]))]),h("p",Gv,R(t.hint),1)]),_:1}))}}),Wv={class:"grid grid-cols-3 gap-2"},Yv=oe({__name:"GraphStats",props:{visitedCount:{},totalNodes:{},steps:{},elapsedMs:{},status:{}},setup(t){const e=t,n=E(()=>`${(e.elapsedMs/1e3).toFixed(2)}s`),s=E(()=>({idle:"Idle",running:"Running",paused:"Paused",done:"Done"})[e.status]??e.status),o=E(()=>({idle:"bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",running:"bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400",paused:"bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400",done:"bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400"})[e.status]),a=E(()=>[{label:"Visited",value:`${e.visitedCount} / ${e.totalNodes}`},{label:"Steps",value:e.steps.toLocaleString()},{label:"Elapsed",value:n.value}]);return(r,i)=>(x(),J(ye,{title:"Stats"},{header:D(()=>[h("span",{class:de(["rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",o.value])},R(s.value),3)]),default:D(()=>[h("div",Wv,[(x(!0),A(ae,null,me(a.value,l=>(x(),J(Mt,{key:l.label,label:l.label,value:l.value},null,8,["label","value"]))),128))])]),_:1}))}}),Xv={class:"grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]"},Jv={class:"flex flex-col gap-4"},Qv={class:"flex flex-col gap-4"},Zv=oe({__name:"GraphView",setup(t){const e=Ov();return _e(e.algoKey,()=>{e.isDone.value&&e.reset()}),(n,s)=>(x(),A("div",Xv,[h("div",Jv,[C(xn,{modelValue:f(e).algoKey.value,"onUpdate:modelValue":s[0]||(s[0]=o=>f(e).algoKey.value=o),algorithms:f(zo),title:"Traversal Algorithm",disabled:!f(e).canEdit.value},null,8,["modelValue","algorithms","disabled"]),C(Rv,{speed:f(e).speed.value,"onUpdate:speed":s[1]||(s[1]=o=>f(e).speed.value=o),status:f(e).status.value,"can-edit":f(e).canEdit.value,"is-running":f(e).isRunning.value,"is-paused":f(e).isPaused.value,onGenerate:s[2]||(s[2]=o=>f(e).generate()),onRun:s[3]||(s[3]=o=>f(e).run()),onPause:s[4]||(s[4]=o=>f(e).pause()),onReset:s[5]||(s[5]=o=>f(e).reset())},null,8,["speed","status","can-edit","is-running","is-paused"]),C(gn,{cursor:f(e).cursor.value,"buffered-count":f(e).bufferedCount.value,"fully-buffered":f(e).fullyBuffered.value,"can-step-back":f(e).canStepBack.value,"can-step-forward":f(e).canStepForward.value,onSeek:s[6]||(s[6]=o=>f(e).seek(o)),onStepBack:s[7]||(s[7]=o=>f(e).stepBack()),onStepForward:s[8]||(s[8]=o=>f(e).stepForward()),onSkipToEnd:s[9]||(s[9]=o=>f(e).skipToEnd())},null,8,["cursor","buffered-count","fully-buffered","can-step-back","can-step-forward"])]),h("div",Qv,[C(Yv,{"visited-count":f(e).stats.visitedCount,"total-nodes":f(e).stats.totalNodes,steps:f(e).stepCount.value,"elapsed-ms":f(e).elapsedMs.value,status:f(e).status.value},null,8,["visited-count","total-nodes","steps","elapsed-ms","status"]),C(cc,{class:"flex-1",nodes:f(e).graph.value.nodes,edges:f(e).graph.value.edges,"node-tone":f(e).nodeTone.value,"edge-tone":f(e).edgeTone.value,"start-id":f(e).startId.value,"can-edit":f(e).canEdit.value,onSetStart:s[10]||(s[10]=o=>f(e).setStart(o))},null,8,["nodes","edges","node-tone","edge-tone","start-id","can-edit"])])]))}}),ey=`
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
`,ty="<\/script>",ny=`<!doctype html>
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
${ty}
</body>
</html>`;function gs(t){return typeof t=="number"&&Number.isFinite(t)}function ya(t,e,n){if(t===void 0)return[];if(!Array.isArray(t))return`${n} must be an array of indices`;if(t.length>Ps)return`${n} has too many entries`;const s=[];for(const o of t){if(!gs(o)||!Number.isInteger(o))return`${n} must contain whole numbers`;if(o<0||o>=e)return`${n} contains index ${o}, outside the array (0..${e-1})`;s.push(o)}return s}function sy(t){if(t===null||typeof t!="object")return{ok:!1,reason:"step is not an object"};const e=t;if(!Array.isArray(e.array))return{ok:!1,reason:"step.array must be an array"};if(e.array.length>Ps)return{ok:!1,reason:`step.array has ${e.array.length} entries, over the ${Ps} limit`};const n=[];for(const i of e.array){if(!gs(i))return{ok:!1,reason:"step.array must contain finite numbers"};n.push(i)}const s=ya(e.comparing,n.length,"step.comparing");if(typeof s=="string")return{ok:!1,reason:s};const o=ya(e.swapping,n.length,"step.swapping");if(typeof o=="string")return{ok:!1,reason:o};const a=ya(e.sorted,n.length,"step.sorted");if(typeof a=="string")return{ok:!1,reason:a};if(e.comparisons!==void 0&&!gs(e.comparisons))return{ok:!1,reason:"step.comparisons must be a number"};if(e.swaps!==void 0&&!gs(e.swaps))return{ok:!1,reason:"step.swaps must be a number"};const r={array:n,comparing:s,swapping:o,sorted:a,comparisons:Math.max(0,Math.floor(e.comparisons??0)),swaps:Math.max(0,Math.floor(e.swaps??0)),done:e.done===!0};return gs(e.line)&&e.line>=0&&(r.line=Math.floor(e.line)),{ok:!0,step:r}}class dc extends Error{constructor(e){super(e),this.name="SandboxError"}}function*oy(t){for(const e of t)yield e}function ay(t){const e=t.maxSteps??Sr,n=t.maxMs??Gg,s=t.silenceMs??Wg,o=[];let a=0,r=null;const i=Date.now();let l=null,u=null,c=!1,d,p;const m=new Promise((k,T)=>{d=k,p=T});function y(){var k;if(u!==null&&(clearTimeout(u),u=null),window.removeEventListener("message",w),l){try{(k=l.contentWindow)==null||k.postMessage({type:"sandbox:kill"},"*")}catch{}l.remove(),l=null}}function g(k){c||(c=!0,y(),d({steps:o,reason:k,rejected:a,firstRejectReason:r,elapsedMs:Date.now()-i}))}function v(k){c||(c=!0,y(),p(new dc(k)))}function b(){u!==null&&clearTimeout(u),u=setTimeout(()=>g("watchdog"),s)}function w(k){if(!l||k.source!==l.contentWindow)return;const T=k.data;if(!(!T||typeof T!="object"||typeof T.type!="string"))switch(b(),T.type){case"sandbox:steps":{if(!Array.isArray(T.steps))return;for(const _ of T.steps){const N=sy(_);if(!N.ok){a+=1,r===null&&(r=N.reason);continue}o.push(N.step)}return}case"sandbox:done":g(T.reason);return;case"sandbox:error":v(T.message||"The sandbox reported an unknown error.");return;default:return}}return window.addEventListener("message",w),l=document.createElement("iframe"),l.setAttribute("sandbox","allow-scripts"),l.setAttribute("aria-hidden","true"),l.setAttribute("title","Algorithm sandbox runner"),l.style.cssText="position:absolute;width:0;height:0;border:0;opacity:0;pointer-events:none;left:-9999px;",l.srcdoc=ny,l.addEventListener("load",()=>{var k;c||!l||(k=l.contentWindow)==null||k.postMessage({type:"sandbox:run",workerSource:ey,code:t.code,input:Array.from(t.input,Number),maxSteps:e,maxMs:n,batchSize:Yg,arrayCap:Ps},"*")}),document.body.appendChild(l),b(),{result:m,cancel:()=>g("cancelled")}}function ry(t){switch(t.reason){case"watchdog":return"Force-stopped: the snippet stopped responding without yielding anything — that is what a loop with no yield inside it looks like. The worker was terminated; this page was never blocked.";case"step-budget":case"time-budget":return"Stopped at the budget before the snippet yielded a single snapshot.";case"cancelled":return"Cancelled before the snippet yielded anything.";default:return t.rejected>0?`Every snapshot was rejected. First problem: ${t.firstRejectReason}`:"The snippet ran but never yielded a snapshot. Use `yield` to draw a frame."}}function iy(){const t=F(Xa),e=F(rc),n=F(ic),s=F(Ue()),o=F("idle"),a=F(null),r=F(null),i=ir([]);let l=null;const u=F([]),c=F([]),d=Pe({comparing:[],swapping:[],sorted:[]}),p=Pe({comparisons:0,swaps:0}),m=F(1);function y(){d.comparing=[],d.swapping=[],d.sorted=[]}function g(){p.comparisons=0,p.swaps=0}function v(){const q=rt(s.value);u.value=Array.from({length:e.value},()=>q.int(1,99)),c.value=[...u.value],b()}function b(){let q=1;for(const L of u.value)L>q&&(q=L);for(const L of i.value)for(const z of L.array)z>q&&(q=z);m.value=q}const w=fn({speed:n,createGenerator:()=>i.value.length===0?null:(c.value=[...u.value],y(),g(),oy(i.value)),applyStep:q=>{c.value=q.array,d.comparing=q.comparing,d.swapping=q.swapping,d.sorted=q.sorted,p.comparisons=q.comparisons,p.swaps=q.swaps},clearStep:()=>{c.value=[...u.value],y(),g()}});function k(){i.value=[],w.reset(),b()}function T(){G(),v(),k(),o.value="idle",a.value=null,r.value=null}function _(){s.value=Ue(),T()}async function N(){G(),a.value=null,r.value=null,o.value="executing",i.value=[],w.reset();const q=ay({code:t.value,input:u.value});l=q;try{const L=await q.result;if(l!==q)return;if(i.value=L.steps,r.value=L,b(),L.steps.length===0){o.value="error",a.value=ry(L);return}o.value="ready",w.run()}catch(L){if(l!==q)return;o.value="error",a.value=L instanceof dc?L.message:"The sandbox failed to start."}finally{l===q&&(l=null)}}function G(){l&&(l.cancel(),l=null)}function j(){t.value=Xa}const{hydrated:P}=Gt(e0({source:t,size:e,speed:n,seed:s})),I=P.has("src");v();const he=E(()=>r.value!==null&&r.value.reason!=="complete"&&i.value.length>0),ke=E(()=>{const q=r.value;if(!q)return null;switch(q.reason){case"complete":return null;case"step-budget":return`Stopped at the ${Sr.toLocaleString()}-step budget — the snippet never finished.`;case"time-budget":return"Stopped at the time budget — the snippet was still running.";case"watchdog":return"Force-stopped: the sandbox went silent, which is what a loop that never yields looks like.";case"cancelled":return"Cancelled.";default:return null}});return{source:t,size:e,speed:n,seed:s,phase:o,error:a,lastRun:r,truncated:he,stopLabel:ke,stepsCollected:E(()=>i.value.length),fromSharedLink:I,array:c,baseArray:u,highlights:d,stats:p,maxValue:m,status:w.status,isRunning:w.isRunning,isPaused:w.isPaused,isDone:w.isDone,canEdit:w.canEdit,elapsedMs:w.elapsedMs,stepCount:w.stepCount,cursor:w.cursor,bufferedCount:w.bufferedCount,fullyBuffered:w.fullyBuffered,current:w.current,canStepBack:w.canStepBack,canStepForward:w.canStepForward,activeLine:E(()=>{var q;return((q=w.current.value)==null?void 0:q.line)??null}),execute:N,cancel:G,regenerate:T,randomizeSeed:_,resetSource:j,run:w.run,pause:w.pause,reset:w.reset,stepForward:w.stepForward,stepBack:w.stepBack,seek:w.seek,skipToEnd:w.skipToEnd}}const ly={class:"relative flex max-h-[420px] min-h-[260px] overflow-hidden rounded-xl bg-slate-50 font-mono text-xs dark:bg-slate-950/40"},uy={"aria-hidden":"true",class:"select-none overflow-hidden border-r border-slate-200 bg-slate-100/60 py-3 text-right dark:border-slate-800 dark:bg-slate-900/40",style:{minWidth:"2.75rem"}},cy=["value","disabled"],dy=oe({__name:"CodeEditor",props:{modelValue:{},disabled:{type:Boolean}},emits:["update:modelValue"],setup(t,{emit:e}){const n=t,s=e,o=F(null),a=E(()=>{const d=n.modelValue.split(`
`).length;return Array.from({length:d},(p,m)=>m+1)}),r=F(0);function i(d){r.value=d.target.scrollTop}const l=F(!1);function u(d){if(d.key==="Escape"){l.value=!0;return}if(d.key!=="Tab"||l.value)return;d.preventDefault();const p=o.value;if(!p)return;const{selectionStart:m,selectionEnd:y,value:g}=p,v=`${g.slice(0,m)}  ${g.slice(y)}`;s("update:modelValue",v),requestAnimationFrame(()=>{p.selectionStart=p.selectionEnd=m+2})}function c(d){l.value=!1,s("update:modelValue",d.target.value)}return(d,p)=>(x(),J(ye,{title:"Your algorithm"},{header:D(()=>[...p[0]||(p[0]=[h("span",{class:"text-[11px] text-slate-400 dark:text-slate-500"}," Tab indents · Esc then Tab to leave ",-1)])]),default:D(()=>[h("div",ly,[h("div",uy,[h("div",{style:on({transform:`translateY(${-r.value}px)`})},[(x(!0),A(ae,null,me(a.value,m=>(x(),A("div",{key:m,class:"px-2 leading-5 text-slate-400 dark:text-slate-600"},R(m),1))),128))],4)]),h("textarea",{ref_key:"textarea",ref:o,value:t.modelValue,disabled:t.disabled,spellcheck:"false",autocomplete:"off",autocorrect:"off",autocapitalize:"off","aria-label":"Algorithm source code",class:"flex-1 resize-none bg-transparent p-3 leading-5 text-slate-800 outline-none disabled:opacity-60 dark:text-slate-200",onInput:c,onKeydown:u,onScroll:i},null,40,cy)])]),_:1}))}}),py=["open"],fy={class:"flex cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden"},hy={class:"min-w-0"},my={class:"block text-xs font-semibold uppercase tracking-wider text-slate-400"},gy={key:0,class:"mt-1 block text-sm text-slate-500 dark:text-slate-400"},by={class:"mt-4 border-t border-slate-200 pt-4 text-sm dark:border-slate-700"},Ks=oe({__name:"AvExplainer",props:{title:{},summary:{default:""},startOpen:{type:Boolean,default:!1}},setup(t){return(e,n)=>(x(),A("details",{class:"av-card group p-4 sm:p-5",open:t.startOpen},[h("summary",fy,[h("span",hy,[h("span",my,R(t.title),1),t.summary?(x(),A("span",gy,R(t.summary),1)):ge("",!0)]),n[0]||(n[0]=h("span",{class:"shrink-0 text-slate-400 transition-transform group-open:rotate-180","aria-hidden":"true"}," ▾ ",-1))]),h("div",by,[mo(e.$slots,"default")])],8,py))}}),vy={class:"mb-4 overflow-x-auto"},yy={class:"w-full border-collapse text-left text-xs"},wy={class:"py-1.5 pr-3 font-mono font-semibold text-slate-700 dark:text-slate-200"},xy={class:"py-1.5 pr-3 font-mono text-slate-400"},ky={class:"py-1.5 text-slate-500 dark:text-slate-400"},Sy={class:"mb-4 list-disc space-y-1.5 pl-5 text-slate-600 dark:text-slate-300"},$y=oe({__name:"SandboxGuide",setup(t){const e=[{name:"array",type:"number[]",note:"Required. The values as they stand right now."},{name:"comparing",type:"number[]",note:"Indices to paint amber. Defaults to none."},{name:"swapping",type:"number[]",note:"Indices to paint rose."},{name:"sorted",type:"number[]",note:"Indices to paint emerald — settled for good."},{name:"comparisons",type:"number",note:"Shown in Stats. Your own running count."},{name:"swaps",type:"number",note:"Shown in Stats."},{name:"done",type:"boolean",note:"true on the final snapshot only. Ends the run."}];return(n,s)=>(x(),J(Ks,{title:"How this works",summary:"Write a generator, yield a snapshot per frame. Read this first — the shape is strict.","start-open":""},{default:D(()=>[s[4]||(s[4]=h("p",{class:"mb-3 text-slate-600 dark:text-slate-300"},[O(" Your code runs in a sandboxed frame on its own thread, and everything it "),h("code",{class:"font-mono text-xs"},"yield"),O("s is drawn on the chart to the right. It is the same contract every built-in algorithm here uses, so anything you write plays back with the same scrubber, speed control and step history. ")],-1)),s[5]||(s[5]=h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400"}," Required shape ",-1)),s[6]||(s[6]=h("pre",{class:"mb-4 overflow-x-auto rounded-xl bg-slate-50 p-3 font-mono text-[11px] leading-5 text-slate-700 dark:bg-slate-950/40 dark:text-slate-300"},[h("code",null,`// name and function* are both required
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
}`)],-1)),s[7]||(s[7]=h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400"}," Snapshot fields ",-1)),h("div",vy,[h("table",yy,[h("tbody",null,[(x(),A(ae,null,me(e,o=>h("tr",{key:o.name,class:"border-b border-slate-200 last:border-0 dark:border-slate-700"},[h("td",wy,R(o.name),1),h("td",xy,R(o.type),1),h("td",ky,R(o.note),1)])),64))])])]),s[8]||(s[8]=h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400"}," Rules worth knowing ",-1)),h("ul",Sy,[s[0]||(s[0]=h("li",null,[h("b",null,"JavaScript only."),O(" The runner evaluates JS — other languages and WebAssembly are not supported. ")],-1)),s[1]||(s[1]=h("li",null,[O(" Highlight indices must be whole numbers "),h("b",null,"inside"),O(" the array. An out-of-range index is rejected rather than clamped, because a clamped index quietly highlights the wrong bar. ")],-1)),s[2]||(s[2]=h("li",null," A rejected snapshot is skipped and reported in the Sandbox panel with the reason — the run keeps going. ",-1)),s[3]||(s[3]=h("li",null,[O(" Helper functions are fine. Only "),h("code",{class:"font-mono text-xs"},"run"),O(" is special. ")],-1)),h("li",null," Limits: "+R(f(Sr).toLocaleString())+" snapshots per run, arrays up to "+R(f(Ps))+" entries (the size slider stops at "+R(f($r))+"). ",1)]),s[9]||(s[9]=h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400"}," Why it is safe to run a link someone sent you ",-1)),s[10]||(s[10]=h("p",{class:"mb-2 text-slate-600 dark:text-slate-300"}," Code executes inside an isolated frame with no access to this page — not its DOM, its storage, or its cookies — and on a separate thread, so even an infinite loop cannot freeze the tab. A run that stops responding is terminated automatically. ",-1)),s[11]||(s[11]=h("p",{class:"text-slate-500 dark:text-slate-400"},[O(" One honest limitation: isolation stops shared code touching "),h("em",null,"this app"),O(", but it can still make network requests, the same as any script on any page you open. Treat a shared snippet the way you would treat any link. ")],-1))]),_:1}))}}),Ey={class:"flex flex-col gap-3"},Cy={class:"grid grid-cols-2 gap-2"},Ay={class:"grid grid-cols-2 gap-2"},Ty=oe({__name:"SandboxControls",props:Dn({status:{},executing:{type:Boolean},canEdit:{type:Boolean},isRunning:{type:Boolean},isPaused:{type:Boolean},hasTape:{type:Boolean},seed:{}},{size:{required:!0},sizeModifiers:{},speed:{required:!0},speedModifiers:{}}),emits:Dn(["execute","cancel","run","pause","reset","randomize","reset-source","update:seed"],["update:size","update:speed"]),setup(t,{emit:e}){const n=Pn(t,"size"),s=Pn(t,"speed"),o=e;function a(r){const i=Number(r);Number.isInteger(i)&&o("update:seed",i)}return(r,i)=>(x(),J(ye,{title:"Run"},{default:D(()=>[h("div",Ey,[h("div",Cy,[C(ee,{variant:"primary",class:"col-span-2",disabled:t.executing,onClick:i[0]||(i[0]=l=>o("execute"))},{default:D(()=>[O(R(t.executing?"Running in sandbox…":"▶ Run in sandbox"),1)]),_:1},8,["disabled"]),t.executing?(x(),J(ee,{key:0,variant:"danger",class:"col-span-2",onClick:i[1]||(i[1]=l=>o("cancel"))},{default:D(()=>[...i[9]||(i[9]=[O(" Stop ",-1)])]),_:1})):(x(),A(ae,{key:1},[t.isRunning?(x(),J(ee,{key:0,variant:"warning",disabled:!t.hasTape,onClick:i[2]||(i[2]=l=>o("pause"))},{default:D(()=>[...i[10]||(i[10]=[O(" ❚❚ Pause ",-1)])]),_:1},8,["disabled"])):(x(),J(ee,{key:1,variant:"neutral",disabled:!t.hasTape,onClick:i[3]||(i[3]=l=>o("run"))},{default:D(()=>[O(R(t.isPaused?"▶ Resume":"▶ Replay"),1)]),_:1},8,["disabled"])),C(ee,{variant:"neutral",disabled:!t.hasTape,onClick:i[4]||(i[4]=l=>o("reset"))},{default:D(()=>[...i[11]||(i[11]=[O("Reset",-1)])]),_:1},8,["disabled"])],64))]),C(Ve,{modelValue:n.value,"onUpdate:modelValue":i[5]||(i[5]=l=>n.value=l),label:"Input size",min:f(ac),max:f($r),disabled:!t.canEdit||t.executing},null,8,["modelValue","min","max","disabled"]),C(Ve,{modelValue:s.value,"onUpdate:modelValue":i[6]||(i[6]=l=>s.value=l),label:"Speed",min:1,max:100,suffix:"%"},null,8,["modelValue"]),C(vt,{label:"Seed",monospace:"","model-value":String(t.seed),disabled:!t.canEdit||t.executing,"onUpdate:modelValue":a},null,8,["model-value","disabled"]),h("div",Ay,[C(ee,{variant:"quiet",disabled:!t.canEdit||t.executing,onClick:i[7]||(i[7]=l=>o("randomize"))},{default:D(()=>[...i[12]||(i[12]=[O(" New seed ",-1)])]),_:1},8,["disabled"]),C(ee,{variant:"quiet",disabled:t.executing,onClick:i[8]||(i[8]=l=>o("reset-source"))},{default:D(()=>[...i[13]||(i[13]=[O(" Starter code ",-1)])]),_:1},8,["disabled"])])])]),_:1}))}}),Oy={key:0,class:"mb-3 rounded-lg bg-indigo-50 px-3 py-2 text-xs text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"},My={key:1,class:"text-sm text-rose-600 dark:text-rose-400"},Ry={key:0,class:"mb-2 text-sm text-amber-600 dark:text-amber-400"},Iy={key:1,class:"text-sm text-slate-500 dark:text-slate-400"},_y={key:0},jy={key:2,class:"text-sm text-slate-500 dark:text-slate-400"},Dy={key:3,class:"mt-2 text-xs text-amber-600 dark:text-amber-400"},Py=oe({__name:"SandboxStatus",props:{phase:{},error:{},stopLabel:{},stepsCollected:{},rejected:{},firstRejectReason:{},elapsedMs:{},fromSharedLink:{type:Boolean}},setup(t){const e=t,n=E(()=>e.phase==="error"?"error":e.stopLabel||e.rejected>0?"warn":e.phase==="ready"?"ok":"idle"),s=E(()=>({idle:"bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",ok:"bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",warn:"bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",error:"bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300"})[n.value]);return(o,a)=>(x(),J(ye,{title:"Sandbox"},{header:D(()=>[h("span",{class:de(["rounded-full px-2.5 py-0.5 text-xs font-semibold",s.value])},R(t.phase==="executing"?"Executing":t.phase==="ready"?"Isolated · OK":t.phase==="error"?"Failed":"Idle"),3)]),default:D(()=>[t.fromSharedLink?(x(),A("p",Oy," This code came from a shared link. It runs in an isolated frame with no access to this page, but it is not code you wrote. ")):ge("",!0),t.error?(x(),A("p",My,R(t.error),1)):(x(),A(ae,{key:2},[t.stopLabel?(x(),A("p",Ry,R(t.stopLabel),1)):ge("",!0),t.phase==="ready"?(x(),A("p",Iy,[O(" Collected "+R(t.stepsCollected.toLocaleString())+" snapshots",1),t.elapsedMs!==null?(x(),A("span",_y," in "+R((t.elapsedMs/1e3).toFixed(2))+"s",1)):ge("",!0),a[0]||(a[0]=O(". ",-1))])):t.phase==="idle"?(x(),A("p",jy," Your code runs in a sandboxed frame on its own thread. It can draw bars; it cannot reach this page. ")):ge("",!0),t.rejected>0?(x(),A("p",Dy,R(t.rejected.toLocaleString())+" snapshot"+R(t.rejected===1?"":"s")+" rejected before rendering — "+R(t.firstRejectReason),1)):ge("",!0)],64))]),_:1}))}}),Ly={class:"grid gap-4 lg:grid-cols-[minmax(0,420px)_1fr]"},Ny={class:"flex flex-col gap-4"},By={class:"flex flex-col gap-4"},Fy=oe({__name:"SandboxView",setup(t){const e=iy();_e([e.size,e.seed],()=>{e.phase.value!=="executing"&&e.regenerate()}),dr(()=>{e.fromSharedLink&&e.execute()});const n=E(()=>{var a;return((a=e.lastRun.value)==null?void 0:a.elapsedMs)??null}),s=E(()=>{var a;return((a=e.lastRun.value)==null?void 0:a.rejected)??0}),o=E(()=>{var a;return((a=e.lastRun.value)==null?void 0:a.firstRejectReason)??null});return(a,r)=>(x(),A("div",Ly,[h("div",Ny,[C($y),C(dy,{modelValue:f(e).source.value,"onUpdate:modelValue":r[0]||(r[0]=i=>f(e).source.value=i),disabled:f(e).phase.value==="executing"},null,8,["modelValue","disabled"]),C(Ty,{size:f(e).size.value,"onUpdate:size":r[1]||(r[1]=i=>f(e).size.value=i),speed:f(e).speed.value,"onUpdate:speed":r[2]||(r[2]=i=>f(e).speed.value=i),status:f(e).status.value,executing:f(e).phase.value==="executing","can-edit":f(e).canEdit.value,"is-running":f(e).isRunning.value,"is-paused":f(e).isPaused.value,"has-tape":f(e).stepsCollected.value>0,seed:f(e).seed.value,onExecute:r[3]||(r[3]=i=>f(e).execute()),onCancel:r[4]||(r[4]=i=>f(e).cancel()),onRun:r[5]||(r[5]=i=>f(e).run()),onPause:r[6]||(r[6]=i=>f(e).pause()),onReset:r[7]||(r[7]=i=>f(e).reset()),onRandomize:r[8]||(r[8]=i=>f(e).randomizeSeed()),onResetSource:r[9]||(r[9]=i=>f(e).resetSource()),"onUpdate:seed":r[10]||(r[10]=i=>f(e).seed.value=i)},null,8,["size","speed","status","executing","can-edit","is-running","is-paused","has-tape","seed"]),C(gn,{cursor:f(e).cursor.value,"buffered-count":f(e).bufferedCount.value,"fully-buffered":f(e).fullyBuffered.value,"can-step-back":f(e).canStepBack.value,"can-step-forward":f(e).canStepForward.value,onSeek:r[11]||(r[11]=i=>f(e).seek(i)),onStepBack:r[12]||(r[12]=i=>f(e).stepBack()),onStepForward:r[13]||(r[13]=i=>f(e).stepForward()),onSkipToEnd:r[14]||(r[14]=i=>f(e).skipToEnd())},null,8,["cursor","buffered-count","fully-buffered","can-step-back","can-step-forward"])]),h("div",By,[C(Py,{phase:f(e).phase.value,error:f(e).error.value,"stop-label":f(e).stopLabel.value,"steps-collected":f(e).stepsCollected.value,rejected:s.value,"first-reject-reason":o.value,"elapsed-ms":n.value,"from-shared-link":f(e).fromSharedLink},null,8,["phase","error","stop-label","steps-collected","rejected","first-reject-reason","elapsed-ms","from-shared-link"]),C(uo,{comparisons:f(e).stats.comparisons,swaps:f(e).stats.swaps,steps:f(e).stepCount.value,"elapsed-ms":f(e).elapsedMs.value,status:f(e).status.value},null,8,["comparisons","swaps","steps","elapsed-ms","status"]),C(lo,{class:"flex-1",title:"Your algorithm",array:f(e).array.value,comparing:f(e).highlights.comparing,swapping:f(e).highlights.swapping,sorted:f(e).highlights.sorted,"max-value":f(e).maxValue.value},null,8,["array","comparing","swapping","sorted","max-value"])])]))}}),Vy=5e3,Hy=2e3;function Uy(t){let e=t.reduce((s,o)=>s+o,0),n=1;for(const s of t){let o=1;for(let a=1;a<=s;a++)o=o*(e-s+a)/a;if(e-=s,n*=o,!Number.isFinite(n)||n>Number.MAX_SAFE_INTEGER)return 1/0}return Math.round(n)}function zy(t){const e=t.reduce((r,i)=>r+i,0),n=[],s=t.map(()=>0),o=[];function a(){if(o.length===e){n.push([...o]);return}for(let r=0;r<t.length;r++)s[r]>=t[r]||(s[r]+=1,o.push(r),a(),o.pop(),s[r]-=1)}return a(),n}function qy(t,e){const n=[...t],s=t.reduce((a,r)=>a+r,0),o=[];for(let a=0;a<s;a++){const r=[];for(let l=0;l<n.length;l++)for(let u=0;u<n[l];u++)r.push(l);const i=e.pick(r);if(i===void 0)break;n[i]-=1,o.push(i)}return o}function Ky(t,e){const n=kr(t),s=e.threshold??Vy,o=e.sampleCount??Hy,a=Uy(n),r=a<s?zy(n):Gy(n,e.seed,o),i=a<s?"exhaustive":"sampled",l=r.map(u=>Hg(t,u));return{mode:i,totalCount:a,checkedCount:l.length,outcomes:l,violatingCount:l.filter(u=>u.violates).length}}function Gy(t,e,n){const s=rt(e),o=new Set,a=[];for(let r=0;r<n;r++){const i=qy(t,s),l=i.join(",");o.has(l)||(o.add(l),a.push(i))}return a}function Wy(){const t=F(zu),e=F(60),n=F(Ue()),s=F([]),o=E(()=>Ds[t.value]),a=ir(null);function r(){a.value=Ky(o.value,{seed:n.value})}const i=E(()=>{var j;return((j=a.value)==null?void 0:j.outcomes.filter(P=>P.violates))??[]}),l=E(()=>{var j;return((j=a.value)==null?void 0:j.outcomes.filter(P=>!P.violates))??[]}),u=E(()=>{if(!a.value||s.value.length===0)return null;const j=s.value.join(",");return a.value.outcomes.find(P=>P.schedule.join(",")===j)??null}),c=F([]),d=F({}),p=F({}),m=F(null),y=F(!1),g=Pe({executed:0,total:0});function v(){return o.value.createState().threads}function b(){const j=o.value.createState();c.value=j.threads,d.value={...j.shared},p.value={...j.locks},m.value=null,y.value=!1,g.executed=0,g.total=s.value.length}const w=fn({speed:e,createGenerator:()=>s.value.length===0?null:(b(),sc(o.value,s.value)),applyStep:(j,P)=>{c.value=j.threads,d.value=j.sharedMem,p.value=j.lockOwners,m.value=j.lastAction,y.value=j.violated,g.executed=P+1},clearStep:b});function k(j){var I;if(!Ya(o.value,j))return!1;s.value=[...j],w.reset();const P=(I=a.value)==null?void 0:I.outcomes.find(he=>he.schedule.join(",")===j.join(","));return P&&P.violates&&(w.stepForward(),w.seek(P.firstViolationIndex)),!0}function T(j=!1){var I;if(r(),g.total=0,j&&s.value.length>0&&Ya(o.value,s.value)){k(s.value);return}const P=i.value[0]??((I=a.value)==null?void 0:I.outcomes[0]);P?k(P.schedule):(s.value=[],b())}function _(){n.value=Ue()}const{hydrated:N}=Gt(t0({scenarioKey:t,speed:e,seed:n,schedule:s},()=>o.value));T(N.has("sched")),_e(t,()=>{s.value=[],T()}),_e(n,()=>T());const G=E(()=>{const j=a.value;if(!j)return"";const P=j.violatingCount.toLocaleString();if(j.mode==="exhaustive")return`Checked all ${j.checkedCount.toLocaleString()} possible interleavings — ${P} break the invariant.`;const I=Number.isFinite(j.totalCount)?j.totalCount.toLocaleString():"astronomically many";return`Sampled ${j.checkedCount.toLocaleString()} of ${I} possible interleavings — ${P} of those break the invariant.`});return{scenarioKey:t,scenario:o,speed:e,seed:n,schedule:s,search:a,violating:i,clean:l,selected:u,summary:G,threads:c,sharedMem:d,lockOwners:p,lastAction:m,violatedNow:y,stats:g,idleThreads:v,status:w.status,isRunning:w.isRunning,isPaused:w.isPaused,isDone:w.isDone,canEdit:w.canEdit,elapsedMs:w.elapsedMs,stepCount:w.stepCount,cursor:w.cursor,bufferedCount:w.bufferedCount,fullyBuffered:w.fullyBuffered,current:w.current,canStepBack:w.canStepBack,canStepForward:w.canStepForward,analyse:T,selectSchedule:k,randomizeSeed:_,run:w.run,pause:w.pause,reset:w.reset,stepForward:w.stepForward,stepBack:w.stepBack,seek:w.seek,skipToEnd:w.skipToEnd}}const Yy={class:"flex flex-col gap-2"},Xy={class:"block"},Jy={class:"block font-semibold"},Qy={class:"block text-[11px] opacity-80"},Zy={class:"mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"},ew={class:"mt-4 grid grid-cols-2 gap-2"},tw={class:"mt-4 flex flex-col gap-3"},nw=oe({__name:"ConcurrencyControls",props:Dn({status:{},canEdit:{type:Boolean},isRunning:{type:Boolean},isPaused:{type:Boolean},hasSchedule:{type:Boolean},seed:{}},{scenario:{required:!0},scenarioModifiers:{},speed:{required:!0},speedModifiers:{}}),emits:Dn(["run","pause","reset","randomize","update:seed"],["update:scenario","update:speed"]),setup(t,{emit:e}){const n=Pn(t,"scenario"),s=Pn(t,"speed"),o=e,a=Object.entries(Ds);function r(i){const l=Number(i);Number.isInteger(l)&&o("update:seed",l)}return(i,l)=>(x(),J(ye,{title:"Scenario"},{default:D(()=>[h("div",Yy,[(x(!0),A(ae,null,me(f(a),([u,c])=>(x(),J(ee,{key:u,variant:"selector",class:"text-left",active:n.value===u,disabled:!t.canEdit,onClick:d=>n.value=u},{default:D(()=>[h("span",Xy,[h("span",Jy,R(c.name),1),h("span",Qy,R(c.description),1)])]),_:2},1032,["active","disabled","onClick"]))),128))]),h("p",Zy,R(f(Ds)[n.value].bug),1),h("div",ew,[t.isRunning?(x(),J(ee,{key:0,variant:"warning",onClick:l[0]||(l[0]=u=>o("pause"))},{default:D(()=>[...l[5]||(l[5]=[O("❚❚ Pause",-1)])]),_:1})):(x(),J(ee,{key:1,variant:"primary",disabled:!t.hasSchedule,onClick:l[1]||(l[1]=u=>o("run"))},{default:D(()=>[O(R(t.isPaused?"▶ Resume":"▶ Play"),1)]),_:1},8,["disabled"])),C(ee,{variant:"neutral",disabled:!t.hasSchedule,onClick:l[2]||(l[2]=u=>o("reset"))},{default:D(()=>[...l[6]||(l[6]=[O("Reset",-1)])]),_:1},8,["disabled"])]),h("div",tw,[C(Ve,{modelValue:s.value,"onUpdate:modelValue":l[3]||(l[3]=u=>s.value=u),label:"Speed",min:1,max:100,suffix:"%"},null,8,["modelValue"]),C(vt,{label:"Seed",monospace:"","model-value":String(t.seed),disabled:!t.canEdit,"onUpdate:modelValue":r},null,8,["model-value","disabled"]),C(ee,{variant:"quiet",disabled:!t.canEdit,onClick:l[4]||(l[4]=u=>o("randomize"))},{default:D(()=>[...l[7]||(l[7]=[O("New seed",-1)])]),_:1},8,["disabled"]),l[8]||(l[8]=h("p",{class:"text-[11px] text-slate-400 dark:text-slate-500"}," The seed only matters once a scenario is too large to check exhaustively — then it picks which interleavings get sampled. ",-1))])]),_:1}))}}),sw=oe({__name:"ConcurrencyGuide",setup(t){return(e,n)=>(x(),J(Ks,{title:"How to read this",summary:"Same code, different orderings. Some orderings are buggy — this finds which.","start-open":""},{default:D(()=>[...n[0]||(n[0]=[h("p",{class:"mb-3 text-slate-600 dark:text-slate-300"},[O(" Two threads run at the same time, so their instructions can land in many different orders. The code never changes; only the "),h("em",null,"ordering"),O(" does. Most concurrency bugs are orderings that happen to be rare — which is exactly why they survive testing and surface in production. This page enumerates the orderings instead of waiting to get unlucky. ")],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400"}," Reading an interleaving ",-1),h("p",{class:"mb-3 text-slate-600 dark:text-slate-300"},[O(" Each chip is one complete ordering, written as letters: "),h("code",{class:"font-mono text-xs"},"A"),O(" means T0 takes its next step, "),h("code",{class:"font-mono text-xs"},"B"),O(" means T1 does. So "),h("code",{class:"font-mono text-xs"},"ABABAB"),O(" is strict alternation, and "),h("code",{class:"font-mono text-xs"},"AAABBB"),O(" is T0 finishing completely before T1 starts. "),h("span",{class:"text-rose-600 dark:text-rose-400"},"Red chips break the invariant"),O("; click any chip to load it, and playback jumps straight to the step where it first goes wrong. ")],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400"}," The two scenarios ",-1),h("ul",{class:"mb-4 space-y-2 text-slate-600 dark:text-slate-300"},[h("li",null,[h("b",null,"Racy counter."),O(),h("code",{class:"font-mono text-xs"},"counter = counter + 1"),O(" is three machine steps, not one: read, add, write. If both threads read before either writes, they both compute the same value and one increment vanishes. Only the two orderings where one thread finishes first are safe. ")]),h("li",null,[h("b",null,"Mutex violation."),O(" Checking whether a lock is free and taking it are separate steps, so both threads can see it free and both walk in. Watch for two lanes showing "),h("em",null,"in critical section"),O(" at once — and note the state looks perfectly fine again by the last step, which is why this bug is so hard to catch after the fact. ")])],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400"}," “Checked all” vs “sampled” ",-1),h("p",{class:"mb-2 text-slate-600 dark:text-slate-300"},[O(" The number of orderings explodes as threads and instructions grow — two threads of three steps is 20, but five threads of four is over 300 billion. When the total is small enough, every single ordering is executed and checked, and the panel says "),h("b",null,"checked all N"),O(". When it is not, orderings are sampled instead and the panel says so. Both scenarios here are small enough to check exhaustively, so nothing is being missed. ")],-1),h("p",{class:"text-slate-500 dark:text-slate-400"}," The seed only matters in sampled mode, where it decides which orderings get drawn. Sharing the URL reproduces the exact interleaving you are looking at. ",-1)])]),_:1}))}}),ow={class:"mb-3 text-xs text-slate-500 dark:text-slate-400"},aw={class:"flex max-h-52 flex-wrap gap-1.5 overflow-y-auto",role:"listbox"},rw=["aria-selected","title","onClick"],iw={key:0,class:"mt-2 text-xs text-slate-400 dark:text-slate-500"},lw=oe({__name:"ScheduleList",props:{outcomes:{},selected:{},summary:{},limit:{default:240}},emits:["select"],setup(t,{emit:e}){const n=t,s=e,o=E(()=>n.selected.join(",")),a=E(()=>[...n.outcomes].sort((u,c)=>Number(c.violates)-Number(u.violates))),r=E(()=>a.value.slice(0,n.limit)),i=E(()=>Math.max(0,a.value.length-r.value.length));function l(u){return u.map(c=>String.fromCharCode(65+c)).join("")}return(u,c)=>(x(),J(ye,{title:"Interleavings"},{default:D(()=>[h("p",ow,R(t.summary),1),h("div",aw,[(x(!0),A(ae,null,me(r.value,d=>(x(),A("button",{key:d.schedule.join(","),type:"button",role:"option","aria-selected":d.schedule.join(",")===o.value,title:d.violates?"Breaks the invariant":"Invariant holds throughout",class:de(["rounded-lg border px-2 py-1 font-mono text-[11px] font-semibold transition-colors",[d.violates?"border-rose-300 bg-rose-50 text-rose-600 hover:border-rose-500 dark:border-rose-700 dark:bg-rose-900/30 dark:text-rose-300":"border-slate-200 text-slate-500 hover:border-indigo-400 dark:border-slate-700 dark:text-slate-400",d.schedule.join(",")===o.value?"outline outline-2 outline-offset-1 outline-indigo-500":""]]),onClick:p=>s("select",d.schedule)},R(l(d.schedule)),11,rw))),128))]),i.value>0?(x(),A("p",iw," + "+R(i.value.toLocaleString())+" more not shown. ",1)):ge("",!0),c[0]||(c[0]=h("p",{class:"mt-3 text-[11px] text-slate-400 dark:text-slate-500"}," Each letter is a thread taking one step. A = T0, B = T1. ",-1))]),_:1}))}}),uw={class:"mb-4 text-xs text-slate-400 dark:text-slate-500"},cw={class:"flex flex-col gap-3"},dw={class:"flex items-center gap-2"},pw={class:"font-mono text-xs font-bold text-slate-500 dark:text-slate-400"},fw={class:"flex gap-1.5 overflow-x-auto pb-1"},hw={class:"mt-4 border-t border-slate-200 pt-3 dark:border-slate-700"},mw={class:"flex flex-wrap gap-2"},gw={key:0,class:"mt-3 font-mono text-xs text-slate-400 dark:text-slate-500"},bw=oe({__name:"ThreadLanes",props:{scenario:{},threads:{},sharedMem:{},lockOwners:{},lastAction:{},violated:{type:Boolean}},setup(t){const e=t,n=E(()=>e.scenario.threads.map((i,l)=>{var c;const u=e.threads[l];return{name:i.name,instructions:i.instructions,pc:(u==null?void 0:u.pc)??0,status:(u==null?void 0:u.status)??"ready",locals:(u==null?void 0:u.locals)??{},activeIndex:((c=e.lastAction)==null?void 0:c.threadId)===l&&u?u.pc-1:-1}})),s=E(()=>Object.entries(e.sharedMem)),o=E(()=>Object.entries(e.lockOwners));function a(i,l){const u=n.value[i];return l===u.activeIndex?u.status==="critical"?"border-rose-400 bg-rose-100 text-rose-700 dark:border-rose-500 dark:bg-rose-900/40 dark:text-rose-300":"border-indigo-400 bg-indigo-100 text-indigo-700 dark:border-indigo-500 dark:bg-indigo-900/40 dark:text-indigo-300":l<u.pc?"border-slate-200 bg-slate-100 text-slate-400 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-500":"border-slate-200 text-slate-500 dark:border-slate-700 dark:text-slate-400"}const r={ready:"bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",critical:"bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300",done:"bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400"};return(i,l)=>(x(),J(ye,{class:"flex h-full flex-col",title:"Threads"},{header:D(()=>[h("span",{class:de(["rounded-full px-2.5 py-0.5 text-xs font-semibold",t.violated?"bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300":"bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400"])},R(t.violated?"✕ invariant broken":"✓ invariant holds"),3)]),default:D(()=>[h("p",uw,R(t.scenario.invariant.label),1),h("div",cw,[(x(!0),A(ae,null,me(n.value,(u,c)=>(x(),A("div",{key:u.name,class:"flex flex-col gap-1.5"},[h("div",dw,[h("span",pw,R(u.name),1),h("span",{class:de(["rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",r[u.status]])},R(u.status==="critical"?"in critical section":u.status),3),(x(!0),A(ae,null,me(u.locals,(d,p)=>(x(),A("span",{key:p,class:"font-mono text-[11px] text-slate-400 dark:text-slate-500"},R(p)+"="+R(d),1))),128))]),h("div",fw,[(x(!0),A(ae,null,me(u.instructions,(d,p)=>(x(),A("span",{key:p,class:de(["whitespace-nowrap rounded-lg border px-2.5 py-1.5 font-mono text-[11px] transition-colors",a(c,p)])},R(d.label),3))),128))])]))),128))]),h("div",hw,[h("div",mw,[(x(!0),A(ae,null,me(s.value,([u,c])=>(x(),A("span",{key:u,class:"rounded-lg bg-slate-100 px-2.5 py-1.5 font-mono text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300"},R(u)+": "+R(c),1))),128)),(x(!0),A(ae,null,me(o.value,([u,c])=>(x(),A("span",{key:u,class:de(["rounded-lg px-2.5 py-1.5 font-mono text-xs",c===null?"bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400":"bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"])}," lock "+R(u)+": "+R(c===null?"free":`held by T${c}`),3))),128))]),t.lastAction?(x(),A("p",gw," T"+R(t.lastAction.threadId)+" ran “"+R(t.lastAction.instruction)+"” ",1)):ge("",!0)])]),_:1}))}}),vw={class:"grid gap-4 lg:grid-cols-[minmax(0,360px)_1fr]"},yw={class:"flex flex-col gap-4"},ww={class:"flex flex-col gap-4"},xw={class:"mb-3 grid grid-cols-2 gap-2 sm:grid-cols-4"},kw={class:"text-sm text-slate-500 dark:text-slate-400"},Sw=oe({__name:"ConcurrencyView",setup(t){const e=Wy(),n=E(()=>e.selected.value),s=E(()=>{const a=n.value;return a?a.violates?`This ordering breaks the invariant, first at step ${a.firstViolationIndex+1}.`:"This ordering is safe — the invariant holds at every step.":"No interleaving selected."}),o=E(()=>{var a,r,i;return[{label:"Step",value:`${e.stats.executed} / ${e.stats.total}`},{label:"Broken",value:(((a=e.search.value)==null?void 0:a.violatingCount)??0).toLocaleString()},{label:"Checked",value:(((r=e.search.value)==null?void 0:r.checkedCount)??0).toLocaleString()},{label:"Coverage",value:((i=e.search.value)==null?void 0:i.mode)==="exhaustive"?"all":"sampled"}]});return(a,r)=>{var i;return x(),A("div",vw,[h("div",yw,[C(sw),C(nw,{scenario:f(e).scenarioKey.value,"onUpdate:scenario":r[0]||(r[0]=l=>f(e).scenarioKey.value=l),speed:f(e).speed.value,"onUpdate:speed":r[1]||(r[1]=l=>f(e).speed.value=l),status:f(e).status.value,"can-edit":f(e).canEdit.value,"is-running":f(e).isRunning.value,"is-paused":f(e).isPaused.value,"has-schedule":f(e).schedule.value.length>0,seed:f(e).seed.value,onRun:r[2]||(r[2]=l=>f(e).run()),onPause:r[3]||(r[3]=l=>f(e).pause()),onReset:r[4]||(r[4]=l=>f(e).reset()),onRandomize:r[5]||(r[5]=l=>f(e).randomizeSeed()),"onUpdate:seed":r[6]||(r[6]=l=>f(e).seed.value=l)},null,8,["scenario","speed","status","can-edit","is-running","is-paused","has-schedule","seed"]),C(gn,{cursor:f(e).cursor.value,"buffered-count":f(e).bufferedCount.value,"fully-buffered":f(e).fullyBuffered.value,"can-step-back":f(e).canStepBack.value,"can-step-forward":f(e).canStepForward.value,onSeek:r[7]||(r[7]=l=>f(e).seek(l)),onStepBack:r[8]||(r[8]=l=>f(e).stepBack()),onStepForward:r[9]||(r[9]=l=>f(e).stepForward()),onSkipToEnd:r[10]||(r[10]=l=>f(e).skipToEnd())},null,8,["cursor","buffered-count","fully-buffered","can-step-back","can-step-forward"])]),h("div",ww,[C(ye,{title:"Search"},{header:D(()=>{var l,u;return[h("span",{class:de(["rounded-full px-2.5 py-0.5 text-xs font-semibold",(l=n.value)!=null&&l.violates?"bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300":"bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400"])},R((u=n.value)!=null&&u.violates?"Buggy ordering":"Safe ordering"),3)]}),default:D(()=>[h("div",xw,[(x(!0),A(ae,null,me(o.value,l=>(x(),J(Mt,{key:l.label,label:l.label,value:l.value},null,8,["label","value"]))),128))]),h("p",kw,R(s.value),1)]),_:1}),C(lw,{outcomes:((i=f(e).search.value)==null?void 0:i.outcomes)??[],selected:f(e).schedule.value,summary:f(e).summary.value,onSelect:r[11]||(r[11]=l=>f(e).selectSchedule(l))},null,8,["outcomes","selected","summary"]),C(bw,{class:"flex-1",scenario:f(e).scenario.value,threads:f(e).threads.value,"shared-mem":f(e).sharedMem.value,"lock-owners":f(e).lockOwners.value,"last-action":f(e).lastAction.value,violated:f(e).violatedNow.value},null,8,["scenario","threads","shared-mem","lock-owners","last-action","violated"])])])}}}),$w={key:0,class:"text-sm text-slate-500 dark:text-slate-400"},Ew={key:1,class:"space-y-3"},Cw={key:0,class:"text-sm text-slate-600 dark:text-slate-300"},Aw={key:1,class:"break-words rounded-xl bg-slate-50 p-3 font-mono text-sm text-slate-800 dark:bg-slate-800/50 dark:text-slate-100 sm:text-base"},Tw={key:2,class:"space-y-1.5 text-sm"},Ow={class:"text-slate-500 dark:text-slate-400"},Er=oe({__name:"AvStepInspector",props:{title:{default:"Why this step"},headline:{default:null},formula:{default:null},rows:{default:()=>[]},empty:{default:"Run a step to see how it was computed."}},setup(t){const e=t,n={neutral:"text-slate-700 dark:text-slate-200",good:"text-emerald-600 dark:text-emerald-400",warn:"text-amber-600 dark:text-amber-400",bad:"text-rose-600 dark:text-rose-400"};function s(a){return n[a??"neutral"]}const o=E(()=>!e.headline&&!e.formula&&e.rows.length===0);return(a,r)=>(x(),J(ye,{title:t.title},{default:D(()=>[o.value?(x(),A("p",$w,R(t.empty),1)):(x(),A("div",Ew,[t.headline?(x(),A("p",Cw,R(t.headline),1)):ge("",!0),t.formula?(x(),A("div",Aw,R(t.formula),1)):ge("",!0),t.rows.length?(x(),A("dl",Tw,[(x(!0),A(ae,null,me(t.rows,i=>(x(),A("div",{key:i.label,class:"flex items-center justify-between gap-3"},[h("dt",Ow,R(i.label),1),h("dd",{class:de(["break-words text-right font-mono",s(i.tone)])},R(i.value),3)]))),128))])):ge("",!0)]))]),_:1},8,["title"]))}}),Mw={class:"mt-5 grid grid-cols-2 gap-2"},Rw={class:"mt-3 text-center text-xs text-slate-400"},Iw=oe({__name:"DpControls",props:{speed:{},status:{},canEdit:{type:Boolean},isRunning:{type:Boolean},isPaused:{type:Boolean},canRun:{type:Boolean}},emits:["update:speed","run","pause","reset","step"],setup(t,{emit:e}){const n=t,s=e,o=E(()=>n.canRun?n.canEdit?"Editing the input clears the table and starts over.":"The algorithm and its input lock while the table fills.":"Fix the input before running.");return(a,r)=>(x(),J(ye,{title:"Controls"},{default:D(()=>[C(Ve,{label:"Speed","model-value":t.speed,min:1,max:100,suffix:"%","onUpdate:modelValue":r[0]||(r[0]=i=>s("update:speed",i))},null,8,["model-value"]),h("div",Mw,[t.isRunning?(x(),J(ee,{key:1,variant:"warning",class:"col-span-2",onClick:r[2]||(r[2]=i=>s("pause"))},{default:D(()=>[...r[6]||(r[6]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M6 4h4v16H6zM14 4h4v16h-4z"})],-1),O(" Pause ",-1)])]),_:1})):(x(),J(ee,{key:0,variant:"primary",class:"col-span-2",disabled:!t.canRun,onClick:r[1]||(r[1]=i=>s("run"))},{default:D(()=>[r[5]||(r[5]=h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M8 5v14l11-7z"})],-1)),O(" "+R(t.isPaused?"Resume":"Run"),1)]),_:1},8,["disabled"])),C(ee,{variant:"neutral",onClick:r[3]||(r[3]=i=>s("reset"))},{default:D(()=>[...r[7]||(r[7]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.36 2.64L3 8"}),h("path",{d:"M3 3v5h5"})],-1),O(" Reset ",-1)])]),_:1}),C(ee,{variant:"neutral",disabled:!t.canRun,onClick:r[4]||(r[4]=i=>s("step"))},{default:D(()=>[...r[8]||(r[8]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M6 5v14l9-7z"}),h("path",{d:"M17 5h2v14h-2z"})],-1),O(" Step ",-1)])]),_:1},8,["disabled"])]),h("p",Rw,R(o.value),1)]),_:1}))}}),_w=oe({__name:"DpGuide",setup(t){return(e,n)=>(x(),J(Ks,{title:"How to read this",summary:"Every cell is a smaller version of the same question, answered once and reused.","start-open":""},{default:D(()=>[...n[0]||(n[0]=[h("p",{class:"mb-3 text-slate-600 dark:text-slate-300"},[O(" A dynamic programming table is a list of subproblems with their answers written down. Each cell asks a smaller version of the same question — "),h("em",null,"what is the best I can do with the first 3 items and a capacity of 5?"),O(" — and the recurrence at the top of the table says how to answer it using cells that are already filled in. Nothing is ever computed twice, which is the entire trick: the naive recursion asks the same subproblem over and over, and the table simply refuses to. ")],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400"}," Reading the arrows ",-1),h("p",{class:"mb-3 text-slate-600 dark:text-slate-300"},[O(" The "),h("span",{class:"text-amber-600 dark:text-amber-400"},"amber cell"),O(" is the one being computed right now. The "),h("span",{class:"text-sky-600 dark:text-sky-400"},"blue cells"),O(" are the ones its recurrence read, and an arrow runs from each of them into it. Where the recurrence has to "),h("em",null,"choose"),O(" — take the item or skip it, insert or delete or substitute — the winning branch is drawn "),h("span",{class:"text-rose-600 dark:text-rose-400"},"thicker and in red"),O(", and the others stay thin. That red arrow is the decision the traceback will later follow back. ")],-1),h("p",{class:"mb-3 text-slate-600 dark:text-slate-300"},[O(" Hover any cell — filled or not, at any point in the run — to see the arrows for "),h("em",null,"that"),O(" cell instead, drawn dashed. They come from the same function the animation uses, so what you see on hover is exactly what the algorithm would read. ")],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400"}," The traceback ",-1),h("p",{class:"mb-3 text-slate-600 dark:text-slate-300"},[O(" Filling the table answers the question with a "),h("em",null,"number"),O(": the length of the longest common subsequence, the cost of the cheapest parenthesisation. It does not, by itself, tell you "),h("em",null,"which"),O(" subsequence or "),h("em",null,"which"),O(" parenthesisation. The "),h("span",{class:"text-emerald-600 dark:text-emerald-400"},"green path"),O(" is the second pass that recovers it, walking backwards from the answer cell and, at each step, asking which branch won there. That is why the traceback lights up a thin path through a large table — most of the cells were needed to be sure, but only a few are part of the answer. ")],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400"}," Cells versus calls ",-1),h("p",{class:"text-slate-500 dark:text-slate-400"},[O(" The stats panel counts both: the cells this table costs, and the calls the naive recursion would have made on the same input. Fibonacci at n = 40 is 41 cells against 331 million calls. The call counts are exact, not estimated — and where one grows past what a JavaScript number can hold exactly, it is shown as a lower bound ("),h("code",{class:"font-mono text-xs"},"> 9.0e15"),O(") rather than as a wrong-looking round number. ")],-1)])]),_:1}))}}),jw={class:"space-y-4"},Dw={class:"text-xs text-slate-400"},Pw={key:0,class:"mt-3 text-xs text-rose-500 dark:text-rose-400"},Lw={key:1,class:"mt-3 text-xs text-slate-400"},Nw={class:"mt-4"},Bw=oe({__name:"DpInputPanel",props:{algoKey:{},input:{},canEdit:{type:Boolean}},emits:["update:input","shuffle"],setup(t,{emit:e}){const n=t,s=e,o=Pe({n:12,coins:"",amount:11,values:"",weights:"",itemValues:"",capacity:9,a:"",b:"",dims:""});let a="";const r=E(()=>Ht[n.algoKey]),i=E(()=>Tu(r.value,n.input)),l=E(()=>r.value.kind),u=E(()=>{const b=i.value.axes.colTitle||"size";return b.charAt(0).toUpperCase()+b.slice(1)}),c=E(()=>{const{rows:b,cols:w}=i.value.dims;return{rows:b,cols:w,cells:b*w}});function d(){const b=Tn(o.weights,{min:1,max:99,maxLength:30});if(b.error)return{items:null,error:b.error};const k=o.itemValues.trim()===""?{values:b.values.map(()=>0),error:null}:Tn(o.itemValues,{min:0,max:999,maxLength:30});return k.error?{items:null,error:k.error}:k.values.length!==b.values.length?{items:null,error:`Give one value per weight — ${b.values.length} weights, ${k.values.length} values.`}:{items:b.values.map((T,_)=>({weight:T,value:k.values[_]})),error:null}}const p=E(()=>{switch(l.value){case"scalar":return{input:{kind:"scalar",n:o.n},error:null};case"coins":{const b=Tn(o.coins,{min:1,max:99,maxLength:8});return b.error?{input:null,error:b.error}:{input:{kind:"coins",coins:b.values,amount:o.amount},error:null}}case"sequence":{const b=Tn(o.values,{min:1,max:99,maxLength:40});return b.error?{input:null,error:b.error}:{input:{kind:"sequence",values:b.values},error:null}}case"items":{const{items:b,error:w}=d();return b===null?{input:null,error:w}:{input:{kind:"items",items:b,capacity:o.capacity},error:null}}case"strings2":return{input:{kind:"strings2",a:o.a,b:o.b},error:null};case"chain":{const b=Tn(o.dims,{min:1,max:999,maxLength:31});return b.error?{input:null,error:b.error}:{input:{kind:"chain",dims:b.values},error:null}}}return{input:null,error:null}}),m=E(()=>p.value.error!==null?p.value.error:p.value.input===null?null:$o(r.value,p.value.input));function y(){const b=p.value.input;b!==null&&$o(r.value,b)===null&&(a=Es(b),s("update:input",b))}function g(b,w){o[b]=w,y()}function v(b){switch(b.kind){case"scalar":o.n=b.n;break;case"coins":o.coins=b.coins.join(", "),o.amount=b.amount;break;case"sequence":o.values=b.values.join(", ");break;case"items":o.weights=b.items.map(w=>w.weight).join(", "),o.itemValues=b.items.map(w=>w.value).join(", "),o.capacity=b.capacity;break;case"strings2":o.a=b.a,o.b=b.b;break;case"chain":o.dims=b.dims.join(", ");break}a=Es(b)}return _e(()=>n.input,b=>{Es(b)!==a&&v(b)},{immediate:!0,deep:!0}),(b,w)=>(x(),J(ye,{title:"Input"},{default:D(()=>[h("div",jw,[l.value==="scalar"?(x(),J(Ve,{key:0,label:"n","model-value":o.n,min:0,max:40,disabled:!t.canEdit,"onUpdate:modelValue":w[0]||(w[0]=k=>g("n",k))},null,8,["model-value","disabled"])):l.value==="coins"?(x(),A(ae,{key:1},[C(vt,{label:"Coin values",placeholder:"1, 3, 4",monospace:"","model-value":o.coins,disabled:!t.canEdit,"onUpdate:modelValue":w[1]||(w[1]=k=>g("coins",k))},null,8,["model-value","disabled"]),C(Ve,{label:u.value,"model-value":o.amount,min:0,max:60,disabled:!t.canEdit,"onUpdate:modelValue":w[2]||(w[2]=k=>g("amount",k))},null,8,["label","model-value","disabled"])],64)):l.value==="sequence"?(x(),J(vt,{key:2,label:"Sequence",placeholder:"3, 10, 2, 1, 20",monospace:"","model-value":o.values,disabled:!t.canEdit,"onUpdate:modelValue":w[3]||(w[3]=k=>g("values",k))},null,8,["model-value","disabled"])):l.value==="items"?(x(),A(ae,{key:3},[C(vt,{label:"Item weights",placeholder:"2, 3, 4, 5",monospace:"","model-value":o.weights,disabled:!t.canEdit,"onUpdate:modelValue":w[4]||(w[4]=k=>g("weights",k))},null,8,["model-value","disabled"]),C(vt,{label:"Item values (blank = all zero)",placeholder:"3, 4, 5, 8",monospace:"","model-value":o.itemValues,disabled:!t.canEdit,"onUpdate:modelValue":w[5]||(w[5]=k=>g("itemValues",k))},null,8,["model-value","disabled"]),C(Ve,{label:u.value,"model-value":o.capacity,min:0,max:60,disabled:!t.canEdit,"onUpdate:modelValue":w[6]||(w[6]=k=>g("capacity",k))},null,8,["label","model-value","disabled"])],64)):l.value==="strings2"?(x(),A(ae,{key:4},[C(vt,{label:"String a (rows)",placeholder:"kitten",monospace:"","model-value":o.a,disabled:!t.canEdit,"onUpdate:modelValue":w[7]||(w[7]=k=>g("a",k))},null,8,["model-value","disabled"]),C(vt,{label:"String b (columns)",placeholder:"sitting",monospace:"","model-value":o.b,disabled:!t.canEdit,"onUpdate:modelValue":w[8]||(w[8]=k=>g("b",k))},null,8,["model-value","disabled"])],64)):(x(),A(ae,{key:5},[C(vt,{label:"Matrix dimensions",placeholder:"40, 20, 30, 10, 30",monospace:"","model-value":o.dims,disabled:!t.canEdit,"onUpdate:modelValue":w[9]||(w[9]=k=>g("dims",k))},null,8,["model-value","disabled"]),h("p",Dw,R(c.value.rows)+" matrices — dimension i and i + 1 are the shape of matrix i. ",1)],64))]),m.value?(x(),A("p",Pw,R(m.value),1)):(x(),A("p",Lw," Table: "+R(c.value.rows)+" × "+R(c.value.cols)+" = "+R(c.value.cells.toLocaleString())+" cells (limit "+R(f(Da).toLocaleString())+"). ",1)),h("div",Nw,[C(ee,{variant:"quiet",class:"w-full",disabled:!t.canEdit,onClick:w[10]||(w[10]=k=>s("shuffle"))},{default:D(()=>[...w[11]||(w[11]=[O(" Shuffle input ",-1)])]),_:1},8,["disabled"])])]),_:1}))}}),Cr=oe({__name:"AvStatGrid",props:{cells:{},columns:{default:4}},setup(t){const e={2:"grid grid-cols-2 gap-2",3:"grid grid-cols-2 gap-2 sm:grid-cols-3",4:"grid grid-cols-2 gap-2 sm:grid-cols-4"};return(n,s)=>(x(),A("div",{class:de(e[t.columns])},[(x(!0),A(ae,null,me(t.cells,o=>(x(),J(Mt,{key:o.label,label:o.label,value:o.value},null,8,["label","value"]))),128))],2))}}),Fw={key:0,class:"mb-3 break-words rounded-xl bg-emerald-50 p-3 text-center text-sm font-semibold text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"},Vw={key:1,class:"mb-3 rounded-xl bg-amber-50 p-3 text-center text-xs font-semibold text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"},Hw=oe({__name:"DpStats",props:{cellsFilled:{},fillable:{},rows:{},cols:{},naiveCalls:{},speedup:{},steps:{},elapsedMs:{},status:{},result:{},truncated:{type:Boolean}},setup(t){const e=t,n=E(()=>e.speedup<=0?"—":`${Mu(e.naiveCalls)?"> ":""}${Si(Math.round(e.speedup))}×`),s=E(()=>[{label:"Cells filled",value:`${e.cellsFilled.toLocaleString()} / ${e.fillable.toLocaleString()}`},{label:"Naive calls",value:Si(e.naiveCalls)},{label:"Cheaper by",value:n.value},{label:"Table",value:`${e.rows} × ${e.cols}`},{label:"Steps",value:e.steps.toLocaleString()},{label:"Elapsed",value:`${(e.elapsedMs/1e3).toFixed(2)}s`}]),o=E(()=>({idle:"Idle",running:"Running",paused:"Paused",done:"Done"})[e.status]??e.status),a=E(()=>({idle:"bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",running:"bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400",paused:"bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400",done:"bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400"})[e.status]);return(r,i)=>(x(),J(ye,{title:"Stats"},{header:D(()=>[h("span",{class:de(["rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",a.value])},R(o.value),3)]),default:D(()=>[t.result?(x(),A("div",Fw,R(t.result),1)):ge("",!0),t.truncated?(x(),A("div",Vw," The step cap stopped this run early — the counts below are partial. ")):ge("",!0),C(Cr,{cells:s.value,columns:3},null,8,["cells"])]),_:1}))}}),Uw=34,zw=4,qw=40,Kw=6;function nl(t,e,n,s=0){const o=n.x-t.x,a=n.y-t.y,r=Math.hypot(o,a);if(r===0)return{x:t.x,y:t.y};const i=o/r,l=a/r,u=i===0?1/0:e.w/Math.abs(i),c=l===0?1/0:e.h/Math.abs(l),d=Math.min(u,c)+s;return{x:t.x+i*d,y:t.y+l*d}}function Gw(t){const e=Math.max(0,t.rows),n=Math.max(0,t.cols),s=t.cell??Uw,o=t.gap??zw,a=t.header??qw,r=t.pad??Kw,i=s+o,l=r+a,u=r+a,c=n===0?l+r:l+n*i-o+r,d=e===0?u+r:u+e*i-o+r,p={w:s/2,h:s/2},m=(g,v)=>({x:l+v*i,y:u+g*i,w:s,h:s}),y=(g,v)=>({x:l+v*i+s/2,y:u+g*i+s/2});return{rows:e,cols:n,cell:s,gap:o,header:a,pad:r,width:c,height:d,viewBox:`0 0 ${c} ${d}`,cellRect:m,center:y,rowHeaderRect:g=>({x:r,y:u+g*i,w:a,h:s}),colHeaderRect:g=>({x:l+g*i,y:r,w:s,h:a}),arrow:(g,v)=>{if(g.row===v.row&&g.col===v.col)return null;const b=y(g.row,g.col),w=y(v.row,v.col),k=nl(b,p,w,1),T=nl(w,p,b,3);return{x1:k.x,y1:k.y,x2:T.x,y2:T.y}}}}const Ww={class:"mb-3 flex flex-wrap items-center gap-x-4 gap-y-2"},Yw={class:"text-xs font-semibold uppercase tracking-wider text-slate-400"},Xw={key:0,class:"rounded-lg bg-slate-100 px-2 py-1 font-mono text-xs text-indigo-600 dark:bg-slate-800 dark:text-indigo-300"},Jw=["width","height","viewBox"],Qw=["x","y"],Zw=["x","y"],ex=["x","y"],tx=["x","y"],nx=["aria-label","data-cell","data-tone","onPointerenter"],sx=["x","y","width","height"],ox=["x","y","font-size"],ax={class:"pointer-events-none"},rx=["x1","y1","x2","y2"],ix=["x1","y1","x2","y2","stroke-width","marker-end"],lx=oe({__name:"DpTable",props:{table:{},axes:{},recurrence:{default:""},cursor:{default:null},deps:{default:()=>[]},chosen:{default:null},path:{default:()=>[]},hoverCell:{default:null},hoverDeps:{default:()=>[]},title:{default:"Table"}},emits:["hover-cell"],setup(t,{emit:e}){const n=t,s=e,o={empty:"fill-slate-100 dark:fill-slate-800/60",filled:"fill-indigo-50 dark:fill-indigo-500/15",path:"fill-emerald-200 dark:fill-emerald-500/40",dep:"fill-sky-200 dark:fill-sky-500/40",focus:"fill-amber-200 dark:fill-amber-500/30",filling:"fill-amber-300 dark:fill-amber-500/60"},a=[{label:"Not computed",class:"bg-slate-100 dark:bg-slate-800/60"},{label:"Computed",class:"bg-indigo-50 dark:bg-indigo-500/15"},{label:"Filling now",class:"bg-amber-300 dark:bg-amber-500/60"},{label:"Read by this cell",class:"bg-sky-200 dark:bg-sky-500/40"},{label:"Traceback",class:"bg-emerald-200 dark:bg-emerald-500/40"}];function r(j){return`${j.row},${j.col}`}const i=E(()=>n.table.length),l=E(()=>{var j;return((j=n.table[0])==null?void 0:j.length)??0}),u=E(()=>Gw({rows:i.value,cols:l.value})),c=E(()=>new Set(n.deps.map(r))),d=E(()=>new Set(n.hoverDeps.map(r))),p=E(()=>new Set(n.path.map(r)));function m(j,P){const I=`${j},${P}`;return n.cursor&&n.cursor.row===j&&n.cursor.col===P?"filling":n.hoverCell&&n.hoverCell.row===j&&n.hoverCell.col===P?"focus":c.value.has(I)||d.value.has(I)?"dep":p.value.has(I)?"path":n.table[j][P]===null?"empty":"filled"}function y(j){return Math.round(Math.min(13,50/Math.max(1,j.length))*2)/2}function g(j){return j.length>7?`${j.slice(0,6)}…`:j}const v={empty:"",filled:"",filling:", being computed now",focus:"",dep:", read by the current cell",path:", on the traceback path"},b=E(()=>{const j=[];for(let P=0;P<i.value;P++)for(let I=0;I<l.value;I++){const he=n.table[P][I],ke=Nn(he),q=m(P,I),L=n.axes.rowHeaders[P]??String(P),z=n.axes.colHeaders[I]??String(I);j.push({key:`${P},${I}`,row:P,col:I,rect:u.value.cellRect(P,I),text:ke,fontSize:y(ke),tone:q,label:he===null?`${L} by ${z}: not computed yet`:`${L} by ${z}: ${ke}${v[q]}`})}return j}),w=E(()=>Array.from({length:l.value},(j,P)=>{const I=n.axes.colHeaders[P]??String(P),he=u.value.colHeaderRect(P);return{key:P,x:he.x+u.value.cell/2,y:he.y+he.h-8,text:g(I),full:I}})),k=E(()=>Array.from({length:i.value},(j,P)=>{const I=n.axes.rowHeaders[P]??String(P),he=u.value.rowHeaderRect(P);return{key:P,x:he.x+he.w-6,y:he.y+he.h/2,text:g(I),full:I}}));function T(j,P,I){if(j===null)return[];const he=new Set,ke=[];for(const q of P){const L=r(q);if(he.has(L))continue;he.add(L);const z=u.value.arrow(q,j);z!==null&&ke.push({key:L,...z,chosen:I!==null&&I.row===q.row&&I.col===q.col,label:q.label})}return ke.sort((q,L)=>Number(q.chosen)-Number(L.chosen))}const _=E(()=>T(n.cursor,n.deps,n.chosen)),N=E(()=>{const j=n.hoverCell;return j===null?[]:n.cursor&&n.cursor.row===j.row&&n.cursor.col===j.col?[]:T(j,n.hoverDeps,null)});function G(j,P){s("hover-cell",{row:j,col:P})}return(j,P)=>(x(),J(ye,{class:"flex h-full flex-col"},{default:D(()=>[h("div",Ww,[h("h2",Yw,R(t.title),1),t.recurrence?(x(),A("code",Xw,R(t.recurrence),1)):ge("",!0),C(qs,{items:a})]),h("div",{class:"max-h-[60vh] flex-1 overflow-auto rounded-xl bg-slate-50 p-3 dark:bg-slate-950/40",onPointerleave:P[0]||(P[0]=I=>s("hover-cell",null))},[(x(),A("svg",{width:u.value.width,height:u.value.height,viewBox:u.value.viewBox,class:"block select-none"},[P[1]||(P[1]=h("defs",null,[h("marker",{id:"dp-arrowhead",viewBox:"0 0 8 8",refX:"7",refY:"4",markerWidth:"5",markerHeight:"5",orient:"auto-start-reverse"},[h("path",{d:"M0 0 L8 4 L0 8 z",class:"fill-slate-400 dark:fill-slate-500"})]),h("marker",{id:"dp-arrowhead-chosen",viewBox:"0 0 8 8",refX:"7",refY:"4",markerWidth:"5",markerHeight:"5",orient:"auto-start-reverse"},[h("path",{d:"M0 0 L8 4 L0 8 z",class:"fill-rose-500"})])],-1)),(x(!0),A(ae,null,me(w.value,I=>(x(),A("text",{key:`col-${I.key}`,x:I.x,y:I.y,"text-anchor":"middle","dominant-baseline":"central",class:"fill-slate-500 text-[10px] font-semibold dark:fill-slate-400"},[h("title",null,R(I.full),1),O(" "+R(I.text),1)],8,Qw))),128)),(x(!0),A(ae,null,me(k.value,I=>(x(),A("text",{key:`row-${I.key}`,x:I.x,y:I.y,"text-anchor":"end","dominant-baseline":"central",class:"fill-slate-500 text-[10px] font-semibold dark:fill-slate-400"},[h("title",null,R(I.full),1),O(" "+R(I.text),1)],8,Zw))),128)),t.axes.colTitle?(x(),A("text",{key:0,x:u.value.pad+4,y:u.value.pad+u.value.header/2-6,class:"fill-slate-400 text-[9px] font-semibold uppercase tracking-wide"},R(t.axes.colTitle)+" → ",9,ex)):ge("",!0),t.axes.rowTitle?(x(),A("text",{key:1,x:u.value.pad+4,y:u.value.pad+u.value.header/2+8,class:"fill-slate-400 text-[9px] font-semibold uppercase tracking-wide"},R(t.axes.rowTitle)+" ↓ ",9,tx)):ge("",!0),(x(!0),A(ae,null,me(b.value,I=>(x(),A("g",{key:I.key,role:"img","aria-label":I.label,"data-cell":I.key,"data-tone":I.tone,onPointerenter:he=>G(I.row,I.col)},[h("title",null,R(I.label),1),h("rect",{x:I.rect.x,y:I.rect.y,width:I.rect.w,height:I.rect.h,rx:"4",class:de(["transition-colors duration-150 ease-out",o[I.tone]])},null,10,sx),h("text",{x:I.rect.x+I.rect.w/2,y:I.rect.y+I.rect.h/2,"font-size":I.fontSize,"text-anchor":"middle","dominant-baseline":"central",class:de(["pointer-events-none font-semibold",I.tone==="empty"?"fill-slate-400 dark:fill-slate-600":"fill-slate-800 dark:fill-slate-100"])},R(I.text),11,ox)],40,nx))),128)),h("g",ax,[(x(!0),A(ae,null,me(N.value,I=>(x(),A("line",{key:`hover-${I.key}`,x1:I.x1,y1:I.y1,x2:I.x2,y2:I.y2,"stroke-width":"1.5","stroke-dasharray":"3 3","marker-end":"url(#dp-arrowhead)",class:"stroke-slate-400 dark:stroke-slate-500"},null,8,rx))),128)),(x(!0),A(ae,null,me(_.value,I=>(x(),A("line",{key:I.key,x1:I.x1,y1:I.y1,x2:I.x2,y2:I.y2,"stroke-width":I.chosen?2.5:1.5,"marker-end":I.chosen?"url(#dp-arrowhead-chosen)":"url(#dp-arrowhead)",class:de(I.chosen?"stroke-rose-500":"stroke-slate-400 dark:stroke-slate-500")},[h("title",null,R(I.label),1)],10,ix))),128))])],8,Jw))],32),P[2]||(P[2]=h("p",{class:"mt-3 text-center text-xs text-slate-400"}," Hover any cell to see which cells its value was read from. ",-1))]),_:1}))}}),ux={class:"grid gap-4 lg:grid-cols-[minmax(0,360px)_1fr]"},cx={class:"flex flex-col gap-4"},dx={class:"flex flex-col gap-4"},px=oe({__name:"DpView",setup(t){const e=Eg();function n(r){return e.dims.value.rows===1?`dp[${r.col}]`:`dp[${r.row}][${r.col}]`}function s(r){const i=e.view.chosen;return i!==null&&i.row===r.row&&i.col===r.col}const o=E(()=>e.view.deps.map(r=>({label:r.label,value:`${n(r)} = ${Nn(r.value)}`,tone:s(r)?"good":"neutral"}))),a=E(()=>e.current.value===null?null:e.view.cursor!==null?`Computing ${n(e.view.cursor)}`:e.view.result!==null?"Finished — the answer is decoded from the table":e.view.path.length>0?"Tracing back through the branches that won":null);return(r,i)=>(x(),A("div",ux,[h("div",cx,[C(xn,{modelValue:f(e).algoKey.value,"onUpdate:modelValue":i[0]||(i[0]=l=>f(e).algoKey.value=l),algorithms:f(Ht),columns:2,disabled:!f(e).canEdit.value},null,8,["modelValue","algorithms","disabled"]),C(_w),C(Bw,{"algo-key":f(e).algoKey.value,input:f(e).input.value,"can-edit":f(e).canEdit.value,"onUpdate:input":i[1]||(i[1]=l=>f(e).setInput(l)),onShuffle:i[2]||(i[2]=l=>f(e).randomizeSeed())},null,8,["algo-key","input","can-edit"]),C(Iw,{speed:f(e).speed.value,"onUpdate:speed":i[3]||(i[3]=l=>f(e).speed.value=l),status:f(e).status.value,"can-edit":f(e).canEdit.value,"is-running":f(e).isRunning.value,"is-paused":f(e).isPaused.value,"can-run":f(e).canRun.value,onRun:i[4]||(i[4]=l=>f(e).run()),onPause:i[5]||(i[5]=l=>f(e).pause()),onReset:i[6]||(i[6]=l=>f(e).reset()),onStep:i[7]||(i[7]=l=>f(e).stepForward())},null,8,["speed","status","can-edit","is-running","is-paused","can-run"]),C(gn,{cursor:f(e).cursor.value,"buffered-count":f(e).bufferedCount.value,"fully-buffered":f(e).fullyBuffered.value,"can-step-back":f(e).canStepBack.value,"can-step-forward":f(e).canStepForward.value,onSeek:i[8]||(i[8]=l=>f(e).seek(l)),onStepBack:i[9]||(i[9]=l=>f(e).stepBack()),onStepForward:i[10]||(i[10]=l=>f(e).stepForward()),onSkipToEnd:i[11]||(i[11]=l=>f(e).skipToEnd())},null,8,["cursor","buffered-count","fully-buffered","can-step-back","can-step-forward"])]),h("div",dx,[C(Hw,{"cells-filled":f(e).stats.value.cellsFilled,fillable:f(e).stats.value.fillable,rows:f(e).stats.value.rows,cols:f(e).stats.value.cols,"naive-calls":f(e).stats.value.naiveCalls,speedup:f(e).stats.value.speedup,steps:f(e).stepCount.value,"elapsed-ms":f(e).elapsedMs.value,status:f(e).status.value,result:f(e).view.result,truncated:f(e).truncated.value},null,8,["cells-filled","fillable","rows","cols","naive-calls","speedup","steps","elapsed-ms","status","result","truncated"]),C(lx,{table:f(e).table.value,axes:f(e).axes.value,recurrence:f(e).recurrence.value,cursor:f(e).view.cursor,deps:f(e).view.deps,chosen:f(e).view.chosen,path:f(e).view.path,"hover-cell":f(e).hoverCell.value,"hover-deps":f(e).hoverDeps.value,onHoverCell:i[12]||(i[12]=l=>f(e).setHoverCell(l))},null,8,["table","axes","recurrence","cursor","deps","chosen","path","hover-cell","hover-deps"]),C(Er,{headline:a.value,formula:f(e).view.explain,rows:o.value,empty:"Run a step to see how a cell was computed."},null,8,["headline","formula","rows"]),C(Yo,{lines:f(e).pseudocodeLines.value,source:f(e).sourceCode.value.text,"source-file":f(e).sourceCode.value.file,"active-line":f(e).activeLine.value,"active-source-lines":f(e).activeSourceLines.value},null,8,["lines","source","source-file","active-line","active-source-lines"])])]))}}),fx=oe({__name:"MstGuide",setup(t){return(e,n)=>(x(),J(Ks,{title:"How to read this",summary:"A disjoint set answers one question fast: are these two nodes already connected?","start-open":""},{default:D(()=>[...n[0]||(n[0]=[h("p",{class:"mb-3 text-slate-600 dark:text-slate-300"},[O(" A "),h("b",null,"disjoint-set forest"),O(" (union-find) partitions a collection of elements into groups — here, nodes into the components they belong to — and supports exactly two operations: "),h("code",{class:"font-mono text-xs"},"find(x)"),O(", which returns the group's representative, and "),h("code",{class:"font-mono text-xs"},"union(a, b)"),O(", which merges two groups into one. Two elements are in the same group precisely when "),h("code",{class:"font-mono text-xs"},"find"),O(" returns the same answer for both. The forest panel on the right draws exactly that: an arrow from each node to its parent, with a self-pointing root marking a group's representative. ")],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400"}," Two optimizations, one payoff ",-1),h("ul",{class:"mb-4 space-y-2 text-slate-600 dark:text-slate-300"},[h("li",null,[h("b",null,"Union by rank."),O(" When two trees merge, the shallower one is hung under the deeper one, never the other way round. Do this consistently and a forest built from n elements can never get deeper than log₂(n) — the Stats panel's "),h("b",null,"Max Depth"),O(" is that bound made visible, not just another counter. ")]),h("li",null,[h("b",null,"Path compression."),O(" Every "),h("code",{class:"font-mono text-xs"},"find"),O(" re-hangs every node it walked through directly onto the root it found. The next "),h("code",{class:"font-mono text-xs"},"find"),O(` on any of those nodes is then one hop instead of a walk — watch the forest panel's amber "on find path" nodes turn emerald the instant this happens. `)])],-1),h("p",{class:"mb-4 text-slate-600 dark:text-slate-300"},[O(" Neither optimization is required for correctness — a disjoint set built without them still answers "),h("code",{class:"font-mono text-xs"},"find"),O(" and "),h("code",{class:"font-mono text-xs"},"union"),O(" correctly, just slowly, degenerating toward a linked list under an unlucky sequence of unions. Together they bring every operation down to "),h("code",{class:"font-mono text-xs"},"O(α(n))"),O(" amortized — "),h("code",{class:"font-mono text-xs"},"α"),O(' being the inverse Ackermann function, which is under 5 for any n you could ever construct. That is "constant time" in every practical sense. ')],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400"}," Why Kruskal needs exactly this ",-1),h("p",{class:"mb-2 text-slate-600 dark:text-slate-300"},[O(` Kruskal's rule is trivial to state — sort every edge by weight, then accept it unless its two endpoints are already connected — and completely useless without a fast answer to "already connected?", asked once per edge, on a component structure that is changing under the question as edges get accepted. A disjoint set is the one structure built to answer that question near-instantly: `),h("code",{class:"font-mono text-xs"},"find(u) === find(v)"),O(" is the whole cycle check, and "),h("code",{class:"font-mono text-xs"},"union(u, v)"),O(" is the whole merge. The two obvious alternatives are both dramatically worse — re-running a traversal from scratch per edge to check connectivity is O(E) work E times over, and maintaining an explicit component-id array means relabelling half the graph on every merge. ")],-1),h("p",{class:"text-slate-500 dark:text-slate-400"},` Prim doesn't strictly need one — it could track "in the tree / not in the tree" with a plain boolean array — but this visualization runs a real disjoint set underneath it anyway, purely so both algorithms render through the same forest panel. See prim.ts's own header comment for exactly which of its counters are meaningful as a result and which are just bookkeeping. `,-1)])]),_:1}))}}),hx={class:"space-y-4"},mx={class:"mt-5 grid grid-cols-2 gap-2"},gx={class:"mt-3 grid grid-cols-1 gap-2"},bx=oe({__name:"MstControls",props:{nodeCount:{},seed:{},speed:{},status:{},canEdit:{type:Boolean},isRunning:{type:Boolean},isPaused:{type:Boolean}},emits:["update:nodeCount","update:speed","update:seed","randomize","generate","run","pause","reset"],setup(t,{emit:e}){const n=e;function s(o){const a=Number(o);Number.isInteger(a)&&n("update:seed",a)}return(o,a)=>(x(),J(ye,{title:"Controls"},{default:D(()=>[h("div",hx,[C(Ve,{label:"Node count","model-value":t.nodeCount,min:f(tc),max:f(nc),disabled:!t.canEdit,"onUpdate:modelValue":a[0]||(a[0]=r=>n("update:nodeCount",r))},null,8,["model-value","min","max","disabled"]),C(Ve,{label:"Speed","model-value":t.speed,min:1,max:100,suffix:"%","onUpdate:modelValue":a[1]||(a[1]=r=>n("update:speed",r))},null,8,["model-value"]),C(vt,{label:"Seed",monospace:"","model-value":String(t.seed),disabled:!t.canEdit,"onUpdate:modelValue":s},null,8,["model-value","disabled"])]),h("div",mx,[t.isRunning?(x(),J(ee,{key:1,variant:"warning",class:"col-span-2",onClick:a[3]||(a[3]=r=>n("pause"))},{default:D(()=>[...a[8]||(a[8]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M6 4h4v16H6zM14 4h4v16h-4z"})],-1),O(" Pause ",-1)])]),_:1})):(x(),J(ee,{key:0,variant:"primary",class:"col-span-2",onClick:a[2]||(a[2]=r=>n("run"))},{default:D(()=>[a[7]||(a[7]=h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M8 5v14l11-7z"})],-1)),O(" "+R(t.isPaused?"Resume":"Run"),1)]),_:1})),C(ee,{variant:"neutral",onClick:a[4]||(a[4]=r=>n("reset"))},{default:D(()=>[...a[9]||(a[9]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.36 2.64L3 8"}),h("path",{d:"M3 3v5h5"})],-1),O(" Reset ",-1)])]),_:1}),C(ee,{variant:"neutral",disabled:!t.canEdit,onClick:a[5]||(a[5]=r=>n("generate"))},{default:D(()=>[...a[10]||(a[10]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"})],-1),O(" New Graph ",-1)])]),_:1},8,["disabled"])]),h("div",gx,[C(ee,{variant:"quiet",disabled:!t.canEdit,onClick:a[6]||(a[6]=r=>n("randomize"))},{default:D(()=>[...a[11]||(a[11]=[O(" New seed ",-1)])]),_:1},8,["disabled"])]),a[12]||(a[12]=h("p",{class:"mt-3 text-center text-xs text-slate-400"}," Node count, seed & algorithm lock while a run is in progress. ",-1))]),_:1}))}}),vx={class:"flex flex-wrap items-end gap-2"},yx={class:"block"},wx=["disabled"],xx={class:"block w-16"},kx=["max","disabled"],Sx={key:0,class:"block w-16"},$x=["max","disabled"],Ex={key:0,class:"mt-1.5 text-xs text-rose-500 dark:text-rose-400"},Cx={class:"mt-1.5 text-xs text-slate-400"},Ax={class:"mt-4"},Tx={key:0,class:"text-sm text-slate-400"},Ox={key:1,class:"max-h-48 space-y-1 overflow-y-auto pr-1"},Mx={class:"font-mono font-semibold text-slate-700 dark:text-slate-200"},Rx=["disabled","aria-label","onClick"],Ix={class:"mt-4 grid grid-cols-2 gap-2"},_x=oe({__name:"DsuOpBuilder",props:{ops:{},nodeCount:{},canEdit:{type:Boolean}},emits:["update:ops","randomize"],setup(t,{emit:e}){const n=t,s=e,o=F("union"),a=F("0"),r=F("0"),i=F(null),l=E(()=>Math.max(0,n.nodeCount-1));function u(y){const g=Number(y);return!Number.isInteger(g)||g<0||g>l.value?null:g}function c(y){return y.kind==="union"?`union(${y.a}, ${y.b})`:`find(${y.a})`}function d(){if(!n.canEdit)return;const y=u(a.value);if(y===null){i.value=`Node index must be a whole number from 0 to ${l.value}.`;return}if(o.value==="find"){i.value=null,s("update:ops",[...n.ops,{kind:"find",a:y}]);return}const g=u(r.value);if(g===null){i.value=`Node index must be a whole number from 0 to ${l.value}.`;return}i.value=null,s("update:ops",[...n.ops,{kind:"union",a:y,b:g}])}function p(y){n.canEdit&&s("update:ops",n.ops.filter((g,v)=>v!==y))}function m(){n.canEdit&&s("update:ops",[])}return(y,g)=>(x(),J(ye,{title:"Operation Script"},{default:D(()=>[h("div",vx,[h("label",yx,[g[5]||(g[5]=h("span",{class:"mb-1.5 block text-sm font-medium text-slate-600 dark:text-slate-300"}," Op ",-1)),ws(h("select",{"onUpdate:modelValue":g[0]||(g[0]=v=>o.value=v),disabled:!t.canEdit,class:"rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-sm text-slate-800 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"},[...g[4]||(g[4]=[h("option",{value:"union"},"union",-1),h("option",{value:"find"},"find",-1)])],8,wx),[[_p,o.value]])]),h("label",xx,[g[6]||(g[6]=h("span",{class:"mb-1.5 block text-sm font-medium text-slate-600 dark:text-slate-300"}," a ",-1)),ws(h("input",{"onUpdate:modelValue":g[1]||(g[1]=v=>a.value=v),type:"number",min:0,max:l.value,disabled:!t.canEdit,class:"w-full rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-sm text-slate-800 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"},null,8,kx),[[ko,a.value]])]),o.value==="union"?(x(),A("label",Sx,[g[7]||(g[7]=h("span",{class:"mb-1.5 block text-sm font-medium text-slate-600 dark:text-slate-300"}," b ",-1)),ws(h("input",{"onUpdate:modelValue":g[2]||(g[2]=v=>r.value=v),type:"number",min:0,max:l.value,disabled:!t.canEdit,class:"w-full rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-sm text-slate-800 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"},null,8,$x),[[ko,r.value]])])):ge("",!0),C(ee,{variant:"quiet",disabled:!t.canEdit,onClick:d},{default:D(()=>[...g[8]||(g[8]=[O("Add",-1)])]),_:1},8,["disabled"])]),i.value?(x(),A("p",Ex,R(i.value),1)):ge("",!0),h("p",Cx,"Valid nodes for this forest: 0 to "+R(l.value)+".",1),h("div",Ax,[t.ops.length===0?(x(),A("p",Tx," No operations yet — add one above, or generate a random script. ")):(x(),A("ol",Ox,[(x(!0),A(ae,null,me(t.ops,(v,b)=>(x(),A("li",{key:b,class:"flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-800/50"},[h("span",Mx,R(b+1)+". "+R(c(v)),1),h("button",{type:"button",disabled:!t.canEdit,class:"rounded px-1.5 py-0.5 text-slate-400 transition-colors hover:bg-rose-100 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-rose-900/30 dark:hover:text-rose-300","aria-label":`Remove ${c(v)}`,onClick:w=>p(b)}," ✕ ",8,Rx)]))),128))]))]),h("div",Ix,[C(ee,{variant:"quiet",disabled:!t.canEdit||t.ops.length===0,onClick:m},{default:D(()=>[...g[9]||(g[9]=[O(" Clear ",-1)])]),_:1},8,["disabled"]),C(ee,{variant:"quiet",disabled:!t.canEdit,onClick:g[3]||(g[3]=v=>s("randomize"))},{default:D(()=>[...g[10]||(g[10]=[O(" Random script ",-1)])]),_:1},8,["disabled"])]),g[11]||(g[11]=h("p",{class:"mt-3 text-xs text-slate-400"}," Compose the whole script, then press Run — see the guide above for why one continuous history is the point. ",-1))]),_:1}))}}),jx=oe({__name:"MstStats",props:{stats:{},status:{},isDsuMode:{type:Boolean,default:!1}},setup(t){const e=t,n=E(()=>({idle:"Idle",running:"Running",paused:"Paused",done:"Done"})[e.status]??e.status),s=E(()=>({idle:"bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",running:"bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400",paused:"bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400",done:"bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400"})[e.status]),o=E(()=>[{label:"Finds",value:e.stats.finds.toLocaleString()},{label:"Unions",value:e.stats.unions.toLocaleString()},{label:"Compressions",value:e.stats.compressions.toLocaleString()},{label:"Max Depth",value:e.stats.maxDepth.toLocaleString()},{label:"MST Weight",value:e.isDsuMode?"—":e.stats.totalWeight.toLocaleString()},{label:"Components",value:e.stats.components.toLocaleString()}]);return(a,r)=>(x(),J(ye,{title:"Stats"},{header:D(()=>[h("span",{class:de(["rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",s.value])},R(n.value),3)]),default:D(()=>[C(Cr,{cells:o.value,columns:3},null,8,["cells"])]),_:1}))}}),Dx={xSpacing:46,ySpacing:54,xMargin:30,yMargin:28,rootGap:1};function Px(t,e={}){const{xSpacing:n,ySpacing:s,xMargin:o,yMargin:a,rootGap:r}={...Dx,...e},i=t.length,l=Array.from({length:i},()=>[]),u=[];for(let b=0;b<i;b++){const w=t[b];w===b?u.push(b):w>=0&&w<i&&l[w].push(b)}const c=new Map,d=[],p=new Set;let m=0;function y(b){const w=[{id:b,depth:0,cursor:0}];for(p.add(b);w.length>0;){const k=w[w.length-1],T=l[k.id];if(k.cursor<T.length){const j=T[k.cursor];if(k.cursor+=1,p.has(j))continue;p.add(j),w.push({id:j,depth:k.depth+1,cursor:0});continue}w.pop();const _=T.map(j=>c.get(j)).filter(j=>j!==void 0);let N,G;if(_.length===0){const j=m;m+=1,N=o+j*n,G=[j,j]}else{const j=_.map(P=>P.x);N=(Math.min(...j)+Math.max(...j))/2,G=[Math.min(..._.map(P=>P.span[0])),Math.max(..._.map(P=>P.span[1]))]}c.set(k.id,{id:k.id,x:N,y:a+k.depth*s,depth:k.depth,parent:k.id===t[k.id]?null:t[k.id],span:G})}}for(const b of u)m>0&&(m+=r),y(b);const g=[...c.values()].sort((b,w)=>b.id-w.id);for(const b of g)b.parent!==null&&c.has(b.parent)&&d.push({from:b.parent,to:b.id});const v=g.reduce((b,w)=>Math.max(b,w.depth),0);return{nodes:g,edges:d,slotCount:m,width:Math.max(o*2,o*2+Math.max(0,m-1)*n),height:a*2+v*s}}const Lx={class:"mb-3 flex flex-wrap items-center gap-x-4 gap-y-2"},Nx={class:"text-xs font-semibold uppercase tracking-wider text-slate-400"},Bx={key:0,class:"py-8 text-center text-sm text-slate-400"},Fx={class:"overflow-x-auto rounded-xl bg-slate-50 p-3 dark:bg-slate-950/40"},Vx=["viewBox","width","height"],Hx=["x1","y1","x2","y2"],Ux=["cx","cy"],zx=["cx","cy"],qx=["x","y"],Kx=["x","y"],Gx={class:"flex flex-wrap gap-1.5"},Wx={class:"w-full bg-slate-200/70 py-0.5 text-center text-[10px] font-medium text-slate-500 dark:bg-slate-700/70 dark:text-slate-400"},Yx={class:"py-1 font-mono text-sm font-semibold text-slate-800 dark:text-slate-100"},Xx={class:"mt-3 text-center text-xs text-slate-400"},Jx=oe({__name:"DsuForest",props:{parent:{},setSize:{default:()=>[]},rank:{default:()=>[]},findPath:{default:()=>[]},compressed:{default:()=>[]},active:{default:null},labels:{default:()=>[]},title:{default:"Disjoint-Set Forest"},hint:{default:"Each tree is one set. An arrow points from a node to its parent; a node pointing at itself is a root."}},setup(t){const e=t,n={cursor:"fill-rose-500",compressed:"fill-emerald-500",path:"fill-amber-400",root:"fill-indigo-500 dark:fill-indigo-400",default:"fill-slate-400 dark:fill-slate-600"},s={cursor:"border-rose-400 bg-rose-50 dark:bg-rose-900/30",compressed:"border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30",path:"border-amber-400 bg-amber-50 dark:bg-amber-900/30",root:"border-indigo-400 bg-indigo-50 dark:bg-indigo-900/30",default:"border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50"},o=[{label:"Root",class:"bg-indigo-500 dark:bg-indigo-400"},{label:"On find path",class:"bg-amber-400"},{label:"Re-hung",class:"bg-emerald-500"},{label:"Cursor",class:"bg-rose-500"}],a=E(()=>new Set(e.findPath)),r=E(()=>new Set(e.compressed)),i=E(()=>Px(e.parent)),l=E(()=>new Map(i.value.nodes.map(y=>[y.id,y])));function u(y){return y===e.active?"cursor":r.value.has(y)?"compressed":a.value.has(y)?"path":e.parent[y]===y?"root":"default"}function c(y){return e.labels[y]??String(y)}const d=E(()=>e.parent.length===0);function p(y){return e.parent[y]!==y?null:e.rank[y]??null}function m(y){return e.parent[y]!==y?null:e.setSize[y]??null}return(y,g)=>(x(),J(ye,{class:"flex flex-col"},{default:D(()=>[h("div",Lx,[h("h2",Nx,R(t.title),1),C(qs,{items:o})]),d.value?(x(),A("p",Bx,"The forest is empty.")):(x(),A(ae,{key:1},[h("div",Fx,[(x(),A("svg",{viewBox:`0 0 ${i.value.width} ${i.value.height}`,width:i.value.width,height:i.value.height,class:"mx-auto block max-h-[42vh] w-full",preserveAspectRatio:"xMidYMid meet"},[(x(!0),A(ae,null,me(i.value.edges,v=>{var b,w,k,T;return x(),A("line",{key:`${v.from}-${v.to}`,x1:(b=l.value.get(v.to))==null?void 0:b.x,y1:(w=l.value.get(v.to))==null?void 0:w.y,x2:(k=l.value.get(v.from))==null?void 0:k.x,y2:(T=l.value.get(v.from))==null?void 0:T.y,"stroke-width":"2",class:de(a.value.has(v.to)&&!r.value.has(v.to)?"stroke-amber-400":r.value.has(v.to)?"stroke-emerald-500":"stroke-slate-300 dark:stroke-slate-700")},null,10,Hx)}),128)),(x(!0),A(ae,null,me(i.value.nodes,v=>(x(),A("g",{key:v.id},[v.parent===null?(x(),A("circle",{key:0,cx:v.x,cy:v.y-15,r:"6",fill:"none","stroke-width":"1.5",class:"stroke-indigo-400/60"},null,8,Ux)):ge("",!0),h("circle",{cx:v.x,cy:v.y,r:"14",class:de(["transition-colors duration-150 ease-out",n[u(v.id)]])},null,10,zx),h("text",{x:v.x,y:v.y,"text-anchor":"middle","dominant-baseline":"central",class:"pointer-events-none select-none fill-white text-[10px] font-semibold"},R(c(v.id)),9,qx),p(v.id)!==null?(x(),A("text",{key:1,x:v.x,y:v.y+25,"text-anchor":"middle",class:"pointer-events-none select-none fill-slate-400 text-[9px] font-medium"}," rank "+R(p(v.id))+" · "+R(m(v.id)),9,Kx)):ge("",!0)]))),128))],8,Vx))]),g[0]||(g[0]=h("h3",{class:"mb-2 mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400"}," parent[] ",-1)),h("div",Gx,[(x(!0),A(ae,null,me(t.parent,(v,b)=>(x(),A("div",{key:b,class:de(["flex w-11 flex-col items-center overflow-hidden rounded-lg border transition-colors",s[u(b)]])},[h("div",Wx,R(b),1),h("div",Yx,R(v),1)],2))),128))]),h("p",Xx,R(t.hint),1)],64))]),_:1}))}}),Qx={class:"mb-3 flex flex-wrap items-center justify-between gap-2"},Zx={class:"text-xs text-slate-400"},e1={key:0,class:"py-6 text-center text-sm text-slate-400"},t1=["data-active"],n1={class:"flex items-center gap-2"},s1={class:"font-mono font-semibold text-slate-700 dark:text-slate-200"},o1={class:"font-mono text-slate-500 dark:text-slate-400"},a1=oe({__name:"EdgeList",props:{edges:{},nodes:{},consideringEdge:{},acceptedEdges:{},rejectedEdges:{}},setup(t){const e=t,n=[{label:"Pending",class:"bg-slate-300 dark:bg-slate-600"},{label:"Considering",class:"bg-amber-400"},{label:"Accepted",class:"bg-emerald-500"},{label:"Rejected",class:"bg-rose-400/60 dark:bg-rose-500/50"}],s={pending:"border-slate-200 dark:border-slate-700",considering:"border-amber-400 bg-amber-50 dark:bg-amber-900/20",accepted:"border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20",rejected:"border-rose-300 bg-rose-50/70 dark:border-rose-800 dark:bg-rose-900/10"},o={pending:"bg-slate-300 dark:bg-slate-600",considering:"bg-amber-400",accepted:"bg-emerald-500",rejected:"bg-rose-400/60 dark:bg-rose-500/50"},a=E(()=>new Set(e.acceptedEdges)),r=E(()=>new Set(e.rejectedEdges)),i=E(()=>new Map(e.nodes.map(m=>[m.id,m.label])));function l(m){return i.value.get(m)??String(m)}function u(m){return a.value.has(m.id)?"accepted":r.value.has(m.id)?"rejected":m.id===e.consideringEdge?"considering":"pending"}const c=E(()=>e.acceptedEdges.length),d=E(()=>e.rejectedEdges.length),p=F(null);return _e(()=>e.consideringEdge,async()=>{var y,g;if(e.consideringEdge===null)return;await Vs();const m=(y=p.value)==null?void 0:y.querySelector('[data-active="true"]');(g=m==null?void 0:m.scrollIntoView)==null||g.call(m,{block:"nearest"})}),(m,y)=>(x(),J(ye,{title:"Edge Queue"},{default:D(()=>[h("div",Qx,[C(qs,{items:n}),h("p",Zx,R(c.value)+" accepted · "+R(d.value)+" rejected · "+R(t.edges.length)+" total ",1)]),t.edges.length===0?(x(),A("p",e1," No edges yet — generate a graph to build the queue. ")):(x(),A("ol",{key:1,ref_key:"list",ref:p,class:"max-h-72 space-y-1 overflow-y-auto pr-1"},[(x(!0),A(ae,null,me(t.edges,g=>(x(),A("li",{key:g.id,"data-active":g.id===t.consideringEdge,class:de(["flex items-center justify-between gap-2 rounded-lg border px-2.5 py-1.5 text-xs transition-colors",s[u(g)]])},[h("span",n1,[h("i",{class:de(["h-2.5 w-2.5 flex-none rounded-full",o[u(g)]])},null,2),h("span",s1,R(l(g.from))+" – "+R(l(g.to)),1)]),h("span",o1,"w="+R(g.weight??1),1)],10,t1))),128))],512)),y[0]||(y[0]=h("p",{class:"mt-3 text-center text-xs text-slate-400"}," Lightest edges first — the exact order Kruskal considers them in. ",-1))]),_:1}))}}),r1={class:"grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]"},i1={class:"flex flex-col gap-4"},l1={class:"flex flex-col gap-4"},u1=oe({__name:"MstView",setup(t){const e=Bg();_e(e.nodeCount,()=>{e.canEdit.value&&e.generate()}),_e(e.seed,()=>{e.canEdit.value&&e.generate()}),_e(e.algoKey,()=>{e.isDone.value&&e.reset()});const n=[{label:"Idle",class:"bg-indigo-500/80 dark:bg-indigo-400/80"},{label:"Considering",class:"bg-amber-400"},{label:"Accepted",class:"bg-emerald-500"},{label:"Rejected",class:"bg-rose-400/60 dark:bg-rose-500/50"}],s=E(()=>e.isDsuMode.value?[]:e.graph.value.nodes.map(l=>l.label)),o=E(()=>e.canEdit.value&&e.algoKey.value==="prim"),a=E(()=>e.algoKey.value==="prim"?"Click a node to set Prim's starting point — the tree grows outward from there.":"Kruskal has no starting point: edges are accepted strictly by weight, regardless of position."),r=E(()=>{if(e.isDsuMode.value){const u=e.activeOp.value;return u?u.kind==="union"?`union(${u.a}, ${u.b})`:`find(${u.a})`:null}const l=e.graph.value.edges.find(u=>u.id===e.highlights.consideringEdge);return l?`considering ${l.from}–${l.to} (weight ${l.weight??1})`:null}),i=E(()=>e.isDsuMode.value?[{label:"Active node",value:e.activeNode.value===null?"—":String(e.activeNode.value)},{label:"Sets remaining",value:String(e.stats.value.components)}]:[{label:"Accepted",value:String(e.highlights.acceptedEdges.length),tone:"good"},{label:"Rejected",value:String(e.highlights.rejectedEdges.length),tone:e.highlights.rejectedEdges.length>0?"warn":"neutral"},{label:"Components left",value:String(e.highlights.components)}]);return(l,u)=>(x(),A("div",r1,[h("div",i1,[C(xn,{modelValue:f(e).algoKey.value,"onUpdate:modelValue":u[0]||(u[0]=c=>f(e).algoKey.value=c),algorithms:f(qo),title:"Algorithm",columns:3,disabled:!f(e).canEdit.value},null,8,["modelValue","algorithms","disabled"]),C(fx),C(bx,{"node-count":f(e).nodeCount.value,seed:f(e).seed.value,speed:f(e).speed.value,status:f(e).status.value,"can-edit":f(e).canEdit.value,"is-running":f(e).isRunning.value,"is-paused":f(e).isPaused.value,"onUpdate:nodeCount":u[1]||(u[1]=c=>f(e).nodeCount.value=c),"onUpdate:speed":u[2]||(u[2]=c=>f(e).speed.value=c),"onUpdate:seed":u[3]||(u[3]=c=>f(e).seed.value=c),onRandomize:u[4]||(u[4]=c=>f(e).randomizeSeed()),onGenerate:u[5]||(u[5]=c=>f(e).generate()),onRun:u[6]||(u[6]=c=>f(e).run()),onPause:u[7]||(u[7]=c=>f(e).pause()),onReset:u[8]||(u[8]=c=>f(e).reset())},null,8,["node-count","seed","speed","status","can-edit","is-running","is-paused"]),f(e).isDsuMode.value?(x(),J(_x,{key:0,ops:f(e).opScript.value,"node-count":f(e).nodeCount.value,"can-edit":f(e).canEdit.value,"onUpdate:ops":u[9]||(u[9]=c=>f(e).setOpScript(c)),onRandomize:u[10]||(u[10]=c=>f(e).randomizeOpScript())},null,8,["ops","node-count","can-edit"])):ge("",!0),C(gn,{cursor:f(e).cursor.value,"buffered-count":f(e).bufferedCount.value,"fully-buffered":f(e).fullyBuffered.value,"can-step-back":f(e).canStepBack.value,"can-step-forward":f(e).canStepForward.value,onSeek:u[11]||(u[11]=c=>f(e).seek(c)),onStepBack:u[12]||(u[12]=c=>f(e).stepBack()),onStepForward:u[13]||(u[13]=c=>f(e).stepForward()),onSkipToEnd:u[14]||(u[14]=c=>f(e).skipToEnd())},null,8,["cursor","buffered-count","fully-buffered","can-step-back","can-step-forward"])]),h("div",l1,[C(jx,{stats:f(e).stats.value,status:f(e).status.value,"is-dsu-mode":f(e).isDsuMode.value},null,8,["stats","status","is-dsu-mode"]),f(e).isDsuMode.value?ge("",!0):(x(),J(cc,{key:0,nodes:f(e).graph.value.nodes,edges:f(e).graph.value.edges,"node-tone":f(e).nodeTone.value,"edge-tone":f(e).edgeTone.value,"node-badge":f(e).nodeBadge.value,"show-weights":!0,legend:n,title:"Graph",hint:a.value,"start-id":f(e).startId.value,"can-edit":o.value,onSetStart:u[15]||(u[15]=c=>f(e).setStart(c))},null,8,["nodes","edges","node-tone","edge-tone","node-badge","hint","start-id","can-edit"])),C(Jx,{parent:f(e).forest.value.parent,"set-size":f(e).forest.value.setSize,rank:f(e).forest.value.rank,"find-path":f(e).forest.value.findPath,compressed:f(e).forest.value.compressed,active:f(e).activeNode.value,labels:s.value,title:f(e).isDsuMode.value?"Disjoint-Set Forest":"Underlying Disjoint-Set Forest"},null,8,["parent","set-size","rank","find-path","compressed","active","labels","title"]),f(e).isDsuMode.value?ge("",!0):(x(),J(a1,{key:1,edges:f(e).sortedEdges.value,nodes:f(e).graph.value.nodes,"considering-edge":f(e).highlights.consideringEdge,"accepted-edges":f(e).highlights.acceptedEdges,"rejected-edges":f(e).highlights.rejectedEdges},null,8,["edges","nodes","considering-edge","accepted-edges","rejected-edges"])),C(Er,{headline:f(e).explain.value,formula:r.value,rows:i.value},null,8,["headline","formula","rows"]),C(Yo,{lines:f(e).pseudocodeLines.value,source:f(e).sourceCode.value.text,"source-file":f(e).sourceCode.value.file,"active-line":f(e).activeLine.value,"active-source-lines":f(e).activeSourceLines.value,title:"Code"},null,8,["lines","source","source-file","active-line","active-source-lines"])])]))}}),pc="abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",c1=3;function*fc(){const t=[...pc],e=t.length;for(let n=1;n<=c1;n++){const s=e**n;for(let o=0;o<s;o++){let a="",r=o;for(let i=0;i<n;i++)a=t[r%e]+a,r=Math.floor(r/e);yield a}}}function d1(t,e,n){const s=Ko(n.capacity),o=jn[n.hashFnKey].hash,a=n.exclude??new Set,r=(t%s+s)%s,i=[];for(const l of fc())if(!a.has(l)&&yr(o(l),s)===r&&(i.push(l),i.length>=e))break;return i}function p1(t,e,n){const s=Ko(e.capacity),o=jn[e.hashFnKey].hash,a=e.exclude??new Set;if(n!==void 0){const l=d1(n,t,e),u=(n%s+s)%s;if(l.length===t)return{bucket:u,keys:l}}const r=new Map;for(const l of fc()){if(a.has(l))continue;const u=yr(o(l),s),c=r.get(u)??[];if(c.push(l),r.set(u,c),c.length>=t)return{bucket:u,keys:c}}let i={bucket:0,keys:[]};for(const[l,u]of r)u.length>i.keys.length&&(i={bucket:l,keys:u});return i}function f1(t,e,n){const s=new Set(n??[]),o=[];for(let a=0;a<e*50&&o.length<e;a++){const r=t.int(2,3);let i="";for(let l=0;l<r;l++)i+=pc[t.int(0,25)];s.has(i)||(s.add(i),o.push(i))}return o}const h1={chaining:["insert(key):","  h = hash(key);  home = h mod capacity","  walk bucket[home]’s chain, link by link","    key already in the chain -> overwrite its value","    end of the chain reached -> append the key","    a different key here -> collision; the chain just gets longer","  if size / capacity > threshold: grow, then rehash every key","search(key): walk the same chain from the front","  key found -> report the bucket holding it","  end of chain -> the key is not in the table","delete(key): walk the chain to find the key","  unlink it; the chain simply gets shorter","done — every operation in the script has run"],linear:["insert(key):","  h = hash(key);  home = h mod capacity","  probe (home + k) mod capacity for k = 0, 1, 2, ...","    key already in this slot -> overwrite its value","    slot empty (or a reusable tombstone) -> put the key here","    a different key here -> collision; probe the next slot","  if slots used / capacity > threshold: grow, then rehash every key","search(key): walk the same probe sequence from home","  key found -> report the slot holding it","  first EMPTY slot -> the key is not in the table","delete(key): walk the sequence to find the key","  leave a TOMBSTONE behind, never an empty slot","done — every operation in the script has run"],quadratic:["insert(key):","  h = hash(key);  home = h mod capacity","  probe (home + k(k+1)/2) mod capacity for k = 0, 1, 2, ...","    key already in this slot -> overwrite its value","    slot empty (or a reusable tombstone) -> put the key here","    a different key here -> collision; widen the jump and probe again","  if slots used / capacity > threshold: grow, then rehash every key","search(key): walk the same probe sequence from home","  key found -> report the slot holding it","  first EMPTY slot -> the key is not in the table","delete(key): walk the sequence to find the key","  leave a TOMBSTONE behind, never an empty slot","done — every operation in the script has run"],double:["insert(key):","  h = hash(key);  home = h mod capacity;  step = h2(h) | 1","  probe (home + k * step) mod capacity for k = 0, 1, 2, ...","    key already in this slot -> overwrite its value","    slot empty (or a reusable tombstone) -> put the key here","    a different key here -> collision; jump another step","  if slots used / capacity > threshold: grow, then rehash every key","search(key): walk the same probe sequence from home","  key found -> report the slot holding it","  first EMPTY slot -> the key is not in the table","delete(key): walk the sequence to find the key","  leave a TOMBSTONE behind, never an empty slot","done — every operation in the script has run"]},oo=`// The generators that turn a script of hash-table operations into watchable
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
`,hc={chaining:{file:"hashtable/ops.ts",text:oo},linear:{file:"hashtable/ops.ts",text:oo},quadratic:{file:"hashtable/ops.ts",text:oo},double:{file:"hashtable/ops.ts",text:oo}},m1=Wo(hc),sl=Object.freeze(["compare"]),g1=Object.freeze(["hit"]),ol=Object.freeze(["miss"]),b1=Object.freeze(["swap"]);function v1(t){if(t.probeIndex===null||t.key===null)return!1;const e=t.buckets[t.probeIndex];if(!e||e.state!=="occupied")return!1;const n=e.entries[t.probeSeq.length-1]??e.entries[0];return n!==void 0&&n.key!==t.key}const y1=t=>{switch(t.phase){case"probing":return v1(t)?ol:sl;case"hashing":return sl;case"inserted":case"updated":case"found":case"deleted":return g1;case"not-found":return ol;case"resizing":return b1;default:return qt}},w1=new Set(["inserted","updated","found","not-found","deleted"]),x1=8,k1=3;function al(t){return Array.from({length:t},()=>({entries:[],state:"empty"}))}function S1(t={}){const{audio:e=!0}=t,n=zs(),s=F(Uu),o=F(Bu),a=F(8),r=F(.75),i=F(60),l=F(Ue()),u=F([]),c=E(()=>Ko(a.value)),d=E(()=>Fu(s.value,r.value)),p=E(()=>Go[s.value]);Gt(d0({strategyKey:s,hashFnKey:o,capacity:a,threshold:r,speed:i,seed:l,script:u}));const m=F(al(c.value)),y=Pe({capacity:c.value,size:0,loadFactor:0,op:null,key:null,hash:null,homeIndex:null,probeIndex:null,probeSeq:[],phase:"idle",explain:null}),g=Pe({probes:0,collisions:0,resizes:0,opsDone:0});let v=[];function*b(W){let X=0;for(const we of W)w1.has(we.phase)&&(X+=1),v.push(X),yield we}function w(){m.value=al(c.value),y.capacity=c.value,y.size=0,y.loadFactor=0,y.op=null,y.key=null,y.hash=null,y.homeIndex=null,y.probeIndex=null,y.probeSeq=[],y.phase="idle",y.explain=null,g.probes=0,g.collisions=0,g.resizes=0,g.opsDone=0}const k=fn({speed:i,createGenerator:()=>{w(),v=[];const W=u.value.map(X=>({...X}));return b(p.value.generator(W,{hashFnKey:o.value,capacity:a.value,threshold:r.value}))},applyStep:(W,X)=>{m.value=W.buckets,y.capacity=W.capacity,y.size=W.size,y.loadFactor=W.loadFactor,y.op=W.op,y.key=W.key,y.hash=W.hash,y.homeIndex=W.homeIndex,y.probeIndex=W.probeIndex,y.probeSeq=W.probeSeq,y.phase=W.phase,y.explain=W.explain,g.probes=W.probes,g.collisions=W.collisions,g.resizes=W.resizes,g.opsDone=v[X]??0},clearStep:w,onAdvance:e?W=>n.play(y1(W)):void 0}),T=E(()=>g.opsDone===0?0:g.probes/g.opsDone);function _(){return new Set(u.value.map(W=>W.key))}function N(W){u.value=W.map(X=>({...X})),k.reset()}function G(W,X){X!==""&&(u.value=[...u.value,{kind:W,key:X}],k.reset())}function j(W){u.value=u.value.filter((X,we)=>we!==W),k.reset()}function P(){u.value=[],k.reset()}function I(W=x1){const X=f1(rt(l.value),W,_());u.value=[...u.value,...X.map(we=>({kind:"insert",key:we}))],k.reset()}function he(W=k1,X){const we=p1(W,{hashFnKey:o.value,capacity:a.value,exclude:_()},X);return u.value=[...u.value,...we.keys.map(ft=>({kind:"insert",key:ft}))],k.reset(),we.bucket}function ke(){l.value=Ue()}_e([s,o,a,r],()=>k.reset());const q=E(()=>{var W;return((W=k.current.value)==null?void 0:W.line)??null}),L=E(()=>h1[s.value]),z=E(()=>hc[s.value]),ie=E(()=>{var X;const W=(X=k.current.value)==null?void 0:X.line;return W===void 0?[]:m1(s.value).get(W)??[]});return{strategyKey:s,hashFnKey:o,capacity:a,threshold:r,speed:i,seed:l,script:u,startCapacity:c,activeThreshold:d,currentAlgo:p,buckets:m,view:y,stats:g,avgProbes:T,activeLine:q,pseudocodeLines:L,sourceCode:z,activeSourceLines:ie,status:k.status,isRunning:k.isRunning,isPaused:k.isPaused,isDone:k.isDone,canEdit:k.canEdit,delayMs:k.delayMs,elapsedMs:k.elapsedMs,stepCount:k.stepCount,cursor:k.cursor,bufferedCount:k.bufferedCount,fullyBuffered:k.fullyBuffered,current:k.current,canStepBack:k.canStepBack,canStepForward:k.canStepForward,setScript:N,addOp:G,removeOp:j,clearScript:P,bulkLoad:I,forceCollision:he,randomizeSeed:ke,run:k.run,pause:k.pause,reset:k.reset,stepForward:k.stepForward,stepBack:k.stepBack,seek:k.seek,skipToEnd:k.skipToEnd}}const $1=oe({__name:"HashGuide",setup(t){return(e,n)=>(x(),J(Ks,{title:"How to read this",summary:"A hash sends every key to one bucket. The interesting part is what happens when two land on the same one.","start-open":""},{default:D(()=>[...n[0]||(n[0]=[h("p",{class:"mb-3 text-slate-600 dark:text-slate-300"},[O(" A hash table turns a key into a number, folds that number into a slot with "),h("code",{class:"font-mono text-xs"},"h(key) mod capacity"),O(", and stores the key there. That is the entire idea, and it is O(1) — right up until two keys pick the same slot. Everything on this page is about that moment. The inspector spells out the arithmetic for every step, so each probe can be checked by hand. ")],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400"}," Chaining vs open addressing ",-1),h("ul",{class:"mb-4 space-y-2 text-slate-600 dark:text-slate-300"},[h("li",null,[h("b",null,"Separate chaining"),O(" hangs a list off each bucket. Colliding keys are appended, so a lookup hashes once and then walks a chain that averages α links long. It degrades gently, never fills up, and deletion is just unlinking — but every entry costs a pointer, and the chain is scattered through memory. ")]),h("li",null,[h("b",null,"Open addressing"),O(" keeps everything in the array: on a collision, the key walks a "),h("em",null,"probe sequence"),O(" until it finds a free slot. No pointers, excellent cache behaviour, and it is what most modern standard libraries do — at the price of everything below. ")])],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400"}," Clustering — the reason there are three probe sequences ",-1),h("p",{class:"mb-3 text-slate-600 dark:text-slate-300"},[h("b",null,"Linear probing"),O(" tries the next slot along, so collisions form contiguous runs, and every run is a bigger target for the next key — a cluster grows itself. That is "),h("em",null,"primary clustering"),O(". "),h("b",null,"Quadratic probing"),O(" jumps k(k+1)/2 slots on the k-th probe, which scatters the runs; but two keys with the same home slot still follow the identical jump sequence, which is "),h("em",null,"secondary clustering"),O(". "),h("b",null,"Double hashing"),O(" derives the stride from a second hash of the key, so even keys that collide at home diverge immediately. Load the weak hash function, force a collision, and switch between the three: the badges show the probe order, and the clusters are visible. ")],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400"}," Why α matters ",-1),h("p",{class:"mb-3 text-slate-600 dark:text-slate-300"},[O(" The load factor α = keys / slots is what the cost actually depends on — not the number of keys. Chaining costs about 1 + α. Open addressing costs about 1/(1 − α), which is 2 probes at half full, 10 at 90%, and unbounded as the table fills. That is why the table grows: once α crosses the threshold, the capacity doubles and "),h("em",null,"every key is rehashed"),O(", because a key's slot is a function of the capacity it was inserted under. Watch the rehash step through key by key — most of them move. Each individual resize is O(n), but it only happens after n more inserts, so the amortized cost per insert stays constant. ")],-1),h("h3",{class:"mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400"}," Why deletion needs a tombstone ",-1),h("p",{class:"mb-2 text-slate-600 dark:text-slate-300"},[O(" Under open addressing a search stops at the first "),h("em",null,"empty"),O(" slot — that is what makes a miss cheap. So emptying a slot on delete would cut every probe sequence that ran through it, and any key stored further along its own sequence would become invisible while still sitting in the table. Instead the slot is marked "),h("span",{class:"font-mono text-rose-500 dark:text-rose-400"},"✕ deleted"),O(": searches walk straight past it, and a later insert may reuse it. Delete a key from the middle of a cluster and search for one after it — the tombstone is what makes the lookup still succeed. ")],-1),h("p",{class:"text-slate-500 dark:text-slate-400"}," Tombstones are not free: they hold no key but still cost a probe, so they count toward the fill that triggers a resize. A rehash is also how they get cleaned up. ",-1)])]),_:1}))}}),E1={class:"space-y-4"},C1={key:0,class:"mt-1 text-[11px] text-slate-400"},A1={class:"font-mono"},T1={key:0,class:"mt-1 text-[11px] text-slate-400"},O1={class:"font-mono"},M1={class:"mt-4"},R1={class:"grid grid-cols-2 gap-2"},I1={class:"mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400"},_1={class:"mt-5 grid grid-cols-2 gap-2"},j1=oe({__name:"HashControls",props:{capacity:{},effectiveCapacity:{},threshold:{},activeThreshold:{},hashFnKey:{},speed:{},status:{},canEdit:{type:Boolean},isRunning:{type:Boolean},isPaused:{type:Boolean}},emits:["update:capacity","update:threshold","update:hashFnKey","update:speed","run","pause","reset","step"],setup(t,{emit:e}){const n=t,s=e,o=Object.keys(jn),a=E(()=>Math.round(n.threshold*100)),r=E(()=>n.capacity!==n.effectiveCapacity),i=E(()=>Math.abs(n.threshold-n.activeThreshold)>.001);return(l,u)=>(x(),J(ye,{title:"Controls"},{default:D(()=>[h("div",E1,[h("div",null,[C(Ve,{label:"Capacity","model-value":t.capacity,min:4,max:64,step:4,suffix:" slots",disabled:!t.canEdit,"onUpdate:modelValue":u[0]||(u[0]=c=>s("update:capacity",c))},null,8,["model-value","disabled"]),r.value?(x(),A("p",C1,[u[7]||(u[7]=O(" Rounded up to ",-1)),h("span",A1,R(t.effectiveCapacity),1),u[8]||(u[8]=O(" — every capacity here is a power of two. ",-1))])):ge("",!0)]),h("div",null,[C(Ve,{label:"Resize threshold","model-value":a.value,min:25,max:150,step:5,suffix:"%",disabled:!t.canEdit,"onUpdate:modelValue":u[1]||(u[1]=c=>s("update:threshold",c/100))},null,8,["model-value","disabled"]),i.value?(x(),A("p",T1,[u[9]||(u[9]=O(" Capped at ",-1)),h("span",O1,R(Math.round(t.activeThreshold*100))+"%",1),u[10]||(u[10]=O(" — open addressing stores one key per slot, so it can never reach α = 1. ",-1))])):ge("",!0)]),C(Ve,{label:"Speed","model-value":t.speed,min:1,max:100,suffix:"%","onUpdate:modelValue":u[2]||(u[2]=c=>s("update:speed",c))},null,8,["model-value"])]),h("div",M1,[u[11]||(u[11]=h("div",{class:"mb-1.5 text-sm font-medium text-slate-600 dark:text-slate-300"},"Hash function",-1)),h("div",R1,[(x(!0),A(ae,null,me(f(o),c=>(x(),J(ee,{key:c,variant:"selector",active:c===t.hashFnKey,disabled:!t.canEdit,onClick:d=>s("update:hashFnKey",c)},{default:D(()=>[O(R(f(jn)[c].name),1)]),_:2},1032,["active","disabled","onClick"]))),128))]),h("p",I1,R(f(jn)[t.hashFnKey].description),1)]),h("div",_1,[t.isRunning?(x(),J(ee,{key:1,variant:"warning",class:"col-span-2",onClick:u[4]||(u[4]=c=>s("pause"))},{default:D(()=>[...u[13]||(u[13]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M6 4h4v16H6zM14 4h4v16h-4z"})],-1),O(" Pause ",-1)])]),_:1})):(x(),J(ee,{key:0,variant:"primary",class:"col-span-2",onClick:u[3]||(u[3]=c=>s("run"))},{default:D(()=>[u[12]||(u[12]=h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-4 w-4"},[h("path",{d:"M8 5v14l11-7z"})],-1)),O(" "+R(t.isPaused?"Resume":"Run"),1)]),_:1})),C(ee,{variant:"neutral",onClick:u[5]||(u[5]=c=>s("reset"))},{default:D(()=>[...u[14]||(u[14]=[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-4 w-4"},[h("path",{d:"M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.36 2.64L3 8"}),h("path",{d:"M3 3v5h5"})],-1),O(" Reset ",-1)])]),_:1}),C(ee,{variant:"neutral",disabled:t.isRunning,onClick:u[6]||(u[6]=c=>s("step"))},{default:D(()=>[...u[15]||(u[15]=[O(" Step ▶ ",-1)])]),_:1},8,["disabled"])]),u[16]||(u[16]=h("p",{class:"mt-3 text-center text-xs text-slate-400"}," Strategy, capacity, threshold & hash function lock while a script is running. ",-1))]),_:1}))}}),D1={class:"grid grid-cols-3 gap-2"},P1={class:"mt-3 flex items-end gap-2"},L1={class:"min-w-0 flex-1"},N1={class:"mt-3 grid grid-cols-3 gap-2"},B1={key:0,class:"mt-2 text-xs text-amber-600 dark:text-amber-400"},F1={class:"mt-3 block"},V1={class:"mb-1.5 flex items-center justify-between text-sm"},H1=["disabled"],U1=["value","disabled"],z1={key:1,class:"mt-4 text-sm text-slate-400 dark:text-slate-500"},q1={key:2,class:"mt-4 max-h-56 space-y-1 overflow-y-auto pr-1"},K1={class:"w-6 text-right font-mono tabular-nums text-slate-400"},G1={class:"min-w-0 flex-1 truncate font-mono text-slate-600 dark:text-slate-300"},W1=["disabled","aria-label","onClick"],Y1=oe({__name:"HashOpBuilder",props:{script:{},canEdit:{type:Boolean},seed:{},notice:{}},emits:["add","remove","clear","bulk-load","force-collision","update:seed","randomize-seed"],setup(t,{emit:e}){const n=t,s=e,o=[{kind:"insert",label:"Insert"},{kind:"search",label:"Search"},{kind:"delete",label:"Delete"}],a={insert:"bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",search:"bg-indigo-500/15 text-indigo-600 dark:text-indigo-400",delete:"bg-rose-500/15 text-rose-600 dark:text-rose-400"},r=F("insert"),i=F(""),l=/^[A-Za-z0-9]{1,12}$/,u=E(()=>i.value===""||l.test(i.value)?null:"Letters and digits only, up to 12 characters."),c=E(()=>n.canEdit&&i.value!==""&&u.value===null);function d(){c.value&&(s("add",r.value,i.value),i.value="")}const p=m=>s("update:seed",Number(m.target.value));return(m,y)=>(x(),J(ye,{title:"Operation script"},{default:D(()=>[h("div",D1,[(x(),A(ae,null,me(o,g=>C(ee,{key:g.kind,variant:"selector",active:r.value===g.kind,disabled:!t.canEdit,onClick:v=>r.value=g.kind},{default:D(()=>[O(R(g.label),1)]),_:2},1032,["active","disabled","onClick"])),64))]),h("div",P1,[h("div",L1,[C(vt,{modelValue:i.value,"onUpdate:modelValue":y[0]||(y[0]=g=>i.value=g),label:"Key",placeholder:"cat",monospace:"",error:u.value,disabled:!t.canEdit,onKeydown:y[1]||(y[1]=At(g=>d(),["enter"]))},null,8,["modelValue","error","disabled"])]),C(ee,{variant:"primary",class:"mb-[1px]",disabled:!c.value,onClick:y[2]||(y[2]=g=>d())},{default:D(()=>[...y[7]||(y[7]=[O(" Add ",-1)])]),_:1},8,["disabled"])]),h("div",N1,[C(ee,{variant:"quiet",disabled:!t.canEdit,onClick:y[3]||(y[3]=g=>s("bulk-load"))},{default:D(()=>[...y[8]||(y[8]=[O(" Bulk load ",-1)])]),_:1},8,["disabled"]),C(ee,{variant:"quiet",disabled:!t.canEdit,onClick:y[4]||(y[4]=g=>s("force-collision"))},{default:D(()=>[...y[9]||(y[9]=[O(" Force collision ",-1)])]),_:1},8,["disabled"]),C(ee,{variant:"quiet",disabled:!t.canEdit||t.script.length===0,onClick:y[5]||(y[5]=g=>s("clear"))},{default:D(()=>[...y[10]||(y[10]=[O(" Clear ",-1)])]),_:1},8,["disabled"])]),t.notice?(x(),A("p",B1,R(t.notice),1)):ge("",!0),h("label",F1,[h("div",V1,[y[11]||(y[11]=h("span",{class:"font-medium text-slate-600 dark:text-slate-300"},"Seed",-1)),h("button",{type:"button",class:"text-xs font-semibold text-indigo-500 hover:underline disabled:opacity-50 dark:text-indigo-400",disabled:!t.canEdit,onClick:y[6]||(y[6]=g=>s("randomize-seed"))}," Randomize ",8,H1)]),h("input",{type:"number",value:t.seed,disabled:!t.canEdit,class:"w-full rounded-xl border border-slate-200 bg-white px-3 py-2 font-mono text-sm text-slate-800 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100",onInput:p},null,40,U1)]),t.script.length===0?(x(),A("p",z1," No operations yet — add one, or bulk load a handful of keys. ")):(x(),A("ol",q1,[(x(!0),A(ae,null,me(t.script,(g,v)=>(x(),A("li",{key:`${v}-${g.kind}-${g.key}`,class:"flex items-center gap-2 rounded-lg bg-slate-50 px-2 py-1 text-xs dark:bg-slate-800/50"},[h("span",K1,R(v+1),1),h("span",{class:de(["rounded px-1.5 py-0.5 font-semibold uppercase",a[g.kind]])},R(g.kind),3),h("span",G1,R(g.key),1),h("button",{type:"button",class:"shrink-0 rounded px-1.5 text-slate-400 hover:text-rose-500 disabled:opacity-40",disabled:!t.canEdit,"aria-label":`Remove operation ${v+1}`,onClick:b=>s("remove",v)}," ✕ ",8,W1)]))),128))]))]),_:1}))}}),X1={class:"mb-1.5 flex items-baseline justify-between text-sm"},J1={class:"font-medium text-slate-600 dark:text-slate-300"},Q1={class:"ml-1 font-mono text-xs text-slate-400"},Z1=["aria-valuenow","aria-valuemax","aria-label"],ek={class:"mt-1 text-[11px] text-slate-400"},tk={class:"font-mono"},nk=oe({__name:"LoadFactorMeter",props:{loadFactor:{},threshold:{},size:{},capacity:{}},setup(t){const e=t,n=E(()=>Math.max(1,e.threshold*1.2));function s(a){return`${Math.min(100,Math.max(0,a/n.value*100))}%`}const o=E(()=>e.loadFactor>e.threshold);return(a,r)=>(x(),A("div",null,[h("div",X1,[h("span",J1,[r[0]||(r[0]=O(" Load factor α ",-1)),h("span",Q1,R(t.size)+" / "+R(t.capacity),1)]),h("span",{class:de(["font-mono font-semibold",o.value?"text-amber-500":"text-indigo-500 dark:text-indigo-400"])},R(t.loadFactor.toFixed(2)),3)]),h("div",{class:"relative h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700",role:"meter","aria-valuenow":Number(t.loadFactor.toFixed(2)),"aria-valuemin":0,"aria-valuemax":Number(n.value.toFixed(2)),"aria-label":`Load factor, resize threshold ${t.threshold.toFixed(2)}`},[h("div",{class:de(["h-full rounded-full transition-all",o.value?"bg-amber-400":"bg-indigo-500"]),style:on({width:s(t.loadFactor)})},null,6),h("div",{class:"absolute inset-y-0 w-0.5 bg-rose-500",style:on({left:s(t.threshold)}),"aria-hidden":"true"},null,4)],8,Z1),h("p",ek,[r[1]||(r[1]=O(" Grows past ",-1)),h("span",tk,R(t.threshold.toFixed(2)),1),r[2]||(r[2]=O("; open addressing also counts tombstones toward the fill. ",-1))])]))}}),sk={class:"mt-4"},ok=oe({__name:"HashStats",props:{size:{},capacity:{},loadFactor:{},threshold:{},probes:{},collisions:{},resizes:{},avgProbes:{}},setup(t){const e=t,n=E(()=>[{label:"Keys",value:`${e.size} / ${e.capacity}`},{label:"Load α",value:e.loadFactor.toFixed(2)},{label:"Probes",value:e.probes.toLocaleString()},{label:"Collisions",value:e.collisions.toLocaleString()},{label:"Probes / op",value:e.avgProbes===0?"—":e.avgProbes.toFixed(2)},{label:"Resizes",value:String(e.resizes)}]);return(s,o)=>(x(),J(ye,{title:"Statistics"},{default:D(()=>[C(Cr,{cells:n.value,columns:3},null,8,["cells"]),h("div",sk,[C(nk,{"load-factor":t.loadFactor,threshold:t.threshold,size:t.size,capacity:t.capacity},null,8,["load-factor","threshold","size","capacity"])])]),_:1}))}}),ak={class:"max-h-[32rem] flex-1 overflow-y-auto pr-1"},rk={class:"space-y-1"},ik=["data-bucket","data-state","data-home"],lk=["data-probe-order","title"],uk={key:1},ck={class:"flex min-w-0 flex-wrap items-center gap-1"},dk=["data-key"],pk={key:0,"data-role":"tombstone",class:"inline-flex items-center gap-1 rounded-full border border-dashed border-rose-400/70 px-2 py-0.5 font-mono text-xs text-rose-500 dark:text-rose-400"},fk={key:1,"data-role":"empty",class:"font-mono text-xs text-slate-300 dark:text-slate-600"},hk=oe({__name:"BucketArray",props:{buckets:{},homeIndex:{default:null},probeIndex:{default:null},probeSeq:{default:()=>[]},phase:{default:"idle"},activeKey:{default:null},chaining:{type:Boolean,default:!1}},setup(t){const e=t,n=[{label:"home slot",class:"bg-indigo-500"},{label:"probing now",class:"bg-amber-400"},{label:"probed",class:"bg-amber-400/30"},{label:"tombstone",class:"bg-rose-400/60"},{label:"empty",class:"bg-slate-200 dark:bg-slate-700"}],s=E(()=>new Set(e.probeSeq));function o(u){return s.value.has(u)?e.chaining?e.probeSeq.length:e.probeSeq.indexOf(u)+1:null}const a=E(()=>e.chaining&&e.probeSeq.length>0?e.probeSeq.length-1:-1);function r(u,c){return!e.chaining||e.phase==="idle"?!1:u===e.homeIndex&&c===a.value}function i(u){return u!==e.activeKey?!1:e.phase==="found"||e.phase==="inserted"||e.phase==="updated"}function l(u){return u===e.probeIndex?"bg-amber-400/20 ring-1 ring-amber-400":s.value.has(u)?"bg-amber-400/[0.07]":""}return(u,c)=>(x(),J(ye,{title:"Buckets",class:"flex h-full flex-col"},{header:D(()=>[C(qs,{items:n})]),default:D(()=>[h("div",ak,[h("ol",rk,[(x(!0),A(ae,null,me(t.buckets,(d,p)=>(x(),A("li",{key:p,"data-bucket":p,"data-state":d.state,"data-home":p===t.homeIndex?"true":void 0,class:de(["grid grid-cols-[2.25rem_1.75rem_minmax(0,1fr)] items-center gap-2 rounded-lg px-1 py-1 transition-colors",l(p)])},[h("span",{class:de(["rounded-md py-1 text-center font-mono text-xs tabular-nums",p===t.homeIndex?"bg-indigo-500 font-bold text-white":"text-slate-400 dark:text-slate-500"])},R(p),3),o(p)!==null?(x(),A("span",{key:0,"data-probe-order":o(p),class:"rounded-md bg-amber-400/80 py-0.5 text-center font-mono text-[10px] font-bold text-amber-950",title:t.chaining?"links walked":"probe number"},R(t.chaining?"↓":"")+R(o(p)),9,lk)):(x(),A("span",uk)),h("div",ck,[(x(!0),A(ae,null,me(d.entries,(m,y)=>(x(),A("span",{key:m.key,"data-role":"entry","data-key":m.key,class:de(["inline-flex max-w-full items-center gap-1 truncate rounded-full border px-2 py-0.5 font-mono text-xs",i(m.key)?"border-emerald-400 bg-emerald-400/20 font-bold text-emerald-700 dark:text-emerald-300":r(p,y)?"border-amber-400 bg-amber-400/30 font-bold text-amber-800 dark:text-amber-200":"border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"])},R(m.key),11,dk))),128)),d.state==="tombstone"?(x(),A("span",pk,"✕ deleted")):d.entries.length===0?(x(),A("span",fk,"—")):ge("",!0)])],10,ik))),128))])])]),_:1}))}}),mk={class:"grid gap-4 lg:grid-cols-[minmax(0,360px)_1fr]"},gk={class:"flex flex-col gap-4"},bk={class:"flex flex-col gap-4"},vk=oe({__name:"HashTableView",setup(t){const e=S1();_e(e.strategyKey,()=>{e.isDone.value&&e.reset()});const n=F(null);function s(){const d=e.forceCollision();n.value=`Collision forced — 3 keys were queued to land in bucket ${d}.`}function o(){e.clearScript(),n.value=null}const a=E(()=>e.strategyKey.value==="chaining"),r={idle:"Press Run or Step to begin.",hashing:"Hashing the key to find its home slot.",probing:"Collision — walking the probe sequence.",inserted:"Inserted.",updated:"Key already present — value overwritten.",found:"Found.","not-found":"Not found.",deleted:"Deleted.",resizing:"Load factor exceeded the threshold — growing the table.",rehashed:"Rehashing an existing key into the grown table."},i={idle:"neutral",hashing:"neutral",probing:"warn",inserted:"good",updated:"good",found:"good","not-found":"bad",deleted:"good",resizing:"warn",rehashed:"neutral"},l=E(()=>e.view.op!==null),u=E(()=>l.value?r[e.view.phase]:null),c=E(()=>{if(!l.value)return[];const d=e.view,p=[{label:"Operation",value:d.op??"—"},{label:"Key",value:d.key??"—"}];return d.hash!==null&&p.push({label:"Hash",value:String(d.hash)}),d.homeIndex!==null&&p.push({label:"Home index",value:String(d.homeIndex)}),d.probeIndex!==null&&p.push({label:"Probe index",value:String(d.probeIndex)}),p.push({label:"Probes this op",value:String(d.probeSeq.length)}),p.push({label:"Phase",value:d.phase,tone:i[d.phase]}),p});return(d,p)=>(x(),A("div",mk,[h("div",gk,[C(xn,{modelValue:f(e).strategyKey.value,"onUpdate:modelValue":p[0]||(p[0]=m=>f(e).strategyKey.value=m),algorithms:f(Go),columns:2,disabled:!f(e).canEdit.value},null,8,["modelValue","algorithms","disabled"]),C($1),C(j1,{capacity:f(e).capacity.value,"effective-capacity":f(e).startCapacity.value,threshold:f(e).threshold.value,"active-threshold":f(e).activeThreshold.value,"hash-fn-key":f(e).hashFnKey.value,speed:f(e).speed.value,status:f(e).status.value,"can-edit":f(e).canEdit.value,"is-running":f(e).isRunning.value,"is-paused":f(e).isPaused.value,"onUpdate:capacity":p[1]||(p[1]=m=>f(e).capacity.value=m),"onUpdate:threshold":p[2]||(p[2]=m=>f(e).threshold.value=m),"onUpdate:hashFnKey":p[3]||(p[3]=m=>f(e).hashFnKey.value=m),"onUpdate:speed":p[4]||(p[4]=m=>f(e).speed.value=m),onRun:p[5]||(p[5]=m=>f(e).run()),onPause:p[6]||(p[6]=m=>f(e).pause()),onReset:p[7]||(p[7]=m=>f(e).reset()),onStep:p[8]||(p[8]=m=>f(e).stepForward())},null,8,["capacity","effective-capacity","threshold","active-threshold","hash-fn-key","speed","status","can-edit","is-running","is-paused"]),C(Y1,{script:f(e).script.value,"can-edit":f(e).canEdit.value,seed:f(e).seed.value,notice:n.value,onAdd:f(e).addOp,onRemove:f(e).removeOp,onClear:p[9]||(p[9]=m=>o()),onBulkLoad:p[10]||(p[10]=m=>f(e).bulkLoad()),onForceCollision:p[11]||(p[11]=m=>s()),"onUpdate:seed":p[12]||(p[12]=m=>f(e).seed.value=m),onRandomizeSeed:p[13]||(p[13]=m=>f(e).randomizeSeed())},null,8,["script","can-edit","seed","notice","onAdd","onRemove"]),C(gn,{cursor:f(e).cursor.value,"buffered-count":f(e).bufferedCount.value,"fully-buffered":f(e).fullyBuffered.value,"can-step-back":f(e).canStepBack.value,"can-step-forward":f(e).canStepForward.value,onSeek:p[14]||(p[14]=m=>f(e).seek(m)),onStepBack:p[15]||(p[15]=m=>f(e).stepBack()),onStepForward:p[16]||(p[16]=m=>f(e).stepForward()),onSkipToEnd:p[17]||(p[17]=m=>f(e).skipToEnd())},null,8,["cursor","buffered-count","fully-buffered","can-step-back","can-step-forward"])]),h("div",bk,[C(ok,{size:f(e).view.size,capacity:f(e).view.capacity,"load-factor":f(e).view.loadFactor,threshold:f(e).activeThreshold.value,probes:f(e).stats.probes,collisions:f(e).stats.collisions,resizes:f(e).stats.resizes,"avg-probes":f(e).avgProbes.value},null,8,["size","capacity","load-factor","threshold","probes","collisions","resizes","avg-probes"]),C(hk,{class:"flex-1",buckets:f(e).buckets.value,"home-index":f(e).view.homeIndex,"probe-index":f(e).view.probeIndex,"probe-seq":f(e).view.probeSeq,phase:f(e).view.phase,"active-key":f(e).view.key,chaining:a.value},null,8,["buckets","home-index","probe-index","probe-seq","phase","active-key","chaining"]),C(Er,{title:"Why this step",headline:u.value,formula:f(e).view.explain,rows:c.value},null,8,["headline","formula","rows"]),C(Yo,{lines:f(e).pseudocodeLines.value,"active-line":f(e).activeLine.value,source:f(e).sourceCode.value.text,"source-file":f(e).sourceCode.value.file,"active-source-lines":f(e).activeSourceLines.value},null,8,["lines","active-line","source","source-file","active-source-lines"])])]))}}),Ls=[{path:"/sorting",name:"sorting",component:ub,meta:{label:"Sorting",pitch:"Watch bars compare and swap their way into order.",count:Object.keys(Zn).length}},{path:"/searching",name:"searching",component:Eb,meta:{label:"Searching",pitch:"Narrow down a target and see how many probes it takes.",count:Object.keys(Ho).length}},{path:"/dp",name:"dp",component:px,meta:{label:"DP",pitch:"Fill a table cell by cell and trace the answer back out of it.",count:Object.keys(Ht).length}},{path:"/pathfinding",name:"pathfinding",component:Hb,meta:{label:"Pathfinding",pitch:"Paint walls on a grid and race algorithms to the exit.",count:Object.keys(Uo).length}},{path:"/bst",name:"bst",component:rv,meta:{label:"BST",pitch:"Insert, search and delete nodes in a binary search tree."}},{path:"/heap",name:"heap",component:Av,meta:{label:"Heap",pitch:"Sift values up and down to keep the heap property."}},{path:"/graph",name:"graph",component:Zv,meta:{label:"Graph",pitch:"Traverse nodes and edges breadth- or depth-first.",count:Object.keys(zo).length}},{path:"/mst",name:"mst",component:u1,meta:{label:"Union-Find & MST",pitch:"Merge disjoint sets, then grow a minimum spanning tree from them.",count:Object.keys(qo).length}},{path:"/hashing",name:"hashing",component:vk,meta:{label:"Hashing",pitch:"Watch keys collide, probe, and rehash as the table fills up.",count:Object.keys(Go).length}},{path:"/concurrency",name:"concurrency",component:Sw,meta:{label:"Concurrency",pitch:"Find the exact thread interleaving that breaks the invariant.",count:Object.keys(Ds).length}},{path:"/sandbox",name:"sandbox",component:Fy,meta:{label:"Sandbox",pitch:"Write your own algorithm and watch it run, safely isolated."}}],yk=[{path:"/",name:"landing",component:Lm,meta:{label:"Home",pitch:""}},...Ls,{path:"/:pathMatch(.*)*",redirect:"/"}],mc=Gf({history:Af("/algoviz/preview/claude-plan-features-002-006-008-g086u3/"),routes:yk}),gc="algoviz-theme";function wk(){try{const t=localStorage.getItem(gc);if(t==="light")return!1;if(t==="dark")return!0}catch{}return!0}const Cs=F(wk());function rl(){document.documentElement.classList.toggle("dark",Cs.value);try{localStorage.setItem(gc,Cs.value?"dark":"light")}catch{}}function bc(){function t(){Cs.value=!Cs.value,rl()}function e(){rl()}return{isDark:Cs,toggle:t,initTheme:e}}const xk=["aria-label","title"],kk={key:0,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-5 w-5"},Sk={key:1,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"h-5 w-5"},$k=oe({__name:"ThemeToggle",setup(t){const{isDark:e,toggle:n}=bc();return(s,o)=>(x(),A("button",{type:"button",class:"group flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/70 text-slate-600 transition-all hover:scale-105 hover:text-indigo-500 active:scale-95 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:text-indigo-400","aria-label":f(e)?"Switch to light mode":"Switch to dark mode",title:f(e)?"Switch to light mode":"Switch to dark mode",onClick:o[0]||(o[0]=(...a)=>f(n)&&f(n)(...a))},[f(e)?(x(),A("svg",kk,[...o[1]||(o[1]=[h("circle",{cx:"12",cy:"12",r:"4"},null,-1),h("path",{d:"M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"},null,-1)])])):(x(),A("svg",Sk,[...o[2]||(o[2]=[h("path",{d:"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"},null,-1)])]))],8,xk))}}),Ek={class:"min-h-screen"},Ck={class:"mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8"},Ak={class:"mb-6 flex items-center justify-between"},Tk={class:"mb-6 flex flex-wrap gap-2"},Ok=oe({__name:"App",setup(t){return(e,n)=>(x(),A("div",Ek,[h("div",Ck,[h("header",Ak,[C(f(js),{to:"/",class:"flex items-center gap-3 rounded-2xl transition-opacity hover:opacity-80"},{default:D(()=>[...n[0]||(n[0]=[h("div",{class:"flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/30"},[h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"white","stroke-width":"2","stroke-linecap":"round",class:"h-6 w-6"},[h("line",{x1:"6",y1:"20",x2:"6",y2:"14"}),h("line",{x1:"12",y1:"20",x2:"12",y2:"4"}),h("line",{x1:"18",y1:"20",x2:"18",y2:"10"})])],-1),h("div",null,[h("h1",{class:"text-xl font-bold tracking-tight sm:text-2xl"},"AlgoViz"),h("p",{class:"text-xs text-slate-400 sm:text-sm"},"Interactive algorithm visualizer")],-1)])]),_:1}),C($k)]),h("nav",Tk,[(x(!0),A(ae,null,me(f(Ls),s=>(x(),J(f(js),{key:s.path,to:s.path,class:de(["rounded-xl px-4 py-2 text-sm font-semibold transition-all",e.$route.path===s.path?"bg-indigo-500 text-white shadow-md shadow-indigo-500/30":"bg-white/70 text-slate-600 hover:bg-slate-100 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:bg-slate-700"])},{default:D(()=>{var o;return[O(R((o=s.meta)==null?void 0:o.label),1)]}),_:2},1032,["to","class"]))),128))]),C(f(Au)),n[1]||(n[1]=h("footer",{class:"mt-8 text-center text-xs text-slate-400"}," Built with Vue 3, Vite & Tailwind CSS · each algorithm is a generator yielding step snapshots. ",-1))])]))}});bc().initTheme();const Mk=new Set(Ls.map(t=>t.name));Ku().trackLastVisited(mc,t=>Mk.has(t));Bp(Ok).use(mc).mount("#app");
