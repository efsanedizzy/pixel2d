// A peaceful hub and its persistent economy. The forest remains a separate map.
const HUB={w:3840,h:2880};
p.inventory=Object.assign({jelly:0,ore:0,crystal:0},p.inventory||{});
p.weapon=p.weapon||0;p.armor=p.armor||0;p.area='hub';p.x=1920;p.y=1745;p.training=p.training||0;p.lastBounty=p.lastBounty||0;
const goods={jelly:{name:'Slime özü',price:8,icon:'●'},ore:{name:'Demir cevheri',price:15,icon:'◆'},crystal:{name:'Orman kristali',price:30,icon:'✧'}};
const services=[
 {id:'merchant',x:420,y:665,name:'Nara · Tüccar',hint:'Ganimet sat / iksir al',color:'#efc684'},
 {id:'smith',x:1500,y:665,name:'Boran · Demirci',hint:'Kılıç ve zırh güçlendir',color:'#efa783'},
 {id:'healer',x:425,y:1070,name:'Mira · Şifacı',hint:'Ücretsiz iyileş',color:'#b4e1ad'},
 {id:'alchemist',x:1490,y:1090,name:'Luma · Simyacı',hint:'Ganimetlerden iksir üret',color:'#d0b1f0'},
 {id:'cartographer',x:700,y:370,name:'Sera · Haritacı',hint:'Rotaları ve köyü keşfet',color:'#96d5d2'},
 {id:'trainer',x:1250,y:370,name:'Varg · Muhafız',hint:'Eğitim / av ödülleri',color:'#edb595'},
 {id:'innkeeper',x:970,y:1320,name:'Runa · Hancı',hint:'Dinlen / yol azığı al',color:'#e9bf9e'},
 {id:'forest',x:1730,y:835,name:'Fısıltılı Orman',hint:'Zindan 01 · Giriş açık',color:'#b8e892'},
 {id:'crypt',x:190,y:835,name:'Kül Mahzenleri',hint:'Zindan 02 · Yakında',color:'#b3a4db'},
 {id:'arena',x:1630,y:1290,name:'Savaş Arenası',hint:'Savaş alanı · Yakında',color:'#d6a09a'}];
const buildings=[
 {id:'merchant',x:270,y:420,w:250,h:145,roof:'#a8774f',name:'RÜZGÂR PAZARI',style:'market'},
 {id:'smith',x:1370,y:420,w:260,h:150,roof:'#4f5260',name:'KARA ÖRS',style:'forge'},
 {id:'healer',x:275,y:830,w:235,h:140,roof:'#64835d',name:'KÖK SIĞINAĞI',style:'sanctuary'},
 {id:'alchemist',x:1400,y:835,w:190,h:160,roof:'#725581',name:'AYIŞIĞI LABORATUVARI',style:'tower'},
 {id:'cartographer',x:570,y:165,w:220,h:110,roof:'#39838a',name:'ROTA ATÖLYESİ',style:'sail'},
 {id:'trainer',x:1100,y:165,w:255,h:115,roof:'#965453',name:'MUHAFIZ OCAĞI',style:'bastion'},
 {id:'innkeeper',x:820,y:1095,w:270,h:135,roof:'#a36c46',name:'YOLCU HANI',style:'inn'}];

