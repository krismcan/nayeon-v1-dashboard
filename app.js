(function () {
'use strict';
const snapshot = window.NAYEON_SNAPSHOT;
if (!snapshot || snapshot.schemaVersion !== 1) {
  document.body.insertAdjacentHTML('afterbegin','<div style="padding:2rem;color:white;background:#8d2349">Verified data snapshot unavailable. Do not publish this page.</div>');
  return;
}
const $ = (id) => document.getElementById(id);
const safe = (v) => String(v ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const iconPaths = {
 layers:'<path d="m12 2-9 5 9 5 9-5-9-5Z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/>',
 shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
 brain:'<path d="M12 5a4 4 0 0 0-7.3 1.8A4 4 0 0 0 4 14a4 4 0 0 0 4 5h1M12 5a4 4 0 0 1 7.3 1.8A4 4 0 0 1 20 14a4 4 0 0 1-4 5h-1"/><path d="M12 5v17M8 10a3 3 0 0 1 4 3M16 10a3 3 0 0 0-4 3"/>',
 message:'<path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H6l-4 3V9a7 7 0 0 1 7-7h4a7 7 0 0 1 7 7v2.5Z"/><path d="M7 10h8M7 14h5"/>',
 cube:'<path d="m12 2 9 5-9 5-9-5 9-5Zm-9 5v10l9 5 9-5V7M12 12v10"/>',
 target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><path d="M12 1v4M12 19v4"/>',
 flag:'<path d="M4 22V4M4 5q6-4 12 0t4 0v11q-4 4-10 0t-6 0"/>',
 check:'<circle cx="12" cy="12" r="9"/><path d="m7 12 3 3 7-7"/>',
 search:'<circle cx="10.7" cy="10.7" r="6.7"/><path d="m16 16 6 6"/>',
 file:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/>'
};
function icon(type){return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" aria-hidden="true">${iconPaths[type] || iconPaths.layers}</svg>`;}
function getStatusClass(status){return ({'COMPLETE':'complete','IN PROGRESS':'inprogress','NOT STARTED':'notstarted','FUTURE':'future'})[status] || 'notstarted';}
function percent(a,b){return b===0?0:100*a/b;}
const pillarById = Object.fromEntries(snapshot.pillars.map(x=>[x.id,x]));
const phaseById = Object.fromEntries(snapshot.phases.map(x=>[x.id,x]));
function fmtDate(iso){return new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(iso+'T00:00:00Z'));}
function calculateMaturity(m) {
  if(!m || m.modelVersion!=='1.0-provisional' || !Array.isArray(m.pillars) || m.pillars.length!==5)throw new Error('Capability maturity audit data unavailable');
  const totalWeight=m.pillars.reduce((n,p)=>n+p.weightPercent,0);
  if(totalWeight!==100)throw new Error('Capability weighting invalid');
  const all=snapshot.capabilities.filter(c=>!m.excludedCapabilityIds.includes(c.id));
  if(all.length!==15 || Object.keys(m.evaluations).length!==15)throw new Error('Maturity capability population invalid');
  const scores=m.pillars.map(p=>{
    const cap=all.filter(c=>c.pillar===p.pillarId);
    const earned=cap.reduce((sum,c)=>{
      const score=m.evaluations[c.id]?.level;
      if(!Number.isInteger(score)||score<0||score>4)throw new Error('Invalid capability score '+c.id);
      return sum+score;
    },0);
    if(!cap.length)throw new Error('Empty capability pillar '+p.pillarId);
    return 100*earned/(4*cap.length)*p.weightPercent/100;
  });
  return {percent:scores.reduce((sum,n)=>sum+n,0)};
}
function renderTop(){
  const a=snapshot.architecture;const r=snapshot.release;
  $('phaseFraction').textContent=a.complete+' / '+a.total;
  $('architecturePct').textContent=percent(a.complete,a.total).toFixed(1)+'%';
  $('archProgress').style.width=percent(a.complete,a.total)+'%';
  // Separate measures: completed architecture phases and independently accepted release gates.
  const archPct=percent(a.complete,a.total),releasePct=percent(r.verified,r.total);
  $('architectureRing').style.setProperty('--progress',archPct+'%');
  $('architectureRing').setAttribute('aria-valuenow',archPct.toFixed(1));
  $('architectureRingPct').textContent=archPct.toFixed(1)+'%';
  $('architectureRingFraction').textContent=a.complete+' of '+a.total;
  $('releaseRing').style.setProperty('--progress',releasePct+'%');
  $('releaseRing').setAttribute('aria-valuenow',releasePct.toFixed(1));
  $('releaseRingPct').textContent=releasePct.toFixed(0)+'%';
  $('releaseRingFraction').textContent=r.verified+' of '+r.total;
  const m=calculateMaturity(snapshot.capabilityMaturity);
  $('maturityRing').style.setProperty('--progress',m.percent+'%');
  $('maturityRing').setAttribute('aria-valuenow',m.percent.toFixed(1));
  $('maturityRingPct').textContent=m.percent.toFixed(1)+'%';
  $('phaseComplete').textContent=a.complete;$('phaseActive').textContent=a.inProgress;$('phasePlanned').textContent=a.notStarted;
  $('gateFraction').textContent=r.verified+' / '+r.total;
  $('gateProgress').style.width=percent(r.verified,r.total)+'%';
  const latestClosed = [...snapshot.milestones].filter(x=>x.status==='CLOSED').at(-1);
  if (!latestClosed || latestClosed.name!==snapshot.latestMilestone) {
    throw new Error('Latest closed milestone is inconsistent with verified history');
  }
  $('milestoneValue').textContent=latestClosed.name;
  $('milestoneDescription').textContent=latestClosed.summary || latestClosed.detail;
  $('milestoneDate').textContent=latestClosed.date.toUpperCase();
  // Governance assessments do not count as sealed product milestones.
  const workflow=snapshot.governance;
  if (!workflow || workflow.latestAssessment!=='Phase 8.35' ||
      workflow.lastProductMilestone!==snapshot.latestMilestone ||
      workflow.status!=='CLOSED — GOVERNANCE ONLY') {
    throw new Error('Workflow assessment is inconsistent with product release truth');
  }
  // Phase 8.35 stays in verified history only; no duplicate overview display.
  $('testPassed').textContent=snapshot.tests.passed.toLocaleString('en-GB');$('testTotal').textContent=snapshot.tests.total.toLocaleString('en-GB');
  $('snapshotLabel').textContent=snapshot.snapshotLabel;$('snapshotDate').textContent=fmtDate(snapshot.snapshotDate);
  $('footerDate').textContent='Data snapshot · '+fmtDate(snapshot.snapshotDate);
  $('repoLink').href=snapshot.repository.url;
}
function renderEvidence(){
 const counts={bounded:0,notstarted:0,future:0};
 snapshot.capabilities.forEach(c=>{if(c.evidence==='BOUNDED/UNDERWAY')counts.bounded++;else if(c.evidence==='NOT STARTED')counts.notstarted++;else counts.future++;});
 $('boundedCount').textContent=counts.bounded;$('notStartedCount').textContent=counts.notstarted;$('futureCount').textContent=counts.future;
 let p1=percent(counts.bounded,snapshot.capabilities.length),p2=percent(counts.bounded+counts.notstarted,snapshot.capabilities.length);
 $('evidenceDonut').style.background=`conic-gradient(var(--aqua) 0 ${p1}%, var(--amber) ${p1}% ${p2}%, var(--rose) ${p2}% 100%)`;
 const a=snapshot.architecture,c=percent(a.complete,a.total),i=percent(a.complete+a.inProgress,a.total);
 $('phaseDonut').style.background=`conic-gradient(var(--aqua) 0 ${c}%,var(--blue) ${c}% ${i}%,#335171 ${i}% 100%)`;
 $('phaseBreakdown').innerHTML=[['Complete',a.complete,'var(--aqua)'],['In progress',a.inProgress,'var(--blue)'],['Not started',a.notStarted,'#547292']].map(([name,n,color])=>`<div class="breakdown-row"><span class="swatch" style="background:${color}"></span><span>${name}</span><strong>${n}</strong></div>`).join('');
 $('distributionBar').innerHTML=[['complete',a.complete,'var(--aqua)'],['inprogress',a.inProgress,'var(--blue)'],['notstarted',a.notStarted,'#547292']].map(([cl,n,color])=>`<span style="width:${percent(n,a.total)}%;background:${color}" title="${n} ${cl}"></span>`).join('');
}
let currentPillar='all';
const orderedCapabilities = [...snapshot.capabilities].sort((a,b)=>{
 const r={'BOUNDED/UNDERWAY':0,'NOT STARTED':1,'OPTIONAL/FUTURE':2}; return r[a.evidence]-r[b.evidence]||a.name.localeCompare(b.name);
});
function evidenceDetail(c){return c.evidence==='BOUNDED/UNDERWAY'?{name:'Scoped foundation',className:'bounded'}:c.evidence==='NOT STARTED'?{name:'Not started',className:'notstarted'}:{name:'Optional future',className:'future'};}
function renderCapabilityFilters(){
 const filterData=[{id:'all',name:'All pillars'},...snapshot.pillars.map(p=>({id:p.id,name:p.name.replace(' & ',' + ')}))];
 $('capFilters').innerHTML=filterData.map(x=>`<button class="filter ${currentPillar===x.id?'active':''}" type="button" data-filter="${safe(x.id)}" aria-pressed="${currentPillar===x.id}">${safe(x.name)}</button>`).join('');
 document.querySelectorAll('[data-filter]').forEach(node=>node.addEventListener('click',()=>{currentPillar=node.dataset.filter;renderCapabilityFilters();renderCapabilityList();highlightPillars();}));
}
function renderCapabilityList(){
 const current=orderedCapabilities.filter(x=>currentPillar==='all'||x.pillar===currentPillar);
 $('capabilityList').innerHTML=current.map(c=>{
 const d=evidenceDetail(c);
 return `<button class="capability-row" type="button" data-cap="${safe(c.id)}" aria-label="More about ${safe(c.name)}, ${safe(d.name)}"><span class="capability-name"><span class="capability-icon">${icon(pillarById[c.pillar].icon)}</span>${safe(c.name)}</span><span class="evidence-bar" aria-hidden="true"><span class="evidence-fill ${d.className}"></span></span><span class="evidence-label ${d.className}">${safe(d.name)}</span><span class="row-arrow">›</span></button>`;
 }).join('');
 document.querySelectorAll('[data-cap]').forEach(node=>node.addEventListener('click',()=>showCapability(orderedCapabilities.find(c=>c.id===node.dataset.cap))));
}
function highlightPillars(){document.querySelectorAll('[data-pillar]').forEach(node=>node.classList.toggle('selected',node.dataset.pillar===currentPillar));}
function renderPillars(){
 $('pillarsGrid').innerHTML=snapshot.pillars.map(p=>{
 const phases=p.phaseIds.map(n=>phaseById[n]);const complete=phases.filter(x=>x.status==='COMPLETE').length;
 const active=phases.filter(x=>x.status==='IN PROGRESS').length;
 return `<button type="button" class="panel pillar" data-pillar="${safe(p.id)}" aria-label="Filter capabilities to ${safe(p.name)}"><div class="pillar-top"><span class="head-icon ${p.id==='security'?'rose':p.id==='intelligence'?'purple':p.id==='product'?'blue':'sky'}">${icon(p.icon)}</span><span class="pillar-title">${safe(p.name)}</span></div><div class="pillar-stat"><span>${complete} <small>/ ${phases.length}</small></span><small>${percent(complete,phases.length).toFixed(0)}% phases closed</small></div><div class="pillar-progress"><span style="width:${percent(complete,phases.length)}%"></span></div><p class="pillar-summary">${complete} closed · ${active} in progress · ${phases.length-complete-active} not started</p><div class="pillar-bottom">VIEW CAPABILITIES ↗</div></button>`;
 }).join('');
 document.querySelectorAll('[data-pillar]').forEach(node=>node.addEventListener('click',()=>{
 currentPillar=node.dataset.pillar;renderCapabilityFilters();renderCapabilityList();highlightPillars();$('capabilities').scrollIntoView({behavior:'smooth',block:'start'});
 }));
}
let phaseSearch='';let statusFilter='all';
function renderPhases(){
 const phases=snapshot.phases.filter(p=>(statusFilter==='all'||p.status===statusFilter)&&(!phaseSearch||`${p.id} ${p.name} ${p.summary}`.toLowerCase().includes(phaseSearch)));
 $('phaseEmpty').hidden=phases.length>0;
 $('phaseList').innerHTML=phases.map(p=>`<button class="phase-item" type="button" data-phase="${p.id}" aria-label="Phase ${p.id}: ${safe(p.name)}, ${safe(p.status)}"><span class="phase-number">${String(p.id).padStart(2,'0')}</span><span class="phase-text"><strong>${safe(p.name)}</strong><small>ARCHITECTURE PHASE ${p.id}</small></span><span class="mini-status ${getStatusClass(p.status)}">${safe(p.status)}</span></button>`).join('');
 document.querySelectorAll('[data-phase]').forEach(node=>node.addEventListener('click',()=>showPhase(phaseById[Number(node.dataset.phase)])));
}
function renderFoundation(){
 const phases=snapshot.phases.filter(p=>Number.isInteger(p.id)&&p.id>=0&&p.id<=7).sort((a,b)=>a.id-b.id);
 const completed=phases.filter(p=>p.status==='COMPLETE').map(p=>p.id);
 const active=phases.filter(p=>p.status==='IN PROGRESS').map(p=>p.id);
 if(phases.length!==8 || phases.some((p,i)=>p.id!==i) ||
    completed.join(',')!=='0,1,5,6,7' || active.join(',')!=='2,3,4'){
   throw new Error('Foundation statuses diverged from the verified master snapshot');
 }
 $('foundationSummary').textContent=completed.length+' complete · '+active.length+' in progress';
 $('foundationList').innerHTML=phases.map(p=>`<button type="button" class="foundation-entry ${getStatusClass(p.status)}" data-foundation-phase="${p.id}" aria-label="Phase ${p.id}, ${safe(p.name)}, ${safe(p.status)}; view details"><span class="foundation-number">${p.id}</span><span class="foundation-name"><strong>${safe(p.name)}</strong><small>${safe(p.summary)}</small></span><span class="foundation-state ${getStatusClass(p.status)}">${p.status==='COMPLETE'?'✓ COMPLETE':'◷ IN PROGRESS'}</span></button>`).join('');
 document.querySelectorAll('[data-foundation-phase]').forEach(button=>
   button.addEventListener('click',()=>showPhase(phaseById[Number(button.dataset.foundationPhase)])));
}
function renderTimeline(){
 const g=snapshot.governance;
 const last=snapshot.milestones.at(-1);
 if(!g||g.latestAssessment!=='Phase 8.35'||g.status!=='CLOSED — GOVERNANCE ONLY'||
    g.lastProductMilestone!==snapshot.latestMilestone||
    g.reportPath!=='docs/phase-8-35-workflow-assessment.md'||
    !last||last.name!==snapshot.latestMilestone||last.status!=='CLOSED'){
    throw new Error('Governance or product milestone mismatch');
 }
 const gov=`<div class="milestone-row governance" data-milestone-kind="governance"><span class="milestone-list-mark">✓</span><div class="milestone-row-main"><div class="milestone-row-title"><strong>${safe(g.latestAssessment)}</strong><span>GOVERNANCE · CLOSED</span></div><p>Engineering workflow assessment completed; does not represent a product release.</p></div><time class="milestone-row-date">19 OCT 2026</time><a href="${safe(g.reportPath)}">Assessment ↗</a></div>`;
 const product=(m)=>`<div class="milestone-row" data-milestone-kind="product"><span class="milestone-list-mark">✓</span><div class="milestone-row-main"><div class="milestone-row-title"><strong>${safe(m.name)}</strong><span>PRODUCT · SEALED</span></div><p>${safe(m.summary||m.detail)}</p></div><time class="milestone-row-date">${safe(m.date).toUpperCase()}</time><a href="https://github.com/krismcan/Mark-LV/commit/${encodeURIComponent(m.commit)}" target="_blank" rel="noopener noreferrer">Commit ↗</a></div>`;
 $('roadmapTimeline').innerHTML=gov+product(last);
 $('olderTimeline').innerHTML=snapshot.milestones.slice(0,-1).reverse().map(product).join('');
}
function renderHistory(){
 const closed=snapshot.milestones.filter(m=>m.status==='CLOSED'&&
   Number.isSafeInteger(m.regression)&&m.regression>0&&typeof m.commit==='string');
 $('historyGrid').innerHTML=closed.reverse().map(m=>{
   const href='https://github.com/krismcan/Mark-LV/commit/'+encodeURIComponent(m.commit);
   return `<div class="regression-row"><strong>${safe(m.name)}</strong><span class="regression-value">${m.regression.toLocaleString('en-GB')} / ${m.regression.toLocaleString('en-GB')} PASS</span><span class="regression-date">${safe(m.date)}</span><a href="${href}" target="_blank" rel="noopener noreferrer">Git ${safe(m.commit.slice(0,8))} ↗</a></div>`;
 }).join('');
}
function renderGates(){
 $('gatesGrid').innerHTML=snapshot.gates.map(g=>`<div class="gate"><div class="gate-no">${String(g.id).padStart(2,'0')}</div><div><strong>${safe(g.name)}</strong><span>◯ ${safe(g.status)}</span></div></div>`).join('');
}
function openDialog(id){const d=$(id);if(d && typeof d.showModal==='function'){d.showModal();}else alert('This browser does not support interactive detail dialogs.');}
function showCapability(c){if(!c)return;const d=evidenceDetail(c),p=pillarById[c.pillar];
 const ev=snapshot.capabilityMaturity.evaluations[c.id];
 const maturity=ev?`<div><strong>Provisional maturity:</strong> ${ev.level}/4 · ${safe(snapshot.capabilityMaturity.levelDefinitions[ev.level].label)}</div><div><strong>Supporting evidence:</strong> ${safe(ev.evidence)}</div><div><strong>Not yet evidenced:</strong> ${safe(ev.limitation)}</div><div><strong>Workbook trace:</strong> ${safe(ev.workbookReferences)}</div>`:'<div><strong>Maturity:</strong> Excluded from required v1 (optional future capability).</div>';
 $('detailDialogBody').innerHTML=`<p class="eyebrow tiny">CAPABILITY EVIDENCE · ${safe(p.name)}</p><h2>${safe(c.name)}</h2><span class="detail-evidence">${safe(d.name.toUpperCase())}</span><p>${safe(c.detail)}</p><div class="detail-meta">${maturity}<div><strong>Formal architecture phases:</strong> ${safe(c.relatedPhases)}</div><div><strong>Note:</strong> The score is bounded evidence maturity, not accepted release readiness.</div></div>`;
 openDialog('detailDialog');
}
function showPhase(p){if(!p)return;
 $('detailDialogBody').innerHTML=`<p class="eyebrow tiny">FORMAL ARCHITECTURE REGISTER</p><h2>Phase ${p.id}: ${safe(p.name)}</h2><span class="detail-evidence">${safe(p.status)}</span><p>${safe(p.summary)}</p><div class="detail-meta"><div><strong>Evidence basis:</strong> ${safe(p.source)}, existing master workbook.</div><div><strong>Closure rule:</strong> Only COMPLETE contributes to the 5/19 closed count.</div><div><strong>Release boundary:</strong> Closure is not independent full product acceptance.</div></div>`;
 openDialog('detailDialog');
}
function showMethod(){
 const m=snapshot.scoring;
 $('methodBody').innerHTML=`<p>Published figures come from a controlled, sanitised snapshot of the private 16-sheet master workbook. The original workbook is not made available to visitors.</p><div class="method-section"><h3>Architecture completion · ${snapshot.architecture.complete}/${snapshot.architecture.total}</h3><p>${safe(m.architecture)}</p><p>Phase population: 0–18. Five complete, five in progress, nine not started. In-progress phases receive <strong>zero</strong> partial credit.</p></div><div class="method-section"><h3>Release acceptance · ${snapshot.release.verified}/${snapshot.release.total}</h3><p>${safe(m.release)} No end-user acceptance gate has passed yet.</p></div><div class="method-section"><h3>Capability maturity · ${calculateMaturity(snapshot.capabilityMaturity).percent.toFixed(1)}% (provisional)</h3><p>${safe(m.capability)} Required v1: 15 capabilities; optional managed-commercial backend is excluded. The five development pillars each weigh 20%; included capabilities within a pillar have equal weight.</p><p><strong>Scoring scale:</strong> ${snapshot.capabilityMaturity.levelDefinitions.map(v=>`${v.level}: ${safe(v.label)}`).join(' · ')}</p><p><strong>Formula:</strong> Mean over five pillars of [sum of included capability levels / (4 × included capability count)] × 100.</p><p>${safe(snapshot.capabilityMaturity.warnings[0])}</p>${snapshot.capabilityMaturity.pillars.map(p=>`<p>${safe(p.pillarName)}: ${p.percent.toFixed(1)}% (${p.earned}/${p.maximum} points)</p>`).join('')}<p><a href="SCORING_METHOD.md" target="_blank" rel="noopener noreferrer" class="panel-link">Read complete public assessment & evidence table ↗</a></p></div><div class="method-section"><h3>Five-pillar mapping</h3><p>${safe(m.pillars)} The pillar closure percentages reflect only the fraction of formally complete phases mapped to that pillar.</p></div><div class="method-section"><h3>Engineering quality</h3><p>The latest authoritative Windows regression is ${Number(snapshot.tests.passed).toLocaleString('en-GB')} / ${Number(snapshot.tests.total).toLocaleString('en-GB')} passing. Independent review and fresh-clone verification are milestone evidence, not product release acceptance.</p></div><div class="method-section"><h3>Publication boundary</h3><p>${safe(snapshot.disclosure)}</p><p>Snapshot date: ${safe(snapshot.snapshotDate)} · Latest closed milestone: ${safe(snapshot.latestMilestone)} · Source identity stays private.</p></div>`;
 openDialog('methodDialog');
}
renderTop();renderEvidence();renderCapabilityFilters();renderCapabilityList();renderPillars();renderPhases();renderFoundation();renderTimeline();renderHistory();renderGates();
document.querySelectorAll('[data-icon]').forEach(node=>{node.innerHTML=icon(node.dataset.icon)});
$('phaseSearch').addEventListener('input',e=>{phaseSearch=e.target.value.toLowerCase().trim();renderPhases();});
$('phaseFilter').addEventListener('change',e=>{statusFilter=e.target.value;renderPhases();});
$('methodButton').addEventListener('click',showMethod);$('footerMethod').addEventListener('click',showMethod);$('maturityMethodButton').addEventListener('click',showMethod);
const navLinks=[...document.querySelectorAll('.nav a')];
navLinks.forEach(a=>a.addEventListener('click',()=>{navLinks.forEach(n=>n.classList.remove('active'));a.classList.add('active');}));
})();
