"use client";

import { useState, useMemo, useEffect } from "react";

// GCX base URL for deep links
var GCX="https://highnote.guidecx.com/app/projects/";
var FT=[
  {id:"f1",title:"HN / Remodel: Sync",date:"Feb 17",pm:"Joe Benscoter",actions:["Joe: build pitch deck, submit to CRB by EOW","Remodel: begin policy submissions by Feb 20","Kevin Ruan: start API integration review"]},
  {id:"f2",title:"HN / Runa: Sync",date:"Feb 17",pm:"Joe Benscoter",actions:["Joe: confirm go-live date with sponsor bank","Runa: complete final UAT sign-off"]},
  {id:"f3",title:"HN / Remodel: Sync",date:"Feb 10",pm:"Joe Benscoter",actions:["Joe: send scope doc for sign-off","Remodel: review Themis getting started guide"]},
  {id:"f4",title:"HN / Runa: Sync",date:"Feb 10",pm:"Joe Benscoter",actions:["Highnote: complete testing wind down by Feb 17","Runa: confirm reward tiers"]},
  {id:"f5",title:"HN / APMEX: Sync",date:"Feb 9",pm:"Joe Benscoter",actions:["APMEX: prioritize 12 outstanding policies","Joe: follow up on BIN request","Bank package target: Feb 11"]},
];

var SC={ON_TIME:"#16a34a",LATE:"#dc2626",ON_HOLD:"#d97706"};var SL={ON_TIME:"On Time",LATE:"Late",ON_HOLD:"On Hold"};
var RC={CUSTOMER:"#16a34a",INTERNAL:"#0d9488",THIRD_PARTY:"#d97706",MIXED:"#78756d"};var RL={CUSTOMER:"Subscriber",INTERNAL:"Internal",THIRD_PARTY:"3rd Party",MIXED:"Mixed"};

