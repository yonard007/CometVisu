!function(){var e={dependsOn:{"qx.Class":{usage:"dynamic",require:!0},"cv.ui.structure.AbstractWidget":{require:!0},"cv.ui.common.Refresh":{require:!0},"cv.ui.common.Update":{require:!0},"cv.parser.WidgetParser":{defer:"runtime"},"qx.event.Timer":{},"cv.IconHandler":{},"cv.util.ScriptLoader":{defer:"runtime"},"cv.ui.structure.WidgetFactory":{defer:"runtime"}}};qx.Bootstrap.executePendingDefers(e);qx.Class.define("cv.plugins.tr064.CallList",{extend:cv.ui.structure.AbstractWidget,include:[cv.ui.common.Refresh,cv.ui.common.Update],statics:{parse:function(e,t,n,i){var r=cv.parser.WidgetParser.parseElement(this,e,t,n,i,this.getAttributeToPropertyMappings());cv.parser.WidgetParser.parseFormat(e,t);cv.parser.WidgetParser.parseAddress(e,t);cv.parser.WidgetParser.parseRefresh(e,t);return r},getAttributeToPropertyMappings:function(){return{device:{},max:{transform:function(e){return+e}},columns:{default:"type;date;nameOrCaller;tam"},TAM:{default:"phone_answering"},TAMColor:{default:""},TAMwait:{default:"control_reload"},TAMwaitColor:{default:""},TAMplay:{default:"audio_play"},TAMplayColor:{default:""},TAMstop:{default:"phone_answering"},TAMstopColor:{default:""},typeIncoming:{default:"phone_call_in"},typeIncomingColor:{default:""},typeMissed:{default:"phone_missed_in"},typeMissedColor:{default:""},typeOutgoing:{default:"phone_call_out"},typeOutgoingColor:{default:""},typeActiveIncoming:{default:"phone_ring_in"},typeActiveIncomingColor:{default:""},typeRejectedIncoming:{default:"phone_call_end_in"},typeRejectedIncomingColor:{default:""},typeActiveOutgoing:{default:"phone_ring_out"},typeActiveOutgoingColor:{default:""},typeUnknown:{default:"text_question_mark"},typeUnknownColor:{default:""}}}},events:{tr064ListRefreshed:"qx.event.type.Event"},properties:{device:{check:"String",init:""},max:{check:"Number",init:0},columns:{check:"String"},TAM:{check:"String"},TAMColor:{check:"String"},TAMwait:{check:"String"},TAMwaitColor:{check:"String"},TAMplay:{check:"String"},TAMplayColor:{check:"String"},TAMstop:{check:"String"},TAMstopColor:{check:"String"},typeIncoming:{check:"String"},typeIncomingColor:{check:"String"},typeMissed:{check:"String"},typeMissedColor:{check:"String"},typeOutgoing:{check:"String"},typeOutgoingColor:{check:"String"},typeActiveIncoming:{check:"String"},typeActiveIncomingColor:{check:"String"},typeRejectedIncoming:{check:"String"},typeRejectedIncomingColor:{check:"String"},typeActiveOutgoing:{check:"String"},typeActiveOutgoingColor:{check:"String"},typeUnknown:{check:"String"},typeUnknownColor:{check:"String"}},members:{__P_22_0:"",__P_22_1:void 0,__P_22_2:!1,__P_22_3:{},_getInnerDomString:function(){this.refreshCalllist("initial");return'<div class="actor"><table class="TR064_calllist"><tr><td>Loading TR-064...</td></tr></table></div>'},_setupRefreshAction:function(){this._timer=new qx.event.Timer(this.getRefresh());this._timer.addListener("interval",function(){this.__P_22_2||this.refreshCalllist("timer")},this);this._timer.start()},_update:function(e,t){this.__P_22_2||this.refreshCalllist("update")},_displayCalllist:function(){var e=this,t=this.getDomElement().getElementsByClassName("TR064_calllist")[0],n=this.__P_22_0?this.__P_22_0.replace(/.*sid=/,""):"",i="",r={0:{name:this.getTypeUnknown(),color:this.getTypeUnknownColor()},1:{name:this.getTypeIncoming(),color:this.getTypeIncomingColor()},2:{name:this.getTypeMissed(),color:this.getTypeMissedColor()},3:{name:this.getTypeOutgoing(),color:this.getTypeOutgoingColor()},9:{name:this.getTypeActiveIncoming(),color:this.getTypeActiveIncomingColor()},10:{name:this.getTypeRejectedIncoming(),color:this.getTypeRejectedIncomingColor()},11:{name:this.getTypeActiveOutgoing(),color:this.getTypeActiveOutgoingColor()}};this.__P_22_1.forEach(function(t){var o="",c=t.Type in r?r[t.Type]:r[0];t.Path&&(o='<audio preload="none"><source src="resource/plugins/tr064/proxy.php?device='+e.getDevice()+"&uri="+t.Path+"%26sid="+n+'"></audio><div class="tam clickable">'+cv.IconHandler.getInstance().getIconText(e.getTAM(),"*","*",e.getTAMColor())+"</div>");i+="<tr>";e.getColumns().split(";").forEach(function(e){switch(e){case"type":i+="<td>"+cv.IconHandler.getInstance().getIconText(c.name,"*","*",c.color)+"</td>";break;case"date":i+="<td>"+t.Date+"</td>";break;case"name":i+="<td>"+t.Name+"</td>";break;case"caller":i+="<td>"+t.Caller+"</td>";break;case"nameOrCaller":""!==t.Name?i+="<td>"+t.Name+"</td>":i+="<td>"+t.Caller+"</td>";break;case"tam":i+="<td>"+o+"</td>"}});i+="</tr>"});t.innerHTML=i;for(var o=t.getElementsByClassName("tam"),c=0;c<o.length;c++)o[c].addEventListener("click",function(){e.__P_22_4(this)})},_getCallListURI:function(){var e=this,t="resource/plugins/tr064/soap.php?device="+this.getDevice()+"&location=upnp/control/x_contact&uri=urn:dslforum-org:service:X_AVM-DE_OnTel:1&fn=GetCallList";window.fetch(t).then(function(t){if(t.ok)return t.json();console.error('Error: reading URL "'+t.url+" failed with status "+t.status+": "+t.statusText);e.__P_22_0="<fail>"}).then(function(n){if("string"==typeof n){e.__P_22_0=n;e.refreshCalllist("getCallListURI")}else{console.error('Error: reading URL "'+t+" failed with content:",n);e.__P_22_0="<fail>"}})},refreshCalllist:function(e){this.__P_22_2=!0;if("<fail>"!==this.__P_22_0)if(""!==this.__P_22_0){var t=this,n="resource/plugins/tr064/proxy.php?device="+this.getDevice()+"&uri="+this.__P_22_0+"%26max="+this.getMax();window.fetch(n).then(function(e){if(e.ok)return e.text();console.error('Error: reading URL "'+e.url+" failed with status "+e.status+": "+e.statusText);return"<xml/>"}).then(function(e){return(new window.DOMParser).parseFromString(e,"text/xml")}).then(function(e){t.__P_22_1=[];for(var n=e.getElementsByTagName("Call"),i=0;i<n.length;i++){for(var r=n[i].children,o={},c=0;c<r.length;c++)o[r[c].nodeName]=r[c].textContent;t.__P_22_1.push(o)}t._displayCalllist();t.__P_22_2=!1;t.fireEvent("tr064ListRefreshed")}).catch(function(e){console.error("TR-064 refreshCalllist() error:",e)})}else this._getCallListURI()},__P_22_4:function(e){var t=this,n=e.previousElementSibling;if(!this.__P_22_3[n]){n.addEventListener("ended",function(){t.__P_22_5(e)});this.__P_22_3[n]=!0}n.readyState<4&&this.__P_22_6(e);if(n.paused){var i=n.play();void 0!==i&&i.then(function(){t.__P_22_7(e)}).catch(function(){})}else{n.pause();n.currentTime=0;this.__P_22_5(e)}},__P_22_6:function(e){e.innerHTML=cv.IconHandler.getInstance().getIconText(this.getTAMwait(),"*","*",this.getTAMwaitColor())},__P_22_7:function(e){e.innerHTML=cv.IconHandler.getInstance().getIconText(this.getTAMplay(),"*","*",this.getTAMplayColor())},__P_22_5:function(e){e.innerHTML=cv.IconHandler.getInstance().getIconText(this.getTAMstop(),"*","*",this.getTAMstopColor())}},defer:function(e){cv.util.ScriptLoader.getInstance().addStyles("plugins/tr064/tr064.css");cv.parser.WidgetParser.addHandler("calllist",cv.plugins.tr064.CallList);cv.ui.structure.WidgetFactory.registerClass("calllist",e)}});cv.plugins.tr064.CallList.$$dbClassInfo=e}();qx.$$packageData[17]={locales:{},resources:{},translations:{}};
//# sourceMappingURL=package-17.js.map