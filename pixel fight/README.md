# GIWA Realms

Tarayıcıda çalışan, bağımlılıksız Canvas 2D pixel RPG prototipi. `dist/index.html` dosyasını açarak oynanabilir. HTTP önizleme: `python -m http.server 8000 --directory dist`.

WASD / yön tuşları: hareket; Space: saldırı; E: köyde şifa; 1: iksir. Mobilde ekran kontrolleri bulunur. Slime avı, görev ödülü, XP, seviye, altın, yerel kayıt ve üç boost simülasyonu içerir.

Bu sürüm tek oyunculudur. GIWA ağına, cüzdana veya NFT kontratına bağlanmaz. MMO sürümü için sunucu tarafından doğrulanan hareket/savaş, WebSocket bölgeleri, hesap sistemi ve zincirdeki NFT sahipliğini doğrulayan bir servis gerekir. Boost oranları deneme amaçlıdır.

Version 0.2: 3840 x 2560 world, four regions, tracking camera, sparse trees, occlusion fade, 64 enemies and world minimap.

Version 0.3: peaceful Ocak village hub, NPC proximity interaction, merchant sales/potions, guaranteed smith upgrades, persistent inventory, forest dungeon portal and return travel. Other gates are future placeholders.

Version 0.4: full-window responsive canvas, richer original pixel art, shingled roofs, crystal fountain, cobblestones and lanterns. B inventory, C character, J quests, N relics, M map, H help, O sound, R return, F fullscreen. Panels open only on demand.

Version 0.5: expanded 1920 x 1440 original village, angular copper Tide Core monument, seven distinct NPC sprites and service portraits, unique buildings with side facades and deep roofs. Added alchemy, permanent training, repeatable hunting bounties, cartography and inn supplies.

Version 0.6: new directional Tideguard warrior, detailed equipped sword, five swords with level/ownership checks, separate enhancement levels, K collection with animated previews, Boran forging, guaranteed Emberfang after five kills and regional sword drops. Combat effects: burn, frost slow, chain lightning and lifesteal. C character portrait and B bag link to collection.

Version 0.7: 3840 x 2880 medieval hub, wider camera scale, compact helmeted knight with heater shield, connected roof/wall geometry, unified collision bounds, roof occlusion fade, dusk palette, fog, castle road, dark pond, graveyard and eastern stables. Existing combat/economy and sword progression remain active.

Version 0.8: stronger medieval timber/stone details, NPCs at door approaches, connected walkable portal and NPC routes, zoom-aware readable labels, wheel zoom and middle-click reset. Articulated walk cycle and alternating windup/contact/recovery sword attacks apply damage at contact, with reduced movement while swinging.

Version 0.9: rebuilt merged road network with obstacle-aware orthogonal routing and connected plaza gates; house porches, dormers and leaded windows. E inventory, F interact, V fullscreen, 1-5 quick slots with drag/drop and click/number assignment. Four regional bosses with guaranteed trophy/accessory/sword rewards, accessory stats, protected equipped-item sales, new alchemy recipe and role-specific NPC tabs.

0.10: B envanter, E NPC/portal. Planli dikdortgen koy sokaklari. Bagimsiz kask, zirh, eldiven ve kupe; demircide 8 ekipman tarifi, karakterli envanter, kalici ekipman ve savas bonuslari.

0.11: Helmet and glove sprites replace base parts before joint transforms; 4 directional heads, 2 glove designs, 5 distinct blade/hilt silhouettes, material-free blacksmith appearance preview.

0.12: Character equipment sockets with item transfer between bag and equipped slots, drag/drop and double-click. Separate helmet, sword, shield, armor, gloves, boots and jewelry. Starter equipment migration, empty weapon/helmet/shield support, two forgeable shields and boots, sprite icons and articulated boots.

0.13: Paged backpack (4 x 30 visible slots, expands beyond 120), Turkish name search, sort, rarity and labeled 72px item illustrations. 5 new forgeable gear variants, 6 materials, 3 usable potions, 3 boss accessories, loot sources and alchemy/merchant recipes. One-time supplies pack.

0.14: Reliability/gameplay pass: directional sword impact, telegraphed boss area attacks and fixed respawn arena; regional monster art; independent gear upgrades with legacy armor migration; protected material sales; regional crafting ingredients; mini-map and destination tracking; four progress contracts; buff countdown/boss health/readable loot; deferred inventory rendering and responsive panel scroll areas; storage failure reporting and rolling local backup.

0.15: Categorized blacksmith workshop (8 categories, crafting/upgrade modes), explicit owned/required costs and comparison preview. 10 set armor pieces, 3 earrings and 3 craftable accessories; level 4 defense set, level 6 damage set, cumulative 3/5 piece bonuses, tier level checks and atomic material spending. Advanced equipment reload test.

0.16: Explicit quick-bar editing with slot picker and one-click first-empty assignment, weapon/consumable validation and duplicate-free moves. Decorated courtyard lawns and safe town props (market, forge, herb beds, banners, well, carts, supplies), wooded margins and useful-town camera bounds. Three distinct weapons with bleed, knockback and spear reach. Rebuilt fitted armor, pauldrons, layered plates, helmets and item icons.


