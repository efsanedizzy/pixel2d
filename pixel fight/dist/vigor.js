// Shared resource for sprint and Whirlwind. Simulation time pauses with panels.
const VIGOR={max:100,sprintDrain:18,regen:16,delay:1.25,resume:25,speed:1.65,spinCost:35,spinCooldown:7,spinDuration:.8};
p.stamina=Number.isFinite(p.stamina)?Math.max(0,Math.min(100,p.stamina)):100;
let sprintMultiplier=1,isSprinting=false,staminaDelay=0,exhausted=p.stamina<=0,spinCooldown=0,spinAction=null,energyPotionCooldown=0;
function startWhirlwind(){
 if(modalOpen()||spinAction||activeSwing||cooldown>0)return false;
 if(!p.sword){toast('Önce bir silah kuşan.');return false}
 if(spinCooldown>0){toast('Dönen Çelik: '+Math.ceil(spinCooldown)+' sn bekle.');return false}
 if(p.stamina<VIGOR.spinCost){toast('Dönen Çelik için 35 enerji gerekli.');return false}
 p.stamina-=VIGOR.spinCost;staminaDelay=VIGOR.delay;spinCooldown=VIGOR.spinCooldown;
 spinAction={elapsed:0,hit:false,area:p.area};cooldown=Math.max(cooldown,.85);isSprinting=false;sprintMultiplier=1;save();tone(380);return true;
}
function tickVigor(dt){
 if(modalOpen()){sprintMultiplier=1;isSprinting=false;return}
 spinCooldown=Math.max(0,spinCooldown-dt);energyPotionCooldown=Math.max(0,energyPotionCooldown-dt);
 if(spinAction){spinAction.elapsed+=dt;if(!spinAction.hit&&spinAction.elapsed>=.25){spinAction.hit=true;if(p.area==='forest'&&spinAction.area===p.area){const range=Math.min(122,Math.max(100,equippedSword().range+20));enemies.filter(e=>!e.dead&&Math.hypot(e.x-p.x,e.y-p.y)<=range).forEach(e=>{hitEnemy(e,Math.round(damage()*1.35),equippedSword().color);elementalHit(e,p.sword)})}}if(spinAction.elapsed>=VIGOR.spinDuration||spinAction.area!==p.area)spinAction=null}
 if(exhausted&&p.stamina>=VIGOR.resume)exhausted=false;
 const moving=!!(Number(!!(keys.d||keys.arrowright))-Number(!!(keys.a||keys.arrowleft))||Number(!!(keys.s||keys.arrowdown))-Number(!!(keys.w||keys.arrowup)));
 isSprinting=!!keys.shift&&moving&&!activeSwing&&!spinAction&&!exhausted&&p.stamina>0;
 if(isSprinting){p.stamina=Math.max(0,p.stamina-VIGOR.sprintDrain*dt);staminaDelay=VIGOR.delay;if(p.stamina<=0){exhausted=true;isSprinting=false;toast('Enerji tükendi · Biraz soluklan.')}}
 else{staminaDelay=Math.max(0,staminaDelay-dt);if(staminaDelay===0&&!spinAction)p.stamina=Math.min(100,p.stamina+VIGOR.regen*dt)}
 sprintMultiplier=spinAction?.55:isSprinting?VIGOR.speed:1;
}
const updateBeforeVigor=update;update=function(dt){tickVigor(dt);updateBeforeVigor(dt);renderVigor()};
const attackBeforeSpin=attack;attack=function(){if(!spinAction)return attackBeforeSpin()};
function renderVigor(){const fill=$('staminaFill');if(!fill)return;fill.style.width=p.stamina+'%';$('staminaValue').textContent=Math.floor(p.stamina)+' / 100';$('vigorHud').classList.toggle('exhausted',exhausted);$('staminaStatus').textContent=isSprinting?'KOŞU':exhausted?'TOPARLANIYOR':staminaDelay>0?'SOLUKLANIYOR':'ENERJİ';$('spinLabel').textContent=spinAction?'DÖNEN ÇELİK':spinCooldown>0?Math.ceil(spinCooldown)+' sn':'Q · Dönen Çelik';$('spinSkill').disabled=spinCooldown>0||p.stamina<35||!!spinAction;}
window.addEventListener('keydown',e=>{if(e.key.toLowerCase()!=='q'||e.ctrlKey||e.metaKey||e.altKey||['INPUT','SELECT','TEXTAREA'].includes(e.target?.tagName))return;e.preventDefault();if(!e.repeat)startWhirlwind()},true);
$('spinSkill').onclick=()=>{if(!modalOpen())startWhirlwind()};
const heroBeforeWhirlwind=drawAnimatedHero;drawAnimatedHero=function(g,face,clock,walking,phase,pose,id=p.sword){if(spinAction&&g===ctx){const t=spinAction.elapsed/VIGOR.spinDuration;face=['down','left','up','right'][Math.floor(t*8)%4];pose={whirlwind:true,progress:t,swordAngle:t*Math.PI*4,lean:0,twist:Math.sin(t*Math.PI*4)*.12,active:false};walking=0}heroBeforeWhirlwind(g,face,clock,walking,phase,pose,id)};
const drawBeforeWhirlwind=draw;draw=function(){drawBeforeWhirlwind();if(!spinAction)return;const t=spinAction.elapsed/VIGOR.spinDuration;ctx.save();ctx.translate(p.x-camera.x,p.y-camera.y-20);ctx.globalAlpha=Math.sin(t*Math.PI)*.8;ctx.strokeStyle=equippedSword().edge;ctx.lineWidth=5;for(let n=0;n<3;n++){ctx.beginPath();ctx.ellipse(0,0,90-n*9,44-n*4,0,t*Math.PI*4+n*1.7,t*Math.PI*4+n*1.7+1.8);ctx.stroke()}ctx.restore()};
ITEMS.energyPotion={name:'Enerji İksiri',kind:'consumable',color:'#8bd6a6',price:18,description:'60 enerji yeniler. 8 saniye bekleme süresi. Enerjin doluyken harcanmaz.'};
goods.energyPotion={name:ITEMS.energyPotion.name,price:18,icon:'ϟ'};p.inventory.energyPotion=Math.max(0,Math.floor(p.inventory.energyPotion||0));
if(!p.vigorVersion){p.inventory.energyPotion+=3;p.vigorVersion=1;save()}
SUPPLY_RECIPES.energyPotion={herb:2,jelly:1};
const activateBeforeEnergy=activateItem;activateItem=function(id){if(id!=='energyPotion')return activateBeforeEnergy(id);if(!itemCount(id))return false;if(p.stamina>=100){toast('Enerjin zaten dolu.');return false}if(energyPotionCooldown>0){toast('Enerji iksiri: '+Math.ceil(energyPotionCooldown)+' sn bekle.');return false}p.inventory[id]--;p.stamina=Math.min(100,p.stamina+60);energyPotionCooldown=8;exhausted=p.stamina<25;save();ui();renderVigor();toast('+60 enerji');return true};
const serviceBeforeEnergy=serviceAction;serviceAction=function(action,id){if(action!=='buyEnergy')return serviceBeforeEnergy(action,id);if(id!=='energyPotion'||p.area!=='hub'||!$('service').open||$('service').dataset.kind!=='merchant'||nearestService()?.id!=='merchant'||p.gold<35)return;p.gold-=35;p.inventory.energyPotion++;save();ui();renderService()};
const renderBeforeEnergy=renderService;renderService=function(){renderBeforeEnergy();if($('service').dataset.kind==='merchant'&&npcActiveTab==='supply'){$('serviceBody').insertAdjacentHTML('beforeend',`<div class="shop-row"><span>ϟ Enerji İksiri<small>60 enerji · 8 sn bekleme · 35 altın</small></span><button id="buyEnergy" ${p.gold<35?'disabled':''}>Satın al</button></div>`);$('buyEnergy').onclick=()=>serviceAction('buyEnergy','energyPotion')}};
const itemBeforeEnergy=drawInventoryItem;drawInventoryItem=function(c,id){if(id!=='energyPotion')return itemBeforeEnergy(c,id);const{g,R,P}=spriteTools(c);g.clearRect(0,0,72,72);P([[26,12],[46,12],[46,28],[55,39],[54,59],[46,65],[25,65],[17,57],[18,39],[26,28]],'#10242b');P([[29,18],[43,18],[43,31],[51,41],[50,56],[44,61],[27,61],[22,55],[22,41],[29,31]],'#afd9ca');P([[24,42],[49,42],[48,55],[42,59],[28,59],[24,54]],'#42976a');R(25,42,4,12,'#b9e6b2');P([[38,35],[29,49],[35,49],[32,58],[44,44],[37,44]],'#f5eaa4');R(25,10,23,9,'#8d7044');R(27,10,19,3,'#dbbd75');R(29,22,3,10,'#eff4dd')};
renderVigor();
const vigorSaved=p.vigorState||{};staminaDelay=Math.max(0,Math.min(1.25,Number(vigorSaved.delay)||0));spinCooldown=Math.max(0,Math.min(7,Number(vigorSaved.spin)||0));energyPotionCooldown=Math.max(0,Math.min(8,Number(vigorSaved.potion)||0));exhausted=!!vigorSaved.exhausted||p.stamina<=0;
const saveBeforeVigor=save;save=function(){p.vigorState={delay:staminaDelay,spin:spinCooldown,potion:energyPotionCooldown,exhausted};saveBeforeVigor()};
const swordBeforeSpinLock=equipSword;equipSword=function(id){return spinAction?false:swordBeforeSpinLock(id)};
const gearBeforeSpinLock=equipGear;equipGear=function(id){return spinAction?false:gearBeforeSpinLock(id)};
