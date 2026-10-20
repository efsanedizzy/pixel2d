// Independent equipment slots and deterministic blacksmith recipes.
const GEAR_SLOTS={helmet:'Kask / Miğfer',chest:'Zırh',gloves:'Eldiven',shield:'Kalkan',boots:'Ayakkabı',earring:'Küpe'};
const GEAR={
 travelerHelm:{name:'Gezgin Miğferi',slot:'helmet',armor:0,color:'#8ba7bb',gold:0,ore:0,crystal:0,icon:'⛑',starter:true},
 travelerChest:{name:'Gezgin Göğüslüğü',slot:'chest',armor:0,color:'#8ba7bb',gold:0,ore:0,crystal:0,icon:'▣',starter:true},
 travelerGloves:{name:'Gezgin Eldivenleri',slot:'gloves',armor:0,color:'#8ba7bb',gold:0,ore:0,crystal:0,icon:'✊',starter:true},
 travelerShield:{name:'Ocak Armalı Kalkan',slot:'shield',armor:0,color:'#8ba7bb',gold:0,ore:0,crystal:0,icon:'◈',starter:true},
 travelerBoots:{name:'Gezgin Çizmeleri',slot:'boots',armor:0,color:'#8ba7bb',gold:0,ore:0,crystal:0,icon:'♟',starter:true},
 ironShield:{name:'Demir Uçurtma Kalkan',slot:'shield',armor:3,color:'#a5b7c1',gold:95,ore:4,crystal:0,icon:'◈'},
 emberShield:{name:'Köz Güneşi Kalkanı',slot:'shield',armor:6,color:'#c99668',gold:220,ore:8,crystal:2,icon:'◈'},
 ironBoots:{name:'Ocak Demir Çizmeleri',slot:'boots',armor:2,color:'#a5b7c1',gold:65,ore:3,crystal:0,icon:'♟'},
 emberBoots:{name:'Köz Muhafızı Çizmeleri',slot:'boots',armor:4,color:'#c99668',gold:160,ore:6,crystal:1,icon:'♟'},
 ironHelm:{name:'Ocak Demir Miğferi',slot:'helmet',armor:2,color:'#a5b7c1',gold:70,ore:3,crystal:0,icon:'⛑'},
 ironChest:{name:'Ocak Plaka Zırhı',slot:'chest',armor:4,color:'#a5b7c1',gold:110,ore:5,crystal:0,icon:'▣'},
 ironGloves:{name:'Ocak Demir Eldivenleri',slot:'gloves',armor:1,damage:3,color:'#a5b7c1',gold:55,ore:2,crystal:0,icon:'✊'},
 emberHelm:{name:'Köz Muhafızı Miğferi',slot:'helmet',armor:4,color:'#c99668',gold:180,ore:7,crystal:2,icon:'⛑'},
 emberChest:{name:'Köz Muhafızı Zırhı',slot:'chest',armor:7,color:'#c99668',gold:260,ore:10,crystal:3,icon:'▣'},
 emberGloves:{name:'Köz Muhafızı Eldivenleri',slot:'gloves',armor:2,damage:6,color:'#c99668',gold:140,ore:5,crystal:1,icon:'✊'},
 moonEarring:{name:'Aytaşı Küpe',slot:'earring',damage:5,color:'#b3b9df',gold:100,ore:2,crystal:2,icon:'◉'},
 stormEarring:{name:'Fırtına Küpesi',slot:'earring',damage:10,color:'#cfacf1',gold:240,ore:4,crystal:5,icon:'◉'}
};
Object.assign(GEAR,{
 hunterChest:{name:'Avcı Deri Ceketi',slot:'chest',armor:3,damage:2,color:'#ab8961',gold:95,ore:3,crystal:0,icon:'▣'},
 hunterGloves:{name:'Avcı Bileklikleri',slot:'gloves',armor:1,damage:5,color:'#a88d68',gold:85,ore:3,crystal:0,icon:'✊'},
 mossShield:{name:'Koruluk Yuvarlak Kalkanı',slot:'shield',armor:5,color:'#94aa7b',gold:190,ore:6,crystal:2,icon:'◈'},
 shadowBoots:{name:'Gece Devriyesi Çizmeleri',slot:'boots',armor:3,damage:2,color:'#9c91bc',gold:175,ore:5,crystal:2,icon:'♟'},
 rubyEarring:{name:'Yakut Damla Küpe',slot:'earring',damage:7,armor:1,color:'#da8996',gold:185,ore:3,crystal:3,icon:'◉'}
});