## v0.17 · Stamina, sprint and Whirlwind

- Hold Shift while moving: 1.65x speed, 18 stamina/sec. Maximum 100. After 1.25 seconds without spending energy, regenerate 16/sec. At exhaustion, walking continues; sprint unlocks at 25 stamina.
- Q / HUD skill button: Whirlwind, 35 stamina, 7 second cooldown, 0.8 second animation. One radial hit per enemy at 135% weapon damage. Regular attacks and equipment swaps are locked during the action.
- Energy potion: restores 60, 8 second shared potion cooldown; not consumed at full energy. Merchant price 35 gold; alchemy recipe 2 herb + 1 jelly. One-time welcome grant: 3 potions. Can be assigned to slots 1–5.
- Gümüş Yargı (Lv3), Kuzgun Pençesi (Lv5), Şafak Kıran (Lv6): separate blade silhouettes, effects and smith recipes; boss drops included.
- Gümüş Yemin and Kuzgun Nöbeti: each has a new chest, helmet, shield and earring, registered before saved equipment validation. Art shares existing directional joints; smith previews do not change the loadout.
- Stamina and remaining cooldowns survive saves; simulation pauses in panels. Versioned assets avoid stale script/style mixtures after updates.
- Verification: node test.cjs plus local browser sprint/skill/potion assignment and smith appearance previews.


## v0.18 · Equipment progression balance

Existing recipe costs, material requirements and drop sources are unchanged. Compare items at the same upgrade level. Weapon attack interval is normalized to 0.7 sec so a cheap fast blade cannot outrank the top weapon through attack speed. Per-item upgrades and ownership remain intact.

| Weapon | Base damage |
|---|---:|
| Ocak Muhafızı | 25 |
| Közdiş | 34 |
| Yaban Palası | 40 |
| Ayaz Yemini | 50 |
| Gümüş Yargı | 60 |
| Fırtına Yüreği | 72 |
| Kor Baltası | 90 |
| Ay Mızrağı | 104 |
| Tutulma | 118 |
| Kuzgun Pençesi | 134 |
| Şafak Kıran | 154 |

Armor pieces follow Iron → Ember → Silver → Frostguard → Raven → Nightreaver progression, with hunter pieces retaining attack utility. Late earrings and the Archon charm improve on their cheaper counterparts. Set bonuses and weapon special effects remain unchanged.

Validation: node test.cjs covers monotonic weapon base/DPS progression at equal bonuses, final weapon strength, armor/accessory tiers, matching inventory/combat values and save compatibility.


## v0.19 · Kara Taş Mahzeni

First combat map now uses a fixed stone dungeon: safe entrance → Paslı Nöbetlik → Kurt Çukuru → Küf Sarnıcı → Zincir Salonu → boss hall. Four encounters contain 20 normal enemies. Each exit gate requires its room and all previous rooms to be cleared. After all 20 are dead, Kara Taş Gardiyanı appears with 620 HP. Only its defeat completes the run, opens the victory exit and grants the completion reward once.

Defeated enemies do not respawn within a run. R or the entrance portal retreats to town without completing the dungeon. Cleared rooms survive retreat, death and reload. Surviving enemies heal on retreat. Completed runs start fresh on the next entry. Existing forest saves migrate to the safe entrance. The internal forest area key remains for combat/loot compatibility.

Dungeon map, minimap, room counters, NPC portal copy and journal contracts now match this route. Walls and sealed doors block movement and attacks; enemy movement stays in its room. Loot still uses the existing creature/boss economy.

Validation: node test.cjs loads the actual deployed script order and tests locked gates, wall hits, no respawn, resume/reload, last-enemy boss spawn, mandatory boss defeat, exactly-once rewards, replay and death HUD. Local browser checked portal entry, dungeon visuals, movement, combat and map UI.


## v0.20 · Expanded dungeon

- Bounds increased to 8100 × 3600, with six combat rooms of 1100–1250 width and 1000–1300 height, plus a 1100 × 1400 boss hall.
- 72 normal enemies in six fixed encounters (8 / 10 / 12 / 12 / 14 / 16). Groups of up to four occupy separate room quadrants; soft separation reduces overlap during pursuit.
- New Kül Kütüphanesi and Unutulmuş Kışla rooms, wider corridors, weapon racks, tombs, banners, grates, moss and a throne. Routes and gates remain sequential.
- Boss HP 1100; it still spawns only after all normal encounters are cleared.
- Floor is cached in room/corridor chunks and only visible chunks/enemies are drawn, avoiding a full-world bitmap. Minimap preserves proportions and marks surviving enemies.
- Version-1 run migration preserves cleared old rooms and partial kills. Added rooms remain unfinished, so earlier completion cannot skip the expanded dungeon.


## v0.21 · Zincir Tahtı

See [UPDATE-v21.md](UPDATE-v21.md) for the source-backed research, design decisions, full release notes and verification limits. Six original enemy archetypes and elite variants, a two-phase boss with basic cleave plus three abilities, held attack / three-hit combo, F dodge, weapon impact trails, obstacle-aware movement, solid cover, themed room floors, persistent clear-room chests and healing shrines, run statistics and a bestiary are now integrated. Existing gear and run progress are preserved.