// Districts spread out around a larger, walkable medieval town.
function townX(x){return Math.round(1920+(x-960)*1.45)}
function townY(y){return Math.round(1440+(y-700)*1.4)}
services.forEach(s=>{s.x=townX(s.x);s.y=townY(s.y)});
buildings.forEach(b=>{b.x=townX(b.x);b.y=townY(b.y);b.w=Math.round(b.w*1.22);b.h=Math.round(b.h*1.08)});
services.forEach(s=>{const b=buildings.find(b=>b.id===s.id);if(b){s.x=Math.round(b.x+b.w*.52+53);s.y=b.y+b.h+(b.style==='market'?68:46)}});
function modalOpen(){return ['help','service','bag','character','journal','relics','mapPanel','swords'].some(id=>$(id).open)}
function damage(){return 25+(p.level-1)*4+p.weapon*7+p.training*3}
function loot(e){p.inventory.jelly+=1+(e.rank>2?1:0);if(rand()<.55)p.inventory.ore++;if(rand()<.16)p.inventory.crystal++;refreshBag()}
function refreshBag(){$('bagSummary').textContent=Object.entries(goods).map(([k,g])=>`${g.icon} ${p.inventory[k]} ${g.name}`).join(' · ');$('equipment').textContent=`Kılıç +${p.weapon} · ${damage()} hasar | Zırh +${p.armor} · −${p.armor*2} hasar`;$('villageGold').textContent=p.gold+' altın';$('bagContents').textContent=Object.entries(goods).map(([k,g])=>g.name+': '+p.inventory[k]+' adet').join(' / ')+' · '+p.gold+' altın · '+p.potions+' iksir';}
function nearestService(){return services.filter(s=>Math.hypot(p.x-s.x,p.y-s.y)<95).sort((a,b)=>Math.hypot(p.x-a.x,p.y-a.y)-Math.hypot(p.x-b.x,p.y-b.y))[0]}
function openService(id){if(p.area!=='hub')return;const target=services.find(s=>s.id===id);if(!target||Math.hypot(p.x-target.x,p.y-target.y)>=95){toast('İşlem için ilgili kişiye veya kapıya yaklaş.');return}keys={};$('service').dataset.kind=id;renderService();if(!$('service').open)$('service').showModal()}
function serviceAction(action,key){const id=$('service').dataset.kind;if(p.area!=='hub'||!$('service').open||nearestService()?.id!==id)return;
 if(action==='sell'){const count=p.inventory[key];if(!count)return;p.gold+=count*goods[key].price;p.inventory[key]=0;toast(goods[key].name+' satıldı.');}
 if(action==='sellAll'){let amount=0;Object.keys(goods).forEach(k=>{amount+=p.inventory[k]*goods[k].price;p.inventory[k]=0});if(!amount)return;p.gold+=amount;log('Tüccara ganimet satıldı · +'+amount+' altın');}
 if(action==='buy'){if(p.gold<20)return;p.gold-=20;p.potions++;}
 if(action==='weapon'||action==='armor'){let tier=p[action],cost=60+tier*45,ore=2+tier;if(tier>=10||p.gold<cost||p.inventory.ore<ore)return;p.gold-=cost;p.inventory.ore-=ore;p[action]++;if(action==='weapon')p.swordUpgrades[p.sword]=p.weapon;log((action==='weapon'?'Kılıç':'Zırh')+' +'+p[action]+' güçlendirildi.');tone(650);}
 if(action==='forgeSword'){forgeSword(key);return;}
 if(action==='heal'){p.hp=p.maxHp;toast('Mira canını tamamen yeniledi.');}
 if(action==='brew'){if(id!=='alchemist'||p.inventory.jelly<3||p.inventory.crystal<1)return;p.inventory.jelly-=3;p.inventory.crystal--;p.potions+=2;toast('Luma 2 can iksiri hazırladı.');}
 if(action==='train'){let cost=100+p.training*60;if(id!=='trainer'||p.training>=5||p.gold<cost)return;p.gold-=cost;p.training++;log('Varg ile eğitim · +' +p.training*3+' toplam hasar');}
 if(action==='bounty'){if(id!=='trainer'||p.kills-p.lastBounty<10)return;p.lastBounty+=10;p.gold+=120;xp(60);toast('Av ödülü: +120 altın ve 60 temel XP');}
 if(action==='supply'){if(id!=='innkeeper'||p.gold<25)return;p.gold-=25;p.hp=p.maxHp;p.potions++;toast('Runa: Sıcak bir yemek, bir iksir. Yolun açık olsun.');}
 if(action==='map'){if(id!=='cartographer')return;$('service').close();openPanel('mapPanel');return;}
 if(action==='enter'){enterForest();return}ui();refreshBag();save();renderService();
}
function renderService(){const id=$('service').dataset.kind,s=services.find(s=>s.id===id);$('serviceTitle').textContent=s.name;let html='';
 if(id==='merchant'){html='<p>Ganimetlerini altına çevir. Demir cevherini güçlendirme için saklayabilirsin.</p>';Object.entries(goods).forEach(([k,g])=>html+=`<div class="shop-row"><span>${g.icon} ${g.name}<small>${p.inventory[k]} adet · Birimi ${g.price} altın</small></span><button data-action="sell" data-item="${k}" ${!p.inventory[k]?'disabled':''}>Sat · ${p.inventory[k]*g.price} ◆</button></div>`);html+=`<div class="shop-actions"><button data-action="sellAll" ${!Object.values(p.inventory).some(n=>n>0)?'disabled':''}>Tüm ganimeti sat</button><button data-action="buy" ${p.gold<20?'disabled':''}>İksir al · 20 ◆</button></div>`;}
 else if(id==='smith'){html='<p>Güçlendirme garantilidir. Kılıç her kademede +7 hasar, zırh −2 alınan hasar verir. En fazla +10.</p>';['weapon','armor'].forEach(k=>{let n=p[k],cost=60+n*45,ore=2+n;html+=`<div class="shop-row"><span>${k==='weapon'?'⚔ '+equippedSword().name:'▣ Zırh'} +${n}<small>${n>=10?'En yüksek kademe':`${cost} altın + ${ore} demir cevheri`}</small></span><button data-action="${k}" ${n>=10||p.gold<cost||p.inventory.ore<ore?'disabled':''}>${n>=10?'Tamamlandı':'Güçlendir → +'+(n+1)}</button></div>`});html+=`<p class="fine">Kuşanılmış kılıç: ${equippedSword().name}. Her kılıcın + seviyesi ayrı saklanır. +3, +6 ve +9’da parıltı yoğunlaşır. Çantanda ${p.inventory.ore} cevher var.</p>`+swordCatalogHTML();}
 else if(id==='healer')html=`<p>Yola çıkmadan önce dinlen. Mevcut canın: ${Math.ceil(p.hp)} / ${p.maxHp}.</p><button data-action="heal" ${p.hp===p.maxHp?'disabled':''}>Ücretsiz iyileş</button>`;
 else if(id==='alchemist')html=`<p>“Orman hiçbir şeyi boşa yaratmaz.” Luma, topladığın özleri ve kristalleri iksire dönüştürür.</p><div class="dungeon-info">Tarif: 3 Slime özü + 1 Orman kristali → 2 can iksiri<br>Çantanda: ${p.inventory.jelly} öz / ${p.inventory.crystal} kristal</div><button data-action="brew" ${p.inventory.jelly<3||p.inventory.crystal<1?'disabled':''}>2 iksir üret</button>`;
 else if(id==='cartographer')html='<p>“Köy bir pusuladır. Her sokak başka bir hikâyeye açılır.” Sera yeni rotaları arşivler.</p><div class="dungeon-info">Doğu: Fısıltılı Orman · Açık<br>Batı: Kül Mahzenleri · Yakında<br>Güneydoğu: Savaş Arenası · Yakında</div><button data-action="map">Köy haritasını incele →</button>';
 else if(id==='trainer')html=`<p>Varg, Ocak muhafızlarının emekli kaptanı. Eğitim her kademede kalıcı +3 hasar verir.</p><div class="shop-row"><span>Eğitim ${p.training} / 5<small>${100+p.training*60} altın</small></span><button data-action="train" ${p.training>=5||p.gold<100+p.training*60?'disabled':''}>${p.training>=5?'Ustalık tamamlandı':'Eğitim al'}</button></div><div class="shop-row"><span>Orman devriyesi<small>${Math.min(10,Math.max(0,p.kills-p.lastBounty))} / 10 yaratık · Tekrarlanabilir</small></span><button data-action="bounty" ${p.kills-p.lastBounty<10?'disabled':''}>120 ◆ + 60 XP al</button></div>`;
 else if(id==='innkeeper')html=`<p>Runa’nın hanında sıcak yemek ve yol hikâyeleri hiç eksilmez. Yemek canını doldurur, yanına bir iksir verilir.</p><div class="dungeon-info">Tam can + 1 can iksiri · 25 altın</div><button data-action="supply" ${p.gold<25?'disabled':''}>Dinlen ve azık al · 25 ◆</button>`;
 else if(id==='forest')html='<p>İlk zindanımız: mevcut geniş orman haritası. Slime’larla savaş, öz, cevher ve kristal topla. Çıkış kapısından veya R tuşuyla geri gel.</p><div class="dungeon-info">ZİNDAN 01 · Dört bölge · Seviye 1–6<br>Ganimet: Slime özü / Demir cevheri / Orman kristali</div><button data-action="enter">Fısıltılı Orman’a gir →</button>';
 else html='<p>Bu geçit henüz açılmadı. Şimdilik Kara Taş Mahzeni’ni keşfedebilirsin.</p><div class="dungeon-info">YAKINDA · Giriş kapalı</div>';
 $('serviceBody').innerHTML=html;drawServicePortrait(s);$('serviceGold').textContent=p.gold+' altın';$('serviceBody').querySelectorAll('[data-action]').forEach(b=>b.onclick=()=>serviceAction(b.dataset.action,b.dataset.item));}