// Highnote mark - the three dots logo rendered as clean circles
function HNMark(props){var s=props.size||24;return <svg width={s} height={s} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#55F5A3"/><circle cx="54" cy="45" r="6.3" fill="#000"/><circle cx="35" cy="56" r="6.3" fill="#000"/><circle cx="67" cy="63" r="6.3" fill="#000"/></svg>;}
function isOD(t){return t.due&&(t.due.indexOf("!!")>=0||t.due.indexOf("overdue")>=0);}
function groupByMS(tasks){var g={},o=[];tasks.forEach(function(t){var k=t.m||null;if(!g[k]){g[k]=[];o.push(k);}g[k].push(t);});return o.map(function(k){return{ms:k,tasks:g[k]};});}
function hasMS(tasks){return tasks.some(function(t){return t.m;});}
// Active milestone map (updated when live data loads)
var _activeMsMap = {};
function taskUrl(pid,tid,mname){var mid=_activeMsMap&&_activeMsMap[pid]&&_activeMsMap[pid][mname]||"";return pid&&tid?GCX+pid+"/plan?edit-task=true&task-id="+tid+(mid?"&milestone-id="+mid:"")+"&task-tab=details":null;}
function projUrl(pid){return pid?GCX+pid+"/overview":null;}

// External link icon (inline SVG as text)
function ExtIcon(props){return <svg width={props.size||10} height={props.size||10} viewBox="0 0 12 12" fill="none" style={{display:"inline",verticalAlign:"middle",marginLeft:4,opacity:0.5}}><path d="M4.5 1.5H2.5C1.95 1.5 1.5 1.95 1.5 2.5v7c0 .55.45 1 1 1h7c.55 0 1-.45 1-1V7.5M7.5 1.5h3v3M5 7l5.5-5.5" stroke={props.color||"currentColor"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;}

function Badge(props){return <span style={{background:props.c+"18",color:props.c,fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20,whiteSpace:"nowrap"}}>{props.label}</span>;}
function Pill(props){return <span style={{background:props.c+"15",color:props.c,fontSize:10,fontWeight:600,padding:"2px 7px",borderRadius:4}}>{props.label}</span>;}

function Metric(props){var glowColor=props.color||"#16a34a";return <div style={{background:"#ffffff",border:"1px solid #E2E0D6",borderRadius:16,padding:"22px 24px",flex:1,minWidth:140,boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
  <div style={{color:"#78756d",fontSize:10,fontWeight:600,letterSpacing:1.5,textTransform:"uppercase",marginBottom:8}}>{props.label}</div>
  <div style={{color:props.color||"#1a1a1a",fontSize:32,fontWeight:700,lineHeight:1,fontFamily:"monospace"}}>{props.value}</div>
  {props.sub&&<div style={{color:"#9c9789",fontSize:11,marginTop:6}}>{props.sub}</div>}
</div>;}

function TLine(props){var t=props.task;var pid=props.pid;var od=isOD(t);var dc=t.s==="DONE"?"#16a34a":t.s==="STUCK"||od?"#d97706":"#16a34a";
  var url=taskUrl(pid,t.tid,t.m);
  var nameEl=url?<a href={url} target="_blank" rel="noopener noreferrer" style={{flex:1,color:"#1a1a1a",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",textDecoration:"none"}} onMouseEnter={function(e){e.currentTarget.style.color="#16a34a";e.currentTarget.style.textDecoration="underline"}} onMouseLeave={function(e){e.currentTarget.style.color="#1a1a1a";e.currentTarget.style.textDecoration="none"}}>{t.n}<ExtIcon color="#16a34a"/></a>:<span style={{flex:1,color:"#1a1a1a",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.n}</span>;
  return <div style={{display:"flex",alignItems:"center",gap:8,padding:"3px 0",fontSize:13}}>
    <span style={{width:7,height:7,borderRadius:"50%",flexShrink:0,background:dc}}/>
    {nameEl}
    {t.r&&<Pill label={RL[t.r]||t.r} c={RC[t.r]||"#94a3b8"}/>}
    {t.a&&<span style={{color:"#78756d",fontSize:11,flexShrink:0}}>{t.a}</span>}
    {(t.due||t.date)&&<span style={{fontSize:11,fontFamily:"monospace",color:od?"#dc2626":"#78756d",flexShrink:0}}>{(t.due||t.date).replace(/ !!/g,"")}</span>}
  </div>;}

function TList(props){var tasks=props.tasks;var pid=props.pid;
  if(!tasks||tasks.length===0)return <div style={{color:"#78756d",fontSize:13,padding:"8px 0"}}>No tasks.</div>;
  if(!hasMS(tasks))return <div>{tasks.map(function(t,i){return <TLine key={i} task={t} pid={pid}/>;})}</div>;
  var groups=groupByMS(tasks);
  return <div>{groups.map(function(g,gi){return <div key={gi} style={{marginBottom:gi<groups.length-1?10:0}}>
    {g.ms&&<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4,marginTop:gi>0?6:0}}>
      <span style={{color:"#16a34a",fontSize:7}}>&#9670;</span>
      <span style={{color:"#9c9789",fontSize:11,fontWeight:600,textTransform:"uppercase",letterSpacing:0.8}}>{g.ms}</span>
      <span style={{flex:1,borderBottom:"1px solid #E2E0D6"}}/>
      <span style={{color:"#78756d",fontSize:10,fontFamily:"monospace"}}>{g.tasks.length}</span>
    </div>}
    {g.tasks.map(function(t,i){return <TLine key={i} task={t} pid={pid}/>;})}</div>;})}</div>;}

function PCard(props){var p=props.proj;var mode=props.mode||"full";
  var _a=useState(props.startOpen||false),open=_a[0],setOpen=_a[1];
  var _b=useState(props.initTab||"all"),sub=_b[0],setSub=_b[1];
  var rsk=(p.risk||[]);
  var stk=p.stuck.length,odW=rsk.length;
  var isFull=mode==="full";
  var fixedTasks=mode==="risk"?[].concat(p.stuck,rsk):mode==="done"?p.done:mode==="up"?p.up:null;
  var fixedCount=fixedTasks?fixedTasks.length:0;
  var total=isFull?p.done.length+p.stuck.length+rsk.length+p.wip.length+p.up.length:fixedCount;
  var has=total>0;
  var subs=isFull?[{id:"all",l:"All",ct:p.done.length+p.stuck.length+rsk.length+p.wip.length+p.up.length},{id:"stuck",l:"Stuck",ct:stk},{id:"risk",l:"At Risk",ct:rsk.length},{id:"wip",l:"In Progress",ct:p.wip.length},{id:"done",l:"Done (7d)",ct:p.done.length},{id:"up",l:"Upcoming",ct:p.up.length}].filter(function(s){return s.ct>0;}):null;
  var vis=fixedTasks?fixedTasks:sub==="stuck"?p.stuck:sub==="risk"?rsk:sub==="wip"?p.wip:sub==="done"?p.done:sub==="up"?p.up:[].concat(p.stuck,rsk,p.wip,p.up,p.done);
  var pUrl=projUrl(p.pid);
  return <div style={{background:"#ffffff",border:"1px solid #E2E0D6",borderRadius:16,marginBottom:10,overflow:"hidden",borderLeft:"4px solid "+(SC[p.status]||"#16a34a"),boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
    <div style={{padding:"14px 18px",display:"flex",alignItems:"center",gap:12,userSelect:"none"}}>
      {has&&<span onClick={function(){setOpen(!open)}} style={{color:"#78756d",fontSize:10,transition:"transform 0.15s",transform:open?"rotate(90deg)":"rotate(0)",cursor:"pointer",padding:"4px"}}>&#9654;</span>}
      <div style={{flex:1,minWidth:0,cursor:has?"pointer":"default"}} onClick={function(){if(has)setOpen(!open)}}>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          {pUrl?<a href={pUrl} target="_blank" rel="noopener noreferrer" style={{color:"#1a1a1a",fontSize:14,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",textDecoration:"none"}} onClick={function(e){e.stopPropagation()}} onMouseEnter={function(e){e.currentTarget.style.color="#16a34a";e.currentTarget.style.textDecoration="underline"}} onMouseLeave={function(e){e.currentTarget.style.color="#1a1a1a";e.currentTarget.style.textDecoration="none"}}>{p.name}<ExtIcon color="#16a34a" size={11}/></a>:<span style={{color:"#1a1a1a",fontSize:14,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name}</span>}
        </div>
        <div style={{color:"#78756d",fontSize:11,marginTop:2}}>PM: {p.pm}{!isFull&&has?<span style={{color:"#9c9789"}}>{" · "+total+" task"+(total!==1?"s":"")}</span>:""}</div>
      </div>
      {isFull&&<div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0,flexWrap:"wrap",justifyContent:"flex-end"}}>
        {stk>0&&<Badge label={stk+" stuck"} c="#dc2626"/>}{odW>0&&<Badge label={odW+" overdue"} c="#d97706"/>}{p.done.length>0&&<Badge label={p.done.length+" done"} c="#16a34a"/>}{p.up.length>0&&<Badge label={p.up.length+" upcoming"} c="#16a34a"/>}
        <Badge label={SL[p.status]||p.status} c={SC[p.status]||"#6b7280"}/></div>}</div>
    {open&&<div style={{borderTop:"1px solid #E2E0D6"}}>
      {isFull&&subs&&<div style={{display:"flex",gap:0,padding:"0 18px",borderBottom:"1px solid #E2E0D6",overflowX:"auto"}}>
        {subs.map(function(st){var a=sub===st.id;return <button key={st.id} onClick={function(e){e.stopPropagation();setSub(st.id)}} style={{padding:"8px 14px",border:"none",background:a?"rgba(22,163,74,0.06)":"transparent",borderBottom:a?"2px solid #16a34a":"2px solid transparent",color:a?"#16a34a":"#9c9789",fontSize:12,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:5,whiteSpace:"nowrap"}}>{st.l}<span style={{fontSize:10,fontFamily:"monospace",opacity:0.8}}>{st.ct}</span></button>;})}</div>}
      <div style={{padding:"8px 18px 14px 38px",maxHeight:500,overflowY:"auto"}}><TList tasks={vis} pid={p.pid}/></div></div>}</div>;}

function FCard(props){var m=props.meeting;
  var _a=useState(false),open=_a[0],setOpen=_a[1];
  return <div style={{background:"#ffffff",border:"1px solid #E2E0D6",borderRadius:16,marginBottom:10,overflow:"hidden",borderLeft:"4px solid #7c3aed",boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
    <div onClick={function(){setOpen(!open)}} style={{padding:"12px 18px",cursor:"pointer",display:"flex",alignItems:"center",gap:10,userSelect:"none"}}>
      <span style={{color:"#78756d",fontSize:10,transition:"transform 0.15s",transform:open?"rotate(90deg)":"rotate(0)"}}>&#9654;</span>
      <div style={{flex:1}}><div style={{color:"#1a1a1a",fontSize:13,fontWeight:600}}>{m.title}</div><div style={{color:"#78756d",fontSize:11,marginTop:2}}>{m.date} &middot; {m.pm}</div></div>
      <Pill label={m.actions.length+" actions"} c="#8b5cf6"/></div>
    {open&&<div style={{borderTop:"1px solid #E2E0D6",padding:"12px 18px 14px 36px"}}>
      <div style={{color:"#9c9789",fontSize:11,fontWeight:600,textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Action Items</div>
      {m.actions.map(function(a,i){return <div key={i} style={{display:"flex",gap:8,padding:"4px 0",fontSize:13,color:"#1a1a1a"}}><span style={{color:"#16a34a",flexShrink:0}}>&#8226;</span><span>{a}</span></div>;})}</div>}</div>;}

function PMRow(props){var d=props.data;
  var cols=[{v:d.projects,l:"projects",c:"#1a1a1a"},{v:d.atRisk,l:"at risk",c:d.atRisk>0?"#d97706":"#16a34a"},{v:d.stuckTasks,l:"stuck",c:d.stuckTasks>0?"#d97706":"#9c9789"},{v:d.done7d,l:"done 7d",c:"#16a34a"},{v:d.upcoming,l:"upcoming",c:d.upcoming>0?"#1a1a1a":"#9c9789"}];
  return <div style={{display:"flex",alignItems:"center",gap:16,padding:"14px 18px",background:"#ffffff",border:"1px solid #E2E0D6",borderRadius:16,marginBottom:10,borderLeft:"4px solid #55F5A3",boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
    <div style={{flex:1}}><div style={{color:"#1a1a1a",fontSize:14,fontWeight:600}}>{props.name}</div></div>
    {cols.map(function(col,i){return <div key={i} style={{textAlign:"center",minWidth:55}}><div style={{color:col.c,fontSize:18,fontWeight:700,fontFamily:"monospace"}}>{col.v}</div><div style={{color:"#78756d",fontSize:10}}>{col.l}</div></div>;})}</div>;}

export default function Dashboard(){
  var _t=useState("team"),tab=_t[0],setTab=_t[1];
  var _p=useState("all"),pmFilter=_p[0],setPmFilter=_p[1];
  var _pf=useState("all"),projFilter=_pf[0],setProjFilter=_pf[1];
  var _d=useState([]),projects=_d[0],setProjects=_d[1];
  var _ms=useState({}),msMap=_ms[0],setMsMap=_ms[1];
  var _l=useState(true),loading=_l[0],setLoading=_l[1];
  var _fa=useState(null),fetchedAt=_fa[0],setFetchedAt=_fa[1];

  function loadData(bustCache){
    setLoading(true);
    var url=bustCache?"/api/gcx?t="+Date.now():"/api/gcx";
    fetch(url).then(function(r){return r.json();}).then(function(data){
      if(data.projects){setProjects(data.projects);if(data.milestones){_activeMsMap=data.milestones;setMsMap(data.milestones);}setFetchedAt(data.fetchedAt);}
      setLoading(false);
    }).catch(function(){setLoading(false);});
  }

  useEffect(function(){loadData();},[]);

  var pms=useMemo(function(){var s={};projects.forEach(function(p){s[p.pm]=1;});return Object.keys(s).sort();},[projects]);
  var byPM=useMemo(function(){var m={};projects.forEach(function(p){if(!m[p.pm])m[p.pm]={projects:0,atRisk:0,stuckTasks:0,done7d:0,upcoming:0};m[p.pm].projects++;if(p.status==="LATE"||p.status==="ON_HOLD"||p.stuck.length>0||(p.risk||[]).length>0)m[p.pm].atRisk++;m[p.pm].stuckTasks+=p.stuck.length;m[p.pm].done7d+=p.done.length;m[p.pm].upcoming+=p.up.length;});return m;},[projects]);
  var fp=pmFilter==="all"?projects:projects.filter(function(p){return p.pm===pmFilter;});
  var sp=projFilter==="all"?fp:fp.filter(function(p){return p.id===projFilter;});
  var risk=sp.filter(function(p){return p.status==="LATE"||p.status==="ON_HOLD"||p.stuck.length>0||(p.risk||[]).length>0;});
  var withDone=sp.filter(function(p){return p.done.length>0;});
  var withUp=sp.filter(function(p){return p.up.length>0;});
  var tD=sp.reduce(function(s,p){return s+p.done.length;},0);
  var tS=sp.reduce(function(s,p){return s+p.stuck.length;},0);
  var tU=sp.reduce(function(s,p){return s+p.up.length;},0);
  var meetings=pmFilter==="all"?FT:FT.filter(function(m){return m.pm===pmFilter;});
  var tabs=[{id:"team",label:"Team Overview"},{id:"risk",label:"At Risk",count:risk.length},{id:"done",label:"Last 7 Days",count:tD},{id:"up",label:"Next Week",count:tU},{id:"fathom",label:"Meetings",count:meetings.length},{id:"all",label:"All Projects",count:sp.length}];

  return <div style={{minHeight:"100vh",background:"#F5F3EB",fontFamily:"'Helvetica Neue', Helvetica, system-ui, sans-serif",color:"#1a1a1a"}}>
    <div style={{height:3,background:"linear-gradient(90deg,#55F5A3,#00FFF0 50%,#55F5A3)"}}/>
    <div style={{borderBottom:"1px solid #E2E0D6",padding:"20px 32px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"#ffffff"}}>
      <div style={{display:"flex",alignItems:"center",gap:16}}><img src="data:image/png;base64,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" alt="" style={{width:36,height:36}}/><div><div style={{fontSize:20,fontWeight:700,color:"#1a1a1a",letterSpacing:-0.3,lineHeight:1.1}}>Implementation Dashboard</div><div style={{fontSize:11,fontWeight:600,color:"#16a34a",letterSpacing:1.5,textTransform:"uppercase",marginTop:2}}>Highnote</div></div></div>
      <div style={{display:"flex",alignItems:"center",gap:12}}>
        {fetchedAt&&<span style={{color:"#9c9789",fontSize:10}}>Updated {new Date(fetchedAt).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"})}</span>}
        {loading&&<span style={{color:"#55F5A3",fontSize:11,fontWeight:600}}>Loading...</span>}
        <button onClick={function(){loadData(true);}} disabled={loading} style={{padding:"5px 10px",background:loading?"#f0ede5":"#ffffff",border:"1px solid #E2E0D6",borderRadius:8,color:loading?"#9c9789":"#1a1a1a",fontSize:11,cursor:loading?"default":"pointer",outline:"none",fontWeight:500}}>Refresh</button>
        <select value={pmFilter} onChange={function(e){setPmFilter(e.target.value);setProjFilter("all");}} style={{padding:"6px 12px",background:"#ffffff",border:"1px solid #E2E0D6",borderRadius:8,color:"#1a1a1a",fontSize:12,cursor:"pointer",outline:"none"}}><option value="all">All PMs</option>{pms.map(function(pm){return <option key={pm} value={pm}>{pm}</option>})}</select>
        <select value={projFilter} onChange={function(e){setProjFilter(e.target.value)}} style={{padding:"6px 12px",background:"#ffffff",border:"1px solid #E2E0D6",borderRadius:8,color:"#1a1a1a",fontSize:12,cursor:"pointer",outline:"none"}}><option value="all">All Projects</option>{fp.map(function(p){return <option key={p.id} value={p.id}>{p.name}</option>})}</select></div></div>
    <div style={{padding:"24px 32px",maxWidth:1200,margin:"0 auto"}}>
      <div style={{display:"flex",gap:14,marginBottom:24,flexWrap:"wrap",position:"relative"}}><div style={{position:"absolute",width:120,height:120,background:"radial-gradient(circle,rgba(85,245,163,0.25) 0%,transparent 70%)",top:"50%",left:"25%",transform:"translate(-50%,-50%)",pointerEvents:"none",filter:"blur(30px)"}}></div><div style={{position:"absolute",width:120,height:120,background:"radial-gradient(circle,rgba(85,245,163,0.2) 0%,transparent 70%)",top:"50%",left:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none",filter:"blur(30px)"}}></div><div style={{position:"absolute",width:120,height:120,background:"radial-gradient(circle,rgba(85,245,163,0.2) 0%,transparent 70%)",top:"50%",left:"75%",transform:"translate(-50%,-50%)",pointerEvents:"none",filter:"blur(30px)"}}></div>
        <Metric label="Active Projects" value={sp.length} sub={sp.filter(function(p){return p.status==="ON_TIME"}).length+" on time"}/>
        <Metric label="At Risk" value={risk.length} color={risk.length>0?"#d97706":"#16a34a"} sub={tS+" stuck tasks"}/>
        <Metric label="Tasks Done (7d)" value={tD} color="#16a34a" sub={"across "+withDone.length+" projects"}/>
        <Metric label="Tasks Next Week" value={tU} color="#1a1a1a" sub={"across "+withUp.length+" projects"}/></div>
      {projFilter!=="all"&&sp.length>0?function(){var p=sp[0];var rsk=(p.risk||[]);var stuckTasks=p.stuck;var riskTasks=rsk;var wipTasks=p.wip;var upTasks=p.up;var doneTasks=p.done;var atRiskTasks=[].concat(stuckTasks,riskTasks);var pUrl=projUrl(p.pid);var sections=[{id:"risk",label:"At Risk",tasks:atRiskTasks,color:"#dc2626"},{id:"wip",label:"In Progress",tasks:wipTasks,color:"#1a1a1a"},{id:"up",label:"Upcoming",tasks:upTasks,color:"#1a1a1a"},{id:"done",label:"Done (Last 7 Days)",tasks:doneTasks,color:"#16a34a"}].filter(function(s){return s.tasks.length>0;});return <div>
        <div style={{background:"#ffffff",border:"1px solid #E2E0D6",borderRadius:16,padding:"20px 24px",marginBottom:20,borderLeft:"4px solid "+(SC[p.status]||"#16a34a"),boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>{pUrl?<a href={pUrl} target="_blank" rel="noopener noreferrer" style={{color:"#1a1a1a",fontSize:18,fontWeight:700,textDecoration:"none"}} onMouseEnter={function(e){e.currentTarget.style.color="#16a34a";e.currentTarget.style.textDecoration="underline"}} onMouseLeave={function(e){e.currentTarget.style.color="#1a1a1a";e.currentTarget.style.textDecoration="none"}}>{p.name}<ExtIcon color="#16a34a" size={12}/></a>:<span style={{fontSize:18,fontWeight:700}}>{p.name}</span>}
                <Badge label={SL[p.status]||p.status} c={SC[p.status]||"#6b7280"}/></div>
              <div style={{color:"#78756d",fontSize:12,marginTop:4}}>PM: {p.pm}</div></div></div></div>
        {sections.length===0?<div style={{textAlign:"center",padding:48,color:"#78756d",fontSize:14}}>No tasks to display.</div>:sections.map(function(sec){return <div key={sec.id} style={{background:"#ffffff",border:"1px solid #E2E0D6",borderRadius:16,marginBottom:14,overflow:"hidden",boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
          <div style={{padding:"12px 18px",borderBottom:"1px solid #E2E0D6",display:"flex",alignItems:"center",gap:8}}>
            <span style={{color:sec.color,fontSize:11,fontWeight:600,letterSpacing:1.5,textTransform:"uppercase"}}>{sec.label}</span>
            <span style={{fontSize:11,fontFamily:"monospace",color:"#78756d",fontWeight:600}}>{sec.tasks.length}</span></div>
          <div style={{padding:"8px 18px 14px 18px"}}><TList tasks={sec.tasks} pid={p.pid}/></div></div>;})}</div>;}()
      :<div>
      <div style={{display:"flex",gap:2,marginBottom:20,borderBottom:"1px solid #E2E0D6",overflowX:"auto"}}>
        {tabs.map(function(tb){var a=tab===tb.id;return <button key={tb.id} onClick={function(){setTab(tb.id)}} style={{padding:"10px 18px",background:a?"rgba(85,245,163,0.12)":"transparent",border:"none",borderBottom:a?"2px solid #16a34a":"2px solid transparent",color:a?"#16a34a":"#9c9789",fontSize:13,fontWeight:a?700:500,cursor:"pointer",display:"flex",alignItems:"center",gap:7,whiteSpace:"nowrap",flexShrink:0,transition:"all 0.15s ease"}}>{tb.label}{tb.count!==undefined&&<span style={{background:a?"rgba(22,163,74,0.12)":"rgba(0,0,0,0.04)",padding:"2px 8px",borderRadius:10,fontSize:11,fontFamily:"monospace",fontWeight:600}}>{tb.count}</span>}</button>;})}</div>

      {tab==="team"&&<div><p style={{color:"#9c9789",fontSize:13,margin:"0 0 16px 0"}}>Per-PM breakdown. Click project names to open in GuideCX.</p>{Object.entries(byPM).sort(function(a,b){return b[1].atRisk-a[1].atRisk}).map(function(e){return <PMRow key={e[0]} name={e[0]} data={e[1]}/>;})}</div>}
      {tab==="risk"&&<div><p style={{color:"#9c9789",fontSize:13,margin:"0 0 14px 0"}}>Stuck and overdue tasks. Click any task to open in GuideCX.</p>{risk.length===0?<div style={{textAlign:"center",padding:48,color:"#16a34a",fontSize:14}}>All clear.</div>:risk.sort(function(a,b){return(b.stuck.length+(b.risk||[]).length)-(a.stuck.length+(a.risk||[]).length)}).map(function(p){return <PCard key={p.id} proj={p} mode="risk" startOpen={true}/>;})}</div>}
      {tab==="done"&&<div><p style={{color:"#9c9789",fontSize:13,margin:"0 0 14px 0"}}>Tasks completed in the last 7 days.</p>{withDone.length===0?<div style={{textAlign:"center",padding:48,color:"#78756d",fontSize:14}}>No completed tasks.</div>:withDone.sort(function(a,b){return b.done.length-a.done.length}).map(function(p){return <PCard key={p.id} proj={p} mode="done" startOpen={true}/>;})}</div>}
      {tab==="up"&&<div><p style={{color:"#9c9789",fontSize:13,margin:"0 0 14px 0"}}>Tasks due in the next 7 days. Click any task to jump to GuideCX.</p>{withUp.length===0?<div style={{textAlign:"center",padding:48,color:"#78756d",fontSize:14}}>No upcoming tasks.</div>:withUp.sort(function(a,b){return b.up.length-a.up.length}).map(function(p){return <PCard key={p.id} proj={p} mode="up" startOpen={true}/>;})}</div>}
      {tab==="fathom"&&<div><p style={{color:"#9c9789",fontSize:13,margin:"0 0 14px 0"}}>Fathom recordings from the last 14 days.</p>{meetings.length===0?<div style={{textAlign:"center",padding:48,color:"#78756d",fontSize:14}}>No meetings.</div>:meetings.map(function(m){return <FCard key={m.id} meeting={m}/>;})}</div>}
      {tab==="all"&&<div><p style={{color:"#9c9789",fontSize:13,margin:"0 0 14px 0"}}>All {sp.length} active projects. Click project or task names to open in GuideCX.</p>{sp.map(function(p){return <PCard key={p.id} proj={p} initTab="all"/>;})}</div>}
      </div>}
    </div></div>;}
