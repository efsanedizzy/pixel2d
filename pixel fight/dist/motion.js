// Camera interaction, readable world labels, village access and articulated animation.
function setCameraZoom(value){cameraZoom=Math.max(.65,Math.min(2.4,value));resizeGame();try{localStorage.setItem('giwa-camera-zoom',String(cameraZoom))}catch{}return cameraZoom}
canvas.addEventListener('wheel',e=>{if(modalOpen())return;e.preventDefault();setCameraZoom(cameraZoom*Math.exp(-Math.max(-1,Math.min(1,e.deltaY/100))*.15));},{passive:false});
canvas.addEventListener('mousedown',e=>{if(e.button!==1)return;e.preventDefault();setCameraZoom(1);toast('Yakınlaştırma sıfırlandı.')});canvas.addEventListener('auxclick',e=>{if(e.button===1)e.preventDefault()});
label=function(t,x,y,c='#eee2bd',size=11){if(!t||((t==='Gezgin'||t==='GEZGİN')&&p.area==='hub'&&nearestService()))return;const scale=window.innerWidth/VIEW.w,px=Math.max(size,Math.round((size>=11?13:11)/scale));ctx.save();ctx.font=`600 ${px}px "Segoe UI", sans-serif`;ctx.textAlign='center';ctx.textBaseline='alphabetic';const w=ctx.measureText(t).width,pad=3/scale;const screenX=(x-camera.x)*scale,screenY=(y-camera.y)*scale,half=w*scale/2;if((screenY>0&&screenY<135&&screenX+half>10&&screenX-half<225)||(screenY>0&&screenY<65&&screenX+half>window.innerWidth-190)){ctx.restore();return}ctx.fillStyle='#101a23b8';ctx.fillRect(x-w/2-pad,y-px*.94,w+pad*2,px*1.16);ctx.lineJoin='round';ctx.lineWidth=2.5/scale;ctx.strokeStyle='#101821';ctx.strokeText(t,x,y);ctx.fillStyle=c;ctx.fillText(t,x,y);ctx.restore();};

const portalApproaches=services.filter(s=>!npcInfo[s.id]).map(s=>({kind:'portal',id:s.id,width:74,points:s.id==='forest'?[[PLAZA.x+PLAZA.w,1410],[2920,1410],[s.x,1510],[s.x,s.y+32]]:s.id==='crypt'?[[PLAZA.x,1410],[1050,1410],[870,1390],[850,1670],[s.x,s.y+32]]:[[PLAZA.x+PLAZA.w,PLAZA.y+PLAZA.h],[2890,1880],[2890,s.y+32],[s.x,s.y+32]]}));
const townRoads=[
 {width:100,points:[[1920,PLAZA.y],[1920,760],[1908,650]]},
 {width:86,points:[[PLAZA.x,1410],[1050,1410],[850,1390],[800,1320],[380,1320]]},
 {width:94,points:[[PLAZA.x+PLAZA.w,1410],[2920,1410],[3500,1600]]},
 {width:86,points:[[1920,PLAZA.y+PLAZA.h],[2190,1880],[2190,2380],[2900,2380],[3150,2200]]},
 {width:82,points:[[PLAZA.x,1850],[1300,1850],[1300,2100],[1050,2380],[776,2480],[776,2340]]},
 {width:70,points:[[3055,840],[3055,1000],[2920,1410]]},
 {width:70,points:[[3160,2085],[3160,2200],[2900,2380]]},...portalApproaches
];
services.filter(s=>npcInfo[s.id]).forEach(s=>{let points;if(s.id==='innkeeper')points=[[PLAZA.x+PLAZA.w,PLAZA.y+PLAZA.h],[2190,1880],[2190,s.y+28],[s.x,s.y+28],[s.x,s.y]];else if(s.id==='cartographer'||s.id==='trainer')points=[[s.x,PLAZA.y],[s.x,s.y]];else points=[[s.x<CORE.x?PLAZA.x:PLAZA.x+PLAZA.w,s.y],[s.x,s.y]];townRoads.push({kind:'npc',id:s.id,width:58,points});});

