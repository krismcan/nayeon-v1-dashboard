// Reproducible public data integrity check; Node.js only, no dependencies.
const fs=require('node:fs');const assert=require('node:assert/strict');
const s=JSON.parse(fs.readFileSync(new URL('../data/snapshot.json','file://'+__filename).pathname,'utf8'));
const m=s.capabilityMaturity;
assert.equal(m.modelVersion,'1.0-provisional');
assert.equal(s.architecture.complete,5);assert.equal(s.architecture.total,19);
assert.equal(s.release.verified,0);assert.equal(s.release.total,12);
assert.equal(s.tests.passed,2572);assert.equal(s.tests.total,2572);
assert.equal(s.capabilities.length,16);
const required=s.capabilities.filter(c=>!m.excludedCapabilityIds.includes(c.id));
assert.equal(required.length,15);assert.equal(Object.keys(m.evaluations).length,15);
assert.equal(m.pillars.length,5);assert.equal(m.pillars.reduce((v,p)=>v+p.weightPercent,0),100);
let total=0;
for(const p of m.pillars){
 const set=required.filter(c=>c.pillar===p.pillarId);
 assert.equal(set.length,p.capabilities);
 const sum=set.reduce((v,c)=>{const grade=m.evaluations[c.id]?.level;assert(Number.isInteger(grade)&&grade>=0&&grade<=4,c.id);return v+grade},0);
 assert.equal(sum,p.earned);
 assert.equal(p.maximum,4*set.length);
 assert(Math.abs(p.percent-100*sum/p.maximum)<1e-8);
 total+=(100*sum/p.maximum)*(p.weightPercent/100);
}
assert.equal(Number(total.toFixed(1)),m.computedPercent);
assert.equal(Number(total.toFixed(1)),20.8);
const js=fs.readFileSync(new URL('../data/snapshot.js','file://'+__filename).pathname,'utf8');
assert.equal(JSON.stringify(JSON.parse(js.replace(/^window\.NAYEON_SNAPSHOT\s*=\s*/, '').replace(/;\s*$/, ''))),JSON.stringify(s));
const page=fs.readFileSync(new URL('../index.html','file://'+__filename).pathname,'utf8');
for(const id of ['architectureRing','maturityRing','releaseRing','maturityMethodButton'])assert(page.includes('id="'+id+'"'));
console.log('PASS: 15 graded capabilities, 5 pillars, 20.8% model, 5/19 architecture, 0/12 gates');
