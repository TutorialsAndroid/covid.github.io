
RGraph=window.RGraph||{isrgraph:true,isRGraph:true,rgraph:true};RGraph.SVG=RGraph.SVG||{};(function(win,doc,undefined)
{var RG=RGraph;RGraph.SVG.Gauge=function(conf)
{this.set=function(name,value)
{if(arguments.length===1&&typeof name==='object'){for(i in arguments[0]){if(typeof i==='string'){name=ret.name;value=ret.value;this.set(name,value);}}}else{var ret=RGraph.SVG.commonSetter({object:this,name:name,value:value});name=ret.name;value=ret.value;this.properties[name]=value;}
return this;};this.get=function(name)
{return this.properties[name];};this.type='gauge';this.innerMin=RGraph.SVG.stringsToNumbers(conf.innerMin);this.innerMax=RGraph.SVG.stringsToNumbers(conf.innerMax);this.outerMin=RGraph.SVG.stringsToNumbers(conf.outerMin);this.outerMax=RGraph.SVG.stringsToNumbers(conf.outerMax);this.value=RGraph.SVG.stringsToNumbers(conf.value);this.angleStart=0-RGraph.SVG.TRIG.HALFPI-(RGraph.SVG.TRIG.HALFPI/2);this.angleEnd=0+RGraph.SVG.TRIG.HALFPI+(RGraph.SVG.TRIG.HALFPI/2);this.angleSpan=this.angleEnd-this.angleStart;this.id=conf.id;this.uid=RGraph.SVG.createUID();this.container=document.getElementById(this.id);this.layers={};this.svg=RGraph.SVG.createSVG({object:this,container:this.container});this.isRGraph=true;this.isrgraph=true;this.rgraph=true;this.width=Number(this.svg.getAttribute('width'));this.height=Number(this.svg.getAttribute('height'));this.colorsParsed=false;this.originalColors={};this.gradientCounter=1;this.nodes={};this.shadowNodes=[];if(this.value>this.innerMax)this.value=this.innerMax;if(this.value<this.innerMin)this.value=this.innerMin;RGraph.SVG.OR.add(this);this.container.style.display='inline-block';this.properties={centerx:null,centery:null,radius:null,marginLeft:35,marginRight:35,marginTop:35,marginBottom:35,rmargin:null,backgroundFill:'Gradient(white:#FEFEFE:#E6E6E6:#dedede)',backgroundStroke:'#ddd',linewidth:1,colors:['black','black'],innerGap:5,tickmarksOuterSize:3,tickmarksInnerSize:3,tickmarksCount:10,textColor:'black',textFont:'Arial, Verdana, sans-serif',textSize:12,textBold:false,textItalic:false,labelsIngraph:true,labelsIngraphFont:null,labelsIngraphSize:null,labelsIngraphBold:null,labelsIngraphItalic:null,labelsIngraphColor:null,labelsIngraphUnitsPre:'',labelsIngraphUnitsPost:'',labelsIngraphThousand:',',labelsIngraphPoint:'.',labelsIngraphFormatter:null,labelsIngraphDecimals:0,labelsIngraphPadding:3,labelsIngraphBackground:'Gradient(#ddd:#eee)',labelsIngraphRounded:2,scaleInnerFont:null,scaleInnerSize:null,scaleInnerBold:null,scaleInnerItalic:null,scaleInnerColor:null,scaleInnerUnitsPre:'',scaleInnerUnitsPost:'',scaleInnerPoint:'.',scaleInnerThousand:',',scaleInnerDecimals:0,scaleInnerFormatter:null,scaleInnerLabelsCount:10,scaleInnerRound:false,scaleOuter:true,scaleOuterFont:null,scaleOuterSize:null,scaleOuterBold:null,scaleOuterItalic:null,scaleOuterColor:null,scaleOuterUnitsPre:'',scaleOuterUnitsPost:'',scaleOuterPoint:'.',scaleOuterThousand:',',scaleOuterDecimals:0,scaleOuterFormatter:null,scaleOuterLabelsCount:10,scaleOuterRound:false,shadow:false,shadowOffsetx:2,shadowOffsety:2,shadowOpacity:0.25,shadowBlur:2,title:'',titleX:null,titleY:null,titleHalign:'center',titleValign:'bottom',titleSize:null,titleColor:null,titleFont:null,titleBold:null,titleItalic:null,titleSubtitle:null,titleSubtitleSize:null,titleSubtitleColor:'#aaa',titleSubtitleFont:null,titleSubtitleBold:null,titleSubtitleItalic:null,needleColor:'#666',centerpinRadius:15,adjustable:false};RGraph.SVG.getGlobals(this);if(RGraph.SVG.FX&&typeof RGraph.SVG.FX.decorate==='function'){RGraph.SVG.FX.decorate(this);}
this.responsive=RGraph.SVG.responsive;var prop=this.properties;this.draw=function()
{RGraph.SVG.fireCustomEvent(this,'onbeforedraw');this.nodes={};this.width=Number(this.svg.getAttribute('width'));this.height=Number(this.svg.getAttribute('height'));RGraph.SVG.createDefs(this);this.graphWidth=this.width-prop.marginLeft-prop.marginRight;this.graphHeight=this.height-prop.marginTop-prop.marginBottom;this.centerx=(this.graphWidth/2)+prop.marginLeft;this.centery=(this.graphHeight/2)+prop.marginTop;this.radius=Math.min(this.graphWidth/2,this.graphHeight/2);this.centerx=typeof prop.centerx==='number'?prop.centerx:this.centerx;this.centery=typeof prop.centery==='number'?prop.centery:this.centery;this.radius=typeof prop.radius==='number'?prop.radius:this.radius;if(typeof prop.radius==='string'&&prop.radius.match(/^\+|-\d+$/))this.radius+=parseFloat(prop.radius);if(typeof prop.centerx==='string'&&prop.centerx.match(/^\+|-\d+$/))this.centery+=parseFloat(prop.centerx);if(typeof prop.centery==='string'&&prop.centery.match(/^\+|-\d+$/))this.centerx+=parseFloat(prop.centery);RGraph.SVG.resetColorsToOriginalValues({object:this});this.parseColors();if(prop.rmargin===null){if(prop.scaleOuter){prop.rmargin=40;}else{prop.rmargin=25;}}
this.drawMeter();this.drawNeedle();if(prop.labelsIngraph){this.drawIngraph();}
RGraph.SVG.drawTitle(this);if(prop.adjustable){this.adjusting_mousedown=false;var obj=this;var func=function(e)
{var div=e.currentTarget,mouseX=e.offsetX,mouseY=e.offsetY;if(RGraph.SVG.ISFF){mouseX=e.pageX-e.currentTarget.offsetLeft;mouseY=e.pageY-e.currentTarget.offsetTop;}
var radius=RGraph.SVG.TRIG.getHypLength({x1:mouseX,y1:mouseY,x2:obj.centerx,y2:obj.centery,object:obj});if(radius>obj.radius){return;}
var value=obj.getValue(e);obj.value=value;obj.drawNeedle();};this.container.addEventListener('mousedown',function(e)
{obj.adjusting_mousedown=true;func(e);},false);this.container.addEventListener('mousemove',function(e)
{if(obj.adjusting_mousedown){func(e);}},false);window.addEventListener('mouseup',function(e)
{obj.adjusting_mousedown=false;},false);}
RGraph.SVG.fireCustomEvent(this,'ondraw');return this;};this.drawMeter=function()
{this.scaleInner=RGraph.SVG.getScale({object:this,numlabels:prop.scaleInnerLabelsCount,unitsPre:prop.scaleInnerUnitsPre,unitsPost:prop.scaleInnerUnitsPost,max:this.innerMax,min:this.innerMin,point:prop.scaleInnerPoint,round:prop.scaleInnerRound,thousand:prop.scaleInnerThousand,decimals:prop.scaleInnerDecimals,strict:true,formatter:prop.scaleInnerFormatter});this.scaleOuter=RGraph.SVG.getScale({object:this,numlabels:prop.scaleOuterLabelsCount,unitsPre:prop.scaleOuterUnitsPre,unitsPost:prop.scaleOuterUnitsPost,max:this.outerMax,min:this.outerMin,point:prop.scaleOuterPoint,round:prop.scaleOuterRound,thousand:prop.scaleOuterThousand,decimals:prop.scaleOuterDecimals,strict:true,formatter:prop.scaleOuterFormatter});if(prop.shadow){RGraph.SVG.setShadow({object:this,offsetx:prop.shadowOffsetx,offsety:prop.shadowOffsety,blur:prop.shadowBlur,opacity:prop.shadowOpacity,id:'dropShadow'});}
this.nodes.background=RGraph.SVG.create({svg:this.svg,type:'circle',parent:this.svg.all,attr:{cx:this.centerx,cy:this.centery,r:this.radius,stroke:prop.backgroundStroke,fill:prop.backgroundFill,filter:prop.shadow?'url(#dropShadow)':''}});this.nodes.innerAxisGroup=RGraph.SVG.create({svg:this.svg,type:'g',parent:this.svg.all,attr:{id:'innerAxisGroup',}});this.nodes.outerAxisGroup=RGraph.SVG.create({svg:this.svg,type:'g',parent:this.svg.all,attr:{id:'outerAxisGroup',}});var innerPath=RGraph.SVG.TRIG.getArcPath3({cx:this.centerx,cy:this.centery,r:this.radius-prop.innerGap-prop.rmargin,start:this.angleStart,end:this.angleEnd,anticlockwise:false,lineto:false});var inner=RGraph.SVG.create({svg:this.svg,type:'path',parent:this.nodes.innerAxisGroup,attr:{d:innerPath,stroke:prop.colors[1],fill:'transparent','stroke-width':prop.linewidth}});var outerPath=RGraph.SVG.TRIG.getArcPath3({cx:this.centerx,cy:this.centery,r:this.radius-prop.rmargin,start:this.angleStart,end:this.angleEnd,anticlockwise:false,lineto:false});var outer=RGraph.SVG.create({svg:this.svg,type:'path',parent:this.nodes.outerAxisGroup,attr:{d:outerPath,stroke:prop.colors[0],fill:'transparent','stroke-width':prop.linewidth}});this.nodes.outerAxis=outerPath;this.nodes.innerAxis=innerPath;var numticks=prop.tickmarksCount,gap=this.angleSpan/numticks,numlabels=prop.tickmarksCount;for(var i=0;i<=numticks;++i){if(prop.scaleOuter){var path_a=RGraph.SVG.TRIG.getArcPath3({cx:this.centerx,cy:this.centery,r:this.radius-prop.rmargin,start:this.angleStart+(i*gap),end:this.angleStart+(i*gap),anticlockwise:false,lineto:false});var path_b=RGraph.SVG.TRIG.getArcPath3({cx:this.centerx,cy:this.centery,r:this.radius+prop.tickmarksOuterSize-prop.rmargin,start:this.angleStart+(i*gap),end:this.angleStart+(i*gap),anticlockwise:false,lineto:true});RGraph.SVG.create({svg:this.svg,type:'path',parent:this.nodes.outerAxisGroup,attr:{d:path_a+' '+path_b,stroke:prop.colors[0],fill:'transparent','stroke-width':prop.linewidth,'stroke-linecap':'square'}});var outerLabelGap=(this.angleEnd-this.angleStart)/prop.scaleOuterLabelsCount;var coords=RGraph.SVG.TRIG.toCartesian({cx:this.centerx,cy:this.centery,r:this.radius+prop.tickmarksOuterSize+10-prop.rmargin,angle:this.angleStart-RGraph.SVG.TRIG.HALFPI+(i*outerLabelGap)});var halign=(coords.x>this.centerx?'left':'right');if(i/numlabels===0.5){halign='center';}
var zerolabel=RGraph.SVG.numberFormat({object:this,prepend:prop.scaleOuterUnitsPre,append:prop.scaleOuterUnitsPost,num:this.outerMin.toFixed(prop.scaleOuterDecimals),point:prop.scaleOuterPoint,thousand:prop.scaleOuterThousand});if(typeof prop.scaleOuterFormatter==='function'){zerolabel=(prop.scaleOuterFormatter)(zerolabel);}
var textnode=RGraph.SVG.text({object:this,svg:this.svg,parent:this.nodes.outerAxisGroup,tag:'scale.outer',text:(i===0?zerolabel:this.scaleOuter.labels[i-1]),x:coords.x,y:coords.y,halign:halign,valign:'center',padding:2,size:typeof prop.scaleOuterSize==='number'?prop.scaleOuterSize:prop.textSize,color:prop.scaleOuterColor||prop.textColor,bold:typeof prop.scaleOuterBold==='boolean'?prop.scaleOuterBold:prop.textBold,italic:typeof prop.scaleOuterItalic==='boolean'?prop.scaleOuterItalic:prop.textItalic,font:prop.scaleOuterFont||prop.textFont});textnode.style.pointerEvents='none';}else{var path_a=RGraph.SVG.TRIG.getArcPath3({cx:this.centerx,cy:this.centery,r:this.radius-prop.rmargin,start:this.angleStart,end:this.angleStart,anticlockwise:false,lineto:false});var path_b=RGraph.SVG.TRIG.getArcPath3({cx:this.centerx,cy:this.centery,r:this.radius-prop.innerGap-prop.rmargin,start:this.angleStart,end:this.angleStart,anticlockwise:false,lineto:true});RGraph.SVG.create({svg:this.svg,type:'path',parent:this.nodes.innerAxisGroup,attr:{d:path_a+path_b,stroke:prop.colors[1],fill:'transparent','stroke-width':prop.linewidth,'stroke-linecap':'square'}});var path_a=RGraph.SVG.TRIG.getArcPath3({cx:this.centerx,cy:this.centery,r:this.radius-prop.rmargin,start:this.angleEnd,end:this.angleEnd,anticlockwise:false,lineto:false});var path_b=RGraph.SVG.TRIG.getArcPath3({cx:this.centerx,cy:this.centery,r:this.radius-prop.innerGap-prop.rmargin,start:this.angleEnd,end:this.angleEnd,anticlockwise:false,lineto:true});RGraph.SVG.create({svg:this.svg,type:'path',parent:this.nodes.innerAxisGroup,attr:{d:path_a+path_b,stroke:prop.colors[1],fill:'transparent','stroke-width':prop.linewidth,'stroke-linecap':'square'}});}
var path_a=RGraph.SVG.TRIG.getArcPath3({cx:this.centerx,cy:this.centery,r:this.radius-prop.rmargin-prop.innerGap,start:this.angleStart+(i*gap),end:this.angleStart+(i*gap),anticlockwise:false,lineto:false});var path_b=RGraph.SVG.TRIG.getArcPath3({cx:this.centerx,cy:this.centery,r:this.radius-prop.innerGap-prop.tickmarksOuterSize-prop.rmargin,start:this.angleStart+(i*gap),end:this.angleStart+(i*gap),anticlockwise:false,lineto:true});RGraph.SVG.create({svg:this.svg,type:'path',parent:this.nodes.innerAxisGroup,attr:{d:path_a+' '+path_b,stroke:prop.colors[1],fill:'transparent','stroke-width':prop.linewidth,'stroke-linecap':'square'}});var innerLabelGap=(this.angleEnd-this.angleStart)/prop.scaleInnerLabelsCount;var coords=RGraph.SVG.TRIG.toCartesian({cx:this.centerx,cy:this.centery,r:this.radius-prop.innerGap-prop.tickmarksInnerSize-10-prop.rmargin,angle:this.angleStart-RGraph.SVG.TRIG.HALFPI+(i*innerLabelGap)});var halign=(coords.x>this.centerx?'right':'left');var zerolabel=RGraph.SVG.numberFormat({object:this,prepend:prop.scaleInnerUnitsPre,append:prop.scaleInnerUnitsPost,num:this.innerMin.toFixed(prop.scaleInnerDecimals),point:prop.scaleInnerPoint,thousand:prop.scaleInnerThousand});if(typeof prop.scaleInnerFormatter==='function'){zerolabel=(prop.scaleInnerFormatter)(zerolabel);}
if(coords.x>(this.centerx-2)&&coords.x<(this.centerx+2)){halign='center';}
RGraph.SVG.text({object:this,svg:this.svg,parent:this.nodes.innerAxisGroup,tag:'scale.inner',text:(i===0?zerolabel:this.scaleInner.labels[i-1]),x:coords.x,y:coords.y,halign:halign,valign:'center',padding:2,size:typeof prop.scaleInnerSize==='number'?prop.scaleInnerSize:prop.textSize,color:prop.scaleInnerColor||prop.textColor,bold:typeof prop.scaleInnerBold==='boolean'?prop.scaleInnerBold:prop.textBold,italic:typeof prop.scaleInnerItalic==='boolean'?prop.scaleInnerItalic:prop.textItalic,font:prop.scaleInnerFont||prop.textFont});}};this.drawIngraph=function()
{if(this.nodes.labelsIngraphGroup){this.nodes.labelsIngraphGroup.parentNode.removeChild(this.nodes.labelsIngraphGroup);}
this.nodes.labelsIngraphGroup=RGraph.SVG.create({svg:this.svg,type:'g',parent:this.svg.all,attr:{id:'labelsIngraphGroup',}});this.nodes.labelsIngraph=RGraph.SVG.text({object:this,parent:this.nodes.labelsIngraphGroup,text:RGraph.SVG.numberFormat({prepend:prop.labelsIngraphUnitsPre,append:prop.labelsIngraphUnitsPost,point:prop.labelsIngraphPoint,thousand:prop.labelsIngraphThousand,formatter:prop.labelsIngraphFormatter,num:this.value.toFixed(prop.labelsIngraphDecimals)}),x:this.centerx,y:this.centery+this.radius-prop.rmargin-30,background:prop.labelsIngraphBackground,backgroundRounded:prop.labelsIngraphRounded,padding:prop.labelsIngraphPadding,halign:'center',valign:'center',size:typeof prop.labelsIngraphSize==='number'?prop.labelsIngraphSize:prop.textSize+2,bold:typeof prop.labelsIngraphBold==='boolean'?prop.labelsIngraphBold:prop.textBold,italic:typeof prop.labelsIngraphItalic==='boolean'?prop.labelsIngraphItalic:prop.textItalic,font:prop.labelsIngraphFont||prop.textFont,color:prop.labelsIngraphColor||prop.textColor});var rect=this.nodes.labelsIngraph.previousSibling;rect.setAttribute('stroke','#aaa');var func=function(e){e.stopPropagation();};rect.addEventListener('mousedown',func,false);this.nodes.labelsIngraph.addEventListener('mousedown',func,false);};this.drawNeedle=function()
{if(this.nodes.needleGroup){this.nodes.needleGroup.parentNode.removeChild(this.nodes.needleGroup);}
this.nodes.needleGroup=RGraph.SVG.create({svg:this.svg,type:'g',parent:this.svg.all,attr:{id:'needle-group',fill:prop.needleColor,stroke:prop.needleColor}});var angle=(this.value-this.innerMin)/(this.innerMax-this.innerMin)*this.angleSpan;angle+=RGraph.SVG.TRIG.HALFPI+(RGraph.SVG.TRIG.HALFPI/2);var coords=RGraph.SVG.TRIG.toCartesian({cx:this.centerx,cy:this.centery,r:this.radius-60,angle:angle});var coords2=RGraph.SVG.TRIG.toCartesian({cx:this.centerx,cy:this.centery,r:prop.centerpinRadius,angle:angle-RGraph.SVG.TRIG.HALFPI});var coords3=RGraph.SVG.TRIG.toCartesian({cx:this.centerx,cy:this.centery,r:prop.centerpinRadius,angle:angle+RGraph.SVG.TRIG.HALFPI});RGraph.SVG.create({svg:this.svg,type:'path',parent:this.nodes.needleGroup,attr:{'stroke-width':1,'stroke-linecap':"round",d:'M{1} {2} L{3} {4} L{5} {6} z'.format(coords.x,coords.y,coords2.x,coords2.y,coords3.x,coords3.y)}});RGraph.SVG.create({svg:this.svg,type:'circle',parent:this.nodes.needleGroup,attr:{cx:this.centerx,cy:this.centery,r:prop.centerpinRadius}});if(prop.labelsIngraph){this.drawIngraph();}};this.parseColors=function()
{if(!Object.keys(this.originalColors).length){this.originalColors={colors:RGraph.SVG.arrayClone(prop.colors),backgroundFill:RGraph.SVG.arrayClone(prop.backgroundFill),backgroundStroke:RGraph.SVG.arrayClone(prop.backgroundStroke),labelsIngraphBackground:RGraph.SVG.arrayClone(prop.labelsIngraphBackground)}}
prop.backgroundFill=RGraph.SVG.parseColorLinear({object:this,color:prop.backgroundFill,start:prop.marginTop,end:this.height-prop.marginBottom,direction:'vertical'});prop.backgroundStroke=RGraph.SVG.parseColorLinear({object:this,color:prop.backgroundStroke,start:prop.marginTop,end:this.height-prop.marginBottom,direction:'vertical'});prop.labelsIngraphBackground=RGraph.SVG.parseColorLinear({object:this,color:prop.labelsIngraphBackground,direction:'vertical',gradientUnits:'objectBoundingBox'});};this.getValue=function(e)
{var mouseX=e.offsetX,mouseY=e.offsetY;if(RGraph.SVG.ISFF){mouseX=e.pageX-e.currentTarget.offsetLeft;mouseY=e.pageY-e.currentTarget.offsetTop;}
var angle=RGraph.SVG.TRIG.getAngleByXY({cx:this.centerx,cy:this.centery,x:mouseX,y:mouseY});if(mouseX<this.centerx){angle=angle-RGraph.SVG.TRIG.TWOPI;}
var value=((angle-this.angleStart)/(this.angleEnd-this.angleStart));value=value*(this.innerMax-this.innerMin);value=value+this.innerMin;if(value<this.innerMin)value=this.innerMin;if(value>this.innerMax)value=this.innerMax;return value;};this.on=function(type,func)
{if(type.substr(0,2)!=='on'){type='on'+type;}
RGraph.SVG.addCustomEventListener(this,type,func);return this;};this.exec=function(func)
{func(this);return this;};for(i in conf.options){if(typeof i==='string'){this.set(i,conf.options[i]);}}};return this;})(window,document);