function medievalDetails(b){const{x,y,w,h,style}=b,bottom=y+h,cx=x+w*.52;
 // Thick corner quoins, weathered stone plinths, timber braces and forged door furniture.
 for(let yy=y+12;yy<bottom-5;yy+=20){rect(x-3,yy,12,17,'#9a9e8955');rect(x+w-9,yy,12,17,'#555e5766');rect(x-2,yy+1,11,2,'#b9b89c55')}
 rect(x-3,bottom-11,w+6,6,'#283a3b');rect(x-3,bottom-5,w+6,5,'#737c6b');
 if(['market','inn','sail','stable','mill','sanctuary'].includes(style)){rect(x+8,y+8,8,h-20,'#352e2c');rect(x+w-16,y+8,8,h-20,'#352e2c');rect(x+8,y+66,w-16,6,'#40342e');for(const [xx,sign]of [[x+17,1],[x+w-22,-1]])polygon([[xx,y+12],[xx+sign*6,y+12],[xx+sign*55,y+62],[xx+sign*49,y+62]],'#4c3d32');}
 // Small iron studs and a hanging trade sign reinforce the medieval scale.
 for(const yy of [bottom-51,bottom-29]){rect(cx-17,yy,35,3,'#3b3d3d');rect(cx-16,yy,2,2,'#baa47a');rect(cx+15,yy,2,2,'#baa47a')}
 const signX=x+w-24;rect(signX,y+69,34,4,'#2e3030');rect(signX+28,y+72,2,11,'#8e8771');rect(signX+5,y+83,40,26,'#302c2a');rect(signX+7,y+85,36,22,'#7c6749');
 const icons={market:'◆',forge:'⚒',sanctuary:'✚',tower:'✧',sail:'⌖',bastion:'⚔',inn:'☕',chapel:'✝',stable:'H',mill:'✣'};ctx.save();ctx.font='17px Georgia';ctx.textAlign='center';ctx.fillStyle='#dbc79c';ctx.fillText(icons[style]||'◆',signX+25,y+102);ctx.restore();
 if(style==='chapel'||style==='bastion'){const tx=x+w*.28,ty=y-152;rect(tx,ty,48,70,'#535e61');rect(tx-4,ty-4,56,8,'#858a79');for(let i=0;i<4;i++)rect(tx+i*14,ty-14,8,12,'#697267');rect(tx+19,ty+20,10,26,'#24333b');rect(tx+20,ty+21,7,18,'#c7a969');}
 if(style==='inn'){rect(x+36,y-126,25,35,'#545950');rect(x+33,y-130,31,7,'#9b9b82')}
}

let activeSwing=null,comboIndex=0,walkPhase=0,walkBlend=0,walkTravel=0,footPuffs=[];
function startSwing(){const a=Math.atan2(Math.sin(attackAngle),Math.cos(attackAngle));p.facing=Math.abs(Math.cos(a))>.65?(Math.cos(a)>0?'right':'left'):(Math.sin(a)>0?'down':'up');activeSwing={elapsed:0,duration:.54,impact:.21,applied:false,direction:attackAngle,combo:comboIndex++%2};}
function swingPose(progress,angle=attackAngle,combo=0){const t=Math.max(0,Math.min(1,progress)),sign=combo?-1:1,ease=v=>1-Math.pow(1-v,3);let arc,lean,twist;
 if(t<.26){const q=t/.26;arc=(-.95-.5*q)*sign;lean=-2*q;twist=-.08*q*sign;}
 else if(t<.54){const q=ease((t-.26)/.28);arc=(-1.45+2.9*q)*sign;lean=Math.sin(q*Math.PI)*5;twist=(-.08+.22*q)*sign;}
 else{const q=ease((t-.54)/.46);arc=1.45*(1-q)*sign;lean=1.5*(1-q);twist=.14*(1-q)*sign;}
 const raw=angle+Math.PI/2+arc,swordAngle=Math.atan2(Math.sin(raw),Math.cos(raw));return{swordAngle,lean,twist,active:t>=.26&&t<.54,progress:t};}
