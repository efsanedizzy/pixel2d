// Tiered recipes are loaded before player equipment validation for persistent saves.
const EQUIPMENT_SETS={
 frostguard:{name:'Ayaz Nöbetçisi',color:'#9ccbd7',role:'Savunma',bonuses:[{pieces:3,armor:4,damage:0},{pieces:5,armor:3,damage:3}]},
 nightreaver:{name:'Gece Biçeni',color:'#bb9fd4',role:'Hasar',bonuses:[{pieces:3,armor:0,damage:6},{pieces:5,armor:4,damage:4}]}
};
const ADVANCED_GEAR={};
const SET_PIECES=[['Helm','helmet','Miğferi'],['Chest','chest','Zırhı'],['Gloves','gloves','Eldivenleri'],['Shield','shield','Kalkanı'],['Boots','boots','Çizmeleri']];
SET_PIECES.forEach(([suffix,slot,title],index)=>{
 ADVANCED_GEAR['frostguard'+suffix]={name:'Ayaz Nöbetçisi '+title,slot,set:'frostguard',level:4,armor:[5,10,3,8,4][index],damage:[0,0,4,0,0][index],color:'#9ccbd7',gold:[310,540,270,420,290][index],ore:[8,13,6,10,7][index],crystal:[3,5,2,4,2][index],icon:'◆'};
 ADVANCED_GEAR['nightreaver'+suffix]={name:'Gece Biçeni '+title,slot,set:'nightreaver',level:6,armor:[3,6,2,5,3][index],damage:[3,5,10,4,3][index],color:'#bb9fd4',gold:[420,720,390,560,410][index],ore:[10,17,9,13,10][index],crystal:[4,7,4,5,4][index],icon:'◆'};
});
Object.assign(ADVANCED_GEAR,{
 sentinelEarring:{name:'Siper Taşı Küpe',slot:'earring',level:3,armor:4,damage:2,color:'#9bbebc',gold:220,ore:3,crystal:3,icon:'◉'},
 executionerEarring:{name:'Celladın Yakut Küpesi',slot:'earring',level:5,armor:1,damage:12,color:'#d8a08e',gold:410,ore:5,crystal:5,icon:'◉'},
 eclipseEarring:{name:'Tutulma İkizi Küpe',slot:'earring',level:6,armor:3,damage:10,color:'#c5a0d8',gold:530,ore:6,crystal:6,icon:'◉'}
});
const ADVANCED_ACCESSORIES={
 guardianPendant:{name:'Muhafızın Kalp Tılsımı',kind:'accessory',level:3,color:'#a6c9bc',price:130,craftGold:260,stats:{hp:35,armor:2},description:'Tılsım yuvası · +35 azami can, +2 savunma. Boran’da üretilebilir. Kuşanmak mevcut canı doldurmaz.'},
 bloodPendant:{name:'Kızıl Yemin Kolyesi',kind:'accessory',level:5,color:'#d89f9e',price:240,craftGold:480,stats:{damage:14},description:'Tılsım yuvası · +14 hasar. Hasar odaklı bir üretim aksesuarı.'},
 archonCharm:{name:'Kadim Hükümdar Muskası',kind:'accessory',level:6,color:'#ccb2db',price:340,craftGold:680,stats:{hp:55,armor:5,damage:18},description:'Tılsım yuvası · +55 azami can, +5 savunma, +18 hasar. Kuşanmak mevcut canı doldurmaz.'}
};
const ADVANCED_MATERIALS={
 frostguardHelm:{frostSeal:1,wolfPelt:2},frostguardChest:{frostSeal:2,wolfPelt:4},frostguardGloves:{wolfPelt:2,coal:4},frostguardShield:{frostSeal:1,ancientShard:3},frostguardBoots:{leather:6,wolfPelt:2},
 nightreaverHelm:{voidSeal:1,ancientShard:4},nightreaverChest:{voidSeal:2,ancientShard:6},nightreaverGloves:{stormSeal:1,fang:6},nightreaverShield:{stormSeal:1,ancientShard:4},nightreaverBoots:{wolfPelt:4,ancientShard:3},
 sentinelEarring:{crystal:3,herb:4},executionerEarring:{thornSeal:1,fang:5},eclipseEarring:{voidSeal:1,ancientShard:4},
 guardianPendant:{herb:6,crystal:3},bloodPendant:{thornSeal:1,fang:6,crystal:4},archonCharm:{voidSeal:1,stormSeal:1,crystal:6}
};

// Two complete visual families, registered before save/equipment validation.
for(const [family,name,color,level,armor,damage,gold] of [['silver','Gümüş Yemin','#b5c8cc',3,5,2,240],['raven','Kuzgun Nöbeti','#8d82a5',5,7,4,430]]){
 for(const [suffix,slot,title] of [['Helm','helmet','Miğferi'],['Chest','chest','Zırhı'],['Shield','shield','Kalkanı'],['Earring','earring','Küpesi']]){
 const id=family+suffix;ADVANCED_GEAR[id]={name:name+' '+title,slot,color,level,armor:slot==='chest'?armor+2:slot==='earring'?1:armor-2,damage:slot==='earring'?damage+5:slot==='chest'?damage:0,gold:gold+(slot==='chest'?90:0),ore:slot==='earring'?3:level+2,crystal:level-1,icon:'◆',family};
 }
}
