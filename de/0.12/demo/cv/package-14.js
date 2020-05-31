!function(){var e={dependsOn:{"qx.Class":{usage:"dynamic",require:!0},"cv.ui.structure.AbstractWidget":{require:!0},"cv.parser.WidgetParser":{defer:"runtime"},"qx.event.Timer":{},"cv.util.ScriptLoader":{defer:"runtime"},"cv.ui.structure.WidgetFactory":{defer:"runtime"}}};qx.Bootstrap.executePendingDefers(e);qx.Class.define("cv.plugins.Strftime",{extend:cv.ui.structure.AbstractWidget,properties:{format:{check:"String",init:"%c"},locale:{check:"String",nullable:!0}},statics:{__elements:{},__internalCounter:0,__timer:null,parse:function(e,t,r,i){return cv.parser.WidgetParser.parseElement(this,e,t,r,i,this.getAttributeToPropertyMappings())},getAttributeToPropertyMappings:function(){return{lang:{target:"locale"},format:{default:"%c"}}},uniqid:function(){return this.__internalCounter++},startTimer:function(){this.__timer||(this.__timer=new qx.event.Timer(1e3));this.__timer.isEnabled()||this.__timer.start()}},members:{__timerStarted:!1,__valueElement:null,_getInnerDomString:function(){return'<div class="strftime_value"></div>'},getValueElement:function(){this.__valueElement||(this.__valueElement=this.getDomElement().querySelector(".strftime_value"));return this.__valueElement},_onDomReady:function(){cv.plugins.Strftime.startTimer();cv.plugins.Strftime.__timer.addListener("interval",this.__update,this)},__update:function(){var e=this.getValueElement(),t=new Date;t.locale=this.getLocale();e.innerText=t.strftime(this.getFormat())}},destruct:function(){cv.plugins.Strftime.__timer.removeListener("interval",this.__update,this)},defer:function(e){cv.util.ScriptLoader.getInstance().addStyles("plugins/strftime/strftime.css");cv.parser.WidgetParser.addHandler("strftime",e);cv.ui.structure.WidgetFactory.registerClass("strftime",e);Date.ext.locales.de={a:["So","Mo","Di","Mi","Do","Fr","Sa"],A:["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],b:["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],B:["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],c:"%a %d %b %Y %T %Z",p:["",""],P:["",""],x:"%d.%m.%Y",X:"%T"};Date.ext.locales.fr={a:["dim","lun","mar","mer","jeu","ven","sam"],A:["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],b:["jan","fév","mar","avr","mai","jun","jui","aoû","sep","oct","nov","déc"],B:["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],c:"%a %d %b %Y %T %Z",p:["",""],P:["",""],x:"%d.%m.%Y",X:"%T"}}});cv.plugins.Strftime.$$dbClassInfo=e}();qx.$$packageData[14]={locales:{},resources:{},translations:{}};
//# sourceMappingURL=package-14.js.map