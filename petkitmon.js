import{a as y,w as P,r as n,c as _,j as r,Y as E,b as R,R as v}from"./chunk-petkitmon.js";class w{async getListPokemonType(){try{return await(await y.get("https://pokeapi.co/api/v2/type")).data}catch(o){console.error(o)}}}class g{_client;constructor(){this._client=new w}async listPokemonTypes(){const o=await this._client.getListPokemonType();return console.log(o),[]}}class x extends P{key;lotus;constructor(){super(),this.key=Symbol("AppRepository"),this.lotus=new g,y.defaults.timeout=120*1e3}getName(){return this.key.description??"AppRepository"}}const L=function(){const o=typeof document<"u"&&document.createElement("link").relList;return o&&o.supports&&o.supports("modulepreload")?"modulepreload":"preload"}(),S=function(t){return"/petkitmon/"+t},h={},m=function(o,u,f){let d=Promise.resolve();if(u&&u.length>0){const i=document.getElementsByTagName("link");d=Promise.all(u.map(e=>{if(e=S(e),e in h)return;h[e]=!0;const a=e.endsWith(".css"),k=a?'[rel="stylesheet"]':"";if(!!f)for(let l=i.length-1;l>=0;l--){const c=i[l];if(c.href===e&&(!a||c.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${e}"]${k}`))return;const s=document.createElement("link");if(s.rel=a?"stylesheet":L,a||(s.as="script",s.crossOrigin=""),s.href=e,document.head.appendChild(s),a)return new Promise((l,c)=>{s.addEventListener("load",l),s.addEventListener("error",()=>c(new Error(`Unable to preload CSS for ${e}`)))})}))}return d.then(()=>o()).catch(i=>{const e=new Event("vite:preloadError",{cancelable:!0});if(e.payload=i,window.dispatchEvent(e),!e.defaultPrevented)throw i})};var p=(t=>(t.root="/",t.detailPokemon="/detail-pokemon",t))(p||{});class j{static host="http://localhost:8000";static basePath="/petkitmon/"}const b=n.lazy(()=>m(()=>import("./chunk-petkitmon2.js"),__vite__mapDeps([]))),A=n.lazy(()=>m(()=>import("./chunk-petkitmon3.js"),__vite__mapDeps([]))),T=n.lazy(()=>m(()=>import("./chunk-petkitmon4.js"),__vite__mapDeps([])));function B(){return _([{path:p.root,element:r.jsx(n.Suspense,{children:r.jsx(b,{})}),children:[{index:!0,element:r.jsx(n.Suspense,{children:r.jsx(A,{})})},{path:p.detailPokemon,element:r.jsx(n.Suspense,{children:r.jsx(T,{})})}]}],{basename:j.basePath.toString()})}new E().use(new x);const C=B();R.createRoot(document.getElementById("root")).render(r.jsx(v,{router:C}));
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
//# sourceMappingURL=petkitmon.js.map