function updateMotion(dt,dx=0,dy=0){if(modalOpen())return;const distance=Math.hypot(dx,dy),moving=distance>.001;walkBlend+=(Number(moving)-walkBlend)*Math.min(1,dt*14);if(moving){walkPhase+=distance*.065;walkTravel+=distance;if(walkTravel>46){walkTravel%=46;footPuffs.push({x:p.x,y:p.y-1,life:.28})}}footPuffs.forEach(f=>f.life-=dt);footPuffs=footPuffs.filter(f=>f.life>0).slice(-12);if(activeSwing){activeSwing.elapsed+=dt;if(!activeSwing.applied&&activeSwing.elapsed>=activeSwing.impact){activeSwing.applied=true;resolveSwordHit()}if(activeSwing.elapsed>=activeSwing.duration){activeSwing=null;swing=0}}}
const heroLayers=new Map();
function layersFor(face){if(heroLayers.has(face))return heroLayers.get(face);const src=heroSprite(face),body=document.createElement('canvas');body.width=56;body.height=72;const g=body.getContext('2d');g.drawImage(src,0,0);g.clearRect(15,53,28,19);g.clearRect(3,39,20,26);g.clearRect(39,40,10,18);const pack={body,src};heroLayers.set(face,pack);return pack;}
function drawAnimatedHero(g,face,clock,walking,phase,pose,id=p.sword){const l=layersFor(face),stride=Math.sin(phase)*walking,bob=Math.abs(Math.cos(phase))*walking*1.4,side=face==='left'?-1:1;g.save();if(pose)g.translate(Math.cos(attackAngle)*pose.lean,Math.sin(attackAngle)*pose.lean*.55);g.fillStyle='#13283c';g.beginPath();g.moveTo(-15,-35);g.lineTo(13,-35);g.lineTo(15+stride*2,-7);g.lineTo(-19+stride*2,-5);g.closePath();g.fill();
 // Each leg is a separate joint; opposite steps lift the boot and rotate the shin.
 for(const [x,sign]of [[-7,1],[7,-1]]){const lift=Math.max(0,stride*sign)*2.5;g.save();g.translate(x,-15-lift);g.rotate(stride*sign*.34+(pose?sign*.06:0));drawEquippedBoot(g,p.equipment.boots);g.restore()}
 g.save();g.translate(0,-31-bob);g.rotate(pose?pose.twist:stride*.025);g.drawImage(l.body,-28,-37);if(l.head)g.drawImage(l.head,-28,-37);g.restore();
 // Shield and sword arm counter-swing against the legs rather than moving as one sprite.
 g.save();g.translate(-13,-28-bob);g.rotate(pose?-pose.twist*1.4:-stride*.15);g.drawImage(l.shield||l.src,0,0,20,26,-12,-1,20,26);g.restore();
 const idle=side*.28+stride*.12,bladeAngle=pose?pose.swordAngle:idle,arm=pose?Math.max(-1.1,Math.min(1.1,bladeAngle*.4)):stride*.16;g.save();g.translate(side*15,-28-bob);g.rotate(arm);g.drawImage(l.arm||l.src,0,0,10,18,-4,0,10,18);g.translate(side*5,12);g.rotate(bladeAngle-arm);g.scale(.72,.72);blade(g,id,p.swordUpgrades[id]);g.restore();g.restore();}
person=function(x,y,npc=false){if(npc){oldPersonArt(x,y,true);return}footPuffs.forEach(f=>{ctx.save();ctx.globalAlpha=f.life/.28*.2;rect(f.x-3,f.y-3,6,3,'#c0b693');ctx.restore()});shadow(x,y,15);const pose=activeSwing?swingPose(activeSwing.elapsed/activeSwing.duration,activeSwing.direction,activeSwing.combo):null;ctx.save();ctx.translate(Math.round(x),Math.round(y));drawAnimatedHero(ctx,p.facing||'down',weaponClock,walkBlend,walkPhase,pose);ctx.restore();if(pose?.active)drawSlash(x,y,equippedSword());};
drawSlash=function(x,y,s){if(!activeSwing)return;const pose=swingPose(activeSwing.elapsed/activeSwing.duration,activeSwing.direction,activeSwing.combo);if(!pose.active)return;const angle=pose.swordAngle-Math.PI/2,r=s.range*.72;ctx.save();ctx.translate(x,y-24);for(let i=0;i<3;i++){ctx.globalAlpha=.52-i*.13;ctx.strokeStyle=i?s.color:s.edge;ctx.lineWidth=4-i;ctx.beginPath();ctx.arc(0,0,r-i*3,angle-(activeSwing.combo?-.42:.42),angle,!!activeSwing.combo);ctx.stroke()}ctx.globalAlpha=.8;for(let i=0;i<s.level;i++){const xx=Math.cos(angle-i*.08)*r,yy=Math.sin(angle-i*.08)*r;rect(xx,yy,2,2,s.color)}ctx.restore();};
drawHeroPreview=function(){if(!$('character').open&&!$('swords').open)return;const isSword=$('swords').open,c=$(isSword?'swordPreview':'heroPreview');if(!c)return;const g=c.getContext('2d'),id=isSword?selectedSword:p.sword;g.clearRect(0,0,c.width,c.height);g.fillStyle='#17202d';g.fillRect(0,0,c.width,c.height);g.save();g.translate(c.width/2,c.height-25);g.scale(2.25,2.25);g.fillStyle='#101725';g.beginPath();g.ellipse(0,0,23,6,0,0,7);g.fill();drawAnimatedHero(g,'down',weaponClock,.7,weaponClock*6,null,id);g.restore();if(isSword)previewElement(g,id,c.width,c.height);};


