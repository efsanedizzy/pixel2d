// One shared network: orthogonal lanes avoid structures and merge cleanly at junctions.
const ROAD_STEP=20,ROAD_COLS=Math.ceil(HUB.w/ROAD_STEP),roadUse=new Map();let roadLayer;
function routeClear(x,y){if(hubBlocked(x,y))return false;return ![...buildings,...townLandmarks].some(b=>{const r=buildingBounds(b);return x>r.left-14&&x<r.right+14&&y>r.top-14&&y<r.bottom+14});}
function segmentClear(a,b){const n=Math.max(1,Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/8));for(let i=0;i<=n;i++)if(hubBlocked(a[0]+(b[0]-a[0])*i/n,a[1]+(b[1]-a[1])*i/n))return false;return true}
function gridAnchor(point){let choices=[];const cx=Math.round(point[0]/20),cy=Math.round(point[1]/20);for(let r=0;r<5;r++)for(let dy=-r;dy<=r;dy++)for(let dx=-r;dx<=r;dx++){const x=(cx+dx)*20,y=(cy+dy)*20;if(x<100||x>HUB.w-100||y<180||y>HUB.h-100||!routeClear(x,y)||!segmentClear(point,[x,y]))continue;choices.push({x:cx+dx,y:cy+dy,d:Math.hypot(x-point[0],y-point[1])})}choices.sort((a,b)=>a.d-b.d);return choices[0]}
function findTownRoute(start,end){const a=gridAnchor(start),b=gridAnchor(end);if(!a||!b)throw Error('Road endpoint is blocked');const key=(x,y)=>y*ROAD_COLS+x,goal=key(b.x,b.y),heap=[],cost=new Map(),previous=new Map(),closed=new Set();const push=n=>{heap.push(n);for(let i=heap.length-1;i>0;){let p=(i-1)>>1;if(heap[p].f<=heap[i].f)break;[heap[p],heap[i]]=[heap[i],heap[p]];i=p}},pop=()=>{let r=heap[0],last=heap.pop();if(heap.length){heap[0]=last;for(let i=0;;){let l=i*2+1,rr=l+1,n=i;if(l<heap.length&&heap[l].f<heap[n].f)n=l;if(rr<heap.length&&heap[rr].f<heap[n].f)n=rr;if(n===i)break;[heap[n],heap[i]]=[heap[i],heap[n]];i=n}}return r};
 const first=key(a.x,a.y);cost.set(first,0);push({x:a.x,y:a.y,k:first,f:0});let found=false;while(heap.length){const n=pop();if(closed.has(n.k))continue;if(n.k===goal){found=true;break}closed.add(n.k);for(const [dx,dy]of [[1,0],[-1,0],[0,1],[0,-1]]){let x=n.x+dx,y=n.y+dy,k=key(x,y);if(closed.has(k)||x<5||y<9||x>ROAD_COLS-6||y>HUB.h/20-5||!routeClear(x*20,y*20))continue;const next=cost.get(n.k)+(roadUse.has(k)?.7:1);if(next>=(cost.get(k)??Infinity))continue;cost.set(k,next);previous.set(k,n.k);push({x,y,k,f:next+(Math.abs(b.x-x)+Math.abs(b.y-y))*.7})}}
 if(!found)throw Error('No walkable road route');let cells=[],k=goal;for(;;){cells.push([k%ROAD_COLS*20,Math.floor(k/ROAD_COLS)*20]);roadUse.set(k,true);if(k===first)break;k=previous.get(k)}cells.reverse();const points=[start,...cells,end],out=[points[0]];for(let i=1;i<points.length-1;i++){const prev=out.at(-1),p=points[i],next=points[i+1];if((prev[0]===p[0]&&p[0]===next[0])||(prev[1]===p[1]&&p[1]===next[1]))continue;out.push(p)}out.push(end);return out;}
