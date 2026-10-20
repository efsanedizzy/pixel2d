# GIWA Realms · Zincir Tahtı güncellemesi

## Araştırma ve tasarım

Analiz, yayımlanmış resmi rehberler ve geliştirici yazıları üzerinden yapıldı. Referans oyunların canlı istemcilerinde oynanış testi yapılmadı. Aşağıdaki uygulama kararları bu kaynaklardan çıkarılan tasarım yorumlarıdır; karakter, harita veya görsel varlık kopyalanmadı.

| Kaynak | Kaynağın anlattığı yapı | GIWA Realms için uygulama kararı |
|---|---|---|
| [Metin2 — Demon Tower](https://en-wiki.metin2.gameforge.com/index.php/Demon_Tower) | Katların farklı hedefleri var; yaratık temizleme ve son boss ilerlemeyi belirliyor. | Altı odalı rota korundu; odalara farklı savaş rolleri, engeller ve temizleme sonrası sandıklar eklendi. Son gardiyan yenilmeden sefer tamamlanmıyor. |
| [Metin2 — Combo](https://en-wiki.metin2.gameforge.com/index.php/Combo) | Normal saldırı dizisindeki vuruş sayısını geliştiren kombo sistemi. | Bizim üç vuruşluk dizimiz: %100 / %110 / %130 hasar. Son vuruş daha güçlü görsel iz ve geri itme sağlar. Bu katsayılar bizim denge kararımızdır. |
| [Metin2 — Metin Stones](https://en-wiki.metin2.gameforge.com/index.php/Metin:List) | Sabit hedefler, yaratık grupları ve ödül beklentisi oluşturur. | Taş sistemini kopyalamak yerine odaların temizlenmesini ganimet sandıklarıyla ilişkilendirdik. Seçkin düşmanlar grup içindeki önemli hedefler oldu. |
| [Minecraft Dungeons — Exploring the End Wilds](https://www.minecraft.net/en-us/article/exploring-end-wilds) | El yapımı yoğun savaş alanlarında yapılar, çevre ve düşman çeşitliliği birlikte tasarlanıyor. | Sarnıçtaki su alanları, kütüphane sütunları, kışla barikatları ve altı farklı düşman silueti aynı odanın nasıl oynandığını değiştirecek şekilde tasarlandı. |
| [Hades — resmi FAQ](https://www.supergiantgames.com/blog/hades-faq/) | Savaş ağırlıklı seferlerde oyuncu hem güç hem deneyim kazanarak tekrar deniyor. | Yenilgi temizlenen odaları silmiyor. Sefer süresi, kazanılan altın, sandıklar ve kurtarılmalar günlükte izleniyor. Kaçınma ve saldırı uyarıları, öğrenilebilir karşılaşmalar hedefiyle bizim tasarım kararımız olarak eklendi. |

## Savaş

- Space veya sol fareyi basılı tutarak sürekli saldırı. Sol fare saldırısı imlecin yönüne gider; klavye saldırısı yakındaki hedefi seçer.
- Üç vuruşluk kombo. Dizinin devam penceresi 1,8 saniye; üçüncü vuruş %30 ek hasar verir. Silahların önceki kademe sıralaması korunur.
- Kılıç izleri, ağırlıklı bitirici yayları, mızrak için doğrusal itiş izi, isabet kıvılcımları ve kısa ölüm silueti.
- F ile kaçınma: 20 enerji, 2,2 saniye bekleme, 0,24 saniye hasar bağışıklığı. Duvarlardan, sudan ve mühürlü geçitlerden geçmez. Bekleme süresi kaydedilir.
- Shift koşu ve Q Dönen Çelik mevcut ortak enerji sistemini kullanmaya devam eder.
- Normal yaratık saldırıları temas hasarı yerine hazırlık, isabet ve toparlanma evrelerinden oluşur.

## Yaratıklar

| Yaratık | Görsel kimlik | Davranış |
|---|---|---|
| Fener Yiyen | Çok bacaklı, sırtında ışık taşıyan metal kabuklu böcek | Kısa menzilli, önceden belirtilen ısırık |
| Kül Tazısı | Zırhlı dört ayak, dikenli omurga ve köz kaburgalar | Hazırlıktan sonra sabit yönde atılma |
| Kök Gözcüsü | Oyuk ağaç yüzü, dallı boynuzlar, mantar ve uzun mızrak | Dar açılı uzun menzil saldırısı |
| Zincir Celladı | Kapüşon, parçalı giysi ve zincirli gürz | Geniş açılı ağır savuruş |
| Köz Yazmanı | Havada duran maskeli cüppe, kitap ve ateş asası | Menzil koruma ve engellerde yok olan ateş atışları |
| Mezar Kalkanlısı | Kemik/plaka zırh, büyük kalkan ve uzun kılıç | Ağır saldırı; önden gelen darbeyi %20 azaltır |

72 yaratık ve altı oda korunur. İkinci odadan itibaren birer seçkin karşılaşma bulunur: daha çok can, daha hızlı davranış ve ek altın. Düşmanlar birbirlerinin üstüne yığılmamaya çalışır; engel olduğunda oda içi yol bulma alanını kullanır.

## Boss: Kara Taş Gardiyanı · Nâzır

- Yeni, daha büyük özgün siluet: kırık taç, kafesli köz çekirdeği, parçalı zırh, balta ve zincirli ağırlık.
- **Normal balta savuruşu:** Yakın mesafede koni alanı; özel yetenekten bağımsız hasar verir. Yönü hazırlıkta belirlenir; arkasına geçilerek kaçınılabilir.
- **Çekirdek Çöküşü:** Oyuncunun bulunduğu noktayı işaretler. İsabette oyuncunun güncel konumu denetlenir.
- **Zincir Fırlatma:** Dar açıyla uzun menzilli saldırı; yana hareket veya kaçınmayla önlenebilir.
- **İkinci evre:** %50 can altında hızlanan yakın dövüş ve dış halkayı vuran yeni saldırı. İç merkez güvenlidir.
- Normal ve özel saldırılar ortak hasar bağışıklığı kontrolünden geçer; tek saldırı tekrar tekrar hasar vermez.

## Zindan ve ödüller

- Altı oda için ayrı renk, zemin, duvar detayları ve ortam parçacıkları.
- Sarnıç su alanları ve aralarındaki geçiş; kütüphane sütunları; kışla barikatları. Engeller hem hareketi hem mermileri etkiler.
- Çarpışmalı nesneler karakter ve düşmanlarla derinliğe göre çizilir.
- Her savaş odasında temizleme sonrası açılan bir sandık. Ödül yalnızca bir kere alınır ve kaydedilir.
- İkinci ve beşinci odada tek kullanımlık Soluk Sunağı: %45 can ve 50 enerji.
- J günlüğünde sefer süresi, altın, sandık/sunak kullanımı ve kurtarılma sayısı; yaratıkların görünüm ve karşı taktik rehberi; boss önizlemesi.
- Mevcut sahip olunan eşyalar, güçlendirmeler ve temizlenmiş odalar korunur.

## Doğrulama

`node test.cjs`: önceki ekonomi, envanter, ekipman, stamina ve zindan testleri ile birlikte yeni saldırı zamanlamaları, boss yakın vuruşu, açı/mesafe kaçışı, ikinci evre güvenli alanı, engel çevresinden yol bulma, kaçınma çarpışması, hasar bağışıklığı, mermi çarpışması, basılı saldırı kombosu, kalkanın yönü, sandık/sunak kaydı ve bekleme süresi kaydı test edildi.

Yerel tarayıcıda yeni çizimler, rehber, boss önizlemesi ve basılı saldırıyla ilk odanın tamamen temizlenmesi ve oda sandığının açılması kontrol edildi. Ganimet, kapının açılması, sefer kaydı ve seviye artışı doğrulandı; tarayıcı hata kaydı boştu. Boss'un farklı saldırı durumları simülasyon testleriyle denetlendi; tarayıcıda boss'a kadar tüm sefer baştan sona oynanmadı.
