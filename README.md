# MSDS-Lite: Kompozit ve Tekne İmalat Atölyesi İSG Asistanı

> **Saha Odaklı, Çevrimdışı Çalışabilen (Offline-First) Mobil Kimyasal Güvenlik ve Acil Müdahale Asistanı**

[ 🇹🇷 Türkçe ](README.md) • [ 🇬🇧 English ](README.en.md) • [ 🇩🇪 Deutsch ](README.de.md)

[![PWA Ready](https://img.shields.io/badge/PWA-Ready-22d3ee?style=flat-square&logo=pwa)](https://erdmsn77.github.io/msds-lite/)
[![Offline First](https://img.shields.io/badge/Offline-100%25-emerald?style=flat-square)](https://erdmsn77.github.io/msds-lite/)
[![Languages](https://img.shields.io/badge/Languages-TR%20%7C%20EN%20%7C%20DE-blue?style=flat-square)](https://erdmsn77.github.io/msds-lite/)
[![License](https://img.shields.io/badge/License-MIT%20%2F%20Open-orange?style=flat-square)](LICENSE)

* **Canlı Uygulama:** [erdmsn77.github.io/msds-lite](https://erdmsn77.github.io/msds-lite/)  
* **Önemli Hatırlatma:** Bu uygulama resmî üretici Güvenlik Bilgi Formlarının (SDS/MSDS) yerine geçmez; acil durumlarda ve saha operasyonlarında saniyeler içinde doğru kararı vermeyi sağlayan pratik bir atölye içi hızlı referanstır.

---

## Projenin Amacı ve Çıkış Noktası

Fiber tekne ve kompozit teknolojileri öğrencisi olarak, atölyedeki pratik derslerimde ve gelecekteki tersane stajlarıma hazırlık sürecimde sahadaki en büyük risklerden birinin **kimyasallarla doğrudan temas anında yaşanan panik ve bilgiye erişim zorluğu** olduğunu fark ettim.

Kompozit tekne imalatında (vakum infüzyon, el yatırması, vakum torbalama, kalıp ayırma ve finisaj) kullanılan organik peroksitler, hızlandırıcılar ve reaktif reçineler son derece tehlikelidir. Bir kaza meydana geldiğinde (örneğin göze MEK-P sıçraması):
* Çalışanların elleri eldivenli, reçineli veya tozlu olabilir.
* Sayfalarca süren teknik SDS PDF belgelerini telefon ekranından aramak ve okumak dakikalar kaybettirir.
* Tersane veya kalıphane hangarının bazı bölümlerinde hücresel internet çekmeyebilir.

**MSDS-Lite**, bu ihtiyaca yanıt olarak; harici hiçbir sunucuya veya internet bağlantısına bağımlı olmadan, mobil cihaz üzerinden **ilk 60 saniyede hayat kurtaracak acil eylem adımlarını** sahaya sunmak üzere geliştirilmiştir.

---

## Mimari ve Kullanıcı Deneyimi (2 Katmanlı Bilgi Modeli)

Atölye ortamında bilgi kirliliğini önlemek ve kritik anlarda gözü yormamak için **2 Katmanlı Kart Mimarisi** tasarlanmıştır:

### 1. Katman: Saha Özet Kartı (Card View)
Ana ekranda kimyasallar yatay/dikey kaydırmayla hızlıca taranır:
* **Kimyasal Tanımı:** Ticari/atölye adı, CAS numarası ve teknik kimyasal sınıfı.
* **Sinyal Kelimesi (Signal Tag):** Uluslararası GHS standardında kırmızı `TEHLİKE` veya amber `UYARI` etiketi.
* **GHS Piktogramları:** Tehlike türünü anında gösteren kırmızı baklava vektör sembolleri (Alev, Aşındırıcı, Sağlık Zararı, Çevre vb.).
* **Temel Risk İbaresi (H-Statement):** Kimyasalın en birincil tehlike cümlesi.
* **Renk Kodlu Acil Durum Rozetleri:** Yangın (kırmızı), Sağlık (mavi) ve Çevre (yeşil) bazında özet riskler.
* **Zorunlu Yıkama Süresi Rozeti:** Olası maruziyette uygulanması gereken asgari kesintisiz yıkama süresi (`⏱ En az 15 dk Yıkama`).

### 2. Katman: Hızlı Acil Durum Paneli (Slide-in Drawer)
Karta dokunulduğunda sağdan kayarak açılan, sekmelerle hızlı geçiş yapılabilen 4 kritik acil eylem bölümü:
1. **İlk Yardım (İlk 60 Saniye):** Göz, cilt, solunum ve yutma maruziyetlerinde saniyeler içinde yapılması gerekenler. En üstte kırmızı zeminli **Zorunlu Kesintisiz Yıkama Süresi** uyarısı ile eşzamanlı **112 Acil Servis** ve **114 Zehir Danışma (UZMEM)** yönlendirmesi.
2. **Yangın & Müdahale:** Sahada derhal kullanılabilecek uygun söndürücüler, **KESİNLİKLE kullanılmayacak yöntemler** (örneğin alevi dağıtan basınçlı su jeti yasağı), yangın reaksiyon riskleri ve parlama noktası (°C).
3. **KKD Donanımı (Kişisel Koruyucu Donanım):** Doğru solunum maskesi tipi (A2 organik buhar filtresi, P3 partikül filtresi vb.), göz/yüz siperi gereksinimi ve **Eldiven Uyumluluk Tablosu** (Lateks, Nitril, Bütil/Neopren için uygun / uygun değil işaretleri).
4. **Depolama & Uyuşmazlık:** İdeal depolama sıcaklıkları ve atölyede asla yan yana getirilmemesi gereken reaktif maddeler (örneğin MEK-P ile Kobalt hızlandırıcının teması halinde ani alev alma ve patlama uyarısı).
5. **Resmî Doğrulama & Kaynak:** Bilgilerin teyit edildiği resmî SDS dokümanına doğrudan bağlantı ve İSG kontrol notu.

---

## Öne Çıkan Teknik ve Saha Özellikleri

* **☀️ Saha (Açık) ve 🌙 Gece Teması:** Parlak güneş ışığı alan açık hangar ve tersane ortamlarında metinlerin net okunabilmesi için açık gri/beyaz zemin (`#F8FAFC`) ile koyu arduvaz metin (`#0F172A`) kontrastı uygulandı. Gece vardiyaları için tek dokunuşla koyu temaya geçilebilir (seçim cihaz hafızasında saklanır).
* **📱 Mobil Geri Gitme / Kaydırma Desteği (Native Gesture UX):** Mobil tarayıcılarda veya tam ekran PWA modunda detay çekmecesi açıkken ekranın kenarından geri kaydırıldığında (swipe-back) veya cihazın geri tuşuna basıldığında uygulamanın kapanması engellenmiştir. Tarayıcı geçmişi (`history.pushState` ve `popstate`) ve dokunmatik sağa kaydırma hareketiyle çekmece yumuşakça kapanır ve ana menüye dönülür.
* **🌍 Üç Dilli Altyapı (TR / EN / DE):** Türkçe, İngilizce ve Almanca dil desteği. Türkiye'deki tersanelerin yanı sıra Almanya ve Avrupa'daki kompozit/yat imalatı staj ve kariyer hedefleri gözetilerek terminolojiye uygun olarak eksiksiz çevrildi.
* **⚡ Sıfır Dış Bağımlılık (Pure Vanilla JS & CSS):** Hiçbir harici CSS kütüphanesi (Bootstrap, Tailwind vb.) veya JavaScript çatısı (React, Vue vb.) kullanılmamıştır. 150 KB'ın altındaki toplam boyutuyla en eski veya zayıf donanımlı atölye telefonlarında bile anında açılır.
* **📶 %100 Çevrimdışı Çalışma (PWA):** Service Worker altyapısı sayesinde uygulama bir kez yüklendikten sonra bodrum katında, hangar içinde veya açık denizde hücresel veri olmadan tam fonksiyonla çalışır.
* **🔗 Doğrudan Linkleme (Deep-Linking):** URL sonuna kimyasal kimliği eklenerek (örneğin `/#mek-p`) karekod (QR Kod) veya doğrudan bağlantı üzerinden ilgili kimyasal kartı açtırılabilir.

---

## Kimyasal Kapsamı (11 Temel Atölye Malzemesi)

Atölyelerde en sık karşılaşılan ve kaza riski taşıyan 11 temel kimyasal malzeme tanımlanmıştır:

| Kimyasal Adı | Kategori | CAS No | Risk Seviyesi | Kritik Önlem / Atölye İkazı |
|---|---|---|---|---|
| **MEK-P** (Metil Etil Keton Peroksit) | Peroksit | 1338-23-4 | **KRİTİK** | Kobalt hızlandırıcı ile doğrudan karıştırılamaz (şiddetli patlama riski). Göze temasta körlük riski; en az 15 dk kesintisiz yıkama. |
| **Kobalt Naftenat** (%6) | Hızlandırıcı | 61789-51-3 | **KRİTİK** | Peroksitlerden ayrı dolapta tutulmalıdır. Cilt hassaslaştırıcıdır; en az 20 dk yıkama gerektirir. |
| **Ortoftalik Polyester Reçine** | Reçine | 25032-83-3 | **YÜKSEK** | Stiren monomeri içerir. Cilde bulaştığında aseton ile temizlenmemelidir (aseton kimyasalı gözeneklere iter). |
| **Vinilester Reçine** | Reçine | 36425-15-7 | **YÜKSEK** | Yüksek reaktiviteye sahiptir. A2 organik buhar filtresi ve nitril eldiven zorunludur. |
| **Epoksi Reçine (DGEBA)** | Reçine | 25068-38-6 | **YÜKSEK** | Güçlü cilt hassaslaştırıcıdır; tekrarlayan temas kalıcı mesleki dermatite yol açar. Lateks eldiven geçirgendir, nitril kullanılmalıdır. |
| **Epoksi Sertleştirici (IPDA)** | Sertleştirici | 2855-13-2 | **KRİTİK** | Aşındırıcı alifatik amin. Derin kapta fazla miktarda karıştırıldığında kontrolsüz egzotermik termal kaçak (aşırı ısınma ve duman) oluşturur. |
| **Teknik Aseton** | Solvent | 67-64-1 | **ORTA** | Çok düşük parlama noktası (-17°C). Cilt temizliğinde kesinlikle kullanılmamalı; yalnızca alet ve fırça yıkamada kullanılmalıdır. |
| **Karbon Elyaf Tozu** | Toz & Elyaf | 7440-44-0 | **YÜKSEK** | Mekanik kesim/zımparada mikro lifler korneayı çizer (göz ovuşturulmamalıdır). P3/FFP3 partikül maskesi şarttır. Toz süpürülmemeli, vakumlanmalıdır. |
| **Gelcoat (İzoftalik)** | Reçine | 25032-83-3 | **YÜKSEK** | Pigment ve stiren içerir. Tabanca ile püskürtme sırasında A2P3 kombine filtreli tam yüz maskesi kullanılmalıdır. |
| **PVA Ayırıcı Ajan** | Kalıp Ayırıcı | 9002-89-5 | **ORTA** | Alkol taşıyıcı nedeniyle yanıcı buhar üretebilir. Bol su ile yıkanarak ciltten kolayca uzaklaştırılır. |
| **Kalıp Vaksu / Wax** | Kalıp Ayırıcı | 64742-88-7 | **ORTA** | Petrol distilatı ve karnauba mumu içerir. Geniş yüzeylere sürülürken yeterli havalandırma sağlanmalıdır. |

---

## Kurulum ve Yerel Çalıştırma

Proje statik dosyalardan oluştuğu için herhangi bir derleme aracı veya paket yöneticisi bağımlılığı (`npm`, `yarn`, `webpack` vb.) bulunmamaktadır.

1. Projeyi bilgisayarınıza klonlayın:
   ```bash
   git clone https://github.com/erdmsn77/msds-lite.git
   cd msds-lite
   ```
2. Service Worker ve yerel depolama özelliklerinin çalışabilmesi için yerel bir HTTP sunucusu başlatın:
   ```bash
   # Python ile:
   python -m http.server 4173

   # veya Node.js ile:
   npx http-server . -p 4173
   ```
3. Tarayıcınızda açın:
   ```
   http://localhost:4173/index.html
   ```

---

## Mobil Cihaza Yükleme (PWA)

Uygulama internete ihtiyaç duymadan doğrudan telefonun ana ekranından bir yerel uygulama gibi çalıştırılabilir:

* **Android (Chrome):** [Canlı bağlantıyı](https://erdmsn77.github.io/msds-lite/) açın, sağ üstteki üç noktaya tıklayın ve **"Uygulamayı Yükle"** veya **"Ana Ekrana Ekle"** seçeneğini seçin.
* **iOS / iPhone (Safari):** Safari'de canlı adresi açın, alt kısımdaki **Paylaş** simgesine dokunun ve **"Ana Ekrana Ekle"** butonuna basın.

---

## Veri Güvenliği ve Senkronizasyon İlkesi

* **İkili Veri Güvencesi (Dual-Source Sync):** Kimyasal verileri hem `data/chemicals.json` dosyasında hem de `index.html` içerisindeki `fallbackChemicals` dizisinde birebir aynı tutulur. Bu mimari, kullanıcı uygulamayı bir sunucu olmadan doğrudan `file://` protokolüyle açsa dahi tüm kartların ve detayların eksiksiz çalışmasını garanti eder.
* **Teknik Doğruluk:** Veriler uydurma veya genel geçer bilgiler içermez; üretici SDS'leri, OSHA, ECHA ve üretici güvenlik bültenleri baz alınarak hazırlanmıştır.

---

## Lisans ve İletişim

Bu proje açık kaynak olarak paylaşılmıştır. 

Fiber tekne imalatı, yat inşaatı, kompozit malzemeler ve iş sağlığı güvenliği (İSG) alanında staj, proje veya iş birliği konularında iletişime geçebilirsiniz.

* **Geliştirici:** Erdem Doğan ([@erdmsn77](https://github.com/erdmsn77))
* **Canlı Proje:** [https://erdmsn77.github.io/msds-lite/](https://erdmsn77.github.io/msds-lite/)
