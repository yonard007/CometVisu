!function(g){function t(){this._settings=[],this._extensions=[],this.regional=[],this.regional[""]={errorLoadingText:"Error loading"},this.local=this.regional[""],this._uuid=(new Date).getTime(),this._ie=!!window.ActiveXObject}function e(t,e){this._svg=t,this._container=e;for(var n=0;n<g.svg._extensions.length;n++){var i=g.svg._extensions[n];this[i[0]]=new i[1](this)}}function n(){this._path=""}function i(){this._parts=[]}g.extend(t.prototype,{markerClassName:"hasSVG",propertyName:"svgwrapper",svgNS:"http://www.w3.org/2000/svg",xlinkNS:"http://www.w3.org/1999/xlink",_wrapperClass:e,_attrNames:{class_:"class",in_:"in",alignmentBaseline:"alignment-baseline",baselineShift:"baseline-shift",clipPath:"clip-path",clipRule:"clip-rule",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorRendering:"color-rendering",dominantBaseline:"dominant-baseline",enableBackground:"enable-background",fillOpacity:"fill-opacity",fillRule:"fill-rule",floodColor:"flood-color",floodOpacity:"flood-opacity",fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",imageRendering:"image-rendering",letterSpacing:"letter-spacing",lightingColor:"lighting-color",markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",strokeDashArray:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",strokeLineCap:"stroke-linecap",strokeLineJoin:"stroke-linejoin",strokeMiterLimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",underlinePosition:"underline-position",underlineThickness:"underline-thickness",vertAdvY:"vert-adv-y",vertOriginY:"vert-origin-y",wordSpacing:"word-spacing",writingMode:"writing-mode"},_attachSVG:function(e,t){var n=e.namespaceURI===this.svgNS?e:null;if(!g((e=n?null:e)||n).hasClass(this.markerClassName)){"string"==typeof t?t={loadURL:t}:"function"==typeof t&&(t={onLoad:t}),g(e||n).addClass(this.markerClassName);try{n||((n=document.createElementNS(this.svgNS,"svg")).setAttribute("version","1.1"),0<e.clientWidth&&n.setAttribute("width",e.clientWidth),0<e.clientHeight&&n.setAttribute("height",e.clientHeight),e.appendChild(n)),this._afterLoad(e,n,t||{})}catch(t){g(e).html("<p>SVG is not supported natively on this browser</p>")}}},_afterLoad:function(t,e,n){n=n||this._settings[t.id];this._settings[t?t.id:""]=null;var i=new this._wrapperClass(e,t);g.data(t||e,g.svg.propertyName,i);try{n.loadURL&&i.load(n.loadURL,n),n.settings&&i.configure(n.settings),n.onLoad&&!n.loadURL&&n.onLoad.apply(t||e,[i])}catch(t){alert(t)}},_getSVG:function(t){return g(t).data(this.propertyName)},_destroySVG:function(t){(t=g(t)).hasClass(this.markerClassName)&&(t.removeClass(this.markerClassName).removeData(this.propertyName),t[0].namespaceURI!==this.svgNS&&t.empty())},addExtension:function(t,e){this._extensions.push([t,e])},isSVGElem:function(t){return 1===t.nodeType&&t.namespaceURI===g.svg.svgNS}}),g.extend(e.prototype,{width:function(){return this._container?this._container.clientWidth:this._svg.width},height:function(){return this._container?this._container.clientHeight:this._svg.height},root:function(){return this._svg},configure:function(t,e,n){if(t.nodeName||(n=e,e=t,t=this._svg),n)for(var i=t.attributes.length-1;0<=i;i--){var r=t.attributes.item(i);"onload"!==r.nodeName&&"version"!==r.nodeName&&"xmlns"!==r.nodeName.substring(0,5)&&t.attributes.removeNamedItem(r.nodeName)}for(var s in e)t.setAttribute(g.svg._attrNames[s]||s,e[s]);return this},getElementById:function(t){return this._svg.ownerDocument.getElementById(t)},change:function(t,e){if(t)for(var n in e)null==e[n]?t.removeAttribute(g.svg._attrNames[n]||n):t.setAttribute(g.svg._attrNames[n]||n,e[n]);return this},_args:function(t,e,n){e.splice(0,0,"parent"),e.splice(e.length,0,"settings");var i={},r=0;null!=t[0]&&t[0].jquery&&(t[0]=t[0][0]),null==t[0]||"object"==typeof t[0]&&t[0].nodeName||(i.parent=null,r=1);for(var s=0;s<t.length;s++)i[e[s+r]]=t[s];return n&&g.each(n,function(t,e){"object"==typeof i[e]&&(i.settings=i[e],i[e]=null)}),i},title:function(t,e,n){var i=this._args(arguments,["text"]),r=this._makeNode(i.parent,"title",i.settings||{});return r.appendChild(this._svg.ownerDocument.createTextNode(i.text)),r},describe:function(t,e,n){var i=this._args(arguments,["text"]),r=this._makeNode(i.parent,"desc",i.settings||{});return r.appendChild(this._svg.ownerDocument.createTextNode(i.text)),r},defs:function(t,e,n){var i=this._args(arguments,["id"],["id"]);return this._makeNode(i.parent,"defs",g.extend(i.id?{id:i.id}:{},i.settings||{}))},symbol:function(t,e,n,i,r,s,o){var a=this._args(arguments,["id","x1","y1","width","height"]);return this._makeNode(a.parent,"symbol",g.extend({id:a.id,viewBox:a.x1+" "+a.y1+" "+a.width+" "+a.height},a.settings||{}))},marker:function(t,e,n,i,r,s,o,a){var h=this._args(arguments,["id","refX","refY","mWidth","mHeight","orient"],["orient"]);return this._makeNode(h.parent,"marker",g.extend({id:h.id,refX:h.refX,refY:h.refY,markerWidth:h.mWidth,markerHeight:h.mHeight,orient:h.orient||"auto"},h.settings||{}))},style:function(t,e,n){var i=this._args(arguments,["styles"]),r=this._makeNode(i.parent,"style",g.extend({type:"text/css"},i.settings||{}));return r.appendChild(this._svg.ownerDocument.createTextNode(i.styles)),r},script:function(t,e,n,i){var r=this._args(arguments,["script","type"],["type"]),s=this._makeNode(r.parent,"script",g.extend({type:r.type||"text/javascript"},r.settings||{}));return s.appendChild(this._svg.ownerDocument.createTextNode(r.script)),g.svg._ie&&g.globalEval(r.script),s},linearGradient:function(t,e,n,i,r,s,o,a){var h=this._args(arguments,["id","stops","x1","y1","x2","y2"],["x1"]),d=g.extend({id:h.id},null!=h.x1?{x1:h.x1,y1:h.y1,x2:h.x2,y2:h.y2}:{});return this._gradient(h.parent,"linearGradient",g.extend(d,h.settings||{}),h.stops)},radialGradient:function(t,e,n,i,r,s,o,a,h){var d=this._args(arguments,["id","stops","cx","cy","r","fx","fy"],["cx"]),l=g.extend({id:d.id},null!=d.cx?{cx:d.cx,cy:d.cy,r:d.r,fx:d.fx,fy:d.fy}:{});return this._gradient(d.parent,"radialGradient",g.extend(l,d.settings||{}),d.stops)},_gradient:function(t,e,n,i){for(var r=this._makeNode(t,e,n),s=0;s<i.length;s++){var o=i[s];this._makeNode(r,"stop",g.extend({offset:o[0],stopColor:o[1]},null!=o[2]?{stopOpacity:o[2]}:{}))}return r},pattern:function(t,e,n,i,r,s,o,a,h,d,l){var c=this._args(arguments,["id","x","y","width","height","vx","vy","vwidth","vheight"],["vx"]),u=g.extend({id:c.id,x:c.x,y:c.y,width:c.width,height:c.height},null!=c.vx?{viewBox:c.vx+" "+c.vy+" "+c.vwidth+" "+c.vheight}:{});return this._makeNode(c.parent,"pattern",g.extend(u,c.settings||{}))},clipPath:function(t,e,n,i){var r=this._args(arguments,["id","units"]);return r.units=r.units||"userSpaceOnUse",this._makeNode(r.parent,"clipPath",g.extend({id:r.id,clipPathUnits:r.units},r.settings||{}))},mask:function(t,e,n,i,r,s,o){var a=this._args(arguments,["id","x","y","width","height"]);return this._makeNode(a.parent,"mask",g.extend({id:a.id,x:a.x,y:a.y,width:a.width,height:a.height},a.settings||{}))},createPath:function(){return new n},createText:function(){return new i},svg:function(t,e,n,i,r,s,o,a,h,d){var l=this._args(arguments,["x","y","width","height","vx","vy","vwidth","vheight"],["vx"]),c=g.extend({x:l.x,y:l.y,width:l.width,height:l.height},null!=l.vx?{viewBox:l.vx+" "+l.vy+" "+l.vwidth+" "+l.vheight}:{});return this._makeNode(l.parent,"svg",g.extend(c,l.settings||{}))},group:function(t,e,n){var i=this._args(arguments,["id"],["id"]);return this._makeNode(i.parent,"g",g.extend({id:i.id},i.settings||{}))},use:function(t,e,n,i,r,s,o){var a=this._args(arguments,["x","y","width","height","ref"]);"string"==typeof a.x&&(a.ref=a.x,a.settings=a.y,a.x=a.y=a.width=a.height=null);var h=this._makeNode(a.parent,"use",g.extend({x:a.x,y:a.y,width:a.width,height:a.height},a.settings||{}));return h.setAttributeNS(g.svg.xlinkNS,"href",a.ref),h},link:function(t,e,n){var i=this._args(arguments,["ref"]),r=this._makeNode(i.parent,"a",i.settings);return r.setAttributeNS(g.svg.xlinkNS,"href",i.ref),r},image:function(t,e,n,i,r,s,o){var a=this._args(arguments,["x","y","width","height","ref"]),h=this._makeNode(a.parent,"image",g.extend({x:a.x,y:a.y,width:a.width,height:a.height},a.settings||{}));return h.setAttributeNS(g.svg.xlinkNS,"href",a.ref),h},path:function(t,e,n){var i=this._args(arguments,["path"]);return this._makeNode(i.parent,"path",g.extend({d:i.path.path?i.path.path():i.path},i.settings||{}))},rect:function(t,e,n,i,r,s,o,a){var h=this._args(arguments,["x","y","width","height","rx","ry"],["rx"]);return this._makeNode(h.parent,"rect",g.extend({x:h.x,y:h.y,width:h.width,height:h.height},h.rx?{rx:h.rx,ry:h.ry}:{},h.settings||{}))},circle:function(t,e,n,i,r){var s=this._args(arguments,["cx","cy","r"]);return this._makeNode(s.parent,"circle",g.extend({cx:s.cx,cy:s.cy,r:s.r},s.settings||{}))},ellipse:function(t,e,n,i,r,s){var o=this._args(arguments,["cx","cy","rx","ry"]);return this._makeNode(o.parent,"ellipse",g.extend({cx:o.cx,cy:o.cy,rx:o.rx,ry:o.ry},o.settings||{}))},line:function(t,e,n,i,r,s){var o=this._args(arguments,["x1","y1","x2","y2"]);return this._makeNode(o.parent,"line",g.extend({x1:o.x1,y1:o.y1,x2:o.x2,y2:o.y2},o.settings||{}))},polyline:function(t,e,n){var i=this._args(arguments,["points"]);return this._poly(i.parent,"polyline",i.points,i.settings)},polygon:function(t,e,n){var i=this._args(arguments,["points"]);return this._poly(i.parent,"polygon",i.points,i.settings)},_poly:function(t,e,n,i){for(var r="",s=0;s<n.length;s++)r+=n[s].join()+" ";return this._makeNode(t,e,g.extend({points:g.trim(r)},i||{}))},text:function(t,e,n,i,r){var s=this._args(arguments,["x","y","value"]);return"string"==typeof s.x&&arguments.length<4&&(s.value=s.x,s.settings=s.y,s.x=s.y=null),this._text(s.parent,"text",s.value,g.extend({x:s.x&&g.isArray(s.x)?s.x.join(" "):s.x,y:s.y&&g.isArray(s.y)?s.y.join(" "):s.y},s.settings||{}))},textpath:function(t,e,n,i){var r=this._args(arguments,["path","value"]),s=this._text(r.parent,"textPath",r.value,r.settings||{});return s.setAttributeNS(g.svg.xlinkNS,"href",r.path),s},_text:function(t,e,n,i){var r=this._makeNode(t,e,i);if("string"==typeof n)r.appendChild(r.ownerDocument.createTextNode(n));else for(var s=0;s<n._parts.length;s++){var o,a,h=n._parts[s];"tspan"===h[0]?((a=this._makeNode(r,h[0],h[2])).appendChild(r.ownerDocument.createTextNode(h[1])),r.appendChild(a)):"tref"===h[0]?((a=this._makeNode(r,h[0],h[2])).setAttributeNS(g.svg.xlinkNS,"href",h[1]),r.appendChild(a)):"textpath"===h[0]?((o=g.extend({},h[2])).href=null,(a=this._makeNode(r,h[0],o)).setAttributeNS(g.svg.xlinkNS,"href",h[2].href),a.appendChild(r.ownerDocument.createTextNode(h[1])),r.appendChild(a)):r.appendChild(r.ownerDocument.createTextNode(h[1]))}return r},other:function(t,e,n){var i=this._args(arguments,["name"]);return this._makeNode(i.parent,i.name,i.settings||{})},_makeNode:function(t,e,n){t=t||this._svg;var i=this._svg.ownerDocument.createElementNS(g.svg.svgNS,e);for(var e in n){var r=n[e];null==r||"string"==typeof r&&""===r||i.setAttribute(g.svg._attrNames[e]||e,r)}return t.appendChild(i),i},add:function(t,e){var n=this._args(1===arguments.length?[null,t]:arguments,["node"]),i=this;n.parent=n.parent||this._svg,n.node=n.node.jquery?n.node:g(n.node);try{n.parent.appendChild(n.node.cloneNode(!0))}catch(t){n.node.each(function(){var t=i._cloneAsSVG(this);t&&n.parent.appendChild(t)})}return this},clone:function(t,e){var n=this,i=this._args(1===arguments.length?[null,t]:arguments,["node"]);i.parent=i.parent||this._svg,i.node=i.node.jquery?i.node:g(i.node);var r=[];return i.node.each(function(){var t=n._cloneAsSVG(this);t&&(t.id="",i.parent.appendChild(t),r.push(t))}),r},_cloneAsSVG:function(e){var n=null;if(1===e.nodeType){n=this._svg.ownerDocument.createElementNS(g.svg.svgNS,this._checkName(e.nodeName));for(var t=0;t<e.attributes.length;t++){var i=e.attributes.item(t);"xmlns"!==i.nodeName&&i.nodeValue&&("xlink"===i.prefix?n.setAttributeNS(g.svg.xlinkNS,i.localName||i.baseName,i.nodeValue):n.setAttribute(this._checkName(i.nodeName),i.nodeValue))}for(t=0;t<e.childNodes.length;t++){var r=this._cloneAsSVG(e.childNodes[t]);r&&n.appendChild(r)}}else if(3===e.nodeType)g.trim(e.nodeValue)&&(n=this._svg.ownerDocument.createTextNode(e.nodeValue));else if(4===e.nodeType&&g.trim(e.nodeValue))try{n=this._svg.ownerDocument.createCDATASection(e.nodeValue)}catch(t){n=this._svg.ownerDocument.createTextNode(e.nodeValue.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"))}return n},_checkName:function(t){return"svg:"===(t="A"<=t.substring(0,1)&&t.substring(0,1)<="Z"?t.toLowerCase():t).substring(0,4)?t.substring(4):t},load:function(d,l){(l="boolean"==typeof l?{addTo:l}:"function"==typeof l?{onLoad:l}:"string"==typeof l||"object"==typeof l&&l.nodeName||"object"==typeof l&&l.jquery?{parent:l}:l||{}).parent||l.addTo||this.clear(!1);function c(t){t=g.svg.local.errorLoadingText+": "+t,l.onLoad?l.onLoad.apply(p._container||p._svg,[p,t]):p.text(null,10,20,t)}function e(t){if(t)if("svg"===t.documentElement.nodeName){for(var e=l.parent?g(l.parent)[0]:p._svg,n={},i=0;i<t.documentElement.attributes.length;i++){var r=t.documentElement.attributes.item(i);"version"!==r.nodeName&&"xmlns"!==r.nodeName.substring(0,5)&&(n[r.nodeName]=r.nodeValue)}p.configure(e,n,!l.parent);for(var s,o=t.documentElement.childNodes,i=0;i<o.length;i++)try{e.appendChild(p._svg.ownerDocument.importNode(o[i],!0)),"script"===o[i].nodeName&&g.globalEval(o[i].textContent)}catch(t){p.add(e,o[i])}!l.keepRelativeLinks&&d.match("/")&&(s=d.replace(/\/[^\/]*$/,"/"),g("*",e).each(function(){var t=g(this).attr("xlink:href");t&&!t.match(/(^[a-z][-a-z0-9+.]*:.*$)|(^\/.*$)|(^#.*$)/i)&&g(this).attr("xlink:href",s+t)})),l.changeSize||p.configure(e,{width:u[0],height:u[1]}),l.onLoad&&l.onLoad.apply(p._container||p._svg,[p])}else{var a=t.getElementsByTagName("parsererror"),h=a.length?a[0].getElementsByTagName("div"):[];c(a.length?(h.length?h[0]:a[0]).firstChild.nodeValue:"???")}}var u=[this._svg.getAttribute("width"),this._svg.getAttribute("height")],p=this;if(d.match("<svg"))try{e((new DOMParser).parseFromString(d,"text/xml"))}catch(t){c(t)}else g.ajax({url:d,dataType:"xml",success:function(t){e(t)},error:function(t,e,n){c(e+(n?" "+n.message:""))}});return this},remove:function(t){return(t=t.jquery?t[0]:t).parentNode.removeChild(t),this},clear:function(t){for(t&&this.configure({},!0);this._svg.firstChild;)this._svg.removeChild(this._svg.firstChild);return this},toSVG:function(t){return t=t||this._svg,"undefined"==typeof XMLSerializer?this._toSVG(t):(new XMLSerializer).serializeToString(t)},_toSVG:function(t){var e="";if(!t)return e;if(3===t.nodeType)e=t.nodeValue;else if(4===t.nodeType)e="<![CDATA["+t.nodeValue+"]]>";else{if(e="<"+t.nodeName,t.attributes)for(var n=0;n<t.attributes.length;n++){var i=t.attributes.item(n);""===g.trim(i.nodeValue)||i.nodeValue.match(/^\[object/)||i.nodeValue.match(/^function/)||(e+=" "+(i.namespaceURI===g.svg.xlinkNS?"xlink:":"")+i.nodeName+'="'+i.nodeValue+'"')}if(t.firstChild){e+=">";for(var r=t.firstChild;r;)e+=this._toSVG(r),r=r.nextSibling;e+="</"+t.nodeName+">"}else e+="/>"}return e}}),g.extend(n.prototype,{reset:function(){return this._path="",this},move:function(t,e,n){return n=g.isArray(t)?e:n,this._coords(n?"m":"M",t,e)},line:function(t,e,n){return n=g.isArray(t)?e:n,this._coords(n?"l":"L",t,e)},horiz:function(t,e){return this._path+=(e?"h":"H")+(g.isArray(t)?t.join(" "):t),this},vert:function(t,e){return this._path+=(e?"v":"V")+(g.isArray(t)?t.join(" "):t),this},curveC:function(t,e,n,i,r,s,o){return o=g.isArray(t)?e:o,this._coords(o?"c":"C",t,e,n,i,r,s)},smoothC:function(t,e,n,i,r){return r=g.isArray(t)?e:r,this._coords(r?"s":"S",t,e,n,i)},curveQ:function(t,e,n,i,r){return r=g.isArray(t)?e:r,this._coords(r?"q":"Q",t,e,n,i)},smoothQ:function(t,e,n){return n=g.isArray(t)?e:n,this._coords(n?"t":"T",t,e)},_coords:function(t,e,n,i,r,s,o){if(g.isArray(e))for(var a=0;a<e.length;a++){var h=e[a];this._path+=(0===a?t:" ")+h[0]+","+h[1]+(h.length<4?"":" "+h[2]+","+h[3]+(h.length<6?"":" "+h[4]+","+h[5]))}else this._path+=t+e+","+n+(null==i?"":" "+i+","+r+(null==s?"":" "+s+","+o));return this},arc:function(t,e,n,i,r,s,o,a){if(a=g.isArray(t)?e:a,this._path+=a?"a":"A",g.isArray(t))for(var h=0;h<t.length;h++){var d=t[h];this._path+=(0===h?"":" ")+d[0]+","+d[1]+" "+d[2]+" "+(d[3]?"1":"0")+","+(d[4]?"1":"0")+" "+d[5]+","+d[6]}else this._path+=t+","+e+" "+n+" "+(i?"1":"0")+","+(r?"1":"0")+" "+s+","+o;return this},close:function(){return this._path+="z",this},path:function(){return this._path}}),n.prototype.moveTo=n.prototype.move,n.prototype.lineTo=n.prototype.line,n.prototype.horizTo=n.prototype.horiz,n.prototype.vertTo=n.prototype.vert,n.prototype.curveCTo=n.prototype.curveC,n.prototype.smoothCTo=n.prototype.smoothC,n.prototype.curveQTo=n.prototype.curveQ,n.prototype.smoothQTo=n.prototype.smoothQ,n.prototype.arcTo=n.prototype.arc,g.extend(i.prototype,{reset:function(){return this._parts=[],this},string:function(t){return this._parts.push(["text",t]),this},span:function(t,e){return this._parts.push(["tspan",t,e]),this},ref:function(t,e){return this._parts.push(["tref",t,e]),this},path:function(t,e,n){return this._parts.push(["textpath",e,g.extend({href:t},n||{})]),this}}),g.fn.svg=function(t){var e=Array.prototype.slice.call(arguments,1);return"string"==typeof t&&"get"===t?g.svg["_"+t+"SVG"].apply(g.svg,[this[0]].concat(e)):this.each(function(){"string"==typeof t?g.svg["_"+t+"SVG"].apply(g.svg,[this].concat(e)):g.svg._attachSVG(this,t||{})})},g.svg=new t}(jQuery);