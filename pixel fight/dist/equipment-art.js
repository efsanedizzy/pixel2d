// Head, torso and both hands are replacement sprites, composed before joint transforms.
const equipmentSprites=new Map();
function pixelSurface(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;return c}
function spriteTools(c){const g=c.getContext('2d');return{g,R:(x,y,w,h,col)=>{g.fillStyle=col;g.fillRect(x,y,w,h)},P:(pts,col)=>{g.fillStyle=col;g.beginPath();pts.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.closePath();g.fill()}}}
function helmetSprite(face,id){const c=pixelSurface(56,36),{g,R,P}=spriteTools(c);if(id==='travelerHelm'){g.drawImage(heroSprite(face),8,0,39,35,8,0,39,35);return c}if(!id){P([[17,12],[24,8],[34,9],[39,16],[38,27],[32,33],[22,32],[16,26]],'#1e2735');R(19,15,17,13,'#d3a17f');R(20,16,6,9,'#edc39a');P([[16,16],[18,9],[26,6],[35,9],[40,17],[33,15],[29,18],[23,15]],'#493932');if(face==='up'){R(18,15,19,14,'#4e3c32');R(20,15,4,10,'#70513d')}else{R(face==='left'?20:29,22,3,2,'#243341');R(25,29,7,1,'#91614e')}return c}const back=face==='up',left=face==='left',right=face==='right',profile=left||right;
 if(id==='ironHelm'){
 // Riveted barrel great helm: flat crown, narrow eye slots, vented full face.
 P([[14,8],[19,5],[36,5],[41,9],[42,28],[37,34],[18,34],[13,28]],'#111c28');
 P([[16,9],[21,7],[35,7],[39,10],[39,28],[35,31],[19,31],[16,27]],'#718b9a');R(18,8,8,20,'#bdcbd0');R(19,9,5,2,'#edf0e4');R(27,8,3,24,'#536c7c');R(30,9,7,18,'#899da6');R(16,29,23,3,'#4b6575');
 if(back){R(18,15,19,2,'#506979');R(24,8,4,23,'#a6b9bd');R(18,25,3,2,'#d3d5bf');R(34,25,3,2,'#d3d5bf')}
 else{const vx=left?15:right?23:17,vw=profile?17:21;R(vx,17,vw,4,'#15232d');R(vx+1,17,vw-2,1,'#dece96');R(left?21:right?29:26,20,3,11,'#c2c7b6');for(let yy=24;yy<=28;yy+=3)for(let xx=(left?16:right?32:18);xx<(left?22:right?39:38);xx+=4)R(xx,yy,2,1,'#263b49')}
 R(15,12,2,2,'#d7d3b8');R(38,12,2,2,'#d7d3b8');R(15,26,2,2,'#d7d3b8');R(38,26,2,2,'#d7d3b8');
 }else{
 // Ember sallet: swept visor, pointed neck guard and a crimson horsehair crest.
 P([[12,16],[16,7],[24,4],[35,6],[42,13],[44,25],[37,33],[27,35],[16,30],[11,24]],'#151a25');
 P([[15,15],[19,9],[26,7],[34,9],[39,15],[40,24],[34,29],[27,32],[18,27],[14,23]],'#6e453e');P([[16,15],[22,8],[27,7],[25,18],[15,21]],'#c28c66');P([[28,8],[35,10],[39,16],[29,17]],'#e2ba83');
 P([[24,7],[25,0],[30,-2],[35,1],[35,10],[31,7]],'#702f3c');R(27,0,4,7,'#c26156');R(28,0,2,3,'#ef9b70');
 if(back){P([[18,17],[37,17],[38,27],[27,32],[17,26]],'#825447');R(25,8,4,21,'#cb996b')}
 else{P([[14,18],[26,16],[40,18],[37,22],[27,21],[16,23]],'#131d29');R(left?15:right?27:17,19,profile?13:20,2,'#f4bb68');P([[25,21],[29,21],[32,30],[27,33],[23,29]],'#c38d61');R(26,23,2,7,'#f0c48d');R(18,25,5,2,'#2f2b30');R(33,24,4,2,'#2f2b30')}
 }
 if(p.equipment.earring){R(left?12:40,27,3,5,GEAR[p.equipment.earring].color);R(left?12:40,27,2,2,'#f4e4ab')}return c;
}
layersFor=function(face){const key=[face,p.equipment.helmet,p.equipment.chest,p.equipment.gloves,p.equipment.shield,p.equipment.earring].join(':');if(equipmentSprites.has(key))return equipmentSprites.get(key);const src=heroSprite(face),body=pixelSurface(56,72),head=helmetSprite(face,p.equipment.helmet),arm=pixelSurface(10,18),shield=pixelSurface(20,26);const {g,R,P}=spriteTools(body);
 g.drawImage(src,0,0);g.clearRect(8,0,39,35);g.clearRect(15,53,28,19);g.clearRect(3,39,20,26);g.clearRect(39,40,10,18);
 // Neck and shoulders belong to the torso and are never covered by the old helmet.
 R(22,32,13,4,'#293846');P([[10,35],[15,30],[21,32],[22,38],[16,41],[10,39]],'#aab9c4');P([[35,33],[41,30],[47,35],[45,40],[39,41]],'#819bad');
 if(!p.equipment.chest){g.clearRect(16,35,23,18);P([[17,35],[27,33],[38,35],[36,50],[18,50]],'#4d5c5a');R(25,35,3,14,'#9b8b6b');R(17,49,20,4,'#4b392e')}
 if(p.equipment.chest){const ember=p.equipment.chest==='emberChest';P([[17,35],[27,32],[38,35],[37,45],[28,50],[18,44]],'#26323d');P([[19,36],[27,34],[35,36],[34,43],[28,47],[20,42]],ember?'#a87251':GEAR[p.equipment.chest]?.color||'#a3b7bd');R(20,36,3,6,ember?'#e2b47e':'#d8e2db');R(27,35,2,12,ember?'#5b3436':'#566e7d');if(ember){P([[23,39],[28,36],[33,39],[28,44]],'#572d36');R(27,38,2,4,'#efb16e')}R(18,48,20,3,'#60483a')}
 const ag=arm.getContext('2d');ag.drawImage(src,39,40,10,18,0,0,10,18);const sg=shield.getContext('2d');sg.drawImage(src,3,39,20,26,0,0,20,26);
 if(!p.equipment.shield){sg.clearRect(0,0,20,26);sg.drawImage(src,11,40,8,16,10,0,8,16)}else if(p.equipment.shield!=='travelerShield'){const ember=p.equipment.shield==='emberShield',{R:SR,P:SP}=spriteTools(shield);sg.clearRect(0,0,20,26);SP(ember?[[9,0],[17,4],[19,13],[15,23],[9,26],[2,21],[0,11],[2,3]]:[[9,0],[19,5],[16,17],[9,26],[2,17],[0,5]],'#172533');SP([[9,2],[17,6],[14,17],[9,23],[4,17],[2,6]],ember?'#c28b5d':GEAR[p.equipment.shield]?.color||'#b2c2c4');SP([[9,5],[14,8],[12,17],[9,20],[6,16],[4,8]],ember?'#743e42':'#365c6c');SR(8,6,2,13,ember?'#edba7d':'#e0dbbc');SR(5,10,8,2,ember?'#edba7d':'#e0dbbc');if(ember){SR(0,3,2,5,'#dfb27b');SR(17,3,2,5,'#dfb27b')}}
 if(p.equipment.gloves){const ember=p.equipment.gloves==='emberGloves',c=ember?'#ba8059':GEAR[p.equipment.gloves]?.color||'#93aebb',light=ember?'#f1be80':'#dce6df',dark=ember?'#543638':'#344f62';ag.clearRect(0,6,10,12);ag.fillStyle=dark;ag.fillRect(1,6,8,11);ag.fillStyle=c;ag.fillRect(1,7,7,4);ag.fillRect(2,12,6,4);ag.fillStyle=light;ag.fillRect(2,7,5,2);ag.fillStyle=dark;ag.fillRect(2,11,6,1);ag.fillStyle=light;for(let x=3;x<8;x+=2)ag.fillRect(x,13,1,2);if(ember){ag.fillStyle='#e6aa69';ag.fillRect(0,6,2,3);ag.fillRect(7,5,2,3)}
 // Left gauntlet grips the shield; it shares that arm's rotation and swing.
 sg.fillStyle=dark;sg.fillRect(13,6,6,9);sg.fillStyle=c;sg.fillRect(14,6,5,6);sg.fillStyle=light;sg.fillRect(14,6,4,2);sg.fillStyle=dark;sg.fillRect(14,11,4,1);
 }
 const pack={src,body,head,arm,shield,key};equipmentSprites.set(key,pack);return pack;
};
// Five forged silhouettes: arming sword, notched cleaver, ice estoc, forked thunderblade, crescent sabre.
const WEAPON_PROFILES={tide:'Düz şövalye kılıcı',ember:'Çentikli ağır pala',frost:'İnce buz meçi',storm:'Çatallı şimşek kılıcı',eclipse:'Hilal ağızlı eğri kılıç'};
blade=function(g,id,upgrade=0,clock=weaponClock){if(!id)return;const s=SWORDS[id]||SWORDS.tide,R=(x,y,w,h,c)=>{g.fillStyle=c;g.fillRect(x,y,w,h)},P=(ps,c)=>{g.fillStyle=c;g.beginPath();ps.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.closePath();g.fill()};g.save();
 const metal='#b4a17d',edge='#f0d9a2',ink='#1b2634';if(id!=='tide'||upgrade>=3){g.shadowColor=s.color;g.shadowBlur=4+upgrade*.5}
 if(id==='tide'){
 P([[-5,-8],[-5,-51],[0,-65],[5,-51],[5,-8]],ink);P([[-3,-10],[-3,-51],[0,-61],[3,-51],[3,-10]],'#9ebec0');R(-2,-49,2,38,'#e8efdf');R(1,-49,2,38,'#547c8e');P([[-14,-6],[-13,-11],[-4,-12],[4,-12],[13,-11],[14,-6],[11,-6],[10,-8],[-10,-8],[-11,-6]],metal);R(-10,-11,20,2,edge);R(-2,-7,5,18,'#493b35');for(let y=-5;y<10;y+=4)R(-2,y,5,1,'#aa8155');R(-4,11,9,4,metal);P([[-3,14],[1,18],[5,14]],edge);
 }else if(id==='ember'){
 // Broad asymmetrical butcher blade, serrated spine and a heavy hooked crossguard.
 P([[-7,-10],[-10,-23],[-6,-26],[-10,-32],[-6,-36],[-10,-42],[-6,-46],[-8,-58],[9,-69],[14,-64],[15,-49],[12,-19],[8,-9]],ink);
 P([[-5,-12],[-7,-22],[-3,-26],[-7,-32],[-3,-36],[-7,-42],[-3,-46],[-5,-57],[9,-65],[11,-62],[12,-48],[9,-20],[6,-11]],'#9c5a42');P([[8,-62],[11,-60],[11,-49],[8,-21],[5,-12],[3,-14],[6,-48]],'#f2be7a');P([[-2,-47],[3,-57],[3,-40],[6,-34],[0,-25],[1,-38]],'#ef8f50');R(-4,-21,8,3,'#4b3434');P([[-15,-14],[-9,-11],[9,-11],[17,-19],[18,-12],[11,-5],[-7,-6],[-14,-8]],'#67423a');P([[-12,-12],[-7,-9],[10,-9],[16,-15],[15,-10],[10,-7],[-7,-7]],'#d9a565');R(-3,-5,7,18,'#3e2d32');for(let y=-3;y<12;y+=4)R(-3,y,7,2,'#8f5845');R(-5,13,11,5,'#a8754a');R(-2,14,5,3,'#edb46b');
 }else if(id==='frost'){
 // Needle estoc with a diamond tip, long fuller and swept basket guard.
 P([[-2,-11],[-3,-61],[0,-80],[3,-61],[2,-11]],'#345573');P([[-1,-13],[-1,-61],[0,-76],[1,-61],[1,-13]],'#d9f6f1');P([[-5,-60],[0,-71],[5,-60],[0,-53]],'#8ed2e2');R(0,-65,1,10,'#f1feee');P([[-13,-5],[-15,-14],[-10,-21],[-6,-20],[-10,-15],[-10,-9],[10,-9],[13,-16],[16,-16],[14,-6],[6,-3],[-6,-3]],'#547d99');P([[-13,-13],[-10,-18],[-9,-18],[-12,-12],[-9,-7],[9,-7],[12,-12],[11,-6],[-10,-5]],'#c2e5df');R(-2,-3,5,17,'#36516b');R(-1,-2,2,15,'#9ab8c6');P([[-4,14],[0,21],[5,14],[0,11]],'#8dd4e2');R(0,14,1,4,'#f1ffed');
 }else if(id==='storm'){
 // Open forked blade, offset lightning edges and a circular conductor hilt.
 P([[-7,-9],[-11,-42],[-6,-49],[-11,-52],[-8,-71],[-3,-76],[-5,-55],[0,-49],[3,-57],[5,-77],[10,-69],[9,-51],[13,-45],[8,-10]],ink);
 P([[-5,-11],[-8,-41],[-3,-49],[-8,-53],[-6,-69],[-5,-57],[2,-47],[5,-54],[7,-69],[7,-50],[10,-44],[6,-11]],'#8371a9');P([[-7,-67],[-6,-54],[0,-47],[-4,-40],[-1,-13],[1,-13],[-2,-40],[3,-47],[6,-55],[7,-67],[5,-54],[1,-45]],'#f1e6cc');P([[-17,-12],[-11,-16],[-6,-9],[6,-9],[12,-17],[18,-12],[12,-12],[8,-5],[-8,-5],[-12,-12]],'#745c9c');R(-7,-8,15,3,'#b7a0d0');P([[-5,-5],[0,-10],[6,-5],[6,1],[0,5],[-5,1]],'#4a4165');P([[-2,-5],[1,-7],[3,-4],[1,1],[-2,0]],'#e5d1fa');R(-2,4,5,10,'#3b344c');R(-2,6,5,1,'#aa8dc1');R(-4,14,9,4,'#9475b6');
 }else{
 // Crescent sabre: strong forward curve, cutout spine and a raven-wing guard.
 P([[-5,-9],[-9,-31],[-7,-49],[1,-65],[13,-77],[18,-79],[12,-67],[7,-51],[8,-32],[5,-10]],ink);
 P([[-3,-11],[-6,-31],[-4,-48],[3,-63],[14,-75],[8,-64],[4,-49],[5,-31],[3,-12]],'#8f587c');P([[-4,-12],[-8,-32],[-6,-49],[2,-65],[15,-77],[7,-66],[-2,-48],[-3,-32],[-1,-12]],'#efb1cc');P([[1,-49],[5,-58],[4,-45],[2,-35]],'#1c2636');P([[-18,-16],[-11,-12],[-7,-15],[-2,-9],[5,-10],[12,-19],[15,-20],[12,-10],[7,-5],[-6,-5],[-13,-8]],'#483850');P([[-16,-14],[-8,-10],[-4,-7],[5,-7],[12,-16],[10,-9],[6,-5],[-6,-6]],'#b38a9f');R(-2,-4,5,16,'#2e2a3c');for(let y=-2;y<12;y+=4)R(-2,y,5,1,'#a36d8a');P([[-4,12],[1,19],[6,12],[1,15]],'#cc96b5');
 }
 g.shadowBlur=0;if(id!=='tide'||upgrade>=3){g.globalAlpha=.6;for(let i=0;i<2+Math.floor(upgrade/3);i++){const t=(clock*12+i*17)%50;R(Math.sin(clock*2+i*2)*10,-16-t,2,id==='ember'?4:2,s.edge)}}g.restore();
};
Object.entries(WEAPON_PROFILES).forEach(([id,shape])=>SWORDS[id].description=shape+'. '+SWORDS[id].description);
// Inspect a forged appearance before spending materials; preview never saves or equips it.
let smithLook='ironHelm';
function paintEquipmentLook(c,id){if(!c||!GEAR[id])return;const previous=p.equipment;try{p.equipment={...previous,[GEAR[id].slot]:id};const g=c.getContext('2d');g.clearRect(0,0,c.width,c.height);g.fillStyle='#17232d';g.fillRect(0,0,c.width,c.height);g.save();g.translate(c.width/2,c.height-15);g.scale(2.2,2.2);drawAnimatedHero(g,'down',0,0,0,null);g.restore()}finally{p.equipment=previous}}
const renderServiceWithParts=renderService;renderService=function(){renderServiceWithParts();if($('service').dataset.kind!=='smith'||npcActiveTab!=='equipment')return;const root=$('serviceBody');root.insertAdjacentHTML('afterbegin','<div class="forge-look"><canvas id="forgeLook" width="180" height="180" aria-label="Üretilmeden önce ekipman görünümü"></canvas><div><small>GÖRÜNÜM ÖNİZLEMESİ</small><h3 id="forgeLookName"></h3><p class="fine">Önizleme eşyayı kuşanmaz ve malzeme harcamaz. Ürettikten sonra B ile envanterden kuşan.</p></div></div>');root.querySelectorAll('[data-craft]').forEach(b=>b.insertAdjacentHTML('beforebegin',`<button data-look="${b.dataset.craft}">Önizle</button>`));root.querySelectorAll('[data-look]').forEach(b=>b.onclick=()=>{smithLook=b.dataset.look;$('forgeLookName').textContent=GEAR[smithLook].name;paintEquipmentLook($('forgeLook'),smithLook);$('service').scrollTop=0});$('forgeLookName').textContent=GEAR[smithLook].name;paintEquipmentLook($('forgeLook'),smithLook)};
