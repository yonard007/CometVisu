!function(){var t={dependsOn:{"qx.Class":{usage:"dynamic",require:!0},"cv.ui.structure.AbstractWidget":{require:!0},"cv.ui.common.Refresh":{require:!0},"cv.ui.common.Update":{require:!0},"cv.ui.common.Operate":{require:!0},"cv.parser.WidgetParser":{defer:"runtime"},"qx.util.Uri":{},"qx.event.Timer":{},"qx.event.message.Bus":{},"cv.Config":{},"cv.util.String":{},"cv.ui.PopupHandler":{},"cv.util.Tree":{},"qx.event.Registration":{},"cv.data.Model":{},"cv.TemplateEngine":{},"cv.Transform":{},"qx.io.request.Xhr":{},"qx.util.ResourceManager":{},"qx.dom.Element":{},"cv.util.ScriptLoader":{defer:"runtime"},"cv.ui.structure.WidgetFactory":{defer:"runtime"}}};qx.Bootstrap.executePendingDefers(t);qx.Class.define("cv.plugins.RssLog",{extend:cv.ui.structure.AbstractWidget,include:[cv.ui.common.Refresh,cv.ui.common.Update,cv.ui.common.Operate],properties:{src:{check:"String",nullable:!0,transform:"normalizeUrl",apply:"_applySrc"},filter:{check:"String",nullable:!0},datetime:{check:"Boolean",init:!0},mode:{check:"String",init:"last"},limit:{check:"Number",init:0},timeformat:{check:"String",nullable:!0},itemoffset:{check:"Number",init:0},itemack:{check:["modify","display","disable"],init:"modify"},future:{check:"String",nullable:!0},width:{check:"String",nullable:!0},height:{check:"String",nullable:!0},model:{check:"qx.data.Array",nullable:!0,apply:"_applyModel"}},statics:{parse:function(t,e,s,i){var r=cv.parser.WidgetParser.parseElement(this,t,e,s,i,this.getAttributeToPropertyMappings());cv.parser.WidgetParser.parseFormat(t,e);cv.parser.WidgetParser.parseAddress(t,e);cv.parser.WidgetParser.parseRefresh(t,e);return r},getAttributeToPropertyMappings:function(){return{src:{},width:{},height:{},filter:{},datetime:{default:!0,transform:function(t){return"boolean"==typeof t?t:"true"===t}},mode:{default:"last"},limit:{default:0,transform:parseFloat},timeformat:{},itemack:{default:"modify"},future:{},query:{}}}},members:{__P_14_0:null,__P_14_1:null,__P_14_2:null,__P_14_3:null,__P_14_4:!1,__P_14_5:null,__P_14_6:null,__P_14_7:null,__P_14_8:null,normalizeUrl:function(t){this.__P_14_3={};if(t&&t.indexOf("?")>0){var e=qx.util.Uri.parseUri(t);t=t.substring(0,t.indexOf("?"));this.__P_14_3=e.queryKey}return t},_applySrc:function(t){this.__P_14_4=!t.match(/rsslog\.php/)&&!t.match(/rsslog_mysql\.php/)&&!t.match(/rsslog_oh\.php/)},_getInnerDomString:function(){var t="";this.getWidth()&&(t+="width:"+this.getWidth()+";");this.getHeight()&&(t+="height:"+this.getHeight());return'<div class="actor rsslogBody"><div class="rsslog_inline" id="rss_'+this.getPath()+'" style="'+t+'"></div></div>'},_setupRefreshAction:function(){this._timer=new qx.event.Timer(this.getRefresh());this._timer.addListener("interval",function(){this.refreshRSSlog()},this);this._timer.start()},_onDomReady:function(){if(!this.$$domReady){cv.plugins.RssLog.prototype._onDomReady.base.call(this);qx.event.message.Bus.subscribe("path."+this.getParentPage().getPath()+".beforePageChange",this.refreshRSSlog,this);this.__P_14_1='<span class="mappedValue"></span><span>{text}</span>';this.getDatetime()&&(this.__P_14_1="{date}: "+this.__P_14_1);this.__P_14_2="li";cv.Config.currentPageId===this.getParentPage().getPath()&&this.refreshRSSlog()}},_update:function(){this.refreshRSSlog()},_action:function(){var t=cv.util.String.htmlStringToDomElement('<div class="rsslog_popup" id="rss_'+this.getPath()+'_big"/>'),e=document.querySelector("#"+this.getPath()+" .label"),s=e&&e.innerText||"",i=cv.ui.PopupHandler.showPopup("rsslog",{title:s,content:t}),r=cv.util.Tree.getParent(t,"div",null,1)[0];Object.entries({height:"90%",width:"90%",margin:"auto"}).forEach(function(t){r.style[t[0]]=t[1]});this._timer&&this._timer.stop();qx.event.Registration.addListener(t,"tap",function(t){t.stopPropagation()},this);qx.event.Registration.addListener(i,"close",function(){if(i.getCurrentDomElement()&&i.getCurrentDomElement().classList.contains("popup")&&"modify"===this.getItemack()){qx.event.Timer.once(function(){this.refreshRSSlog()},this,100);for(var t in this.getAddress())cv.data.Model.isWriteAddress(this.getAddress()[t])&&cv.TemplateEngine.getInstance().visu.write(t,cv.Transform.encode(this.getAddress()[t][0],0))}},this);i.getCurrentDomElement().querySelector(".main").style.overflow="auto";this.refreshRSSlog(!0)},refreshRSSlog:function(t){if(this.getSrc()){this.__P_14_0||(this.__P_14_4?this.__P_14_10():this.__P_14_9());this.__P_14_0.setUserData("big",t);this.__P_14_0 instanceof qx.io.request.Xhr?this.__P_14_0.send():this.__P_14_0 instanceof qx.data.store.Yql&&this.__P_14_0.reload();var e=this.getRefresh();void 0!==e&&e&&this._timer&&this._timer.isEnabled()&&this._timer.start()}else this.error("no src given, aborting RSS-Log refresh")},__P_14_9:function(){var t=this.getSrc(),e=Object.assign({},this.__P_14_3);this.getFilter()&&(e.f=this.getFilter());this.getLimit()&&(e.limit=this.getLimit());this.getFuture()&&(e.future=this.getFuture());e.j=1;this.__P_14_0=new qx.io.request.Xhr(qx.util.ResourceManager.getInstance().toUri(t));this.__P_14_0.set({accept:"application/json",requestData:e,method:"GET"});this.__P_14_0.addListener("success",this.__P_14_11,this);this.__P_14_0.addListener("error",function(e){this.error("C: #rss_%s, Error: %s, Feed: %s",this.getPath(),e.getTarget().getResponse(),t)},this)},__P_14_10:function(){if(!this.__P_14_0){this.__P_14_0=new qx.data.store.Yql("SELECT * FROM rss WHERE url='"+this.getSrc()+"'",{manipulateData:function(t){return t.query.results?t.query.results.item||t.query.results.entry:[]}});this.__P_14_0.bind("model",this,"model")}},_applyModel:function(t,e){e&&e.removeListener("change",this.__P_14_12,this);if(t){this.__P_14_12();t.addListener("change",this.__P_14_12,this)}},__P_14_13:function(t,e){e.innerHTML="";e.appendChild(t);var s=parseInt(e.dataset.last_rowcount,10)||0;t.innerHTML='<li class="rsslogRow odd" id="dummydiv">.</li>';var i=e.querySelector("#dummydiv"),r=i.getBoundingClientRect(),a=Math.round(r.bottom-r.top);i.parentNode.removeChild(i);if(0!==a){var n=e.parentNode.parentNode,_=n.getBoundingClientRect(),o=Math.round(_.bottom-_.top),l=n.querySelector(".label");if(l){var c=l.getBoundingClientRect();o-=Math.round(c.bottom-c.top)}s=Math.floor(o/a)}e.dataset.last_rowcount=s;return s},__P_14_11:function(t){var e=t.getTarget().getResponse();"string"!=typeof e?this.__P_14_14(e.responseData.feed.entries):this.error(e)},__P_14_12:function(){this.__P_14_14(this.getModel().toArray())},__P_14_14:function(t){var e=this.__P_14_0.getUserData("big"),s="#rss_"+this.getPath()+(!0===e?"_big":""),i=document.querySelector(s),r=!0===e?this.getItemack():"modify"===this.getItemack()?"display":this.getItemack();this.debug("ID: "+i.getAttribute("id")+", Feed: "+this.getSrc());var a=document.createElement("ul"),n=this.__P_14_13(a,i),_=t.length;this.debug("C: #"+this.getPath()+", "+_+" element(s) found, "+n+" displayrow(s) available");var o=0;if(_>n){"first"===this.getMode()&&(o=_-n);if("rollover"===this.getMode()){(o=parseInt(i.dataset.itemoffset,10)||0)===_&&(o=0);i.dataset.itemoffset=o+1}}var l="rsslogodd",c=o+n;c=c>_?_:c;this.__P_14_5=(new Date).strftime("%d");this.__P_14_6=!1;this.__P_14_8=!1;this.__P_14_7=!1;for(var h=o;h<c;h++){this.debug("C: #"+this.getPath()+", processing item: "+h+" of "+_);var d=h,u=t[d=h>=_?d-=_:d],g=this.__P_14_15(u,e),p=qx.dom.Element.create("li",{class:"rsslogRow "+l});p.innerHTML=g;if(u.mapping&&""!==u.mapping){var m=this.applyMapping("disable"===r?0:u.state,u.mapping),f=p.querySelector(".mappedValue"),P=this;this.defaultValue2DOM(m,function(t){P._applyValueToDom(f,t)})}if(this.__P_14_6&&0!==d){p.classList.add("rsslog_separator");this.__P_14_8=!0}else this.__P_14_8=!1;!0===this.__P_14_8&&p.classList.add("rsslog_prevday");this.__P_14_7&&p.classList.add("rsslogodd"===l?"rsslog_futureeven":"rsslog_futureodd");p.dataset.id=u.id;p.dataset.mapping=u.mapping;if(u.tags){var v=p.querySelector("span");Array.isArray(u.tags)?v.classList.add.apply(v.classList,u.tags):v.classList.add(u.tags)}"1"===u.state&&"disable"!==r&&p.classList.add("rsslog_ack");"modify"===r&&qx.event.Registration.addListener(p,"tap",this._onTap,this);a.appendChild(p);l="rsslogodd"===l?"rsslogeven":"rsslogodd"}},__P_14_15:function(t,e){var s="";if(this.__P_14_4)return e?'<b><a href="'+t.getLink()+'">'+t.getTitle()+"</a></b><br/>"+t.getDescription():"<b>"+t.getTitle()+"</b><br/>"+t.getDescription();s=(s=this.__P_14_1).replace(/\{text\}/,t.content);var i=new Date(t.publishedDate);if(i){s=this.getTimeformat()?s.replace(/\{date\}/,i.strftime(this.getTimeformat())+"&nbsp;"):s.replace(/\{date\}/,i.toLocaleDateString()+" "+i.toLocaleTimeString()+"&nbsp;");var r=i.strftime("%d");this.__P_14_6=this.__P_14_5>0&&this.__P_14_5!==r;this.__P_14_5=r;this.__P_14_7=i>new Date}else s=s.replace(/\{date\}/,"");return s},_onTap:function(t){var e=t.getCurrentTarget(),s=e.dataset.id,i=e.dataset.mapping;e.classList.toggle("rsslog_ack");var r=+e.classList.contains("rsslog_ack");if(i&&""!==i){var a=this.applyMapping(r,i),n=e.querySelector(".mappedValue");n.innerHTML="";var _=this;this.defaultValue2DOM(a,function(t){_._applyValueToDom(n,t)})}var o=new qx.io.request.Xhr(this.__P_14_0.getUrl());o.set({method:"GET",requestData:Object.assign({},this.__P_14_3,{u:s,state:r}),accept:"application/json"});o.send()}},defer:function(t){cv.util.ScriptLoader.getInstance().addStyles("plugins/rsslog/rsslog.css");cv.parser.WidgetParser.addHandler("rsslog",cv.plugins.RssLog);cv.ui.structure.WidgetFactory.registerClass("rsslog",t)}});cv.plugins.RssLog.$$dbClassInfo=t}();qx.$$packageData[13]={locales:{},resources:{},translations:{}};
//# sourceMappingURL=package-13.js.map