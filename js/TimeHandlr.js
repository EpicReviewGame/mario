function TimeHandlr(settings){"use strict";var version="1.0",time,events,cycles,className,onSpriteCycleStart,doSpriteCycleStart,cycleCheckValidity,timingDefault,addClass,removeClass;this.getTime=function(){return time;};this.getEvents=function(){return events;};var addEvent=this.addEvent=function(func,time_exec){if(!(func instanceof Function)){console.warn("Attempting to add an event that isn't a function.");console.log(arguments);return false;}
time_exec=time_exec||1;var args=arrayMake(arguments);args.splice(0,2);var event={func:func,time_exec:time+time_exec,time_repeat:time_exec,args:args,repeat:1};insertEvent(event,event.time_exec);return event;};var addEventInterval=this.addEventInterval=function(func,time_exec,num_repeats){if(!(func instanceof Function)){console.warn("Attempting to add an event that isn't a function.");console.log(arguments);return false;}
time_exec=time_exec||1;num_repeats=num_repeats||1;var args=arrayMake(arguments);args.splice(0,3);var event={func:func,time_exec:time+time_exec,time_repeat:time_exec,args:args,repeat:num_repeats};func.event=event;insertEvent(event,event.time_exec);return event;};var addEventIntervalSynched=this.addEventIntervalSynched=function(func,time_exec,num_repeats,me,settings){var calctime=time_exec*settings.length,entry=ceil(time/calctime)*calctime,scope=this,addfunc=function(scope,args,me){me.startcount=time;return addEventInterval.apply(scope,args);};time_exec=time_exec||1;num_repeats=num_repeats||1;if(entry==time){return addfunc(scope,arguments,me);}
else{var dt=entry-time;addEvent(addfunc,dt,scope,arguments,me);}};function insertEvent(event,time){if(!events[time])return events[time]=[event];events[time].push(event);return events[time];}
var clearEvent=this.clearEvent=function(event){if(!event)return;event.repeat=0;};var clearAllEvents=this.clearAllEvents=function(){events={};};var clearClassCycle=this.clearClassCycle=function(me,name){if(!me[cycles]||!me[cycles][name])return;var cycle=me[cycles][name];cycle[0]=false;cycle.length=false;delete me[cycles][name];};var clearAllCycles=this.clearAllCycles=function(me){var cycles=me[cycles],name,cycle;for(name in cycles){cycle=cycles[name];cycle[0]=false;cycle.length=1;delete cycles[name];}};var addSpriteCycle=this.addSpriteCycle=function(me,settings,name,timing){if(!me[cycles])me[cycles]={};clearClassCycle(me,name);var timingIsFunc=typeof(timing)=="function";name=name||0;var cycle=me[cycles][name]=setSpriteCycle(me,settings,timingIsFunc?0:timing);if(cycle.event&&timingIsFunc)
cycle.event.count_changer=timing;cycleClass(me,settings);return cycle;};var addSpriteCycleSynched=this.addSpriteCycleSynched=function(me,settings,name,timing){if(!me[cycles])me[cycles]={};clearClassCycle(me,name);name=name||0;var cycle=me[cycles][name]=setSpriteCycle(me,settings,timing,true);cycleClass(me,settings);return cycle;};function setSpriteCycle(me,settings,timing,synched){settings.loc=settings.oldclass=-1;var func=synched?addEventIntervalSynched:addEventInterval;me[onSpriteCycleStart]=function(){func(cycleClass,timing||timingDefault,Infinity,me,settings);};if(me[doSpriteCycleStart])
me[onSpriteCycleStart]();return settings;}
function cycleClass(me,settings){if(!me||!settings||!settings.length)return true;if(cycleCheckValidity!=null&&!me[cycleCheckValidity])return true;if(settings.oldclass!=-1&&settings.oldclass!=="")
removeClass(me,settings.oldclass);settings.loc=++settings.loc%settings.length;var current=settings[settings.loc];if(current){var name=current instanceof Function?current(me,settings):current;if(typeof(name)=="string"){settings.oldclass=name;addClass(me,name);return false;}
else return(name===false);}
else return(current===false);}
this.handleEvents=function(){++time;var events_current=events[time];if(!events_current)return;var event,len,i;for(i=0,len=events_current.length;i<len;++i){event=events_current[i];if(event.repeat>0&&!event.func.apply(this,event.args)){if(event.count_changer)event.count_changer(event);if(event.repeat instanceof Function){if((event.repeat.bind(event))()){event.count+=event.time_repeat;insertEvent(event,event.time_exec);}}
else if(--event.repeat>0){event.time_exec+=event.time_repeat;insertEvent(event,event.time_exec);}}}
delete events[time];};function arrayMake(args){return Array.prototype.slice.call(args);}
function classAdd(me,strin){me.className+=" "+strin;}
function classRemove(me,strout){me.className=me.className.replace(new RegExp(" "+strout,"gm"),"");}
var ceil=Math.ceil;function reset(settings){time=settings.time||0;events=settings.events||{};cycles=settings.cycles||"cycles";className=settings.className||"className";onSpriteCycleStart=settings.onSpriteCycleStart||"onSpriteCycleStart";doSpriteCycleStart=settings.doSpriteCycleStart||"doSpriteCycleStart";cycleCheckValidity=settings.cycleCheckValidity;timingDefault=settings.timingDefault||7;addClass=settings.addClass||window.addClass||classAdd;removeClass=settings.removeClass||window.removeClass||classRemove;}
reset(settings||{});}