function plazaAnchor(x,y){if(x<PLAZA.x)return[PLAZA.x,Math.max(PLAZA.y+80,Math.min(PLAZA.y+PLAZA.h-80,y))];if(x>PLAZA.x+PLAZA.w)return[PLAZA.x+PLAZA.w,Math.max(PLAZA.y+80,Math.min(PLAZA.y+PLAZA.h-80,y))];return[Math.max(PLAZA.x+100,Math.min(PLAZA.x+PLAZA.w-100,x)),y<CORE.y?PLAZA.y:PLAZA.y+PLAZA.h]}
// A deliberately planned village: broad ring streets, symmetrical districts and straight door walks.
const DISTRICTS={merchant:[940,1120],smith:[2660,1120],healer:[940,1740],alchemist:[2660,1740],cartographer:[1450,730],trainer:[2180,730],innkeeper:[1770,2120]};
buildings.forEach(b=>{[b.x,b.y]=DISTRICTS[b.id];const n=services.find(s=>s.id===b.id);n.x=Math.round(b.x+b.w*.52+53);n.y=b.y+b.h+(b.style==='market'?68:46)});
Object.assign(services.find(s=>s.id==='forest'),{x:3260,y:1550});Object.assign(services.find(s=>s.id==='crypt'),{x:580,y:1960});Object.assign(services.find(s=>s.id==='arena'),{x:3090,y:2330});
townTrees.splice(0,townTrees.length,...townTrees.filter(t=>!buildings.some(b=>t.x>b.x-100&&t.x<b.x+b.w+100&&t.y>b.y-180&&t.y<b.y+b.h+140)));
townRoads.length=0;portalApproaches.length=0;
const ring={left:1290,right:2550,top:990,bottom:1990};
townRoads.push({id:'ring',width:106,points:[[ring.left,ring.top],[ring.right,ring.top],[ring.right,ring.bottom],[ring.left,ring.bottom],[ring.left,ring.top]]});
services.forEach(n=>{const portal=!npcInfo[n.id],end=[n.x,n.y+(portal?32:0)];let start,pts;
 if(n.id==='cartographer'||n.id==='trainer'){start=[n.x,ring.top];pts=[start,end]}
 else if(n.id==='innkeeper'){start=[2300,ring.bottom];pts=[start,[2300,end[1]],end]}
 else if(n.id==='arena'){start=[ring.right,ring.bottom];pts=[start,[ring.right,2140],[n.x,2140],end]}
 else{start=[n.x<CORE.x?ring.left:ring.right,end[1]];pts=[start,end]}
 const r={id:n.id,kind:portal?'portal':'npc',width:portal?90:66,points:pts};townRoads.push(r);if(portal)portalApproaches.push(r);
});
townRoads.push({id:'north-gate',width:106,points:[[1920,990],[1920,1085]]},{id:'south-gate',width:106,points:[[1920,1835],[1920,1990]]},{id:'west-gate',width:106,points:[[1290,1520],[1405,1520]]},{id:'east-gate',width:106,points:[[2435,1520],[2550,1520]]});
// Fixed landmark avenues continue beyond the central districts.
townRoads.push({id:'keep',width:88,points:[[1920,990],[1920,650]]},{id:'mill',width:80,points:[[2550,990],[3055,990],[3055,850]]},{id:'chapel',width:80,points:[[1290,1990],[1050,1990],[1050,2360],[829,2360],[829,2345]]},{id:'stable',width:80,points:[[3090,2100],[3162,2100],[3162,2095]]});
function paintRoadNetwork(g){roadLayer=document.createElement('canvas');roadLayer.width=HUB.w;roadLayer.height=HUB.h;const c=roadLayer.getContext('2d');c.lineCap='square';c.lineJoin='miter';
 const paths=(color,extra)=>{c.strokeStyle=color;for(const r of townRoads){c.lineWidth=r.width+extra;c.beginPath();r.points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.stroke()}};
 paths('#283b3b',14);paths('#8a8d7b',6);paths('#686f65',0);
 c.save();c.globalCompositeOperation='source-atop';for(let y=180;y<HUB.h;y+=14)for(let x=100+(y%28?9:0);x<HUB.w;x+=20){c.fillStyle=(x+y)%3?'#a3a18a33':'#2e414233';c.fillRect(x,y,18,11);c.fillStyle='#c3b99c33';c.fillRect(x+1,y,16,1)}c.restore();g.drawImage(roadLayer,0,0);
}
function paintPlazaGates(g){if(!roadLayer)return;g.drawImage(roadLayer,0,0)}
const oldMedievalDetails=medievalDetails;
medievalDetails=function(b){oldMedievalDetails(b);const{x,y,w,h}=b,cx=x+w*.52;
 // A modest timber porch, leaded glass and an attic dormer give each house a finished entrance.
 const py=y+h-78;polygon([[cx-43,py+8],[cx,py-13],[cx+44,py+8]],'#25343d');polygon([[cx-40,py+6],[cx,py-10],[cx+40,py+6]],b.style==='tower'?'#635a6d':'#655b4d');rect(cx-45,py+7,90,5,'#a08c68');rect(cx-40,py+12,4,66,'#463e36');rect(cx+36,py+12,4,66,'#463e36');
 if(!['tower','bastion','chapel'].includes(b.style)){const ax=x+w*.27,ay=y-48;polygon([[ax-23,ay+19],[ax-23,ay-4],[ax,ay-25],[ax+24,ay-4],[ax+24,ay+19]],'#46515a');polygon([[ax-29,ay-3],[ax,ay-29],[ax+29,ay-3]],'#a3997e');rect(ax-13,ay-1,26,20,'#d6b572');rect(ax-2,ay-1,3,20,'#4d4a45');rect(ax-13,ay+8,26,3,'#4d4a45')}
 for(const wx of [x+25,x+w-62]){ctx.strokeStyle='#5e5d53';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(wx+2,y+26);ctx.lineTo(wx+31,y+54);ctx.moveTo(wx+31,y+26);ctx.lineTo(wx+2,y+54);ctx.stroke()}
 rect(x-22,y+h-26,20,27,'#51473a');rect(x-21,y+h-25,18,3,'#9c8560');rect(x-21,y+h-15,18,3,'#2e3836');rect(x-21,y+h-3,18,3,'#2e3836');
};

