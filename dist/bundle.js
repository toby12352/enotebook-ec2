/*! For license information please see bundle.js.LICENSE.txt */
(()=>{var e={856:function(e){e.exports=function(){"use strict";const{entries:e,setPrototypeOf:t,isFrozen:n,getPrototypeOf:o,getOwnPropertyDescriptor:r}=Object;let{freeze:a,seal:i,create:s}=Object,{apply:l,construct:c}="undefined"!=typeof Reflect&&Reflect;l||(l=function(e,t,n){return e.apply(t,n)}),a||(a=function(e){return e}),i||(i=function(e){return e}),c||(c=function(e,t){return new e(...t)});const u=A(Array.prototype.forEach),m=A(Array.prototype.pop),d=A(Array.prototype.push),p=A(String.prototype.toLowerCase),f=A(String.prototype.toString),g=A(String.prototype.match),h=A(String.prototype.replace),y=A(String.prototype.indexOf),T=A(String.prototype.trim),b=A(RegExp.prototype.test),E=(_=TypeError,function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return c(_,t)});var _;function A(e){return function(t){for(var n=arguments.length,o=new Array(n>1?n-1:0),r=1;r<n;r++)o[r-1]=arguments[r];return l(e,t,o)}}function v(e,o,r){var a;r=null!==(a=r)&&void 0!==a?a:p,t&&t(e,null);let i=o.length;for(;i--;){let t=o[i];if("string"==typeof t){const e=r(t);e!==t&&(n(o)||(o[i]=e),t=e)}e[t]=!0}return e}function N(t){const n=s(null);for(const[o,r]of e(t))n[o]=r;return n}function w(e,t){for(;null!==e;){const n=r(e,t);if(n){if(n.get)return A(n.get);if("function"==typeof n.value)return A(n.value)}e=o(e)}return function(e){return console.warn("fallback value for",e),null}}const S=a(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),R=a(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),k=a(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),L=a(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),x=a(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),C=a(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),D=a(["#text"]),O=a(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","xmlns","slot"]),I=a(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),M=a(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),U=a(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),P=i(/\{\{[\w\W]*|[\w\W]*\}\}/gm),H=i(/<%[\w\W]*|[\w\W]*%>/gm),F=i(/\${[\w\W]*}/gm),z=i(/^data-[\-\w.\u00B7-\uFFFF]/),B=i(/^aria-[\-\w]+$/),j=i(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),W=i(/^(?:\w+script|data):/i),G=i(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Y=i(/^html$/i);var $=Object.freeze({__proto__:null,MUSTACHE_EXPR:P,ERB_EXPR:H,TMPLIT_EXPR:F,DATA_ATTR:z,ARIA_ATTR:B,IS_ALLOWED_URI:j,IS_SCRIPT_OR_DATA:W,ATTR_WHITESPACE:G,DOCTYPE_NAME:Y});const q=()=>"undefined"==typeof window?null:window;return function t(){let n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:q();const o=e=>t(e);if(o.version="3.0.5",o.removed=[],!n||!n.document||9!==n.document.nodeType)return o.isSupported=!1,o;const r=n.document,i=r.currentScript;let{document:s}=n;const{DocumentFragment:l,HTMLTemplateElement:c,Node:_,Element:A,NodeFilter:P,NamedNodeMap:H=n.NamedNodeMap||n.MozNamedAttrMap,HTMLFormElement:F,DOMParser:z,trustedTypes:B}=n,W=A.prototype,G=w(W,"cloneNode"),X=w(W,"nextSibling"),J=w(W,"childNodes"),K=w(W,"parentNode");if("function"==typeof c){const e=s.createElement("template");e.content&&e.content.ownerDocument&&(s=e.content.ownerDocument)}let V,Z="";const{implementation:Q,createNodeIterator:ee,createDocumentFragment:te,getElementsByTagName:ne}=s,{importNode:oe}=r;let re={};o.isSupported="function"==typeof e&&"function"==typeof K&&Q&&void 0!==Q.createHTMLDocument;const{MUSTACHE_EXPR:ae,ERB_EXPR:ie,TMPLIT_EXPR:se,DATA_ATTR:le,ARIA_ATTR:ce,IS_SCRIPT_OR_DATA:ue,ATTR_WHITESPACE:me}=$;let{IS_ALLOWED_URI:de}=$,pe=null;const fe=v({},[...S,...R,...k,...x,...D]);let ge=null;const he=v({},[...O,...I,...M,...U]);let ye=Object.seal(Object.create(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Te=null,be=null,Ee=!0,_e=!0,Ae=!1,ve=!0,Ne=!1,we=!1,Se=!1,Re=!1,ke=!1,Le=!1,xe=!1,Ce=!0,De=!1,Oe=!0,Ie=!1,Me={},Ue=null;const Pe=v({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let He=null;const Fe=v({},["audio","video","img","source","image","track"]);let ze=null;const Be=v({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),je="http://www.w3.org/1998/Math/MathML",We="http://www.w3.org/2000/svg",Ge="http://www.w3.org/1999/xhtml";let Ye=Ge,$e=!1,qe=null;const Xe=v({},[je,We,Ge],f);let Je;const Ke=["application/xhtml+xml","text/html"];let Ve,Ze=null;const Qe=s.createElement("form"),et=function(e){return e instanceof RegExp||e instanceof Function},tt=function(e){if(!Ze||Ze!==e){if(e&&"object"==typeof e||(e={}),e=N(e),Je=Je=-1===Ke.indexOf(e.PARSER_MEDIA_TYPE)?"text/html":e.PARSER_MEDIA_TYPE,Ve="application/xhtml+xml"===Je?f:p,pe="ALLOWED_TAGS"in e?v({},e.ALLOWED_TAGS,Ve):fe,ge="ALLOWED_ATTR"in e?v({},e.ALLOWED_ATTR,Ve):he,qe="ALLOWED_NAMESPACES"in e?v({},e.ALLOWED_NAMESPACES,f):Xe,ze="ADD_URI_SAFE_ATTR"in e?v(N(Be),e.ADD_URI_SAFE_ATTR,Ve):Be,He="ADD_DATA_URI_TAGS"in e?v(N(Fe),e.ADD_DATA_URI_TAGS,Ve):Fe,Ue="FORBID_CONTENTS"in e?v({},e.FORBID_CONTENTS,Ve):Pe,Te="FORBID_TAGS"in e?v({},e.FORBID_TAGS,Ve):{},be="FORBID_ATTR"in e?v({},e.FORBID_ATTR,Ve):{},Me="USE_PROFILES"in e&&e.USE_PROFILES,Ee=!1!==e.ALLOW_ARIA_ATTR,_e=!1!==e.ALLOW_DATA_ATTR,Ae=e.ALLOW_UNKNOWN_PROTOCOLS||!1,ve=!1!==e.ALLOW_SELF_CLOSE_IN_ATTR,Ne=e.SAFE_FOR_TEMPLATES||!1,we=e.WHOLE_DOCUMENT||!1,ke=e.RETURN_DOM||!1,Le=e.RETURN_DOM_FRAGMENT||!1,xe=e.RETURN_TRUSTED_TYPE||!1,Re=e.FORCE_BODY||!1,Ce=!1!==e.SANITIZE_DOM,De=e.SANITIZE_NAMED_PROPS||!1,Oe=!1!==e.KEEP_CONTENT,Ie=e.IN_PLACE||!1,de=e.ALLOWED_URI_REGEXP||j,Ye=e.NAMESPACE||Ge,ye=e.CUSTOM_ELEMENT_HANDLING||{},e.CUSTOM_ELEMENT_HANDLING&&et(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ye.tagNameCheck=e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),e.CUSTOM_ELEMENT_HANDLING&&et(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ye.attributeNameCheck=e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),e.CUSTOM_ELEMENT_HANDLING&&"boolean"==typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements&&(ye.allowCustomizedBuiltInElements=e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ne&&(_e=!1),Le&&(ke=!0),Me&&(pe=v({},[...D]),ge=[],!0===Me.html&&(v(pe,S),v(ge,O)),!0===Me.svg&&(v(pe,R),v(ge,I),v(ge,U)),!0===Me.svgFilters&&(v(pe,k),v(ge,I),v(ge,U)),!0===Me.mathMl&&(v(pe,x),v(ge,M),v(ge,U))),e.ADD_TAGS&&(pe===fe&&(pe=N(pe)),v(pe,e.ADD_TAGS,Ve)),e.ADD_ATTR&&(ge===he&&(ge=N(ge)),v(ge,e.ADD_ATTR,Ve)),e.ADD_URI_SAFE_ATTR&&v(ze,e.ADD_URI_SAFE_ATTR,Ve),e.FORBID_CONTENTS&&(Ue===Pe&&(Ue=N(Ue)),v(Ue,e.FORBID_CONTENTS,Ve)),Oe&&(pe["#text"]=!0),we&&v(pe,["html","head","body"]),pe.table&&(v(pe,["tbody"]),delete Te.tbody),e.TRUSTED_TYPES_POLICY){if("function"!=typeof e.TRUSTED_TYPES_POLICY.createHTML)throw E('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if("function"!=typeof e.TRUSTED_TYPES_POLICY.createScriptURL)throw E('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');V=e.TRUSTED_TYPES_POLICY,Z=V.createHTML("")}else void 0===V&&(V=function(e,t){if("object"!=typeof e||"function"!=typeof e.createPolicy)return null;let n=null;const o="data-tt-policy-suffix";t&&t.hasAttribute(o)&&(n=t.getAttribute(o));const r="dompurify"+(n?"#"+n:"");try{return e.createPolicy(r,{createHTML:e=>e,createScriptURL:e=>e})}catch(e){return console.warn("TrustedTypes policy "+r+" could not be created."),null}}(B,i)),null!==V&&"string"==typeof Z&&(Z=V.createHTML(""));a&&a(e),Ze=e}},nt=v({},["mi","mo","mn","ms","mtext"]),ot=v({},["foreignobject","desc","title","annotation-xml"]),rt=v({},["title","style","font","a","script"]),at=v({},R);v(at,k),v(at,L);const it=v({},x);v(it,C);const st=function(e){d(o.removed,{element:e});try{e.parentNode.removeChild(e)}catch(t){e.remove()}},lt=function(e,t){try{d(o.removed,{attribute:t.getAttributeNode(e),from:t})}catch(e){d(o.removed,{attribute:null,from:t})}if(t.removeAttribute(e),"is"===e&&!ge[e])if(ke||Le)try{st(t)}catch(e){}else try{t.setAttribute(e,"")}catch(e){}},ct=function(e){let t,n;if(Re)e="<remove></remove>"+e;else{const t=g(e,/^[\r\n\t ]+/);n=t&&t[0]}"application/xhtml+xml"===Je&&Ye===Ge&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");const o=V?V.createHTML(e):e;if(Ye===Ge)try{t=(new z).parseFromString(o,Je)}catch(e){}if(!t||!t.documentElement){t=Q.createDocument(Ye,"template",null);try{t.documentElement.innerHTML=$e?Z:o}catch(e){}}const r=t.body||t.documentElement;return e&&n&&r.insertBefore(s.createTextNode(n),r.childNodes[0]||null),Ye===Ge?ne.call(t,we?"html":"body")[0]:we?t.documentElement:r},ut=function(e){return ee.call(e.ownerDocument||e,e,P.SHOW_ELEMENT|P.SHOW_COMMENT|P.SHOW_TEXT,null,!1)},mt=function(e){return"object"==typeof _?e instanceof _:e&&"object"==typeof e&&"number"==typeof e.nodeType&&"string"==typeof e.nodeName},dt=function(e,t,n){re[e]&&u(re[e],(e=>{e.call(o,t,n,Ze)}))},pt=function(e){let t;if(dt("beforeSanitizeElements",e,null),(n=e)instanceof F&&("string"!=typeof n.nodeName||"string"!=typeof n.textContent||"function"!=typeof n.removeChild||!(n.attributes instanceof H)||"function"!=typeof n.removeAttribute||"function"!=typeof n.setAttribute||"string"!=typeof n.namespaceURI||"function"!=typeof n.insertBefore||"function"!=typeof n.hasChildNodes))return st(e),!0;var n;const r=Ve(e.nodeName);if(dt("uponSanitizeElement",e,{tagName:r,allowedTags:pe}),e.hasChildNodes()&&!mt(e.firstElementChild)&&(!mt(e.content)||!mt(e.content.firstElementChild))&&b(/<[/\w]/g,e.innerHTML)&&b(/<[/\w]/g,e.textContent))return st(e),!0;if(!pe[r]||Te[r]){if(!Te[r]&&gt(r)){if(ye.tagNameCheck instanceof RegExp&&b(ye.tagNameCheck,r))return!1;if(ye.tagNameCheck instanceof Function&&ye.tagNameCheck(r))return!1}if(Oe&&!Ue[r]){const t=K(e)||e.parentNode,n=J(e)||e.childNodes;if(n&&t)for(let o=n.length-1;o>=0;--o)t.insertBefore(G(n[o],!0),X(e))}return st(e),!0}return e instanceof A&&!function(e){let t=K(e);t&&t.tagName||(t={namespaceURI:Ye,tagName:"template"});const n=p(e.tagName),o=p(t.tagName);return!!qe[e.namespaceURI]&&(e.namespaceURI===We?t.namespaceURI===Ge?"svg"===n:t.namespaceURI===je?"svg"===n&&("annotation-xml"===o||nt[o]):Boolean(at[n]):e.namespaceURI===je?t.namespaceURI===Ge?"math"===n:t.namespaceURI===We?"math"===n&&ot[o]:Boolean(it[n]):e.namespaceURI===Ge?!(t.namespaceURI===We&&!ot[o])&&!(t.namespaceURI===je&&!nt[o])&&!it[n]&&(rt[n]||!at[n]):!("application/xhtml+xml"!==Je||!qe[e.namespaceURI]))}(e)?(st(e),!0):"noscript"!==r&&"noembed"!==r&&"noframes"!==r||!b(/<\/no(script|embed|frames)/i,e.innerHTML)?(Ne&&3===e.nodeType&&(t=e.textContent,t=h(t,ae," "),t=h(t,ie," "),t=h(t,se," "),e.textContent!==t&&(d(o.removed,{element:e.cloneNode()}),e.textContent=t)),dt("afterSanitizeElements",e,null),!1):(st(e),!0)},ft=function(e,t,n){if(Ce&&("id"===t||"name"===t)&&(n in s||n in Qe))return!1;if(_e&&!be[t]&&b(le,t));else if(Ee&&b(ce,t));else if(!ge[t]||be[t]){if(!(gt(e)&&(ye.tagNameCheck instanceof RegExp&&b(ye.tagNameCheck,e)||ye.tagNameCheck instanceof Function&&ye.tagNameCheck(e))&&(ye.attributeNameCheck instanceof RegExp&&b(ye.attributeNameCheck,t)||ye.attributeNameCheck instanceof Function&&ye.attributeNameCheck(t))||"is"===t&&ye.allowCustomizedBuiltInElements&&(ye.tagNameCheck instanceof RegExp&&b(ye.tagNameCheck,n)||ye.tagNameCheck instanceof Function&&ye.tagNameCheck(n))))return!1}else if(ze[t]);else if(b(de,h(n,me,"")));else if("src"!==t&&"xlink:href"!==t&&"href"!==t||"script"===e||0!==y(n,"data:")||!He[e])if(Ae&&!b(ue,h(n,me,"")));else if(n)return!1;return!0},gt=function(e){return e.indexOf("-")>0},ht=function(e){let t,n,r,a;dt("beforeSanitizeAttributes",e,null);const{attributes:i}=e;if(!i)return;const s={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ge};for(a=i.length;a--;){t=i[a];const{name:l,namespaceURI:c}=t;if(n="value"===l?t.value:T(t.value),r=Ve(l),s.attrName=r,s.attrValue=n,s.keepAttr=!0,s.forceKeepAttr=void 0,dt("uponSanitizeAttribute",e,s),n=s.attrValue,s.forceKeepAttr)continue;if(lt(l,e),!s.keepAttr)continue;if(!ve&&b(/\/>/i,n)){lt(l,e);continue}Ne&&(n=h(n,ae," "),n=h(n,ie," "),n=h(n,se," "));const u=Ve(e.nodeName);if(ft(u,r,n)){if(!De||"id"!==r&&"name"!==r||(lt(l,e),n="user-content-"+n),V&&"object"==typeof B&&"function"==typeof B.getAttributeType)if(c);else switch(B.getAttributeType(u,r)){case"TrustedHTML":n=V.createHTML(n);break;case"TrustedScriptURL":n=V.createScriptURL(n)}try{c?e.setAttributeNS(c,l,n):e.setAttribute(l,n),m(o.removed)}catch(e){}}}dt("afterSanitizeAttributes",e,null)},yt=function e(t){let n;const o=ut(t);for(dt("beforeSanitizeShadowDOM",t,null);n=o.nextNode();)dt("uponSanitizeShadowNode",n,null),pt(n)||(n.content instanceof l&&e(n.content),ht(n));dt("afterSanitizeShadowDOM",t,null)};return o.sanitize=function(e){let t,n,a,i,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if($e=!e,$e&&(e="\x3c!--\x3e"),"string"!=typeof e&&!mt(e)){if("function"!=typeof e.toString)throw E("toString is not a function");if("string"!=typeof(e=e.toString()))throw E("dirty is not a string, aborting")}if(!o.isSupported)return e;if(Se||tt(s),o.removed=[],"string"==typeof e&&(Ie=!1),Ie){if(e.nodeName){const t=Ve(e.nodeName);if(!pe[t]||Te[t])throw E("root node is forbidden and cannot be sanitized in-place")}}else if(e instanceof _)t=ct("\x3c!----\x3e"),n=t.ownerDocument.importNode(e,!0),1===n.nodeType&&"BODY"===n.nodeName||"HTML"===n.nodeName?t=n:t.appendChild(n);else{if(!ke&&!Ne&&!we&&-1===e.indexOf("<"))return V&&xe?V.createHTML(e):e;if(t=ct(e),!t)return ke?null:xe?Z:""}t&&Re&&st(t.firstChild);const c=ut(Ie?e:t);for(;a=c.nextNode();)pt(a)||(a.content instanceof l&&yt(a.content),ht(a));if(Ie)return e;if(ke){if(Le)for(i=te.call(t.ownerDocument);t.firstChild;)i.appendChild(t.firstChild);else i=t;return(ge.shadowroot||ge.shadowrootmode)&&(i=oe.call(r,i,!0)),i}let u=we?t.outerHTML:t.innerHTML;return we&&pe["!doctype"]&&t.ownerDocument&&t.ownerDocument.doctype&&t.ownerDocument.doctype.name&&b(Y,t.ownerDocument.doctype.name)&&(u="<!DOCTYPE "+t.ownerDocument.doctype.name+">\n"+u),Ne&&(u=h(u,ae," "),u=h(u,ie," "),u=h(u,se," ")),V&&xe?V.createHTML(u):u},o.setConfig=function(e){tt(e),Se=!0},o.clearConfig=function(){Ze=null,Se=!1},o.isValidAttribute=function(e,t,n){Ze||tt({});const o=Ve(e),r=Ve(t);return ft(o,r,n)},o.addHook=function(e,t){"function"==typeof t&&(re[e]=re[e]||[],d(re[e],t))},o.removeHook=function(e){if(re[e])return m(re[e])},o.removeHooks=function(e){re[e]&&(re[e]=[])},o.removeAllHooks=function(){re={}},o}()}()}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var a=t[o]={exports:{}};return e[o].call(a.exports,a,a.exports,n),a.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";var e=n(856),t=n.n(e),o=document.getElementById("send-button"),r=(document.getElementById("stop-button"),document.getElementById("message-input")),a=document.getElementById("chat-box");let i={object:null,last_message:null};var s=[];const l=io.connect("http://localhost:3000");var c="";function u(e,n){var o=document.createElement("div");o.classList.add(n);var r=document.createElement("div");r.classList.add("username-content"),r.textContent="user"==n?"User:   ":"Jarvis:   ",r.style.color="user"==n?"red":"blue";var a=document.createElement("div");a.classList.add("message-content");var i=t().sanitize(marked(e));if(a.innerHTML=i,o.appendChild(r),o.appendChild(a),"user"==n){var s=document.createElement("button");s.textContent="",s.classList.add("delete-button"),o.appendChild(s)}return o}async function m(e=""){var t=e||r.value;if(""==t)return;r.disabled=!0,o.disabled=!0;var n=u(t,"user");a.appendChild(n),r.value="";const i=Date.now();if("language"==module_type.value){var l=await d(t,"Determine the user's comprehension in the language they spoke in, on a K-12 scale. If there hasn't been enough text, default to 5th grade. Reply in the format: {language}, {comprehension level}th grade"),c=await d(`Create some advice for a student learning  learning ${l}. Judge their message below for spelling or grammar errors. List out any spelling or grammar errors found.\n\n${t}`),m=await d(`Apply formatting to the message: ${t}\nif there are any spelling errors can you mark them by surrounding them with "~" symbol and if there are any grammar errors, mark them by surrounding them with "#" symbol. Reply with the students original message with the highlighting applied. If there are no errors then do not modify the message.\nBased on the following advice: ${c}`);n.setAttribute("title",c),console.log(l),console.log(c),console.log(m);var p=await d(t);system_level=""}else p=await d(t);var f=Date.now()-i;const g=p.length;console.log(`Reply Finished: ${g} characters finished in ${f} ms (Avg ${g/((f-700)/1e3)} chars per second)`);const h=Date.now();a.scrollTop=a.scrollHeight;var y={user_message:t,system_message:"",response_message:p,debug_info:{response_time:f,tokens_used:0,user_tokens:0,response_tokens:0}};if(s.push(y),r.disabled=!1,o.disabled=!1,r.focus(),tts_enabled.checked)if("instant"==ai_type.value)speak();else{console.log("Generating Audio\n");const e=await async function(e){if("aiTTS"==ai_type.value||"11aiTTS"==ai_type.value){const t=await fetch("/get-audio-reply",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:e,audio_type:ai_type.value,audio_volume:tts_volmue,audio_speed:tts_speed})});return t.ok?await t.blob():(console.error(`Error: ${t.statusText}`),"")}{const t=await fetch("/get-audio-reply-free",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:e})});return t.ok?await t.blob():(console.error(`Error: ${t.statusText}`),"")}}(p);console.log(e);const t=URL.createObjectURL(e);console.log(t);const n=new Audio(t);f=Date.now()-h,console.log(`Audio Finished: ${g} characters finished in ${f} ms (Avg ${g/(f/1e3)} chars per second)`),n.play()}return Promise.resolve()}async function d(e,t="",n=!1){data_package={message:e,data:s,sys_message:t},n&&(data_package.data={});const o=await fetch("/get-chat-reply",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data_package)});if(!o.ok)return console.error(`Error: ${o.statusText}`),"";const r=await o.json();return console.log(r),r.reply}l.on("message",(e=>{if(e.newReply||!i.object)i.object=u(e.data,"bot"),a.appendChild(i.object),a.scrollTop=a.scrollHeight,c=i.object.querySelector(".message-content").textContent;else{const n=i.object.querySelector(".message-content");c+=e.data,n.textContent="";const o=t().sanitize(marked(c));i.object.querySelector(".message-content").innerHTML=o}})),o.addEventListener("click",(()=>m())),r.addEventListener("keypress",(async function(e){"Enter"===e.key&&(e.preventDefault(),m())}))})()})();