function enterForest(){$('service').close();p.area='forest';p.x=280;p.y=330;currentZone='';particles=[];keys={};$('returnVillage').hidden=false;save();toast('Zindan 01 · Fısıltılı Orman');}
function returnVillage(){if(p.area==='hub')return;p.area='hub';const gate=services.find(s=>s.id==='forest');p.x=gate.x-120;p.y=gate.y+45;p.hp=Math.max(1,p.hp);currentZone='';particles=[];keys={};$('returnVillage').hidden=true;refreshBag();save();toast('Ocak Köyü’ne döndün. Ganimetlerini tüccara satabilirsin.');}
function interact(){if(modalOpen())return;if(p.area==='hub'){const s=nearestService();if(s)openService(s.id);else toast('Bir köylüye veya zindan kapısına yaklaş ve E tuşuna bas.');}else if(Math.hypot(p.x-280,p.y-330)<100)returnVillage();else heal();}
function hubBlocked(x,y){return [...buildings,...townLandmarks].some(b=>{const r=buildingBounds(b);return x>r.left&&x<r.right&&y>r.top&&y<r.bottom})||Math.hypot((x-CORE.x)/1.2,y-CORE.y)<72||Math.hypot((x-650)/180,(y-1510)/115)<1;}
function updateHub(dt){time+=dt;if(!modalOpen()){let dx=Number(!!(keys.d||keys.arrowright))-Number(!!(keys.a||keys.arrowleft)),dy=Number(!!(keys.s||keys.arrowdown))-Number(!!(keys.w||keys.arrowup)),n=Math.hypot(dx,dy)||1,v=185*sprintMultiplier*(p.boost==='speed'?1.15:1)*(activeSwing?.4:1);let x=Math.max(40,Math.min(HUB.w-40,p.x+dx/n*v*dt)),y=Math.max(115,Math.min(HUB.h-35,p.y+dy/n*v*dt));if(!hubBlocked(x,p.y))p.x=x;if(!hubBlocked(p.x,y))p.y=y;}
 const s=nearestService();$('interactHint').textContent=s?`E · ${s.name} — ${s.hint}`:'';$('interactHint').hidden=false;$('coords').textContent=Math.round(p.x)+', '+Math.round(p.y);if(currentZone!=='Ocak Köyü'){currentZone='Ocak Köyü';document.querySelector('.zone span').innerHTML='OCAK KÖYÜ<small>Merkez · Güvenli bölge</small>';document.querySelector('.game-bottom>span>span').textContent=' / Ocak Köyü';$('returnVillage').hidden=true;refreshBag();} $('toast').style.opacity=time<toastUntil?1:0;
}
$('closeService').onclick=()=>$('service').close();$('service').addEventListener('close',()=>keys={});$('bag').addEventListener('close',()=>keys={});$('returnVillage').onclick=returnVillage;$('heal').onclick=interact;$('bagButton').onclick=()=>{refreshBag();$('bag').showModal();keys={}};$('closeBag').onclick=()=>$('bag').close();
refreshBag();