Object.assign(GEAR,ADVANCED_GEAR);
// Stats are applied before ITEMS copies the catalog; saves keep ownership and upgrades.
const GEAR_POWER={
 ironHelm:[2,0],emberHelm:[4,0],silverHelm:[6,0],frostguardHelm:[8,0],ravenHelm:[10,0],nightreaverHelm:[12,4],
 hunterChest:[3,2],ironChest:[4,0],emberChest:[7,0],silverChest:[10,2],frostguardChest:[14,0],ravenChest:[17,4],nightreaverChest:[20,7],
 ironShield:[3,0],mossShield:[5,0],emberShield:[7,0],silverShield:[9,0],frostguardShield:[12,0],ravenShield:[15,0],nightreaverShield:[18,5],
 ironBoots:[2,0],shadowBoots:[3,2],emberBoots:[4,0],frostguardBoots:[6,0],nightreaverBoots:[8,4],
 ironGloves:[1,3],hunterGloves:[2,5],emberGloves:[3,7],frostguardGloves:[4,10],nightreaverGloves:[6,15],
 moonEarring:[0,4],rubyEarring:[1,6],stormEarring:[1,9],sentinelEarring:[5,6],silverEarring:[3,10],ravenEarring:[4,14],executionerEarring:[3,17],eclipseEarring:[6,20]
};
Object.entries(GEAR_POWER).forEach(([id,[armor,damage]])=>Object.assign(GEAR[id],{armor,damage}));
p.equipment=Object.assign({helmet:null,chest:null,gloves:null,earring:null},p.equipment||{});
Object.entries(GEAR).forEach(([id,g])=>{ITEMS[id]={...g,kind:'gear',stats:{armor:g.armor||0,damage:g.damage||0},description:GEAR_SLOTS[g.slot]+' · '+(g.armor?'−'+g.armor+' alınan hasar. ':'')+(g.damage?'+'+g.damage+' hasar. ':'')+'Boran’da üretilir.',price:Math.floor(g.gold*.4)};p.inventory[id]=Math.max(0,Math.floor(p.inventory[id]||0));goods[id]={name:g.name,price:ITEMS[id].price,icon:g.icon}});
if(!p.equipmentVersion){for(const id of ['travelerHelm','travelerChest','travelerGloves','travelerShield','travelerBoots']){p.inventory[id]=Math.max(1,p.inventory[id]);p.equipment[GEAR[id].slot]||=id}p.equipmentVersion=2;save()}
Object.keys(GEAR_SLOTS).forEach(slot=>{if(!GEAR[p.equipment[slot]]||GEAR[p.equipment[slot]].slot!==slot||!itemCount(p.equipment[slot]))p.equipment[slot]=null});
if(Array.isArray(saved?.quickSlots))p.quickSlots=saved.quickSlots.slice(0,5).map(id=>itemInfo(id)?id:null);
function isEquipped(id){if(!id)return false;return id==='sword:'+p.sword||id===p.accessory||Object.values(p.equipment).includes(id)}
function equipmentStats(){const out={armor:0,damage:0};Object.values(p.equipment).forEach(id=>{out.armor+=GEAR[id]?.armor||0;out.damage+=GEAR[id]?.damage||0});return out}
const beforeGearStats=accessoryStats;accessoryStats=function(){const a=beforeGearStats(),b=equipmentStats();return{...a,armor:(a.armor||0)+b.armor,damage:(a.damage||0)+b.damage}};
function equipGear(id){const g=GEAR[id];if(!g||!itemCount(id)||activeSwing)return false;p.equipment[g.slot]=p.equipment[g.slot]===id?null:id;save();ui();toast(p.equipment[g.slot]?g.name+' kuşanıldı.':GEAR_SLOTS[g.slot]+' çıkarıldı.');return true}
const beforeGearActivate=activateItem;activateItem=function(id){if(GEAR[id])return equipGear(id);return beforeGearActivate(id)};
function forgeGear(id){const g=GEAR[id];if(!g||itemCount(id)||p.gold<g.gold||p.inventory.ore<g.ore||p.inventory.crystal<g.crystal)return false;p.gold-=g.gold;p.inventory.ore-=g.ore;p.inventory.crystal-=g.crystal;p.inventory[id]=1;save();ui();toast(g.name+' üretildi. B ile envanterden kuşan.');return true}
const beforeGearTabs=npcTabNames;npcTabNames=function(id){return id==='smith'?[['upgrade','Güçlendir'],['forge','Kılıç üret'],['equipment','Zırh ve takı üret']]:beforeGearTabs(id)};
const beforeGearService=serviceAction;serviceAction=function(action,id){if(action==='weapon'&&!p.sword){toast('Güçlendirmek için bir kılıç kuşan.');return}if($('service').dataset.kind==='smith'&&$('service').open&&p.area==='hub'&&nearestService()?.id==='smith'&&action==='forgeGear'){forgeGear(id);renderService();return}if(action==='sell'&&isEquipped(id)){toast('Kuşanılmış eşya satılamaz. Önce çıkar.');return}if(action==='sellAll'){const kept={};Object.values(p.equipment).filter(Boolean).forEach(id=>{kept[id]=p.inventory[id];p.inventory[id]=0});beforeGearService(action,id);Object.assign(p.inventory,kept);save();ui();renderService();return}beforeGearService(action,id)};
const beforeGearRenderService=renderService;renderService=function(){beforeGearRenderService();if($('service').dataset.kind!=='smith'||npcActiveTab!=='equipment')return;const root=$('serviceBody');root.innerHTML='<div class="npc-tabs">'+npcTabNames('smith').map(([id,t])=>`<button data-gear-tab="${id}" class="${id===npcActiveTab?'selected':''}">${t}</button>`).join('')+'</div><p>Miğfer, zırh, eldiven, kalkan, ayakkabı ve küpe ayrı üretilir ve ayrı kuşanılır. Her tarif bir kez üretilir; malzemeler yalnızca başarılı üretimde harcanır.</p>'+Object.entries(GEAR).filter(([,g])=>!g.starter).map(([id,g])=>`<div class="shop-row"><span style="color:${g.color}">${g.icon} ${g.name}<small>${GEAR_SLOTS[g.slot]} · ${g.armor?'−'+g.armor+' hasar ':''}${g.damage?'+'+g.damage+' saldırı':''}<br>${g.gold} altın · ${g.ore} cevher · ${g.crystal} kristal</small></span><button data-craft="${id}" ${itemCount(id)||p.gold<g.gold||p.inventory.ore<g.ore||p.inventory.crystal<g.crystal?'disabled':''}>${itemCount(id)?'Çantanda var':'Üret'}</button></div>`).join('');root.querySelectorAll('[data-gear-tab]').forEach(b=>b.onclick=()=>{npcActiveTab=b.dataset.gearTab;renderService()});root.querySelectorAll('[data-craft]').forEach(b=>b.onclick=()=>serviceAction('forgeGear',b.dataset.craft))};
// Equipment uses the same animated knight in the world and the inventory portrait.
const beforeBagPreview=drawHeroPreview;drawHeroPreview=function(){beforeBagPreview();if(!$('bag').open)return;const c=$('bagHero');if(!c)return;const g=c.getContext('2d');g.clearRect(0,0,c.width,c.height);g.save();g.translate(100,187);g.scale(2.25,2.25);drawAnimatedHero(g,'down',weaponClock,0,0,null);g.restore()};
